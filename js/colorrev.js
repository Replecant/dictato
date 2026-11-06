// Цветные революции (2000-е): улица, интернет и эффект домино. В Африке — «Улица и выборы».
const CR_REGION = {
  africa00: {
    tab: 'Улица и выборы', square: 'площадь Независимости', squareLoc: 'площади Независимости', leaderRole: 'мэр столицы, бывший диджей', ally: 'sa', allyName: 'ЮАР и миротворцы региона',
    colors: [['Революция жёлтых шарфов', '#e0b020'], ['Революция вувузел', '#e06a20'], ['Мобильная революция', '#2a9a5a'], ['Революция красных беретов', '#c0392b']],
    neigh: [['Северная Луэна', 470, 70], ['Республика Мбанза', 150, 80], ['Федерация Кивалу', 520, 220], ['Республика Нголо', 90, 230], ['Сахельская Республика', 300, 40]],
  },
  mideast00: {
    tab: 'Цветные революции', square: 'площадь Освобождения', squareLoc: 'площади Освобождения', leaderRole: 'блогер и инженер', ally: 'saudi', allyName: 'силы «Щит полуострова»',
    colors: [['Финиковая революция', '#a0662a'], ['Революция фонарей', '#e0b020'], ['Жасминовая весна', '#d0d0e8'], ['Зелёная волна', '#3a9a4a']],
    neigh: [['Королевство Аль-Джабаль', 470, 70], ['Эмират Бахр-ан-Нур', 520, 230], ['Республика Шам-эль-Ард', 140, 70], ['Султанат Рамла', 330, 290], ['Республика Ватан', 90, 230]],
  },
  centralasia00: {
    tab: 'Цветные революции', square: 'площадь Независимости', squareLoc: 'площади Независимости', leaderRole: 'бывший премьер-министр', ally: 'russia', allyName: 'ОДКБ',
    colors: [['Хлопковая революция', '#e8e8e8'], ['Абрикосовая революция', '#f0902a'], ['Революция юрт', '#c0392b'], ['Тюльпановая волна', '#e04070']],
    neigh: [['Республика Сарыкум', 470, 70], ['Республика Ала-Тоо', 510, 230], ['Республика Памирстан', 330, 290], ['Республика Каспистан', 100, 90], ['Ханство Тенгир', 110, 240]],
  },
};
// Реальные события десятилетия: [год, квартал, название, страна, итог, влияние на «улицу» по регионам]
const CR_REAL = [
  [2000, 4, '«Бульдозерная революция»', 'Сербия', 'Милошевич свергнут, парламент и телецентр взяты толпой с бульдозером', { centralasia00: 4, mideast00: 2, africa00: 2 }],
  [2003, 4, '«Революция роз»', 'Грузия', 'Шеварднадзе ушёл в отставку без выстрела', { centralasia00: 10, mideast00: 4, africa00: 2 }],
  [2004, 4, '«Оранжевая революция»', 'Украина', 'переголосование, победа оппозиции', { centralasia00: 12, mideast00: 4, africa00: 3 }],
  [2005, 1, '«Тюльпановая революция»', 'Киргизия', 'Акаев улетел в Москву, Дом правительства взят за сутки', { centralasia00: 15, mideast00: 3 }],
  [2005, 1, '«Революция кедров»', 'Ливан', 'сирийские войска ушли из страны', { mideast00: 12, centralasia00: 2 }],
  [2005, 2, 'Андижан', 'Узбекистан', 'протест подавлен войсками, сотни погибших', { centralasia00: -3 }, { centralasia00: 6 }],
  [2005, 2, 'Протесты после выборов', 'Эфиопия', 'подавлены, тысячи арестованных', { africa00: 4 }, { africa00: 3 }],
  [2005, 2, 'Протесты после выборов', 'Того', 'подавлены, тысячи бежали в соседние страны', { africa00: 4 }, { africa00: 3 }],
  [2006, 1, '«Джинсовая революция»', 'Белоруссия', 'палаточный лагерь разогнан', { centralasia00: 3 }],
  [2007, 3, '«Шафрановая революция»', 'Мьянма', 'шествия монахов подавлены', { mideast00: 2, centralasia00: 2, africa00: 2 }],
  [2008, 1, 'Кровопролитие после выборов', 'Кения', 'больше тысячи погибших, раздел власти', { africa00: 12 }, { africa00: 4 }],
  [2008, 2, 'Второй тур выборов', 'Зимбабве', 'оппозиция снялась из-за насилия', { africa00: 5 }, { africa00: 3 }],
  [2009, 1, 'Свержение президента', 'Мадагаскар', 'мэр столицы, бывший диджей, взял власть при поддержке армии', { africa00: 10 }],
  [2009, 2, '«Твиттер-революция»', 'Молдавия', 'протесты после выборов; через три месяца коммунисты потеряли власть', { centralasia00: 5, mideast00: 2 }],
  [2009, 2, '«Зелёное движение»', 'Иран', 'протесты подавлены, интернет фильтруют', { mideast00: 10, centralasia00: 2 }, { mideast00: 4 }],
];
const CR_ELECTIONS = [11, 31]; // IV квартал 2002 и 2007

Object.assign(Game, {
  cr() {
    if (!S.cr) {
      const R = CR_REGION[S.region];
      const color = pick(R.colors);
      const pool = NAME_POOLS[REGIONS[S.region].style] || NAME_POOLS.latam;
      S.cr = {
        heat: 15, rad: 5, last: -99, radAt: -99, space: false, realDone: [], log: [],
        opp: { name: `${pick(pool.m)} ${pick(pool.last)}`, role: R.leaderRole, color: color[0], hex: color[1] },
        neigh: R.neigh.map(([name, x, y]) => ({ name, x, y, st: 'calm', t: 0 })),
      };
    }
    return S.cr;
  },
  crAllyOk() { const R = CR_REGION[S.region]; return (S.rel[R.ally] || 0) >= 55; },
  crActions() {
    const R = CR_REGION[S.region], ally = R.ally;
    return [
      { id: 'youth', name: 'Своё молодёжное движение', desc: 'Футболки, автобусы, рок-концерты «за стабильность». Улица остывает, но движение стоит денег.', cost: '1 приказ', ok: S.treasury >= 8, fx: { treasury: -8, crHeat: -10, fac: { liberals: { a: -3 } } } },
      { id: 'wages', name: 'Повысить зарплаты бюджетникам', desc: 'Учителя и врачи не выходят на площадь, если зарплату платят вовремя.', cost: '1 приказ', ok: S.treasury >= 10, fx: { treasury: -10, support: 3, crHeat: -10 } },
      { id: 'bloggers', name: 'Блогеров — на беседу', desc: 'Беседа в кабинете с портретом. Посты становятся осторожнее, а авторы злее.', cost: '1 приказ', ok: true, fx: { fear: 2, crHeat: -7, crRad: 7, fac: { liberals: { a: -4 } } } },
      { id: 'tea', name: 'Пригласить лидера оппозиции на чай', desc: 'Разговор без камер. Радикалы теряют аргументы, улица ждёт, чем кончится.', cost: '1 приказ', ok: true, fx: { crRad: -10, crHeat: -4, fac: { liberals: { a: 5 } }, fear: -1 } },
      { id: 'ngo', name: 'Закрыть иностранные НКО', desc: 'Нет грантов — нет наблюдателей на выборах. Запад возмущён, подполье получает новых людей.', cost: '1 приказ', ok: true, danger: true, fx: { crHeat: -8, crRad: 5, rel: { $west: -8 }, fac: { liberals: { s: -4 } } } },
      { id: 'ally', name: `Обмен опытом: ${COUNTRIES[ally].name}`, desc: 'Советники соседей по «стабильности» учат ваших полицейских работать с толпой и с интернетом.', cost: '1 приказ', ok: (S.rel[ally] || 0) >= 45, fx: { crHeat: -6, crRad: 3, rel: { [ally]: 5, $west: -3 } } },
    ];
  },
  crAction(id) {
    const a = Game.crActions().find(x => x.id === id);
    if (!a || !a.ok || !Game.spend()) return null;
    const changes = Game.apply(a.fx);
    const text = `${a.name}. ${a.desc}`;
    Game.log(text);
    return { text, changes };
  },
  crElectionScene() {
    const C = Game.cr(), sup = S.support;
    const winP = clamp(sup / 100 + 0.12 - C.heat / 400, 0.1, 0.9);
    return {
      title: 'Президентские выборы', bg: 'square',
      lines: [
        ['narrator', `Страна голосует. Кандидат оппозиции — ${C.opp.name}, ${C.opp.role}. Его сторонники повязали на руки ленты движения «${C.opp.color}».`],
        ['propaganda', 'Протоколы готовы заранее. Сколько напишем? Девяносто семь — классика. Шестьдесят восемь — солидно, по-европейски.'],
        ['police', 'Наблюдатели от НКО стоят у каждого участка с телефонами. Каждую «карусель» снимут на видео.'],
      ],
      choices: [
        { text: 'Нарисовать 97%', fx: { crHeat: 20, crRad: 4, fear: 2, support: -3, rel: { $west: -6 } }, res: 'Победа с рекордным результатом. В интернете уже гуляют видео вбросов. На площади ставят первые палатки.' },
        { text: 'Скромные 68% и «правильные» наблюдатели', adv: ['propaganda'], req: S => S.treasury >= 10, reqText: 'нужно 10 млн', fx: { treasury: -10, crHeat: 8, rel: { $west: -2 } }, res: 'Наблюдатели из дружественных стран назвали выборы «образцовыми». Оппозиция назвала их иначе, но тише.' },
        { text: 'Честные выборы', chance: () => winP,
          win: { fx: { crHeat: -22, support: 6, rel: { $west: 10 }, fac: { liberals: { a: 8 } } }, res: 'Вы действительно победили. Оппозиция признала итоги, а в западных столицах вас назвали «реформатором». Немного непривычно.' },
          lose: { fx: { flag: { votedOut: true } }, res: 'Подсчёт закончен. Вы проиграли. Вся страна ждёт, что вы будете делать.' } },
        { text: 'Перенести выборы «из-за угрозы терроризма»', fx: { crHeat: 26, crRad: 8, fear: 5, rel: { $west: -12 } }, res: 'Выборы отложены на неопределённый срок. Оппозиция объявила, что новое правительство уже сформировано — в кафе напротив дворца.' },
      ],
      after: () => (S.flags.votedOut ? 'retired' : null),
    };
  },
  crProtestScene() {
    const C = Game.cr(), R = CR_REGION[S.region], ally = R.ally;
    C.last = S.turn;
    const big = C.heat >= 85;
    const net = S.net || 0;
    const choices = [
      { text: 'Разогнать площадь силой', adv: ['police'], chance: () => clamp(0.3 + S.army / 250 + S.fear / 300 - C.heat / 400, 0.15, 0.8),
        win: { fx: { crHeat: -35, crRad: 25, fear: 8, support: -8, rel: { $west: -12 } }, res: 'Ночью площадь очистили дубинками и водомётами. Палатки увезли, видео — нет. Подполье получило сотни новых сторонников.' },
        lose: { fx: { crHeat: 10, crRad: 18, army: -12, support: -10, rel: { $west: -10 } }, res: 'Солдаты отказались стрелять в толпу и обнимаются с протестующими. Генералы звонят вам всё реже.' } },
      { text: `Подкупить лидера: ${C.opp.name}`, adv: ['economy'], req: S => S.treasury >= 15, reqText: 'нужно 15 млн', chance: () => clamp(0.55 - C.rad / 200, 0.15, 0.7),
        win: { fx: { treasury: -15, crHeat: -25, fac: { liberals: { a: -4, s: -5 } } }, res: `${C.opp.name} неожиданно вспомнил о семье и уехал в долгий отпуск. Площадь растерянно разошлась.` },
        lose: { fx: { treasury: -15, crHeat: 12, crRad: 6 }, res: 'Конверт сняли на телефон. Ролик «Сколько стоит оппозиция» посмотрела вся страна. Цену назвали в комментариях.' } },
    ];
    if (!C.space) choices.push({ text: `Отправить лидера в космос туристом`, req: S => S.treasury >= 20, reqText: 'нужно 20 млн', fx: { treasury: -20, crHeat: -22, rel: { russia: 4 }, fac: { liberals: { a: 3 } }, crSpace: true },
      res: `${C.opp.name} принял предложение: билет на «Союз», полгода подготовки в Звёздном городке и неделя на орбите. Он вернулся национальным героем, но в политику не спешит: пишет книгу «Земля в иллюминаторе».` });
    choices.push(
      { text: 'Отключить интернет и СМС', req: () => net >= 5, reqText: 'интернета пока почти нет', fx: { crHeat: net >= 40 ? -4 : -12, crRad: 8, economy: -4, net: -3, rel: { $west: -6 } }, res: net >= 40 ? 'Связь пропала, и люди, оставшись без новостей, сами вышли на улицы узнать, что происходит.' : 'Связь пропала на три дня. Площадь не знает, что делать дальше, и постепенно расходится.' },
      { text: 'Уступить: отправить правительство в отставку', fx: { crHeat: -35, crRad: -8, support: 5, fear: -6, fac: { liberals: { a: 10 }, hawks: { a: -8 } }, fireRole: 'economy' }, res: 'Премьер и министр экономики отправлены в отставку «за ошибки». Площадь празднует. Генералы шепчутся, что вы стали мягким.' },
      { text: 'Контрмитинг «за стабильность»', adv: ['propaganda'], req: S => S.treasury >= 6, reqText: 'нужно 6 млн', fx: { treasury: -6, crHeat: -10, crRad: 5 }, res: 'Автобусы с бюджетниками заполнили соседнюю площадь. Две толпы смотрят друг на друга через оцепление.' },
      { text: `Попросить помощи: ${R.allyName}`, req: () => Game.crAllyOk(), reqText: `нужны отношения ≥ 55: ${COUNTRIES[ally].name}`, fx: { crHeat: -38, crRad: 12, rel: { [ally]: 6, $west: -14 }, support: -5, fear: 6 }, res: 'Через границу вошли колонны «миротворцев». Площадь пуста, но на стенах пишут, что вы правите с чужими штыками.' },
    );
    return {
      title: `${C.opp.color}: ${R.square}`, bg: 'square',
      lines: [
        ['narrator', `На ${R.squareLoc} — палаточный лагерь. ${big ? 'Сотни тысяч человек' : 'Десятки тысяч человек'} под знамёнами «${C.opp.color}» требуют вашей отставки.${net >= 30 ? ' Трансляцию с площади смотрит весь интернет.' : ''}`],
        ['police', big ? 'Ещё неделя — и они пойдут на дворец. Решайте сегодня.' : 'Пока стоят мирно. Пока.'],
        ['foreign', 'Западные посольства просят «проявить сдержанность». Соседи-автократы предлагают помощь. Все внимательно смотрят.'],
      ],
      choices,
      after: () => (Game.cr().heat >= 92 ? 'revolution' : null),
    };
  },
  crRadScene() {
    const C = Game.cr();
    C.radAt = S.turn;
    return {
      title: 'Подполье берётся за оружие', bg: 'night',
      lines: [
        ['police', 'Те, кого разогнали с площади, больше не верят в палатки. Взрыв у отделения полиции, листовки с призывом к «настоящей революции».'],
        ['defense', 'Это уже не блогеры. Это люди с оружием, и у них есть друзья за границей.'],
      ],
      choices: [
        { text: 'Объявить контртеррористическую операцию', adv: ['defense'], fx: { fear: 6, crRad: -15, army: -3, support: -3, rel: { $west: -4 }, fac: { left: { s: -6 } } }, res: 'Аресты, блокпосты, обыски. Подполье затаилось, но не исчезло.' },
        { text: 'Амнистия для тех, кто сложит оружие', fx: { crRad: -22, crHeat: 6, fear: -3, fac: { liberals: { a: 5 } } }, res: 'Часть подполья сдала оружие. Улица считает это слабостью — и снова собирается на площади.' },
        { text: 'Списать всё на иностранных агентов', adv: ['propaganda'], fx: { crRad: 5, crHeat: -5, rel: { $west: -6 } }, res: 'Телевизор неделю показывает «шпионов с грантами». Подполье смеётся и вербует новых людей.' },
      ],
    };
  },
});

// Изменения улицы и радикализации через обычные эффекты
Game.applyHooks.push(fx => {
  if (S.era !== '2000') return;
  const C = Game.cr();
  if (fx.crHeat) C.heat = clamp(C.heat + fx.crHeat);
  if (fx.crRad) C.rad = clamp(C.rad + fx.crRad);
  if (fx.crSpace) C.space = true;
});
Game.previewHooks.push((fx, out) => {
  if (fx.crHeat) out.push({ icon: '🔥', d: -fx.crHeat, label: 'Улица', text: `улица ${sign(fx.crHeat)}` });
  if (fx.crRad) out.push({ icon: '💣', d: -fx.crRad, label: 'Радикализация', text: `радикализация ${sign(fx.crRad)}` });
});
Game.revHooks.push(() => (S.era === '2000' && S.cr ? Math.max(0, S.cr.heat - 40) / 60 * 0.12 + Math.max(0, S.cr.rad - 40) / 60 * 0.08 : 0));

// Начало квартала: реальная сводка, выборы, площадь, подполье
Game.forcedList.push(() => {
  if (S.era !== '2000' || S.over) return null;
  const C = Game.cr();
  for (const [y, q, name, land, res, eff, rad] of CR_REAL) {
    const key = `${y}${q}${land}`;
    if (C.realDone.includes(key) || S.year * 4 + S.q < y * 4 + q) continue;
    C.realDone.push(key);
    const d = Math.round((eff[S.region] || 0) * (1 + (S.net || 0) / 80));
    C.heat = clamp(C.heat + d);
    if (rad && rad[S.region]) C.rad = clamp(C.rad + rad[S.region]);
    C.log.unshift({ y, name: `${name}, ${land}`, res, real: true });
    if (d >= 5) Game.log(`Цветные революции: ${name} (${land}) — ${res}. У нас на улицах неспокойно.`);
  }
  if (CR_ELECTIONS.includes(S.turn) && !(S.flags.crVote || []).includes(S.turn)) { S.flags.crVote = [...(S.flags.crVote || []), S.turn]; return Game.crElectionScene(); }
  if (C.heat >= 70 && S.turn - C.last >= 4) return Game.crProtestScene();
  if (C.rad >= 70 && S.turn - C.radAt >= 6) return Game.crRadScene();
  return null;
});
// Конец квартала: улица теплеет, соседи бурлят, домино
Game.quarterHooks.push(rep => {
  if (S.era !== '2000') return;
  const C = Game.cr(), net = S.net || 0, R = CR_REGION[S.region];
  const L = S.fac.liberals;
  const drift = 0.6 + net / 40 + Math.max(0, 45 - S.support) / 12 + L.s / 60 + (S.economy < 35 ? 1.5 : 0) - S.fear / 80 - (S.support > 60 ? 1.5 : 0) - (S.budget.netctl || 0) * 0.6;
  C.heat = clamp(C.heat + drift);
  C.rad = clamp(C.rad - 1 + (S.budget.netctl || 0) * 0.5);
  if (C.rad >= 50) S.fac.left.s = clamp(S.fac.left.s + 0.8);
  for (const n of C.neigh) {
    if (n.st === 'protest') {
      const won = Math.random() < 0.45;
      n.st = won ? 'won' : 'crushed'; n.t = S.turn;
      const name = n.rev;
      C.log.unshift({ y: S.year, name: `${name}, ${n.name}`, res: won ? 'президент бежал, власть у оппозиции' : 'протест подавлен' });
      const d = Math.round((won ? 8 : 2) * (1 + net / 100));
      C.heat = clamp(C.heat + d);
      if (!won) C.rad = clamp(C.rad + 2);
      rep.lines.push(`${n.name}: ${name} ${won ? 'победила — президент бежал' : 'подавлена'}. У нас на улицах неспокойно (улица +${d}).`);
    } else if ((n.st === 'calm' || S.turn - n.t >= 12) && Math.random() < 0.06 + net / 600 + ([2004, 2005].includes(S.year) ? 0.04 : 0)) {
      n.st = 'protest'; n.t = S.turn; n.rev = pick(R.colors)[0];
      rep.lines.push(`${n.name}: на главной площади палаточный лагерь — «${n.rev}».`);
    }
  }
  if (C.heat >= 55) rep.warn.push(`Улица: ${Math.round(C.heat)} из 100. ${C.heat >= 70 ? 'Площадь готова выйти в любой момент.' : 'В интернете зовут на площадь.'}`);
  if (C.rad >= 50) rep.warn.push(`Радикализация: ${Math.round(C.rad)}. Разогнанные уходят в подполье.`);
});
// Финалы: проигранные честные выборы и цветная революция
Game.endingHooks.push((type, E, verdicts) => {
  if (S.era !== '2000' || !S.cr) return;
  if (type === 'retired' && S.flags.votedOut) { E.title = 'Проиграл честные выборы'; E.text = `Вы проиграли выборы и признали поражение. ${S.cr.opp.name} принёс присягу, а вы уехали на дачу писать мемуары. Историки назовут вас редким диктатором, который ушёл сам. Соседи-автократы перестали звонить.`; verdicts.push('Ушёл по-честному'); S.flags.scoreBonus = (S.flags.scoreBonus || 0) + 150; }
  if (type === 'revolution' && S.cr.heat >= 80) { E.title = `${S.cr.opp.color}`; E.text = `Толпа под знамёнами «${S.cr.opp.color}» вошла во дворец с цветами в руках. Вы смотрели на это из иллюминатора вертолёта. ${S.cr.opp.name} выступил с балкона, а трансляцию посмотрели миллионы — ${(S.net || 0) >= 30 ? 'в прямом эфире, в интернете' : 'по спутниковым каналам'}.`; verdicts.push('Свергнут улицей'); }
});

Object.assign(UI, {
  tab_colorrev() {
    const C = Game.cr(), R = CR_REGION[S.region];
    const stColor = n => n.st === 'won' ? '#d9a33a' : n.st === 'crushed' ? '#7a2a24' : n.st === 'protest' ? '#e0632a' : '#3a4a5c';
    const stText = { calm: 'спокойно', protest: 'протесты', won: 'революция победила', crushed: 'подавлено' };
    const hex = (x, y, r) => Array.from({ length: 6 }, (_, i) => `${x + r * Math.cos(Math.PI / 3 * i + Math.PI / 6)},${y + r * Math.sin(Math.PI / 3 * i + Math.PI / 6)}`).join(' ');
    const meX = 300, meY = 170, meCol = C.heat >= 70 ? '#e0632a' : C.heat >= 45 ? '#b8862a' : '#2b6f9a';
    const map = `<svg class="cr-map" viewBox="0 0 600 330" role="img" aria-label="Карта региона">
      ${C.neigh.map(n => `<line x1="${meX}" y1="${meY}" x2="${n.x}" y2="${n.y}" stroke="${n.st === 'won' ? '#d9a33a' : 'rgba(150,180,210,0.25)'}" stroke-width="${n.st === 'won' ? 3 : 1.5}" stroke-dasharray="${n.st === 'won' ? '0' : '4 4'}"/>`).join('')}
      ${C.neigh.map(n => `<g class="${n.st === 'protest' ? 'cr-pulse' : ''}"><polygon points="${hex(n.x, n.y, 40)}" fill="${stColor(n)}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <text x="${n.x}" y="${n.y - 2}" text-anchor="middle" class="cr-t">${esc(n.name.replace(/^(Республика|Королевство|Федерация|Эмират|Султанат|Ханство) /, ''))}</text>
        <text x="${n.x}" y="${n.y + 14}" text-anchor="middle" class="cr-s">${stText[n.st]}</text></g>`).join('')}
      <g class="${C.heat >= 70 ? 'cr-pulse' : ''}"><polygon points="${hex(meX, meY, 58)}" fill="${meCol}" stroke="#fff" stroke-width="2.5"/>
        <text x="${meX}" y="${meY - 6}" text-anchor="middle" class="cr-t big">${esc(S.country.replace(/^Республика /, ''))}</text>
        <text x="${meX}" y="${meY + 14}" text-anchor="middle" class="cr-s">улица ${Math.round(C.heat)}</text></g>
    </svg>`;
    const nextVote = CR_ELECTIONS.find(t => t > S.turn);
    const acts = Game.crActions();
    const log = C.log.slice(0, 12).map(e => `<li><time>${e.y}</time><span><b>${esc(e.name)}</b> — ${esc(e.res)}${e.real ? '' : ' <span class="chip">соседи</span>'}</span></li>`).join('') || '<li><span class="muted">Пока в регионе тихо.</span></li>';
    return `<p class="lede">${S.region === 'africa00' ? 'Главная угроза — улица после выборов. Сфальсифицированный подсчёт, СМС по всей стране, палатки на площади.' : 'Главная угроза нулевых — цветная революция: палатки на площади, цветные ленты и трансляция в интернете.'} Улицу разогревают интернет, бедность, сильные либералы и революции у соседей — эффект домино. Если улица дойдёт до 70, люди выйдут на площадь. Подавление остужает улицу, но растит радикализацию, а радикалы уходят в подполье.</p>
      <div class="cr">
        <section class="card cr-map-card"><div class="eyebrow">Регион</div>${map}
          <div class="legend"><span><i style="background:#3a4a5c"></i>спокойно</span><span><i style="background:#e0632a"></i>протесты</span><span><i style="background:#d9a33a"></i>революция победила</span><span><i style="background:#7a2a24"></i>подавлено</span></div></section>
        <section class="card cr-side">
          ${UI.meter('Улица', C.heat, C.heat >= 70 ? 'bad' : C.heat >= 45 ? 'warn' : 'good')}
          ${UI.meter('Радикализация', C.rad, C.rad >= 60 ? 'bad' : C.rad >= 35 ? 'warn' : 'good')}
          ${UI.meter('Интернет', S.net || 0, 'str')}
          <div class="cr-opp"><span class="cr-ribbon" style="background:${C.opp.hex}"></span><div><b>${esc(C.opp.name)}</b><span class="muted small">${esc(C.opp.role)} · символ протеста: «${esc(C.opp.color)}»</span></div></div>
          <p class="muted small">${nextVote !== undefined ? `Следующие выборы: IV квартал ${ERAS[S.era].start + Math.floor(nextVote / 4)} года.` : 'Выборов в этом десятилетии больше не будет.'} Союзник для «наведения порядка»: ${esc(R.allyName)} (${Game.crAllyOk() ? 'помощь доступна' : `нужны отношения ≥ 55: ${COUNTRIES[R.ally].name}`}).</p>
        </section>
      </div>
      <section class="card mt"><div class="eyebrow">Сводка революций десятилетия</div><ul class="log cr-log">${log}</ul></section>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p><div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx))}</div></div></div>${UI.actBtn('cr:' + a.id, { name: 'Приказать', cost: a.cost, ok: a.ok, danger: a.danger })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('cr:')) return false;
  const out = Game.crAction(id.slice(3));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
