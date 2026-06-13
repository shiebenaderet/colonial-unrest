# Understanding Unrest in the Colonies

An interactive, single-file classroom activity for middle school U.S. History. Students read nine events on the road to the American Revolution (1763–1775) at three reading levels, weigh how much unrest each created by spending a fixed 36-point "outrage budget," then reflect and submit their thinking to a Google Form.

## Using it

Open `index.html` in any modern browser, or host it (e.g. GitHub Pages) so students reach it by link. No build step or server required — everything is in the one HTML file. Progress autosaves in the browser (localStorage), so students can close the tab and resume on the same device.

### Activity flow
1. **Overview** — vocabulary, learning goals, and how the point budget works.
2. **Placards** — read each event at one of three reading levels (the tabs read **Explain / Default / Tell me more**, from simplest to most advanced), rate the unrest it created 1–8, and write a rationale.
3. **Spend Your 36 Points** — rebalance all nine ratings to total exactly 36, forcing students to decide which events mattered most.
4. **Reflection** — short-answer questions, pre-filled into a linked Google Form.

## Suggested pacing

The full activity (nine placards with written rationales, the budget rebalance, and three reflections) typically runs **60–75 minutes** — tight for a single period. A common split:

- **Day 1:** Overview + rate all nine placards.
- **Day 2:** Spend the 36 points + reflection + submit.

Because progress is saved in the browser, students on the same device pick up where they left off. (Note: progress is per-device — a student who switches Chromebooks starts over, so the Google Form submission is the durable record.)

## Accessibility & language support

These are built in for students who need them:

- **Readable font (Lexend)** and **light/dark mode** toggles.
- **"Shorter answers OK"** toggle (Accessibility panel → Writing) — relaxes the full-sentence/punctuation requirement on rationales for students with written-expression accommodations or those using speech-to-text.
- **Key terms** panel on every placard — defines content vocabulary and flags Spanish/Portuguese/French **cognates** for multilingual learners.
- **Screen-reader support** — the point total, status messages, and a data-table version of the progress chart are announced to assistive tech; the rating control and timeline are fully keyboard-operable.
- **Reduced motion** — animations and smooth scrolling are disabled automatically when the student's device requests reduced motion.
- **Translate** — works once the page is hosted online (not from a local file).

## Customizing the Google Form

The reflection step pre-fills a Google Form via the `FORM_BASE` and `ENTRY` values near the top of the `<script>` block in `index.html`. Replace these with your own form's URL and entry IDs to collect responses in your own form.

## Images

Event illustrations live locally in `images/` (public-domain works from Wikimedia Commons) so the activity works offline and doesn't depend on external links staying alive.
