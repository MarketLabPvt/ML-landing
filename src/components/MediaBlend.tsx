import { useState } from "react";

type MediaBlendProps = {
  src: string;
  alt: string;
  kind?: "image" | "video";
  heightClassName?: string;
  label?: string;
  poster?: string;
};

export default function MediaBlend({
  src,
  alt,
  kind = "image",
  heightClassName = "h-28",
  label,
  poster,
}: MediaBlendProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const fallbackPoster =
    poster ??
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80";

  return (
    <article className={`relative overflow-hidden rounded-xl border border-white/10 ${heightClassName}`}>
      {kind === "video" && !videoFailed ? (
        <video
          className="h-full w-full object-cover scale-[1.01]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={fallbackPoster}
          onError={() => setVideoFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={kind === "video" ? fallbackPoster : src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover scale-[1.01]"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-br from-surface-950/45 via-surface-950/20 to-surface-950/75" />
      <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ background: "linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))" }} />
      {label ? (
        <span className="absolute left-2.5 bottom-2 rounded-full border border-white/15 bg-surface-900/80 px-2 py-0.5 text-[10px] text-surface-100">
          {label}
        </span>
      ) : null}
    </article>
  );
}
