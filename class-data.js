// The whole grade's Day 6 results (every pair, every period), from the class
// page's slides. Update avg, pairs and date after a new class average; the
// Question 3 panel in index.html and the help page (reflect-help.html) are both
// built from these numbers, so one edit here updates both.
const CLASS_DATA = {
  slides:'https://docs.google.com/presentation/d/13CegoBj5ImlE9K1z1sA__QOEXiZV50I4iaSDMgxrutU/edit?usp=sharing',
  date:'2026-10-14', pairs:41,
  // The slides' before/after-1770 averages, worked from the unrounded numbers;
  // copied so the page and the slides match (blank: worked out from avg).
  early:3.2, late:4.7,
  // The slides' biggest step up (the "Step by step" chart), worked from the
  // unrounded numbers, so it can differ by 0.1 from subtracting the rounded avgs.
  jump:{from:'H', to:'I', by:3.5},
  avg:{A:2.6, B:3.3, C:3.6, D:3.2, E:5.4, F:3.8, G:4.0, H:3.2, I:6.8}
};
