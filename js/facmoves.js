// Ходы движений: довольные помогают, недовольные вредят, доведённые до края приходят с ультиматумом.
const FAC_MOVES = {
  hawks: {
    bad: [
      { t: (L, D) => `${L} лично проверяет каждую бумагу из дворца, приказы «теряются» в штабе. В следующем квартале у вас на один приказ меньше.`, fx: { army: -2 }, ap: 1 },
      { t: (L, D) => `Офицеры не вышли на смотр. «Учения», — объяснил ${L}. В казармах шепчутся.`, fx: { army: -4, fear: -2 } },
      { t: (L, D) => `${L} обедает с послами без вас. Генералы считают, сколько полков пойдёт за ним.`, fx: { army: -3 }, coup: 0.05 },
    ],
    good: [
      { t: (L, D) => `${L} провёл учения за счёт армии и пригласил вас на трибуну. Солдаты кричали «ура!».`, fx: { army: 4, fear: 2 } },
      { t: (L, D) => `Офицеры сами выследили контрабандистов и сдали трофеи в казну.`, fx: { treasury: 5, army: 2 } },
    ],
  },
  oligarchs: {
    bad: [
      { t: (L, D) => `Бегство капитала: «${D}» переводят деньги за границу. Банки опустели.`, fx: { treasury: -8, economy: -2 } },
      { t: (L, D) => `${L} «временно» закрыл три фабрики. Рабочих отправили по домам.`, fx: { economy: -4, support: -2 } },
    ],
    good: [
      { t: (L, D) => `${L} пожертвовал на нужды дворца. От души и с намёком.`, fx: { treasury: 8 } },
      { t: (L, D) => `«${D}» открыли новое предприятие и назвали его в вашу честь.`, fx: { economy: 3, support: 1 } },
    ],
  },
  left: {
    bad: [
      { t: (L, D) => `Забастовка: «${D}» остановили порт и железную дорогу на неделю.`, fx: { economy: -3, treasury: -5 } },
      { t: (L, D) => `Листовки «${D}» на каждом заборе. ${L} зовёт на митинг против дворца.`, fx: { support: -3 } },
    ],
    good: [
      { t: (L, D) => `«${D}» вышли на субботник: убрали улицы и починили школу.`, fx: { economy: 2, support: 2 } },
      { t: (L, D) => `${L} уговорил профсоюзы не бастовать в этом квартале. Порт работает без перебоев.`, fx: { economy: 3 } },
    ],
  },
  liberals: {
    bad: [
      { t: (L, D) => `${L} дал интервью иностранной прессе о «диктатуре». Перепечатали в трёх столицах.`, fx: { support: -2, rel: { $west: -4 } } },
      { t: (L, D) => `«${D}» устроили сидячую забастовку у университета. Занятия сорваны.`, fx: { support: -3, economy: -1 } },
    ],
    good: [
      { t: (L, D) => `Молодые специалисты из «${D}» помогли министерству составить бюджет без ошибок.`, fx: { economy: 3, treasury: 3 } },
      { t: (L, D) => `${L} похвалил ваши реформы в интервью за границей.`, fx: { rel: { $west: 4 }, support: 1 } },
    ],
  },
  faith: {
    bad: [
      { t: (L, D) => `${L} в проповеди говорил о «правителях, забывших Бога». Её пересказывают на рынках.`, fx: { support: -4 } },
      { t: (L, D) => `Духовенство отказалось благословить новый мост. Люди обходят его стороной.`, fx: { support: -2, economy: -1 } },
    ],
    good: [
      { t: (L, D) => `${L} призвал верующих молиться за ваше здоровье. Пришла вся столица.`, fx: { support: 4 } },
      { t: (L, D) => `Приюты и больницы «${D}» взяли на себя заботу о бедных. Казне легче.`, fx: { treasury: 4, support: 1 } },
    ],
  },
  new: {
    bad: [
      { t: (L, D) => `«${D}» сорвали торжественное заседание: свист, листовки, давка у входа.`, fx: { support: -3, fear: 1 } },
      { t: (L, D) => `${L} собрал сторонников на площади. Полиция стояла и смотрела.`, fx: { support: -2, fear: -2 } },
    ],
    good: [
      { t: (L, D) => `«${D}» устроили шествие в вашу поддержку. Шумно, но приятно.`, fx: { support: 3 } },
    ],
  },
};
// Ультиматум: что даёт уступка и что будет, если проигнорировать
const FAC_ULT = {
  hawks: { ask: 'Армии нужны деньги и уважение. Повысьте жалованье офицерам — или мы решим вопрос сами.', give: { treasury: -15, army: 5 }, ignore: { army: -8, flag: { hawkPlot: '$turn' } }, ignoreText: 'Генералы перестали отвечать на звонки. В штабе всю ночь горит свет.' },
  oligarchs: { ask: 'Снизьте налоги и уберите профсоюзы с наших заводов. Иначе деньги уйдут туда, где их уважают.', give: { treasury: -8, fac: { left: { a: -8 } } }, ignore: { treasury: -20, economy: -5 }, ignoreText: 'За неделю из страны ушли миллионы. Банки закрывают отделения.' },
  left: { ask: 'Хлеб, работа и земля. Поднимите зарплаты — или мы остановим всю страну.', give: { treasury: -10, fac: { oligarchs: { a: -8 } } }, ignore: { economy: -8, treasury: -10, support: -3 }, ignoreText: 'Всеобщая забастовка: не ходят поезда, не работают порт и рынки.' },
  liberals: { ask: 'Освободите политзаключённых и разрешите свободную прессу. Мир смотрит на вас.', give: { fear: -6, fac: { hawks: { a: -6 } }, rel: { $west: 5 } }, ignore: { support: -8, rel: { $west: -6 } }, ignoreText: 'Сто тысяч человек вышли на улицы столицы. Иностранные телеканалы ведут прямой эфир.' },
  faith: { ask: 'Верните нам школы и уважение к вере. Иначе с каждой кафедры прозвучит, кто вы такой.', give: { fac: { liberals: { a: -6 } }, support: 2 }, ignore: { support: -10 }, ignoreText: 'Духовенство объявило вам бойкот. В храмах молятся за «скорую перемену власти».' },
  new: { ask: 'Нас нельзя не замечать. Дайте нам голос — или мы возьмём его сами.', give: { treasury: -6, fac: { liberals: { a: 3 } } }, ignore: { support: -5, fear: 2 }, ignoreText: 'Беспорядки в центре столицы. Витрины, дым, полиция в растерянности.' },
};
const facScale = (fx, k) => {
  const o = {};
  for (const [key, v] of Object.entries(fx)) {
    if (typeof v === 'number') o[key] = Math.round(v * k) || Math.sign(v);
    else if (key === 'rel' || key === 'fac') o[key] = JSON.parse(JSON.stringify(v, (kk, vv) => (typeof vv === 'number' ? Math.round(vv * k) || Math.sign(vv) : vv)));
    else o[key] = v;
  }
  return o;
};

Object.assign(Game, {
  facMood(f) {
    const F = S.fac[f]; if (!F) return null;
    if (F.a <= 20 && F.s >= 45 && F.st !== 'banned') return 'ult';
    if (F.a < 35 && F.s >= 25) return 'bad';
    if (F.a >= 65 && F.s >= 20 && F.st !== 'banned') return 'good';
    return 'calm';
  },
  facUltScene(f) {
    const D = Game.facDef(f), U = FAC_ULT[f] || FAC_ULT.new, st = Game.facState(f);
    st.ultAt = S.turn;
    return {
      title: `Ультиматум: ${D.name}`, bg: f === 'hawks' ? 'office' : 'square',
      lines: [
        ['narrator', `${Game.leader(f).name} пришёл во дворец без приглашения. За воротами ждут сторонники.`],
        [`npc:facleader:${f}`, U.ask],
        ['police', f === 'hawks' ? 'Это не просьба, это пробный выстрел. Если откажете, следующей встречи может не быть.' : 'Если откажете, они ударят по самому больному. Если уступите, остальные решат, что на вас можно давить.'],
      ],
      choices: [
        { text: 'Уступить', fx: { ...U.give, fac: { ...(U.give.fac || {}), [f]: { a: 25 } } }, res: `${Game.leader(f).name} уходит довольным. Остальные движения внимательно смотрят, что ещё можно у вас выпросить.` },
        { text: 'Откупиться лично', adv: ['economy'], req: S => S.treasury >= 20, reqText: 'нужно 20 млн', fx: { treasury: -20, fac: { [f]: { a: 18 } } }, res: 'Конверт был толстым. Ультиматум отложен — до следующего раза.' },
        { text: 'Арестовать лидера', adv: ['police'], chance: () => clamp(0.55 + S.adv.police.comp * 0.1 - S.fac[f].s / 300, 0.2, 0.8),
          win: { fx: { fear: 5, fac: { [f]: { s: -12, a: -8 } } }, res: 'Лидера взяли прямо во дворе дворца. Движение растеряно и затихло.' },
          lose: { fx: { fear: 3, support: -4, fac: { [f]: { s: 8, a: -10 } } }, res: 'Арест превратил лидера в мученика. Его портреты теперь на каждом заборе.' } },
        { text: 'Выставить за дверь', fx: { ...U.ignore, fac: { [f]: { a: -8, s: 3 } } }, res: U.ignoreText },
      ],
    };
  },
});
// Генералы, которым отказали, готовят заговор два квартала
Game.coupHooks.push(() => (S.flags.hawkPlot !== undefined && S.turn - S.flags.hawkPlot <= 2 ? 0.15 : 0));
// Саботаж приказов
const _apTurn = Game.apTurn;
Game.apTurn = () => { const pen = S.flags.apPenalty || 0; S.flags.apPenalty = 0; return Math.max(1, _apTurn() - pen); };

// Конец квартала: движения делают ходы
Game.quarterHooks.push(rep => {
  if (S.tutorial) return;
  S.facMoves = S.facMoves || {};
  const cand = [];
  for (const f of Object.keys(S.fac)) {
    const F = S.fac[f], m = Game.facMood(f);
    if (m === 'bad' || m === 'ult') cand.push({ f, good: false, p: Math.min(0.85, 0.25 + (35 - F.a) / 70 + F.s / 200) });
    else if (m === 'good') cand.push({ f, good: true, p: Math.min(0.6, 0.2 + (F.a - 65) / 100 + F.s / 300) });
  }
  let n = 0;
  for (const c of cand.sort(() => Math.random() - 0.5)) {
    if (n >= 2 || Math.random() >= c.p) continue;
    const F = S.fac[c.f], set = (FAC_MOVES[c.f] || FAC_MOVES.new)[c.good ? 'good' : 'bad'];
    const prev = (S.facMoves[c.f] || {}).i, opts = set.map((m, i) => i).filter(i => set.length < 2 || i !== prev);
    const mi = pick(opts), mv = set[mi], k = 0.6 + F.s / 100;
    const text = mv.t(Game.leader(c.f).name, Game.facDef(c.f).name);
    Game.apply(facScale(mv.fx, k), { silent: true });
    if (mv.ap) S.flags.apPenalty = 1;
    if (mv.coup) S.flags.hawkPlot = S.turn;
    S.facMoves[c.f] = { turn: S.turn, text, good: c.good, i: mi };
    rep[c.good ? 'lines' : 'warn'].push(`${c.good ? '🤝' : '⚠️'} ${Game.facDef(c.f).name}: ${text}`);
    Game.log(`${Game.facDef(c.f).name}: ${text}`);
    n++;
  }
});
// Начало квартала: ультиматум от движения на грани
Game.forcedList.push(() => {
  if (S.tutorial || S.over || S.turn < 3) return null;
  const list = Object.keys(S.fac).filter(f => Game.facMood(f) === 'ult' && S.turn - (Game.facState(f).ultAt ?? -99) >= 6);
  if (!list.length) return null;
  const f = list.sort((a, b) => S.fac[a].a - S.fac[b].a)[0];
  return Game.facUltScene(f);
});

// Настроение и последний ход на карточке движения
Object.assign(UI, {
  facMood(f) {
    const m = Game.facMood(f), mv = (S.facMoves || {})[f];
    const lbl = { good: ['good', '🤝 Довольны — помогают'], calm: ['', 'Выжидают'], bad: ['bad', '⚠️ Недовольны — вредят'], ult: ['ult', '🔥 На грани ультиматума'] }[m];
    const ago = mv ? S.turn - mv.turn : null;
    return `<div class="fac-mood ${lbl[0]}"><b>${lbl[1]}</b>${mv && ago <= 4 ? `<span class="muted small">${ago <= 1 ? 'В прошлом квартале' : `${ago} кв. назад`}: ${esc(mv.text)}</span>` : ''}</div>`;
  },
});
