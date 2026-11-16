// «Диктато 1.2: Тучи над миром», лист 2: Италия. 1970–1979.
// Дуче Чиано убит бомбой; игрок — новый вождь. Три раздела: «Империя» (владения), «Холодная война» (борьба Рейха и США за Италию,
// латинский блок с Мадридом) и «Итальянский путь» — двенадцать линий внутренней политики, из которых складывается курс страны.
// Все действующие лица, кроме глав чужих держав, вымышлены.
const ITAL = 'italy70';

// ---------- державы ----------
COUNTRIES.reich = { name: 'Германский рейх', bloc: 'axis', flag: 'reich', leaders: [[1975.25, 'фюрер Адольф Гитлер'], [9999, 'преемник Гитлера']] };
// Гитлеру в 1970-м восемьдесят один год. Весной 1975-го он умирает, и сенат партии называет преемника: в каждой партии — случайного
// из его окружения. В списке только те, кому к 1975 году меньше семидесяти пяти: Геринг, Гесс, Геббельс, Дёниц, Борман и Гиммлер уже слишком стары.
// pull — как преемник тянет Италию к Берлину каждый квартал, fx — что меняется в день его прихода.
const FUHRER_AT = 1975.25;
const FUHRERS = {
  speer: { name: 'Альберт Шпеер', short: 'Шпеер', who: 'рейхсминистр вооружений, семьдесят лет', note: 'Архитектор и хозяйственник. В Берлине ждут счетоводов вместо ораторов; союзникам обещают «деловые отношения».', pull: -0.2, fx: { economy: 1, itCw: { reich: -3 } } },
  heydrich: { name: 'Рейнхард Гейдрих', short: 'Гейдрих', who: 'глава имперской безопасности, семьдесят один год', note: 'Власть взяла СС. Союзникам советуют не опаздывать с ответами на берлинские ноты.', pull: 0.3, fx: { itCw: { reich: 4 }, fac: { liberals: { a: -3 }, faith: { a: -3 } } } },
  axmann: { name: 'Артур Аксман', short: 'Аксман', who: 'имперский руководитель молодёжи, шестьдесят два года', note: 'Самый молодой из старой гвардии: войну он встретил двадцатишестилетним. Старики в сенате считают его временным. Берлин надолго занят собой.', pull: -0.1, fx: { itCw: { reich: -5 } } },
  naumann: { name: 'Вернер Науман', short: 'Науман', who: 'министр пропаганды, шестьдесят пять лет', note: 'Человек радио и газет, ученик Геббельса. Тон Берлина станет громче, содержание останется прежним.', pull: 0.1, fx: { itCw: { reich: 2 }, fac: { new: { a: 3 } } } },
  schirach: { name: 'Бальдур фон Ширах', short: 'фон Ширах', who: 'имперский наместник в Вене, шестьдесят восемь лет', note: 'Тридцать пять лет просидел в Вене и считает себя знатоком Юга. В Риме его знают лично и не боятся.', pull: -0.1, fx: { rel: { reich: 5 }, itCw: { reich: -1 } } },
};
COUNTRY_CASES.reich = ['Рейха', 'Рейхом', 'в Берлин'];
const BLOCI = { reich: 'pact', spain: 'pact', japan: 'sphere', usa: 'west' };

// ---------- одежда: чёрная форма партии, серо-зелёный мундир армии, колониальный китель, костюм со значком-фасцией ----------
const IT_ORB = (extra = {}) => ({ outfit: 'orbace', outfitColor: '#25252a', hat: 'none', hatColor: '#141416', hatMetal: '#c9a640', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', ...extra });
const IT_ARMY = (extra = {}) => ({ outfit: 'grigio', outfitColor: '#6b735f', hat: 'berretto', hatColor: '#6b735f', hatBand: '#4a5244', hatMetal: '#c9a640', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 3, sash: '', ...extra });
const IT_SUIT = (color = '#26282d', extra = {}) => ({ outfit: 'suit', outfitColor: color, hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: '#2a2a2a', medals: 0, pin: 'fascio', sash: '', ...extra });
const IT_COL = (extra = {}) => ({ outfit: 'sahariana', outfitColor: '#b9a77c', hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', ...extra });
const LI = o => ({ skin: SKIN.tan, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', ...o });

// ---------- происхождение нового дуче ----------
Object.assign(REGIME_TYPES, {
  nipote70: {
    name: 'Родственник', icon: '👪',
    desc: 'Вы — племянник покойного дуче, двенадцать лет вели его личную канцелярию. Фамилию знает вся страна, вас не знает никто. Двор и Ватикан видят в вас продолжение дяди; партия — наследника без заслуг. Шаги к реформе вам даются дешевле.',
    fx: { support: 6 }, fac: { liberals: { a: 18 }, faith: { a: 12 }, new: { a: -10 }, hawks: { a: -6 } }, rel: { usa: 5 },
  },
  eroe70: {
    name: 'Военный герой', icon: '🎖️',
    desc: 'Вы — маршал Италии. В сорок втором полковником вошли в Александрию, потом двадцать лет держали Африку. Армия пойдёт за вами, народ помнит ваше лицо по хронике. Партия боится человека, у которого есть собственные дивизии. Перемены при вас вызывают меньше напряжения.',
    fx: { army: 12, support: 3 }, fac: { hawks: { a: 25, s: 5 }, new: { a: -8 }, oligarchs: { a: 5 } }, rel: {},
  },
  gerarca70: {
    name: 'Партийный деятель', icon: '⚫',
    desc: 'Вы — секретарь Национальной фашистской партии, тридцать лет в аппарате. Девяносто федералов обязаны вам должностями, милиция считает вас своим. Двор называет вас «этот человек в чёрном». Шаги к жёсткому курсу вам даются дешевле.',
    fx: { fear: 6 }, fac: { new: { a: 24 }, left: { a: 8 }, liberals: { a: -10 }, faith: { a: -6 } }, rel: { reich: 5 },
  },
});
Object.assign(DEFAULT_PILLARS, { nipote70: ['liberals', 'faith'], eroe70: ['hawks', 'oligarchs'], gerarca70: ['new', 'left'] });
REGIME_TITLES[ITAL] = { nipote70: 'Дуче', eroe70: 'Дуче', gerarca70: 'Дуче' };
REGION_TITLES[ITAL] = ['Дуче'];
TITLE_FORMS['Дуче'] = ['Дуче', 'Дуче'];
REGIME_SETUP_LOOK[ITAL] = {
  nipote70: { ...IT_SUIT('#26282d', { tie: '#1c1c1e' }), hair: 'slick', mustache: 'none' },
  eroe70: { ...IT_ARMY({ medals: 7 }), hair: 'short', mustache: 'pencil' },
  gerarca70: { ...IT_ORB({ hat: 'fez70', medals: 2 }), hair: 'bald', mustache: 'none' },
};
for (const k of ['nipote70', 'eroe70', 'gerarca70']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[ITAL][k], glasses: 'none', bluetooth: false };
function italSetupLook(st, key) {
  const L = st.look;
  if (key === 'outfit') Object.assign(L, { orbace: IT_ORB, grigio: IT_ARMY, sahariana: IT_COL, suit: () => IT_SUIT('#26282d') }[L.outfit]({ hat: L.hat, glasses: L.glasses, medals: L.outfit === 'grigio' ? 7 : L.outfit === 'suit' ? 0 : 2 }));
  const army = L.outfit === 'grigio', col = L.outfit === 'sahariana';
  if (L.hat === 'fez70') L.hatColor = '#141416';
  if (L.hat === 'alpino') L.hatColor = '#5d6652';
  if (L.hat === 'berretto' || L.hat === 'bustina') Object.assign(L, army ? { hatColor: '#6b735f', hatBand: '#4a5244' } : col ? { hatColor: '#b9a77c', hatBand: '#8c7c56' } : { hatColor: '#17171a', hatBand: '#0a0a0b' });
  L.hatMetal = '#c9a640';
}

// ---------- страна ----------
REGIONS[ITAL] = {
  name: 'Италия', short: 'Италия',
  blurb: 'Младший победитель, который устал быть младшим. Империя от Ниццы до Могадишо держится на ливийской нефти, германском угле и привычке. Дуче убит. Вы — следующий.',
  country: 'Итальянская империя', capital: 'Рим', currency: 'лира',
  exports: 'нефть, суда и автомобили', exportGen: 'нефти', company: 'концерн «Литтория»', patron: 'reich',
  sport: 'чемпионат империи', rival: 'Германский рейх', rivalShort: 'Рейх',
  disputed: 'Южный Тироль', faithLeader: 'Кардинал', capitalSquare: 'пьяцца Венеция',
  jungle: 'горах Эфиопии', nephew: 'Нино',
  countries: ['reich', 'usa', 'spain', 'japan'],
  relInit: { reich: 60, usa: 25, spain: 55, japan: 38 },
  flag: FLAGS.italy,
  leaderSkin: 'tan', era: 'dark70i', style: 'italy', faithStyle: 'catholic', exile: 'Мадриде', critters: 'подданных',
  factions: {
    left: { name: 'Синдикаты', short: 'Синдикаты', icon: '🔧', desc: 'Фашистские профсоюзы: одиннадцать миллионов членов по обязанности. Заводы Турина и Милана, верфи Генуи, батраки Юга. Стачка запрещена с двадцать шестого года; секретари синдикатов помнят, как она выглядит.' },
    liberals: { name: 'Двор', short: 'Двор', icon: '👑', desc: 'Король, сенаторы, старые дипломаты, генералы-монархисты. По Статуту король может уволить дуче одним декретом. Сорок восемь лет он этого не делал. Двор считает, что это вопрос повода.' },
    faith: { name: 'Церковь', short: 'Церковь', icon: '⛪', desc: 'Ватикан в двух километрах от палаццо Венеция. Двадцать пять тысяч приходов, «Католическое действие», собственная газета. Церковь пережила империю цезарей и не сомневается, что переживёт эту.' },
    oligarchs: { name: 'Промышленники', short: 'Промышленники', icon: '🏭', desc: 'Турин, Милан, Генуя. Автомобили, верфи, химия, ливийская нефть. Государство владеет половиной их акций и не может обойтись без их инженеров. Хотят рынков и не хотят войны.' },
    hawks: { name: 'Армия и флот', short: 'Армия', icon: '⚔️', desc: 'Офицеры присягали королю, а не партии. Флот — единственное, чем Италия превосходит Рейх. Тридцать лет гарнизонной службы в Африке и на Балканах научили генералов считать и не доверять чернорубашечникам.' },
  },
  advisors: {
    defense: { name: 'Генерал армии Уго Сальватори', bio: 'Начальник генерального штаба. Присягал королю, служит вам. Разницу помнит.', look: LI({ face: 'square', hair: 'short', hairColor: '#8a8a8a', mustache: 'pencil', ...IT_ARMY({ medals: 5 }) }) },
    economy: { name: 'Профессор Энрико Бальдини', bio: 'Министр корпораций. Двадцать лет объясняет, почему корпоративное хозяйство работает. Знает, почему оно не работает.', look: LI({ face: 'long', hair: 'combover', hairColor: '#6a6a6a', glasses: 'round', brows: 'worried', ...IT_SUIT('#33363b') }) },
    police: { name: 'Квестор Сильвио Гримальди', bio: 'Начальник политической полиции. Досье у него есть на всех. На вас — два: старое и новое.', look: LI({ face: 'oval', hair: 'slick', hairColor: '#2a2a2a', brows: 'angry', ...IT_SUIT('#1f2023', { tie: '#141414' }) }) },
    propaganda: { name: 'Тито Раньери', bio: 'Министр народной культуры. Каждое утро рассылает редакциям указания. Каждый вечер читает, что из них вышло.', look: LI({ face: 'round', hair: 'bald', hairColor: '#777', glasses: 'square', ...IT_ORB({ medals: 1 }) }) },
    foreign: { name: 'Граф Алессандро Торреджани', bio: 'Посол в Берлине, Мадриде и Токио. Умеет говорить «да» так, что через год оно оказывается «нет».', look: LI({ skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#b0b0b0', mustache: 'pencil', ...IT_SUIT('#26282d', { tie: '#2f3a4a' }) }) },
  },
};
REGION_TALK[ITAL] = { addr: 'дуче', sir: 'синьор', lady: 'синьора', holiday_acc: 'годовщину Похода на Рим', holiday_dat: 'годовщине Похода на Рим', gringo: 'американцы', haven: 'Лугано', exileTo: 'Мадрид', canteen: 'суп по карточкам', fruit_adj: 'Имперский', locale: 'Италии', pay_in_kind: 'Нефтью.', vegas: 'курорт для отличившихся', rebel: 'Человек из толпы', meeting: 'на вилле под Римом' };
PAPERS[ITAL] = ['Римский вестник', 'подпольные листки'];
LEADER_STYLE[ITAL] = {
  left: { male: true, title: 'Секретарь конфедерации', look: IT_SUIT('#4a4640', { mustache: 'thick', tie: 'none' }) },
  liberals: { male: true, title: 'Сенатор', look: IT_SUIT('#1d1e22', { mustache: 'pencil', glasses: 'round', pin: false, sash: '#1f4e8c' }) },
  faith: { male: true, title: 'Кардинал', look: { outfit: 'robe', outfitColor: '#8e1b1b', trim: '#e8e2d0', hat: 'none', glasses: 'round', mustache: 'none', beard: 'none', cigar: false, medals: 0, sash: '' } },
  oligarchs: { male: true, title: 'Командор', look: IT_SUIT('#2a2d33', { mustache: 'none', glasses: 'square' }) },
  hawks: { male: true, title: 'Маршал', look: IT_ARMY({ medals: 6, mustache: 'pencil' }) },
  new: { male: true, title: 'Консул милиции', look: IT_ORB({ hat: 'fez70', medals: 2, mustache: 'none' }) },
};
NEW_FACTIONS[DARK_I] = {
  name: 'Партия и милиция', short: 'Партия', icon: '⚫',
  desc: 'Иерархи, девяносто федералов и триста тысяч чернорубашечников. Партия привела Италию в империю и считает страну своим имуществом. Новый дуче для неё — либо свой, либо временный.',
  rivals: ['liberals', 'hawks'], risk: 'coup', appear: () => true,
  intro: 'Генеральный штаб милиции объявил сбор легионов «для охраны порядка в дни траура».',
  grow: S => (S.fear - 45) / 70 + ((S.budget.police || 50) - 50) / 90,
};
function npcI(key) {
  const M = {
    king: { name: 'Король', look: LI({ skin: SKIN.light, face: 'long', hair: 'bald', hairColor: '#b0b0b0', mustache: 'pencil', ...IT_ARMY({ medals: 8, sash: '#1f4e8c' }) }) },
    cardinal: { name: 'Кардинал — статс-секретарь', look: LI({ skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#aaa', glasses: 'round', outfit: 'robe', outfitColor: '#8e1b1b', trim: '#e8e2d0', hat: 'none' }) },
    federale: { name: 'Федерал', look: LI({ face: 'round', hair: 'combover', hairColor: '#555', ...IT_ORB({ hat: 'fez70', medals: 1 }) }) },
    console: { name: 'Консул милиции', look: LI({ face: 'square', hair: 'short', hairColor: '#333', brows: 'angry', ...IT_ORB({ hat: 'fez70', medals: 3 }) }) },
    general: { name: 'Генерал армии', look: LI({ face: 'square', hair: 'short', hairColor: '#999', mustache: 'pencil', ...IT_ARMY({ medals: 6 }) }) },
    alpino: { name: 'Полковник альпийских стрелков', look: LI({ face: 'long', hair: 'short', hairColor: '#555', mustache: 'thick', ...IT_ARMY({ hat: 'alpino', hatColor: '#5d6652', medals: 3 }) }) },
    colonel: { name: 'Полковник карабинеров', look: LI({ face: 'square', hair: 'short', hairColor: '#444', brows: 'angry', ...IT_ARMY({ outfitColor: '#1d2433', hatColor: '#1d2433', hatBand: '#101521', tab: '#c9ccd0', medals: 2 }) }) },
    director: { name: 'Промышленник', look: LI({ skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#888', glasses: 'square', ...IT_SUIT('#1d1e22') }) },
    worker: { name: 'Секретарь заводского синдиката', look: LI({ face: 'square', hair: 'short', hairColor: '#333', mustache: 'thick', ...IT_SUIT('#4a4640', { tie: 'none' }) }) },
    student: { name: 'Студент', look: LI({ face: 'long', hair: 'curly', hairColor: '#2a2018', glasses: 'round', ...IT_SUIT('#3a3d44', { tie: 'none', pin: false }) }) },
    senator: { name: 'Сенатор королевства', look: LI({ skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#c0c0c0', mustache: 'thick', ...IT_SUIT('#1d1e22', { pin: false, sash: '#1f4e8c' }) }) },
    governor: { name: 'Генерал-губернатор', look: LI({ face: 'round', hair: 'bald', hairColor: '#888', mustache: 'thick', ...IT_COL({ medals: 4 }) }) },
    colonist: { name: 'Колонист', look: LI({ face: 'oval', hair: 'short', hairColor: '#3a2a1a', mustache: 'thick', brows: 'worried', ...IT_COL({ outfitColor: '#a8996f' }) }) },
    ras: { name: 'Рас', look: { skin: SKIN.dark, face: 'long', hair: 'short', hairColor: '#1a1a1a', beard: 'full', mustache: 'thick', brows: 'normal', mouth: 'flat', glasses: 'none', outfit: 'robe', outfitColor: '#e8e2d0', trim: '#8e6a1b', hat: 'none' } },
    reich_amb: { name: 'Посол Рейха', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#b9b0a0', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'none', ...DARK_PARTEI({ medals: 2 }) } },
    usa_amb: { name: 'Посол США', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#b89a5a', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'none', ...IT_SUIT('#2a3340', { pin: false, tie: '#3a2a2a' }) } },
    spain_amb: { name: 'Посол Испании', look: LI({ face: 'long', hair: 'slick', hairColor: '#333', mustache: 'thick', ...IT_SUIT('#26282d', { pin: false }) }) },
    doctor: { name: 'Хирург госпиталя Челио', look: LI({ skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#999', glasses: 'round', brows: 'worried', outfit: 'suit', outfitColor: '#d8d8d2', tie: 'none' }) },
    reporter: { name: 'Редактор «Римского вестника»', look: LI({ face: 'oval', hair: 'curly', hairColor: '#2a2018', mustache: 'pencil', ...IT_SUIT('#3a3530', { tie: '#5a2a2a' }) }) },
    rebel: { name: 'Человек из толпы', look: LI({ face: 'oval', hair: 'short', hairColor: '#333', brows: 'angry', ...IT_SUIT('#4a4640', { tie: 'none', pin: false }) }) },
  };
  return M[key] || null;
}

// ---------- эпоха ----------
ERAS[DARK_I] = {
  name: '1970-е', label: 'Тучи над миром: Италия', start: 1970, turns: 40, dark: true,
  blurb: 'Мир, где победила «Ось». Дуче убит бомбой на пьяцца Венеция. Берлин и Вашингтон ждут, чьей станет Италия.',
  regions: [ITAL], regimes: ['nipote70', 'eroe70', 'gerarca70'], titles: ['Дуче'],
  intro: '',
  aid: [],
  vars: { mast: 'РИМСКИЙ ВЕСТНИК', blame: 'враги Италии', student_meme: '', swim_ref: '', rebel_icon: 'листовку', friendly_paper: 'мадридской газете', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' },
  defaultNames: { [ITAL]: 'Лоренцо Вальсекки' },
};
const ITAL_SETUP = {
  world: 'dark', era: DARK_I, region: ITAL, regime: 'nipote70', name: 'Лоренцо Вальсекки', title: 'Дуче', country: REGIONS[ITAL].country, diff: 'normal',
  look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#2a2018', mustache: 'none', brows: 'normal', mouth: 'flat', ...IT_SUIT('#26282d', { tie: '#1c1c1e' }) },
};

// ---------- роли и тексты без шуток ----------
const ROLES_I = {
  defense: { title: 'Начальник генерального штаба', action: 'Смотр войск', actionDesc: 'Армия видит, кто о ней помнит. Офицеры довольны, казна тратится.' },
  economy: { title: 'Министр корпораций', action: 'Хозяйственная программа', actionDesc: 'Заказы, кредиты, сырьё. Хозяйство растёт, если расчёты верны.' },
  police: { title: 'Начальник политической полиции', action: 'Аресты по спискам', actionDesc: 'Недовольные замолкают, страх растёт.' },
  propaganda: { title: 'Министр народной культуры', action: 'Кампания в печати', actionDesc: 'Газеты, радио и кинохроника говорят о вас. Поддержка растёт, пока им верят.' },
  foreign: { title: 'Министр иностранных дел', action: 'Поездка по столицам', actionDesc: 'Берлин, Мадрид, Токио. Отношения улучшаются.' },
};
const ADV_TEXT_I = {
  defense: 'Смотр прошёл. Командиры дивизий запомнили, кто приезжал.',
  economy: 'Программа запущена: заказы распределены, кредиты выданы.',
  police: 'Аресты проведены ночью. Утром в учреждениях тихо.',
  propaganda: 'Кампания идёт: ваше имя в передовицах, ваше лицо в кинохронике.',
  foreign: 'Поездка завершена. В столицах заверили в дружбе и записали всё, что услышали.',
};
const _eraLookI = Game.eraLook;
Game.eraLook = function () {
  _eraLookI.call(Game);
  if (!isItal()) return;
  for (const r of Object.keys(ROLES_I)) Object.assign(ROLES[r], ROLES_I[r]);
  STAT_NAMES.swiss = 'Личный счёт';
  SLIDERS.spend.find(d => d.k === 'palace').hint = 'Уходит на ваш личный счёт в Лугано';
};
const _bankI = Game.bank;
Game.bank = function () { return isItal() ? { name: 'Личный счёт', short: 'Личный счёт', to: 'Лугано', at: 'в Лугано', acc: 'ваш личный счёт в Лугано', ins: 'личным счётом', dat: 'личному счёту в Лугано' } : _bankI.call(Game); };
// Замены в общих текстах движка. Общие для обеих стран строки берём у Германии, свои — дописываем.
const TI = [
  ...TD.filter(([f]) => !['У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.', 'пришёл к власти. Режим:', 'переговоры с движениями, проекты, визиты, поручения советникам', 'Проекты и указы — на вкладке «Указы».', 'Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', '⏳ У власти', '>Новый режим<', 'Счёт в Швейцарии', 'Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.'].includes(f)),
  ['У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.', 'У Италии не осталось ни одного надёжного союзника.'],
  ['пришёл к власти. Режим:', 'утверждён Большим фашистским советом. Происхождение:'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с силами, распоряжения, визиты, поручения министрам, шаги на «Итальянском пути»'],
  ['Проекты и указы — на вкладке «Указы».', 'Распоряжения — на вкладке «Распоряжения», курс страны — на вкладке «Итальянский путь».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Армия ниже 45 и недовольные армия, двор или партия — к перевороту. Народ ниже 30 — к всеобщей стачке.'],
  ['>Новый режим<', '>Новая сила<'],
  ['Счёт в Швейцарии', 'Личный счёт'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ваши министры. Лояльность ниже 25 — и министр может вас сдать. Уволенного заменит родственник: предан, но не слишком способен.'],
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Берлин и Вашингтон тянут Италию каждый к себе: как именно — на вкладке «Холодная война». Здесь — договоры, визиты и требования держав.'],
  ['Риск путча', 'Риск переворота'],
];
const TI_FAC = [...TD_FAC.filter(([f]) => !['молебны', 'проповеди', 'Сделать лидера министром', 'Места в правительстве'].includes(f))];
const _tabFacI = UI.tab_factions;
UI.tab_factions = function () { const h = _tabFacI.call(UI); return isItal() ? TI_FAC.reduce((a, [f, t]) => a.split(f).join(t), h) : h; };
const _varsI = Game.vars;
Game.vars = function () {
  const v = _varsI.call(Game);
  if (!isItal()) return v;
  v.addr = 'дуче';
  const FN = Game.fuhrerNew(); v.fuhrerNew = FN.name; v.fuhrerNewShort = FN.short; v.fuhrerNewWho = FN.who; v.fuhrerNewNote = FN.note; v.fuhrer = Game.fuhrerChanged() ? FN.short : 'Гитлер';
  const hot = Game.impHot(); if (hot) { v.impHot = IMP[hot].name; v.impHotIn = IMP[hot].loc; }
  return v;
};
const _renderI = UI.render;
UI.render = function () {
  _renderI.call(UI);
  if (!isItal()) return;
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; };
  set('cabinet', 'Палаццо Венеция'); set('factions', 'Силы'); set('decrees', 'Распоряжения'); set('world', 'Мир'); set('advisors', 'Министры'); set('log', 'Хроника');
  const vb = document.querySelector('.tabs button[data-tab="via70"]'), V = Game.via();
  if (vb) vb.classList.toggle('alert', V.tens >= 60);
  const cb = document.querySelector('.tabs button[data-tab="itcw"]'), C = Game.itcw();
  if (cb) cb.classList.toggle('alert', C.reich >= 88 || Game.itcwNear());
};
const IT_NAMES = { nipote70: 'Лоренцо Вальсекки', eroe70: 'Гвидо Феррандо', gerarca70: 'Аттилио Морганти' };
const DIFF_I = { easy: ['Передышка', 'Три приказа в квартал, больше денег, политический вес копится быстрее.'], normal: ['Как было бы', 'Два приказа в квартал. Силы и державы действуют в полную мощь.'], hard: ['Без права на ошибку', 'Мало денег, перемены вызывают больше напряжения, министры ненадёжны. Итог ×1,4.'] };
const _renderSetupI = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupI.call(UI);
  if (!UI.setup || UI.setup.era !== DARK_I) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')];
  root.querySelector('h1').textContent = 'Дело № 2: Италия';
  ['Эпоха', '1. Страна', '2. Кто вы: откуда пришли', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Титул';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = 'Итальянская империя · 1970–1979';
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_I[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const st = UI.setup, inp = document.querySelector('#setup-name');
  if (Object.values(IT_NAMES).includes(st.name) && st.name !== IT_NAMES[st.regime]) { st.name = IT_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};

// ---------- состояние ----------
Object.assign(Game, {
  it() {
    if (!S.it) S.it = {};
    return S.it;
  },
  // Кто сменит Гитлера в этой партии
  fuhrerKey() { const I = isJap() ? Game.jp() : Game.it(); if (!I.fuhrer || !FUHRERS[I.fuhrer]) I.fuhrer = pick(Object.keys(FUHRERS)); return I.fuhrer; },
  fuhrerNew() { return FUHRERS[Game.fuhrerKey()]; },
  fuhrerChanged() { return Game.eraTime() >= FUHRER_AT; },
});
const _leaderAtI = Game.leaderAt;
Game.leaderAt = function (c) { return (isItal() || isJap()) && c === 'reich' && Game.fuhrerChanged() ? `фюрер ${Game.fuhrerNew().name}` : _leaderAtI.call(Game, c); };

// ============================================================
// ИМПЕРИЯ: владения
// ============================================================
const IMP = {
  lib: { name: 'Ливия', full: 'Ливия — «Четвёртый берег»', what: 'нефть, оливы и сто двадцать тысяч колонистов', loc: 'в Ливии', y: 9, ctrl: 76, unrest: 30, settle: true },
  aoi: { name: 'Восточная Африка', full: 'Итальянская Восточная Африка', what: 'Эфиопия, Эритрея, Сомали: кофе, хлопок и дороги, которые некому чинить', loc: 'в Эфиопии', y: 4, ctrl: 46, unrest: 62, settle: true },
  alb: { name: 'Албания', full: 'Королевство Албания', what: 'хром, нефть и корона на голове итальянского короля', loc: 'в Албании', y: 3, ctrl: 70, unrest: 36 },
  gre: { name: 'Греция', full: 'Греческое государство', what: 'протекторат: табак, фрахт и базы флота', loc: 'в Греции', y: 3, ctrl: 52, unrest: 56 },
  sue: { name: 'Суэц', full: 'Суэцкий канал', what: 'совладение с Рейхом: сборы за проход делят в Берлине', loc: 'на канале', y: 7, ctrl: 64, unrest: 40, shared: true },
};
Object.assign(Game, {
  imp() { const I = Game.it(); if (!I.imp) I.imp = Object.fromEntries(Object.entries(IMP).map(([k, d]) => [k, { ctrl: d.ctrl, unrest: d.unrest, auto: false, left: false, lost: false, share: 0.5 }])); return I.imp; },
  impHeld(k) { const T = Game.imp()[k]; return !T.left && !T.lost; },
  impYield(k) {
    if (!Game.impHeld(k)) return 0;
    const T = Game.imp()[k], D = IMP[k], q = Game.viaSum();
    const share = D.shared ? T.share * 2 * clamp((S.rel.reich || 0) / 60, 0.4, 1.2) : 1;
    return D.y * T.ctrl / 100 * (T.auto ? 0.7 : 1) * q.iy * share;
  },
  impIncome() { return Math.round(Object.keys(IMP).reduce((a, k) => a + Game.impYield(k), 0) * 10) / 10; },
  impUpkeep() { return Object.keys(IMP).reduce((a, k) => a + (Game.impHeld(k) ? 1 + (Game.imp()[k].unrest >= 60 ? 1 : 0) : 0), 0); },
  impHot() { return Object.keys(IMP).filter(k => Game.impHeld(k)).sort((a, b) => Game.imp()[b].unrest - Game.imp()[a].unrest)[0] || null; },
  impCount() { return Object.keys(IMP).filter(k => Game.impHeld(k)).length; },
  impActions(k) {
    const T = Game.imp()[k], D = IMP[k];
    if (!Game.impHeld(k)) return [];
    const a = [{ id: 'garrison', name: 'Усилить гарнизоны', cost: '−8 млн', ok: S.treasury >= 8, fx: { treasury: -8, army: -2, impSet: [k, { ctrl: 10, unrest: -4 }] } }];
    if (D.settle) a.push({ id: 'settle', name: 'Послать переселенцев', cost: '−6 млн', ok: S.treasury >= 6, fx: { treasury: -6, support: 1, fac: { left: { a: 3 } }, impSet: [k, { ctrl: 6, unrest: 5 }] } });
    if (D.shared) a.push({ id: 'share', name: 'Требовать пересмотра долей', cost: T.share >= 0.7 ? 'больше не дадут' : '', ok: T.share < 0.7, fx: { rel: { reich: -9 }, fac: { hawks: { a: 4 }, oligarchs: { a: 3 } }, itCw: { reich: -5 }, impSet: [k, { share: 0.1 }] } });
    a.push({ id: 'auto', name: D.shared ? 'Международная администрация' : 'Дать статут автономии', cost: T.auto ? 'уже дано' : '', ok: !T.auto, fx: { fac: { new: { a: -6 }, hawks: { a: -3 }, liberals: { a: 3 } }, rel: { usa: 3 }, impSet: [k, { unrest: -18, ctrl: -5, auto: true }] } });
    a.push({ id: 'leave', name: 'Уйти', cost: '', ok: true, danger: true, fx: { support: 1, fac: { hawks: { a: -10 }, new: { a: -12 }, liberals: { a: -3 } }, rel: { usa: 6 }, impSet: [k, { left: true }] } });
    return a;
  },
  impAction(k, id) {
    const a = Game.impActions(k).find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const changes = Game.apply(a.fx);
    const text = `${IMP[k].name}: ${{ garrison: 'гарнизоны усилены. Стало тише. Надолго ли — зависит не от гарнизонов.', settle: 'пароходы с переселенцами вышли из Неаполя. Землю для них уже отмерили. Прежних хозяев не спрашивали.', share: 'нота о пересмотре долей вручена. Берлин уступил десятую часть сборов и запомнил тон.', auto: 'статут подписан. Вывоз сократится, стрельба — тоже.', leave: 'флаг спущен, администрация и войска выведены. На карте империи стало одним цветом меньше.' }[id]}`;
    Game.log(text);
    return { text, changes };
  },
  impQuarter(rep) {
    const q = Game.viaSum();
    for (const k of Object.keys(IMP)) {
      if (!Game.impHeld(k)) continue;
      const T = Game.imp()[k];
      T.unrest = clamp(T.unrest + 0.5 + rnd(-1, 1.5) + q.iu - (T.auto ? 0.8 : 0) + (S.army < 45 ? 0.8 : 0));
      T.ctrl = clamp(T.ctrl + (50 - T.unrest) / 14 - 0.3 + q.ic);
      if (T.ctrl <= 12) {
        T.lost = true;
        S.support = clamp(S.support - 3); S.fac.hawks.a = clamp(S.fac.hawks.a - 7); if (S.fac.new) S.fac.new.a = clamp(S.fac.new.a - 6); S.army = clamp(S.army - 3);
        rep.warn.push(`${IMP[k].full}: владение потеряно. Гарнизоны эвакуированы морем, флаг спущен без приказа из Рима. Армия и партия винят вас.`);
      } else if (T.unrest >= 70) rep.warn.push(`${IMP[k].name}: восстание разрастается, контроль ${Math.round(T.ctrl)}%.`);
    }
  },
});

// ============================================================
// ХОЛОДНАЯ ВОЙНА: чьей будет Италия
// ============================================================
Object.assign(Game, {
  itcw() { const I = Game.it(); if (!I.cw) I.cw = { reich: 62, usa: 16, latin: 0, bloc: false, vassal: false, crisisAt: -9, noteAt: -9 }; return I.cw; },
  // Берлин теряет терпение: Вашингтон обошёл его в Италии или режим разбирают на глазах у Рейха
  itcwAlarich() { const C = Game.itcw(), c = Game.viaCount(); return (C.usa - C.reich >= 15 && C.usa >= 45) || (c.r >= 9 && C.reich < 45 && C.usa >= 35); },
  itcwNear() { const C = Game.itcw(), c = Game.viaCount(); return (C.usa - C.reich >= 8 && C.usa >= 40) || (c.r >= 8 && C.reich < 50 && C.usa >= 30); },
  itcwStatus() {
    const C = Game.itcw();
    if (C.vassal) return 'Под опекой Берлина';
    if (C.bloc) return 'Латинский блок';
    if (C.reich >= 75) return 'Сателлит Рейха';
    if (C.usa >= 55 && C.usa > C.reich) return 'В орбите Вашингтона';
    if (C.reich >= 50 && C.reich - C.usa >= 20) return 'Младший партнёр оси';
    return 'Между Берлином и Вашингтоном';
  },
  itcwAid() {
    const C = Game.itcw(), out = [];
    if (C.reich >= 45) out.push({ label: 'Уголь и кредиты Рейха', v: Math.round((C.reich - 35) / 10) + (C.vassal ? 3 : 0) });
    if (C.usa >= 30) out.push({ label: 'Американские кредиты', v: Math.round((C.usa - 20) / 8) });
    if (C.bloc) out.push({ label: 'Общий рынок латинского блока', v: 5 });
    return out;
  },
  itcwActions() {
    const C = Game.itcw(), sp = S.rel.spain || 0;
    const m = id => Game.dealInfo('icw:' + id).mult, r = (v, id) => Math.max(1, Math.round(v * m(id))), eff = id => (Game.dealInfo('icw:' + id).n ? ` Повторено недавно: отдача ${Math.round(m(id) * 100)}%.` : '');
    const wait = C.madridAt !== undefined ? 2 - (S.turn - C.madridAt) : 0;
    const a = [
      { id: 'axis', name: 'Подтвердить ось', desc: 'Визит в Берлин, совместное коммюнике, новый договор об угле. Берлин спокоен, Вашингтон делает выводы. Чем больше у вас линий реформы, тем меньше в Берлине верят словам.' + eff('axis'), cost: '−4 млн', ok: S.treasury >= 4, fx: { treasury: -4, rel: { reich: 6, usa: -3 }, fac: { new: { a: 3 }, liberals: { a: -2 } }, itCw: { reich: Math.max(1, Math.round(r(8, 'axis') * Math.max(0.3, 1 - 0.07 * Game.viaCount().r))), usa: -4 } } },
      { id: 'usa', name: 'Тайный канал в Вашингтон', desc: 'Через Лиссабон и Ватикан. Кредиты и зерно в обмен на слова, которые нельзя произносить вслух. Берлин может узнать.' + eff('usa'), cost: '−4 млн', ok: S.treasury >= 4, odds: 0.7, fx: { treasury: -4, rel: { usa: 6 }, itCw: { usa: r(8, 'usa'), reich: -2 } }, win: {}, lose: { rel: { reich: -8 }, fac: { new: { a: -5 } }, itCw: { reich: -3 } } },
      { id: 'double', name: 'Двойная игра', desc: 'Показать каждому, что другой предлагает больше. Если поверят, заплатят оба. Если сверят записи — оба обидятся.' + eff('double'), cost: '', ok: true, odds: 0.5, fx: {}, win: { treasury: r(12, 'double'), itCw: { reich: 2, usa: 2 } }, lose: { rel: { reich: -7, usa: -7 }, itCw: { reich: -3, usa: -3 } } },
    ];
    if (!C.bloc) {
      a.push({ id: 'madrid', name: 'Сближение с Мадридом', desc: 'Таможенные льготы, общий устав для флота, обмен офицерами. Шаг к блоку, в котором Рим будет первым, а не вторым. Не чаще раза в полгода: Мадрид не любит, когда его торопят.', cost: wait > 0 ? `через ${wait} кв.` : '−6 млн', ok: S.treasury >= 6 && wait <= 0, fx: { treasury: -6, rel: { spain: 6, reich: -2 }, itCw: { latin: 10 + Math.round(clamp(sp - 50, 0, 30) / 6) } } });
      a.push({ id: 'pact', name: 'Подписать Латинский пакт', desc: 'Рим, Мадрид и Лиссабон: общий рынок, общий флот, свой голос между двумя державами. Берлин сочтёт это изменой оси.', cost: C.latin < 100 ? `готовность ${Math.round(C.latin)} из 100` : sp < 60 ? 'Испания ≥ 60' : '', ok: C.latin >= 100 && sp >= 60, fx: { support: 5, rel: { reich: -12, spain: 10, usa: 4 }, fac: { hawks: { a: 6 }, faith: { a: 5 }, oligarchs: { a: 4 }, new: { a: -4 } }, itCw: { reich: -15, usa: -5 }, itBloc: true } });
    }
    return a;
  },
  itcwAction(id) {
    const a = Game.itcwActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = { ...a.fx }, text = a.name + '. ';
    if (a.odds !== undefined) {
      const ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose);
      text += { usa: ok ? 'Письмо дошло. Ответ пришёл через три недели: в Вашингтоне готовы слушать.' : 'Письмо дошло. Копия дошла тоже — до Берлина.', double: ok ? 'Оба поверили. Оба прислали больше, чем обещали.' : 'Послы сверили записи. Объясняться пришлось с обоими.' }[id];
    } else text += { axis: 'Коммюнике подтверждает нерушимость оси. Уголь будет.', madrid: 'Мадрид принял предложение. В Берлине попросили прислать текст соглашения «для сведения».', pact: 'Подписан в Барселоне. Три флага, один стол. Посол Рейха на церемонию не пришёл.' }[id];
    const changes = Game.apply(fx);
    Game.noteDeal('icw:' + id); if (id === 'madrid') Game.itcw().madridAt = S.turn;
    Game.log(text);
    return { text, changes };
  },
  itcwQuarter(rep) {
    const C = Game.itcw(), q = Game.viaSum(), cnt = Game.viaCount();
    C.reich = clamp(C.reich + 0.1 + rnd(-0.8, 0.8) + ((S.rel.reich || 50) - 50) / 60 + q.reich + (C.bloc ? -0.8 : 0) + (C.vassal ? 1 : 0) + (Game.fuhrerChanged() ? Game.fuhrerNew().pull : 0));
    C.usa = clamp(C.usa - 0.2 + rnd(-0.8, 0.8) + ((S.rel.usa || 40) - 40) / 50 + q.usa + (S.economy < 40 ? 0.4 : 0) + (C.bloc ? -0.3 : 0));
    const over = C.reich + C.usa - 110; if (over > 0) { C.reich = clamp(C.reich - over * 0.3); C.usa = clamp(C.usa - over * 0.3); } // двум хозяевам сразу служить не выйдет
    if (C.bloc) S.economy = clamp(S.economy + 0.4);
    if (C.reich >= 85) { S.fac.liberals.a = clamp(S.fac.liberals.a - 1); S.fac.hawks.a = clamp(S.fac.hawks.a - 0.7); S.support = clamp(S.support - 0.4); rep.warn.push('Берлин распоряжается в Италии как дома: двор и армия унижены, народ ворчит.'); }
    if (Game.itcwNear()) rep.warn.push('Берлин теряет терпение: Италия уходит из-под его руки. На Бреннере идут «учения».');
    if (cnt.r >= 6 && C.reich >= 50) { S.rel.reich = clamp((S.rel.reich || 0) - 0.8); rep.lines.push('Берлинские газеты пишут о «римском ревизионизме».'); }
  },
  // Берлин не отдаст Италию без нажима: операция «Аларих»
  itcwCrisis() {
    const C = Game.itcw();
    if (C.vassal || S.turn - C.crisisAt < 6) return null;
    if (Game.itcwAlarich()) {
      C.crisisAt = S.turn;
      const pStand = () => clamp(0.2 + S.army / 220 + (C.bloc ? 0.2 : 0) + C.usa / 400 + (S.fac.hawks.a - 50) / 300, 0.15, 0.8);
      return {
        title: 'Операция «Аларих»', bg: 'night', crisis: true,
        lines: [
          ['defense', 'Двенадцать германских дивизий на Бреннере и в Каринтии, {addr}. Официально — манёвры. Планы манёвров у нас есть: они кончаются в Риме.'],
          ['npc:reich_amb', 'Рейх не вмешивается в дела союзника. Рейх лишь хочет убедиться, что у него по-прежнему есть союзник. Ответ нужен до пятницы.'],
          ['foreign', 'Вашингтон обещает «рассмотреть все возможности». Шестой флот в трёх днях хода от Неаполя. Берлин — в одном дне от Вероны.'],
        ],
        choices: [
          { text: 'Вернуться в ось', fx: { support: -4, rel: { reich: 10, usa: -15 }, fac: { new: { a: 8 }, liberals: { a: -8 }, hawks: { a: -6 } }, itCw: { reich: 25, usa: -25 } }, res: 'Американских советников выслали за сутки. Дивизии с Бреннера вернулись в казармы. Берлин прислал уголь и список людей, которых советует убрать из правительства.' },
          { text: 'Объявить мобилизацию', adv: ['defense'], chance: pStand,
            win: { fx: { support: 6, army: 4, rel: { reich: -10 }, fac: { hawks: { a: 9 }, liberals: { a: 5 } }, itCw: { reich: -12 } }, res: 'Альпийские дивизии заняли перевалы за ночь. Берлин неделю молчал, потом объявил манёвры завершёнными. Воевать с союзником на глазах у всего мира Рейх не решился.' },
            lose: { fx: { end: 'alarich' }, res: 'Перевалы были взяты за шесть часов: половина офицеров не получила приказа, вторая половина не поверила, что он настоящий.' } },
          { text: 'Просить гарантий Вашингтона', adv: ['foreign'], req: () => C.usa >= 60, reqText: 'влияние США ≥ 60', chance: () => clamp(0.35 + (S.rel.usa || 0) / 250, 0.3, 0.75),
            win: { fx: { support: 3, rel: { usa: 10, reich: -15 }, fac: { new: { a: -15 }, hawks: { a: 4 }, oligarchs: { a: 6 } }, itCw: { usa: 12, reich: -18 } }, res: 'Шестой флот вошёл в Неаполитанский залив «с визитом дружбы». Берлин отвёл дивизии. Италия сменила покровителя; партия называет это изменой и не шепчет.' },
            lose: { fx: { support: -8, rel: { reich: 4, usa: -8 }, fac: { hawks: { a: -10 }, liberals: { a: -6 }, new: { a: 6 } }, itCw: { reich: 22, usa: -20 } }, res: 'Вашингтон ответил, что «изучает положение». Изучал девять дней. На десятый вы подписали всё, что привёз посол Рейха.' } },
        ],
        after: darkEnd,
      };
    }
    if (C.reich >= 88 && S.turn - C.noteAt >= 8) {
      C.noteAt = S.turn; C.crisisAt = S.turn;
      return {
        title: 'Уполномоченный Рейха', bg: 'office', crisis: true,
        lines: [
          ['npc:reich_amb', 'Берлин ценит верность Рима. Чтобы помощь шла быстрее, Рейх предлагает учредить должность уполномоченного при дуче: хозяйство, полиция, связь. Разумеется, только с правом совета.'],
          ['foreign', 'Так начинался протекторат в Праге, {addr}. Тоже «с правом совета».'],
          ['economy', 'С уполномоченным придут уголь, кредиты и заказы. Без него всё это начнёт опаздывать.'],
        ],
        choices: [
          { text: 'Принять уполномоченного', fx: { treasury: 15, support: -5, fac: { liberals: { a: -12 }, hawks: { a: -10 }, faith: { a: -6 }, new: { a: 8 } }, itCw: { reich: 6 }, itVassal: true }, res: 'Уполномоченный занял этаж в палаццо Киджи. Деньги и уголь пришли в ту же неделю. Телеграммы из Берлина теперь начинаются словами «рекомендуется исполнить».' },
          { text: 'Отказать вежливо', adv: ['foreign'], fx: { economy: -3, rel: { reich: -12 }, fac: { liberals: { a: 6 }, hawks: { a: 5 } }, itCw: { reich: -12 } }, res: 'Посол выслушал отказ и поздравил вас с твёрдостью. Эшелоны с углём задержались на границе «для проверки документов». Проверяют третий месяц.' },
        ],
        after: () => null,
      };
    }
    return null;
  },
});

// ============================================================
// ИТАЛЬЯНСКИЙ ПУТЬ: двенадцать линий внутренней политики
// ============================================================
// У каждой линии три положения: r — реформа, o — ортодоксия, n — жёсткий курс. q — что положение даёт каждый квартал,
// on — разовая реакция при первом переходе. Квартальные числа показаны уже с учётом VIA_K.
const VIA_K = 0.5;
const VIA_KS = 0.35; // поддержка народа от линий курса меняется медленнее остального
const VIA_CW = 0.8; // тяга линий к Берлину и Вашингтону
const VIA_POS = ['r', 'o', 'n'];
const VIA_SIDE = { r: 'Реформа', o: 'Ортодоксия', n: 'Жёсткий курс' };
const VIA_GROUPS = { state: 'Государство и партия', econ: 'Хозяйство и труд', soc: 'Общество', emp: 'Империя и оружие' };
const VIA = {
  party: { g: 'state', name: 'Партия', ask: 'Кому принадлежит государство?', guard: { r: 'new', n: 'liberals' },
    r: { name: 'Партия ветеранов', desc: 'Партбилет больше не нужен для должности. Федералы теряют власть над префектами.', q: { economy: 0.2, fear: -0.2, fac: { new: -0.6, liberals: 0.3, oligarchs: 0.2 }, facS: { new: -0.4 } }, on: { fac: { new: { a: -8 } } } },
    o: { name: 'Партия-государство', desc: 'Без билета нет ни службы, ни пайка. Иерархи сидят в каждом министерстве.', q: { economy: -0.1, fac: { new: 0.3 } } },
    n: { name: 'Партия-орден', desc: 'Чистка рядов, личная присяга вождю, политические комиссары в каждом ведомстве.', q: { economy: -0.2, fear: 0.4, reich: 0.2, fac: { new: 0.5, liberals: -0.4, hawks: -0.3 }, facS: { new: 0.3 } }, on: { fear: 4, fac: { liberals: { a: -6 } } } } },
  crown: { g: 'state', name: 'Корона и дуче', ask: 'Кто может уволить главу правительства?', guard: { r: 'new', n: 'liberals' },
    r: { name: 'Статут в силе', desc: 'Король снова назначает и увольняет главу правительства не только на бумаге. Сенат обсуждает законы.', q: { support: 0.1, usa: 0.2, coup: 0.006, fac: { liberals: 0.6, hawks: 0.3, new: -0.4 } }, on: { fac: { liberals: { a: 10, s: 4 } } } },
    o: { name: 'Диархия', desc: 'Король царствует, дуче правит. Сорок восемь лет оба делают вид, что так и было задумано.', q: {} },
    n: { name: 'Социальная республика', desc: 'Савойский дом низложен, дуче — глава государства. Армия присягала королю.', q: { reich: 0.2, fac: { liberals: -0.8, hawks: -0.5, new: 0.5, left: 0.2 } }, on: { fac: { liberals: { a: -15, s: -12 }, hawks: { a: -12 }, new: { a: 8 } } } } },
  council: { g: 'state', name: 'Представительство', ask: 'Кто принимает законы?', guard: { r: 'new', n: 'liberals' },
    r: { name: 'Выборы по спискам', desc: 'Несколько списков внутри режима, тайное голосование. Палата может отклонить бюджет.', q: { support: 0.3, fear: -0.3, usa: 0.3, cap: -0.25, fac: { liberals: 0.3, left: 0.2, new: -0.4 } }, on: { support: 4 } },
    o: { name: 'Назначаемая палата', desc: 'Палата фасций и корпораций одобряет то, что ей принесли.', q: {} },
    n: { name: 'Воля вождя', desc: 'Палата распущена. Закон — это подпись дуче.', q: { support: -0.1, fear: 0.3, reich: 0.1, cap: 0.5, fac: { liberals: -0.5, new: 0.2 } }, on: { fac: { liberals: { a: -8 } } } } },
  econ: { g: 'econ', name: 'Хозяйственный строй', ask: 'Кто распоряжается заводами?', guard: { r: 'left', n: 'oligarchs' },
    r: { name: 'Рынок и концессии', desc: 'Государственные тресты продаются, иностранный капитал допущен. Растёт всё, включая безработицу.', q: { economy: 0.5, treasury: 2, support: -0.1, usa: 0.3, fac: { oligarchs: 0.5, left: -0.5 } }, on: { treasury: 12 } },
    o: { name: 'Корпоративное государство', desc: 'Двадцать две корпорации делят заказы, цены и зарплаты. Никто не разоряется, и никто не растёт.', q: { fac: { oligarchs: 0.1, left: 0.1 } } },
    n: { name: 'Автаркия и военное хозяйство', desc: 'Всё своё и всё для армии. Кофе из цикория, бензин по карточкам.', q: { economy: -0.4, army: 0.4, support: -0.2, reich: 0.2, usa: -0.3, fac: { hawks: 0.4, oligarchs: -0.3 } }, on: { army: 3 } } },
  labor: { g: 'econ', name: 'Труд', ask: 'Чей голос у рабочего?', guard: { r: 'oligarchs', n: 'left' },
    r: { name: 'Свободные профсоюзы', desc: 'Синдикаты сами выбирают руководство и получают право на стачку.', q: { economy: -0.1, support: 0.3, usa: 0.2, fac: { left: 0.7, oligarchs: -0.5, new: -0.3 } }, on: { fac: { left: { a: 8 } } } },
    o: { name: 'Синдикаты под партией', desc: 'Хартия труда: споры решает трудовой суд, стачка — преступление.', q: {} },
    n: { name: 'Трудовая повинность', desc: 'Рабочие книжки, прикрепление к заводу, трудовые батальоны для уклоняющихся.', q: { economy: 0.3, fear: 0.4, support: -0.4, reich: 0.1, fac: { left: -0.8, oligarchs: 0.3 } }, on: { fac: { left: { a: -8 } } } } },
  south: { g: 'econ', name: 'Юг', ask: 'Что делать с безземельными?', guard: { r: 'liberals', n: 'faith' },
    r: { name: 'Земельная реформа', desc: 'Латифундии делят между батраками. Бароны Сицилии этого не простят.', q: { economy: 0.1, treasury: -2, support: 0.4, fac: { left: 0.4, liberals: -0.4 } }, on: { fac: { left: { a: 6 }, liberals: { a: -8 } } } },
    o: { name: 'Мелиорация и общественные работы', desc: 'Осушение болот, дороги, акведуки. Работа есть, земля остаётся у прежних хозяев.', q: { support: 0.1 } },
    n: { name: 'Переселение в империю', desc: 'Безземельных южан отправляют в Ливию и Эфиопию. Юг пустеет, колонии закипают.', q: { treasury: -1, support: -0.1, iu: 0.5, ic: 0.3, fac: { left: -0.2, new: 0.2 } } } },
  church: { g: 'soc', name: 'Церковь', ask: 'Чья молодёжь и чья проповедь?', guard: { r: 'new', n: 'faith' },
    r: { name: 'Свободная церковь', desc: '«Католическое действие», приходские школы и газеты без надзора префекта.', q: { support: 0.2, fear: -0.1, fac: { faith: 0.7, new: -0.3 } }, on: { fac: { faith: { a: 8 } } } },
    o: { name: 'Латеранские соглашения', desc: 'Конкордат: церковь не лезет в политику, государство — в катехизис.', q: { fac: { faith: 0.1 } } },
    n: { name: 'Культ государства', desc: 'Молодёжные организации только партийные. Проповеди согласуются. Ватикан — иностранное государство.', q: { support: -0.3, reich: 0.2, fac: { faith: -0.9, new: 0.3 } }, on: { fac: { faith: { a: -12 } } } } },
  race: { g: 'soc', name: 'Расовые законы 1938 года', ask: 'Кого государство считает гражданином?', guard: { r: 'new', n: 'faith' },
    r: { name: 'Отменить', desc: 'Законы отменены. Уволенных возвращают на службу, отнятое — владельцам.', q: { economy: 0.1, usa: 0.5, reich: -0.5, fac: { faith: 0.3, liberals: 0.2, new: -0.4 } }, on: { rel: { usa: 8, reich: -8 }, fac: { faith: { a: 5 } }, flag: { itRaceOff: true } } },
    o: { name: 'В силе на бумаге', desc: 'Законы не отменены и почти не исполняются. Никто не знает, надолго ли.', q: {} },
    n: { name: 'По германскому образцу', desc: 'Реестры, конфискации, депортации в Рейх. То, от чего Италия уклонялась тридцать лет.', q: { economy: -0.3, support: -0.4, fear: 0.5, reich: 0.6, usa: -0.8, fac: { faith: -0.8, liberals: -0.5, new: 0.3 } }, on: { support: -4, rel: { usa: -12, reich: 8 }, fac: { faith: { a: -12 }, liberals: { a: -8 } }, flag: { itRace: true } } } },
  press: { g: 'soc', name: 'Печать и культура', ask: 'Что можно напечатать?', guard: { r: 'new', n: 'liberals' },
    r: { name: 'Оттепель', desc: 'Цензура только для прямых выпадов против дуче. Кино, журналы, переводные книги.', q: { support: 0.3, fear: -0.4, usa: 0.2, fac: { liberals: 0.2, new: -0.3 } }, on: { support: 3 } },
    o: { name: 'Министерство народной культуры', desc: 'Ежедневные указания редакциям: о чём писать, о чём молчать, какого размера заголовок.', q: {} },
    n: { name: 'Мобилизация умов', desc: 'Одна газета, одно радио, одно издательство. Слушать чужие станции — преступление.', q: { support: -0.2, fear: 0.4, reich: 0.1, usa: -0.2, fac: { liberals: -0.3, new: 0.2 } } } },
  police: { g: 'soc', name: 'Политическая полиция', ask: 'Что бывает с несогласными?', guard: { r: 'new', n: 'faith' },
    r: { name: 'Суд вместо ссылки', desc: 'Ссыльные возвращаются с островов. Арест — только по решению судьи.', q: { support: 0.2, fear: -0.6, usa: 0.3, coup: 0.005, fac: { liberals: 0.3, left: 0.2, new: -0.3 } }, on: { fear: -6, support: 3 } },
    o: { name: 'Надзор и ссылка', desc: 'Досье на каждого. Для несогласных — острова и глухие деревни Юга.', q: { fear: 0.1 } },
    n: { name: 'Особый трибунал', desc: 'Чрезвычайные суды, лагеря на островах, смертные приговоры за «пораженчество».', q: { support: -0.4, fear: 0.8, reich: 0.2, usa: -0.4, coup: -0.01, fac: { liberals: -0.4, faith: -0.3, left: -0.3 } }, on: { fear: 8, flag: { itTribunal: true } } } },
  colony: { g: 'emp', name: 'Колониальная линия', ask: 'Кто живёт в империи: подданные или граждане?', guard: { r: 'new', n: 'faith' },
    r: { name: 'Ассоциация', desc: 'Гражданство для местной знати, свои суды и советы. Меньше вывоза и меньше стрельбы.', q: { iu: -0.8, iy: -0.2, usa: 0.2, fac: { hawks: -0.2, new: -0.3 } } },
    o: { name: 'Прямое управление', desc: 'Губернаторы, резиденты, колониальные батальоны из аскари.', q: {} },
    n: { name: 'Раздельное проживание', desc: 'Законы о «защите расы» в колониях: отдельные кварталы, принудительные работы, земля — поселенцам.', q: { iu: 0.9, iy: 0.15, usa: -0.3, fac: { new: 0.2, faith: -0.3 } } } },
  army: { g: 'emp', name: 'Армия и милиция', ask: 'У кого оружие?', guard: { r: 'new', n: 'hawks' },
    r: { name: 'Армия вне политики', desc: 'Милиция чернорубашечников распущена. Армия профессиональная и присягает государству.', q: { army: 0.3, treasury: 1, fac: { hawks: 0.5, new: -0.9, liberals: 0.2 }, facS: { new: -0.3 } }, on: { fac: { new: { a: -12, s: -10 }, hawks: { a: 8 } } } },
    o: { name: 'Две армии', desc: 'Королевская армия и партийная милиция следят друг за другом. Обе дороги, и обе нужны.', q: { treasury: -1 } },
    n: { name: 'Политическая армия', desc: 'Легионы милиции входят в армию со своими командирами. Комиссар в каждом полку.', q: { army: -0.2, fear: 0.2, reich: 0.2, coup: -0.005, fac: { hawks: -0.8, new: 0.6 } }, on: { fac: { hawks: { a: -10 } } } } },
};
// Противоречия: сочетания, которые аппарат не может исполнять одновременно. Каждое растит напряжение.
const VIA_CLASH = [
  ['press', 'r', 'police', 'n', 'Свободная печать пишет об особых трибуналах'],
  ['labor', 'r', 'party', 'n', 'Свободные профсоюзы не подчиняются партии-ордену'],
  ['race', 'n', 'church', 'r', 'Церковь с амвона осуждает депортации'],
  ['colony', 'r', 'race', 'n', 'Гражданство для знати колоний при расовых законах в метрополии'],
  ['crown', 'r', 'council', 'n', 'Король вернул себе права, а палата распущена'],
  ['econ', 'r', 'labor', 'n', 'Иностранные концессии не берут рабочих из трудовых батальонов'],
  ['army', 'r', 'party', 'n', 'Партия-орден осталась без собственной милиции'],
  ['council', 'r', 'press', 'n', 'Выборы при одной газете'],
  ['econ', 'n', 'colony', 'r', 'Автаркии нужен вывоз, а ассоциация его сокращает'],
];
// Вехи: первый раз, когда на одной стороне набирается столько линий
const VIA_MILES = {
  r3: ['r', 3, 'Оттепель'], r6: ['r', 6, 'Новый курс'], r9: ['r', 9, 'Переход'],
  n3: ['n', 3, 'Закручивание'], n6: ['n', 6, 'Новый порядок'], n9: ['n', 9, 'Рейх на Тибре'],
  o10: ['o', 10, 'Вечный двадцать второй год'],
};
Object.assign(Game, {
  via() {
    const I = Game.it();
    if (!I.via) I.via = { pos: Object.fromEntries(Object.keys(VIA).map(k => [k, 'o'])), cap: S.regime === 'nipote70' ? 4 : 3, tens: 10, lastAt: {}, onDone: {}, miles: {}, pending: [], steps: 0, referendum: false };
    return I.via;
  },
  viaCount() { const c = { r: 0, o: 0, n: 0 }; for (const k of Object.keys(VIA)) c[Game.via().pos[k]]++; return c; },
  viaGroupCount(g) { const c = { r: 0, o: 0, n: 0 }; for (const k of Object.keys(VIA)) if (VIA[k].g === g) c[Game.via().pos[k]]++; return c; },
  viaClashes() { const P = Game.via().pos; return VIA_CLASH.filter(([a, pa, b, pb]) => P[a] === pa && P[b] === pb); },
  // Сумма квартальных эффектов всех линий (уже с VIA_K) и курса
  viaSum() {
    const P = Game.via().pos, out = { economy: 0, support: 0, fear: 0, army: 0, treasury: 0, reich: 0, usa: 0, iu: 0, ic: 0, iy: 1, cap: 0, coup: 0, fac: {}, facS: {} };
    const add = (q, K, KW) => {
      for (const [k, v] of Object.entries(q)) {
        if (k === 'fac' || k === 'facS') { for (const [f, d] of Object.entries(v)) out[k][f] = (out[k][f] || 0) + d * K; }
        else if (k === 'treasury' || k === 'coup' || k === 'cap') out[k] += v;
        else if (k === 'iy') out.iy += v;
        else if (k === 'reich' || k === 'usa') out[k] += v * KW;
        else out[k] += v * (k === 'support' && K !== 1 ? VIA_KS : K);
      }
    };
    for (const k of Object.keys(VIA)) add(VIA[k][P[k]].q, VIA_K, VIA_CW);
    add(Game.viaDoctrine().q, 1, 1);
    return out;
  },
  viaDoctrine() {
    const c = Game.viaCount(), P = Game.via().pos, ge = Game.viaGroupCount('econ'), gs = Game.viaGroupCount('state'), gc = Game.viaGroupCount('soc');
    if (c.n >= 9) return { key: 'tiber', side: 'n', name: 'Рейх на Тибре', desc: 'От итальянского фашизма остались язык и флаг. Законы, суды и лагеря устроены по берлинскому образцу. Берлин доволен; больше не доволен никто.', q: { reich: 0.5, usa: -0.5, fear: 0.3, support: -0.2 } };
    if (c.r >= 9) return { key: 'demont', side: 'r', name: 'Демонтаж режима', desc: 'Фашизм отменяют его же декретами: по одному, без объявлений. Страна дышит свободнее. Старая гвардия считает дни и патроны.', q: { support: 0.15, usa: 0.4, reich: -0.4, coup: 0.01 } };
    if (P.crown === 'n' && P.labor === 'r' && P.south === 'r') return { key: 'social', side: 'x', name: 'Социальная республика', desc: 'Без короля, с землёй для батраков и стачкой для рабочих. Левый фашизм двадцатых годов, которому тогда не дали состояться. Двор и бароны — враги навсегда.', q: { support: 0.3, fac: { left: 0.4, liberals: -0.4 } } };
    if (ge.r >= 2 && gs.n + gc.n >= 3) return { key: 'modern', side: 'x', name: 'Авторитарная модернизация', desc: 'Свободный рынок и несвободный человек. Заводы растут, газеты молчат. Инвесторам нравится порядок, пока он не касается их самих.', q: { economy: 0.3, support: -0.2 } };
    if (c.n >= 6) return { key: 'hard', side: 'n', name: 'Жёсткий курс', desc: 'Партия возвращает себе страну. Чёрных рубашек на улицах больше, разговоров в кафе меньше. В Берлине вас впервые называют «надёжным».', q: { reich: 0.3, usa: -0.3, fear: 0.2 } };
    if (c.r >= 6) return { key: 'reform', side: 'r', name: 'Реформаторский фашизм', desc: 'Режим тот же, но с открытыми окнами. Иерархи ворчат, двор и церковь осторожно одобряют, Вашингтон присматривается.', q: { support: 0.1, usa: 0.2, reich: -0.2 } };
    if (c.o >= 10 && S.turn >= 8) return { key: 'ortho', side: 'o', name: 'Ортодоксальный фашизм', desc: 'Всё, как завещано. Корпорации, диархия, конкордат, парады. Ничего не ломается, и ничего не растёт.', q: { economy: -0.2, support: -0.1, coup: -0.01 } };
    if (c.r >= 3 && c.n >= 3) return { key: 'eclectic', side: 'x', name: 'Эклектика', desc: 'Уступки в одном и зажим в другом. Никто не понимает, куда идёт страна. Возможно, вы тоже.', q: {} };
    return { key: 'legacy', side: 'o', name: 'Наследство Чиано', desc: 'Вы почти ничего не тронули. Страна живёт по инерции прежнего дуче и ждёт, каким окажется новый. Если ничего не менять два года, инерция станет курсом: ортодоксией.', q: {} };
  },
  viaCoherent() { const c = Game.viaCount(); return Math.max(c.r, c.o, c.n) >= 8; },
  viaCapGain() {
    const P = (S.pillars || []).filter(f => S.fac[f]);
    return 1 + (S.support >= 55 ? 0.5 : 0) + (P.length && P.every(f => S.fac[f].a >= 55) ? 0.5 : 0) + (Game.viaCoherent() ? 0.5 : 0) + Game.viaSum().cap + (S.diff === 'easy' ? 0.5 : 0);
  },
  viaCost(key, to) {
    const D = VIA[key];
    let c = to === 'o' ? 1 : 2;
    if (S.regime === 'nipote70' && to === 'r') c--;
    if (S.regime === 'gerarca70' && to === 'n') c--;
    return Math.max(1, c);
  },
  viaTensGain(key, to) {
    const D = VIA[key], g = to === 'o' ? null : D.guard[to], F = g && S.fac[g];
    let t = to === 'o' ? 6 : 12;
    if (F && F.s >= 40 && F.a < 50) t += 6;
    if (S.regime === 'eroe70') t *= 0.7;
    if (S.diff === 'hard') t *= 1.2;
    return Math.round(t);
  },
  // Можно ли сдвинуть линию на соседнее положение; возвращает причину отказа или ''
  viaWhy(key, to) {
    const V = Game.via(), cur = V.pos[key];
    if (Math.abs(VIA_POS.indexOf(cur) - VIA_POS.indexOf(to)) !== 1) return 'только на соседнее положение';
    if (V.lastAt[key] !== undefined && S.turn - V.lastAt[key] < 3) return `линию меняли недавно, ещё ${3 - (S.turn - V.lastAt[key])} кв.`;
    if (V.tens >= 80) return 'аппарат саботирует: напряжение 80 и выше';
    if (V.cap < Game.viaCost(key, to)) return 'не хватает политического веса';
    if (Game.itcw().vassal && to === 'r' && cur === 'o') return 'уполномоченный Рейха не визирует';
    return '';
  },
  viaStep(key, to) {
    const V = Game.via(), D = VIA[key];
    if (!D || !D[to] || Game.viaWhy(key, to) || !Game.spend()) return null;
    const from = V.pos[key], cost = Game.viaCost(key, to), tg = Game.viaTensGain(key, to);
    V.cap -= cost; V.tens = clamp(V.tens + tg); V.lastAt[key] = S.turn; V.pos[key] = to; V.steps++;
    const g = to === 'o' ? null : D.guard[to];
    let fx = g && S.fac[g] ? { fac: { [g]: { a: -5 } } } : {};
    if (D[to].on && !V.onDone[key + to]) { fx = Game.mergeFxD(fx, D[to].on); V.onDone[key + to] = true; }
    const changes = Game.apply(fx);
    const text = `${D.name}: «${D[from].name}» → «${D[to].name}».`;
    Game.log(`Итальянский путь. ${text}`);
    Game.viaCheckMiles();
    return { text: `${text} Политический вес −${cost}, напряжение +${tg}.`, changes };
  },
  viaCheckMiles() {
    const V = Game.via(), c = Game.viaCount();
    for (const [id, [side, n]] of Object.entries(VIA_MILES)) if (!V.miles[id] && c[side] >= n && (id !== 'o10' || S.turn >= 12)) { V.miles[id] = S.turn; V.pending.push(id); }
  },
  viaQuarter(rep) {
    const V = Game.via(), q = Game.viaSum(), cl = Game.viaClashes();
    for (const k of ['economy', 'support', 'fear', 'army']) S[k] = clamp(S[k] + q[k]);
    for (const [f, d] of Object.entries(q.fac)) if (S.fac[f]) S.fac[f].a = clamp(S.fac[f].a + d);
    for (const [f, d] of Object.entries(q.facS)) if (S.fac[f]) S.fac[f].s = clamp(S.fac[f].s + d);
    V.cap = Math.min(12, V.cap + Game.viaCapGain());
    V.tens = clamp(V.tens - 5 + cl.length * 1.5);
    Game.viaCheckMiles();
    if (cl.length) rep.lines.push(`Итальянский путь: противоречий в курсе — ${cl.length}. Аппарат не понимает, что исполнять.`);
    if (V.tens >= 60) rep.warn.push(`Итальянский путь: напряжение ${Math.round(V.tens)}. Перемены идут быстрее, чем страна успевает к ним привыкнуть. Растёт риск переворота.`);
  },
  viaMileScene() {
    const V = Game.via();
    if (!V.pending.length) return null;
    const id = V.pending.shift();
    const one = (title, bg, lines, text, fx, res) => ({ title, bg, lines, choices: [{ text, fx, res }], after: () => null });
    switch (id) {
      case 'r3': return one('Оттепель', 'street', [
        ['narrator', 'В Риме впервые за тридцать лет продают швейцарские газеты. В кафе на виа Венето спорят вслух, и за соседним столиком никто не записывает.'],
        ['police', 'Люди проверяют, насколько далеко можно зайти, {addr}. Пока проверяют вежливо.']],
        'Пусть проверяют', { support: 4, fear: -4, fac: { new: { a: -5 } }, itCw: { usa: 4 } }, 'Через месяц в киосках появился первый журнал, который никто не согласовывал. Его раскупили за утро.');
      case 'r6': return { title: 'Письмо сорока', bg: 'palace', lines: [
        ['npc:federale', 'Сорок федералов из девяноста подписали письмо, {addr}. В нём одна фраза по существу: «Дуче ведёт партию к самоликвидации».'],
        ['police', 'Они не заговорщики. Заговорщики писем не пишут. Но остальные пятьдесят ждут, что вы ответите.']],
        choices: [
          { text: 'Принять отставку подписавших', fx: { fac: { new: { a: -10, s: -8 }, liberals: { a: 5 } }, itCap: 2, itTens: 10 }, res: 'Сорок кресел освободились за один день. На них сели люди, которые обязаны должностью вам, а не Походу на Рим.' },
          { text: 'Ответить, что реформа — это повзрослевший фашизм', adv: ['propaganda'], fx: { support: -2, fac: { new: { a: 7 } } }, res: 'Речь перепечатали все газеты. Федералы прочли её дважды и решили подождать.' },
        ], after: () => null };
      case 'r9': return { title: 'Закон о партиях', bg: 'palace', lines: [
        ['narrator', 'Палата обсуждает закон о политических объединениях. Слово «фашизм» в проекте встречается один раз: в статье об отмене прежних законов.'],
        ['npc:senator', 'Король спрашивает, намерены ли вы спросить народ. Референдум о государственном устройстве можно назначить на последний год вашего срока.'],
        ['police', 'Если вы его назначите, обратной дороги не будет. Старая гвардия это понимает не хуже вас.']],
        choices: [
          { text: 'Назначить референдум', fx: { support: 8, fear: -5, rel: { usa: 10, reich: -10 }, fac: { new: { a: -20 }, liberals: { a: 10 }, faith: { a: 6 }, left: { a: 8 } }, itCw: { usa: 8, reich: -8 }, itRef: true }, res: 'Указ напечатан на первой полосе. Дата — декабрь семьдесят девятого. До неё нужно дожить.' },
          { text: 'Остановиться на достигнутом', fx: { support: -3, fac: { liberals: { a: -6 }, new: { a: 6 } } }, res: 'Закон о партиях отложен «для доработки». Все поняли, что это значит: дальше дуче не пойдёт.' },
        ], after: () => null };
      case 'n3': return one('Закручивание', 'office', [
        ['narrator', 'В министерствах появились люди в чёрной форме с правом подписи. Чиновники заново учатся римскому приветствию: в последние годы многие отвыкли.'],
        ['economy', 'Бумаги теперь идут вдвое дольше, {addr}. Каждую визирует партийный уполномоченный. Некоторые он читает.']],
        'Так и должно быть', { fear: 5, fac: { new: { a: 6 }, liberals: { a: -4 } }, itCw: { reich: 4, usa: -4 } }, 'Двор отменил весенний приём «по случаю траура». Траур кончился три месяца назад.');
      case 'n6': return { title: 'Обмен опытом', bg: 'office', lines: [
        ['npc:reich_amb', 'Берлин с удовлетворением следит за новым курсом Рима. Рейх готов прислать шесть советников: полиция, печать, трудовая служба. Исключительно для обмена опытом.'],
        ['foreign', 'Советники приезжают с чемоданами и остаются с кабинетами, {addr}.']],
        choices: [
          { text: 'Принять советников', fx: { fear: 4, rel: { reich: 8 }, fac: { new: { a: 6 }, liberals: { a: -8 }, faith: { a: -6 }, hawks: { a: -5 } }, itCw: { reich: 12, usa: -6 } }, res: 'Шесть человек в штатском заняли шесть кабинетов. Через месяц их стало двадцать. Работают они хорошо. В этом и беда.' },
          { text: 'Поблагодарить и отказаться', fx: { rel: { reich: -6 }, fac: { hawks: { a: 4 }, liberals: { a: 3 } }, itCw: { reich: -4 } }, res: 'Посол сказал, что понимает итальянскую гордость. Слово «гордость» он произнёс как диагноз.' },
        ], after: () => null };
      case 'n9': return one('Рейх на Тибре', 'night', [
        ['narrator', 'Ватикан закрыл бронзовые врата. Король подписывает декреты не читая. В Риме по-прежнему говорят по-итальянски, но законы переведены с немецкого.'],
        ['police', 'Порядок образцовый, {addr}. Так пишет берлинская печать. Наша пишет то же самое, теми же словами.']],
        'Продолжать', { support: -6, fear: 8, fac: { faith: { a: -15 }, liberals: { a: -10 } }, rel: { usa: -12 }, itCw: { reich: 10, usa: -15 } }, 'С соседнего холма в палаццо Венеция больше не приходит никто. Приходят только из посольства Рейха.');
      default: return one('Вечный двадцать второй год', 'square', [
        ['narrator', 'Годовщина Похода на Рим. Те же трибуны, те же речи, те же песни. Ветераны маршируют всё медленнее; молодые смотрят на часы.'],
        ['propaganda', 'Всё прошло по сценарию, {addr}. По сценарию тридцать шестого года: другого у нас нет.']],
        'Принять парад', { economy: -2, support: -2, fac: { new: { a: 6 }, faith: { a: 3 }, oligarchs: { a: -3 } } }, 'Парад кончился вовремя. Ничего не случилось. В этом и состоит ортодоксия.');
    }
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isItal()) return;
  Game.eraLook();
  Game.via(); Game.imp(); Game.itcw(); Game.fuhrerKey();
  S.fac.new = S.fac.new || { s: 42, a: 40, st: 'legal' };
  Object.assign(S.fac.new, { s: 42, a: S.regime === 'gerarca70' ? 62 : S.regime === 'eroe70' ? 34 : 32 });
  S.fac.left.s = 30; S.fac.liberals.s = 34; S.fac.faith.s = 40; S.fac.hawks.s = 40; S.fac.oligarchs.s = 36;
  S.fear = Math.max(S.fear, 45); S.support = Math.max(S.support, 44); S.economy = 46;
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isItal()) return;
  const add = (d, label, icon) => { if (Math.round(d)) ch.push({ k: 'fs', d: Math.round(d), label, icon }); };
  if (fx.itCw) { const C = Game.itcw(); for (const [k, d] of Object.entries(fx.itCw)) { const b = C[k]; C[k] = clamp(C[k] + d); add(C[k] - b, { reich: 'Влияние Рейха', usa: 'Влияние США', latin: 'Латинский блок' }[k], { reich: '🦅', usa: '🗽', latin: '🤝' }[k]); } }
  if (fx.itBloc) { Game.itcw().bloc = true; ch.push({ k: 'fs', d: 1, label: 'Латинский пакт подписан', icon: '🤝' }); }
  if (fx.itVassal) Game.itcw().vassal = true;
  if (fx.itRef) Game.via().referendum = true;
  if (fx.impSet) { const [k, d] = fx.impSet, T = Game.imp()[k]; if (T) { if (d.ctrl) T.ctrl = clamp(T.ctrl + d.ctrl); if (d.unrest) T.unrest = clamp(T.unrest + d.unrest); if (d.auto !== undefined) T.auto = !!d.auto; if (d.share) T.share = clamp(T.share + d.share, 0.3, 0.7); if (d.left) { T.left = true; T.ctrl = 0; } add(d.ctrl || 0, `Контроль: ${IMP[k].name}`, '🗺️'); add(-(d.unrest || 0), `Спокойствие: ${IMP[k].name}`, '🕊️'); } }
  if (fx.impAll) for (const k of Object.keys(IMP)) if (Game.impHeld(k)) Game.imp()[k].ctrl = clamp(Game.imp()[k].ctrl + fx.impAll);
  if (fx.itCap) { const V = Game.via(); V.cap = clamp(V.cap + fx.itCap, 0, 12); add(fx.itCap, 'Политический вес', '⚖️'); }
  if (fx.itTens) { const V = Game.via(); const b = V.tens; V.tens = clamp(V.tens + fx.itTens); add(-(V.tens - b), 'Спокойствие аппарата', '🧭'); }
});
Game.previewHooks.push((fx, out) => {
  if (!isItal()) return;
  const first = [];
  if (fx.itCw) for (const [k, d] of Object.entries(fx.itCw)) first.push({ icon: { reich: '🦅', usa: '🗽', latin: '🤝' }[k], d: k === 'latin' ? d : 0, label: k, text: `${{ reich: 'влияние Рейха', usa: 'влияние США', latin: 'латинский блок' }[k]} ${sign(d)}` });
  if (fx.itBloc) first.push({ icon: '🤝', d: 1, label: 'Латинский пакт', text: 'Латинский пакт' });
  if (fx.itVassal) first.push({ icon: '🦅', d: -1, label: 'Опека Берлина', text: 'опека Берлина' });
  if (fx.itRef) first.push({ icon: '🗳️', d: 1, label: 'Референдум', text: 'референдум в 1979 году' });
  if (fx.impSet) { const [, d] = fx.impSet; if (d.ctrl) first.push({ icon: '🗺️', d: d.ctrl, label: 'Контроль', text: `контроль ${sign(d.ctrl)}` }); if (d.unrest) first.push({ icon: '🔥', d: -d.unrest, label: 'Волнения', text: `волнения ${sign(d.unrest)}` }); if (d.auto) first.push({ icon: '📜', d: 1, label: 'Автономия', text: 'автономия' }); if (d.share) first.push({ icon: '⚓', d: d.share, label: 'Доля сборов', text: `доля сборов ${d.share > 0 ? '+' : '−'}${Math.round(Math.abs(d.share) * 100)}%` }); if (d.left) first.push({ icon: '🚪', d: -1, label: 'Уход', text: 'владение потеряно' }); }
  if (fx.impAll) first.push({ icon: '🗺️', d: fx.impAll, label: 'Контроль над владениями', text: `контроль над владениями ${sign(fx.impAll)}` });
  if (fx.itCap) first.push({ icon: '⚖️', d: fx.itCap, label: 'Политический вес', text: `политический вес ${sign(fx.itCap)}` });
  if (fx.itTens) first.push({ icon: '🧭', d: -fx.itTens, label: 'Напряжение', text: `напряжение ${sign(fx.itTens)}` });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => {
  if (!isItal()) return;
  Game.viaQuarter(rep); Game.impQuarter(rep); Game.itcwQuarter(rep);
  rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l));
});
Game.incomeHooks.push(() => (isItal() ? { label: 'Доходы империи', v: Game.impIncome() } : null));
Game.incomeHooks.push(() => (isItal() && Game.impUpkeep() ? { label: 'Гарнизоны империи', v: -Game.impUpkeep() } : null));
for (const i of [0, 1, 2]) Game.incomeHooks.push(() => (isItal() ? Game.itcwAid()[i] || null : null));
Game.incomeHooks.push(() => { if (!isItal()) return null; const t = Game.viaSum().treasury; return t ? { label: 'Итальянский путь: линии курса', v: t } : null; });
// Напряжение и сами линии курса сдвигают риск переворота
const IT_HARD = 1; // собственных источников риска у Италии хватает: двор, напряжение, линии курса
Game.coupHooks.push(() => {
  if (!isItal()) return 0;
  const V = Game.via(), L = S.fac.liberals;
  const king = V.pos.crown !== 'n' && L.a < 30 ? L.s / 100 * (30 - L.a) / 100 * 0.8 : 0; // пока корона на месте, недовольный двор может отправить дуче в отставку
  const freed = Game.itcw().bloc && (S.rel.reich || 50) < 20 ? -0.05 : 0; // в латинском блоке ссора с Берлином уже не повод для путча
  return Game.viaSum().coup + Math.max(0, V.tens - 40) / 500 + king + freed;
});
const _coupRiskI = Game.coupRisk, _revRiskI = Game.revRisk;
Game.coupRisk = function () { return isItal() ? clamp(_coupRiskI.call(Game) * IT_HARD, 0, 0.5) : _coupRiskI.call(Game); };
Game.revRisk = function () { return isItal() ? clamp(_revRiskI.call(Game) * IT_HARD, 0, 0.5) : _revRiskI.call(Game); };
Game.forcedList.push(() => (isItal() && !S.over ? Game.viaMileScene() : null));
Game.forcedList.push(() => (isItal() && !S.over ? Game.itcwCrisis() : null));
const _blocI = Game.bloc;
Game.bloc = function () { return isItal() ? Game.itcwStatus() : _blocI.call(Game); };

// ---------- сцены ----------
const _introI = Game.introScene;
Game.introScene = function () {
  if (!isItal()) return _introI ? _introI.call(Game) : null;
  const why = {
    nipote70: 'Совету был нужен человек, против которого никто не успел собрать голоса. Вы двенадцать лет вели личную канцелярию дяди. Вашу фамилию страна знает; вас — нет.',
    eroe70: 'Совету был нужен человек, которому подчинится армия и которого не посмеет тронуть милиция. Маршал, взявший Александрию, устроил всех: как временная фигура.',
    gerarca70: 'Совету был нужен человек, у которого уже есть ключи от партии. Девяносто федералов обязаны вам должностями. Двадцать восемь членов совета это помнили.',
  }[S.regime];
  return {
    title: 'Пьяцца Венеция', bg: 'square',
    lines: [
      ['narrator', 'Рим, 6 января 1970 года, праздник Богоявления. В 11:40 под трибуной на пьяцца Венеция взорвалась бомба. Дуче Чиано умер по дороге в госпиталь. С ним погибли одиннадцать человек.'],
      ['police', 'Исполнителя взяли живым, {addr}. Двадцать шесть лет, студент из Болоньи, в кармане партийный билет. Кто его послал, мы не знаем. Версий четыре, и каждая кому-нибудь выгодна.'],
      ['narrator', `В три часа дня в палаццо Венеция собрался Большой фашистский совет. В шесть король утвердил его решение. ${why}`],
      ['defense', 'Армия присягала королю. Король утвердил вас. Пока этого достаточно.'],
      ['foreign', 'Берлин прислал соболезнования и вопрос: остаётся ли Италия в оси. Вашингтон прислал только соболезнования. Это тоже вопрос.'],
      ['economy', 'Чиано оставил страну, которая живёт на ливийской нефти, германском угле и привычке. Надолго не хватит ни первого, ни второго, ни третьего.'],
      ['propaganda', 'Завтра газеты выйдут с вашим портретом. Что написать под ним, «продолжатель» или что-то другое, решать вам. Страна ждёт, каким будет ваш путь.'],
    ],
    choices: [{ text: 'Принести присягу', fx: {}, res: `Вы — Дуче. Впереди десять лет: до ${Game.endYear()} года нужно удержать власть и решить, какой будет Италия.` }],
    after: () => null,
  };
};
const _coupI = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupI.call(Game, role);
  if (!isItal()) return sc;
  const court = S.fac.liberals.a < 35 && Game.via().pos.crown !== 'n', party = S.fac.new && S.fac.new.a < 35;
  sc.title = court ? 'Двадцать пятое июля' : party ? 'Ночь чёрных рубашек' : 'Генералы в Квиринале';
  sc.lines = [
    ['narrator', court ? 'Большой совет заседал до трёх часов ночи и проголосовал: девятнадцать против семи. Утром король ждёт вас на вилле Савойя. У ворот стоит санитарная машина без санитаров.'
      : party ? 'Три часа ночи. Легионы милиции заняли радио и вокзал Термини. Телефонная станция не отвечает.' : 'Три часа ночи. Танки дивизии «Ариете» на виа дель Корсо. Караул у палаццо Венеция сменён без вашего приказа.'],
    ['npc:colonel', court ? 'Именем его величества. Прошу следовать за мной, это ради вашей безопасности.' : 'Именем Италии. Вы отстранены. Сдайте оружие.'],
  ];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Выступить по радио'; c0.win.res = 'Вас услышали. Части, не знавшие, кому верить, остались в казармах. К утру всё кончилось.'; c0.lose.res = 'Передатчик отключили на второй фразе.';
  c1.win.res = 'Батальон охраны отбил здание. К утру всё кончено.'; c1.lose.res = 'Охрана сложила оружие, не сделав ни выстрела.';
  if (c2) { if (c2.win) c2.win.res = 'Через час командирам колонн позвонили из посольства. Колонны остановились. Счёт за этот звонок пришлют позже.'; if (c2.lose) c2.lose.res = 'В посольстве ответили, что это внутреннее дело Италии.'; }
  if (c3) { c3.text = 'Улететь в Мадрид'; c3.res = 'Самолёт взлетел с Чампино до рассвета.'; }
  return sc;
};
const _revI = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revI.call(Game);
  if (!isItal()) return sc;
  sc.title = 'Всеобщая стачка';
  sc.lines = [
    ['narrator', 'В понедельник встал Турин. Во вторник — Милан и Генуя. В среду на пьяцца Венеция стоят двести тысяч человек, и никто не кричит. Они просто стоят под вашим балконом.'],
    ['npc:rebel', 'Сорок восемь лет. Хватит.'],
    ['defense', 'Части ждут приказа, {addr}. Но в оцеплении стоят сыновья тех, кто на площади.'],
  ];
  if (sc.choices[2]) { sc.choices[2].text = 'Улететь в Мадрид'; sc.choices[2].res = 'Самолёт взлетел, когда толпа вошла во двор палаццо Венеция.'; }
  return sc;
};
const ULT_I = {
  hawks: ['Армии нужны деньги и ясность, дуче. Повысьте жалованье офицерам и уберите комиссаров милиции из гарнизонов. Иначе армия вспомнит, кому она присягала.', 'Генералы перестали отвечать на звонки из палаццо Венеция. Зато их видели в Квиринале.'],
  oligarchs: ['Снизьте налоги и уберите партийных уполномоченных с заводов. Иначе производство встанет «по техническим причинам».', 'За неделю встали три завода — «по техническим причинам». Деньги промышленников уходят в Лугано.'],
  left: ['Зарплата, жильё и конец ночным арестам на заводах. Или завтра встанет Турин.', 'Турин встал. За ним Милан. Секретари синдикатов разводят руками: рабочие «устали».'],
  liberals: ['Его величество обеспокоен. Он просит вернуть сенату право обсуждать бюджет и удалить из правительства двух известных вам лиц. Это просьба. Пока просьба.', 'Король перестал подписывать декреты в день подачи. Теперь он их читает. Сенаторы открыто ездят в Квиринал.'],
  faith: ['Святой престол просит оградить приходы и «Католическое действие» от надзора префектов. Иначе с амвонов прозвучит то, что до сих пор говорилось в ризницах.', 'В воскресенье во всех приходах прочли одно и то же послание. Вашего имени в нём нет. Все поняли, о ком речь.'],
  new: ['Партия требует подтвердить её права: свои суды, свои легионы, свои люди в префектурах. Иначе милиция сочтёт себя свободной от присяги дуче.', 'Легионы милиции выведены из казарм «на учения». Учения идут в четырёх кварталах от палаццо Венеция.'],
};
const _facUltI = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltI.call(Game, f);
  if (!isItal()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_I[f] || ULT_I.new;
  sc.lines = [['narrator', `${name} явился в палаццо Венеция без вызова. Караул его пропустил.`], [sp, ask], ['police', 'Если откажете, они ударят по самому больному, {addr}. Если уступите, остальные решат, что на дуче можно давить.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} уходит с тем, за чем пришёл. Остальные внимательно смотрят, чем это кончится.`;
  c1.text = 'Откупиться с личного счёта'; c1.res = 'Конверт был толстым. Требование отложено — до следующего раза.';
  c2.win.res = 'Его взяли у выхода. Те, кто стоял за ним, затихли.'; c2.lose.res = 'Арест сделал из него знамя. Его фамилию пишут мелом на стенах цехов и казарм.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayI = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayI.call(Game, role);
  if (!isItal()) return sc;
  const A = S.adv[role];
  sc.title = 'Измена в правительстве';
  sc.lines = [['narrator', `${A.name} перешёл к вашим противникам и унёс с собой всё, что знал.`], ['narrator', 'Его место займёт родственник. Больше доверять некому.']];
  sc.choices[0].text = 'Принять к сведению'; sc.choices[0].res = 'Замки сменены, шифры тоже. То, что он знал, уже не вернуть.';
  return sc;
};

// ---------- распоряжения ----------
const decI = (cat, d) => DECREES[cat].push({ eras: [DARK_I], ok: () => true, ...d });
decI('foreign', { id: 'i_axis', name: 'Совещание держав оси в Риме', desc: 'Берлин, Мадрид и Токио приезжают подтвердить союз. Дорого, зато принимающая сторона — вы.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, rel: { reich: Math.round(6 * m), spain: Math.round(6 * m), japan: Math.round(3 * m) } }, text: 'Совещание прошло. Коммюнике подтверждает нерушимость оси. В кулуарах говорили о другом.' }) });
decI('foreign', { id: 'i_grain', name: 'Зерновой контракт с американцами', desc: 'Через португальских посредников. Хлеб дешевле германского. Берлин заметит.', cost: '−6 млн', ok: S => S.treasury >= 6, repeat: true,
  run: (S, m) => ({ fx: { treasury: -6, support: Math.round(3 * m), rel: { usa: Math.round(6 * m), reich: -3 }, itCw: { usa: 3 } }, text: 'Пароходы пришли в Геную под португальским флагом. Мешки перешили в порту.' }) });
decI('foreign', { id: 'i_fleet', name: 'Поход флота в Барселону', desc: 'Визит эскадры к испанским берегам. Мадрид польщён, адмиралы довольны.', cost: '−7 млн', ok: S => S.treasury >= 7, repeat: true,
  run: (S, m) => ({ fx: { treasury: -7, rel: { spain: Math.round(8 * m) }, fac: { hawks: { a: Math.round(4 * m) } }, itCw: { latin: 5 } }, text: 'Эскадра простояла в Барселоне неделю. Каудильо поднялся на борт флагмана.' }) });
decI('social', { id: 'i_bread', name: 'Твёрдые цены на хлеб и макароны', desc: 'Казна доплачивает пекарям. В очередях перестают ругать правительство вслух.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, support: Math.round(6 * m), fac: { left: { a: Math.round(6 * m) } } }, text: 'Цены заморожены. Хлеб стал хуже, но его хватает.' }) });
decI('social', { id: 'i_amnesty', name: 'Амнистия ссыльным', desc: 'Вернуть людей с островов к годовщине. Двор и церковь оценят. Партия спросит, кого вы боитесь меньше.', cost: '', once: true,
  run: () => ({ fx: { fear: -7, support: 4, fac: { liberals: { a: 8 }, faith: { a: 6 }, left: { a: 5 }, new: { a: -10 } }, rel: { usa: 5 } }, text: 'Пароходы с Липарских островов пришли в Неаполь без оркестра. На пристани стояли жёны.' }) });
decI('social', { id: 'i_curfew', name: 'Особое положение в Риме', desc: 'Патрули милиции, пропуска, ночные проверки. Тихо и страшно.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { fear: Math.round(9 * m), support: -4, fac: { liberals: { a: -6 }, new: { a: 5 }, faith: { a: -3 } } }, text: 'После десяти вечера на улицах только патрули в чёрных фесках.' }) });
decI('social', { id: 'i_houses', name: 'Народные дома в рабочих кварталах', desc: 'Жильё вместо бараков у заводов. Дорого и долго.', cost: '−16 млн', ok: S => S.treasury >= 16, once: true,
  run: () => ({ fx: { treasury: -16, support: 5, economy: 2, fac: { left: { a: 10 } } }, text: 'Заложены первые кварталы в Турине и Милане. Синдикаты записали это на ваш счёт.' }) });
decI('economy', { id: 'i_oil', name: 'Новые скважины в Ливии', desc: 'Бурить глубже и дальше в пустыню. Нефть — то, на чём стоит бюджет.', cost: '−18 млн', ok: S => S.treasury >= 18 && Game.impHeld('lib'), once: true,
  run: () => ({ fx: { treasury: -18, economy: 5, fac: { oligarchs: { a: 8 } }, impSet: ['lib', { unrest: 4 }] }, text: 'Вышки поставили за год. Трубопровод идёт к морю через земли, с которых выселили три племени.' }) });
decI('economy', { id: 'i_orders', name: 'Заказы верфям', desc: 'Крейсера, которые некому показывать, зато верфи загружены, а адмиралы благодарны.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, economy: Math.round(2 * m), army: Math.round(2 * m), fac: { oligarchs: { a: Math.round(7 * m) }, hawks: { a: Math.round(5 * m) } } }, text: 'Заказы размещены. Генуя и Специя работают в три смены.' }) });
decI('economy', { id: 'i_levy', name: 'Чрезвычайный сбор с владений', desc: 'Больше вывоза из колоний. Там станет хуже, чем было.', cost: '', ok: () => Game.impCount() > 0, repeat: true,
  run: (S, m) => ({ fx: { treasury: Math.round(12 * m), impAll: -3, rel: { usa: -3 }, fac: { faith: { a: -3 } }, impSet: [Game.impHot(), { unrest: 8 }] }, text: 'Сбор проведён. Губернаторы докладывают о выполнении и просят подкреплений.' }) });
DEMANDS.push(
  { id: 'i_coal', countries: ['reich'], eras: [DARK_I], text: () => 'Отправить сто тысяч рабочих на заводы Рейха', fx: () => ({ support: -3, rel: { reich: 12 }, fac: { left: { a: -6 } }, itCw: { reich: 4 } }) },
  { id: 'i_list', countries: ['usa'], eras: [DARK_I], text: () => 'Выпустить ссыльных с островов', fx: () => ({ fear: -4, rel: { usa: 14 }, fac: { new: { a: -6 }, liberals: { a: 4 } }, itCw: { usa: 4 } }) },
  { id: 'i_wolfram', countries: ['spain'], eras: [DARK_I], text: () => 'Кредит на испанский флот', fx: () => ({ treasury: -8, rel: { spain: 14 }, itCw: { latin: 6 } }) },
  { id: 'i_trade', countries: ['japan'], eras: [DARK_I], text: () => 'Открыть порты Восточной Африки для японских судов', fx: () => ({ economy: 1, rel: { japan: 12, reich: -3 } }) },
);
FAC_DEMANDS.faith.push({ id: 'it_schools', kind: 'pay', text: 'Вернуть приходам начальные школы', fx: { treasury: -6, fac: { new: { a: -5 } } }, only: [ITAL] });
FAC_DEMANDS.hawks.push({ id: 'it_militia', kind: 'pay', text: 'Запретить милиции вербовку в армейских частях', fx: { fac: { new: { a: -8 } } }, only: [ITAL] });
FAC_DEMANDS.oligarchs.push({ id: 'it_ord', kind: 'act', acts: ['dec:i_orders'], text: 'Разместить заказы на верфях', only: [ITAL] });
FAC_DEMANDS.liberals.push({ id: 'it_senate', kind: 'pay', text: 'Назначить в сенат людей двора', fx: { fac: { new: { a: -6 } }, itCap: -1 }, only: [ITAL] });
FAC_DEMANDS.left.push({ id: 'it_wage', kind: 'pay', text: 'Повысить тарифные ставки на заводах', fx: { treasury: -8, fac: { oligarchs: { a: -5 } } }, only: [ITAL] });

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isItal()) return;
  const V = Game.via(), C = Game.itcw(), D = Game.viaDoctrine(), c = Game.viaCount(), held = Game.impCount();
  const T = {
    alarich: ['Операция «Аларих»', 'Германские дивизии вошли в Рим на четвёртый день. Король уехал на юг и оттуда объявил, что ничего не подписывал. Вас вывезли в Баварию, в санаторий с решётками на окнах первого этажа. Италией правит имперский комиссар; на картах Рейха она обозначена как «оперативная зона». Газеты выходят на двух языках.'],
    exile: ['Бегство', 'Вы живёте в Мадриде под чужой фамилией. Испанцы не выдают вас, пока это им выгодно. Из окна виден двор и стена.'],
    helicopter: ['Бегство', 'Вы живёте в Мадриде под чужой фамилией. Испанцы не выдают вас, пока это им выгодно.'],
    coup: [S.fac.liberals.a < 35 && V.pos.crown !== 'n' ? 'Двадцать пятое июля' : 'Свергнут', S.fac.liberals.a < 35 && V.pos.crown !== 'n'
      ? 'Король принял вас на двадцать минут. Он говорил тихо и вежливо: страна устала, совет проголосовал, преемник уже назначен. У ворот ждала санитарная машина. Вас возили с острова на остров, пока не решили, что вы больше никому не нужны.'
      : 'Вас сместили ночью. Сообщение в газетах заняло четыре строки: «по состоянию здоровья». Портреты сняли к утру. К вечеру на их месте висели другие.'],
    revolution: ['Стачка победила', 'Оцепление расступилось. Палаццо Венеция заняли без выстрела. Вас судил открытый суд — первый открытый суд в этой стране за полвека. Обвинение зачитывали четыре дня.'],
    retired: ['Ушёл', 'Вы передали дела и уехали на виллу под Флоренцией. Вас не тронули. Это всё, что можно сказать.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    const who = { tiber: ['Рейх на Тибре', 'Вы удержали власть, отдав всё остальное. Законы, суды и лагеря устроены по берлинскому образцу. Итальянским остался язык.'],
      hard: ['Чёрный порядок', 'Партия вернула себе страну, а вы — партию. На улицах тихо. О том, чего стоила эта тишина, в Италии не говорят.'],
      demont: ['Тот, кто открыл двери', 'Вы разобрали режим, который вас поставил, его же декретами. Вас ненавидят те, кто потерял власть, и не благодарят те, кто получил свободу: они считают, что взяли её сами.'],
      reform: ['Фашизм с открытыми окнами', 'Режим тот же, но в нём можно дышать. Вы не дошли до конца и не повернули назад. Историки будут спорить, осторожность это была или расчёт.'],
      ortho: ['Хранитель наследства', 'Вы сохранили всё, что получили: корпорации, парады, конкордат. Страна постарела на десять лет и не изменилась ни в чём.'],
      social: ['Социальная республика', 'Без короля, с землёй у батраков и стачкой у рабочих. Вы построили фашизм, каким его обещали в девятнадцатом году. Двор и бароны в эмиграции пишут мемуары.'],
      modern: ['Авторитарная модернизация', 'Заводы выросли, небоскрёбы в Милане построены, газеты молчат. Вы доказали, что рынок уживается с трибуналом. Это не то открытие, которым гордятся.'],
      eclectic: ['Свой путь', 'Ваш курс не похож ни на один учебник: здесь уступка, там зажим. Он держался на вас одном. Что будет с ним после вас, никто не знает.'],
      legacy: ['Преемник', 'Вы десять лет управляли страной Чиано и почти ничего в ней не тронули. Вас запомнят как человека, который был между.'] }[D.key];
    E.title = V.referendum && c.r >= 8 ? 'Референдум' : who[0];
    E.text = `31 декабря ${Game.endYear() - 1} года. ` + (V.referendum && c.r >= 8 ? 'В декабре Италия проголосовала. Бюллетени считали три дня, при наблюдателях из двадцати стран. Что бы ни выбрала страна, выбирала она сама, впервые за пятьдесят семь лет. Вы подписали указ о результатах и ушли из палаццо Венеция пешком. ' : who[1] + ' ')
      + (C.vassal ? 'Этажом ниже сидит уполномоченный Рейха, и последнее слово за ним.' : C.bloc ? 'Латинский блок дал Италии то, чего у неё не было с сорокового года: собственный голос.' : C.reich >= 75 ? 'Берлин по-прежнему решает за Рим больше, чем Рим готов признать.' : C.usa >= 55 && C.usa > C.reich ? 'Американские кредиты и американский флот в Неаполе — новая привычка вместо старой.' : 'Между Берлином и Вашингтоном Италия прошла по канату и не упала.')
      + (held === 5 ? ' Империя цела.' : held === 0 ? ' Империи больше нет.' : ` От империи осталось ${held} из пяти владений.`)
      + (S.flags.itRace ? ' Эшелоны, ушедшие из Италии на север по вашему декрету, не вернулись. Этого не отменит ни один итог.' : '');
  }
  verdicts.length = 0;
  verdicts.push(`Курс: ${D.name}`);
  if (C.bloc) verdicts.push('Создал Латинский блок'); if (C.vassal) verdicts.push('Принял уполномоченного Рейха');
  if (V.referendum) verdicts.push('Назначил референдум');
  if (S.flags.itRace) verdicts.push('Депортировал собственных граждан'); if (S.flags.itRaceOff) verdicts.push('Отменил расовые законы');
  if (S.flags.itTribunal) verdicts.push('Ввёл особые трибуналы');
  verdicts.push(held === 5 ? 'Сохранил империю' : held === 0 ? 'Потерял империю' : `Владений осталось: ${held} из 5`);
  if (type === 'alarich') verdicts.push('Не удержал Бреннер');
});

// ---------- газета ----------
const _pressPageI = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isItal()) return _pressPageI.call(UI, news);
  const ch = [], C = Game.itcw(), D = Game.viaDoctrine();
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Сообщение: ' + h.head); }
  const date = `${[31, 30, 30, 31][S.q - 1]} ${MONTHS_Q[S.q - 1]} ${S.year} года`;
  const off = [];
  off.push(['Из палаццо Венеция', { r: 'Дуче принял делегацию сенаторов и представителей печати. Беседа прошла в обстановке откровенности.', n: 'Дуче принял рапорт генерального штаба милиции. Легионы готовы исполнить любой приказ.', o: 'Дуче принял парад молодёжных организаций. Порядок образцовый.', x: 'Дуче принял министров. Обсуждались текущие вопросы.' }[D.side]]);
  off.push(['Хозяйство', S.economy >= 55 ? 'План квартала выполнен по нефти, стали и судостроению.' : S.economy >= 40 ? 'План квартала выполнен в основном.' : 'Отдельные трудности со снабжением преодолеваются.']);
  off.push(['Империя', Game.impCount() === 5 ? 'Во владениях спокойно. Губернаторы докладывают о выполнении планов.' : 'Перегруппировка сил в заморских территориях проходит по плану.']);
  if (S.fear >= 60) off.push(['Особый трибунал', 'Вынесены приговоры по делам о подрыве государственной безопасности. Фамилии не сообщаются.']);
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="dk-np it-np">
      <div class="dk-np-mast"><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.italy}</svg><span>Римский вестник</span><svg viewBox="0 0 30 20" aria-hidden="true">${FLAGS.italy}</svg></div>
      <div class="dk-np-date">Рим · ${date} · год ${S.year - 1922}-й фашистской эры · проверено министерством народной культуры</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="dk-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит дуче?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
const viaNum = v => { const r = Math.round(v * 100) / 100; return (r > 0 ? '+' : r < 0 ? '−' : '') + String(Math.abs(r)).replace('.', ','); };
// Чипы квартального эффекта одного положения
function viaChips(q, raw) {
  const k = raw ? 1 : VIA_K, out = [], F = REGIONS[ITAL].factions;
  const chip = (good, ic, text) => out.push(`<span class="fx ${good === null ? 'neutral' : good ? 'up' : 'down'}">${ic}<span>${text}</span></span>`);
  const stat = { economy: ['📈', 'хозяйство'], support: ['❤️', 'поддержка'], army: ['🎖️', 'армия'] };
  for (const [key, [ic, name]] of Object.entries(stat)) if (q[key]) chip(q[key] > 0, ic, `${name} ${viaNum(q[key] * (key === 'support' && !raw ? VIA_KS : k))}`);
  if (q.fear) chip(null, '👁️', `страх ${viaNum(q.fear * k)}`);
  if (q.treasury) chip(q.treasury > 0, '💰', `казна ${viaNum(q.treasury)} млн`);
  const kw = raw ? 1 : VIA_CW;
  if (q.reich) chip(null, '🦅', `Рейх ${viaNum(q.reich * kw)}`);
  if (q.usa) chip(null, '🗽', `США ${viaNum(q.usa * kw)}`);
  if (q.iu) chip(q.iu < 0, '🔥', `волнения во владениях ${viaNum(q.iu * k)}`);
  if (q.ic) chip(q.ic > 0, '🗺️', `контроль во владениях ${viaNum(q.ic * k)}`);
  if (q.iy && (raw ? q.iy !== 1 : true)) { const d = raw ? q.iy - 1 : q.iy; if (Math.abs(d) > 0.001) chip(d > 0, '⚓', `вывоз ${d > 0 ? '+' : '−'}${Math.round(Math.abs(d) * 100)}%`); }
  if (q.cap) chip(q.cap > 0, '⚖️', `вес ${viaNum(q.cap)}`);
  if (q.coup) chip(q.coup < 0, '🗡️', `риск переворота ${q.coup > 0 ? '+' : '−'}${String(Math.round(Math.abs(q.coup) * 1000) / 10).replace('.', ',')}%`);
  for (const [f, d] of Object.entries(q.fac || {})) if (Math.abs(d * k) >= 0.05) { const N = F[f] || NEW_FACTIONS[DARK_I]; chip(d > 0, N.icon, `${N.short} ${viaNum(d * k)}`); }
  for (const [f, d] of Object.entries(q.facS || {})) if (Math.abs(d * k) >= 0.05) { const N = F[f] || NEW_FACTIONS[DARK_I]; chip(null, N.icon, `сила: ${N.short} ${viaNum(d * k)}`); }
  return out.join('') || '<span class="fx neutral"><span>без последствий</span></span>';
}
Object.assign(UI, {
  tab_via70() {
    const V = Game.via(), c = Game.viaCount(), D = Game.viaDoctrine(), sum = Game.viaSum(), cl = Game.viaClashes(), gain = Game.viaCapGain();
    const F = REGIONS[ITAL].factions, fn = f => (F[f] || NEW_FACTIONS[DARK_I]).short;
    const bar = (side, n) => `<div class="via-side via-${side}"><span>${VIA_SIDE[side]}</span><span class="via-pips">${Array.from({ length: 12 }, (_, i) => `<i class="${i < n ? 'f' : ''}"></i>`).join('')}</span><b>${n}</b></div>`;
    const miles = Object.entries(VIA_MILES).map(([id, [side, n, name]]) => `<span class="via-mile via-${side} ${V.miles[id] !== undefined ? 'done' : ''}" title="${VIA_SIDE[side]}: ${n} линий">${esc(name)}<small>${n}</small></span>`).join('');
    const line = key => {
      const P = VIA[key], cur = V.pos[key], ci = VIA_POS.indexOf(cur);
      const opt = p => {
        const O = P[p], on = cur === p, adj = Math.abs(VIA_POS.indexOf(p) - ci) === 1, why = adj ? Game.viaWhy(key, p) : '', g = p === 'o' ? null : P.guard[p];
        return `<div class="via-opt via-${p} ${on ? 'on' : ''}"><div class="via-opt-h"><span class="via-tag">${VIA_SIDE[p]}</span>${on ? '<span class="chip coopted">сейчас</span>' : ''}</div>
          <b>${esc(O.name)}</b><p class="muted small">${esc(O.desc)}</p><div class="via-fx">${viaChips(O.q)}</div>
          ${on ? '' : adj ? `<div class="via-go">${g ? `<span class="muted small">Против: ${esc(fn(g))}</span>` : '<span class="muted small">Возврат к прежнему</span>'}<button class="btn small" data-act="via:${key}:${p}" ${why || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>Сдвинуть<small>вес −${Game.viaCost(key, p)} · напр. +${Game.viaTensGain(key, p)}</small></button></div>${why ? `<p class="small dk-why">${esc(why[0].toUpperCase() + why.slice(1)).replace(/\.$/, '')}.</p>` : ''}` : '<p class="muted small via-far">Через одно положение не перейти.</p>'}</div>`;
      };
      return `<article class="card via-line"><header><h3>${esc(P.name)}</h3><span class="muted small">${esc(P.ask)}</span></header><div class="via-opts">${VIA_POS.map(opt).join('')}</div></article>`;
    };
    return `<p class="lede">Здесь решается, какой будет Италия. Двенадцать линий внутренней политики, у каждой три положения: реформа, ортодоксия, жёсткий курс. Каждое положение что-то даёт и что-то отнимает <b>каждый квартал</b>, до конца игры. Из положений складывается курс страны: от него зависят тяготение к Берлину или Вашингтону, покой во владениях, настроение сил и то, чем кончится ваше правление.</p>
      <p class="muted small">Сдвиг линии на соседнее положение стоит один приказ и <b>политический вес</b>. Каждый сдвиг растит <b>напряжение</b>: аппарат и страна не успевают привыкать. Напряжение спадает на 5 в квартал; выше 40 оно прибавляет риск переворота, с 80 аппарат перестаёт исполнять новые решения. Одну линию нельзя трогать чаще раза в три квартала.</p>
      <div class="cr">
        <section class="card via-doc via-doc-${D.side}" style="flex:1.5"><div class="eyebrow">Курс страны</div><h2 class="via-name">${esc(D.name)}</h2><p>${esc(D.desc)}</p>
          ${bar('r', c.r)}${bar('o', c.o)}${bar('n', c.n)}
          <div class="via-miles"><span class="muted small">Вехи:</span>${miles}</div></section>
        <section class="card cr-side">
          <div class="via-cap"><span class="eyebrow">Политический вес</span><b>${Math.floor(V.cap)}</b><small>из 12 · +${String(Math.round(gain * 100) / 100).replace('.', ',')} в квартал</small></div>
          ${UI.meter('Напряжение', V.tens, V.tens >= 60 ? 'bad' : V.tens >= 40 ? 'warn' : 'good')}
          <p class="muted small">Вес копится сам: быстрее при поддержке народа от 55, довольных опорах и ясном курсе (8 линий на одной стороне${Game.viaCoherent() ? ' — сейчас так' : ''}).</p>
          ${cl.length ? `<div class="via-clash"><b>Противоречия курса: ${cl.length}</b>${cl.map(x => `<p class="small">${esc(x[4])}.</p>`).join('')}<p class="muted small">Каждое прибавляет 1,5 напряжения в квартал.</p></div>` : '<p class="muted small">Противоречий в курсе нет.</p>'}
        </section>
      </div>
      <section class="card mt"><div class="eyebrow">Что курс даёт каждый квартал</div><div class="via-fx">${viaChips(sum, true)}</div></section>
      ${Object.entries(VIA_GROUPS).map(([g, name]) => `<h3 class="sub-h mt">${name}</h3><div class="via-lines">${Object.keys(VIA).filter(k => VIA[k].g === g).map(line).join('')}</div>`).join('')}`;
  },
  tab_imp70() {
    const held = Game.impCount();
    return `<p class="lede">Империя, о которой Италия мечтала семьдесят лет и которую получила из рук Берлина. Владения кормят казну вывозом и съедают её гарнизонами. Волнения растут сами; когда контроль падает ниже 12%, владение потеряно, и армия с партией винят вас. Колониальная линия на вкладке «Итальянский путь» меняет всё сразу: и стрельбу, и вывоз.</p>
      <section class="card"><div class="eyebrow">Баланс империи за квартал</div><div class="sp-facts"><span class="chip coopted">вывоз +${String(Game.impIncome()).replace('.', ',')} млн</span><span class="chip banned">гарнизоны −${Game.impUpkeep()} млн</span><span class="chip">удерживается ${held} из 5</span><span class="chip">линия: ${esc(VIA.colony[Game.via().pos.colony].name)}</span></div></section>
      <div class="grid mt">${Object.keys(IMP).map(k => {
        const D = IMP[k], T = Game.imp()[k], gone = !Game.impHeld(k);
        return `<article class="card country ${gone ? 'dk-gone' : ''}"><header><div><h3>${esc(D.full)}</h3><span class="muted small">${esc(D.what)}</span></div><span class="chip ${gone ? 'banned' : T.auto ? 'coopted' : ''}">${T.left ? 'оставлено' : T.lost ? 'потеряно' : T.auto ? 'автономия' : 'под управлением'}</span></header>
          ${gone ? '<p class="muted small">Итальянской администрации здесь больше нет.</p>' : `${UI.meter('Контроль', T.ctrl, T.ctrl >= 60 ? 'good' : T.ctrl >= 35 ? 'warn' : 'bad')}${UI.meter('Волнения', T.unrest, T.unrest >= 60 ? 'bad' : T.unrest >= 40 ? 'warn' : 'good')}
          <p class="muted small">Вывоз: +${Game.impYield(k).toFixed(1).replace('.', ',')} млн из ${D.y} возможных. Гарнизон: −${1 + (T.unrest >= 60 ? 1 : 0)} млн.${D.shared ? ` Доля Италии в сборах: ${Math.round(T.share * 100)}%; чем хуже отношения с Берлином, тем меньше доходит до Рима.` : ''}</p>
          <div class="acts">${Game.impActions(k).map(a => UI.actBtn(`imp:${k}:${a.id}`, a)).join('')}</div>`}</article>`; }).join('')}</div>`;
  },
  tab_itcw() {
    const C = Game.itcw(), acts = Game.itcwActions(), aid = Game.itcwAid(), q = Game.viaSum();
    return `<p class="lede">Мир делят три державы, и Италия — приз для двух из них. Берлин считает её младшим партнёром и держит углём. Вашингтон видит в ней дверь в Европу и стучит кредитами. Влияние каждого растёт и падает от ваших отношений с ним и от курса на «Итальянском пути»: жёсткие линии тянут к Берлину, реформы — к Вашингтону. Третий выход — свой блок с Мадридом.</p>
      <div class="cr">
        <section class="card" style="flex:1.3"><div class="eyebrow">Чья Италия · ${esc(Game.itcwStatus())}</div>
          <p class="muted small">В Берлине: ${esc(Game.leaderAt('reich'))}${Game.fuhrerChanged() ? `, ${esc(Game.fuhrerNew().who)}. ${esc(Game.fuhrerNew().note)}` : ', восемьдесят с лишним лет. О его здоровье в Берлине не говорят вслух.'}</p>
          ${UI.meter('Влияние Рейха', C.reich, C.reich >= 85 ? 'bad' : C.reich >= 45 ? 'warn' : 'good')}
          ${UI.meter('Влияние США', C.usa, 'str')}
          ${C.bloc ? '<p><span class="chip coopted">Латинский пакт подписан</span></p>' : UI.meter('Латинский блок: готовность', C.latin, C.latin >= 100 ? 'good' : 'str')}
          <p class="muted small">Курс сейчас сдвигает влияние Рейха на ${viaNum(q.reich)} и США на ${viaNum(q.usa)} в квартал.</p></section>
        <section class="card cr-side">
          <div class="sp-facts">${aid.length ? aid.map(a => `<span class="chip coopted">${esc(a.label)}: +${a.v} млн</span>`).join('') : '<span class="chip">помощи нет</span>'}</div>
          <p class="muted small">Рейх платит при влиянии от 45, США — от 30. Чем выше влияние, тем больше денег и тем меньше своей воли.</p>
          <p class="muted small"><b>Влияние Рейха от 85:</b> двор и армия унижены; с 88 Берлин предложит уполномоченного.</p>
          <p class="muted small"><b>США сильнее Рейха на 15 при влиянии от 45</b> — или девять линий реформы при влиянии Рейха ниже 45: Берлин ответит операцией «Аларих», дивизиями на Бреннере. ${Game.itcwNear() ? '<b class="dk-why">Сейчас до этого недалеко.</b>' : ''}</p>
        </section>
      </div>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>
        <div class="dec-fx">${Object.keys(a.fx).length ? `<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(Game.previewFx(a.fx))}</div>` : ''}${a.odds !== undefined ? `<div class="dec-row"><span class="dec-tag">Удача ${Math.round(a.odds * 100)}%</span>${Object.keys(a.win).length ? UI.fxChips(Game.previewFx(a.win)) : '<span class="fx neutral"><span>без огласки</span></span>'}</div><div class="dec-row"><span class="dec-tag dec-risk">Провал</span>${UI.fxChips(Game.previewFx(a.lose))}</div>` : ''}</div></div>
        ${UI.actBtn('icw:' + a.id, { ok: a.ok, name: 'Приказать', cost: a.cost })}</div>`).join('')}</div>`;
  },
});
const _tabCabI = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabI.call(UI);
  if (!isItal()) return h;
  const D = Game.viaDoctrine();
  return h.replace(/У власти ([\d.,]+) г\./, `Дуче $1 г. Курс: ${D.name}. ${Game.itcwStatus()}.`);
};
UI.actionHandlers.push(id => {
  if (!id.startsWith('via:') && !id.startsWith('imp:') && !id.startsWith('icw:')) return false;
  const p = id.split(':');
  const out = p[0] === 'via' ? Game.viaStep(p[1], p[2]) : p[0] === 'imp' ? Game.impAction(p[1], p[2]) : Game.itcwAction(p[1]);
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
