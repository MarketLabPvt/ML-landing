import { motion } from "framer-motion";
import { Clock, BarChart, Star, ArrowRight, Users } from "lucide-react";
import MediaBlend from "./MediaBlend";

const courses = [
  {
    badge: "Beginner",
    badgeColor: "bg-brand-500/10 text-brand-400 border-brand-500/20",
    title: "Trading Foundations",
    description:
      "Learn the fundamentals of financial markets, chart reading, candlestick patterns, and basic technical analysis.",
    duration: "8 Weeks",
    rating: "4.9",
    modules: 24,
    enrolled: 4280,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    badge: "Intermediate",
    badgeColor: "bg-accent-500/10 text-accent-400 border-accent-500/20",
    title: "Advanced Technical Analysis",
    description:
      "Master advanced chart patterns, multi-timeframe analysis, volume profiling, and institutional order flow.",
    duration: "10 Weeks",
    rating: "4.8",
    modules: 32,
    enrolled: 2940,
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
  },
  {
    badge: "Advanced",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    title: "Algorithmic & Quant Trading",
    description:
      "Build automated trading systems, backtest strategies, and understand quantitative approaches to the market.",
    duration: "12 Weeks",
    rating: "4.9",
    modules: 40,
    enrolled: 1850,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Courses() {
  return (
    <section id="courses" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/3 blur-3xl" />

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
            Our Programs
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Pick Your <span className="text-gradient">Trading Path</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Whether you're just getting started or looking to go full-time, we
            have the right course for your level.
          </p>
        </motion.div>

        {/* Course Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:gap-8 lg:grid-cols-3"
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative glass rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-px z-10 opacity-40 separator-animated"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-brand-500), var(--color-accent-500), transparent)",
                }}
              />

              {/* Blended media panel */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <MediaBlend
                  src={course.image}
                  alt={course.title}
                  heightClassName="h-full"
                />
                <svg
                  className="absolute inset-0 w-full h-full opacity-60"
                  viewBox="0 0 600 280"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id={`courseLine-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-brand-500)"
                        stopOpacity="0.2"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-accent-500)"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke={`url(#courseLine-${i})`}
                    strokeWidth="3"
                    points="0,210 60,190 120,200 180,140 240,156 300,118 360,142 420,90 480,104 540,66 600,74"
                  />
                </svg>
                <div className="absolute left-0 right-0 top-0 h-14 bg-linear-to-b from-surface-950/45 to-transparent" />
                <span
                  className={`absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${course.badgeColor}`}
                >
                  {course.badge}
                </span>

                {/* Enrolled count overlaid on panel bottom */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-white/60" />
                  <span className="text-[11px] text-white/60 font-medium">
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-surface-300 leading-relaxed mb-4 sm:mb-5">
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-surface-400 mb-5">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="h-3.5 w-3.5" />
                    {course.modules} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                    {course.rating}
                  </span>
                </div>

                {/* CTA button instead of just a text link */}
                <a
                  href="#pricing"
                  className="group/btn flex items-center justify-center gap-2 w-full rounded-xl border border-white/8 bg-white/3 py-2.5 text-sm font-semibold text-white hover:bg-white/8 hover:border-white/12 transition-all active:scale-[0.98]"
                >
                  Explore Course
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
