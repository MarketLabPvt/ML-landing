import { motion } from "framer-motion";
import { BadgeCheck, ChartNoAxesCombined, Clock3 } from "lucide-react";

const mentors = [
  {
    name: "Daniel Brooks",
    role: "Price Action Mentor",
    initials: "DB",
    experience: "11+ years",
    focus: "Forex & Market Structure",
  },
  {
    name: "Aisha Rahman",
    role: "Risk & Psychology Coach",
    initials: "AR",
    experience: "9+ years",
    focus: "Discipline & Risk Management",
  },
  {
    name: "Carlos Mendes",
    role: "Systematic Trading Mentor",
    initials: "CM",
    experience: "10+ years",
    focus: "Swing & Algo Workflows",
  },
];

export default function Mentors() {
  return (
    <section id="mentors" className="relative py-14 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Meet The Team
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Learn From Real <span className="text-gradient">Mentors</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Active traders and coaches who guide your process with practical,
            market-tested frameworks.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group relative glass rounded-2xl p-4 sm:p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-30">
                <div className="h-full w-full bg-linear-to-r from-transparent via-brand-500/60 to-transparent separator-animated" />
              </div>

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-brand-500/25 bg-linear-to-br from-brand-500/25 to-accent-500/25 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm font-semibold text-white">
                    {mentor.initials}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-surface-300">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent-400" />
                  Verified
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-white">
                {mentor.name}
              </h3>
              <p className="text-sm text-surface-300 mb-4">{mentor.role}</p>

              <div className="space-y-2 text-xs text-surface-300">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-brand-400" />
                  <span>{mentor.experience} in live markets</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartNoAxesCombined className="h-3.5 w-3.5 text-accent-400" />
                  <span>{mentor.focus}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
