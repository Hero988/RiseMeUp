// A precise, code-native public infographic. No prices or supplier documents.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const logo = readFileSync(path.join(root, 'public/logo.png')).toString('base64');
const icons = [
  '<path d="M40 10C28 28 16 40 16 55a24 24 0 0 0 48 0C64 40 52 28 40 10Z"/><path d="M34 65c-8-2-10-7-10-13"/>',
  '<ellipse cx="40" cy="20" rx="28" ry="10"/><path d="M12 20v44c0 14 56 14 56 0V20M12 42c0 14 56 14 56 0M68 57h10v17"/>',
  '<circle cx="25" cy="60" r="17"/><circle cx="67" cy="66" r="10"/><path d="M10 43V18h30l8 26h22v12M19 18v23h27M53 42V22M25 60h0"/>',
  '<path d="m8 25 60 16M24 28l-6 28m25-22-6 28m25-21-6 28M12 56h12m7 6h12m7 7h12"/>',
  '<path d="M40 76V35M40 51C12 51 9 35 10 25c19-1 30 9 30 26ZM40 38c0-22 13-28 29-28 2 17-9 28-29 28Z"/>',
  '<path d="M8 25h58v31H8ZM8 25l8-12h42l8 12M66 46h12M20 56v8m34-8v8"/><circle cx="20" cy="68" r="8"/><circle cx="54" cy="68" r="8"/>',
  '<path d="M18 27h34v48H18ZM25 27V15h20v12M52 38h12l10 15m-2 8 4 5m-11-7 3 6M28 42h14M28 52h14"/>',
  '<path d="m14 70 42-42m-9-16a17 17 0 0 0 22 22l-7-10 4-10-11 4-8-6ZM12 70l-4-8 7-7 9 7M8 34h27V18H8ZM22 34v37"/>',
];
const cards = [
  ['Restore water', 'Assess wells, pumping and power'],
  ['Store and irrigate', 'New storage, filtration and pipes'],
  ['Agricultural tractor', 'Match capacity to the growing area'],
  ['Prepare the land', 'Assess cultivation implements'],
  ['Plant suitable crops', 'Select planting tools after design'],
  ['Move the harvest', 'Assess a trailer and transport'],
  ['Care for crops', 'Appropriate crop-care equipment'],
  ['Tools and protection', 'Hand tools, safety and training'],
];
const panels = cards.map(([title, text], i) => {
  const x = 40 + (i % 2) * 470;
  const y = 260 + Math.floor(i / 2) * 172;
  return `<g transform="translate(${x} ${y})"><rect width="450" height="152" rx="18" fill="#fffdf8" stroke="#d7decd"/><circle cx="28" cy="28" r="15" fill="#245b35"/><text x="28" y="34" text-anchor="middle" fill="white" font-size="17" font-weight="700">${i + 1}</text><g transform="translate(30 52)" fill="none" stroke="#245b35" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${icons[i]}</g><text x="130" y="66" font-size="26" font-weight="700" fill="#173c27">${title}</text><text x="130" y="101" font-size="17" fill="#454f43">${text}</text></g>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="1120" viewBox="0 0 1000 1120" role="img" aria-labelledby="title desc">
<title id="title">Virgin Mary Farm: proposed equipment needs</title>
<desc id="desc">Water restoration first, followed by assessment-led machinery and tools. No prices are confirmed. The equipment is proposed, not already purchased.</desc>
<rect width="1000" height="1120" rx="24" fill="#f5f3e8"/>
<g font-family="Arial, Helvetica, sans-serif">
<image x="40" y="28" width="280" height="100" xlink:href="data:image/png;base64,${logo}"/>
<text x="950" y="65" text-anchor="end" font-size="30" font-weight="700" fill="#173c27">VIRGIN MARY FARM</text>
<text x="950" y="101" text-anchor="end" font-size="21" fill="#454f43">Proposed equipment needs</text>
<rect x="40" y="154" width="920" height="80" rx="16" fill="#245b35"/>
<text x="500" y="187" text-anchor="middle" font-size="26" font-weight="700" fill="white">Water first. Then grow, train and rebuild.</text>
<text x="500" y="217" text-anchor="middle" font-size="19" fill="#f5f3e8">Omdurman, Khartoum, Sudan · A plan to develop with partners</text>
${panels}
<text x="500" y="997" text-anchor="middle" font-size="24" font-weight="700" fill="#173c27">Assess → Design → Agree support → Deliver safely</text>
<text x="500" y="1035" text-anchor="middle" font-size="19" fill="#454f43">Proposed equipment, not existing assets or confirmed purchases.</text>
<text x="500" y="1065" text-anchor="middle" font-size="19" fill="#454f43">Specifications, quantities and costs will follow technical assessment.</text>
<text x="500" y="1100" text-anchor="middle" font-size="19" font-weight="700" fill="#245b35">www.risemeup.org</text>
</g></svg>`;
writeFileSync(path.join(root, 'public/virgin-mary-equipment-needs.svg'), svg);
console.log('Built price-free equipment illustration using the original Risemeup logo.');
