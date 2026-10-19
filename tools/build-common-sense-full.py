#!/usr/bin/env python3
"""Builds common-sense-full.html, the whole pamphlet, from tools/common-sense-1776.txt
(the Project Gutenberg text of the 1776 Bradford third edition, with Gutenberg's
header, footer and transcriber's additions removed).

Each passage in common-sense-data.js gets an anchor (common-sense-full.html#<id>),
a highlight, and a link back to it in the annotated reader. Rerun after editing
either file:

    python3 tools/build-common-sense-full.py
"""
import html, json, os, re, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
text = open(os.path.join(ROOT, 'tools', 'common-sense-1776.txt'), encoding='utf-8').read()

# Passage data, via node so the JS file stays the one source.
data = json.loads(subprocess.check_output(['node', '-e',
    "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.COMMON_SENSE))",
    os.path.join(ROOT, 'common-sense-data.js')]))

HEADINGS = [
    ('INTRODUCTION.', 'introduction', 'Introduction'),
    ('OF THE ORIGIN AND DESIGN OF GOVERNMENT IN GENERAL,', 'part-1', 'Of the Origin and Design of Government in General, with Concise Remarks on the English Constitution'),
    ('OF MONARCHY AND HEREDITARY SUCCESSION.', 'part-2', 'Of Monarchy and Hereditary Succession'),
    ('THOUGHTS ON THE PRESENT STATE OF AMERICAN AFFAIRS.', 'part-3', 'Thoughts on the Present State of American Affairs'),
    ('OF THE PRESENT ABILITY OF AMERICA,', 'part-4', 'Of the Present Ability of America, with Some Miscellaneous Reflexions'),
    ('APPENDIX.', 'appendix', 'Appendix'),
    ('To the Representatives of the Religious Society', 'quakers', 'To the Quakers'),
]
SKIP = {'WITH CONCISE REMARKS ON THE ENGLISH CONSTITUTION.', 'WITH SOME MISCELLANEOUS REFLEXIONS.'}

def norm(s):
    return re.sub(r'[^a-z]', '', s.lower())

# Where each passage starts: its first segment's opening words.
starts = []
for p in data['passages']:
    first = p['orig'][0][0][1].replace('…', '').replace('—', '--').strip()
    starts.append((norm(first)[:60], p))

blocks = re.split(r'\n\s*\n', text)
out, toc, part_n = [], [], 0
for b in blocks:
    raw = b.strip('\n')
    if not raw.strip():
        continue
    head = next((h for h in HEADINGS if raw.strip().startswith(h[0])), None)
    if head and (head[1] != 'quakers' or True):
        if head[1] == 'quakers':
            out.append(f'<h2 id="{head[1]}">{head[2]}</h2>')
            toc.append((head[1], head[2]))
            out.append('<p>' + html.escape(' '.join(l.strip() for l in raw.splitlines())).replace('--', '—') + '</p>')
        else:
            out.append(f'<h2 id="{head[1]}">{head[2]}</h2>')
            toc.append((head[1], head[2]))
        continue
    if raw.strip() in SKIP:
        continue
    if raw.strip() == 'FINIS.':
        out.append('<p class="finis">Finis.</p>')
        continue
    lines = raw.splitlines()
    # The navy cost table keeps its columns.
    if sum(1 for l in lines if re.search(r'\S {3,}\S', l)) >= 3:
        out.append('<pre class="table">' + html.escape(raw.replace('\t', '    ')) + '</pre>')
        continue
    para = ' '.join(l.strip() for l in lines)
    esc = html.escape(para).replace('--', '—')
    n = norm(para)
    hit = None
    for key, p in starts:
        if key and key in n:
            hit = p
            break
    if hit:
        out.append(f'<div class="hit" id="{hit["id"]}"><a class="back" href="common-sense.html#{hit["id"]}">Read with help: {html.escape(hit["title"])}</a><p>{esc}</p></div>')
        starts = [s for s in starts if s[1] is not hit]
    else:
        out.append(f'<p>{esc}</p>')

missing = [s[1]['id'] for s in starts]
if missing:
    raise SystemExit('Passages not found in the full text: ' + ', '.join(missing))

toc_html = ''.join(f'<li><a href="#{i}">{html.escape(t)}</a></li>' for i, t in toc)
page = open(os.path.join(ROOT, 'tools', 'common-sense-full.template.html'), encoding='utf-8').read()
page = page.replace('{{TOC}}', toc_html).replace('{{BODY}}', '\n'.join(out))
open(os.path.join(ROOT, 'common-sense-full.html'), 'w', encoding='utf-8').write(page)
print('Wrote common-sense-full.html:', len(out), 'blocks,', len(data['passages']), 'passages linked.')
