import { motion } from "framer-motion";
import { Check, MessageCircleQuestion, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const plans = [
  {
    name: "Core",
    price: "$50",
    period: "one-time fee",
    description: "Strong foundation plan for beginners building consistency.",
    features: [
      "Pre-recorded course access",
      "Doubt-clearing Zoom sessions",
      "Lifetime community access",
      "Structured step-by-step lessons",
      "Weekly learning roadmap",
    ],
    cta: "Enroll Now",
    highlighted: false,
  },
  {
    name: "Edge",
    price: "$300",
    period: "one-time fee",
    description: "Next-level plan for traders ready for live market execution.",
    features: [
      "All Core features",
      "Live trading with mentors",
      "24-hour mentor support",
      "$250 live trading account when the course is completed",
      "25% bonus on first deposit within 30 days of course enrollment",
    ],
    cta: "Enroll Now",
    highlighted: true,
  },
  {
    name: "Apex",
    price: "$500",
    period: "one-time fee",
    description:
      "Advanced plan for traders aiming for premium mentorship and scale.",
    features: [
      "All Edge features",
      "1-on-1 mentorship",
      "Premium community access",
      "$400 live trading account when the course is completed",
      "50% bonus on first deposit within 30 days of course enrollment",
    ],
    cta: "Enroll Now",
    highlighted: false,
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

export default function Pricing() {
  const usdPrices = useMemo(
    () =>
      plans.map((plan) =>
        Number.parseFloat(plan.price.replace("$", "").trim()),
      ),
    [],
  );
  const [usdToInrRate, setUsdToInrRate] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsdToInrRate = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as { rates?: { INR?: number } };
        const liveRate = data.rates?.INR;
        if (typeof liveRate === "number" && Number.isFinite(liveRate)) {
          setUsdToInrRate(liveRate);
        }
      } catch {
        // Keep USD pricing visible if rate fetch fails.
      }
    };

    fetchUsdToInrRate();
    return () => controller.abort();
  }, []);

  const isHighlightedBonusFeature = (_planName: string, feature: string) =>
    [
      "$250 live trading account when the course is completed",
      "$400 live trading account when the course is completed",
      "25% bonus on first deposit within 30 days of course enrollment",
      "50% bonus on first deposit within 30 days of course enrollment",
    ].some((highlightText) => feature.includes(highlightText));

  const handleHaveQuestionClick = () => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("open-contact-form"));
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
    });
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-brand-600/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-accent-500/4 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            Pricing
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Invest in Your <span className="text-gradient">Future</span>
          </h2>
          <p className="mx-auto max-w-2xl text-surface-300 text-base sm:text-lg px-2">
            Choose the plan that matches your ambition and start your trading
            journey today.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:gap-8 lg:grid-cols-3 items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`relative ${plan.highlighted ? "lg:-translate-y-2" : ""}`}
            >
              <div
                className={`relative h-full rounded-3xl border p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-brand-400/40 bg-linear-to-b from-brand-500/12 via-surface-900/95 to-surface-900 shadow-[0_18px_45px_-22px_rgba(59,130,246,0.55)]"
                    : "border-white/10 bg-linear-to-b from-white/4 to-white/1 hover:border-white/20"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

                {plan.highlighted && (
                  <div className="absolute z-20 -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/20 bg-linear-to-r from-brand-500 to-accent-500 px-4 py-1 whitespace-nowrap shadow-lg shadow-brand-500/25">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative mb-5">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                      plan.highlighted
                        ? "border-brand-300/40 bg-brand-400/15 text-brand-100"
                        : "border-white/15 bg-white/5 text-surface-300"
                    }`}
                  >
                    {plan.highlighted ? "Recommended" : "Plan"}
                  </span>
                  <h3
                    className={`mt-4 font-heading text-3xl leading-none font-semibold tracking-[0.04em] ${
                      plan.highlighted ? "text-gradient" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p className="relative text-sm text-surface-300 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="relative mb-6 h-px w-full bg-white/10 separator-animated" />

                <div className="relative mb-7 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                  <span className="font-heading text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-surface-400 text-sm">
                    {plan.period}
                  </span>
                  {usdToInrRate && (
                    <p className="mt-2 text-sm text-surface-300">
                      Approx.{" "}
                      <span className="font-semibold text-surface-100">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(usdPrices[i] * usdToInrRate)}
                      </span>{" "}
                      at live USD/INR rate
                    </p>
                  )}
                </div>

                <ul className="relative flex flex-col gap-3 mb-7 flex-1">
                  {plan.features.map((feat, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-surface-200"
                    >
                      {isHighlightedBonusFeature(plan.name, feat) ? (
                        <Star className="h-4 w-4 mt-0.5 shrink-0 text-accent-300" />
                      ) : (
                        <Check className="h-4 w-4 text-accent-400/90 mt-0.5 shrink-0" />
                      )}
                      <span
                        className={`flex-1 ${
                          isHighlightedBonusFeature(plan.name, feat)
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://marketlabedu.com/signup"
                  target="_blank"
                  rel="noreferrer"
                  className={`relative block text-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-linear-to-r from-brand-600 to-accent-600 text-white shadow-lg shadow-brand-600/25 hover:from-brand-500 hover:to-accent-500"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-9 flex justify-center">
          <div className="group relative w-full max-w-xl rounded-xl border border-white/10 bg-linear-to-r from-white/5 via-white/3 to-white/5 p-1">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(60%_120%_at_50%_0%,rgba(59,130,246,0.15),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-col items-center gap-3 rounded-[10px] bg-surface-900/80 px-4 py-3 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-2 text-surface-300">
                <MessageCircleQuestion className="h-4 w-4 text-accent-300" />
                <p className="text-sm">Need help choosing the right plan?</p>
              </div>
              <button
                type="button"
                onClick={handleHaveQuestionClick}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Talk to Us
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-surface-300">
            <span className="font-semibold text-white">Important: </span> We
            currently accept payments in USDT only. Full assistance is provided
            throughout payment and onboarding.
          </p>
        </div>
      </div>
    </section>
  );
}
