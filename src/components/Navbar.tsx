import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-full.png";

const navLinks = [
  { label: "Home", href: "#home" },
  // { label: "Markets", href: "#markets" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  // { label: "Courses", href: "#courses" },
  // { label: "Mentors", href: "#mentors" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50"
    >
      {/* ── Floating pill navbar ── */}
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6">
        <nav
          className={`relative flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-surface-900/50 backdrop-blur-2xl shadow-xl shadow-black/25"
              : "bg-white/2 backdrop-blur-sm"
          }`}
        >
          {/* Subtle border */}
          <div
            className={`absolute inset-0 rounded-2xl border transition-colors duration-500 pointer-events-none ${
              scrolled || mobileOpen ? "border-white/4" : "border-white/3"
            }`}
          />

          {/* Bottom gradient glow when scrolled */}
          {scrolled && (
            <div
              className="absolute -bottom-px left-1/4 right-1/4 h-px opacity-20 pointer-events-none separator-animated"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-brand-500), var(--color-accent-500), transparent)",
              }}
            />
          )}

          {/* Logo */}
          <a
            href="#home"
            className="relative flex items-center shrink-0 rounded-lg"
          >
            <img
              src={logo}
              alt="Market Lab"
              className="w-28 sm:w-32 lg:w-36 h-auto"
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-0.5 relative">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-3 py-1.5 text-[13px] font-medium text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 relative">
            <a
              href="https://market-lab-ofs8.onrender.com/login"
              target="_blank"
              className="px-3 py-1.5 text-[13px] font-medium text-surface-300 hover:text-white transition-colors"
            >
              Log In
            </a>
            <a
              href="https://market-lab-ofs8.onrender.com/signup"
              target="_blank"
              className="group relative"
            >
              <div className="absolute -inset-px rounded-lg bg-linear-to-r from-brand-500/50 to-accent-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="relative px-4 py-1.5 text-[13px] font-semibold rounded-lg bg-brand-600/90 text-white hover:bg-brand-500/90 transition-colors">
                Get Started
              </div>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative text-white p-1.5 -mr-1 active:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 rounded-2xl bg-surface-900/60 backdrop-blur-2xl border border-white/4 shadow-xl shadow-black/30 overflow-hidden"
            >
              <div className="flex flex-col gap-0.5 p-3 max-h-[calc(100svh-120px)] overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-surface-200 hover:text-white rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-2">
                  <a
                    href="https://market-lab-ofs8.onrender.com/login"
                    target="_blank"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-center text-surface-200 hover:text-white transition-colors rounded-xl"
                  >
                    Log In
                  </a>
                  <a
                    href="https://market-lab-ofs8.onrender.com/signup"
                    target="_blank"
                    onClick={() => setMobileOpen(false)}
                    className="px-5 py-3 text-sm font-semibold text-center rounded-xl bg-brand-600/90 text-white hover:bg-brand-500/90 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
