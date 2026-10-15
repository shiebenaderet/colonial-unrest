#!/usr/bin/env node
/* Checks that the four reading levels still mean what READING-LEVELS.md says:
   the labels and blurbs students see, and how hard each level's text measures.
   Run: node tools/check-levels.js   (needs Playwright, like build-readings.js)
   Exits 1 on any problem. */
'use strict';
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright')); }

/* Shared reading-level measure (see READING-LEVELS.md). Copy this block into a
   repo's check-levels script unchanged so every site measures the same way. */
const LEVEL_NAMES = ['Quick', 'Clear', 'Full', 'Deep'];
const LEVEL_BLURBS = {
  Quick: 'Short sentences. Key words explained.',
  Clear: 'Plain words, a little more detail.',
  Full: 'The grade-level reading.',
  Deep: 'Adds real quotes from the time and what historians argue.'
};
const LEVEL_LIMITS = { Quick: 5.0, Clear: 7.5, Full: 10.5 }; // Deep: must beat Full

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
  const sentences = text.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().split(/\s+/).length > 2);
  const words = text.split(/\s+/).filter(w => /[a-z]/i.test(w));
  if (!sentences.length || !words.length) return { grade: 0, wordsPerSentence: 0 };
  const syl = words.reduce((a, w) => a + syllables(w), 0);
  return {
    grade: 0.39 * words.length / sentences.length + 11.8 * syl / words.length - 15.59,
    wordsPerSentence: words.length / sentences.length
  };
}

/* levels: { Quick: html, Clear: html, Full: html, Deep: html } (any may be missing).
   Returns a list of problems for one topic. */
function checkTopic(topic, levels) {
  const problems = [];
  const g = {};
  LEVEL_NAMES.forEach(n => { if (levels[n]) g[n] = fkGrade(levels[n]).grade; });
  Object.keys(LEVEL_LIMITS).forEach(n => {
    if (g[n] != null && g[n] > LEVEL_LIMITS[n]) problems.push(`${topic}: ${n} measures ${g[n].toFixed(1)} (limit ${LEVEL_LIMITS[n]})`);
  });
  for (let i = 1; i < LEVEL_NAMES.length; i++) {
    const a = LEVEL_NAMES[i - 1], b = LEVEL_NAMES[i];
    if (g[a] != null && g[b] != null && !(g[b] > g[a])) problems.push(`${topic}: ${b} (${g[b].toFixed(1)}) does not measure harder than ${a} (${g[a].toFixed(1)})`);
  }
  return problems;
}




/* Quick keeps one extra clause on this site: the languages it can be read in. */
/* Known exceptions, Oct 15 2026. The activity ran Oct 12-14. These texts are left
   as they are because the Quick text has checked translations in four languages
   and Mr. B's recordings are cued to its exact sentences (a rewrite would drop the
   recording back to the computer voice). Rewrite them, re-check the translations
   and re-record before this activity runs again, then empty this list. Any NEW
   problem still fails. */
const KNOWN = [
  'A Proclamation of 1763: Quick measures 5.2 (limit 5)',
  'F Boston Tea Party: Full measures 11.4 (limit 10.5)',
  'F Boston Tea Party: Deep (10.9) does not measure harder than Full (11.4)',
  'G Intolerable (Coercive) Acts: Quick measures 5.1 (limit 5)',
  'H First Continental Congress: Quick measures 5.5 (limit 5)',
  'I Lexington & Concord: Quick measures 5.1 (limit 5)'
];
const SITE_EXTRA = { Quick: ' Also in Español, Português, Русский, 中文.' };

(async () => {
  const opts = {};
  try { require('fs').accessSync('/opt/pw-browsers'); } catch (e) {}
  const browser = await chromium.launch(opts);
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  const data = await page.evaluate(() => ({
    levels: LEVELS,
    events: EVENTS.map(e => ({ id: e.id, title: e.title, Quick: (LEVEL0[e.id] || {}).en || '', Clear: SOME_SUPPORT[e.id] || '', Full: e.core || '', Deep: e.adv || '' }))
  }));
  await browser.close();

  const problems = [];
  const keyName = { l0: 'Quick', ss: 'Clear', core: 'Full', adv: 'Deep' };
  data.levels.forEach((l, i) => {
    const want = LEVEL_NAMES[i];
    if (l.label !== want || keyName[l.key] !== want) problems.push(`LEVELS[${i}] is "${l.label}" (${l.key}); expected ${want}`);
    const blurb = LEVEL_BLURBS[want] + (SITE_EXTRA[want] || '');
    if (l.blurb !== blurb) problems.push(`${want} blurb is "${l.blurb}"; expected "${blurb}"`);
  });

  console.log('Placard'.padEnd(34) + LEVEL_NAMES.map(n => n.padStart(7)).join(''));
  const sums = { Quick: [], Clear: [], Full: [], Deep: [] };
  data.events.forEach(e => {
    const row = LEVEL_NAMES.map(n => { const g = e[n] ? fkGrade(e[n]).grade : NaN; if (!isNaN(g)) sums[n].push(g); return isNaN(g) ? '     --' : g.toFixed(1).padStart(7); });
    console.log((e.id + ' ' + e.title).slice(0, 33).padEnd(34) + row.join(''));
    problems.push(...checkTopic(e.id + ' ' + e.title, e));
  });
  console.log('Average'.padEnd(34) + LEVEL_NAMES.map(n => (sums[n].reduce((a, b) => a + b, 0) / (sums[n].length || 1)).toFixed(1).padStart(7)).join(''));
  const known = problems.filter(p => KNOWN.indexOf(p) !== -1);
  const fresh = problems.filter(p => KNOWN.indexOf(p) === -1);
  if (known.length) console.log('\nKnown, left as is (see KNOWN): ' + known.length);
  problems.length = 0; problems.push(...fresh);
  if (problems.length) { console.log('\n' + problems.length + ' problem(s):\n  ' + problems.join('\n  ')); process.exit(1); }
  console.log('\nLevels match READING-LEVELS.md.');
})();
