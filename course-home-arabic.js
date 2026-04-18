/**
 * Adds Arabic lesson titles (from global RULES.arabicTitle in app.js) to course home rows.
 * Expects: course-home-links.js has already rewritten hrefs to lessons/<rule>.html.
 */
(function () {
  function ruleFromLessonHref(href) {
    try {
      const u = new URL(href, window.location.href);
      const path = u.pathname || '';
      const m = path.match(/\/lessons\/([^/]+)\.html$/i);
      if (m) return decodeURIComponent(m[1]);
      const q = u.searchParams.get('rule');
      return q ? decodeURIComponent(q) : null;
    } catch {
      return null;
    }
  }

  function run() {
    const rules = typeof window.RULES !== 'undefined' ? window.RULES : null;
    if (!rules) return;

    document.querySelectorAll('a.course-lesson').forEach((a) => {
      const titleEl = a.querySelector('.course-lesson__title');
      if (!titleEl || a.querySelector('.course-lesson__ar')) return;

      const rule = ruleFromLessonHref(a.getAttribute('href') || '');
      if (!rule || !rules[rule] || !rules[rule].arabicTitle) return;

      const wrap = document.createElement('span');
      wrap.className = 'course-lesson__text-col';

      titleEl.replaceWith(wrap);
      wrap.appendChild(titleEl);

      const ar = document.createElement('span');
      ar.className = 'course-lesson__ar';
      ar.setAttribute('lang', 'ar');
      ar.setAttribute('dir', 'rtl');
      ar.textContent = rules[rule].arabicTitle;
      wrap.appendChild(ar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
