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
 * Nothing is stored: each submission becomes one email and that's it.
 */

const VERSION = 'Oct 19 2026, with Common Sense';
const TO = 'benaderets885@edmonds.wednet.edu';
const ACTIVITIES = ["Liberty's Kids", 'Engraving Detective', 'Mission US', 'Boston 1770 Breakout', 'Common Sense'];
const ALLOWED_DOMAINS = ['edmonds15.org', 'edmonds.wednet.edu'];
const MAX_CHARS = 8000;   // a long answer is fine; a pasted essay-bomb is not

function doPost(e) {
  let ok = false, note = '';
  try {
    const data = JSON.parse((e && e.parameter && e.parameter.payload) || '{}');
    const activity = clean(data.activity, 60);
    if (ACTIVITIES.indexOf(activity) === -1) throw new Error('unknown activity: ' + activity);
    const student = clean(data.student, 40) || '(no name)';
    const period = clean(data.period, 4);
    const items = Array.isArray(data.items) ? data.items.slice(0, 40) : [];

    let signedIn = '';
    try { signedIn = Session.getActiveUser().getEmail(); } catch (err) {}
    if (signedIn && !ALLOWED_DOMAINS.some(function (d) { return signedIn.toLowerCase().endsWith('@' + d); })) {
      throw new Error('not an Edmonds account');
    }

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

function clean(v, max) { return String(v == null ? '' : v).replace(/\r/g, '').trim().slice(0, max); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
