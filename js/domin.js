// «Диктато: Вакуум власти». Сектор 02 — Империя тысячи солнц (пародия на мрачную готическую космооперу).
// Автократор девять тысяч лет сидит на троне и молчит. Игрок — регент: толкует молчание и правит от его имени.
// Вкладки: «Карта империи» (сектора, стабильность, угрозы, десятина), «Машина бюрократии» (палаты Канцелярии, затор, очередь приказов),
// «Святой Совет» (шесть лордов, без большинства которых толкование не признают).
const DMN = 'dominat';

// ---------- чужие ----------
Object.assign(FLAGS, {
  dominat: `<rect width="30" height="20" fill="#16100f"/><path d="M12 4 H18 M15 4 V16 M12.5 16 H17.5" stroke="#c9a640" stroke-width="2"/><path d="M5 7 L11 10 L5 13 M25 7 L19 10 L25 13" fill="none" stroke="#8e2a2a" stroke-width="1.6"/>`,
  bugai: `<rect width="30" height="20" fill="#1f3a1a"/><path d="M8 14 L11 6 L15 11 L19 6 L22 14 Z" fill="#c9a640"/><circle cx="12" cy="15.5" r="1.4" fill="#fff"/><circle cx="18" cy="15.5" r="1.4" fill="#fff"/>`,
  zhor: `<rect width="30" height="20" fill="#3a1a3a"/><path d="M5 10 Q15 0 25 10 Q15 20 5 10 Z" fill="none" stroke="#e08ad0" stroke-width="1.4"/>` + [9, 12, 15, 18, 21].map(x => `<path d="M${x} 7.5 l1 3 l1 -3" fill="#e9dcb8"/>`).join(''),
  dandy: `<rect width="30" height="20" fill="#1a2a3a"/><path d="M15 3 Q21 10 15 17 Q9 10 15 3 Z" fill="none" stroke="#bfe0e8" stroke-width="1.3"/><circle cx="15" cy="10" r="1.8" fill="#bfe0e8"/>`,
  rustdead: `<rect width="30" height="20" fill="#101614"/><path d="M9 15 V8 L15 4 L21 8 V15" fill="none" stroke="#5fd08a" stroke-width="1.5"/><path d="M12 10 H18 M15 10 V15" stroke="#5fd08a" stroke-width="1.5"/>`,
});
Object.assign(COUNTRIES, {
  bugai: { name: 'Орда Бугаёв', bloc: 'east', flag: 'bugai', leaders: [[9999, 'главбугай Гыр Самый Большой (пока)']] },
  zhor: { name: 'Великий Жор', bloc: 'east', flag: 'zhor', leaders: [[9999, 'оно всё сразу; переговоры ведёт то, что ближе']] },
  dandy: { name: 'Звёздные Щёголи', bloc: 'east', flag: 'dandy', leaders: [[9999, 'провидица Иль-Вэнь, знает, чем кончится разговор, и заранее обижена']] },
  rustdead: { name: 'Ржавые Династии', bloc: 'east', flag: 'rustdead', leaders: [[9999, 'царь Ахмот Проснувшийся, спал шестьдесят миллионов лет и не выспался']] },
});
Object.assign(COUNTRY_CASES, { bugai: ['Орды Бугаёв', 'Ордой Бугаёв', 'к Бугаям'], zhor: ['Великого Жора', 'Великим Жором', 'к Жору'], dandy: ['Звёздных Щёголей', 'Звёздными Щёголями', 'к Щёголям'], rustdead: ['Ржавых Династий', 'Ржавыми Династиями', 'к Ржавым Династиям'] });
Object.assign(BLOCR, { bugai: 'east', zhor: 'east', dandy: 'east', rustdead: 'east' });

// ---------- облик ----------
const LM = o => ({ skin: SKIN.light, brows: 'normal', mouth: 'flat', mustache: 'none', glasses: 'none', beard: 'none', medals: 0, sash: '', cigar: false, tie: 'none', hat: 'none', ...o });
const DM_ARM = (steel = '#3a3f4a', extra = {}) => ({ outfit: 'powerarmor', outfitColor: steel, steel, trim: '#c9a640', ...extra });
const DM_COAT = (color = '#1d1e22', extra = {}) => ({ outfit: 'greatcoat', outfitColor: color, trim: '#c9a640', hat: 'peaked', hatColor: color, ...extra });
const DM_ROBE = (color = '#5a1a20', extra = {}) => ({ outfit: 'robe', outfitColor: color, trim: '#c9a640', ...extra });

Object.assign(REGIME_TYPES, {
  dmnoble: { name: 'Регент от Высоких домов', icon: '🏛️', desc: 'Ваш род правит сектором сорок поколений и столько же ждёт очереди к Трону. Высокие дома считают вас своим, Канцелярия — понятным. Легионы помнят, что вы не служили. Жрецы помнят, что вы не постились.', fx: { treasury: 15, economy: 4 }, fac: { oligarchs: { a: 12 }, liberals: { a: 6 }, hawks: { a: -8 }, faith: { a: -6 } } },
  dmpriest: { name: 'Регент от Культа Трона', icon: '🕯️', desc: 'Вы сорок лет стояли у подножия Трона и первым услышали, что Автократор молчит одобрительно. Культ за вас, миллиарды молятся с вашим именем. Высокие дома считают, что жрец должен молиться, а не считать их десятину.', fx: { support: 8, fear: 6 }, fac: { faith: { a: 14 }, left: { a: 6 }, oligarchs: { a: -10 }, new: { a: -6 } } },
  dmwar: { name: 'Регент от Легионов', icon: '⚔️', desc: 'Вы выиграли три крестовых похода и проиграли один, о котором не говорят. Легионы внесли вас в Тронный зал, не снимая шлемов. Канцелярия в ужасе: вы требуете исполнять приказы в тот же век, когда они отданы.', fx: { army: 12, fear: 8, economy: -3 }, fac: { hawks: { a: 14 }, liberals: { a: -10 }, oligarchs: { a: -4 } } },
});
Object.assign(DEFAULT_PILLARS, { dmnoble: ['oligarchs', 'liberals'], dmpriest: ['faith', 'left'], dmwar: ['hawks', 'left'] });
REGIME_TITLES[DMN] = { dmnoble: 'Лорд-регент', dmpriest: 'Лорд-регент', dmwar: 'Лорд-регент' };
REGION_TITLES[DMN] = ['Лорд-регент', 'Голос Трона', 'Местоблюститель', 'Первый Толкователь'];
Object.assign(TITLE_FORMS, { 'Лорд-регент': ['Лорда-регента', 'Лордом-регентом'], 'Голос Трона': ['Голоса Трона', 'Голосом Трона'], 'Местоблюститель': ['Местоблюстителя', 'Местоблюстителем'], 'Первый Толкователь': ['Первого Толкователя', 'Первым Толкователем'] });
REGIME_SETUP_LOOK[DMN] = {
  dmnoble: LM({ face: 'long', hair: 'slick', hairColor: '#c8c8c8', mustache: 'handlebar', mouth: 'smirk', glasses: 'monocle', eyeGlow: '', hat: 'laurel', outfit: 'mantle', outfitColor: '#3a2230', trim: '#c9a640' }),
  dmpriest: LM({ face: 'long', hair: 'bald', hairColor: '#999', beard: 'full', brows: 'bushy', eyeGlow: '', hat: 'mitre', hatColor: '#5a1a20', ...DM_ROBE('#5a1a20') }),
  dmwar: LM({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#555', brows: 'angry', eyeGlow: '', bionic: true, ...DM_COAT('#1d1e22') }),
};
for (const k of ['dmnoble', 'dmpriest', 'dmwar']) REGIME_LOOKS[k] = { ...REGIME_SETUP_LOOK[DMN][k], bluetooth: false };
const DM_NAMES = { dmnoble: 'Максимилиан фон Кастелян', dmpriest: 'Игнаций Неугасимый', dmwar: 'Маркус Железный Кодекс' };
function dominSetupLook(st, key) { const L = st.look; if (key === 'outfit') { L.outfitColor = { mantle: '#3a2230', greatcoat: '#1d1e22', robe: '#5a1a20' }[L.outfit]; L.steel = L.outfitColor; L.trim = '#c9a640'; } L.hatColor = L.hat === 'mitre' ? '#5a1a20' : L.outfitColor; }

NAME_POOLS.domin = { m: ['Северус', 'Маркус', 'Тиберий', 'Валериан', 'Игнаций', 'Корнелий', 'Люций', 'Октавиан', 'Грегор', 'Феодор', 'Аврелиан', 'Максенций', 'Домициан', 'Гонорий', 'Кассиан', 'Юлиан', 'Вигилий', 'Севастиан', 'Тит', 'Флавий'], f: ['Северина', 'Аурелия', 'Клавдия', 'Юстиния', 'Агриппа', 'Домицилла', 'Фаустина', 'Евлалия', 'Претория'], last: ['Вакс', 'Кастелян', 'Мортис', 'Феррум', 'Солар', 'Ригор', 'Канцер', 'Обскур', 'Гравис', 'Литания', 'Децим', 'Серпент', 'Аквила', 'Тенебр', 'Пургат', 'Сигилл', 'Вульт', 'Доктрин', 'Караул', 'Кадило'] };
RELATIVES_BY_STYLE.domin = { defense: 'Племянник Тиберий', economy: 'Кузен Корнелий', police: 'Тётка Клавдия', propaganda: 'Шурин Феодор', foreign: 'Зять Люций' };
REGIONS[DMN] = {
  name: 'Вечный Доминат', short: 'Доминат',
  blurb: 'Миллион миров, тысяча солнц и один Трон. Автократор сидит на нём девять тысяч лет и молчит. Война идёт сорок веков. Прогресс запрещён: считается, что всё нужное уже изобрели, просто потеряли чертежи.',
  country: 'Вечный Доминат Человечества', capital: 'Тронный мир', currency: 'трон',
  exports: 'десятина, рекруты и свечи', exportGen: 'десятины', company: 'Палата Десятины', patron: 'bugai',
  sport: 'гонки на катафалках', rival: 'Орда Бугаёв', rivalShort: 'Бугаи',
  disputed: 'Глухая окраина', faithLeader: 'Первосвятитель', capitalSquare: 'площади Сорока Тысяч Ступеней',
  jungle: 'подулье', nephew: 'Тиберий',
  countries: ['bugai', 'zhor', 'dandy', 'rustdead'],
  relInit: { bugai: 20, zhor: 5, dandy: 35, rustdead: 25 },
  flag: FLAGS.dominat,
  leaderSkin: 'light', era: 'domin', style: 'domin', faithStyle: 'thronecult', exile: 'монастыре на ледяной луне', critters: 'сервочерепов',
  factions: {
    left: { name: 'Трудовые миллиарды', short: 'Ульи', icon: '🏭', desc: 'Население городов-ульев. Рождаются на смене, умирают на смене. О том, что у Империи сменился регент, узнают лет через двести.' },
    liberals: { name: 'Канцелярия', short: 'Писцы', icon: '📜', desc: 'Десять миллиардов писцов. Знают, что Империей правят не лорды, а формуляры. Формуляры заполняют они.' },
    faith: { name: 'Культ Трона', short: 'Культ', icon: '🕯️', desc: 'Вера в то, что Автократор всё видит, всё слышит и молчит со смыслом. Смысл сообщают жрецы.' },
    oligarchs: { name: 'Высокие дома', short: 'Дома', icon: '🏛️', desc: 'Владеют мирами, как другие владеют поместьями. Каждому дому по десять тысяч лет, и каждый помнит, кто кому должен с самого начала.' },
    hawks: { name: 'Легионы Домината', short: 'Легионы', icon: '⚔️', desc: 'Воины в доспехах размером с шкаф. На каждом печатей и свитков больше, чем брони. Верны Трону; регента терпят.' },
  },
  advisors: {
    defense: { name: 'Лорд-маршал Северус Гравис', bio: 'Сорок лет на фронте. Потерял глаз, руку и одиннадцать миллиардов солдат. По руке скучает.', look: LM({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#777', brows: 'angry', mustache: 'walrus', bionic: true, ...DM_COAT('#1d1e22') }) },
    economy: { name: 'Магистр десятины Корнелий Вакс', bio: 'Знает, сколько должен каждый мир. Не знает, сколько миров. Считает это мелочью.', look: LM({ face: 'long', hair: 'bald', hairColor: '#999', glasses: 'monocle', brows: 'worried', ...DM_ROBE('#2a2d33') }) },
    police: { name: 'Инквизитор Обскур', bio: 'Имя засекречено, лицо тоже, должность — под вопросом. Подозревает всех, включая себя. Себя — обоснованно.', look: LM({ face: 'long', hair: 'slick', hairColor: '#1a1a1a', mustache: 'handlebar', mouth: 'smirk', outfit: 'greatcoat', outfitColor: '#2a1210', trim: '#c9a640', hat: 'hood', hatColor: '#2a1210' }) },
    propaganda: { name: 'Исповедник Феодор Литания', bio: 'Проповедует по шесть часов без воды. Паства теряет сознание; он считает это благодатью.', look: LM({ face: 'round', hair: 'bald', hairColor: '#aaa', beard: 'full', brows: 'bushy', mouth: 'o', hat: 'mitre', hatColor: '#5a1a20', ...DM_ROBE('#5a1a20') }) },
    foreign: { name: 'Вольный капер Люций Солар', bio: 'Имеет грамоту на торговлю с чужими. Грамоте три тысячи лет; что в ней написано, прочесть уже нельзя, и это удобно.', look: LM({ face: 'oval', hair: 'long', hairColor: '#8a5a2a', mustache: 'handlebar', beard: 'goatee', mouth: 'grin', earring: true, ...DM_COAT('#3a2230', { hat: 'none' }) }) },
  },
};
REGION_TALK[DMN] = { addr: 'лорд-регент', sir: 'лорд', lady: 'леди', holiday_acc: 'День Восшествия', holiday_dat: 'Дню Восшествия', gringo: 'чужие', haven: 'тайник у каперов', exileTo: 'монастырь на ледяной луне', canteen: 'трупный крахмал', fruit_adj: 'Тронный', locale: 'Домината', pay_in_kind: 'Свечами.', vegas: 'личный шпиль', rebel: 'Старшина смены', meeting: 'в зале с черепами' };
FAITH_TALK.thronecult = { priest_open: 'Чадо... Простите, {addr}.', heavens: 'Трону', faith_quip: 'Автократор молчит. Но мы-то слышим.', sermon: 'литании', faith_appeal: 'Об этом узнают на каждой кафедре миллиона миров.', temple_loc: 'в Соборе Молчания', righteous: 'Культ называет вас «терпимым толкователем»' };
FAITH_TITLE.thronecult = 'Первосвятитель';
PAPERS[DMN] = ['Вестник Домината', 'надписи в подулье'];
LEADER_STYLE[DMN] = {
  left: { title: 'Старшина смены', look: { outfit: 'robe', outfitColor: '#3a3a34', trim: '#6a5a3a', hat: 'hood', hatColor: '#3a3a34', glasses: 'none', medals: 0, sash: '' } },
  liberals: { title: 'Старший писец', look: { ...DM_ROBE('#2a2d33'), hat: 'none', glasses: 'monocle', medals: 0, sash: '' } },
  faith: { male: true, title: 'Первосвятитель', look: { ...DM_ROBE('#5a1a20'), hat: 'mitre', hatColor: '#5a1a20', glasses: 'none', medals: 0, sash: '' } },
  oligarchs: { title: 'Глава дома', look: { outfit: 'mantle', outfitColor: '#3a2230', trim: '#c9a640', hat: 'laurel', glasses: 'monocle', medals: 0, sash: '' } },
  hawks: { male: true, title: 'Магистр легиона', look: { ...DM_ARM('#2a3a5a'), hat: 'none', glasses: 'none', medals: 0, sash: '' } },
  new: { male: true, title: 'Архимеханик', look: { ...DM_ROBE('#6a1a14'), hat: 'hood', hatColor: '#6a1a14', glasses: 'none', medals: 0, sash: '', bionic: true } },
};
NEW_FACTIONS[DOMIN] = { name: 'Жрецы Шестерни', short: 'Шестерня', icon: '⚙️', desc: 'Единственные, кто умеет чинить машины. Чинят молитвой, маслом и ударом в нужное место. Как это работает, не знают сами и считают вопрос ересью.', rivals: ['liberals', 'faith'], risk: 'rev', appear: () => true, intro: 'Жрецы Шестерни прислали регенту освящённый болт. Что им крепят, не уточнили.', grow: () => 0 };
function npcM(key) {
  const M = {
    lordk: { name: 'Магистр Канцелярии', look: LM({ face: 'long', hair: 'bald', hairColor: '#999', glasses: 'monocle', brows: 'worried', ...DM_ROBE('#2a2d33') }) },
    marine: { name: 'Брат-капитан легиона', look: LM({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#333', brows: 'angry', ...DM_ARM('#2a3a5a') }) },
    gearp: { name: 'Архимеханик Шестерни', look: LM({ skin: '#c9c0b0', face: 'long', hair: 'bald', hairColor: '#888', mouth: 'flat', bionic: true, ...DM_ROBE('#6a1a14'), hat: 'hood', hatColor: '#6a1a14' }) },
    bugai: { name: 'Посол Бугаёв', look: { skin: '#6a9a4a', face: 'square', hair: 'bald', hairColor: '#1a1a1a', brows: 'angry', mouth: 'grin', mustache: 'none', beard: 'none', glasses: 'none', tusks: true, outfit: 'plate', steel: '#5a4a34', hat: 'none' } },
    dandy: { name: 'Провидица Щёголей', look: LM({ skin: '#e8e0f0', face: 'long', hair: 'long', hairColor: '#bfe0e8', ears: 'elf', mouth: 'smirk', earring: true, outfit: 'mantle', outfitColor: '#1a2a3a', trim: '#bfe0e8', hat: 'circlet', gem: '#bfe0e8' }) },
    scribe: { name: 'Писец седьмого разряда', look: LM({ face: 'oval', hair: 'combover', hairColor: '#777', brows: 'worried', mouth: 'o', sweat: true, ...DM_ROBE('#2a2d33') }) },
    colonel: { name: 'Брат-капитан легиона', look: LM({ skin: SKIN.tan, face: 'square', hair: 'short', hairColor: '#333', brows: 'angry', ...DM_ARM('#2a3a5a') }) },
    rebel: { name: 'Старшина смены', look: { skin: SKIN.tan, face: 'square', hair: 'bald', hairColor: '#444', brows: 'angry', mouth: 'flat', mustache: 'thick', beard: 'none', glasses: 'none', outfit: 'robe', outfitColor: '#3a3a34', trim: '#6a5a3a', hat: 'none' } },
  };
  return M[key] || null;
}
const DM_Y = 40001;
ERAS[DOMIN] = { name: 'Сорок первое тысячелетие', label: 'Вакуум власти: империя тысячи солнц', start: DM_Y, turns: 40, dark: true, fantasy: true, blurb: 'В мрачном будущем есть только отчётность.', regions: [DMN], regimes: ['dmnoble', 'dmpriest', 'dmwar'], titles: ['Лорд-регент'], intro: '', aid: [],
  vars: { mast: 'ВЕСТНИК ДОМИНАТА', blame: 'происки чужих', student_meme: '', swim_ref: '', rebel_icon: 'разводной ключ', friendly_paper: 'каперском листке', friendly_res: '', china_offer: '', china_quip: '', china_workers: '', china_gift: '' }, defaultNames: { [DMN]: DM_NAMES.dmnoble } };
const DOMIN_SETUP = { world: 'dark', era: DOMIN, region: DMN, regime: 'dmnoble', name: DM_NAMES.dmnoble, title: 'Лорд-регент', country: REGIONS[DMN].country, diff: 'normal', look: { ...REGIME_SETUP_LOOK[DMN].dmnoble } };

// ---------- слова ----------
const ROLES_M = {
  defense: { title: 'Лорд-маршал', action: 'Смотр легионов', actionDesc: 'Десять тысяч воинов в доспехах проходят под Троном. Пол выдерживает. Пока.' },
  economy: { title: 'Магистр десятины', action: 'Взыскание недоимок', actionDesc: 'Найти миры, не платившие с прошлого тысячелетия. Некоторые ещё существуют.' },
  police: { title: 'Инквизитор', action: 'Поиск ереси', actionDesc: 'Ересь найдётся. Она всегда находится: вопрос только, у кого.' },
  propaganda: { title: 'Исповедник', action: 'Большая литания', actionDesc: 'Шесть часов проповеди по всем каналам. Смены не останавливаются: слушают стоя у станков.' },
  foreign: { title: 'Вольный капер', action: 'Рейс к чужим', actionDesc: 'Обмен подарками с теми, с кем говорить запрещено. Отношения теплеют, Культ хмурится.' },
};
const ADV_TEXT_M = { defense: 'Смотр прошёл. Пол Тронного зала просел на палец. Архимеханик говорит, что так было.', economy: 'Недоимки взысканы. Один мир заплатил за три тысячи лет разом и попросил расписку.', police: 'Ересь найдена. В этот раз у поваров. Обед задерживается.', propaganda: 'Литания прочитана. Выработка на время проповеди выросла: под неё страшно останавливаться.', foreign: 'Капер вернулся с грузом. Что за груз, лучше не знать; он шевелится.' };
for (const [k, n] of Object.entries({ army: 'Легионы', police: 'Инквизиция', health: 'Госпитальеры', edu: 'Схолы', subsidy: 'Пайки ульям', infra: 'Кузни и верфи', media: 'Проповедь', palace: 'Нужды Трона', popTax: 'Трудовая десятина', corpTax: 'Десятина с домов', duty: 'Пошлина с каперов' })) {
  const d = [...SLIDERS.spend, ...SLIDERS.tax].find(x => x.k === k);
  d.name = typeof d.name === 'string' ? { def: d.name, domin: n } : { ...d.name, domin: n };
}
const _eraLookM = Game.eraLook;
Game.eraLook = function () {
  _eraLookM.call(Game);
  if (!isDomin()) return;
  for (const r of Object.keys(ROLES_M)) Object.assign(ROLES[r], ROLES_M[r]);
  Object.assign(STAT_NAMES, { swiss: 'Тайник у каперов', economy: 'Хозяйство', army: 'Легионы', support: 'Миллиарды' });
};
const _bankM = Game.bank;
Game.bank = function () { return isDomin() ? { name: 'Тайник у каперов', short: 'Тайник', to: 'каперов', at: 'у каперов', acc: 'ваш тайник у вольных каперов', ins: 'тайником у каперов', dat: 'тайнику у каперов' } : _bankM.call(Game); };
const TM = [
  ['Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.', 'С чужими говорить запрещено. Но те, с кем отношения лучше, давят на сектора слабее. Каждый рейс к ним злит Культ.'],
  ['Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.', 'Ближние лорды. Верность ниже 25 — и лорд может переметнуться. Смещённого заменит родич: предан, но не блещет.'],
  ['Ваши министры. Лояльность ниже 25 — и министр может вас сдать.', 'Ближние лорды. Верность ниже 25 — и лорд может переметнуться.'],
  ['предан, но не слишком умён', 'предан, но не блещет'], ['предан, но не слишком способен', 'предан, но не блещет'],
  ['Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!', 'Казна почти пуста, {addr}. Десятина где-то есть. Она в пути. Третий век.'],
  ['Офицеры недовольны. Поднимите бюджет армии или устройте парад.', 'Легионы ропщут. Им нужен враг. Желательно не вы.'],
  ['Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!', 'Ульи ропщут. Пайки, литания, казнь еретика — что-нибудь!'],
  ['Риск переворота', 'Риск низложения'], ['Риск революции', 'Риск восстания ульев'],
  ['Казна в минусе! Армии задерживают жалованье, банки требуют проценты.', 'Казна в минусе! Легионам нечем платить, каперы считают проценты.'],
  ['Счёт в Швейцарии', 'Тайник у каперов'], ['Нужды дворца', 'Нужды Трона'], ['нужды дворца', 'нужды Трона'],
  ['пришёл к власти. Режим:', 'принял регентство. От кого:'], ['Подарить виллу', 'Пожаловать личный шпиль'],
  ['переговоры с движениями, проекты, визиты, поручения советникам', 'переговоры с сословиями, толкования, поручения лордам, дела секторов, Канцелярии и Совета'],
  ['Проекты и указы — на вкладке «Указы».', 'Толкования воли Трона — на вкладке «Толкования».'],
  ['Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.', 'Легионы ниже 45 и обиженные магистры — к низложению. Миллиарды ниже 30 — к восстанию ульев.'],
  ['Деньги «нужд дворца» уходят на', 'Деньги «нужд Трона» уходят в'],
  ['>Новый режим<', '>Новая сила<'], ['★ Оценка историков', '★ Оценка хронистов'],
  ['Ночью во дворце зазвонил телефон', 'Ночью в Тронном зале погасли свечи'], ['в посольстве недовольны', 'их посол недоволен'],
  ['Сделать лидера министром', 'Ввести главу в ближние лорды'], ['министерский пост', 'место среди ближних лордов'], ['Новый министр', 'Новый лорд'], ['новый министр', 'новый лорд'], ['Места в правительстве', 'Места при Троне'], ['места в правительстве', 'места при Троне'],
  ['Перевести 15 млн в личный фонд', 'Перевести 15 млн в тайник у каперов'], ['Цюрих. На случай, если придётся уходить. Шанс огласки 20%.', 'Каперы хранят молча и за долю. На случай, если регентство кончится раньше срока. Шанс огласки 20%.'],
  ['получил конверт. Вопросов он не задал.', 'получает ларец. Ларец проверен на ересь и принят.'],
  ['Каждый указ стоит', 'Каждое толкование стоит'], ['Повторяемые указы слабеют, если издавать их', 'Повторяемые толкования слабеют, если оглашать их'], ['Указ «', 'Толкование «'], ['Государственный визит', 'Тайный рейс капера'],
  ['министр', 'лорд'], ['Министр', 'Лорд'], ['млн', 'трон.'],
];
const _varsM = Game.vars;
Game.vars = function () { const v = _varsM.call(Game); if (isDomin()) v.addr = 'лорд-регент'; return v; };

// ============================================================
// СЕКТОРА, МАШИНА, СОВЕТ
// ============================================================
// kind — кто грызёт сектор; foe — с кем можно тайно договориться, чтобы грыз медленнее
const SECTORS = {
  throne: { name: 'Тронный сектор', x: 150, y: 150, base: 6, kind: 'Шёпот', foe: null, grow: 1.4, text: 'Столица. Город размером с планету, собор размером с город. Потерять нельзя.' },
  forge: { name: 'Кузнечные миры', x: 232, y: 96, base: 7, kind: 'Ржавые Династии', foe: 'rustdead', grow: 1.8, text: 'Куют всё, чем воюет Империя. Чертежам десять тысяч лет; копии с копий.' },
  hive: { name: 'Ульи Гнили', x: 76, y: 98, base: 6, kind: 'Шёпот', foe: null, grow: 2.2, text: 'Триллион жителей в башнях до неба. Внизу темно, и в темноте шепчут.' },
  green: { name: 'Зелёный рубеж', x: 246, y: 198, base: 4, kind: 'Бугаи', foe: 'bugai', grow: 2.4, text: 'Бугаи лезут сюда сорок веков. Им нравится драться, а здесь дерутся.' },
  silk: { name: 'Шёлковый предел', x: 62, y: 204, base: 5, kind: 'Щёголи', foe: 'dandy', grow: 1.6, text: 'Богатые торговые миры. Щёголи считают их своими с тех времён, когда люди жили на деревьях.' },
  deep: { name: 'Глухая окраина', x: 152, y: 252, base: 3, kind: 'Жор', foe: 'zhor', grow: 2.6, text: 'Оттуда идёт Великий Жор. Он не воюет. Он ест.' },
};
const TITHE = [['Щадящая', 0.6, 1.4], ['Обычная', 1, 0], ['Двойная', 1.45, -1.8]];
const PALATY = { count: ['Счётная палата', 'Считает десятину. Чем больше писцов, тем больше десятины доходит до казны.'], orders: ['Палата приказов', 'Передаёт вашу волю секторам. Чем больше писцов, тем быстрее тает затор.'], cadre: ['Палата назначений', 'Подбирает наместников. Чем больше писцов, тем спокойнее в секторах.'], archive: ['Великий архив', 'Хранит всё. Иногда находит. Чем меньше писцов, тем чаще теряет.'] };
const SYNOD = {
  chanc: { name: 'Магистр Канцелярии', who: 'Аврелий Формуляр', tip: 'Любит, когда затор в Канцелярии невелик', home: 'dmnoble' },
  eccl: { name: 'Первосвятитель', who: 'Бенедикт Громогласный', tip: 'Любит, когда Культ доволен', home: 'dmpriest' },
  marsh: { name: 'Верховный маршал', who: 'Горгон Несгибаемый', tip: 'Любит, когда Легионы сильны', home: 'dmwar' },
  inq: { name: 'Великий инквизитор', who: 'имя изъято', tip: 'Любит страх. Не любит рейсы к чужим' },
  gear: { name: 'Архимеханик Шестерни', who: 'Каппа-Одиннадцать', tip: 'Любит, когда Жрецы Шестерни довольны' },
  pilot: { name: 'Глава Дома Лоцманов', who: 'леди Навис Третий Глаз', tip: 'Любит, когда сектора целы' },
};
const DISPATCH = { crusade: ['Крестовый поход', 12, 'угроза −30, легионы −4'], inq: ['Инквизитор', 5, 'ересь −25 (прочее −8), стабильность −6'], relief: ['Хлебный конвой', 8, 'стабильность +15'] };
Object.assign(Game, {
  dm() {
    if (!S.dm) {
      S.dm = { sec: Object.fromEntries(Object.keys(SECTORS).map(k => [k, { stab: k === 'throne' ? 70 : 52 + Math.round(Math.random() * 10), thr: k === 'throne' ? 12 : 22 + Math.round(Math.random() * 14), tithe: 1, lost: false, burned: false }])),
        queue: [], staff: { count: 2, orders: 2, cadre: 2, archive: 2 }, backlog: S.regime === 'dmwar' ? 45 : 32, syn: Object.fromEntries(Object.keys(SYNOD).map(k => [k, { l: SYNOD[k].home === S.regime ? 78 : 42 + Math.round(Math.random() * 14) }])), voteAt: 0, done: 0, burnedN: 0 };
    }
    return S.dm;
  },
  dmAlive(k) { const s = Game.dm().sec[k]; return !s.lost && !s.burned; },
  dmEff() { const D = Game.dm(); return clamp(0.5 + D.staff.count * 0.1 - D.backlog / 250, 0.3, 1.1); },
  dmDelay() { const D = Game.dm(); return Math.max(1, 1 + (D.backlog >= 40 ? 1 : 0) + (D.backlog >= 75 ? 1 : 0) - (D.staff.orders >= 4 ? 1 : 0)); },
  dmSecIncome(k) { const s = Game.dm().sec[k]; return Game.dmAlive(k) ? SECTORS[k].base * 1.35 * clamp(s.stab / 60, 0.2, 1.3) * TITHE[s.tithe][1] * Game.dmEff() : 0; },
  dmIncome() { return Math.round(Object.keys(SECTORS).reduce((a, k) => a + Game.dmSecIncome(k), 0) * 10) / 10; },
  dmVotes() { return Object.values(Game.dm().syn).filter(m => m.l >= 50).length; },
  dmLost() { return Object.keys(SECTORS).filter(k => !Game.dmAlive(k)).length; },
  dmAct(id, a, b) {
    const D = Game.dm(); let fx = {}, text = '';
    const m = k => { const x = Game.dealInfo('dm:' + k).mult; Game.noteDeal('dm:' + k); return x; };
    if (id === 'send') { const [name, cost] = DISPATCH[b] || []; if (!name || !Game.dmAlive(a) || S.treasury < cost || D.queue.some(q => q.sec === a && q.type === b) || !Game.spend()) return null; const eta = Game.dmDelay(); D.queue.push({ type: b, sec: a, eta }); fx = { treasury: -cost }; text = `${name}: ${SECTORS[a].name}. Приказ подан в Канцелярию. По её расчёту, дойдёт через ${eta} кв. Канцелярия в расчётах оптимистка.`; }
    else if (id === 'tithe') { const s = D.sec[a], n = +b; if (!Game.dmAlive(a) || s.tithe === n || s.titheAt === S.turn) return null; s.tithe = n; s.titheAt = S.turn; text = `${SECTORS[a].name}: десятина ${TITHE[n][0].toLowerCase()}. Миры узнают об этом лет через пять, но платить начнут сразу.`; }
    else if (id === 'burn') { const s = D.sec[a]; if (a === 'throne' || !Game.dmAlive(a) || Game.dmVotes() < 4 || !Game.spend()) return null; s.burned = true; D.burnedN++; D.queue = D.queue.filter(q => q.sec !== a); for (const o of Object.keys(D.sec)) if (Game.dmAlive(o)) D.sec[o].stab = clamp(D.sec[o].stab + 6); fx = { fear: 12, support: -6, fac: { faith: { a: 5 }, left: { a: -8 }, hawks: { a: 4 } }, dmSyn: ['pilot', -15] }; text = `${SECTORS[a].name}: очищение огнём. Совет одобрил, флот исполнил. Угрозы в секторе больше нет. Сектора, впрочем, тоже. В ведомости он переведён в графу «решённые вопросы».`; }
    else if (id === 'hire') { const c = 6 + D.staff[a] * 3; if (!PALATY[a] || D.staff[a] >= 5 || S.treasury < c || !Game.spend()) return null; D.staff[a]++; fx = { treasury: -c, fac: { liberals: { a: 3 } } }; text = `${PALATY[a][0]}: набран миллиард писцов. Первые полгода они будут оформлять самих себя.`; }
    else if (id === 'purge') { if (!Game.spend()) return null; const k = Object.keys(D.staff).sort((x, y) => D.staff[y] - D.staff[x])[0]; if (D.staff[k] > 1) D.staff[k]--; D.backlog = clamp(D.backlog - 26); fx = { fear: 5, fac: { liberals: { a: -9 } }, dmSyn: ['chanc', -10] }; text = `Чистка Канцелярии. Затор убавился: вместе с теми, кто его создавал. ${PALATY[k][0]} поредела.`; }
    else if (id === 'oil') { if (S.treasury < 6 || !Game.spend()) return null; D.backlog = clamp(D.backlog - Math.max(2, Math.round(9 * m('oil')))); fx = { treasury: -6, fac: { new: { a: 4 } }, dmSyn: ['gear', 4] }; text = 'Жрецы Шестерни окурили счётные машины ладаном и смазали священным маслом. Машины заработали быстрее. Жрецы уверяют, что дело в ладане.'; }
    else if (id === 'night') { if (D.nightAt === S.turn) return null; D.nightAt = S.turn; D.backlog = clamp(D.backlog - 4); fx = { support: -1, fac: { liberals: { a: -3 } } }; text = 'Объявлена ночная смена. Писцы спят за столами по очереди. Затор убавился.'; }
    else if (id === 'flatter') { if (!D.syn[a] || !Game.spend()) return null; fx = { dmSyn: [a, Math.max(2, Math.round(9 * m('fl:' + a)))] }; text = `${SYNOD[a].name} выслушан с почтением. Вы кивали четыре часа. Он оценил.`; }
    else if (id === 'gift') { if (!D.syn[a] || S.treasury < 10 || !Game.spend()) return null; fx = { treasury: -10, dmSyn: [a, Math.max(3, Math.round(14 * m('gf:' + a)))] }; text = `${SYNOD[a].name} получил в дар реликвию: фалангу святого. У святого, судя по числу таких даров, было сорок пальцев.`; }
    else if (id === 'dossier') { if (!D.syn[a] || !Game.spend()) return null; const ok = Math.random() < 0.4 + S.fear / 200; fx = ok ? { dmSyn: [a, 18], fear: 3, dmSyn2: ['inq', 4] } : { dmSyn: [a, -12], fear: 2 }; text = ok ? `Инквизиция нашла на лорда папку. ${SYNOD[a].name} теперь голосует вдумчиво.` : `Папка оказалась пустой. ${SYNOD[a].name} узнал, что её искали.`; }
    else return null;
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  dmQuarter(rep) {
    const D = Game.dm();
    // очередь Канцелярии
    for (const q of [...D.queue]) {
      if (--q.eta > 0) continue;
      D.queue.splice(D.queue.indexOf(q), 1); D.done++;
      const s = D.sec[q.sec], N = SECTORS[q.sec]; if (!Game.dmAlive(q.sec)) { rep.lines.push(`Приказ для сектора «${N.name}» дошёл. Сектора уже нет; приказ подшит к делу.`); continue; }
      if (q.type === 'crusade') { s.thr = clamp(s.thr - 30); S.army = clamp(S.army - 4); S.fac.hawks.a = clamp(S.fac.hawks.a + 4); rep.lines.push(`Крестовый поход дошёл: ${N.name}. ${pick(['Враг отброшен. Потери в пределах нормы; норму утверждали до похода.', 'Победа. Три мира спасены, один спасён слишком усердно.', 'Легионы вернулись с трофеями и новыми шрамами на доспехах. На шрамы уже навешены печати.'])}`); }
      else if (q.type === 'inq') { const her = N.kind === 'Шёпот'; s.thr = clamp(s.thr - (her ? 25 : 8)); s.stab = clamp(s.stab - 6); S.fear = clamp(S.fear + 3); rep.lines.push(`Инквизитор прибыл: ${N.name}. ${her ? 'Ересь выжжена. Вместе с кварталом, где её нашли.' : 'Ереси не нашёл, но на всякий случай кого-то сжёг.'}`); }
      else { s.stab = clamp(s.stab + 15); S.fac.left.a = clamp(S.fac.left.a + 3); rep.lines.push(`Хлебный конвой дошёл: ${N.name}. Хлеб слегка зачерствел в дороге. Ульи не жалуются.`); }
    }
    // сектора
    for (const [k, N] of Object.entries(SECTORS)) {
      const s = D.sec[k]; if (!Game.dmAlive(k)) continue;
      const soft = N.foe ? clamp(1.3 - (S.rel[N.foe] || 0) / 100, 0.5, 1.3) : clamp(1.2 - S.fear / 160, 0.6, 1.2);
      s.thr = clamp(s.thr + N.grow * 1.8 * soft * (S.diff === 'hard' ? 1.25 : S.diff === 'easy' ? 0.8 : 1) + (Math.random() * 2 - 1));
      s.stab = clamp(s.stab + (40 - s.thr) / 12 + TITHE[s.tithe][2] + (D.staff.cadre - 2) * 0.4 + (S.support - 50) / 60);
      if (s.thr >= 80 && S.turn % 2 === 0) rep.warn.push(`${N.name}: угроза (${N.kind}) у предела. Наместник шлёт астропатов; двое уже сгорели от усердия.`);
      if (s.stab <= 0) { s.lost = true; D.queue = D.queue.filter(q => q.sec !== k); S.support = clamp(S.support - 4); S.fac.hawks.a = clamp(S.fac.hawks.a - 6); D.syn.pilot.l = clamp(D.syn.pilot.l - 12); rep.warn.push(`Сектор потерян: ${N.name}. Канцелярия узнала об этом из недоимки по десятине.`); }
    }
    // машина
    if (Game.dmAlive('forge')) S.economy = clamp(S.economy + 0.6);
    D.backlog = clamp(D.backlog + 9 + D.queue.length * 2.5 + Game.dmLost() - D.staff.orders * 2 - D.staff.archive * 0.5);
    if (D.backlog >= 75 && S.turn % 3 === 0) rep.warn.push(`Затор в Канцелярии: ${Math.round(D.backlog)}%. Приказы идут на ${Game.dmDelay()} кв. дольше; десятина оседает в коридорах.`);
    if (Math.random() < D.staff.archive * 0.035) { if (Math.random() < 0.5) { S.treasury += 8; rep.lines.push('Великий архив нашёл забытую десятину за 38-е тысячелетие. С процентами: +8.'); } else { const k = pick(Object.keys(SECTORS).filter(Game.dmAlive)); D.sec[k].thr = clamp(D.sec[k].thr - 10); rep.lines.push(`Великий архив нашёл целый флот, числившийся погибшим: стоял на консервации с пометкой «до востребования». Отправлен в сектор «${SECTORS[k].name}».`); } }
    else if (D.staff.archive <= 1 && Math.random() < 0.2) { S.treasury -= 5; rep.warn.push('Великий архив потерял ведомость целого субсектора. Десятина оттуда пришла, но оприходовать её некуда: −5.'); }
    // совет
    const S6 = D.syn;
    S6.chanc.l = clamp(S6.chanc.l + (D.backlog < 35 ? 0.8 : D.backlog > 65 ? -1 : 0));
    S6.eccl.l = clamp(S6.eccl.l + (S.fac.faith.a - 50) / 40);
    S6.marsh.l = clamp(S6.marsh.l + (S.army - 55) / 40);
    S6.inq.l = clamp(S6.inq.l + (S.fear - 40) / 50);
    if (S.fac.new) S6.gear.l = clamp(S6.gear.l + (S.fac.new.a - 50) / 40);
    S6.pilot.l = clamp(S6.pilot.l + (Game.dmLost() ? -0.8 : 0.4));
    for (const m of Object.values(S6)) m.l = clamp(m.l + (50 - m.l) * 0.02 - 0.5);
    if (Game.dmVotes() < 3 && S.turn % 3 === 0) rep.warn.push(`В Святом Совете за вас ${Game.dmVotes()} из шести. Лорды всё чаще толкуют молчание Трона сами.`);
    if (Game.dmLost() >= 3 || D.sec.throne.lost) S.pendingEnd = 'collapse';
  },
  dmVoteScene() {
    const D = Game.dm(), v = Game.dmVotes();
    if (v >= 3 || S.turn < 6 || S.turn - D.voteAt < 6) return null;
    D.voteAt = S.turn;
    const foe = Object.keys(D.syn).sort((a, b) => D.syn[a].l - D.syn[b].l)[0];
    return { title: 'Иное толкование', bg: 'palace', crisis: true,
      lines: [['npc:lordk', `Святой Совет постановил: Автократор молчит не так, как утверждает регент. ${SYNOD[foe].name} слышит в молчании укор. Форма о смене регента заполнена; не хватает вашей подписи. Это формальность.`], ['police', `За вас ${v} из шести, {addr}. У меня есть папки на остальных. Не на всех. И не все толстые.`], ['defense', 'Легионы в Тронном зале. Чьи приказы они выполнят, зависит от того, кто заговорит первым.']],
      choices: [
        { text: 'Объявить, что Автократор шевельнул пальцем', chance: () => clamp(0.25 + S.fac.faith.a / 200 + S.support / 300, 0.1, 0.85), win: { fx: { dmSynAll: 14, fac: { faith: { a: 6 } }, support: 4 }, res: 'Вы указали на Трон. Жрецы пали ниц. Никто не видел движения, но никто и не решился сказать, что его не было. Совет разошёлся.' }, lose: { fx: { end: 'deposed' }, res: 'Первосвятитель подошёл к Трону, посмотрел и сказал: «Нет». Этого хватило.' } },
        { text: 'Раздать лордам миры', req: S => S.treasury >= 25, reqText: 'нужно 25 трон.', fx: { treasury: -25, economy: -3, dmSynAll: 16, fac: { oligarchs: { a: 5 } } }, res: 'Каждый лорд получил по субсектору «в кормление». Толкование молчания чудесным образом изменилось.' },
        { text: 'Велеть легионам закрыть двери', chance: () => clamp(S.army / 110 + (S.regime === 'dmwar' ? 0.15 : 0), 0.1, 0.85), win: { fx: { fear: 12, dmSynAll: 20, fac: { hawks: { a: 6 }, faith: { a: -6 } } }, res: 'Двери закрылись. Совет переголосовал в присутствии сорока воинов в доспехах. Единогласно.' }, lose: { fx: { end: 'deposed' }, res: 'Двери закрылись. Маршал посмотрел на вас, потом на Совет, и встал к Совету.' } },
      ], after: darkEnd };
  },
});

// ---------- эффекты ----------
Game.newGameHooks.push(() => {
  if (!isDomin()) return;
  Game.eraLook(); Game.dm();
  S.fac.new = S.fac.new || { s: 30, a: 50, st: 'legal' };
  Object.assign(S.fac.new, { s: 30, a: 50 });
  S.fac.left.s = 42; S.fac.liberals.s = 36; S.fac.faith.s = 44; S.fac.hawks.s = 44; S.fac.oligarchs.s = 40;
  S.fear = Math.max(S.fear, 40);
  if (!S.fl.new || !S.fl.new.leader) Game.leader('new');
});
Game.applyHooks.push((fx, ch) => {
  if (!isDomin()) return;
  const D = Game.dm();
  for (const key of ['dmSyn', 'dmSyn2']) if (fx[key] && D.syn[fx[key][0]]) { const [k, d] = fx[key]; D.syn[k].l = clamp(D.syn[k].l + d); ch.push({ k: 'fs', d, label: SYNOD[k].name, icon: '🏛️' }); }
  if (fx.dmSynAll) { for (const m of Object.values(D.syn)) m.l = clamp(m.l + fx.dmSynAll); ch.push({ k: 'fs', d: fx.dmSynAll, label: 'Святой Совет', icon: '🏛️' }); }
  if (fx.dmBack) { D.backlog = clamp(D.backlog + fx.dmBack); ch.push({ k: 'fs', d: -fx.dmBack, label: `Затор ${fx.dmBack > 0 ? 'растёт' : 'тает'}`, icon: '📜' }); }
  if (fx.dmSec) { const [k0, what, d] = fx.dmSec, ks = k0 === '*' ? Object.keys(SECTORS).filter(Game.dmAlive) : [k0]; for (const k of ks) if (Game.dmAlive(k)) D.sec[k][what] = clamp(D.sec[k][what] + d); ch.push({ k: 'fs', d: what === 'thr' ? -d : d, label: `${k0 === '*' ? 'Все сектора' : SECTORS[k0].name}: ${what === 'thr' ? 'угроза' : 'стабильность'}`, icon: '🗺️' }); }
});
Game.previewHooks.push((fx, out) => {
  if (!isDomin()) return;
  const first = [];
  if (fx.dmSyn) first.push({ icon: '🏛️', d: fx.dmSyn[1], label: 'Совет', text: `${SYNOD[fx.dmSyn[0]].name} ${sign(fx.dmSyn[1])}` });
  if (fx.dmSynAll) first.push({ icon: '🏛️', d: fx.dmSynAll, label: 'Совет', text: `весь Совет ${sign(fx.dmSynAll)}` });
  if (fx.dmBack) first.push({ icon: '📜', d: -fx.dmBack, label: 'Затор', text: `затор ${sign(fx.dmBack)}` });
  if (fx.dmSec) first.push({ icon: '🗺️', d: fx.dmSec[1] === 'thr' ? -fx.dmSec[2] : fx.dmSec[2], label: 'Сектора', text: `${fx.dmSec[0] === '*' ? 'все сектора' : SECTORS[fx.dmSec[0]].name}: ${fx.dmSec[1] === 'thr' ? 'угроза' : 'стабильность'} ${sign(fx.dmSec[2])}` });
  out.unshift(...first);
});
Game.quarterHooks.push(rep => { if (!isDomin()) return; Game.dmQuarter(rep); rep.lines = rep.lines.map(l => Game.eraText(l)); rep.warn = rep.warn.map(l => Game.eraText(l)); });
Game.incomeHooks.push(() => (isDomin() ? { label: 'Десятина с секторов', v: Game.dmIncome() } : null));
Game.incomeHooks.push(() => (isDomin() ? { label: 'Содержание Канцелярии', v: -Object.values(Game.dm().staff).reduce((a, b) => a + b, 0) } : null));
Game.coupHooks.push(() => (isDomin() ? Math.max(0, 3 - Game.dmVotes()) * 0.012 - (S.army >= 55 && S.fac.hawks.a >= 40 ? 0.012 : 0) : 0));
Game.revHooks.push(() => (isDomin() ? Object.values(Game.dm().sec).filter(s => s.tithe === 2).length * 0.006 : 0));
Game.forcedList.push(() => { if (!isDomin() || S.over || S.pendingEnd !== 'collapse') return null; return { title: 'Свечи гаснут', bg: 'night', crisis: true, lines: [['foreign', 'Связи с половиной секторов нет, {addr}. Лоцманы говорят, что маяк Трона меркнет. Раньше он не мерк.'], ['economy', 'Десятина не пришла. Вообще. Впервые за девять тысяч лет мне нечего считать.']], choices: [{ text: 'Запереть двери Тронного зала', fx: {}, res: 'Двери заперты. Снаружи ещё какое-то время стучали. Потом перестали.' }], after: darkEnd }; });
Game.forcedList.push(() => (isDomin() && !S.over ? Game.dmVoteScene() : null));
const _blocM = Game.bloc;
Game.bloc = function () { if (!isDomin()) return _blocM.call(Game); const n = Game.dmLost(); return n ? `Империя трещит: потеряно секторов ${n}` : Game.dmVotes() >= 4 ? 'Трон молчит одобрительно' : 'Трон молчит двусмысленно'; };
const _countryActsM = Game.countryActions;
Game.countryActions = function (c) { const a = _countryActsM.call(Game, c); return isDomin() ? a.filter(x => x.id === 'visit') : a; };
const _countryActM = Game.countryAction;
Game.countryAction = function (c, act) { const r = _countryActM.call(Game, c, act); if (r && isDomin() && act === 'visit') { S.fac.faith.a = clamp(S.fac.faith.a - 4); Game.dm().syn.inq.l = clamp(Game.dm().syn.inq.l - 5); r.text = `Капер сходил к чужим: ${Game.cName(c)}. Вернулся с подарками и без одного матроса. Культ и Инквизиция узнали раньше вас.`; if (S.log[0]) S.log[0].text = r.text; } return r; };
const _tabWorldM = UI.tab_world;
UI.tab_world = function () { const h = _tabWorldM.call(UI); return isDomin() ? h.replace(/<p class="lede">[\s\S]*?<\/p>/, '<p class="lede">Говорить с чужими запрещено под страхом костра. Поэтому говорит капер, у которого на это грамота трёхтысячелетней давности. Чем лучше отношения с чужими, тем медленнее они грызут свой сектор. Каждый рейс злит Культ и Великого инквизитора. С Великим Жором договориться нельзя: он не слушает, он жуёт.</p>') : h; };

// ---------- сцены ----------
const _introM = Game.introScene;
Game.introScene = function () {
  if (!isDomin()) return _introM ? _introM.call(Game) : null;
  const why = { dmnoble: 'Высокие дома выдвинули вас после сорока дней торга. Вы обошлись им в три субсектора и одну свадьбу.', dmpriest: 'Культ объявил, что Автократор указал на вас. Чем указал, если он девять тысяч лет не шевелится, жрецы не уточняют.', dmwar: 'Легионы вошли в Тронный зал и спросили, кто здесь регент. Прежний регент ответил неуверенно. Вы — уверенно.' }[S.regime];
  const lines = [
    ['narrator', `Тронный мир, ${DM_Y} год. Автократор сидит на Золотом Троне девять тысяч лет. Он не говорит, не ест и не подписывает. От его имени правит регент: тот, кто толкует молчание. ${why}`],
    ['narrator', 'В мрачном будущем есть только отчётность.'],
  ];
  for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
  lines.push(['economy', 'Империя — это шесть секторов, {addr}. Каждый платит десятину и каждый кто-нибудь грызёт. Потеряем три сектора или Тронный — и считать мне будет нечего.']);
  lines.push(['npc:scribe', 'К-канцелярия просит напомнить: приказ секторам идёт от квартала и дольше. Зависит от затора. Затор зависит от числа приказов. Мы работаем над этим противоречием с тридцать шестого тысячелетия.']);
  lines.push(['police', 'И Святой Совет. Шесть лордов. Пока большинство согласно, что Трон молчит так, как говорите вы, вы регент. Когда перестанет соглашаться — вы еретик.']);
  lines.push(['narrator', `Срок регентства — десять лет, до ${Game.endYear()} года. Для Империи это мгновение. Для вас — как получится.`]);
  return { title: 'У подножия Трона', bg: 'palace', lines };
};
const _coupM = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupM.call(Game, role);
  if (!isDomin()) return sc;
  sc.title = 'Низложение';
  sc.lines = [['narrator', 'В Тронный зал входят сорок воинов в доспехах. Пол гудит. Свечи на их наплечниках не гаснут даже на ходу.'], ['npc:colonel', 'Регент. Капитул постановил, что вы толкуете волю Трона в свою пользу. Это ересь второй степени. Снимите цепь.'], ['police', 'У нас минута, {addr}. Ересь второй степени можно оспорить. Третьей — уже нет: там сразу костёр.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Воззвать к миллиардам по всем каналам'; c0.win.res = 'Ульи встали. Триллион человек на коленях повторял ваше имя. Капитул решил, что столько еретиков сразу не бывает.'; c0.lose.res = 'Каналы молчали. Канцелярия не успела оформить заявку на эфир.';
  c1.text = 'Призвать верный легион'; c1.win.res = 'Верный легион вошёл следом. Доспехи у него были того же цвета, но печатей больше. Это решило дело.'; c1.lose.res = 'Верный легион оказался верен Трону. А Трон, как известно, молчит.';
  if (c2) { if (c2.win) c2.win.res = 'В дело вмешались чужие. Легионам пришлось срочно вспомнить, с кем они воюют на самом деле.'; if (c2.lose) c2.lose.res = 'Чужие не пришли. Обидно, но для них это тоже ересь.'; }
  if (c3) { c3.text = 'Уйти с каперами'; c3.res = 'Капер вывез вас в бочке из-под священного масла. До сих пор пахнет.'; }
  return sc;
};
const _revM = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revM.call(Game);
  if (!isDomin()) return sc;
  sc.title = 'Восстание ульев';
  sc.lines = [['narrator', 'Смена не вышла. Сначала один цех, потом улей, потом мир. Триллион человек положил инструмент. Гул, который Тронный мир слышал девять тысяч лет, стих.'], ['npc:rebel', 'Мы не еретики, регент. Мы верим в Трон. Мы не верим, что он велел урезать пайку.'], ['defense', 'Стрелять можно, {addr}. Патронов у нас меньше, чем у них людей. Я считал.']];
  if (sc.choices[2]) { sc.choices[2].text = 'Уйти с каперами'; sc.choices[2].res = 'Вы ушли нижними ярусами. Вас никто не узнал: там не знают, как выглядит регент.'; }
  return sc;
};
const ULT_M = {
  hawks: ['Легионам нужен поход, {addr}. Или они устроят его сами. Ближайшая цель — здесь.', 'Три легиона ушли «в паломничество». С флотом.'],
  oligarchs: ['Высокие дома просят снизить десятину и вернуть право суда. Иначе мы вспомним, что миры наши.', 'Шесть домов задержали десятину «до выяснения».'],
  left: ['Пайку, регент. И одну смену в сутки, а не две. Иначе встанут кузни.', 'Кузни встали. Легионы получают патроны по счёту.'],
  liberals: ['Канцелярия просит не торопить её. Иначе мы начнём работать строго по регламенту. Регламент — сорок томов.', 'Канцелярия работает по регламенту. Ваш приказ о завтраке согласуют к ужину. Следующего года.'],
  faith: ['Культ желает, чтобы толкования сверяли с кафедрой. Иначе с кафедры скажут, что Трон молчит против вас.', 'С миллиона кафедр прочли проповедь о ложных толкователях. Имён не называли. Все поняли.'],
  new: ['Жрецы Шестерни требуют кузни и неприкосновенность тайн. Иначе машины перестанут слушаться. Они нас любят.', 'Двери Тронного зала заело. Все. Жрецы молятся над ними неторопливо.'],
};
const _facUltM = Game.facUltScene;
Game.facUltScene = function (f) {
  const sc = _facUltM.call(Game, f);
  if (!isDomin()) return sc;
  const name = Game.leader(f).name, sp = sc.lines[1][0], [ask, ignoreText] = ULT_M[f] || ULT_M.left;
  sc.lines = [['narrator', `${name} поднимается по сорока тысячам ступеней. На это уходит день. Он успевает обдумать формулировки.`], [sp, ask], ['police', 'Откажете — исполнят. Уступите — завтра по ступеням пойдут остальные, {addr}.']];
  const [c0, c1, c2, c3] = sc.choices;
  c0.res = `${name} кланяется и начинает спускаться. Это тоже день.`;
  c1.text = 'Откупиться из казны'; c1.res = 'Ларец принят. Вопрос отложен.';
  c2.win.res = 'Взят Инквизицией. Обвинение — «мыслепреступление по неосторожности». Статья резиновая.'; c2.lose.res = 'Арест сделал из него мученика. Ему уже ставят свечи.';
  c3.text = 'Отказать'; c3.res = ignoreText;
  return sc;
};
const _betrayM = Game.betrayalScene;
Game.betrayalScene = function (role) {
  const sc = _betrayM.call(Game, role);
  if (!isDomin()) return sc;
  sc.title = 'Измена у Трона';
  sc.lines = [['narrator', `${S.adv[role].name} переметнулся к вашим врагам в Совете. С ним ушли печати, шифры и список тех, кого вы собирались сжечь.`], ['narrator', 'Его место займёт родич. Он предан. Доспех ему велик.']];
  sc.choices[0].text = 'Сменить печати'; sc.choices[0].res = 'Печати сменены. Старые объявлены еретическими. Всё, что ими скреплено, тоже. Канцелярия плачет.';
  return sc;
};

// ---------- толкования воли Трона ----------
const decM = (cat, d) => DECREES[cat].push({ eras: [DOMIN], ok: () => true, ...d });
decM('foreign', { id: 'dm_crusade', name: 'Автократор молчит воинственно', desc: 'Объявить Великий крестовый поход по всем рубежам сразу. Дорого, громко, легионы счастливы.', cost: '−18 трон.', ok: S => S.treasury >= 18, repeat: true, run: (S, m) => ({ fx: { treasury: -18, army: -3, dmSec: ['*', 'thr', -Math.round(9 * m)], fac: { hawks: { a: Math.round(8 * m) } }, dmSyn: ['marsh', 6] }, text: 'Поход объявлен. Флоты ушли во все стороны. Часть вернётся; так обычно и бывает.' }) });
decM('foreign', { id: 'dm_truce', name: 'Автократор молчит выжидательно', desc: 'Негласно придержать флоты и дать каперам поторговать. Чужие успокоятся; Инквизиция — нет.', cost: '', repeat: true, run: (S, m) => ({ fx: { rel: { bugai: Math.round(5 * m), dandy: Math.round(6 * m), rustdead: Math.round(5 * m) }, treasury: 6, fac: { faith: { a: -5 }, hawks: { a: -4 } }, dmSyn: ['inq', -6] }, text: 'Флоты стоят. Каперы возят. На рубежах тише. В Соборе громче.' }) });
decM('foreign', { id: 'dm_beacon', name: 'Автократор молчит ярче', desc: 'Тысяча псайкеров в топку маяка, чтобы лоцманы видели дорогу. Дом Лоцманов будет признателен.', cost: '−8 трон.', ok: S => S.treasury >= 8, repeat: true, run: (S, m) => ({ fx: { treasury: -8, economy: 2, support: -2, dmSyn: ['pilot', Math.round(10 * m)], dmBack: -4 }, text: 'Маяк разгорелся. Корабли идут быстрее. О топливе маяка в приличном обществе не говорят.' }) });
decM('social', { id: 'dm_feast', name: 'Автократор молчит милостиво', desc: 'День Восшествия: двойная пайка и час без смены. Раз в тысячелетие можно. Или чаще, если очень надо.', cost: '−12 трон.', ok: S => S.treasury >= 12, repeat: true, run: (S, m) => ({ fx: { treasury: -12, support: Math.round(7 * m), fac: { left: { a: Math.round(8 * m) } }, dmSec: ['*', 'stab', Math.round(3 * m)] }, text: 'Миллиарды получили двойную пайку. Половина не знала, что с ней делать, и отложила на чёрный день. У них все дни чёрные.' }) });
decM('social', { id: 'dm_heresy', name: 'Автократор молчит гневно', desc: 'Объявить охоту на ересь по всей Империи. Страх вырастет. Ереси почему-то тоже.', cost: '', repeat: true, run: (S, m) => ({ fx: { fear: Math.round(10 * m), support: -4, fac: { faith: { a: 5 }, left: { a: -5 }, liberals: { a: -4 } }, dmSyn: ['inq', 8], dmSec: ['hive', 'thr', -8] }, text: 'Костры горят на миллионе миров. Доносов поступило столько, что Канцелярия просит их не слать.', }) });
decM('social', { id: 'dm_saint', name: 'Автократор молчит благосклонно', desc: 'Причислить кого-нибудь к лику святых. Культ в восторге; кандидата подберут.', cost: '−6 трон.', ok: S => S.treasury >= 6, repeat: true, run: (S, m) => ({ fx: { treasury: -6, fac: { faith: { a: Math.round(9 * m) } }, support: 2, dmSyn: ['eccl', Math.round(8 * m)] }, text: 'Новый святой явлен. Мощи уже разосланы по мирам; их хватило на удивление многим.' }) });
decM('economy', { id: 'dm_forms', name: 'Автократор молчит кратко', desc: 'Великое сокращение формуляров: из сорока томов регламента оставить тридцать девять.', cost: '', once: true, run: () => ({ fx: { dmBack: -22, fac: { liberals: { a: -8 } }, dmSyn: ['chanc', -8] }, text: 'Сороковой том отменён. Канцелярия в трауре. Затор заметно убавился. Для отмены тома заполнили сорок первый.' }) });
decM('economy', { id: 'dm_tithe', name: 'Автократор молчит требовательно', desc: 'Чрезвычайный сбор со всех секторов разом. Казна наполнится, сектора зашатаются.', cost: '', repeat: true, run: (S, m) => ({ fx: { treasury: Math.round(16 * m), dmSec: ['*', 'stab', -5], fac: { oligarchs: { a: -6 }, left: { a: -4 } } }, text: 'Сбор проведён. Миры заплатили. На трёх из них после этого сменились наместники; не по вашему приказу.' }) });
decM('economy', { id: 'dm_stc', name: 'Автократор молчит изобретательно', desc: 'Экспедиция за утраченным чертежом. Жрецы Шестерни будут плакать от счастья, если найдут.', cost: '−14 трон.', ok: S => S.treasury >= 14, repeat: true, run: (S, m) => (Math.random() < 0.5 ? { fx: { treasury: -14, economy: Math.round(6 * m), fac: { new: { a: 10 } }, dmSyn: ['gear', 10] }, text: 'Чертёж найден! Это древняя машина для заваривания напитка. Жрецы плачут. Империя впервые за девять тысяч лет получила что-то новое.' } : { fx: { treasury: -14, fac: { new: { a: 3 } } }, text: 'Экспедиция вернулась с чертежом. Он оказался счётом за ремонт того, что чертили.' }) });
DEMANDS.push(
  { id: 'dm_d_b', countries: ['bugai'], eras: [DOMIN], text: () => 'Устроить Бугаям хорошую драку по уговору', fx: () => ({ army: -3, rel: { bugai: 18 }, fac: { hawks: { a: 3 } } }) },
  { id: 'dm_d_d', countries: ['dandy'], eras: [DOMIN], text: () => 'Вернуть Щёголям поющий камень из музея', fx: () => ({ rel: { dandy: 16 }, fac: { faith: { a: -5 } } }) },
  { id: 'dm_d_r', countries: ['rustdead'], eras: [DOMIN], text: () => 'Не копать на их мирах-гробницах', fx: () => ({ economy: -1, rel: { rustdead: 16 }, fac: { new: { a: -5 } } }) },
);
for (const list of Object.values(FAC_DEMANDS)) for (const d of list) if (!d.only) d.except = [...new Set([...(d.except || []), DMN])];
const dmDem = (f, id, text, k, op, v) => (FAC_DEMANDS[f] = FAC_DEMANDS[f] || []).push(Array.isArray(k) ? { id, kind: 'act', only: [DMN], text, acts: k } : { id, kind: 'budget', only: [DMN], text, k, op, v });
dmDem('left', 'm_l_ration', 'Пайки ульям поднять до 65% и выше', 'subsidy', '>=', 65); dmDem('left', 'm_l_tax', 'Трудовую десятину снизить до 40% и ниже', 'popTax', '<=', 40); dmDem('left', 'm_l_feast', 'Огласить «Автократор молчит милостиво» (толкование)', ['dec:dm_feast']);
dmDem('liberals', 'm_c_inq', 'Инквизицию урезать до 40% и ниже', 'police', '<=', 40); dmDem('liberals', 'm_c_school', 'Схолы довести до 60% и выше', 'edu', '>=', 60);
dmDem('faith', 'm_f_saint', 'Явить нового святого (толкование)', ['dec:dm_saint']); dmDem('faith', 'm_f_preach', 'Проповедь довести до 65% и выше', 'media', '>=', 65);
dmDem('oligarchs', 'm_h_tax', 'Десятину с домов снизить до 40% и ниже', 'corpTax', '<=', 40); dmDem('oligarchs', 'm_h_duty', 'Пошлину с каперов снизить до 40% и ниже', 'duty', '<=', 40);
dmDem('hawks', 'm_g_pay', 'Легионы довести до 65% и выше', 'army', '>=', 65); dmDem('hawks', 'm_g_crus', 'Объявить Великий крестовый поход (толкование)', ['dec:dm_crusade']);
dmDem('new', 'm_n_forge', 'Кузни и верфи довести до 60% и выше', 'infra', '>=', 60); dmDem('new', 'm_n_stc', 'Послать экспедицию за чертежом (толкование)', ['dec:dm_stc']);

// ---------- события ----------
const ML = ['domin'];
EVENTS.push(
  { id: 'dm_form', title: 'Форма 27-Б', bg: 'office', weight: 3, eras: ML,
    lines: [['npc:scribe', 'Л-лорд-регент, обнаружена ошибка. В форме 27-Б за 39-е тысячелетие Третий флот записан как «утрачен». Он не утрачен. Он третью тысячу лет ждёт приказа у причала. Экипажи сменились сорок поколений.'], ['economy', 'Исправить запись можно. Нужна подпись того, кто её сделал. Он умер. Нужна справка о смерти. Её выдаёт он же, по должности.']],
    choices: [
      { text: 'Исправить по форме, сколько бы ни заняло', fx: { dmBack: 8, fac: { liberals: { a: 6 } }, dmSyn: ['chanc', 6] }, res: 'Дело заведено. Флот получит приказ лет через двести. Они привыкли.' },
      { text: 'Вычеркнуть лично, без формы', fx: { dmSec: ['*', 'thr', -6], dmBack: -4, fac: { liberals: { a: -8 } }, dmSyn: ['chanc', -8] }, res: 'Вы зачеркнули слово «утрачен» собственной рукой. Три писца упали в обморок. Флот вышел в поход.' },
      { text: 'Оставить: раз записан утраченным, пусть будет', fx: { fac: { hawks: { a: -4 } } }, res: 'Флот стоит у причала. На борту уже сложилась религия ожидания приказа.' },
    ] },
  { id: 'dm_miracle', title: 'Трон мигнул', bg: 'church', weight: 2, eras: ML,
    lines: [['propaganda', 'Чудо, {addr}! Свет над Троном мигнул! Дважды! Паломники падают ниц, кафедры ждут толкования!'], ['npc:gearp', 'Это контакт. Ему девять тысяч лет. Починить можно. Но тогда чудес больше не будет.']],
    choices: [
      { text: 'Толкование: Автократор одобряет регента', fx: { support: 4, fac: { faith: { a: 6 } }, dmSynAll: 4, dmSyn: ['gear', -6] }, res: 'Толкование оглашено. Миллиарды ликуют. Архимеханик молчит: ему велели.' },
      { text: 'Починить контакт', fx: { economy: 2, fac: { new: { a: 8 }, faith: { a: -8 } }, dmSyn: ['gear', 10] }, res: 'Контакт починен. Свет ровный. Культ объявил ровный свет знаком гнева.' },
      { text: 'Толкование: Автократор требует десятины', fx: { treasury: 12, support: -3, fac: { faith: { a: -3 } } }, res: 'Десятина собрана. Первосвятитель заметил, что Трон стал мигать подозрительно в вашу пользу.' },
    ] },
  { id: 'dm_bugai', title: 'Посол, которого не звали', bg: 'palace', weight: 2, eras: ML,
    lines: [['npc:bugai', 'МЫ ПРИШЛИ ДРАТЬСЯ. НО ТУТ ОЧЕРЕДЬ. ТРИ НЕДЕЛИ СТОИМ. ВАШ ПИСЕЦ ГОВОРИТ, НАДО ФОРМУ. ДАЙ ФОРМУ.'], ['defense', 'Орда Бугаёв стоит в приёмной Канцелярии, {addr}. Им выдали талон. Они его держат. Я такого не видел.']],
    choices: [
      { text: 'Выдать форму на вторжение (сорок томов)', fx: { dmSec: ['green', 'thr', -18], rel: { bugai: 6 }, dmBack: 6 }, res: 'Бугаи заполняют форму. Третий том дался им тяжело. Вторжение отложено до конца делопроизводства.' },
      { text: 'Дать им подраться с легионом прямо в приёмной', fx: { army: -3, rel: { bugai: 12 }, fac: { hawks: { a: 6 }, liberals: { a: -6 } } }, res: 'Приёмная разрушена. Бугаи довольны и ушли. Легион доволен. Канцелярия выставила счёт обоим.' },
      { text: 'Сжечь посольство', fx: { fear: 4, rel: { bugai: -10 }, dmSec: ['green', 'thr', 8], dmSyn: ['inq', 6] }, res: 'Посольство сожжено. Бугаи восприняли это как приглашение.' },
    ] },
  { id: 'dm_relic', title: 'Сорок первый палец', bg: 'church', weight: 2, eras: ML,
    lines: [['police', 'У святого Аврелия обнаружен сорок первый палец, {addr}. Сорок хранятся в соборах. Этот продают паломникам в подулье.'], ['propaganda', 'Либо один из сорока поддельный, либо святой был богаче нас пальцами. Оба ответа опасны.']],
    choices: [
      { text: 'Признать: святость приумножает', fx: { fac: { faith: { a: 7 } }, support: 2, treasury: 4 }, res: 'Догмат о приумножении пальцев принят. Торговля реликвиями выросла вдвое.' },
      { text: 'Сжечь торговца, палец изъять', fx: { fear: 4, fac: { left: { a: -4 } }, dmSyn: ['inq', 6] }, res: 'Торговец сожжён. Палец изъят и, по слухам, уже лежит в личной коллекции инквизитора.' },
      { text: 'Пересчитать все пальцы', fx: { dmBack: 10, fac: { faith: { a: -6 }, liberals: { a: 4 } } }, res: 'Ревизия мощей начата. Первые итоги: у святого было три головы. Ревизию велено приостановить.' },
    ] },
  { id: 'dm_dandy', title: 'Провидица предупреждает', bg: 'palace', weight: 2, eras: ML,
    lines: [['npc:dandy', 'Я видела сорок нитей будущего. В тридцати девяти вы меня не слушаете. Это тридцать девятая, судя по вашему лицу.'], ['foreign', 'Она говорит, что на Шёлковый предел идёт беда, и предлагает помощь. За услугу. Какую, скажет потом. Они всегда говорят потом.']],
    choices: [
      { text: 'Принять помощь', fx: { dmSec: ['silk', 'thr', -20], rel: { dandy: 10 }, fac: { faith: { a: -6 } }, dmSyn: ['inq', -8] }, res: 'Беда обошла предел стороной. Провидица кивнула и сказала: «Запомните, вы должны». Что именно, выяснится в сороковой нити.' },
      { text: 'Отказать: с чужими не договариваются', fx: { fac: { faith: { a: 5 } }, rel: { dandy: -8 }, dmSec: ['silk', 'thr', 8] }, res: 'Провидица вздохнула: «Тридцать девятая». И ушла, не дожидаясь, пока её выведут.' },
      { text: 'Арестовать и расспросить о будущем подробнее', chance: () => 0.35, win: { fx: { dmSec: ['*', 'thr', -6], fear: 3 }, res: 'Она рассказала многое. Часть сбылась. Часть она, похоже, придумала назло.' }, lose: { fx: { rel: { dandy: -16 }, dmSec: ['silk', 'thr', 14] }, res: 'В камере нашли её плащ и записку: «Это я тоже видела».' } },
    ] },
  { id: 'dm_gear', title: 'Машина хочет отпуск', bg: 'office', weight: 2, eras: ML,
    lines: [['npc:gearp', 'Главная счётная машина Канцелярии просит отдыха. Она считает десятину шесть тысяч лет. Сегодня она вывела на ленте слово «хватит».'], ['economy', 'Машины не просят, {addr}. Но эта, должен признать, выразилась ясно.']],
    choices: [
      { text: 'Дать машине квартал отдыха', fx: { treasury: -8, dmBack: 8, fac: { new: { a: 8 } }, dmSyn: ['gear', 8] }, res: 'Машину выключили и накрыли парчой. Писцы считают на пальцах. Через квартал она включилась и вывела «спасибо».' },
      { text: 'Провести обряд усмирения', fx: { dmBack: -6, fac: { new: { a: -6 } }, dmSyn: ['gear', -6] }, res: 'Машину окурили и ударили куда следует. Она считает дальше. На каждой сотой ленте печатает «хватит» мелким шрифтом.' },
      { text: 'Спросить, что ещё она думает', chance: () => 0.5, win: { fx: { economy: 4, dmBack: -10 }, res: 'Машина за ночь выдала сорок лент с предложениями. Три разумны. Остальные — стихи.' }, lose: { fx: { fear: 3, fac: { faith: { a: -5 } }, dmSyn: ['inq', -6] }, res: 'Машина ответила, что думает об Автократоре. Ленту сожгли. Инквизитор интересуется, кто задал вопрос.' } },
    ] },
  { id: 'dm_recruit', title: 'Набор в легион', bg: 'square', weight: 2, eras: ML,
    lines: [['npc:marine', 'Легиону нужны рекруты. Из тысячи мальчиков доспех получит один. Остальные… послужат иначе. Дайте мир для набора.'], ['defense', 'Обычно дают улей. Там не заметят убыли. Там вообще ничего не замечают.']],
    choices: [
      { text: 'Отдать под набор улей', fx: { army: 6, fac: { hawks: { a: 6 }, left: { a: -6 } }, dmSec: ['hive', 'stab', -6] }, res: 'Набор проведён. Улей стал тише на сорок тысяч голосов.' },
      { text: 'Отдать под набор мир Высокого дома', fx: { army: 7, fac: { hawks: { a: 8 }, oligarchs: { a: -10 } } }, res: 'Сыновья лордов надели доспехи. Лорды улыбаются на приёмах и точат что-то под столом.' },
      { text: 'Отказать: людей и так не хватает', fx: { fac: { hawks: { a: -7 } }, dmSyn: ['marsh', -6] }, res: 'Брат-капитан развернулся. Пол под ним обиженно гудел до самых дверей.' },
    ] },
  { id: 'dm_lost', title: 'Нашёлся сектор', bg: 'office', weight: 2, eras: ML, minTurn: 6,
    lines: [['npc:scribe', 'В-великий архив нашёл субсектор. Сорок миров. Числились в графе «прочее» с 37-го тысячелетия. Они всё это время платили десятину. Она лежит в подвале. Подвал полон.'], ['economy', 'Вопрос в том, чья она. По форме — ничья. По совести — тоже.']],
    choices: [
      { text: 'В казну', fx: { treasury: 18, fac: { liberals: { a: -3 } } }, res: 'Подвал опустошён. Миры извещены, что их наконец заметили. Они расстроились: при «прочем» жилось спокойнее.' },
      { text: 'Половину в казну, половину лордам Совета', fx: { treasury: 9, dmSynAll: 5 }, res: 'Половина оприходована. Вторая разошлась по Совету «на нужды толкования». Архив подтвердит, что её не было.' },
      { text: 'Вернуть мирам как милость Трона', fx: { support: 5, dmSec: ['*', 'stab', 4], fac: { oligarchs: { a: -4 } } }, res: 'Десятина возвращена. Миры не поняли, что это, и на всякий случай прислали её обратно. С процентами.' },
    ] },
);

// ---------- хроника ----------
const HISTORY_M = [
  { at: [DM_Y, 1], head: 'У Трона новый регент', text: 'Святой Совет утвердил нового толкователя воли Автократора. Автократор не возражал.', fx: {} },
  { at: [DM_Y, 4], head: 'Бугаи выбрали главного', text: 'На Зелёном рубеже новый главбугай. Избран обычным порядком: остался стоять последним.', fx: { dmSec: ['green', 'thr', 8] } },
  { at: [DM_Y + 1, 3], head: 'Варп-шторм отрезал окраину', text: 'Связи с Глухой окраиной нет. Канцелярия продолжает слать туда циркуляры: порядок есть порядок.', fx: { dmSec: ['deep', 'stab', -8], dmBack: 5 } },
  { at: [DM_Y + 2, 2], head: 'Юбилей войны', text: 'Сорок веков войны. Объявлены торжества.', choice: { lines: [['propaganda', 'Юбилей, {addr}! Чем отметим сорок веков непрерывной победы?']], choices: [
    { text: 'Парадом на всех мирах', fx: { treasury: -10, support: 4, fac: { hawks: { a: 6 } } }, res: 'Миллион парадов. На одном из миров парад случайно взял столицу; вернули.' },
    { text: 'Минутой молчания, как у Автократора', fx: { fac: { faith: { a: 6 } }, support: 1 }, res: 'Империя молчала минуту. Выработка за эту минуту не упала: молчат там и так.' },
    { text: 'Никак: война ещё не кончилась', fx: { fear: 2, fac: { hawks: { a: -3 } } }, res: 'Торжества отменены. Канцелярия перенесла их на пятидесятый век.' },
  ] } },
  { at: [DM_Y + 3, 4], head: 'Проснулась гробница', text: 'В Кузнечных мирах под фундаментом главной кузни проснулись Ржавые Династии. Требуют убрать кузню: она стоит на их спальне.', fx: { dmSec: ['forge', 'thr', 14] } },
  { at: [DM_Y + 5, 2], head: 'Великий Жор сменил курс', text: 'Рой повернул. Куда, станет ясно, когда перестанет отвечать очередной мир.', fx: { dmSec: ['deep', 'thr', 12] } },
  { at: [DM_Y + 6, 3], head: 'Раскол в Культе', text: 'Половина жрецов учит, что Автократор молчит, потому что всё сказал. Вторая — что ещё не начинал. Дошло до костров.', fx: { fac: { faith: { a: -6 } }, dmSyn: ['eccl', -8], dmSec: ['throne', 'stab', -5] } },
  { at: [DM_Y + 8, 1], head: 'Канцелярия закрыла дело', text: 'Завершено рассмотрение жалобы, поданной в 32-м тысячелетии. Заявителю отказано. Заявитель — вымершая цивилизация.', fx: { dmBack: -4 } },
  { at: [DM_Y + 9, 2], head: 'Срок регентства истекает', text: 'Совет готовится утверждать толкователя на следующий срок. Кандидатов шесть. Все в Совете.', fx: { dmSynAll: -4 } },
];

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (!isDomin()) return;
  const D = Game.dm(), lost = Game.dmLost();
  const T = {
    deposed: ['Еретик второй степени', 'Совет истолковал молчание Трона без вас. Цепь регента сняли вместе с вами. Костра не было: вторая степень. Вас постригли и отправили в монастырь на ледяной луне переписывать регламент Канцелярии. Сорок томов. Вы на втором.'],
    collapse: ['Свечи погасли', 'Сектора отпадали один за другим, пока десятина не перестала приходить вовсе. Империя не рухнула: она просто перестала отвечать на письма. Вы сидите в Тронном зале. Автократор молчит. Теперь вам кажется, что он молчит именно о вас.'],
    coup: ['Низложен', 'Капитул признал ваши толкования ересью. Вас заточили в келье под Троном. Сквозь потолок слышно, как новый регент объясняет, что Автократор всегда его любил.'],
    revolution: ['Ульи встали', 'Триллион человек поднялся по сорока тысячам ступеней. Они прошли мимо вас к Трону, посмотрели на Автократора и разошлись по сменам. Вас они не заметили. Это обиднее всего.'],
    exile: ['В бочке из-под масла', 'Каперы высадили вас на вольной станции. Здесь никто не кланяется и все торгуют с чужими. Вы открыли лавку реликвий. Пальцы святого Аврелия идут хорошо.'],
    helicopter: ['В бочке из-под масла', 'Каперы вывезли вас в бочке и высадили на первой же станции. За провоз взяли цепь регента: больше у вас ничего не было. На станции цепь уже продаётся; подлинность никто не оспаривает.'],
    retired: ['Сложил цепь', 'Вы сложили цепь регента сами. Такого не случалось шесть тысяч лет, и формы для этого нет. Канцелярия до сих пор числит вас регентом. Жалованье приходит.'],
  }[type];
  if (T) { E.title = T[0]; E.text = T[1]; }
  if (type === 'survived') {
    E.title = lost === 0 && D.burnedN === 0 ? 'Хранитель миллиона миров' : D.burnedN >= 2 ? 'Регент решённых вопросов' : D.backlog <= 20 ? 'Регент, победивший затор' : 'Десять лет у Трона';
    E.text = `${Game.endYear() - 1} год. Срок истёк, а вы всё ещё у подножия Трона. ` + (lost === 0 ? 'Все шесть секторов на месте. Хронисты ищут, в чём подвох.' : `Секторов осталось ${6 - lost} из шести${D.burnedN ? `; ${D.burnedN} из потерянных вы сожгли сами, «во избежание»` : ''}.`)
      + ` Затор в Канцелярии: ${Math.round(D.backlog)}%. Приказов, дошедших до адресата: ${D.done}. В Совете за вас ${Game.dmVotes()} из шести.`
      + ' Автократор молчит. Вы объявили, что одобрительно. Возражений не поступило; форма для возражений утеряна.';
  }
  verdicts.length = 0;
  verdicts.push(`Секторов удержано: ${6 - lost} из 6`); if (D.burnedN) verdicts.push(`Очищено огнём: ${D.burnedN}`);
  verdicts.push(`Затор Канцелярии: ${Math.round(D.backlog)}%`); verdicts.push(`Голосов в Совете: ${Game.dmVotes()} из 6`); verdicts.push(`Приказов дошло: ${D.done}`);
});

// ---------- вестник ----------
const _pressPageM = UI.pressPage;
UI.pressPage = async function (news) {
  if (!isDomin()) return _pressPageM.call(UI, news);
  const ch = [], D = Game.dm();
  for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) ch.push(...Game.apply(fx)); Game.log('Весть: ' + h.head); }
  const worst = Object.keys(SECTORS).filter(Game.dmAlive).sort((a, b) => D.sec[b].thr - D.sec[a].thr)[0];
  const off = [['С рубежей', worst ? `${SECTORS[worst].name}: ${D.sec[worst].thr >= 60 ? 'тяжёлые бои' : 'бои местного значения'}. Победа неизбежна; сроки уточняются.` : 'Рубежей не осталось.'],
    ['Мысль дня', pick(['Сомнение — первый шаг к ереси. Второй шаг делать уже не дадут.', 'Счастлив тот, чья смена кончается.', 'Незнание — добродетель. Знание — в сорока томах.', 'Молись, работай, заполняй.'])],
    ['Объявления', pick(['Канцелярия ищет писца, потерянного в четвёртом архивном ярусе. Особые приметы: седой, заполняет.', 'Продам доспех, б/у, три владельца, все геройски.', 'Утерян мир. Нашедшего просят вернуть в Палату назначений.', 'Жрецы Шестерни напоминают: если не работает, ударьте. Если работает, не трогайте.'])]];
  if (!news.length && S.turn % 2) return;
  await Modal.open(`<div class="rm-np dm-np">
      <div class="rm-np-mast">Вестник Домината</div>
      <div class="rm-np-date">Тронный мир · ${S.q}-я четверть ${S.year} года · читать вслух, стоя</div>
      ${news.map((h, i) => `<article class="${i ? '' : 'lead'}"><h3>${esc(h.head)}</h3><p>${esc(Game.fmt(h.text))}</p></article>`).join('')}
      <div class="rm-np-off">${off.map(([t, x]) => `<div><b>${esc(t)}</b><p>${esc(x)}</p></div>`).join('')}</div>
      ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
    </div>`, news.some(h => Game.histChoice(h)) ? 'Что молчит Трон?' : 'Дальше', 'wide');
};

// ---------- вкладки ----------
const dmBtn = (id, name, cost, ok, free, danger) => `<button class="btn small ${danger ? 'danger-o' : ''}" data-act="${id}" ${!ok || S.phase !== 'hub' || (!free && S.ap <= 0) ? 'disabled' : ''}>${esc(name)}${cost ? `<small>${esc(cost)}</small>` : ''}</button>`;
const dmMap = () => {
  const D = Game.dm(); let s = `<svg viewBox="0 0 300 300" class="dm-map" role="img" aria-label="Карта Домината"><rect width="300" height="300" fill="#0c090a"/>`;
  for (let i = 0; i < 60; i++) s += `<circle cx="${(i * 97 + 31) % 300}" cy="${(i * 61 + 17) % 300}" r="${i % 7 ? 0.7 : 1.3}" fill="#c9a640" opacity="${0.25 + (i % 4) * 0.12}"/>`;
  for (const k of Object.keys(SECTORS)) if (k !== 'throne') s += `<path d="M150 150 L${SECTORS[k].x} ${SECTORS[k].y}" stroke="${Game.dmAlive(k) ? '#6a5a3a' : '#2a2020'}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  for (const [k, N] of Object.entries(SECTORS)) { const c = D.sec[k], col = c.burned ? '#1a1414' : c.lost ? '#3a3030' : c.stab >= 55 ? '#6f8a5a' : c.stab >= 30 ? '#c98a2a' : '#9a2f2a', r = k === 'throne' ? 20 : 15;
    s += `<circle cx="${N.x}" cy="${N.y}" r="${r}" fill="${col}" stroke="#c9a640" stroke-width="${k === 'throne' ? 2.5 : 1.3}" opacity="${Game.dmAlive(k) ? 1 : 0.6}"/>`;
    if (Game.dmAlive(k) && c.thr >= 50) s += `<circle cx="${N.x}" cy="${N.y}" r="${r + 5 + c.thr / 12}" fill="none" stroke="#c1272d" stroke-width="1.6" stroke-dasharray="3 3" class="hs-blink"/>`;
    if (D.queue.some(q => q.sec === k)) s += `<path d="M${N.x + r - 2} ${N.y - r + 2} l8 -8 m-8 0 l8 8" stroke="#e9dcb8" stroke-width="1.6"/>`;
    s += `<text x="${N.x}" y="${N.y + r + 12}" text-anchor="middle" class="dm-m-t">${c.burned ? '† ' : c.lost ? '✕ ' : ''}${N.name}</text>`; }
  return s + `<path d="M144 143 H156 M150 143 V158 M145 158 H155" stroke="#16100f" stroke-width="2.5"/></svg>`;
};
Object.assign(UI, {
  tab_sectors() {
    const D = Game.dm(), delay = Game.dmDelay(), votes = Game.dmVotes();
    const sec = k => { const N = SECTORS[k], c = D.sec[k], q = D.queue.filter(x => x.sec === k);
      if (!Game.dmAlive(k)) return `<article class="card dm-sec gone"><header><div><h3>${esc(N.name)}</h3><span class="muted small">${c.burned ? 'очищен огнём · вопрос решён' : 'потерян · десятина не поступает'}</span></div></header><p class="muted small">${esc(N.text)}</p></article>`;
      return `<article class="card dm-sec ${c.thr >= 60 ? 'hot' : ''}"><header><div><h3>${esc(N.name)}</h3><span class="muted small">угроза: ${esc(N.kind)} · десятина +${Game.dmSecIncome(k).toFixed(1).replace('.', ',')} за квартал</span></div></header>
        <p class="muted small">${esc(N.text)}</p>
        ${UI.meter('Стабильность', c.stab, c.stab >= 55 ? 'good' : c.stab >= 30 ? 'warn' : 'bad')}${UI.meter('Угроза', c.thr, c.thr >= 60 ? 'bad' : c.thr >= 35 ? 'warn' : 'good')}
        <div class="sh-seg">${TITHE.map((t, i) => `<button class="jp-pos ${c.tithe === i ? 'on' : ''}" data-act="dm:tithe:${k}:${i}" ${c.tithe === i || c.titheAt === S.turn || S.phase !== 'hub' ? 'disabled' : ''}>${t[0]}<small>десятина</small></button>`).join('')}</div>
        ${q.length ? `<p class="small"><b>В пути:</b> ${q.map(x => `${DISPATCH[x.type][0].toLowerCase()} (ещё ${x.eta} кв.)`).join(', ')}</p>` : ''}
        <div class="acts">${Object.entries(DISPATCH).map(([t, d]) => dmBtn(`dm:send:${k}:${t}`, d[0], q.some(x => x.type === t) ? 'уже в пути' : `−${d[1]} трон. · ${d[2]}`, S.treasury >= d[1] && !q.some(x => x.type === t))).join('')}${k === 'throne' ? '' : dmBtn(`dm:burn:${k}`, 'Очищение огнём', votes >= 4 ? 'сектора не станет · страх +12' : 'нужно 4 голоса в Совете', votes >= 4, false, true)}</div></article>`; };
    return `<p class="lede">Доминат — это шесть секторов. Каждый платит десятину, и каждый кто-нибудь грызёт. Растёт угроза — падает стабильность; упадёт до нуля — сектор потерян. Три потерянных сектора или потеря Тронного — конец Империи.</p>
      <div class="cr"><section class="card hs-holo-card dm-map-card">${dmMap()}</section>
        <section class="card" style="flex:1.3"><div class="eyebrow">Империя</div><h2 class="rm-rank">Десятина: +${String(Game.dmIncome()).replace('.', ',')} за квартал</h2>
          <p>Секторов в строю: <b>${6 - Game.dmLost()} из 6</b> · приказов в пути: <b>${D.queue.length}</b> · приказ идёт <b>${delay} кв.</b></p>
          <p class="muted small">Крестовый поход, инквизитор и хлебный конвой не приходят сразу: приказ идёт через Канцелярию. Чем больше затор, тем дольше. Угрозу от чужих можно ослабить тайными рейсами капера (вкладка «Чужие»), ересь — страхом. Десятина меняется без приказа: щадящая успокаивает сектор, двойная шатает.</p>
          <p class="muted small">Очищение огнём снимает угрозу вместе с сектором. Нужны четыре голоса в Совете. Тронный сектор сжечь нельзя: в нём вы.</p></section></div>
      <div class="em-lands mt">${Object.keys(SECTORS).map(sec).join('')}</div>`;
  },
  tab_machine() {
    const D = Game.dm(), eff = Game.dmEff();
    const pal = k => `<article class="card"><header><div><h3>${esc(PALATY[k][0])}</h3><span class="muted small">писцов: ${'▮'.repeat(D.staff[k])}${'▯'.repeat(5 - D.staff[k])} (${D.staff[k]} млрд)</span></div></header><p class="muted small">${esc(PALATY[k][1])}</p><div class="acts">${dmBtn(`dm:hire:${k}`, 'Набрать писцов', D.staff[k] >= 5 ? 'больше не влезет' : `−${6 + D.staff[k] * 3} трон.`, D.staff[k] < 5 && S.treasury >= 6 + D.staff[k] * 3)}</div></article>`;
    return `<p class="lede">Империей правит не Трон и не регент. Империей правит Канцелярия: десять миллиардов писцов и регламент в сорока томах. Через неё идёт каждый ваш приказ и каждая монета десятины. Она не враг. Она просто медленная. Очень.</p>
      <div class="cr"><section class="card" style="flex:1.2"><div class="eyebrow">Состояние машины</div>
          ${UI.meter('Затор', D.backlog, D.backlog >= 70 ? 'bad' : D.backlog >= 40 ? 'warn' : 'good')}
          <p><b>Доходит десятины: ${Math.round(eff * 100)}%</b> · приказ секторам идёт <b>${Game.dmDelay()} кв.</b> · в очереди: ${D.queue.length}</p>
          <p class="muted small">Затор растёт сам, от каждого приказа в очереди и от каждого потерянного сектора. Тает от Палаты приказов и архива. Выше 40 приказы идут на квартал дольше, выше 75 — ещё на один. Магистр Канцелярии в Совете судит о вас по этой шкале.</p>
          <div class="acts">${dmBtn('dm:oil', 'Освятить счётные машины', '−6 трон. · затор −', S.treasury >= 6)}${dmBtn('dm:night', 'Ночная смена', D.nightAt === S.turn ? 'уже объявлена' : 'без приказа · затор −4, писцы ропщут', D.nightAt !== S.turn, true)}${dmBtn('dm:purge', 'Чистка Канцелярии', 'затор −26, страх +5, одна палата редеет', true, false, true)}</div></section>
        <section class="card cr-side"><div class="eyebrow">Очередь приказов</div>${D.queue.length ? D.queue.map(q => `<p class="small">${esc(DISPATCH[q.type][0])} → ${esc(SECTORS[q.sec].name)} · ещё ${q.eta} кв.</p>`).join('') : '<p class="muted small">Очередь пуста. Писцы встревожены: такое бывает перед бурей.</p>'}<p class="muted small">Содержание палат: ${Object.values(D.staff).reduce((a, b) => a + b, 0)} трон. за квартал.</p></section></div>
      <div class="grid mt">${Object.keys(PALATY).map(pal).join('')}</div>`;
  },
  tab_synod() {
    const D = Game.dm(), v = Game.dmVotes();
    const lord = k => { const L = SYNOD[k], m = D.syn[k];
      return `<article class="card ${m.l >= 50 ? 'dm-yes' : 'dm-no'}"><header><div><h3>${esc(L.name)}</h3><span class="muted small">${esc(L.who)}${L.home === S.regime ? ' · ваш человек' : ''}</span></div><span class="chip ${m.l >= 50 ? 'coopted' : 'banned'}">${m.l >= 50 ? 'за вас' : 'против'}</span></header>
        ${UI.meter('Расположение', m.l, m.l >= 50 ? 'good' : m.l >= 35 ? 'warn' : 'bad')}<p class="muted small">${esc(L.tip)}.</p>
        <div class="acts">${dmBtn(`dm:flatter:${k}`, 'Выслушать с почтением', 'расположение +', true)}${dmBtn(`dm:gift:${k}`, 'Поднести реликвию', '−10 трон.', S.treasury >= 10)}${dmBtn(`dm:dossier:${k}`, 'Найти на него папку', 'риск · зависит от страха', true)}</div></article>`; };
    return `<p class="lede">Автократор молчит. Что именно он молчит, решает Святой Совет: шесть лордов, каждый из которых слышит в тишине своё. Пока большинство слышит то же, что и вы, вы регент.</p>
      <section class="card"><div class="eyebrow">Толкование</div><h2 class="rm-rank">За вас ${v} из 6 · ${esc(Game.bloc())}</h2>
        <p class="muted small">За вас те, чьё расположение не ниже 50. Четыре голоса — можно всё, включая очищение секторов огнём. Меньше трёх — Совет соберётся толковать молчание без вас, и придётся выкручиваться: чудом, подкупом или легионами. Каждый лорд судит по своему: кто по затору, кто по вере, кто по числу уцелевших секторов.</p></section>
      <div class="em-lands mt">${Object.keys(SYNOD).map(lord).join('')}</div>`;
  },
});
const _tabCabM = UI.tab_cabinet;
UI.tab_cabinet = function () {
  const h = _tabCabM.call(UI);
  if (!isDomin()) return h;
  const D = Game.dm();
  return h.replace(/У власти ([\d.,]+) г\./, `У Трона $1 г. Секторов: ${6 - Game.dmLost()} из 6. Затор: ${Math.round(D.backlog)}%. В Совете за вас ${Game.dmVotes()} из 6.`);
};
const dmText = s => (typeof s === 'string' ? s.replace(/млн/g, 'трон.') : s);
const _renderM = UI.render;
UI.render = function () {
  _renderM.call(UI);
  if (!isDomin()) return;
  const set = (t, name) => { const b = document.querySelector(`.tabs button[data-tab="${t}"]`); if (b) b.textContent = name; return b; };
  set('cabinet', 'Тронный зал'); set('factions', 'Сословия'); set('decrees', 'Толкования'); set('world', 'Чужие'); set('advisors', 'Ближние лорды'); set('log', 'Хроника');
  const D = Game.dm(), sb = document.querySelector('.tabs button[data-tab="sectors"]'), yb = document.querySelector('.tabs button[data-tab="synod"]'), mb = document.querySelector('.tabs button[data-tab="machine"]');
  if (sb) sb.classList.toggle('alert', Object.keys(SECTORS).some(k => Game.dmAlive(k) && (D.sec[k].thr >= 70 || D.sec[k].stab < 25)));
  if (yb) { yb.textContent = `Святой Совет (${Game.dmVotes()}/6)`; yb.classList.toggle('alert', Game.dmVotes() < 3); }
  if (mb) mb.classList.toggle('alert', D.backlog >= 75);
  const root = document.querySelector('#screen-game');
  if (root) { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let nd; while ((nd = w.nextNode())) if (nd.nodeValue.includes('млн')) nd.nodeValue = nd.nodeValue.replace(/млн/g, 'трон.'); }
};
const _modalOpenM = Modal.open;
Modal.open = function (html, ...rest) { return _modalOpenM.call(Modal, isDomin() ? dmText(html) : html, ...rest); };
const _toastM = UI.toast;
UI.toast = function (text, ...rest) { return _toastM.call(UI, isDomin() ? dmText(text) : text, ...rest); };
const DIFF_M = { easy: ['Тихое тысячелетие', 'Три приказа, чужие ленивее, казна полнее.'], normal: ['Обычное тысячелетие', 'Два приказа. Война как война.'], hard: ['Чёрный крестовый век', 'Угрозы растут быстрее, денег меньше. Итог ×1,4.'] };
const _renderSetupM = UI.renderSetup;
UI.renderSetup = function () {
  _renderSetupM.call(UI);
  if (!UI.setup || UI.setup.era !== DOMIN) return;
  const root = document.querySelector('#screen-setup'), heads = [...root.querySelectorAll('.sec-h')], st = UI.setup;
  root.querySelector('h1').textContent = 'Сектор 02: империя тысячи солнц';
  ['Эпоха', '1. Держава', '2. От кого вы регент', '3. Имя и облик', '4. Сложность'].forEach((n, i) => { if (heads[i]) heads[i].textContent = n; });
  root.querySelector('label[for="setup-title"]').textContent = 'Титул';
  document.querySelector('#btn-begin').textContent = 'Принять регентство';
  for (const m of root.querySelectorAll('#setup-regions .pick-meta')) m.textContent = `Вечный Доминат · ${DM_Y}–${DM_Y + 9} годы`;
  for (const b of root.querySelectorAll('[data-diff]')) { const d = DIFF_M[b.dataset.diff]; if (d) { b.querySelector('.pick-name').textContent = d[0]; b.querySelector('.pick-desc').textContent = d[1]; } }
  const dbg = document.querySelector('#dk-debug'); if (dbg) dbg.hidden = true;
  const inp = document.querySelector('#setup-name');
  if (Object.values(DM_NAMES).includes(st.name) && st.name !== DM_NAMES[st.regime]) { st.name = DM_NAMES[st.regime]; if (inp) inp.value = st.name; UI.renderSetupPortrait(); }
};
UI.actionHandlers.push(id => {
  if (!/^dm:/.test(id)) return false;
  if (S.phase !== 'hub') return true;
  const p = id.split(':'), out = Game.dmAct(p[1], p[2], p[3]);
  if (out) { UI.render(); if (out.text) UI.toast(out.text, out.changes); }
  return true;
});
