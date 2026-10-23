import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('unknown size and access information stay unknown',()=>{const r=analyse(data);assert.equal(r.rooms[0].access_note,null);assert.equal(r.rooms[1].size,null);assert.match(render(r),/Not supplied/);});
test('supplied access wording is preserved without suitability inference',()=>{const r=analyse(data);assert.equal(r.rooms[2].access_note,data.rooms[2].access_note);assert.doesNotMatch(render(r),/certified|fully accessible/i);});
test('invalid occupancy and unsafe booking destinations are rejected',()=>{const d=structuredClone(data);d.rooms[0].occupancy=-1;assert.throws(()=>analyse(d),/positive/);d.rooms[0].occupancy=2;d.rooms[0].booking_url='data:text/html,test';assert.throws(()=>analyse(d),/HTTPS/);});
