import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/investorEnquiry.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports });
const { buildInvestorMailto, investorProjects, investorInvolvement } = exports;
const messages = JSON.parse(readFileSync(new URL('../public/translations/home.json', import.meta.url), 'utf8'));
assert.equal(investorProjects.length, 5);
assert.equal(investorInvolvement.length, 4);
const details = { name: ' Zoë Müller ', email: 'zoe@example.com', organisation: ' Green & Water ', message: ' Bonjour Iman,\nEau & énergie? #avenir ', language: 'en' };
for (const language of ['en', 'fr', 'de']) {
  const label = english => language === 'en' ? english : messages[english][language === 'fr' ? 0 : 1];
  for (const project of investorProjects) {
    assert(messages[project.summary]?.every(text => text.trim()));
    for (const involvement of investorInvolvement) {
      const input = { ...details, language, project: project.value, involvement: involvement.value, projectLabel: label(project.label), involvementLabel: label(involvement.label) };
      const url = new URL(buildInvestorMailto(input));
      assert.equal(url.protocol, 'mailto:');
      assert.equal(url.pathname, 'i.tadros@risemeup.org');
      assert.equal([...url.searchParams.keys()].join(','), 'subject,body');
      const body = url.searchParams.get('body');
      for (const expected of [details.name.trim(), details.email, details.organisation.trim(), details.message.trim(), input.projectLabel, input.involvementLabel]) assert(body.includes(expected));
      assert(url.searchParams.get('subject').startsWith('Risemeup · '));
      const withoutOrganisation = new URL(buildInvestorMailto({ ...input, organisation: '' })).searchParams.get('body');
      assert(!withoutOrganisation.includes('Organisation:'));
      assert.throws(() => buildInvestorMailto({ ...input, project: 'invalid' }));
      assert.throws(() => buildInvestorMailto({ ...input, involvement: 'invalid' }));
      for (const key of ['name', 'email', 'message']) assert.throws(() => buildInvestorMailto({ ...input, [key]: '   ' }));
    }
  }
}
console.log('Investor enquiry checks passed: all 60 language/project/participation combinations, encoding, optional organisation and invalid fields.');
