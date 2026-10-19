#!/usr/bin/env node
/* Measures every plain-English version in common-sense-data.js against the
   READING-LEVELS.md limits (Quick <= 5.0, Clear <= 7.5, Full <= 10.5, Deep above
   Full, and Quick < Clear < Full < Deep for each passage), and checks the data's
   shape: ids unique, every passage has a Quick segment, starters for every level.
   Run: node tools/check-common-sense.js     Exits 1 on any problem. No browser needed. */
'use strict';
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'common-sense-data.js'));
const CS = window.COMMON_SENSE;

/* Shared reading-level measure, copied unchanged from tools/check-levels.js. */
const LEVEL_LIMITS = { Quick: 5.0, Clear: 7.5, Full: 10.5 };
function syllables(word) {
  let w = String(word).toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}
function fkGrade(html) {
  const text = String(html || '').replace(/<[^>]+>/g, ' ').replace(/\([^)]*\)/g, ' ');
  const sentences = text.split(/[.!?]+["”’')]*(?=\s|$)/).filter(s => s.trim().split(/\s+/).length > 2);
  const words = text.split(/\s+/).filter(w => /[a-z]/i.test(w));
  if (!sentences.length || !words.length) return { grade: 0, wordsPerSentence: 0 };
  const syl = words.reduce((a, w) => a + syllables(w), 0);
  return { grade: 0.39 * words.length / sentences.length + 11.8 * syl / words.length - 15.59,
           wordsPerSentence: words.length / sentences.length };
}

const KEYS = { q: 'Quick', c: 'Clear', f: 'Full', d: 'Deep' };
const problems = [];
const ids = new Set();
const rows = [];
for (const p of CS.passages) {
  if (ids.has(p.id)) problems.push(`${p.id}: duplicate id`);
  ids.add(p.id);
  if (!p.orig.some(par => par.some(s => s[0] === 'q'))) problems.push(`${p.id}: no Quick segment in the original`);
  if (!p.frame || !p.bank || !p.st || !p.st.c || !p.st.f || !p.st.d) problems.push(`${p.id}: missing a frame, bank or starter`);
  const g = {};
  for (const k of 'qcfd') {
    if (!p.plain[k]) { problems.push(`${p.id}: no ${KEYS[k]} plain English`); continue; }
    g[k] = fkGrade(p.plain[k]).grade;
    const lim = LEVEL_LIMITS[KEYS[k]];
    if (lim && g[k] > lim) problems.push(`${p.id}: ${KEYS[k]} measures ${g[k].toFixed(1)} (limit ${lim})`);
    if (/—/.test(p.plain[k] + p.note)) problems.push(`${p.id}: em dash in student prose`);
  }
  if (!(g.q < g.c && g.c < g.f && g.f < g.d)) problems.push(`${p.id}: levels do not step up (${['q','c','f','d'].map(k => (g[k]||0).toFixed(1)).join(' < ')})`);
  rows.push(`${p.id.padEnd(14)} ${'qcfd'.split('').map(k => (g[k]||0).toFixed(1).padStart(5)).join('')}`);
}
console.log('passage         Quick Clear Full Deep');
console.log(rows.join('\n'));
if (problems.length) { console.log('\nPROBLEMS:\n' + problems.join('\n')); process.exit(1); }
console.log('\nAll ' + CS.passages.length + ' passages pass.');
