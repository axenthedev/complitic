const LEGISCAN_API_KEY = process.env.LEGISCAN_API_KEY;

export async function fetchLatestUSPrivacyBill() {
  // Fetch latest privacy bill for California (state_id: 6)
  const url = `https://api.legiscan.com/?key=${LEGISCAN_API_KEY}&op=getMasterList&state=CA`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Legiscan API error");
  const data = await res.json();
  // Find the most recent privacy bill
  const bills = Object.values(data.masterlist).filter(
    (b) => typeof b === "object" && (b as any).title && /privacy|data/i.test((b as any).title)
  );
  bills.sort((a, b) => ((a as any).last_action_date < (b as any).last_action_date ? 1 : -1));
  return (bills[0] as any)?.title + "\n" + (bills[0] as any)?.last_action;
}

export async function fetchLatestEULaw() {
  // Fetch the latest from GDPR RSS
  const res = await fetch('https://eur-lex.europa.eu/legal-content/EN/RSS/?uri=CELEX:32016R0679');
  const xml = await res.text();
  const match = xml.match(/<title>(.*?)<\/title>[\s\S]*?<pubDate>(.*?)<\/pubDate>/);
  if (!match) throw new Error('No EU law found');
  return match[1] + '\n' + match[2];
}

export function getRegulationHash(text: string) {
  // Simple hash for change detection
  if (typeof window === 'undefined') {
    // Node.js
    return require("crypto").createHash("sha256").update(text).digest("hex");
  } else {
    // Browser fallback
    return btoa(unescape(encodeURIComponent(text))).substring(0, 32);
  }
} 