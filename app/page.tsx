import SplineScene from "./SplineScene";

const MARQUEE_TEXT = "UNDER CONSTRUCTION";

// Duplicate enough times for seamless loop (50% trick)
const repeats = Array(8).fill(`${MARQUEE_TEXT} `).join("");

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <SplineScene />
      </div>

      {/* Nav */}
      <header className="site-header absolute top-0 left-0 right-0 flex items-center justify-between" style={{ fontFamily: "var(--font-fraunces)", fontSize: "10.5pt", lineHeight: 1.2 }}>
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
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none flex flex-col justify-end" style={{ bottom: "0px", height: "var(--marquee-h)" }}>
        {/* Coming Soon — centered on the marquee */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1, height: "calc(var(--marquee-h) * 0.85)", padding: "0 10px" }}>
          <p
            className="text-[#FFBEF6]"
            style={{ fontFamily: "'Ogg', Georgia, serif", fontStyle: "italic", fontSize: "var(--coming-soon-size)", letterSpacing: "0.02em", whiteSpace: "nowrap", textShadow: "0 2px 40px rgba(255, 190, 246, 0.3)", transform: "translateY(19%)" }}
          >
            Coming Soon
          </p>
        </div>

        <div className="marquee-track select-none">
          <span
            className="text-[#e040fb] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Fixture', 'Arial Narrow', sans-serif", fontWeight: 800, fontSize: "var(--marquee-h)", lineHeight: 0.85, letterSpacing: "-0.02em", }}
          >
            {repeats}
          </span>
          {/* Duplicate for seamless loop */}
          <span
            className="text-[#e040fb] uppercase whitespace-nowrap"
            style={{ fontFamily: "'Fixture', 'Arial Narrow', sans-serif", fontWeight: 800, fontSize: "var(--marquee-h)", lineHeight: 0.85, letterSpacing: "-0.02em", }}
          >
            {repeats}
          </span>
        </div>
      </div>
    </main>
  );
}
