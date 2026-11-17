// «Диктато: Мир, которого нет». Первая держава — Магократия Велентар.
// Шаблонное фэнтези вокруг, диктатура как везде. Юмор возвращается.
// Особые разделы: «Развитие магии» (правитель изучает школы, чтобы возвеличить себя) и «Совет магов» (шесть колдунов, без большинства которых править трудно).
const VEL = 'velentar';

// ---------- соседи: шаблонное фэнтези ----------
Object.assign(FLAGS, {
  kingdom: `<rect width="30" height="20" fill="#27457a"/><path d="M9 13 L9 7 L12 10 L15 6 L18 10 L21 7 L21 13 Z" fill="#d9b44a"/><rect x="9" y="13.6" width="12" height="1.6" fill="#d9b44a"/>`,
  elves: `<rect width="30" height="20" fill="#2e5a3c"/><path d="M15 4 Q22 10 15 16 Q8 10 15 4 Z" fill="#d8dccf"/><path d="M15 5 V17" stroke="#2e5a3c" stroke-width="0.8"/>`,
  dwarves: `<rect width="30" height="20" fill="#4a4a4e"/><rect x="14.2" y="6" width="1.6" height="10" fill="#c98a3a"/><rect x="10.5" y="5" width="9" height="4" rx="0.6" fill="#c9ccd0"/>`,
  orcs: `<rect width="30" height="20" fill="#1c1c1c"/><path d="M11 15 L11 9 L13 6 L13 10 L14.5 5 L15.5 10 L17 5 L17.5 10 L19.5 7 L19 15 Z" fill="#a8242a"/>`,
  church: `<rect width="30" height="20" fill="#e9e3d0"/><circle cx="15" cy="10" r="3.4" fill="#d9a520"/><path d="M15 3 V5.4 M15 14.6 V17 M8 10 H10.4 M19.6 10 H22 M10 5 L11.7 6.7 M18.3 13.3 L20 15 M20 5 L18.3 6.7 M11.7 13.3 L10 15" stroke="#d9a520" stroke-width="1"/>`,
  velentar: `<rect width="30" height="20" fill="#3a2f5e"/><path d="M12.6 16 V8.6 L11.6 8.6 L11.6 6.2 L13 6.2 L13 7.2 L14.3 7.2 L14.3 6.2 L15.7 6.2 L15.7 7.2 L17 7.2 L17 6.2 L18.4 6.2 L18.4 8.6 L17.4 8.6 V16 Z" fill="#d9b44a"/><path d="M15 2 L15.6 3.6 L17.2 3.7 L16 4.7 L16.4 6.3 L15 5.4 L13.6 6.3 L14 4.7 L12.8 3.7 L14.4 3.6 Z" fill="#d8dccf"/>`,
});
Object.assign(COUNTRIES, {
  kingdom: { name: 'Королевство Альденмарк', bloc: 'west', flag: 'kingdom', leaders: [[706.5, 'король Родерик IX Добрый'], [9999, 'король Родерик X, пока без прозвища']] },
  elves: { name: 'Лесной престол Сильвариэн', bloc: 'west', flag: 'elves', leaders: [[9999, 'владычица Иэллен, третье тысячелетие правления']] },
  church: { name: 'Святой Престол Сияния', bloc: 'west', flag: 'church', leaders: [[708.2, 'первосвященник Бенедикт Негасимый'], [9999, 'первосвященник Игнатий Ещё Более Негасимый']] },
  dwarves: { name: 'Подгорный престол Каз-Дурим', bloc: 'neutral', flag: 'dwarves', leaders: [[9999, 'король-под-горой Торгрим Сальдо']] },
  orcs: { name: 'Орда Гхаш', bloc: 'east', flag: 'orcs', leaders: [[704.5, 'вождь Грулл Костолом'], [707.5, 'вождь Мог, сломавший Грулла'], [9999, 'вождиня Урша, сломавшая Мога']] },
});
Object.assign(COUNTRY_CASES, { kingdom: ['Альденмарка', 'Альденмарком', 'в Альденмарк'], elves: ['Сильвариэна', 'Сильвариэном', 'в Сильвариэн'], church: ['Святого Престола', 'Святым Престолом', 'к Святому Престолу'], dwarves: ['Каз-Дурима', 'Каз-Дуримом', 'в Каз-Дурим'], orcs: ['Орды', 'Ордой', 'в Орду'] });
const BLOCR = { kingdom: 'west', elves: 'west', church: 'west', dwarves: 'neutral', orcs: 'east' };

// ---------- облик ----------
const RM_ROBE = (color = '#3a2f5e', extra = {}) => ({ outfit: 'mantle', outfitColor: color, trim: '#c9a640', hat: 'wizard', hatColor: color, hatBand: '#c9a640', glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', ...extra });
const RM_COWL = (color = '#2a2230', extra = {}) => ({ outfit: 'robe', outfitColor: color, trim: '#6a2a4a', hat: 'hood', hatColor: color, glasses: 'none', beard: 'none', cigar: false, tie: 'none', medals: 0, sash: '', ...extra });
const LR = o => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', ...o });
const RM_LICH = { skin: '#b9c4ad', eyeGlow: '#7fe0c0', hair: 'bald', hairColor: '#8a8f80', brows: 'none', mouth: 'flat', mustache: 'none', beard: 'none' };

// ---------- три старта ----------
Object.assign(REGIME_TYPES, {
  lich: {
    name: 'Лич', icon: '💀',
    desc: 'Вы умерли триста лет назад и с тех пор не нашли причин это признавать. Опыта у вас больше, чем у всего совета вместе. Народ вас боится, Святой Престол требует вашего упокоения. Зато убить вас трудно: это уже пробовали. Некромантия — третий круг с первого дня.',
    fx: { fear: 12, support: -6 }, fac: { left: { a: -10 }, faith: { a: -6 }, hawks: { a: 6 }, new: { a: 8 } }, rel: { church: -22, kingdom: -8, orcs: 6 },
  },
  archmage: {
    name: 'Архиволшебник', icon: '🧙',
    desc: 'Совет избрал вас большинством в один голос, и этот голос жалеет до сих пор. Вы знаете устав Башни наизусть и все школы понемногу. Вас уважают, пока вы никому не мешаете. Изыскания вам удаются чаще, совет на старте благосклонен.',
    fx: { support: 4 }, fac: { faith: { a: 16 }, liberals: { a: 8 }, new: { a: -6 } }, rel: { elves: 8, kingdom: 4 },
  },
  warlock: {
    name: 'Варлок', icon: '😈',
    desc: 'Свою силу вы не выучили, а взяли в долг. Кредитор — Тот, Кто Снаружи; проценты он берёт не золотом. Совет считает вас выскочкой. Зато у вас есть то, чего нет у них: результаты к сроку. Призыв — третий круг с первого дня, и у Покровителя всегда можно попросить ещё.',
    fx: { treasury: 20, fear: 5 }, fac: { new: { a: 22 }, faith: { a: -14 }, oligarchs: { a: 6 } }, rel: { church: -12, orcs: 8 },
  },
});
Object.assign(DEFAULT_PILLARS, { lich: ['hawks', 'new'], archmage: ['faith', 'liberals'], warlock: ['new', 'oligarchs'] });
REGIME_TITLES[VEL] = { lich: 'Лич-владыка', archmage: 'Архимаг', warlock: 'Тёмный магистр' };
REGION_TITLES[VEL] = ['Архимаг', 'Лич-владыка', 'Тёмный магистр', 'Владыка Башни', 'Верховный чародей'];
Object.assign(TITLE_FORMS, { 'Архимаг': ['Архимага', 'Архимагом'], 'Лич-владыка': ['Лича-владыки', 'Личом-владыкой'], 'Тёмный магистр': ['Тёмного магистра', 'Тёмным магистром'], 'Владыка Башни': ['Владыки Башни', 'Владыкой Башни'], 'Верховный чародей': ['Верховного чародея', 'Верховным чародеем'] });
REGIME_SETUP_LOOK[VEL] = {
  lich: { ...RM_LICH, face: 'long', ...RM_COWL('#22202a', { hat: 'circlet', gem: '#7fe0c0', hatMetal: '#8a8f80' }) },
  archmage: { skin: SKIN.light, face: 'long', hair: 'long', hairColor: '#d8d8d8', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'flat', eyeGlow: '', ...RM_ROBE('#3a2f5e') },
  warlock: { skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#1a1410', beard: 'goatee', mustache: 'pencil', brows: 'angry', mouth: 'smirk', eyeGlow: '', ...RM_COWL('#2a1a22', { trim: '#a8242a' }) },
};
for (const k of ['lich', 'archmage', 'warlock']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[VEL][k], bluetooth: false };
const RM_NAMES = { lich: 'Мальзахар Вечный', archmage: 'Альберик Многомудрый', warlock: 'Каин Вексельберг' };
function realmSetupLook(st, key) {
  const L = st.look;
  if (key === 'outfit') Object.assign(L, { outfitColor: { mantle: '#3a2f5e', robe: '#2a2230', plate: '#3a3d44' }[L.outfit], trim: L.outfit === 'robe' ? '#6a2a4a' : '#c9a640' });
  if (key === 'hat' || key === 'outfit') L.hatColor = L.outfitColor;
}

// ---------- страна ----------
NAME_POOLS.realm = { m: ['Бальтазар', 'Корвин', 'Эдвин', 'Теобальд', 'Морган', 'Освальд', 'Перегрин', 'Ансельм', 'Гидеон', 'Люциан'], f: ['Мирабелла', 'Гортензия', 'Изольда'], last: ['Звездочёт', 'Сумрак', 'Бурелом', 'Тихоступ', 'Златоуст', 'Ворон', 'Полынь', 'Громоотвод', 'Девятипалый', 'Недоучка'] };
RELATIVES_BY_STYLE.realm = { defense: 'Кузен Борс', economy: 'Шурин Пип', police: 'Тётушка Агата', propaganda: 'Племянник Финн', foreign: 'Зять Освальд' };
REGIONS[VEL] = {
  name: 'Магократия', short: 'Магократия',
  blurb: 'Семь шпилей, один совет и ни одного закона, который нельзя было бы истолковать заново. Правят те, у кого есть дар. Остальные пашут, платят и стараются не попадаться под эксперимент.',
  country: 'Магократия Велентар', capital: 'Семишпилье', currency: 'золотой',
  exports: 'зелья, амулеты и предсказания погоды', exportGen: 'зелий', company: 'гильдия «Реторта и сыновья»', patron: 'dwarves',
  sport: 'турнир по магическим дуэлям', rival: 'Святой Престол Сияния', rivalShort: 'Святой Престол',
  disputed: 'Спорные Пустоши', faithLeader: 'Хранитель', capitalSquare: 'площади Семи Шпилей',
  jungle: 'Гиблом лесу', nephew: 'Финн',
  countries: ['kingdom', 'elves', 'church', 'dwarves', 'orcs'],
  relInit: { kingdom: 50, elves: 45, church: 30, dwarves: 55, orcs: 35 },
  flag: FLAGS.velentar,
  leaderSkin: 'light', era: 'realm', style: 'realm', faithStyle: 'canon', exile: 'гномьих чертогах', critters: 'домовых',
  factions: {
    left: { name: 'Бездарные', short: 'Бездарные', icon: '🌾', desc: 'Девять десятых населения: те, у кого нет дара. Пашут, куют, платят подать и знают, что дождь идёт тогда, когда наместник в настроении. Вилы у них настоящие.' },
    liberals: { name: 'Вольные чародеи', short: 'Вольные чародеи', icon: '📜', desc: 'Молодые маги и недоучки. Считают, что грамоте можно учить и бездарных, а заклинания не обязаны быть на мёртвом языке. В Башне это называют ересью, в трактирах — здравым смыслом.' },
    faith: { name: 'Хранители Канона', short: 'Хранители', icon: '🕯️', desc: 'Старейшие маги, блюстители устава. Всё новое проверяют на соответствие Канону. Проверка занимает от ста лет.' },
    oligarchs: { name: 'Гильдия алхимиков', short: 'Алхимики', icon: '⚗️', desc: 'Зелья, амулеты, кристаллы маны. Торгуют со всеми соседями сразу, включая тех, с кем Магократия не разговаривает. Золото у них настоящее. В основном.' },
    hawks: { name: 'Боевые маги', short: 'Боевые маги', icon: '🔥', desc: 'Легион Жезла. Решают вопросы огненным шаром и искренне не понимают, зачем нужны остальные школы. Присягали Башне. Кому именно в Башне — уточняют по обстановке.' },
  },
  advisors: {
    defense: { name: 'Боевой магистр Гром Тарразин', bio: 'Командует Легионом Жезла. Знает одно заклинание. Ему хватает.', look: LR({ face: 'square', hair: 'short', hairColor: '#8a3a1a', beard: 'full', mustache: 'thick', brows: 'angry', outfit: 'plate', hat: 'none' }) },
    economy: { name: 'Казначей-алхимик Пип Ретортус', bio: 'Двадцать лет превращает свинец в золото. Пока получается только обратно.', look: LR({ face: 'round', hair: 'combover', hairColor: '#6a6a6a', glasses: 'round', brows: 'worried', ...RM_ROBE('#4a4a30', { hat: 'none' }) }) },
    police: { name: 'Прорицательница Агата Всевидящая', bio: 'Глава Ока Башни. Знает, что вы подумали. Знала ещё вчера.', look: LR({ face: 'long', hair: 'bun', hairColor: '#c0c0c0', brows: 'angry', earring: true, ...RM_COWL('#2a2a3a', { hat: 'circlet', gem: '#b98ae0' }) }) },
    propaganda: { name: 'Иллюзионист Финн Радужный', bio: 'Отвечает за народное ликование. Половина ликующих на площади — его работа. Вторая половина тоже, но они об этом не знают.', look: LR({ face: 'oval', hair: 'long', hairColor: '#b87a2a', mouth: 'grin', ...RM_ROBE('#6a3a6a') }) },
    foreign: { name: 'Магистр порталов Освальд Тудасюда', bio: 'Был во всех столицах мира. В двух — одновременно. Обратно попадает не всегда с первого раза.', look: LR({ face: 'long', hair: 'slick', hairColor: '#333', mustache: 'pencil', glasses: 'monocle', ...RM_ROBE('#2a4a5a', { hat: 'none' }) }) },
  },
};
REGION_TALK[VEL] = { addr: 'ваше могущество', sir: 'мэтр', lady: 'мэтресса', holiday_acc: 'День Основания Башни', holiday_dat: 'Дню Основания Башни', gringo: 'паладины', haven: 'гномий банк', exileTo: 'Каз-Дурим', canteen: 'похлёбка для подмастерьев', fruit_adj: 'Зачарованный', locale: 'Велентара', pay_in_kind: 'Зельями.', vegas: 'башня отдыха с видом на бездну', rebel: 'Человек с вилами', meeting: 'в трактире «Пьяный грифон»' };
FAITH_TALK.canon = { priest_open: 'Отрок... Простите, {addr}.', heavens: 'Канону', faith_quip: 'Канон пока не голосует. Но толкуется.', sermon: 'чтения Канона', faith_appeal: 'Об этом узнают Хранители.', temple_loc: 'в Зале Канона', righteous: 'Хранители называют вас «допустимым отклонением»' };
FAITH_TITLE.canon = 'Хранитель';
PAPERS[VEL] = ['Вестник Башни', 'подмётные свитки'];
LEADER_STYLE[VEL] = {
  left: { title: 'Староста', look: { outfit: 'robe', outfitColor: '#6a5a3a', trim: '#4a3a22', hat: 'none', glasses: 'none', medals: 0, sash: '' } },
  liberals: { title: 'Вольный мэтр', look: RM_ROBE('#3a5a6a', { hat: 'none' }) },
  faith: { male: true, title: 'Хранитель', look: RM_ROBE('#5a5a5a', { trim: '#e8e2d0', beard: 'full', hairColor: '#d8d8d8' }) },
  oligarchs: { title: 'Мастер гильдии', look: RM_ROBE('#4a4a30', { hat: 'none', glasses: 'round' }) },
  hawks: { male: true, title: 'Магистр войны', look: { outfit: 'plate', hat: 'none', glasses: 'none', medals: 0, sash: '' } },
  new: { title: 'Призыватель', look: RM_COWL('#2a1a22', { trim: '#a8242a' }) },
};
NEW_FACTIONS[REALM] = {
  name: 'Круг призывателей', short: 'Призыватели', icon: '😈',
  desc: 'Демонологи. Заключают договоры с Теми, Кто Снаружи, и уверяют, что мелкий шрифт читали. Сильны, полезны и однажды откроют не ту дверь.',
  rivals: ['faith', 'liberals'], risk: 'coup', appear: () => true,
  intro: 'Круг призывателей объявил внеочередное «ночное бдение». В подвалах Башни пахнет серой сильнее обычного.',
  grow: S => (S.fear - 45) / 80,
};
function npcR(key) {
  const M = {
    knight: { name: 'Рыцарь-посланник Альденмарка', look: LR({ face: 'square', hair: 'short', hairColor: '#b89a5a', mustache: 'thick', outfit: 'plate', hat: 'none' }) },
    elf: { name: 'Посланница Сильвариэна', look: LR({ face: 'long', hair: 'long', hairColor: '#e8e2c0', ears: 'elf', earring: true, mouth: 'smirk', outfit: 'robe', outfitColor: '#2e5a3c', trim: '#d8dccf', hat: 'circlet', gem: '#d8dccf', hatMetal: '#d8dccf' }) },
    dwarf: { name: 'Гном-счетовод', look: LR({ skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#8a3a1a', beard: 'full', mustache: 'walrus', brows: 'bushy', glasses: 'round', outfit: 'plate', steel: '#8a7a5a', hat: 'none' }) },
    orc: { name: 'Посол Орды', look: { skin: '#7a9a5a', face: 'square', hair: 'short', hairColor: '#1a1a1a', mustache: 'none', brows: 'angry', mouth: 'flat', glasses: 'none', tusks: true, outfit: 'plate', steel: '#4a4a44', hat: 'none' } },
    inquisitor: { name: 'Инквизитор Святого Престола', look: LR({ face: 'long', hair: 'bald', hairColor: '#aaa', brows: 'angry', outfit: 'robe', outfitColor: '#e9e3d0', trim: '#d9a520', hat: 'none' }) },
    peasant: { name: 'Человек с вилами', look: LR({ skin: SKIN.tan, face: 'round', hair: 'short', hairColor: '#5a4a3a', mustache: 'thick', brows: 'worried', outfit: 'robe', outfitColor: '#6a5a3a', trim: '#4a3a22', hat: 'none' }) },
    apprentice: { name: 'Подмастерье', look: LR({ face: 'oval', hair: 'short', hairColor: '#b87a2a', brows: 'worried', mouth: 'o', sweat: true, ...RM_ROBE('#4a4a6a', { hat: 'none', trim: '#8a8a9a' }) }) },
    demon: { name: 'Тот, Кто Снаружи', look: { skin: '#8a2a3a', face: 'long', hair: 'bald', hairColor: '#1a1a1a', mustache: 'pencil', beard: 'goatee', brows: 'angry', mouth: 'grin', glasses: 'monocle', eyeGlow: '#f0c419', ears: 'elf', outfit: 'suit', outfitColor: '#1a1a1a', tie: '#a8242a', hat: 'none' } },
    skeleton: { name: 'Скелет-письмоводитель', look: { skin: '#e4dfcf', face: 'long', hair: 'bald', hairColor: '#e4dfcf', mustache: 'none', brows: 'none', mouth: 'grin', glasses: 'round', eyeGlow: '#7fe0c0', outfit: 'robe', outfitColor: '#3a3a3a', trim: '#8a8a8a', hat: 'none' } },
    guard: { name: 'Капитан стражи Башни', look: LR({ face: 'square', hair: 'short', hairColor: '#444', brows: 'angry', outfit: 'plate', hat: 'helmet', hatColor: '#9aa0a6' }) },
    colonel: { name: 'Боевой маг из Легиона', look: LR({ face: 'square', hair: 'short', hairColor: '#8a3a1a', brows: 'angry', beard: 'goatee', ...RM_ROBE('#7a2a1a', { hat: 'none' }) }) },
    rebel: { name: 'Человек с вилами', look: LR({ skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#333', brows: 'angry', outfit: 'robe', outfitColor: '#6a5a3a', trim: '#4a3a22', hat: 'none' }) },
    toad: { name: 'Жаба (бывший член совета)', look: { skin: '#6a9a4a', face: 'round', hair: 'bald', hairColor: '#4a7a3a', mustache: 'none', brows: 'none', mouth: 'flat', glasses: 'none', outfit: 'mantle', outfitColor: '#3a2f5e', trim: '#c9a640', hat: 'none' } },
  };
  return M[key] || (MAGI[key] ? { name: MAGI[key].name, look: MAGI[key].look } : null);
}

// ---------- эпоха ----------
ERAS[REALM] = {
  name: 'Эпоха Шпилей', label: 'Мир, которого нет', start: 703, turns: 40, dark: true, fantasy: true,
  blurb: 'Шаблонное фэнтези: рыцари, эльфы, гномы, орки и Святой Престол, который вас не одобряет. Посередине — ваша Башня.',
  regions: [VEL], regimes: ['lich', 'archmage', 'warlock'], titles: ['Архимаг'],
  intro: '',
  aid: [['kingdom', 60, 4], ['orcs', 60, 4], ['dwarves', 62, 3], ['elves', 65, 4]],
  vars: { mast: 'ВЕСТНИК БАШНИ', blame: 'паладины и вредители', student_meme: '', swim_ref: '', rebel_icon: 'подмётный свиток', friendly_paper: 'гномьем листке', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' },
  defaultNames: { [VEL]: RM_NAMES.archmage },
};
const REALM_SETUP = {
  world: 'dark', era: REALM, region: VEL, regime: 'archmage', name: RM_NAMES.archmage, title: 'Архимаг', country: REGIONS[VEL].country, diff: 'normal',
  look: { ...REGIME_SETUP_LOOK[VEL].archmage },
};

// ---------- слова ----------
const ROLES_R = {
  defense: { title: 'Магистр войны', action: 'Смотр боевых магов', actionDesc: 'Фейерверк, оркестр, три обгоревших знамени. Армия довольна.' },
  economy: { title: 'Казначей-алхимик', action: 'Хозяйственное чудо', actionDesc: 'План, графики, реторты. Хозяйство растёт, если ничего не взорвётся.' },
  police: { title: 'Глава Ока Башни', action: 'Ночь хрустальных шаров', actionDesc: 'Прорицатели находят недовольных раньше, чем те успевают стать недовольными.' },
  propaganda: { title: 'Главный иллюзионист', action: 'Кампания «Отец чудес»', actionDesc: 'Над столицей три дня висит ваш портрет высотой с Башню. Поддержка растёт, пока не пойдёт дождь.' },
  foreign: { title: 'Магистр порталов', action: 'Посольское турне', actionDesc: 'Пять столиц за день. Багаж прибывает на следующей неделе.' },
};
const ADV_TEXT_R = {
  defense: 'Смотр удался. Сгорела только трибуна для почётных гостей, и гостей на ней почти не было.',
  economy: 'Чудо запущено. Казначей уверяет, что на этот раз формула сходится.',
  police: 'Прорицатели указали на сорок человек. Тридцать девять действительно что-то замышляли. Сороковой задумался после ареста.',
  propaganda: 'Ваш портрет высотой с Башню провисел над городом три дня. Голуби в восторге.',
  foreign: 'Турне завершено. Магистр порталов вернулся почти весь.',
};
for (const [k, n] of Object.entries({ army: 'Боевые маги', police: 'Око Башни', health: 'Лекари и зелья', edu: 'Академия', subsidy: 'Хлеб для бездарных', infra: 'Дороги и порталы', media: 'Иллюзионы и глашатаи', palace: 'Нужды Башни', popTax: 'Подать с бездарных', corpTax: 'Сбор с гильдий', duty: 'Пошлина на вывоз зелий' })) {
  const d = [...SLIDERS.spend, ...SLIDERS.tax].find(x => x.k === k);
  d.name = typeof d.name === 'string' ? { def: d.name, realm: n } : { ...d.name, realm: n };
}
const _eraLookR = Game.eraLook;
Game.eraLook = function () {
  _eraLookR.call(Game);
  if (!isRealm()) return;
  for (const r of Object.keys(ROLES_R)) Object.assign(ROLES[r], ROLES_R[r]);
  Object.assign(STAT_NAMES, { swiss: 'Тайник у гномов', economy: 'Хозяйство', army: 'Войско' });
  SLIDERS.spend.find(d => d.k === 'palace').hint = 'Уходит в ваш тайник в гномьем банке; народ ворчит';
};
const _bankR = Game.bank;
Game.bank = function () { return isRealm() ? { name: 'Тайник у гномов', short: 'Тайник', to: 'Каз-Дурим', at: 'в Каз-Дуриме', acc: 'ваш тайник в гномьем банке', ins: 'тайником у гномов', dat: 'тайнику у гномов' } : _bankR.call(Game); };
const TR = [
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'Светлый союз и Тёмные земли воюют третью эпоху подряд, и оба считают вас союзником. Дружба с соседом приносит дары каждый квартал, если отношения выше 60. Сосед напротив это запомнит.'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ваш малый круг. Лояльность ниже 25 — и магистр может предать. Изгнанного заменит родственник: предан, но колдует по самоучителю.'],
  ['предан, но не слишком умён', 'предан, но колдует по самоучителю'],
  ['Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!', 'Казна почти пуста. Алхимики клянутся, что золото вот-вот получится. Клянутся с прошлой эпохи.'],
  ['Офицеры недовольны. Поднимите бюджет армии или устройте парад.', 'Боевые маги недовольны. Поднимите им содержание или устройте смотр с фейерверком.'],
  ['Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!', 'Бездарные ворчат. Хлеб, зрелища, моя иллюзия с драконом — что-нибудь!'],
  ['Риск переворота', 'Риск заговора'], ['Риск революции', 'Риск бунта'],
  ['Казна в минусе! Армии задерживают жалованье, банки требуют проценты.', 'Казна в минусе! Боевым магам задерживают жалованье, гномы требуют проценты. Гномы всегда требуют проценты.'],
  ['Счёт в Швейцарии', 'Тайник у гномов'],
  ['пришёл к власти. Режим:', 'воссел в Башне. Кто таков:'],
  ['Подарить виллу', 'Подарить башенку'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с силами, указы, визиты, поручения магистрам, изыскания в магии и дела в совете'],
  ['Проекты и указы — на вкладке «Указы».', 'Указы — на вкладке «Указы», ваше личное величие — на вкладке «Развитие магии».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Войско ниже 45 и злые боевые маги — к заговору. Народ ниже 30 и сильные бездарные — к бунту с вилами.'],
  ['Деньги «нужд дворца» уходят на', 'Деньги «нужд Башни» уходят в'],
  ['>Новый режим<', '>Новая сила<'], ['★ Оценка историков', '★ Оценка летописцев'],
  ['Ночью во дворце зазвонил телефон', 'Ночью в Башне задребезжал хрустальный шар'],
  ['во дворце, без приглашения', 'в Башне, без приглашения'],
  ['в посольстве недовольны', 'их посол недоволен'],
  ['Ваши министры. Лояльность ниже 25 — и министр может вас сдать.', 'Ваш малый круг. Лояльность ниже 25 — и магистр может предать.'],
  ['Сделать лидера министром', 'Взять лидера в малый круг'], ['министерский пост', 'место в малом круге'], ['Новый министр', 'Новый магистр'], ['новый министр', 'новый магистр'], ['Места в правительстве', 'Места при Башне'], ['места в правительстве', 'места при Башне'],
  ['Перевести 15 млн в личный фонд', 'Перевести 15 млн в тайник у гномов'], ['Цюрих. На случай, если придётся уходить. Шанс огласки 20%.', 'Каз-Дурим, ячейка без имени. На случай, если придётся уходить через портал. Шанс огласки 20%.'],
  ['получил конверт. Вопросов он не задал.', 'получает мешочек. Мешочек приятно звякнул.'],
];
const _varsR = Game.vars;
Game.vars = function () { const v = _varsR.call(Game); if (isRealm()) v.addr = S.regime === 'lich' ? 'ваше бессмертие' : S.regime === 'warlock' ? 'ваша тёмность' : 'ваше могущество'; return v; };
const _renderR = UI.render;
UI.render = function () {
  _renderR.call(UI);
  if (!isRealm()) return;
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; };
  set('cabinet', 'Башня'); set('factions', 'Силы'); set('decrees', 'Указы'); set('world', 'Соседи'); set('advisors', 'Малый круг'); set('log', 'Летопись');
  const cb = document.querySelector('.tabs button[data-tab="council"]'); if (cb) cb.classList.toggle('alert', Game.rmVotes() < 3);
};
const DIFF_R = { easy: ['Ученик', 'Три приказа в квартал, больше золота, совет снисходителен.'], normal: ['Мэтр', 'Два приказа в квартал. Всё как в жизни, только с драконами.'], hard: ['Гроссмейстер', 'Мало золота, изыскания срываются чаще, малый круг ненадёжен. Итог ×1,4.'] };
const _renderSetupR = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupR.call(UI);
  if (!UI.setup || UI.setup.era !== REALM) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')], go = document.querySelector('#btn-begin');
  root.querySelector('h1').textContent = 'Свиток первый: Магократия';
  ['Эпоха', '1. Держава', '2. Кто вы', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Титул';
  go.textContent = 'Взойти на Башню';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = 'Магократия Велентар · 703–712 годы от Основания Башни';
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_R[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const st = UI.setup, inp = document.querySelector('#setup-name');
  if (Object.values(RM_NAMES).includes(st.name) && st.name !== RM_NAMES[st.regime]) { st.name = RM_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};

// ============================================================
// РАЗВИТИЕ МАГИИ: шесть школ, пять кругов в каждой
// ============================================================
const SCHOOLS = {
  fire: { name: 'Огонь', icon: '🔥', what: 'Школа разрушения. Решает любой вопрос, если вопрос горит.', per: 'войско +0,3 за круг', spell: ['Огненный смотр', 'Показать соседям, что бывает. Иногда показывается и своим.', { army: 8, fear: 6, rel: { church: -3, kingdom: -3 } }], cap: 'Повелитель Пламени: заговорщики думают дважды, прежде чем подойти на расстояние шара.' },
  illusion: { name: 'Иллюзия', icon: '🎭', what: 'Школа того, чего нет. Основа государственного управления.', per: 'поддержка +0,25 за круг', spell: ['Великий морок', 'Народ неделю видит полные амбары и довольного себя.', { support: 9, fear: -2 }], cap: 'Мастер Мороков: народ доволен, даже когда недоволен. Особенно тогда.' },
  sight: { name: 'Прорицание', icon: '🔮', what: 'Школа знания наперёд. Портит все сюрпризы, включая приятные.', per: 'риск заговора −0,6% за круг', spell: ['Прозреть заговор', 'Увидеть, кто что замышляет. Замышляют, как обычно, все.', { fear: 4, flag: { coupBonus: 0 }, rmCouncilAll: 4 }], cap: 'Всевидящий: вы знаете, чем кончится правление. Спойлер портит удовольствие.' },
  necro: { name: 'Некромантия', icon: '💀', what: 'Школа второго шанса. Мёртвые не просят жалованья и не бастуют.', per: 'хозяйство +0,3 и поддержка −0,1 за круг', spell: ['Поднять бригаду', 'Тысяча скелетов выходит в поле. Урожай собран, аппетит у живых пропал.', { economy: 5, support: -4, rel: { church: -8 } }], cap: 'Владыка Костей: хозяйство работает круглосуточно. Профсоюз мёртвых пока не создан.' },
  summon: { name: 'Призыв', icon: '😈', what: 'Школа договоров с Теми, Кто Снаружи. Читайте мелкий шрифт.', per: 'казна +1 за круг; иногда что-то вырывается', spell: ['Золото из Бездны', 'Мешок золота по первому требованию. Требования Бездны придут позже.', { treasury: 25 }], cap: 'Хозяин Врат: демоны стучатся, прежде чем войти. Почти всегда.' },
  alch: { name: 'Алхимия', icon: '⚗️', what: 'Школа превращений. Свинец в золото, золото в налоги.', per: 'казна +1,2 за круг', spell: ['Пробный философский камень', 'Ведро свинца, один камень, немного удачи.', { treasury: 15, economy: 2 }], cap: 'Великий Трансмутатор: золото получается. Гномы в панике: курс падает.' },
};
const RM_RANKS = [[0, 'Недоучка у власти'], [6, 'Знаток'], [12, 'Магистр'], [18, 'Гроссмейстер'], [24, 'Почти божество'], [30, 'Божество (со слов самого)']];
const MISHAPS = {
  fire: 'Опыт удался наполовину: загорелось, но не то. Восточное крыло Башни проветривается.',
  illusion: 'Иллюзия вышла убедительной. Настолько, что вы три дня искали дверь, которой нет.',
  sight: 'Вы заглянули в будущее и увидели себя, заглядывающего в будущее. Голова болит до сих пор.',
  necro: 'Подняли не того. Прадед казначея требует вернуть ему должность и пересчитать казну.',
  summon: 'Пришёл не тот, кого звали. Пришлось угощать, извиняться и подписать бумагу, не читая.',
  alch: 'Свинец превратился в нечто. Нечто уползло. Лабораторию опечатали до выяснения.',
};
Object.assign(Game, {
  rm() {
    if (!S.rm) {
      const sch = Object.fromEntries(Object.keys(SCHOOLS).map(k => [k, S.regime === 'archmage' ? 1 : 0]));
      if (S.regime === 'lich') sch.necro = 3; if (S.regime === 'warlock') sch.summon = 3;
      const base = S.regime === 'archmage' ? 62 : S.regime === 'lich' ? 54 : 52;
      S.rm = { sch, spellAt: {}, tryAt: {}, ranks: {}, debt: S.regime === 'warlock' ? 20 : 0, voteAt: -9, dueAt: -9,
        council: Object.fromEntries(Object.keys(MAGI).map(k => [k, { l: clamp(base + rnd(-6, 6) + (S.regime === 'lich' && k === 'necro' ? 20 : 0) + (S.regime === 'warlock' && k === 'summon' ? 20 : 0)), toad: false, heir: false }])) };
    }
    return S.rm;
  },
  rmTotal() { return Object.values(Game.rm().sch).reduce((a, b) => a + b, 0); },
  rmRank() { const t = Game.rmTotal(); return RM_RANKS.filter(([n]) => t >= n).pop(); },
  rmCost(k) { return 8 + 6 * Game.rm().sch[k]; },
  rmChance(k) { const R = Game.rm(), l = R.sch[k]; return clamp(0.85 - l * 0.11 + (S.regime === 'archmage' ? 0.1 : 0) + (S.regime === 'lich' && k === 'necro' ? 0.15 : 0) + (S.regime === 'warlock' && k === 'summon' ? 0.15 : 0) + (R.council[k].l >= 60 && !R.council[k].toad ? 0.08 : 0) - (S.diff === 'hard' ? 0.08 : 0), 0.2, 0.92); },
  rmWhy(k) { const R = Game.rm(); if (R.sch[k] >= 5) return 'высший круг достигнут'; if (R.tryAt[k] === S.turn) return 'в этом квартале уже пробовали'; if (S.treasury < Game.rmCost(k)) return `нужно ${Game.rmCost(k)} млн`; return ''; },
  // Изыскание: попытка подняться на круг в школе
  rmStudy(k) {
    const R = Game.rm(), D = SCHOOLS[k];
    if (!D || Game.rmWhy(k) || !Game.spend()) return null;
    const cost = Game.rmCost(k), ok = Math.random() < Game.rmChance(k), M = R.council[k];
    R.tryAt[k] = S.turn;
    let fx = { treasury: -cost }, text;
    if (ok) {
      R.sch[k]++;
      const lv = R.sch[k];
      text = `${D.name}: вы взошли на ${['', 'первый', 'второй', 'третий', 'четвёртый', 'пятый'][lv]} круг.` + (lv === 3 ? ` Открыто заклинание «${D.spell[0]}».` : lv === 5 ? ` ${D.cap}` : '');
      if (!M.toad) { const d = lv >= 4 ? -9 : 3; M.l = clamp(M.l + d); text += d < 0 ? ` ${MAGI[k].short} ревнует: вы лезете в его школу слишком глубоко.` : ` ${MAGI[k].short} польщён интересом к своей науке.`; }
      fx = Game.mergeFxD(fx, lv === 5 ? { support: 2, fear: 4 } : { fear: 1 });
    } else { text = `${D.name}: ${MISHAPS[k]}`; fx = Game.mergeFxD(fx, { support: -1 }); }
    const changes = Game.apply(fx);
    Game.log(text); Game.rmCheckRank();
    return { text, changes };
  },
  rmSpellWhy(k) { const R = Game.rm(); if (R.sch[k] < 3) return 'нужен третий круг'; const left = 6 - (S.turn - (R.spellAt[k] === undefined ? -9 : R.spellAt[k])); return left > 0 ? `силы восстановятся через ${left} кв.` : ''; },
  rmCast(k) {
    const R = Game.rm(), D = SCHOOLS[k];
    if (!D || Game.rmSpellWhy(k) || !Game.spend()) return null;
    R.spellAt[k] = S.turn;
    let fx = { ...D.spell[2] }, text = `«${D.spell[0]}». `;
    const lv = R.sch[k], bad = Math.random() < (k === 'summon' ? 0.3 : k === 'alch' ? 0.2 : k === 'fire' ? 0.15 : 0) - (lv - 3) * 0.06;
    if (bad) { fx = Game.mergeFxD(fx, { summon: { support: -6, economy: -3 }, alch: { economy: -3, treasury: -8 }, fire: { support: -4, economy: -2 } }[k]); text += { summon: 'Золото пришло. С ним пришёл провожатый и остался.', alch: 'Камень сработал, потом сработал ещё раз, уже без спроса. Лаборатории больше нет.', fire: 'Смотр удался сверх плана: сгорел рынок.' }[k]; }
    else text += { fire: 'Соседи впечатлены. Свои тоже.', illusion: 'Амбары полны, по крайней мере на вид.', sight: 'Заговорщики обнаружили, что вы поздоровались с ними по именам.', necro: 'Урожай собран. Скелеты сложены в сарай до весны.', summon: 'Мешок доставлен. Расписку вы подписали, не читая.', alch: 'Получилось золото. Настоящее. Казначей плачет.' }[k];
    if (k === 'summon' && S.regime === 'warlock') R.debt = clamp(R.debt + 8);
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  rmCheckRank() { const R = Game.rm(), t = Game.rmTotal(); for (const [n, name] of RM_RANKS) if (n && t >= n && !R.ranks[n]) { R.ranks[n] = S.turn; R.pendingRank = [n, name]; } },
  rmRankScene() {
    const R = Game.rm();
    if (!R.pendingRank) return null;
    const [n, name] = R.pendingRank; R.pendingRank = null;
    return {
      title: `Новый титул: ${name}`, bg: 'palace',
      lines: [
        ['propaganda', `Поздравляю, {addr}! Отныне вы — «${name}». Я уже заказал новые портреты. Старые перекрасим: там только подпись сменить и добавить сияния.`],
        ['police', n >= 18 ? 'Совет смотрит на ваши успехи без радости. Раньше они считали вас первым среди равных. Теперь считают круги.' : 'Совет поздравляет. Сквозь зубы, но по уставу.'],
        ['foreign', n >= 12 ? 'Соседи тоже считают. Святой Престол прислал письмо из одного слова. Слово — «гордыня».' : 'Соседи пока не заметили. Это ненадолго.'],
      ],
      choices: [
        { text: 'Скромно принять', fx: { support: 2, fear: Math.round(n / 6), rel: { church: -Math.round(n / 4) }, rmCouncilAll: -Math.round(n / 6) }, res: 'Вы сказали, что недостойны. Никто не возразил, и это вас задело.' },
        { text: 'Устроить торжество', req: S => S.treasury >= 8, reqText: 'нужно 8 млн', fx: { treasury: -8, support: 4, fear: Math.round(n / 6), rel: { church: -Math.round(n / 3) }, rmCouncilAll: -Math.round(n / 4) }, res: 'Три дня фейерверков. Ваше имя написано в небе огненными буквами. С ошибкой, но издалека не видно.' },
      ],
      after: () => null,
    };
  },
  // Долг варлока
  rmDebtAsk(what) {
    const R = Game.rm();
    if (S.regime !== 'warlock' || !Game.spend()) return null;
    R.debt = clamp(R.debt + 22);
    let fx, text;
    if (what === 'gold') { fx = { treasury: 30 }; text = 'Покровитель прислал золото. В мешке была записка: «Запомнил».'; }
    else { const k = Object.keys(R.sch).filter(x => R.sch[x] < 5).sort((a, b) => R.sch[a] - R.sch[b])[0]; if (!k) return null; R.sch[k]++; fx = { fear: 2 }; text = `Покровитель шепнул вам то, чему в Башне учат десять лет. ${SCHOOLS[k].name}: круг ${R.sch[k]}. Шёпот был недешёвым.`; Game.rmCheckRank(); }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  rmDueScene() {
    const R = Game.rm();
    if (S.regime !== 'warlock' || R.debt < 100 || S.turn - R.dueAt < 4) return null;
    R.dueAt = S.turn;
    return {
      title: 'Срок платежа', bg: 'night', crisis: true,
      lines: [
        ['npc:demon', 'Добрый вечер. Я по поводу задолженности. Нет-нет, не вставайте, я ненадолго: только забрать причитающееся.'],
        ['npc:demon', 'Варианты у нас гибкие. Душа советника, благополучие подданных или ваша собственная. Последнее — с хорошей скидкой за самовывоз.'],
        ['police', 'Я это предвидела, {addr}. И то, что вы меня не послушаете, тоже.'],
      ],
      choices: [
        { text: 'Отдать душу казначея', fx: { fac: { oligarchs: { a: -8 } }, rmDebt: -55, rmKill: 'economy' }, res: 'Казначей исчез вместе с креслом. В ведомости напротив его имени появилась пометка «переведён».' },
        { text: 'Расплатиться благополучием подданных', fx: { support: -14, economy: -6, rmDebt: -50 }, res: 'Три года неурожая, уложенные в один вечер. Народ не знает, за что. Вы знаете.' },
        { text: 'Оспорить договор', adv: ['foreign'], chance: () => clamp(0.15 + Game.rm().sch.summon * 0.11, 0.15, 0.7),
          win: { fx: { fear: 6, rmDebt: -100 }, res: 'Вы нашли в договоре запятую не на месте. Демон побледнел, насколько это возможно, и откланялся. Долг списан.' },
          lose: { fx: { end: 'claimed' }, res: 'Демон вздохнул и достал второй экземпляр. С вашей подписью. Кровью.' } },
      ],
      after: () => { const k = Game.rm().kill; if (k) { Game.rm().kill = null; Game.fireAdvisor(k); } return darkEnd(); },
    };
  },
});

// ============================================================
// СОВЕТ МАГОВ: шесть кресел, шесть школ, шесть характеров
// ============================================================
const MAGI = {
  fire: { name: 'Игнациус Пеплобород', short: 'Игнациус', bio: 'Глава школы Огня. Дважды сжигал собственную кафедру. Второй раз — нарочно, чтобы доказать, что первый был случайностью.', patron: 'hawks', look: LR({ face: 'square', hair: 'short', hairColor: '#8a3a1a', beard: 'full', mustache: 'thick', brows: 'angry', ...RM_ROBE('#7a2a1a') }) },
  illusion: { name: 'Мирабелла Двуликая', short: 'Мирабелла', bio: 'Глава школы Иллюзии. Никто не уверен, что она действительно ходит на заседания. Голосует при этом исправно.', patron: 'liberals', look: LR({ face: 'oval', hair: 'long', hairColor: '#6a3a6a', earring: true, mouth: 'smirk', ...RM_ROBE('#6a3a6a', { hat: 'circlet', gem: '#e08ad0' }) }) },
  sight: { name: 'Орвин Незрячий', short: 'Орвин', bio: 'Глава школы Прорицания. Знает, чем кончится каждое заседание, и всё равно приходит: говорит, ради буфета.', patron: 'faith', look: LR({ face: 'long', hair: 'long', hairColor: '#d8d8d8', beard: 'full', eyes: 'sleepy', ...RM_ROBE('#2a2a4a') }) },
  necro: { name: 'Мортимер Грай', short: 'Мортимер', bio: 'Глава школы Некромантии. Трижды умирал. Дважды — по собственному желанию, один раз — по недосмотру ассистента.', patron: 'left', look: { ...RM_LICH, skin: '#c9cfc0', face: 'long', brows: 'normal', glasses: 'round', ...RM_COWL('#22202a', { hat: 'none' }) } },
  summon: { name: 'Зебулон Кривой Договор', short: 'Зебулон', bio: 'Глава школы Призыва. Задолжал Тем, Кто Снаружи, столько, что они заинтересованы в его долголетии.', patron: 'new', look: LR({ skin: SKIN.tan, face: 'oval', hair: 'slick', hairColor: '#1a1410', beard: 'goatee', mustache: 'pencil', brows: 'angry', mouth: 'smirk', ...RM_COWL('#2a1a22', { trim: '#a8242a' }) }) },
  alch: { name: 'Гортензия Ртуть', short: 'Гортензия', bio: 'Глава школы Алхимии и богатейшая женщина Магократии. Её золото настоящее. Проверять не советуют.', patron: 'oligarchs', look: LR({ face: 'round', hair: 'bun', hairColor: '#b89a5a', glasses: 'round', earring: true, ...RM_ROBE('#4a4a30', { hat: 'none' }) }) },
};
Object.assign(Game, {
  rmVotes() { return Object.values(Game.rm().council).filter(m => m.toad || m.l >= 50).length; },
  rmToads() { return Object.values(Game.rm().council).filter(m => m.toad).length; },
  rmCouncilActions(k) {
    const R = Game.rm(), M = R.council[k];
    if (M.toad) return [];
    const m = id => Game.dealInfo(`rmc:${id}:${k}`).mult, r = (v, id) => Math.max(1, Math.round(v * m(id)));
    const tr = Math.max(R.sch.illusion, R.sch.alch);
    return [
      { id: 'flatter', name: 'Польстить', cost: '', ok: true, fx: { rmMage: [k, r(6, 'flatter')] } },
      { id: 'chair', name: 'Даровать башенку', cost: '−8 млн', ok: S.treasury >= 8, fx: { treasury: -8, rmMage: [k, r(13, 'chair')] } },
      { id: 'dare', name: 'Поручить опасный опыт', cost: '', ok: !M.heir, danger: true, odds: 0.45, fx: {}, win: { rmHeir: k, fear: 2 }, lose: { rmMage: [k, -18], rmCouncilAll: -3 } },
      { id: 'toad', name: 'Превратить в жабу', cost: tr < 3 ? 'нужна Иллюзия или Алхимия 3' : Game.rmToads() >= 2 ? 'две жабы уже есть' : '', ok: tr >= 3 && Game.rmToads() < 2, danger: true, fx: { fear: 7, support: -2, rmToad: k, rmCouncilAll: -7 } },
    ];
  },
  rmCouncilAction(k, id) {
    const a = Game.rmCouncilActions(k).find(x => x.id === id), D = MAGI[k];
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = { ...a.fx }, ok = true;
    if (a.odds !== undefined) { ok = Math.random() < a.odds; fx = Game.mergeFxD(fx, ok ? a.win : a.lose); }
    const text = `${D.short}: ` + { flatter: 'вы час хвалили его последний трактат. Он почти поверил, что вы его читали.', chair: 'новая башенка с видом на чужие башенки. Благодарность продлится до следующего заседания.',
      dare: ok ? 'опыт прошёл блестяще, если не считать исхода. Кресло занял его ученик: молодой, благодарный и очень осторожный.' : 'опыт он пережил. И понял, зачем его туда послали.',
      toad: 'теперь он жаба. По уставу кресло за ним сохраняется, а кваканье засчитывается как голос «за». Остальные члены совета пересели подальше от вас.' }[id];
    const changes = Game.apply(fx);
    Game.noteDeal(`rmc:${id}:${k}`);
    Game.log(text);
    return { text, changes };
  },
  rmQuarter(rep) {
    const R = Game.rm(), sc = R.sch;
    for (const [k, M] of Object.entries(R.council)) { if (M.toad) continue; const pf = S.fac[MAGI[k].patron]; M.l = clamp(M.l + ((pf ? pf.a : 50) - M.l) * 0.07 - 0.3 + rnd(-1.2, 1.2)); }
    S.army = clamp(S.army + sc.fire * 0.3); S.support = clamp(S.support + sc.illusion * 0.25 - sc.necro * 0.1); S.economy = clamp(S.economy + sc.necro * 0.3);
    const v = Game.rmVotes();
    if (v >= 4) S.fac.faith.a = clamp(S.fac.faith.a + 0.4);
    else if (v < 3) { S.treasury -= 2; S.fac.faith.a = clamp(S.fac.faith.a - 0.8); rep.warn.push(`Совет магов: за вас ${v} кресел из шести. Сметы не утверждают, указы «изучают». Ещё немного — и поставят вопрос о доверии.`); }
    if (sc.summon && Math.random() < sc.summon * 0.015) { S.support = clamp(S.support - 3); S.economy = clamp(S.economy - 1); rep.warn.push(pick(['Из подвала Башни вырвалось нечто с щупальцами. Съело коровник и ушло в лес. Круг призывателей называет это «рабочим моментом».', 'Мелкий бес сбежал из пентаграммы и неделю подделывал накладные на рынке. Торговцы недосчитались всего.']) ); }
    if (S.regime === 'warlock') { R.debt = clamp(R.debt + 1.5); if (R.debt >= 70) rep.warn.push(`Долг перед Покровителем: ${Math.round(R.debt)} из 100. В зеркалах стали попадаться чужие отражения. Они смотрят на часы.`); }
    if (S.regime === 'lich' && S.turn % 4 === 0) rep.lines.push(pick(['Вы снова не постарели. Малый круг вежливо завидует.', 'Очередной год не оставил на вас следов. Следы остались на придворном живописце: он рисует вас в четырёхсотый раз.']));
  },
  // Вотум недоверия
  rmVoteScene() {
    const R = Game.rm(), v = Game.rmVotes();
    if (v >= 3 || S.turn < 8 || S.turn - R.voteAt < 6) return null;
    R.voteAt = S.turn;
    const foe = Object.keys(R.council).filter(k => !R.council[k].toad).sort((a, b) => R.council[a].l - R.council[b].l)[0], F = MAGI[foe];
    return {
      title: 'Вопрос о доверии', bg: 'palace', crisis: true,
      lines: [
        ['npc:' + foe, 'Совет вынужден констатировать, что нынешний глава Башни утратил доверие большинства. Согласно параграфу девятому устава, прошу сдать посох, ключи и казённую мантию.'],
        ['police', `За вас ${v} из шести, {addr}. Жабы голосуют как надо, но их, к сожалению, мало.`],
        ['defense', 'Параграф девятый допускает поединок. Я просто напоминаю. Мне нравится параграф девятый.'],
      ],
      choices: [
        { text: 'Произнести речь', chance: () => clamp(0.2 + S.support / 180 + Game.rm().sch.illusion * 0.05, 0.15, 0.8),
          win: { fx: { rmCouncilAll: 12, support: 2 }, res: 'Вы говорили два часа. К концу совет не помнил, с чего начал, и проголосовал за перерыв. Навсегда.' },
          lose: { fx: { end: 'deposed' }, res: 'Вы говорили два часа. Совет дослушал, поблагодарил и проголосовал.' } },
        { text: 'Раздать башенки всем', req: S => S.treasury >= 26, reqText: 'нужно 26 млн', fx: { treasury: -26, rmCouncilAll: 14 }, res: 'Шесть новых башенок. Вопрос о доверии снят с повестки как «утративший актуальность». Архитекторы в восторге.' },
        { text: `Вызвать на поединок: ${F.short}`, adv: ['defense'], chance: () => clamp(0.3 + Game.rm().sch.fire * 0.09 + Game.rm().sch.necro * 0.03 + (S.regime === 'lich' ? 0.12 : 0), 0.25, 0.85),
          win: { fx: { fear: 10, support: -2, rmHeir: foe, rmCouncilAll: 8 }, res: `Поединок длился одиннадцать секунд. ${F.short} теперь занимает в совете значительно меньше места: урну поставили на его кресло из уважения. Его преемник голосует очень быстро.` },
          lose: { fx: { end: 'deposed' }, res: `Поединок длился одиннадцать секунд. ${F.short} помог вам подняться и вежливо напомнил о посохе.` } },
      ],
      after: darkEnd,
    };
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isRealm()) return;
  Game.eraLook(); Game.rm();
  S.fac.new = S.fac.new || { s: 36, a: 45, st: 'legal' };
  Object.assign(S.fac.new, { s: 36, a: S.regime === 'warlock' ? 68 : S.regime === 'lich' ? 52 : 40 });
  S.fac.left.s = 34; S.fac.liberals.s = 24; S.fac.faith.s = 40; S.fac.hawks.s = 40; S.fac.oligarchs.s = 36;
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isRealm()) return;
  const R = Game.rm(), add = (d, label, icon) => { if (Math.round(d)) ch.push({ k: 'fs', d: Math.round(d), label, icon }); };
  if (fx.rmMage) { const [k, d] = fx.rmMage, M = R.council[k]; if (M && !M.toad) { const b = M.l; M.l = clamp(M.l + d); add(M.l - b, `Совет: ${MAGI[k].short}`, '🧙'); } }
  if (fx.rmCouncilAll) { for (const M of Object.values(R.council)) if (!M.toad) M.l = clamp(M.l + fx.rmCouncilAll); add(fx.rmCouncilAll, 'Совет магов', '🧙'); }
  if (fx.rmToad) { R.council[fx.rmToad].toad = true; ch.push({ k: 'fs', d: 1, label: 'Жаб в совете', icon: '🐸' }); }
  if (fx.rmHeir) { const M = R.council[fx.rmHeir]; M.heir = true; M.l = clamp(64 + rnd(-4, 6)); ch.push({ k: 'fs', d: 1, label: `Кресло занял ученик: ${SCHOOLS[fx.rmHeir].name}`, icon: '🧙' }); }
  if (fx.rmDebt) { const b = R.debt; R.debt = clamp(R.debt + fx.rmDebt); add(-(R.debt - b), 'Долг погашен', '😈'); }
  if (fx.rmSchool) { const [k, d] = fx.rmSchool; R.sch[k] = clamp(R.sch[k] + d, 0, 5); add(d, `Круг: ${SCHOOLS[k].name}`, SCHOOLS[k].icon); Game.rmCheckRank(); }
  if (fx.rmKill) R.kill = fx.rmKill;
});
Game.previewHooks.push((fx, out) => {
  if (!isRealm()) return;
  const first = [];
  if (fx.rmMage) first.push({ icon: '🧙', d: fx.rmMage[1], label: MAGI[fx.rmMage[0]].short, text: `${MAGI[fx.rmMage[0]].short} ${sign(fx.rmMage[1])}` });
  if (fx.rmCouncilAll) first.push({ icon: '🧙', d: fx.rmCouncilAll, label: 'Совет магов', text: `весь совет ${sign(fx.rmCouncilAll)}` });
  if (fx.rmToad) first.push({ icon: '🐸', d: 1, label: 'Жаба', text: 'вечный голос «за»' });
  if (fx.rmHeir) first.push({ icon: '🧙', d: 1, label: 'Ученик', text: 'кресло займёт послушный ученик' });
  if (fx.rmDebt) first.push({ icon: '😈', d: -fx.rmDebt, label: 'Долг', text: `долг ${sign(fx.rmDebt)}` });
  if (fx.rmSchool) first.push({ icon: SCHOOLS[fx.rmSchool[0]].icon, d: fx.rmSchool[1], label: 'Круг', text: `${SCHOOLS[fx.rmSchool[0]].name}: круг ${sign(fx.rmSchool[1])}` });
  if (fx.rmKill) first.push({ icon: '😈', d: -1, label: 'Советник', text: 'советника заберут' });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => { if (!isRealm()) return; Game.rmQuarter(rep); rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l)); });
Game.incomeHooks.push(() => (isRealm() ? { label: 'Плата за погоду, предсказания и порталы', v: 9 } : null));
Game.incomeHooks.push(() => { if (!isRealm()) return null; const s = Game.rm().sch, v = Math.round((s.summon * 1 + s.alch * 1.2) * 10) / 10; return v ? { label: 'Золото из реторт и из Бездны', v } : null; });
Game.coupHooks.push(() => { if (!isRealm()) return 0; const R = Game.rm(); return -R.sch.sight * 0.006 - (R.sch.fire >= 5 ? 0.02 : 0) - (S.regime === 'lich' ? 0.015 : 0) + Math.max(0, 3 - Game.rmVotes()) * 0.012; });
Game.forcedList.push(() => (isRealm() && !S.over ? Game.rmRankScene() : null));
Game.forcedList.push(() => (isRealm() && !S.over ? Game.rmVoteScene() : null));
Game.forcedList.push(() => (isRealm() && !S.over ? Game.rmDueScene() : null));
const _blocR = Game.bloc;
Game.bloc = function () { if (!isRealm()) return _blocR.call(Game); const w = ((S.rel.kingdom || 0) + (S.rel.elves || 0) + (S.rel.church || 0)) / 3, e = S.rel.orcs || 0; return w - e > 15 ? 'Друг Светлого союза' : e - w > 15 ? 'Друг Тёмных земель' : 'Башня сама по себе'; };

// ---------- сцены ----------
const _introR = Game.introScene;
Game.introScene = function () {
  if (!isRealm()) return _introR ? _introR.call(Game) : null;
  const why = {
    lich: 'Прежний глава Башни скончался от старости. Вы присутствовали при его рождении и нашли это забавным. Совет избрал вас единогласно: возражавших не нашлось среди живых.',
    archmage: 'Прежний глава Башни вышел в портал за хлебом и не вернулся. Совет заседал девять дней и выбрал вас как кандидата, который меньше всех раздражает остальных.',
    warlock: 'Прежний глава Башни внезапно согласился уйти на покой. Очень внезапно, посреди фразы. Совет не понял, как вы это устроили, и решил не уточнять.',
  }[S.regime];
  const lines = [
    ['narrator', `Семишпилье, первый день ${ERAS[REALM].start} года от Основания Башни. ${why}`],
    ['narrator', 'Вокруг — мир как мир: на западе рыцари, в лесу эльфы, под горой гномы, в степи орки, а на холме Святой Престол, который считает вас ошибкой мироздания.'],
  ];
  for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
  lines.push(['police', 'В совете шесть кресел, {addr}. Без четырёх голосов править можно, но недолго. И не увлекайтесь собственным величием: на каждом круге, куда вы взойдёте, уже кто-то сидит.']);
  lines.push(['narrator', `Ваша задача — просидеть в Башне до ${Game.endYear()} года. Желательно — в прежнем облике и с тайником у гномов.`]);
  return { title: 'Первое заседание малого круга', bg: 'palace', lines };
};
const _coupR = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupR.call(Game, role);
  if (!isRealm()) return sc;
  sc.title = 'Ночь посохов';
  sc.lines = [
    ['narrator', 'Три часа ночи. Над Башней зарево: Легион Жезла строится на площади Семи Шпилей. Хрустальные шары показывают помехи.'],
    ['npc:colonel', 'Именем устава! Глава Башни низложен как утративший связь с магической реальностью. Просьба выйти без заклинаний в руках.'],
    ['police', '{Addr}, у нас минут двадцать. Я знала об этом ещё во вторник, но вы были заняты.'],
  ];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Явиться народу в виде огненного исполина'; c0.win.res = 'Исполин вышел убедительным. Легион разбежался, народ пал ниц. Иллюзионисту выписали премию.'; c0.lose.res = 'Исполин вышел полупрозрачным и заикался. Легион смеялся ещё минуту, потом вошёл.';
  c1.text = 'Поднять стражу Башни'; c1.win.res = 'Големы у ворот не спят и не берут взяток. К утру площадь была пуста.'; c1.lose.res = 'Големов кто-то выключил. Кто знал слово, тот и выключил.';
  if (c2) { if (c2.win) c2.win.res = 'Сосед прислал через портал три сотни своих. Мятежники пересчитали их и передумали. Счёт за услугу придёт позже.'; if (c2.lose) c2.lose.res = 'Сосед ответил, что это внутреннее дело Башни, и пожелал удачи.'; }
  if (c3) { c3.text = 'Уйти порталом к гномам, с казной'; c3.res = 'Портал схлопнулся за вашей спиной. В Каз-Дуриме вас ждут ячейка, счёт за хранение и очень низкие потолки.'; }
  return sc;
};
const _revR = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revR.call(Game);
  if (!isRealm()) return sc;
  sc.title = 'Бунт бездарных';
  sc.lines = [
    ['narrator', 'У подножия Башни сорок тысяч человек. У каждого вилы, факел или хотя бы мнение. Впервые за семьсот лет они заметили, что их больше.'],
    ['npc:rebel', 'Мы пришли спросить про дождь. И про подать. И про то, что стало с моим братом после «эксперимента».'],
    ['defense', 'Одним шаром я достану человек двести, {addr}. Остальных тридцать девять тысяч восемьсот это огорчит.'],
  ];
  if (sc.choices[2]) { sc.choices[2].text = 'Уйти порталом к гномам'; sc.choices[2].res = 'Портал открылся с третьей попытки. Толпа вошла в Башню и первым делом нашла кладовую.'; }
  return sc;
};
const ULT_R = {
  hawks: ['Легиону нужны жалованье, новые жезлы и поменьше советов от тех, кто ни разу не метал шар. Иначе Легион сам решит, кому сидеть в Башне.', 'Боевые маги перестали отдавать честь. Вместо этого они смотрят и прикидывают расстояние.'],
  oligarchs: ['Гильдия просит снизить сбор и убрать прорицателей из наших лавок. Иначе зелья подорожают. Все. Особенно от головы.', 'Зелья подорожали втрое. Особенно от головы. Голова болит у всей Башни.'],
  left: ['Хлеба, подать поменьше и чтоб дождь по расписанию. Иначе завтра не выйдем в поле. Вилы возьмём, а в поле не выйдем.', 'Поля стоят. Бездарные сидят на завалинках и точат вилы. Просто так, говорят, для порядка.'],
  liberals: ['Откройте Академию для всех и разрешите заклинания на живом языке. На нас смотрит весь просвещённый мир, а мы всё склоняем по-мёртвому.', 'Сто недоучек ушли из Академии и открыли собственную, в трактире. Набор у них лучше.'],
  faith: ['Хранители требуют вернуть Канону силу закона. Последние ваши указы ему не соответствуют. Мы проверили. Это заняло всего восемь лет.', 'Хранители объявили ваши указы «неканоничными». Чиновники теперь исполняют их с оговоркой и вполсилы.'],
  new: ['Круг призывателей просит подвалы побольше и поменьше вопросов. Иначе мы не ручаемся за то, что уже призвано.', 'В подвалах что-то скребётся громче обычного. Призыватели разводят руками: «Мы предупреждали».'],
};
const _facUltR = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltR.call(Game, f);
  if (!isRealm()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_R[f] || ULT_R.faith;
  sc.lines = [['narrator', `${name} поднялся в Башню без приглашения. Големы у ворот почему-то смотрели в другую сторону.`], [sp, ask], ['police', 'Откажете — ударят по больному, {addr}. Уступите — остальные решат, что на вас можно давить. Я вижу оба исхода. Оба так себе.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} уходит довольный. Остальные внимательно смотрят, что ещё можно у вас выпросить.`;
  c1.text = 'Откупиться из тайника'; c1.res = 'Мешочек был увесистым. Требование отложено до следующего раза.';
  c2.win.res = 'Его взяли на лестнице. Те, кто стоял за ним, внезапно вспомнили о срочных делах в провинции.'; c2.lose.res = 'Арест сделал из него мученика. Его лицо рисуют углём на заборах; сходство так себе, но все узнают.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayR = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayR.call(Game, role);
  if (!isRealm()) return sc;
  sc.title = 'Измена в малом круге';
  sc.lines = [['narrator', `${S.adv[role].name} ушёл порталом к вашим врагам и унёс всё, что знал. Заодно унёс серебряные ложки.`], ['narrator', 'Его место займёт родственник. Колдует он по самоучителю, зато свой.']];
  sc.choices[0].text = 'Сменить пароли и заклятия'; sc.choices[0].res = 'Пароли сменены. Ложки уже не вернуть.';
  return sc;
};

// ---------- указы ----------
const decR = (cat, d) => DECREES[cat].push({ eras: [REALM], ok: () => true, ...d });
decR('foreign', { id: 'r_fair', name: 'Ярмарка чудес', desc: 'Позвать послов всех соседей и показать им то, чего у них нет. Потом продать.', cost: '−10 млн', ok: S => S.treasury >= 10, repeat: true,
  run: (S, m) => ({ fx: { treasury: -10, economy: 1, rel: { kingdom: Math.round(5 * m), elves: Math.round(4 * m), dwarves: Math.round(5 * m), orcs: Math.round(3 * m) } }, text: 'Послы разъехались с покупками. Орочий посол купил «зелье ума» и требует вернуть деньги.' }) });
decR('foreign', { id: 'r_tribute', name: 'Десятина Святому Престолу', desc: 'Заплатить тем, кто считает вас ошибкой мироздания. Ошибкой вы останетесь, но оплаченной.', cost: '−8 млн', ok: S => S.treasury >= 8, repeat: true,
  run: (S, m) => ({ fx: { treasury: -8, rel: { church: Math.round(10 * m) }, fac: { faith: { a: -2 } } }, text: 'Первосвященник принял дар и молится о вашем вразумлении. Раньше молился об упокоении: прогресс.' }) });
decR('social', { id: 'r_rain', name: 'Дождь по расписанию', desc: 'Погодные маги работают на поля, а не на настроение наместников. Бездарные не верят своему счастью.', cost: '−12 млн', ok: S => S.treasury >= 12, repeat: true,
  run: (S, m) => ({ fx: { treasury: -12, support: Math.round(6 * m), economy: 1, fac: { left: { a: Math.round(7 * m) } } }, text: 'Дождь пошёл во вторник, как обещали. В среду тоже: погодный маг забыл выключить.' }) });
decR('social', { id: 'r_school', name: 'Грамота для бездарных', desc: 'Учить читать всех. Хранители в ужасе: человек, умеющий читать, может прочесть Канон.', cost: '', once: true,
  run: () => ({ fx: { support: 4, economy: 2, fac: { liberals: { a: 14 }, left: { a: 6 }, faith: { a: -14 } }, rmMage: ['illusion', 6] }, text: 'Открыты первые школы. Первое, что написали ученики на стене школы, цензура изучает до сих пор.' }) });
decR('social', { id: 'r_curfew', name: 'Комендантский час и заклятие тишины', desc: 'После заката на улицах только стража и то, что летает над стражей.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { fear: Math.round(9 * m), support: -4, fac: { liberals: { a: -7 }, hawks: { a: 4 } } }, text: 'В городе тихо. Заклятие тишины вышло таким сильным, что петухи тоже молчат. Все проспали.' }) });
decR('social', { id: 'r_fest', name: 'Праздник Семи Шпилей', desc: 'Фейерверки, бесплатная похлёбка, иллюзия дракона над площадью. Народ любит дракона.', cost: '−9 млн', ok: S => S.treasury >= 9, repeat: true,
  run: (S, m) => ({ fx: { treasury: -9, support: Math.round(5 * m), fear: -2 }, text: 'Праздник удался. Иллюзия дракона подожгла настоящий стог: мелочь, а запомнилось.' }) });
decR('economy', { id: 'r_golem', name: 'Големы на мануфактуры', desc: 'Глиняные работники не устают и не просят прибавки. Бездарные, которых они заменят, просят.', cost: '−16 млн', ok: S => S.treasury >= 16, once: true,
  run: () => ({ fx: { treasury: -16, economy: 6, support: -3, fac: { oligarchs: { a: 9 }, left: { a: -9 } }, rmMage: ['alch', 6] }, text: 'Мануфактуры работают круглые сутки. Големы делают ровно то, что написано в свитке. Свитки пришлось переписать четырежды.' }) });
decR('economy', { id: 'r_mana', name: 'Продать соседям кристаллы маны', desc: 'Золото сейчас, вооружённые соседи потом.', cost: '', repeat: true,
  run: (S, m) => ({ fx: { treasury: Math.round(13 * m), fac: { hawks: { a: -5 }, oligarchs: { a: 4 } }, rel: { kingdom: 3, orcs: 3 } }, text: 'Кристаллы проданы обеим сторонам вечной войны. Обе стороны остались довольны. Это настораживает.' }) });
decR('economy', { id: 'r_legion', name: 'Новые жезлы Легиону', desc: 'Боевые маги довольны, алхимики при заказе, казна легче.', cost: '−14 млн', ok: S => S.treasury >= 14, repeat: true,
  run: (S, m) => ({ fx: { treasury: -14, army: Math.round(5 * m), fac: { hawks: { a: Math.round(8 * m) }, oligarchs: { a: Math.round(4 * m) } }, rmMage: ['fire', 4] }, text: 'Жезлы розданы. На испытаниях снесли только одну башню, и ту чужую.' }) });
DEMANDS.push(
  { id: 'r_knights', countries: ['kingdom'], eras: [REALM], text: () => 'Прислать придворного мага королю', fx: () => ({ rel: { kingdom: 14 }, fac: { liberals: { a: -4 } }, rmCouncilAll: -2 }) },
  { id: 'r_trees', countries: ['elves'], eras: [REALM], text: () => 'Перестать рубить Гиблый лес на посохи', fx: () => ({ economy: -1, rel: { elves: 15 }, fac: { oligarchs: { a: -5 } } }) },
  { id: 'r_pyre', countries: ['church'], eras: [REALM], text: () => 'Выдать трёх некромантов для «беседы»', fx: () => ({ rel: { church: 16 }, fac: { new: { a: -6 }, faith: { a: 3 } }, rmMage: ['necro', -12] }) },
  { id: 'r_loan', countries: ['dwarves'], eras: [REALM], text: () => 'Вернуть проценты по займу прошлой эпохи', fx: () => ({ treasury: -9, rel: { dwarves: 14 } }) },
  { id: 'r_orcs', countries: ['orcs'], eras: [REALM], text: () => 'Продать Орде сто огненных жезлов', fx: () => ({ treasury: 8, rel: { orcs: 14, kingdom: -6, elves: -4 }, fac: { hawks: { a: -4 } } }) },
);
FAC_DEMANDS.hawks.push({ id: 'rm_duel', kind: 'pay', text: 'Разрешить дуэли на площади', fx: { support: -2, fac: { faith: { a: -4 } } }, only: [VEL] });
FAC_DEMANDS.left.push({ id: 'rm_tithe', kind: 'pay', text: 'Отменить подать на окна', fx: { treasury: -7, fac: { oligarchs: { a: -3 } } }, only: [VEL] });
FAC_DEMANDS.oligarchs.push({ id: 'rm_patent', kind: 'pay', text: 'Запретить гномам продавать поддельные амулеты', fx: { rel: { dwarves: -8 } }, only: [VEL] });
FAC_DEMANDS.liberals.push({ id: 'rm_living', kind: 'pay', text: 'Разрешить заклинания на живом языке', fx: { fac: { faith: { a: -8 } }, rmMage: ['sight', -5] }, only: [VEL] });
FAC_DEMANDS.faith.push({ id: 'rm_canon', kind: 'pay', text: 'Сжечь неканонические учебники', fx: { fac: { liberals: { a: -8 } }, economy: -1 }, only: [VEL] });

// ---------- события ----------
const RL = ['realm'];
EVENTS.push(
  { id: 'rm_dragon', title: 'Дракон на подоконнике', bg: 'office', weight: 3, eras: RL,
    lines: [['defense', '{Addr}, на северном шпиле сидит дракон. Молодой, размером с амбар. Говорит, что ему обещали здесь принцессу.'], ['foreign', 'Принцессы в Альденмарке. Дракон перепутал башни. Но если его обидеть, он расскажет старшим.']],
    choices: [
      { text: 'Нанять его в Легион', req: S => S.treasury >= 10, reqText: 'нужно 10 млн', fx: { treasury: -10, army: 7, fear: 4, rel: { kingdom: -5 }, fac: { hawks: { a: 5 } }, rmMage: ['fire', -4] }, res: 'Дракон принят на довольствие. Ест как рота. Игнациус ревнует: раньше огнём в Башне заведовал он.' },
      { text: 'Вежливо указать дорогу в Альденмарк', fx: { rel: { kingdom: -8 }, support: 1 }, res: 'Дракон поблагодарил и улетел. Через неделю король прислал счёт за башню и вопрос, кто дал адрес.' },
      { text: 'Прогнать огненным шаром', chance: () => clamp(0.3 + Game.rm().sch.fire * 0.12, 0.25, 0.9), win: { fx: { fear: 5, support: 2 }, res: 'Дракон обиделся и улетел. Шпиль слегка оплавился, но это ему идёт.' }, lose: { fx: { economy: -3, support: -3 }, res: 'Дракон удивился, чихнул и улетел. Северного шпиля у Башни больше нет: теперь их шесть, название столицы под вопросом.' } },
    ] },
  { id: 'rm_inquisitor', title: 'Гость в белом', bg: 'palace', weight: 2, eras: RL,
    lines: [['npc:inquisitor', 'Святой Престол поручил мне проверить, не занимаются ли в этой башне колдовством. Вопрос, как я вижу, риторический. Тем не менее у меня анкета на сорок страниц.'], ['police', 'Он честен, упрям и неподкупен. Худшее сочетание из возможных.']],
    choices: [
      { text: 'Заполнить анкету', fx: { rel: { church: 8 }, fac: { faith: { a: -4 } }, rmCouncilAll: -2 }, res: 'На вопрос «Продавали ли вы душу?» вы честно ответили «Не свою». Инквизитор что-то долго записывал.' },
      { text: 'Показать ему иллюзию благочестия', chance: () => clamp(0.35 + Game.rm().sch.illusion * 0.12, 0.3, 0.92), win: { fx: { rel: { church: 12 } }, res: 'Он три дня ходил по Башне и видел только библиотеки и огороды. Уехал растроганный.' }, lose: { fx: { rel: { church: -12 } }, res: 'Иллюзия мигнула как раз над пентаграммой. Он молча дописал сорок первую страницу.' } },
      { text: 'Выставить за ворота', fx: { rel: { church: -14, kingdom: -4 }, fear: 3, fac: { hawks: { a: 4 }, new: { a: 4 } } }, res: 'Инквизитор отряхнул мантию и пообещал вернуться не один. Он из тех, кто возвращается.' },
    ] },
  { id: 'rm_golem', title: 'Голем просит слова', bg: 'street', weight: 2, eras: RL,
    lines: [['economy', 'Големы на мануфактуре остановились, {addr}. Один из них выцарапал на стене слово «ЗАЧЕМ». Остальные на него смотрят.'], ['npc:apprentice', 'Я только слегка поправил ему свиток! Там было «работай», я дописал «подумав». Хотел как лучше!']],
    choices: [
      { text: 'Стереть лишнее слово', fx: { economy: 2, fac: { liberals: { a: -4 }, oligarchs: { a: 4 } } }, res: 'Големы снова работают, не думая. Гильдия довольна. Вольные чародеи говорят, что вы убили первого философа из глины.' },
      { text: 'Ответить голему', adv: ['propaganda'], fx: { economy: -1, support: 2, fac: { liberals: { a: 6 }, faith: { a: -5 } } }, res: 'Вы объясняли ему «зачем» четыре часа. Голем выслушал, кивнул и попросил выходной. Хранители требуют вашего объяснения.' },
      { text: 'Разжаловать подмастерье в бездарные', fx: { fear: 3, fac: { liberals: { a: -5 }, left: { a: -2 } } }, res: 'Подмастерье сослан в деревню. Големы работают, но слово со стены не стирается. Пробовали.' },
    ] },
  { id: 'rm_harvest', title: 'Неурожай по вине наместника', bg: 'village', weight: 3, eras: RL, cond: S => S.economy < 55,
    lines: [['npc:peasant', 'У нас три месяца ни капли, ваше... как вас там. Наместник поссорился с женой и с тех пор над округом солнце. Мы за них рады, но пшеница горит.'], ['economy', 'Погодный маг по уставу подчиняется наместнику, а не полю. Устав писали маги.']],
    choices: [
      { text: 'Прислать своего погодника', req: S => S.treasury >= 8, reqText: 'нужно 8 млн', fx: { treasury: -8, support: 5, fac: { left: { a: 7 } } }, res: 'Дождь шёл неделю. Наместник обижен, зато пшеница жива. Бездарные впервые выпили за ваше здоровье, не оглядываясь.' },
      { text: 'Помирить наместника с женой', adv: ['foreign'], chance: () => 0.5, win: { fx: { support: 4, fac: { left: { a: 5 } } }, res: 'Магистр порталов провёл с ними вечер. Наутро пошёл грибной дождь. Чета благодарит и зовёт на годовщину.' }, lose: { fx: { support: -3, economy: -2 }, res: 'После беседы над округом пошёл град. С куриное яйцо.' } },
      { text: 'Объяснить, что засуха закаляет', adv: ['propaganda'], fx: { support: -5, fac: { left: { a: -7 } } }, res: 'Иллюзионист показал им тучные нивы. Жевать иллюзию не получилось. Вилы в этом округе теперь точат по расписанию.' },
    ] },
  { id: 'rm_elves', title: 'Жалоба из леса', bg: 'office', weight: 2, eras: RL,
    lines: [['npc:elf', 'Ваши лесорубы свалили рощу, которой было девять тысяч лет. На посохи. Владычица помнит эту рощу саженцем и просила передать, что у неё хорошая память.'], ['economy', 'Без гиблодуба посох — просто палка, {addr}. А без посохов Легион — просто люди в халатах.']],
    choices: [
      { text: 'Запретить рубку', fx: { rel: { elves: 12 }, army: -2, fac: { hawks: { a: -5 }, oligarchs: { a: -4 } } }, res: 'Лесорубов отозвали. Эльфийка улыбнулась впервые за двести лет: так сказали в свите. Боевые маги чинят старые посохи бечёвкой.' },
      { text: 'Посадить девять тысяч саженцев', req: S => S.treasury >= 7, reqText: 'нужно 7 млн', fx: { treasury: -7, rel: { elves: 6 } }, res: 'Саженцы высажены. Эльфы сказали, что оценят жест через девять тысяч лет. Это у них, кажется, шутка.' },
      { text: 'Ответить, что лес ничей', fx: { rel: { elves: -12, kingdom: -3 }, fac: { hawks: { a: 3 } } }, res: 'Посланница ушла молча. Наутро все лесорубы проснулись с ослиными ушами. Эльфы уверяют, что это совпадение.' },
    ] },
  { id: 'rm_dwarfloan', title: 'Счетовод из-под горы', bg: 'office', weight: 2, eras: RL,
    lines: [['npc:dwarf', 'Каз-Дурим напоминает о займе, взятом вашей Башней четыреста лет назад на «временные нужды». С процентами это уже не заём. Это гора. Мы в них разбираемся.'], ['economy', 'Расписка настоящая. Я проверил. Потом проверил ещё раз и расстроился.']],
    choices: [
      { text: 'Платить понемногу', req: S => S.treasury >= 9, reqText: 'нужно 9 млн', fx: { treasury: -9, rel: { dwarves: 10 } }, res: 'Гном пересчитал монеты трижды, каждую попробовал на зуб и выдал расписку на расписку.' },
      { text: 'Расплатиться зельями', adv: ['economy'], fx: { rel: { dwarves: 5 }, fac: { oligarchs: { a: -5 } }, rmMage: ['alch', -5] }, res: 'Гномы взяли зельями от облысения. Спрос под горой оказался огромным. Гортензия считает, что продешевили.' },
      { text: 'Объявить заём утратившим силу за давностью', fx: { rel: { dwarves: -14 }, fac: { oligarchs: { a: -4 } } }, res: 'Гном молча свернул расписку. Ваш тайник в гномьем банке с этого дня «на проверке».' },
    ] },
  { id: 'rm_orcs', title: 'Орда у брода', bg: 'village', weight: 2, eras: RL,
    lines: [['npc:orc', 'Вождь шлёт привет и вопрос. Мы идём бить рыцарей. Дорога — через ваши поля. Пропустите миром, или мы пройдём иначе. Вождь говорит: ему всё равно, ему просто интересно.'], ['defense', 'Двадцать тысяч, {addr}. Легион справится. Поля — нет.']],
    choices: [
      { text: 'Пропустить за плату', fx: { treasury: 9, rel: { orcs: 8, kingdom: -12, elves: -4 }, support: -2 }, res: 'Орда прошла за три дня. Заплатила честно, чужим серебром. От полей осталась дорога.' },
      { text: 'Открыть им портал прямо к рыцарям', adv: ['foreign'], chance: () => 0.55, win: { fx: { rel: { orcs: 12, kingdom: -8 }, fear: 3 }, res: 'Двадцать тысяч орков вышли из портала у самых стен Альденмарка. Король до сих пор не знает, как они там оказались.' }, lose: { fx: { rel: { orcs: -10 }, support: -2 }, res: 'Портал открылся не туда. Орда второй месяц выбирается из болота и очень хочет поговорить с магистром порталов.' } },
      { text: 'Не пускать', fx: { army: -3, rel: { orcs: -12, kingdom: 8 }, fac: { hawks: { a: 5 } } }, res: 'Легион встал у брода. Орда посмотрела, почесалась и пошла в обход. Посол сказал, что вождь запомнил, и показал на пальцах, насколько.' },
    ] },
  { id: 'rm_apprentice', title: 'Метла вышла из-под контроля', bg: 'palace', weight: 2, eras: RL,
    lines: [['npc:apprentice', 'Я только хотел, чтобы она сама носила воду! Теперь их четыреста, они носят воду третий день, и нижние этажи... в общем, там теперь можно плавать.'], ['economy', 'Затоплен архив долговых расписок, {addr}. Я не говорю, что это плохо. Я говорю, что это совпадение.']],
    choices: [
      { text: 'Остановить мётлы лично', chance: () => clamp(0.4 + Game.rmTotal() * 0.03, 0.35, 0.9), win: { fx: { support: 2, rmCouncilAll: 2 }, res: 'Одно слово — и мётлы встали. Подмастерья смотрят на вас как на божество. Члены совета — как на человека, который знает лишнее слово.' }, lose: { fx: { economy: -2, support: -2 }, res: 'Мётел стало восемьсот. Воду они теперь носят быстрее.' } },
      { text: 'Пусть домоют, раз начали', fx: { economy: -1, treasury: 4 }, res: 'Башня сияет. Долговые расписки, к сожалению, нечитаемы. Казначей изображает огорчение из последних сил.' },
      { text: 'Выгнать подмастерье', fx: { fear: 2, fac: { liberals: { a: -4 } } }, res: 'Подмастерье ушёл. Мётлы ушли за ним. Теперь это его проблема и, говорят, его армия.' },
    ] },
  { id: 'rm_hero', title: 'Избранный', bg: 'square', weight: 2, eras: RL,
    lines: [['police', 'В столицу пришёл юноша с мечом, {addr}. Сирота, родинка в форме звезды, говорящий конь. Утверждает, что по пророчеству должен свергнуть тёмного властелина. Спрашивает, не вы ли это.'], ['propaganda', 'Народ таких любит. У него уже есть спутники: гном, эльфийка и вор с золотым сердцем.']],
    choices: [
      { text: 'Сказать, что тёмный властелин живёт у орков', fx: { rel: { orcs: -6 }, support: 3 }, res: 'Избранный поблагодарил и ушёл на восток. Через месяц Орда прислала гневное письмо и его коня. Конь просит убежища.' },
      { text: 'Взять его на службу', req: S => S.treasury >= 6, reqText: 'нужно 6 млн', fx: { treasury: -6, support: 5, army: 2, fac: { hawks: { a: 3 } } }, res: 'Теперь у вас есть штатный Избранный. Пророчество, правда, никто не отменял, и он иногда странно на вас смотрит.' },
      { text: 'Посадить в подвал до выяснения', fx: { fear: 4, support: -4, rel: { kingdom: -4 } }, res: 'Избранный сидит в подвале. Его спутники роют подкоп. Летописцы говорят, что именно так подобные истории и начинаются.' },
    ] },
  { id: 'rm_exam', title: 'Выпускные испытания', bg: 'palace', weight: 2, eras: RL, cond: S => S.q === 2,
    lines: [['npc:sight', 'Академия выпускает триста магов. Я заранее знаю, кто из них чего стоит. Двенадцать — таланты, сорок — толковые, остальные — чьи-то племянники. Вопрос в том, кого куда.']],
    choices: [
      { text: 'Таланты — на службу Башне', fx: { economy: 2, fac: { faith: { a: -5 }, liberals: { a: 5 } }, rmCouncilAll: -3 }, res: 'Двенадцать лучших получили должности. Совет недоволен: племянники остались без мест.' },
      { text: 'Племянников — на тёплые места', fx: { economy: -1, fac: { faith: { a: 6 } }, rmCouncilAll: 5 }, res: 'Совет растроган. Один из племянников уже поджёг архив, но по-родственному, без умысла.' },
      { text: 'Отправить всех в Легион', fx: { army: 5, fac: { hawks: { a: 7 }, liberals: { a: -6 }, oligarchs: { a: -3 } } }, res: 'Триста новобранцев. Игнациус счастлив. Гильдия алхимиков спрашивает, кто теперь будет варить зелья.' },
    ] },
  { id: 'rm_plague', title: 'Зелёная икота', bg: 'street', weight: 2, once: true, minTurn: 5, eras: RL,
    lines: [['economy', 'В нижнем городе мор, {addr}. Болезнь называют «зелёной икотой»: заболевший икает искрами и поджигает занавески. Лекари говорят, что это утечка из лаборатории. Лаборатория говорит, что это лекари.']],
    choices: [
      { text: 'Раздать зелье от гильдии', req: S => S.treasury >= 11, reqText: 'нужно 11 млн', fx: { treasury: -11, support: 5, fac: { oligarchs: { a: 6 }, left: { a: 4 } }, rmMage: ['alch', 5] }, res: 'Зелье помогло. Побочное действие — лёгкое свечение по ночам. Нижний город экономит на свечах.' },
      { text: 'Закрыть нижний город куполом', fx: { fear: 5, support: -4, fac: { left: { a: -8 } } }, res: 'Купол держится. Икота внутри кончилась сама, через месяц. Вместе с занавесками.' },
      { text: 'Поднять умерших обратно', req: () => Game.rm().sch.necro >= 2, reqText: 'нужна Некромантия 2', fx: { economy: 2, support: -3, rel: { church: -8 }, rmMage: ['necro', 6] }, res: 'Умершие вернулись на работу. Икают по-прежнему, но жалоб от них нет. Святой Престол в бешенстве.' },
    ] },
  { id: 'rm_tournament', title: 'Турнир дуэлянтов', bg: 'square', weight: 2, eras: RL, cond: S => S.q === 3,
    lines: [['defense', 'Ежегодный турнир магических дуэлей, {addr}. Народ ждёт, что глава Башни выйдет на песок хотя бы раз. Прежний выходил. Правда, ему подбирали противников.']],
    choices: [
      { text: 'Выйти против подобранного противника', fx: { support: 3, fac: { hawks: { a: -3 } } }, res: 'Вы победили чисто и красиво. Противник упал за секунду до вашего заклинания. Народ сделал вид, что не заметил.' },
      { text: 'Выйти по-настоящему', chance: () => clamp(0.3 + Game.rmTotal() * 0.03, 0.3, 0.9), win: { fx: { support: 6, fear: 3, fac: { hawks: { a: 7 } } }, res: 'Вы уложили чемпиона Легиона на третьей минуте. Боевые маги впервые посмотрели на вас как на своего.' }, lose: { fx: { support: -4, fac: { hawks: { a: -5 } } }, res: 'Чемпион Легиона был очень вежлив и помог вам встать. Трижды.' } },
      { text: 'Судить с трибуны', fx: { fac: { hawks: { a: -2 } } }, res: 'Вы смотрели с трибуны и вручали призы. Чемпион принял кубок и спросил, не желаете ли как-нибудь размяться. Вы были очень заняты.' },
    ] },
  { id: 'rm_book', title: 'Книга, которую лучше не открывать', bg: 'night', weight: 2, once: true, minTurn: 4, eras: RL,
    lines: [['police', 'В запретном хранилище нашли гримуар, {addr}. На обложке написано «Не открывать». Ниже, другим почерком: «Серьёзно». Ещё ниже, третьим: «Мы предупреждали».'], ['npc:summon', 'Книгу надо отдать моему Кругу. Мы знаем, как обращаться с такими вещами. В основном.']],
    choices: [
      { text: 'Открыть самому', chance: () => clamp(0.35 + Game.rmTotal() * 0.025, 0.3, 0.85), win: { fx: { fear: 4, rmSchool: [Object.keys(SCHOOLS)[Math.floor(Math.random() * 6)], 1], rmCouncilAll: -3 }, res: 'Книга оказалась учебником. Очень хорошим. Автор, судя по почерку, просто не любил конкурентов.' }, lose: { fx: { support: -3, economy: -2, fear: 3 }, res: 'Книга открылась, посмотрела на вас и закрылась. Теперь она лежит в вашей спальне и иногда вздыхает.' } },
      { text: 'Отдать призывателям', fx: { fac: { new: { a: 8, s: 3 } }, rmMage: ['summon', 9] }, res: 'Круг унёс книгу в подвал. Неделю оттуда доносилось хоровое чтение. Потом кто-то ответил.' },
      { text: 'Замуровать обратно', fx: { fac: { faith: { a: 6 }, new: { a: -5 } } }, res: 'Хранители одобряют. На стене повесили четвёртую табличку: «А ведь правда предупреждали».' },
    ] },
  { id: 'rm_tax', title: 'Подать на окна', bg: 'street', weight: 2, eras: RL,
    lines: [['economy', 'Казне нужны деньги, {addr}. Предлагаю подать на окна: чем больше окон, тем богаче дом. Бездарные заложат окна кирпичом, зато мы узнаем, у кого были окна.'], ['npc:peasant', 'Мы и так платим за дым из трубы, за тень от забора и за «возможный дождь». Что дальше — подать на вдох?']],
    choices: [
      { text: 'Ввести подать на окна', fx: { treasury: 12, support: -5, fac: { left: { a: -8 }, oligarchs: { a: -3 } } }, res: 'За месяц в городе стало вдвое меньше окон. Казна пополнилась. Продажи свечей выросли: гильдия благодарит.' },
      { text: 'Ввести подать на шпили и башенки', fx: { treasury: 8, support: 4, fac: { left: { a: 6 }, faith: { a: -6 } }, rmCouncilAll: -6 }, res: 'Народ хохочет третий день. Совет подсчитал свои башенки и перестал с вами здороваться.' },
      { text: 'Ничего не вводить', fx: { support: 1 }, res: 'Казначей вздохнул и унёс проект. Проект назывался «подать на вдох». Вы его не видели, и это к лучшему.' },
    ] },
);

// ---------- летопись мира ----------
const HISTORY_R = [
  { at: [703, 1], head: 'В Башне новый хозяин', text: 'Совет магов Велентара утвердил нового главу Башни. Соседние державы прислали поздравления; Святой Престол прислал экзорциста, но тот заблудился.', fx: {} },
  { at: [703, 3], head: 'Орда снова пошла на рыцарей', text: 'Вождь Грулл Костолом объявил триста сорок первый поход на Альденмарк. Король Родерик объявил триста сорок первую победу заранее.', fx: { rel: { kingdom: 2, orcs: 2 } } },
  { at: [704, 2], head: 'Гномы подняли учётную ставку', text: 'Каз-Дурим объявил, что золото под горой кончается и стоит теперь дороже. Золото под горой кончается с начала времён.', fx: { economy: -2, fac: { oligarchs: { a: -3 } } } },
  { at: [704, 4], head: 'В Орде сменился вождь', text: 'Грулл Костолом проиграл поединок воину по имени Мог. Орда отметила перемену трёхдневным пиром и объявила прежние договоры «сломанными вместе с Груллом».', fx: { rel: { orcs: -8 } } },
  { at: [705, 2], head: 'Эльфы закрыли границу на раздумье', text: 'Лесной престол объявил, что ему нужно время обдумать события последних пятисот лет. Срок раздумья не назван.', fx: { rel: { elves: -3 }, economy: -1 } },
  { at: [706, 3], head: 'Король умер, да здравствует король', text: 'Родерик IX Добрый скончался на пиру. Родерик X обещал править так же, но «с поправкой на время».',
    choice: { lines: [['foreign', 'Молодой король ищет друзей, {addr}. И придворного мага: прежнего он уволил за предсказание про пир.']],
      choices: [
        { text: 'Послать ему своего человека', fx: { rel: { kingdom: 12, church: -4 }, rmCouncilAll: -2 }, res: 'При дворе Альденмарка теперь ваш маг. Он пишет, что король славный, а кормят тяжело.' },
        { text: 'Послать поздравление и счёт за кристаллы', fx: { treasury: 5, rel: { kingdom: -4 } }, res: 'Король оплатил счёт и запомнил, что первое письмо от Башни было про деньги.' },
      ] } },
  { at: [707, 2], head: 'Святой Престол объявил год очищения', text: 'Первосвященник призвал паству «не покупать колдовского». Продажи амулетов в Альденмарке выросли вдвое: запретное берут охотнее.', fx: { treasury: 6, rel: { church: -5 } } },
  { at: [707, 4], head: 'В Орде снова сменился вождь', text: 'Вождя Мога сломала воительница Урша. Она первая в истории Орды умеет читать и требует прислать ей договоры «в письменном виде, а не на пальцах».', fx: { rel: { orcs: 6 } } },
  { at: [708, 2], head: 'Новый первосвященник', text: 'Бенедикт Негасимый угас. Его преемник Игнатий начал с того, что назвал магию «ошибкой, которую пора исправить».', fx: { rel: { church: -8 } } },
  { at: [709, 3], head: 'Комета над миром', text: 'В небе третий месяц висит хвостатая звезда. Эльфы говорят, что видели такую и ничего не было. Гномы подняли цены. Орки стреляют в неё из луков.',
    choice: { lines: [['propaganda', 'Народ ждёт, что скажет Башня, {addr}. Можно объявить комету знамением вашего величия. Можно — происками Святого Престола.']],
      choices: [
        { text: 'Это знамение моего величия', fx: { support: 4, fear: 2, rel: { church: -6 }, rmCouncilAll: -3 }, res: 'Комету назвали вашим именем. Когда она улетела, народ спросил, значит ли это что-нибудь. Иллюзионист повесил новую.' },
        { text: 'Это просто комета', fx: { fac: { liberals: { a: 6 }, faith: { a: -3 } } }, res: 'Вы прочли народу лекцию о небесных телах. Слушали плохо, но Вольные чародеи записали каждое слово.' },
      ] } },
  { at: [710, 2], head: 'Гномы открыли биржу', text: 'В Каз-Дуриме торгуют будущими урожаями, будущими войнами и будущими драконами. Первый дракон обвалил рынок, просто пролетев мимо.', fx: { economy: 2, fac: { oligarchs: { a: 4 } } } },
  { at: [711, 3], head: 'Светлый союз и Тёмные земли подписали перемирие', text: 'Триста сорок девятое по счёту. Обе стороны назвали его вечным. Букмекеры Каз-Дурима принимают ставки на срок.', fx: { rel: { kingdom: 2, orcs: 2 }, fac: { hawks: { a: -3 } } } },
  { at: [712, 2], head: 'Перемирие нарушено', text: 'Вечное перемирие продержалось девять месяцев: рекорд эпохи. Кто нарушил, неизвестно; обе стороны уверены, что знают.', fx: { treasury: 5 } },
];

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isRealm()) return;
  const R = Game.rm(), tot = Game.rmTotal(), rank = Game.rmRank()[1], toads = Game.rmToads(), five = Object.keys(R.sch).filter(k => R.sch[k] >= 5);
  const T = {
    deposed: ['Низложен советом', 'Совет проголосовал. Вы сдали посох, ключи и казённую мантию по описи. Вам оставили звание почётного мэтра, каморку под лестницей и право присутствовать на заседаниях без права голоса. Вы присутствуете. И запоминаете.'],
    claimed: ['Взыскано', 'Покровитель забрал причитающееся. Башня наутро была пуста: только на столе лежал договор с пометкой «исполнено». Говорят, Снаружи вас приняли неплохо: там ценят людей с опытом управления.'],
    exile: ['Бегство под гору', 'Вы живёте в Каз-Дуриме. Потолки низкие, проценты высокие, тайник тает. Гномы вежливы, пока вы платите за хранение. Счёт приходит каждое утро.'],
    helicopter: ['Бегство под гору', 'Портал закрылся за вами в последний миг. В Каз-Дуриме вас встретили счётом за хранение.'],
    coup: ['Ночь посохов', 'Легион вошёл в Башню до рассвета. Вас превратили во что-то небольшое и безобидное и поставили на полку в кабинете нового главы. Иногда он советуется с вами. Вы молчите: у вас нет рта.'],
    revolution: ['Бунт бездарных', 'Бездарные взяли Башню без единого заклинания. Первым указом они отменили подать на возможный дождь. Вторым — выставили вас на площади с табличкой «Он знал». Кидали в основном репой.'],
    retired: ['Ушёл на покой', 'Вы сдали посох и уехали в загородную башенку писать трактат. Трактат о том, как надо было править.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    E.title = tot >= 24 ? 'Вознесение' : tot >= 18 ? 'Гроссмейстер на троне' : toads >= 2 ? 'Повелитель жаб' : tot <= 6 ? 'Просто правитель' : 'Десять лет в Башне';
    E.text = `Последний день ${Game.endYear() - 1} года от Основания Башни. `
      + (tot >= 24 ? 'Вы взошли так высоко, что государство стало вам мелковато. В последний день года вы вознеслись — буквально, сквозь крышу. Крышу чинят. Править по-прежнему некому, но теперь это официально.'
        : tot >= 18 ? 'Вы стали сильнейшим магом эпохи. Страной при этом кто-то тоже управлял: вы не уверены, кто именно, но жалоб не поступало. До вас они не доходили.'
          : tot <= 6 ? 'Вы так и не стали великим магом. Зато десять лет подряд собирали подать, чинили дороги и не дали никому сжечь столицу. Летописцы в растерянности: о таком не слагают баллад.'
            : 'Вы просидели в Башне десять лет, никого не испепелив без повода. По меркам Магократии это золотой век.')
      + (toads ? ` В совете ${toads === 1 ? 'квакает одна жаба' : 'квакают две жабы'}: самые надёжные ваши сторонники.` : '')
      + (S.regime === 'lich' ? ' Вы не постарели ни на день. Впереди вечность, и её тоже придётся чем-то занять.' : S.regime === 'warlock' ? ` Долг перед Покровителем: ${Math.round(R.debt)}. Он не торопит. Это и пугает.` : ' Совет уже обсуждает преемника. Вы делаете вид, что не слышите.');
  }
  verdicts.length = 0;
  verdicts.push(`Титул: ${rank}`);
  if (five.length) verdicts.push(`Высший круг: ${five.map(k => SCHOOLS[k].name).join(', ')}`);
  if (toads) verdicts.push(`Жаб в совете: ${toads}`);
  if (S.regime === 'warlock') verdicts.push(R.debt >= 60 ? 'По уши в долгу у Бездны' : 'Долг под контролем');
  verdicts.push(`Голосов в совете: ${Game.rmVotes()} из 6`);
});

// ---------- вестник ----------
const _pressPageR = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isRealm()) return _pressPageR.call(UI, news);
  const ch = [];
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Весть: ' + h.head); }
  const off = [['Погода', pick(['По распоряжению Башни — переменная облачность.', 'Дождь перенесён на четверг по техническим причинам.', 'Солнечно. Претензии принимаются у погодного мага с девяти до полудня.'])],
    ['Объявления', pick(['Потерян фамильяр, чёрный кот, откликается на «Ваше Темнейшество». Вернуть за вознаграждение.', 'Гильдия алхимиков напоминает: зелье храбрости не заменяет умения плавать.', 'Продаётся башенка. Вид на бездну, соседи тихие (нежить).'])],
    ['Из совета', Game.rmVotes() >= 4 ? 'Заседание прошло в обстановке единодушия. Жертв нет.' : 'Заседание перенесено. Члены совета разошлись во мнениях и по разным этажам.']];
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="rm-np">
      <div class="rm-np-mast">Вестник Башни</div>
      <div class="rm-np-date">Семишпилье · ${['зима', 'весна', 'лето', 'осень'][S.q - 1]} ${S.year} года от Основания Башни · одобрено Оком</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="rm-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что решит Башня?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
Object.assign(UI, {
  tab_magic() {
    const R = Game.rm(), tot = Game.rmTotal(), rank = Game.rmRank(), next = RM_RANKS.find(([n]) => n > tot);
    const card = k => {
      const D = SCHOOLS[k], lv = R.sch[k], why = Game.rmWhy(k), sw = Game.rmSpellWhy(k), M = R.council[k];
      return `<article class="card rm-school"><header><div><h3>${D.icon} ${esc(D.name)}</h3><span class="muted small">Кафедру держит: ${esc(M.toad ? 'жаба' : MAGI[k].short + (M.heir ? ' (ученик)' : ''))}</span></div><span class="rm-circles" role="img" aria-label="Круг ${lv} из 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= lv ? 'f' : ''}"></i>`).join('')}</span></header>
        <p class="muted small">${esc(D.what)} Каждый квартал: ${esc(D.per)}.</p>
        ${lv >= 5 ? `<p class="small rm-cap">${esc(D.cap)}</p>` : ''}
        <div class="acts"><button class="btn small" data-act="rms:${k}" ${why || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>${lv >= 5 ? 'Высший круг' : 'Изыскание'}${lv >= 5 ? '' : `<small>−${Game.rmCost(k)} млн · шанс ${Math.round(Game.rmChance(k) * 100)}%</small>`}</button>
          <button class="btn small ghost" data-act="rmk:${k}" ${sw || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>${esc(D.spell[0])}<small>${esc(sw || 'готово')}</small></button></div>
        <p class="muted small">«${esc(D.spell[0])}»: ${esc(D.spell[1])}</p><div class="dec-fx"><div class="dec-row">${UI.fxChips(Game.previewFx(D.spell[2]))}</div></div>
        ${why && lv < 5 ? `<p class="small dk-why">${esc(why[0].toUpperCase() + why.slice(1))}.</p>` : ''}</article>`;
    };
    return `<p class="lede">Править страной может кто угодно. А вот войти в летописи величайшим магом эпохи — задача, достойная главы Башни. Шесть школ, в каждой пять кругов. Каждый круг что-то даёт державе каждый квартал, третий открывает заклинание, пятый — славу. Изыскание стоит приказ и золото и удаётся не всегда: чем выше круг, тем чаще что-нибудь взрывается.</p>
      <p class="muted small">На каждой кафедре сидит член совета. Пока вы ученик в его школе, он польщён. С четвёртого круга он начинает ревновать. Соседи и Святой Престол тоже считают ваши круги, и новые титулы их не радуют.</p>
      <div class="cr">
        <section class="card" style="flex:1.3"><div class="eyebrow">Ваше величие</div><h2 class="rm-rank">${esc(rank[1])}</h2>
          <div class="rm-total" role="img" aria-label="Кругов ${tot} из 30">${Array.from({ length: 30 }, (_, i) => `<i class="${i < tot ? 'f' : ''}"></i>`).join('')}</div>
          <p class="muted small">Кругов пройдено: <b>${tot}</b> из 30.${next ? ` До титула «${esc(next[1])}» осталось ${next[0] - tot}.` : ' Выше некуда. Вы пробовали.'}</p></section>
        <section class="card cr-side">${S.regime === 'warlock' ? `${UI.meter('Долг перед Покровителем', R.debt, R.debt >= 70 ? 'bad' : R.debt >= 40 ? 'warn' : 'good')}<p class="muted small">Растёт сам и от каждой просьбы. На ста Покровитель приходит лично.</p>
          <div class="acts"><button class="btn small" data-act="rmd:gold" ${S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>Попросить золота<small>+30 млн · долг +22</small></button><button class="btn small" data-act="rmd:lore" ${S.ap <= 0 || S.phase !== 'hub' || tot >= 30 ? 'disabled' : ''}>Попросить знания<small>+1 круг · долг +22</small></button></div>`
          : S.regime === 'lich' ? '<p><b>Лич.</b> Некромантия даётся вам легче, заговорщикам с вами труднее: вас уже убивали. Народ к вам привыкает медленно. Точнее, не привыкает.</p>'
            : '<p><b>Архиволшебник.</b> Любое изыскание удаётся вам на десятую чаще: вы единственный в Башне, кто читает инструкции.</p>'}
          <p class="muted small">Доход от школ: ${String(Math.round((R.sch.summon + R.sch.alch * 1.2) * 10) / 10).replace('.', ',')} млн в квартал.</p></section>
      </div>
      <div class="grid mt rm-schools">${Object.keys(SCHOOLS).map(card).join('')}</div>`;
  },
  tab_council() {
    const R = Game.rm(), v = Game.rmVotes(), F = REGIONS[VEL].factions;
    const pat = k => (F[MAGI[k].patron] || NEW_FACTIONS[REALM]).short;
    const card = k => {
      const D = MAGI[k], M = R.council[k], acts = Game.rmCouncilActions(k), look = M.toad ? npcR('toad').look : M.heir ? { ...D.look, hairColor: '#b87a2a', beard: 'none', mustache: 'none', brows: 'worried' } : D.look;
      return `<article class="card rm-mage ${M.toad || M.l >= 50 ? 'ok' : ''}"><div class="rm-face">${Portrait.svg(look)}</div><div class="rm-mage-b"><header><div><h3>${esc(M.toad ? 'Жаба' : M.heir ? 'Ученик: ' + D.short + '-младший' : D.name)}</h3><span class="muted small">${SCHOOLS[k].icon} ${esc(SCHOOLS[k].name)} · держится за: ${esc(pat(k))}</span></div><span class="chip ${M.toad || M.l >= 50 ? 'coopted' : 'banned'}">${M.toad ? 'ква (за)' : M.l >= 50 ? 'за вас' : 'против'}</span></header>
        <p class="muted small">${esc(M.toad ? 'Бывший член совета. По уставу кресло сохраняется, кваканье засчитывается как голос «за». Самый надёжный ваш сторонник.' : M.heir ? 'Занял кресло после несчастного случая с наставником. Благодарен, осторожен, голосует быстро.' : D.bio)}</p>
        ${M.toad ? '' : UI.meter('Расположение к вам', M.l, M.l >= 50 ? 'good' : M.l >= 35 ? 'warn' : 'bad')}
        <div class="acts">${acts.map(a => `<button class="btn small ${a.danger ? 'danger-o' : ''}" data-act="rmc:${k}:${a.id}" ${!a.ok || S.ap <= 0 || S.phase !== 'hub' ? 'disabled' : ''}>${esc(a.name)}${a.cost ? `<small>${esc(a.cost)}</small>` : a.odds !== undefined ? `<small>шанс ${Math.round(a.odds * 100)}%</small>` : ''}</button>`).join('')}</div></div></article>`;
    };
    return `<p class="lede">Магократией правит совет: шесть глав школ и вы, первый среди равных. Равные с этим не согласны. Тот, чьё расположение не ниже 50, голосует за вас. Четыре голоса — и совет утверждает всё, что вы принесли. Меньше трёх — сметы режут, указы «изучают», а потом кто-нибудь вспоминает параграф девятый устава: о доверии.</p>
      <section class="card"><div class="eyebrow">Расклад в совете</div>
        <div class="rm-seats" role="img" aria-label="За вас ${v} из 6">${Object.keys(MAGI).map(k => { const M = R.council[k]; return `<span class="${M.toad ? 'toad' : M.l >= 50 ? 'ok' : 'no'}" title="${esc(MAGI[k].short)}">${M.toad ? '🐸' : SCHOOLS[k].icon}</span>`; }).join('')}</div>
        <p><b>За вас ${v} из 6.</b> ${v >= 4 ? 'Большинство есть: Хранители спокойны, указы проходят.' : v >= 3 ? 'Поровну. Каждое заседание — лотерея.' : 'Большинства нет: −2 млн в квартал, Хранители ропщут, вопрос о доверии близко.'}</p>
        <p class="muted small">Расположение каждого мага тянется к настроению силы, за которую он держится, и само понемногу убывает: вас слишком давно не свергали. Каждый новый титул на вкладке «Развитие магии» портит настроение всем сразу. Жаб в совете может быть не больше двух: с третьей устав уже не справляется.</p></section>
      <div class="rm-magi mt">${Object.keys(MAGI).map(card).join('')}</div>`;
  },
});
const _tabCabR = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabR.call(UI);
  if (!isRealm()) return h;
  return h.replace(/У власти ([\d.,]+) г\./, `В Башне $1 г. Титул: ${Game.rmRank()[1]}. В совете за вас ${Game.rmVotes()} из 6.`);
};
UI.actionHandlers.push(id => {
  if (!/^rm[skcd]:/.test(id)) return false;
  const p = id.split(':');
  const out = p[0] === 'rms' ? Game.rmStudy(p[1]) : p[0] === 'rmk' ? Game.rmCast(p[1]) : p[0] === 'rmc' ? Game.rmCouncilAction(p[1], p[2]) : Game.rmDebtAsk(p[1]);
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
