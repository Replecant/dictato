// ================= Эпоха 1905–1914: канонерки и концессии =================
// Балканы, эмират в Персидском заливе и гималайское княжество. Над всем — Антанта и Тройственный союз.

Object.assign(COUNTRIES, {
  ottoman: { name: 'Османская империя', bloc: 'neutral', flag: 'ottoman', leaders: [[1908.55, 'султан Абдул-Хамид II'], [1909.3, 'султан Абдул-Хамид II (и младотурки)'], [1913.05, 'султан Мехмед V (и младотурки)'], [9999, 'Энвер-паша и младотурки']] },
  serbia: { name: 'Сербия', bloc: 'neutral', flag: 'serbia', leaders: [[9999, 'король Пётр I']] },
  persia: { name: 'Персия', bloc: 'neutral', flag: 'persia', leaders: [[1907.0, 'шах Мозафереддин'], [1909.55, 'шах Мохаммад Али'], [9999, 'малолетний шах Ахмад']] },
  brindia: { name: 'Британская Индия', bloc: 'west', flag: 'brindia', leaders: [[1905.9, 'вице-король лорд Керзон'], [1910.9, 'вице-король лорд Минто'], [9999, 'вице-король лорд Хардинг']] },
  nepal: { name: 'Непал', bloc: 'neutral', flag: 'nepal', leaders: [[9999, 'махараджа Чандра Шамшер']] },
});
COUNTRIES.uk.leaders05 = [[1905.95, 'премьер Бальфур'], [1908.3, 'премьер Кэмпбелл-Баннерман'], [9999, 'премьер Асквит']];
COUNTRIES.france.leaders05 = [[1906.2, 'премьер Рувье'], [1906.8, 'премьер Сарьен'], [1909.55, 'премьер Клемансо'], [1911.15, 'премьер Бриан'], [1912.05, 'премьер Кайо'], [1913.1, 'премьер Пуанкаре'], [9999, 'президент Пуанкаре']];
COUNTRIES.russia.leaders05 = [[9999, 'император Николай II']];
COUNTRIES.germany.leaders05 = [[9999, 'кайзер Вильгельм II']];
COUNTRIES.austria.leaders05 = [[9999, 'император Франц Иосиф']];
COUNTRIES.italy.leaders05 = [[9999, 'король Виктор Эммануил III (и премьер Джолитти)']];
COUNTRIES.china.leaders05 = [[1908.87, 'вдовствующая императрица Цыси'], [1912.1, 'регент Цзайфэн'], [9999, 'президент Юань Шикай']];
COUNTRIES.japan.leaders05 = [[1912.55, 'император Мэйдзи'], [9999, 'император Тайсё']];
// Лагеря: west — Антанта, axis — Тройственный союз; Италия уходит в нейтралитет в августе 1914, Турция присоединяется к Германии в ноябре
const BLOC05 = {
  uk: 'west', france: 'west', russia: 'west', brindia: 'west', japan: 'west',
  germany: 'axis', austria: 'axis', italy: [[1914.55, 'axis'], [9999, 'neutral']], ottoman: [[1914.8, 'neutral'], [9999, 'axis']],
};
Object.assign(COUNTRY_CASES, {
  ottoman: ['Османской империи', 'Османской империей', 'в Стамбул'], serbia: ['Сербии', 'Сербией', 'в Белград'], persia: ['Персии', 'Персией', 'в Тегеран'],
  brindia: ['Британской Индии', 'Британской Индией', 'в Калькутту'], nepal: ['Непала', 'Непалом', 'в Катманду'],
});
Object.assign(FLAGS, {
  ottoman: `<rect width="30" height="20" fill="#e30a17"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.3" cy="10" r="4" fill="#e30a17"/><circle cx="18.5" cy="10" r="1.6" fill="#fff"/>`,
  serbia: `<rect width="30" height="6.7" fill="#c6363c"/><rect y="6.7" width="30" height="6.7" fill="#0c4076"/><rect y="13.3" width="30" height="6.7" fill="#fff"/>`,
  persia: `<rect width="30" height="6.7" fill="#239f40"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#da0000"/><circle cx="15" cy="10" r="2.2" fill="#d6a63a"/><path d="M12 11.5 h6" stroke="#8a5a1a" stroke-width="1"/>`,
  brindia: `<rect width="30" height="20" fill="#c8102e"/><rect width="13" height="9" fill="#012169"/><path d="M0 0 L13 9 M13 0 L0 9" stroke="#fff" stroke-width="1.4"/><path d="M6.5 0 V9 M0 4.5 H13" stroke="#fff" stroke-width="2.4"/><path d="M6.5 0 V9 M0 4.5 H13" stroke="#c8102e" stroke-width="1.2"/><circle cx="21" cy="13" r="3.4" fill="#f2c200"/>`,
  nepal: `<rect width="30" height="20" fill="#f4f1ea"/><path d="M8 2 L22 10 L12 10 L22 18 L8 18 Z" fill="#dc143c" stroke="#003893" stroke-width="1.2"/><circle cx="12" cy="8" r="1.3" fill="#fff"/><circle cx="12" cy="14" r="1.6" fill="#fff"/>`,
});
// Флаги, которые до 1914 года выглядели иначе
const FLAGS05 = {
  germany: `<rect width="30" height="6.7" fill="#111"/><rect y="6.7" width="30" height="6.7" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#dd0000"/>`,
  italy: FLAGS.sardinia,
  china: `<rect width="30" height="20" fill="#f2c200"/><path d="M7 13 Q10 6 15 9 Q20 12 23 6" stroke="#1f4e8c" stroke-width="2.4" fill="none"/><circle cx="23" cy="6" r="2" fill="#c1272d"/>`,
};

Object.assign(REGIME_TYPES, {
  throne05: {
    name: 'Сильная корона', icon: '👑',
    desc: 'Вы правите, как правили деды: двор, гвардия и духовенство за вас, газеты — под надзором. Державы считают вас «надёжным партнёром», то есть удобным.',
    byRegion: {
      gulf05: { name: 'Шейх-основатель', icon: '🗡️', desc: 'Вы пришли к власти по старому обычаю — убрав братьев. Турки возмущены, британцы с интересом смотрят на ваш порт.' },
      himal05: { name: 'Драгоценный владыка', icon: '☸️', desc: 'Монастыри признали вас перерождением святого, знать — правителем, а британцы пока не решили, кем вас считать.' },
    },
    fx: { fear: 10, army: 6, support: -2 }, fac: { faith: { a: 15 }, oligarchs: { a: 12 }, liberals: { a: -15 } }, rel: { $patron: 6 },
  },
  officers05: {
    name: 'Офицерский заговор', icon: '🗡️',
    desc: 'Майской ночью офицеры ворвались во дворец, и прежний король больше не проснулся. Корону предложили вам. Офицеры напоминают об этом каждый день.',
    byRegion: {
      gulf05: { name: 'Бедуинская гвардия', icon: '⚔️', desc: 'Вас привели к власти бедуинские шейхи и триста всадников. Они ждут добычи и не любят купцов.' },
      himal05: { name: 'Регент новой армии', icon: '⚔️', desc: 'Владыка ещё ребёнок, а вы — генерал новой армии, обученной британцами. Монастыри смотрят на ваши ружья с подозрением.' },
    },
    fx: { army: 15, fear: 10, support: -4 }, fac: { hawks: { a: 25, s: 8 }, liberals: { a: -10 }, faith: { a: -6 } }, rel: {},
  },
  reform05: {
    name: 'Король-реформатор', icon: '📜',
    desc: 'Вы обещали парламент, железные дороги и школы. Лондон и Париж аплодируют, офицеры «Братства» точат кинжалы, а банкиры уже несут займы.',
    byRegion: {
      gulf05: { name: 'Меджлис купцов', icon: '📜', desc: 'Вы созвали совет купцов и обещали открыть школу и почту. Улемы морщатся, британский резидент доволен.' },
      himal05: { name: 'Реформатор с телеграфом', icon: '📡', desc: 'Вы учились в Индии и хотите школы, монету и телеграф. Великие монастыри называют это ересью.' },
    },
    fx: { economy: 4, support: 8, fear: -6 }, fac: { liberals: { a: 20 }, faith: { a: -10 }, oligarchs: { a: -4 } }, rel: { $west: 8 },
  },
});
const DEFAULT_PILLARS_05 = { throne05: ['faith', 'oligarchs'], officers05: ['hawks', 'oligarchs'], reform05: ['liberals', 'oligarchs'] };

Object.assign(REGIONS, {
  balkan05: {
    name: 'Балканы', short: 'Балканы',
    blurb: 'Табак, сливы и свиньи. Молодое королевство между Австро-Венгрией, Россией и слабеющей Турцией. Офицеры в тайных обществах мечтают о Великой Гордании, а Европа называет ваш полуостров пороховой бочкой.',
    country: 'Королевство Гордания', capital: 'Новиград', currency: 'горданский динар',
    exports: 'табак, сливы и свиньи', exportGen: 'свиней', company: '«Венское табачное общество»', patron: 'russia',
    sport: 'большие конные скачки на Видовдан', rival: 'Княжество Ведрица', rivalShort: 'Ведрица',
    disputed: 'долины Трёх Монастырей', faithLeader: 'Митрополит', capitalSquare: 'Королевской площади',
    jungle: 'Проклятых горах', nephew: 'Душан',
    countries: ['russia', 'austria', 'germany', 'ottoman', 'france', 'serbia'],
    relInit: { russia: 58, austria: 45, germany: 42, ottoman: 35, france: 50, serbia: 55 },
    flag: `<rect width="30" height="6.7" fill="#c1272d"/><rect y="6.7" width="30" height="6.7" fill="#f2ead6"/><rect y="13.3" width="30" height="6.7" fill="#1f4e8c"/><path d="M15 4.5 L18 7.5 L18 12 Q15 15.5 12 12 L12 7.5 Z" fill="#d6a63a" stroke="#7a1f1f" stroke-width="0.7"/>`,
    leaderSkin: 'light', era: '1905', style: 'europe', faithStyle: 'orthodox', exile: 'Вене', critters: 'свиней',
    factions: {
      left: { name: 'Аграрии и социалисты', short: 'Аграрии', icon: '✊', desc: 'Крестьяне, которые хотят земли, и учителя, которые хотят социализма. Иногда это одни и те же люди.' },
      liberals: { name: 'Радикальная партия и студенты', short: 'Радикалы', icon: '📜', desc: 'Парламент, свобода печати и союз с Россией. Студенты учились в Женеве и вернулись с бородами и брошюрами.' },
      faith: { name: 'Православная церковь', short: 'Церковь', icon: '☦️', desc: 'Митрополит помнит турок, помнит прежнюю династию и рассчитывает пережить вашу.' },
      oligarchs: { name: 'Купцы и торговцы скотом', short: 'Купцы', icon: '🐖', desc: 'Свиньи, табак и сливы — на них держится казна. Если Вена закроет границу для свиней, купцы закроют вам кредит.' },
      hawks: { name: 'Офицеры «Братства»', short: 'Офицеры', icon: '⚔️', desc: 'Тайное офицерское братство. Клянутся на кинжале и револьвере при свечах. Королей тоже меняли — однажды уже.' },
    },
    advisors: {
      defense: { name: 'Полковник Радомир Пистолевич', bio: 'Организовал два переворота и одно покушение и называет это хобби. Братья его тайного общества клянутся на кинжале, а проверяют клятву на королях.', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#222', hat: 'kepi', hatColor: '#3a4a5a', mustache: 'handlebar', brows: 'angry', mouth: 'flat', outfit: 'military', outfitColor: '#3a4a5a', medals: 5 } },
      economy: { name: 'Министр финансов Стоян Свинарич', bio: 'Отвечает за вывоз свиней в Австро-Венгрию. Когда Вена закрывает границу, он лично ищет свиньям новые рынки — от Марселя до Салоник.', look: { skin: SKIN.light, face: 'round', hair: 'baldside', hairColor: '#666', glasses: 'pince', mustache: 'walrus', brows: 'worried', mouth: 'o', outfit: 'suit', outfitColor: '#3a3a36', tie: '#7a1f1f', sweat: true } },
      police: { name: 'Префект Велько Шпионов', bio: 'Знает всех заговорщиков столицы в лицо. Половину из них сам когда-то завербовал, а вторая половина — его родственники.', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#111', hat: 'bowler', hatColor: '#1a1a1a', mustache: 'waxed', brows: 'angry', mouth: 'smirk', outfit: 'suit', outfitColor: '#1d1f24', tie: '#111' } },
      propaganda: { name: 'Гусляр Драган Песнович', bio: 'Поёт эпические песни о ваших победах под гусли. Песни длинные, а побед пока мало, поэтому он поёт об одной, но медленно.', look: { skin: SKIN.light, face: 'long', hair: 'long', hairColor: '#ddd', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ddd', mouth: 'grin', outfit: 'robe', outfitColor: '#5a2a2a', trim: '#d6a63a' } },
      foreign: { name: 'Министр Милан Дипломатович', bio: 'Учился в Петербурге, женат на венке, а долги у него в Париже. Идеальный дипломат для страны между тремя империями.', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#999', mustache: 'waxed', beard: 'goatee', brows: 'normal', mouth: 'smirk', glasses: 'monocle', hat: 'top', hatColor: '#1a1a1a', outfit: 'suit', outfitColor: '#1d1d22', tie: '#f4f1ea' } },
    },
  },
  gulf05: {
    name: 'Персидский залив', short: 'Залив',
    blurb: 'Жемчуг, финики и порт, который хотят все. Ещё недавно — османская провинция, теперь — эмират под британской защитой. Германия тянет к вам Багдадскую железную дорогу, а за горизонтом, говорят, есть нефть.',
    country: 'Эмират Зарфан', capital: 'Мина-Зарфан', currency: 'зарфанская рупия',
    exports: 'жемчуг и финики', exportGen: 'жемчуга', company: '«Бомбейская жемчужная компания»', patron: 'uk',
    sport: 'большие верблюжьи бега', rival: 'Шейхство Джазира', rivalShort: 'Джазира',
    disputed: 'остров Умм-Сафар', faithLeader: 'Кади', capitalSquare: 'базарной площади',
    jungle: 'пустыне за оазисом', nephew: 'Салим',
    countries: ['uk', 'ottoman', 'germany', 'russia', 'persia', 'france'],
    relInit: { uk: 60, ottoman: 35, germany: 45, russia: 38, persia: 45, france: 42 },
    flag: `<rect width="30" height="20" fill="#2e5e4a"/><rect width="9" height="20" fill="#f4f1ea"/><path d="M21 4.5 A5.5 5.5 0 1 0 21 15.5 A4.3 4.3 0 1 1 21 4.5 Z" fill="#f4f1ea"/>`,
    leaderSkin: 'tan', era: '1905', style: 'mideast', faithStyle: 'islam', exile: 'Бомбее', critters: 'верблюдов',
    factions: {
      left: { name: 'Ныряльщики за жемчугом', short: 'Ныряльщики', icon: '🐚', desc: 'Тысячи ныряльщиков в вечных долгах у хозяев лодок. Каждое лето они уходят в море на четыре месяца, а осенью возвращаются ещё беднее.' },
      liberals: { name: 'Реформаторы и меджлис', short: 'Реформаторы', icon: '📜', desc: 'Купеческие сыновья, учившиеся в Бомбее и Каире. Хотят школу, почту и совет, который будет решать вместе с вами.' },
      faith: { name: 'Улемы', short: 'Улемы', icon: '☪️', desc: 'Кади и имамы. Школу они бы открыли, если бы в ней учили только Коран.' },
      oligarchs: { name: 'Купцы и хозяева лодок', short: 'Купцы', icon: '⛵', desc: 'Им принадлежат жемчужные лодки, склады фиников и долги половины города. Платят за вашу гвардию — и считают её немного своей.' },
      hawks: { name: 'Бедуинские шейхи и гвардия', short: 'Бедуины', icon: '⚔️', desc: 'Всадники из пустыни. Защищают город от набегов и иногда устраивают их сами.' },
    },
    advisors: {
      defense: { name: 'Шейх Фахд ибн Саиф', bio: 'Командует тремястами всадниками и двумя пушками. Одну подарили англичане, другую — турки. Стреляет только английская.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#111', hat: 'keffiyeh', hatColor: '#f4f1ea', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'robe', outfitColor: '#d8c8a0', trim: '#7a5a2a' } },
      economy: { name: 'Купец Юсуф аль-Луълу', bio: 'Знает цену каждой жемчужины от Бахрейна до Бомбея. Считает, что нефть — это мода, а жемчуг вечен.', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#555', hat: 'turban', hatColor: '#f4f1ea', beard: 'full', mustache: 'thick', brows: 'worried', mouth: 'smirk', outfit: 'robe', outfitColor: '#3a2a1a', trim: '#d6a63a', blush: true } },
      police: { name: 'Начальник стражи Мансур Сакр', bio: 'Его сокол видит всё, а осведомители на базаре слышат всё. Сокол, по общему мнению, надёжнее.', look: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#111', hat: 'keffiyeh', hatColor: '#e8dcc0', beard: 'goatee', mustache: 'thick', brows: 'angry', mouth: 'flat', outfit: 'robe', outfitColor: '#2a2a2a', trim: '#7a1f1f' } },
      propaganda: { name: 'Поэт Абдалла ан-Набати', bio: 'Сочиняет касыды в вашу честь. В каждой касыде вы побеждаете льва. Львов в Аравии давно не осталось, но поэта это не смущает.', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#222', hat: 'turban', hatColor: '#d6a63a', beard: 'goatee', mustache: 'pencil', brows: 'normal', mouth: 'grin', outfit: 'robe', outfitColor: '#2a4a6a', trim: '#f4f1ea' } },
      foreign: { name: 'Мирза Хасан-хан', bio: 'Говорит на шести языках, включая английский чиновничий. Переписывается с британским резидентом и германским консулом и каждому сообщает, что другой ему не пишет.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#333', hat: 'fez', hatColor: '#9a1a2a', glasses: 'pince', mustache: 'waxed', brows: 'normal', mouth: 'smirk', outfit: 'suit', outfitColor: '#2a2a30', tie: '#111' } },
    },
  },
  himal05: {
    name: 'Гималаи', short: 'Гималаи',
    blurb: 'Шерсть, соль и мускус на высоте четырёх тысяч метров. Британская Индия тянет телеграф через перевалы, Китай считает вас своей провинцией, а Россия присылает бурятских монахов с подарками. Большая игра идёт за ваши горы.',
    country: 'Княжество Тхангла', capital: 'Лхадзонг', currency: 'тхангла-тангка',
    exports: 'шерсть, соль и мускус', exportGen: 'шерсти', company: '«Калькуттская шерстяная компания»', patron: 'brindia',
    sport: 'большие скачки на празднике урожая', rival: 'Княжество Ламдо', rivalShort: 'Ламдо',
    disputed: 'перевал Семи Ветров', faithLeader: 'Верховный лама', capitalSquare: 'площади перед дворцом-крепостью',
    jungle: 'ущельях у китайской границы', nephew: 'Дордже',
    countries: ['brindia', 'china', 'russia', 'uk', 'nepal', 'japan'],
    relInit: { brindia: 50, china: 45, russia: 45, uk: 45, nepal: 50, japan: 40 },
    flag: `<rect width="30" height="20" fill="#9a1a2a"/><path d="M0 20 L10 8 L15 13 L20 6 L30 20 Z" fill="#f4f1ea"/><circle cx="22" cy="5" r="2.4" fill="#f2c200"/>`,
    leaderSkin: 'tan', era: '1905', style: 'himal', faithStyle: 'buddhist', exile: 'Дарджилинге', critters: 'яков',
    factions: {
      left: { name: 'Крестьяне и погонщики караванов', short: 'Погонщики', icon: '✊', desc: 'Они платят налоги монастырям, знати и вам. Каждому — отдельно и каждый год больше.' },
      liberals: { name: 'Молодые реформаторы', short: 'Реформаторы', icon: '📜', desc: 'Офицеры и чиновники, учившиеся в Индии. Хотят школы, монету и телеграф. Носят английские ботинки под халатами.' },
      faith: { name: 'Великие монастыри', short: 'Монастыри', icon: '☸️', desc: 'Двадцать тысяч монахов в трёх великих монастырях. Им принадлежит треть земли и все пророчества.' },
      oligarchs: { name: 'Знатные роды', short: 'Знать', icon: '🏯', desc: 'Сто семей с поместьями, крестьянами и чином. Торгуют шерстью с Индией и чаем с Китаем.' },
      hawks: { name: 'Новая армия', short: 'Армия', icon: '⚔️', desc: 'Три тысячи солдат с британскими ружьями. Монастыри считают, что армия — это опасная новинка вроде телеграфа.' },
    },
    advisors: {
      defense: { name: 'Генерал Дава Норбу', bio: 'Учился у британцев маршировать, у китайцев — отступать. Говорит, что второе пригодилось чаще.', look: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#111', hat: 'helmet', hatColor: '#c8b88a', mustache: 'pencil', brows: 'bushy', mouth: 'flat', outfit: 'military', outfitColor: '#6a5a3a', medals: 3 } },
      economy: { name: 'Казначей Пунцок Ринчен', bio: 'Считает казну в мешках соли и брикетах чая. Банкнот не признаёт: «Бумагу нельзя заварить».', look: { skin: SKIN.tan, face: 'round', hair: 'bun', hairColor: '#222', hat: 'furhat', hatColor: '#d6a63a', mustache: 'none', brows: 'worried', mouth: 'o', outfit: 'robe', outfitColor: '#7a1f2a', trim: '#d6a63a', earring: true } },
      police: { name: 'Начальник стражи Карма Гьяцо', bio: 'Его стражники стоят на всех перевалах. Иностранец не пройдёт незамеченным, особенно если он одет буддийским паломником и спрашивает дорогу по-английски.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#111', hat: 'furhat', hatColor: '#5a3a1a', mustache: 'thick', brows: 'angry', mouth: 'smirk', outfit: 'robe', outfitColor: '#3a2a1a', trim: '#9a1a2a' } },
      propaganda: { name: 'Лама-летописец Тензин Церинг', bio: 'Пишет хронику вашего правления золотыми чернилами. Хроника пока короткая, а чернил ушло много.', look: { skin: SKIN.tan, face: 'round', hair: 'bald', hairColor: '#333', hat: 'lamahat', hatColor: '#e0b020', mustache: 'none', brows: 'normal', mouth: 'smile', glasses: 'round', outfit: 'robe', outfitColor: '#8a1a2a', trim: '#e0b020' } },
      foreign: { name: 'Министр Сонам Тобгье', bio: 'Единственный при дворе, кто видел паровоз. Рассказывает о нём на каждом совете, и совет каждый раз пугается.', look: { skin: SKIN.tan, face: 'long', hair: 'short', hairColor: '#222', hat: 'bowler', hatColor: '#2a2a2a', mustache: 'pencil', brows: 'normal', mouth: 'smirk', outfit: 'robe', outfitColor: '#2a4a3a', trim: '#d6a63a' } },
    },
  },
});

Object.assign(REGION_TITLES, {
  balkan05: ['Король', 'Регент', 'Князь', 'Государь', 'Отец Отечества', 'Освободитель', 'Объединитель', 'Король-Воин'],
  gulf05: ['Шейх', 'Эмир', 'Хаким', 'Шейх шейхов', 'Эмир-Основатель', 'Защитник Залива', 'Отец Жемчуга', 'Повелитель Берегов'],
  himal05: ['Владыка', 'Дхарма-раджа', 'Регент', 'Драгоценный Владыка', 'Хранитель Перевалов', 'Князь', 'Царь Гор', 'Благодетель'],
});
Object.assign(TITLE_FORMS, {
  'Князь': ['Князя', 'Князем'], 'Объединитель': ['Объединителя', 'Объединителем'], 'Король-Воин': ['Короля-Воина', 'Королём-Воином'],
  'Шейх': ['Шейха', 'Шейхом'], 'Эмир': ['Эмира', 'Эмиром'], 'Хаким': ['Хакима', 'Хакимом'], 'Шейх шейхов': ['Шейха шейхов', 'Шейхом шейхов'],
  'Эмир-Основатель': ['Эмира-Основателя', 'Эмиром-Основателем'], 'Защитник Залива': ['Защитника Залива', 'Защитником Залива'], 'Отец Жемчуга': ['Отца Жемчуга', 'Отцом Жемчуга'],
  'Повелитель Берегов': ['Повелителя Берегов', 'Повелителем Берегов'], 'Владыка': ['Владыки', 'Владыкой'], 'Дхарма-раджа': ['Дхарма-раджи', 'Дхарма-раджей'],
  'Драгоценный Владыка': ['Драгоценного Владыки', 'Драгоценным Владыкой'], 'Хранитель Перевалов': ['Хранителя Перевалов', 'Хранителем Перевалов'], 'Царь Гор': ['Царя Гор', 'Царём Гор'],
});
Object.assign(REGION_TALK, {
  balkan05: { addr: 'ваше величество', sir: 'господин', lady: 'госпожа', holiday_acc: 'Видовдан', holiday_dat: 'Видовдану', gringo: 'эти господа из Вены', rebel_icon: 'красное знамя', kaiser_friends: 'всех малых народов Европы, особенно тех, кто не дружит с Петербургом', haven: 'Вену', exileTo: 'Вену', canteen: 'фасолевую похлёбку', fruit_adj: 'Сливовый', locale: 'Балкан', pay_in_kind: 'Свиньями.', vegas: 'игорный дом как в Монте-Карло', rebel: 'Вожак гайдуков', meeting: 'в кафане «У царя Лазаря»' },
  gulf05: { addr: 'ваше высочество', sir: 'шейх', lady: 'госпожа', holiday_acc: 'Ид аль-Фитр', holiday_dat: 'Ид аль-Фитру', gringo: 'эти англичане', rebel_icon: 'знамя мятежного племени', kaiser_friends: 'всех мусульман мира', haven: 'Бомбей', exileTo: 'Бомбей', canteen: 'финики с рисом', fruit_adj: 'Жемчужный', locale: 'Залива', pay_in_kind: 'Мешками фиников.', vegas: 'кофейня с нардами', rebel: 'Шейх мятежного племени', meeting: 'в кофейне у порта' },
  himal05: { addr: 'драгоценный владыка', sir: 'господин', lady: 'госпожа', holiday_acc: 'Лосар', holiday_dat: 'Лосару', gringo: 'эти сахибы', rebel_icon: 'знамя горных разбойников', kaiser_friends: 'всех народов Азии', haven: 'Дарджилинг', exileTo: 'Дарджилинг', canteen: 'цампу с чаем', fruit_adj: 'Ячий', locale: 'Гималаев', pay_in_kind: 'Брикетами чая.', vegas: 'игра в кости у караван-сарая', rebel: 'Вожак горных разбойников', meeting: 'в караван-сарае' },
});
Object.assign(RELATIVES_BY_STYLE, {
  himal: { defense: 'Кузен Пема', economy: 'Шурин Норбу', police: 'Дядюшка Дордже', propaganda: 'Племянник Таши', foreign: 'Зять Ринчен', abroad: 'в Дарджилинге' },
});

ERAS['1905'] = {
  name: '1900-е', label: 'Канонерки и концессии', start: 1905,
  blurb: 'Русская революция, младотурки, Балканские войны и Сараево. Антанта и Тройственный союз делят мир, а державы покупают вашу страну по кускам: дорогу, порт, таможню, нефть.',
  regions: ['balkan05', 'gulf05', 'himal05'], regimes: ['throne05', 'officers05', 'reform05'], titles: ['Король'],
  intro: 'Впереди десятилетие: революции в России, Персии, Турции и Китае, Балканские войны и август 1914 года, когда блоки держав столкнутся.',
  aid: [['$patron', 60, 4], ['uk', 62, 5], ['germany', 62, 5], ['russia', 62, 5], ['france', 62, 5]],
  vars: {
    blame: 'германская разведка. Или английская', student_meme: 'Конституцию и газеты!', swim_ref: 'Например, сфотографироваться на охоте с убитым медведем. Кайзер так делает постоянно.',
    mast: 'ВЕСТНИК ДВОРА', rebel_icon: 'красное знамя', friendly_paper: 'петербургскому «Новому времени»',
    friendly_res: 'В Петербурге ваш портрет напечатали рядом с отчётом о царской охоте. Почётно.',
  },
  defaultNames: { balkan05: 'Велимир Добросавлевич', gulf05: 'Салим ибн Хамад аз-Зарфани', himal05: 'Лобсанг Пелджор' },
};

// Персонажи 1905–1914
function npc05(key, region) {
  const r = REGIONS[region], base = { skin: SKIN[r.leaderSkin] }, st = r.style;
  const M = {
    austria_amb: { name: 'Посланник Австро-Венгрии граф Фон-Ультиматум', look: { skin: SKIN.light, face: 'long', hair: 'baldside', hairColor: '#ddd', beard: 'sideburns', mustache: 'walrus', brows: 'bushy', browColor: '#ddd', mouth: 'flat', glasses: 'monocle', outfit: 'uniform48', outfitColor: '#f1ede2', collar: '#c1272d', medals: 6 } },
    germany_amb: { name: 'Консул Германии герр Эйзенбан', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#c9b48a', mustache: 'waxed', brows: 'angry', mouth: 'smirk', hat: 'pickelhaube', hatColor: '#1a1a1a', outfit: 'military', outfitColor: '#4a5a6a', medals: 3 } },
    russia_amb: { name: 'Посланник России князь Самоварский', look: { skin: SKIN.light, face: 'round', hair: 'short', hairColor: '#999', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#888', mouth: 'grin', outfit: 'uniform48', outfitColor: '#1a3a2a', collar: '#c1272d', medals: 5, blush: true } },
    uk_amb: { name: 'Британский резидент майор Пикклз', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#b5651d', mustache: 'handlebar', brows: 'normal', mouth: 'smirk', hat: 'helmet', hatColor: '#e8dcc0', outfit: 'military', outfitColor: '#c8b88a', medals: 2 } },
    brindia_amb: { name: 'Политический агент мистер Дарджилингтон', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#c9a640', mustache: 'handlebar', brows: 'normal', mouth: 'smirk', hat: 'helmet', hatColor: '#e8dcc0', outfit: 'suit', outfitColor: '#e8dcc0', tie: '#7a1f1f' } },
    ottoman_amb: { name: region === 'balkan05' ? 'Посол Порты Сулейман-бей' : 'Вали Басры Мехмед-паша', look: { skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#333', hat: 'fez', hatColor: '#c1272d', mustache: 'thick', brows: 'bushy', mouth: 'flat', outfit: 'uniform48', outfitColor: '#1d2a44', collar: '#c1272d', medals: 4 } },
    china_amb: { name: 'Амбань Чжао Эрфэн', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#111', hat: 'fez', hatColor: '#1a1a1a', mustache: 'pencil', brows: 'angry', mouth: 'flat', outfit: 'robe', outfitColor: '#1f2a5a', trim: '#d6a63a' } },
    france_amb: { name: 'Месье Шнейдер, представитель заводов в Крезо', look: { skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#3a2a1a', mustache: 'waxed', beard: 'goatee', brows: 'normal', mouth: 'smirk', hat: 'bowler', hatColor: '#1a1a1a', outfit: 'suit', outfitColor: '#2a2a40', tie: '#c1272d' } },
    nepal_amb: { name: 'Посланник Непала генерал Рана', look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#111', mustache: 'waxed', brows: 'normal', mouth: 'smirk', hat: 'turban', hatColor: '#f4f1ea', outfit: 'military', outfitColor: '#3a2a4a', medals: 6 } },
    banker: { name: 'Барон Гирш-младший, Парижский банк', look: { skin: SKIN.light, face: 'long', hair: 'baldside', hairColor: '#777', mustache: 'waxed', brows: 'normal', mouth: 'smirk', hat: 'top', hatColor: '#1a1a1a', outfit: 'suit', outfitColor: '#1d1d22', tie: '#d6a63a', glasses: 'pince' } },
    engineer: { name: 'Инженер концессии мистер Рэйлтон', look: { skin: SKIN.light, face: 'square', hair: 'short', hairColor: '#7a5a3a', mustache: 'handlebar', brows: 'normal', mouth: 'grin', hat: 'boater', hatColor: '#e8d8a0', outfit: 'suit', outfitColor: '#e8e0c8', tie: '#1f4e8c' } },
    student: { name: st === 'himal' ? 'Студент из Дарджилинга' : st === 'mideast' ? 'Ученик из Каира' : 'Студент из Женевы', look: { ...base, face: 'long', hair: 'short', hairColor: '#222', mustache: 'pencil', brows: 'angry', mouth: 'o', glasses: 'round', hat: st === 'himal' ? 'none' : st === 'mideast' ? 'fez' : 'boater', hatColor: st === 'mideast' ? '#c1272d' : '#e8d8a0', outfit: 'suit', outfitColor: '#2a2a40', tie: '#c1272d' } },
    worker: { name: st === 'himal' ? 'Погонщик яков' : st === 'mideast' ? 'Ныряльщик за жемчугом' : 'Крестьянин-аграрий', look: { ...base, face: 'square', hair: 'short', hairColor: '#2a2018', mustache: 'thick', brows: 'angry', mouth: 'frown', hat: st === 'mideast' ? 'turban' : st === 'himal' ? 'furhat' : 'flatcap', hatColor: st === 'mideast' ? '#e8dcc0' : '#4a3a2a', outfit: st === 'europe' ? 'blouse' : 'robe', outfitColor: '#6a5a3a', trim: '#e8dcc0' } },
    rebel: { name: REGION_TALK[region].rebel, look: { ...base, face: 'square', hair: 'curly', hairColor: '#1a1410', beard: 'full', mustache: 'thick', brows: 'angry', mouth: 'grin', hat: st === 'mideast' ? 'keffiyeh' : st === 'himal' ? 'furhat' : 'fez', hatColor: st === 'europe' ? '#1a1a1a' : '#e8dcc0', outfit: 'robe', outfitColor: '#5a3a1a', trim: '#c1272d' } },
    priest: { name: r.faithLeader, look: st === 'himal' ? { ...base, face: 'round', hair: 'bald', hairColor: '#333', hat: 'lamahat', hatColor: '#e0b020', mustache: 'none', brows: 'normal', mouth: 'smile', outfit: 'robe', outfitColor: '#8a1a2a', trim: '#e0b020', glasses: 'round' }
      : st === 'mideast' ? { ...base, face: 'long', hair: 'short', hairColor: '#ddd', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ddd', mouth: 'flat', hat: 'turban', hatColor: '#f4f1ea', outfit: 'robe', outfitColor: '#ece6d6', trim: '#8a7a5a' }
        : { ...base, face: 'long', hair: 'long', hairColor: '#9a9a9a', beard: 'full', mustache: 'walrus', brows: 'bushy', browColor: '#9a9a9a', mouth: 'flat', hat: 'kamilavka', hatColor: '#141414', outfit: 'robe', outfitColor: '#141414', trim: '#d6a63a' } },
    journalist: { name: 'Корреспондент лондонской «Таймс»', look: { skin: SKIN.light, face: 'long', hair: 'slick', hairColor: '#b5651d', mustache: 'handlebar', brows: 'normal', mouth: 'smirk', hat: 'boater', hatColor: '#e8d8a0', outfit: 'suit', outfitColor: '#5a5048', tie: '#1f4e8c', glasses: 'pince' } },
    first_lady: { name: 'Супруга правителя', look: { ...base, face: 'oval', hair: 'bun', hairColor: '#1a1210', mustache: 'none', brows: 'normal', mouth: 'smirk', outfit: 'gown', outfitColor: '#5a2a4a', trim: '#f4f1ea', earring: true } },
    nephew: { name: `Племянник ${r.nephew}`, look: { ...base, face: 'round', hair: 'slick', hairColor: '#2b1b10', mustache: 'pencil', brows: 'normal', mouth: 'grin', hat: st === 'mideast' ? 'keffiyeh' : 'boater', hatColor: '#e8d8a0', outfit: 'suit', outfitColor: '#e8e0c8', tie: '#c1272d', blush: true } },
    professor: { name: 'Профессор Фон-Карта, географ', look: { skin: SKIN.light, face: 'long', hair: 'baldside', hairColor: '#ddd', beard: 'full', brows: 'bushy', browColor: '#ddd', mouth: 'o', glasses: 'pince', outfit: 'suit', outfitColor: '#3a3a30', tie: '#111' } },
    colonel: { name: 'Полковник гвардии', look: { ...base, face: 'square', hair: 'short', hairColor: '#2a2018', mustache: 'waxed', brows: 'angry', mouth: 'flat', hat: st === 'mideast' ? 'keffiyeh' : 'kepi', hatColor: '#3a4a5a', outfit: 'military', outfitColor: '#3a4a5a', medals: 3 } },
    spy: { name: 'Путешественник, называющий себя ботаником', look: { skin: SKIN.light, face: 'long', hair: 'short', hairColor: '#b5651d', mustache: 'pencil', brows: 'worried', mouth: 'flat', hat: 'helmet', hatColor: '#e8dcc0', outfit: 'suit', outfitColor: '#c8b88a', tie: '#3a5a3a', glasses: 'round' } },
  };
  return M[key] || null;
}

DICTATOR_CLUB['1905'] = [
  { name: 'Франц Иосиф I', land: 'Австро-Венгрия', span: '1848–1916', years: 68, note: 'Взошёл на трон в 1848 году, пережил жену, сына и наследника. В июле 1914 года подписал ультиматум Сербии, с которого началась мировая война.' },
  { name: 'Цыси', land: 'Цинская империя', span: '1861–1908', years: 47, note: 'Вдовствующая императрица правила от имени сына, а затем племянника, которого держала под арестом. Умерла на следующий день после него.' },
  { name: 'Чулалонгкорн', land: 'Сиам', span: '1868–1910', years: 42, note: 'Уступил Британии и Франции треть территории, но сохранил независимость: единственный в регионе.' },
  { name: 'Порфирио Диас', land: 'Мексика', span: '1876–1911', years: 31, note: '«Порядок и прогресс»: железные дороги, иностранные инвесторы и сфальсифицированные выборы. Свергнут революцией и умер в Париже.' },
  { name: 'Абдул-Хамид II', land: 'Османская империя', span: '1876–1909', years: 33, note: 'Распустил парламент на тридцать лет и правил через шпионов. Младотурки вернули конституцию в 1908 году, а через год отправили султана в ссылку.' },
  { name: 'Фердинанд I', land: 'Болгария', span: '1887–1918', years: 31, note: 'Германский принц, приглашённый на болгарский трон. В 1908 году провозгласил себя царём, а в Первую мировую выбрал проигравшую сторону.' },
  { name: 'Хуан Висенте Гомес', land: 'Венесуэла', span: '1908–1935', years: 27, note: 'Захватил власть, пока президент лечился в Европе, и продал нефтяные концессии всем желающим.' },
  { name: 'Менелик II', land: 'Эфиопия', span: '1889–1913', years: 24, note: 'Разбил итальянскую армию при Адуа и купил первую в стране электростанцию. Говорят, однажды пытался съесть страницу Библии, чтобы вылечиться.' },
  { name: 'Леопольд II', land: 'Свободное государство Конго', span: '1885–1908', years: 23, note: 'Правил Конго как частным поместьем. Каучук, отрубленные руки и миллионы погибших. Мировой скандал заставил Бельгию забрать колонию.' },
  { name: 'Мануэль Эстрада Кабрера', land: 'Гватемала', span: '1898–1920', years: 22, note: 'Отдал страну «Юнайтед Фрут» и устраивал праздники в честь богини Минервы. Свергнут и объявлен сумасшедшим.' },
  { name: 'Мубарак ас-Сабах', land: 'Кувейт', span: '1896–1915', years: 19, note: 'Пришёл к власти, убив братьев, и тайно отдал Кувейт под защиту Британии. Германская Багдадская дорога так и не дошла до его порта.' },
  { name: 'Пётр I', land: 'Сербия', span: '1903–1921', years: 18, note: 'Получил трон после того, как офицеры убили прежнего короля. Пережил с армией отступление через албанские горы в 1915 году.' },
  { name: 'Юань Шикай', land: 'Китайская Республика', span: '1912–1916', years: 4, note: 'Генерал, заставивший императора отречься и ставший президентом республики. Попытался объявить себя императором и умер через три месяца.' },
  { name: 'Мохаммад Али-шах', land: 'Персия', span: '1907–1909', years: 2, note: 'Обстрелял парламент из пушек при помощи русских казаков. Через год его свергли, и он уехал в Одессу.' },
];
