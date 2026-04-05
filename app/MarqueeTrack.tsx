"use client";

import { useEffect, useRef } from "react";

export default function MarqueeTrack({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && trackRef.current) {
        // Force animation restart by toggling the class
        const el = trackRef.current;
        el.style.animationName = "none";
        // Trigger reflow
        void el.offsetWidth;
        el.style.animationName = "";
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div ref={trackRef} className="marquee-track select-none">
      {children}
    </div>
  );
}
