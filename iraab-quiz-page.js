/**
 * Builds flat quiz rows from `QURAN_IRAAB_AYAH` and drives the Iʿrāb quiz UI.
 */
(function () {
  'use strict';

  function inferWordType(parts) {
    if (!parts || !parts.length) return 'اسم';
    let verb = false;
    let harf = false;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.type !== 'link' || !p.text) continue;
      const t = p.text;
      if (/فعل|ماض|مضارع|أمر|الماضي|المضارع|فعل\s/.test(t)) verb = true;
      if (/حرف/.test(t)) harf = true;
    }
    if (verb) return 'فعل';
    if (harf) return 'حرف';
    return 'اسم';
  }

  function inferRole(parts) {
    if (!parts || !parts.length) return '';
    const hints = [
      'مفعول به',
      'مفعول',
      'فاعل',
      'نائب فاعل',
      'مبتدأ',
      'خبر',
      'نعت',
      'مضاف إليه',
      'مضاف',
      'حال',
      'اسم موصول',
      'صلة الموصول',
      'منادى',
      'اسم إن',
      'خبر إن',
    ];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.type !== 'link' || !p.text) continue;
      const t = p.text.trim();
      for (let h = 0; h < hints.length; h++) {
        if (t.indexOf(hints[h]) !== -1) return t.length > 48 ? hints[h] : t;
      }
    }
    return '';
  }

  function buildIraabQuizDatasetFromCurated(ayahList) {
    const out = [];
    if (!ayahList || !ayahList.length) return out;
    for (let a = 0; a < ayahList.length; a++) {
      const ayah = ayahList[a];
      const ayahText = ayah.ayahText || '';
      const rows = ayah.rows;
      if (!rows || !rows.length) continue;
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const parts = row.analysisParts || [];
        let i3rab = '';
        for (let p = 0; p < parts.length; p++) {
          if (parts[p].text) i3rab += parts[p].text;
        }
        const trimmed = i3rab.trim();
        out.push({
          surah: ayah.surah,
          surahNameAr: ayah.surahNameAr || '',
          ayah: ayah.ayah,
          word: row.segment,
          type: inferWordType(parts),
          i3rab: trimmed,
          role: inferRole(parts),
          extra: trimmed,
          ayahText,
        });
      }
    }
    return out;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderQuiz(container, quiz) {
    const parts = [];
    for (let i = 0; i < quiz.length; i++) {
      const q = quiz[i];
      const qid = `iraab-q-${i}`;
      const opts = q.options || [];
      const optHtml = opts
        .map(function (opt, j) {
          const oid = `${qid}-o${j}`;
          return (
            '<li class="iraab-quiz__option">' +
            '<label class="iraab-quiz__label">' +
            '<input type="radio" class="iraab-quiz__radio" name="' +
            escapeHtml(qid) +
            '" value="' +
            escapeHtml(opt) +
            '" id="' +
            escapeHtml(oid) +
            '" />' +
            '<span class="iraab-quiz__option-text" lang="ar" dir="rtl">' +
            escapeHtml(opt) +
            '</span>' +
            '</label>' +
            '</li>'
          );
        })
        .join('');
      parts.push(
        '<article class="iraab-quiz__card" data-index="' +
          i +
          '">' +
          '<p class="iraab-quiz__meta" lang="ar" dir="rtl">' +
          '<span class="iraab-quiz__num">' +
          (i + 1) +
          ' / 15</span>' +
          '<span class="iraab-quiz__kind">' +
          escapeHtml(q.type || '') +
          '</span>' +
          '</p>' +
          '<h2 class="iraab-quiz__question" lang="ar" dir="rtl">' +
          escapeHtml(q.question) +
          '</h2>' +
          '<ul class="iraab-quiz__options" role="list">' +
          optHtml +
          '</ul>' +
          '<p class="iraab-quiz__feedback" hidden></p>' +
          '</article>'
      );
    }
    container.innerHTML = parts.join('');
    container.dataset.answerKey = JSON.stringify(quiz.map(function (x) {
      return x.answer;
    }));
  }

  function checkAnswers() {
    const root = document.getElementById('iraab-quiz-root');
    const scoreEl = document.getElementById('iraab-quiz-score');
    if (!root) return;
    const key = root.dataset.answerKey;
    if (!key) return;
    const answers = JSON.parse(key);
    let correct = 0;
    const cards = root.querySelectorAll('.iraab-quiz__card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const name = 'iraab-q-' + i;
      const sel = card.querySelector('input[name="' + name + '"]:checked');
      const fb = card.querySelector('.iraab-quiz__feedback');
      const expected = answers[i];
      card.classList.remove('iraab-quiz__card--correct', 'iraab-quiz__card--wrong');
      if (!fb) continue;
      if (!sel) {
        fb.hidden = false;
        fb.textContent = 'لم تختر إجابة. الصحيح: ' + expected;
        fb.lang = 'ar';
        fb.dir = 'rtl';
        card.classList.add('iraab-quiz__card--wrong');
        continue;
      }
      if (sel.value === expected) {
        correct++;
        fb.hidden = false;
        fb.textContent = 'صحيح ✓';
        fb.lang = 'ar';
        fb.dir = 'rtl';
        card.classList.add('iraab-quiz__card--correct');
      } else {
        fb.hidden = false;
        fb.textContent = 'خطأ. الصحيح: ' + expected;
        fb.lang = 'ar';
        fb.dir = 'rtl';
        card.classList.add('iraab-quiz__card--wrong');
      }
    }
    if (scoreEl) {
      scoreEl.hidden = false;
      scoreEl.textContent = 'النتيجة: ' + correct + ' / 15';
      scoreEl.lang = 'ar';
      scoreEl.dir = 'rtl';
    }
  }

  function runQuiz(seed) {
    const err = document.getElementById('iraab-quiz-error');
    const root = document.getElementById('iraab-quiz-root');
    const seedInput = document.getElementById('iraab-quiz-seed');
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
    if (seedInput && typeof seed === 'number') seedInput.value = String(seed);

    const ayahList = window.QURAN_IRAAB_AYAH;
    if (!ayahList || !ayahList.length) {
      if (err) {
        err.hidden = false;
        err.textContent = 'البيانات غير محمّلة. تأكد من تضمين quran-iraab-data.js';
      }
      return;
    }

    const dataset = buildIraabQuizDatasetFromCurated(ayahList);
    const s = typeof seed === 'number' ? seed : parseInt(seedInput && seedInput.value, 10);
    const useSeed = Number.isFinite(s) ? s : Date.now();

    let quiz;
    try {
      quiz = window.generateIraabQuiz(dataset, { seed: useSeed });
    } catch (e) {
      if (err) {
        err.hidden = false;
        err.textContent = e.message || String(e);
      }
      return;
    }

    renderQuiz(root, quiz);
    const scoreEl = document.getElementById('iraab-quiz-score');
    if (scoreEl) scoreEl.hidden = true;
  }

  function init() {
    const newBtn = document.getElementById('iraab-quiz-new');
    const seedInput = document.getElementById('iraab-quiz-seed');
    const checkBtn = document.getElementById('iraab-quiz-check');
    if (checkBtn) checkBtn.addEventListener('click', checkAnswers);
    if (newBtn) {
      newBtn.addEventListener('click', function () {
        runQuiz(Date.now());
      });
    }
    if (seedInput) {
      seedInput.addEventListener('change', function () {
        const v = parseInt(seedInput.value, 10);
        if (Number.isFinite(v)) runQuiz(v);
      });
    }
    runQuiz(Date.now());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.buildIraabQuizDatasetFromCurated = buildIraabQuizDatasetFromCurated;
})();
