#!/usr/bin/env python3
"""Builds common-sense-full.html, the whole pamphlet, from tools/common-sense-1776.txt
(the Project Gutenberg text of the 1776 Bradford third edition, with Gutenberg's
header, footer and transcriber's additions removed).

Each passage in common-sense-data.js gets an anchor (common-sense-full.html#<id>),
shading over every paragraph it covers, and a link back to it in the annotated
reader. Paine's signature, dateline and citations are set as lines, his two
footnotes as footnotes, and the two navy-cost tables as real tables. Rerun after
editing either file:

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
# Lines that stand alone in the source: Paine's signature (set inside the passage
# it signs), his dateline, and the two citations.
SIGNATURE = 'AUTHOR'
CITES = {'Philadelphia, February 14, 1776', 'Dragonetti on virtue and rewards."', "--Barclay's address to Charles II."}

def norm(s):
    return re.sub(r'[^a-z]', '', s.lower())

def join_lines(raw):
    """One paragraph from its source lines. A line that ends in a hyphen was split
    inside a hyphenated name (Great-Britain, New-York), so it joins without a space."""
    out = ''
    for line in raw.splitlines():
        line = line.strip()
        if not out: out = line
        elif out.endswith('-'): out += line
        else: out += ' ' + line
    return out

def esc(para):
    return html.escape(para).replace('--', '—')

# Which source paragraph starts each paragraph of each passage. The key is the
# first 60 letters of the paragraph's first segment, at any reading, minus any
# leading ellipsis.
blocks = [b.strip('\n') for b in re.split(r'\n\s*\n', text) if b.strip()]
keys = []   # (key, passage, paragraph index within the passage)
for p in data['passages']:
    for k, para in enumerate(p['orig']):
        first = para[0][1].replace('…', '').replace('—', '--').strip()
        keys.append((norm(first)[:60], p, k))
owner = {}  # block index -> (passage, paragraph index)
for i, b in enumerate(blocks):
    n = norm(join_lines(b))
    for key, p, k in keys:
        if key and key in n and (i not in owner):
            owner[i] = (p, k)
            keys = [x for x in keys if not (x[1] is p and x[2] == k)]
            break
if keys:
    raise SystemExit('Passage paragraphs not found in the full text: ' + ', '.join(p['id'] + '/' + str(k) for _, p, k in keys))

def cost_table_1(raw):
    rows = re.findall(r'(\d+)\s+(?:guns\s+)?=\s+([\d,]+)', raw)
    assert len(rows) == 9, rows
    body = ''.join(f'<tr><th scope="row">{g}</th><td>{c}</td></tr>' for g, c in rows)
    return ('<table class="costs"><caption>The charge of building a ship of each rate, in pounds sterling</caption>'
            '<thead><tr><th scope="col">Guns</th><th scope="col">Cost</th></tr></thead><tbody>' + body + '</tbody></table>')

def cost_table_2(raw):
    rows = re.findall(r'^\s*(\d+)\s+(\d+)\s+([\d,]+)\s+([\d,]+)\s*$', raw, re.M)
    assert len(rows) == 8, rows
    sloops = re.search(r'^\s*(\d+)\s+Sloops.*?\}\s+([\d,]+)\s+([\d,]+)', raw, re.S | re.M)
    cost = re.search(r'^Cost\s+([\d,]+)', raw, re.M).group(1)
    guns = re.search(r'^Remains for Guns\s+([\d,]+)', raw, re.M).group(1)
    total = re.search(r'^\s+([\d,]+)\s*$', raw.rsplit('------------', 1)[1], re.M).group(1)
    body = ''.join(f'<tr><td>{s}</td><td>{g}</td><td>{one}</td><td>{all_}</td></tr>' for s, g, one, all_ in rows)
    body += f'<tr><td>{sloops.group(1)}</td><td class="txt">Sloops, bombs and fireships, one with another, at</td><td>{sloops.group(2)}</td><td>{sloops.group(3)}</td></tr>'
    foot = (f'<tr><th scope="row" colspan="3">Cost</th><td>{cost}</td></tr>'
            f'<tr><th scope="row" colspan="3">Remains for Guns</th><td>{guns}</td></tr>'
            f'<tr><th scope="row" colspan="3">Total</th><td>{total}</td></tr>')
    return ('<table class="costs"><caption>The British navy in 1757, in pounds sterling</caption>'
            '<thead><tr><th scope="col">Ships</th><th scope="col">Guns</th><th scope="col">Cost of One</th><th scope="col">Cost of All</th></tr></thead>'
            '<tbody>' + body + '</tbody><tfoot>' + foot + '</tfoot></table>')

out, toc = [], []
open_hit = None        # passage whose shaded block is the last thing in out
anchored = set()       # passages that already carry their id
def close_hit():
    global open_hit
    if open_hit: out.append('</div>'); open_hit = None

for i, raw in enumerate(blocks):
    stripped = raw.strip()
    head = next((h for h in HEADINGS if stripped.startswith(h[0])), None)
    if head:
        close_hit()
        out.append(f'<h2 id="{head[1]}">{head[2]}</h2>')
        toc.append((head[1], head[2]))
        if head[1] == 'quakers':
            out.append('<p>' + esc(join_lines(raw)) + '</p>')
        continue
    if stripped in SKIP:
        continue
    if stripped == 'FINIS.':
        close_hit(); out.append('<p class="finis">Finis.</p>'); continue
    if stripped == SIGNATURE:
        # Inside the shaded passage it signs, if that is what came before.
        out.append('<p class="sig">AUTHOR</p>'); close_hit(); continue
    if stripped in CITES:
        close_hit()
        line = stripped.lstrip('-')
        if line.endswith('"') and out and out[-1].endswith('</p>'):
            # The closing quote mark belongs to the quoted paragraph above.
            out[-1] = out[-1][:-4] + '&quot;</p>'; line = line[:-1]
        out.append('<p class="cite">' + esc(line) + '</p>'); continue
    if 'For a ship of' in stripped and '=' in stripped:
        close_hit(); out.append(cost_table_1(raw)); continue
    if stripped.startswith('Ships.'):
        close_hit(); out.append(cost_table_2(raw)); continue
    para = join_lines(raw)
    if para.startswith('¹'):
        close_hit(); out.append('<p class="fn">' + esc(para) + '</p>'); continue
    hit = owner.get(i)
    if hit:
        p, k = hit
        if open_hit is not p:
            close_hit()
            first = p['id'] not in anchored
            anchored.add(p['id'])
            out.append(f'<div class="hit"{" id=" + chr(34) + p["id"] + chr(34) if first else ""}>'
                       f'<a class="back" href="common-sense.html#{p["id"]}">Read with help: {html.escape(p["title"])}{"" if first else " (continued)"}</a>')
            open_hit = p
        out.append('<p>' + esc(para) + '</p>')
    else:
        close_hit()
        out.append('<p>' + esc(para) + '</p>')
close_hit()

toc_html = ''.join(f'<li><a href="#{i}">{html.escape(t)}</a></li>' for i, t in toc)
page = open(os.path.join(ROOT, 'tools', 'common-sense-full.template.html'), encoding='utf-8').read()
page = page.replace('{{TOC}}', toc_html).replace('{{BODY}}', '\n'.join(out))
open(os.path.join(ROOT, 'common-sense-full.html'), 'w', encoding='utf-8').write(page)
print('Wrote common-sense-full.html:', len(out), 'blocks,', len(anchored), 'passages anchored,', sum(1 for o in out if o.startswith('<div class="hit"')), 'shaded blocks.')
