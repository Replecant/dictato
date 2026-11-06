// Холодная война (1960-е): сверхдержавы торгуются за вашу лояльность, а их разведки следят за каждым шагом.
const CW_NEIGHBORS = {
  latam: ['Санта-Эулалия', 'Сан-Хасинто', 'Нуэва-Гранада-дель-Сур', 'Пуэрто-Морадо', 'Исла-Верде'],
  asia: ['Мунтари', 'Кхамлонг', 'Острова Пинанг-Барат', 'Северный Вандан', 'Ратанакири-Нуэ'],
  africa: ['Верхний Казонго', 'Республика Лубало', 'Королевство Мсанга', 'Сахельская федерация', 'Порт-Эспуар'],
};
const SIDE = { us: { c: 'usa', name: 'США', who: 'Вашингтон', spy: 'ЦРУ' }, su: { c: 'ussr', name: 'СССР', who: 'Москва', spy: 'КГБ' } };

Object.assign(Game, {
  cw() {
    if (!S.cw) {
      S.cw = { int: { us: 35, su: 35 }, sus: { us: 10, su: 10 }, lastAuction: -10, projects: {} };
      S.cw.neigh = (CW_NEIGHBORS[S.region] || []).map((n, i) => ({ name: n, side: ['us', 'su', 'nam', 'us', 'su'][i] }));
    }
    return S.cw;
  },
  cwOffer(side) { return Math.round(8 + Game.cw().int[side] * 0.35); },
  cwActions() {
    const W = Game.cw();
    const ready = S.turn - W.lastAuction >= 4;
    const acts = [
      { id: 'auction', name: 'Аукцион лояльности', desc: `Пусть Вашингтон и Москва предложат цену. Сейчас: США ${Game.cwOffer('us')} млн, СССР ${Game.cwOffer('su')} млн. Выбрав одну сторону, вы разозлите разведку другой.`, cost: ready ? '1 приказ' : `через ${4 - (S.turn - W.lastAuction)} кв.`, ok: ready },
    ];
    for (const s of ['us', 'su']) {
      const o = s === 'us' ? 'su' : 'us';
      acts.push({ id: 'advisers:' + s, name: `Военные советники из ${s === 'us' ? 'США' : 'СССР'}`, desc: `Армия сильнее, ${SIDE[s].who} доволен, досье ${SIDE[o].spy} толстеет.`, cost: '1 приказ', ok: true,
        fx: { army: 6, rel: { [SIDE[s].c]: 8 }, cwInt: { [s]: 4 }, cwSus: { [o]: 10 }, fac: s === 'us' ? { hawks: { a: 4 }, left: { a: -4 } } : { left: { a: 5 }, oligarchs: { a: -4 } } } });
      acts.push({ id: 'bluff:' + s, name: `Пригрозить уходом к ${s === 'us' ? 'Москве' : 'Вашингтону'}`, desc: `Шантаж: ${SIDE[s].who} может заплатить, чтобы вы остались. Или обидеться. Шанс ${Math.round(Game.cwBluffChance(s) * 100)}%.`, cost: '1 приказ', ok: (S.rel[SIDE[s].c] || 0) >= 40 });
      const P = W.projects[s];
      acts.push({ id: 'project:' + s, name: s === 'us' ? 'Американский металлургический комбинат' : 'Советская ГЭС-гигант', desc: `«Проект века» за счёт ${s === 'us' ? 'США' : 'СССР'}. Через 6 кварталов экономика +10. Нужны отношения ≥ 55 и интерес ≥ 40.`, cost: P ? 'уже строится' : '−10 млн', ok: !P && (S.rel[SIDE[s].c] || 0) >= 55 && W.int[s] >= 40 && S.treasury >= 10,
        fx: { treasury: -10, rel: { [SIDE[s].c]: 10 }, cwInt: { [s]: -20 }, cwSus: { [o]: 8 }, schedule: [{ in: 6, fx: { economy: 10, support: 4 }, text: s === 'us' ? 'Американский металлургический комбинат дал первую сталь!' : 'Советская ГЭС-гигант дала первый ток!' }] } });
      acts.push({ id: 'expel:' + s, name: `Выслать резидентуру ${SIDE[s].spy}`, desc: `Досье ${SIDE[s].spy} на вас худеет, но ${SIDE[s].who} обижен.`, cost: '1 приказ', ok: true, danger: true, fx: { fear: 2, rel: { [SIDE[s].c]: -12 }, cwSus: { [s]: -20 } } });
    }
    acts.push({ id: 'un:us', name: 'Голосовать в ООН за США', desc: 'Вашингтон доволен, но начинает считать вас «своим» и меньше платит. Москва, наоборот, заинтересуется.', cost: '1 приказ', ok: true, fx: { rel: { usa: 6, ussr: -6 }, cwInt: { us: -3, su: 5 } } });
    acts.push({ id: 'un:su', name: 'Голосовать в ООН за СССР', desc: 'Москва довольна, но начинает считать вас «своим». Вашингтон заинтересуется.', cost: '1 приказ', ok: true, fx: { rel: { ussr: 6, usa: -6 }, cwInt: { su: -3, us: 5 } } });
    acts.push({ id: 'nam', name: 'Курс неприсоединения', desc: 'Обе разведки успокаиваются, но и платить вам будут меньше.', cost: '1 приказ', ok: true, fx: { rel: { india: 4, egypt: 4, mexico: 3 }, cwInt: { us: -8, su: -8 }, cwSus: { us: -12, su: -12 } } });
    return acts;
  },
  cwBluffChance(s) { return clamp(Game.cw().int[s] / 100 + 0.1, 0.1, 0.85); },
  cwAction(id) {
    const W = Game.cw();
    const [kind, s] = id.split(':');
    if (kind === 'auction') return { scene: Game.cwAuctionScene() };
    const a = Game.cwActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    let fx = a.fx, text = '';
    if (kind === 'bluff') {
      const o = s === 'us' ? 'su' : 'us';
      if (Math.random() < Game.cwBluffChance(s)) { const amt = Math.round(Game.cwOffer(s) * 0.8); fx = { treasury: amt, cwInt: { [s]: -10 } }; text = `${SIDE[s].who} занервничал и прислал ${amt} млн «на развитие дружбы». Шантаж — тоже дипломатия.`; }
      else { fx = { rel: { [SIDE[s].c]: -10 }, cwSus: { [s]: 10 }, cwInt: { [o]: 4 } }; text = `${SIDE[s].who} не поверил и обиделся. В досье ${SIDE[s].spy} появилась пометка «ненадёжен».`; }
    } else if (kind === 'project') { W.projects[s] = S.turn; text = `Начато строительство: ${a.name}. Иностранные инженеры прибыли с чертежами и бесконечным оптимизмом.`; }
    else text = `${a.name}. ${a.desc}`;
    const changes = Game.apply(fx);
    Game.log(text);
    return { text, changes };
  },
  cwAuctionScene() {
    const W = Game.cw(), ou = Game.cwOffer('us'), os = Game.cwOffer('su');
    return {
      title: 'Аукцион лояльности', bg: 'office',
      lines: [
        ['foreign', 'Я пригласил на ужин обоих послов. За одним столом. Сидят молча, едят суп и сверлят друг друга взглядом.'],
        ['npc:usa_amb', `Соединённые Штаты готовы предложить ${ou} миллионов. И очень, очень хорошие отношения.`],
        ['npc:ussr_amb', `Советский Союз даёт ${os} миллионов. И тракторы. И дружбу народов.`],
      ],
      choices: [
        { text: `Принять предложение США (${ou} млн)`, fx: { ap: -1, treasury: ou, rel: { usa: 12, ussr: -8 }, cwInt: { us: -15 }, cwSus: { su: 12 }, cwAuction: true }, res: 'Посол США улыбается. Посол СССР уходит, не доев суп. В Москве открыли новое досье. Толстое.' },
        { text: `Принять предложение СССР (${os} млн)`, fx: { ap: -1, treasury: os, rel: { ussr: 12, usa: -8 }, cwInt: { su: -15 }, cwSus: { us: 12 }, cwAuction: true }, res: 'Товарищ Бубликов обнимает вас. Посол США записывает что-то в блокнот. В Лэнгли открыли новое досье.' },
        { text: 'Отказать обоим: «Мы подумаем»', adv: ['foreign'], fx: { ap: -1, rel: { usa: -3, ussr: -3 }, cwInt: { us: 10, su: 10 }, cwAuction: true }, res: 'Оба посла уходят задумчивыми. В следующий раз они предложат больше. Наверное.' },
        { text: 'Перенести ужин', fx: {}, res: 'Ужин перенесён. Приказ не потрачен.' },
      ],
    };
  },
});

Game.applyHooks.push(fx => {
  if (S.era !== '1960') return;
  const W = Game.cw();
  if (fx.cwInt) for (const [s, d] of Object.entries(fx.cwInt)) W.int[s] = clamp(W.int[s] + d);
  if (fx.cwSus) for (const [s, d] of Object.entries(fx.cwSus)) W.sus[s] = clamp(W.sus[s] + d);
  if (fx.cwAuction) W.lastAuction = S.turn;
});
Game.previewHooks.push((fx, out) => {
  if (fx.cwInt) for (const [s, d] of Object.entries(fx.cwInt)) out.push({ icon: '🎯', d, label: `Интерес: ${SIDE[s].name}`, text: `интерес ${SIDE[s].name} ${sign(d)}` });
  if (fx.cwSus) for (const [s, d] of Object.entries(fx.cwSus)) out.push({ icon: '🗂️', d: -d, label: `Досье ${SIDE[s].spy}`, text: `досье ${SIDE[s].spy} ${sign(d)}` });
});
Game.coupHooks.push(() => (S.era === '1960' ? Math.max(0, Game.cw().sus.us - 30) / 70 * 0.18 : 0));
Game.revHooks.push(() => (S.era === '1960' ? Math.max(0, Game.cw().sus.su - 30) / 70 * 0.12 : 0));
Game.quarterHooks.push(rep => {
  if (S.era !== '1960') return;
  const W = Game.cw();
  const lean = (S.rel.usa || 0) - (S.rel.ussr || 0);
  const swing = 1 - Math.min(1, Math.abs(lean) / 60);
  const reds = W.neigh.filter(n => n.side === 'su').length, blues = W.neigh.filter(n => n.side === 'us').length;
  W.int.us = clamp(W.int.us + 2.2 * swing - 0.8 + (S.fac.left.s > 40 ? 1 : 0) + reds * 0.3);
  W.int.su = clamp(W.int.su + 2.2 * swing - 0.8 + (S.fac.left.a > 55 ? 0.8 : 0) + blues * 0.3);
  W.sus.us = clamp(W.sus.us + (lean < -15 ? 2.5 : -1.2));
  W.sus.su = clamp(W.sus.su + (lean > 15 ? 2.5 : -1.2));
  S.fac.left.s = clamp(S.fac.left.s + W.sus.su / 100 * 1.2);
  if (W.sus.us > 50) rep.warn.push(`Досье ЦРУ: ${Math.round(W.sus.us)}. В посольстве США зачастили полковники.${W.sus.us >= 65 ? ' Готовится заговор.' : ''}`);
  if (W.sus.su > 50) rep.warn.push(`Досье КГБ: ${Math.round(W.sus.su)}. У партизан в горах появились новые автоматы.${W.sus.su >= 65 ? ' Москва готова вооружить их всерьёз.' : ''}`);
  if (W.neigh.length && Math.random() < 0.18) {
    const n = pick(W.neigh), sides = ['us', 'su', 'nam'].filter(x => x !== n.side), ns = pick(sides);
    n.side = ns;
    const txt = { us: 'перешла в лагерь Вашингтона', su: 'перешла в лагерь Москвы', nam: 'объявила о неприсоединении' }[ns];
    rep.lines.push(`Соседняя страна ${n.name} ${txt}. ${ns === 'su' ? 'В Вашингтоне заговорили об «эффекте домино».' : ns === 'us' ? 'В Москве недовольны.' : 'Обе сверхдержавы недовольны.'}`);
    Game.log(`Холодная война: ${n.name} ${txt}.`);
  }
});

Object.assign(UI, {
  tab_coldwar() {
    const W = Game.cw();
    const col = s => {
      const C = SIDE[s];
      const sus = W.sus[s];
      return `<section class="card cw-side">
        <header class="cw-h">${flagSvg(C.c)}<div><h3>${C.name}</h3><span class="muted small">${Game.leaderAt(C.c)}</span></div></header>
        ${UI.meter('Отношения', S.rel[C.c], S.rel[C.c] < 25 ? 'bad' : S.rel[C.c] < 50 ? 'warn' : 'good')}
        ${UI.meter('Интерес к вам', W.int[s], 'str')}
        ${UI.meter(`Досье ${C.spy}`, sus, sus > 60 ? 'bad' : sus > 30 ? 'warn' : 'good')}
        <p class="muted small">Предложение на аукционе: <b>${Game.cwOffer(s)} млн</b>. ${s === 'us' ? 'Толстое досье ЦРУ повышает риск переворота.' : 'Толстое досье КГБ вооружает партизан и повышает риск революции.'}</p>
      </section>`;
    };
    const sideName = { us: 'за Вашингтон', su: 'за Москву', nam: 'неприсоединение' };
    const acts = Game.cwActions();
    const nd = W.nextDemarche !== undefined ? Math.max(0, W.nextDemarche - S.turn) : null;
    return `<p class="lede"><b>Послы сверхдержав приходят сами</b> раз в 3–5 кварталов с требованием${nd !== null ? ` (следующего визита ждите ${nd <= 1 ? "уже скоро" : `примерно через ${nd} кв.`})` : ""}. Отказ злит разведку этой стороны. Досье выше 65 — это заговор ЦРУ в армии или советское оружие у партизан. Сверхдержавы торгуются за третий мир. Чем меньше вы склоняетесь к одной стороне, тем выше интерес обеих и тем больше они платят. Если склониться слишком сильно, разведка другой стороны начнёт готовить вам замену.</p>
      <div class="cw">${col('us')}${col('su')}</div>
      <section class="card"><div class="eyebrow">Соседи по региону</div><div class="cw-neigh">${W.neigh.map(n => `<span class="chip ${n.side === 'us' ? 'west' : n.side === 'su' ? 'east' : 'neutral'}">${esc(n.name)}: ${sideName[n.side]}</span>`).join('')}</div>
        <p class="muted small">Когда соседи переходят к Москве, растёт интерес Вашингтона к вам, и наоборот.</p></section>
      <div class="proj dec-grid">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>${a.fx ? `<div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx).filter(f => !f.later))}</div>${Game.previewFx(a.fx).some(f => f.later) ? `<div class="dec-row"><span class="dec-tag">Через 6 кв.</span>${UI.fxChips(Game.previewFx(a.fx).filter(f => f.later))}</div>` : ''}</div>` : ''}</div>${UI.actBtn('cw:' + a.id, { name: 'Приказать', cost: a.cost, ok: a.ok, danger: a.danger })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('cw:')) return false;
  const out = Game.cwAction(id.slice(3));
  if (out && out.scene) { if (S.ap > 0) VN.play(out.scene).then(() => UI.render()); return true; }
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});

// ===== Давление сверхдержав: демарши послов, отказ злит разведку, толстое досье ведёт к эскалации =====
const CW_DEMANDS = {
  us: [
    { id: 'raid', text: 'Провести облаву на коммунистов', say: 'Вашингтон обеспокоен красными ячейками в ваших профсоюзах. Мы ждём решительных шагов. До конца месяца.', cond: () => S.fac.left.st !== 'banned',
      fx: { fear: 4, fac: { left: { s: -8, a: -20 } }, rel: { usa: 10, ussr: -6 }, cwSus: { us: -15, su: 6 } } },
    { id: 'expel', text: 'Выслать советских «атташе»', say: 'В советском посольстве сорок «атташе по культуре». Ни один не знает, где у вас театр. Вышлите хотя бы половину.',
      fx: { rel: { usa: 8, ussr: -12 }, cwSus: { us: -12, su: 10 } } },
    { id: 'company', text: 'Вернуть льготы американским компаниям', say: '{company} жалуется на новые налоги. Американский бизнес — лучший друг вашей страны. Не обижайте друзей.',
      fx: { treasury: -6, economy: 2, rel: { usa: 8 }, fac: { left: { a: -5 }, oligarchs: { a: 4 } }, cwSus: { us: -12 } } },
    { id: 'u2', text: 'Пустить разведывательные самолёты на ваш аэродром', say: 'Нашим самолётам нужна взлётная полоса. Ненадолго. Они будут летать очень высоко, вы их даже не заметите.',
      fx: { treasury: 6, rel: { usa: 8, ussr: -10 }, cwSus: { us: -12, su: 12 } } },
    { id: 'vote', text: 'Голосовать с США в ООН по Кубе', say: 'На Генеральной ассамблее голосуют о Кубе. Мы рассчитываем на ваш голос. Мы его, можно сказать, уже посчитали.',
      fx: { rel: { usa: 7, ussr: -5, cuba: -8 }, cwSus: { us: -10 }, fac: { left: { a: -3 } } } },
  ],
  su: [
    { id: 'advisers', text: 'Принять советских военных советников', say: 'Ваша армия воюет устаревшим оружием. Наши советники помогут. Бесплатно. Почти.',
      fx: { army: 4, rel: { ussr: 10, usa: -6 }, cwSus: { su: -15, us: 10 }, fac: { left: { a: 4 }, hawks: { a: -3 } } } },
    { id: 'release', text: 'Освободить арестованных коммунистов', say: 'В ваших тюрьмах сидят прогрессивные товарищи. Советская общественность возмущена. Очень возмущена.',
      fx: { fear: -3, rel: { ussr: 8 }, fac: { left: { a: 10, s: 4 } }, cwSus: { su: -12, us: 6 } } },
    { id: 'cuba', text: 'Открыть посольство Кубы и наладить с ней торговлю', say: 'Остров Свободы ищет друзей. Будьте другом. Сахар, сигары, революционный энтузиазм.',
      fx: { rel: { ussr: 8, cuba: 10, usa: -8 }, cwSus: { su: -12, us: 8 } } },
    { id: 'trawlers', text: 'Пустить советские траулеры в порт', say: 'Наши рыбаки устали. Им нужен порт, вода и немного покоя. Антенны на мачтах — для прогноза погоды.',
      fx: { treasury: 4, rel: { ussr: 7, usa: -4 }, cwSus: { su: -12, us: 10 } } },
    { id: 'radio', text: 'Закрыть антисоветскую радиостанцию', say: 'Из вашей страны вещает «Радио Свободная Азия» или как его там. Клевета на социализм в каждом выпуске. Закройте.',
      fx: { rel: { ussr: 7, usa: -4 }, fac: { liberals: { a: -4 } }, cwSus: { su: -10 } } },
  ],
};
const CW_OTHER = { us: 'su', su: 'us' };
Object.assign(Game, {
  cwDemarcheScene() {
    const W = Game.cw();
    const lean = (S.rel.usa || 0) - (S.rel.ussr || 0);
    // чаще приходит та держава, от которой вы отдаляетесь
    const pUS = clamp(50 - lean * 0.8, 20, 80) / 100;
    const s = Math.random() < pUS ? 'us' : 'su', o = CW_OTHER[s], C = SIDE[s];
    const list = CW_DEMANDS[s].filter(d => (!d.cond || d.cond()) && d.id !== W.lastDemand);
    const d = pick(list);
    W.lastDemand = d.id;
    const amb = s === 'us' ? 'npc:usa_amb' : 'npc:ussr_amb';
    const refuse = { rel: { [C.c]: -8 }, cwSus: { [s]: 14 }, schedule: [{ in: 2, fx: s === 'us' ? { fac: { hawks: { a: -6 } }, army: -3 } : { fac: { left: { s: 6 } } }, text: s === 'us' ? 'Американские военные атташе зачастили в офицерский клуб. Генералы стали задумчивее.' : 'У партизан в горах появились новенькие автоматы Калашникова.' }] };
    const bargainP = clamp(0.3 + S.adv.foreign.comp * 0.2 + W.int[s] / 300, 0.2, 0.8);
    const choices = [
      { text: `Согласиться: ${d.text[0].toLowerCase() + d.text.slice(1)}`, fx: d.fx, res: `${C.who} доволен. Посол пожимает вам руку чуть дольше обычного. В ${o === 'us' ? 'Вашингтоне' : 'Москве'} это тоже заметили.` },
      { text: 'Поторговаться: «Что мы получим взамен?»', adv: ['foreign'], chance: () => bargainP,
        win: { fx: { ...d.fx, treasury: (d.fx.treasury || 0) + 8 }, res: `${C.who} уступил: просьба выполнена, а в казну пришли восемь миллионов «на развитие дружбы».` },
        lose: { fx: { rel: { [C.c]: -5 }, cwSus: { [s]: 8 } }, res: 'Посол холодно ответил, что друзья не торгуются, и ушёл, не допив кофе.' } },
      { text: 'Вежливо отказать', fx: refuse, res: `Посол записал ваш ответ в блокнот. Досье ${C.spy} пополнилось новой страницей.` },
    ];
    if (W.int[o] >= 40) choices.push({ text: `Пожаловаться ${o === 'us' ? 'Вашингтону' : 'Москве'} на давление`, fx: { rel: { [SIDE[o].c]: 5, [C.c]: -6 }, cwInt: { [o]: 6 }, cwSus: { [s]: 10, [o]: -6 } }, res: `${SIDE[o].who} выразил сочувствие и пообещал «не оставить друзей в беде». ${C.who} понял, кому вы жалуетесь.` });
    return {
      title: `Демарш: ${C.name}`, bg: 'office',
      lines: [
        ['narrator', `Без предупреждения во дворец приезжает посол ${s === 'us' ? 'США' : 'СССР'}. Охрана не решилась его задержать.`],
        [amb, d.say],
        ['foreign', s === 'us' ? 'Если отказать, ЦРУ начнёт присматриваться к нашим генералам. Если согласиться, Москва это запомнит.' : 'Если отказать, КГБ найдёт друзей в горах. Если согласиться, Вашингтон пересчитает нашу помощь.'],
      ],
      choices,
    };
  },
  cwCrisisScene(s) {
    const C = SIDE[s];
    if (s === 'us') return {
      title: 'Заговор в офицерском клубе', bg: 'night',
      lines: [
        ['police', 'Полковники собираются по ночам с человеком из американского посольства. Говорят о «спасении нации». Без вас.'],
        ['npc:colonel', '(перехваченная записка) «Сигнал — когда Вашингтон скажет. Танки готовы, послы предупреждены».'],
        ['defense', 'Половина штаба ждёт, кто окажется сильнее. Решайте быстро.'],
      ],
      choices: [
        { text: 'Арестовать заговорщиков', adv: ['police'], chance: () => clamp(0.35 + S.adv.police.comp * 0.2 + S.fear / 300, 0.2, 0.85),
          win: { fx: { army: -5, fear: 5, fac: { hawks: { a: -8 } }, cwSus: { us: -10 } }, res: 'Ночью полковников взяли в их же клубе. Посольство США выразило «удивление».' },
          lose: { fx: { army: -10, support: -4, fac: { hawks: { s: 6, a: -10 } }, cwSus: { us: 8 } }, res: 'Кто-то предупредил заговорщиков. Они ушли к своим полкам. Танки пока стоят в казармах. Пока.' } },
        { text: 'Срочно помириться с Вашингтоном', fx: { treasury: -10, rel: { usa: 12, ussr: -10 }, cwSus: { us: -30, su: 10 }, fac: { left: { a: -6 } } }, res: 'Выгодный контракт американской компании, ужин с послом — и заговорщики вдруг вспомнили о присяге.' },
        { text: 'Попросить у Москвы охрану для дворца', fx: { army: 4, rel: { ussr: 10, usa: -12 }, cwSus: { us: 12, su: -10 }, fac: { hawks: { a: -8 }, left: { a: 6 } } }, res: 'Дворец охраняют советские «инструкторы». Генералы обижены, ЦРУ в бешенстве, но танки не выйдут, пока у ворот стоят русские.' },
      ],
    };
    return {
      title: 'Партизаны с советским оружием', bg: 'jungle',
      lines: [
        ['defense', 'Партизаны в горах получили новые автоматы, миномёты и инструкторов. Вчера взяли два уездных города.'],
        ['police', 'Ящики пришли морем, через рыбацкие деревни. На ящиках — «сельхозтехника».'],
        ['npc:usa_amb', 'Соединённые Штаты готовы помочь. Вертолёты, советники, деньги. Если вы наконец определитесь, на чьей вы стороне.'],
      ],
      choices: [
        { text: 'Бросить армию в горы', adv: ['defense'], chance: () => clamp(0.3 + S.army / 200, 0.2, 0.8),
          win: { fx: { treasury: -8, army: 3, fac: { left: { s: -12 } }, cwSus: { su: -6 } }, res: 'После трёх месяцев боёв партизаны ушли за границу. Армия празднует, крестьяне в горах хоронят погибших.' },
          lose: { fx: { treasury: -8, army: -8, support: -4, fac: { left: { s: 4 } } }, res: 'Армия завязла в горах. Партизаны пропускают колонны и нападают на обозы.' } },
        { text: 'Договориться с Москвой', fx: { rel: { ussr: 12, usa: -8 }, cwSus: { su: -30, us: 10 }, fac: { left: { a: 8 } } }, res: 'Советский посол пообещал, что «сельхозтехника» больше не поплывёт. Партизаны внезапно остались без патронов.' },
        { text: 'Принять американскую помощь', fx: { army: 6, treasury: 8, rel: { usa: 12, ussr: -12 }, cwSus: { su: 12, us: -12 }, fac: { left: { a: -8 } } }, res: 'Над горами летают американские вертолёты. Партизаны называют вас «марионеткой янки», но патроны у них кончаются.' },
      ],
    };
  },
});
Game.forcedList.push(() => {
  if (S.era !== '1960' || S.over) return null;
  const W = Game.cw();
  if (W.nextDemarche === undefined) W.nextDemarche = 2 + Math.floor(Math.random() * 2);
  W.crisisAt = W.crisisAt || { us: -99, su: -99 };
  // эскалация при толстом досье — раньше демарша
  for (const s of ['us', 'su']) if (W.sus[s] >= 65 && S.turn - W.crisisAt[s] >= 6 && S.turn >= 3) { W.crisisAt[s] = S.turn; return Game.cwCrisisScene(s); }
  if (S.turn < W.nextDemarche) return null;
  W.nextDemarche = S.turn + 3 + Math.floor(Math.random() * 3);
  return Game.cwDemarcheScene();
});
