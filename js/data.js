// Справочные данные: регионы, страны, движения, советники, персонажи.
const SKIN = { light: '#f1c9a5', tan: '#d9a273', brown: '#a8693f', dark: '#6e4226', deep: '#4a2c1a' };

const COUNTRIES = {
  usa: { name: 'США', bloc: 'west', flag: 'usa', leaders: [[1933.2, 'президент Гувер'], [1945.3, 'президент Рузвельт'], [1961.0, 'президент Эйзенхауэр'], [1963.9, 'президент Кеннеди'], [1969.0, 'президент Джонсон'], [9999, 'президент Никсон']] },
  ussr: { name: 'СССР', bloc: 'east', flag: 'ussr', leaders: [[1953.2, 'товарищ Сталин'], [1964.8, 'товарищ Хрущёв'], [9999, 'товарищ Брежнев']] },
  china: { name: 'КНР', bloc: 'east', flag: 'china', leaders: [[9999, 'Председатель Мао']] },
  roc: { name: 'Китай (Гоминьдан)', bloc: 'neutral', flag: 'roc', leaders: [[9999, 'генералиссимус Чан Кайши']] },
  cuba: { name: 'Куба', bloc: 'east', flag: 'cuba', leaders: [[9999, 'команданте Фидель Кастро']] },
  mexico: { name: 'Мексика', bloc: 'neutral', flag: 'mexico', leaders: [[1934.95, 'генерал Кальес (из-за кулис)'], [1940.9, 'президент Карденас'], [1964.9, 'президент Лопес Матеос'], [9999, 'президент Диас Ордас']] },
  brazil: { name: 'Бразилия', bloc: 'neutral', flag: 'brazil', leaders: [[1945.8, 'президент Варгас'], [1961.0, 'президент Кубичек'], [1964.2, 'президент Гуларт'], [9999, 'военное правительство']] },
  uk: { name: 'Великобритания', bloc: 'west', flag: 'uk', leaders: [[1935.45, 'премьер Макдональд'], [1937.4, 'премьер Болдуин'], [1940.4, 'премьер Чемберлен'], [1963.8, 'премьер Макмиллан'], [1964.8, 'премьер Дуглас-Хьюм'], [9999, 'премьер Вильсон']] },
  france: { name: 'Франция', bloc: 'west', flag: 'france', leaders: [[1936.4, 'кабинет Третьей республики'], [1937.5, 'премьер Леон Блюм'], [1938.3, 'премьер Шотан'], [1940.3, 'премьер Даладье'], [1969.3, 'генерал де Голль'], [9999, 'президент Помпиду']] },
  germany: { name: 'Германия', bloc: 'axis', flag: 'germany', leaders: [[1932.4, 'канцлер Брюнинг'], [1933.08, 'канцлер фон Папен'], [9999, 'рейхсканцлер Гитлер']] },
  italy: { name: 'Италия', bloc: 'axis', flag: 'italy', leaders: [[9999, 'дуче Муссолини']] },
  japan: { name: 'Япония', bloc: 'west', bloc30: 'axis', flag: 'japan', leaders: [[1945.6, 'кабинет императора Хирохито'], [1964.9, 'премьер Икэда'], [9999, 'премьер Сато']] },
  poland: { name: 'Польша', bloc: 'neutral', flag: 'poland', leaders: [[1935.4, 'маршал Пилсудский'], [9999, 'маршал Рыдз-Смиглы']] },
  india: { name: 'Индия', bloc: 'neutral', flag: 'india', leaders: [[1964.4, 'премьер Неру'], [1966.0, 'премьер Шастри'], [9999, 'премьер Индира Ганди']] },
  egypt: { name: 'Египет (ОАР)', bloc: 'neutral', flag: 'egypt', leaders: [[9999, 'президент Насер']] },
};

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
    desc: 'Порядок, церковь, корпорации и гимнастика по утрам. Рим и Берлин шлют поздравительные телеграммы, Москва — проклятия.',
    fx: { fear: 10, economy: 3 }, fac: { faith: { a: 20 }, oligarchs: { a: 15 }, left: { a: -25 }, liberals: { a: -10 } }, rel: { germany: 15, italy: 15, ussr: -15, france: -5 },
  },
  front: {
    name: 'Народный фронт', icon: '✊',
    desc: 'Вы пришли к власти на волне забастовок и красных флагов. Москва довольна, банкиры паникуют, епископы молятся.',
    fx: { support: 15, economy: -5, army: -6 }, fac: { left: { a: 30 }, oligarchs: { a: -25, s: -5 }, faith: { a: -12 } }, rel: { ussr: 25, germany: -15, italy: -15, usa: -5, france: 5 },
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
    sport: 'финал Азиатских игр по бадминтону', rival: 'Королевство Мунтари', rivalShort: 'Мунтари',
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
      hawks: { name: 'Генералы-«ястребы»', short: 'Генералы', icon: '⚔️', desc: 'Хотят войну с соседом, больше вертолётов и, возможно, ваше кресло.' },
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
      economy: { name: 'Доктор Самуэль Окото', bio: 'Выпускник Лондонской школы экономики и не даёт никому об этом забыть. Носит котелок в +40.', look: { skin: SKIN.deep, face: 'long', hair: 'short', hairColor: '#222', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'o', hat: 'top', hatColor: '#7a1a1a', outfit: 'suit', outfitColor: '#3c3a36', tie: '#c1272d', sweat: true } },
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
      left: { name: 'Подпольные коммунисты', short: 'Коммунисты', icon: '☭', desc: 'Получают инструкции из Москвы. Листовки печатают в подвале пекарни, поэтому от них пахнет хлебом.' },
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
      left: { name: 'Коммунисты-подпольщики', short: 'Коммунисты', icon: '☭', desc: 'Ячейки в порту и на лесопилках. Связной из Коминтерна приезжает под видом торговца веерами.' },
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
  economy: { name: 'Шурин Бенедикт', bio: 'Муж вашей сестры. Однажды выиграл в лотерею и с тех пор считает себя экономистом.', comp: 0.5 },
  police: { name: 'Тётушка Консуэло', bio: 'Знает все сплетни столицы. Тайная полиция ей, в сущности, не нужна.', comp: 0.8 },
  propaganda: { name: 'Племянник Тито', bio: 'Играет на гитаре и разбирается в мотоциклах. Очень громкий.', comp: 0.6 },
  foreign: { name: 'Зять Октавио', bio: 'Был в Майами два раза. Говорит на трёх языках, все — с ошибками.', comp: 0.5 },
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
    worker: { name: 'Профсоюзный вожак', look: { ...base, face: 'square', hair: 'short', hairColor: '#222', hat: 'flatcap', hatColor: '#5a4a3a', mustache: 'thick', brows: 'angry', mouth: 'frown', outfit: 'guayabera', outfitColor: '#7a8a9a' } },
    student: { name: 'Студент-активист', look: { ...base, face: 'long', hair: 'long', hairColor: '#2b1b10', beard: 'goatee', mustache: 'none', brows: 'angry', mouth: 'o', glasses: 'round', outfit: 'guayabera', outfitColor: '#c95b3a' } },
    rebel: { name: 'Команданте из гор', look: { ...base, face: 'oval', hair: 'curly', hairColor: '#1a1a1a', hat: 'beret', hatColor: '#1a1a1a', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'smirk', outfit: 'military', outfitColor: '#556b2f', cigar: true, medals: 0 } },
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
  return L[key];
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
