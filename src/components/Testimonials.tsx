import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import MediaBlend from "./MediaBlend";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Forex Trader",
    avatar: "SC",
    rating: 5,
    text: "Market Lab completely changed how I approach the markets. The risk management module alone saved me from blowing my account. I'm now consistently profitable for 8 months straight.",
  },
  {
    name: "Marcus Williams",
    role: "Day Trader",
    avatar: "MW",
    rating: 5,
    text: "The live trading sessions are incredible. Watching the mentors analyze charts in real-time and then applying those concepts has been a game-changer for my trading career.",
  },
  {
    name: "Priya Patel",
    role: "Swing Trader",
    avatar: "PP",
    rating: 5,
    text: "I went from losing money every month to making consistent returns. The structured curriculum plus the supportive community made all the difference. Worth every penny.",
  },
  {
    name: "James Okonkwo",
    role: "Crypto Trader",
    avatar: "JO",
    rating: 5,
    text: "The algorithmic trading course opened up a whole new world for me. I now run three automated strategies that generate passive income while I sleep. Best investment ever.",
  },
  {
    name: "Emily Roberts",
    role: "Options Trader",
    avatar: "ER",
    rating: 5,
    text: "What sets Market Lab apart is the personalized trade reviews. Having a mentor review your actual trades and give feedback accelerates your learning incredibly fast.",
  },
  {
    name: "David Kim",
    role: "Full-Time Trader",
    avatar: "DK",
    rating: 5,
    text: "I quit my 9-to-5 after 6 months in the program. The foundation they build is rock solid. The community keeps me accountable and motivated every single day.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ t, className = "" }: { t: Testimonial; className?: string }) {
  return (
    <div
      className={`group relative glass rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden hover:border-brand-500/20 transition-all duration-300 ${className}`}
    >
      {/* Subtle hover glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: "color-mix(in srgb, var(--color-brand-500) 6%, transparent)" }}
      />

      {/* Top gradient line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40 separator-animated"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-brand-500), var(--color-accent-500), transparent)" }}
      />

      {/* Quote Icon */}
      <Quote className="relative h-6 w-6 sm:h-8 sm:w-8 text-brand-500/20 mb-3 sm:mb-4" />

      {/* Stars */}
      <div className="relative flex gap-1 mb-2 sm:mb-3">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star
            key={j}
            className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-accent-400 text-accent-400"
          />
        ))}
      </div>

      {/* Text */}
      <p className="relative text-[13px] sm:text-sm leading-relaxed text-surface-200 mb-4 sm:mb-6 flex-1">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="relative flex items-center gap-3 pt-3 sm:pt-4 border-t border-white/5">
        <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full border border-brand-500/20 bg-linear-to-br from-brand-500/25 to-accent-500/25 flex items-center justify-center">
          <span className="text-[11px] sm:text-xs font-semibold text-white font-heading">{t.avatar}</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{t.name}</p>
          <p className="text-xs text-surface-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((prev) => (prev + nextDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative py-12 sm:py-24 lg:py-32">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent-500/4 blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-brand-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Success Stories
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Traders Who <span className="text-gradient">Transformed</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Real results from real students. Our community speaks for itself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-4 sm:mb-7 grid grid-cols-3 gap-2 sm:gap-3"
        >
          <MediaBlend
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80"
            alt="Students in trading class"
            label="Student Community"
            heightClassName="h-20 sm:h-28"
          />
          <MediaBlend
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
            alt="Performance dashboard interface"
            label="Weekly Results"
            heightClassName="h-20 sm:h-28"
          />
          <MediaBlend
            src="https://cdn.coverr.co/videos/coverr-stock-trading-on-multiple-monitors-1579/720p.mp4"
            alt="Mentor walkthrough recording"
            kind="video"
            poster="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1000&q=80"
            label="Mentor Walkthrough"
            heightClassName="h-20 sm:h-28"
          />
        </motion.div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div className="relative min-h-[265px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  const swipe = Math.abs(info.offset.x) * info.velocity.x;
                  if (swipe < -800) paginate(1);
                  if (swipe > 800) paginate(-1);
                }}
                className="absolute inset-0"
              >
                <TestimonialCard t={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-5 bg-brand-400" : "w-1.5 bg-surface-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop / Tablet Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="h-full"
            >
              <TestimonialCard t={t} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
