// Инициативы советников: прихоти, проекты и интриги.
const WHIMS = {
  defense: [
    { say: '{Addr}, у генерала соседней страны сорок медалей, а у меня тридцать девять! Это позор для всей армии!',
      yes: ['Учредить новый орден и вручить генералу', { treasury: -3, loy: { defense: 12 }, fac: { hawks: { a: 3 } } }, 'Орден «Звезда Отечества» первой степени. Генерал сиял неделю и звенел при ходьбе.'],
      no: ['Отказать: медалей и так достаточно', { loy: { defense: -8 } }, 'Генерал ушёл, гремя оставшимися медалями особенно обиженно.'],
      alt: ['Вручить медаль «За скромность»', { loy: { defense: 3 }, support: 1 }, 'Генерал не понял иронии и повесил медаль на самое видное место.'] },
    { say: 'Мне нужен личный танк. Золотой. Только для парадов, {addr}, честное слово.',
      yes: ['Купить золотой танк', { treasury: -15, army: 2, loy: { defense: 15 } }, 'Золотой танк прошёл по площади. Ослепил трибуну, двух послов и голубя.'],
      no: ['Отказать', { loy: { defense: -8 } }, 'Генерал назвал вас «штатским» за вашей спиной. Шеф полиции записал.'],
      alt: ['Покрасить старый танк в золотой цвет', { treasury: -2, loy: { defense: 4 } }, 'Издалека смотрится почти как настоящий. Вблизи генерал старается не подходить.'] },
    { say: 'Солдаты просят новую форму. С перьями! Как у итальянских берсальеров. Армия без перьев — не армия.',
      yes: ['Пошить новую форму', { treasury: -10, army: 3, loy: { defense: 8 } }, 'Парадные расчёты в перьях выглядят грозно. Особенно на ветру.'],
      no: ['Отказать', { loy: { defense: -6 }, army: -1 }, 'Солдаты маршируют без перьев. Генерал смотрит на них с отеческой грустью.'],
      alt: ['Выдать только перья', { treasury: -2, loy: { defense: 3 }, support: 1 }, 'Перья пришили к старым фуражкам. Народ смеётся, армия довольна.'] },
  ],
  economy: [
    { say: 'Меня пригласили на международный экономический форум! Нужен самолёт и делегация человек на сорок. Для веса.',
      yes: ['Отправить на форум с делегацией', { treasury: -10, loy: { economy: 10 }, rel: { $west: 2 } }, 'Доклад министра «Рынок и мы» сорвал аплодисменты. Делегация скупила все сувениры в городе.'],
      no: ['Отказать', { loy: { economy: -7 } }, 'Министр слушает трансляцию форума по радио и вздыхает.'],
      alt: ['Пусть летит обычным рейсом, один', { loy: { economy: 2 } }, 'Министр летит обычным рейсом, между туристами. Доклад всё равно понравился.'] },
    { say: '{Addr}, мне нужна новейшая вычислительная машина! Чтобы считать бюджет. И, может быть, раскладывать пасьянс.',
      yes: ['Купить машину', { treasury: -8, economy: 1, loy: { economy: 8 } }, 'Машина посчитала бюджет за минуту. Результат так напугал министра, что машину выключили на неделю.'],
      no: ['Отказать: есть счёты', { loy: { economy: -5 } }, 'Министр уходит, громко щёлкая костяшками счётов.'] },
  ],
  police: [
    { say: 'Вчера охрана дворца не пустила меня без пропуска! Меня! Без пропуска! Это подрыв авторитета органов!',
      yes: ['Выдать пожизненный пропуск во все двери', { fear: 1, loy: { police: 10 } }, 'Теперь шеф полиции может войти куда угодно. Даже туда, куда вы не хотели бы.'],
      no: ['Охрана поступила правильно', { loy: { police: -6 } }, 'На начальника охраны заведено досье. Толстое.'],
      alt: ['Наказать охрану нарядом вне очереди', { loy: { police: 6 }, fac: { hawks: { a: -3 } } }, 'Охрана драит плац. Офицеры недовольны, шеф полиции улыбается.'] },
    { say: 'Нам нужно новое здание. Подвалы старого переполнены. Досье, разумеется, только досье.',
      yes: ['Построить новое здание', { treasury: -15, fear: 4, loy: { police: 12 } }, 'Новое здание серое, высокое и без окон. Горожане обходят его стороной.'],
      no: ['Отказать', { loy: { police: -7 } }, 'Досье теперь хранят в коридорах. Иногда они «случайно» теряются.'],
      alt: ['Отдать под архив бывшее казино', { treasury: -4, loy: { police: 5 } }, 'Досье стоят на игровых столах. Говорят, ночью там до сих пор слышен звон фишек.'] },
  ],
  propaganda: [
    { say: 'Никто не слушает мои идеи! Сорок проектов на вашем столе, а приняли вы один. И тот про статую!',
      yes: ['Дать собственную передачу в эфире', { treasury: -6, support: 2, loy: { propaganda: 12 } }, 'Передача «Сорок идей» выходит каждый вечер. Слушатели пока насчитали тридцать семь.'],
      no: ['Напомнить, кто здесь главный', { loy: { propaganda: -8 }, fear: 1 }, 'Министр пропаганды в обиде: целую неделю в эфире только прогноз погоды.'],
      alt: ['Назначить «главным идеологом» (без денег)', { loy: { propaganda: 6 }, fac: { liberals: { a: -3 } } }, 'Новая должность, новая визитка, старая зарплата. Министр в восторге.'] },
    { say: 'Пропаганде нужен свой оркестр! Без музыки пропаганда — просто бухгалтерия.',
      yes: ['Создать оркестр', { treasury: -8, support: 2, loy: { propaganda: 10 } }, 'Оркестр играет марши, гимны и, по пятницам, танго. Рейтинги растут.'],
      no: ['Отказать', { loy: { propaganda: -6 } }, 'На радио снова играет одна и та же пластинка. Уже который год.'],
      alt: ['Передать пропаганде армейский оркестр', { loy: { propaganda: 6, defense: -6 } }, 'Генерал в ярости: его оркестр теперь играет песни о вас под руководством министра пропаганды.'] },
  ],
  foreign: [
    { say: 'Послы смеются над моим лимузином! Ему двенадцать лет, у него дверь открывается только изнутри!',
      yes: ['Купить новый лимузин', { treasury: -8, loy: { foreign: 10 } }, 'Новый лимузин длиннее, чем у американского посла. На два сантиметра. Министр счастлив.'],
      no: ['Отказать', { loy: { foreign: -6 } }, 'Министр ездит на приёмы на велосипеде. Послы снова смеются.'],
      alt: ['Одолжить ему ваш лимузин', { loy: { foreign: 12 }, support: -1 }, 'Министр ездит в вашем лимузине. Народ решил, что это вы, и машет ему с тротуаров.'] },
    { say: 'Я написал эпическую поэму о нашей внешней политике. Тысяча строф! Её надо издать и прочитать с международной трибуны.',
      yes: ['Издать и прочитать с трибуны', { treasury: -4, loy: { foreign: 10 }, rel: { $west: -1, $east: -1 } }, 'Чтение заняло три часа. Делегаты вежливо аплодировали. Проснувшиеся — громче.'],
      no: ['Отказать', { loy: { foreign: -8 } }, 'Министр читает поэму жене. Жена уехала к маме.'],
      alt: ['Издать, но не читать', { treasury: -4, loy: { foreign: 4 } }, 'Тираж — пятьсот экземпляров. Четыреста девяносто министр подарил послам.'] },
  ],
};

const PROJECTS = {
  defense: [{ id: 'academy', name: 'Военная академия имени {title_gen}', q: 4, cost: 6, payoff: { army: 8, fac: { hawks: { a: 8 } } }, pitch: 'Своя военная академия! Офицеры будут учиться у нас, а не в чужих столицах. И учиться верности.' },
    { id: 'airforce', name: { '1930': 'Национальная авиация', '1960': 'Эскадрилья реактивных истребителей', '1980': 'Эскадрилья сверхзвуковых истребителей', '2000': 'Эскадрилья беспилотников' }, q: 5, cost: 8, payoff: { army: 10, fear: 3 }, pitch: 'Небо должно быть нашим. Хотя бы над столицей.' }],
  economy: [{ id: 'airline', name: 'Национальная авиакомпания', q: 5, cost: 7, payoff: { economy: 6, treasury: 20 }, pitch: 'Самолёты с нашим флагом! Туристы, грузы, престиж. И бесплатные перелёты для министров.' },
    { id: 'bourse', name: 'Фондовая биржа', q: 4, cost: 5, payoff: { economy: 5, fac: { oligarchs: { a: 10 } } }, pitch: 'Биржа! Акции, облигации, табло с цифрами. Иностранные инвесторы обожают табло с цифрами.' }],
  police: [{ id: 'informers', name: 'Сеть осведомителей в каждом доме', q: 3, cost: 4, payoff: { fear: 8, flag: { informers: true } }, pitch: 'Один осведомитель на подъезд. Потом на квартиру. Потом на каждого.' },
    { id: 'prison', name: 'Образцовая тюрьма „Санаторий“', q: 3, cost: 6, payoff: { fear: 5, fac: { left: { s: -6 }, liberals: { s: -4 } } }, pitch: 'Тюрьма, которую не стыдно показать журналистам. И которой не стыдно пугать остальных.' }],
  propaganda: [{ id: 'studio', name: { '1930': 'Национальная киностудия', '1960': 'Национальная киностудия „Отечество“', '1980': 'Национальная видеостудия', '2000': 'Международный телеканал' }, q: 4, cost: 6, payoff: { support: 7, loy: { propaganda: 8 } }, pitch: 'Свои фильмы о нашей великой истории. Главную роль, разумеется, предложим вам.' },
    { id: 'games', name: 'Всенародные спортивные игры', q: 3, cost: 5, payoff: { support: 6 }, pitch: 'Спартакиада на весь народ! Стадионы, медали, ваша речь на открытии.' }],
  foreign: [{ id: 'festival', name: 'Международный фестиваль молодёжи', q: 3, cost: 5, payoff: { relAll: 6, support: 2 }, pitch: 'Молодёжь всего мира приедет к нам петь и танцевать. Мир полюбит нас. Ну, хотя бы молодёжь.' },
    { id: 'lobby', name: 'Лоббисты в столице покровителя', q: 3, cost: 6, payoff: { rel: { $patron: 12 } }, pitch: 'Наши люди в коридорах власти покровителя. Улыбки, ужины, нужные подписи.' }],
};
const PROJECT_TROUBLES = [
  ['Подрядчик проекта «{p}» сбежал с авансом.', p => ({ treasury: -p.cost * 2 })],
  ['В проекте «{p}» обнаружили, что все планы составлены вверх ногами. Переделываем.', p => ({ treasury: -p.cost })],
  ['Проект «{p}»: подрядчики по ошибке затопили соседнюю деревню. Крестьяне недовольны.', () => ({ support: -3 })],
  ['Проект «{p}»: министр положил часть сметы «на хранение». Куда — не уточнил.', p => ({ treasury: -p.cost, loy: { [p.role]: 2 } })],
];

Object.assign(Game, {
  projName(p) { return Game.fmt(typeof p.name === 'string' ? p.name : p.name[S.era] || Object.values(p.name)[0]); },
  whimScene(role) {
    const A = S.adv[role], w = pick((S.era === '1848' && typeof WHIMS48 !== 'undefined' ? WHIMS48 : WHIMS)[role]);
    const mk = ([text, fx, res]) => ({ text, fx, res });
    const choices = [mk(w.yes), mk(w.no)]; if (w.alt) choices.push(mk(w.alt));
    choices[0].adv = [role];
    return { title: `Прихоть: ${ROLES[role].title.toLowerCase()}`, bg: 'office', lines: [[role, w.say], ['narrator', `${A.name} ждёт ответа и смотрит на вас с надеждой. Лояльность сейчас: ${Math.round(A.loy)}.`]], choices };
  },
  projectScene(role) {
    const used = new Set([...(S.projects || []).map(p => p.id), ...((S.projectsDone || []))]);
    const opts = (S.era === '1848' && typeof PROJECTS48 !== 'undefined' ? PROJECTS48 : PROJECTS)[role].filter(p => !used.has(p.id));
    if (!opts.length || (S.projects || []).length >= 2) return null;
    const P = pick(opts), name = Game.projName(P);
    const full = { id: P.id, role, name, left: P.q, total: P.q, cost: P.cost, payoff: P.payoff, risk: 0.12 };
    const cheap = { ...full, left: P.q + 2, total: P.q + 2, cost: Math.round(P.cost * 0.6), payoff: Game.scalePayoff(P.payoff, 0.7), risk: 0.25 };
    return {
      title: `Проект: ${name}`, bg: 'office',
      lines: [[role, `{Addr}, у меня проект: «${name}». ${P.pitch}`], ['economy', role === 'economy' ? 'Всё посчитано. Я всегда всё считаю. Это окупится. Наверное.' : `Это будет стоить ${P.cost} млн в квартал, ${P.q} кв. подряд. Казна вздрогнула.`]],
      choices: [
        { text: `Утвердить: ${P.cost} млн в квартал, ${P.q} кв.`, adv: [role], fx: { project: full, loy: { [role]: 6 } }, res: `Проект «${name}» утверждён. ${S.adv[role].name} лично перерезает ленточку на пустом месте, где всё это будет.` },
        { text: `Урезанный вариант: ${cheap.cost} млн в квартал, ${cheap.left} кв., результат скромнее`, fx: { project: cheap, loy: { [role]: 2 } }, res: `Утверждён урезанный вариант. ${S.adv[role].name} обещает «сделать не хуже, только дольше». Больше рисков, меньше блеска.` },
        { text: 'Отклонить', fx: { loy: { [role]: -6 } }, res: 'Проект отправлен в архив. Советник смотрит в окно и молча считает обиды.' },
      ],
    };
  },
  scalePayoff(fx, k) {
    const o = {};
    for (const [key, v] of Object.entries(fx)) {
      if (typeof v === 'number') o[key] = Math.round(v * k);
      else if (key === 'fac' || key === 'rel' || key === 'loy') { o[key] = {}; for (const [a, b] of Object.entries(v)) o[key][a] = typeof b === 'number' ? Math.round(b * k) : Object.fromEntries(Object.entries(b).map(([x, y]) => [x, Math.round(y * k)])); }
      else o[key] = v;
    }
    return o;
  },
  intrigueScene(role) {
    const A = S.adv[role];
    const kinds = ['advisor', 'advisor', 'leader', 'country'];
    const kind = pick(kinds);
    if (kind === 'advisor') {
      const others = Object.keys(S.adv).filter(r => r !== role);
      const t = pick(others), B = S.adv[t];
      const truth = Math.random() < clamp((60 - B.loy) / 60 + 0.15, 0.1, 0.85);
      const crime = t === 'defense' ? 'тайно встречается с полковниками и готовит переворот' : t === 'economy' ? 'ворует из казны и прячет деньги за границей' : t === 'police' ? 'собирает досье на вас лично' : t === 'propaganda' ? 'пишет анонимные статьи для оппозиции' : 'передаёт секреты иностранному посольству';
      const T = { fire: truth ? { fireRole: t, treasury: 10, loy: { [role]: 6 } } : { fireRole: t, loyAll: -5, loy: { [role]: 3 } },
        probe: truth ? { treasury: 4, fireRole: t, loy: { [role]: 8 } } : { treasury: -4, loy: { [role]: -8, [t]: 6 } },
        ignore: truth ? { loy: { [role]: -6 }, ...(t === 'defense' ? { flag: { coupBonus: 0.1 } } : { treasury: -5 }) } : { loy: { [role]: -3, [t]: 3 } } };
      return { title: 'Интрига во дворце', bg: 'night', lines: [[role, `{Addr}, мне неприятно это говорить, но ${B.name} ${crime}. У меня есть... ну, почти есть доказательства.`], [t, 'Это клевета! Я служу вам верой и правдой! Ну, в основном верой.'], ['narrator', 'Кто из них лжёт? Решать вам.']],
        choices: [
          { text: `Уволить: ${B.name}`, adv: [role], hidePreview: true, fx: T.fire, res: truth ? `При обыске у обвиняемого нашли всё, о чём говорили, и ещё кое-что. Обвинитель торжествует.` : `Обыск ничего не дал. Уволили невиновного человека: ${B.name}. Остальные министры теперь боятся, что они следующие.` },
          { text: 'Провести тихое расследование (−4 млн)', hidePreview: true, fx: T.probe, res: truth ? `Расследование подтвердило обвинения. ${B.name} — в отставке, часть денег возвращена в казну.` : `Расследование ничего не нашло. Обвинитель (${A.name}) опозорен, обвиняемый (${B.name}) оправдан и благодарен.` },
          { text: 'Не верить доносам', hidePreview: true, fx: T.ignore, res: truth ? 'Вы не поверили. Через месяц выяснилось, что зря. Но поезд уже ушёл.' : 'Вы не поверили — и правильно. Обвинитель надулся, обвиняемый благодарен.' },
        ] };
    }
    if (kind === 'leader') {
      const fs = Object.keys(S.fac).filter(f => S.fac[f].st !== 'banned' && !Game.isPillar(f));
      if (!fs.length) return Game.whimScene(role);
      const f = pick(fs), L = Game.leader(f), D = Game.facDef(f);
      const country = pick(REGIONS[S.region].countries);
      const truth = Math.random() < clamp((55 - S.fac[f].a) / 60 + 0.2, 0.15, 0.8);
      return { title: 'Донос на лидера движения', bg: 'night', lines: [[role, `{Addr}, ${L.name}, лидер движения «${D.name}», получает деньги из ${cGen(country)}. Мои люди видели конверты.`], ['narrator', `${L.name} — ${LEADER_TRAITS[L.trait].name.toLowerCase()}. Конверты — дело тёмное.`]],
        choices: [
          { text: `Арестовать: ${L.name}`, adv: [role], hidePreview: true, fx: truth ? { fear: 4, fac: { [f]: { s: -8, a: -8 } }, newLeader: f, rel: { [country]: -5 }, loy: { [role]: 5 } } : { fear: 4, support: -3, fac: { [f]: { s: 6, a: -15 } }, newLeader: f, loy: { [role]: 2 } }, res: truth ? `При аресте у лидера движения нашли иностранные деньги. Движение обезглавлено и смущено.` : `Денег не нашли. Арестованный лидер стал мучеником, движение растёт, а донос оказался местью за старую обиду.` },
          { text: 'Опорочить лидера в газетах', hidePreview: true, fx: truth ? { fac: { [f]: { a: -6, s: -6 } }, support: 1 } : { fac: { [f]: { a: -10 } }, loy: { [role]: 2 } }, res: truth ? 'Газеты опубликовали фото конвертов. Сторонники движения в замешательстве.' : 'Газеты написали гадости, но доказательств нет. Движение обиделось ещё сильнее.' },
          { text: 'Проигнорировать', hidePreview: true, fx: truth ? { fac: { [f]: { s: 5 } }, rel: { [country]: 2 }, loy: { [role]: -4 } } : { loy: { [role]: -2 } }, res: truth ? 'Иностранные деньги продолжают течь. Движение заметно окрепло.' : 'Ничего не случилось. Возможно, ничего и не было.' },
        ] };
    }
    const c = pick(REGIONS[S.region].countries), C = COUNTRIES[c];
    const truth = Math.random() < clamp((45 - (S.rel[c] || 40)) / 50 + 0.25, 0.15, 0.8);
    return { title: 'Заговор посольства', bg: 'night', lines: [[role, `{Addr}, посольство ${cGen(c)} тайно встречается с нашими офицерами. Похоже, они ищут вам замену.`], ['foreign', 'Если мы ошибёмся и вышлем посла, это будет дипломатический скандал.']],
      choices: [
        { text: `Выслать посла ${cGen(c)}`, adv: [role], hidePreview: true, fx: truth ? { rel: { [c]: -15 }, support: 2, flag: { purged: S.turn }, loy: { [role]: 6 } } : { rel: { [c]: -15 }, support: 2, loy: { [role]: 2, foreign: -4 } }, res: truth ? 'Посол выслан. Офицеры, с которыми он встречался, вдруг стали очень лояльными.' : 'Посол выслан, но заговора не было. Его правительство в ярости, газеты — в восторге.' },
        { text: 'Тайно предупредить посла, что мы всё знаем', adv: ['foreign'], hidePreview: true, fx: truth ? { rel: { [c]: 2 }, flag: { purged: S.turn } } : { rel: { [c]: 4 }, loy: { [role]: -3 } }, res: truth ? 'Посол побледнел, поблагодарил за «откровенность» и свернул встречи.' : 'Посол ничего не понял, но на всякий случай прислал корзину фруктов.' },
        { text: 'Ничего не делать', hidePreview: true, fx: truth ? { flag: { coupBonus: 0.12 }, loy: { [role]: -4 } } : {}, res: truth ? 'Встречи продолжаются. Офицеры всё чаще смотрят на дворец оценивающе.' : 'Ничего не произошло. Шеф полиции, кажется, перестраховывается.' },
      ] };
  },
  advisorScene() {
    const roles = Object.keys(S.adv);
    const role = pick(roles);
    const r = Math.random();
    if (r < 0.4) return Game.whimScene(role);
    if (r < 0.7) return Game.projectScene(role) || Game.whimScene(role);
    return Game.intrigueScene(['police', 'propaganda', 'defense', 'economy', 'foreign'].includes(role) ? role : 'police');
  },
  cancelProject(id) {
    const p = (S.projects || []).find(x => x.id === id);
    if (!p) return null;
    S.projects = S.projects.filter(x => x.id !== id);
    const changes = Game.apply({ loy: { [p.role]: -8 } });
    const text = `Проект «${p.name}» закрыт. Всё недоделанное спишут, а недостроенное станет местом для фотосессий молодожёнов.`;
    Game.log(text); return { text, changes };
  },
});

Game.applyHooks.push((fx, ch) => {
  if (fx.project) { S.projects = S.projects || []; S.projects.push({ ...fx.project }); ch.push({ k: 'fs', d: 0, label: `Проект: ${fx.project.name}`, icon: '🏗️' }); }
  if (fx.fireRole) Game.fireAdvisor(fx.fireRole);
  if (fx.loyAll) for (const r of Object.keys(S.adv)) S.adv[r].loy = clamp(S.adv[r].loy + fx.loyAll);
  if (fx.newLeader) Game.facState(fx.newLeader).leader = Game.makeLeader(fx.newLeader, Math.random() < 0.5 ? 'radical' : null);
  if (fx.relAll) for (const c of REGIONS[S.region].countries) S.rel[c] = clamp(S.rel[c] + fx.relAll);
});
Game.previewHooks.push((fx, out) => {
  if (fx.project) out.push({ icon: '🏗️', d: -fx.project.cost, label: 'Проект', text: `−${fx.project.cost} млн/кв. × ${fx.project.left}` });
  if (fx.fireRole) out.push({ icon: '🚪', d: -1, label: 'Отставка', text: 'отставка' });
  if (fx.relAll) out.push({ icon: '🌍', d: fx.relAll, label: 'Все страны', text: `все страны ${sign(fx.relAll)}` });
});
Game.coupHooks.push(() => (S.flags.informers ? -0.03 : 0));
Game.quarterHooks.push(rep => {
  for (const p of [...(S.projects || [])]) {
    if (Math.random() < p.risk) { const [t, f] = pick(PROJECT_TROUBLES); Game.apply(f(p), { silent: true }); rep.warn.push(t.replace('{p}', p.name)); }
    p.left--;
    if (p.left <= 0) {
      S.projects = S.projects.filter(x => x !== p);
      S.projectsDone = [...(S.projectsDone || []), p.id];
      Game.apply(p.payoff, { silent: true });
      const msg = `Завершён проект «${p.name}»!`;
      rep.lines.push(msg); Game.log(msg);
      if (Game.pressAdd) Game.pressAdd({ kind: 'event', head: `Завершён государственный проект: «${p.name}»`, text: `${S.adv[p.role] ? S.adv[p.role].name : 'Министр'} принимает поздравления.` });
    }
  }
});
Game.incomeHooks.push(() => { const v = (S.projects || []).reduce((a, p) => a + p.cost, 0); return v ? { label: 'Проекты советников', v: -v } : null; });

// Проекты на вкладке «Советники»
const _tabAdv = UI.tab_advisors;
UI.tab_advisors = function () {
  const list = S.projects || [];
  const box = `<section class="card proj-box"><div class="eyebrow">Проекты советников</div>${list.length ? list.map(p => `<div class="proj-row">
      <div class="proj-main"><b>${esc(p.name)}</b><span class="muted small">${esc(S.adv[p.role] ? S.adv[p.role].name : '')} · ${p.cost} млн в квартал · осталось ${p.left} из ${p.total} кв.</span>
        <span class="bar"><span style="width:${Math.round((1 - p.left / p.total) * 100)}%"></span></span>
        <div class="dec-row"><span class="dec-tag">По завершении</span>${UI.fxChips(Game.previewFx(p.payoff))}</div></div>
      ${UI.actBtn('proj:' + p.id, { name: 'Закрыть проект', cost: 'лояльность −8', ok: S.phase === 'hub', danger: true })}</div>`).join('') : '<p class="muted small">Проектов нет. Советники время от времени приходят со своими идеями: утвердите их, урежьте или отклоните. Не больше двух проектов одновременно.</p>'}</section>`;
  return box + _tabAdv.call(UI);
};
UI.actionHandlers = UI.actionHandlers || [];
UI.actionHandlers.push(id => {
  if (!id.startsWith('proj:')) return false;
  const out = Game.cancelProject(id.slice(5)); if (out) { UI.render(); UI.toast(out.text, out.changes); }
  return true;
});
