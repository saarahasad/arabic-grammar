/**
 * Rewrites course home links from lesson.html?rule=X to custom lesson URLs when
 * COURSE_OUTLINE defines `page` for that rule.
 */
(function () {
  function run() {
    if (!window.COURSE_OUTLINE || typeof window.getLessonUrl !== 'function' || typeof window.findLessonInOutline !== 'function') {
      return;
    }
    document.querySelectorAll('a[href*="lesson.html?rule="]').forEach((a) => {
      try {
        const u = new URL(a.getAttribute('href'), window.location.href);
        const rule = u.searchParams.get('rule');
        if (!rule) return;
        const lesson = window.findLessonInOutline(rule);
        if (lesson) {
          a.setAttribute('href', window.getLessonUrl(lesson));
        }
      } catch {
        /* ignore */
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
