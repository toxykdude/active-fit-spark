import { useEffect, useRef, useState, type ReactNode } from "react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}
      className={`${className} transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-extrabold tracking-tight text-[#1D1D1D] text-lg">
          ENTRE<span className="text-[#EC7E4A]">NIQ</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1D1D1D]/80">
          <a href="#features" className="hover:text-[#EC7E4A]">Features</a>
          <a href="#community" className="hover:text-[#EC7E4A]">Community</a>
          <a href="#how" className="hover:text-[#EC7E4A]">How it works</a>
          <a href="#testimonials" className="hover:text-[#EC7E4A]">Reviews</a>
        </nav>
        <a href="#download" className="bg-[#EC7E4A] hover:bg-[#d76d3c] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm">
          Start Free Trial
        </a>
      </div>
    </header>
  );
}

function AnimatedCount({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function TrustBar() {
  const items = ["App Store & Google Play", "Backed by AI", "500+ Certified Coaches", "9 Payment Methods", "20+ Languages"];
  return (
    <section className="bg-[#FDF2ED] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <p className="text-[#1D1D1D] text-2xl sm:text-3xl font-bold tracking-tight">
            Join <span className="text-[#EC7E4A]"><AnimatedCount to={100000} /></span> users training smarter
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-[#1D1D1D]/60 font-medium">
          {items.map((i, idx) => (
            <Reveal key={i} delay={idx * 80}><span>{i}</span></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: "🤖", title: "AI Fitness Coach", desc: "An always-on coach that adapts your plan to your recovery, sleep, and progress every single day." },
  { icon: "🎯", title: "Live 1-on-1 Coaching", desc: "Book real, verified human coaches for video sessions, form checks, and accountability." },
  { icon: "🥗", title: "Smart Nutrition Tracking", desc: "Scan barcodes, snap meals, and hit your macros without obsessing over the math." },
  { icon: "🏋️", title: "Personalized Workouts", desc: "Strength, hypertrophy, mobility, or hybrid — programs that evolve with you week to week." },
  { icon: "⌚", title: "Wearable Integration", desc: "Apple Watch, Garmin, Whoop, Fitbit — all your data flows into one intelligent dashboard." },
  { icon: "📈", title: "Progress Tracking", desc: "Visualize strength curves, body composition, and consistency with stunning weekly reports." },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold text-center">Features</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight text-center mt-3 max-w-3xl mx-auto">
            Everything you need to train like you mean it.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group bg-[#FDF2ED] hover:bg-white border border-transparent hover:border-[#EC7E4A]/20 rounded-3xl p-8 h-full transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(236,126,74,0.25)]">
                <div className="w-12 h-12 rounded-2xl bg-[#EC7E4A]/10 text-[#EC7E4A] flex items-center justify-center text-2xl">{f.icon}</div>
                <h3 className="mt-6 text-xl font-bold text-[#1D1D1D]">{f.title}</h3>
                <p className="mt-3 text-[#8A8A8A] leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" className="py-24 px-6 bg-[#1D1D1D] text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-[#F6BEA3] uppercase tracking-[0.25em] text-xs font-bold">Community</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Compete, level up, <span className="text-[#EC7E4A]">earn rewards.</span>
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-lg">
            Climb global leaderboards, smash multi-week challenges, and stack ENTRENIQ coins you can spend in the shop. Training feels like a game — because it is.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[["🏆", "Leaderboards"], ["🔥", "Streaks"], ["🪙", "Coin Rewards"]].map(([i, l]) => (
              <div key={l} className="text-center"><div className="text-3xl">{i}</div><p className="mt-2 text-sm text-white/70">{l}</p></div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-gradient-to-br from-[#2A1A12] to-[#0F0B09] border border-[#EC7E4A]/15 rounded-3xl p-8 shadow-2xl">
            <p className="text-xs text-white/50 uppercase tracking-wider">This week · Push Challenge</p>
            <div className="mt-4 space-y-3">
              {[
                ["1", "Carlos M.", "12,480", true],
                ["2", "Sarah K.", "11,920", false],
                ["3", "You", "10,640", false],
                ["4", "Priya R.", "9,805", false],
              ].map(([rank, name, pts, hl]) => (
                <div key={name as string} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${hl ? "bg-[#EC7E4A]/15 border border-[#EC7E4A]/30" : "bg-white/[0.03]"}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{rank}</span>
                    <span className="font-semibold">{name}</span>
                  </div>
                  <span className="text-[#F6BEA3] font-semibold text-sm">{pts} pts</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Shop() {
  const items = [
    { name: "Whey Protein Isolate", price: "$49", tag: "Bestseller" },
    { name: "ENTRENIQ Shaker", price: "$18", tag: "New" },
    { name: "Resistance Band Set", price: "$32", tag: "Limited" },
  ];
  return (
    <section className="py-24 px-6 bg-[#FDF2ED]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold text-center">Shop</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight text-center mt-3">Gear & supplements, curated.</h2>
          <p className="text-center mt-4 text-[#8A8A8A] max-w-xl mx-auto">Hand-picked essentials, paid for with the coins you earn from your workouts.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {items.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#F6BEA3] to-[#EC7E4A] flex items-center justify-center text-6xl">🛒</div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#EC7E4A] font-semibold uppercase tracking-wider">{p.tag}</p>
                    <h3 className="mt-1 font-bold text-[#1D1D1D]">{p.name}</h3>
                  </div>
                  <span className="font-bold text-[#1D1D1D]">{p.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Onboarding() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-[#1D1D1D] to-[#2A1A12] p-10 flex flex-col justify-end text-white shadow-2xl">
            <div className="bg-[#199226]/15 border border-[#199226]/40 rounded-2xl p-4 mb-4">
              <p className="text-[#7be78a] text-xs font-semibold uppercase tracking-wider">Cleared to train</p>
              <p className="text-sm mt-1">No flags raised. Coach-reviewed.</p>
            </div>
            <h3 className="text-3xl font-bold">Medical-grade screening, built in.</h3>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold">Onboarding</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight mt-3">A safer start to every program.</h2>
          <p className="mt-6 text-[#8A8A8A] text-lg leading-relaxed">
            Before your first session we run a 4-minute clinical-style assessment: PAR-Q+ health screening, mobility check, injury history, and goal calibration — reviewed by a certified coach.
          </p>
          <ul className="mt-6 space-y-3">
            {["PAR-Q+ clinical screening", "Mobility & posture assessment", "Coach review within 24h", "Personalized risk-adjusted plan"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[#1D1D1D]">
                <span className="w-5 h-5 rounded-full bg-[#199226]/15 text-[#199226] flex items-center justify-center text-xs">✓</span>{t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Global() {
  const pays = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayPal", "Klarna", "iDEAL", "SEPA"];
  const langs = ["EN", "ES", "PT", "FR", "DE", "IT", "NL", "AR", "JA", "ZH", "HI", "KO"];
  return (
    <section className="py-24 px-6 bg-[#FDF2ED]">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold">Global</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight mt-3">Built for everyone, everywhere.</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {pays.map((p) => (
              <span key={p} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#1D1D1D] shadow-sm">{p}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {langs.map((l) => (
              <span key={l} className="border border-[#EC7E4A]/30 text-[#EC7E4A] px-3 py-1 rounded-full text-xs font-bold">{l}</span>
            ))}
            <span className="text-[#8A8A8A] text-xs self-center ml-2">+ 8 more</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", t: "Download & assess", d: "Install the app and complete your 4-minute medical-grade onboarding." },
    { n: "02", t: "Meet your coach", d: "Get matched with an AI coach + an optional verified human coach." },
    { n: "03", t: "Train & track", d: "Follow your plan, log meals, sync your wearables — all in one place." },
    { n: "04", t: "Level up", d: "Hit PRs, earn coins, climb leaderboards, and watch your progress compound." },
  ];
  return (
    <section id="how" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold text-center">How it works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight text-center mt-3">From install to first PR — in days.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative bg-[#FDF2ED] rounded-3xl p-7 h-full">
                <span className="text-5xl font-extrabold text-[#EC7E4A]/30">{s.n}</span>
                <h3 className="mt-2 text-xl font-bold text-[#1D1D1D]">{s.t}</h3>
                <p className="mt-3 text-[#8A8A8A] leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const t = [
    { name: "Carlos M.", role: "Lost 18kg in 9 months", quote: "The AI adjusts my plan when I'm sore or sleep poorly. It's like having a coach who actually pays attention." },
    { name: "Sarah K.", role: "First marathon at 42", quote: "Live coaching kept me accountable. The nutrition tracking is the easiest I've used — barcode scan, done." },
    { name: "Priya R.", role: "Strength PRs every month", quote: "I've tried five apps. ENTRENIQ is the first one that feels personal instead of generic." },
  ];
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#FDF2ED]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[#EC7E4A] uppercase tracking-[0.25em] text-xs font-bold text-center">Loved by athletes</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1D] tracking-tight text-center mt-3">Real people. Real progress.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {t.map((x, i) => (
            <Reveal key={x.name} delay={i * 120}>
              <figure className="bg-white rounded-3xl p-7 h-full shadow-sm flex flex-col">
                <div className="text-[#EC7E4A] text-lg">★★★★★</div>
                <blockquote className="mt-4 text-[#1D1D1D] text-lg leading-relaxed flex-1">"{x.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F6BEA3] to-[#EC7E4A]" />
                  <div><p className="font-semibold text-[#1D1D1D]">{x.name}</p><p className="text-sm text-[#8A8A8A]">{x.role}</p></div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1D1D1D] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <p className="font-extrabold tracking-tight text-2xl">ENTRE<span className="text-[#EC7E4A]">NIQ</span></p>
          <p className="mt-3 text-white/60 max-w-sm">Your intelligent fitness coach. AI workouts, real coaches, smart nutrition — all in one app.</p>
          <div className="mt-5 flex gap-3">
            {["IG", "X", "YT", "TT"].map((s) => (
              <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#EC7E4A] hover:text-white flex items-center justify-center text-xs font-bold transition-colors">{s}</a>
            ))}
          </div>
        </div>
        {[
          ["Product", ["Features", "Pricing", "Download", "Coaches"]],
          ["Company", ["About", "Careers", "Press", "Contact"]],
        ].map(([h, links]) => (
          <div key={h as string}>
            <p className="font-semibold text-white">{h}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {(links as string[]).map((l) => <li key={l}><a href="#" className="hover:text-[#EC7E4A]">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <p>© 2026 ENTRENIQ. All rights reserved.</p>
        <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a></div>
      </div>
    </footer>
  );
}
