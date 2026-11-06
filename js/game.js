// Игровая логика: состояние, экономика, движения, дипломатия, кризисы, финалы.
const SAVE_KEY = 'dictato.save.v1';
const LAST_TURN = 39; // 1960 Q1 … 1969 Q4
const AP_PER_TURN = 2;

const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const STAT_NAMES = { treasury: 'Казна', swiss: 'Счёт в Швейцарии', economy: 'Экономика', support: 'Народ', army: 'Армия', fear: 'Страх', net: 'Интернет' };
const STAT_ICONS = { treasury: '💰', swiss: '🏦', economy: '🏭', support: '👥', army: '🪖', fear: '👁️', net: '📶' };
// Бюджет: ползунки 0–100, где 50 — норма. Расходы растут линейно, отдача выше нормы — с убыванием.
const SLIDERS = {
  spend: [
    { k: 'army', name: 'Армия', base: 10, hint: 'Лояльность армии и генералов' },
    { k: 'police', name: 'Тайная полиция', base: 6, hint: 'Страх; урезание радует либералов' },
    { k: 'health', name: 'Здравоохранение', base: 3, hint: 'Народ, вера и немного экономика' },
    { k: 'edu', name: 'Образование', base: 3, hint: 'Экономика и народ, но образованных либералов больше' },
    { k: 'subsidy', name: { '1930': 'Хлеб и пособия', '1960': 'Субсидии на хлеб', '2000': 'Субсидии на хлеб и бензин' }, base: 2, hint: 'Народ и левые; выше нормы портят экономику' },
    { k: 'infra', name: 'Дороги и порты', base: 8, hint: 'Рост экономики' },
    { k: 'media', name: { '1930': 'Радио и газеты', '1960': 'Радио и телевидение', '2000': 'Госканалы и пропаганда' }, base: 2, hint: 'Народ и страх; либералы злятся' },
    { k: 'palace', name: 'Нужды дворца', base: 5, hint: 'Уходит на ваш счёт в Швейцарии; народ ворчит' },
  ],
  tax: [
    { k: 'popTax', name: 'Налоги с населения', base: 9, hint: 'Доход; народ недоволен' },
    { k: 'corpTax', name: 'Налоги с компаний', base: 4, hint: 'Доход; богачи и экономика страдают' },
    { k: 'duty', name: 'Экспортная пошлина', base: 0, hint: 'Доля государства в выручке экспорта; тормозит экономику' },
  ],
};
const NETCTL = { name: 'Контроль интернета', costs: [0, 3, 8], labels: ['Свобода', 'Фильтры', 'Файрвол'] };
const BUDGET_DEFAULT = { army: 50, police: 50, health: 50, edu: 50, subsidy: 50, infra: 50, media: 50, palace: 50, popTax: 50, corpTax: 50, duty: 50, netctl: 0 };
const BUDGET_PRESETS = {
  norm: { name: 'Норма', v: { army: 50, police: 50, health: 50, edu: 50, subsidy: 50, infra: 50, media: 50, palace: 50, popTax: 50, corpTax: 50, duty: 50 } },
  austerity: { name: 'Жёсткая экономия', v: { army: 40, police: 40, health: 30, edu: 30, subsidy: 15, infra: 35, media: 30, palace: 15, popTax: 60, corpTax: 60, duty: 60 } },
  populism: { name: 'Популизм', v: { army: 50, police: 40, health: 80, edu: 70, subsidy: 90, infra: 50, media: 70, palace: 30, popTax: 30, corpTax: 70, duty: 55 } },
  barracks: { name: 'Казарма', v: { army: 85, police: 80, health: 30, edu: 30, subsidy: 40, infra: 40, media: 65, palace: 50, popTax: 60, corpTax: 50, duty: 50 } },
  market: { name: 'Рынок', v: { army: 45, police: 40, health: 45, edu: 60, subsidy: 20, infra: 75, media: 40, palace: 40, popTax: 45, corpTax: 30, duty: 30 } },
};
function sliderName(d) { return typeof d.name === 'string' ? d.name : d.name[S.era] || Object.values(d.name)[0]; }
const RIVALS = { left: ['oligarchs', 'hawks'], liberals: ['hawks'], faith: ['left'], oligarchs: ['left'], hawks: ['liberals', 'left'] };

let S = null;

const DIFFICULTY = {
  easy: { name: 'Курорт', icon: '🏖️', desc: 'Три приказа в квартал, больше денег, генералы сонные. Для тех, кто хочет посмеяться.', ap: 3, treasury: 40, risk: 0.6, income: 1.1, loy: -0.3, score: 0.7 },
  normal: { name: 'Норма', icon: '⚖️', desc: 'Классическая диктатура: два приказа, обычные заговоры.', ap: 2, treasury: 0, risk: 1, income: 1, loy: -0.6, score: 1 },
  hard: { name: 'Железный трон', icon: '🗡️', desc: 'Пустая казна, нервные полковники, ненадёжные министры. Очки ×1.4.', ap: 2, treasury: -25, risk: 1.35, income: 0.92, loy: -0.9, score: 1.4 },
};
const Game = {
  get S() { return S; },
  forcedList: [], applyHooks: [], previewHooks: [], incomeHooks: [], coupHooks: [], revHooks: [], quarterHooks: [], endingHooks: [], newGameHooks: [],
  diff() { return DIFFICULTY[(S && S.diff) || 'normal']; },
  apTurn() { return Game.diff().ap; },

  newGame(cfg) {
    const R = REGIONS[cfg.region];
    const T = REGIME_TYPES[cfg.regime];
    const era = cfg.era || '1960';
    S = {
      v: 1, era, region: cfg.region, regime: cfg.regime,
      leader: { name: cfg.name, title: cfg.title, look: cfg.look },
      country: cfg.country || R.country,
      turn: 0, year: ERAS[era].start, q: 1, ap: DIFFICULTY[cfg.diff || 'normal'].ap, diff: cfg.diff || 'normal',
      treasury: era === '1930' ? 110 : era === '2000' ? 90 : 80, swiss: 0, economy: 45, net: R.netStart || 0, support: 50, army: 60, fear: 25,
      price: 1, priceHist: [1],
      budget: { ...BUDGET_DEFAULT },
      fac: {
        left: { s: 25, a: 35, st: 'legal' }, liberals: { s: 20, a: 45, st: 'legal' }, faith: { s: 40, a: 55, st: 'legal' },
        oligarchs: { s: 45, a: 55, st: 'legal' }, hawks: { s: 35, a: 55, st: 'legal' },
      },
      rel: {}, adv: {}, flags: {}, schedule: [], loans: [], log: [], used: [], hist: [], over: null,
      statHist: [],
    };
    for (const c of R.countries) S.rel[c] = 45;
    if (era === '1960') {
      S.rel.usa = 50; S.rel.ussr = 40; S.rel.china = 35;
      if (S.rel.cuba !== undefined) S.rel.cuba = 35;
      if (R.patron !== 'usa') S.rel[R.patron] = 60;
    }
    Object.assign(S.rel, R.relInit || {});
    for (const role of Object.keys(ROLES)) {
      const a = R.advisors[role];
      S.adv[role] = { name: a.name, bio: a.bio, look: a.look, loy: Math.round(rnd(52, 72)), comp: 1, relative: false };
    }
    Game.apply(T.fx); Game.apply({ fac: T.fac, rel: T.rel });
    S.treasury += DIFFICULTY[S.diff].treasury;
    for (const h of Game.newGameHooks) h();
    S.statHist.push(Game.snapshotStats());
    Game.log(`${S.leader.title} ${S.leader.name} пришёл к власти. Режим: ${T.name}.`);
    Game.save();
    return S;
  },

  snapshotStats() { return { t: S.turn, treasury: Math.round(S.treasury), economy: Math.round(S.economy), support: Math.round(S.support), army: Math.round(S.army), fear: Math.round(S.fear), swiss: Math.round(S.swiss), net: Math.round(S.net || 0) }; },

  save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* хранилище недоступно */ } },
  load() {
    try { const raw = localStorage.getItem(SAVE_KEY); if (!raw) return null; S = JSON.parse(raw); S.era = S.era || '1960'; Game.migrateBudget(); return S; } catch (e) { return null; }
  },
  hasSave() { try { const raw = localStorage.getItem(SAVE_KEY); return !!raw && !JSON.parse(raw).over; } catch (e) { return false; } },
  clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* */ } },
  restore(state) { S = state; },

  dateLabel(st = S) { return `${['I', 'II', 'III', 'IV'][st.q - 1]} квартал ${st.year}`; },
  log(text) { S.log.unshift({ d: Game.dateLabel(), text }); if (S.log.length > 200) S.log.length = 200; },

  vars() {
    const R = REGIONS[S.region];
    const v = {
      leader: S.leader.name, title: S.leader.title, country: S.country, capital: S.flags.capitalName || R.capital, cur: R.currency,
      exports: R.exports, exportGen: R.exportGen, company: R.company, patron: COUNTRIES[R.patron].name,
      sport: R.sport, rival: R.rival, rivalShort: R.rivalShort, disputed: R.disputed, faithLeader: R.faithLeader,
      square: R.capitalSquare, jungle: R.jungle, nephew: R.nephew, year: S.year,
      ...ERAS[S.era].vars,
      ...(REGION_TALK[S.region] || REGION_TALK.latam),
      ...(FAITH_TALK[R.faithStyle] || FAITH_TALK.catholic),
      title_gen: Game.titleGen(), title_ins: Game.titleIns(),
      shirts_ref: S.era === '1930' ? (Game.eraTime() >= 1933 ? 'В Риме и Берлине такие рубашки уже правят. Лондон и Париж смотрят на нас очень внимательно.' : 'В Риме такие рубашки уже правят, в Германии они вот-вот придут к власти. Лондон и Париж смотрят на нас очень внимательно.') : '',
    };
    for (const r of Object.keys(ROLES)) v[r] = S.adv[r].name;
    for (const f of Object.keys(R.factions)) v['f.' + f] = R.factions[f].name;
    v.assassination_outcome = S.flags.double
      ? 'Пули попали в лимузин, где ехал ваш двойник. Он жив, но требует прибавки.'
      : 'Пуля застряла в нагрудной медали. Вы живы! Медаль — героиня дня.';
    const p = (S.rel.usa || 0) >= (S.rel.ussr || 0) ? 'usa' : 'ussr';
    v.base_power_text = p === 'usa'
      ? 'Посол США просит разрешения разместить авиабазу у столицы. Аренда — 8 миллионов в квартал.'
      : 'Посол СССР просит разрешения разместить военно-морскую базу в бухте. Аренда — 8 миллионов в квартал, рублями и гречкой.';
    return v;
  },
  titleGen() { const f = TITLE_FORMS[S.leader.title]; return f ? f[0] : S.leader.title; },
  titleIns() { const f = TITLE_FORMS[S.leader.title]; return f ? f[1] : S.leader.title; },
  fmt(str) {
    if (!str) return '';
    const v = Game.vars();
    const one = t => t.replace(/\{([\w.]+)\}/g, (m, k) => {
      if (v[k] !== undefined) return v[k];
      const low = k[0].toLowerCase() + k.slice(1);
      if (k[0] !== low[0] && typeof v[low] === 'string') return v[low][0].toUpperCase() + v[low].slice(1);
      return m;
    });
    return one(one(str));
  },

  leaderAt(cKey) {
    const t = S.year + (S.q - 1) / 4;
    const c = COUNTRIES[cKey];
    const list = (S.era === '2000' && c.leaders00) || c.leaders;
    for (const [until, name] of list) if (t < until) return name;
    return list[list.length - 1][1];
  },

  // ---------- применение эффектов ----------
  resolveFx(fx) { return typeof fx === 'function' ? fx(S) : (fx || {}); },
  eraTime() { return S.year + (S.q - 1) / 4; },
  // В 1930-е лагеря меняются со временем: Веймарская Германия, Италия до Эфиопии, Япония до Маньчжурии
  blocOf(c) {
    const C = COUNTRIES[c];
    if (S.era === '1930' && C.blocs30) { const t = Game.eraTime(); return C.blocs30.find(([until]) => t < until)[1]; }
    return (S.era === '1930' && C.bloc30) || C.bloc;
  },
  axisFormed() { return S.era === '1930' && Game.eraTime() >= 1936.75; },
  cName(c) {
    if (S.era === '1930' && c === 'germany') return Game.eraTime() < 1933 ? 'Германия (Веймарская республика)' : 'Германия (Третий рейх)';
    return COUNTRIES[c].name;
  },
  relTargets(key) {
    const R = REGIONS[S.region];
    if (key === '$patron') return [R.patron];
    if (key === '$west') return R.countries.filter(c => Game.blocOf(c) === 'west');
    if (key === '$east') return R.countries.filter(c => Game.blocOf(c) === 'east');
    if (key === '$axis') return R.countries.filter(c => Game.blocOf(c) === 'axis');
    return S.rel[key] !== undefined ? [key] : [];
  },
  apply(fxIn, opts = {}) {
    const fx = Game.resolveFx(fxIn);
    const ch = [];
    for (const k of ['treasury', 'swiss', 'economy', 'support', 'army', 'fear', 'net']) {
      if (k === 'net' && S.era !== '2000') continue;
      if (fx[k]) {
        let d = fx[k];
        const before = S[k];
        S[k] = (k === 'treasury' || k === 'swiss') ? Math.max(k === 'swiss' ? 0 : -999, S[k] + d) : clamp(S[k] + d);
        d = S[k] - before;
        if (Math.round(d)) ch.push({ k: k === 'net' ? 'fs' : k, d: Math.round(d), label: STAT_NAMES[k], icon: STAT_ICONS[k], money: k === 'treasury' || k === 'swiss' });
      }
    }
    if (fx.price) {
      const b = S.price; S.price = clamp(S.price + fx.price, 0.4, 1.6);
      ch.push({ k: 'price', d: Math.round((S.price - b) * 100), label: 'Цена экспорта, %', icon: '📦' });
    }
    if (fx.fac) for (const [f, e] of Object.entries(fx.fac)) {
      const F = S.fac[f]; if (!F) continue;
      const nm = REGIONS[S.region].factions[f].name;
      if (e.s) { const b = F.s; F.s = clamp(F.s + e.s); if (Math.round(F.s - b)) ch.push({ k: 'fs', d: Math.round(F.s - b), label: `${nm}: сила` }); }
      if (e.a) { const b = F.a; F.a = clamp(F.a + e.a, 0, F.st === 'banned' ? 35 : 100); if (Math.round(F.a - b)) ch.push({ k: 'fa', d: Math.round(F.a - b), label: `${nm}: одобрение` }); }
    }
    if (fx.rel) for (const [key, d] of Object.entries(fx.rel)) {
      for (const c of Game.relTargets(key)) {
        const b = S.rel[c]; S.rel[c] = clamp(S.rel[c] + d);
        if (Math.round(S.rel[c] - b)) ch.push({ k: 'rel', d: Math.round(S.rel[c] - b), label: COUNTRIES[c].name, flag: c });
      }
    }
    if (fx.loy) for (const [r, d] of Object.entries(fx.loy)) {
      const A = S.adv[r]; if (!A) continue;
      const b = A.loy; A.loy = clamp(A.loy + d);
      if (Math.round(A.loy - b)) ch.push({ k: 'loy', d: Math.round(A.loy - b), label: `${A.name.split(' ').slice(0, 2).join(' ')}: лояльность` });
    }
    if (fx.flag) for (const [k, v] of Object.entries(fx.flag)) S.flags[k] = v === '$turn' ? S.turn : v;
    for (const h of Game.applyHooks) h(fx, ch);
    if (fx.schedule) for (const sc of fx.schedule) S.schedule.push({ at: S.turn + sc.in, fx: sc.fx, text: sc.text });
    if (fx.loan) { S.loans.push({ per: fx.loan.per, left: fx.loan.turns }); ch.push({ k: 'loan', d: -fx.loan.per, label: `Выплаты по кредиту ×${fx.loan.turns} кв.`, money: true }); }
    if (!opts.silent) Game.save();
    return ch;
  },

  // Подсказка о последствиях для кнопки выбора (без применения)
  previewFx(fxIn) {
    const fx = Game.resolveFx(fxIn);
    const out = [];
    for (const k of ['treasury', 'swiss', 'economy', 'support', 'army', 'fear', 'net']) if (fx[k] && (k !== 'net' || S.era === '2000')) out.push({ k, icon: STAT_ICONS[k], d: fx[k], label: STAT_NAMES[k] });
    if (fx.fac) for (const [f, e] of Object.entries(fx.fac)) {
      const F = REGIONS[S.region].factions[f];
      if (e.a) out.push({ icon: F.icon, d: e.a, label: `${F.name}: одобрение`, text: `${F.short} ${sign(e.a)}` });
      if (e.s) out.push({ icon: F.icon, d: e.s, label: `${F.name}: сила`, text: `${F.short}: сила ${sign(e.s)}`, inv: true });
    }
    if (fx.rel) for (const [key, d] of Object.entries(fx.rel)) if (d) for (const c of Game.relTargets(key)) out.push({ flag: c, d, label: COUNTRIES[c].name });
    if (fx.loy) for (const [r, d] of Object.entries(fx.loy)) if (d && S.adv[r]) out.push({ icon: ROLES[r].icon, d, label: `${ROLES[r].title}: лояльность`, text: `${{ defense: 'Минобороны', economy: 'Минэкономики', police: 'Шеф полиции', propaganda: 'Минпропаганды', foreign: 'МИД' }[r]}: лояльность ${sign(d)}` });
    if (fx.price) out.push({ icon: '📦', d: fx.price * 100, label: 'Мировая цена на экспорт', text: `цена ${sign(fx.price * 100)}%` });
    if (fx.schedule) for (const sc of fx.schedule) for (const it of Game.previewFx(sc.fx)) out.push({ ...it, later: sc.in });
    if (fx.loan) out.push({ icon: '🧾', d: -fx.loan.per, label: `Кредит: ${fx.loan.turns} выплат`, text: `потом ${fx.loan.turns} выплат по ${fx.loan.per} млн` });
    for (const h of Game.previewHooks) h(fx, out);
    return out;
  },

  // ---------- бюджет ----------
  migrateBudget() {
    const b = S.budget || {};
    if (b.tax !== undefined || b.social !== undefined) {
      const m = l => [20, 50, 85][l === undefined ? 1 : l];
      S.budget = { ...BUDGET_DEFAULT, army: m(b.army), police: m(b.police), health: m(b.social), edu: m(b.social), subsidy: m(b.social), infra: m(b.infra), popTax: [25, 50, 80][b.tax], corpTax: [25, 50, 80][b.tax], palace: [0, 50, 100][b.palace], netctl: b.netctl || 0 };
    }
    S.budget = { ...BUDGET_DEFAULT, ...S.budget };
  },
  // Эффекты бюджета за квартал: итог и разбивка по статьям
  budgetEffects() {
    const b = S.budget;
    const X = k => clamp(b[k], 0, 100) / 50 - 1;
    const P = x => (x > 0 ? Math.pow(x, 0.8) : x);
    const tot = { army: 0, fear: 0, support: 0, economy: 0 }, fac = { hawks: { a: 0, s: 0 }, liberals: { a: 0, s: 0 }, left: { a: 0 }, oligarchs: { a: 0 }, faith: { a: 0 } };
    const items = {};
    const add = (item, target, d, label) => {
      if (!d) return;
      if (target.startsWith('f:')) { const [, f, key] = target.split(':'); fac[f][key] = (fac[f][key] || 0) + d; }
      else tot[target] += d;
      (items[item] = items[item] || []).push({ label, d });
    };
    const FN = f => REGIONS[S.region].factions[f].short;
    let x = X('army'); add('army', 'army', x < 0 ? 4 * x : 3 * P(x), 'Армия'); add('army', 'f:hawks:a', x < 0 ? 3 * x : 2 * P(x), FN('hawks')); add('army', 'f:hawks:s', x, `${FN('hawks')}: сила`);
    x = X('police'); add('police', 'fear', 3 * x, 'Страх'); add('police', 'f:liberals:a', x < 0 ? -x : -2 * P(x), FN('liberals'));
    x = X('health'); add('health', 'support', 1.5 * x, 'Народ'); add('health', 'economy', 0.3 * x, 'Экономика'); add('health', 'f:faith:a', 0.8 * x, FN('faith'));
    x = X('edu'); add('edu', 'support', 0.8 * x, 'Народ'); add('edu', 'economy', x < 0 ? 0.6 * x : 0.5 * P(x), 'Экономика'); add('edu', 'f:liberals:s', 1.2 * x, `${FN('liberals')}: сила`);
    x = X('subsidy'); add('subsidy', 'support', 2 * x, 'Народ'); add('subsidy', 'f:left:a', 1.5 * x, FN('left')); if (x > 0) add('subsidy', 'economy', -0.5 * P(x), 'Экономика');
    x = X('infra'); add('infra', 'economy', 0.3 + (x < 0 ? 1.5 * x : 1.2 * P(x)), 'Экономика');
    x = X('media'); const mk = S.era === '2000' && !S.flags.trolls ? 1 - (S.net || 0) / 150 : 1;
    add('media', 'support', 1.2 * x * mk, 'Народ'); add('media', 'fear', 0.5 * x, 'Страх'); add('media', 'f:liberals:a', -x, FN('liberals'));
    x = X('palace'); add('palace', 'support', -(b.palace / 50) * 0.5 - Math.max(0, x) * 0.5, 'Народ');
    x = X('popTax'); add('popTax', 'support', x < 0 ? -2 * x : -3 * P(x), 'Народ'); add('popTax', 'economy', -0.3 * x, 'Экономика');
    x = X('corpTax'); add('corpTax', 'f:oligarchs:a', x < 0 ? -2 * x : -3 * P(x), FN('oligarchs')); add('corpTax', 'economy', -0.4 * x, 'Экономика');
    x = X('duty'); add('duty', 'economy', -0.6 * x, 'Экономика'); add('duty', 'f:oligarchs:a', -x, FN('oligarchs'));
    return { tot, fac, items };
  },
  budgetCalc() {
    const b = S.budget;
    const ecoK = S.economy / 50;
    const taxPop = 9 * (b.popTax / 50) * ecoK, taxCorp = 4 * (b.corpTax / 50) * ecoK;
    const taxes = taxPop + taxCorp;
    const exports = 16 * S.price * (0.6 + S.economy / 125) * (S.flags.nationalized ? 1.15 : 1) * (0.5 + b.duty / 100);
    const aid = Game.aidList();
    const aidSum = aid.reduce((a, x) => a + x.v, 0);
    const extra = (S.flags.baseIncome || 0) + (S.flags.oilIncome || 0) + (S.flags.casinoIncome || 0);
    const hookInc = Game.incomeHooks.map(h => h()).filter(Boolean);
    const costs = {};
    for (const d of SLIDERS.spend) if (d.k !== 'palace') costs[d.k] = d.base * b[d.k] / 50;
    const palace = 5 * b.palace / 50;
    if (S.era === '2000') costs.netctl = NETCTL.costs[b.netctl || 0];
    const loans = S.loans.reduce((a, l) => a + l.per, 0);
    const dk = Game.diff().income;
    const income = (taxes + exports) * dk + aidSum + extra + hookInc.reduce((a, x) => a + x.v, 0);
    const spend = Object.values(costs).reduce((a, v) => a + v, 0);
    const expense = spend + palace + loans;
    return { taxes: taxes * dk, taxPop: taxPop * dk, taxCorp: taxCorp * dk, exports: exports * dk, aid, aidSum, extra, hookInc, costs, spend, palace, loans, income, expense, net: income - expense };
  },
  aidList() {
    const R = REGIONS[S.region];
    const out = [];
    const add = (c, th, div) => { if (S.rel[c] !== undefined && S.rel[c] >= th && !out.some(o => o.c === c)) out.push({ c, v: Math.round((S.rel[c] - th + 5) / div) }); };
    for (const [c, th, div] of ERAS[S.era].aid) add(c === '$patron' ? R.patron : c, th, div);
    return out.filter(x => x.v > 0);
  },

  // ---------- риски ----------
  coupRisk() {
    if (S.turn < 2) return 0;
    const H = S.fac.hawks;
    let r = Math.max(0, 50 - S.army) / 100 * 0.7
      + H.s / 100 * Math.max(0, 55 - H.a) / 100 * 0.6
      + (S.treasury < -20 ? 0.1 : 0) + (S.treasury < -100 ? 0.15 : 0)
      + (S.adv.defense.loy < 30 ? 0.08 : 0)
      + (S.flags.coupBonus || 0)
      + ((S.rel[REGIONS[S.region].patron] || 50) < 20 ? 0.05 : 0)
      - S.fear / 800
      - (S.flags.frenchGuard ? 0.1 : 0)
      - (S.flags.spySchool ? 0.04 : 0)
      - (S.flags.purged !== undefined && S.turn - S.flags.purged <= 1 ? 0.1 : 0);
    for (const h of Game.coupHooks) r += h();
    if (S.army >= 75 && H.a >= 50) r = Math.min(r, 0.01);
    return clamp(r * Game.diff().risk, 0, 0.5);
  },
  revRisk() {
    if (S.turn < 3) return 0;
    const L = S.fac.left, Li = S.fac.liberals;
    let r = Math.max(0, 30 - S.support) / 100 * 0.8
      + L.s / 100 * Math.max(0, 50 - L.a) / 100 * 0.35
      + Li.s / 100 * Math.max(0, 50 - Li.a) / 100 * 0.15
      - S.fear / 600;
    if (S.support < 20 && S.fear > 70) r += 0.05;
    if (S.era === '2000') r += Li.s / 100 * (S.net || 0) / 100 * [0.3, 0.18, 0.06][S.budget.netctl || 0] * Math.max(0, 55 - Li.a) / 55;
    for (const h of Game.revHooks) r += h();
    return clamp(r * Game.diff().risk, 0, 0.5);
  },
  riskWord(r) {
    if (r < 0.03) return { w: 'спокойно', c: 'ok' };
    if (r < 0.08) return { w: 'шепчутся', c: 'low' };
    if (r < 0.16) return { w: 'тревожно', c: 'mid' };
    if (r < 0.28) return { w: 'опасно', c: 'high' };
    return { w: 'вот-вот', c: 'crit' };
  },
  bloc() {
    if (S.era === '2000') {
      const avg = list => { const v = list.filter(c => S.rel[c] !== undefined).map(c => S.rel[c]); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
      const w = avg(['usa', 'eu', 'uk', 'france']), e = avg(['russia', 'china']);
      if (w - e > 15) return 'Друг Запада';
      if (e - w > 15) return 'Друг Москвы и Пекина';
      return 'Многовекторность';
    }
    if (S.era === '1930') {
      const avg = list => { const v = list.filter(c => S.rel[c] !== undefined).map(c => S.rel[c]); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
      const R0 = REGIONS[S.region].countries, inB = b => R0.filter(c => Game.blocOf(c) === b);
      const axis = inB('axis');
      const g = [['Друг демократий', avg(inB('west'))], ['Друг Москвы', avg(['ussr'])]];
      if (axis.length) g.push([Game.axisFormed() ? 'Друг «Оси»' : 'Друг Берлина', avg(axis)]);
      g.sort((a, b) => b[1] - a[1]);
      return g[0][1] - g[1][1] > 15 ? g[0][0] : 'Нейтралитет';
    }
    const w = S.rel.usa, e = S.rel.ussr;
    if (w - e > 20) return 'Западный лагерь';
    if (e - w > 20) return 'Социалистический лагерь';
    return 'Неприсоединение';
  },

  // ---------- события ----------
  // выбор к исторической новости бывает только в части регионов
  histChoice(h) { return !!h.choice && (!h.choice.regions || h.choice.regions.includes(S.region)); },
  historyFor(year, q) {
    const list = S.era === '1930' ? HISTORY_30 : S.era === '2000' ? HISTORY_00 : HISTORY;
    return list.filter(h => h.at[0] === year && h.at[1] === q && (!h.regions || h.regions.includes(S.region)));
  },
  drawEvent() {
    const pool = EVENTS.filter(e =>
      (!e.regions || e.regions.includes(S.region)) &&
      (!e.eras || e.eras.includes(S.era)) &&
      (!e.once || !S.used.includes(e.id)) &&
      (e.minTurn === undefined || S.turn >= e.minTurn) &&
      (e.maxTurn === undefined || S.turn <= e.maxTurn) &&
      (!e.cond || e.cond(S)) &&
      !(S.lastEvents || []).includes(e.id) &&
      ((S.seen || {})[e.id] || 0) < 2 &&
      (e.eras || e.regions || Game.genDeck().includes(e.id)));
    if (!pool.length) return null;
    // уже виденные события выпадают гораздо реже, свои для эпохи и региона — чаще общих
    const seen = S.seen || {};
    const w = e => (e.eras || e.regions ? (e.weight || 1) * 1.6 : Math.min(e.weight || 1, 1.5)) / (1 + 5 * (seen[e.id] || 0));
    const total = pool.reduce((a, e) => a + w(e), 0);
    let x = Math.random() * total;
    for (const e of pool) { x -= w(e); if (x <= 0) return e; }
    return pool[pool.length - 1];
  },
  // В каждой партии участвует только часть общих событий: так партии не похожи друг на друга
  genDeck() {
    if (!S.genDeck) {
      const gen = EVENTS.filter(e => !e.eras && !e.regions).map(e => e.id);
      for (let i = gen.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [gen[i], gen[j]] = [gen[j], gen[i]]; }
      S.genDeck = gen.slice(0, Math.ceil(gen.length * 0.55));
    }
    return S.genDeck;
  },
  markUsed(e) {
    S.used.push(e.id);
    S.lastEvents = [e.id, ...(S.lastEvents || [])].slice(0, 12);
    S.seen = S.seen || {};
    S.seen[e.id] = (S.seen[e.id] || 0) + 1;
  },
  // Применяет выбор: возвращает { res, changes, won }
  choose(choice) {
    let branch = choice, won = null;
    if (choice.chance) {
      const p = clamp(choice.chance(S), 0.05, 0.95);
      won = Math.random() < p;
      branch = won ? choice.win : choice.lose;
    }
    // лояльность советников: кто советовал — доволен
    const loyFx = {};
    if (choice.adv) for (const r of Object.keys(ROLES)) {
      if (choice.adv.includes(r)) loyFx[r] = 3;
    }
    const changes = Game.apply(branch.fx);
    if (Object.keys(loyFx).length) Game.apply({ loy: loyFx }, { silent: true });
    if (branch.fx && Game.resolveFx(branch.fx).end) S.pendingEnd = Game.resolveFx(branch.fx).end;
    Game.save();
    return { res: Game.fmt(branch.res), changes, won };
  },
  chanceOf(choice) { return choice.chance ? clamp(choice.chance(S), 0.05, 0.95) : null; },

  // ---------- действия игрока ----------
  spend() { if (S.ap <= 0) return false; S.ap--; return true; },

  factionAction(f, act) {
    const F = S.fac[f], R = REGIONS[S.region], nm = R.factions[f].name;
    if (!Game.spend()) return null;
    let fx = {}, text = '';
    const rivals = {};
    switch (act) {
      case 'talk': {
        const d = Game.dealInfo(f);
        fx = { treasury: -d.talkCost, fac: { [f]: { a: Math.round(12 * d.mult) } } };
        for (const r of RIVALS[f]) rivals[r] = { a: -4 };
        text = d.n === 0 ? `Переговоры с движением «${nm}» прошли в тёплой обстановке. С кофе и сладостями.`
          : d.n === 1 ? `Снова переговоры с движением «${nm}». Лидеры вежливо кивают, но уже без прежнего восторга.`
            : `Опять переговоры? Лидеры движения «${nm}» пьют ваш кофе и смотрят на часы. Обещаниям они больше не верят.`;
        Game.noteDeal(f); break;
      }
      case 'bribe': {
        const d = Game.dealInfo(f);
        fx = { treasury: -d.bribeCost, fac: { [f]: { a: Math.round(18 * d.mult) } } };
        if (d.n >= 2) fx.fac[f].s = 2;
        text = d.n === 0 ? `Лидеры движения «${nm}» получили конверты. Толстые. Их речи заметно смягчились.`
          : `Лидеры движения «${nm}» снова получили конверты и попросили потолще. Аппетит растёт, благодарность — нет.`;
        Game.noteDeal(f); break;
      }
      case 'coopt':
        fx = { fac: { [f]: { a: 20, s: 5 } } };
        for (const r of RIVALS[f]) rivals[r] = { a: -10 };
        F.st = 'coopted';
        text = `Представители движения «${nm}» получили министерские портфели. Портфели пустые, но кожаные.`; break;
      case 'ban': {
        F.st = 'banned';
        fx = { fear: 6, fac: { [f]: { s: -15, a: -35 } } };
        const extra = {
          left: { rel: Game.leftBanRel ? Game.leftBanRel() : { usa: 5, ussr: -8 } },
          liberals: { rel: { $west: -6 }, support: -3 },
          faith: { support: -8 },
          oligarchs: { economy: -8, rel: { usa: -8, $patron: -6 } },
          hawks: { army: -12 },
        }[f];
        Object.assign(fx, extra, { fac: fx.fac });
        text = `Движение «${nm}» запрещено указом №${Math.floor(rnd(100, 999))}. Его лидеры ушли в подполье.`; break;
      }
      case 'legalize':
        F.st = 'legal';
        fx = { fear: -3, fac: { [f]: { a: 15 } } };
        text = `Движение «${nm}» снова легально. Его лидеры вышли из подполья, щурясь на солнце.`; break;
      case 'arrest':
        if (Math.random() < 0.25) {
          fx = { fear: 4, support: -2, fac: { [f]: { s: 6, a: -15 } } };
          text = `Арест лидеров движения «${nm}» превратил их в мучеников. Их портреты теперь на каждом заборе.`;
        } else {
          fx = { fear: 4, fac: { [f]: { s: -8 * S.adv.police.comp, a: -12 } } };
          text = `Лидеры движения «${nm}» арестованы на рассвете. Движение обезглавлено. Временно.`;
        }
        break;
    }
    if (Object.keys(rivals).length) fx.fac = { ...fx.fac, ...rivals };
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  // Повторные сделки с одним движением за последние 8 кварталов слабеют и дорожают
  dealInfo(f) {
    const list = ((S.deals || {})[f] || []).filter(t => S.turn - t < 8);
    const n = list.length;
    return { n, mult: [1, 0.55, 0.3, 0.15, 0.05][Math.min(n, 4)], talkCost: 8 + 5 * n, bribeCost: 20 + 8 * n };
  },
  noteDeal(f) {
    S.deals = S.deals || {};
    S.deals[f] = [...(S.deals[f] || []).filter(t => S.turn - t < 8), S.turn];
  },
  factionActions(f) {
    const F = S.fac[f];
    const acts = [];
    const d = Game.dealInfo(f);
    const eff = d.n ? ` · эффект ${Math.round(d.mult * 100)}%` : '';
    acts.push({ id: 'talk', name: 'Переговоры', cost: `−${d.talkCost} млн${eff}`, ok: S.treasury >= d.talkCost });
    acts.push({ id: 'bribe', name: 'Подкупить лидеров', cost: `−${d.bribeCost} млн${eff}`, ok: S.treasury >= d.bribeCost });
    if (F.st === 'legal') acts.push({ id: 'coopt', name: 'Дать места в правительстве', cost: 'одобрение ≥ 40', ok: F.a >= 40 });
    if (F.st !== 'banned') acts.push({ id: 'ban', name: 'Запретить', cost: 'страх ↑', ok: true, danger: true });
    else acts.push({ id: 'legalize', name: 'Легализовать', cost: '', ok: true });
    acts.push({ id: 'arrest', name: 'Арестовать лидеров', cost: 'риск мучеников', ok: true, danger: true });
    return acts;
  },

  countryActions(c) {
    const isBig = ['usa', 'ussr', 'uk', 'france', 'china', 'germany', 'italy', 'japan'].includes(c);
    const dc = Game.dealInfo('c:' + c), dt = Game.dealInfo('trade');
    const pct = d => (d.n ? ` · эффект ${Math.round(d.mult * 100)}%` : '');
    const acts = [
      { id: 'visit', name: 'Государственный визит', cost: `−5 млн${pct(dc)}`, ok: S.treasury >= 5 },
      { id: 'trade', name: 'Торговое соглашение', cost: dt.n ? `рынок насыщен${pct(dt)}` : '', ok: S.rel[c] >= 30 },
      { id: 'aid', name: 'Просить помощи', cost: `шанс ${Math.round(Game.aidChance(c) * 100)}%`, ok: true },
    ];
    if (isBig) acts.push({ id: 'arms', name: 'Купить оружие', cost: '−20 млн', ok: S.treasury >= 20 && S.rel[c] >= 35 });
    acts.push({ id: 'denounce', name: 'Осудить и выслать посла', cost: '', ok: true, danger: true });
    return acts;
  },
  aidChance(c) { return clamp(S.rel[c] / 100 * Game.dealInfo('aid:' + c).mult, 0.05, 0.9); },
  countryAction(c, act) {
    if (!Game.spend()) return null;
    const dc = Game.dealInfo('c:' + c);
    const C = COUNTRIES[c], R = REGIONS[S.region];
    const bl = Game.blocOf(c);
    const opp = S.era === '1930'
      ? (bl === 'west' ? '$axis' : bl === 'axis' ? '$west' : bl === 'east' ? '$axis' : null)
      : (bl === 'west' ? '$east' : bl === 'east' ? '$west' : null);
    let fx = {}, text = '';
    const isSuper = ['usa', 'ussr'].includes(c);
    switch (act) {
      case 'visit':
        fx = { treasury: -5, support: dc.n ? 0 : 1, rel: { [c]: Math.round(8 * dc.mult) } };
        Game.noteDeal('c:' + c);
        text = `Государственный визит: ${C.name}. ${Game.leaderAt(c)[0].toUpperCase() + Game.leaderAt(c).slice(1)}: тёплый приём. Обменялись подарками: вы подарили чучело крокодила.`; break;
      case 'trade':
        { const dt = Game.dealInfo('trade');
          fx = { economy: Math.round(2 * dt.mult * 10) / 10, rel: { [c]: Math.round(6 * dc.mult) } }; if (opp) fx.rel[opp] = -3;
          Game.noteDeal('trade'); Game.noteDeal('c:' + c); }
        text = `Подписано торговое соглашение с ${C.name === 'США' ? 'США' : 'страной ' + C.name}: ${R.exports} в обмен на тракторы и обещания.`; break;
      case 'aid': {
        const p = Game.aidChance(c);
        const da = Game.dealInfo('aid:' + c);
        Game.noteDeal('aid:' + c);
        if (Math.random() < p) {
          const amt = Math.round((isSuper || c === 'russia' ? 30 : ['china', 'uk', 'france', 'germany', 'eu'].includes(c) ? 20 : 12) * (da.n ? 0.6 : 1));
          fx = { treasury: amt, rel: { [c]: -4 } };
          text = `Помощь получена (${C.name}): ${amt} млн. С намёком, что это не в последний раз. И не бесплатно.`;
        } else { fx = { rel: { [c]: -6 } }; text = `${C.name}: вежливый отказ. Министр иностранных дел написал об этом печальный сонет.`; }
        break;
      }
      case 'arms':
        fx = { treasury: -20, army: 8, rel: { [c]: 4 }, fac: { hawks: { a: 5 } } };
        text = `Закуплено оружие у ${cGen(c)}. Генерал лично опробовал каждый пулемёт. В воздух.`; break;
      case 'denounce':
        fx = { support: 3, rel: { [c]: -18 } }; if (opp) fx.rel[opp] = 6;
        text = `Посол ${cGen(c)} объявлен персоной нон грата. Митинг у посольства собрал тысячи людей и одного продавца мороженого.`; break;
    }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },

  // ---------- указы ----------
  decreeList(cat) {
    return DECREES[cat].filter(d => (!d.eras || d.eras.includes(S.era)) && (!d.regions || d.regions.includes(S.region))).map(d => {
      const used = d.once && S.used.includes('dec:' + d.id);
      const di = Game.dealInfo('dec:' + d.id);
      const eff = d.repeat && di.n ? `эффект ${Math.round(di.mult * 100)}%` : '';
      return { ...d, used, cost: used ? 'уже издан' : [d.cost, eff].filter(Boolean).join(' · '), ok: !used && d.ok(S) };
    });
  },
  // Предпросмотр указа: прогоняем на копии состояния, ничего не меняя
  decreePreview(cat, id) {
    const d = DECREES[cat].find(x => x.id === id);
    const m = d.repeat ? Game.dealInfo('dec:' + id).mult : 1;
    if (d.odds) return { odds: d.odds, win: Game.previewFx(d.win.fx), lose: Game.previewFx(d.lose.fx) };
    const saved = S;
    let out;
    S = JSON.parse(JSON.stringify(saved));
    try { out = d.run(S, m); } finally { S = saved; }
    return { now: Game.previewFx(out.fx) };
  },
  economyPreview(id) {
    const { fx, risk } = Game.economyFx(id);
    return { now: Game.previewFx(fx), risk: risk ? { p: risk.p, fx: Game.previewFx(risk.fx) } : null };
  },
  decree(cat, id) {
    const d = DECREES[cat].find(x => x.id === id);
    if (!d || (d.once && S.used.includes('dec:' + id)) || !d.ok(S)) return null;
    if (!Game.spend()) return null;
    const m = d.repeat ? Game.dealInfo('dec:' + id).mult : 1;
    if (d.repeat) Game.noteDeal('dec:' + id);
    if (d.once) S.used.push('dec:' + id);
    const out = d.odds ? (Math.random() < d.odds ? d.win : d.lose) : d.run(S, m);
    const changes = Game.apply(out.fx);
    const text = `Указ «${d.name}». ${out.text}`;
    Game.log(text);
    return { text, changes };
  },
  economyActions() {
    const R = REGIONS[S.region];
    const acts = [
      { id: 'highway', name: `Шоссе имени ${Game.titleGen()}`, desc: 'Через 3 квартала экономика +6. Подрядчик — родственник.', cost: '−30 млн', ok: S.treasury >= 30 },
      { id: 'print', name: 'Напечатать деньги', desc: 'Казна +25. Экономика −5, народ −2.', cost: '', ok: true },
      ...(S.era === '2000' ? [
        { id: 'loan_w', name: 'Кредит МВФ', desc: 'Казна +50, затем 8 выплат по 7 млн. И список реформ.', cost: 'США ≥ 40', ok: (S.rel.usa || 0) >= 40 && S.loans.length < 2 },
        { id: 'loan_e', name: `Китайский кредит под залог ${REGIONS[S.region].exportGen}`, desc: 'Казна +50, затем 8 выплат по 7 млн. Без лишних вопросов.', cost: 'Китай ≥ 35', ok: (S.rel.china || 0) >= 35 && S.loans.length < 2 },
      ] : S.era === '1930' ? [
        { id: 'loan_w', name: 'Заём лондонского Сити', desc: 'Казна +50, затем 8 выплат по 7 млн.', cost: 'Британия ≥ 40', ok: (S.rel.uk || 0) >= 40 && S.loans.length < 2 },
        { id: 'loan_e', name: 'Кредит Рейхсбанка', desc: 'Казна +50, затем 8 выплат по 7 млн. Берлин доволен, Лондон — нет.', cost: 'Германия ≥ 40', ok: (S.rel.germany || 0) >= 40 && S.loans.length < 2 },
      ] : [
        { id: 'loan_w', name: 'Кредит Всемирного банка', desc: 'Казна +50, затем 8 выплат по 7 млн.', cost: 'США ≥ 40', ok: S.rel.usa >= 40 && S.loans.length < 2 },
        { id: 'loan_e', name: 'Кредит Госбанка СССР', desc: 'Казна +50, затем 8 выплат по 7 млн. Москва довольна.', cost: 'СССР ≥ 40', ok: S.rel.ussr >= 40 && S.loans.length < 2 },
      ]),
      { id: 'transfer', name: 'Перевести 15 млн в Цюрих', desc: 'На чёрный день. Шанс скандала 20%.', cost: '−15 млн казны', ok: S.treasury >= 15 },
    ];
    if (!S.flags.nationalized) acts.splice(1, 0, { id: 'nationalize', name: `Национализировать ${R.company}`, desc: `Казна +35, доходы от экспорта выше. Покровитель (${COUNTRIES[R.patron].name}) будет в ярости.`, cost: 'один раз', ok: true, danger: true });
    if (!S.flags.landReform) acts.push({ id: 'land', name: 'Земельная реформа', desc: 'Народ и левые довольны, крупные собственники — в бешенстве. Позже экономика +6.', cost: '', ok: true, danger: true });
    return acts;
  },
  // Эффекты проекта без применения (для предпросмотра и для самого указа)
  economyFx(id) {
    const R = REGIONS[S.region];
    let fx = {}, text = '', risk = null;
    switch (id) {
      case 'highway':
        fx = { treasury: -30, support: 1, schedule: [{ in: 3, fx: { economy: 6, swiss: 4 }, text: `Открыто шоссе имени ${Game.titleGen()}! Шурин-подрядчик прислал благодарность.` }] };
        text = 'Начато строительство шоссе. Первый камень заложен вами лично, со второй попытки.'; break;
      case 'nationalize':
        fx = { treasury: 35, economy: -5, rel: { $patron: -30, usa: R.patron === 'usa' ? 0 : -10, ussr: 12, cuba: 8 }, fac: { left: { a: 20 }, oligarchs: { a: -20 } }, support: 6, flag: { nationalized: true } };
        text = `Компания ${R.company} национализирована! Иностранные управляющие улетели первым рейсом, забыв гольф-клюшки.`; break;
      case 'print':
        fx = { treasury: 25, economy: -5, support: -2 };
        text = 'Станок Монетного двора работал всю ночь. Утром цены выросли. Совпадение?'; break;
      case 'loan_w':
        if (S.era === '2000') { fx = { treasury: 50, support: -2, rel: { usa: 3, eu: 3 }, loan: { per: 7, turns: 8 } }; text = 'МВФ выдал кредит. Взамен — урезанные субсидии на бензин и миссия экспертов, которая поселилась в лучшем отеле.'; break; }
        if (S.era === '1930') { fx = { treasury: 50, rel: { uk: 3 }, loan: { per: 7, turns: 8 } }; text = 'Банкиры Сити выдали заём под залог таможенных сборов. Теперь на таможне сидит англичанин в котелке.'; break; }
        fx = { treasury: 50, rel: { usa: 3 }, loan: { per: 7, turns: 8 } };
        text = 'Всемирный банк выдал кредит. Эксперты в очках оставили 300-страничный список рекомендаций.'; break;
      case 'loan_e':
        if (S.era === '2000') { fx = { treasury: 50, rel: { china: 6, usa: -3 }, loan: { per: 7, turns: 8 } }; text = 'Китайский банк выдал кредит за один день. В договоре сорок страниц, тридцать девять — на китайском.'; break; }
        if (S.era === '1930') { fx = { treasury: 50, rel: { germany: 5, uk: -3 }, loan: { per: 7, turns: 8 } }; text = 'Рейхсбанк выдал кредит в марках, которые можно потратить только в Германии. Очень удобно. Для Германии.'; break; }
        fx = { treasury: 50, rel: { ussr: 5, usa: -3 }, loan: { per: 7, turns: 8 } };
        text = 'Госбанк СССР выдал кредит. В придачу — делегация экономистов с пятилетним планом.'; break;
      case 'transfer':
        fx = { treasury: -15, swiss: 15 };
        risk = { p: 0.2, fx: { support: -6 }, text: 'Перевод в Цюрих раскрыт газетой оппозиции. Неловко.' };
        text = 'Перевод в Цюрих прошёл тихо. Как и положено.'; break;
      case 'land':
        fx = { support: 10, economy: -4, flag: { landReform: true }, fac: { oligarchs: { s: -10, a: -30 }, left: { a: 20, s: -5 } }, rel: { usa: -8, ussr: 6 }, schedule: [{ in: 4, fx: { economy: 6 }, text: 'Земельная реформа приносит плоды: урожай вырос на треть.' }] };
        text = 'Земельная реформа объявлена! Крестьяне пляшут, крупные землевладельцы пьют валерьянку.'; break;
    }
    return { fx, text, risk };
  },
  economyAction(id) {
    if (!Game.spend()) return null;
    let { fx, text, risk } = Game.economyFx(id);
    if (risk && Math.random() < risk.p) { fx = { ...fx, ...risk.fx }; text = risk.text; }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },

  advisorAction(role, act) {
    const A = S.adv[role];
    if (act === 'fire') return Game.fireAdvisor(role);
    if (!Game.spend()) return null;
    let fx = {}, text = '';
    const k = A.comp;
    if (act === 'gift') {
      fx = { treasury: -10, loy: { [role]: 15 } };
      text = `${A.name}: в подарок — вилла у моря. Преданность заметно окрепла.`;
    } else {
      Game.noteDeal('adv:' + role);
    }
    const kk = act === 'gift' ? k : k * [1, 1, 0.6, 0.35, 0.2][Math.min(Game.dealInfo('adv:' + role).n, 4)];
    if (act !== 'gift') switch (role) {
      case 'defense': fx = { treasury: -12, army: Math.round(8 * kk), support: 2, fac: { hawks: { a: 6 } } }; text = 'Военный парад! Танки, оркестр, вы на трибуне. Один танк заехал в фонтан, но это даже понравилось публике.'; break;
      case 'economy': fx = { treasury: -15, economy: Math.round(4 * kk) }; text = `${A.name}: экономическая программа из 412 пунктов готова. Пункт 1: «Рынок».`; break;
      case 'police': fx = { fear: 8, support: -4, fac: { left: { s: -5 * kk }, liberals: { s: -5 * kk } }, flag: { purged: S.turn } }; text = 'Ночная чистка. Утром в столице стало подозрительно тихо и вежливо.'; break;
      case 'propaganda': fx = { treasury: -8, support: Math.round((5 + S.fear / 20) * kk * (S.era === '2000' && !S.flags.trolls ? 1 - (S.net || 0) / 150 : 1)) }; text = 'Кампания «Отец Нации» запущена. Ваш портрет теперь есть даже на спичечных коробках.'; break;
      case 'foreign': {
        const rel = {}; for (const c of REGIONS[S.region].countries) rel[c] = Math.round(3 * kk);
        fx = { treasury: -10, rel }; text = `${A.name} объехал полмира. Его фотография с каждым мировым лидером висит в вашем кабинете.`; break;
      }
    }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  fireAdvisor(role) {
    const A = S.adv[role];
    const rel = RELATIVES[role];
    const old = A.name;
    let fx = {};
    if (role === 'defense') fx = { army: -5, fac: { hawks: { a: -10 } } };
    if (role === 'police') fx = { fear: -5 };
    if (role === 'propaganda') fx = { support: -2 };
    const relName = (RELATIVES_BY_STYLE[REGIONS[S.region].style] || RELATIVES_BY_STYLE.latam)[role];
    S.adv[role] = { name: relName, bio: rel.bio, look: { ...(S.era === '2000' ? RELATIVE_LOOK_00 : RELATIVE_LOOK)[role], skin: SKIN[REGIONS[S.region].leaderSkin] }, loy: 85, comp: rel.comp, relative: true };
    if (A.relative) S.adv[role].name = relName + ' (снова)';
    const changes = Game.apply(fx);
    const text = `${old}: отставка. Новый ${ROLES[role].title.toLowerCase()} — ${relName}. Семья — это надёжно.`;
    Game.log(text);
    return { text, changes };
  },

  // ---------- конец квартала ----------
  endQuarter() {
    const rep = { date: Game.dateLabel(), lines: [], warn: [], before: Game.snapshotStats() };
    const b = S.budget, B = Game.budgetCalc();
    S.treasury += B.net;
    S.swiss += B.palace;
    rep.money = B;
    // бюджетные эффекты
    const BE = Game.budgetEffects();
    for (const [k, d] of Object.entries(BE.tot)) S[k] = clamp(S[k] + d);
    for (const [f, e] of Object.entries(BE.fac)) for (const [key, d] of Object.entries(e)) S.fac[f][key] = clamp(S.fac[f][key] + d);
    const bx = k => b[k] / 50 - 1;
    // дрейф
    const F = S.fac;
    S.economy = clamp(S.economy + (S.price - 1) * 5 + (F.oligarchs.a - 50) / 40 + rnd(-1, 1) + (S.support < 25 ? -1 : 0) + (50 - S.economy) * 0.03);
    S.support = clamp(S.support + (S.economy - 50) / 25 + (S.fear > 60 ? -1 : 0) + (50 - S.support) * 0.02);
    S.army = clamp(S.army + (F.hawks.a - 50) / 30 + (S.treasury < 0 ? -5 : 0) + (60 - S.army) * 0.02);
    S.fear = clamp(S.fear - 1);
    if (F.oligarchs.a < 35) S.economy = clamp(S.economy - (35 - F.oligarchs.a) / 15);
    if (F.faith.a < 40) S.support = clamp(S.support - (40 - F.faith.a) / 20 * F.faith.s / 50);
    F.left.s = clamp(F.left.s + (50 - S.economy) / 30 + (45 - S.support) / 35 + (F.left.st === 'banned' ? 0.5 : 0) + (S.rel.ussr > 65 ? 0.5 : 0));
    F.liberals.s = clamp(F.liberals.s + (S.economy - 50) / 40 + (S.fear - 40) / 50);
    F.oligarchs.s = clamp(F.oligarchs.s + (S.economy - 50) / 50);
    for (const k of Object.keys(F)) {
      const f = F[k];
      const target = f.st === 'coopted' ? 60 : f.st === 'banned' ? 20 : 50;
      f.a = clamp(f.a + (target - f.a) * 0.04, 0, f.st === 'banned' ? 35 : 100);
      f.s = clamp(f.s + (35 - f.s) * 0.02);
    }
    // интернет
    if (S.era === '2000') {
      const c = S.budget.netctl || 0;
      const grow = (0.25 + S.turn * 0.045) * [1.2, 0.75, 0.35][c] * (S.flags.dpi && c ? 0.8 : 1);
      S.net = clamp(S.net + grow, 0, 95);
      const n = S.net / 100;
      S.economy = clamp(S.economy + n * [2.2, 1.1, 0.2][c] - (c === 2 ? 0.6 : 0));
      F.liberals.s = clamp(F.liberals.s + n * [3, 1.5, 0.5][c] * (S.flags.dpi ? 0.7 : 1));
      F.liberals.a = clamp(F.liberals.a + [0.5, -1, -2.5][c]);
      // в интернете видно, как живёт дворец
      F.liberals.a = clamp(F.liberals.a - n * (b.palace / 50) * [2, 1.2, 0.5][c]);
      S.support = clamp(S.support - n * (b.palace / 50) * [1.2, 0.7, 0.3][c]);
      if (c === 2) for (const w of ['usa', 'eu']) if (S.rel[w] !== undefined) S.rel[w] = clamp(S.rel[w] - 1);
      if (S.fear > 50) S.fear = clamp(S.fear - n * 1.5);
      if (n > 0.3 && c === 0 && F.liberals.a < 40) rep.lines.push('Интернет гудит: в блогах ругают правительство, ролики с вашими оговорками набирают миллионы просмотров.');
    }
    // дипломатия
    for (const c of Object.keys(S.rel)) S.rel[c] = clamp(S.rel[c] + (40 - S.rel[c]) * 0.02);
    if (S.rel.usa > 70 && S.rel.ussr !== undefined) S.rel.ussr = clamp(S.rel.ussr - 1);
    if (S.rel.ussr > 70) S.rel.usa = clamp(S.rel.usa - 1);
    // советники
    for (const r of Object.keys(S.adv)) {
      const A = S.adv[r];
      A.loy = clamp(A.loy + Game.diff().loy + bx('palace') + (r === 'defense' ? bx('army') * 2 : 0) + (r === 'police' ? bx('police') : 0));
    }
    // большая казна притягивает чиновников
    if (S.treasury > 120) {
      const leak = (S.treasury - 120) * 0.12;
      S.treasury -= leak;
      for (const r of Object.keys(S.adv)) S.adv[r].loy = clamp(S.adv[r].loy + 0.5);
      rep.warn.push(`Министры «оптимизировали» излишки казны: пропало ${Math.round(leak)} млн. Зато они стали чуть преданнее.`);
    }
    // кредиты
    S.loans.forEach(l => l.left--);
    S.loans = S.loans.filter(l => l.left > 0);
    // долг
    if (S.treasury < 0) {
      S.treasury *= 1.04;
      S.support = clamp(S.support - 3);
      rep.warn.push('Казна в минусе! Армии задерживают жалованье, банки требуют проценты.');
    }
    // цена экспорта
    S.price = clamp(S.price * (1 + rnd(-0.12, 0.12)) + (1 - S.price) * 0.08, 0.5, 1.6);
    S.priceHist.push(+S.price.toFixed(3)); if (S.priceHist.length > 41) S.priceHist.shift();
    // отложенные эффекты
    const due = S.schedule.filter(x => x.at <= S.turn + 1);
    S.schedule = S.schedule.filter(x => x.at > S.turn + 1);
    for (const d of due) { Game.apply(d.fx, { silent: true }); const t = Game.fmt(d.text); rep.lines.push(t); Game.log(t); }
    S.flags.coupBonus = Math.max(0, (S.flags.coupBonus || 0) - 0.04);
    for (const h of Game.quarterHooks) h(rep);
    // кризисы
    rep.crisis = null;
    const betray = Object.keys(S.adv).filter(r => S.adv[r].loy < 25 && Math.random() < 0.15);
    const cr = Game.coupRisk(), rr = Game.revRisk();
    if (betray.includes('defense') || Math.random() < cr) rep.crisis = { type: 'coup', leader: (S.adv.defense.loy < 35 || betray.includes('defense')) ? 'defense' : 'colonel' };
    else if (Math.random() < rr) rep.crisis = { type: 'revolution' };
    else if (betray.length) rep.crisis = { type: 'betrayal', role: betray[0] };
    rep.after = Game.snapshotStats();
    // дата
    S.turn++;
    S.q++; if (S.q > 4) { S.q = 1; S.year++; }
    S.ap = Game.apTurn();
    S.statHist.push(Game.snapshotStats());
    if (S.statHist.length > 41) S.statHist.shift();
    S.lastReport = rep;
    Game.save();
    return rep;
  },

  // ---------- кризисные сцены ----------
  coupScene(leaderRole) {
    const R = REGIONS[S.region];
    const by = leaderRole === 'defense' ? S.adv.defense.name : 'группа полковников';
    const bigRel = Object.entries(S.rel).sort((a, b) => b[1] - a[1])[0];
    const helper = S.flags.frenchGuard ? 'france' : bigRel[0];
    return {
      title: 'Танки у дворца!', bg: 'night', crisis: true,
      lines: [
        ['narrator', 'Три часа ночи. Грохот гусениц. Радио передаёт марши вместо новостей.'],
        leaderRole === 'defense' ? ['defense', Game.fmt(`{Sir} ${S.leader.title}... Ничего личного.`) + ` Просто лента вам не идёт. Мне — идёт больше.`] : ['npc:colonel', 'Внимание! Говорит Революционный совет спасения отечества! Тиран низложен! Ну, почти.'],
        ['police', '{Addr}, у нас минут двадцать. Может, десять. Решайте.'],
      ],
      choices: [
        { text: 'Выступить по радио и поднять народ', chance: () => 0.12 + S.support / 140, win: { fx: {}, res: 'Тысячи людей вышли на улицы и окружили танки. Танкисты вылезли и стали раздавать сигареты. Переворот провалился!' }, lose: { fx: {}, res: 'Радиостанцию уже заняли. Вы говорили в микрофон, отключённый от сети.' } },
        { text: 'Поднять верную гвардию', adv: ['police'], chance: () => 0.1 + S.fear / 220 + S.army / 260 + S.adv.police.loy / 500, win: { fx: {}, res: 'Дворцовая гвардия и тайная полиция отбили штурм. К утру мятежники сдались.' }, lose: { fx: {}, res: 'Гвардия посмотрела на танки и решила, что у неё выходной.' } },
        { text: `Позвонить в посольство: ${COUNTRIES[helper].name}`, adv: ['foreign'], chance: () => (S.rel[helper] || 0) / 130 + (S.flags.frenchGuard ? 0.25 : 0), win: { fx: { rel: { [helper]: -5 } }, res: `Через час мятежным командирам позвонили из посольства. Танки развернулись. Теперь там считают, что вы в долгу (${COUNTRIES[helper].name}).` }, lose: { fx: {}, res: 'В посольстве ответили: «Посол спит. Перезвоните утром». Утро будет уже без вас.' } },
        { text: 'Бежать в аэропорт с казной', fx: { end: 'exile' }, res: 'Самолёт взлетает. В багажном отсеке — чемоданы казны. В иллюминаторе — огни столицы, которую вы больше не увидите.' },
      ],
      after: (out, choice) => {
        if (choice.fx && choice.fx.end) { S.swiss += Math.max(0, S.treasury * 0.6); return 'exile'; }
        if (out.won) {
          Game.apply({ army: 8, fear: 10, fac: { hawks: { s: -15, a: 10 } } });
          S.flags.coupBonus = 0;
          if (leaderRole === 'defense') { Game.fireAdvisor('defense'); }
          Game.log('Попытка военного переворота подавлена.');
          return null;
        }
        return 'coup';
      },
    };
  },
  revolutionScene() {
    const R = REGIONS[S.region];
    return {
      title: 'Революция!', bg: 'square', crisis: true,
      lines: [
        ['narrator', `Сотни тысяч людей на ${R.capitalSquare}. Портреты сорваны. Ворота дворца трещат.`],
        ['npc:rebel', 'Народ пришёл за своим! Выходи, тиран!'],
        ['propaganda', '{Addr}, я... я, пожалуй, пойду проверю радиостанцию. Надолго.'],
        ['defense', 'Армия ждёт приказа. Но солдаты смотрят на толпу и видят там своих матерей.'],
      ],
      choices: [
        { text: 'Ввести войска', adv: ['defense'], chance: () => 0.05 + S.army / 150 + S.fear / 350, win: { fx: { fear: 15, support: -10, fac: { left: { s: -15 }, liberals: { s: -10 } } }, res: 'Площадь очищена. Тишина в столице такая, что слышно, как тикают часы истории.' }, lose: { fx: {}, res: 'Солдаты отказались стрелять и перешли на сторону толпы.' } },
        { text: 'Пойти на большие уступки', adv: ['propaganda', 'foreign'], chance: () => 0.15 + S.support / 110, win: { fx: { treasury: -20, support: 15, fear: -10, fac: { left: { a: 20 }, liberals: { a: 20 } } }, res: 'Вы объявили амнистию, новую конституцию и снижение цен на хлеб. Толпа медленно расходится.' }, lose: { fx: {}, res: 'Уступки запоздали. Ворота пали.' } },
        { text: S.era === '1930' ? 'Улететь на аэроплане с ипподрома' : 'Улететь на вертолёте с крыши', fx: { end: 'helicopter' }, res: S.era === '1930' ? 'Аэроплан отрывается от беговой дорожки ипподрома. Внизу толпа, впереди — неизвестность и швейцарский счёт.' : 'Вертолёт поднимается над дворцом. Внизу толпа, вверху — неизвестность и швейцарский счёт.' },
      ],
      after: (out, choice) => {
        if (choice.fx && choice.fx.end) return 'helicopter';
        if (out.won) { Game.log('Революция подавлена или остановлена уступками.'); return null; }
        return 'revolution';
      },
    };
  },
  betrayalScene(role) {
    const A = S.adv[role];
    const variants = {
      economy: { text: `${A.name}: исчезновение вместе с ключами от казначейства. Последний раз беглеца видели в аэропорту с чемоданом, на котором было написано «Рынок».`, fx: { treasury: -Math.min(25, Math.max(0, S.treasury)) } },
      police: { text: `${A.name}: досье на вас продано иностранной разведке, а сам предатель уже за границей. Теперь где-то в мире знают, сколько у вас пар сапог.`, fx: { fear: -10, rel: { [pick(['usa', 'ussr'])]: -8 } } },
      propaganda: { text: `${A.name}: побег в соседнюю страну и оппозиционное радио «Голос свободы».`, fx: { support: -6, fac: { liberals: { s: 6 } } } },
      foreign: { text: `${A.name} попросил политического убежища в посольстве. Его новая книга называется «Я служил тирану (в стихах)».`, fx: { rel: { [pick(REGIONS[S.region].countries)]: -10 } } },
    }[role];
    return {
      title: 'Предательство!', bg: 'night',
      lines: [['narrator', variants.text], ['narrator', 'Вакантное место займёт кто-нибудь из родственников. Семья не предаст. Наверное.']],
      choices: [{ text: 'Проклясть предателя', fx: variants.fx, res: 'Проклятие произнесено. Портрет предателя снят со стены кабинета.' }],
      after: () => { Game.fireAdvisor(role); return null; },
    };
  },

  // ---------- финалы ----------
  epilogue30() {
    const b = Game.bloc();
    if (S.region === 'europe30') {
      if (b === 'Друг «Оси»' || b === 'Друг Берлина') return 'Берлин называет вас союзником. Это самая опасная дружба на континенте.';
      if (b === 'Друг Москвы') return 'Москва предлагает «договор о взаимопомощи» и уже подтягивает войска к границе. Подозрительно щедро.';
      if (b === 'Друг демократий') return 'Лондон и Париж дали гарантии. Хватит ли их надолго, не знает никто.';
      return 'Вы лавируете между Берлином и Москвой, как канатоходец над пропастью.';
    }
    if (S.region === 'asia30') return (S.rel.japan || 0) > 60 ? 'Токио считает вас частью своего «нового порядка».' : 'Японские войска всё ближе к вашим границам.';
    return (S.rel.usa || 0) > 60 ? 'Вашингтон называет вас «добрым соседом».' : 'Немецкие подводные лодки уже заходят в южные моря.';
  },
  ending(type) {
    S.over = type;
    const R = REGIONS[S.region];
    const ex = R.exile;
    const rich = S.swiss >= 40;
    const years = (S.turn / 4).toFixed(1).replace('.0', '');
    const T = S.leader.title;
    const E = {
      coup: { title: 'Свергнут', text: rich
        ? `Вас свергли. Но благодаря швейцарскому счёту вы живёте на вилле в ${ex}, пишете мемуары «Я был ${Game.titleIns()}» и раз в неделю грозите новой хунте по телефону.`
        : `Вас свергли. Денег на счёте не хватило даже на приличную виллу. Теперь вы водите такси в ${ex} и рассказываете пассажирам, что когда-то были ${Game.titleIns()}. Они не верят.` },
      exile: { title: 'Бегство с казной', text: `Вы улетели за час до того, как танки вошли во дворец. Новая власть требует вашей выдачи, но в ${ex} не выдают тех, кто платит налоги наличными.` },
      revolution: { title: 'Сметён революцией', text: `Революционный трибунал рассмотрел ваше дело и приговорил вас... к работе в сельской библиотеке. Каждый день вы выдаёте читателям книги о тиранах. Иногда — о себе.` },
      helicopter: S.era === '1930' ? { title: 'Аэроплан с ипподрома', text: rich
        ? `Аэроплан доставил вас в соседнюю страну, а оттуда пароход — в ${ex}. Там вы пьёте коктейли с другими бывшими диктаторами. Вас тут целый клуб.`
        : `Аэроплан дотянул до границы, и бензин кончился. Вы пересекли её пешком, в пижаме и с медалями. Соседи дали вам убежище и маленькую квартиру.` } : { title: 'Вертолёт с крыши', text: rich
        ? `Вертолёт доставил вас на борт яхты. Через неделю вы уже в ${ex}, где пьёте коктейли с другими бывшими диктаторами. Вас тут целый клуб.`
        : `Вертолёт долетел до границы, и топливо кончилось. Вы пересекли её пешком, в пижаме и с медалями. Соседи дали вам убежище и маленькую квартиру.` },
      occupied: { title: 'Страна оккупирована', text: `Армия держалась, сколько могла. Теперь вы возглавляете правительство в изгнании в Лондоне: три министра, пишущая машинка и радиопередача на родину раз в неделю. Историки ещё решат, были ли вы диктатором или символом сопротивления.` },
      retired: { title: 'Ушёл на покой', text: `Вы добровольно передали власть «временному совету» и поселились в ${ex}. Историки до сих пор спорят, был ли это жест мудрости или хорошо рассчитанный побег.` },
      survived: S.era === '2000' ? { title: 'Пережил нулевые', text: `31 декабря 2009 года. Позади 11 сентября, цветные революции, нефтяной бум и мировой кризис, а вы всё ещё ${T}. Интернет теперь у ${Math.round(S.net)}% граждан, а видео с вашими речами набирают миллионы просмотров, причём не всегда из уважения. Впереди 2010-е. ${S.region === 'mideast00' ? 'Говорят, в регионе ожидается какая-то «весна».' : 'Говорят, следующее десятилетие будет ещё веселее.'}` } : S.era === '1930' ? { title: 'Пережил тридцатые', text: `31 декабря 1939 года. Европа в огне, Китай в огне, мир снова воюет, а вы всё ещё ${T}. Вы пережили Депрессию, «рубашки», путчи и Лигу Наций. ${Game.epilogue30()} Впереди сороковые, и они будут куда страшнее.` } : { title: 'Пережил шестидесятые', text: `31 декабря 1969 года. Вы стоите на балконе дворца, а внизу салют. Десятилетие переворотов, ракетных кризисов и революций позади — а вы всё ещё ${T}. Впереди семидесятые. Говорят, там нефть подорожает.` },
    }[type];
    const verdicts = [];
    if (S.swiss >= 100) verdicts.push('Самый богатый пенсионер континента');
    if (S.support >= 70) verdicts.push('Любимец народа');
    if (S.fear >= 70) verdicts.push('Железный кулак');
    if (S.economy >= 70) verdicts.push('Автор экономического чуда');
    if (S.army >= 80) verdicts.push('Генерал генералов');
    if (S.support < 25) verdicts.push('Самый непопулярный человек в стране');
    if (S.flags.nam) verdicts.push('Голос неприсоединения');
    if (!verdicts.length) verdicts.push('Типичный правитель своей эпохи');
    for (const h of Game.endingHooks) h(type, E, verdicts);
    const score = Math.round((S.turn * 10 + S.swiss * 1.5 + S.support * 2 + S.economy * 2 + (type === 'survived' ? 300 : type === 'retired' ? 120 : 0) + (S.flags.scoreBonus || 0)) * Game.diff().score);
    if (S.flags.icc && type !== 'survived' && type !== 'revolution') E.text += ' Правда, в Европу вам путь закрыт: в Гааге вас ждёт ордер на арест.';
    if (S.era === '2000' && S.net >= 50) verdicts.push('Звезда мемов');
    S.final = { type, ...E, years, verdicts, score };
    Game.save();
    return S.final;
  },
};
