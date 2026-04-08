import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is Market Lab suitable for complete beginners?",
    answer:
      "Yes. The curriculum starts from fundamentals and gradually moves to advanced topics. You can begin with no prior trading experience.",
  },
  {
    question: "How much time do I need each week?",
    answer:
      "Most students spend 4-7 hours weekly between lessons, chart review, and practical exercises. You can move at your own pace.",
  },
  {
    question: "Do I get access to live mentorship sessions?",
    answer:
      "Yes. Membership includes live analysis and mentorship touchpoints where you can ask questions and get clarity on setups.",
  },
  {
    question: "Can I practice before trading real money?",
    answer:
      "Absolutely. You can follow guided practice routines and structured exercises to build confidence before going live.",
  },
  {
    question: "Do you provide financial advice or signals?",
    answer:
      "No. Market Lab is an education platform focused on skill development, risk management, and trading process improvement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="relative py-14 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            FAQs
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Quick answers to common questions before you join.
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="glass rounded-xl sm:rounded-2xl overflow-hidden border border-white/5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-medium text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-surface-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-surface-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
