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
Game.coupHooks.push(() => (S.era === '1960' ? Game.cw().sus.us / 100 * 0.12 : 0));
Game.revHooks.push(() => (S.era === '1960' ? Game.cw().sus.su / 100 * 0.08 : 0));
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
  if (W.sus.us > 60) rep.warn.push('Досье ЦРУ на вас толще телефонного справочника. В посольстве США зачастили полковники.');
  if (W.sus.su > 60) rep.warn.push('Досье КГБ на вас растёт. У партизан в горах появились новые автоматы.');
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
    return `<p class="lede">Сверхдержавы торгуются за третий мир. Чем меньше вы склоняетесь к одной стороне, тем выше интерес обеих и тем больше они платят. Если склониться слишком сильно, разведка другой стороны начнёт готовить вам замену.</p>
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
