# Rise Me Up experimental workspace

This branch is an isolated experimental copy, authorized by the website owner.

- Work only on branch `experimental` in `Hero988/RiseMeUp`.
- NEVER push to, merge into, modify, or deploy the `main` branch.
- NEVER change the live Vercel project `rise-me-up` (`prj_vbgZLz2nFHnyjoQzEsv6QZzfx6xn`), its settings, or the domains risemeup.org and www.risemeup.org.
- The ONLY deployment target is `rise-me-up-experimental` (`prj_UKC40ZWuIH6DnDx5dilASR98Myb9`), account `team_VNljHgfcHPy9BqB4fQnP7udX`.
- Keep `git.deploymentEnabled: false` in this branch's vercel.json. This stops automatic Git previews in the live project's existing repository integration. Push experimental commits, then deploy the exact experimental commit explicitly to the experimental project through the Vercel API or a CLI explicitly linked to that project.
- Do not connect the experimental project to production databases, Convex deployments, payment systems, email delivery, storage, or other live services. Do not copy live environment variables or credentials.
- Browser connections to external APIs and form submissions are blocked by the experimental Content-Security-Policy. Keep these restrictions unless isolated test services are deliberately provisioned.
- The experimental deployment must retain noindex headers.
- Before every write/deploy verify branch, commit and project ID. Do not create a pull request into main.
