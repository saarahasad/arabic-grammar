/**
 * One-page-at-a-time PDF workbook viewer (PDF.js).
 * workbook-pdf.html?id=inna | laalla | dhu
 * workbook-pdf.html?file=assets/workbooks/inna-workbook.pdf
 */
(function () {
  'use strict';

  var WORKBOOKS = {
    inna: {
      title: 'Inna — workbook',
      arabic: 'إِنَّ — تَمْرِين',
      file: 'assets/workbooks/inna-workbook.pdf',
    },
    laalla: {
      title: 'Laʿalla — workbook',
      arabic: 'لَعَلَّ — تَمْرِين',
      file: 'assets/workbooks/laalla-workbook.pdf',
    },
    dhu: {
      title: 'Dhu — workbook',
      arabic: 'ذُو — تَمْرِين',
      file: 'assets/workbooks/dhu-workbook.pdf',
    },
  };

  var params = new URLSearchParams(window.location.search);
  var id = (params.get('id') || '').toLowerCase().trim();
  var fileParam = params.get('file');

  var titleEl = document.getElementById('workbook-title');
  var arabicEl = document.getElementById('workbook-arabic');
  var canvas = document.getElementById('workbook-canvas');
  var loadingEl = document.getElementById('workbook-loading');
  var errorEl = document.getElementById('workbook-error');
  var errorTextEl = document.getElementById('workbook-error-text');
  var prevBtn = document.getElementById('workbook-prev');
  var nextBtn = document.getElementById('workbook-next');
  var pageIndicator = document.getElementById('workbook-page-indicator');
  var wrapEl = document.getElementById('workbook-canvas-wrap');

  var pdfDoc = null;
  var pageNum = 1;
  var pageCount = 0;
  var renderTask = null;
  var resizeTimer = null;

  function resolvePdfUrl() {
    if (fileParam) {
      var f = decodeURIComponent(fileParam).replace(/^\s+|\s+$/g, '');
      if (!/^assets\/workbooks\/[^/]+\.pdf$/i.test(f)) {
        return {
          error:
            'Invalid file path. Only files under assets/workbooks/ with a .pdf name are allowed.',
        };
      }
      return {
        url: f,
        meta: { title: 'Workbook', arabic: '' },
      };
    }
    if (id && WORKBOOKS[id]) {
      return { url: WORKBOOKS[id].file, meta: WORKBOOKS[id] };
    }
    return {
      error:
        'Add ?id=inna or ?id=laalla to the URL (or open this page from the Inna lesson).',
    };
  }

  function setChrome(meta) {
    if (!meta) return;
    if (titleEl) titleEl.textContent = meta.title || 'Workbook';
    if (arabicEl) {
      if (meta.arabic) {
        arabicEl.textContent = meta.arabic;
        arabicEl.hidden = false;
      } else {
        arabicEl.textContent = '';
        arabicEl.hidden = true;
      }
    }
    document.title = (meta.title || 'Workbook') + ' — Arabic Grammar';
  }

  function showError(msg) {
    if (loadingEl) loadingEl.hidden = true;
    if (errorEl) {
      errorEl.hidden = false;
      if (errorTextEl) errorTextEl.textContent = msg;
    }
    if (wrapEl) wrapEl.hidden = true;
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = pageNum <= 1;
    nextBtn.disabled = pageNum >= pageCount;
  }

  function updateIndicator() {
    if (pageIndicator) {
      pageIndicator.textContent = pageCount ? pageNum + ' / ' + pageCount : '—';
    }
  }

  function renderPage() {
    if (!pdfDoc || !canvas) return;
    var pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib) return;

    pdfDoc
      .getPage(pageNum)
      .then(function (page) {
        var ctx = canvas.getContext('2d');
        var container = wrapEl || canvas.parentElement;
        var maxW = container ? container.clientWidth - 24 : 800;
        if (maxW < 280) maxW = 280;

        var base = page.getViewport({ scale: 1 });
        var scale = Math.min(maxW / base.width, 2.25);
        var viewport = page.getViewport({ scale: scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (renderTask && typeof renderTask.cancel === 'function') {
          renderTask.cancel();
        }

        var renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        renderTask = page.render(renderContext);
        return renderTask && renderTask.promise ? renderTask.promise : renderTask;
      })
      .then(function () {
        updateButtons();
        updateIndicator();
      })
      .catch(function (err) {
        if (err && err.name === 'RenderingCancelledException') return;
        console.error(err);
        showError('Could not render this page. Try reloading.');
      });
  }

  function loadPdf(url, meta) {
    setChrome(meta);

    var pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib || typeof pdfjsLib.getDocument !== 'function') {
      showError('PDF viewer failed to load. Check your network connection (PDF.js script).');
      return;
    }

    pdfjsLib
      .getDocument({ url: url })
      .promise.then(function (pdf) {
        pdfDoc = pdf;
        pageCount = pdf.numPages;
        pageNum = 1;
        if (loadingEl) loadingEl.hidden = true;
        if (wrapEl) wrapEl.hidden = false;
        if (errorEl) errorEl.hidden = true;
        renderPage();
      })
      .catch(function (err) {
        console.error(err);
        if (loadingEl) loadingEl.hidden = true;
        showError(
          'Could not open this PDF. Add your file at "' +
            url +
            '" (see the assets/workbooks folder), then refresh.'
        );
      });
  }

  function goPrev() {
    if (pageNum <= 1) return;
    pageNum -= 1;
    renderPage();
  }

  function goNext() {
    if (pageNum >= pageCount) return;
    pageNum += 1;
    renderPage();
  }

  function init() {
    var resolved = resolvePdfUrl();
    if (resolved.error) {
      setChrome({ title: 'PDF workbook', arabic: '' });
      if (titleEl) titleEl.textContent = 'Workbook';
      showError(resolved.error);
      return;
    }
    loadPdf(resolved.url, resolved.meta);
  }

  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  });

  window.addEventListener(
    'resize',
    function () {
      if (!pdfDoc) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        renderPage();
      }, 150);
    },
    false
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
