import { motion } from "framer-motion";
import {
  BookOpen,
  LineChart,
  Users,
  ShieldCheck,
  Laptop,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MediaBlend from "./MediaBlend";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "brand" | "accent";
  glowPos: string;
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "From beginner to advanced, our step-by-step modules cover everything: technical analysis, fundamentals, and psychology.",
    color: "brand",
    glowPos: "top right",
  },
  {
    icon: LineChart,
    title: "Live Market Analysis",
    description:
      "Exclusive live sessions where our mentors break down real market movements and show you how to spot setups in real time.",
    color: "accent",
    glowPos: "top left",
  },
  {
    icon: Users,
    title: "Community & Mentorship",
    description:
      "Join an exclusive community of like-minded traders. Get direct access to mentors who actively trade the markets.",
    color: "brand",
    glowPos: "bottom left",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description:
      "Learn our proven risk management frameworks. Protect your capital and trade with confidence, not emotion.",
    color: "accent",
    glowPos: "bottom right",
  },
  {
    icon: Laptop,
    title: "Hands-On Practice",
    description:
      "Practice what you learn with guided exercises and structured drills to build confidence before trading live.",
    color: "brand",
    glowPos: "top left",
  },
  {
    icon: MessageSquare,
    title: "Trade Reviews",
    description:
      "Submit your trades for expert review. Get personalized feedback on your entries, exits, and trade management.",
    color: "accent",
    glowPos: "bottom right",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Decorative ring + dots orbiting the icon */
function IconOrbit({
  color,
  children,
}: {
  color: "brand" | "accent";
  children: React.ReactNode;
}) {
  const isBrand = color === "brand";
  const colorVar = isBrand ? "--color-brand-500" : "--color-accent-500";
  const lightVar = isBrand ? "--color-brand-400" : "--color-accent-400";

  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5">
      {/* Outer dashed orbit ring */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 group-hover:opacity-30 transition-opacity duration-700"
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={`var(${colorVar})`}
          strokeWidth="0.8"
          strokeDasharray="3 5"
          className="origin-center group-hover:animate-[spin_12s_linear_infinite]"
        />
      </svg>

      {/* Orbiting dots */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 animate-[pulse-glow_2s_ease-in-out_infinite]"
          style={{ background: `var(${lightVar})` }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bottom-1 right-1 animate-[pulse-glow_2s_ease-in-out_infinite_0.7s]"
          style={{ background: `var(${lightVar})` }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bottom-1 left-1 animate-[pulse-glow_2s_ease-in-out_infinite_1.3s]"
          style={{ background: `var(${colorVar})` }}
        />
      </div>

      {/* Icon container */}
      <div
        className={`relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border transition-all duration-500 group-hover:-translate-y-0.5 ${
          isBrand
            ? "bg-brand-500/8 border-brand-500/15 text-brand-400 group-hover:bg-brand-500/12 group-hover:border-brand-500/30"
            : "bg-accent-500/8 border-accent-500/15 text-accent-400 group-hover:bg-accent-500/12 group-hover:border-accent-500/30"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-16 sm:py-24 lg:py-32 pb-10 sm:pb-14 lg:pb-16"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/4 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/4 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            Why Market Lab
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Our comprehensive platform is designed to take you from zero
            knowledge to consistently profitable trader.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-6 sm:mb-8 glass rounded-2xl p-4 sm:p-5 overflow-hidden"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MediaBlend
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
              alt="Chart Analysis"
              label="Chart Analysis"
              heightClassName="h-24 sm:h-28"
            />
            <MediaBlend
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80"
              alt="Live Sessions"
              label="Live Sessions"
              heightClassName="h-24 sm:h-28"
            />
            <MediaBlend
              src="https://plus.unsplash.com/premium_photo-1661372012626-90b9e5001cea?auto=format&fit=crop&w=1000&q=80"
              alt="Community mentoring session"
              label="Mentorship"
              heightClassName="h-24 sm:h-28"
            />
            <MediaBlend
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
              alt="Active Community"
              label="Active Community"
              heightClassName="h-24 sm:h-28"
            />
          </div>
        </motion.article>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat, i) => {
            const isBrand = feat.color === "brand";
            const step = String(i + 1).padStart(2, "0");
            const colorVar = isBrand
              ? "--color-brand-500"
              : "--color-accent-500";

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative glass rounded-2xl p-4 sm:p-8 overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Large watermark step number */}
                <span
                  className="absolute -top-3 -right-2 font-heading text-[7rem] sm:text-[8rem] font-black leading-none select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                  style={{ color: `var(${colorVar})` }}
                >
                  {step}
                </span>

                {/* Corner ambient glow */}
                <div
                  className="absolute w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `color-mix(in srgb, var(${colorVar}) 10%, transparent)`,
                    ...(feat.glowPos.includes("top")
                      ? { top: "-2rem" }
                      : { bottom: "-2rem" }),
                    ...(feat.glowPos.includes("right")
                      ? { right: "-2rem" }
                      : { left: "-2rem" }),
                  }}
                />

                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                  <div
                    className="h-full w-full opacity-40 separator-animated"
                    style={{
                      background: `linear-gradient(90deg, transparent 10%, var(${colorVar}), transparent 90%)`,
                    }}
                  />
                </div>

                {/* Icon with orbit decoration */}
                <IconOrbit color={feat.color}>
                  <feat.icon className="h-5 w-5" />
                </IconOrbit>

                {/* Title */}
                <h3 className="relative font-heading text-base sm:text-lg font-semibold text-white mb-2">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-surface-300">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
