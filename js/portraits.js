// Генератор карикатурных SVG-портретов.
// Портрет собирается из деталей: лицо, причёска, головной убор, усы, очки, мундир, медали.
const Portrait = (() => {
  // ровный цвет выбритых висков: волосы, смешанные с кожей (вместо полупрозрачной накладки, которая давала «сетку»)
  function mixHex(a, b, t) { const h = x => { x = x.replace('#', ''); if (x.length === 3) x = x.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(x.slice(i, i + 2), 16)); }; const A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Ликторская фасция: связка прутьев с топором. Знак итальянской партии в версии «Тучи над миром».
  const FASCIO = (x, y, k = 1, metal = '#c9a640') => `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-2" y="0" width="4" height="15" rx="1" fill="${metal}"/><path d="M-2.4 3 H2.4 M-2.4 7.5 H2.4 M-2.4 12 H2.4" stroke="#3a2a10" stroke-width="0.9"/><path d="M2 1.6 Q8.4 2.2 7.6 7.6 Q4.6 9 2 7.2 Z" fill="${metal}" stroke="#3a2a10" stroke-width="0.5"/></g>`;
  const MEDAL_COLORS = ['#c9302c', '#2a6fdb', '#f0c419', '#2e8b57', '#ffffff', '#8e44ad'];

  function body(p) {
    const c = p.outfitColor || '#4b5320';
    const d = shade(c, -30);
    let s = `<path d="M8 240 C 14 204, 46 189, 100 187 C 154 189, 186 204, 192 240 Z" fill="${c}"/>`;
    s += `<path d="M84 146 L84 192 Q100 202 116 192 L116 146 Z" fill="${shade(p.skin, -28)}"/>`;
    switch (p.outfit) {
      case 'suit':
        s += `<path d="M84 189 L100 232 L116 189 Z" fill="#f4f1ea"/>`;
        if (p.tie !== 'none') s += `<path d="M96 196 L104 196 L107 228 L100 238 L93 228 Z" fill="${p.tie || '#a82424'}"/>`;
        s += `<path d="M84 189 L100 232 L70 240 L56 198 Z" fill="${d}"/><path d="M116 189 L100 232 L130 240 L144 198 Z" fill="${d}"/>`;
        if (p.pin === 'fascio') s += FASCIO(126, 204, 0.8); // значок с фасцией
        else if (p.pin) s += `<circle cx="126" cy="210" r="4.2" fill="#b3141c" stroke="#c9a640" stroke-width="1"/><circle cx="126" cy="210" r="1.8" fill="#fff"/>`; // партийный значок
        break;
      case 'mao':
        s += `<path d="M82 186 Q100 198 118 186 L120 197 Q100 210 80 197 Z" fill="${d}"/>`;
        s += [208, 221, 234].map(y => `<circle cx="100" cy="${y}" r="2.6" fill="${shade(c, -55)}"/>`).join('');
        s += `<rect x="58" y="212" width="24" height="16" rx="2" fill="none" stroke="${d}" stroke-width="2"/><rect x="118" y="212" width="24" height="16" rx="2" fill="none" stroke="${d}" stroke-width="2"/>`;
        break;
      case 'guayabera':
        s += `<path d="M84 189 L100 214 L116 189 Z" fill="${shade(p.skin, -28)}"/>`;
        s += [66, 78, 122, 134].map(x => `<line x1="${x}" y1="200" x2="${x - 2}" y2="240" stroke="${d}" stroke-width="1.6"/>`).join('');
        s += `<path d="M84 189 L100 214 L90 222 L74 196 Z" fill="${shade(c, -12)}"/><path d="M116 189 L100 214 L110 222 L126 196 Z" fill="${shade(c, -12)}"/>`;
        break;
      case 'suit2000': {
        const sh = p.shirt || '#cfe0f0';
        s += `<path d="M86 189 L100 226 L114 189 Z" fill="${sh}"/><path d="M88 189 L100 204 L112 189" fill="none" stroke="${shade(sh, -40)}" stroke-width="1.5"/>`;
        if (p.tie && p.tie !== 'none') s += `<path d="M97.5 198 L102.5 198 L104 228 L100 234 L96 228 Z" fill="${p.tie}"/>`;
        s += `<path d="M86 189 L100 226 L76 240 L66 198 Z" fill="${d}"/><path d="M114 189 L100 226 L124 240 L134 198 Z" fill="${d}"/>`;
        s += `<path d="M30 240 Q40 214 60 200" stroke="${shade(c, 15)}" stroke-width="2" fill="none" opacity="0.6"/><path d="M170 240 Q160 214 140 200" stroke="${shade(c, 15)}" stroke-width="2" fill="none" opacity="0.6"/>`;
        break;
      }
      case 'tracksuit':
        s += `<path d="M82 186 Q100 198 118 186 L120 198 Q100 208 80 198 Z" fill="${shade(c, -20)}"/><line x1="100" y1="200" x2="100" y2="240" stroke="#ddd" stroke-width="2"/>`;
        s += [0, 7, 14].map(o => `<path d="M${30 + o} 240 L${52 + o} 200" stroke="#f4f4f4" stroke-width="3"/><path d="M${170 - o} 240 L${148 - o} 200" stroke="#f4f4f4" stroke-width="3"/>`).join('');
        break;
      case 'polo':
        s += `<path d="M84 188 L100 200 L116 188 L120 196 L100 206 L80 196 Z" fill="${shade(c, 25)}"/><line x1="100" y1="200" x2="100" y2="222" stroke="${shade(c, -30)}" stroke-width="2"/>` + [208, 216].map(y => `<circle cx="100" cy="${y}" r="1.8" fill="#f4f1ea"/>`).join('');
        s += `<rect x="122" y="208" width="10" height="7" rx="1" fill="${shade(c, 40)}" opacity="0.8"/>`;
        break;
      case 'hoodie':
        s += `<path d="M60 196 Q100 176 140 196 Q128 214 100 214 Q72 214 60 196 Z" fill="${d}"/>`;
        s += `<line x1="92" y1="206" x2="90" y2="232" stroke="#f4f1ea" stroke-width="2"/><line x1="108" y1="206" x2="110" y2="232" stroke="#f4f1ea" stroke-width="2"/>`;
        s += `<path d="M76 226 H124 V240 H76 Z" fill="${shade(c, -15)}"/>`;
        break;
      case 'robe':
        s += `<path d="M76 190 Q100 214 124 190 L130 196 Q100 226 70 196 Z" fill="${p.trim || '#e0b23a'}"/>`;
        s += `<path d="M30 240 L52 204 L58 240 Z M170 240 L148 204 L142 240 Z" fill="${shade(c, -20)}"/>`;
        break;
      case 'frock': { // фрак или сюртук: высокий воротник, шейный платок, жилет
        const v = p.vest || shade(c, 25), t = p.tie && p.tie !== 'none' ? p.tie : '#141414';
        s += `<path d="M84 188 L100 238 L116 188 Z" fill="${v}"/><path d="M92 196 L100 214 L108 196 Z" fill="#f4f1ea"/>` + [212, 222, 232].map(y => `<circle cx="100" cy="${y}" r="1.8" fill="${shade(v, -45)}"/>`).join('');
        s += `<path d="M84 188 L100 238 L72 240 L56 200 Z" fill="${d}"/><path d="M116 188 L100 238 L128 240 L144 200 Z" fill="${d}"/><path d="M60 202 L70 212 L66 216 Z M140 202 L130 212 L134 216 Z" fill="${shade(c, -50)}"/>`;
        s += `<path d="M82 184 Q100 194 118 184 L118 194 Q100 204 82 194 Z" fill="${t}"/><path d="M92 196 Q100 192 108 196 L104 206 Q100 202 96 206 Z" fill="${t}"/><ellipse cx="100" cy="197" rx="4" ry="3.4" fill="${shade(t, 25)}"/>`;
        s += `<path d="M84 186 L78 170 L94 186 Z M116 186 L122 170 L106 186 Z" fill="#f4f1ea" stroke="#c9c3b4" stroke-width="0.8"/>`;
        break;
      }
      case 'uniform48': { // мундир 1840-х: стоячий воротник, два ряда пуговиц, эполеты с бахромой
        const col = p.collar || '#c1272d';
        s += `<path d="M100 196 L100 240" stroke="${d}" stroke-width="2"/>` + [206, 218, 230].map(y => `<circle cx="89" cy="${y}" r="2.8" fill="#e2b33c"/><circle cx="111" cy="${y}" r="2.8" fill="#e2b33c"/>`).join('');
        s += `<path d="M79 182 Q100 194 121 182 L122 198 Q100 211 78 198 Z" fill="${col}"/><path d="M78 198 Q100 211 122 198" stroke="#e2b33c" stroke-width="2" fill="none"/>`;
        for (const [cx, rot] of [[40, 14], [160, -14]]) {
          s += `<ellipse cx="${cx}" cy="202" rx="24" ry="8" fill="#e2b33c" transform="rotate(${rot} ${cx} 202)"/><ellipse cx="${cx}" cy="202" rx="12" ry="4" fill="${col}" transform="rotate(${rot} ${cx} 202)"/>`;
          s += Array.from({ length: 9 }, (_, i) => { const x = cx - 20 + i * 5, y0 = 205 + (cx < 100 ? (x - cx) * 0.25 : -(x - cx) * 0.25); return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 13}" stroke="#c99a26" stroke-width="2.2" stroke-linecap="round"/>`; }).join('');
        }
        break;
      }
      case 'blouse': // блуза подмастерья с шейным платком
        s += [70, 80, 90, 110, 120, 130].map(x => `<line x1="${x}" y1="200" x2="${x + (x < 100 ? -3 : 3)}" y2="218" stroke="${d}" stroke-width="1.6"/>`).join('');
        s += `<path d="M84 188 Q100 200 116 188 L112 200 L100 216 L88 200 Z" fill="${p.trim || '#c1272d'}"/><circle cx="100" cy="200" r="4" fill="${shade(p.trim || '#c1272d', -30)}"/>`;
        break;
      case 'cassock': // сутана: ряд мелких пуговиц, белый воротничок или брыжи
        s += Array.from({ length: 8 }, (_, i) => `<circle cx="100" cy="${202 + i * 5}" r="1.4" fill="${shade(c, 45)}"/>`).join('');
        s += `<path d="M84 186 Q100 196 116 186 L116 192 Q100 202 84 192 Z" fill="${shade(c, -10)}"/><rect x="94" y="188" width="12" height="5" rx="1" fill="#f4f1ea"/>`;
        if (p.bands) s += `<path d="M95 193 L93 214 L99 214 L99 193 Z M105 193 L107 214 L101 214 L101 193 Z" fill="#f4f1ea"/>`;
        break;
      case 'poncho': { // пончо с полосами
        const tr = p.trim || '#1a1a1a';
        s += `<path d="M2 240 L28 198 Q100 176 172 198 L198 240 Z" fill="${c}"/>`;
        s += `<path d="M14 222 Q100 204 186 222" stroke="${tr}" stroke-width="5" fill="none"/><path d="M8 232 Q100 214 192 232" stroke="#e8dcc0" stroke-width="3" fill="none"/><path d="M22 212 Q100 194 178 212" stroke="#e8dcc0" stroke-width="2" fill="none" opacity="0.8"/>`;
        s += `<path d="M84 188 L100 208 L116 188 Q100 196 84 188 Z" fill="${shade(p.skin, -28)}"/>`;
        break;
      }
      case 'gown': { // платье с кружевной пелериной
        const tr = p.trim || '#f4f1ea';
        s += `<path d="M66 192 Q100 218 134 192 L124 186 Q100 202 76 186 Z" fill="${p.skin}"/>`;
        s += `<path d="M60 196 Q100 228 140 196 L136 208 Q100 238 64 208 Z" fill="${tr}" opacity="0.95"/>` + Array.from({ length: 9 }, (_, i) => { const x = 66 + i * 8.5, y = 208 + Math.sin(i / 8 * Math.PI) * 22; return `<circle cx="${x}" cy="${y}" r="3.4" fill="${tr}"/>`; }).join('');
        s += `<circle cx="100" cy="214" r="4.5" fill="#e2b33c" stroke="#9a7417" stroke-width="1"/>`;
        break;
      }
      case 'tunic70': { // мундир Рейха 1970-х: вермахт (heer), партия (partei) или СС (ss)
        const br = p.branch || 'heer';
        const col = br === 'ss' ? '#0c0c0d' : br === 'partei' ? shade(c, -45) : '#2c3a30';
        const metal = br === 'partei' ? '#c9a640' : '#c9ccd0';
        const tab = br === 'ss' ? '#0c0c0d' : br === 'partei' ? '#8e1b1b' : '#a3161d';
        s += `<path d="M100 198 L100 240" stroke="${d}" stroke-width="2"/>` + [208, 220, 232].map(y => `<circle cx="100" cy="${y}" r="2.6" fill="${metal}"/>`).join('');
        s += `<path d="M79 184 Q100 198 121 184 L123 199 Q100 213 77 199 Z" fill="${col}"/>`;
        // петлицы
        s += `<path d="M80 188 L92 195 L91 203 L79 196 Z" fill="${tab}" stroke="${metal}" stroke-width="1"/><path d="M120 188 L108 195 L109 203 L121 196 Z" fill="${tab}" stroke="${metal}" stroke-width="1"/>`;
        s += `<path d="M83 192 L89 196 M111 196 L117 192" stroke="${metal}" stroke-width="1.6"/>`;
        // погоны: узкие плетёные
        s += `<rect x="20" y="197" width="38" height="9" rx="2" fill="${metal}" transform="rotate(13 39 201)"/><rect x="142" y="197" width="38" height="9" rx="2" fill="${metal}" transform="rotate(-13 161 201)"/>`;
        s += `<path d="M24 199 L54 206 M146 206 L176 199" stroke="${shade(c, -50)}" stroke-width="1.2" stroke-dasharray="3 2"/>`;
        // нагрудный орёл
        if (br !== 'partei') s += `<path d="M58 214 Q68 209 78 214 M68 212 V219" stroke="${metal}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="68" cy="221" r="2" fill="${metal}"/>`;
        // орден на шее
        if (p.cross) s += `<path d="M96 203 H104 M100 199 V207" stroke="#0c0c0d" stroke-width="5"/><path d="M96 203 H104 M100 199 V207" stroke="${metal}" stroke-width="1.2"/>`;
        // нарукавная повязка у партии и СС
        if (br !== 'heer') s += `<path d="M163 212 L190 220 L192 240 L160 240 Z" fill="#b3141c"/><circle cx="177" cy="229" r="7" fill="#fff"/><g transform="rotate(45 177 229)" stroke="#000" stroke-width="1.5" fill="none" stroke-linecap="square"><path d="M177 225 V233 M173 229 H181"/><path d="M177 225 H180.2 M181 229 V232.2 M177 233 H173.8 M173 229 V225.8"/></g>`;
        break;
      }
      case 'mantle': { // мантия мага: высокий воротник, кайма, застёжка-звезда
        const tr = p.trim || '#c9a640';
        s += `<path d="M62 204 L80 164 L92 202 Z" fill="${d}"/><path d="M138 204 L120 164 L108 202 Z" fill="${d}"/>`;
        s += `<path d="M82 190 L100 232 L118 190 L112 187 L100 216 L88 187 Z" fill="${tr}"/>`;
        s += `<path d="M30 240 L52 204 L60 240 Z M170 240 L148 204 L140 240 Z" fill="${shade(c, -22)}"/>`;
        s += `<path d="M100 207 L102.5 213 L109 213.5 L104 217.5 L105.5 224 L100 220.5 L94.5 224 L96 217.5 L91 213.5 L97.5 213 Z" fill="${tr}" stroke="${shade(c, -50)}" stroke-width="0.8"/>`;
        break;
      }
      case 'powerarmor': { // силовой доспех: высокий горжет, купола наплечников с кантом, кираса с солнечной печатью
        const st = p.steel || '#3a3f4a', tr = p.trim || '#c9a640', dk = shade(st, -38), lt = shade(st, 26);
        s += `<path d="M52 240 L60 190 Q100 176 140 190 L148 240 Z" fill="${st}"/><path d="M74 196 Q100 186 126 196 L122 240 L78 240 Z" fill="${lt}" opacity="0.35"/>`;
        s += `<path d="M82 240 V206 M118 240 V206" stroke="${dk}" stroke-width="3"/>`;
        for (const sx of [1, -1]) {
          const X = v => (sx === 1 ? v : 200 - v);
          s += `<path d="M${X(-8)} 240 Q${X(-14)} 168 ${X(40)} 156 Q${X(82)} 158 ${X(88)} 212 L${X(88)} 240 Z" fill="${st}" stroke="${dk}" stroke-width="1.5"/>`;
          s += `<path d="M${X(-10)} 232 Q${X(-14)} 168 ${X(40)} 156 Q${X(82)} 158 ${X(88)} 212" fill="none" stroke="${tr}" stroke-width="7" stroke-linecap="round"/>`;
          s += `<path d="M${X(8)} 232 Q${X(8)} 184 ${X(42)} 176 Q${X(68)} 178 ${X(72)} 214" fill="none" stroke="${dk}" stroke-width="2"/>`;
          s += `<path d="M${X(14)} 196 Q${X(30)} 176 ${X(54)} 180" fill="none" stroke="${lt}" stroke-width="3" opacity="0.5" stroke-linecap="round"/>`;
          for (const [rx, ry] of [[-4, 208], [8, 174], [40, 160], [72, 172], [86, 204]]) s += `<circle cx="${X(rx)}" cy="${ry}" r="2.4" fill="${shade(tr, -45)}"/>`;
        }
        s += `<path d="M66 204 Q62 166 100 170 Q138 166 134 204 Q100 218 66 204 Z" fill="${dk}" stroke="${tr}" stroke-width="2.5"/><path d="M74 198 Q100 208 126 198" fill="none" stroke="${lt}" stroke-width="2" opacity="0.5"/>`;
        s += [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M100 226 L100 211" stroke="${tr}" stroke-width="3" stroke-linecap="round" transform="rotate(${a} 100 226)"/>`).join('') + `<circle cx="100" cy="226" r="7.5" fill="${tr}" stroke="${shade(tr, -50)}" stroke-width="1.2"/><circle cx="100" cy="226" r="3" fill="${dk}"/>`;
        s += `<circle cx="150" cy="196" r="5" fill="#8e2a2a" stroke="#5a1a1a" stroke-width="1"/><path d="M146 200 L143 226 L149 222 L154 228 L154 200 Z" fill="#e9dcb8"/><path d="M147 206 H152 M146.5 211 H152 M146 216 H152" stroke="#6a2a2a" stroke-width="1"/>`;
        break;
      }
      case 'greatcoat': { // шинель: широкие лацканы, эполеты, перевязь
        const tr = p.trim || '#c9a640';
        s += `<path d="M78 176 L100 226 L62 240 L40 240 Z" fill="${shade(c, -28)}"/><path d="M122 176 L100 226 L138 240 L160 240 Z" fill="${shade(c, -28)}"/><path d="M78 176 L100 226 L122 176" fill="none" stroke="${tr}" stroke-width="2"/>`;
        for (const x of [38, 162]) s += `<rect x="${x - 22}" y="196" width="44" height="12" rx="5" fill="${tr}"/>` + [-14, -5, 4, 13].map(d => `<path d="M${x + d} 208 v9" stroke="${tr}" stroke-width="3"/>`).join('');
        s += `<path d="M52 200 L150 240 L128 240 L46 206 Z" fill="#8e2a2a"/><circle cx="92" cy="232" r="2.6" fill="${tr}"/><circle cx="108" cy="232" r="2.6" fill="${tr}"/>`;
        break;
      }
      case 'starsuit': { // форма Флота: тёмный комбинезон, цветная кокетка по отделу, значок
        const dep = p.trim || '#c9a85a';
        s += `<path d="M22 240 Q28 200 78 176 L100 198 L122 176 Q172 200 178 240 L158 240 Q150 214 124 206 L100 216 L76 206 Q50 214 42 240 Z" fill="${dep}"/>`;
        s += `<path d="M80 178 L100 197 L120 178 Q100 189 80 178 Z" fill="#12161a"/><path d="M78 176 L100 198 L122 176" fill="none" stroke="${shade(dep, -45)}" stroke-width="2"/>`;
        s += `<circle cx="132" cy="226" r="5" fill="#d8dccf" stroke="#12161a" stroke-width="1"/><ellipse cx="132" cy="226" rx="9" ry="2.6" fill="none" stroke="#d8dccf" stroke-width="1.4" transform="rotate(-20 132 226)"/>`;
        for (let i = 0; i < (p.pips || 0); i++) s += `<circle cx="${70 + i * 7}" cy="226" r="2.2" fill="#d8dccf"/>`;
        break;
      }
      case 'ermine': { // императорская мантия: горностаевый воротник и цепь
        const fur = '#efe9da', gold = p.trim || '#d9b44a';
        s += `<path d="M24 240 Q30 198 80 172 L100 212 L86 240 Z" fill="${fur}" stroke="#cfc6ae" stroke-width="1.2"/><path d="M176 240 Q170 198 120 172 L100 212 L114 240 Z" fill="${fur}" stroke="#cfc6ae" stroke-width="1.2"/>`;
        for (const [x, y] of [[44, 222], [58, 204], [74, 190], [70, 226], [86, 208], [126, 190], [142, 204], [156, 222], [130, 226], [114, 208]]) s += `<path d="M${x} ${y} l2.4 7 l-4.8 0 Z" fill="#1a1a1a"/>`;
        s += `<path d="M78 180 Q100 222 122 180" fill="none" stroke="${gold}" stroke-width="3.2"/><circle cx="100" cy="204" r="6.5" fill="${gold}" stroke="${shade(gold, -50)}" stroke-width="1.2"/><circle cx="100" cy="204" r="2.6" fill="${p.gem || '#a8242a'}"/>`;
        break;
      }
      case 'plate': { // латы: горжет, наплечники, заклёпки
        const st = p.steel || '#9aa0a6';
        s += `<path d="M76 184 Q100 204 124 184 L128 202 Q100 222 72 202 Z" fill="${st}" stroke="${shade(st, -45)}" stroke-width="1.5"/>`;
        s += `<ellipse cx="40" cy="206" rx="30" ry="14" fill="${st}" stroke="${shade(st, -45)}" stroke-width="1.5" transform="rotate(14 40 206)"/><ellipse cx="160" cy="206" rx="30" ry="14" fill="${st}" stroke="${shade(st, -45)}" stroke-width="1.5" transform="rotate(-14 160 206)"/>`;
        s += `<path d="M100 216 V240" stroke="${shade(st, -45)}" stroke-width="2"/>` + [[28, 204], [52, 210], [148, 210], [172, 204]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${shade(st, -55)}"/>`).join('');
        break;
      }
      case 'gunpuku': { // мундир императорской армии: отложной воротник, красные петлицы со звёздами
        const metal = '#c9a640', tab = '#b3141c';
        s += `<path d="M100 200 L100 240" stroke="${d}" stroke-width="2"/>` + [210, 222, 234].map(y => `<circle cx="100" cy="${y}" r="2.7" fill="${metal}"/>`).join('');
        s += `<path d="M79 184 Q100 198 121 184 L124 200 Q100 215 76 200 Z" fill="${d}"/>`;
        s += `<path d="M78 189 L94 198 L93 207 L77 198 Z" fill="${tab}" stroke="${metal}" stroke-width="0.8"/><path d="M122 189 L106 198 L107 207 L123 198 Z" fill="${tab}" stroke="${metal}" stroke-width="0.8"/>`;
        s += `<path d="M79 194 L92 202 M121 194 L108 202" stroke="${metal}" stroke-width="1.6"/><circle cx="85" cy="197.5" r="1.5" fill="#fff5c8"/><circle cx="115" cy="197.5" r="1.5" fill="#fff5c8"/>`;
        // нагрудные карманы и портупея
        s += [[54, 214], [122, 214]].map(([x, y]) => `<path d="M${x} ${y} H${x + 24} L${x + 12} ${y + 7} Z" fill="${shade(c, -22)}"/><circle cx="${x + 12}" cy="${y + 5}" r="1.5" fill="${metal}"/>`).join('');
        s += `<path d="M150 198 L112 240 L104 240 L143 196 Z" fill="#4a3320"/>`;
        break;
      }
      case 'kaigun': { // тёмно-синий китель флота: стоячий воротник, чёрная тесьма, якоря на воротнике
        const metal = '#c9a640', braid = shade(c, -45);
        s += `<path d="M80 184 Q100 196 120 184 L122 198 Q100 210 78 198 Z" fill="${shade(c, -18)}" stroke="${braid}" stroke-width="2"/>`;
        s += `<path d="M100 204 V240" stroke="${braid}" stroke-width="6"/><path d="M100 204 V240" stroke="${shade(c, 14)}" stroke-width="1"/>`;
        s += `<path d="M20 222 Q60 208 96 212 M180 222 Q140 208 104 212" stroke="${braid}" stroke-width="2.2" fill="none"/>`;
        // якорь с цветком сакуры на воротнике
        s += [87, 113].map(x => `<path d="M${x} 189 V197 M${x - 3} 191.5 H${x + 3} M${x - 3.5} 194.5 Q${x} 199.5 ${x + 3.5} 194.5" stroke="${metal}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`).join('');
        // погоны с галуном
        s += `<rect x="22" y="197" width="36" height="9" rx="2" fill="${metal}" transform="rotate(13 40 201)"/><rect x="142" y="197" width="36" height="9" rx="2" fill="${metal}" transform="rotate(-13 160 201)"/>`;
        s += `<path d="M26 200 L54 206 M146 206 L174 200" stroke="${shade(c, -30)}" stroke-width="2"/>`;
        break;
      }
      case 'montsuki': { // парадное кимоно с гербами и накидкой хаори
        s += `<path d="M84 188 L100 214 L116 188 Z" fill="${shade(p.skin, -28)}"/>`;
        s += `<path d="M77 186 L100 226 L123 186 L117 184 L100 214 L83 184 Z" fill="#f4f1ea"/>`;
        s += `<path d="M70 189 L100 238 L130 189 L123 186 L100 226 L77 186 Z" fill="${shade(c, 26)}"/>`;
        s += `<path d="M62 193 L88 240 M138 193 L112 240" stroke="${shade(c, -45)}" stroke-width="3" fill="none"/>`;
        // гербы на груди
        s += [56, 144].map(x => `<circle cx="${x}" cy="216" r="6" fill="none" stroke="#f4f1ea" stroke-width="1.5"/><path d="M${x} 211.5 V220.5 M${x - 4.5} 216 H${x + 4.5}" stroke="#f4f1ea" stroke-width="1.2"/><circle cx="${x}" cy="216" r="1.8" fill="#f4f1ea"/>`).join('');
        // шнур хаори
        s += `<path d="M90 238 Q100 229 110 238" stroke="#f4f1ea" stroke-width="2.4" fill="none"/><circle cx="100" cy="233" r="3.2" fill="#f4f1ea"/>`;
        break;
      }
      case 'kokumin': { // «народная форма» 1940 года: гражданский китель защитного цвета
        s += `<path d="M79 184 Q100 198 121 184 L124 200 Q100 215 76 200 Z" fill="${d}"/><path d="M81 185 Q100 197 119 185" stroke="#f4f1ea" stroke-width="2.4" fill="none"/>`;
        s += `<path d="M100 206 L100 240" stroke="${shade(c, -45)}" stroke-width="1.6"/>` + [214, 225, 236].map(y => `<circle cx="100" cy="${y}" r="2.3" fill="${shade(c, -60)}"/>`).join('');
        s += [[52, 212], [124, 212]].map(([x, y]) => `<rect x="${x}" y="${y}" width="24" height="18" rx="2" fill="${shade(c, -8)}" stroke="${shade(c, -45)}" stroke-width="1.1"/><path d="M${x} ${y} H${x + 24} L${x + 12} ${y + 7} Z" fill="${shade(c, -24)}"/>`).join('');
        if (p.pin) s += `<circle cx="64" cy="204" r="3.4" fill="#f4f1ea" stroke="#c9a640" stroke-width="0.9"/><circle cx="64" cy="204" r="1.5" fill="#bc002d"/>`; // значок Ассоциации
        break;
      }
      case 'orbace': { // чёрная форма иерархов партии и милиции: чёрная рубашка, чёрный галстук, «чёрное пламя» на воротнике
        const metal = p.metal || '#c9a640';
        s += `<path d="M84 189 L100 232 L116 189 Z" fill="#0a0a0b"/><path d="M96.5 196 L103.5 196 L106 228 L100 237 L94 228 Z" fill="#232327"/><path d="M96.5 196 L103.5 196 L102 203 L98 203 Z" fill="#303035"/>`;
        s += `<path d="M84 189 L100 232 L68 240 L54 198 Z" fill="${d}"/><path d="M116 189 L100 232 L132 240 L146 198 Z" fill="${d}"/>`;
        // «чёрное пламя» с серебряной фасцией на отворотах
        s += `<path d="M62 199 L78 205 L74 212 L71 208 L68 216 L64 209 L60 213 Z" fill="#0a0a0b" stroke="${metal}" stroke-width="0.9"/><path d="M138 199 L122 205 L126 212 L129 208 L132 216 L136 209 L140 213 Z" fill="#0a0a0b" stroke="${metal}" stroke-width="0.9"/>`;
        s += `<path d="M69 203 V210 M131 203 V210" stroke="${metal}" stroke-width="1.6"/>`;
        // узкие погоны с кантом
        s += `<rect x="20" y="198" width="36" height="8" rx="2" fill="#0a0a0b" stroke="${metal}" stroke-width="1.2" transform="rotate(13 38 202)"/><rect x="144" y="198" width="36" height="8" rx="2" fill="#0a0a0b" stroke="${metal}" stroke-width="1.2" transform="rotate(-13 162 202)"/>`;
        // фасция на груди и ремень с портупеей
        s += FASCIO(70, 216, 1.15, metal);
        s += `<path d="M150 200 L112 240 L104 240 L143 198 Z" fill="#2a1d14"/><circle cx="127" cy="220" r="2.2" fill="${metal}"/>`;
        break;
      }
      case 'grigio': { // серо-зелёный мундир королевской армии: открытый ворот, петлицы со звёздочками
        const tab = p.tab || '#a3161d', metal = '#c9ccd0', sh = shade(c, 28);
        s += `<path d="M84 189 L100 230 L116 189 Z" fill="${sh}"/><path d="M96.5 196 L103.5 196 L106 226 L100 235 L94 226 Z" fill="${shade(c, -42)}"/>`;
        s += `<path d="M84 189 L100 230 L70 240 L56 198 Z" fill="${d}"/><path d="M116 189 L100 230 L130 240 L144 198 Z" fill="${d}"/>`;
        // петлицы с пятиконечными звёздочками
        const star = (x, y) => `<path d="M${x} ${y - 3.4} L${x + 1} ${y - 1} L${x + 3.4} ${y - 1} L${x + 1.5} ${y + 0.6} L${x + 2.2} ${y + 3.2} L${x} ${y + 1.6} L${x - 2.2} ${y + 3.2} L${x - 1.5} ${y + 0.6} L${x - 3.4} ${y - 1} L${x - 1} ${y - 1} Z" fill="${metal}"/>`;
        s += `<path d="M61 198 L77 204 L74 215 L59 208 Z" fill="${tab}"/><path d="M139 198 L123 204 L126 215 L141 208 Z" fill="${tab}"/>` + star(68, 207) + star(132, 207);
        // погоны с золотым кантом и ремень через плечо
        s += `<rect x="20" y="197" width="38" height="9" rx="2" fill="${shade(c, -18)}" stroke="#c9a640" stroke-width="1.3" transform="rotate(13 39 201)"/><rect x="142" y="197" width="38" height="9" rx="2" fill="${shade(c, -18)}" stroke="#c9a640" stroke-width="1.3" transform="rotate(-13 161 201)"/>`;
        s += `<path d="M50 200 L88 240 L96 240 L57 198 Z" fill="#4a3320"/><circle cx="72" cy="221" r="2.2" fill="#c9a640"/>`;
        break;
      }
      case 'sahariana': { // колониальный китель: четыре кармана, ремень, открытый ворот
        const sh = shade(c, 30);
        s += `<path d="M84 189 L100 218 L116 189 Z" fill="${sh}"/><path d="M84 189 L100 218 L84 226 L66 198 Z" fill="${d}"/><path d="M116 189 L100 218 L116 226 L134 198 Z" fill="${d}"/>`;
        s += `<path d="M100 218 V240" stroke="${shade(c, -45)}" stroke-width="1.6"/>` + [224, 235].map(y => `<circle cx="100" cy="${y}" r="2.2" fill="${shade(c, -55)}"/>`).join('');
        // нагрудные карманы с клапаном
        s += [[52, 208], [124, 208]].map(([x, y]) => `<rect x="${x}" y="${y}" width="24" height="20" rx="2" fill="${shade(c, -10)}" stroke="${shade(c, -45)}" stroke-width="1.2"/><path d="M${x} ${y} H${x + 24} L${x + 12} ${y + 8} Z" fill="${shade(c, -24)}"/><circle cx="${x + 12}" cy="${y + 6}" r="1.6" fill="${shade(c, -60)}"/>`).join('');
        s += `<rect x="20" y="198" width="36" height="8" rx="2" fill="${shade(c, -22)}" transform="rotate(13 38 202)"/><rect x="144" y="198" width="36" height="8" rx="2" fill="${shade(c, -22)}" transform="rotate(-13 162 202)"/>`;
        break;
      }
      default: // military
        s += `<path d="M80 186 Q100 199 120 186 L122 197 Q100 211 78 197 Z" fill="${d}"/>`;
        s += [212, 226].map(y => `<circle cx="100" cy="${y}" r="3" fill="#e2b33c"/>`).join('');
        s += `<ellipse cx="40" cy="203" rx="24" ry="7" fill="#e2b33c" transform="rotate(14 40 203)"/><ellipse cx="160" cy="203" rx="24" ry="7" fill="#e2b33c" transform="rotate(-14 160 203)"/>`;
        s += [22, 30, 38, 46, 54].map(x => `<line x1="${x}" y1="${200 + (x - 22) * 0.25}" x2="${x - 2}" y2="${212 + (x - 22) * 0.25}" stroke="#c99a26" stroke-width="2"/>`).join('');
        s += [146, 154, 162, 170, 178].map(x => `<line x1="${x}" y1="${208 - (x - 146) * 0.25}" x2="${x + 2}" y2="${220 - (x - 146) * 0.25}" stroke="#c99a26" stroke-width="2"/>`).join('');
        s += `<path d="M64 200 Q60 218 70 236" fill="none" stroke="#e2b33c" stroke-width="2.5"/>`; // аксельбант
    }
    if (p.sash) s += `<path d="M48 198 L64 192 L150 240 L120 240 Z" fill="${p.sash}" opacity="0.92"/><path d="M56 195 L60 193 L136 240 L130 240 Z" fill="#f0c419" opacity="0.7"/>`;
    // Награды — орденская колодка на левой стороне груди: ровные ряды планок, без висящих кружков.
    // Не рисуется на одежде, где ей не место; на штатском — один ряд.
    const noMedals = ['montsuki', 'guayabera', 'poncho', 'robe', 'mantle', 'tracksuit', 'polo', 'hoodie', 'ermine', 'plate', 'starsuit', 'powerarmor'].includes(p.outfit);
    const civil = ['suit', 'suit2000', 'frock'].includes(p.outfit);
    const n = noMedals ? 0 : Math.min(p.medals || 0, civil ? 4 : 12);
    if (n) {
      const rows = Math.ceil(n / 4), x0 = 119, y0 = civil ? 214 : 209;
      for (let i = 0; i < n; i++) {
        const row = Math.floor(i / 4), inRow = Math.min(4, n - row * 4), col = i % 4;
        const x = x0 + (4 - inRow) * 4 + col * 8, y = y0 + row * 5;
        s += `<rect x="${x}" y="${y}" width="7" height="4" fill="${MEDAL_COLORS[(i * 7 + row) % MEDAL_COLORS.length]}" stroke="#1a1a1a" stroke-opacity="0.45" stroke-width="0.5"/><rect x="${x + 3}" y="${y}" width="1.2" height="4" fill="#f4f1ea" opacity="0.55"/>`;
      }
      if (!civil && !p.sash && (p.medals || 0) >= 10) s += `<path d="M135 ${y0 + rows * 5 + 3} l1.8 4 l4.3 .4 l-3.3 2.9 l1 4.2 l-3.8 -2.3 l-3.8 2.3 l1 -4.2 l-3.3 -2.9 l4.3 -.4 Z" fill="#e2b33c" stroke="#9a7417" stroke-width="0.7"/>`;
    }
    return s;
  }

  // Причёски нарисованы под овал (ширина 94, макушка на 54): подгоняем ширину и высоту под другие лица
  const FACE_FIT = { oval: [1, 0], round: [1.1, 7], square: [1.03, 1], long: [0.9, -6] };
  function hairFit(face) {
    const [sx, dy] = FACE_FIT[face] || FACE_FIT.oval;
    return `translate(100 ${54 + dy}) scale(${sx} 1) translate(-100 -54)`;
  }
  const HAT_DY = { oval: 0, round: 3, square: 1, long: -6 };
  function hatFit(face) { return `translate(0 ${HAT_DY[face] || 0})`; }
  function head(p) {
    const sk = p.skin, dk = shade(sk, -32);
    let s = '';
    if (p.hair === 'afro' && (!p.hat || p.hat === 'none')) s += `<ellipse cx="100" cy="86" rx="66" ry="54" fill="${p.hairColor}"/>`;
    s += `<ellipse cx="51" cy="114" rx="9" ry="13" fill="${sk}"/><ellipse cx="149" cy="114" rx="9" ry="13" fill="${sk}"/>`;
    if (p.ears === 'elf') s += `<path d="M43 122 L26 82 L58 104 Z" fill="${sk}"/><path d="M157 122 L174 82 L142 104 Z" fill="${sk}"/><path d="M44 116 L33 92" stroke="${dk}" stroke-width="1.6"/><path d="M156 116 L167 92" stroke="${dk}" stroke-width="1.6"/>`;
    switch (p.face) {
      case 'round': s += `<ellipse cx="100" cy="112" rx="52" ry="51" fill="${sk}"/>`; break;
      case 'square': s += `<path d="M53 82 Q53 56 100 56 Q147 56 147 82 L147 130 Q147 166 100 168 Q53 166 53 130 Z" fill="${sk}"/>`; break;
      case 'long': s += `<ellipse cx="100" cy="108" rx="42" ry="60" fill="${sk}"/>`; break;
      default: s += `<ellipse cx="100" cy="110" rx="47" ry="56" fill="${sk}"/>`;
    }
    if (p.blush) s += `<ellipse cx="74" cy="130" rx="9" ry="5" fill="#e06666" opacity="0.28"/><ellipse cx="126" cy="130" rx="9" ry="5" fill="#e06666" opacity="0.28"/>`;
    // бороды нарисованы под овал: ширину подгоняем под лицо, как причёски
    const bfit = `translate(100 0) scale(${(FACE_FIT[p.face] || FACE_FIT.oval)[0]} 1) translate(-100 0)`;
    if (p.beard === 'full') s += `<g transform="${bfit}"><path d="M53 104 Q57 128 80 133 Q100 127 120 133 Q143 128 147 104 Q152 172 100 181 Q48 172 53 104 Z" fill="${p.hairColor}"/><ellipse cx="100" cy="147" rx="13" ry="7.5" fill="${sk}"/></g>`;
    if (p.beard === 'sideburns') s += `<g transform="${bfit}"><path d="M51 94 Q47 140 72 158 Q86 152 82 134 Q66 126 62 98 Z M149 94 Q153 140 128 158 Q114 152 118 134 Q134 126 138 98 Z" fill="${p.hairColor}"/></g>`;
    if (p.beard === 'chinstrap') s += `<g transform="${bfit}"><path d="M52 102 Q50 174 100 182 Q150 174 148 102 L141 104 Q140 158 100 167 Q60 158 59 104 Z" fill="${p.hairColor}"/></g>`;
    // глаза
    if (p.eyes === 'sleepy') {
      s += `<path d="M76 108 Q83 112 90 108" stroke="#1d1d1d" stroke-width="3" fill="none"/><path d="M110 108 Q117 112 124 108" stroke="#1d1d1d" stroke-width="3" fill="none"/>`;
    } else if (p.eyeGlow) { // нежить и те, кто слишком долго смотрел в Бездну
      s += `<ellipse cx="83" cy="106" rx="7" ry="7.5" fill="#12161a"/><ellipse cx="117" cy="106" rx="7" ry="7.5" fill="#12161a"/>`;
      s += `<circle cx="83" cy="106" r="5.5" fill="${p.eyeGlow}" opacity="0.3"/><circle cx="117" cy="106" r="5.5" fill="${p.eyeGlow}" opacity="0.3"/><circle cx="83" cy="106" r="2.6" fill="${p.eyeGlow}"/><circle cx="117" cy="106" r="2.6" fill="${p.eyeGlow}"/>`;
    } else {
      s += `<ellipse cx="83" cy="106" rx="4.5" ry="5.5" fill="#1d1d1d"/><ellipse cx="117" cy="106" rx="4.5" ry="5.5" fill="#1d1d1d"/>`;
      s += `<circle cx="84.5" cy="104" r="1.4" fill="#fff"/><circle cx="118.5" cy="104" r="1.4" fill="#fff"/>`;
    }
    const bc = p.browColor || p.hairColor;
    if (p.brows === 'bushy') s += `<path d="M70 94 Q82 84 95 93" stroke="${bc}" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M105 93 Q118 84 130 94" stroke="${bc}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    else if (p.brows === 'angry') s += `<path d="M71 88 L95 97" stroke="${bc}" stroke-width="5" stroke-linecap="round"/><path d="M129 88 L105 97" stroke="${bc}" stroke-width="5" stroke-linecap="round"/>`;
    else if (p.brows === 'worried') s += `<path d="M72 96 L94 89" stroke="${bc}" stroke-width="4" stroke-linecap="round"/><path d="M128 96 L106 89" stroke="${bc}" stroke-width="4" stroke-linecap="round"/>`;
    else s += `<path d="M73 94 Q83 90 94 94" stroke="${bc}" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M106 94 Q117 90 127 94" stroke="${bc}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`;
    // нос
    if (p.nose === 'big') s += `<ellipse cx="100" cy="122" rx="11" ry="9" fill="${shade(sk, -14)}"/>`;
    else s += `<path d="M100 104 Q92 125 99 129 Q106 131 108 126" fill="none" stroke="${dk}" stroke-width="2.6" stroke-linecap="round"/>`;
    // рот
    switch (p.mouth) {
      case 'grin': s += `<path d="M82 140 Q100 160 118 140 Z" fill="#fff" stroke="#5a2a1a" stroke-width="2"/><line x1="91" y1="141.5" x2="91" y2="145.5" stroke="#c9c9c9" stroke-width="1.2"/><line x1="100" y1="141.5" x2="100" y2="148" stroke="#c9c9c9" stroke-width="1.2"/><line x1="109" y1="141.5" x2="109" y2="145.5" stroke="#c9c9c9" stroke-width="1.2"/>`; break;
      case 'smirk': s += `<path d="M88 146 Q104 148 116 138" fill="none" stroke="#5a2a1a" stroke-width="3" stroke-linecap="round"/>`; break;
      case 'flat': s += `<line x1="88" y1="145" x2="112" y2="145" stroke="#5a2a1a" stroke-width="3" stroke-linecap="round"/>`; break;
      case 'o': s += `<ellipse cx="100" cy="146" rx="6" ry="7" fill="#5a2a1a"/>`; break;
      case 'frown': s += `<path d="M86 149 Q100 139 114 149" fill="none" stroke="#5a2a1a" stroke-width="3" stroke-linecap="round"/>`; break;
      default: s += `<path d="M86 141 Q100 153 114 141" fill="none" stroke="#5a2a1a" stroke-width="3" stroke-linecap="round"/>`;
    }
    const hc = p.hairColor, isHex = x => /^#[0-9a-f]{3,6}$/i.test(x || ''), stub = isHex(hc) && isHex(p.skin) ? mixHex(hc, p.skin, 0.5) : hc;
    switch (p.mustache) {
      case 'thick': s += `<path d="M76 137 Q89 125 100 132 Q111 125 124 137 Q112 142 100 137 Q88 142 76 137 Z" fill="${hc}"/>`; break;
      case 'walrus': s += `<path d="M72 150 Q78 124 100 129 Q122 124 128 150 Q115 139 100 141 Q85 139 72 150 Z" fill="${hc}"/>`; break;
      case 'pencil': s += `<path d="M86 134 Q100 129 114 134" fill="none" stroke="${hc}" stroke-width="2.5"/>`; break;
      case 'waxed': s += `<path d="M100 133 Q88 127 76 133 Q66 138 60 126 Q63 142 78 140 Q90 140 100 136 Q110 140 122 140 Q137 142 140 126 Q134 138 124 133 Q112 127 100 133 Z" fill="${hc}"/>`; break;
      case 'handlebar': s += `<path d="M74 126 Q70 137 80 139 Q90 130 100 134 Q110 130 120 139 Q130 137 126 126 Q120 136 100 130 Q80 136 74 126 Z" fill="${hc}"/>`; break;
    }
    if (p.beard === 'goatee') s += `<path d="M90 152 Q100 172 110 152 Q100 158 90 152 Z" fill="${hc}"/>`;
    if (p.beard === 'imperial') s += `<path d="M94 150 Q100 184 106 150 Q100 155 94 150 Z" fill="${hc}"/>`;
    // очки
    switch (p.glasses) {
      case 'rimless':
        s += `<rect x="72" y="99" width="22" height="14" rx="5" fill="#fff" fill-opacity="0.12" stroke="#9fb3c4" stroke-width="1.2"/><rect x="106" y="99" width="22" height="14" rx="5" fill="#fff" fill-opacity="0.12" stroke="#9fb3c4" stroke-width="1.2"/><line x1="94" y1="104" x2="106" y2="104" stroke="#9fb3c4" stroke-width="1.6"/>`;
        break;
      case 'sport':
        s += `<path d="M64 100 Q100 92 136 100 L134 112 Q118 120 102 112 L98 112 Q82 120 66 112 Z" fill="#1a2430" opacity="0.94"/><path d="M70 102 Q100 96 130 102" stroke="#7fd4ff" stroke-width="2" fill="none" opacity="0.7"/>`;
        break;
      case 'aviator':
        s += `<path d="M68 99 L97 99 Q99 117 86 120 Q71 120 68 104 Z" fill="#1b1b1b" opacity="0.92" stroke="#c9a640" stroke-width="1.6"/>`;
        s += `<path d="M132 99 L103 99 Q101 117 114 120 Q129 120 132 104 Z" fill="#1b1b1b" opacity="0.92" stroke="#c9a640" stroke-width="1.6"/>`;
        s += `<line x1="97" y1="101" x2="103" y2="101" stroke="#c9a640" stroke-width="2"/><path d="M78 103 L84 101" stroke="#fff" stroke-width="1.5" opacity="0.5"/>`;
        break;
      case 'round':
        s += `<circle cx="83" cy="106" r="12" fill="#fff" fill-opacity="0.12" stroke="#2a2a2a" stroke-width="2.6"/><circle cx="117" cy="106" r="12" fill="#fff" fill-opacity="0.12" stroke="#2a2a2a" stroke-width="2.6"/><line x1="95" y1="105" x2="105" y2="105" stroke="#2a2a2a" stroke-width="2.4"/>`;
        break;
      case 'square':
        s += `<rect x="70" y="97" width="26" height="18" rx="3" fill="#fff" fill-opacity="0.1" stroke="#1d1d1d" stroke-width="3.2"/><rect x="104" y="97" width="26" height="18" rx="3" fill="#fff" fill-opacity="0.1" stroke="#1d1d1d" stroke-width="3.2"/><line x1="96" y1="104" x2="104" y2="104" stroke="#1d1d1d" stroke-width="3"/>`;
        break;
      case 'pince':
        s += `<ellipse cx="84" cy="106" rx="9" ry="7.5" fill="#fff" fill-opacity="0.12" stroke="#2a2a2a" stroke-width="1.8"/><ellipse cx="116" cy="106" rx="9" ry="7.5" fill="#fff" fill-opacity="0.12" stroke="#2a2a2a" stroke-width="1.8"/><path d="M93 104 Q100 98 107 104" stroke="#2a2a2a" stroke-width="1.6" fill="none"/><path d="M125 108 Q140 140 126 174" stroke="#2a2a2a" stroke-width="1" fill="none"/>`;
        break;
      case 'monocle':
        s += `<circle cx="117" cy="106" r="12" fill="#fff" fill-opacity="0.15" stroke="#c9a640" stroke-width="2.6"/><path d="M129 108 Q140 140 128 170" fill="none" stroke="#c9a640" stroke-width="1.4"/>`;
        break;
    }
    // причёска: рисуется для овального лица и подгоняется под форму головы
    const hatOn = p.hat && p.hat !== 'none' && p.hat !== 'hachimaki' && p.hat !== 'circlet' && p.hat !== 'headset' && p.hat !== 'laurel';
    let hair = p.hair;
    if (hatOn) {
      if (['keffiyeh', 'hijab', 'hood'].includes(p.hat) || (p.hat === 'helmet' && hair !== 'long')) hair = 'none';
      else if (p.hat === 'lamahat' || p.hat === 'furhat') hair = hair === 'bald' ? 'none' : 'baldside';
      else if (hair === 'curly' || hair === 'romantic') hair = 'curlyside';
      else if (['bun', 'gelled', 'slick', 'mohawk', 'flattop', 'topknot', 'tonsure', 'undercut'].includes(hair)) hair = 'short';
      else if (hair === 'braids') hair = 'long';
      else if (hair === 'combover') hair = 'baldside';
      else if (hair === 'bald') hair = 'baldside';
    }
    s += `<g transform="${hairFit(p.face)}">`;
    switch (hair) {
      case 'short': s += `<path d="M53 98 Q50 56 100 52 Q150 56 147 98 Q141 72 100 70 Q59 72 53 98 Z" fill="${hc}"/>`; break;
      case 'slick': s += `<path d="M53 100 Q48 52 104 50 Q152 54 147 100 Q144 74 120 66 L118 72 Q90 64 60 80 Q55 88 53 100 Z" fill="${hc}"/><path d="M118 52 Q112 60 118 72" stroke="${shade(hc, 40)}" stroke-width="1.5" fill="none"/>`; break;
      case 'curly': s += [60, 74, 88, 102, 116, 130, 142].map((x, i) => `<circle cx="${x}" cy="${66 - Math.sin(i / 6 * Math.PI) * 12}" r="12" fill="${hc}"/>`).join(''); break;
      case 'bald': s += `<path d="M52 108 Q48 88 60 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M148 108 Q152 88 140 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="88" cy="68" rx="14" ry="6" fill="#fff" opacity="0.25"/>`; break;
      case 'combover': s += `<path d="M52 104 Q50 86 60 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M148 104 Q150 86 140 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/>` + [62, 68, 74].map(y => `<path d="M60 ${y + 14} Q100 ${y - 10} 142 ${y + 10}" stroke="${hc}" stroke-width="3" fill="none"/>`).join(''); break;
      case 'afro': if (p.hat && p.hat !== 'none') s += `<path d="M50 104 Q44 70 70 58 L130 58 Q156 70 150 104 Q146 80 100 74 Q54 80 50 104 Z" fill="${hc}"/>`; break;
      case 'buzz': s += `<path d="M55 96 Q53 58 100 56 Q147 58 145 96 Q140 76 100 74 Q60 76 55 96 Z" fill="${stub}"/>`; break;
      case 'gelled': s += `<path d="M53 98 Q50 60 70 56 L76 42 L84 56 L92 38 L100 54 L110 38 L116 55 L126 42 L130 58 Q150 62 147 98 Q140 74 100 72 Q60 74 53 98 Z" fill="${hc}"/>`; break;
      case 'bun': s += `<path d="M53 100 Q50 56 100 52 Q150 56 147 100 Q141 72 100 70 Q59 72 53 100 Z" fill="${hc}"/><circle cx="100" cy="44" r="16" fill="${hc}"/>`; break;
      case 'long': s += `<path d="M50 160 Q40 60 100 50 Q160 60 150 160 Q146 100 138 84 Q100 70 62 84 Q54 100 50 160 Z" fill="${hc}"/>`; break;
      case 'mohawk': s += `<path d="M55 96 Q53 60 100 58 Q147 60 145 96 Q140 78 100 76 Q60 78 55 96 Z" fill="${stub}"/><path d="M88 78 Q84 34 92 22 L96 34 L100 16 L104 34 L108 22 Q116 34 112 78 Q100 70 88 78 Z" fill="${hc}"/>`; break;
      case 'flattop': s += `<path d="M53 98 L57 54 Q100 44 143 54 L147 98 Q141 76 100 74 Q59 76 53 98 Z" fill="${hc}"/><path d="M57 54 Q100 44 143 54" fill="none" stroke="${shade(hc, 35)}" stroke-width="2"/>`; break;
      case 'topknot': s += `<path d="M55 96 Q53 60 100 58 Q147 60 145 96 Q140 78 100 76 Q60 78 55 96 Z" fill="${stub}"/><path d="M84 74 Q86 56 100 54 Q114 56 116 74 Q100 68 84 74 Z" fill="${hc}"/><circle cx="100" cy="44" r="11" fill="${hc}"/><rect x="92" y="52" width="16" height="4" rx="2" fill="${shade(hc, 45)}"/>`; break;
      case 'tonsure': s += `<path d="M52 104 Q46 66 72 58 Q84 70 100 72 Q116 70 128 58 Q154 66 148 104 Q144 84 130 76 Q100 88 70 76 Q56 84 52 104 Z" fill="${hc}"/>`; break;
      case 'undercut': s += `<path d="M55 98 Q54 70 62 62 L138 62 Q146 70 145 98 Q140 80 100 78 Q60 80 55 98 Z" fill="${stub}"/><path d="M60 70 Q58 44 104 42 Q146 44 142 66 Q120 58 96 64 Q76 68 60 70 Z" fill="${hc}"/>`; break;
      case 'braids': s += `<path d="M50 120 Q40 60 100 50 Q160 60 150 120 Q146 96 138 84 Q100 70 62 84 Q54 96 50 120 Z" fill="${hc}"/>` + [0, 1, 2, 3, 4].map(i => `<ellipse cx="${52 - (i % 2) * 3}" cy="${124 + i * 13}" rx="7" ry="8" fill="${hc}" stroke="${shade(hc, -30)}" stroke-width="0.8"/><ellipse cx="${148 + (i % 2) * 3}" cy="${124 + i * 13}" rx="7" ry="8" fill="${hc}" stroke="${shade(hc, -30)}" stroke-width="0.8"/>`).join(''); break;
      case 'curlyside': s += `<path d="M53 98 Q50 56 100 52 Q150 56 147 98 Q141 72 100 70 Q59 72 53 98 Z" fill="${hc}"/>` + [[56, 96], [58, 84], [144, 96], [142, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${hc}"/>`).join(''); break;
      case 'romantic': s += `<path d="M52 102 Q46 60 78 50 Q96 40 120 46 Q152 54 149 100 Q146 80 134 72 Q138 86 127 92 Q126 75 108 70 Q112 82 100 87 Q95 72 82 72 Q64 78 60 96 Q56 98 52 102 Z" fill="${hc}"/>` + [[53, 100], [147, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${hc}"/>`).join(''); break;
      case 'baldside': s += `<path d="M52 106 Q49 90 57 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M148 106 Q151 90 143 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/>`; break;
    }
    s += '</g>';
    return s;
  }

  function hat(p) {
    const c = p.hatColor || '#4b5320', d = shade(c, -35);
    switch (p.hat) {
      case 'schirm': { // фуражка с высокой тульёй
        const band = p.hatBand || '#2c3a30', metal = p.hatMetal || '#c9ccd0';
        return `<path d="M30 64 Q22 6 100 4 Q178 6 170 64 Q100 52 30 64 Z" fill="${c}"/><path d="M30 64 Q100 52 170 64" stroke="${metal}" stroke-width="1.5" fill="none"/>` +
          `<path d="M44 60 Q100 50 156 60 L154 76 Q100 68 46 76 Z" fill="${band}"/>` +
          `<path d="M52 74 Q100 82 148 74 Q146 86 100 90 Q54 86 52 74 Z" fill="#101010"/><path d="M64 79 Q100 85 136 79" stroke="#fff" stroke-opacity="0.2" stroke-width="2" fill="none"/>` +
          `<path d="M50 72 Q100 79 150 72" stroke="${metal}" stroke-width="2.4" fill="none"/><circle cx="51" cy="72" r="2.6" fill="${metal}"/><circle cx="149" cy="72" r="2.6" fill="${metal}"/>` +
          `<path d="M84 30 Q92 24 100 30 Q108 24 116 30 M100 28 V38" stroke="${metal}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="100" cy="41" r="2.4" fill="${metal}"/>` +
          (p.branch === 'ss' ? `<circle cx="100" cy="64" r="4.6" fill="#e8e8e4"/><circle cx="98.2" cy="63.4" r="1" fill="#111"/><circle cx="101.8" cy="63.4" r="1" fill="#111"/>` : `<circle cx="100" cy="64" r="4.6" fill="#101010"/><circle cx="100" cy="64" r="3" fill="#f4f1ea"/><circle cx="100" cy="64" r="1.5" fill="#b3141c"/><path d="M92 66 Q94 71 100 71 Q106 71 108 66" stroke="${metal}" stroke-width="1.4" fill="none"/>`);
      }
      case 'wizard': { // остроконечная шляпа с полями
        const band = p.hatBand || '#c9a640';
        return `<ellipse cx="100" cy="72" rx="80" ry="13" fill="${d}"/><path d="M56 70 Q74 34 98 6 Q104 0 112 10 Q104 12 108 22 Q126 44 144 70 Q100 60 56 70 Z" fill="${c}"/>` +
          `<path d="M60 64 Q100 54 140 64 L143 70 Q100 60 57 70 Z" fill="${band}"/>` +
          `<path d="M100 34 L102.2 39.5 L108 40 L103.6 43.6 L105 49.2 L100 46 L95 49.2 L96.4 43.6 L92 40 L97.8 39.5 Z" fill="${band}"/>`;
      }
      case 'hood': // капюшон
        return `<path d="M36 158 Q22 58 100 26 Q178 58 164 158 L146 158 Q152 98 100 72 Q48 98 54 158 Z" fill="${c}"/><path d="M54 158 Q48 98 100 72 Q152 98 146 158" fill="none" stroke="${d}" stroke-width="3"/>`;
      case 'crown': { // корона: зубцы, камни
        const m = p.hatMetal || '#d9b44a';
        return `<path d="M52 78 L48 38 L68 58 L82 28 L100 54 L118 28 L132 58 L152 38 L148 78 Q100 66 52 78 Z" fill="${m}" stroke="${shade(m, -45)}" stroke-width="1.5"/><path d="M52 78 Q100 66 148 78 L148 86 Q100 74 52 86 Z" fill="${shade(m, -22)}"/><circle cx="100" cy="66" r="5.5" fill="${p.gem || '#a8242a'}"/><circle cx="72" cy="71" r="3.6" fill="#3a6ea8"/><circle cx="128" cy="71" r="3.6" fill="#3a6ea8"/><circle cx="82" cy="27" r="3.2" fill="${m}"/><circle cx="118" cy="27" r="3.2" fill="${m}"/><circle cx="48" cy="37" r="2.6" fill="${m}"/><circle cx="152" cy="37" r="2.6" fill="${m}"/>`;
      }
      case 'peaked': { // фуражка с высокой тульёй и кокардой
        return `<path d="M44 74 Q46 22 100 18 Q154 22 156 74 Q100 62 44 74 Z" fill="${c}"/><path d="M48 76 Q100 62 152 76 L150 88 Q100 76 50 88 Z" fill="#8e2a2a"/><path d="M46 88 Q100 78 154 88 Q150 102 100 98 Q50 102 46 88 Z" fill="#12161a"/><path d="M100 34 L108 48 L100 60 L92 48 Z" fill="${p.hatMetal || '#c9a640'}"/><path d="M84 48 H116" stroke="${p.hatMetal || '#c9a640'}" stroke-width="3"/>`;
      }
      case 'mitre': { // высокая митра
        const m = p.hatMetal || '#c9a640';
        return `<path d="M56 82 Q52 30 100 -4 Q148 30 144 82 Q100 70 56 82 Z" fill="${c}" stroke="${m}" stroke-width="2.5"/><path d="M100 2 V74 M66 52 H134" stroke="${m}" stroke-width="4"/><path d="M56 82 Q100 70 144 82 L144 90 Q100 78 56 90 Z" fill="${m}"/>`;
      }
      case 'laurel': { // золотой лавровый венец: две ветви по вискам, сходятся надо лбом
        const m = p.hatMetal || '#c9a640'; let w = '';
        for (let i = 0; i < 6; i++) { const t = i / 5, x = 56 + t * 32, y = 96 - t * 38 - Math.sin(t * Math.PI) * 6, a = -70 + t * 45; w += `<ellipse cx="${x}" cy="${y}" rx="8" ry="3.6" fill="${m}" stroke="${shade(m, -45)}" stroke-width="0.6" transform="rotate(${a} ${x} ${y})"/><ellipse cx="${200 - x}" cy="${y}" rx="8" ry="3.6" fill="${m}" stroke="${shade(m, -45)}" stroke-width="0.6" transform="rotate(${-a} ${200 - x} ${y})"/>`; }
        return w + `<circle cx="100" cy="56" r="3.5" fill="${p.gem || '#8e2a2a'}" stroke="${m}" stroke-width="1.2"/>`;
      }
      case 'headset': // гарнитура связи: дужка, наушник, микрофон
        return `<path d="M50 106 Q44 50 100 46 Q156 50 150 106" fill="none" stroke="#2a2d33" stroke-width="5"/><rect x="41" y="98" width="14" height="26" rx="5" fill="#2a2d33"/><rect x="145" y="98" width="14" height="26" rx="5" fill="#2a2d33"/><path d="M48 122 Q52 148 80 150" fill="none" stroke="#2a2d33" stroke-width="3"/><circle cx="82" cy="150" r="4.5" fill="${p.gem || '#6fb5a8'}"/>`;
      case 'circlet': // обруч с камнем
        return `<path d="M50 80 Q100 62 150 80" stroke="${p.hatMetal || '#c9a640'}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M100 58 L106 69 L100 79 L94 69 Z" fill="${p.gem || '#7fe0c0'}" stroke="${p.hatMetal || '#c9a640'}" stroke-width="1.2"/>`;
      case 'gunbo': { // фуражка императорской армии: красный околыш, золотая звезда
        const star = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * 0.3} ${y - r * 0.3} L${x + r} ${y - r * 0.3} L${x + r * 0.45} ${y + r * 0.2} L${x + r * 0.65} ${y + r} L${x} ${y + r * 0.5} L${x - r * 0.65} ${y + r} L${x - r * 0.45} ${y + r * 0.2} L${x - r} ${y - r * 0.3} L${x - r * 0.3} ${y - r * 0.3} Z" fill="#c9a640"/>`;
        return `<path d="M40 68 Q34 26 100 22 Q166 26 160 68 Z" fill="${c}"/><path d="M46 58 Q100 48 154 58 L152 74 Q100 66 48 74 Z" fill="#b3141c"/>` +
          `<path d="M54 72 Q100 80 146 72 Q143 83 100 87 Q57 83 54 72 Z" fill="#141414"/><path d="M66 77 Q100 83 134 77" stroke="#fff" stroke-opacity="0.22" stroke-width="2" fill="none"/>` +
          `<path d="M52 70 Q100 77 148 70" stroke="#4a3320" stroke-width="2.6" fill="none"/>` + star(100, 44, 8);
      }
      case 'kaigunbo': { // фуражка флота: чёрный околыш, якорь в венке
        const metal = p.hatMetal || '#c9a640';
        return `<path d="M36 66 Q30 22 100 18 Q170 22 164 66 Q100 54 36 66 Z" fill="${c}"/><path d="M46 60 Q100 50 154 60 L152 74 Q100 66 48 74 Z" fill="#0b0d14"/>` +
          `<path d="M52 72 Q100 80 148 72 Q146 84 100 88 Q54 84 52 72 Z" fill="#101010"/><path d="M64 77 Q100 83 136 77" stroke="#fff" stroke-opacity="0.2" stroke-width="2" fill="none"/>` +
          `<path d="M50 70 Q100 77 150 70" stroke="${metal}" stroke-width="2.4" fill="none"/>` +
          `<path d="M100 34 V50 M94 39 H106 M92 45 Q100 55 108 45" stroke="${metal}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="100" cy="32" r="2.2" fill="${metal}"/>` +
          `<path d="M88 36 Q84 46 92 54 M112 36 Q116 46 108 54" stroke="${metal}" stroke-width="1.4" fill="none"/>`;
      }
      case 'eboshi': // высокая чёрная придворная шапка со шнурами
        return `<path d="M64 150 L60 70 M136 150 L140 70" stroke="#e8e2d0" stroke-width="1.6" fill="none"/>` +
          `<path d="M58 72 Q52 18 92 4 Q134 8 142 72 Q100 60 58 72 Z" fill="#131315"/><path d="M92 6 Q104 30 100 62" stroke="#2c2c30" stroke-width="2" fill="none"/>` +
          `<path d="M58 72 Q100 60 142 72 L141 62 Q100 50 59 62 Z" fill="#0a0a0b"/>`;
      case 'hachimaki': // белая повязка с красным кругом
        return `<path d="M46 68 Q100 50 154 68 L154 80 Q100 62 46 80 Z" fill="#f4f1ea"/><circle cx="100" cy="63" r="6.5" fill="#bc002d"/>` +
          `<path d="M152 72 L168 92 M152 76 L162 100" stroke="#f4f1ea" stroke-width="4" stroke-linecap="round"/>`;
      case 'fez70': // чёрная феска милиции: кисть на шнуре и золотая фасция
        return `<path d="M64 70 L72 20 L128 20 L136 70 Q100 62 64 70 Z" fill="${c}"/><ellipse cx="100" cy="20" rx="28" ry="4.5" fill="${shade(c, 18)}"/>` +
          `<path d="M100 19 Q130 20 140 54" stroke="#0a0a0b" stroke-width="2.2" fill="none"/><path d="M136 52 L144 52 L146 78 L134 78 Z" fill="#0a0a0b"/><path d="M137 60 V78 M140 60 V78 M143 60 V78" stroke="#2c2c30" stroke-width="0.8"/>` +
          FASCIO(100, 34, 1.5, p.hatMetal || '#c9a640');
      case 'bustina': { // пилотка королевской армии
        const metal = p.hatMetal || '#c9a640';
        return `<path d="M40 70 Q52 24 104 18 Q150 22 162 64 Q100 52 40 70 Z" fill="${c}"/><path d="M40 70 Q100 52 162 64 L160 54 Q100 40 46 58 Z" fill="${d}"/>` +
          `<path d="M58 44 Q100 22 150 40" stroke="${shade(c, -18)}" stroke-width="1.6" fill="none"/>` +
          `<path d="M92 40 Q96 34 100 40 Q104 34 108 40 M100 38 V46" stroke="${metal}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="100" cy="49" r="2" fill="${metal}"/>`;
      }
      case 'alpino': // фетровая шляпа альпийских стрелков с пером
        return `<path d="M58 14 L50 60" stroke="#101010" stroke-width="6" stroke-linecap="round"/><path d="M58 14 L52 44" stroke="#3a3a3a" stroke-width="1.6"/>` +
          `<ellipse cx="100" cy="70" rx="76" ry="12" fill="${d}"/><path d="M56 70 Q54 30 100 26 Q146 30 144 70 Q100 62 56 70 Z" fill="${c}"/>` +
          `<path d="M56 66 Q100 58 144 66 L144 58 Q100 50 56 58 Z" fill="${shade(c, -45)}"/><circle cx="52" cy="60" r="5.5" fill="#a3161d"/>` +
          `<path d="M92 42 Q96 36 100 42 Q104 36 108 42 M100 40 V48" stroke="${p.hatMetal || '#c9a640'}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
      case 'berretto': { // фуражка итальянского образца: золотой шнур, орёл с короной
        const band = p.hatBand || d, metal = p.hatMetal || '#c9a640';
        return `<path d="M36 66 Q30 18 100 14 Q170 18 164 66 Q100 54 36 66 Z" fill="${c}"/>` +
          `<path d="M46 62 Q100 52 154 62 L152 76 Q100 68 48 76 Z" fill="${band}"/>` +
          `<path d="M52 74 Q100 82 148 74 Q146 86 100 90 Q54 86 52 74 Z" fill="#101010"/><path d="M64 79 Q100 85 136 79" stroke="#fff" stroke-opacity="0.2" stroke-width="2" fill="none"/>` +
          `<path d="M50 72 Q100 79 150 72" stroke="${metal}" stroke-width="2.6" fill="none"/><circle cx="51" cy="72" r="2.6" fill="${metal}"/><circle cx="149" cy="72" r="2.6" fill="${metal}"/>` +
          `<path d="M86 42 Q93 34 100 42 Q107 34 114 42 M100 40 V52" stroke="${metal}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M95 30 L97 34 L100 31 L103 34 L105 30 L105 36 L95 36 Z" fill="${metal}"/><circle cx="100" cy="56" r="3" fill="${metal}"/>`;
      }
      case 'cap': return `<path d="M40 68 Q34 24 100 20 Q166 24 160 68 Z" fill="${c}"/><rect x="48" y="58" width="104" height="16" rx="3" fill="${d}"/>` +
        `<path d="M54 72 Q100 80 146 72 Q143 83 100 87 Q57 83 54 72 Z" fill="#141414"/><path d="M66 77 Q100 83 134 77" stroke="#fff" stroke-opacity="0.22" stroke-width="2" fill="none"/>` +
        `<path d="M52 69 Q100 76 148 69" stroke="#e2b33c" stroke-width="2.5" fill="none"/><circle cx="53" cy="69" r="3" fill="#e2b33c"/><circle cx="147" cy="69" r="3" fill="#e2b33c"/>` +
        `<circle cx="100" cy="46" r="11" fill="#e2b33c"/><path d="M100 38 L103 45 L110 45 L104 49 L106 56 L100 52 L94 56 L96 49 L90 45 L97 45 Z" fill="#b02020"/>`;
      case 'beret': return `<ellipse cx="94" cy="60" rx="60" ry="20" fill="${c}" transform="rotate(-9 94 60)"/><path d="M52 72 Q100 82 146 66" stroke="${d}" stroke-width="5" fill="none"/><circle cx="72" cy="58" r="7" fill="#e2b33c"/>`;
      case 'fedora': return `<ellipse cx="100" cy="70" rx="72" ry="13" fill="${d}"/><path d="M58 70 Q56 28 100 26 Q144 28 142 70 Z" fill="${c}"/><path d="M90 30 Q100 40 110 30" stroke="${d}" stroke-width="3" fill="none"/><rect x="58" y="58" width="84" height="10" fill="#1b1b1b"/>`;
      case 'kepi': return `<path d="M60 74 L66 28 L134 28 L140 74 Z" fill="${c}"/><ellipse cx="100" cy="28" rx="34" ry="6" fill="${shade(c, 20)}"/><rect x="60" y="62" width="80" height="12" fill="${d}"/>` +
        `<path d="M60 72 Q100 79 140 72 Q137 82 100 86 Q63 82 60 72 Z" fill="#141414"/><path d="M70 76 Q100 82 130 76" stroke="#fff" stroke-opacity="0.22" stroke-width="2" fill="none"/>` + [40, 48, 56].map(y => `<line x1="${64 + (56 - y) * 0.1}" y1="${y}" x2="${136 - (56 - y) * 0.1}" y2="${y}" stroke="#e2b33c" stroke-width="1.8"/>`).join('');
      case 'helmet': return `<path d="M40 80 Q42 20 100 20 Q158 20 160 80 Z" fill="${c}"/><ellipse cx="100" cy="80" rx="72" ry="11" fill="${d}"/><path d="M100 22 L100 78" stroke="${d}" stroke-width="2"/>`;
      case 'top': return `<ellipse cx="100" cy="66" rx="64" ry="10" fill="#111"/><rect x="66" y="8" width="68" height="58" rx="4" fill="#1a1a1a"/><rect x="66" y="50" width="68" height="9" fill="${c}"/>`;
      case 'fez': return `<path d="M68 66 L74 26 L126 26 L132 66 Z" fill="${c}"/><path d="M100 26 Q112 34 116 52" stroke="#1b1b1b" stroke-width="2" fill="none"/><circle cx="116" cy="54" r="4" fill="#1b1b1b"/>`;
      case 'turban': return `<path d="M48 82 Q44 34 100 30 Q156 34 152 82 Q130 70 100 72 Q70 70 48 82 Z" fill="${c}"/>` +
        [44, 56, 68].map(y => `<path d="M${54 + (68 - y) * 0.2} ${y + 6} Q100 ${y - 8} ${146 - (68 - y) * 0.2} ${y + 6}" stroke="${shade(c, -25)}" stroke-width="2" fill="none"/>`).join('');
      case 'keffiyeh': return `<path d="M40 156 Q30 84 48 62 Q100 22 152 62 Q170 84 160 156 L144 156 Q148 104 142 90 Q100 78 58 90 Q52 104 56 156 Z" fill="${c}"/>` +
        `<path d="M46 92 Q42 40 100 34 Q158 40 154 92 Q132 80 100 80 Q68 80 46 92 Z" fill="${c}"/><path d="M48 90 Q70 80 100 80 Q130 80 152 90" stroke="${shade(c, -25)}" stroke-width="2" fill="none"/>` +
        [64, 82, 100, 118, 136].map(x => `<path d="M${x} 44 L${x - 3} 78" stroke="${shade(c, -30)}" stroke-width="1.3" opacity="0.5"/>`).join('') +
        `<ellipse cx="100" cy="61" rx="52" ry="10" fill="none" stroke="#1a1a1a" stroke-width="5"/><ellipse cx="100" cy="54" rx="49" ry="9" fill="none" stroke="#1a1a1a" stroke-width="4"/>`;
      case 'hijab': return `<path fill-rule="evenodd" d="M42 156 Q32 58 100 40 Q168 58 158 156 Q152 194 100 196 Q48 194 42 156 Z M100 66 Q60 68 60 112 Q62 160 100 166 Q138 160 140 112 Q140 68 100 66 Z" fill="${c}"/><path d="M60 100 Q62 70 100 66 Q138 70 140 100" stroke="${shade(c, 25)}" stroke-width="2" fill="none" opacity="0.7"/>`;
      case 'tubeteika': return `<path d="M58 66 Q60 40 100 38 Q140 40 142 66 Z" fill="${c}"/><rect x="58" y="60" width="84" height="8" fill="${shade(c, -30)}"/>` +
        [72, 88, 104, 120].map(x => `<path d="M${x} 46 q4 6 0 12 q-4 -6 0 -12" fill="#f2ead6"/>`).join('');
      case 'baseball': return `<path d="M52 72 Q50 34 100 32 Q150 34 148 72 Z" fill="${c}"/><path d="M50 70 Q100 62 150 70 Q155 80 145 85 Q100 92 55 85 Q45 80 50 70 Z" fill="${d}"/><path d="M57 80 Q100 87 143 80" stroke="${shade(c, -60)}" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/><circle cx="100" cy="34" r="4" fill="${d}"/><path d="M84 52 h32" stroke="#f4f1ea" stroke-width="4" opacity="0.8"/>`;
      case 'bowler': return `<ellipse cx="100" cy="64" rx="62" ry="9" fill="${d}"/><path d="M62 64 Q60 22 100 22 Q140 22 138 64 Z" fill="${c}"/><rect x="62" y="54" width="76" height="8" fill="${shade(c, 25)}"/>`;
      case 'kamilavka': return `<path d="M60 70 L62 20 L138 20 L140 70 Z" fill="${c}"/><ellipse cx="100" cy="20" rx="40" ry="6" fill="${shade(c, 25)}"/><path d="M58 70 L58 96 Q50 120 44 150 L56 150 Q62 116 66 86 Z M142 70 L142 96 Q150 120 156 150 L144 150 Q138 116 134 86 Z" fill="${c}"/>`;
      case 'bicorne': return `<path d="M26 72 Q100 -6 174 72 Q100 50 26 72 Z" fill="${c}"/><path d="M30 70 Q100 52 170 70" stroke="#e2b33c" stroke-width="2.5" fill="none"/>` +
        (p.plume ? `<path d="M40 60 Q100 2 160 60" stroke="${p.plume}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.85" stroke-dasharray="2 3"/>` : '') + `<circle cx="128" cy="48" r="7" fill="#c1272d" stroke="#e2b33c" stroke-width="2"/><path d="M128 41 L128 70" stroke="#e2b33c" stroke-width="2"/>`;
      case 'shako': return `<path d="M62 72 L68 16 L132 16 L138 72 Z" fill="${c}"/><ellipse cx="100" cy="16" rx="32" ry="5" fill="${shade(c, 25)}"/><rect x="62" y="62" width="76" height="8" fill="${d}"/>` +
        `<path d="M58 70 Q100 80 142 70 Q138 82 100 86 Q62 82 58 70 Z" fill="#141414"/><path d="M90 34 L110 34 L106 54 L100 58 L94 54 Z" fill="#e2b33c"/><path d="M66 70 Q100 100 134 70" stroke="#e2b33c" stroke-width="1.6" fill="none"/>` +
        `<ellipse cx="100" cy="4" rx="6" ry="12" fill="${p.plume || '#c1272d'}"/>`;
      case 'pickelhaube': return `<path d="M48 74 Q46 26 100 24 Q154 26 152 74 Z" fill="${c}"/><path d="M50 70 Q100 82 150 70 Q146 82 100 88 Q54 82 50 70 Z" fill="${shade(c, 18)}"/>` +
        `<path d="M86 40 Q100 30 114 40 L110 60 L100 66 L90 60 Z" fill="#e2b33c"/><path d="M94 26 L100 0 L106 26 Z" fill="#e2b33c"/><ellipse cx="100" cy="26" rx="10" ry="4" fill="#c99a26"/>`;
      case 'slouch': return `<ellipse cx="100" cy="68" rx="80" ry="14" fill="${d}" transform="rotate(-5 100 68)"/><path d="M60 68 Q58 28 100 26 Q142 28 140 68 Z" fill="${c}"/><rect x="60" y="56" width="80" height="8" fill="#1b1b1b"/>` +
        `<path d="M132 58 Q154 30 176 10" stroke="${p.plume || '#c1272d'}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M136 54 Q156 30 172 16" stroke="#f4f1ea" stroke-width="1.4" fill="none" opacity="0.6"/>`;
      case 'gaucho': return `<ellipse cx="100" cy="66" rx="82" ry="12" fill="${d}"/><path d="M64 66 L68 32 Q100 28 132 32 L136 66 Z" fill="${c}"/><rect x="64" y="56" width="72" height="8" fill="${p.trim || '#7a1f1f'}"/>`;
      case 'zucchetto': return `<path d="M72 64 Q74 45 100 44 Q126 45 128 64 Q100 57 72 64 Z" fill="${c}"/><circle cx="100" cy="45" r="2.5" fill="${shade(c, -30)}"/>`;
      case 'bonnet': return `<path d="M38 124 Q30 38 100 28 Q170 38 162 124 Q152 70 100 64 Q48 70 38 124 Z" fill="${c}"/><path d="M44 112 Q46 52 100 46 Q154 52 156 112" stroke="${shade(c, 30)}" stroke-width="2" fill="none" opacity="0.7"/>` +
        `<path d="M50 118 Q64 168 100 178 M150 118 Q136 168 100 178" stroke="${p.trim || '#f4f1ea'}" stroke-width="4" fill="none"/><ellipse cx="90" cy="180" rx="9" ry="5" fill="${p.trim || '#f4f1ea'}"/><ellipse cx="110" cy="180" rx="9" ry="5" fill="${p.trim || '#f4f1ea'}"/>`;
      case 'phrygian': return `<path d="M52 78 Q50 36 100 30 Q150 34 148 78 Z" fill="${c}"/><path d="M98 32 Q132 14 154 40 Q160 58 142 60 Q140 44 118 42 Z" fill="${shade(c, -15)}"/>` +
        `<circle cx="68" cy="64" r="8" fill="#1f4e8c"/><circle cx="68" cy="64" r="5.4" fill="#f4f1ea"/><circle cx="68" cy="64" r="2.8" fill="#c1272d"/>`;
      case 'studentcap': return `<path d="M66 64 L68 42 Q100 36 132 42 L134 64 Z" fill="${c}"/><rect x="66" y="52" width="68" height="4" fill="#111"/><rect x="66" y="56" width="68" height="4" fill="#c1272d"/><rect x="66" y="60" width="68" height="4" fill="#d6a63a"/>` +
        `<path d="M64 62 Q100 70 136 62 Q132 72 100 76 Q68 72 64 62 Z" fill="#141414"/>`;
      case 'boater': return `<ellipse cx="100" cy="64" rx="68" ry="11" fill="${c}"/><path d="M64 64 L66 40 Q100 34 134 40 L136 64 Z" fill="${c}"/><ellipse cx="100" cy="40" rx="34" ry="5" fill="${shade(c, 15)}"/><rect x="64" y="52" width="72" height="9" fill="${p.trim || '#1a1a1a'}"/>` +
        [70, 82, 94, 106, 118, 130].map(x => `<path d="M${x} 42 L${x + 1} 62" stroke="${shade(c, -25)}" stroke-width="0.8" opacity="0.5"/>`).join('');
      case 'lamahat': return `<path d="M52 76 Q50 50 100 44 Q150 50 148 76 Z" fill="${c}"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${62 + i * 9.5} 52 Q${66 + i * 9.5} 14 ${100} 6" stroke="${shade(c, i % 2 ? -18 : 10)}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('') + `<path d="M52 76 Q100 66 148 76" stroke="${shade(c, -30)}" stroke-width="3" fill="none"/>`;
      case 'furhat': return `<path d="M54 74 Q50 34 100 30 Q150 34 146 74 Z" fill="${c}"/><path d="M44 80 Q42 62 60 60 Q100 52 140 60 Q158 62 156 80 Q130 72 100 72 Q70 72 44 80 Z" fill="#e8dcc0"/>` +
        Array.from({ length: 10 }, (_, i) => `<path d="M${50 + i * 11} 66 l3 10" stroke="#b8a888" stroke-width="1.4"/>`).join('') + `<circle cx="100" cy="30" r="5" fill="#c1272d"/>`;
      case 'flatcap': return `<path d="M50 74 Q46 38 100 36 Q154 38 158 70 Q120 66 50 74 Z" fill="${c}"/><path d="M48 74 Q120 64 164 72 Q150 82 108 82 Z" fill="${d}"/>`;
      default: return '';
    }
  }

  function extras(p) {
    let s = '';
    if (p.cigar) s += `<g transform="rotate(12 120 146)"><rect x="112" y="142" width="38" height="8" rx="3" fill="#6b3e1e"/><rect x="118" y="142" width="6" height="8" fill="#c0392b"/><circle cx="151" cy="146" r="4" fill="#ff6a00"/></g><path d="M160 136 Q168 124 160 114 Q152 104 162 92" stroke="#bbb" stroke-width="2.5" fill="none" opacity="0.7"/>`;
    if (p.tusks) s += `<path d="M86 152 L84 138 L92 149 Z" fill="#f4f1ea" stroke="#8a8a7a" stroke-width="0.8"/><path d="M114 152 L116 138 L108 149 Z" fill="#f4f1ea" stroke="#8a8a7a" stroke-width="0.8"/>`;
    if (p.sweat) s += `<path d="M150 74 Q156 86 150 92 Q144 86 150 74 Z" fill="#8fd3ff" stroke="#3a8ec2" stroke-width="1"/>`;
    if (p.aug === 'scar') s += `<path d="M73 82 L78.5 96 M86 117 L92 132" fill="none" stroke="#8a3a34" stroke-width="2.6" stroke-linecap="round"/><path d="M71.5 88 L79 85 M74 94 L81.5 91 M84 121 L91 118 M86.5 127 L93.5 124" stroke="#8a3a34" stroke-width="1.4" stroke-linecap="round"/>`;
    if (p.aug === 'mask') s += `<path d="M53 122 L78 136 M147 122 L122 136" stroke="#3a3d44" stroke-width="3"/><path d="M78 128 Q100 116 122 128 L120 158 Q100 168 80 158 Z" fill="#2a2d33" stroke="#8a8f96" stroke-width="2"/><circle cx="87" cy="148" r="6.5" fill="#1a1c20" stroke="#8a8f96" stroke-width="1.6"/><circle cx="113" cy="148" r="6.5" fill="#1a1c20" stroke="#8a8f96" stroke-width="1.6"/><path d="M94 132 H106 M95 137 H105" stroke="#8a8f96" stroke-width="1.4"/>`;
    if (p.aug === 'cables') s += `<path d="M141 86 Q160 110 150 168 M137 80 Q168 104 158 172 M144 94 Q154 124 143 164" fill="none" stroke="#6a6f76" stroke-width="3" stroke-linecap="round"/><circle cx="140" cy="85" r="4.5" fill="#2a2d33" stroke="#8a8f96" stroke-width="1.6"/><circle cx="136" cy="78" r="3.5" fill="#2a2d33" stroke="#8a8f96" stroke-width="1.4"/><circle cx="140" cy="85" r="1.5" fill="#c1272d"/>`;
    if (p.aug === 'code') s += `<path d="M64 124 V134 M67 124 V134 M69.5 124 V134 M73 124 V134 M75 124 V134 M78.5 124 V134 M81 124 V134" stroke="#2a2d33" stroke-width="1.3" opacity="0.8"/><path d="M71 124 V134" stroke="#2a2d33" stroke-width="2.2" opacity="0.8"/>`;
    if (p.bionic || p.aug === 'eye') s += `<circle cx="117" cy="106" r="11" fill="#2a2d33" stroke="#8a8f96" stroke-width="2"/><circle cx="117" cy="106" r="5" fill="#c1272d"/><circle cx="115" cy="104" r="1.6" fill="#ffb0a0"/><path d="M128 106 Q140 104 148 112" fill="none" stroke="#8a8f96" stroke-width="2.5"/>`;
    if (p.antennae) s += `<path d="M84 62 Q78 44 72 32 M116 62 Q122 44 128 32" fill="none" stroke="${shade(p.skin || '#e8c39e', -25)}" stroke-width="4" stroke-linecap="round"/><circle cx="72" cy="31" r="5" fill="${p.skin || '#e8c39e'}" stroke="${shade(p.skin || '#e8c39e', -35)}" stroke-width="1"/><circle cx="128" cy="31" r="5" fill="${p.skin || '#e8c39e'}" stroke="${shade(p.skin || '#e8c39e', -35)}" stroke-width="1"/>`;
    if (p.earring && !['hijab', 'keffiyeh', 'kamilavka', 'helmet'].includes(p.hat)) s += `<circle cx="51" cy="128" r="4" fill="#e2b33c"/><circle cx="149" cy="128" r="4" fill="#e2b33c"/>`;
    if (p.bluetooth) s += `<rect x="146" y="104" width="9" height="18" rx="4" fill="#2a2f36" stroke="#7fd4ff" stroke-width="1"/><path d="M150 122 Q146 134 132 138" stroke="#2a2f36" stroke-width="2.5" fill="none"/><circle cx="151" cy="108" r="1.6" fill="#39e"/>`;
    if (p.earpiece) s += `<circle cx="149" cy="114" r="3.5" fill="#d8d8d8"/><path d="M149 118 Q156 150 140 186" stroke="#d8d8d8" stroke-width="1.4" fill="none"/>`;
    if (p.pipe) s += `<path d="M110 146 L134 156 L134 170 Q146 174 148 160 L146 150 L136 152 L112 142 Z" fill="#5a3a1a"/>`;
    return s;
  }

  // В 1840-х все портреты одеты по моде эпохи: пиджаки — во фраки, мундиры — со стоячим воротником, современные шляпы и очки — в старинные
  const P48 = {
    outfit: { suit: 'frock', suit2000: 'frock', mao: 'frock', guayabera: 'frock', military: 'uniform48', hoodie: 'blouse', tracksuit: 'blouse', polo: 'blouse' },
    hat: { cap: 'shako', beret: 'slouch', fedora: 'slouch', baseball: 'none', helmet: 'pickelhaube', bowler: 'top', keffiyeh: 'none', tubeteika: 'none', turban: 'none', hijab: 'bonnet', kamilavka: 'none', fez: 'none' },
    glasses: { aviator: 'none', sport: 'none', rimless: 'pince', square: 'round' },
    hair: { buzz: 'short', gelled: 'romantic' },
  };
  function period48(p0) {
    const p = { ...p0, bluetooth: false, earpiece: false };
    if (p.earring && p.mustache === 'none' && ['suit', 'suit2000', 'hoodie', 'polo', 'tracksuit', 'military'].includes(p.outfit)) { p.outfit = 'gown'; p.trim = p.trim || '#f4f1ea'; }
    for (const k of Object.keys(P48)) if (P48[k][p[k]]) p[k] = P48[k][p[k]];
    if (p.outfit === 'uniform48' && !p.collar) p.collar = '#c1272d';
    return p;
  }
  // В 1980-х — без моноклей, цилиндров и котелков: авиаторы, большие очки, фуражки и бейсболки
  const P80 = {
    hat: { top: 'none', bowler: 'none', kepi: 'cap', helmet: 'cap', fez: 'none', fedora: 'none', bicorne: 'cap', shako: 'cap', pickelhaube: 'cap', slouch: 'none', bonnet: 'none' },
    glasses: { monocle: 'aviator', pince: 'square', rimless: 'square' },
    mustache: { handlebar: 'thick', waxed: 'thick' },
    outfit: { suit2000: 'suit', frock: 'suit', uniform48: 'military', gown: 'suit', blouse: 'tracksuit' },
    beard: { sideburns: 'none', chinstrap: 'full', imperial: 'goatee' },
    hair: { romantic: 'curly' },
  };
  function period80(p0) {
    const p = { ...p0, bluetooth: false, earpiece: false };
    for (const k of Object.keys(P80)) if (P80[k][p[k]]) p[k] = P80[k][p[k]];
    if (p.outfit === 'suit' && p.earring && p.tie && p.tie !== 'none' && p.mustache === 'none') p.tie = 'none';
    return p;
  }
  // 1905–1914: эдвардианские костюмы и канотье вместо толстовок и бейсболок
  const P05 = {
    outfit: { suit2000: 'suit', hoodie: 'blouse', tracksuit: 'blouse', polo: 'blouse', guayabera: 'suit', mao: 'suit' },
    hat: { baseball: 'flatcap', tubeteika: 'fez' },
    glasses: { aviator: 'none', sport: 'none', rimless: 'pince', square: 'round' },
    hair: { buzz: 'short', gelled: 'slick' },
  };
  function period05(p0) {
    const p = { ...p0, bluetooth: false, earpiece: false };
    if (p.earring && p.mustache === 'none' && ['suit', 'suit2000', 'hoodie', 'polo', 'tracksuit'].includes(p.outfit)) { p.outfit = 'gown'; p.trim = p.trim || '#f4f1ea'; }
    for (const k of Object.keys(P05)) if (P05[k][p[k]]) p[k] = P05[k][p[k]];
    return p;
  }
  function svg(p, opts = {}) {
    const era = typeof document !== 'undefined' && document.body ? document.body.dataset.era : '';
    if (era === '1848') p = period48(p);
    else if (era === '1980' || (era || '').startsWith('dark70')) p = period80(p);
    else if (era === '1905') p = period05(p);
    const bg = opts.bg ? `<rect width="200" height="240" fill="${opts.bg}"/>` : '';
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || 'портрет'}">${bg}${body(p)}${head(p)}<g transform="${hatFit(p.face)}">${hat(p)}</g>${extras(p)}</svg>`;
  }

  return { svg, shade };
})();
