// Игровая логика: состояние, экономика, движения, дипломатия, кризисы, финалы.
const SAVE_KEY = 'dictato.save.v1';
const LAST_TURN = 39; // 1960 Q1 … 1969 Q4
const AP_PER_TURN = 2;

const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const STAT_NAMES = { treasury: 'Казна', swiss: 'Счёт в Швейцарии', economy: 'Экономика', support: 'Народ', army: 'Армия', fear: 'Страх' };
const STAT_ICONS = { treasury: '💰', swiss: '🏦', economy: '🏭', support: '👥', army: '🪖', fear: '👁️' };
const BUDGET = {
  army: { name: 'Армия', costs: [5, 10, 18], labels: ['Урезать', 'Норма', 'Щедро'] },
  police: { name: 'Тайная полиция', costs: [3, 6, 11], labels: ['Урезать', 'Норма', 'Щедро'] },
  social: { name: 'Хлеб и школы', costs: [3, 8, 14], labels: ['Урезать', 'Норма', 'Щедро'] },
  infra: { name: 'Дороги и порты', costs: [3, 8, 14], labels: ['Урезать', 'Норма', 'Щедро'] },
  tax: { name: 'Налоги', costs: [0, 0, 0], labels: ['Низкие', 'Средние', 'Высокие'] },
  palace: { name: 'Нужды дворца', costs: [0, 5, 12], labels: ['Скромно', 'Умеренно', 'По-королевски'] },
};
const RIVALS = { left: ['oligarchs', 'hawks'], liberals: ['hawks'], faith: ['left'], oligarchs: ['left'], hawks: ['liberals', 'left'] };

let S = null;

const Game = {
  get S() { return S; },

  newGame(cfg) {
    const R = REGIONS[cfg.region];
    const T = REGIME_TYPES[cfg.regime];
    const era = cfg.era || '1960';
    S = {
      v: 1, era, region: cfg.region, regime: cfg.regime,
      leader: { name: cfg.name, title: cfg.title, look: cfg.look },
      country: cfg.country || R.country,
      turn: 0, year: ERAS[era].start, q: 1, ap: AP_PER_TURN,
      treasury: era === '1930' ? 110 : 80, swiss: 0, economy: 45, support: 50, army: 60, fear: 25,
      price: 1, priceHist: [1],
      budget: { army: 1, police: 1, social: 1, infra: 1, tax: 1, palace: 1 },
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
    S.statHist.push(Game.snapshotStats());
    Game.log(`${S.leader.title} ${S.leader.name} пришёл к власти. Режим: ${T.name}.`);
    Game.save();
    return S;
  },

  snapshotStats() { return { t: S.turn, treasury: Math.round(S.treasury), economy: Math.round(S.economy), support: Math.round(S.support), army: Math.round(S.army), fear: Math.round(S.fear), swiss: Math.round(S.swiss) }; },

  save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* хранилище недоступно */ } },
  load() {
    try { const raw = localStorage.getItem(SAVE_KEY); if (!raw) return null; S = JSON.parse(raw); S.era = S.era || '1960'; return S; } catch (e) { return null; }
  },
  hasSave() { try { const raw = localStorage.getItem(SAVE_KEY); return !!raw && !JSON.parse(raw).over; } catch (e) { return false; } },
  clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* */ } },
  restore(state) { S = state; },

  dateLabel(st = S) { return `${['I', 'II', 'III', 'IV'][st.q - 1]} квартал ${st.year}`; },
  log(text) { S.log.unshift({ d: Game.dateLabel(), text }); if (S.log.length > 200) S.log.length = 200; },

  vars() {
    const R = REGIONS[S.region];
    const v = {
      leader: S.leader.name, title: S.leader.title, country: S.country, capital: R.capital, cur: R.currency,
      exports: R.exports, exportGen: R.exportGen, company: R.company, patron: COUNTRIES[R.patron].name,
      sport: R.sport, rival: R.rival, rivalShort: R.rivalShort, disputed: R.disputed, faithLeader: R.faithLeader,
      square: R.capitalSquare, jungle: R.jungle, nephew: R.nephew, year: S.year,
      ...ERAS[S.era].vars,
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
  fmt(str) {
    if (!str) return '';
    const v = Game.vars();
    return str.replace(/\{([\w.]+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
  },

  leaderAt(cKey) {
    const t = S.year + (S.q - 1) / 4;
    const c = COUNTRIES[cKey];
    for (const [until, name] of c.leaders) if (t < until) return name;
    return c.leaders[c.leaders.length - 1][1];
  },

  // ---------- применение эффектов ----------
  resolveFx(fx) { return typeof fx === 'function' ? fx(S) : (fx || {}); },
  blocOf(c) { const C = COUNTRIES[c]; return (S.era === '1930' && C.bloc30) || C.bloc; },
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
    for (const k of ['treasury', 'swiss', 'economy', 'support', 'army', 'fear']) {
      if (fx[k]) {
        let d = fx[k];
        const before = S[k];
        S[k] = (k === 'treasury' || k === 'swiss') ? Math.max(k === 'swiss' ? 0 : -999, S[k] + d) : clamp(S[k] + d);
        d = S[k] - before;
        if (Math.round(d)) ch.push({ k, d: Math.round(d), label: STAT_NAMES[k], icon: STAT_ICONS[k], money: k === 'treasury' || k === 'swiss' });
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
    if (fx.schedule) for (const sc of fx.schedule) S.schedule.push({ at: S.turn + sc.in, fx: sc.fx, text: sc.text });
    if (fx.loan) { S.loans.push({ per: fx.loan.per, left: fx.loan.turns }); ch.push({ k: 'loan', d: -fx.loan.per, label: `Выплаты по кредиту ×${fx.loan.turns} кв.`, money: true }); }
    if (!opts.silent) Game.save();
    return ch;
  },

  // Подсказка о последствиях для кнопки выбора (без применения)
  previewFx(fxIn) {
    const fx = Game.resolveFx(fxIn);
    const out = [];
    for (const k of ['treasury', 'swiss', 'economy', 'support', 'army', 'fear']) if (fx[k]) out.push({ icon: STAT_ICONS[k], d: fx[k], label: STAT_NAMES[k] });
    if (fx.fac) for (const [f, e] of Object.entries(fx.fac)) {
      const F = REGIONS[S.region].factions[f];
      if (e.a) out.push({ icon: F.icon, d: e.a, label: `${F.name}: одобрение`, text: `${F.short} ${sign(e.a)}` });
      if (e.s) out.push({ icon: F.icon, d: e.s, label: `${F.name}: сила`, text: `${F.short}: сила ${sign(e.s)}`, inv: true });
    }
    if (fx.rel) for (const [key, d] of Object.entries(fx.rel)) for (const c of Game.relTargets(key)) out.push({ flag: c, d, label: COUNTRIES[c].name });
    if (fx.price) out.push({ icon: '📦', d: fx.price * 100, label: 'Мировая цена на экспорт', text: `цена ${sign(fx.price * 100)}%` });
    if (fx.schedule) out.push({ icon: '⏳', d: 0, label: 'Отложенный эффект', text: 'потом' });
    if (fx.loan) out.push({ icon: '🧾', d: -fx.loan.per, label: `Кредит: ${fx.loan.turns} выплат` });
    return out;
  },

  // ---------- бюджет ----------
  budgetCalc() {
    const b = S.budget;
    const ecoK = S.economy / 50;
    const taxes = [7, 13, 19][b.tax] * ecoK;
    const exports = 16 * S.price * (0.6 + S.economy / 125) * (S.flags.nationalized ? 1.15 : 1);
    const aid = Game.aidList();
    const aidSum = aid.reduce((a, x) => a + x.v, 0);
    const extra = (S.flags.baseIncome || 0) + (S.flags.oilIncome || 0) + (S.flags.casinoIncome || 0);
    const costs = {};
    for (const k of ['army', 'police', 'social', 'infra']) costs[k] = BUDGET[k].costs[b[k]];
    const palace = BUDGET.palace.costs[b.palace];
    const loans = S.loans.reduce((a, l) => a + l.per, 0);
    const income = taxes + exports + aidSum + extra;
    const expense = costs.army + costs.police + costs.social + costs.infra + palace + loans;
    return { taxes, exports, aid, aidSum, extra, costs, palace, loans, income, expense, net: income - expense };
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
      - (S.flags.purged !== undefined && S.turn - S.flags.purged <= 1 ? 0.1 : 0);
    if (S.army >= 75 && H.a >= 50) r = Math.min(r, 0.01);
    return clamp(r, 0, 0.5);
  },
  revRisk() {
    if (S.turn < 3) return 0;
    const L = S.fac.left, Li = S.fac.liberals;
    let r = Math.max(0, 30 - S.support) / 100 * 0.8
      + L.s / 100 * Math.max(0, 50 - L.a) / 100 * 0.35
      + Li.s / 100 * Math.max(0, 50 - Li.a) / 100 * 0.15
      - S.fear / 600;
    if (S.support < 20 && S.fear > 70) r += 0.05;
    return clamp(r, 0, 0.5);
  },
  riskWord(r) {
    if (r < 0.03) return { w: 'спокойно', c: 'ok' };
    if (r < 0.08) return { w: 'шепчутся', c: 'low' };
    if (r < 0.16) return { w: 'тревожно', c: 'mid' };
    if (r < 0.28) return { w: 'опасно', c: 'high' };
    return { w: 'вот-вот', c: 'crit' };
  },
  bloc() {
    if (S.era === '1930') {
      const avg = list => { const v = list.filter(c => S.rel[c] !== undefined).map(c => S.rel[c]); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
      const g = [['Друг демократий', avg(['uk', 'france', 'usa'])], ['Друг Берлина и Рима', avg(['germany', 'italy', 'japan'])], ['Друг Москвы', avg(['ussr'])]].sort((a, b) => b[1] - a[1]);
      return g[0][1] - g[1][1] > 15 ? g[0][0] : 'Нейтралитет';
    }
    const w = S.rel.usa, e = S.rel.ussr;
    if (w - e > 20) return 'Западный лагерь';
    if (e - w > 20) return 'Социалистический лагерь';
    return 'Неприсоединение';
  },

  // ---------- события ----------
  historyFor(year, q) {
    const list = S.era === '1930' ? HISTORY_30 : HISTORY;
    return list.filter(h => h.at[0] === year && h.at[1] === q && (!h.regions || h.regions.includes(S.region)));
  },
  drawEvent() {
    const pool = EVENTS.filter(e =>
      (!e.regions || e.regions.includes(S.region)) &&
      (!e.eras || e.eras.includes(S.era)) &&
      (!e.once || !S.used.includes(e.id)) &&
      (e.minTurn === undefined || S.turn >= e.minTurn) &&
      (!e.cond || e.cond(S)) &&
      !(S.lastEvents || []).includes(e.id));
    if (!pool.length) return null;
    const total = pool.reduce((a, e) => a + (e.weight || 1), 0);
    let x = Math.random() * total;
    for (const e of pool) { x -= (e.weight || 1); if (x <= 0) return e; }
    return pool[pool.length - 1];
  },
  markUsed(e) {
    S.used.push(e.id);
    S.lastEvents = [e.id, ...(S.lastEvents || [])].slice(0, 4);
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
      case 'talk':
        fx = { treasury: -8, fac: { [f]: { a: 12 } } };
        for (const r of RIVALS[f]) rivals[r] = { a: -4 };
        text = `Переговоры с движением «${nm}» прошли в тёплой обстановке. С коньяком.`; break;
      case 'bribe':
        fx = { treasury: -20, fac: { [f]: { a: 18 } } };
        text = `Лидеры движения «${nm}» получили конверты. Толстые. Их речи заметно смягчились.`; break;
      case 'coopt':
        fx = { fac: { [f]: { a: 20, s: 5 } } };
        for (const r of RIVALS[f]) rivals[r] = { a: -10 };
        F.st = 'coopted';
        text = `Представители движения «${nm}» получили министерские портфели. Портфели пустые, но кожаные.`; break;
      case 'ban': {
        F.st = 'banned';
        fx = { fear: 6, fac: { [f]: { s: -15, a: -35 } } };
        const extra = {
          left: { rel: { usa: 5, ussr: -8, cuba: -5, china: -4 } },
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
  factionActions(f) {
    const F = S.fac[f];
    const acts = [];
    acts.push({ id: 'talk', name: 'Переговоры', cost: '−8 млн', ok: S.treasury >= 8 });
    acts.push({ id: 'bribe', name: 'Подкупить лидеров', cost: '−20 млн', ok: S.treasury >= 20 });
    if (F.st === 'legal') acts.push({ id: 'coopt', name: 'Дать места в правительстве', cost: 'одобрение ≥ 40', ok: F.a >= 40 });
    if (F.st !== 'banned') acts.push({ id: 'ban', name: 'Запретить', cost: 'страх ↑', ok: true, danger: true });
    else acts.push({ id: 'legalize', name: 'Легализовать', cost: '', ok: true });
    acts.push({ id: 'arrest', name: 'Арестовать лидеров', cost: 'риск мучеников', ok: true, danger: true });
    return acts;
  },

  countryActions(c) {
    const isBig = ['usa', 'ussr', 'uk', 'france', 'china', 'germany', 'italy', 'japan'].includes(c);
    const acts = [
      { id: 'visit', name: 'Государственный визит', cost: '−5 млн', ok: S.treasury >= 5 },
      { id: 'trade', name: 'Торговое соглашение', cost: '', ok: S.rel[c] >= 30 },
      { id: 'aid', name: 'Просить помощи', cost: `шанс ${Math.round(clamp(S.rel[c] / 100, 0.05, 0.9) * 100)}%`, ok: true },
    ];
    if (isBig) acts.push({ id: 'arms', name: 'Купить оружие', cost: '−20 млн', ok: S.treasury >= 20 && S.rel[c] >= 35 });
    acts.push({ id: 'denounce', name: 'Осудить и выслать посла', cost: '', ok: true, danger: true });
    return acts;
  },
  countryAction(c, act) {
    if (!Game.spend()) return null;
    const C = COUNTRIES[c], R = REGIONS[S.region];
    const bl = Game.blocOf(c);
    const opp = S.era === '1930'
      ? (bl === 'west' ? '$axis' : bl === 'axis' ? '$west' : bl === 'east' ? '$axis' : null)
      : (bl === 'west' ? '$east' : bl === 'east' ? '$west' : null);
    let fx = {}, text = '';
    const isSuper = ['usa', 'ussr'].includes(c);
    switch (act) {
      case 'visit':
        fx = { treasury: -5, support: 1, rel: { [c]: 8 } };
        text = `Государственный визит: ${C.name}. ${Game.leaderAt(c)[0].toUpperCase() + Game.leaderAt(c).slice(1)} принял вас тепло. Обменялись подарками: вы подарили чучело крокодила.`; break;
      case 'trade':
        fx = { economy: 2, rel: { [c]: 6 } }; if (opp) fx.rel[opp] = -3;
        text = `Подписано торговое соглашение с ${C.name === 'США' ? 'США' : 'страной ' + C.name}: ${R.exports} в обмен на тракторы и обещания.`; break;
      case 'aid': {
        const p = clamp(S.rel[c] / 100, 0.05, 0.9);
        if (Math.random() < p) {
          const amt = isSuper ? 30 : c === 'china' || c === 'uk' || c === 'france' ? 20 : 12;
          fx = { treasury: amt, rel: { [c]: -4 } };
          text = `${C.name} выделили помощь: ${amt} млн. С намёком, что это не в последний раз. И не бесплатно.`;
        } else { fx = { rel: { [c]: -6 } }; text = `${C.name} вежливо отказали. Министр иностранных дел написал об этом печальный сонет.`; }
        break;
      }
      case 'arms':
        fx = { treasury: -20, army: 8, rel: { [c]: 4 }, fac: { hawks: { a: 5 } } };
        text = `Закуплено оружие у страны ${C.name}. Генерал лично опробовал каждый пулемёт. В воздух.`; break;
      case 'denounce':
        fx = { support: 3, rel: { [c]: -18 } }; if (opp) fx.rel[opp] = 6;
        text = `Посол страны ${C.name} объявлен персоной нон грата. Митинг у посольства собрал тысячи людей и одного продавца мороженого.`; break;
    }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },

  economyActions() {
    const R = REGIONS[S.region];
    const acts = [
      { id: 'highway', name: `Шоссе имени ${S.leader.name.split(' ').slice(-1)[0]}`, desc: 'Через 3 квартала экономика +6. Подрядчик — родственник.', cost: '−30 млн', ok: S.treasury >= 30 },
      { id: 'print', name: 'Напечатать деньги', desc: 'Казна +25. Экономика −5, народ −2.', cost: '', ok: true },
      ...(S.era === '1930' ? [
        { id: 'loan_w', name: 'Заём лондонского Сити', desc: 'Казна +50, затем 8 выплат по 7 млн.', cost: 'Британия ≥ 40', ok: (S.rel.uk || 0) >= 40 && S.loans.length < 2 },
        { id: 'loan_e', name: 'Кредит Рейхсбанка', desc: 'Казна +50, затем 8 выплат по 7 млн. Берлин доволен, Лондон — нет.', cost: 'Германия ≥ 40', ok: (S.rel.germany || 0) >= 40 && S.loans.length < 2 },
      ] : [
        { id: 'loan_w', name: 'Кредит Всемирного банка', desc: 'Казна +50, затем 8 выплат по 7 млн.', cost: 'США ≥ 40', ok: S.rel.usa >= 40 && S.loans.length < 2 },
        { id: 'loan_e', name: 'Кредит Госбанка СССР', desc: 'Казна +50, затем 8 выплат по 7 млн. Москва довольна.', cost: 'СССР ≥ 40', ok: S.rel.ussr >= 40 && S.loans.length < 2 },
      ]),
      { id: 'transfer', name: 'Перевести 15 млн в Цюрих', desc: 'На чёрный день. Шанс скандала 20%.', cost: '−15 млн казны', ok: S.treasury >= 15 },
    ];
    if (!S.flags.nationalized) acts.splice(1, 0, { id: 'nationalize', name: `Национализировать ${R.company}`, desc: `Казна +35, доходы от экспорта выше. ${COUNTRIES[R.patron].name} будут в ярости.`, cost: 'один раз', ok: true, danger: true });
    if (!S.flags.landReform) acts.push({ id: 'land', name: 'Земельная реформа', desc: 'Народ и левые довольны, крупные собственники — в бешенстве. Позже экономика +6.', cost: '', ok: true, danger: true });
    return acts;
  },
  economyAction(id) {
    if (!Game.spend()) return null;
    const R = REGIONS[S.region];
    let fx = {}, text = '';
    switch (id) {
      case 'highway':
        fx = { treasury: -30, support: 1, schedule: [{ in: 3, fx: { economy: 6, swiss: 4 }, text: `Открыто шоссе имени ${S.leader.name}! Шурин-подрядчик прислал благодарность.` }] };
        text = 'Начато строительство шоссе. Первый камень заложен вами лично, со второй попытки.'; break;
      case 'nationalize':
        fx = { treasury: 35, economy: -5, rel: { $patron: -30, usa: R.patron === 'usa' ? 0 : -10, ussr: 12, cuba: 8 }, fac: { left: { a: 20 }, oligarchs: { a: -20 } }, support: 6, flag: { nationalized: true } };
        text = `${R.company} национализирована! Иностранные управляющие улетели первым рейсом, забыв гольф-клюшки.`; break;
      case 'print':
        fx = { treasury: 25, economy: -5, support: -2 };
        text = 'Станок Монетного двора работал всю ночь. Утром цены выросли. Совпадение?'; break;
      case 'loan_w':
        if (S.era === '1930') { fx = { treasury: 50, rel: { uk: 3 }, loan: { per: 7, turns: 8 } }; text = 'Банкиры Сити выдали заём под залог таможенных сборов. Теперь на таможне сидит англичанин в котелке.'; break; }
        fx = { treasury: 50, rel: { usa: 3 }, loan: { per: 7, turns: 8 } };
        text = 'Всемирный банк выдал кредит. Эксперты в очках оставили 300-страничный список рекомендаций.'; break;
      case 'loan_e':
        if (S.era === '1930') { fx = { treasury: 50, rel: { germany: 5, uk: -3 }, loan: { per: 7, turns: 8 } }; text = 'Рейхсбанк выдал кредит в марках, которые можно потратить только в Германии. Очень удобно. Для Германии.'; break; }
        fx = { treasury: 50, rel: { ussr: 5, usa: -3 }, loan: { per: 7, turns: 8 } };
        text = 'Госбанк СССР выдал кредит. В придачу — делегация экономистов с пятилетним планом.'; break;
      case 'transfer':
        fx = Math.random() < 0.2 ? { treasury: -15, swiss: 15, support: -6 } : { treasury: -15, swiss: 15 };
        text = fx.support ? 'Перевод в Цюрих раскрыт газетой оппозиции. Неловко.' : 'Перевод в Цюрих прошёл тихо. Как и положено.'; break;
      case 'land':
        fx = { support: 10, economy: -4, flag: { landReform: true }, fac: { oligarchs: { s: -10, a: -30 }, left: { a: 20, s: -5 } }, rel: { usa: -8, ussr: 6 }, schedule: [{ in: 4, fx: { economy: 6 }, text: 'Земельная реформа приносит плоды: урожай вырос на треть.' }] };
        text = 'Земельная реформа объявлена! Крестьяне пляшут, латифундисты пьют валерьянку.'; break;
    }
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
      text = `${A.name} получил в подарок виллу у моря. Его преданность заметно окрепла.`;
    } else switch (role) {
      case 'defense': fx = { treasury: -12, army: Math.round(8 * k), support: 2, fac: { hawks: { a: 6 } } }; text = 'Военный парад! Танки, оркестр, вы на трибуне. Один танк заехал в фонтан, но это даже понравилось публике.'; break;
      case 'economy': fx = { treasury: -15, economy: Math.round(4 * k) }; text = `${A.name} представил экономическую программу из 412 пунктов. Пункт 1: «Рынок».`; break;
      case 'police': fx = { fear: 8, support: -4, fac: { left: { s: -5 * k }, liberals: { s: -5 * k } }, flag: { purged: S.turn } }; text = 'Ночная чистка. Утром в столице стало подозрительно тихо и вежливо.'; break;
      case 'propaganda': fx = { treasury: -8, support: Math.round((5 + S.fear / 20) * k) }; text = 'Кампания «Отец Нации» запущена. Ваш портрет теперь есть даже на спичечных коробках.'; break;
      case 'foreign': {
        const rel = {}; for (const c of REGIONS[S.region].countries) rel[c] = Math.round(3 * k);
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
    S.adv[role] = { name: rel.name, bio: rel.bio, look: { ...RELATIVE_LOOK[role], skin: SKIN[REGIONS[S.region].leaderSkin] }, loy: 85, comp: rel.comp, relative: true };
    if (A.relative) S.adv[role].name = rel.name + ' (снова)';
    const changes = Game.apply(fx);
    const text = `${old} отправлен в отставку. Новый ${ROLES[role].title.toLowerCase()} — ${rel.name}. Семья — это надёжно.`;
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
    const lvl = v => v - 1;
    S.army = clamp(S.army + [-4, 0, 3][b.army]);
    S.fac.hawks.a = clamp(S.fac.hawks.a + [-3, 0, 2][b.army]);
    S.fac.hawks.s = clamp(S.fac.hawks.s + [-1, 0, 1][b.army]);
    S.fear = clamp(S.fear + [-3, 0, 3][b.police]);
    S.fac.liberals.a = clamp(S.fac.liberals.a + [1, 0, -2][b.police]);
    S.support = clamp(S.support + [-3, 0, 3][b.social]);
    S.fac.left.a = clamp(S.fac.left.a + [-2, 0, 2][b.social]);
    S.economy = clamp(S.economy + [-1.2, 0.3, 1.5][b.infra]);
    S.support = clamp(S.support + [2, 0, -3][b.tax]);
    S.economy = clamp(S.economy + [0.5, 0, -0.5][b.tax]);
    S.fac.oligarchs.a = clamp(S.fac.oligarchs.a + [2, 0, -3][b.tax]);
    S.support = clamp(S.support + [0, -0.5, -1.5][b.palace]);
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
    // дипломатия
    for (const c of Object.keys(S.rel)) S.rel[c] = clamp(S.rel[c] + (40 - S.rel[c]) * 0.02);
    if (S.rel.usa > 70 && S.rel.ussr !== undefined) S.rel.ussr = clamp(S.rel.ussr - 1);
    if (S.rel.ussr > 70) S.rel.usa = clamp(S.rel.usa - 1);
    // советники
    for (const r of Object.keys(S.adv)) {
      const A = S.adv[r];
      A.loy = clamp(A.loy - 0.6 + [-1, 0, 1][b.palace] + (r === 'defense' ? lvl(b.army) * 2 : 0) + (r === 'police' ? lvl(b.police) : 0));
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
    S.ap = AP_PER_TURN;
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
        leaderRole === 'defense' ? ['defense', `Сеньор ${S.leader.title}... Ничего личного. Просто лента вам не идёт. Мне — идёт больше.`] : ['npc:colonel', 'Внимание! Говорит Революционный совет спасения отечества! Тиран низложен! Ну, почти.'],
        ['police', 'Сеньор, у нас минут двадцать. Может, десять. Решайте.'],
      ],
      choices: [
        { text: 'Выступить по радио и поднять народ', chance: () => 0.12 + S.support / 140, win: { fx: {}, res: 'Тысячи людей вышли на улицы и окружили танки. Танкисты вылезли и стали раздавать сигареты. Переворот провалился!' }, lose: { fx: {}, res: 'Радиостанцию уже заняли. Вы говорили в микрофон, отключённый от сети.' } },
        { text: 'Поднять верную гвардию', adv: ['police'], chance: () => 0.1 + S.fear / 220 + S.army / 260 + S.adv.police.loy / 500, win: { fx: {}, res: 'Президентская гвардия и тайная полиция отбили штурм. К утру мятежники сдались.' }, lose: { fx: {}, res: 'Гвардия посмотрела на танки и решила, что у неё выходной.' } },
        { text: `Позвонить в посольство: ${COUNTRIES[helper].name}`, adv: ['foreign'], chance: () => (S.rel[helper] || 0) / 130 + (S.flags.frenchGuard ? 0.25 : 0), win: { fx: { rel: { [helper]: -5 } }, res: `Через час мятежным командирам позвонили из посольства. Танки развернулись. ${COUNTRIES[helper].name} теперь считают, что вы им должны.` }, lose: { fx: {}, res: 'В посольстве ответили: «Посол спит. Перезвоните утром». Утро будет уже без вас.' } },
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
        ['propaganda', 'Сеньор, я... я, пожалуй, пойду проверю радиостанцию. Надолго.'],
        ['defense', 'Армия ждёт приказа. Но солдаты смотрят на толпу и видят там своих матерей.'],
      ],
      choices: [
        { text: 'Ввести войска', adv: ['defense'], chance: () => 0.05 + S.army / 150 + S.fear / 350, win: { fx: { fear: 15, support: -10, fac: { left: { s: -15 }, liberals: { s: -10 } } }, res: 'Площадь очищена. Тишина в столице такая, что слышно, как тикают часы истории.' }, lose: { fx: {}, res: 'Солдаты отказались стрелять и перешли на сторону толпы.' } },
        { text: 'Пойти на большие уступки', adv: ['propaganda', 'foreign'], chance: () => 0.15 + S.support / 110, win: { fx: { treasury: -20, support: 15, fear: -10, fac: { left: { a: 20 }, liberals: { a: 20 } } }, res: 'Вы объявили амнистию, новую конституцию и снижение цен на хлеб. Толпа медленно расходится.' }, lose: { fx: {}, res: 'Уступки запоздали. Ворота пали.' } },
        { text: 'Улететь на вертолёте с крыши', fx: { end: 'helicopter' }, res: 'Вертолёт поднимается над дворцом. Внизу толпа, вверху — неизвестность и швейцарский счёт.' },
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
      economy: { text: `${A.name} исчез вместе с ключами от казначейства. Последний раз его видели в аэропорту с чемоданом, на котором было написано «Рынок».`, fx: { treasury: -Math.min(25, Math.max(0, S.treasury)) } },
      police: { text: `${A.name} продал досье на вас иностранной разведке и уехал. Теперь где-то в мире знают, сколько у вас пар сапог.`, fx: { fear: -10, rel: { [pick(['usa', 'ussr'])]: -8 } } },
      propaganda: { text: `${A.name} сбежал в соседнюю страну и запустил оппозиционное радио «Голос свободного ${S.country.split(' ').slice(-1)[0]}».`, fx: { support: -6, fac: { liberals: { s: 6 } } } },
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
      if (b === 'Друг Берлина и Рима') return 'Берлин называет вас союзником. Это самая опасная дружба на континенте.';
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
        ? `Вас свергли. Но благодаря швейцарскому счёту вы живёте на вилле в ${ex}, пишете мемуары «Я был ${T}ом» и раз в неделю грозите новой хунте по телефону.`
        : `Вас свергли. Денег на счёте не хватило даже на приличную виллу. Теперь вы водите такси в ${ex} и рассказываете пассажирам, что когда-то были ${T}ом. Они не верят.` },
      exile: { title: 'Бегство с казной', text: `Вы улетели за час до того, как танки вошли во дворец. Новая власть требует вашей выдачи, но ${ex} не выдаёт тех, кто платит налоги наличными.` },
      revolution: { title: 'Сметён революцией', text: `Революционный трибунал рассмотрел ваше дело и приговорил вас... к работе в сельской библиотеке. Каждый день вы выдаёте читателям книги о тиранах. Иногда — о себе.` },
      helicopter: { title: 'Вертолёт с крыши', text: rich
        ? `Вертолёт доставил вас на борт яхты. Через неделю вы уже в ${ex}, где пьёте коктейли с другими бывшими диктаторами. Вас тут целый клуб.`
        : `Вертолёт долетел до границы, и топливо кончилось. Вы пересекли её пешком, в пижаме и с медалями. Соседи дали вам убежище и маленькую квартиру.` },
      retired: { title: 'Ушёл на покой', text: `Вы добровольно передали власть «временному совету» и уехали в ${ex}. Историки до сих пор спорят, был ли это жест мудрости или хорошо рассчитанный побег.` },
      survived: S.era === '1930' ? { title: 'Пережил тридцатые', text: `31 декабря 1939 года. Европа в огне, Китай в огне, мир снова воюет, а вы всё ещё ${T}. Вы пережили Депрессию, «рубашки», путчи и Лигу Наций. ${Game.epilogue30()} Впереди сороковые, и они будут куда страшнее.` } : { title: 'Пережил шестидесятые', text: `31 декабря 1969 года. Вы стоите на балконе дворца, а внизу салют. Десятилетие переворотов, ракетных кризисов и революций позади — а вы всё ещё ${T}. Впереди семидесятые. Говорят, там нефть подорожает.` },
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
    const score = Math.round(S.turn * 10 + S.swiss * 1.5 + S.support * 2 + S.economy * 2 + (type === 'survived' ? 300 : type === 'retired' ? 120 : 0));
    S.final = { type, ...E, years, verdicts, score };
    Game.save();
    return S.final;
  },
};
