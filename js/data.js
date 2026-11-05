// Справочные данные: регионы, страны, движения, советники, персонажи.
const SKIN = { light: '#f1c9a5', tan: '#d9a273', brown: '#a8693f', dark: '#6e4226', deep: '#4a2c1a' };

const COUNTRIES = {
  usa: { name: 'США', bloc: 'west', flag: 'usa', leaders: [[1961.0, 'президент Эйзенхауэр'], [1963.9, 'президент Кеннеди'], [1969.0, 'президент Джонсон'], [9999, 'президент Никсон']] },
  ussr: { name: 'СССР', bloc: 'east', flag: 'ussr', leaders: [[1964.8, 'товарищ Хрущёв'], [9999, 'товарищ Брежнев']] },
  china: { name: 'КНР', bloc: 'east', flag: 'china', leaders: [[9999, 'Председатель Мао']] },
  cuba: { name: 'Куба', bloc: 'east', flag: 'cuba', leaders: [[9999, 'команданте Фидель Кастро']] },
  mexico: { name: 'Мексика', bloc: 'neutral', flag: 'mexico', leaders: [[1964.9, 'президент Лопес Матеос'], [9999, 'президент Диас Ордас']] },
  brazil: { name: 'Бразилия', bloc: 'neutral', flag: 'brazil', leaders: [[1961.0, 'президент Кубичек'], [1964.2, 'президент Гуларт'], [9999, 'военное правительство']] },
  uk: { name: 'Великобритания', bloc: 'west', flag: 'uk', leaders: [[1963.8, 'премьер Макмиллан'], [1964.8, 'премьер Дуглас-Хьюм'], [9999, 'премьер Вильсон']] },
  france: { name: 'Франция', bloc: 'west', flag: 'france', leaders: [[1969.3, 'генерал де Голль'], [9999, 'президент Помпиду']] },
  japan: { name: 'Япония', bloc: 'west', flag: 'japan', leaders: [[1964.9, 'премьер Икэда'], [9999, 'премьер Сато']] },
  india: { name: 'Индия', bloc: 'neutral', flag: 'india', leaders: [[1964.4, 'премьер Неру'], [1966.0, 'премьер Шастри'], [9999, 'премьер Индира Ганди']] },
  egypt: { name: 'Египет (ОАР)', bloc: 'neutral', flag: 'egypt', leaders: [[9999, 'президент Насер']] },
};

const FLAGS = {
  usa: `<rect width="30" height="20" fill="#fff"/>${[0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 20 / 13}" width="30" height="${20 / 13}" fill="#b22234"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/>`,
  ussr: `<rect width="30" height="20" fill="#cc0000"/><path d="M4 3 L5 5.2 L7.4 5.2 L5.5 6.6 L6.2 9 L4 7.6 L1.8 9 L2.5 6.6 L0.6 5.2 L3 5.2 Z" fill="#ffd700" transform="translate(1 0) scale(0.75)"/><path d="M4 7 Q6 11 9 9 M5 10 L8 7" stroke="#ffd700" stroke-width="0.9" fill="none"/>`,
  china: `<rect width="30" height="20" fill="#de2910"/><circle cx="5" cy="5" r="2.6" fill="#ffde00"/><circle cx="10" cy="2" r="0.8" fill="#ffde00"/><circle cx="12" cy="4" r="0.8" fill="#ffde00"/><circle cx="12" cy="7" r="0.8" fill="#ffde00"/><circle cx="10" cy="9" r="0.8" fill="#ffde00"/>`,
  cuba: `<rect width="30" height="20" fill="#fff"/>${[0, 2, 4].map(i => `<rect y="${i * 4}" width="30" height="4" fill="#002a8f"/>`).join('')}<path d="M0 0 L13 10 L0 20 Z" fill="#cf142b"/><circle cx="4.5" cy="10" r="1.8" fill="#fff"/>`,
  mexico: `<rect width="10" height="20" fill="#006847"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce1126"/><circle cx="15" cy="10" r="2.6" fill="#8b5a2b"/>`,
  brazil: `<rect width="30" height="20" fill="#009c3b"/><path d="M15 2 L28 10 L15 18 L2 10 Z" fill="#ffdf00"/><circle cx="15" cy="10" r="4.4" fill="#002776"/>`,
  uk: `<rect width="30" height="20" fill="#012169"/><path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 L30 20 M30 0 L0 20" stroke="#c8102e" stroke-width="1.5"/><path d="M15 0 V20 M0 10 H30" stroke="#fff" stroke-width="6"/><path d="M15 0 V20 M0 10 H30" stroke="#c8102e" stroke-width="3.4"/>`,
  france: `<rect width="10" height="20" fill="#0055a4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ef4135"/>`,
  japan: `<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>`,
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
};

const TITLES = ['Генералиссимус', 'Пожизненный Президент', 'Отец Нации', 'Благодетель', 'Маршал', 'Верховный Вождь', 'Великий Кормчий', 'Спаситель Отечества'];

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
    leaderSkin: 'tan',
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
    leaderSkin: 'tan',
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
    leaderSkin: 'dark',
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
    worker: { name: 'Профсоюзный вожак Мигель', look: { ...base, face: 'square', hair: 'short', hairColor: '#222', hat: 'flatcap', hatColor: '#5a4a3a', mustache: 'thick', brows: 'angry', mouth: 'frown', outfit: 'guayabera', outfitColor: '#7a8a9a' } },
    student: { name: 'Студент-активист', look: { ...base, face: 'long', hair: 'long', hairColor: '#2b1b10', beard: 'goatee', mustache: 'none', brows: 'angry', mouth: 'o', glasses: 'round', outfit: 'guayabera', outfitColor: '#c95b3a' } },
    rebel: { name: 'Команданте из гор', look: { ...base, face: 'oval', hair: 'curly', hairColor: '#1a1a1a', hat: 'beret', hatColor: '#1a1a1a', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'smirk', outfit: 'military', outfitColor: '#556b2f', cigar: true, medals: 0 } },
    priest: { name: r.faithLeader, look: region === 'asia'
      ? { ...base, face: 'round', hair: 'bald', hairColor: '#333', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'robe', outfitColor: '#e07a1f', trim: '#c95b1a', eyes: 'sleepy' }
      : region === 'africa'
        ? { ...base, face: 'long', hair: 'short', hairColor: '#ddd', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ddd', mouth: 'flat', outfit: 'robe', outfitColor: '#6b3e1e', trim: '#e2b33c', hat: 'fez', hatColor: '#7a1a1a' }
        : { ...base, skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#ccc', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'round', outfit: 'robe', outfitColor: '#1d1d1d', trim: '#c1272d', blush: true } },
    banker: { name: 'Герр Цвингли, Цюрихский банк', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#ddd', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'square', outfit: 'suit', outfitColor: '#2a2a2a', tie: '#888', hat: 'top', hatColor: '#555' } },
    first_lady: { name: 'Первая леди', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'aviator', outfit: 'robe', outfitColor: '#c2185b', trim: '#f0c419', earring: true, blush: true } },
    nephew: { name: `Племянник ${r.nephew}`, look: { ...base, face: 'round', hair: 'long', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', glasses: 'aviator', outfit: 'guayabera', outfitColor: '#f39c12', blush: true } },
    exdictator: { name: 'Свергнутый Генералиссимус соседей', look: { ...base, face: 'round', hair: 'combover', hairColor: '#555', hat: 'cap', hatColor: '#6b1d1d', mustache: 'walrus', brows: 'worried', mouth: 'frown', outfit: 'military', outfitColor: '#6b1d1d', medals: 12, sweat: true, sash: '#2a6fdb' } },
    mafia: { name: 'Мистер Сальваторе, «бизнесмен из Лас-Вегаса»', look: { skin: SKIN.light, face: 'square', hair: 'slick', hairColor: '#111', mustache: 'none', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#333', tie: '#e2b33c', hat: 'fedora', hatColor: '#222', cigar: true } },
    colonel: { name: 'Полковник-заговорщик', look: { ...base, face: 'square', hair: 'short', hairColor: '#111', hat: 'beret', hatColor: '#2f3e1f', mustache: 'thick', brows: 'angry', mouth: 'flat', glasses: 'aviator', outfit: 'military', outfitColor: '#2f3e1f', medals: 4 } },
    spy: { name: 'Таинственный перебежчик', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#777', mustache: 'none', brows: 'worried', mouth: 'flat', glasses: 'square', outfit: 'suit', outfitColor: '#6a5d4d', tie: '#333', hat: 'fedora', hatColor: '#4a4033', sweat: true } },
    egypt_amb: { name: 'Посол ОАР Хасан эль-Масри', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#222', mustache: 'thick', brows: 'normal', mouth: 'smile', outfit: 'suit', outfitColor: '#3a3a3a', tie: '#ce1126' } },
  };
  return L[key];
}
