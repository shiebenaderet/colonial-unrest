#!/usr/bin/env python3
"""Builds war-timeline.html: the Revolutionary War in seven stops, 1775 to 1783.

    python3 tools/build-war-timeline.py          # writes war-timeline.html, prints FK per level

Unit 2, Week 9 (Tue Oct 27 2026). Students glue seven paper cards into their notebooks
(ams-planning, tools/build-week9-handouts.py); each card's QR code opens one stop here
(war-timeline.html#bunker-hill and so on). Each stop has its reading at four levels, a
Hidden Voice who is a podcast topic on voices.mrbsocialstudies.org, and a question. The
page ends with all 22 podcast topics, grouped by stop, so crews can pick their top three.

The facts, numbers, hidden voices and topic groups match ams-planning
tools/war_timeline_data.py (the cards and slides). Change them there and here together.
Reading levels: READING-LEVELS.md. The FK measure below is the shared one, copied from
tools/check-levels.js; the build fails if a level misses its limit or the four levels
of a stop do not step up.
"""
import html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICES = 'https://voices.mrbsocialstudies.org/readings/'

TOPICS = {
 'phillis-wheatley': 'Phillis Wheatley', 'james-armistead': 'James Armistead Lafayette',
 'crispus-attucks': 'Crispus Attucks', 'deborah-sampson': 'Deborah Sampson',
 'sybil-ludington': 'Sybil Ludington', 'joseph-brant': 'Joseph Brant',
 'peter-salem': 'Peter Salem', 'abigail-adams': 'Abigail Adams',
 'mercy-otis-warren': 'Mercy Otis Warren', 'molly-pitcher': 'Molly Pitcher',
 'nancy-hart': 'Nancy Hart', 'benedict-arnold': 'Benedict Arnold',
 'women': 'Women in the Revolutionary War', 'african-americans': 'African Americans in the Revolutionary War',
 'native-americans': 'Native Americans in the Revolutionary War', 'loyalists': 'Loyalists / Tories',
 'indentured-servants': 'Indentured Servants', 'hessians': 'Hessian Soldiers',
 'camp-followers': 'Camp Followers', 'young-soldiers': 'Young Soldiers & Teenage Patriots',
 'enslaved-british-freedom': 'Enslaved People and British Freedom Offers',
 'womens-economic-agency': "Women's Work and Political Voice",
}

# Each level is a list of paragraphs. Deep quotes are checked against the printed source
# named beside them; nothing is quoted from memory alone.
STOPS = [
 {'id': 'bunker-hill', 'year': '1775', 'date': 'June 17, 1775', 'title': 'Bunker Hill',
  'img': 'bunker-hill.jpg', 'w': 800, 'h': 530,
  'alt': 'A painting of the battle: smoke, British soldiers in red coats, and an American officer dying on the ground.',
  'credit': 'John Trumbull, The Death of General Warren at the Battle of Bunker\'s Hill, June 17, 1775, painted 1786. Public domain.',
  'q': ['In June 1775, the war had just begun.',
        'American soldiers dug in on a hill near Boston.',
        'The British attacked the hill three times.',
        'They won the hill on the third try.',
        'But more than 1,000 British soldiers were killed or hurt.',
        'That was about twice as many as the Americans lost.',
        'Now both sides knew this war would be long.'],
  'c': ['Two months after Lexington and Concord, American soldiers built walls of dirt on a hill near Boston.',
        'On June 17, 1775, British soldiers charged up the hill, and the Americans pushed them back twice.',
        'On the third charge, the Americans ran low on gunpowder and had to leave.',
        'The British took the hill, but more than 1,000 of their soldiers were killed or wounded.',
        'That was about twice the American losses.',
        'The battle showed that ordinary colonists could stand up to the British army.'],
  'f': ['On June 17, 1775, two months after Lexington and Concord, British troops attacked American soldiers who had dug in on the hills above Boston.',
        'Most of the fighting was actually on nearby Breed\'s Hill, but the battle kept the name Bunker Hill.',
        'The Americans drove back two charges before their gunpowder ran low, and the British took the hill on their third.',
        'The price was staggering: more than 1,000 British soldiers were killed or wounded, about twice the American losses.',
        'Ordinary colonists had stood up to the British army, and both sides now expected a long and bloody war.'],
  'd': ['On June 17, 1775, British regulars attacked the fortifications that New England militia had thrown up overnight on the heights above Charlestown, across the river from Boston.',
        'Although the battle is remembered as Bunker Hill, most of the fighting took place on neighboring Breed\'s Hill, where the defenders repelled two frontal assaults before their powder gave out and the third carried the position.',
        'Britain held the field, yet more than 1,000 of its soldiers were killed or wounded, roughly twice the American losses, and its commanders drew the sobering conclusion that the rebellion would not collapse after one demonstration of force.',
        'Historians also note who stood in the American lines: Black soldiers such as Peter Salem and Salem Poor fought there, a reminder that the army of 1775 was more varied than later paintings suggest.'],
  'voice': ('peter-salem', 'Peter Salem', 'A Black soldier who had been enslaved and was freed to enlist. He fought at Bunker Hill.'),
  'more': ['african-americans', 'crispus-attucks'],
  'think': 'The British won the hill. Why did the battle still worry them?'},

 {'id': 'trenton', 'year': '1776', 'date': 'December 26, 1776', 'title': 'Trenton',
  'img': 'trenton.jpg', 'w': 1200, 'h': 769,
  'alt': 'A painting of George Washington standing in a crowded rowboat crossing an icy river at dawn.',
  'credit': 'Emanuel Leutze, Washington Crossing the Delaware, 1851 (painted 75 years later). Public domain.',
  'q': ['By December 1776, Washington\'s army had lost a lot of fights.',
        'Many soldiers were ready to go home.',
        'On Christmas night, the army crossed an icy river.',
        'The river is called the Delaware.',
        'In the morning, they surprised the enemy at a town called Trenton.',
        'They took about 900 soldiers as prisoners.',
        'This win gave the army hope and kept the Revolution going.'],
  'c': ['In 1776, Washington\'s army lost New York and retreated across New Jersey.',
        'Many soldiers planned to go home when their time in the army ended at the end of the year.',
        'On Christmas night, Washington led his men across the icy Delaware River.',
        'At dawn on December 26, they surprised the enemy camp at Trenton and captured about 900 soldiers.',
        'The win was small, but it gave soldiers a reason to stay.',
        'It kept the Revolution alive.'],
  'f': ['By the end of 1776, Washington\'s army had lost New York, retreated across New Jersey, and shrunk as discouraged soldiers went home.',
        'Many of the men who remained could leave when their enlistments expired at the end of the year.',
        'On Christmas night, Washington led his army across the ice-choked Delaware River, and at dawn on December 26 it surprised the camp of German soldiers hired by Britain at Trenton, New Jersey.',
        'The Americans captured about 900 soldiers.',
        'The victory was small, but it came when the army was close to falling apart, and it gave soldiers a reason to stay and kept the Revolution alive.'],
  'd': ['Days before the attack, Thomas Paine published The American Crisis, which opens, "These are the times that try men\'s souls."',
        'By December 1776 the Continental Army had lost New York, retreated across New Jersey, and dwindled through desertion and expiring enlistments, so that by the end of the year it faced the real possibility of simply dissolving.',
        'Washington\'s night crossing of the Delaware and his dawn attack on the Hessian garrison at Trenton on December 26 produced about 900 prisoners, a modest haul whose political and psychological effect far outweighed its military size.',
        'The famous painting is itself a source to question: Leutze painted it in 1851, the flag shown was not adopted until 1777, and no commander would have stood upright in a small boat on an icy river.'],
  'voice': ('hessians', 'Hessian Soldiers', 'German soldiers Britain hired to fight. They were the soldiers surprised at Trenton.'),
  'more': [],
  'think': 'Why did one small win matter so much in December 1776?'},

 {'id': 'saratoga', 'year': '1777', 'date': 'October 17, 1777', 'title': 'Saratoga',
  'img': 'saratoga.jpg', 'w': 1200, 'h': 795,
  'alt': 'A painting of the British general handing over his sword to the American general in front of both armies.',
  'credit': 'John Trumbull, Surrender of General Burgoyne, 1821. Public domain.',
  'q': ['In 1777, a British army marched south from Canada into New York.',
        'American soldiers trapped it.',
        'This was near a town called Saratoga.',
        'On October 17, 1777, the British army gave up.',
        'About 6,000 soldiers surrendered.',
        'This was the turning point of the war.',
        'France saw that the Americans could win.',
        'In 1778, France joined the war to help the Americans.',
        'France sent money, soldiers, and ships.'],
  'c': ['In 1777, the British planned to cut New England off from the other colonies.',
        'A British army marched south from Canada into New York.',
        'American soldiers fought it in two battles near Saratoga and then surrounded it.',
        'On October 17, 1777, about 6,000 British soldiers surrendered.',
        'Saratoga was the turning point of the war.',
        'It showed France that the Americans could win, and in 1778 France joined the war with money, soldiers and ships.'],
  'f': ['In 1777, Britain tried to split the colonies by sending an army south from Canada to cut New England off from the rest.',
        'In New York, American forces stopped that army in two battles near Saratoga and then surrounded it.',
        'On October 17, 1777, the British general John Burgoyne surrendered about 6,000 soldiers.',
        'Saratoga became the turning point of the war.',
        'France, Britain\'s old rival, now believed the Americans could win, and in 1778 it joined the war with money, soldiers and ships.'],
  'd': ['General John Burgoyne\'s 1777 campaign aimed to sever New England from the other colonies by driving south from Canada along the Hudson River.',
        'Instead, his army was checked in two engagements near Saratoga, encircled by a growing American force, and compelled to surrender about 6,000 soldiers on October 17, 1777.',
        'The campaign also divided the Haudenosaunee, the Six Nations: at Oriskany that August, Mohawk and Seneca warriors fought alongside the British while Oneida warriors fought beside the Americans.',
        'Historians call Saratoga the turning point less for the battle itself than for its consequences abroad, since it persuaded France, Britain\'s old rival, to sign an alliance in 1778 and commit money, soldiers and a navy.'],
  'voice': ('joseph-brant', 'Joseph Brant (Thayendanegea)', 'A Mohawk leader who fought for Britain to protect Mohawk land. The Six Nations split: some fought for each side.'),
  'voice_img': ('joseph-brant.jpg', 'A portrait of Joseph Brant in a feathered headdress and a red blanket.', 'George Romney, Joseph Brant (Thayendanegea), 1776. Public domain.'),
  'more': ['native-americans', 'benedict-arnold', 'sybil-ludington'],
  'think': 'Why did a win in New York change what France did?'},

 {'id': 'valley-forge', 'year': '1777–78', 'date': 'Winter 1777–1778', 'title': 'Valley Forge',
  'img': 'valley-forge.jpg', 'w': 1200, 'h': 630,
  'alt': 'A painting of Washington on horseback watching tired, poorly dressed soldiers march through snow.',
  'credit': 'William B. T. Trego, The March to Valley Forge, December 19, 1777, painted 1883. Public domain.',
  'q': ['In the winter of 1777, the army camped at Valley Forge, Pennsylvania.',
        'About 12,000 soldiers stayed there.',
        'They did not have enough food.',
        'Many had no warm clothes or shoes.',
        'About 2,000 soldiers died of disease.',
        'But the army did not quit.',
        'In the spring, Baron von Steuben trained the soldiers.',
        'They came out a stronger army.'],
  'c': ['In December 1777, about 12,000 soldiers marched into Valley Forge, Pennsylvania, to camp for the winter.',
        'They were short of food, clothes and shoes, and they built small log huts to stay warm.',
        'About 2,000 soldiers died of disease.',
        'Still, the army did not fall apart.',
        'In the spring, Baron von Steuben, an officer from Germany, trained the soldiers to march and fight together.',
        'They left Valley Forge a stronger army.'],
  'f': ['In December 1777, about 12,000 soldiers of the Continental Army marched into winter camp at Valley Forge, Pennsylvania.',
        'Congress and the states struggled to send supplies, so the soldiers went short of food, clothing and shoes while they built rows of log huts.',
        'About 2,000 soldiers died of disease that winter.',
        'Yet the army did not quit, and in the spring Baron von Steuben, a former Prussian officer, drilled the soldiers in how to march, load and fight as one force.',
        'The army that left Valley Forge was smaller but tougher and better trained.'],
  'd': ['On December 23, 1777, Washington warned Congress that he had "no less than 2898 Men now in Camp unfit for duty, because they are barefoot and otherwise naked."',
        'About 12,000 soldiers wintered at Valley Forge, and about 2,000 died of disease, chiefly typhus, typhoid, dysentery and influenza spread through crowded huts.',
        'Historians stress that the suffering came less from extreme cold than from a supply system that broke down between Congress, the states and the army\'s own commissaries.',
        'The camp is remembered as a turning point in another sense as well: under Baron von Steuben\'s drill that spring, the Continentals became a disciplined, professional army.'],
  'voice': ('young-soldiers', 'Young Soldiers', 'Many soldiers were teenagers. Joseph Plumb Martin joined at 15 and later wrote about the hunger at Valley Forge.'),
  'more': ['camp-followers', 'molly-pitcher'],
  'think': 'Why didn\'t the army quit at Valley Forge?'},

 {'id': 'freedom-offers', 'year': '1775–79', 'date': 'November 1775 and June 1779', 'title': 'Britain Offers Freedom',
  'img': 'dunmore.jpg', 'w': 550, 'h': 909,
  'alt': 'A printed poster from 1775 headed A Proclamation, signed by Lord Dunmore.',
  'credit': 'Lord Dunmore\'s Proclamation, printed broadside, November 7, 1775. Public domain.',
  'q': ['Britain needed more soldiers.',
        'In 1775, Lord Dunmore ran Virginia for the king.',
        'He made a promise to enslaved people.',
        'He said they could be free.',
        'First they had to run away from a Patriot.',
        'Then they had to fight for Britain.',
        'In 1779, a British general made the offer bigger.',
        'Thousands of enslaved people escaped to the British side.',
        'Both sides talked about liberty.',
        'For many enslaved people, Britain was the side offering freedom.'],
  'c': ['In November 1775, Lord Dunmore, the royal governor of Virginia, made an offer.',
        'Enslaved people owned by Patriots would be free if they escaped and fought for Britain.',
        'Patriot slaveholders were angry and afraid.',
        'In 1779, a British general, Henry Clinton, made the offer wider.',
        'Thousands of enslaved people escaped to British lines, risking their lives.',
        'Both sides talked about liberty.',
        'But for many enslaved people, the British side was the one that offered freedom.'],
  'f': ['In November 1775, Lord Dunmore, the royal governor of Virginia, promised freedom to enslaved people owned by Patriots if they escaped and fought for Britain.',
        'Hundreds joined a unit he called the Ethiopian Regiment.',
        'In 1779, the British general Henry Clinton widened the offer, and thousands of enslaved people escaped to British lines.',
        'Britain made these offers to weaken the Patriots, not to end slavery, and it kept slavery in its own colonies.',
        'Still, both sides talked about liberty, and for many enslaved people the British side was the one offering freedom.'],
  'd': ['Dunmore\'s proclamation of November 7, 1775, declared "all indented Servants, Negroes, or others, (appertaining to Rebels,) free that are able and willing to bear Arms, they joining His Majesty\'s Troops."',
        'Hundreds of men enlisted in what Dunmore called the Ethiopian Regiment, and in 1779 General Henry Clinton\'s Philipsburg Proclamation extended the promise to anyone enslaved by Patriots who reached British lines, whether or not they bore arms.',
        'Thousands escaped, though historians still debate how many, and many died of smallpox in crowded camps.',
        'The offers were a weapon of war rather than a principle, since Britain kept slavery in its own colonies, yet they forced Patriots to confront what their own language of liberty meant to the people they enslaved.'],
  'voice': ('enslaved-british-freedom', 'Enslaved People and British Freedom Offers', 'Thousands of enslaved people risked everything to escape to the British side.'),
  'more': ['nancy-hart', 'indentured-servants'],
  'think': 'To an enslaved person in Virginia, which side looked like the side of liberty, and why?'},

 {'id': 'yorktown', 'year': '1781', 'date': 'October 19, 1781', 'title': 'Yorktown',
  'img': 'yorktown.jpg', 'w': 1200, 'h': 791,
  'alt': 'A painting of British officers surrendering between two lines of soldiers, French on one side and American on the other.',
  'credit': 'John Trumbull, Surrender of Lord Cornwallis, 1820. Public domain.',
  'q': ['In 1781, a British army camped at Yorktown, Virginia.',
        'The town was next to the water.',
        'American and French armies trapped it on land.',
        'French ships blocked help from the sea.',
        'The British general Cornwallis gave up.',
        'He surrendered more than 7,000 soldiers.',
        'It was the last big battle of the war.'],
  'c': ['In 1781, the British general Cornwallis moved his army to Yorktown, Virginia, on the coast.',
        'He waited for British ships to bring help.',
        'Instead, a French fleet blocked the way from the sea.',
        'American and French armies dug trenches around the town and moved closer each day.',
        'On October 19, 1781, Cornwallis surrendered more than 7,000 soldiers.',
        'It was the last major battle, and Britain began to give up on winning the war.'],
  'f': ['In 1781, the British general Charles Cornwallis moved his army to Yorktown, Virginia, on the coast, expecting the British navy to bring help.',
        'Instead, a French fleet took control of the bay and blocked help from the sea, while American and French armies surrounded the town on land.',
        'Some of the Americans\' best information came from James Armistead, an enslaved man who spied inside the British camp.',
        'On October 19, 1781, Cornwallis surrendered more than 7,000 soldiers.',
        'It was the last major battle of the war, and Britain began to give up on winning it.'],
  'd': ['Cornwallis fortified Yorktown in the summer of 1781 on the assumption that the Royal Navy controlled the Chesapeake, but a French fleet under the Comte de Grasse closed the bay while Washington and the French general Rochambeau marched their combined armies south.',
        'Intelligence gathered by James Armistead, who posed as a runaway to work inside the British camp, helped the allies understand Cornwallis\'s position.',
        'After weeks of siege, Cornwallis surrendered more than 7,000 soldiers on October 19, 1781.',
        'Historians emphasize that the victory was as much French as American, and that although fighting continued on the frontier and at sea, Yorktown broke Britain\'s will: Lord North\'s government fell the following March.'],
  'voice': ('james-armistead', 'James Armistead Lafayette', 'An enslaved man who spied on the British for the Americans. His reports helped trap Cornwallis.'),
  'more': ['deborah-sampson', 'women'],
  'think': 'Who made the win at Yorktown possible, and how?'},

 {'id': 'treaty', 'year': '1783', 'date': 'September 3, 1783', 'title': 'Treaty of Paris',
  'img': 'treaty.jpg', 'w': 1200, 'h': 932,
  'alt': 'An unfinished painting of four American commissioners and their secretary; the right side, where the British would be, is blank.',
  'credit': 'Benjamin West, American Commissioners of the Preliminary Peace Negotiations with Great Britain, 1783, left unfinished. Public domain.',
  'q': ['On September 3, 1783, Britain signed a peace treaty.',
        'It is called the Treaty of Paris.',
        'It said the United States was independent.',
        'The new country reached west to the Mississippi River.',
        'The war was over.',
        'But Native nations were not part of the treaty.',
        'Britain gave away land where they lived.',
        'About 60,000 Loyalists left the United States after the war.'],
  'c': ['On September 3, 1783, Britain signed the Treaty of Paris.',
        'The treaty said the United States was independent, and its land now reached west to the Mississippi River.',
        'The war was over, but it had been expensive, and the new country owed a lot of money.',
        'Native nations were not part of the treaty, even though Britain gave away land where they lived.',
        'About 60,000 Loyalists, colonists who stayed loyal to the king, left the United States.'],
  'f': ['On September 3, 1783, almost two years after Yorktown, Britain signed the Treaty of Paris and recognized the United States as independent.',
        'The new nation\'s land reached west to the Mississippi River.',
        'One thing is true about all wars: they are expensive, and the United States began its life deep in debt.',
        'Native nations were not part of the treaty, even though Britain gave away land where they lived.',
        'About 60,000 Loyalists, many of whom had lost their homes and property, left the United States for Canada, Britain and the Caribbean.'],
  'd': ['The Treaty of Paris, signed on September 3, 1783, recognized American independence and drew the new nation\'s western boundary at the Mississippi River.',
        'Benjamin West\'s painting of the negotiators was never finished because the British negotiator, Richard Oswald, refused to pose, an apt image of a peace that one side signed reluctantly.',
        'Britain\'s Native allies, who had not been consulted, learned that their lands had been handed to the United States, and many regarded the treaty as a betrayal.',
        'About 60,000 Loyalists left the country, among them several thousand Black Loyalists who had been promised freedom, which is why historians increasingly describe the Revolution as a civil war with winners and losers on every side.'],
  'voice': ('loyalists', 'Loyalists', 'Colonists who stayed loyal to the king. About 60,000 left the United States after the war.'),
  'more': ['phillis-wheatley', 'abigail-adams', 'mercy-otis-warren', 'womens-economic-agency'],
  'think': 'Who won with the Treaty of Paris, and who lost?'},
]

LV = [('q', 'Quick', 'Short sentences. Key words explained.'),
      ('c', 'Clear', 'Plain words, a little more detail.'),
      ('f', 'Full', 'The grade-level reading.'),
      ('d', 'Deep', 'Adds real quotes from the time and what historians argue.')]
LIMIT = {'q': 5.0, 'c': 7.5, 'f': 10.5}

# ---- the shared FK measure (READING-LEVELS.md; same as tools/check-levels.js)
def syllables(word):
    w = re.sub(r'[^a-z]', '', word.lower())
    if not w: return 0
    if len(w) <= 3: return 1
    w = re.sub(r'(?:[^laeiouy]es|ed|[^laeiouy]e)$', '', w)
    w = re.sub(r'^y', '', w)
    m = re.findall(r'[aeiouy]{1,2}', w)
    return len(m) if m else 1

def fk(text):
    text = re.sub(r'<[^>]+>', ' ', text); text = re.sub(r'\([^)]*\)', ' ', text)
    sents = [s for s in re.split(r'[.!?]+["”’\')]*(?=\s|$)', text) if len(s.strip().split()) > 2]
    words = [w for w in text.split() if re.search(r'[a-z]', w, re.I)]
    syl = sum(syllables(w) for w in words)
    return 0.39 * len(words) / len(sents) + 11.8 * syl / len(words) - 15.59

def check():
    bad, rows = [], []
    for s in STOPS:
        g = {k: fk(' '.join(s[k])) for k, _, _ in LV}
        rows.append((s['id'], g))
        for k, lim in LIMIT.items():
            if g[k] > lim: bad.append(f"{s['id']}: {k} measures {g[k]:.1f} (limit {lim})")
        for a, b in (('q', 'c'), ('c', 'f'), ('f', 'd')):
            if not g[b] > g[a]: bad.append(f"{s['id']}: {b} ({g[b]:.1f}) not harder than {a} ({g[a]:.1f})")
    for sid, g in rows:
        print(f"{sid:15s} " + '  '.join(f"{n} {g[k]:4.1f}" for k, n, _ in LV))
    return bad

_all = [s['voice'][0] for s in STOPS] + [m for s in STOPS for m in s['more']]
assert sorted(_all) == sorted(TOPICS), 'every podcast topic appears exactly once'

E = html.escape
def paras(lines):
    return ''.join(f'<p>{E(l)}</p>' for l in lines)

def stop_html(i, s):
    vid, vname, vline = s['voice']
    levels = ''.join(f'<div class="lvtext lv-{k}" data-lv="{k}">{paras(s[k])}</div>' for k, _, _ in LV)
    vimg = ''
    if s.get('voice_img'):
        f, alt, cr = s['voice_img']
        vimg = (f'<figure class="vpic"><img src="images/war/{f}" alt="{E(alt)}" width="160" height="200" loading="lazy">'
                f'<figcaption>{E(cr)}</figcaption></figure>')
    more = ''.join(f'<li><a href="{VOICES}{m}/">{E(TOPICS[m])}</a></li>' for m in s['more'])
    return f'''
<section class="stop" id="{s['id']}" aria-labelledby="h-{s['id']}">
  <div class="stop-head">
    <span class="num" aria-hidden="true">{i}</span>
    <div><p class="when">{E(s['date'])}</p><h2 id="h-{s['id']}">{E(s['title'])}</h2></div>
  </div>
  <div class="stop-body">
    <figure class="pic"><img src="images/war/{s['img']}" alt="{E(s['alt'])}" width="{s['w']}" height="{s['h']}" loading="lazy">
      <figcaption>{E(s['credit'])}</figcaption></figure>
    <div class="reading" data-listen>{levels}</div>
  </div>
  <aside class="voice" aria-labelledby="v-{s['id']}">
    {vimg}
    <div class="vtext">
      <p class="vlab">Hidden Voice</p>
      <h3 id="v-{s['id']}">{E(vname)}</h3>
      <p>{E(vline)}</p>
      <p><a class="btn" href="{VOICES}{vid}/">Read about them</a></p>
      {('<p class="morelab">More voices near this stop:</p>' + chr(10) + '      <ul class="morelist">' + more + '</ul>') if more else ''}
    </div>
  </aside>
  <div class="think"><p class="tlab">Think About It</p><p class="ask">{E(s['think'])}</p></div>
</section>'''

def closing_html():
    groups, seen = [], set()
    for s in STOPS:   # each topic listed once, under the first stop that names it
        ids = [t for t in [s['voice'][0]] + s['more'] if t not in seen]; seen.update(ids)
        lis = ''.join(f'<li><a href="{VOICES}{t}/">{E(TOPICS[t])}</a></li>' for t in ids)
        groups.append(f'<div class="grp"><h3><a href="#{s["id"]}">{E(s["year"])} · {E(s["title"])}</a></h3><ul>{lis}</ul></div>')
    return f'''
<section class="closing" id="whose-stories" aria-labelledby="h-close">
  <h2 id="h-close">Whose Stories Aren&rsquo;t Told?</h2>
  <p class="lead">Every one of these people and groups shaped the Revolution, and most of them are left out of the usual story. Each one is a podcast topic.</p>
  <div class="groups">{''.join(groups)}</div>
  <p class="pick">Talk with your crew. Pick your top three.</p>
</section>'''

CSS = r'''
:root{
  --bg:#f6f1e8; --panel:#fffdf9; --ink:#1f2124; --muted:#5a4f45; --rule:#d6cfc3;
  --deep:#7a2a28; --accent:#b23a34; --tint:#f6e7e4; --gold:#9a7536; --band:#f1e6d8;
  --on-accent:#ffffff; --mast:#3d1413; --mast-ink:#fff8ee; --mast-edge:#b88f86;
  --display:'Playfair Display',Georgia,'Times New Roman',serif;
  --body:'Atkinson Hyperlegible Next','Atkinson Hyperlegible',Verdana,system-ui,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#1a1614; --panel:#241f1c; --ink:#f3ece3; --muted:#c9bcae; --rule:#40362f;
  --deep:#f0a59c; --accent:#e9827a; --tint:#3a2421; --gold:#d9b46a; --band:#2e2622;
  --on-accent:#1a0b09; --mast:#0f0b0a; --mast-ink:#fff8ee; --mast-edge:#7d6a62; color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#1a1614; --panel:#241f1c; --ink:#f3ece3; --muted:#c9bcae; --rule:#40362f;
  --deep:#f0a59c; --accent:#e9827a; --tint:#3a2421; --gold:#d9b46a; --band:#2e2622;
  --on-accent:#1a0b09; --mast:#0f0b0a; --mast-ink:#fff8ee; --mast-edge:#7d6a62; color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.55}
h1,h2,h3{font-family:var(--display);color:var(--deep);margin:0;line-height:1.15;text-wrap:balance}
p{margin:0}
a{color:var(--accent);font-weight:700}
button{font:inherit;color:inherit}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
[hidden]{display:none!important}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:-999px;top:0;background:var(--panel);padding:8px 12px;z-index:60}
.skip:focus{left:8px}
@media (prefers-reduced-motion: reduce){*{transition:none!important;scroll-behavior:auto!important}}
html{scroll-behavior:smooth}

.mast{position:sticky;top:0;z-index:20;background:var(--mast);color:var(--mast-ink);border-bottom:3px solid var(--gold)}
.mast .in{max-width:1180px;margin:0 auto;padding:8px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}
.brand{font-family:var(--display);font-weight:800;font-size:21px;color:var(--mast-ink);text-decoration:none;white-space:nowrap}
.mast .spacer{flex:1 1 auto}
.mast #rtools{position:relative;margin:0;flex-wrap:nowrap}
#rtools .rt-btn{min-height:40px;padding:6px 14px;border-radius:8px;font-size:15px;font-weight:700;background:transparent;color:var(--mast-ink);border:2px solid var(--mast-edge)}
#rtools .rt-btn.rt-primary{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
#rtools .rt-panel{position:absolute;top:calc(100% + 8px);right:0;width:min(360px,90vw);z-index:30;box-shadow:0 10px 30px rgba(0,0,0,.3);color:var(--ink)}
#rtools .rt-panel .rt-row{display:grid;grid-template-columns:76px 1fr;gap:10px;align-items:center;margin:0 0 14px}
#rtools .rt-panel .rt-row:last-child{margin:0}
#rtools .rt-panel .rt-opts{display:flex;flex-wrap:wrap;gap:8px}
.chips{max-width:1180px;margin:0 auto;padding:0 16px 8px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin}
.chips a{flex:0 0 auto;min-height:40px;display:inline-flex;align-items:center;padding:4px 12px;border-radius:999px;border:2px solid var(--mast-edge);color:var(--mast-ink);text-decoration:none;font-weight:700;font-size:15px}
.chips a:hover,.chips a[aria-current="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}

main.wrap{max-width:1180px;margin:0 auto;padding:22px 16px 64px;display:grid;gap:26px}
main.wrap > *{min-width:0}
.intro h1{font-size:clamp(34px,5.5vw,56px);line-height:1.05}
.intro .lead{font-size:clamp(18px,2vw,20px);margin-top:12px;max-width:42em}
.picker{background:var(--panel);border:1px solid var(--rule);border-radius:14px;padding:16px 18px;display:grid;gap:10px;margin-top:18px}
.picker .lab{font-weight:800}
.seg{display:flex;flex-wrap:wrap;gap:8px}
.seg button{min-height:44px;padding:6px 14px;border-radius:9px;border:1.5px solid var(--rule);background:var(--bg);cursor:pointer;font-weight:700}
.seg button[aria-pressed="true"]{border:2px solid var(--accent);background:var(--tint);color:var(--deep)}
.picker .blurb{color:var(--muted)}

.stop{background:var(--panel);border:1px solid var(--rule);border-radius:16px;overflow:hidden;scroll-margin-top:var(--pad,130px)}
.stop-head{display:flex;align-items:center;gap:14px;padding:18px 22px 12px;border-bottom:1px solid var(--rule)}
.num{flex:0 0 auto;width:46px;height:46px;border-radius:50%;background:var(--accent);color:var(--on-accent);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px}
.when{color:var(--muted);font-weight:700;font-size:15px}
.stop-head h2{font-size:clamp(26px,3.4vw,34px)}
.stop-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:22px;padding:20px 22px}
.pic{margin:0}
.pic img{display:block;width:100%;height:auto;border-radius:6px;border:1px solid var(--rule)}
.pic figcaption,.vpic figcaption{font-size:14px;color:var(--muted);margin-top:6px;line-height:1.4}
.reading p{font-size:18px;line-height:1.65}
.reading p + p{margin-top:10px}
.lvtext{display:none}
html[data-lv="q"] .lv-q,html[data-lv="c"] .lv-c,html[data-lv="f"] .lv-f,html[data-lv="d"] .lv-d{display:block}
html[data-lv="q"] .reading p{font-size:20px}
.voice{margin:0 22px 18px;display:flex;gap:18px;align-items:flex-start;background:var(--tint);border-left:6px solid var(--accent);border-radius:10px;padding:16px 18px}
.vpic{margin:0;flex:0 0 140px}
.vpic img{display:block;width:140px;height:auto;border-radius:6px}
.vtext{display:grid;gap:8px;min-width:0}
.vlab,.tlab{font-weight:800;color:var(--accent);font-size:15px}
.voice h3{font-size:24px}
.btn{display:inline-flex;align-items:center;min-height:44px;padding:8px 16px;border-radius:9px;background:var(--accent);color:var(--on-accent);text-decoration:none;font-weight:800}
.btn:hover{filter:brightness(1.07)}
.morelab{font-weight:700;margin-top:4px}
.morelist{margin:0;padding-left:20px;display:grid;gap:4px}
.think{padding:16px 22px 20px;border-top:1px solid var(--rule);display:grid;gap:4px}
.think .ask{font-size:19px;font-weight:700}

.closing{background:var(--panel);border:1px solid var(--rule);border-top:6px solid var(--accent);border-radius:16px;padding:22px;display:grid;gap:14px;scroll-margin-top:var(--pad,130px)}
.closing h2{font-size:clamp(28px,4vw,38px)}
.closing .lead{font-size:18px;max-width:46em}
.groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.grp{background:var(--bg);border:1px solid var(--rule);border-radius:12px;padding:14px 16px}
.grp h3{font-size:19px;margin-bottom:6px}
.grp h3 a{color:var(--deep);text-decoration:none}
.grp ul{margin:0;padding-left:20px;display:grid;gap:4px}
.pick{font-family:var(--display);font-size:26px;font-weight:800;color:var(--deep)}
footer.credits{color:var(--muted);font-size:14px;line-height:1.5;border-top:1px solid var(--rule);padding-top:16px}

@media (max-width:900px){
  .stop-body{grid-template-columns:1fr}
  .groups{grid-template-columns:1fr 1fr}
}
@media (max-width:560px){
  .stop-head,.stop-body{padding-left:16px;padding-right:16px}
  .voice{margin:0 16px 16px;flex-direction:column}
  .vpic{flex:none}
  .think{padding:14px 16px 18px}
  .groups{grid-template-columns:1fr}
  .brand{font-size:18px}
}
@media (max-width:480px){
  .mast .in{gap:6px 8px;padding:8px 12px}
  #rtools .rt-btn{padding:6px 10px;font-size:14px;min-height:38px}
  .chips{padding:0 12px 8px}
}
@media print{.mast,.picker,.btn{display:none!important}.stop{break-inside:avoid}}
'''

JS = r'''
(function(){
  var LV = {q:'Quick', c:'Clear', f:'Full', d:'Deep'};
  var BLURB = {q:'Short sentences. Key words explained.', c:'Plain words, a little more detail.', f:'The grade-level reading.', d:'Adds real quotes from the time and what historians argue.'};
  var SLUG = {quick:'q', clear:'c', full:'f', deep:'d'};
  var KEY = 'war-timeline-v1';
  var S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { S = {}; }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var qp = new URLSearchParams(location.search).get('level');
  if (qp && SLUG[qp.toLowerCase()]) { S.level = SLUG[qp.toLowerCase()]; save(); }
  function setLevel(l){
    if (!LV[l]) l = 'f';
    document.documentElement.setAttribute('data-lv', l);
    document.querySelectorAll('#lvSeg button').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.v === l)); });
    document.getElementById('lvBlurb').textContent = LV[l] + ': ' + BLURB[l];
    if (window.READER_TOOLS) window.READER_TOOLS.reset();
  }
  setLevel(S.level || 'f');
  document.getElementById('lvSeg').addEventListener('click', function(e){
    var b = e.target.closest('button'); if (!b) return;
    S.level = b.dataset.v; save(); setLevel(S.level);
  });
  /* Jump links (and QR codes) land under the sticky header, which wraps on phones. */
  var mast = document.querySelector('.mast');
  function pad(){ document.documentElement.style.setProperty('--pad', (mast.offsetHeight + 12) + 'px'); }
  window.addEventListener('resize', pad); pad();
  function land(){
    if (!location.hash) return;
    var t = document.getElementById(location.hash.slice(1)); if (!t) return;
    pad(); t.scrollIntoView({block:'start'});
    document.querySelectorAll('.chips a').forEach(function(a){ a.setAttribute('aria-current', String(a.getAttribute('href') === location.hash)); });
  }
  window.addEventListener('load', function(){ pad(); setTimeout(land, 50); });
  window.addEventListener('hashchange', land);
})();
'''

def page():
    chips = ''.join(f'<a href="#{s["id"]}">{E(s["year"])}</a>' for s in STOPS) + '<a href="#whose-stories">Whose Stories?</a>'
    seg = ''.join(f'<button type="button" data-v="{k}" aria-pressed="false">{n}</button>' for k, n, _ in LV)
    stops = ''.join(stop_html(i, s) for i, s in enumerate(STOPS, 1))
    return f'''<!doctype html>
<html lang="en" data-lv="f">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The War in Seven Stops</title>
<meta name="description" content="The Revolutionary War from Bunker Hill to the Treaty of Paris in seven stops, at four reading levels, with the hidden voices behind each one.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap">
<link rel="stylesheet" href="fonts/atkinson.css?v=20261005">
<!-- Built by tools/build-war-timeline.py. Edit that file, not this one. -->
<style>{CSS}</style>
</head>
<body>
<a class="skip" href="#main">Skip to the timeline</a>
<header class="mast">
  <div class="in">
    <a class="brand" href="#top">The War in Seven Stops</a>
    <span class="spacer"></span>
    <div id="rtools" role="group" aria-label="Listen and font"></div>
  </div>
  <nav class="chips" aria-label="Jump to a stop">{chips}</nav>
</header>
<main class="wrap" id="main">
  <section class="intro" id="top" aria-labelledby="h-top" data-listen>
    <h1 id="h-top">The Revolutionary War in Seven Stops, 1775 to 1783</h1>
    <p class="lead">Eight years of war, from the first big battle to the peace treaty. At each stop, read what happened, then meet a hidden voice: someone the usual story leaves out.</p>
    <div class="picker" data-no-listen>
      <p class="lab" id="lvLab">Pick your reading</p>
      <div class="seg" id="lvSeg" role="group" aria-labelledby="lvLab">{seg}</div>
      <p class="blurb" id="lvBlurb" aria-live="polite"></p>
    </div>
  </section>
{stops}
{closing_html()}
  <footer class="credits">
    <p>Pictures are public domain, from Wikimedia Commons; each credit is under its picture. Hidden Voice readings are on <a href="https://voices.mrbsocialstudies.org">Revolutionary Voices</a>. Mr. B&rsquo;s 8th Grade American Studies.</p>
  </footer>
</main>
<script>{JS}</script>
<script src="reader-tools.js?v=20261019"></script>
<script>
/* Group each Font-panel row's buttons so the row is label + options (as on index.html). */
window.addEventListener('load', function(){{
  document.querySelectorAll('#rtools .rt-row').forEach(function(row){{
    if (row.querySelector('.rt-opts')) return;
    var opts = document.createElement('div'); opts.className = 'rt-opts';
    Array.prototype.slice.call(row.querySelectorAll(':scope > .rt-opt')).forEach(function(b){{ opts.appendChild(b); }});
    row.appendChild(opts);
  }});
}});
</script>
</body>
</html>
'''

if __name__ == '__main__':
    problems = check()
    if problems:
        print('\n'.join(problems)); sys.exit(1)
    open(os.path.join(ROOT, 'war-timeline.html'), 'w', encoding='utf-8').write(page())
    print('wrote war-timeline.html')
