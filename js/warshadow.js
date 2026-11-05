// Тень войны (1930-е): угроза растёт с каждым годом и историческим кризисом; к концу 1939 года придётся отвечать за подготовку.
const WAR_DANGER = { europe30: 1, asia30: 0.85, latam30: 0.3 };
const WAR_STAGES = [[25, 'Мирное небо', 'ok'], [50, 'Тучи сгущаются', 'low'], [75, 'Гроза близко', 'mid'], [90, 'Война на пороге', 'high'], [101, 'Война', 'crit']];
const WAR_SUPPLIERS = { europe30: ['france', 'uk', 'germany', 'ussr', 'italy'], asia30: ['uk', 'france', 'japan', 'usa'], latam30: ['usa', 'uk', 'germany', 'italy'] };
const CAMP = { allies: { name: 'Лондон и Париж', cs: ['uk', 'france'] }, germany: { name: 'Берлин', cs: ['germany', 'italy'] }, ussr: { name: 'Москва', cs: ['ussr'] }, japan: { name: 'Токио', cs: ['japan'] }, usa: { name: 'Вашингтон', cs: ['usa'] } };

Object.assign(Game, {
  war() { if (!S.war) S.war = { level: 6, prep: 8, guarantor: null }; return S.war; },
  warDanger() { return WAR_DANGER[S.region] || 0.5; },
  warStage() { const v = Game.war().level; return WAR_STAGES.find(([t]) => v < t); },
  campsAvailable() { return Object.entries(CAMP).filter(([, c]) => c.cs.some(x => S.rel[x] !== undefined)).map(([k]) => k); },
  campRel(k) { const v = CAMP[k].cs.filter(c => S.rel[c] !== undefined).map(c => S.rel[c]); return v.length ? Math.max(...v) : 0; },
  warReadiness() { const W = Game.war(); return clamp(W.prep * 0.7 + S.army * 0.3); },
  warActions() {
    const W = Game.war();
    const d = k => Game.dealInfo('war:' + k);
    const acts = [
      { id: 'fort', name: 'Строить линию укреплений', desc: 'Бетон, колючая проволока и названия вроде «Линия Отца Нации».', cost: '−20 млн', ok: S.treasury >= 20, fx: { treasury: -20, warPrep: Math.round(12 * d('fort').mult), fac: { hawks: { a: 4 } } } },
      { id: 'stock', name: 'Стратегические запасы', desc: 'Зерно, бензин и патроны на складах. Спокойнее народу и генералам.', cost: '−10 млн', ok: S.treasury >= 10, fx: { treasury: -10, warPrep: Math.round(6 * d('stock').mult), support: 1 } },
      { id: 'mobilize', name: 'Мобилизация резервистов', desc: 'Армия растёт, экономика стонет: мужчины ушли с полей и фабрик.', cost: '1 приказ', ok: true, fx: { army: 6, economy: -4, support: -3, warPrep: Math.round(10 * d('mobilize').mult) } },
      { id: 'gold', name: 'Вывезти золотой запас за океан', desc: 'Если страну займут, золото не достанется оккупантам. И немного — вам.', cost: '−20 млн', ok: S.treasury >= 20 && !S.flags.goldAbroad, fx: { treasury: -20, swiss: 8, flag: { goldAbroad: true } } },
    ];
    for (const c of (WAR_SUPPLIERS[S.region] || []).filter(x => S.rel[x] !== undefined)) {
      const opp = Game.oppBloc(c);
      const fx = { treasury: -18, army: 4, warPrep: Math.round(10 * d('arms').mult), rel: { [c]: 6 } }; if (opp) fx.rel[opp] = -3;
      acts.push({ id: 'arms:' + c, name: `Закупить вооружение: ${COUNTRIES[c].name}`, desc: 'Пушки, самолёты и инструкторы. Поставщик станет ближе, его противники — дальше.', cost: '−18 млн', ok: S.treasury >= 18 && S.rel[c] >= 35, fx });
    }
    for (const k of Game.campsAvailable()) {
      if (W.guarantor === k) continue;
      const rel = {}; for (const c of CAMP[k].cs) if (S.rel[c] !== undefined) rel[c] = 8;
      for (const o of Game.campsAvailable()) if (o !== k) for (const c of CAMP[o].cs) if (S.rel[c] !== undefined && rel[c] === undefined) rel[c] = -6;
      acts.push({ id: 'guarantor:' + k, name: `Искать гарантий: ${CAMP[k].name}`, desc: `Тайные переговоры о защите. Гарант поможет устоять перед ультиматумом, если отношения с ним будут ≥ 60.${W.guarantor ? ' Прежний гарант обидится.' : ''}`, cost: 'отношения ≥ 50', ok: Game.campRel(k) >= 50, fx: { rel, warGuarantor: k } });
    }
    return acts;
  },
  warAction(id) {
    const a = Game.warActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const kind = id.split(':')[0];
    if (['fort', 'stock', 'mobilize'].includes(kind)) Game.noteDeal('war:' + kind);
    if (kind === 'arms') Game.noteDeal('war:arms');
    const changes = Game.apply(a.fx);
    const text = `${a.name}. ${a.desc}`;
    Game.log(text);
    return { text, changes };
  },
  aggressor() {
    const W = Game.war();
    if (S.region === 'asia30') return 'japan';
    if (S.region !== 'europe30') return null;
    if (W.guarantor === 'germany') return 'ussr';
    if (W.guarantor === 'ussr') return 'germany';
    return (S.rel.germany || 0) <= (S.rel.ussr || 0) ? 'germany' : 'ussr';
  },
  ultimatumChance() {
    const W = Game.war(), ag = Game.aggressor();
    const g = W.guarantor && !CAMP[W.guarantor].cs.includes(ag) && Game.campRel(W.guarantor) >= 60 ? 0.25 : 0;
    return clamp(0.1 + Game.warReadiness() / 150 + g - W.level / 500, 0.05, 0.85);
  },
  ultimatumScene() {
    const ag = Game.aggressor(), C = COUNTRIES[ag];
    const p = Game.ultimatumChance();
    const demand = ag === 'ussr' ? 'разместить у вас военные базы и «ограниченный контингент» для «взаимопомощи»' : ag === 'japan' ? 'передать аэродромы и порты японской армии для «защиты Азии»' : 'передать спорные провинции и подписать договор о «защите»';
    return {
      title: 'Ультиматум', bg: 'night', crisis: true,
      lines: [
        ['narrator', `Ноябрь 1939 года. Посол страны ${C.name} входит без стука и кладёт на стол бумагу. Срок ответа — сорок восемь часов.`],
        ['npc:' + (ag === 'ussr' ? 'ussr_amb' : ag + '_amb'), `Мое правительство требует ${demand}. Это не просьба.`],
        ['defense', `Готовность армии и укреплений — ${Math.round(Game.warReadiness())} из 100. Я буду честен, ${Game.fmt('{addr}')}: ${p > 0.5 ? 'мы можем выстоять.' : p > 0.3 ? 'шансы есть, но небольшие.' : 'нас сомнут.'}`],
        ['foreign', Game.war().guarantor ? `Наш гарант — ${CAMP[Game.war().guarantor].name}. ${Game.campRel(Game.war().guarantor) >= 60 ? 'Они обещали помочь.' : 'Но отношения с ними сейчас прохладные.'}` : 'Гарантов у нас нет. Мы одни.'],
      ],
      choices: [
        { text: 'Принять ультиматум', fx: { support: -10, fear: 5, rel: { [ag]: 20 }, flag: { puppet: ag } }, res: `Войска страны ${C.name} входят в страну «по приглашению». Вы остаётесь во дворце. В соседнем кабинете теперь сидит «советник», без подписи которого не выходит ни один указ.` },
        { text: 'Отвергнуть и защищаться', adv: ['defense'], chance: () => p,
          win: { fx: { support: 15, army: -10, economy: -6, flag: { heldLine: true } }, res: 'Армия выстояла на границе. Агрессор отступил, сославшись на «недоразумение». Ваше имя знает вся Европа.' },
          lose: { fx: { end: 'occupied' }, res: 'Оборона рухнула за три недели. Правительство успело эвакуироваться в Лондон на последнем самолёте.' } },
        { text: 'Бежать с золотым запасом', fx: { end: 'exile' }, res: 'Самолёт с золотым запасом взлетает с аэродрома. Внизу горят архивы.' },
      ],
      after: (out, choice) => {
        const b = choice.chance ? (out.won ? choice.win : choice.lose) : choice;
        if (b.fx && b.fx.end === 'exile') { S.swiss += Math.max(0, S.treasury * 0.5) + (S.flags.goldAbroad ? 20 : 0); return 'exile'; }
        if (b.fx && b.fx.end) return b.fx.end;
        return null;
      },
    };
  },
});

Game.applyHooks.push((fx, ch) => {
  if (S.era !== '1930') return;
  const W = Game.war();
  if (fx.war) { const d = fx.war * Game.warDanger(); W.level = clamp(W.level + d); ch.push({ k: 'fs', d: Math.round(d), label: 'Угроза войны', icon: '☁️' }); }
  if (fx.warPrep) { W.prep = clamp(W.prep + fx.warPrep); ch.push({ k: 'prep', d: fx.warPrep, label: 'Подготовка к войне', icon: '🛡️' }); }
  if (fx.warGuarantor) W.guarantor = fx.warGuarantor;
});
Game.previewHooks.push((fx, out) => {
  if (fx.warPrep) out.push({ icon: '🛡️', d: fx.warPrep, label: 'Подготовка к войне', text: `подготовка +${fx.warPrep}` });
  if (fx.warGuarantor) out.push({ icon: '🤝', d: 1, label: 'Гарант', text: `гарант: ${CAMP[fx.warGuarantor].name}` });
  if (fx.war && S.era === '1930') out.push({ icon: '☁️', d: -fx.war, label: 'Угроза войны', text: `угроза +${Math.round(fx.war * Game.warDanger())}` });
});
Game.quarterHooks.push(rep => {
  if (S.era !== '1930') return;
  const W = Game.war(), dz = Game.warDanger();
  W.level = clamp(W.level + (0.4 + S.turn * 0.02) * dz);
  W.prep = clamp(W.prep - 0.8);
  if (W.level > 50 && dz > 0.5) { S.fear = clamp(S.fear + 0.4); S.fac.hawks.s = clamp(S.fac.hawks.s + 0.4); S.economy = clamp(S.economy - W.level / 250); }
  if (S.region === 'latam30' && W.level > 50) S.economy = clamp(S.economy + W.level / 300);
  const st = Game.warStage();
  if (st[0] >= 75 && dz > 0.5 && Game.warReadiness() < 35) rep.warn.push(`${st[1]}: армия и укрепления не готовы. Генерал пьёт валерьянку.`);
});
// Ультиматум в IV квартале 1939 года (Европа и Азия)
Game.forcedList.push(() => {
  if (S.era !== '1930' || !['europe30', 'asia30'].includes(S.region) || S.year !== 1939 || S.q !== 4 || S.flags.ultimatum) return null;
  S.flags.ultimatum = true;
  return Game.ultimatumScene();
});
Game.endingHooks.push((type, E, verdicts) => {
  if (S.era !== '1930') return;
  if (type === 'survived' && S.flags.puppet) { E.title = 'Под чужим протекторатом'; E.text = `31 декабря 1939 года. Формально вы всё ещё ${S.leader.title}. Фактически каждое утро вам приносят на подпись указы из посольства страны ${COUNTRIES[S.flags.puppet].name}. Говорят, это и называется «реализм».`; verdicts.push('Сохранил кресло, но не страну'); }
  if (S.flags.heldLine) { verdicts.push('Не сдал ни пяди'); S.flags.scoreBonus = 200; }
  if (type === 'occupied') { verdicts.push('Символ сопротивления'); S.flags.scoreBonus = 150; }
  if (type === 'occupied' && S.flags.goldAbroad) E.text += ' Золотой запас благополучно ждёт освобождения в подвалах заокеанского банка.';
});

// Германский флаг меняется после 1933 года (исторически: с сентября 1935-го единственный государственный)
FLAGS.germanyW = `<rect width="30" height="6.7" fill="#000"/><rect y="6.7" width="30" height="6.7" fill="#dd0000"/><rect y="13.3" width="30" height="6.7" fill="#ffce00"/>`;
FLAGS.germany33 = `<rect width="30" height="20" fill="#d00"/><circle cx="15" cy="10" r="6" fill="#fff"/><g transform="rotate(45 15 10)" stroke="#000" stroke-width="1.5" fill="none" stroke-linecap="square"><path d="M15 6.2 V13.8 M11.2 10 H18.8"/><path d="M15 6.2 H18.1 M18.8 10 V13.1 M15 13.8 H11.9 M11.2 10 V6.9"/></g>`;
const _flagSvg = flagSvg;
// eslint-disable-next-line no-global-assign
flagSvg = function (key, custom) {
  if (key === 'germany' && S && S.era === '1930') { const t = S.year + (S.q - 1) / 4; key = t < 1933.25 ? 'germanyW' : t < 1935.75 ? 'germany' : 'germany33'; }
  return _flagSvg(key, custom);
};

Object.assign(UI, {
  tab_war() {
    const W = Game.war(), st = Game.warStage(), rd = Game.warReadiness();
    const reg = { europe30: 'Ваша страна — на пути у двух хищников. Опасность максимальная.', asia30: 'Япония строит «новый порядок» прямо у ваших границ.', latam30: 'Война далеко. Для вас это скорее рынок: заказы, цены и шпионы.' }[S.region];
    const acts = Game.warActions();
    return `<p class="lede">${reg} Угроза растёт каждый квартал и скачками — с каждым кризисом в газетах. ${S.region !== 'latam30' ? 'В IV квартале 1939 года придёт ультиматум: устоять помогут подготовка, армия и гарант с отношениями от 60.' : ''}</p>
      <div class="cw">
        <section class="card"><div class="eyebrow">Угроза войны</div>
          <div class="risk ${st[2]} big-risk"><span>${st[1]}</span><b>${Math.round(W.level)} / 100</b></div>
          <div class="bar war-bar"><span style="width:${W.level}%"></span></div>
          <p class="muted small">Опасность региона: ${Math.round(Game.warDanger() * 100)}%. Кризисы (Маньчжурия, Рейнская область, Испания, Мюнхен) подталкивают шкалу.</p>
        </section>
        <section class="card"><div class="eyebrow">Готовность</div>
          ${UI.meter('Подготовка', W.prep, W.prep < 30 ? 'bad' : W.prep < 55 ? 'warn' : 'good')}
          ${UI.meter('Армия', S.army, S.army < 45 ? 'bad' : S.army < 65 ? 'warn' : 'good')}
          ${UI.meter('Итого', rd, rd < 35 ? 'bad' : rd < 55 ? 'warn' : 'good')}
          <p class="muted small">Гарант: <b>${W.guarantor ? CAMP[W.guarantor].name + ` (отношения ${Math.round(Game.campRel(W.guarantor))})` : 'нет'}</b>. ${S.region !== 'latam30' ? `Вероятный агрессор: <b>${COUNTRIES[Game.aggressor()].name}</b>. Шанс устоять сейчас ≈ ${Math.round(Game.ultimatumChance() * 100)}%.` : ''} Подготовка ржавеет: −0,8 в квартал.</p>
        </section>
      </div>
      <div class="proj dec-grid">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p><div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx))}</div></div></div>${UI.actBtn('war:' + a.id, { name: 'Приказать', cost: a.cost, ok: a.ok })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('war:')) return false;
  const out = Game.warAction(id.slice(4));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});

// Исторические кризисы толкают шкалу угрозы
const WAR_NEWS = [[1931, 4, 6], [1933, 1, 8], [1935, 4, 5], [1936, 1, 6], [1936, 3, 6], [1936, 4, 5], [1937, 3, 8], [1938, 1, 8], [1938, 3, 10], [1939, 3, 12]];
for (const [y, q, n] of WAR_NEWS) {
  const h = HISTORY_30.find(x => x.at[0] === y && x.at[1] === q && !x.regions);
  if (!h) continue;
  const orig = h.fx;
  h.fx = S2 => ({ ...(typeof orig === 'function' ? orig(S2) : (orig || {})), war: n * (S2.region === 'asia30' && y === 1937 ? 1.6 : 1) });
}
const sept1 = HISTORY_30.find(x => x.head.startsWith('1 сентября'));
if (sept1) { const o = sept1.fx; sept1.fx = S2 => ({ ...(typeof o === 'function' ? o(S2) : (o || {})), war: 30 }); }
