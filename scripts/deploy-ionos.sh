#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$project_root"

key_file="${RISEMEUP_IONOS_KEY_FILE:-$project_root/.ionos.local/id_ed25519}"
known_hosts="${RISEMEUP_IONOS_KNOWN_HOSTS_FILE:-$project_root/.ionos.local/known_hosts}"
destination='a715279@access-5019731778.webspace-host.com'

test -s "$key_file" && test -s "$known_hosts"
[[ "$key_file" = /* && "$known_hosts" = /* ]]
[[ "$key_file" != *'"'* && "$known_hosts" != *'"'* ]]
revision="$(node -e 'const fs = require("node:fs"); const data = JSON.parse(fs.readFileSync("dist/deployment.json", "utf8")); if (!/^[a-f0-9]{40}$/.test(data.revision)) process.exit(1); process.stdout.write(data.revision);')"
[[ "$revision" =~ ^[a-f0-9]{40}$ ]]

ssh_options=(ssh -F /dev/null -i "$key_file" -o "UserKnownHostsFile=$known_hosts" -o GlobalKnownHostsFile=/dev/null -o StrictHostKeyChecking=yes -o IdentitiesOnly=yes -o IdentityAgent=none -o BatchMode=yes -o ConnectTimeout=20)
rsync_ssh="ssh -F /dev/null -i \"$key_file\" -o \"UserKnownHostsFile=$known_hosts\" -o GlobalKnownHostsFile=/dev/null -o StrictHostKeyChecking=yes -o IdentitiesOnly=yes -o IdentityAgent=none -o BatchMode=yes -o ConnectTimeout=20"

"${ssh_options[@]}" "$destination" "test \"\$HOME\" = /homepages/20/d4299669765/htdocs && test -f \"\$HOME/wordpress/wp-config.php\" && umask 077 && mkdir -p \"\$HOME/.risemeup-private/releases/$revision\""
rsync -az --no-owner --no-group -e "$rsync_ssh" dist/ "$destination:.risemeup-private/releases/$revision/"

"${ssh_options[@]}" "$destination" bash -s -- "$revision" <<'REMOTE'
set -euo pipefail
revision="$1"
[[ "$revision" =~ ^[a-f0-9]{40}$ ]]
test "$HOME" = /homepages/20/d4299669765/htdocs
target="$HOME/wordpress"
private="$HOME/.risemeup-private"
release="$private/releases/$revision"
test ! -L "$target"
test -f "$target/wp-config.php"
test -s "$release/index.html"
test -s "$release/deployment.json"
mkdir "$private/publish.lock"
trap 'rmdir "$private/publish.lock"' EXIT
umask 077
mkdir -p "$private/backups"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
cp -p "$target/index.html" "$private/backups/index-before-$timestamp-$revision.html"
cp -p "$target/.htaccess" "$private/backups/htaccess-before-$timestamp-$revision.txt"

rsync -a --no-owner --no-group --chmod=D755,F644 --exclude=/index.html --exclude=/deployment.json "$release/" "$target/"

if ! grep -Fq 'Header set Cache-Control "no-cache, must-revalidate"' "$target/.htaccess"; then
  cp -p "$target/.htaccess" "$target/.htaccess-$revision.tmp"
  cat >> "$target/.htaccess-$revision.tmp" <<'HEADERS'

DirectoryIndex index.html index.php
<IfModule mod_headers.c>
  <FilesMatch "\.(html|css|js|json|xml|txt|svg|png|jpe?g|webp|gif|ico|pdf)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
HEADERS
  chmod 644 "$target/.htaccess-$revision.tmp"
  mv -f "$target/.htaccess-$revision.tmp" "$target/.htaccess"
fi

install -m 644 "$release/index.html" "$target/.index-$revision.tmp"
mv -f "$target/.index-$revision.tmp" "$target/index.html"
install -m 644 "$release/deployment.json" "$target/.deployment-$revision.tmp"
mv -f "$target/.deployment-$revision.tmp" "$target/deployment.json"
expected="$(sha256sum "$release/index.html" | cut -d ' ' -f 1)"
actual="$(sha256sum "$target/index.html" | cut -d ' ' -f 1)"
test "$actual" = "$expected"
printf 'Published RiseMeUp revision %s to its IONOS WordPress webspace.\n' "$revision"
REMOTE
