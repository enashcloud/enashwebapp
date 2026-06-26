import { useMemo, useState } from "react";
import { serviceFeatureGroups, servicePackages } from "../data/services.js";
import { submitServiceRequest } from "../lib/api.js";
import { navigateTo } from "../components/Navbar.jsx";
import "./Home.css";

function Field({ label, children }) {
  return (
    <label className="ec-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ServiceWizard() {
  const [mode, setMode] = useState("self");
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(servicePackages[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    deadline: "",
    currentSetup: "",
    outcome: "",
    notes: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedPackage = useMemo(
    () => servicePackages.find((item) => item.id === selectedId) || servicePackages[0],
    [selectedId]
  );

  const toggleFeature = (feature) => {
    setSelectedFeatures((current) =>
      current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]
    );
  };

  const updateDetails = (field) => (event) => {
    setDetails((current) => ({ ...current, [field]: event.target.value }));
  };

  const validateStep = () => {
    if (step === 0 && !selectedId) return "Choose a service package.";
    if (step === 1 && selectedFeatures.length === 0) return "Choose at least one feature or deliverable.";
    if (step === 2) {
      if (!details.name.trim() || !details.email.trim()) return "Add your name and email so the request has an owner.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) return "Add a valid email address.";
    }
    return "";
  };

  const next = () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((value) => Math.min(value + 1, 3));
  };

  const back = () => {
    setError("");
    setStep((value) => Math.max(value - 1, 0));
  };

  const submit = async () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setSubmitting(true);
    setError("");
    const request = {
      mode,
      package: selectedPackage,
      features: selectedFeatures,
      answers: details,
      status: "Submitted",
      nextSteps: selectedPackage.steps,
    };
    const saved = await submitServiceRequest(request);
    setResult(saved);
    setSubmitting(false);
  };

  if (result) {
    const summary = `Reference: ${result.reference}\nPackage: ${result.package.title}\nMode: ${result.mode}\nFeatures: ${result.features.join(", ")}\nName: ${result.answers.name}\nEmail: ${result.answers.email}\nOutcome: ${result.answers.outcome}`;
    return (
      <div className="wizard-complete">
        <span className="ec-eyebrow">Request submitted</span>
        <h3>{result.reference}</h3>
        <p>
          Your service request is complete. The system saved it, generated a reference, and produced the implementation checklist below.
        </p>
        <ol>
          {selectedPackage.steps.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <div className="wizard-complete__actions">
          <button className="ec-btn ec-btn--primary" onClick={() => navigator.clipboard?.writeText(summary)}>Copy summary</button>
          <button className="ec-btn ec-btn--ghost" onClick={() => {
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${result.reference}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}>Export request</button>
          <button className="ec-btn ec-btn--ghost" onClick={() => { setResult(null); setStep(0); }}>Start another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-wizard">
      <div className="wizard-tabs" role="tablist" aria-label="Request mode">
        <button className={mode === "self" ? "is-active" : ""} onClick={() => setMode("self")}>Self-service request</button>
        <button className={mode === "assistant" ? "is-active" : ""} onClick={() => setMode("assistant")}>I want assistant guidance</button>
      </div>

      <div className="wizard-progress" aria-label="Progress">
        {["Package", "Features", "Details", "Confirm"].map((label, index) => (
          <span key={label} className={index <= step ? "is-active" : ""}>{index + 1}. {label}</span>
        ))}
      </div>

      {mode === "assistant" && (
        <div className="wizard-assistant-note">
          Assistant mode still avoids calls and emails by default. It asks more questions and creates a clearer brief before anyone contacts you.
        </div>
      )}

      {step === 0 && (
        <div className="wizard-grid">
          {servicePackages.map((item) => (
            <button key={item.id} className={`package-card ${selectedId === item.id ? "is-selected" : ""}`} onClick={() => setSelectedId(item.id)}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>From R{item.priceFrom.toLocaleString("en-ZA")} · {item.timeline}</small>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="wizard-title">Choose exactly what you need</h3>
          <p className="wizard-copy">These options become part of the service request, not cart clutter.</p>
          <div className="feature-group-grid">
            {serviceFeatureGroups.map((group) => (
              <div className="feature-group" key={group.title}>
                <h4>{group.title}</h4>
                {group.items.map((feature) => (
                  <label key={feature} className="feature-check">
                    <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => toggleFeature(feature)} />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wizard-form-grid">
          <Field label="Your name"><input value={details.name} onChange={updateDetails("name")} placeholder="Full name" /></Field>
          <Field label="Email"><input value={details.email} onChange={updateDetails("email")} placeholder="you@company.co.za" /></Field>
          <Field label="Company"><input value={details.company} onChange={updateDetails("company")} placeholder="Company or personal name" /></Field>
          <Field label="Phone optional"><input value={details.phone} onChange={updateDetails("phone")} placeholder="Only if you want assistant contact" /></Field>
          <Field label="Budget range"><select value={details.budget} onChange={updateDetails("budget")}><option value="">Choose range</option><option>Under R2,500</option><option>R2,500 - R7,500</option><option>R7,500 - R20,000</option><option>R20,000+</option><option>Need guidance</option></select></Field>
          <Field label="Target date"><input type="date" value={details.deadline} onChange={updateDetails("deadline")} /></Field>
          <Field label="Current setup"><textarea value={details.currentSetup} onChange={updateDetails("currentSetup")} placeholder="What are you using today?" /></Field>
          <Field label="Desired outcome"><textarea value={details.outcome} onChange={updateDetails("outcome")} placeholder="What should be working at the end?" /></Field>
          {mode === "assistant" && <Field label="Where do you need guidance?"><textarea value={details.notes} onChange={updateDetails("notes")} placeholder="Tell us what is confusing or risky." /></Field>}
        </div>
      )}

      {step === 3 && (
        <div className="wizard-review">
          <h3>{selectedPackage.title}</h3>
          <p>{selectedPackage.summary}</p>
          <div className="review-box"><strong>Features:</strong> {selectedFeatures.join(", ")}</div>
          <div className="review-box"><strong>Owner:</strong> {details.name} · {details.email}</div>
          <div className="review-box"><strong>Outcome:</strong> {details.outcome || "Not provided"}</div>
          <div className="review-box"><strong>Process:</strong> {mode === "self" ? "Self-service package request" : "Assistant-guided request"}</div>
        </div>
      )}

      {error && <div className="ec-form-note ec-form-note--error">{error}</div>}

      <div className="wizard-actions">
        <button className="ec-btn ec-btn--ghost" onClick={back} disabled={step === 0}>Back</button>
        {step < 3 ? (
          <button className="ec-btn ec-btn--primary" onClick={next}>Continue</button>
        ) : (
          <button className="ec-btn ec-btn--primary" onClick={submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit request"}</button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main">
      <section id="hero" className="ec-hero ec-blueprint-grid">
        <div className="ec-container">
          <span className="ec-eyebrow">Microsoft services · developer services · business systems</span>
          <h1 className="ec-hero__title">Build, launch, and run your business systems properly.</h1>
          <p className="ec-hero__sub">
            Enash helps businesses and individuals set up Microsoft tools, Azure hosting, websites, apps, automations, training, and practical digital systems without forcing every step into a phone call.
          </p>
          <div className="ec-hero__ctas">
            <button className="ec-btn ec-btn--primary" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Explore services</button>
            <button className="ec-btn ec-btn--ghost" onClick={() => navigateTo("#/shop")}>Visit shop</button>
            <button className="ec-btn ec-btn--ghost" onClick={() => navigateTo("#/courses")}>Free courses</button>
          </div>

          <div className="ec-titleblock" aria-label="Enash service summary">
            <div className="ec-titleblock__item"><div className="ec-titleblock__label"><span className="ec-status-dot" />Status</div><div className="ec-titleblock__value">OPEN</div></div>
            <div className="ec-titleblock__item"><div className="ec-titleblock__label">Platform</div><div className="ec-titleblock__value">AZURE</div></div>
            <div className="ec-titleblock__item"><div className="ec-titleblock__label">Work</div><div className="ec-titleblock__value">BUILD</div></div>
            <div className="ec-titleblock__item"><div className="ec-titleblock__label">Learn</div><div className="ec-titleblock__value">FREE</div></div>
            <div className="ec-titleblock__item"><div className="ec-titleblock__label">Shop</div><div className="ec-titleblock__value">READY</div></div>
          </div>
        </div>
      </section>

      <section id="services" className="ec-section">
        <div className="ec-container">
          <div className="ec-section-head">
            <span className="ec-eyebrow">What we deliver</span>
            <h2 className="ec-section-title">Services that users can request without waiting for a call</h2>
            <p className="ec-section-sub">Every package has a self-service request process. Users can choose a package, select features, add details, and submit a complete brief.</p>
          </div>
          <div className="ec-services-grid">
            {servicePackages.map((service) => (
              <article className="ec-card" key={service.id}>
                <div className="ec-card__top"><span className="ec-card__tag">{service.tag}</span><span className="ec-card__icon">▣</span></div>
                <h3 className="ec-card__title">{service.title}</h3>
                <p className="ec-card__desc">{service.summary}</p>
                <ul className="ec-card__list">
                  {service.includes.map((item) => <li key={item}><span>✓</span>{item}</li>)}
                </ul>
                <div className="ec-card__format">From R{service.priceFrom.toLocaleString("en-ZA")} · {service.timeline}</div>
                <button className="ec-btn ec-btn--primary ec-btn--block" onClick={() => document.getElementById("service-request")?.scrollIntoView({ behavior: "smooth" })}>Request this package</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="ec-section ec-section--deep">
        <div className="ec-container">
          <div className="ec-section-head">
            <span className="ec-eyebrow">How it works</span>
            <h2 className="ec-section-title">A complete request path from start to end</h2>
            <p className="ec-section-sub">The system asks the details needed to scope work. Calls and emails are optional assistance channels, not the default process.</p>
          </div>
          <div className="ec-process">
            {[
              ["01", "Choose", "Pick a Microsoft, developer, automation, support, or training package."],
              ["02", "Configure", "Select features and describe the exact outcome you want."],
              ["03", "Confirm", "Review budget, date, current setup, and delivery details."],
              ["04", "Reference", "Submit and get a reference number plus next-step checklist."],
            ].map(([n, title, body]) => <div className="ec-step" key={n}><span className="ec-step__n">{n}</span><h3 className="ec-step__title">{title}</h3><p className="ec-step__body">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section id="service-request" className="ec-section">
        <div className="ec-container">
          <div className="ec-section-head">
            <span className="ec-eyebrow">Request services</span>
            <h2 className="ec-section-title">Start a package request</h2>
            <p className="ec-section-sub">Use self-service when you know what you want. Use assistant guidance when you want the site to help you build the brief first.</p>
          </div>
          <ServiceWizard />
        </div>
      </section>

      <section id="values" className="ec-section ec-section--deep">
        <div className="ec-container">
          <div className="ec-section-head"><span className="ec-eyebrow">Why Enash Cloud</span><h2 className="ec-section-title">Built for businesses that need practical technology, not confusion</h2></div>
          <div className="ec-values-grid">
            {[
              ["Fixed-scope packages", "Users see the service shape before they submit a request."],
              ["Microsoft and developer focus", "The site is positioned around Azure, Microsoft 365, websites, apps, and automation."],
              ["Self-service first", "Clients can request work, buy items, enrol in courses, and read news without calling."],
              ["South African business", "Enash Cloud trades under Indesign and Developers (Pty) Ltd, registered in South Africa."],
            ].map(([title, body]) => <div className="ec-value" key={title}><span className="ec-value__icon">◆</span><div><h3>{title}</h3><p>{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="ec-section">
        <div className="ec-container ec-about__grid">
          <div className="ec-about__body">
            <span className="ec-eyebrow">About</span>
            <h2 className="ec-section-title">From design and development, to systems and cloud.</h2>
            <p>Enash Cloud is the technology arm of Indesign and Developers (Pty) Ltd. The business focuses on useful systems: Microsoft services, Azure hosting, websites, developer work, automation, digital products, courses, and technology articles.</p>
            <p>The site is now structured as a public service platform. Home explains the business, Shop handles digital/products, Courses holds free training, News holds real-event based articles, and service requests are handled through a guided process.</p>
          </div>
          <div className="ec-about__diagram" aria-hidden="true">
            <div className="diagram-node">Microsoft</div><div className="diagram-line" /><div className="diagram-node">Developers</div><div className="diagram-line" /><div className="diagram-node">Business systems</div>
          </div>
        </div>
      </section>

      <section id="contact" className="ec-section ec-section--deep">
        <div className="ec-container">
          <div className="ec-section-head">
            <span className="ec-eyebrow">Contact</span>
            <h2 className="ec-section-title">Assistance is available, but not required for every action</h2>
            <p className="ec-section-sub">Use the self-service request form above for package work. Contact details can stay as optional support information in the public website.</p>
          </div>
          <div className="contact-strip">
            <div><strong>Email</strong><span>hello@enash.co.za</span></div>
            <div><strong>Website</strong><span>www.enash.co.za</span></div>
            <div><strong>Location</strong><span>South Africa · Remote-ready</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
