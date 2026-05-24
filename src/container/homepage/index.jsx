import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../assets/css/wedding.css";

gsap.registerPlugin(ScrollTrigger);

const WEDDING_DATE = "16.08.2025.";
const COUPLE = "Nur Osmanbegović & Kerim Redžepagić";

const SCHEDULE = [
  { time: "17:00", title: "Dolazak gostiju", icon: "guests" },
  { time: "17:30", title: "Ceremonija i darivanje mladenaca", icon: "rings" },
  { time: "18:00", title: "Večera", icon: "dinner" },
  { time: "19:00", title: "Prvi ples", icon: "dance" },
  { time: "20:00", title: "Sječenje torte", icon: "cake" },
];

// Inline SVG icon set
const Icon = ({ name, size = 28 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
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
    default:
      return null;
  }
};

const emptyGuest = () => ({ firstName: "", lastName: "" });

// Wrap each character in a span for per-letter animation
const splitChars = (text) =>
  Array.from(text).map((ch, i) => (
    <span key={i} className="wedding-char" aria-hidden="true">
      {ch === " " ? " " : ch}
    </span>
  ));

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [attending, setAttending] = useState(null);
  const [guests, setGuests] = useState([emptyGuest()]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pageRef = useRef(null);
  const splashRef = useRef(null);
  const heroRef = useRef(null);
  const successRef = useRef(null);
  const guestRefs = useRef([]);

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

      tl.from(".js-splash-monogram", { opacity: 0, scale: 0.6, duration: 1.1, ease: "back.out(1.7)" })
        .from(".js-splash-names", { opacity: 0, y: 24, duration: 0.9 }, "-=0.5")
        .from(".js-splash-date", { opacity: 0, y: 12, letterSpacing: "0.1em", duration: 0.9 }, "-=0.5")
        .to(".js-splash-progress-bar", { width: "100%", duration: 1.4, ease: "power2.inOut" }, "-=0.4")
        .to(".js-splash-monogram, .js-splash-names, .js-splash-date, .js-splash-progress", {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.05,
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
    if (!splashDone || submitted) return;

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

      // Schedule timeline line drawing in
      gsap.to(".js-schedule-line", {
        scaleY: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".js-schedule-line", start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Schedule items alternating side reveal
      gsap.utils.toArray(".js-schedule-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      // RSVP card pop with slight rotation
      gsap.from(".js-rsvp-card", {
        opacity: 0,
        y: 60,
        rotateX: -8,
        transformPerspective: 800,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".js-rsvp-card", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [splashDone, submitted]);

  // Guest row in/out
  useEffect(() => {
    const last = guestRefs.current[guests.length - 1];
    if (last && guests.length > 1) {
      gsap.from(last, { opacity: 0, y: -10, height: 0, marginBottom: 0, duration: 0.45, ease: "power2.out" });
    }
  }, [guests.length]);

  // Success screen
  useLayoutEffect(() => {
    if (!submitted || !successRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".js-success-heart", { opacity: 0, scale: 0.4, duration: 0.8, ease: "back.out(1.7)" })
        .to(".js-success-heart", { scale: 1.15, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" }, ">")
        .from(".js-success-eyebrow", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(".js-success-title", { opacity: 0, y: 30, duration: 0.9 }, "-=0.3")
        .from(".js-success-msg", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".js-success-couple", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
    }, successRef);
    return () => ctx.revert();
  }, [submitted]);

  const updateGuest = (idx, field, value) => {
    setGuests((prev) => prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g)));
  };

  const addGuest = () => setGuests((prev) => [...prev, emptyGuest()]);

  const removeGuest = (idx) => {
    const row = guestRefs.current[idx];
    if (row) {
      gsap.to(row, {
        opacity: 0,
        x: 30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setGuests((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx))),
      });
    } else {
      setGuests((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attending === null) return;
    setSubmitting(true);
    const payload = {
      attending,
      guests: attending ? guests.filter((g) => g.firstName.trim() || g.lastName.trim()) : [],
    };
    try {
      // TODO: replace with real backend endpoint
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log("RSVP submission (no backend yet):", payload);
      });
    } finally {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setSubmitting(false);
          setSubmitted(true);
        },
      });
    }
  };

  // Splash markup — kept mounted until GSAP slides it offscreen, then unmounted
  const splash = !splashDone && (
    <div ref={splashRef} className="wedding-splash">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="js-splash-sparkle wedding-splash__sparkle"
          style={{
            top: `${20 + (i * 37) % 60}%`,
            left: `${15 + (i * 53) % 70}%`,
          }}
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

  if (submitted) {
    return (
      <>
        <div ref={successRef} className="wedding-page wedding-success">
          <div className="container">
            <div className="js-success-heart wedding-success__heart">♥</div>
            <p className="js-success-eyebrow wedding-eyebrow">Hvala Vam</p>
            <h1
              className="js-success-title"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(28px, 6vw, 72px)",
                marginBottom: 24,
              }}
            >
              Vidimo se {WEDDING_DATE}
            </h1>
            <p
              className="js-success-msg"
              style={{ maxWidth: 640, margin: "0 auto 36px", fontSize: "clamp(16px, 2.4vw, 22px)", lineHeight: 1.6, color: "var(--wedding-muted)" }}
            >
              {attending
                ? "Hvala što ste prihvatili naš poziv. Radujemo se što ćemo ovaj poseban dan podijeliti s Vama. Vaše prisustvo čini ga još ljepšim."
                : "Hvala što ste nam javili. Žao nam je što nećete moći biti s nama, ali Vas nosimo u mislima na naš veliki dan."}
            </p>
            <p
              className="js-success-couple"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(20px, 3.5vw, 28px)",
                color: "var(--wedding-gold-dark)",
              }}
            >
              {COUPLE}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {splash}
      <div ref={pageRef} className="wedding-page">
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
              Subota
            </p>
          </div>

          <div className="js-scroll-cue wedding-scroll-cue" aria-hidden="true">
            <span className="wedding-scroll-cue__label">Scroll</span>
            <span className="wedding-scroll-cue__line">
              <span className="js-scroll-cue-dot wedding-scroll-cue__dot" />
            </span>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="wedding-section">
          <div className="container text-center js-reveal" style={{ maxWidth: 760 }}>
            <p className="wedding-eyebrow">Draga porodice i prijatelji</p>
            <h2 className="wedding-section__title" style={{ fontSize: "clamp(26px, 5vw, 54px)", marginBottom: 24 }}>
              S radošću Vas pozivamo na naš veliki dan
            </h2>
            <p style={{ fontSize: "clamp(17px, 2.4vw, 22px)", lineHeight: 1.7, color: "var(--wedding-muted)" }}>
              Najdraži naši,
              <br />
              poslije svih lijepih trenutaka koje smo podijelili, došao je i taj naš dan.
              <br />
              Dođite — ne bi nam bio isti bez vas.
            </p>
          </div>
        </section>

        {/* SCHEDULE */}
        <section className="wedding-section">
          <div className="container">
            <div className="text-center js-reveal" style={{ marginBottom: 48 }}>
              <p className="wedding-eyebrow">Raspored</p>
              <h2 className="wedding-section__title" style={{ fontSize: "clamp(26px, 5vw, 54px)" }}>
                Tok dana
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

        {/* RSVP */}
        <section className="wedding-section">
          <div className="container">
            <div className="text-center js-reveal" style={{ marginBottom: 40 }}>
              <p className="wedding-eyebrow">Potvrda dolaska</p>
              <h2 className="wedding-section__title" style={{ fontSize: "clamp(26px, 5vw, 54px)", marginBottom: 16 }}>
                Molimo Vas da potvrdite dolazak
              </h2>
              <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--wedding-muted)", maxWidth: 600, margin: "0 auto" }}>
                Da bismo sve mogli pripremiti na vrijeme, javite nam dolazite li i koliko Vas dolazi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="js-rsvp-card wedding-rsvp__card">
              <div className="wedding-choice-group">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`wedding-choice ${attending === true ? "is-active" : ""}`}
                >
                  <span className="wedding-choice__icon"><Icon name="check" size={18} /></span>
                  <span>Dolazim</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`wedding-choice ${attending === false ? "is-active" : ""}`}
                >
                  <span className="wedding-choice__icon"><Icon name="x" size={18} /></span>
                  <span>Ne mogu doći</span>
                </button>
              </div>

              {attending === true && (
                <div className="wedding-guests">
                  <div className="wedding-guests__header">
                    <div>
                      <p className="wedding-guests__title">Lista gostiju</p>
                      <p className="wedding-guests__subtitle">Unesite ime i prezime za svaku osobu koja dolazi</p>
                    </div>
                    <span className="wedding-guests__count">
                      <Icon name="user" size={16} />
                      {guests.length} {guests.length === 1 ? "osoba" : guests.length < 5 ? "osobe" : "osoba"}
                    </span>
                  </div>

                  {guests.map((guest, idx) => (
                    <div key={idx} ref={(el) => (guestRefs.current[idx] = el)} className="wedding-guest-card">
                      <div className="wedding-guest-card__avatar">{idx + 1}</div>
                      <div className="wedding-guest-card__fields">
                        <input
                          type="text"
                          className="wedding-input"
                          placeholder="Ime"
                          value={guest.firstName}
                          onChange={(e) => updateGuest(idx, "firstName", e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="wedding-input"
                          placeholder="Prezime"
                          value={guest.lastName}
                          onChange={(e) => updateGuest(idx, "lastName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="wedding-guest-card__action">
                        {guests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGuest(idx)}
                            className="wedding-icon-btn"
                            aria-label="Ukloni osobu"
                          >
                            <Icon name="x" size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="text-center wedding-guests__add">
                    <button type="button" onClick={addGuest} className="wedding-add-btn">
                      <Icon name="plus" size={16} />
                      Dodaj još jednu osobu
                    </button>
                  </div>
                </div>
              )}

              {attending !== null && (
                <div className="text-center wedding-submit-wrap">
                  <button type="submit" disabled={submitting} className="wedding-submit">
                    <span className="wedding-submit__icon"><Icon name="envelope" size={18} /></span>
                    <span>{submitting ? "Šaljem..." : "Pošalji potvrdu"}</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Closing */}
        <section className="wedding-section js-reveal" style={{ paddingBottom: 120 }}>
          <div className="container text-center">
            <div className="wedding-divider" aria-hidden="true">
              <span>♥</span>
            </div>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "clamp(20px, 4vw, 40px)",
                color: "var(--wedding-gold-dark)",
                marginBottom: 8,
              }}
            >
              {COUPLE}
            </p>
            <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "var(--wedding-muted)", letterSpacing: "0.1em" }}>{WEDDING_DATE}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
