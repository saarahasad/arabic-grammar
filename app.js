/**
 * Arabic Grammar — Mind map & explanation panel
 * Lesson bodies live in lessons/<rule-id>.html (see lesson-content.js).
 */

const RULES = {
  intro: { title: "Grammar Rules", arabicTitle: "قواعد النحو" },
  kalimaat: { title: "Kalimaat (Words)", arabicTitle: "كَلِمَات / اَلْكَلَام" },
  words: { title: "Parts of Speech", arabicTitle: "كَلِمَات / اَلْكَلَام" },
  noun: { title: "The noun", arabicTitle: "الْإِسْم" },
  "mamnu-sarf": { title: "Mamnuʿ min al-ṣarf", arabicTitle: "الْمَمْنُوعُ مِنَ الصَّرْف" },
  masdar: { title: "Verbal Nouns", arabicTitle: "الْمَصْدَر" },
  "mabni-muarab": {
    title: "Mabnī & muʿrab — noun endings",
    arabicTitle: "الْمَبْنِي وَالْمُعْرَبُ · الْأَسْمَاءُ الْمَبْنِيَّةُ وَالْمُعْرَبَةُ",
  },
  gender: { title: "Gender", arabicTitle: "الْجِنْس" },
  "gender-masc": { title: "Masculine", arabicTitle: "مُذَكَّر" },
  "gender-fem": { title: "Feminine", arabicTitle: "مُؤَنَّث" },
  number: { title: "Number", arabicTitle: "الْعَدَد" },
  "number-singular": { title: "Singular", arabicTitle: "مُفْرَد" },
  "number-dual": { title: "Dual", arabicTitle: "مُثَنًّى" },
  "number-plural": { title: "Plural", arabicTitle: "جَمْع" },
  "vocab-body-parts": { title: "Vocabulary — Body Parts", arabicTitle: "مُفْرَدَاتُ الْجَسَد" },
  idafah: { title: "Idāfah", arabicTitle: "الْإِضَافَة" },
  tawabi: { title: "The Followers (At-Tawābiʿ)", arabicTitle: "التوابع" },
  naat: { title: "Naʿt — Adjective", arabicTitle: "النَّعْت" },
  "sifah-mawsuf": { title: "Descriptive phrase", arabicTitle: "الصِّفَةُ وَالْمَوْصُوفُ" },
  atf: { title: "Conjunction (Al-ʿAṭf)", arabicTitle: "الْعَطْف" },
  "special-nouns": { title: "Special Nouns", arabicTitle: "أَسْمَاء خَاصَّة" },
  "magnified-nouns": { title: "Magnified nouns — the five special nouns", arabicTitle: "الْأَسْمَاءُ الْمُكَبَّرَة · الْأَسْمَاءُ الْخَمْسَة" },
  demonstratives: { title: "Demonstrative pronouns", arabicTitle: "أَسْمَاءُ الْإِشَارَة" },
  "relative-nouns": { title: "Relative Nouns", arabicTitle: "اسْمُ الْمَوْصُول" },
  "silah-mawsul": { title: "Ṣilah al-Mawṣūl", arabicTitle: "صِلَة الْمَوْصُول" },
  "interrogative-nouns": { title: "Interrogative Nouns", arabicTitle: "أَسْمَاءُ الِاسْتِفْهَام" },
  istithna: { title: "Exception", arabicTitle: "الْإِسْتِثْنَاء" },
  "sentence-structure": { title: "Sentence Structure", arabicTitle: "الْجُمْلَة" },
  "nominal-sentence": { title: "Nominal Sentence", arabicTitle: "الْجُمْلَة الْإِسْمِيَّة" },
  "inna-sisters": { title: "Inna & its sisters", arabicTitle: "إِنَّ وَ أَخَوَاتُهَا" },
  "kaana-sisters": { title: "Kaana & its sisters", arabicTitle: "كَانَ وَ أَخَوَاتُهَا" },
  "verbal-sentence": { title: "Verbal Sentence", arabicTitle: "الْجُمْلَة الْفِعْلِيَّة" },
  "verb-passive-overview": { title: "Passive verb (overview)", arabicTitle: "الْفِعْلُ الْمَجْهُول" },
  fael: { title: "Faʿil — Subject / Active participle", arabicTitle: "الْفَاعِل / اسْمُ الْفَاعِل" },
  mafool: { title: "Mafʿūl — Object / Passive participle", arabicTitle: "الْمَفْعُول / اسْمُ الْمَفْعُول" },
  irab: { title: "I'rāb", arabicTitle: "الْإِعْرَاب" },
  "irab-raf": { title: "Raf'", arabicTitle: "الرَّفْعُ" },
  "irab-raf-dammah": { title: "Dammah — original sign of Raf'", arabicTitle: "الضَّمَّةُ" },
  "irab-raf-waw": { title: "Wāw — secondary sign of Raf'", arabicTitle: "الْوَاوُ" },
  "irab-raf-alif": { title: "Alif — secondary sign of Raf'", arabicTitle: "الْأَلِفُ" },
  "irab-raf-noon": { title: "Nūn — secondary sign of Raf'", arabicTitle: "النُّونُ" },
  "irab-nasb": { title: "Naṣb", arabicTitle: "النَّصْبُ" },
  "irab-jarr": { title: "Jarr", arabicTitle: "الْجَرُّ" },
  "irab-jazm": { title: "Jazm", arabicTitle: "الْجَزْمُ" },
  verb: { title: "The Verb", arabicTitle: "الْفِعْل" },
  "verb-past": { title: "Past Tense", arabicTitle: "الْمَاضِي" },
  "verb-past-passive": { title: "Past Passive", arabicTitle: "الْمَاضِي الْمَجْهُول" },
  "verb-mudaaf": { title: "Geminate (Double-Lettered) Verb", arabicTitle: "الْفِعْلُ الْمُضَاعَفُ" },
  "verb-mahmuz": { title: "Verbs with Hamza (ء)", arabicTitle: "الْفِعْلُ الْمَهْمُوزُ" },
  "verb-ajwaf-wawi": { title: "Hollow Verb (Middle Wāw)", arabicTitle: "الْفِعْلُ الْأَجْوَفُ الْوَاوِيُ" },
  "verb-ajwaf-yaee": { title: "Hollow Verb (Middle Yāʾ)", arabicTitle: "الْفِعْلُ الْأَجْوَفُ الْيَائِيُ" },
  "verb-ajwaf-exception": { title: "Hollow Verbs — Exceptions", arabicTitle: "الْأَجْوَفُ — اسْتِثْنَاءَاتٌ" },
  "verb-initial-waw": { title: "Verbs with First Letter Wāw", arabicTitle: "الْفِعْلُ الْمِثَالُ (الْوَاوِيُ)" },
  "verb-naqis-wawi": { title: "Defective Verb (Last Letter Wāw)", arabicTitle: "الْفِعْلُ النَّاقِصُ الْوَاوِيُ" },
  "verb-present-passive": { title: "Present Passive", arabicTitle: "الْمُضَارِعُ الْمَجْهُولُ" },
  "verb-present": { title: "Present & Future Tense", arabicTitle: "الْمُضَارِع" },
  "verb-present-negation": { title: "Present Tense: Negation & Prohibition", arabicTitle: "نَفْيُ وَ نَهْيُ الْمُضَارِعِ" },
  "verb-present-jussive-particles": { title: "Jussive Particles (Hurūf Jāzimah)", arabicTitle: "حُرُوفٌ جَازِمَة" },
  "verb-present-conditional-particles": { title: "Conditional Words (Hurūf ash-Sharṭ)", arabicTitle: "حُرُوفُ الشَّرْط" },
  "verb-present-nasb-particles": { title: "Accusative Particles (Hurūf Nāṣibah)", arabicTitle: "حُرُوفٌ نَاصِبَة" },
  "verb-present-double-emphasis": { title: "Double Emphasis (Lām al-tawkīd & heavy nūn)", arabicTitle: "لَامُ التَّوْكِيدِ وَ النُّونُ الثَّقِيلَةُ" },
  "verb-imperative": { title: "The Imperative", arabicTitle: "فِعْلُ الْأَمْر" },
  "verb-imperative-li": { title: "Lam al-amr (لِـ)", arabicTitle: "لَامُ الْأَمْر" },
  harf: { title: "The Particle", arabicTitle: "الْحَرْف" },
  "harf-letters": { title: "Letters of the Alphabet", arabicTitle: "حُرُوفُ الْهِجَاء" },
  "harf-maani": { title: "Particles with Meaning", arabicTitle: "حُرُوفُ الْمَعَانِي" },
  "harf-jarr": { title: "Prepositions", arabicTitle: "حُرُوفُ الْجَرِّ" },
  munada: { title: "The vocative", arabicTitle: "الْمُنَادَى" },
  pronouns: { title: "Pronouns", arabicTitle: "ضَمَائِر" },
  "detached-pronouns": { title: "Detached Pronouns", arabicTitle: "ضَمَائِر مُنْفَصِلَة" },
  "attached-pronouns": { title: "Attached Pronouns", arabicTitle: "ضَمَائِر مُتَّصِلَة" },
  "attached-nouns": { title: "Attached Pronouns with Nouns", arabicTitle: "ضَمَائِر مُتَّصِلَة مَعَ الْأَسْمَاء" },
  "attached-verbs": { title: "Attached Pronouns with Verbs", arabicTitle: "ضَمَائِر مُتَّصِلَة مَعَ الْأَفْعَال" },
  "definite-indefinite": { title: "Definite & Indefinite Nouns", arabicTitle: "نَكِرَة وَ مَعْرِفَة" },
  "coming-soon": { title: "Coming Soon" },
};

window.RULES = RULES;

const panel = document.getElementById('explanation-panel');
const panelContent = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');
const overlay = document.getElementById('panel-overlay');
const hasMindMap = () => !!document.querySelector('.mind-map');

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlAttr(str) {
  return escapeHtml(str).replace(/'/g, '&#39;');
}

/** Panel chrome / accent: topic, sentence, verb, harf, irab, noun (default word-level under Kalimaat). */
function getRuleTopic(ruleId) {
  if (ruleId === 'coming-soon' || ruleId === 'intro' || ruleId === 'kalimaat' || ruleId === 'words') {
    return 'topic';
  }
  if (ruleId.startsWith('irab')) return 'irab';
  if (ruleId === 'verb' || ruleId.startsWith('verb-')) return 'verb';
  if (ruleId === 'harf' || ruleId.startsWith('harf-') || ruleId === 'munada') return 'harf';
  if (
    ruleId === 'sentence-structure' ||
    ruleId === 'nominal-sentence' ||
    ruleId === 'verbal-sentence' ||
    ruleId === 'inna-sisters' ||
    ruleId === 'kaana-sisters' ||
    ruleId === 'fael' ||
    ruleId === 'mafool' ||
    ruleId === 'verb-passive-overview' ||
    ruleId === 'istithna'
  ) {
    return 'sentence';
  }
  return 'noun';
}

// State: Grammar Rules → Kalimaat → (Noun, Verb, Particle); each expands independently
const expandedNodes = {
  kalimaat: false,
  noun: false,
  verb: false,
  verbPastExpand: false, // Past → مَاضِي مَجْهُول
  verbPresentNegation: false, // Present → Negation & prohibition (لَا، مَا، لَيْسَ)
  verbImperative: false, // Imperative → Lam al-amr (لِـ)
  harf: false, // Particle (الْحَرْف)
  rafSigns: false, // Four signs under Raf'
  verbalSentence: false, // Verbal sentence → Faʿil, Mafʿūl
  nominalSentence: false, // Nominal sentence → Inna & sisters, Kaana & sisters
};
let selectedNode = null;

async function openPanel(ruleId) {
  const rule = RULES[ruleId];
  if (!rule || !panelContent || !panel) return;

  const appRoot = document.querySelector('.app');

  panelContent.innerHTML =
    '<p class="panel-loading" style="padding:1rem 1.25rem;color:#64748b">Loading lesson…</p>';

  try {
    if (typeof window.loadLessonMainInnerHtml !== 'function') {
      throw new Error('loadLessonMainInnerHtml is not available (load lesson-content.js before app.js).');
    }
    const mainInner = await window.loadLessonMainInnerHtml(ruleId);
    const railHint = `<p class="panel-reading-hint">Your mind map stays beside this page—tap another topic anytime, or use <strong>Back to map</strong> when you are done.</p>`;
    panelContent.innerHTML = `
    <header class="panel-reading-rail">
      <div class="panel-reading-rail__text">
        <span class="panel-reading-kicker">Lesson</span>
        ${railHint}
      </div>
    </header>
    <div class="panel-reading-main">
      ${mainInner}
    </div>`;
  } catch (e) {
    console.error(e);
    panelContent.innerHTML = `<p class="panel-loading" style="padding:1rem 1.25rem">Could not load this lesson. <a href="lessons/${encodeURIComponent(ruleId)}.html">Open the lesson page</a>.</p>`;
  }

  panel.setAttribute('aria-hidden', 'false');
  panel.classList.add('is-open');
  if (appRoot) appRoot.classList.add('lesson-active');
  if (overlay) {
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
  }
  panel.scrollTop = 0;
}

function closePanel() {
  const appRoot = document.querySelector('.app');
  if (panel) {
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('is-open');
  }
  if (appRoot) appRoot.classList.remove('lesson-active');
  if (overlay) {
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
  }
  selectedNode = null;
  document.querySelectorAll('.node.is-selected').forEach((n) => n.classList.remove('is-selected'));
}

/** Open a lesson from `map.html?rule=…` or `#rule` (must match a key in `RULES`). */
function openRuleFromUrl(ruleId) {
  if (!ruleId || !RULES[ruleId]) return;
  const esc = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(ruleId) : ruleId.replace(/\\/g, '\\\\');
  const node = document.querySelector(`.node[data-rule="${esc}"]`);
  if (node) {
    selectedNode = node;
    document.querySelectorAll('.node.is-selected').forEach((n) => n.classList.remove('is-selected'));
    node.classList.add('is-selected');
  }
  void openPanel(ruleId);
}

// Collapse/expand: nodes with data-has-children toggle their children
function getChildrenForNode(node) {
  if (!node || !node.hasAttribute('data-has-children')) return null;
  const expandId = node.getAttribute('data-expand-id');
  if (expandId) {
    const children = document.querySelector(`[data-children-of="${expandId}"]`);
    return children;
  }
  let next = node.nextElementSibling;
  while (next) {
    if (next.classList.contains('branch-children') || next.classList.contains('branch-children-inner')) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null;
}

function onLearnMoreClick(node, event) {
  event.stopPropagation();
  toggleExpand(node);
}

function toggleExpand(node) {
  const expandId = node.getAttribute('data-expand-id');
  const children = getChildrenForNode(node);
  if (!children) return;

  if (expandId && expandedNodes.hasOwnProperty(expandId)) {
    expandedNodes[expandId] = !expandedNodes[expandId];
    const isExpanded = expandedNodes[expandId];
    children.classList.toggle('is-collapsed', !isExpanded);
    node.classList.toggle('is-expanded', isExpanded);
  } else {
    const isCollapsed = children.classList.contains('is-collapsed');
    children.classList.toggle('is-collapsed', !isCollapsed);
    node.classList.toggle('is-expanded', isCollapsed);
  }
  updateExpandIcons(node);
  if (hasMindMap()) drawConnections();
}

function updateExpandIcons(node) {
  const icon = node.querySelector('.expand-icon');
  if (icon) {
    icon.textContent = node.classList.contains('is-expanded') ? '▼' : '▶';
  }
}

// Start with all children collapsed (only Kalimaat node visible; Noun, Verb, Particle hidden)
function initCollapseState() {
  expandedNodes.kalimaat = false;
  expandedNodes.noun = false;
  expandedNodes.verb = false;
  expandedNodes.verbPastExpand = false;
  expandedNodes.verbPresentNegation = false;
  expandedNodes.verbImperative = false;
  expandedNodes.harf = false;
  expandedNodes.rafSigns = false;
  expandedNodes.verbalSentence = false;
  expandedNodes.nominalSentence = false;
  document.querySelectorAll('.branch-children, .branch-children-inner').forEach((el) => {
    el.classList.add('is-collapsed');
  });
  document.querySelectorAll('.node[data-has-children]').forEach((node) => {
    node.classList.remove('is-expanded');
    updateExpandIcons(node);
  });
}

function onNodeClick(node) {
  const ruleId = node.dataset.rule;
  if (!ruleId || ruleId === 'coming-soon') return;

  selectedNode = node;
  document.querySelectorAll('.node.is-selected').forEach((n) => n.classList.remove('is-selected'));
  node.classList.add('is-selected');
  void openPanel(ruleId);
}

// Learn more button: expand/collapse only — stopPropagation prevents node click
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.learn-more-btn');
  if (btn) {
    const node = btn.closest('.node');
    if (node) onLearnMoreClick(node, e);
    return;
  }

  const node = e.target.closest('.node');
  if (node) {
    e.stopPropagation();
    onNodeClick(node);
  }
});

if (panelClose) panelClose.addEventListener('click', closePanel);
if (overlay) overlay.addEventListener('click', closePanel);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) {
    closePanel();
  }
});

// Draw mind map connection lines — coordinates relative to mind-map (scrolls with content)
function getNodeCenter(node, mapRect) {
  if (!node) return null;
  const r = node.getBoundingClientRect();
  return {
    x: r.left - mapRect.left + r.width / 2,
    y: r.top - mapRect.top + r.height / 2
  };
}

/** Bottom / top center — better tree edges than center↔center for parent→child */
function getNodeEdge(node, mapRect, edge) {
  if (!node) return null;
  const r = node.getBoundingClientRect();
  const left = r.left - mapRect.left;
  const top = r.top - mapRect.top;
  const cx = left + r.width / 2;
  if (edge === 'bottom') return { x: cx, y: top + r.height };
  if (edge === 'top') return { x: cx, y: top };
  return { x: cx, y: top + r.height / 2 };
}

const INTRO_FIRST_LEVEL = new Set(['kalimaat', 'sentence-structure', 'irab']);

function drawConnections() {
  const svg = document.querySelector('.mind-map-connections');
  const mindMap = document.querySelector('.mind-map');
  if (!svg || !mindMap) return;

  const mapRect = mindMap.getBoundingClientRect();
  // Border box can be shorter than laid-out content; use scroll box so paths are not clipped
  const w = Math.max(1, Math.ceil(Math.max(mindMap.scrollWidth, mapRect.width)));
  const h = Math.max(1, Math.ceil(Math.max(mindMap.scrollHeight, mapRect.height)));

  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);

  const introEl = document.querySelector('.mind-map-center');
  if (!introEl) return;

  // Center → Kalimaat, Sentence, I'rāb; Kalimaat → Noun, Verb, Harf; then parent → child within each branch
  const connections = [
    { from: 'intro', to: 'kalimaat' },
    { from: 'intro', to: 'sentence-structure' },
    { from: 'intro', to: 'irab' },
    { from: 'kalimaat', to: 'noun' },
    { from: 'kalimaat', to: 'verb' },
    { from: 'kalimaat', to: 'harf' },
    { from: 'noun', to: 'gender' },
    { from: 'noun', to: 'number' },
    { from: 'noun', to: 'vocab-body-parts' },
    { from: 'noun', to: 'idafah' },
    { from: 'noun', to: 'tawabi' },
    { from: 'noun', to: 'naat' },
    { from: 'noun', to: 'sifah-mawsuf' },
    { from: 'noun', to: 'atf' },
    { from: 'noun', to: 'special-nouns' },
    { from: 'noun', to: 'definite-indefinite' },
    { from: 'noun', to: 'mabni-muarab' },
    { from: 'noun', to: 'mamnu-sarf' },
    { from: 'noun', to: 'masdar' },
    { from: 'noun', to: 'pronouns' },
    { from: 'gender', to: 'gender-masc' },
    { from: 'gender', to: 'gender-fem' },
    { from: 'number', to: 'number-singular' },
    { from: 'number', to: 'number-dual' },
    { from: 'number', to: 'number-plural' },
    { from: 'special-nouns', to: 'demonstratives' },
    { from: 'special-nouns', to: 'relative-nouns' },
    { from: 'special-nouns', to: 'silah-mawsul' },
    { from: 'special-nouns', to: 'interrogative-nouns' },
    { from: 'special-nouns', to: 'magnified-nouns' },
    { from: 'pronouns', to: 'detached-pronouns' },
    { from: 'pronouns', to: 'attached-pronouns' },
    { from: 'attached-pronouns', to: 'attached-nouns' },
    { from: 'attached-pronouns', to: 'attached-verbs' },
    { from: 'verb', to: 'verb-past' },
    { from: 'verb-past', to: 'verb-past-passive' },
    { from: 'verb-past', to: 'verb-mudaaf' },
    { from: 'verb-past', to: 'verb-mahmuz' },
    { from: 'verb-past', to: 'verb-ajwaf-wawi' },
    { from: 'verb-past', to: 'verb-ajwaf-yaee' },
    { from: 'verb-past', to: 'verb-ajwaf-exception' },
    { from: 'verb-past', to: 'verb-initial-waw' },
    { from: 'verb-past', to: 'verb-naqis-wawi' },
    { from: 'verb', to: 'verb-present' },
    { from: 'verb-present', to: 'verb-present-passive' },
    { from: 'verb-present', to: 'verb-present-negation' },
    { from: 'verb-present', to: 'verb-present-conditional-particles' },
    { from: 'verb-present', to: 'verb-present-jussive-particles' },
    { from: 'verb-present', to: 'verb-present-nasb-particles' },
    { from: 'verb-present', to: 'verb-present-double-emphasis' },
    { from: 'verb', to: 'verb-imperative' },
    { from: 'verb-imperative', to: 'verb-imperative-li' },
    { from: 'harf', to: 'harf-letters' },
    { from: 'harf', to: 'harf-maani' },
    { from: 'harf', to: 'harf-jarr' },
    { from: 'harf', to: 'munada' },
    { from: 'sentence-structure', to: 'nominal-sentence' },
    { from: 'nominal-sentence', to: 'inna-sisters' },
    { from: 'nominal-sentence', to: 'kaana-sisters' },
    { from: 'sentence-structure', to: 'verbal-sentence' },
    { from: 'sentence-structure', to: 'istithna' },
    { from: 'verbal-sentence', to: 'fael' },
    { from: 'verbal-sentence', to: 'mafool' },
    { from: 'verbal-sentence', to: 'verb-passive-overview' },
    { from: 'irab', to: 'irab-raf' },
    { from: 'irab-raf', to: 'irab-raf-dammah' },
    { from: 'irab-raf', to: 'irab-raf-waw' },
    { from: 'irab-raf', to: 'irab-raf-alif' },
    { from: 'irab-raf', to: 'irab-raf-noon' },
    { from: 'irab', to: 'irab-nasb' },
    { from: 'irab', to: 'irab-jarr' },
    { from: 'irab', to: 'irab-jazm' },
  ];

  const ruleToSelector = {
    intro: '.mind-map-center',
    kalimaat: '[data-rule="kalimaat"]',
    'sentence-structure': '[data-rule="sentence-structure"]',
    istithna: '[data-rule="istithna"]',
    irab: '[data-rule="irab"]',
    noun: '[data-rule="noun"]',
    'mabni-muarab': '[data-rule="mabni-muarab"]',
    'mamnu-sarf': '[data-rule="mamnu-sarf"]',
    masdar: '[data-rule="masdar"]',
    verb: '[data-rule="verb"]',
    harf: '[data-rule="harf"]',
    gender: '[data-rule="gender"]',
    'gender-masc': '[data-rule="gender-masc"]',
    'gender-fem': '[data-rule="gender-fem"]',
    number: '[data-rule="number"]',
    'number-singular': '[data-rule="number-singular"]',
    'number-dual': '[data-rule="number-dual"]',
    'number-plural': '[data-rule="number-plural"]',
    'vocab-body-parts': '[data-rule="vocab-body-parts"]',
    idafah: '[data-rule="idafah"]',
    tawabi: '[data-rule="tawabi"]',
    naat: '[data-rule="naat"]',
    'sifah-mawsuf': '[data-rule="sifah-mawsuf"]',
    atf: '[data-rule="atf"]',
    'special-nouns': '[data-rule="special-nouns"]',
    demonstratives: '[data-rule="demonstratives"]',
    'relative-nouns': '[data-rule="relative-nouns"]',
    'silah-mawsul': '[data-rule="silah-mawsul"]',
    'interrogative-nouns': '[data-rule="interrogative-nouns"]',
    'magnified-nouns': '[data-rule="magnified-nouns"]',
    'definite-indefinite': '[data-rule="definite-indefinite"]',
    pronouns: '[data-rule="pronouns"]',
    'detached-pronouns': '[data-rule="detached-pronouns"]',
    'attached-pronouns': '[data-rule="attached-pronouns"]',
    'attached-nouns': '[data-rule="attached-nouns"]',
    'attached-verbs': '[data-rule="attached-verbs"]',
    'verb-past': '[data-rule="verb-past"]',
    'verb-past-passive': '[data-rule="verb-past-passive"]',
    'verb-mudaaf': '[data-rule="verb-mudaaf"]',
    'verb-mahmuz': '[data-rule="verb-mahmuz"]',
    'verb-ajwaf-wawi': '[data-rule="verb-ajwaf-wawi"]',
    'verb-ajwaf-yaee': '[data-rule="verb-ajwaf-yaee"]',
    'verb-ajwaf-exception': '[data-rule="verb-ajwaf-exception"]',
    'verb-initial-waw': '[data-rule="verb-initial-waw"]',
    'verb-naqis-wawi': '[data-rule="verb-naqis-wawi"]',
    'verb-present-passive': '[data-rule="verb-present-passive"]',
    'verb-present': '[data-rule="verb-present"]',
    'verb-present-negation': '[data-rule="verb-present-negation"]',
    'verb-present-conditional-particles': '[data-rule="verb-present-conditional-particles"]',
    'verb-present-jussive-particles': '[data-rule="verb-present-jussive-particles"]',
    'verb-present-nasb-particles': '[data-rule="verb-present-nasb-particles"]',
    'verb-present-double-emphasis': '[data-rule="verb-present-double-emphasis"]',
    'verb-imperative': '[data-rule="verb-imperative"]',
    'verb-imperative-li': '[data-rule="verb-imperative-li"]',
    'harf-letters': '[data-rule="harf-letters"]',
    'harf-maani': '[data-rule="harf-maani"]',
    'harf-jarr': '[data-rule="harf-jarr"]',
    munada: '[data-rule="munada"]',
    'nominal-sentence': '[data-rule="nominal-sentence"]',
    'inna-sisters': '[data-rule="inna-sisters"]',
    'kaana-sisters': '[data-rule="kaana-sisters"]',
    'verbal-sentence': '[data-rule="verbal-sentence"]',
    fael: '[data-rule="fael"]',
    mafool: '[data-rule="mafool"]',
    'verb-passive-overview': '[data-rule="verb-passive-overview"]',
    'irab-raf': '[data-rule="irab-raf"]',
    'irab-raf-dammah': '[data-rule="irab-raf-dammah"]',
    'irab-raf-waw': '[data-rule="irab-raf-waw"]',
    'irab-raf-alif': '[data-rule="irab-raf-alif"]',
    'irab-raf-noon': '[data-rule="irab-raf-noon"]',
    'irab-nasb': '[data-rule="irab-nasb"]',
    'irab-jarr': '[data-rule="irab-jarr"]',
    'irab-jazm': '[data-rule="irab-jazm"]',
  };

  svg.innerHTML = '';

  const CONNECTOR_COLOR = '#b8bcb5';

  function drawSmoothCurve(p1, p2, opts = {}) {
    const dy = p2.y - p1.y;
    const vertical = opts.verticalFlow !== false;
    let d;
    if (vertical && Math.abs(dy) > 8) {
      const bend = Math.min(100, Math.max(36, Math.abs(dy) * 0.42));
      const cp1y = p1.y + bend;
      const cp2y = p2.y - bend;
      d = `M ${p1.x} ${p1.y} C ${p1.x} ${cp1y}, ${p2.x} ${cp2y}, ${p2.x} ${p2.y}`;
    } else {
      const midY = p1.y + dy * 0.5;
      d = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'connection-line');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', CONNECTOR_COLOR);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
  }

  connections.forEach(({ from, to }) => {
    const fromNode = document.querySelector(ruleToSelector[from]);
    const toNode = document.querySelector(ruleToSelector[to]);
    if (!fromNode || !toNode) return;
    const collapsed = toNode.closest('.is-collapsed');
    if (collapsed) return;

    let p1;
    let p2;
    let verticalFlow = true;

    if (from === 'intro' && INTRO_FIRST_LEVEL.has(to)) {
      p1 = getNodeEdge(introEl, mapRect, 'bottom');
      p2 = getNodeEdge(toNode, mapRect, 'top');
    } else if (from === 'intro') {
      p1 = getNodeEdge(introEl, mapRect, 'bottom');
      p2 = getNodeCenter(toNode, mapRect);
    } else {
      p1 = getNodeCenter(fromNode, mapRect);
      p2 = getNodeCenter(toNode, mapRect);
      verticalFlow = false;
    }

    if (!p1 || !p2) return;
    drawSmoothCurve(p1, p2, { verticalFlow });
  });
}

let drawConnectionsScheduled = false;
function scheduleDrawConnections() {
  if (drawConnectionsScheduled) return;
  drawConnectionsScheduled = true;
  requestAnimationFrame(() => {
    drawConnectionsScheduled = false;
    drawConnections();
  });
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const ruleFromQuery = params.get('rule');
  const h = window.location.hash;
  const ruleFromHash = h && h.length > 1 ? h.slice(1) : '';
  const ruleId = ruleFromQuery || ruleFromHash;

  if (document.body.classList.contains('lesson-khan')) {
    return;
  }

  initCollapseState();
  drawConnections();
  setTimeout(drawConnections, 100);
  setTimeout(drawConnections, 400);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => drawConnections());
  }
  if (ruleId) {
    openRuleFromUrl(ruleId);
  }
});
window.addEventListener('resize', () => {
  if (hasMindMap()) drawConnections();
});

const mindMapScrollEl = document.querySelector('.mind-map-scroll');
if (mindMapScrollEl) {
  mindMapScrollEl.addEventListener('scroll', scheduleDrawConnections, { passive: true });
}

const mindMapEl = document.querySelector('.mind-map');
if (mindMapEl && typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(() => scheduleDrawConnections()).observe(mindMapEl);
}
