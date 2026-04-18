/**
 * Interactive لَعَلَّ exercise — insert particle + pronoun (Madinah B2 L1 style); virtual Arabic keyboard with harakat.
 */
(function () {
  'use strict';

  /** @type {HTMLTextAreaElement | null} */
  let activeInput = null;

  function getActiveTextarea() {
    return (
      activeInput ||
      /** @type {HTMLTextAreaElement | null} */ (document.querySelector('.laalla-ex-input.laalla-ex-input--active')) ||
      /** @type {HTMLTextAreaElement | null} */ (document.querySelector('.laalla-ex-input'))
    );
  }

  /** @type {{ prompt: string, accepted: string[] }[]} */
  const EXERCISES = [
    { prompt: 'هو بخير.', accepted: ['لَعَلَّهُ بخير.', 'لَعَلَّهُ بِخَيْرٍ.'] },
    { prompt: 'هم بخير.', accepted: ['لَعَلَّهُم بخير.', 'لَعَلَّهُم بِخَيْرٍ.'] },
    { prompt: 'هي بخير.', accepted: ['لَعَلَّهَا بخير.', 'لَعَلَّها بخير.', 'لَعَلَّهَا بِخَيْرٍ.'] },
    { prompt: 'هن بخير.', accepted: ['لَعَلَّهُنَّ بخير.', 'لَعَلَّهُنَّ بِخَيْرٍ.'] },
    { prompt: 'أنتَ بخير.', accepted: ['لَعَلَّكَ بخير.', 'لَعَلَّكَ بِخَيْرٍ.'] },
    { prompt: 'أنتم بخير.', accepted: ['لَعَلَّكُم بخير.', 'لَعَلَّكُم بِخَيْرٍ.'] },
    { prompt: 'أنتِ بخير.', accepted: ['لَعَلَّكِ بخير.', 'لَعَلَّكِ بِخَيْرٍ.'] },
    { prompt: 'أنتن بخير.', accepted: ['لَعَلَّكُنَّ بخير.', 'لَعَلَّكُنَّ بِخَيْرٍ.'] },
    { prompt: 'أنا ناجح.', accepted: ['لَعَلِّي ناجِحٌ.', 'لَعَلِّي ناجح.'] },
    { prompt: 'نحن ناجحون.', accepted: ['لَعَلَّنَا ناجِحُونَ.', 'لَعَلَّنَا ناجحون.'] },
    { prompt: 'المدير في غرفته.', accepted: ['لَعَلَّ المديرَ في غُرْفَتِهِ.', 'لَعَلَّ المديرَ في غرفته.'] },
    { prompt: 'الاختبار سهل.', accepted: ['لَعَلَّ الاختبارَ سهلٌ.', 'لَعَلَّ الاختبارَ سَهْلٌ.'] },
  ];

  /** Remove Arabic diacritics and normalize alef/hamza for lenient check */
  function normalizeLoose(s) {
    if (!s) return '';
    let t = s.trim().replace(/\s+/g, ' ');
    // Strip tashkeel & quranic annotation marks
    t = t.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
    // Unify alef / hamza variants (lenient)
    t = t.replace(/[آأإٱ]/g, 'ا');
    t = t.replace(/[ىي]/g, 'ي');
    t = t.replace(/ة/g, 'ه');
    t = t.replace(/[^\u0600-\u06FF\s]/g, '');
    return t.replace(/\s+/g, ' ').trim();
  }

  /** Unique accepted strings for the answer key (hide duplicate Unicode/hamza variants). */
  function uniqueAccepted(accepted) {
    const seen = new Set();
    const out = [];
    for (const a of accepted) {
      const key = normalizeLoose(a);
      if (!seen.has(key)) {
        seen.add(key);
        out.push(a);
      }
    }
    return out;
  }

  function checkAnswers() {
    const texts = [...document.querySelectorAll('.laalla-ex-input')].map((el) => el.value);
    let ok = 0;
    const missed = [];
    texts.forEach((val, i) => {
      const loose = normalizeLoose(val);
      const hit = EXERCISES[i].accepted.some((a) => normalizeLoose(a) === loose);
      if (hit) ok += 1;
      else missed.push(i + 1);
    });
    const el = document.getElementById('laalla-ex-result');
    if (!el) return;
    el.classList.remove('is-ok', 'is-mix');
    if (ok === EXERCISES.length) {
      el.classList.add('is-ok');
      el.textContent = 'All ' + ok + ' answers match (letters; tashkīl ignored for checking).';
    } else {
      el.classList.add('is-mix');
      el.textContent =
        ok +
        ' / ' +
        EXERCISES.length +
        ' matched (letters only). Review: #' +
        missed.join(', ') +
        '.';
    }
  }

  function showAnswers() {
    const block = document.getElementById('laalla-ex-answers');
    if (!block) return;
    const wasHidden = block.hidden;
    block.hidden = !wasHidden;
    const btn = document.getElementById('laalla-ex-toggle-answers');
    if (btn) btn.textContent = block.hidden ? 'Show answer key' : 'Hide answer key';
  }

  function insertAtCursor(el, text) {
    if (!el || el.tagName !== 'TEXTAREA') return;
    activeInput = el;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const val = el.value;
    el.value = val.slice(0, start) + text + val.slice(end);
    const pos = start + text.length;
    el.setSelectionRange(pos, pos);
    el.focus();
  }

  function wireKeyboard() {
    document.querySelectorAll('.laalla-ex-input').forEach((ta) => {
      ta.addEventListener('focus', () => {
        activeInput = /** @type {HTMLTextAreaElement} */ (ta);
        document.querySelectorAll('.laalla-ex-input').forEach((x) => x.classList.remove('laalla-ex-input--active'));
        ta.classList.add('laalla-ex-input--active');
      });
    });

    document.querySelectorAll('[data-insert], [data-mark]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ta = getActiveTextarea();
        if (!ta) return;
        let ch = btn.getAttribute('data-insert') || '';
        const mark = btn.getAttribute('data-mark');
        if (mark) {
          // combining mark only (harakah)
          ch = String.fromCharCode(parseInt(mark, 16));
        }
        insertAtCursor(ta, ch);
      });
    });

    const back = document.getElementById('laalla-ex-backspace');
    if (back) {
      back.addEventListener('click', () => {
        const ta = getActiveTextarea();
        if (!ta) return;
        const s = ta.selectionStart;
        const e = ta.selectionEnd;
        if (s === e && s > 0) {
          ta.value = ta.value.slice(0, s - 1) + ta.value.slice(e);
          ta.setSelectionRange(s - 1, s - 1);
        } else if (s !== e) {
          ta.value = ta.value.slice(0, s) + ta.value.slice(e);
          ta.setSelectionRange(s, s);
        }
        ta.focus();
      });
    }

    const clr = document.getElementById('laalla-ex-clear-field');
    if (clr) {
      clr.addEventListener('click', () => {
        const ta = getActiveTextarea();
        if (!ta) return;
        ta.value = '';
        ta.focus();
      });
    }
  }

  function renderExercises() {
    const grid = document.getElementById('laalla-ex-grid');
    const ansBody = document.getElementById('laalla-ex-answers-body');
    if (!grid) return;

    grid.innerHTML = EXERCISES.map(
      (ex, i) => `
      <div class="laalla-ex-item">
        <div class="laalla-ex-item__top">
          <span class="laalla-ex-item__num" aria-label="Question ${i + 1}">${toArabicNum(i + 1)}</span>
        </div>
        <p class="laalla-ex-prompt" lang="ar" dir="rtl">${escapeHtml(ex.prompt)}</p>
        <label class="visually-hidden" for="laalla-ex-${i}">Your answer ${i + 1}</label>
        <textarea id="laalla-ex-${i}" class="laalla-ex-input" rows="2" autocomplete="off" spellcheck="false" dir="rtl" lang="ar" placeholder="اكتب الجملة كاملة…"></textarea>
      </div>`
    ).join('');

    if (ansBody) {
      ansBody.innerHTML = EXERCISES.map((ex, i) => {
        const uniq = uniqueAccepted(ex.accepted);
        const main = uniq[0];
        const rest = uniq.slice(1);
        const altHtml =
          rest.length > 0
            ? ' <span class="laalla-ex-answer-alt" dir="ltr" lang="en"><span class="laalla-ex-answer-alt__lbl">(other acceptable: </span>' +
              rest
                .map(
                  (a) =>
                    '<span class="laalla-ex-answer-alt__ar" lang="ar" dir="rtl">' + escapeHtml(a) + '</span>'
                )
                .join('<span class="laalla-ex-answer-alt__sep" aria-hidden="true"> · </span>') +
              '<span class="laalla-ex-answer-alt__lbl">)</span></span>'
            : '';
        return `<p class="laalla-ex-answer-line"><strong>(${toArabicNum(i + 1)})</strong> ${escapeHtml(main)}${altHtml}</p>`;
      }).join('');
    }
  }

  function toArabicNum(n) {
    const d = '٠١٢٣٤٥٦٧٨٩';
    return String(n)
      .split('')
      .map((c) => d[+c])
      .join('');
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildKeyboard() {
    const host = document.getElementById('laalla-ex-keyboard-rows');
    if (!host) return;

    const rowA = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'];
    const rowB = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'ظ', 'ذ', 'د', 'ز', 'ر', 'و', 'ة', 'ى'];
    const rowC = ['ء', 'أ', 'إ', 'آ', 'ئ', 'ؤ', 'ٰ', 'ٱ'];
    const letterKeys = rowA.concat(rowB, rowC);

    const harakat = [
      { label: 'َ', hex: '064E', title: 'Fatḥa' },
      { label: 'ُ', hex: '064F', title: 'Ḍamma' },
      { label: 'ِ', hex: '0650', title: 'Kasra' },
      { label: 'ْ', hex: '0652', title: 'Sukūn' },
      { label: 'ّ', hex: '0651', title: 'Shadda' },
      { label: 'ً', hex: '064B', title: 'Tanwīn fatḥ' },
      { label: 'ٌ', hex: '064C', title: 'Tanwīn ḍamm' },
      { label: 'ٍ', hex: '064D', title: 'Tanwīn kasr' },
      { label: 'ٓ', hex: '0653', title: 'Maddah' },
      { label: 'ٰ', hex: '0670', title: 'Superscript alif' },
    ];

    function letterBtn(L) {
      if (L === 'ٰ' || L === 'ٱ') {
        return (
          '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--hamza laalla-ex-kb-key--mark" data-insert="' +
          escapeHtml(L) +
          '" title="' +
          (L === 'ٱ' ? 'Alif waslah' : 'Dagger alif') +
          '">' +
          escapeHtml(L) +
          '</button>'
        );
      }
      return (
        '<button type="button" class="laalla-ex-kb-key" data-insert="' + escapeHtml(L) + '">' + escapeHtml(L) + '</button>'
      );
    }

    let html = '';

    html +=
      '<div class="laalla-ex-kb-section" role="group" aria-label="Arabic letters">' +
      '<span class="laalla-ex-kb-section__label">Letters</span>' +
      '<div class="laalla-ex-kb-grid laalla-ex-kb-grid--letters">';
    letterKeys.forEach((L) => {
      html += letterBtn(L);
    });
    html += '</div></div>';

    html +=
      '<div class="laalla-ex-kb-section" role="group" aria-label="Ḥarakāt and diacritics">' +
      '<span class="laalla-ex-kb-section__label">Ḥarakāt</span>' +
      '<div class="laalla-ex-kb-grid laalla-ex-kb-grid--marks">';
    harakat.forEach((h) => {
      html +=
        '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--harakah laalla-ex-kb-key--mark" data-mark="' +
        h.hex +
        '" title="' +
        escapeHtml(h.title) +
        '">' +
        h.label +
        '</button>';
    });
    html += '</div></div>';

    html +=
      '<div class="laalla-ex-kb-section laalla-ex-kb-section--actions" role="group" aria-label="Space and editing">' +
      '<div class="laalla-ex-kb-actions">';
    html +=
      '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--action laalla-ex-kb-key--space" id="laalla-ex-space" title="Space">Space</button>';
    html +=
      '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--action" data-insert="ـ" title="Tatwīl (kashīda)">ـ</button>';
    html +=
      '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--action" id="laalla-ex-backspace" title="Backspace">⌫ Back</button>';
    html +=
      '<button type="button" class="laalla-ex-kb-key laalla-ex-kb-key--action" id="laalla-ex-clear-field" title="Clear active field">Clear</button>';
    html += '</div></div>';

    host.innerHTML = html;

    document.getElementById('laalla-ex-space')?.addEventListener('click', () => {
      const ta = getActiveTextarea();
      insertAtCursor(ta, ' ');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderExercises();
    buildKeyboard();
    wireKeyboard();
    activeInput = /** @type {HTMLTextAreaElement | null} */ (document.querySelector('.laalla-ex-input'));
    document.getElementById('laalla-ex-check')?.addEventListener('click', checkAnswers);
    document.getElementById('laalla-ex-toggle-answers')?.addEventListener('click', showAnswers);
    const first = document.querySelector('.laalla-ex-input');
    if (first) {
      first.classList.add('laalla-ex-input--active');
    }
  });
})();
