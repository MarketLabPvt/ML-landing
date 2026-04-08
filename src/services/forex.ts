/**
 * Forex data service using Twelve Data API (free tier).
 *
 * Setup:
 *   1. Sign up free at https://twelvedata.com (no credit card)
 *   2. Copy your API key
 *   3. Create .env in project root: VITE_TWELVEDATA_API_KEY=your_key_here
 *
 * Without an API key, the app uses realistic demo data so the UI always works.
 */

const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY as string | undefined;
const BASE_URL = "https://api.twelvedata.com";

// Major forex pairs we display
export const FOREX_PAIRS = [
  { symbol: "EUR/USD", name: "EUR/USD", flag: "🇪🇺🇺🇸" },
  { symbol: "GBP/USD", name: "GBP/USD", flag: "🇬🇧🇺🇸" },
  { symbol: "USD/JPY", name: "USD/JPY", flag: "🇺🇸🇯🇵" },
  { symbol: "USD/CHF", name: "USD/CHF", flag: "🇺🇸🇨🇭" },
  { symbol: "AUD/USD", name: "AUD/USD", flag: "🇦🇺🇺🇸" },
  { symbol: "USD/CAD", name: "USD/CAD", flag: "🇺🇸🇨🇦" },
  { symbol: "NZD/USD", name: "NZD/USD", flag: "🇳🇿🇺🇸" },
  { symbol: "EUR/GBP", name: "EUR/GBP", flag: "🇪🇺🇬🇧" },
];

export interface ForexQuote {
  symbol: string;
  name: string;
  flag: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  timestamp: number;
  isLive: boolean;
}

export interface ForexTimeSeries {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// ─── Demo data (realistic prices) ────────────────────────────────
function generateDemoData(): ForexQuote[] {
  const basePrices: Record<string, number> = {
    "EUR/USD": 1.0842,
    "GBP/USD": 1.2654,
    "USD/JPY": 149.32,
    "USD/CHF": 0.8791,
    "AUD/USD": 0.6543,
    "USD/CAD": 1.3612,
    "NZD/USD": 0.6087,
    "EUR/GBP": 0.8568,
  };

  return FOREX_PAIRS.map((pair) => {
    const base = basePrices[pair.symbol] ?? 1.0;
    // Random fluctuation ±0.3%
    const fluctuation = (Math.random() - 0.5) * 0.006 * base;
    const price = base + fluctuation;
    const change = fluctuation;
    const changePercent = (change / base) * 100;
    const spread = base * 0.002;

    return {
      symbol: pair.symbol,
      name: pair.name,
      flag: pair.flag,
      price: parseFloat(price.toFixed(pair.symbol.includes("JPY") ? 2 : 4)),
      change: parseFloat(change.toFixed(pair.symbol.includes("JPY") ? 2 : 4)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: parseFloat((price + spread).toFixed(pair.symbol.includes("JPY") ? 2 : 4)),
      low: parseFloat((price - spread).toFixed(pair.symbol.includes("JPY") ? 2 : 4)),
      timestamp: Date.now(),
      isLive: false,
    };
  });
}

function generateDemoTimeSeries(symbol: string, points = 24): ForexTimeSeries[] {
  const basePrices: Record<string, number> = {
    "EUR/USD": 1.0842,
    "GBP/USD": 1.2654,
    "USD/JPY": 149.32,
    "USD/CHF": 0.8791,
    "AUD/USD": 0.6543,
    "USD/CAD": 1.3612,
    "NZD/USD": 0.6087,
    "EUR/GBP": 0.8568,
  };

  const base = basePrices[symbol] ?? 1.0;
  const isJpy = symbol.includes("JPY");
  const data: ForexTimeSeries[] = [];
  let price = base;

  for (let i = points - 1; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 0.002 * base; // slight upward bias
    price += change;
    const high = price + Math.random() * 0.001 * base;
    const low = price - Math.random() * 0.001 * base;
    const d = new Date(Date.now() - i * 3600000);

    data.push({
      datetime: d.toISOString().slice(0, 19),
      open: parseFloat((price - change * 0.5).toFixed(isJpy ? 2 : 4)),
      high: parseFloat(high.toFixed(isJpy ? 2 : 4)),
      low: parseFloat(low.toFixed(isJpy ? 2 : 4)),
      close: parseFloat(price.toFixed(isJpy ? 2 : 4)),
    });
  }

  return data;
}

// ─── Live API calls ──────────────────────────────────────────────
async function fetchLiveQuotes(): Promise<ForexQuote[]> {
  if (!API_KEY) return generateDemoData();

  try {
    const symbols = FOREX_PAIRS.map((p) => p.symbol).join(",");
    const res = await fetch(
      `${BASE_URL}/quote?symbol=${symbols}&apikey=${API_KEY}`
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    // Twelve Data returns object keyed by symbol for multiple symbols
    return FOREX_PAIRS.map((pair) => {
      const q = data[pair.symbol] || data;
      const price = parseFloat(q.close || q.price || "0");
      const prevClose = parseFloat(q.previous_close || "0");
      const change = price - prevClose;
      const changePercent = prevClose ? (change / prevClose) * 100 : 0;

      return {
        symbol: pair.symbol,
        name: pair.name,
        flag: pair.flag,
        price,
        change: parseFloat(change.toFixed(pair.symbol.includes("JPY") ? 2 : 4)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        high: parseFloat(q.high || "0"),
        low: parseFloat(q.low || "0"),
        timestamp: q.timestamp ? parseInt(q.timestamp) * 1000 : Date.now(),
        isLive: true,
      };
    });
  } catch (err) {
    console.warn("Forex API error, falling back to demo data:", err);
    return generateDemoData();
  }
}

async function fetchTimeSeries(
  symbol: string,
  interval = "1h",
  points = 24
): Promise<ForexTimeSeries[]> {
  if (!API_KEY) return generateDemoTimeSeries(symbol, points);

  try {
    const res = await fetch(
      `${BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${points}&apikey=${API_KEY}`
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    if (data.status === "error") throw new Error(data.message);

    return (data.values || [])
      .map((v: Record<string, string>) => ({
        datetime: v.datetime,
        open: parseFloat(v.open),
        high: parseFloat(v.high),
        low: parseFloat(v.low),
        close: parseFloat(v.close),
      }))
      .reverse(); // oldest first
  } catch (err) {
    console.warn("Time series API error, falling back to demo:", err);
    return generateDemoTimeSeries(symbol, points);
  }
}

export const forexService = {
  getQuotes: fetchLiveQuotes,
  getTimeSeries: fetchTimeSeries,
  isLive: () => !!API_KEY,
};
