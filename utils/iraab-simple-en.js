/**
 * Simple English gloss for Qurʾān iʿrāb when `analysisEn` is missing in data.
 * Walks `analysisParts`, maps each `rule` link to a short English label, and
 * phrase-translates common Arabic iʿrāb expression fragments (Juz ʿAmma corpus).
 */
(function () {
  /**
   * @type {Record<string, string>}
   */
  var RULE_EN = {
    atf: 'Conjunction (ʿaṭf)',
    'attached-nouns': 'Pronoun with noun',
    'attached-pronouns': 'Attached pronoun',
    'attached-verbs': 'Pronoun with verb',
    demonstratives: 'Demonstrative',
    'detached-pronouns': 'Detached pronoun',
    fael: 'Doer of the action (faʿil / subject)',
    'harf-jarr': 'Preposition (jarr)',
    'harf-maani': 'Particle of meaning',
    idafah: 'Possessive structure (iḍāfah)',
    'inna-sisters': 'Sister of inna (emphasis / naṣb)',
    'interrogative-nouns': 'Question word',
    'irab-jarr': 'Genitive (jarr / majrūr)',
    'irab-jazm': 'Jussive (jazm)',
    'irab-raf-dammah': 'Nominative: dammah (rafʿ)',
    'irab-raf-noon': 'Nominative: Nūn kept (al-afʿāl al-khamsah)',
    istithna: 'Exception (istithnāʾ)',
    'kaana-sisters': 'Incomplete verb (kāna-sister)',
    'mabni-muarab': 'Fixed (mabnī) / declinable (muʿrab) forms',
    mafool: 'Object of the verb (mafʿūl bih)',
    munada: 'Vocative (noun addressed)',
    naat: 'Adjective / describer (naʿt)',
    'nominal-sentence': 'Topic–comment (nominal sentence roles)',
    'number-plural': 'Plural pattern',
    'relative-nouns': 'Relative (connected) noun (mawṣūl)',
    'sentence-structure': 'Sentence structure',
    'silah-mawsul': 'Clause after the relative (ṣilah)',
    tawabi: 'Modifier / follower (tābiʿ)',
    'verb-ajwaf-yaee': 'Hollow verb (middle yāʾ)',
    'verb-imperative': 'Imperative (command) verb',
    'verb-passive-overview': 'Passive verb (overview)',
    'verb-past': 'Past-tense verb',
    'verb-past-passive': 'Past passive',
    'verb-present': 'Present / future (mudāriʿ) verb',
    'verb-present-conditional-particles': 'Conditional particle (with jazm)',
    'verb-present-double-emphasis': 'Emphatic lām (tawkīd)',
    'verb-present-jussive-particles': 'Jussive particle',
    'verb-present-nasb-particles': 'Subjunctive (naṣb) particle',
    'verb-present-negation': 'Negation / prohibition particle',
    'verb-present-passive': 'Present passive',
  };

  /** @type {Array<[string, string]>} Longest first (applied in order). */
  var PHRASES = [
    [
      'تَسْمِيَةٌ (بَسْمَلَةٌ).',
      "The basmalah (tasmiyyah) — a fixed, memorized opening phrase, not an ordinary iʿrāb line.",
    ],
    [
      'تَسْمِيَةٌ (بَسْمَلَةٌ)',
      "Basmala / tasmiyyah: fixed, memorized phrasing,",
    ],
    [
      'الْوَاوُ حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Wāw is a coordinating particle, fixed (mabnī) on fatḥah.',
    ],
    [
      'مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'Mudāf ilayh in the genitive; the sign of jarr is a visible kasrah.',
    ],
    [
      'وَ«وَاوُ الْجَمَاعَةِ» ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ',
      'The plural “wāw” is a fixed attached pronoun in the position of a nominative doer (faʿil).',
    ],
    [
      'وَالْجُمْلَةُ صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ',
      'The whole clause is the ṣilah of the connective; it is not a declinable iʿrāb slot.',
    ],
    [
      'وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»',
      'The doer (faʿil) is an implied (hidden) pronoun, “he” (huwa).',
    ],
    [
      'وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»',
      'The doer (faʿil) is an implied (hidden) pronoun, “he”.',
    ],
    [
      'وَالفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»',
      'The doer (faʿil) is an implied (hidden) pronoun, “he”.',
    ],
    [
      'وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»',
      'The doer (faʿil) is an implied (hidden) pronoun, “you” (2nd m. sing.).',
    ],
    [
      'وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنَا»',
      'The doer (faʿil) is an implied (hidden) pronoun, “I” (anā).',
    ],
    [
      'فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'A past (māḍī) verb, fixed (mabnī) on fatḥah.',
    ],
    [
      'فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ لِلتَّعَذُّرِ',
      'A past verb on estimated fatḥah where you cannot show it on the surface.',
    ],
    [
      'مَفْعُولٌ بِهٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ',
      'A direct object (manṣūb); the sign of naṣb is a visible fatḥah.',
    ],
    [
      'خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ',
      'Predicate (khabar), nominally marked (marfūʿ); the sign of rafʿ is a visible dammah.',
    ],
    [
      'اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'A noun in the genitive (jarr), with a visible kasrah as the sign of jarr.',
    ],
    [
      'اسم مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'A noun in the genitive (jarr), with a visible kasrah as the sign of jarr.',
    ],
    [
      'إِنَّ حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Inna is a particle of emphasis and naṣb, fixed (mabnī) on fatḥah.',
    ],
    [
      'الْبَاءُ حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ',
      'Bāʾ is a preposition, fixed (mabnī) on kasrah.',
    ],
    [
      'فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ',
      'Doer (faʿil), nominally marked (marfūʿ); the sign of rafʿ is a visible dammah.',
    ],
    [
      'مَجْرُورٌ وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'In the genitive (jarr) with a visible kasrah as the sign of jarr.',
    ],
    [
      'فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ',
      'A present (mudāriʿ) verb, nominally marked; the sign of rafʿ is a visible dammah.',
    ],
    [
      'فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ثُبُوتُ النُّونِ لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ',
      'A present verb in rafʿ with a retained nūn, because it is one of the “five verbs.”',
    ],
    [
      'مِنْ حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Min is a preposition, fixed (mabnī) on sukūn (silent juncture).',
    ],
    [
      'حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ',
      'A preposition, fixed (mabnī) on sukūn (silent juncture).',
    ],
    [
      'فِي حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Fī is a preposition, fixed (mabnī) on sukūn.',
    ],
    [
      'وَالْجُمْلَةُ فِي مَحَلِّ رَفْعِ خَبَرِ الْمُبْتَدَأِ «مَا»',
      'The whole clause is in the position of a nominative predicate of the unspoken topic mā…',
    ],
    [
      'فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ',
      'A past verb with dammah in form because it is attached to a plural wāw.',
    ],
    [
      'فِعْلٌ مُضَارِعٌ مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الظَّاهِرُ',
      'A present (mudāriʿ) verb in jazm, with a visible sukūn as the jazm sign.',
    ],
    [
      'فِعْلُ أَمْرٍ مَبْنِيٌّ عَلَى السُّكُونِ',
      'An imperative verb, fixed (mabnī) on sukūn.',
    ],
    [
      'فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِتَاءِ الْفَاعِلِ',
      'A past verb, fixed (mabnī) on sukūn, because a tāʾ al-fāʿil (subject suffix) is attached.',
    ],
    [
      'وشِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرٌ مُقَدَّمٌ',
      'A quasi-sentence in the position of a fronted (muqaddam) predicate.',
    ],
    [
      'مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ',
      'A topic (mubtadaʾ), marfūʿ; the sign of rafʿ is a visible dammah.',
    ],
    [
      'وَ لم حَرْفُ نَفْيٍ وَجَزْمٍ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Lam is a negation and jazm particle, fixed (mabnī) on sukūn.',
    ],
    [
      'وَ لَا حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Lā is a negation particle, fixed (mabnī) on sukūn.',
    ],
    [
      'وَ لَا حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Lā is a negation particle, fixed (mabnī) on fatḥah (here).',
    ],
    [
      'لَا حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Lā is a negation particle, fixed (mabnī) on sukūn.',
    ],
    [
      'ضَمِيرٌ مُنْفَصِلٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٌ',
      'A detached pronoun, fixed (mabnī) on sukūn, in the position of a nominative topic (mubtadaʾ).',
    ],
    [
      'اسْمٌ مَوْصُولٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ لِاسْمِ الْفَاعِلِ',
      'A connective mawṣūl, fixed (mabnī) on sukūn, in the position of a manṣūb object for the active participle (ism al-fāʿil) sense.',
    ],
    [
      'اسمُ الْجَلَالَةِ مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'The Majestic name as mudāf ilayh, majrūr; sign of jarr is a visible kasrah.',
    ],
    [
      'وَ«عَمِلُوا» فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ',
      "The past verb ʿamilū (they did) is mabnī on dammah, with plural wāw attached.",
    ],
    [
      'فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلثَّقْلِ',
      'A present verb, marfūʿ, with a dammah “placed by rule” (muqaddarah) to ease pronunciation.',
    ],
    [
      'الْفَاءُ حَرْفُ رَابِطٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Fāʾ is a “linking” particle, fixed (mabnī) on fatḥah.',
    ],
    [
      'ثمّ حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Thumma is a coordinating particle, fixed (mabnī) on fatḥah.',
    ],
    [
      'اللَّامُ حَرْفُ قَسَمٍ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Lām is a vow-particle, fixed (mabnī) on fatḥah.',
    ],
    [
      'اللَّامُ حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْفَتْحِ',
      'Lām is a preposition, fixed (mabnī) on fatḥah.',
    ],
    [
      'اللَّامُ حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ',
      'Lām is a preposition, fixed (mabnī) on kasrah.',
    ],
    [
      'نَعْتٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ',
      'A modifier (naʿt) in the genitive; sign of jarr is a visible kasrah.',
    ],
    [
      'خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْوَاوُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ',
      'A predicate (khabar), marfūʿ; the rafʿ sign is a wāw, because the noun is a sound masculine plural.',
    ],
    [
      'عَلَى حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ',
      'ʿAlā is a preposition, fixed (mabnī) on sukūn.',
    ],
    [
      '«فِي» حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ',
      'Fī is a preposition, fixed (mabnī) on sukūn.',
    ],
    [
      'وَالْجُمْلَةُ فِي مَحَلِّ رَفْعِ خَبَرٍ «إِنَّ»',
      'The clause is in the position of the predicate of the inna construction (khabar inna).',
    ],
    [
      'وَالْجُمْلَةُ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ',
      'The clause is in the position of a genitive (mudāf ilayh) slot.',
    ],
    [
      'سَوْفَ سَوْفٌ مَرْفُوعٌ بِالضَّمَّةِ',
      "Sawfa is a noun here, marfūʿ (dammah), meaning “soon / will (future sense).",
    ],
    [
      'حَرْفُ تَنْبِيهٍ',
      "Particle of attention / calling attention to what follows (tanbīh).",
    ],
    [
      'حَرْفُ نَفْيٍ',
      "Negation particle (nafy).",
    ],
    [
      'حَرْفُ عَطْفٍ',
      "Coordinating particle (ʿaṭf).",
    ],
    [
      'حَرْفُ جَرٍّ',
      "Preposition (jarr; takes the next word in the genitive).",
    ],
    [
      'مَبْنِيٌّ عَلَى السُّكُونِ',
      "Fixed (mabnī) on sukūn (a silent, unchanging end).",
    ],
    [
      'مَبْنِيٌّ عَلَى الْفَتْحِ',
      "Fixed (mabnī) on fatḥah (the vowel does not change for case).",
    ],
    [
      'مَبْنِيٌّ عَلَى الْكَسْرِ',
      "Fixed (mabnī) on kasrah (the vowel does not change for case).",
    ],
    [
      'مَبْنِيٌّ عَلَى الضَّمِّ',
      "Fixed (mabnī) on dammah (the vowel does not change for case).",
    ],
    [
      'مَرْفُوعٌ',
      "Nominally marked (rafʿ / marfūʿ).",
    ],
    [
      'مَنْصُوبٌ',
      "In the accusative (manṣūb).",
    ],
    [
      'مَجْرُورٌ',
      "In the genitive (jarr / majrūr), usually after a preposition or in iḍāfah.",
    ],
    [
      'مَجْزُومٌ',
      "Jussive (jazm), often after lam, the jussive lā, or a conditional in).",
    ],
    [
      'مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ',
      "Accusative (manṣūb); the sign of naṣb is",
    ],
    [
      'مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ',
      "Nominally marked; the rafʿ sign is",
    ],
    [
      'وَعَلَامَةُ جَرِّهِ',
      "The sign of jarr (genitive) is",
    ],
    [
      'الضَّمَّةُ الظَّاهِرَةُ',
      "a visible dammah (u) on the last letter.",
    ],
    [
      'الضَّمَّةُ الْمُقَدَّرَةُ',
      "an “estimated” dammah (u) when you cannot see it (phonetics / heaviness).",
    ],
    [
      'الْفَتْحَةَ الظَّاهِرَةَ',
      "a visible fatḥah (a) on the last letter.",
    ],
    [
      'الْكَسْرَةُ الظَّاهِرَةُ',
      "a visible kasrah (i) on the last letter.",
    ],
    [
      'سُكُونٌ',
      "sukūn (no vowel) as the jazm or mabnī sign",
    ],
    [
      'السُّكُونُ الظَّاهِرُ',
      "a visible sukūn (no vowel) as the jazm sign",
    ],
    [
      'ثُبُوتُ النُّونِ',
      "a retained nūn (one of the five present verbs, rafʿ sign = nūn).",
    ],
    [
      'ضَمِيرٌ مُسْتَتِرٌ',
      "an implied (hidden) pronoun",
    ],
    [
      'لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ',
      "not a declinable iʿrāb place (a whole sentence unit).",
    ],
    [
      'فِي مَحَلِّ رَفْعِ',
      "in a nominative (rafʿ) position as",
    ],
    [
      'فِي مَحَلِّ نَصْبِ',
      "in an accusative (manṣūb) position as",
    ],
    [
      'فِي مَحَلِّ جَرٍّ',
      "in a genitive (jarr) position as",
    ],
    [
      'فَاعِلٌ',
      "doer of the action (faʿil, subject of the verb).",
    ],
    [
      'مَفْعُولٌ بِهٍ',
      "object of the verb (mafʿūl bih).",
    ],
    [
      'مُبْتَدَأٌ',
      "topic of the sentence (mubtadaʾ, “what you start with”).",
    ],
    [
      'خَبَرٌ',
      "predicate / comment (khabar) about the topic",
    ],
    [
      'صِلَةُ الْمَوْصُولِ',
      "the clause that completes the connective mawṣūl",
    ],
    [
      'جَمْعُ مُذَكَّرٍ سَالِمٍ',
      "a sound masculine plural (rāfiʿ / manṣūb / majrūr by waw or yāʾ, etc.).",
    ],
    [
      'ضَمِيرٌ مُتَّصِلٌ',
      "an attached clitic pronoun (fixed shape, in a specific syntactic role)",
    ],
    [
      'مُضَافٌ إِلَيْهِ',
      "the second noun in iḍāfah (possessive) — the thing possessed or specified",
    ],
    [
      'فِعْلٌ مَاضٍ',
      "a past-tense (māḍī) verb",
    ],
    [
      'الْوَاوُ',
      "wāw (as particle / coordinator)",
    ],
    [
      'فِعْلٌ مُضَارِعٌ',
      "a present / future (mudāriʿ) verb",
    ],
    [
      'وَالْجُمْلَةُ',
      "and the whole clause or sentence (jumlah)",
    ],
    [
      'وَاوُ الْجَمَاعَةِ',
      "plural wāw (“they / you all” marker) attached to the verb",
    ],
    [
      'اسْمٌ مَوْصُولٌ',
      "a connective / relative “ism mawṣūl” (like alladhī, mā, etc. as taught)",
    ],
    [
      'هاء الغائب',
      "the third-person hāʾ (“his, her, its”) attached to a noun/verb",
    ],
    [
      'هَاءُ الْغَائِبِ',
      "the third-person hāʾ (“his, her, its”) of the absent person",
    ],
    [
      'كَافُ الْمُخَاطَبِ',
      "the second-person kāf (“your”) attached to a noun/verb",
    ],
    [
      'بِالْحَرْفِ',
      "governed in the genitive by the particle (connected to the ḥarf)",
    ],
    [
      'وشِبْهُ جُمْلَةٍ',
      "and a kind of “quasi-sentence” (shibh jumlah) in the needed syntactic place",
    ],
    [
      'اللَّامُ',
      "lām (particle / preposition) here",
    ],
    [
      'الْبَاءُ',
      "bāʾ (the preposition bi-) here",
    ],
    [
      'وعَلَامَةُ جَرِّهِ',
      "and the sign of jarr (genitive) is",
    ],
    [
      'نَعْتٌ لِـ',
      "an adjective (naʿt) in agreement for…",
    ],
    [
      'إِنَّ حَرْفُ تَوْكِيدٍ وَنَصْبٍ',
      "inna: particle of emphasis and naṣb (affects the following noun/phrase)",
    ],
    [
      'اسْمُ الْجَلَالَةِ',
      "the Majestic name (Allah) in its special iʿrāb",
    ],
    [
      'لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ',
      "because the verb is attached to the plural wāw",
    ],
    [
      'مُضَارِعٌ',
      "in the present / future (mudāriʿ) pattern",
    ],
    [
      'لِاتِّصَالِهِ ب',
      "because of its connection to / attachment to",
    ],
    [
      'الْمُقَدَّرِ لِلتَّعَذُّرِ',
      "estimated (muqaddar) when you cannot show the short vowel on the surface",
    ],
    [
      'مُبْتَدَأٍ',
      "the topic (mubtadaʾ) in the needed case",
    ],
    [
      'فِعْلُ أَمْرٍ',
      "a verb in the command / imperative (amr)",
    ],
    [
      'اسْمُ اسْتِفْهَامٍ',
      "an interrogative (question) word/ism",
    ],
    [
      'ظَرْفُ زَمَانٍ',
      "an adverb of time (time phrase)",
    ],
    [
      'اسْمُ إِشَارَةٍ',
      "a demonstrative (pointing) noun/phrase",
    ],
    [
      'ضَمِيرٌ مُنْفَصِلٌ',
      "a detached (standing alone) pronoun",
    ],
    [
      'حَرْفُ رَدْعٍ وَزَجْرٍ',
      "a particle of driving away or warning (rare rhetorical use)",
    ],
    [
      'تَقْدِيرُهُ',
      "its estimated / implied referent is",
    ],
    [
      'اسْمُ إِنَّ',
      "the noun of inna (takes naṣb after inna, etc.)",
    ],
    [
      'حَالٌ',
      "a circumstantial (ḥāl) — “in the state of…” in accusative",
    ],
    [
      'نَعْتٌ',
      "an adjective/qualifier (naʿt) describing another noun",
    ],
    [
      'خَبَرٌ مُقَدَّمٌ',
      "a fronted predicate (khabar muqaddam) before its topic",
    ],
    [
      'مُبْتَدَأٌ مُؤَخَّرٌ',
      "a topic (mubtadaʾ) that comes after its predicate in word order",
    ],
    [
      'خَبَرُ إِنَّ',
      "the predicate of inna (marfūʿ khabar inna / comment after the emphasized noun)",
    ],
    [
      'وَ الْوَاوُ',
      "and: wāw (coordinator) here",
    ],
    [
      'الْوَاوُ حَرْفُ جَرٍّ',
      "wāw as a jarr-particle (oath/pledge) here",
    ],
  ];

  PHRASES.sort(function (a, b) {
    return b[0].length - a[0].length;
  });

  /** Strips all Arabic script (and common joiners) from a mixed string. */
  var AR_STRIP = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200c\u200d\u0640]+/g;

  /**
   * @param {string} s
   */
  function cleanSpaces(s) {
    return s
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,;:!?])/g, '$1')
      .replace(/^\s*[,،]\s*/g, '')
      .replace(/\s*،\s*/g, ' · ')
      .replace(/\s*\.\s*\./g, '.')
      .replace(/\s+\./g, '.')
      .trim();
  }

  /**
   * @param {string} fullAr
   */
  function translateCore(fullAr) {
    if (!fullAr) return '';
    var t = fullAr;
    for (var i = 0; i < PHRASES.length; i++) {
      var pair = PHRASES[i];
      if (t.indexOf(pair[0]) !== -1) {
        t = t.split(pair[0]).join(' ' + pair[1] + ' ');
      }
    }
    return cleanSpaces(t);
  }

  /**
   * @param {{ analysisParts?: Array<{ type?: string, text?: string, rule?: string }> } | null | undefined} row
   * @returns {string}
   */
  /**
   * @param {Array<{ type?: string, text?: string, rule?: string }>} parts
   */
  function uniqueRuleLabels(parts) {
    var out = [];
    var seen = {};
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p && p.type === 'link' && p.rule) {
        var L = RULE_EN[p.rule] || p.rule;
        if (!seen[L]) {
          seen[L] = 1;
          out.push(L);
        }
      }
    }
    return out;
  }

  function isWeakEnglish(s) {
    if (s == null) return true;
    var t = String(s).trim();
    if (t.length < 2) return true;
    if (!/[A-Za-z]/.test(t)) return true;
    if (/^[\s.·;:!?\-–—()[\]””‘’'"]+$/ .test(t)) return true;
    if (/^\(?\s*\)?\.?$|^[.()\s\[\]]+$/ .test(t)) return true;
    return false;
  }

  function iraabSimpleEnFromRow(row) {
    if (!row || !row.analysisParts || !row.analysisParts.length) return '';
    var parts = row.analysisParts;
    var buf = [];
    for (var k = 0; k < parts.length; k++) {
      var p = parts[k];
      if (p && p.type === 'link' && p.rule) {
        var label = RULE_EN[p.rule];
        if (label) {
          buf.push('[' + label + ']');
        } else {
          buf.push('[' + String(p.rule) + ']');
        }
        if (p.text) buf.push(String(p.text));
      } else {
        if (p && p.text) buf.push(String(p.text));
      }
    }
    var lab = uniqueRuleLabels(parts);
    var joined = buf.join(' ');
    var tr = translateCore(joined);
    if (!tr) {
      return lab.length ? cleanSpaces('Key ideas: ' + lab.join(' · ') + '.') : '';
    }
    var enOnly = tr.replace(AR_STRIP, ' ').replace(/\s+/g, ' ').trim();
    enOnly = enOnly
      .replace(/\s*·\s*/g, ' · ')
      .replace(/\s+\./g, '.')
      .replace(/^\s*[\[【]\s*[\]】]\s*/g, '')
      .replace(/\s*[\[【]\s*[\]】]\s*/g, ' ');
    enOnly = cleanSpaces(enOnly);
    if (isWeakEnglish(enOnly) && lab.length) {
      return cleanSpaces('Key ideas: ' + lab.join(' · ') + '.');
    }
    if (enOnly.length < 25 && lab.length) {
      return cleanSpaces('Key ideas: ' + lab.join(' · ') + (enOnly && !isWeakEnglish(enOnly) ? '. ' + enOnly : '.'));
    }
    if (enOnly.length < 12 && lab.length) {
      return cleanSpaces(lab.join(' · ') + '.');
    }
    if (isWeakEnglish(enOnly) && !lab.length) {
      return "Follow the same analysis as the Arabic iʿrāb (signs, mabnī, and case roles) using the line above.";
    }
    return enOnly;
  }

  window.iraabSimpleEnFromRow = iraabSimpleEnFromRow;
})();
