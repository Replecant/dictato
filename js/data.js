// Справочные данные: регионы, страны, движения, советники, персонажи.
const SKIN = { light: '#f1c9a5', tan: '#d9a273', brown: '#a8693f', dark: '#6e4226', deep: '#4a2c1a' };

const COUNTRIES = {
  usa: { name: 'США', bloc: 'west', flag: 'usa', leaders: [[1933.2, 'президент Гувер'], [1945.3, 'президент Рузвельт'], [1961.0, 'президент Эйзенхауэр'], [1963.9, 'президент Кеннеди'], [1969.0, 'президент Джонсон'], [9999, 'президент Никсон']] },
  ussr: { name: 'СССР', bloc: 'east', flag: 'ussr', leaders: [[1953.2, 'товарищ Сталин'], [1964.8, 'товарищ Хрущёв'], [9999, 'товарищ Брежнев']] },
  china: { name: 'КНР', bloc: 'east', flag: 'china', leaders: [[9999, 'Председатель Мао']] },
  roc: { name: 'Китай (Гоминьдан)', bloc: 'neutral', flag: 'roc', leaders: [[9999, 'генералиссимус Чан Кайши']] },
  cuba: { name: 'Куба', bloc: 'east', flag: 'cuba', leaders: [[9999, 'команданте Фидель Кастро']] },
  mexico: { name: 'Мексика', bloc: 'neutral', flag: 'mexico', leaders: [[1934.95, 'генерал Кальес (из-за кулис)'], [1940.9, 'президент Карденас'], [1964.9, 'президент Лопес Матеос'], [9999, 'президент Диас Ордас']] },
  brazil: { name: 'Бразилия', bloc: 'neutral', flag: 'brazil', leaders: [[1945.8, 'президент Варгас'], [1961.0, 'президент Кубичек'], [1961.65, 'президент Куадрус'], [1964.2, 'президент Гуларт'], [9999, 'военное правительство']] },
  uk: { name: 'Великобритания', bloc: 'west', flag: 'uk', leaders: [[1935.45, 'премьер Макдональд'], [1937.4, 'премьер Болдуин'], [1940.4, 'премьер Чемберлен'], [1963.8, 'премьер Макмиллан'], [1964.8, 'премьер Дуглас-Хьюм'], [9999, 'премьер Вильсон']] },
  france: { name: 'Франция', bloc: 'west', flag: 'france', leaders: [[1936.4, 'кабинет Третьей республики'], [1937.5, 'премьер Леон Блюм'], [1938.3, 'премьер Шотан'], [1940.3, 'премьер Даладье'], [1969.3, 'генерал де Голль'], [9999, 'президент Помпиду']] },
  germany: { name: 'Германия', bloc: 'axis', blocs30: [[1933, 'neutral'], [9999, 'axis']], flag: 'germany', leaders: [[1932.42, 'канцлер Брюнинг'], [1932.92, 'канцлер фон Папен'], [1933.08, 'канцлер фон Шлейхер'], [9999, 'рейхсканцлер Гитлер']] },
  italy: { name: 'Италия', bloc: 'axis', blocs30: [[1935.75, 'west'], [1936.75, 'neutral'], [9999, 'axis']], flag: 'italy', leaders: [[9999, 'дуче Муссолини']] },
  japan: { name: 'Япония', bloc: 'west', blocs30: [[1931.75, 'west'], [1936.75, 'neutral'], [9999, 'axis']], flag: 'japan', leaders: [[1945.6, 'кабинет императора Хирохито'], [1960.55, 'премьер Киси'], [1964.9, 'премьер Икэда'], [9999, 'премьер Сато']] },
  poland: { name: 'Польша', bloc: 'neutral', flag: 'poland', leaders: [[1935.4, 'маршал Пилсудский'], [9999, 'маршал Рыдз-Смиглы']] },
  india: { name: 'Индия', bloc: 'neutral', flag: 'india', leaders: [[1964.4, 'премьер Неру'], [1966.0, 'премьер Шастри'], [9999, 'премьер Индира Ганди']] },
  egypt: { name: 'Египет (ОАР)', bloc: 'neutral', flag: 'egypt', leaders: [[9999, 'президент Насер']] },
};

// Падежи стран: родительный, творительный, «куда» (для визитов)
const COUNTRY_CASES = {
  usa: ['США', 'США', 'в США'], ussr: ['СССР', 'СССР', 'в СССР'], china: ['КНР', 'КНР', 'в КНР'], roc: ['гоминьдановского Китая', 'гоминьдановским Китаем', 'в гоминьдановский Китай'],
  cuba: ['Кубы', 'Кубой', 'на Кубу'], mexico: ['Мексики', 'Мексикой', 'в Мексику'], brazil: ['Бразилии', 'Бразилией', 'в Бразилию'], uk: ['Великобритании', 'Великобританией', 'в Великобританию'],
  france: ['Франции', 'Францией', 'во Францию'], germany: ['Германии', 'Германией', 'в Германию'], italy: ['Италии', 'Италией', 'в Италию'], japan: ['Японии', 'Японией', 'в Японию'],
  poland: ['Польши', 'Польшей', 'в Польшу'], india: ['Индии', 'Индией', 'в Индию'], egypt: ['Египта', 'Египтом', 'в Египет'], russia: ['России', 'Россией', 'в Россию'],
  eu: ['Евросоюза', 'Евросоюзом', 'в Брюссель'], saudi: ['Саудовской Аравии', 'Саудовской Аравией', 'в Саудовскую Аравию'], iran: ['Ирана', 'Ираном', 'в Иран'], turkey: ['Турции', 'Турцией', 'в Турцию'],
  libya: ['Ливии', 'Ливией', 'в Ливию'], sa: ['ЮАР', 'ЮАР', 'в ЮАР'],
};
const cGen = c => (COUNTRY_CASES[c] || [])[0] || COUNTRIES[c].name;
const cIns = c => (COUNTRY_CASES[c] || [])[1] || COUNTRIES[c].name;
const cTo = c => (COUNTRY_CASES[c] || [])[2] || `в ${COUNTRIES[c].name}`;
const FLAGS = {
  usa: `<rect width="30" height="20" fill="#fff"/>${[0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 20 / 13}" width="30" height="${20 / 13}" fill="#b22234"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/>`,
  ussr: `<rect width="30" height="20" fill="#cc0000"/><path d="M4 3 L5 5.2 L7.4 5.2 L5.5 6.6 L6.2 9 L4 7.6 L1.8 9 L2.5 6.6 L0.6 5.2 L3 5.2 Z" fill="#ffd700" transform="translate(1 0) scale(0.75)"/><path d="M4 7 Q6 11 9 9 M5 10 L8 7" stroke="#ffd700" stroke-width="0.9" fill="none"/>`,
  china: `<rect width="30" height="20" fill="#de2910"/><circle cx="5" cy="5" r="2.6" fill="#ffde00"/><circle cx="10" cy="2" r="0.8" fill="#ffde00"/><circle cx="12" cy="4" r="0.8" fill="#ffde00"/><circle cx="12" cy="7" r="0.8" fill="#ffde00"/><circle cx="10" cy="9" r="0.8" fill="#ffde00"/>`,
  roc: `<rect width="30" height="20" fill="#fe0000"/><rect width="15" height="10" fill="#000095"/><circle cx="7.5" cy="5" r="2.6" fill="#fff"/><circle cx="7.5" cy="5" r="1.9" fill="#000095"/><circle cx="7.5" cy="5" r="1.5" fill="#fff"/>`,
  cuba: `<rect width="30" height="20" fill="#fff"/>${[0, 2, 4].map(i => `<rect y="${i * 4}" width="30" height="4" fill="#002a8f"/>`).join('')}<path d="M0 0 L13 10 L0 20 Z" fill="#cf142b"/><circle cx="4.5" cy="10" r="1.8" fill="#fff"/>`,
  mexico: `<rect width="10" height="20" fill="#006847"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce1126"/><circle cx="15" cy="10" r="2.6" fill="#8b5a2b"/>`,
  brazil: `<rect width="30" height="20" fill="#009c3b"/><path d="M15 2 L28 10 L15 18 L2 10 Z" fill="#ffdf00"/><circle cx="15" cy="10" r="4.4" fill="#002776"/>`,
  uk: `<rect width="30" height="20" fill="#012169"/><path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 L30 20 M30 0 L0 20" stroke="#c8102e" stroke-width="1.5"/><path d="M15 0 V20 M0 10 H30" stroke="#fff" stroke-width="6"/><path d="M15 0 V20 M0 10 H30" stroke="#c8102e" stroke-width="3.4"/>`,
  france: `<rect width="10" height="20" fill="#0055a4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ef4135"/>`,
  germany: `<rect width="30" height="6.7" fill="#000"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#dd0000"/>`,
  italy: `<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/><rect x="13.2" y="6.5" width="3.6" height="5" rx="0.6" fill="#ce2b37" stroke="#1f4e8c" stroke-width="0.5"/><path d="M15 7.2 V11 M13.8 9 H16.2" stroke="#fff" stroke-width="0.8"/>`,
  japan: `<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>`,
  poland: `<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#dc143c"/>`,
  india: `<rect width="30" height="6.7" fill="#ff9933"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#138808"/><circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width="0.6"/>`,
  egypt: `<rect width="30" height="6.7" fill="#ce1126"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#000"/><circle cx="11" cy="10" r="1.3" fill="#007a3d"/><circle cx="19" cy="10" r="1.3" fill="#007a3d"/>`,
};
function flagSvg(key, custom) {
  const inner = key === 'player' ? custom : FLAGS[key];
  return `<svg viewBox="0 0 30 20" class="flag" aria-hidden="true">${inner}</svg>`;
}

const REGIME_TYPES = {
  junta: {
    name: 'Военная хунта', icon: '🎖️',
    desc: 'Вы пришли к власти на танке. Армия вас любит, народ побаивается, а соседи гадают, надолго ли.',
    fx: { army: 18, support: -8, fear: 15 }, fac: { hawks: { a: 25, s: 10 }, liberals: { a: -15 } }, rel: {},
  },
  revolution: {
    name: 'Революционный вождь', icon: '✊',
    desc: 'Вы свергли старый режим под красными знамёнами. Москва аплодирует, Вашингтон хмурится, олигархи пакуют чемоданы.',
    fx: { support: 15, economy: -6, army: -5 }, fac: { left: { a: 30 }, oligarchs: { a: -30, s: -10 }, faith: { a: -8 } }, rel: { usa: -22, ussr: 25, china: 12, cuba: 15 },
  },
  western: {
    name: 'Друг Вашингтона', icon: '🤝',
    desc: 'Вашу инаугурацию почтил посол США. Банки открывают кредиты, а партизаны в горах — новые лагеря.',
    fx: { treasury: 30, economy: 5, support: -4 }, fac: { oligarchs: { a: 25 }, left: { a: -25, s: 6 } }, rel: { usa: 25, ussr: -20, uk: 10, france: 10, japan: 8 },
  },
  putsch: {
    name: 'Генеральский путч', icon: '🎖️',
    desc: 'Вы въехали во дворец на броневике под военный оркестр. Армия ликует. Великая депрессия, к сожалению, никуда не делась.',
    fx: { army: 18, support: -6, fear: 15 }, fac: { hawks: { a: 25, s: 10 }, liberals: { a: -15 } }, rel: {},
  },
  estado: {
    name: '«Новое государство»', icon: '🏛️',
    desc: 'Порядок, вера предков, корпорации и гимнастика по утрам. Муссолини шлёт поздравительную телеграмму, Москва — проклятия.',
    fx: { fear: 10, economy: 3 }, fac: { faith: { a: 20 }, oligarchs: { a: 15 }, left: { a: -25 }, liberals: { a: -10 } }, rel: { italy: 15, germany: 4, ussr: -15, france: -5 },
  },
  front: {
    name: 'Народный фронт', icon: '✊',
    desc: 'Вы пришли к власти на волне забастовок и красных флагов. Москва довольна, банкиры паникуют, духовенство молится.',
    fx: { support: 15, economy: -3 }, fac: { left: { a: 30 }, oligarchs: { a: -12, s: -5 }, faith: { a: -10 }, hawks: { a: 5 } }, rel: { ussr: 25, germany: -15, italy: -15, usa: -5, france: 5 },
  },
};

const TITLES = ['Генералиссимус', 'Пожизненный Президент', 'Отец Нации', 'Благодетель', 'Маршал', 'Верховный Вождь', 'Великий Кормчий', 'Спаситель Отечества'];
const TITLES_30 = ['Каудильо', 'Регент', 'Маршал', 'Генералиссимус', 'Пожизненный Президент', 'Вождь Нации', 'Благодетель Отечества', 'Отец Народов'];

// Общие черты советников по ролям (имена и внешность — по регионам)
const ROLES = {
  defense: { title: 'Министр обороны', icon: '🎖️', action: 'Военный парад', actionDesc: 'Танки, оркестр, конфетти. Армия довольна, казна — не очень.' },
  economy: { title: 'Министр экономики', icon: '📈', action: 'Экономическая программа', actionDesc: 'План, графики и мудрые слова. Экономика растёт, если министр не врёт.' },
  police: { title: 'Шеф тайной полиции', icon: '🕶️', action: 'Чистка неблагонадёжных', actionDesc: 'Оппозиция слабеет, страх растёт, заговоры раскрываются.' },
  propaganda: { title: 'Министр пропаганды', icon: '📻', action: 'Кампания «Отец Нации»', actionDesc: 'Плакаты, песни, радиопередачи. Народ вас любит. Или делает вид.' },
  foreign: { title: 'Министр иностранных дел', icon: '🌍', action: 'Дипломатическое турне', actionDesc: 'Министр объезжает столицы мира и всем улыбается.' },
};

const REGIONS = {
  latam: {
    name: 'Латинская Америка', short: 'Латинская Америка',
    blurb: 'Бананы, кофе, кокосовые пальмы и американский посол, который знает всё раньше вас.',
    country: 'Республика Эсмеральда', capital: 'Пуэрто-Альто', currency: 'эсмеральдо',
    exports: 'бананы и кофе', exportGen: 'бананов', company: '«Юнайтед Банана Компани»', patron: 'usa',
    sport: 'финал Кубка Америки по футболу', rival: 'Республика Санта-Эулалия', rivalShort: 'Санта-Эулалия',
    disputed: 'остров Попугаев', faithLeader: 'Архиепископ', capitalSquare: 'Пласа-де-ла-Патриа',
    jungle: 'горах Сьерра-Нубласа', nephew: 'Хорхито',
    countries: ['usa', 'ussr', 'cuba', 'mexico', 'brazil', 'china'],
    flag: `<rect width="30" height="20" fill="#0b6e4f"/><rect y="7" width="30" height="6" fill="#f2c14e"/><path d="M15 6.5 L16.3 9.2 L19.2 9.3 L16.9 11 L17.7 13.8 L15 12.2 L12.3 13.8 L13.1 11 L10.8 9.3 L13.7 9.2 Z" fill="#c1272d"/>`,
    leaderSkin: 'tan', era: '1960', style: 'latam', faithStyle: 'catholic', exile: 'Майами', critters: 'попугаев',
    factions: {
      left: { name: 'Партизаны-коммунисты', short: 'Партизаны', icon: '☭', desc: 'Бородатые молодые люди в горах. Читают Маркса, курят сигары, ждут посылок с Кубы.' },
      liberals: { name: 'Студенты и либералы', short: 'Студенты', icon: '🎓', desc: 'Требуют свободных выборов, свободной прессы и свободного рок-н-ролла.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Архиепископ благословляет вас по воскресеньям. Пока.' },
      oligarchs: { name: 'Латифундисты', short: 'Латифундисты', icon: '🎩', desc: 'Сорок семей, которым принадлежит 80% земли. И, возможно, вы.' },
      hawks: { name: 'Офицерская хунта', short: 'Хунта', icon: '⚔️', desc: 'Полковники, которые тоже хотели бы примерить президентскую ленту.' },
    },
    advisors: {
      defense: { name: 'Генерал Эрнесто «Мачете» Бомбардес', bio: 'Носит 47 медалей, 12 из них вручил себе сам. Решение любой проблемы — танки.', look: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#2b2118', hat: 'cap', hatColor: '#4b5320', mustache: 'walrus', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#4b5320', medals: 16, cigar: true } },
      economy: { name: 'Дон Аурелио Кастаньеда', bio: 'Учился в Чикаго. Заочно. Каждое предложение заканчивает словом «рынок».', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#5b4a3a', glasses: 'round', mustache: 'pencil', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#6d6a5f', tie: '#2a6fdb', sweat: true } },
      police: { name: 'Полковник Игнасио Сомбра', bio: 'Носит тёмные очки даже ночью. Знает всё, особенно то, чего не было.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'aviator', mustache: 'pencil', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#22252a', tie: '#111' } },
      propaganda: { name: 'Лоло Глориоса', bio: 'Бывший конферансье радио. Ведёт передачу «Час Отца Нации» по шесть часов в день.', look: { skin: SKIN.light, face: 'round', hair: 'slick', hairColor: '#3a2a1a', mustache: 'handlebar', brows: 'normal', mouth: 'grin', outfit: 'guayabera', outfitColor: '#f1e4c3', blush: true } },
      foreign: { name: 'Сеньор Феликс Флорес', bio: 'Поэт. Пишет ноты протеста в стихах. Американцы до сих пор не поняли ни одной.', look: { skin: SKIN.light, face: 'long', hair: 'curly', hairColor: '#777', mustache: 'none', beard: 'goatee', brows: 'normal', mouth: 'smile', glasses: 'monocle', outfit: 'suit', outfitColor: '#5a2a3a', tie: '#e2b33c' } },
    },
  },
  asia: {
    name: 'Юго-Восточная Азия', short: 'Азия',
    blurb: 'Каучук, рис и олово. С севера смотрит Пекин, с моря — Седьмой флот США.',
    country: 'Республика Сангпура', capital: 'Бантанг', currency: 'сангпурский дуонг',
    exports: 'каучук и олово', exportGen: 'каучука', company: '«Бритиш Раббер Лимитед»', patron: 'uk',
    sport: 'финал Азиатских игр по футболу', rival: 'Королевство Мунтари', rivalShort: 'Мунтари',
    disputed: 'перевал Семи Облаков', faithLeader: 'Верховный настоятель', capitalSquare: 'площади Независимости',
    jungle: 'джунглях у северной границы', nephew: 'Бунми',
    countries: ['usa', 'ussr', 'china', 'uk', 'japan', 'india'],
    flag: `<rect width="30" height="20" fill="#c1272d"/><rect y="13" width="30" height="7" fill="#1f4e8c"/><circle cx="15" cy="8" r="4" fill="#f2c14e"/><circle cx="16.4" cy="7.2" r="3.4" fill="#c1272d"/>`,
    leaderSkin: 'tan', era: '1960', style: 'asia', faithStyle: 'buddhist', exile: 'Гонолулу', critters: 'обезьян',
    factions: {
      left: { name: 'Маоистские повстанцы', short: 'Маоисты', icon: '☭', desc: 'Партизанская армия в джунглях. Цитатник Мао у каждого, рация — у каждого пятого.' },
      liberals: { name: 'Студенты и интеллигенция', short: 'Студенты', icon: '🎓', desc: 'Пишут дацзыбао о демократии и слушают «Битлз» по британскому радио.' },
      faith: { name: 'Буддийская сангха', short: 'Сангха', icon: '☸️', desc: 'Монахи учат, что всё преходяще. Включая диктатуры.' },
      oligarchs: { name: 'Плантаторы и компрадоры', short: 'Плантаторы', icon: '🎩', desc: 'Владельцы каучуковых плантаций и торговых домов. Считают деньги быстрее, чем вы их тратите.' },
      hawks: { name: 'Генералы-ястребы', short: 'Генералы', icon: '⚔️', desc: 'Хотят войну с соседом, больше вертолётов и, возможно, ваше кресло.' },
    },
    advisors: {
      defense: { name: 'Генерал Прасет Чайват', bio: 'Носит парадный мундир даже в бане. Мечтает о вертолётах так, как поэты мечтают о любви.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#111', hat: 'cap', hatColor: '#3d4a2a', mustache: 'none', brows: 'angry', mouth: 'flat', outfit: 'military', outfitColor: '#3d4a2a', medals: 14 } },
      economy: { name: 'Доктор Тан Вэйлинь', bio: 'Считает на счётах быстрее, чем ЭВМ IBM. Предсказывает ВВП по полёту журавлей.', look: { skin: SKIN.light, face: 'long', hair: 'bald', hairColor: '#999', glasses: 'round', mustache: 'none', beard: 'goatee', brows: 'worried', mouth: 'o', outfit: 'mao', outfitColor: '#5b6770', sweat: true } },
      police: { name: 'Полковник Сомчай «Тень» Ваннасин', bio: 'Улыбается всегда. Особенно на допросах. Его досье есть даже на вашу кошку.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'aviator', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#1f2328', tie: '#7a1a1a' } },
      propaganda: { name: 'Госпожа Малина Сари', bio: 'Бывшая звезда кино. Снимает о вас фильмы, в которых вы лично побеждаете тигра.', look: { skin: SKIN.tan, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'robe', outfitColor: '#b8325a', trim: '#e2b33c', blush: true, earring: true } },
      foreign: { name: 'Принц Сурия Вонгсаван', bio: 'Учился в Оксфорде, играет в крикет и называет Председателя Мао «старина».', look: { skin: SKIN.tan, face: 'long', hair: 'slick', hairColor: '#222', mustache: 'pencil', brows: 'normal', mouth: 'smirk', glasses: 'monocle', outfit: 'suit', outfitColor: '#ece6d6', tie: '#1f4e8c', pipe: true } },
    },
  },
  africa: {
    name: 'Африка', short: 'Африка',
    blurb: 'Какао, медь и юная независимость. Бывшая метрополия всё ещё держит ключи от казны.',
    country: 'Республика Нгомбе', capital: 'Порт-Виктуар', currency: 'нгомбийский франк',
    exports: 'какао и медь', exportGen: 'какао', company: '«Компани Миньер дю Нгомбе»', patron: 'france',
    sport: 'финал Кубка африканских наций', rival: 'Республика Верхний Казонго', rivalShort: 'Казонго',
    disputed: 'Медный треугольник', faithLeader: 'Совет вождей', capitalSquare: 'площади Свободы',
    jungle: 'лесах провинции Кассаи-Нор', nephew: 'Альфонс',
    countries: ['usa', 'ussr', 'china', 'france', 'uk', 'egypt'],
    flag: `<rect width="30" height="20" fill="#1e7a3c"/><path d="M0 20 L30 0 L30 20 Z" fill="#c1272d"/><path d="M0 18 L27 0 L30 0 L30 2 L3 20 L0 20 Z" fill="#f2c14e"/><path d="M8 4 L9 6.4 L11.6 6.5 L9.6 8 L10.3 10.5 L8 9 L5.7 10.5 L6.4 8 L4.4 6.5 L7 6.4 Z" fill="#f2c14e"/>`,
    leaderSkin: 'dark', era: '1960', style: 'africa', faithStyle: 'chief', exile: 'Ницце', critters: 'попугаев',
    factions: {
      left: { name: 'Марксисты-панафриканисты', short: 'Марксисты', icon: '☭', desc: 'Молодые радикалы из Сорбонны и Москвы. Хотят национализировать всё, включая ваш дворец.' },
      liberals: { name: 'Студенты и профсоюзы', short: 'Профсоюзы', icon: '🎓', desc: 'Учителя, журналисты, клерки. Пишут петиции и устраивают марши.' },
      faith: { name: 'Совет традиционных вождей', short: 'Вожди', icon: '🪶', desc: 'Старейшины провинций. Их уважение не купить. Почти.' },
      oligarchs: { name: 'Колониальные компании', short: 'Компании', icon: '🎩', desc: 'Горнорудные и торговые фирмы бывшей метрополии. Обещают «стабильность» в обмен на всё.' },
      hawks: { name: 'Молодые полковники', short: 'Полковники', icon: '⚔️', desc: 'Выпускники Сен-Сира. Стратегию знают по учебникам, перевороты — по газетам.' },
    },
    advisors: {
      defense: { name: 'Генерал Огюстен Мбаку', bio: 'Окончил военную школу в Сен-Сире с отличием по строевому шагу. Поёт «Марсельезу» в душе.', look: { skin: SKIN.dark, face: 'square', hair: 'short', hairColor: '#111', hat: 'kepi', hatColor: '#3f4a2a', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#3f4a2a', medals: 15 } },
      economy: { name: 'Доктор Самуэль Окото', bio: 'Выпускник Лондонской школы экономики и не даёт никому об этом забыть. Носит котелок в +40.', look: { skin: SKIN.deep, face: 'long', hair: 'short', hairColor: '#222', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'o', hat: 'bowler', hatColor: '#7a1a1a', outfit: 'suit', outfitColor: '#3c3a36', tie: '#c1272d', sweat: true } },
      police: { name: 'Майор Тибо «Тень» Камара', bio: 'Говорит шёпотом. Слышит шёпот за три квартала. Коллекционирует чужие письма.', look: { skin: SKIN.dark, face: 'oval', hair: 'bald', hairColor: '#111', glasses: 'aviator', mustache: 'none', beard: 'goatee', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#1d1f22', tie: '#111' } },
      propaganda: { name: 'Мадам Розалия Нкеми', bio: 'Главный редактор всех трёх газет страны. Все три хвалят вас разными шрифтами.', look: { skin: SKIN.brown, face: 'round', hair: 'afro', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'robe', outfitColor: '#e07a1f', trim: '#1e7a3c', blush: true, earring: true } },
      foreign: { name: 'Жан-Батист Дюбуа-Ндиайе', bio: 'Говорит по-французски лучше французов и по-русски лучше, чем хотелось бы американцам.', look: { skin: SKIN.brown, face: 'long', hair: 'short', hairColor: '#666', mustache: 'pencil', brows: 'normal', mouth: 'smile', glasses: 'round', outfit: 'suit', outfitColor: '#ece6d6', tie: '#2a6fdb', pipe: true } },
    },
  },
  latam30: {
    name: 'Латинская Америка', short: 'Латинская Америка',
    blurb: 'Кофе, сахар, танго по радио и американские морские пехотинцы, которые «просто заглянули».',
    country: 'Республика Сан-Тадео', capital: 'Вилья-Конкордия', currency: 'тадейский песо',
    exports: 'кофе и сахар', exportGen: 'кофе', company: '«Интернэшнл Шугар Корпорейшн»', patron: 'usa',
    sport: 'финал Кубка Южной Америки по футболу', rival: 'Республика Альто-Чако', rivalShort: 'Альто-Чако',
    disputed: 'пустыня Гран-Чако-дель-Сур', faithLeader: 'Архиепископ', capitalSquare: 'Пласа-де-Армас',
    jungle: 'сельве у границы с Альто-Чако', nephew: 'Пепито',
    countries: ['usa', 'ussr', 'uk', 'germany', 'italy', 'mexico', 'brazil'],
    relInit: { usa: 55, ussr: 25, uk: 50, germany: 42, italy: 45, mexico: 45, brazil: 48 },
    flag: `<rect width="30" height="20" fill="#f2ead6"/><rect width="30" height="5" fill="#7a1f3d"/><rect y="15" width="30" height="5" fill="#7a1f3d"/><circle cx="15" cy="10" r="3.6" fill="#d6a63a"/><circle cx="15" cy="10" r="1.6" fill="#7a1f3d"/>`,
    leaderSkin: 'tan', era: '1930', style: 'latam', faithStyle: 'catholic', exile: 'Париже', critters: 'попугаев',
    factions: {
      left: { name: 'Анархисты и коммунисты', short: 'Левые', icon: '☭', desc: 'Портовые грузчики с чёрно-красными флагами и студенты с томиком Маркса. Между собой тоже спорят.' },
      liberals: { name: 'Радикалы и студенты', short: 'Радикалы', icon: '🎓', desc: 'Требуют автономии университетов, честных выборов и чтобы вы перестали петь на радио.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Архиепископ благословляет вас по воскресеньям и пишет письма в Ватикан по понедельникам.' },
      oligarchs: { name: 'Кофейные бароны', short: 'Бароны', icon: '🎩', desc: 'Двенадцать семей, которым принадлежат кофе, сахар и половина депутатов.' },
      hawks: { name: 'Молодые лейтенанты', short: 'Лейтенанты', icon: '⚔️', desc: 'Хотят «очистить республику от коррупции». Начать, видимо, с вас.' },
    },
    advisors: {
      defense: { name: 'Генерал Панфило Тромбон', bio: 'Воевал в трёх гражданских войнах, причём в двух — за обе стороны сразу. Шпоры носит даже в автомобиле.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#222', hat: 'kepi', hatColor: '#5a5f3a', mustache: 'handlebar', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#5a5f3a', medals: 11, sash: '#7a1f3d' } },
      economy: { name: 'Доктор Эусебио Кальдерон', bio: 'Предсказал Великую депрессию. В 1931 году. Считает на счётах и в каждом разговоре вспоминает золотой стандарт.', look: { skin: SKIN.light, face: 'long', hair: 'bald', hairColor: '#888', glasses: 'monocle', mustache: 'walrus', brows: 'worried', mouth: 'o', hat: 'bowler', hatColor: '#222', outfit: 'suit', outfitColor: '#4a4438', tie: '#7a1f3d', sweat: true } },
      police: { name: 'Капитан Рамирес по прозвищу Свисток', bio: 'Насвистывает танго перед каждым арестом. Город узнаёт мелодию и пустеет за минуту.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', hat: 'fedora', hatColor: '#2a2a2a', mustache: 'pencil', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#1f2126', tie: '#7a1a1a' } },
      propaganda: { name: 'Мануэль «Радио» Пенья', bio: 'Владеет единственной радиостанцией страны. Между вашими речами сам поёт танго. Иногда вместо речей.', look: { skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#1a1410', mustache: 'pencil', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#e8dcc0', tie: '#111', blush: true } },
      foreign: { name: 'Дон Хуан-Себастьян де ла Торре-и-Вега-и-Монтес', bio: 'Аристократ, полное имя которого занимает две строки. Учился в Париже и через слово говорит «шарман».', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#bbb', mustache: 'handlebar', brows: 'normal', mouth: 'smirk', glasses: 'monocle', hat: 'top', hatColor: '#333', outfit: 'suit', outfitColor: '#2a2a2a', tie: '#e8dcc0' } },
    },
  },
  europe30: {
    name: 'Восточная Европа', short: 'Восточная Европа',
    blurb: 'Зерно, лес и королевская гвардия в перьях. С запада смотрит Берлин, с востока — Москва, а Париж обещает защиту.',
    country: 'Королевство Ружения', capital: 'Белогор', currency: 'руженский злот',
    exports: 'зерно и лес', exportGen: 'зерна', company: '«Франко-Руженские нефтепромыслы»', patron: 'france',
    sport: 'финал Центральноевропейского кубка по футболу', rival: 'Великое герцогство Лютов', rivalShort: 'Лютов',
    disputed: 'долина реки Мжа', faithLeader: 'Патриарх', capitalSquare: 'Соборной площади',
    jungle: 'Карпатских лесах', nephew: 'Мирек',
    countries: ['germany', 'ussr', 'france', 'uk', 'italy', 'poland', 'usa'],
    relInit: { germany: 45, ussr: 30, france: 60, uk: 50, italy: 48, poland: 50, usa: 40 },
    flag: `<rect width="30" height="20" fill="#1f4e8c"/><rect y="6.7" width="30" height="6.7" fill="#f2ead6"/><path d="M15 4 L18 8 L18 12 Q15 16 12 12 L12 8 Z" fill="#c1272d" stroke="#d6a63a" stroke-width="0.8"/>`,
    leaderSkin: 'light', era: '1930', style: 'europe', faithStyle: 'orthodox', exile: 'Монте-Карло', critters: 'гусей',
    factions: {
      left: { name: 'Руженские коммунисты', short: 'Коммунисты', icon: '☭', desc: 'Получают инструкции из Москвы. Листовки печатают в подвале пекарни, поэтому от них пахнет хлебом.' },
      liberals: { name: 'Крестьянская партия и интеллигенция', short: 'Крестьянисты', icon: '🌾', desc: 'Самая многочисленная партия страны: усатые крестьяне и бледные профессора. Хотят земли и конституции.' },
      faith: { name: 'Православная церковь', short: 'Церковь', icon: '☦️', desc: 'Патриарх помнит семь правительств и намерен пережить восьмое.' },
      oligarchs: { name: 'Помещики и банкиры', short: 'Помещики', icon: '🎩', desc: 'Старые графские семьи и новые банкиры. Друг друга презирают, но вас презирают сильнее.' },
      hawks: { name: 'Офицерская лига', short: 'Офицеры', icon: '⚔️', desc: 'Ветераны Великой войны с саблями и обидами. Считают, что страной должен править генштаб.' },
    },
    advisors: {
      defense: { name: 'Генерал Казимир Гроховский', bio: 'Кавалерист. Уверен, что сабля победит любой танк. Его конь имеет чин полковника и отдельное жалованье.', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#ddd', hat: 'cap', hatColor: '#5a6a7a', mustache: 'handlebar', brows: 'bushy', browColor: '#ddd', mouth: 'flat', outfit: 'military', outfitColor: '#5a6a7a', medals: 13, sash: '#c1272d' } },
      economy: { name: 'Профессор Отто Ценглер', bio: 'Учился в Вене. Объясняет кризис кривой спроса, которую рисует вилкой на скатерти. Скатертей во дворце не осталось.', look: { skin: SKIN.light, face: 'long', hair: 'bald', hairColor: '#aaa', glasses: 'round', beard: 'goatee', mustache: 'thick', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#4a4a44', tie: '#1f4e8c', sweat: true } },
      police: { name: 'Полковник Анатоль Мрак', bio: 'Носит кожаный плащ даже в июле. На любую новость отвечает: «Я так и знал». Обычно действительно знал.', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#222', hat: 'fedora', hatColor: '#1a1a1a', glasses: 'round', mustache: 'none', brows: 'angry', mouth: 'flat', outfit: 'suit', outfitColor: '#2a1d14', tie: '#111' } },
      propaganda: { name: 'Пан Ярослав Фанфара', bio: 'Режиссёр кинохроники. В каждом выпуске вы спасаете деревню от наводнения. Каждый раз ту же самую.', look: { skin: SKIN.light, face: 'round', hair: 'curly', hairColor: '#6b3e1e', hat: 'beret', hatColor: '#1a1a1a', mustache: 'pencil', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#7a5a3a', tie: '#e07a1f', blush: true } },
      foreign: { name: 'Граф Феликс фон Тотт-Руженский', bio: 'Танцует вальс с послами всех держав. Однажды с тремя одновременно. Подписал бы союз с Луной, если бы там был бал.', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#c9b48a', mustache: 'handlebar', brows: 'normal', mouth: 'smirk', glasses: 'monocle', hat: 'top', hatColor: '#222', outfit: 'suit', outfitColor: '#1d1d22', tie: '#f2ead6' } },
    },
  },
  asia30: {
    name: 'Юго-Восточная Азия', short: 'Азия',
    blurb: 'Рис, тик и королевские слоны. Британия торгует, Франция присматривается, а Япония говорит о «сфере сопроцветания».',
    country: 'Королевство Чампасари', capital: 'Ваньпхра', currency: 'чампасарский тикаль',
    exports: 'рис и тиковое дерево', exportGen: 'риса', company: '«Ориентал Тик Трейдинг Компани»', patron: 'uk',
    sport: 'финал Дальневосточных игр по футболу', rival: 'Княжество Шан-Мыонг', rivalShort: 'Шан-Мыонг',
    disputed: 'Слоновье плато', faithLeader: 'Верховный патриарх сангхи', capitalSquare: 'Королевской площади',
    jungle: 'тиковых лесах на севере', nephew: 'Ноппадон',
    countries: ['uk', 'france', 'japan', 'roc', 'usa', 'ussr'],
    relInit: { uk: 60, france: 50, japan: 45, roc: 45, usa: 45, ussr: 25 },
    flag: `<rect width="30" height="20" fill="#7a1f3d"/><rect y="4" width="30" height="12" fill="#f2c14e"/><ellipse cx="15" cy="10" rx="5" ry="3.4" fill="#f2ead6"/><path d="M11 12 Q15 5 19 12" stroke="#7a1f3d" stroke-width="1.2" fill="none"/>`,
    leaderSkin: 'tan', era: '1930', style: 'asia', faithStyle: 'buddhist', exile: 'Гонконге', critters: 'слонов',
    factions: {
      left: { name: 'Коммунисты и красные профсоюзы', short: 'Коммунисты', icon: '☭', desc: 'Ячейки в порту и на лесопилках. Связной из Коминтерна приезжает под видом торговца веерами.' },
      liberals: { name: 'Партия реформаторов', short: 'Реформаторы', icon: '📜', desc: 'Молодые юристы, учившиеся в Париже. Хотят конституцию. И, возможно, вашего ухода.' },
      faith: { name: 'Буддийская сангха', short: 'Сангха', icon: '☸️', desc: 'Монахи терпеливы. Они пережили семь династий и переживут вас.' },
      oligarchs: { name: 'Принцы и рисовые бароны', short: 'Аристократы', icon: '🎩', desc: 'Сто сорок принцев королевской крови. Каждому нужна должность, дворец и автомобиль.' },
      hawks: { name: 'Молодые офицеры', short: 'Офицеры', icon: '⚔️', desc: 'Читают японские газеты и мечтают о «великом государстве». Начать хотят с министерства обороны.' },
    },
    advisors: {
      defense: { name: 'Генерал Пхрая Сингха', bio: 'Любит парады боевых слонов. Считает, что слон лучше танка: у слона есть хобот и чувство собственного достоинства.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#111', hat: 'helmet', hatColor: '#e8dcc0', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#e8dcc0', medals: 12, sash: '#7a1f3d' } },
      economy: { name: 'Кхун Вичит Тханакан', bio: 'Вернулся из Лондона с котелком и верой в золотой стандарт. Золотой стандарт Британия отменила, котелок остался.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#222', hat: 'bowler', hatColor: '#1d1d1d', glasses: 'round', mustache: 'none', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#3c3a36', tie: '#7a1f3d', sweat: true } },
      police: { name: 'Полковник Чан по прозвищу Шёпот', bio: 'Его агенты переодеты продавцами лапши. Лапша у них, кстати, лучшая в столице.', look: { skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'round', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'mao', outfitColor: '#2a2a2a' } },
      propaganda: { name: 'Принцесса Дуангчан', bio: 'Поэтесса и звезда немого кино. Звуковое кино не одобряет: «Слова портят величие».', look: { skin: SKIN.tan, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'robe', outfitColor: '#d6a63a', trim: '#7a1f3d', blush: true, earring: true } },
      foreign: { name: 'Принц Ратана Девавонг', bio: 'Учился в Итоне, Сорбонне и Гейдельберге. Ни одного не окончил, но со всеми сохранил связи.', look: { skin: SKIN.tan, face: 'long', hair: 'slick', hairColor: '#222', mustache: 'pencil', brows: 'normal', mouth: 'smirk', glasses: 'monocle', outfit: 'suit', outfitColor: '#f2ead6', tie: '#1f4e8c', pipe: true } },
    },
  },
};

// Замены уволенным советникам — родственники диктатора
const RELATIVES = {
  defense: { name: 'Кузен Рамон', bio: 'Ваш кузен. Служил в армии две недели, но мундир сидит отлично.', comp: 0.6 },
  economy: { name: 'Шурин Бенедикт', bio: 'Брат вашей жены. Однажды выиграл в лотерею и с тех пор считает себя экономистом.', comp: 0.5 },
  police: { name: 'Тётушка Консуэло', bio: 'Знает все сплетни столицы. Тайная полиция ей, в сущности, не нужна.', comp: 0.8 },
  propaganda: { name: 'Племянник Тито', bio: 'Играет на гитаре и разбирается в мотоциклах. Очень громкий.', comp: 0.6 },
  foreign: { name: 'Зять Октавио', bio: 'Был за границей два раза. Говорит на трёх языках, все — с ошибками.', comp: 0.5 },
};
const RELATIVE_LOOK = {
  defense: { face: 'round', hair: 'curly', hairColor: '#2b2118', hat: 'beret', hatColor: '#6b1d1d', mustache: 'thick', brows: 'normal', mouth: 'grin', outfit: 'military', outfitColor: '#5c6b33', medals: 3 },
  economy: { face: 'round', hair: 'combover', hairColor: '#3a2a1a', mustache: 'none', brows: 'worried', mouth: 'smile', glasses: 'square', outfit: 'suit', outfitColor: '#8a6d3b', tie: '#e07a1f' },
  police: { face: 'round', hair: 'bun', hairColor: '#9a9a9a', mustache: 'none', brows: 'angry', mouth: 'smirk', glasses: 'round', outfit: 'robe', outfitColor: '#2e2e3a', trim: '#8e44ad', earring: true },
  propaganda: { face: 'oval', hair: 'long', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'aviator', outfit: 'guayabera', outfitColor: '#e6a1c0' },
  foreign: { face: 'long', hair: 'slick', hairColor: '#111', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'suit', outfitColor: '#d8c27a', tie: '#c1272d' },
};

// Неигровые персонажи событий
function npcLook(key, region) {
  const r = REGIONS[region];
  const base = { skin: SKIN[r.leaderSkin] };
  const L = {
    usa_amb: { name: 'Посол США мистер Брэдфорд', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#c9a640', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#2c3e60', tie: '#b22234', hat: 'fedora', hatColor: '#6d5d48' } },
    ussr_amb: { name: 'Посол СССР товарищ Бубликов', look: { skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#8a7a6a', mustache: 'none', brows: 'bushy', browColor: '#555', mouth: 'flat', outfit: 'suit', outfitColor: '#4a4a48', tie: '#7a1a1a', blush: true, medals: 2 } },
    china_amb: { name: 'Посол КНР товарищ Ван', look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'mao', outfitColor: '#56604a', glasses: 'round' } },
    france_amb: { name: 'Месье Лефевр, «технический советник»', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#4a3a2a', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'suit', outfitColor: '#30364a', tie: '#0055a4', cigar: false, pipe: true } },
    uk_amb: { name: 'Сэр Реджинальд Пемброк', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#bbb', mustache: 'walrus', brows: 'bushy', browColor: '#bbb', mouth: 'flat', outfit: 'suit', outfitColor: '#3a3a3a', tie: '#012169', hat: 'top', hatColor: '#333', glasses: 'monocle' } },
    journalist: { name: 'Мисс Дороти Хейл, журнал «Тайм»', look: { skin: SKIN.light, face: 'oval', hair: 'long', hairColor: '#b5651d', mustache: 'none', brows: 'normal', mouth: 'smile', glasses: 'square', outfit: 'suit', outfitColor: '#7d9c8c', tie: '#f4f1ea', earring: true } },
    worker: { name: 'Профсоюзный вожак', look: { ...base, face: 'square', hair: 'short', hairColor: '#222', hat: 'flatcap', hatColor: '#5a4a3a', mustache: 'thick', brows: 'angry', mouth: 'frown', outfit: r.style === 'latam' ? 'guayabera' : 'mao', outfitColor: '#7a8a9a' } },
    student: { name: 'Студент-активист', look: { ...base, face: 'long', hair: 'long', hairColor: '#2b1b10', beard: 'goatee', mustache: 'none', brows: 'angry', mouth: 'o', glasses: 'round', outfit: r.style === 'latam' ? 'guayabera' : 'suit', outfitColor: '#c95b3a' } },
    rebel: { name: REGION_TALK[region].rebel, look: { ...base, face: 'oval', hair: 'curly', hairColor: '#1a1a1a', hat: r.style === 'europe' ? 'flatcap' : 'beret', hatColor: '#1a1a1a', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'smirk', outfit: 'military', outfitColor: '#556b2f', cigar: r.style === 'latam', medals: 0 } },
    priest: { name: r.faithLeader, look: r.faithStyle === 'orthodox'
      ? { ...base, face: 'long', hair: 'long', hairColor: '#9a9a9a', beard: 'full', mustache: 'walrus', brows: 'bushy', browColor: '#9a9a9a', mouth: 'flat', outfit: 'robe', outfitColor: '#141414', trim: '#d6a63a', hat: 'kamilavka', hatColor: '#141414' }
      : r.faithStyle === 'buddhist'
      ? { ...base, face: 'round', hair: 'bald', hairColor: '#333', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'robe', outfitColor: '#e07a1f', trim: '#c95b1a', eyes: 'sleepy' }
      : r.faithStyle === 'chief'
        ? { ...base, face: 'long', hair: 'short', hairColor: '#ddd', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ddd', mouth: 'flat', outfit: 'robe', outfitColor: '#6b3e1e', trim: '#e2b33c', hat: 'fez', hatColor: '#7a1a1a' }
        : { ...base, skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#ccc', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'round', outfit: 'robe', outfitColor: '#1d1d1d', trim: '#c1272d', blush: true } },
    banker: { name: 'Герр Цвингли, Цюрихский банк', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#ddd', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'square', outfit: 'suit', outfitColor: '#2a2a2a', tie: '#888', hat: 'top', hatColor: '#555' } },
    first_lady: { name: 'Первая леди', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'aviator', outfit: 'robe', outfitColor: '#c2185b', trim: '#f0c419', earring: true, blush: true } },
    nephew: { name: `Племянник ${r.nephew}`, look: { ...base, face: 'round', hair: 'long', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'aviator', outfit: 'guayabera', outfitColor: '#f39c12', blush: true } },
    exdictator: { name: 'Свергнутый Генералиссимус соседей', look: { ...base, face: 'round', hair: 'combover', hairColor: '#555', hat: 'cap', hatColor: '#6b1d1d', mustache: 'walrus', brows: 'worried', mouth: 'frown', outfit: 'military', outfitColor: '#6b1d1d', medals: 12, sweat: true, sash: '#2a6fdb' } },
    mafia: { name: 'Мистер Сальваторе, «бизнесмен из Чикаго»', look: { skin: SKIN.light, face: 'square', hair: 'slick', hairColor: '#111', mustache: 'none', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#333', tie: '#e2b33c', hat: 'fedora', hatColor: '#222', cigar: true } },
    colonel: { name: 'Полковник-заговорщик', look: { ...base, face: 'square', hair: 'short', hairColor: '#111', hat: 'beret', hatColor: '#2f3e1f', mustache: 'thick', brows: 'angry', mouth: 'flat', glasses: 'aviator', outfit: 'military', outfitColor: '#2f3e1f', medals: 4 } },
    spy: { name: 'Таинственный перебежчик', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#777', mustache: 'none', brows: 'worried', mouth: 'flat', glasses: 'square', outfit: 'suit', outfitColor: '#6a5d4d', tie: '#333', hat: 'fedora', hatColor: '#4a4033', sweat: true } },
    germany_amb: { name: 'Посол Германии барон фон Штиффель', look: { skin: SKIN.light, face: 'square', hair: 'slick', hairColor: '#c9b48a', mustache: 'none', brows: 'angry', mouth: 'flat', glasses: 'monocle', outfit: 'suit', outfitColor: '#3a3a3a', tie: '#111' } },
    italy_amb: { name: 'Посол Италии синьор Бальбони', look: { skin: SKIN.tan, face: 'round', hair: 'bald', hairColor: '#333', mustache: 'none', brows: 'bushy', mouth: 'grin', outfit: 'military', outfitColor: '#1a1a1a', medals: 6, blush: true } },
    japan_amb: { name: 'Посол Японии барон Мацудайра', look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'thick', brows: 'normal', mouth: 'smile', glasses: 'round', outfit: 'suit', outfitColor: '#2a2a2a', tie: '#bc002d', hat: 'top', hatColor: '#111' } },
    roc_amb: { name: 'Посол Китайской Республики доктор Вэй', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'round', outfit: 'mao', outfitColor: '#3d4a5a' } },
    shirts: { name: 'Вождь «Зелёных рубашек»', look: { ...base, face: 'square', hair: 'slick', hairColor: '#111', mustache: 'thick', brows: 'angry', mouth: 'o', outfit: 'military', outfitColor: '#3f6b2e', medals: 1 } },
    trotsky: { name: 'Лев Троцкий, изгнанник', look: { skin: SKIN.light, face: 'oval', hair: 'curly', hairColor: '#ccc', beard: 'goatee', mustache: 'thick', brows: 'bushy', browColor: '#ccc', mouth: 'flat', glasses: 'round', outfit: 'suit', outfitColor: '#3a3530', tie: '#333' } },
    aviator: { name: 'Лётчица мисс Пенни Скайларк', look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#c97a3a', hat: 'flatcap', hatColor: '#6b4a2a', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'round', outfit: 'suit', outfitColor: '#7a5a3a', tie: '#f2ead6', blush: true } },
    professor: { name: 'Профессор Хиггинботтом из Принстона', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#ddd', mustache: 'walrus', brows: 'bushy', browColor: '#ddd', mouth: 'flat', glasses: 'round', outfit: 'suit', outfitColor: '#5a4a3a', tie: '#1f4e8c', hat: 'bowler', hatColor: '#222' } },
    prince: { name: 'Наследный принц в изгнании', look: { ...base, face: 'long', hair: 'slick', hairColor: '#222', mustache: 'pencil', brows: 'worried', mouth: 'smile', outfit: 'military', outfitColor: '#f2ead6', medals: 9, sash: '#1f4e8c' } },
    egypt_amb: { name: 'Посол ОАР Хасан эль-Масри', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#222', mustache: 'thick', brows: 'normal', mouth: 'smile', outfit: 'suit', outfitColor: '#3a3a3a', tie: '#ce1126' } },
  };
  return (r.era === '2000' && npc00(key, region, base, r)) || L[key];
}

// Эпохи
const ERAS = {
  '1960': {
    name: '1960-е', label: 'Холодная война', start: 1960,
    blurb: 'Ракетный кризис, Вьетнам, деколонизация. Вашингтон и Москва покупают вашу дружбу, а ЦРУ и КГБ — ваших полковников.',
    regions: ['latam', 'asia', 'africa'], regimes: ['junta', 'revolution', 'western'], titles: TITLES,
    intro: 'Впереди десятилетие: холодная война, ракетные кризисы, революции.',
    aid: [['usa', 60, 3], ['ussr', 60, 3], ['china', 65, 4], ['$patron', 60, 4]],
    vars: { blame: 'ЦРУ. Или КГБ', student_meme: 'Верните Элвиса!', swim_ref: 'Например, переплыть реку. Председатель Мао так делает, и все в восторге.', mast: 'МИРОВЫЕ НОВОСТИ' },
    defaultNames: { latam: 'Хосе Мария Альварадо', asia: 'Пхра Сомсак Ратанавонг', africa: 'Жозеф Мбеки-Нгуема' },
  },
  '1930': {
    name: '1930-е', label: 'Время диктаторов', start: 1930,
    blurb: 'Великая депрессия, Муссолини, Гитлер и Сталин, Лига Наций, которую никто не слушает. До большой войны — десять лет.',
    regions: ['latam30', 'europe30', 'asia30'], regimes: ['putsch', 'estado', 'front'], titles: TITLES_30,
    intro: 'Впереди десятилетие: Великая депрессия, марширующие «рубашки», Лига Наций и путь к новой мировой войне.',
    aid: [['usa', 60, 4], ['uk', 60, 4], ['france', 60, 4], ['germany', 60, 3], ['italy', 62, 4], ['ussr', 65, 4], ['japan', 60, 3]],
    vars: { blame: 'Коминтерн. Или германская разведка', student_meme: 'Свободу джазу!', swim_ref: 'Например, переплыть реку. Муссолини постоянно позирует полуголым перед кинокамерой, и все в восторге.', mast: 'ВЕЧЕРНИЙ ТЕЛЕГРАФ' },
    defaultNames: { latam30: 'Аугусто Себастьян Ферро', europe30: 'Владислав Чернович-Гроза', asia30: 'Принц Сурапонг Вонгсакди' },
  },
};

// Местный колорит речи: обращения, праздники, валюта «натурой», куда бегут деньги и т. п.
const REGION_TALK = {
  latam: { addr: 'сеньор', sir: 'сеньор', lady: 'сеньора', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'гринго', haven: 'Майами', exileTo: 'Мадрид', canteen: 'рис с фасолью', fruit_adj: 'Банановый', locale: 'тропиков', pay_in_kind: 'Бананами.', vegas: 'тропический Лас-Вегас', rebel: 'Команданте из гор', meeting: 'в казино' },
  asia: { addr: 'ваше превосходительство', sir: 'господин', lady: 'госпожа', holiday_acc: 'Новый год', holiday_dat: 'Новому году', gringo: 'фаранги', haven: 'Гонконг', exileTo: 'Лондон', canteen: 'пустой рис', fruit_adj: 'Каучуковый', locale: 'Юго-Восточной Азии', pay_in_kind: 'Каучуком. Жевать его нельзя.', vegas: 'азиатский Лас-Вегас', rebel: 'Командир повстанцев', meeting: 'в чайном домике' },
  africa: { addr: 'месье президент', sir: 'месье', lady: 'мадам', holiday_acc: 'День независимости', holiday_dat: 'Дню независимости', gringo: 'колонизаторы', haven: 'Париж', exileTo: 'Париж', canteen: 'маниок', fruit_adj: 'Шоколадный', locale: 'Африки', pay_in_kind: 'Какао-бобами.', vegas: 'африканский Монте-Карло', rebel: 'Командир повстанцев', meeting: 'в офицерском клубе' },
  latam30: { addr: 'сеньор', sir: 'сеньор', lady: 'сеньора', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'гринго', haven: 'Нью-Йорк', exileTo: 'Париж', canteen: 'фасоль с маисом', fruit_adj: 'Кофейный', locale: 'тропиков', pay_in_kind: 'Мешками кофе.', vegas: 'тропический Монте-Карло', rebel: 'Вожак повстанцев из сельвы', meeting: 'в казино' },
  europe30: { addr: 'ваше превосходительство', sir: 'пан', lady: 'пани', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'эти пижоны из Парижа', haven: 'Цюрих', exileTo: 'Вену', canteen: 'капустный суп', fruit_adj: 'Пшеничный', locale: 'Карпат', pay_in_kind: 'Мешками зерна.', vegas: 'Монте-Карло у подножия Карпат', rebel: 'Командир лесных партизан', meeting: 'в кофейне «Империал»' },
  asia30: { addr: 'ваше превосходительство', sir: 'господин', lady: 'госпожа', holiday_acc: 'праздник Сонгкран', holiday_dat: 'празднику Сонгкран', gringo: 'фаранги', haven: 'Сингапур', exileTo: 'Гонконг', canteen: 'пустой рис', fruit_adj: 'Рисовый', locale: 'Индокитая', pay_in_kind: 'Мешками риса.', vegas: 'азиатский Монте-Карло', rebel: 'Командир подпольщиков', meeting: 'в чайном домике' },
};
const FAITH_TALK = {
  catholic: { priest_open: 'Сын мой... Простите, {sir} {title}.', heavens: 'небесам', faith_quip: 'Небеса пока не голосуют. Но вот прихожане...', sermon: 'проповеди', faith_appeal: 'Я напишу в Ватикан... или куда следует.', temple_loc: 'в церкви', righteous: 'Церковь называет вас «христианином года»' },
  orthodox: { priest_open: 'Чадо... Простите, {sir} {title}.', heavens: 'небесам', faith_quip: 'Небеса пока не голосуют. Но вот прихожане...', sermon: 'проповеди', faith_appeal: 'Я предам это заведение анафеме... или хотя бы напишу в газету.', temple_loc: 'в церкви', righteous: 'Патриарх называет вас «праведником года»' },
  buddhist: { priest_open: 'Почтенный мирянин... Простите, {sir} {title}.', heavens: 'Будде', faith_quip: 'Будда в выборах не участвует. Но вот его последователи...', sermon: 'проповеди', faith_appeal: 'Монахи уйдут в медитацию протеста... на сорок дней.', temple_loc: 'в храме', righteous: 'Монахи называют вас «милосердным правителем»' },
  chief: { priest_open: 'Сын мой... Простите, {sir} {title}. Старейшины велели передать:', heavens: 'предкам', faith_quip: 'Предки уже не голосуют. Но вот их внуки...', sermon: 'речи на совете старейшин', faith_appeal: 'Я созову совет старейшин... и предков.', temple_loc: 'в доме старейшин', righteous: 'Старейшины называют вас «мудрым отцом»' },
};
// Титулы правителя по регионам (первый — по умолчанию) и их падежи: [родительный, творительный]
const REGION_TITLES = {
  latam: ['Генералиссимус', 'Каудильо', 'Пожизненный Президент', 'Команданте', 'Благодетель', 'Отец Нации', 'Спаситель Отечества', 'Маршал'],
  asia: ['Отец Нации', 'Маршал', 'Пожизненный Президент', 'Великий Кормчий', 'Генералиссимус', 'Благодетель', 'Верховный Вождь', 'Спаситель Отечества'],
  africa: ['Пожизненный Президент', 'Отец Нации', 'Маршал', 'Генералиссимус', 'Мудрый Кормчий', 'Верховный Вождь', 'Благодетель', 'Спаситель Отечества'],
  latam30: ['Каудильо', 'Генералиссимус', 'Пожизненный Президент', 'Благодетель Отечества', 'Вождь Нации', 'Маршал', 'Отец Народов', 'Регент'],
  europe30: ['Регент', 'Маршал', 'Вождь Нации', 'Воевода', 'Генералиссимус', 'Пожизненный Президент', 'Отец Народов', 'Благодетель Отечества'],
  asia30: ['Фельдмаршал', 'Регент', 'Отец Нации', 'Маршал', 'Великий Покровитель', 'Генералиссимус', 'Пожизненный Премьер', 'Благодетель'],
};
const TITLE_FORMS = {
  'Генералиссимус': ['Генералиссимуса', 'Генералиссимусом'], 'Каудильо': ['Каудильо', 'Каудильо'], 'Команданте': ['Команданте', 'Команданте'],
  'Пожизненный Президент': ['Пожизненного Президента', 'Пожизненным Президентом'], 'Пожизненный Премьер': ['Пожизненного Премьера', 'Пожизненным Премьером'],
  'Благодетель': ['Благодетеля', 'Благодетелем'], 'Благодетель Отечества': ['Благодетеля Отечества', 'Благодетелем Отечества'],
  'Отец Нации': ['Отца Нации', 'Отцом Нации'], 'Отец Народов': ['Отца Народов', 'Отцом Народов'], 'Спаситель Отечества': ['Спасителя Отечества', 'Спасителем Отечества'],
  'Маршал': ['Маршала', 'Маршалом'], 'Фельдмаршал': ['Фельдмаршала', 'Фельдмаршалом'], 'Регент': ['Регента', 'Регентом'], 'Воевода': ['Воеводы', 'Воеводой'],
  'Великий Кормчий': ['Великого Кормчего', 'Великим Кормчим'], 'Мудрый Кормчий': ['Мудрого Кормчего', 'Мудрым Кормчим'], 'Великий Покровитель': ['Великого Покровителя', 'Великим Покровителем'],
  'Верховный Вождь': ['Верховного Вождя', 'Верховным Вождём'], 'Вождь Нации': ['Вождя Нации', 'Вождём Нации'],
};
const RELATIVES_BY_STYLE = {
  latam: { defense: 'Кузен Рамон', economy: 'Шурин Бенедикт', police: 'Тётушка Консуэло', propaganda: 'Племянник Тито', foreign: 'Зять Октавио', abroad: 'в Майами' },
  asia: { defense: 'Кузен Сомчай', economy: 'Шурин Прасит', police: 'Тётушка Мали', propaganda: 'Племянник Бун', foreign: 'Зять Анан', abroad: 'в Сингапуре' },
  africa: { defense: 'Кузен Ипполит', economy: 'Шурин Бенедикт', police: 'Тётушка Мариам', propaganda: 'Племянник Тити', foreign: 'Зять Октав', abroad: 'в Париже' },
  europe: { defense: 'Кузен Збышек', economy: 'Шурин Бенедикт', police: 'Тётушка Ядвига', propaganda: 'Племянник Юзек', foreign: 'Зять Октавиан', abroad: 'в Вене' },
};

// ================= Эпоха 2000-х =================
Object.assign(COUNTRIES, {
  russia: { name: 'Россия', bloc: 'east', flag: 'russia', leaders: [[2008.35, 'президент Путин'], [9999, 'президент Медведев (и премьер Путин)']] },
  eu: { name: 'Евросоюз', bloc: 'west', flag: 'eu', leaders: [[9999, 'Еврокомиссия в Брюсселе']] },
  saudi: { name: 'Саудовская Аравия', bloc: 'neutral', flag: 'saudi', leaders: [[2005.6, 'король Фахд'], [9999, 'король Абдалла']] },
  iran: { name: 'Иран', bloc: 'neutral', flag: 'iran', leaders: [[2005.6, 'президент Хатами'], [9999, 'президент Ахмадинежад']] },
  turkey: { name: 'Турция', bloc: 'neutral', flag: 'turkey', leaders: [[2002.88, 'премьер Эджевит'], [2003.2, 'премьер Гюль'], [9999, 'премьер Эрдоган']] },
  libya: { name: 'Ливия', bloc: 'neutral', flag: 'libya', leaders: [[9999, 'полковник Каддафи']] },
  sa: { name: 'ЮАР', bloc: 'neutral', flag: 'sa', leaders: [[2008.72, 'президент Мбеки'], [2009.35, 'президент Мотланте'], [9999, 'президент Зума']] },
});
COUNTRIES.usa.leaders00 = [[2001.05, 'президент Клинтон'], [2009.05, 'президент Буш-младший'], [9999, 'президент Обама']];
COUNTRIES.china.leaders00 = [[2003.2, 'председатель Цзян Цзэминь'], [9999, 'председатель Ху Цзиньтао']];
COUNTRIES.uk.leaders00 = [[2007.5, 'премьер Блэр'], [9999, 'премьер Браун']];
COUNTRIES.france.leaders00 = [[2007.4, 'президент Ширак'], [9999, 'президент Саркози']];
Object.assign(FLAGS, {
  russia: `<rect width="30" height="6.7" fill="#fff"/><rect y="6.7" width="30" height="6.7" fill="#0039a6"/><rect y="13.3" width="30" height="6.7" fill="#d52b1e"/>`,
  eu: `<rect width="30" height="20" fill="#003399"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${15 + Math.cos(i * Math.PI / 6) * 6}" cy="${10 + Math.sin(i * Math.PI / 6) * 6}" r="0.9" fill="#ffcc00"/>`).join('')}`,
  saudi: `<rect width="30" height="20" fill="#006c35"/><path d="M8 8 h14" stroke="#fff" stroke-width="1.2" stroke-dasharray="1.5 0.8"/><path d="M8 13 H22 L23 12" stroke="#fff" stroke-width="1" fill="none"/>`,
  iran: `<rect width="30" height="6.7" fill="#239f40"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#da0000"/><circle cx="15" cy="10" r="2" fill="none" stroke="#da0000" stroke-width="0.8"/>`,
  turkey: `<rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.3" cy="10" r="4" fill="#e30a17"/><circle cx="17.5" cy="10" r="1.6" fill="#fff"/>`,
  libya: `<rect width="30" height="20" fill="#009a3e"/>`,
  sa: `<rect width="30" height="20" fill="#fff"/><rect width="30" height="7" fill="#de3831"/><rect y="13" width="30" height="7" fill="#002395"/><path d="M0 0 L13 10 L0 20 Z" fill="#ffb612"/><path d="M0 2 L11 10 L0 18 Z" fill="#000"/><path d="M10 10 L30 10" stroke="#007a4d" stroke-width="4"/><path d="M0 0 L13 10 L0 20" stroke="#007a4d" stroke-width="2.6" fill="none"/>`,
});
Object.assign(REGIME_TYPES, {
  heir: {
    name: 'Наследник', icon: '👑',
    desc: 'Страну вам оставил папа, правивший тридцать лет. Генералы помнят вас в коротких штанишках, кланы — в долгах.',
    fx: { treasury: 20, army: 6 }, fac: { oligarchs: { a: 20 }, hawks: { a: 5 }, liberals: { a: -6 } }, rel: { russia: 5 },
  },
  reformer: {
    name: 'Реформатор (на словах)', icon: '💻',
    desc: 'Вы обещали демократию, интернет и рынок. Запад аплодирует, МВФ даёт кредиты, старые генералы точат ножи.',
    fx: { economy: 5, support: 8, fear: -10 }, fac: { liberals: { a: 22 }, hawks: { a: -15 }, oligarchs: { a: -5 } }, rel: { usa: 15, eu: 15, uk: 6, france: 6, russia: -8, china: -4 },
  },
  strongman: {
    name: 'Вертикаль власти', icon: '🦾',
    desc: 'Стабильность, порядок и рейтинг девяносто семь процентов. Москва и Пекин всё понимают, Брюссель выражает озабоченность.',
    fx: { fear: 15, army: 10, support: -2 }, fac: { liberals: { a: -15 }, hawks: { a: 15 } }, rel: { russia: 15, china: 12, usa: -8, eu: -10 },
  },
});

Object.assign(REGIONS, {
  africa00: {
    name: 'Африка', short: 'Африка',
    blurb: 'Нефть, алмазы и новые дороги, которые строят китайцы. Мобильные телефоны появились раньше, чем электричество в деревнях.',
    country: 'Республика Кассанга', capital: 'Порту-Либерту', currency: 'кассангский кванзо',
    exports: 'нефть и алмазы', exportGen: 'нефти', company: '«ПетроГлобал Оффшор»', patron: 'china',
    sport: 'финал Кубка африканских наций', rival: 'Республика Северная Луэна', rivalShort: 'Северная Луэна',
    disputed: 'алмазная долина Кванго-Норте', faithLeader: 'Пастор мегацеркви', capitalSquare: 'площади Независимости',
    jungle: 'буше провинции Кабинда-Сул', nephew: 'Нелсиньо',
    countries: ['china', 'usa', 'france', 'uk', 'russia', 'sa', 'libya'],
    relInit: { china: 60, usa: 45, france: 45, uk: 45, russia: 40, sa: 50, libya: 45 },
    flag: `<rect width="30" height="10" fill="#c1272d"/><rect y="10" width="30" height="10" fill="#111"/><path d="M15 5 L16.4 8.6 L20 8.7 L17.2 11 L18.2 14.6 L15 12.5 L11.8 14.6 L12.8 11 L10 8.7 L13.6 8.6 Z" fill="#f2c14e"/>`,
    leaderSkin: 'dark', era: '2000', style: 'africa', faithStyle: 'evangelical', exile: 'Лиссабоне', critters: 'мобильных телефонов', netStart: 1,
    factions: {
      left: { name: 'Бывшие повстанцы', short: 'Ветераны', icon: '✊', desc: 'Подписали мир с правительством. Автоматы закопали, но неглубоко.' },
      liberals: { name: 'Блогеры и студенты', short: 'Блогеры', icon: '📱', desc: 'Пишут посты с телефонов, пока работает связь. Связь работает всё лучше.' },
      faith: { name: 'Евангельские мегацеркви', short: 'Пасторы', icon: '✝️', desc: 'Сорок тысяч прихожан на стадионе каждое воскресенье. И пастор с джетом.' },
      oligarchs: { name: 'Нефтяные семьи', short: 'Нефтяники', icon: '🛢️', desc: 'Семьи с тремя паспортами и пятью виллами в Лиссабоне. Половина из них — ваши родственники.' },
      hawks: { name: 'Генералы-бизнесмены', short: 'Генералы', icon: '⚔️', desc: 'Каждому генералу принадлежит алмазный прииск, банк и футбольный клуб.' },
    },
    advisors: {
      defense: { name: 'Генерал Фелисберту «Калаш» Мавинга', bio: 'У генерала пять мобильных телефонов. Говорит, что каждый для отдельной войны.', look: { skin: SKIN.dark, face: 'square', hair: 'short', hairColor: '#111', hat: 'cap', hatColor: '#3d4a2a', glasses: 'aviator', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#3d4a2a', medals: 15 } },
      economy: { name: 'Доктор Аделаида Сантуш', bio: 'Выпускница Гарварда. Делает презентации на 140 слайдов. Последний слайд «Выводы» всегда пустой.', look: { skin: SKIN.brown, face: 'oval', hair: 'bun', hairColor: '#111', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#2a4a7a', tie: 'none', earring: true, sweat: true } },
      police: { name: 'Полковник Жоаким «Симка» Нету', bio: 'Подслушивает все телефоны страны с тех пор, как в ней появилась сотовая связь. То есть с прошлого вторника.', look: { skin: SKIN.deep, face: 'oval', hair: 'bald', hairColor: '#111', glasses: 'aviator', mustache: 'none', beard: 'goatee', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#141414', tie: '#111' } },
      propaganda: { name: 'Мадам Глория Мукенге', bio: 'Хозяйка государственного телеканала. Уверена, что интернет — это мода, как диско. Скоро пройдёт.', look: { skin: SKIN.dark, face: 'round', hair: 'long', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'robe', outfitColor: '#e0a31f', trim: '#c1272d', blush: true, earring: true } },
      foreign: { name: 'Министр Агостинью да Кошта', bio: 'Летает в Пекин чаще, чем домой. Учит китайский по самоучителю «Нефть в обмен на кредиты».', look: { skin: SKIN.brown, face: 'long', hair: 'short', hairColor: '#777', mustache: 'pencil', brows: 'normal', mouth: 'smile', glasses: 'round', outfit: 'suit', outfitColor: '#ece6d6', tie: '#c1272d' } },
    },
  },
  mideast00: {
    name: 'Ближний Восток', short: 'Ближний Восток',
    blurb: 'Нефть, финики и спутниковые тарелки на каждой крыше. Вашингтон воюет с террором, «Аль-Джазира» — с вашим имиджем.',
    country: 'Республика Аль-Ваха', capital: 'Дар-эн-Нахль', currency: 'вахский динар',
    exports: 'нефть и финики', exportGen: 'нефти', company: '«Галф Энерджи Холдингс»', patron: 'usa',
    sport: 'финал Кубка Азии по футболу', rival: 'Королевство Аль-Джабаль', rivalShort: 'Аль-Джабаль',
    disputed: 'оазис Бир-Самир', faithLeader: 'Верховный муфтий', capitalSquare: 'площади Освобождения',
    jungle: 'песках у южной границы', nephew: 'Карим',
    countries: ['usa', 'russia', 'china', 'eu', 'saudi', 'iran', 'turkey'],
    relInit: { usa: 55, russia: 40, china: 42, eu: 45, saudi: 50, iran: 40, turkey: 48 },
    flag: `<rect width="30" height="20" fill="#f2ead6"/><rect width="9" height="20" fill="#1e7a3c"/><rect x="9" width="21" height="6.7" fill="#c1272d"/><rect x="9" y="13.3" width="21" height="6.7" fill="#111"/><circle cx="19.5" cy="10" r="2" fill="#1e7a3c"/>`,
    leaderSkin: 'tan', era: '2000', style: 'mideast', faithStyle: 'islam', exile: 'Лондоне', critters: 'спутниковых тарелок', netStart: 3,
    factions: {
      left: { name: 'Борцы за справедливость', short: 'Борцы', icon: '✊', desc: 'Раздают бедным суп и листовки. Обещают справедливость. Какую именно, уточнят после победы.' },
      liberals: { name: 'Блогеры и молодёжь', short: 'Блогеры', icon: '📱', desc: 'Половине страны меньше двадцати пяти лет. И у всех есть телефон.' },
      faith: { name: 'Улемы и муфтият', short: 'Улемы', icon: '☪️', desc: 'Пятничную проповедь слышит вся страна. Её содержание вы узнаёте последним.' },
      oligarchs: { name: 'Шейхи и подрядчики', short: 'Шейхи', icon: '🛢️', desc: 'Строят башни, торговые центры и острова в форме вашего профиля.' },
      hawks: { name: 'Республиканская гвардия', short: 'Гвардия', icon: '⚔️', desc: 'Лучшие танки страны стоят не на границе, а вокруг дворца. На всякий случай.' },
    },
    advisors: {
      defense: { name: 'Генерал Халид аль-Бурджи', bio: 'Купил двадцать истребителей. Летать на них умеют двое, и оба — инструкторы из Техаса.', look: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#111', hat: 'cap', hatColor: '#4b5320', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#4b5320', medals: 16 } },
      economy: { name: 'Доктор Тарик Нафтави', bio: 'Знает цену барреля в любую секунду. Даже во сне: кричит цифры и просыпается от падения котировок.', look: { skin: SKIN.tan, face: 'long', hair: 'combover', hairColor: '#333', glasses: 'square', beard: 'goatee', mustache: 'thick', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#5a5a5a', tie: '#1e7a3c', sweat: true } },
      police: { name: 'Полковник Самир Хаддад', bio: 'Глава мухабарата. Читает вашу почту раньше вас. Иногда даже отвечает на неё.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'aviator', mustache: 'thick', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#18181a', tie: '#111' } },
      propaganda: { name: 'Лейла аль-Аскари', bio: 'Глава госТВ. Каждый вечер три часа новостей о вас и пять минут о погоде. Хорошая погода — тоже ваша заслуга.', look: { skin: SKIN.tan, face: 'oval', hair: 'long', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'suit', outfitColor: '#7a1f3d', tie: 'none', earring: true, blush: true } },
      foreign: { name: 'Шейх-министр Фейсал бин Рашид', bio: 'Учился в Оксфорде. Играет в гольф с послами, а с министрами ездит на соколиную охоту.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#222', hat: 'keffiyeh', hatColor: '#f4f1ea', beard: 'goatee', mustache: 'thick', brows: 'normal', mouth: 'smirk', outfit: 'robe', outfitColor: '#f4f1ea', trim: '#d6a63a' } },
    },
  },
  centralasia00: {
    name: 'Средняя Азия', short: 'Средняя Азия',
    blurb: 'Газ, хлопок и золотые статуи. Москва, Пекин и Вашингтон наперебой предлагают дружбу, а вы улыбаетесь всем троим сразу.',
    country: 'Республика Алтынстан', capital: 'Алтынабад', currency: 'алтынский манат',
    exports: 'газ и хлопок', exportGen: 'газа', company: '«Газтранзит-Холдинг»', patron: 'russia',
    sport: 'финал Кубка Центральной Азии по футболу', rival: 'Республика Сарыкум', rivalShort: 'Сарыкум',
    disputed: 'пограничный кишлак Кошбулак', faithLeader: 'Верховный муфтий', capitalSquare: 'площади Независимости',
    jungle: 'горах на юге', nephew: 'Тимурчик',
    countries: ['russia', 'china', 'usa', 'eu', 'turkey', 'iran'],
    relInit: { russia: 60, china: 50, usa: 42, eu: 40, turkey: 50, iran: 42 },
    flag: `<rect width="30" height="20" fill="#1fa3a3"/><rect x="0" width="5" height="20" fill="#d6a63a"/><circle cx="18" cy="10" r="4" fill="#f2c14e"/><circle cx="19.4" cy="9" r="3.4" fill="#1fa3a3"/>`,
    leaderSkin: 'tan', era: '2000', style: 'steppe', faithStyle: 'islam', exile: 'Москве', critters: 'баранов', netStart: 1,
    factions: {
      left: { name: 'Демократы Алтынстана', short: 'Демократы', icon: '✊', desc: 'Бывшие министры и их сторонники. Лидеры живут в Лондоне и Москве и пишут гневные статьи на сайтах, которые у вас заблокированы.' },
      liberals: { name: 'Блогеры и студенты', short: 'Блогеры', icon: '📱', desc: 'Смотрят, как соседи свергают президентов, и делают выводы. Пока только в комментариях.' },
      faith: { name: 'Духовное управление и аксакалы', short: 'Аксакалы', icon: '☪️', desc: 'Старейшины махалли. Знают всё обо всех, помнят всё за всех.' },
      oligarchs: { name: 'Газовые и хлопковые кланы', short: 'Кланы', icon: '🛢️', desc: 'Три великих клана. Два из них ненавидят друг друга, третий — вас.' },
      hawks: { name: 'Силовики', short: 'Силовики', icon: '⚔️', desc: 'Армия, госбезопасность и налоговая. В свободное время охраняют свои бизнесы.' },
    },
    advisors: {
      defense: { name: 'Генерал Рустам Батыров', bio: 'Фуражка у генерала размером с юрту. Танков в бою не видел, только в кино. Зато лично отбирает коней для парадов.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#111', hat: 'cap', hatColor: '#3d5a3a', mustache: 'none', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#3d5a3a', medals: 16, blush: true } },
      economy: { name: 'Доктор Фарход Газимов', bio: 'Автор «Хлопковой пятилетки». Пятилетка идёт уже девятый год и перевыполняется на бумаге.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#333', hat: 'tubeteika', hatColor: '#1a1a1a', glasses: 'round', mustache: 'thick', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#4a4a44', tie: '#1fa3a3', sweat: true } },
      police: { name: 'Генерал Тимур Саидов', bio: 'Глава СНБ. Знает, кто что сказал на чьей свадьбе. И кто с кем сидел за столом.', look: { skin: SKIN.light, face: 'square', hair: 'combover', hairColor: '#444', glasses: 'square', mustache: 'none', brows: 'angry', mouth: 'flat', outfit: 'suit', outfitColor: '#1d1f24', tie: '#7a1a1a' } },
      propaganda: { name: 'Гульшат Ордабаева', bio: 'Народная поэтесса. Пишет новый гимн каждую неделю. Старый каждую неделю отменяют.', look: { skin: SKIN.tan, face: 'round', hair: 'bun', hairColor: '#1a1210', hat: 'tubeteika', hatColor: '#7a1f3d', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'robe', outfitColor: '#1fa3a3', trim: '#d6a63a', blush: true, earring: true } },
      foreign: { name: 'Министр Нурлан Векторов', bio: 'Автор «многовекторной политики». Улыбается Москве, Пекину и Вашингтону одновременно, тремя разными улыбками.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#222', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#2a2d36', tie: '#d6a63a' } },
    },
  },
});

ERAS['2000'] = {
  name: '2000-е', label: 'Эпоха интернета', start: 2000,
  blurb: '11 сентября, нефтяной бум, цветные революции и «Фейсбук». Интернет растёт сам: он двигает экономику и сплачивает оппозицию.',
  regions: ['africa00', 'mideast00', 'centralasia00'], regimes: ['heir', 'reformer', 'strongman'], titles: ['Пожизненный Президент'],
  intro: 'Впереди десятилетие: война с террором, нефтяной бум, цветные революции и интернет, который скоро будет в каждом кармане.',
  aid: [['usa', 60, 3], ['eu', 60, 4], ['china', 55, 3], ['russia', 60, 4], ['saudi', 60, 4], ['libya', 60, 4], ['$patron', 60, 4]],
  vars: { blame: 'ЦРУ. Или хакеры. Или кто-то из Фейсбука', student_meme: 'Верните интернет-кафе!', swim_ref: 'Например, сфотографироваться с голым торсом на рыбалке. В Москве это отлично работает.', mast: 'ГЛОБАЛ НЬЮС 24', rebel_icon: 'свой флаг', friendly_paper: 'телеканалу «Аль-Джазира»', friendly_res: 'Интервью посмотрели сорок миллионов человек. Вашингтон запомнил каждую минуту.' },
  defaultNames: { africa00: 'Жозе Эдуарду Мавунду', mideast00: 'Башир Абдель-Карим', centralasia00: 'Нурсултан Алтынбаев' },
};
ERAS['1960'].vars.rebel_icon = 'портрет Маркса';
ERAS['1960'].vars.china_offer = 'Председатель Мао предлагает бесплатно';
ERAS['1960'].vars.china_quip = 'Москва будет недовольна. Москва и Пекин сейчас не разговаривают. Даже открытками не обмениваются.';
ERAS['1960'].vars.china_workers = 'Двадцать тысяч китайских строителей прибыли с цитатниками и лопатами.';
ERAS['2000'].vars.china_offer = 'Пекин предлагает в кредит под залог вашей ' + 'экспортной продукции';
ERAS['1960'].vars.china_gift = 'цитатник Мао. С пометками на полях';
ERAS['2000'].vars.china_gift = 'фарфоровую панду. Внутри что-то тихо жужжит';
ERAS['2000'].vars.china_quip = 'Кредит на девяносто девять лет. Китайцы умеют ждать. А Вашингтон будет нервничать.';
ERAS['2000'].vars.china_workers = 'Двадцать тысяч китайских строителей прибыли с касками, смартфонами и собственной столовой.';
ERAS['1930'].vars.rebel_icon = 'портрет Маркса';
ERAS['1960'].vars.friendly_paper = 'газете «Правда»';
ERAS['1930'].vars.friendly_paper = 'газете «Правда»';
ERAS['1960'].vars.friendly_res = ERAS['1930'].vars.friendly_res = 'В Москве ваш портрет напечатали рядом с отчётом о надоях. Почётно.';

Object.assign(REGION_TALK, {
  africa00: { addr: 'камарада президент', sir: 'камарада', lady: 'дона', holiday_acc: 'День независимости', holiday_dat: 'Дню независимости', gringo: 'эти «инвесторы»', haven: 'Дубай', exileTo: 'Лиссабон', canteen: 'фунжи', fruit_adj: 'Алмазный', locale: 'Африки', pay_in_kind: 'Талонами на бензин.', vegas: 'африканский Дубай', rebel: 'Командир повстанцев из буша', meeting: 'в VIP-ложе ночного клуба' },
  mideast00: { addr: 'ваше превосходительство', sir: 'господин', lady: 'госпожа', holiday_acc: 'Рамадан', holiday_dat: 'Рамадану', gringo: 'эти нефтяники из Хьюстона', haven: 'Женеву', exileTo: 'Лондон', canteen: 'лепёшки с хумусом', fruit_adj: 'Нефтяной', locale: 'Ближнего Востока', pay_in_kind: 'Финиками.', vegas: 'второй Дубай', rebel: 'Командир подполья', meeting: 'в шатре на верблюжьих бегах' },
  centralasia00: { addr: 'уважаемый президент', sir: 'господин', lady: 'ханум', holiday_acc: 'Навруз', holiday_dat: 'Наврузу', gringo: 'эти газовщики из Москвы', haven: 'Дубай', exileTo: 'Москву', canteen: 'пустой плов', fruit_adj: 'Хлопковый', locale: 'Великой степи', pay_in_kind: 'Хлопком.', vegas: 'Лас-Вегас посреди пустыни', rebel: 'Командир горных боевиков', meeting: 'в чайхане' },
});
Object.assign(FAITH_TALK, {
  evangelical: { priest_open: 'Брат мой... Простите, {sir} {title}. Этой ночью Господь говорил со мной.', heavens: 'небесам', faith_quip: 'Небеса не голосуют. А прихожане пастора голосуют, по сорок тысяч за воскресенье.', sermon: 'проповеди на стадионе', faith_appeal: 'Я помолюсь против вас на стадионе. В прямом эфире.', temple_loc: 'в шатре мегацеркви', righteous: 'Пастор называет вас «помазанником года»' },
  islam: { priest_open: 'Да хранит вас Всевышний, {sir} {title}. Но выслушайте старика.', heavens: 'Всевышнему', faith_quip: 'Всевышний не голосует. Но пятничную проповедь слышат все.', sermon: 'пятничной проповеди', faith_appeal: 'Я скажу об этом в пятничной проповеди.', temple_loc: 'в мечети', righteous: 'Муфтий называет вас «справедливым правителем»' },
});
Object.assign(REGION_TITLES, {
  africa00: ['Президент-Основатель', 'Отец Нации', 'Архитектор Мира', 'Генерал-Президент', 'Пожизненный Президент', 'Верховный Вождь', 'Благодетель', 'Маршал'],
  mideast00: ['Брат-Лидер', 'Президент-Лидер', 'Отец Нации', 'Вождь Революции', 'Защитник Нации', 'Пожизненный Президент', 'Маршал', 'Генералиссимус'],
  centralasia00: ['Алтынбаши', 'Лидер Нации', 'Сердар', 'Великий Аксакал', 'Отец Всех Алтынцев', 'Пожизненный Президент', 'Генерал-Президент', 'Президент-Реформатор'],
});
Object.assign(TITLE_FORMS, {
  'Президент-Основатель': ['Президента-Основателя', 'Президентом-Основателем'], 'Архитектор Мира': ['Архитектора Мира', 'Архитектором Мира'],
  'Генерал-Президент': ['Генерала-Президента', 'Генералом-Президентом'], 'Брат-Лидер': ['Брата-Лидера', 'Братом-Лидером'],
  'Президент-Лидер': ['Президента-Лидера', 'Президентом-Лидером'], 'Вождь Революции': ['Вождя Революции', 'Вождём Революции'],
  'Защитник Нации': ['Защитника Нации', 'Защитником Нации'], 'Алтынбаши': ['Алтынбаши', 'Алтынбаши'], 'Лидер Нации': ['Лидера Нации', 'Лидером Нации'],
  'Сердар': ['Сердара', 'Сердаром'], 'Великий Аксакал': ['Великого Аксакала', 'Великим Аксакалом'], 'Отец Всех Алтынцев': ['Отца Всех Алтынцев', 'Отцом Всех Алтынцев'],
  'Президент-Реформатор': ['Президента-Реформатора', 'Президентом-Реформатором'],
});
Object.assign(RELATIVES_BY_STYLE, {
  mideast: { defense: 'Кузен Тарик', economy: 'Шурин Наджиб', police: 'Тётушка Фатима', propaganda: 'Племянник Зияд', foreign: 'Зять Омар', abroad: 'в Лондоне' },
  steppe: { defense: 'Кузен Бахтияр', economy: 'Шурин Ильдар', police: 'Тётушка Гульнара', propaganda: 'Племянник Санжар', foreign: 'Зять Азиз', abroad: 'в Дубае' },
});

// Персонажи 2000-х (заменяют или дополняют общих)
function npc00(key, region, base, r) {
  const M = {
    usa_amb: { name: 'Посол США мистер Дуглас', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#c9a640', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#1f2a44', tie: '#b22234' } },
    china_amb: { name: 'Посол КНР господин Чжан', look: { skin: SKIN.light, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'suit', outfitColor: '#2a2a2a', tie: '#c1272d', glasses: 'square' } },
    russia_amb: { name: 'Посол России Аркадий Трубопроводов', look: { skin: SKIN.light, face: 'round', hair: 'short', hairColor: '#999', mustache: 'none', brows: 'bushy', browColor: '#777', mouth: 'smirk', outfit: 'suit', outfitColor: '#2a2d36', tie: '#0039a6', blush: true } },
    eu_amb: { name: 'Еврокомиссар фрау Хельга Регламент', look: { skin: SKIN.light, face: 'long', hair: 'bun', hairColor: '#c9b48a', mustache: 'none', brows: 'worried', mouth: 'flat', glasses: 'square', outfit: 'suit', outfitColor: '#003399', tie: 'none', earring: true } },
    blogger: { name: 'Блогер под ником Свободный_Орёл', look: { ...base, face: 'oval', hair: 'curly', hairColor: '#1a1a1a', mustache: 'none', beard: 'goatee', brows: 'angry', mouth: 'grin', glasses: 'square', outfit: 'hoodie', outfitColor: '#3a3a4a' } },
    techboss: { name: 'Мистер Брэд из Кремниевой долины', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#7a5a3a', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'round', outfit: 'hoodie', outfitColor: '#1d1d1d' } },
    prosecutor: { name: 'Прокурор из Гааги мэтр ван дер Берг', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#bbb', mustache: 'none', brows: 'worried', mouth: 'flat', glasses: 'round', outfit: 'robe', outfitColor: '#141414', trim: '#f4f1ea' } },
    worker: { name: 'Профсоюзный активист', look: { ...base, face: 'square', hair: 'short', hairColor: '#222', mustache: 'thick', brows: 'angry', mouth: 'frown', outfit: 'hoodie', outfitColor: '#5a6a7a' } },
    student: { name: 'Студентка-активистка', look: { ...base, face: 'oval', hair: 'long', hairColor: '#2b1b10', mustache: 'none', brows: 'angry', mouth: 'o', glasses: 'square', outfit: 'hoodie', outfitColor: '#c95b3a', earring: true } },
    priest: { name: r.faithLeader, look: r.faithStyle === 'islam'
      ? { ...base, face: 'long', hair: 'short', hairColor: '#ddd', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ddd', mouth: 'flat', outfit: 'robe', outfitColor: '#ece6d6', trim: '#8a7a5a', hat: 'turban', hatColor: '#f4f1ea', glasses: 'round' }
      : { ...base, face: 'round', hair: 'short', hairColor: '#111', mustache: 'pencil', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#5a2a7a', tie: '#e2b33c', glasses: 'aviator', earring: false } },
  };
  return M[key];
}

// Международный клуб диктаторов (вымышленный) — для сравнения в финале
// Клуб диктаторов: реальные правители эпохи. Сравнение по годам фактической власти.
const DICTATOR_CLUB = {
  '1930': [
    { name: 'Франсиско Франко', land: 'Испания', span: '1939–1975', years: 36, note: 'Пришёл к власти после гражданской войны, десятилетиями преследовал республиканцев. Умер у власти, назначив преемником короля.' },
    { name: 'Антониу Салазар', land: 'Португалия', span: '1932–1968', years: 36, note: 'Создатель «Нового государства». После инсульта его тихо сменили, но до смерти он, по рассказам, считал себя премьером: для него печатали отдельный номер газеты.' },
    { name: 'Рафаэль Трухильо', land: 'Доминиканская Республика', span: '1930–1961', years: 31, note: 'Переименовал столицу в Сьюдад-Трухильо. В 1937 году устроил резню гаитян на границе. Убит заговорщиками.' },
    { name: 'Миклош Хорти', land: 'Венгрия', span: '1920–1944', years: 24, note: 'Адмирал без флота, регент королевства без короля. Отстранён немцами, умер в эмиграции в Португалии.' },
    { name: 'Жетулиу Варгас', land: 'Бразилия', span: '1930–1945, 1951–1954', years: 18, note: 'Распустил конгресс и провозгласил «Новое государство». В 1954 году застрелился, оставив письмо: «Ухожу из жизни, чтобы войти в историю».' },
    { name: 'Плек Пибунсонграм', land: 'Таиланд', span: '1938–1944, 1948–1957', years: 15, note: 'Переименовал Сиам в Таиланд и предписал подданным носить шляпы. Свергнут, умер в эмиграции в Японии.' },
    { name: 'Хорхе Убико', land: 'Гватемала', span: '1931–1944', years: 13, note: 'Объезжал страну на мотоцикле и считал себя похожим на Наполеона. Свергнут всеобщей забастовкой.' },
    { name: 'Максимилиано Эрнандес Мартинес', land: 'Сальвадор', span: '1931–1944', years: 13, note: 'Теософ, лечил эпидемии цветной водой. В 1932 году армия подавила крестьянское восстание, погибли десятки тысяч. Ушёл после забастовки.' },
    { name: 'Кароль II', land: 'Румыния', span: '1930–1940', years: 10, note: 'Король, установивший личную диктатуру. Отрёкся и уехал с возлюбленной и поездом, гружённым ценностями.' },
    { name: 'Юзеф Пилсудский', land: 'Польша', span: '1926–1935', years: 9, note: 'Взял власть Майским переворотом и правил, часто занимая лишь пост военного министра. Умер у власти.' },
    { name: 'Херардо Мачадо', land: 'Куба', span: '1925–1933', years: 8, note: 'Продлил себе срок через послушный конгресс и выборы без соперников. Свергнут всеобщей забастовкой, улетел на самолёте на Багамы.' },
    { name: 'Иоаннис Метаксас', land: 'Греция', span: '1936–1941', years: 5, note: 'Режим «4 августа». В 1940 году ответил Муссолини на ультиматум словом «Нет». Умер у власти.' },
  ],
  '1960': [
    { name: 'Фидель Кастро', land: 'Куба', span: '1959–2008', years: 49, note: 'По подсчётам кубинской разведки, пережил 638 покушений. Однопартийная система, политзаключённые, эмиграция миллиона кубинцев. Передал власть брату.' },
    { name: 'Альфредо Стресснер', land: 'Парагвай', span: '1954–1989', years: 35, note: 'Восемь раз выигрывал выборы без настоящих соперников. Свергнут собственным генералом, умер в Бразилии.' },
    { name: 'Мобуту Сесе Секо', land: 'Заир', span: '1965–1997', years: 32, note: 'Переименовал страну, реку и себя, носил шапку из леопарда. Вывез миллиарды. Свергнут повстанцами, умер в изгнании.' },
    { name: 'Сухарто', land: 'Индонезия', span: '1967–1998', years: 31, note: 'Пришёл к власти на волне массовых убийств 1965–1966 годов. Ушёл в отставку после азиатского кризиса и бунтов.' },
    { name: 'Не Вин', land: 'Бирма', span: '1962–1988', years: 26, note: '«Бирманский путь к социализму». Отменил купюры, не делившиеся на счастливую девятку, — сбережения страны исчезли за ночь. Ушёл после протестов.' },
    { name: 'Николае Чаушеску', land: 'Румыния', span: '1965–1989', years: 24, note: 'Культ личности, дворец на тысячу комнат и пустые полки. Расстрелян вместе с женой после восстания 1989 года.' },
    { name: 'Фердинанд Маркос', land: 'Филиппины', span: '1965–1986', years: 21, note: 'Девять лет военного положения. У Имельды Маркос нашли тысячи пар туфель. Свергнут «народной властью», бежал на Гавайи.' },
    { name: 'Пак Чон Хи', land: 'Южная Корея', span: '1961–1979', years: 18, note: 'Военный переворот, «экономическое чудо» и жёсткая диктатура. Убит директором собственной разведки.' },
    { name: 'Франсуа Дювалье', land: 'Гаити', span: '1957–1971', years: 14, note: '«Папа Док»: тайная полиция тонтон-макутов и культ личности с образами вуду. Пожизненный президент, передал власть 19-летнему сыну.' },
    { name: 'Жан-Бедель Бокасса', land: 'ЦАР', span: '1966–1979', years: 13, note: 'Короновался императором. Церемония обошлась примерно в треть годового бюджета страны. Свергнут при участии французских войск.' },
    { name: 'Иди Амин', land: 'Уганда', span: '1971–1979', years: 8, note: 'Изгнал из страны азиатов; жертвами режима, по разным оценкам, стали от ста до пятисот тысяч человек. Свергнут танзанийской армией, умер в Саудовской Аравии.' },
    { name: 'Фульхенсио Батиста', land: 'Куба', span: '1952–1959', years: 7, note: 'Пришёл к власти переворотом накануне выборов. Бежал из страны в новогоднюю ночь 1959 года.' },
  ],
  '2000': [
    { name: 'Муаммар Каддафи', land: 'Ливия', span: '1969–2011', years: 42, note: 'Шатёр, «Зелёная книга» и женская охрана. Свергнут в ходе гражданской войны и убит.' },
    { name: 'Жозе Эдуарду душ Сантуш', land: 'Ангола', span: '1979–2017', years: 38, note: 'Нефтяное богатство страны и самая богатая женщина Африки — его дочь. Ушёл сам, назначив преемника.' },
    { name: 'Роберт Мугабе', land: 'Зимбабве', span: '1980–2017', years: 37, note: 'Гиперинфляция и купюра в сто триллионов долларов. Смещён армией в 93 года.' },
    { name: 'Нурсултан Назарбаев', land: 'Казахстан', span: '1989–2019', years: 30, note: 'В 2019 году ушёл в отставку, и столицу назвали в его честь. В 2022-м ей вернули прежнее имя.' },
    { name: 'Хосни Мубарак', land: 'Египет', span: '1981–2011', years: 30, note: 'Тридцать лет чрезвычайного положения. Ушёл после восемнадцати дней протестов на площади Тахрир.' },
    { name: 'Омар аль-Башир', land: 'Судан', span: '1989–2019', years: 30, note: 'Международный уголовный суд выдал ордер на его арест из-за Дарфура. Смещён армией после протестов.' },
    { name: 'Ислам Каримов', land: 'Узбекистан', span: '1989–2016', years: 27, note: 'Принудительный труд на хлопке, расстрел протестующих в Андижане в 2005 году. Умер у власти.' },
    { name: 'Саддам Хусейн', land: 'Ирак', span: '1979–2003', years: 24, note: 'Две войны с соседями и химическое оружие против курдов. Свергнут американским вторжением, казнён в 2006 году.' },
    { name: 'Башар Асад', land: 'Сирия', span: '2000–2024', years: 24, note: 'Унаследовал власть от отца, страна прошла через гражданскую войну. В декабре 2024 года бежал в Москву.' },
    { name: 'Зин эль-Абидин Бен Али', land: 'Тунис', span: '1987–2011', years: 23, note: 'Первым пал в «арабскую весну»: бежал в Саудовскую Аравию через месяц протестов.' },
    { name: 'Сапармурат Ниязов', land: 'Туркмения', span: '1990–2006', years: 16, note: 'Туркменбаши: переименовал месяцы в честь себя и матери, поставил вращающуюся золотую статую. Умер у власти.' },
  ],
};
const PLAYER_LEVELS = [[300, 'Стажёр путча'], [600, 'Банановый лейтенант'], [900, 'Провинциальный каудильо'], [1200, 'Опытный узурпатор'], [1500, 'Мастер вертикали'], [1900, 'Гроссмейстер диктатуры'], [1e9, 'Легенда клуба']];

// ===== Облик 2000-х: костюмы без галстуков, спортивные костюмы, гарнитуры, очки без оправы =====
(() => {
  const A = (r, role, patch) => Object.assign(REGIONS[r].advisors[role].look, patch);
  A('africa00', 'defense', { glasses: 'sport', bluetooth: true, outfitColor: '#4a5a3a', hatColor: '#4a5a3a' });
  A('africa00', 'economy', { outfit: 'suit2000', outfitColor: '#24364f', shirt: '#f4f1ea', tie: 'none', glasses: 'rimless', bluetooth: true });
  A('africa00', 'police', { outfit: 'suit2000', outfitColor: '#121418', shirt: '#2a2a2a', tie: 'none', glasses: 'sport', earpiece: true, hair: 'buzz' });
  A('africa00', 'foreign', { outfit: 'suit2000', outfitColor: '#5a5f66', shirt: '#dfe9f3', tie: '#c1272d', glasses: 'rimless' });
  A('mideast00', 'defense', { glasses: 'sport' });
  A('mideast00', 'economy', { outfit: 'suit2000', outfitColor: '#44484f', shirt: '#dfe9f3', tie: '#1e7a3c', glasses: 'rimless', bluetooth: true, hair: 'short' });
  A('mideast00', 'police', { outfit: 'suit2000', outfitColor: '#111317', shirt: '#1f2329', tie: 'none', glasses: 'sport', earpiece: true });
  A('mideast00', 'propaganda', { outfit: 'suit2000', outfitColor: '#7a1f3d', shirt: '#f4f1ea', tie: 'none' });
  A('centralasia00', 'economy', { outfit: 'suit2000', outfitColor: '#3a3f47', shirt: '#dfe9f3', tie: '#1fa3a3', glasses: 'rimless' });
  A('centralasia00', 'police', { outfit: 'suit2000', outfitColor: '#16181d', shirt: '#dfe9f3', tie: '#5a1a1a', glasses: 'rimless', earpiece: true });
  A('centralasia00', 'foreign', { outfit: 'suit2000', outfitColor: '#232838', shirt: '#f4f1ea', tie: '#d6a63a', hair: 'gelled', bluetooth: true });
})();
const RELATIVE_LOOK_00 = {
  defense: { face: 'round', hair: 'buzz', hairColor: '#2b2118', hat: 'baseball', hatColor: '#3d4a2a', mustache: 'thick', brows: 'normal', mouth: 'grin', outfit: 'tracksuit', outfitColor: '#3d4a2a', glasses: 'sport' },
  economy: { face: 'round', hair: 'gelled', hairColor: '#3a2a1a', mustache: 'none', brows: 'worried', mouth: 'smile', glasses: 'rimless', outfit: 'polo', outfitColor: '#d27a2a', bluetooth: true },
  police: { face: 'round', hair: 'bun', hairColor: '#9a9a9a', mustache: 'none', brows: 'angry', mouth: 'smirk', glasses: 'rimless', outfit: 'suit2000', outfitColor: '#4a2a5a', shirt: '#f4f1ea', tie: 'none', earring: true },
  propaganda: { face: 'oval', hair: 'gelled', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'sport', outfit: 'tracksuit', outfitColor: '#c1272d', bluetooth: true },
  foreign: { face: 'long', hair: 'slick', hairColor: '#111', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'suit2000', outfitColor: '#d8c27a', shirt: '#111', tie: 'none', glasses: 'sport' },
};
const _npc00 = npc00;
// eslint-disable-next-line no-global-assign
npc00 = function (key, region, base, r) {
  const own = _npc00(key, region, base, r);
  const S2 = { skin: SKIN.light };
  const M = {
    usa_amb: { outfit: 'suit2000', outfitColor: '#1f2a44', shirt: '#dfe9f3', tie: '#b22234', hat: 'none' },
    china_amb: { outfit: 'suit2000', outfitColor: '#2a2a2a', shirt: '#f4f1ea', tie: '#c1272d', glasses: 'rimless' },
    russia_amb: { outfit: 'suit2000', outfitColor: '#2a2d36', shirt: '#dfe9f3', tie: '#0039a6' },
    eu_amb: { outfit: 'suit2000', outfitColor: '#003399', shirt: '#f4f1ea', tie: 'none', glasses: 'rimless' },
    techboss: { outfit: 'hoodie', glasses: 'rimless' },
    worker: { outfit: 'polo', outfitColor: '#5a6a7a', hat: 'baseball', hatColor: '#c1272d' },
    blogger: { hair: 'gelled', bluetooth: true },
  };
  const later = {
    banker: { name: 'Герр Цвингли, частный банк в Цюрихе', look: { ...S2, face: 'long', hair: 'slick', hairColor: '#ddd', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'rimless', outfit: 'suit2000', outfitColor: '#2a2a2a', shirt: '#f4f1ea', tie: '#777' } },
    nephew: { name: `Племянник ${REGIONS[region].nephew}`, look: { ...base, face: 'round', hair: 'gelled', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'sport', outfit: 'tracksuit', outfitColor: '#d6a63a', blush: true, bluetooth: true } },
    mafia: { name: 'Мистер Сальваторе, «инвестор из Лас-Вегаса»', look: { ...S2, face: 'square', hair: 'gelled', hairColor: '#111', mustache: 'none', brows: 'angry', mouth: 'smirk', glasses: 'sport', outfit: 'suit2000', outfitColor: '#111', shirt: '#2a2a2a', tie: 'none' } },
    spy: { name: 'Таинственный перебежчик', look: { ...S2, face: 'long', hair: 'buzz', hairColor: '#777', mustache: 'none', brows: 'worried', mouth: 'flat', glasses: 'rimless', outfit: 'suit2000', outfitColor: '#4a4033', shirt: '#dfe9f3', tie: '#333', sweat: true } },
    professor: { name: 'Профессор Хиггинботтом из Гарварда', look: { ...S2, face: 'long', hair: 'combover', hairColor: '#ddd', mustache: 'none', brows: 'bushy', browColor: '#ddd', mouth: 'flat', glasses: 'rimless', outfit: 'suit2000', outfitColor: '#5a4a3a', shirt: '#dfe9f3', tie: '#1f4e8c' } },
    journalist: { name: 'Мисс Дороти Хейл, Си-эн-эн', look: { ...S2, face: 'oval', hair: 'long', hairColor: '#b5651d', mustache: 'none', brows: 'normal', mouth: 'smile', glasses: 'rimless', outfit: 'suit2000', outfitColor: '#7d9c8c', shirt: '#f4f1ea', tie: 'none', earring: true, bluetooth: true } },
    first_lady: { name: 'Первая леди', look: { ...base, face: 'oval', hair: 'long', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'sport', outfit: 'suit2000', outfitColor: '#c2185b', shirt: '#f4f1ea', tie: 'none', earring: true, blush: true } },
  };
  if (own) { if (M[key]) own.look = { ...own.look, ...M[key] }; return own; }
  return later[key] || null;
};
