import { makeReference, readStore, writeStore } from "./storage";

async function postJson(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json().catch(() => ({}));
}

export async function submitOrder(order) {
  const reference = order.reference || makeReference("ENA-ORDER");
  const finalOrder = { ...order, reference, createdAt: new Date().toISOString() };
  try {
    const apiResult = await postJson("/api/orders", finalOrder);
    return { ...finalOrder, ...apiResult, submittedVia: "api" };
  } catch {
    const existing = readStore("enash.orders", []);
    writeStore("enash.orders", [finalOrder, ...existing]);
    return { ...finalOrder, submittedVia: "browser" };
  }
}

export async function submitServiceRequest(request) {
  const reference = request.reference || makeReference("ENA-SERVICE");
  const finalRequest = { ...request, reference, createdAt: new Date().toISOString() };
  try {
    const apiResult = await postJson("/api/service-requests", finalRequest);
    return { ...finalRequest, ...apiResult, submittedVia: "api" };
  } catch {
    const existing = readStore("enash.serviceRequests", []);
    writeStore("enash.serviceRequests", [finalRequest, ...existing]);
    return { ...finalRequest, submittedVia: "browser" };
  }
}

export async function saveCourseProgress(progress) {
  const key = "enash.courseProgress";
  const existing = readStore(key, {});
  const next = { ...existing, [progress.courseId]: progress };
  writeStore(key, next);
  try {
    await postJson("/api/course-progress", progress);
  } catch {
    // local progress is already saved.
  }
  return next;
}

export async function saveNewsBookmark(bookmarks) {
  writeStore("enash.newsBookmarks", bookmarks);
  try {
    await postJson("/api/news-bookmarks", { bookmarks });
  } catch {
    // local bookmarks are already saved.
  }
}
