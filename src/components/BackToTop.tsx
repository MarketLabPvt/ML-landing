import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-50"
        >
          {/* Gradient ring border */}
          <div className="absolute -inset-px rounded-full bg-linear-to-tr from-brand-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full glass border border-white/10 text-surface-300 group-hover:text-white group-hover:border-transparent active:scale-95 transition-all shadow-lg">
            <ChevronUp className="h-5 w-5" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
