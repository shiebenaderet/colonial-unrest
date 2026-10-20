/**
 * Fast Finisher Menu mailer (unrest.mrbsocialstudies.org/fast-finisher.html,
 * and the annotated Common Sense at unrest.mrbsocialstudies.org/common-sense.html)
 *
 * Emails Mr. B one message per submission:
 *   Subject: Fast Finisher · <Activity> · <Student> · P<period>
 *   Body:    the student's score and each answer, neatly laid out.
 *
 * SET UP (about 5 minutes, signed in to your district Google account):
 *   1. Go to script.google.com > New project. Name it "Fast Finisher Mailer".
 *   2. Delete the starter code, paste this whole file, and click Save.
 *   3. Deploy > New deployment > the gear icon > Web app.
 *        Execute as:     Me
 *        Who has access: Anyone within Edmonds School District
 *      Click Deploy, then Authorize access and allow it to send email as you.
 *   4. Copy the Web app URL (it ends in /exec) and send it to Claude.
 *
 * STUDENT ACCOUNTS: students sign in as @edmonds15.org and you as
 * @edmonds.wednet.edu. If those are one Google Workspace, "Anyone within
 * Edmonds School District" lets students in and keeps everyone else out. If a
 * student signed in on a Chromebook gets a "You need access" or sign-in page
 * when sending, the domains are separate: redeploy with "Anyone with a Google
 * account". The script still turns away any signed-in account that is not on
 * ALLOWED_DOMAINS below whenever Google tells it who sent the work.
 *
 * After any edit to this file: Deploy > Manage deployments > edit (pencil) >
 * Version: New version > Deploy. The URL stays the same. To check which version
 * is live, open the web app URL in a browser: it lists the activities it accepts
 * and this file's VERSION.
 *
 * Nothing is stored for the menu activities: each submission becomes one email.
 *
 * THE COMMON SENSE QUIZ (common-sense-quiz.html) is different: it sends no
 * email and no name. Each result becomes one row in a Google Sheet (period,
 * score, the 10 answers), and the sheet's Summary tab charts it by period.
 *   One-time setup, after pasting this file:
 *   a. In the toolbar's function menu pick setupQuizSheet, then click Run.
 *      Allow access when Google asks (it now needs Sheets as well as email).
 *   b. Open View > Logs (or the Execution log): it prints the sheet's link.
 *      The sheet "Common Sense Quiz Results" is also in your Drive.
 *   c. Deploy > Manage deployments > pencil > Version: New version > Deploy.
 *   Running setupQuizSheet again is safe: it rebuilds the Summary tab and
 *   charts and keeps every response. To start fresh for a new year, delete
 *   rows 2 and down on the Responses tab.
 */

const VERSION = 'Oct 19 2026, with Common Sense and the quiz sheet';
const TO = 'benaderets885@edmonds.wednet.edu';
const ACTIVITIES = ["Liberty's Kids", 'Engraving Detective', 'Mission US', 'Boston 1770 Breakout', 'Common Sense'];
const ALLOWED_DOMAINS = ['edmonds15.org', 'edmonds.wednet.edu'];
const MAX_CHARS = 8000;   // a long answer is fine; a pasted essay-bomb is not

function doPost(e) {
  let ok = false, note = '';
  try {
    const data = JSON.parse((e && e.parameter && e.parameter.payload) || '{}');
    const activity = clean(data.activity, 60);
    if (activity === QUIZ_ACTIVITY) {
      checkAccount();
      recordQuiz(data);
      ok = true;
      return reply(ok, note);
    }
    if (ACTIVITIES.indexOf(activity) === -1) throw new Error('unknown activity: ' + activity);
    const student = clean(data.student, 40) || '(no name)';
    const period = clean(data.period, 4);
    const items = Array.isArray(data.items) ? data.items.slice(0, 40) : [];

    const signedIn = checkAccount();

    const subject = 'Fast Finisher · ' + activity + ' · ' + student + (period ? ' · P' + period : '');
    const rows = items.map(function (it, i) {
      return '<tr><td style="padding:8px 10px;vertical-align:top;color:#7A2A28;font-weight:bold">' + (i + 1) + '</td>' +
             '<td style="padding:8px 10px;vertical-align:top"><div style="font-weight:bold">' + esc(clean(it.q, 400)) + '</div>' +
             '<div style="margin-top:3px;white-space:pre-wrap">' + esc(clean(it.a, MAX_CHARS)) + '</div>' +
             (it.note ? '<div style="margin-top:3px;color:#666;font-size:13px">' + esc(clean(it.note, 300)) + '</div>' : '') +
             '</td></tr>';
    }).join('');
    const html =
      '<div style="font-family:Arial,sans-serif;font-size:15px;color:#1f2124;max-width:640px">' +
      '<h2 style="color:#7A2A28;margin:0 0 4px">' + esc(activity) + '</h2>' +
      '<p style="margin:0 0 12px"><b>' + esc(student) + '</b>' + (period ? ' · Period ' + esc(period) : '') +
      ' · ' + esc(Utilities.formatDate(new Date(), 'America/Los_Angeles', 'EEE MMM d, h:mm a')) + '</p>' +
      (data.score ? '<p style="margin:0 0 12px;padding:8px 12px;background:#F6E7E4;border-left:4px solid #B23A34"><b>Score:</b> ' + esc(clean(data.score, 200)) + '</p>' : '') +
      (rows ? '<table style="border-collapse:collapse;width:100%">' + rows + '</table>' : '') +
      (signedIn ? '<p style="margin-top:14px;color:#666;font-size:12px">Sent from the account ' + esc(signedIn) + '</p>' : '') +
      '</div>';
    const text = activity + '\n' + student + (period ? ', Period ' + period : '') + '\n' +
      (data.score ? 'Score: ' + clean(data.score, 200) + '\n' : '') + '\n' +
      items.map(function (it, i) { return (i + 1) + '. ' + clean(it.q, 400) + '\n   ' + clean(it.a, MAX_CHARS) + (it.note ? '\n   (' + clean(it.note, 300) + ')' : ''); }).join('\n\n');

    MailApp.sendEmail({ to: TO, subject: subject, htmlBody: html, body: text, name: 'Fast Finisher Menu' });
    ok = true;
  } catch (err) {
    note = String(err && err.message || err);
  }
  return reply(ok, note);
}

function reply(ok, note) {
  // Say why, in plain words, on the page the student sees.
  let why = '';
  if (/unknown activity/.test(note)) why = 'This page is not on the mailer\'s list yet (' + esc(note.replace('unknown activity: ', '')) + '). Mr. B needs to deploy a new version of the script.';
  else if (/not an Edmonds account/.test(note)) why = 'This browser is signed in to Google with an account that is not a school account. Sign in with your @edmonds15.org account, then try again.';
  else if (note) why = 'Reason: ' + esc(note);
  // The page opens this in a new tab (so the student's school sign-in comes along).
  // The tab says whether it worked and tells the menu page, then closes itself.
  const msg = JSON.stringify({ source: 'ff-mailer', ok: ok, note: note });
  const page =
    '<div style="font-family:Arial,sans-serif;max-width:520px;margin:60px auto;text-align:center;color:#1f2124">' +
    (ok ? '<h1 style="color:#2c6b37">Sent to Mr. B</h1><p style="font-size:18px">You can close this tab and go back to the menu.</p>'
        : '<h1 style="color:#9f1d12">That did not send</h1>' + (why ? '<p style="font-size:17px;color:#444">' + why + '</p>' : '') + '<p style="font-size:18px">Close this tab, then try again or use the Copy button.</p>') +
    '</div>' +
    '<script>try{var t=window.top;(t.opener||t).postMessage(' + msg + ',"*")}catch(e){}' +
    (ok ? 'setTimeout(function(){try{window.top.close()}catch(e){}},2500);' : '') + '</script>';
  return HtmlService.createHtmlOutput(page).setTitle(ok ? 'Sent to Mr. B' : 'Not sent')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doGet() {
  return HtmlService.createHtmlOutput('<p style="font-family:Arial,sans-serif">Fast Finisher Mailer is running.<br>Version: ' + esc(VERSION) +
    '<br>Accepting: ' + ACTIVITIES.map(esc).join(', ') + '</p>');
}

/* Turns away a signed-in account outside the district; returns the address. */
function checkAccount() {
  let signedIn = '';
  try { signedIn = Session.getActiveUser().getEmail(); } catch (err) {}
  if (signedIn && !ALLOWED_DOMAINS.some(function (d) { return signedIn.toLowerCase().endsWith('@' + d); })) {
    throw new Error('not an Edmonds account');
  }
  return signedIn;
}

/* ---------- The Common Sense quiz sheet ---------- */

const QUIZ_ACTIVITY = 'Common Sense Quiz';
const QUIZ_PERIODS = [1, 2, 3, 5];
// true where Paine agrees with the statement; same order as common-sense-quiz.html.
const QUIZ_PAINE = [false, true, true, false, true, false, true, false, true, true];
const QUIZ_SHORT = [
  '1. Leaders because of their parents',
  '2. Government is a necessary evil',
  '3. Rules apply to the person in charge',
  '4. A small country ruling a big place',
  '5. Ordinary people choose lawmakers',
  '6. Stay loyal no matter what',
  '7. Do the hard thing now',
  '8. Make up after a big fight',
  '9. Unity beats size',
  '10. Freedom anywhere matters everywhere'
];
const QUIZ_TIERS = [[85, 'Pure Common Sense'], [65, 'Patriot'], [45, 'On the Fence'], [25, 'Cautious Colonist'], [0, 'Loyalist']];
const QUIZ_HEAD = ['Time', 'Period', 'Paine-o-meter %', 'Result', 'Same Side (of 10)']
  .concat(QUIZ_SHORT.map(function (s) { return 'Q' + s.split('.')[0]; }), ['Browser ID']);
const QUIZ_ID_COL = QUIZ_HEAD.length;   // the last column

function quizBook() {
  const id = PropertiesService.getScriptProperties().getProperty('QUIZ_SHEET_ID');
  if (!id) throw new Error('the quiz sheet is not set up yet (Mr. B: run setupQuizSheet)');
  return SpreadsheetApp.openById(id);
}

/* One row per browser: sending again (say, after changing answers) replaces
   that browser's row instead of counting the student twice. */
function recordQuiz(data) {
  const period = parseInt(data.period, 10);
  if (QUIZ_PERIODS.indexOf(period) === -1) throw new Error('pick your period first');
  const a = Array.isArray(data.answers) ? data.answers.map(function (v) { return parseInt(v, 10); }) : [];
  if (a.length !== QUIZ_PAINE.length || a.some(function (v) { return !(v >= 1 && v <= 4); })) throw new Error('answer all 10 statements first');
  const bid = clean(data.id, 40).replace(/[^A-Za-z0-9-]/g, '');
  let total = 0, same = 0;
  a.forEach(function (v, i) {
    total += QUIZ_PAINE[i] ? v - 1 : 4 - v;
    if ((v >= 3) === QUIZ_PAINE[i]) same++;
  });
  const pct = Math.round(total / (a.length * 3) * 100);
  const tier = QUIZ_TIERS.filter(function (t) { return pct >= t[0]; })[0][1];
  const row = [new Date(), period, pct, tier, same].concat(a, [bid]);

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = quizBook().getSheetByName('Responses');
    let at = 0;
    if (bid) {
      const hit = sh.getRange(2, QUIZ_ID_COL, Math.max(sh.getLastRow() - 1, 1), 1)
        .createTextFinder(bid).matchEntireCell(true).findNext();
      if (hit) at = hit.getRow();
    }
    if (at) sh.getRange(at, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/* Run once from the editor. Safe to run again: keeps responses, rebuilds Summary. */
function setupQuizSheet() {
  const props = PropertiesService.getScriptProperties();
  let ss = null;
  const id = props.getProperty('QUIZ_SHEET_ID');
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create('Common Sense Quiz Results');
    props.setProperty('QUIZ_SHEET_ID', ss.getId());
  }

  let resp = ss.getSheetByName('Responses');
  if (!resp) { resp = ss.getSheets()[0]; resp.setName('Responses'); }
  resp.getRange(1, 1, 1, QUIZ_HEAD.length).setValues([QUIZ_HEAD]).setFontWeight('bold').setBackground('#f1e6d8');
  resp.setFrozenRows(1);
  resp.getRange('A:A').setNumberFormat('ddd m/d h:mm am/pm');

  let sum = ss.getSheetByName('Summary');
  if (sum) { sum.getCharts().forEach(function (c) { sum.removeChart(c); }); sum.clear(); }
  else sum = ss.insertSheet('Summary', 0);

  const R = 'Responses!';
  const col = function (n) { return String.fromCharCode(64 + n); };   // 1 -> A
  const tiers = QUIZ_TIERS.map(function (t) { return t[1]; }).reverse();   // Loyalist first

  sum.getRange('A1').setValue('Do You Have Common Sense? Results by Period').setFontSize(16).setFontWeight('bold');
  sum.getRange('A2').setValue('Updates as students send. One row per student browser; delete rows on Responses to start over.').setFontColor('#5a4f45');

  // Table 1: by period
  const t1 = 4;
  sum.getRange(t1, 1, 1, 3 + tiers.length).setValues([['Period', 'Students', 'Average Paine-o-meter %'].concat(tiers)]);
  const t1rows = QUIZ_PERIODS.map(function (p, i) {
    const r = t1 + 1 + i;
    return ['Period ' + p,
      '=COUNTIF(' + R + 'B:B,' + p + ')',
      '=IFERROR(ROUND(AVERAGEIF(' + R + 'B:B,' + p + ',' + R + 'C:C)),"")']
      .concat(tiers.map(function (t, k) { return '=COUNTIFS(' + R + 'B:B,' + p + ',' + R + 'D:D,' + col(4 + k) + '$' + t1 + ')'; }));
  });
  const allR = t1 + 1 + QUIZ_PERIODS.length;
  t1rows.push(['All', '=COUNT(' + R + 'C2:C)', '=IFERROR(ROUND(AVERAGE(' + R + 'C2:C)),"")']
    .concat(tiers.map(function (t, k) { return '=COUNTIF(' + R + 'D:D,' + col(4 + k) + '$' + t1 + ')'; })));
  sum.getRange(t1 + 1, 1, t1rows.length, t1rows[0].length).setValues(t1rows);
  sum.getRange(allR, 1, 1, t1rows[0].length).setFontWeight('bold');

  // Table 2: % who agreed with each statement, by period
  const t2 = allR + 3;
  sum.getRange(t2 - 1, 1).setValue('% of students who agreed with each statement').setFontWeight('bold');
  sum.getRange(t2, 1, 1, QUIZ_PERIODS.length + 3).setValues([['Statement'].concat(QUIZ_PERIODS.map(function (p) { return 'Period ' + p; }), ['All', 'Paine'])]);
  const t2rows = QUIZ_SHORT.map(function (s, i) {
    const q = col(6 + i);   // Q1 is column F
    return [s].concat(QUIZ_PERIODS.map(function (p, k) {
      return '=IFERROR(COUNTIFS(' + R + '$B:$B,' + p + ',' + R + q + ':' + q + ',">=3")/COUNTIF(' + R + '$B:$B,' + p + '),"")';
    }), ['=IFERROR(COUNTIF(' + R + q + '2:' + q + ',">=3")/COUNT(' + R + q + '2:' + q + '),"")', QUIZ_PAINE[i] ? 'Agrees' : 'Disagrees']);
  });
  sum.getRange(t2 + 1, 1, t2rows.length, t2rows[0].length).setValues(t2rows);
  sum.getRange(t2 + 1, 2, t2rows.length, QUIZ_PERIODS.length + 1).setNumberFormat('0%');

  [t1, t2].forEach(function (r) { sum.getRange(r, 1, 1, 9).setFontWeight('bold').setBackground('#f1e6d8'); });
  sum.setColumnWidth(1, 290);
  sum.setColumnWidths(2, 8, 120);
  sum.setFrozenRows(2);

  // Charts, to the right of the tables
  const by = sum.getRange(t1, 1, QUIZ_PERIODS.length + 1, 1);
  sum.insertChart(sum.newChart().setChartType(Charts.ChartType.COLUMN)
    .addRange(by).addRange(sum.getRange(t1, 3, QUIZ_PERIODS.length + 1, 1))
    .setNumHeaders(1).setPosition(1, 11, 0, 0)
    .setOption('title', 'Average Paine-o-meter by Period').setOption('legend', { position: 'none' })
    .setOption('vAxis', { minValue: 0, maxValue: 100, title: '% agreement with Paine' })
    .setOption('colors', ['#b23a34']).setOption('width', 560).setOption('height', 320).build());
  sum.insertChart(sum.newChart().setChartType(Charts.ChartType.BAR)
    .addRange(by).addRange(sum.getRange(t1, 4, QUIZ_PERIODS.length + 1, tiers.length))
    .setNumHeaders(1).setPosition(18, 11, 0, 0)
    .setOption('title', 'Results by Period').setOption('isStacked', 'percent')
    .setOption('colors', ['#1b2d45', '#5b6a85', '#9a8f8a', '#c9706a', '#b23a34'])
    .setOption('width', 560).setOption('height', 320).build());
  sum.insertChart(sum.newChart().setChartType(Charts.ChartType.BAR)
    .addRange(sum.getRange(t2, 1, QUIZ_SHORT.length + 1, QUIZ_PERIODS.length + 1))
    .setNumHeaders(1).setPosition(35, 11, 0, 0)
    .setOption('title', 'Who Agreed With Each Statement').setOption('hAxis', { minValue: 0, maxValue: 1, format: 'percent' })
    .setOption('colors', ['#7a2a28', '#b23a34', '#9a7536', '#1b2d45'])
    .setOption('width', 700).setOption('height', 560).build());

  Logger.log('Quiz sheet ready: ' + ss.getUrl());
  return ss.getUrl();
}

function clean(v, max) { return String(v == null ? '' : v).replace(/\r/g, '').trim().slice(0, max); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
