// Step-by-step help for the three reflection questions.
// One source for two places: the "Step-by-Step Help" box under each question in
// index.html, and the linkable help page, reflect-help.html (#q1, #q2, #q3).
// Edit the wording here and both update. Needs class-data.js loaded first.
//
// Keys match index.html's REFLECTION_QS: q3 = Question 1, q4 = Question 2,
// q5 = Question 3 (the unit question).
// steps  = Full, Clear and Deep readers.  quick = Quick readers.
// app    = steps used in the activity when they differ from the page's
//          (Question 3 points to the "Use our class data" box instead of
//          repeating it).
// Text is trusted HTML written here. {tokens} come from CLASS_DATA.

const REFLECT_HELP_NAMES = {
  A:'Proclamation of 1763', B:'Quartering Act', C:'Stamp Act', D:'Townshend Acts',
  E:'Boston Massacre', F:'Boston Tea Party', G:'Intolerable Acts',
  H:'First Continental Congress', I:'Lexington & Concord'
};

const REFLECT_HELP = {
  q3: {
    n:1, anchor:'q1',
    q:'Which event did you move the most points on, and what changed your mind?',
    lead:'This question asks how your thinking changed between your first ratings and your pair’s 36 points.',
    steps:[
      '<strong>Find the table</strong> called “How your ratings changed,” just above the questions.',
      '<strong>Look at the Change column.</strong> Find the biggest number, plus or minus. That is your event. If two are tied, pick the one you can explain best.',
      '<strong>Write down three facts:</strong> the event, your first rating, and your pair’s points.',
      '<strong>Remember why you changed it.</strong> Did the 36-point limit force you to choose? Did your partner give a reason you had not thought of? Did you compare it with a bigger event, like Lexington &amp; Concord?',
      '<strong>Write two sentences.</strong> The first gives the event and the numbers. The second gives the reason, using <em>because</em>.'
    ],
    quick:[
      'Find the <strong>Change</strong> column in the table above the questions.',
      'Find the biggest number. That is your event.',
      'Tap a starter. Fill in the event, your first number, and your pair’s number.',
      'Say why you changed it. Use <em>because</em> and a word from the word bank.'
    ],
    model:'I moved the Proclamation of 1763 from 6 to 2 points. My partner pointed out that the line mostly angered settlers who wanted western land, while the Stamp Act taxed everyone who bought paper. Because we only had 36 points, we gave the Stamp Act more.',
    modelNote:'Write about <strong>your own</strong> event and <strong>your own</strong> reason.'
  },
  q4: {
    n:2, anchor:'q2',
    q:'Which event changed what happened next the most, and how?',
    lead:'This is a cause-and-effect question. The event that made people angriest is <strong>not always</strong> the one that changed what came next.',
    steps:[
      '<strong>Look at your tracker arrows.</strong> Find a spot where one side pushed and the other side pushed back.',
      '<strong>Pick your cause</strong> in the menu that says “This event…”',
      '<strong>Pick its effect</strong> in the menu that says “…led to.” Only later events show up.',
      '<strong>Explain the link.</strong> What did people do because of the first event? Use <em>led to</em> or <em>because</em>.',
      '<strong>Add one sentence</strong> about what came after that, if you can. This shows the chain keeps going.'
    ],
    quick:[
      'Pick an event in the first menu.',
      'Pick what happened after it in the second menu.',
      'Tap a starter. It fills in the two events for you.',
      'Say what people did after the first event. Use <em>because</em> or <em>so</em>.'
    ],
    pairsTitle:'Pairs That Work Well',
    pairs:[
      ['D','E','Britain sent soldiers to Boston to enforce the taxes.'],
      ['F','G','Parliament punished Boston and closed its harbor.'],
      ['G','H','Other colonies took Boston’s side and met together.'],
      ['H','I','Colonists prepared militias, and Britain moved to seize their supplies.']
    ],
    model:'The Boston Tea Party changed what happened next the most: it led to the Intolerable Acts because Parliament closed Boston Harbor until the tea was paid for. That punishment made the other colonies take Boston’s side, so they met at the First Continental Congress.',
    modelNote:'Pick a pair you can explain in your own words.'
  },
  q5: {
    n:3, anchor:'q3',
    q:'How did loyal British subjects turn into revolutionaries in barely a decade?',
    lead:'This is the unit question. Your evidence is the <strong>class data</strong>: the average points all {pairs} pairs gave each event. 4 points is an average event. More points means more unrest.',
    steps:[
      '<strong>Look at the class data.</strong> Read the bars from top to bottom, 1763 to 1775.',
      '<strong>Did unrest grow?</strong> Events before 1770 averaged <strong>{early}</strong> points. Events from 1770 on averaged <strong>{late}</strong>. Write down what that tells you.',
      '<strong>What did Britain do?</strong> Britain went from a line on a map (Proclamation of 1763), to taxes (Stamp Act, Townshend Acts), to punishing all of Boston (Intolerable Acts).',
      '<strong>How did colonists answer?</strong> Colonists answered with a boycott, then the Boston Tea Party, then all the colonies meeting at the First Continental Congress.',
      '<strong>Find the clashes.</strong> {top} got the most points, <strong>{topn}</strong>. The biggest jump was {jumpTo}: <strong>{jump}</strong> points more than the {jumpFrom} right before it.',
      '<strong>Make your claim.</strong> Did anger come from one turning point, or did it build step by step? Building step by step is called <strong>escalation</strong>: each side answers the other a little harder.',
      '<strong>Write three or four sentences:</strong> your claim, at least one number, and what the number shows. Use at least two Unit 2 words: Proclamation of 1763, taxation without representation, boycott, repeal, Intolerable Acts.'
    ],
    app:[
      '<strong>Open “Use our class data”</strong> just above. Work through its “How to use the numbers” steps.',
      '<strong>Make your claim.</strong> Did anger come from one turning point, or did it build step by step? Building step by step is called <strong>escalation</strong>.',
      '<strong>Give at least one number.</strong> For example, events before 1770 averaged {early} points, and events from 1770 on averaged {late}.',
      '<strong>Explain what the number shows.</strong> Say <em>why</em> it went up, not just that it did.',
      '<strong>Use at least two Unit 2 words:</strong> Proclamation of 1763, taxation without representation, boycott, repeal, Intolerable Acts.'
    ],
    quick:[
      'Look at the class data bars above. Longer bars mean more anger.',
      'Before 1770, events got <strong>{early}</strong> points. From 1770 on, they got <strong>{late}</strong>. Which is bigger?',
      'Tap a starter. Fill in the numbers.',
      'Say why anger grew. Use a word from the word bank.'
    ],
    modelTitle:'How to Use a Number',
    model:'Our class gave {top} {topn} points, the most of any event. This shows that ___.',
    modelNote:'Then finish the thought in your own words. Explain <strong>why</strong> the number went up, not just that it did.'
  }
};

const REFLECT_HELP_PAGE = 'reflect-help.html';

function reflectHelpTokens(){
  const D = (typeof CLASS_DATA !== 'undefined') ? CLASS_DATA : null;
  if(!D) return {};
  const f = n => Number(n).toFixed(1);
  const ids = Object.keys(D.avg);
  const top = ids.slice().sort((a,b)=>D.avg[b]-D.avg[a])[0];
  const j = D.jump || {};
  return {
    pairs:D.pairs, early:f(D.early), late:f(D.late),
    top:REFLECT_HELP_NAMES[top], topn:f(D.avg[top]),
    jumpTo:REFLECT_HELP_NAMES[j.to] || '', jumpFrom:REFLECT_HELP_NAMES[j.from] || '',
    jump:j.by != null ? f(j.by) : ''
  };
}
function reflectHelpFill(text){
  const t = reflectHelpTokens();
  return String(text).replace(/\{(\w+)\}/g, (m,k) => k in t ? t[k] : m);
}

// Sample answers can be read but not copied or clicked into the answer box.
function reflectHelpNoCopy(el){
  el.classList.add('rh-nocopy');
  ['copy','cut','contextmenu','dragstart','selectstart'].forEach(ev =>
    el.addEventListener(ev, e => e.preventDefault()));
  return el;
}

function rhEl(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html != null) e.innerHTML = reflectHelpFill(html);
  return e;
}
function rhList(items){
  const ol = rhEl('ol','rh-steps');
  items.forEach(s => ol.appendChild(rhEl('li','',s)));
  return ol;
}
function rhModel(cfg, inDetails){
  const quote = reflectHelpNoCopy(rhEl('blockquote','rh-model', cfg.model));
  const note = rhEl('p','rh-model-note', cfg.modelNote);
  if(!inDetails){ const box = rhEl('div','rh-model-wrap'); box.append(quote, note); return box; }
  const d = rhEl('details','rh-model-box');
  d.appendChild(rhEl('summary','', cfg.modelTitle || 'See a Model Answer'));
  d.append(quote, note);
  return d;
}
function rhPairs(cfg){
  const box = rhEl('div','rh-pairs');
  box.appendChild(rhEl('p','rh-pairs-title', '<strong>' + cfg.pairsTitle + '</strong>'));
  const ul = rhEl('ul','');
  cfg.pairs.forEach(([a,b,why]) => ul.appendChild(rhEl('li','',
    '<strong>' + REFLECT_HELP_NAMES[a] + '</strong> led to <strong>' + REFLECT_HELP_NAMES[b] + '</strong>. ' + why)));
  box.appendChild(ul);
  return box;
}

// The collapsible box under a question in the activity.
// key: 'q3' | 'q4' | 'q5'. quick: true for Quick readers.
function buildReflectHelp(key, quick){
  const cfg = REFLECT_HELP[key];
  const d = rhEl('details','reflect-help');
  d.appendChild(rhEl('summary','', 'Step-by-Step Help'));
  const steps = quick ? cfg.quick : (cfg.app || cfg.steps);
  d.appendChild(rhList(steps));
  if(cfg.pairs && !quick) d.appendChild(rhPairs(cfg));
  d.appendChild(rhModel(cfg, true));
  const link = rhEl('a','rh-page-link', 'Open the help page in a new tab ↗');
  link.href = REFLECT_HELP_PAGE + '#' + cfg.anchor;
  link.target = '_blank'; link.rel = 'noopener';
  d.appendChild(link);
  return d;
}
