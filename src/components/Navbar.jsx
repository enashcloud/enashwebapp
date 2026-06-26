import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#/home#services" },
  { label: "Process", href: "#/home#process" },
  { label: "Why us", href: "#/home#values" },
  { label: "Courses", href: "#/courses" },
  { label: "News", href: "#/news" },
  { label: "Contact", href: "#/home#contact" },
];

function navigateTo(href, closeMenu) {
  closeMenu?.();
  const [route, anchor] = href.replace("#", "").split("#");
  window.location.hash = `#${route || "/home"}${anchor ? `#${anchor}` : ""}`;
  if (anchor) {
    window.setTimeout(() => {
      const target = document.getElementById(anchor);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Navbar({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="ec-nav">
      <div className="ec-container ec-nav__inner">
        <button className="ec-brand ec-brand--button" onClick={() => navigateTo("#/home", () => setMenuOpen(false))}>
          ENASH <span>CLOUD</span>
        </button>

        <nav className="ec-nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className={currentPage === link.href.replace("#/", "").split("#")[0] ? "is-active" : ""}
              onClick={() => navigateTo(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="ec-nav__actions">
          <button className="ec-btn ec-btn--ghost ec-btn--nav" onClick={() => navigateTo("#/shop")}>
            Shop
          </button>
          <button className="ec-btn ec-btn--primary ec-btn--nav" onClick={() => navigateTo("#/home#service-request")}>
            Request service
          </button>
          <button className="ec-nav__toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">
            <span className="ec-menu-icon">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="ec-nav__mobile ec-container">
          {NAV_LINKS.map((link) => (
            <button key={link.href} onClick={() => navigateTo(link.href, () => setMenuOpen(false))}>
              {link.label}
            </button>
          ))}
          <button onClick={() => navigateTo("#/shop", () => setMenuOpen(false))}>Shop</button>
          <button onClick={() => navigateTo("#/home#service-request", () => setMenuOpen(false))}>Request service</button>
        </div>
      )}
    </header>
  );
}

export { NAV_LINKS, navigateTo };
