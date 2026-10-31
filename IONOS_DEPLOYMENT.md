# RiseMeUp publishing and recovery

## Normal updates

The source of truth is `Hero988/RiseMeUp`, branch `main`. A push starts
`.github/workflows/deploy-ionos.yml`, which builds the static website, checks
the output, uploads it to RiseMeUp's IONOS webspace, and checks the public site.
Allow time for the build and upload; this is automatic, not instantaneous.

The owner asks the assistant to complete the edit, commit, push, and live
verification rather than asking her to use a terminal. Follow `AGENTS.md`.

## Isolation and credentials

Only IONOS contract `110067221` and SSH user `a715279` at
`access-5019731778.webspace-host.com` are permitted destinations. The script
also checks the remote home directory before writing to `$HOME/wordpress`.
Do not change the other project's account, DNS, email, or billing.

GitHub environment `ionos-production` permits `main` and holds the dedicated
SSH private key and pinned host key as secrets. No credentials belong in Git.
The local key and known-host file are in ignored `.ionos.local/`; an optional
local password is in ignored `.env.ionos.local`. Keep directories private and
credential files readable only by their owner. Do not regenerate credentials
unless needed, or print their contents while diagnosing a problem.

## Checks and manual recovery publishing

Run `npm run build` followed by `npm run check:ionos`. The second command
checks the static output and writes `dist/deployment.json` with the revision.
It also adds content-based versions to the homepage's public stylesheet links,
so a changed design requests fresh styles instead of reusing an older browser
copy. The workflow checks these published styles against their version hashes.
For controlled recovery only, `npm run deploy:ionos` uses the isolated local
SSH key. Prefer the GitHub workflow for normal updates so the live revision
matches the saved source. Never deploy uncommitted website edits under an old
revision label.

Inspect the workflow result with `gh run list` and `gh run view`. Verify the
public deployment record's `revision` equals the desired Git commit and check
the affected pages. The workflow checks the homepage, development partners,
Mango project, crisis response, and water system pages.

Existing `npm run check:site` has an unrelated missing direct `postcss`
dependency; it is not the migration check. Report that limitation rather than
claiming that all existing checks pass.

## Backups and rollback

Before migration, the existing files and WordPress database were backed up
outside the public document root, in `$HOME/.risemeup-private/backups/`:

- `website-files-20261030T152132Z.tar.gz`
- `wordpress-database-20261030T152132Z.sql`

Publishing retains old files, backs up the current homepage and `.htaccess`,
and keeps uploaded revisions in `$HOME/.risemeup-private/releases/`. The
homepage and deployment marker are replaced only after the static files have
uploaded. Other pages are copied in place, so this is not an all-files atomic
release. Avoid overlapping manual and automated deployments.

To roll back a website change, prefer a focused Git revert, push to `main`,
and verify the resulting deployment. Do not discard unrelated changes. A full
WordPress/database restore or deleting old content needs explicit owner
approval and a separate recovery plan. Never expose private backups through
the public website.

## Vercel retirement

On October 30, 2026, automatic GitHub-to-IONOS publishing passed for commit
`d493ef5a254367607c942af8a723ccb743c77945` (GitHub Actions run `41083336843`).
Both the apex and www domains served that revision and all five checked pages.
RiseMeUp's Vercel Git integration was then disconnected. Future pushes no
longer trigger Vercel deployments. The old Vercel project, deployments, and
domain associations are retained for recovery; they have not been deleted or
paused. Public DNS already points to IONOS and was not changed.

Preserve that separation; never reconnect Vercel during routine publishing or
change another project. No email or billing settings were changed.
