// Обучение: партия за революционного вождя Латинской Америки 1960-х. Четыре квартала с наставником.
const TUT_MENTOR = {
  name: 'Дон Педро, старый партизан и ваш учитель',
  look: { skin: '#d9a273', face: 'long', hair: 'short', hairColor: '#bbb', beard: 'full', mustache: 'thick', brows: 'bushy', browColor: '#ccc', mouth: 'smirk', hat: 'beret', hatColor: '#1a1a1a', outfit: 'military', outfitColor: '#556b2f', medals: 0, cigar: true },
};
const _tutNpc = npcLook;
npcLook = function (key, region) { return key === 'mentor' ? TUT_MENTOR : _tutNpc(key, region); };

// Уроки: вступительная сцена и задания на квартал
const TUT_LESSONS = [
  {
    title: 'Урок 1. Как устроена власть',
    lines: [
      ['npc:mentor', 'Ну здравствуй, Че. Вчера ты взял дворец, сегодня тебе его удерживать. Это труднее. Я покажу, как здесь всё устроено.'],
      ['npc:mentor', 'Наверху — шесть шкал: казна, экономика, народ, армия, страх и твой счёт в Швейцарии. Если армия падает ниже 45, а генералы злы, жди переворота. Если народ ниже 30, а левые сильны, жди революции.'],
      ['npc:mentor', 'Каждый квартал у тебя два приказа: переговоры с движениями, указы, визиты, поручения министрам. Приказы не копятся, трать их.'],
      ['npc:mentor', 'Бюджет меняется без приказов: ползунками на вкладке «Бюджет». Это бесплатно, но у каждого песо есть обиженные.'],
      ['npc:mentor', 'Задания на этот квартал — в карточке над вкладками. Сделаешь — жми «Завершить квартал». Пока я рядом, генералы и партизаны подождут.'],
    ],
    tasks: [
      { id: 'talk', text: 'Проведите переговоры с любым движением', hint: 'Вкладка «Движения» → кнопка «Переговоры».', tab: 'factions' },
      { id: 'budget', text: 'Сдвиньте любой ползунок бюджета', hint: 'Вкладка «Бюджет». Справа виден прогноз на квартал.', tab: 'budget' },
      { id: 'end', text: 'Завершите квартал', hint: 'Кнопка «Завершить квартал» вверху справа.' },
    ],
  },
  {
    title: 'Урок 2. Газета, доклад и указы',
    lines: [
      ['npc:mentor', 'Видел газету? Её печатает твой министр пропаганды, поэтому там всегда всё хорошо. Но читай внимательно: мировые события бьют по ценам и по соседям.'],
      ['npc:mentor', 'Перед газетой был секретный доклад: что изменилось за квартал и о чём шепчутся. Красные строки — тревога. Не пропускай их.'],
      ['npc:mentor', 'Указы — твой главный инструмент. Внешние, социальные, экономические и абсурдные. Под каждым указом видно, что он сделает: сразу и потом.'],
      ['npc:mentor', 'И загляни во вкладку «Мир». Державы иногда о чём-то просят — не больше двух сразу. Выполнишь вовремя — полюбят. Затянешь — обидятся.'],
    ],
    tasks: [
      { id: 'decree', text: 'Подпишите любой указ', hint: 'Вкладка «Указы» → выберите раздел → «Подписать».', tab: 'decrees' },
      { id: 'world', text: 'Загляните во вкладку «Мир»', hint: 'Отношения, договоры и просьбы держав.', tab: 'world' },
      { id: 'end', text: 'Завершите квартал', hint: 'Кнопка «Завершить квартал».' },
    ],
  },
  {
    title: 'Урок 3. Холодная война и министры',
    lines: [
      ['npc:mentor', 'Теперь самое важное для шестидесятых. Вашингтон и Москва торгуются за таких, как мы. Их послы приходят сами, без приглашения.'],
      ['npc:mentor', 'Сейчас придёт один из них. Можно согласиться, поторговаться, отказать или пожаловаться другой стороне. Отказ пополняет досье их разведки.'],
      ['npc:mentor', 'Толстое досье ЦРУ — это заговор полковников. Толстое досье КГБ — автоматы у партизан. Смотри на вкладку «Холодная война»: там видно оба досье.'],
      ['npc:mentor', 'И не забывай министров. У каждого своё поручение на вкладке «Советники». Лояльность ниже 25 — и министр может предать.'],
    ],
    tasks: [
      { id: 'coldwar', text: 'Откройте вкладку «Холодная война»', hint: 'Досье ЦРУ и КГБ, аукцион лояльности, соседи по региону.', tab: 'coldwar' },
      { id: 'advisors', text: 'Загляните к советникам', hint: 'Вкладка «Советники»: поручения, лояльность, проекты.', tab: 'advisors' },
      { id: 'end', text: 'Завершите квартал', hint: 'Кнопка «Завершить квартал».' },
    ],
  },
  {
    title: 'Выпускной',
    lines: [
      ['npc:mentor', 'Всё, Че. Дальше сам. Я ухожу на покой: буду выращивать табак и ругать молодёжь.'],
      ['npc:mentor', 'Будут случайные события, капризы министров, требования движений. В 1964 или 1965 году — выборы. Вашингтон очень любит выборы.'],
      ['npc:mentor', 'Твоя цель — дожить до 1970 года у власти. А лучше ещё и с приличным счётом в Швейцарии. Это, как говорится, на старость.'],
      ['npc:mentor', 'Партия продолжается с этого места. Генералы и партизаны больше не ждут. Удачи, команданте.'],
    ],
    tasks: [],
  },
];

Object.assign(UI, {
  startTutorial() {
    Game.newGame({
      era: '1960', region: 'latam', regime: 'revolution', diff: 'normal', name: 'Че Суровый', title: 'Команданте', country: REGIONS.latam.country,
      look: { skin: SKIN.tan, face: 'long', hair: 'long', hairColor: '#1a1410', beard: 'full', mustache: 'thick', brows: 'bushy', mouth: 'flat', hat: 'beret', hatColor: '#1a1a1a', glasses: 'none', outfit: 'military', outfitColor: '#556b2f', medals: 1, cigar: true },
    });
    S.tutorial = { lesson: 0, did: {}, budget: JSON.stringify(S.budget) };
    Game.cw().nextDemarche = 2; // посол придёт в третьем уроке
    Game.save();
    document.body.dataset.era = S.era;
    UI.show('screen-game');
    UI.tab = 'cabinet';
    UI.render();
    VN.play({ title: TUT_LESSONS[0].title, bg: 'palace', lines: TUT_LESSONS[0].lines }).then(() => { S.phase = 'hub'; Game.save(); UI.render(); });
  },
  tutBanner() {
    const T = S.tutorial, L = TUT_LESSONS[T.lesson];
    if (!L || !L.tasks.length) return '';
    const done = t => !!T.did[t.id];
    return `<section class="card tut"><div class="tut-pic">${Portrait.svg(TUT_MENTOR.look)}</div><div class="tut-body">
      <div class="eyebrow">Обучение · ${esc(L.title)}</div>
      <ul class="tut-list">${L.tasks.map(t => `<li class="${done(t) ? 'ok' : ''}"><span class="tut-check">${done(t) ? '✔' : '○'}</span><span><b>${esc(t.text)}</b><span class="muted small">${esc(t.hint)}</span></span></li>`).join('')}</ul>
      <p class="muted small">Пока идёт обучение, перевороты и революции вам не грозят, а случайные события начнутся с третьего квартала.</p></div></section>`;
  },
});

// Отметки о выполненных заданиях
const tutMark = id => { if (S && S.tutorial) S.tutorial.did[id] = true; };
const _tutFac = Game.factionAction;
Game.factionAction = (f, act) => { const r = _tutFac(f, act); if (r) tutMark('talk'); return r; };
const _tutDec = Game.decree;
Game.decree = (cat, id) => { const r = _tutDec(cat, id); if (r) tutMark('decree'); return r; };
const _tutRender = UI.render;
UI.render = function () {
  if (S && S.tutorial) {
    const T = S.tutorial;
    for (const id of ['world', 'coldwar', 'advisors']) if (UI.tab === id) tutMark(id);
    if (JSON.stringify(S.budget) !== T.budget) tutMark('budget');
  }
  _tutRender.call(UI);
  const body = document.querySelector('#tab-body');
  for (const b of document.querySelectorAll('.tabs button')) b.classList.remove('tut-hint');
  if (S && S.tutorial && body) {
    body.insertAdjacentHTML('afterbegin', UI.tutBanner());
    const L = TUT_LESSONS[S.tutorial.lesson];
    const next = L && L.tasks.find(t => !S.tutorial.did[t.id]);
    if (next && next.tab) { const b = document.querySelector(`.tabs button[data-tab="${next.tab}"]`); if (b) b.classList.add('tut-hint'); }
    for (const el of document.querySelectorAll('[data-slider], [data-preset], [data-netctl]')) el.addEventListener(el.dataset.slider ? 'change' : 'click', () => { if (S.tutorial && !S.tutorial.did.budget) { tutMark('budget'); setTimeout(() => UI.render(), 0); } });
    if (next && next.id === 'end') document.querySelector('#btn-end').classList.add('tut-hint'); else document.querySelector('#btn-end').classList.remove('tut-hint');
  } else { const e = document.querySelector('#btn-end'); if (e) e.classList.remove('tut-hint'); }
};
// Новый квартал: следующий урок раньше всех остальных сцен
Game.forcedList.unshift(() => {
  if (!S.tutorial || S.turn === 0) return null;
  const T = S.tutorial;
  T.lesson = Math.min(S.turn, TUT_LESSONS.length - 1);
  T.did = {}; T.budget = JSON.stringify(S.budget);
  const L = TUT_LESSONS[T.lesson];
  if (T.lesson === TUT_LESSONS.length - 1) S.tutorial = null; // выпускной: дальше обычная партия
  return { title: L.title, bg: 'palace', lines: L.lines };
});
// Во время обучения нет случайных событий в первых двух кварталах, визитов советников и угроз
const _tutDraw = Game.drawEvent;
Game.drawEvent = () => (S.tutorial && S.turn < 2 ? null : _tutDraw());
const _tutAdv = Game.advisorScene;
Game.advisorScene = () => (S.tutorial ? null : _tutAdv());
Game.coupHooks.push(() => (S.tutorial ? -1 : 0));
Game.revHooks.push(() => (S.tutorial ? -1 : 0));

document.querySelector('#btn-tutorial').onclick = () => UI.startTutorial();
