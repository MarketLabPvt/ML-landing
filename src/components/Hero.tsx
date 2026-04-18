import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import MediaBlend from "./MediaBlend";

/* ── Animated counter ── */
function useCounter(end: number, dur = 2000, delay = 800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const s = performance.now();
      const tick = (n: number) => {
        const p = Math.min((n - s) / dur, 1);
        setV(Math.floor((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [end, dur, delay]);
  return v;
}

/* ── Typewriter effect ── */
function useTypewriter(text: string, speed = 40, delay = 1200) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}

/* ── Ticker data ── */
const tickerPairs = [
  "EUR/USD 1.0847",
  "GBP/USD 1.2654",
  "USD/JPY 149.32",
  "AUD/USD 0.6543",
  "USD/CHF 0.8791",
  "NZD/USD 0.6087",
  "USD/CAD 1.3612",
  "EUR/GBP 0.8568",
  "EUR/JPY 161.84",
  "GBP/JPY 188.92",
  "XAU/USD 2,341",
  "BTC/USD 67,842",
  "ETH/USD 3,521",
  "EUR/CHF 0.9534",
  "AUD/JPY 97.65",
  "GBP/CHF 1.1124",
];

function TickerRow({
  direction,
  speed,
  opacity,
}: {
  direction: "left" | "right";
  speed: number;
  opacity: number;
}) {
  const items = [...tickerPairs, ...tickerPairs];
  return (
    <div className="flex overflow-hidden whitespace-nowrap" style={{ opacity }}>
      <div
        className={`flex gap-6 sm:gap-10 ${
          direction === "left"
            ? "animate-[scroll-left_var(--speed)_linear_infinite]"
            : "animate-[scroll-right_var(--speed)_linear_infinite]"
        }`}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {items.map((pair, i) => {
          const isPositive = i % 3 !== 1;
          return (
            <span
              key={i}
              className="flex items-center gap-2 text-[11px] sm:text-xs font-mono shrink-0"
            >
              <span className="text-surface-400/60 font-heading font-semibold">
                {pair.split(" ")[0]}
              </span>
              <span className="text-surface-300/40">{pair.split(" ")[1]}</span>
              <span
                className={`text-[10px] ${isPositive ? "text-green-500/30" : "text-red-500/30"}`}
              >
                {isPositive ? "▲" : "▼"}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const students = useCounter(100, 1800, 600);
  const profit = useCounter(50000, 2500, 1200);
  const winRate = useCounter(78, 1800, 800);

  const subtitle = useTypewriter(
    "Trade with clarity. Execute with precision. Grow with discipline.",
    35,
    1400,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const unsubX = smoothX.on("change", (v) =>
      setGlowPos((p) => ({ ...p, x: v * 100 })),
    );
    const unsubY = smoothY.on("change", (v) =>
      setGlowPos((p) => ({ ...p, y: v * 100 })),
    );
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY]);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ═══ LAYER 1: Data Wall — staggered opacity for depth ═══ */}
      <div className="absolute inset-0 flex flex-col justify-center gap-5 sm:gap-7 select-none pointer-events-none">
        <TickerRow direction="left" speed={45} opacity={0.5} />
        <TickerRow direction="right" speed={55} opacity={0.7} />
        <TickerRow direction="left" speed={50} opacity={1} />
        <TickerRow direction="right" speed={48} opacity={0.8} />
        <TickerRow direction="left" speed={52} opacity={1} />
        <TickerRow direction="right" speed={46} opacity={0.6} />
        <TickerRow direction="left" speed={58} opacity={0.4} />
      </div>

      {/* ═══ LAYER 2: Mouse spotlight ═══ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in srgb, var(--color-brand-500) 7%, transparent), transparent 60%)`,
        }}
      />

      {/* ═══ LAYER 3: Softer cinematic wash ═══ */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-surface-900/55 via-surface-950/35 to-surface-950/75" />
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 52% 36%, color-mix(in srgb, var(--color-brand-500) 12%, transparent), transparent 58%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 72% 42%, color-mix(in srgb, var(--color-accent-500) 10%, transparent), transparent 62%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,var(--color-surface-950)_82%)] pointer-events-none" />

      {/* ═══ LAYER 4: Subtle noise texture ═══ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 pt-22 sm:pt-28 pb-8 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-10 lg:p-12"
        >
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-5"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/8 px-3.5 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-brand-300 tracking-wide uppercase">
                    Enrollment Open — Limited Spots
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-heading text-[clamp(2rem,8.2vw,4.4rem)] leading-[1.02] font-extrabold tracking-tight text-white mb-4"
              >
                <span className="block">Master the</span>
                <span className="text-gradient">Markets</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-7 min-h-7 sm:min-h-8"
              >
                <p className="text-sm sm:text-base text-surface-300 font-mono">
                  <span>{subtitle}</span>
                  <span className="inline-block w-[2px] h-4 bg-accent-400 ml-0.5 animate-[blink_1s_steps(2)_infinite] align-middle" />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <a
                  href="https://app.marketlabedu.com/signup"
                  target="_blank"
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute -inset-px rounded-xl bg-linear-to-r from-brand-500 via-accent-500 to-brand-500 bg-size-[200%_100%] animate-[shimmer_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2 rounded-xl bg-surface-950/90 px-7 py-3.5 text-sm sm:text-base font-semibold text-white group-hover:bg-surface-900/90 transition-colors">
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
                {/* <a
                  href="#features"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/15 transition-all active:scale-[0.98]"
                >
                  <Play className="h-3.5 w-3.5 text-accent-400" />
                  Watch Demo
                </a> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.95 }}
                className="mt-5 flex flex-wrap items-center gap-2"
              >
                {[
                  "Structured courses",
                  "Expert mentorship",
                  "Exclusive live sessions",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[10px] sm:text-[11px] text-surface-300"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.7 }}
              className="relative h-70 sm:h-96 md:h-104 lg:h-128"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 sm:inset-6 rounded-full border border-white/10"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--color-brand-500) 28%, transparent) 90deg, transparent 180deg, color-mix(in srgb, var(--color-accent-500) 30%, transparent) 300deg, transparent 360deg)",
                }}
              />

              <div className="absolute inset-0 rounded-4xl bg-radial-[circle_at_50%_35%] from-brand-500/15 via-accent-500/8 to-transparent blur-xl" />

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-3 sm:right-5 md:right-7 z-30 rounded-lg border border-white/12 bg-surface-900/80 px-3 py-2 backdrop-blur-md"
              >
                <p className="text-[10px] text-surface-400 font-mono">
                  Strategy efficiency
                </p>
                <p className="text-xs font-semibold text-accent-300 text-center">
                  75%
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-4 bottom-2 sm:bottom-4 z-30 rounded-lg border border-white/12 bg-surface-900/80 px-3 py-2 backdrop-blur-md"
              >
                <p className="text-[10px] text-surface-400 font-mono">
                  risk profile
                </p>
                <p className="text-xs font-semibold text-brand-300">
                  A+ (disciplined)
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] sm:w-[78%] z-20"
              >
                <MediaBlend
                  src="https://cdn.coverr.co/videos/coverr-stock-trading-on-multiple-monitors-1579/720p.mp4"
                  alt="Live class walkthrough"
                  kind="video"
                  poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
                  label="Main Session"
                  heightClassName="h-36 sm:h-48 md:h-52 lg:h-56"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0], x: [0, -3, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1 sm:left-2 top-4 sm:top-8 w-[47%] sm:w-[46%] z-10"
              >
                <MediaBlend
                  src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=80"
                  alt="Courses"
                  label="Courses"
                  heightClassName="h-24 sm:h-28 md:h-32"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], x: [0, 3, 0] }}
                transition={{
                  duration: 6.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-1 sm:right-2 bottom-4 sm:bottom-8 w-[47%] sm:w-[46%] z-10"
              >
                <MediaBlend
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80"
                  alt="Mentorship desk setup"
                  label="Mentorship"
                  heightClassName="h-24 sm:h-28 md:h-32"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ COUNTERS with hover glow ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { value: `${students.toLocaleString()}+`, label: "Active Traders" },
            {
              value: `$${Math.floor(profit / 1000)}K+`,
              label: "Student Profits",
            },
            { value: `${winRate}%`, label: "Avg Win Rate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group/card relative glass rounded-xl sm:rounded-2xl border border-white/6 p-3 sm:p-5 text-center overflow-hidden hover:border-white/10 transition-colors"
            >
              {/* Hover glow inside card */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-brand-500) 8%, transparent), transparent 70%)",
                }}
              />
              <p className="relative font-heading text-xl sm:text-3xl font-extrabold text-gradient mb-0.5">
                {stat.value}
              </p>
              <p className="relative text-[10px] sm:text-xs text-surface-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══ Scroll indicator ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1"
      >
        <span className="text-[9px] uppercase tracking-widest text-surface-500 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-surface-500" />
        </motion.div>
      </motion.div>

      {/* ═══ Bottom gradient divider ═══ */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div
          className="w-full h-full opacity-30 separator-animated"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, var(--color-brand-500), var(--color-accent-500), transparent 90%)",
          }}
        />
      </div>
    </section>
  );
}
