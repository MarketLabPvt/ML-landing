import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function useScrollCounter(end: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return { value, ref };
}

const stats = [
  { end: 100, format: (v: number) => v + "+", label: "Active Students" },
  { end: 94, format: (v: number) => v + "%", label: "Completion Rate" },
  { end: 50, format: (v: number) => v + "k+", label: "Student Profits" },
  {
    end: 47,
    format: (v: number) => (v / 10).toFixed(1),
    label: "Average Rating",
  },
];

function StatBlock({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { value, ref } = useScrollCounter(stat.end);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative text-center"
    >
      {/* Soft glow behind number */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{
          background:
            index % 2 === 0
              ? "var(--color-brand-500)"
              : "var(--color-accent-500)",
        }}
      />

      {/* Big number */}
      <p className="relative font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gradient leading-none mb-2 sm:mb-3">
        {stat.format(value)}
      </p>

      {/* Label */}
      <p className="relative text-sm sm:text-base text-surface-400">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Our Impact
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Real results from real traders. Here's what our community has
            achieved together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14 lg:gap-8">
          {stats.map((stat, i) => (
            <StatBlock key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
