// Пресса: первая полоса каждого квартала — мировые события, новости страны, реакция на указы.
const PAPERS = {
  latam: ['Эль Диарио Насьональ', 'Ла Вос Либре'], asia: ['Сангпурский вестник', 'Свободное слово'], africa: ['Нгомбе-Матэн', 'Ле Пёпль'],
  latam30: ['Ла Пренса Тадея', 'Эль Обреро'], europe30: ['Руженские ведомости', 'Народная правда'], asia30: ['Королевский вестник', 'Голос реформ'],
  africa00: ['Жорнал де Кассанга', 'блог «Кассанга без цензуры»'], mideast00: ['Аль-Ваха Таймс', 'сайт «Свободная Ваха»'], centralasia00: ['Алтын Хабар', 'сайт «Алтын-Ньюс» (из Лондона)'],
};
const FOREIGN_PRESS = {
  '1930': ['«Таймс», Лондон', '«Фигаро», Париж', '«Нью-Йорк таймс»', '«Правда», Москва'],
  '1960': ['«Нью-Йорк таймс»', '«Правда»', '«Монд»', '«Таймс»'],
  '2000': ['Би-би-си', 'Си-эн-эн', '«Аль-Джазира»', '«Гардиан»'],
};
const MONTHS_Q = ['января', 'апреля', 'июля', 'октября'];
const WORLD_FILLER = {
  '1930': [[1930, 'Американский астроном открыл новую планету — Плутон'], [1931, 'В Нью-Йорке открыт Эмпайр-стейт-билдинг — самое высокое здание мира'], [1932, 'Амелия Эрхарт в одиночку перелетела Атлантику'], [1932, 'Олимпийские игры прошли в Лос-Анджелесе'], [1933, 'В Чикаго открылась Всемирная выставка «Век прогресса»'], [1934, 'Италия выиграла чемпионат мира по футболу на своём поле'], [1934, 'В США застрелены грабители Бонни и Клайд'], [1935, 'Лайнер «Нормандия» пересёк Атлантику за четыре дня'], [1936, 'В США открыта гигантская плотина Гувера'], [1936, 'Король Эдуард VIII отрёкся от престола ради любви'], [1937, 'В Сан-Франциско открыт мост Золотые Ворота'], [1937, 'Амелия Эрхарт пропала над Тихим океаном'], [1938, 'Радиопостановка «Война миров» вызвала панику в США'], [1938, 'Италия снова выиграла чемпионат мира по футболу'], [1939, 'На экраны вышли «Унесённые ветром» и «Волшебник страны Оз»'], [1939, 'В Нью-Йорке открылась Всемирная выставка «Мир завтрашнего дня»']],
  '1960': [[1960, 'Эфиоп Абебе Бикила выиграл олимпийский марафон в Риме босиком'], [1960, 'Американские физики создали первый лазер'], [1962, 'Спутник «Телстар» передал первую телепрограмму через океан'], [1962, 'Умерла Мэрилин Монро'], [1963, 'Ливерпульская группа «Битлз» выпустила первый альбом'], [1964, '«Битлз» покорили Америку: 73 миллиона зрителей у телевизоров'], [1964, 'В Японии запущен скоростной поезд «Синкансэн»'], [1965, 'Алексей Леонов первым вышел в открытый космос'], [1966, 'Англия выиграла чемпионат мира по футболу'], [1967, 'В Кейптауне проведена первая в мире пересадка сердца'], [1968, 'В Мемфисе убит Мартин Лютер Кинг'], [1968, 'Вышел фильм «Космическая одиссея 2001 года»'], [1969, 'Полмиллиона человек собрались на фестиваль в Вудстоке'], [1969, 'Совершил первый полёт сверхзвуковой «Конкорд»']],
  '2000': [[2000, 'Международная космическая станция приняла первый экипаж'], [2001, 'Запущена «Википедия» — энциклопедия, которую пишет кто угодно'], [2001, 'Apple выпустила плеер iPod: «тысяча песен в кармане»'], [2002, 'Бразилия в пятый раз выиграла чемпионат мира по футболу'], [2003, 'Сверхзвуковой «Конкорд» совершил последний полёт'], [2003, 'Учёные завершили расшифровку генома человека'], [2004, 'Олимпиада вернулась в Афины'], [2005, 'Ураган «Катрина» затопил Новый Орлеан'], [2006, 'Плутон лишили статуса планеты'], [2007, 'Вышла последняя книга о Гарри Поттере'], [2008, 'Пекин провёл самую дорогую Олимпиаду в истории'], [2008, 'В Швейцарии запущен Большой адронный коллайдер'], [2009, 'Умер Майкл Джексон'], [2009, 'Неизвестный программист создал цифровую валюту «биткоин»']],
};
const ADS = {
  '1930': ['Пилюли доктора Пинка — от нервов, кризиса и бессонницы!', 'Граммофоны «Мелодия»: танго в каждом доме.', 'Автомобили в рассрочку. Первый взнос — после конца Депрессии.', 'Шляпы на заказ. Котелки, канотье, цилиндры для министров.'],
  '1960': ['Транзисторный приёмник — музыка в кармане!', 'Холодильник «Полярный»: лёд даже в сезон дождей.', 'Нейлоновые чулки из Парижа. Ограниченная партия.', 'Телевизор в кредит. Смотрите речи Отца Нации в каждом доме!'],
  '2000': ['Тариф «Безлимит»: интернет без ограничений (кроме государственных).', 'Новый телефон с цветным экраном и полифонией!', 'Интернет-кафе «Сеть»: первый час бесплатно, паспорт обязателен.', 'Ипотека за 15 минут. Квартиры в новом квартале Сити.'],
};
const DECREE_PRESS = {
  no_monday: 'В стране отменили понедельники. Офисы пустуют по вторникам — по привычке',
  rename_capital: 'Столица переименована в честь правителя. Картографы в отчаянии',
  chess: 'Правитель объявил себя чемпионом мира по шахматам. Гроссмейстеры молчат',
  horse: 'Конь правителя стал сенатором. Пока это лучший законодатель страны',
  ban_rain: 'Правительство запретило дождь. Метеорологи под подозрением',
  month13: 'В календаре появился тринадцатый месяц. Европейские банки не знают, как считать проценты',
  moustache: 'Чиновникам предписано носить усы. Парикмахеры довольны',
  no_crisis: 'Слово «кризис» запрещено. Кризис об этом не знает',
  coins: 'Портрет правителя теперь на всех деньгах. Нумизматы предсказывают обвал цены',
  pet_day: 'Объявлен национальный праздник в честь собаки правителя',
  tie_ban: 'Галстуки запрещены как пережиток. Иностранные дипломаты в замешательстве',
  gym: 'Вся страна делает зарядку под голос вождя. В семь утра',
};

Object.assign(Game, {
  pressAdd(item) { S.press = S.press || []; S.press.push({ turn: S.turn, ...item }); if (S.press.length > 80) S.press.splice(0, S.press.length - 80); },
  pressFreedom() {
    let f = 75 - S.fear * 0.6 - (S.budget.media - 50) * 0.4 - (S.era === '2000' ? (S.budget.netctl || 0) * 12 : 0) - (S.fac.liberals.st === 'banned' ? 15 : 0);
    if (S.era === '2000') f += (S.net || 0) / 5;
    return clamp(f);
  },
  paperNames() { return PAPERS[S.region] || ['Национальный вестник', 'Свободное слово']; },
});

// Записываем поводы для прессы
const _pDecree = Game.decree, _pEco = Game.economyAction, _pFac = Game.factionAction, _pCountry = Game.countryAction, _pFire = Game.fireAdvisor;
Game.decree = (cat, id) => { const d = DECREES[cat].find(x => x.id === id); const r = _pDecree(cat, id); if (r && d) Game.pressAdd({ kind: 'decree', cat, id, name: d.name }); return r; };
Game.economyAction = id => { const a = Game.economyActions().find(x => x.id === id); const r = _pEco(id); if (r && a) Game.pressAdd({ kind: 'decree', cat: 'economy', id, name: a.name }); return r; };
Game.factionAction = (f, act) => { const L = Game.leader(f).name; const r = _pFac(f, act); if (r && ['ban', 'legalize', 'arrest', 'coopt'].includes(act)) Game.pressAdd({ kind: 'faction', act, f, leader: L }); return r; };
Game.countryAction = (c, act) => { const r = _pCountry(c, act); if (r && ['visit', 'friend', 'alliance', 'break', 'denounce', 'arms'].includes(act)) Game.pressAdd({ kind: 'diplo', act, c, text: r.text }); return r; };
Game.fireAdvisor = role => { const old = S.adv[role].name; const r = _pFire(role); Game.pressAdd({ kind: 'cabinet', role, old, now: S.adv[role].name }); return r; };
Game.applyHooks.push(fx => { if (fx.treaty) Game.pressAdd({ kind: 'diplo', act: 'treaty', c: fx.treaty.c }); });

Object.assign(UI, {
  pressItems() {
    const R = REGIONS[S.region], T = S.leader.title, tg = Game.titleGen();
    const items = (S.press || []).filter(x => x.turn === S.turn - 1);
    const off = [], crit = [], foreign = [];
    let k = S.turn;
    const rot = arr => arr[(k++) % arr.length];
    const CRIT_TXT = ['Независимые эксперты задают вопросы, на которые во дворце не отвечают.', 'Бюджет указа, по данным источников, втрое больше объявленного.', 'Подрядчики, как обычно, оказались родственниками министров.', 'Опрошенные на улице граждане о решении узнали из газет.'];
    const OFF_TXT = ['Эксперты называют решение своевременным и единственно верным.', 'Трудовые коллективы шлют во дворец телеграммы благодарности.', 'Зарубежные гости восхищены мудростью руководства страны.', 'На предприятиях прошли митинги в поддержку решения.'];
    for (const it of items) {
      if (it.kind === 'decree') {
        const absurd = it.cat === 'absurd';
        off.push({ head: rot([`Исторический указ: «${it.name}»`, `Мудрое решение ${tg}: «${it.name}»`, `Страна единодушно поддержала указ «${it.name}»`, `Новый шаг к процветанию: «${it.name}»`]), text: absurd ? 'Трудовые коллективы благодарят правительство за смелость и дальновидность.' : rot(OFF_TXT) });
        crit.push({ head: absurd ? `Указ «${it.name}»: смеяться или плакать?` : rot([`«${it.name}»: деньги на ветер?`, `Экономисты сомневаются в указе «${it.name}»`, `Кому выгоден указ «${it.name}»?`]), text: rot(CRIT_TXT) });
        if (absurd || Math.random() < 0.35) foreign.push(absurd && DECREE_PRESS[it.id] ? `${DECREE_PRESS[it.id]}.` : `Режим объявил «${it.name}». Наблюдатели гадают, что за этим стоит.`);
      } else if (it.kind === 'faction') {
        const nm = R.factions[it.f] ? R.factions[it.f].name : 'движение';
        if (it.act === 'ban') { off.push({ head: `Пресечена деятельность экстремистов: запрещено движение «${nm}»`, text: 'Граждане вздохнули с облегчением.' }); crit.push({ head: `Новый удар по свободе: запрещено «${nm}»`, text: 'Сторонники движения ушли в подполье и обещают вернуться.' }); foreign.push(`Власти запретили движение «${nm}». Правозащитники выражают тревогу.`); }
        if (it.act === 'arrest') { off.push({ head: `Задержан опасный подстрекатель: ${it.leader}`, text: 'Следствие располагает неопровержимыми доказательствами.' }); crit.push({ head: `Арест ${it.leader}: политическая расправа?`, text: 'Адвокатов к задержанному не пускают.' }); foreign.push(`Арестован оппозиционный лидер ${it.leader}.`); }
        if (it.act === 'legalize') { off.push({ head: `Великодушие ${tg}: движение «${nm}» снова легально`, text: '' }); crit.push({ head: `Оттепель или ловушка? «${nm}» разрешено`, text: '' }); }
        if (it.act === 'coopt') off.push({ head: `Правительство национального единства расширяется: в кабинете — представители «${nm}»`, text: '' });
      } else if (it.kind === 'diplo') {
        const C = COUNTRIES[it.c] ? COUNTRIES[it.c].name : 'партнёр';
        const h = { visit: `Триумфальный визит: ${C}`, friend: `Подписан Договор о дружбе со страной ${C}`, alliance: `Военный союз со страной ${C}: мир стал безопаснее`, break: `Разрыв договоров со страной ${C}: мы не позволим диктовать нам условия`, denounce: `Посол страны ${C} выслан за недружественные действия`, arms: `Армия получает новейшее вооружение из страны ${C}`, treaty: `Торговый договор со страной ${C} откроет новые рынки` }[it.act];
        if (h) off.push({ head: h, text: it.text && it.act === 'visit' && /не задался/.test(it.text) ? 'Визит прошёл в тёплой и дружественной обстановке.' : '' });
        if (it.act === 'visit' && it.text && /не задался/.test(it.text)) { crit.push({ head: `Конфуз на визите: ${C}`, text: it.text.replace(/^Визит в страну [^.]*\. /, '') }); foreign.push(`Визит в страну ${C} обернулся дипломатическим конфузом.`); }
        if (it.act === 'denounce') foreign.push(`Дипломатический скандал: выслан посол страны ${C}.`);
      } else if (it.kind === 'event') {
        off.push({ head: it.head, text: it.text });
      } else if (it.kind === 'cabinet') {
        off.push({ head: `Кадровые перемены: ${it.now} назначен вместо ${it.old}`, text: 'Обновление кабинета продиктовано заботой о народе.' });
        crit.push({ head: `Семейный подряд? Новый министр — ${it.now}`, text: '' });
      }
    }
    // сводки из доклада прошлого квартала
    const notes = ((S.lastReport && S.lastReport.lines) || []).slice(0, 4);
    // отражение реального положения дел
    if (S.economy >= 60) foreign.push(`Экономический рост в стране ${S.country.split(' ').slice(-1)[0]} удивляет аналитиков.`);
    if (S.fear >= 60) foreign.push('Правозащитники: режим закручивает гайки.');
    if (S.support < 30) foreign.push('Дипломаты в частных беседах: дни режима, возможно, сочтены.');
    if (S.treasury < 0) foreign.push('Инвесторы обеспокоены пустой казной и долгами правительства.');
    return { off, crit, foreign, notes };
  },
  async pressPage(news) {
    const R = REGIONS[S.region], E = ERAS[S.era];
    const [offName, oppName] = Game.paperNames();
    const P = UI.pressItems();
    const free = Game.pressFreedom();
    // главная мировая новость (применяем её последствия)
    const main = news[0];
    const chMain = [];
    for (const h of news) { const fx = h.fx ? Game.resolveFx(h.fx) : null; if (fx) chMain.push(...Game.apply(fx)); Game.log('Мировые новости: ' + h.head); }
    if (!news.length && !P.off.length && !P.notes.length) return;
    const issue = 101 + S.turn * 13;
    const date = `15 ${MONTHS_Q[S.q - 1]} ${S.year} года`;
    const filler = WORLD_FILLER[S.era].filter(([y]) => y === S.year);
    const fillerPick = filler.length ? [filler[(S.q - 1) % filler.length]] : [];
    if (filler.length > 1 && S.q === 4 && filler[filler.length - 1] !== fillerPick[0]) fillerPick.push(filler[filler.length - 1]);
    const ad = ADS[S.era][S.turn % ADS[S.era].length];
    const econ = S.economy >= 55 ? 'Экономика растёт рекордными темпами' : S.economy >= 40 ? 'Экономика уверенно преодолевает временные трудности' : 'Враги нации распространяют слухи о спаде';
    const pollOff = Math.min(99, 85 + Math.round(S.support / 8));
    const site = S.era === '2000';
    const fp = FOREIGN_PRESS[S.era];
    const foreign = P.foreign.slice(0, 3).map((t, i) => `<li><b>${fp[i % fp.length]}:</b> «${esc(t)}»</li>`).join('');
    const domestic = [...P.off.slice(main ? 2 : 3, 7)].map(x => `<li><b>${esc(x.head)}</b>${x.text ? ` <span>${esc(x.text)}</span>` : ''}</li>`).join('');
    const notes = P.notes.slice(0, 3).map(n => `<li>${esc(n)}</li>`).join('');
    const opp = free >= 40 && P.crit.length ? `<section class="np-opp"><h4>${site ? 'Независимые СМИ' : 'Из независимой прессы'} · ${esc(oppName)}</h4><ul>${P.crit.slice(0, 2).map(x => `<li><b>${esc(x.head)}</b>${x.text ? ` ${esc(x.text)}` : ''}</li>`).join('')}<li><b>Независимый опрос:</b> правительству доверяют ${Math.round(S.support)}% граждан.</li></ul></section>`
      : `<section class="np-opp muted-box"><h4>${site ? 'Независимые СМИ' : 'Независимая пресса'}</h4><p>${free < 20 ? 'Независимых изданий в стране не осталось.' : 'Оппозиционные газеты в этом квартале «временно не вышли по техническим причинам».'}</p></section>`;
    const nicks = ['Patriot_77', 'бабушка_онлайн', 'Simka2004', 'хакер_из_подвала', 'Свободный_Орёл', 'Юзер1985', 'анонимно'];
    const comments = site && (S.net || 0) >= 3 ? `<section class="np-comments"><h4>Комментарии читателей (${Math.round(40 + S.net * 30)})</h4>${[
      S.support > 55 ? 'Всё правильно делает! Стабильность — это главное.' : 'А где деньги? Опять на дворец ушли?',
      P.off[0] ? `Опять «${P.off[0].head.slice(0, 40)}…». Лучше бы дороги починили.` : 'Тишина в стране. Подозрительная тишина.',
      free < 40 ? 'Комментарий удалён модератором.' : 'Пишу, пока не заблокировали. Привет из подвала!',
    ].map((t, i) => `<p><b>${nicks[(S.turn + i * 3) % nicks.length]}</b> ${esc(t)}</p>`).join('')}</section>` : '';
    const photo = (bg, cap) => `<figure class="np-photo"><div class="np-img">${Scenes.svg(bg, S.region)}</div><figcaption>${esc(cap)}</figcaption></figure>`;
    const lead = P.off[0];
    const rest = main ? P.off.slice(0, 2) : P.off.slice(1, 3);
    const editorial = `<h3 class="np-sub">${site ? 'Колонка редакции' : 'Передовая статья'}: ${esc(S.support >= 50 ? 'Страна уверенно идёт вперёд' : S.support >= 30 ? 'Временные трудности нас только закаляют' : 'Не верьте паникёрам!')}</h3>
      <p>${esc(`${S.leader.title} ${S.leader.name} ${S.turn % 2 ? 'провёл совещание с министрами и дал ряд важных поручений' : 'посетил столичные предприятия и побеседовал с трудящимися'}. ${S.economy >= 50 ? 'Экономика растёт, на рынках изобилие.' : 'Враги нации распространяют слухи о трудностях, но народ им не верит.'} ${S.fear >= 55 ? 'Органы правопорядка надёжно охраняют покой граждан.' : 'В стране царят спокойствие и порядок.'}`)}</p>`;
    const mainHtml = main
      ? `<article class="np-main"><div class="np-kicker">${site ? 'Главное' : 'Мировые новости'}</div><h2>${esc(main.head)}</h2>${photo(/войн|кризис|теракт|напал|захват|ракет/i.test(main.head) ? 'night' : 'un', site ? 'Фото: агентства' : 'Фото: архив редакции')}<p>${esc(main.text)}</p>${chMain.length ? `<div class="fx-list">${UI.changes(chMain)}</div>` : ''}
          ${news.slice(1).map(h => `<h3 class="np-sub">${esc(h.head)}</h3><p>${esc(h.text)}</p>`).join('')}
          ${rest.map(x => `<h3 class="np-sub">${esc(x.head)}</h3>${x.text ? `<p>${esc(x.text)}</p>` : ''}`).join('')}${editorial}</article>`
      : `<article class="np-main"><div class="np-kicker">${site ? 'Главное' : 'Передовица'}</div><h2>${esc(lead ? lead.head : econ)}</h2>${photo(lead ? 'square' : 'palace', `На снимке: ${S.leader.title} ${S.leader.name}`)}<p>${esc(lead && lead.text ? lead.text : `${S.leader.title} ${S.leader.name} провёл совещание с министрами и дал ряд важных поручений.`)}</p>
          ${rest.map(x => `<h3 class="np-sub">${esc(x.head)}</h3>${x.text ? `<p>${esc(x.text)}</p>` : ''}`).join('')}${editorial}</article>`;
    await Modal.open(`
      <div class="np ${site ? 'np-site' : ''}">
        <header class="np-mast">
          <div class="np-name">${esc(site ? offName + '.' + (S.region === 'mideast00' ? 'com' : 'net') : offName)}</div>
          <div class="np-line"><span>${site ? 'Государственный новостной портал' : 'Ежедневная газета · орган правительства'}</span><span>№ ${issue}</span><span>${date}</span></div>
        </header>
        <div class="np-grid">
          ${mainHtml}
          <aside class="np-col">
            <section><h4>${site ? 'Лента новостей · страна' : 'В стране'}</h4><ul>${domestic}<li><b>Опрос:</b> ${pollOff}% граждан поддерживают курс ${esc(Game.titleGen())}.</li></ul></section>
            ${notes ? `<section><h4>Коротко</h4><ul class="np-short">${notes}</ul></section>` : ''}
            <section><h4>${site ? 'Лента новостей · мир' : 'В мире'}</h4><ul>${fillerPick.map(([, t]) => `<li>${esc(t)}.</li>`).join('') || '<li>За рубежом без перемен.</li>'}</ul></section>
            <section class="np-eco"><h4>Экономика</h4><p>Мировая цена: ${esc(R.exports)} — <b>${Math.round(S.price * 100)}%</b> от уровня года.</p><p>${esc(econ)}.</p></section>
          </aside>
        </div>
        <div class="np-bottom">
          <section class="np-foreign"><h4>${site ? 'Мировые СМИ о нас' : 'Зарубежная пресса о нас'}</h4>${foreign ? `<ul>${foreign}</ul>` : '<p>Мир пока не обращает на нас внимания.</p>'}</section>
          ${opp}
        </div>
        ${comments}
        <footer class="np-ad">${site ? 'Реклама · ' : 'Объявление · '}${esc(ad)}</footer>
      </div>`, news.some(h => h.choice) ? 'Что скажет правительство?' : 'Перевернуть страницу', 'wide');
    for (const h of news) if (h.choice) await VN.play({ title: h.head, bg: 'office', lines: h.choice.lines, choices: h.choice.choices });
  },
});
