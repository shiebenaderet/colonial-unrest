# Understanding Unrest in the Colonies

An interactive classroom activity for 8th grade U.S. History (Unit 2, Days 3–5). Students read nine events on the road to the American Revolution (1763–1775) at one of four reading levels, rate how much unrest each created, spend a fixed 36-point "outrage budget," reflect, and turn in their work on Canvas.

## Using it

Students use it at **https://unrest.mrbsocialstudies.org** (GitHub Pages, set by the `CNAME` file; the old `shiebenaderet.github.io/colonial-unrest/` link redirects there). You can also open `index.html` directly in any modern browser. There is no build step. The page is `index.html` plus `reader-tools.js`, `fonts/`, and `images/`. Progress autosaves in the browser (localStorage), so students can close the tab and pick up again on the same device.

### Activity flow
1. **Overview.** Students sign in (first name, last initial, period) and **pick a starting reading level**. The screen shows the learning goals, quoted word for word from Canvas: H2.6-8.5 and H1.6-8.6, with levels 3 and 4.
2. **Placards.** Students read each event, rate the unrest it created from 1 to 8, and write a reason. They can switch levels on any placard.
3. **Spend Your 36 Points.** Students rebalance all nine ratings so they total exactly 36.
4. **Reflection and turn-in.** Students answer three questions, press **Copy my work**, and paste it into the Canvas text-entry assignment **Unrest in the Colonies**. The copied text includes every first and final rating, every written reason, the total, and the reflections.

**Set up in Canvas:** create a text-entry assignment named *Unrest in the Colonies*, so students can find it by that name.

### Reading levels

| Level | The text | Notes |
|---|---|---|
| **Level 0** | About grade 2–3. Short sentences, with key words explained in the text. | Can be read in **Spanish, Portuguese, Russian, or Simplified Chinese** from the "Read in" menu. Key unit terms keep the English word beside the translation, and "Show this in English" sits under every translation. |
| **Level 1** | Below grade (FK about 6). Plain words. | |
| **Level 2** | At grade (FK about 9). | Default if no level is picked. |
| **Level 3** | Above grade. Primary sources, cited, and historiography. | |

All levels carry the same facts. Level 0 and its translations were fact-checked against Levels 1–3 and the historical record, and each translation was checked sentence by sentence against the English. Have a native speaker spot-check the translations when you can.

### Writing supports by level
Every question has one direct prompt, a **Look at** (where to find the evidence), and **Start with** sentence starters keyed to the student's level. Level 0 adds a tap-to-insert **word bank** and accepts shorter answers. Level 3 adds a **Going further** prompt aimed at the level-4 criterion.

### Paper backup
`tracker.html` prints two half-sheet trackers per letter page. Every level uses the same sheet: event, level read, first rating, final points, and one word for why. It doubles as a backup if a student's Chromebook resets, and it supports a pair or pass-the-paper version.

## Suggested pacing

The Blueprint plans three days (Fri Oct 9, which is a 75-minute early release, through Tue Oct 13). Rating alone takes most students two full periods.

- **Day 3:** Model one event, then students sign in and rate two or three placards.
- **Day 4:** Students finish rating the placards.
- **Day 5:** Students spend the 36 points, reflect, and turn in on Canvas.

Progress is saved per device. A student who switches Chromebooks starts over, so the Canvas submission and the paper tracker are the durable records.

## Accessibility and language support

- **Listen** (header) reads the current screen aloud and highlights each sentence. A Level 0 translation is read in its own language. You can tap any paragraph to jump there and change the speed. This comes from the course readings' `reader-tools.js` (see the header of `reader-tools.js` for what was adapted).
- **Font** (header) offers Atkinson Hyperlegible Next (the default, bundled), Lexend, OpenDyslexic, and Verdana, plus text size and wider spacing.
- **"Shorter answers OK"** (Accessibility, then Writing) relaxes the full-sentence and punctuation rule.
- **Key terms** appear on every placard. The five Causes of Unrest card terms are word for word and tagged "On your vocab card." Spanish, Portuguese, and French cognates are flagged.
- **Screen readers** get the point total, status messages, and a data table of the chart. The rating control and timeline work fully from the keyboard.
- **Reduced motion** is respected.

## Images

Event illustrations live locally in `images/` (public-domain works from Wikimedia Commons), so the activity works offline.
