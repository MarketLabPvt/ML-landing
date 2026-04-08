import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, Radio } from "lucide-react";
import MediaBlend from "./MediaBlend";
import {
  forexService,
  type ForexQuote,
  type ForexTimeSeries,
} from "../services/forex";

// Tiny inline sparkline
function MiniSpark({ data, positive }: { data: number[]; positive: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 56;
  const h = 20;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(" ");
  const color = positive ? "#22c55e" : "#ef4444";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketOverview() {
  const [quotes, setQuotes] = useState<ForexQuote[]>([]);
  const [sparkData, setSparkData] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const q = await forexService.getQuotes();
      setQuotes(q);
      setLastUpdate(new Date());

      const seriesPromises = q.map((pair) =>
        forexService.getTimeSeries(pair.symbol, "1h", 20)
      );
      const seriesResults = await Promise.all(seriesPromises);
      const sparks: Record<string, number[]> = {};
      q.forEach((pair, idx) => {
        sparks[pair.symbol] = seriesResults[idx].map(
          (s: ForexTimeSeries) => s.close
        );
      });
      setSparkData(sparks);
    } catch {
      // fallback handled in service
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <section id="markets" className="relative py-10 sm:py-14">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Compact header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-accent-400 animate-pulse" />
            <h2 className="font-heading text-sm sm:text-base font-semibold text-white">
              Forex Markets
            </h2>
            {!forexService.isLive() && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-surface-800 text-surface-400 tracking-wider">
                Demo
              </span>
            )}
            {lastUpdate && (
              <span className="text-[10px] text-surface-500 hidden sm:inline">
                {lastUpdate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1 text-[11px] text-surface-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Compact horizontal scroll strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl overflow-hidden"
        >
          {/* Desktop: table-style layout */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-8 divide-x divide-white/5">
              {quotes.map((q) => (
                <div
                  key={q.symbol}
                  className="px-3 py-3 hover:bg-white/2 transition-colors"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[11px]">{q.flag}</span>
                    <span className="text-[11px] font-semibold text-surface-200 font-heading truncate">
                      {q.symbol}
                    </span>
                  </div>
                  <p className="font-mono text-sm font-bold text-white mb-0.5">
                    {q.price.toFixed(q.symbol.includes("JPY") ? 2 : 4)}
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`flex items-center gap-0.5 text-[10px] font-semibold ${
                        q.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {q.change >= 0 ? (
                        <TrendingUp className="h-2.5 w-2.5" />
                      ) : (
                        <TrendingDown className="h-2.5 w-2.5" />
                      )}
                      {q.change >= 0 ? "+" : ""}
                      {q.changePercent.toFixed(2)}%
                    </span>
                    {sparkData[q.symbol] && (
                      <MiniSpark
                        data={sparkData[q.symbol]}
                        positive={q.change >= 0}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: 2-column compact grid */}
          <div className="sm:hidden grid grid-cols-2 divide-x divide-white/5">
            {quotes.slice(0, 6).map((q, i) => (
              <div
                key={q.symbol}
                className={`px-3 py-2.5 ${i < 4 ? "border-b border-white/5" : ""}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]">{q.flag}</span>
                    <span className="text-[11px] font-semibold text-surface-200 font-heading">
                      {q.symbol}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-semibold ${
                      q.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {q.change >= 0 ? "+" : ""}
                    {q.changePercent.toFixed(2)}%
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-white">
                  {q.price.toFixed(q.symbol.includes("JPY") ? 2 : 4)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-3 hidden md:grid grid-cols-3 gap-3">
          <MediaBlend
            src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=80"
            alt="Order flow chart close-up"
            label="Order Flow"
            heightClassName="h-20"
          />
          <MediaBlend
            src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1000&q=80"
            alt="Trading workstation setup"
            label="Desk Setup"
            heightClassName="h-20"
          />
          <MediaBlend
            src="https://cdn.coverr.co/videos/coverr-stock-trading-on-multiple-monitors-1579/720p.mp4"
            alt="Live market screen recording"
            kind="video"
            poster="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=80"
            label="Live Feed"
            heightClassName="h-20"
          />
        </div>

        <p className="text-center text-[9px] sm:text-[10px] text-surface-600 mt-3">
          {forexService.isLive()
            ? "Data by Twelve Data. Prices may be delayed."
            : "Simulated data. Add your free Twelve Data API key for live prices."}
        </p>
      </div>
    </section>
  );
}
