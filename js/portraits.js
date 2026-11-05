// Генератор карикатурных SVG-портретов.
// Портрет собирается из деталей: лицо, причёска, головной убор, усы, очки, мундир, медали.
const Portrait = (() => {
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

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
      default: // military
        s += `<path d="M80 186 Q100 199 120 186 L122 197 Q100 211 78 197 Z" fill="${d}"/>`;
        s += [212, 226].map(y => `<circle cx="100" cy="${y}" r="3" fill="#e2b33c"/>`).join('');
        s += `<ellipse cx="40" cy="203" rx="24" ry="7" fill="#e2b33c" transform="rotate(14 40 203)"/><ellipse cx="160" cy="203" rx="24" ry="7" fill="#e2b33c" transform="rotate(-14 160 203)"/>`;
        s += [22, 30, 38, 46, 54].map(x => `<line x1="${x}" y1="${200 + (x - 22) * 0.25}" x2="${x - 2}" y2="${212 + (x - 22) * 0.25}" stroke="#c99a26" stroke-width="2"/>`).join('');
        s += [146, 154, 162, 170, 178].map(x => `<line x1="${x}" y1="${208 - (x - 146) * 0.25}" x2="${x + 2}" y2="${220 - (x - 146) * 0.25}" stroke="#c99a26" stroke-width="2"/>`).join('');
        s += `<path d="M64 200 Q60 218 70 236" fill="none" stroke="#e2b33c" stroke-width="2.5"/>`; // аксельбант
    }
    if (p.sash) s += `<path d="M48 198 L64 192 L150 240 L120 240 Z" fill="${p.sash}" opacity="0.92"/><path d="M56 195 L60 193 L136 240 L130 240 Z" fill="#f0c419" opacity="0.7"/>`;
    const n = Math.min(p.medals || 0, 16);
    for (let i = 0; i < n; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 118 + col * 11, y = 204 + row * 12;
      const mc = MEDAL_COLORS[(i * 7 + row) % MEDAL_COLORS.length];
      s += `<rect x="${x - 4}" y="${y - 3}" width="8" height="4" fill="${mc}"/><circle cx="${x}" cy="${y + 5}" r="3.6" fill="#e2b33c" stroke="#9a7417" stroke-width="0.8"/>`;
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
    switch (p.face) {
      case 'round': s += `<ellipse cx="100" cy="112" rx="52" ry="51" fill="${sk}"/>`; break;
      case 'square': s += `<path d="M53 82 Q53 56 100 56 Q147 56 147 82 L147 130 Q147 166 100 168 Q53 166 53 130 Z" fill="${sk}"/>`; break;
      case 'long': s += `<ellipse cx="100" cy="108" rx="42" ry="60" fill="${sk}"/>`; break;
      default: s += `<ellipse cx="100" cy="110" rx="47" ry="56" fill="${sk}"/>`;
    }
    if (p.blush) s += `<ellipse cx="74" cy="130" rx="9" ry="5" fill="#e06666" opacity="0.28"/><ellipse cx="126" cy="130" rx="9" ry="5" fill="#e06666" opacity="0.28"/>`;
    if (p.beard === 'full') s += `<path d="M54 118 Q56 176 100 178 Q144 176 146 118 Q142 152 122 154 Q100 160 78 154 Q58 152 54 118 Z" fill="${p.hairColor}"/>`;
    // глаза
    if (p.eyes === 'sleepy') {
      s += `<path d="M76 108 Q83 112 90 108" stroke="#1d1d1d" stroke-width="3" fill="none"/><path d="M110 108 Q117 112 124 108" stroke="#1d1d1d" stroke-width="3" fill="none"/>`;
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
    const hc = p.hairColor;
    switch (p.mustache) {
      case 'thick': s += `<path d="M76 137 Q89 125 100 132 Q111 125 124 137 Q112 142 100 137 Q88 142 76 137 Z" fill="${hc}"/>`; break;
      case 'walrus': s += `<path d="M72 150 Q78 124 100 129 Q122 124 128 150 Q115 139 100 141 Q85 139 72 150 Z" fill="${hc}"/>`; break;
      case 'pencil': s += `<path d="M86 134 Q100 129 114 134" fill="none" stroke="${hc}" stroke-width="2.5"/>`; break;
      case 'handlebar': s += `<path d="M74 126 Q70 137 80 139 Q90 130 100 134 Q110 130 120 139 Q130 137 126 126 Q120 136 100 130 Q80 136 74 126 Z" fill="${hc}"/>`; break;
    }
    if (p.beard === 'goatee') s += `<path d="M90 152 Q100 172 110 152 Q100 158 90 152 Z" fill="${hc}"/>`;
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
      case 'monocle':
        s += `<circle cx="117" cy="106" r="12" fill="#fff" fill-opacity="0.15" stroke="#c9a640" stroke-width="2.6"/><path d="M129 108 Q140 140 128 170" fill="none" stroke="#c9a640" stroke-width="1.4"/>`;
        break;
    }
    // причёска: рисуется для овального лица и подгоняется под форму головы
    const hatOn = p.hat && p.hat !== 'none';
    let hair = p.hair;
    if (hatOn) {
      if (['keffiyeh', 'hijab'].includes(p.hat) || (p.hat === 'helmet' && hair !== 'long')) hair = 'none';
      else if (hair === 'curly') hair = 'curlyside';
      else if (['bun', 'gelled', 'slick'].includes(hair)) hair = 'short';
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
      case 'buzz': s += `<path d="M55 96 Q53 58 100 56 Q147 58 145 96 Q140 76 100 74 Q60 76 55 96 Z" fill="${hc}" opacity="0.75"/>`; break;
      case 'gelled': s += `<path d="M53 98 Q50 60 70 56 L76 42 L84 56 L92 38 L100 54 L110 38 L116 55 L126 42 L130 58 Q150 62 147 98 Q140 74 100 72 Q60 74 53 98 Z" fill="${hc}"/>`; break;
      case 'bun': s += `<path d="M53 100 Q50 56 100 52 Q150 56 147 100 Q141 72 100 70 Q59 72 53 100 Z" fill="${hc}"/><circle cx="100" cy="44" r="16" fill="${hc}"/>`; break;
      case 'long': s += `<path d="M50 160 Q40 60 100 50 Q160 60 150 160 Q146 100 138 84 Q100 70 62 84 Q54 100 50 160 Z" fill="${hc}"/>`; break;
      case 'curlyside': s += `<path d="M53 98 Q50 56 100 52 Q150 56 147 98 Q141 72 100 70 Q59 72 53 98 Z" fill="${hc}"/>` + [[56, 96], [58, 84], [144, 96], [142, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${hc}"/>`).join(''); break;
      case 'baldside': s += `<path d="M52 106 Q49 90 57 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M148 106 Q151 90 143 80" stroke="${hc}" stroke-width="9" fill="none" stroke-linecap="round"/>`; break;
    }
    s += '</g>';
    return s;
  }

  function hat(p) {
    const c = p.hatColor || '#4b5320', d = shade(c, -35);
    switch (p.hat) {
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
      case 'flatcap': return `<path d="M50 74 Q46 38 100 36 Q154 38 158 70 Q120 66 50 74 Z" fill="${c}"/><path d="M48 74 Q120 64 164 72 Q150 82 108 82 Z" fill="${d}"/>`;
      default: return '';
    }
  }

  function extras(p) {
    let s = '';
    if (p.cigar) s += `<g transform="rotate(12 120 146)"><rect x="112" y="142" width="38" height="8" rx="3" fill="#6b3e1e"/><rect x="118" y="142" width="6" height="8" fill="#c0392b"/><circle cx="151" cy="146" r="4" fill="#ff6a00"/></g><path d="M160 136 Q168 124 160 114 Q152 104 162 92" stroke="#bbb" stroke-width="2.5" fill="none" opacity="0.7"/>`;
    if (p.sweat) s += `<path d="M150 74 Q156 86 150 92 Q144 86 150 74 Z" fill="#8fd3ff" stroke="#3a8ec2" stroke-width="1"/>`;
    if (p.earring && !['hijab', 'keffiyeh', 'kamilavka', 'helmet'].includes(p.hat)) s += `<circle cx="51" cy="128" r="4" fill="#e2b33c"/><circle cx="149" cy="128" r="4" fill="#e2b33c"/>`;
    if (p.bluetooth) s += `<rect x="146" y="104" width="9" height="18" rx="4" fill="#2a2f36" stroke="#7fd4ff" stroke-width="1"/><path d="M150 122 Q146 134 132 138" stroke="#2a2f36" stroke-width="2.5" fill="none"/><circle cx="151" cy="108" r="1.6" fill="#39e"/>`;
    if (p.earpiece) s += `<circle cx="149" cy="114" r="3.5" fill="#d8d8d8"/><path d="M149 118 Q156 150 140 186" stroke="#d8d8d8" stroke-width="1.4" fill="none"/>`;
    if (p.pipe) s += `<path d="M110 146 L134 156 L134 170 Q146 174 148 160 L146 150 L136 152 L112 142 Z" fill="#5a3a1a"/>`;
    return s;
  }

  function svg(p, opts = {}) {
    const bg = opts.bg ? `<rect width="200" height="240" fill="${opts.bg}"/>` : '';
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || 'портрет'}">${bg}${body(p)}${head(p)}<g transform="${hatFit(p.face)}">${hat(p)}</g>${extras(p)}</svg>`;
  }

  return { svg, shade };
})();
