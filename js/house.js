// «Диктато: Вакуум власти». Сектор 03 — феодальный дом на пустынной планете (пародия на эпос о песках и приправе).
// Игрок выбирает дом: благородный, тиранический или дом интриганов. Под показателями — строка ценностей дома.
// Вкладка «Планета Сушь»: голограмма, приправа и квота Трона, кочевники, дома-соперники, война с приказами на фронте.
// Вкладка «Трон»: милость и подозрения императора, заговор. Цель — занять трон самому.
const SUSH = 'sush';

// ---------- дома и прочие силы ----------
const HOUSES = {
  hverdan: { name: 'Дом Вердан', short: 'Вердан', core: 'noble', col: '#4a7a5a', motto: 'Слово дороже воды', flag: `<rect width="30" height="20" fill="#1f3a2a"/><path d="M15 3 L24 8 L21 17 L9 17 L6 8 Z" fill="none" stroke="#d9c07a" stroke-width="1.4"/><circle cx="15" cy="11" r="2.4" fill="#d9c07a"/>` },
  hgargon: { name: 'Дом Гаргон', short: 'Гаргон', core: 'ruth', col: '#8a3a2a', motto: 'Что взято, то наше', flag: `<rect width="30" height="20" fill="#2a1210"/><path d="M6 15 L10 5 L15 12 L20 5 L24 15 Z" fill="#b8452a"/><rect x="6" y="15.6" width="18" height="1.6" fill="#d9c07a"/>` },
  hmiral: { name: 'Дом Мираль', short: 'Мираль', core: 'schem', col: '#5a4a8a', motto: 'Улыбайся и считай', flag: `<rect width="30" height="20" fill="#221d38"/><path d="M5 10 Q15 2 25 10 Q15 18 5 10 Z" fill="none" stroke="#d9c07a" stroke-width="1.3"/><circle cx="15" cy="10" r="2.6" fill="#8a7ac8"/>` },
};
Object.assign(FLAGS, {
  sush: `<rect width="30" height="20" fill="#3a2a1a"/><circle cx="15" cy="10" r="6" fill="#c98a2a"/><path d="M9.4 9 Q15 6.5 20.6 9 M9.4 11.6 Q15 14 20.6 11.6" fill="none" stroke="#3a2a1a" stroke-width="0.9"/>`,
  throne: `<rect width="30" height="20" fill="#3a2a10"/><path d="M8 15 L8 8 L11.5 11 L15 5 L18.5 11 L22 8 L22 15 Z" fill="#d9c07a"/><rect x="8" y="15.6" width="14" height="1.6" fill="#d9c07a"/>`,
  guild: `<rect width="30" height="20" fill="#16201c"/><ellipse cx="15" cy="10" rx="10" ry="4" fill="none" stroke="#c98a2a" stroke-width="1.2"/><circle cx="15" cy="10" r="2.2" fill="#c98a2a"/>`,
  order: `<rect width="30" height="20" fill="#1a1a1e"/><path d="M15 4 L20 10 L15 16 L10 10 Z" fill="none" stroke="#cfc6b0" stroke-width="1.3"/><path d="M15 7.5 V12.5" stroke="#cfc6b0" stroke-width="1.3"/>`,
});
for (const [k, h] of Object.entries(HOUSES)) { FLAGS[k] = h.flag; COUNTRIES[k] = { name: h.name, bloc: 'east', flag: k, leaders: [[9999, { hverdan: 'герцог Леонт Вердан, человек слова', hgargon: 'барон Вальдемар Гаргон, человек дела', hmiral: 'графиня Изабо Мираль, человек намёка' }[k]]] }; COUNTRY_CASES[k] = [`дома ${h.short}`, `домом ${h.short}`, `к дому ${h.short}`]; BLOCR[k] = 'east'; }
Object.assign(COUNTRIES, {
  throne: { name: 'Золотой Трон', bloc: 'west', flag: 'throne', leaders: [[9999, 'падишах-автократор Саддам-Эль-Корвин IX']] },
  guild: { name: 'Гильдия Перевозчиков', bloc: 'neutral', flag: 'guild', leaders: [[9999, 'Перевозчик третьей ступени (плавает в баке, просит не стучать)']] },
  order: { name: 'Орден Наставниц', bloc: 'neutral', flag: 'order', leaders: [[9999, 'Преподобная Мать-Экзаменатор']] },
});
Object.assign(COUNTRY_CASES, { throne: ['Трона', 'Троном', 'к Трону'], guild: ['Гильдии', 'Гильдией', 'в Гильдию'], order: ['Ордена', 'Орденом', 'в Орден'] });
Object.assign(BLOCR, { throne: 'west', guild: 'neutral', order: 'neutral' });
const VAL = { noble: ['Благородство', '⚖️', 'Слово, честь, милость. Подданные и кочевники верят вам; казна худеет.'], ruth: ['Беспринципность', '🗡️', 'Сила, страх, выгода. Добыча растёт; подданные и кочевники вас ненавидят.'], schem: ['Интриганство', '🕸️', 'Намёки, долги, яды. Соперники слабеют; Трон и ваши же люди вам не верят.'] };

// ---------- облик ----------
const LH = o => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', beard: 'none', medals: 0, sash: '', cigar: false, tie: 'none', hat: 'none', ...o });
const HS_UNI = (color, extra = {}) => ({ outfit: 'uniform48', outfitColor: color, ...extra });

Object.assign(REGIME_TYPES, {
  hverdan: { name: 'Дом Вердан: благородный', icon: '⚖️', desc: 'Старый дом, честный до неудобства. Девиз «Слово дороже воды» вышит на всём, включая салфетки. Вас любят подданные и младшие дома. Трон вас любит меньше: слишком уж вы всем нравитесь.', fx: { support: 8, treasury: -10 }, fac: { left: { a: 10 }, oligarchs: { a: 6 }, new: { a: -8 } }, rel: { throne: -6, order: 4 } },
  hgargon: { name: 'Дом Гаргон: тиранический', icon: '🗡️', desc: 'Дом, который берёт. Барон летает над полом на подвесах, потому что ходить считает унизительным. Гвардия сыта, казна полна, подданные молчат. Кочевники помнят ваш дом и точат ножи.', fx: { army: 10, fear: 14, treasury: 15, support: -8 }, fac: { hawks: { a: 12 }, left: { a: -12 }, faith: { a: -6 } }, rel: { throne: 6, guild: 4 } },
  hmiral: { name: 'Дом Мираль: интриганы', icon: '🕸️', desc: 'Дом, о котором никто не может сказать ничего плохого. Вслух. У вас нет врагов: есть должники. Счётчики и Орден вам благоволят, гвардия слабовата, а Трон на всякий случай пробует вашу еду на слугах.', fx: { economy: 5, army: -6 }, fac: { liberals: { a: 10 }, faith: { a: 8 }, hawks: { a: -8 } }, rel: { guild: 8, order: 8, throne: -2 } },
});
Object.assign(DEFAULT_PILLARS, { hverdan: ['left', 'oligarchs'], hgargon: ['hawks', 'new'], hmiral: ['liberals', 'faith'] });
REGIME_TITLES[SUSH] = { hverdan: 'Герцог', hgargon: 'Барон', hmiral: 'Граф' };
REGION_TITLES[SUSH] = ['Герцог', 'Барон', 'Граф', 'Наместник Суши'];
Object.assign(TITLE_FORMS, { 'Герцог': ['Герцога', 'Герцогом'], 'Барон': ['Барона', 'Бароном'], 'Граф': ['Графа', 'Графом'], 'Наместник Суши': ['Наместника Суши', 'Наместником Суши'] });
REGIME_SETUP_LOOK[SUSH] = {
  hverdan: LH({ face: 'oval', hair: 'short', hairColor: '#2a2a2a', beard: 'goatee', eyeGlow: '', ...HS_UNI('#1f3a2a') }),
  hgargon: LH({ face: 'round', hair: 'bald', hairColor: '#b84a2a', brows: 'angry', mouth: 'grin', eyeGlow: '', outfit: 'mantle', outfitColor: '#2a1210', trim: '#b8452a' }),
  hmiral: LH({ face: 'long', hair: 'slick', hairColor: '#e8e2c0', mustache: 'pencil', mouth: 'smirk', glasses: 'monocle', eyeGlow: '', ...HS_UNI('#221d38') }),
};
for (const k of Object.keys(HOUSES)) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[SUSH][k], bluetooth: false };
const HS_NAMES = { hverdan: 'Леонт Вердан', hgargon: 'Вальдемар Гаргон', hmiral: 'Арман Мираль' };
function houseSetupLook(st, key) { if (st.look.hat === 'hood') st.look.hatColor = st.look.outfitColor; if (key === 'outfit') st.look.outfitColor = { uniform48: HOUSES[st.regime] ? { hverdan: '#1f3a2a', hgargon: '#2a1210', hmiral: '#221d38' }[st.regime] : '#1f3a2a', mantle: '#2a1210', plate: '#3a3d44' }[st.look.outfit]; }

NAME_POOLS.sush = { m: ['Дункар', 'Турфин', 'Гурвен', 'Питрий', 'Раббан', 'Юэн', 'Стилар', 'Корин', 'Хават', 'Фейд'], f: ['Алия', 'Чана', 'Ирула'], last: ['Халь', 'Нефуд', 'Аракс', 'Кайн', 'Мапес', 'Тувек', 'Рамалло', 'Фенрик', 'Отейм', 'Харра'] };
RELATIVES_BY_STYLE.sush = { defense: 'Племянник Раббан', economy: 'Кузен Питрий', police: 'Тётка Ирула', propaganda: 'Шурин Гурвен', foreign: 'Зять Фейд' };
REGIONS[SUSH] = {
  name: 'Планета Сушь', short: 'Сушь',
  blurb: 'Песок, ветер и приправа. Без приправы не летают корабли Гильдии, не видят будущего провидцы и несъедобна столичная кухня. Тот, кто держит Сушь, кормит Империю. Тот, кто перестаёт кормить, недолго держит Сушь.',
  country: 'Лен планеты Сушь', capital: 'Каррак', currency: 'солар',
  exports: 'приправа', exportGen: 'приправы', company: 'Имперская приправная палата', patron: 'throne',
  sport: 'бои на коротких клинках', rival: 'соседний дом', rivalShort: 'соперники',
  disputed: 'Южная Пустошь', faithLeader: 'Наставница', capitalSquare: 'площади Трёх Цистерн',
  jungle: 'глубокой пустыне', nephew: 'Раббан',
  countries: ['throne', 'guild', 'order', 'hgargon', 'hmiral'],
  relInit: { throne: 55, guild: 50, order: 50, hverdan: 35, hgargon: 30, hmiral: 40 },
  flag: FLAGS.sush,
  leaderSkin: 'light', era: 'house', style: 'sush', faithStyle: 'order', exile: 'каюте третьего класса на грузовике Гильдии', critters: 'песчаных червей',
  factions: {
    left: { name: 'Водоносы и чернь', short: 'Чернь', icon: '💧', desc: 'Горожане Каррака. Живут от цистерны до цистерны. Про каждого нового владыку говорят «этот хоть воду не отберёт» и каждый раз удивляются.' },
    liberals: { name: 'Счётчики', short: 'Счётчики', icon: '🧮', desc: 'Люди, обученные считать вместо машин: машины в Империи запрещены, а считать кому-то надо. Преданы тому, чьи расчёты сходятся.' },
    faith: { name: 'Орден Наставниц', short: 'Орден', icon: '🕯️', desc: 'Воспитывают жён, матерей и наследников для всех великих домов сразу. Ведут план на девяносто поколений вперёд. Вы в нём — сноска.' },
    oligarchs: { name: 'Младшие дома', short: 'Вассалы', icon: '🏺', desc: 'Сорок мелких домов, присягнувших вам вместе с планетой. Присягали они и прежнему владыке, и тому, что был до него.' },
    hawks: { name: 'Гвардия дома', short: 'Гвардия', icon: '⚔️', desc: 'Ваши собственные клинки. Защитные поля, короткие мечи и долгая память о том, вовремя ли платили.' },
  },
  advisors: {
    defense: { name: 'Мастер меча Дункар Халь', bio: 'Лучший клинок дома. Погибал за него дважды. Оба раза вернулся и попросил прибавку.', look: LH({ skin: SKIN.tan, face: 'square', hair: 'curly', hairColor: '#1a1a1a', brows: 'angry', ...HS_UNI('#2a2d33') }) },
    economy: { name: 'Счётчик Турфин Хават', bio: 'Считает добычу в уме. Губы красные от сока, которым смазывают мозги. Ошибся один раз, в 201 году, и помнит.', look: LH({ face: 'long', hair: 'bald', hairColor: '#999', brows: 'bushy', mouth: 'flat', blush: true, outfit: 'robe', outfitColor: '#22202a', trim: '#8a3a2a' }) },
    police: { name: 'Мастер тайн Питрий Кайн', bio: 'Знает сорок ядов и к каждому противоядие. Противоядия держит при себе.', look: LH({ face: 'long', hair: 'slick', hairColor: '#1a1a1a', mustache: 'pencil', mouth: 'smirk', outfit: 'robe', outfitColor: '#1a1a1e', trim: '#5a4a8a' }) },
    propaganda: { name: 'Бард-оруженосец Гурвен', bio: 'Воин и певец. Сочинил о вашем доме сорок баллад. В каждой кто-нибудь гибнет под дождём, которого здесь не бывает.', look: LH({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#8a5a2a', mustache: 'thick', beard: 'goatee', ...HS_UNI('#3a2a1a') }) },
    foreign: { name: 'Посол Корин Фенрик', bio: 'Представляет дом при Золотом Троне. Говорит мало, мычит многозначительно. При дворе его мычание записывают.', look: LH({ face: 'oval', hair: 'slick', hairColor: '#5a4a3a', glasses: 'monocle', mouth: 'smirk', outfit: 'mantle', outfitColor: '#3a2a10', trim: '#d9c07a' }) },
  },
};
REGION_TALK[SUSH] = { addr: 'милорд', sir: 'сударь', lady: 'сударыня', holiday_acc: 'День Первой Воды', holiday_dat: 'Дню Первой Воды', gringo: 'иномиряне', haven: 'счёт в Гильдии', exileTo: 'любой мир, куда возьмёт Гильдия', canteen: 'лепёшка с приправой', fruit_adj: 'Песчаный', locale: 'Суши', pay_in_kind: 'Водой.', vegas: 'покои с собственной цистерной', rebel: 'Старшина водоносов', meeting: 'в зале с гобеленами' };
FAITH_TALK.order = { priest_open: 'Дитя... Простите, {addr}.', heavens: 'плану Ордена', faith_quip: 'Мы растили ваш род девять поколений. Не заставляйте нас начинать заново.', sermon: 'наставления', faith_appeal: 'Орден запомнит. Орден всё запоминает.', temple_loc: 'в покоях Наставниц', righteous: 'Орден называет вас «перспективным»' };
FAITH_TITLE.order = 'Наставница';
PAPERS[SUSH] = ['Каррацкий глашатай', 'шёпот у цистерн'];
LEADER_STYLE[SUSH] = {
  left: { title: 'Старшина водоносов', look: { outfit: 'robe', outfitColor: '#6a5a3a', trim: '#4a3a2a', hat: 'hood', hatColor: '#6a5a3a', glasses: 'none', medals: 0, sash: '' } },
  liberals: { title: 'Старший счётчик', look: { outfit: 'robe', outfitColor: '#22202a', trim: '#8a3a2a', hat: 'none', glasses: 'none', medals: 0, sash: '' } },
  faith: { title: 'Наставница', look: { outfit: 'robe', outfitColor: '#1a1a1e', trim: '#cfc6b0', hat: 'hood', hatColor: '#1a1a1e', glasses: 'none', medals: 0, sash: '' } },
  oligarchs: { title: 'Глава младшего дома', look: HS_UNI('#3a2a1a', { hat: 'none', glasses: 'monocle', medals: 0, sash: '' }) },
  hawks: { male: true, title: 'Капитан гвардии', look: HS_UNI('#2a2d33', { hat: 'none', glasses: 'none', medals: 2, sash: '' }) },
  new: { title: 'Старшина контрабандистов', look: { outfit: 'robe', outfitColor: '#4a3a2a', trim: '#c98a2a', hat: 'hood', hatColor: '#4a3a2a', glasses: 'none', medals: 0, sash: '' } },
};
NEW_FACTIONS[HOUSE] = { name: 'Контрабандисты', short: 'Контрабанда', icon: '📦', desc: 'Возят приправу мимо квоты, мимо Трона и мимо вас. Платят всем понемногу и поэтому существуют при любом доме.', rivals: ['liberals', 'hawks'], risk: 'rev', appear: () => true, intro: 'Контрабандисты прислали ящик приправы «на новоселье». Ящик не числится ни в одной ведомости. Как и они сами.', grow: () => 0 };
// у каждого дома свой ближний круг (у Вердана — тот, что записан в самой планете)
const hsLook = (role, o) => ({ ...REGIONS[SUSH].advisors[role].look, ...o });
const HOUSE_ADV = {
  hverdan: { police: { name: 'Мастер тайн Юэн Отейм', bio: 'Домашний лекарь, которому поручили ещё и тайны. Клялся не вредить. Клятву толкует всё шире.', look: hsLook('police', { mustache: 'thick', mouth: 'flat', hairColor: '#5a4a3a', brows: 'worried', trim: '#4a7a5a' }) } },
  hgargon: {
    defense: { name: 'Зверь Раббан Тувек', bio: 'Племянник барона. Любую задачу решает одним способом. Способ не меняется; задачи кончаются.', look: hsLook('defense', { skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#b84a2a', mustache: 'none', mouth: 'grin', outfit: 'plate', steel: '#3a2a26' }) },
    economy: { name: 'Счётчик Питрий Мапес', bio: 'Искривлённый счётчик: считает то, что другим считать стыдно. Смеётся невпопад и вовремя.', look: hsLook('economy', { face: 'round', hair: 'curly', hairColor: '#8a3a1a', mouth: 'grin', brows: 'angry', trim: '#b8452a' }) },
    police: { name: 'Капитан подвалов Нефуд', bio: 'Глуховат, поэтому криков не слышит. Барон считает это главным достоинством.', look: hsLook('police', { face: 'square', hair: 'bald', mustache: 'none', mouth: 'flat', brows: 'bushy', outfitColor: '#2a1210', trim: '#b8452a' }) },
    propaganda: { name: 'Племянник Фейд Харра', bio: 'Любимец арены. Выходит под музыку и побеждает красиво. Противникам заранее подрезают сухожилия.', look: hsLook('propaganda', { skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#b84a2a', mustache: 'none', beard: 'none', mouth: 'smirk', outfitColor: '#2a1210' }) },
    foreign: { name: 'Посол Отейм Рамалло', bio: 'Возит ко двору подарки барона. Половину довозит. Двор доволен и этой половиной.', look: hsLook('foreign', { face: 'round', hair: 'bald', glasses: 'none', mustache: 'walrus', outfitColor: '#2a1210', trim: '#b8452a' }) },
  },
  hmiral: {
    defense: { name: 'Фехтмейстер Стилар Аракс', bio: 'Дерётся только на дуэлях и только с теми, кому накануне что-то подсыпали. Не проиграл ни разу.', look: hsLook('defense', { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#e8e2c0', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfitColor: '#221d38' }) },
    economy: { name: 'Счётчица Ирула Кайн', bio: 'Ведёт две книги дома. Третью ведёт про тех, кто заглядывал в первые две.', look: hsLook('economy', { face: 'oval', hair: 'bun', hairColor: '#5a4a3a', brows: 'normal', earring: true, trim: '#5a4a8a' }) },
    police: { name: 'Мастер ядов Юэн Фенрик', bio: 'Сорок ядов, сорок противоядий, одна улыбка на все случаи.', look: hsLook('police', { face: 'round', hair: 'combover', hairColor: '#888', mustache: 'none', glasses: 'round', mouth: 'grin' }) },
    propaganda: { name: 'Летописица Алия Харра', bio: 'Пишет хронику дома на год вперёд. Потом дом старается соответствовать.', look: hsLook('propaganda', { skin: SKIN.light, face: 'long', hair: 'long', hairColor: '#1a1a1a', mustache: 'none', beard: 'none', earring: true, mouth: 'smirk', outfit: 'robe', outfitColor: '#221d38', trim: '#d9c07a' }) },
    foreign: { name: 'Посол Хават Нефуд', bio: 'Мычит при дворе так многозначительно, что двор боится переспросить.', look: hsLook('foreign', { face: 'long', hair: 'bald', mustache: 'handlebar', outfitColor: '#221d38', trim: '#8a7ac8' }) },
  },
};
function npcH(key) {
  const M = {
    emperor: { name: 'Падишах-автократор Корвин IX', look: LH({ face: 'long', hair: 'short', hairColor: '#b8b8b8', beard: 'goatee', brows: 'angry', outfit: 'ermine', outfitColor: '#3a2a10', hat: 'crown' }) },
    navigator: { name: 'Перевозчик Гильдии', look: { skin: '#c9b8a0', face: 'round', hair: 'bald', hairColor: '#888', brows: 'none', mouth: 'o', mustache: 'none', beard: 'none', glasses: 'none', eyeGlow: '#c98a2a', outfit: 'robe', outfitColor: '#16201c', trim: '#c98a2a', hat: 'none' } },
    nomad: { name: 'Старейшина кочевников', look: { skin: SKIN.tan, face: 'long', hair: 'long', hairColor: '#3a2a1a', brows: 'bushy', mouth: 'flat', mustache: 'thick', beard: 'full', glasses: 'none', eyeGlow: '#c98a2a', outfit: 'robe', outfitColor: '#5a4a34', trim: '#3a2a1a', hat: 'hood', hatColor: '#5a4a34' } },
    mother: { name: 'Преподобная Мать-Экзаменатор', look: LH({ face: 'long', hair: 'bald', hairColor: '#999', brows: 'angry', outfit: 'robe', outfitColor: '#1a1a1e', trim: '#cfc6b0', hat: 'hood', hatColor: '#1a1a1e' }) },
    rival: { name: 'Глава дома-соперника', look: LH({ face: 'round', hair: 'slick', hairColor: '#333', mustache: 'handlebar', mouth: 'smirk', ...HS_UNI('#2a1210') }) },
    colonel: { name: 'Капитан гвардии', look: LH({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#333', brows: 'angry', ...HS_UNI('#2a2d33') }) },
    rebel: { name: 'Старшина водоносов', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#5a4a3a', brows: 'angry', mouth: 'flat', mustache: 'thick', beard: 'none', glasses: 'none', outfit: 'robe', outfitColor: '#6a5a3a', trim: '#4a3a2a', hat: 'hood', hatColor: '#6a5a3a' } },
  };
  return M[key] || null;
}
const HS_Y = 10191;
ERAS[HOUSE] = { name: 'Век приправы', label: 'Вакуум власти: феодальный дом', start: HS_Y, turns: 40, dark: true, fantasy: true, blurb: 'Империя тысячи миров держится на одной планете. Планету только что пожаловали вам.', regions: [SUSH], regimes: ['hverdan', 'hgargon', 'hmiral'], titles: ['Герцог'], intro: '', aid: [],
  vars: { mast: 'КАРРАЦКИЙ ГЛАШАТАЙ', blame: 'песчаная буря', student_meme: '', swim_ref: '', rebel_icon: 'пустой бурдюк', friendly_paper: 'придворном листке', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' }, defaultNames: { [SUSH]: HS_NAMES.hverdan } };
const HOUSE_SETUP = { world: 'dark', era: HOUSE, region: SUSH, regime: 'hverdan', name: HS_NAMES.hverdan, title: 'Герцог', country: REGIONS[SUSH].country, diff: 'normal', look: { ...REGIME_SETUP_LOOK[SUSH].hverdan } };

// ---------- слова ----------
const ROLES_H = {
  defense: { title: 'Мастер меча', action: 'Смотр гвардии', actionDesc: 'Клинки, поля, строй. Гвардия крепнет и вспоминает, кому служит.' },
  economy: { title: 'Счётчик дома', action: 'Пересчёт добычи', actionDesc: 'Счётчик закрывает глаза и считает. Обычно находит утечку. Иногда — виновного.' },
  police: { title: 'Мастер тайн', action: 'Ночная работа', actionDesc: 'Недовольные просыпаются послушными. Некоторые не просыпаются.' },
  propaganda: { title: 'Бард-оруженосец', action: 'Баллада о доме', actionDesc: 'Новая баллада в каждой харчевне. Под неё хорошо пьётся и плохо бунтуется.' },
  foreign: { title: 'Посол при Троне', action: 'Придворный сезон', actionDesc: 'Приёмы, подарки, многозначительное мычание. Отношения теплеют.' },
};
const ADV_TEXT_H = { defense: 'Смотр прошёл. Гвардия прошла строем. Один новобранец уронил клинок; мастер меча поднял его и вернул. Новобранец поседел.', economy: 'Пересчёт окончен. Найдено сорок мер приправы, которые числились песком.', police: 'Ночная работа сделана. В Карраке тихо. Мастер тайн просит не спрашивать, почему.', propaganda: 'Баллада разошлась. В ней сорок куплетов; харчевни поют первые три, зато громко.', foreign: 'Сезон удался. Посол привёз шесть улыбок, два намёка и счёт от портного.' };
for (const [k, n] of Object.entries({ army: 'Гвардия дома', police: 'Мастера тайн', health: 'Лекари и цистерны', edu: 'Школа счётчиков', subsidy: 'Раздача воды', infra: 'Сборщики и щиты', media: 'Барды и глашатаи', palace: 'Нужды дома', popTax: 'Водяной сбор', corpTax: 'Сбор с младших домов', duty: 'Посадочный сбор' })) {
  const d = [...SLIDERS.spend, ...SLIDERS.tax].find(x => x.k === k);
  d.name = typeof d.name === 'string' ? { def: d.name, house: n } : { ...d.name, house: n };
}
const _eraLookH = Game.eraLook;
Game.eraLook = function () {
  _eraLookH.call(Game);
  if (!isHouse()) return;
  for (const r of Object.keys(ROLES_H)) Object.assign(ROLES[r], ROLES_H[r]);
  Object.assign(STAT_NAMES, { swiss: 'Счёт в Гильдии', economy: 'Хозяйство', army: 'Гвардия', support: 'Подданные' });
  REGIONS[SUSH].countries = ['throne', 'guild', 'order', ...Object.keys(HOUSES).filter(k => k !== S.regime)];
  REGIONS[SUSH].country = `${HOUSES[S.regime].name}, лен планеты Сушь`;
};
const _bankH = Game.bank;
Game.bank = function () { return isHouse() ? { name: 'Счёт в Гильдии', short: 'Счёт', to: 'Гильдию', at: 'в Гильдии', acc: 'ваш счёт в Гильдии', ins: 'счётом в Гильдии', dat: 'счёту в Гильдии' } : _bankH.call(Game); };
const TH = [
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Трон, Гильдия, Орден и два дома-соперника. Каждый из них нужен, чтобы однажды сесть на Трон самому. Пока этого никто не должен понять.'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ближний круг. Верность ниже 25 — и приближённый может продать вас соперникам. Изгнанного заменит родич: предан, но не блещет.'],
  ['Ваши министры. Лояльность ниже 25 — и министр может вас сдать.', 'Ближний круг. Верность ниже 25 — и приближённый может продать вас соперникам.'],
  ['предан, но не слишком умён', 'предан, но не блещет'], ['предан, но не слишком способен', 'предан, но не блещет'],
  ['Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!', 'Казна почти пуста, {addr}. Расчёт показывает: либо меньше тратить, либо больше продавать Гильдии.'],
  ['Офицеры недовольны. Поднимите бюджет армии или устройте парад.', 'Гвардия ропщет. Жалованье, смотр или враг.'],
  ['Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!', 'Чернь ворчит. Вода, праздник, баллада — что-нибудь!'],
  ['Риск переворота', 'Риск измены'], ['Риск революции', 'Риск водяного бунта'],
  ['Казна в минусе! Армии задерживают жалованье, банки требуют проценты.', 'Казна в минусе! Гвардии задерживают жалованье, Гильдия считает проценты.'],
  ['Счёт в Швейцарии', 'Счёт в Гильдии'], ['Нужды дворца', 'Нужды дома'], ['нужды дворца', 'нужды дома'],
  ['пришёл к власти. Режим:', 'принял лен. Дом:'], ['Подарить виллу', 'Пожаловать покои с цистерной'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с сословиями, указы, посольства, поручения ближнему кругу, дела на Суши и при Троне'],
  ['Проекты и указы — на вкладке «Указы».', 'Указы дома — на вкладке «Указы». Приправа, кочевники и соперники — на вкладке «Планета Сушь».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Гвардия ниже 45 и обиженные капитаны — к измене. Подданные ниже 30 — к водяному бунту.'],
  ['Деньги «нужд дворца» уходят на', 'Деньги «нужд дома» уходят на'],
  ['>Новый режим<', '>Новая сила<'], ['★ Оценка историков', '★ Оценка летописцев'],
  ['Ночью во дворце зазвонил телефон', 'Ночью в цитадели погасли щиты'], ['в посольстве недовольны', 'их посол недоволен'],
  ['Сделать лидера министром', 'Ввести главу в ближний круг'], ['министерский пост', 'место в ближнем кругу'], ['Новый министр', 'Новый приближённый'], ['новый министр', 'новый приближённый'], ['Места в правительстве', 'Места при дворе'], ['места в правительстве', 'места при дворе'],
  ['Перевести 15 млн в личный фонд', 'Перевести 15 мер на счёт в Гильдии'], ['Цюрих. На случай, если придётся уходить. Шанс огласки 20%.', 'Гильдия хранит молча. На случай, если с планеты придётся улетать третьим классом. Шанс огласки 20%.'],
  ['получил конверт. Вопросов он не задал.', 'получает шкатулку. Шкатулка проверена на яды и принята.'],
  ['Каждый указ стоит', 'Каждый указ дома стоит'], ['Абсурдные указы', 'Причуды'],
  ['министр', 'приближённый'], ['Министр', 'Приближённый'], ['млн', 'сол.'],
];
const _varsH = Game.vars;
Game.vars = function () { const v = _varsH.call(Game); if (isHouse()) v.addr = 'милорд'; return v; };

// ============================================================
// ДОМ, ПЛАНЕТА, ТРОН
// ============================================================
const NOMAD_POL = [['Договор воды', 'Платите воду, они стерегут пески. Набеги редки, доверие растёт. Стоит 3 сол. в квартал.'], ['Не замечать', 'Вы в городе, они в пустыне. Набеги случаются.'], ['Усмирение', 'Гвардия жжёт стойбища. Добыча растёт, доверие рушится, набегов сперва больше.']];
const WAR_ORD = {
  raid: ['Удар по их добыче', 'шанс от силы гвардии · фронт +8 или −5'], hold: ['Держать добычу', 'фронт +3, приправа в этом квартале цела'], storm: ['Штурм их цитадели', 'нужен фронт от 40 · +20 или −15, гвардия −6'],
  duel: ['Вызвать на поединок чести', 'благородно · +12 или −8'], wells: ['Отравить их колодцы', 'беспринципно · фронт +10, кочевники не простят'], bribe: ['Купить их офицера', 'интрига · −10 сол., фронт +9'],
};
Object.assign(Game, {
  hs() {
    if (!S.hs) {
      const core = HOUSES[S.regime].core, v = { noble: 20, ruth: 20, schem: 20 }; v[core] = 62;
      S.hs = { val: v, spice: 14, harv: 1, pol: core === 'noble' ? 0 : core === 'ruth' ? 2 : 1, trust: core === 'noble' ? 50 : core === 'ruth' ? 12 : 32, nstr: 55, quota: { need: 24, due: 4, missed: 0, paid: 0 }, susp: core === 'noble' ? 28 : 18, war: null, ordAt: {},
        riv: Object.fromEntries(Object.keys(HOUSES).filter(k => k !== S.regime).map(k => [k, { str: 52, out: false }])), strikeAt: 0, hint: 0 };
    }
    return S.hs;
  },
  hsCore() { return HOUSES[S.regime].core; },
  hsTop() { const v = Game.hs().val; return Object.keys(v).sort((a, b) => v[b] - v[a])[0]; },
  hsOutput() { const H = Game.hs(); return Math.round((6 + H.harv * 3 + [0, 0, 2][H.pol] + (H.val.ruth >= 50 ? 1.5 : 0) + Object.values(H.riv).filter(r => r.out).length * 3 - (H.war ? 2 : 0)) * clamp(S.economy / 55, 0.6, 1.3) * 10) / 10; },
  hsRivals() { return Object.keys(Game.hs().riv); },
  hsPillars() {
    const H = Game.hs(), R = Game.hsRivals();
    return [
      ['Гильдия', (S.rel.guild || 0) >= 65, 'отношения с Гильдией от 65: без неё к столице не долететь'],
      ['Меч', S.army >= 75 || H.trust >= 70, 'гвардия от 75 или доверие кочевников от 70'],
      ['Дома', R.some(k => H.riv[k].out || (S.rel[k] || 0) >= 65), 'один из домов-соперников изгнан с планеты или стал союзником (отношения от 65)'],
      ['Приправа', H.spice >= 80, 'запас от 80 мер: кто держит приправу, тот держит Империю за горло'],
      ['Имя', H.val[Game.hsTop()] >= 75, 'главная ценность дома от 75: вас должны либо любить, либо бояться, либо быть вам должны'],
    ];
  },
  hsStrikeChance() { const H = Game.hs(), n = Game.hsPillars().filter(p => p[1]).length; return clamp(0.08 + n * 0.15 - H.susp / 200 + (S.diff === 'easy' ? 0.08 : S.diff === 'hard' ? -0.08 : 0), 0.05, 0.9); },
  hsAct(id, arg) {
    const H = Game.hs(); let fx = {}, text = '', free = false;
    const m = k => { const x = Game.dealInfo('hs:' + k).mult; Game.noteDeal('hs:' + k); return x; };
    if (id === 'pol') { const n = +arg; if (n === H.pol || H.polAt === S.turn) return null; if (!Game.spend()) return null; H.pol = n; H.polAt = S.turn; fx = { hsVal: [{ noble: 4 }, {}, { ruth: 5 }][n], hsTrust: [6, 0, -14][n] }; text = `Политика в пустыне: ${NOMAD_POL[n][0].toLowerCase()}. ${NOMAD_POL[n][1]}`; }
    else if (id === 'water') { if (S.treasury < 6 || !Game.spend()) return null; fx = { treasury: -6, hsTrust: Math.max(2, Math.round(9 * m('water'))), hsVal: { noble: 2 } }; text = 'Караван с водой ушёл в пустыню. Кочевники приняли воду молча. У них молчание — высшая вежливость.'; }
    else if (id === 'elders') { if (!Game.spend()) return null; fx = { hsTrust: Math.max(2, Math.round(6 * m('elders'))), hsVal: { noble: 3 }, fac: { hawks: { a: -2 } } }; text = 'Вы сидели у старейшин на ковре и пили кофе с приправой. Вам показали, как ходить по песку, не привлекая червя. Вы привлекли. Обошлось.'; }
    else if (id === 'purge') { if (!Game.spend()) return null; fx = { hsTrust: -14, hsNomad: -10, fear: 5, army: -2, hsVal: { ruth: 5 }, hsSpice: 3 }; text = 'Гвардия сожгла три стойбища. Сборщики приправы зашли глубже в пески. Ночью в пустыне пели; мастер меча сказал, что это не песня.'; }
    else if (id === 'prophecy') { if (S.treasury < 5 || !Game.spend()) return null; fx = { treasury: -5, hsTrust: Math.max(2, Math.round(8 * m('prophecy'))), hsVal: { schem: 4 }, fac: { faith: { a: 3 } } }; text = 'Орден за малую плату «уточнил» местное пророчество. Теперь в нём упоминается пришелец с вашим цветом глаз. Кочевники пока сверяют.'; }
    else if (id === 'harv') { const c = 10 + H.harv * 6; if (H.harv >= 4 || S.treasury < c || !Game.spend()) return null; H.harv++; fx = { treasury: -c }; text = `Куплен новый сборщик приправы. Он размером с дворец, гремит на всю пустыню и приманивает червей. Таких теперь ${H.harv}.`; }
    else if (id === 'sell') { if (H.spice < 6) return null; free = H.sellAt !== S.turn; if (!free) return null; H.sellAt = S.turn; fx = { hsSpice: -6, treasury: 8, rel: { guild: 2 } }; text = 'Шесть мер приправы проданы Гильдии. Перевозчик поблагодарил пузырями.'; }
    else if (id === 'deliver') { if (H.spice < 5 || H.giftAt === S.turn) return null; H.giftAt = S.turn; fx = { hsSpice: -5, rel: { throne: 4 }, hsSusp: -3 }; text = 'Пять мер приправы отправлены Трону сверх квоты, «в знак преданности». Двор принял. Двор всегда принимает.'; }
    else if (id === 'askwar') { const k = arg, R = H.riv[k]; if (!R || R.out || H.war) return null; const pay = (S.rel.throne || 0) < 55; if ((pay && S.treasury < 15) || !Game.spend()) return null; H.war = { foe: k, front: 0, since: S.turn, by: 'you' }; fx = { ...(pay ? { treasury: -15 } : {}), rel: { [k]: -25, throne: -3 }, hsSusp: 6, fac: { hawks: { a: 6 } } }; text = `Трон дозволил войну домов: ${HOUSES[k].name}. По закону воевать можно клинками и только на этой планете. Император сел смотреть.`; }
    else if (id === 'ord') {
      const W = H.war; if (!W || H.ordAt[arg] === S.turn) return null; const foe = H.riv[W.foe];
      if (arg === 'storm' && W.front < 40) return null; if (arg === 'bribe' && S.treasury < 10) return null; if (!Game.spend()) return null; H.ordAt[arg] = S.turn;
      const p = clamp(0.5 + (S.army - foe.str) / 60 + (H.trust >= 60 ? 0.08 : 0), 0.1, 0.9), win = Math.random() < p;
      if (arg === 'raid') { fx = { hsFront: win ? 8 : -5, army: -1 }; text = win ? 'Их сборщики горят в пустыне. Наш счётчик уже вычел это из их квоты.' : 'Их добычу стерегли. Наши вернулись налегке.'; }
      else if (arg === 'hold') { W.held = S.turn; fx = { hsFront: 3 }; text = 'Гвардия встала вокруг сборщиков. Квартал прошёл без потерь в приправе.'; }
      else if (arg === 'storm') { fx = { hsFront: win ? 20 : -15, army: -6, hsVal: { ruth: 2 } }; text = win ? 'Щиты их цитадели пали. Гвардия вошла во внутренний двор.' : 'Штурм отбит. Их щиты держат; наши клинки зазубрены.'; }
      else if (arg === 'duel') { const w = Math.random() < 0.5 + (S.army - 60) / 200; fx = { hsFront: w ? 12 : -8, hsVal: { noble: 5 }, support: w ? 3 : -1 }; text = w ? 'Мастер меча принял вызов от вашего имени и победил. Их гвардия отошла на шаг: так велит обычай.' : 'Поединок проигран. Обычай велит отойти на шаг. Мы отошли.'; }
      else if (arg === 'wells') { fx = { hsFront: 10, hsVal: { ruth: 7 }, hsTrust: -15, support: -3, fac: { faith: { a: -4 } } }; text = 'Колодцы на их стороне отравлены. На Суши за это не прощают: вода здесь святее крови. Но фронт подвинулся.'; }
      else if (arg === 'bribe') { fx = { treasury: -10, hsFront: 9, hsVal: { schem: 5 } }; text = 'Их капитан получил шкатулку и «не заметил» наш отряд. Заметил ли он её двойное дно, узнаем позже.'; }
      else return null;
    }
    else if (id === 'peace') { const W = H.war; if (!W || S.treasury < 12 || !Game.spend()) return null; H.war = null; fx = { treasury: -12, rel: { throne: -4, [W.foe]: 10 }, fac: { hawks: { a: -6 } } }; text = 'Трон остановил войну по вашей просьбе. За посредничество взято двенадцать соларов и одна улыбка.'; }
    else if (id === 'court') { if (S.treasury < 8 || !Game.spend()) return null; fx = { treasury: -8, hsSusp: -Math.max(2, Math.round(9 * m('court'))), rel: { throne: 3 } }; text = 'Подарки, поклоны, слёзы умиления при виде августейшей особы. Подозрения Трона убавились.'; }
    else if (id === 'whisper') { const k = arg; if (!H.riv[k] || H.riv[k].out || !Game.spend()) return null; fx = { hsRiv: [k, -Math.max(1, Math.round(5 * m('whisper')))], hsVal: { schem: 4 }, hsSusp: 2 }; text = `При дворе пошёл слух: ${HOUSES[k].name} утаивает приправу. Слух пустили не вы. Вы лишь не возражали.`; }
    else if (id === 'pact') { const k = arg; if (!H.riv[k] || H.riv[k].out || S.treasury < 8 || !Game.spend()) return null; fx = { treasury: -8, rel: { [k]: Math.max(2, Math.round(9 * m('pact:' + k))) }, hsVal: { noble: 2 } }; text = `Посольство и дары: ${HOUSES[k].name}. Вас приняли с почестями и проверили на оружие четыре раза.`; }
    else if (id === 'strike') return Game.hsStrike();
    else return null;
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  hsStrike() {
    const H = Game.hs(), n = Game.hsPillars().filter(p => p[1]).length;
    if (S.turn < 24 || n < 3 || H.busy || !Game.spend()) return null;
    H.busy = true;
    (async () => { try { await VN.play(Game.hsStrikeScene()); } finally { H.busy = false; } const end = darkEnd(); if (end) { Game.ending(end); UI.showEnding(); } else { Game.save(); UI.render(); } })();
    return { text: '', changes: [] };
  },
  hsStrikeScene() {
    const H = Game.hs(), p = Game.hsStrikeChance(), top = Game.hsTop();
    const way = { noble: ['Воззвать к Собранию домов', 'Вы вышли перед Собранием и сказали то, что все думали. Дома встали. Гильдия отказалась везти имперскую гвардию. Император подписал отречение собственным пером; перо вы оставили ему.'], ruth: ['Высадиться в столице', 'Гильдия высадила вашу гвардию прямо в дворцовый сад. К утру дворец был ваш. Император спросил, что с ним будет. Вы ответили честно. Он пожалел, что спросил.'], schem: ['Послать императору чашу', 'Император умер в постели, от естественных причин. Причин было три, и все они у вас на жалованье. Собрание домов нашло завещание. Оно удивительно удачно составлено.'] }[top];
    return { title: 'Удар по Трону', bg: 'palace', crisis: true,
      lines: [['foreign', `Пора, {addr}. За нас ${Game.hsPillars().filter(x => x[1]).map(x => x[0].toLowerCase()).join(', ')}. Второго раза не будет: Трон не прощает даже мыслей, а мы уже далеко за мыслями.`], ['police', 'Если сорвётся, наш дом вычеркнут из Книги домов. Вместе со страницей.'], ['npc:navigator', 'Гильдия… видит… два пути. В одном вы… на троне. Во втором… мы вас… не знаем.']],
      choices: [
        { text: way[0], chance: () => p, win: { fx: { end: 'crowned' }, res: way[1] }, lose: { fx: { end: 'fallen' }, res: 'Трон знал. Трон, как выяснилось, знал давно и ждал, пока вы соберёте всех заговорщиков в одном месте. Очень удобно.' } },
        { text: 'Отложить: ещё не время', fx: { hsSusp: 8, fac: { hawks: { a: -4 } } }, res: 'Вы отложили. Заговорщики разошлись. Каждый из них теперь знает слишком много и думает, сколько это стоит.' },
      ] };
  },
  hsQuarter(rep) {
    const H = Game.hs(), v = H.val, core = Game.hsCore();
    // ценности
    if (v.noble >= 50) { S.support = clamp(S.support + 0.5); H.trust = clamp(H.trust + 0.5); S.treasury -= 1; }
    if (v.ruth >= 50) { S.fear = clamp(S.fear + 0.7); S.support = clamp(S.support - 0.4); H.trust = clamp(H.trust - 0.6); }
    if (v.schem >= 50) { for (const r of Object.values(H.riv)) if (!r.out) r.str = clamp(r.str - 0.5); H.susp = clamp(H.susp + 0.3); for (const a of Object.values(S.adv)) a.loy = clamp(a.loy - 0.3); }
    if (Game.hsTop() !== core) { for (const f of DEFAULT_PILLARS[S.regime]) if (S.fac[f]) S.fac[f].a = clamp(S.fac[f].a - 1.2); if (S.turn % 4 === 0) rep.warn.push(`Дом теряет лицо: ${HOUSES[S.regime].name} славился другим. Те, кто служил вам за «${VAL[core][0].toLowerCase()}», в растерянности.`); }
    S.economy = clamp(S.economy + 0.4); // приправа кормит планету
    // кочевники
    if (H.pol === 0) { S.treasury -= 3; H.trust = clamp(H.trust + 1); } else if (H.pol === 2) { H.trust = clamp(H.trust - 1.5); H.nstr = clamp(H.nstr - (S.army >= 65 ? 2 : 0.5)); }
    H.nstr = clamp(H.nstr + 0.5, 10, 100);
    let out = Game.hsOutput(), held = H.war && H.war.held === S.turn;
    const raidP = (H.trust >= 70 ? 0 : [0.06, 0.2, 0.34][H.pol]) * (H.nstr / 55) * (H.trust < 25 ? 1.4 : 1);
    if (!held && Math.random() < raidP) { const loss = Math.min(H.spice + out, Math.round(3 + Math.random() * 4)); out -= loss; S.army = clamp(S.army - 1); rep.warn.push(pick([`Набег кочевников: сборщик приправы сожжён, потеряно мер: ${loss}. Они приходят из песка и уходят в песок.`, `Кочевники увели караван с приправой: ${loss} мер. Гвардия гналась до заката и вернулась без сапог.`])); }
    else if (H.trust >= 70 && Math.random() < 0.3) { const k = Game.hsRivals().find(x => !H.riv[x].out); if (k) { H.riv[k].str = clamp(H.riv[k].str - 2); rep.lines.push(`Кочевники сожгли сборщик на чужой стороне: ${HOUSES[k].name} в убытке. Вам передали поклон из пустыни.`); } }
    H.spice = Math.max(0, Math.round((H.spice + out) * 10) / 10);
    // квота
    const Q = H.quota;
    if (S.turn >= Q.due) {
      if (H.spice >= Q.need) { H.spice -= Q.need; Q.paid++; Q.missed = 0; S.rel.throne = clamp((S.rel.throne || 0) + 4); rep.lines.push(`Квота Трона сдана: ${Q.need} мер приправы. Имперский приёмщик пересчитал дважды и не нашёл, к чему придраться. Расстроился.`); }
      else { const lack = Math.round(Q.need - H.spice); H.spice = 0; Q.missed++; S.rel.throne = clamp((S.rel.throne || 0) - Math.min(22, 6 + lack)); H.susp = clamp(H.susp + 6); rep.warn.push(`Квота Трона сорвана: не хватило ${lack} мер. Император «огорчён». В переводе с придворного это третья степень из четырёх.`); }
      if (Q.missed >= 3) { S.pendingEnd = 'revoked'; rep.warn.push('Третья сорванная квота подряд. Трон отзывает лен.'); }
      Q.need = Math.round(Q.need * 1.07 + 2 + (S.diff === 'hard' ? 3 : S.diff === 'easy' ? -1 : 0)); Q.due = S.turn + 4;
    }
    // большой запас не лежит спокойно: усушка, воровство и приёмщики
    if (H.spice > 80) { const rot = Math.round((H.spice - 80) * 0.12); if (rot > 0) { H.spice -= rot; if (S.turn % 3 === 0) rep.lines.push(`Хранилища переполнены: за квартал «усохло» мер приправы: ${rot}. Счётчик подозревает не усушку.`); } }
    if (H.susp >= 85 && S.turn % 3 === 1 && H.spice >= 20) { const take = Math.round(H.spice / 2); H.spice -= take; H.susp = clamp(H.susp - 12); rep.warn.push(`Имперская ревизия: приёмщики Трона вывезли «на хранение» ${take} мер приправы. Расписку выдали.`); }
    // подозрения Трона
    H.susp = clamp(H.susp + (S.army >= 75 ? 0.8 : 0) + (H.spice >= 60 ? 1.2 : 0) + (H.spice >= 100 ? 1 : 0) + (H.trust >= 70 ? 0.6 : 0) - ((S.rel.throne || 0) >= 65 ? 0.6 : 0) - 0.2);
    // дома-соперники
    for (const [k, R] of Object.entries(H.riv)) if (!R.out) { R.str = clamp(R.str + 0.5, 20, 90); }
    const W = H.war;
    if (W) {
      const R = H.riv[W.foe]; W.front = clamp(W.front + (S.army - R.str) * 0.2 + (H.trust >= 60 ? 3 : 0) + (Math.random() * 12 - 6), -100, 100);
      S.army = clamp(S.army - 1.2); S.treasury -= 4; R.str = clamp(R.str - 0.8);
      if (W.front >= 80) { R.out = true; H.war = null; H.susp = clamp(H.susp + 14); S.fac.hawks.a = clamp(S.fac.hawks.a + 10); S.support = clamp(S.support + 4); rep.lines.push(`Война домов выиграна. ${HOUSES[W.foe].name} покидает Сушь: по закону, с личными вещами и без приправы. Их пески теперь ваши. Трон поздравил и задумался.`); }
      else if (W.front <= -80) { rep.warn.push('Их гвардия в Карраке. Щиты цитадели гаснут один за другим.'); S.pendingEnd = 'ousted'; }
      else if (W.front <= -45) rep.warn.push(`Война идёт плохо: ${HOUSES[W.foe].name} теснит гвардию к Карраку.`);
    } else if (S.turn >= 6 && (Q.missed >= 2 || H.susp >= 72) && Math.random() < 0.35) {
      const k = Game.hsRivals().filter(x => !H.riv[x].out).sort((a, b) => (S.rel[a] || 0) - (S.rel[b] || 0))[0];
      if (k) { H.riv[k].str = clamp(H.riv[k].str + 12, 20, 95); H.war = { foe: k, front: -12, since: S.turn, by: 'them' }; S.rel[k] = clamp((S.rel[k] || 0) - 20); Q.missed = 0; rep.warn.push(`Трон дозволил войну домов против вас: ${HOUSES[k].name} высаживает гвардию на Сушь. Император сослался на «сомнения в вашем усердии». Приказы фронту — на вкладке «Планета Сушь».`); }
    }
    if (H.susp >= 85 && S.turn % 3 === 0) rep.warn.push('Трон подозревает вас почти открыто. При дворе о вашем доме говорят в прошедшем времени: тренируются.');
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isHouse()) return;
  Game.eraLook(); Game.hs();
  S.fac.new = S.fac.new || { s: 28, a: 50, st: 'legal' };
  Object.assign(S.fac.new, { s: 28, a: 50 });
  S.fac.left.s = 40; S.fac.liberals.s = 28; S.fac.faith.s = 34; S.fac.hawks.s = 42; S.fac.oligarchs.s = 40;
  for (const [r, d] of Object.entries(HOUSE_ADV[S.regime] || {})) if (S.adv[r]) Object.assign(S.adv[r], { name: d.name, bio: d.bio, look: d.look, female: isFemale(d) });
  for (const k of Object.keys(HOUSES)) if (k !== S.regime && S.rel[k] === undefined) S.rel[k] = REGIONS[SUSH].relInit[k];
  delete S.rel[S.regime];
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isHouse()) return;
  const H = Game.hs();
  if (fx.hsVal) for (const [k, d] of Object.entries(fx.hsVal)) { H.val[k] = clamp(H.val[k] + d); for (const o of Object.keys(H.val)) if (o !== k && d > 0) H.val[o] = clamp(H.val[o] - d / 2); ch.push({ k: 'fs', d, label: VAL[k][0], icon: VAL[k][1] }); }
  if (fx.hsTrust) { H.trust = clamp(H.trust + fx.hsTrust); ch.push({ k: 'fs', d: fx.hsTrust, label: 'Доверие кочевников', icon: '🏜️' }); }
  if (fx.hsNomad) H.nstr = clamp(H.nstr + fx.hsNomad, 10, 100);
  if (fx.hsSpice) { H.spice = Math.max(0, H.spice + fx.hsSpice); ch.push({ k: 'fs', d: fx.hsSpice, label: 'Приправа', icon: '🟠' }); }
  if (fx.hsSusp) { H.susp = clamp(H.susp + fx.hsSusp); ch.push({ k: 'fs', d: -fx.hsSusp, label: `Подозрения Трона ${fx.hsSusp > 0 ? 'растут' : 'слабеют'}`, icon: '👑' }); }
  if (fx.hsFront && H.war) { H.war.front = clamp(H.war.front + fx.hsFront, -100, 100); ch.push({ k: 'fs', d: fx.hsFront, label: 'Фронт', icon: '⚔️' }); }
  if (fx.hsRiv) { const [k0, d] = fx.hsRiv, k = k0 === '*' ? Game.hsRivals().find(x => !H.riv[x].out) : k0; if (k && H.riv[k]) { H.riv[k].str = clamp(H.riv[k].str + d, 15, 95); ch.push({ k: 'fs', d: -d, label: `${HOUSES[k].name}: сила`, icon: '🏰' }); } }
});
Game.previewHooks.push((fx, out) => {
  if (!isHouse()) return;
  const first = [];
  if (fx.hsVal) for (const [k, d] of Object.entries(fx.hsVal)) first.push({ icon: VAL[k][1], d, label: VAL[k][0], text: `${VAL[k][0].toLowerCase()} ${sign(d)}` });
  if (fx.hsTrust) first.push({ icon: '🏜️', d: fx.hsTrust, label: 'Кочевники', text: `доверие кочевников ${sign(fx.hsTrust)}` });
  if (fx.hsSpice) first.push({ icon: '🟠', d: fx.hsSpice, label: 'Приправа', text: `приправа ${sign(fx.hsSpice)}` });
  if (fx.hsSusp) first.push({ icon: '👑', d: -fx.hsSusp, label: 'Трон', text: `подозрения Трона ${sign(fx.hsSusp)}` });
  if (fx.hsFront) first.push({ icon: '⚔️', d: fx.hsFront, label: 'Фронт', text: `фронт ${sign(fx.hsFront)}` });
  if (fx.hsRiv) first.push({ icon: '🏰', d: -fx.hsRiv[1], label: 'Соперник', text: `сила соперника ${sign(fx.hsRiv[1])}` });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => { if (!isHouse()) return; Game.hsQuarter(rep); rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l)); });
Game.incomeHooks.push(() => (isHouse() ? { label: 'Доля дома с добычи приправы', v: Math.round(Game.hsOutput() * 0.5 * 10) / 10 } : null));
Game.incomeHooks.push(() => (isHouse() ? { label: 'Содержание наместника от Трона', v: 11 } : null));
Game.incomeHooks.push(() => (isHouse() && Game.hs().war ? { label: 'Война домов', v: -4 } : null));
Game.incomeHooks.push(() => (isHouse() && Game.hs().pol === 0 ? { label: 'Вода кочевникам', v: -3 } : null));
Game.coupHooks.push(() => { if (!isHouse()) return 0; const H = Game.hs(); return (H.val.schem >= 60 ? 0.008 : 0) + (H.war && H.war.front <= -40 ? 0.03 : 0) - (H.val.ruth >= 60 ? 0.01 : 0) - (S.army >= 55 && S.fac.hawks.a >= 40 ? 0.012 : 0); });
Game.revHooks.push(() => { if (!isHouse()) return 0; const H = Game.hs(); return (H.val.ruth >= 60 ? 0.015 : 0) - (H.val.noble >= 60 ? 0.012 : 0); });
Game.forcedList.push(() => { if (isHouse() && !S.over && S.pendingEnd === 'revoked') return { title: 'Указ Трона', bg: 'palace', crisis: true, lines: [['npc:emperor', 'Мы дали вам планету, чтобы получать с неё приправу. Приправы нет. Планета, следовательно, вам не нужна.'], ['foreign', 'Хм-м. Гонец ждёт подписи, {addr}. Имперский флот на орбите ждёт вместе с ним.']], choices: [{ text: 'Сдать печать наместника', fx: {}, res: 'Печать сдана. Гонец взвесил её на ладони: проверил, не подменили ли.' }], after: darkEnd };
  if (!isHouse() || S.over || S.pendingEnd !== 'ousted') return null; return { title: 'Щиты погасли', bg: 'night', crisis: true, lines: [['defense', 'Они в цитадели, {addr}. Гвардия держит последнюю лестницу. Гильдейский грузовик на орбите берёт пассажиров; третьим классом.'], ['narrator', 'По закону о войне домов проигравший покидает планету с личными вещами. Личных вещей у вас оказалось немного.']], choices: [{ text: 'Сдать планету', fx: {}, res: 'Вы подписали уступку лена. Победитель был учтив и даже предложил воды на дорогу. Вода была платной.' }], after: darkEnd }; });
const _blocH = Game.bloc;
Game.bloc = function () { if (!isHouse()) return _blocH.call(Game); const H = Game.hs(); return H.war ? `Война домов: ${HOUSES[H.war.foe].short}` : H.susp >= 70 ? 'Под подозрением Трона' : 'Верный вассал Трона (пока)'; };

// ---------- сцены ----------
const _introH = Game.introScene;
Game.introScene = function () {
  if (!isHouse()) return _introH ? _introH.call(Game) : null;
  const H = Game.hs(), core = Game.hsCore(), riv = Game.hsRivals().map(k => HOUSES[k].name).join(' и ');
  const lines = [
    ['narrator', `Год ${HS_Y} от основания Гильдии. Указом Золотого Трона ${HOUSES[S.regime].name} получает в лен планету Сушь. Прежний владелец уехал не весь: в цитадели остались его гобелены, его долги и, по слухам, его люди в стенах.`],
    ['narrator', `Девиз вашего дома — «${HOUSES[S.regime].motto}». Все в Империи знают, чего от вас ждать: ${VAL[core][0].toLowerCase()}. Изменить дому можно, но те, кто служит вам за это, растеряются.`],
  ];
  for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
  lines.push(['economy', `Расчёт таков, {addr}. Трон требует квоту: ${H.quota.need} мер приправы к концу года, и каждый год больше. Сорвём — император огорчится. Огорчённый император раздаёт дозволения на войну.`]);
  lines.push(['defense', `На планете стоят и другие: ${riv}. У каждого свои пески и своя гвардия. В пустыне живут кочевники. Их можно поить, не замечать или жечь; каждое решение они запомнят.`]);
  lines.push(['foreign', 'И последнее, {addr}, шёпотом. Тот, кто держит приправу, держит Гильдию. Тот, кто держит Гильдию, может долететь до столицы. Трон это понимает и потому подозрителен. Нам нужно, чтобы он понял слишком поздно.']);
  lines.push(['narrator', `Десять лет, до ${Game.endYear()} года. Можно просто усидеть. Можно сесть выше.`]);
  return { title: 'Лен планеты Сушь', bg: 'palace', lines };
};
const _coupH = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupH.call(Game, role);
  if (!isHouse()) return sc;
  sc.title = 'Измена в цитадели';
  sc.lines = [['narrator', 'Ночью щиты цитадели гаснут. Все сразу. Так не бывает от поломки: так бывает, когда рубильник опустил свой.'], ['npc:colonel', 'Милорд, дом сменил хозяина. Нам заплатили. Вам, если подпишете отречение, оставят жизнь и одну цистерну.'], ['police', 'Я предупреждал, {addr}, что предатель есть. Я не знал, что их столько. Четверть часа у нас есть: они ждут, пока им привезут вторую половину платы.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Выйти к гвардии с родовым перстнем'; c0.win.res = 'Вы вышли на галерею и подняли руку с перстнем. Старые гвардейцы встали на колено. Молодые посмотрели на старых и передумали.'; c0.lose.res = 'Вы подняли перстень. Капитан спросил, сколько он стоит.';
  c1.text = 'Поднять верных'; c1.win.res = 'Мастер меча с двадцатью верными прошёл цитадель от подвала до башни. К рассвету щиты снова горели.'; c1.lose.res = 'Верных оказалось двадцать. Купленных — двести.';
  if (c2) { if (c2.win) c2.win.res = 'Имперский наблюдатель напомнил изменникам, что смену дома утверждает Трон, а Трон не утверждал. Они ушли пересчитывать плату.'; if (c2.lose) c2.lose.res = 'Имперский наблюдатель сказал, что это внутреннее дело дома, и попросил не шуметь.'; }
  if (c3) { c3.text = 'Улететь грузовиком Гильдии'; c3.res = 'Гильдия возит всех, кто платит. Вы заплатили. Третий класс, без иллюминатора.'; }
  return sc;
};
const _revH = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revH.call(Game);
  if (!isHouse()) return sc;
  sc.title = 'Водяной бунт';
  sc.lines = [['narrator', 'Сначала толпа собралась у пустой цистерны. Потом у полной: у вашей. Сорок тысяч человек с бурдюками стоят под стенами цитадели и молчат. На Суши кричат только те, у кого есть лишняя влага.'], ['npc:rebel', 'Мы не просим приправы, владыка. Мы просим воды. Той, что в твоём саду льют на пальмы.'], ['defense', 'Гвардия пьёт из тех же цистерн, {addr}. Я бы не ставил её сегодня между толпой и водой.']];
  if (sc.choices[2]) { sc.choices[2].text = 'Улететь грузовиком Гильдии'; sc.choices[2].res = 'Вы улетели. С орбиты Сушь выглядит красивой. Отсюда не видно цистерн.'; }
  return sc;
};
const ULT_H = {
  hawks: ['Гвардии не плачено, {addr}, и ей скучно. Жалованье и враг. Или мы найдём себе и то, и другое сами.', 'Гвардия заперлась в казармах. Щиты цитадели держит дежурная смена: шесть человек и повар.'],
  oligarchs: ['Младшие дома просят долю с приправы. Мы присягали дому, но присяга не запрещает считать.', 'Сорок младших домов разом «заболели». Сборщики стоят без людей.'],
  left: ['Воду, владыка. Цистерну на каждый квартал города. Иначе мы придём за ней сами.', 'Водоносы перестали носить. Каррак пьёт вчерашнее.'],
  liberals: ['Счётчики просят не править их расчёты, {addr}. Или считайте сами.', 'Счётчики считают вслух и медленно. Очень медленно. Квота под угрозой.'],
  faith: ['Орден просит допустить Наставницу к воспитанию вашего наследника. Это не просьба, это страница плана.', 'Наставницы покинули цитадель. Ваши повара остались без пробовальщиц; обед проходит в тишине.'],
  new: ['Контрабандисты просят не трогать южные тропы. Мы возим всем. Не заставляйте нас возить только вашим врагам.', 'Контрабандисты возят только вашим врагам. С доставкой.'],
};
const _facUltH = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltH.call(Game, f);
  if (!isHouse()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_H[f] || ULT_H.left;
  sc.lines = [['narrator', `${name} просит приёма. Оружие сдано у дверей; взгляд сдать нельзя.`], [sp, ask], ['police', 'Откажете — исполнят. Уступите — придут другие, {addr}.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} кланяется. Ровно на положенную глубину.`;
  c1.text = 'Откупиться из казны дома'; c1.res = 'Шкатулка принята. Разговор отложен до следующей шкатулки.';
  c2.win.res = 'Взят ночью. Обвинение сочинили к утру; оно вышло складным.'; c2.lose.res = 'Арест сделал из него мученика. У цистерн шепчут его имя.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayH = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayH.call(Game, role);
  if (!isHouse()) return sc;
  sc.title = 'Предатель в ближнем кругу';
  sc.lines = [['narrator', `${S.adv[role].name} перешёл к вашим врагам. С ним ушли шифры дома, планы цитадели и привычка знать, что вы едите на завтрак.`], ['narrator', 'Его место займёт родич. Он предан. В вашем положении это уже немало.']];
  sc.choices[0].text = 'Сменить шифры и повара'; sc.choices[0].res = 'Шифры сменены. Нового повара проверяли неделю. Суп стал хуже, сон лучше.';
  return sc;
};

// ---------- указы ----------
const decH = (cat, d) => DECREES[cat].push({ eras: [HOUSE], ok: () => true, ...d });
decH('foreign', { id: 'hs_tribute', name: 'Дар Трону сверх положенного', desc: 'Золото, ковры и пара редких зверей. Император любит, когда его любят.', cost: '−12 сол.', ok: S => S.treasury >= 12, repeat: true, run: (S, m) => ({ fx: { treasury: -12, rel: { throne: Math.round(9 * m) }, hsSusp: -Math.round(5 * m) }, text: 'Дар принят. Император изволил улыбнуться. Улыбку описывают по-разному, но зафиксировали.' }) });
decH('foreign', { id: 'hs_guild', name: 'Особые условия для Гильдии', desc: 'Приправа перевозчикам по сниженной цене. Трон узнает и нахмурится.', cost: '−8 мер приправы', ok: () => Game.hs().spice >= 8, repeat: true, run: (S, m) => ({ fx: { hsSpice: -8, rel: { guild: Math.round(10 * m) }, hsSusp: 3 }, text: 'Гильдия благодарит. В её ответе нет ни одного слова, только маршрут до столицы со скидкой.' }) });
decH('foreign', { id: 'hs_order', name: 'Принять Наставницу в дом', desc: 'Орден пришлёт воспитательницу для наследников. И глаза, и уши, и план.', cost: '', once: true, run: () => ({ fx: { rel: { order: 14 }, fac: { faith: { a: 12 } }, hsSusp: -4, hsVal: { schem: 3 } }, text: 'Наставница прибыла. Осмотрела детей, слуг и вас. Вас дольше всех.' }) });
decH('social', { id: 'hs_water', name: 'Открыть цистерны цитадели', desc: 'Раздать воду дома черни. На Суши это больше, чем раздать золото.', cost: '−10 сол.', ok: S => S.treasury >= 10, repeat: true, run: (S, m) => ({ fx: { treasury: -10, support: Math.round(7 * m), fac: { left: { a: Math.round(8 * m) } }, hsVal: { noble: 4 } }, text: 'Цистерны открыты. Каррак пил два дня. Пальмы в вашем саду слегка привяли; садовник в трауре.' }) });
decH('social', { id: 'hs_terror', name: 'Показательная казнь водяных воров', desc: 'Кража воды карается так, чтобы запомнили. Запомнят.', cost: '', repeat: true, run: (S, m) => ({ fx: { fear: Math.round(9 * m), support: -4, fac: { left: { a: -7 } }, hsVal: { ruth: 5 } }, text: 'Казнь состоялась на площади Трёх Цистерн. Воровать воду перестали. Смотреть вам в глаза тоже.' }) });
decH('social', { id: 'hs_feast', name: 'Пир для младших домов', desc: 'Сорок глав домов за одним столом. Каждое блюдо пробуют трижды.', cost: '−9 сол.', ok: S => S.treasury >= 9, repeat: true, run: (S, m) => ({ fx: { treasury: -9, fac: { oligarchs: { a: Math.round(9 * m) } }, hsVal: { schem: 2 } }, text: 'Пир прошёл без отравлений. По меркам Империи это безусловный светский успех.' }) });
decH('economy', { id: 'hs_shield', name: 'Щитовая стена вокруг Каррака', desc: 'Защита от бурь и от гостей. Строить долго, гудит громко.', cost: '−16 сол.', ok: S => S.treasury >= 16, once: true, run: () => ({ fx: { treasury: -16, economy: 5, army: 4 }, text: 'Стена поднята. Буря прошла мимо. Червь, приползший на гул, постоял у стены и ушёл; его запомнили в лицо.' }) });
decH('economy', { id: 'hs_levy', name: 'Набор в гвардию из водоносов', desc: 'Кто носил воду, понесёт клинок. Жалованье то же: вода.', cost: '−8 сол.', ok: S => S.treasury >= 8, repeat: true, run: (S, m) => ({ fx: { treasury: -8, army: Math.round(8 * m), support: -3, fac: { left: { a: -5 }, hawks: { a: 3 } }, hsSusp: 2 }, text: 'Набор проведён. Новобранцы держат клинок как коромысло. Мастер меча обещает исправить за месяц.' }) });
decH('economy', { id: 'hs_squeeze', name: 'Выжать пески', desc: 'Сборщики работают без остановки, люди тоже. Приправы больше, всего остального меньше.', cost: '', repeat: true, run: (S, m) => ({ fx: { hsSpice: Math.round(8 * m), economy: -1, support: -2, hsTrust: -5, hsVal: { ruth: 3 } }, text: 'Добыча выросла. Один сборщик ушёл в песок вместе с экипажем: червь. В ведомости записано «естественная убыль».' }) });
DEMANDS.push(
  { id: 'hs_d_t', countries: ['throne'], eras: [HOUSE], text: () => 'Прислать ко двору заложника из вашего рода', fx: () => ({ rel: { throne: 14 }, hsSusp: -6, fac: { hawks: { a: -4 } } }) },
  { id: 'hs_d_g', countries: ['guild'], eras: [HOUSE], text: () => 'Отгрузить Гильдии приправу мимо квоты', fx: () => ({ hsSpice: -6, rel: { guild: 14 }, hsSusp: 3 }) },
  { id: 'hs_d_o', countries: ['order'], eras: [HOUSE], text: () => 'Обручить наследника по выбору Ордена', fx: () => ({ rel: { order: 15 }, fac: { faith: { a: 6 }, oligarchs: { a: -4 } } }) },
  ...Object.keys(HOUSES).map(k => ({ id: 'hs_d_' + k, countries: [k], eras: [HOUSE], text: () => 'Уступить им спорный участок песков', fx: () => ({ hsSpice: -4, rel: { [k]: 15 }, fac: { hawks: { a: -5 } } }) })),
);

// требования сословий: свои формулировки вместо «субсидий на хлеб» и «налогов с компаний»
for (const list of Object.values(FAC_DEMANDS)) for (const d of list) if (!d.only) d.except = [...new Set([...(d.except || []), SUSH])];
const hsDem = (f, id, text, k, op, v) => (FAC_DEMANDS[f] = FAC_DEMANDS[f] || []).push(Array.isArray(k) ? { id, kind: 'act', only: [SUSH], text, acts: k } : { id, kind: 'budget', only: [SUSH], text, k, op, v });
hsDem('left', 'h_l_water', 'Раздачу воды поднять до 65% и выше', 'subsidy', '>=', 65);
hsDem('left', 'h_l_tax', 'Водяной сбор снизить до 40% и ниже', 'popTax', '<=', 40);
hsDem('left', 'h_l_cist', 'Открыть цистерны цитадели (указ)', ['dec:hs_water']);
hsDem('liberals', 'h_c_school', 'Школу счётчиков довести до 60% и выше', 'edu', '>=', 60);
hsDem('liberals', 'h_c_spy', 'Мастеров тайн урезать до 40% и ниже', 'police', '<=', 40);
hsDem('faith', 'h_o_heal', 'Лекарей и цистерны довести до 60% и выше', 'health', '>=', 60);
hsDem('faith', 'h_o_nun', 'Принять Наставницу в дом (указ)', ['dec:hs_order']);
hsDem('oligarchs', 'h_v_tax', 'Сбор с младших домов снизить до 40% и ниже', 'corpTax', '<=', 40);
hsDem('oligarchs', 'h_v_feast', 'Дать пир для младших домов (указ)', ['dec:hs_feast']);
hsDem('hawks', 'h_g_pay', 'Гвардию дома довести до 65% и выше', 'army', '>=', 65);
hsDem('hawks', 'h_g_levy', 'Провести набор в гвардию (указ)', ['dec:hs_levy']);
hsDem('new', 'h_s_duty', 'Посадочный сбор снизить до 40% и ниже', 'duty', '<=', 40);
hsDem('new', 'h_s_spy', 'Мастеров тайн урезать до 45% и ниже', 'police', '<=', 45);

// ---------- события ----------
const HL = ['house'];
EVENTS.push(
  { id: 'hs_test', title: 'Испытание', bg: 'palace', weight: 3, eras: HL,
    lines: [['npc:mother', 'Ваш наследник достиг возраста испытания. Ящик, игла, вопрос. Девять из десяти проходят. Десятого мы не обсуждаем.'], ['police', 'Орден проверяет всех наследников великих домов, {addr}. Отказ — это ответ, и они его запишут.']],
    choices: [
      { text: 'Разрешить испытание', fx: { rel: { order: 8 }, fac: { faith: { a: 6 } }, hsVal: { noble: 3 } }, res: 'Наследник вышел бледный, но на своих ногах. Наставница сказала «годен» и что-то отметила на странице, которой вам не показали.' },
      { text: 'Подменить наследника двойником', adv: ['police'], chance: () => 0.5, win: { fx: { hsVal: { schem: 6 }, rel: { order: 3 } }, res: 'Двойник прошёл. Орден ничего не заметил. Или заметил и записал: с ними никогда не поймёшь.' }, lose: { fx: { rel: { order: -14 }, fac: { faith: { a: -8 } }, hsVal: { schem: 3 } }, res: 'Наставница посмотрела на двойника и спросила, где настоящий. Потом спросила, не хотите ли пройти испытание сами.' } },
      { text: 'Выставить Наставницу за ворота', fx: { rel: { order: -12 }, fac: { faith: { a: -10 }, hawks: { a: 4 } }, hsVal: { ruth: 4 } }, res: 'Наставницу проводили до корабля. Она не возражала. Она улыбалась. Это хуже.' },
    ] },
  { id: 'hs_worm', title: 'Червь у сборщика', bg: 'village', weight: 3, eras: HL,
    lines: [['economy', 'Червь идёт на третий сборщик, {addr}. Расчёт: поднять машину не успеем, поднять людей успеем. В машине приправы на полквоты.'], ['defense', 'Или людей, или груз. Подъёмник один.']],
    choices: [
      { text: 'Поднять людей', fx: { hsSpice: -6, support: 4, hsVal: { noble: 6 }, fac: { left: { a: 5 } } }, res: 'Сорок человек стояли на гребне и смотрели, как песок глотает машину. Потом посмотрели на вас. Такого взгляда не купишь.' },
      { text: 'Поднять груз', fx: { hsSpice: 6, support: -5, hsVal: { ruth: 7 }, fac: { left: { a: -8 } } }, res: 'Груз спасён. Экипаж — нет. В ведомости записано «естественная убыль». Водоносы читать не умеют, но это прочли.' },
      { text: 'Поднять груз, а семьям назначить пенсию и сочинить подвиг', req: S => S.treasury >= 6, reqText: 'нужно 6 сол.', fx: { treasury: -6, hsSpice: 6, hsVal: { schem: 6 } }, res: 'Бард сложил балладу о сорока героях, пожелавших остаться у машины. Семьи получают пенсию и гордятся. Правду знают четверо.' },
    ] },
  { id: 'hs_guest', title: 'Гость под знаком мира', bg: 'palace', weight: 2, eras: HL, cond: () => Game.hsRivals().some(k => !Game.hs().riv[k].out),
    lines: [['npc:rival', 'Я приехал под знаком мира, как велит обычай. Преломим хлеб, милорд. Мой пробовальщик, правда, занемог в дороге.'], ['police', 'Он под вашей крышей и без охраны, {addr}. Такого случая не будет двадцать лет. Я просто сообщаю.']],
    choices: [
      { text: 'Принять как гостя: обычай свят', fx: S => ({ rel: { [Game.hsRivals().find(k => !Game.hs().riv[k].out)]: 10 }, hsVal: { noble: 6 } }), res: 'Гость уехал живым и слегка разочарованным: он заготовил завещание и предсмертную речь.' },
      { text: 'Гость заболеет в дороге домой', fx: { hsRiv: ['*', -12], hsVal: { schem: 8 }, hsSusp: 3 }, res: 'Гость занемог на третий день пути. Лекари нашли «песчаную лихорадку». Мастер тайн её изобрёл в прошлом году.' },
      { text: 'Взять под стражу и потребовать выкуп', fx: { treasury: 14, hsVal: { ruth: 8 }, rel: { throne: -5 }, fac: { oligarchs: { a: -6 } } }, res: 'Выкуп уплачен. Обычай гостеприимства нарушен впервые за триста лет. Младшие дома теперь ездят к вам со своей едой.' },
    ] },
  { id: 'hs_inspect', title: 'Имперский приёмщик', bg: 'office', weight: 3, eras: HL, minTurn: 4,
    lines: [['economy', 'Приёмщик Трона желает пересчитать склады, {addr}. Все. В том числе тот, которого нет.'], ['foreign', 'Хм-м-м. При дворе говорят, он берёт. Ещё говорят, что тех, кто давал, он записывает. Хм.']],
    choices: [
      { text: 'Показать всё как есть', fx: () => ({ hsSusp: Game.hs().spice >= 40 ? 8 : -6, hsVal: { noble: 4 } }), res: 'Приёмщик пересчитал честно показанное. Если запас был велик, он это запомнил; если мал, успокоился.' },
      { text: 'Дать шкатулку', req: S => S.treasury >= 8, reqText: 'нужно 8 сол.', fx: { treasury: -8, hsSusp: -8, hsVal: { schem: 3 } }, res: 'Шкатулка принята. В отчёте значится: «Запасы скромны, усердие велико».' },
      { text: 'Приёмщик заблудился в пустыне', fx: { hsSusp: 10, fear: 3, hsVal: { ruth: 6 } }, res: 'Приёмщика искали неделю. Нашли сапоги. Трон прислал нового, с охраной и без чувства юмора.' },
    ] },
  { id: 'hs_prophet', title: 'Голос из пустыни', bg: 'village', weight: 2, eras: HL,
    lines: [['npc:nomad', 'Наши старухи видели сон. Придёт чужак и поведёт нас. Мы пришли посмотреть на твоего сына. И на тебя: на всякий случай.'], ['propaganda', 'Если пророчество сбудется на нашем дворе, {addr}, у нас будет армия, какой нет у Трона. Если нет — у нас будут обиженные кочевники у ворот.']],
    choices: [
      { text: 'Отпустить сына пожить в стойбище', fx: { hsTrust: 16, hsVal: { noble: 4 }, fac: { hawks: { a: -4 } } }, res: 'Сын вернулся через месяц: загорелый, с ножом и с новым именем. По-нашему говорит с акцентом. Кочевники кланяются ему первыми.' },
      { text: 'Сыграть избранного самому', adv: ['propaganda'], chance: () => 0.45, win: { fx: { hsTrust: 22, hsVal: { schem: 7 } }, res: 'Вы прошли по песку, не привлекая червя. Бард за барханом бил в барабан в такт: червь шёл на него. Кочевники впечатлены.' }, lose: { fx: { hsTrust: -12, hsVal: { schem: 3 } }, res: 'Червь пришёл на вас. Вас вытащили за шиворот. Старухи сказали, что сон был про другого.' } },
      { text: 'Прогнать: дом не верит снам', fx: { hsTrust: -8, hsVal: { ruth: 3 } }, res: 'Кочевники ушли. Старухи теперь видят другой сон. В нём вы тоже есть, но недолго.' },
    ] },
  { id: 'hs_smug', title: 'Южные тропы', bg: 'night', weight: 2, eras: HL,
    lines: [['police', 'Контрабандисты вывозят с планеты десятую часть приправы, {addr}. Мимо квоты, мимо Трона. Половину берёт Гильдия, вторую — ваши соперники.'], ['economy', 'Расчёт: можно закрыть тропы, можно обложить данью, можно возить самим.']],
    choices: [
      { text: 'Закрыть тропы', fx: { hsSpice: 4, fac: { new: { a: -10 } }, rel: { guild: -5 }, hsSusp: -3 }, res: 'Тропы закрыты. Трон доволен. Гильдия прислала вежливое письмо без единой гласной: так они хмурятся.' },
      { text: 'Брать с них долю', fx: { treasury: 9, fac: { new: { a: 6 } }, hsVal: { schem: 4 }, hsSusp: 3 }, res: 'Контрабандисты платят аккуратнее вассалов. Старшина прислал в подарок карту троп. Одной на ней не хватает.' },
      { text: 'Перевешать и возить самим', fx: { hsSpice: 6, fear: 5, fac: { new: { a: -16 } }, hsVal: { ruth: 6 }, hsSusp: 5 }, res: 'Тропы теперь ваши. Возить мимо Трона оказалось сложнее, чем вешать. Двоих ваших уже взяли на орбите.' },
    ] },
  { id: 'hs_bard', title: 'Баллада не о том', bg: 'office', weight: 2, eras: HL,
    lines: [['propaganda', 'В харчевнях поют новую балладу, {addr}. Не мою. В ней владыка Суши пьёт воду, а народ — песок. Рифма хромает, но поют охотно.']],
    choices: [
      { text: 'Найти автора и нанять', req: S => S.treasury >= 5, reqText: 'нужно 5 сол.', fx: { treasury: -5, support: 3, hsVal: { schem: 3 } }, res: 'Автор теперь пишет для дома. Вторая баллада вышла о том, как владыка пьёт песок вместе с народом. Народ не поверил, но оценил.' },
      { text: 'Найти автора и вырвать язык', fx: { fear: 6, support: -4, hsVal: { ruth: 6 } }, res: 'Балладу больше не поют. Её насвистывают. Мотив привязчивый.' },
      { text: 'Спеть её самому на пиру', fx: { support: 5, fear: -3, hsVal: { noble: 5 } }, res: 'Вы спели. Фальшиво, но до конца. Младшие дома не знали, смеяться ли. Водоносы узнали к утру и смеялись.' },
    ] },
  { id: 'hs_guildask', title: 'Перевозчик просит', bg: 'palace', weight: 2, eras: HL, minTurn: 8,
    lines: [['npc:navigator', 'Приправа… должна… течь. Трон берёт… слишком много. Дайте нам… напрямую. Мы… не забудем. Мы вообще… ничего не забываем.'], ['foreign', 'Хм-м. Гильдия просит в обход Трона. Это либо ключ от столицы, {addr}, либо приговор. Хм.']],
    choices: [
      { text: 'Дать напрямую', req: () => Game.hs().spice >= 8, reqText: 'нужно 8 мер приправы', fx: { hsSpice: -8, rel: { guild: 16 }, hsSusp: 7 }, res: 'Бак с перевозчиком отбыл довольный. Насколько можно судить по пузырям.' },
      { text: 'Отказать и донести Трону', fx: { rel: { guild: -14, throne: 10 }, hsSusp: -8 }, res: 'Трон поблагодарил за верность. Гильдия подняла вам тариф на всё, включая письма.' },
      { text: 'Обещать и тянуть', fx: { rel: { guild: 4 }, hsVal: { schem: 5 }, hsSusp: 2 }, res: 'Вы обещали. Гильдия ждёт. Гильдия умеет ждать: её перевозчики живут по триста лет.' },
    ] },
);

// ---------- хроника Империи ----------
const HISTORY_H = [
  { at: [HS_Y, 1], head: 'Сушь пожалована новому дому', text: 'Золотой Трон передал лен планеты Сушь. Двор заключает пари, сколько продержится новый владыка. Император, по слухам, тоже поставил.', fx: {} },
  { at: [HS_Y, 4], head: 'Гильдия подняла тарифы', text: 'Перевозка между мирами подорожала на десятую часть. Гильдия объяснила это «ростом цен на приправу». Приправу ей продаём мы, по прежней цене.', fx: { treasury: -5, rel: { guild: -2 } } },
  { at: [HS_Y + 1, 3], head: 'Императорская охота', text: 'Его величество изволил охотиться на песчаного червя. С орбиты. Червь не пострадал; пострадали три сборщика приправы, чьи — уточняется.', fx: { hsSpice: -4 } },
  { at: [HS_Y + 2, 2], head: 'Собрание домов требует отчёта', text: 'Великие дома желают знать, куда идёт приправа.',
    choice: { lines: [['foreign', 'Хм-м. Собрание спрашивает с нас, {addr}. Трон смотрит, что мы ответим.']], choices: [
      { text: 'Отчитаться честно', fx: { hsVal: { noble: 5 }, rel: { throne: -6 }, fac: { oligarchs: { a: 6 } }, hsSusp: 4 }, res: 'Вы назвали цифры. Собрание ахнуло: Трон забирает втрое больше, чем говорил. Император этого вам не забудет.' },
      { text: 'Свалить недостачу на соперников', fx: { hsRiv: ['*', -8], hsVal: { schem: 5 } }, res: 'Цифры сошлись удивительным образом: всё пропавшее пропало на чужих песках. Собрание назначило комиссию.' },
      { text: 'Отказаться: дом не отчитывается', fx: { hsVal: { ruth: 4 }, rel: { throne: 5 }, fac: { oligarchs: { a: -5 } } }, res: 'Собрание оскорблено. Трон доволен: вы поссорились с домами сами, без его помощи.' },
    ] } },
  { at: [HS_Y + 3, 4], head: 'Трон повысил квоту', text: 'Указом императора квота приправы увеличена «ввиду возросших нужд двора». Нужды двора, как известно, возрастают всегда.', fx: () => { Game.hs().quota.need += 6; return { rel: { throne: -2 } }; } },
  { at: [HS_Y + 5, 2], head: 'У императора новая фаворитка', text: 'Двор занят новой фавориткой. Государственные дела отложены на месяц. Подозрения тоже.', fx: { hsSusp: -8 } },
  { at: [HS_Y + 6, 3], head: 'Наследник Трона достиг совершеннолетия', text: 'Принцу нужен собственный лен. Двор перебирает планеты. Сушь в списке первая.', fx: { hsSusp: 6, rel: { throne: -4 } } },
  { at: [HS_Y + 8, 1], head: 'Гильдия недовольна Троном', text: 'Перевозчики намекнули, что император берёт приправы больше, чем отдаёт флоту. Намёк длился четыре часа и состоял из пузырей.', fx: { rel: { guild: 6 } } },
  { at: [HS_Y + 9, 2], head: 'Император нездоров', text: 'Его величество не вышел к Собранию. Лекари говорят о простуде. Двор говорит о завещании. Вы молчите и считаете.', fx: { hsSusp: -6 } },
];

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isHouse()) return;
  const H = Game.hs(), top = Game.hsTop(), name = HOUSES[S.regime].name;
  const T = {
    crowned: ['Падишах-автократор', { noble: `Вы на Золотом Троне. Собрание домов кричало ваше имя; Гильдия везла гостей на коронацию даром. Первым указом вы снизили квоту приправы. Вторым — вернули. Двор надо на что-то содержать, а двор, как выяснилось, теперь ваш.`, ruth: `Вы на Золотом Троне. В тронном зале пахнет дымом. Собрание домов присягнуло стоя, быстро и не поднимая глаз. Вам подали корону прежнего императора. Она оказалась вам велика; велели подогнать.`, schem: `Вы на Золотом Троне. Никто не может объяснить, как это вышло: всё случилось по закону, по завещанию и само собой. Вам кланяются те, кто вам должен. Должны вам, как выяснилось, все.` }[top] + ` ${name} правит Империей. Летописцы уже пишут, что так было предначертано.`],
    fallen: ['Вычеркнут из Книги домов', `Заговор раскрыт. ${name} вычеркнут из Книги домов вместе со страницей. Вас не казнили: император милостив. Вас поселили при дворе, шутом. У вас колпак с бубенцами и лучшее место в тронном зале. Каждый день вы видите трон. Вблизи.`],
    revoked: ['Лен отозван', `Три года подряд Трон не получал своей приправы. Указ пришёл с имперским гонцом: лен планеты Сушь отозван «за нерадение». ${name} возвращается на родовой мир: тесный, сырой и без приправы. Говорят, там даже идёт дождь. Вы теперь знаете, что это не утешение.`],
    ousted: ['Третьим классом', `Сушь перешла к победителю. По закону о войне домов вы покинули планету с личными вещами. Грузовик Гильдии идёт до ближайшего мира четыре месяца. В третьем классе нет иллюминаторов, зато есть время подумать, где именно всё пошло не так.`],
    exile: ['Третьим классом', 'Гильдия возит всех, кто платит. Вы заплатили родовым перстнем: больше было нечем. На новом мире вас никто не знает. От дома остались имя и привычка проверять еду.'],
    helicopter: ['Третьим классом', 'Грузовик Гильдии, койка, чемодан. В чемодане мундир с гербом дома. Носить его негде, выбросить не поднимается рука.'],
    coup: ['Дом сменил хозяина', 'Вам оставили жизнь и одну цистерну. Вы живёте в дальнем крыле собственной цитадели. Новый владыка иногда зовёт вас к столу: показывает гостям. Вы едите молча и запоминаете лица.'],
    revolution: ['Вода взяла своё', 'Толпа вошла в цитадель и первым делом открыла ваш сад. Пальмы выпили за час. Вас не тронули: вам дали бурдюк и место в очереди к цистерне. Очередь длинная. Вы стоите в ней каждый день.'],
    retired: ['Уступил лен', 'Вы передали планету наследнику и удалились в дальнее поместье. Говорят, там даже идёт дождь. Вы каждый раз выходите посмотреть.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    E.title = H.quota.missed === 0 && H.quota.paid >= 9 ? 'Образцовый вассал' : 'Десять лет на песке';
    E.text = `${Game.endYear() - 1} год. Вы удержали Сушь десять лет: дольше трёх предыдущих владык вместе взятых. Квота сдана ${H.quota.paid} раз из десяти. `
      + (Game.hsPillars().filter(p => p[1]).length >= 3 ? 'Всё было готово для удара по Трону. Вы так и не решились. Посол до сих пор многозначительно мычит, глядя на вас.' : 'До Трона вы не дотянулись. Император стар, наследник глуп, Гильдия терпелива. Может быть, ваш сын.')
      + ` ${name} стоит. Приправа течёт.`;
  }
  verdicts.length = 0;
  verdicts.push(`Дом: ${name}`); verdicts.push(`Главная ценность: ${VAL[top][0].toLowerCase()}${top !== Game.hsCore() ? ' (не та, что в девизе)' : ''}`);
  verdicts.push(`Квот сдано: ${H.quota.paid}`); verdicts.push(`Доверие кочевников: ${Math.round(H.trust)}`);
  const out = Object.keys(H.riv).filter(k => H.riv[k].out); if (out.length) verdicts.push(`Изгнаны с планеты: ${out.map(k => HOUSES[k].short).join(', ')}`);
  if (type === 'crowned') verdicts.push('Трон взят');
});
const _scoreH = Game.ending;
Game.ending = function (type) { const r = _scoreH.call(Game, type); if (isHouse() && type === 'crowned' && S.final && typeof S.final.score === 'number') S.final.score = Math.round(S.final.score * 1.5 + 300); return r; };

// ---------- глашатай ----------
const _pressPageH = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isHouse()) return _pressPageH.call(UI, news);
  const ch = [], H = Game.hs();
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Весть: ' + h.head); }
  const off = [['Пески', H.war ? `Война домов: ${HOUSES[H.war.foe].name}. ${H.war.front >= 20 ? 'Гвардия теснит врага.' : H.war.front <= -20 ? 'Гвардия отходит к Карраку.' : 'Бои у сборщиков.'}` : pick(['В глубокой пустыне видели червя длиной с цитадель. Видевший просит ему не верить: так спокойнее.', 'Буря шла три дня. Четвёртый сборщик откопали. Пятый ищут.', 'Кочевники прошли мимо южной заставы. Застава сделала вид, что спит.'])],
    ['Двор', pick(['Император изволил зевнуть на приёме. Двор гадает, в чей адрес.', 'При дворе вошли в моду перчатки. Говорят, из-за новых ядов.', 'Собрание домов заседало шесть часов и постановило собраться снова.'])],
    ['У цистерн', pick(['Вода подорожала на грош. Водоносы объясняют это тем, что она мокрая.', 'Продаётся бурдюк, почти не текущий.', 'Пропал пробовальщик блюд. Нашедшего просят не кормить.'])]];
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="rm-np hs-np">
      <div class="rm-np-mast">Каррацкий глашатай</div>
      <div class="rm-np-date">Каррак, планета Сушь · ${S.q}-я четверть ${S.year} года · читается вслух у цистерн</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="rm-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит дом?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
const hsBtn = (id, name, cost, ok, free) => `<button class="btn small" data-act="${id}" ${!ok || S.phase !== 'hub' || (!free && S.ap <= 0) ? 'disabled' : ''}>${esc(name)}${cost ? `<small>${esc(cost)}</small>` : ''}</button>`;
const hsHolo = () => {
  const H = Game.hs(), R = Game.hsRivals(), me = HOUSES[S.regime];
  const pos = [[150, 96], [96, 150], [206, 158]], mark = (x, y, col, label, sub) => `<g><circle cx="${x}" cy="${y}" r="5" fill="${col}" stroke="#f0c27a" stroke-width="1"/><circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${col}" stroke-width="1" opacity="0.6"/><text x="${x + 13}" y="${y - 2}" class="hs-h-t">${label}</text><text x="${x + 13}" y="${y + 10}" class="hs-h-s">${sub}</text></g>`;
  let s = `<svg viewBox="0 0 300 300" class="hs-holo" role="img" aria-label="Голограмма планеты Сушь"><defs><radialGradient id="hsg" cx="40%" cy="35%"><stop offset="0" stop-color="#c98a2a" stop-opacity="0.55"/><stop offset="1" stop-color="#3a2410" stop-opacity="0.9"/></radialGradient><clipPath id="hsc"><circle cx="150" cy="150" r="120"/></clipPath></defs>`;
  s += `<circle cx="150" cy="150" r="120" fill="url(#hsg)" stroke="#f0c27a" stroke-width="1.5"/><g clip-path="url(#hsc)" fill="none" stroke="#f0c27a" stroke-width="0.7" opacity="0.5">`;
  for (const ry of [20, 55, 90, 118]) s += `<ellipse cx="150" cy="150" rx="120" ry="${ry}"/>`;
  s += `<g class="hs-spin">`; for (const rx of [20, 55, 90, 118]) s += `<ellipse cx="150" cy="150" rx="${rx}" ry="120"/>`; s += `</g>`;
  s += `<path d="M40 190 Q90 170 140 196 T262 180" stroke="#f0c27a" stroke-width="1.4" opacity="0.8" stroke-dasharray="5 4"/></g>`;
  s += mark(pos[0][0], pos[0][1], me.col, 'Каррак', me.short);
  R.forEach((k, i) => { const r = H.riv[k]; if (!r.out) s += mark(pos[i + 1][0], pos[i + 1][1], HOUSES[k].col, HOUSES[k].short, `сила ${Math.round(r.str)}`); });
  for (const [x, y] of [[178, 216], [120, 226], [226, 112]].slice(0, H.nstr >= 60 ? 3 : H.nstr >= 35 ? 2 : 1)) s += `<path d="M${x} ${y} l5 -9 l5 9 Z" fill="none" stroke="#7fe0c0" stroke-width="1.3"/>`;
  for (let i = 0; i < H.harv; i++) s += `<rect x="${118 + i * 16}" y="${128 + (i % 2) * 10}" width="8" height="5" fill="#f0c27a"/>`;
  if (H.war) s += `<path d="M${pos[0][0]} ${pos[0][1]} L${pos[R.indexOf(H.war.foe) + 1][0]} ${pos[R.indexOf(H.war.foe) + 1][1]}" stroke="#c1272d" stroke-width="2" stroke-dasharray="3 3" class="hs-blink"/>`;
  return s + `<text x="150" y="288" text-anchor="middle" class="hs-h-s">▲ стойбища кочевников · ▬ сборщики приправы</text></svg>`;
};
Object.assign(UI, {
  tab_sush() {
    const H = Game.hs(), Q = H.quota, W = H.war, core = Game.hsCore(), out = Game.hsOutput(), left = Q.due - S.turn;
    const riv = k => { const R = H.riv[k], rel = S.rel[k] || 0;
      return `<article class="card country"><header>${flagSvg(k)}<div><h3>${esc(HOUSES[k].name)}</h3><span class="muted small">«${esc(HOUSES[k].motto)}» · ${R.out ? 'изгнан с планеты' : `сила ${Math.round(R.str)} против вашей гвардии ${Math.round(S.army)}`}</span></div><span class="chip ${R.out ? '' : W && W.foe === k ? 'banned' : rel >= 65 ? 'coopted' : ''}">${R.out ? 'нет на Суши' : W && W.foe === k ? 'война' : rel >= 65 ? 'союзник' : 'сосед'}</span></header>
        ${R.out ? '<p class="muted small">Их пески и сборщики теперь ваши.</p>' : `${UI.meter('Отношения', rel, rel >= 60 ? 'good' : rel >= 30 ? 'warn' : 'bad')}
        <div class="acts">${hsBtn(`hs:pact:${k}`, 'Посольство и дары', '−8 сол.', S.treasury >= 8)}${hsBtn(`hs:whisper:${k}`, 'Пустить слух при дворе', 'интрига · их сила −', true)}${W ? '' : hsBtn(`hs:askwar:${k}`, 'Просить у Трона войну', (S.rel.throne || 0) >= 55 ? 'милость Трона позволяет' : '−15 сол. придворным', (S.rel.throne || 0) >= 55 || S.treasury >= 15)}</div>`}</article>`; };
    const ords = ['raid', 'hold', 'storm', { noble: 'duel', ruth: 'wells', schem: 'bribe' }[Game.hsTop()]];
    return `<p class="lede">Сушь — это приправа, а приправа — это всё. Трон требует квоту, кочевники жгут сборщики, соседние дома ждут вашей ошибки. Голограмма показывает, кто где стоит.</p>
      <div class="cr">
        <section class="card hs-holo-card">${hsHolo()}</section>
        <section class="card" style="flex:1.3"><div class="eyebrow">Приправа</div><h2 class="rm-rank">${Math.round(H.spice)} мер в хранилищах</h2>
          <p><b>Квота Трона: ${Q.need} мер</b> через ${left <= 1 ? 'квартал' : left + ' кв.'} · добыча ${String(out).replace('.', ',')} мер за квартал · сборщиков: ${H.harv} из 4</p>
          ${UI.meter('К квоте', clamp(H.spice / Q.need * 100), H.spice + out * Math.max(0, left) >= Q.need ? 'good' : 'bad')}
          <p class="muted small">Квота растёт каждый год. Сдали — милость Трона растёт. Сорвали — падает, после двух срывов подряд Трон дозволит соседям войну против вас, а после трёх отзовёт лен. Излишки можно продать Гильдии, поднести Трону или копить: большой запас (от 80 мер) — рычаг против самого императора, но выше восьмидесяти он «усыхает», а при сильных подозрениях за ним приедут приёмщики, и он это знает.</p>
          <div class="acts">${hsBtn('hs:harv', 'Купить сборщик', H.harv >= 4 ? 'больше пески не выдержат' : `−${10 + H.harv * 6} сол. · добыча +3`, H.harv < 4 && S.treasury >= 10 + H.harv * 6)}${hsBtn('hs:sell', 'Продать 6 мер Гильдии', H.sellAt === S.turn ? 'в этом квартале уже продавали' : '+8 сол. · без приказа', H.spice >= 6 && H.sellAt !== S.turn, true)}${hsBtn('hs:deliver', 'Поднести 5 мер Трону', H.giftAt === S.turn ? 'в этом квартале уже подносили' : 'милость +, подозрения − · без приказа', H.spice >= 5 && H.giftAt !== S.turn, true)}</div></section>
      </div>
      ${W ? `<section class="card mt hs-war"><div class="eyebrow">Война домов · ${esc(HOUSES[W.foe].name)} · идёт ${S.turn - W.since} кв. · ${W.by === 'you' ? 'по вашему прошению' : 'по дозволению Трона против вас'}</div>
        <div class="em-front" role="img" aria-label="Фронт: ${Math.round(W.front)}"><i style="left:${(W.front + 100) / 2}%"></i></div>
        <p class="muted small">Фронт: <b>${W.front >= 0 ? '+' : '−'}${Math.abs(Math.round(W.front))}</b>. На +80 соперник покинет планету, на −80 её покинете вы. Война стоит 4 сол. в квартал и стачивает гвардию. Воевать дозволено клинками и только здесь: так Трон следит, чтобы дома убивали друг друга прилично.${H.trust >= 60 ? ' Кочевники бьют врагу в спину: фронт +3 за квартал.' : ''}</p>
        <div class="eyebrow">Приказы фронту · каждый раз в квартал</div>
        <div class="acts">${ords.map(o => hsBtn(`hs:ord:${o}`, WAR_ORD[o][0], H.ordAt[o] === S.turn ? 'приказ уже отдан' : WAR_ORD[o][1], H.ordAt[o] !== S.turn && !(o === 'storm' && W.front < 40) && !(o === 'bribe' && S.treasury < 10))).join('')}${hsBtn('hs:peace', 'Просить Трон остановить войну', '−12 сол. · гвардия обидится', S.treasury >= 12)}</div></section>` : ''}
      <section class="card mt"><div class="eyebrow">Кочевники</div>
        <div class="cr"><div style="flex:1">${UI.meter('Доверие', H.trust, H.trust >= 60 ? 'good' : H.trust >= 30 ? 'warn' : 'bad')}${UI.meter('Сила в пустыне', H.nstr, 'warn')}
          <p class="muted small">Доверие от 70 — набегов нет, кочевники бьют ваших соперников и считаются вашим мечом в заговоре. Ниже 25 — набеги злее. Что бы вы ни выбрали, они запомнят.</p></div>
          <div style="flex:1.2"><div class="sh-seg">${NOMAD_POL.map((p, i) => `<button class="jp-pos ${H.pol === i ? 'on' : ''}" data-act="hs:pol:${i}" ${H.pol === i || H.polAt === S.turn || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>${p[0]}</button>`).join('')}</div><p class="muted small">${esc(NOMAD_POL[H.pol][1])}</p></div></div>
        <div class="acts">${hsBtn('hs:water', 'Караван с водой', '−6 сол. · доверие +', S.treasury >= 6)}${hsBtn('hs:elders', 'Сесть на ковёр к старейшинам', 'доверие +, гвардия морщится', true)}${hsBtn('hs:prophecy', 'Подправить их пророчество', '−5 сол. · интрига', S.treasury >= 5)}${hsBtn('hs:purge', 'Карательный рейд', 'страх +, приправа +3, доверие −14', true)}</div></section>
      <h3 class="sub-h mt">Другие дома на планете</h3>
      <div class="grid">${Game.hsRivals().map(riv).join('')}</div>`;
  },
  tab_throne() {
    const H = Game.hs(), P = Game.hsPillars(), n = P.filter(p => p[1]).length, rel = S.rel.throne || 0;
    return `<p class="lede">Золотой Трон далеко, но видит всё. Его милость решает, кому дозволят войну. Его подозрения решают, против кого. А конечная цель дома, о которой не говорят вслух, — сесть на него самому.</p>
      <div class="cr">
        <section class="card" style="flex:1">${UI.meter('Милость Трона', rel, rel >= 55 ? 'good' : rel >= 30 ? 'warn' : 'bad')}${UI.meter('Подозрения Трона', H.susp, H.susp >= 70 ? 'bad' : H.susp >= 40 ? 'warn' : 'good')}
          <p class="muted small">Подозрения растут, когда у вас сильная гвардия, большой запас приправы или друзья в пустыне. То есть ровно от того, что нужно для заговора. Выше 72 Трон натравит на вас соседей.</p>
          <div class="acts">${hsBtn('hs:court', 'Раболепствовать при дворе', '−8 сол. · подозрения −', S.treasury >= 8)}</div></section>
        <section class="card" style="flex:1.3"><div class="eyebrow">Заговор · опор ${n} из 5</div>
          <ul class="hs-pillars">${P.map(p => `<li class="${p[1] ? 'ok' : ''}"><b>${p[1] ? '◆' : '◇'} ${p[0]}</b> <span class="muted small">${p[2]}</span></li>`).join('')}</ul>
          <p class="muted small">Ударить можно с седьмого года и при трёх опорах. Шанс сейчас: <b>${Math.round(Game.hsStrikeChance() * 100)}%</b>. Способ определит главная ценность дома (${VAL[Game.hsTop()][0].toLowerCase()}). Промах — конец дома.</p>
          <div class="acts">${hsBtn('hs:strike', 'Удар по Трону', S.turn < 24 ? 'рано: двор ещё присматривается' : n < 3 ? 'мало опор' : 'приказ · пути назад не будет', S.turn >= 24 && n >= 3)}</div></section>
      </div>`;
  },
});
const _tabCabH = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabH.call(UI);
  if (!isHouse()) return h;
  const H = Game.hs();
  return h.replace(/У власти ([\d.,]+) г\./, `На Суши $1 г. Приправы: ${Math.round(H.spice)} мер, квота ${H.quota.need} через ${Math.max(1, H.quota.due - S.turn)} кв. ${H.war ? 'Война: ' + HOUSES[H.war.foe].short + '.' : ''}`);
};
const hsText = s => (typeof s === 'string' ? s.replace(/млн/g, 'сол.') : s);
const _renderH = UI.render;
UI.render = function () {
  _renderH.call(UI);
  const old = document.querySelector('#hs-values');
  if (!isHouse()) { if (old) old.remove(); return; }
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; return b; };
  set('cabinet', 'Цитадель'); set('factions', 'Сословия'); set('decrees', 'Указы'); set('world', 'Империя'); set('advisors', 'Ближний круг'); set('log', 'Хроника');
  const H = Game.hs(), core = Game.hsCore(), sb = document.querySelector('.tabs button[data-tab="sush"]');
  if (sb) sb.classList.toggle('alert', !!H.war || H.spice + Game.hsOutput() * Math.max(0, H.quota.due - S.turn) < H.quota.need);
  const html = `<span class="hs-v-h">Ценности дома · «${esc(HOUSES[S.regime].motto)}»</span>` + Object.keys(VAL).map(k => `<div class="hs-v ${k === core ? 'core' : ''} ${k === Game.hsTop() ? 'top' : ''}" title="${esc(VAL[k][2])}"><span>${VAL[k][1]} ${VAL[k][0]}${k === core ? ' · девиз' : ''}</span><div class="hs-v-bar"><i style="width:${H.val[k]}%"></i></div><b>${Math.round(H.val[k])}</b></div>`).join('');
  const stats = document.querySelector('#stats');
  if (stats) { const row = old || document.createElement('div'); row.id = 'hs-values'; row.className = 'hs-values'; row.innerHTML = html; if (!old) stats.insertAdjacentElement('afterend', row); }
  const root = document.querySelector('#screen-game');
  if (root) { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let nd; while ((nd = w.nextNode())) if (nd.nodeValue.includes('млн')) nd.nodeValue = nd.nodeValue.replace(/млн/g, 'сол.'); }
};
const _modalOpenH = Modal.open;
Modal.open = function (html, ...rest) { return _modalOpenH.call(Modal, isHouse() ? hsText(html) : html, ...rest); };
const _toastH = UI.toast;
UI.toast = function (text, ...rest) { return _toastH.call(UI, isHouse() ? hsText(text) : text, ...rest); };
const DIFF_H = { easy: ['Милость Трона', 'Три приказа, квота мягче, заговору легче.'], normal: ['Обычный лен', 'Два приказа. Планета как планета.'], hard: ['Опала', 'Квота растёт быстрее, Трон подозрительнее. Итог ×1,4.'] };
const _renderSetupH = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupH.call(UI);
  if (!UI.setup || UI.setup.era !== HOUSE) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')], st = UI.setup;
  root.querySelector('h1').textContent = 'Сектор 03: феодальный дом';
  ['Эпоха', '1. Лен', '2. Какой дом вы возглавите', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Титул';
  document.querySelector('#btn-begin').textContent = 'Принять лен';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = `Планета Сушь · ${HS_Y}–${HS_Y + 9} годы`;
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_H[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const inp = document.querySelector('#setup-name');
  if (Object.values(HS_NAMES).includes(st.name) && st.name !== HS_NAMES[st.regime]) { st.name = HS_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};
UI.actionHandlers.push(id => {
  if (!/^hs:/.test(id)) return false;
  if (S.phase !== 'hub') return true;
  const p = id.split(':'), out = Game.hsAct(p[1], p[2]);
  if (out) { UI.render(); if (out.text) UI.toast(out.text, out.changes); }
  return true;
});
