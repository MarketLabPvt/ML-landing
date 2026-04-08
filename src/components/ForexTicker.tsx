import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Radio } from "lucide-react";
import { forexService, type ForexQuote } from "../services/forex";

export default function ForexTicker() {
  const [quotes, setQuotes] = useState<ForexQuote[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial fetch
    forexService.getQuotes().then(setQuotes);

    // Refresh every 30s (demo: re-randomize, live: re-fetch)
    const interval = setInterval(() => {
      forexService.getQuotes().then(setQuotes);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (quotes.length === 0) return null;

  // Double the quotes for seamless infinite scroll
  const tickerItems = [...quotes, ...quotes];

  return (
    <div className="fixed top-0 left-0 right-0 z-60 bg-surface-900/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-[100vw] overflow-hidden">
        <div className="flex items-center">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-4 border-r border-white/5 shrink-0 h-8">
            <Radio className="h-3 w-3 text-accent-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-400">
              {forexService.isLive() ? "Live" : "Demo"}
            </span>
          </div>

          {/* Scrolling ticker */}
          <div ref={scrollRef} className="overflow-hidden flex-1">
            <motion.div
              className="flex items-center gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {tickerItems.map((q, i) => (
                <div
                  key={`${q.symbol}-${i}`}
                  className="flex items-center gap-2 py-2 px-1 shrink-0"
                >
                  <span className="text-xs">{q.flag}</span>
                  <span className="text-[11px] font-semibold text-surface-200 font-heading">
                    {q.symbol}
                  </span>
                  <span className="text-[11px] font-mono text-white font-medium">
                    {q.price.toFixed(q.symbol.includes("JPY") ? 2 : 4)}
                  </span>
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
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
