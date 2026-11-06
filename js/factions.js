// Движения: лидеры-персонажи, требования, опора режима и новые движения по ходу игры.
const LEADER_TRAITS = {
  fanatic: { name: 'Фанатик', desc: 'Подкуп не берёт, переговоры даются тяжело. Арест превратит лидера в мученика.', talk: 0.5, bribe: 0, bribeCost: 1, martyr: 0.55, coopt: 55, fail: 1.5 },
  merchant: { name: 'Торгаш', desc: 'Всё имеет цену: подкуп дешевле и действует сильнее.', talk: 0.9, bribe: 1.4, bribeCost: 0.6, martyr: 0.15, coopt: 40, fail: 1 },
  vain: { name: 'Позёр', desc: 'Обожает внимание: переговоры работают лучше, а орден на грудь творит чудеса.', talk: 1.4, bribe: 1, bribeCost: 1, martyr: 0.3, coopt: 40, fail: 1 },
  coward: { name: 'Трус', desc: 'Можно припугнуть. Мучеников из трусов не выходит.', talk: 1, bribe: 1, bribeCost: 1, martyr: 0, coopt: 40, fail: 0.8 },
  pragmatic: { name: 'Прагматик', desc: 'Охотно идёт во власть: места в правительстве и министерский пост доступны раньше.', talk: 1.1, bribe: 1, bribeCost: 1, martyr: 0.2, coopt: 25, fail: 1 },
  firebrand: { name: 'Горлопан', desc: 'Движение под ним растёт быстрее, а сорванные требования он не прощает.', talk: 0.8, bribe: 1, bribeCost: 1, martyr: 0.35, coopt: 45, fail: 1.4, grow: 0.6 },
};
// Пол персонажей: явное поле female, а для старых сохранений — по имени
const FEMALE_MARKS = /^(Госпожа|Мадам|Принцесса|Тётушка|Тётя|Леди|Мисс|Миссис|Донья|Сеньора|Сеньорита|Племянница|Кузина|Сестра|Тёща|Бабушка|Первая леди)(?=\s|$)/;
const FEMALE_NAMES = new Set(['Аделаида', 'Лейла', 'Гульшат', 'Розалия', 'Глория', 'Малина', 'Мария', 'Исабель', 'Долорес', 'Кармен', 'Лупе', 'Росарио', 'Эсперанса', 'Пилар', 'Малай', 'Суда', 'Ратана', 'Кесини', 'Пим', 'Дуангчай', 'Дуангчан', 'Амината', 'Грас', 'Жозефина', 'Фату', 'Мириам', 'Адаэзе', 'Клементина', 'Ванда', 'Ядвига', 'Божена', 'Злата', 'Милена', 'Ирена', 'Хелена', 'Найла', 'Рания', 'Фатима', 'Хиба', 'Самира', 'Дина', 'Гульнара', 'Динара', 'Айгерим', 'Зарина', 'Мадина', 'Нигора', 'Сабина', 'Консуэло', 'Мали', 'Мариам']);
function isFemale(p) {
  if (!p) return false;
  if (p.female !== undefined) return !!p.female;
  const n = String(p.name || p);
  if (FEMALE_MARKS.test(n)) return true;
  if (/^(Принц|Генерал|Полковник|Майор|Капитан|Дон|Сеньор|Господин|Пан|Граф|Шейх|Кузен|Шурин|Племянник|Зять|Брат|Дядя|Месье|Мистер|Сэр|Барон|Кхун)(?=\s|$)/.test(n)) return false;
  return n.split(/[\s«»]+/).some(w => FEMALE_NAMES.has(w));
}
// Окончание по полу: gnd(персонаж, 'пришёл', 'пришла')
const gnd = (p, m, f) => (isFemale(p) ? f : m);
const NAME_POOLS = {
  latam: { m: ['Хуан', 'Мигель', 'Рафаэль', 'Эрнесто', 'Карлос', 'Луис', 'Педро', 'Альфонсо', 'Мануэль', 'Хорхе'], f: ['Мария', 'Исабель', 'Долорес'], last: ['Мендоса', 'Рохас', 'Вальдес', 'Перальта', 'Сальседо', 'Кинтана', 'Ортега', 'Фуэнтес', 'Бустаманте', 'Арагон'] },
  asia: { m: ['Сомпонг', 'Прича', 'Вират', 'Ананд', 'Тхонг', 'Суван', 'Чалерм', 'Бунчу', 'Прасит', 'Кхиеу'], f: ['Малай', 'Суда', 'Ратана'], last: ['Сукхом', 'Чайпорн', 'Вонгсават', 'Ракпхон', 'Сриват', 'Кхамфан', 'Пхумсак', 'Сингтхонг', 'Чантхара', 'Тхеппхитак'] },
  africa: { m: ['Жан-Пьер', 'Мамаду', 'Кофи', 'Ибрагим', 'Альфонс', 'Патрис', 'Эммануэль', 'Жозеф', 'Феликс', 'Агостинью'], f: ['Амината', 'Грас', 'Жозефина'], last: ['Мбала', 'Кабонго', 'Диалло', 'Нзузи', 'Окафор', 'Мусонда', 'Ндиайе', 'Лукенгу', 'Банда', 'Квеку'] },
  europe: { m: ['Ян', 'Станислав', 'Михал', 'Богдан', 'Вацлав', 'Ежи', 'Тадеуш', 'Милош', 'Радек', 'Казимир'], f: ['Ванда', 'Ядвига', 'Божена'], last: ['Ковальчик', 'Новак', 'Горский', 'Земан', 'Вуйцик', 'Петрович', 'Свобода', 'Дворжак', 'Яворский', 'Крал'] },
  mideast: { m: ['Ахмед', 'Халид', 'Юсуф', 'Самир', 'Омар', 'Тарик', 'Махмуд', 'Наджиб', 'Фуад', 'Рашид'], f: ['Лейла', 'Найла', 'Рания'], last: ['аль-Масри', 'Джабер', 'Насралла', 'аль-Хашими', 'Саллам', 'Азиз', 'Бакри', 'Каббани', 'Таха', 'Мансур'] },
  steppe: { m: ['Ерлан', 'Бахтияр', 'Нурлан', 'Азамат', 'Тимур', 'Рустам', 'Данияр', 'Ильхом', 'Фарход', 'Шавкат'], f: ['Гульнара', 'Динара', 'Айгерим'], last: ['Оспанов', 'Каримов', 'Юсупов', 'Абдуллаев', 'Сейткали', 'Рахимов', 'Есенов', 'Турсунов', 'Назаров', 'Мамедов'] },
};
const FAITH_TITLE = { catholic: 'Архиепископ', orthodox: 'Митрополит', buddhist: 'Настоятель', chief: 'Вождь', islam: 'Муфтий', evangelical: 'Пастор' };
const RICH_TITLE = { latam: 'Дон', europe: 'Граф', asia: 'Принц', africa: 'Месье', mideast: 'Шейх', steppe: 'Бай' };
const FAC_RIVALS = { left: ['oligarchs', 'hawks'], liberals: ['hawks'], faith: ['left'], oligarchs: ['left'], hawks: ['liberals', 'left'], new: [] };
const DEFAULT_PILLARS = { junta: ['hawks', 'oligarchs'], revolution: ['left', 'liberals'], western: ['oligarchs', 'hawks'], putsch: ['hawks', 'oligarchs'], estado: ['faith', 'oligarchs'], front: ['left', 'liberals'], heir: ['oligarchs', 'hawks'], reformer: ['liberals', 'oligarchs'], strongman: ['hawks', 'faith'] };

// Новые движения, которые появляются по ходу десятилетия
// Таблицы для эпох: LEADER_STYLE[регион][движение] = { title: строка | (female) => строка, look: {...} | (female) => {...} }
const LEADER_STYLE = {};
const NEW_FACTIONS = {
  '1930': { name: 'Зелёные рубашки', short: 'Рубашки', icon: '🟩', desc: 'Ультранационалисты в одинаковых рубашках. Маршируют, поют и считают, что вы слишком мягкий. Дружат с офицерами.', rivals: ['left', 'liberals'], risk: 'coup', appear: S => S.year >= 1933, intro: 'По столице прошёл первый марш молодчиков в зелёных рубашках. У них есть вождь, барабаны и большие планы на вашу должность.' },
  '1960': { name: 'Новые левые и хиппи', short: 'Хиппи', icon: '☮️', desc: 'Студенты с гитарами, длинными волосами и цитатами Маркузе. Против войны, против денег, против вас. Но в основном — за музыку.', rivals: ['oligarchs', 'faith', 'hawks'], risk: 'rev', appear: S => S.year >= 1966, intro: 'В кампусах появилось новое движение: длинные волосы, гитары, лозунги «Занимайтесь любовью, а не войной». Ваши генералы не понимают, что это такое.' },
  '2000': { name: 'Сетевые активисты', short: 'Сеть', icon: '🌐', desc: 'Блогеры-эмигранты, анонимные каналы и хакеры. У них нет офиса, но есть миллион подписчиков.', rivals: ['hawks'], risk: 'rev', appear: S => (S.net || 0) >= 15 || S.year >= 2005, intro: 'Анонимный блог «Правда о дворце» собрал миллион читателей за месяц. Вокруг него выросло целое движение, у которого нет ни офиса, ни устава. Только Wi-Fi.' },
};

// Требования движений. kind: budget (ползунок), act (указ или действие), flag (состояние), pay (выполнить сразу, 1 приказ)
const FAC_DEMANDS = {
  left: [
    { id: 'l_sub', kind: 'budget', k: 'subsidy', op: '>=', v: 65, text: 'Поднять субсидии на хлеб до 65% и выше', except: ['centralasia00'] },
    { id: 'l_land', kind: 'flag', test: S => S.flags.landReform, text: 'Провести земельную реформу (указ «Земельная реформа»)', except: ['centralasia00', 'mideast00'] },
    { id: 'l_nat', kind: 'flag', test: S => S.flags.nationalized, text: 'Национализировать иностранную компанию', cond: S => !S.flags.nationalized, except: ['centralasia00'] },
    { id: 'l_house', kind: 'act', acts: ['dec:housing'], text: 'Издать указ «Квартира каждой семье»', except: ['centralasia00'] },
    { id: 'l_tax', kind: 'budget', k: 'popTax', op: '<=', v: 40, text: 'Снизить налоги с населения до 40% и ниже', except: ['centralasia00'] },
    { id: 'e_pol', kind: 'budget', k: 'police', op: '<=', v: 40, text: 'Урезать спецслужбы до 40% и ниже', only: ['centralasia00'] },
    { id: 'e_media', kind: 'budget', k: 'media', op: '<=', v: 35, text: 'Прекратить травлю в госСМИ (пропаганда до 35% и ниже)', only: ['centralasia00'] },
    { id: 'e_ret', kind: 'pay', text: 'Гарантировать эмигрантам безопасное возвращение', fx: { fear: -4, fac: { hawks: { a: -5 } } }, only: ['centralasia00'] },
    { id: 'm_corr', kind: 'act', acts: ['dec:anticorr'], text: 'Начать кампанию против коррупции', only: ['mideast00', 'africa00'] },
    { id: 'r_vet', kind: 'pay', text: 'Выплатить пенсии ветеранам гражданской войны', fx: { treasury: -12 }, only: ['africa00'] },
    { id: 'l_amn', kind: 'act', acts: ['dec:amnesty'], text: 'Объявить амнистию политзаключённых' },
  ],
  liberals: [
    { id: 'b_pol', kind: 'budget', k: 'police', op: '<=', v: 40, text: 'Урезать тайную полицию до 40% и ниже', except: ['europe30'] },
    { id: 'b_media', kind: 'budget', k: 'media', op: '<=', v: 35, text: 'Урезать пропаганду до 35% и ниже', except: ['europe30'] },
    { id: 'p_tax', kind: 'budget', k: 'popTax', op: '<=', v: 40, text: 'Снизить налоги с крестьян (налоги с населения до 40% и ниже)', only: ['europe30'] },
    { id: 'p_roads', kind: 'budget', k: 'infra', op: '>=', v: 60, text: 'Провести дороги к деревням (дороги и порты до 60% и выше)', only: ['europe30'] },
    { id: 'p_land', kind: 'flag', test: S => S.flags.landReform, text: 'Раздать крестьянам помещичью землю (указ «Земельная реформа»)', only: ['europe30'] },
    { id: 'b_edu', kind: 'budget', k: 'edu', op: '>=', v: 65, text: 'Поднять образование до 65% и выше' },
    { id: 'b_amn', kind: 'act', acts: ['dec:amnesty'], text: 'Объявить амнистию политзаключённых' },
    { id: 'b_lit', kind: 'act', acts: ['dec:literacy'], text: 'Начать кампанию всеобщей грамотности', cond: S => !S.used.includes('dec:literacy') },
    { id: 'b_net', kind: 'budget', k: 'netctl', op: '<=', v: 0, text: 'Оставить интернет свободным (без фильтров)', eras: ['2000'] },
  ],
  faith: [
    { id: 'f_health', kind: 'budget', k: 'health', op: '>=', v: 60, text: 'Поднять здравоохранение до 60% и выше' },
    { id: 'f_pens', kind: 'act', acts: ['dec:pensions'], text: 'Повысить пенсии' },
    { id: 'f_hosp', kind: 'act', acts: ['dec:hospital'], text: 'Построить больницу' },
    { id: 'f_gift', kind: 'pay', text: () => ({ buddhist: 'Пожертвовать на ремонт монастырей', chief: 'Выделить деньги на подарки старейшинам', islam: 'Пожертвовать на ремонт мечетей', evangelical: 'Построить стадион для воскресных проповедей' })[REGIONS[S.region].faithStyle] || 'Пожертвовать на ремонт храмов', fx: { treasury: -12 } },
    { id: 'f_absurd', kind: 'pay', text: 'Публично покаяться за абсурдные указы', fx: { support: -2, loy: { propaganda: -4 } }, cond: S => S.used.some(u => u.startsWith('dec:') && DECREES.absurd.some(d => 'dec:' + d.id === u)) },
  ],
  oligarchs: [
    { id: 'o_corp', kind: 'budget', k: 'corpTax', op: '<=', v: 35, text: 'Снизить налоги с компаний до 35% и ниже' },
    { id: 'o_duty', kind: 'budget', k: 'duty', op: '<=', v: 35, text: 'Снизить экспортную пошлину до 35% и ниже' },
    { id: 'o_priv', kind: 'act', acts: ['dec:privatize'], text: 'Провести приватизацию госпредприятий' },
    { id: 'o_sez', kind: 'act', acts: ['dec:sez'], text: 'Открыть свободную экономическую зону', cond: S => !S.used.includes('dec:sez') },
    { id: 'o_prop', kind: 'pay', text: 'Дать гарантии собственности', fx: { fac: { left: { a: -6 } } } },
  ],
  hawks: [
    { id: 'h_army', kind: 'budget', k: 'army', op: '>=', v: 70, text: 'Поднять бюджет армии до 70% и выше' },
    { id: 'h_drill', kind: 'act', acts: ['dec:drills'], text: 'Провести пограничные учения' },
    { id: 'h_arms', kind: 'act', acts: ['arms'], text: 'Закупить оружие за границей' },
    { id: 'h_rank', kind: 'pay', text: 'Повысить офицеров в звании', fx: { treasury: -10 } },
    { id: 'h_parade', kind: 'act', acts: ['adv:defense'], text: 'Устроить военный парад' },
  ],
  new: [
    { id: 'n_media', kind: 'budget', k: 'media', op: '>=', v: 65, text: 'Поднять пропаганду до 65% и выше', eras: ['1930'] },
    { id: 'n_march', kind: 'pay', text: 'Разрешить факельный марш через центр', fx: { fear: 3, fac: { liberals: { a: -8 }, left: { a: -6 } } }, eras: ['1930'] },
    { id: 'n_fest', kind: 'pay', text: 'Разрешить рок-фестиваль', fx: { fac: { faith: { a: -6 }, hawks: { a: -3 } } }, eras: ['1960'] },
    { id: 'n_edu', kind: 'budget', k: 'edu', op: '>=', v: 65, text: 'Поднять образование до 65% и выше', eras: ['1960'] },
    { id: 'n_free', kind: 'budget', k: 'netctl', op: '<=', v: 0, text: 'Снять фильтры с интернета', eras: ['2000'] },
    { id: 'n_amn', kind: 'act', acts: ['dec:amnesty'], text: 'Освободить арестованных блогеров (амнистия)', eras: ['2000'] },
    { id: 'n_amn60', kind: 'act', acts: ['dec:amnesty'], text: 'Освободить арестованных студентов (амнистия)', eras: ['1960'] },
  ],
};

Object.assign(Game, {
  facDef(f) { return REGIONS[S.region].factions[f]; },
  attachNewFaction() { const nf = NEW_FACTIONS[S.era]; if (nf) REGIONS[S.region].factions.new = nf; },
  facState(f) { S.fl = S.fl || {}; return (S.fl[f] = S.fl[f] || {}); },
  isPillar(f) { return (S.pillars || []).includes(f); },
  makeLeader(f, bias) {
    const R = REGIONS[S.region], st = R.style, pool = NAME_POOLS[S.region] || NAME_POOLS[st] || NAME_POOLS.latam;
    const female = f === 'liberals' || f === 'new' ? Math.random() < 0.3 : f === 'left' ? Math.random() < 0.15 : false;
    const used = new Set(Object.values(S.fl || {}).map(x => x.leader && x.leader.last).filter(Boolean));
    const free = pool.last.filter(l => !used.has(l));
    const first = pick(female ? pool.f : pool.m), base0 = pick(free.length ? free : pool.last);
    const last = female ? (/(ов|ев|ин)$/.test(base0) ? base0 + 'а' : /ский$/.test(base0) ? base0.replace(/ский$/, 'ская') : base0) : base0;
    const traits = Object.keys(LEADER_TRAITS);
    const trait = bias === 'radical' ? pick(['fanatic', 'firebrand', 'fanatic']) : bias === 'moderate' ? pick(['pragmatic', 'merchant', 'coward']) : pick(traits);
    const LEFT00 = { africa00: 'Генерал', mideast00: 'Устаз', centralasia00: 'Экс-министр' };
    const title48 = S.era === '1905' ? { left: S.region === 'balkan05' ? (female ? 'Учительница' : 'Аграрий') : S.region === 'himal05' ? 'Староста' : (female ? 'Вдова ныряльщика' : 'Вожак'), liberals: S.region === 'gulf05' || S.region === 'himal05' ? (female ? 'Учительница' : pick(S.region === 'gulf05' ? ['Мирза', 'Учитель'] : ['Учитель', 'Чиновник'])) : pick(['Профессор', 'Доктор', 'Адвокат']), new: female ? 'Курсистка' : 'Студент', hawks: S.region === 'gulf05' ? 'Шейх' : 'Полковник' } : S.era === '1980' ? { left: S.region === 'east80' ? 'Профсоюзный лидер' : S.region === 'asia80' ? 'Товарищ' : 'Команданте', liberals: S.region === 'east80' ? pick(['Профессор', female ? 'Писательница' : 'Писатель', 'Доктор']) : pick(['Профессор', 'Доктор', 'Адвокат']), new: 'Правозащитник' } : S.era === '1848' ? { left: st === 'latam' ? (female ? 'Касика' : 'Касик') : (female ? 'Гражданка' : 'Гражданин'), new: 'Капитан', ...(st === 'latam' ? { hawks: 'Генерал' } : {}) } : {};
    const title = title48[f] || { left: S.era === '2000' ? (LEFT00[S.region] || 'Лидер оппозиции') : st === 'latam' ? 'Команданте' : 'Товарищ', liberals: S.era === '2000' ? pick(['Блогер', 'Журналист', 'Адвокат']) : pick(['Профессор', 'Доктор', 'Адвокат']), faith: FAITH_TITLE[R.faithStyle] || 'Отец', oligarchs: RICH_TITLE[S.region] || RICH_TITLE[st] || 'Господин', hawks: S.era === '1980' && S.regime === 'party80' && S.region !== 'east80' ? 'Команданте' : 'Полковник', new: S.era === '2000' ? 'Блогер' : S.era === '1930' ? 'Вождь' : 'Товарищ' }[f];
    const skin = f === 'oligarchs' && (st === 'africa') && Math.random() < 0.4 ? SKIN.light : SKIN[R.leaderSkin];
    const H = ['#1a1410', '#2b1b10', '#3a2a1a', '#555', '#999'];
    const base = { skin, face: pick(['oval', 'round', 'square', 'long']), hairColor: pick(H), brows: trait === 'fanatic' || trait === 'firebrand' ? 'angry' : trait === 'coward' ? 'worried' : 'normal', mouth: trait === 'vain' ? 'grin' : trait === 'merchant' ? 'smirk' : trait === 'coward' ? 'o' : 'flat', sweat: trait === 'coward' };
    let look;
    if (female) look = { ...base, hair: pick(['bun', 'long']), mustache: 'none', earring: true, glasses: pick(['none', 'round', 'square']), outfit: f === 'left' ? 'military' : 'suit', outfitColor: pick(['#5a2a3a', '#2a4a7a', '#3a5a3a']), tie: 'none' };
    else if (f === 'hawks') look = { ...base, hair: 'short', hat: pick(['cap', 'beret', 'kepi']), hatColor: '#3d4a2a', mustache: pick(['thick', 'pencil', 'none']), glasses: pick(['none', 'aviator']), outfit: 'military', outfitColor: '#3d4a2a', medals: 3 + Math.floor(Math.random() * 6) };
    else if (f === 'left') look = { ...base, hair: pick(['curly', 'short', 'long']), hat: pick(['beret', 'flatcap', 'none']), hatColor: '#1a1a1a', beard: pick(['full', 'goatee', 'none']), mustache: pick(['thick', 'none']), outfit: S.era === '2000' ? 'hoodie' : 'military', outfitColor: '#556b2f', cigar: st === 'latam' && Math.random() < 0.5 };
    else if (f === 'liberals') look = { ...base, hair: pick(['slick', 'combover', 'curly']), glasses: pick(['round', 'square']), mustache: pick(['none', 'pencil']), beard: pick(['none', 'goatee']), outfit: S.era === '2000' ? pick(['suit', 'hoodie']) : 'suit', outfitColor: '#4a4a44', tie: '#2a6fdb' };
    else if (f === 'faith') look = (npcLook('priest', S.region) || {}).look || { ...base, hair: 'bald', outfit: 'robe', outfitColor: '#1d1d1d' };
    else if (f === 'oligarchs') look = { ...base, hair: pick(['slick', 'bald', 'combover']), hat: pick(['top', 'fedora', 'none']), hatColor: '#222', mustache: pick(['walrus', 'handlebar', 'pencil']), glasses: pick(['monocle', 'none']), outfit: 'suit', outfitColor: '#1d1d22', tie: '#d6a63a', cigar: Math.random() < 0.5, blush: true };
    else look = { ...base, hair: pick(['slick', 'long', 'curly']), mustache: pick(['thick', 'none']), outfit: S.era === '1930' ? 'military' : 'hoodie', outfitColor: S.era === '1930' ? '#3f6b2e' : '#3a3a4a', glasses: S.era === '2000' ? 'square' : 'none' };
    if (f === 'faith') look = { ...look, brows: base.brows, mouth: base.mouth };
    // Профсоюзник и номенклатура в соцлагере, крестьяне и горожане XIX века — без военной формы и цилиндров
    if (f === 'left') {
      const civ = { east80: { outfit: 'suit', outfitColor: pick(['#4a4a44', '#3a4048', '#5a4a3a']), tie: 'none', hat: 'none', beard: 'none', mustache: female ? 'none' : 'thick', cigar: false },
        balkan05: { outfit: 'blouse', outfitColor: '#e8e0cc', hat: female ? 'none' : 'flatcap', cigar: false },
        himal05: { outfit: 'robe', outfitColor: '#7a3a2a', trim: '#d6a63a', hat: 'none', cigar: false },
        gulf05: { outfit: 'robe', outfitColor: '#e8e0cc', trim: '#8a6a3a', hat: female ? 'hijab' : 'keffiyeh', beard: female ? 'none' : 'full', cigar: false },
        german48: { outfit: 'blouse', outfitColor: '#3a4a6a', hat: female ? 'none' : 'flatcap', cigar: false },
        italy48: { outfit: 'blouse', outfitColor: '#5a3a2a', hat: female ? 'none' : 'flatcap', cigar: false },
        latam48: { outfit: 'poncho', outfitColor: '#8a5a2a', hat: female ? 'none' : 'gaucho', hatColor: '#4a3a2a', cigar: false } }[S.region];
      if (civ) look = { ...look, ...civ };
    }
    if (S.region === 'gulf05' && (f === 'oligarchs' || f === 'hawks')) look = { ...look, outfit: 'robe', outfitColor: f === 'hawks' ? '#d8c8a0' : '#3a2a1a', trim: '#8a6a3a', hat: 'keffiyeh', hatColor: '#f4f1ea', glasses: 'none', beard: 'full', cigar: false, tie: 'none', medals: 0 };
    if (S.region === 'himal05' && f === 'oligarchs') look = { ...look, outfit: 'robe', outfitColor: '#7a1f2a', trim: '#d6a63a', hat: 'furhat', hatColor: '#d6a63a', glasses: 'none', cigar: false, tie: 'none' };
    if (f === 'oligarchs' && S.region === 'east80') look = { ...look, hat: 'none', glasses: pick(['square', 'none']), mustache: pick(['none', 'thick']), outfitColor: pick(['#3a3a3a', '#2a3040']), tie: pick(['#7a2a2a', '#3a3a5a']), cigar: false };
    if (S.era === '2000' && f !== 'faith') {
      const m = { hawks: { glasses: 'sport', bluetooth: Math.random() < 0.4 }, liberals: { outfit: pick(['suit2000', 'hoodie', 'polo']), shirt: '#dfe9f3', tie: 'none', glasses: pick(['rimless', 'square']), hair: pick(['gelled', 'short', 'buzz']) },
        oligarchs: { outfit: 'suit2000', shirt: pick(['#f4f1ea', '#1d1d22']), tie: pick(['none', '#d6a63a']), hat: 'none', glasses: pick(['rimless', 'sport', 'none']), bluetooth: true, hair: pick(['slick', 'bald', 'gelled']) },
        left: ({
          africa00: { outfit: 'military', outfitColor: '#4a5a3a', hat: 'beret', hatColor: '#2a2a2a', glasses: 'sport', beard: 'none', mustache: 'thick', cigar: false, medals: 2 },
          mideast00: { outfit: 'suit2000', outfitColor: '#3a3a3a', shirt: '#f4f1ea', tie: 'none', hat: 'none', beard: 'full', mustache: 'thick', glasses: pick(['none', 'rimless']), cigar: false },
          centralasia00: { outfit: 'suit2000', outfitColor: '#2a2d36', shirt: '#dfe9f3', tie: '#5a1a1a', hat: 'none', beard: 'none', mustache: 'none', glasses: 'rimless', hair: pick(['combover', 'bald', 'short']), cigar: false, bluetooth: true },
        })[S.region] || { outfit: 'suit2000', hat: 'none', cigar: false },
        new: { outfit: 'hoodie', glasses: pick(['square', 'rimless']), hair: pick(['gelled', 'long', 'buzz']), bluetooth: Math.random() < 0.5 } }[f] || {};
      look = { ...look, ...m };
    }
    const LS = (LEADER_STYLE[S.region] || {})[f];
    let ttl = title;
    if (LS) {
      if (LS.title) ttl = typeof LS.title === 'function' ? LS.title(female) : LS.title;
      if (LS.look) look = { ...look, ...(typeof LS.look === 'function' ? LS.look(female) : LS.look) };
    }
    return { name: `${ttl} ${first} ${last}`, last: base0, trait, look, since: S.turn, female };
  },
  leader(f) { const st = Game.facState(f); if (!st.leader) st.leader = Game.makeLeader(f); return st.leader; },
  trait(f) { return LEADER_TRAITS[Game.leader(f).trait]; },
  pickFacDemand(f) {
    const list = (FAC_DEMANDS[f] || []).filter(d => (!d.eras || d.eras.includes(S.era)) && (!d.only || d.only.includes(S.region)) && (!d.except || !d.except.includes(S.region)) && (!d.cond || d.cond(S)) && !Game.demandMet(d, 0));
    const d = list.length ? pick(list) : null;
    return d ? { id: d.id, since: S.turn, until: S.turn + 5 + Math.floor(Math.random() * 4) } : null;
  },
  facDemand(f) {
    const st = Game.facState(f);
    if (!st.demand || st.demand.wait !== undefined) return null;
    const d = (FAC_DEMANDS[f] || []).find(x => x.id === st.demand.id);
    return d ? { ...d, ...st.demand, text: typeof d.text === 'function' ? d.text() : d.text } : null;
  },
  demandMet(d, since) {
    if (d.kind === 'budget') return d.op === '>=' ? (S.budget[d.k] || 0) >= d.v : (S.budget[d.k] || 0) <= d.v;
    if (d.kind === 'flag') return !!d.test(S);
    if (d.kind === 'act') return d.acts.some(a => (S.facActs || {})[a] !== undefined && S.facActs[a] >= since);
    return false;
  },
  noteAct(key) { S.facActs = S.facActs || {}; S.facActs[key] = S.turn; },
  demandReward(f) { return { fac: { [f]: { a: 18 } } }; },
  demandPenalty(f) { const k = Game.trait(f).fail; return { fac: { [f]: { a: -Math.round(12 * k), s: Math.round(3 * k) } } }; },
  resolveDemand(f, ok, rep) {
    const st = Game.facState(f), D = Game.facDef(f);
    const ch = Game.apply(ok ? Game.demandReward(f) : Game.demandPenalty(f), { silent: true });
    const msg = ok ? `${D.name}: требование выполнено, одобрение растёт.` : `${D.name}: требование сорвано. ${Game.leader(f).name} обещает «запомнить это».`;
    if (rep) rep.lines.push(msg); Game.log(msg);
    st.demand = { wait: S.turn + 2 + Math.floor(Math.random() * 2) };
    return ch;
  },
  payDemand(f) {
    const d = Game.facDemand(f);
    if (!d || d.kind !== 'pay' || !Game.spend()) return null;
    Game.apply(d.fx);
    const changes = Game.resolveDemand(f, true);
    const text = `${Game.facDef(f).name}: «${d.text}» — сделано. ${Game.leader(f).name} благодарит.`;
    return { text, changes };
  },

  // Действия с движениями
  factionActions(f) {
    const F = S.fac[f], T = Game.trait(f), L = Game.leader(f);
    const d = Game.dealInfo(f), pil = Game.isPillar(f) ? 1.3 : 1;
    const eff = m => ` · эффект ${Math.round(m * 100)}%`;
    const talkM = d.mult * T.talk * pil, bribeM = d.mult * T.bribe * pil;
    const bribeCost = Math.round(d.bribeCost * T.bribeCost);
    const acts = [
      { id: 'talk', name: 'Переговоры', cost: `−${d.talkCost} млн${eff(talkM)}`, ok: S.treasury >= d.talkCost },
      { id: 'bribe', name: 'Подкупить лидера', cost: T.bribe ? `−${bribeCost} млн${eff(bribeM)}` : 'не берёт', ok: T.bribe > 0 && S.treasury >= bribeCost },
    ];
    if (L.trait === 'vain') acts.push({ id: 'medal', name: 'Наградить орденом', cost: '−2 млн', ok: S.treasury >= 2 });
    if (L.trait === 'coward') acts.push({ id: 'scare', name: 'Припугнуть лидера', cost: 'страх ↑', ok: true });
    if (F.st === 'legal') acts.push({ id: 'coopt', name: 'Места в правительстве', cost: `одобрение ≥ ${T.coopt}`, ok: F.a >= T.coopt });
    if (F.st !== 'banned') acts.push(L.female && Game.noFemaleMinisters() ? { id: 'hire', name: 'Сделать лидера министром', cost: 'женщину министром не утвердят', ok: false } : { id: 'hire', name: 'Сделать лидера министром', cost: `одобрение ≥ ${T.coopt + 10}`, ok: F.a >= T.coopt + 10 });
    if (F.st !== 'banned') acts.push({ id: 'ban', name: 'Запретить', cost: 'страх ↑', ok: true, danger: true });
    else acts.push({ id: 'legalize', name: 'Легализовать', cost: '', ok: true });
    acts.push({ id: 'arrest', name: 'Арестовать лидера', cost: `мученик ${Math.round(T.martyr * 100)}%`, ok: true, danger: true });
    return acts;
  },
  factionAction(f, act) {
    const F = S.fac[f], D = Game.facDef(f), nm = D.name, T = Game.trait(f), L = Game.leader(f), st = Game.facState(f);
    if (act === 'hire') return null; // через сцену выбора должности
    if (!Game.spend()) return null;
    const pil = Game.isPillar(f) ? 1.3 : 1;
    let fx = {}, text = '';
    const rivals = {};
    switch (act) {
      case 'talk': {
        const d = Game.dealInfo(f);
        fx = { treasury: -d.talkCost, fac: { [f]: { a: Math.round(12 * d.mult * T.talk * pil) } } };
        for (const r of FAC_RIVALS[f] || []) if (S.fac[r]) rivals[r] = { a: -4 };
        text = L.trait === 'fanatic' ? `${L.name} слушает вас с каменным лицом. «Мы не торгуемся с тиранами». Но кое-что, кажется, запоминает.`
          : L.trait === 'vain' ? `${L.name} в восторге от приглашения во дворец. Фотографируется на фоне трона.`
            : d.n ? `Снова переговоры с движением «${nm}». ${L.name} вежливо кивает, но уже без прежнего восторга.` : `Переговоры с движением «${nm}» прошли в тёплой обстановке. ${L.name} пьёт ваш кофе и улыбается.`;
        Game.noteDeal(f); break;
      }
      case 'bribe': {
        const d = Game.dealInfo(f);
        const cost = Math.round(d.bribeCost * T.bribeCost);
        fx = { treasury: -cost, fac: { [f]: { a: Math.round(18 * d.mult * T.bribe * pil) } } };
        text = L.trait === 'merchant' ? `${L.name} пересчитывает конверт, улыбается и предлагает «сотрудничать и дальше». Деловой человек.` : `${L.name} принимает конверт и заметно смягчает тон.`;
        Game.noteDeal(f); break;
      }
      case 'medal':
        fx = { treasury: -2, fac: { [f]: { a: Math.round(10 * Game.dealInfo('medal:' + f).mult) } } };
        Game.noteDeal('medal:' + f);
        text = `${L.name} теперь кавалер ордена «За заслуги перед Отечеством». Орден не снимается даже в бане.`; break;
      case 'scare':
        fx = { fear: 3, fac: { [f]: { s: -6, a: -4 } } };
        text = `К лидеру движения «${nm}» домой зашли двое в плащах. Просто поговорить. Наутро все митинги отменены.`; break;
      case 'coopt':
        fx = { fac: { [f]: { a: 20, s: 5 } } };
        for (const r of FAC_RIVALS[f] || []) if (S.fac[r]) rivals[r] = { a: -10 };
        F.st = 'coopted';
        text = `Движение «${nm}» получило места в правительстве. Портфели пустые, но кожаные.`; break;
      case 'ban': {
        F.st = 'banned';
        S.pillars = (S.pillars || []).filter(x => x !== f);
        fx = { fear: 6, fac: { [f]: { s: -15, a: -35 } } };
        const extra = { left: { rel: Game.leftBanRel() }, liberals: { rel: { $west: -6 }, support: -3 }, faith: { support: -8 }, oligarchs: { economy: -8, rel: { usa: -8, $patron: -6 } }, hawks: { army: -12 }, new: { support: -2 } }[f] || {};
        Object.assign(fx, extra, { fac: fx.fac });
        if (Math.random() < 0.5) { st.leader = Game.makeLeader(f, 'radical'); text = `Движение «${nm}» запрещено. В подполье им теперь руководит ${st.leader.name}. Новый лидер радикальнее прежнего.`; }
        else text = `Движение «${nm}» запрещено указом №${Math.floor(rnd(100, 999))}. Его лидеры ушли в подполье.`;
        break;
      }
      case 'legalize':
        F.st = 'legal';
        fx = { fear: -3, fac: { [f]: { a: 15 } } };
        text = `Движение «${nm}» снова легально. ${L.name} выходит из подполья, щурясь на солнце.`; break;
      case 'arrest': {
        const old = L.name;
        if (Math.random() < T.martyr) {
          fx = { fear: 4, support: -2, fac: { [f]: { s: 8, a: -15 } } };
          st.leader = Game.makeLeader(f, 'radical');
          text = `Арест обернулся против вас: портреты арестованного лидера (${old}) на каждом заборе, а во главе движения теперь ${st.leader.name}. ${LEADER_TRAITS[st.leader.trait].name}.`;
        } else {
          fx = { fear: 4, fac: { [f]: { s: -8 * S.adv.police.comp, a: -12 } } };
          st.leader = Game.makeLeader(f, Math.random() < 0.5 ? 'moderate' : null);
          text = `${old} — под арестом с рассвета. Во главе движения теперь ${st.leader.name}: ${LEADER_TRAITS[st.leader.trait].name.toLowerCase()}.`;
        }
        break;
      }
    }
    if (Object.keys(rivals).length) fx.fac = { ...fx.fac, ...rivals };
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  hireScene(f) {
    const L = Game.leader(f), D = Game.facDef(f), T = LEADER_TRAITS[L.trait];
    const roleFor = { hawks: 'defense', oligarchs: 'economy', faith: 'propaganda', liberals: 'foreign', left: 'economy', new: 'propaganda' }[f];
    const choices = Object.keys(ROLES).map(r => ({
      text: `${ROLES[r].title} (сейчас: ${S.adv[r].name})${r === roleFor ? ' (подходит лучше всего)' : ''}`,
      fx: { ap: -1, hire: { f, role: r }, fac: { [f]: { a: 25 } } },
      res: `${L.name} приносит присягу и занимает пост: ${ROLES[r].title.toLowerCase()}. ${S.adv[r].name} уходит в отставку и, кажется, не очень расстраивается.`,
    }));
    choices.push({ text: 'Передумать', fx: {}, res: 'Вы передумали. Приказ не потрачен.' });
    return {
      title: `Министерский пост для лидера движения`, bg: 'office',
      lines: [
        ['npc:facleader:' + f, `${Game.fmt('{Addr}')}, служить вам — честь. Но только на настоящей должности, а не на пустом стуле в углу.`],
        ['police', `${L.name}, ${T.name.toLowerCase()}. ${T.desc} Подумайте, какое министерство вы готовы доверить этому человеку. Само движение «${D.name}» после этого будет вас любить.`],
      ],
      choices,
    };
  },
  doHire(f, role) {
    const L = Game.leader(f), D = Game.facDef(f), T = LEADER_TRAITS[L.trait];
    const old = S.adv[role];
    if (role === 'defense' && f !== 'hawks') { S.army = clamp(S.army - 5); S.fac.hawks.a = clamp(S.fac.hawks.a - 10); }
    S.adv[role] = { name: L.name, bio: `Бывший лидер движения «${D.name}». ${T.name}: ${T.desc}`, look: L.look, loy: { fanatic: 45, merchant: 55, vain: 70, coward: 75, pragmatic: 65, firebrand: 50 }[L.trait], comp: { fanatic: 0.8, merchant: 1, vain: 0.7, coward: 0.6, pragmatic: 1.1, firebrand: 0.8 }[L.trait], relative: false, fromFac: f };
    S.fac[f].st = 'coopted';
    for (const r of FAC_RIVALS[f] || []) if (S.fac[r]) S.fac[r].a = clamp(S.fac[r].a - 8);
    Game.facState(f).leader = Game.makeLeader(f, 'moderate');
    Game.log(`${L.name} теперь в правительстве: ${ROLES[role].title.toLowerCase()}. ${old.name} в отставке. Во главе движения «${D.name}» теперь ${Game.leader(f).name}.`);
  },
  togglePillar(f) {
    S.pillars = S.pillars || [];
    if (Game.isPillar(f)) {
      S.pillars = S.pillars.filter(x => x !== f);
      const changes = Game.apply({ fac: { [f]: { a: -15 } } });
      const text = `Движение «${Game.facDef(f).name}» больше не опора режима. Его лидеры чувствуют себя преданными.`;
      Game.log(text); return { text, changes };
    }
    if (S.pillars.length >= 2 || !Game.spend()) return null;
    S.pillars.push(f);
    const rivals = {}; for (const r of FAC_RIVALS[f] || []) if (S.fac[r]) rivals[r] = { a: -6 };
    const changes = Game.apply({ fac: { [f]: { a: 10 }, ...rivals } });
    const text = `Движение «${Game.facDef(f).name}» объявлено опорой режима. Его лидеры получили пропуска во дворец, соперники — повод для обиды.`;
    Game.log(text); return { text, changes };
  },
});

// Записываем действия игрока, чтобы засчитывать требования
const _decree = Game.decree, _eco = Game.economyAction, _country = Game.countryAction, _adv = Game.advisorAction;
Game.decree = (cat, id) => { const r = _decree(cat, id); if (r) Game.noteAct('dec:' + id); return r; };
Game.economyAction = id => { const r = _eco(id); if (r) Game.noteAct('eco:' + id); return r; };
Game.countryAction = (c, act) => { const r = _country(c, act); if (r) Game.noteAct(act); return r; };
Game.advisorAction = (role, act) => { const r = _adv(role, act); if (r && act === 'act') Game.noteAct('adv:' + role); return r; };

// Хуки
Game.applyHooks.push(fx => { if (fx.hire) Game.doHire(fx.hire.f, fx.hire.role); });
Game.previewHooks.push((fx, out) => { if (fx.hire) out.push({ icon: '🪪', d: 1, label: 'Новый министр', text: 'новый министр' }); });
Game.newGameHooks.push(() => {
  S.fl = {}; S.facActs = {};
  S.pillars = [...(DEFAULT_PILLARS[S.regime] || ['hawks', 'oligarchs'])];
  Game.attachNewFaction();
  Object.keys(S.fac).sort(() => Math.random() - 0.5).forEach((f, i) => { Game.leader(f); Game.facState(f).demand = { wait: 1 + i * 2 }; });
});
Game.quarterHooks.push(rep => {
  Game.attachNewFaction();
  let newThisQ = 0;
  for (const f of Object.keys(S.fac).sort(() => Math.random() - 0.5)) {
    const F = S.fac[f], st = Game.facState(f), T = Game.trait(f);
    // опора режима
    if (Game.isPillar(f)) F.a = clamp(F.a + 0.6); else F.a = clamp(F.a - 0.2, 0, F.st === 'banned' ? 35 : 100);
    if (T.grow) F.s = clamp(F.s + T.grow);
    // требования
    const d = Game.facDemand(f);
    if (d) {
      if (d.kind !== 'pay' && Game.demandMet(d, d.since)) Game.resolveDemand(f, true, rep);
      else if (S.turn + 1 > d.until) Game.resolveDemand(f, false, rep);
    } else if (!st.demand || (st.demand.wait !== undefined && S.turn + 1 >= st.demand.wait)) {
      // не больше двух требований одновременно и не больше одного нового за квартал
      const active = Object.keys(S.fac).filter(x => Game.facDemand(x)).length;
      if (active >= 2 || newThisQ >= 1) { st.demand = { wait: S.turn + 2 + Math.floor(Math.random() * 2) }; continue; }
      const nd = Game.pickFacDemand(f); if (nd) { st.demand = nd; newThisQ++; rep.lines.push(`Новое требование движения «${Game.facDef(f).name}»: «${Game.facDemand(f).text}».`); }
    }
  }
  // новое движение
  const nf = NEW_FACTIONS[S.era];
  if (nf && S.fac.new) {
    const N = S.fac.new;
    N.s = clamp(N.s + (S.era === '2000' ? (S.net || 0) / 40 : S.era === '1930' ? (S.economy < 45 ? 1 : 0.3) + Game.war().level / 200 : 0.5 + S.fac.liberals.s / 200));
  }
});
Game.coupHooks.push(() => {
  let r = 0;
  for (const f of S.pillars || []) if (['hawks', 'oligarchs'].includes(f) && S.fac[f] && S.fac[f].a < 30) r += 0.06;
  if (S.fac.new && NEW_FACTIONS[S.era] && NEW_FACTIONS[S.era].risk === 'coup') r += S.fac.new.s / 100 * Math.max(0, 55 - S.fac.new.a) / 100 * 0.4;
  return r;
});
Game.revHooks.push(() => {
  let r = 0;
  for (const f of S.pillars || []) if (['left', 'liberals', 'faith'].includes(f) && S.fac[f] && S.fac[f].a < 30) r += 0.05;
  if (S.fac.new && NEW_FACTIONS[S.era] && NEW_FACTIONS[S.era].risk === 'rev') r += S.fac.new.s / 100 * Math.max(0, 50 - S.fac.new.a) / 100 * (S.era === '2000' ? 0.25 : 0.15);
  return r;
});
Game.forcedList.push(() => {
  const nf = NEW_FACTIONS[S.era];
  if (!nf || S.fac.new || !nf.appear(S)) return null;
  Game.attachNewFaction();
  S.fac.new = { s: 18, a: 40, st: 'legal' };
  Game.leader('new'); Game.facState('new').demand = { wait: S.turn + 1 };
  Game.log(`Появилось новое движение: ${nf.name}.`);
  return { title: `Новое движение: ${nf.name}`, bg: 'square', lines: [['narrator', nf.intro], ['npc:facleader:new', 'Мы — будущее этой страны. Вы можете быть с нами или против нас. Третьего не дано.'], ['police', `Это ${Game.leader('new').name}. ${LEADER_TRAITS[Game.leader('new').trait].name}. Движение пока небольшое, но растёт. На них уже заведена папка.`]] };
});
// портрет лидера движения в сценах
const _speaker = VN.speakerInfo;
VN.speakerInfo = who => {
  if (who.startsWith('npc:facleader:')) { const f = who.split(':')[2]; const L = Game.leader(f); return { name: L.name, role: `${Game.facDef(f).name} · ${LEADER_TRAITS[L.trait].name}`, look: L.look, side: 'right' }; }
  return _speaker(who);
};
// загрузка старых сохранений
const _load = Game.load;
Game.load = () => {
  const s = _load(); if (!s) return s;
  Game.attachNewFaction();
  if (!S.pillars) S.pillars = [...(DEFAULT_PILLARS[S.regime] || ['hawks', 'oligarchs'])];
  for (const f of Object.keys(S.fac)) Game.leader(f);
  if (S.era === '2000') for (const f of ['left', 'liberals']) { const L = Game.facState(f).leader; if (L && /^(Товарищ|Команданте|Профессор) /.test(L.name)) Game.facState(f).leader = Game.makeLeader(f); }
  return s;
};

// Вкладка «Движения»
Object.assign(UI, {
  tab_factions() {
    const stName = { legal: 'легально', banned: 'под запретом', coopted: 'в правительстве' };
    const pil = S.pillars || [];
    return `<p class="lede">Сила — сколько у движения людей и влияния, одобрение — что они думают о вас. У каждого движения есть лидер со своим характером и текущее требование. <b>Опора режима</b> (не больше двух движений): к ним вы прислушиваетесь, их одобрение растёт само, переговоры работают сильнее, а остальные ревнуют. Если опора от вас отвернётся, риск переворота или революции резко вырастет.</p>
      <p class="lede"><b>Движения действуют сами:</b> довольные помогают (деньги, учения, молебны), недовольные вредят (саботаж приказов, бегство капитала, забастовки, проповеди), а доведённые до края — одобрение ниже 20 при силе от 45 — приходят с ультиматумом.</p>
      <p class="lede">Сейчас опора: <b>${pil.length ? pil.map(f => Game.facDef(f).name).join(' и ') : 'никто'}</b>.</p>
      <section class="card dem-summary"><div class="eyebrow">Требования движений</div>
        <p class="muted small">Одновременно действует не больше двух требований, новое появляется не чаще раза в квартал. На выполнение даётся 5–8 кварталов. Требования по бюджету засчитываются в конце квартала, если ползунок стоит где нужно, требования по указам — после подписания указа, остальные выполняются кнопкой за один приказ. Выполнили — одобрение +18. Сорвали — одобрение падает на 12 (у фанатиков и горлопанов сильнее), а движение крепнет. После этого движение пару кварталов ничего не просит.</p>
        ${(() => { const list = Object.keys(S.fac).map(f => [f, Game.facDemand(f)]).filter(([, d]) => d); return list.length ? `<ul class="dem-list">${list.map(([f, d]) => `<li><span class="fac-ic small-ic">${Game.facDef(f).icon}</span><b>${esc(Game.facDef(f).name)}:</b> ${esc(d.text)} <span class="chip ${d.until - S.turn <= 1 ? 'danger' : 'neutral'}">ещё ${Math.max(0, d.until - S.turn)} кв.</span>${d.kind !== 'pay' && Game.demandMet(d, d.since) ? ' <span class="chip coopted">выполнено</span>' : ''}</li>`).join('')}</ul>` : '<p class="small">Сейчас никто ничего не требует. Наслаждайтесь тишиной.</p>'; })()}
      </section>
      <div class="grid fac-grid">${Object.keys(S.fac).map(f => {
        const F = S.fac[f], D = Game.facDef(f), L = Game.leader(f), T = LEADER_TRAITS[L.trait];
        const threat = F.s * (100 - F.a) / 100;
        const dm = Game.facDemand(f);
        const isP = Game.isPillar(f);
        let dmHtml = '';
        if (dm) {
          const met = dm.kind !== 'pay' && Game.demandMet(dm, dm.since);
          dmHtml = `<div class="demand"><div class="demand-h"><span class="dec-tag">Требование · ещё ${Math.max(0, dm.until - S.turn)} кв.</span><b>${esc(dm.text)}</b></div>
            <div class="dec-row"><span class="dec-tag">Выполните</span>${UI.fxChips(Game.previewFx(Game.demandReward(f)))}${dm.fx ? UI.fxChips(Game.previewFx(dm.fx)) : ''}</div>
            <div class="dec-row"><span class="dec-tag dec-risk">Сорвёте</span>${UI.fxChips(Game.previewFx(Game.demandPenalty(f)))}</div>
            ${dm.kind === 'pay' ? UI.actBtn('facdem:' + f, { name: 'Выполнить', cost: '1 приказ', ok: true }) : `<span class="muted small">${met ? '✔ Условие выполнено — засчитается в конце квартала.' : dm.kind === 'budget' ? 'Выполняется на вкладке «Бюджет».' : 'Выполняется на вкладке «Указы».'}</span>`}</div>`;
        }
        return `<article class="card fac ${isP ? 'pillar' : ''}">
          <header><span class="fac-ic" aria-hidden="true">${D.icon}</span><div><h3>${D.name}</h3><span class="chip ${F.st}">${stName[F.st]}</span>${isP ? '<span class="chip gold">опора режима</span>' : ''}${threat > 35 ? '<span class="chip danger">угроза</span>' : ''}${f === 'new' ? '<span class="chip neutral">новое</span>' : ''}</div></header>
          <p class="muted small">${D.desc}</p>
          <div class="fac-leader"><div class="mini-portrait">${Portrait.svg(L.look)}</div><div><b>${esc(L.name)}</b><span class="chip trait">${T.name}</span><p class="muted small">${T.desc}</p></div></div>
          ${UI.facMood ? UI.facMood(f) : ''}
          ${UI.meter('Сила', F.s, 'str')}${UI.meter('Одобрение', F.a, F.a < 30 ? 'bad' : F.a < 50 ? 'warn' : 'good')}
          ${dmHtml}
          <div class="acts">${Game.factionActions(f).map(a => UI.actBtn(`fac:${f}:${a.id}`, a)).join('')}
            ${isP ? UI.actBtn('pillar:' + f, { name: 'Убрать из опоры', cost: 'одобрение −15', ok: true, danger: true }) : UI.actBtn('pillar:' + f, { name: 'Сделать опорой', cost: F.st === 'banned' ? 'движение запрещено' : pil.length >= 2 ? 'опор уже две' : '1 приказ', ok: pil.length < 2 && F.st !== 'banned' })}</div>
        </article>`;
      }).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  const [kind, a, b] = id.split(':');
  if (kind === 'fac' && b === 'hire') { if (S.ap > 0) VN.play(Game.hireScene(a)).then(() => UI.render()); return true; }
  if (kind === 'facdem') { const out = Game.payDemand(a); if (out) { UI.render(); UI.toast(out.text, out.changes); } return true; }
  if (kind === 'pillar') {
    if (!Game.isPillar(a) && S.ap <= 0) return true;
    const out = Game.togglePillar(a); if (out) { UI.render(); UI.toast(out.text, out.changes); } return true;
  }
  return false;
});

// Кто и как реагирует на запрет левых: зависит от эпохи и региона
Game.leftBanRel = () => {
  if (S.era === '1960') return { usa: 5, ussr: -8, cuba: -5, china: -4 };
  if (S.era === '1980') return S.region === 'east80' ? { usa: -6, vatican: -6, frg: -4, ussr: 4 } : { usa: 5, ussr: -8, cuba: -5 };
  if (S.era === '1848') return S.region === 'latam48' ? { uk: -2, usa: 2 } : { $east: 5, $west: -4 };
  if (S.era === '1930') return { ussr: -8, uk: 2, italy: 3, japan: 2, ...(S.year >= 1933 ? { germany: 3 } : {}) };
  return {
    africa00: { usa: -3, uk: -3, france: -2, china: 2 },          // бывшие повстанцы: удар по мирному процессу
    mideast00: { eu: -4, usa: -2, saudi: 3, russia: 2, china: 2 }, // Запад критикует, соседи-монархи довольны
    centralasia00: { eu: -6, usa: -4, russia: 3, china: 2 },       // оппозиция в эмиграции: Европа возмущена
  }[S.region] || { $west: -4 };
};
