import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  Server,
  Workflow,
  Menu,
  X,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ----------------------------- content data ----------------------------- */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#values" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    tag: "Detail A",
    icon: Cloud,
    title: "Cloud Migration Sprint",
    description:
      "A fixed-fee project that moves your business off on-premise servers or shared hosting and onto Microsoft Azure, without the downtime drama.",
    includes: [
      "Infrastructure & risk assessment",
      "Migration plan with fixed timeline",
      "Data migration and cutover",
      "Two weeks of post-migration support",
    ],
    format: "Fixed-fee project · 2–6 weeks",
  },
  {
    tag: "Detail B",
    icon: Server,
    title: "Managed Cloud & IT Support",
    description:
      "Ongoing monitoring, backups, security patching, and a helpdesk that actually answers, so your systems stay online and up to date.",
    includes: [
      "24/7 monitoring and alerting",
      "Automated, tested backups",
      "Security patching on a schedule",
      "Helpdesk support for your team",
    ],
    format: "Monthly retainer · 30 days' notice to cancel",
  },
  {
    tag: "Detail C",
    icon: Workflow,
    title: "AI Quick Wins",
    description:
      "Small, focused automations, a chatbot, a document workflow, a reporting dashboard, built on Azure AI and bolted onto what you already run.",
    includes: [
      "One discovery workshop",
      "One working automation, shipped",
      "Training for your team",
      "30 days of tuning after launch",
    ],
    format: "Fixed-fee add-on · 1–3 weeks",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Survey",
    body: "We map what you have today: servers, software, spend, and risk. You get a plain-language account of what we find, not a sales pitch.",
  },
  {
    n: "02",
    title: "Schematic",
    body: "We design the target setup: what moves to Azure, what stays put, what changes, and exactly what it costs before any work starts.",
  },
  {
    n: "03",
    title: "Build",
    body: "We migrate, configure, and test in an order built to avoid surprises, with a rollback plan in place before we touch anything live.",
  },
  {
    n: "04",
    title: "Handover",
    body: "You get documentation, trained access for your team, and, if you choose the retainer, an ongoing support line that picks up.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Fixed-fee delivery",
    body: "Project quotes are fixed before work starts. No surprise line items once we're in.",
  },
  {
    icon: CheckCircle2,
    title: "Security-first by default",
    body: "Baseline hardening is included in every engagement, not sold separately afterwards.",
  },
  {
    icon: MapPin,
    title: "Registered in South Africa",
    body: "Enash Cloud trades under Indesign and Developers (Pty) Ltd, registered locally since 2020.",
  },
  {
    icon: Cloud,
    title: "Built on Microsoft Azure",
    body: "We specialise in one cloud platform so we can go deep on it, rather than spreading thin.",
  },
];

/* ------------------------------ small hooks ------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`ec-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function useCountUp(target, decimals, durationMs, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [start, target, durationMs]);

  return value.toFixed(decimals);
}

/* --------------------------------- app --------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [formState, setFormState] = useState("idle"); // idle | submitting | sent | error

  useEffect(() => {
    setStatsStarted(true);
  }, []);

  const slaTarget = useCountUp(99.9, 1, 1500, statsStarted);
  const responseTarget = useCountUp(2, 0, 1100, statsStarted);

  const scrollTo = (href) => (event) => {
    event.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateField = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !isValidEmail(form.email)) {
      setFormState("error");
      return;
    }
    setFormState("submitting");
    window.setTimeout(() => {
      setFormState("sent");
    }, 900);
  };

  return (
    <div className="ec-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@600;700&display=swap');

        .ec-root {
          --bg: #142C46;
          --bg-deep: #0D1F33;
          --bg-panel: #1B3B5C;
          --bg-panel-soft: #1F4467;
          --ink: #F4EFE3;
          --ink-dim: rgba(244, 239, 227, 0.7);
          --ink-faint: rgba(244, 239, 227, 0.45);
          --accent: #E0793A;
          --accent-soft: rgba(224, 121, 58, 0.16);
          --status: #7FD9B9;
          --line: rgba(244, 239, 227, 0.09);
          --line-strong: rgba(244, 239, 227, 0.24);
          --font-display: 'IBM Plex Sans Condensed', 'Arial Narrow', sans-serif;
          --font-body: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
          --font-mono: 'IBM Plex Mono', 'Courier New', monospace;

          background: var(--bg);
          color: var(--ink);
          font-family: var(--font-body);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow-x: hidden;
        }

        .ec-root *,
        .ec-root *::before,
        .ec-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ec-root a { color: inherit; text-decoration: none; }
        .ec-root ul { list-style: none; }
        .ec-root button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
        .ec-root input, .ec-root textarea { font: inherit; color: inherit; }

        .ec-root :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .ec-skip {
          position: absolute;
          left: -9999px;
          top: 0;
          background: var(--accent);
          color: var(--bg-deep);
          padding: 0.6rem 1rem;
          z-index: 100;
        }
        .ec-skip:focus { left: 1rem; top: 1rem; }

        .ec-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 768px) {
          .ec-container { padding: 0 2rem; }
        }

        .ec-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ec-eyebrow::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--accent);
        }

        .ec-section { padding: 5rem 0; position: relative; }
        @media (min-width: 768px) { .ec-section { padding: 7rem 0; } }

        .ec-section-head { max-width: 640px; margin-bottom: 3rem; }
        .ec-section-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          line-height: 1.15;
          margin-top: 0.85rem;
          letter-spacing: -0.01em;
        }
        .ec-section-sub {
          margin-top: 0.85rem;
          color: var(--ink-dim);
          font-size: 1.02rem;
          max-width: 36rem;
        }

        .ec-blueprint-grid {
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        /* reveal-on-scroll */
        .ec-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ec-reveal.is-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .ec-root *, .ec-root *::before, .ec-root *::after {
            animation: none !important;
            transition: none !important;
          }
          .ec-reveal { opacity: 1; transform: none; }
        }

        /* ---------------------------- nav ---------------------------- */
        .ec-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(13, 31, 51, 0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line-strong);
        }
        .ec-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.25rem;
        }
        .ec-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }
        .ec-brand span { color: var(--accent); }
        .ec-nav__links {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        .ec-nav__links a {
          font-size: 0.92rem;
          color: var(--ink-dim);
          transition: color 0.2s ease;
        }
        .ec-nav__links a:hover { color: var(--ink); }

        @media (min-width: 920px) {
          .ec-nav__links { display: flex; }
          .ec-nav__toggle { display: none; }
        }

        .ec-nav__toggle {
          display: inline-flex;
          padding: 0.4rem;
        }

        .ec-nav__mobile {
          border-top: 1px solid var(--line-strong);
          padding: 1rem 0 1.5rem;
        }
        .ec-nav__mobile a {
          display: block;
          padding: 0.65rem 0;
          font-size: 1rem;
          color: var(--ink-dim);
        }

        .ec-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.75rem 1.3rem;
          border: 1px solid var(--line-strong);
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .ec-btn--primary {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg-deep);
        }
        .ec-btn--primary:hover { transform: translateY(-1px); filter: brightness(1.06); }
        .ec-btn--ghost { color: var(--ink); }
        .ec-btn--ghost:hover { border-color: var(--ink-faint); background: rgba(244,239,227,0.04); }
        .ec-btn--block { width: 100%; justify-content: center; }
        .ec-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* ---------------------------- hero ---------------------------- */
        .ec-hero { padding: 4.5rem 0 0; }
        @media (min-width: 768px) { .ec-hero { padding: 6rem 0 0; } }

        .ec-hero__title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.2rem, 5.4vw, 3.6rem);
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin-top: 1.1rem;
          max-width: 18ch;
        }
        .ec-hero__sub {
          margin-top: 1.25rem;
          font-size: 1.1rem;
          color: var(--ink-dim);
          max-width: 38rem;
        }
        .ec-hero__ctas {
          margin-top: 2.1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
        }

        .ec-titleblock {
          margin-top: 3.5rem;
          border: 1px solid var(--line-strong);
          background: var(--bg-deep);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 700px) {
          .ec-titleblock { grid-template-columns: repeat(5, 1fr); }
        }
        .ec-titleblock__item {
          padding: 1.1rem 1.3rem;
          border-right: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
        }
        @media (min-width: 700px) {
          .ec-titleblock__item:last-child { border-right: none; }
          .ec-titleblock__item { border-bottom: none; }
        }
        .ec-titleblock__item:nth-child(2n) { border-right: none; }
        @media (min-width: 700px) {
          .ec-titleblock__item:nth-child(2n) { border-right: 1px solid var(--line-strong); }
          .ec-titleblock__item:last-child { border-right: none; }
        }
        .ec-titleblock__label {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-faint);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ec-titleblock__value {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          margin-top: 0.35rem;
        }
        .ec-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--status);
          box-shadow: 0 0 0 0 rgba(127, 217, 185, 0.6);
          animation: ec-pulse 2.2s ease-out infinite;
        }
        @keyframes ec-pulse {
          0% { box-shadow: 0 0 0 0 rgba(127, 217, 185, 0.55); }
          70% { box-shadow: 0 0 0 6px rgba(127, 217, 185, 0); }
          100% { box-shadow: 0 0 0 0 rgba(127, 217, 185, 0); }
        }
        @keyframes ec-spin { to { transform: rotate(360deg); } }
        .ec-spin { animation: ec-spin 0.8s linear infinite; }

        /* ------------------------- trust strip ------------------------- */
        .ec-trust {
          margin-top: 3.25rem;
          padding: 1rem 0;
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
        }
        .ec-trust p {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-faint);
          letter-spacing: 0.02em;
          text-align: center;
        }

        /* --------------------------- services --------------------------- */
        .ec-services-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 860px) {
          .ec-services-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .ec-card {
          position: relative;
          background: var(--bg-panel);
          border: 1px solid var(--line-strong);
          padding: 1.9rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ec-card::before, .ec-card::after,
        .ec-card .ec-corner-tl, .ec-card .ec-corner-br {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--accent);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .ec-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--accent);
          border-left: 2px solid var(--accent);
        }
        .ec-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
        }
        .ec-card:hover::before, .ec-card:hover::after,
        .ec-card:focus-within::before, .ec-card:focus-within::after {
          opacity: 1;
        }

        .ec-card__top { display: flex; align-items: center; justify-content: space-between; }
        .ec-card__tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }
        .ec-card__icon {
          width: 38px; height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          color: var(--accent);
        }
        .ec-card__title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.3rem;
        }
        .ec-card__desc { color: var(--ink-dim); font-size: 0.96rem; }
        .ec-card__list { display: flex; flex-direction: column; gap: 0.55rem; margin-top: 0.25rem; }
        .ec-card__list li {
          display: flex;
          gap: 0.55rem;
          align-items: flex-start;
          font-size: 0.9rem;
          color: var(--ink-dim);
        }
        .ec-card__list svg { flex-shrink: 0; margin-top: 0.15rem; color: var(--status); }
        .ec-card__format {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--line-strong);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-faint);
        }

        /* --------------------------- process --------------------------- */
        .ec-process {
          display: grid;
          gap: 0;
          grid-template-columns: 1fr;
          border: 1px solid var(--line-strong);
        }
        @media (min-width: 860px) {
          .ec-process { grid-template-columns: repeat(4, 1fr); }
        }
        .ec-step {
          padding: 1.8rem;
          border-bottom: 1px solid var(--line-strong);
          position: relative;
        }
        @media (min-width: 860px) {
          .ec-step { border-bottom: none; border-right: 1px solid var(--line-strong); }
          .ec-step:last-child { border-right: none; }
        }
        .ec-step:last-child { border-bottom: none; }
        .ec-step__n {
          font-family: var(--font-mono);
          color: var(--accent);
          font-size: 0.85rem;
          letter-spacing: 0.08em;
        }
        .ec-step__title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          margin-top: 0.6rem;
        }
        .ec-step__body {
          margin-top: 0.6rem;
          font-size: 0.9rem;
          color: var(--ink-dim);
        }

        /* --------------------------- values --------------------------- */
        .ec-values-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .ec-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .ec-value {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border: 1px solid var(--line-strong);
          background: var(--bg-panel-soft);
        }
        .ec-value__icon {
          width: 40px; height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          color: var(--status);
        }
        .ec-value__title { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
        .ec-value__body { margin-top: 0.35rem; font-size: 0.9rem; color: var(--ink-dim); }

        /* --------------------------- about --------------------------- */
        .ec-about__grid {
          display: grid;
          gap: 2.5rem;
          align-items: center;
          grid-template-columns: 1fr;
        }
        @media (min-width: 860px) {
          .ec-about__grid { grid-template-columns: 1.1fr 0.9fr; }
        }
        .ec-about__body p { color: var(--ink-dim); font-size: 1rem; }
        .ec-about__body p + p { margin-top: 1rem; }
        .ec-about__diagram {
          border: 1px solid var(--line-strong);
          padding: 1.5rem;
          background: var(--bg-deep);
        }

        /* --------------------------- contact --------------------------- */
        .ec-contact__grid {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .ec-contact__grid { grid-template-columns: 1fr 1fr; }
        }
        .ec-field { margin-bottom: 1.1rem; }
        .ec-field label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-bottom: 0.45rem;
        }
        .ec-field input, .ec-field textarea {
          width: 100%;
          background: var(--bg-deep);
          border: 1px solid var(--line-strong);
          padding: 0.75rem 0.9rem;
          font-size: 0.95rem;
        }
        .ec-field input::placeholder, .ec-field textarea::placeholder { color: var(--ink-faint); }
        .ec-field textarea { min-height: 120px; resize: vertical; }
        .ec-field input:focus, .ec-field textarea:focus { border-color: var(--accent); }

        .ec-form-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-top: 0.9rem;
        }
        .ec-form-note--error { color: var(--accent); }
        .ec-form-note--success { color: var(--status); }

        .ec-contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .ec-contact-info__row { display: flex; gap: 0.85rem; align-items: flex-start; }
        .ec-contact-info__row svg { color: var(--accent); flex-shrink: 0; margin-top: 0.15rem; }
        .ec-contact-info__label { font-size: 0.95rem; }
        .ec-contact-info__sub { font-size: 0.82rem; color: var(--ink-faint); margin-top: 0.15rem; }

        /* --------------------------- footer --------------------------- */
        .ec-footer {
          border-top: 1px solid var(--line-strong);
          padding: 3.5rem 0 2rem;
        }
        .ec-footer__top {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: 1fr;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--line-strong);
        }
        @media (min-width: 760px) {
          .ec-footer__top { grid-template-columns: 1.2fr 1fr 1fr; }
        }
        .ec-footer__tagline { margin-top: 0.75rem; color: var(--ink-dim); font-size: 0.92rem; max-width: 26rem; }
        .ec-footer__heading {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-bottom: 0.9rem;
        }
        .ec-footer__links { display: flex; flex-direction: column; gap: 0.6rem; }
        .ec-footer__links a { color: var(--ink-dim); font-size: 0.92rem; }
        .ec-footer__links a:hover { color: var(--ink); }
        .ec-footer__legal dl { display: grid; grid-template-columns: auto 1fr; gap: 0.4rem 0.75rem; font-size: 0.85rem; }
        .ec-footer__legal dt { color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; align-self: start; padding-top: 0.1rem; }
        .ec-footer__legal dd { color: var(--ink-dim); }
        .ec-footer__bottom {
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--ink-faint);
        }
      `}</style>

      <a href="#main" className="ec-skip">Skip to content</a>

      {/* ---------------------------- nav ---------------------------- */}
      <header className="ec-nav">
        <div className="ec-container ec-nav__inner">
          <a href="#hero" className="ec-brand" onClick={scrollTo("#hero")}>
            ENASH <span>CLOUD</span>
          </a>
          <nav className="ec-nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={scrollTo(link.href)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="ec-btn ec-btn--primary" onClick={scrollTo("#contact")}>
              Book a call <ArrowRight size={14} />
            </a>
          </nav>
          <button
            className="ec-nav__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="ec-nav__mobile ec-container">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={scrollTo(link.href)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="ec-btn ec-btn--primary ec-btn--block" onClick={scrollTo("#contact")} style={{ marginTop: "0.5rem" }}>
              Book a call <ArrowRight size={14} />
            </a>
          </div>
        )}
      </header>

      <main id="main">
        {/* ---------------------------- hero ---------------------------- */}
        <section id="hero" className="ec-hero ec-blueprint-grid">
          <div className="ec-container">
            <span className="ec-eyebrow">Cloud infrastructure · South Africa</span>
            <h1 className="ec-hero__title">We design systems your business can stand on.</h1>
            <p className="ec-hero__sub">
              Enash Cloud plans, builds, and looks after the Microsoft Azure infrastructure
              behind your business, so your team can stop worrying about servers and get back
              to work.
            </p>
            <div className="ec-hero__ctas">
              <a href="#contact" className="ec-btn ec-btn--primary" onClick={scrollTo("#contact")}>
                Book a free assessment <ArrowRight size={14} />
              </a>
              <a href="#process" className="ec-btn ec-btn--ghost" onClick={scrollTo("#process")}>
                See how we work
              </a>
            </div>

            <div className="ec-titleblock" role="group" aria-label="Service commitments">
              <div className="ec-titleblock__item">
                <span className="ec-titleblock__label"><span className="ec-status-dot" aria-hidden="true" />Status</span>
                <div className="ec-titleblock__value">Operational</div>
              </div>
              <div className="ec-titleblock__item">
                <span className="ec-titleblock__label">Stack</span>
                <div className="ec-titleblock__value">Azure</div>
              </div>
              <div className="ec-titleblock__item">
                <span className="ec-titleblock__label">SLA target</span>
                <div className="ec-titleblock__value">{slaTarget}%</div>
              </div>
              <div className="ec-titleblock__item">
                <span className="ec-titleblock__label">Response target</span>
                <div className="ec-titleblock__value">&lt;{responseTarget}h</div>
              </div>
              <div className="ec-titleblock__item">
                <span className="ec-titleblock__label">Established</span>
                <div className="ec-titleblock__value">2020</div>
              </div>
            </div>
          </div>

          <div className="ec-trust">
            <p>
              TRADING AS ENASH CLOUD &nbsp;·&nbsp; INDESIGN AND DEVELOPERS (PTY) LTD &nbsp;·&nbsp; REGISTERED IN SOUTH AFRICA SINCE 2020
            </p>
          </div>
        </section>

        {/* ---------------------------- services ---------------------------- */}
        <section id="services" className="ec-section">
          <div className="ec-container">
            <Reveal as="div" className="ec-section-head">
              <span className="ec-eyebrow">What we deliver</span>
              <h2 className="ec-section-title">Three ways to work with us</h2>
              <p className="ec-section-sub">
                Pick the entry point that matches where you are today. Most clients start with
                one and add the others as they grow.
              </p>
            </Reveal>

            <div className="ec-services-grid">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.title} delay={index * 90} className="ec-card">
                    <div className="ec-card__top">
                      <span className="ec-card__tag">{service.tag}</span>
                      <span className="ec-card__icon"><Icon size={18} /></span>
                    </div>
                    <h3 className="ec-card__title">{service.title}</h3>
                    <p className="ec-card__desc">{service.description}</p>
                    <ul className="ec-card__list">
                      {service.includes.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={15} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="ec-card__format">{service.format}</div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------- process ---------------------------- */}
        <section id="process" className="ec-section" style={{ background: "var(--bg-deep)" }}>
          <div className="ec-container">
            <Reveal as="div" className="ec-section-head">
              <span className="ec-eyebrow">How we work</span>
              <h2 className="ec-section-title">Four stages, one sheet</h2>
              <p className="ec-section-sub">
                Every engagement follows the same drawing, whether it is a two-week sprint or an
                ongoing retainer.
              </p>
            </Reveal>

            <Reveal className="ec-process">
              {PROCESS_STEPS.map((step) => (
                <div key={step.n} className="ec-step">
                  <span className="ec-step__n">{step.n}</span>
                  <h3 className="ec-step__title">{step.title}</h3>
                  <p className="ec-step__body">{step.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------------------- values ---------------------------- */}
        <section id="values" className="ec-section">
          <div className="ec-container">
            <Reveal as="div" className="ec-section-head">
              <span className="ec-eyebrow">Why Enash Cloud</span>
              <h2 className="ec-section-title">Built for businesses that can't afford guesswork</h2>
            </Reveal>

            <div className="ec-values-grid">
              {VALUES.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Reveal key={value.title} delay={index * 80} className="ec-value">
                    <span className="ec-value__icon"><Icon size={18} /></span>
                    <div>
                      <h3 className="ec-value__title">{value.title}</h3>
                      <p className="ec-value__body">{value.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------- about ---------------------------- */}
        <section id="about" className="ec-section" style={{ background: "var(--bg-deep)" }}>
          <div className="ec-container">
            <div className="ec-about__grid">
              <Reveal className="ec-about__body">
                <span className="ec-eyebrow">About</span>
                <h2 className="ec-section-title">From design and development, to systems and cloud.</h2>
                <p style={{ marginTop: "1.25rem" }}>
                  Enash Cloud is the technology arm of Indesign and Developers (Pty) Ltd, a South
                  African company registered in 2020. We started by building things. Now we
                  build the systems that keep other businesses running.
                </p>
                <p>
                  Our work covers cloud infrastructure, managed IT, and the small pieces of
                  automation that save a team real hours every week. We keep our service menu
                  short on purpose, so every engagement gets proper attention rather than being
                  one of fifty open tickets.
                </p>
              </Reveal>

              <Reveal delay={120} className="ec-about__diagram" aria-hidden="true">
                <svg viewBox="0 0 320 220" width="100%" height="auto" role="img" aria-label="Diagram of on-premise systems migrating to a connected cloud network">
                  <g fill="none" stroke="rgba(244,239,227,0.35)" strokeWidth="1.2">
                    <rect x="18" y="150" width="34" height="46" />
                    <rect x="60" y="150" width="34" height="46" />
                    <line x1="18" y1="166" x2="52" y2="166" />
                    <line x1="60" y1="166" x2="94" y2="166" />
                    <line x1="35" y1="150" x2="35" y2="196" strokeDasharray="3 3" />
                    <line x1="77" y1="150" x2="77" y2="196" strokeDasharray="3 3" />
                  </g>
                  <g stroke="rgba(224,121,58,0.85)" strokeWidth="1.4" fill="none" strokeDasharray="5 5">
                    <path d="M75 150 C 130 120, 150 110, 190 95" />
                  </g>
                  <g stroke="rgba(244,239,227,0.5)" strokeWidth="1.2" fill="none">
                    <circle cx="225" cy="70" r="34" />
                    <circle cx="190" cy="95" r="6" fill="#0D1F33" />
                    <circle cx="245" cy="40" r="6" fill="#0D1F33" />
                    <circle cx="260" cy="85" r="6" fill="#0D1F33" />
                    <line x1="225" y1="70" x2="190" y2="95" />
                    <line x1="225" y1="70" x2="245" y2="40" />
                    <line x1="225" y1="70" x2="260" y2="85" />
                  </g>
                  <g fill="rgba(127,217,185,0.9)">
                    <circle cx="225" cy="70" r="3" />
                  </g>
                  <text x="18" y="210" fill="rgba(244,239,227,0.45)" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="0.5">ON-PREMISE</text>
                  <text x="190" y="135" fill="rgba(244,239,227,0.45)" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="0.5">AZURE</text>
                </svg>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------------------- contact ---------------------------- */}
        <section id="contact" className="ec-section">
          <div className="ec-container">
            <div className="ec-contact__grid">
              <Reveal>
                <span className="ec-eyebrow">Get in touch</span>
                <h2 className="ec-section-title">Start with a free assessment</h2>
                <p className="ec-section-sub" style={{ marginBottom: "2rem" }}>
                  Tell us what you're running today. We'll tell you, in plain terms, what moving
                  to Azure would look like and what it would cost.
                </p>

                {formState === "sent" ? (
                  <div className="ec-form-note ec-form-note--success" role="status">
                    <CheckCircle2 size={18} />
                    <span>Thanks, {form.name.split(" ")[0] || "there"}. We've got your message and will reply within two business days.</span>
                  </div>
                ) : (
                  <div>
                    <div className="ec-field">
                      <label htmlFor="ec-name">Name</label>
                      <input
                        id="ec-name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={updateField("name")}
                        autoComplete="name"
                      />
                    </div>
                    <div className="ec-field">
                      <label htmlFor="ec-email">Work email</label>
                      <input
                        id="ec-email"
                        type="email"
                        placeholder="you@company.co.za"
                        value={form.email}
                        onChange={updateField("email")}
                        autoComplete="email"
                      />
                    </div>
                    <div className="ec-field">
                      <label htmlFor="ec-company">Company</label>
                      <input
                        id="ec-company"
                        type="text"
                        placeholder="Company name"
                        value={form.company}
                        onChange={updateField("company")}
                        autoComplete="organization"
                      />
                    </div>
                    <div className="ec-field">
                      <label htmlFor="ec-message">What do you need help with?</label>
                      <textarea
                        id="ec-message"
                        placeholder="A short description of your current setup and what's not working"
                        value={form.message}
                        onChange={updateField("message")}
                      />
                    </div>

                    <button
                      className="ec-btn ec-btn--primary ec-btn--block"
                      onClick={handleSubmit}
                      disabled={formState === "submitting"}
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 size={15} className="ec-spin" /> Sending
                        </>
                      ) : (
                        <>Request my assessment <ArrowRight size={14} /></>
                      )}
                    </button>

                    {formState === "error" && (
                      <div className="ec-form-note ec-form-note--error" role="alert">
                        <AlertCircle size={16} />
                        <span>Please add your name, a valid email, and a short message before sending.</span>
                      </div>
                    )}
                  </div>
                )}
              </Reveal>

              <Reveal delay={100} className="ec-contact-info">
                <div className="ec-contact-info__row">
                  <Mail size={18} />
                  <div>
                    <div className="ec-contact-info__label">hello@enashcloud.co.za</div>
                    <div className="ec-contact-info__sub">Replace with your real inbox before launch</div>
                  </div>
                </div>
                <div className="ec-contact-info__row">
                  <Phone size={18} />
                  <div>
                    <div className="ec-contact-info__label">+27 00 000 0000</div>
                    <div className="ec-contact-info__sub">Replace with your real number before launch</div>
                  </div>
                </div>
                <div className="ec-contact-info__row">
                  <MapPin size={18} />
                  <div>
                    <div className="ec-contact-info__label">Johannesburg, South Africa</div>
                    <div className="ec-contact-info__sub">Serving clients locally and remotely</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------- footer ---------------------------- */}
      <footer className="ec-footer ec-blueprint-grid">
        <div className="ec-container">
          <div className="ec-footer__top">
            <div>
              <a href="#hero" className="ec-brand" onClick={scrollTo("#hero")}>
                ENASH <span>CLOUD</span>
              </a>
              <p className="ec-footer__tagline">
                Cloud infrastructure, managed IT, and AI automation for South African businesses,
                built on Microsoft Azure.
              </p>
            </div>
            <div>
              <div className="ec-footer__heading">Site</div>
              <div className="ec-footer__links">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={scrollTo(link.href)}>{link.label}</a>
                ))}
              </div>
            </div>
            <div className="ec-footer__legal">
              <div className="ec-footer__heading">Title block</div>
              <dl>
                <dt>Trading as</dt><dd>Enash Cloud</dd>
                <dt>Entity</dt><dd>Indesign and Developers (Pty) Ltd</dd>
                <dt>Reg. no.</dt><dd>2020/588040/07</dd>
                <dt>Jurisdiction</dt><dd>South Africa</dd>
              </dl>
            </div>
          </div>
          <div className="ec-footer__bottom">
            <span>© {new Date().getFullYear()} ENASH CLOUD. ALL SYSTEMS OPERATIONAL.</span>
            <span>BUILT ON MICROSOFT AZURE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
