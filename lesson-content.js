/**
 * Load lesson body HTML from static lesson pages (lessons/<rule>.html).
 * Used by the map panel and by lesson-ui when the main column is empty.
 */
(function () {
  window.loadLessonMainInnerHtml = async function loadLessonMainInnerHtml(ruleId) {
    const url = `lessons/${encodeURIComponent(ruleId)}.html`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Lesson fetch ${res.status}: ${url}`);
    }
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const inner = doc.getElementById('lesson-main-inner');
    if (!inner) {
      throw new Error('No #lesson-main-inner in lesson page');
    }
    return inner.innerHTML.trim();
  };
})();
