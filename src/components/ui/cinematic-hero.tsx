import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface CinematicHeroProps {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

const INJECTED_STYLES = `
.cinematic-hero-root { --eq-primary: #C8F000; --eq-primary-light: #D4FF1A; --eq-ink: #FFFFFF; --eq-muted: #9AAB7A; }
.cinematic-hero-root::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200,240,0,0.18) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}
.premium-depth-card {
  background: linear-gradient(145deg, #222B18 0%, #0F1209 100%);
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.6), 0 0 64px rgba(200,240,0,0.12), inset 0 1px 0 rgba(200,240,0,0.08);
  border: 1px solid rgba(200,240,0,0.20);
}
.text-card-silver-matte {
  background: linear-gradient(180deg, #FFFFFF 0%, #C8F000 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.floating-ui-badge {
  background: rgba(15,18,9,0.85); backdrop-filter: blur(14px);
  border: 1px solid rgba(200,240,0,0.25);
  box-shadow: 0 12px 30px -10px rgba(0,0,0,0.7), 0 0 24px rgba(200,240,0,0.10);
}
.floating-ui-badge .ic { background: rgba(200,240,0,0.18); color: #C8F000; }
.phone-frame {
  background: linear-gradient(160deg, #1A1E14 0%, #0A0D06 100%);
  border: 1.5px solid rgba(200,240,0,0.25);
  box-shadow: 0 50px 100px -25px rgba(0,0,0,0.8), 0 0 64px rgba(200,240,0,0.12), inset 0 0 0 6px #000;
}
.phone-screen { background: linear-gradient(180deg, #1A1E14 0%, #222B18 100%); }
.btn-modern-light, .btn-modern-dark { transition: transform .15s ease, box-shadow .2s ease; }
.btn-modern-light { background: #C8F000; color: #0F1209; box-shadow: 0 6px 0 -2px #8FB800, 0 12px 24px -8px rgba(200,240,0,0.35); }
.btn-modern-dark  { background: #1A1E14; color: #FFFFFF; border: 1px solid rgba(200,240,0,0.20); box-shadow: 0 6px 0 -2px #0A0D06, 0 12px 24px -8px rgba(0,0,0,0.5); }
.btn-modern-light:hover { transform: translateY(-1px); background: #D4FF1A; }
.btn-modern-dark:hover { transform: translateY(-1px); border-color: rgba(200,240,0,0.40); }
.btn-modern-light:focus-visible, .btn-modern-dark:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(200,240,0,0.5), 0 6px 0 -2px #0A0D06; }
.progress-ring-track { stroke: #2C361E; }
.progress-ring-fill  { stroke: #C8F000; stroke-linecap: round; transform: rotate(-90deg); transform-origin: center; filter: drop-shadow(0 0 6px rgba(200,240,0,0.5)); }
`;

function PhoneMockup() {
  return (
    <div className="phone-frame rounded-[42px] p-2 w-[280px] sm:w-[320px] aspect-[9/19]">
      <div className="phone-screen rounded-[34px] w-full h-full p-5 flex flex-col gap-4 text-white overflow-hidden relative">
        <div className="flex items-center justify-between text-[10px] text-white/60">
          <span>9:41</span>
          <span style={{ color: "#C8F000" }}>ENTRENIQ</span>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider" style={{ color: "#9AAB7A" }}>Today</p>
          <h3 className="text-lg font-bold leading-tight mt-1">Push Day · Upper Body</h3>
          <p className="text-[11px] mt-0.5" style={{ color: "#9AAB7A" }}>45 min · 6 exercises</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: "rgba(200,240,0,0.06)", border: "1px solid rgba(200,240,0,0.15)" }}>
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle className="progress-ring-track" cx="18" cy="18" r="15" fill="none" strokeWidth="3" />
              <circle className="progress-ring-fill" cx="18" cy="18" r="15" fill="none" strokeWidth="3"
                strokeDasharray="94.25" strokeDashoffset="28" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold" style={{ color: "#C8F000" }}>70%</div>
          </div>
          <div className="flex-1">
            <p className="text-[11px]" style={{ color: "#9AAB7A" }}>Daily Goal</p>
            <p className="text-sm font-semibold">1,840 / 2,600 kcal</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#6B7A50" }}>P 142g · C 210g · F 58g</p>
          </div>
        </div>
        <div className="space-y-2 text-[12px]">
          {["Bench Press · 4×8", "Incline DB Press · 3×10", "Overhead Press · 4×6"].map((row) => (
            <div key={row} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ backgroundColor: "#1A1E14", border: "1px solid rgba(180,210,60,0.10)" }}>
              <span>{row}</span>
              <span className="w-4 h-4 rounded-full border" style={{ borderColor: "#C8F000" }} />
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-2xl p-3" style={{ backgroundColor: "rgba(200,240,0,0.10)", border: "1px solid rgba(200,240,0,0.30)" }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: "#C8F000" }}>Coach Maya</p>
          <p className="text-[12px] text-white/90 mt-1 leading-snug">Great pace this week — let's add 2.5kg to your bench.</p>
        </div>
      </div>
    </div>
  );
}

export function CinematicHero({
  brandName = "ENTRENIQ",
  tagline1 = "Train smarter,",
  tagline2 = "live stronger.",
  cardHeading = "Your intelligent fitness coach.",
  cardDescription,
  metricValue = 100000,
  metricLabel = "Active Members",
  ctaHeading = "Ready to transform?",
  ctaDescription = "Join hundreds of thousands of users who train smarter with ENTRENIQ. Free to download. 7-day free trial. No credit card required.",
}: CinematicHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(heroRef.current, { opacity: 0, y: -40, duration: 0.4 }, 0)
        .to(phoneRef.current, { scale: 0.7, y: -60, opacity: 0, duration: 0.6 }, 0)
        .to(badgesRef.current, { opacity: 0, duration: 0.3 }, 0)
        .fromTo(cardRef.current, { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.3)
        .to(cardRef.current, { opacity: 0, y: -40, duration: 0.4 }, 0.85)
        .fromTo(ctaRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 1.05);

      if (metricRef.current) {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: metricValue, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
          onUpdate: () => {
            if (metricRef.current) metricRef.current.textContent = Math.floor(obj.v).toLocaleString() + "+";
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div ref={rootRef} className="cinematic-hero-root relative h-screen w-full overflow-hidden" style={{ backgroundColor: "#0F1209" }}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* STATE A — Hero */}
      <div ref={heroRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 z-10">
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#C8F000" }}>{brandName}</p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white text-center leading-[1.05] tracking-tight max-w-4xl">
          {tagline1}<br /><span style={{ color: "#C8F000", textShadow: "0 0 40px rgba(200,240,0,0.4)" }}>{tagline2}</span>
        </h1>
        <div ref={phoneRef} className="mt-10 relative">
          <PhoneMockup />
          <div ref={badgesRef} className="hidden sm:block">
            <div className="floating-ui-badge absolute -left-32 top-12 rounded-2xl px-3 py-2 flex items-center gap-2 text-white text-xs">
              <span className="ic w-7 h-7 rounded-full flex items-center justify-center text-sm">🔥</span>
              <div><p className="font-semibold">12 day streak</p><p className="text-[10px]" style={{ color: "#9AAB7A" }}>Keep going!</p></div>
            </div>
            <div className="floating-ui-badge absolute -right-36 top-32 rounded-2xl px-3 py-2 flex items-center gap-2 text-white text-xs">
              <span className="ic w-7 h-7 rounded-full flex items-center justify-center text-sm">💪</span>
              <div><p className="font-semibold">New PR</p><p className="text-[10px]" style={{ color: "#9AAB7A" }}>Bench 92.5kg</p></div>
            </div>
            <div className="floating-ui-badge absolute -left-28 bottom-24 rounded-2xl px-3 py-2 flex items-center gap-2 text-white text-xs">
              <span className="ic w-7 h-7 rounded-full flex items-center justify-center text-sm">🥗</span>
              <div><p className="font-semibold">Meal logged</p><p className="text-[10px]" style={{ color: "#9AAB7A" }}>+38g protein</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* STATE Mid — Card */}
      <div ref={cardRef} className="absolute inset-0 flex items-center justify-center px-6 opacity-0 z-10">
        <div className="premium-depth-card rounded-3xl p-8 sm:p-12 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            <span className="text-card-silver-matte">{cardHeading}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "#9AAB7A" }}>{cardDescription}</p>
          <div className="mt-8 inline-flex items-baseline gap-3">
            <span ref={metricRef} className="text-5xl sm:text-6xl font-extrabold" style={{ color: "#C8F000", textShadow: "0 0 40px rgba(200,240,0,0.4)" }}>0+</span>
            <span className="text-sm uppercase tracking-wider" style={{ color: "#9AAB7A" }}>{metricLabel}</span>
          </div>
        </div>
      </div>

      {/* STATE B — CTA */}
      <div ref={ctaRef} className="absolute inset-0 flex items-center justify-center px-6 opacity-0 z-10">
        <div className="premium-depth-card rounded-3xl p-8 sm:p-14 max-w-2xl text-center cta-wrapper">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            <span className="text-card-silver-matte">{ctaHeading}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "#9AAB7A" }}>{ctaDescription}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#" aria-label="Download ENTRENIQ on the App Store"
               className="btn-modern-dark rounded-2xl px-5 py-3 flex items-center gap-3 min-w-[180px]">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M16.365 1.43c0 1.14-.49 2.23-1.27 3.02-.84.85-2.21 1.51-3.32 1.42-.14-1.12.42-2.27 1.18-3.06.87-.9 2.34-1.55 3.41-1.38zM20.5 17.27c-.55 1.27-1.21 2.5-2.21 3.6-.86.94-1.91 2.13-3.46 2.14-1.5.01-1.99-.98-3.74-.98s-2.28.96-3.7 1c-1.5.05-2.65-1.27-3.52-2.21-2.46-2.66-4.34-7.51-1.81-10.83 1.26-1.65 3.51-2.69 5.55-2.72 1.55-.03 3.02 1.05 3.97 1.05.94 0 2.74-1.3 4.62-1.11.79.03 3.01.32 4.43 2.43-.11.07-2.65 1.55-2.62 4.62.03 3.66 3.2 4.88 3.24 4.9-.03.07-.5 1.72-1.65 3.11z"/></svg>
              <div className="text-left leading-tight"><p className="text-[10px] opacity-70">Download on the</p><p className="text-base font-semibold">App Store</p></div>
            </a>
            <a href="#" aria-label="Get ENTRENIQ on Google Play"
               className="btn-modern-light rounded-2xl px-5 py-3 flex items-center gap-3 min-w-[180px]">
              <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#0F1209" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.7L3.6 2.3z"/><path fill="#0F1209" d="M17 8.7l-2.6-1.5-2.4 2.5 2.4 2.5L17 10.7c1-.5 1-1.5 0-2z"/><path fill="#0F1209" opacity=".7" d="M13 12L3.6 21.7c.4.4 1 .4 1.7.1L17 14.7 13 12z"/><path fill="#0F1209" opacity=".4" d="M13 12l4-2.3L5.3 2.2c-.7-.4-1.3-.4-1.7 0L13 12z"/></svg>
              <div className="text-left leading-tight"><p className="text-[10px] opacity-70">Get it on</p><p className="text-base font-semibold">Google Play</p></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
