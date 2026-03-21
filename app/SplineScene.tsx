"use client";

import { useState } from "react";

const SPLINE_URL =
  "https://my.spline.design/roomrelaxingcopy-3f9ef8b64f003da9703b4edfab721eff/";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingMonogram visible={!loaded} />
      <iframe
        src={SPLINE_URL}
        frameBorder="0"
        allow="autoplay"
        onLoad={() => setLoaded(true)}
        className="spline-iframe"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease-in",
        }}
      />
    </>
  );
}
