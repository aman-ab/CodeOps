// Usage: node scripts/check-openapi.mjs [openapi.json]
// Day 60, criteria 4 and 6: does the exported document describe the API well enough to order from it?
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? 'openapi.json';
const doc = JSON.parse(readFileSync(file, 'utf8'));
let failed = 0;
const fail = (m) => { failed += 1; console.log('FAIL  ' + m); };

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const ops = [];
for (const [path, item] of Object.entries(doc.paths ?? {})) {
  for (const m of METHODS) if (item[m]) ops.push({ path, method: m.toUpperCase(), op: item[m] });
}

console.log(`${doc.info?.title ?? '(no title)'} ${doc.info?.version ?? ''}: ${ops.length} operations\n`);
if (!doc.info?.description || doc.info.description.length < 60) fail('info.description is missing or too short to say anything useful');
if (!doc.paths || Object.keys(doc.paths).some((p) => p.includes('/debug'))) fail('a /debug path is in the public document');
if (!doc.components?.securitySchemes?.['api-key']) fail('the api-key security scheme is missing (Try it out on DELETE would answer 401)');

for (const { path, method, op } of ops) {
  const where = `${method} ${path}`;
  const codes = Object.keys(op.responses ?? {});
  const problems = [];
  if (!op.summary || !/\s/.test(op.summary)) problems.push('no real summary (a method name such as findAll is not one)');
  if (!op.tags?.length) problems.push('no tag');
  if (!codes.some((c) => c.startsWith('2'))) problems.push('no success response');
  if (!codes.some((c) => c.startsWith('4'))) problems.push('no documented failure');
  if (method === 'POST' && !codes.includes('201')) problems.push('a POST should document 201');
  if (method === 'DELETE' && !op.security) problems.push('DELETE is staff only but has no security requirement');
  if (path.includes('{') && !codes.includes('404')) problems.push('has a path parameter but no 404');
  console.log(`${problems.length ? 'FAIL' : 'PASS'}  ${where.padEnd(52)} ${codes.join(' ')}`);
  problems.forEach((p) => { failed += 1; console.log('        - ' + p); });
}

// Criterion 5 in miniature: every field of the request body that a reader fills in needs an example
for (const name of ['CreateOrderDto', 'CreateRestaurantDto', 'UpdateStatusDto']) {
  const props = doc.components?.schemas?.[name]?.properties;
  if (!props) { fail(`schema ${name} is missing`); continue; }
  const bare = Object.entries(props).filter(([, p]) => p.example === undefined).map(([k]) => k);
  console.log(`${bare.length ? 'FAIL' : 'PASS'}  ${name}: every field has an example${bare.length ? ' (missing: ' + bare.join(', ') + ')' : ''}`);
  if (bare.length) failed += 1;
}

console.log(failed === 0 ? '\nall checks passed' : `\n${failed} problem(s)`);
process.exit(failed === 0 ? 0 : 1);
