"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger / X button */}
      <button
        className="nav-hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        style={{ position: "relative", zIndex: 51, width: 32, height: 26 }}
      >
        {/* Single SVG — bars morph between hamburger ↔ X */}
        <svg
          width="33"
          height="22"
          viewBox="-1 -1 35 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Bar 1: top hamburger bar ↔ first X arm */}
          <rect
            x="2.5" y="9.5" width="28" height="3" rx="1.5" fill="#FFBEF6"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: open
                ? "rotate(-45deg)"
                : "translate(0.35px, -9.27px) scaleX(1.143)",
            }}
          />
          {/* Bar 2: bottom hamburger bar ↔ second X arm */}
          <rect
            x="2.5" y="9.5" width="28" height="3" rx="1.5" fill="#FFBEF6"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: open
                ? "rotate(45deg)"
                : "translate(5.85px, 0.73px) scaleX(0.75)",
            }}
          />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#4B0082",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "calc(24px + 40px + 64px)",
          paddingLeft: "30px",
          paddingRight: "30px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            transform: open ? "translateY(0)" : "translateY(-20px)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <a
            href="https://www.linkedin.com/in/thao-le-a48418a2/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(48px, 17vw, 64px)",
              color: "#FFBEF6",
              textDecoration: "none",
              lineHeight: 1.42,
              letterSpacing: "-0.05em",
            }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:thaoledesign@gmail.com"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(48px, 17vw, 64px)",
              color: "#FFBEF6",
              textDecoration: "none",
              lineHeight: 1.42,
              letterSpacing: "-0.05em",
            }}
          >
            Email
          </a>
        </nav>
      </div>
    </>
  );
}
