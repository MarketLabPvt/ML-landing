import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor: neon ring + comet trail.
 * Fine pointers only; respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);
  const tailXRef = useRef(0);
  const tailYRef = useRef(0);
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsFinePointer =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setEnabled(supportsFinePointer && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");
    return () => document.body.classList.remove("custom-cursor-enabled");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]';

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(interactiveSelector));

    const playPulse = () => {
      const pulse = pulseRef.current;
      if (!pulse) return;
      pulse.classList.remove("ncursor-pulse--play");
      void pulse.offsetWidth;
      pulse.classList.add("ncursor-pulse--play");
    };

    const applyStyles = () => {
      const ring = ringRef.current;
      const core = coreRef.current;
      const tail = tailRef.current;
      const pulse = pulseRef.current;
      if (!ring || !core || !tail || !pulse) return;

      const opacity = visibleRef.current ? 1 : 0;
      const ringScale = pressedRef.current
        ? interactiveRef.current
          ? 0.9
          : 0.88
        : interactiveRef.current
          ? 1.18
          : 1;

      ring.style.opacity = String(opacity * 0.96);
      core.style.opacity = String(opacity);
      tail.style.opacity = String(opacity * 0.72);
      pulse.style.visibility = opacity ? "visible" : "hidden";

      ring.dataset.interactive = interactiveRef.current ? "true" : "false";
      ring.dataset.pressed = pressedRef.current ? "true" : "false";
      tail.dataset.interactive = interactiveRef.current ? "true" : "false";

      ring.style.transform = `translate3d(${ringXRef.current}px, ${ringYRef.current}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      core.style.transform = `translate3d(${mouseXRef.current}px, ${mouseYRef.current}px, 0) translate(-50%, -50%)`;
      tail.style.transform = `translate3d(${tailXRef.current}px, ${tailYRef.current}px, 0) translate(-50%, -50%)`;
      pulse.style.transform = `translate3d(${mouseXRef.current}px, ${mouseYRef.current}px, 0)`;
    };

    const animate = () => {
      const ringLag = interactiveRef.current ? 0.28 : 0.22;
      ringXRef.current += (mouseXRef.current - ringXRef.current) * ringLag;
      ringYRef.current += (mouseYRef.current - ringYRef.current) * ringLag;
      tailXRef.current += (mouseXRef.current - tailXRef.current) * 0.1;
      tailYRef.current += (mouseYRef.current - tailYRef.current) * 0.1;
      applyStyles();
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX;
      mouseYRef.current = event.clientY;
      if (!visibleRef.current) visibleRef.current = true;
      interactiveRef.current = isInteractiveTarget(event.target);
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) visibleRef.current = false;
    };

    const onEnter = () => {
      visibleRef.current = true;
    };

    const onDown = () => {
      pressedRef.current = true;
      playPulse();
    };

    const onUp = () => {
      pressedRef.current = false;
    };

    const onPulseEnd = (event: AnimationEvent) => {
      if (event.animationName !== "ncursor-pulse") return;
      pulseRef.current?.classList.remove("ncursor-pulse--play");
    };

    mouseXRef.current = window.innerWidth / 2;
    mouseYRef.current = window.innerHeight / 2;
    ringXRef.current = mouseXRef.current;
    ringYRef.current = mouseYRef.current;
    tailXRef.current = mouseXRef.current;
    tailYRef.current = mouseYRef.current;
    applyStyles();

    rafRef.current = window.requestAnimationFrame(animate);

    const pulseEl = pulseRef.current;
    pulseEl?.addEventListener("animationend", onPulseEnd);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      pulseEl?.removeEventListener("animationend", onPulseEnd);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={tailRef} className="ncursor-tail" aria-hidden />
      <div ref={ringRef} className="ncursor-ring" aria-hidden />
      <div ref={coreRef} className="ncursor-core" aria-hidden />
      <div ref={pulseRef} className="ncursor-pulse" aria-hidden />
    </>
  );
}
