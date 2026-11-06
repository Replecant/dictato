// Весна народов (1845–1855): баррикады, конституция и Венская система.
// В Латинской Америке та же механика означает другое: пронунсиамьенто генералов, угрозу с севера и британский щит.

// ---------- облик эпохи: министры, имена, титулы, движения ----------
const ROLES_BASE = JSON.parse(JSON.stringify(ROLES));
const ROLES_48 = {
  defense: { title: 'Военный министр', action: 'Смотр войск', actionDesc: 'Кавалерия, оркестр, плюмажи. Армия довольна, казна — не очень.' },
  economy: { title: 'Министр финансов', action: 'Финансовая программа', actionDesc: 'Отчёт, таблицы и мудрые слова. Экономика растёт, если министр не врёт.' },
  police: { title: 'Министр полиции', action: 'Аресты неблагонадёжных', actionDesc: 'Заговорщики в крепости, страх растёт, заговоры раскрываются.' },
  propaganda: { title: 'Главный цензор', action: 'Кампания «Отец Отечества»', actionDesc: 'Оды, гравюры и бюсты в каждой ратуше. Народ вас любит. Или делает вид.' },
  foreign: { title: 'Министр иностранных дел', action: 'Дипломатическое турне', actionDesc: 'Министр объезжает столицы и всем кланяется.' },
};
Object.assign(ROLES_48.economy, { icon: '💰' }); Object.assign(ROLES_48.police, { icon: '🗝️' }); Object.assign(ROLES_48.propaganda, { icon: '✒️' });
Game.eraLook = () => {
  const on = !!S && S.era === '1848';
  for (const r of Object.keys(ROLES)) Object.assign(ROLES[r], on ? ROLES_48[r] : ROLES_BASE[r]);
  STAT_NAMES.swiss = Game.bank().name;
  SLIDERS.spend.find(d => d.k === 'palace').hint = `Уходит на ${Game.bank().acc.replace(/^ваш /, 'ваш ')}; народ ворчит`;
};
Object.assign(NAME_POOLS, {
  german: { m: ['Фридрих', 'Карл', 'Вильгельм', 'Иоганн', 'Генрих', 'Людвиг', 'Отто', 'Густав', 'Франц', 'Георг'], f: ['Луиза', 'Амалия', 'Шарлотта'], last: ['Мюллер', 'Шмидт', 'Беккер', 'Вагнер', 'Гофман', 'Шульц', 'Кёлер', 'Брандт', 'Фогель', 'Хеккер', 'Штруве', 'Блюм'] },
  italy: { m: ['Джузеппе', 'Луиджи', 'Карло', 'Джованни', 'Франческо', 'Антонио', 'Пьетро', 'Ипполито', 'Массимо', 'Даниэле'], f: ['Кристина', 'Анита', 'Тереза'], last: ['Росси', 'Бьянки', 'Конти', 'Феррари', 'Мандзони', 'Галли', 'Мартини', 'Коломбо', 'Риччи', 'Сальви', 'Бандьера', 'Пепе'] },
});
for (const n of ['Луиза', 'Амалия', 'Шарлотта', 'Кристина', 'Анита', 'Тереза', 'Августа', 'Ассунта']) FEMALE_NAMES.add(n);
Object.assign(FAITH_TITLE, { protestant: 'Пастор' });
Object.assign(RICH_TITLE, { german: 'Барон', italy: 'Маркиз' });
Object.assign(DEFAULT_PILLARS, DEFAULT_PILLARS_48);
NEW_FACTIONS['1848'] = {
  name: 'Национальная гвардия', short: 'Гвардейцы', icon: '🛡️',
  desc: 'Лавочники, аптекари и адвокаты с ружьями, выданными «для защиты порядка». Какого порядка — решают сами, на собраниях роты.',
  rivals: ['hawks'], risk: 'rev', appear: S => S.year >= 1848,
  intro: 'В городах записываются в Национальную гвардию: бюргеры в мундирах, с ружьями и мнением о политике. Офицеры армии смотрят на них с презрением, а они на офицеров — с ружьями.',
};
FAC_DEMANDS.new.push(
  { id: 'g48_const', kind: 'flag', test: S => !!S.sp && S.sp.const === 'granted', text: 'Даровать конституцию (вкладка «Весна народов»)', eras: ['1848'] },
  { id: 'g48_arms', kind: 'pay', text: 'Выдать гвардии ружья из арсенала', fx: { army: -3, fac: { hawks: { a: -6 } } }, eras: ['1848'] },
  { id: 'g48_cens', kind: 'flag', test: S => !!S.sp && !S.sp.cens, text: 'Ослабить цензуру', eras: ['1848'] },
);
FAC_DEMANDS.liberals.push({ id: 'b48_const', kind: 'flag', test: S => !!S.sp && S.sp.const === 'granted', text: 'Даровать конституцию (вкладка «Весна народов»)', eras: ['1848'] });

// Требования держав 1840-х
DEMANDS.push(
  { id: 'carlsbad', blocs: ['east'], eras: ['1848'], text: () => 'Ввести цензуру по образцу Карлсбадских постановлений', cond: () => !!S.sp && !S.sp.cens, fx: c => ({ fear: 4, rel: { [c]: 14, $west: -4 }, spCens: true, fac: { liberals: { a: -12 } } }) },
  { id: 'extradite', blocs: ['east'], eras: ['1848'], text: () => 'Выдать бежавших к вам революционеров', fx: c => ({ fear: 3, rel: { [c]: 12 }, spRad: 4, fac: { liberals: { a: -8 }, left: { a: -8 } } }) },
  { id: 'asylum', blocs: ['west'], eras: ['1848'], text: () => 'Предоставить убежище политическим эмигрантам', fx: c => ({ rel: { [c]: 12, $east: -8 }, spRad: 3, fac: { liberals: { a: 6 } } }) },
  { id: 'corn', blocs: ['west'], eras: ['1848'], text: () => 'Снизить пошлины на британские товары (свобода торговли)', fx: c => ({ treasury: -6, economy: 2, rel: { [c]: 12 }, fac: { oligarchs: { a: -6 } } }) },
  { id: 'slaves', countries: ['uk'], regions: ['latam48'], eras: ['1848'], text: () => 'Пустить британский флот досматривать суда работорговцев', fx: c => ({ rel: { uk: 15, usa: -4 }, vsGuar: 8, fac: { oligarchs: { a: -8 } } }) },
  { id: 'transit', countries: ['usa'], regions: ['latam48'], eras: ['1848'], text: () => 'Уступить право транзита через перешеек', fx: c => ({ treasury: 6, support: -4, rel: { usa: 15, uk: -8 }, spRad: 6 }) },
  { id: 'concordat', countries: ['papal'], eras: ['1848'], text: () => 'Заключить конкордат: школы — церкви', fx: c => ({ rel: { papal: 14 }, fac: { faith: { a: 10 }, liberals: { a: -10 } } }) },
  { id: 'garrison', countries: ['austria'], eras: ['1848'], text: () => 'Разместить австрийский гарнизон в крепости', fx: c => ({ rel: { austria: 15 }, vsGuar: 10, support: -5, army: -3, fac: { hawks: { a: -6 } } }) },
);
const DEMANDS_OK_48 = ['company', 'tariffs', 'raw', 'buy', 'invite', 'vote', 'resolution'];
const _pickDemand = Game.pickDemand;
Game.pickDemand = function (c) {
  if (S.era !== '1848') return _pickDemand.call(Game, c);
  const keep = DEMANDS.filter(d => d.eras ? d.eras.includes('1848') : DEMANDS_OK_48.includes(d.id));
  const all = DEMANDS.splice(0, DEMANDS.length, ...keep);
  try { return _pickDemand.call(Game, c); } finally { DEMANDS.splice(0, DEMANDS.length, ...all); }
};

// Указы 1840-х: прячем анахронизмы, добавляем свои
for (const [cat, ids] of Object.entries({ social: ['gadgets', 'sport'], economy: ['dam', 'lottery'], absurd: ['gym'], foreign: ['passports'] })) {
  for (const d of DECREES[cat]) if (ids.includes(d.id)) d.eras = ['1930', '1960', '2000'];
}
DECREES.social.push(
  { id: 'lithos48', eras: ['1848'], name: 'Раздать народу лубочные портреты государя', desc: 'Раскрашенные гравюры: вы на коне, вы с хлебом, вы с ребёнком. В каждую избу и трактир.', cost: '−8 млн', ok: S => S.treasury >= 8, once: true,
    run: S => ({ fx: { treasury: -8, support: 4, loy: { propaganda: 4 } }, text: 'Портреты розданы. В трактирах вас повесили над стойкой, в деревнях — рядом с иконами. Кое-где — вверх ногами.' }) },
  { id: 'gas48', eras: ['1848'], name: 'Газовые фонари в столице', desc: 'Улицы освещены до полуночи. Воры недовольны, заговорщики тоже.', cost: '−12 млн', ok: S => S.treasury >= 12, once: true,
    run: S => ({ fx: { treasury: -12, support: 3, economy: 1, spHeat: -4, fac: { oligarchs: { a: 3 } } }, text: Game.fmt('В {capital} зажглись газовые фонари. Горожане гуляют до полуночи, а полиция видит, кто с кем гуляет.') }) },
);
DECREES.economy.push(
  { id: 'canal48', eras: ['1848'], name: 'Великий канал', desc: 'Проект века: баржи с товаром из глубины страны прямо к морю. Через полтора года.', cost: '−45 млн', ok: S => S.treasury >= 45, once: true,
    run: S => ({ fx: { treasury: -45, support: 3, swiss: 5, schedule: [{ in: 6, fx: { economy: 11, support: 4 }, text: Game.fmt('Великий канал имени {title_gen} открыт! По нему плывут баржи, лодки и одна утка, которую никто не звал.') }] }, text: 'Заложен Великий канал. Землекопов наняли десять тысяч, инженеров — двух, родственников подрядчика — без счёта.' }) },
  { id: 'lottery48', eras: ['1848'], name: 'Казённая лотерея', desc: 'Главный приз — обед с государем и корова.', cost: '−3 млн', ok: S => S.treasury >= 3, repeat: true,
    run: (S, m) => ({ fx: { treasury: -3 + Math.round(12 * m), support: 1, fac: { faith: { a: -2 } } }, text: 'Билеты раскупили за неделю. Корову выиграла тёща министра финансов. Обед с вами она уступила соседке.' }) },
);
DECREES.absurd.push(
  { id: 'bells48', eras: ['1848'], name: 'Колокольный звон в вашу честь каждое утро', desc: 'В шесть утра — во всех церквях. Пусть страна просыпается с мыслью о вас.', cost: '', ok: () => true, once: true,
    run: S => ({ fx: { support: -2, fear: 2, fac: { faith: { a: -4 } }, loy: { propaganda: 4 } }, text: 'Страна просыпается в шесть. Звонари требуют прибавки, петухи — объяснений.' }) },
  { id: 'opera48', eras: ['1848'], name: 'Опера о вашей жизни в пяти актах', desc: 'Тенор поёт вашу юность, бас — ваши победы, хор — вашу скромность.', cost: '−6 млн', ok: S => S.treasury >= 6, once: true,
    run: S => ({ fx: { treasury: -6, support: 2, loy: { propaganda: 6 }, fac: { liberals: { a: -2 } } }, text: 'Премьера длилась пять часов. В третьем акте вы побеждаете дракона, в четвёртом — ещё одного. Публика аплодировала стоя: сидеть было уже невозможно.' }) },
);

// Текстовые анахронизмы движка в 1840-х
const T48 = [
  ['Военный парад! Танки, оркестр, вы на трибуне. Один танк заехал в фонтан', 'Смотр войск! Кавалерия, оркестр, вы на трибуне. Одна лошадь зашла в фонтан'],
  ['фотография с каждым мировым лидером', 'гравюра с каждым государем Европы'],
  ['в обмен на тракторы и обещания', 'в обмен на паровые машины и обещания'],
  ['улетели первым рейсом, забыв гольф-клюшки', 'уплыли первым пароходом, забыв трости'],
  ['минуту молчания по радио', 'минуту молчания в соборе'],
  ['Танки у границы с соседями', 'Кавалерия у границы с соседями'],
  ['Самолёт с палатками, водой и вашим портретом', 'Обоз с палатками, хлебом и вашим портретом'],
  ['Самолёт с палатками', 'Обоз с палатками'],
  ['Станок Монетного двора работал всю ночь', 'Монетный двор чеканил всю ночь'],
  ['в аэропорту с чемоданом', 'на почтовой станции с саквояжем'],
  ['оппозиционное радио «Голос свободы»', 'оппозиционный листок «Голос свободы»'],
  ['пишущая машинка и радиопередача', 'печатный станок и листовки'],
  ['На газетных снимках', 'На газетных гравюрах'],
];
const t48 = s => (typeof s === 'string' && S && S.era === '1848' ? T48.reduce((a, [f, t]) => a.split(f).join(t), s) : s);
const _fmt = Game.fmt;
Game.fmt = function (str) { return t48(_fmt.call(Game, str)); };
for (const k of ['factionAction', 'countryAction', 'advisorAction', 'economyAction', 'decree']) {
  const orig = Game[k];
  Game[k] = function (...a) { const r = orig.apply(Game, a); if (r && r.text) r.text = t48(r.text); return r; };
}
const _economyActions = Game.economyActions;
Game.economyActions = function () {
  const acts = _economyActions.call(Game);
  if (S.era !== '1848') return acts;
  const lat = S.region === 'latam48';
  for (const a of acts) {
    if (a.id === 'highway') { a.name = `Тракт имени ${Game.titleGen()}`; a.desc = 'Через 3 квартала экономика +6. Подрядчик — родственник.'; }
    if (a.id === 'loan_w') Object.assign(a, { name: 'Заём лондонского Сити', desc: 'Казна +50, затем 8 выплат по 7 млн. Под залог таможенных сборов.', cost: 'Британия ≥ 40', ok: (S.rel.uk || 0) >= 40 && S.loans.length < 2 });
    if (a.id === 'loan_e') Object.assign(a, lat
      ? { name: 'Заём парижских банкиров', desc: 'Казна +50, затем 8 выплат по 7 млн. Париж доволен, Лондон ревнует.', cost: 'Франция ≥ 40', ok: (S.rel.france || 0) >= 40 && S.loans.length < 2 }
      : { name: 'Заём венских Ротшильдов', desc: 'Казна +50, затем 8 выплат по 7 млн. Вена довольна: долг — лучший поводок.', cost: 'Австрия ≥ 40', ok: (S.rel.austria || 0) >= 40 && S.loans.length < 2 });
  }
  return acts;
};
const _economyFx = Game.economyFx;
Game.economyFx = function (id) {
  const r = _economyFx.call(Game, id);
  if (S.era !== '1848') return r;
  const lat = S.region === 'latam48';
  if (id === 'highway') { r.text = 'Начато строительство тракта. Первый верстовой столб вы установили лично, со второй попытки.'; if (r.fx.schedule) r.fx.schedule[0].text = `Открыт тракт имени ${Game.titleGen()}! Почтовые кареты ездят вдвое быстрее, шурин-подрядчик прислал благодарность.`; }
  if (id === 'loan_w') { r.fx = { treasury: 50, rel: { uk: 3 }, loan: { per: 7, turns: 8 } }; r.text = 'Банкиры Сити выдали заём под залог таможенных сборов. Теперь на таможне сидит англичанин в цилиндре.'; }
  if (id === 'loan_e') { r.fx = lat ? { treasury: 50, rel: { france: 5, uk: -3 }, loan: { per: 7, turns: 8 } } : { treasury: 50, rel: { austria: 5, uk: -2 }, vsGuar: 4, loan: { per: 7, turns: 8 } }; r.text = lat ? 'Парижские банкиры выдали заём и прислали консула с тростью. Он уже присматривается к вашим таможням.' : 'Венский дом Ротшильдов выдал заём. В договоре есть пункт о «верности существующему порядку». Мелким шрифтом.'; }
  if (id === 'nationalize') { r.fx.rel = { $patron: -30 }; }
  if (id === 'land') { r.fx.rel = {}; }
  return r;
};
const _countryActions = Game.countryActions;
Game.countryActions = function (c) {
  const acts = _countryActions.call(Game, c);
  if (S.era === '1848' && ['austria', 'prussia', 'russia', 'usa'].includes(c) && !acts.some(a => a.id === 'arms')) acts.splice(acts.length - 1, 0, { id: 'arms', name: 'Купить оружие', cost: '−20 млн', ok: S.treasury >= 20 && S.rel[c] >= 35 });
  return acts;
};

// ---------- кризисные сцены в духе эпохи ----------
const _coupScene = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coupScene.call(Game, role);
  if (S.era !== '1848') return sc;
  sc.title = 'Гвардия у дворца!';
  sc.lines[0] = ['narrator', 'Три часа ночи. Барабанная дробь и цокот копыт. Во дворе строятся гвардейцы с примкнутыми штыками.'];
  if (sc.lines[1][0] === 'npc:colonel') sc.lines[1] = ['npc:colonel', 'Именем армии и отечества! Тиран низложен! Ну, почти.'];
  const [c0, c1, c2, c3] = sc.choices;
  Object.assign(c0, { text: 'Выйти на балкон и обратиться к народу' });
  c0.win.res = 'Тысячи горожан окружили гвардейцев. Солдаты опустили ружья и стали брататься с толпой. Мятеж провалился!';
  c0.lose.res = 'Толпа выслушала вас, пожала плечами и разошлась по трактирам. Гвардия вошла во дворец.';
  c1.lose.res = 'Гвардия посмотрела на пушки мятежников и решила, что у неё выходной.';
  c2.text = c2.text.replace('Позвонить в посольство', 'Послать курьера к посланнику');
  c2.win.res = c2.win.res.replace('Через час мятежным командирам позвонили из посольства. Танки развернулись.', 'Через час посланник лично приехал к мятежникам. Полки развернулись.');
  c2.lose.res = 'Посланник велел передать: «Его превосходительство спит». Утро будет уже без вас.';
  c3.text = 'Бежать к границе в карете с казной';
  c3.res = 'Карета несётся к границе. Под сиденьем — сундуки казны. Позади — огни столицы, которую вы больше не увидите.';
  return sc;
};
const _revScene = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _revScene.call(Game);
  if (S.era !== '1848') return sc;
  sc.title = 'Революция!';
  sc.lines = [
    ['narrator', `Баррикады на ${REGIONS[S.region].capitalSquare}. Над толпой — трёхцветные знамёна. Ворота дворца трещат.`],
    ['npc:rebel', 'Народ пришёл за своей конституцией! Выходи, тиран!'],
    ['propaganda', '{Addr}, я... я, пожалуй, пойду проверю типографию. Надолго.'],
    ['defense', 'Войска ждут приказа. Но солдаты смотрят на баррикады и видят там своих братьев.'],
  ];
  sc.choices[0].text = 'Картечью по баррикадам';
  sc.choices[2].text = 'Бежать в Англию под именем «мистера Смита»';
  sc.choices[2].res = 'Вы сбрили бакенбарды, надели чужой плащ и сели в наёмную карету до побережья. В паспорте написано: «мистер Смит».';
  return sc;
};

// ---------- регионы механики ----------
const SP_REGION = {
  german48: {
    tab: 'Весна народов', heat: 'Баррикады', rad: 'Республиканцы', guar: 'Венская гарантия', ally: 'prussia', allyName: 'прусские полки',
    oppRole: 'профессор, депутат Франкфуртского парламента', me: [150, 250],
    cities: ['paris', 'frankfurt', 'berlin', 'dresden', 'prague', 'munich', 'vienna', 'budapest', 'milan'],
    congress: { at: [1851, 1], title: 'Дрезденские конференции', place: 'в Дрездене', what: 'каким будет Германский союз после революции' },
  },
  italy48: {
    tab: 'Весна народов', heat: 'Баррикады', rad: 'Карбонарии', guar: 'Венская гарантия', ally: 'austria', allyName: 'австрийцы маршала Радецкого',
    oppRole: 'адвокат и издатель газеты «Рисорджименто»', me: [200, 330],
    cities: ['paris', 'vienna', 'budapest', 'munich', 'milan', 'venice', 'rome', 'naples', 'palermo'],
    congress: { at: [1849, 2], title: 'Конференция держав в Гаэте', place: 'в Гаэте', what: 'как вернуть папе Рим и какие троны полуострова достойны защиты' },
  },
  latam48: {
    tab: 'Каудильо и гринго', heat: 'Пронунсиамьенто', rad: 'Угроза с севера', guar: 'Британский щит', ally: 'uk', allyName: 'британская эскадра',
    oppRole: 'губернатор провинции и генерал', me: [300, 190],
    provinces: [['Сьерра-Альта', 160, 110], ['Тьерра-Кальенте', 440, 110], ['Порт Санта-Крус', 480, 260], ['Лос-Льянос', 130, 260], ['Чиапан', 300, 320]],
    congress: { at: [1847, 4], title: 'Американский конгресс в Лиме', place: 'в Лиме', what: 'как республикам защититься от европейских флотов и американских армий' },
  },
};
// Столицы Европы: координаты и что с ними происходило [время, состояние, итог]
const SP_CITIES = {
  paris: ['Париж', 95, 165, [[1848.0, 'rev', 'король бежал, провозглашена республика'], [1848.25, 'barr', 'июньские баррикады рабочих'], [1848.5, 'rev', 'восстание подавлено, республика устояла'], [1851.75, 'crushed', 'переворот Луи-Наполеона']]],
  frankfurt: ['Франкфурт', 222, 135, [[1848.25, 'rev', 'открыт общегерманский парламент'], [1849.25, 'crushed', 'парламент разогнан']]],
  berlin: ['Берлин', 305, 45, [[1848.0, 'rev', 'мартовские баррикады, король обещал конституцию'], [1848.75, 'crushed', 'войска вошли в город, собрание распущено']]],
  dresden: ['Дрезден', 365, 108, [[1849.25, 'barr', 'майское восстание'], [1849.5, 'crushed', 'подавлено прусскими войсками']]],
  prague: ['Прага', 420, 165, [[1848.25, 'barr', 'Троицкое восстание'], [1848.5, 'crushed', 'город обстрелян, восстание подавлено']]],
  munich: ['Мюнхен', 290, 200, [[1848.0, 'rev', 'король отрёкся, обещаны реформы'], [1850.0, 'calm', 'реформы на бумаге']]],
  vienna: ['Вена', 450, 235, [[1848.0, 'rev', 'Меттерних бежал'], [1848.75, 'crushed', 'город взят штурмом']]],
  budapest: ['Пешт', 525, 262, [[1848.0, 'rev', 'венгерская революция'], [1849.25, 'barr', 'война за независимость'], [1849.5, 'crushed', 'капитуляция при Вилагоше']]],
  milan: ['Милан', 228, 262, [[1848.0, 'rev', '«Пять дней», австрийцы изгнаны'], [1848.5, 'crushed', 'Радецкий вернулся']]],
  venice: ['Венеция', 342, 268, [[1848.0, 'rev', 'республика Святого Марка'], [1849.5, 'crushed', 'город сдался после осады']]],
  rome: ['Рим', 330, 340, [[1848.75, 'barr', 'убит премьер Росси, папа бежал'], [1849.0, 'rev', 'Римская республика'], [1849.5, 'crushed', 'французы вернули власть папе']]],
  naples: ['Неаполь', 398, 368, [[1848.0, 'rev', 'король даровал конституцию'], [1848.25, 'crushed', 'контрпереворот 15 мая']]],
  palermo: ['Палермо', 352, 405, [[1848.0, 'rev', 'Сицилия восстала'], [1849.25, 'crushed', 'остров снова под властью Неаполя']]],
};
// Мексика на карте Латинской Америки
const SP_MEXICO = [[1845.0, 'calm', 'США присоединили Техас'], [1846.25, 'barr', 'война с США'], [1847.5, 'crushed', 'американцы взяли Мехико'], [1848.0, 'calm', 'мир: половина страны отошла США'], [1853.25, 'rev', 'Санта-Анна снова диктатор']];
const SP_CONST = { none: 'нет', promised: 'обещана', granted: 'дарована', revoked: 'отменена' };

Object.assign(Game, {
  sp() {
    if (!S.sp) {
      const R = SP_REGION[S.region] || SP_REGION.german48;
      const pool = NAME_POOLS[REGIONS[S.region].style] || NAME_POOLS.latam;
      S.sp = {
        heat: 15, rad: 10, guar: 55, const: S.regime === 'charter' ? 'granted' : 'none', constAt: -99, cens: S.regime === 'crown', rail: 0, tele: false,
        last: -99, radAt: -99, promiseAsked: -99, banquetAt: -99, cityDone: [], log: [],
        opp: { name: `${pick(pool.m)} ${pick(pool.last)}`, role: R.oppRole },
        prov: (R.provinces || []).map(([name, x, y]) => ({ name, x, y, st: 'calm', t: 0, gen: `генерал ${pick(pool.last)}` })),
      };
      S.sp.guar = Math.round(Game.spGuarTarget());
    }
    return S.sp;
  },
  spCfg() { return SP_REGION[S.region] || SP_REGION.german48; },
  spLat() { return S.region === 'latam48'; },
  spCrimea() { return Game.eraTime() >= 1854.5; },
  spGuarTarget() {
    const P = S.sp || {};
    if (Game.spLat()) return clamp((S.rel.uk || 40) + (S.flags.slaveBan ? 8 : 0) - ((S.rel.usa || 40) > 65 ? 8 : 0));
    const east = REGIONS[S.region].countries.filter(c => Game.blocOf(c) === 'east');
    const avg = east.length ? east.reduce((a, c) => a + (S.rel[c] || 0), 0) / east.length : 30;
    let t = avg - (P.const === 'granted' ? 12 : P.const === 'promised' ? 5 : 0) + (P.cens ? 5 : 0);
    if (Game.spCrimea()) t = Math.min(t, 20);
    return clamp(t);
  },
  spAllyOk() { const P = Game.sp(), R = Game.spCfg(); return P.guar >= 55 && (S.rel[R.ally] || 0) >= 50 && (Game.spLat() || !Game.spCrimea()); },
  spActions() {
    const P = Game.sp(), lat = Game.spLat();
    const A = [];
    if (lat) {
      if (P.rail < 3) A.push({ id: 'rail', name: ['Мулья тропа к Тихому океану', 'Тракт к Тихому океану', 'Железная дорога через перешеек'][P.rail], desc: 'Старатели платят за проезд, товар идёт быстрее. Но вдоль дороги появляется всё больше гринго.', ok: S.treasury >= 18, fx: { treasury: -18, economy: 2, spRail: 1, spRad: 4, schedule: [{ in: 3, fx: { economy: 4, treasury: 4 }, text: 'Дорога к Тихому океану приносит пошлины и попутчиков.' }] } });
      A.push({ id: 'promote', name: 'Произвести генералов в маршалы', desc: 'Генерал с новыми эполетами реже объявляет пронунсиамьенто. Ненадолго.', ok: S.treasury >= 8, fx: { treasury: -8, spHeat: -9, fac: { hawks: { a: 8 } } } });
      A.push({ id: 'border', name: 'Форты на северной границе', desc: 'Пушки на перевалах и гарнизоны в бухтах. Флибустьеры любят лёгкую добычу.', ok: S.treasury >= 12, fx: { treasury: -12, army: 2, spRad: -12 } });
      if (!S.flags.redRibbon) A.push({ id: 'red', name: 'Обязательная красная лента', desc: 'Все носят цвет правительства. Кто без ленты — тот против. Генералы спокойнее, либералы злее.', ok: true, danger: true, fx: { fear: 5, spHeat: -7, flag: { redRibbon: true }, fac: { liberals: { a: -8 } } } });
      if (!S.flags.slaveBan) A.push({ id: 'slaves', name: 'Запретить работорговлю в портах', desc: 'Лондон давно этого добивается. Британский щит станет крепче, асьендадо — злее.', ok: true, fx: { rel: { uk: 12 }, vsGuar: 10, flag: { slaveBan: true }, fac: { oligarchs: { a: -8 }, left: { a: 4 } } } });
      if (!S.flags.churchSold) A.push({ id: 'church', name: 'Продать церковные земли', desc: 'Казна получит деньги, либералы — победу, архиепископ — повод для анафемы.', ok: true, danger: true, fx: { treasury: 25, flag: { churchSold: true }, spHeat: 4, fac: { faith: { a: -18 }, liberals: { a: 10 } } } });
    } else {
      if (P.rail < 3) A.push({ id: 'rail', name: ['Железная дорога до столицы', 'Ветка к границе', 'Дорога к морю'][P.rail], desc: 'Паровоз довезёт ваш товар до порта за день. И парижские газеты — тоже.', ok: S.treasury >= 18, fx: { treasury: -18, economy: 2, spRail: 1, schedule: [{ in: 3, fx: { economy: 4 }, text: 'Новая железная дорога заработала в полную силу: грузы идут, вокзал гудит.' }] } });
      if (!P.tele) A.push({ id: 'tele', name: 'Государственный телеграф', desc: 'Министр полиции узнаёт о беспорядках за минуты. Но и новости из Парижа приходят быстрее.', ok: S.treasury >= 12, fx: { treasury: -12, spTele: true, loy: { police: 4 } } });
      A.push(P.cens
        ? { id: 'cens_off', name: 'Ослабить цензуру', desc: 'Газеты вздохнут свободнее. Улица — тоже, но заговорщикам станет нечего шептать.', ok: true, fx: { spCens: false, spHeat: 4, spRad: -6, fac: { liberals: { a: 8 } } } }
        : { id: 'cens_on', name: 'Строгая цензура', desc: 'Каждую строчку читает цензор с красными чернилами. На улицах тише, в подвалах — злее.', ok: true, danger: true, fx: { spCens: true, fear: 3, spHeat: -6, spRad: 6, fac: { liberals: { a: -8 } } } });
      if (S.turn - P.banquetAt >= 4) A.push({ id: 'banquet', name: 'Запретить политические банкеты', desc: 'Либералы обсуждают реформы за обедом с тостами. Нет обеда — нет тостов. В Париже, правда, именно с этого всё и началось.', ok: true, fx: { spHeat: -6, spRad: 4, fac: { liberals: { a: -5 } } } });
      if (!Game.spCrimea()) A.push({ id: 'holy', name: 'Заверить Священный союз в верности', desc: 'Письмо царю, визит в Вену, орден прусскому посланнику. Гарантия крепнет, либералы морщатся.', ok: S.treasury >= 6, fx: { treasury: -6, rel: { $east: 6 }, vsGuar: 8, fac: { liberals: { a: -3 } } } });
      A.push({ id: 'emig', name: 'Билеты в Америку для смутьянов', desc: 'Пароход до Нью-Йорка в один конец. Самые горячие головы уедут строить республику там.', ok: S.treasury >= 8, fx: { treasury: -8, economy: -1, spRad: -12, fac: { left: { s: -4 } } } });
    }
    if (P.const !== 'granted') A.push({ id: 'charter', name: lat ? 'Созвать учредительный конгресс' : 'Даровать конституцию', desc: lat ? 'Конгресс напишет конституцию. Либералы ликуют, генералы обижены, улица успокаивается.' : 'Палата, бюджет, свобода печати — в разумных пределах. Улица остывает, Священный союз хмурится.', ok: true, fx: { spConst: 'granted', spHeat: -15, fac: { liberals: { a: 15 }, hawks: { a: -8 } }, vsGuar: lat ? 0 : -15, rel: lat ? {} : { $east: -8, $west: 8 } } });
    else A.push({ id: 'revoke', name: lat ? 'Распустить конгресс' : 'Отменить конституцию', desc: 'Депутатов — по домам, прессу — под цензуру. Порядок вернётся, а заговорщики уйдут в подполье.', ok: true, danger: true, fx: { spConst: 'revoked', fear: 8, spRad: 12, vsGuar: lat ? 0 : 10, rel: lat ? {} : { $east: 6, $west: -8 }, fac: { liberals: { a: -20 }, hawks: { a: 6 } } } });
    return A.map(a => ({ ...a, cost: '1 приказ' }));
  },
  spAction(id) {
    const a = Game.spActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    if (id === 'banquet') Game.sp().banquetAt = S.turn;
    const changes = Game.apply(a.fx);
    const text = `${a.name}. ${a.desc}`;
    Game.log(text);
    return { text, changes };
  },

  // ---------- сцены ----------
  spPrologue() {
    S.flags.prologue48 = true;
    const lat = Game.spLat(), it = S.region === 'italy48';
    if (lat) return {
      title: '1823: Америка — для американцев', bg: 'palace',
      lines: [
        ['narrator', 'Двадцать лет назад испанский вице-король уплыл домой, и республика родилась под колокольный звон. Испания до сих пор её не признала.'],
        ['foreign', 'Первым нас признал Лондон, {sir}. Британский флот стоит между нами и Испанией — за умеренную плату в виде торговых льгот.'],
        ['narrator', 'В 1823 году президент Монро объявил в Вашингтоне: Америка — для американцев, и Европа пусть не вмешивается. Тогда это звучало как защита. Теперь, глядя на Техас, многие думают, что «американцы» — это только жители Соединённых Штатов.'],
      ],
      choices: [
        { text: 'Поднять бокал за британский флот', fx: { rel: { uk: 6 }, vsGuar: 8, fac: { oligarchs: { a: 3 } } }, res: 'Британский консул растроган и обещает написать в Лондон. Лондон, как обычно, ответит через полгода.' },
        { text: 'Поднять бокал за доктрину Монро', fx: { rel: { usa: 8 }, spRad: -4, fac: { liberals: { a: 3 } } }, res: 'Американский посланник аплодирует. Британский консул пересчитывает пушки своего фрегата.' },
        { text: 'Поднять бокал за республику', fx: { support: 4 }, res: 'Зал кричит «Вива!». Генералы кричат громче всех: каждый уверен, что следующий тост будет за него.' },
      ],
    };
    return {
      title: '1815: Конгресс танцует', bg: 'palace',
      lines: [
        ['narrator', 'Вена, 1815 год. Наполеон заперт на острове, а Европа танцует. Конгресс заседает девятый месяц: днём делят границы, ночью — партнёрш по вальсу.'],
        ['foreign', it ? 'Мой отец служил там секретарём, {sir}. Князь Меттерних назвал Италию «географическим понятием» — и одним росчерком пера вернул ваш дом на трон.' : 'Я был там пажом, {sir}. Принц де Линь сказал: «Конгресс не движется — он танцует». А потом князь Меттерних одним росчерком пера нарисовал на карте ваше герцогство.'],
        ['narrator', 'Тридцать лет спустя Венская система всё ещё держит Европу. Священный союз России, Австрии и Пруссии охраняет законные троны от революций. Ваш — тоже, пока вы верны союзу. Но на улицах всё чаще поют «Марсельезу», а в Лондоне и Париже сочувствуют конституциям.'],
      ],
      choices: [
        { text: 'Поднять бокал за Священный союз', fx: { rel: { $east: 5 }, vsGuar: 10, fac: { liberals: { a: -4 } } }, res: 'Австрийский посланник прослезился. Студенты в зале для прислуги тихо засвистели.' },
        { text: 'Поднять бокал за Венский конгресс и английскую торговлю', adv: ['foreign'], fx: { rel: { uk: 6 }, vsGuar: 3 }, res: 'Тост вышел дипломатичным: довольны все и никто. Министр иностранных дел доволен больше всех.' },
        { text: 'Поднять бокал за свой народ', fx: { support: 4, vsGuar: -4, fac: { liberals: { a: 4 } } }, res: 'Зал зааплодировал. Посланник России записал что-то в книжечку.' },
      ],
    };
  },
  spBarricadeScene() {
    const P = Game.sp(), R = Game.spCfg(), Rg = REGIONS[S.region];
    P.last = S.turn;
    const big = P.heat >= 85, crimea = Game.spCrimea();
    const choices = [
      { text: 'Картечью по баррикадам', adv: ['defense'], chance: () => clamp(0.3 + S.army / 250 + S.fear / 300 - P.heat / 400 + (P.tele ? 0.06 : 0), 0.15, 0.8),
        win: { fx: { spHeat: -38, spRad: 20, fear: 8, support: -8, rel: { $west: -8 } }, res: 'Пушки ударили по баррикадам на рассвете. К полудню улицы пусты, мостовую уже кладут обратно. Те, кто уцелел, уходят в подполье или в эмиграцию.' },
        lose: { fx: { spHeat: 4, spRad: 12, army: -12, support: -10 }, res: 'Солдаты отказались стрелять и братаются с толпой. Офицеры прячут эполеты.' } },
    ];
    if (P.const !== 'granted') choices.push({ text: 'Даровать конституцию', fx: { spConst: 'granted', spHeat: -35, spRad: -8, support: 5, fac: { liberals: { a: 15 }, hawks: { a: -8 } }, vsGuar: -15, rel: { $east: -8, $west: 8 } }, res: 'Вы вышли на балкон и прочитали манифест о конституции. Толпа кричит «Да здравствует государь!» Баррикады разбирают на сувениры.' });
    if (P.const === 'none') choices.push({ text: 'Пообещать конституцию', adv: ['propaganda'], fx: { spConst: 'promised', spHeat: -18 }, res: 'Обещание напечатано огромными буквами. Срок не указан. Толпа расходится, но обещает вернуться.' });
    choices.push({ text: 'Отправить в отставку министра полиции', fx: { spHeat: -20, fireRole: 'police', fac: { hawks: { a: -4 } } }, res: 'Министр полиции, как Меттерних, ночью уехал из столицы в чужом плаще. Толпа празднует: виноватый найден.' });
    if (Game.spAllyOk()) choices.push({ text: `Призвать на помощь: ${R.allyName}`, fx: { spHeat: -45, spRad: 12, support: -8, fear: 6, rel: { [R.ally]: 6, $west: -12 }, flag: { bayonets: true }, fac: { liberals: { a: -10 } } }, res: 'Через границу вошли чужие полки. Улицы пусты, но на стенах пишут, что вы правите на чужих штыках.' });
    choices.push({ text: 'Отречься в пользу юного племянника', fx: { end: 'abdicate' }, res: `Вы подписали отречение. Племянник ${Rg.nephew} растерянно примеряет корону. Толпа не знает, радоваться ли: он ещё никому ничего не обещал.` });
    choices.push({ text: 'Бежать в Англию под именем «мистера Смита»', fx: { end: 'smith' }, res: 'Вы сбрили бакенбарды, надели чужой плащ и сели в наёмную карету до побережья. В паспорте написано: «мистер Смит».' });
    return {
      title: `Баррикады на ${Rg.capitalSquare}`, bg: 'square', crisis: big,
      lines: [
        ['narrator', `Мостовую на ${Rg.capitalSquare} разобрали на баррикады. ${big ? 'Десятки тысяч' : 'Тысячи'} студентов, подмастерьев и лавочников с трёхцветными кокардами требуют конституции, свободы печати и отставки министра полиции.`],
        ['police', big ? 'Ещё одна ночь — и они пойдут на дворец. Решайте сегодня.' : 'Пока стоят и поют «Марсельезу». Пока.'],
        ['foreign', crimea ? 'Священного союза больше нет. Помощи ждать неоткуда.' : Game.spAllyOk() ? `Союзники готовы помочь: ${R.allyName} стоят у границы. Лондон просит «проявить мудрость».` : 'Вена и Петербург молчат. Лондон советует реформы. Совет, как всегда, бесплатный.'],
      ],
      choices,
      after: (out, choice) => Game.spAfter(choice) || (Game.sp().heat >= 95 ? 'revolution' : null),
    };
  },
  spAfter(choice) {
    const e = choice && choice.fx && Game.resolveFx(choice.fx).end;
    if (e === 'abdicate') { S.flags.abdicated = true; return 'retired'; }
    if (e === 'smith') { S.swiss += Math.max(0, S.treasury * 0.4); return 'helicopter'; }
    if (e === 'jamaica') { S.swiss += Math.max(0, S.treasury * 0.4); return 'exile'; }
    return null;
  },
  spRadScene() {
    const P = Game.sp();
    P.radAt = S.turn;
    return {
      title: `${Game.spCfg().rad}: заговор`, bg: 'night',
      lines: [
        ['police', `В ${REGIONS[S.region].jungle} собираются вольные стрелки. Вожак — ${P.opp.name} — обещает провозгласить республику, как в Бадене или в Риме.`],
        ['defense', 'Это уже не студенты с кокардами. У них ружья, порох и друзья за границей.'],
      ],
      choices: [
        { text: 'Арестовать заговорщиков', adv: ['police'], chance: () => clamp(0.4 + S.fear / 200 + (P.tele ? 0.08 : 0), 0.2, 0.85),
          win: { fx: { spRad: -25, fear: 5, fac: { left: { s: -6 } } }, res: 'Ночью жандармы взяли явочную квартиру. Вожака не нашли, но списки и порох — нашли.' },
          lose: { fx: { spRad: 5, spHeat: 8, support: -4 }, res: 'Заговорщиков предупредили. В участке нашли только записку: «Встретимся на баррикадах».' } },
        { text: 'Билеты в Америку: выслать смутьянов', req: S => S.treasury >= 8, reqText: 'нужно 8 млн', fx: { treasury: -8, spRad: -20, economy: -1, fac: { left: { s: -5 } } }, res: 'Пароход до Нью-Йорка увёз двести горячих голов. В Америке их назовут «людьми сорок восьмого года» и выберут в конгресс.' },
        { text: 'Амнистия для тех, кто сложит оружие', fx: { spRad: -15, spHeat: 6, fear: -3, fac: { liberals: { a: 5 } } }, res: 'Половина стрелков вернулась домой. Вторая половина решила, что вы испугались.' },
      ],
    };
  },
  spPromiseScene() {
    const P = Game.sp();
    P.promiseAsked = S.turn;
    return {
      title: 'Где обещанная конституция?', bg: 'square',
      lines: [
        ['npc:professor', 'Прошло полтора года, {sir}. Конституцию обещали, а печатают только оды. Университет требует ответа.'],
        ['propaganda', 'Можно пообещать ещё раз. Обещания у нас хорошо получаются.'],
      ],
      choices: [
        { text: 'Даровать конституцию', fx: { spConst: 'granted', spHeat: -15, fac: { liberals: { a: 12 }, hawks: { a: -6 } }, vsGuar: -12, rel: { $east: -6, $west: 6 } }, res: 'Конституция дарована. Профессор плачет, депутаты заказывают новые сюртуки.' },
        { text: 'Отложить ещё раз', fx: { spHeat: 15, fac: { liberals: { a: -10 } } }, res: 'Вы снова отложили. Студенты уже не верят ни одной вашей бумаге.' },
        { text: 'Забрать обещание назад', adv: ['police'], fx: { spConst: 'none', fear: 4, spHeat: 10, spRad: 8, vsGuar: 6 }, res: 'Обещание отозвано «ввиду изменившихся обстоятельств». Обстоятельства на улице очень недовольны.' },
      ],
    };
  },
  spPronunScene() {
    const P = Game.sp(), R = Game.spCfg();
    P.last = S.turn;
    const prov = P.prov.find(p => p.st === 'rebel') || pick(P.prov);
    const big = P.heat >= 85;
    const choices = [
      { text: 'Выступить навстречу с армией', adv: ['defense'], chance: () => clamp(0.3 + S.army / 220 + S.fac.hawks.a / 400 - P.heat / 400, 0.15, 0.8),
        win: { fx: { spHeat: -35, army: 3, fear: 5 }, res: `Две армии сошлись у моста. Ваши пушки выстрелили первыми, и ${prov.gen} сдался вместе с оркестром. Его «План» торжественно сожгли на площади.` },
        lose: { fx: { spHeat: 10, army: -10, support: -6 }, res: 'Половина ваших полков перешла к мятежникам вместе с обозом. Вторая половина спрашивает, когда жалованье.' } },
      { text: `Купить генерала: чин маршала и асьенда`, adv: ['economy'], req: S => S.treasury >= 15, reqText: 'нужно 15 млн', fx: { treasury: -15, spHeat: -25, fac: { hawks: { s: 3, a: 4 } } }, res: `${prov.gen} объявил, что «недоразумение улажено», и уехал осматривать новую асьенду. Его солдаты получили по песо и вернулись в казармы.` },
      { text: 'Уступить: созвать конгресс и обещать реформы', fx: { spHeat: -18, fac: { liberals: { a: 10 }, hawks: { a: -6 } }, spConst: P.const === 'granted' ? 'granted' : 'promised' }, res: 'Конгресс созван. Генерал-мятежник избран депутатом и требует себе председательское кресло.' },
    ];
    if (Game.spAllyOk()) choices.push({ text: `Попросить защиты: ${R.allyName}`, fx: { spHeat: -30, support: -6, rel: { uk: 4, usa: -6 } }, res: 'Британский фрегат навёл пушки на мятежный порт. Генерал вспомнил, что давно хотел на покой.' });
    choices.push({ text: 'Сесть на британский пакетбот до Ямайки', fx: { end: 'jamaica' }, res: 'Пакетбот отходит на рассвете. В каюте — сундуки казны и ваш любимый попугай. Каждый каудильо однажды уплывает на Ямайку.' });
    return {
      title: `Пронунсиамьенто: ${prov.name}`, bg: 'square', crisis: big,
      lines: [
        ['narrator', `${prov.gen[0].toUpperCase() + prov.gen.slice(1)} в провинции ${prov.name} зачитал перед войсками «План спасения республики»: вы низложены, конституция восстановлена, а он — временный президент. ${big ? 'К нему присоединились ещё три гарнизона.' : 'Пока к нему присоединился один гарнизон.'}`],
        ['defense', big ? 'Ещё неделя — и они будут у столицы. Генералы ждут, кто победит, чтобы к нему присоединиться.' : 'Пока он марширует с оркестром. Оркестр, правда, хороший.'],
        ['foreign', Game.spAllyOk() ? 'Британский консул намекает, что фрегат в бухте может пригодиться.' : 'Британский консул пожимает плечами: «Внутреннее дело республики».'],
      ],
      choices,
      after: (out, choice) => Game.spAfter(choice) || (Game.sp().heat >= 92 ? 'coup' : null),
    };
  },
  spFilibusterScene() {
    const P = Game.sp();
    P.radAt = S.turn;
    return {
      title: 'Флибустьеры у берегов', bg: 'jungle',
      lines: [
        ['narrator', 'В бухте Санта-Крус высадились двести американских авантюристов с винтовками и флагом с одной звездой. Их вожак объявил себя президентом «Республики Свободного Побережья».'],
        ['npc:usa_amb', 'Правительство Соединённых Штатов не имеет к этим господам никакого отношения. Но если они победят, мы, конечно, признаем свершившийся факт.'],
        ['defense', 'Их мало, но они хорошо вооружены. А местные пеоны пока не решили, за кого они.'],
      ],
      choices: [
        { text: 'Сбросить их в море', adv: ['defense'], chance: () => clamp(0.35 + S.army / 200, 0.2, 0.85),
          win: { fx: { spRad: -30, army: 3, support: 6, rel: { usa: -4 } }, res: 'Флибустьеров разбили у причала. Вожака отправили домой в бочке из-под рома. Страна празднует.' },
          lose: { fx: { spRad: 10, army: -8, economy: -6, support: -8, flag: { lostCoast: true } }, res: 'Флибустьеры удержали побережье. Порт Санта-Крус теперь «независимая республика», а таможенные сборы идут в карман авантюристов.' } },
        { text: 'Попросить британский фрегат', req: () => Game.sp().guar >= 50, reqText: 'нужен британский щит ≥ 50', fx: { spRad: -25, rel: { uk: 3, usa: -6 }, support: -3 }, res: 'Британский фрегат дал залп поверх голов. Флибустьеры вспомнили о срочных делах в Калифорнии.' },
        { text: 'Продать Вашингтону спорную долину', fx: { treasury: 25, spRad: -30, support: -10, fac: { hawks: { a: -10 } } }, res: 'Вашингтон купил долину и пообещал «навести порядок». Флибустьеры ушли. Патриоты называют вас вторым Санта-Анной.' },
      ],
    };
  },
  spCongressScene() {
    const C = Game.spCfg().congress, R = REGIONS[S.region], lat = Game.spLat();
    S.flags.congress48 = true;
    const avg = R.countries.reduce((a, c) => a + (S.rel[c] || 0), 0) / R.countries.length;
    const P = Game.sp(), patron = R.patron;
    const allRel = d => Object.fromEntries(R.countries.map(c => [c, d]));
    const winP = clamp(0.3 + P.guar / 250 + avg / 300, 0.15, 0.85);
    return {
      title: C.title, bg: 'palace',
      lines: [
        ['narrator', `${C.place[0].toUpperCase() + C.place.slice(1)} собрались министры и посланники. Под звон бокалов решают, ${C.what}. И заодно — что делать с ${lat ? 'вашей республикой' : 'вашим государством'}.`],
        lat ? ['foreign', 'Перу, Чили, Боливия и Эквадор хотят союза против европейских флотов. Мексика просит помощи против гринго. А британский консул пришёл «просто послушать».']
          : ['foreign', S.region === 'german48' ? 'Австрия хочет вернуть старый Германский союз и свою власть над ним. Пруссия хочет свою. Малые дворы вроде нашего делят на «надёжные» и «присоединяемые».' : 'Австрия, Франция, Испания и Неаполь решают судьбу Рима. И заодно — какие короли полуострова достойны защиты, а какие — «присмотра».'],
        lat ? ['npc:uk_amb', 'Её величество желает республикам мира и свободной торговли. Особенно торговли.'] : ['npc:russia_amb', 'Государь император советует вам быть надёжным. Это дружеский совет. Пока дружеский.'],
      ],
      choices: [
        { text: 'Дать бал для делегаций', adv: ['foreign'], req: S => S.treasury >= 15, reqText: 'нужно 15 млн', chance: () => winP,
          win: { fx: { treasury: -15, vsGuar: 15, rel: allRel(5), support: 3, economy: 3 }, res: Game.fmt(`Бал удался, переговоры — тоже. Конференция признала ваши права на {disputed}, а посланники уехали с подарками и тёплыми словами.`) },
          lose: { fx: { treasury: -15, rel: allRel(-2) }, res: 'Бал удался, переговоры — нет. Делегации танцевали до утра, а решения приняли без вас, за завтраком.' } },
        { text: `Искать гарантии у державы: ${Game.cName(patron)}`, fx: { rel: { [patron]: 15, $west: lat ? 0 : -4 }, vsGuar: 10, fac: { liberals: { a: -4 } } }, res: `Вы подписали секретный протокол с ${cIns(patron)}. Теперь у вас есть покровитель. И, возможно, хозяин.` },
        lat ? { text: 'Подписать оборонительный пакт республик', fx: { rel: { mexico: 12, usa: -8, spain: -6 }, spRad: -10, support: 4 }, res: 'Республики поклялись защищать друг друга от любых интервентов. Клятва прекрасная, флотов у республик — два с половиной.' }
          : { text: 'Пообещать Лондону и Парижу конституцию', fx: { rel: { $west: 12, $east: -8 }, vsGuar: -10, spConst: P.const === 'granted' ? 'granted' : 'promised', fac: { liberals: { a: 8 } } }, res: 'Западные посланники пожали вам руку. Австрийский и русский — нет. Обещание конституции напечатали в лондонской «Таймс».' },
        { text: 'Не ехать на конференцию', chance: () => clamp(P.guar / 120, 0.2, 0.7),
          win: { fx: {}, res: 'Без вас ничего важного не решили. Иногда лучшая дипломатия — сидеть дома.' },
          lose: { fx: { flag: { protectorate: true }, army: -8, support: -8, rel: { [patron]: 8 }, vsGuar: 10 }, res: `Без вас решили, что ваша страна нуждается в «защите». В крепость входит гарнизон: ${Game.cName(patron)}. Его содержание — за ваш счёт.` } },
      ],
    };
  },
  spCrimeaScene() {
    S.flags.crimea48 = true;
    return {
      title: 'Священного союза больше нет', bg: 'office',
      lines: [
        ['foreign', 'Царь и император Австрии больше не разговаривают, {sir}. Вена выставила Петербургу ультиматум, а Берлин делает вид, что ничего не слышит.'],
        ['police', 'Значит, если на улицах снова появятся баррикады, помощи не будет. Ни от кого.'],
        ['narrator', 'Венская система, тридцать девять лет охранявшая троны Европы, умерла не на баррикадах, а за столом переговоров. Дальше каждый сам за себя.'],
      ],
      choices: [
        { text: 'Укреплять собственную армию', adv: ['defense'], req: S => S.treasury >= 10, reqText: 'нужно 10 млн', fx: { treasury: -10, army: 6, fac: { hawks: { a: 5 } } }, res: 'Армия получила новые ружья Минье. Офицеры счастливы: теперь они — единственная гарантия.' },
        { text: 'Искать друзей в Лондоне и Париже', adv: ['foreign'], fx: { rel: { $west: 8, russia: -6 } }, res: 'Лондон и Париж ответили любезно. Любезность у них, как известно, тоже имеет цену.' },
        { text: 'Положиться на любовь подданных', fx: { support: 3, fear: -2 }, res: 'Вы решили, что лучшая гарантия — довольный народ. Министр полиции считает это очень смелой мыслью.' },
      ],
    };
  },
});

// ---------- эффекты и риски ----------
Game.newGameHooks.push(() => { Game.eraLook(); if (S.era === '1848') { Game.sp(); if (S.regime === 'charter') S.sp.constAt = 0; } });
const _load48 = Game.load;
Game.load = function () { const r = _load48.call(Game); if (r) Game.eraLook(); return r; };
Game.applyHooks.push(fx => {
  if (S.era !== '1848') return;
  const P = Game.sp();
  if (fx.spHeat) {
    // в дни новостей зарубежные революции разогревают улицу сильнее, если есть железные дороги и телеграф
    const k = fx.spHeat > 0 && S.phase === 'news' ? 1 + P.rail * 0.12 + (P.tele ? 0.1 : 0) : 1;
    P.heat = clamp(P.heat + fx.spHeat * k);
  }
  if (fx.spRad) P.rad = clamp(P.rad + fx.spRad);
  if (fx.vsGuar) P.guar = clamp(P.guar + fx.vsGuar);
  if (fx.spConst && fx.spConst !== P.const) { P.const = fx.spConst; P.constAt = S.turn; }
  if (fx.spCens !== undefined) P.cens = !!fx.spCens;
  if (fx.spRail) P.rail = Math.min(3, P.rail + fx.spRail);
  if (fx.spTele || (fx.flag && fx.flag.telegraph48)) P.tele = true;
});
Game.previewHooks.push((fx, out) => {
  if (S.era !== '1848') return;
  const R = Game.spCfg(), first = [];
  if (fx.spHeat) first.push({ icon: Game.spLat() ? '⚔️' : '🧱', d: -fx.spHeat, label: R.heat, text: `${R.heat.toLowerCase()} ${sign(fx.spHeat)}` });
  if (fx.spRad) first.push({ icon: Game.spLat() ? '🦅' : '🗡️', d: -fx.spRad, label: R.rad, text: `${R.rad.toLowerCase()} ${sign(fx.spRad)}` });
  if (fx.vsGuar) first.push({ icon: Game.spLat() ? '⚓' : '🕊️', d: fx.vsGuar, label: R.guar, text: `${R.guar.toLowerCase()} ${sign(fx.vsGuar)}` });
  if (fx.spConst) first.push({ icon: '📜', d: fx.spConst === 'granted' ? 1 : fx.spConst === 'revoked' ? -1 : 0, label: 'Конституция', text: `конституция: ${SP_CONST[fx.spConst]}` });
  if (fx.spCens !== undefined) first.push({ icon: '✒️', d: 0, label: 'Цензура', text: fx.spCens ? 'строгая цензура' : 'цензура мягче' });
  if (fx.spRail) first.push({ icon: '🚂', d: 1, label: 'Железные дороги', text: 'железная дорога +1' });
  if (fx.spTele) first.push({ icon: '📡', d: 1, label: 'Телеграф', text: 'телеграф' });
  out.unshift(...first);
});
Game.revHooks.push(() => {
  if (S.era !== '1848' || !S.sp) return 0;
  if (Game.spLat()) return Math.max(0, S.sp.rad - 60) / 40 * 0.05;
  return Math.max(0, S.sp.heat - 40) / 60 * 0.12 + Math.max(0, S.sp.rad - 45) / 55 * 0.08;
});
Game.coupHooks.push(() => {
  if (S.era !== '1848' || !S.sp) return 0;
  let r = (S.flags.bayonets ? 0.02 : 0) - (S.flags.protectorate ? 0.05 : 0);
  if (Game.spLat()) r += Math.max(0, S.sp.heat - 40) / 60 * 0.15;
  return r;
});
Game.incomeHooks.push(() => (S.era === '1848' && S.flags.protectorate ? { label: `Содержание гарнизона: ${Game.cName(REGIONS[S.region].patron)}`, v: -3 } : (S.era === '1848' && S.flags.lostCoast ? { label: 'Потеря таможни Санта-Круса', v: -3 } : null)));

// Начало квартала: пролог, конгресс, баррикады, заговоры
Game.forcedList.push(() => {
  if (S.era !== '1848' || S.over) return null;
  const P = Game.sp(), R = Game.spCfg(), lat = Game.spLat();
  // сводка: что произошло в столицах
  const t = Game.eraTime();
  const list = lat ? [['mexico', 'Мексика', SP_MEXICO]] : R.cities.map(k => [k, SP_CITIES[k][0], SP_CITIES[k][3]]);
  for (const [k, name, tl] of list) for (const [at, st, res] of tl) {
    const key = k + at;
    if (at > t + 0.01 || P.cityDone.includes(key)) continue;
    P.cityDone.push(key);
    P.log.unshift({ y: Math.floor(at), name, res, st, real: true });
  }
  if (!S.flags.prologue48 && S.turn === 0) return Game.spPrologue();
  const [cy, cq] = R.congress.at;
  if (!S.flags.congress48 && S.year === cy && S.q === cq) return Game.spCongressScene();
  if (!lat && !S.flags.crimea48 && Game.spCrimea()) return Game.spCrimeaScene();
  if (P.heat >= 70 && S.turn - P.last >= 3) return lat ? Game.spPronunScene() : Game.spBarricadeScene();
  if (P.rad >= 70 && S.turn - P.radAt >= 6) return lat ? Game.spFilibusterScene() : Game.spRadScene();
  if (!lat && P.const === 'promised' && S.turn - P.constAt >= 6 && S.turn - P.promiseAsked >= 6) return Game.spPromiseScene();
  return null;
});
// Конец квартала: дрейф улицы, республиканцев и гарантии; провинции в Латинской Америке
Game.quarterHooks.push(rep => {
  if (S.era !== '1848') return;
  const P = Game.sp(), R = Game.spCfg(), lat = Game.spLat(), t = Game.eraTime();
  if (lat) {
    const H = S.fac.hawks;
    P.heat = clamp(P.heat + 0.8 + Math.max(0, 55 - H.a) / 12 + (S.treasury < 0 ? 1.5 : 0) + (S.army < 45 ? 1 : 0) - S.fear / 100 - (H.a > 65 ? 1.2 : 0) - (P.const === 'granted' ? 0.4 : 0));
    P.rad = clamp(P.rad + 0.5 + (t >= 1846.25 && t < 1848.25 ? 0.8 : 0) + (t >= 1849 ? 0.5 : 0) + P.rail * 0.3 - (S.army >= 60 ? 0.6 : 0) - ((S.rel.uk || 0) >= 60 ? 0.6 : 0));
    for (const p of P.prov) {
      if (p.st === 'pronun') {
        const won = Math.random() < 0.4 + Math.max(0, 50 - H.a) / 200;
        p.st = won ? 'rebel' : 'crushed'; p.t = S.turn;
        P.log.unshift({ y: S.year, name: p.name, res: won ? `${p.gen} поднял гарнизоны против столицы` : `${p.gen} сдался и получил амнистию`, st: p.st });
        const d = won ? 9 : 2;
        P.heat = clamp(P.heat + d);
        rep.lines.push(`${p.name}: ${won ? `${p.gen} не подчиняется столице` : `пронунсиамьенто провалилось, ${p.gen} просит прощения`} (${R.heat.toLowerCase()} +${d}).`);
      } else if ((p.st === 'calm' || S.turn - p.t >= 10) && Math.random() < 0.04 + P.heat / 900 + Math.max(0, 50 - H.a) / 800) {
        p.st = 'pronun'; p.t = S.turn;
        rep.lines.push(`${p.name}: ${p.gen} зачитал перед войсками «План» и требует вашей отставки.`);
      } else if (p.st === 'rebel' && S.turn - p.t >= 6) p.st = 'calm';
    }
  } else {
    const L = S.fac.liberals;
    const spring = t >= 1848 && t < 1849.75;
    P.heat = clamp(P.heat + 0.4 + (S.economy < 40 ? 1.2 : 0) + L.s / 70 + Math.max(0, 45 - S.support) / 14 + ([1846, 1847].includes(S.year) ? 0.8 : 0)
      + (spring && P.const !== 'granted' ? 1.4 : 0) - S.fear / 90 - (S.support > 60 ? 1.5 : 0) - (P.cens ? 1 : 0) + P.rail * 0.3 + (P.tele ? 0.2 : 0) - (t >= 1849.75 ? 0.8 : 0));
    P.rad = clamp(P.rad - 0.8 + (P.cens ? 0.6 : 0) + (P.const === 'revoked' ? 1.2 : 0) + (S.fac.left.st === 'banned' ? 0.5 : 0) + (S.flags.bayonets ? 0.4 : 0) + (spring ? 0.6 : 0));
    if (P.rad >= 50) S.fac.left.s = clamp(S.fac.left.s + 0.8);
  }
  P.guar = clamp(P.guar + (Game.spGuarTarget() - P.guar) * 0.2);
  if (P.heat >= 55) rep.warn.push(`${R.heat}: ${Math.round(P.heat)} из 100. ${P.heat >= 70 ? (lat ? 'Генералы в провинциях готовы выступить.' : 'Улица готова строить баррикады.') : (lat ? 'В гарнизонах шепчутся о «Плане спасения».' : 'В кофейнях читают вслух парижские газеты.')}`);
  if (P.rad >= 55) rep.warn.push(`${R.rad}: ${Math.round(P.rad)}. ${lat ? 'На севере говорят о «явном предначертании».' : 'Заговорщики запасают порох.'}`);
});

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (S.era !== '1848') return;
  const R = REGIONS[S.region], ex = R.exile, rich = S.swiss >= 40, P = S.sp || {}, T = S.leader.title, lat = Game.spLat();
  if (type === 'retired' && S.flags.abdicated) { E.title = `Отрёкся в пользу племянника`; E.text = `Вы подписали отречение, корону получил юный племянник ${R.nephew}, а вы удалились в загородный замок. Как добрый император Фердинанд, вы разводите розы, читаете газеты и каждое утро требуете клёцок. Племянник правит строже вас — и все вспоминают вас с нежностью.`; verdicts.push('Ушёл вовремя'); }
  if (type === 'helicopter') E.title = 'Мистер Смит', E.text = rich ? `Под именем «мистер Смит» вы переплыли пролив и поселились в особняке под Лондоном. По соседству живут ещё два бывших короля и Меттерних. По четвергам вы играете в вист и ругаете конституции.` : `Под именем «мистер Смит» вы переплыли пролив с одним саквояжем. Теперь вы снимаете комнату в Брайтоне и даёте уроки хороших манер. Ученики не верят, что вы были ${Game.titleIns()}.`;
  if (type === 'exile') { E.title = lat ? 'Пакетбот до Ямайки' : 'Бегство с казной'; E.text = lat ? `Британский пакетбот доставил вас на Ямайку вместе с сундуками казны. Там вы пишете манифесты, ждёте, когда республика позовёт вас обратно, и считаете, что ждать придётся недолго. Так думал и Санта-Анна.` : `Вы уехали в почтовой карете за час до того, как мятежники вошли во дворец. Новая власть требует вашей выдачи, но в ${ex} не выдают тех, кто расплачивается золотом.`; }
  if (type === 'coup') E.text = rich ? `Вас свергли генералы. Но благодаря ${Game.bank().dat} вы живёте на вилле в ${ex}, пишете мемуары «Я был ${Game.titleIns()}» и раз в месяц шлёте новой власти гневные письма.` : `Вас свергли генералы. Денег не хватило даже на приличную виллу. Теперь вы даёте уроки фехтования в ${ex} и рассказываете ученикам, что когда-то были ${Game.titleIns()}. Ученики вежливо кивают.`;
  if (type === 'revolution' && (P.heat >= 70 || P.rad >= 70)) { E.title = lat ? 'Сметён пеонами и пурос' : 'Сметён Весной народов'; E.text = lat ? 'Пеоны с мачете и либералы в сюртуках вошли во дворец вместе — впервые в истории республики. Вас отправили в изгнание, а конгресс принял конституцию в первый же день.' : `Толпа с трёхцветными кокардами вошла во дворец. Вы смотрели на это из окна почтовой кареты. Профессор ${P.opp ? P.opp.name.split(' ').pop() : ''} провозгласил с балкона республику, а газеты всей Европы назвали вас «последней жертвой сорок восьмого года».`; verdicts.push('Жертва Весны народов'); }
  if (type === 'revolution' && !(P.heat >= 70 || P.rad >= 70)) E.text = 'Революционный трибунал рассмотрел ваше дело и приговорил вас... к работе в провинциальной библиотеке. Каждый день вы выдаёте читателям книги о тиранах и ставите на полку свои портреты.';
  if (type === 'survived') { E.title = lat ? 'Пережил сороковые' : 'Пережил Весну народов'; E.text = lat ? `31 декабря 1854 года. Позади война гринго с Мексикой, золотая лихорадка, флибустьеры и тринадцать пронунсиамьенто. Вы всё ещё ${T}. Генералы удивлены больше всех.` : `31 декабря 1854 года. Позади голодные сороковые, баррикады сорок восьмого года, реакция и Крымская война. Венской системы больше нет, Меттерних пишет мемуары в Брюсселе, а вы всё ещё ${T}. ${P.const === 'granted' ? 'С конституцией, которую вы, правда, читали не до конца.' : 'Без всякой конституции — и пока без баррикад.'}`; }
  if (S.flags.bayonets) verdicts.push('Правил на чужих штыках');
  if (P.const === 'granted') verdicts.push(lat ? 'Отец конституции' : 'Конституционный государь');
  if (!lat && P.guar >= 70) verdicts.push('Последний легитимист');
  if (S.flags.protectorate) verdicts.push('Подопечный великой державы');
  if (P.rail >= 3) verdicts.push('Железнодорожный король');
});

// ---------- вкладка ----------
Object.assign(UI, {
  tab_spring() {
    const P = Game.sp(), R = Game.spCfg(), lat = Game.spLat(), t = Game.eraTime();
    const stCol = { calm: '#6a5a40', barr: '#c0602a', rev: '#c8a23a', crushed: '#6a2a24', pronun: '#c0602a', rebel: '#c8a23a' };
    const stText = { calm: 'спокойно', barr: lat ? 'война' : 'баррикады', rev: lat ? 'диктатура' : 'революция', crushed: lat ? 'оккупация' : 'реакция', pronun: 'пронунсиамьенто', rebel: 'мятеж' };
    const stateAt = tl => { let s = 'calm'; for (const [at, st] of tl) if (at <= t + 0.01) s = st; return s; };
    const meCol = P.heat >= 70 ? '#c0602a' : P.heat >= 45 ? '#a8823a' : '#3a5a6a';
    const [mx, my] = R.me;
    let map;
    if (lat) {
      const hex = (x, y, r) => Array.from({ length: 6 }, (_, i) => `${x + r * Math.cos(Math.PI / 3 * i + Math.PI / 6)},${y + r * Math.sin(Math.PI / 3 * i + Math.PI / 6)}`).join(' ');
      const mex = stateAt(SP_MEXICO);
      map = `<svg class="sp-map" viewBox="0 0 600 360" role="img" aria-label="Карта республики и провинций">
        <rect x="200" y="6" width="200" height="40" rx="4" class="sp-north"/><text x="300" y="24" text-anchor="middle" class="sp-t">Мексика</text><text x="300" y="39" text-anchor="middle" class="sp-s">${{ calm: 'мир', barr: 'война с США', crushed: 'гринго в Мехико', rev: 'Санта-Анна' }[mex]}</text>
        <path d="M300 46 L300 ${my - 58}" class="sp-link ${P.rad >= 55 ? 'hot' : ''}"/>
        ${P.prov.map(p => `<line x1="${mx}" y1="${my}" x2="${p.x}" y2="${p.y}" class="sp-link ${p.st === 'rebel' ? 'hot' : ''}"/>`).join('')}
        ${P.prov.map(p => `<g class="${p.st === 'pronun' ? 'cr-pulse' : ''}"><polygon points="${hex(p.x, p.y, 48)}" fill="${stCol[p.st]}" class="sp-node"/><text x="${p.x}" y="${p.y - 2}" text-anchor="middle" class="sp-t sm">${esc(p.name.replace(/^Порт /, ''))}</text><text x="${p.x}" y="${p.y + 14}" text-anchor="middle" class="sp-s">${stText[p.st]}</text></g>`).join('')}
        <g class="${P.heat >= 70 ? 'cr-pulse' : ''}"><polygon points="${hex(mx, my, 56)}" fill="${meCol}" class="sp-node me"/><text x="${mx}" y="${my - 6}" text-anchor="middle" class="sp-t big">${esc(S.country.replace(/^Республика /, ''))}</text><text x="${mx}" y="${my + 14}" text-anchor="middle" class="sp-s">генералы ${Math.round(P.heat)}</text></g>
      </svg>`;
    } else {
      const C = R.cities.map(k => { const [name, x, y, tl] = SP_CITIES[k]; return { name, x, y, st: stateAt(tl) }; });
      map = `<svg class="sp-map" viewBox="0 0 600 440" role="img" aria-label="Карта Европы: столицы революций">
        <path d="M40 120 Q120 40 250 50 Q330 10 430 50 Q540 90 575 170 Q580 270 520 300 Q440 320 410 420 L350 432 Q300 380 270 320 Q220 300 170 290 Q60 260 40 120 Z" class="sp-land"/>
        ${C.map(c => `<line x1="${mx}" y1="${my}" x2="${c.x}" y2="${c.y}" class="sp-link ${c.st === 'rev' || c.st === 'barr' ? 'hot' : ''}"/>`).join('')}
        ${C.map(c => `<g class="${c.st === 'barr' ? 'cr-pulse' : ''}"><circle cx="${c.x}" cy="${c.y}" r="15" fill="${stCol[c.st]}" class="sp-node"/><text x="${c.x}" y="${c.y - 21}" text-anchor="middle" class="sp-t">${c.name}</text><text x="${c.x}" y="${c.y + 30}" text-anchor="middle" class="sp-s">${stText[c.st]}</text></g>`).join('')}
        <g class="${P.heat >= 70 ? 'cr-pulse' : ''}"><rect x="${mx - 52}" y="${my - 24}" width="104" height="48" rx="6" fill="${meCol}" class="sp-node me"/><text x="${mx}" y="${my - 4}" text-anchor="middle" class="sp-t big">${esc(REGIONS[S.region].capital)}</text><text x="${mx}" y="${my + 14}" text-anchor="middle" class="sp-s">${R.heat.toLowerCase()} ${Math.round(P.heat)}</text></g>
      </svg>`;
    }
    const [cy, cq] = R.congress.at;
    const congressTxt = S.flags.congress48 ? `${R.congress.title} — уже позади.` : `${R.congress.title}: ${['I', 'II', 'III', 'IV'][cq - 1]} квартал ${cy} года. Державы решат, ${R.congress.what}.`;
    const allyTxt = lat ? `Британская эскадра: ${Game.spAllyOk() ? 'придёт на помощь' : 'нужны щит ≥ 55 и отношения с Британией ≥ 50'}.`
      : Game.spCrimea() ? 'Священного союза больше нет: помощи ждать неоткуда.' : `Помощь союзников (${R.allyName}): ${Game.spAllyOk() ? 'доступна' : 'нужны гарантия ≥ 55 и отношения ≥ 50'}.`;
    const lede = lat
      ? 'Главная угроза каудильо — свои же генералы. Каждый может объявить пронунсиамьенто: зачитать «План» перед войсками и пойти на столицу. Генералов успокаивают эполеты, жалованье и сильная армия. С севера смотрят США: после Техаса и Калифорнии флибустьеры ищут новые земли. Защищает британский флот, если дружить с Лондоном.'
      : 'Главная угроза сороковых — баррикады. Улицу разогревают голод, сильные либералы, обещания без конституции и революции в соседних столицах; железные дороги и телеграф ускоряют новости. Если баррикады дойдут до 70, люди выйдут строить их у дворца. Подавление остужает улицу, но растит республиканский заговор. Венская гарантия — это готовность Священного союза прислать войска; конституции она не любит и умрёт вместе с Крымской войной.';
    const log = P.log.slice(0, 14).map(e => `<li><time>${e.y}</time><span><b>${esc(e.name)}</b> — ${esc(e.res)}${e.real ? '' : ' <span class="chip">провинции</span>'}</span></li>`).join('') || '<li><span class="muted">Пока в Европе тихо. Слишком тихо.</span></li>';
    const acts = Game.spActions();
    return `<p class="lede">${lede}</p>
      <div class="cr">
        <section class="card cr-map-card"><div class="eyebrow">${lat ? 'Республика и провинции' : 'Столицы Европы'}</div>${map}
          <div class="legend">${(lat ? [['calm', 'спокойно'], ['pronun', 'пронунсиамьенто'], ['rebel', 'мятеж'], ['crushed', 'подавлено']] : [['calm', 'спокойно'], ['barr', 'баррикады'], ['rev', 'революция победила'], ['crushed', 'реакция']]).map(([k, n]) => `<span><i style="background:${stCol[k]}"></i>${n}</span>`).join('')}</div></section>
        <section class="card cr-side">
          ${UI.meter(R.heat, P.heat, P.heat >= 70 ? 'bad' : P.heat >= 45 ? 'warn' : 'good')}
          ${UI.meter(R.rad, P.rad, P.rad >= 60 ? 'bad' : P.rad >= 35 ? 'warn' : 'good')}
          ${UI.meter(R.guar, P.guar, P.guar >= 55 ? 'good' : P.guar >= 35 ? 'warn' : 'bad')}
          <div class="sp-facts">
            <span class="chip ${P.const === 'granted' ? 'coopted' : P.const === 'revoked' ? 'banned' : ''}">📜 Конституция: ${SP_CONST[P.const]}</span>
            ${lat ? '' : `<span class="chip ${P.cens ? 'banned' : ''}">✒️ Цензура: ${P.cens ? 'строгая' : 'умеренная'}</span>`}
            <span class="chip">🚂 Дороги: ${P.rail} из 3</span>${lat ? '' : `<span class="chip">📡 Телеграф: ${P.tele ? 'есть' : 'нет'}</span>`}
          </div>
          <div class="cr-opp"><span class="cr-ribbon" style="background:${lat ? '#9a1a1a' : S.region === 'italy48' ? 'linear-gradient(#009246 33%, #f4f1ea 33% 66%, #ce2b37 66%)' : 'linear-gradient(#111 33%, #c1272d 33% 66%, #d6a63a 66%)'}"></span><div><b>${esc(P.opp.name)}</b><span class="muted small">${esc(P.opp.role)} · ${lat ? 'самый опасный генерал' : 'лидер оппозиции'}</span></div></div>
          <p class="muted small">${esc(congressTxt)} ${esc(allyTxt)}</p>
        </section>
      </div>
      <section class="card mt"><div class="eyebrow">${lat ? 'Хроника: Мексика и провинции' : 'Сводка: революции в столицах'}</div><ul class="log cr-log">${log}</ul></section>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p><div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx))}</div></div></div>${UI.actBtn('sp:' + a.id, { name: 'Приказать', cost: a.cost, ok: a.ok, danger: a.danger })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('sp:')) return false;
  const out = Game.spAction(id.slice(3));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});

// ---------- прихоти и проекты министров в духе 1840-х ----------
const WHIMS48 = {
  defense: [
    { say: '{Addr}, у генерала соседнего двора плюмаж на два вершка выше моего! Это позор для всей армии!',
      yes: ['Пожаловать генералу новый плюмаж и орден', { treasury: -3, loy: { defense: 12 }, fac: { hawks: { a: 3 } } }, 'Плюмаж генерала теперь задевает люстры. Генерал сияет, люстры качаются.'],
      no: ['Отказать: плюмажей и так достаточно', { loy: { defense: -8 } }, 'Генерал ушёл, тряся плюмажем особенно обиженно.'],
      alt: ['Вручить медаль «За скромность»', { loy: { defense: 3 }, support: 1 }, 'Генерал не понял иронии и повесил медаль на самое видное место.'] },
    { say: 'Армии нужны новые ружья Дрейзе, игольчатые! Пруссаки уже стреляют лёжа, а мы всё заряжаем с дула, как при Фридрихе Великом.',
      yes: ['Закупить новые ружья', { treasury: -12, army: 5, loy: { defense: 10 } }, 'Новые ружья стреляют в пять раз быстрее. Солдаты в восторге, интенданты — в ужасе от расхода пороха.'],
      no: ['Отказать', { loy: { defense: -7 } }, 'Генерал назвал вас «штатским» за вашей спиной. Министр полиции записал.'],
      alt: ['Купить сотню — для гвардии', { treasury: -4, loy: { defense: 4 } }, 'Гвардия стреляет по-новому, остальные смотрят с завистью.'] },
  ],
  economy: [
    { say: 'Меня зовут на конгресс экономистов в Брюссель! Нужна карета, свита человек на двадцать и новый сюртук. Для веса.',
      yes: ['Отправить с делегацией', { treasury: -8, loy: { economy: 10 }, rel: { $west: 2 } }, 'Доклад «О пользе таможен для государей» сорвал аплодисменты. Делегация скупила все брюссельские кружева.'],
      no: ['Отказать', { loy: { economy: -7 } }, 'Министр читает отчёты о конгрессе в газетах и тяжело вздыхает.'],
      alt: ['Пусть едет почтовой каретой, один', { loy: { economy: 2 } }, 'Министр трясся в почтовой карете шесть дней. Доклад всё равно понравился.'] },
    { say: '{Addr}, в Лондоне изобрели счётную машину мистера Бэббиджа! Хочу такую. Чтобы считать бюджет. И, может быть, выигрывать в вист.',
      yes: ['Заказать машину', { treasury: -8, economy: 1, loy: { economy: 8 } }, 'Машину не достроили даже в Лондоне. Зато чертежи висят у министра в кабинете и внушают уважение.'],
      no: ['Отказать: есть счёты', { loy: { economy: -5 } }, 'Министр уходит, громко щёлкая костяшками счётов.'] },
  ],
  police: [
    { say: 'Вчера караул не пустил меня во дворец без пароля! Меня! Это подрыв авторитета полиции!',
      yes: ['Выдать пожизненный пароль во все двери', { fear: 1, loy: { police: 10 } }, 'Теперь министр полиции может войти куда угодно. Даже туда, куда вы не хотели бы.'],
      no: ['Караул поступил правильно', { loy: { police: -6 } }, 'На начальника караула заведено досье. Толстое.'],
      alt: ['Наказать караул нарядом вне очереди', { loy: { police: 6 }, fac: { hawks: { a: -3 } } }, 'Караульные драят плац. Офицеры недовольны, министр полиции улыбается.'] },
    { say: 'Нам нужен «чёрный кабинет» на почтамте. Вскрывать письма паром, читать и запечатывать обратно. Как в Вене у князя Меттерниха.',
      yes: ['Открыть чёрный кабинет', { treasury: -8, fear: 4, loy: { police: 12 } }, 'Чиновники над чайниками читают переписку всей страны. Самые интересные письма министр зачитывает вам за обедом.'],
      no: ['Отказать', { loy: { police: -7 } }, 'Министр читает только то, что ему приносят дворники. Дворники неграмотны.'],
      alt: ['Вскрывать только письма из Парижа', { treasury: -3, loy: { police: 5 } }, 'Парижская почта приходит с опозданием на неделю и пахнет паром.'] },
  ],
  propaganda: [
    { say: 'Никто не читает мои оды! Сорок од на вашем столе, а напечатали вы одну. И ту про охоту!',
      yes: ['Издать собрание од за казённый счёт', { treasury: -5, support: 1, loy: { propaganda: 12 } }, 'Вышли «Оды к государю» в трёх томах. Тираж раскупили министерства. По разнарядке.'],
      no: ['Напомнить, кто здесь главный', { loy: { propaganda: -8 }, fear: 1 }, 'Цензор обиделся: целую неделю газеты печатают только прогноз урожая.'],
      alt: ['Назначить «первым поэтом двора» (без жалованья)', { loy: { propaganda: 6 }, fac: { liberals: { a: -3 } } }, 'Новая должность, лавровый венок, старое жалованье. Поэт в восторге.'] },
    { say: 'Нам нужен придворный дагеротипист! Ваш портрет, отпечатанный самим солнцем, — в каждой ратуше!',
      yes: ['Пригласить дагеротиписта из Парижа', { treasury: -6, support: 2, loy: { propaganda: 10 } }, 'Позировать пришлось двадцать минут без движения. На дагеротипе вы выглядите строгим. На самом деле у вас затекла шея.'],
      no: ['Отказать', { loy: { propaganda: -6 } }, 'В ратушах по-прежнему висит старая гравюра, на которой вы моложе на десять лет и стройнее на двадцать фунтов.'],
      alt: ['Заказать гравюру у местного мастера', { treasury: -2, loy: { propaganda: 4 } }, 'Мастер изобразил вас похожим на Наполеона. Сходство спорное, но лестное.'] },
  ],
  foreign: [
    { say: 'Посланники смеются над моей каретой! Ей двенадцать лет, у неё дверь открывается только изнутри!',
      yes: ['Купить новую карету', { treasury: -8, loy: { foreign: 10 } }, 'Новая карета длиннее, чем у британского посланника. На два дюйма. Министр счастлив.'],
      no: ['Отказать', { loy: { foreign: -6 } }, 'Министр ездит на приёмы верхом. Посланники снова смеются.'],
      alt: ['Одолжить ему вашу карету', { loy: { foreign: 12 }, support: -1 }, 'Министр ездит в вашей карете. Народ решил, что это вы, и снимает шляпы.'] },
    { say: 'Я написал поэму о нашей внешней политике. Тысяча строф! Её надо прочитать на балу перед всеми посланниками.',
      yes: ['Прочитать на балу', { treasury: -4, loy: { foreign: 10 }, rel: { $west: -1, $east: -1 } }, 'Чтение заняло три часа. Посланники вежливо аплодировали. Проснувшиеся — громче.'],
      no: ['Отказать', { loy: { foreign: -8 } }, 'Министр читает поэму жене. Жена уехала к маме в деревню.'],
      alt: ['Издать, но не читать', { treasury: -4, loy: { foreign: 4 } }, 'Тираж — пятьсот экземпляров. Четыреста девяносто министр подарил посланникам.'] },
  ],
};
const PROJECTS48 = {
  defense: [{ id: 'academy', name: 'Военная академия имени {title_gen}', q: 4, cost: 6, payoff: { army: 8, fac: { hawks: { a: 8 } } }, pitch: 'Своя военная академия! Офицеры будут учиться у нас, а не в чужих столицах. И учиться верности.' },
    { id: 'fortress', name: 'Крепость над столицей', q: 5, cost: 8, payoff: { army: 6, fear: 6, spHeat: -8 }, pitch: 'Бастионы, пушки, казематы. Пушки, разумеется, смотрят на границу. В основном на границу.' }],
  economy: [{ id: 'railco', name: 'Казённое железнодорожное общество', q: 5, cost: 7, payoff: { economy: 6, treasury: 18, spRail: 1 }, pitch: 'Паровозы под нашим гербом! Грузы, пассажиры, престиж. И бесплатный вагон для министров.' },
    { id: 'bourse', name: 'Фондовая биржа', q: 4, cost: 5, payoff: { economy: 5, fac: { oligarchs: { a: 10 } } }, pitch: 'Биржа! Акции, облигации, маклеры в цилиндрах. Франкфуртские банкиры обожают маклеров в цилиндрах.' }],
  police: [{ id: 'informers', name: 'Осведомитель в каждом трактире', q: 3, cost: 4, payoff: { fear: 8, flag: { informers: true } }, pitch: 'Один осведомитель на трактир. Потом на улицу. Потом на каждого, кто читает газеты.' },
    { id: 'prison', name: 'Образцовая тюрьма „Санаторий“', q: 3, cost: 6, payoff: { fear: 5, fac: { left: { s: -6 }, liberals: { s: -4 } } }, pitch: 'Тюрьма, которую не стыдно показать иностранным путешественникам. И которой не стыдно пугать остальных.' }],
  propaganda: [{ id: 'opera_house', name: 'Королевский оперный театр', q: 4, cost: 6, payoff: { support: 7, loy: { propaganda: 8 } }, pitch: 'Свои оперы о нашей великой истории. Главную партию, разумеется, поёт лучший тенор страны — в вашем мундире.' },
    { id: 'games', name: 'Всенародный стрелковый праздник', q: 3, cost: 5, payoff: { support: 6 }, pitch: 'Стрелки со всей страны, призы, пиво и ваша речь на открытии. Только ружья потом надо будет собрать обратно.' }],
  foreign: [{ id: 'festival', name: 'Большой бал для всех дворов Европы', q: 3, cost: 5, payoff: { relAll: 6, support: 2 }, pitch: 'Как на Венском конгрессе: посланники, вальсы и фейерверк. Европа полюбит нас. Ну, хотя бы её танцоры.' },
    { id: 'lobby', name: 'Свои люди при дворе покровителя', q: 3, cost: 6, payoff: { rel: { $patron: 12 } }, pitch: 'Наши люди в приёмных покровителя. Улыбки, обеды, нужные подписи.' }],
};
