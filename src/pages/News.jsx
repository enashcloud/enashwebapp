import { useMemo, useState } from "react";
import { articles } from "../data/newsData.js";
import { readStore, writeStore } from "../lib/storage.js";
import { saveNewsBookmark } from "../lib/api.js";
import "./News.css";

const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];

export default function News() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(articles[0].id);
  const [bookmarks, setBookmarks] = useState(() => readStore("enash.newsBookmarks", []));
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const filtered = useMemo(() => articles.filter((article) => {
    const text = `${article.title} ${article.summary} ${article.category} ${article.region}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = category === "All" || article.category === category;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(article.id);
    return matchesQuery && matchesCategory && matchesBookmark;
  }), [query, category, bookmarks, showBookmarksOnly]);

  const article = articles.find((item) => item.id === selectedId) || filtered[0] || articles[0];

  const toggleBookmark = async (id) => {
    const next = bookmarks.includes(id) ? bookmarks.filter((item) => item !== id) : [id, ...bookmarks];
    setBookmarks(next);
    writeStore("enash.newsBookmarks", next);
    await saveNewsBookmark(next);
  };

  return (
    <main id="main" className="news-page">
      <section className="page-hero ec-blueprint-grid">
        <div className="ec-container page-hero__grid">
          <div>
            <span className="ec-eyebrow">Articles and news</span>
            <h1>50 real-event based articles across tech, business, sport, climate, space and Africa.</h1>
            <p>Each article has a source link, business angle, takeaways, filters, bookmarks, and a proper reader view.</p>
          </div>
          <div className="news-count-card"><strong>{articles.length}</strong><span>articles</span><small>{categories.length - 1} categories</small></div>
        </div>
      </section>

      <section className="ec-section news-workspace">
        <div className="ec-container news-layout">
          <aside className="news-sidebar">
            <label className="ec-field"><span>Search news</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search World Cup, AI, Africa..." /></label>
            <button className={`bookmark-toggle ${showBookmarksOnly ? "is-active" : ""}`} onClick={() => setShowBookmarksOnly((value) => !value)}>{showBookmarksOnly ? "Showing bookmarks" : "Show bookmarks"}</button>
            <div className="news-categories">
              {categories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="article-list">
              {filtered.map((item) => <button key={item.id} className={item.id === article.id ? "is-active" : ""} onClick={() => setSelectedId(item.id)}><span>{item.category} · {item.region}</span><strong>{item.title}</strong><small>{item.date} · {item.readTime}</small></button>)}
            </div>
          </aside>

          <article className="news-reader">
            <div className="news-reader__meta"><span>{article.category}</span><span>{article.region}</span><span>{article.date}</span><span>{article.readTime}</span></div>
            <h2>{article.title}</h2>
            <p className="news-summary">{article.summary}</p>
            <div className="news-actions">
              <button className="ec-btn ec-btn--primary" onClick={() => toggleBookmark(article.id)}>{bookmarks.includes(article.id) ? "Remove bookmark" : "Bookmark article"}</button>
              <a className="ec-btn ec-btn--ghost" href={article.sourceUrl} target="_blank" rel="noreferrer">Open source</a>
            </div>

            {article.sections.map((section) => (
              <section className="article-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </section>
            ))}

            <div className="takeaway-box">
              <h3>Takeaways</h3>
              <ul>{article.takeaways.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
