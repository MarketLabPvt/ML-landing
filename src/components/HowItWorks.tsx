import { motion } from "framer-motion";
import { UserPlus, BookOpenCheck, Laptop2, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join the Program",
    description:
      "Create your account and choose the path that matches your current level and schedule.",
  },
  {
    icon: BookOpenCheck,
    title: "Follow Structured Lessons",
    description:
      "Progress through guided modules covering setup, strategy, psychology, and risk management.",
  },
  {
    icon: Laptop2,
    title: "Practice Your Skills",
    description:
      "Apply concepts through practical exercises and repeatable routines before taking live trades.",
  },
  {
    icon: TrendingUp,
    title: "Get Feedback & Improve",
    description:
      "Submit trades for mentor feedback, refine your process, and build long-term consistency.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-14 sm:py-24 lg:py-28">
      <div className="absolute top-0 left-1/3 w-[360px] h-[360px] rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-[320px] h-[320px] rounded-full bg-accent-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            Learning Path
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            A clear step-by-step system designed to help you learn faster and
            trade with confidence.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative glass rounded-2xl p-4 sm:p-6 overflow-hidden"
            >
              <span className="absolute top-3 right-3 text-3xl font-heading font-black text-white/5">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-3 sm:mb-4">
                <step.icon className="h-5 w-5 text-brand-400" />
              </div>

              <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-surface-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
