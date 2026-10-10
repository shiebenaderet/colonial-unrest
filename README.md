# Understanding Unrest in the Colonies

An interactive classroom activity for 8th grade U.S. History (Unit 2, Days 4–6). Students read nine events on the road to the American Revolution (1763–1775) at one of four reading levels, rate how much unrest each created, spend a fixed 36-point "outrage budget," reflect, and turn in their work on Canvas.

## Using it

Students use it at **https://unrest.mrbsocialstudies.org** (GitHub Pages, set by the `CNAME` file; the old `shiebenaderet.github.io/colonial-unrest/` link redirects there). You can also open `index.html` directly in any modern browser. There is no build step. The page is `index.html` plus `reader-tools.js`, `fonts/`, and `images/`. Progress autosaves in the browser (localStorage), so students can close the tab and pick up again on the same device.

### Activity flow
1. **Sign in.** First name, last initial, period, and a reading level (each level card shows the same sentence at that level). Plain words only; no standards on this screen.
2. **Placards (Days 4–5).** One screen per event: the reading and its picture on the left, "Your turn" on the right (rate 1–8, then write why). Each placard carries a who-acted tag beside the year: **British action**, **Colonial response**, or **Both sides clash** (the Boston Massacre and Lexington & Concord), so the back-and-forth that built unrest stays visible. The tag is translated for Level 0 readers. Placard 1 opens a scale key above the 1–8 squares (*Imagine you live in the colonies. How angry would this make people, and how many of them? Pick the number that fits.*): 1 Barely noticed, 2 Grumbling, 3 Upset, 4 Angry, 5 Protest, 6 Fury, 7 Defiance, 8 Ready to fight, each described by how angry people were and how many, never by which action they took (so a word like "boycott" in a reading cannot be matched to a number). The Level 0 translations of the key still carry the older action-based meanings until the drafts in `TRANSLATIONS-TO-CHECK.md` are checked by a native speaker. On later placards it is one tap away, and the chosen number's meaning shows under the squares. The tracker prints the same key. Progress dots across the top. The learning goals (quoted verbatim from Canvas: H2.6-8.5 and H1.6-8.6, levels 3 and 4) sit in a collapsed "What we are learning" panel on placard 1.
3. **Spend 36 points with your partner (Day 6).** You post partners, each pair with a pair number. Pairs agree on one 36-point budget on their trackers ("Our pair" column); each student enters it in the app as the Pair number. Students get the number from you: post the pairs with a number beside each, and that number is the row you type their budget into on class.html.
4. **Class average (Day 6).** You type each pair's numbers into **class.html** (`unrest.mrbsocialstudies.org/class.html`): it shows the class average per event, a running-total line from 1763 to 1775 (Present mode for projecting) with who acted under each event, and the events pairs disagreed on most. The Day 6 "Think deeper" list asks students to follow the tags: after each British action, what did colonists do, and how did Britain answer? Data stays in your browser, one set per period.
5. **Reflect and turn in.** Three questions. The second (*Which event changed what happened next the most, and how?*) has two pickers, the event and what it led to (only later events are offered); the picks fill the event names into the sentence starters and are listed with the copied work. The third is the Unit 2 essential question, verbatim: *How did loyal British subjects turn into revolutionaries in barely a decade?*, with the class chart as evidence. Students press **Copy my work** and paste into the Canvas text-entry assignment **Unrest in the Colonies** (it includes every rating, reason, the group's points and the reflections).

### Backups
Work saves in the browser on that computer. **Save a backup** (placard screens and Settings) downloads a small file of everything; **Load a backup** (sign-in screen and Settings) restores it on any computer. The browser asks before closing if there is work that hasn't been backed up. Starting over takes two steps: a warning that offers a backup, then typing RESTART.

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
Every question has one direct prompt, a **Look at** (where to find the evidence), and **Start with** sentence starters keyed to the student's level. On every placard, at every level, one starter asks for Britain's side and follows the who-acted tag: what Britain hoped a British action would do, how Britain read a colonial response, or how each side saw a clash. Level 0 adds a tap-to-insert **word bank** and accepts shorter answers. Level 3 adds a **Going further** prompt aimed at the level-4 criterion.

### Paper backup
`tracker.html` prints one full-page tracker per letter sheet. Every level uses the same sheet: name, period, partner and pair number; the level read (circled once at the top); then for each event, who pushed (the student marks Britain →, ← Colonists, or →← Both), my rating, a ruled cell for why, our pair's points, and the class average. It is the paper record for the Day 6 pair budget and a backup if a computer resets.

## Suggested pacing

The Blueprint plans three days (Mon Oct 12 through Wed Oct 14). Rating alone takes most students two full periods.

- **Day 4 (Mon Oct 12):** Model one placard, then students sign in and rate two or three placards. Remind them to save a backup at the end of class.
- **Day 5 (Tue Oct 13):** Students finish rating the placards.
- **Day 6 (Wed Oct 14):** Post partners and pair numbers. Pairs agree on 36 points (about 15 min), you enter pair budgets on class.html and discuss the chart (about 10 min), then students reflect and turn in on Canvas.

Progress is saved per device. A student who switches Chromebooks loads their backup file; the Canvas submission and the paper tracker are the durable records.

## Accessibility and language support

- **Settings** (header) holds light/dark, "Shorter answers OK", Translate, backups, and start over.
- **Listen** (header) reads the current screen aloud and highlights each sentence. A Level 0 translation is read in its own language. You can tap any paragraph to jump there and change the speed. This comes from the course readings' `reader-tools.js` (see the header of `reader-tools.js` for what was adapted).
- **Font** (header) changes the reading area: it offers Atkinson Hyperlegible Next (the default, bundled), Lexend, OpenDyslexic, and Verdana, plus text size and wider spacing.
- **"Shorter answers OK"** (Settings) relaxes the full-sentence and punctuation rule.
- **Key terms** appear on every placard. The five Unit 2 terms (Proclamation of 1763, taxation without representation, boycott, repeal, Intolerable Acts) are word for word and tagged "Unit 2 word." Spanish, Portuguese, and French cognates are flagged.
- **Screen readers** get the point total, status messages, and a data table of the chart. The rating control and timeline work fully from the keyboard.
- **Reduced motion** is respected.

## Printable readings

`readings.html` (`unrest.mrbsocialstudies.org/readings.html`) is every reading at all four levels, plus Level 0 in each language, with a Print button. `canvas/unrest-readings.pdf` is the same page as a PDF. Both are generated from the text in `index.html` by `node tools/build-readings.js` (needs Playwright); rerun it after editing any reading so the print copy never drifts from the app. `canvas/` also holds the paste-ready Canvas assignment page and the tracker PDF.

## Images

Event illustrations live locally in `images/` (public-domain works from Wikimedia Commons), so the activity works offline.
