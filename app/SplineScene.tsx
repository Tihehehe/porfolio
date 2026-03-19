"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

// Lazy-load the 3.8MB Spline runtime — doesn't block initial page render
const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_URL = "https://prod.spline.design/1aIQvL19duA2ZeNn/scene.splinecode?v=15";
const MOBILE_BREAKPOINT = 768;

function LoadingMonogram({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a0a2e",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease-out",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes monogram-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        style={{
          width: 64,
          height: 64,
          animation: "monogram-pulse 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

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
    <>
      <LoadingMonogram visible={!loaded} />
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease-in",
        }}
      >
        <Suspense fallback={null}>
          <Spline
            scene={SPLINE_URL}
            onLoad={handleSplineLoad}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
    </>
  );
}
