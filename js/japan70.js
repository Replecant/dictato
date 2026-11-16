// «Диктато 1.2: Тучи над миром», лист 3: Япония. 1970–1979.
// Слабейшая из трёх держав. Игрок — премьер-министр: он не вождь, а человек, которому трон поручил составить кабинет.
// Кабинет стоит, пока в нём остаются люди двора, армии и флота («три печати»). Армия и флот враждуют между собой сильнее,
// чем с противником. Разделы: «Сфера сопроцветания», «Партия» (Ассоциация помощи трону и её клики), «Холодная война».
// Все действующие лица, кроме глав чужих держав, вымышлены. Император в игре не появляется: за него говорит хранитель печати.
const JAP = 'japan70';

// ---------- державы ----------
COUNTRIES.italy.leadersJ = [[1970.02, 'дуче Чиано'], [9999, 'преемник Чиано']];
const BLOCJ = { reich: 'pact', italy: 'pact', usa: 'west' };

// ---------- одежда: мундир армии, китель флота, кимоно с гербами, «народная форма» ----------
const JP_ARMY = (extra = {}) => ({ outfit: 'gunpuku', outfitColor: '#8a7d52', hat: 'gunbo', hatColor: '#8a7d52', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 3, sash: '', pin: false, ...extra });
const JP_NAVY = (extra = {}) => ({ outfit: 'kaigun', outfitColor: '#1d2538', hat: 'kaigunbo', hatColor: '#1d2538', hatMetal: '#c9a640', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 3, sash: '', pin: false, ...extra });
const JP_KIMONO = (extra = {}) => ({ outfit: 'montsuki', outfitColor: '#2a2a31', hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', pin: false, ...extra });
const JP_KOKU = (extra = {}) => ({ outfit: 'kokumin', outfitColor: '#6f7150', hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', pin: true, ...extra });
const JP_SUIT = (color = '#26282d', extra = {}) => ({ outfit: 'suit', outfitColor: color, hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: '#2a2a2a', medals: 0, sash: '', pin: false, ...extra });
// Тон кожи: тёплый, между светлым и смуглым из общей палитры, с небольшим разбросом между людьми
SKIN.east = '#e2b184';
const JP_SKINS = ['#e3b68a', '#deac7e', '#d8a475'];
const LJ = o => ({ skin: SKIN.east, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', ...o });

// ---------- кто вы: откуда пришёл премьер ----------
Object.assign(REGIME_TYPES, {
  kuge70: {
    name: 'Человек двора', icon: '👑',
    desc: 'Вы — князь из старого придворного рода, председатель палаты пэров. Хранитель печати назвал ваше имя трону. Двор вам верит, старые партийцы на вас надеются. Генералы и адмиралы считают вас ширмой и спорят, чьей.',
    fx: { support: 5 }, fac: { liberals: { a: 22 }, oligarchs: { a: 8 }, hawks: { a: -6 }, new: { a: -4 } }, rel: { usa: 5 },
  },
  rikugun70: {
    name: 'Генерал', icon: '⚔️',
    desc: 'Вы — генерал армии, бывший командующий в Маньчжурии. Армия получила своего премьера и ждёт своего бюджета. Флот ждёт того же и готов отозвать морского министра. Двор помнит, чем кончались кабинеты генералов.',
    fx: { army: 10, fear: 4 }, fac: { hawks: { a: 25, s: 4 }, new: { a: -14 }, liberals: { a: -6 }, faith: { a: 6 } }, rel: { reich: -4 },
  },
  kaigun70: {
    name: 'Адмирал', icon: '⚓',
    desc: 'Вы — адмирал флота, бывший морской министр. Флот считает, что наконец настала его очередь. Армия считает кабинет адмирала недоразумением, которое можно исправить. Дзайбацу довольны: флоту нужны верфи.',
    fx: { economy: 3 }, fac: { new: { a: 25 }, hawks: { a: -14 }, oligarchs: { a: 10 }, liberals: { a: 4 } }, rel: { usa: -4 },
  },
});
Object.assign(DEFAULT_PILLARS, { kuge70: ['liberals', 'oligarchs'], rikugun70: ['hawks', 'faith'], kaigun70: ['new', 'oligarchs'] });
REGIME_TITLES[JAP] = { kuge70: 'Премьер-министр', rikugun70: 'Премьер-министр', kaigun70: 'Премьер-министр' };
REGION_TITLES[JAP] = ['Премьер-министр'];
TITLE_FORMS['Премьер-министр'] = TITLE_FORMS['Премьер-министр'] || ['Премьер-министра', 'Премьер-министром'];
REGIME_SETUP_LOOK[JAP] = {
  kuge70: { ...JP_KIMONO(), hair: 'slick', mustache: 'pencil', glasses: 'round' },
  rikugun70: { ...JP_ARMY({ medals: 6 }), hair: 'short', mustache: 'thick', glasses: 'round' },
  kaigun70: { ...JP_NAVY({ medals: 6 }), hair: 'short', mustache: 'none', glasses: 'none' },
};
for (const k of ['kuge70', 'rikugun70', 'kaigun70']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[JAP][k], bluetooth: false };
const JP_NAMES = { kuge70: 'Нобуёси Татибана', rikugun70: 'Кэндзи Мураками', kaigun70: 'Сабуро Исикава' };
function japSetupLook(st, key) {
  const L = st.look;
  if (key === 'outfit') Object.assign(L, { montsuki: JP_KIMONO, gunpuku: JP_ARMY, kaigun: JP_NAVY, kokumin: JP_KOKU, suit: () => JP_SUIT('#26282d') }[L.outfit]({ hat: L.hat, glasses: L.glasses, medals: ['gunpuku', 'kaigun'].includes(L.outfit) ? 6 : 0 }));
  if (L.hat === 'gunbo') L.hatColor = '#8a7d52';
  if (L.hat === 'kaigunbo') L.hatColor = '#1d2538';
}

// ---------- страна ----------
NAME_POOLS.japan = { m: ['Хидэо', 'Сигэру', 'Ёсио', 'Кэйдзо', 'Такэси', 'Исаму', 'Дзиро', 'Тосио', 'Минору', 'Харуо'], f: ['Сэцуко', 'Фумико', 'Харуэ'], last: ['Кувабара', 'Хираока', 'Сонода', 'Цукамото', 'Одагири', 'Морисита', 'Тагава', 'Ногами', 'Эндо', 'Фунабаси'] };
RELATIVES_BY_STYLE.japan = { defense: 'Кузен Сабуро', economy: 'Шурин Кэйдзо', police: 'Дядюшка Гэндзо', propaganda: 'Племянник Юкио', foreign: 'Зять Хидэо' };
REGIONS[JAP] = {
  name: 'Япония', short: 'Япония',
  blurb: 'Океан от Сингапура до Гавайев и слабейшее хозяйство из трёх держав. Армия и флот воюют друг с другом за бюджет упорнее, чем когда-то с Америкой. Трон поручил вам составить кабинет. Прежний продержался одиннадцать месяцев.',
  country: 'Японская империя', capital: 'Токио', currency: 'иена',
  exports: 'суда, сталь и текстиль', exportGen: 'стали', company: 'концерн «Тоёхара»', patron: 'italy',
  sport: 'первенство империи', rival: 'Соединённые Штаты', rivalShort: 'США',
  disputed: 'Гавайские острова', faithLeader: 'Директор Ассоциации', capitalSquare: 'площади перед дворцом',
  jungle: 'джунглях Борнео', nephew: 'Кэндзи',
  countries: ['reich', 'usa', 'italy'],
  relInit: { reich: 40, usa: 22, italy: 45 },
  flag: FLAGS.japan,
  leaderSkin: 'east', era: 'dark70j', style: 'japan', faithStyle: 'yokusan', exile: 'Шанхае', critters: 'подданных',
  factions: {
    left: { name: 'Трудовые общества', short: 'Трудовые общества', icon: '🔧', desc: 'Общества служения отечеству на заводах и союзы арендаторов в деревне. Стачек нет с тридцать восьмого года. Рис по карточкам есть с сорок первого.' },
    liberals: { name: 'Двор', short: 'Двор', icon: '👑', desc: 'Хранитель печати, старейшины, палата пэров. Его величество не правит и не ошибается. Он назначает премьера по совету двора и может выразить «обеспокоенность». После этого кабинеты уходят сами.' },
    faith: { name: 'Ассоциация помощи трону', short: 'Ассоциация', icon: '🏛️', desc: 'Единственная партия империи. Вы её председатель по должности. В ней четыре клики, и каждая считает Ассоциацию своей.' },
    oligarchs: { name: 'Дзайбацу', short: 'Дзайбацу', icon: '🏭', desc: 'Четыре семейных концерна владеют банками, верфями, шахтами и половиной парламента. Армии они нужны, и армия их за это ненавидит.' },
    hawks: { name: 'Армия', short: 'Армия', icon: '⚔️', desc: 'Сто дивизий от Маньчжурии до Бирмы. Военный министр — действующий генерал; если армия его отзовёт и не назовёт другого, кабинет падёт. Она уже делала так девять раз.' },
  },
  advisors: {
    defense: { name: 'Генерал Кодзо Мидзуно', bio: 'Военный министр. В кабинете он представляет армию, а не наоборот.', look: LJ({ skin: JP_SKINS[2], face: 'square', hair: 'short', hairColor: '#8a8a8a', mustache: 'thick', ...JP_ARMY({ medals: 5 }) }) },
    economy: { name: 'Сюнсукэ Арима', bio: 'Министр финансов. Тридцать лет делит бюджет между армией и флотом. Остального бюджета не видел никогда.', look: LJ({ skin: JP_SKINS[0], face: 'long', hair: 'combover', hairColor: '#6a6a6a', glasses: 'round', brows: 'worried', ...JP_SUIT('#33363b') }) },
    police: { name: 'Горо Катаяма', bio: 'Министр внутренних дел. Особая высшая полиция докладывает ему о чужих мыслях. О своих он молчит.', look: LJ({ skin: JP_SKINS[1], face: 'oval', hair: 'slick', hairColor: '#2a2a2a', brows: 'angry', ...JP_KOKU() }) },
    propaganda: { name: 'Масао Уэда', bio: 'Глава Информационного бюро. Решает, что напечатают все газеты империи. Газет шестьсот, текст один.', look: LJ({ skin: JP_SKINS[2], face: 'round', hair: 'bald', hairColor: '#777', glasses: 'square', ...JP_KOKU() }) },
    foreign: { name: 'Барон Тадаси Нагаи', bio: 'Министр иностранных дел. Служил в Берлине и Вашингтоне. Знает, что обе столицы считают Японию третьей.', look: LJ({ skin: JP_SKINS[0], face: 'long', hair: 'slick', hairColor: '#b0b0b0', mustache: 'pencil', ...JP_KIMONO() }) },
  },
};
REGION_TALK[JAP] = { addr: 'господин премьер-министр', sir: 'господин', lady: 'госпожа', holiday_acc: 'День основания империи', holiday_dat: 'Дню основания империи', gringo: 'американцы', haven: 'Шанхай', exileTo: 'Шанхай', canteen: 'рис по карточкам', fruit_adj: 'Имперский', locale: 'Японии', pay_in_kind: 'Рисом.', vegas: 'горячие источники для отличившихся', rebel: 'Человек из толпы', meeting: 'в чайном доме' };
FAITH_TALK.yokusan = { priest_open: '', heavens: 'трону', faith_quip: 'Ассоциация ничего не забывает.', sermon: 'речи на собраниях Ассоциации', faith_appeal: 'Об этом узнают в Ассоциации.', temple_loc: 'в зале Ассоциации', righteous: 'В Ассоциации вас называют «верным слугой трона»' };
FAITH_TITLE.yokusan = 'Директор Ассоциации';
PAPERS[JAP] = ['Токийский вестник', 'подпольные листки'];
LEADER_STYLE[JAP] = {
  left: { male: true, title: 'Председатель общества', look: JP_KOKU({ mustache: 'thick', pin: false }) },
  liberals: { male: true, title: 'Хранитель печати', look: JP_KIMONO({ glasses: 'round', mustache: 'pencil' }) },
  faith: { male: true, title: 'Директор Ассоциации', look: JP_KOKU({ glasses: 'square' }) },
  oligarchs: { male: true, title: 'Глава концерна', look: JP_SUIT('#1d1e22', { glasses: 'round', tie: '#3a2a2a' }) },
  hawks: { male: true, title: 'Генерал', look: JP_ARMY({ medals: 6, mustache: 'thick' }) },
  new: { male: true, title: 'Адмирал', look: JP_NAVY({ medals: 6 }) },
};
NEW_FACTIONS[DARK_J] = {
  name: 'Флот', short: 'Флот', icon: '⚓',
  desc: 'Объединённый флот, морская авиация, Южные моря с их нефтью. Морской министр — действующий адмирал; отозвав его, флот валит кабинет так же, как армия. Армию флот считает сухопутной ошибкой.',
  rivals: ['hawks'], risk: 'coup', appear: () => true,
  intro: 'Морской генеральный штаб напомнил кабинету, что флот «оставляет за собой право на собственное мнение».',
  grow: () => 0,
};
function npcJ(key) {
  const M = {
    keeper: { name: 'Хранитель печати', look: LJ({ face: 'long', hair: 'combover', hairColor: '#b0b0b0', glasses: 'round', mustache: 'pencil', ...JP_KIMONO() }) },
    navymin: { name: 'Морской министр', look: LJ({ face: 'oval', hair: 'short', hairColor: '#8a8a8a', ...JP_NAVY({ medals: 5 }) }) },
    general: { name: 'Начальник генерального штаба', look: LJ({ face: 'square', hair: 'short', hairColor: '#999', mustache: 'thick', glasses: 'round', ...JP_ARMY({ medals: 6 }) }) },
    admiral: { name: 'Командующий Объединённым флотом', look: LJ({ face: 'long', hair: 'short', hairColor: '#aaa', ...JP_NAVY({ medals: 7, outfitColor: '#e6e4dc', hatColor: '#e6e4dc' }) }) },
    officer: { name: 'Капитан из полка гвардии', look: LJ({ face: 'long', hair: 'short', hairColor: '#1a1a1a', brows: 'angry', ...JP_ARMY({ medals: 0 }) }) },
    colonel: { name: 'Полковник военной полиции', look: LJ({ face: 'square', hair: 'short', hairColor: '#333', brows: 'angry', mustache: 'pencil', ...JP_ARMY({ medals: 2 }) }) },
    zaibatsu: { name: 'Глава концерна', look: LJ({ face: 'round', hair: 'bald', hairColor: '#888', glasses: 'round', ...JP_SUIT('#1d1e22', { tie: '#3a2a2a' }) }) },
    old: { name: 'Старый депутат', look: LJ({ face: 'round', hair: 'combover', hairColor: '#c0c0c0', mustache: 'thick', ...JP_KIMONO() }) },
    planner: { name: 'Начальник Планового управления', look: LJ({ face: 'long', hair: 'slick', hairColor: '#333', glasses: 'square', ...JP_KOKU() }) },
    worker: { name: 'Староста заводского общества', look: LJ({ face: 'square', hair: 'short', hairColor: '#333', mustache: 'thick', ...JP_KOKU({ pin: false, outfitColor: '#5c5a4a' }) }) },
    student: { name: 'Студент', look: LJ({ face: 'long', hair: 'short', hairColor: '#1a1a1a', glasses: 'round', brows: 'angry', ...JP_SUIT('#2a2d33', { tie: 'none', hat: 'hachimaki' }) }) },
    priest: { name: 'Настоятель святилища', look: LJ({ face: 'long', hair: 'bald', hairColor: '#aaa', outfit: 'robe', outfitColor: '#e8e4d8', trim: '#8e1b1b', hat: 'eboshi' }) },
    governor: { name: 'Командующий экспедиционной армией', look: LJ({ face: 'round', hair: 'bald', hairColor: '#888', mustache: 'thick', ...JP_ARMY({ medals: 5 }) }) },
    nanking: { name: 'Председатель нанкинского правительства', look: LJ({ skin: '#dba878', face: 'round', hair: 'slick', hairColor: '#555', glasses: 'round', ...JP_SUIT('#3a3d44', { tie: '#2a2a2a' }) }) },
    elder: { name: 'Староста деревни', look: LJ({ skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#999', beard: 'goatee', mustache: 'thick', brows: 'worried', outfit: 'robe', outfitColor: '#4a4640', trim: '#2a2a2a', hat: 'none' }) },
    reich_amb: { name: 'Посол Рейха', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#b9b0a0', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'none', ...DARK_PARTEI({ medals: 2 }) } },
    usa_amb: { name: 'Поверенный в делах США', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#b89a5a', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'none', ...JP_SUIT('#2a3340', { tie: '#3a2a2a' }) } },
    reporter: { name: 'Редактор «Токийского вестника»', look: LJ({ face: 'oval', hair: 'slick', hairColor: '#2a2018', glasses: 'round', ...JP_SUIT('#3a3530', { tie: '#5a2a2a' }) }) },
    rebel: { name: 'Человек из толпы', look: LJ({ face: 'oval', hair: 'short', hairColor: '#333', brows: 'angry', ...JP_KOKU({ pin: false, outfitColor: '#5c5a4a' }) }) },
  };
  const keys = Object.keys(M), n = M[key];
  if (n && !['reich_amb', 'usa_amb', 'nanking', 'elder'].includes(key)) n.look = { ...n.look, skin: JP_SKINS[keys.indexOf(key) % JP_SKINS.length] };
  return n || null;
}

// ---------- эпоха ----------
ERAS[DARK_J] = {
  name: '1970-е', label: 'Тучи над миром: Япония', start: 1970, turns: 40, dark: true,
  blurb: 'Мир, где победила «Ось». Япония — слабейшая из трёх держав. Кабинеты здесь не свергают: их оставляют без министра.',
  regions: [JAP], regimes: ['kuge70', 'rikugun70', 'kaigun70'], titles: ['Премьер-министр'],
  intro: '',
  aid: [],
  vars: { mast: 'ТОКИЙСКИЙ ВЕСТНИК', blame: 'враги империи', student_meme: '', swim_ref: '', rebel_icon: 'листовку', friendly_paper: 'римской газете', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' },
  defaultNames: { [JAP]: JP_NAMES.kuge70 },
};
const JAP_SETUP = {
  world: 'dark', era: DARK_J, region: JAP, regime: 'kuge70', name: JP_NAMES.kuge70, title: 'Премьер-министр', country: REGIONS[JAP].country, diff: 'normal',
  look: { skin: SKIN.east, face: 'oval', hair: 'slick', hairColor: '#2a2a2a', mustache: 'pencil', brows: 'normal', mouth: 'flat', ...JP_KIMONO({ glasses: 'round' }) },
};

// ---------- роли и тексты ----------
const ROLES_J = {
  defense: { title: 'Военный министр', action: 'Смотр войск', actionDesc: 'Армия видит, что кабинет о ней помнит. Генералы довольны, адмиралы — нет.' },
  economy: { title: 'Министр финансов', action: 'Хозяйственная программа', actionDesc: 'Заказы, кредиты, сырьё. Хозяйство растёт, если расчёты верны.' },
  police: { title: 'Министр внутренних дел', action: 'Аресты по спискам', actionDesc: 'Особая высшая полиция берёт «носителей опасных мыслей». Страх растёт.' },
  propaganda: { title: 'Глава Информационного бюро', action: 'Кампания в печати', actionDesc: 'Шестьсот газет печатают один текст. Поддержка растёт, пока ему верят.' },
  foreign: { title: 'Министр иностранных дел', action: 'Поездка по столицам', actionDesc: 'Берлин, Рим, нейтральный Лиссабон. Отношения улучшаются.' },
};
const ADV_TEXT_J = {
  defense: 'Смотр прошёл. Командиры дивизий отметили, что кабинет приехал к ним, а не к морякам.',
  economy: 'Программа запущена: заказы распределены, кредиты выданы.',
  police: 'Аресты проведены ночью. Утром в учреждениях тихо.',
  propaganda: 'Кампания идёт: ваше имя в передовицах, ваш голос по радио.',
  foreign: 'Поездка завершена. В столицах заверили в дружбе и записали всё, что услышали.',
};
const _eraLookJ = Game.eraLook;
Game.eraLook = function () {
  _eraLookJ.call(Game);
  if (!isJap()) return;
  for (const r of Object.keys(ROLES_J)) Object.assign(ROLES[r], ROLES_J[r]);
  STAT_NAMES.swiss = 'Личный счёт';
  SLIDERS.spend.find(d => d.k === 'palace').hint = 'Уходит на ваш личный счёт в Шанхае';
};
const _bankJ = Game.bank;
Game.bank = function () { return isJap() ? { name: 'Личный счёт', short: 'Личный счёт', to: 'Шанхай', at: 'в Шанхае', acc: 'ваш личный счёт в Шанхае', ins: 'личным счётом', dat: 'личному счёту в Шанхае' } : _bankJ.call(Game); };
const TJ = [
  ...TI.filter(([f]) => !['У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.', 'пришёл к власти. Режим:', 'переговоры с движениями, проекты, визиты, поручения советникам', 'Проекты и указы — на вкладке «Указы».', 'Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Риск революции'].includes(f)),
  ['У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.', 'У империи не осталось ни одного надёжного союзника.'],
  ['пришёл к власти. Режим:', 'получил повеление составить кабинет. Происхождение:'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с силами, распоряжения, визиты, поручения министрам, ходы в Ассоциации'],
  ['Проекты и указы — на вкладке «Указы».', 'Распоряжения — на вкладке «Распоряжения», борьба за кабинет — на вкладке «Партия».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Кабинет падает, когда двор, армия или флот отзывают своего человека: следите за их одобрением на вкладке «Партия». Народ ниже 30 — к рисовым бунтам.'],
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Берлин и Вашингтон сильнее Токио. Как не дать им договориться — на вкладке «Холодная война».'],
  ['Риск революции', 'Риск бунтов'], ['Риск стачки', 'Риск бунтов'],
];
const TJ_FAC = [...TD_FAC.filter(([f]) => !['молебны', 'проповеди', 'Сделать лидера министром', 'Места в правительстве'].includes(f)), ['молебны', 'собрания'], ['проповеди', 'резолюции']];
const _tabFacJ = UI.tab_factions;
UI.tab_factions = function () { const h = _tabFacJ.call(UI); return isJap() ? TJ_FAC.reduce((a, [f, t]) => a.split(f).join(t), h) : h; };
const _varsJ = Game.vars;
Game.vars = function () {
  const v = _varsJ.call(Game);
  if (!isJap()) return v;
  v.addr = 'господин премьер-министр';
  const FN = Game.fuhrerNew(); v.fuhrerNew = FN.name; v.fuhrerNewShort = FN.short; v.fuhrerNewWho = FN.who; v.fuhrer = Game.fuhrerChanged() ? FN.short : 'Гитлер';
  const hot = Game.sphHot(); if (hot) { v.sphHot = SPH[hot].name; v.sphHotIn = SPH[hot].loc; }
  return v;
};
const _renderJ = UI.render;
UI.render = function () {
  _renderJ.call(UI);
  if (!isJap()) return;
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; };
  set('cabinet', 'Резиденция'); set('factions', 'Силы'); set('decrees', 'Распоряжения'); set('world', 'Мир'); set('advisors', 'Министры'); set('log', 'Хроника');
  const pb = document.querySelector('.tabs button[data-tab="party70"]');
  if (pb) pb.classList.toggle('alert', Game.jpSeals().some(x => x.lvl === 'bad') || Game.jpMajority() < 50);
  const cb = document.querySelector('.tabs button[data-tab="jpcw"]'), C = Game.jpcw();
  if (cb) cb.classList.toggle('alert', Math.max(C.reich, C.usa) >= 75);
};
const DIFF_J = { easy: ['Передышка', 'Три приказа в квартал, больше денег, силы терпеливее.'], normal: ['Как было бы', 'Два приказа в квартал. Двор, армия и флот действуют в полную силу.'], hard: ['Без права на ошибку', 'Мало денег, силы обидчивее, министры ненадёжны. Итог ×1,4.'] };
const _renderSetupJ = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupJ.call(UI);
  if (!UI.setup || UI.setup.era !== DARK_J) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')];
  root.querySelector('h1').textContent = 'Дело № 3: Япония';
  ['Эпоха', '1. Страна', '2. Кто вы: откуда пришли', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Должность';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = 'Японская империя · 1970–1979';
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_J[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const st = UI.setup, inp = document.querySelector('#setup-name');
  if (Object.values(JP_NAMES).includes(st.name) && st.name !== JP_NAMES[st.regime]) { st.name = JP_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};

// ---------- состояние ----------
Game.jp = function () { if (!S.jp) S.jp = {}; return S.jp; };
const JP_SVC = { army: 'hawks', navy: 'new' };
const JP_SVC_NAME = { army: 'армии', navy: 'флота', civ: 'гражданского министерства' };

// ============================================================
// ТРИ ПЕЧАТИ: кабинет стоит, пока в нём люди двора, армии и флота
// ============================================================
const JP_SEAL_MIN = 25; // ниже — отзывают министра
Object.assign(Game, {
  jpSeals() {
    const P = Game.jpParty(), one = (f, name, icon) => { const a = S.fac[f] ? S.fac[f].a : 50; return { f, name, icon, a, lvl: a < JP_SEAL_MIN + 8 ? 'bad' : a < 45 ? 'warn' : 'good', word: a < JP_SEAL_MIN ? 'отзывает своего человека' : a < JP_SEAL_MIN + 8 ? 'на грани разрыва' : a < 45 ? 'колеблется' : 'поддерживает кабинет' }; };
    const L = [one('liberals', 'Двор', '👑'), one('hawks', 'Армия', '⚔️'), one('new', 'Флот', '⚓')];
    if (P.civMin) for (const x of L.slice(1)) if (x.a < JP_SEAL_MIN + 8) { x.word = 'отозвать министра больше не может'; x.lvl = 'warn'; }
    return L;
  },
  // Кто и почему валит кабинет прямо сейчас
  jpSealScene() {
    const J = Game.jp(), P = Game.jpParty();
    if (S.turn < 2 || S.turn - (J.sealAt === undefined ? -9 : J.sealAt) < 4) return null;
    const court = S.fac.liberals, army = S.fac.hawks, navy = S.fac.new;
    const svc = !P.civMin && army.a < JP_SEAL_MIN ? 'army' : !P.civMin && navy && navy.a < JP_SEAL_MIN ? 'navy' : null;
    if (svc) {
      J.sealAt = S.turn;
      const f = JP_SVC[svc], other = svc === 'army' ? 'new' : 'hawks', who = svc === 'army' ? 'Военный министр' : 'Морской министр', sp = svc === 'army' ? 'defense' : 'npc:navymin';
      const step = svc === 'army' ? -1 : 1, D = Game.jpDials();
      J.gave = J.gave || { army: 0, navy: 0 };
      const n = J.gave[svc], price = 10 + 6 * n, gain = Math.max(8, 22 - 5 * n), full = D.budget === step * 2;
      return {
        title: svc === 'army' ? 'Армия отзывает министра' : 'Флот отзывает министра', bg: 'office', crisis: true,
        lines: [
          [sp, `${svc === 'army' ? 'Армия' : 'Флот'} более не может нести ответственность за политику кабинета, {addr}. Я подаю в отставку. Преемника ${svc === 'army' ? 'генеральный штаб' : 'морской генеральный штаб'} не назовёт.`],
          ['economy', 'По закону военным и морским министром может быть только офицер на действительной службе. Нет министра — нет кабинета. Так пали девять правительств до нашего.'],
          ['npc:keeper', n ? 'Его величество осведомлён. Двор отмечает, что это происходит не в первый раз: каждая уступка обходится кабинету дороже прежней.' : 'Его величество осведомлён. Двор ждёт, как вы намерены поступить.'],
        ],
        choices: [
          { text: `Уступить: пересмотреть бюджет в пользу ${JP_SVC_NAME[svc]}`, req: S => S.treasury >= price && !full, reqText: full ? 'бюджет уже целиком у них: уступать нечем' : `нужно ${price} млн`, fx: { treasury: -price, fac: { [f]: { a: gain }, [other]: { a: -9 } }, jpDial: ['budget', clamp(D.budget + step, -2, 2)], jpGave: svc }, res: `${who} забрал прошение об отставке. Бюджет переписали за ночь. ${svc === 'army' ? 'Адмиралы' : 'Генералы'} прочли новую роспись и сделали выводы.` },
          { text: 'Просить повеления трона', adv: ['foreign'], req: () => court.a >= 50, reqText: 'одобрение двора ≥ 50', chance: () => clamp(0.3 + (court.a - 50) / 80 + (S.support - 50) / 300, 0.25, 0.85),
            win: { fx: { fac: { [f]: { a: 14 }, liberals: { a: -10 } } }, res: `Хранитель печати передал: его величество «желает, чтобы кабинет продолжал работу». ${svc === 'army' ? 'Генеральный штаб' : 'Морской штаб'} назвал нового министра к вечеру. Двор запомнил, что его попросили вмешаться.` },
            lose: { fx: { end: 'resigned', jpFall: svc }, res: 'Хранитель печати ответил, что трон не вмешивается в дела кабинета. Это и был ответ.' } },
          { text: 'Подать в отставку', fx: { end: 'resigned', jpFall: svc }, res: 'Вы отвезли прошение во дворец сами. Кабинет просуществовал дольше большинства предыдущих.' },
        ],
        after: darkEnd,
      };
    }
    if (court.a < JP_SEAL_MIN) {
      J.sealAt = S.turn;
      const both = army.a >= 55 && navy && navy.a >= 55;
      return {
        title: 'Его величество обеспокоен', bg: 'palace', crisis: true,
        lines: [
          ['npc:keeper', 'Его величество выразил обеспокоенность положением дел в империи, {addr}. Я обязан передать вам эти слова в точности.'],
          ['foreign', 'За сорок лет после таких слов ни один кабинет не продержался дольше недели. Формально вас никто не увольняет.'],
        ],
        choices: [
          { text: 'Просить аудиенции и объясниться', chance: () => clamp(0.25 + S.support / 200 + (Game.jpMajority() - 50) / 200, 0.2, 0.75),
            win: { fx: { fac: { liberals: { a: 18 } }, support: 2 }, res: 'Аудиенция длилась сорок минут. Вы говорили, его величество слушал. На прощание он спросил о здоровье вашей семьи. При дворе это считают прощением.' },
            lose: { fx: { end: 'resigned', jpFall: 'court' }, res: 'Аудиенция длилась шесть минут. Его величество выразил надежду, что вы найдёте время для отдыха.' } },
          { text: 'Опереться на армию и флот', adv: ['defense'], req: () => both, reqText: 'армия и флот ≥ 55', fx: { fear: 5, support: -3, fac: { liberals: { a: 8, s: -8 }, faith: { a: -5 } }, flag: { jpShogun: true } }, res: 'Оба министра заявили, что остаются в кабинете. Двор промолчал. В газетах слово «обеспокоенность» не появилось. Старики при дворе вспоминают, что так уже было: при сёгунах.' },
          { text: 'Подать в отставку', fx: { end: 'resigned', jpFall: 'court' }, res: 'Вы отвезли прошение во дворец в тот же вечер. Его приняли с благодарностью за службу.' },
        ],
        after: darkEnd,
      };
    }
    return null;
  },
});

// ============================================================
// СФЕРА СОПРОЦВЕТАНИЯ
// ============================================================
const SPH = {
  man: { name: 'Маньчжоу-го', full: 'Маньчжоу-го', what: 'уголь, сталь, соя; вотчина Квантунской армии', loc: 'в Маньчжурии', y: 10, ctrl: 78, unrest: 30, own: 'army' },
  chi: { name: 'Китай', full: 'Китайская республика (Нанкин)', what: 'рис, хлопок и война в глубине страны, которой тридцать три года', loc: 'в Китае', y: 7, ctrl: 45, unrest: 64, own: 'army' },
  nan: { name: 'Южные моря', full: 'Южные моря: Индонезия и Малайя', what: 'нефть, каучук, олово; без них флот не выйдет из гавани', loc: 'в Южных морях', y: 13, ctrl: 62, unrest: 42, own: 'navy' },
  phi: { name: 'Филиппины', full: 'Филиппинская республика', what: 'базы флота, сахар, копра', loc: 'на Филиппинах', y: 4, ctrl: 58, unrest: 48, own: 'navy' },
  sib: { name: 'Приморье', full: 'Приморье и Забайкалье', what: 'лес, рыба и линия раздела с Рейхом', loc: 'в Приморье', y: 4, ctrl: 62, unrest: 34, own: 'army' },
};
Object.assign(Game, {
  sph() { const J = Game.jp(); if (!J.sph) J.sph = Object.fromEntries(Object.entries(SPH).map(([k, d]) => [k, { ctrl: d.ctrl, unrest: d.unrest, own: d.own, auto: false, left: false, lost: false }])); return J.sph; },
  sphHeld(k) { const T = Game.sph()[k]; return !T.left && !T.lost; },
  sphYield(k) { if (!Game.sphHeld(k)) return 0; const T = Game.sph()[k]; return SPH[k].y * T.ctrl / 100 * (T.auto ? 0.7 : 1) * (T.own === 'civ' ? 1 : 0.6) * Game.jpDialQ().yield; },
  sphIncome() { return Math.round(Object.keys(SPH).reduce((a, k) => a + Game.sphYield(k), 0) * 10) / 10; },
  sphUpkeep() { return Object.keys(SPH).reduce((a, k) => a + (Game.sphHeld(k) ? 1 + (Game.sph()[k].unrest >= 60 ? 1 : 0) : 0), 0); },
  sphHot() { return Object.keys(SPH).filter(k => Game.sphHeld(k)).sort((a, b) => Game.sph()[b].unrest - Game.sph()[a].unrest)[0] || null; },
  sphCount() { return Object.keys(SPH).filter(k => Game.sphHeld(k)).length; },
  sphActions(k) {
    const T = Game.sph()[k], D = SPH[k];
    if (!Game.sphHeld(k)) return [];
    const f = JP_SVC[T.own], home = JP_SVC[D.own];
    const a = [{ id: 'garrison', name: 'Усилить войска', cost: '−8 млн', ok: S.treasury >= 8, fx: { treasury: -8, army: -2, ...(f ? { fac: { [f]: { a: 2 } } } : {}), sphSet: [k, { ctrl: 10, unrest: -4 }] } }];
    if (T.own !== 'civ') a.push({ id: 'civ', name: 'Передать гражданскому министерству', cost: '', ok: true, fx: { fac: { [f]: { a: -12 }, liberals: { a: 3 }, faith: { a: 3 } }, sphSet: [k, { own: 'civ', unrest: -6, ctrl: -4 }] } });
    else a.push({ id: 'back', name: `Вернуть в ведение ${JP_SVC_NAME[D.own]}`, cost: '', ok: true, fx: { fac: { [home]: { a: 8 } }, sphSet: [k, { own: D.own, unrest: 5, ctrl: 6 }] } });
    a.push({ id: 'auto', name: 'Расширить права правительства', cost: T.auto ? 'уже дано' : '', ok: !T.auto, fx: { fac: { hawks: { a: -4 }, new: { a: -2 }, liberals: { a: 2 } }, rel: { usa: 3 }, sphSet: [k, { unrest: -18, ctrl: -5, auto: true }] } });
    a.push({ id: 'leave', name: 'Вывести войска', cost: '', ok: true, danger: true, fx: { support: 1, fac: { [home]: { a: -14 }, [home === 'hawks' ? 'new' : 'hawks']: { a: -4 }, faith: { a: -4 } }, rel: { usa: 6 }, sphSet: [k, { left: true }] } });
    return a;
  },
  sphAction(k, id) {
    const a = Game.sphActions(k).find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const changes = Game.apply(a.fx);
    const text = `${SPH[k].name}: ${{ garrison: 'войска усилены. Стало тише. Надолго ли — зависит не от войск.', civ: 'управление передано министерству по делам Великой Восточной Азии. Доходы пойдут в казну, а не в штабную кассу. Штаб это запомнит.', back: 'управление возвращено военным. Чиновники министерства уехали первым же пароходом.', auto: 'правительству члена Сферы возвращены суд, полиция и таможня. Вывоз сократится, стрельба — тоже.', leave: 'войска выведены. «Сопроцветание» здесь кончилось; что начнётся взамен, из Токио не видно.' }[id]}`;
    Game.log(text);
    return { text, changes };
  },
  sphQuarter(rep) {
    const q = Game.jpDialQ();
    for (const k of Object.keys(SPH)) {
      if (!Game.sphHeld(k)) continue;
      const T = Game.sph()[k];
      T.unrest = clamp(T.unrest + 0.5 + rnd(-1, 1.5) + q.unrest - (T.auto ? 0.8 : 0) - (T.own === 'civ' ? 0.3 : 0) + (S.army < 45 ? 0.8 : 0));
      T.ctrl = clamp(T.ctrl + (50 - T.unrest) / 14 - 0.3);
      if (T.ctrl <= 12) {
        T.lost = true;
        const f = JP_SVC[SPH[k].own];
        S.support = clamp(S.support - 3); S.fac[f].a = clamp(S.fac[f].a - 9); S.fac.liberals.a = clamp(S.fac.liberals.a - 3); S.army = clamp(S.army - 3);
        rep.warn.push(`${SPH[k].full}: потеряно. Гарнизоны эвакуированы, местное правительство объявило о выходе из Сферы. ${SPH[k].own === 'army' ? 'Армия' : 'Флот'} винит кабинет.`);
      } else if (T.unrest >= 70) rep.warn.push(`${SPH[k].name}: восстание разрастается, контроль ${Math.round(T.ctrl)}%.`);
    }
  },
});

// ============================================================
// КУРС КАБИНЕТА: три рычага, которые делят армию и флот
// ============================================================
const JP_DIALS = {
  budget: { name: 'Бюджет вооружений', ask: 'Кому деньги: дивизиям или линкорам?', pos: [-2, -1, 0, 1, 2], label: { '-2': 'Всё армии', '-1': 'Больше армии', 0: 'Поровну', 1: 'Больше флоту', 2: 'Всё флоту' },
    desc: { '-2': 'Флот ставит корабли на консервацию. Генералы строят укрепления на линии раздела.', '-1': 'Армия получает новые дивизии, флот — обещания.', 0: 'Никто не доволен, никто не оскорблён.', 1: 'Флот закладывает авианосцы, армия донашивает танки сорокового года.', 2: 'Армия распускает дивизии. Адмиралы заказывают третий линейный флот.' } },
  dir: { name: 'Направление', ask: 'Где главный противник: на материке или в океане?', pos: ['north', 'bal', 'south'], label: { north: 'На север', bal: 'Равновесие', south: 'На юг' },
    desc: { north: 'Главный враг — Рейх за линией раздела. Доктрина армии с тридцать шестого года.', bal: 'Ни одна из доктрин не объявлена главной. Обе продолжают считать себя главными.', south: 'Главный враг — Америка в океане. Доктрина флота: нефть, проливы, авианосцы.' } },
  sph: { name: 'Сфера', ask: 'Империя или содружество?', pos: ['rule', 'mixed', 'common'], label: { rule: 'Военное управление', mixed: 'Опека', common: 'Содружество' },
    desc: { rule: 'Командующие правят напрямую. Вывоз больше, стрельбы больше.', mixed: '«Независимые» правительства и японские советники при каждом министре.', common: 'Правительства Сферы получают настоящую власть. Меньше вывоза, меньше стрельбы, оскорблённые штабы.' } },
};
Object.assign(Game, {
  jpDials() { const J = Game.jp(); if (!J.dials) J.dials = { budget: S.regime === 'rikugun70' ? -1 : S.regime === 'kaigun70' ? 1 : 0, dir: 'bal', sph: 'mixed', at: {} }; return J.dials; },
  // Что рычаги дают каждый квартал
  jpDialQ() {
    const D = Game.jpDials(), b = D.budget;
    const q = { army: -0.5 * b, navy: 0.5 * b, north: -0.9 * b, ocean: 0.9 * b, reich: 0, usa: 0, yield: 1, unrest: 0, court: 0, relUsa: 0 };
    if (D.dir === 'north') { q.reich += 0.5; q.usa -= 0.2; q.army += 0.3; q.navy -= 0.3; }
    if (D.dir === 'south') { q.usa += 0.5; q.reich -= 0.2; q.navy += 0.3; q.army -= 0.3; }
    if (D.sph === 'rule') { q.yield = 1.15; q.unrest += 0.6; q.army += 0.2; q.navy += 0.1; q.court -= 0.1; }
    if (D.sph === 'common') { q.yield = 0.8; q.unrest -= 0.8; q.army -= 0.4; q.navy -= 0.2; q.court += 0.2; q.relUsa = 0.3; }
    return q;
  },
  jpDialWhy(key, to) {
    const D = Game.jpDials(), P = JP_DIALS[key].pos;
    if (Math.abs(P.indexOf(D[key]) - P.indexOf(to)) !== 1) return 'только на соседнее положение';
    if (D.at[key] !== undefined && S.turn - D.at[key] < 2) return 'рычаг трогали в прошлом квартале';
    return '';
  },
  // Разовая реакция сил на сдвиг рычага
  jpDialFx(key, to) {
    const D = Game.jpDials(), P = JP_DIALS[key].pos, up = P.indexOf(to) > P.indexOf(D[key]);
    if (key === 'budget') return { fac: up ? { new: { a: 5 }, hawks: { a: -7 } } : { hawks: { a: 5 }, new: { a: -7 } } };
    if (key === 'dir') return { fac: up ? { new: { a: 4 }, hawks: { a: -5 } } : { hawks: { a: 4 }, new: { a: -5 } } };
    return up ? { fac: { hawks: { a: -6 }, new: { a: -3 }, liberals: { a: 3 } }, rel: { usa: 3 } } : { fac: { hawks: { a: 4 }, new: { a: 2 }, liberals: { a: -3 } }, rel: { usa: -3 } };
  },
  jpDialStep(key, to) {
    const D = Game.jpDials();
    if (!JP_DIALS[key] || Game.jpDialWhy(key, to) || !Game.spend()) return null;
    const from = D[key], fx = Game.jpDialFx(key, to);
    D[key] = to; D.at[key] = S.turn;
    const changes = Game.apply(fx);
    const text = `${JP_DIALS[key].name}: «${JP_DIALS[key].label[from]}» → «${JP_DIALS[key].label[to]}».`;
    Game.log(text);
    return { text, changes };
  },
});

// ============================================================
// ХОЛОДНАЯ ВОЙНА: третья из трёх
// ============================================================
Object.assign(Game, {
  jpcw() { const J = Game.jp(); if (!J.cw) J.cw = { reich: 52, usa: 62, ru: 50, north: 44, ocean: 50, crisisAt: -9 }; return J.cw; },
  jpcwActions() {
    const m = id => Game.dealInfo('jcw:' + id).mult, r = (v, id) => Math.max(1, Math.round(v * m(id))), eff = id => (Game.dealInfo('jcw:' + id).n ? ` Повторено недавно: отдача ${Math.round(m(id) * 100)}%.` : '');
    return [
      { id: 'army', name: 'Армейская программа', desc: 'Танки, артиллерия, укрепления на линии раздела. Сухопутный паритет растёт, Берлин это видит, флот считает чужие деньги.' + eff('army'), cost: '−12 млн', ok: S.treasury >= 12, fx: { treasury: -12, fac: { hawks: { a: 3 }, new: { a: -3 } }, jpCw: { north: r(8, 'army'), reich: 3 } } },
      { id: 'navy', name: 'Флотская программа', desc: 'Авианосцы, подводные лодки, базы на островах. Морской паритет растёт, Вашингтон это видит, армия считает чужие деньги.' + eff('navy'), cost: '−12 млн', ok: S.treasury >= 12, fx: { treasury: -12, fac: { new: { a: 3 }, hawks: { a: -3 } }, jpCw: { ocean: r(8, 'navy'), usa: 3 } } },
      { id: 'detr', name: 'Разрядка с Берлином', desc: 'Комиссия по линии раздела, обмен наблюдателями, прямой провод. Армия теряет главного врага и главный довод в спорах о бюджете.' + eff('detr'), cost: '−5 млн', ok: S.treasury >= 5, fx: { treasury: -5, rel: { reich: 5 }, fac: { hawks: { a: -4 } }, jpCw: { reich: -r(10, 'detr'), usa: 3 } } },
      { id: 'detu', name: 'Разрядка с Вашингтоном', desc: 'Рыболовная конвенция, списки интернированных, потолки для линейных флотов. Флот теряет главного врага и главный довод.' + eff('detu'), cost: '−5 млн', ok: S.treasury >= 5, fx: { treasury: -5, rel: { usa: 5 }, fac: { new: { a: -4 } }, jpCw: { usa: -r(10, 'detu'), reich: 3 } } },
      { id: 'play', name: 'Стравить Берлин и Вашингтон', desc: 'Утечки, перехваты, подставные инциденты в Атлантике. Пока двое сильных заняты друг другом, слабому легче дышать.' + eff('play'), cost: '', ok: true, odds: 0.5, fx: {}, win: { jpCw: { ru: r(12, 'play') } }, lose: { jpCw: { reich: 5, usa: 5 } } },
    ];
  },
  jpcwAction(id) {
    const a = Game.jpcwActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = { ...a.fx }, text = a.name + '. ';
    if (a.odds !== undefined) { const ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose); text += ok ? 'Они поверили. Берлин и Вашингтон отзывают послов друг у друга.' : 'Подлог раскрыт. Обе столицы требуют объяснений от Токио.'; }
    else text += { army: 'Заказы ушли на арсеналы Осаки и Мукдена.', navy: 'Заложены два авианосца в Курэ и Йокосуке.', detr: 'Комиссия согласовала ещё сорок километров линии.', detu: 'Конвенция подписана в Лиссабоне. Адмиралы назвали её «бумажным якорем».' }[id];
    const changes = Game.apply(fx);
    Game.noteDeal('jcw:' + id);
    Game.log(text);
    return { text, changes };
  },
  jpcwQuarter(rep) {
    const C = Game.jpcw(), q = Game.jpDialQ(), F = Game.fuhrerChanged() ? Game.fuhrerNew().pull : 0;
    C.ru = clamp(C.ru + rnd(-3, 3) + (50 - C.ru) * 0.04);
    const third = C.ru >= 65 ? -0.6 : C.ru <= 35 ? 0.7 : 0; // враждуют — ищут дружбы Токио; сговорились — теснят слабейшего вместе
    C.reich = clamp(C.reich + 0.6 + rnd(-1, 1.4) + third + q.reich + F + ((S.rel.reich || 40) < 30 ? 0.5 : (S.rel.reich || 40) > 60 ? -0.8 : 0) + (C.north < 35 ? 0.6 : 0));
    C.usa = clamp(C.usa + 0.6 + rnd(-1, 1.4) + third + q.usa + ((S.rel.usa || 40) < 30 ? 0.5 : (S.rel.usa || 40) > 60 ? -0.8 : 0) + (C.ocean < 35 ? 0.6 : 0));
    C.north = clamp(C.north - 1 + q.north); C.ocean = clamp(C.ocean - 1 + q.ocean);
    if (q.relUsa) S.rel.usa = clamp((S.rel.usa || 0) + q.relUsa);
    if (C.north < 35) { S.fac.hawks.a = clamp(S.fac.hawks.a - 1); rep.warn.push('Сухопутный паритет потерян: генералы требуют дивизий для линии раздела.'); }
    if (C.ocean < 35) { S.fac.new.a = clamp(S.fac.new.a - 1); rep.warn.push('Морской паритет потерян: адмиралы требуют авианосцев.'); }
    if (Math.max(C.reich, C.usa) >= 75) rep.warn.push(`Холодная война: соперничество с ${C.reich >= C.usa ? 'Берлином' : 'Вашингтоном'} на пределе. Жди инцидента ${C.reich >= C.usa ? 'на линии раздела' : 'в океане'}.`);
  },
  jpcwCrisis() {
    const C = Game.jpcw(), k = C.reich >= C.usa ? 'reich' : 'usa';
    if (C[k] < 85 || S.turn - C.crisisAt < 6) return null;
    C.crisisAt = S.turn;
    if (k === 'reich') return {
      title: 'Инцидент на линии раздела', bg: 'night', crisis: true,
      lines: [
        ['defense', 'Германская моторизованная дивизия перешла линию у Читы, {addr}. Берлин называет это «уточнением границы». Квантунская армия просит разрешения ответить.'],
        ['npc:navymin', 'Флот напоминает, что война на материке — это война, которую армия уже тридцать лет не может закончить в Китае.'],
        ['foreign', `Сухопутный паритет — ${Math.round(C.north)} из ста. ${C.north >= 50 ? 'У нас есть чем ответить.' : 'Отвечать почти нечем.'}`],
      ],
      choices: [
        { text: 'Дать бой', adv: ['defense'], chance: () => clamp(0.15 + C.north / 120, 0.15, 0.8),
          win: { fx: { support: 3, fac: { hawks: { a: 9 }, liberals: { a: 3 } }, jpCw: { reich: -14 } }, res: 'Бой шёл шесть дней. Немцы отошли за линию и объявили манёвры завершёнными. В Токио впервые за годы армию встречали цветами.' },
          lose: { fx: { support: -4, army: -5, fac: { hawks: { a: -10 }, liberals: { a: -6 } }, jpCw: { reich: -6, north: -8 }, sphSet: ['sib', { ctrl: -22, unrest: 8 }] }, res: 'Две дивизии окружены и разбиты за четыре дня. Линию раздела перенесли на сто километров к востоку. Генеральный штаб ищет виновных и находит их в кабинете.' } },
        { text: 'Согласиться на пограничную комиссию', fx: { fac: { hawks: { a: -9 }, new: { a: 3 } }, jpCw: { reich: -18 }, sphSet: ['sib', { ctrl: -8 }] }, res: 'Комиссия «уточнила» линию в пользу Берлина. Стрелять перестали. В офицерских собраниях ваше имя произносят без должности.' },
        { text: 'Просить посредничества Вашингтона', adv: ['foreign'], req: S => (S.rel.usa || 0) >= 40, reqText: 'США ≥ 40', fx: { rel: { usa: 4 }, fac: { hawks: { a: -5 }, new: { a: -3 } }, jpCw: { reich: -12, usa: -6, ru: 6 } }, res: 'Американский президент предложил «добрые услуги». Берлин отказался от услуг и отвёл дивизию: воевать под присмотром он не захотел.' },
      ],
      after: () => null,
    };
    return {
      title: 'Кризис у Гавайев', bg: 'night', crisis: true,
      lines: [
        ['npc:navymin', 'Американский флот объявил «зону учений» между Гавайями и Маршалловыми островами, {addr}. Наши танкеры с нефтью Борнео идут в обход на девять суток дольше. Флот просит разрешения выйти в море.'],
        ['defense', 'Армия напоминает, что флот тридцать лет получал половину бюджета именно на этот случай.'],
        ['foreign', `Морской паритет — ${Math.round(C.ocean)} из ста. ${C.ocean >= 50 ? 'Нас примут всерьёз.' : 'Нас могут не принять всерьёз.'}`],
      ],
      choices: [
        { text: 'Вывести Объединённый флот', chance: () => clamp(0.15 + C.ocean / 120, 0.15, 0.8),
          win: { fx: { support: 3, fac: { new: { a: 9 }, liberals: { a: 3 } }, jpCw: { usa: -14 } }, res: 'Два флота десять дней стояли в виду друг друга. Американцы объявили учения завершёнными. Танкеры пошли прежним путём.' },
          lose: { fx: { economy: -3, support: -4, fac: { new: { a: -10 }, liberals: { a: -6 } }, jpCw: { usa: -6, ocean: -8 }, sphSet: ['nan', { ctrl: -18, unrest: 8 }] }, res: 'Флот вышел в море и вернулся: топлива хватило на одиннадцать дней. Американцы «зону» не сняли. В Южных морях это увидели все.' } },
        { text: 'Отвести эскадры и вести танкеры в обход', fx: { economy: -1, fac: { new: { a: -9 }, hawks: { a: 3 } }, jpCw: { usa: -18 } }, res: 'Танкеры идут в обход. Нефть подорожала. Адмиралы молчат так, что слышно во дворце.' },
        { text: 'Просить посредничества Берлина', adv: ['foreign'], req: S => (S.rel.reich || 0) >= 40, reqText: 'Рейх ≥ 40', fx: { rel: { reich: 4 }, fac: { new: { a: -5 }, hawks: { a: -3 } }, jpCw: { usa: -12, reich: -6, ru: 6 } }, res: 'Берлин заявил, что «свобода морей касается всех держав». Вашингтон снял зону через неделю. Счёт за это заявление придёт позже.' },
      ],
      after: () => null,
    };
  },
});

// ============================================================
// ПАРТИЯ: Ассоциация помощи трону и её клики
// ============================================================
const CLIQ = {
  old: { name: 'Старые партийцы', icon: '🎩', desc: 'Депутаты довоенных партий. Хотят вернуть парламенту голос, а себе — министерские портфели. За ними двор и половина дзайбацу.', patron: 'liberals', rival: 'kodo' },
  plan: { name: 'Плановики', icon: '📐', desc: 'Чиновники Планового управления и штабные полковники. Хозяйство как казарма, пятилетки, «новый порядок». За ними армия.', patron: 'hawks', rival: 'sea' },
  sea: { name: 'Океанская лига', icon: '⚓', desc: 'Судовладельцы, верфи, отставные адмиралы. Хотят денег флоту и мира на материке. За ними флот.', patron: 'new', rival: 'plan' },
  kodo: { name: 'Общество императорского пути', icon: '🗡️', desc: 'Молодые офицеры, почвенники, студенческие союзы. Ненавидят дзайбацу, партии и «дурных советников у трона». Считают убийство министра формой петиции.', patron: null, rival: 'old' },
};
Object.assign(Game, {
  jpParty() {
    const J = Game.jp();
    if (!J.party) {
      const L = { kuge70: { old: 62, plan: 44, sea: 46, kodo: 30 }, rikugun70: { old: 36, plan: 64, sea: 30, kodo: 46 }, kaigun70: { old: 50, plan: 34, sea: 66, kodo: 30 } }[S.regime] || { old: 50, plan: 50, sea: 50, kodo: 30 };
      J.party = { cl: { old: { w: 30, l: L.old }, plan: { w: 30, l: L.plan }, sea: { w: 22, l: L.sea }, kodo: { w: 18, l: L.kodo } }, electAt: -99, civMin: false, incAt: -9 };
    }
    return J.party;
  },
  jpMajority() { const P = Game.jpParty(); return Math.round(Object.values(P.cl).reduce((a, c) => a + (c.l >= 50 ? c.w : 0), 0)); },
  // Вес клики меняется за счёт остальных, пропорционально их весу
  jpShiftW(k, d) {
    const P = Game.jpParty(), c = P.cl[k], nw = clamp(c.w + d, 4, 70), real = nw - c.w, rest = Object.keys(P.cl).filter(x => x !== k), sum = rest.reduce((a, x) => a + P.cl[x].w, 0);
    c.w = nw; for (const x of rest) P.cl[x].w = Math.max(4, P.cl[x].w - real * P.cl[x].w / sum);
    const tot = Object.values(P.cl).reduce((a, x) => a + x.w, 0); for (const x of Object.values(P.cl)) x.w = x.w / tot * 100;
  },
  jpPartyActions(k) {
    const P = Game.jpParty(), c = P.cl[k], D = CLIQ[k];
    const m = id => Game.dealInfo(`jpp:${id}:${k}`).mult, r = (v, id) => Math.max(1, Math.round(v * m(id)));
    return [
      { id: 'posts', name: 'Раздать посты', cost: '', ok: true, fx: { jpCl: [k, { l: r(10, 'posts'), w: 2 }], jpCl2: [D.rival, { l: -4 }] } },
      { id: 'money', name: 'Субсидии', cost: '−8 млн', ok: S.treasury >= 8, fx: { treasury: -8, jpCl: [k, { l: r(12, 'money') }] } },
      { id: 'tokko', name: 'Дело особой полиции', cost: '', ok: c.w > 8, danger: true, odds: 0.7, fx: { fear: 3 }, win: { jpCl: [k, { w: -6, l: -8 }] }, lose: { fac: { liberals: { a: -5 } }, support: -2, jpCl: [k, { l: -12 }] } },
    ];
  },
  jpPartyGlobal() {
    const P = Game.jpParty(), maj = Game.jpMajority(), court = S.fac.liberals.a, since = S.turn - P.electAt;
    return [
      { id: 'elect', name: 'Выборы по рекомендациям', desc: 'Ассоциация «рекомендует» кандидатов, полиция следит за остальными. Лояльные клики прибавят мест, нелояльные потеряют. Чаще раза в четыре года не проводят.', cost: since < 16 ? `через ${16 - since} кв.` : '−14 млн', ok: since >= 16 && S.treasury >= 14, fx: { treasury: -14, support: -2, fear: 2, jpElect: true } },
      { id: 'civmin', name: 'Закон о гражданских министрах', desc: 'Отменить правило, по которому военным и морским министром может быть только действующий офицер. Тогда армия и флот больше не смогут валить кабинеты отзывом министра. Они это понимают.', cost: P.civMin ? 'принят' : maj < 65 ? `большинство ${maj}% из 65` : court < 60 ? 'двор ≥ 60' : '', ok: !P.civMin && maj >= 65 && court >= 60, danger: true, odds: clamp(0.3 + (maj - 60) / 100 + (court - 60) / 100, 0.3, 0.8), fx: {}, win: { fac: { hawks: { a: -15 }, new: { a: -15 }, liberals: { a: 5 } }, jpCl: ['old', { l: 10 }], jpCiv: true }, lose: { fac: { hawks: { a: -10 }, new: { a: -10 }, liberals: { a: -8 } } } },
    ];
  },
  jpPartyAction(id, k) {
    const a = (k ? Game.jpPartyActions(k) : Game.jpPartyGlobal()).find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = { ...a.fx }, text = k ? `${CLIQ[k].name}: ` : '';
    let ok = true;
    if (a.odds !== undefined) { ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose); }
    text += { posts: 'их люди получили места в комиссиях и правлениях. Соперники клики это запомнят.', money: 'конверты розданы. Благодарность длится до следующей сессии.',
      tokko: ok ? 'особая полиция нашла «опасные мысли» у шести депутатов. Места освободились.' : 'дело развалилось в суде. Клика получила мучеников, а двор — повод для вопросов.',
      elect: 'Выборы проведены. Рекомендованные кандидаты победили почти везде. Явка — девяносто один процент, как и намечалось.',
      civmin: ok ? 'Закон принят. Военным министром теперь может стать штатский. Генералы и адмиралы впервые за годы выступили с совместным заявлением: против вас.' : 'Закон провален в палате пэров. Армия и флот узнали, что вы пытались сделать, и не простят попытки.' }[id];
    const changes = Game.apply(fx);
    if (k) Game.noteDeal(`jpp:${id}:${k}`);
    if (id === 'elect') Game.jpParty().electAt = S.turn;
    Game.log(text);
    return { text, changes };
  },
  jpPartyQuarter(rep) {
    const P = Game.jpParty(), K = P.cl;
    for (const [k, c] of Object.entries(K)) {
      const pf = CLIQ[k].patron && S.fac[CLIQ[k].patron];
      if (pf) c.l = clamp(c.l + (pf.a - c.l) * 0.08 + rnd(-1, 1));
      else c.l = clamp(c.l - 0.3 + (S.fac.hawks.a - 50) / 40 - (S.fac.oligarchs.a - 50) / 60 + (28 - c.l) * 0.04 + rnd(-1, 1)); // радикалы киснут сами
    }
    if (S.economy < 40 || S.support < 40) Game.jpShiftW('kodo', 0.7); // бедность кормит радикалов
    if (S.fac.hawks.a < 40) Game.jpShiftW('kodo', 0.4); // обиженная армия — тоже: молодые офицеры идут к ним
    const maj = Game.jpMajority();
    if (maj >= 50) { S.fac.liberals.a = clamp(S.fac.liberals.a + 0.4); S.fac.faith.a = clamp(S.fac.faith.a + 0.4); }
    else { S.fac.liberals.a = clamp(S.fac.liberals.a - 0.8); S.fac.faith.a = clamp(S.fac.faith.a - 0.8); S.treasury -= 2; rep.warn.push(`У кабинета нет большинства в парламенте (${maj}%): бюджет проходит чрезвычайными указами, двор недоволен беспорядком.`); }
    if (K.kodo.w >= 22 && K.kodo.l < 32) rep.warn.push('Общество императорского пути сильно и враждебно. Особая полиция докладывает о «группах прямого действия».');
    const q = Game.jpDialQ();
    // аппетиты штабов растут сами: то, чем они были довольны год назад, сегодня уже мало
    S.fac.hawks.a = clamp(S.fac.hawks.a + q.army - 0.6); S.fac.new.a = clamp(S.fac.new.a + q.navy - 0.6);
    // слабейшее хозяйство из трёх: война в Китае и две гонки вооружений сразу
    S.economy = clamp(S.economy - (Game.sphHeld('chi') && !Game.sph().chi.auto ? 0.3 : 0.1)); S.fac.liberals.a = clamp(S.fac.liberals.a + q.court);
    for (const s of Game.jpSeals()) if (s.lvl === 'bad' && !(P.civMin && s.f !== 'liberals')) rep.warn.push(`${s.name}: ${s.word}. Ниже ${JP_SEAL_MIN} — и кабинет падёт.`);
  },
  // «Правление через убийство»: радикалы приходят с мечами
  jpIncident() {
    const P = Game.jpParty(), K = P.cl.kodo;
    if (K.w < 22 || K.l >= 30 || S.turn - P.incAt < 8 || S.turn < 4) return null;
    P.incAt = S.turn;
    return {
      title: 'Группа прямого действия', bg: 'night', crisis: true,
      lines: [
        ['narrator', 'Пять утра. Девять человек в форме без погон прошли через сад резиденции. У троих мечи. Охрана у ворот их пропустила: они назвали пароль.'],
        ['npc:officer', 'Мы пришли не за вами, {addr}. Мы пришли за дурными советниками, которые встали между троном и народом. Отойдите от двери.'],
        ['police', 'Они ищут министра финансов. Он в соседней комнате.'],
      ],
      choices: [
        { text: 'Поднять охрану', adv: ['police'], chance: () => clamp(0.35 + S.fear / 250 + S.adv.police.loy / 400, 0.3, 0.8),
          win: { fx: { fear: 4, fac: { hawks: { a: -3 }, liberals: { a: 4 } }, jpCl: ['kodo', { w: -8, l: -5 }] }, res: 'Жандармы взяли всех девятерых в саду. Суд был закрытым. На суде они говорили шесть часов, и стенограмму читает вся армия.' },
          lose: { fx: { support: -3, fear: 5, fac: { oligarchs: { a: -8 }, liberals: { a: -5 } }, jpCl: ['kodo', { l: 6 }], jpKill: 'economy' }, res: 'Охрана опоздала на четыре минуты. Министра финансов нашли в его кабинете. Убийцы сами сдались в полицейский участок и попросили чаю.' } },
        { text: 'Выйти к ним и выслушать', fx: { fac: { oligarchs: { a: -8 }, liberals: { a: -5 }, hawks: { a: 3 } }, jpCl: ['kodo', { l: 16 }] }, res: 'Вы говорили с ними до рассвета. Они ушли, оставив петицию на шёлке, написанную кровью. В ней четыре требования. Два вы обещали исполнить.' },
      ],
      after: () => null,
    };
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isJap()) return;
  Game.eraLook();
  Game.sph(); Game.jpcw(); Game.jpParty(); Game.jpDials(); Game.fuhrerKey();
  S.fac.new = S.fac.new || { s: 44, a: 45, st: 'legal' };
  Object.assign(S.fac.new, { s: 44, a: S.regime === 'kaigun70' ? 70 : S.regime === 'rikugun70' ? 31 : 41 });
  S.fac.hawks.s = 48; S.fac.liberals.s = 40; S.fac.faith.s = 30; S.fac.oligarchs.s = 40; S.fac.left.s = 26;
  S.fac.hawks.a = Math.max(S.fac.hawks.a, 31);
  S.fear = Math.max(S.fear, 48); S.support = Math.max(S.support, 46); S.economy = 42;
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isJap()) return;
  const add = (d, label, icon) => { if (Math.round(d)) ch.push({ k: 'fs', d: Math.round(d), label, icon }); };
  if (fx.jpCw) { const C = Game.jpcw(); for (const [k, d] of Object.entries(fx.jpCw)) { const b = C[k]; C[k] = clamp(C[k] + d); add(k === 'north' || k === 'ocean' || k === 'ru' ? C[k] - b : -(C[k] - b), { reich: 'Разрядка с Берлином', usa: 'Разрядка с Вашингтоном', ru: 'Вражда Берлина и Вашингтона', north: 'Сухопутный паритет', ocean: 'Морской паритет' }[k], '☢️'); } }
  if (fx.sphSet) { const [k, d] = fx.sphSet, T = Game.sph()[k]; if (T) { if (d.ctrl) T.ctrl = clamp(T.ctrl + d.ctrl); if (d.unrest) T.unrest = clamp(T.unrest + d.unrest); if (d.auto !== undefined) T.auto = !!d.auto; if (d.own) T.own = d.own; if (d.left) { T.left = true; T.ctrl = 0; } add(d.ctrl || 0, `Контроль: ${SPH[k].name}`, '🗺️'); add(-(d.unrest || 0), `Спокойствие: ${SPH[k].name}`, '🕊️'); } }
  if (fx.sphAll) for (const k of Object.keys(SPH)) if (Game.sphHeld(k)) Game.sph()[k].ctrl = clamp(Game.sph()[k].ctrl + fx.sphAll);
  for (const key of ['jpCl', 'jpCl2']) if (fx[key]) { const [k, d] = fx[key], c = Game.jpParty().cl[k]; if (c) { if (d.l) { const b = c.l; c.l = clamp(c.l + d.l); add(c.l - b, `Лояльность: ${CLIQ[k].name}`, CLIQ[k].icon); } if (d.w) { const b = c.w; Game.jpShiftW(k, d.w); add(c.w - b, `Места: ${CLIQ[k].name}`, '🏛️'); } } }
  if (fx.jpElect) { const P = Game.jpParty(); for (const k of Object.keys(P.cl)) Game.jpShiftW(k, P.cl[k].l >= 50 ? 5 : -5); ch.push({ k: 'fs', d: Game.jpMajority(), label: 'Большинство после выборов, %', icon: '🏛️' }); }
  if (fx.jpCiv) Game.jpParty().civMin = true;
  if (fx.jpDial) Game.jpDials()[fx.jpDial[0]] = fx.jpDial[1];
  if (fx.jpFall) Game.jp().fallBy = fx.jpFall;
  if (fx.jpGave) { const J = Game.jp(); J.gave = J.gave || { army: 0, navy: 0 }; J.gave[fx.jpGave]++; }
  if (fx.jpKill) Game.jp().kill = fx.jpKill;
});
Game.previewHooks.push((fx, out) => {
  if (!isJap()) return;
  const first = [];
  if (fx.jpCw) for (const [k, d] of Object.entries(fx.jpCw)) first.push({ icon: '☢️', d: k === 'north' || k === 'ocean' || k === 'ru' ? d : -d, label: k, text: `${{ reich: 'соперничество с Берлином', usa: 'соперничество с Вашингтоном', ru: 'вражда Берлина и Вашингтона', north: 'сухопутный паритет', ocean: 'морской паритет' }[k]} ${sign(d)}` });
  if (fx.sphSet) { const [, d] = fx.sphSet; if (d.ctrl) first.push({ icon: '🗺️', d: d.ctrl, label: 'Контроль', text: `контроль ${sign(d.ctrl)}` }); if (d.unrest) first.push({ icon: '🔥', d: -d.unrest, label: 'Волнения', text: `волнения ${sign(d.unrest)}` }); if (d.auto) first.push({ icon: '📜', d: 1, label: 'Права правительства', text: 'права правительства' }); if (d.own) first.push({ icon: '🏷️', d: 0, label: 'Ведение', text: `в ведение ${JP_SVC_NAME[d.own]}` }); if (d.left) first.push({ icon: '🚪', d: -1, label: 'Уход', text: 'член Сферы потерян' }); }
  if (fx.sphAll) first.push({ icon: '🗺️', d: fx.sphAll, label: 'Контроль в Сфере', text: `контроль в Сфере ${sign(fx.sphAll)}` });
  for (const key of ['jpCl', 'jpCl2']) if (fx[key]) { const [k, d] = fx[key]; if (d.l) first.push({ icon: CLIQ[k].icon, d: d.l, label: CLIQ[k].name, text: `${CLIQ[k].name}: лояльность ${sign(d.l)}` }); if (d.w) first.push({ icon: '🏛️', d: 0, label: CLIQ[k].name, text: `${CLIQ[k].name}: места ${sign(d.w)}` }); }
  if (fx.jpElect) first.push({ icon: '🏛️', d: 1, label: 'Выборы', text: 'лояльные клики +5 мест, нелояльные −5' });
  if (fx.jpCiv) first.push({ icon: '📜', d: 1, label: 'Закон', text: 'армия и флот не могут отозвать министра' });
  if (fx.jpDial) first.push({ icon: '⚖️', d: 0, label: 'Бюджет', text: `бюджет вооружений: ${JP_DIALS.budget.label[fx.jpDial[1]].toLowerCase()}` });
  if (fx.jpKill) first.push({ icon: '🗡️', d: -1, label: 'Министр', text: 'министр убит' });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => {
  if (!isJap()) return;
  Game.jpPartyQuarter(rep); Game.sphQuarter(rep); Game.jpcwQuarter(rep);
  rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l));
});
Game.incomeHooks.push(() => (isJap() ? { label: 'Вывоз из Сферы', v: Game.sphIncome() } : null));
Game.incomeHooks.push(() => (isJap() && Game.sphCount() ? { label: 'Торговля внутри Сферы', v: Math.round(Game.sphCount() * 0.8 * 10) / 10 } : null));
Game.incomeHooks.push(() => (isJap() && Game.sphUpkeep() ? { label: 'Гарнизоны в Сфере', v: -Game.sphUpkeep() } : null));
// Кабинеты в Японии валят отзывом министра, а не танками. Путч — дело радикалов и обиженных штабов после закона о гражданских министрах.
Game.coupHooks.push(() => { if (!isJap()) return 0; const K = Game.jpParty().cl.kodo; return K.w >= 20 ? K.w / 100 * Math.max(0, 40 - K.l) / 100 * 0.6 : 0; });
const _coupRiskJ = Game.coupRisk;
Game.coupRisk = function () { return isJap() ? clamp(_coupRiskJ.call(Game) * (Game.jpParty().civMin ? 1.2 : 0.4), 0, 0.5) : _coupRiskJ.call(Game); };
Game.forcedList.push(() => (isJap() && !S.over ? Game.jpSealScene() : null));
Game.forcedList.push(() => { if (!isJap() || S.over) return null; const sc = Game.jpIncident(); if (sc) sc.after = () => { const k = Game.jp().kill; if (k) { Game.jp().kill = null; Game.fireAdvisor(k); } return null; }; return sc; });
Game.forcedList.push(() => (isJap() && !S.over ? Game.jpcwCrisis() : null));
const _blocJ = Game.bloc;
Game.bloc = function () { if (!isJap()) return _blocJ.call(Game); const C = Game.jpcw(); return C.ru >= 65 ? 'Третий радуется' : C.ru <= 35 ? 'Двое против одного' : 'Слабейшая из трёх'; };

// ---------- сцены ----------
const _introJ = Game.introScene;
Game.introScene = function () {
  if (!isJap()) return _introJ ? _introJ.call(Game) : null;
  const why = {
    kuge70: 'Армия и флот не согласились ни на одного генерала и ни на одного адмирала. Двор назвал вас: человека, у которого нет ни дивизий, ни кораблей.',
    rikugun70: 'Армия потребовала своего премьера и получила его. Флот согласился прислать морского министра «на испытательный срок».',
    kaigun70: 'Флот потребовал своего премьера и получил его. Армия согласилась прислать военного министра «до первого разногласия».',
  }[S.regime];
  return {
    title: 'Повеление трона', bg: 'palace',
    lines: [
      ['narrator', 'Токио, 9 января 1970 года. Кабинет Киси пал вчера: флот отозвал морского министра после спора о бюджете. Прежний кабинет продержался одиннадцать месяцев. Тот, что был до него, — семь.'],
      ['npc:keeper', 'Его величество повелевает вам составить кабинет. Старейшины совещались четыре часа. Ваше имя назвали третьим: первые двое отказались.'],
      ['narrator', why],
      ['defense', 'Армия войдёт в кабинет. Пока её интересы учитываются, я остаюсь военным министром, {addr}. Если нет — я подам в отставку, и преемника вам не назовут.'],
      ['npc:navymin', 'Флот войдёт в кабинет на тех же условиях. Мы следим за бюджетом. За армией мы следим тоже.'],
      ['economy', 'Хозяйство у нас вдвое меньше германского и вчетверо меньше американского. Сфера кормит империю и съедает её. Денег на армию и на флот сразу нет. Их нет уже тридцать лет.'],
      ['foreign', 'В Берлине и Вашингтоне нас считают третьими. Хуже всего будет в тот день, когда они об этом договорятся.'],
    ],
    choices: [{ text: 'Принять повеление', fx: {}, res: `Вы — премьер-министр. Кабинет стоит, пока в нём остаются люди двора, армии и флота. Продержитесь до ${Game.endYear()} года: так долго здесь не держался никто.` }],
    after: () => null,
  };
};
const _coupJ = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupJ.call(Game, role);
  if (!isJap()) return sc;
  sc.title = 'Инцидент';
  sc.lines = [
    ['narrator', 'Четыре утра, снег. Полторы тысячи солдат первой дивизии заняли квартал правительства. На зданиях парламента и военного министерства флаги с надписью «Почитай императора, истребляй изменников».'],
    ['npc:officer', 'Мы восстали, чтобы очистить окружение трона. Кабинет низложен. Сопротивление — измена.'],
  ];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Обратиться по радио'; c0.win.res = 'Вас услышали. Солдатам сказали, что их обманули офицеры. К вечеру роты одна за другой вернулись в казармы.'; c0.lose.res = 'Радиостанцию заняли раньше, чем вы до неё добрались.';
  c1.text = 'Просить повеления трона'; c1.win.res = 'Его величество назвал восставших мятежниками. Это слово решило всё: к утру офицеры сдали оружие.'; c1.lose.res = 'Двор молчал три дня. Этого хватило.';
  if (c2) { c2.text = 'Вызвать флот в Токийский залив'; if (c2.win) c2.win.res = 'Линкоры навели орудия на правительственный квартал. Армейские мятежники поняли, что флот ждал такого случая двадцать лет.'; if (c2.lose) c2.lose.res = 'Флот ответил, что это внутреннее дело армии.'; }
  if (c3) { c3.text = 'Уехать в Шанхай'; c3.res = 'Самолёт взлетел с аэродрома Ханэда до рассвета.'; }
  return sc;
};
const _revJ = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revJ.call(Game);
  if (!isJap()) return sc;
  sc.title = 'Рисовые бунты';
  sc.lines = [
    ['narrator', 'Началось в рыбацкой деревне в Тояме: жёны рыбаков не дали грузить рис на пароход. Через неделю горят рисовые склады в Осаке, Кобе и Нагое. Через две — толпа стоит перед резиденцией.'],
    ['npc:rebel', 'Рис. Мы просим только рис. Тридцать лет нам говорят про сопроцветание.'],
    ['defense', 'Войска ждут приказа, {addr}. В восемнадцатом году приказ отдали. Кабинет после этого прожил одиннадцать дней.'],
  ];
  if (sc.choices[2]) { sc.choices[2].text = 'Уехать в Шанхай'; sc.choices[2].res = 'Самолёт взлетел, когда толпа вошла в сад резиденции.'; }
  return sc;
};
const ULT_J = {
  hawks: ['Армии нужны деньги и ясность, господин премьер-министр. Пересмотрите бюджет и подтвердите, что главный противник — на материке. Иначе военный министр подаст в отставку.', 'Генеральный штаб перестал отвечать на запросы кабинета. Военный министр ходит на заседания и молчит.'],
  oligarchs: ['Снизьте налоги и уберите плановиков из правлений. Иначе банки перестанут покупать облигации казначейства.', 'Три банка из четырёх не выкупили очередной заём. Курс иены в Шанхае падает вторую неделю.'],
  left: ['Нормы риса, жильё и конец ночным арестам на заводах. Или завтра встанет Осака.', 'Осака встала. За ней Нагоя. Старосты обществ разводят руками: рабочие «нездоровы».'],
  liberals: ['Его величество желал бы видеть в кабинете людей, пользующихся доверием. Двор просит заменить двух министров и вернуть палате пэров право обсуждать бюджет.', 'Хранитель печати перестал принимать ваших секретарей. Старейшины собираются без вас.'],
  faith: ['Ассоциация требует вернуть ей право утверждать губернаторов. Иначе на следующей сессии кабинет недосчитается голосов.', 'На сессии кабинет недосчитался шестидесяти голосов. Бюджет отправлен «на доработку».'],
  new: ['Флоту нужны авианосцы, а не слова. Пересмотрите бюджет и подтвердите, что главный противник — в океане. Иначе морской министр подаст в отставку.', 'Морской штаб перестал отвечать на запросы кабинета. Корабли ушли «на учения» без уведомления.'],
};
const _facUltJ = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltJ.call(Game, f);
  if (!isJap()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_J[f] || ULT_J.faith;
  sc.lines = [['narrator', `${name} попросил о встрече вне расписания. В Токио это означает одно.`], [sp, ask], ['police', 'Если откажете, они ударят по самому больному, {addr}. Если уступите, остальные решат, что на кабинет можно давить.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} уходит с тем, за чем пришёл. Остальные внимательно смотрят, чем это кончится.`;
  c1.text = 'Откупиться с личного счёта'; c1.res = 'Конверт был толстым. Требование отложено — до следующего раза.';
  c2.win.res = 'Особая полиция взяла его той же ночью. Те, кто стоял за ним, затихли.'; c2.lose.res = 'Арест сделал из него знамя. Его имя пишут мелом на стенах казарм и цехов.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayJ = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayJ.call(Game, role);
  if (!isJap()) return sc;
  const A = S.adv[role];
  sc.title = 'Отставка без объяснений';
  sc.lines = [['narrator', `${A.name} подал в отставку и в тот же день был принят вашими противниками. Всё, что он знал о кабинете, теперь знают они.`], ['narrator', 'Его место займёт родственник. Больше доверять некому.']];
  sc.choices[0].text = 'Принять к сведению'; sc.choices[0].res = 'Замки сменены, шифры тоже. То, что он знал, уже не вернуть.';
  return sc;
};

// ---------- распоряжения ----------
const decJ = (cat, d) => DECREES[cat].push({ eras: [DARK_J], ok: () => true, ...d });
decJ('foreign', { id: 'j_conf', name: 'Конференция Великой Восточной Азии', desc: 'Главы правительств Сферы приезжают в Токио. Речи о братстве, фотография на ступенях парламента, список просьб в кулуарах.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, support: 2, sphAll: Math.round(3 * m), fac: { liberals: { a: Math.round(3 * m) } } }, text: 'Конференция прошла. Коммюнике говорит о сопроцветании. Делегаты говорили о рисе и о гарнизонах.' }) });
decJ('foreign', { id: 'j_axis', name: 'Визит в Берлин и Рим', desc: 'Подтвердить пакт, которому тридцать лет и в который никто не верит. Отношения улучшаются.', cost: '−8 млн', ok: S => S.treasury >= 8, repeat: true,
  run: (S, m) => ({ fx: { treasury: -8, rel: { reich: Math.round(6 * m), italy: Math.round(6 * m) }, jpCw: { reich: -3 } }, text: 'Визит состоялся. Тосты были длинные, протоколы короткие.' }) });
decJ('social', { id: 'j_rice', name: 'Твёрдые цены на рис', desc: 'Казна доплачивает за каждый мешок. В очередях перестают вспоминать восемнадцатый год.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, support: Math.round(6 * m), fac: { left: { a: Math.round(6 * m) } } }, text: 'Цены заморожены. Рис стал хуже, но его хватает.' }) });
decJ('social', { id: 'j_amnesty', name: 'Пересмотр дел о «мыслепреступлениях»', desc: 'Выпустить профессоров, депутатов и священников, осуждённых за опасные мысли. Двор и старые партийцы оценят. Радикалы — нет.', cost: '', once: true,
  run: () => ({ fx: { fear: -7, support: 4, fac: { liberals: { a: 7 }, left: { a: 5 }, hawks: { a: -4 } }, rel: { usa: 5 }, jpCl: ['old', { l: 8 }], jpCl2: ['kodo', { l: -8 }] }, text: 'Из тюрьмы Сугамо вышли четыреста человек. Некоторых не узнали собственные дети.' }) });
decJ('social', { id: 'j_curfew', name: 'Особое положение в столице', desc: 'Патрули военной полиции, пропуска, ночные проверки. Тихо и страшно.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { fear: Math.round(9 * m), support: -4, fac: { liberals: { a: -5 }, hawks: { a: 4 } } }, text: 'После десяти вечера на улицах только патрули с белыми повязками.' }) });
decJ('economy', { id: 'j_ships', name: 'Заказы верфям', desc: 'Танкеры и эсминцы. Верфи загружены, флот и дзайбацу довольны, армия считает деньги.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, economy: Math.round(1 * m), fac: { oligarchs: { a: Math.round(6 * m) }, new: { a: Math.round(5 * m) }, hawks: { a: -3 } }, jpCw: { ocean: Math.round(3 * m) } }, text: 'Заказы размещены. Курэ и Нагасаки работают в три смены.' }) });
decJ('economy', { id: 'j_arsenal', name: 'Заказы арсеналам', desc: 'Танки и орудия для материка. Арсеналы загружены, армия и дзайбацу довольны, флот считает деньги.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, economy: Math.round(1 * m), fac: { oligarchs: { a: Math.round(6 * m) }, hawks: { a: Math.round(5 * m) }, new: { a: -3 } }, jpCw: { north: Math.round(3 * m) } }, text: 'Заказы размещены. Осака и Мукден работают в три смены.' }) });
decJ('economy', { id: 'j_oil', name: 'Новые промыслы на Борнео', desc: 'Бурить глубже и дальше в джунгли. Нефть — то, без чего не ходит ни флот, ни хозяйство.', cost: '−18 млн', ok: S => S.treasury >= 18 && Game.sphHeld('nan'), once: true,
  run: () => ({ fx: { treasury: -18, economy: 5, fac: { oligarchs: { a: 7 }, new: { a: 4 } }, sphSet: ['nan', { unrest: 4 }] }, text: 'Вышки поставили за год. Трубопровод идёт к морю через земли, с которых выселили двадцать деревень.' }) });
decJ('economy', { id: 'j_levy', name: 'Чрезвычайные поставки из Сферы', desc: 'Больше риса и руды сейчас. Там станет хуже, чем было.', cost: '', ok: () => Game.sphCount() > 0, repeat: true,
  run: (S, m) => ({ fx: { treasury: Math.round(12 * m), sphAll: -3, rel: { usa: -3 }, sphSet: [Game.sphHot(), { unrest: 8 }] }, text: 'Поставки собраны. Командующие докладывают о выполнении и просят подкреплений.' }) });
DEMANDS.push(
  { id: 'j_line', countries: ['reich'], eras: [DARK_J], text: () => 'Отвести заставы от линии раздела на пятьдесят километров', fx: () => ({ rel: { reich: 12 }, fac: { hawks: { a: -7 } }, jpCw: { reich: -8, north: -3 } }) },
  { id: 'j_port', countries: ['usa'], eras: [DARK_J], text: () => 'Открыть Шанхай для американской торговли', fx: () => ({ economy: 1, rel: { usa: 14 }, fac: { new: { a: -5 }, oligarchs: { a: 3 } }, jpCw: { usa: -6 } }) },
  { id: 'j_oilit', countries: ['italy'], eras: [DARK_J], text: () => 'Каучук для Италии по твёрдой цене', fx: () => ({ treasury: -6, rel: { italy: 14 } }) },
);
FAC_DEMANDS.hawks.push({ id: 'jp_kwan', kind: 'pay', text: 'Не сокращать Квантунскую армию', fx: { treasury: -8, fac: { new: { a: -5 } } }, only: [JAP] });
FAC_DEMANDS.oligarchs.push({ id: 'jp_ord', kind: 'act', acts: ['dec:j_ships'], text: 'Разместить заказы на верфях', only: [JAP] });
FAC_DEMANDS.liberals.push({ id: 'jp_privy', kind: 'pay', text: 'Назначить людей двора в Тайный совет', fx: { fac: { faith: { a: -5 } }, jpCl: ['kodo', { l: -6 }] }, only: [JAP] });
FAC_DEMANDS.left.push({ id: 'jp_rice', kind: 'pay', text: 'Повысить нормы риса на заводах', fx: { treasury: -8, fac: { oligarchs: { a: -5 } } }, only: [JAP] });
FAC_DEMANDS.faith.push({ id: 'jp_gov', kind: 'pay', text: 'Назначить губернаторами людей Ассоциации', fx: { fac: { liberals: { a: -5 } }, jpCl: ['plan', { l: 4 }] }, only: [JAP] });

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isJap()) return;
  const J = Game.jp(), P = Game.jpParty(), D = Game.jpDials(), C = Game.jpcw(), held = Game.sphCount(), maj = Game.jpMajority(), yrs = (S.turn / 4).toFixed(1).replace('.0', '').replace('.', ',');
  const T = {
    resigned: ['Отставка кабинета', ({ army: 'Армия отозвала министра, и кабинета не стало. ', navy: 'Флот отозвал министра, и кабинета не стало. ', court: 'Двор выразил обеспокоенность, и кабинета не стало. ' }[J.fallBy] || '')
      + `Вы продержались ${yrs} г. — дольше большинства предшественников. Вам оставили титул, дом в Камакуре и место в совете старейшин. Через год вас позовут советовать, кому поручить следующий кабинет. Он продержится меньше вашего.`],
    exile: ['Бегство', 'Вы живёте в Шанхае, во французском квартале, под чужой фамилией. Из Токио вас не ищут: искать — значит признать, что вы были.'],
    helicopter: ['Бегство', 'Вы живёте в Шанхае под чужой фамилией. Из Токио вас не ищут.'],
    coup: ['Инцидент', 'Мятежные роты заняли квартал правительства на четыре дня. Вас нашли в резиденции на второй. Мятеж потом подавили, зачинщиков расстреляли, а следующий кабинет исполнил половину их требований. Так здесь устроено: убийц казнят, а программу принимают.'],
    revolution: ['Рисовые бунты', 'Бунты охватили тридцать шесть префектур. Войска стреляли в Осаке и отказались стрелять в Токио. Кабинет подал в отставку «в знак ответственности перед троном». Рис появился в лавках через неделю после вашего ухода. Выходит, он был.'],
    retired: ['Ушёл', 'Вы подали прошение об отставке и уехали в Камакуру. Двор поблагодарил за службу. Это всё, что можно сказать.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    const who = P.civMin && maj >= 50 ? ['Ответственный кабинет', 'Военным министром у вас служит штатский, бюджет обсуждает парламент, а генералы узнают о решениях из газет. Вы вернули стране то, что у неё отняли в тридцать втором году. Штабы этого не простили; им просто нечем ответить.']
      : S.flags.jpShogun ? ['Новый сёгунат', 'Вы правите от имени трона и без его доверия, опираясь на штабы. Двор молчит. Так здесь уже правили семьсот лет подряд, и кончилось это плохо для всех, кроме историков.']
      : D.budget <= -1 && S.fac.hawks.a >= 55 ? ['Кабинет армии', 'Армия получила бюджет, материк и премьера. Флот стоит в гаванях и считает обиды. Империя смотрит на север, спиной к океану.']
      : D.budget >= 1 && S.fac.new.a >= 55 ? ['Кабинет флота', 'Флот получил бюджет, океан и премьера. Армия сидит в Маньчжурии и считает обиды. Империя смотрит на юг, спиной к материку.']
      : ['Десять лет равновесия', 'Вы никому не дали победить: ни армии, ни флоту, ни двору, ни кликам. Каждый год кабинет мог пасть, и каждый год падал чей-то чужой расчёт. Преемнику вы оставляете весы, а не решение.'];
    E.title = who[0];
    E.text = `31 декабря ${Game.endYear() - 1} года. Ни один кабинет империи не жил так долго. ${who[1]} `
      + (C.ru >= 65 ? 'Берлин и Вашингтон заняты друг другом, и о Токио вспоминают, когда нужен союзник.' : C.ru <= 35 ? 'Берлин и Вашингтон договорились между собой. Третьему в таких договорах достаётся счёт.' : 'Между Берлином и Вашингтоном империя осталась третьей. Но осталась.')
      + (held === 5 ? ' Сфера цела.' : held === 0 ? ' Сферы больше нет.' : ` В Сфере осталось ${held} из пяти членов.`);
  }
  verdicts.length = 0;
  verdicts.push(type === 'resigned' ? `Кабинет прожил ${yrs} г.` : `У руля: ${yrs} г.`);
  if (J.fallBy) verdicts.push({ army: 'Свален армией', navy: 'Свален флотом', court: 'Утратил доверие трона' }[J.fallBy]);
  if (P.civMin) verdicts.push('Провёл закон о гражданских министрах'); if (S.flags.jpShogun) verdicts.push('Правил без доверия трона');
  verdicts.push(D.budget < 0 ? 'Бюджет — армии' : D.budget > 0 ? 'Бюджет — флоту' : 'Бюджет поровну');
  verdicts.push(held === 5 ? 'Сохранил Сферу' : held === 0 ? 'Потерял Сферу' : `Членов Сферы: ${held} из 5`);
});

// ---------- газета ----------
const _pressPageJ = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isJap()) return _pressPageJ.call(UI, news);
  const ch = [];
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Сообщение: ' + h.head); }
  const date = `${[31, 30, 30, 31][S.q - 1]} ${MONTHS_Q[S.q - 1]} ${S.year} года`;
  const off = [];
  off.push(['Из дворца', 'Его величество принял премьер-министра с докладом о положении дел. Подробности не сообщаются.']);
  off.push(['Хозяйство', S.economy >= 55 ? 'План квартала выполнен по стали, судам и текстилю.' : S.economy >= 40 ? 'План квартала выполнен в основном.' : 'Отдельные трудности со снабжением преодолеваются.']);
  off.push(['Сфера сопроцветания', Game.sphCount() === 5 ? 'Народы Великой Восточной Азии трудятся в согласии.' : 'Перегруппировка сил в отдельных районах Сферы проходит по плану.']);
  if (S.fear >= 60) off.push(['Особая высшая полиция', 'Пресечена деятельность групп, распространявших опасные мысли. Фамилии не сообщаются.']);
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="dk-np jp-np">
      <div class="dk-np-mast"><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.japan}</svg><span>Токийский вестник</span><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.japan}</svg></div>
      <div class="dk-np-date">Токио · ${date} · ${S.year - 1925}-й год эры Сёва · проверено Информационным бюро</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="dk-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит кабинет?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
const jpNum = v => { const r = Math.round(v * 100) / 100; return (r > 0 ? '+' : r < 0 ? '−' : '') + String(Math.abs(r)).replace('.', ','); };
// Три печати — общий блок для вкладок
function jpSealsHtml() {
  const P = Game.jpParty();
  return `<div class="jp-seals">${Game.jpSeals().map(s => `<div class="jp-seal ${s.lvl}"><span class="jp-seal-ic" aria-hidden="true">${s.icon}</span><div><b>${s.name}</b><span>${esc(s.word)}</span></div>${UI.meter('', s.a, s.lvl)}</div>`).join('')}
    <div class="jp-seal ${S.support < 30 ? 'bad' : S.support < 45 ? 'warn' : 'good'}"><span class="jp-seal-ic" aria-hidden="true">👥</span><div><b>Народ</b><span>${S.support < 30 ? 'близок к бунту' : S.support < 45 ? 'ворчит' : 'терпит'}</span></div>${UI.meter('', S.support, S.support < 30 ? 'bad' : S.support < 45 ? 'warn' : 'good')}</div></div>
    <p class="muted small">Одобрение ниже ${JP_SEAL_MIN} у двора, армии или флота — и они отзывают своего человека из кабинета.${P.civMin ? ' Закон о гражданских министрах принят: армия и флот этого права лишились, зато риск мятежа вырос.' : ''} Народ кабинетов не назначает, но ниже 30 начинаются рисовые бунты.</p>`;
}
function jpDialHtml(key) {
  const D = Game.jpDials(), M = JP_DIALS[key], cur = D[key], ci = M.pos.indexOf(cur);
  return `<section class="card jp-dial"><header><h3>${esc(M.name)}</h3><span class="muted small">${esc(M.ask)}</span></header>
    <div class="jp-dial-row">${M.pos.map((p, i) => { const adj = Math.abs(i - ci) === 1, why = adj ? Game.jpDialWhy(key, p) : ''; return `<button class="jp-pos ${p === cur ? 'on' : ''}" data-act="jpd:${key}:${p}" ${p === cur || !adj || why || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''} title="${esc(why || '')}">${esc(M.label[p])}</button>`; }).join('')}</div>
    <p class="muted small">${esc(M.desc[cur])} Сдвиг на соседнее положение — один приказ; проигравшая сторона обидится сразу, выигравшая будет благодарна недолго.</p></section>`;
}
Object.assign(UI, {
  tab_party70() {
    const P = Game.jpParty(), maj = Game.jpMajority(), glob = Game.jpPartyGlobal(), F = REGIONS[JAP].factions, q = Game.jpDialQ();
    const pat = k => (CLIQ[k].patron ? (F[CLIQ[k].patron] || NEW_FACTIONS[DARK_J]).short : 'никто');
    const card = k => { const c = P.cl[k], D = CLIQ[k], acts = Game.jpPartyActions(k);
      return `<article class="card jp-cl ${c.l >= 50 ? 'ok' : ''}"><header><div><h3>${D.icon} ${esc(D.name)}</h3><span class="muted small">Покровитель: ${esc(pat(k))} · соперник: ${esc(CLIQ[D.rival].name)}</span></div><span class="chip ${c.l >= 50 ? 'coopted' : 'banned'}">${c.l >= 50 ? 'за кабинет' : 'против'}</span></header>
        <p class="muted small">${esc(D.desc)}</p>
        ${UI.meter('Места в парламенте, %', c.w, 'str')}${UI.meter('Лояльность кабинету', c.l, c.l >= 50 ? 'good' : c.l >= 35 ? 'warn' : 'bad')}
        <div class="acts">${acts.map(a => `<button class="btn small ${a.danger ? 'danger-o' : ''}" data-act="jpp:${a.id}:${k}" ${!a.ok || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>${esc(a.name)}${a.cost ? `<small>${esc(a.cost)}</small>` : ''}</button>`).join('')}</div>
        <div class="dec-fx">${acts.map(a => `<div class="dec-row"><span class="dec-tag">${esc(a.name)}${a.odds !== undefined ? ` · ${Math.round(a.odds * 100)}%` : ''}</span>${UI.fxChips(Game.previewFx(a.odds !== undefined ? Game.mergeFxD({ ...a.fx }, a.win) : a.fx))}</div>`).join('')}</div></article>`; };
    return `<p class="lede">Премьер в Японии не вождь. Трон поручил вам кабинет, и кабинет стоит, пока в нём остаются люди двора, армии и флота. Каждая из трёх сил может его свалить, отозвав своего человека. Армия и флот к тому же враждуют между собой: что дано одному, отнято у другого. Вся игра — в том, чтобы никто из троих не дошёл до края.</p>
      <section class="card"><div class="eyebrow">Три печати и народ</div>${jpSealsHtml()}
        <p class="muted small">Аппетиты штабов растут сами: одобрение армии и флота убывает на 0,6 в квартал. С учётом рычагов курса сейчас выходит ${jpNum(q.army - 0.6)} у армии и ${jpNum(q.navy - 0.6)} у флота.</p></section>
      <div class="cr mt">
        <section class="card" style="flex:1.4"><div class="eyebrow">Ассоциация помощи трону · парламент</div>
          <div class="jp-diet" role="img" aria-label="Места клик в парламенте">${Object.keys(CLIQ).map(k => `<span class="${P.cl[k].l >= 50 ? 'ok' : 'no'} jp-c-${k}" style="flex:${P.cl[k].w}" title="${esc(CLIQ[k].name)}: ${Math.round(P.cl[k].w)}%">${Math.round(P.cl[k].w)}</span>`).join('')}</div>
          <p><b>Большинство кабинета: ${maj}%</b> ${maj >= 50 ? '— бюджет проходит, двор спокоен.' : '— большинства нет: бюджет идёт чрезвычайными указами (−2 млн в квартал), двор и Ассоциация недовольны.'}</p>
          <p class="muted small">Единственная партия империи состоит из четырёх клик. За кабинет голосуют те, чья лояльность не ниже 50. Лояльность клики сама тянется к настроению её покровителя: довольна армия — довольны плановики. У радикалов покровителя нет: они киснут сами и растут, когда хозяйство или поддержка народа падают ниже 40.</p></section>
        <section class="card cr-side"><div class="proj">${glob.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
          <div class="dec-fx">${Object.keys(a.fx).length ? `<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>` : ''}${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${UI.fxChips(Game.previewFx(a.win))}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}</div></div>
          ${UI.actBtn('jpp:' + a.id, { ok: a.ok, danger: a.danger, name: 'Приказать', cost: a.cost })}</div>`).join('')}</div></section>
      </div>
      <div class="grid mt jp-cliques">${Object.keys(CLIQ).map(card).join('')}</div>`;
  },
  tab_sphere70() {
    const held = Game.sphCount();
    return `<p class="lede">«Великая восточноазиатская сфера сопроцветания»: пять стран, у каждой свой флаг, своё правительство и японский командующий. Сфера кормит империю и съедает её гарнизонами. Каждый её член — вотчина армии или флота: пока там правит штаб, в казну доходит только шесть десятых вывоза. Передать вотчину гражданскому министерству значит получить всё и нажить врага.</p>
      <section class="card"><div class="eyebrow">Баланс Сферы за квартал</div><div class="sp-facts"><span class="chip coopted">вывоз +${String(Game.sphIncome()).replace('.', ',')} млн</span><span class="chip banned">гарнизоны −${Game.sphUpkeep()} млн</span><span class="chip">в Сфере ${held} из 5</span></div></section>
      <div class="mt">${jpDialHtml('sph')}</div>
      <div class="grid mt">${Object.keys(SPH).map(k => {
        const D = SPH[k], T = Game.sph()[k], gone = !Game.sphHeld(k);
        return `<article class="card country ${gone ? 'dk-gone' : ''}"><header><div><h3>${esc(D.full)}</h3><span class="muted small">${esc(D.what)}</span></div><span class="chip ${gone ? 'banned' : T.own === 'civ' ? 'coopted' : ''}">${T.left ? 'войска выведены' : T.lost ? 'потеряно' : T.own === 'civ' ? 'гражданское управление' : T.own === 'army' ? 'вотчина армии' : 'вотчина флота'}</span></header>
          ${gone ? '<p class="muted small">Японских войск и советников здесь больше нет.</p>' : `${UI.meter('Контроль', T.ctrl, T.ctrl >= 60 ? 'good' : T.ctrl >= 35 ? 'warn' : 'bad')}${UI.meter('Волнения', T.unrest, T.unrest >= 60 ? 'bad' : T.unrest >= 40 ? 'warn' : 'good')}
          <p class="muted small">В казну: +${Game.sphYield(k).toFixed(1).replace('.', ',')} млн из ${D.y} возможных${T.own === 'civ' ? '' : ' (четыре десятых оставляет себе штаб)'}. Гарнизон: −${1 + (T.unrest >= 60 ? 1 : 0)} млн.${T.auto ? ' Правительству возвращены суд, полиция и таможня.' : ''}</p>
          <div class="acts">${Game.sphActions(k).map(a => UI.actBtn(`jps:${k}:${a.id}`, a)).join('')}</div>`}</article>`; }).join('')}</div>`;
  },
  tab_jpcw() {
    const C = Game.jpcw(), acts = Game.jpcwActions(), q = Game.jpDialQ();
    const tri = C.ru >= 65 ? 'Берлин и Вашингтон на ножах: обоим нужна благосклонность Токио, нажим на вас слабеет.' : C.ru <= 35 ? 'Берлин и Вашингтон договорились между собой и теснят слабейшего вместе.' : 'Берлин и Вашингтон следят друг за другом не меньше, чем за вами.';
    return `<p class="lede">Три державы поделили мир, и Япония из них слабейшая: хозяйство вдвое меньше германского и вчетверо меньше американского. Врагов двое, и на каждого нужен свой род войск: против Рейха на материке — армия, против Америки в океане — флот. Денег хватает на что-то одно. Оба паритета тают на единицу в квартал; соперничество растёт само, и на 85 случается инцидент.</p>
      <p class="muted small">В Берлине: ${esc(Game.leaderAt('reich'))}. В Вашингтоне: ${esc(Game.leaderAt('usa'))}.</p>
      <div class="cr">
        <section class="card" style="flex:1.2"><div class="eyebrow">Соперничество · ${esc(Game.bloc())}</div>
          ${UI.meter('Япония — Рейх', C.reich, C.reich >= 75 ? 'bad' : C.reich >= 55 ? 'warn' : 'good')}
          ${UI.meter('Япония — США', C.usa, C.usa >= 75 ? 'bad' : C.usa >= 55 ? 'warn' : 'good')}
          ${UI.meter('Рейх — США', C.ru, 'str')}
          <p class="muted small">${tri}</p></section>
        <section class="card cr-side">
          ${UI.meter('Сухопутный паритет (армия против Рейха)', C.north, C.north >= 50 ? 'good' : C.north >= 35 ? 'warn' : 'bad')}
          ${UI.meter('Морской паритет (флот против США)', C.ocean, C.ocean >= 50 ? 'good' : C.ocean >= 35 ? 'warn' : 'bad')}
          <p class="muted small">Бюджет и направление сейчас меняют сухопутный паритет на ${jpNum(q.north - 1)} и морской на ${jpNum(q.ocean - 1)} в квартал. Ниже 35 — обиженный род войск и осмелевший противник. В инциденте от паритета зависит исход боя.</p></section>
      </div>
      <div class="grid mt jp-dials">${jpDialHtml('budget')}${jpDialHtml('dir')}</div>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
        <div class="dec-fx">${Object.keys(a.fx).length ? `<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>` : ''}${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${UI.fxChips(Game.previewFx(a.win))}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}</div></div>
        ${UI.actBtn('jpc:' + a.id, { ok: a.ok, name: 'Приказать', cost: a.cost })}</div>`).join('')}</div>`;
  },
});
const _tabCabJ = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabJ.call(UI);
  if (!isJap()) return h;
  const bad = Game.jpSeals().filter(s => s.lvl === 'bad').map(s => s.name.toLowerCase());
  return h.replace(/У власти ([\d.,]+) г\./, `Кабинет держится $1 г. ${bad.length ? `На грани разрыва: ${bad.join(', ')}.` : 'Двор, армия и флот остаются в кабинете.'} Большинство в парламенте: ${Game.jpMajority()}%.`);
};
UI.actionHandlers.push(id => {
  if (!/^jp[dpsc]:/.test(id)) return false;
  const p = id.split(':');
  const out = p[0] === 'jpd' ? Game.jpDialStep(p[1], JP_DIALS[p[1]].pos.find(x => String(x) === p[2])) : p[0] === 'jpp' ? Game.jpPartyAction(p[1], p[2]) : p[0] === 'jps' ? Game.sphAction(p[1], p[2]) : Game.jpcwAction(p[1]);
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
