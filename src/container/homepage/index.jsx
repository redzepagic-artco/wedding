import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import supabase from "../../supabase";
import "../../assets/css/wedding.css";

gsap.registerPlugin(ScrollTrigger);

const WEDDING_DATE = "16.08.2026.";
const WEDDING_TARGET = new Date("2026-08-16T17:15:00");
const COUPLE = "Nur Osmanbegović & Kerim Redžepagić";

const getTimeLeft = () => {
  const diff = Math.max(0, WEDDING_TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const SCHEDULE = [
  { time: "18:00", title: "Dolazak gostiju", icon: "guests" },
  { time: "18:30", title: "Ceremonija, čestitanje i slikanje", icon: "rings" },
  { time: "19:15", title: "Večera", icon: "dinner" },
  { time: "20:00", title: "Prvi ples", icon: "dance" },
  { time: "21:30", title: "Torta", icon: "cake" },
];

// Inline SVG icon set
const Icon = ({ name, size = 28 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "guests":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
          <path d="M15 19c0-2 1.6-3.5 4-3.5s4 1.5 4 3.5" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9" cy="14" r="5" />
          <circle cx="16" cy="14" r="5" />
          <path d="M7.5 5l1.5 3 1.5-3" />
          <path d="M14.5 5l1.5 3 1.5-3" />
        </svg>
      );
    case "dinner":
      return (
        <svg {...common}>
          <path d="M5 3v8a2 2 0 0 0 2 2v8" />
          <path d="M9 3v8a2 2 0 0 1-2 2" />
          <path d="M7 3v6" />
          <path d="M17 3c-2 0-3 2-3 5s1 5 3 5v8" />
        </svg>
      );
    case "dance":
      return (
        <svg {...common}>
          <circle cx="12" cy="4.5" r="1.8" />
          <path d="M12 6.5v5l-3 4 2 4" />
          <path d="M12 11.5l3 4-1 4" />
          <path d="M8 9l4 1 4-1" />
          <path d="M5 7l3 2M19 7l-3 2" />
        </svg>
      );
    case "cake":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <rect x="4" y="13" width="16" height="6" rx="1" />
          <path d="M6 13v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
          <path d="M12 5v3" />
          <path d="M12 3l.8 1.5L12 5l-.8-.5L12 3z" fill="currentColor" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 8l9 6 9-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case "parking":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
        </svg>
      );
    default:
      return null;
  }
};

// Word-by-word split (for paragraphs)
const splitWords = (text) =>
  text.split(/\s+/).map((w, i) => (
    <span key={i} className="wedding-word" aria-hidden="true">
      {w}
    </span>
  ));

// Character split grouped by word — keeps each word from breaking mid-letter
const splitTitleChars = (text) => {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <span key={wi} className="wedding-split-word">
      {Array.from(word).map((ch, ci) => (
        <span key={ci} className="wedding-split-char" aria-hidden="true">
          {ch}
        </span>
      ))}
      {wi < words.length - 1 && " "}
    </span>
  ));
};

// Wrap each character in a span for per-letter animation
const splitChars = (text) =>
  Array.from(text).map((ch, i) => (
    <span key={i} className="wedding-char" aria-hidden="true">
      {ch === " " ? " " : ch}
    </span>
  ));

const COUNTDOWN_LABELS = ["Dana", "Sati", "Minuta", "Sekundi"];

const RsvpForm = () => {
  const [attending, setAttending] = useState("da");
  const [name, setName] = useState("");
  const [companions, setCompanions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const addCompanion = () => setCompanions([...companions, ""]);
  const removeCompanion = (i) => setCompanions(companions.filter((_, idx) => idx !== i));
  const updateCompanion = (i, val) => {
    const next = [...companions];
    next[i] = val;
    setCompanions(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError("");

    const { error: dbError } = await supabase.from("rsvp").insert({
      ime_prezime: name.trim(),
      dolazak: attending === "da",
      pratnja: companions.filter((c) => c.trim()),
    });

    setSubmitting(false);

    if (dbError) {
      setError("Greška pri slanju. Pokušajte ponovo ili nas kontaktirajte direktno.");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="wedding-rsvp__card js-reveal text-center">
        <div style={{ fontSize: 48, color: "var(--wedding-gold)", marginBottom: 16 }}>♥</div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontStyle: "italic", fontSize: "clamp(22px, 4vw, 32px)", marginBottom: 12 }}>
          {attending === "da" ? "Hvala vam! Radujemo se vašem dolasku." : "Hvala na odgovoru. Žao nam je što nećete moći doći."}
        </h3>
      </div>
    );
  }

  return (
    <form className="wedding-rsvp__card js-reveal" onSubmit={handleSubmit}>
      {/* Attendance */}
      <div className="wedding-rsvp__field">
        <label className="wedding-rsvp__label">Hoćete li prisustvovati? *</label>
        <div className="wedding-rsvp__radios">
          <label className={`wedding-rsvp__radio ${attending === "da" ? "is-active" : ""}`}>
            <input type="radio" name="attending" value="da" checked={attending === "da"} onChange={() => setAttending("da")} />
            <span className="wedding-rsvp__radio-dot" />
            Da, dolazim
          </label>
          <label className={`wedding-rsvp__radio ${attending === "ne" ? "is-active" : ""}`}>
            <input type="radio" name="attending" value="ne" checked={attending === "ne"} onChange={() => setAttending("ne")} />
            <span className="wedding-rsvp__radio-dot" />
            Neću moći prisustvovati
          </label>
        </div>
      </div>

      {/* Name */}
      <div className="wedding-rsvp__field">
        <label className="wedding-rsvp__label">Ime i prezime *</label>
        <input
          type="text"
          className="wedding-input"
          placeholder="Ime i prezime"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Companions */}
      {attending === "da" && (
        <div className="wedding-rsvp__field">
          <label className="wedding-rsvp__label">Pratnja</label>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "var(--wedding-muted)", margin: "0 0 14px" }}>
            Dodajte osobe koje će vam se pridružiti.
          </p>
          {companions.map((c, i) => (
            <div key={i} className="wedding-rsvp__companion">
              <input
                type="text"
                className="wedding-input"
                placeholder="Ime i prezime pratioca/pratiteljice"
                value={c}
                onChange={(e) => updateCompanion(i, e.target.value)}
              />
              <button type="button" className="wedding-icon-btn" onClick={() => removeCompanion(i)} aria-label="Ukloni">
                <Icon name="x" size={18} />
              </button>
            </div>
          ))}
          <button type="button" className="wedding-add-btn" onClick={addCompanion}>
            <Icon name="plus" size={16} />
            Pratilac
          </button>
        </div>
      )}

      {error && (
        <p style={{ color: "#c44", textAlign: "center", marginTop: 16 }}>{error}</p>
      )}

      {/* Submit */}
      <div className="wedding-submit-wrap text-center">
        <button type="submit" className="wedding-submit" disabled={submitting || !name.trim()}>
          <span className="wedding-submit__icon">
            <Icon name="envelope" size={18} />
          </span>
          {submitting ? "Šaljem..." : "Pošalji potvrdu"}
        </button>
      </div>
    </form>
  );
};

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  const pageRef = useRef(null);
  const splashRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // ===== Splash screen =====
  useLayoutEffect(() => {
    document.body.classList.add("is-splash-locked");

    // Safety: never leave the body locked for more than 6s, even if a tween glitches
    const safety = setTimeout(() => {
      document.body.classList.remove("is-splash-locked");
      setSplashDone(true);
    }, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          clearTimeout(safety);
          document.body.classList.remove("is-splash-locked");
          setSplashDone(true);
        },
      });

      // Sparkle pulse around monogram
      gsap.to(".js-splash-sparkle", {
        opacity: 1,
        scale: 1.4,
        duration: 1.6,
        stagger: { each: 0.12, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      // Pulsing concentric rings
      gsap.utils.toArray(".js-splash-ring").forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 0.7,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.15,
          }
        );
        gsap.to(ring, {
          scale: 1.15,
          opacity: 0.15,
          duration: 2.4,
          delay: 1 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Orbit rotation
      gsap.fromTo(
        ".js-splash-orbit",
        { opacity: 0, rotation: -30 },
        { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
      gsap.to(".js-splash-orbit", {
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: "none",
      });


      tl.from(".js-splash-monogram", { opacity: 0, scale: 0.6, duration: 1.1, ease: "back.out(1.7)" })
        .from(".js-splash-names", { opacity: 0, y: 24, duration: 0.9 }, "-=0.5")
        .from(".js-splash-date", { opacity: 0, y: 12, letterSpacing: "0.1em", duration: 0.9 }, "-=0.5")
        .to(".js-splash-progress-bar", { width: "100%", duration: 1.4, ease: "power2.inOut" }, "-=0.4")
        .to(".js-splash-monogram, .js-splash-names, .js-splash-date, .js-splash-progress, .js-splash-ring, .js-splash-orbit, .js-splash-sparkle", {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.04,
        })
        .to(splashRef.current, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "-=0.2");
    }, splashRef);

    return () => {
      clearTimeout(safety);
      document.body.classList.remove("is-splash-locked");
      ctx.revert();
    };
  }, []);

  // ===== Hero + section animations (after splash) =====
  useLayoutEffect(() => {
    if (!splashDone) return;

    const ctx = gsap.context(() => {
      // Floating petals (parallax + drift)
      gsap.utils.toArray(".js-petal").forEach((el) => {
        const dx = gsap.utils.random(-60, 60);
        const dy = gsap.utils.random(40, 160);
        const rot = gsap.utils.random(-120, 120);
        gsap.set(el, { opacity: 0 });
        gsap.to(el, { opacity: gsap.utils.random(0.35, 0.75), duration: 1.2, delay: gsap.utils.random(0, 0.8) });
        gsap.to(el, {
          x: `+=${dx}`,
          y: `+=${dy}`,
          rotation: `+=${rot}`,
          duration: gsap.utils.random(6, 10),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Hero load-in: eyebrow, names char-by-char, divider, date
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      tl.from(".js-hero-eyebrow", { opacity: 0, y: 16, duration: 0.7 })
        .from(
          ".js-hero-name-row-1 .wedding-char",
          { opacity: 0, y: 80, rotateX: -80, duration: 0.9, stagger: 0.04 },
          "-=0.2"
        )
        .from(
          ".js-hero-amp",
          { opacity: 0, scale: 0, rotation: 180, duration: 0.7, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .from(
          ".js-hero-name-row-2 .wedding-char",
          { opacity: 0, y: 80, rotateX: -80, duration: 0.9, stagger: 0.04 },
          "-=0.4"
        )
        .from(".js-hero-divider", { opacity: 0, scaleX: 0, duration: 0.8, transformOrigin: "center" }, "-=0.4")
        .from(".js-hero-date", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".js-hero-day", { opacity: 0, y: 10, duration: 0.6 }, "-=0.5")
        .from(".js-scroll-cue", { opacity: 0, y: -10, duration: 0.6 }, "-=0.3");

      // Breathing heart in divider
      gsap.to(".js-divider-heart", {
        scale: 1.18,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll-cue dot loop
      gsap.fromTo(
        ".js-scroll-cue-dot",
        { y: 0, opacity: 1 },
        { y: 42, opacity: 0, duration: 1.6, repeat: -1, ease: "power1.in" }
      );

      // Hero parallax on scroll — desktop/tablet only (scrub triggers can fight touch scrolling on iOS)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        gsap.to(".js-hero-content", {
          y: 120,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".js-hero-glow", {
          y: 200,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".js-hero-ring-1", {
          rotation: 90,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".js-hero-ring-2", {
          rotation: -120,
          scale: 0.85,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Section reveals on scroll
      gsap.utils.toArray(".js-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Eyebrow underline draw + fade
      gsap.utils.toArray(".js-eyebrow").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 12,
          letterSpacing: "0.6em",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      // Split-title characters cascading in
      gsap.utils.toArray(".js-split-title").forEach((el) => {
        const chars = el.querySelectorAll(".wedding-split-char");
        if (!chars.length) return;
        gsap.from(chars, {
          opacity: 0,
          y: 36,
          rotateX: -60,
          transformOrigin: "50% 100%",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.025,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Word-by-word paragraph reveal
      gsap.utils.toArray(".js-word-para").forEach((el) => {
        gsap.from(el.querySelectorAll(".wedding-word"), {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });

      // Slow rotation for decorative circles
      gsap.utils.toArray(".js-deco-rotate").forEach((el) => {
        gsap.to(el, {
          rotation: 360,
          duration: gsap.utils.random(40, 70),
          repeat: -1,
          ease: "none",
        });
      });

      // Breathing pulse on filled glow circles
      gsap.utils.toArray(".js-deco-pulse").forEach((el) => {
        gsap.to(el, {
          scale: 1.15,
          opacity: 0.7,
          duration: gsap.utils.random(3.5, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center",
        });
      });

      // Horizontal drift on circles
      gsap.utils.toArray(".js-deco-drift").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Diagonal drift on dotted patterns
      gsap.utils.toArray(".js-deco-dots-drift").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-25, 25),
          y: gsap.utils.random(-25, 25),
          opacity: 0.85,
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Orbit motion — small circle traces a wobble path
      gsap.utils.toArray(".js-deco-orbit").forEach((el) => {
        gsap.to(el, {
          x: 20,
          y: -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(el, {
          rotation: -360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      });

      // Ripple-out pulse (scale + fade ring outward, repeat)
      gsap.utils.toArray(".js-deco-pulse-out").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0.8 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 3.5,
            repeat: -1,
            ease: "power2.out",
            transformOrigin: "center",
          }
        );
      });

      // Scroll progress bar
      gsap.to(".js-progress-bar", {
        width: "100%",
        ease: "none",
        scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      // Ambient floating petals between sections (desktop/tablet only — they animate continuously)
      mm.add("(min-width: 769px)", () => {
        gsap.utils.toArray(".js-ambient-petal").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60, rotation: 0 },
            {
              opacity: 0.65,
              y: -200,
              rotation: gsap.utils.random(-180, 180),
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "+=600", scrub: 1.2 },
              delay: i * 0.05,
            }
          );
        });
      });

      // Closing divider line draws in
      gsap.utils.toArray(".js-closing-divider").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scaleX: 0.3,
          duration: 1,
          transformOrigin: "center",
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      // Closing date pill float-in
      gsap.utils.toArray(".js-closing-date").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          letterSpacing: "0.3em",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      // Schedule timeline line drawing in
      gsap.to(".js-schedule-line", {
        scaleY: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".js-schedule-line", start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Schedule items alternating side reveal + icon spin
      gsap.utils.toArray(".js-schedule-item").forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
        tl.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: "power3.out",
        }).from(
          el.querySelector(".wedding-schedule__icon"),
          { rotation: -180, scale: 0.4, duration: 0.7, ease: "back.out(1.7)" },
          "-=0.5"
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, [splashDone]);

  // Splash markup — kept mounted until GSAP slides it offscreen, then unmounted
  const splash = !splashDone && (
    <div ref={splashRef} className="wedding-splash">
      {/* Two concentric pulsing rings, centered */}
      {[200, 320].map((size, i) => (
        <span
          key={`ring-${i}`}
          className="js-splash-ring wedding-splash__ring"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Orbiting dot around the monogram */}
      <div className="js-splash-orbit wedding-splash__orbit">
        <span className="wedding-splash__orbit-dot" style={{ transform: "translate(120px, 0)" }} />
      </div>

      {/* Symmetric sparkles — 8 positions evenly around the center */}
      {[
        { top: "18%", left: "50%" },
        { top: "82%", left: "50%" },
        { top: "50%", left: "12%" },
        { top: "50%", left: "88%" },
        { top: "25%", left: "22%" },
        { top: "25%", left: "78%" },
        { top: "75%", left: "22%" },
        { top: "75%", left: "78%" },
      ].map((pos, i) => (
        <span
          key={`s-${i}`}
          className="js-splash-sparkle wedding-splash__sparkle"
          style={{ ...pos, transform: "translate(-50%, -50%)" }}
        >
          ✦
        </span>
      ))}

      <div className="wedding-splash__inner">
        <div className="js-splash-monogram wedding-splash__monogram">N &amp; K</div>
        <div className="js-splash-names wedding-splash__names">Nur &amp; Kerim</div>
        <div className="js-splash-date wedding-splash__date">{WEDDING_DATE}</div>
      </div>
      <div className="js-splash-progress wedding-splash__progress">
        <div className="js-splash-progress-bar wedding-splash__progress-bar" />
      </div>
    </div>
  );

  return (
    <>
      {splash}
      <div ref={pageRef} className="wedding-page">
        <div className="wedding-progress" aria-hidden="true">
          <div className="js-progress-bar wedding-progress__bar" />
        </div>
        {/* HERO */}
        <section ref={heroRef} className="wedding-hero d-flex align-items-center justify-content-center">
          {/* Decorative layers */}
          <div className="js-hero-glow wedding-hero__glow" />
          <div
            className="js-hero-ring-1 wedding-hero__ring"
            style={{ width: 520, height: 520, top: "50%", left: "50%", marginTop: -260, marginLeft: -260 }}
          />
          <div
            className="js-hero-ring-2 wedding-hero__ring"
            style={{ width: 720, height: 720, top: "50%", left: "50%", marginTop: -360, marginLeft: -360, borderStyle: "dashed", opacity: 0.5 }}
          />
          <div className="wedding-hero__petals" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="js-petal wedding-petal"
                style={{
                  top: `${(i * 41) % 95}%`,
                  left: `${(i * 67) % 95}%`,
                  transform: `rotate(${(i * 53) % 360}deg) scale(${0.6 + ((i * 7) % 10) / 10})`,
                }}
              />
            ))}
          </div>

          <div className="js-hero-content wedding-hero__content container text-center">
            <p className="js-hero-eyebrow wedding-hero__eyebrow">Pozivnica za vjenčanje</p>
            <h1 className="wedding-hero__names" style={{ fontSize: "clamp(32px, 8vw, 96px)" }}>
              <div className="js-hero-name-row-1">{splitChars("Nur Osmanbegović")}</div>
              <div>
                <span className="js-hero-amp wedding-hero__amp">&amp;</span>
              </div>
              <div className="js-hero-name-row-2">{splitChars("Kerim Redžepagić")}</div>
            </h1>
            <div className="js-hero-divider wedding-divider" aria-hidden="true">
              <span className="js-divider-heart wedding-divider__heart">♥</span>
            </div>
            <p className="js-hero-date wedding-hero__date" style={{ fontSize: "clamp(22px, 4vw, 44px)", marginBottom: 6 }}>
              {WEDDING_DATE}
            </p>
            <p
              className="js-hero-day"
              style={{ fontSize: "clamp(13px, 2vw, 18px)", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wedding-muted)" }}
            >
              Nedjelja
            </p>
          </div>

          <div className="js-scroll-cue wedding-scroll-cue" aria-hidden="true">
            <span className="wedding-scroll-cue__label">Scroll</span>
            <span className="wedding-scroll-cue__line">
              <span className="js-scroll-cue-dot wedding-scroll-cue__dot" />
            </span>
          </div>
        </section>

        {/* Couple illustration */}
        <div className="wedding-illustration js-reveal" aria-hidden="true">
          <img src="/images2/couple-dancing-XNVWWZw7.png" alt="" />
        </div>

        {/* COUNTDOWN */}
        <section className="wedding-section wedding-countdown-section js-section">
          <span className="wedding-deco wedding-deco--circle-filled js-deco-pulse" style={{ width: 280, height: 280, top: "-60px", right: "-100px" }} />
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-rotate" style={{ width: 200, height: 200, bottom: "-40px", left: "-80px" }} />
          <div className="container text-center">
            <p className="wedding-eyebrow js-eyebrow">Do našeg velikog dana</p>
            <div className="wedding-countdown js-reveal">
              {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                <div key={i} className="wedding-countdown__block">
                  <span className="wedding-countdown__number">{String(val).padStart(2, "0")}</span>
                  <span className="wedding-countdown__label">{COUNTDOWN_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="wedding-section js-section">
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-rotate" style={{ width: 320, height: 320, top: "-80px", left: "-120px" }} />
          <span className="wedding-deco wedding-deco--circle-filled js-deco-drift" style={{ width: 200, height: 200, top: "20%", right: "-60px" }} />
          <span className="wedding-deco wedding-deco--dots js-deco-dots-drift" style={{ width: 120, height: 120, bottom: "-30px", left: "8%" }} />
          <div className="container text-center" style={{ maxWidth: 760 }}>
            <p className="wedding-eyebrow js-eyebrow">Draga porodico i prijatelji</p>
            <h2 className="wedding-section__title js-split-title" style={{ fontSize: "clamp(26px, 5vw, 54px)", marginBottom: 24 }}>
              {splitTitleChars("Naša ljubavna priča dobija svoje najljepše poglavlje!")}
            </h2>
            <p className="js-word-para" style={{ fontSize: "clamp(17px, 2.4vw, 22px)", lineHeight: 1.7, color: "var(--wedding-muted)" }}>
              {splitWords("Svi lijepi trenuci koje smo do sada doživjeli bili su još posebniji jer ste ih dijelili sa nama. Zato ne možemo zamisliti početak zajedniškog životnog puta bez vašeg prisustva.")}
            </p>
            <p className="js-word-para" style={{ fontSize: "clamp(17px, 2.4vw, 22px)", lineHeight: 1.7, color: "var(--wedding-muted)", marginTop: 20 }}>
              {splitWords("Sa zadovoljstvom vas pozivamo da svojim prisustvom uveličate naše vjenčanje u nedjelju, 16.08.2026. godine, u hotelu „Austria i Bosna“.")}
            </p>
            <p className="js-word-para" style={{ fontSize: "clamp(17px, 2.4vw, 22px)", lineHeight: 1.7, color: "var(--wedding-muted)", marginTop: 20 }}>
              {splitWords("Radujemo se zagrljajima, osmijesima i nezaboravnim uspomenama koje ćemo stvoriti zajedno!")}
            </p>
          </div>
        </section>

        {/* Ambient floating petals */}
        <div className="wedding-ambient js-ambient" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="wedding-ambient__petal js-ambient-petal"
              style={{ left: `${(i * 13 + 8) % 96}%`, top: `${(i * 23) % 80 - 20}px` }}
            />
          ))}
        </div>

        {/* Dress code illustration */}
        <div className="wedding-illustration wedding-illustration--wide js-reveal" aria-hidden="true">
          <img src="/images2/dress-code-illustration-sBv8miCU.png" alt="" />
        </div>

        {/* SCHEDULE */}
        <section className="wedding-section js-section">
          <span className="wedding-deco wedding-deco--circle js-deco-rotate" style={{ width: 380, height: 380, top: "10%", right: "-180px" }} />
          <span className="wedding-deco wedding-deco--circle-filled js-deco-pulse" style={{ width: 260, height: 260, bottom: "-80px", left: "-90px" }} />
          <span className="wedding-deco wedding-deco--dots js-deco-dots-drift" style={{ width: 140, height: 140, top: "30px", left: "5%" }} />
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-orbit" style={{ width: 120, height: 120, bottom: "10%", right: "8%" }} />
          <div className="container">
            <div className="text-center" style={{ marginBottom: 48 }}>
              <p className="wedding-eyebrow js-eyebrow">Raspored</p>
              <h2 className="wedding-section__title js-split-title" style={{ fontSize: "clamp(26px, 5vw, 54px)" }}>
                {splitTitleChars("Tok dana")}
              </h2>
            </div>

            <div className="wedding-schedule">
              <div className="js-schedule-line wedding-schedule__line" />
              {SCHEDULE.map((item) => (
                <div key={item.time} className="wedding-schedule__item js-schedule-item">
                  <span className="wedding-schedule__icon" aria-hidden="true">
                    <Icon name={item.icon} size={26} />
                  </span>
                  <span className="wedding-schedule__time">{item.time}</span>
                  <span className="wedding-schedule__title">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="wedding-section js-section">
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-rotate" style={{ width: 360, height: 360, top: "-100px", right: "-140px" }} />
          <span className="wedding-deco wedding-deco--dots js-deco-dots-drift" style={{ width: 140, height: 140, bottom: "40px", left: "5%" }} />
          <div className="container">
            <div className="text-center" style={{ marginBottom: 40 }}>
              <p className="wedding-eyebrow js-eyebrow">Lokacija</p>
              <h2 className="wedding-section__title js-split-title" style={{ fontSize: "clamp(26px, 5vw, 54px)", marginBottom: 12 }}>
                {splitTitleChars("Hotel Austria & Bosna")}
              </h2>
              <a
                href="https://maps.app.goo.gl/MZeF337cuRPV6eQe9"
                target="_blank"
                rel="noopener noreferrer"
                className="wedding-map-link"
              >
                <Icon name="pin" size={16} />
                <span>Otvori u Google Maps</span>
              </a>
            </div>

            <div className="wedding-illustration wedding-illustration--venue js-reveal">
              <img src="/images2/bentbasa.png" alt="Hotel Austria & Bosna" />
            </div>

            <div className="js-reveal wedding-map">
              <iframe
                title="Hotel Austria & Bosna — lokacija"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.192221189382!2d18.30289377660733!3d43.82634097109456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758ca135588c267%3A0xf429f5c92990106!2sAustria%20%26%20Bosnia!5e1!3m2!1sen!2sus!4v1781923489083!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="js-reveal wedding-note">
              <span className="wedding-note__icon" aria-hidden="true">
                <Icon name="parking" size={20} />
              </span>
              <p className="wedding-note__text">
                <strong>Napomena:</strong> Parking za goste ispred hotela je besplatan.
              </p>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="wedding-section js-section">
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-rotate" style={{ width: 460, height: 460, top: "50%", left: "50%", marginTop: -230, marginLeft: -230 }} />
          <span className="wedding-deco wedding-deco--circle-filled js-deco-pulse" style={{ width: 300, height: 300, top: "-60px", right: "-100px" }} />
          <span className="wedding-deco wedding-deco--dots js-deco-dots-drift" style={{ width: 160, height: 160, bottom: "40px", left: "4%" }} />
          <div className="container">
            <div className="text-center" style={{ marginBottom: 40 }}>
              <p className="wedding-eyebrow js-eyebrow">Potvrdite svoje prisustvo</p>
              <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--wedding-muted)", maxWidth: 600, margin: "0 auto" }}>
                Očekujemo vas. Molimo da svoje prisustvo potvrdite do 16. jula 2026.
              </p>
            </div>

            <RsvpForm />

            <div className="wedding-rsvp-fallback js-reveal">
              <p>
                U slučaju bilo kakvih problema sa formom, prisustvo možete potvrditi i direktno na brojeve:
              </p>
              <p>
                <strong>Nur:</strong>{" "}
                <a href="tel:+38762506068">+387 62 506 068</a>
                <span style={{ margin: "0 12px", color: "var(--wedding-gold)" }}>|</span>
                <strong>Kerim:</strong>{" "}
                <a href="tel:+38762507356">+387 62 507 356</a>
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="wedding-section js-section" style={{ paddingBottom: 120 }}>
          <span className="wedding-deco wedding-deco--circle-filled js-deco-pulse" style={{ width: 360, height: 360, top: "50%", left: "50%", marginTop: -180, marginLeft: -180 }} />
          <span className="wedding-deco wedding-deco--circle-dashed js-deco-rotate" style={{ width: 240, height: 240, top: "50%", left: "50%", marginTop: -120, marginLeft: -120 }} />
          <span className="wedding-deco wedding-deco--circle js-deco-pulse-out" style={{ width: 140, height: 140, top: "50%", left: "50%", marginTop: -70, marginLeft: -70 }} />
          <div className="container text-center">
            <div className="wedding-divider js-closing-divider" aria-hidden="true">
              <span>♥</span>
            </div>
            <p
              className="js-split-title"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(20px, 4vw, 40px)",
                color: "var(--wedding-gold-dark)",
                marginBottom: 8,
              }}
            >
              {splitTitleChars(COUPLE)}
            </p>
            <p className="js-closing-date" style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "var(--wedding-muted)", letterSpacing: "0.1em" }}>{WEDDING_DATE}</p>
            <div className="wedding-illustration wedding-illustration--rings js-reveal" aria-hidden="true">
              <img src="/images2/rings-illustration-tO3OeALU.png" alt="" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
