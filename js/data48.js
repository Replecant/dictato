// ================= Эпоха «Весна народов»: 1845–1855 =================
// Германские земли, Итальянский полуостров и каудильо Латинской Америки.
// Над всем — Венская система 1815 года: Священный союз охраняет троны, Лондон и Париж торгуют и сочувствуют конституциям.

Object.assign(COUNTRIES, {
  austria: { name: 'Австрийская империя', bloc: 'east', flag: 'austria', leaders: [[1848.2, 'император Фердинанд (и канцлер Меттерних)'], [1848.92, 'император Фердинанд'], [9999, 'император Франц Иосиф']] },
  prussia: { name: 'Пруссия', bloc: 'east', flag: 'prussia', leaders: [[9999, 'король Фридрих Вильгельм IV']] },
  bavaria: { name: 'Бавария', bloc: 'neutral', flag: 'bavaria', leaders: [[1848.22, 'король Людвиг I'], [9999, 'король Максимилиан II']] },
  papal: { name: 'Папская область', bloc: 'neutral', flag: 'papal', leaders: [[1846.42, 'папа Григорий XVI'], [1848.9, 'папа Пий IX'], [1850.3, 'папа Пий IX (в изгнании в Гаэте)'], [9999, 'папа Пий IX']] },
  sardinia: { name: 'Сардинское королевство', bloc: 'neutral', flag: 'sardinia', leaders: [[1849.23, 'король Карл Альберт'], [1852.85, 'король Виктор Эммануил II'], [9999, 'король Виктор Эммануил II (и премьер Кавур)']] },
  naples: { name: 'Королевство Обеих Сицилий', bloc: 'neutral', flag: 'naples', leaders: [[9999, 'король Фердинанд II']] },
  spain: { name: 'Испания', bloc: 'neutral', flag: 'spain', leaders: [[1851.05, 'королева Изабелла II (и генерал Нарваэс)'], [1854.55, 'королева Изабелла II'], [9999, 'королева Изабелла II (и генерал Эспартеро)']] },
});
// Правители держав в 1845–1855 годах
COUNTRIES.russia.leaders48 = [[9999, 'император Николай I']];
COUNTRIES.uk.leaders48 = [[1846.5, 'премьер Пиль'], [1852.15, 'премьер Рассел (и лорд Пальмерстон)'], [1852.97, 'премьер Дерби'], [9999, 'премьер Абердин']];
COUNTRIES.france.leaders48 = [[1848.15, 'король Луи-Филипп'], [1848.95, 'Временное правительство'], [1852.92, 'президент Луи-Наполеон'], [9999, 'император Наполеон III']];
COUNTRIES.usa.leaders48 = [[1845.17, 'президент Тайлер'], [1849.17, 'президент Полк'], [1850.55, 'президент Тейлор'], [1853.17, 'президент Филлмор'], [9999, 'президент Пирс']];
COUNTRIES.mexico.leaders48 = [[1845.98, 'президент Эррера'], [1846.6, 'генерал Паредес'], [1847.7, 'генерал Санта-Анна'], [1848.45, 'временное правительство в Керетаро'], [1851.05, 'президент Эррера'], [1853.3, 'президент Ариста'], [9999, 'генерал Санта-Анна, «Светлейшее Высочество»']];
COUNTRIES.brazil.leaders48 = [[9999, 'император Педру II']];
// Лагеря эпохи: east — Священный союз, west — либеральные державы, axis — «Явное предначертание» (экспансия США)
const BLOC48 = { austria: [[1854.5, 'east'], [9999, 'neutral']], prussia: 'east', russia: 'east', uk: 'west', france: 'west', usa: 'axis' };

Object.assign(COUNTRY_CASES, {
  austria: ['Австрии', 'Австрией', 'в Вену'], prussia: ['Пруссии', 'Пруссией', 'в Берлин'], bavaria: ['Баварии', 'Баварией', 'в Мюнхен'],
  papal: ['Папской области', 'Папской областью', 'в Рим'], sardinia: ['Сардинского королевства', 'Сардинским королевством', 'в Турин'],
  naples: ['Королевства Обеих Сицилий', 'Королевством Обеих Сицилий', 'в Неаполь'], spain: ['Испании', 'Испанией', 'в Мадрид'],
});
Object.assign(FLAGS, {
  austria: `<rect width="30" height="10" fill="#111"/><rect y="10" width="30" height="10" fill="#f2c200"/>`,
  prussia: `<rect width="30" height="20" fill="#fff"/><rect width="30" height="4" fill="#111"/><rect y="16" width="30" height="4" fill="#111"/><path d="M15 6 L18 9 L17 13 L15 14.5 L13 13 L12 9 Z" fill="#111"/><path d="M11 8 L13 10 M19 8 L17 10" stroke="#111" stroke-width="1.4"/>`,
  bavaria: `<rect width="30" height="20" fill="#fff"/>${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4, 5, 6].map(c => ((r + c) % 2 ? '' : `<path d="M${c * 5 - 2.5 + (r % 2) * 2.5} ${r * 5} l2.5 -2.5 l2.5 2.5 l-2.5 2.5 z" fill="#3a8fd9"/>`)).join('')).join('')}`,
  papal: `<rect width="15" height="20" fill="#f2c200"/><rect x="15" width="15" height="20" fill="#fff"/><path d="M19 6 L26 13 M26 6 L19 13" stroke="#d6a63a" stroke-width="1.6"/><circle cx="22.5" cy="5" r="1.4" fill="#d6a63a"/>`,
  sardinia: `<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/><rect x="12.5" y="6" width="5" height="7" fill="#ce2b37" stroke="#1f4e8c" stroke-width="0.6"/><path d="M15 6.6 V12.4 M13 9.4 H17" stroke="#fff" stroke-width="1.1"/>`,
  naples: `<rect width="30" height="20" fill="#f4f1ea"/><ellipse cx="15" cy="10" rx="4.6" ry="5.4" fill="#1f4e8c" stroke="#d6a63a" stroke-width="0.8"/><path d="M13 8 h4 M13 10 h4 M13 12 h4" stroke="#f2c200" stroke-width="0.9"/>`,
  spain: `<rect width="30" height="20" fill="#c60b1e"/><rect y="5" width="30" height="10" fill="#ffc400"/><rect x="7" y="7" width="4" height="6" fill="#c60b1e" opacity="0.7"/>`,
});
// Флаги, которые в 1848 году выглядели иначе
const FLAGS48 = {
  brazil: `<rect width="30" height="20" fill="#009c3b"/><path d="M15 2 L28 10 L15 18 L2 10 Z" fill="#ffdf00"/><ellipse cx="15" cy="10" rx="3.6" ry="4.4" fill="#2a6a3a" stroke="#d6a63a" stroke-width="0.7"/><path d="M12.5 5 Q15 3.5 17.5 5" stroke="#d6a63a" stroke-width="0.9" fill="none"/>`,
  russia: `<rect width="30" height="20" fill="#fff"/><rect y="6.7" width="30" height="6.7" fill="#0039a6"/><rect y="13.3" width="30" height="6.7" fill="#d52b1e"/>`,
  usa: `<rect width="30" height="20" fill="#fff"/>${[0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 20 / 13}" width="30" height="${20 / 13}" fill="#b22234"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/>${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<circle cx="${1.6 + c * 2.4}" cy="${1.6 + r * 2.5}" r="0.55" fill="#fff"/>`).join('')).join('')}`,
};

const REGIME_SETS_48 = {
  crown: {
    name: 'Божьей милостью', icon: '👑',
    desc: 'Ваш трон подтвердил Венский конгресс, а охраняет Священный союз. Меттерних шлёт открытки на именины, студенты — эпиграммы.',
    byRegion: { latam48: { name: 'Восстановитель законов', icon: '🐎', desc: 'Вы навели порядок после двадцати лет гражданских войн: красная лента федералистов обязательна для всех, а ночные всадники в красных жилетах ездят по городу до утра. Лондон недоволен, асьендадо счастливы.' } },
    fx: { fear: 12, army: 6, support: -3 }, fac: { faith: { a: 15 }, oligarchs: { a: 15 }, liberals: { a: -18 }, left: { a: -8 } }, rel: { $east: 12, uk: -4, france: -6, spain: 10 },
  },
  charter: {
    name: 'Дарованная хартия', icon: '📜',
    desc: 'Вы подарили подданным конституцию — небольшую и с высоким имущественным цензом. Лондон аплодирует, Вена хмурится, Петербург молчит очень громко.',
    byRegion: { latam48: { name: 'Президент-либерал', icon: '📜', desc: 'Вы победили на выборах, в которых голосовала тысяча грамотных собственников. Либералы-«пурос» ликуют, архиепископ молится о вашем вразумлении.' } },
    fx: { economy: 5, support: 8, fear: -8 }, fac: { liberals: { a: 22 }, oligarchs: { a: 6 }, hawks: { a: -8 }, faith: { a: -6 } }, rel: { $west: 12, $east: -10, usa: 6 },
  },
  general: {
    name: 'Генерал-регент', icon: '⚔️',
    desc: 'Законный наследник ещё в колыбели, а вы — у его колыбели с саблей. Армия довольна, двор шепчется, а в Париже вспоминают молодого Бонапарта.',
    byRegion: { latam48: { name: 'Пронунсиамьенто', icon: '⚔️', desc: 'Вы объявили пронунсиамьенто в провинции, прошли маршем до столицы, и прежний президент уплыл на Ямайку. Это уже девятый такой поход в истории республики.' } },
    fx: { army: 16, fear: 12, support: -4, treasury: -10 }, fac: { hawks: { a: 25, s: 8 }, liberals: { a: -12 }, oligarchs: { a: -4 } }, rel: {},
  },
};
Object.assign(REGIME_TYPES, REGIME_SETS_48);
const DEFAULT_PILLARS_48 = { crown: ['faith', 'oligarchs'], charter: ['liberals', 'oligarchs'], general: ['hawks', 'oligarchs'] };

// Облик министров: сюртуки, мундиры со стоячим воротником, бакенбарды
const L48 = (o) => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', ...o });
Object.assign(REGIONS, {
  german48: {
    name: 'Германские земли', short: 'Германия',
    blurb: 'Сорок государств, один Таможенный союз и ни одной общей конституции. С севера смотрит Берлин, с юга — Вена, а профессора мечтают о парламенте во Франкфурте.',
    country: 'Великое герцогство Зонненберг', capital: 'Зонненштадт', currency: 'зонненбергский гульден',
    exports: 'лён и рейнское вино', exportGen: 'льна', company: '«Венская компания „Дунай и Рейн“»', patron: 'austria',
    sport: 'большой стрелковый праздник', rival: 'Княжество Шварцбах', rivalShort: 'Шварцбах',
    disputed: 'таможенный пост у Мельничного моста', faithLeader: 'Придворный проповедник', capitalSquare: 'Дворцовой площади',
    jungle: 'лесах Оденвальда', nephew: 'Фрицхен',
    countries: ['austria', 'prussia', 'russia', 'france', 'uk', 'bavaria'],
    relInit: { austria: 60, prussia: 50, russia: 52, france: 42, uk: 45, bavaria: 55 },
    flag: `<rect width="30" height="20" fill="#f2ead6"/><rect width="30" height="6.7" fill="#2a5a8c"/><rect y="13.3" width="30" height="6.7" fill="#d6a63a"/><circle cx="15" cy="10" r="2.8" fill="#d6a63a" stroke="#2a5a8c" stroke-width="0.8"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M15 10 L${15 + Math.cos(i * Math.PI / 4) * 4.6} ${10 + Math.sin(i * Math.PI / 4) * 4.6}" stroke="#d6a63a" stroke-width="0.6"/>`).join('')}`,
    leaderSkin: 'light', era: '1848', style: 'german', faithStyle: 'protestant', exile: 'Лондоне', critters: 'аистов',
    factions: {
      left: { name: 'Демократы и республиканцы', short: 'Демократы', icon: '✊', desc: 'Подмастерья, студенты и журналисты в широкополых шляпах с пером. Читают запрещённые брошюры и требуют республику. Немедленно.' },
      liberals: { name: 'Либералы и профессора', short: 'Либералы', icon: '🎓', desc: 'Профессора, адвокаты и врачи. Хотят конституцию, свободу печати и единую Германию с парламентом во Франкфурте. Спорят о деталях по шесть часов.' },
      faith: { name: 'Лютеранская церковь', short: 'Церковь', icon: '⛪', desc: 'Придворный проповедник напоминает, что всякая власть от Бога. Особенно та, что платит жалованье пасторам.' },
      oligarchs: { name: 'Дворянство и банкиры', short: 'Дворяне', icon: '🎩', desc: 'Бароны с поместьями и банкиры из Франкфурта. Первые презирают вторых, но занимают у них деньги.' },
      hawks: { name: 'Офицерский корпус', short: 'Офицеры', icon: '⚔️', desc: 'Юнкеры в мундирах. Считают, что любую конституцию лучше всего читать под барабанный бой.' },
    },
    advisors: {
      defense: { name: 'Генерал барон Ульрих фон Штиблетт', bio: 'Последний раз воевал при Ватерлоо и рассказывает об этом каждый день. По его словам, при Ватерлоо были он и ещё немного Веллингтона.', look: L48({ face: 'square', hair: 'short', hairColor: '#ddd', beard: 'sideburns', mustache: 'walrus', brows: 'bushy', browColor: '#ddd', hat: 'pickelhaube', hatColor: '#1d2330', outfit: 'uniform48', outfitColor: '#1d2a44', collar: '#c1272d', medals: 9, sash: '#d6a63a' }) },
      economy: { name: 'Тайный советник Готлиб Цольферайн', bio: 'Знает наизусть все тарифы Таможенного союза. Мечтает о железной дороге, а пока ездит на почтовой карете и ворчит, что она ползёт как черепаха.', look: L48({ face: 'long', hair: 'bald', hairColor: '#999', glasses: 'pince', beard: 'chinstrap', brows: 'worried', mouth: 'o', outfit: 'frock', outfitColor: '#2a2a2e', vest: '#7a5a2a', tie: '#111', sweat: true }) },
      police: { name: 'Полицай-директор Каспар Шпицель', bio: 'Читает все письма, приходящие в герцогство. Особенно любит любовные: говорит, в них больше всего крамолы.', look: L48({ face: 'oval', hair: 'slick', hairColor: '#222', mustache: 'pencil', brows: 'angry', mouth: 'smirk', hat: 'top', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#1a1a1e', vest: '#3a3a3a', tie: '#111' }) },
      propaganda: { name: 'Придворный поэт Амадей Фанфарен', bio: 'Пишет оды к вашим именинам и вымарывает чужие стихи. Красные чернила для цензуры закупают бочками.', look: L48({ face: 'round', hair: 'romantic', hairColor: '#8a5a2a', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'frock', outfitColor: '#5a2a3a', vest: '#d6a63a', tie: '#f4f1ea', blush: true }) },
      foreign: { name: 'Граф Максимилиан фон Вальс-Реверанс', bio: 'На Венском конгрессе был пажом и до сих пор считает, что Европа танцует, а не воюет. Договоры подписывает между двумя мазурками.', look: L48({ face: 'long', hair: 'romantic', hairColor: '#e8e2d0', beard: 'sideburns', glasses: 'monocle', brows: 'normal', mouth: 'smirk', outfit: 'frock', outfitColor: '#1d2433', vest: '#f4f1ea', tie: '#f4f1ea', sash: '#c1272d' }) },
    },
  },
  italy48: {
    name: 'Итальянский полуостров', short: 'Италия',
    blurb: 'Шёлк, оливки и опера. На севере — австрийские белые мундиры, в Риме — папа, а в каждой кофейне — заговорщики «Молодой Италии».',
    country: 'Королевство Беллависта', capital: 'Сан-Леонцио', currency: 'беллавистская лира',
    exports: 'шёлк и оливковое масло', exportGen: 'шёлка', company: '«Ломбардо-Венецианский шёлковый банк»', patron: 'austria',
    sport: 'палио — скачки на главной площади', rival: 'Герцогство Монтеверде', rivalShort: 'Монтеверде',
    disputed: 'соляные озёра у Монтеверде', faithLeader: 'Кардинал-архиепископ', capitalSquare: 'Пьяцца-дель-Дуомо',
    jungle: 'Апеннинах', nephew: 'Пеппино',
    countries: ['austria', 'papal', 'sardinia', 'naples', 'france', 'uk'],
    relInit: { austria: 60, papal: 58, sardinia: 45, naples: 50, france: 45, uk: 45 },
    flag: `<rect width="30" height="20" fill="#f2ead6"/><rect width="30" height="20" fill="none" stroke="#7a1f3d" stroke-width="3"/><path d="M15 4 L19 7 L19 12 Q15 16.5 11 12 L11 7 Z" fill="#7a1f3d" stroke="#d6a63a" stroke-width="0.8"/><path d="M13 9 Q15 7 17 9 Q15 12 13 9 Z" fill="#d6a63a"/>`,
    leaderSkin: 'tan', era: '1848', style: 'italy', faithStyle: 'catholic', exile: 'Лондоне', critters: 'голубей',
    factions: {
      left: { name: 'Мадзинисты и карбонарии', short: 'Карбонарии', icon: '🗡️', desc: 'Тайное общество «Молодая Италия». Клянутся на кинжалах, пишут шифром и мечтают о республике от Альп до Сицилии.' },
      liberals: { name: 'Умеренные либералы', short: 'Либералы', icon: '📜', desc: 'Адвокаты, графы-агрономы и издатели. Хотят конституцию, железную дорогу и единую Италию — но без крайностей и, желательно, под вашей короной.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Кардинал получает указания из Рима. Рим пока не решил, за реформы он или против.' },
      oligarchs: { name: 'Знать и землевладельцы', short: 'Знать', icon: '🎩', desc: 'Маркизы с виллами и долгами. Шёлковые фабрики, оливковые рощи и родственники в Вене.' },
      hawks: { name: 'Королевская гвардия', short: 'Гвардия', icon: '⚔️', desc: 'Швейцарские наёмники и местные офицеры. Первые верны жалованью, вторые — неизвестно чему.' },
    },
    advisors: {
      defense: { name: 'Генерал маркиз Ипполито Кавальери', bio: 'Носит семь орденов от семи государей, которым служил. Служил всем в разное время, поэтому ордена отлично сочетаются.', look: L48({ skin: SKIN.tan, face: 'round', hair: 'curly', hairColor: '#222', mustache: 'handlebar', beard: 'imperial', brows: 'bushy', hat: 'bicorne', hatColor: '#1a1a1a', plume: '#f4f1ea', outfit: 'uniform48', outfitColor: '#f1ede2', collar: '#7a1f3d', medals: 7, sash: '#1f4e8c' }) },
      economy: { name: 'Банкир Амброджо Ротонди', bio: 'Одалживает деньги вам, вашим врагам и папе римскому. Всем под разный процент, но всегда под хороший.', look: L48({ skin: SKIN.tan, face: 'round', hair: 'baldside', hairColor: '#555', mustache: 'walrus', brows: 'worried', mouth: 'smirk', outfit: 'frock', outfitColor: '#3a2e22', vest: '#d6a63a', tie: '#111', blush: true }) },
      police: { name: 'Комиссар Нерино Сбирро', bio: 'Его осведомители переодеты монахами, торговцами каштанами и уличными певцами. Певцы, к сожалению, поют.', look: L48({ skin: SKIN.tan, face: 'long', hair: 'slick', hairColor: '#111', mustache: 'pencil', beard: 'imperial', brows: 'angry', mouth: 'smirk', hat: 'slouch', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#141416', vest: '#141416', tie: '#111' }) },
      propaganda: { name: 'Маэстро Россано Фанфарелли', bio: 'Сочиняет оперы, где тиран всегда раскаивается в третьем акте. Публика аплодирует, но почему-то громче всего — хору рабов.', look: L48({ skin: SKIN.tan, face: 'oval', hair: 'romantic', hairColor: '#2b1b10', beard: 'chinstrap', brows: 'normal', mouth: 'grin', outfit: 'frock', outfitColor: '#1f2a44', vest: '#c1272d', tie: '#f4f1ea' }) },
      foreign: { name: 'Князь Клементе ди Сан-Мартелло', bio: 'Держит салон в Париже, где за одним столом обедают министры, заговорщики и поэты. Иногда это одни и те же люди.', look: L48({ skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#1a1210', mustache: 'pencil', beard: 'sideburns', brows: 'normal', mouth: 'smile', glasses: 'pince', outfit: 'frock', outfitColor: '#2a2a40', vest: '#f4f1ea', tie: '#111' }) },
    },
  },
  latam48: {
    name: 'Латинская Америка', short: 'Латинская Америка',
    blurb: 'Кошениль, красное дерево и сто двадцать генералов. На севере США воюют с Мексикой за полконтинента, а британский консул знает цену вашей кошенили в Лондоне.',
    country: 'Республика Кордильера', capital: 'Сан-Мигель-де-лас-Пальмас', currency: 'кордильерский песо',
    exports: 'кошениль и красное дерево', exportGen: 'кошенили', company: '«Лондонский торговый дом Пенниуорт и сыновья»', patron: 'uk',
    sport: 'большие петушиные бои на ярмарке', rival: 'Республика Лас-Сьеррас', rivalShort: 'Лас-Сьеррас',
    disputed: 'порт Санта-Каталина', faithLeader: 'Архиепископ', capitalSquare: 'Пласа-Майор',
    jungle: 'горах Сьерра-Мадре-дель-Сур', nephew: 'Панчито',
    countries: ['usa', 'uk', 'france', 'spain', 'mexico', 'brazil'],
    relInit: { usa: 45, uk: 55, france: 45, spain: 42, mexico: 52, brazil: 45 },
    flag: `<rect width="30" height="20" fill="#f2ead6"/><rect width="30" height="5" fill="#c1272d"/><rect y="15" width="30" height="5" fill="#1f4e8c"/><path d="M9 14 L13 8 L15 11 L18 6 L22 14 Z" fill="#3a5a2a"/><circle cx="20" cy="8.5" r="1.4" fill="#d6a63a"/>`,
    leaderSkin: 'tan', era: '1848', style: 'latam', faithStyle: 'catholic', exile: 'Гаване', critters: 'игуан',
    factions: {
      left: { name: 'Пеоны и индейские общины', short: 'Пеоны', icon: '🌽', desc: 'Крестьяне без земли и общины, у которых её отнимают. Пока молятся. Иногда берутся за мачете, как на Юкатане.' },
      liberals: { name: 'Либералы-«пурос»', short: 'Пурос', icon: '📜', desc: 'Молодые адвокаты в чёрных сюртуках. Хотят федерацию, светские школы и чтобы церковь продала свои земли. Последнее церкви не нравится.' },
      faith: { name: 'Католическая церковь', short: 'Церковь', icon: '✝️', desc: 'Самый крупный землевладелец страны. Архиепископ благословляет оружие — но только правильное.' },
      oligarchs: { name: 'Асьендадо и торговцы', short: 'Асьендадо', icon: '🎩', desc: 'Владельцы асьенд размером с европейское герцогство и торговцы, которые узнают цену кошенили в Лондоне раньше вас.' },
      hawks: { name: 'Генералы-каудильо', short: 'Генералы', icon: '⚔️', desc: 'В армии сто двадцать генералов и четыре тысячи солдат. Каждый генерал хоть раз объявлял пронунсиамьенто. Некоторые — против самих себя.' },
    },
    advisors: {
      defense: { name: 'Генерал Мариано Тромпета-и-Пистола', bio: 'Проиграл двенадцать сражений и выиграл тринадцать пронунсиамьенто. Считает, что второе важнее.', look: L48({ skin: SKIN.tan, face: 'round', hair: 'curly', hairColor: '#1a1410', mustache: 'handlebar', beard: 'sideburns', brows: 'bushy', hat: 'bicorne', hatColor: '#1a1a1a', plume: '#c1272d', outfit: 'uniform48', outfitColor: '#1f2a5a', collar: '#c1272d', medals: 12, sash: '#c1272d' }) },
      economy: { name: 'Дон Фаустино Кредитос', bio: 'Лондонские банкиры называют его «наш человек в Кордильере». Он называет их так же. Кто прав, выяснится при выплате займа.', look: L48({ skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#777', glasses: 'pince', mustache: 'pencil', brows: 'worried', mouth: 'o', outfit: 'frock', outfitColor: '#2a2a2e', vest: '#e8dcc0', tie: '#111', sweat: true }) },
      police: { name: 'Полковник Сиксто Кучильеро', bio: 'Командует ночными всадниками в красных жилетах. Красный цвет теперь носят все, кто хочет дожить до утра.', look: L48({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#111', mustache: 'thick', beard: 'chinstrap', brows: 'angry', mouth: 'smirk', hat: 'gaucho', hatColor: '#1a1a1a', outfit: 'poncho', outfitColor: '#9a1a1a', trim: '#1a1a1a' }) },
      propaganda: { name: 'Падре Эваристо Гасета', bio: 'Редактор единственной газеты страны. Печатает её на станке, конфискованном у либералов, и раздаёт после мессы.', look: L48({ skin: SKIN.tan, face: 'round', hair: 'baldside', hairColor: '#555', brows: 'normal', mouth: 'grin', hat: 'zucchetto', hatColor: '#111', outfit: 'cassock', outfitColor: '#141414', glasses: 'round', blush: true }) },
      foreign: { name: 'Дон Алехандро де Монтеверде-и-Лондрес', bio: 'Двадцать лет прожил в Лондоне и вернулся с зонтиком и привычкой пить чай в пять. Зонтик в сезон дождей очень пригодился.', look: L48({ skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#bbb', beard: 'sideburns', mustache: 'none', brows: 'normal', mouth: 'smirk', glasses: 'monocle', hat: 'top', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#1d1d22', vest: '#7a1f3d', tie: '#f4f1ea' }) },
    },
  },
});

const TITLES_48 = ['Великий герцог', 'Король', 'Регент', 'Каудильо'];
Object.assign(REGION_TITLES, {
  german48: ['Великий герцог', 'Регент', 'Светлейший государь', 'Отец Отечества', 'Генерал-регент', 'Курфюрст', 'Ландграф', 'Защитник Порядка'],
  italy48: ['Король', 'Регент', 'Государь', 'Отец Отечества', 'Генерал-регент', 'Король-Гражданин', 'Защитник Веры', 'Освободитель'],
  latam48: ['Восстановитель Законов', 'Президент', 'Каудильо', 'Светлейшее Высочество', 'Верховный Директор', 'Пожизненный Президент', 'Генерал-Президент', 'Защитник Отечества', 'Благодетель'],
});
Object.assign(TITLE_FORMS, {
  'Великий герцог': ['Великого герцога', 'Великим герцогом'], 'Светлейший государь': ['Светлейшего государя', 'Светлейшим государем'],
  'Отец Отечества': ['Отца Отечества', 'Отцом Отечества'], 'Генерал-регент': ['Генерала-регента', 'Генералом-регентом'], 'Курфюрст': ['Курфюрста', 'Курфюрстом'],
  'Ландграф': ['Ландграфа', 'Ландграфом'], 'Защитник Порядка': ['Защитника Порядка', 'Защитником Порядка'], 'Король': ['Короля', 'Королём'], 'Государь': ['Государя', 'Государем'],
  'Король-Гражданин': ['Короля-Гражданина', 'Королём-Гражданином'], 'Защитник Веры': ['Защитника Веры', 'Защитником Веры'], 'Освободитель': ['Освободителя', 'Освободителем'],
  'Восстановитель Законов': ['Восстановителя Законов', 'Восстановителем Законов'], 'Светлейшее Высочество': ['Светлейшего Высочества', 'Светлейшим Высочеством'],
  'Верховный Директор': ['Верховного Директора', 'Верховным Директором'], 'Защитник Отечества': ['Защитника Отечества', 'Защитником Отечества'],
});

Object.assign(REGION_TALK, {
  german48: { addr: 'ваше королевское высочество', sir: 'герр', lady: 'фрау', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'эти господа из Франкфурта', haven: 'Лондон', exileTo: 'Лондон', canteen: 'картофельный суп', fruit_adj: 'Льняной', locale: 'германских земель', pay_in_kind: 'Бочками пива.', vegas: 'игорный дом как в Баден-Бадене', rebel: 'Вожак вольных стрелков', meeting: 'в пивном погребке' },
  italy48: { addr: 'ваше величество', sir: 'синьор', lady: 'синьора', holiday_acc: 'Пасху', holiday_dat: 'Пасхе', gringo: 'эти австрийцы', haven: 'Лондон', exileTo: 'Лондон', canteen: 'поленту', fruit_adj: 'Оливковый', locale: 'Апеннин', pay_in_kind: 'Оливковым маслом.', vegas: 'игорный дом как на Лидо', rebel: 'Вожак карбонариев', meeting: 'в кафе у оперного театра' },
  latam48: { addr: 'ваше превосходительство', sir: 'сеньор', lady: 'сеньора', holiday_acc: 'Рождество', holiday_dat: 'Рождеству', gringo: 'гринго', haven: 'Гавану', exileTo: 'Ямайку', canteen: 'тортильи с фасолью', fruit_adj: 'Кошенильный', locale: 'Кордильер', pay_in_kind: 'Мешками кошенили.', vegas: 'петушиные бои с игорным домом', rebel: 'Каудильо с гор', meeting: 'на петушиных боях' },
});
Object.assign(FAITH_TALK, {
  protestant: { priest_open: 'Брат во Христе... Простите, {addr}.', heavens: 'небесам', faith_quip: 'Господь не голосует. Но паства читает Библию — и газеты.', sermon: 'воскресной проповеди', faith_appeal: 'Я напишу в консисторию... и скажу об этом с кафедры.', temple_loc: 'в кирхе', righteous: 'Консистория называет вас «благочестивым государем»' },
});
Object.assign(RELATIVES_BY_STYLE, {
  german: { defense: 'Кузен Отто', economy: 'Шурин Бенедикт', police: 'Дядюшка Август', propaganda: 'Племянник Вилли', foreign: 'Зять Леопольд', abroad: 'в Баден-Бадене' },
  italy: { defense: 'Кузен Томмазо', economy: 'Шурин Бенедетто', police: 'Дядюшка Ассунто', propaganda: 'Племянник Нино', foreign: 'Зять Оттавио', abroad: 'в Ницце' },
});
const RELATIVE_LOOK_48 = {
  defense: { face: 'round', hair: 'curly', hairColor: '#2b2118', hat: 'shako', hatColor: '#1a1a1a', plume: '#c1272d', mustache: 'waxed', brows: 'normal', mouth: 'grin', outfit: 'uniform48', outfitColor: '#2a3a6a', collar: '#d6a63a', medals: 3 },
  economy: { face: 'round', hair: 'combover', hairColor: '#3a2a1a', mustache: 'none', beard: 'sideburns', brows: 'worried', mouth: 'smile', glasses: 'pince', outfit: 'frock', outfitColor: '#6a4a2a', vest: '#e07a1f', tie: '#111' },
  police: { face: 'round', hair: 'bun', hairColor: '#9a9a9a', mustache: 'none', brows: 'angry', mouth: 'smirk', glasses: 'round', hat: 'bonnet', hatColor: '#4a2a5a', outfit: 'gown', outfitColor: '#2e2e3a', trim: '#8e44ad', earring: true },
  propaganda: { face: 'oval', hair: 'romantic', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'frock', outfitColor: '#7a2a5a', vest: '#f2c14e', tie: '#f4f1ea' },
  foreign: { face: 'long', hair: 'slick', hairColor: '#111', mustache: 'waxed', beard: 'imperial', brows: 'normal', mouth: 'smirk', glasses: 'monocle', outfit: 'frock', outfitColor: '#d8c27a', vest: '#c1272d', tie: '#111' },
};

ERAS['1848'] = {
  name: '1840-е', label: 'Весна народов', start: 1845,
  blurb: 'Баррикады в Париже, Вене и Берлине, Меттерних в бегах, Священный союз охраняет троны. Железная дорога и телеграф разносят новости быстрее курьеров.',
  regions: ['german48', 'italy48', 'latam48'], regimes: ['crown', 'charter', 'general'], titles: TITLES_48,
  intro: 'Впереди десятилетие: голодные сороковые, Весна народов 1848 года, реакция и Крымская война, которая похоронит Венскую систему.',
  aid: [['austria', 60, 4], ['russia', 62, 4], ['prussia', 60, 4], ['uk', 60, 4], ['france', 62, 4], ['usa', 62, 5], ['spain', 62, 5], ['$patron', 60, 4]],
  vars: {
    blame: 'тайное общество. Или английский агент', student_meme: 'Свободу печати!', swim_ref: 'Например, переплыть пролив, как лорд Байрон. Публика до сих пор в восторге.',
    // шапка экстренного выпуска: в республике и в Италии — своя газета
    get mast() { return S && S.region === 'latam48' ? 'ЭЛЬ МОНИТОР РЕПУБЛИКАНО' : S && S.region === 'italy48' ? 'ГАДЗЕТТА ДИ БЕЛЛАВИСТА' : 'ПРИДВОРНЫЕ ВЕДОМОСТИ'; }, rebel_icon: 'трёхцветную кокарду', friendly_paper: 'петербургской «Северной пчеле»',
    friendly_res: 'В Петербурге ваш портрет напечатали рядом с высочайшим указом о борьбе с вольнодумством. Почётно.',
  },
  defaultNames: { german48: 'Леопольд Карл Август', italy48: 'Себастьяно Луиджи Маурицио', latam48: 'Мануэль Антонио де Вильясеньор' },
};

// Персонажи 1840-х: послы держав, нунций, подмастерье, студент-бурш
function npc48(key, region) {
  const r = REGIONS[region], base = { skin: SKIN[r.leaderSkin] };
  const it = r.style === 'italy', lat = r.style === 'latam';
  const M = {
    austria_amb: { name: 'Посол Австрии князь Шварценклотц', look: L48({ face: 'long', hair: 'romantic', hairColor: '#ddd', beard: 'sideburns', glasses: 'monocle', mouth: 'smirk', outfit: 'uniform48', outfitColor: '#f1ede2', collar: '#c1272d', medals: 6, sash: '#c1272d' }) },
    russia_amb: { name: 'Посол России граф Кулебякин', look: L48({ face: 'round', hair: 'baldside', hairColor: '#bbb', beard: 'sideburns', mustache: 'walrus', brows: 'bushy', browColor: '#999', outfit: 'uniform48', outfitColor: '#1a3a2a', collar: '#c1272d', medals: 8, sash: '#3a7ac9', blush: true }) },
    prussia_amb: { name: 'Посол Пруссии фон Пиккель', look: L48({ face: 'square', hair: 'short', hairColor: '#c9b48a', mustache: 'waxed', brows: 'angry', hat: 'pickelhaube', hatColor: '#1a1a1a', outfit: 'uniform48', outfitColor: '#1d2a44', collar: '#c1272d', medals: 4 }) },
    uk_amb: { name: 'Посланник Британии лорд Чатни', look: L48({ face: 'long', hair: 'short', hairColor: '#b5651d', beard: 'sideburns', mouth: 'smirk', hat: 'top', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#1d1d22', vest: '#f4f1ea', tie: '#111' }) },
    france_amb: { name: 'Посланник Франции месье де Бульон', look: L48({ face: 'oval', hair: 'romantic', hairColor: '#3a2a1a', mustache: 'waxed', beard: 'imperial', mouth: 'smirk', outfit: 'frock', outfitColor: '#1f2a5a', vest: '#f4f1ea', tie: '#c1272d', sash: '#c1272d' }) },
    usa_amb: { name: 'Посланник США мистер Брэкстон', look: L48({ face: 'square', hair: 'romantic', hairColor: '#c9a640', beard: 'chinstrap', mouth: 'grin', hat: 'top', hatColor: '#3a2a1a', outfit: 'frock', outfitColor: '#2c3e60', vest: '#c1272d', tie: '#111' }) },
    nuncio: { name: 'Папский нунций монсеньор Ладанелли', look: L48({ skin: SKIN.tan, face: 'round', hair: 'baldside', hairColor: '#777', mouth: 'smile', hat: 'zucchetto', hatColor: '#8e2a5a', outfit: 'cassock', outfitColor: '#5a1a3a', glasses: 'round', blush: true }) },
    journalist: { name: 'Редактор вольной газеты', look: { ...base, face: 'long', hair: 'romantic', hairColor: '#3a2a1a', beard: 'chinstrap', brows: 'angry', mouth: 'o', glasses: 'round', hat: 'slouch', hatColor: '#2a2a2a', outfit: 'frock', outfitColor: '#2a2a30', vest: '#5a1a1a', tie: '#111' } },
    worker: { name: lat ? 'Вожак пеонов' : 'Подмастерье-ткач', look: { ...base, face: 'square', hair: 'short', hairColor: '#2a2018', mustache: 'thick', brows: 'angry', mouth: 'frown', hat: lat ? 'gaucho' : 'flatcap', hatColor: '#4a3a2a', outfit: lat ? 'poncho' : 'blouse', outfitColor: lat ? '#8a5a2a' : '#3a5a8a', trim: '#e8dcc0' } },
    student: { name: it ? 'Студент из Падуи' : lat ? 'Студент-«пуро»' : 'Студент-бурш', look: { ...base, face: 'long', hair: 'romantic', hairColor: '#2b1b10', mustache: 'none', beard: 'none', brows: 'angry', mouth: 'o', hat: it ? 'slouch' : 'studentcap', hatColor: it ? '#1a1a1a' : '#7a1f3d', outfit: 'frock', outfitColor: '#2a2a40', vest: '#d6a63a', tie: '#c1272d' } },
    rebel: { name: lat ? 'Каудильо с гор' : 'Вожак вольных стрелков', look: { ...base, face: 'square', hair: 'romantic', hairColor: '#1a1410', beard: 'full', mustache: 'thick', brows: 'angry', mouth: 'grin', hat: lat ? 'gaucho' : 'slouch', hatColor: '#2a2a2a', plume: '#c1272d', outfit: lat ? 'poncho' : 'blouse', outfitColor: lat ? '#5a3a1a' : '#5a2a2a', trim: '#d6a63a' } },
    priest: { name: r.faithLeader, look: r.faithStyle === 'protestant'
      ? { ...base, face: 'long', hair: 'romantic', hairColor: '#ddd', beard: 'chinstrap', brows: 'bushy', browColor: '#ddd', mouth: 'flat', outfit: 'cassock', outfitColor: '#141414', glasses: 'round', bands: true }
      : { ...base, face: 'round', hair: 'baldside', hairColor: '#aaa', brows: 'bushy', browColor: '#aaa', mouth: 'flat', hat: 'zucchetto', hatColor: it ? '#b01a2a' : '#7a1a5a', outfit: 'cassock', outfitColor: it ? '#9a1a2a' : '#141414', blush: true } },
    banker: { name: 'Барон Ротшильд-младший, франкфуртский банк', look: L48({ face: 'long', hair: 'short', hairColor: '#3a2a1a', beard: 'chinstrap', mouth: 'smirk', hat: 'top', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#1d1d22', vest: '#d6a63a', tie: '#111' }) },
    first_lady: { name: lat ? 'Сеньора супруга' : 'Её высочество супруга', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smirk', outfit: 'gown', outfitColor: '#7a1f3d', trim: '#f4f1ea', earring: true } },
    nephew: { name: `Племянник ${r.nephew}`, look: { ...base, face: 'round', hair: 'romantic', hairColor: '#2b1b10', mustache: 'none', brows: 'normal', mouth: 'grin', outfit: 'uniform48', outfitColor: '#f1ede2', collar: '#d6a63a', medals: 2, blush: true } },
    professor: { name: 'Профессор Гримм-Шлегель из Гёттингена', look: L48({ face: 'long', hair: 'romantic', hairColor: '#ddd', beard: 'full', brows: 'bushy', browColor: '#ddd', mouth: 'o', glasses: 'round', outfit: 'frock', outfitColor: '#3a3a30', vest: '#5a4a2a', tie: '#111' }) },
    exdictator: { name: lat ? 'Бывший президент в изгнании' : 'Бывший король в изгнании', look: L48({ face: 'round', hair: 'baldside', hairColor: '#ccc', beard: 'sideburns', mouth: 'frown', brows: 'worried', hat: 'top', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#2a2a2a', vest: '#5a5a5a', tie: '#111', sweat: true }) },
    colonel: { name: 'Полковник гвардии', look: { ...base, face: 'square', hair: 'short', hairColor: '#2a2018', mustache: 'waxed', brows: 'angry', mouth: 'flat', hat: 'shako', hatColor: '#1a1a1a', plume: '#f4f1ea', outfit: 'uniform48', outfitColor: '#2a3a5a', collar: '#c1272d', medals: 3 } },
    spy: { name: 'Таинственный незнакомец в плаще', look: L48({ face: 'long', hair: 'slick', hairColor: '#777', brows: 'worried', mouth: 'flat', hat: 'slouch', hatColor: '#1a1a1a', outfit: 'frock', outfitColor: '#111', vest: '#111', tie: '#111' }) },
  };
  return M[key] || null;
}

// Клуб диктаторов: реальные правители эпохи
DICTATOR_CLUB['1848'] = [
  { name: 'Мухаммед Али', land: 'Египет', span: '1805–1848', years: 43, note: 'Албанский офицер, ставший пашой Египта. Перебил мамлюков после торжественного приёма в цитадели и построил армию по европейскому образцу.' },
  { name: 'Клеменс фон Меттерних', land: 'Австрийская империя', span: '1809–1848', years: 39, note: 'Архитектор Венской системы. Сорок лет держал Европу в равновесии, а печать — под цензурой. В марте 1848 года бежал из Вены в Лондон.' },
  { name: 'Пий IX', land: 'Папская область', span: '1846–1870', years: 24, note: 'Начинал как папа-реформатор, бежал от революции в Гаэту и вернулся в Рим под защитой французских штыков.' },
  { name: 'Николай I', land: 'Российская империя', span: '1825–1855', years: 30, note: 'Подавил декабристов в первый день царствования, а в 1849 году — венгерскую революцию. В Европе его звали «жандармом». Умер во время Крымской войны.' },
  { name: 'Фердинанд II', land: 'Королевство Обеих Сицилий', span: '1830–1859', years: 29, note: 'В 1848 году обстрелял восставшую Мессину из пушек и получил прозвище «Король-бомба».' },
  { name: 'Людвиг I', land: 'Бавария', span: '1825–1848', years: 23, note: 'Перестраивал Мюнхен по образцу Афин. Потерял трон из-за танцовщицы Лолы Монтес, которую сделал графиней.' },
  { name: 'Хуан Мануэль де Росас', land: 'Аргентинская конфедерация', span: '1829–1832, 1835–1852', years: 20, note: 'Титуловал себя «Восстановителем законов», а его «Масорка» убивала несогласных. Разбит при Касеросе, бежал в Англию и четверть века фермерствовал под Саутгемптоном.' },
  { name: 'Луи-Филипп', land: 'Франция', span: '1830–1848', years: 18, note: '«Король-гражданин» с зонтиком. Отказался расширить избирательное право — и в феврале 1848 года бежал в Англию под именем «мистер Смит».' },
  { name: 'Фридрих Вильгельм IV', land: 'Пруссия', span: '1840–1858', years: 18, note: 'Отказался от императорской короны, которую предложил Франкфуртский парламент: «корона из грязи и глины». Конституцию даровал сам — и сам же переписал.' },
  { name: 'Карл Альберт', land: 'Сардинское королевство', span: '1831–1849', years: 18, note: 'Дал конституцию и объявил войну Австрии. Проиграл при Новаре, отрёкся в тот же вечер и уехал в Португалию.' },
  { name: 'Рафаэль Каррера', land: 'Гватемала', span: '1844–1848, 1851–1865', years: 18, note: 'Неграмотный погонщик свиней, ставший каудильо. Через три года после отставки вернулся и стал пожизненным президентом.' },
  { name: 'Карлос Антонио Лопес', land: 'Парагвай', span: '1844–1862', years: 18, note: 'Построил железную дорогу и верфь, а сына сделал генералом в восемнадцать лет. Сын потом начнёт войну против трёх соседей сразу.' },
  { name: 'Фердинанд I', land: 'Австрийская империя', span: '1835–1848', years: 13, note: 'Добрейший император, за которого правил Меттерних. Самая известная фраза: «Я император, и я хочу клёцок!» Отрёкся в пользу племянника.' },
  { name: 'Антонио Лопес де Санта-Анна', land: 'Мексика', span: '1833–1855', years: 6, note: 'Одиннадцать раз становился президентом. Похоронил с воинскими почестями собственную ногу, потерянную в бою. В 1853 году велел титуловать себя «Светлейшим Высочеством».' },
];
