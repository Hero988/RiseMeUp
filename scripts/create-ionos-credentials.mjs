import { randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const credentialFile = '.env.ionos.local';

execFileSync('git', ['check-ignore', '--quiet', credentialFile], { cwd: projectRoot });

const password = `${randomBytes(32).toString('base64url')}Aa7!`;
const contents = [
  '# RiseMeUp only — Iman IONOS account',
  '# Local secret: never upload, share, or commit this file.',
  `IONOS_SSH_PASSWORD='${password}'`,
  '',
].join('\n');

writeFileSync(path.join(projectRoot, credentialFile), contents, { mode: 0o600, flag: 'wx' });
console.log(`Created ${credentialFile} with owner-only read/write permissions. Password not displayed.`);
