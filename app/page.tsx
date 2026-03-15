"use client";

import { useCallback, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const MARQUEE_TEXT = "UNDER CONSTRUCTION";

// Duplicate enough times for seamless loop (50% trick)
const repeats = Array(8).fill(`${MARQUEE_TEXT} `).join("");

const SPLINE_URL = "https://prod.spline.design/1aIQvL19duA2ZeNn/scene.splinecode?v=15";
const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const splineApp = useRef<Application | null>(null);

  const switchCamera = useCallback((spline: Application) => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    // Debug: log all scene objects so we can verify the camera name
    try {
      const allObjects = spline.getAllObjects();
      console.log("[Spline] All objects:", allObjects.map(o => `"${o.name}"`).join(", "));
      console.log("[Spline] Events:", JSON.stringify(spline.getSplineEvents()));
    } catch (e) {
      console.warn("[Spline] debug failed:", e);
    }

    if (!isMobile) {
      console.log("[Spline] Desktop viewport, skipping camera switch");
      return;
    }

    console.log("[Spline] Mobile viewport detected, switching camera...");

    // Method 1: emitEvent on Application (triggers Mouse Down → Switch Camera action)
    try {
      spline.emitEvent("mouseDown", "Camera mobile");
      console.log("[Spline] Method 1: emitEvent mouseDown on 'Camera mobile'");
    } catch (e) {
      console.warn("[Spline] Method 1 failed:", e);
    }

    // Method 2: Find the object and emit directly on it
    try {
      const cam = spline.findObjectByName("Camera mobile");
      if (cam) {
        cam.emitEvent("mouseDown");
        console.log("[Spline] Method 2: direct emitEvent on object, uuid:", cam.uuid);
      } else {
        console.warn("[Spline] Method 2: 'Camera mobile' not found by name");
      }
    } catch (e) {
      console.warn("[Spline] Method 2 failed:", e);
    }

    // Method 3: Try 'start' event type as well
    try {
      spline.emitEvent("start", "Camera mobile");
      console.log("[Spline] Method 3: emitEvent start on 'Camera mobile'");
    } catch (e) {
      console.warn("[Spline] Method 3 failed:", e);
    }
  }, []);

  const handleSplineLoad = useCallback((spline: Application) => {
    console.log("[Spline] onLoad fired!");
    splineApp.current = spline;

    // Try immediately
    switchCamera(spline);

    // Retry after delays in case scene isn't fully initialized
    setTimeout(() => switchCamera(spline), 500);
    setTimeout(() => switchCamera(spline), 1500);
  }, [switchCamera]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene={SPLINE_URL} onLoad={handleSplineLoad} />
      </div>

      {/* Nav */}
      <header className="site-header absolute top-0 left-0 right-0 flex items-start justify-between" style={{ padding: "20px 60px", fontFamily: "var(--font-fraunces)", fontSize: "10.5pt", lineHeight: 1.2 }}>
        {/* TL monogram */}
        <img src="/logo.svg" alt="TL" className="w-8 h-8" style={{ width: "34.56px", height: "34.56px" }} />

        {/* Desktop nav items */}
        <div className="nav-desktop flex items-start justify-between text-[#FFBEF6] text-left" style={{ maxWidth: "60%", width: "100%" }}>
          <div>
            <div>Thào Lê</div>
            <div>Design Creative</div>
          </div>

          <div>
            <div>Currently in</div>
            <div>Los Angeles</div>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/in/thao-le-a48418a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-60 transition-opacity"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Hamburger menu — visible below lg */}
        <button className="nav-hamburger" aria-label="Menu">
          <img src="/ham.svg" alt="" style={{ width: "32px", height: "auto" }} />
        </button>
      </header>

      {/* UNDER CONSTRUCTION marquee + Coming Soon */}
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none flex flex-col justify-end" style={{ bottom: "0px", height: "48vh" }}>
        {/* Coming Soon — centered on the marquee */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1, height: "calc(47vh * 0.85)" }}>
          <p
            className="text-[#FFBEF6]"
            style={{ fontFamily: "'Ogg', Georgia, serif", fontStyle: "italic", fontSize: "calc(47vh / 5)", letterSpacing: "0.02em", whiteSpace: "nowrap", textShadow: "0 2px 40px rgba(255, 190, 246, 0.3)", transform: "translateY(17%)" }}
          >
            Coming Soon
          </p>
        </div>

        <div className="marquee-track select-none">
          <span
            className="text-[#e040fb] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Fixture', 'Arial Narrow', sans-serif", fontWeight: 800, fontSize: "47vh", lineHeight: 0.85, letterSpacing: "-0.02em", }}
          >
            {repeats}
          </span>
          {/* Duplicate for seamless loop */}
          <span
            className="text-[#e040fb] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Fixture', 'Arial Narrow', sans-serif", fontWeight: 800, fontSize: "47vh", lineHeight: 0.85, letterSpacing: "-0.02em", }}
          >
            {repeats}
          </span>
        </div>
      </div>
    </main>
  );
}
