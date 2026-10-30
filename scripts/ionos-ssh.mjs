import { readFileSync, mkdirSync, openSync, closeSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const remoteCommand = process.argv[2];
if (!remoteCommand || process.argv.length !== 3) {
  console.error('Usage: node scripts/ionos-ssh.mjs "remote command"');
  process.exit(1);
}

const password = readFileSync(path.join(projectRoot, '.env.ionos.local'), 'utf8')
  .match(/^IONOS_SSH_PASSWORD='([^'\r\n]+)'$/m)?.[1];
if (!password) throw new Error('Local RiseMeUp password was not found');

const privateDirectory = path.join(projectRoot, '.ionos.local');
mkdirSync(privateDirectory, { mode: 0o700, recursive: true });
const knownHosts = path.join(privateDirectory, 'known_hosts');
closeSync(openSync(knownHosts, 'a', 0o600));

const result = spawnSync('/usr/bin/expect', ['-f', '-'], {
  input: `set timeout 600
log_user 0
match_max 1048576
spawn -noecho /usr/bin/ssh -F /dev/null -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$env(RISEMEUP_KNOWN_HOSTS) -o GlobalKnownHostsFile=/dev/null -o IdentitiesOnly=yes -o IdentityAgent=none -o PubkeyAuthentication=no -o PreferredAuthentications=password,keyboard-interactive -o NumberOfPasswordPrompts=1 -o ConnectTimeout=15 a715279@access-5019731778.webspace-host.com $env(RISEMEUP_REMOTE_COMMAND)
expect {
  -re {(?i)password:} {send -- "$env(RISEMEUP_SSH_PASSWORD)\\r"}
  timeout {puts "SSH connection timed out before authentication"; exit 124}
  eof {puts -nonewline $expect_out(buffer); exit 1}
}
expect {
  eof {puts -nonewline $expect_out(buffer); set result [wait]; exit [lindex $result 3]}
  timeout {puts "SSH connection timed out"; exit 124}
}
`,
  env: {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    LANG: 'en_US.UTF-8',
    RISEMEUP_SSH_PASSWORD: password,
    RISEMEUP_KNOWN_HOSTS: knownHosts,
    RISEMEUP_REMOTE_COMMAND: remoteCommand,
  },
  encoding: 'utf8',
  timeout: 660000,
  maxBuffer: 8 * 1024 * 1024,
});

process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
