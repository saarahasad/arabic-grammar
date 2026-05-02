/**
 * Qurʾān Iʿrāb — curated analysis rows (Juz ʿAmma surahs 95–114, plus optional extra āyāt elsewhere).
 *
 * `quran-iraab.js` merges this array with `quran-text-96-114.js` so every āyah 95:1 … 114:N appears;
 * āyāt without entries here show “Iʿrāb not available” (see `iraabUnavailable` / empty `rows`).
 *
 * Each ayah has `rows`: one row per analysed segment. `analysisParts` is an ordered list of
 * plain text spans and clickable rule spans (`type: 'link'`, `rule` = key in app.js RULES / lessons/*.html).
 * Optional per row: `prompt` (Arabic think-first question), `promptEn` (English hint), `noPrompt: true` to show
 * analysis without the reveal step (rare), `analysisEn` (English explanation of the same iʿrāb — use
 * **`scripts/fill-quran-iraab-analysis-en.mjs`** with the Anthropic API to batch-fill). If `prompt` is omitted,
 * **`quran-iraab.js`** shows a short **قَبْلَ الْكَشْفِ —** / **Before revealing —** line plus **clickable lesson titles**
 * from **`analysisParts` links** (or a one-line “which sign?” when there are no links).
 *
 * Add ayahs by appending to QURAN_IRAAB_AYAH. Prefer explicit parts over auto-parsing long strings.
 */
window.QURAN_IRAAB_AYAH = [
  {
    id: '109-1',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ يَٰٓأَيُّهَا ٱلْكَٰفِرُونَ',
    translationEn: 'Say: O disbelievers.',
    rows: [
      {
        segment: 'قُلْ',
        analysisEn:
          'Imperative verb, fixed on sukūn; the elided subject is the implied pronoun «you» (2nd masc. sing.).',
        analysisParts: [
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ».' },
        ],
      },
      {
        segment: 'يَٰٓأَيُّهَا',
        analysisParts: [
          { type: 'link', text: 'يَا', rule: 'munada' },
          { type: 'text', text: ' حَرْفُ نِدَاءٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَ«أَيُّ» مُنَادًى مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ، و«هَا» حَرْفُ تَنْبِيهٍ مَبْنِيٌّ عَلَى السُّكُونِ.' },
        ],
      },
      {
        segment: 'ٱلْكَٰفِرُونَ',
        analysisParts: [
          { type: 'link', text: 'نَعْتٌ', rule: 'naat' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْوَاوُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ — انْظُرْ ' },
          { type: 'link', text: 'جَمْعُ الْمُذَكَّرِ السَّالِمِ', rule: 'number-plural' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  },
  {
    id: '109-2',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 2,
    ayahText: 'لَا أَعْبُدُ مَا تَعْبُدُونَ',
    translationEn: 'I do not worship what you worship.',
    rows: [
      {
        segment: 'لَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿لَا﴾: حرف نفي لا عمل له.',
          },
        ],
      },
      {
        segment: 'أَعْبُدُ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿أَعْبُدُ﴾: فعل مضارع مرفوع وعلامة رفعه الضمة، والفاعل ضمير مستتر فيه وجوبًا تقديره: أنا. والجملة في محلّ نصب مفعول "قل".',
          },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿مَا﴾: اسم موصول مبنيّ على السكون في محلّ نصب مفعول به.',
          },
        ],
      },
      {
        segment: 'تَعْبُدُونَ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿تَعْبُدُونَ﴾: فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل. والجملة صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '109-3',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 3,
    ayahText: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
    translationEn: 'Nor are you worshippers of what I worship.',
    rows: [
      {
        segment: 'وَلَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَلَا﴾: الواو: حرف عطف. لا: حرف نفي لا عمل له.',
          },
        ],
      },
      {
        segment: 'أَنْتُمْ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿أَنْتُمْ﴾: ضمير رفع منفصل مبنيّ على السكون في محلّ رفع مبتدأ.',
          },
        ],
      },
      {
        segment: 'عَابِدُونَ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿عَابِدُونَ﴾: خبر "أنتم" مرفوع بالواو، لأنه جمع مذكر سالم، مَا أَعْبُدُ: تعرب إعراب "ما تعبدون" وهو « مَا: اسم موصول مبنيّ على السكون في محلّ نصب مفعول به.\n﴿تَعْبُدُونَ﴾: فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل».',
          },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿مَا﴾: اسم موصول مبنيّ على السكون في محلّ نصب مفعول به.',
          },
        ],
      },
      {
        segment: 'أَعْبُدُ',
        analysisParts: [
          {
            type: 'text',
            text: 'وعلامة رفع الفعل الضمة، وفاعله ضمير مستتر فيه وجوبًا تقديره: أنا. وجملة "ولا أنتم عابدون" معطوفة على جملة "أعبد" في محلّ نصب. وجملة "أعبد" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '109-4',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 4,
    ayahText: 'وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ',
    translationEn: 'Nor will I be a worshipper of what you worshipped.',
    rows: [
      {
        segment: 'وَلَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَلَا﴾: أعربت في الآية السابقة. وهو : « وَلَا: الواو: حرف عطف. لا: حرف نفي لا عمل له».',
          },
        ],
      },
      {
        segment: 'أَنَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿أَنَا﴾: ضمير رفع منفصل مبنيّ على السكون في محلّ رفع مبتدأ.',
          },
        ],
      },
      {
        segment: 'عَابِدٌ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿عَابِدٌ﴾: خبر "أنا" مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿مَا﴾: اسم موصول مبنيّ على السكون في محلّ نصب مفعول به لاسم الفاعل "عابدٌ".',
          },
        ],
      },
      {
        segment: 'عَبَدْتُمْ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿عَبَدْتُمْ﴾: فعل ماضٍ مبنيّ على السكون، لاتصاله بضمير الرفع المتحرك. و "التاء": ضمير متّصل مبنيّ على الضم في محلّ رفع فاعل. و "الميم": للجماعة. وجملة "أنا عابد" معطوفة على جملة "أعبد" لا محلّ لها من الإعراب. وجملة "عبدتم" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '109-5',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 5,
    ayahText: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
    translationEn: 'Nor will you worship what I worship.',
    rows: [
      {
        segment: 'وَلَا',
        analysisParts: [
          {
            type: 'text',
            text: 'تعرب إعراب الآية الثالثة من هذه الآية. وهو : « وَلَا: الواو: حرف عطف. لا: حرف نفي لا عمل له».',
          },
        ],
      },
      {
        segment: 'أَنْتُمْ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿أَنْتُمْ﴾: ضمير رفع منفصل مبنيّ على السكون في محلّ رفع مبتدأ.',
          },
        ],
      },
      {
        segment: 'عَابِدُونَ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿عَابِدُونَ﴾: خبر "أنتم" مرفوع بالواو، لأنه جمع مذكر سالم، مَا أَعْبُدُ: تعرب إعراب "ما تعبدون" وعلامة رفع الفعل الضمة، وفاعله ضمير مستتر فيه وجوبًا تقديره: أنا».',
          },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿مَا﴾: اسم موصول مبنيّ على السكون في محلّ نصب مفعول به.',
          },
        ],
      },
      {
        segment: 'أَعْبُدُ',
        analysisParts: [
          {
            type: 'text',
            text: 'وجملة "ولا أنتم عابدون" معطوفة على جملة "أعبد" في محلّ نصب. وجملة "أعبد" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '109-6',
    surah: 109,
    surahNameAr: 'الْكَافِرُونَ',
    ayah: 6,
    ayahText: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
    translationEn: 'For you is your religion, and for me is my religion.',
    rows: [
      {
        segment: 'لَكُمْ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿لَكُمْ﴾: جارّ ومجرور متعلّقان بخبر مقدم.',
          },
        ],
      },
      {
        segment: 'دِينُكُمْ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿دِينُكُمْ﴾: مبتدأ مؤخر مرفوع وعلامة رفعه الضمة، و "الكاف": ضمير متّصل مبنيّ في محلّ جرّ بالإضافة. و "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'وَلِيَ دِينِ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَلِيَ دِينِ﴾: معطوفة بالواو على "لكم دينكم" وتعرب إعرابها، و "الياء" المحذوفة من "دين" ضمير متّصل مبنيّ في محلّ جرّ بالإضافة. وجملة "لكم دينكم" استئنافية لا محلّ لها من الإعراب. وجملة "لي ديني" معطوفة على جملة "لكم دينكم" لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '104-1',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ وَيْلٌۭ لِّكُلِّ هُمَزَةٍۢ لُّمَزَةٍ',
    translationEn: 'Woe to every scorner and mocker.',
    rows: [
      {
        segment: 'وَيْلٌۭ',
        analysisParts: [
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'لِّكُلِّ',
        analysisParts: [
          { type: 'text', text: 'جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِخَبَرِ «وَيْلٍ» الْمَحْذُوفِ.' },
        ],
      },
      {
        segment: 'هُمَزَةٍۢ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'لُّمَزَةٍ',
        analysisParts: [
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          { type: 'text', text: ' مِنْ «هُمَزَةٍ» مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا.' },
        ],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text: 'وَجُمْلَةُ الْمُبْتَدَأِ وَالْخَبَرِ ابْتِدَائِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '104-2',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 2,
    ayahText: 'ٱلَّذِى جَمَعَ مَالًۭا وَعَدَّدَهُۥ',
    translationEn: 'Who collects wealth and counts it.',
    rows: [
      {
        segment: 'ٱلَّذِى',
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ خَبَرِ مُبْتَدَأٍ مَحْذُوفٍ تَقْدِيرُهُ: هُوَ. وَالْجُمْلَةُ «هُوَ الَّذِي» فِي مَحَلِّ جَرٍّ صِفَةً لِـ«هُمَزَةٍ».',
          },
        ],
      },
      {
        segment: 'جَمَعَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ.' },
        ],
      },
      {
        segment: 'مَالًۭا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'وَعَدَّدَهُۥ',
        analysisParts: [
          { type: 'text', text: 'مَعْطُوفَةٌ بِالْوَاوِ عَلَى «جَمَعَ»، وَتُعْرَبُ إِعْرَابَهَا، وَ«الْهَاءُ»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ.' },
        ],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text: 'وَجُمْلَةُ «جَمَعَ» صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ. وَجُمْلَةُ «عَدَّدَهُ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «جَمَعَ» لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '104-3',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 3,
    ayahText: 'يَحْسَبُ أَنَّ مَالَهُۥٓ أَخْلَدَهُۥ',
    translationEn: 'Thinking his wealth will make him immortal.',
    rows: [
      {
        segment: 'يَحْسَبُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ.' },
        ],
      },
      {
        segment: 'أَنَّ',
        analysisParts: [
          { type: 'link', text: 'أَنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' حَرْفُ تَوْكِيدٍ مُشَبَّهٌ بِالْفِعْلِ.' },
        ],
      },
      {
        segment: 'مَالَهُۥٓ',
        analysisParts: [
          { type: 'link', text: 'اسْمُ أَنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَنْصُوبٌ بِالْفَتْحَةِ، وَ«الْهَاءُ»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'أَخْلَدَهُۥ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ، وَ«الْهَاءُ»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ.' },
        ],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text: 'وَالْجُمْلَةُ الْفِعْلِيَّةُ «يَحْسَبُ» وَمَا بَعْدَهَا لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ، لِأَنَّهَا بَدَلٌ مِنْ صِلَةِ «الَّذِي».',
          },
        ],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text: 'وَ«أَنَّ» وَمَعْمُولَيْهَا مِنْ اسْمِهَا وَخَبَرِهَا فِي مَحَلِّ نَصْبٍ سَدَّتْ مَسَدَّ مَفْعُولَيْ «يَحْسَبُ».',
          },
        ],
      },
    ],
  },
  {
    id: '104-4',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 4,
    ayahText: 'كَلَّا ۖ لَيُنۢبَذَنَّ فِى ٱلْحُطَمَةِ',
    translationEn: 'No! He will surely be thrown into the Crusher.',
    rows: [
      {
        segment: 'كَلَّا',
        analysisParts: [
          { type: 'link', text: 'حَرْفُ رَدْعٍ وَزَجْرٍ', rule: 'harf-maani' },
          { type: 'text', text: ' لَا عَمَلَ لَهُ.' },
        ],
      },
      {
        segment: 'لَيُنۢبَذَنَّ',
        analysisParts: [
          { type: 'text', text: '«اللَّامُ»: حَرْفٌ لِلتَّوْكِيدِ. يُنْبَذَنَّ: ' },
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ لِلْمَجْهُولِ', rule: 'verb-present-passive' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ لِاتِّصَالِهِ بِ' },
          { type: 'link', text: 'نُونُ التَّوْكِيدِ الثَّقِيلَةِ', rule: 'verb-present-double-emphasis' },
          { type: 'text', text: '، وَ' },
          { type: 'link', text: 'نَائِبُ الْفَاعِلِ', rule: 'verb-passive-overview' },
          { type: 'text', text: ' ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ. وَ«النُّونُ»: حَرْفٌ لِلتَّوْكِيدِ.' },
        ],
      },
      {
        segment: 'فِى ٱلْحُطَمَةِ',
        analysisParts: [
          {
            type: 'text',
            text: 'جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِـ«يُنْبَذَنَّ» وَجُمْلَةُ «يُنْبَذَنَّ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '104-5',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 5,
    ayahText: 'وَمَآ أَدْرَىٰكَ مَا ٱلْحُطَمَةُ',
    translationEn: 'And what can make you know what the Crusher is?',
    rows: [
      {
        segment: 'وَمَآ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ. وَ«مَا»: ' },
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'أَدْرَىٰكَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحَةِ الْمُقَدَّرَةِ عَلَى الْأَلِفِ مَنْعَ مِنْ ظُهُورِهَا التَّعَذُّرُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ يَعُودُ عَلَى «مَا»، وَ«الْكَافُ»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ.' },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'ٱلْحُطَمَةُ',
        analysisParts: [
          { type: 'link', text: 'خَبَرٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' لِـ«مَا» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ (مِثْلُ إِعْرَابِ آيَةِ «وَمَا أَدْرَاكَ مَا الْحَاقَّةُ» فِي سُورَةِ الْحَاقَّةِ).' },
        ],
      },
    ],
  },
  {
    id: '104-6',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 6,
    ayahText: 'نَارُ ٱللَّهِ ٱلْمُوقَدَةُ',
    translationEn: 'It is the fire of Allah, [eternally] kindled.',
    rows: [
      {
        segment: 'نَارُ',
        analysisParts: [
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          {
            type: 'text',
            text: ' مِنْ «الْحُطَمَةِ» أَوْ خَبَرُ مُبْتَدَأٍ مَحْذُوفٍ تَقْدِيرُهُ: هِيَ.',
          },
        ],
      },
      {
        segment: 'ٱللَّهِ',
        analysisParts: [
          { type: 'text', text: 'لَفْظُ الْجَلَالَةِ: ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'ٱلْمُوقَدَةُ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          { type: 'text', text: ' لِـ«نَارُ» مَرْفُوعَةٌ بِالضَّمَّةِ.' },
        ],
      },
    ],
  },
  {
    id: '104-7',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 7,
    ayahText: 'ٱلَّتِى تَطَّلِعُ عَلَى ٱلْأَفْـِٔدَةِ',
    translationEn: 'Which mounts over the hearts.',
    rows: [
      {
        segment: 'ٱلَّتِى',
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ صِفَةٌ ثَانِيَةٌ لِـ«النَّارِ».' },
        ],
      },
      {
        segment: 'تَطَّلِعُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هِيَ.' },
        ],
      },
      {
        segment: 'عَلَى ٱلْأَفْـِٔدَةِ',
        analysisParts: [
          { type: 'text', text: 'جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِـ«تَطَّلِعُ». وَجُمْلَةُ «تَطَّلِعُ» صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },
  {
    id: '104-8',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 8,
    ayahText: 'إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌۭ',
    translationEn: 'Indeed, it is closed in upon them.',
    rows: [
      {
        segment: 'إِنَّهَا',
        analysisParts: [
          { type: 'link', text: 'إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' حَرْفُ تَوْكِيدٍ مُشَبَّهٌ بِالْفِعْلِ، وَ«هَا»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'اسْمُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'عَلَيْهِم',
        analysisParts: [
          { type: 'link', text: 'عَلَى', rule: 'harf-jarr' },
          {
            type: 'text',
            text: ' حَرْفُ جَرٍّ. وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ بِـ«عَلَى». وَ«الْمِيمُ»: لِلْجَمَاعَةِ. وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِخَبَرِ «إِنَّ».',
          },
        ],
      },
      {
        segment: 'مُّؤْصَدَةٌۭ',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text: 'وَجُمْلَةُ «إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '104-9',
    surah: 104,
    surahNameAr: 'الْهُمَزَةُ',
    ayah: 9,
    ayahText: 'فِى عَمَدٍۢ مُّمَدَّدَةٍۭ',
    translationEn: 'In extended columns.',
    rows: [
      {
        segment: 'فِى عَمَدٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِـ«مُؤْصَدَةٍ».',
          },
        ],
      },
      {
        segment: 'مُّمَدَّدَةٍۭ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          { type: 'text', text: ' لِـ«عَمَدٍ» مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا.' },
        ],
      },
    ],
  },
  {
    id: '102-1',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ أَلْهَىٰكُمُ ٱلتَّكَاثُرُ',
    translationEn: 'Competition diverts you.',
    rows: [
      {
        segment: 'أَلْهَىٰكُمُ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل ماض مبنيّ على الفتح المقدر على الألف للتعذّر، و "كم" ضمير متّصل مبنيّ على الضم في محلّ نصب مفعول به مقدم. و "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'ٱلتَّكَاثُرُ',
        analysisParts: [
          {
            type: 'text',
            text: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره. والجملة ابتدائية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '102-2',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 2,
    ayahText: 'حَتَّىٰ زُرْتُمُ ٱلْمَقَابِرَ',
    translationEn: 'Until you visit the graves.',
    rows: [
      {
        segment: 'حَتَّىٰ',
        analysisParts: [{ type: 'text', text: 'حرف ابتداء وغاية.' }],
      },
      {
        segment: 'زُرْتُمُ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل ماضٍ مبنيّ على السكون لاتصاله بضمير الرفع المتحرك. و "التاء": ضمير متّصل مبنيّ على الضم في محلّ رفع فاعل. و "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'ٱلْمَقَابِرَ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  {
    id: '103-1',
    surah: 103,
    surahNameAr: 'الْعَصْرِ',
    ayah: 1,
    ayahText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ وَالْعَصْرِ',
    translationEn: 'By time.',
    rows: [
      {
        segment: 'وَالْعَصْرِ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَالْعَصْرِ﴾: الواو: حرف جرّ للقسم. العصر: اسم مجرور بواو القسم وعلامة جره الكسرة، والجارّ والمجرور متعلّقان بفعل القسم المحذوف. وجملة القسم ابتدائية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '103-2',
    surah: 103,
    surahNameAr: 'الْعَصْرِ',
    ayah: 2,
    ayahText: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ',
    translationEn: 'Indeed mankind is in loss.',
    rows: [
      {
        segment: 'إِنَّ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿إِنَّ﴾: حرف توكيد مشبه بالفعل.',
          },
        ],
      },
      {
        segment: 'الْإِنْسَانَ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿الْإِنْسَانَ﴾: اسم "إنّ" منصوب وعلامة نصبه بالفتحة.',
          },
        ],
      },
      {
        segment: 'لَفِي خُسْرٍ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿لَفِي خُسْرٍ﴾: اللام: حرف للتوكيد.\nفي خسر: جارّ ومجرور متعلّقان بخبر "إن".\n﴿والجملة من "إنّ" مع اسمها وخبرها جواب قسم محذوف لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '103-3',
    surah: 103,
    surahNameAr: 'الْعَصْرِ',
    ayah: 3,
    ayahText: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    translationEn: 'Except those who believe, do righteous deeds, counsel one another to truth, and counsel one another to patience.',
    rows: [
      {
        segment: 'إِلَّا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿إِلَّا﴾: حرف استثناء.',
          },
        ],
      },
      {
        segment: 'الَّذِينَ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿الَّذِينَ﴾: اسم موصول مبنيّ على الفتح في محلّ نصب مستثني.',
          },
        ],
      },
      {
        segment: 'آمَنُوا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿آمَنُوا﴾: فعل ماضٍ مبنيّ على الضم، لاتصاله بواو الجماعة، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل، و"الألف": فارقة.',
          },
        ],
      },
      {
        segment: 'وَعَمِلُوا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَعَمِلُوا﴾: معطوفة بالواو على "آمنوا"، وتعرب إعرابها.',
          },
        ],
      },
      {
        segment: 'الصَّالِحَاتِ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿الصَّالِحَاتِ﴾: مفعول به منصوب بالكسرة بدلًا من الفتحة، لأنه جمع مؤنث سالم.',
          },
        ],
      },
      {
        segment: 'وَتَوَاصَوْا',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَتَوَاصَوْا﴾: الواو: حرف عطف. تواصوا: فعل ماض مبنيّ على الضمة المقدّرة على الألف المحذوفة لالتقاء الساكنين.',
          },
        ],
      },
      {
        segment: 'بِالْحَقِّ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿بِالْحَقِّ﴾: جارّ ومجرور متعلّقان بـ"تواصوا".',
          },
        ],
      },
      {
        segment: 'وَتَوَاصَوْا بِالصَّبْرِ',
        analysisParts: [
          {
            type: 'text',
            text: '﴿وَتَوَاصَوْا بِالصَّبْرِ﴾: معطوفة بالواو على "تواصوا بالحق"، وتعرب إعرابها. وجملة "آمنوا" لا محلّ لها من الإعراب، لأنها صلة الموصول. وجملة "عملوا" معطوفة على جملة "آمنوا" لا محلّ لها من الإعراب، وكذلك جملة "تواصوا" المكررة.',
          },
        ],
      },
    ],
  },
  {
    id: '111-3',
    surah: 111,
    surahNameAr: 'الْمَسَدِ',
    ayah: 3,
    ayahText: 'سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ',
    translationEn: 'He will [enter to] burn in a Fire of blazing flame.',
    rows: [
      {
        segment: 'سَيَصْلَىٰ',
        analysisParts: [
          { type: 'text', text: 'السين للاستقبال؛ ' },
          { type: 'link', text: 'مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مُسْتَتِرٌ' },
        ],
      },
      {
        segment: 'نَارًا',
        analysisParts: [{ type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' }],
      },
      {
        segment: 'ذَاتَ',
        analysisParts: [{ type: 'link', text: 'صفة', rule: 'naat' }],
      },
      {
        segment: 'لَهَبٍ',
        analysisParts: [{ type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' }],
      },
    ],
  },
  {
    id: '111-2',
    surah: 111,
    surahNameAr: 'الْمَسَدِ',
    ayah: 2,
    ayahText: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ',
    translationEn: 'His wealth will not avail him nor what he earned.',
    rows: [
      {
        segment: 'مَا',
        analysisParts: [{ type: 'link', text: 'نَافِيَةٌ', rule: 'verb-present-negation' }],
      },
      {
        segment: 'أَغْنَى',
        analysisParts: [{ type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' }],
      },
      {
        segment: 'عَنْهُ',
        analysisParts: [{ type: 'link', text: 'جار ومَجْرُورٌ', rule: 'harf-jarr' }, { type: 'text', text: ' مُتَعَلَّقَانِ بِالْفِعْلِ' }],
      },
      {
        segment: 'مَالُهُ',
        analysisParts: [{ type: 'link', text: 'فَاعِلٌ', rule: 'fael' }],
      },
      {
        segment: 'وَمَا',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ عاطفة', rule: 'atf' },
          { type: 'text', text: '؛ ' },
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَعْطُوفٌ عَلَى ماله' },
        ],
      },
      {
        segment: 'كَسَبَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مُسْتَتِرٌ؛ الجملة ' },
          { type: 'link', text: 'صلة', rule: 'silah-mawsul' },
        ],
      },
    ],
  },
  {
    id: '110-1',
    surah: 110,
    surahNameAr: 'النَّصْرِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ',
    translationEn: 'When the victory of Allah has come and the conquest.',
    rows: [
      {
        segment: 'إِذَا',
        analysisParts: [
          {
            type: 'text',
            text: 'ظَرْفٌ لِمَا يَسْتَقْبَلُ مِنَ الزَّمَانِ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ مَفْعُولٍ فِيهِ، مُتَضَمِّنٌ مَعْنَى الشَّرْطِ خَافِضٌ لِشَرْطِهِ مَنْصُوبٌ بِجَوَابِهِ؛ انظر ',
          },
          { type: 'link', text: 'حُرُوفُ الشَّرْطِ', rule: 'verb-present-conditional-particles' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'جَآءَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ؛ وَالْجُمْلَةُ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ لِظَرْفِ «إِذَا».' },
        ],
      },
      {
        segment: 'نَصْرُ',
        analysisParts: [
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ.' },
        ],
      },
      {
        segment: 'ٱللَّهِ',
        analysisParts: [
          { type: 'text', text: 'اسْمُ الْجَلَالَةِ ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ.' },
        ],
      },
      {
        segment: 'وَٱلْفَتْحُ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱلْفَتْحُ» مَعْطُوفٌ عَلَى «نَصْرُ» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ.' },
        ],
      },
    ],
  },
  {
    id: '110-2',
    surah: 110,
    surahNameAr: 'النَّصْرِ',
    ayah: 2,
    ayahText: 'وَرَأَيْتَ ٱلنَّاسَ يَدْخُلُونَ فِى دِينِ ٱللَّهِ أَفْوَاجًۭا',
    translationEn: 'And you see the people entering into the religion of Allah in multitudes.',
    rows: [
      {
        segment: 'وَرَأَيْتَ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«رَأَيْتَ» ' },
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِتَاءِ الْفَاعِلِ، وَ«تَاءُ الْفَاعِلِ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-verbs' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: '؛ وَجُمْلَةُ «رَأَيْتَ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «جَاءَ» فِي مَحَلِّ جَرٍّ.' },
        ],
      },
      {
        segment: 'ٱلنَّاسَ',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ.' },
        ],
      },
      {
        segment: 'يَدْخُلُونَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ ' },
          { type: 'link', text: 'ثُبُوتُ النُّونِ', rule: 'irab-raf-noon' },
          { type: 'text', text: ' لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ، وَ«وَاوُ الْجَمَاعَةِ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-verbs' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          {
            type: 'text',
            text: '؛ وَالْجُمْلَةُ الْفِعْلِيَّةُ فِي مَحَلِّ نَصْبٍ حَالًا لِـ«ٱلنَّاسَ» أَوْ فِي مَحَلِّ نَصْبٍ مَفْعُولَ بِهٍ ثَانِيًا لِـ«رَأَيْتَ».',
          },
        ],
      },
      {
        segment: 'فِى',
        analysisParts: [{ type: 'link', text: 'فِي', rule: 'harf-jarr' }, { type: 'text', text: ' حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ.' }],
      },
      {
        segment: 'دِينِ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ؛ وَ«فِى دِينِ» جَارٌ وَمَجْرُورٌ مُتَعَلِّقَانِ بِ«يَدْخُلُونَ».',
          },
        ],
      },
      {
        segment: 'ٱللَّهِ',
        analysisParts: [
          { type: 'text', text: 'اسْمُ الْجَلَالَةِ ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ.' },
        ],
      },
      {
        segment: 'أَفْوَاجًۭا',
        analysisParts: [
          { type: 'link', text: 'حَالٌ', rule: 'tawabi' },
          { type: 'text', text: ' مَنْصُوبٌ بِالْفَتْحَةِ الظَّاهِرَةِ.' },
        ],
      },
    ],
  },
  {
    id: '110-3',
    surah: 110,
    surahNameAr: 'النَّصْرِ',
    ayah: 3,
    ayahText: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَٱسْتَغْفِرْهُ ۚ إِنَّهُۥ كَانَ تَوَّابًۢا',
    translationEn: 'Then glorify with praise of your Lord and ask His forgiveness. Indeed, He is ever Accepting of repentance.',
    rows: [
      {
        segment: 'فَسَبِّحْ',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'harf-maani' },
          { type: 'text', text: ' حَرْفٌ وَاقِعٌ فِي جَوَابِ «إِذَا» مَبْنِيٌّ عَلَى الْفَتْحِ؛ وَ«سَبِّحْ» ' },
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ وُجُوبًا تَقْدِيرُهُ «أَنْتَ»؛ وَجُمْلَةُ «سَبِّحْ» لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ لِأَنَّهَا جَوَابُ شَرْطٍ غَيْرُ جَازِمٍ.' },
        ],
      },
      {
        segment: 'بِحَمْدِ',
        analysisParts: [
          { type: 'link', text: 'الْبَاءُ', rule: 'harf-jarr' },
          {
            type: 'text',
            text: ' حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ، و«حَمْدِ» اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ؛ وَ«بِحَمْدِ» جَارٌ وَمَجْرُورٌ مُتَعَلِّقَانِ بِ«سَبِّحْ» أَوْ بِحَالٍ تَقْدِيرُهَا حَامِدًا.',
          },
        ],
      },
      {
        segment: 'رَبِّكَ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، و«كَافُ الْمُخَاطَبِ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ.' },
        ],
      },
      {
        segment: 'وَٱسْتَغْفِرْهُ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱسْتَغْفِرْ» مَعْطُوفَةٌ عَلَى «سَبِّحْ» وَتُعْرَبُ إِعْرَابَهَا؛ ' },
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبِ ' },
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: '، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»؛ وَجُمْلَةُ «ٱسْتَغْفِرْ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «سَبِّحْ» لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
      {
        segment: 'إِنَّهُۥ',
        analysisParts: [
          { type: 'link', text: 'إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' حَرْفُ تَوْكِيدٍ مُشَبَّهٌ بِالْفِعْلِ، وَ«هَاءُ الْغَائِبِ» ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبِ ' },
          { type: 'link', text: 'اسْمُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'كَانَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ ناقص', rule: 'kaana-sisters' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَاسْمُ كَانَ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ».' },
        ],
      },
      {
        segment: 'تَوَّابًۢا',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ كَانَ', rule: 'kaana-sisters' },
          {
            type: 'text',
            text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ؛ وَجُمْلَةُ «كَانَ تَوَّابًا» فِي مَحَلِّ رَفْعٍ خَبَرُ «إِنَّ»؛ وَجُمْلَةُ «إِنَّهُ كَانَ تَوَّابًا» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },

  {
    id: '105-1',
    surah: 105,
    surahNameAr: 'الْفِيلِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَٰبِ ٱلْفِيلِ',
    translationEn: 'Have you not seen how your Lord dealt with the companions of the elephant?',
    rows: [
      {
        segment: 'أَلَمْ',
        analysisParts: [
          {
            type: 'text',
            text: 'الهمزة: حرف استفهام.\nلم: حرف نفي وجزم وقلب.',
          },
        ],
      },
      {
        segment: 'تَرَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع مجزوم بـ"لم"، وعلامة جزمه حذف حرف العلة، والفاعل ضمير مستتر فيه وجوبًا تقديره: أنت.',
          },
        ],
      },
      {
        segment: 'كَيْفَ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم استفهام مبني على الفتح في محلّ نصب حال.',
          },
        ],
      },
      {
        segment: 'فَعَلَ',
        analysisParts: [{ type: 'text', text: 'فعل ماض مبني على الفتح.' }],
      },
      {
        segment: 'رَبُّكَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.\nو "الكاف": ضمير متّصل مبنيّ في محلّ جرّ بالإضافة.',
          },
        ],
      },
      {
        segment: 'بِأَصْحَٰبِ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بـ"فعل".',
          },
        ],
      },
      {
        segment: 'ٱلْفِيلِ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره.\nوجملة "تر" ابتدائية لا محلّ لها من الإعراب.\nوجملة "كيف فعل" في محلّ نصب مفعول به للفعل "تَرَ".',
          },
        ],
      },
    ],
  },
  {
    id: '105-2',
    surah: 105,
    surahNameAr: 'الْفِيلِ',
    ayah: 2,
    ayahText: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍۢ',
    translationEn: 'Did He not make their plot into confusion?',
    rows: [
      {
        segment: 'أَلَمْ',
        analysisParts: [
          { type: 'link', text: 'هَمْزَةُ الِاسْتِفْهَامِ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' حَرْفُ اسْتِفْهَامٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ' },
          { type: 'link', text: 'لم', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ مَبْنِيٌّ عَلَى السُّكُونِ.' },
        ],
      },
      {
        segment: 'يَجْعَلْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'مَجْزُومٌ', rule: 'irab-jazm' },
          { type: 'text', text: ' وَعَلَامَةُ جَزْمِهِ سُكُونُ آخِرِهِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ».' },
        ],
      },
      {
        segment: 'كَيْدَهُمْ',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ، وَ«هَاءُ الْغَائِبِ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: '، و«الميم» لِجَمْعِ الْعَاقِلِ.' },
        ],
      },
      {
        segment: 'فِى',
        analysisParts: [{ type: 'link', text: 'فِي', rule: 'harf-jarr' }, { type: 'text', text: ' حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ.' }],
      },
      {
        segment: 'تَضْلِيلٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ؛ وَ«فِى تَضْلِيلٍ» جَارٌ وَمَجْرُورٌ مُتَعَلِّقَانِ بِ«يَجْعَلْ»، وَهُوَ فِي مَقَامِ الْمَفْعُولِ الثَّانِي لِـ«يَجْعَلْ»؛ وَجُمْلَةُ «يَجْعَلْ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '105-3',
    surah: 105,
    surahNameAr: 'الْفِيلِ',
    ayah: 3,
    ayahText: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ',
    translationEn: 'And He sent against them birds in flocks.',
    rows: [
      {
        segment: 'وَأَرْسَلَ',
        analysisParts: [
          {
            type: 'text',
            text: 'الواو: حرف عطف.\nأرسل: فعل ماضٍ مبنيّ على الفتحة، وفاعله ضمير مستتر فيه جوازًا تقديره: هو.',
          },
        ],
      },
      {
        segment: 'عَلَيْهِمْ',
        analysisParts: [
          {
            type: 'text',
            text: 'على: حرف جر، و "الهاء": ضمير متّصل مبنيّ في محلّ جرّ بـ"على"، و "الميم": للجماعة.\nوالجارّ والمجرور متعلّقان بـ"أرسل".',
          },
        ],
      },
      {
        segment: 'طَيْرًا',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'أَبَابِيلَ',
        analysisParts: [
          {
            type: 'text',
            text: 'صفة لـ"طيرًا" منصوبة بالفتحة.\nوجملة "أرسل" معطوفة على جملة "يجعل" لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '105-4',
    surah: 105,
    surahNameAr: 'الْفِيلِ',
    ayah: 4,
    ayahText: 'تَرْمِيهِم بِحِجَارَةٍۢ مِّن سِجِّيلٍۢ',
    translationEn: 'Striking them with stones of baked clay.',
    rows: [
      {
        segment: 'تَرْمِيهِم',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع مرفوع بالضمة المقدّرة على "الياء" للثقل، والفاعل ضمير مستتر فيه جوازًا تقديره: هي يعود على "طيرًا".\nو "الهاء": ضمير متصل مبنيّ في محلّ نصب مفعول به.\nو "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'بِحِجَارَةٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بـ"ترميهم".',
          },
        ],
      },
      {
        segment: 'مِّن',
        analysisParts: [{ type: 'text', text: 'حرف جر.' }],
      },
      {
        segment: 'سِجِّيلٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم مجرور بـ"من"، وعلامة جره الكسرة، والجارّ والمجرور متعلّقان بصفة محذوفة لـ"حجارة".\nوجملة "ترميهم" في محلّ نصب صفة ثانية لِـ"طيرًا".',
          },
        ],
      },
    ],
  },
  {
    id: '105-5',
    surah: 105,
    surahNameAr: 'الْفِيلِ',
    ayah: 5,
    ayahText: 'فَجَعَلَهُمْ كَعَصْفٍۢ مَّأْكُولٍۭ',
    translationEn: 'And He made them like eaten straw.',
    rows: [
      {
        segment: 'فَجَعَلَهُمْ',
        analysisParts: [
          {
            type: 'text',
            text: 'معطوفة بالفاء على "أرسل"، وتعرب إعرابها، وهو : « أرسل: فعل ماضٍ مبنيّ على الفتحة، وفاعله ضمير مستتر فيه جوازًا تقديره: هو».\nو "الهاء": ضمير متّصل مبنيّ في محلّ نصب مفعول به أول.\nو "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'كَعَصْفٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'الكاف: اسم بمعنى "مثل" مبنيّ على الفتح في محلّ نصب مفعول به ثانٍ، وهو مضاف.\nعصف: مضاف إليه مجرور بالإضافة وعلامة جره الكسرة.',
          },
        ],
      },
      {
        segment: 'مَّأْكُولٍۭ',
        analysisParts: [
          {
            type: 'text',
            text: 'صفة لـ"عصف" مجرورة وعلامة جرها الكسرة الظاهرة على آخرها.',
          },
        ],
      },
    ],
  },

  /* —— سُورَةُ الزَّلْزَلَةِ (٩٩) —— */
  {
    id: '99-1',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 1,
    ayahText: 'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا',
    translationEn: 'When the earth is shaken with its [final] earthquake.',
    rows: [
      {
        segment: 'إِذَا زُلْزِلَتِ',
        analysisParts: [
          { type: 'link', text: 'إذَا', rule: 'verb-present-conditional-particles' },
          { type: 'text', text: ' ظرفِية شرطية غير جازمة؛ ' },
          { type: 'link', text: 'مَاضٍ مَبْنِيٌّ لِلْمَجْهُولِ', rule: 'verb-past-passive' },
        ],
      },
      {
        segment: 'الْأَرْضُ',
        analysisParts: [{ type: 'link', text: 'نَائِبُ فَاعِلٍ', rule: 'verb-passive-overview' }],
      },
      {
        segment: 'زِلْزَالَهَا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ مُطْلَقٌ', rule: 'mafool' },
          { type: 'text', text: '؛ وَالْجُمْلَةُ ' },
          { type: 'link', text: 'فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ', rule: 'idafah' },
        ],
      },
    ],
  },
  {
    id: '99-2',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 2,
    ayahText: 'وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا',
    translationEn: 'And the earth throws out its burdens.',
    rows: [
      {
        segment: 'وَ',
        analysisParts: [{ type: 'link', text: 'حَرْفُ عَطْفٍ', rule: 'atf' }],
      },
      {
        segment: 'أَخْرَجَتِ',
        analysisParts: [{ type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' }],
      },
      {
        segment: 'الْأَرْضُ',
        analysisParts: [{ type: 'link', text: 'فَاعِلٌ', rule: 'fael' }],
      },
      {
        segment: 'أَثْقَالَهَا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: '؛ وَالْجُمْلَةُ الْفِعْلِيَّةُ ' },
          { type: 'link', text: 'مَعْطُوفٌة', rule: 'atf' },
          { type: 'text', text: ' عَلَى مَا قَبْلَهَا' },
        ],
      },
    ],
  },
  {
    id: '99-4',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 4,
    ayahText: 'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا',
    translationEn: 'That Day it will report its news.',
    rows: [
      {
        segment: 'يَوْمَئِذٍ',
        analysisParts: [
          { type: 'link', text: 'ظرف', rule: 'sentence-structure' },
          { type: 'text', text: ' مُضَافٌ إلى مثله؛ وهو ' },
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          { type: 'text', text: ' مِنْ إذا' },
        ],
      },
      {
        segment: 'تُحَدِّثُ',
        analysisParts: [
          { type: 'link', text: 'مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: 'ه مُسْتَتِرٌ' },
        ],
      },
      {
        segment: 'أَخْبَارَهَا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: '؛ وَالْجُمْلَةُ جواب إذا لَا مَحَلَّ لَهَا — انظر ' },
          { type: 'link', text: 'حُرُوفُ الشَّرْطِ', rule: 'verb-present-conditional-particles' },
        ],
      },
    ],
  },
  {
    id: '99-5',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 5,
    ayahText: 'بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا',
    translationEn: 'Because your Lord has inspired it.',
    rows: [
      {
        segment: 'بِأَنَّ رَبَّكَ',
        analysisParts: [
          { type: 'link', text: 'الْبَاءُ', rule: 'harf-jarr' },
          { type: 'text', text: ' حَرْفُ جَرٍّ؛ ' },
          { type: 'link', text: 'أَنَّ واسمها', rule: 'inna-sisters' },
        ],
      },
      {
        segment: 'أَوْحَىٰ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مُسْتَتِرٌ' },
        ],
      },
      {
        segment: 'لَهَا',
        analysisParts: [
          { type: 'text', text: 'الجملة ' },
          { type: 'link', text: 'خَبَرُ أَنَّ', rule: 'inna-sisters' },
          { type: 'text', text: '؛ المصدر المؤول مِنْ أَنَّ وما بعدها فِي مَحَلِّ جَرٍّ بالْبَاءُ؛ ' },
          { type: 'link', text: 'جار ومَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' متعلقان بتحدث' },
        ],
      },
    ],
  },
  {
    id: '99-6',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 6,
    ayahText: 'يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ',
    translationEn: 'That Day people will depart separated, to be shown their deeds.',
    rows: [
      {
        segment: 'يَوْمَئِذٍ',
        analysisParts: [
          { type: 'link', text: 'ظرف', rule: 'sentence-structure' },
          { type: 'text', text: ' مُضَافٌ إلى مثله؛ ' },
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          { type: 'text', text: ' مِنْ سابقه' },
        ],
      },
      {
        segment: 'يَصْدُرُ النَّاسُ',
        analysisParts: [
          { type: 'link', text: 'مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' و' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
        ],
      },
      {
        segment: 'أَشْتَاتًا',
        analysisParts: [{ type: 'link', text: 'حَالٌ', rule: 'tawabi' }],
      },
      {
        segment: 'لِيُرَوْا',
        analysisParts: [
          { type: 'link', text: 'مُضَارِعٌ مَبْنِيٌّ لِلْمَجْهُولِ', rule: 'verb-present-passive' },
          { type: 'text', text: ' مَنْصُوبٌ بأَنَّ مضمرة بعد ' },
          { type: 'link', text: 'لام التعليل', rule: 'verb-present-nasb-particles' },
          { type: 'text', text: '؛ الْوَاوُ ' },
          { type: 'link', text: 'نَائِبُ فَاعِلٍ', rule: 'verb-passive-overview' },
        ],
      },
      {
        segment: 'أَعْمَالَهُمْ',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: '؛ والمصدر المؤول مِنْ أَنَّ وما بعدها فِي مَحَلِّ جَرٍّ بِاللَّامِ؛ الجار والمَجْرُورٌ متعلقان بيصدر' },
        ],
      },
    ],
  },
  {
    id: '99-7',
    surah: 99,
    surahNameAr: 'الزَّلْزَلَةُ',
    ayah: 7,
    ayahText: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
    translationEn: 'So whoever does an atom’s weight of good will see it.',
    rows: [
      {
        segment: 'فَمَن',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'harf-maani' },
          { type: 'text', text: ' حَرْفُ اسْتِئْنَافٍ؛ ' },
          { type: 'link', text: 'مَن', rule: 'relative-nouns' },
          { type: 'text', text: ' اسم شرط جازم ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
        ],
      },
      {
        segment: 'يَعْمَلْ',
        analysisParts: [
          { type: 'link', text: 'مُضَارِعٌ مَجْزُومٌ', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' لِأَنَّهُ فعل الشرط؛ ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مُسْتَتِرٌ' },
        ],
      },
      {
        segment: 'مِثْقَالَ ذَرَّةٍ',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
        ],
      },
      {
        segment: 'خَيْرًا',
        analysisParts: [{ type: 'link', text: 'تَمْيِيزٌ', rule: 'mafool' }],
      },
      {
        segment: 'يَرَهُ',
        analysisParts: [
          { type: 'link', text: 'مُضَارِعٌ مَجْزُومٌ', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' لِأَنَّهُ جَوَابُ الشَّرْطِ؛ الهاء ' },
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: '؛ وَالْفَاعِلُ مُسْتَتِرٌ؛ الجملة جَوَابُ الشَّرْطِ لَا مَحَلَّ لَهَا؛ جملتا الشرط والجواب خَبَرِ الْمُبْتَدَأِ' },
        ],
      },
    ],
  },

  /* —— سُورَةُ الْعَادِيَاتِ (١٠٠) —— */
  {
    id: '100-1',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 1,
    ayahText: 'وَالْعَادِيَاتِ ضَبْحًا',
    translationEn: 'By the chargers, snorting.',
    rows: [
      {
        segment: 'وَالْعَادِيَاتِ',
        analysisParts: [
          { type: 'text', text: 'الْوَاوُ: ' },
          { type: 'link', text: 'حَرْفُ جَرٍّ لِلْقَسَمِ', rule: 'harf-jarr' },
          { type: 'text', text: '؛ الْعَادِيَاتُ: اسْمٌ مَجْرُورٌ بِوَاوِ الْقَسَمِ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِفِعْلِ الْقَسَمِ الْمَحْذُوفِ. وَجُمْلَةُ الْقَسَمِ ابْتِدَائِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
      {
        segment: 'ضَبْحًا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ مُطْلَقٌ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ بِفِعْلٍ مُضْمَرٍ تَقْدِيرُهُ: «يَضْبَحْنَ». وَجُمْلَةُ «يَضْبَحْنَ ضَبْحًا» فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'حَالٌ', rule: 'tawabi' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  },
  {
    id: '100-2',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 2,
    ayahText: 'فَالْمُورِيَاتِ قَدْحًا',
    translationEn: 'And the chargers, striking sparks.',
    rows: [
      {
        segment: 'فَالْمُورِيَاتِ',
        analysisParts: [
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          { type: 'text', text: ' بِالْفَاءِ عَلَى الْآيَةِ السَّابِقَةِ، وَتُعْرَبُ إِعْرَابَهَا. وَهُوَ: «وَالْعَادِيَاتِ: الْوَاوُ: حَرْفُ جَرٍّ لِلْقَسَمِ؛ الْعَادِيَاتُ: اسْمٌ مَجْرُورٌ بِوَاوِ الْقَسَمِ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِفِعْلِ الْقَسَمِ الْمَحْذُوفِ. وَجُمْلَةُ الْقَسَمِ ابْتِدَائِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ. ضَبْحًا: مَفْعُولٌ مُطْلَقٌ مَنْصُوبٌ بِفِعْلٍ مُضْمَرٍ تَقْدِيرُهُ: يَضْبَحْنَ. وَجُمْلَةُ يَضْبَحْنَ ضَبْحًا فِي مَحَلِّ نَصْبٍ حَالٍ».' },
        ],
      },
      {
        segment: 'قَدْحًا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ مُطْلَقٌ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ بِفِعْلٍ مُضْمَرٍ تَقْدِيرُهُ: «يَقْدَحْنَ». وَجُمْلَةُ «يَقْدَحْنَ قَدْحًا» فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'حَالٌ', rule: 'tawabi' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  },
  {
    id: '100-3',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 3,
    ayahText: 'فَالْمُغِيرَاتِ صُبْحًا',
    translationEn: 'And the chargers at dawn, raiding.',
    rows: [
      {
        segment: 'فَالْمُغِيرَاتِ',
        analysisParts: [
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          { type: 'text', text: ' بِالْفَاءِ عَلَى «الْعَادِيَاتِ»، وَتُعْرَبُ إِعْرَابَهَا. وَهُوَ: «وَالْعَادِيَاتِ: الْوَاوُ: حَرْفُ جَرٍّ لِلْقَسَمِ؛ الْعَادِيَاتُ: اسْمٌ مَجْرُورٌ بِوَاوِ الْقَسَمِ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِفِعْلِ الْقَسَمِ الْمَحْذُوفِ. وَجُمْلَةُ الْقَسَمِ ابْتِدَائِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ».' },
        ],
      },
      {
        segment: 'صُبْحًا',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ زَمَانٍ', rule: 'sentence-structure' },
          { type: 'text', text: ' مَنْصُوبٌ بِالْفَتْحَةِ مُتَعَلِّقٌ بِفِعْلٍ مُضْمَرٍ، وَالتَّقْدِيرُ: فَأَغِرْنَ.' },
        ],
      },
    ],
  },
  {
    id: '100-4',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 4,
    ayahText: 'فَأَثَرْنَ بِهِ نَقْعًا',
    translationEn: 'And raise thereupon a trail of dust.',
    rows: [
      {
        segment: 'فَأَثَرْنَ',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'atf' },
          { type: 'text', text: ': حَرْفُ عَطْفٍ. أَثَرْنَ: ' },
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِنُونِ الْإِنَاثِ، وَ«النُّونُ» ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعٍ ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'بِهِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِ«أَثَرْنَ».' },
        ],
      },
      {
        segment: 'نَقْعًا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَجُمْلَةُ «أَثَرْنَ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «يَضْبَحْنَ ضَبْحًا» فِي الْآيَةِ الْأُولَىٰ فِي مَحَلِّ نَصْبٍ.' },
        ],
      },
    ],
  },
  {
    id: '100-5',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 5,
    ayahText: 'فَوَسَطْنَ بِهِ جَمْعًا',
    translationEn: 'And penetrate thereby a company.',
    rows: [
      {
        segment: 'فَوَسَطْنَ',
        analysisParts: [
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          { type: 'text', text: ' بِالْفَاءِ عَلَى الْآيَةِ السَّابِقَةِ، وَتُعْرَبُ إِعْرَابَهَا. وَهُوَ: «فَأَثَرْنَ: الْفَاءُ: حَرْفُ عَطْفٍ. أَثَرْنَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِنُونِ الْإِنَاثِ، وَ«النُّونُ» ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعٍ فَاعِلٍ. بِهِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِ«أَثَرْنَ». نَقْعًا: مَفْعُولٌ بِهٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَجُمْلَةُ «أَثَرْنَ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «يَضْبَحْنَ ضَبْحًا» فِي الْآيَةِ الْأُولَىٰ فِي مَحَلِّ نَصْبٍ».' },
        ],
      },
      {
        segment: 'بِهِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِ«وَسَطْنَ».' },
        ],
      },
      {
        segment: 'جَمْعًا',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَجُمْلَةُ «وَسَطْنَ» مَعْطُوفَةٌ عَلَى مَا قَبْلَهَا فِي مَحَلِّ نَصْبٍ.' },
        ],
      },
    ],
  },
  {
    id: '100-6',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 6,
    ayahText: 'إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ',
    translationEn: 'Indeed mankind, to his Lord, is ungrateful.',
    rows: [
      {
        segment: 'إِنَّ',
        analysisParts: [
          { type: 'link', text: 'إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ': حَرْفُ تَوْكِيدٍ مُشْبَهٌ بِالْفِعْلِ.' },
        ],
      },
      {
        segment: 'الْإِنْسَانَ',
        analysisParts: [
          { type: 'text', text: 'اسْمُ «إِنَّ» مَنْصُوبٌ بِالْفَتْحَةِ.' },
        ],
      },
      {
        segment: 'لِرَبِّهِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِالْخَبَرِ «كَنُودٌ»، وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ ' },
          { type: 'link', text: 'بِالْإِضَافَةِ', rule: 'idafah' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'لَكَنُودٌ',
        analysisParts: [
          { type: 'text', text: 'اللَّامُ: حَرْفٌ لِلتَّوْكِيدِ. كَنُودٌ: ' },
          { type: 'link', text: 'خَبَرُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَالْجُمْلَةُ مِنْ «إِنَّ» مَعَ اسْمِهَا وَخَبَرِهَا لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ، لِأَنَّهَا جَوَابُ الْقَسَمِ.' },
        ],
      },
    ],
  },
  {
    id: '100-7',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 7,
    ayahText: 'وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ',
    translationEn: 'And indeed he is, to that, a witness.',
    rows: [
      {
        segment: 'وَإِنَّهُ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ': حَرْفُ عَطْفٍ. إِنَّ: حَرْفُ تَوْكِيدٍ وَنَصْبٍ. وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ اسْمُ «إِنَّ».' },
        ],
      },
      {
        segment: 'عَلَىٰ ذَٰلِكَ',
        analysisParts: [
          { type: 'link', text: 'عَلَىٰ', rule: 'harf-jarr' },
          { type: 'text', text: ': حَرْفُ جَرٍّ. ذَلِكَ: ذَا: ' },
          { type: 'link', text: 'اسْمُ إِشَارَةٍ', rule: 'demonstratives' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِ«عَلَىٰ»، وَ«اللَّامُ»: حَرْفُ اللُّبْعُدِ، وَ«الْكَافُ»: حَرْفٌ لِلْخِطَابِ. وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِ«شَهِيدٍ».' },
        ],
      },
      {
        segment: 'لَشَهِيدٌ',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَالْجُمْلَةُ مَعْطُوفَةٌ عَلَى الْجُمْلَةِ السَّابِقَةِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },
  {
    id: '100-8',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 8,
    ayahText: 'وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ',
    translationEn: 'And indeed he is intense in love of wealth.',
    rows: [
      {
        segment: 'وَإِنَّهُ',
        analysisParts: [
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          { type: 'text', text: ' بِالْوَاوِ عَلَى الْآيَةِ السَّادِسَةِ، وَتُعْرَبُ إِعْرَابَهَا. وَهُوَ: «إِنَّ: حَرْفُ تَوْكِيدٍ مُشْبَهٌ بِالْفِعْلِ. الْإِنْسَانَ: اسْمُ «إِنَّ» مَنْصُوبٌ بِالْفَتْحَةِ. لِرَبِّهِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِالْخَبَرِ «كَنُودٌ»، وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. لَكَنُودٌ: اللَّامُ: حَرْفٌ لِلتَّوْكِيدِ. كَنُودٌ: خَبَرُ «إِنَّ» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَالْجُمْلَةُ مِنْ «إِنَّ» مَعَ اسْمِهَا وَخَبَرِهَا لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ، لِأَنَّهَا جَوَابُ الْقَسَمِ».' },
        ],
      },
      {
        segment: 'لِحُبِّ الْخَيْرِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِ«شَدِيدٍ»؛ «الْخَيْرُ»: ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'لَشَدِيدٌ',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَالْجُمْلَةُ مَعْطُوفَةٌ عَلَى مَا قَبْلَهَا لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },
  {
    id: '100-9',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 9,
    ayahText: 'أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ',
    translationEn: 'Then does he not know when what is in the graves is scattered?',
    rows: [
      {
        segment: 'أَفَلَا',
        analysisParts: [
          { type: 'link', text: 'الْهَمْزَةُ', rule: 'interrogative-nouns' },
          { type: 'text', text: ': حَرْفُ اسْتِفْهَامٍ. وَالْفَاءُ: حَرْفُ اسْتِئْنَافٍ. لَا: حَرْفُ نَفْيٍ لَا عَمَلَ لَهُ.' },
        ],
      },
      {
        segment: 'يَعْلَمُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ: هُوَ.' },
        ],
      },
      {
        segment: 'إِذَا',
        analysisParts: [
          { type: 'text', text: 'ظَرْفُ لِمَا يَسْتَقْبِلُ مِنَ الزَّمَنِ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ مَفْعُولٍ فِيهِ، مُتَعَلِّقٌ بِجَوَابِهِ مُتَضَمِّنٌ مَعْنَى الشَّرْطِ.' },
        ],
      },
      {
        segment: 'بُعْثِرَ',
        analysisParts: [{ type: 'link', text: 'فِعْلٌ مَاضٍ لِلْمَجْهُولِ', rule: 'verb-past-passive' }, { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ.' }],
      },
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ مَوْصُولٍ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ نَائِبِ فَاعِلٍ.' },
        ],
      },
      {
        segment: 'فِي الْقُبُورِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِصِلَةِ الْمَوْصُولِ الْمَحْذُوفَةِ، وَالتَّقْدِيرُ: مَا اسْتَقَرَّ فِي الْقُبُورِ. وَجُمْلَةُ اسْتَقَرَّ فِي الْقُبُورِ ' },
          { type: 'link', text: 'صِلَةُ الْمَوْصُولِ', rule: 'silah-mawsul' },
          { type: 'text', text: ' لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ. وَجُمْلَةُ «يَعْلَمُ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ. وَجُمْلَةُ «بُعْثِرَ» فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَالْجُمْلَةُ الشَّرْطِيَّةُ سَدَّتْ مَسَدَّ مَفْعُولَيْ «يَعْلَمُ».' },
        ],
      },
    ],
  },
  {
    id: '100-10',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 10,
    ayahText: 'وَحُصِّلَ مَا فِي الصُّدُورِ',
    translationEn: 'And that which is in the breasts is extracted.',
    rows: [
      {
        segment: 'وَحُصِّلَ',
        analysisParts: [
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          { type: 'text', text: ' بِالْوَاوِ عَلَى الْآيَةِ السَّابِقَةِ، وَتُعْرَبُ إِعْرَابَهَا. وَهُوَ: «بُعْثِرَ: فِعْلٌ مَاضٍ لِلْمَجْهُولِ مَبْنِيٌّ عَلَى الْفَتْحِ. مَا: اسْمُ مَوْصُولٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ نَائِبِ فَاعِلٍ. فِي الْقُبُورِ: جَارٌّ وَمَجْرُورٌ مُتَعَلِّقَانِ بِصِلَةِ الْمَوْصُولِ الْمَحْذُوفَةِ، وَالتَّقْدِيرُ: مَا اسْتَقَرَّ فِي الْقُبُورِ. وَجُمْلَةُ اسْتَقَرَّ فِي الْقُبُورِ صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ». وَحُصِّلَ: فِعْلٌ مَاضٍ لِلْمَجْهُولِ مَبْنِيٌّ عَلَى الْفَتْحِ.' },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ مَوْصُولٍ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ نَائِبِ فَاعِلٍ.' },
        ],
      },
      {
        segment: 'فِي الصُّدُورِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِصِلَةِ الْمَوْصُولِ الْمَحْذُوفَةِ، وَالتَّقْدِيرُ: مَا اسْتَقَرَّ فِي الصُّدُورِ. وَجُمْلَةُ اسْتَقَرَّ فِي الصُّدُورِ ' },
          { type: 'link', text: 'صِلَةُ الْمَوْصُولِ', rule: 'silah-mawsul' },
          { type: 'text', text: ' لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ. وَالْجُمْلَةُ مَعْطُوفَةٌ عَلَى مَا قَبْلَهَا.' },
        ],
      },
    ],
  },
  {
    id: '100-11',
    surah: 100,
    surahNameAr: 'الْعَادِيَاتِ',
    ayah: 11,
    ayahText: 'إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ',
    translationEn: 'Indeed their Lord, that Day, is fully Aware of them.',
    rows: [
      {
        segment: 'إِنَّ',
        analysisParts: [
          { type: 'link', text: 'إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ': حَرْفُ تَوْكِيدٍ مُشْبَهٌ بِالْفِعْلِ.' },
        ],
      },
      {
        segment: 'رَبَّهُمْ',
        analysisParts: [
          { type: 'text', text: 'رَبٌّ: اسْمُ «إِنَّ» مَنْصُوبٌ بِالْفَتْحَةِ، وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَ«الْمِيمُ»: لِلْجَمَاعَةِ.' },
        ],
      },
      {
        segment: 'بِهِمْ',
        analysisParts: [
          { type: 'link', text: 'بِ', rule: 'harf-jarr' },
          { type: 'text', text: ': حَرْفُ جَرٍّ. وَ«الْهَاءُ»: ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ بِالْبَاءِ، وَ«الْمِيمُ»: لِلْجَمَاعَةِ. وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِخَبَرِ «إِنَّ».' },
        ],
      },
      {
        segment: 'يَوْمَئِذٍ',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ زَمَانٍ', rule: 'sentence-structure' },
          { type: 'text', text: ' مَنْصُوبٌ بِالْفَتْحَةِ وَهُوَ مُضَافٌ. وَ«إِذٌ» اسْمٌ مَبْنِيٌّ عَلَى السُّكُونِ وَقَدْ حُرِّكَ بِالْكَسْرِ تَخَلُّصًا مِنْ تَلَاقِي السَّاكِنَيْنِ (سُكُونُهُ سُكُونُ التَّنْوِينِ) وَهُوَ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَالْجُمْلَةُ الْمَحْذُوفَةُ الْمُعَوَّضُ عَنْهَا بِالتَّنْوِينِ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَالتَّقْدِيرُ: يَوْمَئِذٍ يَبْعَثِرُ مَا فِي الْقُبُورِ وَيَحْصُلُ مَا فِي الصُّدُورِ.' },
        ],
      },
      {
        segment: 'لَّخَبِيرٌ',
        analysisParts: [
          { type: 'text', text: 'اللَّامُ: حَرْفٌ لِلتَّوْكِيدِ. خَبِيرٌ: ' },
          { type: 'link', text: 'خَبَرُ إِنَّ', rule: 'inna-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَجُمْلَةُ «إِنَّ رَبَّهُمْ يَوْمَئِذٍ لَخَبِيرٌ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },

  /* —— سُورَةُ الْقَارِعَةِ (١٠١) —— */
  {
    id: '101-1',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلْقَارِعَةُ',
    translationEn: 'In the name of Allah, the Most Merciful, the Most Compassionate. The Striking Calamity.',
    rows: [
      {
        segment: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        analysisParts: [{ type: 'text', text: 'تَسْمِيَةٌ (بَسْمَلَةٌ).' }],
      },
      {
        segment: 'ٱلْقَارِعَةُ',
        analysisParts: [
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
        ],
      },
    ],
  },
  {
    id: '101-2',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 2,
    ayahText: 'مَا ٱلْقَارِعَةُ',
    translationEn: 'What is the Striking Calamity?',
    rows: [
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'ٱلْقَارِعَةُ',
        analysisParts: [
          { type: 'link', text: 'خَبَرٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' لِـ«مَا» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
          {
            type: 'text',
            text: ' وَجُمْلَةُ «الْقَارِعَةُ مَا الْقَارِعَةُ» لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ؛ لِأَنَّهَا ابْتِدَائِيَّةٌ. وَجُمْلَةُ «مَا الْقَارِعَةُ» فِي مَحَلِّ رَفْعِ خَبَرِ الْمُبْتَدَأِ «الْقَارِعَةُ» (الْأَوَّلُ).',
          },
        ],
      },
    ],
  },
  {
    id: '101-3',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 3,
    ayahText: 'وَمَآ أَدْرَىٰكَ مَا ٱلْقَارِعَةُ',
    translationEn: 'And what can make you know what is the Striking Calamity?',
    rows: [
      {
        segment: 'وَمَآ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«مَا» ' },
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'أَدْرَىٰكَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحَةِ الْمُقَدَّرَةِ عَلَى الْأَلِفِ، مَنْعٌ مِنْ ظُهُورِهَا التَّعَذُّرُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ» يَعُودُ عَلَىٰ «مَا»، وَ«الْكَافُ» ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ نَصْبِ مَفْعُولٍ بِهٍ.' },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'ٱلْقَارِعَةُ',
        analysisParts: [
          { type: 'link', text: 'خَبَرٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' لِـ«مَا» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
          {
            type: 'text',
            text: ' وَجُمْلَةُ «الْقَارِعَةُ مَا الْقَارِعَةُ» لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ؛ لِأَنَّهَا ابْتِدَائِيَّةٌ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-4',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 4,
    ayahText: 'يَوْمَ يَكُونُ ٱلنَّاسُ كَٱلْفَرَاشِ ٱلْمَبْثُوثِ',
    translationEn: 'It is a Day when people will be like scattered moths.',
    rows: [
      {
        segment: 'يَوْمَ',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ زَمَانٍ', rule: 'sentence-structure' },
          {
            type: 'text',
            text: ' مَنْصُوبٌ بِالْفَتْحَةِ، مُتَعَلِّقٌ بِفِعْلٍ مُضْمَرٍ تَقْدِيرُهُ: «تَقْرَعُ».',
          },
        ],
      },
      {
        segment: 'يَكُونُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ نَاقِصٌ', rule: 'kaana-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
        ],
      },
      {
        segment: 'ٱلنَّاسُ',
        analysisParts: [
          { type: 'link', text: 'اسْمُ يَكُونُ', rule: 'kaana-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
        ],
      },
      {
        segment: 'كَٱلْفَرَاشِ',
        analysisParts: [
          { type: 'link', text: 'الْكَافُ', rule: 'harf-jarr' },
          {
            type: 'text',
            text: ' حَرْفُ جَرٍّ لِلتَّشْبِيهِ؛ «الْفَرَاشُ» اسْمٌ مَجْرُورٌ بِالْكَافِ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَالْجَارُّ وَالْمَجْرُورُ فِي مَحَلِّ نَصْبِ خَبَرِ «يَكُونُ»؛ أَوْ تَكُونُ الْكَافُ اسْمًا مَبْنِيًّا عَلَى الْفَتْحِ بِمَعْنَى «مِثْلٍ» فِي مَحَلِّ نَصْبِ خَبَرِ «يَكُونُ»، وَيَكُونُ «الْفَرَاشُ» مُضَافًا إِلَيْهِ مَجْرُورًا وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.',
          },
        ],
      },
      {
        segment: 'ٱلْمَبْثُوثِ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          {
            type: 'text',
            text: ' لِـ«الْفَرَاشِ» مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَىٰ آخِرِهَا. وَجُمْلَةُ «يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ» فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-5',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 5,
    ayahText: 'وَتَكُونُ ٱلْجِبَالُ كَٱلْعِهْنِ ٱلْمَنفُوشِ',
    translationEn: 'And the mountains will be like wool, fluffed up.',
    rows: [
      {
        segment: 'وَتَكُونُ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          {
            type: 'text',
            text: ' حَرْفُ عَطْفٍ، وَجُمْلَةُ «وَتَكُونُ …» مَعْطُوفَةٌ بِالْوَاوِ عَلَىٰ جُمْلَةِ «يَكُونُ …» السَّابِقَةِ.',
          },
          { type: 'link', text: 'تَكُونُ', rule: 'kaana-sisters' },
          {
            type: 'text',
            text: ': فِعْلٌ مُضَارِعٌ نَاقِصٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.',
          },
        ],
      },
      {
        segment: 'ٱلْجِبَالُ',
        analysisParts: [
          { type: 'link', text: 'اسْمُ يَكُونُ', rule: 'kaana-sisters' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.' },
        ],
      },
      {
        segment: 'كَٱلْعِهْنِ',
        analysisParts: [
          { type: 'link', text: 'الْكَافُ', rule: 'harf-jarr' },
          {
            type: 'text',
            text: ' حَرْفُ جَرٍّ لِلتَّشْبِيهِ؛ «الْعِهْنُ» اسْمٌ مَجْرُورٌ بِالْكَافِ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَالْجَارُّ وَالْمَجْرُورُ فِي مَحَلِّ نَصْبِ خَبَرِ «تَكُونُ»؛ أَوْ تَكُونُ الْكَافُ اسْمًا مَبْنِيًّا عَلَى الْفَتْحِ بِمَعْنَى «مِثْلٍ» فِي مَحَلِّ نَصْبِ خَبَرِ «تَكُونُ»، وَيَكُونُ «الْعِهْنُ» مُضَافًا إِلَيْهِ مَجْرُورًا وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ.',
          },
        ],
      },
      {
        segment: 'ٱلْمَنفُوشِ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          { type: 'text', text: ' لِـ«الْعِهْنِ» مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَىٰ آخِرِهَا.' },
        ],
      },
    ],
  },
  {
    id: '101-6',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 6,
    ayahText: 'فَأَمَّا مَن ثَقُلَتْ مَوَٰزِينُهُۥ',
    translationEn: 'Then as for one whose scales are heavy…',
    rows: [
      {
        segment: 'فَأَمَّا',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'harf-maani' },
          { type: 'text', text: ' حَرْفُ اسْتِئْنَافٍ، وَ«أَمَّا» حَرْفُ شَرْطٍ وَتَفْصِيلٍ لَا عَمَلَ لَهُ.' },
        ],
      },
      {
        segment: 'مَن',
        analysisParts: [
          { type: 'link', text: 'مَن', rule: 'relative-nouns' },
          { type: 'text', text: ' اسْمُ شَرْطٍ جَازِمٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'ثَقُلَتْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«التَّاءُ»: حَرْفٌ لِلتَّأْنِيثِ فِي مَحَلِّ جَزْمٍ «مَنْ».',
          },
        ],
      },
      {
        segment: 'مَوَٰزِينُهُۥ',
        analysisParts: [
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَ«الْهَاءُ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَجُمْلَةُ فِعْلِ الشَّرْطِ وَجَوَابِهِ الَّذِي فِي الْآيَةِ الْآتِيَةِ فِي مَحَلِّ رَفْعِ خَبَرِ الْمُبْتَدَأِ. وَجُمْلَةُ الْمُبْتَدَأِ وَالْخَبَرِ اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-7',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 7,
    ayahText: 'فَهُوَ فِى عِيشَةٍۢ رَّاضِيَةٍۢ',
    translationEn: 'He will be in a pleasant life.',
    rows: [
      {
        segment: 'فَهُوَ',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'harf-maani' },
          { type: 'text', text: ' حَرْفُ رَبْطٍ وَاقِعٌ فِي جَوَابِ الشَّرْطِ، وَ«هُوَ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُنْفَصِلٌ', rule: 'detached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'فِى عِيشَةٍۢ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِخَبَرِ «هُوَ».' },
        ],
      },
      {
        segment: 'رَّاضِيَةٍۢ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          {
            type: 'text',
            text: ' لِـ«عِيشَةٍ» مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَىٰ آخِرِهَا. وَجُمْلَةُ «هُوَ فِي عِيشَةٍ رَاضِيَةٍ» فِي مَحَلِّ جَزْمٍ جَوَابُ الشَّرْطِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-8',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 8,
    ayahText: 'وَأَمَّا مَنْ خَفَّتْ مَوَٰزِينُهُۥ',
    translationEn: 'But as for one whose scales are light…',
    rows: [
      {
        segment: 'وَأَمَّا',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          {
            type: 'text',
            text: ' حَرْفُ عَطْفٍ، مَعْطُوفَةٌ بِالْوَاوِ عَلَى الْآيَةِ السَّادِسَةِ، وَ«أَمَّا» حَرْفُ شَرْطٍ وَتَفْصِيلٍ لَا عَمَلَ لَهُ.',
          },
        ],
      },
      {
        segment: 'مَنْ',
        analysisParts: [
          { type: 'link', text: 'مَن', rule: 'relative-nouns' },
          { type: 'text', text: ' اسْمُ شَرْطٍ جَازِمٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'خَفَّتْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«التَّاءُ»: حَرْفٌ لِلتَّأْنِيثِ فِي مَحَلِّ جَزْمٍ «مَنْ».',
          },
        ],
      },
      {
        segment: 'مَوَٰزِينُهُۥ',
        analysisParts: [
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَ«الْهَاءُ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَجُمْلَةُ فِعْلِ الشَّرْطِ وَجَوَابِهِ الَّذِي فِي الْآيَةِ الْآتِيَةِ فِي مَحَلِّ رَفْعِ خَبَرِ الْمُبْتَدَأِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-9',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 9,
    ayahText: 'فَأُمُّهُۥ هَاوِيَةٌۭ',
    translationEn: 'Then his mother will be the Pit.',
    rows: [
      {
        segment: 'فَأُمُّهُۥ',
        analysisParts: [
          { type: 'link', text: 'الْفَاءُ', rule: 'harf-maani' },
          { type: 'text', text: ' حَرْفُ رَابِطٍ لِجَوَابِ الشَّرْطِ، وَ«أُمُّهُ» ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ، وَ«الْهَاءُ» ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'هَاوِيَةٌۭ',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ الْمُبْتَدَأِ', rule: 'nominal-sentence' },
          {
            type: 'text',
            text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَىٰ آخِرِهِ. وَجُمْلَةُ «أُمُّهُ هَاوِيَةٌ» فِي مَحَلِّ جَزْمٍ جَوَابُ الشَّرْطِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-10',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 10,
    ayahText: 'وَمَآ أَدْرَىٰكَ مَا هِيَهْ',
    translationEn: 'And what can make you know what it is?',
    rows: [
      {
        segment: 'وَمَآ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«مَا» ' },
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'أَدْرَىٰكَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحَةِ الْمُقَدَّرَةِ عَلَى الْأَلِفِ، مَنْعٌ مِنْ ظُهُورِهَا التَّعَذُّرُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ» يَعُودُ عَلَىٰ «مَا»، وَ«الْكَافُ» ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ نَصْبِ مَفْعُولٍ بِهٍ.' },
        ],
      },
      {
        segment: 'مَا',
        analysisParts: [
          { type: 'link', text: 'اسْمُ اسْتِفْهَامٍ', rule: 'interrogative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٍ.' },
        ],
      },
      {
        segment: 'هِيَهْ',
        analysisParts: [
          { type: 'link', text: 'ضَمِيرُ رَفْعٍ مُنْفَصِلٌ', rule: 'detached-pronouns' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ خَبَرِ «مَا»، وَ«الْهَاءُ»: حَرْفٌ لِلسَّكْتِ.',
          },
        ],
      },
    ],
  },
  {
    id: '101-11',
    surah: 101,
    surahNameAr: 'الْقَارِعَةُ',
    ayah: 11,
    ayahText: 'نَارٌ حَامِيَةٌۢ',
    translationEn: 'A fire, intensely hot.',
    rows: [
      {
        segment: 'نَارٌ',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ مُبْتَدَأٍ مَحْذُوفٍ', rule: 'nominal-sentence' },
          { type: 'text', text: ' تَقْدِيرُهُ: «هِيَ نَارٌ».' },
        ],
      },
      {
        segment: 'حَامِيَةٌۢ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          {
            type: 'text',
            text: ' لِـ«نَارٍ» مَرْفُوعَةٌ بِالضَّمَّةِ. وَالْجُمْلَةُ اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
    ],
  },

  /* —— سُورَةُ التَّكَاثُرِ (١٠٢) —— */
  {
    id: '102-3',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 3,
    ayahText: 'كَلَّا سَوْفَ تَعْلَمُونَ',
    translationEn: 'No! You will surely know.',
    rows: [
      {
        segment: 'كَلَّا',
        analysisParts: [{ type: 'text', text: 'حرف ردع وزجر.' }],
      },
      {
        segment: 'سَوْفَ',
        analysisParts: [{ type: 'text', text: 'حرف استقبال.' }],
      },
      {
        segment: 'تَعْلَمُونَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل. والجملة استئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '102-4',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 4,
    ayahText: 'ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ',
    translationEn: 'Then no! You will surely know.',
    rows: [
      {
        segment: 'ثُمَّ',
        analysisParts: [
          {
            type: 'text',
            text: 'معطوفة بـ"ثم" على الآية السابقة، وتعرب إعرابها. وهو : « كَلَّا: حرف ردع وزجر.\n﴿سَوْفَ﴾: حرف استقبال.\n﴿تَعْلَمُونَ﴾: فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل.\nوالجملة استئنافية لا محلّ لها من الإعراب».',
          },
        ],
      },
      {
        segment: 'كَلَّا',
        analysisParts: [{ type: 'text', text: 'حرف ردع وزجر.' }],
      },
      {
        segment: 'سَوْفَ',
        analysisParts: [{ type: 'text', text: 'حرف استقبال.' }],
      },
      {
        segment: 'تَعْلَمُونَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل. والجملة استئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '102-5',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 5,
    ayahText: 'كَلَّا لَوْ تَعْلَمُونَ عِلْمَ ٱلْيَقِينِ',
    translationEn: 'No! If you only knew with knowledge of certainty…',
    rows: [
      {
        segment: 'كَلَّا',
        analysisParts: [{ type: 'text', text: 'حرف ردع وزجر.' }],
      },
      {
        segment: 'لَوْ',
        analysisParts: [
          {
            type: 'text',
            text: 'حرف شرط غير جازم، وجواب الشرط محذوف، والتقدير: لفعلتم ما لا يوصف. وقيل "لو" حرف تمنّ.',
          },
        ],
      },
      {
        segment: 'تَعْلَمُونَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل.',
          },
        ],
      },
      {
        segment: 'عِلْمَ',
        analysisParts: [{ type: 'text', text: 'مفعول مطلق منصوب بالفتحة، وهو مضاف.' }],
      },
      {
        segment: 'ٱلْيَقِينِ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره. والجملة الاستئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '102-6',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 6,
    ayahText: 'لَتَرَوُنَّ ٱلْجَحِيمَ',
    translationEn: 'You will surely see the Blaze.',
    rows: [
      {
        segment: 'لَتَرَوُنَّ',
        analysisParts: [
          {
            type: 'text',
            text: 'اللام: حرف واقع في جواب قسم محذوف، والتقدير: والله لترون الجحيم".\nترون.\nفعل مضارع مبنيّ لاتصاله بنون التوكيد التي حُذفت لتوالي النونات، و "الواو" المحذوفة لالتقائها ساكنة مع نون التوكيد وضمير متّصل مبنيّ في محلّ رفع فاعل.\nو "النون": حرف توكيد.',
          },
        ],
      },
      {
        segment: 'ٱلْجَحِيمَ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره. وجملة القسم استئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '102-7',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 7,
    ayahText: 'ثُمَّ لَتَرَوُنَّهَا عَيْنَ ٱلْيَقِينِ',
    translationEn: 'Then you will surely see it with the eye of certainty.',
    rows: [
      {
        segment: 'ثُمَّ',
        analysisParts: [
          {
            type: 'text',
            text: 'معطوفة بـ"ثم" على الآية السابقة، وتعرب إعرابها، وهو : « لَتَرَوُنَّ: اللام: حرف واقع في جواب قسم محذوف، والتقدير: والله لترون الجحيم".\nترون.\nفعل مضارع مبنيّ لاتصاله بنون التوكيد التي حُذفت لتوالي النونات، و "الواو" المحذوفة لالتقائها ساكنة مع نون التوكيد وضمير متّصل مبنيّ في محلّ رفع فاعل.\nو "النون": حرف توكيد».',
          },
        ],
      },
      {
        segment: 'لَتَرَوُنَّهَا',
        analysisParts: [
          {
            type: 'text',
            text: 'و "ها": ضمير متّصل مبنيّ على السكون في محلّ نصب مفعول به.',
          },
        ],
      },
      {
        segment: 'عَيْنَ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول مطلق منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'ٱلْيَقِينِ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  {
    id: '102-8',
    surah: 102,
    surahNameAr: 'التَّكَاثُرُ',
    ayah: 8,
    ayahText: 'ثُمَّ لَتُسْـَٔلُنَّ يَوْمَئِذٍ عَنِ ٱلنَّعِيمِ',
    translationEn: 'Then you will surely be asked that Day about bounty.',
    rows: [
      {
        segment: 'ثُمَّ',
        analysisParts: [{ type: 'text', text: 'حرف عطف.' }],
      },
      {
        segment: 'لَتُسْـَٔلُنَّ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل مضارع للمجهول مبنيّ لاتصاله بنون التوكيد التي حُذفت لتوالي النونات. وواو الجماعة المحذوفة في محلّ رفع نائب فاعل، و "النون": حرف توكيد.',
          },
        ],
      },
      {
        segment: 'يَوْمَئِذٍ',
        analysisParts: [
          {
            type: 'text',
            text: 'سبق إعرابها في الآية الحادية عشرة من سورة "العاديات". وهو : « يَوْمَئِذٍ: ظرف زمان منصوب بالفتحة وهو مضاف. و "إذ" اسم مبنيّ على السكون وقد حرِّك بالكسر تخلصًا من التقاء الساكنين ( سكونه سكون التنوين ) وهو في محلّ جرّ بالإضافة. والجملة المحذوفة المعوض عنها بالتنوين في محلّ جرّ بالإضافة».',
          },
        ],
      },
      {
        segment: 'عَنِ ٱلنَّعِيمِ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بـ"تسألن" معطوفة على "ترون" لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },

  /* —— سُورَةُ الْكَوْثَرِ (١٠٨) —— */
  {
    id: '108-1',
    surah: 108,
    surahNameAr: 'الْكَوْثَرِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ',
    translationEn: 'Indeed, We have granted you al-Kawthar.',
    rows: [
      {
        segment: 'إِنَّآ',
        analysisParts: [
          {
            type: 'text',
            text: 'إنّ: حرف توكيد مشبه بالفعل.\nو "نا": ضمير متّصل مبنيّ على السكون في محلّ نصب اسم "إنّ".',
          },
        ],
      },
      {
        segment: 'أَعْطَيْنَٰكَ',
        analysisParts: [
          {
            type: 'text',
            text: 'فعل ماضٍ مبنيّ على السكون لاتصاله بضمير رفع متحرك، و "نا": ضمير متّصل مبنيّ على السكون في محلّ رفع فاعل، و "الكاف": ضمير متّصل مبنيّ على الفتح في محلّ نصب مفعول به أول.',
          },
        ],
      },
      {
        segment: 'ٱلْكَوْثَرَ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به ثانٍ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.\nوجملة "أعطيناك" في محلّ رفع خبر "إنّ".\nوجملة "إنّ" واسمها وخبرها ابتدائية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '108-2',
    surah: 108,
    surahNameAr: 'الْكَوْثَرِ',
    ayah: 2,
    ayahText: 'فَصَلِّ لِرَبِّكَ وَٱنْحَرْ',
    translationEn: 'So pray to your Lord and sacrifice [to Him alone].',
    rows: [
      {
        segment: 'فَصَلِّ',
        analysisParts: [
          {
            type: 'text',
            text: 'الفاء: حرف استئناف.\nصل: فعل أمر مبنيّ على حذف حرف العلة، والفاعل ضمير مستتر فيه وجوبًا تقديره: أنت.',
          },
        ],
      },
      {
        segment: 'لِرَبِّكَ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بـ"صل"، و "الكاف": ضمير متّصل مبنيّ على الفتح في محلّ جرّ بالإضافة.',
          },
        ],
      },
      {
        segment: 'وَٱنْحَرْ',
        analysisParts: [
          {
            type: 'text',
            text: 'الواو: حرف عطف.\nانحر: فعل أمر مبنيّ على السكون، وفاعله ضمير مستتر فيه جوازًا تقديره: أنت.\nوجملة "صلّ" استئنافية لا محلّ لها من الإعراب.\nوجملة "انحر" معطوفة على جملة "صلّ" لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '108-3',
    surah: 108,
    surahNameAr: 'الْكَوْثَرِ',
    ayah: 3,
    ayahText: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ',
    translationEn: 'Indeed, your enemy is the one cut off.',
    rows: [
      {
        segment: 'إِنَّ',
        analysisParts: [{ type: 'text', text: 'حرف توكيد مشبّه بالفعل.' }],
      },
      {
        segment: 'شَانِئَكَ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم "إنّ" منصوب بالفتحة، و "الكاف": ضمير متّصل مبنيّ على الفتح في محلّ جرّ بالإضافة.',
          },
        ],
      },
      {
        segment: 'هُوَ',
        analysisParts: [{ type: 'text', text: 'ضمير رفع منفصل مبنيّ على الفتح في محلّ رفع مبتدأ.' }],
      },
      {
        segment: 'ٱلْأَبْتَرُ',
        analysisParts: [
          {
            type: 'text',
            text: 'خبر "هو" مرفوع وعلامة رفعه الضمة الظاهرة على آخره.\nوجملة "هو الأبتر" في محلّ رفع خبر "إنّ".\nوجملة "إنّ" واسمها و خبرها استئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },

  /* —— سُورَةُ الْمَسَدِ (١١١) —— */
  {
    id: '111-1',
    surah: 111,
    surahNameAr: 'الْمَسَدِ',
    ayah: 1,
    ayahText: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
    translationEn: 'May the hands of Abu Lahab be ruined, and ruined is he.',
    rows: [
      {
        segment: 'تَبَّتْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' والتاء للتأَنَّيث' },
        ],
      },
      {
        segment: 'يَدَا',
        analysisParts: [
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مَرْفُوعٌ بالألف لِأَنَّهُ مثنى' },
        ],
      },
      {
        segment: 'أَبِي',
        analysisParts: [{ type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' }],
      },
      {
        segment: 'لَهَبٍ',
        analysisParts: [{ type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' }, { type: 'text', text: ' أيضاً' }],
      },
      {
        segment: 'وَتَبَّ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ؛ تبّ ' },
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          { type: 'text', text: ' مُسْتَتِرٌ؛ وَالْجُمْلَةُ مَعْطُوفَةٌ عَلَى مَا قَبْلَهَا' },
        ],
      },
    ],
  },
  {
    id: '111-4',
    surah: 111,
    surahNameAr: 'الْمَسَدِ',
    ayah: 4,
    ayahText: 'وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ',
    translationEn: 'And his wife — the carrier of firewood.',
    rows: [
      {
        segment: 'وَامْرَأَتُهُ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ؛ امرأته مَعْطُوفٌ عَلَى فَاعِلٌ يصلى مَرْفُوعٌ بِالضَّمَّةِ؛ الهاء ' },
          { type: 'link', text: 'ضَمِيرٌ مَبْنِيٌّ', rule: 'attached-nouns' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
        ],
      },
      {
        segment: 'حَمَّالَةَ الْحَطَبِ',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' لفعل محذوف تَقْدِيرُهُ أذمّ حمالة الحطب' },
        ],
      },
    ],
  },
  {
    id: '111-5',
    surah: 111,
    surahNameAr: 'الْمَسَدِ',
    ayah: 5,
    ayahText: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ',
    translationEn: 'Around her neck is a rope of fiber.',
    rows: [
      {
        segment: 'فِي جِيدِهَا',
        analysisParts: [
          { type: 'link', text: 'جار ومَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: '؛ ' },
          { type: 'link', text: 'مُضَافٌ', rule: 'idafah' },
          { type: 'text', text: ' (جيد) والضَمِيرٌ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ؛ شِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرٌ مُقَدَّمٌ' },
        ],
      },
      {
        segment: 'حَبْلٌ',
        analysisParts: [
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' مؤخر مَرْفُوعٌ بِالضَّمَّةِ' },
        ],
      },
      {
        segment: 'مِن مَّسَدٍ',
        analysisParts: [
          { type: 'link', text: 'جار ومَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'صفة', rule: 'naat' },
          { type: 'text', text: ' لحبل' },
        ],
      },
    ],
  },

  /* —— سُورَةُ قُرَيْشٍ (١٠٦) —— */
  {
    id: '106-1',
    surah: 106,
    surahNameAr: 'قُرَيْشٍ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ لِإِيلَٰفِ قُرَيْشٍ',
    translationEn: 'For the accustomed security of Quraysh.',
    rows: [
      {
        segment: 'لِإِيلَٰفِ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بقوله "فليعبدوا" في الآية الثالثة.',
          },
        ],
      },
      {
        segment: 'قُرَيْشٍ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  {
    id: '106-2',
    surah: 106,
    surahNameAr: 'قُرَيْشٍ',
    ayah: 2,
    ayahText: 'إِۦلَٰفِهِمْ رِحْلَةَ ٱلشِّتَآءِ وَٱلصَّيْفِ',
    translationEn: 'Their accustomed security in the winter and summer caravans.',
    rows: [
      {
        segment: 'إِۦلَٰفِهِمْ',
        analysisParts: [
          {
            type: 'text',
            text: 'بدل من "إيلاف" الأولى مجرورة بالكسرة، و "الهاء": ضمير متّصل مبنيّ في محلّ جر بالإضافة. و "الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'رِحْلَةَ',
        analysisParts: [{ type: 'text', text: 'مفعول به للمصدر منصوب بالفتحة.' }],
      },
      {
        segment: 'ٱلشِّتَآءِ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'وَٱلصَّيْفِ',
        analysisParts: [
          {
            type: 'text',
            text: 'الواو: حرف عطف.\nالصيف: اسم معطوف مجرور وعلامة جره الكسرة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  {
    id: '106-3',
    surah: 106,
    surahNameAr: 'قُرَيْشٍ',
    ayah: 3,
    ayahText: 'فَلْيَعْبُدُوا۟ رَبَّ هَٰذَا ٱلْبَيْتِ',
    translationEn: 'Let them worship the Lord of this House.',
    rows: [
      {
        segment: 'فَلْيَعْبُدُوا۟',
        analysisParts: [
          {
            type: 'text',
            text:
              'الفاء: حرف واقع في جواب شرط مقدّر، أي: إن نعم الله عليهم لا تحصى، فإن لم يعبدوه لسائر نعمه، فليعبدوه لهذه النعمة الظاهرة.\nواللام: لام الأمر حرف جزم.\nيعبدوا: فعل مضارع مجزوم باللام، وعلامة جزمه حذف النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل، و "الألف": فارقة.',
          },
        ],
      },
      {
        segment: 'رَبَّ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'هَٰذَا',
        analysisParts: [
          {
            type: 'text',
            text: 'ها: حرف تنبيه.\nذا: اسم إشارة مبنيّ على السكون في محلّ جرّ بالإضافة.',
          },
        ],
      },
      {
        segment: 'ٱلْبَيْتِ',
        analysisParts: [
          {
            type: 'text',
            text: 'بدل من اسم الإشارة مجرور بالكسرة.',
          },
        ],
      },
    ],
  },
  {
    id: '106-4',
    surah: 106,
    surahNameAr: 'قُرَيْشٍ',
    ayah: 4,
    ayahText: 'ٱلَّذِىٓ أَطْعَمَهُم مِّن جُوعٍۢ وَءَامَنَهُم مِّنْ خَوْفٍۭ',
    translationEn: 'Who fed them against hunger and secured them against fear.',
    rows: [
      {
        segment: 'ٱلَّذِىٓ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم موصول مبنيّ على السكون في محلّ نصب صفة لـ"الرب".',
          },
        ],
      },
      {
        segment: 'أَطْعَمَهُم',
        analysisParts: [
          {
            type: 'text',
            text:
              'فعل ماضٍ مبنيّ على الفتح، والفاعل ضمير مستتر فيه جوازًا تقديره: هو، و "الهاء": ضمير متّصل مبنيّ في محلّ نصب مفعول به. و"الميم": للجماعة.',
          },
        ],
      },
      {
        segment: 'مِّن جُوعٍۢ',
        analysisParts: [
          {
            type: 'text',
            text: 'جارّ ومجرور متعلّقان بـ"أطعمهم".',
          },
        ],
      },
      {
        segment: 'وَءَامَنَهُم مِّنْ خَوْفٍۭ',
        analysisParts: [
          {
            type: 'text',
            text:
              'معطوفة بالواو على "أطعمهم من جوع"، وتعرب إعرابها.\nوجملة "أطعمهم" صلة الموصول لا محلّ لها من الإعراب.\nوجملة "آمنهم" معطوفة على جملة "أطعمهم" لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },

  /* —— سُورَةُ الْمَاعُونِ (١٠٧) —— */
  {
    id: '107-1',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 1,
    ayahText: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ',
    translationEn: 'Have you seen the one who denies the Recompense?',
    rows: [
      {
        segment: 'أَرَأَيْتَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'الهمزة: حرف استفهام. رأيت: فعل ماضٍ مبنيّ على السكون، لاتصاله بضمير الرفع المتحرك، و "التاء": ضمير متّصل مبنيّ على الفتح في محلّ رفع فاعل.',
          },
        ],
      },
      {
        segment: 'الَّذِي',
        analysisParts: [{ type: 'text', text: 'اسم موصول مبنيّ على السكون في محلّ نصب مفعول به.' }],
      },
      {
        segment: 'يُكَذِّبُ',
        analysisParts: [
          {
            type: 'text',
            text:
              'فعل مضارع مرفوع وعلامة رفعه الضمة، والفاعل ضمير مستتر فيه جوازًا تقديره: هو.',
          },
        ],
      },
      {
        segment: 'بِالدِّينِ',
        analysisParts: [{ type: 'text', text: 'جارّ ومجرور متعلّقان بـ"يكذب".' }],
      },
      {
        segment: '—',
        analysisParts: [
          {
            type: 'text',
            text:
              'جملة "رأيت" ابتدائية لا محلّ لها من الإعراب. جملة "يكذب" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '107-2',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 2,
    ayahText: 'فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ',
    translationEn: 'That is the one who drives away the orphan.',
    rows: [
      {
        segment: 'فَذَلِكَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'الفاء: حرف واقع في جواب شرط مقدّر. أي: إن لم تعرف الذي يكذب بالجزاء فذلك ,,, ذا: اسم إشارة مبنيّ على السكون في محلّ رفع مبتدأ. و "اللام": حرف للبعد، و "الكاف": حرف للخطاب.',
          },
        ],
      },
      {
        segment: 'الَّذِي',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم موصول مبنيّ على السكون في محلّ رفع خبر المبتدأ "إذا".',
          },
        ],
      },
      {
        segment: 'يَدُعُّ',
        analysisParts: [
          {
            type: 'text',
            text:
              'فعل مضارع مرفوع وعلامة رفعه الضمة، والفاعل ضمير مستتر فيه جوازًا تقديره: هو.',
          },
        ],
      },
      {
        segment: 'الْيَتِيمَ',
        analysisParts: [
          { type: 'text', text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.' },
        ],
      },
      {
        segment: '—',
        analysisParts: [{ type: 'text', text: 'وجملة "يدع" صلة الموصول لا محلّ لها من الإعراب.' }],
      },
    ],
  },
  {
    id: '107-3',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 3,
    ayahText: 'وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ',
    translationEn: 'And does not encourage the feeding of the needy.',
    rows: [
      {
        segment: 'وَلَا يَحُضُّ',
        analysisParts: [
          {
            type: 'text',
            text:
              'الواو: حرف عطف. لا: حرف زائد لتأكيد النفي. يحضّ: تعرب إعراب "يدع" في الآية السابقة. وهو : « يَدُعُّ: فعل مضارع مرفوع وعلامة رفعه الضمة، والفاعل ضمير مستتر فيه جوازًا تقديره: هو».',
          },
        ],
      },
      {
        segment: 'عَلَى طَعَامِ',
        analysisParts: [{ type: 'text', text: 'جارّ ومجرور متعلّقان بـ"لا يحضّ".' }],
      },
      {
        segment: 'الْمِسْكِينِ',
        analysisParts: [
          {
            type: 'text',
            text: 'مضاف إليه مجرور و علامة جره الكسرة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  {
    id: '107-4',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 4,
    ayahText: 'فَوَيْلٌ لِلْمُصَلِّينَ',
    translationEn: 'So woe to those who pray.',
    rows: [
      {
        segment: 'فَوَيْلٌ',
        analysisParts: [
          {
            type: 'text',
            text:
              'الفاء: حرف استئناف. ويل: مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          },
        ],
      },
      {
        segment: 'لِلْمُصَلِّينَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'جارّ ومجرور متعلّقان بخبر "ويل" المحذوف، وعلامة جره الاسم "الياء"، لأنه جمع مذكر سالم. وجملة المبتدأ والخبر استئنافية لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '107-5',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 5,
    ayahText: 'الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ',
    translationEn: 'Those who are heedless of their prayer.',
    rows: [
      {
        segment: 'الَّذِينَ',
        analysisParts: [
          {
            type: 'text',
            text: 'اسم موصول مبنيّ على الفتح في محلّ جر صفة لـ"المصلين".',
          },
        ],
      },
      {
        segment: 'هُمْ',
        analysisParts: [{ type: 'text', text: 'ضمير رفع منفصل مبنيّ في محلّ رفع مبتدأ.' }],
      },
      {
        segment: 'عَنْ صَلَاتِهِمْ',
        analysisParts: [
          {
            type: 'text',
            text:
              'عن: حرف جر. صلاة: اسم مجرور، وعلامة جره الكسرة. و "الهاء": ضمير متّصل مبنيّ في محلّ جرّ بـ"عن". و "الميم": للجماعة. والجارّ والمجرور متعلّقان بخبر "هم".',
          },
        ],
      },
      {
        segment: 'سَاهُونَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'خبر "هم" مرفوع بالواو، لأنه جمع مذكر سالم. وجملة "هم عن صلاتهم ساهون" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '107-6',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 6,
    ayahText: 'الَّذِينَ هُمْ يُرَاءُونَ',
    translationEn: 'Those who show off.',
    rows: [
      {
        segment: 'الَّذِينَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'اسم موصول مبنيّ على الفتح في محلّ جر، لأنه بدل من "الذين" الواردة في الآية السابقة.',
          },
        ],
      },
      {
        segment: 'هُمْ',
        analysisParts: [{ type: 'text', text: 'ضمير رفع منفصل مبنيّ في محلّ رفع مبتدأ.' }],
      },
      {
        segment: 'يُرَاءُونَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل. والجملة الفعلية "يراءون" في محلّ رفع خبر "هم". وجملة "هم يراءون" صلة الموصول لا محلّ لها من الإعراب.',
          },
        ],
      },
    ],
  },
  {
    id: '107-7',
    surah: 107,
    surahNameAr: 'الْمَاعُونِ',
    ayah: 7,
    ayahText: 'وَيَمْنَعُونَ الْمَاعُونَ',
    translationEn: 'And withhold small kindnesses.',
    rows: [
      {
        segment: 'وَيَمْنَعُونَ',
        analysisParts: [
          {
            type: 'text',
            text:
              'معطوفة بالواو على "يراءون"، وتعرب إعرابها. وهو : « يُرَاءُونَ: فعل مضارع مرفوع بثبوت النون، و "الواو" ضمير متّصل مبنيّ في محلّ رفع فاعل».',
          },
        ],
      },
      {
        segment: 'الْمَاعُونَ',
        analysisParts: [
          {
            type: 'text',
            text: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          },
        ],
      },
    ],
  },
  /* —— سُورَةُ التِّينِ (٩٥) —— تفصيلٌ كاملٌ */
  {
    id: "95-1",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 1,
    ayahText: "بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ وَٱلتِّينِ وَٱلزَّيْتُونِ",
    translationEn: "By the fig and the olive.",
    rows: [
      {
        segment: "بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        analysisParts: [
          { type: 'text', text: "تَسْمِيَةٌ (بَسْمَلَةٌ)." },
        ],
      },
      {
        segment: "وَٱلتِّينِ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ لِلْقَسْمِ مَبْنِيٌّ عَلَى الْفَتْحِ. وَ«ٱلتِّينُ» اسْمٌ مُقَسَّمٌ بِهٍ " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بِالْكَسْرَةِ. وَالْجَارُّ وَالْمَجْرُورُ مُتَعَلِّقَانِ بِفِعْلِ الْقَسْمِ الْمَحْذُوفِ." },
        ],
      },
      {
        segment: "وَٱلزَّيْتُونِ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱلزَّيْتُونُ» " },
          { type: 'link', text: "مَعْطُوْفٌ", rule: "atf" },
          { type: 'text', text: " بِالْوَاوِ عَلَى «ٱلتِّينِ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا. وَجُمْلَةُ الْقَسْمِ الِابْتِدَائِيَّةُ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
    ],
  },
  {
    id: "95-2",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 2,
    ayahText: "وَطُورِ سِينِينَ",
    translationEn: "And [by] Mount Sinai.",
    rows: [
      {
        segment: "وَطُورِ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«طُورُ» مَعْطُوْفٌ بِالْوَاوِ عَلَى «ٱلتِّينِ» مَجْرُورٌ، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا." },
        ],
      },
      {
        segment: "سِينِينَ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ بِالْفَتْحَةِ بَدَلًا مِنَ الْكَسْرَةِ لِأَنَّهُ " },
          { type: 'link', text: "مَمْنُوعٌ مِنَ الصَّرْفِ", rule: "mamnu-sarf" },
          { type: 'text', text: "، وَهُوَ اسْمُ مَكَانٍ، وَيَجُوزُ إِعْرَابُهُ بِالْحُرُوفِ وَالْحَرَكَاتِ مِثْلَ «سَنِينَ» وَ«سِينِين»، أَيْ بِالْيَاءِ لِمُلْحَقَتِهِ بِجَمْعِ الْمُذَكَّرِ السَّالِمِ — انْظُرْ " },
          { type: 'link', text: "جَمْعُ الْمُذَكَّرِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "95-3",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 3,
    ayahText: "وَهَٰذَا ٱلْبَلَدِ ٱلْأَمِينِ",
    translationEn: "And this secure city.",
    rows: [
      {
        segment: "وَهَٰذَا",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«هَٰذَا» " },
          { type: 'link', text: "اسْمُ إِشَارَةٍ", rule: "demonstratives" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ لِأَنَّهُ مَعْطُوْفٌ عَلَى مَجْرُورٍ." },
        ],
      },
      {
        segment: "ٱلْبَلَدِ",
        analysisParts: [
          { type: 'text', text: "بَدَلٌ " },
          { type: 'link', text: "مِنَ اسْمِ الْإِشَارَةِ", rule: "demonstratives" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بِالْكَسْرَةِ الظَّاهِرَةِ." },
        ],
      },
      {
        segment: "ٱلْأَمِينِ",
        analysisParts: [
          { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " لِـ«ٱلْبَلَدِ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا." },
        ],
      },
    ],
  },
  {
    id: "95-4",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 4,
    ayahText: "لَقَدْ خَلَقْنَا ٱلْإِنسَٰنَ فِىٓ أَحْسَنِ تَقْوِيمٍۢ",
    translationEn: "We have certainly created man in the best of stature.",
    rows: [
      {
        segment: "لَقَدْ",
        analysisParts: [
          { type: 'text', text: "«اللَّامُ» " },
          { type: 'link', text: "وَاقِعَةٌ فِي جَوَابِ الْقَسْمِ", rule: "sentence-structure" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ. وَ«قَدْ» " },
          { type: 'link', text: "حَرْفُ تَحْقِيقٍ", rule: "harf-maani" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "خَلَقْنَا",
        analysisParts: [
          { type: 'text', text: "«خَلَقَ» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِضَمِيرِ رَفْعٍ مُتَحَرِّكٍ. وَ«نَا» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْإِنسَٰنَ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَنْصُوبٌ", rule: "irab-nasb" },
          { type: 'text', text: "، وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ." },
        ],
      },
      {
        segment: "فِىٓ أَحْسَنِ",
        analysisParts: [
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " (فِي)، وَ«أَحْسَنُ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَمَعْنَاهُ فِي أَحْسَنِ قَدْرٍ أَوْ هَيْئَةٍ. " },
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِخَلَقْنَا", rule: "sentence-structure" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "تَقْوِيمٍۢ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. وَجُمْلَةُ «خَلَقْنَا» " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: " لِأَنَّهَا " },
          { type: 'link', text: "جَوَابُ الْقَسْمِ", rule: "sentence-structure" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "95-5",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 5,
    ayahText: "ثُمَّ رَدَدْنَٰهُ أَسْفَلَ سَٰفِلِينَ",
    translationEn: "Then We return him to the lowest of the low.",
    rows: [
      {
        segment: "ثُمَّ",
        analysisParts: [
          { type: 'link', text: "حَرْفُ عَطْفٍ", rule: "atf" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "رَدَدْنَٰهُ",
        analysisParts: [
          { type: 'text', text: "«رَدَدْنَا» يُعْرَبُ مِثْلَ «خَلَقْنَا»: " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِضَمِيرِ رَفْعٍ مُتَحَرِّكٍ. وَ«نَا» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: ". وَ«الْهَاءُ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أَسْفَلَ",
        analysisParts: [
          { type: 'text', text: "ظَرْفُ " },
          { type: 'link', text: "مَكَانٍ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَنْصُوبٌ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِالْفَتْحَةِ", rule: "irab-nasb" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "سَٰفِلِينَ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِالْيَاءِ", rule: "irab-jarr" },
          { type: 'text', text: " لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُذَكَّرِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: ". وَجُمْلَةُ «رَدَدْنَاهُ» " },
          { type: 'link', text: "مَعْطُوْفَةٌ", rule: "atf" },
          { type: 'text', text: " عَلَى جُمْلَةِ «خَلَقْنَا» " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "95-6",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 6,
    ayahText: "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍۢ",
    translationEn: "Except those who believe and do righteous deeds — for them is a reward uninterrupted.",
    rows: [
      {
        segment: "إِلَّا",
        analysisParts: [
          { type: 'link', text: "حَرْفُ اسْتِثْنَاءٍ", rule: "istithna" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "ٱلَّذِينَ",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: " فِي مَحَلِّ " },
          { type: 'link', text: "نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُسْتَثْنًى", rule: "istithna" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ءَامَنُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الضَّمِّ", rule: "verb-past" },
          { type: 'text', text: " لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " فِي مَحَلِّ رَفْعٍ " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: "، وَ«الْأَلِفُ» فَارِقَةٌ. " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "verbal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "وَعَمِلُوا۟",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«عَمِلُوا» يُعْرَبُ إِعْرَابَ «آمَنُوا». وَهُوَ: " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الضَّمِّ", rule: "verb-past" },
          { type: 'text', text: " لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " فِي مَحَلِّ رَفْعٍ " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلصَّٰلِحَٰتِ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْكَسْرَةُ الظَّاهِرَةُ لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُؤَنَّثِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "فَلَهُمْ",
        analysisParts: [
          { type: 'text', text: "«الْفَاءُ» " },
          { type: 'link', text: "حَرْفُ اسْتِئْنَافٍ", rule: "harf-maani" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: ". وَ«اللَّامُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: "، وَ«هَاءُ الْغَائِبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ جَرٍّ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِاللَّامِ", rule: "harf-jarr" },
          { type: 'text', text: "، وَ«الْمِيمُ» لِلْجَمَاعَةِ. " },
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ بِخَبَرٍ مُقَدَّمٍ", rule: "nominal-sentence" },
          { type: 'text', text: " (وَمِنْ وُجُوهِهِ: " },
          { type: 'link', text: "شِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعٍ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُقَدَّمٌ", rule: "nominal-sentence" },
          { type: 'text', text: ")." },
        ],
      },
      {
        segment: "أَجْرٌ",
        analysisParts: [
          { type: 'link', text: "مُبْتَدَأٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُؤَخَّرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: "، وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ." },
        ],
      },
      {
        segment: "غَيْرُ",
        analysisParts: [
          { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " لِـ«أَجْرٍ» " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: "، وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ." },
        ],
      },
      {
        segment: "مَمْنُونٍ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱسْتِئْنَافِيَّةٌ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "95-7",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 7,
    ayahText: "فَمَا يُكَذِّبُكَ بَعْدُ بِٱلدِّينِ",
    translationEn: "Then what can cause you to deny the Recompense?",
    rows: [
      {
        segment: "فَمَا",
        analysisParts: [
          { type: 'text', text: "«الْفَاءُ» " },
          { type: 'link', text: "حَرْفُ اسْتِئْنَافٍ", rule: "harf-maani" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: ". " },
          { type: 'link', text: "مَا", rule: "interrogative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "اسْمُ اسْتِفْهَامٍ", rule: "interrogative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُبْتَدَأٍ", rule: "nominal-sentence" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "يُكَذِّبُكَ",
        analysisParts: [
          { type: 'text', text: "«يَكْذِبُ» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: "، وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَ«الْكَافُ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: "، " },
          { type: 'link', text: "وَالْفَاعِلُ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُسْتَتِرٌ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِيهِ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "جَوَازًا", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "تَقْدِيرُهُ", rule: "fael" },
          { type: 'text', text: " «هُوَ»، " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "verbal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِلْمُبْتَدَأِ", rule: "nominal-sentence" },
          { type: 'text', text: " «مَا»." },
        ],
      },
      {
        segment: "بَعْدُ",
        analysisParts: [
          { type: 'text', text: "ظَرْفُ " },
          { type: 'link', text: "زَمَانٍ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الضَّمِّ", rule: "mabni-muarab" },
          { type: 'text', text: " (لِانْقِطَاعِهِ " },
          { type: 'link', text: "عَنِ الْإِضَافَةِ", rule: "idafah" },
          { type: 'text', text: ") " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "بِٱلدِّينِ",
        analysisParts: [
          { type: 'text', text: "«الْبَاءُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْكَسْرِ", rule: "mabni-muarab" },
          { type: 'text', text: "، و«ٱلدِّينُ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ. " },
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِيُكَذِّبَكَ", rule: "mafool" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱسْتِئْنَافِيَّةٌ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "95-8",
    surah: 95,
    surahNameAr: "التِّينِ",
    ayah: 8,
    ayahText: "أَلَيْسَ ٱللَّهُ بِأَحْكَمِ ٱلْحَٰكِمِينَ",
    translationEn: "Is not Allah the most just of judges?",
    rows: [
      {
        segment: "أَلَيْسَ",
        analysisParts: [
          { type: 'text', text: "«الْهَمْزَةُ» " },
          { type: 'link', text: "حرف استفهام", rule: "interrogative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«لَيْسَ» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ ناقص", rule: "kaana-sisters" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱللَّهُ",
        analysisParts: [
          { type: 'text', text: "اسْمُ الْجَلَالَةِ " },
          { type: 'link', text: "اسم ليس", rule: "kaana-sisters" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "بِأَحْكَمِ",
        analysisParts: [
          { type: 'link', text: "الْبَاءُ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ زَائِدٌ لِتَأْكِيدِ النَّفْيِ مَبْنِيٌّ عَلَى الْكَسْرِ، و«أَحْكَمُ» " },
          { type: 'link', text: "خَبَرٌ لَيْسَ", rule: "kaana-sisters" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ لَفْظًا", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَنْصُوبٌ مَحَلًّا", rule: "irab-nasb" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْحَٰكِمِينَ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ " },
          { type: 'link', text: "بِالْيَاءِ", rule: "irab-jarr" },
          { type: 'text', text: " لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُذَكَّرِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱسْتِئْنَافِيَّةٌ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "96-1",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 1,
    ayahText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ",
    translationEn: "Read in the name of your Lord who created.",
    rows: [
      {
        segment: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        analysisParts: [
          { type: 'text', text: "تَسْمِيَةٌ (بَسْمَلَةٌ)." },
        ],
      },
      {
        segment: "ٱقْرَأْ",
        analysisParts: [
          { type: 'link', text: "فِعْلُ أَمْرٍ", rule: "verb-imperative" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»." },
        ],
      },
      {
        segment: "بِٱسْمِ",
        analysisParts: [
          { type: 'link', text: "الْبَاءُ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ، و«ٱسْمِ» اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "رَبِّكَ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، و«كَافُ الْمُخَاطَبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ." },
        ],
      },
      {
        segment: "ٱلَّذِى",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ نَعْتٌ لِـ«رَبِّ»." },
        ],
      },
      {
        segment: "خَلَقَ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَالفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
    ],
  },
  {
    id: "96-2",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 2,
    ayahText: "خَلَقَ ٱلْإِنسَٰنَ مِنْ عَلَقٍ",
    translationEn: "Created man from a clinging clot.",
    rows: [
      {
        segment: "خَلَقَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ؛ الفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هو" },
        ],
      },
      {
        segment: "ٱلْإِنسَٰنَ",
        analysisParts: [
                    { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ بِالْفَتْحَةِ" },
        ],
      },
      {
        segment: "مِنْ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
        ],
      },
      {
        segment: "عَلَقٍ",
        analysisParts: [
                    { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بالْكَسْرَةُ الظَّاهِرَةُ، وشِبْهُ جُمْلَةٍ فِي مَحَلِّ نَصْبِ حَالٌ لِـ«ٱلْإِنسَٰنَ»." },
        ],
      },
    ],
  },
  {
    id: "96-3",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 3,
    ayahText: "ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ",
    translationEn: "Recite, and your Lord is the most generous.",
    rows: [
      {
        segment: "ٱقْرَأْ",
        analysisParts: [
                    { type: 'link', text: "فِعْلُ أَمْرٍ", rule: "verb-imperative" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونُ؛ الفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ أَنَّت" },
        ],
      },
      {
        segment: "وَرَبُّكَ",
        analysisParts: [
                    { type: 'text', text: "«الْوَاوُ» حرف حَالٌ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«رَبُّ» " },
          { type: 'link', text: "مُبْتَدَأٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَ«كَافُ الْمُخَاطَبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ." },
        ],
      },
      {
        segment: "ٱلْأَكْرَمُ",
        analysisParts: [
                    { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَالْجُمْلَةُ فِي مَحَلِّ نَصْبِ حَالٌ." },
        ],
      },
    ],
  },
  {
    id: "96-4",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 4,
    ayahText: "ٱلَّذِى عَلَّمَ بِٱلْقَلَمِ",
    translationEn: "Who taught by the pen.",
    rows: [
      {
        segment: "ٱلَّذِى",
        analysisParts: [
                    { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ نَعْتٌ لِـ«ٱلْأَكْرَمُ»." },
        ],
      },
      {
        segment: "عَلَّمَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَالفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "بِٱلْقَلَمِ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: "؛ القَلَمُ: " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بِالْكَسْرَةِ" },
        ],
      },
    ],
  },
  {
    id: "96-5",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 5,
    ayahText: "عَلَّمَ ٱلْإِنسَٰنَ مَا لَمْ يَعْلَمْ",
    translationEn: "Taught man what he did not know.",
    rows: [
      {
        segment: "عَلَّمَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»." },
        ],
      },
      {
        segment: "ٱلْإِنسَٰنَ",
        analysisParts: [
                    { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "مَا",
        analysisParts: [
                    { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبِ مَفْعُولٍ بِهٍ." },
        ],
      },
      {
        segment: "لَمْ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ نَفْيٍ وجزم", rule: "verb-present-jussive-particles" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "يَعْلَمْ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الظَّاهِرُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
    ],
  },
  {
    id: "96-6",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 6,
    ayahText: "كَلَّآ إِنَّ ٱلْإِنسَٰنَ لَيَطْغَىٰٓ",
    translationEn: "No! Indeed, man transgresses.",
    rows: [
      {
        segment: "كَلَّآ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ رَدْعٍ وَزَجْرٍ", rule: "harf-maani" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "إِنَّ",
        analysisParts: [
                    { type: 'link', text: "إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱلْإِنسَٰنَ",
        analysisParts: [
                    { type: 'link', text: "اسْمُ إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "لَيَطْغَىٰٓ",
        analysisParts: [
                    { type: 'link', text: "اللَّامُ الْمَزْحَلَّقَةُ", rule: "verb-present-double-emphasis" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«يَطْغَى» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ فِي مَحَلِّ رَفْعِ خَبَرٌ «إِنَّ»." },
        ],
      },
    ],
  },
  {
    id: "96-7",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 7,
    ayahText: "أَن رَّءَاهُ ٱسْتَغْنَىٰٓ",
    translationEn: "When he sees himself free of need.",
    rows: [
      {
        segment: "أَن",
        analysisParts: [
                    { type: 'link', text: "أَنَّ المصدرية", rule: "masdar" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "رَّءَاهُ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ لِلتَّعَذُّرِ، و«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ أَوَّلٌ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، والمصدر المؤول مِنْ «أَنَّ» وَالْفِعْلُ فِي مَحَلِّ جَرٍّ بحرف محذوف والتقدير لرؤية نفسه مستغنيَاً — انظر " },
          { type: 'link', text: "المصدر المؤول", rule: "masdar" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱسْتَغْنَىٰٓ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ ثَانٍ لِـ«رَأَى»." },
        ],
      },
    ],
  },
  {
    id: "96-8",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 8,
    ayahText: "إِنَّ إِلَىٰ رَبِّكَ ٱلرُّجْعَىٰٓ",
    translationEn: "Indeed, to your Lord is the return.",
    rows: [
      {
        segment: "إِنَّ",
        analysisParts: [
                    { type: 'link', text: "إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "إِلَىٰ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "رَبِّكَ",
        analysisParts: [
                    { type: 'text', text: "اسم مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، وشِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرٌ «إِنَّ» مقدم، و«كَافُ الْمُخَاطَبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ." },
        ],
      },
      {
        segment: "ٱلرُّجْعَىٰٓ",
        analysisParts: [
                    { type: 'link', text: "اسْمُ إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " مؤخر مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الْمُقَدَّرَةُ لِلتَّعَذُّرِ." },
        ],
      },
    ],
  },
  {
    id: "96-9",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 9,
    ayahText: "أَرَءَيْتَ ٱلَّذِى يَنْهَىٰ",
    translationEn: "Have you seen the one who forbids?",
    rows: [
      {
        segment: "أَرَءَيْتَ",
        analysisParts: [
                    { type: 'text', text: "«الْهَمْزَةُ» " },
          { type: 'link', text: "حرف استفهام", rule: "interrogative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«رَأَيْتَ» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِتَاءِ الْفَاعِلِ، وَ«تَاءُ الْفَاعِلِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "ٱلَّذِى",
        analysisParts: [
                    { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبِ مَفْعُولٍ بِهٍ." },
        ],
      },
      {
        segment: "يَنْهَىٰ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
    ],
  },
  {
    id: "96-10",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 10,
    ayahText: "عَبْدًا إِذَا صَلَّىٰٓ",
    translationEn: "A servant when he prays?",
    rows: [
      {
        segment: "عَبْدًا",
        analysisParts: [
                    { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ بِالْفَتْحَةِ" },
        ],
      },
      {
        segment: "إِذَا",
        analysisParts: [
                    { type: 'text', text: "ظَرْفُ زَمَانٍ مَبْنِيٌّ عَلَى السُّكُونُ" },
        ],
      },
      {
        segment: "صَلَّىٰٓ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ." },
        ],
      },
    ],
  },
  {
    id: "96-11",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 11,
    ayahText: "أَرَءَيْتَ إِن كَانَ عَلَى ٱلْهُدَىٰٓ",
    translationEn: "Have you seen if he is on guidance?",
    rows: [
      {
        segment: "أَرَءَيْتَ",
        prompt: "مَا وَظِيفَةُ الْهَمْزَةِ؟ وَمَا بَابُ رَأَيْتَ مِنَ الْمَاضِي؟",
        promptEn: "What is the hamza’s role, and what is the verb’s grammatical form?",
        analysisParts: [
                    { type: 'text', text: "الْهَمْزَةُ: " },
          { type: 'link', text: "حرف استفهام", rule: "interrogative-nouns" },
          { type: 'text', text: "؛ رَأَيْتَ: " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونُ؛ التاء ضَمِيرٌ مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ فَاعِلٌ" },
        ],
      },
      {
        segment: "إِن",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ شَرْطٍ جازم", rule: "verb-present-conditional-particles" },
        ],
      },
      {
        segment: "كَانَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ ناقص", rule: "kaana-sisters" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَزْمٍ فعل الشرط؛ اسْمُ كَانَ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هو" },
        ],
      },
      {
        segment: "عَلَى",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
        ],
      },
      {
        segment: "ٱلْهُدَىٰ",
        analysisParts: [
                    { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بِالْكَسْرَةِ المقدّرة؛ وشِبْهُ جُمْلَةٍ فِي مَحَلِّ نَصْبِ خَبَرُ كَانَ؛ وجَوَابُ الشَّرْطِ محذوف" },
        ],
      },
    ],
  },
  {
    id: "96-12",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 12,
    ayahText: "أَوْ أَمَرَ بِٱلتَّقْوَىٰٓ",
    translationEn: "Or enjoins righteousness?",
    rows: [
      {
        segment: "أَوْ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ عَطْفٍ", rule: "atf" },
        ],
      },
      {
        segment: "أَمَرَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ؛ الفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هو" },
        ],
      },
      {
        segment: "بِٱلتَّقْوَىٰٓ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: "؛ التَّقْوَىٰ: " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " بِالْكَسْرَةِ المقدّرة" },
        ],
      },
    ],
  },
  {
    id: "96-13",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 13,
    ayahText: "أَرَءَيْتَ إِن كَذَّبَ وَتَوَلَّىٰٓ",
    translationEn: "Have you seen if he denies and turns away?",
    rows: [
      {
        segment: "أَرَءَيْتَ",
        analysisParts: [
                    { type: 'text', text: "الْهَمْزَةُ حرف استفهام؛ رَأَيْتَ فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونُ؛ التاء ضَمِيرٌ فِي مَحَلِّ رَفْعِ فَاعِلٌ" },
        ],
      },
      {
        segment: "إِن",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ شَرْطٍ جازم", rule: "verb-present-conditional-particles" },
        ],
      },
      {
        segment: "كَذَّبَ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ جَزْمٍ فعل الشرط، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»." },
        ],
      },
      {
        segment: "وَتَوَلَّىٰٓ",
        analysisParts: [
                    { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«تَوَلَّى» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وجَوَابُ الشَّرْطِ محذوف." },
        ],
      },
    ],
  },
  {
    id: "96-14",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 14,
    ayahText: "أَلَمْ يَعْلَم بِأَنَّ ٱللَّهَ يَرَىٰ",
    translationEn: "Does he not know that Allah sees?",
    rows: [
      {
        segment: "أَلَمْ",
        analysisParts: [
                    { type: 'text', text: "«الْهَمْزَةُ» " },
          { type: 'link', text: "حرف استفهام", rule: "interrogative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«لَمْ» " },
          { type: 'link', text: "حَرْفُ نَفْيٍ وجزم", rule: "verb-present-jussive-particles" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "يَعْلَم",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الظَّاهِرُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»." },
        ],
      },
      {
        segment: "بِأَنَّ",
        analysisParts: [
                    { type: 'link', text: "الْبَاءُ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ، و«أَنَّ» " },
          { type: 'link', text: "إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱللَّهَ",
        analysisParts: [
                    { type: 'text', text: "اسْمُ الْجَلَالَةِ " },
          { type: 'link', text: "اسْمُ إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "يَرَىٰ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلتَّعَذُّرِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ فِي مَحَلِّ رَفْعِ خَبَرٌ «أَنَّ»، والمصدر المؤول مِنْ «أَنَّ» وما بعدها فِي مَحَلِّ جَرٍّ بالْبَاءُ." },
        ],
      },
    ],
  },
  {
    id: "96-15",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 15,
    ayahText: "كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًۢا بِٱلنَّاصِيَةِ",
    translationEn: "No! If he does not desist, We will seize by the forelock.",
    rows: [
      {
        segment: "كَلَّا",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ رَدْعٍ وَزَجْرٍ", rule: "harf-maani" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "لَئِن",
        analysisParts: [
                    { type: 'text', text: "«اللَّامُ» حرف موطئ للقسم مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«إِنَّ» " },
          { type: 'link', text: "حَرْفُ شَرْطٍ جازم", rule: "verb-present-conditional-particles" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "لَّمْ",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ نَفْيٍ وجزم", rule: "verb-present-jussive-particles" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "يَنتَهِ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " فعل الشرط مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ حذف حرف العلّة، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»." },
        ],
      },
      {
        segment: "لَنَسْفَعًۢا",
        analysisParts: [
                    { type: 'text', text: "«اللَّامُ» حرف جواب للقسم مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«نَسْفَعَنْ» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ لاتصاله بنون التوكيد، و«النون» حَرْفُ تَوْكِيدٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «نحن»." },
        ],
      },
      {
        segment: "بِٱلنَّاصِيَةِ",
        analysisParts: [
                    { type: 'link', text: "الْبَاءُ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ، و«ٱلنَّاصِيَةِ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "96-16",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 16,
    ayahText: "نَاصِيَةٍۢ كَٰذِبَةٍ خَاطِئَةٍۢ",
    translationEn: "A lying, sinful forelock.",
    rows: [
      {
        segment: "نَاصِيَةٍۢ",
        analysisParts: [
                    { type: 'text', text: "بَدَلٌ مِنْ «ٱلنَّاصِيَةِ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "كَٰذِبَةٍ",
        analysisParts: [
                    { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "خَاطِئَةٍۢ",
        analysisParts: [
                    { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " ثانٍ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "96-17",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 17,
    ayahText: "فَلْيَدْعُ نَادِيَهُۥ",
    translationEn: "Then let him call his faction.",
    rows: [
      {
        segment: "فَلْيَدْعُ",
        analysisParts: [
                    { type: 'text', text: "الْفَاءُ: الْفَاءُ الْفَصِيحَةُ؛ اللَّامُ: " },
          { type: 'link', text: "لام الأمر", rule: "verb-imperative-li" },
          { type: 'text', text: "؛ يَدْعُ: " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَجْزُومٌ وحذف حرف العلّة؛ الفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هو" },
        ],
      },
      {
        segment: "نَادِيَهُۥ",
        analysisParts: [
                    { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ؛ الهاء ضَمِيرٌ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ" },
        ],
      },
    ],
  },
  {
    id: "96-18",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 18,
    ayahText: "سَنَدْعُ ٱلزَّبَانِيَةَ",
    translationEn: "We will call the angels of Hell.",
    rows: [
      {
        segment: "سَنَدْعُ",
        analysisParts: [
                    { type: 'text', text: "«السين» حرف استقبال مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«نَدْعُ» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلثَّقْلِ عَلَى الْوَاوُ المحذوفة، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «نحن»." },
        ],
      },
      {
        segment: "ٱلزَّبَانِيَةَ",
        analysisParts: [
                    { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
    ],
  },
  {
    id: "96-19",
    surah: 96,
    surahNameAr: "الْعَلَقِ",
    ayah: 19,
    ayahText: "كَلَّا لَا تُطِعْهُ وَٱسْجُدْ وَٱقْتَرِب ۩",
    translationEn: "No! Do not obey him; prostrate and draw near.",
    rows: [
      {
        segment: "كَلَّا",
        analysisParts: [
                    { type: 'link', text: "حَرْفُ رَدْعٍ وَزَجْرٍ", rule: "harf-maani" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "لَا",
        analysisParts: [
                    { type: 'link', text: "حرف نهي وجزم", rule: "verb-present-negation" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "تُطِعْهُ",
        analysisParts: [
                    { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الظَّاهِرُ، و«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»." },
        ],
      },
      {
        segment: "وَٱسْجُدْ",
        analysisParts: [
                    { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱسْجُدْ» " },
          { type: 'link', text: "فِعْلُ أَمْرٍ", rule: "verb-imperative" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»." },
        ],
      },
      {
        segment: "وَٱقْتَرِب",
        analysisParts: [
                    { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱقْتَرِب» " },
          { type: 'link', text: "فِعْلُ أَمْرٍ", rule: "verb-imperative" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «أَنْتَ»." },
        ],
      },
    ],
  },
  /* —— سُورَةُ الْقَدْرِ (٩٧) —— تفصيلٌ كاملٌ */
  {
    id: "97-1",
    surah: 97,
    surahNameAr: "الْقَدْرِ",
    ayah: 1,
    ayahText: "بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِنَّآ أَنزَلْنَٰهُ فِى لَيْلَةِ ٱلْقَدْرِ",
    translationEn: "Indeed, We sent it down during the Night of Decree.",
    rows: [
      {
        segment: "بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        analysisParts: [
          { type: 'text', text: "تَسْمِيَةٌ (بَسْمَلَةٌ)." },
        ],
      },
      {
        segment: "إِنَّآ",
        analysisParts: [
          { type: 'text', text: "«إِنْ»: " },
          { type: 'link', text: "حَرْفُ تَوْكِيدٍ", rule: "inna-sisters" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُشَبَّهٌ بِالْفِعْلِ", rule: "inna-sisters" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَ«نَا»", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "اسْمَ إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أَنزَلْنَٰهُ",
        analysisParts: [
          { type: 'text', text: "«أَنْزَلَ» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِاتِّصَالِهِ بِضَمِيرِ رَفْعٍ مُتَحَرِّكٍ", rule: "verb-past" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَ«نَا»", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَ«الْهَاءُ»", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الضَّمِّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْجُمْلَةُ الْفِعْلِيَّةُ", rule: "verbal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "خَبَرٌ", rule: "inna-sisters" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِفِعْلٍ مُشَبَّهٍ", rule: "inna-sisters" },
          { type: 'text', text: " (أَوْ لِلْمَرْفُوعِ مَعَهُ) «إِنْ»" },
        ],
      },
      {
        segment: "فِى لَيْلَةِ",
        analysisParts: [
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِأَنْزَلْنَاهُ", rule: "verb-past" },
          { type: 'text', text: ". «فِي» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: "، وَ«لَيْلَةِ» " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَمُضَافٌ", rule: "idafah" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْقَدْرِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: "، وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ. " },
          { type: 'link', text: "وَٱلْجُمْلَةُ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱسْتِئْنَافِيَّةٌ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "97-2",
    surah: 97,
    surahNameAr: "الْقَدْرِ",
    ayah: 2,
    ayahText: "وَمَآ أَدْرَىٰكَ مَا لَيْلَةُ ٱلْقَدْرِ",
    translationEn: "And what can make you know what is the Night of Decree?",
    rows: [
      {
        segment: "وَمَآ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " " },
          { type: 'link', text: "حَرْفُ عَطْفٍ", rule: "atf" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَ«مَا»", rule: "interrogative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "اسْمُ اسْتِفْهَامٍ", rule: "interrogative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُبْتَدَأٍ", rule: "nominal-sentence" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أَدْرَىٰكَ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحَةِ الْمُقَدَّرَةِ عَلَى الْأَلِفِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَمَنَعَ مِنْ ظُهُورِهَا التَّعَذُّرُ", rule: "mabni-muarab" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْفَاعِلُ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُسْتَتِرٌ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِيهِ الْجَوَازُ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "تَقْدِيرُهُ: هُوَ", rule: "fael" },
          { type: 'text', text: " " },
          { type: 'link', text: "يَعُودُ عَلَى «مَا»", rule: "pronouns" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَ«الْكَافُ»", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: ". (يَجْرِي مَجْرَى «" },
          { type: 'link', text: "وَمَا أَدْرَاكَ مَا الْحَاقَّةُ", rule: "interrogative-nouns" },
          { type: 'text', text: "» فِي سُورَةِ الْحَاقَّةِ (٣).) " },
        ],
      },
      {
        segment: "مَا",
        analysisParts: [
          { type: 'link', text: "اسْمُ اسْتِفْهَامٍ", rule: "interrogative-nouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُبْتَدَأٍ", rule: "nominal-sentence" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "لَيْلَةُ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِلْمَبْتَدَأِ «مَا»", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَمُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ رَفْعِهِ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "الضَّمَّةُ الظَّاهِرَةُ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-raf" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَٱلْجُمْلَةُ الْإِسْمِيَّةُ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ نَصْبٍ", rule: "irab-nasb" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " " },
          { type: 'link', text: "ثَانٍ", rule: "mafool" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِلْفِعْلِ «أَدْرَىٰ»", rule: "verb-past" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْقَدْرِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "الْكَسْرَةُ الظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "97-3",
    surah: 97,
    surahNameAr: "الْقَدْرِ",
    ayah: 3,
    ayahText: "لَيْلَةُ ٱلْقَدْرِ خَيْرٌۭ مِّنْ أَلْفِ شَهْرٍۢ",
    translationEn: "The Night of Decree is better than a thousand months.",
    rows: [
      {
        segment: "لَيْلَةُ",
        analysisParts: [
          { type: 'link', text: "مُبْتَدَأٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَمُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ رَفْعِهِ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "الضَّمَّةُ الظَّاهِرَةُ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-raf" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْقَدْرِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "الْكَسْرَةُ الظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "خَيْرٌۭ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ رَفْعِهِ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "الضَّمَّةُ الظَّاهِرَةُ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-raf" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "مِّنْ",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌّ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أَلْفِ",
        analysisParts: [
          { type: 'link', text: "ٱسْمٌ", rule: "noun" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِمِنْ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَهُوَ", rule: "noun" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "الْكَسْرَةُ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "شَهْرٍۢ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "الْكَسْرَةُ الظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
    ],
  },
  {
    id: "97-4",
    surah: 97,
    surahNameAr: "الْقَدْرِ",
    ayah: 4,
    ayahText: "تَنَزَّلُ ٱلْمَلَٰٓئِكَةُ وَٱلرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍۢ",
    translationEn: "The angels and the Spirit descend therein by permission of their Lord for every matter.",
    rows: [
      {
        segment: "تَنَزَّلُ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ رَفْعِهِ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "الضَّمَّةُ الظَّاهِرَةُ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-raf" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَٱلْجُمْلَةُ الْفِعْلِيَّةُ", rule: "verbal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "ثَانٍ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "لِلْمَبْتَدَأِ «لَيْلَةِ ٱلْقَدْرِ»", rule: "nominal-sentence" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْمَلَٰٓئِكَةُ",
        analysisParts: [
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "وَٱلرُّوحُ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱلرُّوحُ» مَعْطُوفٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "فِيهَا",
        analysisParts: [
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِتَنَزَّلُ", rule: "verb-present" },
          { type: 'text', text: ". " },
          { type: 'text', text: "«فِي» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَٱلْمُلْحَقُ: " },
          { type: 'text', text: "«ٱلْهَاءُ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى السُّكُونِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ جَرٍّ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "بِإِذْنِ رَبِّهِم",
        analysisParts: [
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِحَالٍ مَحْذُوفَةٍ", rule: "tawabi" },
          { type: 'text', text: " " },
          { type: 'link', text: "مِنَ ٱلْمَلَائِكَةِ", rule: "fael" },
          { type: 'text', text: " (أَي: " },
          { type: 'text', text: "مُسَيَّرِينَ). " },
          { type: 'text', text: "«ٱلْبَاءُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَٱلْمَجْرُورُ: " },
          { type: 'text', text: "«إِذْنٌ» " },
          { type: 'link', text: "ٱسْمٌ مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَٱلْمُرَكَّبُ: " },
          { type: 'text', text: "رَبٌ " },
          { type: 'link', text: "مُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَٱلْمُلْحَقُ: " },
          { type: 'text', text: "«ٱلْهَاءُ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ جَرٍّ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُضَافٌ إِلَيْهٍ", rule: "idafah" },
          { type: 'text', text: ". " },
          { type: 'text', text: "وَٱلْمِيمُ " },
          { type: 'link', text: "لِلْجَمَاعَةِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "مِّن كُلِّ",
        analysisParts: [
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقَانِ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِتَنَزَّلُ", rule: "verb-present" },
          { type: 'text', text: ". " },
          { type: 'text', text: "«مِنْ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَٱلْمَجْرُورُ: " },
          { type: 'text', text: "«كُلِّ» " },
          { type: 'link', text: "ٱسْمٌ مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَٱلْمُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلْكَسْرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أَمْرٍۢ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "97-5",
    surah: 97,
    surahNameAr: "الْقَدْرِ",
    ayah: 5,
    ayahText: "سَلَٰمٌ هِىَ حَتَّىٰ مَطْلَعِ ٱلْفَجْرِ",
    translationEn: "Peace it is until the emergence of dawn.",
    rows: [
      {
        segment: "سَلَٰمٌ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُقَدَّمٌ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَرْفُوعٌ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ رَفْعِهِ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "الضَّمَّةُ الظَّاهِرَةُ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-raf" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "هِىَ",
        analysisParts: [
          { type: 'link', text: "ضَمِيرٌ مُنْفَصِلٌ", rule: "detached-pronouns" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَبْنِيٌ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" },
          { type: 'text', text: " " },
          { type: 'link', text: "فِي مَحَلِّ رَفْعٍ", rule: "irab-raf" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُبْتَدَأٍ", rule: "nominal-sentence" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُؤَخَّرٍ", rule: "nominal-sentence" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "حَتَّىٰ",
        analysisParts: [
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'text', text: "وَغَايَةٌ." },
        ],
      },
      {
        segment: "مَطْلَعِ",
        analysisParts: [
          { type: 'link', text: "ٱسْمٌ", rule: "noun" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِحَتَّىٰ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَٱلْمُضَافٌ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلْكَسْرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْفَجْرِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " " },
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "وَعَلَامَةُ جَرِّهِ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلْكَسْرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱلظَّاهِرَةُ", rule: "irab-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْجَارُّ وَالْمَجْرُورُ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "مُتَعَلِّقٌ", rule: "harf-jarr" },
          { type: 'text', text: " " },
          { type: 'link', text: "بِتَنَزَّلُ", rule: "verb-present" },
          { type: 'text', text: ". " },
          { type: 'link', text: "وَالْجُمْلَةُ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "ٱسْتِئْنَافِيَّةٌ", rule: "sentence-structure" },
          { type: 'text', text: " " },
          { type: 'link', text: "لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ", rule: "sentence-structure" },
          { type: 'text', text: "." },
        ],
      }
    ],
  },
  /* —— سُورَةُ الْبَيْنَةِ (٩٨) —— */
  {
    id: "98-1",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 1,
    ayahText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ لَمْ يَكُنِ ٱلَّذِينَ كَفَرُوا۟ مِنْ أَهْلِ ٱلْكِتَٰبِ وَٱلْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ ٱلْبَيِّنَةُ",
    translationEn: "Those who disbelieved among the People of the Book and the polytheists were not to be parted until the clear proof came to them.",
    rows: [
      {
        segment: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        analysisParts: [{ type: 'text', text: "تَسْمِيَةٌ (بَسْمَلَةٌ)." }],
      },
      {
        segment: "لَمْ",
        analysisParts: [
          { type: 'link', text: "حَرْفُ نَفْيٍ وجزم", rule: "verb-present-jussive-particles" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "يَكُنِ",
        analysisParts: [
          { type: 'link', text: "فعل مُضَارِعٌ نَاقِصٌ", rule: "kaana-sisters" },
          { type: 'text', text: " مَجْزُومٌ وَعَلَامَةُ جَزْمِهِ السُّكُونُ الْمُقَدَّرُ لالتقاء الساكنين." },
        ],
      },
      {
        segment: "ٱلَّذِينَ",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ اسم «كَانَ»." },
        ],
      },
      {
        segment: "كَفَرُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "مِنْ",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "أَهْلِ",
        analysisParts: [
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْكِتَٰبِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "وَٱلْمُشْرِكِينَ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱلْمُشْرِكِينَ» مَعْطُوفٌ عَلَى «أَهْلِ» مَجْرُورٌ وَعَلَامَةُ جَرِّهِ اليَاء لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُذَكَّرِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "مُنفَكِّينَ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ كَانَ", rule: "kaana-sisters" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْيَاءُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ." },
        ],
      },
      {
        segment: "حَتَّىٰ",
        analysisParts: [
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "تَأْتِيَهُمُ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَنْصُوبٌ بأَنَّ مضمرة وعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ، و«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ الْمُقَدَّرِ لِالْتِقَاءِ السَّاكِنَيْنِ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ." },
        ],
      },
      {
        segment: "ٱلْبَيِّنَةُ",
        analysisParts: [
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-2",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 2,
    ayahText: "رَسُولٌۭ مِّنَ ٱللَّهِ يَتْلُوا۟ صُحُفًۭا مُّطَهَّرَةًۭ",
    translationEn: "A Messenger from Allah, reciting purified scriptures.",
    rows: [
      {
        segment: "رَسُولٌۭ",
        analysisParts: [
          { type: 'text', text: "بَدَلٌ مِنْ «ٱلْبَيْنَةِ» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "مِّنَ",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ الْمُقَدَّرِ لِالْتِقَاءِ السَّاكِنَيْنِ." },
        ],
      },
      {
        segment: "ٱللَّهِ",
        analysisParts: [
          { type: 'text', text: "اسْمُ الْجَلَالَةِ اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "يَتْلُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلثَّقْلِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هُوَ»." },
        ],
      },
      {
        segment: "صُحُفًۭا",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "مُّطَهَّرَةًۭ",
        analysisParts: [
          { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
    ],
  },
  {
    id: "98-3",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 3,
    ayahText: "فِيهَا كُتُبٌۭ قَيِّمَةٌۭ",
    translationEn: "Within them are correct scriptures.",
    rows: [
      {
        segment: "فِيهَا",
        analysisParts: [
          { type: 'text', text: "«فِي» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ، وشِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرٌ مُقَدَّمٌ." },
        ],
      },
      {
        segment: "كُتُبٌۭ",
        analysisParts: [
          { type: 'link', text: "مُبْتَدَأٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مؤخر مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَالْجُمْلَةُ فِي مَحَلِّ نَصْبِ نَعْتٌ ثانٍ لِـ«صُحُفًا»." },
        ],
      },
      {
        segment: "قَيِّمَةٌۭ",
        analysisParts: [
          { type: 'link', text: "نَعْتٌ", rule: "naat" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-4",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 4,
    ayahText: "وَمَا تَفَرَّقَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَٰبَ إِلَّا مِنۢ بَعْدِ مَا جَآءَتْهُمُ ٱلْبَيِّنَةُ",
    translationEn: "Nor did those who were given the Scripture become divided until the clear proof had come to them.",
    rows: [
      {
        segment: "وَمَا",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«مَا» حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "تَفَرَّقَ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱلَّذِينَ",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "أُوتُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ مجهول", rule: "verb-past-passive" },
          { type: 'text', text: " مَبْنِيٌّ لما لم يسم فَاعِلٌه مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ نَائِبُ فَاعِلٍ، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "ٱلْكِتَٰبَ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " ثانٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "إِلَّا",
        analysisParts: [
          { type: 'link', text: "حرف استثناء", rule: "istithna" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "مِنۢ",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "بَعْدِ",
        analysisParts: [
          { type: 'text', text: "اسم ظرفِي مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "مَا",
        analysisParts: [
          { type: 'text', text: "حَرْفُ مَصْدَرِيَّةٍ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "جَآءَتْهُمُ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«التاء» حَرْفُ تَأْنِيثٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ الْمُقَدَّرِ لِالْتِقَاءِ السَّاكِنَيْنِ فِي مَحَلِّ نَصْبِ مَفْعُولٌ بِهٍ، والمصدر المؤول مِنْ «مَا» وَالْفِعْلُ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ — انظر " },
          { type: 'link', text: "المصدر المؤول", rule: "masdar" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "ٱلْبَيِّنَةُ",
        analysisParts: [
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-5",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 5,
    ayahText: "وَمَآ أُمِرُوٓا۟ إِلَّا لِيَعْبُدُوا۟ ٱللَّهَ مُخْلِصِينَ لَهُ ٱلدِّينَ حُنَفَآءَ وَيُقِيمُوا۟ ٱلصَّلَوٰةَ وَيُؤْتُوا۟ ٱلزَّكَوٰةَ ۚ وَذَٰلِكَ دِينُ ٱلْقَيِّمَةِ",
    translationEn: "And they were not commanded except to worship Allah, sincere to Him in religion, inclining to truth, and to establish prayer and give zakah. That is the correct religion.",
    rows: [
      {
        segment: "وَمَآ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«مَا» حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "أُمِرُوٓا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ مجهول", rule: "verb-past-passive" },
          { type: 'text', text: " مَبْنِيٌّ لما لم يسم فَاعِلٌه مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ نَائِبُ فَاعِلٍ." },
        ],
      },
      {
        segment: "إِلَّا",
        analysisParts: [
          { type: 'link', text: "حرف استثناء", rule: "istithna" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "لِيَعْبُدُوا۟",
        analysisParts: [
          { type: 'text', text: "«اللَّامُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْكَسْرِ، و«يَعْبُدُوا» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَنْصُوبٌ بِأَنْ مَضْمُورَةٍ وَعَلَامَةُ نَصْبِهِ حَذْفُ النُّونِ لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "ٱللَّهَ",
        analysisParts: [
          { type: 'text', text: "اسْمُ الْجَلَالَةِ " },
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "مُخْلِصِينَ",
        analysisParts: [
          { type: 'link', text: "حَالٌ", rule: "tawabi" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْيَاءُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ." },
        ],
      },
      {
        segment: "لَهُ",
        analysisParts: [
          { type: 'text', text: "«اللَّامُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«هَاءُ الْغَائِبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ." },
        ],
      },
      {
        segment: "ٱلدِّينَ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ لاسم الفَاعِلٌ «مُخْلِصِينَ»." },
        ],
      },
      {
        segment: "حُنَفَآءَ",
        analysisParts: [
          { type: 'link', text: "حَالٌ", rule: "tawabi" },
          { type: 'text', text: " ثانية مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "وَيُقِيمُوا۟",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«يُقِيمُوا» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَعْطُوفٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ حَذْفُ النُّونِ لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "ٱلصَّلَوٰةَ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "وَيُؤْتُوا۟",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«يُؤْتُوا» " },
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَعْطُوفٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ حَذْفُ النُّونِ لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "ٱلزَّكَوٰةَ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "وَذَٰلِكَ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "harf-maani" },
          { type: 'text', text: " حَرْفُ اسْتِئْنَافٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ذَلِكَ» " },
          { type: 'link', text: "اسْمُ إِشَارَةٍ", rule: "demonstratives" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٌ." },
        ],
      },
      {
        segment: "دِينُ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْقَيِّمَةِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-6",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 6,
    ayahText: "إِنَّ ٱلَّذِينَ كَفَرُوا۟ مِنْ أَهْلِ ٱلْكِتَٰبِ وَٱلْمُشْرِكِينَ فِى نَارِ جَهَنَّمَ خَٰلِدِينَ فِيهَآ ۚ أُو۟لَٰٓئِكَ هُمْ شَرُّ ٱلْبَرِيَّةِ",
    translationEn: "Indeed, those who disbelieved among the People of the Book and the polytheists will be in the Fire of Hell, abiding therein eternally. They are the worst of creatures.",
    rows: [
      {
        segment: "إِنَّ",
        analysisParts: [
          { type: 'link', text: "إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱلَّذِينَ",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ نَصْبِ اسم «إِنَّ»." },
        ],
      },
      {
        segment: "كَفَرُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "مِنْ",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "أَهْلِ",
        analysisParts: [
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْكِتَٰبِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "وَٱلْمُشْرِكِينَ",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«ٱلْمُشْرِكِينَ» مَعْطُوفٌ عَلَى «أَهْلِ» مَجْرُورٌ وَعَلَامَةُ جَرِّهِ اليَاء لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُذَكَّرِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "فِى",
        analysisParts: [
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "نَارِ",
        analysisParts: [
          { type: 'link', text: "مَجْرُورٌ", rule: "irab-jarr" },
          { type: 'text', text: " وعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، وشِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرٌ «إِنَّ»." },
        ],
      },
      {
        segment: "جَهَنَّمَ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ الظَّاهِرَةُ لِأَنَّهُ " },
          { type: 'link', text: "الممِنْوع مِنْ الصرف", rule: "mamnu-sarf" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "خَٰلِدِينَ",
        analysisParts: [
          { type: 'link', text: "حَالٌ", rule: "tawabi" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْيَاءُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ." },
        ],
      },
      {
        segment: "فِيهَآ",
        analysisParts: [
          { type: 'text', text: "«فِي» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ." },
        ],
      },
      {
        segment: "أُو۟لَٰٓئِكَ",
        analysisParts: [
          { type: 'link', text: "اسْمُ إِشَارَةٍ", rule: "demonstratives" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْكَسْرِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٌ." },
        ],
      },
      {
        segment: "هُمْ",
        analysisParts: [
          { type: 'text', text: "ضَمِيرٌ فصل مَبْنِيٌّ عَلَى السُّكُونُ لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "شَرُّ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "ٱلْبَرِيَّةِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-7",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 7,
    ayahText: "إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ أُو۟لَٰٓئِكَ هُمْ خَيْرُ ٱلْبَرِيَّةِ",
    translationEn: "Indeed, those who believed and did righteous deeds — they are the best of creatures.",
    rows: [
      {
        segment: "إِنَّ",
        analysisParts: [
          { type: 'link', text: "إِنَّ", rule: "inna-sisters" },
          { type: 'text', text: " حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱلَّذِينَ",
        analysisParts: [
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ نَصْبِ اسم «إِنَّ»." },
        ],
      },
      {
        segment: "ءَامَنُوا۟",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "وَعَمِلُوا۟",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«عَمِلُوا» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ لِاتِّصَالِهِ بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "ٱلصَّٰلِحَٰتِ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْكَسْرَةُ الظَّاهِرَةُ لِأَنَّهُ " },
          { type: 'link', text: "جَمْعُ الْمُؤَنَّثِ السَّالِمِ", rule: "number-plural" },
          { type: 'text', text: "." },
        ],
      },
      {
        segment: "أُو۟لَٰٓئِكَ",
        analysisParts: [
          { type: 'link', text: "اسْمُ إِشَارَةٍ", rule: "demonstratives" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْكَسْرِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٌ." },
        ],
      },
      {
        segment: "هُمْ",
        analysisParts: [
          { type: 'text', text: "ضَمِيرٌ فصل مَبْنِيٌّ عَلَى السُّكُونُ لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "خَيْرُ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَالْجُمْلَةُ فِي مَحَلِّ رَفْعِ خَبَرٌ «إِنَّ»." },
        ],
      },
      {
        segment: "ٱلْبَرِيَّةِ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
    ],
  },
  {
    id: "98-8",
    surah: 98,
    surahNameAr: "الْبَيْنَةِ",
    ayah: 8,
    ayahText: "جَزَآؤُهُمْ عِندَ رَبِّهِمْ جَنَّٰتُ عَدْنٍۢ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَٰرُ خَٰلِدِينَ فِيهَآ أَبَدًۭا ۖ رَّضِىَ ٱللَّهُ عَنْهُمْ وَرَضُوا۟ عَنْهُ ۚ ذَٰلِكَ لِمَنْ خَشِىَ رَبَّهُۥ",
    translationEn: "Their reward with their Lord will be Gardens of perpetual residence beneath which rivers flow, abiding therein forever. Allah will be pleased with them, and they with Him. That is for whoever fears his Lord.",
    rows: [
      {
        segment: "جَزَآؤُهُمْ",
        analysisParts: [
          { type: 'link', text: "مُبْتَدَأٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَ«هَاءُ الْغَائِبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ مُضَافٍ إِلَيْهِ." },
        ],
      },
      {
        segment: "عِندَ",
        analysisParts: [
          { type: 'text', text: "ظَرْفُ مَكَانٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "رَبِّهِمْ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، و«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ مُضَافٍ إِلَيْهِ." },
        ],
      },
      {
        segment: "جَنَّٰتُ",
        analysisParts: [
          { type: 'link', text: "خَبَرٌ", rule: "nominal-sentence" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "عَدْنٍۢ",
        analysisParts: [
          { type: 'link', text: "مُضَافٌ إِلَيْهِ", rule: "idafah" },
          { type: 'text', text: " مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "تَجْرِى",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مُضَارِعٌ", rule: "verb-present" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الْمُقَدَّرَةُ لِلثَّقْلِ." },
        ],
      },
      {
        segment: "مِن",
        analysisParts: [
          { type: 'link', text: "مِنْ", rule: "harf-jarr" },
          { type: 'text', text: " حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ." },
        ],
      },
      {
        segment: "تَحْتِهَا",
        analysisParts: [
          { type: 'text', text: "اسم ظرفِي مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ، و«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ مُضَافٍ إِلَيْهِ." },
        ],
      },
      {
        segment: "ٱلْأَنْهَٰرُ",
        analysisParts: [
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَالْجُمْلَةُ فِي مَحَلِّ نَصْبِ حَالٌ." },
        ],
      },
      {
        segment: "خَٰلِدِينَ",
        analysisParts: [
          { type: 'link', text: "حَالٌ", rule: "tawabi" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْيَاءُ لِأَنَّهُ جَمْعُ مُذَكَّرٍ سَالِمٍ." },
        ],
      },
      {
        segment: "فِيهَآ",
        analysisParts: [
          { type: 'text', text: "«فِي» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ." },
        ],
      },
      {
        segment: "أَبَدًۭا",
        analysisParts: [
          { type: 'text', text: "ظَرْفُ زَمَانٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ." },
        ],
      },
      {
        segment: "رَّضِىَ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ." },
        ],
      },
      {
        segment: "ٱللَّهُ",
        analysisParts: [
          { type: 'text', text: "اسْمُ الْجَلَالَةِ " },
          { type: 'link', text: "فَاعِلٌ", rule: "fael" },
          { type: 'text', text: " مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ." },
        ],
      },
      {
        segment: "عَنْهُمْ",
        analysisParts: [
          { type: 'text', text: "«عَنْ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ." },
        ],
      },
      {
        segment: "وَرَضُوا۟",
        analysisParts: [
          { type: 'link', text: "الْوَاوُ", rule: "atf" },
          { type: 'text', text: " حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ«رَضُوا» " },
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ الْمُقَدَّرُ عَلَى الألف المحذوفة لاتصاله بِوَاوِ الْجَمَاعَةِ، وَ«وَاوُ الْجَمَاعَةِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-verbs" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعِ فَاعِلٌ." },
        ],
      },
      {
        segment: "عَنْهُ",
        analysisParts: [
          { type: 'text', text: "«عَنْ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ، وَ«هاء الغائب» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ." },
        ],
      },
      {
        segment: "ذَٰلِكَ",
        analysisParts: [
          { type: 'link', text: "اسْمُ إِشَارَةٍ", rule: "demonstratives" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ مُبْتَدَأٌ." },
        ],
      },
      {
        segment: "لِمَنْ",
        analysisParts: [
          { type: 'text', text: "«اللَّامُ» " },
          { type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْكَسْرِ، و«مَنْ» " },
          { type: 'link', text: "اسْمٌ مَوْصُولٌ", rule: "relative-nouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ، وشِبْهُ جُمْلَةٍ فِي مَحَلِّ رَفْعِ خَبَرِ الْمُبْتَدَأِ." },
        ],
      },
      {
        segment: "خَشِىَ",
        analysisParts: [
          { type: 'link', text: "فِعْلٌ مَاضٍ", rule: "verb-past" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الْفَتْحِ، وَالفَاعِلٌ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ «هو»، وَالْجُمْلَةُ " },
          { type: 'link', text: "صِلَةُ الْمَوْصُولِ", rule: "silah-mawsul" },
          { type: 'text', text: " لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ." },
        ],
      },
      {
        segment: "رَبَّهُۥ",
        analysisParts: [
          { type: 'link', text: "مَفْعُولٌ بِهٍ", rule: "mafool" },
          { type: 'text', text: " مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ، وَ«هَاءُ الْغَائِبِ» " },
          { type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" },
          { type: 'text', text: " مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ." },
        ],
      },
    ],
  },

  {
    id: '112-1',
    surah: 112,
    surahNameAr: 'الْإِخْلَاصِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ هُوَ ٱللَّهُ أَحَدٌ',
    translationEn: 'Say: He is Allah, [the] One.',
    rows: [
      {
        segment: 'قُلْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ وُجُوبًا تَقْدِيرُهُ «أَنْتَ»؛ وَجُمْلَةُ «قُلْ» اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
      {
        segment: 'هُوَ',
        analysisParts: [
          { type: 'link', text: 'ضَمِيرٌ مُنْفَصِلٌ', rule: 'detached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعِ ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'ٱللَّهُ',
        analysisParts: [
          { type: 'text', text: 'اسْمُ الْجَلَالَةِ ' },
          { type: 'link', text: 'خَبَرٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' لِـ«هُوَ» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ.' },
        ],
      },
      {
        segment: 'أَحَدٌ',
        analysisParts: [
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          {
            type: 'text',
            text: ' مِنْ لَفْظِ الْجَلَالَةِ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ؛ وَالْجُمْلَةُ بَعْدَ «قُلْ» فِي مَحَلِّ نَصْبٍ مَقُولِ الْقَوْلِ.',
          },
        ],
      },
    ],
  },
  {
    id: '112-2',
    surah: 112,
    surahNameAr: 'الْإِخْلَاصِ',
    ayah: 2,
    ayahText: 'ٱللَّهُ ٱلصَّمَدُ',
    translationEn: 'Allah, the Eternal Refuge.',
    rows: [
      {
        segment: 'ٱللَّهُ',
        analysisParts: [
          { type: 'text', text: 'اسْمُ الْجَلَالَةِ ' },
          { type: 'link', text: 'مُبْتَدَأٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' مَرْفُوعٌ لِلتَّعْظِيمِ بِالضَّمَّةِ.' },
        ],
      },
      {
        segment: 'ٱلصَّمَدُ',
        analysisParts: [
          { type: 'link', text: 'خَبَرٌ', rule: 'nominal-sentence' },
          { type: 'text', text: ' لِـ«ٱللَّهُ» مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ؛ وَالْجُمْلَةُ اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },
  {
    id: '112-3',
    surah: 112,
    surahNameAr: 'الْإِخْلَاصِ',
    ayah: 3,
    ayahText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    translationEn: 'He has not begotten, nor is He begotten.',
    rows: [
      {
        segment: 'لَمْ',
        analysisParts: [
          { type: 'link', text: 'لم', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ مَبْنِيٌّ عَلَى السُّكُونِ.' },
        ],
      },
      {
        segment: 'يَلِدْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'مَجْزُومٌ', rule: 'irab-jazm' },
          { type: 'text', text: ' بِ«لَمْ» وَعَلَامَةُ جَزْمِهِ سُكُونُ آخِرِهِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ».' },
        ],
      },
      {
        segment: 'وَلَمْ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ' },
          { type: 'link', text: 'لم', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ مَبْنِيٌّ عَلَى السُّكُونِ.' },
        ],
      },
      {
        segment: 'يُولَدْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ' },
          { type: 'link', text: 'مَبْنِيٌّ للمجهول', rule: 'verb-present-passive' },
          { type: 'text', text: '؛ ' },
          { type: 'link', text: 'مَجْزُومٌ', rule: 'irab-jazm' },
          {
            type: 'text',
            text: ' بِ«لَمْ» وَعَلَامَةُ جَزْمِهِ سُكُونُ آخِرِهِ؛ وَ' },
          { type: 'link', text: 'نَائِبُ الْفَاعِلِ', rule: 'verb-passive-overview' },
          {
            type: 'text',
            text: ' ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ»؛ وَالْجُمْلَةُ الْفِعْلِيَّةُ «لَمْ يَلِدْ» فِي مَحَلِّ رَفْعٍ خَبَرٌ ثَانٍ لِلَفْظِ الْجَلَالَةِ؛ وَ«لَمْ يُولَدْ» مَعْطُوفَةٌ عَلَيْهَا فِي مَحَلِّ رَفْعٍ.',
          },
        ],
      },
    ],
  },
  {
    id: '112-4',
    surah: 112,
    surahNameAr: 'الْإِخْلَاصِ',
    ayah: 4,
    ayahText: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
    translationEn: 'Nor is there to Him any equivalent.',
    rows: [
      {
        segment: 'وَلَمْ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ' },
          { type: 'link', text: 'لم', rule: 'verb-present-jussive-particles' },
          { type: 'text', text: ' حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ مَبْنِيٌّ عَلَى السُّكُونِ.' },
        ],
      },
      {
        segment: 'يَكُن',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' ناقص ' },
          { type: 'link', text: 'مَجْزُومٌ', rule: 'irab-jazm' },
          { type: 'text', text: ' بِ«لَمْ» وَعَلَامَةُ جَزْمِهِ سُكُونُ آخِرِهِ — انظر ' },
          { type: 'link', text: 'كَانَ وأخواتها', rule: 'kaana-sisters' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'لَهُۥ',
        analysisParts: [
          { type: 'link', text: 'اللَّامُ', rule: 'harf-jarr' },
          {
            type: 'text',
            text: ' حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْفَتْحِ، وَ' },
          { type: 'link', text: 'هاء الغائب', rule: 'attached-pronouns' },
          {
            type: 'text',
            text: ' ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْحَرْفِ؛ وَ«لَهُ» جَارٌ وَمَجْرُورٌ مُتَعَلِّقَانِ بِالْخَبَرِ.',
          },
        ],
      },
      {
        segment: 'كُفُوًا',
        analysisParts: [
          { type: 'link', text: 'خَبَرُ كَانَ', rule: 'kaana-sisters' },
          { type: 'text', text: ' لِـ«يَكُنْ» مُقَدَّمٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةَ الظَّاهِرَةَ.' },
        ],
      },
      {
        segment: 'أَحَدٌۢ',
        analysisParts: [
          { type: 'link', text: 'اسْمُ كَانَ', rule: 'kaana-sisters' },
          {
            type: 'text',
            text: ' لِـ«يَكُنْ» مُؤَخَّرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ؛ وَجُمْلَةُ «لَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ» مَعْطُوفَةٌ عَلَى جُمْلَةِ «لَمْ يَلِدْ» فِي مَحَلِّ رَفْعٍ.',
          },
        ],
      },
    ],
  },
  {
    id: '113-1',
    surah: 113,
    surahNameAr: 'الْفَلَقِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
    translationEn: 'Say: I seek refuge in the Lord of daybreak.',
    rows: [
      {
        segment: 'قُلْ',
        analysisEn: `Imperative verb, fixed on sukūn.

👉 “Imperative verb, fixed with sukoon.” It is a command verb (like: say!). مبني means the ending does not change (always sukūn).

👉 “The doer is hidden = ‘you’.” Who is told to speak? You (the Prophet ﷺ). It is not written, but understood.`,
        analysisParts: [
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ وُجُوبًا تَقْدِيرُهُ: أَنْتَ.',
          },
        ],
      },
      {
        segment: 'أَعُوذُ',
        analysisEn: `Present verb, marfūʿ; the sign of rafʿ is ḍammah.

👉 “Present verb, in the rafʿ state; sign = ḍammah.” Nothing here is forcing manṣūb or majzūm, so it stays in the default marfūʿ shape.

👉 “The doer is hidden = ‘I’.” Who seeks refuge? I.`,
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          {
            type: 'text',
            text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ وُجُوبًا تَقْدِيرُهُ: أَنَا.',
          },
        ],
      },
      {
        segment: 'بِرَبِّ',
        analysisEn: `Jār and majrūr, both connected to the verb (أَعُوذ).

👉 “Preposition + noun, attached to the verb.” بِ is the preposition; رَبِّ is majrūr (kasrah) because of بِ.

👉 متعلقان بأعوذ means this phrase depends on the verb → “I seek refuge in the Lord.”`,
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'ٱلْفَلَقِ',
        analysisEn: `Mudāf ilayh, majrūr — the second half of the iḍāfah (“possessive” phrase).

👉 “Second part of a possessive phrase, in jarr.” رَبِّ means “Lord of…” and needs completion; الْفَلَقِ supplies “daybreak.”

👉 So رَبِّ الْفَلَقِ = Lord of daybreak.`,
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'جُمْلَةُ «قُلْ»',
        analysisEn: `The clause «Say!» is mustaʾnaf — independent — lā maḥalla: “no grammatical position” inside another clause.

👉 It is simply a new opening sentence, not working as subject, object, or predicate of something else here.`,
        analysisParts: [
          { type: 'text', text: 'اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
      {
        segment: '«أَعُوذُ» وَمَا بَعْدَهَا',
        analysisEn: `Sentence-level iʿrāb (the part that often feels confusing): the verbal sentence «I seek refuge…» and what follows sits fi maḥall naṣb as mafʿūl — maqūl al-qawl (“what is said”).

👉 “قُلْ” = say → it needs something to say. That “something” is أَعُوذُ بِرَبِّ الْفَلَقِ.

👉 So grammatically the whole clause is the object of “say.” This is maqūl al-qawl — quoted / reported speech.

👉 “Fi maḥall naṣb” names the clause’s syntactic role, not a visible fatḥah on every word.`,
        analysisParts: [
          { type: 'text', text: 'الْجُمْلَةُ الْفِعْلِيَّةُ «أَعُوذُ» وَمَا بَعْدَهَا فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' «مَقُولُ الْقَوْلِ».' },
        ],
      },
    ],
  },
  {
    id: '113-2',
    surah: 113,
    surahNameAr: 'الْفَلَقِ',
    ayah: 2,
    ayahText: 'مِن شَرِّ مَا خَلَقَ',
    translationEn: 'From the evil of what He created.',
    rows: [
      {
        segment: 'مِن شَرِّ',
        analysisEn: `min sharri — preposition + noun in the genitive, tied back to the implied verb of seeking refuge (aʿūdhu) from 113:1.

👉 “Jār and majrūr,” both linked to «I seek refuge»: مِنْ introduces the phrase; شَرٌّ is majrūr (kasrah) after it.`,
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'مَا',
        analysisEn: `mā — relative pronoun (ism mawṣūl), indeclinable on sukūn, in a genitive syntactic slot by virtue of iḍāfa (it completes “evil of what…”).

👉 It heads the annexation شَرُّ مَا … so مَا is “in jarr by iḍāfa,” not a separate word with its own ending movement.`,
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'خَلَقَ',
        analysisEn: `khalaqa — past verb, mabnī on fatḥa. The subject is an implied pronoun jāwizan (“may be read in”), taqdīruhu: huwa (“He,” i.e. Allah).

👉 The whole verbal clause is the ṣilah (relative clause) of مَا: it has no independent iʿrāb slot (lā maḥalla) on its own.`,
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ: هُوَ؛ وَالْجُمْلَةُ ',
          },
          { type: 'link', text: 'صِلَةُ الْمَوْصُولِ', rule: 'silah-mawsul' },
          { type: 'text', text: ' لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
    ],
  },
  {
    id: '113-3',
    surah: 113,
    surahNameAr: 'الْفَلَقِ',
    ayah: 3,
    ayahText: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
    translationEn: 'From the evil of darkness when it darkens.',
    rows: [
      {
        segment: 'وَمِن شَرِّ',
        analysisParts: [
          { type: 'text', text: 'مَعْطُوفَةٌ بِالْوَاوِ عَلَى «مِنْ شَرِّ» الْأُولَى، وَتُعْرَبُ مِثْلَهَا؛ أَيْ: ' },
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'غَاسِقٍ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'إِذَا',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ زَمَانٍ', rule: 'sentence-structure' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'مَفْعُولٌ فِيهِ', rule: 'mafool' },
          { type: 'text', text: ' مُتَعَلَّقٌ بِفِعْلِ «أَعُوذُ»، وَهُوَ مُضَافٌ.' },
        ],
      },
      {
        segment: 'وَقَبَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ؛ وَجُمْلَةُ «وَقَبَ» فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.',
          },
        ],
      },
    ],
  },
  {
    id: '113-4',
    surah: 113,
    surahNameAr: 'الْفَلَقِ',
    ayah: 4,
    ayahText: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ',
    translationEn: 'From the evil of those who blow on knots.',
    rows: [
      {
        segment: 'وَمِن شَرِّ',
        analysisParts: [
          { type: 'text', text: 'مَعْطُوفَةٌ بِالْوَاوِ عَلَى «مِنْ شَرِّ» الْأُولَى، وَتُعْرَبُ مِثْلَهَا؛ أَيْ: ' },
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'ٱلنَّفَّٰثَٰتِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'فِى ٱلْعُقَدِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«النَّفَّاثَاتِ».' },
        ],
      },
    ],
  },
  {
    id: '113-5',
    surah: 113,
    surahNameAr: 'الْفَلَقِ',
    ayah: 5,
    ayahText: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    translationEn: 'From the evil of an envier when he envies.',
    rows: [
      {
        segment: 'وَمِن شَرِّ',
        analysisParts: [
          { type: 'text', text: 'مَعْطُوفَةٌ بِالْوَاوِ عَلَى «مِنْ شَرِّ» الْأُولَى، وَتُعْرَبُ مِثْلَهَا؛ أَيْ: ' },
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'حَاسِدٍ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'إِذَا',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ زَمَانٍ', rule: 'sentence-structure' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'مَفْعُولٌ فِيهِ', rule: 'mafool' },
          { type: 'text', text: ' مُتَعَلَّقٌ بِفِعْلِ «أَعُوذُ»، وَهُوَ مُضَافٌ.' },
        ],
      },
      {
        segment: 'حَسَدَ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ جَوَازًا تَقْدِيرُهُ: هُوَ؛ وَجُمْلَةُ «حَسَدَ» فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.',
          },
        ],
      },
    ],
  },
  {
    id: '114-1',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 1,
    ayahText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
    translationEn: 'Say: I seek refuge in the Lord of mankind.',
    rows: [
      {
        segment: 'قُلْ',
        analysisParts: [
          { type: 'link', text: 'فِعْلُ أَمْرٍ', rule: 'verb-imperative' },
          {
            type: 'text',
            text: ' مَبْنِيٌّ عَلَى السُّكُونِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ وُجُوبًا تَقْدِيرُهُ: أَنْتَ.',
          },
        ],
      },
      {
        segment: 'أَعُوذُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          {
            type: 'text',
            text: ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ فِيهِ وُجُوبًا تَقْدِيرُهُ: أَنَا.',
          },
        ],
      },
      {
        segment: 'بِرَبِّ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'ٱلنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'جُمْلَةُ «قُلْ»',
        analysisParts: [{ type: 'text', text: 'اسْتِئْنَافِيَّةٌ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' }],
      },
      {
        segment: '«أَعُوذُ» وَمَا بَعْدَهَا',
        analysisParts: [
          { type: 'text', text: 'الْجُمْلَةُ الْفِعْلِيَّةُ فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' «مَقُولُ الْقَوْلِ».' },
        ],
      },
    ],
  },
  {
    id: '114-2',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 2,
    ayahText: 'مَلِكِ ٱلنَّاسِ',
    translationEn: 'The King of mankind.',
    rows: [
      {
        segment: 'مَلِكِ',
        analysisParts: [
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          {
            type: 'text',
            text: ' مِنْ «رَبٍّ» أَوْ عَطْفُ بَيَانٍ لَهُ، مَجْرُورٌ بِالْكَسْرَةِ، وَهُوَ ',
          },
          { type: 'link', text: 'مُضَافٌ', rule: 'idafah' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'ٱلنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
    ],
  },
  {
    id: '114-3',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 3,
    ayahText: 'إِلَٰهِ ٱلنَّاسِ',
    translationEn: 'The God of mankind.',
    rows: [
      {
        segment: 'إِلَٰهِ',
        analysisParts: [
          { type: 'link', text: 'بَدَلٌ', rule: 'tawabi' },
          {
            type: 'text',
            text: ' مِنْ «رَبٍّ» أَوْ عَطْفُ بَيَانٍ لَهُ، مَجْرُورٌ بِالْكَسْرَةِ، وَهُوَ ',
          },
          { type: 'link', text: 'مُضَافٌ', rule: 'idafah' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'ٱلنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
    ],
  },
  {
    id: '114-4',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 4,
    ayahText: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
    translationEn: 'From the evil of the retreating whisperer.',
    rows: [
      {
        segment: 'مِن شَرِّ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«أَعُوذُ».' },
        ],
      },
      {
        segment: 'ٱلْوَسْوَاسِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'ٱلْخَنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'صِفَةٌ', rule: 'naat' },
          {
            type: 'text',
            text: ' لِـ«الْوَسْوَاسِ»؛ مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا.',
          },
        ],
      },
    ],
  },
  {
    id: '114-5',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 5,
    ayahText: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ',
    translationEn: 'Who whispers into the breasts of mankind.',
    rows: [
      {
        segment: 'ٱلَّذِى',
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          {
            type: 'text',
            text:
              ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ صِفَةٌ ثَانِيَةٌ لِـ«الْوَسْوَاسِ»، أَوْ فِي مَحَلِّ رَفْعٍ خَبَرُ مُبْتَدَأٍ مَحْذُوفٍ تَقْدِيرُهُ: هُوَ، أَوْ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ لِفِعْلٍ مَحْذُوفٍ تَقْدِيرُهُ: أَعْنِي.',
          },
        ],
      },
      {
        segment: 'يُوَسْوِسُ',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          {
            type: 'text',
            text:
              ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ: هُوَ؛ وَالْجُمْلَةُ الْفِعْلِيَّةُ ',
          },
          { type: 'link', text: 'صِلَةُ الْمَوْصُولِ', rule: 'silah-mawsul' },
          { type: 'text', text: ' لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.' },
        ],
      },
      {
        segment: 'فِى صُدُورِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          { type: 'text', text: ' مُتَعَلَّقَانِ بِـ«يُوَسْوِسُ».' },
        ],
      },
      {
        segment: 'ٱلنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'مُضَافٌ إِلَيْهِ', rule: 'idafah' },
          { type: 'text', text: ' مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
    ],
  },
  {
    id: '114-6',
    surah: 114,
    surahNameAr: 'النَّاسِ',
    ayah: 6,
    ayahText: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
    translationEn: 'Among the jinn and mankind.',
    rows: [
      {
        segment: 'مِنَ ٱلْجِنَّةِ',
        analysisParts: [
          { type: 'link', text: 'جَارٌّ', rule: 'harf-jarr' },
          { type: 'text', text: ' وَ' },
          { type: 'link', text: 'مَجْرُورٌ', rule: 'irab-jarr' },
          {
            type: 'text',
            text:
              ' مُتَعَلَّقَانِ بِـ«يُوَسْوِسُ»، أَوْ بِحَالٍ مَحْذُوفَةٍ مِنْ «النَّاسِ»، وَالتَّقْدِيرُ: حَالُ كَوْنِهِمْ مِنَ الْجِنَّةِ.',
          },
        ],
      },
      {
        segment: 'وَٱلنَّاسِ',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ؛ «النَّاسِ» ' },
          { type: 'link', text: 'مَعْطُوفَةٌ', rule: 'atf' },
          {
            type: 'text',
            text: ' بِالْوَاوِ عَلَى «الْجِنَّةِ»؛ مَجْرُورَةٌ وَعَلَامَةُ جَرِّهَا الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهَا.',
          },
        ],
      },
    ],
  },
  {
    id: '2-17',
    surah: 2,
    surahNameAr: 'الْبَقَرَة',
    ayah: 17,
    ayahText:
      'مَثَلُهُمْ كَمَثَلِ ٱلَّذِى ٱسْتَوْقَدَ نَارًا فَلَمَّآ أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ ٱللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِى ظُلُمَٰتٍ لَّا يُبْصِرُونَ',
    translationEn:
      'Their likeness is that of one who kindled a fire; when it illuminated what was around him, Allah took away their light and left them in darknesses — they do not see.',
    rows: [
      {
        segment: 'مَثَلُهُمْ',
        analysisEn:
          'A second subject (mubtadaʾ thānin), nominative, its nominative sign being the visible ḍammah on its final letter. The hāʾ is an attached pronoun in the genitive by annexation (iḍāfah). The mīm marks the masculine plural.',
        analysisParts: [
          { type: 'link', text: 'مُبْتَدَأٌ ثَانٍ', rule: 'nominal-sentence' },
          {
            type: 'text',
            text:
              ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ. وَ«الْهَاءُ»: ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ. وَ«الْمِيمُ»: عَلَامَةُ جَمْعِ الذُّكُورِ.' },
        ],
      },
      {
        segment: 'كَمَثَلِ',
        analysisEn:
          'A preposition with its object (jārr wa-majrūr), connected to the predicate (khabar) of the second subject. The nominal sentence "mathaluhum and what follows it" occupies the nominative position as predicate of the first subject, "those." Alternatively, the kāf may itself be in the nominative position as the predicate, since it carries the sense of "mathal" (likeness).',
        analysisParts: [
          { type: 'link', text: 'جَارٌ وَمَجْرُورٌ', rule: 'harf-jarr' },
          {
            type: 'text',
            text:
              ' مُتَعَلِّقَانِ بِخَبَرِ الْمُبْتَدَأِ الثَّانِي. وَالْجُمْلَةُ الْإِسْمِيَّةُ «مَثَلُهُمْ وَمَا بَعْدَهَا» فِي مَحَلِّ رَفْعٍ خَبَرُ الْمُبْتَدَأِ الْأَوَّلِ «أُولَٰئِكَ». وَيَجُوزُ أَنْ تَكُونَ الْكَافُ فِي مَحَلِّ رَفْعٍ خَبَرُ الْمُبْتَدَأِ بِمَعْنَى «مِثْلٍ».',
          },
        ],
      },
      {
        segment: 'ٱلَّذِى',
        analysisEn:
          'A relative pronoun, fixed on sukūn, in the genitive position by annexation.',
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'ٱسْتَوْقَدَ',
        analysisEn:
          'A past-tense verb, fixed on fatḥ. Its agent is an implied pronoun, permissibly suppressed, estimated as "he." The sentence "istawqada" holds no grammatical position, being the relative clause (ṣilat al-mawṣūl).',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text:
              ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ». وَجُمْلَةُ «ٱسْتَوْقَدَ» لَا مَحَلَّ لَهَا لِأَنَّهَا ',
          },
          { type: 'link', text: 'صِلَةُ الْمَوْصُولِ', rule: 'silah-mawsul' },
          { type: 'text', text: '.' },
        ],
      },
      {
        segment: 'نَارًا',
        analysisEn:
          'Direct object (mafʿūl bih), accusative, its accusative sign being the visible fatḥah on its final letter.',
        analysisParts: [
          { type: 'link', text: 'مَفْعُولٌ بِهٍ', rule: 'mafool' },
          { type: 'text', text: ' مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.' },
        ],
      },
      {
        segment: 'فَلَمَّآ',
        analysisEn:
          'The fāʾ is a particle of resumption (istīnāf). Lammā is a non-jussive conditional noun, fixed on sukūn, in the accusative position as a temporal adverb (ẓarfiyyah zamāniyyah).',
        analysisParts: [
          {
            type: 'text',
            text:
              '«الْفَاءُ»: حَرْفُ اسْتِئْنَافٍ مَبْنِيٌّ عَلَى الْفَتْحِ. «لَمَّا»: اسْمُ شَرْطٍ غَيْرُ جَازِمٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ عَلَى الظَّرْفِيَّةِ الزَّمَانِيَّةِ.',
          },
        ],
      },
      {
        segment: 'أَضَاءَتْ',
        analysisEn:
          'A past-tense verb, fixed on fatḥ. The tāʾ is the silent feminine marker, holding no grammatical position. The agent is an implied pronoun, permissibly suppressed, estimated as "she." The sentence "aḍāʾat" is in the genitive position as the noun annexed to lammā, and constitutes the conditional clause (jumlat fiʿl al-sharṭ).',
        analysisParts: [
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text:
              ' مَبْنِيٌّ عَلَى الْفَتْحِ. وَ«التَّاءُ»: تَاءُ التَّأْنِيثِ السَّاكِنَةُ لَا مَحَلَّ لَهَا. وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هِيَ». وَجُمْلَةُ «أَضَاءَتْ» فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ، وَهِيَ جُمْلَةُ فِعْلِ الشَّرْطِ.',
          },
        ],
      },
      {
        segment: 'مَا',
        analysisEn:
          'A relative pronoun, fixed on sukūn, in the accusative position as direct object.',
        analysisParts: [
          { type: 'link', text: 'اسْمٌ مَوْصُولٌ', rule: 'relative-nouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ.' },
        ],
      },
      {
        segment: 'حَوْلَهُ',
        analysisEn:
          'An adverb of place (ẓarf makān), accusative by fatḥah, connected to the relative clause — the implied sense being "that which surrounds it." The hāʾ is an attached pronoun, fixed on ḍammah, in the genitive by annexation.',
        analysisParts: [
          { type: 'link', text: 'ظَرْفُ مَكَانٍ', rule: 'sentence-structure' },
          {
            type: 'text',
            text:
              ' مَنْصُوبٌ بِالْفَتْحَةِ، مُتَعَلِّقٌ بِصِلَةِ الْمَوْصُولِ، وَالتَّقْدِيرُ: بِمَا هُوَ كَائِنٌ حَوْلَهُ. وَ«الْهَاءُ»: ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'ذَهَبَ ٱللَّهُ',
        analysisEn:
          'Dhahaba: a past-tense verb, fixed on fatḥ. Allāh: the majestic name, the agent (fāʿil), nominative, its nominative sign being the visible ḍammah. The sentence "dhahaba llāhu" is the response to the non-jussive conditional (jawāb al-sharṭ ghayr al-jāzim) and holds no grammatical position.',
        analysisParts: [
          { type: 'text', text: '«ذَهَبَ»: ' },
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text:
              ' مَبْنِيٌّ عَلَى الْفَتْحِ. «ٱللَّهُ»: لَفْظُ الْجَلَالَةِ ',
          },
          { type: 'link', text: 'فَاعِلٌ', rule: 'fael' },
          {
            type: 'text',
            text:
              ' مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ. وَجُمْلَةُ «ذَهَبَ ٱللَّهُ» جَوَابُ شَرْطٍ غَيْرِ جَازِمٍ لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ.',
          },
        ],
      },
      {
        segment: 'بِنُورِهِمْ',
        analysisEn:
          'A preposition with its object, connected to "dhahaba." The pronoun hum is an attached pronoun in the genitive by annexation.',
        analysisParts: [
          { type: 'link', text: 'جَارٌ وَمَجْرُورٌ', rule: 'harf-jarr' },
          { type: 'text', text: ' مُتَعَلِّقَانِ بِ«ذَهَبَ». وَ«هُمْ»: ' },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-pronouns' },
          { type: 'text', text: ' مَبْنِيٌّ فِي مَحَلِّ جَرٍّ بِالْإِضَافَةِ.' },
        ],
      },
      {
        segment: 'وَتَرَكَهُمْ',
        analysisEn:
          'The wāw is a conjunction (ʿaṭf). Taraka: a past-tense verb, fixed on fatḥ; its agent is an implied pronoun, permissibly suppressed, estimated as "he." The pronoun hum is an attached pronoun in the accusative position as direct object.',
        analysisParts: [
          { type: 'link', text: 'الْوَاوُ', rule: 'atf' },
          { type: 'text', text: ' حَرْفُ عَطْفٍ مَبْنِيٌّ عَلَى الْفَتْحِ. «تَرَكَهُمْ»: ' },
          { type: 'link', text: 'فِعْلٌ مَاضٍ', rule: 'verb-past' },
          {
            type: 'text',
            text:
              ' مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ جَوَازًا تَقْدِيرُهُ «هُوَ». وَ«هُمْ»: ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-verbs' },
          { type: 'text', text: ' فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهٍ.' },
        ],
      },
      {
        segment: 'فِى ظُلُمَٰتٍ',
        analysisEn:
          'A preposition with its object, connected to "tarakahum." Alternatively it may be parsed as a second direct object, since the sense of the verb approximates "He consigned them to darknesses."',
        analysisParts: [
          { type: 'link', text: 'جَارٌ وَمَجْرُورٌ', rule: 'harf-jarr' },
          {
            type: 'text',
            text:
              ' مُتَعَلِّقَانِ بِ«تَرَكَهُمْ»، أَوْ هُوَ مَفْعُولٌ بِهٍ ثَانٍ لِأَنَّ الْمَعْنَى: «وَصَيَّرَهُمْ فِي ظُلُمَاتٍ».',
          },
        ],
      },
      {
        segment: 'لَّا يُبْصِرُونَ',
        analysisEn:
          'Lā: a particle of negation. Yubṣirūna: a present-tense verb, nominative by the retention of the nūn, as it belongs to the Five Verbs (al-afʿāl al-khamsah). The wāw is an attached pronoun in the nominative position as agent. The sentence "lā yubṣirūna" is in the accusative position as a circumstantial clause (ḥāl).',
        analysisParts: [
          { type: 'link', text: 'لَا', rule: 'verb-present-negation' },
          { type: 'text', text: ' حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ. «يُبْصِرُونَ»: ' },
          { type: 'link', text: 'فِعْلٌ مُضَارِعٌ', rule: 'verb-present' },
          { type: 'text', text: ' مَرْفُوعٌ بِ' },
          { type: 'link', text: 'ثُبُوتِ النُّونِ', rule: 'irab-raf-noon' },
          {
            type: 'text',
            text:
              ' لِأَنَّهُ مِنَ الْأَفْعَالِ الْخَمْسَةِ. وَ«الْوَاوُ»: ',
          },
          { type: 'link', text: 'ضَمِيرٌ مُتَّصِلٌ', rule: 'attached-verbs' },
          { type: 'text', text: ' فِي مَحَلِّ رَفْعٍ فَاعِلٍ. وَالْجُمْلَةُ «لَا يُبْصِرُونَ» فِي مَحَلِّ نَصْبٍ ' },
          { type: 'link', text: 'حَالٌ', rule: 'tawabi' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  },
];
