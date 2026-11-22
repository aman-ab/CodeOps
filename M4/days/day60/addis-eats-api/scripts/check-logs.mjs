// Usage: node scripts/check-logs.mjs <server.log> <proofRequestId> <echoRequestId> <secret> [<secret> ...]
// Reads what the SERVER wrote to stdout and checks the Day 60 acceptance criteria 1 to 3.
import { readFileSync } from 'node:fs';

const [file, proofId, echoId, ...secrets] = process.argv.slice(2);
if (!file || !proofId || !echoId || secrets.length === 0) {
  console.error('usage: check-logs.mjs <server.log> <proofRequestId> <echoRequestId> <secret...>');
  process.exit(2);
}

const text = readFileSync(file, 'utf8');
const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
let failed = 0;
const check = (ok, title, detail = '') => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${title}${!ok && detail ? '\n        ' + detail : ''}`);
};

// 1 - every line is exactly one JSON object
const parsed = [];
const notJson = [];
for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) parsed.push(obj);
    else notJson.push(line);
  } catch {
    notJson.push(line);
  }
}
check(lines.length > 0 && notJson.length === 0, `1  every line is one JSON object (${parsed.length} lines)`,
  notJson.length ? `first line that is not JSON: ${notJson[0].slice(0, 100)}\n        (run "npm run build && node dist/main.js", not "nest start": the CLI prints its own messages)` : '');

// 2 - all lines from one request share a requestId, from more than one source
const mine = parsed.filter((o) => o.requestId === proofId);
const messages = mine.map((o) => o.msg);
check(mine.length >= 2 && messages.includes('order created') && messages.includes('request handled'),
  `2  lines from request "${proofId}" share a requestId (${mine.length} lines: ${messages.join(' | ') || 'none'})`,
  'expected at least "order created" (service) and "request handled" (interceptor)');

// 3 - nothing secret reached the log, and the redaction demonstrably ran
const leaked = secrets.filter((s) => text.includes(s));
check(leaked.length === 0, '3  no secret or phone number appears anywhere in the log', leaked.length ? `found: ${leaked.join(', ')}` : '');

const echo = parsed.find((o) => o.requestId === echoId && o.msg === 'debug echo');
const r = echo?.request;
check(
  !!r && r.headers?.authorization === '[redacted]' && r.headers?.['x-api-key'] === '[redacted]' && r.body?.phone === '[redacted]',
  '3b redaction ran on authorization, x-api-key and phone',
  echo ? '' : 'no "debug echo" line found: is ENABLE_DEBUG_ROUTES=true, and did the requests reach the server?',
);

console.log(failed === 0 ? '\nall checks passed' : `\n${failed} check(s) failed`);
process.exit(failed === 0 ? 0 : 1);
