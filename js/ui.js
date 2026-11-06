// Интерфейс: экраны, визуальная новелла, вкладки управления.
const $ = (sel, el = document) => el.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sign = d => (d > 0 ? '+' : d < 0 ? '−' : '') + Math.abs(Math.round(d));

const REGIME_LOOKS = {
  junta: { outfit: 'military', outfitColor: '#4b5320', medals: 12, hat: 'cap', hatColor: '#4b5320', glasses: 'none', bluetooth: false },
  revolution: { outfit: 'military', outfitColor: '#556b2f', medals: 1, hat: 'beret', hatColor: '#1a1a1a', glasses: 'none', bluetooth: false },
  western: { outfit: 'suit', outfitColor: '#2a2d36', medals: 0, hat: 'none', sash: '#c1272d', glasses: 'none', bluetooth: false },
  putsch: { outfit: 'military', outfitColor: '#5a5f3a', medals: 14, hat: 'kepi', hatColor: '#5a5f3a', glasses: 'none', bluetooth: false },
  estado: { outfit: 'suit', outfitColor: '#1d1d22', medals: 0, hat: 'top', hatColor: '#1a1a1a', sash: '#1f4e8c', glasses: 'monocle', bluetooth: false },
  front: { outfit: 'suit', outfitColor: '#5a4a3a', medals: 0, hat: 'flatcap', hatColor: '#4a3a2a', sash: '#c1272d', glasses: 'none', bluetooth: false },
  crown: { outfit: 'uniform48', outfitColor: '#f1ede2', collar: '#c1272d', medals: 7, hat: 'bicorne', hatColor: '#1a1a1a', plume: '#f4f1ea', sash: '#c1272d', glasses: 'none', beard: 'sideburns', mustache: 'thick', bluetooth: false },
  charter: { outfit: 'frock', outfitColor: '#1d1d22', vest: '#d6a63a', tie: '#f4f1ea', medals: 0, hat: 'top', hatColor: '#1a1a1a', sash: '#1f4e8c', glasses: 'pince', beard: 'chinstrap', mustache: 'none', bluetooth: false },
  general: { outfit: 'uniform48', outfitColor: '#1d2a44', collar: '#d6a63a', medals: 10, hat: 'shako', hatColor: '#1a1a1a', plume: '#c1272d', sash: '', glasses: 'none', beard: 'imperial', mustache: 'waxed', bluetooth: false },
  junta80: { outfit: 'military', outfitColor: '#4a4f36', medals: 11, hat: 'cap', hatColor: '#4a4f36', glasses: 'aviator', sash: '', mustache: 'thick', bluetooth: false },
  party80: { outfit: 'suit', outfitColor: '#4a4a52', tie: '#7a1a1a', medals: 3, hat: 'none', glasses: 'square', sash: '', mustache: 'none', hair: 'combover', bluetooth: false },
  family80: { outfit: 'guayabera', outfitColor: '#f1ead6', medals: 0, hat: 'none', glasses: 'aviator', sash: '#c1272d', mustache: 'none', hair: 'slick', bluetooth: false },
  heir: { outfit: 'suit2000', outfitColor: '#1c2230', shirt: '#dfe9f3', tie: '#7a1f3d', medals: 0, hat: 'none', sash: '#d6a63a', glasses: 'rimless', mustache: 'none', hair: 'slick', bluetooth: false },
  reformer: { outfit: 'suit2000', outfitColor: '#2a3550', shirt: '#f4f1ea', tie: 'none', medals: 0, hat: 'none', sash: '', glasses: 'none', mustache: 'none', hair: 'short', bluetooth: true },
  strongman: { outfit: 'suit2000', outfitColor: '#111317', shirt: '#dfe9f3', tie: '#1d1d22', medals: 0, hat: 'none', sash: '', glasses: 'sport', mustache: 'none', hair: 'buzz', bluetooth: false },
};
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
    document.body.dataset.era = '';
    const looks = [REGIONS.latam.advisors.defense.look, REGIONS.africa.advisors.propaganda.look, REGIONS.europe30.advisors.foreign.look];
    $('#title-portraits').innerHTML = looks.map((l, i) => `<div class="tp tp${i}">${Portrait.svg(l)}</div>`).join('');
  },

  // ---------- настройка ----------
  startSetup() {
    UI.setup = { era: '1960', region: 'latam', regime: 'junta', name: 'Хосе Мария Альварадо', title: 'Генералиссимус', country: REGIONS.latam.country,
      look: { skin: SKIN.tan, face: 'oval', hair: 'short', hairColor: '#1a1410', hat: 'cap', hatColor: '#4b5320', mustache: 'thick', brows: 'bushy', mouth: 'smile', glasses: 'none', outfit: 'military', outfitColor: '#4b5320', medals: 10, sash: '#c1272d' } };
    UI.show('screen-setup');
    UI.renderSetup();
  },
  renderSetup() {
    const st = UI.setup;
    const E = ERAS[st.era];
    const defaults = E.defaultNames;
    document.body.dataset.era = st.era;
    $('#setup-eras').innerHTML = Object.entries(ERAS).sort((a, b) => a[1].start - b[1].start).map(([k, e]) => `
      <button class="pick era-pick ${st.era === k ? 'on' : ''}" data-era="${k}" aria-pressed="${st.era === k}">
        <span class="pick-year">${e.name}</span><span class="pick-name">${e.label}</span><span class="pick-desc">${e.blurb}</span>
        <span class="pick-meta">${e.regions.map(r => REGIONS[r].name).join(' · ')}</span>
      </button>`).join('');
    $('#setup-regions').innerHTML = E.regions.map(k => [k, REGIONS[k]]).map(([k, r]) => `
      <button class="pick ${st.region === k ? 'on' : ''}" data-region="${k}" aria-pressed="${st.region === k}">
        <svg viewBox="0 0 30 20" class="pick-flag">${r.flag}</svg>
        <span class="pick-name">${r.name}</span><span class="pick-desc">${r.blurb}</span>
        <span class="pick-meta">${r.country} · экспорт: ${r.exports}</span>
      </button>`).join('');
    $('#setup-regimes').innerHTML = E.regimes.map(k => [k, Game.regimeDef(k, st.region)]).map(([k, t]) => `
      <button class="pick ${st.regime === k ? 'on' : ''}" data-regime="${k}" aria-pressed="${st.regime === k}">
        <span class="pick-icon" aria-hidden="true">${t.icon}</span><span class="pick-name">${t.name}</span><span class="pick-desc">${t.desc}</span>
      </button>`).join('');
    st.diff = st.diff || 'normal';
    $('#setup-diff').innerHTML = Object.entries(DIFFICULTY).map(([k, d]) => `
      <button class="pick ${st.diff === k ? 'on' : ''}" data-diff="${k}" aria-pressed="${st.diff === k}">
        <span class="pick-icon" aria-hidden="true">${d.icon}</span><span class="pick-name">${d.name}</span><span class="pick-desc">${d.desc}</span>
      </button>`).join('');
    $('#setup-title').innerHTML = (REGION_TITLES[st.region] || E.titles).map(t => `<option ${t === st.title ? 'selected' : ''}>${t}</option>`).join('');
    $('#setup-name').value = st.name;
    $('#setup-country').value = st.country;
    const opts = st.era === '1848' ? {
      skin: [['Светлая', SKIN.light], ['Смуглая', SKIN.tan], ['Бронзовая', SKIN.brown], ['Тёмная', SKIN.dark], ['Очень тёмная', SKIN.deep]],
      hat: [['Двууголка', 'bicorne'], ['Кивер', 'shako'], ['Каска с шишаком', 'pickelhaube'], ['Цилиндр', 'top'], ['Широкополая', 'slouch'], ['Без убора', 'none']],
      mustache: [['Нет', 'none'], ['Пышные', 'thick'], ['Нафабренные', 'waxed'], ['Моржовые', 'walrus'], ['Руль', 'handlebar']],
      beard: [['Нет', 'none'], ['Бакенбарды', 'sideburns'], ['Шкиперская', 'chinstrap'], ['Эспаньолка', 'imperial'], ['Окладистая', 'full']],
      glasses: [['Нет', 'none'], ['Пенсне', 'pince'], ['Монокль', 'monocle'], ['Круглые', 'round']],
      outfit: [['Мундир', 'uniform48'], ['Фрак', 'frock'], ['Пончо', 'poncho']],
      hair: [['Короткие', 'short'], ['Романтические', 'romantic'], ['Зачёс', 'slick'], ['Кудри', 'curly'], ['Лысина', 'bald']],
    } : st.era === '2000' ? {
      skin: [['Светлая', SKIN.light], ['Смуглая', SKIN.tan], ['Бронзовая', SKIN.brown], ['Тёмная', SKIN.dark], ['Очень тёмная', SKIN.deep]],
      hat: [['Без убора', 'none'], ['Фуражка', 'cap'], ['Бейсболка', 'baseball'], ['Тюбетейка', 'tubeteika'], ['Куфия', 'keffiyeh']],
      mustache: [['Нет', 'none'], ['Пышные', 'thick'], ['Ниточка', 'pencil']],
      glasses: [['Нет', 'none'], ['Без оправы', 'rimless'], ['Спортивные', 'sport'], ['Авиаторы', 'aviator']],
      outfit: [['Костюм', 'suit2000'], ['Мундир', 'military'], ['Спортивный', 'tracksuit'], ['Поло', 'polo']],
      hair: [['Короткие', 'short'], ['Ёжик', 'buzz'], ['Гель', 'gelled'], ['Зачёс', 'slick'], ['Лысина', 'bald']],
      bluetooth: [['Нет', ''], ['Bluetooth-гарнитура', '1']],
    } : {
      skin: [['Светлая', SKIN.light], ['Смуглая', SKIN.tan], ['Бронзовая', SKIN.brown], ['Тёмная', SKIN.dark], ['Очень тёмная', SKIN.deep]],
      hat: [['Фуражка', 'cap'], ['Берет', 'beret'], ['Кепи', 'kepi'], ['Шляпа', 'fedora'], ['Котелок', 'bowler'], ['Цилиндр', 'top'], ['Без убора', 'none']],
      mustache: [['Пышные', 'thick'], ['Моржовые', 'walrus'], ['Ниточка', 'pencil'], ['Руль', 'handlebar'], ['Нет', 'none']],
      glasses: [['Нет', 'none'], ['Авиаторы', 'aviator'], ['Круглые', 'round'], ['Монокль', 'monocle']],
      outfit: [['Мундир', 'military'], ['Костюм', 'suit'], ['Френч', 'mao'], ['Гуаябера', 'guayabera']],
      hair: [['Короткие', 'short'], ['Зачёс', 'slick'], ['Кудри', 'curly'], ['Афро', 'afro'], ['Лысина', 'bald']],
    };
    const labels = { skin: 'Кожа', hat: 'Головной убор', mustache: 'Усы', beard: 'Борода', glasses: 'Очки', outfit: 'Одежда', hair: 'Волосы', bluetooth: 'Гаджет' };
    $('#setup-look').innerHTML = Object.entries(opts).map(([k, list]) => `
      <div class="look-row"><span class="look-label">${labels[k]}</span><div class="seg">${list.map(([n, v]) => `<button class="${(k === 'bluetooth' ? (st.look.bluetooth ? '1' : '') : st.look[k]) === v ? 'on' : ''}" data-look="${k}" data-val="${v}">${n}</button>`).join('')}</div></div>`).join('');
    UI.renderSetupPortrait();
    for (const b of document.querySelectorAll('[data-diff]')) b.onclick = () => { st.diff = b.dataset.diff; UI.renderSetup(); };
    for (const b of document.querySelectorAll('[data-era]')) b.onclick = () => {
      if (st.era === b.dataset.era) return;
      st.era = b.dataset.era;
      const E2 = ERAS[st.era];
      st.region = E2.regions[0]; st.regime = E2.regimes[0]; st.title = REGION_TITLES[st.region][0];
      st.country = REGIONS[st.region].country; st.name = E2.defaultNames[st.region];
      st.look.skin = SKIN[REGIONS[st.region].leaderSkin];
      st.look.beard = 'none'; if (st.look.hair === 'romantic') st.look.hair = 'short';
      Object.assign(st.look, REGIME_LOOKS[st.regime]);
      UI.renderSetup();
    };
    for (const b of document.querySelectorAll('[data-region]')) b.onclick = () => {
      st.region = b.dataset.region; st.country = REGIONS[st.region].country; st.name = defaults[st.region]; st.title = REGION_TITLES[st.region][0];
      st.look.skin = SKIN[REGIONS[st.region].leaderSkin];
      st.look.hat = st.era === '2000' ? 'none' : st.era === '1980' ? REGIME_LOOKS[st.regime].hat : st.era === '1848' ? (st.region === 'latam48' && st.regime === 'crown' ? 'gaucho' : REGIME_LOOKS[st.regime].hat) : st.region === 'africa' ? 'kepi' : st.region === 'asia30' ? 'helmet' : 'cap';
      if (st.era === '1848') Object.assign(st.look, st.region === 'latam48' && st.regime === 'crown' ? { outfit: 'poncho', outfitColor: '#9a1a1a' } : { outfit: REGIME_LOOKS[st.regime].outfit, outfitColor: REGIME_LOOKS[st.regime].outfitColor });
      UI.renderSetup();
    };
    for (const b of document.querySelectorAll('[data-regime]')) b.onclick = () => {
      st.regime = b.dataset.regime;
      Object.assign(st.look, REGIME_LOOKS[st.regime]);
      UI.renderSetup();
    };
    for (const b of document.querySelectorAll('[data-look]')) b.onclick = () => {
      st.look[b.dataset.look] = b.dataset.look === 'bluetooth' ? b.dataset.val === '1' : b.dataset.val;
      if (b.dataset.look === 'outfit') st.look.outfitColor = { military: '#4b5320', suit: '#2a2d36', mao: '#56604a', guayabera: '#f1e4c3', suit2000: '#1c2230', tracksuit: '#1f3f8a', polo: '#2a6a4a', uniform48: '#1d2a44', frock: '#1d1d22', poncho: '#9a1a1a' }[b.dataset.val];
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
    document.body.dataset.era = S.era;
    UI.show('screen-game');
    UI.tab = 'cabinet';
    UI.render();
    UI.intro().then(() => UI.startQuarter());
  },
  continueGame() {
    if (!Game.load()) return UI.title();
    document.body.dataset.era = S.era;
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
      ['narrator', `1 января ${ERAS[S.era].start} года. ${S.country}. Столица — ${R.capital}. Население — четыре миллиона человек и сорок миллионов ${R.critters}.`],
      ['narrator', `Вчера вечером вы стали ${Game.titleIns()}. Сегодня утром — собрали кабинет министров.`],
    ];
    for (const r of Object.keys(ROLES)) lines.push([r, `${ROLES[r].title}. ${S.adv[r].bio}`]);
    lines.push(['police', 'Добро пожаловать во дворец, {addr}. Предыдущий хозяин продержался четырнадцать месяцев. Давайте побьём рекорд.']);
    lines.push(['narrator', `${ERAS[S.era].intro} Ваша задача — дожить до ${ERAS[S.era].start + 10} года у власти. Желательно — с приличным ${Game.bank().ins}.`]);
    return VN.play({ title: 'Первое заседание кабинета', bg: 'palace', lines });
  },

  // ---------- игровой цикл ----------
  async startQuarter() {
    if (S.over) return UI.showEnding();
    S.phase = 'news'; Game.save();
    const news = Game.historyFor(S.year, S.q).filter(h => !S.hist.includes(h.head));
    for (const h of news) S.hist.push(h.head);
    await UI.pressPage(news);
    if (S.over) return UI.showEnding();
    for (const make of Game.forcedList) {
      const forced = make();
      if (!forced) continue;
      Game.save();
      const res = await VN.play(forced);
      const end = forced.after ? forced.after(res.out, res.choice) : null;
      if (end) { Game.ending(end); return UI.showEnding(); }
    }
    S.phase = 'event'; Game.save();
    if (S.turn > 0 && Math.random() < 0.9) {
      const ev = Game.drawEvent();
      if (ev) { Game.markUsed(ev); await VN.play(UI.eventScene(ev)); }
    }
    if (Game.advisorScene && S.turn > 1 && !S.over && Math.random() < 0.4) {
      const sc = Game.advisorScene();
      if (sc) await VN.play(sc);
    }
    S.phase = 'hub'; Game.save();
    UI.render();
  },
  eventScene(ev) {
    return { id: ev.id, title: Game.fmt(ev.title), bg: ev.bg, lines: ev.lines, choices: ev.choices };
  },
  async newspaper(h) {
    const fx = h.fx ? Game.resolveFx(h.fx) : null;
    const ch = fx ? Game.apply(fx) : [];
    Game.log('Мировые новости: ' + h.head);
    await Modal.open(`
      <div class="paper">
        <div class="paper-mast">${ERAS[S.era].vars.mast}</div>
        <div class="paper-date">${Game.dateLabel()} · экстренный выпуск</div>
        <h2 class="paper-head">${esc(h.head)}</h2>
        <p class="paper-text">${esc(h.text)}</p>
        ${ch.length ? `<div class="fx-list">${UI.changes(ch)}</div>` : ''}
      </div>`, Game.histChoice(h) ? 'Что скажет правительство?' : 'Перевернуть страницу');
    if (Game.histChoice(h)) await VN.play({ title: h.head, bg: 'office', lines: h.choice.lines, choices: h.choice.choices });
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
    const diffs = ['treasury', 'economy', 'support', 'army', 'fear', ...(S.era === '2000' ? ['net'] : []), 'swiss'].map(k => {
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
            ${B.extra ? row('Аренда баз, нефть, казино', B.extra) : ''}${(B.hookInc || []).map(h => row(h.label, h.v)).join('')}
            ${row('Армия и полиция', -(B.costs.army + B.costs.police))}${row('Здоровье, школы, субсидии', -(B.costs.health + B.costs.edu + B.costs.subsidy))}${row('Дороги и порты', -B.costs.infra)}${row('Пропаганда', -B.costs.media)}${B.costs.netctl ? row('Контроль интернета', -B.costs.netctl) : ''}
            ${B.palace ? row(`Нужды дворца (→ ${Game.bank().to})`, -B.palace) : ''}${B.loans ? row('Выплаты по кредитам', -B.loans) : ''}
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
    $('#hdr-ap').innerHTML = `<span class="ap-label">Приказы</span>` + Array.from({ length: Game.apTurn() }, (_, i) => `<span class="pip ${i < S.ap ? 'on' : ''}" aria-hidden="true"></span>`).join('') + `<span class="sr">${S.ap} из ${Game.apTurn()}</span>`;
    const stats = ['treasury', 'economy', 'support', 'army', 'fear', ...(S.era === '2000' ? ['net'] : []), 'swiss'];
    $('#stats').classList.toggle('seven', stats.length === 7);
    $('#stats').innerHTML = stats.map(k => {
      const v = S[k];
      const money = k === 'treasury' || k === 'swiss';
      const pct = money ? clamp(k === 'swiss' ? v : v / 2, 0, 100) : v;
      const lvl = money ? (k === 'treasury' && v < 0 ? 'bad' : '') : (k === 'fear' || k === 'net' ? '' : v < 25 ? 'bad' : v < 45 ? 'warn' : 'good');
      return `<div class="stat ${lvl}${k === 'net' ? ' net' : ''}" title="${STAT_NAMES[k]}"><span class="stat-ic" aria-hidden="true">${STAT_ICONS[k]}</span><span class="stat-name">${STAT_NAMES[k]}</span><b class="stat-val">${Math.round(v)}${money ? '<small> млн</small>' : k === 'net' ? '<small> %</small>' : ''}</b><span class="bar"><span style="width:${pct}%"></span></span></div>`;
    }).join('');
    const eraTabs = { coldwar: '1960', war: '1930', colorrev: '2000', spring: '1848', cold80: '1980' };
    if (eraTabs[UI.tab] && eraTabs[UI.tab] !== S.era) UI.tab = 'cabinet';
    for (const b of document.querySelectorAll('.tabs button')) { b.hidden = !!eraTabs[b.dataset.tab] && eraTabs[b.dataset.tab] !== S.era; b.classList.toggle('on', b.dataset.tab === UI.tab); b.setAttribute('aria-selected', b.dataset.tab === UI.tab); }
    const crb = document.querySelector('.tabs button[data-tab="colorrev"]');
    if (crb && S.era === '2000') { crb.textContent = (CR_REGION[S.region] || {}).tab || 'Цветные революции'; crb.classList.toggle('alert', !!S.cr && (S.cr.heat >= 55 || S.cr.rad >= 50)); }
    const spb = document.querySelector('.tabs button[data-tab="spring"]');
    if (spb && S.era === '1848' && typeof SP_REGION !== 'undefined') { spb.textContent = SP_REGION[S.region].tab; spb.classList.toggle('alert', !!S.sp && (S.sp.heat >= 55 || S.sp.rad >= 55)); }
    const c8b = document.querySelector('.tabs button[data-tab="cold80"]');
    if (c8b && S.era === '1980' && S.c80) c8b.classList.toggle('alert', S.c80.heat >= 55 || S.c80.debt >= 70 || (S.c80.need < 30 && S.year >= 1985));
    const cwb = document.querySelector('.tabs button[data-tab="coldwar"]');
    if (cwb) cwb.classList.toggle('alert', S.era === '1960' && !!S.cw && Math.max(S.cw.sus.us, S.cw.sus.su) >= 50);
    $('#btn-end').disabled = S.phase !== 'hub';
    $('#btn-end').textContent = S.turn >= LAST_TURN ? `Встретить ${ERAS[S.era].start + 10} год` : 'Завершить квартал';
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
    if (S.fac.left.s > 50) tips.push(['police', `Движение «${R.factions.left.name}» набирает силу. У меня есть списки.`]);
    if (S.era === '2000' && S.net > 25 && S.fac.liberals.a < 40) tips.push(['police', `Интернетом пользуются уже ${Math.round(S.net)}% граждан. Блогеры собирают митинги за пятнадцать минут. Подумайте о фильтрах.`]);
    if (S.era === '2000' && S.budget.netctl === 2) tips.push(['economy', 'Файрвол душит экономику. Инвесторы не любят страны, где не открывается их почта.']);
    if (Math.max(...Object.values(S.rel)) < 40) tips.push(['foreign', 'У нас нет ни одного настоящего друга в мире. Это поэтично, но опасно.']);
    if (!tips.length) tips.push(['police', 'В столице спокойно. Подозрительно спокойно. Я слежу.']);
    const tip = tips[S.turn % tips.length];
    return `
      <div class="cab">
        <section class="card leader-card">
          <div class="leader-portrait">${Portrait.svg(S.leader.look)}</div>
          <div class="leader-info">
            <div class="eyebrow">${esc(Game.regimeDef(S.regime).name)} · ${esc(Game.bloc())}</div>
            <h2>${esc(S.leader.title)}<br>${esc(S.leader.name)}</h2>
            <p class="muted">У власти ${(S.turn / 4).toFixed(1).replace('.0', '')} г. До ${ERAS[S.era].start + 10} года осталось кварталов: <b>${left}</b>.</p>
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
          ${Charts.lines(hist, [['support', 'Народ', 'var(--c-support)'], ['army', 'Армия', 'var(--c-army)'], ['economy', 'Экономика', 'var(--c-economy)'], ['fear', 'Страх', 'var(--c-fear)'], ...(S.era === '2000' ? [['net', 'Интернет', 'var(--c-net)']] : [])])}
        </section>
        <section class="card help-card">
          <div class="eyebrow">Как править</div>
          <ul>
            <li>Каждый квартал у вас <b>${Game.apTurn()} приказа</b>: переговоры с движениями, проекты, визиты, поручения советникам.</li>
            <li>Бюджет на вкладке «Бюджет» меняется ползунками и без приказов. Проекты и указы — на вкладке «Указы».</li>
            <li>Армия ниже 45 и злые «ястребы» — к перевороту. Народ ниже 30 и сильные левые — к революции.</li>
            <li>Деньги «нужд дворца» уходят на ${Game.bank().acc}. Пригодится, если придётся бежать.</li>
            ${S.era === '2000' ? '<li><b>Интернет</b> растёт сам и с каждым годом быстрее. Он ускоряет экономику, но усиливает блогеров и протесты. Фильтры и файрвол тормозят и то и другое, стоят денег и злят Запад.</li>' : ''}
          </ul>
          <button class="btn ghost small" data-act="retire">Уйти на покой…</button>
          <div class="confirm" id="retire-confirm" hidden><p>Передать власть и доживать век в ${REGIONS[S.region].exile} с ${Math.round(S.swiss)} млн на счёте?</p><button class="btn danger small" data-act="retire-yes">Да, уезжаю</button> <button class="btn ghost small" data-act="retire-no">Остаюсь</button></div>
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

  // ---------- бюджет ----------
  sliderWord(v) { return v <= 15 ? 'почти ноль' : v < 40 ? 'урезано' : v <= 60 ? 'норма' : v < 85 ? 'щедро' : 'с размахом'; },
  budgetRowMeta(d, kind) {
    const v = S.budget[d.k], B = Game.budgetCalc(), E = Game.budgetEffects();
    const money = kind === 'spend' ? (d.k === 'palace' ? -B.palace : -B.costs[d.k]) : d.k === 'popTax' ? B.taxPop : d.k === 'corpTax' ? B.taxCorp : null;
    const chips = (E.items[d.k] || []).filter(e => Math.abs(e.d) >= 0.05).map(e => `<span class="fx ${e.d > 0 ? 'up' : 'down'}"><span>${esc(e.label)}</span><b>${e.d > 0 ? '+' : '−'}${Math.abs(e.d).toFixed(1)}</b></span>`).join('');
    const moneyTxt = money === null ? `экспорт ${B.exports.toFixed(1)} млн` : `${money >= 0 ? '+' : '−'}${Math.abs(money).toFixed(1)} млн`;
    return `<span class="br-val">${v}% · ${UI.sliderWord(v)}</span><span class="br-money">${moneyTxt}</span><span class="br-fx">${chips || '<span class="muted small">без эффекта</span>'}</span>`;
  },
  budgetForecast() {
    const B = Game.budgetCalc(), E = Game.budgetEffects(), R = REGIONS[S.region];
    const row = (n, v, cls = '') => `<tr class="${cls}"><td>${n}</td><td class="num">${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}</td></tr>`;
    const tot = Object.entries(E.tot).filter(([, d]) => Math.abs(d) >= 0.05).map(([k, d]) => `<span class="fx ${k === 'fear' ? 'neutral' : d > 0 ? 'up' : 'down'}">${STAT_ICONS[k]}<span>${STAT_NAMES[k]}</span><b>${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}</b></span>`).join('');
    const fac = Object.entries(E.fac).flatMap(([f, e]) => Object.entries(e).filter(([, d]) => Math.abs(d) >= 0.05).map(([key, d]) => `<span class="fx ${key === 's' ? 'neutral' : d > 0 ? 'up' : 'down'}">${R.factions[f].icon}<span>${R.factions[f].short}${key === 's' ? ': сила' : ''}</span><b>${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}</b></span>`)).join('');
    const social = (B.costs.health || 0) + (B.costs.edu || 0) + (B.costs.subsidy || 0);
    return `<div class="eyebrow">Прогноз на квартал</div>
      <table class="ledger"><tbody>
        ${row('Налоги с населения', B.taxPop)}${row('Налоги с компаний', B.taxCorp)}${row('Экспорт (' + R.exports + ')', B.exports)}
        ${B.aid.map(a => row('Помощь: ' + COUNTRIES[a.c].name, a.v)).join('')}${B.extra ? row('Аренда баз, нефть, казино', B.extra) : ''}${B.hookInc.map(h => row(h.label, h.v)).join('')}
        ${row('Армия и полиция', -(B.costs.army + B.costs.police))}${row('Здоровье, школы, субсидии', -social)}${row('Дороги и порты', -B.costs.infra)}${row('Пропаганда', -B.costs.media)}
        ${B.costs.netctl ? row('Контроль интернета', -B.costs.netctl) : ''}${B.palace ? row(`Нужды дворца (→ ${Game.bank().to})`, -B.palace) : ''}${B.loans ? row('Кредиты', -B.loans) : ''}
        <tr class="total"><td>Итого</td><td class="num">${B.net >= 0 ? '+' : '−'}${Math.abs(B.net).toFixed(1)}</td></tr>
      </tbody></table>
      <div class="eyebrow mt">Что сделает бюджет за квартал</div>
      <div class="fx-list">${tot}${fac || ''}</div>
      <p class="muted small">Плюс обычный дрейф: экономика, цены, настроения движений.</p>
      <div class="price"><span>Мировая цена: ${R.exports}</span><b>${Math.round(S.price * 100)}%</b>${Charts.spark(S.priceHist)}</div>`;
  },
  tab_budget() {
    const dis = S.phase !== 'hub' ? 'disabled' : '';
    const rows = (list, kind) => list.map(d => `<div class="br" id="br-${d.k}">
        <label for="sl-${d.k}" class="br-name">${esc(sliderName(d))}<span class="muted small">${esc(d.hint)}</span></label>
        <input type="range" id="sl-${d.k}" min="0" max="100" step="5" value="${S.budget[d.k]}" data-slider="${d.k}" data-kind="${kind}" ${dis}>
        <div class="br-meta">${UI.budgetRowMeta(d, kind)}</div>
      </div>`).join('');
    return `<div class="budget">
      <section class="card">
        <div class="budget-head"><div class="eyebrow">Бюджет · меняется без приказов</div>
          <div class="presets">${Object.entries(BUDGET_PRESETS).map(([k, p]) => `<button class="btn ghost small" data-preset="${k}" ${dis}>${p.name}</button>`).join('')}</div></div>
        <h3 class="sub-h">Расходы</h3>${rows(SLIDERS.spend, 'spend')}
        <h3 class="sub-h">Доходы</h3>${rows(SLIDERS.tax, 'tax')}
        ${S.era === '2000' ? `<h3 class="sub-h">Интернет</h3><div class="budget-row"><span class="budget-name">${NETCTL.name}</span><div class="seg">${NETCTL.labels.map((l, i) => `<button class="${S.budget.netctl === i ? 'on' : ''}" data-netctl="${i}" ${dis}>${l}${NETCTL.costs[i] ? ` <small>${NETCTL.costs[i]}</small>` : ''}</button>`).join('')}</div></div>
          <p class="muted small">Интернетом пользуются ${Math.round(S.net)}% граждан. Свобода: быстрый рост, экономика растёт, блогеры сильнеют. Файрвол: всё наоборот, плюс −1 к отношениям с Западом каждый квартал.</p>` : ''}
      </section>
      <section class="card budget-side" id="bf">${UI.budgetForecast()}</section>
    </div>`;
  },

  // ---------- указы ----------
  dtab: 'foreign',
  tab_decrees() {
    const cat = UI.dtab;
    let items = Game.decreeList(cat).map(d => ({ act: `dec:${cat}:${d.id}`, ...d }));
    if (cat === 'economy') items = [...Game.economyActions().map(a => ({ act: 'eco:' + a.id, ...a })), ...items];
    return `<div class="dtabs" role="tablist">${Object.entries(DECREE_TABS).map(([k, n]) => `<button class="${k === cat ? 'on' : ''}" data-dtab="${k}" role="tab" aria-selected="${k === cat}">${n}</button>`).join('')}</div>
      <p class="lede">Каждый указ стоит один приказ. Осталось приказов: <b>${S.ap}</b>. Повторяемые указы слабеют, если издавать их слишком часто.</p>
      <div class="proj dec-grid">${items.map(a => `<div class="proj-item dec ${a.used ? 'used' : ''} ${cat === 'absurd' ? 'absurd' : ''}">
        <div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>${a.used ? '' : UI.decreeEffects(a.act)}</div>
        ${UI.actBtn(a.act, { ok: a.ok, danger: a.danger, name: a.used ? 'Издан' : 'Подписать', cost: a.cost })}</div>`).join('')}</div>`;
  },
  fxChips(list) {
    return list.map(f => `<span class="hint ${f.inv || f.k === 'fear' ? 'neutral' : f.d > 0 ? 'up' : f.d < 0 ? 'down' : 'neutral'}" title="${esc(f.label)}">${f.flag ? flagSvg(f.flag) : (f.icon || '')}${esc(f.text || `${f.label} ${sign(f.d)}`)}</span>`).join('');
  },
  decreeEffects(act) {
    const [kind, a, b] = act.split(':');
    const P = kind === 'eco' ? Game.economyPreview(a) : Game.decreePreview(a, b);
    const rows = [];
    if (P.odds) {
      rows.push(`<div class="dec-row"><span class="dec-tag">Шанс ${Math.round(P.odds * 100)}%</span>${UI.fxChips(P.win)}</div>`);
      rows.push(`<div class="dec-row"><span class="dec-tag">Иначе</span>${UI.fxChips(P.lose)}</div>`);
    } else {
      const now = P.now.filter(f => !f.later), later = P.now.filter(f => f.later);
      if (now.length) rows.push(`<div class="dec-row"><span class="dec-tag">Сразу</span>${UI.fxChips(now)}</div>`);
      const groups = {};
      for (const f of later) (groups[f.later] = groups[f.later] || []).push(f);
      for (const [n, list] of Object.entries(groups)) rows.push(`<div class="dec-row"><span class="dec-tag">Через ${n} кв.</span>${UI.fxChips(list)}</div>`);
      if (P.risk) rows.push(`<div class="dec-row"><span class="dec-tag dec-risk">Риск ${Math.round(P.risk.p * 100)}%</span>${UI.fxChips(P.risk.fx)}</div>`);
    }
    return rows.length ? `<div class="dec-fx">${rows.join('')}</div>` : '';
  },

  tab_world() {
    const R = REGIONS[S.region];
    const blocName = S.era === '1930' ? { west: 'демократии', east: 'Коминтерн', axis: 'Ось', neutral: 'нейтралы' } : { west: 'Запад', east: 'Восток', neutral: 'нейтралы' };
    return `<p class="lede">Ваш курс: <b>${Game.bloc()}</b>. Дружба со сверхдержавой приносит помощь каждый квартал, если отношения выше 60. Но другая сверхдержава это запомнит.</p>
      <div class="grid">${R.countries.map(c => {
        const C = COUNTRIES[c], v = S.rel[c];
        return `<article class="card country">
          <header>${flagSvg(c)}<div><h3>${C.name}</h3><span class="muted small">${Game.leaderAt(c)}</span></div><span class="chip ${Game.blocOf(c)}">${blocName[Game.blocOf(c)]}</span></header>
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
              ${UI.actBtn(`adv:${r}:act`, { name: Ro.action, cost: Ro.actionDesc + (Game.dealInfo('adv:' + r).n ? ` Эффект сейчас ${Math.round([1, 1, 0.6, 0.35, 0.2][Math.min(Game.dealInfo('adv:' + r).n + 1, 4)] * 100)}%.` : ''), ok: true })}
              ${UI.actBtn(`adv:${r}:gift`, { name: 'Подарить виллу', cost: '−10 млн', ok: S.treasury >= 10 })}
              <button class="btn ghost small" data-fire="${r}" ${S.phase !== 'hub' ? 'disabled' : ''}>Уволить</button>
            </div>
            <div class="confirm" id="fire-${r}" hidden><p>Отправить в отставку: ${esc(A.name)}? Это не требует приказа.</p><button class="btn danger small" data-act="adv:${r}:fire" data-free="1">Уволить</button> <button class="btn ghost small" data-cancel="fire-${r}">Отмена</button></div>
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
    for (const b of document.querySelectorAll('[data-netctl]')) b.onclick = () => { S.budget.netctl = +b.dataset.netctl; Game.save(); UI.render(); };
    for (const b of document.querySelectorAll('[data-preset]')) b.onclick = () => { Object.assign(S.budget, BUDGET_PRESETS[b.dataset.preset].v); Game.save(); UI.render(); };
    for (const b of document.querySelectorAll('[data-dtab]')) b.onclick = () => { UI.dtab = b.dataset.dtab; UI.render(); };
    for (const el of document.querySelectorAll('[data-slider]')) {
      el.oninput = () => {
        S.budget[el.dataset.slider] = +el.value;
        for (const d of [...SLIDERS.spend.map(x => [x, 'spend']), ...SLIDERS.tax.map(x => [x, 'tax'])]) {
          const m = document.querySelector(`#br-${d[0].k} .br-meta`); if (m) m.innerHTML = UI.budgetRowMeta(d[0], d[1]);
        }
        $('#bf').innerHTML = UI.budgetForecast();
      };
      el.onchange = () => Game.save();
    }
    for (const b of document.querySelectorAll('[data-fire]')) b.onclick = () => { $('#fire-' + b.dataset.fire).hidden = false; };
    for (const b of document.querySelectorAll('[data-cancel]')) b.onclick = () => { $('#' + b.dataset.cancel).hidden = true; };
    for (const b of document.querySelectorAll('[data-act]')) b.onclick = () => UI.doAct(b.dataset.act);
  },
  async doAct(id) {
    if (id === 'retire') { $('#retire-confirm').hidden = false; return; }
    if (id === 'retire-no') { $('#retire-confirm').hidden = true; return; }
    if (id === 'retire-yes') { Game.ending('retired'); return UI.showEnding(); }
    for (const h of UI.actionHandlers || []) if (h(id)) return;
    const [kind, a, b] = id.split(':');
    let out = null;
    if (kind === 'fac') out = Game.factionAction(a, b);
    if (kind === 'world') out = Game.countryAction(a, b);
    if (kind === 'eco') out = Game.economyAction(a);
    if (kind === 'dec') out = Game.decree(a, b);
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

  clubTable(score) {
    const yrs = Math.round(S.turn / 4 * 10) / 10;
    const start = ERAS[S.era].start;
    const me = { name: `${S.leader.title} ${S.leader.name}`, land: S.country, span: `${start}–${S.year}`, years: yrs, note: `Это вы. Сложность: ${Game.diff().name}.`, me: true };
    const real = DICTATOR_CLUB[S.era] || DICTATOR_CLUB['1960'];
    const list = [...real, me].sort((a, b) => b.years - a.years || (a.me ? 1 : -1));
    const rank = list.indexOf(me) + 1;
    const above = list[rank - 2], below = list[rank];
    const level = PLAYER_LEVELS.find(([t]) => score < t)[1];
    const yWord = n => { const k = Math.floor(n); return Number.isInteger(n) ? (k % 10 === 1 && k % 100 !== 11 ? 'год' : [2, 3, 4].includes(k % 10) && ![12, 13, 14].includes(k % 100) ? 'года' : 'лет') : 'года'; };
    const cmp = below ? `дольше, чем ${below.name}${above ? `, но меньше, чем ${above.name}` : ''}` : `меньше всех в клубе. Даже ${above.name} продержался ${above.years} ${yWord(above.years)}`;
    return `<section class="club"><div class="eyebrow">Клуб диктаторов эпохи</div>
      <p class="club-verdict">Ваше звание: <b>${level}</b> (${score} ${score % 10 === 1 && score % 100 !== 11 ? 'очко' : [2, 3, 4].includes(score % 10) && ![12, 13, 14].includes(score % 100) ? 'очка' : 'очков'}). У власти — <b>${String(yrs).replace('.', ',')} ${yWord(yrs)}</b>: ${esc(cmp)}. Место по сроку правления: <b>${rank} из ${list.length}</b>.</p>
      <ol class="club-list">${list.map((d, i) => `<li class="${d.me ? 'me' : ''}"><span class="club-n">${i + 1}</span><span class="club-who"><b>${esc(d.name)}</b><span class="muted small">${esc(d.land)}, ${esc(d.span)}. ${esc(d.note)}</span></span><span class="club-score">${String(d.years).replace('.', ',')} ${yWord(d.years)}</span></li>`).join('')}</ol>
      <p class="muted small">Сроки — годы фактической власти по общепринятым датам. Партия длится не больше десяти лет, поэтому догнать долгожителей нельзя: это справка о том, чем на деле кончали правители вашей эпохи. Звание считается по очкам: кварталы у власти, швейцарский счёт, любовь народа и экономика, плюс бонус за то, что дожили до конца десятилетия. Множитель сложности: ×${Game.diff().score}.</p></section>`;
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
          <div class="rep-stat"><span>🏦 ${Game.bank().short}</span><b>${Math.round(S.swiss)} млн</b></div>
          <div class="rep-stat"><span>👥 Народ</span><b>${Math.round(S.support)}</b></div>
          <div class="rep-stat"><span>🏭 Экономика</span><b>${Math.round(S.economy)}</b></div>
          <div class="rep-stat"><span>👁️ Страх</span><b>${Math.round(S.fear)}</b></div>
          <div class="rep-stat"><span>★ Оценка историков</span><b>${F.score}</b></div>
        </div>
        ${UI.clubTable(F.score)}
        <button class="btn big" id="btn-again">Новый режим</button>
      </div>`;
    $('#btn-again').onclick = () => { Game.clearSave(); UI.startSetup(); };
  },
};

// ---------- модальное окно ----------
const Modal = {
  open(html, btn = 'Дальше', size = '') {
    return new Promise(resolve => {
      const m = $('#modal');
      m.querySelector('.modal-card').classList.toggle('wide', size === 'wide');
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
          const fxPrev = c.chance || c.hidePreview ? [] : Game.previewFx(c.fx);
          const advs = (c.adv || []).filter(r => S.adv[r]).map(r => `<span class="adv-tag" title="Советует: ${esc(S.adv[r].name)}">${Portrait.svg(S.adv[r].look)}</span>`).join('');
          return `<button class="choice" data-k="${k}" ${ok ? '' : 'disabled'}>
            <span class="choice-text">${esc(Game.fmt(c.text))}</span>
            <span class="choice-meta">${advs}${p !== null ? `<span class="hint">🎲 шанс ≈ ${Math.round(p * 100)}%</span>` : ''}${c.hidePreview ? '<span class="hint">❓ исход зависит от того, правда ли это</span>' : ''}${fxPrev.slice(0, 7).map(f => `<span class="hint ${f.inv ? 'neutral' : f.d > 0 ? 'up' : f.d < 0 ? 'down' : 'neutral'}" title="${esc(f.label)}">${f.flag ? flagSvg(f.flag) : f.icon}${esc(f.text || sign(f.d))}</span>`).join('')}${!ok ? `<span class="hint down">${esc(c.reqText || 'недоступно')}</span>` : ''}</span>
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
        // в газету попадают только публичные события, и в официальной подаче
        const pub = scene.id && typeof EVENT_PRESS !== 'undefined' && EVENT_PRESS[scene.id];
        if (Game.pressAdd && pub) Game.pressAdd({ kind: 'event', id: scene.id, head: Game.fmt(pub[0]), text: Game.fmt(pub[1]) });
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
    return `<div class="chart"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Динамика показателей">${grid}${paths}${empty}<text x="${pl}" y="${h - 6}" class="axis">${ERAS[S.era].start}</text><text x="${w - pr}" y="${h - 6}" text-anchor="end" class="axis">${Game.dateLabel()}</text></svg><div class="legend">${legend}</div></div>`;
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
