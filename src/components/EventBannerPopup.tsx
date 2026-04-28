import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  fetchPublicEvents,
  type PublicEvent,
} from "../services/events";

type BannerStatus = "Live Now" | "Closing Soon" | "Upcoming";

const statusClassMap: Record<BannerStatus, string> = {
  "Live Now":
    "border-emerald-300/40 bg-emerald-400/15 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.25)]",
  "Closing Soon":
    "border-amber-300/40 bg-amber-400/15 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.22)]",
  Upcoming:
    "border-accent-300/30 bg-accent-400/10 text-accent-100 shadow-[0_0_24px_rgba(34,211,238,0.16)]",
};

function getStatus(event: PublicEvent): BannerStatus {
  const now = Date.now();
  const startAt = new Date(event.startDate).getTime();
  const deadlineAt = new Date(event.registrationDeadline).getTime();
  const closingSoonMs = 48 * 60 * 60 * 1000;

  if (startAt - now <= 30 * 60 * 1000 && startAt - now >= -3 * 60 * 60 * 1000) {
    return "Live Now";
  }
  if (deadlineAt - now <= closingSoonMs) {
    return "Closing Soon";
  }
  return "Upcoming";
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  return { datePart, timePart };
}

function formatStartsIn(iso: string) {
  const diffMs = new Date(iso).getTime() - Date.now();
  if (diffMs <= 0) return "Started";
  const totalMinutes = Math.floor(diffMs / (60 * 1000));
  if (totalMinutes < 60) return `Starts in ${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  if (hours < 24) return `Starts in ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Starts in ${days}d`;
}

function formatEventPrice(event: PublicEvent) {
  const isInr = event.paymentMethod?.type === "inr";
  const amount = Number.isFinite(event.priceUsd) ? event.priceUsd : 0;

  if (amount <= 0) {
    return { amountLabel: "Free", currencyLabel: isInr ? "INR" : "USD" };
  }

  if (isInr) {
    return {
      amountLabel: `₹${amount.toLocaleString("en-IN")}`,
      currencyLabel: event.paymentMethod?.displayLabel?.trim() || "INR Payment",
    };
  }

  return {
    amountLabel: `$${amount.toLocaleString("en-US")}`,
    currencyLabel:
      event.paymentMethod?.displayLabel?.trim() ||
      (event.paymentMethod?.type === "usdt" ? "USDT Payment" : "USD"),
  };
}

export default function EventBannerPopup() {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    fetchPublicEvents()
      .then((list) => {
        if (mounted) {
          setEvents(list);
        }
      })
      .catch(() => {
        if (mounted) {
          setEvents([]);
        }
      });

    const timer = setTimeout(() => {
      if (mounted) {
        setOpen(true);
      }
    }, 700);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open || events.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [open, events.length]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [open]);

  const orderedEvents = useMemo(() => {
    if (!events.length) return null;
    return [...events].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
  }, [events]);

  const featuredEvent = useMemo(() => {
    if (!orderedEvents?.length) return null;
    const safeIndex = ((activeIndex % orderedEvents.length) + orderedEvents.length) % orderedEvents.length;
    return orderedEvents[safeIndex];
  }, [orderedEvents, activeIndex]);

  if (!featuredEvent) return null;

  const status = getStatus(featuredEvent);
  const { datePart, timePart } = formatDateTime(featuredEvent.startDate);
  const startsInText = formatStartsIn(featuredEvent.startDate);
  const ctaHref = `https://app.marketlabedu.com/events/${featuredEvent.slug}`;
  const priceDisplay = formatEventPrice(featuredEvent);
  const totalEvents = orderedEvents?.length ?? 0;
  const safeActiveIndex = totalEvents
    ? ((activeIndex % totalEvents) + totalEvents) % totalEvents
    : 0;
  const occupancyPct =
    featuredEvent.maxParticipants > 0
      ? Math.min(
          100,
          Math.round(
            (featuredEvent.occupiedSeats / featuredEvent.maxParticipants) * 100,
          ),
        )
      : 0;

  const closePopup = () => {
    setOpen(false);
  };
  const openPopup = () => setOpen(true);
  const prevEvent = () =>
    setActiveIndex((current) =>
      totalEvents ? (current - 1 + totalEvents) % totalEvents : current,
    );
  const nextEvent = () =>
    setActiveIndex((current) =>
      totalEvents ? (current + 1) % totalEvents : current,
    );

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openPopup}
          className="fixed bottom-3 right-3 left-3 sm:bottom-4 sm:right-4 sm:left-auto z-70 group w-auto sm:w-[250px] rounded-2xl border border-white/15 bg-surface-900/90 p-3 text-left shadow-2xl shadow-black/45 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-accent-300/35"
        >
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-r from-brand-500/12 via-transparent to-accent-400/12 opacity-70" />
          <span className="relative flex items-center justify-between gap-3">
            <span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/35 bg-emerald-400/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Live
              </span>
              <span className="mt-2 block text-base font-bold leading-tight text-white tracking-tight">
                {totalEvents > 1 ? `Explore ${totalEvents} Events` : "Explore Event"}
              </span>
              <span className="mt-0.5 block text-xs text-surface-300">
                Limited seats · Tap to open
              </span>
            </span>
            <span className="relative grid h-10 w-10 place-items-center rounded-full border border-accent-300/45 bg-accent-400/12 text-accent-100 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <span className="absolute inset-0 rounded-full border border-accent-300/35 animate-ping opacity-40" />
              <ArrowUpRight className="relative h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </span>
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 flex items-end sm:items-center justify-center overflow-hidden p-0 sm:p-6"
            aria-modal="true"
            role="dialog"
            aria-label="Featured event popup"
          >
            <button
              aria-label="Close event popup"
              className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
              onClick={closePopup}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full sm:max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/12 bg-surface-900/90 shadow-2xl shadow-black/45 backdrop-blur-xl"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
              </div>

              <button
                type="button"
                onClick={closePopup}
                className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 rounded-full border border-white/15 bg-surface-900/80 p-2 text-surface-200 hover:text-white"
                aria-label="Dismiss popup"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10 grid min-w-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="min-w-0 p-3.5 pb-4 sm:p-8 lg:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusClassMap[status]}`}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-accent-300" />
                      {status}
                    </span>
                    <span className="hidden sm:inline-flex rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-surface-200 max-w-full sm:max-w-[320px] truncate">
                      {featuredEvent.deliveryPlatform}
                    </span>
                    <span className="rounded-full border border-brand-300/25 bg-brand-400/10 px-2.5 py-1 text-[10px] font-medium text-brand-100">
                      {startsInText}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-[clamp(1.15rem,5.8vw,1.6rem)] sm:text-4xl font-extrabold text-white leading-tight tracking-tight wrap-break-word line-clamp-2 sm:line-clamp-none">
                    {featuredEvent.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-xs sm:text-[15px] text-surface-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {featuredEvent.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm">
                      <p className="flex items-center gap-2 text-xs text-surface-300">
                        <CalendarDays className="h-3.5 w-3.5 text-brand-300" />
                        Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{datePart}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm">
                      <p className="flex items-center gap-2 text-xs text-surface-300">
                        <Clock3 className="h-3.5 w-3.5 text-accent-300" />
                        Time
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white wrap-break-word">
                        {timePart}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm">
                      <p className="flex items-center gap-2 text-xs text-surface-300">
                        <Users className="h-3.5 w-3.5 text-surface-200" />
                        Seats left
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {featuredEvent.seatsRemaining}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 hidden sm:block">
                    <div className="mb-1.5 flex items-center justify-between text-[11px] text-surface-400">
                      <span>Seats filling fast</span>
                      <span>{occupancyPct}% filled</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-800">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-brand-500 via-brand-400 to-accent-300 shadow-[0_0_16px_rgba(34,211,238,0.35)]"
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/14 bg-linear-to-r from-white/6 to-brand-500/8 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-surface-400">
                          Program Fee
                        </p>
                        <p className="mt-1 font-heading text-xl sm:text-3xl leading-none font-extrabold text-white">
                          {priceDisplay.amountLabel}
                        </p>
                        <p className="mt-1 text-xs text-surface-300 wrap-break-word">
                          {priceDisplay.currencyLabel}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex self-start rounded-full border border-brand-300/35 bg-brand-400/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-100">
                        Limited seats
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
                      <a
                        href={ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-xl bg-linear-to-r from-brand-600 to-accent-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/35 transition-all hover:-translate-y-0.5 hover:brightness-110"
                      >
                        Register Now
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={closePopup}
                        className="hidden sm:inline-flex w-full sm:w-auto rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-surface-200 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>

                  {totalEvents > 1 && (
                    <div className="mt-3 sm:hidden rounded-xl border border-white/10 bg-white/4 px-2 py-1.5">
                      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                        <button
                          type="button"
                          onClick={prevEvent}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 text-surface-100 hover:text-white hover:bg-white/10"
                          aria-label="Previous event"
                        >
                          <ChevronLeft className="h-4.5 w-4.5" />
                        </button>
                        <div className="flex items-center justify-center gap-2">
                          <span className="min-w-10 text-center text-xs font-semibold text-surface-200">
                            {safeActiveIndex + 1} / {totalEvents}
                          </span>
                          <div className="flex items-center justify-center gap-1.5">
                            {orderedEvents?.map((event, idx) => (
                              <button
                                key={event.id}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                  idx === safeActiveIndex
                                    ? "bg-accent-300"
                                    : "bg-white/25 hover:bg-white/40"
                                }`}
                                aria-label={`Show event ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={nextEvent}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 text-surface-100 hover:text-white hover:bg-white/10"
                          aria-label="Next event"
                        >
                          <ChevronRight className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {totalEvents > 1 && (
                    <div className="mt-4 hidden sm:block rounded-2xl border border-white/10 bg-white/4 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-surface-300">
                          More events
                        </p>
                        <span className="text-xs text-surface-400">
                          {safeActiveIndex + 1}/{totalEvents}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        {orderedEvents?.map((event, idx) => (
                          <button
                            key={event.id}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${
                              idx === safeActiveIndex
                                ? "bg-accent-300"
                                : "bg-white/20 hover:bg-white/35"
                            }`}
                            aria-label={`Show event ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={prevEvent}
                          className="rounded-full border border-white/15 p-2 text-surface-200 hover:text-white hover:bg-white/5"
                          aria-label="Previous event"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextEvent}
                          className="rounded-full border border-white/15 p-2 text-surface-200 hover:text-white hover:bg-white/5"
                          aria-label="Next event"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <p className="w-full truncate text-xs sm:text-sm text-surface-300">
                          {featuredEvent.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden sm:block order-first lg:order-0 relative h-44 sm:h-64 lg:h-auto min-h-0 lg:min-h-full min-w-0 border-b lg:border-b-0 lg:border-t-0 lg:border-l border-white/10">
                  {featuredEvent.bannerUrl ? (
                    <img
                      src={featuredEvent.bannerUrl}
                      alt={featuredEvent.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-brand-900/40 via-surface-900 to-accent-900/40" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-surface-950/78 via-surface-950/28 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/12 bg-surface-900/70 p-2.5 sm:p-3 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-wide text-surface-400">
                      Featured session
                    </p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-white truncate">
                      {featuredEvent.deliveryPlatform}
                    </p>
                    <p className="mt-1 text-xs text-surface-300">
                      {featuredEvent.occupiedSeats}/{featuredEvent.maxParticipants} enrolled
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
