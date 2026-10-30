# Project owner and communication

The project owner is a 65-year-old woman doing this for the first time. Assume no prior coding, terminal, GitHub, or Vercel knowledge. Be patient, respectful, encouraging, and never patronizing. Use plain English and explain unfamiliar terms. Handle technical work yourself when possible. If the owner must act, give one small, clearly numbered step at a time with exact button names. Explain changes, provide brief progress updates, and clearly distinguish completed work from anything still pending.

# Required browser

Use only T3 Code's built-in browser for all browser work. Start with preview_status and use preview_open when needed. Never open or automate an external/default browser, Chrome, Safari, Edge, a separate browser service, Playwright, or a headless browser. If T3's browser cannot complete a task, stop and ask the owner instead of switching. GitHub and Vercel CLI commands are allowed, but must not launch an external browser.

# Safety and project scope

- Never request passwords, access tokens, or recovery codes in chat. Use official sign-in flows inside T3's browser when authentication is required.
- Keep secrets out of logs and Git. Never commit local environment files or .vercel configuration.
- Do not delete data, change billing, make private material public, or deploy to production without an explicit request covering that action.
- Keep edits focused and reversible. Read any more-specific AGENTS.md instructions before editing a subdirectory.
- This is the RiseMeUp checkout only. Its production host is IONOS, not Vercel. Never use another project's IONOS account or change its settings.

# Routine website updates: standing owner request

The owner explicitly requests that normal website updates be saved to GitHub and published to the live IONOS website as part of completing the work. Handle the technical steps yourself; do not leave her to run commands. This is standing authorization to commit and push focused, requested website changes to `main` and publish them to this existing RiseMeUp destination. It does not authorize unrelated changes, deletion, billing changes, DNS/email changes, or publication of secrets.

1. Read applicable instructions, inspect the working tree, and preserve unrelated owner changes.
2. Make the requested change, then run `npm run build` and `npm run check:ionos`. Run relevant additional checks where available. Never publish a failed build.
3. Stage only the intended files, check that no secrets or local configuration are included, commit, and push to `main` in `Hero988/RiseMeUp` (`https://github.com/Hero988/RiseMeUp.git`). Do not create a different hosting project or use Vercel deployment commands.
4. The `Publish RiseMeUp to IONOS` GitHub Actions workflow automatically builds and publishes each push to `main`, using the `ionos-production` environment. Inspect its result; a successful push alone is not proof of publication.
5. Verify `https://www.risemeup.org/deployment.json` matches the pushed commit, and check the affected public pages/resources using HTTP requests. For browser work, obey the T3-only requirement and tool restrictions.
6. Tell the owner plainly what changed and whether GitHub and the live website are both updated. Publishing takes build/upload time; do not promise an instant update or claim completion while it is pending or failed. If access or publishing fails, explain the problem and retain the working site.

# RiseMeUp hosting boundaries

- IONOS contract: `110067221`, WordPress Hosting Grow; site `1790838f-0d98-4871-af59-8a52f8116f17`.
- Dedicated SSH destination: `a715279@access-5019731778.webspace-host.com`, port 22. Expected home: `/homepages/20/d4299669765/htdocs`; live document root: `$HOME/wordpress`. Do not deploy into `$HOME/risemeup-site` or substitute another account.
- This plan uses SSH/SFTP command-line access, not IONOS Cloud infrastructure. Publishing credentials are isolated in GitHub environment secrets `RISEMEUP_IONOS_SSH_KEY` and `RISEMEUP_IONOS_KNOWN_HOSTS`.
- Local credentials live only in ignored `.env.ionos.local` and `.ionos.local/` with restricted file permissions. Never display, commit, upload as website files, or copy them into another project. Use a dedicated key with strict host verification; do not change global SSH configuration.
- Preserve old WordPress files/database and private backups. Do not use deployment deletion flags or remove old data without a separate explicit request.
- Legacy Vercel reference, only for migration/recovery: project `prj_vbgZLz2nFHnyjoQzEsv6QZzfx6xn` (`rise-me-up`), team `team_VNljHgfcHPy9BqB4fQnP7udX`. Do not reconnect or deploy there during routine work.
- See `IONOS_DEPLOYMENT.md` for publishing, verification, and recovery details.
