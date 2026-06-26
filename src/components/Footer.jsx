import { NAV_LINKS, navigateTo } from "./Navbar.jsx";

export default function Footer() {
  return (
    <footer className="ec-footer ec-blueprint-grid">
      <div className="ec-container">
        <div className="ec-footer__top">
          <div>
            <button className="ec-brand ec-brand--button" onClick={() => navigateTo("#/home")}>ENASH <span>CLOUD</span></button>
            <p className="ec-footer__tagline">
              Microsoft services, developer services, cloud infrastructure, learning, news, and digital products for South African businesses and people.
            </p>
          </div>
          <div>
            <div className="ec-footer__heading">Site</div>
            <div className="ec-footer__links">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => navigateTo(link.href)}>{link.label}</button>
              ))}
              <button onClick={() => navigateTo("#/shop")}>Shop</button>
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
  );
}
