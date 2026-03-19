"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const SPLINE_URL = "https://prod.spline.design/1aIQvL19duA2ZeNn/scene.splinecode?v=15";
const MOBILE_BREAKPOINT = 768;

export default function SplineScene() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const splineApp = useRef<Application | null>(null);

  // Only render Spline on the client (needs canvas/WebGL)
  useEffect(() => {
    setMounted(true);
  }, []);

  const switchCamera = useCallback((spline: Application) => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (!isMobile) return;

    try {
      spline.emitEvent("mouseDown", "Camera mobile");
    } catch {}

    try {
      const cam = spline.findObjectByName("Camera mobile");
      if (cam) cam.emitEvent("mouseDown");
    } catch {}

    try {
      spline.emitEvent("start", "Camera mobile");
    } catch {}
  }, []);

  const handleSplineLoad = useCallback((spline: Application) => {
    splineApp.current = spline;
    switchCamera(spline);
    setTimeout(() => switchCamera(spline), 500);
    setTimeout(() => switchCamera(spline), 1500);
    setLoaded(true);
  }, [switchCamera]);

  if (!mounted) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.6s ease-in",
      }}
    >
      <Spline
        scene={SPLINE_URL}
        onLoad={handleSplineLoad}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
