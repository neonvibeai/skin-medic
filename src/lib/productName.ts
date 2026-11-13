/**
 * Product names in the catalogue follow the pattern "Name – 200 ml".
 * Splitting off the size lets cards show it on its own line, so the dash
 * never starts a line and the number never separates from its unit.
 */
export function splitProductName(name: string): { title: string; size: string } {
  const idx = name.lastIndexOf(' – ');
  if (idx === -1) return { title: name, size: '' };
  return {
    title: name.slice(0, idx).trim(),
    size: name.slice(idx + 3).trim().replace(/ /g, ' '),
  };
}
