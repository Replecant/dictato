// Канонерки и концессии (1905–1914) — заполняется
Object.assign(NAME_POOLS, { himal: { m: ['Тензин', 'Дордже', 'Лобсанг', 'Карма', 'Таши', 'Сонам', 'Пема', 'Норбу', 'Дава', 'Ринчен'], f: ['Долма', 'Янгчен', 'Цомо'], last: ['Норбу', 'Гьяцо', 'Церинг', 'Дава', 'Пунцок', 'Ринчен', 'Тобгье', 'Намгьял', 'Лхундруп', 'Кхьенце', 'Тхондуп', 'Палджор'] } });
for (const n of ['Долма', 'Янгчен', 'Цомо']) FEMALE_NAMES.add(n);
Object.assign(RICH_TITLE, { himal: 'Дзасак' });
Object.assign(DEFAULT_PILLARS, DEFAULT_PILLARS_05);
CAPITAL_PATTERN.himal = n => `${n}-дзонг`;

// ================= Канонерки и концессии: страну покупают по кускам =================
const ROLES_05 = {
  defense: { title: 'Военный министр', action: 'Военный парад', actionDesc: 'Кавалерия, оркестр и новые пушки на площади. Армия довольна, казна — не очень.' },
  economy: { title: 'Министр финансов', icon: '💰' },
  police: { title: 'Начальник тайной полиции', icon: '🗝️' },
  propaganda: { icon: '✒️', title: 'Министр печати', action: 'Кампания «Отец Отечества»', actionDesc: 'Портреты, открытки и граммофонные пластинки с вашими речами. Народ вас любит. Или делает вид.' },
  foreign: { title: 'Министр иностранных дел' },
};
const _eraLook05 = Game.eraLook;
Game.eraLook = function () { _eraLook05.call(Game); if (S && S.era === '1905') for (const r of Object.keys(ROLES_05)) Object.assign(ROLES[r], ROLES_05[r]); };

// Указы: старинные подходят, современные — нет
for (const [cat, ids] of Object.entries({ absurd: ['gym'], economy: ['lottery'], foreign: ['passports'] })) for (const d of DECREES[cat]) if (ids.includes(d.id) && d.eras) d.eras = d.eras.filter(e => e !== '1905');
for (const cat of Object.keys(DECREES)) for (const d of DECREES[cat]) if (['lottery48', 'bells48', 'opera48'].includes(d.id)) d.eras = [...d.eras, '1905'];

// Текстовые анахронизмы движка
const T05 = [
  ['Военный парад! Танки, оркестр, вы на трибуне. Один танк заехал в фонтан', 'Военный парад! Кавалерия, оркестр, вы на трибуне. Одна лошадь зашла в фонтан'],
  ['в обмен на тракторы и обещания', 'в обмен на паровые машины и обещания'],
  ['улетели первым рейсом, забыв гольф-клюшки', 'уплыли первым пароходом, забыв клюшки для гольфа'],
  ['минуту молчания по радио', 'минуту молчания в соборе'],
  ['Танки у границы с соседями', 'Пушки у границы с соседями'],
  ['Самолёт с палатками', 'Пароход с палатками'],
  ['в аэропорту с чемоданом', 'на вокзале с чемоданом'],
  ['оппозиционное радио «Голос свободы»', 'оппозиционный листок «Голос свободы»'],
  ['пишущая машинка и радиопередача', 'пишущая машинка и листовки'],
];
const t05 = s => (typeof s === 'string' && S && S.era === '1905' ? T05.reduce((a, [f, t]) => a.split(f).join(t), s) : s);
const _fmt05 = Game.fmt;
Game.fmt = function (str) { return t05(_fmt05.call(Game, str)); };
for (const k of ['factionAction', 'countryAction', 'advisorAction', 'economyAction', 'decree']) {
  const orig = Game[k];
  Game[k] = function (...a) { const r = orig.apply(Game, a); if (r && r.text) r.text = t05(r.text); return r; };
}
const _economyActions05 = Game.economyActions;
Game.economyActions = function () {
  const acts = _economyActions05.call(Game);
  if (S.era !== '1905') return acts;
  const h = S.region === 'himal05', g = S.region === 'gulf05';
  for (const a of acts) {
    if (a.id === 'loan_w') Object.assign(a, h ? { name: 'Заём калькуттских банков', desc: 'Казна +50, затем 8 выплат по 7 млн. Под залог шерстяных пошлин.', cost: 'Британская Индия ≥ 40', ok: (S.rel.brindia || 0) >= 40 && S.loans.length < 2 }
      : g ? { name: 'Заём бомбейских банков', desc: 'Казна +50, затем 8 выплат по 7 млн. Под залог жемчужного сбора.', cost: 'Британия ≥ 40', ok: (S.rel.uk || 0) >= 40 && S.loans.length < 2 }
        : { name: 'Заём парижских банкиров', desc: 'Казна +50, затем 8 выплат по 7 млн. Французы любят давать в долг союзникам России.', cost: 'Франция ≥ 40', ok: (S.rel.france || 0) >= 40 && S.loans.length < 2 });
    if (a.id === 'loan_e') Object.assign(a, h ? { name: 'Китайский серебряный заём', desc: 'Казна +50, затем 8 выплат по 7 млн. Пекин считает это данью наоборот.', cost: 'Китай ≥ 40', ok: (S.rel.china || 0) >= 40 && S.loans.length < 2 }
      : { name: 'Заём германских банков', desc: 'Казна +50, затем 8 выплат по 7 млн. Берлин доволен, Лондон — нет.', cost: 'Германия ≥ 40', ok: (S.rel.germany || 0) >= 40 && S.loans.length < 2 });
  }
  return acts;
};
const _economyFx05 = Game.economyFx;
Game.economyFx = function (id) {
  const r = _economyFx05.call(Game, id);
  if (S.era !== '1905') return r;
  const h = S.region === 'himal05', g = S.region === 'gulf05';
  if (id === 'loan_w') { const c = h ? 'brindia' : g ? 'uk' : 'france'; r.fx = { treasury: 50, rel: { [c]: 3 }, g05Indep: -2, loan: { per: 7, turns: 8 } }; r.text = 'Банкиры выдали заём под залог таможни. На таможне теперь сидит иностранный контролёр с усами и гроссбухом.'; }
  if (id === 'loan_e') { const c = h ? 'china' : 'germany'; r.fx = { treasury: 50, rel: { [c]: 5 }, g05Indep: -2, loan: { per: 7, turns: 8 } }; r.text = h ? 'Пекин прислал серебро и чиновника, который будет «помогать» его тратить.' : 'Германские банки выдали заём, а в придачу — инженеров, которые уже меряют вашу землю под железную дорогу.'; }
  if (id === 'nationalize') r.fx.rel = { $patron: -30 };
  if (id === 'land') r.fx.rel = {};
  return r;
};
const _countryActions05 = Game.countryActions;
Game.countryActions = function (c) {
  const acts = _countryActions05.call(Game, c);
  if (S.era === '1905' && ['russia', 'austria', 'brindia', 'ottoman'].includes(c) && !acts.some(a => a.id === 'arms')) acts.splice(acts.length - 1, 0, { id: 'arms', name: 'Купить оружие', cost: '−20 млн', ok: S.treasury >= 20 && S.rel[c] >= 35 });
  return acts;
};
const _pickDemand05 = Game.pickDemand;
Game.pickDemand = function (c) {
  if (S.era !== '1905') return _pickDemand05.call(Game, c);
  const keep = DEMANDS.filter(d => (d.eras ? d.eras.includes('1905') : ['company', 'tariffs', 'raw', 'buy', 'invite'].includes(d.id)));
  const all = DEMANDS.splice(0, DEMANDS.length, ...keep);
  try { return _pickDemand05.call(Game, c); } finally { DEMANDS.splice(0, DEMANDS.length, ...all); }
};
DEMANDS.push(
  { id: 'rail05', blocs: ['axis'], eras: ['1905'], text: () => 'Дать нам концессию на изыскания под железную дорогу', fx: c => ({ treasury: 8, rel: { [c]: 12, $west: -4 }, g05Indep: -5, g05Riv: 4 }) },
  { id: 'coal05', blocs: ['west'], eras: ['1905'], text: () => 'Разрешить угольную станцию для нашего флота', fx: c => ({ treasury: 5, rel: { [c]: 12, $axis: -4 }, g05Indep: -4, g05Riv: 3 }) },
  { id: 'agents05', blocs: ['west', 'axis'], eras: ['1905'], text: c => (Game.blocOf(c) === 'west' ? 'Выслать германских агентов и инженеров' : 'Выслать английских агентов и миссионеров'), fx: c => ({ rel: { [c]: 10, [Game.blocOf(c) === 'west' ? '$axis' : '$west']: -6 }, g05Riv: 3 }) },
  { id: 'guns05', blocs: ['west', 'axis'], eras: ['1905'], text: () => 'Закупить наши пушки', fx: c => ({ treasury: -10, army: 3, rel: { [c]: 12 } }) },
  { id: 'tribute05', countries: ['china'], eras: ['1905'], text: () => 'Прислать дань в Пекин', cond: () => S.year < 1912, fx: c => ({ treasury: -6, rel: { china: 14 }, g05Indep: -3 }) },
  { id: 'exiles05', countries: ['russia'], eras: ['1905'], text: () => 'Выдать русских революционеров-эмигрантов', fx: c => ({ fear: 3, rel: { russia: 12 }, fac: { liberals: { a: -8 }, left: { a: -6 } } }) },
);
Game.leftBanRel05 = Game.leftBanRel;
Game.leftBanRel = () => (S.era === '1905' ? { $west: -2 } : Game.leftBanRel05());
NEW_FACTIONS['1905'] = {
  name: 'Молодые патриоты', short: 'Патриоты', icon: '🔥',
  desc: 'Студенты и молодые офицеры, читающие о младотурках и японцах. Хотят сильную страну, конституцию и чтобы иностранцы убрались. Особенно последнее.',
  rivals: ['oligarchs'], risk: 'rev', appear: S => S.year >= 1908,
  intro: 'После младотурецкой революции в кофейнях появились молодые люди с горящими глазами. Они называют себя патриотами и считают, что вы продали страну иностранцам по кускам.',
};

// ---------- куски страны: концессии ----------
const G05_REGION = {
  balkan05: {
    tab: 'Пороховая бочка', from: { austria: 'из Вены', germany: 'из Берлина', russia: 'из Петербурга', ottoman: 'из Стамбула', france: 'из Парижа', serbia: 'из Белграда' },
    pieces: {
      rail: ['Восточная железная дорога', '🚂', 3, 10, 25, ['austria', 'germany', 'france', 'russia']],
      tobacco: ['Табачная монополия', '🍂', 2, 6, 15, ['austria', 'france', 'germany']],
      customs: ['Таможня в залог займа', '🛃', 2, 12, 25, ['france', 'germany', 'austria']],
      arms: ['Оружейные заказы', '💣', 1, 5, 12, ['france', 'austria', 'germany', 'russia']],
      mines: ['Рудники в Проклятых горах', '⛏️', 2, 8, 18, ['germany', 'france', 'austria']],
      bank: ['Государственный банк', '🏦', 2, 10, 20, ['france', 'austria', 'russia']],
    },
    prologue: ['1903: майская ночь', 'Два года назад офицеры тайного «Братства» ворвались во дворец, и прежняя династия кончилась одной ночью. Корона досталась вам. Вена хмурится, Петербург улыбается, а заговорщики ждут благодарности.'],
  },
  gulf05: {
    tab: 'Канонерки и концессии', from: {},
    pieces: {
      port: ['Порт для Багдадской дороги', '⚓', 3, 12, 25, ['germany', 'uk', 'russia']],
      oil: ['Нефтяная разведка', '🛢️', 4, 12, 30, ['uk', 'germany', 'france']],
      pearls: ['Жемчужные отмели', '🐚', 2, 6, 15, ['uk', 'france', 'persia']],
      telegraph: ['Телеграфная станция', '📡', 1, 5, 10, ['uk', 'germany', 'ottoman']],
      coal: ['Угольная станция для флота', '🏭', 2, 8, 15, ['uk', 'russia', 'germany', 'france']],
      customs: ['Таможня', '🛃', 2, 10, 18, ['uk', 'ottoman', 'germany']],
    },
    prologue: ['1899: секретный договор', 'Шесть лет назад вы тайно подписали с британским резидентом бумагу: никаких договоров с другими державами, а британский флот защитит вас от султана. Султан о бумаге догадывается, кайзер — тоже.'],
  },
  himal05: {
    tab: 'Большая игра', from: {},
    pieces: {
      telegraph: ['Телеграф через перевалы', '📡', 1, 6, 12, ['brindia', 'russia', 'china']],
      trade: ['Торговые фактории', '🏪', 2, 8, 15, ['brindia', 'china', 'nepal', 'russia']],
      gold: ['Золотые прииски', '🪙', 3, 10, 22, ['brindia', 'china', 'russia', 'japan']],
      wool: ['Шерстяная монополия', '🐑', 2, 6, 14, ['brindia', 'china', 'nepal']],
      road: ['Колёсная дорога через перевал', '🛤️', 2, 10, 20, ['brindia', 'china']],
      mint: ['Монетный двор и серебряный заём', '💰', 2, 10, 20, ['china', 'brindia', 'russia', 'japan']],
    },
    prologue: ['1904: британцы у ворот', 'Год назад британская экспедиция полковника Янгхасбенда прошла через перевалы с пулемётами «Максим». Монахи стреляли из старых ружей и верили в амулеты. Британцы ушли, оставив торговую факторию и долг за «расходы экспедиции».'],
  },
};
const POWER05 = ['uk', 'france', 'russia', 'germany', 'austria', 'ottoman', 'brindia', 'china', 'japan'];

Object.assign(Game, {
  g05() {
    if (!S.g05) {
      const R = G05_REGION[S.region] || G05_REGION.gulf05;
      S.g05 = { indep: { throne05: 82, officers05: 78, reform05: 74 }[S.regime] || 80, riv: 25, pieces: Object.fromEntries(Object.keys(R.pieces).map(k => [k, null])), offer: null, offerAt: 0, gunAt: -99, angry: {}, log: [], side: null };
      if (S.region === 'himal05') { S.g05.pieces.trade = 'brindia'; S.g05.riv = 35; }
    }
    return S.g05;
  },
  g05Cfg() { return G05_REGION[S.region] || G05_REGION.gulf05; },
  g05Income() { const G = Game.g05(), P = Game.g05Cfg().pieces; return Math.round(Object.entries(G.pieces).reduce((a, [k, o]) => a + (o ? P[k][2] : 0), 0) * 0.6); },
  g05Owned() { return Object.values(Game.g05().pieces).filter(Boolean).length; },
  g05Name(c) { return Game.cName(c); },
  g05MakeOffer() {
    const G = Game.g05(), R = Game.g05Cfg(), free = Object.keys(G.pieces).filter(k => !G.pieces[k]);
    if (!free.length) return null;
    const kind = pick(free), cands = R.pieces[kind][5].filter(c => S.rel[c] !== undefined);
    if (!cands.length) return null;
    const power = pick(cands), sum = Math.round(R.pieces[kind][4] * 0.75 * (1 + G.riv / 120));
    return { kind, power, sum, until: S.turn + 3 };
  },
  g05Answer(how) {
    const G = Game.g05(), O = G.offer, R = Game.g05Cfg();
    if (!O || !Game.spend()) return null;
    const [name, , inc, cost] = R.pieces[O.kind], PN = Game.g05Name(O.power);
    const opp = Game.oppBloc(O.power);
    let fx = {}, text = '';
    if (how === 'yes') {
      const foe = Object.values(G.pieces).some(o => o && opp && Game.relTargets(opp).includes(o));
      G.pieces[O.kind] = O.power;
      fx = { treasury: O.sum, rel: { [O.power]: 10 }, g05Indep: -cost, g05Riv: 4 + (foe ? 4 : 0) };
      text = `Концессия «${name}» отдана: ${PN}. Казна получила ${O.sum} млн, а ${PN} — кусок вашей страны. Вам на память — около ${Math.max(1, Math.round(inc * 0.6))} млн дохода в квартал.`;
    } else if (how === 'auction') {
      const rivals = R.pieces[O.kind][5].filter(c => c !== O.power && S.rel[c] !== undefined && Game.blocOf(c) !== Game.blocOf(O.power));
      if (rivals.length && Math.random() < 0.6) {
        const w = pick(rivals);
        G.pieces[O.kind] = w;
        fx = { treasury: Math.round(O.sum * 1.5), rel: { [w]: 8, [O.power]: -8 }, g05Indep: -cost, g05Riv: 8 };
        text = `Торги выиграл соперник: ${Game.g05Name(w)} заплатил в полтора раза больше. ${PN} в ярости и запомнит.`;
        G.angry[O.power] = S.turn;
      } else { fx = { rel: { [O.power]: -4 } }; text = `Торги провалились: соперники не пришли. ${PN} забирает предложение и обижается.`; }
    } else {
      fx = { rel: { [O.power]: -6 } };
      text = `Вы отказали: ${PN}. Посланник поклонился очень сухо.`;
      if (POWER05.includes(O.power) && Math.random() < 0.4) G.angry[O.power] = S.turn;
    }
    G.offer = null; G.offerAt = S.turn;
    G.log.unshift({ y: S.year, text });
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  g05Nationalize(kind) {
    const G = Game.g05(), R = Game.g05Cfg(), o = G.pieces[kind];
    if (!o || !Game.spend()) return null;
    const [name, , , cost] = R.pieces[kind];
    G.pieces[kind] = null;
    G.angry[o] = S.turn;
    const text = `Концессия «${name}» отобрана у державы: ${Game.g05Name(o)}. Народ ликует, посланник пакует чемоданы, а в генштабе этой державы достают карты.`;
    G.log.unshift({ y: S.year, text });
    const changes = Game.apply({ g05Indep: cost, g05Riv: 6, rel: { [o]: -20 }, support: 6, fac: { new: { a: 10 } } });
    Game.log(text);
    return { text, changes };
  },
  g05Actions() {
    const G = Game.g05(), t = Game.eraTime();
    const A = [
      { id: 'balance', name: 'Политика равновесия', desc: 'Каждой державе — по маленькому подарку: орден, заказ, обед. Соперничество за вас ослабевает, казна худеет.', ok: S.treasury >= 6, fx: { treasury: -6, g05Riv: -8, rel: Object.fromEntries(REGIONS[S.region].countries.map(c => [c, 2])) } },
      { id: 'instructors', name: 'Нанять иностранных военных инструкторов', desc: 'Армия научится стрелять залпом и ходить строем. Инструкторы, правда, будут писать отчёты своим генштабам.', ok: S.treasury >= 10, fx: { treasury: -10, army: 6, g05Indep: -2, fac: { hawks: { a: 4 } } } },
      { id: 'school', name: 'Открыть школу инженеров и телеграфистов', desc: 'Свои инженеры — меньше чужих. Через несколько лет концессии будет кому проверять.', ok: S.treasury >= 12, fx: { treasury: -12, fac: { liberals: { a: 6 } }, schedule: [{ in: 4, fx: { g05Indep: 6, economy: 3 }, text: 'Первые выпускники школы инженеров проверяют концессии. Иностранные управляющие нервничают.' }] } },
    ];
    if (t >= 1907.5) A.push({ id: 'hague', name: 'Обратиться к Гаагской конференции', desc: 'Пожаловаться на давление держав юристам всего мира. Державы смеются, но на всякий случай ведут себя осторожнее.', ok: S.treasury >= 3, fx: { treasury: -3, g05Riv: -5, support: 2 } });
    if (!S.flags.neutral05) A.push({ id: 'neutral', name: 'Объявить вечный нейтралитет', desc: 'Ни с Антантой, ни с Тройственным союзом. Обе стороны чуть меньше вас любят, зато в 1914 году будет проще остаться в стороне.', ok: true, fx: { g05Riv: -10, rel: { $west: -3, $axis: -3 }, flag: { neutral05: true } } });
    return A.map(a => ({ ...a, cost: '1 приказ' }));
  },
  g05Action(id) {
    const a = Game.g05Actions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const changes = Game.apply(a.fx);
    const text = `${a.name}. ${a.desc}`;
    Game.log(text);
    return { text, changes };
  },

  // ---------- сцены ----------
  g05Prologue() {
    S.flags.prologue05 = true;
    const [title, text] = Game.g05Cfg().prologue, P = REGIONS[S.region].patron, PN = Game.cName(P);
    return {
      title, bg: 'palace',
      lines: [['narrator', text], ['foreign', `Державы ждут, с кем вы будете дружить. ${PN} считает, что с ним. Остальные с этим не согласны.`]],
      choices: [
        { text: `Опереться на покровителя: ${PN}`, fx: { rel: { [P]: 8 }, g05Indep: -4, g05Riv: -4 }, res: `${PN} доволен и обещает защиту. Остальные державы записали вас в чужой лагерь.` },
        { text: 'Дружить со всеми понемногу', adv: ['foreign'], fx: { g05Riv: 6, rel: Object.fromEntries(REGIONS[S.region].countries.map(c => [c, 2])) }, res: 'Вы улыбаетесь всем. Державы улыбаются в ответ и начинают торговаться за вас.' },
        { text: 'Никому не верить', fx: { g05Indep: 6, support: 3, rel: { [P]: -4 } }, res: 'Вы объявили, что страна принадлежит своему народу. Посланники переглянулись: это они уже слышали.' },
      ],
    };
  },
  g05GunScene() {
    const G = Game.g05(), R = Game.g05Cfg(), RG = REGIONS[S.region];
    G.gunAt = S.turn;
    const angry = Object.keys(G.angry).filter(c => S.turn - G.angry[c] <= 4 && S.rel[c] !== undefined);
    const power = angry.length ? pick(angry) : RG.countries.filter(c => POWER05.includes(c)).sort((a, b) => S.rel[a] - S.rel[b])[0];
    delete G.angry[power];
    const PN = Game.g05Name(power), free = Object.keys(G.pieces).filter(k => !G.pieces[k]);
    const take = free.length ? pick(free) : pick(Object.keys(G.pieces).filter(k => G.pieces[k] !== power));
    const [pname] = R.pieces[take];
    const rivals = RG.countries.filter(c => c !== power && POWER05.includes(c) && Game.blocOf(c) !== Game.blocOf(power) && (S.rel[c] || 0) >= 50);
    const rival = rivals.sort((a, b) => S.rel[b] - S.rel[a])[0];
    const bal = S.region === 'balkan05', him = S.region === 'himal05';
    const title = bal ? `Ультиматум ${R.from[power] || ''}`.trim() : him ? 'Отряд на перевале' : 'Крейсер на рейде';
    const choices = [
      { text: `Подписать: «${pname}» уходит к державе (${PN})`, fx: { g05Indep: -8, support: -5, rel: { [power]: 8 }, g05Piece: [take, power] }, res: `Вы подписали. ${PN} получает «${pname}». ${bal ? 'Посланник уехал довольный' : him ? 'Отряд повернул назад' : 'Крейсер развёл пары и ушёл'}, а в кофейнях вас называют торговцем родиной.` },
      { text: 'Торговаться до последнего', adv: ['foreign'], chance: () => clamp(0.45 + (S.rel[power] || 0) / 300, 0.2, 0.8),
        win: { fx: { treasury: 10, rel: { [power]: 4 }, g05Indep: -3 }, res: 'Министр торговался три дня. Державе достались обещания и небольшая скидка на пошлины, вам — деньги. Все остались при своём.' },
        lose: { fx: { g05Indep: -8, rel: { [power]: -6 } }, res: 'Торг затянулся, и терпение кончилось у них раньше, чем у вас. Условия стали жёстче.' } },
    ];
    if (rival) choices.push({ text: `Позвать соперника: ${Game.g05Name(rival)}`, fx: { g05Riv: 12, g05Indep: 2, rel: { [rival]: 4, [power]: -6 } }, res: `${Game.g05Name(rival)} прислал своего посланника и свой ${him ? 'отряд' : bal ? 'протест' : 'корабль'}. Две державы смотрят друг на друга, а про вас на время забыли.` });
    choices.push({ text: 'Дать отпор', adv: ['defense'], chance: () => clamp(0.15 + S.army / 160 + S.fear / 400, 0.1, 0.7),
      win: { fx: { g05Indep: 6, support: 8, army: -4, rel: { [power]: -10 } }, res: `${bal ? 'Армия заняла перевалы, и Вена решила, что игра не стоит свеч' : him ? 'Ваши стрелки заняли перевал, и отряд ушёл обратно в Индию' : 'Береговые пушки выстрелили, крейсер ответил, но в порт не вошёл'}. Народ празднует. Держава затаила обиду.` },
      lose: { fx: { g05Indep: -12, army: -12, treasury: -15, support: -6 }, res: `${bal ? 'Армия держалась неделю. Вена продиктовала условия и контрибуцию' : him ? 'Пулемёты «Максим» решили дело за полчаса' : 'Крейсер расстрелял форт. На берег высадились морские пехотинцы'}. Теперь у вас долг и чужой комендант.` } });
    if (Game.eraTime() >= 1907.5) choices.push({ text: 'Апеллировать к Гаагскому суду', chance: () => 0.25,
      win: { fx: { g05Indep: 4, support: 4, rel: { [power]: -4 } }, res: 'Газеты всей Европы написали о вашей жалобе. Держава решила, что скандал дороже концессии.' },
      lose: { fx: { g05Indep: -4, support: -2 }, res: 'Гаагские юристы обещали рассмотреть дело через два года. Требования держава предъявила через два дня.' } });
    return {
      title, bg: him ? 'jungle' : 'office',
      lines: [
        [`npc:${power}_amb`, bal ? `Правительство моего государя требует ответа в сорок восемь часов. Иначе мы будем вынуждены принять меры. Неприятные для вас.` : him ? 'Наш отряд стоит на перевале. Мы пришли с миром и с пулемётами. Подпишите — и мы уйдём с миром. Без пулемётов не уйдём.' : 'Крейсер стоит на рейде из чистой вежливости. Но вежливость у нас тоже калибра шесть дюймов.'],
        ['defense', S.army >= 60 ? 'Армия готова. Но против державы мы долго не простоим.' : 'Армия не готова. Честно говоря, она вообще редко готова.'],
        ['foreign', rival ? `У нас есть друг: ${Game.g05Name(rival)}. Позовём — и две державы займутся друг другом.` : 'Друзей, готовых за нас заступиться, пока не видно.'],
      ],
      choices,
      after: () => (Game.g05().indep <= 0 ? 'occupied' : null),
    };
  },
  g05FinaleScene() {
    S.flags.finale05 = true;
    const G = Game.g05(), RG = REGIONS[S.region], bal = S.region === 'balkan05', him = S.region === 'himal05';
    const own = side => Object.values(G.pieces).filter(o => o && Game.blocOf(o) === side).length;
    const W = own('west'), X = own('axis');
    const pay = side => (own(side === 'west' ? 'axis' : 'west') >= 2 ? { g05Indep: -12, economy: -6 } : {});
    return {
      title: 'Август 1914', bg: 'office', crisis: true,
      lines: [
        ['narrator', bal ? 'Вена объявила войну Сербии. Россия мобилизуется, Германия объявила войну России и Франции, Британия — Германии. Ваши соседи уже стреляют, и война стоит у ваших границ.'
          : him ? 'В Европе началась Великая война. Вице-король Индии отправляет полки во Францию. Британский агент спрашивает, не пришлёт ли и владыка тысячу солдат — в знак дружбы.'
            : 'В Европе началась Великая война. Британский крейсер стоит в гавани, а германский консул уверяет, что султан вот-вот вступит в войну на стороне кайзера.'],
        ['foreign', `Сейчас у Антанты ${W} наших концессий, у Тройственного союза — ${X}. Кто бы ни победил, те, кто держит наши железные дороги и порты, захотят их защищать.`],
        ['defense', 'Нужно решать, с кем мы. Нейтралитет — тоже решение, но его надо уметь удержать.'],
      ],
      choices: [
        { text: 'Встать на сторону Антанты', fx: { rel: { $west: 15, $axis: -20 }, g05Riv: 10, flag: { side05: 'west' }, ...pay('west') }, res: bal ? 'Вы объявили войну Австро-Венгрии. Петербург шлёт телеграмму благодарности и обещания. Вена — полки.' : him ? 'Тысяча ваших солдат ушла в Индию. Британия благодарит и обещает признать ваши границы после войны.' : 'Вы подняли над портом британский флаг рядом со своим. Британия обещает признать вашу независимость под своей защитой.' },
        { text: 'Встать на сторону Тройственного союза', fx: { rel: { $axis: 15, $west: -20 }, g05Riv: 10, flag: { side05: 'axis' }, ...pay('axis') }, res: bal ? 'Вы поставили на Вену и Берлин, как болгарский царь. Немецкие офицеры уже едут учить вашу армию.' : him ? 'Вы заявили о дружбе с кайзером. До Берлина далеко, а до Индии — один перевал.' : 'Вы приняли германского консула с почестями. Султан, говорят, тоже скоро объявит священную войну.' },
        { text: 'Объявить нейтралитет', chance: () => clamp(0.35 + (S.flags.neutral05 ? 0.25 : 0) + G.indep / 250 - G.riv / 400, 0.15, 0.85),
          win: { fx: { support: 6, flag: { side05: 'neutral' } }, res: 'Обе коалиции признали ваш нейтралитет. Пока Европа воюет, вы продаёте всем всё — по военным ценам.' },
          lose: { fx: { g05Indep: -15, support: -6, flag: { side05: 'neutral' } }, res: 'Нейтралитет никто не признал. Чужие войска вошли «временно, чтобы защитить концессии».' } },
      ],
      after: () => (Game.g05().indep <= 0 ? 'occupied' : null),
    };
  },
});

// ---------- эффекты, доход, риски ----------
Game.newGameHooks.push(() => { Game.eraLook(); if (S.era === '1905') Game.g05(); });
Game.applyHooks.push(fx => {
  if (S.era !== '1905') return;
  const G = Game.g05();
  if (fx.g05Indep) G.indep = clamp(G.indep + fx.g05Indep);
  if (fx.g05Riv) G.riv = clamp(G.riv + fx.g05Riv);
  if (fx.g05Piece) G.pieces[fx.g05Piece[0]] = fx.g05Piece[1];
});
Game.previewHooks.push((fx, out) => {
  if (S.era !== '1905') return;
  const first = [];
  if (fx.g05Indep) first.push({ icon: '🛡️', d: fx.g05Indep, label: 'Независимость', text: `независимость ${sign(fx.g05Indep)}` });
  if (fx.g05Riv) first.push({ icon: '⚓', d: -fx.g05Riv, label: 'Соперничество держав', text: `соперничество ${sign(fx.g05Riv)}` });
  if (fx.g05Piece) first.push({ icon: '🧩', d: -1, label: 'Концессия', text: 'концессия уходит' });
  out.unshift(...first);
});
Game.incomeHooks.push(() => (S.era === '1905' && Game.g05Income() ? { label: 'Доход от концессий', v: Game.g05Income() } : null));
Game.coupHooks.push(() => (S.era === '1905' && S.g05 ? (S.g05.indep < 30 ? 0.03 : 0) + (S.g05.riv >= 75 ? 0.03 : 0) : 0));
// «Патриоты» поднимаются против правителя, распродавшего страну
Game.revHooks.push(() => (S.era === '1905' && S.g05 ? Math.max(0, 50 - S.g05.indep) / 50 * 0.13 : 0));
Game.forcedList.push(() => {
  if (S.era !== '1905' || S.over) return null;
  const G = Game.g05(), t = Game.eraTime();
  if (!S.flags.prologue05 && S.turn === 0) return Game.g05Prologue();
  if (!S.flags.finale05 && t >= 1914.5) return Game.g05FinaleScene();
  const angry = Object.keys(G.angry).some(c => S.turn - G.angry[c] >= 1 && S.turn - G.angry[c] <= 4);
  if (S.turn - G.gunAt >= 5 && ((angry && Math.random() < 0.5) || (G.riv >= 75 && S.turn - G.gunAt >= 6))) return Game.g05GunScene();
  return null;
});
Game.quarterHooks.push(rep => {
  if (S.era !== '1905') return;
  const G = Game.g05(), t = Game.eraTime(), n = Game.g05Owned(), R = Game.g05Cfg();
  G.riv = clamp(G.riv + 1 + (t >= 1911 ? 1 : 0) + (t >= 1914.25 ? 2 : 0) + n * 0.2);
  G.indep = clamp(G.indep - n * 0.1 + (G.indep < 50 ? 0.2 : 0) + (n <= 2 && S.army >= 60 ? 0.3 : 0));
  if (G.indep < 30) S.support = clamp(S.support - 0.6);
  else if (G.indep >= 70) S.support = clamp(S.support + 0.2);
  if (G.offer && S.turn >= G.offer.until) { rep.lines.push(`Предложение не принято в срок: ${Game.g05Name(G.offer.power)} обижен (отношения −6).`); S.rel[G.offer.power] = clamp(S.rel[G.offer.power] - 6); if (Math.random() < 0.4) G.angry[G.offer.power] = S.turn; G.offer = null; G.offerAt = S.turn; }
  if (!G.offer && S.turn - G.offerAt >= 2 && Math.random() < 0.55) { G.offer = Game.g05MakeOffer(); if (G.offer) rep.lines.push(`${Game.g05Name(G.offer.power)} предлагает ${G.offer.sum} млн за концессию «${R.pieces[G.offer.kind][0]}». Ответ — на вкладке «${R.tab}».`); }
  if (S.region === 'himal05') {
    // Китай считает княжество своей провинцией: давление до падения империи и снова при Юань Шикае
    if (t >= 1908 && t < 1912) { G.indep = clamp(G.indep - 0.4); if (Math.random() < 0.15) G.angry.china = S.turn; }
    if (G.indep < 40) S.fac.faith.a = clamp(S.fac.faith.a - 1);
  }
  if (G.indep <= 30) rep.warn.push(`Независимость: ${Math.round(G.indep)} из 100. Ещё немного — и страна станет чьим-то протекторатом.`);
  if (G.riv >= 60) rep.warn.push(`Соперничество держав: ${Math.round(G.riv)}. Жди канонерок и ультиматумов.`);
});

// ---------- кризисные сцены 1905 года ----------
const ESC05 = { balkan05: ['Уехать в автомобиле к границе', 'Автомобиль мчится к границе по пыльной дороге. В багажнике — сундуки казны. Шофёр — единственный, кто вам ещё верен.'], gulf05: ['Уплыть на британском шлюпе', 'Британский шлюп выходит из гавани на рассвете. В трюме — сундуки казны, на палубе — вы и ваш сокол.'], himal05: ['Бежать через перевал в Индию', 'Караван уходит через перевал ночью, в метель. На яках — сундуки казны. Так когда-то бежал и сам далай-лама.'] };
const _coup05 = Game.coupScene;
Game.coupScene = function (role) {
  const sc = _coup05.call(Game, role);
  if (S.era !== '1905') return sc;
  sc.title = 'Мятеж гвардии!';
  sc.lines[0] = ['narrator', 'Три часа ночи. Топот сапог и выстрелы во дворе. Телефонная линия перерезана, у ворот — офицеры с револьверами.'];
  if (sc.lines[1][0] === 'npc:colonel') sc.lines[1] = ['npc:colonel', 'Именем армии и отечества! Тиран низложен! Ну, почти.'];
  const [c0, c1, c2, c3] = sc.choices;
  c0.text = 'Выйти на балкон и обратиться к народу';
  c0.win.res = 'Горожане окружили мятежников. Солдаты опустили винтовки и стали брататься с толпой. Мятеж провалился!';
  c0.lose.res = 'Толпа послушала, пожала плечами и разошлась по кофейням. Мятежники вошли во дворец.';
  c1.lose.res = 'Гвардия посмотрела на пушки мятежников и решила, что у неё выходной.';
  c2.text = c2.text.replace('Позвонить в посольство', 'Послать записку в посольство');
  c2.win.res = c2.win.res.replace('Через час мятежным командирам позвонили из посольства. Танки развернулись.', 'Через час к мятежникам приехал посланник. Полки вернулись в казармы.');
  c3.text = ESC05[S.region][0] + ' с казной'; c3.res = ESC05[S.region][1];
  return sc;
};
const _rev05 = Game.revolutionScene;
Game.revolutionScene = function () {
  const sc = _rev05.call(Game);
  if (S.era !== '1905') return sc;
  sc.lines = [
    ['narrator', `Толпа на ${REGIONS[S.region].capitalSquare}. Красные флаги, портреты сорваны. Ворота дворца трещат.`],
    ['npc:rebel', 'Народ пришёл за своим! Выходи, тиран!'],
    ['propaganda', '{Addr}, я... я, пожалуй, пойду проверю типографию. Надолго.'],
    ['defense', 'Войска ждут приказа. Но солдаты смотрят на толпу и видят там своих братьев.'],
  ];
  sc.choices[2].text = ESC05[S.region][0];
  sc.choices[2].res = ESC05[S.region][1];
  return sc;
};

// ---------- финалы ----------
Game.endingHooks.push((type, E, verdicts) => {
  if (S.era !== '1905' || !S.g05) return;
  const G = S.g05, R = REGIONS[S.region], ex = R.exile, rich = S.swiss >= 40, T = S.leader.title, side = S.flags.side05;
  if (type === 'helicopter' || type === 'exile') { E.title = ESC05[S.region][0].replace(/^Уехать|^Уплыть|^Бежать/, m => ({ 'Уехать': 'Отъезд', 'Уплыть': 'Отплытие', 'Бежать': 'Бегство' })[m]); E.text = rich ? `${ESC05[S.region][1]} Теперь вы живёте в ${ex}, ходите на скачки и пишете мемуары о коварстве держав.` : `${ESC05[S.region][1]} Денег хватило ненадолго. Теперь вы даёте уроки верховой езды в ${ex} и рассказываете, что были ${Game.titleIns()}.`; }
  if (type === 'coup') E.text = rich ? `Вас свергли офицеры. Но благодаря счёту в Швейцарии вы живёте на вилле в ${ex}, ездите на автомобиле и раз в месяц пишете новой власти гневные письма.` : `Вас свергли офицеры. Денег не хватило даже на приличную виллу. Теперь вы служите управляющим в отеле в ${ex} и рассказываете постояльцам, что когда-то были ${Game.titleIns()}.`;
  if (type === 'occupied') { E.title = 'Протекторат'; E.text = `Державы решили, что вы не справляетесь, и взяли страну «под защиту». Над дворцом висят два флага, ваш — пониже. Вы остались ${T} на бумаге: подписываете то, что приносит резидент, и получаете пенсию из его рук.`; verdicts.push('Продал страну по кускам'); }
  if (type === 'survived') {
    E.title = 'Встретил 1915 год';
    const s = side === 'west' ? 'на стороне Антанты' : side === 'axis' ? 'на стороне Тройственного союза' : 'в нейтралитете';
    E.text = `31 декабря 1914 года. В Европе идёт война, которую назовут Великой, а вы встречаете Новый год ${s}. ${G.indep >= 60 ? 'Страна по-прежнему ваша: державам сейчас не до вас.' : G.indep >= 30 ? 'Половина страны принадлежит иностранным концессиям, но флаг над дворцом всё ещё ваш.' : 'Страна почти целиком в руках держав. Вы всё ещё ' + T + ', но уже не очень понятно, чей.'}`;
  }
  if (G.indep >= 75) verdicts.push('Сохранил страну целой');
  if (Game.g05Owned() >= 5) verdicts.push('Распродал всё');
  if (side === 'neutral' && G.indep > 0) verdicts.push('Пересидел войну');
});

// ---------- вкладка ----------
Object.assign(UI, {
  tab_gun05() {
    const G = Game.g05(), R = Game.g05Cfg(), RG = REGIONS[S.region], t = Game.eraTime();
    const pieces = Object.entries(R.pieces).map(([k, [name, icon, inc]]) => {
      const o = G.pieces[k];
      return `<div class="g05-piece ${o ? 'sold' : ''}"><span class="g05-ic">${icon}</span><div><b>${esc(name)}</b><span class="muted small">${o ? `${flagSvg(o)} ${esc(Game.cName(o))} · +${Math.max(1, Math.round(inc * 0.6))} млн в квартал` : 'своё'}</span></div>${o ? UI.actBtn('g05n:' + k, { name: 'Отобрать', cost: '1 приказ', ok: true, danger: true }) : ''}</div>`;
    }).join('');
    const O = G.offer;
    const offer = O ? `<section class="card mt g05-offer"><div class="eyebrow">Предложение · ещё ${Math.max(0, O.until - S.turn)} кв.</div>
        <p>${flagSvg(O.power)} <b>${esc(Game.cName(O.power))}</b> предлагает <b>${O.sum} млн</b> за концессию «${esc(R.pieces[O.kind][0])}». Доход вам — около ${Math.max(1, Math.round(R.pieces[O.kind][2] * 0.6))} млн в квартал, независимость −${R.pieces[O.kind][3]}.</p>
        <div class="acts">${UI.actBtn('g05a:yes', { name: 'Подписать', cost: '1 приказ', ok: true })}${UI.actBtn('g05a:auction', { name: 'Выставить на торги', cost: 'шанс 60%', ok: true })}${UI.actBtn('g05a:no', { name: 'Отказать', cost: 'держава обидится', ok: true, danger: true })}</div></section>`
      : '<p class="muted small mt">Пока никто не предлагает концессий. Державы приходят с предложениями раз в несколько кварталов.</p>';
    const blocs = [['west', 'Антанта'], ['axis', 'Тройственный союз'], ['neutral', 'Вне союзов']].map(([b, n]) => {
      const list = RG.countries.filter(c => Game.blocOf(c) === b);
      return list.length ? `<div class="g05-bloc"><span class="eyebrow">${n}</span>${list.map(c => `<span class="chip">${flagSvg(c)} ${esc(COUNTRIES[c].name)} ${Math.round(S.rel[c])}</span>`).join('')}</div>` : '';
    }).join('');
    const left = Math.max(0, Math.ceil((1914.5 - t) * 4));
    const log = G.log.slice(0, 10).map(e => `<li><time>${e.y}</time><span>${esc(e.text)}</span></li>`).join('') || '<li><span class="muted">Пока ни одной сделки.</span></li>';
    return `<p class="lede">Державы покупают вашу страну по кускам: железную дорогу, порт, таможню, рудники. Каждая концессия даёт деньги и доход каждый квартал, но отнимает кусок независимости. Если независимость упадёт до нуля, страна станет протекторатом. Отказ обижает державу, и она может прислать ${S.region === 'balkan05' ? 'ультиматум' : S.region === 'himal05' ? 'отряд на перевал' : 'канонерку'}. Соперничество держав растёт с каждым годом, а в августе 1914 года придётся выбрать сторону. Те, кто держит ваши концессии, будут защищать их и в войну.</p>
      <div class="cr">
        <section class="card"><div class="eyebrow">Страна по кускам</div><div class="g05-pieces">${pieces}</div></section>
        <section class="card cr-side">
          ${UI.meter('Независимость', G.indep, G.indep >= 60 ? 'good' : G.indep >= 30 ? 'warn' : 'bad')}
          ${UI.meter('Соперничество держав', G.riv, G.riv >= 70 ? 'bad' : G.riv >= 45 ? 'warn' : 'good')}
          <p class="muted small">Доход от концессий: <b>${Game.g05Income()} млн</b> в квартал. ${S.flags.finale05 ? 'Сторона в войне выбрана.' : `До августа 1914 года — кварталов: <b>${left}</b>.`}${S.flags.neutral05 ? ' Объявлен вечный нейтралитет.' : ''}</p>
          ${blocs}
        </section>
      </div>
      ${offer}
      <section class="card mt"><div class="eyebrow">Сделки</div><ul class="log cr-log">${log}</ul></section>
      <div class="proj dec-grid mt">${Game.g05Actions().map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p><div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx))}</div></div></div>${UI.actBtn('g05:' + a.id, { name: 'Приказать', cost: a.cost, ok: a.ok, danger: a.danger })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  const [k, a] = id.split(':');
  if (!['g05', 'g05a', 'g05n'].includes(k)) return false;
  const out = k === 'g05' ? Game.g05Action(a) : k === 'g05a' ? Game.g05Answer(a) : Game.g05Nationalize(a);
  if (out) { UI.render(); UI.toast(out.text, out.changes); if (S.g05 && S.g05.indep <= 0 && !S.over) { Game.ending('occupied'); UI.showEnding(); } }
  return true;
});

// Прихоти и проекты министров: основа из 1840-х, детали — начала века
const WHIMS05 = JSON.parse(JSON.stringify(WHIMS48));
WHIMS05.defense[1] = { say: 'Армии нужны пулемёты «Максим»! У британцев они есть, у японцев есть, а мы до сих пор стреляем залпами, как при Наполеоне.',
  yes: ['Закупить пулемёты', { treasury: -12, army: 5, loy: { defense: 10 } }, 'Пулемёты прибыли в ящиках с надписью «Сельскохозяйственные машины». Генерал лично испытал их на мишенях и оглох на одно ухо.'],
  no: ['Отказать', { loy: { defense: -7 } }, 'Генерал назвал вас «штатским» за вашей спиной. Начальник тайной полиции записал.'],
  alt: ['Купить два — для парада', { treasury: -4, loy: { defense: 4 } }, 'Два пулемёта проехали по площади на лафетах. Стрелять из них пока не пробовали.'] };
WHIMS05.economy[1] = { say: 'Мне нужен арифмометр! Немецкий, с ручкой. Считает быстрее любого писаря. И не ворует.',
  yes: ['Купить арифмометр', { treasury: -4, economy: 1, loy: { economy: 8 } }, 'Министр крутит ручку целыми днями. Бюджет сходится до копейки, но результат ему не нравится.'],
  no: ['Отказать: есть счёты', { loy: { economy: -5 } }, 'Министр уходит, громко щёлкая костяшками счётов.'] };
WHIMS05.police[1] = { say: 'Нам нужен «чёрный кабинет» на почтамте: вскрывать письма паром и запечатывать обратно. В Петербурге так делают давно.',
  yes: ['Открыть чёрный кабинет', { treasury: -8, fear: 4, loy: { police: 12 } }, 'Чиновники над чайниками читают переписку всей страны. Самые интересные письма начальник полиции зачитывает вам за обедом.'],
  no: ['Отказать', { loy: { police: -7 } }, 'Начальник полиции читает только то, что ему приносят дворники.'],
  alt: ['Вскрывать только иностранную почту', { treasury: -3, loy: { police: 5 } }, 'Почта из-за границы приходит с опозданием на неделю и пахнет паром.'] };
WHIMS05.propaganda[1] = { say: 'Нам нужен придворный синематограф! Ваш выезд на смотр войск — на экране в каждом городе. Двадцать секунд, но какие!',
  yes: ['Пригласить оператора из Парижа', { treasury: -6, support: 2, loy: { propaganda: 10 } }, 'Фильма «Смотр войск» идёт в синематографе на базарной площади. Публика визжит, когда лошади скачут прямо на неё.'],
  no: ['Отказать', { loy: { propaganda: -6 } }, 'В витринах по-прежнему висит старая фотография, на которой вы моложе на десять лет.'],
  alt: ['Заказать фотографию у местного мастера', { treasury: -2, loy: { propaganda: 4 } }, 'Мастер снял вас в профиль, на фоне нарисованных гор. Сходство спорное, но лестное.'] };
const PROJECTS05 = JSON.parse(JSON.stringify(PROJECTS48));
for (const list of Object.values(PROJECTS05)) for (const p of list) {
  if (p.payoff.spHeat !== undefined) { delete p.payoff.spHeat; p.payoff.support = (p.payoff.support || 0) + 3; }
  if (p.payoff.spRail !== undefined) { delete p.payoff.spRail; p.payoff.g05Indep = 4; }
  p.pitch = p.pitch.replace('Как на Венском конгрессе: посланники, вальсы и фейерверк.', 'Посланники, вальсы, электрическая иллюминация и фейерверк.').replace('маклеры в цилиндрах', 'маклеры в котелках');
}

// Китай в 1905–1914: империя Цин, с 1912 года — республика
const CHINA_BASE = { name: COUNTRIES.china.name, cases: COUNTRY_CASES.china.slice() };
Game.china05 = () => {
  const on = !!S && S.era === '1905';
  COUNTRIES.china.name = on ? (Game.eraTime() < 1912 ? 'Цинская империя' : 'Китайская Республика') : CHINA_BASE.name;
  COUNTRY_CASES.china = on ? (Game.eraTime() < 1912 ? ['Цинской империи', 'Цинской империей', 'в Пекин'] : ['Китайской Республики', 'Китайской Республикой', 'в Пекин']) : CHINA_BASE.cases.slice();
};
const _eraLook05b = Game.eraLook;
Game.eraLook = function () { _eraLook05b.call(Game); Game.china05(); };
Game.forcedList.unshift(() => { Game.china05(); return null; });


// ---------- имена и титулы по регионам ----------
Object.assign(NAME_POOLS, {
  balkan05: { m: ['Драгутин', 'Милош', 'Стоян', 'Велько', 'Душан', 'Милан', 'Радомир', 'Живоин', 'Никола', 'Петар'], f: ['Милица', 'Драгана', 'Йелена'], last: ['Петрович', 'Йованович', 'Николич', 'Маркович', 'Стоянович', 'Илич', 'Лазаревич', 'Павлович', 'Радич', 'Вукович', 'Танасиевич', 'Милованович'] },
  east80: { m: ['Ион', 'Николае', 'Михай', 'Богдан', 'Василе', 'Георге', 'Штефан', 'Раду', 'Адриан', 'Константин'], f: ['Елена', 'Иоана', 'Мария'], last: ['Попеску', 'Ионеску', 'Константинеску', 'Думитру', 'Стан', 'Влад', 'Морару', 'Негру', 'Радулеску', 'Ковач', 'Будай', 'Петреску'] },
});
for (const n of ['Милица', 'Драгана', 'Йелена', 'Елена', 'Иоана']) FEMALE_NAMES.add(n);
Object.assign(RICH_TITLE, { balkan05: 'Газда', east80: 'Товарищ' });

// ---------- указы: названия и описания по эпохам ----------
const DECREE_ERA = {
  '1848': {
    summit: ['Созвать конгресс государей', 'Монархи и посланники, бал и фейерверк в дворцовом парке. Все отношения растут.'],
    embassies: ['Открыть двадцать миссий при иностранных дворах', 'Флаг страны в двадцати столицах. Посланниками станут друзья семьи.'],
    drills: ['Манёвры у границы', 'Кавалерия и пушки у границы с соседями. Армия довольна, соседи нервничают.'],
    aid_abroad: ['Помощь пострадавшим соседям', 'Обоз с хлебом, одеялами и вашим портретом на каждом мешке.'],
    tour: ['Гастроли придворной капеллы', 'Хор и оркестр в иностранных столицах. Музыка открывает двери.'],
    spy_school: ['Школа тайных агентов', 'Свои люди при чужих дворах. Риск переворота ниже, но соседи злятся, если узнают.'],
    hospital: ['Госпиталь имени вас', 'Лучший госпиталь в стране, с сёстрами милосердия. Народ благодарен сейчас и потом.'],
    fiesta: ['Внеочередной праздник', 'Выходной, фейерверк и бесплатный обед на главной площади.'],
    housing: ['Дома для бедных', 'Новые доходные дома на окраинах. Строители заняты, левые довольны.'],
    pensions: ['Пенсионы ветеранам и вдовам', 'Старики помнят, кто о них позаботился. И рассказывают внукам.'],
    sez: ['Порто-франко', 'Беспошлинная торговля для иностранцев. Через год там будут склады. Или игорные дома.'],
    privatize: ['Продать казённые мануфактуры', 'Отдать заводы «рачительным хозяевам». Казна пополнится, но народу это не понравится.'],
    capital_amnesty: ['Прощение беглых капиталов', 'Верните деньги из-за границы, и казна не спросит, откуда они.'],
    price_freeze: ['Такса на хлеб', 'Твёрдые цены указом. Народ рад, лавочники в бешенстве, полки пустеют.'],
    month13: ['Ввести тринадцатый месяц', 'Лишний месяц — лишнее жалованье. Назвать его в вашу честь.'],
    coins: ['Ваш профиль на всех монетах', 'Золотые, серебряные и медные — с вашим профилем. Даже на самой мелкой монете.'],
    tie_ban: ['Запретить фраки как пережиток', 'Министры приходят на службу в национальном платье.'],
  },
  '1905': {
    summit: ['Созвать конференцию держав', 'Посланники, банкет и фотография на ступенях дворца. Все отношения растут.'],
    embassies: ['Открыть двадцать миссий', 'Флаг страны в двадцати столицах. Посланниками станут друзья семьи.'],
    drills: ['Манёвры у границы', 'Пушки и кавалерия у границы с соседями. Армия довольна, соседи нервничают.'],
    aid_abroad: ['Помощь пострадавшим соседям', 'Пароход с палатками, хлебом и вашим портретом на каждом ящике.'],
    tour: ['Гастроли национального оркестра', 'Песни и танцы в столицах мира. Граммофонные пластинки — в подарок.'],
    sport: ['Гимнастические общества', 'Гимнастические общества в каждом городе и медали на будущих Олимпийских играх.'],
    housing: ['Рабочие кварталы', 'Новые дома на окраинах для рабочих и ремесленников. Строители заняты, левые довольны.'],
    pensions: ['Пенсии чиновникам и ветеранам', 'Старики помнят, кто о них позаботился. И рассказывают внукам.'],
    sez: ['Порто-франко', 'Беспошлинная торговля для иностранцев. Через год там будут склады. Или игорные дома.'],
    privatize: ['Продать казённые заводы', 'Отдать заводы «рачительным хозяевам». Казна пополнится, но народу это не понравится.'],
    month13: ['Ввести тринадцатый месяц', 'Лишний месяц — лишнее жалованье. Назвать его в вашу честь.'],
    dam: ['Великая плотина и электростанция', 'Проект века: электрический свет в столице и орошение полей. Через полтора года.'],
  },
};
const DECREE_HIDE = { east80: ['privatize', 'capital_amnesty', 'passports', 'sez'] };
const DECREE_BASE = {};
for (const cat of Object.keys(DECREES)) for (const d of DECREES[cat]) DECREE_BASE[d.id] = [d.name, d.desc];
Game.decreeEra = () => {
  const ov = (S && DECREE_ERA[S.era]) || {};
  for (const cat of Object.keys(DECREES)) for (const d of DECREES[cat]) {
    const o = ov[d.id] || DECREE_BASE[d.id];
    if (o) { d.name = o[0]; d.desc = o[1]; }
  }
};
const _eraLook05c = Game.eraLook;
Game.eraLook = function () { _eraLook05c.call(Game); Game.decreeEra(); };
const _decreeList = Game.decreeList;
Game.decreeList = function (cat) { const L = _decreeList.call(Game, cat); const hide = DECREE_HIDE[S.region] || []; return L.filter(d => !hide.includes(d.id)); };
// Экономика соцлагеря: ни помещиков, ни иностранных компаний
const _economyActions05x = Game.economyActions;
Game.economyActions = function () { const acts = _economyActions05x.call(Game); return S.region === 'east80' ? acts.filter(a => a.id !== 'land') : acts; };

// Требования движений: названия указов по эпохе и ничего невозможного в соцлагере
{
  const byDec = { o_priv: 'privatize', o_sez: 'sez', f_pens: 'pensions', h_drill: 'drills', l_house: 'housing', b_lit: 'literacy', f_hosp: 'hospital' };
  for (const list of Object.values(FAC_DEMANDS)) for (const d of list) {
    if (['l_land', 'l_nat', 'o_priv', 'o_sez'].includes(d.id)) d.except = [...(d.except || []), 'east80'];
    const id = byDec[d.id];
    if (id && typeof d.text === 'string') {
      const base = d.text;
      d.text = () => (S && DECREE_ERA[S.era] && DECREE_ERA[S.era][id] ? `Издать указ «${DECREE_ERA[S.era][id][0]}»` : base);
    }
  }
}
// Державы в соцлагере не просят запрещать профсоюз и освобождать коммунистов
const _pickDemand05x = Game.pickDemand;
Game.pickDemand = function (c) {
  if (S.region !== 'east80') return _pickDemand05x.call(Game, c);
  const keep = DEMANDS.filter(d => !['ban_left', 'comrades', 'company', 'ban_press'].includes(d.id));
  const all = DEMANDS.splice(0, DEMANDS.length, ...keep);
  try { return _pickDemand05x.call(Game, c); } finally { DEMANDS.splice(0, DEMANDS.length, ...all); }
};
