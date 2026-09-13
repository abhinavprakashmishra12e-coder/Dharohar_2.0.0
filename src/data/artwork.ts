export function heritageArtwork(
  title: string,
  subtitle: string,
  primary = '#0f766e',
  secondary = '#fbbf24',
  accent = '#f8fafc'
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" rx="28" fill="url(#bg)"/>
      <circle cx="646" cy="108" r="130" fill="${accent}" opacity="0.18"/>
      <circle cx="178" cy="450" r="160" fill="#0f172a" opacity="0.18"/>
      <path d="M0 430 C160 360 230 500 410 452 S620 340 800 472 L800 600 L0 600 Z" fill="#0f172a" opacity="0.20"/>
      <g transform="translate(92 104)">
        <rect x="48" y="180" width="520" height="198" rx="24" fill="#0f172a" opacity="0.22" stroke="${accent}" stroke-opacity="0.28"/>
        <rect x="120" y="150" width="78" height="132" rx="8" fill="${accent}" opacity="0.82"/>
        <rect x="216" y="112" width="110" height="170" rx="8" fill="${accent}" opacity="0.86"/>
        <rect x="350" y="146" width="92" height="136" rx="8" fill="${accent}" opacity="0.82"/>
        <rect x="458" y="128" width="82" height="154" rx="8" fill="${accent}" opacity="0.86"/>
        <path d="M200 110 L271 54 L340 110" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M123 150 L123 80 L160 80 L160 150" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M480 128 L480 82 L520 82 L520 128" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="270" cy="52" r="18" fill="${secondary}" opacity="0.9"/>
      </g>
      <text x="82" y="88" fill="${accent}" font-size="42" font-weight="700" font-family="Segoe UI, Arial, sans-serif">${title}</text>
      <text x="82" y="126" fill="${accent}" opacity="0.78" font-size="22" font-weight="500" font-family="Segoe UI, Arial, sans-serif">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
