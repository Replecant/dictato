// Интерфейс: экраны, визуальная новелла, вкладки управления.
const $ = (sel, el = document) => el.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sign = d => (d > 0 ? '+' : d < 0 ? '−' : '') + Math.abs(Math.round(d));

const UI = {
  tab: 'cabinet',
  setup: null,

  show(id) {
    for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
    window.scrollTo(0, 0);
  },

  // ---------- титульный экран ----------
  title() {
    UI.show('screen-title');
    $('#btn-continue').hidden = !Game.hasSave();
    const looks = [REGIONS.latam.advisors.defense.look, REGIONS.africa.advisors.propaganda.look, REGIONS.asia.advisors.police.look];
    $('#title-portraits').innerHTML = looks.map((l, i) => `<div class="tp tp${i}">${Portrait.svg(l)}</div>`).join('');
  },

  // ---------- настройка ----------
  startSetup() {
    UI.setup = { region: 'latam', regime: 'junta', name: 'Хосе Мария Альварадо', title: 'Генералиссимус', country: REGIONS.latam.country,
      look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#1a1410', hat: 'cap', hatColor: '#4b5320', mustache: 'thick', brows: 'bushy', mouth: 'smile', glasses: 'none', outfit: 'military', outfitColor: '#4b5320', medals: 10, sash: '#c1272d' } };
    UI.show('screen-setup');
    UI.renderSetup();
  },
  renderSetup() {
    const st = UI.setup;
    const defaults = { latam: 'Хосе Мария Альварадо', asia: 'Пхра Сомсак Ратанавонг', africa: 'Жозеф Мбеки-Нгуема' };
    $('#setup-regions').innerHTML = Object.entries(REGIONS).map(([k, r]) => `
      <button class="pick ${st.region === k ? 'on' : ''}" data-region="${k}" aria-pressed="${st.region === k}">
        <svg viewBox="0 0 30 20" class="pick-flag">${r.flag}</svg>
        <span class="pick-name">${r.name}</span><span class="pick-desc">${r.blurb}</span>
        <span class="pick-meta">${r.country} · экспорт: ${r.exports}</span>
      </button>`).join('');
    $('#setup-regimes').innerHTML = Object.entries(REGIME_TYPES).map(([k, t]) => `
      <button class="pick ${st.regime === k ? 'on' : ''}" data-regime="${k}" aria-pressed="${st.regime === k}">
        <span class="pick-icon" aria-hidden="true">${t.icon}</span><span class="pick-name">${t.name}</span><span class="pick-desc">${t.desc}</span>
      </button>`).join('');
    $('#setup-title').innerHTML = TITLES.map(t => `<option ${t === st.title ? 'selected' : ''}>${t}</option>`).join('');
    $('#setup-name').value = st.name;
    $('#setup-country').value = st.country;
    const opts = {
      skin: [['Светлая', SKIN.light], ['Смуглая', SKIN.tan], ['Бронзовая', SKIN.brown], ['Тёмная', SKIN.dark], ['Очень тёмная', SKIN.deep]],
      hat: [['Фуражка', 'cap'], ['Берет', 'beret'], ['Кепи', 'kepi'], ['Шляпа', 'fedora'], ['Без убора', 'none']],
      mustache: [['Пышные', 'thick'], ['Моржовые', 'walrus'], ['Ниточка', 'pencil'], ['Руль', 'handlebar'], ['Нет', 'none']],
      glasses: [['Нет', 'none'], ['Авиаторы', 'aviator'], ['Круглые', 'round'], ['Монокль', 'monocle']],
      outfit: [['Мундир', 'military'], ['Костюм', 'suit'], ['Френч', 'mao'], ['Гуаябера', 'guayabera']],
      hair: [['Короткие', 'short'], ['Зачёс', 'slick'], ['Кудри', 'curly'], ['Афро', 'afro'], ['Лысина', 'bald']],
    };
    const labels = { skin: 'Кожа', hat: 'Головной убор', mustache: 'Усы', glasses: 'Очки', outfit: 'Одежда', hair: 'Волосы' };
    $('#setup-look').innerHTML = Object.entries(opts).map(([k, list]) => `
      <div class="look-row"><span class="look-label">${labels[k]}</span><div class="seg">${list.map(([n, v]) => `<button class="${st.look[k] === v ? 'on' : ''}" data-look="${k}" data-val="${v}">${n}</button>`).join('')}</div></div>`).join('');
    UI.renderSetupPortrait();
    for (const b of document.querySelectorAll('[data-region]')) b.onclick = () => {
      st.region = b.dataset.region; st.country = REGIONS[st.region].country; st.name = defaults[st.region];
      st.look.skin = SKIN[REGIONS[st.region].leaderSkin];
      st.look.hat = st.region === 'africa' ? 'kepi' : 'cap';
      UI.renderSetup();
    };
    for (const b of document.querySelectorAll('[data-regime]')) b.onclick = () => {
      st.regime = b.dataset.regime;
      Object.assign(st.look, st.regime === 'junta' ? { outfit: 'military', outfitColor: '#4b5320', medals: 12 } : st.regime === 'revolution' ? { outfit: 'military', outfitColor: '#556b2f', medals: 1, hat: 'beret', hatColor: '#1a1a1a' } : { outfit: 'suit', outfitColor: '#2a2d36', medals: 0, hat: 'none', sash: '#c1272d' });
      UI.renderSetup();
    };
    for (const b of document.querySelectorAll('[data-look]')) b.onclick = () => {
      st.look[b.dataset.look] = b.dataset.val;
      if (b.dataset.look === 'outfit') st.look.outfitColor = { military: '#4b5320', suit: '#2a2d36', mao: '#56604a', guayabera: '#f1e4c3' }[b.dataset.val];
      UI.renderSetup();
    };
  },
  renderSetupPortrait() {
    const st = UI.setup;
    $('#setup-portrait').innerHTML = Portrait.svg(st.look, { label: 'ваш портрет' }) + `<div class="plate">${esc(st.title)}<br><b>${esc(st.name || '…')}</b></div>`;
  },
  beginGame() {
    const st = UI.setup;
    st.name = $('#setup-name').value.trim() || 'Безымянный';
    st.title = $('#setup-title').value;
    st.country = $('#setup-country').value.trim() || REGIONS[st.region].country;
    Game.newGame(st);
    UI.show('screen-game');
    UI.tab = 'cabinet';
    UI.render();
    UI.intro().then(() => UI.startQuarter());
  },
  continueGame() {
    if (!Game.load()) return UI.title();
    if (S.over) return UI.showEnding();
    UI.show('screen-game');
    if (S.phase === 'crisis' && S.lastReport && S.lastReport.crisis) {
      UI.render();
      UI.runCrisis(S.lastReport.crisis).then(end => {
        if (end) return;
        if (S.turn > LAST_TURN) { Game.ending('survived'); return UI.showEnding(); }
        UI.startQuarter();
      });
      return;
    }
    if (S.phase === 'report') { UI.render(); return UI.startQuarter(); }
    S.phase = 'hub';
    UI.render();
  },

  intro() {
    const R = REGIONS[S.region];
    const lines = [
      ['narrator', `1 января 1960 года. ${S.country}. Столица — ${R.capital}. Население — четыре миллиона человек и сорок миллионов попугаев.`],
      ['narrator', `Вчера вечером вы стали ${S.leader.title}ом. Сегодня утром — собрали кабинет министров.`],
    ];
    for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
    lines.push(['police', 'Добро пожаловать во дворец, сеньор. Предыдущий хозяин продержался четырнадцать месяцев. Давайте побьём рекорд.']);
    lines.push(['narrator', 'Впереди десятилетие: холодная война, ракетные кризисы, революции. Ваша задача — дожить до 1970 года у власти. Желательно — с приличным счётом в Швейцарии.']);
    return VN.play({ title: 'Первое заседание кабинета', bg: 'palace', lines });
  },

  // ---------- игровой цикл ----------
  async startQuarter() {
    if (S.over) return UI.showEnding();
    S.phase = 'news'; Game.save();
    const news = Game.historyFor(S.year, S.q);
    for (const h of news) {
      if (S.hist.includes(h.head)) continue;
      S.hist.push(h.head);
      await UI.newspaper(h);
      if (S.over) return UI.showEnding();
    }
    S.phase = 'event'; Game.save();
    if (S.turn > 0 && Math.random() < 0.9) {
      const ev = Game.drawEvent();
      if (ev) { Game.markUsed(ev); await VN.play(UI.eventScene(ev)); }
    }
    S.phase = 'hub'; Game.save();
    UI.render();
  },
  eventScene(ev) {
    return { title: Game.fmt(ev.title), bg: ev.bg, lines: ev.lines, choices: ev.choices };
  },
  async newspaper(h) {
    const fx = h.fx ? Game.resolveFx(h.fx) : null;
    const ch = fx ? Game.apply(fx) : [];
    Game.log('Мировые новости: ' + h.head);
    await Modal.open(`
      <div class="paper">
        <div class="paper-mast">МИРОВЫЕ НОВОСТИ</div>
        <div class="paper-date">${Game.dateLabel()} · цена 5 ${esc(REGIONS[S.region].currency)}</div>
        <h2 class="paper-head">${esc(h.head)}</h2>
        <p class="paper-text">${esc(h.text)}</p>
        ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
      </div>`, h.choice ? 'Что скажет правительство?' : 'Перевернуть страницу');
    if (h.choice) await VN.play({ title: h.head, bg: 'office', lines: h.choice.lines, choices: h.choice.choices });
  },
  async endQuarter() {
    if (S.phase !== 'hub') return;
    const rep = Game.endQuarter();
    S.phase = rep.crisis ? 'crisis' : 'report'; Game.save();
    await UI.report(rep);
    if (rep.crisis) { const end = await UI.runCrisis(rep.crisis); if (end) return; }
    if (S.turn > LAST_TURN) { Game.ending('survived'); return UI.showEnding(); }
    UI.render();
    UI.startQuarter();
  },
  async runCrisis(cr) {
    let scene;
    if (cr.type === 'coup') scene = Game.coupScene(cr.leader);
    else if (cr.type === 'revolution') scene = Game.revolutionScene();
    else scene = Game.betrayalScene(cr.role);
    const res = await VN.play(scene);
    const end = scene.after(res.out, res.choice);
    S.phase = 'report'; Game.save();
    if (end) { Game.ending(end); UI.showEnding(); return true; }
    UI.render();
    return false;
  },
  report(rep) {
    const B = rep.money;
    const row = (n, v, cls = '') => `<tr class="${cls}"><td>${n}</td><td class="num">${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(0)}</td></tr>`;
    const diffs = ['treasury', 'economy', 'support', 'army', 'fear', 'swiss'].map(k => {
      const d = rep.after[k] - rep.before[k];
      return `<div class="rep-stat"><span>${STAT_ICONS[k]} ${STAT_NAMES[k]}</span><b>${rep.after[k]}</b><i class="${d > 0 ? 'up' : d < 0 ? 'down' : ''}">${d ? sign(d) : '·'}</i></div>`;
    }).join('');
    return Modal.open(`
      <div class="dossier">
        <div class="stamp">СЕКРЕТНО</div>
        <h2>Доклад за ${esc(rep.date)}</h2>
        <div class="rep-grid">${diffs}</div>
        <table class="ledger">
          <tbody>
            ${row('Налоги', B.taxes)}${row('Экспорт: ' + REGIONS[S.region].exports, B.exports)}
            ${B.aid.map(a => row('Помощь: ' + COUNTRIES[a.c].name, a.v)).join('')}
            ${B.extra ? row('Аренда баз, нефть, казино', B.extra) : ''}
            ${row('Армия', -B.costs.army)}${row('Тайная полиция', -B.costs.police)}${row('Хлеб и школы', -B.costs.social)}${row('Дороги и порты', -B.costs.infra)}
            ${B.palace ? row('Нужды дворца (→ Цюрих)', -B.palace) : ''}${B.loans ? row('Выплаты по кредитам', -B.loans) : ''}
            ${row('Итого за квартал', B.net, 'total')}
          </tbody>
        </table>
        ${rep.lines.map(l => `<p class="rep-note">✔ ${esc(l)}</p>`).join('')}
        ${rep.warn.map(l => `<p class="rep-warn">⚠ ${esc(l)}</p>`).join('')}
        ${rep.crisis ? `<p class="rep-warn big">⚠ Ночью во дворце зазвонил телефон…</p>` : ''}
      </div>`, rep.crisis ? 'Взять трубку' : 'Следующий квартал');
  },

  // ---------- рендер хаба ----------
  render() {
    if (!S) return;
    const R = REGIONS[S.region];
    $('#hdr-flag').innerHTML = `<svg viewBox="0 0 30 20">${R.flag}</svg>`;
    $('#hdr-country').textContent = S.country;
    $('#hdr-date').textContent = Game.dateLabel();
    $('#hdr-leader').innerHTML = Portrait.svg(S.leader.look);
    $('#hdr-ap').innerHTML = `<span class="ap-label">Приказы</span>` + Array.from({ length: AP_PER_TURN }, (_, i) => `<span class="pip ${i < S.ap ? 'on' : ''}" aria-hidden="true"></span>`).join('') + `<span class="sr">${S.ap} из ${AP_PER_TURN}</span>`;
    const stats = ['treasury', 'economy', 'support', 'army', 'fear', 'swiss'];
    $('#stats').innerHTML = stats.map(k => {
      const v = S[k];
      const money = k === 'treasury' || k === 'swiss';
      const pct = money ? clamp(k === 'swiss' ? v : v / 2, 0, 100) : v;
      const lvl = money ? (k === 'treasury' && v < 0 ? 'bad' : '') : (k === 'fear' ? '' : v < 25 ? 'bad' : v < 45 ? 'warn' : 'good');
      return `<div class="stat ${lvl}" title="${STAT_NAMES[k]}"><span class="stat-ic" aria-hidden="true">${STAT_ICONS[k]}</span><span class="stat-name">${STAT_NAMES[k]}</span><b class="stat-val">${Math.round(v)}${money ? '<small> млн</small>' : ''}</b><span class="bar"><span style="width:${pct}%"></span></span></div>`;
    }).join('');
    for (const b of document.querySelectorAll('.tabs button')) { b.classList.toggle('on', b.dataset.tab === UI.tab); b.setAttribute('aria-selected', b.dataset.tab === UI.tab); }
    $('#btn-end').disabled = S.phase !== 'hub';
    $('#btn-end').textContent = S.turn >= LAST_TURN ? 'Встретить 1970 год' : 'Завершить квартал';
    const body = $('#tab-body');
    body.innerHTML = UI['tab_' + UI.tab]();
    UI.bindTab();
  },

  tab_cabinet() {
    const R = REGIONS[S.region];
    const cr = Game.riskWord(Game.coupRisk()), rr = Game.riskWord(Game.revRisk());
    const B = Game.budgetCalc();
    const hist = S.statHist;
    const left = LAST_TURN + 1 - S.turn;
    const tips = [];
    if (S.treasury < 15) tips.push(['economy', 'Казна почти пуста. Урежьте расходы или найдите кредит. Рынок!']);
    if (S.army < 45) tips.push(['defense', 'Офицеры недовольны. Поднимите бюджет армии или устройте парад.']);
    if (S.support < 35) tips.push(['propaganda', 'Народ ворчит. Хлеб, зрелища, моё радиошоу — что-нибудь!']);
    if (S.fac.left.s > 50) tips.push(['police', `${R.factions.left.name} набирают силу. У меня есть списки.`]);
    if (Math.max(...Object.values(S.rel)) < 40) tips.push(['foreign', 'У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.']);
    if (!tips.length) tips.push(['police', 'В столице спокойно. Подозрительно спокойно. Я слежу.']);
    const tip = tips[S.turn % tips.length];
    return `
      <div class="cab">
        <section class="card leader-card">
          <div class="leader-portrait">${Portrait.svg(S.leader.look)}</div>
          <div class="leader-info">
            <div class="eyebrow">${esc(REGIME_TYPES[S.regime].name)} · ${esc(Game.bloc())}</div>
            <h2>${esc(S.leader.title)}<br>${esc(S.leader.name)}</h2>
            <p class="muted">У власти ${(S.turn / 4).toFixed(1).replace('.0', '')} г. До 1970 года осталось кварталов: <b>${left}</b>.</p>
            <div class="risk-row">
              <div class="risk ${cr.c}"><span>Риск переворота</span><b>${cr.w}</b></div>
              <div class="risk ${rr.c}"><span>Риск революции</span><b>${rr.w}</b></div>
              <div class="risk ${B.net < 0 ? 'high' : 'ok'}"><span>Бюджет за квартал</span><b>${B.net >= 0 ? '+' : '−'}${Math.abs(B.net).toFixed(0)} млн</b></div>
            </div>
          </div>
        </section>
        <section class="card tip-card">
          <div class="mini-portrait">${Portrait.svg(S.adv[tip[0]].look)}</div>
          <div><div class="eyebrow">${ROLES[tip[0]].title} · ${esc(S.adv[tip[0]].name)}</div><p class="quote">«${esc(tip[1])}»</p></div>
        </section>
        <section class="card chart-card">
          <div class="eyebrow">Динамика правления</div>
          ${Charts.lines(hist, [['support', 'Народ', 'var(--c-support)'], ['army', 'Армия', 'var(--c-army)'], ['economy', 'Экономика', 'var(--c-economy)'], ['fear', 'Страх', 'var(--c-fear)']])}
        </section>
        <section class="card help-card">
          <div class="eyebrow">Как править</div>
          <ul>
            <li>Каждый квартал у вас <b>${AP_PER_TURN} приказа</b>: переговоры с движениями, проекты, визиты, поручения советникам.</li>
            <li>Бюджет на вкладке «Экономика» меняется без приказов.</li>
            <li>Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.</li>
            <li>Деньги «нужд дворца» уходят на ваш счёт в Швейцарии. Он пригодится, если придётся бежать.</li>
          </ul>
          <button class="btn ghost small" data-act="retire">Уйти на покой…</button>
          <div class="confirm" id="retire-confirm" hidden><p>Передать власть и уехать в ${EXILE[S.region]} с ${Math.round(S.swiss)} млн на счёте?</p><button class="btn danger small" data-act="retire-yes">Да, уезжаю</button> <button class="btn ghost small" data-act="retire-no">Остаюсь</button></div>
        </section>
      </div>`;
  },

  tab_factions() {
    const R = REGIONS[S.region];
    const stName = { legal: 'легально', banned: 'под запретом', coopted: 'в правительстве' };
    return `<p class="lede">Пять сил, на которых держится или рушится ваш режим. Сила — сколько у них людей и влияния. Одобрение — что они думают о вас.</p>
      <div class="grid">${Object.keys(S.fac).map(f => {
        const F = S.fac[f], D = R.factions[f];
        const threat = F.s * (100 - F.a) / 100;
        return `<article class="card fac">
          <header><span class="fac-ic" aria-hidden="true">${D.icon}</span><div><h3>${D.name}</h3><span class="chip ${F.st}">${stName[F.st]}</span>${threat > 35 ? '<span class="chip danger">угроза</span>' : ''}</div></header>
          <p class="muted">${D.desc}</p>
          ${UI.meter('Сила', F.s, 'str')}${UI.meter('Одобрение', F.a, F.a < 30 ? 'bad' : F.a < 50 ? 'warn' : 'good')}
          <div class="acts">${Game.factionActions(f).map(a => UI.actBtn(`fac:${f}:${a.id}`, a)).join('')}</div>
        </article>`;
      }).join('')}</div>`;
  },

  tab_economy() {
    const B = Game.budgetCalc(), R = REGIONS[S.region];
    const row = (n, v) => `<tr><td>${n}</td><td class="num">${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}</td></tr>`;
    return `<div class="eco">
      <section class="card">
        <div class="eyebrow">Бюджет на квартал · без приказов</div>
        ${Object.entries(BUDGET).map(([k, d]) => `<div class="budget-row"><span class="budget-name">${d.name}</span><div class="seg">${d.labels.map((l, i) => `<button class="${S.budget[k] === i ? 'on' : ''}" data-budget="${k}" data-val="${i}" ${S.phase !== 'hub' ? 'disabled' : ''}>${l}${d.costs[i] ? ` <small>${d.costs[i]}</small>` : ''}</button>`).join('')}</div></div>`).join('')}
        <p class="muted small">Щедрая армия — лояльные генералы. Тайная полиция — страх. Хлеб и школы — любовь народа. Дороги — рост экономики. Высокие налоги злят и народ, и богачей. Нужды дворца идут на ваш счёт в Цюрихе.</p>
      </section>
      <section class="card">
        <div class="eyebrow">Прогноз казны</div>
        <table class="ledger"><tbody>
          ${row('Налоги', B.taxes)}${row('Экспорт (' + R.exports + ')', B.exports)}
          ${B.aid.map(a => row('Помощь: ' + COUNTRIES[a.c].name, a.v)).join('')}${B.extra ? row('Аренда баз, нефть, казино', B.extra) : ''}
          ${row('Расходы на ведомства', -(B.costs.army + B.costs.police + B.costs.social + B.costs.infra))}
          ${B.palace ? row('Нужды дворца', -B.palace) : ''}${B.loans ? row('Кредиты', -B.loans) : ''}
          <tr class="total"><td>Итого</td><td class="num">${B.net >= 0 ? '+' : '−'}${Math.abs(B.net).toFixed(1)}</td></tr>
        </tbody></table>
        <div class="price"><span>Мировая цена на ${R.exportGen}</span><b>${Math.round(S.price * 100)}%</b>${Charts.spark(S.priceHist)}</div>
      </section>
      <section class="card wide">
        <div class="eyebrow">Проекты · 1 приказ</div>
        <div class="proj">${Game.economyActions().map(a => `<div class="proj-item"><div><b>${a.name}</b><p class="muted small">${a.desc}</p></div>${UI.actBtn('eco:' + a.id, { ...a, name: 'Приказать' })}</div>`).join('')}</div>
      </section>
    </div>`;
  },

  tab_world() {
    const R = REGIONS[S.region];
    const blocName = { west: 'Запад', east: 'Восток', neutral: 'нейтралы' };
    return `<p class="lede">Ваш курс: <b>${Game.bloc()}</b>. Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.</p>
      <div class="grid">${R.countries.map(c => {
        const C = COUNTRIES[c], v = S.rel[c];
        return `<article class="card country">
          <header>${flagSvg(c)}<div><h3>${C.name}</h3><span class="muted small">${Game.leaderAt(c)}</span></div><span class="chip ${C.bloc}">${blocName[C.bloc]}</span></header>
          ${UI.meter('Отношения', v, v < 25 ? 'bad' : v < 50 ? 'warn' : 'good')}
          <div class="acts">${Game.countryActions(c).map(a => UI.actBtn(`world:${c}:${a.id}`, a)).join('')}</div>
        </article>`;
      }).join('')}</div>`;
  },

  tab_advisors() {
    return `<p class="lede">Ваш кабинет. Лояльность ниже 25 — и советник может предать. Уволенного заменит родственник: предан, но не слишком умён.</p>
      <div class="grid adv-grid">${Object.keys(ROLES).map(r => {
        const A = S.adv[r], Ro = ROLES[r];
        return `<article class="card adv">
          <div class="adv-portrait">${Portrait.svg(A.look)}</div>
          <div class="adv-body">
            <div class="eyebrow">${Ro.icon} ${Ro.title}</div>
            <h3>${esc(A.name)}</h3>
            <p class="muted">${esc(A.bio)}</p>
            ${UI.meter('Лояльность', A.loy, A.loy < 25 ? 'bad' : A.loy < 45 ? 'warn' : 'good')}
            <p class="small muted">Компетентность: ${'★'.repeat(Math.round(A.comp * 3))}${'☆'.repeat(3 - Math.round(A.comp * 3))}${A.relative ? ' · родственник' : ''}</p>
            <div class="acts">
              ${UI.actBtn(`adv:${r}:act`, { name: Ro.action, cost: Ro.actionDesc, ok: true })}
              ${UI.actBtn(`adv:${r}:gift`, { name: 'Подарить виллу', cost: '−10 млн', ok: S.treasury >= 10 })}
              <button class="btn ghost small" data-fire="${r}" ${S.phase !== 'hub' ? 'disabled' : ''}>Уволить</button>
            </div>
            <div class="confirm" id="fire-${r}" hidden><p>Уволить ${esc(A.name)}? Это не требует приказа.</p><button class="btn danger small" data-act="adv:${r}:fire" data-free="1">Уволить</button> <button class="btn ghost small" data-cancel="fire-${r}">Отмена</button></div>
          </div>
        </article>`;
      }).join('')}</div>`;
  },

  tab_log() {
    return `<div class="card"><div class="eyebrow">Летопись правления</div><ol class="log">${S.log.map(l => `<li><time>${esc(l.d)}</time><span>${esc(l.text)}</span></li>`).join('')}</ol></div>`;
  },

  meter(label, v, cls) {
    return `<div class="meter ${cls}"><span class="meter-l">${label}</span><span class="bar"><span style="width:${clamp(v)}%"></span></span><b>${Math.round(v)}</b></div>`;
  },
  actBtn(id, a) {
    const dis = !a.ok || S.ap <= 0 || S.phase !== 'hub';
    return `<button class="btn small ${a.danger ? 'danger-o' : ''}" data-act="${id}" ${dis ? 'disabled' : ''}>${esc(a.name)}${a.cost ? `<small>${esc(a.cost)}</small>` : ''}</button>`;
  },
  changes(ch) {
    return ch.map(c => {
      const good = c.k === 'fear' ? null : c.k === 'fs' ? null : c.d > 0;
      const ic = c.flag ? flagSvg(c.flag) : (c.icon || '');
      return `<span class="fx ${good === null ? 'neutral' : good ? 'up' : 'down'}">${ic}<span>${esc(c.label)}</span><b>${sign(c.d)}</b></span>`;
    }).join('');
  },

  bindTab() {
    for (const b of document.querySelectorAll('[data-budget]')) b.onclick = () => { S.budget[b.dataset.budget] = +b.dataset.val; Game.save(); UI.render(); };
    for (const b of document.querySelectorAll('[data-fire]')) b.onclick = () => { $('#fire-' + b.dataset.fire).hidden = false; };
    for (const b of document.querySelectorAll('[data-cancel]')) b.onclick = () => { $('#' + b.dataset.cancel).hidden = true; };
    for (const b of document.querySelectorAll('[data-act]')) b.onclick = () => UI.doAct(b.dataset.act);
  },
  async doAct(id) {
    if (id === 'retire') { $('#retire-confirm').hidden = false; return; }
    if (id === 'retire-no') { $('#retire-confirm').hidden = true; return; }
    if (id === 'retire-yes') { Game.ending('retired'); return UI.showEnding(); }
    const [kind, a, b] = id.split(':');
    let out = null;
    if (kind === 'fac') out = Game.factionAction(a, b);
    if (kind === 'world') out = Game.countryAction(a, b);
    if (kind === 'eco') out = Game.economyAction(a);
    if (kind === 'adv') out = Game.advisorAction(a, b);
    if (!out) return;
    UI.render();
    UI.toast(out.text, out.changes);
  },
  toast(text, ch) {
    const t = $('#toast');
    t.innerHTML = `<p>${esc(text)}</p>${ch && ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}`;
    t.hidden = false;
    t.classList.remove('in'); void t.offsetWidth; t.classList.add('in');
    clearTimeout(UI._tt);
    UI._tt = setTimeout(() => { t.hidden = true; }, 6500);
  },

  showEnding() {
    const F = S.final || Game.ending(S.over || 'survived');
    Game.save();
    UI.show('screen-end');
    $('#end-body').innerHTML = `
      <div class="end-portrait">${Portrait.svg(S.leader.look)}</div>
      <div class="end-text">
        <div class="eyebrow">${esc(S.country)} · ${Game.dateLabel()}</div>
        <h1>${esc(F.title)}</h1>
        <p class="end-story">${esc(F.text)}</p>
        <div class="verdicts">${F.verdicts.map(v => `<span class="chip gold">${esc(v)}</span>`).join('')}</div>
        <div class="rep-grid">
          <div class="rep-stat"><span>⏳ У власти</span><b>${F.years} г.</b></div>
          <div class="rep-stat"><span>🏦 В Швейцарии</span><b>${Math.round(S.swiss)} млн</b></div>
          <div class="rep-stat"><span>👥 Народ</span><b>${Math.round(S.support)}</b></div>
          <div class="rep-stat"><span>🏭 Экономика</span><b>${Math.round(S.economy)}</b></div>
          <div class="rep-stat"><span>👁️ Страх</span><b>${Math.round(S.fear)}</b></div>
          <div class="rep-stat"><span>★ Оценка историков</span><b>${F.score}</b></div>
        </div>
        <button class="btn big" id="btn-again">Новый режим</button>
      </div>`;
    $('#btn-again').onclick = () => { Game.clearSave(); UI.startSetup(); };
  },
};

// ---------- модальное окно ----------
const Modal = {
  open(html, btn = 'Дальше') {
    return new Promise(resolve => {
      const m = $('#modal');
      $('#toast').hidden = true;
      $('#modal-body').innerHTML = html;
      const b = $('#modal-btn');
      b.textContent = btn;
      m.hidden = false;
      b.focus();
      b.onclick = () => { m.hidden = true; resolve(); };
    });
  },
};

// ---------- визуальная новелла ----------
const VN = {
  speakerInfo(who) {
    const R = REGIONS[S.region];
    if (who === 'narrator') return null;
    if (who === 'leader') return { name: `${S.leader.title} ${S.leader.name}`, look: S.leader.look, side: 'left' };
    if (who.startsWith('npc:')) {
      let key = who.slice(4);
      if (key === '$patron_amb') key = R.patron + '_amb';
      const n = npcLook(key, S.region) || npcLook('usa_amb', S.region);
      return { name: n.name, look: n.look, side: 'right' };
    }
    const A = S.adv[who];
    return A ? { name: A.name, role: ROLES[who].title, look: A.look, side: 'left' } : null;
  },
  play(scene) {
    return new Promise(resolve => {
      const el = $('#vn');
      $('#toast').hidden = true;
      el.hidden = false;
      el.className = 'vn' + (scene.crisis ? ' crisis' : '');
      $('#vn-bg').innerHTML = Scenes.svg(scene.bg, S.region);
      $('#vn-title').textContent = scene.title || '';
      const lines = scene.lines.map(([w, t]) => [w, Game.fmt(t)]);
      let i = -1, typing = null;
      const box = $('#vn-text'), name = $('#vn-name'), stage = $('#vn-stage'), choicesEl = $('#vn-choices'), next = $('#vn-next');
      choicesEl.innerHTML = ''; choicesEl.hidden = true;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const showLine = () => {
        i++;
        if (i >= lines.length) return scene.choices ? showChoices() : finish(null);
        const [who, text] = lines[i];
        const sp = VN.speakerInfo(who);
        if (sp) {
          name.hidden = false;
          name.innerHTML = `<b>${esc(sp.name)}</b>${sp.role ? `<span>${esc(sp.role)}</span>` : ''}`;
          stage.innerHTML = `<div class="actor ${sp.side}">${Portrait.svg(sp.look)}</div>`;
          box.classList.remove('narr');
        } else { name.hidden = true; stage.innerHTML = ''; box.classList.add('narr'); }
        type(text);
      };
      const type = text => {
        clearInterval(typing);
        if (reduce) { box.textContent = text; return; }
        let n = 0; box.textContent = '';
        typing = setInterval(() => { n += 2; box.textContent = text.slice(0, n); if (n >= text.length) { clearInterval(typing); typing = null; } }, 16);
        box.dataset.full = text;
      };
      const advance = () => {
        if (!choicesEl.hidden) return;
        if (typing) { clearInterval(typing); typing = null; box.textContent = box.dataset.full; return; }
        showLine();
      };
      const showChoices = () => {
        next.hidden = true;
        name.hidden = true; box.classList.add('narr');
        box.textContent = 'Ваше решение?';
        stage.innerHTML = '';
        choicesEl.hidden = false;
        choicesEl.innerHTML = scene.choices.map((c, k) => {
          const ok = !c.req || c.req(S);
          const p = Game.chanceOf(c);
          const fxPrev = c.chance ? [] : Game.previewFx(c.fx);
          const advs = (c.adv || []).filter(r => S.adv[r]).map(r => `<span class="adv-tag" title="Советует: ${esc(S.adv[r].name)}">${Portrait.svg(S.adv[r].look)}</span>`).join('');
          return `<button class="choice" data-k="${k}" ${ok ? '' : 'disabled'}>
            <span class="choice-text">${esc(Game.fmt(c.text))}</span>
            <span class="choice-meta">${advs}${p !== null ? `<span class="hint">🎲 шанс ≈ ${Math.round(p * 100)}%</span>` : ''}${fxPrev.slice(0, 7).map(f => `<span class="hint ${f.inv ? 'neutral' : f.d > 0 ? 'up' : f.d < 0 ? 'down' : 'neutral'}" title="${esc(f.label)}">${f.flag ? flagSvg(f.flag) : f.icon}${esc(f.text || sign(f.d))}</span>`).join('')}${!ok ? `<span class="hint down">${esc(c.reqText || 'недоступно')}</span>` : ''}</span>
          </button>`;
        }).join('');
        for (const b of choicesEl.querySelectorAll('.choice')) b.onclick = () => pickChoice(scene.choices[+b.dataset.k]);
        const first = choicesEl.querySelector('.choice:not([disabled])'); if (first) first.focus();
      };
      const pickChoice = c => {
        const out = Game.choose(c);
        choicesEl.hidden = true; choicesEl.innerHTML = '';
        name.hidden = true; stage.innerHTML = '';
        box.classList.add('narr');
        box.innerHTML = `${out.won === true ? '<b class="won">Удача!</b> ' : out.won === false ? '<b class="lost">Неудача.</b> ' : ''}${esc(out.res || '')}${out.changes.length ? `<div class="fx-list">${UI.changes(out.changes)}</div>` : ''}`;
        Game.log(`${Game.fmt(scene.title)}: ${out.res}`);
        next.hidden = false;
        next.textContent = 'Продолжить ▸';
        el.onclick = null;
        next.onclick = e => { e.stopPropagation(); finish({ out, choice: c }); };
        next.focus();
      };
      const finish = res => {
        clearInterval(typing);
        el.hidden = true;
        el.onclick = null; next.onclick = null; document.onkeydown = null;
        if (S && S.phase === 'hub') UI.render();
        resolve(res || {});
      };
      next.hidden = false; next.textContent = 'Дальше ▸';
      el.onclick = e => { if (e.target.closest('.choice') || e.target.closest('#vn-next')) return; advance(); };
      next.onclick = e => { e.stopPropagation(); advance(); };
      document.onkeydown = e => { if ((e.key === ' ' || e.key === 'Enter') && choicesEl.hidden && document.activeElement !== next) { e.preventDefault(); advance(); } };
      showLine();
    });
  },
};

// ---------- мини-графики ----------
const Charts = {
  lines(hist, series) {
    const w = 600, h = 170, pl = 30, pr = 10, pt = 10, pb = 24;
    const n = Math.max(hist.length, 2);
    const x = i => pl + (i / (n - 1)) * (w - pl - pr);
    const y = v => pt + (1 - v / 100) * (h - pt - pb);
    const grid = [0, 25, 50, 75, 100].map(v => `<line x1="${pl}" x2="${w - pr}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${pl - 6}" y="${y(v) + 4}" text-anchor="end" class="axis">${v}</text>`).join('');
    const paths = series.map(([k, , col]) => {
      if (hist.length < 2) return '';
      const d = hist.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p[k]).toFixed(1)}`).join(' ');
      const last = hist[hist.length - 1];
      return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${x(hist.length - 1)}" cy="${y(last[k])}" r="4" fill="${col}"/>`;
    }).join('');
    const legend = series.map(([k, n2, col]) => `<span><i style="background:${col}"></i>${n2} <b>${Math.round(S[k])}</b></span>`).join('');
    const empty = hist.length < 2 ? `<text x="${w / 2}" y="${h / 2}" text-anchor="middle" class="axis">График появится после первого квартала</text>` : '';
    return `<div class="chart"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Динамика показателей">${grid}${paths}${empty}<text x="${pl}" y="${h - 6}" class="axis">1960</text><text x="${w - pr}" y="${h - 6}" text-anchor="end" class="axis">${Game.dateLabel()}</text></svg><div class="legend">${legend}</div></div>`;
  },
  spark(arr) {
    const w = 140, h = 36;
    if (arr.length < 2) return `<svg viewBox="0 0 ${w} ${h}" class="spark"></svg>`;
    const min = 0.5, max = 1.6;
    const pts = arr.map((v, i) => `${(i / (arr.length - 1) * w).toFixed(1)},${(h - (v - min) / (max - min) * h).toFixed(1)}`);
    const base = h - (1 - min) / (max - min) * h;
    return `<svg viewBox="0 0 ${w} ${h}" class="spark" aria-hidden="true"><line x1="0" x2="${w}" y1="${base}" y2="${base}" class="grid"/><polyline points="${pts.join(' ')}" fill="none" stroke="var(--brass)" stroke-width="2"/></svg>`;
  },
};

// ---------- запуск ----------
function boot() {
  $('#btn-new').onclick = () => UI.startSetup();
  $('#btn-continue').onclick = () => UI.continueGame();
  $('#btn-begin').onclick = () => UI.beginGame();
  $('#btn-back').onclick = () => UI.title();
  $('#setup-name').oninput = e => { UI.setup.name = e.target.value; UI.renderSetupPortrait(); };
  $('#setup-title').onchange = e => { UI.setup.title = e.target.value; UI.renderSetupPortrait(); };
  $('#setup-country').oninput = e => { UI.setup.country = e.target.value; };
  $('#btn-end').onclick = () => UI.endQuarter();
  $('#btn-menu').onclick = () => UI.title();
  for (const b of document.querySelectorAll('.tabs button')) b.onclick = () => { UI.tab = b.dataset.tab; UI.render(); };
  UI.title();
}
document.addEventListener('DOMContentLoaded', boot);
