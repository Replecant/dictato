// Обучение: партия за команданте Че Сурового, Латинская Америка, 1960. Дон Педро водит по вкладкам.
const TUT_MENTOR = {
  name: 'Дон Педро, старый партизан и ваш учитель',
  look: { skin: '#d9a273', face: 'long', hair: 'short', hairColor: '#bbb', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ccc', mouth: 'smirk', hat: 'beret', hatColor: '#1a1a1a', outfit: 'military', outfitColor: '#556b2f', medals: 0, cigar: true },
};
const _tutNpc = npcLook;
npcLook = function (key, region) { return key === 'mentor' ? TUT_MENTOR : _tutNpc(key, region); };

// Шаги экскурсии: tab — какую вкладку открыть, at — что подсветить, wait — какое действие ждать, run — что сделать по кнопке
const TUT_LESSONS = [
  {
    title: 'Урок 1. Как устроена власть',
    intro: [['npc:mentor', 'Ну здравствуй, Че. Вчера ты взял дворец, сегодня его надо удержать. Это труднее. Пойдём, покажу хозяйство.']],
    steps: [
      { tab: 'cabinet', at: '.stats', text: 'Это шесть шкал твоей власти: казна, экономика, народ, армия, страх и счёт в Швейцарии. Полоска внизу показывает, где опасно.' },
      { at: '.risk-row', text: 'А здесь — главные угрозы. Армия ниже 45 и злые генералы — жди переворота. Народ ниже 30 и сильные левые — жди революции.' },
      { at: '.hdr-ap', text: 'Кружки — это приказы. Их два в квартал, и они не копятся. Переговоры, указы, визиты, поручения министрам — всё стоит приказ.' },
      { tab: 'factions', at: '.card.fac', text: 'Это движения. У каждого есть сила (сколько у них людей) и одобрение (что они думают о тебе), а ещё лидер со своим характером.' },
      { at: '[data-act$=":talk"]', wait: 'talk', text: 'Попробуй сам: нажми «Переговоры» с этим или любым другим движением. Это стоит один приказ.' },
      { tab: 'budget', at: '.br', wait: 'budget', text: 'Бюджет меняется бесплатно, без приказов. Сдвинь любой ползунок — и сразу увидишь, кто обрадуется, а кто обидится.' },
      { at: '#bf', text: 'Справа — прогноз на квартал: доходы, расходы и что бюджет сделает со страной. Минус в казне генералы не прощают.' },
      { at: '#btn-end', text: 'Когда приказы потрачены, жми «Завершить квартал». Придёт секретный доклад, а потом газета. Я подожду.', last: true },
    ],
  },
  {
    title: 'Урок 2. Указы и мир',
    intro: [['npc:mentor', 'Видел газету и доклад? Газету пишет твой министр пропаганды, поэтому там всегда всё хорошо. А доклад — для тебя: красные строки — тревога.']],
    steps: [
      { tab: 'decrees', at: '.dtabs', text: 'Указы — твой главный инструмент. Внешние, социальные, экономические и абсурдные. Абсурдные, кстати, народ любит больше всего.' },
      { at: '.proj-item.dec', text: 'Под каждым указом видно, что он сделает: сразу и потом, через несколько кварталов. Повторные указы слабеют.' },
      { at: '.dec-grid', wait: 'decree', text: 'Подпиши любой указ, который по карману казне. Жми «Подписать».' },
      { tab: 'world', at: '.card.country', text: 'Это «Мир». У каждой страны есть отношения с тобой. Торговый договор приносит деньги, союз защищает от переворота.' },
      { at: '.demand, .card.country .acts', text: 'Иногда державы о чём-то просят, не больше двух сразу. Выполнишь вовремя — полюбят, затянешь — обидятся.' },
      { at: '#btn-end', text: 'На сегодня всё. Завершай квартал, а в следующем поговорим о самом важном для шестидесятых.', last: true },
    ],
  },
  {
    title: 'Урок 3. Холодная война и министры',
    intro: [['npc:mentor', 'Теперь главное. Вашингтон и Москва торгуются за таких, как мы. Пойдём на вкладку «Холодная война».']],
    steps: [
      { tab: 'coldwar', at: '.cw', text: 'Слева США, справа СССР. Интерес — сколько они готовы платить. Досье — сколько на тебя накопила их разведка. Толстое досье ЦРУ — это заговор полковников, толстое досье КГБ — автоматы у партизан.' },
      { at: '.cw-neigh', text: 'Соседи по региону. Когда они переходят к Москве, Вашингтон начинает ценить тебя больше. И наоборот.' },
      { at: '.proj.dec-grid', text: 'Здесь твои ходы: аукцион лояльности, советники, шантаж, «проект века» за чужой счёт. Но чаще державы приходят сами.' },
      { at: '.cw', text: 'Слышишь машину у ворот? Это посол. Не пугайся: можно согласиться, поторговаться, отказать или пожаловаться другой стороне.', run: 'demarche', btn: 'Принять посла' },
      { tab: 'advisors', at: '.card.adv', text: 'И не забывай министров. У каждого своё поручение, лояльность и компетентность. Лояльность ниже 25 — и министр может предать.' },
      { at: '#btn-end', text: 'Вот и всё, что я хотел показать. Завершай квартал, и я скажу последнее слово.', last: true },
    ],
  },
  {
    title: 'Выпускной',
    intro: [
      ['npc:mentor', 'Всё, Че. Дальше сам. Я ухожу на покой: буду выращивать табак и ругать молодёжь.'],
      ['npc:mentor', 'Будут случайные события, капризы министров, требования движений. В 1964 или 1965 году — выборы. Вашингтон очень любит выборы.'],
      ['npc:mentor', 'Твоя цель — дожить до 1970 года у власти. А лучше ещё и с приличным счётом в Швейцарии. Генералы и партизаны больше не ждут. Удачи, команданте.'],
    ],
    steps: [],
  },
];

const Tour = {
  el: null,
  ensure() {
    if (Tour.el) return;
    const d = document.createElement('div');
    d.id = 'tour';
    d.hidden = true;
    d.innerHTML = '<div class="tour-spot"></div><div class="tour-bubble" role="dialog" aria-live="polite"></div>';
    document.body.appendChild(d);
    Tour.el = d;
    window.addEventListener('resize', () => Tour.place());
    window.addEventListener('scroll', () => Tour.place(), { passive: true });
  },
  step() { const T = S && S.tutorial; if (!T || T.step < 0) return null; const L = TUT_LESSONS[T.lesson]; return (L && L.steps[T.step]) || null; },
  start(lesson) {
    Object.assign(S.tutorial, { lesson, step: 0, did: {}, budget: JSON.stringify(S.budget) });
    Game.save(); Tour.go();
  },
  go() {
    Tour.ensure();
    const st = Tour.step();
    if (!st) { Tour.el.hidden = true; return; }
    if (st.tab && UI.tab !== st.tab) { UI.tab = st.tab; UI.render(); return; } // render снова вызовет go
    Tour.draw();
  },
  draw() {
    Tour.ensure();
    const st = Tour.step();
    if (!st) { Tour.el.hidden = true; return; }
    const T = S.tutorial, L = TUT_LESSONS[T.lesson];
    if (st.wait && T.did[st.wait] && !st.last) { T.step++; Game.save(); return Tour.go(); } // действие сделано — дальше
    Tour.el.hidden = !document.querySelector('#vn').hidden || !document.querySelector('#modal').hidden;
    const b = Tour.el.querySelector('.tour-bubble');
    b.innerHTML = `<div class="tour-pic">${Portrait.svg(TUT_MENTOR.look)}</div><div class="tour-body">
      <div class="eyebrow">${esc(L.title)} · шаг ${T.step + 1} из ${L.steps.length}</div>
      <p>${esc(st.text)}</p>
      <div class="tour-btns">${st.wait ? '<span class="tour-wait">Сделайте это — и пойдём дальше</span>' : st.last ? '<button class="btn small" data-tour="close">Понятно</button>' : `<button class="btn small" data-tour="next">${esc(st.btn || 'Дальше ▸')}</button>`}
      <button class="btn small ghost" data-tour="skip">Пропустить обучение</button></div></div>`;
    b.querySelector('[data-tour="skip"]').onclick = () => Tour.skip();
    const nx = b.querySelector('[data-tour="next"]'); if (nx) nx.onclick = () => Tour.next();
    const cl = b.querySelector('[data-tour="close"]'); if (cl) cl.onclick = () => { S.tutorial.step = -1; Game.save(); Tour.el.hidden = true; UI.render(); };
    const t = document.querySelector(st.at);
    if (t) t.scrollIntoView({ block: 'center' });
    Tour.place();
  },
  place() {
    const st = Tour.step(); if (!st || !Tour.el || Tour.el.hidden) return;
    const t = document.querySelector(st.at);
    const spot = Tour.el.querySelector('.tour-spot'), b = Tour.el.querySelector('.tour-bubble');
    const vw = window.innerWidth, vh = window.innerHeight;
    const bw = Math.min(440, vw - 32);
    b.style.width = `${bw}px`;
    if (!t) { spot.style.display = 'none'; b.style.left = `${Math.max(16, vw / 2 - bw / 2)}px`; b.style.top = '120px'; return; }
    const r = t.getBoundingClientRect(), pad = 8;
    Object.assign(spot.style, { display: 'block', left: `${r.left - pad}px`, top: `${r.top - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px` });
    const bh = b.offsetHeight || 170;
    let top = r.bottom + 16;
    if (top + bh > vh - 12) top = r.top - bh - 16;
    if (top < 12) top = Math.max(12, Math.min(vh - bh - 12, r.top + 16));
    const left = Math.min(Math.max(16, r.left + r.width / 2 - bw / 2), vw - bw - 16);
    b.style.left = `${left}px`; b.style.top = `${top}px`;
  },
  next() {
    const st = Tour.step();
    S.tutorial.step++; Game.save();
    if (st && st.run === 'demarche') {
      Tour.el.hidden = true;
      VN.play(Game.cwDemarcheScene()).then(() => { S.phase = 'hub'; Game.save(); UI.render(); });
      return;
    }
    Tour.go();
  },
  skip() {
    S.tutorial = null; Game.save();
    if (Tour.el) Tour.el.hidden = true;
    UI.render(); UI.toast('Обучение пропущено. Партия продолжается как обычная.');
  },
};

Object.assign(UI, {
  startTutorial() {
    Game.newGame({
      era: '1960', region: 'latam', regime: 'revolution', diff: 'normal', name: 'Че Суровый', title: 'Команданте', country: REGIONS.latam.country,
      look: { skin: SKIN.tan, face: 'long', hair: 'long', hairColor: '#1a1410', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'flat', hat: 'beret', hatColor: '#1a1a1a', glasses: 'none', outfit: 'military', outfitColor: '#556b2f', medals: 1, cigar: true },
    });
    S.tutorial = { lesson: 0, step: -1, did: {}, budget: JSON.stringify(S.budget) };
    Game.cw().nextDemarche = 6; // первый посол приходит по сценарию урока 3
    Game.save();
    document.body.dataset.era = S.era;
    UI.show('screen-game');
    UI.tab = 'cabinet';
    UI.render();
    VN.play({ title: TUT_LESSONS[0].title, bg: 'palace', lines: TUT_LESSONS[0].intro }).then(() => { S.phase = 'hub'; UI.render(); Tour.start(0); });
  },
});

// Отметки о сделанном
const tutMark = id => { if (S && S.tutorial && !S.tutorial.did[id]) { S.tutorial.did[id] = true; setTimeout(() => Tour.draw(), 0); } };
const _tutFac = Game.factionAction;
Game.factionAction = (f, act) => { const r = _tutFac(f, act); if (r) tutMark('talk'); return r; };
const _tutDec = Game.decree;
Game.decree = (cat, id) => { const r = _tutDec(cat, id); if (r) tutMark('decree'); return r; };
const _tutRender = UI.render;
UI.render = function () {
  _tutRender.call(UI);
  if (!(S && S.tutorial)) { if (Tour.el) Tour.el.hidden = true; return; }
  for (const el of document.querySelectorAll('[data-slider], [data-preset], [data-netctl]')) el.addEventListener(el.dataset.slider ? 'change' : 'click', () => tutMark('budget'));
  if (S.tutorial.step >= 0) setTimeout(() => Tour.go(), 0);
};
// Новый квартал: короткое слово наставника, затем экскурсия по вкладкам
Game.forcedList.unshift(() => {
  if (!S.tutorial || S.turn === 0) return null;
  const n = Math.min(S.turn, TUT_LESSONS.length - 1), L = TUT_LESSONS[n];
  S.tutorial.lesson = n; S.tutorial.step = -1;
  if (n === TUT_LESSONS.length - 1) S.tutorial = null; // выпускной: дальше обычная партия
  else S.tutorial.pending = n;
  return { title: L.title, bg: 'palace', lines: L.intro };
});
// Экскурсия начинается, когда квартал дошёл до дворца
const _tutStartQ = UI.startQuarter;
UI.startQuarter = async function () {
  await _tutStartQ.call(UI);
  if (S.tutorial && S.tutorial.pending !== undefined && !S.over) { const n = S.tutorial.pending; delete S.tutorial.pending; Tour.start(n); }
};
// Во время обучения нет случайных событий в первых двух кварталах, визитов советников и угроз
const _tutDraw = Game.drawEvent;
Game.drawEvent = () => (S.tutorial && S.turn < 2 ? null : _tutDraw());
const _tutAdv = Game.advisorScene;
Game.advisorScene = () => (S.tutorial ? null : _tutAdv());
Game.coupHooks.push(() => (S.tutorial ? -1 : 0));
Game.revHooks.push(() => (S.tutorial ? -1 : 0));

document.querySelector('#btn-tutorial').onclick = () => UI.startTutorial();
