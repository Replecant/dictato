// «Диктато 1.2: Тучи над миром»: альтернативный 1970-й, мир, где победила «Ось». Антиутопия без шуток.
// Слой Германии: борьба за преемство при умирающем Фюрере — мирная победа в сенате партии или гражданская война.
// Все действующие лица вымышлены.
const DARK = 'dark70';
const isDark = () => !!S && S.era === DARK;
// Вторая страна версии — Италия (js/italy70.js). Общий слой без шуток работает для обеих.
const DARK_I = 'dark70i';
const isItal = () => !!S && S.era === DARK_I;
// Третья страна — Япония (js/japan70.js)
const DARK_J = 'dark70j';
const isJap = () => !!S && S.era === DARK_J;
// Четвёртый отдельный мир — фэнтези «Мир, которого нет» (js/realm.js). Он не мрачный, но так же отрезан от общего набора событий и указов.
const REALM = 'realm';
const isRealm = () => !!S && S.era === REALM;
// Вторая держава того же мира — вольный город (js/burg.js)
const BURG = 'burg';
const isBurg = () => !!S && S.era === BURG;
// Третья держава — империя (js/crown.js)
const CROWN = 'crown';
const isCrown = () => !!S && S.era === CROWN;
// «Вакуум власти»: корабль исследователей (js/ship.js)
const SHIP = 'ship';
const isShip = () => !!S && S.era === SHIP;
// «Вакуум власти»: феодальный дом (js/house.js)
const HOUSE = 'house';
const isHouse = () => !!S && S.era === HOUSE;
// «Вакуум власти»: империя тысячи солнц (js/domin.js)
const DOMIN = 'domin';
const isDomin = () => !!S && S.era === DOMIN;
const isGloom = () => isDark() || isItal() || isJap() || isRealm() || isBurg() || isCrown() || isShip() || isHouse() || isDomin();

// ---------- державы ----------
FLAGS.reich = FLAGS.germany33;
if (!FLAGS.spain && typeof FLAGS48 !== 'undefined') FLAGS.spain = FLAGS48.spain;
COUNTRIES.italy.leadersD = [[9999, 'дуче Чиано']];
COUNTRIES.japan.leadersD = [[1974.9, 'премьер-министр Киси'], [9999, 'премьер-министр Фукуда']];
COUNTRIES.usa.leadersD = [[1973.05, 'президент Никсон'], [9999, 'президент Голдуотер']];
COUNTRIES.spain.leadersD = [[1975.9, 'каудильо Франко'], [9999, 'адмирал Карреро Бланко']];
const BLOCD = { italy: 'pact', spain: 'pact', japan: 'sphere', usa: 'west' };

// Одежда эпохи: мундир Рейха (вермахт, партия, СС), фуражка с высокой тульёй, штатский костюм с партийным значком
const DARK_LOOK = (color, extra = {}) => { const ss = color === '#17181a', c = ss ? '#141416' : '#5d665c'; return { outfit: 'tunic70', branch: ss ? 'ss' : 'heer', outfitColor: c, hat: 'schirm', hatColor: c, hatBand: ss ? '#0c0c0d' : '#2c3a30', hatMetal: '#c9ccd0', glasses: 'none', beard: 'none', cigar: false, tie: 'none', ...extra }; };
const DARK_SUIT = (color, extra = {}) => ({ outfit: 'suit', outfitColor: color, hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: '#2a2a2a', medals: 0, pin: true, ...extra });
const DARK_PARTEI = (extra = {}) => ({ outfit: 'tunic70', branch: 'partei', outfitColor: '#7a5a36', hat: 'none', hatColor: '#7a5a36', hatBand: '#5a3f22', hatMetal: '#c9a640', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 1, ...extra });

// ---------- режимы: с какой опорой вы входите в борьбу ----------
Object.assign(REGIME_TYPES, {
  partei70: {
    name: 'Партийная канцелярия', icon: '🗂️',
    desc: 'Вы — рейхсляйтер, тридцать лет в аппарате. Личные дела гауляйтеров лежат в вашем сейфе. Армия считает вас канцеляристом, СС — конкурентом.',
    fx: { fear: 6 }, fac: { faith: { a: 22 }, hawks: { a: -10 }, liberals: { a: -8 } }, rel: {},
  },
  heer70: {
    name: 'Вермахт', icon: '⚔️',
    desc: 'Вы — генерал-фельдмаршал, командовали группой армий на Востоке. Гарнизоны пойдут за вами. Партия боится военной диктатуры, СС ждёт повода.',
    fx: { army: 12 }, fac: { hawks: { a: 25, s: 6 }, faith: { a: -10 } }, rel: {},
  },
  techno70: {
    name: 'Министерство вооружений', icon: '⚙️',
    desc: 'Вы — рейхсминистр вооружений и хозяйства. Концерны обязаны вам заказами, молодые чиновники ждут от вас перемен. Старая гвардия называет вас либералом. Это не похвала.',
    fx: { economy: 5, treasury: 15 }, fac: { oligarchs: { a: 20 }, liberals: { a: 18 }, faith: { a: -8 } }, rel: { usa: 6 },
  },
});
Object.assign(DEFAULT_PILLARS, { partei70: ['faith', 'left'], heer70: ['hawks', 'oligarchs'], techno70: ['oligarchs', 'liberals'] });
REGIME_TITLES.reich70 = { partei70: 'Рейхсляйтер', heer70: 'Генерал-фельдмаршал', techno70: 'Рейхсминистр' };
REGIME_SETUP_LOOK.reich70 = {
  partei70: DARK_PARTEI({ cross: false, pin: false }),
  heer70: DARK_LOOK('#5d665c', { medals: 5, cross: true, pin: false }),
  techno70: DARK_SUIT('#2a2d33', { tie: '#3a3a3a', branch: '', cross: false }),
};
function darkSetupLook(st, key) {
  const L = st.look, mil = st.regime === 'heer70';
  if (key === 'outfit') Object.assign(L, L.outfit === 'tunic70' ? (mil ? DARK_LOOK('#5d665c', { medals: 5, cross: true, hat: L.hat, glasses: L.glasses }) : DARK_PARTEI({ hat: L.hat, glasses: L.glasses })) : DARK_SUIT('#2a2d33', { tie: '#3a3a3a', branch: '', cross: false, hat: L.hat, glasses: L.glasses }));
  if (key === 'hat' && L.hat === 'schirm') Object.assign(L, L.outfit === 'tunic70' && L.branch === 'partei' ? { hatColor: '#7a5a36', hatBand: '#5a3f22', hatMetal: '#c9a640' } : { hatColor: '#5d665c', hatBand: '#2c3a30', hatMetal: '#c9ccd0' });
}
for (const k of ['partei70', 'heer70', 'techno70']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK.reich70[k], glasses: 'none', sash: '', mustache: 'none', hair: 'short', bluetooth: false };
REGION_TITLES.reich70 = ['Рейхсляйтер', 'Генерал-фельдмаршал', 'Рейхсминистр'];
Object.assign(TITLE_FORMS, {
  'Рейхсляйтер': ['Рейхсляйтера', 'Рейхсляйтером'], 'Генерал-фельдмаршал': ['Генерал-фельдмаршала', 'Генерал-фельдмаршалом'], 'Рейхсминистр': ['Рейхсминистра', 'Рейхсминистром'],
  'Фюрер': ['Фюрера', 'Фюрером'], 'Рейхсканцлер': ['Рейхсканцлера', 'Рейхсканцлером'], 'Рейхспрезидент': ['Рейхспрезидента', 'Рейхспрезидентом'],
});

// ---------- страна ----------
const LD = o => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', ...o });
REGIONS.reich70 = {
  name: 'Германия', short: 'Германия',
  blurb: 'Сталь, уголь и принудительный труд от Рейна до Урала. Гитлеру восемьдесят один год. Он болен, и об этом запрещено говорить. Партия, армия, СС и концерны готовятся к дню, который нельзя называть.',
  country: 'Великогерманский рейх', capital: 'Берлин', currency: 'рейхсмарка',
  exports: 'сталь, машины и уголь', exportGen: 'стали', company: 'концерн «Остверке»', patron: 'italy',
  sport: 'имперское первенство', rival: 'Японская империя', rivalShort: 'Япония',
  disputed: 'линия раздела в Сибири', faithLeader: 'Рейхсляйтер', capitalSquare: 'площади перед Большим залом',
  jungle: 'лесах на Востоке', nephew: 'Клаус',
  countries: ['italy', 'japan', 'usa', 'spain'],
  relInit: { italy: 55, japan: 34, usa: 22, spain: 50 },
  flag: FLAGS.germany33,
  leaderSkin: 'light', era: DARK, style: 'german', faithStyle: 'party', exile: 'Мадриде', critters: 'подданных',
  factions: {
    left: { name: 'Трудовой фронт', short: 'Трудовой фронт', icon: '🔧', desc: 'Двадцать пять миллионов членов по обязанности. Заводские уполномоченные знают, сколько на самом деле стоит хлеб и чего стоит норма выработки.' },
    liberals: { name: 'Реформисты', short: 'Реформисты', icon: '📐', desc: 'Молодые статс-секретари, инженеры и студенты. Вслух говорят о «рационализации». Между собой — о том, что так дальше нельзя.' },
    faith: { name: 'Партийный аппарат', short: 'Партия', icon: '🗂️', desc: 'Гауляйтеры и рейхсляйтеры. Каждый гау — удельное княжество. Сенат партии назовёт преемника, когда придёт день.' },
    oligarchs: { name: 'Концерны', short: 'Концерны', icon: '🏭', desc: 'Сталь, химия, уголь. Заводы стоят на заказах государства и на труде людей, которых никто не спрашивал. Директора хотят порядка и не хотят войны.' },
    hawks: { name: 'Вермахт', short: 'Вермахт', icon: '⚔️', desc: 'Генералитет помнит победу и считает её своей. Четверть века гарнизонной службы на Востоке научила офицеров не доверять ни партии, ни СС.' },
  },
  advisors: {
    defense: { name: 'Генерал-лейтенант Отто Брандис', bio: 'Ваш человек в штабе армии резерва. Знает, какой гарнизон чей.', look: LD({ face: 'square', hair: 'short', hairColor: '#8a8a8a', ...DARK_LOOK('#5d665c', { medals: 4 }) }) },
    economy: { name: 'Статс-секретарь Гюнтер Маас', bio: 'Двадцать лет сводит баланс, который не сходится. Знает настоящие цифры.', look: LD({ face: 'long', hair: 'combover', hairColor: '#6a6a6a', glasses: 'round', brows: 'worried', outfit: 'suit', outfitColor: '#33363b', tie: '#2a2a2a' }) },
    police: { name: 'Криминальдиректор Йозеф Реттих', bio: 'Ваш источник в государственной полиции. Работает на вас, пока это безопаснее, чем не работать.', look: LD({ face: 'oval', hair: 'slick', hairColor: '#2a2a2a', brows: 'angry', outfit: 'suit', outfitColor: '#1f2023', tie: '#1a1a1a' }) },
    propaganda: { name: 'Главный редактор Курт Лемке', bio: 'Тридцать лет пишет передовицы. Давно не читает их сам.', look: LD({ face: 'round', hair: 'bald', hairColor: '#777', glasses: 'square', outfit: 'suit', outfitColor: '#3a3530', tie: '#4a2a2a' }) },
    foreign: { name: 'Посланник Герхард фон Айкен', bio: 'Служил в Риме, Токио и Мадриде. Знает, что о Рейхе говорят союзники, когда немцы выходят из комнаты.', look: LD({ face: 'long', hair: 'slick', hairColor: '#b0b0b0', mustache: 'pencil', outfit: 'suit', outfitColor: '#26282d', tie: '#2f3a4a' }) },
  },
};
REGION_TALK.reich70 = { addr: 'господин рейхсляйтер', sir: 'господин', lady: 'госпожа', holiday_acc: 'День труда', holiday_dat: 'Дню труда', gringo: 'американцы', haven: 'Цюрих', exileTo: 'Мадрид', canteen: 'суп по карточкам', fruit_adj: 'Стальной', locale: 'Рейха', pay_in_kind: 'Углём.', vegas: 'курорт для отличившихся', rebel: 'Человек из подполья', meeting: 'в охотничьем доме' };
FAITH_TALK.party = { priest_open: '', heavens: 'партии', faith_quip: 'Партия ничего не забывает.', sermon: 'речи на собрании гау', faith_appeal: 'Об этом узнает партийный суд.', temple_loc: 'в партийном доме', righteous: 'Гауляйтеры называют вас «старым бойцом»' };
FAITH_TITLE.party = 'Гауляйтер';
PAPERS.reich70 = ['Имперский обозреватель', 'листовки подполья'];

LEADER_STYLE.reich70 = {
  left: { male: true, title: 'Уполномоченный', look: DARK_SUIT('#4a4640', { mustache: 'thick', tie: 'none' }) },
  liberals: { male: true, title: 'Статс-секретарь', look: DARK_SUIT('#30343a', { glasses: 'round', mustache: 'none' }) },
  faith: { male: true, title: 'Гауляйтер', look: { hair: 'combover', hairColor: '#777', mustache: 'none', trim: '', ...DARK_PARTEI() } },
  oligarchs: { male: true, title: 'Директор', look: DARK_SUIT('#1d1e22', { mustache: 'none', glasses: 'square' }) },
  hawks: { male: true, title: 'Генерал-полковник', look: DARK_LOOK('#5d665c', { medals: 5, mustache: 'none', cross: true }) },
  new: { male: true, title: 'Обергруппенфюрер', look: DARK_LOOK('#17181a', { medals: 2, mustache: 'none' }) },
};
NEW_FACTIONS[DARK] = {
  name: 'СС', short: 'СС', icon: '☠️',
  desc: 'Государство в государстве: собственные дивизии, собственные заводы, собственные лагеря и собственный суд. Отчитывается только перед Фюрером. Скоро отчитываться будет не перед кем.',
  rivals: ['hawks', 'liberals'], risk: 'coup', appear: () => true,
  intro: 'Рейхсфюрер СС Конрад Феллер привёл охранные отряды в повышенную готовность. Официально — учения.',
  grow: S => (S.fear - 45) / 60 + ((S.budget.police || 50) - 50) / 80,
};
function npcD(key) {
  const M = {
    doctor: { name: 'Профессор Морелль-младший, лейб-медик', look: LD({ face: 'round', hair: 'bald', hairColor: '#999', glasses: 'round', brows: 'worried', outfit: 'suit', outfitColor: '#d8d8d2', tie: 'none' }) },
    ss: { name: 'Штандартенфюрер СС', look: LD({ face: 'long', hair: 'short', hairColor: '#c9b48a', brows: 'angry', ...DARK_LOOK('#17181a', { medals: 1 }) }) },
    gauleiter: { name: 'Гауляйтер', look: LD({ face: 'round', hair: 'combover', hairColor: '#777', ...DARK_PARTEI() }) },
    general: { name: 'Генерал-полковник', look: LD({ face: 'square', hair: 'short', hairColor: '#999', ...DARK_LOOK('#5d665c', { medals: 5 }) }) },
    director: { name: 'Директор концерна', look: LD({ face: 'round', hair: 'bald', hairColor: '#888', glasses: 'square', ...DARK_SUIT('#1d1e22') }) },
    worker: { name: 'Заводской уполномоченный', look: LD({ face: 'square', hair: 'short', hairColor: '#333', mustache: 'thick', ...DARK_SUIT('#4a4640', { tie: 'none' }) }) },
    student: { name: 'Студент', look: LD({ face: 'long', hair: 'short', hairColor: '#5a4a3a', glasses: 'round', ...DARK_SUIT('#3a3d44', { tie: 'none' }) }) },
    colonel: { name: 'Полковник караульного полка', look: LD({ face: 'square', hair: 'short', hairColor: '#555', brows: 'angry', ...DARK_LOOK('#5d665c', { medals: 2 }) }) },
    kanzlei: { name: 'Начальник рейхсканцелярии', look: LD({ face: 'long', hair: 'combover', hairColor: '#8a8a8a', glasses: 'round', ...DARK_PARTEI({ medals: 2 }) }) },
    reporter: { name: 'Корреспондент римской газеты', look: { skin: SKIN.tan, face: 'oval', hair: 'curly', hairColor: '#2a2018', mustache: 'pencil', brows: 'normal', mouth: 'smile', ...DARK_SUIT('#3a3530', { tie: '#5a2a2a', pin: false }) } },
    bishop: { name: 'Епископ', look: LD({ face: 'round', hair: 'bald', hairColor: '#aaa', glasses: 'round', outfit: 'robe', outfitColor: '#1d1d1d', trim: '#6a2a5a', hat: 'none' }) },
    komissar: { name: 'Рейхскомиссар', look: LD({ face: 'round', hair: 'bald', hairColor: '#888', ...DARK_PARTEI({ medals: 3 }) }) },
    nuntius: { name: 'Папский нунций', look: { skin: SKIN.light, face: 'long', hair: 'bald', hairColor: '#aaa', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'round', outfit: 'robe', outfitColor: '#1d1d1d', trim: '#8e1b1b', hat: 'none' } },
    spain_amb: { name: 'Посол Испании', look: { skin: SKIN.tan, face: 'long', hair: 'slick', hairColor: '#333', mustache: 'thick', brows: 'normal', mouth: 'flat', ...DARK_SUIT('#26282d', { pin: false }) } },
    elder: { name: 'Староста', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#999', beard: 'full', mustache: 'thick', brows: 'worried', mouth: 'flat', outfit: 'suit', outfitColor: '#4a4640', tie: 'none', hat: 'none' } },
    rebel: { name: 'Человек из толпы', look: LD({ face: 'oval', hair: 'short', hairColor: '#333', brows: 'angry', ...DARK_SUIT('#4a4640', { tie: 'none' }) }) },
    italy_amb: { name: 'Посол Италии', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#222', mustache: 'pencil', brows: 'normal', mouth: 'flat', ...DARK_SUIT('#26282d') } },
    japan_amb: { name: 'Посол Японии', look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'round', ...DARK_SUIT('#1d1e22') } },
    usa_amb: { name: 'Поверенный в делах США', look: LD({ face: 'square', hair: 'short', hairColor: '#b89a5a', ...DARK_SUIT('#2a3340') }) },
  };
  return M[key] || null;
}

// ---------- эпоха ----------
ERAS[DARK] = {
  name: '1970-е', label: 'Тучи над миром', start: 1970, turns: 60, dark: true,
  blurb: 'Мир, где победил Третий рейх. Адольф Гитлер умирает, и четыре силы делят наследство, пока он ещё дышит.',
  regions: ['reich70'], regimes: ['partei70', 'heer70', 'techno70'], titles: ['Рейхсляйтер'],
  intro: '',
  aid: [],
  vars: { mast: 'ИМПЕРСКИЙ ОБОЗРЕВАТЕЛЬ', blame: 'враги Рейха', student_meme: '', swim_ref: '', rebel_icon: 'листовку', friendly_paper: 'римской газете', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' },
  defaultNames: { reich70: 'Вальтер Хартунг' },
};
const DARK_SETUP = {
  world: 'dark', era: DARK, region: 'reich70', regime: 'partei70', name: 'Вальтер Хартунг', title: 'Рейхсляйтер', country: REGIONS.reich70.country, diff: 'normal',
  look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#6a6a6a', mustache: 'none', brows: 'normal', mouth: 'flat', sash: '', ...DARK_PARTEI() },
};

// ---------- роли и общие тексты без шуток ----------
const ROLES_D = {
  defense: { title: 'Военный министр', action: 'Смотр верных частей', actionDesc: 'Гарнизоны видят, кто о них помнит. Армия довольна, казна тратится.' },
  economy: { title: 'Министр хозяйства', action: 'Хозяйственная программа', actionDesc: 'Заказы, сырьё, рабочая сила. Экономика растёт, если расчёты верны.' },
  police: { title: 'Шеф полиции', action: 'Аресты по спискам', actionDesc: 'Недовольные замолкают, страх растёт.' },
  propaganda: { title: 'Министр печати', action: 'Кампания в печати', actionDesc: 'Газеты и радио говорят о вас. Поддержка растёт, пока им верят.' },
  foreign: { title: 'Министр иностранных дел', action: 'Поездка по столицам пакта', actionDesc: 'Рим, Мадрид, Токио. Отношения улучшаются.' },
};
const _eraLookD = Game.eraLook;
Game.eraLook = function () {
  _eraLookD.call(Game);
  STAT_NAMES.treasury = 'Казна';
  if (!isDark()) return;
  for (const r of Object.keys(ROLES_D)) Object.assign(ROLES[r], ROLES_D[r]);
  STAT_NAMES.swiss = 'Личный фонд'; darkNames();
  SLIDERS.spend.find(d => d.k === 'palace').hint = 'Уходит в ваш личный фонд в Цюрихе';
};
const _bankD = Game.bank;
Game.bank = function () { return isDark() ? { name: 'Личный фонд', short: 'Личный фонд', to: 'Цюрих', at: 'в Цюрихе', acc: 'ваш личный фонд в Цюрихе', ins: 'личным фондом', dat: 'личному фонду в Цюрихе' } : _bankD.call(Game); };
const _blocD = Game.bloc;
Game.bloc = function () { return isDark() ? (Game.suc().phase === 'rule' ? 'Глава Рейха' : Game.suc().phase === 'war' ? 'Гражданская война' : 'Борьба за преемство') : _blocD.call(Game); };
const _varsD = Game.vars;
Game.vars = function () {
  const v = _varsD.call(Game);
  if (!isDark()) return v;
  const U = S.suc || {};
  if (U.rivals && U.phase !== 'rule') { const k = Game.sucTop()[0], n = RIVALS_D[k].name; v.rivTop = n[0].toUpperCase() + n.slice(1); v.rivTopShort = RIVALS_D[k].short; }
  if (U.phase === 'rule') {
    const hot = Game.colHot(), rich = Game.colRich(), gone = Game.colGone(), ro = Game.rivOld();
    const auto = Game.colAuto();
    if (hot) { v.colHot = COL_D[hot].name; v.colHotShort = COL_D[hot].short; v.colHotIn = COL_D[hot].loc; v.colHotOf = COL_D[hot].gen; v.colHotFrom = COL_D[hot].from; }
    if (rich) { v.colRich = COL_D[rich].name; v.colRichIn = COL_D[rich].loc; }
    if (gone) { v.colGone = COL_D[gone].short; v.colGoneIn = COL_D[gone].loc; }
    if (auto) v.colAutoOf = COL_D[auto].gen;
    if (ro) { v.rivOld = RIVALS_D[ro].name[0].toUpperCase() + RIVALS_D[ro].name.slice(1); v.rivOldShort = RIVALS_D[ro].short; }
  }
  v.addr = U.phase === 'rule' ? 'мой фюрер'
    : { partei70: 'господин рейхсляйтер', heer70: 'господин фельдмаршал', techno70: 'господин рейхсминистр' }[S.regime];
  return v;
};
// Замены в общих текстах движка: в этой эпохе не шутят
const TD = [
  ['Каждый указ стоит один приказ.', 'Каждое распоряжение стоит один приказ.'],
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Победители четверть века делят мир и не доверяют друг другу. Договоры держатся, пока выгодны.'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ваш штаб. Лояльность ниже 25 — и человек может вас сдать. Уволенного заменит родственник: предан, но не слишком способен.'],
  ['Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!', 'Фонды почти исчерпаны. Нужно урезать расходы.'],
  ['Офицеры недовольны. Поднимите бюджет армии или устройте парад.', 'Офицеры недовольны. Нужны деньги гарнизонам или смотр.'],
  ['Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!', 'Сводки о настроениях плохие. Нужны хлеб по карточкам без перебоев и кампания в печати.'],
  ['предан, но не слишком умён', 'предан, но не слишком способен'],
  ['Риск переворота', 'Риск путча'], ['Риск революции', 'Риск стачки'],
  ['У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.', 'У Рейха не осталось ни одного надёжного союзника.'],
  ['В столице спокойно. Подозрительно спокойно. Я слежу.', 'В столице спокойно. Сводки без происшествий.'],
  ['набирает силу. У меня есть списки.', 'набирает силу.'],
  ['Семья — это надёжно.', ''],
  ['Летопись правления', 'Хроника'],
  ['Казна в минусе! Армии задерживают жалованье, банки требуют проценты.', 'Фонды в минусе. Гарнизонам задерживают жалованье.'],
  ['Счёт в Швейцарии', 'Личный фонд'],
  ['Новое требование движения ', 'Новое требование: '],
  ['пришёл к власти. Режим:', 'вступил в борьбу за преемство. Опора:'],
  ['Подарить виллу', 'Наградить деньгами'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с силами Рейха, распоряжения, визиты, поручения министрам'],
  ['Проекты и указы — на вкладке «Указы».', 'Большие проекты и распоряжения — на вкладке «Проекты Рейха».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Армия ниже 45 и недовольные вермахт или СС — к путчу. Народ ниже 30 — к всеобщей стачке.'],
  ['Деньги «нужд дворца» уходят на', 'Часть расходов канцелярии уходит на'],
  ['⏳ У власти', '⏳ Прошло'], ['>Новый режим<', '>Новая партия<'], ['★ Оценка историков', '★ Итог'],
  ['Ночью во дворце зазвонил телефон', 'Ночью зазвонил телефон'],
  ['во дворце, без приглашения', 'у вас, без приглашения'],
  ['Остальные движения внимательно смотрят, что ещё можно у вас выпросить', 'Остальные внимательно смотрят, чем это кончится'],
  ['в посольстве недовольны', 'союзник недоволен'],
];
// Вкладка сил: те же механики, другие слова
const TD_FAC = [['опора режима', 'ваша опора'], ['>легально<', '>действует<'], ['>под запретом<', '>вне закона<'], ['Сейчас никто ничего не требует. Наслаждайтесь тишиной.', 'Сейчас никто ничего не просит.'],
  ['Трус', 'Осторожный'], ['Торгаш', 'Продажный'], ['Горлопан', 'Резкий'], ['Фанатик', 'Убеждённый'], ['Позёр', 'Тщеславный'], ['Прагматик', 'Расчётливый'], ['Мучеников из трусов не выходит.', ''], ['Охотно идёт во власть: места в правительстве и министерский пост доступны раньше.', 'Охотно идёт на сделку: обещанные посты и место в вашем штабе доступны раньше.'], ['Обожает внимание: переговоры работают лучше, а орден на грудь творит чудеса.', 'Любит внимание: переговоры с ним идут легче.'], ['Арест превратит лидера в мученика.', 'Тронуть его — сделать из него знамя.'], ['Движение под ним растёт быстрее', 'Сила под ним растёт быстрее'], ['Арест превратит лидера в мученика.', 'Его арест сделает из него знамя.'],
  ['у движения', 'у силы'], ['каждого движения', 'каждой силы'], ['не больше двух движений', 'не больше двух сил'], ['Движения действуют сами', 'Силы действуют сами'], ['Требования движений', 'Требования сил'],
  ['движение крепнет', 'сила крепнет'], ['движение пару кварталов', 'она пару кварталов'], ['молебны', 'собрания'], ['проповеди', 'жалобы в партийный суд'], ['Опора режима', 'Ваша опора'],
  ['Сделать лидера министром', 'Взять лидера в штаб'], ['Места в правительстве', 'Обещать посты'], ['Запретить', 'Объявить вне закона'], ['Легально', 'Действует'], ['ЛЕГАЛЬНО', 'ДЕЙСТВУЕТ']];
const _tabFacD = UI.tab_factions;
UI.tab_factions = function () {
  let h = _tabFacD.call(UI);
  if (!isDark()) return h;
  if (darkPre()) {
    h = h.replace(/^[\s\S]*?(?=<section class="card dem-summary">)/, `<p class="lede">Шесть сил, которые в «день икс» решат, кто станет главой Рейха. <b>Сила</b> — сколько у них людей и влияния, <b>одобрение</b> — насколько они готовы видеть преемником вас. Вы не можете им приказывать: только договариваться, платить и обещать. На двух из них можно опереться: их одобрение растёт само, переговоры идут легче, остальные ревнуют.</p>
      <p class="lede">Силы действуют сами: довольные помогают деньгами и людьми, недовольные вредят, а доведённые до края приходят с ультиматумом. Сейчас вы опираетесь на: <b>${(S.pillars || []).map(f => Game.facDef(f).name).join(' и ') || 'никого'}</b>.</p>`);
    h = h.replace(/<p class="muted small">Одновременно[\s\S]*?<\/p>/, '<p class="muted small">Силы просят у претендента обещаний и услуг: одновременно не больше двух просьб, на ответ даётся 5–8 кварталов. Выполнили — одобрение +18. Не ответили — одобрение падает на 12, а сила крепнет.</p>');
    h = h.split('<span class="chip legal">легально</span>').join('').split('Требования движений').join('Чего от вас хотят');
  }
  return TD_FAC.reduce((a, [f, t]) => a.split(f).join(t), h);
};
const _tabWorldD = UI.tab_world;
UI.tab_world = function () {
  const h = _tabWorldD.call(UI);
  if (!darkPre()) return h;
  return h.replace(/^<p class="lede">[\s\S]*?<\/p>/, '<p class="lede">Вы не глава Рейха: договоров не подписываете и послов не высылаете. Но столицы пакта присматриваются к претендентам. Кто был с ними вежлив до «дня икс», тому Рим поможет, если дело дойдёт до оружия, а Мадрид даст убежище, если всё кончится плохо. Здесь — ваши личные отношения с ними.</p>');
};
// Проекты советников в этой версии отключены — убираем и пустой раздел о них
const _tabAdvD = UI.tab_advisors;
UI.tab_advisors = function () {
  const h = _tabAdvD.call(UI);
  if (!isGloom()) return h;
  const out = h.replace(/^[\s\S]*?(?=<p class="lede">)/, '');
  return darkPre() ? out : out.replace('Ваш кабинет. Лояльность ниже 25 — и советник может предать.', 'Ваши министры. Лояльность ниже 25 — и министр может вас сдать.');
};
const _tabCabD = UI.tab_cabinet;
UI.tab_cabinet = function () {
  if (isDark() && !darkPre()) {
    const U = Game.suc(), yrs = ((S.turn - (U.wonAt === undefined ? S.turn : U.wonAt)) / 4).toFixed(1).replace('.0', '').replace('.', ',');
    const course = { old: 'Курс: всё как при Гитлере. Опора — партия и СС.', thaw: 'Курс: лагеря распущены, СС ограничена. Опора — реформисты и Трудовой фронт.', army: 'Курс: власть армии. Опора — вермахт и концерны.' }[U.course] || '';
    return _tabCabD.call(UI).replace(/У власти [\d.,]+ г\./, `${U.wonBy === 'war' ? 'Взяли власть оружием' : 'Избраны сенатом партии'}. У власти ${yrs} г. ${course}`);
  }
  if (!darkPre()) return _tabCabD.call(UI);
  const U = Game.suc(), war = U.phase === 'war' && U.war && !U.war.over, B = Game.budgetCalc(), cr = Game.riskWord(Game.coupRisk());
  const my = Game.sucScore() + Game.sucPactBonus(), [topK, top] = Game.sucTop(), ss = U.rivals.ss.infl;
  const tips = [];
  if (war) tips.push(['defense', 'Война решается гарнизонами и деньгами. Каждый квартал без победы разрушает то, за что мы воюем.']);
  if (!war && U.expo >= 45) tips.push(['police', 'За вами смотрят. Пропустите квартал или идите на доклад к Фюреру, пока вас не вызвали самого.']);
  if (!war && ss >= 55) tips.push(['police', 'Феллер слишком силён. Даже если сенат назовёт вас, СС не подчинится. Нужны материалы в партийный суд.']);
  if (!war && my < top.infl) tips.push(['propaganda', `В сенате вы пока не первый: впереди ${RIVALS_D[topK].short}. У партии треть голосов — начинать надо с гауляйтеров.`]);
  if (!war && U.ready < 20) tips.push(['defense', 'Если дело дойдёт до оружия, нам нечем ответить. В гарнизонах столицы нет ни одного нашего командира.']);
  if (S.treasury < 10) tips.push(['economy', 'Фонды на исходе. Нужны взносы концернов или сбор средств.']);
  if (!tips.length) tips.push(['police', 'В канцелярии тихо. Списки ведут, но вашей фамилии в первой десятке нет.']);
  const tip = tips[0];
  return `<div class="cab">
      <section class="card leader-card">
        <div class="leader-portrait">${Portrait.svg(S.leader.look)}</div>
        <div class="leader-info">
          <div class="eyebrow">Претендент · ${esc(Game.regimeDef(S.regime).name)}</div>
          <h2>${esc(S.leader.title)}<br>${esc(S.leader.name)}</h2>
          <p class="muted">${war ? `Гражданская война, ${U.war.q + 1}-й квартал. Под вашим контролем ${Math.round(U.war.ctrl)}% Рейха.` : `Фюрер ${healthWord(U.health)}. По оценке вашего врача, ему осталось кварталов: <b>${Math.max(1, Math.min(23 - S.turn, Math.round(U.health / 3)))}</b>.`} Партия идёт до ${Game.endYear()} года.</p>
          <div class="risk-row">
            <div class="risk ${war ? 'ok' : cr.c}"><span>Риск ареста</span><b>${war ? 'война' : cr.w}</b></div>
            <div class="risk ${my >= top.infl ? 'ok' : 'high'}"><span>Вес в сенате</span><b>${my} против ${Math.round(top.infl)}</b></div>
            <div class="risk ${B.net < 0 ? 'high' : 'ok'}"><span>Фонды за квартал</span><b>${B.net >= 0 ? '+' : '−'}${Math.abs(B.net).toFixed(0)} млн</b></div>
          </div>
        </div>
      </section>
      <section class="card tip-card">
        <div class="mini-portrait">${Portrait.svg(S.adv[tip[0]].look)}</div>
        <div><div class="eyebrow">${ROLES[tip[0]].title} · ${esc(S.adv[tip[0]].name)}</div><p class="quote">«${esc(tip[1])}»</p></div>
      </section>
      <section class="card chart-card">
        <div class="eyebrow">Положение в Рейхе</div>
        ${Charts.lines(S.statHist, [['support', 'Народ', 'var(--c-support)'], ['army', 'Армия', 'var(--c-army)'], ['economy', 'Хозяйство', 'var(--c-economy)'], ['fear', 'Страх', 'var(--c-fear)']])}
        <p class="muted small">Этим вы пока не управляете: хозяйство, армия и страх — в руках канцелярии. Вы получите их вместе с властью — в том состоянии, в каком они будут.</p>
      </section>
      <section class="card help-card">
        <div class="eyebrow">Как вести борьбу</div>
        <ul>
          <li>Каждый квартал у вас <b>${Game.apTurn()} приказа</b> своим людям: агитация, интриги, разговоры с силами Рейха, поручения штабу.</li>
          <li><b>«Агитация»</b> поднимает одобрение сил. Из него складывается ваш вес в сенате партии.</li>
          <li><b>«Преемник»</b> — расклад в сенате и интриги: материалы на соперников, союз, свои офицеры в гарнизонах.</li>
          <li>Подозрения канцелярии выше 55 — и вас вызовут для объяснений. Помогают доклад у Фюрера, проверка окружения и квартал тишины.</li>
          <li>Бюджета и распоряжений у вас нет. Они появятся вместе с властью.</li>
        </ul>
        <button class="btn ghost small" data-act="retire">Выйти из борьбы…</button>
        <div class="confirm" id="retire-confirm" hidden><p>Сдать дела и уехать в поместье? Партия на этом закончится.</p><button class="btn danger small" data-act="retire-yes">Да, выйти</button> <button class="btn ghost small" data-act="retire-no">Остаться</button></div>
      </section>
    </div>`;
};
// Шапка претендента: не показатели державы, а его собственное положение
Game.statsHtml = () => {
  if (!darkPre()) return '';
  const U = Game.suc(), war = U.phase === 'war' && U.war && !U.war.over, my = Game.sucScore() + Game.sucPactBonus(), [topK, top] = Game.sucTop();
  const tile = (ic, name, val, pct, lvl, unit = '') => `<div class="stat ${lvl}" title="${name}"><span class="stat-ic" aria-hidden="true">${ic}</span><span class="stat-name">${name}</span><b class="stat-val">${val}${unit}</b><span class="bar"><span style="width:${clamp(pct)}%"></span></span></div>`;
  return [
    tile('💰', 'Ваши фонды', Math.round(S.treasury), S.treasury / 1.5, S.treasury < 0 ? 'bad' : '', '<small> млн</small>'),
    tile('⚖️', 'Вес в сенате', my, my, my >= top.infl ? 'good' : 'warn'),
    tile('🎯', `Соперник: ${RIVALS_D[topK].short}`, Math.round(top.infl), top.infl, ''),
    war ? tile('🗺️', 'Контроль над Рейхом', Math.round(U.war.ctrl), U.war.ctrl, U.war.ctrl >= 60 ? 'good' : U.war.ctrl >= 35 ? 'warn' : 'bad', '<small> %</small>') : tile('👁️', 'Подозрения', Math.round(U.expo), U.expo, U.expo >= 55 ? 'bad' : U.expo >= 35 ? 'warn' : 'good'),
    tile('🪖', 'Гарнизоны', Math.round(U.ready), U.ready, U.ready >= 25 ? 'good' : 'warn'),
    war ? tile('⏳', 'Квартал войны', U.war.q + 1, (U.war.q + 1) * 10, U.war.q >= 7 ? 'bad' : '') : tile('🩺', 'Фюрер', `<span class="stat-txt">${healthWord(U.health)}</span>`, U.health, ''),
  ].join('');
};
const _renderD = UI.render;
UI.render = function () {
  _renderD.call(UI);
  const pre = darkPre(), set = (t, dark, base) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = isDark() ? dark : base; };
  set('cabinet', pre ? 'Штаб' : 'Канцелярия', 'Кабинет'); set('factions', 'Силы Рейха', 'Движения'); set('decrees', 'Проекты Рейха', 'Указы');
  set('world', pre ? 'Союзники' : 'Мир', 'Мир'); set('advisors', pre ? 'Ваши люди' : 'Министры', 'Советники'); set('log', 'Хроника', 'Летопись');
};
// ---------- отладка разработчика: старт с момента признания главой Рейха ----------
const DarkDebug = {
  // how: 'peace' — сцена избрания, 'war' — сцена победы в войне, 'rule' — сразу правление; course — курс для 'rule'
  start(how = 'peace', course = 'old') {
    const st = UI.setup && UI.setup.world === 'dark' ? UI.setup : JSON.parse(JSON.stringify(DARK_SETUP));
    const nm = document.querySelector('#setup-name');
    if (UI.setup === st && nm && nm.value.trim()) st.name = nm.value.trim();
    st.title = REGIME_TITLES.reich70[st.regime]; st.country = REGIONS.reich70.country;
    Game.newGame(st);
    const U = Game.suc();
    // пять лет борьбы «прошли»: I квартал 1975 года, Фюрер умер, силы Рейха за вас
    S.turn = 20; S.year = 1975; S.q = 1; S.ap = Game.apTurn();
    U.health = 0; U.expo = 30; U.auth = 8; U.ready = how === 'war' ? 60 : 25; S.flags.fuhrerDead = true;
    for (const [f, d] of Object.entries({ faith: 18, hawks: 10, oligarchs: 8, left: 8 })) S.fac[f].a = clamp(S.fac[f].a + d);
    for (const R of Object.values(U.rivals)) { R.base += 6; R.infl = clamp(R.infl + rnd(2, 6)); }
    U.rivals.ss.infl = Math.min(U.rivals.ss.infl, 52);
    S.treasury = 60; S.statHist = Array.from({ length: 21 }, (_, i) => ({ ...Game.snapshotStats(), t: i, support: 46 + Math.sin(i / 3) * 3, economy: 44 - i / 10, army: 60 + i / 6, fear: 54 + Math.cos(i / 4) * 3 }));
    S.hist = HISTORY_D.filter(h => h.at[0] < 1975).map(h => h.head);
    Game.log('Отладка: пять лет борьбы за преемство пропущены.');
    if (how === 'war') { U.hadWar = true; U.war = { kind: 'legit', enemy: 'ss', q: 4, ctrl: 84, promised: false, rome: false }; S.economy = clamp(S.economy - 10); S.support = clamp(S.support - 6); }
    Game.sucWin(how === 'war' ? 'war' : 'peace');
    if (how === 'rule') { U.triumph = true; U.courseAsked = true; Game.apply({ sucCourse: ['old', 'thaw', 'army'].includes(course) ? course : 'old' }, { silent: true }); }
    document.body.dataset.era = S.era;
    UI.show('screen-game'); UI.tab = 'cabinet'; S.phase = 'hub';
    Game.save(); UI.render();
    if (how !== 'rule') UI.startQuarter(); // сцена победы и выбор курса
    return S;
  },
};
// Экран создания: вы не «приходите к власти», вы вступаете в борьбу
const DIFF_D = { easy: ['Передышка', 'Три приказа в квартал, больше средств, соперники осторожнее.'], normal: ['Как было бы', 'Два приказа в квартал. Соперники и канцелярия действуют в полную силу.'], hard: ['Без права на ошибку', 'Мало средств, соперники сильнее, люди штаба ненадёжны. Итог ×1,4.'] };
const SETUP_BASE = {};
const _renderSetupD = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupD.call(UI);
  const dark = UI.setup && UI.setup.world === 'dark', root = document.querySelector('#screen-setup');
  const heads = [...root.querySelectorAll('.sec-h')], h1 = root.querySelector('h1'), go = document.querySelector('#btn-begin');
  if (!SETUP_BASE.h1) { SETUP_BASE.h1 = h1.textContent; SETUP_BASE.heads = heads.map(h => h.textContent); SETUP_BASE.go = go.textContent; SETUP_BASE.country = root.querySelector('label[for="setup-country"]').textContent; }
  h1.textContent = dark ? 'Дело № 1: Германия' : SETUP_BASE.h1;
  const names = dark ? ['Эпоха', '1. Страна', '2. Кто вы: на что опираетесь', '3. Имя и облик', '4. Сложность'] : SETUP_BASE.heads;
  heads.forEach((h, i) => { h.textContent = names[i]; });
  heads[0].closest('.setup-sec').hidden = dark;
  for (const el of [root.querySelector('label[for="setup-country"]'), root.querySelector('#setup-country')]) el.hidden = dark;
  root.querySelector('label[for="setup-title"]').textContent = dark ? 'Звание' : 'Титул';
  go.textContent = dark ? 'Открыть дело' : SETUP_BASE.go;
  const dbg = document.querySelector('#dk-debug');
  if (dbg) { dbg.hidden = !dark; for (const b of dbg.querySelectorAll('[data-dkdebug]')) b.onclick = () => DarkDebug.start(b.dataset.dkdebug); }
  if (dark) for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = 'Великогерманский рейх · 1970–1984';
  if (dark) for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_D[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
};
// Самостоятельные ходы сил в квартальной сводке
const MOVE_D = {
  good: { 'Трудовой фронт': 'заводы перевыполнили план, уполномоченные отметили вашу роль.', 'Реформисты': 'для вас подготовили записку о сокращении расходов. Дельную.', 'Партийный аппарат': 'гауляйтеры собрали взносы и передали их в ваше распоряжение.', 'Концерны': 'заказ сдан досрочно и без доплаты.', 'Вермахт': 'штаб армии резерва провёл учения и пригласил вас на разбор.', 'СС': 'вам переданы сведения о ваших противниках. Бесплатно такого не бывает.' },
  bad: { 'Трудовой фронт': 'на заводах работают строго по норме. Выпуск упал.', 'Реформисты': 'в министерствах тихий саботаж: бумаги теряются, сроки срываются.', 'Партийный аппарат': 'гауляйтеры задерживают поставки и ссылаются друг на друга.', 'Концерны': 'продукцию придерживают, деньги выводят через Цюрих.', 'Вермахт': 'офицеры демонстративно не явились на партийное собрание.', 'СС': 'у ваших сотрудников прошли обыски. Ордеров не предъявили.' },
};
const moveTextD = line => {
  const m = /^(🤝|⚠️) ([^:]+): /.exec(line);
  const t = m && MOVE_D[m[1] === '🤝' ? 'good' : 'bad'][m[2]];
  return t ? `${m[1]} ${m[2]}: ${t}` : Game.eraText(line);
};
Game.eraText = s => (typeof s !== 'string' ? s : isDark() ? TD.reduce((a, [f, t]) => a.split(f).join(t), s) : isItal() && typeof TI !== 'undefined' ? TI.reduce((a, [f, t]) => a.split(f).join(t), s) : isJap() && typeof TJ !== 'undefined' ? TJ.reduce((a, [f, t]) => a.split(f).join(t), s) : isRealm() && typeof TR !== 'undefined' ? TR.reduce((a, [f, t]) => a.split(f).join(t), s) : isBurg() && typeof TB !== 'undefined' ? TB.reduce((a, [f, t]) => a.split(f).join(t), s) : isCrown() && typeof TE !== 'undefined' ? TE.reduce((a, [f, t]) => a.split(f).join(t), s) : isShip() && typeof TS !== 'undefined' ? TS.reduce((a, [f, t]) => a.split(f).join(t), s) : isHouse() && typeof TH !== 'undefined' ? TH.reduce((a, [f, t]) => a.split(f).join(t), s) : isDomin() && typeof TM !== 'undefined' ? TM.reduce((a, [f, t]) => a.split(f).join(t), s) : s);
const _modalD = Modal.open;
Modal.open = function (html, ...rest) { return _modalD.call(Modal, Game.eraText(html), ...rest); };
const _vnPlayD = VN.play;
VN.play = function (sc) { if (isGloom() && sc && sc.title) sc.title = Game.eraText(sc.title); return _vnPlayD.call(VN, sc); };
const _fmtD = Game.fmt;
Game.fmt = function (str) { return Game.eraText(_fmtD.call(Game, str)); };
// Ответы на действия советников — без прибауток
const ADV_TEXT_D = {
  defense: 'Смотр прошёл. Командиры частей запомнили, кто приезжал.',
  economy: 'Программа запущена: заказы распределены, сырьё выделено.',
  police: 'Аресты проведены ночью. Утром в учреждениях тихо.',
  propaganda: 'Кампания идёт: ваше имя в передовицах и в радиосводках.',
  foreign: 'Поездка завершена. Союзники заверили в дружбе и записали всё, что услышали.',
};
const _advActD = Game.advisorAction;
Game.darkAdvAct = function (role) {
  const A = S.adv[role], cost = { defense: 6, police: 4, propaganda: 4, foreign: 5 }[role] || 0;
  if (S.treasury < cost || !Game.spend()) return null;
  Game.noteDeal('adv:' + role);
  const k = A.comp * [1, 1, 0.6, 0.35, 0.2][Math.min(Game.dealInfo('adv:' + role).n, 4)], r = v => Math.max(1, Math.round(v * k));
  const [fx, text] = {
    defense: [{ treasury: -6, sucReady: r(5), fac: { hawks: { a: r(3) } }, sucExpo: 3 }, 'Ужин в офицерском собрании. Три командира полков теперь знают вас в лицо.'],
    economy: [{ treasury: r(10), fac: { oligarchs: { a: -2 } } }, 'Взносы собраны. Расписок никто не просил.'],
    police: [{ treasury: -4, sucExpo: -r(7) }, 'Двоих из вашей приёмной перевели в провинцию. Докладывать о вас стало некому.'],
    propaganda: [{ treasury: -4, sucAuth: Math.max(1, Math.round(1.5 * k)), sucExpo: 2 }, 'Заметка вышла на второй полосе. Без эпитетов.'],
    foreign: [{ treasury: -5, rel: { italy: r(5), spain: r(4) } }, 'Послы приняли приглашение. Говорили о погоде и запоминали каждое слово.'],
  }[role];
  const changes = Game.apply(fx);
  Game.log(`${ROLES[role].action}. ${text}`);
  return { text, changes };
};
Game.advisorAction = function (role, act) {
  if (darkPre() && act === 'act') return Game.darkAdvAct(role);
  const r = _advActD.call(Game, role, act);
  if (r && isGloom() && act === 'gift') { r.text = `${S.adv[role].name} получил конверт. Вопросов он не задал.`; if (S.log[0]) S.log[0].text = r.text; }
  const advText = isDomin() && typeof ADV_TEXT_M !== 'undefined' ? ADV_TEXT_M : isHouse() && typeof ADV_TEXT_H !== 'undefined' ? ADV_TEXT_H : isShip() && typeof ADV_TEXT_S !== 'undefined' ? ADV_TEXT_S : isCrown() && typeof ADV_TEXT_E !== 'undefined' ? ADV_TEXT_E : isBurg() && typeof ADV_TEXT_B !== 'undefined' ? ADV_TEXT_B : isRealm() && typeof ADV_TEXT_R !== 'undefined' ? ADV_TEXT_R : isJap() && typeof ADV_TEXT_J !== 'undefined' ? ADV_TEXT_J : isItal() && typeof ADV_TEXT_I !== 'undefined' ? ADV_TEXT_I : ADV_TEXT_D;
  if (r && isGloom() && act === 'act' && advText[role]) { r.text = advText[role]; if (S.log[0]) S.log[0].text = r.text; }
  return r;
};
// Капризы и проекты советников в этой эпохе отключены
const _advSceneD = Game.advisorScene;
Game.advisorScene = function () { return isGloom() ? null : _advSceneD.call(Game); };

// ---------- распоряжения вместо указов ----------
const decD = (cat, d) => DECREES[cat].push({ eras: [DARK], ok: () => true, ...d });
decD('foreign', { id: 'd_rome', name: 'Совещание глав пакта в Берлине', desc: 'Рим и Мадрид приезжают подтвердить союз. Токио присылает наблюдателя.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, rel: { italy: Math.round(7 * m), spain: Math.round(6 * m), japan: Math.round(2 * m) } }, text: 'Совещание прошло. Коммюнике подтверждает нерушимость пакта. В кулуарах говорили о другом.' }) });
decD('foreign', { id: 'd_line', name: 'Переговоры о линии раздела', desc: 'Комиссия по сибирской границе с Японией. Меньше стычек, меньше расходов на гарнизоны.', cost: '−6 млн', ok: S => S.treasury >= 6, repeat: true,
  run: (S, m) => ({ fx: { treasury: -6, rel: { japan: Math.round(8 * m) }, fac: { hawks: { a: -3 } } }, text: 'Комиссия согласовала ещё сорок километров линии. Генералы считают это уступкой.' }) });
decD('foreign', { id: 'd_usa', name: 'Тайный канал в Вашингтон', desc: 'Через Мадрид. Разрядка даёт зерно и передышку. Если узнает СС — будет плохо.', cost: '−5 млн', ok: S => S.treasury >= 5, repeat: true,
  run: (S, m) => ({ fx: { treasury: -5, rel: { usa: Math.round(8 * m) }, fac: { liberals: { a: 4 }, new: { a: -5 } }, sucExpo: 4 }, text: 'Письмо передано. Ответ пришёл через три недели: американцы готовы слушать.' }) });
decD('social', { id: 'd_rations', name: 'Повысить нормы по карточкам', desc: 'Мясо и жиры для рабочих рейха. Склады опустеют быстрее.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, support: Math.round(6 * m), fac: { left: { a: Math.round(8 * m) } } }, text: 'Нормы повышены. В очередях об этом говорят вполголоса и с осторожностью.' }) });
decD('social', { id: 'd_amnesty', name: 'Пересмотр дел', desc: 'Комиссия выпускает часть осуждённых по политическим статьям. Реформисты ждут этого годами. СС сочтёт это вызовом.', cost: '', once: true,
  run: () => ({ fx: { fear: -8, support: 4, fac: { liberals: { a: 14 }, left: { a: 5 }, new: { a: -14 }, faith: { a: -5 } }, rel: { usa: 5 }, sucExpo: 6 }, text: 'Первые эшелоны идут с Востока на запад. Люди на перронах не узнают тех, кого встречают.' }) });
decD('social', { id: 'd_curfew', name: 'Особое положение в столице', desc: 'Патрули, пропуска, ночные проверки. Тихо и страшно.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { fear: Math.round(9 * m), support: -4, fac: { liberals: { a: -8 }, new: { a: 5 } } }, text: 'После десяти вечера на улицах только патрули.' }) });
decD('social', { id: 'd_housing', name: 'Жильё для рабочих', desc: 'Кварталы вместо бараков у заводов. Дорого и долго.', cost: '−18 млн', ok: S => S.treasury >= 18, once: true,
  run: () => ({ fx: { treasury: -18, support: 5, economy: 2, fac: { left: { a: 10 } } }, text: 'Заложены первые кварталы. Трудовой фронт записал это на ваш счёт.' }) });
decD('economy', { id: 'd_ration_ind', name: 'Рационализация концернов', desc: 'Закрыть убыточные заводы, слить дублирующие. Экономика растёт, директора и гауляйтеры теряют кормушки.', cost: '', once: true,
  run: () => ({ fx: { economy: 6, support: -3, fac: { oligarchs: { a: -8 }, faith: { a: -6 }, liberals: { a: 8 } } }, text: 'Сорок заводов закрыты, двенадцать слиты. Жалобы гауляйтеров идут в канцелярию мешками.' }) });
decD('economy', { id: 'd_orders', name: 'Военные заказы концернам', desc: 'Танки, которые никому не нужны, зато заводы загружены, а директора благодарны.', cost: '−16 млн', ok: S => S.treasury >= 16, repeat: true,
  run: (S, m) => ({ fx: { treasury: -16, economy: Math.round(2 * m), fac: { oligarchs: { a: Math.round(9 * m) }, hawks: { a: Math.round(4 * m) } } }, text: 'Заказы размещены. Заводы работают в три смены.' }) });
decD('economy', { id: 'd_east', name: 'Вывоз сырья с Востока', desc: 'Больше руды и зерна из восточных комиссариатов. Там станет ещё хуже, чем было.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { treasury: Math.round(14 * m), fear: 3, fac: { liberals: { a: -6 }, new: { a: 3 } }, rel: { usa: -4 } }, text: 'Эшелоны идут на запад гружёные. О том, что остаётся позади, в сводках не пишут.' }) });
const _decListD = Game.decreeList;
Game.decreeList = function (cat) { const L = _decListD.call(Game, cat); return isGloom() ? L.filter(d => d.eras && d.eras.includes(S.era)) : L; };
// Хозяйственные действия: без займов, национализации и земельной реформы
const _ecoActsD = Game.economyActions;
Game.economyActions = function () {
  const acts = _ecoActsD.call(Game);
  if (!isGloom()) return acts;
  return acts.filter(a => !['loan_w', 'loan_e', 'nationalize', 'land'].includes(a.id)).map(a => (a.id === 'transfer' ? { ...a, name: 'Перевести 15 млн в личный фонд', desc: 'Цюрих. На случай, если придётся уходить. Шанс огласки 20%.' } : a));
};
const _ecoFxD = Game.economyFx;
Game.economyFx = function (id) {
  const r = _ecoFxD.call(Game, id);
  if (isGloom() && id === 'transfer') { r.text = 'Перевод прошёл.'; if (r.risk) r.risk.text = isHouse() ? 'Гильдия прислала выписку. Копию она, как водится, продала.' : isRealm() || isBurg() || isCrown() ? 'Гномы-счетоводы проболтались. Гномы-счетоводы всегда пробалтываются.' : isJap() ? 'О переводе узнали в особой высшей полиции.' : isItal() ? 'О переводе узнали в партийной контрольной комиссии.' : 'О переводе узнали в партийном суде.'; }
  return r;
};
// Требования сил: только бюджетные и свои; общие «указные» требования здесь не к месту
for (const list of Object.values(FAC_DEMANDS)) for (const d of list) if (d.kind !== 'budget' || d.id === 'b_net' || d.id === 'b_media') d.except = [...(d.except || []), 'reich70', 'italy70', 'japan70', 'velentar', 'kislobrod', 'dravenor', 'starship', 'sush', 'dominat'];
FAC_DEMANDS.faith.push({ id: 'dk_gau', kind: 'pay', text: 'Подтвердить привилегии гауляйтеров', fx: { treasury: -8, fac: { liberals: { a: -5 } } }, only: ['reich70'] });
FAC_DEMANDS.hawks.push({ id: 'dk_ss', kind: 'pay', text: 'Запретить СС вербовку в армейских частях', fx: { fac: { new: { a: -8 } } }, only: ['reich70'] });
FAC_DEMANDS.oligarchs.push({ id: 'dk_ord', kind: 'act', acts: ['dec:d_orders'], text: 'Разместить военные заказы на заводах концернов', only: ['reich70'] });
FAC_DEMANDS.left.push({ id: 'dk_rat', kind: 'act', acts: ['dec:d_rations'], text: 'Повысить нормы по карточкам', only: ['reich70'] });
FAC_DEMANDS.liberals.push({ id: 'dk_amn', kind: 'act', acts: ['dec:d_amnesty'], text: 'Начать пересмотр дел осуждённых', only: ['reich70'], cond: S => !S.used.includes('dec:d_amnesty') });
FAC_DEMANDS.new.push({ id: 'dk_pol', kind: 'budget', k: 'police', op: '>=', v: 65, text: 'Поднять бюджет тайной полиции до 65% и выше', eras: [DARK] });
// Пока вы претендент, силы требуют не бюджета, а обещаний и услуг
const dkWaitD = S => !!S.suc && S.suc.phase !== 'rule';
const promD = (f, id, text, fx) => FAC_DEMANDS[f].push({ id, kind: 'pay', text, fx, only: ['reich70'], promise: true, cond: dkWaitD });
promD('faith', 'dkp_g1', 'Обещать гауляйтерам, что гау останутся за ними', { sucExpo: 3, fac: { liberals: { a: -4 } } });
promD('faith', 'dkp_g2', 'Оплатить партийный съезд', { treasury: -10 });
promD('hawks', 'dkp_h1', 'Обещать армии главенство над дивизиями СС', { sucExpo: 3, fac: { new: { a: -6 } } });
promD('hawks', 'dkp_h2', 'Выбить пенсии ветеранам Восточного похода', { treasury: -8 });
promD('oligarchs', 'dkp_o1', 'Обещать концернам заказы после «дня икс»', { fac: { left: { a: -3 } } });
promD('oligarchs', 'dkp_o2', 'Закрыть дело о хищениях на «Остверке»', { sucAuth: -1, fac: { liberals: { a: -4 } } });
promD('left', 'dkp_l1', 'Обещать рабочим твёрдые нормы снабжения', { fac: { oligarchs: { a: -3 } } });
promD('left', 'dkp_l2', 'Оплатить дома отдыха Трудового фронта', { treasury: -8 });
promD('liberals', 'dkp_r1', 'Обещать пересмотр дел осуждённых', { sucExpo: 5, fac: { new: { a: -6 } } });
promD('liberals', 'dkp_r2', 'Взять под защиту профессора, уволенного за лекцию', { sucExpo: 4 });
promD('new', 'dkp_s1', 'Обещать СС сохранить её полномочия', { fac: { hawks: { a: -6 }, liberals: { a: -6 } } });
promD('new', 'dkp_s2', 'Передать СС списки неблагонадёжных из вашего ведомства', { fear: 2, sucAuth: -1, fac: { liberals: { a: -8 } } });
const _pickFacD = Game.pickFacDemand;
Game.pickFacDemand = function (f) {
  if (!isDark() || Game.suc().phase === 'rule') return _pickFacD.call(Game, f);
  const all = FAC_DEMANDS[f] || [], keep = all.filter(d => d.promise);
  FAC_DEMANDS[f] = keep;
  try { return _pickFacD.call(Game, f); } finally { FAC_DEMANDS[f] = all; }
};
// Требования держав
DEMANDS.push(
  { id: 'dk_oil', countries: ['italy'], eras: [DARK], text: () => 'Поставлять Италии уголь по твёрдой цене', fx: () => ({ treasury: -6, rel: { italy: 12 }, fac: { oligarchs: { a: -4 } } }) },
  { id: 'dk_line', countries: ['japan'], eras: [DARK], text: () => 'Подписать протокол о линии раздела в Сибири', fx: () => ({ rel: { japan: 14 }, fac: { hawks: { a: -6 } } }) },
  { id: 'dk_pows', countries: ['usa'], eras: [DARK], text: () => 'Выпустить списки интернированных', fx: () => ({ fear: -3, rel: { usa: 14 }, fac: { new: { a: -8 }, liberals: { a: 5 } }, sucExpo: 4 }) },
  { id: 'dk_spain', countries: ['spain'], eras: [DARK], text: () => 'Кредит на вольфрам для Испании', fx: () => ({ treasury: -8, rel: { spain: 14 } }) },
);
const _pickDemandD = Game.pickDemand;
Game.pickDemand = function (c) {
  if (!isGloom()) return _pickDemandD.call(Game, c);
  if (isDark() && Game.suc().phase !== 'rule') return null; // претенденту державы требований не предъявляют
  const keep = DEMANDS.filter(d => d.eras && d.eras.includes(S.era));
  const all = DEMANDS.splice(0, DEMANDS.length, ...keep);
  try { return _pickDemandD.call(Game, c); } finally { DEMANDS.splice(0, DEMANDS.length, ...all); }
};
const _countryActsD = Game.countryActions;
Game.countryActions = function (c) {
  const a = _countryActsD.call(Game, c);
  if (!isGloom()) return a;
  if (darkPre()) return a.filter(x => x.id === 'visit').map(x => ({ ...x, name: 'Встреча с послом' }));
  return a.filter(x => !['aid', 'arms'].includes(x.id));
};
const _countryActD = Game.countryAction;
Game.countryAction = function (c, act) {
  const r = _countryActD.call(Game, c, act);
  if (r && isGloom() && act === 'visit' && r.text) { r.text = darkPre() ? `Встреча с послом (${Game.cName(c)}) состоялась. Он слушал внимательно и ничего не обещал.` : `Визит состоялся: ${Game.cName(c)}.`; if (S.log[0]) S.log[0].text = r.text; }
  return r;
};
// Претендент не может ни запретить силу, ни арестовать её лидера, ни раздавать ордена
const _facActsD = Game.factionActions;
Game.factionActions = function (f) { const a = _facActsD.call(Game, f); return darkPre() ? a.filter(x => !['ban', 'arrest', 'legalize', 'medal'].includes(x.id)) : a; };

// ---------- преемство ----------
const RIVALS_D = {
  ss: { look: LD({ face: 'long', hair: 'short', hairColor: '#b9b0a0', glasses: 'round', ...DARK_LOOK('#17181a', { medals: 3 }) }), name: 'рейхсфюрер СС Конрад Феллер', short: 'Феллер', fac: 'new', role: 'СС', desc: 'Лагеря, собственные дивизии и собственный суд. Если победит он, остальным не жить.' },
  partei70: { look: LD({ face: 'round', hair: 'combover', hairColor: '#8a8a8a', ...DARK_PARTEI() }), name: 'рейхсляйтер Вильгельм Крайс', short: 'Крайс', fac: 'faith', role: 'Партийная канцелярия', desc: 'Двадцать лет ставит подпись под каждым назначением. Гауляйтеры обязаны ему должностями.' },
  heer70: { look: LD({ face: 'square', hair: 'short', hairColor: '#a0a0a0', mustache: 'pencil', ...DARK_LOOK('#5d665c', { medals: 6, cross: true }) }), name: 'генерал-фельдмаршал Эрих фон Траутен', short: 'фон Траутен', fac: 'hawks', role: 'Вермахт', desc: 'Командующий армией резерва. Считает, что партия проела победу.' },
  techno70: { look: LD({ face: 'oval', hair: 'slick', hairColor: '#4a4038', ...DARK_SUIT('#2a2d33', { tie: '#3a3a3a' }) }), name: 'рейхсминистр Альбрехт Хольм', short: 'Хольм', fac: 'oligarchs', role: 'Министерство вооружений', desc: 'За ним концерны и молодые чиновники. Говорит о «рационализации» и имеет в виду больше, чем говорит.' },
};
const SUC_W = { faith: 0.34, hawks: 0.2, oligarchs: 0.14, left: 0.12, new: 0.12, liberals: 0.08 };
// Гитлер родился 20 апреля 1889 года
const hitlerAge = () => { const a = S.year - 1889 - (S.q < 2 ? 1 : 0), m = a % 10; return `${['восемьдесят', 'восемьдесят один', 'восемьдесят два', 'восемьдесят три', 'восемьдесят четыре', 'восемьдесят пять', 'восемьдесят шесть', 'восемьдесят семь'][clamp(a - 80, 0, 7)]} ${m === 1 ? 'год' : m >= 2 && m <= 4 ? 'года' : 'лет'}`; };
const healthWord = h => (h > 45 ? 'работает с документами' : h > 30 ? 'не принимает посетителей' : h > 15 ? 'не встаёт с постели' : 'при смерти');
Object.assign(Game, {
  suc() {
    if (!S.suc) {
      const others = ['partei70', 'heer70', 'techno70'].filter(k => k !== S.regime);
      const hard = { easy: -5, normal: 0, hard: 5 }[S.diff] || 0;
      S.suc = { phase: 'wait', health: 62, expo: 12, auth: 0, ready: S.regime === 'heer70' ? 25 : 8, pact: null, visitAt: -9, summons: -9, war: null, course: null, hadWar: false,
        kompAt: {},
        rivals: { ss: { infl: 54 + hard, base: 54 + hard }, [others[0]]: { infl: 50 + hard, base: 50 + hard }, [others[1]]: { infl: 46 + hard, base: 46 + hard } } };
    }
    return S.suc;
  },
  sucRivalKeys() { return Object.keys(Game.suc().rivals); },
  // Ваш вес в сенате партии: одобрение каждой силы, взвешенное её значением и влиянием, плюс личный авторитет
  sucScore() {
    const U = Game.suc();
    let sum = 0, w = 0;
    for (const [f, k] of Object.entries(SUC_W)) { const F = S.fac[f]; if (!F) continue; sum += k * (F.a / 100) * (0.55 + F.s / 110); w += k; }
    return clamp(Math.round(sum / w * 100 + U.auth));
  },
  sucPactBonus() { const U = Game.suc(); return U.pact && U.rivals[U.pact] ? Math.round(U.rivals[U.pact].infl * 0.25) : 0; },
  sucTop() { const U = Game.suc(); return Object.entries(U.rivals).filter(([k]) => k !== U.pact).sort((a, b) => b[1].infl - a[1].infl)[0]; },
  sucActions() {
    const U = Game.suc(), acts = [];
    if (U.phase === 'wait') {
      acts.push({ id: 'visit', name: 'Доклад у Фюрера', desc: 'Показаться в рейхсканцелярии, пока туда ещё пускают. Снимает подозрения; если повезёт, он назовёт вас при свидетелях.', cost: S.turn - U.visitAt < 3 ? 'не чаще раза в три квартала' : '', ok: S.turn - U.visitAt >= 3, odds: clamp(0.3 + U.health / 200, 0.3, 0.6), fx: { sucExpo: -8 }, win: { sucAuth: 5 } });
      acts.push({ id: 'garrison', name: 'Расставить своих офицеров', desc: 'Командиры караульных полков и гарнизонов столицы. Нужны, если дело дойдёт до оружия.', cost: '−10 млн', ok: S.treasury >= 10, fx: { treasury: -10, sucReady: 10, fac: { hawks: { a: 3 } }, sucExpo: 8 } });
      acts.push({ id: 'quiet', name: 'Залечь на дно', desc: 'Квартал без встреч и поездок. Подозрения слабеют, о вас начинают забывать.', cost: '', ok: U.expo > 5, fx: { sucExpo: -15, sucAuth: -2 } });
      for (const k of Game.sucRivalKeys()) {
        const R = RIVALS_D[k];
        acts.push({ id: 'komp:' + k, name: `Материалы на ${R.short === 'фон Траутен' ? 'фон Траутена' : R.short + 'а'}`, desc: `Передать в партийный суд то, что собрал ваш человек в полиции. Влияние соперника падает. При провале он узнает, кто копал.`, cost: S.turn - ((U.kompAt || {})[k] || -9) < 3 ? 'не чаще раза в три квартала' : '−6 млн', ok: S.treasury >= 6 && S.turn - ((U.kompAt || {})[k] || -9) >= 3, odds: clamp(0.35 + S.adv.police.loy / 300 + (S.adv.police.comp - 1) * 0.2, 0.25, 0.75), fx: { treasury: -6 }, win: { sucRival: { [k]: -8 }, sucExpo: 3 }, lose: { sucExpo: 10, fac: { [R.fac]: { a: -6 } } } });
        if (k !== 'ss' && !U.pact) acts.push({ id: 'pact:' + k, name: `Союз: ${R.short}`, desc: `Он снимет кандидатуру в вашу пользу и получит второй пост в Рейхе. Четверть его веса станет вашей. Нужно одобрение его силы не ниже 60. Союз возможен только один.`, cost: `${REGIONS.reich70.factions[R.fac].short} ≥ 60`, ok: S.fac[R.fac].a >= 60, fx: { sucExpo: 6, sucPact: k } });
      }
    } else if (U.phase === 'war') {
      const W = U.war;
      acts.push({ id: 'attack', name: 'Наступление на столицу', desc: 'Бросить резервы на Берлин. Успех решает многое, неудача — тоже.', cost: '−10 млн', ok: S.treasury >= 10, odds: clamp(0.3 + S.army / 220 + U.ready / 300, 0.25, 0.75), fx: { treasury: -10 }, win: { sucCtrl: 9 }, lose: { sucCtrl: -8, army: -6 } });
      acts.push({ id: 'buy', name: 'Перекупить гарнизоны', desc: 'Командиры считают, чья сторона заплатит и чья победит.', cost: '−20 млн', ok: S.treasury >= 20, fx: { treasury: -20, sucCtrl: 5 } });
      acts.push({ id: 'promise', name: 'Обещать пересмотр дел и конец террора', desc: 'Листовки над городами противника. Вам поверят не все, но многие хотят поверить.', cost: W.promised ? 'уже обещано' : '', ok: !W.promised, fx: { support: 6, fac: { liberals: { a: 8 }, left: { a: 5 }, faith: { a: -6 } }, sucCtrl: 3, flag: { darkPromise: true } } });
      acts.push({ id: 'rome', name: 'Просить помощи у Рима', desc: 'Итальянские дивизии через Бреннер. Рим выставит счёт, и он будет велик.', cost: W.rome ? 'уже получена' : 'Италия ≥ 55', ok: !W.rome && (S.rel.italy || 0) >= 55, fx: { sucCtrl: 6, rel: { italy: -10 }, flag: { darkRome: true } } });
      if (W.q >= 4) acts.push({ id: 'truce', name: 'Перемирие по линии фронта', desc: 'Остановить войну там, где стоят войска. Рейх перестанет быть единым.', cost: '', ok: true, danger: true, end: 'partition' });
    }
    return acts;
  },
  sucAction(id) {
    const a = Game.sucActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const U = Game.suc();
    if (a.end) return { end: a.end };
    let fx = { ...a.fx }, text = a.name + '.';
    if (id === 'visit') U.visitAt = S.turn;
    if (id.startsWith('komp:')) { U.kompAt = U.kompAt || {}; U.kompAt[id.slice(5)] = S.turn; }
    if (id.startsWith('komp:') && U.pact === id.slice(5)) { U.pact = null; text += ' Союз с ним расторгнут.'; }
    if (id === 'promise') U.war.promised = true;
    if (id === 'rome') U.war.rome = true;
    if (a.odds !== undefined) {
      const ok = Math.random() < a.odds;
      fx = Game.mergeFxD(fx, ok ? a.win : a.lose || {});
      text += ' ' + ({ visit: ok ? 'Фюрер слушал десять минут и сказал адъютанту: «Этому можно верить».' : 'Фюрер слушал молча и смотрел в окно. Аудиенция длилась четыре минуты.',
        attack: ok ? 'Колонны вошли в предместья. Часть гарнизона сложила оружие.' : 'Наступление захлебнулось на окружной дороге. Потери велики.' }[id]
        || (ok ? 'Партийный суд принял материалы к рассмотрению. В коридорах об этом уже знают.' : 'Материалы вернулись без резолюции. Ваш курьер исчез.'));
    } else text += ' ' + (a.desc.split('. ')[0] + '.');
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  // Агитация: претендент завоёвывает силы Рейха. Повторы в течение двух лет дают всё меньше.
  agitActions() {
    const U = Game.suc(), top = Game.sucTop()[0], m = id => Game.dealInfo('agit:' + id).mult, r = (v, id) => Math.max(1, Math.round(v * m(id)));
    const eff = id => (Game.dealInfo('agit:' + id).n ? ` · эффект ${Math.round(m(id) * 100)}%` : '');
    const L = [
      { id: 'gau', name: 'Объезд гау', desc: 'Личные встречи с гауляйтерами, обещания должностей после «дня икс». Партия запомнит. Канцелярия тоже.', cost: 8, fx: { treasury: -8, fac: { faith: { a: r(6, 'gau') } }, sucExpo: 5 } },
      { id: 'garr', name: 'Смотр гарнизонов', desc: 'Офицерские собрания, разговоры после ужина. Армия привыкает видеть в вас своего.', cost: 8, fx: { treasury: -8, fac: { hawks: { a: r(6, 'garr') } }, sucReady: 3, sucExpo: 5 } },
      { id: 'konz', name: 'Совещание с директорами', desc: 'Концернам обещаны заказы и сырьё. Директора платят взносами, рабочие — подозрением.', cost: 4, fx: { treasury: -4, fac: { oligarchs: { a: r(6, 'konz') }, left: { a: -2 } }, sucExpo: 2 } },
      { id: 'werk', name: 'Выступление на заводе', desc: 'Цех, трибуна из ящиков, уполномоченные Трудового фронта в первом ряду.', cost: 5, fx: { treasury: -5, support: 1, fac: { left: { a: r(6, 'werk') }, oligarchs: { a: -1 } }, sucExpo: 3 } },
      { id: 'semi', name: 'Закрытый семинар', desc: 'Молодые статс-секретари и инженеры. Говорят о «рационализации» и слушают, что вы ответите. СС ведёт список участников.', cost: 0, fx: { fac: { liberals: { a: r(7, 'semi') }, new: { a: -3 } }, sucExpo: 5 } },
      { id: 'press', name: 'Статья в «Обозревателе»', desc: 'Передовица за вашей подписью. Имя привыкают видеть рядом со словом «будущее».', cost: 5, fx: { treasury: -5, sucAuth: r(2, 'press'), sucExpo: 4 } },
      { id: 'film', name: 'Хроника и портреты', desc: 'Вы в киножурнале перед каждым сеансом. Страна узнаёт вас в лицо. Канцелярия — тоже.', cost: 10, fx: { treasury: -10, support: r(3, 'film'), sucAuth: 1, sucExpo: 6 } },
      { id: 'rumor', name: `Слухи о сопернике: ${RIVALS_D[top].short}`, desc: 'Разговоры в приёмных и офицерских казино. Дёшево и недоказуемо. Иногда слух возвращается к тому, кто его пустил.', cost: 0, odds: 0.7, fx: { sucExpo: 2 }, win: { sucRival: { [top]: -3 } }, lose: { sucAuth: -1 } },
    ];
    return L.map(a => ({ ...a, cost: (a.cost ? `−${a.cost} млн` : '') + eff(a.id), ok: !a.cost || S.treasury >= a.cost }));
  },
  agitAction(id) {
    const a = Game.agitActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    Game.noteDeal('agit:' + id);
    let fx = { ...a.fx }, text = `${a.name}. `;
    if (a.odds !== undefined) { const ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose); text += ok ? 'Слух пошёл и вернулся к вам уже с подробностями.' : 'Слух проследили до вашей приёмной.'; }
    else text += a.desc.split('. ')[0] + '.';
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  mergeFxD(a, b) {
    const out = { ...a };
    for (const [k, v] of Object.entries(b || {})) out[k] = typeof v === 'object' && out[k] ? { ...out[k], ...v } : typeof v === 'number' && typeof out[k] === 'number' ? out[k] + v : v;
    return out;
  },
});

// Проигрыш зависит от того, кому вы проиграли: СС не оставляет соперников в живых, партия ссылает, армия и министерство отправляют на покой
const DEFEAT_D = { ss: 'knives', partei70: 'banish', heer70: 'pension', techno70: 'pension' };
const DEFEAT_HINT_D = {
  ss: 'Если это Феллер, {addr}, присяга нас не спасёт. Он не оставляет соперников в живых. Никого из тех, кто мог бы ими стать.',
  partei70: 'Крайс не расстреливает, {addr}. Он переводит. Далеко и навсегда.',
  heer70: 'Фон Траутен — офицер. Присягнувшему он оставит звание и имение. И караул у ворот.',
  techno70: 'Хольм с людьми не воюет, он их переставляет. Вам найдут кабинет с видом на Рейн и телефоном, который не звонит.',
};
// Концовка, выбранная в сцене (fx.end), если была
const darkEnd = () => { const e = S.pendingEnd || null; S.pendingEnd = null; return e; };

// ---------- сцены ----------
Object.assign(Game, {
  introScene() {
    if (!isDark()) return null;
    const U = Game.suc(), R = Game.sucRivalKeys().map(k => RIVALS_D[k]);
    return {
      title: 'Операция «Преемник»', bg: 'night',
      lines: [
        ['narrator', `Берлин, 3 января 1970 года. Половина двенадцатого ночи. ${S.adv.police.name} приехал без звонка и не снял пальто.`],
        ['police', '{Addr}, час назад в рейхсканцелярию вызвали лейб-медика. Второй раз за неделю. Гитлер упал в кабинете и сорок минут не приходил в себя. Ему восемьдесят один год.'],
        ['police', 'Канцелярия вскрыла пакет с пометкой «Преемник». Это план на случай его смерти: кто оцепляет правительственный квартал, кто созывает сенат партии, кто зачитывает завещание. Имени преемника в пакете нет.'],
        ['defense', 'Значит, имя впишет тот, кто будет сильнее в этот день. Армия резерва приведена в готовность. СС — тоже. Официально это учения.'],
        ['police', `Считают трое. ${R.map(r => r.name[0].toUpperCase() + r.name.slice(1)).join('. ')}. И вы.`],
        ['economy', 'Врачи дают ему лет пять, не больше. Потом соберётся сенат партии. За кого будут гауляйтеры, генералы и директора, тот и станет главой Рейха.'],
        ['police', 'И ещё. Пока он жив, каждый, кто слишком заметно готовится к его смерти, — изменник. Списки уже ведут.'],
        ['narrator', `Ваша задача — пережить Фюрера, взять власть и удержать её до ${Game.endYear()} года. Победить можно в сенате. Если сенат решит иначе, остаётся оружие. Пока Фюрер жив, у вас нет ни казны, ни права издавать распоряжения: только ваше ведомство, ваши люди и агитация.`],
      ],
    };
  },
  sucSummonsScene() {
    const U = Game.suc();
    U.summons = S.turn;
    return {
      title: 'Вызов в рейхсканцелярию', bg: 'office', crisis: true,
      lines: [
        ['narrator', 'Телефонограмма в шесть утра: вам надлежит явиться к начальнику канцелярии к десяти. Причина не указана. У подъезда с ночи стоит чужая машина.'],
        ['police', '{Addr}, на столе у него папка с вашим именем. Встречи, поездки, фамилии офицеров. Кто-то вёл список.'],
        ['defense', 'Можно ехать и объясняться. Можно поднять караульный полк прямо сейчас. Третьего я не вижу.'],
      ],
      choices: [
        { text: 'Явиться и объясниться', adv: ['propaganda'], chance: () => clamp(0.3 + S.fac.faith.a / 200 + U.auth / 60, 0.2, 0.8),
          win: { fx: { sucExpo: -35, sucAuth: -4 }, res: 'Разговор длился три часа. Вы вышли через главный подъезд. Папку убрали в сейф, но не уничтожили.' },
          lose: { fx: { end: 'purged' }, res: 'Вас попросили сдать оружие и подождать в соседней комнате. Дверь заперли снаружи.' } },
        { text: 'Поднять верные части сейчас', adv: ['defense'], req: () => U.ready >= 20, reqText: 'нужна готовность гарнизонов ≥ 20', fx: { support: -12, sucWar: 'early' }, res: 'Караульный полк занял радиостанцию и два моста. Фюрер жив, и по радио вас называют изменником. Обратной дороги нет.' },
        { text: 'Уехать в Мадрид этой же ночью', fx: { end: 'exile' }, res: 'Самолёт испанского посольства взлетел с Темпельхофа в четыре утра.' },
      ],
      after: darkEnd,
    };
  },
  sucDeathScene() {
    const U = Game.suc();
    S.flags.fuhrerDead = true;
    const my = Game.sucScore() + Game.sucPactBonus(), [topK, top] = Game.sucTop(), ss = U.rivals.ss.infl;
    const T = RIVALS_D[topK], won = my >= top.infl && my >= 45;
    const lines = [
      ['narrator', `${Game.dateLabel()}. В четыре утра радио прервало передачи и два часа играло Брукнера. В шесть диктор зачитал сообщение из одной фразы.`],
      ['narrator', `Адольф Гитлер умер. Ему было ${hitlerAge()}. Правительственный квартал оцеплен. Сенат партии собран в Большом зале без права выйти до решения.`],
      ['police', `Подсчёт такой, {addr}. За вас — ${my}${Game.sucPactBonus() ? ` (из них ${Game.sucPactBonus()} привёл ваш союзник)` : ''}. ${T.name[0].toUpperCase() + T.name.slice(1)} — ${Math.round(top.infl)}. Рейхсфюрер СС — ${Math.round(ss)}.`],
    ];
    if (won && ss < 55) {
      lines.push(['narrator', 'К полудню сенат проголосовал. Ваше имя назвали первым. Феллер встал вместе со всеми, помедлив ровно столько, чтобы это заметили.']);
      return { title: 'День, который нельзя было называть', bg: 'palace', lines, choices: [{ text: 'Принять присягу сената', fx: { sucWin: 'peace' }, res: 'К вечеру гарнизоны столицы присягнули новому главе Рейха. Стреляли только в воздух.' }], after: () => null };
    }
    if (won) {
      lines.push(['narrator', 'Сенат назвал ваше имя. Через час охранные отряды заняли вокзалы и телефонную станцию. Феллер объявил решение сената «подлогом» и себя — исполнителем воли Фюрера.']);
      return { title: 'День, который нельзя было называть', bg: 'palace', lines, choices: [{ text: 'Поднять армию против СС', adv: ['defense'], fx: { sucWar: 'legit' }, res: 'Армия резерва получила приказ. В Рейхе теперь два правительства, и оба называют второе изменниками.' },
        { text: 'Бежать в Мадрид', fx: { end: 'exile' }, res: 'Вы покинули Берлин через час после собственного избрания.' }], after: darkEnd };
    }
    lines.push(['narrator', `К полудню сенат проголосовал. Преемником назван ${T.name}.`]);
    lines.push(['police', DEFEAT_HINT_D[topK]]);
    lines.push(['defense', 'Можно присягнуть. Можно не признать. Решать нужно до вечера, пока гарнизоны не присягнули ему.']);
    return {
      title: 'День, который нельзя было называть', bg: 'palace', crisis: true, lines,
      choices: [
        { text: 'Присягнуть победителю', fx: { end: DEFEAT_D[topK], sucLostTo: topK }, res: { knives: 'Вы присягнули. Девять дней ничего не происходило.', banish: 'Вы присягнули. Через неделю вам вручили новое назначение.', pension: 'Вы присягнули. Вам пожали руку и поблагодарили за службу.' }[DEFEAT_D[topK]] },
        { text: 'Не признать решение и поднять гарнизоны', adv: ['defense'], req: () => U.ready >= 25 || S.fac.hawks.a >= 55, reqText: 'нужна готовность гарнизонов ≥ 25 или одобрение вермахта ≥ 55', fx: { sucWar: 'rebel' }, res: 'Ваши полки заняли мосты и аэродром. По радио идут два обращения к нации одновременно.' },
        { text: 'Бежать в Мадрид', fx: { end: 'exile' }, res: 'Самолёт взлетел с Темпельхофа, когда на лётное поле уже въезжали грузовики.' },
      ],
      after: darkEnd,
    };
  },
  sucWarEndScene(win) {
    const U = Game.suc(), W = U.war, E = RIVALS_D[W.enemy];
    if (!win) return { title: 'Конец войны', bg: 'night', crisis: true, lines: [['narrator', `Фронт рухнул за одну неделю. Ваши командиры присягают противнику поодиночке и полками. ${E.name[0].toUpperCase() + E.name.slice(1)} выступил по радио из Берлина.`], ['defense', 'Аэродром ещё наш, {addr}. Часа на два.']],
      choices: [{ text: 'Улететь в Мадрид', fx: { end: 'exile' }, res: 'Вы улетели последним самолётом.' }, { text: 'Остаться со штабом', fx: { end: DEFEAT_D[W.enemy], sucLostTo: W.enemy }, res: 'Вы остались. Штаб взяли на рассвете.' }], after: darkEnd };
    return { title: 'Конец войны', bg: 'square', lines: [
      ['narrator', `${Game.dateLabel()}. Ваши части вошли в правительственный квартал. Сопротивление прекратилось к полудню.`],
      ['defense', 'Берлин наш, {addr}. Стрельба ещё слышна у вокзалов, но это уже не бой.'],
    ], choices: [{ text: 'Въехать в город', fx: { sucWin: 'war' }, res: 'Сенат партии собрался в зале без крыши и проголосовал единогласно.' }], after: () => null };
  },
  // Пятый год: борьба окончена. Две развязки победителя — избрание и победа в войне
  sucTriumphScene() {
    const U = Game.suc(), W = U.war, years = Math.max(1, Math.round(S.turn / 4)), yw = years === 1 ? 'год' : years < 5 ? 'года' : 'лет';
    U.triumph = true;
    const cap = n => n[0].toUpperCase() + n.slice(1);
    if (U.wonBy === 'war') {
      const E = RIVALS_D[W.enemy], long = W.q >= 5;
      return {
        title: 'Победа в гражданской войне', bg: 'square',
        lines: [
          ['narrator', `${Game.dateLabel()}. Над рейхсканцелярией подняли ваш штандарт. В здании нет ни одного целого окна.`],
          ['narrator', { ss: 'Управление СС горело двое суток. Феллера нашли мёртвым в бункере. Архивы лагерей вывезти не успели: теперь они у вас.', partei70: 'Крайса взяли в подвале партийной канцелярии, где он жёг личные дела гауляйтеров. Половину сжечь успел.', heer70: 'Фон Траутен сдал шпагу вашему адъютанту и попросил об одном: не трогать его офицеров.', techno70: 'Хольма задержали на аэродроме. В портфеле были настоящие балансы концернов и швейцарская виза.' }[W.enemy]],
          ['economy', long ? 'Война шла больше года. Рур стоит, мосты через Рейн взорваны, хлеб в Берлине выдают через день.' : 'Война была короткой. Этого хватило, чтобы каждый запомнил, на чьей стороне был сосед.'],
          ...(W.rome ? [['foreign', 'Итальянские дивизии уходят через Бреннер. Счёт Рим пришлёт позже, и торговаться будет не с кем.']] : []),
          ...(W.promised ? [['propaganda', 'Листовки с вашим обещанием конца террора до сих пор лежат на улицах. Их подбирают и прячут.']] : []),
          ['defense', 'Армия ваша, {addr}. Та, что осталась.'],
          ['narrator', `Борьба за преемство заняла ${years} ${yw}. Рейх ваш — то, что от него осталось. Впереди десять лет, за которые его придётся удержать.`],
        ],
        choices: [{ text: 'Войти в кабинет Фюрера', fx: {}, res: 'Караул взял на караул. Дверь открыли двое: один ключом, другой плечом.' }], after: () => null,
      };
    }
    const my = Game.sucScore() + Game.sucPactBonus(), [topK, top] = Game.sucTop(), wide = my - top.infl >= 12;
    return {
      title: 'Избран сенатом партии', bg: 'palace',
      lines: [
        ['narrator', `${Game.dateLabel()}. Большой зал. Сенат голосует поимённо: гауляйтеры встают по алфавиту гау, за ними — рейхсляйтеры, генералы, директора.`],
        ['narrator', wide ? 'К букве «М» всё было ясно. Остальные вставали быстрее и смотрели в вашу сторону.' : `Решили шесть голосов. ${cap(RIVALS_D[topK].name)} отстал на ${Math.max(1, Math.round(my - top.infl))} и первым подошёл поздравить. Руку он жал дольше, чем нужно.`],
        ...(U.pact ? [['narrator', `${cap(RIVALS_D[U.pact].name)} снял кандидатуру перед голосованием и сел в первый ряд. Второй пост в Рейхе теперь его. Он об этом не забудет, и вам не даст.`]] : []),
        ['police', 'Караул сменён, гарнизон присягнул. Феллер присягнул тоже — последним, стоя. Я бы не поворачивался к нему спиной.'],
        ['narrator', 'В полдень вам подали первый документ. Вы подписали его прежним званием, посмотрели на подпись и зачеркнули.'],
        ['narrator', `Борьба за преемство заняла ${years} ${yw} и обошлась без выстрела. Впереди десять лет, за которые власть придётся удержать.`],
      ],
      choices: [{ text: 'Войти в кабинет Фюрера', fx: {}, res: 'На столе лежали очки, которые никто не решился убрать.' }], after: () => null,
    };
  },
  sucCourseScene() {
    const U = Game.suc();
    U.courseAsked = true;
    return {
      title: 'Первый день', bg: 'office',
      lines: [
        ['narrator', 'Кабинет Гитлера. Слово «фюрер» теперь означает вас. На столе — папки, которые он не успел подписать, и одна, которую не подписывал двадцать пять лет: «О положении на Востоке».'],
        ['police', '{Addr}, СС ждёт подтверждения своих полномочий. Все лагеря, все восточные комиссариаты, собственный суд. Феллер или его преемник хочет услышать это сегодня.'],
        ['economy', 'Хозяйство держится на труде людей за проволокой и на вывозе с Востока. Это работает всё хуже. И это то, за что нас не простят.'],
        ['defense', 'Армия поддержит любой порядок, в котором нет СС над армией.'],
      ],
      choices: [
        { text: 'Всё останется, как при Гитлере', fx: { fear: 10, fac: { faith: { a: 10 }, new: { a: 10 }, liberals: { a: -18 }, left: { a: -5 } }, rel: { usa: -8 }, sucCourse: 'old' }, res: 'Вы подписали всё, что лежало на столе. Машина работает дальше. Вы теперь её часть и её лицо.' },
        { text: 'Распустить лагеря и ограничить СС', adv: ['economy'], fx: { fear: -15, support: 8, economy: -4, fac: { liberals: { a: 22 }, left: { a: 8 }, new: { a: -30, s: -8 }, faith: { a: -12 }, hawks: { a: 5 } }, rel: { usa: 12 }, sucCourse: 'thaw' }, res: 'Указ о роспуске лагерей напечатан на четвёртой полосе, мелким шрифтом. Его всё равно прочли все. СС этого не простит.' },
        { text: 'Власть армии: партия и СС — под командование', adv: ['defense'], fx: { army: 8, fear: 4, fac: { hawks: { a: 20, s: 6 }, faith: { a: -20, s: -6 }, new: { a: -18, s: -5 }, liberals: { a: -4 } }, sucCourse: 'army' }, res: 'Гауляйтеры получили военных комендантов. СС переподчинена штабу сухопутных войск. На бумаге.' },
      ],
      after: () => null,
    };
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  Game.eraLook();
  if (!isDark()) return;
  const U = Game.suc();
  S.fac.new = S.fac.new || { s: 44, a: 30, st: 'legal' };
  Object.assign(S.fac.new, { s: 44, a: S.regime === 'partei70' ? 32 : S.regime === 'heer70' ? 20 : 24 });
  S.fac.left.s = 30; S.fac.left.a = 45; S.fac.liberals.s = 18; S.fac.faith.s = 50; S.fac.hawks.s = 44; S.fac.oligarchs.s = 40;
  S.fear = Math.max(S.fear, 55); S.support = 46; S.economy = 44; S.treasury -= 25;
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isDark()) return;
  const U = Game.suc(), add = (d, label, icon) => { if (Math.round(d)) ch.push({ k: 'fs', d: Math.round(d), label, icon }); };
  if (fx.sucExpo) { const b = U.expo; U.expo = clamp(U.expo + fx.sucExpo); add(U.expo - b, 'Подозрения канцелярии', '👁️'); }
  if (fx.sucAuth) { const b = U.auth; U.auth = clamp(U.auth + fx.sucAuth, -10, 25); add(U.auth - b, 'Личный авторитет', '✒️'); }
  if (fx.sucReady) { const b = U.ready; U.ready = clamp(U.ready + fx.sucReady); add(U.ready - b, 'Готовность гарнизонов', '🪖'); }
  if (fx.sucHealth) U.health = clamp(U.health + fx.sucHealth);
  if (fx.sucRival) for (const [k, d] of Object.entries(fx.sucRival)) if (U.rivals[k]) { const b = U.rivals[k].infl; U.rivals[k].infl = clamp(b + d, 22, 95); add(U.rivals[k].infl - b, `Влияние: ${RIVALS_D[k].short}`, '⚖️'); }
  if (fx.sucPact) U.pact = fx.sucPact;
  if (fx.sucLostTo) U.lostTo = fx.sucLostTo;
  if (fx.colSet) { const [k, d] = fx.colSet, T = Game.col()[k]; if (T) { if (d.ctrl) T.ctrl = clamp(T.ctrl + d.ctrl); if (d.unrest) T.unrest = clamp(T.unrest + d.unrest); if (d.auto !== undefined) T.auto = !!d.auto; if (d.left) { T.left = true; T.ctrl = 0; } add(d.ctrl || 0, `Контроль: ${COL_D[k].short}`, '🗺️'); add(-(d.unrest || 0), `Спокойствие: ${COL_D[k].short}`, '🕊️'); } }
  if (fx.colAll) for (const k of Object.keys(COL_D)) if (Game.colHeld(k)) Game.col()[k].ctrl = clamp(Game.col()[k].ctrl + fx.colAll);
  if (fx.cwSet) { const C = Game.cw70(); for (const [k, d] of Object.entries(fx.cwSet)) { const b = C[k]; C[k] = clamp(C[k] + d); add(k === 'arms' ? C[k] - b : -(C[k] - b), { japan: 'Разрядка с Токио', usa: 'Разрядка с Вашингтоном', arms: 'Паритет вооружений', ju: 'Согласие Токио и Вашингтона' }[k], '☢️'); } }
  if (fx.sucCtrl && U.war) { const b = U.war.ctrl; U.war.ctrl = clamp(b + fx.sucCtrl); add(U.war.ctrl - b, 'Контроль над Рейхом', '🗺️'); }
  if (fx.sucWar) Game.sucStartWar(fx.sucWar);
  if (fx.sucWin) Game.sucWin(fx.sucWin);
  if (fx.sucCourse) { U.course = fx.sucCourse; S.pillars = { old: ['faith', 'new'], thaw: ['liberals', 'left'], army: ['hawks', 'oligarchs'] }[U.course].filter(f => S.fac[f]); }
});
Game.previewHooks.push((fx, out) => {
  if (!isDark()) return;
  const first = [];
  if (fx.sucExpo) first.push({ icon: '👁️', d: -fx.sucExpo, label: 'Подозрения канцелярии', text: `подозрения ${sign(fx.sucExpo)}` });
  if (fx.sucAuth) first.push({ icon: '✒️', d: fx.sucAuth, label: 'Личный авторитет', text: `авторитет ${sign(fx.sucAuth)}` });
  if (fx.sucReady) first.push({ icon: '🪖', d: fx.sucReady, label: 'Готовность гарнизонов', text: `готовность ${sign(fx.sucReady)}` });
  if (fx.sucRival) for (const [k, d] of Object.entries(fx.sucRival)) first.push({ icon: '⚖️', d: -d, label: `Влияние: ${RIVALS_D[k].short}`, text: `${RIVALS_D[k].short} ${sign(d)}` });
  if (fx.sucCtrl) first.push({ icon: '🗺️', d: fx.sucCtrl, label: 'Контроль над Рейхом', text: `контроль ${sign(fx.sucCtrl)}` });
  if (fx.sucPact) first.push({ icon: '🤝', d: 1, label: 'Союз', text: 'союз' });
  if (fx.colSet) { const [k, d] = fx.colSet; if (d.ctrl) first.push({ icon: '🗺️', d: d.ctrl, label: 'Контроль', text: `контроль ${sign(d.ctrl)}` }); if (d.unrest) first.push({ icon: '🔥', d: -d.unrest, label: 'Волнения', text: `волнения ${sign(d.unrest)}` }); if (d.auto) first.push({ icon: '📜', d: 1, label: 'Самоуправление', text: 'самоуправление' }); if (d.auto === false) first.push({ icon: '📜', d: -1, label: 'Самоуправление', text: 'самоуправление отменено' }); if (d.left) first.push({ icon: '🚪', d: -1, label: 'Уход', text: 'владение потеряно' }); }
  if (fx.colAll) first.push({ icon: '🗺️', d: fx.colAll, label: 'Контроль над владениями', text: `контроль над владениями ${sign(fx.colAll)}` });
  if (fx.cwSet) for (const [k, d] of Object.entries(fx.cwSet)) first.push({ icon: '☢️', d: k === 'arms' ? d : -d, label: k, text: `${{ japan: 'соперничество с Токио', usa: 'соперничество с Вашингтоном', arms: 'паритет', ju: 'вражда Токио и Вашингтона' }[k]} ${sign(d)}` });
  if (fx.sucHealth) first.push({ icon: '🩺', d: fx.sucHealth, label: 'Здоровье Фюрера', text: `здоровье Фюрера ${sign(fx.sucHealth)}` });
  out.unshift(...first);
});
Object.assign(Game, {
  sucStartWar(kind) {
    const U = Game.suc(), [topK] = Game.sucTop();
    const enemy = kind === 'legit' ? 'ss' : kind === 'early' ? 'ss' : topK;
    U.phase = 'war'; U.hadWar = true;
    U.war = { kind, enemy, q: 0, ctrl: clamp({ legit: 44, rebel: 32, early: 26 }[kind] + U.ready / 6 + (S.fac.hawks.a - 50) / 8), promised: false, rome: false };
    Game.log(`Началась гражданская война. Противник: ${RIVALS_D[enemy].name}.`);
  },
  sucWin(how) {
    const U = Game.suc();
    U.phase = 'rule'; U.wonBy = how; U.wonAt = S.turn; S.leader.title = 'Фюрер'; U.war = U.war ? { ...U.war, over: true } : null;
    U.ownFunds = Math.round(S.treasury); S.treasury = (how === 'war' ? 45 : 75) + Math.max(0, Math.round(S.treasury / 3)); darkNames(); // теперь в вашем распоряжении казна Рейха
    if (how === 'war') { S.economy = clamp(S.economy - 6); S.fac.new.s = clamp(S.fac.new.s - (U.war && U.war.enemy === 'ss' ? 18 : 4)); }
    Game.log(how === 'peace' ? 'Сенат партии назвал вас преемником.' : 'Гражданская война окончена. Власть в ваших руках.');
  },
});
// Пока жив Фюрер и пока идёт война, обычных путчей и революций нет: их место занимают арест и исход войны
const DARK_HARD = 1.15; // эта версия чуть жёстче основной игры
const _coupRiskD = Game.coupRisk, _revRiskD = Game.revRisk;
Game.coupRisk = function () { if (!isDark()) return _coupRiskD.call(Game); const U = Game.suc(); return U.phase === 'rule' ? clamp(_coupRiskD.call(Game) * DARK_HARD, 0, 0.5) : U.phase === 'wait' ? clamp(Math.max(0, U.expo - 55) / 150, 0, 0.3) : 0; };
Game.revRisk = function () { if (!isDark()) return _revRiskD.call(Game); return Game.suc().phase === 'rule' ? clamp(_revRiskD.call(Game) * DARK_HARD, 0, 0.5) : 0; };
Game.forcedList.push(() => {
  if (!isDark() || S.over) return null;
  const U = Game.suc();
  if (U.phase === 'wait' && U.health <= 0) return Game.sucDeathScene();
  if (U.phase === 'war' && U.war && !U.war.over) {
    if (U.war.ctrl >= 80) return Game.sucWarEndScene(true);
    if (U.war.ctrl <= 15) return Game.sucWarEndScene(false);
    if (U.war.q >= 10) return { title: 'Распад', bg: 'night', crisis: true, lines: [['narrator', 'Третий год войны. Гауляйтеры Востока больше не отвечают ни вам, ни Берлину. Рим ввёл войска в Тироль «для защиты порядка». Рейха, за который вы воевали, больше нет.']], choices: [{ text: 'Признать это', fx: { end: 'collapse' }, res: 'Вы подписали последнюю сводку.' }], after: () => 'collapse' };
  }
  return null;
});
Game.forcedList.push(() => (isDark() && !S.over && Game.suc().phase === 'rule' && Game.suc().courseAsked ? Game.cw70Crisis() : null));
Game.forcedList.push(() => (isDark() && !S.over && Game.suc().phase === 'rule' && !Game.suc().triumph && !Game.suc().courseAsked ? Game.sucTriumphScene() : null));
Game.forcedList.push(() => (isDark() && !S.over && Game.suc().phase === 'rule' && !Game.suc().courseAsked ? Game.sucCourseScene() : null));
// Арест вместо путча, пока идёт борьба
const _coupD = Game.coupScene;
Game.coupScene = function (role) {
  if (!isDark()) return _coupD.call(Game, role);
  const U = Game.suc();
  if (U.phase === 'wait') return Game.sucSummonsScene();
  if (U.phase === 'war') return {
    title: 'Измена на фронте', bg: 'night', crisis: true,
    lines: [['narrator', `${S.adv.defense.name} перешёл к противнику и увёл с собой два полка. Карты, шифры и расположение ваших частей — у них.`]],
    choices: [{ text: 'Перестроить оборону', fx: { sucCtrl: -12, army: -4 }, res: 'Фронт удержали, отдав предместья. Командовать теперь будет тот, кому вы ещё можете верить.' }],
    after: () => { Game.fireAdvisor('defense'); return null; },
  };
  const sc = _coupD.call(Game, role);
  const ssLed = S.fac.new && S.fac.new.a < 35;
  sc.title = ssLed ? 'Ночь охранных отрядов' : 'Путч генералов';
  sc.lines = [
    ['narrator', ssLed ? 'Три часа ночи. Чёрные грузовики у рейхсканцелярии. Телефонная станция не отвечает.' : 'Три часа ночи. Танки армии резерва на Вильгельмштрассе. Караул сменён без вашего приказа.'],
    ['npc:colonel', 'Именем Рейха. Вы отстранены. Сдайте оружие.'],
  ];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Выступить по радио'; c0.win.res = 'Вас услышали. Части, не знавшие, кому верить, остались в казармах. К утру путчисты сдались.'; c0.lose.res = 'Передатчик отключили на второй фразе.';
  c1.win.res = 'Караульный батальон отбил здание. К утру всё кончено.'; c1.lose.res = 'Караул сложил оружие, не сделав ни выстрела.';
  if (c2) { c2.text = 'Звонить в Рим'; if (c2.win) c2.win.res = 'Дуче позвонил командующим округами. Через час колонны остановились.'; if (c2.lose) c2.lose.res = 'В Риме ответили, что это внутреннее дело Рейха.'; }
  if (c3) { c3.text = 'Улететь в Мадрид'; c3.res = 'Самолёт взлетел с Темпельхофа до рассвета.'; }
  return sc;
};
const _revD = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revD.call(Game);
  if (!isDark()) return sc;
  sc.title = 'Всеобщая стачка';
  sc.lines = [
    ['narrator', 'Заводы Берлина встали в понедельник. Во вторник — Рур и Силезия. В среду на площади перед Большим залом стоят двести тысяч человек, и никто не кричит. Они просто стоят.'],
    ['npc:rebel', 'Двадцать пять лет. Хватит.'],
    ['defense', 'Части ждут приказа, {addr}. Но в оцеплении сыновья тех, кто на площади.'],
  ];
  if (sc.choices[2]) { sc.choices[2].text = 'Улететь в Мадрид'; sc.choices[2].res = 'Самолёт взлетел, когда толпа вошла в правительственный квартал.'; }
  return sc;
};
// Ультиматум силы Рейха: претенденту — «определитесь, с нами вы или нет», Фюреру — требование под угрозой
const ULT_PRE = {
  hawks: ['Армии нужно знать, с кем вы. Дайте слово, что после «дня икс» дивизии СС будут подчинены штабу, — или мы найдём другого кандидата.', { fac: { new: { a: -8 } }, sucExpo: 4 }, () => ({ sucReady: -8, sucRival: { [Game.sucTop()[0]]: 4 } }), 'Генерал вышел, не попрощавшись. Через неделю ваших офицеров перестали приглашать в штаб армии резерва.'],
  oligarchs: ['Концерны платят тем, кто их слышит. Подтвердите квоты и заказы — или взносы пойдут в другую приёмную.', { fac: { left: { a: -6 } } }, () => ({ treasury: -10, sucRival: { [Game.sucTop()[0]]: 3 } }), 'Взносы прекратились в тот же месяц. Говорят, у вашего соперника появился новый фонд.'],
  left: ['Заводы ждут твёрдых норм снабжения. Обещайте их при свидетелях — или уполномоченные скажут рабочим, что вы такой же, как остальные.', { fac: { oligarchs: { a: -6 } }, sucExpo: 3 }, () => ({ support: -4, sucAuth: -1 }), 'На заводских собраниях вашу фамилию теперь произносят с той же интонацией, что и остальные.'],
  liberals: ['Нам нужно знать, будет ли пересмотр дел. Скажите «да» хотя бы здесь, в этой комнате.', { fac: { new: { a: -8 } }, sucExpo: 5 }, () => ({ sucAuth: -1 }), 'Он ушёл молча. В министерствах о вас больше не говорят «этот — другой».'],
  faith: ['Гауляйтеры хотят гарантий: каждый остаётся в своём гау, никого не трогают. Подпишите — или сенат вспомнит, что у него есть и другие кандидаты.', { fac: { liberals: { a: -5 } }, sucExpo: 3 }, () => ({ sucRival: { [Game.sucTop()[0]]: 5 } }), 'Двенадцать гауляйтеров в тот же вечер ужинали у вашего соперника.'],
  new: ['Рейхсфюрер хочет знать, намерены ли вы и дальше стоять у него на пути. Ответ нужен сейчас.', { fac: { hawks: { a: -8 }, liberals: { a: -6 } }, sucRival: { ss: 3 } }, () => ({ sucExpo: 10 }), 'СС передала в канцелярию всё, что у неё на вас накопилось. Накопилось немало.'],
};
const ULT_RULE = {
  hawks: ['Армии нужны деньги и ясность. Повысьте жалованье офицерам и уберите СС из гарнизонов — или армия решит вопрос сама.', 'Генералы перестали отвечать на звонки из рейхсканцелярии. В штабах идут совещания, о которых вам не докладывают.'],
  oligarchs: ['Снизьте налоги и уберите уполномоченных Трудового фронта с заводов. Иначе производство встанет «по техническим причинам».', 'За неделю встали три комбината — «по техническим причинам». Деньги концернов уходят в Цюрих.'],
  left: ['Нормы, жильё и конец ночным арестам на заводах. Или завтра встанет Рур.', 'Рур встал. За ним Силезия. Уполномоченные разводят руками: рабочие «устали».'],
  liberals: ['Пересмотр дел и конец цензуры в институтах. На вас смотрит мир, и ваши собственные инженеры — тоже.', 'Сто профессоров подали в отставку в один день. Американское радио читает их письмо третьи сутки.'],
  faith: ['Гауляйтеры требуют вернуть полномочия, отнятые центром. Иначе гау перестанут выполнять распоряжения Берлина.', 'Распоряжения из Берлина в гау теперь «изучают». Изучают долго.'],
  new: ['СС требует подтвердить её права: свой суд, свои дивизии, свои заводы. Иначе охранные отряды сочтут себя свободными от присяги.', 'Охранные отряды выведены из подчинения имперским комиссарам. Официально — «для учений».'],
};
const _facUltD = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltD.call(Game, f);
  if (!isDark()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0];
  if (darkPre()) {
    const [ask, give, ignore, ignoreText] = ULT_PRE[f] || ULT_PRE.new;
    sc.lines = [['narrator', `${name} пришёл без приглашения. Двое его людей остались в приёмной.`], [sp, ask], ['police', 'Если откажете, они пойдут к вашему сопернику. Если уступите, остальные решат, что на вас можно давить.']];
    sc.choices = [
      { text: 'Дать слово', fx: Game.mergeFxD({ fac: { [f]: { a: 25 } } }, give), res: `${name} получил, за чем пришёл. Остальные скоро узнают, что вам можно ставить условия.` },
      { text: 'Откупиться из своих фондов', adv: ['economy'], req: S => S.treasury >= 20, reqText: 'нужно 20 млн', fx: { treasury: -20, fac: { [f]: { a: 18 } } }, res: 'Конверт был толстым. Разговор отложен — до следующего раза.' },
      { text: 'Отказать', fx: () => Game.mergeFxD({ fac: { [f]: { a: -8, s: 3 } } }, ignore()), res: ignoreText },
    ];
    return sc;
  }
  const [ask, ignoreText] = ULT_RULE[f] || ULT_RULE.new;
  sc.lines = [['narrator', `${name} явился в рейхсканцелярию без вызова. Караул его пропустил.`], [sp, ask], ['police', 'Если откажете, они ударят по самому больному. Если уступите, остальные решат, что на Фюрера можно давить.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} уходит с тем, за чем пришёл. Остальные внимательно смотрят, чем это кончится.`;
  c1.text = 'Откупиться из личного фонда'; c1.res = 'Конверт был толстым. Требование отложено — до следующего раза.';
  c2.win.res = 'Его взяли у выхода из рейхсканцелярии. Те, кто стоял за ним, затихли.'; c2.lose.res = 'Арест сделал из него знамя. Его фамилию пишут мелом на стенах казарм и цехов.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayD = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayD.call(Game, role);
  if (!isDark()) return sc;
  const A = S.adv[role];
  sc.title = 'Измена в штабе';
  sc.lines = [['narrator', `${A.name} перешёл к вашим противникам и унёс с собой всё, что знал.`], ['narrator', 'Его место займёт родственник. Больше доверять некому.']];
  sc.choices[0].text = 'Принять к сведению'; sc.choices[0].res = 'Замки сменены, шифры тоже. То, что он знал, уже не вернуть.';
  return sc;
};
Game.quarterHooks.push(rep => {
  if (!isDark()) return;
  const U = Game.suc(), hardK = { easy: 0.8, normal: 1, hard: 1.2 }[S.diff] || 1;
  if (U.phase === 'wait') {
    U.health = clamp(U.health - rnd(2.2, 3.8));
    if (S.turn >= 23) U.health = Math.min(U.health, 0);
    S.fear = clamp(Math.max(S.fear + 1, 50));
    U.expo = clamp(U.expo - 1.5 + (S.fac.new.a < 25 ? 1 : 0));
    for (const [k, R] of Object.entries(U.rivals)) {
      const F = S.fac[RIVALS_D[k].fac];
      R.base = (R.base || 45) + 0.3; // чем ближе «день икс», тем плотнее соперники собирают своих
      R.infl = clamp(R.infl + (0.5 + rnd(-1, 1.2) + (F.s - 42) / 45 - (F.a - 50) / 55) * hardK + ((R.base || 42) - R.infl) * 0.06, 22, 95);
    }
    if (U.pact && S.fac[RIVALS_D[U.pact].fac].a < 35) { rep.warn.push(`${RIVALS_D[U.pact].name[0].toUpperCase() + RIVALS_D[U.pact].name.slice(1)} разорвал союз с вами.`); U.pact = null; }
    rep.lines.push(`Сводка канцелярии: Фюрер ${healthWord(U.health)}.`);
    if (U.expo >= 55) rep.warn.push('За вами наблюдают. Ещё немного заметной активности — и вас вызовут для объяснений.');
  } else if (U.phase === 'war' && U.war && !U.war.over) {
    const W = U.war, E = U.rivals[W.enemy];
    const d = ((S.army - 55) / 10 + (S.fac.hawks.a - 50) / 12 + U.ready / 25 - (E.infl - 35) / 10 * hardK + (S.support - 45) / 20) * 0.6 + rnd(-3, 3) + (S.treasury < 0 ? -2 : 0);
    W.ctrl = clamp(W.ctrl + d); W.q++;
    S.economy = clamp(S.economy - 2.5); S.support = clamp(S.support - 1.5); S.treasury -= 6;
    rep.lines.push(`Сводка с фронта: под вашим контролем ${Math.round(W.ctrl)}% Рейха (${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(0)} за квартал).`);
    rep.warn.push('Идёт гражданская война: хозяйство разрушается, казна тает.');
  } else if (U.phase === 'rule') {
    Game.colQuarter(rep); Game.cw70Quarter(rep); Game.projQuarter(rep);
    if (U.course === 'thaw') { S.fac.new.s = clamp(S.fac.new.s - 0.8); S.fear = clamp(S.fear - 0.5); }
    if (U.course === 'old') S.economy = clamp(S.economy - 0.4);
  }
  rep.lines = rep.lines.map(moveTextD); rep.warn = rep.warn.map(moveTextD);
});
// Хозяйство Рейха стоит на вывозе с Востока. Отказ от него — правильный и дорогой.
Game.incomeHooks.push(() => (isDark() && Game.suc().phase === 'rule' ? { label: 'Вывоз из владений', v: Game.colIncome() } : null));
Game.incomeHooks.push(() => (isDark() && Game.suc().phase === 'rule' && Game.projCost() ? { label: 'Проекты Рейха', v: -Game.projCost() } : null));
Game.incomeHooks.push(() => (isDark() && Game.suc().phase === 'rule' && Game.colUpkeep() ? { label: 'Гарнизоны во владениях', v: -Game.colUpkeep() } : null));
// Пока вы претендент, казны у вас нет: только средства ведомства и взносы тех, кто на вас ставит
const _budgetCalcD = Game.budgetCalc, _budgetFxD = Game.budgetEffects;
Game.budgetCalc = function () {
  if (!isDark() || Game.suc().phase === 'rule') return _budgetCalcD.call(Game);
  const U = Game.suc(), war = U.phase === 'war' && U.war && !U.war.over;
  const hookInc = [{ label: 'Средства вашего ведомства', v: S.regime === 'techno70' ? 9 : 7 }, { label: 'Взносы концернов', v: Math.max(0, Math.round((S.fac.oligarchs.a - 40) / 10)) }];
  if (war) hookInc.push({ label: 'Расходы на войну', v: -6 });
  const income = hookInc.reduce((a, x) => a + x.v, 0);
  return { simple: true, taxes: 0, taxPop: 0, taxCorp: 0, exports: 0, aid: [], aidSum: 0, extra: 0, hookInc, costs: { army: 0, police: 0, health: 0, edu: 0, subsidy: 0, infra: 0, media: 0 }, spend: 0, palace: 0, loans: 0, income, expense: 0, net: income };
};
Game.budgetEffects = function () {
  if (!isDark() || Game.suc().phase === 'rule') return _budgetFxD.call(Game);
  return { tot: { army: 0, fear: 0, support: 0, economy: 0 }, fac: { hawks: { a: 0, s: 0 }, liberals: { a: 0, s: 0 }, left: { a: 0 }, oligarchs: { a: 0 }, faith: { a: 0 } }, items: {} };
};
// Бюджет и распоряжения появляются только у главы Рейха; агитация — только у претендента
Game.tabHidden = t => isDark() && ((['budget', 'decrees', 'colony', 'cw70'].includes(t) && Game.suc().phase !== 'rule') || (['agit', 'suc'].includes(t) && Game.suc().phase === 'rule'));
const darkPre = () => isDark() && Game.suc().phase !== 'rule';
// Пока вы претендент, ваши люди делают для вас другое, чем министры для главы государства
const ROLES_W = {
  defense: { title: 'Военный референт', action: 'Разговор с командирами', actionDesc: 'Ваш человек сводит вас с командирами полков. Растут готовность гарнизонов и одобрение вермахта. −6 млн.' },
  economy: { title: 'Хозяйственный референт', action: 'Сбор средств', actionDesc: 'Концерны и банки дают тому, на кого ставят. Фонды растут, директора ждут ответных услуг.' },
  police: { title: 'Связной в полиции', action: 'Проверка окружения', actionDesc: 'Кто из ваших людей докладывает не только вам. Подозрения канцелярии снижаются. −4 млн.' },
  propaganda: { title: 'Референт по печати', action: 'Заметка в печати', actionDesc: 'Ваше имя в хронике дня, без громких слов. Личный авторитет растёт. −4 млн.' },
  foreign: { title: 'Референт по внешним делам', action: 'Ужин с послами пакта', actionDesc: 'Рим и Мадрид присматриваются к претендентам. Отношения улучшаются. −5 млн.' },
};
const darkNames = () => {
  if (!isDark()) return;
  const pre = Game.suc().phase !== 'rule';
  STAT_NAMES.treasury = pre ? 'Ваши фонды' : 'Казна Рейха';
  for (const r of Object.keys(ROLES_D)) Object.assign(ROLES[r], pre ? ROLES_W[r] : ROLES_D[r]);
};

// ---------- скелеты механик правителя ----------
// «Больной человек Европы»: владения Рейха. Империя не может ни удержать завоёванное, ни отпустить.
const COL_D = {
  ost: { name: 'Рейхскомиссариат Остланд', short: 'Остланд', what: 'лес, сланцы, порты Балтики', loc: 'в Остланде', gen: 'Остланда', from: 'из Остланда', y: 4, ctrl: 75, unrest: 30 },
  ukr: { name: 'Рейхскомиссариат Украина', short: 'Украина', what: 'зерно, уголь, руда', loc: 'на Украине', gen: 'Украины', from: 'с Украины', y: 8, ctrl: 65, unrest: 45 },
  mos: { name: 'Рейхскомиссариат Московия', short: 'Московия', what: 'лес и рабочая сила', loc: 'в Московии', gen: 'Московии', from: 'из Московии', y: 5, ctrl: 50, unrest: 60 },
  kav: { name: 'Рейхскомиссариат Кавказ', short: 'Кавказ', what: 'нефть', loc: 'на Кавказе', gen: 'Кавказа', from: 'с Кавказа', y: 7, ctrl: 60, unrest: 50 },
  afr: { name: 'Германская Центральная Африка', short: 'Африка', what: 'уран, медь, каучук', loc: 'в Центральной Африке', gen: 'Центральной Африки', from: 'из Центральной Африки', y: 3, ctrl: 55, unrest: 40 },
};
Object.assign(Game, {
  col() { const U = Game.suc(); if (!U.col) U.col = Object.fromEntries(Object.entries(COL_D).map(([k, d]) => [k, { ctrl: d.ctrl, unrest: d.unrest, auto: false, left: false, lost: false }])); return U.col; },
  colHeld(k) { const T = Game.col()[k]; return !T.left && !T.lost; },
  colYield(k) { const T = Game.col()[k]; return Game.colHeld(k) ? COL_D[k].y * T.ctrl / 100 * (T.auto ? 0.7 : 1) * (Game.suc().course === 'thaw' ? 0.6 : 1) : 0; },
  colIncome() { return Math.round(Object.keys(COL_D).reduce((a, k) => a + Game.colYield(k), 0) * 10) / 10; },
  colUpkeep() { return Object.keys(COL_D).reduce((a, k) => a + (Game.colHeld(k) ? 1 + (Game.col()[k].unrest >= 60 ? 1 : 0) : 0), 0); },
  colHot() { return Object.keys(COL_D).filter(k => Game.colHeld(k)).sort((a, b) => Game.col()[b].unrest - Game.col()[a].unrest)[0] || null; },
  colRich() { return Object.keys(COL_D).filter(k => Game.colHeld(k)).sort((a, b) => Game.colYield(b) - Game.colYield(a))[0] || null; },
  colAuto() { return Object.keys(COL_D).find(k => Game.colHeld(k) && Game.col()[k].auto) || null; },
  colGone() { return Object.keys(COL_D).find(k => !Game.colHeld(k)) || null; },
  rivOld() { const U = Game.suc(), enemy = U.war && U.war.enemy; return Object.keys(U.rivals).filter(k => k !== 'ss' && k !== enemy).sort((a, b) => U.rivals[b].infl - U.rivals[a].infl)[0] || null; },
  colActions(k) {
    const T = Game.col()[k], D = COL_D[k];
    if (!Game.colHeld(k)) return [];
    return [
      { id: 'garrison', name: 'Усилить гарнизоны', cost: '−10 млн', ok: S.treasury >= 10, fx: { treasury: -10, army: -2, rel: { usa: -2 }, colSet: [k, { ctrl: 10, unrest: -4 }] } },
      { id: 'auto', name: 'Дать самоуправление', cost: T.auto ? 'уже дано' : '', ok: !T.auto, fx: { fac: { liberals: { a: 5 }, new: { a: -6 }, hawks: { a: -3 } }, rel: { usa: 3 }, colSet: [k, { unrest: -18, ctrl: -5, auto: true }] } },
      { id: 'leave', name: 'Уйти', cost: '', ok: true, danger: true, fx: { fac: { hawks: { a: -10 }, new: { a: -10 }, faith: { a: -6 }, liberals: { a: 8 } }, rel: { usa: 6 }, support: 2, colSet: [k, { left: true }] } },
    ];
  },
  colAction(k, id) {
    const a = Game.colActions(k).find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const changes = Game.apply(a.fx);
    const text = `${COL_D[k].short}: ${{ garrison: 'гарнизоны усилены. Стало тише. Надолго ли — зависит не от гарнизонов.', auto: 'объявлено местное самоуправление. Вывоз сократится, стрельба — тоже.', leave: 'администрация и войска выведены. На карте Рейха стало одним цветом меньше.' }[id]}`;
    Game.log(text);
    return { text, changes };
  },
  colQuarter(rep) {
    const U = Game.suc();
    for (const k of Object.keys(COL_D)) {
      if (!Game.colHeld(k)) continue;
      const T = Game.col()[k];
      T.unrest = clamp(T.unrest + 0.9 + rnd(-1, 1.6) + (U.course === 'old' ? 0.5 : U.course === 'thaw' ? -0.4 : 0) - (T.auto ? 0.8 : 0) + (S.army < 45 ? 0.8 : 0));
      T.ctrl = clamp(T.ctrl + (48 - T.unrest) / 14 - 0.4);
      if (T.ctrl <= 12) {
        T.lost = true;
        S.support = clamp(S.support - 3); S.fac.hawks.a = clamp(S.fac.hawks.a - 7); S.fac.new.a = clamp(S.fac.new.a - 5); S.army = clamp(S.army - 3);
        rep.warn.push(`${COL_D[k].name} потерян: гарнизоны отошли к границе, администрация бежала. Армия и СС винят вас.`);
      } else if (T.unrest >= 70) rep.warn.push(`${COL_D[k].short}: восстание разрастается, контроль ${Math.round(T.ctrl)}%.`);
    }
  },
  // Холодная война трёх держав: Рейх, Япония, США. Когда двое договариваются, третьему хуже.
  cw70() { const U = Game.suc(); if (!U.cw) U.cw = { japan: 55, usa: 60, ju: 50, arms: 50, crisisAt: -9 }; return U.cw; },
  cw70Actions() {
    const C = Game.cw70();
    return [
      { id: 'arms', name: 'Гонка вооружений', desc: 'Ракеты, лодки, бомбардировщики. Паритет растёт, хозяйство платит, соперничество обостряется со всеми.', cost: '−15 млн', ok: S.treasury >= 15, fx: { treasury: -15, economy: -1, fac: { hawks: { a: 3 } }, cwSet: { arms: 8, japan: 3, usa: 3 } } },
      { id: 'detj', name: 'Разрядка с Токио', desc: 'Раздел сфер в Азии на бумаге, горячая линия, обмен наблюдателями. Вашингтон заподозрит сговор.', cost: '−5 млн', ok: S.treasury >= 5, fx: { treasury: -5, rel: { japan: 5 }, fac: { hawks: { a: -3 } }, cwSet: { japan: -10, usa: 4 } } },
      { id: 'detu', name: 'Разрядка с Вашингтоном', desc: 'Зерно в обмен на списки интернированных и сокращение ракет. Токио заподозрит сговор, СС — измену.', cost: '−5 млн', ok: S.treasury >= 5, fx: { treasury: -5, rel: { usa: 5 }, fac: { new: { a: -5 }, liberals: { a: 3 } }, cwSet: { usa: -10, japan: 4 } } },
      { id: 'play', name: 'Стравить Токио и Вашингтон', desc: 'Утечки, перехваты, подставные инциденты на Тихом океане. Если поверят — им станет не до вас.', cost: '', ok: true, odds: 0.5, fx: {}, win: { cwSet: { ju: 12 } }, lose: { cwSet: { japan: 6, usa: 6 } } },
    ];
  },
  cw70Action(id) {
    const a = Game.cw70Actions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = { ...a.fx }, text = a.name + '. ';
    if (a.odds !== undefined) { const ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose); text += ok ? 'Они поверили. В Токио и Вашингтоне отзывают послов друг у друга.' : 'Подлог раскрыт. Обе столицы требуют объяснений от Берлина.'; }
    else text += a.desc.split('. ')[0] + '.';
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  cw70Quarter(rep) {
    const C = Game.cw70();
    C.ju = clamp(C.ju + rnd(-3, 3) + (50 - C.ju) * 0.04);
    const third = C.ju >= 65 ? -0.6 : C.ju <= 35 ? 0.7 : 0; // враждуют — ищут вашей дружбы; сговорились — давят вместе
    for (const k of ['japan', 'usa']) C[k] = clamp(C[k] + 0.7 + rnd(-1, 1.4) + third + ((S.rel[k] || 40) < 30 ? 0.5 : (S.rel[k] || 40) > 60 ? -0.8 : 0) + (C.arms < 35 ? 0.6 : 0));
    C.arms = clamp(C.arms - 0.8);
    if (C.arms < 35) { S.fac.hawks.a = clamp(S.fac.hawks.a - 1); rep.warn.push('Паритет вооружений потерян: генералы требуют денег на ракеты.'); }
    if (Math.max(C.japan, C.usa) >= 75) rep.warn.push(`Холодная война: соперничество с ${C.japan >= C.usa ? 'Токио' : 'Вашингтоном'} на пределе, жди кризиса в одной из дальних стран.`);
  },
  cw70Crisis() {
    const C = Game.cw70(), k = C.japan >= C.usa ? 'japan' : 'usa';
    if (C[k] < 85 || S.turn - C.crisisAt < 6) return null;
    C.crisisAt = S.turn;
    const J = k === 'japan', cap = J ? 'Токио' : 'Вашингтон';
    const T = pick(J ? [['Персия', 'В Тегеране свергнут шах, получавший германское оружие. Новое правительство принимает японских советников и японские кредиты.'], ['Индия', 'В Дели, где Берлин двадцать лет содержал «национальное правительство», у власти офицеры, обученные в Токио.'], ['Афганистан', 'Кабул разорвал договор с Рейхом. На аэродромах — японские транспортные самолёты.']]
      : [['Бразилия', 'В Рио свергнут президент, державшийся на германских колонистах и германских займах. Хунту признал Вашингтон в тот же день.'], ['Аргентина', 'Буэнос-Айрес выслал германских советников. В порту разгружаются американские суда.'], ['Южная Африка', 'Правительство в Претории, союзное пакту, пало. Новое просит американской защиты.']]);
    return {
      title: `Кризис: ${T[0]}`, bg: 'office', crisis: true,
      lines: [
        ['foreign', `${T[1]}`],
        ['defense', `До нас им не дотянуться, как и нам до них: между нами океаны и полмира. Воюют чужими руками. Послать оружие и советников мы можем. Паритет — ${Math.round(C.arms)} из ста: ${C.arms >= 50 ? 'нас примут всерьёз.' : 'нас могут не принять всерьёз.'}`],
        ['economy', 'Это далеко и дорого. Но если уступать каждый раз, друзей у Рейха за морями не останется.'],
      ],
      choices: [
        { text: 'Послать оружие и советников', adv: ['defense'], req: S => S.treasury >= 12, reqText: 'нужно 12 млн', chance: () => clamp(0.25 + C.arms / 140, 0.2, 0.8),
          win: { fx: { treasury: -12, support: 2, fac: { hawks: { a: 6 } }, cwSet: { [k]: -12 } }, res: `Через три месяца в столице снова правительство, которое берёт германские кредиты. ${cap} сделал вид, что ничего не было.` },
          lose: { fx: { treasury: -12, fac: { hawks: { a: -6 } }, cwSet: { [k]: -4 } }, res: 'Оружие досталось тем, против кого его слали. Советники вернулись через Мадрид, не все.' } },
        { text: 'Признать новую власть', adv: ['foreign'], fx: { fac: { hawks: { a: -7 }, faith: { a: -3 }, liberals: { a: 3 } }, cwSet: { [k]: -18 } }, res: `Посол Рейха вручил верительные грамоты. В генеральном штабе карту мира перерисовали: ещё одна страна сменила цвет.` },
        { text: 'Не вмешиваться и не признавать', fx: { fac: { hawks: { a: -3 } }, cwSet: { [k]: -8 } }, res: 'Берлин промолчал. Молчание заметили все.' },
      ],
      after: () => null,
    };
  },
});

// ---------- проекты Рейха: несколько кварталов платишь, потом — удача или провал ----------
const PROJ_GROUPS = { tech: 'Счётные машины и связь', wunder: 'Чудо-оружие', plan: 'Большие планы' };
const PROJ_D = {
  comp: { g: 'tech', name: 'Электронные вычислительные машины', q: 4, cost: 5, p: 0.55, tech: true,
    desc: 'Счётные машины для министерств и заводов. Лучших специалистов уволили ещё в тридцатых; остальных собирают по провинциальным институтам.',
    ok: [{ economy: 6, fac: { liberals: { a: 5, s: 3 } } }, 'Первая серийная машина считает план по стали за ночь. Ведомства, считавшие его полгода, встревожены.'],
    fail: [{ fac: { liberals: { a: -4 } } }, 'Опытный образец занимает три зала и ошибается в сложении. Тему закрыли.'] },
  net: { g: 'tech', name: 'Имперская сеть связи', need: 'comp', q: 5, cost: 6, p: 0.5, tech: true,
    desc: 'Соединить вычислительные машины министерств, заводов и гау в одну сеть. Инженеры говорят об обмене сведениями, СС — о картотеке на каждого.',
    ok: [{ economy: 5, fear: 5, fac: { new: { a: 5 }, liberals: { s: 4 } } }, 'Сеть связала сорок городов. По ней идут сводки, заказы и доносы — с одинаковой скоростью.'],
    fail: [{ economy: -1 }, 'Ведомства отказались пускать друг друга в свои машины. Кабель проложен, передавать по нему нечего.'] },
  tank: { g: 'wunder', name: 'Сухопутный крейсер', q: 4, cost: 8, p: 0.4,
    desc: 'Танк в тысячу тонн с корабельными орудиями. Генералы просили обычные танки, но чертежи лежат с сорок второго года и нравятся партии.',
    ok: [{ army: 6, fac: { hawks: { a: 6 }, faith: { a: 4 } }, cwSet: { arms: 6 } }, 'Два крейсера прошли по полигону. Мосты для них придётся строить отдельно, но на параде они будут.'],
    fail: [{ fac: { hawks: { a: -6 } } }, 'Первый образец проломил мост на испытаниях и остался в реке. Генералы напомнили, что просили другое.'] },
  carrier: { g: 'wunder', name: 'Наземный авианосец', q: 5, cost: 8, p: 0.35,
    desc: 'Гусеничная платформа длиной двести метров с полосой для самолётов. Для степей Востока, где нет аэродромов.',
    ok: [{ army: 4, support: 3, fac: { hawks: { a: 4 } }, cwSet: { arms: 5 } }, 'Платформа движется со скоростью пешехода и принимает самолёты. В кинохронике она выглядит убедительно.'],
    fail: [{ economy: -2, fac: { hawks: { a: -5 } } }, 'Платформа сошла с испытательной трассы на втором километре и больше не двигалась. Её разбирают на металл.'] },
  laser: { g: 'wunder', name: 'Лучевое оружие', q: 6, cost: 7, p: 0.4, tech: true,
    desc: 'Луч, сбивающий ракеты. Если получится, паритет вооружений перестанет зависеть от числа ракет. Физиков, способных это сделать, осталось немного.',
    ok: [{ fac: { hawks: { a: 6 } }, rel: { usa: -4, japan: -4 }, cwSet: { arms: 14 } }, 'Установка прожгла стальной лист на расстоянии двух километров. Токио и Вашингтон узнали об этом через неделю.'],
    fail: [{}, 'Установка прожигает фанеру с десяти метров и потребляет электричество целого города. Работы свёрнуты.'] },
  germania: { g: 'plan', name: 'Столица мира', q: 6, cost: 8, p: 0.6,
    desc: 'Достроить Берлин по чертежам сорокового года: Триумфальная арка, Южный вокзал, проспект шириной сто двадцать метров. Партия ждёт этого тридцать лет.',
    ok: [{ support: 4, fear: 2, fac: { faith: { a: 8 } } }, 'Арка открыта. Она в три раза выше парижской и видна из любой точки города, в том числе оттуда, откуда её не хотят видеть.'],
    fail: [{ support: -2, fac: { faith: { a: -4 } } }, 'Берлинский грунт не держит такой вес: фундамент арки осел на метр. Стройку огородили забором и убрали из газет.'] },
  bahn: { g: 'plan', name: 'Ширококолейная магистраль', q: 6, cost: 7, p: 0.5,
    desc: 'Железная дорога с колеёй три метра от Берлина до Урала: двухэтажные вагоны, составы по восемь тысяч тонн. Войска и зерно дойдут вдвое быстрее.',
    ok: [{ economy: 5, colAll: 6 }, 'Первый состав прошёл от Берлина до Волги за сорок часов. Владения стали ближе — в обе стороны.'],
    fail: [{ economy: -1 }, 'Проложено шестьсот километров из трёх тысяч. Дальше болота, партизаны и смета, которую никто не решается подписать.'] },
  atlantropa: { g: 'plan', name: 'Плотина в Гибралтаре', q: 8, cost: 9, p: 0.3,
    desc: 'Перекрыть Гибралтар, опустить Средиземное море на сто метров, получить землю и электричество на всю Европу. Рим в ужасе: его порты окажутся на суше.',
    ok: [{ economy: 10, support: 3, rel: { italy: -18, spain: -8 } }, 'Плотина стоит. Море отступает на метр в год. Итальянский флот перебазируется на рейд, который скоро станет пляжем.'],
    fail: [{ rel: { italy: -8 }, fac: { oligarchs: { a: -5 } } }, 'Пролив глубже и течение сильнее, чем в расчётах. Первую перемычку унесло за ночь. Рим вздохнул с облегчением, вслух.'] },
  space: { g: 'plan', name: 'Орбитальный бомбардировщик', q: 6, cost: 8, p: 0.45, tech: true,
    desc: 'Ракетоплан, который облетает Землю по орбите. Проект лежит с войны. Американцы уже ходят по Луне, и это стало вопросом не обороны, а самолюбия.',
    ok: [{ support: 5, fac: { hawks: { a: 4 }, liberals: { s: 3 } }, cwSet: { arms: 8 } }, 'Ракетоплан сделал один виток и сел в казахской степи. Пилота показывают в хронике. О том, что было с двумя первыми, не говорят.'],
    fail: [{ support: -2 }, 'Ракета взорвалась на старте. В газетах сообщили об «успешном испытании двигателя».'] },
};
Object.assign(Game, {
  proj() { const U = Game.suc(); if (!U.proj) U.proj = { active: [], done: {} }; return U.proj; },
  projChance(id) {
    const P = PROJ_D[id], U = Game.suc();
    return clamp(P.p + (P.tech && S.flags.dkScience ? 0.1 : 0) + (P.tech && S.fac.liberals.a >= 55 ? 0.05 : 0) + (P.tech && U.course === 'thaw' ? 0.1 : 0) + (S.economy >= 55 ? 0.05 : 0) - (S.economy < 35 ? 0.1 : 0), 0.2, 0.8);
  },
  projCost() { return Game.proj().active.reduce((a, x) => a + PROJ_D[x.id].cost, 0); },
  projCan(id) {
    const P = PROJ_D[id], R = Game.proj();
    if (R.done[id] === 'ok') return 'завершён';
    if (R.active.some(x => x.id === id)) return 'идёт';
    if (P.need && R.done[P.need] !== 'ok') return `сначала «${PROJ_D[P.need].name}»`;
    if (R.active.length >= 2) return 'не больше двух проектов сразу';
    if (S.treasury < P.cost) return `нужно ${P.cost} млн`;
    return '';
  },
  projStart(id) {
    if (Game.projCan(id) || !Game.spend()) return null;
    Game.proj().active.push({ id, left: PROJ_D[id].q });
    const text = `Проект «${PROJ_D[id].name}» начат. ${PROJ_D[id].q} кв. по ${PROJ_D[id].cost} млн.`;
    Game.log(text);
    return { text, changes: [] };
  },
  projStop(id) { const R = Game.proj(); R.active = R.active.filter(x => x.id !== id); Game.log(`Проект «${PROJ_D[id].name}» закрыт до завершения. Потраченного не вернуть.`); },
  projQuarter(rep) {
    const R = Game.proj();
    for (const x of [...R.active]) {
      if (--x.left > 0) continue;
      const P = PROJ_D[x.id], ok = Math.random() < Game.projChance(x.id), [fx, text] = ok ? P.ok : P.fail;
      R.active = R.active.filter(y => y !== x); R.done[x.id] = ok ? 'ok' : 'fail';
      Game.apply(fx, { silent: true });
      (ok ? rep.lines : rep.warn).push(`Проект «${P.name}» — ${ok ? 'успех' : 'провал'}. ${text}`);
      Game.log(`Проект «${P.name}»: ${ok ? 'успех' : 'провал'}. ${text}`);
    }
  },
});

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isDark()) return;
  const U = Game.suc(), ex = 'Мадриде';
  const T = {
    purged: ['Арестован', 'Партийный суд заседал сорок минут. Приговор не публиковали. Ваше имя убрали из справочников, фотографии — из архивов. Через год новые сотрудники канцелярии не знали, что такой человек был.'],
    knives: ['Вторая ночь длинных ножей', U.hadWar
      ? 'Штаб взяли на рассвете. Суда не было. За одну ночь расстреляли всех, кто командовал вашими частями, и многих из тех, кто просто не успел присягнуть. Радио назвало это «пресечением мятежа». Ваша фамилия стояла в списке первой. Феллер правит Рейхом, в котором больше некому возразить.'
      : 'Девять дней ничего не происходило. В ночь на десятый чёрные грузовики остановились у сорока домов одновременно: гауляйтеры, генералы, статс-секретари — все, вокруг кого могла бы собраться сила. Радио назвало это «пресечением заговора». В списке из ста шестнадцати фамилий ваша стояла третьей. Тем, кому потом разрешат писать историю, велят называть эту ночь иначе.'],
    banish: ['Ссылка', U.hadWar
      ? 'Крайс мог вас расстрелять и не стал: мёртвый соперник — знамя, сосланный — пример. Вас отправили за Урал «уполномоченным по заготовкам» — под надзор, без права переписки. Шесть тысяч километров от Берлина, одна железная дорога, одна газета, которая приходит через месяц. В ней о вас не пишут.'
      : 'Крайс не мстит: он переводит. Вас назначили генеральным комиссаром округа за Уралом — шесть тысяч километров от Берлина, одна железная дорога, связь только через канцелярию. Приказ подписан «с благодарностью за службу». Отказаться было нельзя. Вернуться — тоже.'],
    pension: ['Почётная пенсия', (U.lostTo === 'techno70'
      ? (U.hadWar ? 'Хольм объявил, что гражданской войны не было: было «расхождение во взглядах на хозяйственные вопросы». ' : '') + 'Вам предложили место в наблюдательном совете концерна и пенсию по прежнему званию. Кабинет с видом на Рейн, секретарь, телефон, который не звонит. Раз в год вас приглашают на приём и сажают далеко от микрофона.'
      : (U.hadWar ? 'Фон Траутен объявил, что гражданской войны не было: было «недоразумение между товарищами по оружию». Ваших командиров судили без вас. ' : 'Фельдмаршал уважает тех, кто умеет проигрывать. ') + 'Вам оставили звание, мундир и имение в Баварии. Раз в год — приглашение на парад, в третий ряд трибуны. Караул у ворот отдаёт честь и записывает фамилии гостей.')],
    sidelined: ['Отодвинут', 'Вы проиграли в сенате и присягнули победителю. Вам оставили должность без полномочий и дом под наблюдением. Вы дожили до старости, читая в газетах о решениях, которые принимали бы иначе. Или так же.'],
    wardefeat: ['Проиграл войну', 'Штаб взяли на рассвете. Суда не было. Победитель объявил, что гражданской войны не было тоже: был мятеж, и он подавлен.'],
    collapse: ['Рейх распался', 'Война, которую вы начали или не смогли закончить, сделала то, чего не сделали противники Рейха за тридцать лет. На карте теперь шесть государств, три зоны оккупации и территории, о которых никто не знает ничего. Вы правите одним из обломков.'],
    partition: ['Перемирие', 'Линия фронта стала границей. По обе стороны — правительства, которые называют себя единственным законным. Вы правите своей половиной. Люди по обе стороны говорят, что стало тише, и больше ничего не говорят.'],
    exile: ['Бегство', `Вы живёте в ${ex} под чужой фамилией. Испанцы не выдают вас, пока это им выгодно. Из окна виден двор и стена.`],
    helicopter: ['Бегство', `Вы живёте в ${ex} под чужой фамилией. Испанцы не выдают вас, пока это им выгодно.`],
    coup: ['Свергнут', 'Вас сместили ночью, как вы и сами когда-то рассчитывали сместить других. Сообщение в газетах заняло четыре строки: «по состоянию здоровья».'],
    revolution: ['Стачка победила', 'Оцепление расступилось. Правительственный квартал заняли без выстрела. Вас судил открытый суд — первый открытый суд в этой стране за сорок лет. На нём впервые вслух зачитали то, что лежало в папке «О положении на Востоке».'],
    retired: ['Ушёл', 'Вы передали дела и уехали в поместье. Вас не тронули. Это всё, что можно сказать.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    E.title = { old: 'Хранитель', thaw: 'Тот, кто открыл ворота', army: 'Военная диктатура' }[U.course] || 'Преемник';
    E.text = `31 декабря ${Game.endYear() - 1} года. ` + ({
      old: 'Вы сохранили всё, что получили. Те же лозунги, те же лагеря, та же папка в сейфе. Хозяйство ветшает, союзники отдаляются, молодые не верят ни одному слову. Машина работает. Вы знаете, что она переживёт и вас, и что это не похвала ни ей, ни вам.',
      thaw: 'Лагеря закрыты. Люди, вернувшиеся с Востока, рассказывают то, что нельзя было рассказывать, и их слушают. Вы не искупили ничего — искупить это невозможно. Но вы остановили то, что могли остановить, и страна впервые за сорок лет говорит вслух. Что она скажет о вас — вы узнаете.',
      army: 'Партия распущена по казармам, СС подчинена штабу. Порядка стало больше, страха — не меньше. Генералы правят так, как умеют: приказами. О прошлом в армейских газетах пишут одно слово: «эксцессы».',
    }[U.course] || 'Вы удержали власть.') + (U.hadWar ? ' Города, разрушенные в гражданскую войну, отстроены наполовину.' : '');
  }
  verdicts.length = 0;
  if (U.phase === 'rule' && U.wonBy === 'peace') verdicts.push('Избран сенатом партии'); if (U.phase === 'rule' && U.wonBy === 'war') verdicts.push('Победил в гражданской войне');
  if (U.hadWar) verdicts.push('Прошёл через гражданскую войну'); if (U.pact && U.phase === 'rule') verdicts.push('Правил в союзе');
  if (U.course === 'thaw') verdicts.push('Распустил лагеря'); if (U.course === 'old') verdicts.push('Ничего не изменил');
  if (S.flags.darkRome) verdicts.push('В долгу у Рима');
  if (U.lostTo) verdicts.push(`Проиграл: ${RIVALS_D[U.lostTo].short}`);
  if (!verdicts.length) verdicts.push(S.flags.fuhrerDead ? 'Проиграл борьбу за преемство' : 'Не пережил Фюрера');
});

// ---------- газета без рубрик и шуток ----------
const _pressPageD = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isDark()) return _pressPageD.call(UI, news);
  const U = Game.suc(), ch = [];
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Сообщение: ' + h.head); }
  const date = `${[31, 30, 30, 31][S.q - 1]} ${MONTHS_Q[S.q - 1]} ${S.year} года`;
  const off = [];
  if (U.phase === 'wait') off.push(['Из рейхсканцелярии', `Фюрер ${healthWord(U.health)}. Слухи о его здоровье распространяют враги Рейха.`]);
  if (U.phase === 'war' && U.war && !U.war.over) off.push(['Сводка верховного командования', `Части, верные законной власти, удерживают ${Math.round(U.war.ctrl)}% территории Рейха. Мятежники несут потери.`]);
  off.push(['Хозяйство', S.economy >= 55 ? 'План квартала выполнен по стали и углю.' : S.economy >= 40 ? 'План квартала выполнен в основном.' : 'Отдельные трудности со снабжением преодолеваются.']);
  if (S.fear >= 60) off.push(['Народный суд', 'Вынесены приговоры по делам о подрыве обороноспособности. Фамилии не сообщаются.']);
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="dk-np">
      <div class="dk-np-mast"><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.germany33}</svg><span>Имперский обозреватель</span><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.germany33}</svg></div>
      <div class="dk-np-date">Берлин · ${date} · № ${301 + S.turn * 13} · проверено цензурой</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="dk-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит штаб?' : 'Дальше', 'wide');
};

// ---------- вкладка ----------
const _tabDecD = UI.tab_decrees;
UI.tab_decrees = function () {
  if (!isDark()) return _tabDecD.call(UI);
  const view = UI.dkView === 'dec' ? 'dec' : 'proj';
  const seg = `<div class="dtabs" role="tablist"><button class="${view === 'proj' ? 'on' : ''}" data-act="dkv:proj" role="tab">Проекты</button><button class="${view === 'dec' ? 'on' : ''}" data-act="dkv:dec" role="tab">Распоряжения</button></div>`;
  if (view === 'dec') return seg + _tabDecD.call(UI);
  const R = Game.proj(), pct = v => `${Math.round(v * 100)}%`;
  const active = R.active.map(x => { const P = PROJ_D[x.id]; return `<div class="proj-item dec"><div class="dec-main"><b>${esc(P.name)}</b><p class="muted small">Осталось кварталов: <b>${x.left}</b> из ${P.q}. Каждый квартал — ${P.cost} млн. Шанс успеха сейчас: ${pct(Game.projChance(x.id))}.</p><span class="bar dk-prog"><span style="width:${Math.round((P.q - x.left) / P.q * 100)}%"></span></span></div><button class="btn ghost small" data-act="prj:stop:${x.id}">Закрыть</button></div>`; }).join('');
  const card = id => { const P = PROJ_D[id], why = Game.projCan(id), st = R.done[id];
    return `<div class="proj-item dec ${st === 'ok' ? 'used' : ''}"><div class="dec-main"><b>${esc(P.name)}</b>${st === 'fail' ? ' <span class="chip banned">провал, можно повторить</span>' : st === 'ok' ? ' <span class="chip coopted">сделано</span>' : ''}<p class="muted small">${esc(P.desc)}</p>${why && why !== 'идёт' && why !== 'завершён' ? `<p class="small dk-why">Пока нельзя: ${esc(why)}.</p>` : ''}
      <div class="dec-fx"><div class="dec-row"><span class="dec-tag">Срок и цена</span><span class="fx neutral"><span>${P.q} кв. × ${P.cost} млн</span></span></div><div class="dec-row"><span class="dec-tag">Удача ${pct(Game.projChance(id))}</span>${UI.fxChips(Game.previewFx(P.ok[0]))}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${Object.keys(P.fail[0]).length ? UI.fxChips(Game.previewFx(P.fail[0])) : '<span class="fx neutral"><span>только потраченные деньги</span></span>'}</div></div></div>
      ${UI.actBtn('prj:start:' + id, { ok: !why, name: st === 'ok' ? 'Сделано' : why === 'идёт' ? 'Идёт' : 'Начать', cost: why ? '' : `−${P.cost} млн в кв.` })}</div>`; };
  return seg + `<p class="lede">Большие проекты Рейха: на них нужно несколько кварталов платить, и только в конце станет ясно, вышло или нет. Шанс зависит от состояния хозяйства, а у научных проектов — ещё и от того, остались ли в стране люди, способные их сделать. Одновременно можно вести не больше двух. Начать проект — один приказ.</p>
    ${active ? `<section class="card"><div class="eyebrow">Идут сейчас · −${Game.projCost()} млн в квартал</div><div class="proj dec-grid">${active}</div></section>` : ''}
    ${Object.entries(PROJ_GROUPS).map(([g, name]) => `<h3 class="sub-h mt">${name}</h3><div class="proj dec-grid">${Object.keys(PROJ_D).filter(id => PROJ_D[id].g === g).map(card).join('')}</div>`).join('')}`;
};
Object.assign(UI, {
  tab_colony() {
    const held = Object.keys(COL_D).filter(k => Game.colHeld(k)).length;
    return `<p class="lede">«Больным человеком Европы» Рейх называют в Вашингтоне и Токио: империя, которая не может ни удержать завоёванное, ни отпустить. Владения кормят хозяйство вывозом и съедают его гарнизонами. Волнения растут сами; когда контроль падает ниже 12%, владение потеряно, и армия с СС винят вас.</p>
      <p class="muted small dk-draft">Набросок механики: правила будут дополняться.</p>
      <section class="card"><div class="eyebrow">Баланс владений за квартал</div><div class="sp-facts"><span class="chip coopted">вывоз +${String(Game.colIncome()).replace('.', ',')} млн</span><span class="chip banned">гарнизоны −${Game.colUpkeep()} млн</span><span class="chip">удерживается ${held} из 5</span></div></section>
      <div class="grid mt">${Object.keys(COL_D).map(k => {
        const D = COL_D[k], T = Game.col()[k], gone = !Game.colHeld(k);
        return `<article class="card country ${gone ? 'dk-gone' : ''}"><header><div><h3>${esc(D.name)}</h3><span class="muted small">${esc(D.what)}</span></div><span class="chip ${gone ? 'banned' : T.auto ? 'coopted' : ''}">${T.left ? 'оставлен' : T.lost ? 'потерян' : T.auto ? 'самоуправление' : 'под управлением'}</span></header>
          ${gone ? '<p class="muted small">Здесь больше нет германской администрации.</p>' : `${UI.meter('Контроль', T.ctrl, T.ctrl >= 60 ? 'good' : T.ctrl >= 35 ? 'warn' : 'bad')}${UI.meter('Волнения', T.unrest, T.unrest >= 60 ? 'bad' : T.unrest >= 40 ? 'warn' : 'good')}
          <p class="muted small">Вывоз: +${Game.colYield(k).toFixed(1).replace('.', ',')} млн из ${D.y} возможных. Гарнизон: −${1 + (T.unrest >= 60 ? 1 : 0)} млн.</p>
          <div class="acts">${Game.colActions(k).map(a => UI.actBtn(`col:${k}:${a.id}`, a)).join('')}</div>`}</article>`; }).join('')}</div>`;
  },
  tab_cw70() {
    const C = Game.cw70(), acts = Game.cw70Actions();
    const tri = C.ju >= 65 ? 'Токио и Вашингтон на ножах: обоим нужна ваша благосклонность, соперничество с вами спадает.' : C.ju <= 35 ? 'Токио и Вашингтон договорились между собой и теснят друзей Рейха вместе.' : 'Токио и Вашингтон следят друг за другом не меньше, чем за вами.';
    return `<p class="lede">Три державы поделили мир и не могут дотянуться друг до друга: между ними океаны и тысячи километров. Они воюют чужими руками — в Южной Америке, Африке, Персии, Индии — и ракетами на бумаге. Соперничество растёт само; когда оно с кем-то доходит до 85, вспыхивает кризис в одной из дальних стран. Паритет вооружений тает каждый квартал: его приходится оплачивать. Когда двое договариваются, третьему хуже.</p>
      <p class="muted small dk-draft">Набросок механики: правила будут дополняться.</p>
      <div class="cr">
        <section class="card" style="flex:1.2"><div class="eyebrow">Соперничество</div>
          ${UI.meter('Рейх — Япония', C.japan, C.japan >= 75 ? 'bad' : C.japan >= 55 ? 'warn' : 'good')}
          ${UI.meter('Рейх — США', C.usa, C.usa >= 75 ? 'bad' : C.usa >= 55 ? 'warn' : 'good')}
          ${UI.meter('Япония — США', C.ju, 'str')}
          <p class="muted small">${tri}</p></section>
        <section class="card cr-side">${UI.meter('Паритет вооружений', C.arms, C.arms >= 50 ? 'good' : C.arms >= 35 ? 'warn' : 'bad')}
          <p class="muted small">Ниже 35 — генералы недовольны, а соперники смелее лезут в страны, которые Рейх считает своими друзьями. В кризисе от паритета зависит, чьих ставленников примут всерьёз.</p></section>
      </div>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
        <div class="dec-fx">${Object.keys(a.fx).length ? `<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>` : ''}${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${UI.fxChips(Game.previewFx(a.win))}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}</div></div>
        ${UI.actBtn('cw7:' + a.id, { ok: a.ok, name: 'Приказать', cost: a.cost })}</div>`).join('')}</div>`;
  },
  tab_agit() {
    const U = Game.suc(), acts = Game.agitActions(), war = U.phase === 'war';
    const F = REGIONS.reich70.factions;
    return `<p class="lede">${war ? 'Идёт война, но за вас по-прежнему должны быть люди: гарнизоны, заводы, гау.' : 'Пока Фюрер жив, у вас нет ни казны, ни права издавать распоряжения. Есть ваше ведомство, ваше имя и пять лет, чтобы силы Рейха привыкли видеть преемником вас.'} Каждое действие стоит один приказ. Одно и то же, повторённое в течение двух лет, даёт всё меньше.${war ? '' : ' Почти всё заметное растит подозрения канцелярии.'}</p>
      <section class="card"><div class="eyebrow">Кто за вас</div><div class="agit-forces">${Object.keys(SUC_W).filter(f => S.fac[f]).map(f => `<div class="agit-force"><span>${(F[f] || NEW_FACTIONS[DARK]).icon} ${esc((F[f] || NEW_FACTIONS[DARK]).short)}</span>${UI.meter('', S.fac[f].a, S.fac[f].a < 35 ? 'bad' : S.fac[f].a < 55 ? 'warn' : 'good')}<small>вес в сенате ${Math.round(SUC_W[f] * 100)}%</small></div>`).join('')}</div>
        <p class="muted small">Ваш вес в сенате сейчас: <b>${Game.sucScore() + Game.sucPactBonus()}</b>. Подозрения канцелярии: <b>${Math.round(U.expo)}</b>.</p></section>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
        <div class="dec-fx"><div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${UI.fxChips(Game.previewFx(a.win))}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}</div></div>
        ${UI.actBtn('agit:' + a.id, { ok: a.ok, name: 'Приказать', cost: a.cost })}</div>`).join('')}</div>`;
  },
  tab_suc() {
    const U = Game.suc(), my = Game.sucScore(), pb = Game.sucPactBonus();
    const acts = Game.sucActions();
    const actCard = a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
      <div class="dec-fx">${a.fx && Object.keys(a.fx).length ? `<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>` : ''}
      ${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${UI.fxChips(Game.previewFx(a.win || {}))}</div>${a.lose ? `<div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}` : ''}</div></div>
      ${UI.actBtn('suc:' + a.id, { ok: a.ok, danger: a.danger, name: 'Приказать', cost: a.cost })}</div>`;
    if (U.phase === 'rule') return `<p class="lede">Борьба окончена. Вы — ${esc(S.leader.title)} ${U.wonBy === 'war' ? 'по праву победителя в гражданской войне' : 'по решению сената партии'}. Теперь власть нужно удержать до ${Game.endYear()} года: против вас те, кого вы обошли, и те, кого вы обидели выбранным курсом.</p>
      <section class="card"><div class="eyebrow">Курс</div><p>${{ old: 'Всё остаётся, как при Гитлере. Опора — партия и СС. Хозяйство медленно ветшает.', thaw: 'Лагеря распущены, СС ограничена. Опора — реформисты и Трудовой фронт. СС слабеет с каждым кварталом, но пока сильна — опасна.', army: 'Власть армии. Опора — вермахт и концерны. Партия и СС ждут случая.' }[U.course] || 'Курс ещё не выбран.'}</p></section>`;
    if (U.phase === 'war') {
      const W = U.war;
      return `<p class="lede">Гражданская война. Противник — ${esc(RIVALS_D[W.enemy].name)}. Возьмите под контроль 80% Рейха, чтобы победить. Ниже 15% — поражение. Если война затянется дольше десяти кварталов, Рейх распадётся. Каждый квартал войны стоит 6 млн и разрушает хозяйство.</p>
        <div class="cr"><section class="card cr-side" style="flex:1">
          ${UI.meter('Контроль над Рейхом, %', W.ctrl, W.ctrl >= 60 ? 'good' : W.ctrl >= 35 ? 'warn' : 'bad')}
          ${UI.meter('Армия', S.army, S.army >= 60 ? 'good' : 'warn')}${UI.meter('Одобрение вермахта', S.fac.hawks.a, S.fac.hawks.a >= 55 ? 'good' : 'warn')}
          <p class="muted small">Идёт ${W.q + 1}-й квартал войны. На ход фронта влияют армия, одобрение вермахта, поддержка народа, казна и сила противника.</p></section></div>
        <div class="proj dec-grid mt">${acts.map(actCard).join('')}</div>`;
    }
    const rows = [{ look: S.leader.look, name: `${S.leader.title} ${S.leader.name} (вы)`, v: my + pb, me: true, note: pb ? `в том числе ${pb} от союзника` : 'ваш вес в сенате' },
      ...Object.entries(U.rivals).map(([k, R]) => ({ look: RIVALS_D[k].look, name: RIVALS_D[k].name[0].toUpperCase() + RIVALS_D[k].name.slice(1), v: Math.round(R.infl), note: U.pact === k ? 'ваш союзник: голосует за вас' : `${RIVALS_D[k].role}. ${RIVALS_D[k].desc}`, ally: U.pact === k }))].sort((a, b) => b.v - a.v);
    return `<p class="lede">Фюрер умирает. Когда он умрёт, сенат партии назовёт преемника — того, чей вес окажется больше. Ваш вес складывается из одобрения сил Рейха (его добывают на вкладке «Агитация») и личного авторитета. Здесь — интриги: соперники, союзы, гарнизоны. Если сенат выберет другого или СС не признает решения, останется оружие. Пока Фюрер жив, заметная подготовка считается изменой: следите за подозрениями.</p>
      <div class="cr">
        <section class="card" style="flex:1.4"><div class="eyebrow">Расклад в сенате партии</div>
          <div class="suc-rows">${rows.map(r => `<div class="suc-row ${r.me ? 'me' : ''} ${r.ally ? 'ally' : ''}"><div class="suc-face">${Portrait.svg(r.look)}</div><div class="suc-name"><b>${esc(r.name)}</b><span>${esc(r.note)}</span></div><span class="bar"><span style="width:${clamp(r.v)}%"></span></span><b class="suc-v">${r.v}</b></div>`).join('')}</div>
          <p class="muted small">Для мирной победы нужно быть первым с весом не ниже 45, а влияние рейхсфюрера СС должно быть ниже 55: иначе СС не признает решения сената.</p></section>
        <section class="card cr-side">
          ${UI.meter('Подозрения канцелярии', U.expo, U.expo >= 55 ? 'bad' : U.expo >= 35 ? 'warn' : 'good')}
          ${UI.meter('Готовность гарнизонов', U.ready, U.ready >= 25 ? 'good' : 'warn')}
          <div class="sp-facts"><span class="chip">Фюрер ${healthWord(U.health)}</span><span class="chip">личный авторитет: ${U.auth > 0 ? '+' : ''}${Math.round(U.auth)}</span>${U.pact ? `<span class="chip coopted">союз: ${esc(RIVALS_D[U.pact].short)}</span>` : ''}</div>
          <p class="muted small">По оценке вашего врача, осталось кварталов: ${Math.max(1, Math.min(23 - S.turn, Math.round(U.health / 3)))}. Подозрения выше 55 — и вас могут вызвать в рейхсканцелярию.</p>
        </section>
      </div>
      <div class="proj dec-grid mt">${acts.map(actCard).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (id.startsWith('dkv:')) { UI.dkView = id.slice(4); UI.render(); return true; }
  if (id.startsWith('prj:stop:')) { if (S.phase === 'hub') { Game.projStop(id.slice(9)); UI.render(); } return true; }
  if (id.startsWith('prj:start:')) { const out = Game.projStart(id.slice(10)); if (out) { UI.render(); UI.toast(out.text, out.changes); } return true; }
  return false;
});
UI.actionHandlers.push(id => {
  if (!id.startsWith('col:') && !id.startsWith('cw7:')) return false;
  const out = id.startsWith('col:') ? Game.colAction(id.split(':')[1], id.split(':')[2]) : Game.cw70Action(id.slice(4));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
UI.actionHandlers.push(id => {
  if (!id.startsWith('agit:')) return false;
  const out = Game.agitAction(id.slice(5));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
UI.actionHandlers.push(id => {
  if (!id.startsWith('suc:')) return false;
  const out = Game.sucAction(id.slice(4));
  if (out && out.end) { Game.ending(out.end); UI.showEnding(); return true; }
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});

// ---------- уволенного сменяет родич: лицо его, а одежда и биография — того мира, где идёт игра ----------
const KIN_FANTASY = { defense: 'Ваш кузен. Меч носит для красоты, зато носит красиво.', economy: 'Ваш дядя. Считает на пальцах и уверен, что их одиннадцать.', police: 'Ваша родня по матери. Знает все сплетни; половину сочинила сама.', propaganda: 'Ваш племянник. Громкий. Этим его дарования исчерпываются.', foreign: 'Ваш шурин. За границей был однажды, проездом, и рассказывает об этом всем.' };
const KIN_DARK = { defense: 'Ваш родственник. Предан лично вам. Иных достоинств в личном деле не указано.', economy: 'Ваш родственник. Счёт знает в пределах необходимого. Предан.', police: 'Ваш родственник. Вопросов не задаёт. Ответов тоже не знает.', propaganda: 'Ваш родственник. Говорит то, что велено, и теми же словами.', foreign: 'Ваш родственник. Языков не знает. За границей молчит, что уже немало.' };
const KIN_BIO = {
  domin: { defense: 'Ваш племянник. Доспех ему велик, зато начищен до блеска.', economy: 'Ваш кузен. Считает десятину на пальцах. Пальцев у него после службы девять.', police: 'Ваша родня. Ересь видит везде, кроме зеркала.', propaganda: 'Ваш шурин. Проповедует громко и не по теме.', foreign: 'Ваш зять. На окраинах не был: говорит, там сыро.' },
  realm: KIN_FANTASY, burg: KIN_FANTASY, crown: KIN_FANTASY, dark70: KIN_DARK, dark70i: KIN_DARK, dark70j: KIN_DARK,
  ship: { defense: 'Кадет. Вчера из Академии. Оружие держит так, будто оно может обидеться.', economy: 'Кадет. Реактор видел на схеме. Схема была красивая.', police: 'Кадет. Устав знает наизусть. Людей пока не встречал.', propaganda: 'Кадет медслужбы. Анатомию сдал со второго раза, зато честно.', foreign: 'Кадет. Владеет двумя языками; один из них родной.' },
  house: { defense: 'Ваш племянник. Клинок держит уверенно, пока никто не нападает.', economy: 'Ваш кузен. Считать его учили счётчики. Бросили на втором году.', police: 'Ваша родня. Ядов не знает, зато знает всех при дворе, а это почти то же самое.', propaganda: 'Ваш шурин. Поёт. Громко. Просили тише; не умеет.', foreign: 'Ваш зять. При дворе его принимают охотно: он безобиден.' },
};
const _fireAdvG = Game.fireAdvisor;
Game.fireAdvisor = function (role) {
  const was = S.adv[role] ? { ...S.adv[role].look } : {};
  const r = _fireAdvG.call(Game, role);
  if (!isGloom() || !S.adv[role]) return r;
  const A = S.adv[role], L = { ...A.look };
  for (const k of ['outfit', 'outfitColor', 'trim', 'steel', 'hat', 'hatColor', 'hatBand', 'hatMetal', 'gem', 'pips', 'medals', 'sash', 'tie', 'pin', 'plume']) { if (was[k] !== undefined) L[k] = was[k]; else delete L[k]; }
  if (!['none', 'round', 'pince', 'monocle'].includes(L.glasses)) L.glasses = 'none';
  L.cigar = false; L.bluetooth = false;
  if (!['none', 'thick', 'walrus', 'handlebar', 'pencil', 'waxed'].includes(L.mustache)) L.mustache = 'none';
  A.look = L;
  const bio = (KIN_BIO[S.era] || {})[role]; if (bio) A.bio = bio;
  return r;
};

// ---------- стройка имени правителя и порча монеты: в каждом мире свои ----------
// highway: [название, описание, начало, открытие]; print: [название, описание, итог]. {T} — титул в родительном падеже
const KIN = 'Подрядчик — ваш родич.';
const GLOOM_ECO = {
  domin: { highway: ['Собор имени {T}', `Через 3 квартала хозяйство +6. ${KIN}`, 'Собор заложен. Высота по проекту две мили; фундамент уже треснул, это учтено в смете.', 'Освящён собор имени {T}! Родич-подрядчик принёс благодарственную свечу. Свеча включена в счёт.'], print: ['Чрезвычайная десятина', 'Казна +25. Хозяйство −5, народ −2.', 'Десятина собрана дважды. Второй раз — «за прошлый век». Миры заплатили и запомнили.'] },
  house: { highway: ['Караванный тракт имени {T}', `Через 3 квартала хозяйство +6. ${KIN}`, 'Тракт через пески начат. Первый столб вбили вы лично; к утру его занесло.', 'Открыт караванный тракт имени {T}! Родич-подрядчик прислал благодарность и счёт за вывезенный песок.'], print: ['Разбавить монету', 'Казна +25. Хозяйство −5, подданные −2.', 'Монетный двор дома чеканил всю ночь. Солары стали легче. Купцы взвешивают их на ладони и молчат.'] },
  crown: { highway: ['Мост имени {T}', `Через 3 квартала хозяйство +6. ${KIN}`, 'Мост заложен. Первый камень уронили в реку; герольдмейстер объявил это доброй приметой.', 'Открыт мост имени {T}! Подрядчик, ваш шурин, прислал благодарность на гербовом пергаменте.'], print: ['Подмешать меди в монету', 'Казна +25. Хозяйство −5, народ −2.', 'В золотой венец добавили меди. Немного. Менялы заметили к обеду.'] },
  burg: { highway: ['Мостовая имени {T}', `Через 3 квартала хозяйство +6. ${KIN}`, 'Мостить начали с того конца, где живёт подрядчик.', 'Открыта мостовая имени {T}! Шурин-подрядчик прислал пирог.'], print: ['Чеканить гроши полегче', 'Казна +25. Хозяйство −5, горожане −2.', 'Грош стал легче. Торговки пирожками теперь принимают их на вес.'] },
  realm: { highway: ['Тракт имени {T}', `Через 3 квартала хозяйство +6. ${KIN}`, 'Тракт прокладывают големы. Прямо. Через всё, что стояло на пути.', 'Открыт тракт имени {T}! Племянник-подрядчик прислал благодарственный свиток.'], print: ['Наколдовать золота', 'Казна +25. Хозяйство −5, народ −2.', 'Алхимики наколдовали золото. К утру треть его снова стала свинцом, но уже в чужих кошельках.'] },
  dark70: { highway: ['Имперская автострада', 'Через 3 квартала экономика +6. Подряд получит человек со связями.', 'Строительство автострады начато.', 'Автострада открыта. Подрядчик отчитался о расходах; отчёт принят без проверки.'], print: ['Денежная эмиссия', 'Казна +25. Экономика −5, народ −2.', 'Банк выпустил новые деньги. Цены пошли вверх.'] },
  dark70i: { highway: ['Автострада Рим — Север', 'Через 3 квартала экономика +6. Подряд получит человек со связями.', 'Строительство автострады начато.', 'Автострада открыта. Подрядчик отчитался о расходах; отчёт принят без проверки.'], print: ['Денежная эмиссия', 'Казна +25. Экономика −5, народ −2.', 'Банк выпустил новые деньги. Цены пошли вверх.'] },
  dark70j: { highway: ['Скоростная магистраль', 'Через 3 квартала экономика +6. Подряд получит концерн со связями.', 'Строительство магистрали начато.', 'Магистраль открыта. Концерн отчитался о расходах; отчёт принят без проверки.'], print: ['Денежная эмиссия', 'Казна +25. Экономика −5, народ −2.', 'Банк выпустил новые деньги. Цены пошли вверх.'] },
};
const gloomEco = (id, i) => { const E = GLOOM_ECO[S.era]; return E && E[id] ? E[id][i].split('{T}').join(Game.titleGen()) : null; };
const _ecoActsG = Game.economyActions;
Game.economyActions = function () {
  const acts = _ecoActsG.call(Game);
  if (!isGloom() || !GLOOM_ECO[S.era]) return acts;
  return acts.map(a => (gloomEco(a.id, 0) ? { ...a, name: gloomEco(a.id, 0), desc: gloomEco(a.id, 1) } : a));
};
const _ecoFxG = Game.economyFx;
Game.economyFx = function (id) {
  const r = _ecoFxG.call(Game, id);
  if (!r || !isGloom() || !GLOOM_ECO[S.era] || !gloomEco(id, 2)) return r;
  r.text = gloomEco(id, 2);
  if (id === 'highway' && r.fx && r.fx.schedule && r.fx.schedule[0]) r.fx.schedule[0].text = gloomEco(id, 3);
  return r;
};
