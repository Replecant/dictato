// Конец холодной войны (1980-е) — заполняется
Game.c80Patron = () => (S.region === 'east80' ? 'ussr' : (S.rel.ussr || 0) > (S.rel.usa || 0) ? 'ussr' : 'usa');
Object.assign(NAME_POOLS, {
  phil: { m: ['Хосе', 'Бениньо', 'Рамон', 'Эдуардо', 'Фидель', 'Хуан', 'Рафаэль', 'Эмилио', 'Андрес', 'Сальвадор'], f: ['Корасон', 'Имельда', 'Летисия'], last: ['Рейес', 'Сантос', 'Крус', 'Гарсия', 'Мендоса', 'Агилар', 'Баутиста', 'Дела-Пас', 'Макапагал', 'Осменья', 'Лаурель', 'Танада'] },
});
for (const n of ['Корасон', 'Имельда', 'Летисия', 'Роза']) FEMALE_NAMES.add(n);
Object.assign(RICH_TITLE, { phil: 'Дон' });
Object.assign(DEFAULT_PILLARS, DEFAULT_PILLARS_80);
CAPITAL_PATTERN.phil = n => `Сьюдад-${n}`;
NEW_FACTIONS['1980'] = {
  name: 'Правозащитники', short: 'Правозащитники', icon: '🕯️',
  desc: 'Матери пропавших с фотографиями, священники со списками арестованных и юристы, которые пишут в Женеву. Оружия у них нет, зато их слушает весь мир.',
  rivals: ['hawks'], risk: 'rev', appear: S => S.year >= 1983,
  intro: 'По четвергам у здания правительства молча стоят женщины с фотографиями сыновей. Их не разгоняют: на них смотрят иностранные корреспонденты.',
};

// ================= Конец холодной войны: покровитель, долг и улица =================
// Покровитель: в соцлагере — Москва, иначе — та сверхдержава, с которой отношения лучше.
const C80_REGION = {
  latam80: {
    tab: 'Конец холодной войны', street: 'кастрюльный марш', streetLoc: 'на площади Конституции', vote: [1988, 4], me: [300, 160],
    voteTitle: 'Плебисцит: «да» или «нет»', voteText: 'Страна голосует: ещё восемь лет вашего правления — «да» или «нет». Американские наблюдатели в каждом избирательном участке.',
    cities: {
      managua: ['Манагуа', 120, 40, [[1979.5, 'rev', 'сандинисты у власти'], [1982.0, 'war', 'война с контрас']]],
      salvador: ['Сан-Сальвадор', 50, 110, [[1980.25, 'war', 'гражданская война']]],
      panama: ['Панама', 200, 92, [[1983.5, 'junta', 'генерал Норьега'], [1989.95, 'crushed', 'вторжение США']]],
      lima: ['Лима', 140, 230, [[1980.25, 'demo', 'выборы после военного правления'], [1982.0, 'war', '«Сияющий путь» в горах']]],
      lapaz: ['Ла-Пас', 235, 268, [[1980.5, 'junta', '«кокаиновый переворот»'], [1982.75, 'demo', 'гражданское правительство']]],
      brasilia: ['Бразилиа', 420, 240, [[1979.9, 'junta', 'военный режим'], [1985.0, 'demo', 'гражданский президент']]],
      asuncion: ['Асунсьон', 330, 318, [[1979.9, 'junta', 'Стресснер'], [1989.0, 'demo', 'Стресснер свергнут']]],
      santiago: ['Сантьяго', 200, 380, [[1979.9, 'junta', 'Пиночет'], [1983.25, 'barr', '«кастрюльные марши»'], [1983.75, 'junta', 'протесты подавлены'], [1988.75, 'demo', 'плебисцит: «нет»']]],
      ba: ['Буэнос-Айрес', 320, 400, [[1979.9, 'junta', 'хунта'], [1982.25, 'war', 'Фолклендская война'], [1983.75, 'demo', 'президент Альфонсин']]],
      montevideo: ['Монтевидео', 430, 375, [[1979.9, 'junta', 'хунта'], [1985.0, 'demo', 'гражданский президент']]],
    },
  },
  east80: {
    tab: 'Конец холодной войны', street: 'митинг', streetLoc: 'на площади Революции', vote: [1989, 2], me: [455, 262],
    voteTitle: 'Круглый стол и выборы', voteText: 'Оппозиция и партия договорились за круглым столом о выборах. Партии гарантирована часть мест. Остальные — кто кого.',
    cities: {
      berlin: ['Берлин', 200, 80, [[1989.75, 'demo', 'Стена пала']]],
      warsaw: ['Варшава', 330, 90, [[1980.5, 'barr', 'забастовки «Солидарности»'], [1981.95, 'crushed', 'военное положение'], [1989.25, 'demo', '«Солидарность» победила на выборах']]],
      vilnius: ['Вильнюс', 430, 35, [[1989.5, 'barr', '«Балтийский путь»']]],
      moscow: ['Москва', 545, 70, [[1985.25, 'reform', 'перестройка'], [1986.25, 'barr', 'Чернобыль'], [1986.5, 'reform', 'гласность']]],
      prague: ['Прага', 215, 170, [[1989.75, 'demo', 'бархатная революция']]],
      budapest: ['Будапешт', 330, 220, [[1988.25, 'reform', 'реформаторы в партии'], [1989.75, 'demo', 'провозглашена республика']]],
      belgrade: ['Белград', 280, 315, [[1980.25, 'calm', 'умер Тито']]],
      sofia: ['София', 420, 365, [[1989.75, 'reform', 'Живков снят']]],
    },
  },
  asia80: {
    tab: 'Конец холодной войны', street: '«власть народа»', streetLoc: 'на проспекте Свободы', vote: [1986, 1], me: [430, 280],
    voteTitle: 'Досрочные выборы', voteText: 'Вы объявили досрочные выборы, чтобы показать Вашингтону, что народ за вас. Против вас — вдова убитого оппозиционера в жёлтом платье. Американские наблюдатели уже прилетели.',
    cities: {
      kabul: ['Кабул', 45, 45, [[1979.95, 'war', 'советские войска'], [1989.0, 'reform', 'советские войска ушли']]],
      beijing: ['Пекин', 300, 40, [[1989.25, 'barr', 'студенты на Тяньаньмэнь'], [1989.4, 'crushed', 'танки на площади']]],
      seoul: ['Сеул', 450, 55, [[1980.25, 'crushed', 'восстание в Кванджу подавлено'], [1987.5, 'demo', 'прямые выборы']]],
      rangoon: ['Рангун', 95, 150, [[1979.9, 'junta', 'военный режим'], [1988.5, 'crushed', 'восстание «8888» подавлено']]],
      hanoi: ['Ханой', 235, 140, [[1986.9, 'reform', 'обновление «дой мой»']]],
      taipei: ['Тайбэй', 470, 150, [[1987.5, 'reform', 'отменено военное положение']]],
      bangkok: ['Бангкок', 140, 235, [[1979.9, 'junta', 'премьер-генерал'], [1988.6, 'demo', 'выборный премьер']]],
      phnompenh: ['Пномпень', 230, 260, [[1979.9, 'war', 'вьетнамская оккупация'], [1989.75, 'reform', 'вьетнамцы ушли']]],
      jakarta: ['Джакарта', 220, 390, [[1979.9, 'junta', 'генерал Сухарто']]],
    },
  },
};

// Требования держав в 1980-х
for (const d of DEMANDS) if (['ban_left', 'hr', 'comrades'].includes(d.id) && d.eras && !d.eras.includes('1980')) d.eras.push('1980');
DEMANDS.push(
  { id: 'imf_cut', countries: ['imf'], eras: ['1980'], text: () => 'Урезать субсидии на хлеб и бензин', fx: c => ({ support: -5, c80Debt: -6, c80Heat: 5, rel: { imf: 14 } }) },
  { id: 'imf_sell', countries: ['imf'], eras: ['1980'], text: () => 'Продать государственные компании', fx: c => ({ treasury: 10, rel: { imf: 12 }, fac: { left: { a: -6 }, oligarchs: { a: 6 } } }) },
  { id: 'imf_dev', countries: ['imf'], eras: ['1980'], text: () => 'Девальвировать валюту', fx: c => ({ economy: 2, support: -4, c80Debt: -4, rel: { imf: 10 } }) },
  { id: 'camps', countries: ['usa'], regions: ['latam80', 'asia80'], eras: ['1980'], text: () => 'Разместить лагеря «борцов за свободу»', cond: () => Game.c80Patron() === 'usa', fx: c => ({ rel: { usa: 14, ussr: -6 }, c80Need: 6, support: -2, fac: { liberals: { a: -4 } } }) },
  { id: 'afghan80', countries: ['ussr'], eras: ['1980'], text: () => 'Прислать врачей и строителей в Афганистан', fx: c => ({ treasury: -6, rel: { ussr: 12 }, c80Need: 4 }) },
  { id: 'perestroika', countries: ['ussr'], regions: ['east80'], eras: ['1980'], cond: () => S.year >= 1986, text: () => 'Провести перестройку по московскому образцу', fx: c => ({ rel: { ussr: 14 }, c80Need: 5, c80Heat: 5, fac: { liberals: { a: 10 }, oligarchs: { a: -8 } } }) },
  { id: 'popevisit', countries: ['vatican'], eras: ['1980'], text: () => 'Разрешить визит папы римского', fx: c => ({ rel: { vatican: 14, ussr: -5 }, c80Heat: 6, fac: { faith: { a: 12, s: 3 } } }) },
);
const _pickDemand80 = Game.pickDemand;
Game.pickDemand = function (c) {
  if (S.era !== '1980') return _pickDemand80.call(Game, c);
  const keep = DEMANDS.filter(d => (c === 'imf' ? d.countries && d.countries.includes('imf') : !(d.countries && d.countries.includes('imf'))) && !['culture'].includes(d.id));
  const all = DEMANDS.splice(0, DEMANDS.length, ...keep);
  try { return _pickDemand80.call(Game, c); } finally { DEMANDS.splice(0, DEMANDS.length, ...all); }
};
const _countryActions80 = Game.countryActions;
Game.countryActions = function (c) {
  const acts = _countryActions80.call(Game, c);
  if (S.era !== '1980' || c !== 'imf') return acts;
  return acts.filter(a => !['trade', 'arms'].includes(a.id)).map(a => (a.id === 'visit' ? { ...a, name: 'Переговоры в Вашингтоне' } : a.id === 'aid' ? { ...a, name: 'Просить кредит' } : a));
};
const _economyActions80 = Game.economyActions;
Game.economyActions = function () {
  const acts = _economyActions80.call(Game);
  if (S.era !== '1980') return acts;
  for (const a of acts) {
    if (a.id === 'loan_w' && S.region === 'east80') Object.assign(a, { name: 'Кредит западных банков', desc: 'Казна +50, затем 8 выплат по 7 млн. Внешний долг растёт.', cost: 'ФРГ ≥ 40', ok: (S.rel.frg || 0) >= 40 && S.loans.length < 2 });
    if (a.id === 'loan_w' && S.region !== 'east80') a.desc = 'Казна +50, затем 8 выплат по 7 млн. Внешний долг растёт.';
  }
  return S.region === 'east80' ? acts.filter(a => a.id !== 'nationalize') : acts;
};
const _economyFx80 = Game.economyFx;
Game.economyFx = function (id) {
  const r = _economyFx80.call(Game, id);
  if (S.era !== '1980') return r;
  if (id === 'loan_w') { r.fx.c80Debt = 8; if (S.region === 'east80') { r.fx.rel = { frg: 3 }; r.text = 'Западногерманские банки выдали кредит. Взамен — немного гуманитарных уступок и выездные визы для пенсионеров.'; } }
  if (id === 'loan_e') r.fx.c80Debt = 4;
  return r;
};

Object.assign(Game, {
  c80() {
    if (!S.c80) {
      const P = Game.c80Patron();
      S.c80 = {
        need: S.region === 'east80' ? 60 : 65, debt: { latam80: 45, asia80: 40, east80: 35 }[S.region] || 40, heat: 15,
        last: -99, debtAt: -99, cityDone: [], log: [], austerity: -99, defaulted: false, concertAt: -99, basesAt: -99, startPatron: P, needHist: [],
      };
    }
    return S.c80;
  },
  c80Cfg() { return C80_REGION[S.region] || C80_REGION.latam80; },
  c80Rate() { const t = Game.eraTime(); return t < 1981.25 ? 0.6 : t < 1985 ? 1.1 : t < 1989 ? 0.9 : 0.7; },
  c80Interest() { const C = Game.c80(); return C.defaulted ? 0 : Math.round(C.debt * Game.c80Rate() / 12 * 10) / 10; },
  c80Aid() { const C = Game.c80(); return Math.max(0, Math.round((C.need - 30) / (Game.c80Patron() === 'ussr' && S.region !== 'east80' ? 6 : 8))); },
  c80HelpOk() { const C = Game.c80(), t = Game.eraTime(); return C.need >= 55 && (Game.c80Patron() === 'usa' ? t < 1986 : t < 1988.75); },
  c80Actions() {
    const C = Game.c80(), P = Game.c80Patron(), east = S.region === 'east80', t = Game.eraTime(), hot = t < 1987;
    const A = [];
    if (S.turn - C.basesAt >= 6) A.push(P === 'usa'
      ? { id: 'bases', name: 'Предложить Вашингтону базу', desc: 'Аэродром для американских самолётов или лагерь для «борцов за свободу». Пока идёт холодная война, это очень ценится.', ok: true, fx: { c80Need: hot ? 10 : 3, rel: { usa: 6, ussr: -4 }, support: -3, fac: { liberals: { a: -4 } } } }
      : { id: 'bases', name: east ? 'Учения Варшавского договора' : 'Пустить советский флот в порт', desc: east ? 'Танки братских армий на ваших полигонах. Москва помнит, кто был рядом.' : 'Стоянка для советских кораблей и база подлодок. Москва платит нефтью.', ok: true, fx: { c80Need: hot ? 9 : 3, rel: { ussr: 6, usa: -5 }, fear: 2, fac: { hawks: { a: 4 } } } });
    A.push({ id: 'speech', name: P === 'usa' ? 'Антикоммунистическая речь в ООН' : 'Антиимпериалистическая речь в ООН', desc: hot ? 'Покровитель любит громких союзников. Пока холодная война горячая.' : 'После Женевы и Рейкьявика такие речи звучат старомодно. Но немного ещё помогают.', ok: S.treasury >= 3, fx: { treasury: -3, c80Need: hot ? 5 : 1, support: 1, rel: { [P === 'usa' ? 'ussr' : 'usa']: -4 } } });
    A.push({ id: 'officers', name: 'Премии и квартиры офицерам', desc: 'Генералы получают новые квартиры, полковники — машины, лейтенанты — обещания. Армия запомнит, кто о ней заботился.', ok: S.treasury >= 12, fx: { treasury: -12, army: 6, fac: { hawks: { a: 8 } } } });
    A.push({ id: 'creditors', name: 'Сесть за стол с кредиторами', desc: 'МВФ, банкиры с Уолл-стрит и посол покровителя торгуются о вашем долге. Каждый хочет своего.', ok: true, scene: true, fx: {} });
    A.push({ id: 'rollover', name: 'Перезанять у банков', desc: 'Новый кредит, чтобы заплатить проценты по старым. Банкиры охотно дают, пока верят, что вы отдадите.', ok: C.debt < 90 && !C.defaulted, fx: { treasury: 20, c80Debt: 12 } });
    if (S.turn - C.concertAt >= 4) A.push({ id: 'concert', name: east ? 'Разрешить рок-концерт на стадионе' : 'Бесплатный рок-концерт на стадионе', desc: 'Молодёжь выпустит пар под гитары. Церковь ворчит, а «Свободная Европа» удивлена.', ok: S.treasury >= 5, fx: { treasury: -5, c80Heat: -8, fac: { liberals: { a: 5 }, faith: { a: -4 } } } });
    A.push({ id: 'soap', name: 'Купить бразильский сериал для телевидения', desc: 'Сто серий о любви и рабстве. В часы показа улицы пустеют.', ok: S.treasury >= 6, fx: { treasury: -6, support: 3, c80Heat: -5 } });
    A.push({ id: 'dialogue', name: 'Диалог с оппозицией', desc: 'Пригласить лидеров оппозиции и церкви за один стол. Улица остывает, генералы нервничают.', ok: true, fx: { c80Heat: -12, fear: -3, fac: { liberals: { a: 10 }, hawks: { a: -6 } } } });
    return A.map(a => ({ ...a, cost: '1 приказ' }));
  },
  c80Action(id) {
    const a = Game.c80Actions().find(x => x.id === id);
    if (!a || !a.ok || a.scene || !Game.spend()) return null;
    const C = Game.c80();
    if (id === 'concert') C.concertAt = S.turn;
    if (id === 'bases') C.basesAt = S.turn;
    const changes = Game.apply(a.fx);
    const text = `${a.name}. ${a.desc}`;
    Game.log(text);
    return { text, changes };
  },
  // Шанс, что армия останется с вами, когда улица выйдет на площадь
  c80Loyalty() {
    const C = Game.c80();
    return clamp(0.15 + S.army / 220 + S.fac.hawks.a / 260 + (C.need >= 55 ? 0.1 : 0) + (S.flags.c80Immunity ? 0.08 : 0) - C.heat / 350, 0.1, 0.85);
  },
  c80StreetScene() {
    const C = Game.c80(), P = Game.c80Patron(), t = Game.eraTime(), east = S.region === 'east80', lat = S.region === 'latam80';
    C.last = S.turn;
    const big = C.heat >= 85, loy = Game.c80Loyalty(), PN = COUNTRIES[P].name;
    const reform = lat ? 'командующие флотом и авиацией' : east ? 'генералы армии' : 'полковники-реформисты';
    const choices = [
      { text: 'Приказать армии очистить улицы', adv: ['defense'], chance: () => Game.c80Loyalty(),
        win: { fx: { c80Heat: -40, fear: 8, support: -8, rel: { $west: -10 }, c80Need: P === 'usa' && t >= 1986 ? -8 : 0 }, res: 'Генералы выполнили приказ. К утру улицы пусты, а телевидение показывает уборщиков. Иностранные корреспонденты показывают другое.' },
        lose: { fx: { c80Heat: 12, army: -20, flag: { c80Defect: true } }, res: `Генералы не стали выполнять приказ. ${reform[0].toUpperCase() + reform.slice(1)} заявили по радио, что «армия с народом». Солдаты раздают толпе цветы.` } },
      { text: 'Купить генералов: премии, дачи, звания', adv: ['economy'], req: S => S.treasury >= 15, reqText: 'нужно 15 млн', fx: { treasury: -15, army: 10, c80Heat: -8, fac: { hawks: { a: 12 } } }, res: 'Генералы получили новые звёзды и ключи от дач. Улица всё ещё шумит, но армия теперь смотрит на неё из окон дач.' },
      { text: 'Сменить командующего на верного человека', fx: { fireRole: 'defense', army: -4, c80Heat: -5, fac: { hawks: { a: -6 } } }, res: 'Министр обороны уволен. Новый — ваш родственник: в штабе он не разбирается, зато не предаст. Наверное.' },
      { text: 'Пообещать армии неприкосновенность', fx: { flag: { c80Immunity: true }, c80Heat: -6, fac: { hawks: { a: 12 }, liberals: { a: -10 } } }, res: 'Вы подписали указ: ни один офицер не будет судим, что бы ни случилось. Генералы облегчённо вздохнули. Матери пропавших — нет.' },
      { text: east ? 'Круглый стол с оппозицией' : 'Переговоры с оппозицией и церковью', fx: { c80Heat: -28, fear: -5, fac: { liberals: { a: 15 }, hawks: { a: -8 } } }, res: 'Вы сели за один стол с теми, кого вчера называли врагами. Генералы смотрят на вас и решают, с вами ли они ещё.' },
    ];
    if (C.need >= 35) choices.push({ text: `Договориться о «мягкой посадке»: ${PN}`, fx: { end: 'softland' }, res: P === 'usa' ? 'Посол пообещал самолёт, охрану и неприкосновенность вашего счёта. В обмен — отставка сегодня вечером.' : 'Москва предлагает самолёт, дачу в Подмосковье и пенсию. В обмен — отставка «по состоянию здоровья».' });
    choices.push({ text: 'Улететь на вертолёте с крыши', fx: { end: 'helicopter' }, res: 'Вертолёт поднимается с крыши дворца. Внизу — толпа, впереди — граница. Охрана, кажется, машет вам вслед. Или кулаками.' });
    return {
      title: 'Генералы решают', bg: 'night', crisis: big,
      lines: [
        ['narrator', lat ? `${big ? 'Сотни тысяч' : 'Десятки тысяч'} человек бьют ложками в кастрюли на площади Конституции. Матери пропавших держат фотографии. Но исход решит не площадь, а казармы.`
          : east ? `${big ? 'Сотни тысяч' : 'Десятки тысяч'} человек на площади Революции. Из флага вырезали герб — на флаге теперь дыра. Но исход решит не площадь, а армия.`
            : `${big ? 'Миллион' : 'Сотни тысяч'} человек на проспекте Свободы. Монахини с чётками стоят перед бронетранспортёрами. Но исход решит не проспект, а армия.`],
        ['defense', loy >= 0.55 ? 'Армия пока с вами. Пока. Генералы ждут приказа — и смотрят, что скажет покровитель.' : `Не все офицеры со мной согласны. ${reform[0].toUpperCase() + reform.slice(1)} собрались в штабе и не отвечают на звонки.`],
        ['foreign', C.need >= 55 ? `Покровитель (${PN}) ещё на вашей стороне. Генералы это знают.` : `Покровитель (${PN}) советует «проявить сдержанность». Генералы это тоже слышали.`],
        ['narrator', `Армия выполнит приказ стрелять с вероятностью примерно ${Math.round(loy * 100)}%.`],
      ],
      choices,
      after: (out, choice) => {
        const e = choice && choice.fx && choice.fx.end;
        if (e === 'softland') { S.flags.c80Soft = true; S.swiss += Math.max(0, S.treasury * 0.3); return 'retired'; }
        if (e) return e;
        if (S.flags.c80Defect && Game.c80().heat >= 75) return 'revolution';
        return Game.c80().heat >= 95 ? 'revolution' : null;
      },
    };
  },
  c80DebtScene(voluntary) {
    const C = Game.c80(), P = Game.c80Patron(), east = S.region === 'east80';
    C.debtAt = S.turn;
    const choices = [
      { text: 'Программа МВФ: кредит в обмен на экономию', adv: ['economy'], req: S => (S.rel.imf || 0) >= 30, reqText: 'нужны отношения с МВФ ≥ 30', fx: { c80Debt: -20, support: -6, c80Heat: 10, rel: { imf: 12 } }, res: 'Цены на хлеб и бензин выросли за одну ночь. Эксперты МВФ поселились в министерстве финансов и пьют там свой кофе.' },
      { text: 'Стравить кредиторов друг с другом', adv: ['foreign'], chance: () => 0.45,
        win: { fx: { c80Debt: -12, rel: { imf: -4 } }, res: 'Министр шепнул банкирам, что МВФ требует списать половину, а МВФ — что банки готовы. Пока они выясняли, кто кого обманул, долг немного уменьшился.' },
        lose: { fx: { c80Debt: 6, rel: { imf: -8 } }, res: 'Банкиры и МВФ поговорили между собой. Проценты выросли, а министра больше не приглашают на завтраки.' } },
    ];
    if (!east) choices.push({ text: 'Обменять долг на акции рудников и заводов', fx: { c80Debt: -18, support: -4, fac: { oligarchs: { a: 6 }, left: { a: -10 } } }, res: 'Банки стали хозяевами половины ваших рудников. Долг уменьшился, а над шахтами теперь висят флаги чужих банков.' });
    else choices.push({ text: 'Выплатить любой ценой', req: S => S.treasury >= 25, reqText: 'нужно 25 млн', fx: { treasury: -25, c80Debt: -20, support: -8, c80Heat: 6, economy: -2 }, res: 'Весь экспорт ушёл на выплаты. В магазинах пусто, в квартирах холодно, зато кредиторы вами довольны.' });
    if (!east && S.year >= 1987) choices.push({ text: 'Обменять долг на охрану лесов', fx: { c80Debt: -8, rel: { $west: 6 }, economy: -1 }, res: 'Экологический фонд выкупил часть долга, а вы пообещали не рубить лес в горах. Генералы спрашивают, где теперь строить дачи.' });
    if (C.need >= 45) choices.push({ text: `Попросить покровителя заплатить: ${COUNTRIES[P].name}`, fx: { c80Debt: -18, c80Need: -12, rel: { [P]: -3 } }, res: P === 'usa' ? 'Вашингтон уговорил банки списать часть долга. Посол мягко напомнил, что такие услуги не бесплатны.' : 'Москва прислала нефть в кредит. Кредит, разумеется, придётся отдавать — и не только нефтью.' });
    if (!C.defaulted) choices.push({ text: 'Объявить мораторий на выплаты', fx: { c80Debt: -25, economy: -6, rel: { imf: -20, $west: -6 }, flag: { c80Default: true } }, res: 'Вы объявили, что страна платить не будет. Банкиры в шоке, народ в восторге — до тех пор, пока не кончился импорт.' });
    if (voluntary) choices.push({ text: 'Встать из-за стола', fx: {}, res: 'Вы вежливо поблагодарили всех и ушли. Проценты, к сожалению, остались за столом.' });
    return {
      title: 'Стол кредиторов', bg: 'office',
      lines: [
        ['npc:imf_amb', `Ваш внешний долг — ${Math.round(C.debt)} пунктов, проценты съедают ${String(Game.c80Interest()).replace('.', ',')} млн в квартал. Мы готовы помочь. При условии, что вы урежете субсидии.`],
        ['npc:yuppie', 'Банки не против подождать. Но за ожидание тоже надо платить. Например, рудниками. Или сахарными заводами. Мы не привередливы.'],
        [P === 'usa' ? 'npc:usa_amb' : 'npc:ussr_amb', C.need >= 45 ? 'Мы можем замолвить за вас слово. Друзья помогают друзьям. Пока они друзья.' : 'Это ваши долги, а не наши. Времена изменились.'],
        ['economy', '{Addr}, денег в казне хватит на два квартала выплат. Или на один квартал зарплат. На то и другое — нет.'],
      ],
      choices,
      after: () => { if (S.flags.c80Default) Game.c80().defaulted = true; return null; },
    };
  },
  c80VoteScene() {
    const C = Game.c80(), R = Game.c80Cfg(), east = S.region === 'east80';
    S.flags.c80Vote = true;
    const winP = clamp(S.support / 100 + 0.18 - C.heat / 400, 0.1, 0.85);
    const choices = [
      { text: 'Нарисовать нужный результат', adv: ['propaganda'], fx: { c80Heat: 25, c80Need: -10, rel: { $west: -8 }, support: -3 }, res: 'Вы победили с большим отрывом. Счётчики голосов в центральной комиссии ушли со своих мест прямо во время подсчёта — и об этом уже знает весь мир.' },
      { text: 'Честные выборы', chance: () => winP,
        win: { fx: { c80Heat: -25, c80Need: 6, rel: { $west: 10 }, support: 5, fac: { liberals: { a: 10 } } }, res: 'Вы действительно победили. Оппозиция признала итоги, а в Вашингтоне и Бонне вас вдруг назвали «демократом». Непривычно.' },
        lose: { fx: { flag: { c80Lost: true } }, res: 'Подсчёт закончен. Вы проиграли. Генералы смотрят на вас и ждут, что вы скажете.' } },
      { text: 'Отменить голосование «из-за угрозы порядку»', adv: ['police'], fx: { c80Heat: 30, c80Need: -12, rel: { $west: -12 }, fear: 6 }, res: 'Голосование отменено. Оппозиция объявила всеобщую забастовку, а посол покровителя уехал «на консультации».' },
    ];
    if (east) choices.splice(2, 0, { text: 'Выборы только на треть мест', adv: ['foreign'], fx: { c80Heat: -12, fac: { liberals: { a: 10 }, oligarchs: { a: -8 } }, rel: { $west: 5 } }, res: 'Оппозиция получила все места, которые разрешили оспаривать. Партия получила остальные — и поняла, что следующих выборов не переживёт.' });
    return {
      title: R.voteTitle, bg: 'square',
      lines: [
        ['narrator', R.voteText],
        ['propaganda', 'Бюллетени уже напечатаны. Можно и подсчёт напечатать заранее. Так надёжнее.'],
        ['foreign', 'Покровитель внимательно смотрит. Ему теперь не всё равно, как выглядят его друзья.'],
      ],
      choices,
      after: () => (S.flags.c80Lost ? 'retired' : null),
    };
  },
  c80DoctrineScene() {
    S.flags.c80Doctrine = true;
    const P = Game.c80Patron();
    if (P === 'ussr') return {
      title: 'Новый человек в Кремле', bg: 'office',
      lines: [
        ['npc:ussr_amb', 'Михаил Сергеевич просит всех друзей задуматься о перестройке. И о том, что нефть по льготной цене — это пережиток застоя.'],
        ['police', 'Если начать перестройку у нас, через год все захотят гласности. А через два — не захотят нас.'],
      ],
      choices: [
        { text: 'Объявить свою перестройку', fx: { c80Heat: 6, c80Need: 8, rel: { ussr: 10 }, fac: { liberals: { a: 12 }, oligarchs: { a: -8 } } }, res: 'Газеты напечатали слово «гласность». Через неделю их уже читают вслух в очередях. Москва довольна.' },
        { text: 'Вежливо улыбаться и ничего не менять', adv: ['foreign'], fx: { c80Need: -8, rel: { ussr: -3 } }, res: 'Вы кивали на каждом совещании. В Москве поняли, что вы ничего не поняли.' },
        { text: 'Публично спорить с Москвой', fx: { rel: { ussr: -15, usa: 10, frg: 8 }, c80Need: -15, support: 5 }, res: 'Вы заявили, что у вашей страны свой путь. Запад аплодирует «независимому коммунисту». Москва перестала присылать нефть.' },
      ],
    };
    return {
      title: 'Вашингтон меняет друзей', bg: 'office',
      lines: [
        ['npc:usa_amb', 'После Манилы Конгресс задаёт вопросы о всех наших друзьях. Нам нужны выборы. Хотя бы похожие на настоящие.'],
        ['defense', 'Мой генерал, когда коммунисты были в горах, им не нужны были выборы. Коммунисты всё ещё в горах!'],
      ],
      choices: [
        { text: 'Пообещать выборы', fx: { c80Need: 6, c80Heat: -4, fac: { liberals: { a: 8 }, hawks: { a: -4 } } }, res: 'Вы пообещали выборы. Посол улыбнулся впервые за полгода.' },
        { text: 'Напомнить о коммунистах в горах', adv: ['defense'], fx: S => ({ c80Need: S.fac.left.s >= 40 ? 3 : -6, rel: { usa: -2 } }), res: 'Посол выслушал про партизан. В Вашингтоне, кажется, про них уже слышали.' },
        { text: 'Поискать нового друга в Москве', fx: { rel: { ussr: 12, usa: -15 }, c80Need: -10 }, res: 'Советский посол пришёл с тортом. Американский — с ультиматумом. Торт оказался вкуснее, но ультиматум важнее.' },
      ],
    };
  },
  c80BalconyScene() {
    S.flags.c80Balcony = true;
    const C = Game.c80();
    return {
      title: 'Митинг на площади Революции', bg: 'square', crisis: true,
      lines: [
        ['propaganda', 'Сто тысяч человек, товарищ генеральный. Всех привезли автобусами с заводов. Им раздали флажки и портреты. Они будут аплодировать.'],
        ['narrator', 'Вы выходите на балкон и начинаете речь. На третьей минуте в задних рядах кто-то свистит. Потом ещё кто-то. Потом площадь гудит, как улей.'],
        ['police', 'Товарищ генеральный... может быть, внутрь? Вертолёт на крыше готов.'],
      ],
      choices: [
        { text: 'Пообещать прибавку к зарплате на сто крон', chance: () => clamp(S.support / 110 - C.heat / 300 + 0.2, 0.1, 0.7),
          win: { fx: { c80Heat: -20, treasury: -10 }, res: 'Площадь затихла и даже похлопала. Сто крон — это сто крон. Люди расходятся, обсуждая, что на них купить.' },
          lose: { fx: { c80Heat: 25 }, res: 'Площадь засвистела громче. Прямой эфир прервали посреди фразы, и вся страна увидела ваше растерянное лицо.' } },
        { text: 'Прервать речь и уйти с балкона', fx: { c80Heat: 10 }, res: 'Вы ушли с балкона. Митинг продолжился без вас — и уже совсем по-другому.' },
        { text: 'Приказать разогнать площадь', adv: ['defense'], chance: () => clamp(0.2 + S.army / 300 + S.fear / 300, 0.1, 0.6),
          win: { fx: { c80Heat: -30, fear: 10, support: -10, rel: { $west: -15 } }, res: 'Площадь разогнали. В городе стреляли всю ночь. Утром кажется, что всё кончено. Но так всегда кажется утром.' },
          lose: { fx: { c80Heat: 20, army: -15 }, res: 'Армия отказалась стрелять. Министр обороны, по слухам, застрелился. По другим слухам — перешёл к восставшим.' } },
        { text: 'Бежать к вертолёту на крыше', fx: { end: 'helicopter' }, res: 'Вертолёт взлетает с крыши здания ЦК, когда толпа уже ломает двери. Пилот спрашивает, куда лететь. Хороший вопрос.' },
      ],
      after: (out, choice) => (choice && choice.fx && choice.fx.end ? 'helicopter' : Game.c80().heat >= 95 ? 'revolution' : null),
    };
  },
});

Game.newGameHooks.push(() => { if (S.era === '1980') Game.c80(); });
// Соцлагерь: церковь под надзором слабее, при военном положении профсоюз запрещён, опора вождя — номенклатура
Game.newGameHooks.push(() => {
  if (S.region !== 'east80') return;
  const rp = (REGION_PILLARS_80[S.region] || {})[S.regime];
  if (rp) S.pillars = [...rp];
  S.fac.faith.s = Math.min(S.fac.faith.s, 22); S.fac.faith.a = Math.min(S.fac.faith.a, 45);
  if (S.regime === 'junta80') S.fac.left.st = 'banned';
});
Game.applyHooks.push(fx => {
  if (S.era !== '1980') return;
  const C = Game.c80();
  if (fx.c80Need) C.need = clamp(C.need + fx.c80Need);
  if (fx.c80Debt) C.debt = clamp(C.debt + fx.c80Debt);
  if (fx.c80Heat) C.heat = clamp(C.heat + fx.c80Heat);
  if (fx.flag && fx.flag.c80Default) C.defaulted = true;
});
Game.previewHooks.push((fx, out) => {
  if (S.era !== '1980') return;
  const first = [];
  if (fx.c80Heat) first.push({ icon: '📢', d: -fx.c80Heat, label: 'Улица', text: `улица ${sign(fx.c80Heat)}` });
  if (fx.c80Need) first.push({ icon: '🛰️', d: fx.c80Need, label: 'Нужность покровителю', text: `покровитель ${sign(fx.c80Need)}` });
  if (fx.c80Debt) first.push({ icon: '💳', d: -fx.c80Debt, label: 'Внешний долг', text: `долг ${sign(fx.c80Debt)}` });
  out.unshift(...first);
});
Game.incomeHooks.push(() => (S.era === '1980' && Game.c80Aid() ? { label: `Помощь покровителя: ${COUNTRIES[Game.c80Patron()].name}`, v: Game.c80Aid() } : null));
Game.incomeHooks.push(() => (S.era === '1980' && Game.c80Interest() ? { label: 'Проценты по внешнему долгу', v: -Game.c80Interest() } : null));
Game.revHooks.push(() => (S.era === '1980' && S.c80 ? Math.max(0, S.c80.heat - 40) / 60 * 0.12 : 0));
Game.coupHooks.push(() => {
  if (S.era !== '1980' || !S.c80) return 0;
  const C = S.c80, P = Game.c80Patron();
  return (C.need >= 65 ? -0.04 : 0) + (C.need < 25 ? (P === 'usa' ? 0.05 : 0.02) : 0) + (S.flags.bayonets80 ? 0.02 : 0);
});

Game.forcedList.push(() => {
  if (S.era !== '1980' || S.over) return null;
  const C = Game.c80(), R = Game.c80Cfg(), t = Game.eraTime(), P = Game.c80Patron();
  for (const [k, [name, , , tl]] of Object.entries(R.cities)) for (const [at, st, res] of tl) {
    const key = k + at;
    if (at > t + 0.01 || C.cityDone.includes(key)) continue;
    C.cityDone.push(key);
    if (at >= 1980) C.log.unshift({ y: Math.floor(at), name, res, st });
  }
  const [vy, vq] = R.vote;
  if (!S.flags.c80Vote && S.year === vy && S.q === vq) return Game.c80VoteScene();
  if (!S.flags.c80Doctrine && (P === 'ussr' ? t >= 1985.25 : t >= 1986.25)) return Game.c80DoctrineScene();
  if (S.region === 'east80' && !S.flags.c80Balcony && t >= 1989.75 && C.heat >= 50) return Game.c80BalconyScene();
  if (C.heat >= 70 && S.turn - C.last >= 3) return Game.c80StreetScene();
  if (C.debt >= 68 && S.turn - C.debtAt >= 6) return Game.c80DebtScene(false);
  return null;
});
Game.quarterHooks.push(rep => {
  if (S.era !== '1980') return;
  const C = Game.c80(), t = Game.eraTime(), P = Game.c80Patron(), east = S.region === 'east80';
  const phase = t < 1985.25 ? 0.4 : t < 1987 ? -1.2 : t < 1989 ? -2.2 : -3.5;
  C.need = clamp(C.need + phase + (t < 1987 ? (S.fac.left.s - 30) / 40 : 0) + ((S.rel[P] || 50) - 55) / 40);
  C.needHist = [...(C.needHist || []), Math.round(C.need)].slice(-41);
  if (S.treasury < 0) C.debt = clamp(C.debt + 1.5);
  C.heat = clamp(C.heat + 0.3 + Math.max(0, 45 - S.support) / 14 + (S.economy < 40 ? 1 : 0) + S.fac.liberals.s / 80 + (S.turn - C.austerity < 4 ? 1 : 0)
    - S.fear / 90 - (S.support > 60 ? 1.5 : 0) + (t >= 1985.25 ? 0.4 : 0) + (t >= 1989 ? 0.8 : 0) + (east && t >= 1988.75 ? 1 : 0));
  if (C.heat >= 55) rep.warn.push(`Улица: ${Math.round(C.heat)} из 100. ${C.heat >= 70 ? 'Люди готовы выйти в любой момент.' : 'В очередях и на кухнях говорят о переменах.'}`);
  if (C.debt >= 60) rep.warn.push(`Внешний долг: ${Math.round(C.debt)}. Проценты — ${Game.c80Interest()} млн в квартал.`);
  if (C.need < 30 && t >= 1985) rep.warn.push(`Покровитель (${COUNTRIES[P].name}) теряет к вам интерес: нужность ${Math.round(C.need)}.`);
});

Game.endingHooks.push((type, E, verdicts) => {
  if (S.era !== '1980' || !S.c80) return;
  const C = S.c80, R = REGIONS[S.region], T = S.leader.title;
  if (type === 'retired' && S.flags.c80Lost) {
    E.title = S.region === 'latam80' ? 'Проиграл плебисцит' : S.region === 'asia80' ? 'Проиграл досрочные выборы' : 'Проиграл круглый стол';
    E.text = S.region === 'latam80' ? 'Вы проиграли плебисцит и признали итоги — генералы не оставили выбора. Как Пиночет, вы остались главнокомандующим армией и пожизненным сенатором. Демократия наступила, но вас пока никто не трогает. Пока.'
      : S.region === 'asia80' ? `Вы проиграли выборы и попытались объявить себя победителем. Вашингтон прислал вертолёт и вежливо предложил улететь. Теперь вы живёте в ${R.exile}, а в вашем дворце открыли музей туфель первой леди.`
        : 'Партия проиграла выборы, и вы стали президентом при парламенте оппозиции. Через год вы ушли сами. Историки до сих пор спорят, были вы последним диктатором или первым реформатором.';
    verdicts.push('Ушёл после голосования'); S.flags.scoreBonus = (S.flags.scoreBonus || 0) + 120;
  }
  if (type === 'retired' && S.flags.c80Soft) {
    const P = Game.c80Patron();
    E.title = 'Мягкая посадка';
    E.text = P === 'usa' ? `Посол сдержал слово: американский самолёт, охрана и тихий дом в ${R.exile}. Ваш счёт никто не тронул, а новое правительство решило, что судить вас дороже, чем забыть. Так когда-то улетели Маркос и Бэби Док.` : 'Москва прислала самолёт. Теперь вы живёте на даче под Москвой, гуляете с собакой и читаете газеты, в которых о вас больше не пишут. Так когда-то уехал Хонеккер.';
    verdicts.push('Ушёл по договорённости'); S.flags.scoreBonus = (S.flags.scoreBonus || 0) + 60;
  }
  if (type === 'helicopter' && S.region === 'east80') E.text = 'Вертолёт взлетел с крыши здания ЦК, когда толпа уже была внутри. Через час пилот посадил его в поле, «потому что кончается топливо». Дальше вы ехали на попутной машине. Это было последнее, что о вас знали точно.';
  if (type === 'revolution' && C.heat >= 70) {
    E.title = S.region === 'east80' ? 'Смела Осень народов' : S.region === 'asia80' ? 'Смела «власть народа»' : 'Смели кастрюльные марши';
    E.text = S.region === 'east80' ? 'Толпа взяла здание ЦК, а телевидение впервые за сорок лет вышло в эфир без цензуры: «Мы свободны!». Ваш портрет выбросили из окна, а флаг с дырой посередине стал символом новой страны.'
      : S.region === 'asia80' ? 'Монахини с чётками остановили танки, а танкисты перешли на сторону народа. Вы улетели на американском вертолёте. Во дворце нашли три тысячи пар туфель — фотографии облетели весь мир.'
        : 'Миллион человек с кастрюлями дошли до дворца. Генералы хунты объявили, что «армия возвращается в казармы», и первыми покинули ваш кабинет.';
    verdicts.push('Свергнут улицей');
  }
  if (type === 'survived') { E.title = 'Встретил 1990 год'; E.text = `31 декабря 1989 года. Берлинская стена пала, холодная война кончилась, а многие ваши соседи по клубу диктаторов уже в изгнании или в тюрьме. Вы всё ещё ${T}. ${C.need >= 40 ? 'Покровитель, как ни странно, всё ещё рядом.' : 'Правда, покровителю вы больше не нужны, и новое десятилетие придётся встречать одному.'}`; }
  if (C.debt >= 80) verdicts.push('Должник века');
  if (C.defaulted) verdicts.push('Объявил дефолт');
  if (S.flags.c80Immunity) verdicts.push('Неприкосновенность для генералов');
  if (C.need >= 60) verdicts.push('Незаменимый союзник');
});

Object.assign(UI, {
  tab_cold80() {
    const C = Game.c80(), R = Game.c80Cfg(), P = Game.c80Patron(), t = Game.eraTime();
    const X = y => 46 + (y - 1980) * 52, Y = v => 250 - v * 2.1;
    const hist = (C.needHist || []).length ? C.needHist : [Math.round(C.need)];
    const pts = hist.map((v, i) => `${X(1980 + (S.turn - hist.length + 1 + i) / 4).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    // прогноз: что будет, если ничего не делать
    let n = C.need; const proj = [`${X(t).toFixed(1)},${Y(n).toFixed(1)}`];
    for (let q = S.turn + 1; q <= 40; q++) { const tt = 1980 + q / 4; n = clamp(n + (tt < 1985.25 ? 0.4 : tt < 1987 ? -1.2 : tt < 1989 ? -2.2 : -3.5) + ((S.rel[P] || 50) - 55) / 40); proj.push(`${X(tt).toFixed(1)},${Y(n).toFixed(1)}`); }
    const fallen = P === 'usa'
      ? [[1986.1, 'Бэби Док'], [1986.15, 'Маркос'], [1987.5, 'Чон Ду Хван'], [1988.75, 'Пиночет'], [1989.1, 'Стресснер'], [1989.97, 'Норьега']]
      : [[1988.4, 'Кадар'], [1989.8, 'Хонеккер'], [1989.86, 'Живков'], [1989.9, 'Гусак'], [1989.98, 'Чаушеску']];
    const fallenNote = P === 'usa'
      ? 'Бэби Док (Гаити, февраль 1986), Маркос (Филиппины, февраль 1986), Чон Ду Хван (Южная Корея, 1987), Пиночет (Чили, проиграл плебисцит в 1988), Стресснер (Парагвай, февраль 1989), Норьега (Панама, декабрь 1989)'
      : 'Кадар (Венгрия, снят партией в мае 1988), Хонеккер (ГДР, октябрь 1989), Живков (Болгария, ноябрь 1989), Гусак (Чехословакия, декабрь 1989), Чаушеску (Румыния, декабрь 1989)';
    const bands = [[1980, 1985.25, 'горячая война', 'rgba(255,77,90,0.10)'], [1985.25, 1987, 'разговоры', 'rgba(255,194,61,0.08)'], [1987, 1989, 'разрядка', 'rgba(45,182,230,0.08)'], [1989, 1990, 'конец', 'rgba(62,240,160,0.08)']];
    const chart = `<svg class="c80-map" viewBox="0 0 600 300" role="img" aria-label="Барометр покровителя">
      ${bands.map(([a, b, name, col]) => `<rect x="${X(a)}" y="30" width="${X(b) - X(a)}" height="220" fill="${col}"/><text x="${(X(a) + X(b)) / 2}" y="44" text-anchor="middle" class="c80-s">${name}</text>`).join('')}
      ${[0, 25, 50, 75, 100].map(v => `<line x1="46" y1="${Y(v)}" x2="566" y2="${Y(v)}" class="c80-grid"/><text x="40" y="${Y(v) + 4}" text-anchor="end" class="c80-s">${v}</text>`).join('')}
      ${[1980, 1982, 1984, 1986, 1988, 1990].map(y => `<text x="${X(y)}" y="268" text-anchor="middle" class="c80-s">${y}</text>`).join('')}
      <line x1="46" y1="${Y(30)}" x2="566" y2="${Y(30)}" class="c80-danger"/><text x="564" y="${Y(30) - 5}" text-anchor="end" class="c80-s warn">ниже 30 — покровитель вас бросит</text>
      ${fallen.map(([y, name], i) => `<g class="c80-fall"><line x1="${X(y)}" y1="56" x2="${X(y)}" y2="250"/><text x="${X(y) - 3}" y="${62 + i * 13}" text-anchor="end" class="c80-s">${name}</text></g>`).join('')}
      <polyline points="${proj.join(' ')}" class="c80-proj"/>
      <polyline points="${pts}" class="c80-line"/>
      <circle cx="${X(t)}" cy="${Y(C.need)}" r="6" class="c80-now"/>
    </svg>`;
    const phase = t < 1985.25 ? 'Холодная война в разгаре: покровитель ценит союзников и платит им.' : t < 1987 ? 'Сверхдержавы начали разговаривать. Покровитель всё реже вспоминает о вас.' : t < 1989 ? 'Разрядка: договоры, саммиты, вывод войск. Союзники с плохой репутацией становятся обузой.' : 'Холодная война кончается. Покровителю вы больше не нужны.';
    const [vy, vq] = R.vote;
    const voteTxt = S.flags.c80Vote ? `${R.voteTitle} — уже позади.` : `${R.voteTitle}: ${['I', 'II', 'III', 'IV'][vq - 1]} квартал ${vy} года.`;
    const log = C.log.slice(0, 14).map(e => `<li><time>${e.y}</time><span><b>${esc(e.name)}</b> — ${esc(e.res)}</span></li>`).join('') || '<li><span class="muted">Пока в регионе тихо.</span></li>';
    const acts = Game.c80Actions(), loy = Game.c80Loyalty();
    return `<p class="lede">Главный сюжет десятилетия — холодная война, которая кончается. Пока она горячая, покровитель (${esc(COUNTRIES[P].name)}) платит за верность и защищает от переворотов. С 1985 года вы нужны ему всё меньше: на барометре отмечены коллеги, которых бросили. Когда улица выйдет на площадь, исход решит армия — держите генералов при себе. А долги 1970-х дорожают: за столом с кредиторами каждый хочет своего.</p>
      <div class="cr">
        <section class="card cr-map-card"><div class="eyebrow">Барометр покровителя: ${esc(COUNTRIES[P].name)}</div>${chart}
          <div class="legend"><span><i style="background:#ff3fa4"></i>нужность вам</span><span><i style="background:rgba(45,226,230,0.6)"></i>если ничего не делать</span><span><i style="background:rgba(255,194,61,0.7)"></i>кого бросили</span></div>
          <p class="muted small">Жёлтые отметки — настоящие союзники ${esc(COUNTRIES[P].name)}, которые потеряли власть, когда покровитель перестал за них держаться: ${fallenNote}. Ваша линия идёт по тому же графику.</p></section>
        <section class="card cr-side">
          ${UI.meter('Нужность покровителю', C.need, C.need >= 55 ? 'good' : C.need >= 30 ? 'warn' : 'bad')}
          ${UI.meter('Внешний долг', C.debt, C.debt >= 68 ? 'bad' : C.debt >= 45 ? 'warn' : 'good')}
          ${UI.meter('Улица', C.heat, C.heat >= 70 ? 'bad' : C.heat >= 45 ? 'warn' : 'good')}
          ${UI.meter('Верность армии', Math.round(loy * 100), loy >= 0.55 ? 'good' : loy >= 0.35 ? 'warn' : 'bad')}
          <div class="sp-facts">
            <span class="chip">${flagSvg(P)} покровитель: ${esc(COUNTRIES[P].name)}</span>
            <span class="chip ${Game.c80Aid() ? 'coopted' : ''}">помощь +${Game.c80Aid()} млн</span>
            <span class="chip ${Game.c80Interest() >= 4 ? 'banned' : ''}">проценты −${String(Game.c80Interest()).replace('.', ',')} млн</span>
            ${C.defaulted ? '<span class="chip banned">дефолт</span>' : ''}${S.flags.c80Immunity ? '<span class="chip">неприкосновенность генералам</span>' : ''}
          </div>
          <p class="muted small">${esc(phase)} ${esc(voteTxt)} Верность армии — шанс, что генералы выполнят приказ, когда улица выйдет на площадь.</p>
        </section>
      </div>
      <section class="card mt"><div class="eyebrow">Сводка десятилетия: соседи</div><ul class="log cr-log">${log}</ul></section>
      <div class="proj dec-grid mt">${acts.map(a => `<div class="proj-item dec"><div class="dec-main"><b>${esc(a.name)}</b><p class="muted small">${esc(a.desc)}</p>${a.scene ? '' : `<div class="dec-fx"><div class="dec-row"><span class="dec-tag">Эффект</span>${UI.fxChips(Game.previewFx(a.fx))}</div></div>`}</div>${UI.actBtn('c80:' + a.id, { name: a.scene ? 'Начать' : 'Приказать', cost: a.cost, ok: a.ok, danger: a.danger })}</div>`).join('')}</div>`;
  },
});
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('c80:')) return false;
  if (id === 'c80:creditors') {
    if (S.ap > 0 && S.phase === 'hub' && Game.spend()) VN.play(Game.c80DebtScene(true)).then(() => UI.render());
    return true;
  }
  const out = Game.c80Action(id.slice(4));
  if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
