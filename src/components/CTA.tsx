import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Send, CheckCircle, ChevronDown } from "lucide-react";

export default function CTA() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormOpen(false);
      formRef.current?.reset();
    }, 2500);
  };

  return (
    <section id="contact" className="relative py-12 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* ── Background ── */}
          <div className="absolute inset-0 bg-surface-900" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-15"
            style={{ background: "var(--color-brand-500)" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--color-accent-500)" }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-40 separator-animated"
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, var(--color-brand-500), var(--color-accent-500), transparent 90%)",
            }}
          />

          {/* ── Main content ── */}
          <div className="relative z-10 px-6 py-14 sm:px-16 sm:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/8 px-3 py-1 mb-5">
                <Zap className="h-3 w-3 text-accent-400" />
                <span className="text-[11px] font-medium text-brand-300 tracking-wide uppercase">
                  Limited Time Enrollment Open
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Ready to Start Your{" "}
                <span className="text-gradient">Trading Journey</span>?
              </h2>

              <p className="text-surface-300 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                Join thousands of students who've transformed their financial
                future. Get started with a plan that matches your learning
                goals.
              </p>
            </div>

            {/* Right: Media + actions */}
            <div className="w-full lg:w-[390px] shrink-0">
              <div className="flex flex-col gap-3 w-full">
                <a href="#pricing" className="group relative w-full">
                  <div className="absolute -inset-px rounded-xl bg-linear-to-r from-brand-500 via-accent-500 to-brand-500 bg-size-[200%_100%] animate-[shimmer_3s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2 rounded-xl bg-surface-950/80 px-8 py-3.5 text-sm sm:text-base font-semibold text-white group-hover:bg-surface-900/80 transition-colors">
                    View Pricing
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
                <button
                  onClick={() => {
                    setFormOpen(!formOpen);
                    setSubmitted(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/15 transition-all active:scale-[0.98]"
                >
                  Have a Question?
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${formOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ── Expandable contact form ── */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 overflow-hidden"
              >
                <div className="border-t border-white/5 px-6 pb-10 pt-7 sm:px-16">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 py-4 justify-center"
                    >
                      <CheckCircle className="h-5 w-5 text-brand-400" />
                      <span className="text-sm font-medium text-white">
                        Message sent! We'll reply within 24 hours.
                      </span>
                    </motion.div>
                  ) : (
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="max-w-5xl mx-auto"
                    >
                      {/* Terminal-style form */}
                      <div className="rounded-2xl border border-white/8 bg-surface-950/70 overflow-hidden">
                        {/* Terminal chrome */}
                        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-white/5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/60" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
                          <span className="ml-3 text-xs font-mono text-surface-400">
                            contact@market-lab.app
                          </span>
                        </div>

                        <div className="p-5 sm:p-6 space-y-4">
                          {/* Name + Email + Phone row */}
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-brand-500 font-mono text-xs select-none shrink-0">
                                →
                              </span>
                              <input
                                type="text"
                                required
                                placeholder="your_name"
                                aria-label="Name"
                                className="w-full bg-transparent text-base font-mono text-surface-100 placeholder:text-surface-400 outline-none caret-brand-300"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-accent-500 font-mono text-xs select-none shrink-0">
                                →
                              </span>
                              <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                aria-label="Email"
                                className="w-full bg-transparent text-base font-mono text-surface-100 placeholder:text-surface-400 outline-none caret-accent-300"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-brand-500 font-mono text-xs select-none shrink-0">
                                →
                              </span>
                              <input
                                type="tel"
                                required
                                placeholder="+91 9876543210"
                                aria-label="Phone Number"
                                className="w-full bg-transparent text-base font-mono text-surface-100 placeholder:text-surface-400 outline-none caret-brand-300"
                              />
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-white/10 separator-animated" />

                          {/* Message */}
                          <div className="flex gap-2">
                            <span className="text-brand-500 font-mono text-xs select-none shrink-0 pt-0.5">
                              $
                            </span>
                            <textarea
                              required
                              rows={3}
                              placeholder="type your message here..."
                              aria-label="Message"
                              className="w-full bg-transparent text-base font-mono text-surface-100 placeholder:text-surface-400 outline-none resize-none caret-brand-300"
                            />
                          </div>

                          {/* Divider + submit */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-mono text-surface-400">
                              press send or ⌘+enter
                            </span>
                            <button
                              type="submit"
                              className="group flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-500 pl-5 pr-4 py-2 text-sm font-semibold text-white font-mono transition-colors active:scale-[0.97] shadow-lg shadow-brand-600/20"
                            >
                              send
                              <Send className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
