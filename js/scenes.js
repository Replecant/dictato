// Фоны сцен визуальной новеллы — простые SVG-декорации с региональной палитрой.
const Scenes = (() => {
  const PAL = {
    latam: { sky1: '#f7c46c', sky2: '#e0704a', ground: '#7a5230', wall: '#e8c9a0', accent: '#0b6e4f', roof: '#b5532d', plant: '#2f7a3a' },
    asia: { sky1: '#bfe3d0', sky2: '#4f9a8a', ground: '#4d6b3a', wall: '#e6dcc0', accent: '#c1272d', roof: '#8e2a2a', plant: '#2e6b44' },
    africa: { sky1: '#fbd37a', sky2: '#d9822b', ground: '#9a5b2a', wall: '#ead2a8', accent: '#1e7a3c', roof: '#6b3e1e', plant: '#5d7a2a' },
    latam30: { sky1: '#f3d9a4', sky2: '#c9774a', ground: '#7a5a3a', wall: '#ecd8b4', accent: '#7a1f3d', roof: '#a4492d', plant: '#3d6b3a' },
    europe30: { sky1: '#c9d4dc', sky2: '#7a8a9c', ground: '#5a5a3c', wall: '#e4dcc8', accent: '#1f4e8c', roof: '#7a3a2a', plant: '#3a5a3a' },
    asia30: { sky1: '#f2e2a8', sky2: '#9ab07a', ground: '#5a6a3a', wall: '#ece0c0', accent: '#7a1f3d', roof: '#a0322a', plant: '#3a6a3a' },
  };
  const W = 800, H = 450;

  let STYLE = 'latam';
  function firs(p, n, y, scale) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = 40 + i * (W / n) + (i % 2) * 30;
      const k = scale * (0.8 + (i % 3) * 0.15);
      s += `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-4" y="-20" width="8" height="20" fill="#3a2a1a"/>` +
        [0, 1, 2, 3].map(j => `<path d="M${-40 + j * 8} ${-20 - j * 30} L0 ${-70 - j * 30} L${40 - j * 8} ${-20 - j * 30} Z" fill="${j % 2 ? '#2f4a32' : p.plant}"/>`).join('') + '</g>';
    }
    return s;
  }
  function palms(p, n, y, scale = 1) {
    if (STYLE === 'europe') return firs(p, n, y, scale);
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = 40 + i * (W / n) + (i % 2) * 30;
      const k = scale * (0.8 + (i % 3) * 0.15);
      s += `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 0 Q8 -60 4 -120" stroke="#4a3520" stroke-width="9" fill="none"/>` +
        [-60, -25, 15, 50, 85].map(a => `<path d="M4 -120 q${Math.cos(a * Math.PI / 180) * 30} ${-20 + Math.sin(a * Math.PI / 180) * 10} ${Math.cos(a * Math.PI / 180) * 70} ${30}" stroke="${p.plant}" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('') + '</g>';
    }
    return s;
  }
  function crowd(color, y, n = 40, signs = true) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = (i / n) * W + ((i * 37) % 17);
      const h = 34 + ((i * 13) % 14);
      s += `<circle cx="${x}" cy="${y - h}" r="9" fill="${color}"/><rect x="${x - 10}" y="${y - h + 8}" width="20" height="${h}" rx="8" fill="${color}"/>`;
      if (signs && i % 6 === 2) s += `<line x1="${x + 8}" y1="${y - h}" x2="${x + 8}" y2="${y - h - 40}" stroke="${color}" stroke-width="3"/><rect x="${x - 12}" y="${y - h - 64}" width="42" height="26" fill="#f2ead6" stroke="${color}" stroke-width="2"/><path d="M${x - 6} ${y - h - 52} h30" stroke="#a82424" stroke-width="3"/>`;
    }
    return s;
  }
  function tank(x, y, k, c = '#2f3524') {
    return `<g transform="translate(${x} ${y}) scale(${k})"><rect x="0" y="-30" width="140" height="30" rx="14" fill="${c}"/><rect x="25" y="-55" width="80" height="28" rx="8" fill="${c}"/><rect x="100" y="-48" width="80" height="8" fill="${c}"/>` +
      [15, 40, 65, 90, 115].map(cx => `<circle cx="${cx}" cy="-12" r="9" fill="#161a10"/>`).join('') + '</g>';
  }
  function sky(p, id, night = false) {
    return night
      ? `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#2a2148"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>` +
        Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 97) % W}" cy="${(i * 53) % 220}" r="${i % 5 === 0 ? 1.8 : 1}" fill="#fff" opacity="${0.4 + (i % 3) * 0.2}"/>`).join('') + `<circle cx="660" cy="80" r="34" fill="#f4ecd0"/><circle cx="676" cy="70" r="30" fill="#0f1430"/>`
      : `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky1}"/><stop offset="1" stop-color="${p.sky2}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  }

  const builders = {
    office(p, r) {
      return `<rect width="${W}" height="${H}" fill="#5a2f1c"/>` +
        Array.from({ length: 10 }, (_, i) => `<rect x="${i * 80 + 4}" y="0" width="72" height="${H}" fill="#6b3a22"/><rect x="${i * 80 + 10}" y="300" width="60" height="120" fill="none" stroke="#4a2614" stroke-width="3"/>`).join('') +
        `<rect x="430" y="40" width="300" height="230" fill="#3a1d10"/><g><svg x="440" y="50" width="280" height="210" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${sky(p, 'os')}${STYLE === 'asia' ? `<path d="M0 330 L200 180 L360 300 L520 160 L800 320 L800 450 L0 450 Z" fill="#3d6e5a"/>` : ''}${palms(p, 5, 420, 1.4)}</svg></g>` +
        `<path d="M580 40 V270 M430 155 H730" stroke="#3a1d10" stroke-width="10"/>` +
        `<rect x="110" y="60" width="150" height="190" fill="#e2b33c"/><rect x="122" y="72" width="126" height="166" fill="#2a1a12"/><text x="185" y="166" text-anchor="middle" font-size="64" fill="#e2b33c" opacity="0.5">★</text>` +
        `<line x1="330" y1="40" x2="330" y2="330" stroke="#c9a640" stroke-width="5"/><circle cx="330" cy="38" r="7" fill="#e2b33c"/><g transform="translate(333 50)"><svg width="90" height="60" viewBox="0 0 30 20">${REGIONS[r].flag}</svg></g>` +
        `<rect x="0" y="360" width="${W}" height="90" fill="#3a1d10"/><rect x="60" y="340" width="680" height="24" rx="4" fill="#7a4428"/>`;
    },
    palace(p, r) {
      return `<rect width="${W}" height="${H}" fill="#7a1f24"/>` +
        [80, 240, 560, 720].map(x => `<rect x="${x - 24}" y="0" width="48" height="${H}" fill="#e8d9b0"/><rect x="${x - 32}" y="0" width="64" height="26" fill="#d4c290"/><rect x="${x - 32}" y="${H - 40}" width="64" height="40" fill="#d4c290"/>`).join('') +
        `<path d="M400 0 V60" stroke="#c9a640" stroke-width="3"/><ellipse cx="400" cy="80" rx="80" ry="22" fill="#e2b33c" opacity="0.9"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${330 + i * 17.5} 92 v24" stroke="#fff6c8" stroke-width="3"/><circle cx="${330 + i * 17.5}" cy="120" r="4" fill="#fff6c8"/>`).join('') +
        `<path d="M300 ${H} L360 300 L440 300 L500 ${H} Z" fill="#a82424"/><rect x="0" y="380" width="${W}" height="70" fill="#4a1216" opacity="0.6"/>`;
    },
    street(p, r) {
      return sky(p, 'ss') + palms(p, 4, 300, 0.9) +
        Array.from({ length: 7 }, (_, i) => { const x = i * 120 - 20, h = 150 + (i * 47) % 80; return `<rect x="${x}" y="${330 - h}" width="110" height="${h}" fill="${i % 2 ? p.wall : '#d9b88a'}"/><rect x="${x}" y="${330 - h - 14}" width="110" height="14" fill="${p.roof}"/>` + Array.from({ length: 4 }, (_, j) => `<rect x="${x + 14 + (j % 2) * 50}" y="${330 - h + 24 + Math.floor(j / 2) * 50}" width="28" height="34" fill="#4a3a2a"/>`).join(''); }).join('') +
        `<rect y="330" width="${W}" height="120" fill="#8a7a66"/>` + crowd('#2a2018', 450, 46);
    },
    square(p, r) {
      return sky(p, 'sq') + `<rect y="300" width="${W}" height="150" fill="#b8a07a"/>` +
        `<rect x="250" y="150" width="300" height="150" fill="${p.wall}"/><path d="M230 150 L400 70 L570 150 Z" fill="${p.roof}"/>` + [280, 340, 400, 460, 520].map(x => `<rect x="${x - 8}" y="170" width="16" height="130" fill="#f2ead6"/>`).join('') +
        `<rect x="372" y="120" width="56" height="10" fill="#c9a640"/><g transform="translate(374 84)"><svg width="52" height="35" viewBox="0 0 30 20">${REGIONS[r].flag}</svg></g>` +
        `<rect x="385" y="230" width="30" height="70" fill="#7a6a50"/><circle cx="400" cy="216" r="16" fill="#7a6a50"/>` + crowd('#3a2a20', 450, 52);
    },
    village(p, r) {
      return sky(p, 'sv') + `<circle cx="640" cy="90" r="46" fill="#fff3b0"/>` +
        `<path d="M0 260 Q200 200 400 250 T800 230 L800 450 L0 450 Z" fill="${p.plant}"/><path d="M0 320 Q300 280 800 330 L800 450 L0 450 Z" fill="${p.ground}"/>` +
        [120, 300, 520].map(x => STYLE === 'asia'
          ? `<rect x="${x}" y="270" width="90" height="50" fill="#a07a4a"/><path d="M${x - 20} 272 L${x + 45} 220 L${x + 110} 272 Z" fill="#6b4a2a"/><rect x="${x + 10}" y="320" width="8" height="20" fill="#5a3a20"/><rect x="${x + 72}" y="320" width="8" height="20" fill="#5a3a20"/>`
          : `<rect x="${x}" y="270" width="80" height="60" fill="${STYLE === 'africa' ? '#b5793e' : p.wall}"/><path d="M${x - 14} 272 L${x + 40} ${STYLE === 'africa' ? 214 : 236} L${x + 94} 272 Z" fill="${STYLE === 'africa' ? '#c9a24a' : p.roof}"/><rect x="${x + 30}" y="296" width="20" height="34" fill="#3a2a1a"/>`).join('') +
        palms(p, 2, 340, 0.8);
    },
    jungle(p, r) {
      return sky(p, 'sj') + `<path d="M0 220 L140 110 L260 200 L400 80 L560 210 L680 120 L800 200 L800 450 L0 450 Z" fill="#3c5a4a"/>` +
        Array.from({ length: 26 }, (_, i) => `<ellipse cx="${(i * 71) % W}" cy="${300 + (i * 29) % 120}" rx="${60 + (i % 4) * 20}" ry="${36 + (i % 3) * 12}" fill="${i % 2 ? p.plant : '#1f4a2c'}"/>`).join('') +
        palms(p, 6, 450, 1.1) + `<path d="M0 450 L800 450" stroke="#000" stroke-width="2"/>`;
    },
    night(p, r) {
      return sky(p, 'sn', true) +
        `<path d="M150 450 L150 230 L250 230 L250 180 L320 140 L400 110 L480 140 L550 180 L550 230 L650 230 L650 450 Z" fill="#1b1a2e"/>` +
        Array.from({ length: 12 }, (_, i) => `<rect x="${180 + (i % 6) * 75}" y="${250 + Math.floor(i / 6) * 70}" width="22" height="30" fill="${i % 3 ? '#f2c14e' : '#2a2840'}" opacity="0.85"/>`).join('') +
        `<path d="M90 450 L240 0 L280 0 Z" fill="#fff8d0" opacity="0.08"/><path d="M710 450 L520 0 L560 0 Z" fill="#fff8d0" opacity="0.08"/>` +
        `<rect y="400" width="${W}" height="50" fill="#0c0b16"/>` + tank(20, 430, 0.9, '#11140c') + tank(560, 440, 1.1, '#11140c');
    },
    church(p, r) {
      if (STYLE === 'europe') return sky(p, 'sc') + `<rect y="330" width="${W}" height="120" fill="#b8b09a"/>` +
        `<rect x="250" y="190" width="300" height="140" fill="${p.wall}"/><rect x="360" y="120" width="80" height="80" fill="${p.wall}"/>` +
        [[400, 120, 34], [290, 190, 22], [510, 190, 22]].map(([x, y, r2]) => `<path d="M${x - r2} ${y} Q${x - r2 - 8} ${y - r2 * 1.2} ${x} ${y - r2 * 2.4} Q${x + r2 + 8} ${y - r2 * 1.2} ${x + r2} ${y} Z" fill="#d6a63a"/><path d="M${x} ${y - r2 * 2.4} V${y - r2 * 2.4 - 24} M${x - 8} ${y - r2 * 2.4 - 16} H${x + 8}" stroke="#d6a63a" stroke-width="3"/><rect x="${x - r2 + 4}" y="${y}" width="${(r2 - 4) * 2}" height="14" fill="${p.wall}"/>`).join('') +
        [300, 360, 440, 500].map(x => `<path d="M${x - 10} 300 V250 Q${x} 236 ${x + 10} 250 V300 Z" fill="#3a3a4a"/>`).join('') +
        `<path d="M385 330 V270 Q400 252 415 270 V330 Z" fill="#4a2a1a"/>` + crowd('#2a2a30', 450, 22, false);
      if (STYLE === 'asia') return sky(p, 'sc') + `<rect y="330" width="${W}" height="120" fill="#c9b48a"/>` +
        [0, 1, 2, 3].map(i => `<path d="M${260 - i * 20} ${300 - i * 60} L${540 + i * 20} ${300 - i * 60} L${500 + i * 6} ${270 - i * 60} L${300 - i * 6} ${270 - i * 60} Z" fill="${p.roof}"/><rect x="${300 - i * 6 + 10}" y="${300 - i * 60}" width="${200 + i * 12 - 20}" height="34" fill="#e2b33c"/>`).join('') +
        `<path d="M400 60 L392 90 L408 90 Z" fill="#e2b33c"/>` + crowd('#e07a1f', 450, 20, false);
      if (STYLE === 'africa') return sky(p, 'sc') + `<rect y="330" width="${W}" height="120" fill="${p.ground}"/>` +
        `<path d="M380 330 Q370 230 390 170 L410 170 Q430 230 420 330 Z" fill="#6b4a2a"/><path d="M390 175 Q300 140 260 100 M400 172 Q400 110 380 70 M410 175 Q500 140 540 104 M400 180 Q330 180 300 150 M400 180 Q470 180 500 150" stroke="#6b4a2a" stroke-width="12" fill="none" stroke-linecap="round"/>` +
        `<ellipse cx="400" cy="90" rx="200" ry="50" fill="${p.plant}" opacity="0.9"/>` + crowd('#3a2014', 450, 24, false);
      return `<rect width="${W}" height="${H}" fill="#3a2a22"/>` +
        [150, 400, 650].map(x => `<path d="M${x - 90} ${H} V200 Q${x} 60 ${x + 90} 200 V${H} Z" fill="#5a4334"/>`).join('') +
        `<path d="M340 70 Q400 10 460 70 V220 H340 Z" fill="#3b6fb0"/><path d="M340 120 H460 M400 70 V220" stroke="#e2b33c" stroke-width="4"/><circle cx="400" cy="140" r="18" fill="#c1272d" opacity="0.8"/>` +
        Array.from({ length: 7 }, (_, i) => `<rect x="${200 + i * 60}" y="290" width="6" height="40" fill="#f2ead6"/><path d="M${203 + i * 60} 282 q-5 -10 0 -16 q5 6 0 16" fill="#f2c14e"/>`).join('') + `<rect y="360" width="${W}" height="90" fill="#2a1e18"/>`;
    },
    stadium(p, r) {
      return sky(p, 'st') + `<path d="M0 120 L800 120 L800 300 L0 300 Z" fill="#6a6a72"/>` +
        Array.from({ length: 160 }, (_, i) => `<circle cx="${(i % 40) * 20 + 10}" cy="${140 + Math.floor(i / 40) * 40}" r="7" fill="${['#c1272d', '#f2c14e', '#f2ead6', p.accent][i % 4]}"/>`).join('') +
        `<rect y="300" width="${W}" height="150" fill="#3e8a3a"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 100}" y="300" width="50" height="150" fill="#357a32"/>`).join('') +
        `<path d="M400 300 V450" stroke="#fff" stroke-width="3"/><ellipse cx="400" cy="380" rx="70" ry="30" fill="none" stroke="#fff" stroke-width="3"/>` +
        [60, 740].map(x => `<rect x="${x - 4}" y="20" width="8" height="110" fill="#444"/><rect x="${x - 30}" y="10" width="60" height="22" fill="#fff9d0"/>`).join('');
    },
    airport(p, r) {
      return sky(p, 'sa') + `<rect y="300" width="${W}" height="150" fill="#7a7a6a"/><rect y="350" width="${W}" height="40" fill="#4a4a44"/>` +
        Array.from({ length: 10 }, (_, i) => `<rect x="${i * 90}" y="368" width="50" height="4" fill="#f2ead6"/>`).join('') +
        `<rect x="40" y="200" width="200" height="100" fill="${p.wall}"/><rect x="120" y="150" width="40" height="50" fill="${p.wall}"/><rect x="110" y="140" width="60" height="16" fill="#2a3a4a"/>` +
        `<g transform="translate(360 270)"><ellipse cx="160" cy="20" rx="170" ry="24" fill="#d8d8d0"/><path d="M120 20 L60 -40 L100 -40 L190 20 Z" fill="#c0c0b8"/><path d="M300 10 L330 -40 L345 -40 L335 14 Z" fill="#c0c0b8"/>` +
        Array.from({ length: 8 }, (_, i) => `<circle cx="${70 + i * 22}" cy="14" r="5" fill="#2a3a4a"/>`).join('') + `<circle cx="100" cy="44" r="10" fill="#222"/><circle cx="240" cy="44" r="10" fill="#222"/></g>` + palms(p, 3, 300, 0.7);
    },
    un(p, r) {
      return `<rect width="${W}" height="${H}" fill="#2f4f7a"/><rect y="0" width="${W}" height="200" fill="#e9dcc0"/>` +
        `<circle cx="400" cy="100" r="70" fill="none" stroke="#5b92e5" stroke-width="6"/><circle cx="400" cy="100" r="50" fill="none" stroke="#5b92e5" stroke-width="3"/><path d="M330 100 H470 M400 30 V170" stroke="#5b92e5" stroke-width="3"/>` +
        `<path d="M320 140 Q300 100 330 60 M480 140 Q500 100 470 60" stroke="#5b92e5" stroke-width="6" fill="none"/>` +
        `<rect x="330" y="220" width="140" height="90" fill="#7a5a3a"/><rect x="360" y="200" width="80" height="24" fill="#c9a640"/>` +
        Array.from({ length: 4 }, (_, row) => Array.from({ length: 14 }, (_, i) => `<circle cx="${30 + i * 58}" cy="${330 + row * 32}" r="10" fill="#141a26"/><rect x="${18 + i * 58}" y="${340 + row * 32}" width="24" height="14" fill="#141a26"/>`).join('')).join('');
    },
  };

  function svg(bg, region) {
    const p = PAL[region] || PAL.latam;
    const b = builders[bg] || builders.office;
    STYLE = (REGIONS[region] && REGIONS[region].style) || 'latam';
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${b(p, region)}</svg>`;
  }
  return { svg };
})();
