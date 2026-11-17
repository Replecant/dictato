// «Диктато: Мир, которого нет». Вторая держава — Вольный город Кислоброд.
// Тот же мир, что у Магократии, но игра про ратушу: бумаги, гильдии и торговлю. Тон — городская сатира.
// Особые разделы: «Совет» (стопка прошений и печати), «Гильдия авантюристов» (беды города и наёмные отряды), «Торговля» (пути, пошлина, товар квартала).
const KIS = 'kislobrod';

// ---------- сосед, которого не было в первом свитке ----------
COUNTRIES.velentar = { name: 'Магократия Велентар', bloc: 'neutral', flag: 'velentar', leaders: [[9999, 'глава Башни (уточняется: там опять выборы)']] };
COUNTRY_CASES.velentar = ['Велентара', 'Велентаром', 'в Велентар'];
BLOCR.velentar = 'neutral';
FLAGS.kislobrod = `<rect width="30" height="20" fill="#6a5a3a"/><rect y="13" width="30" height="7" fill="#3a5a6a"/><path d="M6 13 Q10 8 14 13 M16 13 Q20 8 24 13" fill="none" stroke="#e9dcb8" stroke-width="1.6"/><rect x="9" y="3.5" width="12" height="4" fill="#e9dcb8"/><path d="M10.5 5.5 H19.5" stroke="#6a5a3a" stroke-width="0.8"/>`;

// ---------- облик ----------
const BG_COAT = (color = '#2a2d33', extra = {}) => ({ outfit: 'frock', outfitColor: color, hat: 'none', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', ...extra });
const LB = o => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', ...o });

// ---------- три старта ----------
Object.assign(REGIME_TYPES, {
  clerk: {
    name: 'Бывший счетовод', icon: '🖋️',
    desc: 'Тридцать лет вы вели городские книги и знаете, где лежит каждая бумага. В том числе те, которых официально нет. Совет выбрал вас, чтобы вы молчали. Печатей у вас на одну больше: вы умеете ставить их обеими руками.',
    fx: { economy: 4 }, fac: { oligarchs: { a: 12 }, faith: { a: 4 }, hawks: { a: -6 } }, rel: { dwarves: 8 },
  },
  heir: {
    name: 'Наследник', icon: '🎩',
    desc: 'Ваш дед был лордом-мэром. Отец тоже. Оба кончили плохо, но с почестями. Старые семьи считают вас своим, казна по привычке пуста, а портрет прадеда смотрит со стены с выражением «ну-ну».',
    fx: { support: 5, treasury: -4 }, fac: { oligarchs: { a: 8 }, faith: { a: 10 }, liberals: { a: -8 }, left: { a: -4 } }, rel: { kingdom: 8 },
  },
  hero: {
    name: 'Отставной герой', icon: '🗡️',
    desc: 'Вы убили дракона, и город в благодарность выбрал вас лордом-мэром. Дракон был проще. Гильдия авантюристов вас обожает и даёт скидку. Что такое «смета», вам объяснят: трижды, и вы всё равно не поймёте.',
    fx: { army: 8, support: 6, economy: -3 }, fac: { hawks: { a: 12 }, left: { a: 8 }, oligarchs: { a: -8 } }, rel: { orcs: -6 },
  },
});
Object.assign(DEFAULT_PILLARS, { clerk: ['oligarchs', 'faith'], heir: ['oligarchs', 'faith'], hero: ['hawks', 'left'] });
REGIME_TITLES[KIS] = { clerk: 'Лорд-мэр', heir: 'Лорд-мэр', hero: 'Лорд-мэр' };
REGION_TITLES[KIS] = ['Лорд-мэр', 'Бургомистр', 'Градоначальник', 'Первый горожанин'];
Object.assign(TITLE_FORMS, { 'Лорд-мэр': ['Лорда-мэра', 'Лордом-мэром'], 'Бургомистр': ['Бургомистра', 'Бургомистром'], 'Градоначальник': ['Градоначальника', 'Градоначальником'], 'Первый горожанин': ['Первого горожанина', 'Первым горожанином'] });
REGIME_SETUP_LOOK[KIS] = {
  clerk: { skin: SKIN.light, face: 'long', hair: 'combover', hairColor: '#6a6a6a', mustache: 'none', beard: 'none', brows: 'worried', mouth: 'flat', eyeGlow: '', ...BG_COAT('#2a2d33', { glasses: 'pince' }) },
  heir: { skin: SKIN.light, face: 'oval', hair: 'slick', hairColor: '#3a2a1a', mustache: 'handlebar', beard: 'none', brows: 'normal', mouth: 'smirk', eyeGlow: '', ...BG_COAT('#3a2230', { hat: 'top', hatColor: '#3a2230', glasses: 'monocle' }) },
  hero: { skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#8a3a1a', mustache: 'thick', beard: 'full', brows: 'bushy', mouth: 'flat', eyeGlow: '', outfit: 'plate', hat: 'none', glasses: 'none', medals: 0, sash: '', cigar: false },
};
for (const k of ['clerk', 'heir', 'hero']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[KIS][k], bluetooth: false };
const BG_NAMES = { clerk: 'Гораций Штемпель', heir: 'Эдмунд Кислоброд-младший', hero: 'Бранд Драконобой' };
function burgSetupLook(st, key) { const L = st.look; if (key === 'outfit') L.outfitColor = { frock: '#2a2d33', mantle: '#3a2f5e', plate: '#3a3d44' }[L.outfit]; if (L.hat === 'top' || L.hat === 'bowler') L.hatColor = '#2a2a2a'; if (L.hat === 'helmet') L.hatColor = '#9aa0a6'; if (L.hat === 'wizard') L.hatColor = L.outfitColor; }

// ---------- город ----------
NAME_POOLS.burg = { m: ['Гораций', 'Альберт', 'Седрик', 'Руперт', 'Бартоломью', 'Фердинанд', 'Арчибальд', 'Мортон', 'Дезмонд', 'Игнац'], f: ['Гертруда', 'Лавиния', 'Петуния'], last: ['Сквозняк', 'Подмётка', 'Фунт', 'Пуговка', 'Чернильник', 'Колбасник', 'Ржавый', 'Кошелёк', 'Третий-Сын', 'Никчёмсон'] };
RELATIVES_BY_STYLE.burg = { defense: 'Кузен Бруно', economy: 'Шурин Феликс', police: 'Тётушка Мод', propaganda: 'Племянник Тоби', foreign: 'Зять Руперт' };
REGIONS[KIS] = {
  name: 'Вольный город', short: 'Кислоброд',
  blurb: 'Сто тысяч жителей, сорок семь гильдий и одна река, по которой можно ходить пешком в сухой сезон. Городом никто не правит, потому что все заняты. Вы — исключение: вам некуда деться.',
  country: 'Вольный город Кислоброд', capital: 'Кислоброд', currency: 'кислый грош',
  exports: 'всё, что проезжало мимо', exportGen: 'чужого товара', company: 'контора «Фунт, Фунт и Недовес»', patron: 'dwarves',
  sport: 'гонки на тачках по Скользкому спуску', rival: 'Магократия Велентар', rivalShort: 'Велентар',
  disputed: 'Спорный мост', faithLeader: 'Настоятель', capitalSquare: 'площади Трёх Колодцев',
  jungle: 'городской канализации', nephew: 'Тоби',
  countries: ['kingdom', 'elves', 'dwarves', 'orcs', 'velentar', 'church'],
  relInit: { kingdom: 55, elves: 45, dwarves: 60, orcs: 40, velentar: 50, church: 45 },
  flag: FLAGS.kislobrod,
  leaderSkin: 'light', era: 'burg', style: 'burg', faithStyle: 'temples', exile: 'гномьих чертогах', critters: 'крыс (по переписи самих крыс)',
  factions: {
    left: { name: 'Простой люд', short: 'Горожане', icon: '🥔', desc: 'Грузчики, прачки, золотари, торговки пирожками. Правительство не любят из принципа, а новое — ещё и по привычке. Бунтуют редко: некогда.' },
    liberals: { name: 'Печатный двор', short: 'Печатники', icon: '📰', desc: 'Три газеты и сорок памфлетистов. Пишут обо всём, что видели, и о многом, чего не видели. Опровержения печатают мелким шрифтом на странице с некрологами.' },
    faith: { name: 'Храмовая улица', short: 'Храмы', icon: '🛕', desc: 'Сорок три культа на одной улице. Между собой не ладят, но в вопросе налога на храмовое имущество выступают единым фронтом. Один из богов отвечает за мелкие неприятности и крайне востребован.' },
    oligarchs: { name: 'Купеческая палата', short: 'Купцы', icon: '💰', desc: 'Те, кому город на самом деле принадлежит. Они согласны, чтобы им правили, пока это дешевле, чем править самим.' },
    hawks: { name: 'Городская стража', short: 'Стража', icon: '🛡️', desc: 'Дневная стража ловит тех, кого проспала ночная. Ночная — тех, кого упустила дневная. Жалованье обеим задержано с прошлого лорда-мэра.' },
  },
  advisors: {
    defense: { name: 'Капитан Бруно Засов', bio: 'Командует стражей. Раскрыл одно преступление. Оно было его собственным, но раскрыл честно.', look: LB({ face: 'square', hair: 'short', hairColor: '#555', mustache: 'walrus', brows: 'bushy', outfit: 'plate', hat: 'helmet', hatColor: '#9aa0a6' }) },
    economy: { name: 'Счетовод Феликс Недовес', bio: 'Сводит городской баланс. Баланс сходится, если не спрашивать, с чем именно.', look: LB({ face: 'long', hair: 'combover', hairColor: '#6a6a6a', glasses: 'pince', brows: 'worried', ...BG_COAT('#33363b') }) },
    police: { name: 'Госпожа Мод Замочная', bio: 'Заведует Канцелярией слухов. Знает всё, что говорят в городе. Половину сказала сама.', look: LB({ face: 'round', hair: 'bun', hairColor: '#9a9a9a', brows: 'angry', earring: true, ...BG_COAT('#2a2230') }) },
    propaganda: { name: 'Глашатай Тоби Звонкий', bio: 'Городской глашатай и редактор «Кислобродского вестника». Умеет подать потоп как расширение судоходства.', look: LB({ face: 'oval', hair: 'curly', hairColor: '#b87a2a', mouth: 'grin', ...BG_COAT('#5a3a2a', { hat: 'bowler', hatColor: '#3a2a1a' }) }) },
    foreign: { name: 'Посол Руперт Туда-и-Обратно', bio: 'Чрезвычайный посол при шести дворах сразу. Жалованье получает от каждого. От нас тоже.', look: LB({ face: 'long', hair: 'slick', hairColor: '#333', mustache: 'pencil', glasses: 'monocle', ...BG_COAT('#26282d', { hat: 'top', hatColor: '#1a1a1a' }) }) },
  },
};
REGION_TALK[KIS] = { addr: 'ваша милость', sir: 'господин', lady: 'госпожа', holiday_acc: 'День Основания (точная дата оспаривается)', holiday_dat: 'Дню Основания', gringo: 'приезжие', haven: 'гномий банк', exileTo: 'Каз-Дурим', canteen: 'суп из вчерашнего', fruit_adj: 'Кислый', locale: 'Кислоброда', pay_in_kind: 'Пирожками.', vegas: 'баня с отдельным входом', rebel: 'Горожанин с жалобой', meeting: 'в трактире «Утопленник»' };
FAITH_TALK.temples = { priest_open: 'Чадо... Простите, {addr}.', heavens: 'богам (всем сорока трём)', faith_quip: 'Боги не голосуют. Но их жрецы — да.', sermon: 'проповеди', faith_appeal: 'Об этом узнает вся Храмовая улица.', temple_loc: 'на Храмовой улице', righteous: 'Жрецы называют вас «терпимым злом»' };
FAITH_TITLE.temples = 'Настоятель';
PAPERS[KIS] = ['Кислобродский вестник', 'листки на заборах'];
LEADER_STYLE[KIS] = {
  left: { title: 'Старшина грузчиков', look: BG_COAT('#5a4a3a', { hat: 'flatcap', hatColor: '#4a3a2a' }) },
  liberals: { title: 'Редактор', look: BG_COAT('#3a3530', { glasses: 'round', hat: 'bowler', hatColor: '#2a2a2a' }) },
  faith: { male: true, title: 'Настоятель', look: { outfit: 'robe', outfitColor: '#5a3a5a', trim: '#e0b23a', hat: 'none', glasses: 'none', medals: 0, sash: '' } },
  oligarchs: { title: 'Старшина палаты', look: BG_COAT('#1d1e22', { hat: 'top', hatColor: '#1a1a1a', glasses: 'monocle' }) },
  hawks: { male: true, title: 'Сержант', look: { outfit: 'plate', hat: 'helmet', hatColor: '#9aa0a6', glasses: 'none', medals: 0, sash: '' } },
  new: { title: 'Мастер-вор', look: BG_COAT('#22202a', { hat: 'hood', hatColor: '#22202a' }) },
};
NEW_FACTIONS[BURG] = {
  name: 'Гильдия воров', short: 'Воры', icon: '🗝️',
  desc: 'Старейшая гильдия города: древнее ратуши и, по слухам, владеет участком под ней. Воруют по уставу, с выходными и собственным пенсионным фондом. Фонд, разумеется, украден.',
  rivals: ['hawks', 'oligarchs'], risk: 'coup', appear: () => true,
  intro: 'Гильдия воров прислала поздравительную открытку. Открытка была вашей; она лежала у вас в столе.',
  grow: () => (Game.bg().tariff === 2 ? 0.4 : 0),
};
function npcB(key) {
  const M = {
    clerkN: { name: 'Младший письмоводитель', look: LB({ face: 'oval', hair: 'short', hairColor: '#b87a2a', brows: 'worried', mouth: 'o', sweat: true, ...BG_COAT('#4a4640') }) },
    merchant: { name: 'Старшина Купеческой палаты', look: LB({ face: 'round', hair: 'bald', hairColor: '#888', mustache: 'walrus', glasses: 'monocle', ...BG_COAT('#1d1e22', { hat: 'top', hatColor: '#1a1a1a' }) }) },
    thief: { name: 'Представитель Гильдии воров', look: LB({ face: 'long', hair: 'slick', hairColor: '#1a1a1a', mustache: 'pencil', mouth: 'smirk', ...BG_COAT('#22202a', { hat: 'bowler', hatColor: '#1a1a1a' }) }) },
    priestB: { name: 'Настоятель храма Мелких Неприятностей', look: LB({ face: 'round', hair: 'bald', hairColor: '#aaa', brows: 'worried', outfit: 'robe', outfitColor: '#5a3a5a', trim: '#e0b23a', hat: 'none' }) },
    guardB: { name: 'Сержант ночной стражи', look: LB({ face: 'square', hair: 'short', hairColor: '#444', mustache: 'thick', brows: 'angry', outfit: 'plate', hat: 'helmet', hatColor: '#9aa0a6' }) },
    citizen: { name: 'Торговка пирожками', look: LB({ face: 'round', hair: 'bun', hairColor: '#8a5a3a', brows: 'angry', earring: true, outfit: 'robe', outfitColor: '#6a5a3a', trim: '#e9dcb8', hat: 'none' }) },
    hero: { name: 'Авантюрист', look: LB({ skin: SKIN.tan, face: 'square', hair: 'long', hairColor: '#b89a5a', beard: 'goatee', mouth: 'grin', outfit: 'plate', steel: '#8a7a5a', hat: 'none' }) },
    wizardB: { name: 'Гость из Велентара', look: LB({ face: 'long', hair: 'long', hairColor: '#d8d8d8', beard: 'full', brows: 'bushy', outfit: 'mantle', outfitColor: '#3a2f5e', trim: '#c9a640', hat: 'wizard', hatColor: '#3a2f5e' }) },
    dwarfB: { name: 'Гном-счетовод', look: LB({ skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#8a3a1a', beard: 'full', mustache: 'walrus', brows: 'bushy', glasses: 'round', outfit: 'plate', steel: '#8a7a5a', hat: 'none' }) },
    colonel: { name: 'Сержант ночной стражи', look: LB({ face: 'square', hair: 'short', hairColor: '#444', mustache: 'thick', brows: 'angry', outfit: 'plate', hat: 'helmet', hatColor: '#9aa0a6' }) },
    rebel: { name: 'Горожанин с жалобой', look: LB({ face: 'oval', hair: 'short', hairColor: '#5a4a3a', brows: 'angry', ...BG_COAT('#5a4a3a', { hat: 'flatcap', hatColor: '#4a3a2a' }) }) },
  };
  return M[key] || null;
}

// ---------- эпоха ----------
ERAS[BURG] = {
  name: 'Эпоха Шпилей', label: 'Мир, которого нет: Вольный город', start: 703, turns: 40, dark: true, fantasy: true,
  blurb: 'Тот же мир, вид из ратуши. Рыцари, эльфы, гномы и орки проезжают через ваш город и оставляют в нём деньги. Иногда добровольно.',
  regions: [KIS], regimes: ['clerk', 'heir', 'hero'], titles: ['Лорд-мэр'],
  intro: '',
  aid: [['dwarves', 62, 3], ['kingdom', 62, 4]],
  vars: { mast: 'КИСЛОБРОДСКИЙ ВЕСТНИК', blame: 'приезжие и погода', student_meme: '', swim_ref: '', rebel_icon: 'листок с забора', friendly_paper: 'гномьем листке', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' },
  defaultNames: { [KIS]: BG_NAMES.clerk },
};
const BURG_SETUP = { world: 'dark', era: BURG, region: KIS, regime: 'clerk', name: BG_NAMES.clerk, title: 'Лорд-мэр', country: REGIONS[KIS].country, diff: 'normal', look: { ...REGIME_SETUP_LOOK[KIS].clerk } };

// ---------- слова ----------
const ROLES_B = {
  defense: { title: 'Капитан стражи', action: 'Большой обход', actionDesc: 'Стража проходит по городу строем. Преступность на эти два часа уходит на обед.' },
  economy: { title: 'Городской счетовод', action: 'Пересчёт', actionDesc: 'Всё пересчитать заново. Обычно находится что-то лишнее. Иногда — деньги.' },
  police: { title: 'Канцелярия слухов', action: 'Пустить слух', actionDesc: 'Недовольные узнают, что за ними следят. Следят ли — неважно.' },
  propaganda: { title: 'Городской глашатай', action: 'Хорошие новости', actionDesc: 'Три дня глашатаи кричат только хорошее. Горожане настораживаются, но слушают.' },
  foreign: { title: 'Чрезвычайный посол', action: 'Объезд дворов', actionDesc: 'Шесть столиц, шесть обедов, шесть счетов за обед.' },
};
const ADV_TEXT_B = {
  defense: 'Обход прошёл. Задержан один карманник: он сам подошёл спросить дорогу.',
  economy: 'Пересчёт окончен. Нашлись сорок бочек солонины, числившиеся мостом.',
  police: 'Слух пущен. К вечеру он вернулся к вам с тремя новыми подробностями.',
  propaganda: 'Три дня хороших новостей. Горожане спрашивают, что случилось на самом деле.',
  foreign: 'Объезд завершён. Посол привёз шесть подарков и шесть одинаковых заверений в дружбе.',
};
for (const [k, n] of Object.entries({ army: 'Городская стража', police: 'Канцелярия слухов', health: 'Лекари и бани', edu: 'Школы и архив', subsidy: 'Суп для бедных', infra: 'Мостовые и мосты', media: 'Глашатаи и вестник', palace: 'Нужды ратуши', popTax: 'Подать с горожан', corpTax: 'Сбор с гильдий', duty: 'Мостовой сбор' })) {
  const d = [...SLIDERS.spend, ...SLIDERS.tax].find(x => x.k === k);
  d.name = typeof d.name === 'string' ? { def: d.name, burg: n } : { ...d.name, burg: n };
}
const _eraLookB = Game.eraLook;
Game.eraLook = function () {
  _eraLookB.call(Game);
  if (!isBurg()) return;
  for (const r of Object.keys(ROLES_B)) Object.assign(ROLES[r], ROLES_B[r]);
  Object.assign(STAT_NAMES, { swiss: 'Тайник у гномов', economy: 'Хозяйство', army: 'Стража' });
  SLIDERS.spend.find(d => d.k === 'palace').hint = 'Уходит в ваш тайник в гномьем банке; народ ворчит';
};
const _bankB = Game.bank;
Game.bank = function () { return isBurg() ? { name: 'Тайник у гномов', short: 'Тайник', to: 'Каз-Дурим', at: 'в Каз-Дуриме', acc: 'ваш тайник в гномьем банке', ins: 'тайником у гномов', dat: 'тайнику у гномов' } : _bankB.call(Game); };
const TB = [
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Город живёт тем, что все ездят через него. Дружба с соседом выше 60 приносит дары каждый квартал. Остальные соседи считают, сколько.'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ваша канцелярия. Лояльность ниже 25 — и чиновник может предать. Уволенного заменит родственник: предан, но считает на пальцах.'],
  ['Ваши министры. Лояльность ниже 25 — и министр может вас сдать.', 'Ваша канцелярия. Лояльность ниже 25 — и чиновник может предать.'],
  ['предан, но не слишком умён', 'предан, но считает на пальцах'], ['предан, но не слишком способен', 'предан, но считает на пальцах'],
  ['Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!', 'Казна почти пуста. Я пересчитал дважды. Во второй раз вышло ещё меньше.'],
  ['Офицеры недовольны. Поднимите бюджет армии или устройте парад.', 'Стража недовольна. Выплатите жалованье хотя бы за позапрошлый год.'],
  ['Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!', 'Горожане ворчат. Суп, праздник, хорошие новости — что-нибудь!'],
  ['Риск переворота', 'Риск мятежа стражи'], ['Риск революции', 'Риск большой очереди'],
  ['Казна в минусе! Армии задерживают жалованье, банки требуют проценты.', 'Казна в минусе! Страже опять не платят, гномы требуют проценты.'],
  ['Счёт в Швейцарии', 'Тайник у гномов'],
  ['Нужды дворца', 'Нужды ратуши'], ['нужды дворца', 'нужды ратуши'],
  ['пришёл к власти. Режим:', 'занял кресло в ратуше. Кто таков:'],
  ['Подарить виллу', 'Подарить домик у реки (выше по течению)'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с гильдиями, указы, визиты, поручения чиновникам, наём авантюристов и торговые миссии'],
  ['Проекты и указы — на вкладке «Указы».', 'Указы — на вкладке «Указы», а бумаги сами найдут вас на вкладке «Совет».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Стража ниже 45 и злые стражники — к мятежу. Народ ниже 30 — к большой очереди у ратуши, и это хуже, чем звучит.'],
  ['Деньги «нужд дворца» уходят на', 'Деньги «нужд ратуши» уходят в'],
  ['>Новый режим<', '>Новая сила<'], ['★ Оценка историков', '★ Оценка летописцев'],
  ['Ночью во дворце зазвонил телефон', 'Ночью в ратуше зазвонил колокольчик для посетителей'],
  ['во дворце, без приглашения', 'в ратуше, без записи'],
  ['в посольстве недовольны', 'их посол недоволен'],
  ['Сделать лидера министром', 'Дать лидеру должность в ратуше'], ['министерский пост', 'должность в ратуше'], ['Новый министр', 'Новый чиновник'], ['новый министр', 'новый чиновник'], ['Места в правительстве', 'Места в ратуше'], ['места в правительстве', 'места в ратуше'],
  ['Перевести 15 млн в личный фонд', 'Перевести 15 млн в тайник у гномов'], ['Цюрих. На случай, если придётся уходить. Шанс огласки 20%.', 'Каз-Дурим, ячейка без имени. На случай, если придётся уезжать ночью. Шанс огласки 20%.'],
  ['получил конверт. Вопросов он не задал.', 'получает конверт. Конверт был пересчитан на месте.'],
];
const _varsB = Game.vars;
Game.vars = function () { const v = _varsB.call(Game); if (isBurg()) v.addr = 'ваша милость'; return v; };
const _renderB = UI.render;
UI.render = function () {
  _renderB.call(UI);
  if (!isBurg()) return;
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; };
  set('cabinet', 'Ратуша'); set('factions', 'Гильдии'); set('decrees', 'Указы'); set('world', 'Соседи'); set('advisors', 'Канцелярия'); set('log', 'Летопись');
  const B = Game.bg(), pb = document.querySelector('.tabs button[data-tab="papers"]'), qb = document.querySelector('.tabs button[data-tab="quests"]');
  if (pb) { pb.textContent = `Совет (${B.papers.length})`; pb.classList.toggle('alert', B.papers.length >= 5); }
  if (qb) qb.classList.toggle('alert', B.quests.some(q => !q.party && q.age >= 2));
};
const DIFF_B = { easy: ['Тихий квартал', 'Три приказа и четыре печати, больше денег, бумаг приходит меньше.'], normal: ['Обычный квартал', 'Два приказа, три печати. Город как город.'], hard: ['Квартал перед проверкой', 'Мало денег, бумаг больше, авантюристы дороже. Итог ×1,4.'] };
const _renderSetupB = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupB.call(UI);
  if (!UI.setup || UI.setup.era !== BURG) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')];
  root.querySelector('h1').textContent = 'Свиток второй: Вольный город';
  ['Эпоха', '1. Держава', '2. Кто вы', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Титул';
  document.querySelector('#btn-begin').textContent = 'Войти в ратушу';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = 'Вольный город Кислоброд · 703–712 годы';
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_B[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const st = UI.setup, inp = document.querySelector('#setup-name');
  if (Object.values(BG_NAMES).includes(st.name) && st.name !== BG_NAMES[st.regime]) { st.name = BG_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};

// ============================================================
// СОВЕТ: стопка прошений
// ============================================================
// from — гильдия-податель; sign и deny — что будет, если подписать или отклонить
const PAPER_DECK = [
  { id: 'lamps', from: 'left', title: 'О фонарях на Скользком спуске', text: 'Жители просят фонари. За год на спуске пропало сорок человек, из них найдено тридцать девять: все внизу.', sign: { treasury: -6, support: 3 }, deny: { support: -2 } },
  { id: 'theft', from: 'new', title: 'О квотах на кражи в купеческом квартале', text: 'Гильдия воров просит поднять квоту с двенадцати до двадцати краж в неделю «ввиду роста числа купцов».', sign: { fac: { oligarchs: { a: -7 } }, treasury: 4 }, deny: { fear: 1 } },
  { id: 'pies', from: 'oligarchs', title: 'О составе пирожков', text: 'Палата требует обязать торговок указывать, что внутри. Торговки отвечают, что сами не знают и знать не хотят.', sign: { support: -3, economy: 1 }, deny: { support: 1 } },
  { id: 'gods', from: 'faith', title: 'О регистрации сорок четвёртого бога', text: 'Новый культ просит место на Храмовой улице. Бог заведует потерянными носками. Прежние сорок три против: улица не резиновая.', sign: { support: 2, treasury: 3 }, deny: { fac: { liberals: { a: 2 } } } },
  { id: 'pay', from: 'hawks', title: 'О жалованье за позапрошлый год', text: 'Стража напоминает, что жалованье за 701 год не выплачено. Приложены расписки, заверенные задержанными.', sign: { treasury: -9, army: 4 }, deny: { army: -3 } },
  { id: 'press', from: 'liberals', title: 'О допуске газетчиков на заседания', text: 'Печатный двор просит пускать репортёров в совет. Обещают писать только то, что слышали, и то, что могли бы услышать.', sign: { support: 2, fac: { oligarchs: { a: -4 }, faith: { a: -3 } } }, deny: { support: -1 } },
  { id: 'bridge', from: 'oligarchs', title: 'О тролле под Спорным мостом', text: 'Тролль берёт с телег плату за проезд и выдаёт квитанции. Купцы возмущены: квитанции оформлены грамотнее, чем городские.', sign: { treasury: -5, economy: 2 }, deny: { economy: -1 } },
  { id: 'rats', from: 'left', title: 'Коллективное прошение крыс', text: 'Подано через адвоката. Крысы требуют признать их жителями города: они живут здесь дольше гильдий и, в отличие от гильдий, платят жизнями.', sign: { support: 2, fac: { oligarchs: { a: -3 } }, economy: -1 }, deny: { fac: { liberals: { a: 3 } } } },
  { id: 'bells', from: 'faith', title: 'О расписании колоколов', text: 'Сорок три храма звонят в сорок три разных полудня. Жрецы просят установить единый полдень. Каждый предлагает свой.', sign: { economy: 1, fac: { liberals: { a: 2 } }, support: 1 }, deny: { support: -1 } },
  { id: 'smell', from: 'liberals', title: 'О запахе реки', text: 'Газеты требуют комиссию по запаху. Алхимики замерили: запах имеет вес и к вечеру оседает.', sign: { treasury: -7, support: 4 }, deny: { support: -2 } },
  { id: 'night', from: 'hawks', title: 'О слиянии дневной и ночной стражи', text: 'Капитан предлагает одну стражу вместо двух. Обе стражи против и впервые за сто лет действуют сообща.', sign: { treasury: 5, army: -3 }, deny: { treasury: -2 } },
  { id: 'fence', from: 'new', title: 'О лицензии на скупку краденого', text: 'Гильдия воров просит узаконить скупщиков и предлагает платить с оборота. Оборот обещает показать честный, слово вора.', sign: { treasury: 6, fac: { hawks: { a: -6 }, oligarchs: { a: -4 } } }, deny: { fac: { hawks: { a: 3 } } } },
  { id: 'well', from: 'left', title: 'О четвёртом колодце на площади Трёх Колодцев', text: 'Жители просят ещё один колодец. Палата мер и весов возражает: площадь придётся переименовать, а бланки уже напечатаны.', sign: { treasury: -5, support: 4 }, deny: { support: -2 } },
  { id: 'weights', from: 'oligarchs', title: 'О единой гире', text: 'В городе одиннадцать разных фунтов. Купцы просят оставить один: тот, который у них.', sign: { economy: 2, support: -2 }, deny: { economy: -1 } },
  { id: 'duel', from: 'hawks', title: 'О запрете дуэлей в рабочее время', text: 'Стража просит перенести дуэли на после шести: дневная смена не успевает убирать.', sign: { economy: 1, fac: { oligarchs: { a: 3 } } }, deny: { army: -1 } },
  { id: 'goat', from: 'faith', title: 'О священной козе', text: 'Коза храма Малых Милостей съела протокол прошлого заседания. Жрецы просят признать протокол принятым внутрь, то есть к сведению.', sign: { support: 1, fac: { liberals: { a: -3 } } }, deny: { treasury: -2 } },
  { id: 'dung', from: 'left', title: 'О вывозе навоза с Конной площади', text: 'Гора растёт с 688 года. У неё есть название, тропа на вершину и два постоянных жителя.', sign: { treasury: -7, support: 2, economy: 1 }, deny: { support: -2 } },
  { id: 'alch', from: 'oligarchs', title: 'О переносе Гильдии алхимиков за стену', text: 'Купцы просят выселить алхимиков: их цех взрывается по четвергам. Алхимики возражают: по четвергам и ещё иногда.', sign: { treasury: -4, economy: 1, fac: { liberals: { a: -3 } } }, deny: { economy: -1 } },
  { id: 'beggar', from: 'new', title: 'О признании Гильдии нищих', text: 'Нищие просят статус гильдии и место в совете. Взнос обещают платить, если им подадут.', sign: { support: 2, fac: { oligarchs: { a: -5 }, left: { a: 3 } } }, deny: { support: -1 } },
  { id: 'clock', from: 'liberals', title: 'О часах на ратуше', text: 'Часы на башне стоят с прошлого века и показывают без четверти семь. Газеты требуют починки. Трактиры против: по этим часам они закрываются.', sign: { treasury: -5, economy: 1, support: -1 }, deny: { fac: { left: { a: 2 } } } },
  { id: 'ghosts', from: 'faith', title: 'О подати с привидений', text: 'Храмы просят обложить привидения налогом на недвижимость: живут в лучших домах, а не платят. Привидения прислали возражение. Оно холодное на ощупь.', sign: { treasury: 4, fear: 1, support: -1 }, deny: { fac: { liberals: { a: 2 } } } },
  { id: 'armor', from: 'hawks', title: 'О новых кирасах', text: 'Стража просит кирасы. Нынешние выданы при деде нынешнего капитана и держатся на ржавчине и традиции.', sign: { treasury: -8, army: 3 }, deny: { army: -2 } },
  { id: 'maps', from: 'oligarchs', title: 'О единой карте города', text: 'Карт три. На одной нет Нижнего города, на другой он есть дважды, третью составляла Гильдия воров, и она точная, но засекречена.', sign: { treasury: -4, economy: 2, fac: { new: { a: -4 } } }, deny: { economy: -1 } },
  { id: 'comm', from: 'liberals', title: 'О комиссии по сокращению комиссий', text: 'Предлагается учредить комиссию, которая сократит число комиссий. По регламенту её учреждение должна одобрить комиссия.', sign: { treasury: -3, support: 2 }, deny: { support: -1 } },
];
// ============================================================
// ГИЛЬДИЯ АВАНТЮРИСТОВ: беды города и отряды
// ============================================================
const QUEST_DECK = [
  { id: 'sewer', name: 'Нечто в канализации', text: 'Золотари отказываются спускаться ниже третьего яруса. Оттуда слышно пение. Хором.', kind: 'force', diff: 2, harm: { support: -1 }, win: { support: 4, fac: { left: { a: 5 } } } },
  { id: 'bandits', name: 'Разбойники на Западном тракте', text: 'Берут с обозов «добровольный взнос». Взнос составляет весь обоз.', kind: 'force', diff: 3, harm: { economy: -0.5 }, route: 'kingdom', win: { economy: 2, fac: { oligarchs: { a: 6 } } } },
  { id: 'ghost', name: 'Призрак в архиве', text: 'Покойный архивариус продолжает работать и возвращает на доработку всё, включая некрологи.', kind: 'magic', diff: 2, harm: { economy: -0.5 }, win: { economy: 2, treasury: 4 } },
  { id: 'dragon', name: 'Дракон на Подгорном туннеле', text: 'Лёг поперёк входа и уснул. Гномы уверяют, что это не их дракон.', kind: 'force', diff: 5, harm: { economy: -1 }, route: 'dwarves', win: { support: 6, economy: 3, treasury: 12 } },
  { id: 'taxman', name: 'Пропавший сборщик податей', text: 'Ушёл в Нижний город с ведомостью и не вернулся. Ведомость вернулась: с пометками.', kind: 'wit', diff: 2, harm: { treasury: -2 }, win: { treasury: 9 } },
  { id: 'cult', name: 'Сорок пятый культ', text: 'В подвале сукновальни поклоняются чему-то с щупальцами. Сукно стало заметно лучше, но соседи жалуются.', kind: 'magic', diff: 3, harm: { support: -1, fear: 1 }, win: { fac: { faith: { a: 8 } }, support: 2 } },
  { id: 'fakes', name: 'Фальшивые гроши', text: 'По городу ходят монеты из сыра. Хорошего сыра: их не сразу отличают.', kind: 'wit', diff: 3, harm: { economy: -1 }, win: { economy: 3, fac: { oligarchs: { a: 5 } } } },
  { id: 'wizard', name: 'Беглый эксперимент из Велентара', text: 'По Чародейскому каналу приплыло нечто в ящике с надписью «Не кантовать». Ящик кантовали.', kind: 'magic', diff: 4, harm: { support: -1, economy: -0.5 }, route: 'velentar', win: { rel: { velentar: 8 }, support: 3, treasury: 6 } },
  { id: 'orcs', name: 'Орочий табор у Степных ворот', text: 'Приехали торговать, но стоят третий месяц и уже выбрали собственного старосту.', kind: 'wit', diff: 3, harm: { support: -0.5 }, route: 'orcs', win: { rel: { orcs: 8 }, economy: 2 } },
  { id: 'heist', name: 'Украдена городская печать', text: 'Без печати нельзя подписать ни одной бумаги. В том числе указ о розыске печати.', kind: 'wit', diff: 4, harm: { stamps: -1 }, win: { fac: { hawks: { a: 4 } }, support: 2 } },
  { id: 'elves', name: 'Лес подошёл к воротам', text: 'За ночь роща у Лесной тропы приблизилась на двести шагов. Эльфы говорят, что деревья «просто гуляют».', kind: 'magic', diff: 3, harm: { economy: -0.5 }, route: 'elves', win: { rel: { elves: 8 }, economy: 2 } },
  { id: 'mimic', name: 'Сундук в казначействе', text: 'Один из сундуков с казной кусается. Счетовод не помнит, который, и проверяет палкой.', kind: 'force', diff: 2, harm: { treasury: -1 }, win: { treasury: 8 } },
];
const PARTY_POOL = [
  { id: 'axes', name: '«Три топора»', desc: 'Их пятеро. Название осталось от прежнего состава.', force: 4, wit: 1, magic: 1, fee: 5 },
  { id: 'quiet', name: '«Тихие люди»', desc: 'Никто не помнит, как они выглядят. Счёт присылают подробный.', force: 2, wit: 4, magic: 1, fee: 6 },
  { id: 'dropouts', name: '«Недоучки Башни»', desc: 'Отчислены из Велентара за успеваемость. Точнее, за её последствия.', force: 1, wit: 2, magic: 4, fee: 6 },
  { id: 'paladin', name: 'Сэр Годрик и оруженосец', desc: 'Рыцарь без страха и упрёка. Всю работу делает оруженосец.', force: 3, wit: 3, magic: 1, fee: 7 },
  { id: 'granny', name: 'Бабушка Петуния', desc: 'Вязальные спицы, сорок лет стажа и взгляд, от которого сворачивается молоко.', force: 2, wit: 3, magic: 3, fee: 8 },
  { id: 'bards', name: '«Громкие и бессмертные»', desc: 'Барды. Врага берут измором. Город тоже.', force: 1, wit: 3, magic: 2, fee: 3 },
  { id: 'dwarves', name: 'Братья Киркссоны', desc: 'Семеро гномов. Берут дорого, копают глубоко, сдают по акту.', force: 4, wit: 2, magic: 2, fee: 9 },
];
// ============================================================
// ТОРГОВЛЯ
// ============================================================
const ROUTES = {
  kingdom: { name: 'Западный тракт', goods: 'шерсть и рыцарские романы', base: 4 },
  dwarves: { name: 'Подгорный туннель', goods: 'железо и векселя', base: 4.5 },
  velentar: { name: 'Чародейский канал', goods: 'зелья и то, что из них выползло', base: 4 },
  elves: { name: 'Лесная тропа', goods: 'вино и многозначительные взгляды', base: 3 },
  orcs: { name: 'Степной шлях', goods: 'шкуры и неожиданности', base: 3 },
};
const TARIFFS = [['Низкая', 0.7, 'Купцы довольны, хозяйство растёт, казна худеет.'], ['Обычная', 1, 'Все ворчат одинаково: значит, справедливо.'], ['Высокая', 1.35, 'Казна полнеет, купцы злятся, контрабанда кормит Гильдию воров.']];
Object.assign(Game, {
  bg() {
    if (!S.bg) {
      S.bg = { papers: [], comm: [], used: {}, stamps: 0, quests: [], qused: {}, parties: PARTY_POOL.slice(0, 3).map(p => ({ id: p.id, lvl: S.regime === 'hero' && p.id === 'axes' ? 1 : 0, busy: false, hurt: 0 })), routes: Object.fromEntries(Object.keys(ROUTES).map(k => [k, { lvl: 1, guard: 0 }])), tariff: 1, hot: 'kingdom', solved: 0, signed: 0, lost: 0 };
      Game.bgNewPapers(4); Game.bgNewQuest(); S.bg.stamps = Game.bgStampMax();
    }
    return S.bg;
  },
  bgStampMax() { return 3 + (S.regime === 'clerk' ? 1 : 0) + (S.diff === 'easy' ? 1 : 0) - (S.bg && S.bg.quests.some(q => q.id === 'heist') ? 1 : 0); },
  bgNewPapers(n) {
    const B = S.bg, have = new Set([...B.papers, ...B.comm].map(p => p.id));
    for (let i = 0; i < n; i++) {
      const pool = PAPER_DECK.filter(p => !have.has(p.id)).sort((a, b) => (B.used[a.id] || 0) - (B.used[b.id] || 0) || Math.random() - 0.5);
      if (!pool.length) return;
      const p = pool[Math.floor(Math.random() * Math.min(4, pool.length))];
      B.papers.push({ id: p.id, at: S.turn, grown: false }); B.used[p.id] = (B.used[p.id] || 0) + 1; have.add(p.id);
    }
  },
  bgPaperFx(P, how) { const D = PAPER_DECK.find(x => x.id === P.id), base = how === 'sign' ? D.sign : D.deny, k = P.grown && how === 'sign' ? 1.5 : 1; const fx = JSON.parse(JSON.stringify(base)); if (k !== 1 && fx.treasury < 0) fx.treasury = Math.round(fx.treasury * k); return Game.mergeFxD(fx, { fac: { [D.from]: { a: how === 'sign' ? 5 : -6 } } }); },
  bgPaper(i, how) {
    const B = Game.bg(), P = B.papers[i]; if (!P) return null;
    const D = PAPER_DECK.find(x => x.id === P.id);
    let fx = {}, text = `«${D.title}»: `;
    if (how === 'sign' || how === 'deny') {
      if (B.stamps <= 0) return null;
      if (how === 'sign' && Game.bgPaperFx(P, 'sign').treasury < 0 && S.treasury < -Game.bgPaperFx(P, 'sign').treasury) return null;
      B.stamps--; fx = Game.bgPaperFx(P, how); B.papers.splice(i, 1); if (how === 'sign') B.signed++;
      text += how === 'sign' ? 'подписано. Печать легла ровно, что в ратуше считается добрым знаком.' : 'отклонено с резолюцией «нецелесообразно ввиду». Чего именно ввиду, податель выясняет.';
    } else if (how === 'comm') {
      if (B.comm.length >= 3) return null;
      B.papers.splice(i, 1); B.comm.push({ id: P.id, back: S.turn + 3 }); text += 'передано в комиссию. Комиссия соберётся, когда утвердят её состав.';
    } else {
      B.papers.splice(i, 1);
      if (Math.random() < 0.55) { B.lost++; text += 'потеряно. Бумага упала за шкаф, где уже лежат её предшественницы.'; }
      else { fx = { support: -2, fac: { [D.from]: { a: -8 }, liberals: { a: 3 } } }; text += 'потеряно, но копия нашлась в редакции «Вестника». С заголовком «Что прячет ратуша».'; }
    }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  bgSeats() { return Object.keys(S.fac).filter(f => S.fac[f].a >= 50).length; },
  // --- авантюристы ---
  bgNewQuest() { const B = S.bg, have = new Set(B.quests.map(q => q.id)), pool = QUEST_DECK.filter(q => !have.has(q.id) && (S.turn >= 4 || q.diff <= 2) && (S.turn >= 12 || q.diff <= 4)).sort((a, b) => (B.qused[a.id] || 0) - (B.qused[b.id] || 0) || Math.random() - 0.5); if (!pool.length || B.quests.length >= 4) return; const q = pool[Math.floor(Math.random() * Math.min(3, pool.length))]; B.quests.push({ id: q.id, age: 0, party: null, left: 0 }); B.qused[q.id] = (B.qused[q.id] || 0) + 1; },
  bgFee(pid) { const P = Game.bg().parties.find(x => x.id === pid), D = PARTY_POOL.find(x => x.id === pid); return Math.max(2, D.fee + 2 * P.lvl - (S.regime === 'hero' ? 2 : 0) + (S.diff === 'hard' ? 2 : 0)); },
  bgChance(qid, pid) { const Q = QUEST_DECK.find(x => x.id === qid), P = Game.bg().parties.find(x => x.id === pid), D = PARTY_POOL.find(x => x.id === pid); return clamp(0.5 + (D[Q.kind] + P.lvl - Q.diff) * 0.13, 0.1, 0.93); },
  bgSend(qi, pid) {
    const B = Game.bg(), q = B.quests[qi], P = B.parties.find(x => x.id === pid);
    if (!q || q.party || !P || P.busy || P.hurt > 0 || S.treasury < Game.bgFee(pid) || !Game.spend()) return null;
    const fee = Game.bgFee(pid), Q = QUEST_DECK.find(x => x.id === q.id);
    q.party = pid; q.left = Q.diff >= 4 ? 2 : 1; P.busy = true;
    const changes = Game.apply({ treasury: -fee });
    const text = `${PARTY_POOL.find(x => x.id === pid).name} взялись за дело «${Q.name}». Аванс получен, расписка выдана, трактир предупреждён.`;
    Game.log(text);
    return { text, changes };
  },
  bgHire() {
    const B = Game.bg(), next = PARTY_POOL.find(p => !B.parties.some(x => x.id === p.id));
    if (!next || B.parties.length >= 5 || S.treasury < 6 || !Game.spend()) return null;
    B.parties.push({ id: next.id, lvl: 0, busy: false, hurt: 0 });
    const changes = Game.apply({ treasury: -6 });
    const text = `На объявление откликнулись: ${next.name}. ${next.desc}`;
    Game.log(text);
    return { text, changes };
  },
  // --- торговля ---
  bgRouteIncome(k) { const B = Game.bg(), R = B.routes[k], D = ROUTES[k], blocked = B.quests.some(q => QUEST_DECK.find(x => x.id === q.id).route === k) && R.guard <= 0; return D.base * (0.58 + R.lvl * 0.35) * clamp((S.rel[k] || 40) / 55, 0.3, 1.4) * TARIFFS[B.tariff][1] * (blocked ? 0.3 : 1) * (B.hot === k ? 1.5 : 1); },
  bgTradeIncome() { return Math.round(Object.keys(ROUTES).reduce((a, k) => a + Game.bgRouteIncome(k), 0) * 10) / 10; },
  bgRouteActions(k) { const R = Game.bg().routes[k]; return [
    { id: 'mission', name: 'Торговая миссия', cost: R.lvl >= 3 ? 'путь налажен' : `−${R.lvl === 1 ? 9 : 16} млн`, ok: R.lvl < 3 && S.treasury >= (R.lvl === 1 ? 9 : 16), fx: { treasury: R.lvl === 1 ? -9 : -16, rel: { [k]: 4 }, fac: { oligarchs: { a: 3 } }, bgRoute: [k, 'lvl'] } },
    { id: 'guard', name: 'Караванная охрана', cost: R.guard > 0 ? `ещё ${R.guard} кв.` : '−4 млн', ok: R.guard <= 0 && S.treasury >= 4, fx: { treasury: -4, fac: { hawks: { a: 2 } }, bgRoute: [k, 'guard'] } },
  ]; },
  bgRouteAction(k, id) { const a = Game.bgRouteActions(k).find(x => x.id === id); if (!a || !a.ok || !Game.spend()) return null; const changes = Game.apply(a.fx); const text = `${ROUTES[k].name}: ${id === 'mission' ? 'миссия вернулась с договором и несварением. Путь стал оживлённее.' : 'стража сопровождает обозы. Берёт за это немного и только с тех, кто не возражает.'}`; Game.log(text); return { text, changes }; },
  bgTariff(t) { const B = Game.bg(); if (t === B.tariff || Math.abs(t - B.tariff) !== 1 || B.tariffAt === S.turn || !Game.spend()) return null; const up = t > B.tariff; B.tariff = t; B.tariffAt = S.turn; const changes = Game.apply({ fac: { oligarchs: { a: up ? -7 : 6 }, new: { a: up ? 3 : -2 } } }); const text = `Пошлина: ${TARIFFS[t][0].toLowerCase()}. ${TARIFFS[t][2]}`; Game.log(text); return { text, changes }; },
  // --- квартал ---
  bgQuarter(rep) {
    const B = Game.bg();
    // бумаги
    for (const P of B.papers) if (S.turn - P.at >= 2) { const f = PAPER_DECK.find(x => x.id === P.id).from; if (S.fac[f]) S.fac[f].a = clamp(S.fac[f].a - 1.5); }
    for (const c of B.comm.filter(c => S.turn >= c.back)) { B.papers.push({ id: c.id, at: S.turn, grown: true }); const f = PAPER_DECK.find(x => x.id === c.id).from; if (S.fac[f]) S.fac[f].a = clamp(S.fac[f].a - 3); rep.lines.push(`Комиссия вернула дело «${PAPER_DECK.find(x => x.id === c.id).title}»: с приложениями оно стало толще и дороже.`); }
    B.comm = B.comm.filter(c => S.turn < c.back);
    while (B.papers.length > 8) { const P = B.papers.shift(), D = PAPER_DECK.find(x => x.id === P.id); if (S.fac[D.from]) S.fac[D.from].a = clamp(S.fac[D.from].a - 8); rep.warn.push(`Прошение «${D.title}» пролежало так долго, что податель обиделся и написал в газету.`); }
    Game.bgNewPapers(S.diff === 'hard' ? 4 : S.diff === 'easy' ? 2 + (S.turn % 2) : 3 + (S.turn % 2));
    if (B.papers.length >= 6) { S.economy = clamp(S.economy - 1); S.support = clamp(S.support - 0.5); rep.warn.push(`Завал в ратуше: ${B.papers.length} неразобранных дел. Письмоводители строят из папок укрепления.`); }
    const seats = Game.bgSeats();
    if (seats < 3) { S.treasury -= 2; rep.warn.push(`В совете за вас ${seats} гильдий из шести. Смета не утверждена; деньги тратятся «временно».`); }
    // авантюристы
    for (const P of B.parties) if (P.hurt > 0) P.hurt--;
    for (const q of [...B.quests]) {
      const Q = QUEST_DECK.find(x => x.id === q.id);
      if (q.party) {
        if (--q.left > 0) continue;
        const P = B.parties.find(x => x.id === q.party), D = PARTY_POOL.find(x => x.id === q.party), ok = Math.random() < Game.bgChance(q.id, q.party);
        P.busy = false;
        if (ok) {
          Game.apply(Q.win, { silent: true }); B.quests.splice(B.quests.indexOf(q), 1); B.solved++; P.lvl = Math.min(3, P.lvl + 1);
          let line = `Гильдия авантюристов: ${D.name} закрыли дело «${Q.name}».`;
          if (Math.random() < 0.25) { S.economy = clamp(S.economy - 1); S.support = clamp(S.support - 1); line += ' ' + pick(['При этом сгорел трактир. Они уверяют, что он уже горел.', 'Счёт за разрушения приложен. Он длиннее отчёта.', 'Дело закрыто вместе с двумя улицами: на ремонт.']); }
          rep.lines.push(line);
        } else {
          q.party = null; q.age++;
          if (Math.random() < 0.2) { B.parties.splice(B.parties.indexOf(P), 1); rep.warn.push(`${D.name} не вернулись с дела «${Q.name}». Гильдия повесила их портрет в зале и подняла расценки.`); }
          else { P.hurt = 2; rep.warn.push(`${D.name} провалили дело «${Q.name}» и два квартала будут «восстанавливаться» в трактире. Аванс не возвращается.`); }
        }
      } else {
        q.age++;
        const k = 1 + q.age * 0.15;
        for (const [st, d] of Object.entries(Q.harm)) { if (st === 'stamps') continue; if (st === 'treasury') S.treasury += d; else S[st] = clamp(S[st] + d * k); }
        if (q.age === 3) rep.warn.push(`Беда «${Q.name}» не решается третий квартал. Сама она не пройдёт: проверено.`);
      }
    }
    if (Math.random() < (B.quests.length < 2 ? 0.8 : 0.45)) { const n = B.quests.length; Game.bgNewQuest(); if (B.quests.length > n) rep.lines.push(`Новая беда: ${QUEST_DECK.find(x => x.id === B.quests[B.quests.length - 1].id).name.toLowerCase()}. Подробности — в Гильдии авантюристов.`); }
    // торговля
    for (const R of Object.values(B.routes)) if (R.guard > 0) R.guard--;
    B.hot = pick(Object.keys(ROUTES));
    const t = B.tariff;
    if (t === 0) { S.fac.oligarchs.a = clamp(S.fac.oligarchs.a + 0.4); S.economy = clamp(S.economy + 0.2); }
    if (t === 2) { S.fac.oligarchs.a = clamp(S.fac.oligarchs.a - 0.6); if (S.fac.new) S.fac.new.s = clamp(S.fac.new.s + 0.3); for (const k of Object.keys(ROUTES)) S.rel[k] = clamp((S.rel[k] || 0) - 0.2); }
    // город ворчит по привычке: чем лучше дела, тем быстрее к ним привыкают
    if (S.support > 55) S.support = clamp(S.support - (S.support - 55) * 0.14);
    if (S.economy > 58) S.economy = clamp(S.economy - (S.economy - 58) * 0.11);
    if (S.army > 65) S.army = clamp(S.army - (S.army - 65) * 0.1);
    B.stamps = Game.bgStampMax();
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isBurg()) return;
  Game.eraLook(); Game.bg();
  S.fac.new = S.fac.new || { s: 34, a: 50, st: 'legal' };
  Object.assign(S.fac.new, { s: 34, a: 50 });
  S.fac.left.s = 34; S.fac.liberals.s = 26; S.fac.faith.s = 30; S.fac.hawks.s = 34; S.fac.oligarchs.s = 44;
  S.fear = Math.min(S.fear, 30); S.economy = Math.max(S.economy, 48);
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isBurg()) return;
  const B = Game.bg();
  if (fx.bgRoute) { const [k, what] = fx.bgRoute, R = B.routes[k]; if (what === 'lvl') { R.lvl = Math.min(3, R.lvl + 1); ch.push({ k: 'fs', d: 1, label: `${ROUTES[k].name}: уровень`, icon: '🛒' }); } else R.guard = 4; }
  if (fx.bgStamps) B.stamps = Math.max(0, B.stamps + fx.bgStamps);
  if (fx.bgPapers) Game.bgNewPapers(fx.bgPapers);
  if (fx.bgClear) { const n = Math.min(fx.bgClear, B.papers.length); B.papers.splice(0, n); ch.push({ k: 'fs', d: n, label: 'Дел разобрано', icon: '📜' }); }
});
Game.previewHooks.push((fx, out) => {
  if (!isBurg()) return;
  const first = [];
  if (fx.bgRoute) first.push({ icon: '🛒', d: 1, label: 'Путь', text: fx.bgRoute[1] === 'lvl' ? 'уровень пути +1' : 'охрана на 4 кв.' });
  if (fx.bgStamps) first.push({ icon: '🔏', d: fx.bgStamps, label: 'Печати', text: `печати ${sign(fx.bgStamps)}` });
  if (fx.bgPapers) first.push({ icon: '📜', d: -fx.bgPapers, label: 'Бумаги', text: `новых дел +${fx.bgPapers}` });
  if (fx.bgClear) first.push({ icon: '📜', d: fx.bgClear, label: 'Бумаги', text: `дел разобрано до ${fx.bgClear}` });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => { if (!isBurg()) return; Game.bgQuarter(rep); rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l)); });
Game.incomeHooks.push(() => (isBurg() ? { label: 'Торговые пути', v: Game.bgTradeIncome() } : null));
Game.incomeHooks.push(() => (isBurg() ? { label: 'Сорок семь гильдий: содержание совета', v: -11 } : null));
Game.incomeHooks.push(() => (isBurg() && Game.bg().comm.length ? { label: 'Комиссии заседают', v: -Game.bg().comm.length } : null));
Game.coupHooks.push(() => (isBurg() ? Math.max(0, 3 - Game.bgSeats()) * 0.012 - 0.01 : 0));
const _blocB = Game.bloc;
Game.bloc = function () { if (!isBurg()) return _blocB.call(Game); const n = Game.bg().papers.length; return n >= 6 ? 'Погребён под бумагами' : n >= 3 ? 'В центре возни' : 'Стол почти чист'; };

// ---------- сцены ----------
const _introB = Game.introScene;
Game.introScene = function () {
  if (!isBurg()) return _introB ? _introB.call(Game) : null;
  const why = { clerk: 'Совет гильдий выбирал лорда-мэра одиннадцать дней и выбрал вас: вы единственный знали, где лежит протокол выборов.', heir: 'Совет гильдий выбрал вас по традиции. Традиция в Кислоброде — это всё, что делали дважды и не успели запретить.', hero: 'Совет гильдий выбрал вас в благодарность за дракона. Отказаться вы не успели: пока вы были в бане, вас уже привели к присяге.' }[S.regime];
  const lines = [
    ['narrator', `Вольный город Кислоброд, первый день ${ERAS[BURG].start} года. ${why}`],
    ['narrator', 'На столе в кабинете вас ждёт стопка бумаг. Она ждала и вашего предшественника. Некоторые бумаги в ней старше ратуши.'],
  ];
  for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
  lines.push(['economy', 'Порядок простой, {addr}. Гильдии подают прошения, вы ставите печати. Печатей на квартал три, прошений всегда больше. Остальное можно отдать в комиссию или, с вашего позволения, потерять.']);
  lines.push(['defense', 'А то, что печатью не решается, решает Гильдия авантюристов. За деньги. Иногда вместе с кварталом, где это случилось.']);
  lines.push(['narrator', `Ваша задача — просидеть в ратуше до ${Game.endYear()} года. Предшественник продержался четыре. Его портрет висит в коридоре; рама пока пустая, но место выбрано.`]);
  return { title: 'Первый день в ратуше', bg: 'office', lines };
};
const _coupB = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupB.call(Game, role);
  if (!isBurg()) return sc;
  sc.title = 'Стража заперла ратушу';
  sc.lines = [
    ['narrator', 'Три часа ночи. Двери ратуши заперты снаружи. На площади Трёх Колодцев стоят обе стражи: дневная и ночная. Вместе. Такого не было сто лет.'],
    ['npc:colonel', 'Ваша милость! Стража постановила, что вы арестованы. За что — уточняем, но бумага уже составлена. Подпишите, пожалуйста, вот здесь.'],
    ['police', '{Addr}, у нас минут двадцать. Потом они найдут ключ от чёрного хода. Он у них. Они просто забыли, у кого именно.'],
  ];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Выйти на балкон и говорить с горожанами'; c0.win.res = 'Горожане собрались, послушали и стали спрашивать стражу про фонари и украденных кур. Стража разошлась: ей было неловко.'; c0.lose.res = 'На площади были только стражники. Они вежливо дослушали и повторили просьбу подписать.';
  c1.text = 'Вызвать авантюристов'; c1.win.res = '«Три топора» вошли через кухню. Стража сосчитала топоры и вспомнила о срочном обходе.'; c1.lose.res = 'Авантюристы спросили, сколько платит стража. Стража платила больше.';
  if (c2) { if (c2.win) c2.win.res = 'Сосед прислал сотню своих «на ярмарку». Стража посмотрела на гостей и вернулась на посты. Счёт за ярмарку придёт позже.'; if (c2.lose) c2.lose.res = 'Сосед ответил, что это внутреннее дело вольного города, и спросил про пошлину.'; }
  if (c3) { c3.text = 'Уехать к гномам с городской кассой'; c3.res = 'Телега выехала через Подгорные ворота до рассвета. Стража её видела, но у телеги были все бумаги.'; }
  return sc;
};
const _revB = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revB.call(Game);
  if (!isBurg()) return sc;
  sc.title = 'Большая очередь';
  sc.lines = [
    ['narrator', 'В понедельник у ратуши встала очередь. Во вторник она обогнула площадь. К пятнице в ней стоит весь город: с жалобами, табуретками и запасом пирожков. Никто не кричит. Все ждут приёма.'],
    ['npc:rebel', 'Мы по записи. Запись у меня: сорок тысяч фамилий. Я первый. За мной не занимать.'],
    ['defense', 'Разогнать очередь нельзя, {addr}. Это не толпа. Это хуже: у них номерки.'],
  ];
  if (sc.choices[2]) { sc.choices[2].text = 'Уехать к гномам через чёрный ход'; sc.choices[2].res = 'У чёрного хода тоже стояла очередь, но короче. Вас пропустили: решили, что вы за пирожками.'; }
  return sc;
};
const ULT_B = {
  hawks: ['Стража просит жалованье за три года и новые сапоги. Иначе мы начнём соблюдать устав. Весь. Вы не представляете, что там написано.', 'Стража работает строго по уставу. Арестовано четыреста человек за ношение шляп после заката.'],
  oligarchs: ['Палата просит снизить сбор и убрать тролля с моста. Иначе обозы пойдут в объезд. Через другой город. Навсегда.', 'Три обоза ушли в объезд. Тролль скучает и поднял плату для оставшихся.'],
  left: ['Суп, фонари и чтоб река пахла хоть через день. Иначе мы все придём в ратушу. По записи.', 'Грузчики носят строго по одному ящику. Порт разгружает вчерашний корабль послезавтра.'],
  liberals: ['Печатный двор требует отменить согласование заголовков. Иначе мы напечатаем всё, что знаем. А знаем мы, ваша милость, и то, чего не было.', 'Вышли три газеты с одним заголовком: «Ратуша молчит». Ниже — шестнадцать полос о том, о чём именно.'],
  faith: ['Храмовая улица просит освободить храмы от налога на недвижимость. Иначе сорок три проповеди в воскресенье будут об одном и том же человеке.', 'В воскресенье сорок три храма молились о вашем вразумлении. Громко. С колоколами.'],
  new: ['Гильдия воров просит не поднимать квоты и не трогать скупщиков. Иначе мы перестанем воровать. Совсем. Посмотрим, как город проживёт без оборота.', 'Воры объявили забастовку. Третий день в городе ничего не пропадает. Страховые конторы в панике, стража не знает, чем заняться.'],
};
const _facUltB = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltB.call(Game, f);
  if (!isBurg()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_B[f] || ULT_B.left;
  sc.lines = [['narrator', `${name} пришёл в ратушу без записи. Письмоводитель пытался выдать ему номерок и теперь сидит под столом.`], [sp, ask], ['police', 'Откажете — ударят по больному, {addr}. Уступите — завтра придут остальные сорок шесть гильдий.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} уходит довольный. В приёмной уже занимают очередь остальные.`;
  c1.text = 'Откупиться из тайника'; c1.res = 'Конверт пересчитан на месте. Требование отложено до следующего квартала.';
  c2.win.res = 'Его задержали за переход улицы в неположенном месте. Статья нашлась в уставе 412 года.'; c2.lose.res = 'Арест сделал его знаменитым. Его лицо печатают на кульках для пирожков.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayB = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayB.call(Game, role);
  if (!isBurg()) return sc;
  sc.title = 'Измена в канцелярии';
  sc.lines = [['narrator', `${S.adv[role].name} перешёл на службу к вашим противникам и унёс ключи от архива. И сам архив: частями, в портфеле.`], ['narrator', 'Его место займёт родственник. Считает он на пальцах, зато пальцы свои.']];
  sc.choices[0].text = 'Сменить замки'; sc.choices[0].res = 'Замки сменены. Слесарь оказался из Гильдии воров, но работу сделал честно.';
  return sc;
};

// ---------- указы ----------
const decB = (cat, d) => DECREES[cat].push({ eras: [BURG], ok: () => true, ...d });
decB('foreign', { id: 'b_fair', name: 'Большая ярмарка', desc: 'Позвать купцов всех соседей разом. Они будут торговаться друг с другом, а город — брать за место.', cost: '−10 млн', ok: S => S.treasury >= 10, repeat: true,
  run: (S, m) => ({ fx: { treasury: -10, economy: 2, rel: { kingdom: Math.round(4 * m), dwarves: Math.round(4 * m), velentar: Math.round(4 * m), elves: Math.round(3 * m), orcs: Math.round(3 * m) }, fac: { oligarchs: { a: Math.round(5 * m) } } }, text: 'Ярмарка удалась. Орки продали эльфам шкуры, эльфы гномам вино, гномы всем кредит.' }) });
decB('foreign', { id: 'b_church', name: 'Пожертвование Святому Престолу', desc: 'Престол не одобряет город, где сорок три бога. Пожертвование помогает ему не одобрять молча.', cost: '−7 млн', ok: S => S.treasury >= 7, repeat: true,
  run: (S, m) => ({ fx: { treasury: -7, rel: { church: Math.round(10 * m) }, fac: { faith: { a: -3 } } }, text: 'Дар принят. Первосвященник назвал город «заблудшим, но платёжеспособным».' }) });
decB('social', { id: 'b_soup', name: 'Суповые кухни', desc: 'Бесплатный суп для бедных. Что в супе, никто не спрашивает: суп горячий.', cost: '−10 млн', ok: S => S.treasury >= 10, repeat: true,
  run: (S, m) => ({ fx: { treasury: -10, support: Math.round(6 * m), fac: { left: { a: Math.round(7 * m) } } }, text: 'Кухни открыты. Очередь за супом короче, чем очередь в ратушу: прогресс.' }) });
decB('social', { id: 'b_clerks', name: 'Нанять временных письмоводителей', desc: 'Сорок студентов разберут завал. Что именно они подпишут, выяснится позже.', cost: '−8 млн', ok: S => S.treasury >= 8, repeat: true,
  run: () => ({ fx: { treasury: -8, bgClear: 3 }, text: 'Студенты разобрали стопку за ночь. Утром выяснилось, что одно дело они решили в пользу крыс.' }) });
decB('social', { id: 'b_fest', name: 'День города', desc: 'Гонки на тачках, бесплатное пиво, речь лорда-мэра. Речь можно сократить.', cost: '−9 млн', ok: S => S.treasury >= 9, repeat: true,
  run: (S, m) => ({ fx: { treasury: -9, support: Math.round(5 * m), fear: -2 }, text: 'Праздник удался. Победившую тачку дисквалифицировали: в ней нашли гнома.' }) });
decB('social', { id: 'b_curfew', name: 'Ночной запрет', desc: 'После десяти по домам. Воры возмущены: это их рабочее время.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { fear: Math.round(8 * m), support: -4, fac: { new: { a: -6 }, hawks: { a: 4 }, liberals: { a: -5 } } }, text: 'Улицы пусты. Гильдия воров подала официальную жалобу на недобросовестную конкуренцию со стороны государства.' }) });
decB('economy', { id: 'b_bridge', name: 'Второй мост через Кислую', desc: 'Больше телег, больше сборов. Тролль уже подал заявку на должность смотрителя.', cost: '−16 млн', ok: S => S.treasury >= 16, once: true,
  run: () => ({ fx: { treasury: -16, economy: 6, fac: { oligarchs: { a: 9 } } }, text: 'Мост открыт. Перерезая ленточку, вы уронили ножницы в реку. Река их растворила.' }) });
decB('economy', { id: 'b_watch', name: 'Выплатить страже долги', desc: 'Жалованье за три года. Стража от неожиданности начнёт работать.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, army: Math.round(6 * m), fac: { hawks: { a: Math.round(10 * m) } } }, text: 'Стража получила жалованье. В тот же вечер все трактиры города перевыполнили план.' }) });
decB('economy', { id: 'b_census', name: 'Перепись имущества', desc: 'Узнать, кто сколько имеет, и обложить. Все внезапно обеднеют на бумаге.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { treasury: Math.round(12 * m), support: -3, fac: { oligarchs: { a: -8 } }, bgPapers: 1 }, text: 'Перепись показала, что в городе нет ни одного богатого человека. Сбор всё равно собрали. Одно обжалование уже в стопке.' }) });
DEMANDS.push(
  { id: 'b_wool', countries: ['kingdom'], eras: [BURG], text: () => 'Снять сбор с королевской шерсти', fx: () => ({ treasury: -5, rel: { kingdom: 14 } }) },
  { id: 'b_trees', countries: ['elves'], eras: [BURG], text: () => 'Не жечь эльфийскую рощу на уголь', fx: () => ({ economy: -1, rel: { elves: 15 } }) },
  { id: 'b_debt', countries: ['dwarves'], eras: [BURG], text: () => 'Погасить вексель прошлого лорда-мэра', fx: () => ({ treasury: -8, rel: { dwarves: 14 } }) },
  { id: 'b_camp', countries: ['orcs'], eras: [BURG], text: () => 'Отвести Орде место для торга у Степных ворот', fx: () => ({ support: -2, rel: { orcs: 14 }, fac: { hawks: { a: -4 } } }) },
  { id: 'b_spy', countries: ['velentar'], eras: [BURG], text: () => 'Выдать сбежавшего подмастерья', fx: () => ({ rel: { velentar: 14 }, fac: { liberals: { a: -5 } } }) },
  { id: 'b_gods', countries: ['church'], eras: [BURG], text: () => 'Закрыть хотя бы десять из сорока трёх храмов', fx: () => ({ rel: { church: 16 }, fac: { faith: { a: -12 } } }) },
);

// ---------- события ----------
const BL = ['burg'];
EVENTS.push(
  { id: 'bg_audit', title: 'Гномья проверка', bg: 'office', weight: 3, eras: BL,
    lines: [['npc:dwarfB', 'Каз-Дурим ссудил этому городу денег при шести лордах-мэрах подряд. Я прислан посмотреть книги. Все. Начну с тех, которые вы сейчас прячете под стол.'], ['economy', 'Книги в порядке, {addr}. В каком именно — я объясню ему сам, если вы его отвлечёте часа на четыре.']],
    choices: [
      { text: 'Показать настоящие книги', fx: { rel: { dwarves: 8 }, fac: { oligarchs: { a: -6 } }, treasury: -6 }, res: 'Гном читал три дня и ни разу не моргнул. Ушёл со словами «бывает и хуже». От гнома это комплимент.' },
      { text: 'Показать парадные книги', adv: ['economy'], chance: () => 0.5, win: { fx: { rel: { dwarves: 5 }, treasury: 6 }, res: 'Парадные книги произвели впечатление. Гном даже продлил кредит.' }, lose: { fx: { rel: { dwarves: -12 }, treasury: -8 }, res: 'На третьей странице гном нашёл мост, которого нет. Потом ещё два. Процент по кредиту вырос на глазах.' } },
      { text: 'Сводить его в «Утопленник»', req: S => S.treasury >= 4, reqText: 'нужно 4 млн', fx: { treasury: -4, rel: { dwarves: 3 } }, res: 'Проверку отложили на утро. Утром отложили на вечер. Гном уехал через неделю, книги не открыл, но счёт запомнил.' },
    ] },
  { id: 'bg_rain', title: 'Дождь из рыбы', bg: 'street', weight: 2, eras: BL,
    lines: [['propaganda', 'Над Нижним городом второй день идёт дождь из селёдки, {addr}. Солёной. Велентар извиняется: у них учебный год.'], ['npc:citizen', 'Селёдка — это ладно. А кто мне заплатит за крышу? И почему без лука?']],
    choices: [
      { text: 'Объявить рыбный день', adv: ['propaganda'], fx: { support: 4, economy: 1 }, res: 'Глашатаи объявили «подарок от ратуши». Горожане засолили всё, что упало. Торговцы рыбой подали жалобу в стопку.' , },
      { text: 'Выставить Велентару счёт', fx: { treasury: 6, rel: { velentar: -8 } }, res: 'Башня заплатила. В сопроводительном письме говорилось, что в следующий раз будет град. Возможно, это шутка.' },
      { text: 'Создать комиссию по осадкам', fx: { support: -2, bgPapers: 1 }, res: 'Комиссия создана. Её первое заключение: «осадки имеют место». Оно лежит у вас на столе на подпись.' },
    ] },
  { id: 'bg_strike', title: 'Забастовка письмоводителей', bg: 'office', weight: 3, eras: BL, cond: () => Game.bg().papers.length >= 5,
    lines: [['npc:clerkN', 'Мы больше не можем, ваша милость. Стопка в приёмной выше шкафа. Вчера младшего Пуговку завалило прошениями; его откопали, но он теперь заикается на букву «п».']],
    choices: [
      { text: 'Нанять ещё письмоводителей', req: S => S.treasury >= 8, reqText: 'нужно 8 млн', fx: { treasury: -8, bgClear: 3 }, res: 'Новые письмоводители разобрали три дела и завели по два собственных: о сверхурочных.' },
      { text: 'Разобрать стопку самому, ночью', fx: { bgStamps: 2, support: 1 }, res: 'Вы просидели до рассвета. Две лишние печати поставлены. В коридоре шепчутся, что лорд-мэр умеет читать.' },
      { text: 'Объявить стопку памятником', adv: ['propaganda'], fx: { support: -2, fac: { liberals: { a: 4 } }, bgClear: 2 }, res: 'Два самых старых дела переданы в музей. Газеты в восторге. Податели дел — нет: одному из них сто четыре года, и он ещё надеется.' },
    ] },
  { id: 'bg_guildwar', title: 'Война гильдий', bg: 'street', weight: 2, eras: BL,
    lines: [['defense', 'Гильдия пекарей и Гильдия кондитеров дерутся на Мучной улице, {addr}. Спор о том, что считать булочкой. Раненых нет, но пострадавших от крема много.'], ['npc:merchant', 'Палата просит вас вынести решение. Любое. Мы потеряли уже три дня торговли и два воза эклеров.']],
    choices: [
      { text: 'Вынести решение: булочка — это булочка', fx: { fac: { oligarchs: { a: 4 }, left: { a: -3 } }, support: 1 }, res: 'Пекари празднуют. Кондитеры обжаловали. Обжалование пополнило стопку.', },
      { text: 'Назначить экспертизу', fx: { treasury: -3, bgPapers: 1 }, res: 'Эксперты съели все образцы и попросили ещё. Заключение будет, когда они смогут встать.' },
      { text: 'Послать стражу разнять', fx: { army: -1, fac: { hawks: { a: -3 }, oligarchs: { a: 3 } } }, res: 'Стража разняла дерущихся и конфисковала улики. Улики стража съела.' },
    ] },
  { id: 'bg_hero', title: 'Герой требует памятник', bg: 'square', weight: 2, eras: BL, cond: () => Game.bg().solved >= 1,
    lines: [['npc:hero', 'Мы спасли город, ваша милость. Опять. Гильдия считает, что пора поставить нам памятник. Бронзовый. В полный рост. Конный, хотя коней у нас нет.']],
    choices: [
      { text: 'Поставить', req: S => S.treasury >= 8, reqText: 'нужно 8 млн', fx: { treasury: -8, support: 3, fac: { left: { a: 3 } } }, res: 'Памятник открыт. Скульптор перепутал заказы: у героя лицо прошлого лорда-мэра. Все довольны, кроме героя.' },
      { text: 'Назвать в их честь тупик', fx: { support: 1 }, res: 'Тупик Героев. Авантюристы обиделись, но табличку отполировали.' },
      { text: 'Предложить скидку на налог вместо бронзы', adv: ['economy'], fx: { treasury: -3, fac: { oligarchs: { a: -3 } } }, res: 'Авантюристы долго считали и согласились. Потом узнали, что налога с них и так не брали.' },
    ] },
  { id: 'bg_thief', title: 'Жалоба Гильдии воров', bg: 'night', weight: 2, eras: BL,
    lines: [['npc:thief', 'Доброй ночи, ваша милость. Простите, что через окно: привычка. В городе орудует вор без гильдии. Ворует без устава, без выходных и, что обиднее всего, лучше нас.'], ['defense', 'Формально ловить воров должны мы. Но раз уж они сами просят...']],
    choices: [
      { text: 'Поручить страже поймать самоучку', fx: { fac: { new: { a: 8 }, hawks: { a: 3 } }, fear: 2 }, res: 'Самоучку поймали через неделю. Гильдия приняла его в ученики и взыскала взносы за три года.' },
      { text: 'Нанять самоучку на службу', adv: ['police'], fx: { fac: { new: { a: -8 } }, treasury: 5, fear: 2 }, res: 'В Канцелярии слухов новый сотрудник. Замки в ратуше с тех пор не запирают: бесполезно.' },
      { text: 'Пусть гильдия разбирается сама', fx: { fac: { new: { a: -3 } }, support: -1 }, res: 'Вор-самоучка украл у гильдии устав. Гильдия неделю не знала, что ей можно, и на всякий случай не воровала.' },
    ] },
  { id: 'bg_toll', title: 'Тролль просит прибавку', bg: 'village', weight: 2, eras: BL,
    lines: [['economy', 'Тролль со Спорного моста подал прошение лично, {addr}. Он собирает мостовой сбор двадцать лет, ни разу не ошибся в сдаче и просит принять его в штат. С выслугой.'], ['npc:merchant', 'Это чудовище! Оно берёт ровно по тарифу и не принимает подарков!']],
    choices: [
      { text: 'Принять тролля в штат', fx: { treasury: 5, fac: { oligarchs: { a: -6 }, left: { a: 3 } } }, res: 'Тролль получил форму и кокарду. Сборы выросли на треть: оказалось, прежние сборщики брали подарками.' },
      { text: 'Отказать: в уставе нет слова «тролль»', fx: { fac: { oligarchs: { a: 3 } }, bgPapers: 1 }, res: 'Тролль ушёл расстроенный и подал апелляцию. Грамотную. Она в стопке, сверху.' },
      { text: 'Назначить его начальником сборщиков', fx: { treasury: 9, fac: { oligarchs: { a: -10 } }, fear: 2 }, res: 'Три сборщика уволились в первый день. Остальные сдали кассу до гроша и перестали спать.' },
    ] },
  { id: 'bg_news', title: 'Опечатка', bg: 'office', weight: 2, eras: BL,
    lines: [['propaganda', 'В утреннем «Вестнике» опечатка, {addr}. Вместо «лорд-мэр принял послов» напечатано «лорд-мэр принял послов за». Дальше строка обрывается. Город третий час гадает, за кого.']],
    choices: [
      { text: 'Напечатать опровержение', fx: { support: -1, fac: { liberals: { a: 3 } } }, res: 'Опровержение вышло с новой опечаткой. Теперь город гадает, что вы приняли на самом деле.' },
      { text: 'Сделать вид, что так и задумано', adv: ['propaganda'], fx: { support: 3 }, res: 'Глашатаи объявили конкурс на лучшее окончание фразы. Победил вариант «за чистую монету». Послы обиделись.' , },
      { text: 'Закрыть газету на неделю', fx: { fear: 3, support: -2, fac: { liberals: { a: -8 } } }, res: 'Газета закрыта. На заборах появились листки, где фразу дописали сами. Вариантов много, приличных нет.' },
    ] },
  { id: 'bg_flood', title: 'Кислая вышла из берегов', bg: 'street', weight: 2, eras: BL, cond: S => S.q === 2,
    lines: [['defense', 'Река поднялась, {addr}. Нижний город по колено. Хорошая новость: вода в этом году такая густая, что дальше не пойдёт.'], ['npc:citizen', 'У меня в подвале теперь река. Я с неё буду брать мостовой сбор или вы?']],
    choices: [
      { text: 'Послать стражу и телеги', req: S => S.treasury >= 6, reqText: 'нужно 6 млн', fx: { treasury: -6, support: 4, fac: { left: { a: 5 } } }, res: 'Стража два дня возила людей и сундуки. Не пропало ничего: воры на время потопа объявили перемирие.' },
      { text: 'Нанять авантюристов «на стихию»', req: S => S.treasury >= 4, reqText: 'нужно 4 млн', fx: { treasury: -4, support: 2, economy: -1 }, res: 'Авантюристы победили реку. Никто не понял как, но теперь она течёт чуть в другую сторону, и мост стал короток.' },
      { text: 'Подождать, пока спадёт', fx: { support: -4, fac: { left: { a: -6 } } }, res: 'Вода спала через неделю. Осадок остался. В прямом смысле: его вывозят телегами.' },
    ] },
  { id: 'bg_envoys', title: 'Два посла в одной приёмной', bg: 'palace', weight: 2, eras: BL,
    lines: [['foreign', 'В приёмной сидят посол Альденмарка и посол Орды, {addr}. Оба записаны на десять утра. Оба считают, что другой — оскорбление. Мебель пока цела.']],
    choices: [
      { text: 'Принять рыцаря первым', fx: { rel: { kingdom: 6, orcs: -7 } }, res: 'Орк ждал час и за это время съел фикус. Счёт за фикус он оплатить отказался из принципа.' },
      { text: 'Принять орка первым', fx: { rel: { orcs: 6, kingdom: -7 } }, res: 'Рыцарь ждал час стоя, чтобы не помять плащ. Ушёл с прямой спиной и нотой протеста.' },
      { text: 'Принять обоих разом и говорить о пошлинах', adv: ['foreign'], chance: () => 0.5, win: { fx: { rel: { kingdom: 4, orcs: 4 }, treasury: 5 }, res: 'К обеду они вдвоём торговались с вами против вас. Сошлись на том, что город дерёт втридорога. Договор подписан.' }, lose: { fx: { rel: { kingdom: -5, orcs: -5 }, economy: -1 }, res: 'Приёмную ремонтируют. Оба посла уверяют, что начал другой.' } },
    ] },
);

// ---------- летопись мира: те же годы, вид из ратуши ----------
const HISTORY_B = [
  { at: [703, 1], head: 'В ратуше новый лорд-мэр', text: 'Совет гильдий Кислоброда избрал нового главу города. Ставки на срок его правления принимаются в «Утопленнике»; пока лидирует «до осени».', fx: {} },
  { at: [703, 3], head: 'Орда снова пошла на рыцарей', text: 'Триста сорок первый поход на Альденмарк. Обе армии закупают провиант в Кислоброде и стараются не встречаться на рынке.', fx: { treasury: 6, economy: 1 } },
  { at: [704, 2], head: 'Гномы подняли учётную ставку', text: 'Каз-Дурим объявил, что золото под горой кончается. Проценты по городским векселям выросли. Городские векселя не кончаются никогда.', fx: { treasury: -5, fac: { oligarchs: { a: -3 } } } },
  { at: [704, 4], head: 'В Орде сменился вождь', text: 'Прежние торговые договоры с Ордой объявлены «сломанными». Орочьи купцы продолжают торговать как ни в чём не бывало: читать договоры они всё равно не умели.', fx: { rel: { orcs: -6 } } },
  { at: [705, 3], head: 'Велентар запретил вывоз зелий', text: 'Башня ввела запрет на вывоз «до особого распоряжения». Контрабанда зелий через Чародейский канал выросла втрое.', fx: { fac: { new: { a: 4, s: 2 } }, rel: { velentar: -4 } } },
  { at: [706, 3], head: 'В Альденмарке новый король', text: 'Родерик X короновался и первым указом пересмотрел пошлины.',
    choice: { lines: [['foreign', 'Молодой король хочет «нового торгового договора», {addr}. То есть старого, но с его подписью и лучшими для него цифрами.']],
      choices: [
        { text: 'Уступить в цифрах, выиграть в дружбе', fx: { treasury: -4, rel: { kingdom: 12 } }, res: 'Договор подписан. Король назвал вас «другом короны». Купцы назвали вас иначе.' },
        { text: 'Торговаться до последнего гроша', fx: { treasury: 5, rel: { kingdom: -6 }, fac: { oligarchs: { a: 4 } } }, res: 'Торговались два месяца. Сошлись на прежних цифрах. Король запомнил, что в Кислоброде считают лучше.' },
      ] } },
  { at: [707, 2], head: 'Святой Престол объявил год очищения', text: 'Паломники идут в Сияние через Кислоброд тысячами. Все трактиры полны. Храмовая улица возмущена и подняла цены на свечи.', fx: { treasury: 7, fac: { faith: { a: -3 } } } },
  { at: [708, 3], head: 'Чума на гномьих векселях', text: 'В Каз-Дуриме нашли поддельные векселя. Гномы проверяют всё, что подписано за сто лет. Торговля через туннель встала на квартал.', fx: { economy: -3, rel: { dwarves: -3 } } },
  { at: [709, 3], head: 'Комета над миром', text: 'В небе висит хвостатая звезда. Гильдия астрологов продаёт защитные амулеты. Гильдия воров продаёт те же амулеты дешевле.', fx: { support: -1, treasury: 3 } },
  { at: [710, 2], head: 'Гномы открыли биржу', text: 'В Каз-Дуриме торгуют будущими урожаями и будущими войнами. Кислобродские купцы вложились в «будущий дождь» и ждут.', fx: { economy: 2, fac: { oligarchs: { a: 4 } } } },
  { at: [711, 3], head: 'Вечное перемирие', text: 'Светлый союз и Тёмные земли подписали мир. Армии больше не закупают провиант. Купцы в трауре.', fx: { economy: -2, treasury: -4 } },
  { at: [712, 2], head: 'Перемирие нарушено', text: 'Вечный мир продержался девять месяцев. Обе армии снова на рынке. Купеческая палата заказала благодарственный молебен во всех сорока трёх храмах.', fx: { treasury: 8, economy: 2 } },
];

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isBurg()) return;
  const B = Game.bg(), trade = Game.bgTradeIncome(), pile = B.papers.length + B.comm.length;
  const T = {
    exile: ['Отъезд к гномам', 'Вы живёте в Каз-Дуриме. Потолки низкие, проценты высокие. По вечерам вы по привычке ищете, что подписать, и подписываете счёт за хранение.'],
    helicopter: ['Отъезд к гномам', 'Телега довезла вас до Подгорных ворот. Дальше — счёт за хранение и очень низкие потолки.'],
    coup: ['Арестован по всей форме', 'Стража предъявила вам обвинение на сорока листах. Вы нашли в нём одиннадцать ошибок и исправили: привычка. Вас проводили в Долговую башню с уважением. Кормят там по смете, которую вы сами утвердили. Это и есть наказание.'],
    revolution: ['Большая очередь', 'Очередь дошла до вашего кабинета. Вас не тронули: вас просто попросили занять место в конце. Вы стоите в ней третий год. Номерок у вас сорок тысяч первый.'],
    retired: ['Сдал печать', 'Вы сдали печать по акту и уехали разводить капусту. Капуста растёт без согласований. Вы до сих пор не можете к этому привыкнуть.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    E.title = pile >= 7 ? 'Погребён под бумагами, но жив' : trade >= 24 ? 'Город, через который едут все' : B.solved >= 12 ? 'Лучший заказчик Гильдии' : pile <= 2 ? 'Город, который работает' : 'Десять лет в ратуше';
    E.text = `Последний день ${Game.endYear() - 1} года. Вы продержались в ратуше десять лет: в «Утопленнике» на это ставили один к сорока. `
      + (pile >= 7 ? 'Стопка на вашем столе выше вас. Город как-то живёт под ней, сам по себе. Возможно, в этом и был секрет.' : pile <= 2 ? 'Стол почти чист. Письмоводители ходят растерянные: им нечего прятать за шкаф. Говорят, такое было один раз, при основателе, и то по слухам.' : 'Стопка на столе примерно той же высоты, что и в первый день. Бумаги в ней другие. Вы считаете это победой.')
      + ` Подписано дел: ${B.signed}. Потеряно: ${B.lost} (официально — ни одного). Бед, закрытых авантюристами: ${B.solved}.`
      + (trade >= 24 ? ' Через город идёт торговля всего мира, и с каждой телеги городу капает грош.' : ' Торговля идёт, тролль берёт сбор, река пахнет. Город стоит.');
  }
  verdicts.length = 0;
  verdicts.push(`Подписано дел: ${B.signed}`); verdicts.push(`Бед закрыто: ${B.solved}`);
  verdicts.push(`Торговля: ${String(trade).replace('.', ',')} млн в квартал`);
  if (B.lost >= 5) verdicts.push('За шкафом тесно');
  verdicts.push(`Гильдий за вас: ${Game.bgSeats()} из 6`);
});

// ---------- вестник ----------
const _pressPageB = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isBurg()) return _pressPageB.call(UI, news);
  const ch = [], B = Game.bg();
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Весть: ' + h.head); }
  const off = [['Происшествия', pick(['На Мучной улице украдена лестница. Вор, предположительно, ушёл по ней.', 'Найден кошелёк. Владельца просят опознать содержимое. Желающих четыреста.', 'В реку упала телега. Телега цела: не утонула.'])],
    ['Объявления', pick(['Продам осла. Умный, знает дорогу в трактир. Причина продажи: знает дорогу в трактир.', 'Гильдия алхимиков извиняется перед жителями Кривого переулка. Прямым он был недолго.', 'Сниму комнату без привидений. Или с одним, но тихим.'])],
    ['Из ратуши', B.papers.length >= 6 ? 'Приём прошений временно ведётся через окно: дверь завалена прошениями.' : 'Лорд-мэр работает с документами. Документы пока проигрывают.']];
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="rm-np">
      <div class="rm-np-mast">Кислобродский вестник</div>
      <div class="rm-np-date">Кислоброд · ${['зима', 'весна', 'лето', 'осень'][S.q - 1]} ${S.year} года · цена один грош, с опечатками два</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="rm-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит ратуша?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
Object.assign(UI, {
  tab_papers() {
    const B = Game.bg(), F = REGIONS[KIS].factions, fn = f => (F[f] || NEW_FACTIONS[BURG]), seats = Game.bgSeats(), max = Game.bgStampMax(), hub = S.phase === 'hub';
    const paper = (P, i) => { const D = PAPER_DECK.find(x => x.id === P.id), old = S.turn - P.at >= 2, sfx = Game.bgPaperFx(P, 'sign'), poor = sfx.treasury < 0 && S.treasury < -sfx.treasury;
      return `<article class="bg-paper ${old ? 'old' : ''}"><span class="bg-from">${fn(D.from).icon} ${esc(fn(D.from).name)}${P.grown ? ' · вернулось из комиссии' : ''}${old ? ' · лежит давно' : ''}</span><h3>${esc(D.title)}</h3><p>${esc(D.text)}</p>
        <div class="dec-fx"><div class="dec-row"><span class="dec-tag">Подписать</span>${UI.fxChips(Game.previewFx(sfx))}</div><div class="dec-row"><span class="dec-tag">Отклонить</span>${UI.fxChips(Game.previewFx(Game.bgPaperFx(P, 'deny')))}</div></div>
        <div class="acts"><button class="btn small" data-act="bgp:${i}:sign" ${B.stamps <= 0 || poor || !hub ? 'disabled' : ''}>Подписать</button><button class="btn small" data-act="bgp:${i}:deny" ${B.stamps <= 0 || !hub ? 'disabled' : ''}>Отклонить</button><button class="btn small ghost" data-act="bgp:${i}:comm" ${B.comm.length >= 3 || !hub ? 'disabled' : ''}>В комиссию</button><button class="btn small ghost" data-act="bgp:${i}:lose" ${!hub ? 'disabled' : ''}>Потерять</button></div></article>`; };
    return `<p class="lede">Городом правит совет гильдий, а совет общается с вами письменно. Каждый квартал на стол ложатся новые прошения, и их всегда больше, чем печатей. Подписать или отклонить можно столько, сколько у вас печатей. Остальное лежит и портит настроение подателю. Дело можно сдать в комиссию: через три квартала оно вернётся толще и дороже. Или потерять: иногда теряется насовсем, иногда находится в газете.</p>
      <section class="card"><div class="eyebrow">Стол лорда-мэра</div>
        <p><b>Печати на этот квартал:</b> <span class="bg-stamps" role="img" aria-label="${B.stamps} из ${max}">${Array.from({ length: max }, (_, i) => `<i class="${i < B.stamps ? 'f' : ''}"></i>`).join('')}</span> · <b>в стопке:</b> ${B.papers.length} · <b>в комиссиях:</b> ${B.comm.length} из 3 (каждая стоит 1 млн в квартал)</p>
        <p><b>Гильдий за вас: ${seats} из 6.</b> ${seats >= 4 ? 'Смета утверждается без скандала.' : seats >= 3 ? 'Поровну: каждое заседание кончается ничьей и буфетом.' : 'Большинства нет: −2 млн в квартал и растущее желание стражи навести порядок.'}</p>
        <p class="muted small">Печати не переносятся на следующий квартал и не требуют приказов. Шесть дел в стопке — уже завал: хозяйство и настроение горожан начинают падать. Больше восьми стопка не держит: самое старое дело «всплывает» в газете. Указ «Нанять временных письмоводителей» разбирает три дела сразу.</p></section>
      ${B.papers.length ? `<div class="bg-pile mt">${B.papers.map(paper).join('')}</div>` : '<section class="card mt"><p>Стол пуст. Письмоводители смотрят на вас с подозрением и на всякий случай прячут чернильницы.</p></section>'}
      ${B.comm.length ? `<section class="card mt"><div class="eyebrow">В комиссиях</div>${B.comm.map(c => `<p class="small">«${esc(PAPER_DECK.find(x => x.id === c.id).title)}» — вернётся через ${c.back - S.turn} кв.</p>`).join('')}</section>` : ''}`;
  },
  tab_quests() {
    const B = Game.bg(), hub = S.phase === 'hub', free = B.parties.filter(p => !p.busy && p.hurt <= 0), kindName = { force: 'сила', wit: 'хитрость', magic: 'магия' };
    const quest = (q, i) => { const Q = QUEST_DECK.find(x => x.id === q.id), P = q.party && PARTY_POOL.find(x => x.id === q.party);
      return `<article class="card bg-quest ${q.party ? 'busy' : ''}"><header><div><h3>${esc(Q.name)}</h3><span class="muted small">нужна ${kindName[Q.kind]} · сложность ${'★'.repeat(Q.diff)}${'☆'.repeat(5 - Q.diff)}${Q.route ? ` · душит ${esc(ROUTES[Q.route].name.toLowerCase())}` : ''}</span></div><span class="chip ${q.party ? 'coopted' : 'banned'}">${q.party ? 'в работе' : q.age ? `висит ${q.age} кв.` : 'новая'}</span></header>
        <p class="muted small">${esc(Q.text)}</p>
        <div class="dec-fx"><div class="dec-row"><span class="dec-tag">Если решить</span>${UI.fxChips(Game.previewFx(Q.win))}</div></div>
        ${P ? `<p class="small">Взялись: <b>${esc(P.name)}</b>. Отчёт — в конце ${q.left > 1 ? 'следующего' : 'этого'} квартала.</p>` : `<div class="acts">${free.length ? free.map(p => { const D = PARTY_POOL.find(x => x.id === p.id), fee = Game.bgFee(p.id); return `<button class="btn small" data-act="bgq:${i}:${p.id}" ${S.treasury < fee || S.ap <= 0 || !hub ? 'disabled' : ''}>${esc(D.name)}<small>−${fee} млн · шанс ${Math.round(Game.bgChance(q.id, p.id) * 100)}%</small></button>`; }).join('') : '<span class="muted small">Свободных отрядов нет.</span>'}</div>`}</article>`; };
    const party = p => { const D = PARTY_POOL.find(x => x.id === p.id);
      return `<article class="card"><header><div><h3>${esc(D.name)}</h3><span class="muted small">${p.busy ? 'на деле' : p.hurt > 0 ? `лечатся в трактире, ${p.hurt} кв.` : 'свободны'}${p.lvl ? ` · слава ${'★'.repeat(p.lvl)}` : ''}</span></div></header>
        <p class="muted small">${esc(D.desc)}</p><div class="bg-skill"><span>сила <b>${D.force + p.lvl}</b></span><span>хитрость <b>${D.wit + p.lvl}</b></span><span>магия <b>${D.magic + p.lvl}</b></span><span>берут <b>${Game.bgFee(p.id)}</b> млн</span></div></article>`; };
    const next = PARTY_POOL.find(p => !B.parties.some(x => x.id === p.id));
    return `<p class="lede">Есть беды, которые нельзя решить печатью: у них зубы. Для этого в городе есть Гильдия авантюристов. Вы выбираете отряд под беду: силачей к чудовищу, пройдох к пропаже, недоучек к колдовству. Отряд берёт аванс и уходит. Вернётся ли он с победой, со счётом за разрушения или вообще — узнаете в конце квартала.</p>
      <p class="muted small">Нерешённая беда вредит городу каждый квартал, и чем дольше висит, тем сильнее. Некоторые душат торговый путь. После успеха отряд набирается славы: работает лучше и берёт дороже. После провала два квартала «лечится». Иногда не возвращается.</p>
      <h3 class="sub-h">Беды города</h3>
      ${B.quests.length ? `<div class="bg-quests">${B.quests.map(quest).join('')}</div>` : '<section class="card"><p>В городе тихо. Авантюристы сидят в «Утопленнике» и от скуки начинают искать приключений сами. Это тревожный знак.</p></section>'}
      <h3 class="sub-h mt">Отряды на примете</h3>
      <div class="bg-parties">${B.parties.map(party).join('')}</div>
      <div class="acts mt"><button class="btn small" data-act="bgh:hire" ${!next || B.parties.length >= 5 || S.treasury < 6 || S.ap <= 0 || !hub ? 'disabled' : ''}>Повесить объявление на доску<small>${next && B.parties.length < 5 ? '−6 млн · откликнется новый отряд' : 'в городе больше некого нанять'}</small></button></div>`;
  },
  tab_trade() {
    const B = Game.bg(), hub = S.phase === 'hub';
    const route = k => { const D = ROUTES[k], R = B.routes[k], C = COUNTRIES[k], blocked = B.quests.find(q => QUEST_DECK.find(x => x.id === q.id).route === k), inc = Game.bgRouteIncome(k);
      return `<article class="card country"><header>${flagSvg(k)}<div><h3>${esc(D.name)}</h3><span class="muted small">${esc(C.name)} · ${esc(D.goods)}</span></div><span class="chip ${blocked && R.guard <= 0 ? 'banned' : B.hot === k ? 'coopted' : ''}">${blocked && R.guard <= 0 ? 'путь придушен' : B.hot === k ? 'товар квартала' : `уровень ${R.lvl}`}</span></header>
        ${UI.meter('Отношения', S.rel[k] || 0, (S.rel[k] || 0) >= 55 ? 'good' : (S.rel[k] || 0) >= 35 ? 'warn' : 'bad')}
        <p class="muted small">Даёт городу <b>+${inc.toFixed(1).replace('.', ',')} млн</b> в квартал. Уровень пути: ${R.lvl} из 3.${blocked ? ` Мешает беда «${esc(QUEST_DECK.find(x => x.id === blocked.id).name)}»${R.guard > 0 ? ', но обозы идут под охраной.' : ': доход втрое меньше.'}` : ''}${R.guard > 0 ? ` Охрана оплачена ещё на ${R.guard} кв.` : ''}</p>
        <div class="acts">${Game.bgRouteActions(k).map(a => UI.actBtn(`bgr:${k}:${a.id}`, a)).join('')}</div></article>`; };
    return `<p class="lede">Кислоброд ничего не производит, кроме запаха. Он стоит там, где сходятся пять дорог, и берёт с каждой телеги. Доход пути зависит от того, насколько путь налажен, как к вам относится сосед и не сидит ли на дороге кто-нибудь с зубами. Каждый квартал один товар в особой цене: путь с ним даёт в полтора раза больше.</p>
      <div class="cr">
        <section class="card" style="flex:1.2"><div class="eyebrow">Торговля за квартал</div><h2 class="rm-rank">+${String(Game.bgTradeIncome()).replace('.', ',')} млн</h2>
          <p class="muted small">Товар квартала: <b>${esc(ROUTES[B.hot].goods)}</b> (${esc(ROUTES[B.hot].name.toLowerCase())}).</p></section>
        <section class="card cr-side"><div class="eyebrow">Пошлина</div>
          <div class="bg-tariff">${TARIFFS.map((t, i) => `<button class="jp-pos ${i === B.tariff ? 'on' : ''}" data-act="bgt:${i}" ${i === B.tariff || Math.abs(i - B.tariff) !== 1 || B.tariffAt === S.turn || S.ap <= 0 || !hub ? 'disabled' : ''}>${t[0]}</button>`).join('')}</div>
          <p class="muted small">${esc(TARIFFS[B.tariff][2])} Сменить можно на соседнее положение, раз в квартал, за один приказ.</p></section>
      </div>
      <div class="grid mt bg-routes">${Object.keys(ROUTES).map(route).join('')}</div>`;
  },
});
const _tabCabB = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabB.call(UI);
  if (!isBurg()) return h;
  const B = Game.bg();
  return h.replace(/У власти ([\d.,]+) г\./, `В ратуше $1 г. На столе дел: ${B.papers.length}, печатей осталось: ${B.stamps}. Бед в городе: ${B.quests.length}. Торговля: +${String(Game.bgTradeIncome()).replace('.', ',')} млн.`);
};
UI.actionHandlers.push(id => {
  if (!/^bg[pqhrt]:/.test(id)) return false;
  if (S.phase !== 'hub') return true;
  const p = id.split(':');
  const out = p[0] === 'bgp' ? Game.bgPaper(+p[1], p[2]) : p[0] === 'bgq' ? Game.bgSend(+p[1], p[2]) : p[0] === 'bgh' ? Game.bgHire() : p[0] === 'bgr' ? Game.bgRouteAction(p[1], p[2]) : Game.bgTariff(+p[1]);
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
