import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Courses = lazy(() => import("./pages/Courses.jsx"));
const News = lazy(() => import("./pages/News.jsx"));

function getRouteFromHash() {
  const raw = window.location.hash.replace(/^#/, "");
  const [pagePart, anchorPart] = raw.split("#");
  const page = (pagePart || "/home").replace(/^\//, "") || "home";
  return { page, anchor: anchorPart || "" };
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!route.anchor) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const timer = window.setTimeout(() => {
      const target = document.getElementById(route.anchor);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [route.page, route.anchor]);

  const Page = useMemo(() => {
    if (route.page === "shop") return Shop;
    if (route.page === "courses") return Courses;
    if (route.page === "news") return News;
    return Home;
  }, [route.page]);

  return (
    <div className="ec-root">
      <a href="#main" className="ec-skip">Skip to content</a>
      <Navbar currentPage={route.page} />
      <Suspense fallback={<main id="main" className="ec-section"><div className="ec-container"><span className="ec-eyebrow">Loading</span><h1 className="ec-section-title">Preparing Enash...</h1></div></main>}>
        <Page />
      </Suspense>
      <Footer />
    </div>
  );
}
