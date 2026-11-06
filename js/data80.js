// ================= Эпоха 1980-х: конец холодной войны =================
// Латинская Америка, соцлагерь и Азия. Главный сюжет — покровитель, который к 1989 году перестаёт в вас нуждаться.

Object.assign(COUNTRIES, {
  frg: { name: 'ФРГ', bloc: 'west', flag: 'frg', leaders: [[1982.75, 'канцлер Шмидт'], [9999, 'канцлер Коль']] },
  vatican: { name: 'Ватикан', bloc: 'neutral', flag: 'vatican', leaders: [[9999, 'папа Иоанн Павел II']] },
  imf: { name: 'МВФ', bloc: 'west', flag: 'imf', leaders: [[1987.0, 'директор-распорядитель Ларозьер'], [9999, 'директор-распорядитель Камдессю']] },
  vietnam: { name: 'Вьетнам', bloc: 'east', flag: 'vietnam', leaders: [[1986.5, 'генсек Ле Зуан'], [1986.95, 'генсек Чыонг Тинь'], [9999, 'генсек Нгуен Ван Линь']] },
});
COUNTRIES.usa.leaders80 = [[1981.05, 'президент Картер'], [1989.05, 'президент Рейган'], [9999, 'президент Буш']];
COUNTRIES.ussr.leaders80 = [[1982.87, 'генсек Брежнев'], [1984.11, 'генсек Андропов'], [1985.2, 'генсек Черненко'], [9999, 'генсек Горбачёв']];
COUNTRIES.china.leaders80 = [[9999, 'товарищ Дэн Сяопин']];
COUNTRIES.cuba.leaders80 = [[9999, 'команданте Фидель Кастро']];
COUNTRIES.uk.leaders80 = [[9999, 'премьер Тэтчер']];
COUNTRIES.mexico.leaders80 = [[1982.92, 'президент Лопес Портильо'], [1988.92, 'президент де ла Мадрид'], [9999, 'президент Салинас']];
COUNTRIES.japan.leaders80 = [[1980.45, 'премьер Охира'], [1982.9, 'премьер Судзуки'], [1987.85, 'премьер Накасонэ'], [1989.45, 'премьер Такэсита'], [9999, 'премьер Кайфу']];
// Лагеря эпохи: Китай в 1980-х дружит с Вашингтоном против Москвы
const BLOC80 = { usa: 'west', uk: 'west', frg: 'west', imf: 'west', japan: 'west', ussr: 'east', cuba: 'east', vietnam: 'east', china: 'neutral', mexico: 'neutral', vatican: 'neutral' };
Object.assign(COUNTRY_CASES, {
  frg: ['ФРГ', 'ФРГ', 'в Бонн'], vatican: ['Ватикана', 'Ватиканом', 'в Ватикан'], imf: ['МВФ', 'МВФ', 'в штаб-квартиру МВФ'], vietnam: ['Вьетнама', 'Вьетнамом', 'во Вьетнам'],
});
Object.assign(FLAGS, {
  frg: `<rect width="30" height="20" fill="#ffce00"/><rect width="30" height="13.4" fill="#dd0000"/><rect width="30" height="6.7" fill="#1a1a1a"/>`,
  vatican: `<rect width="15" height="20" fill="#f2c200"/><rect x="15" width="15" height="20" fill="#fff"/><path d="M19 6 L26 13 M26 6 L19 13" stroke="#d6a63a" stroke-width="1.6"/><circle cx="22.5" cy="5" r="1.4" fill="#d6a63a"/>`,
  imf: `<rect width="30" height="20" fill="#1f5fae"/><circle cx="15" cy="10" r="6" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M9 10 H21 M15 4 V16 M10.5 6.5 Q15 9 19.5 6.5 M10.5 13.5 Q15 11 19.5 13.5" stroke="#fff" stroke-width="0.8" fill="none"/>`,
  vietnam: `<rect width="30" height="20" fill="#da251d"/><path d="M15 4.5 L16.6 9 L21.3 9 L17.5 11.8 L18.9 16.3 L15 13.5 L11.1 16.3 L12.5 11.8 L8.7 9 L13.4 9 Z" fill="#ffcd00"/>`,
});

Object.assign(REGIME_TYPES, {
  junta80: {
    name: 'Военная хунта', icon: '🎖️',
    desc: 'Генералы спасли страну от коммунизма и от выборов. Вашингтон называет вас «оплотом свободного мира», правозащитники — иначе.',
    byRegion: {
      east80: { name: 'Военное положение', icon: '🎖️', desc: 'Танки на улицах, комендантский час и Военный совет национального спасения. Независимый профсоюз запрещён, его вожаки интернированы. Москва довольна, Запад ввёл санкции.', fac: { hawks: { a: 22, s: 8 }, liberals: { a: -15 }, left: { a: -15 } } },
      asia80: { name: 'Военное положение', icon: '🎖️', desc: 'Вы объявили военное положение «против коммунистической угрозы» и отменили выборы. Американские базы в безопасности, посол доволен.' },
    },
    fx: { army: 15, fear: 15, support: -6 }, fac: { hawks: { a: 22, s: 8 }, liberals: { a: -15 } }, rel: { $patron: 10 },
  },
  party80: {
    name: 'Революционное правительство', icon: '✊',
    desc: 'Вы свергли проамериканского диктатора. Гавана и Москва шлют советников, Вашингтон — оружие тем, кто против вас.',
    byRegion: {
      east80: { name: 'Партия и вождь', icon: '☭', desc: 'Вы — генеральный секретарь партии, которая правит сорок лет. Своя линия, свой культ и свой взгляд на Москву: дружим, но танков не просим.', fac: { oligarchs: { a: 15 }, hawks: { a: 5 }, left: { a: -5 }, liberals: { a: -8 } } },
      asia80: { name: 'Народная республика', icon: '☭', desc: 'Красные флаги, сельскохозяйственные коммуны и советские советники. Американские базы закрыты, Китай вас не любит, американцы — тем более.', rel: { ussr: 25, vietnam: 15, usa: -25, china: -8, japan: -6 } },
    },
    fx: { support: 12, economy: -3, fear: 6, treasury: 10 }, fac: { left: { a: 25 }, oligarchs: { a: -25, s: -10 }, liberals: { a: -8 } }, rel: { ussr: 25, cuba: 15, vietnam: 15, usa: -25, uk: -8, frg: -6 },
  },
  family80: {
    name: 'Семейный бизнес', icon: '💍',
    desc: 'Президентский дворец, газеты, банки и сахарные заводы принадлежат вашей семье. Супруга коллекционирует туфли, сын — должности.',
    byRegion: {
      latam80: { name: 'Семейный бизнес', icon: '💍', desc: 'Дворец, Национальная гвардия, авиакомпания и половина кофейных плантаций принадлежат вашей семье. Отец правил до вас, сын командует гвардией, а посол США называет вас «наш сукин сын».' },
      east80: { name: 'Династия', icon: '👪', desc: 'Партия, правительство и академия наук — у вашей семьи. Супруга — первый вице-премьер и академик химии. Сын — первый секретарь комсомола.' },
    },
    fx: { treasury: 20, swiss: 12, fear: 8, support: -4 }, fac: { oligarchs: { a: 18 }, liberals: { a: -8 }, hawks: { a: 4 } }, rel: { $patron: 6 },
  },
});
const DEFAULT_PILLARS_80 = { junta80: ['hawks', 'oligarchs'], party80: ['left', 'hawks'], family80: ['oligarchs', 'hawks'] };
// В соцлагере опора партийного вождя — номенклатура, а не независимый профсоюз
const REGION_PILLARS_80 = { east80: { party80: ['oligarchs', 'hawks'] } };
// Титул по умолчанию, если режим явно не военный
const REGIME_TITLE_80 = { latam80: { party80: 'Команданте', family80: 'Пожизненный Президент' }, asia80: { party80: 'Председатель', family80: 'Пожизненный Президент' }, east80: { junta80: 'Председатель Военного совета' } };

Object.assign(REGIONS, {
  latam80: {
    name: 'Латинская Америка', short: 'Латинская Америка',
    blurb: 'Медь, кофе и генералы в тёмных очках. Нефтедоллары 1970-х надо отдавать, Рейган ищет коммунистов под каждой пальмой, а соседи по одному возвращаются к демократии.',
    country: 'Республика Альта-Верде', capital: 'Сьюдад-Майор', currency: 'альтаверденский песо',
    exports: 'медь и кофе', exportGen: 'меди', company: '«Кордильера Коппер Корпорейшн»', patron: 'usa',
    sport: 'финал Кубка Америки', rival: 'Республика Пунта-Брава', rivalShort: 'Пунта-Брава',
    disputed: 'острова Санта-Роса', faithLeader: 'Архиепископ', capitalSquare: 'площади Конституции',
    jungle: 'горах Сьерра-Негра', nephew: 'Рикардито',
    countries: ['usa', 'ussr', 'cuba', 'uk', 'imf', 'mexico'],
    relInit: { usa: 60, ussr: 30, cuba: 25, uk: 50, imf: 50, mexico: 50 },
    flag: `<rect width="30" height="20" fill="#f4f1ea"/><rect width="30" height="6.7" fill="#1e7a4a"/><rect y="13.3" width="30" height="6.7" fill="#1e7a4a"/><path d="M15 6.5 L16.3 9.2 L19.2 9.3 L16.9 11 L17.7 13.6 L15 12 L12.3 13.6 L13.1 11 L10.8 9.3 L13.7 9.2 Z" fill="#c1272d"/>`,
    leaderSkin: 'tan', era: '1980', style: 'latam', faithStyle: 'catholic', exile: 'Майами', critters: 'лам',
    factions: {
      left: { name: 'Партизаны и подполье', short: 'Партизаны', icon: '✊', desc: 'Городские подпольщики и отряды в горах. Взрывают опоры линий электропередачи и печатают листовки на ротаторе.' },
      liberals: { name: 'Христианские демократы и студенты', short: 'Демократы', icon: '🗳️', desc: 'Адвокаты, студенты и бывшие депутаты распущенного парламента. Хотят выборов и знают, что Конгресс США их слушает.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Архиепископ открыл при соборе бюро помощи семьям пропавших. Каждое воскресенье он читает их имена с амвона.' },
      oligarchs: { name: '«Чикагские мальчики» и банкиры', short: 'Банкиры', icon: '💼', desc: 'Экономисты из Чикаго и семьи, которым принадлежат банки. Обожают свободный рынок, пока он приносит прибыль.' },
      hawks: { name: 'Генералы хунты', short: 'Генералы', icon: '⚔️', desc: 'Командующие армией, флотом, авиацией и карабинерами. Каждый уверен, что следующим президентом должен быть он.' },
    },
    advisors: {
      defense: { name: 'Генерал Эрнесто «Танкетка» Вальдивия', bio: 'Носит тёмные очки даже ночью. Говорит, что ночью они особенно нужны: чтобы не узнали.', look: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#222', hat: 'cap', hatColor: '#4a4f36', glasses: 'aviator', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#4a4f36', medals: 10, sash: '#1e7a4a' } },
      economy: { name: 'Доктор Мильтон Гонсалес-Фридман', bio: 'Учился в Чикаго. Считает, что рынок решит всё, включая погоду. Погода пока сопротивляется.', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#555', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#3a3f4a', tie: '#7a1f3d', sweat: true } },
      police: { name: 'Полковник Мануэль «Кондор» Ривас', bio: 'Обменивается списками неблагонадёжных с коллегами из пяти соседних стран. Называет это «региональным сотрудничеством».', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'aviator', mustache: 'pencil', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#1d1f24', tie: '#111' } },
      propaganda: { name: 'Сеньора Глория Телевиса', bio: 'Ведущая главной вечерней программы. Каждый вечер объявляет, что страна живёт всё лучше, а курс песо — это «технический вопрос».', look: { skin: SKIN.tan, face: 'oval', hair: 'long', hairColor: '#3a2412', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#c1272d', tie: 'none', earring: true, blush: true } },
      foreign: { name: 'Дон Рикардо Вашингтонес-Пас', bio: 'Двадцать лет прослужил в посольстве в Вашингтоне и вернулся с калькулятором, клюшками для гольфа и номером телефона в Пентагоне.', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#bbb', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'suit', outfitColor: '#2c3e60', tie: '#b22234' } },
    },
  },
  east80: {
    name: 'Соцлагерь', short: 'Соцлагерь',
    blurb: 'Нефть, лес, тракторы и очереди за мясом. Своя линия во внешней политике, свой культ личности и долг западным банкам. В Кремле стареют генсеки, а в Гданьске бастуют.',
    country: 'Социалистическая Республика Вельдания', capital: 'Победоград', currency: 'вельданская крона',
    exports: 'нефть, лес и тракторы', exportGen: 'тракторов', company: '«Вельдэкспорт»', patron: 'ussr',
    sport: 'финал чемпионата Европы', rival: 'Народная Республика Бравния', rivalShort: 'Бравния',
    disputed: 'остров на Дунае', faithLeader: 'Патриарх', capitalSquare: 'площади Революции',
    jungle: 'Карпатских горах', nephew: 'Валентин',
    countries: ['ussr', 'usa', 'frg', 'vatican', 'imf', 'china'],
    relInit: { ussr: 55, usa: 40, frg: 45, vatican: 35, imf: 45, china: 45 },
    flag: `<rect width="30" height="20" fill="#a8231c"/><rect y="13" width="30" height="7" fill="#2e5e3a"/><rect y="12" width="30" height="1.2" fill="#f4f1ea"/><path d="M6 3 L7 5.8 L10 5.8 L7.6 7.6 L8.5 10.4 L6 8.7 L3.5 10.4 L4.4 7.6 L2 5.8 L5 5.8 Z" fill="#f2c200"/>`,
    leaderSkin: 'light', era: '1980', style: 'europe', faithStyle: 'orthodox', exile: 'Москве', critters: 'медведей',
    factions: {
      left: { name: 'Независимый профсоюз', short: 'Профсоюз', icon: '✊', desc: 'Рабочие верфей и шахт, которые поняли, что пролетариат — это они, а не партия. Требуют свободных профсоюзов и мяса в магазинах.' },
      liberals: { name: 'Диссиденты и интеллигенция', short: 'Диссиденты', icon: '📄', desc: 'Печатают самиздат на пишущих машинках через пять копирок и слушают «Свободную Европу» под одеялом.' },
      faith: { name: 'Церковь под надзором', short: 'Церковь', icon: '☦️', desc: 'Патриарха утвердил отдел по делам культов, и он молится за власть по праздникам. Но на Пасху в храмы не протолкнуться, а сельские батюшки тайком крестят детей партийцев.' },
      oligarchs: { name: 'Партийная номенклатура', short: 'Номенклатура', icon: '🚘', desc: 'Чёрные «Волги», спецпайки и дачи. Готовы поддержать любую власть, которая не отнимет дачи.' },
      hawks: { name: 'Армия и госбезопасность', short: 'Силовики', icon: '⚔️', desc: 'Генералы армии и полковники госбезопасности. Друг друга не любят, но обоих любит Москва. Пока.' },
    },
    advisors: {
      defense: { name: 'Генерал армии Богдан Танкиевич', bio: 'Ветеран парадов. Каждый Первомай лично ведёт колонну танков и машет с брони, хотя по уставу не положено.', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#ccc', hat: 'cap', hatColor: '#4a5a3a', mustache: 'none', brows: 'bushy', browColor: '#bbb', mouth: 'flat', outfit: 'military', outfitColor: '#4a5a3a', medals: 14 } },
      economy: { name: 'Товарищ Ванда Пятилетко', bio: 'Председатель Госплана. Перевыполняет план по всем показателям, кроме тех, что можно съесть.', look: { skin: SKIN.light, face: 'round', hair: 'bun', hairColor: '#6b4a2a', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'flat', outfit: 'suit', outfitColor: '#4a4a52', tie: 'none', earring: true } },
      police: { name: 'Генерал Казимир Шептало', bio: 'Начальник госбезопасности. Знает, что вы сказали вчера на охоте, и что подумали, но не сказали.', look: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#777', glasses: 'square', mustache: 'none', brows: 'angry', mouth: 'flat', outfit: 'suit', outfitColor: '#2a2d33', tie: '#3a1a1a' } },
      propaganda: { name: 'Товарищ Ярослав Агитпропов', bio: 'Главный редактор партийной газеты и телевидения. Шесть часов эфира в день — о вас, полчаса — о погоде, тоже благодаря вам.', look: { skin: SKIN.light, face: 'round', hair: 'slick', hairColor: '#3a2a1a', mustache: 'thick', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#5a4a3a', tie: '#c1272d', blush: true } },
      foreign: { name: 'Товарищ Милош Разрядкин', bio: 'Сорок лет на дипломатической работе. Умеет улыбаться одновременно Москве, Бонну и Ватикану и ни разу не перепутал, кому какую улыбку.', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#ddd', glasses: 'round', mustache: 'none', brows: 'normal', mouth: 'smirk', outfit: 'suit', outfitColor: '#2a2d36', tie: '#1f4e8c' } },
    },
  },
  asia80: {
    name: 'Юго-Восточная Азия', short: 'Азия',
    blurb: 'Сахар, кокосы и американские военные базы. Президент правит двадцать лет, первая леди — немногим меньше, в горах — коммунистические партизаны, а в столице — оппозиция в жёлтых лентах.',
    country: 'Республика Исла-Дорада', capital: 'Пуэрто-Дорадо', currency: 'дорадское песо',
    exports: 'сахар и кокосы', exportGen: 'сахара', company: '«Пасифик Шугар Корпорейшн»', patron: 'usa',
    sport: 'финал Азиатских игр по баскетболу', rival: 'Султанат Бантаро', rivalShort: 'Бантаро',
    disputed: 'риф Санта-Клара', faithLeader: 'Кардинал', capitalSquare: 'проспекте Свободы',
    jungle: 'джунглях южных островов', nephew: 'Бинбин',
    countries: ['usa', 'ussr', 'china', 'japan', 'imf', 'vietnam'],
    relInit: { usa: 62, ussr: 28, china: 40, japan: 55, imf: 50, vietnam: 25 },
    flag: `<rect width="30" height="10" fill="#1f4e8c"/><rect y="10" width="30" height="10" fill="#c1272d"/><path d="M0 0 L13 10 L0 20 Z" fill="#f4f1ea"/><circle cx="4.5" cy="10" r="2.2" fill="#f2c200"/>`,
    leaderSkin: 'tan', era: '1980', style: 'phil', faithStyle: 'catholic', exile: 'Гонолулу', critters: 'карабао',
    factions: {
      left: { name: 'Красные партизаны', short: 'Повстанцы', icon: '✊', desc: 'Партизаны-маоисты в горах. Собирают «революционный налог» с плантаций и обещают земельную реформу. Пока только собирают.' },
      liberals: { name: 'Оппозиция в жёлтом', short: 'Жёлтые', icon: '💛', desc: 'Адвокаты, бизнесмены и вдовы убитых оппозиционеров. Носят жёлтые ленты и знают, что на них смотрит Америка.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Кардинал выступает по церковному радио. Когда он зовёт людей на улицу, они выходят.' },
      oligarchs: { name: 'Друзья семьи', short: 'Друзья', icon: '⛳', desc: 'Сахарные, кокосовые и банановые монополии, розданные партнёрам по гольфу.' },
      hawks: { name: 'Армия и офицеры-реформисты', short: 'Офицеры', icon: '⚔️', desc: 'Генералы, верные вам лично, и молодые полковники-«реформисты», верные, кажется, кому-то ещё.' },
    },
    advisors: {
      defense: { name: 'Генерал Габриэль «Верный» Сантос', bio: 'Ваш бывший шофёр и телохранитель, теперь начальник генерального штаба. Шофёром он был отличным.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#111', hat: 'cap', hatColor: '#4a5a3a', glasses: 'aviator', mustache: 'none', brows: 'normal', mouth: 'flat', outfit: 'military', outfitColor: '#4a5a3a', medals: 9 } },
      economy: { name: 'Доктор Сесар Технократо', bio: 'Учился в Гарварде. Объясняет МВФ, куда делись кредиты, с помощью тридцати графиков. Ни один график не показывает, куда.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#222', glasses: 'square', mustache: 'none', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#3a3f4a', tie: '#1f4e8c', sweat: true } },
      police: { name: 'Полковник Хуан «Призрак» Кастильо', bio: 'Его люди ездят на джипах без номеров. Если ночью у дома стоит такой джип, утром хозяина дома не будет.', look: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#111', glasses: 'aviator', mustache: 'pencil', brows: 'angry', mouth: 'smirk', outfit: 'guayabera', outfitColor: '#e8e0c8' } },
      propaganda: { name: 'Мадам Роза Тысячатуфель', bio: 'Губернатор столицы, министр культуры и ваша супруга. Владеет тремя тысячами пар туфель и считает, что народ любит красоту.', look: { skin: SKIN.tan, face: 'oval', hair: 'bun', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'robe', outfitColor: '#f2c14e', trim: '#c1272d', earring: true, blush: true } },
      foreign: { name: 'Министр Эдуардо «Сенатор» Рейес', bio: 'Каждую субботу играет в гольф с американским послом. Счёт всегда в пользу посла — это и есть дипломатия.', look: { skin: SKIN.tan, face: 'long', hair: 'combover', hairColor: '#999', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'round', outfit: 'guayabera', outfitColor: '#f1ead6' } },
    },
  },
});

Object.assign(REGION_TITLES, {
  latam80: ['Генерал-Президент', 'Верховный Главнокомандующий', 'Президент Хунты', 'Пожизненный Президент', 'Каудильо', 'Благодетель', 'Отец Нации', 'Генералиссимус', 'Команданте', 'Координатор Революции'],
  east80: ['Генеральный секретарь', 'Первый секретарь', 'Председатель Госсовета', 'Председатель Военного совета', 'Светоч Нации', 'Первый Строитель', 'Вождь Нации', 'Кормчий Пятилеток', 'Маршал'],
  asia80: ['Президент', 'Пожизненный Президент', 'Отец Нации', 'Архитектор Нового Общества', 'Маршал', 'Верховный Вождь', 'Благодетель', 'Генералиссимус', 'Председатель'],
});
Object.assign(TITLE_FORMS, {
  'Верховный Главнокомандующий': ['Верховного Главнокомандующего', 'Верховным Главнокомандующим'], 'Президент Хунты': ['Президента Хунты', 'Президентом Хунты'],
  'Генеральный секретарь': ['Генерального секретаря', 'Генеральным секретарём'], 'Первый секретарь': ['Первого секретаря', 'Первым секретарём'],
  'Председатель Госсовета': ['Председателя Госсовета', 'Председателем Госсовета'], 'Председатель Военного совета': ['Председателя Военного совета', 'Председателем Военного совета'], 'Светоч Нации': ['Светоча Нации', 'Светочем Нации'], 'Первый Строитель': ['Первого Строителя', 'Первым Строителем'], 'Кормчий Пятилеток': ['Кормчего Пятилеток', 'Кормчим Пятилеток'],
  'Президент': ['Президента', 'Президентом'], 'Координатор Революции': ['Координатора Революции', 'Координатором Революции'], 'Председатель': ['Председателя', 'Председателем'], 'Архитектор Нового Общества': ['Архитектора Нового Общества', 'Архитектором Нового Общества'],
});
Object.assign(REGION_TALK, {
  latam80: { addr: 'мой генерал', sir: 'сеньор', lady: 'сеньора', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'гринго', haven: 'Майами', exileTo: 'Мадрид', canteen: 'фасоль с рисом', fruit_adj: 'Медный', locale: 'Анд', pay_in_kind: 'Медью.', vegas: 'андский Лас-Вегас', rebel: 'Команданте из гор', meeting: 'в офицерском казино' },
  east80: { addr: 'товарищ генеральный', sir: 'товарищ', lady: 'товарищ', holiday_acc: 'Первомай', holiday_dat: 'Первомаю', gringo: 'эти империалисты', haven: 'Вену', exileTo: 'Москву', canteen: 'суп из костей', fruit_adj: 'Тракторный', locale: 'Карпат', pay_in_kind: 'Тракторами.', vegas: 'валютный бар для иностранцев', rebel: 'Подпольщик с ксероксом', meeting: 'на охоте в правительственном заповеднике' },
  asia80: { addr: 'господин президент', sir: 'сэр', lady: 'мэм', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'американцы', haven: 'Гонолулу', exileTo: 'Гонолулу', canteen: 'рис с сушёной рыбой', fruit_adj: 'Кокосовый', locale: 'южных морей', pay_in_kind: 'Сахаром.', vegas: 'тропический Лас-Вегас', rebel: 'Командир повстанцев', meeting: 'в гольф-клубе' },
});
Object.assign(RELATIVES_BY_STYLE, {
  phil: { defense: 'Кузен Бонг', economy: 'Шурин Бенхамин', police: 'Тётушка Лолита', propaganda: 'Племянник Джоджо', foreign: 'Зять Октавио', abroad: 'в Гонолулу' },
});

ERAS['1980'] = {
  name: '1980-е', label: 'Конец холодной войны', start: 1980,
  blurb: 'Рейган и «империя зла», Афганистан, долговой кризис, перестройка. Покровитель платит, пока вы ему нужны, а к 1989 году вы ему уже не нужны.',
  regions: ['latam80', 'east80', 'asia80'], regimes: ['junta80', 'party80', 'family80'], titles: ['Генерал-Президент'],
  intro: 'Впереди десятилетие: новая холодная война, долги, которые пора отдавать, перестройка и 1989 год, когда режимы начнут падать один за другим.',
  aid: [['$patron', 72, 5], ['china', 65, 5], ['japan', 62, 5], ['frg', 62, 5]],
  vars: {
    blame: 'ЦРУ. Или КГБ', student_meme: 'Верните рок-клуб!', swim_ref: 'Например, сняться в кино. Рейган вот снимался в вестернах и стал президентом.', mast: 'МИРОВЫЕ НОВОСТИ',
    rebel_icon: 'портрет Че', friendly_paper: 'газете «Правда»', friendly_res: 'В Москве ваш портрет напечатали рядом с отчётом о надоях. Почётно.',
    china_offer: 'Пекин предлагает в кредит', china_quip: 'Москва будет недовольна. Москва и Пекин всё ещё в ссоре, а Вашингтон с Пекином теперь дружат.',
    china_workers: 'Две тысячи китайских инженеров прибыли с чертежами и термосами.', china_gift: 'фарфоровую вазу с портретом Дэн Сяопина',
  },
  defaultNames: { latam80: 'Хорхе Аугусто Вальверде', east80: 'Василе Богдан Строителеску', asia80: 'Эрнесто Хосе Бальтасар' },
};

// Персонажи 1980-х
function npc80(key, region) {
  const r = REGIONS[region], base = { skin: SKIN[r.leaderSkin] };
  const M = {
    imf_amb: { name: 'Эксперт МВФ мистер Голдсмит', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#c9b48a', mustache: 'none', brows: 'normal', mouth: 'flat', glasses: 'square', outfit: 'suit', outfitColor: '#1f2a44', tie: '#1f5fae' } },
    vatican_amb: { name: 'Папский нунций монсеньор Кальви-Сантори', look: { skin: SKIN.light, face: 'round', hair: 'bald', hairColor: '#aaa', mustache: 'none', brows: 'normal', mouth: 'smile', glasses: 'round', outfit: 'robe', outfitColor: '#141414', trim: '#7a1a5a', blush: true } },
    frg_amb: { name: 'Посол ФРГ герр Кредитманн', look: { skin: SKIN.light, face: 'square', hair: 'combover', hairColor: '#999', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'square', outfit: 'suit', outfitColor: '#3a3a40', tie: '#d6a63a' } },
    vietnam_amb: { name: 'Посол Вьетнама товарищ Нгуен', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'flat', outfit: 'mao', outfitColor: '#5a6a4a' } },
    dissident: { name: 'Диссидент с пишущей машинкой', look: { ...base, face: 'long', hair: 'curly', hairColor: '#3a2a1a', beard: 'full', mustache: 'thick', brows: 'worried', mouth: 'o', glasses: 'round', outfit: 'suit', outfitColor: '#5a5048', tie: 'none' } },
    mother: { name: 'Мать пропавшего студента', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#aaa', mustache: 'none', brows: 'worried', mouth: 'frown', hat: 'hijab', hatColor: '#f4f1ea', outfit: 'robe', outfitColor: '#2a2a3a', trim: '#f4f1ea' } },
    rocker: { name: 'Рок-музыкант из подвала', look: { ...base, face: 'long', hair: 'long', hairColor: '#1a1a1a', mustache: 'none', brows: 'angry', mouth: 'grin', glasses: 'aviator', outfit: 'hoodie', outfitColor: '#1a1a1a', earring: true } },
    yuppie: { name: 'Банкир с Уолл-стрит мистер Чейз', look: { skin: SKIN.light, face: 'square', hair: 'slick', hairColor: '#3a2a1a', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'suit', outfitColor: '#1d2433', tie: '#c1272d', glasses: 'none' } },
    contra: { name: 'Командир «борцов за свободу»', look: { ...base, face: 'square', hair: 'short', hairColor: '#111', hat: 'baseball', hatColor: '#4a5a3a', mustache: 'thick', brows: 'angry', mouth: 'smirk', glasses: 'aviator', outfit: 'military', outfitColor: '#5a5f3a', medals: 0 } },
    first_lady: { name: 'Первая леди', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#111', mustache: 'none', brows: 'normal', mouth: 'smirk', outfit: 'robe', outfitColor: '#f2c14e', trim: '#c1272d', earring: true, blush: true } },
  };
  return M[key] || null;
}

DICTATOR_CLUB['1980'] = [
  { name: 'Ким Ир Сен', land: 'КНДР', span: '1948–1994', years: 46, note: 'Основатель единственной в мире коммунистической династии. Его сына в 1980-х уже официально называли «любимым руководителем».' },
  { name: 'Энвер Ходжа', land: 'Албания', span: '1944–1985', years: 41, note: 'Поссорился с Югославией, СССР и Китаем и остался совсем один. Построил по всей стране сотни тысяч бетонных дотов.' },
  { name: 'Альфредо Стресснер', land: 'Парагвай', span: '1954–1989', years: 35, note: 'Восемь раз «побеждал» на выборах. В феврале 1989 года его сверг собственный генерал. Умер в Бразилии.' },
  { name: 'Тодор Живков', land: 'Болгария', span: '1954–1989', years: 35, note: 'Самый долгий правитель соцлагеря в Европе. Снят товарищами по партии на следующий день после падения Берлинской стены.' },
  { name: 'Мобуту Сесе Секо', land: 'Заир', span: '1965–1997', years: 32, note: 'Любимый союзник Вашингтона в Африке, пока шла холодная война. Когда она кончилась, друзья исчезли, а через несколько лет — и власть.' },
  { name: 'Николае Чаушеску', land: 'Румыния', span: '1965–1989', years: 24, note: '«Гений Карпат». Выплатил весь внешний долг, оставив страну без света и тепла. 21 декабря 1989 года толпа освистала его речь с балкона, через четыре дня его расстреляли.' },
  { name: 'Фердинанд Маркос', land: 'Филиппины', span: '1965–1986', years: 21, note: 'Военное положение, «Новое общество» и три тысячи пар туфель первой леди. В 1986 году «власть народа» вынудила его улететь на американском вертолёте на Гавайи.' },
  { name: 'Эрих Хонеккер', land: 'ГДР', span: '1971–1989', years: 18, note: 'В январе 1989 года пообещал, что Стена простоит ещё сто лет. Она простояла десять месяцев.' },
  { name: 'Аугусто Пиночет', land: 'Чили', span: '1973–1990', years: 17, note: 'Переворот, тысячи погибших и «чикагские мальчики». В 1988 году проиграл плебисцит и остался главнокомандующим армией ещё на восемь лет.' },
  { name: 'Жан-Клод Дювалье', land: 'Гаити', span: '1971–1986', years: 15, note: '«Бэби Док» унаследовал страну от отца в девятнадцать лет. В 1986 году улетел во Францию на американском самолёте.' },
  { name: 'Войцех Ярузельский', land: 'Польша', span: '1981–1989', years: 8, note: 'Ввёл военное положение против «Солидарности», а через восемь лет сел с ней за круглый стол и проиграл выборы.' },
  { name: 'Чон Ду Хван', land: 'Южная Корея', span: '1980–1988', years: 8, note: 'Пришёл к власти после переворота и подавления восстания в Кванджу. После июньских протестов 1987 года согласился на прямые выборы.' },
  { name: 'Мануэль Норьега', land: 'Панама', span: '1983–1989', years: 6, note: 'Много лет работал на ЦРУ, потом стал неудобен. В декабре 1989 года американцы вторглись в Панаму и увезли его в тюрьму во Флориде.' },
  { name: 'Леопольдо Галтьери', land: 'Аргентина', span: '1981–1982', years: 1, note: 'Решил поднять популярность хунты, захватив Фолклендские острова. Проиграл войну Британии за десять недель и лишился власти.' },
];
