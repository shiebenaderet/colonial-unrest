/* Listen and Font: the reader tools on every leveled reading page.

   COPIED FROM ams-planning/reader-tools.js (Oct 2026) and adapted for this
   activity, which redraws its screens and mixes languages. Changes, each marked
   "ADAPTED" below, so the two copies can be compared:
     1. Reads every visible block on the current screen (headings, paragraphs,
        list items, labels, legends, summaries), not only the reading.
     2. Each block is read in its own language (the nearest lang attribute), so
        a Level 0 placard in Spanish, Portuguese, Russian or Chinese gets a voice
        for that language. Sentence splitting uses that language too.
     3. READER_TOOLS.reset() stops reading and forgets the sentence list; the
        activity calls it whenever it redraws a screen.
     4. Text size zooms the activity, whose styles are in px, not rem.


   Loaded by the colonial-regions and columbian-exchange reading pages, which the
   builders copy into the ams repo beside this file (tools/build-student-readings.py,
   tools/build-contact-handout.py). It needs one element on the page,
   <div id="rtools"></div>, where the buttons go, and reads the reading from every
   element marked data-listen.

   LISTEN
   The browser's own speech (speechSynthesis), one sentence at a time, with the
   sentence being read highlighted. The highlight uses the CSS Custom Highlight API,
   which paints a Range without touching the DOM -- wrapping every sentence in a
   span would break the vocabulary pop-ups inside the paragraphs, and would be a
   second copy of the text for Translate to trip over. Where the API is missing the
   whole paragraph is marked instead.

   Sentences are spoken one utterance each, not a paragraph at a time: Chrome stops
   a long utterance partway through on some voices, and one sentence per utterance
   is also what makes "click a paragraph to jump there" and the highlight exact.
   Pause is a cancel that remembers where it was, because speechSynthesis.pause()
   is unreliable with Chrome's network voices; Resume re-reads that sentence.

   RECORDED AUDIO
   If window.READER_AUDIO maps a part's heading id to {src, cues}, the voice menu
   offers "Mr. B" and that part plays the recording instead, highlighting by the
   cue times (seconds, one per sentence, in the page's own sentence order). Parts
   with no recording fall back to the computer voice, so a half-recorded reading
   still plays straight through. tools/align-audio.py writes the cues.

   FONT
   Typeface, size and spacing, saved per browser. The menu says "Font", not
   "dyslexia": dyslexia typefaces show no reading benefit in the research (pooled
   g = -0.04 over 15 studies), so this is a comfort preference, and labelling it as
   an accommodation would invite it to stand in for one. The spacing setting widens
   words, lines and paragraphs in the reading only.

   Every storage access is wrapped: localStorage throws in private windows and
   comes back empty after a clear, and the page has to work either way. */
(function () {
  'use strict';
  var PREF_KEY = 'rtools:prefs';
  var LANG = (document.documentElement.lang || 'en').toLowerCase();
  var ES = LANG.indexOf('es') === 0;
  var T = ES ? {
    listen: 'Escuchar', pause: 'Pausa', resume: 'Seguir', stop: 'Parar',
    font: 'Letra', speed: 'Velocidad', voice: 'Voz', computer: 'Computadora',
    teacher: 'Mr. B', size: 'Tamaño', spacing: 'Espacio', normal: 'Normal',
    wide: 'Amplio', none: 'Este navegador no puede leer en voz alta.',
    tip: 'Mientras escuchas, toca un párrafo para saltar allí.'
  } : {
    listen: 'Listen', pause: 'Pause', resume: 'Resume', stop: 'Stop',
    font: 'Font', speed: 'Speed', voice: 'Voice', computer: 'Computer',
    teacher: 'Mr. B', size: 'Size', spacing: 'Spacing', normal: 'Normal',
    wide: 'Wide', none: 'This browser cannot read aloud.',
    tip: 'While it reads, tap any paragraph to jump there.'
  };

  var FONTS = [
    { id: 'atkinson', label: 'Atkinson',
      family: "'Atkinson Hyperlegible Next','Atkinson Hyperlegible',Georgia,serif" },
    { id: 'lexend', label: 'Lexend', family: "'Lexend',system-ui,sans-serif",
      css: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300..700&display=swap' },
    { id: 'opendyslexic', label: 'OpenDyslexic', family: "'OpenDyslexic',sans-serif" },
    { id: 'verdana', label: 'Verdana', family: 'Verdana,Tahoma,sans-serif' }
  ];

  /* ------------------------------------------------------------ prefs */
  function loadPrefs() {
    try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) {}
  }
  var prefs = loadPrefs();

  function fontById(id) {
    for (var i = 0; i < FONTS.length; i++) if (FONTS[i].id === id) return FONTS[i];
    return FONTS[0];
  }
  var loadedCss = {};
  function loadFontCss(f) {
    if (!f.css || loadedCss[f.id]) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = f.css;
    document.head.appendChild(l);
    loadedCss[f.id] = true;
  }
  function applyPrefs() {
    var f = fontById(prefs.font);
    loadFontCss(f);
    var root = document.documentElement;
    root.style.setProperty('--rt-font', f.family);
    root.setAttribute('data-rt-font', f.id);
    /* An attribute and a screen-only rule, never root.style.fontSize: an inline
       size beats the print stylesheet's 11pt, and the first version printed every
       page at screen size -- a page longer, silently. */
    root.setAttribute('data-rt-size', String(prefs.size | 0));
    root.setAttribute('data-rt-spacing', prefs.wide ? 'wide' : 'normal');
  }

  /* ------------------------------------------------------------ styles */
  /* Not called CSS: that would shadow window.CSS, and CSS.highlights with it --
     which is how the first version silently fell back to marking whole paragraphs. */
  var STYLE = [
    "@font-face{font-family:'OpenDyslexic';font-weight:400;font-style:normal;font-display:swap;src:url('fonts/OpenDyslexic-Regular.woff2') format('woff2');}",
    "@font-face{font-family:'OpenDyslexic';font-weight:700;font-style:normal;font-display:swap;src:url('fonts/OpenDyslexic-Bold.woff2') format('woff2');}",
    "@font-face{font-family:'OpenDyslexic';font-weight:400;font-style:italic;font-display:swap;src:url('fonts/OpenDyslexic-Italic.woff2') format('woff2');}",
    /* The chosen face goes on the page body, not the sticky menu: OpenDyslexic is
       wide enough to wrap the level switcher onto two lines. */
    'html[data-rt-font] main.wrap{font-family:var(--rt-font);}', /* ADAPTED: reading area only, never the header */
    /* The pages are built at 18px; sizes 1 and 2 are screen only. */
    /* ADAPTED (4): this activity is styled in px, so size zooms it instead. */
    '@media screen{html[data-rt-size="1"] main.wrap{zoom:1.12;}html[data-rt-size="2"] main.wrap{zoom:1.25;}}',
    /* Reading text only, not the navigation: applied to the whole page, the menu
       wrapped onto two lines. WCAG 2.2 SC 1.4.12's figures (letters .12em, words
       .16em, paragraphs 2x) are what a page must SURVIVE, not a comfortable
       setting -- at .12em an already-wide face like OpenDyslexic came apart into
       single letters. Words and lines get the full amount, letters a third. */
    'html[data-rt-spacing="wide"] :is([data-listen],.vbox) :is(p,li,dd){line-height:1.95;letter-spacing:.04em;word-spacing:.16em;margin-bottom:2em;}',
    '#rtools{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:0 0 1.5rem;}',
    '.rt-btn{font:inherit;font-size:.95rem;min-height:44px;padding:.45rem .95rem;cursor:pointer;',
    '  border:2px solid var(--accent);border-radius:.5rem;background:var(--card);color:var(--ink);',
    '  display:inline-flex;align-items:center;gap:.45rem;letter-spacing:normal;word-spacing:normal;}',
    '.rt-btn:hover,.rt-btn:focus-visible{background:var(--band);}',
    '.rt-btn:focus-visible{outline:3px solid var(--accent);outline-offset:2px;}',
    '.rt-btn.rt-primary{background:var(--accent);color:var(--bg);font-weight:700;}',
    '.rt-btn svg{width:1.05em;height:1.05em;flex:none;}',
    '.rt-panel{flex-basis:100%;border:1px solid var(--rule);border-radius:.5rem;background:var(--card);',
    '  padding:.75rem .9rem;display:none;letter-spacing:normal;word-spacing:normal;line-height:1.5;}',
    '.rt-panel.rt-open{display:block;}',
    '.rt-row{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;margin:0 0 .6rem;}',
    '.rt-row:last-child{margin:0;}',
    '.rt-lab{font-size:.85rem;color:var(--muted);min-width:4.5rem;}',
    '.rt-opt{font:inherit;font-size:.9rem;min-height:40px;padding:.3rem .7rem;cursor:pointer;',
    '  border:1px solid var(--rule);border-radius:.4rem;background:var(--bg);color:var(--ink);}',
    '.rt-opt[aria-pressed="true"]{border:2px solid var(--accent);font-weight:700;}',
    /* The player floats while reading so Pause is reachable wherever the reader
       has scrolled. Bottom centre, clear of the progress rail on the right. */
    '.rt-player{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:40;',
    '  display:none;gap:.4rem;align-items:center;flex-wrap:wrap;justify-content:center;',
    '  background:var(--card);border:2px solid var(--accent);border-radius:.7rem;',
    '  padding:.45rem .6rem;box-shadow:0 6px 24px rgba(0,0,0,.25);max-width:calc(100vw - 1.5rem);',
    '  letter-spacing:normal;word-spacing:normal;line-height:1.3;}',
    '.rt-player.rt-on{display:flex;}',
    '.rt-player select{font:inherit;font-size:.9rem;min-height:40px;border:1px solid var(--rule);',
    '  border-radius:.4rem;background:var(--bg);color:var(--ink);padding:0 .3rem;}',
    '.rt-tip{font-size:.8rem;color:var(--muted);flex-basis:100%;text-align:center;}',
    '::highlight(rt-sent){background-color:#ffe28a;color:#111;}',
    '.rt-cur{background:#fff3c4;color:#111;border-radius:.25rem;}',
    '.rt-playing [data-listen] p,.rt-playing [data-listen] h3{cursor:pointer;}',
    '@media print{#rtools,.rt-player{display:none !important;}}'
  ].join('\n');

  var ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>',
    font: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.6 4h2.2l5.6 15h-2.3l-1.5-4.1H7.8L6.3 19H4zm-1.1 9h4.9L11 6.6z"/></svg>'
  };

  /* ------------------------------------------------------------ sentences */
  var BLOCKS = 'h1,h2,h3,h4,p,li,legend,label,summary,blockquote'; /* ADAPTED (1) */

  /* Every readable block inside the data-listen containers, in page order, each
     split into sentences with character offsets into its text. */
  function collect() {
    var out = [];
    var roots = document.querySelectorAll('[data-listen]');
    for (var r = 0; r < roots.length; r++) {
      var els = roots[r].querySelectorAll(BLOCKS);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        /* .colonies is the list under a region's name, which every level's first
           sentence then says again -- heard twice in a row, it sounds like a stutter. */
        if (el.closest('.up, .colonies, .vpop-bubble, [data-no-listen]')) continue;
        /* ADAPTED (1): skip hidden blocks (closed panels) and blocks nested in
           another block, which is read whole. */
        if (!el.getClientRects().length) continue;
        var outer = el.parentElement && el.parentElement.closest(BLOCKS);
        if (outer && roots[r].contains(outer)) continue;
        var text = el.textContent;
        if (!text.replace(/\s/g, '')) continue;
        var langEl = el.closest('[lang]');                              /* ADAPTED (2) */
        var lang = ((langEl && langEl.getAttribute('lang')) || LANG).toLowerCase();
        var skip = foreignSpans(el, lang);
        var sents = split(text, lang);
        for (var s = 0; s < sents.length; s++) {
          var said = spoken(text, sents[s][0], sents[s][1], skip);
          if (!said) continue;
          out.push({ el: el, start: sents[s][0], end: sents[s][1],
                     text: said, part: partOf(el), lang: lang });
        }
      }
    }
    return out;
  }

  /* Character ranges, within el's text, of any descendant marked as another
     language. The Spanish page prints each heading's English beside it, and a
     Spanish voice reading "(What the Columbian Exchange was)" is noise. Words in
     brackets inside a sentence are plain text and are still read. */
  function foreignSpans(el, base) {
    base = base || LANG;
    var out = [];
    var marked = el.querySelectorAll('[lang]');
    if (!marked.length) return out;
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var pos = 0, node;
    while ((node = tw.nextNode())) {
      var host = node.parentElement.closest('[lang]');
      var len = node.nodeValue.length;
      if (host && el.contains(host) && host !== el &&
          host.getAttribute('lang').toLowerCase().split('-')[0] !== base.split('-')[0]) {
        out.push([pos, pos + len]);
      }
      pos += len;
    }
    return out;
  }
  function spoken(text, a, b, skip) {
    if (!skip.length) return text.slice(a, b).trim();
    var said = '';
    for (var i = a; i < b; i++) {
      var inside = false;
      for (var k = 0; k < skip.length; k++) if (i >= skip[k][0] && i < skip[k][1]) { inside = true; break; }
      if (!inside) said += text.charAt(i);
    }
    return said.replace(/\s+/g, ' ').trim();
  }

  function split(text, lang) {
    var res = [];
    if (window.Intl && Intl.Segmenter) {
      var seg = new Intl.Segmenter(lang || LANG, { granularity: 'sentence' });
      var it = seg.segment(text)[Symbol.iterator](), n;
      while (!(n = it.next()).done) {
        var a = n.value.index, b = a + n.value.segment.length;
        if (text.slice(a, b).replace(/\s/g, '')) res.push([a, b]);
      }
      return res;
    }
    var re = /[^.!?]+[.!?]*["”’)]*\s*/g, m;
    while ((m = re.exec(text))) {
      if (m[0].replace(/\s/g, '')) res.push([m.index, m.index + m[0].length]);
      if (!m[0]) re.lastIndex++;
    }
    return res.length ? res : [[0, text.length]];
  }

  /* The part a block belongs to, i.e. which recording covers it. Parts are the
     h3 sections. A region's h2 title opens the first section under it, so a
     recording of "The land and the weather" starts with "New England Colonies"
     rather than that title needing a four-second file of its own. */
  function partOf(el) {
    var heads = document.querySelectorAll('[data-listen] h2, [data-listen] h3[id]');
    var id = '', pendingH2 = false;
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      var before = h === el || (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (!before && !pendingH2) break;
      if (h.tagName === 'H2') { pendingH2 = true; continue; }
      if (pendingH2 || before) { id = h.id; pendingH2 = false; if (!before) break; }
    }
    return id;
  }

  /* A Range over [start, end) of an element's text, across its text nodes. */
  function rangeFor(el, start, end) {
    var range = document.createRange();
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var pos = 0, node, set = false;
    while ((node = tw.nextNode())) {
      var len = node.nodeValue.length;
      if (!set && start < pos + len) { range.setStart(node, start - pos); set = true; }
      if (set && end <= pos + len) { range.setEnd(node, end - pos); return range; }
      pos += len;
    }
    if (set) range.setEndAfter(el.lastChild || el);
    else range.selectNodeContents(el);
    return range;
  }

  var HAS_HL = !!(window.CSS && CSS.highlights && window.Highlight);
  var markedEl = null;
  function mark(item) {
    clearMark();
    if (!item) return;
    if (HAS_HL) CSS.highlights.set('rt-sent', new Highlight(rangeFor(item.el, item.start, item.end)));
    else { item.el.classList.add('rt-cur'); markedEl = item.el; }
    var r = item.el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < 70 || r.bottom > vh - 110) {
      item.el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  function clearMark() {
    if (HAS_HL) CSS.highlights.delete('rt-sent');
    if (markedEl) { markedEl.classList.remove('rt-cur'); markedEl = null; }
  }

  /* ------------------------------------------------------------ voices */
  var synth = window.speechSynthesis;
  /* ADAPTED (2): one best voice per language, looked up when first needed. */
  var voices = {};
  function voiceFor(lang) {
    var want = (lang || LANG).split('-')[0];
    if (!(want in voices)) voices[want] = pickVoice(want);
    return voices[want];
  }
  function pickVoice(want) {
    if (!synth) return null;
    var vs = synth.getVoices(), best = null, score = -1;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i], l = (v.lang || '').toLowerCase().replace('_', '-');
      if (l.split('-')[0] !== want) continue;
      var s = 1;
      if (/natural|online|neural/i.test(v.name)) s += 4;
      if (/google/i.test(v.name)) s += 3;
      if (want === 'en' && l === 'en-us') s += 2;
      if (want === 'es' && (l === 'es-us' || l === 'es-mx')) s += 2;
      if (want === 'pt' && l === 'pt-br') s += 2;
      if (want === 'zh' && (l === 'zh-cn' || l === 'cmn-hans-cn')) s += 2;
      if (v.localService === false) s += 1;
      if (s > score) { score = s; best = v; }
    }
    return best;
  }
  if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', function () { voices = {}; });

  /* ------------------------------------------------------------ player */
  var AUDIO = window.READER_AUDIO || {};
  var hasRec = false;
  for (var k in AUDIO) if (Object.prototype.hasOwnProperty.call(AUDIO, k)) { hasRec = true; break; }

  var items = [], idx = 0, playing = false, token = 0;
  var rate = +prefs.rate || 1;
  var useRec = hasRec && prefs.voice !== 'computer';
  var audio = null, audioPart = '';

  function speakFrom(i) {
    token++;
    var my = token;
    if (synth) synth.cancel();
    if (audio) audio.pause();
    if (i >= items.length) { stop(); return; }
    idx = i;
    playing = true;
    document.documentElement.classList.add('rt-playing');
    var it = items[i];
    if (useRec && AUDIO[it.part]) { playRecording(it.part, i, my); return; }
    mark(it);
    render();
    if (!synth) { stop(); return; }
    var u = new SpeechSynthesisUtterance(it.text);
    var voice = voiceFor(it.lang);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : it.lang;
    u.rate = rate;
    u.onend = function () { if (my === token && playing) speakFrom(idx + 1); };
    u.onerror = function (e) {
      if (my !== token) return;
      if (e && (e.error === 'interrupted' || e.error === 'canceled')) return;
      speakFrom(idx + 1);
    };
    synth.speak(u);
  }

  function firstOfPart(i) {
    var p = items[i].part;
    while (i > 0 && items[i - 1].part === p) i--;
    return i;
  }

  /* One recording per part. Sentence n of the part starts at cues[n]. */
  function playRecording(part, i, my) {
    var rec = AUDIO[part];
    if (!audio) {
      audio = new Audio();
      audio.addEventListener('timeupdate', onTime);
      audio.addEventListener('ended', function () {
        if (!playing) return;
        var j = idx;
        while (j < items.length && items[j].part === audioPart) j++;
        speakFrom(j);
      });
    }
    if (audioPart !== part) { audio.src = rec.src; audioPart = part; }
    audio.playbackRate = rate;
    var cue = rec.cues[i - firstOfPart(i)];
    audio.currentTime = typeof cue === 'number' ? cue : 0;
    mark(items[i]);
    render();
    var pr = audio.play();
    if (pr && pr.catch) pr.catch(function () {
      if (my !== token) return;
      /* The file failed or the browser blocked it: read this part aloud instead. */
      delete AUDIO[part];
      speakFrom(i);
    });
  }
  function onTime() {
    if (!playing || !audio || !AUDIO[audioPart] || !items[idx]) return;
    var cues = AUDIO[audioPart].cues, t = audio.currentTime;
    var first = firstOfPart(idx), w = 0;
    for (var c = 0; c < cues.length; c++) if (cues[c] <= t + 0.05) w = c;
    var j = first + w;
    if (j !== idx && j < items.length && items[j].part === audioPart) { idx = j; mark(items[j]); }
  }

  function pause() {
    playing = false;
    token++;
    if (synth) synth.cancel();
    if (audio) audio.pause();
    document.documentElement.classList.remove('rt-playing');
    render();
  }
  function stop() {
    pause();
    clearMark();
    idx = 0;
    if (player) player.classList.remove('rt-on');
    render();
  }

  /* ------------------------------------------------------------ UI */
  function btn(cls, html, label) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'rt-btn ' + (cls || '');
    b.innerHTML = html;
    if (label) b.setAttribute('aria-label', label);
    return b;
  }

  var host, listenBtn, fontBtn, panel, player, ppBtn, stopBtn, speedSel, voiceSel;

  function render() {
    if (!listenBtn) return;
    var active = player.classList.contains('rt-on');
    var word = playing ? T.pause : (active ? T.resume : T.listen);
    listenBtn.innerHTML = (playing ? ICON.pause : ICON.play) + '<span>' + word + '</span>';
    listenBtn.setAttribute('aria-label', word);
    ppBtn.innerHTML = (playing ? ICON.pause : ICON.play) + '<span>' + (playing ? T.pause : T.resume) + '</span>';
  }

  function toggle() {
    if (playing) { pause(); return; }
    if (!items.length) items = collect();
    if (!items.length) return;
    player.classList.add('rt-on');
    speakFrom(idx);
  }

  function optionRow(label, opts, current, onPick) {
    var row = document.createElement('div');
    row.className = 'rt-row';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', label);
    var lab = document.createElement('span');
    lab.className = 'rt-lab'; lab.textContent = label;
    row.appendChild(lab);
    var buttons = [];
    opts.forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'rt-opt';
      b.textContent = o.label;
      if (o.family) b.style.fontFamily = o.family;
      b.setAttribute('aria-pressed', String(o.value === current));
      b.addEventListener('click', function () {
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        onPick(o.value);
      });
      buttons.push(b);
      row.appendChild(b);
    });
    return row;
  }

  function build() {
    host = document.getElementById('rtools');
    if (!host) return;
    var st = document.createElement('style');
    st.textContent = STYLE;
    document.head.appendChild(st);
    applyPrefs();

    listenBtn = btn('rt-primary', '');
    fontBtn = btn('', ICON.font + '<span>' + T.font + '</span>');
    fontBtn.setAttribute('aria-expanded', 'false');
    fontBtn.setAttribute('aria-controls', 'rt-panel');
    host.appendChild(listenBtn);
    host.appendChild(fontBtn);

    panel = document.createElement('div');
    panel.className = 'rt-panel'; panel.id = 'rt-panel';
    panel.appendChild(optionRow(T.font, FONTS.map(function (f) {
      return { label: f.label, value: f.id, family: f.family };
    }), fontById(prefs.font).id, function (v) { prefs.font = v; savePrefs(prefs); applyPrefs(); }));
    panel.appendChild(optionRow(T.size, [
      { label: 'A', value: 0 }, { label: 'A+', value: 1 }, { label: 'A++', value: 2 }
    ], prefs.size | 0, function (v) { prefs.size = v; savePrefs(prefs); applyPrefs(); }));
    panel.appendChild(optionRow(T.spacing, [
      { label: T.normal, value: false }, { label: T.wide, value: true }
    ], !!prefs.wide, function (v) { prefs.wide = v; savePrefs(prefs); applyPrefs(); }));
    host.appendChild(panel);
    /* The Lexend button previews in Lexend, so fetch that face once the menu opens. */
    fontBtn.addEventListener('click', function () {
      var open = !panel.classList.contains('rt-open');
      panel.classList.toggle('rt-open', open);
      fontBtn.setAttribute('aria-expanded', String(open));
      if (open) loadFontCss(FONTS[1]);
    });

    player = document.createElement('div');
    player.className = 'rt-player';
    player.setAttribute('role', 'region');
    player.setAttribute('aria-label', T.listen);
    ppBtn = btn('rt-primary', '');
    stopBtn = btn('', ICON.stop + '<span>' + T.stop + '</span>');
    speedSel = document.createElement('select');
    speedSel.setAttribute('aria-label', T.speed);
    [0.75, 0.9, 1, 1.15, 1.3].forEach(function (r) {
      var o = document.createElement('option');
      o.value = String(r); o.textContent = r + '×';
      if (r === rate) o.selected = true;
      speedSel.appendChild(o);
    });
    speedSel.addEventListener('change', function () {
      rate = +speedSel.value; prefs.rate = rate; savePrefs(prefs);
      if (audio) audio.playbackRate = rate;
      if (playing && !(useRec && AUDIO[items[idx].part])) speakFrom(idx);
    });
    player.appendChild(ppBtn);
    player.appendChild(stopBtn);
    player.appendChild(speedSel);
    if (hasRec) {
      voiceSel = document.createElement('select');
      voiceSel.setAttribute('aria-label', T.voice);
      [['teacher', T.teacher], ['computer', T.computer]].forEach(function (p) {
        var o = document.createElement('option');
        o.value = p[0]; o.textContent = p[1];
        if ((p[0] === 'teacher') === useRec) o.selected = true;
        voiceSel.appendChild(o);
      });
      voiceSel.addEventListener('change', function () {
        useRec = voiceSel.value === 'teacher';
        prefs.voice = useRec ? 'teacher' : 'computer'; savePrefs(prefs);
        if (playing) speakFrom(idx);
      });
      player.appendChild(voiceSel);
    }
    var tip = document.createElement('span');
    tip.className = 'rt-tip'; tip.textContent = T.tip;
    player.appendChild(tip);
    document.body.appendChild(player);

    if (!synth && !hasRec) {
      listenBtn.disabled = true;
      listenBtn.title = T.none;
    }
    listenBtn.addEventListener('click', toggle);
    ppBtn.addEventListener('click', toggle);
    stopBtn.addEventListener('click', stop);

    /* While the player is open, a click on a paragraph moves the reading there.
       Links and the vocabulary pop-ups keep their own behaviour. */
    document.addEventListener('click', function (e) {
      if (!player.classList.contains('rt-on')) return;
      if (e.target.closest('a, button, select, .vpop-bubble')) return;
      var root = e.target.closest('[data-listen]');
      if (!root) return;
      var block = e.target.closest(BLOCKS);
      if (!block || !root.contains(block)) return;
      if (!items.length) items = collect();
      for (var i = 0; i < items.length; i++) {
        if (items[i].el === block) { speakFrom(i); return; }
      }
    });
    window.addEventListener('pagehide', function () { if (synth) synth.cancel(); });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();

  /* For tests and the console. */
  /* ADAPTED (3): the activity calls reset() each time it redraws a screen. */
  function reset() { if (player && (playing || player.classList.contains('rt-on'))) stop(); items = []; idx = 0; }
  window.READER_TOOLS = { split: split, collect: collect, reset: reset };
})();
