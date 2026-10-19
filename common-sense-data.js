/* Common Sense, annotated: the passages, plain-English versions, vocabulary and
   questions for common-sense.html.

   The original text is Thomas Paine's, 1776 (public domain), from the Project
   Gutenberg edition (the Bradford third edition, Feb 14 1776, with the Appendix).
   Spelling is Paine's ("independance", "connexion", "hath"); only "--" is set as a
   dash. Everything else here (plain English, notes, questions) was written for
   this page.

   LEVELS: q = Quick, c = Clear, f = Full, d = Deep (see READING-LEVELS.md).
   - passage.min: the easiest reading whose path includes this passage. A path
     shows every passage at or below its level (Deep sees all 19). A direct link
     (common-sense.html#<id>) opens any passage at any reading.
   - orig: paragraphs; each is a list of [level, text] segments. A reading shows
     the segments at or below its level and marks what it skips with "...". Every
     passage has at least one "q" segment, so a linked passage always has text.
   - plain: the plain-English side at each reading. `node tools/check-common-sense.js`
     measures them against the READING-LEVELS.md limits.
   - note: "Look Closer" (shown at Full and Deep).
   - ask.all / ask.q: the Stop and Think question (Quick gets its own wording).
     frame + bank: Quick's fill-in frame and word bank. st: sentence starters for
     Clear, Full, Deep. further: Deep's Going Further prompt, where there is one.
   No em dashes in anything written for students. */
window.COMMON_SENSE = {

  sections: [
    { id: 'intro', label: 'Introduction', title: 'Introduction' },
    { id: 's1', label: 'Part I', title: 'Of the Origin and Design of Government' },
    { id: 's2', label: 'Part II', title: 'Of Monarchy and Hereditary Succession' },
    { id: 's3', label: 'Part III', title: 'Thoughts on the Present State of American Affairs' },
    { id: 's4', label: 'Part IV', title: 'Of the Present Ability of America' },
    { id: 'app', label: 'Appendix', title: 'Appendix' }
  ],

  passages: [

  /* ------------------------------------------------------------ Introduction */
  {
    id: 'cause', sec: 'intro', min: 'f', title: 'The Cause of All Mankind',
    orig: [[
      ['q', `The cause of America is in a great measure the cause of all mankind.`],
      ['f', ` Many circumstances hath, and will arise, which are not local, but universal, and through which the principles of all Lovers of Mankind are affected, and in the Event of which, their Affections are interested.`],
      ['d', ` The laying a Country desolate with Fire and Sword, declaring War against the natural rights of all Mankind, and extirpating the Defenders thereof from the Face of the Earth, is the Concern of every Man to whom Nature hath given the Power of feeling; of which Class, regardless of Party Censure, is the AUTHOR`]
    ]],
    plain: {
      q: `Paine says this fight is not just for America. It is for all people. Freedom matters to everyone.`,
      c: `Paine says America's fight is everyone's fight. What happens here will matter to people all over the world. Anyone who cares about people should care about America's cause.`,
      f: `Paine opens big. He says the American cause is really the cause of all humanity, because the rights at stake belong to everyone, not just to one place. When a government burns a country and attacks people's natural rights, every person who can feel should care.`,
      d: `Paine frames a colonial dispute over taxes and authority as a universal struggle over natural rights. By claiming that Britain is waging war against "the natural rights of all Mankind," he transforms the reader from a bystander into a participant: anyone capable of feeling is obligated to take a side, and Paine places himself firmly among them.`
    },
    note: `This is Paine's whole argument in one sentence. Notice that he never names a tax or a law. Instead of arguing about the Stamp Act or tea, he lifts the fight up to "all mankind." That made the pamphlet feel bigger than one quarrel, and it is why people around the world still quote it.`,
    ask: { all: `Why would Paine say America's cause is "the cause of all mankind" instead of just talking about taxes?`,
           q: `Who does Paine say this fight is for?` },
    frame: `Paine says this fight is for ______ people, not just for ______. I think he says this because ______.`,
    bank: ['all', 'America', 'freedom', 'everyone'],
    st: { c: `Paine wants readers to think bigger because…`, f: `By calling it the cause of all mankind, Paine…`, d: `Paine universalizes the conflict in order to…` },
    further: `Can you think of a struggle today that people in other countries care about? Why do people care about fights far from home?`
  },

  /* ------------------------------------------------------------ Part I */
  {
    id: 'society', sec: 's1', min: 'q', title: 'A Necessary Evil',
    orig: [[
      ['f', `Some writers have so confounded society with government, as to leave little or no distinction between them; whereas they are not only different, but have different origins. `],
      ['c', `Society is produced by our wants, and government by our wickedness;`],
      ['f', ` the former promotes our happiness positively by uniting our affections, the latter negatively by restraining our vices.`],
      ['d', ` The one encourages intercourse, the other creates distinctions. The first a patron, the last a punisher.`]
    ], [
      ['q', `Society in every state is a blessing, but government even in its best state is but a necessary evil; in its worst state an intolerable one;`],
      ['f', ` for when we suffer, or are exposed to the same miseries by a government, which we might expect in a country without government, our calamity is heightened by reflecting that we furnish the means by which we suffer.`],
      ['c', ` Government, like dress, is the badge of lost innocence; the palaces of kings are built on the ruins of the bowers of paradise.`],
      ['d', ` For were the impulses of conscience clear, uniform, and irresistibly obeyed, man would need no other lawgiver; but that not being the case, he finds it necessary to surrender up a part of his property to furnish means for the protection of the rest; …`]
    ]],
    plain: {
      q: `People living together is good. Paine calls that society. Government is different. He calls it a necessary evil. We need it, but it is not good. A bad government is even worse.`,
      c: `Paine splits two ideas apart. Society is people helping each other, and it comes from what we need. Government comes from our bad behavior, because people do not always treat each other fairly. So even the best government is a "necessary evil." We need it, but we should not love it.`,
      f: `Paine starts by separating society from government. Society grows out of our needs and makes us happier by bringing people together. Government exists because people do wrong, so it works by holding us back. Even at its best, government is a "necessary evil," and at its worst it is unbearable. It hurts even more when we suffer under a government that our own money pays for.`,
      d: `Paine opens with a distinction many readers had blurred: society is a natural, positive association rooted in human needs, while government is an artificial restraint made necessary by human vice. His claim that government "even in its best state is but a necessary evil" sets the terms for the entire pamphlet. If government is merely a tool for security, then people may judge it by its results and replace it when it fails, a far more radical idea than complaining about particular taxes.`
    },
    note: `Paine borrows from the English thinker John Locke, who argued that people create governments to protect their rights. Paine's twist is his tone. Calling government an evil, even a needed one, gets readers ready to ask whether the British government is worth keeping.`,
    ask: { all: `What is the difference between society and government, according to Paine?`,
           q: `Paine says government is a "necessary evil." What does that mean?` },
    frame: `Society is ______. Government is a ______ evil. That means we ______ it, but it is not ______.`,
    bank: ['good', 'necessary', 'need', 'great'],
    st: { c: `Society is… but government is…`, f: `Paine says society comes from…, while government comes from…`, d: `Paine's distinction between society and government matters because…` },
    further: `Do you agree that government is a "necessary evil"? Name one thing government does that you think is good, not evil.`
  },
  {
    id: 'tree', sec: 's1', min: 'f', title: 'Government Under a Tree',
    orig: [[
      ['q', `Some convenient tree will afford them a State-House, under the branches of which, the whole colony may assemble to deliberate on public matters.`],
      ['f', ` It is more than probable that their first laws will have the title only of Regulations, and be enforced by no other penalty than public disesteem.`],
      ['q', ` In this first parliament every man, by natural right, will have a seat.`]
    ], [
      ['f', `But as the colony increases, the public concerns will increase likewise, and the distance at which the members may be separated, will render it too inconvenient for all of them to meet on every occasion as at first, when their number was small, their habitations near, and the public concerns few and trifling. This will point out the convenience of their consenting to leave the legislative part to be managed by a select number chosen from the whole body,`],
      ['d', ` who are supposed to have the same concerns at stake which those who appointed them, and who will act in the same manner as the whole body would act were they present.`],
      ['d', ` … that the elected might never form to themselves an interest separate from the electors, prudence will point out the propriety of having elections often; because as the elected might by that means return and mix again with the general body of the electors in a few months, their fidelity to the public will be secured by the prudent reflexion of not making a rod for themselves.`]
    ]],
    plain: {
      q: `Paine tells a story. A few people start a new place. They meet under a big tree. Everyone gets a say. Later the group grows. So they pick a few people to speak for them.`,
      c: `Paine imagines a small group starting a new colony. At first, everyone meets under a tree to make decisions, and every man gets a seat. As the colony grows, it gets too hard for everyone to meet. So they choose a few people to make the laws for them.`,
      f: `Paine imagines how government begins. A few settlers meet under a tree, and every man has a seat there by natural right. Their first rules are enforced only by the disapproval of neighbors. As the colony grows and spreads out, meeting together gets too hard, so the people agree to choose a smaller group to make laws. Those representatives should care about the same things as the people who chose them.`,
      d: `Paine constructs a thought experiment about the origin of government. In a tiny settlement, direct democracy under a tree is natural, and every man holds a seat "by natural right." Growth forces a shift to representation, but Paine insists representatives must share the voters' interests, and frequent elections keep them honest because they will soon return to live under the very laws they made. Notice what his origin story never requires: a king.`
    },
    note: `Colonists reading this may have pictured Boston's Liberty Tree, where the Sons of Liberty gathered to protest the Stamp Act in 1765. Paine's story also leaves people out. Women, enslaved people and Native nations had no seat in colonial assemblies. "Every man" really meant some men.`,
    ask: { all: `In Paine's story, why do the settlers stop meeting under the tree and start choosing representatives?`,
           q: `In Paine's story, where does the first government meet?` },
    frame: `First, the people meet under a ______. Everyone gets a ______. Later the group gets too ______, so they choose ______ to speak for them.`,
    bank: ['tree', 'say', 'big', 'leaders'],
    st: { c: `At first the settlers…, but later…`, f: `The settlers choose representatives because…`, d: `Paine's thought experiment suggests that legitimate government…` },
    further: `Who is missing from Paine's "every man"? How does leaving people out change how fair his story is?`
  },
  {
    id: 'simple', sec: 's1', min: 'd', title: 'Keep It Simple',
    orig: [[
      ['q', `I draw my idea of the form of government from a principle in nature, which no art can overturn, viz. that the more simple any thing is, the less liable it is to be disordered; and the easier repaired when disordered;`],
      ['f', ` and with this maxim in view, I offer a few remarks on the so much boasted constitution of England.`]
    ], [
      ['f', `Absolute governments (tho' the disgrace of human nature) have this advantage with them, that they are simple; if the people suffer, they know the head from which their suffering springs, know likewise the remedy, and are not bewildered by a variety of causes and cures.`],
      ['q', ` But the constitution of England is so exceedingly complex, that the nation may suffer for years together without being able to discover in which part the fault lies,`],
      ['c', ` some will say in one and some in another, and every political physician will advise a different medicine.`]
    ]],
    plain: {
      q: `Paine likes simple things. A simple thing is easy to fix. England's government is not simple. It has many parts. When it goes wrong, no one can tell why.`,
      c: `Paine says simple things break less often and are easier to fix. England's government has a king, lords, and a House of Commons, so it is complicated. People can suffer for years without knowing which part is the problem. Everyone blames a different part, like doctors who each want a different medicine.`,
      f: `Paine uses a rule from nature: the simpler something is, the less likely it is to break, and the easier it is to fix. A government where one ruler has total power is terrible, but at least people know who is causing their pain. England's system mixes a king, lords, and Commons, so when something goes wrong, everyone blames a different part, like doctors arguing over a cure.`,
      d: `Paine attacks the most admired feature of British politics, its "mixed constitution," which balanced king, Lords, and Commons. Most Britons, and many colonists, believed that mixture protected liberty. Paine inverts the praise into a criticism: complexity conceals responsibility. His metaphor of rival "political physicians," each prescribing a different medicine, implies that a system everyone celebrates can still be quietly, invisibly sick.`
    },
    note: `Britain's balanced government was the pride of the empire, and famous writers like Montesquieu praised it. Paine is picking a fight with a national hero. Later, the writers of the U.S. Constitution kept checks and balances anyway, so on this point America did not fully follow Paine.`,
    ask: { all: `Why does Paine think a simple government is better than a complex one? Do you agree?`,
           q: `Paine says simple things are easier to fix. Why does he think England's government is hard to fix?` },
    frame: `Simple things are easy to ______. England's government has many ______. When it goes wrong, people do not know ______.`,
    bank: ['fix', 'parts', 'why', 'king'],
    st: { c: `Paine thinks simple is better because…`, f: `Paine's medicine comparison shows that…`, d: `Paine's attack on the mixed constitution is risky because…` },
    further: `The U.S. Constitution splits power into three branches. Would Paine have liked that? Use his "simple" rule to explain.`
  },

  /* ------------------------------------------------------------ Part II */
  {
    id: 'ass-lion', sec: 's2', min: 'q', title: 'An Ass for a Lion',
    orig: [[
      ['f', `To the evil of monarchy we have added that of hereditary succession; and as the first is a degradation and lessening of ourselves, so the second, claimed as a matter of right, is an insult and an imposition on posterity.`],
      ['c', ` For all men being originally equals, no one by birth could have a right to set up his own family in perpetual preference to all others for ever,`],
      ['f', ` and though himself might deserve some decent degree of honors of his cotemporaries, yet his descendants might be far too unworthy to inherit them.`],
      ['q', ` One of the strongest natural proofs of the folly of hereditary right in kings, is, that nature disapproves it, otherwise she would not so frequently turn it into ridicule by giving mankind an ass for a lion.`]
    ]],
    plain: {
      q: `When a king dies, his child becomes king. Paine thinks this is silly. A great king is like a lion. But his child might be like a donkey. Nature makes fun of this rule.`,
      c: `Kings pass their crown down to their children. This is called hereditary succession. Paine says it makes no sense. All people are born equal, so no family should rule forever. Even if one king is good, his child might be terrible. Paine jokes that nature often gives people a donkey instead of a lion.`,
      f: `Paine attacks hereditary succession, the rule that a king's crown passes to his children. Since all people are born equal, no one has the right to make his family rulers forever. A king might earn some honor, but his children may not deserve it at all. Nature itself proves the system is foolish, Paine jokes, because it keeps handing people a donkey when they expected a lion.`,
      d: `Paine separates two evils: monarchy itself, and hereditary succession, which binds future generations ("posterity") to a ruling family they never chose. His argument rests on natural equality: if no one is born superior, then no birthright can justify perpetual rule. Then he punctures the whole institution with ridicule. The image of nature "giving mankind an ass for a lion" turned a serious philosophical claim into something memorable, and funny, for ordinary readers.`
    },
    note: `This is one of Paine's most famous jokes, and humor was a weapon. In 1775 most colonists still toasted King George III's health. Laughing at kings made it easier for people to picture living without one.`,
    ask: { all: `What is Paine's problem with hereditary succession? Explain his "ass for a lion" joke in your own words.`,
           q: `What does Paine mean by "an ass for a lion"?` },
    frame: `When a king dies, his ______ becomes king. Paine thinks this is ______. A great king is a lion, but his child might be a ______.`,
    bank: ['child', 'silly', 'donkey', 'equal'],
    st: { c: `Paine does not like kings passing down the crown because…`, f: `The "ass for a lion" joke means…`, d: `Paine's use of ridicule is effective because…` },
    further: `Some countries still have kings and queens today, but they have little power. Would Paine's argument still apply to them? Why or why not?`
  },
  {
    id: 'ruffian', sec: 's2', min: 'd', title: 'Where Kings Came From',
    orig: [[
      ['q', `This is supposing the present race of kings in the world to have had an honorable origin; whereas it is more than probable, that could we take off the dark covering of antiquity, and trace them to their first rise, that we should find the first of them nothing better than the principal ruffian of some restless gang,`],
      ['f', ` whose savage manners or pre-eminence in subtility obtained him the title of chief among plunderers; and who by increasing in power, and extending his depredations, over-awed the quiet and defenceless to purchase their safety by frequent contributions.`]
    ], [
      ['c', `England, since the conquest, hath known some few good monarchs, but groaned beneath a much larger number of bad ones; yet no man in his senses can say that their claim under William the Conqueror is a very honorable one.`],
      ['d', ` … It certainly hath no divinity in it.`]
    ]],
    plain: {
      q: `Where did kings come from? Paine has a guess. The first king led a gang. He took things from people. He made them pay him to stay safe.`,
      c: `Paine asks how kings first got their power. He guesses the first king was really the boss of a gang of robbers. People paid him so he would leave them alone. England's kings come from William the Conqueror, who took England by force in 1066. Paine says that is not an honorable start.`,
      f: `People assume kings have noble beginnings, Paine says, but if we could look far back in time, the first king was probably the toughest leader of a gang of robbers. As he grew stronger, he scared peaceful people into paying him for protection. England's royal line began with William the Conqueror, who invaded in 1066 and took the throne by force. Paine says that is nothing to be proud of.`,
      d: `Paine strips monarchy of its sacred image by imagining its origins. Rather than a ruler chosen by God, the first king was likely a successful criminal whose gang extracted "contributions" from frightened neighbors, essentially a protection racket. He anchors the speculation in English history: the reigning line traced back to William the Conqueror's invasion of 1066. The phrase "no divinity in it" directly challenges the doctrine of the divine right of kings.`
    },
    note: `Many people believed in the "divine right of kings," the idea that God chooses monarchs. Paine's gang-leader story is the opposite. If power first came from force, then the people can take it back.`,
    ask: { all: `According to Paine, how did the first kings get their power? Why does that matter for his argument?`,
           q: `Paine thinks the first king led a ______. What did that leader do?` },
    frame: `Paine thinks the first king was the leader of a ______. He took things from ______. People paid him to stay ______.`,
    bank: ['gang', 'people', 'safe', 'God'],
    st: { c: `Paine thinks the first kings got power by…`, f: `Paine's story about the first king matters because…`, d: `By replacing divine right with a story of force, Paine…` },
    further: `Paine is guessing about ancient history. Is a guess good evidence? Why might it still persuade readers?`
  },
  {
    id: 'honest-man', sec: 's2', min: 'c', title: 'One Honest Man',
    orig: [[
      ['c', `In England a king hath little more to do than to make war and give away places; which in plain terms, is to impoverish the nation and set it together by the ears.`],
      ['c', ` A pretty business indeed for a man to be allowed eight hundred thousand sterling a year for, and worshipped into the bargain!`],
      ['q', ` Of more worth is one honest man to society and in the sight of God, than all the crowned ruffians that ever lived.`]
    ]],
    plain: {
      q: `Paine says the king does not do much. He starts wars. He gives jobs to his friends. Yet he gets lots of money. Paine says one honest person is worth more than all kings.`,
      c: `Paine says England's king mostly does two things. He starts wars, and he hands out government jobs to his friends. That makes the country poorer and makes people fight. Yet the king is paid a huge fortune every year, and people worship him too. Paine says one honest person matters more than all the kings in history.`,
      f: `Paine sums up the job of England's king: make war and give away government positions. In plain words, that means draining the country's money and turning people against each other. For this, the king receives a fortune of 800,000 pounds a year and is practically worshipped. Paine's verdict is that one honest ordinary person is worth more to society, and to God, than every "crowned ruffian" who ever lived.`,
      d: `Paine concludes his section on monarchy by reducing the king's role to two corrupt functions: waging war and distributing "places," government offices handed out to purchase loyalty. The sarcasm of "a pretty business indeed" sharpens the contrast between an enormous royal income and useless labor. The final sentence completes an inversion Paine has built across the whole section: honor belongs to the honest commoner, while kings become "crowned ruffians," echoing his earlier gang-leader origin story.`
    },
    note: `"Places" were government jobs the king could give to supporters, including members of Parliament. Many colonists believed this was how the king controlled Parliament. Paine is saying the system is not just expensive. It is corrupt.`,
    ask: { all: `Paine compares "one honest man" to "all the crowned ruffians that ever lived." What point is he making?`,
           q: `Who does Paine say is worth more: one honest person, or all the kings? Why?` },
    frame: `Paine says the king starts ______ and gives jobs to his ______. He thinks one ______ person is worth more than all the ______.`,
    bank: ['wars', 'friends', 'honest', 'kings'],
    st: { c: `Paine thinks one honest person is worth more because…`, f: `Paine calls kings "crowned ruffians" to show…`, d: `Paine's inversion of honor in this passage…` },
    further: `Paine's sentence about the honest man ends Part II. Why do you think he chose to end the section on this line?`
  },

  /* ------------------------------------------------------------ Part III */
  {
    id: 'sun', sec: 's3', min: 'c', title: 'A Cause of Greater Worth',
    orig: [[
      ['q', `The sun never shined on a cause of greater worth.`],
      ['q', ` 'Tis not the affair of a city, a country, a province, or a kingdom, but of a continent—of at least one eighth part of the habitable globe.`],
      ['f', ` 'Tis not the concern of a day, a year, or an age; posterity are virtually involved in the contest, and will be more or less affected, even to the end of time, by the proceedings now.`],
      ['c', ` Now is the seed time of continental union, faith and honor. The least fracture now will be like a name engraved with the point of a pin on the tender rind of a young oak; the wound will enlarge with the tree, and posterity read it in full grown characters.`]
    ]],
    plain: {
      q: `Paine says this is the best cause ever. It is not about one town. It is about a whole continent. What people do now will matter for a long time.`,
      c: `Paine says no cause has ever been more important. This fight is not about one city or one colony. It is about a whole continent. Right now is the time to plant the seeds of unity. A small crack now will grow bigger later, like a name carved into a young tree.`,
      f: `Paine raises the stakes: no cause in history has mattered more. This is not about one city or colony but a whole continent, and its effects will reach people who are not even born yet. Now is the "seed time," the moment to plant unity, faith and honor. He warns that even a small split today will be like a name scratched into the bark of a young oak. As the tree grows, the scar grows too, and future Americans will read it in giant letters.`,
      d: `This is Paine at his most lyrical. He expands the conflict in space (a continent, "one eighth part of the habitable globe") and in time ("posterity"), so that hesitation becomes a betrayal of the future. The oak-tree image functions as an argument as well as an ornament: decisions made while a nation is young become permanent features of its character. Readers are pressed to see the present as the single moment when unity can still be shaped.`
    },
    note: `"One eighth part of the habitable globe" is an exaggeration, and Paine knew readers would feel it rather than measure it. The oak tree is a metaphor about timing. Small choices made early shape a nation forever.`,
    ask: { all: `Explain Paine's oak tree metaphor. What is he warning colonists about?`,
           q: `Why does Paine say this cause matters so much?` },
    frame: `Paine says this cause is about a whole ______, not one town. What people do ______ will matter for a long ______.`,
    bank: ['continent', 'now', 'time', 'tree'],
    st: { c: `The name carved in the young oak shows that…`, f: `Paine's oak tree metaphor warns that…`, d: `By expanding the conflict in space and time, Paine…` },
    further: `Paine says choices made when a nation is young last forever. Name one early American choice that you think left a "scar" that later generations had to deal with.`
  },
  {
    id: 'milk', sec: 's3', min: 'd', title: 'Milk and Meat',
    orig: [[
      ['q', `I have heard it asserted by some, that as America hath flourished under her former connexion with Great-Britain, that the same connexion is necessary towards her future happiness, and will always have the same effect. Nothing can be more fallacious than this kind of argument. We may as well assert that because a child has thrived upon milk, that it is never to have meat,`],
      ['f', ` or that the first twenty years of our lives is to become a precedent for the next twenty.`]
    ], [
      ['c', `But she has protected us, say some. That she has engrossed us is true, and defended the continent at our expence as well as her own is admitted, and she would have defended Turkey from the same motive, viz. the sake of trade and dominion.`]
    ]],
    plain: {
      q: `Some people said America did well with Britain. So it still needs Britain. Paine says no. A baby needs milk. But a growing kid needs real food. America has grown up.`,
      c: `Some people argued that America grew strong while it was tied to Britain, so it should stay tied. Paine says that thinking is wrong. A baby does well on milk, but that does not mean it should never eat meat. Others said Britain protected America. Paine says Britain only did it for its own trade and power.`,
      f: `Paine answers a common argument: America did well under Britain, so it needs Britain to keep doing well. That makes no more sense, he says, than claiming a child who grew on milk should never eat meat. Then he takes on the claim that Britain protected the colonies. Yes, Britain defended America, but it did so for its own trade and power, and it would have defended any place, even far-off Turkey, for the same reasons.`,
      d: `Paine dismantles the case for reconciliation through analogy. Past prosperity under Britain proves nothing about future needs, just as a child's thriving on milk does not mean it should never progress to meat. He then reframes British "protection" as self-interest: Britain defended the continent to safeguard its commerce and empire, not out of affection. By invoking Turkey, a distant land no Briton would call family, he exposes "protection" as a business arrangement.`
    },
    note: `This is a classic counterargument move. Paine states what the other side says ("But she has protected us, say some") and then answers it. Watch for "say some" all through Part III. It is how Paine argues with readers who disagree with him.`,
    ask: { all: `What argument is Paine answering here, and how does the milk and meat comparison help him answer it?`,
           q: `What does Paine mean when he says a child cannot drink only milk forever?` },
    frame: `A baby needs ______, but a growing kid needs ______. Paine means America has ______ up and does not need ______.`,
    bank: ['milk', 'meat', 'grown', 'Britain'],
    st: { c: `Paine uses milk and meat to show…`, f: `The other side argues… but Paine answers…`, d: `Paine's reframing of British "protection" works because…` },
    further: `Find another "say some" in Part III. What argument is Paine answering there?`
  },
  {
    id: 'parent', sec: 's3', min: 'd', title: 'The Parent Country',
    orig: [[
      ['q', `But Britain is the parent country, say some. Then the more shame upon her conduct.`],
      ['f', ` Even brutes do not devour their young, nor savages make war upon their families; wherefore the assertion, if true, turns to her reproach; but it happens not to be true, or only partly so,`],
      ['d', ` and the phrase parent or mother country hath been jesuitically adopted by the king and his parasites, with a low papistical design of gaining an unfair bias on the credulous weakness of our minds.`],
      ['q', ` Europe, and not England, is the parent country of America. This new world hath been the asylum for the persecuted lovers of civil and religious liberty from every part of Europe.`],
      ['c', ` Hither have they fled, not from the tender embraces of the mother, but from the cruelty of the monster; and it is so far true of England, that the same tyranny which drove the first emigrants from home, pursues their descendants still.`]
    ]],
    plain: {
      q: `Some people called Britain America's parent. Paine says a good parent does not hurt its kids. He says all of Europe is America's parent. People came here to be free.`,
      c: `Some people called Britain America's "parent country." Paine says that makes Britain look worse, because good parents do not attack their own children. He also says it is not really true. People came to America from all over Europe to escape cruel rulers. The same unfair treatment that drove them away is now chasing their children.`,
      f: `Paine takes on the phrase "mother country." If Britain really is America's parent, he says, its attacks are even more shameful, since even animals do not eat their young. But the claim is not true anyway. Settlers came from every part of Europe, fleeing cruel rulers who punished them for their beliefs. They did not leave a loving mother. They escaped a monster, and that same tyranny is still chasing their descendants.`,
      d: `Paine attacks the most emotionally powerful metaphor in the imperial relationship, "the mother country." He argues in two steps: if the metaphor is true, Britain's violence becomes monstrous; and the metaphor is false anyway, because America was peopled from all of Europe as a refuge for the persecuted. The passage recasts colonial identity, and it also reveals Paine's limits. His America is an asylum for Europeans; Africans and Native peoples are absent, and his insults draw on common anti-Catholic prejudice.`
    },
    note: `Paine's words carry prejudices of his time. "Savages" was an insulting word for Native Americans. "Jesuitically" and "papistical" are insults aimed at Catholics, a bias many Protestant colonists shared. Notice how Paine uses them to stir readers' feelings, and notice who his "asylum" leaves out: enslaved Africans and the Native peoples already living here.`,
    ask: { all: `Why does Paine reject the idea that Britain is America's "parent country"? Who does his idea of America leave out?`,
           q: `Some people called Britain America's "parent." Why does Paine disagree?` },
    frame: `People called Britain America's ______. Paine says a good parent does not ______ its kids. He says people came here from all over ______ to be free.`,
    bank: ['parent', 'hurt', 'Europe', 'king'],
    st: { c: `Paine says Britain is not really the parent because…`, f: `Paine attacks the "mother country" idea by…`, d: `Paine's redefinition of the parent country both includes and excludes…` },
    further: `Paine uses insults about Native Americans and Catholics to make his point. Does that make his argument weaker? Explain.`
  },
  {
    id: 'time-to-part', sec: 's3', min: 'q', title: "'Tis Time to Part",
    orig: [[
      ['f', `Europe is too thickly planted with kingdoms to be long at peace, and whenever a war breaks out between England and any foreign power, the trade of America goes to ruin, because of her connection with Britain.`],
      ['f', ` …`],
      ['q', ` Every thing that is right or natural pleads for separation. The blood of the slain, the weeping voice of nature cries, 'Tis time to part.`],
      ['c', ` Even the distance at which the Almighty hath placed England and America, is a strong and natural proof, that the authority of the one, over the other, was never the design of Heaven.`],
      ['d', ` The time likewise at which the continent was discovered, adds weight to the argument, and the manner in which it was peopled encreases the force of it.`]
    ]],
    plain: {
      q: `Paine says it is time for America to leave Britain. People have died in the fighting. Even nature agrees. A huge ocean is between them. They were not meant to be one.`,
      c: `Paine says everything right and natural tells America to separate from Britain. People have already died in the fighting. Their blood seems to cry out, "It is time to part." Paine adds that the huge ocean between England and America shows God never meant one to rule the other.`,
      f: `Paine argues that being tied to Britain drags America into Europe's endless wars, which wreck American trade every time. Then his tone shifts. Everything right and natural, he says, calls for separation. The blood of colonists killed at Lexington, Concord, and Bunker Hill seems to cry out, "It is time to part." Even geography is evidence: thousands of miles of ocean prove that one land was never meant to rule the other.`,
      d: `Paine moves from a practical argument (Europe's constant wars ruin American trade) to an emotional and almost spiritual one. Personifying nature as "weeping" over "the blood of the slain," he turns the dead of 1775 into witnesses for independence. He then claims Providence itself: the width of the ocean, and even the timing of America's discovery, become signs that separation was "the design of Heaven." The passage fuses economic reasoning, grief, and religious destiny into a single appeal.`
    },
    note: `"'Tis time to part" became one of the most quoted lines in the pamphlet. Paine appeals to emotion (pathos) by bringing in the soldiers who died. Ask yourself: is the ocean between England and America proof, or just persuasion?`,
    ask: { all: `Paine gives several reasons it is "time to part." Pick one and explain whether you think it is a strong reason.`,
           q: `What does "'Tis time to part" mean? Who does Paine say should part?` },
    frame: `"'Tis time to part" means it is time for ______ to leave ______. One reason Paine gives is ______.`,
    bank: ['America', 'Britain', 'the ocean', 'people died'],
    st: { c: `One reason Paine gives for separating is…`, f: `The strongest reason Paine gives is… because…`, d: `Paine blends practical, emotional, and religious arguments by…` },
    further: `Which of Paine's reasons here would convince a farmer? A merchant? A minister? Explain who each reason was aimed at.`
  },
  {
    id: 'island', sec: 's3', min: 'q', title: 'An Island and a Continent',
    orig: [[
      ['f', `As to government matters, it is not in the power of Britain to do this continent justice: The business of it will soon be too weighty, and intricate, to be managed with any tolerable degree of convenience, by a power, so distant from us, and so very ignorant of us; for if they cannot conquer us, they cannot govern us.`],
      ['c', ` To be always running three or four thousand miles with a tale or a petition, waiting four or five months for an answer, which when obtained requires five or six more to explain it in, will in a few years be looked upon as folly and childishness`],
      ['f', `—There was a time when it was proper, and there is a proper time for it to cease.`]
    ], [
      ['q', `Small islands not capable of protecting themselves, are the proper objects for kingdoms to take under their care; but there is something very absurd, in supposing a continent to be perpetually governed by an island.`],
      ['c', ` In no instance hath nature made the satellite larger than its primary planet,`],
      ['f', ` and as England and America, with respect to each other, reverses the common order of nature, it is evident they belong to different systems:`],
      ['q', ` England to Europe, America to itself.`]
    ]],
    plain: {
      q: `England is a small island. America is a huge land. Paine says it is silly for the small one to rule the big one. England belongs with Europe. America should rule itself.`,
      c: `Paine says Britain is too far away to govern America well. Sending a complaint across the ocean and waiting months for an answer is silly. He also points out that England is a small island and America is a whole continent. A moon is never bigger than its planet. So England belongs with Europe, and America belongs to itself.`,
      f: `Paine argues that Britain is too far away and knows too little about America to govern it fairly. If Britain cannot win the war, it cannot rule. Crossing thousands of miles of ocean with every complaint and waiting months for answers will soon look childish. Then he turns to nature: it is absurd for an island to rule a continent forever. In nature, a moon is never bigger than the planet it circles, so England and America must belong to different systems.`,
      d: `Paine combines two arguments. The first is practical: distance and ignorance make British government slow, clumsy, and unjust, and the line "if they cannot conquer us, they cannot govern us" ties political authority to military reality. The second is cosmic: borrowing the language of Newtonian astronomy, he presents independence as a correction of an unnatural arrangement, a satellite larger than its planet. The closing antithesis, "England to Europe, America to itself," compresses the whole argument into six words.`
    },
    note: `Readers in 1776 knew from Isaac Newton's science that smaller bodies orbit bigger ones. Paine makes independence sound like a law of nature instead of a choice. Also notice the rhythm of the last line, "England to Europe, America to itself." Short lines are easy to remember and repeat.`,
    ask: { all: `Why does Paine think it is "absurd" for an island to govern a continent? Is size a good reason for independence?`,
           q: `England is an island. America is a continent. Why does Paine think that matters?` },
    frame: `England is a small ______. America is a big ______. Paine thinks the small one should not ______ the big one.`,
    bank: ['island', 'continent', 'rule', 'ocean'],
    st: { c: `Paine uses the moon and the planet to show…`, f: `Paine gives two kinds of reasons here: … and …`, d: `Paine's appeal to the "order of nature" is persuasive but…` },
    further: `Is Paine's moon and planet comparison evidence, or just a clever image? Can an argument be persuasive without being logical?`
  },
  {
    id: 'house-burnt', sec: 's3', min: 'd', title: 'Hath Your House Been Burnt?',
    orig: [[
      ['f', `Men of passive tempers look somewhat lightly over the offences of Britain, and, still hoping for the best, are apt to call out, "Come, come, we shall be friends again, for all this."`],
      ['q', ` But examine the passions and feelings of mankind, Bring the doctrine of reconciliation to the touchstone of nature, and then tell me, whether you can hereafter love, honour, and faithfully serve the power that hath carried fire and sword into your land?`],
      ['d', ` If you cannot do all these, then are you only deceiving yourselves, and by your delay bringing ruin upon posterity. …`],
      ['q', ` But if you say, you can still pass the violations over, then I ask, Hath your house been burnt? Hath your property been destroyed before your face? Are your wife and children destitute of a bed to lie on, or bread to live on? Have you lost a parent or a child by their hands, and yourself the ruined and wretched survivor?`],
      ['f', ` If you have not, then are you not a judge of those who have.`],
      ['d', ` But if you have, and still can shake hands with the murderers, then are you unworthy of the name of husband, father, friend, or lover, and whatever may be your rank or title in life, you have the heart of a coward, and the spirit of a sycophant.`]
    ]],
    plain: {
      q: `Some people still hoped to be friends with Britain. Paine asks them hard questions. Was your house burned? Did you lose your family? If not, he says, do not judge people who did.`,
      c: `Some colonists still hoped America and Britain could be friends again. Paine asks them to look at their feelings. Could you love a country that brought war to your land? Then he asks hard questions. Was your house burned? Did you lose a parent or a child? If not, you cannot judge the people who did.`,
      f: `Paine speaks to calm colonists who still say, "We shall be friends again." He asks whether anyone can truly love and serve a power that brought war into their land. Then he fires a series of painful questions: Has your house been burned? Has your property been destroyed? Have you lost a parent or a child? If not, Paine says, you have no right to judge those who have, and those who have suffered should never shake hands with the people who hurt them.`,
      d: `Paine abandons abstract argument for direct confrontation. The passage is built from rhetorical questions in the second person, each more intimate than the last, moving from property to family to death. Readers who have not suffered are disqualified from judging; readers who have suffered and still seek peace are branded cowards. It is a powerful, and manipulative, structure: it leaves no comfortable position for the moderate reader, which is exactly Paine's goal.`
    },
    note: `When Paine wrote this, Boston had been under siege for months, and many families there had fled or lost their homes. Paine is using rhetorical questions, questions asked to make a point, not to get an answer. Read them aloud and notice how each one hits harder than the last.`,
    ask: { all: `Paine asks a series of questions in this passage. What is he trying to make the reader feel, and does it work on you?`,
           q: `Paine asks, "Hath your house been burnt?" Why does he ask that?` },
    frame: `Paine asks if your ______ was burned. He wants people to feel ______. He thinks people who lost things should not be ______ with Britain.`,
    bank: ['house', 'angry', 'friends', 'happy'],
    st: { c: `Paine asks these questions because…`, f: `The questions get harder because…`, d: `Paine's rhetorical questions corner the moderate reader by…` },
    further: `Is it fair for Paine to call people who want peace cowards? Write one sentence a moderate colonist might say back to him.`
  },
  {
    id: 'law-is-king', sec: 's3', min: 'c', title: 'The Law Is King',
    orig: [[
      ['q', `But where says some is the King of America? I'll tell you Friend, he reigns above, and doth not make havoc of mankind like the Royal Brute of Britain.`],
      ['f', ` Yet that we may not appear to be defective even in earthly honors, let a day be solemnly set apart for proclaiming the charter; let it be brought forth placed on the divine law, the word of God; let a crown be placed thereon, by which the world may know, that so far as we approve of monarchy,`],
      ['q', ` that in America the law is king. For as in absolute governments the King is law, so in free countries the law ought to be King; and there ought to be no other.`],
      ['c', ` But lest any ill use should afterwards arise, let the crown at the conclusion of the ceremony be demolished, and scattered among the people whose right it is.`]
    ]],
    plain: {
      q: `People asked, "Who will be America's king?" Paine says God is king above. On earth, the law should be king. In America, no one is above the law.`,
      c: `Some people asked who would be America's king. Paine says God is king above, and he is nothing like the cruel king of Britain. In free countries, the law should be king. Paine even suggests putting a crown on the new laws for a day, then breaking it and giving the pieces to the people.`,
      f: `Paine answers people who ask, "Where is the King of America?" God reigns above, he says, and does not destroy people like Britain's "Royal Brute." For a ceremony, Americans could set a crown on their new charter of laws, to show the world that in America the law is king. Under a tyrant, the king's word is law, but in a free country the law should rule everyone. Afterward the crown should be smashed and scattered among the people, who are its true owners.`,
      d: `Paine's answer to "Where is the King of America?" reverses the logic of monarchy. In absolute governments the king's will is law; in free countries the law itself must be sovereign, binding rulers and ruled alike. His imagined ceremony is political theater: a crown placed on a written charter, then demolished and "scattered among the people whose right it is." The image captures the principle of popular sovereignty, that authority belongs to the people and is exercised through law, not through a person.`
    },
    note: `"The law is king" is the idea we now call the rule of law: no one, not even a leader, is above the law. Paine's crown-smashing ceremony is a symbol of popular sovereignty, the idea that power belongs to the people. You will see both ideas again in the Declaration of Independence and the Constitution.`,
    ask: { all: `What does Paine mean when he says "in America the law is king"? Why would he smash the crown?`,
           q: `Paine says, "In America the law is king." What does that mean?` },
    frame: `In Britain, the ______ is king. In America, Paine says the ______ should be king. That means no one is ______ the law.`,
    bank: ['king', 'law', 'above', 'people'],
    st: { c: `"The law is king" means…`, f: `Paine smashes the crown and gives it to the people to show…`, d: `Paine's ceremony dramatizes popular sovereignty by…` },
    further: `Can you think of a time today when a leader was held to the law? How does that connect to "the law is king"?`
  },
  {
    id: 'o-ye', sec: 's3', min: 'f', title: 'O Ye That Love Mankind',
    orig: [[
      ['q', `O ye that love mankind! Ye that dare oppose, not only the tyranny, but the tyrant, stand forth!`],
      ['c', ` Every spot of the old world is overrun with oppression. Freedom hath been hunted round the globe.`],
      ['f', ` Asia, and Africa, have long expelled her—Europe regards her like a stranger, and England hath given her warning to depart.`],
      ['q', ` O! receive the fugitive, and prepare in time an asylum for mankind.`]
    ]],
    plain: {
      q: `Paine calls out to people who love freedom. He says stand up! Freedom is being chased all over the world. Give freedom a safe home in America.`,
      c: `Paine calls out to everyone who loves people and hates cruel rulers. He tells them to stand up. All over the old world, people are treated unfairly. Freedom is being chased around the globe. Paine asks Americans to welcome freedom and make America a safe home for everyone.`,
      f: `Paine ends Part III with a call to action. He calls on everyone who loves humanity and dares to oppose not just tyranny but the tyrant himself to stand up. Across the old world, he says, freedom is being hunted. Asia and Africa have driven her out, Europe treats her like a stranger, and England has ordered her to leave. Americans must welcome this runaway and build a safe home for all people.`,
      d: `Paine closes Part III with an apostrophe, a direct address to an absent audience ("O ye that love mankind!"), and personifies Freedom as a fugitive hunted across the continents. The shift from opposing "the tyranny" to opposing "the tyrant" matters: colonists had long blamed ministers and Parliament while sparing the king, and Paine demands they target George III himself. America becomes not merely a nation but an "asylum for mankind," a vision that later generations would both celebrate and fall short of.`
    },
    note: `Before 1776, many colonists blamed Parliament and the king's ministers, not the king himself. Paine says to oppose "not only the tyranny, but the tyrant." That is a big step. He is naming King George III as the enemy.`,
    ask: { all: `Paine describes freedom as a "fugitive" being hunted around the world. What does he want Americans to do about it?`,
           q: `Paine says freedom is being chased. What does he want Americans to do?` },
    frame: `Paine says ______ is being chased around the world. He wants America to be a safe ______ for all people.`,
    bank: ['freedom', 'home', 'king', 'war'],
    st: { c: `Paine wants Americans to…`, f: `By calling freedom a "fugitive," Paine…`, d: `The shift from "the tyranny" to "the tyrant" matters because…` },
    further: `Paine calls America "an asylum for mankind." Has America lived up to that? Give one example of yes and one of no.`
  },

  /* ------------------------------------------------------------ Part IV */
  {
    id: 'unity', sec: 's4', min: 'd', title: 'Strength in Unity',
    orig: [[
      ['q', `It is not in numbers, but in unity, that our great strength lies; yet our present numbers are sufficient to repel the force of all the world.`],
      ['f', ` The Continent hath, at this time, the largest body of armed and disciplined men of any power under Heaven;`],
      ['d', ` and is just arrived at that pitch of strength, in which no single colony is able to support itself, and the whole, when united, can accomplish the matter, and either more, or, less than this, might be fatal in its effects.`]
    ], [
      ['c', `No country on the globe is so happily situated, or so internally capable of raising a fleet as America. Tar, timber, iron, and cordage are her natural produce. We need go abroad for nothing.`],
      ['d', ` … We ought to view the building a fleet as an article of commerce, it being the natural manufactory of this country. It is the best money we can lay out.`]
    ]],
    plain: {
      q: `Paine says being united makes America strong. It is not about how many people there are. America also has wood and iron. It can build its own ships.`,
      c: `Paine says America's real strength comes from being united, not just from having lots of people. No single colony could win alone, but together they can. America also has everything it needs to build a navy: tar, wood, iron, and rope. It does not need to buy anything from other countries.`,
      f: `Paine answers people who doubted America could win. Its strength comes from unity more than numbers, he says, and right now the colonies are at the perfect point: none could stand alone, but together they can succeed. He also claims no country is better able to build a navy, because tar, timber, iron, and rope all come from America itself. Building ships would even be good business.`,
      d: `Part IV shifts from whether America should be independent to whether it can be. Paine argues that the colonies have reached a precise threshold of strength: individually too weak, collectively sufficient. His confident claims deserve scrutiny, since the Continental Army of early 1776 was small, poorly supplied, and untested against Britain's professional forces. Yet his inventory of naval resources was largely accurate, and his framing of a navy as "an article of commerce" appealed to merchants who measured everything in profit.`
    },
    note: `Paine exaggerates here. In early 1776 the Continental Army was small, short on gunpowder, and facing the world's strongest navy. Persuasive writing often sounds more certain than the facts allow. As a reader, it is your job to notice that gap.`,
    ask: { all: `Paine says America's strength comes "not in numbers, but in unity." What does he mean, and was he right?`,
           q: `Paine says being ______ makes America strong. What does he mean?` },
    frame: `Paine says America is strong when it is ______. America has ______ and iron, so it can build its own ______.`,
    bank: ['united', 'wood', 'ships', 'alone'],
    st: { c: `Paine thinks unity matters more than numbers because…`, f: `Paine tries to convince doubters that America can win by…`, d: `Paine's claims about American strength are partly true and partly…` },
    further: `Paine says America has "the largest body of armed and disciplined men" in the world. Look up the size of the Continental Army in 1776. Was Paine telling the truth?`
  },
  {
    id: 'seed-time', sec: 's4', min: 'd', title: 'The Seed Time of Good Habits',
    orig: [[
      ['q', `Youth is the seed time of good habits, as well in nations as in individuals. It might be difficult, if not impossible, to form the Continent into one government half a century hence.`],
      ['c', ` The vast variety of interests, occasioned by an increase of trade and population, would create confusion. Colony would be against colony.`],
      ['f', ` Each being able might scorn each other's assistance: and while the proud and foolish gloried in their little distinctions, the wise would lament, that the union had not been formed before.`],
      ['q', ` Wherefore, the present time is the true time for establishing it.`],
      ['d', ` The intimacy which is contracted in infancy, and the friendship which is formed in misfortune, are, of all others, the most lasting and unalterable.`]
    ]],
    plain: {
      q: `Kids learn good habits when they are young. Paine says countries do too. If America waits, the colonies will grow apart. So now is the time to unite.`,
      c: `Paine says young people form good habits more easily, and young nations do too. If America waits 50 years, the colonies will have different interests and will fight each other. They might not need each other anymore. So now is the right time to form one government.`,
      f: `Just as young people build good habits most easily, Paine says, young nations do too. In fifty years, growing trade and population would give each colony different interests, and colony would turn against colony. Each might think it could stand alone, and proud people would brag about small differences while wise people regretted not uniting sooner. Friendships formed young, and in hard times, last the longest, so now is the moment.`,
      d: `Paine argues that national unity is a matter of timing. Drawing an analogy between personal and national development, he predicts that delay will let regional economic interests harden into rivalries until union becomes impossible. His observation that bonds formed "in misfortune" endure longest reframes the war itself as an opportunity: shared suffering could forge a national identity. His fear of "colony against colony" proved prophetic, from the weak Articles of Confederation to the sectional crisis that ended in civil war.`
    },
    note: `Paine's warning came partly true. After independence, the states argued so much under the Articles of Confederation that leaders wrote a new Constitution. Later in this course, you will see sections of the country split apart in the Civil War. "Colony would be against colony" turned out to be a real danger.`,
    ask: { all: `Why does Paine think the colonies must unite now instead of later? Was he right?`,
           q: `Paine says now is the time to unite. Why not wait?` },
    frame: `Kids learn good ______ when they are young. Paine says if America ______, the colonies will grow ______.`,
    bank: ['habits', 'waits', 'apart', 'rich'],
    st: { c: `Paine thinks America should unite now because…`, f: `Paine compares a young nation to a young person to show…`, d: `Paine's prediction about "colony against colony" proved…` },
    further: `Paine says friendships "formed in misfortune" last the longest. Do you agree? Use an example from history or your own life.`
  },
  {
    id: 'putting-off', sec: 's4', min: 'f', title: 'Putting It Off',
    orig: [[
      ['f', `These proceedings may at first appear strange and difficult; but, like all other steps which we have already passed over, will in a little time become familiar and agreeable;`],
      ['q', ` and, until an independance is declared, the Continent will feel itself like a man who continues putting off some unpleasant business from day to day, yet knows it must be done, hates to set about it, wishes it over, and is continually haunted with the thoughts of its necessity.`]
    ]],
    plain: {
      q: `Do you ever put off a hard job? You know you must do it. You keep thinking about it. Paine says America feels like that. It must declare independence and get it done.`,
      c: `Paine says declaring independence may seem strange and hard at first, but it will soon feel normal. Until America does it, the colonies will feel like a person putting off a job they hate. They know it must be done. They wish it were over. They cannot stop thinking about it.`,
      f: `Paine ends Part IV by admitting that independence may seem strange and difficult at first, but says it will soon feel normal, just like earlier steps did. Until it is declared, America will feel like someone putting off an unpleasant task day after day. They know it has to happen, they dread starting, they wish it were finished, and the thought never stops bothering them.`,
      d: `Paine closes Part IV with a strikingly ordinary image: the procrastinator who knows a task is unavoidable yet keeps postponing it. After pages of constitutional theory and naval statistics, he lands on a feeling every reader recognizes. The comparison reframes independence not as a reckless leap but as an overdue obligation, and it quietly suggests that the anxiety of delay is worse than the act itself. Within six months, Congress would declare independence.`
    },
    note: `Paine ends Part IV with something everyone knows: putting off a job you dread. After all his big arguments, he makes independence feel like homework you just need to finish. Also notice the old spelling, "independance." Spelling was not standardized yet in 1776.`,
    ask: { all: `Paine compares America to someone putting off an unpleasant job. Why is that a smart comparison for him to end with?`,
           q: `Paine says America is like a person putting off a hard job. What is the job?` },
    frame: `The hard job is declaring ______. America knows it must be ______, but it keeps putting it ______.`,
    bank: ['independence', 'done', 'off', 'war'],
    st: { c: `Paine's comparison works because…`, f: `Ending with an everyday feeling helps Paine…`, d: `Paine's procrastination analogy reframes independence as…` },
    further: `Write your own comparison for how the colonies felt in early 1776. Start with: "America is like…"`
  },

  /* ------------------------------------------------------------ Appendix */
  {
    id: 'begin-again', sec: 'app', min: 'f', title: 'Begin the World Over Again',
    orig: [[
      ['d', `We ought to reflect, that there are three different ways, by which an independancy may hereafter be effected; and that one of those three, will one day or other, be the fate of America, viz. By the legal voice of the people in Congress; by a military power; or by a mob: …`],
      ['f', ` Should an independancy be brought about by the first of those means, we have every opportunity and every encouragement before us, to form the noblest purest constitution on the face of the earth.`],
      ['q', ` We have it in our power to begin the world over again.`],
      ['c', ` A situation, similar to the present, hath not happened since the days of Noah until now. The birthday of a new world is at hand,`],
      ['f', ` and a race of men, perhaps as numerous as all Europe contains, are to receive their portion of freedom from the event of a few months.`]
    ]],
    plain: {
      q: `Paine says America has a big chance. It can start fresh. It can make a new and fair government. He says it is like a new world being born.`,
      c: `Paine says America has an amazing chance to start fresh. If the people choose independence through Congress, they can create the best government on earth. Nothing like this has happened since Noah, when the world started over after the flood. A new world is about to be born.`,
      f: `Paine says independence could happen in three ways: by the people's vote in Congress, by an army, or by a mob. If it comes the first way, Americans could write the best constitution on earth. "We have it in our power to begin the world over again," he says. Nothing like this has happened since Noah. A new world is about to be born, and what Americans do in the next few months will shape the freedom of a future people as large as all of Europe.`,
      d: `In the Appendix, Paine presents independence as a choice about method as well as outcome: it will come eventually through lawful representation, military force, or mob violence, and only the first offers a chance to build "the noblest purest constitution on the face of the earth." His comparison to Noah casts 1776 as a second creation. The line "we have it in our power to begin the world over again" became one of the most quoted in American history, a promise of radical renewal that later reformers would hold the nation to.`
    },
    note: `This line is quoted by presidents and protesters alike. Paine is not just saying "leave Britain." He is saying Americans can design a brand new kind of government. Notice that he warns it must be done the right way, through Congress, not through an army or a mob.`,
    ask: { all: `What does Paine mean by "begin the world over again"? What would you want a brand new country to get right?`,
           q: `Paine says, "We have it in our power to begin the world over again." What does he mean?` },
    frame: `Paine says America can ______ over again. They can make a new and ______ government. If I made a new country, I would make sure ______.`,
    bank: ['start', 'fair', 'everyone', 'king'],
    st: { c: `"Begin the world over again" means…`, f: `Paine wants independence to come through Congress because…`, d: `Paine's vision of a new beginning has been used by later Americans to…` },
    further: `Paine lists three ways independence could happen. Why does he fear the army and the mob? Has history shown his fear was reasonable?`
  }
  ],

  /* ------------------------------------------------------------ vocabulary
     [pattern, definition]. The pattern is matched as whole words, ignoring case,
     and only its first appearance in each passage gets a pop-up. Longer phrases
     are matched before the single words inside them. Written at about grade 5. */
  vocab: [
    ["natural rights?", "Rights every person is born with, like life and liberty. No ruler gives them, so no ruler can take them."],
    ["necessary evil", "Something bad that we still need."],
    ["hereditary succession|hereditary right", "Passing the crown from a ruler to his or her children."],
    ["hereditary", "Passed down from parent to child."],
    ["badge of lost innocence", "A sign that people are no longer pure and good."],
    ["bowers of paradise", "Shady garden spots in the Garden of Eden, from the Bible."],
    ["State-House", "A building where a colony's government meets."],
    ["political physician", "Paine's joke: a politician acting like a doctor who wants to cure the country."],
    ["absolute governments", "Governments where one ruler has total power."],
    ["William the Conqueror", "A duke from Normandy, in France, who invaded England in 1066 and made himself king."],
    ["set it together by the ears", "Make people fight and argue."],
    ["give away places", "Hand out government jobs to friends and supporters."],
    ["habitable globe", "All the parts of the earth where people can live."],
    ["seed time", "Planting season. The time when things begin."],
    ["primary planet", "The planet that a moon circles around."],
    ["Royal Brute of Britain", "Paine's insult for King George III."],
    ["passive tempers", "People who go along and avoid conflict."],
    ["fire and sword", "War and destruction."],
    ["half a century hence", "Fifty years from now."],
    ["parent country|mother country", "A name for Britain, as if it were the colonies' parent."],
    ["man of war", "A warship."],
    ["'Tis", "It is."],
    ["hath", "Has."],
    ["doth", "Does."],
    ["ye", "You (when talking to a group)."],
    ["tho'", "Though."],
    ["viz\\.", "Namely; that is."],
    ["thereon", "On it."],
    ["hither", "To here."],
    ["society", "People living and working together in a community."],
    ["confounded", "Mixed up; confused one thing with another."],
    ["wants", "Needs."],
    ["wickedness", "Bad or evil behavior."],
    ["vices", "Bad habits or wrong actions."],
    ["intercourse", "Here it means social contact: people meeting and dealing with each other."],
    ["patron", "A supporter who helps."],
    ["intolerable", "Too bad to put up with."],
    ["calamity", "A disaster; great trouble."],
    ["conscience", "Your inner sense of right and wrong."],
    ["lawgiver", "Someone who makes the laws."],
    ["assemble", "Gather together."],
    ["deliberate", "Think and talk carefully before deciding."],
    ["disesteem", "Being looked down on by your neighbors."],
    ["parliament", "A group of lawmakers. In Britain, Parliament makes the laws."],
    ["habitations", "Homes."],
    ["legislative", "Having to do with making laws."],
    ["prudence|prudent", "Good sense; careful thinking."],
    ["propriety", "What is right or fitting."],
    ["electors", "Voters."],
    ["fidelity", "Loyalty; faithfulness."],
    ["maxim", "A short rule or saying."],
    ["constitution", "The basic plan and rules of a government."],
    ["remedy", "A cure or fix."],
    ["monarchy", "Government by a king or queen."],
    ["degradation", "Being lowered or made worse."],
    ["imposition", "An unfair burden forced on someone."],
    ["posterity", "People in the future; later generations."],
    ["perpetual|perpetually", "Lasting forever."],
    ["cotemporaries", "Old spelling of contemporaries: people living at the same time."],
    ["descendants", "Children, grandchildren, and so on."],
    ["folly", "Foolishness."],
    ["ridicule", "Mocking; making fun of."],
    ["ass", "A donkey. It was also a word for a fool."],
    ["antiquity", "Ancient times; the far past."],
    ["ruffian", "A violent, rough person; a thug."],
    ["subtility", "Sneaky cleverness."],
    ["plunderers", "People who rob by force."],
    ["depredations", "Attacks and robberies."],
    ["contributions", "Payments."],
    ["divinity", "Holiness; coming from God."],
    ["impoverish", "Make poor."],
    ["sterling", "British money, counted in pounds sterling."],
    ["province", "A colony or region."],
    ["continent", "A huge area of land. Paine means all the colonies together."],
    ["fracture", "A crack or break."],
    ["rind", "Bark; the outer skin of a tree."],
    ["characters", "Letters, like the letters in a word."],
    ["asserted", "Claimed."],
    ["flourished", "Grew and did well."],
    ["connexion", "Old spelling of connection."],
    ["fallacious", "Based on a false idea; misleading."],
    ["thrived", "Grew healthy and strong."],
    ["precedent", "An example that sets the rule for later."],
    ["engrossed", "Took over completely; controlled."],
    ["dominion", "Control or rule over land."],
    ["Turkey", "The Ottoman Empire, far from Britain. Paine means Britain would defend any place that helped its trade and power."],
    ["brutes", "Animals."],
    ["savages", "An insulting word people used for Native Americans."],
    ["reproach", "Shame; blame."],
    ["jesuitically", "Sneakily. An insult toward Catholics (Jesuits are Catholic priests)."],
    ["parasites", "People who live off others."],
    ["papistical", "An insulting word for Catholic."],
    ["credulous", "Too quick to believe things."],
    ["asylum", "A safe place; a refuge."],
    ["persecuted", "Treated cruelly because of who they are or what they believe."],
    ["emigrants", "People who leave their home country."],
    ["tyranny", "Cruel, unfair rule."],
    ["tyrant", "A cruel ruler with total power."],
    ["reconciliation", "Making up and becoming friends again."],
    ["pleads", "Begs; argues strongly."],
    ["separation", "Breaking apart. Here, America leaving Britain."],
    ["slain", "People who were killed."],
    ["Almighty", "God."],
    ["intricate", "Complicated."],
    ["petition", "A written request to a ruler."],
    ["satellite", "A smaller body that circles a bigger one, like a moon."],
    ["absurd", "Ridiculous; makes no sense."],
    ["touchstone", "A test of whether something is real or true."],
    ["doctrine", "A belief or set of ideas."],
    ["destitute", "Having nothing; very poor."],
    ["sycophant", "A suck-up; someone who flatters powerful people."],
    ["havoc", "Destruction."],
    ["charter", "A written plan that sets up a government, like a constitution."],
    ["demolished", "Destroyed."],
    ["oppression", "Cruel and unfair treatment."],
    ["fugitive", "Someone running away. Here, freedom is the runaway."],
    ["expelled", "Forced out."],
    ["repel", "Push back."],
    ["disciplined", "Trained and orderly."],
    ["fleet", "A group of warships; a navy."],
    ["cordage", "Rope, used on ships."],
    ["manufactory", "An old word for factory."],
    ["scorn", "Look down on."],
    ["lament", "Feel sad about."],
    ["intimacy", "Close friendship."],
    ["unalterable", "Unable to be changed."],
    ["independance|independancy", "Old spelling of independence."],
    ["effected", "Brought about; made to happen."],
    ["Congress", "The Continental Congress, where leaders from the colonies met."],
    ["mob", "An angry, out-of-control crowd."],
    ["Noah", "In the Bible, Noah survived a great flood, and the world started over."],
    ["extirpating", "Wiping out completely."],
    ["desolate", "Empty and ruined."],
    ["circumstances", "Events or situations."],
    ["universal", "True everywhere, for everyone."],
    ["haunted", "Bothered by a thought that keeps coming back."]
  ],

  /* ------------------------------------------------------------ end of the reading */
  reflect: [
    { id: 'r1',
      ask: { all: `Which passage was the most convincing to you, and why? Use at least one word or phrase from Paine's original words.`,
             q: `Which part did you like best? Why?` },
      frame: `The part I liked best was "______." I liked it because ______.`,
      bank: ['strong', 'funny', 'true', 'fair'],
      st: { c: `The most convincing passage was… because…`, f: `Paine is most convincing when he writes "…" because…`, d: `Paine's most effective passage is "…," which works because…` } },
    { id: 'r2',
      ask: { all: `Imagine you live in the colonies in 1776. Would Common Sense change your mind about breaking away from Britain? Explain.`,
             q: `If you lived in 1776, would Paine make you want to leave Britain? Why or why not?` },
      frame: `If I lived in 1776, Paine ______ make me want to leave Britain. One reason is ______.`,
      bank: ['would', 'would not', 'kings', 'freedom'],
      st: { c: `If I lived in 1776, I would… because…`, f: `Common Sense would (or would not) change my mind because…`, d: `A colonist in 1776 might be persuaded by… but might resist because…` } }
  ],

  extensions: [
    { id: 'x-post', title: 'Paine in a Post',
      task: `Rewrite one passage as a thread of three short social media posts in your own words. Keep Paine's main idea, and make it sound like something people would share today.`,
      qtask: `Pick one passage. Write it as 3 short posts in your own words.` },
    { id: 'x-loyalist', title: 'The Loyalist Writes Back',
      task: `Not everyone agreed with Paine. In 1776 a Loyalist named James Chalmers answered him in a pamphlet called Plain Truth. Write a short reply from a Loyalist who disagrees with one of Paine's arguments. Name the argument, then answer it.`,
      qtask: `Some colonists wanted to stay with Britain. Write 3 or 4 sentences from one of them, answering Paine.` },
    { id: 'x-now', title: 'Then and Now',
      task: `Paine wrote that "the law is king": rules apply to everyone, even leaders. Find an example from today (school, sports, or government) where a rule was applied to someone powerful. Explain how it connects to Paine.`,
      qtask: `Paine said nobody is above the law. Give one example from today where a rule applies to everyone, even leaders.` },
    { id: 'x-cover', title: 'A New Cover for Teens',
      task: `Design a new cover for Common Sense aimed at teens today. Describe your title, a one-line hook, and the picture you would use, then explain why each choice fits Paine's message. You can also draw it on paper and turn it in.`,
      qtask: `Make a new cover for Common Sense for kids today. Write your title and describe your picture. You can draw it on paper too.` }
  ]
};
