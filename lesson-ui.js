/**
 * Khan-style lesson shell: sidebar nav, main article, up-next footer.
 *
 * Lesson HTML is loaded from lessons/<rule>.html (see lesson-content.js) when the
 * main column is empty or data-hydrate-from-rules is set.
 */
(function () {
  const LS_KEY = 'ag-lesson-completed';

  function getCompleted() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function markCompleted(rule) {
    const set = new Set(getCompleted());
    set.add(rule);
    localStorage.setItem(LS_KEY, JSON.stringify([...set]));
  }

  function lessonHref(lesson) {
    if (typeof window.getLessonUrl === 'function') {
      return window.getLessonUrl(lesson);
    }
    return `lesson.html?rule=${encodeURIComponent(lesson.rule)}`;
  }

  function flattenOutline() {
    const flat = [];
    window.COURSE_OUTLINE.forEach((unit) => {
      unit.lessons.forEach((l) => {
        flat.push({
          rule: l.rule,
          title: l.title,
          page: l.page,
          unitId: unit.unitId,
          unitLabel: unit.unitLabel,
          unitLabelAr: unit.unitLabelAr || '',
        });
      });
    });
    return flat;
  }

  function getRuleIdFromLocation() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('rule');
    if (q) return q;
    const bodyRule = document.body.getAttribute('data-rule');
    return bodyRule || null;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const ruleFromQuery = params.get('rule');
    if (
      ruleFromQuery &&
      document.body.getAttribute('data-lesson-static') !== 'true' &&
      typeof window.findLessonInOutline === 'function' &&
      typeof window.getLessonUrl === 'function'
    ) {
      const meta = window.findLessonInOutline(ruleFromQuery);
      const path = window.location.pathname || '';
      const onGenericLesson = /(^|\/)lesson\.html$/i.test(path);
      if (meta && onGenericLesson) {
        const dest = window.getLessonUrl(meta);
        if (dest.startsWith('lessons/')) {
          window.location.replace(dest + window.location.hash);
          return;
        }
      }
    }

    const ruleId = getRuleIdFromLocation();
    const rulesMeta = typeof window.RULES !== 'undefined' ? window.RULES : null;
    if (!ruleId || !rulesMeta || !rulesMeta[ruleId]) {
      window.location.href = 'index.html';
      return;
    }

    const flat = flattenOutline();
    const idx = flat.findIndex((x) => x.rule === ruleId);
    const rule = rulesMeta[ruleId];
    const current =
      idx >= 0
        ? flat[idx]
        : { rule: ruleId, title: rule.title, unitLabel: '', unitId: '', page: undefined };
    const prev = idx > 0 ? flat[idx - 1] : null;
    let next = null;
    if (idx >= 0 && idx < flat.length - 1) {
      next = flat[idx + 1];
    }

    markCompleted(ruleId);

    const completed = new Set(getCompleted());

    const sidebarEl = document.getElementById('lesson-sidebar-inner');
    const mainEl = document.getElementById('lesson-main-inner');
    const breadcrumbEl = document.getElementById('lesson-breadcrumb');
    const unitLabelEl = document.getElementById('lesson-unit-label');
    const shortTitleEl = document.getElementById('lesson-current-short');
    const footerUnitEl = document.getElementById('lesson-footer-unit');
    const nextBar = document.getElementById('lesson-next-bar');
    const nextLink = document.getElementById('lesson-next-link');
    const prevBtn = document.getElementById('lesson-nav-prev');
    const nextBtn = document.getElementById('lesson-nav-next');

    if (breadcrumbEl && current.unitLabel) {
      breadcrumbEl.textContent = `Course: Arabic grammar › ${current.unitLabel}`;
    }
    if (unitLabelEl) {
      unitLabelEl.textContent = current.unitLabel || 'Lesson';
    }
    if (shortTitleEl) {
      shortTitleEl.textContent = rule.title.length > 42 ? rule.title.slice(0, 40) + '…' : rule.title;
    }
    if (footerUnitEl) {
      footerUnitEl.textContent = current.unitLabel || '—';
    }

    const isStatic = document.body.getAttribute('data-lesson-static') === 'true';
    const forceHydrate = mainEl && mainEl.getAttribute('data-hydrate-from-rules') === 'true';
    const mainIsEmpty =
      mainEl && mainEl.children.length === 0 && String(mainEl.textContent || '').trim() === '';
    const shouldInjectBody =
      mainEl &&
      typeof window.loadLessonMainInnerHtml === 'function' &&
      (!isStatic || forceHydrate || mainIsEmpty);

    if (shouldInjectBody) {
      try {
        const inner = await window.loadLessonMainInnerHtml(ruleId);
        mainEl.innerHTML = `<div class="panel-reading-main lesson-khan-article">${inner}</div>`;
      } catch (e) {
        console.error(e);
        mainEl.innerHTML =
          '<p class="definition">Could not load lesson content. Serve the site over http(s) so lesson files can load from <code>lessons/</code>.</p>';
      }
    }

    const fragHash = window.location.hash;
    if (fragHash && fragHash.length > 1) {
      const id = decodeURIComponent(fragHash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        );
      }
    }

    if (idx >= 0 && sidebarEl) {
      let html = '';
      window.COURSE_OUTLINE.forEach((unit) => {
        html += `<div class="lesson-sidebar__block" data-unit="${escapeAttr(unit.unitId)}">`;
        const unitAr = unit.unitLabelAr
          ? `<span class="lesson-sidebar__unit-label-ar" lang="ar" dir="rtl">${escapeAttr(unit.unitLabelAr)}</span>`
          : '';
        html += `<div class="lesson-sidebar__unit-label">${escapeAttr(unit.unitLabel)}${unitAr}</div>`;
        html += '<ul class="lesson-sidebar__list" role="list">';
        unit.lessons.forEach((l) => {
          const isActive = l.rule === ruleId;
          const done = completed.has(l.rule);
          const meta = {
            rule: l.rule,
            title: l.title,
            page: l.page,
            unitId: unit.unitId,
            unitLabel: unit.unitLabel,
          };
          const href = lessonHref(meta);
          const icon = done
            ? '<span class="lesson-sidebar__icon lesson-sidebar__icon--done" aria-hidden="true">✓</span>'
            : '<span class="lesson-sidebar__icon" aria-hidden="true">▶</span>';
          const R = typeof window.RULES !== 'undefined' ? window.RULES : null;
          const arLine =
            R && R[l.rule] && R[l.rule].arabicTitle
              ? `<span class="lesson-sidebar__link-ar" lang="ar" dir="rtl">${escapeAttr(R[l.rule].arabicTitle)}</span>`
              : '';
          html += `<li class="lesson-sidebar__item${isActive ? ' is-active' : ''}${done ? ' is-done' : ''}">`;
          html += `<a class="lesson-sidebar__link" href="${escapeAttr(href)}">${icon}<span class="lesson-sidebar__link-text">${escapeAttr(l.title)}${arLine}</span></a>`;
          html += '</li>';
        });
        html += '</ul></div>';
      });
      sidebarEl.innerHTML = html;
    } else if (sidebarEl) {
      sidebarEl.innerHTML =
        '<p class="lesson-sidebar__crumb" style="padding:1rem">This topic is not in the default outline. Use the <a href="index.html">course home</a> for links.</p>';
    }

    function bindNav(el, target) {
      if (!el) return;
      el.classList.remove('is-disabled');
      el.removeAttribute('aria-disabled');
      if (target) {
        el.setAttribute('href', lessonHref(target));
      } else {
        el.setAttribute('href', '#');
        el.classList.add('is-disabled');
        el.setAttribute('aria-disabled', 'true');
        el.addEventListener('click', (e) => e.preventDefault());
      }
    }

    bindNav(prevBtn, prev);
    bindNav(nextBtn, next);

    if (nextBar && nextLink) {
      nextBar.hidden = false;
      if (next) {
        nextLink.href = lessonHref(next);
        nextLink.textContent = `Up next: ${next.title}`;
      } else {
        nextLink.href = 'index.html';
        nextLink.textContent = 'Back to course home';
      }
    }

    const shell = document.getElementById('lesson-khan-shell');
    const toggle = document.getElementById('lesson-sidebar-toggle');
    if (toggle && shell) {
      toggle.addEventListener('click', () => {
        shell.classList.toggle('lesson-khan-shell--collapsed');
        const collapsed = shell.classList.contains('lesson-khan-shell--collapsed');
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    }

    document.title = `${rule.title} — Arabic Grammar`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => void init());
  } else {
    void init();
  }
})();
