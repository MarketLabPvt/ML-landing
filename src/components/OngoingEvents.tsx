import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, Users } from "lucide-react";
import { fetchPublicEvents, type PublicEvent } from "../services/events";

type EventStatus = "Live" | "Closing Soon" | "Upcoming";

const statusClassMap: Record<EventStatus, string> = {
  Live: "border-emerald-400/40 bg-emerald-400/12 text-emerald-200",
  "Closing Soon": "border-amber-400/40 bg-amber-400/12 text-amber-200",
  Upcoming: "border-brand-400/40 bg-brand-400/12 text-brand-200",
};

export default function OngoingEvents() {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const data = await fetchPublicEvents();
        if (!isMounted) return;
        setEvents(data);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load events.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleEvents = useMemo(() => events.slice(0, 6), [events]);

  const formatEventStatus = (event: PublicEvent): EventStatus => {
    const now = Date.now();
    const startAt = new Date(event.startDate).getTime();
    const deadlineAt = new Date(event.registrationDeadline).getTime();
    const deadlineDiffMs = deadlineAt - now;
    const twoDaysMs = 48 * 60 * 60 * 1000;

    if (startAt <= now && deadlineAt >= now) {
      return "Live";
    }
    if (deadlineDiffMs <= twoDaysMs) {
      return "Closing Soon";
    }
    return "Upcoming";
  };

  const formatPrice = (priceUsd: number) => {
    if (priceUsd <= 0) return "Free";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(priceUsd);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });

  return (
    <section id="events" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-300" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-200">
              Ongoing Events
            </span>
          </div>

          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Learn live with
            <span className="text-gradient"> expert-led sessions</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-surface-300">
            Weekly market sessions, strategy breakdowns, and trading workshops
            built for active learners. Seats are limited for focused mentor
            attention.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="glass rounded-2xl border border-white/8 p-5 sm:p-6 text-surface-300">
            Loading ongoing events...
          </div>
        ) : error ? (
          <div className="glass rounded-2xl border border-rose-400/30 bg-rose-500/5 p-5 sm:p-6 text-rose-100">
            {error}
          </div>
        ) : visibleEvents.length === 0 ? (
          <div className="glass rounded-2xl border border-white/8 p-5 sm:p-6 text-surface-300">
            No ongoing events right now. Please check back soon.
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleEvents.map((event, idx) => {
              const status = formatEventStatus(event);
              const seatsFilled =
                event.maxParticipants > 0
                  ? (event.occupiedSeats / event.maxParticipants) * 100
                  : 0;
              const ctaLabel = status === "Live" ? "Join Live" : "Register";
              const ctaHref = `https://app.marketlabedu.com/events/${event.slug}`;

              return (
                <motion.article
                  key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass group rounded-2xl border border-white/8 p-5 sm:p-6"
              >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-surface-400">
                        {event.deliveryPlatform}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-bold text-white">
                        {event.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusClassMap[status]}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-sm text-surface-300">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-brand-300" />
                      {formatDate(event.startDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-accent-300" />
                      {formatTime(event.startDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-surface-200" />
                      {event.seatsRemaining} seats left
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-surface-400">
                      <span>Seat availability</span>
                      <span>
                        {event.occupiedSeats}/{event.maxParticipants} filled
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-brand-500 to-accent-400 transition-all duration-500"
                        style={{ width: `${Math.min(seatsFilled, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-heading text-xl font-bold text-white">
                      {formatPrice(event.priceUsd)}
                    </p>
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                    >
                      {ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
