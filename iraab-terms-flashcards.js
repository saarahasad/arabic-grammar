/**
 * Iʿrāb terminology flashcards — Arabic term ↔ English gloss.
 * Loaded by iraab-terms-flashcards.html
 */
(function () {
  'use strict';

  window.IRAAB_TERM_FLASHCARDS = [
    { ar: 'حَرْفُ ٱسْتِئْنَافٍ', en: 'A particle used to begin a new sentence or statement.' },
    { ar: 'حَرْفُ عَطْفٍ', en: 'A conjunction particle such as “and.”' },
    { ar: 'حَرْفُ جَرٍّ', en: 'A preposition that makes the noun after it majrūr.' },
    { ar: 'حَرْفُ جَرٍّ لِلْقَسَمِ', en: 'A preposition specifically used for making an oath.' },
    { ar: 'مُقْسَمٌ بِهِ', en: 'The thing by which the oath is made.' },
    { ar: 'مَجْرُورٌ', en: 'In the genitive case.' },
    { ar: 'مَنْصُوبٌ', en: 'In the accusative case.' },
    { ar: 'مَرْفُوعٌ', en: 'In the nominative case.' },
    { ar: 'مَبْنِيٌّ عَلَى السُّكُونِ', en: 'Fixed with sukūn; its ending does not change.' },
    { ar: 'ٱلضَّمَّةُ ٱلْمُقَدَّرَةُ', en: 'An estimated ḍammah that exists grammatically but is not visible.' },
    { ar: 'لِلتَّعَذُّرِ', en: 'Because showing the vowel is impossible.' },
    { ar: 'لِلثِّقَلِ', en: 'Because pronouncing the vowel would be difficult or heavy.' },
    { ar: 'مُتَعَلِّقَانِ بِٱلْفِعْلِ', en: 'Connected to the verb.' },
    {
      ar: 'فِعْلُ ٱلْقَسَمِ ٱلْمَحْذُوفُ',
      en: 'An omitted verb of oath, usually understood as: “I swear.”',
    },
    { ar: 'فِعْلٌ مَاضٍ', en: 'Past-tense verb.' },
    { ar: 'فِعْلٌ مُضَارِعٌ', en: 'Present or future tense verb.' },
    { ar: 'فَاعِلٌ', en: 'The doer of the action (subject).' },
    { ar: 'ضَمِيرٌ مُسْتَتِرٌ', en: 'A hidden pronoun.' },
    { ar: 'تَقْدِيرُهُ هُوَ', en: 'The hidden pronoun is understood as “he.”' },
    { ar: 'مَفْعُولٌ بِهِ', en: 'The object receiving the action.' },
    { ar: 'جَارٌّ وَمَجْرُورٌ', en: 'A prepositional phrase.' },
    { ar: 'فِي مَحَلِّ نَصْبٍ', en: 'Grammatically in the accusative position.' },
    { ar: 'فِي مَحَلِّ رَفْعٍ', en: 'Grammatically in the nominative position.' },
    {
      ar: 'لَا مَحَلَّ لَهُ مِنَ ٱلْإِعْرَابِ',
      en: 'It has no grammatical position in iʿrāb.',
    },
    { ar: 'جُمْلَةٌ ٱسْتِئْنَافِيَّةٌ', en: 'A new independent sentence.' },
    {
      ar: 'صِلَةُ ٱلْمَوْصُولِ',
      en: 'The sentence attached to a relative pronoun such as ٱلذِّي or مَا.',
    },
    { ar: 'ٱسْمٌ مَوْصُولٌ', en: 'A relative pronoun meaning “who,” “which,” or “that.”' },
    { ar: 'ٱسْمُ شَرْطٍ', en: 'A conditional noun meaning “whoever” or “if someone.”' },
    { ar: 'خَبَرٌ', en: 'The predicate or information given about the subject.' },
    { ar: 'مُبْتَدَأٌ', en: 'The starting noun or topic of the sentence.' },
    { ar: 'حَرْفُ تَوْكِيدٍ', en: 'A particle used for emphasis.' },
    { ar: 'حَرْفُ ٱسْتِقْبَالٍ', en: 'A particle indicating future tense.' },
    { ar: 'جَوَابُ ٱلشَّرْطِ', en: 'The answer or result of a condition.' },
    { ar: 'ظَرْفُ زَمَانٍ', en: 'An adverb of time.' },
    { ar: 'مُتَضَمِّنٌ مَعْنَى ٱلشَّرْطِ', en: 'Containing the meaning of a condition.' },
    {
      ar: 'فِي مَحَلِّ جَرٍّ بِٱلْإِضَافَةِ',
      en: 'Grammatically attached to another word in an iḍāfah construction.',
    },
    { ar: 'مَعْطُوفٌ', en: 'Joined to another word by a conjunction.' },
    { ar: 'بَدَلٌ', en: 'A substitute or explanatory replacement word.' },
    { ar: 'حَالٌ', en: 'A word describing the condition or state of something.' },
    { ar: 'صِفَةٌ', en: 'An adjective or descriptive word.' },
    { ar: 'نَائِبُ فَاعِلٍ', en: 'The substitute subject used in passive verbs.' },
    { ar: 'حَرْفُ نَفْيٍ', en: 'A negation particle meaning “not.”' },
    { ar: 'حَرْفُ ٱسْتِثْنَاءٍ', en: 'An exception particle such as “except.”' },
    {
      ar: 'حَرْفٌ زَائِدٌ لِتَأْكِيدِ ٱلنَّفْيِ',
      en: 'An extra particle added only to strengthen negation.',
    },
  ];

  function shuffleInPlace(arr, rng) {
    var random = rng || Math.random;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function cloneCards() {
    return window.IRAAB_TERM_FLASHCARDS.map(function (c) {
      return { ar: c.ar, en: c.en };
    });
  }

  function init() {
    var root = document.getElementById('flashcards-root');
    if (!root) return;

    var order = cloneCards();
    var idx = 0;
    var flipped = false;
    /** @type {'ar'|'en'} Which side shows first when not flipped */
    var faceFirst = 'ar';

    var elCounter = document.getElementById('flashcards-counter');
    var elFlipBtn = document.getElementById('flashcards-flip');
    var elPrev = document.getElementById('flashcards-prev');
    var elNext = document.getElementById('flashcards-next');
    var elShuffle = document.getElementById('flashcards-shuffle');
    var radios = document.querySelectorAll('input[name="flashcards-face"]');

    var scene = document.createElement('div');
    scene.className = 'flashcards-scene';
    scene.setAttribute('role', 'region');
    scene.setAttribute('aria-label', 'Flashcard');

    var card = document.createElement('div');
    card.className = 'flashcards-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Flip card');
    card.setAttribute('aria-pressed', 'false');

    var inner = document.createElement('div');
    inner.className = 'flashcards-card__inner';

    var faceA = document.createElement('span');
    faceA.className = 'flashcards-card__face flashcards-card__face--a';
    faceA.dir = 'rtl';
    faceA.lang = 'ar';

    var faceB = document.createElement('span');
    faceB.className = 'flashcards-card__face flashcards-card__face--b';
    faceB.dir = 'ltr';
    faceB.lang = 'en';

    inner.appendChild(faceA);
    inner.appendChild(faceB);
    card.appendChild(inner);
    scene.appendChild(card);
    root.appendChild(scene);

    var hint = document.createElement('p');
    hint.className = 'flashcards-hint';
    hint.dir = 'ltr';
    hint.lang = 'en';
    hint.textContent = 'Tap the card or press Space to flip. ← → for previous and next.';
    root.appendChild(hint);

    function current() {
      return order[idx];
    }

    function applyFaces() {
      var c = current();
      if (!c) return;
      faceA.classList.remove('flashcards-card__face--ar', 'flashcards-card__face--en');
      faceB.classList.remove('flashcards-card__face--ar', 'flashcards-card__face--en');
      if (faceFirst === 'ar') {
        faceA.textContent = c.ar;
        faceA.dir = 'rtl';
        faceA.lang = 'ar';
        faceA.classList.add('flashcards-card__face--ar');
        faceB.textContent = c.en;
        faceB.dir = 'ltr';
        faceB.lang = 'en';
        faceB.classList.add('flashcards-card__face--en');
      } else {
        faceA.textContent = c.en;
        faceA.dir = 'ltr';
        faceA.lang = 'en';
        faceA.classList.add('flashcards-card__face--en');
        faceB.textContent = c.ar;
        faceB.dir = 'rtl';
        faceB.lang = 'ar';
        faceB.classList.add('flashcards-card__face--ar');
      }
    }

    function setFlipped(on) {
      flipped = !!on;
      inner.classList.toggle('flashcards-card__inner--flipped', flipped);
      card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    }

    function render() {
      if (elCounter) {
        elCounter.textContent = idx + 1 + ' / ' + order.length;
      }
      applyFaces();
      setFlipped(false);
      card.focus();
    }

    function go(delta) {
      var n = idx + delta;
      if (n < 0) n = order.length - 1;
      if (n >= order.length) n = 0;
      idx = n;
      render();
    }

    function toggleFlip() {
      setFlipped(!flipped);
    }

    card.addEventListener('click', toggleFlip);
    if (elFlipBtn) elFlipBtn.addEventListener('click', toggleFlip);
    if (elPrev) elPrev.addEventListener('click', function () { go(-1); });
    if (elNext) elNext.addEventListener('click', function () { go(1); });
    if (elShuffle) {
      elShuffle.addEventListener('click', function () {
        shuffleInPlace(order);
        idx = 0;
        render();
      });
    }

    for (var r = 0; r < radios.length; r++) {
      radios[r].addEventListener('change', function (e) {
        var t = e.target;
        if (t && t.value === 'en') faceFirst = 'en';
        else faceFirst = 'ar';
        render();
      });
    }

    document.addEventListener('keydown', function (e) {
      var ae = document.activeElement;
      var tag = ae && ae.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        if (tag === 'BUTTON') return;
        if (tag === 'A') return;
        e.preventDefault();
        toggleFlip();
      } else if (e.code === 'Enter' && ae === card) {
        e.preventDefault();
        toggleFlip();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
