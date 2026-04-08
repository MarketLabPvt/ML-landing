import { Mail } from "lucide-react";
import expandedLogo from "../assets/logo-expanded.png";

const footerLinks = {
  Platform: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
  ],
  Company: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  Support: [
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface-950">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px -translate-y-px">
        <div
          className="w-full h-full opacity-40 separator-animated"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, var(--color-brand-500), var(--color-accent-500), transparent 90%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="inline-block mb-4 rounded-lg overflow-hidden shadow-sm shadow-black/20"
            >
              <img
                src={expandedLogo}
                alt="Market Lab"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
            <p className="text-sm text-surface-400 leading-relaxed mb-5 sm:mb-6 max-w-sm">
              Learn, practice, and grow with expert-led trading education,
              practical mentorship, and a focused community built for serious
              traders.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-surface-400">
              <a
                href="mailto:hello@marketlabedu.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors w-fit"
              >
                <Mail className="h-4 w-4 text-surface-500 shrink-0" />
                hello@marketlabedu.com
              </a>
              {/* <a
                href="tel:+15551234567"
                className="flex items-center gap-2.5 hover:text-white transition-colors w-fit"
              >
                <Phone className="h-4 w-4 text-surface-500 shrink-0" />
                +1 (555) 123-4567
              </a> */}
              {/* <span className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-surface-500 shrink-0" />
                New York, NY
              </span> */}
            </div>

            {/* Social Icons */}
            {/* <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-surface-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:grid-cols-3 lg:col-span-3">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="font-heading text-sm font-semibold text-white mb-3 sm:mb-4">
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-surface-400 hover:text-white transition-colors py-0.5 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-surface-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Market Lab. All rights reserved.
          </p>
          <p className="text-xs text-surface-600">
            Built for traders, by traders.
          </p>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="border-t border-white/5 px-4 sm:px-6 py-3 sm:py-4">
        <p className="mx-auto max-w-4xl text-center text-[10px] sm:text-[11px] text-surface-600 leading-relaxed">
          Trading involves substantial risk and is not suitable for every
          investor. Past performance is not indicative of future results. Market
          Lab provides educational content only and does not provide financial
          advice.
        </p>
      </div>
    </footer>
  );
}
