// Дипломатия: договоры, требования стран, визиты с перерывом и риском конфуза.
const BIG_POWERS = ['usa', 'ussr', 'russia', 'china', 'uk', 'france', 'germany', 'italy', 'japan', 'eu'];
const REL_LEVELS = [[20, 'враждебные'], [40, 'холодные'], [60, 'нейтральные'], [75, 'дружеские'], [101, 'союзнические']];
const GAFFES = [
  'На банкете вы подняли тост за чужой флаг. Хозяева сделали вид, что не заметили. Заметили все.',
  'Переводчик перепутал «дружбу» и «дружину». Пресс-конференция прошла в напряжённой атмосфере.',
  'Вы подарили хозяину чучело крокодила. Оказалось, крокодил — их национальный символ. Живой.',
  'Министр обороны уснул на переговорах и громко храпел во время гимна.',
  'Вы назвали премьера именем его предшественника. Дважды.',
];

const DEMANDS = [
  // Запад
  { id: 'ban_left', blocs: ['west'], text: () => `Запретить движение «${REGIONS[S.region].factions.left.name}»`, cond: () => S.fac.left.st !== 'banned',
    fx: c => ({ fear: 4, rel: { [c]: 14, $east: -6 }, fac: { left: { s: -12, a: -25 } }, facStatus: { left: 'banned' } }) },
  { id: 'company', blocs: ['west'], text: () => 'Защитить наши компании от рабочих и налоговой', fx: c => ({ rel: { [c]: 12 }, support: -2, fac: { left: { a: -6 }, oligarchs: { a: 4 } } }) },
  { id: 'tariffs', blocs: ['west', 'axis'], text: () => 'Снизить пошлины на наши товары', fx: c => ({ treasury: -6, economy: -1, rel: { [c]: 12 }, fac: { oligarchs: { a: -4 } } }) },
  { id: 'hr', blocs: ['west'], eras: ['2000', '1960'], text: () => 'Освободить политзаключённых', fx: c => ({ fear: -6, rel: { [c]: 14 }, fac: { liberals: { a: 8 }, left: { s: 3 } } }) },
  // Восток
  { id: 'comrades', blocs: ['east'], eras: ['1930', '1960'], text: () => 'Освободить арестованных товарищей-коммунистов', fx: c => ({ fear: -5, rel: { [c]: 12 }, fac: { left: { s: 4, a: 6 } } }) },
  { id: 'tractors', blocs: ['east'], text: () => 'Закупить нашу технику', fx: c => ({ treasury: -10, economy: 1, rel: { [c]: 12 } }) },
  { id: 'customs_union', countries: ['russia'], text: () => 'Вступить в наш таможенный союз', fx: c => ({ economy: 2, rel: { russia: 15, eu: -8, usa: -5 } }) },
  { id: 'one_china', countries: ['china'], eras: ['2000'], text: () => 'Поддержать политику «одного Китая» и не принимать неудобных гостей', fx: c => ({ rel: { china: 10, usa: -2 }, fac: { liberals: { a: -2 } } }) },
  // «Ось» 1930-х
  { id: 'ban_press', blocs: ['axis'], text: () => 'Закрыть антифашистские газеты', fx: c => ({ fear: 3, rel: { [c]: 12, france: -4, uk: -4 }, fac: { liberals: { a: -10 } } }) },
  { id: 'raw', blocs: ['axis', 'east'], text: () => `Продать нам ${REGIONS[S.region].exports} со скидкой`, fx: c => ({ treasury: -10, rel: { [c]: 12 } }) },
  { id: 'passage', countries: ['japan'], regions: ['asia30'], text: () => 'Разрешить проход японских войск', fx: c => ({ support: -5, rel: { japan: 15, uk: -10, roc: -10 }, war: 5 }) },
  // Нейтралы и все остальные
  { id: 'resolution', blocs: ['neutral'], text: () => 'Поддержать нашу резолюцию', fx: c => ({ rel: { [c]: 10 }, support: 1 }) },
  { id: 'buy', blocs: ['neutral', 'west'], text: () => 'Купить нашу продукцию', fx: c => ({ treasury: -8, economy: 1, rel: { [c]: 10 } }) },
  { id: 'culture', blocs: ['neutral', 'west', 'east'], text: () => 'Открыть у вас наш культурный центр', fx: c => ({ rel: { [c]: 8 }, fac: { faith: { a: -2 }, liberals: { a: 2 } } }) },
  { id: 'vote', blocs: ['west', 'east', 'axis'], text: () => S.era === '1930' ? 'Голосовать с нами в Лиге Наций' : 'Голосовать с нами в ООН', fx: c => ({ rel: { [c]: 10, [Game.blocOf(c) === 'west' ? (S.era === '1930' ? '$axis' : '$east') : '$west']: -5 } }) },
  { id: 'invite', blocs: ['west', 'east', 'axis', 'neutral'], text: c => `Пригласить ${Game.leaderAt(c)} с визитом`, fx: c => ({ treasury: -6, support: 1, rel: { [c]: 10 } }) },
];

Object.assign(Game, {
  relLevel(v) { return REL_LEVELS.find(([t]) => v < t)[1]; },
  treaties(c) { S.treaties = S.treaties || {}; return (S.treaties[c] = S.treaties[c] || {}); },
  oppBloc(c) {
    const bl = Game.blocOf(c);
    if (S.era === '1930') return bl === 'west' ? '$axis' : bl === 'axis' ? '$west' : bl === 'east' ? '$axis' : null;
    return bl === 'west' ? '$east' : bl === 'east' ? '$west' : null;
  },
  pickDemand(c) {
    const bl = Game.blocOf(c);
    const list = DEMANDS.filter(d => (d.countries ? d.countries.includes(c) : d.blocs.includes(bl)) && (!d.eras || d.eras.includes(S.era)) && (!d.regions || d.regions.includes(S.region)) && (!d.cond || d.cond()));
    const special = list.filter(d => d.countries);
    const d = special.length && Math.random() < 0.6 ? pick(special) : pick(list);
    return d ? { id: d.id, until: S.turn + 4 + Math.floor(Math.random() * 6) } : null;
  },
  demandOf(c) {
    S.demands = S.demands || {};
    const dm = S.demands[c];
    if (!dm || dm.wait) return null;
    const d = DEMANDS.find(x => x.id === dm.id);
    if (!d || (d.cond && !d.cond())) return null;
    return { ...d, until: dm.until, label: d.text(c), fxv: d.fx(c) };
  },
  fulfillDemand(c) {
    const d = Game.demandOf(c);
    if (!d || !Game.spend()) return null;
    const changes = Game.apply(d.fxv);
    S.demands[c] = { wait: S.turn + 3 };
    const text = `${COUNTRIES[c].name}: просьба «${d.label}» выполнена. В посольстве открыли шампанское.`;
    Game.log(text);
    return { text, changes };
  },
  visitChance(c) {
    const F = S.adv.foreign;
    return clamp(0.3 + F.loy / 400 + (F.comp - 1) * 0.3 + (S.rel[c] || 0) / 250, 0.15, 0.9);
  },
  visitReady(c) { S.visits = S.visits || {}; return S.visits[c] === undefined || S.turn - S.visits[c] >= 4; },
  countryActions(c) {
    const T = Game.treaties(c), r = S.rel[c] || 0;
    const big = BIG_POWERS.includes(c);
    const acts = [];
    const vr = Game.visitReady(c);
    acts.push({ id: 'visit', name: 'Государственный визит', cost: vr ? `−5 млн · успех ${Math.round(Game.visitChance(c) * 100)}%` : `следующий через ${4 - (S.turn - S.visits[c])} кв.`, ok: vr && S.treasury >= 5 });
    if (!T.trade) acts.push({ id: 'trade', name: 'Переговоры о торговом договоре', cost: 'отношения ≥ 35', ok: r >= 35 });
    else if (!T.friend) acts.push({ id: 'friend', name: 'Договор о дружбе', cost: 'отношения ≥ 60', ok: r >= 60 });
    else if (big && !T.alliance) acts.push({ id: 'alliance', name: 'Военный союз', cost: 'отношения ≥ 75', ok: r >= 75 });
    acts.push({ id: 'aid', name: 'Просить помощи', cost: `шанс ${Math.round(Game.aidChance(c) * 100)}%`, ok: true });
    if (big) acts.push({ id: 'arms', name: 'Купить оружие', cost: '−20 млн', ok: S.treasury >= 20 && r >= 35 });
    if (T.trade || T.friend || T.alliance) acts.push({ id: 'break', name: 'Разорвать договоры', cost: 'отношения −20', ok: true, danger: true });
    acts.push({ id: 'denounce', name: 'Выслать посла', cost: '', ok: true, danger: true });
    return acts;
  },
  countryAction(c, act) {
    const C = COUNTRIES[c], T = Game.treaties(c), opp = Game.oppBloc(c);
    if (act === 'trade') return null; // договор подписывается через сцену переговоров
    if (!Game.spend()) return null;
    let fx = {}, text = '';
    switch (act) {
      case 'visit': {
        S.visits = S.visits || {}; S.visits[c] = S.turn;
        if (Math.random() < Game.visitChance(c)) {
          fx = { treasury: -5, support: 1, rel: { [c]: 8 } };
          text = `Государственный визит: ${C.name}. ${Game.leaderAt(c)[0].toUpperCase() + Game.leaderAt(c).slice(1)} принял вас тепло. Обменялись подарками, договорились «углублять сотрудничество».`;
        } else { fx = { treasury: -5, rel: { [c]: -3 } }; text = `Визит в страну ${C.name} не задался. ${pick(GAFFES)}`; }
        break;
      }
      case 'friend':
        T.friend = { since: S.turn };
        fx = { rel: { [c]: 10 } }; if (opp) fx.rel[opp] = -4;
        text = `Подписан Договор о дружбе со страной ${C.name}. Отношения теперь не будут остывать, даже если вы долго не звоните.`; break;
      case 'alliance':
        T.alliance = { since: S.turn };
        fx = { rel: { [c]: 10 }, fac: { hawks: { a: 5 } } }; if (opp) fx.rel[opp] = -15;
        text = `Военный союз со страной ${C.name}! Генералы обмениваются орденами. Противоположный лагерь внёс вас в свои карты красным карандашом.`; break;
      case 'break':
        S.treaties[c] = {};
        fx = { rel: { [c]: -20 }, support: 2 };
        text = `Все договоры со страной ${C.name} разорваны. Толпа у посольства ликует, экономисты хватаются за головы.`; break;
      case 'aid': {
        const p = Game.aidChance(c);
        const da = Game.dealInfo('aid:' + c);
        Game.noteDeal('aid:' + c);
        if (Math.random() < p) {
          const amt = Math.round((['usa', 'ussr', 'russia'].includes(c) ? 30 : BIG_POWERS.includes(c) ? 20 : 12) * (da.n ? 0.6 : 1) * (T.alliance ? 1.3 : 1));
          fx = { treasury: amt, rel: { [c]: -4 } };
          text = `${C.name} выделили помощь: ${amt} млн. С намёком, что это не в последний раз. И не бесплатно.`;
        } else { fx = { rel: { [c]: -6 } }; text = `${C.name} вежливо отказали. Министр иностранных дел написал об этом печальный сонет.`; }
        break;
      }
      case 'arms':
        fx = { treasury: -20, army: 8, rel: { [c]: 4 }, fac: { hawks: { a: 5 } } };
        text = `Закуплено оружие у страны ${C.name}. Генерал лично опробовал каждый пулемёт. В воздух.`; break;
      case 'denounce':
        S.treaties[c] = {};
        fx = { support: 3, rel: { [c]: -18 } }; if (opp) fx.rel[opp] = 6;
        text = `Посол страны ${C.name} объявлен персоной нон грата. Митинг у посольства собрал тысячи людей и одного продавца мороженого.`; break;
    }
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  tradeScene(c) {
    const C = COUNTRIES[c], r = S.rel[c] || 0, comp = S.adv.foreign.comp;
    const opp = Game.oppBloc(c);
    const deal = (income, rel) => { const fx = { ap: -1, treaty: { c, type: 'trade', income }, rel: { [c]: rel } }; if (opp) fx.rel[opp] = -3; return fx; };
    return {
      title: `Переговоры: ${C.name}`, bg: 'office',
      lines: [
        ['foreign', `Делегация из страны ${C.name} готова подписать торговый договор. Вопрос в условиях. Я, разумеется, предлагаю торговаться. Красиво. В рифму.`],
        ['economy', 'Хороший договор — это деньги каждый квартал. Плохой — тоже деньги, только их.'],
      ],
      choices: [
        { text: 'Жёсткие условия: доход +4 млн в квартал', adv: ['economy'], chance: () => r / 130 + comp * 0.12, win: { fx: deal(4, 2), res: 'Делегация поморщилась, но подписала. Каждый квартал казна будет получать на четыре миллиона больше.' }, lose: { fx: { ap: -1, rel: { [c]: -6 } }, res: 'Делегация встала из-за стола и уехала. Министр иностранных дел вслед прочитал ей сонет. Не помогло.' } },
        { text: 'Взаимовыгодные условия: доход +2,5 млн в квартал', adv: ['foreign'], chance: () => r / 100 + 0.25, win: { fx: deal(2.5, 6), res: 'Договор подписан. Обе стороны называют его «историческим». Так называют все договоры.' }, lose: { fx: { ap: -1, rel: { [c]: -2 } }, res: 'Стороны не сошлись в мелочах. Например, на каком языке писать слово «мелочи».' } },
        { text: 'Уступчивые условия: доход +1 млн в квартал, их компании довольны', fx: { ...deal(1, 10), fac: { oligarchs: { a: -5 } } }, res: 'Договор подписан мгновенно. Их компании получили льготы, ваши купцы — головную боль.' },
        { text: 'Отложить переговоры', fx: {}, res: 'Делегация уехала, оставив визитки. Приказ не потрачен.' },
      ],
    };
  },
  treatyIncome() {
    let v = 0;
    for (const T of Object.values(S.treaties || {})) if (T.trade) v += T.trade.income;
    return v ? { label: 'Торговые договоры', v } : null;
  },
});

// Хуки движка
Game.applyHooks.push((fx, ch) => {
  if (fx.ap) S.ap = Math.max(0, S.ap + fx.ap);
  if (fx.treaty) { const T = Game.treaties(fx.treaty.c); T[fx.treaty.type] = { since: S.turn, income: fx.treaty.income }; ch.push({ k: 'fs', d: 0, label: `Договор: ${COUNTRIES[fx.treaty.c].name}`, icon: '📜' }); }
  if (fx.facStatus) for (const [f, st] of Object.entries(fx.facStatus)) S.fac[f].st = st;
});
Game.previewHooks.push((fx, out) => {
  if (fx.treaty) out.push({ icon: '📜', d: fx.treaty.income, label: 'Торговый договор', text: `договор: +${fx.treaty.income} млн/кв.` });
  if (fx.facStatus) for (const f of Object.keys(fx.facStatus)) out.push({ icon: '⛔', d: -1, label: 'Запрет движения', text: `запрет: ${REGIONS[S.region].factions[f].short}` });
});
Game.incomeHooks.push(() => Game.treatyIncome());
Game.coupHooks.push(() => {
  let r = 0;
  for (const [c, T] of Object.entries(S.treaties || {})) if (T.alliance && (S.rel[c] || 0) >= 60) r -= 0.04;
  return Math.max(r, -0.08);
});
Game.newGameHooks.push(() => {
  S.treaties = {}; S.demands = {}; S.visits = {};
  for (const c of REGIONS[S.region].countries) { const d = Game.pickDemand(c); if (d) S.demands[c] = d; }
});
Game.quarterHooks.push(rep => {
  S.demands = S.demands || {};
  for (const c of REGIONS[S.region].countries) {
    const T = (S.treaties || {})[c] || {};
    if (T.alliance) S.rel[c] = clamp(S.rel[c] + 0.7); else if (T.friend) S.rel[c] = clamp(S.rel[c] + 0.4);
    const dm = S.demands[c];
    if (!dm) { const d = Game.pickDemand(c); if (d) S.demands[c] = d; continue; }
    if (dm.wait !== undefined) { if (S.turn + 1 >= dm.wait) { const d = Game.pickDemand(c); if (d) S.demands[c] = d; } continue; }
    if (S.turn + 1 > dm.until) {
      S.rel[c] = clamp(S.rel[c] - 4);
      rep.lines.push(`${COUNTRIES[c].name}: просьба так и не выполнена, в посольстве недовольны (отношения −4).`);
      S.demands[c] = { wait: S.turn + 2 };
    }
  }
});

// Интерфейс вкладки «Мир»
Object.assign(UI, {
  tab_world() {
    const R = REGIONS[S.region];
    const blocName = S.era === '1930' ? { west: 'демократии', east: 'Коминтерн', axis: 'Ось', neutral: 'нейтралы' } : { west: 'Запад', east: 'Восток', neutral: 'нейтралы' };
    const tchip = { trade: '📜 Торговый договор', friend: '🤝 Дружба', alliance: '⚔️ Военный союз' };
    const B = Game.budgetCalc();
    const ti = Game.treatyIncome();
    return `<p class="lede">Ваш курс: <b>${Game.bloc()}</b>. ${ti ? `Торговые договоры приносят <b>${ti.v.toFixed(1)} млн</b> в квартал.` : 'Торговых договоров пока нет.'} У каждой страны есть просьба: выполните её до срока, иначе обидятся. Договор о дружбе не даёт отношениям остывать, военный союз защищает от переворота.</p>
      <div class="grid">${R.countries.map(c => {
        const C = COUNTRIES[c], v = S.rel[c], T = Game.treaties(c), dm = Game.demandOf(c), bl = Game.blocOf(c);
        return `<article class="card country">
          <header>${flagSvg(c)}<div><h3>${C.name}</h3><span class="muted small">${Game.leaderAt(c)}</span></div><span class="chip ${bl}">${blocName[bl]}</span></header>
          ${UI.meter('Отношения', v, v < 25 ? 'bad' : v < 50 ? 'warn' : 'good')}
          <div class="rel-line"><span class="muted small">Отношения ${Game.relLevel(v)}</span>${Object.keys(tchip).filter(k => T[k]).map(k => `<span class="chip treaty">${tchip[k]}${k === 'trade' ? ` +${T.trade.income}` : ''}</span>`).join('')}</div>
          ${dm ? `<div class="demand"><div class="demand-h"><span class="dec-tag">Просьба · ещё ${Math.max(0, dm.until - S.turn)} кв.</span><b>${esc(dm.label)}</b></div><div class="dec-row">${UI.fxChips(Game.previewFx(dm.fxv))}</div>${UI.actBtn('dem:' + c, { name: 'Выполнить', cost: '1 приказ', ok: true })}</div>` : ''}
          <div class="acts">${Game.countryActions(c).map(a => UI.actBtn(`world:${c}:${a.id}`, a)).join('')}</div>
        </article>`;
      }).join('')}</div>`;
  },
  async negotiate(c) {
    if (S.ap <= 0 || S.phase !== 'hub') return;
    await VN.play(Game.tradeScene(c));
    UI.render();
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  const [kind, a, b] = id.split(':');
  if (kind === 'world' && b === 'trade') { UI.negotiate(a); return true; }
  if (kind === 'dem') { const out = Game.fulfillDemand(a); if (out) { UI.render(); UI.toast(out.text, out.changes); } return true; }
  return false;
});
