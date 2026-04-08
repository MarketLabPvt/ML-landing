import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);
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

    const applyStyles = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      const ringScale = pressedRef.current
        ? interactiveRef.current
          ? 1.04
          : 0.92
        : interactiveRef.current
          ? 1.12
          : 1;

      const dotScale = pressedRef.current ? 0.9 : interactiveRef.current ? 1.04 : 1;
      const opacity = visibleRef.current ? 1 : 0;

      ring.style.opacity = String(opacity);
      dot.style.opacity = String(opacity);
      ring.style.transform = `translate3d(${ringXRef.current}px, ${ringYRef.current}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${mouseXRef.current}px, ${mouseYRef.current}px, 0) translate(-50%, -50%) scale(${dotScale})`;
    };

    const animate = () => {
      // Lightweight smoothing for ring follow
      ringXRef.current += (mouseXRef.current - ringXRef.current) * 0.28;
      ringYRef.current += (mouseYRef.current - ringYRef.current) * 0.28;
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
    };
    const onUp = () => {
      pressedRef.current = false;
    };

    // Initialize at viewport center to avoid jump
    mouseXRef.current = window.innerWidth / 2;
    mouseYRef.current = window.innerHeight / 2;
    ringXRef.current = mouseXRef.current;
    ringYRef.current = mouseYRef.current;
    applyStyles();
    rafRef.current = window.requestAnimationFrame(animate);

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
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden className="custom-cursor-ring" />
      <div ref={dotRef} aria-hidden className="custom-cursor-dot" />
    </>
  );
}
