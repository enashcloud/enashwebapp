import { useMemo, useState } from "react";
import { courses } from "../data/coursesData.js";
import { saveCourseProgress } from "../lib/api.js";
import { readStore, writeStore } from "../lib/storage.js";
import "./Courses.css";

const categories = ["All", ...Array.from(new Set(courses.map((course) => course.category)))];

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(courses[0].id);
  const [pageIndex, setPageIndex] = useState(0);
  const [progress, setProgress] = useState(() => readStore("enash.courseProgress", {}));
  const [note, setNote] = useState("");

  const filtered = useMemo(() => courses.filter((course) => {
    const text = `${course.title} ${course.summary} ${course.category} ${course.level}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All" || course.category === category);
  }), [query, category]);

  const course = courses.find((item) => item.id === selectedId) || filtered[0] || courses[0];
  const page = course.pages[pageIndex] || course.pages[0];
  const saved = progress[course.id] || { completedPages: [], notes: {} };
  const completedSet = new Set(saved.completedPages || []);
  const completion = Math.round((completedSet.size / course.pages.length) * 100);

  const selectCourse = (id) => {
    setSelectedId(id);
    setPageIndex(0);
    const existing = progress[id] || { notes: {} };
    setNote(existing.notes?.[1] || "");
  };

  const goToPage = (index) => {
    setPageIndex(index);
    const existing = progress[course.id] || { notes: {} };
    setNote(existing.notes?.[index + 1] || "");
  };

  const markComplete = async () => {
    const nextCompleted = Array.from(new Set([...(saved.completedPages || []), page.page]));
    const nextProgress = {
      courseId: course.id,
      completedPages: nextCompleted,
      notes: { ...(saved.notes || {}), [page.page]: note },
      updatedAt: new Date().toISOString(),
    };
    const next = await saveCourseProgress(nextProgress);
    setProgress(next);
  };

  const saveNote = () => {
    const next = {
      ...progress,
      [course.id]: {
        ...saved,
        courseId: course.id,
        completedPages: saved.completedPages || [],
        notes: { ...(saved.notes || {}), [page.page]: note },
        updatedAt: new Date().toISOString(),
      },
    };
    setProgress(next);
    writeStore("enash.courseProgress", next);
  };

  return (
    <main id="main" className="courses-page">
      <section className="page-hero ec-blueprint-grid">
        <div className="ec-container page-hero__grid">
          <div>
            <span className="ec-eyebrow">Free courses</span>
            <h1>50 practical courses with 10 lesson pages each.</h1>
            <p>Courses are detailed enough for public learners: examples, exercises, quizzes, progress tracking, notes, and capstones.</p>
          </div>
          <div className="course-count-card"><strong>{courses.length}</strong><span>courses</span><small>{courses.length * 10} lesson pages</small></div>
        </div>
      </section>

      <section className="ec-section course-workspace">
        <div className="ec-container course-layout">
          <aside className="course-sidebar">
            <label className="ec-field"><span>Search courses</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Microsoft, React, security..." /></label>
            <div className="course-categories">
              {categories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="course-list">
              {filtered.map((item) => {
                const itemProgress = progress[item.id]?.completedPages?.length || 0;
                return (
                  <button key={item.id} className={item.id === course.id ? "is-active" : ""} onClick={() => selectCourse(item.id)}>
                    <strong>{item.title}</strong>
                    <span>{item.category} · {item.level} · {itemProgress}/10 done</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="course-reader">
            <div className="course-reader__head">
              <div>
                <span className="ec-eyebrow">{course.category} · {course.level}</span>
                <h2>{course.title}</h2>
                <p>{course.summary}</p>
              </div>
              <div className="progress-ring"><strong>{completion}%</strong><span>complete</span></div>
            </div>

            <div className="course-outcomes">
              {course.outcomes.map((outcome) => <span key={outcome}>✓ {outcome}</span>)}
            </div>

            <div className="lesson-tabs" aria-label="Course pages">
              {course.pages.map((lesson, index) => <button key={lesson.page} className={index === pageIndex ? "is-active" : completedSet.has(lesson.page) ? "is-complete" : ""} onClick={() => goToPage(index)}>{lesson.page}</button>)}
            </div>

            <section className="lesson-page">
              <span className="lesson-page__number">Page {page.page} of {course.pages.length}</span>
              <h3>{page.title}</h3>
              {page.lesson.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

              <div className="lesson-box"><strong>Example</strong><p>{page.example}</p></div>
              <div className="lesson-box"><strong>Exercise</strong><p>{page.exercise}</p></div>
              <div className="lesson-box"><strong>Quick quiz</strong>{page.quiz.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>

              <label className="ec-field lesson-notes"><span>Your notes for this page</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write notes, questions, or your exercise answer here." /></label>

              <div className="lesson-actions">
                <button className="ec-btn ec-btn--ghost" onClick={() => goToPage(Math.max(0, pageIndex - 1))} disabled={pageIndex === 0}>Previous page</button>
                <button className="ec-btn ec-btn--ghost" onClick={saveNote}>Save note</button>
                <button className="ec-btn ec-btn--primary" onClick={markComplete}>Mark complete</button>
                <button className="ec-btn ec-btn--ghost" onClick={() => goToPage(Math.min(course.pages.length - 1, pageIndex + 1))} disabled={pageIndex === course.pages.length - 1}>Next page</button>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
