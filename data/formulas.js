/**
 * Iʿrāb formula reference data (F01–F30). Mirrors `formulas.html` cards.
 * `templateHtml` uses `formulas-slot` classes (load `iraab-formulas.css` on Qurʾān page for styling).
 */
(function (global) {
  'use strict';

  /** @typedef {'murab-noun' | 'murab-verb' | 'mabni' | 'compound' | 'sentence'} FormulaCategory */

  /** @type {Array<{ id: string, title: string, titleAr: string, category: FormulaCategory, templateHtml: string, slots: string, whenToUse: string, example: { ar: string, analysis: string, source: string } }>} */
  const FORMULAS = [
    {
      id: 'F01',
      title: 'Regular noun — nominative (مرفوع)',
      titleAr: 'الاسم المعرب المرفوع',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الضمة الظاهرة</span>',
      slots: 'function + مرفوع + الضمة الظاهرة',
      whenToUse: 'فاعل، مبتدأ، خبر، اسم كان — any regular noun in nominative',
      example: {
        ar: 'التَّكَاثُرُ',
        analysis: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة',
        source: 'سورة التكاثر ١',
      },
    },
    {
      id: 'F02',
      title: 'Regular noun — accusative (منصوب)',
      titleAr: 'الاسم المعرب المنصوب',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">منصوب</span> وعلامة نصبه <span class="formulas-slot formulas-slot--sign">الفتحة الظاهرة</span>',
      slots: 'function + منصوب + الفتحة الظاهرة',
      whenToUse: 'مفعول به، اسم إن، خبر كان، حال، تمييز',
      example: {
        ar: 'ٱلْإِنسَٰنَ',
        analysis: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة',
        source: 'سورة العلق ٢',
      },
    },
    {
      id: 'F03',
      title: 'Regular noun — genitive (مجرور)',
      titleAr: 'الاسم المعرب المجرور',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">مجرور</span> وعلامة جره <span class="formulas-slot formulas-slot--sign">الكسرة الظاهرة</span>',
      slots: 'function + مجرور + الكسرة الظاهرة',
      whenToUse: 'After حرف جر or as مضاف إليه',
      example: {
        ar: 'رَبِّكَ',
        analysis: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة',
        source: 'سورة الفاتحة ٤',
      },
    },
    {
      id: 'F04',
      title: 'Masc. sound plural — nominative (الواو)',
      titleAr: 'جمع مذكر سالم مرفوع',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الواو</span> لأنه جمع مذكر سالم',
      slots: 'function + مرفوع + الواو + reason',
      whenToUse: 'Any جمع مذكر سالم in nominative position',
      example: {
        ar: 'ٱلْكَٰفِرُونَ',
        analysis: 'نعت مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم',
        source: 'سورة الكافرون ١',
      },
    },
    {
      id: 'F05',
      title: 'Masc. sound plural — accusative/genitive (الياء)',
      titleAr: 'جمع مذكر سالم منصوب أو مجرور',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">[منصوب / مجرور]</span> وعلامة <span class="formulas-slot formulas-slot--case">[نصبه / جره]</span> <span class="formulas-slot formulas-slot--sign">الياء</span> لأنه جمع مذكر سالم',
      slots: 'function + case + الياء + reason',
      whenToUse: 'جمع مذكر سالم in accusative or genitive',
      example: {
        ar: 'مُخْلِصِينَ',
        analysis: 'حال منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم',
        source: '—',
      },
    },
    {
      id: 'F06',
      title: 'Fem. sound plural — accusative (الكسرة)',
      titleAr: 'جمع مؤنث سالم منصوب',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">منصوب</span> وعلامة نصبه <span class="formulas-slot formulas-slot--sign">الكسرة الظاهرة</span> لأنه جمع مؤنث سالم',
      slots: 'function + منصوب + الكسرة + reason',
      whenToUse: 'جمع مؤنث سالم in accusative — الكسرة substitutes for فتحة',
      example: {
        ar: 'ٱلصَّٰلِحَٰتِ',
        analysis: 'مفعول به منصوب وعلامة نصبه الكسرة لأنه جمع مؤنث سالم',
        source: '—',
      },
    },
    {
      id: 'F07',
      title: 'Dual — nominative (الألف)',
      titleAr: 'المثنى المرفوع',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الألف</span> لأنه مثنى',
      slots: 'function + مرفوع + الألف + reason',
      whenToUse: 'Any مثنى noun in nominative',
      example: {
        ar: 'يَدَا',
        analysis: 'فاعل مرفوع وعلامة رفعه الألف لأنه مثنى',
        source: '—',
      },
    },
    {
      id: 'F08',
      title: 'Diptote — genitive (الفتحة)',
      titleAr: 'الممنوع من الصرف مجرور',
      category: 'murab-noun',
      templateHtml:
        '<span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> <span class="formulas-slot formulas-slot--case">مجرور</span> وعلامة جره <span class="formulas-slot formulas-slot--sign">الفتحة الظاهرة</span> لأنه ممنوع من الصرف',
      slots: 'function + مجرور + الفتحة + reason',
      whenToUse: 'Proper names, أفعل التفضيل — فتحة replaces كسرة in jarr',
      example: {
        ar: 'جَهَنَّمَ',
        analysis: 'مضاف إليه مجرور وعلامة جره الفتحة لأنه ممنوع من الصرف',
        source: '—',
      },
    },
    {
      id: 'F09',
      title: 'Present verb — marfūʿ, sound ending',
      titleAr: 'فعل مضارع مرفوع',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الضمة الظاهرة</span>، والفاعل ضمير مستتر تقديره «هو / هي / أنا»',
      slots: 'type + مرفوع + الضمة الظاهرة + hidden subject',
      whenToUse: 'Default مضارع — no جازم or ناصب acting on it',
      example: {
        ar: 'يَحْسَبُ',
        analysis: 'فعل مضارع مرفوع وعلامة رفعه الضمة الظاهرة، والفاعل ضمير مستتر هو',
        source: '—',
      },
    },
    {
      id: 'F10',
      title: 'Present verb — marfūʿ, ends in ا (تعذر)',
      titleAr: 'مضارع مرفوع — ضمة مقدرة للتعذر',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الضمة المقدرة للتعذر</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مرفوع + الضمة المقدرة للتعذر + subject',
      whenToUse: 'Verb ending in ا — يَطْغَى، يَنْهَى، يَرَى',
      example: {
        ar: 'لَيَطْغَى',
        analysis: 'فعل مضارع مرفوع وعلامة رفعه الضمة المقدرة للتعذر',
        source: '—',
      },
    },
    {
      id: 'F11',
      title: 'Present verb — marfūʿ, ends in و/ي (ثقل)',
      titleAr: 'مضارع مرفوع — ضمة مقدرة للثقل',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">الضمة المقدرة للثقل</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مرفوع + الضمة المقدرة للثقل + subject',
      whenToUse: 'Verb ending in و/ي — سَنَدْعُ، تَرْمِيهِم، يَتْلُو',
      example: {
        ar: 'سَنَدْعُ',
        analysis: 'فعل مضارع مرفوع وعلامة رفعه الضمة المقدرة للثقل على الواو المحذوفة',
        source: '—',
      },
    },
    {
      id: 'F12',
      title: 'Present verb — marfūʿ, الأفعال الخمسة (ثبوت النون)',
      titleAr: 'الأفعال الخمسة — ثبوت النون',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه <span class="formulas-slot formulas-slot--sign">ثبوت النون</span> لأنه من الأفعال الخمسة، و«واو الجماعة» ضمير متصل في محل رفع فاعل',
      slots: 'type + مرفوع + ثبوت النون + reason + subject',
      whenToUse: 'تَعْلَمُونَ، يَدْخُلُونَ — any الأفعال الخمسة form',
      example: {
        ar: 'تَعْلَمُونَ',
        analysis: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة',
        source: '—',
      },
    },
    {
      id: 'F13',
      title: 'Present verb — majzūm, sound ending (سكون)',
      titleAr: 'فعل مضارع مجزوم',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مجزوم</span> وعلامة جزمه <span class="formulas-slot formulas-slot--sign">السكون الظاهر</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مجزوم + السكون الظاهر + subject',
      whenToUse: 'After لم / لا الناهية / لام الأمر + sound final',
      example: {
        ar: 'لَمْ يَعْلَمْ',
        analysis: 'فعل مضارع مجزوم وعلامة جزمه السكون الظاهر',
        source: '—',
      },
    },
    {
      id: 'F14',
      title: 'Present verb — majzūm, weak ending (حذف حرف العلة)',
      titleAr: 'مضارع مجزوم — حذف حرف العلة',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">مجزوم</span> وعلامة جزمه <span class="formulas-slot formulas-slot--sign">حذف حرف العلة</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مجزوم + حذف حرف العلة + subject',
      whenToUse: 'Verb ends in علة — لَمْ يَنتَهِ، لَمْ تَرَ، لَمْ يَدْعُ',
      example: {
        ar: 'لَمْ يَنتَهِ',
        analysis: 'فعل مضارع مجزوم وعلامة جزمه حذف حرف العلة',
        source: '—',
      },
    },
    {
      id: 'F15',
      title: 'Present verb — manṣūb after hidden أن (الأفعال الخمسة)',
      titleAr: 'منصوب بأن مضمرة — حذف النون',
      category: 'murab-verb',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل مضارع</span> <span class="formulas-slot formulas-slot--case">منصوب بأن مضمرة</span> وعلامة نصبه <span class="formulas-slot formulas-slot--sign">حذف النون</span> لأنه من الأفعال الخمسة، و«واو الجماعة» في محل رفع فاعل',
      slots: 'type + منصوب بأن مضمرة + حذف النون + reason + subject',
      whenToUse: 'After لام التعليل / حتى for الأفعال الخمسة',
      example: {
        ar: 'لِيَعْبُدُوا',
        analysis: 'فعل مضارع منصوب بأن مضمرة وعلامة نصبه حذف النون',
        source: '—',
      },
    },
    {
      id: 'F16',
      title: 'Past verb — default (فتح, hidden subject)',
      titleAr: 'فعل ماض مبني على الفتح',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل ماضٍ</span> مبني على <span class="formulas-slot formulas-slot--sign">الفتح</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مبني على الفتح + subject',
      whenToUse: 'Default — sound ending, no attached pronoun',
      example: {
        ar: 'خَلَقَ',
        analysis: 'فعل ماضٍ مبني على الفتح، والفاعل ضمير مستتر هو',
        source: '—',
      },
    },
    {
      id: 'F17',
      title: 'Past verb — ends in ا (فتح مقدر للتعذر)',
      titleAr: 'فعل ماض — فتح مقدر للتعذر',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل ماضٍ</span> مبني على <span class="formulas-slot formulas-slot--sign">الفتح المقدر للتعذر</span>، والفاعل ضمير مستتر تقديره «هو»',
      slots: 'type + مبني على الفتح المقدر للتعذر + subject',
      whenToUse: 'Verb ending in ا — أَدْرَى، اسْتَغْنَى، تَوَلَّى',
      example: {
        ar: 'أَدْرَاكَ',
        analysis: 'فعل ماضٍ مبني على الفتح المقدر للتعذر',
        source: '—',
      },
    },
    {
      id: 'F18',
      title: 'Past verb — with تاء الفاعل (سكون)',
      titleAr: 'فعل ماض مع تاء الفاعل',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل ماضٍ</span> مبني على <span class="formulas-slot formulas-slot--sign">السكون</span> لاتصاله بتاء الفاعل، و«تاء الفاعل» ضمير متصل مبني على الفتح في محل رفع فاعل',
      slots: 'type + مبني على السكون + reason + تاء analysis',
      whenToUse: 'وَرَأَيْتَ، عَبَدتُّمْ، خَلَقْنَا',
      example: {
        ar: 'وَرَأَيْتَ',
        analysis: 'فعل ماضٍ مبني على السكون لاتصاله بتاء الفاعل',
        source: '—',
      },
    },
    {
      id: 'F19',
      title: 'Past verb — with واو الجماعة (ضم)',
      titleAr: 'فعل ماض مع واو الجماعة',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل ماضٍ</span> مبني على <span class="formulas-slot formulas-slot--sign">الضم</span> لاتصاله بواو الجماعة، و«واو الجماعة» ضمير متصل مبني على السكون في محل رفع فاعل',
      slots: 'type + مبني على الضم + reason + واو analysis',
      whenToUse: 'ءَامَنُوا، كَفَرُوا، رَضُوا',
      example: {
        ar: 'ءَامَنُوا',
        analysis: 'فعل ماضٍ مبني على الضم لاتصاله بواو الجماعة',
        source: '—',
      },
    },
    {
      id: 'F20',
      title: 'Past verb — passive (مبني للمجهول)',
      titleAr: 'فعل ماض مجهول ونائب الفاعل',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل ماضٍ مبني للمجهول</span> مبني على <span class="formulas-slot formulas-slot--sign">الفتح / السكون / الضم</span>، و <span class="formulas-slot formulas-slot--fn">نائب الفاعل</span> [الاسم] <span class="formulas-slot formulas-slot--case">مرفوع</span> وعلامة رفعه الضمة',
      slots: 'type (مجهول) + bina vowel + نائب الفاعل analysis',
      whenToUse: 'بُعْثِرَ، أُوتُوا، أُمِرُوا، حُصِّلَ',
      example: {
        ar: 'أُوتُوا',
        analysis: 'فعل ماضٍ مجهول مبني على الضم؛ واو الجماعة نائب فاعل',
        source: '—',
      },
    },
    {
      id: 'F21',
      title: 'Imperative — مبني على السكون',
      titleAr: 'فعل أمر مبني على السكون',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل أمر</span> مبني على <span class="formulas-slot formulas-slot--sign">السكون</span>، والفاعل ضمير مستتر تقديره «أنت»',
      slots: 'type + مبني على السكون + subject',
      whenToUse: 'ٱقْرَأْ، ٱسْجُدْ، قُلْ — sound ending',
      example: {
        ar: 'ٱقْرَأْ',
        analysis: 'فعل أمر مبني على السكون، والفاعل ضمير مستتر أنت',
        source: 'سورة العلق ١',
      },
    },
    {
      id: 'F22',
      title: 'Imperative — مبني على حذف حرف العلة',
      titleAr: 'فعل أمر — حذف حرف العلة',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">فعل أمر</span> مبني على <span class="formulas-slot formulas-slot--sign">حذف حرف العلة</span>، والفاعل ضمير مستتر تقديره «أنت»',
      slots: 'type + مبني على حذف حرف العلة + subject',
      whenToUse: 'صَلِّ (from صَلِّي)، يَدْعُ (from يَدْعُو)',
      example: {
        ar: 'فَصَلِّ',
        analysis: 'فعل أمر مبني على حذف حرف العلة',
        source: '—',
      },
    },
    {
      id: 'F23',
      title: 'Relative pronoun — مبني في محل',
      titleAr: 'اسم موصول',
      category: 'mabni',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">اسم موصول</span> مبني على السكون <span class="formulas-slot formulas-slot--sent">في محل [رفع / نصب / جر]</span> <span class="formulas-slot formulas-slot--fn">[الوظيفة]</span>',
      slots: 'type + مبني على السكون + في محل + case + function',
      whenToUse: 'ٱلَّذِي / ٱلَّتِي / مَا / مَنْ — always مبني, gets في محل',
      example: {
        ar: 'مَا',
        analysis: 'اسم موصول مبني على السكون في محل نصب مفعول به',
        source: '—',
      },
    },
    {
      id: 'F24',
      title: 'Attached pronoun — with noun (كاف، هاء، نا)',
      titleAr: 'ضمير متصل مع الاسم',
      category: 'mabni',
      templateHtml:
        '«<span class="formulas-slot formulas-slot--case">الضمير</span>» ضمير متصل مبني على <span class="formulas-slot formulas-slot--sign">[الفتح / الضم / السكون]</span> <span class="formulas-slot formulas-slot--sent">في محل جر</span> <span class="formulas-slot formulas-slot--fn">مضاف إليه</span>',
      slots: 'pronoun name + مبني على + bina vowel + في محل جر مضاف إليه',
      whenToUse: 'كاف → فتح، هاء → ضم، نا → سكون — when attached to noun',
      example: {
        ar: 'كاف المخاطب',
        analysis: 'ضمير متصل مبني على الفتح في محل جر مضاف إليه',
        source: '—',
      },
    },
    {
      id: 'F25',
      title: 'إن + اسمها + خبرها',
      titleAr: 'إن وأخواتها — بناء الجملة',
      category: 'compound',
      templateHtml:
        '<span class="formulas-slot formulas-slot--part">إن</span> حرف توكيد ونصب مبني على الفتح، و«[الاسم]» <span class="formulas-slot formulas-slot--fn">اسم إن</span> منصوب وعلامة نصبه الفتحة، والجملة في محل رفع <span class="formulas-slot formulas-slot--fn">خبر إن</span>',
      slots: 'إن analysis + اسم إن + خبر location',
      whenToUse: 'إِنَّ ٱلْإِنسَٰنَ / إِنَّهُ / إِنَّا',
      example: {
        ar: 'إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ',
        analysis: 'إن + اسم منصوب + شبه جملة خبر',
        source: 'سورة العصر ٢',
      },
    },
    {
      id: 'F26',
      title: 'كان/ليس + اسمها + خبرها',
      titleAr: 'كان وأخواتها',
      category: 'compound',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">كان</span> فعل ماضٍ ناقص مبني على الفتح، <span class="formulas-slot formulas-slot--fn">اسم كان</span> مرفوع بالضمة، <span class="formulas-slot formulas-slot--fn">خبر كان</span> منصوب وعلامة نصبه <span class="formulas-slot formulas-slot--sign">الفتحة الظاهرة</span>',
      slots: 'كان analysis + اسم كان + خبر كان',
      whenToUse: 'كَانَ تَوَّابًا / يَكُونُ ٱلنَّاسُ / لَمْ يَكُن / لَيْسَ',
      example: {
        ar: 'كَانَ تَوَّابًا',
        analysis: 'فعل ناقص؛ اسمه مستتر؛ خبره منصوب',
        source: '—',
      },
    },
    {
      id: 'F27',
      title: 'شبه الجملة → في محل إعراب',
      titleAr: 'شبه الجملة',
      category: 'sentence',
      templateHtml:
        'شبه الجملة [جار ومجرور / ظرف] <span class="formulas-slot formulas-slot--sent">في محل [رفع / نصب / جر]</span> <span class="formulas-slot formulas-slot--fn">[الوظيفة]</span>',
      slots: 'phrase type + في محل + case + function',
      whenToUse: 'لَكُمْ دِينُكُمْ، فِي جِيدِهَا حَبْلٌ، فِيهَا كُتُبٌ',
      example: {
        ar: 'فِيهَا',
        analysis: 'شبه الجملة في محل رفع خبر مقدم',
        source: '—',
      },
    },
    {
      id: 'F28',
      title: 'المصدر المؤول / passive present patterns',
      titleAr: 'المصدر المؤول — مضارع مجهول',
      category: 'compound',
      templateHtml:
        'المصدر المؤول من «<span class="formulas-slot formulas-slot--case">أن / ما</span>» وما بعدها <span class="formulas-slot formulas-slot--sent">في محل [جر / نصب / رفع]</span> <span class="formulas-slot formulas-slot--fn">[الوظيفة]</span> — أو <span class="formulas-slot formulas-slot--case">مضارع مبني للمجهول</span> بحسب السياق',
      slots: 'masdar / passive mudāriʿ + في محل + case + function',
      whenToUse: 'بِأَنَّ ٱللَّهَ يَرَى / مُضَارَعٌ مَبْنِيٌّ لِلْمَجْهُولِ',
      example: {
        ar: 'يُرَادُ',
        analysis: 'فعل مضارع مبني للمجهول في محل رفع خبر مبتدأ',
        source: '—',
      },
    },
    {
      id: 'F29',
      title: 'اسم موصول + صلة الموصول (full pattern)',
      titleAr: 'الموصول والصلة',
      category: 'sentence',
      templateHtml:
        '<span class="formulas-slot formulas-slot--case">اسم موصول</span> مبني على السكون <span class="formulas-slot formulas-slot--sent">في محل …</span> <span class="formulas-slot formulas-slot--fn">[الوظيفة]</span>، والجملة <span class="formulas-slot formulas-slot--sent">صلة الموصول لا محل لها من الإعراب</span>',
      slots: 'relative pronoun + في محل + function + صلة label',
      whenToUse: 'Every relative clause — the clause after ٱلَّذِي / مَا / مَنْ',
      example: {
        ar: 'مَا تَعْبُدُونَ',
        analysis: 'اسم موصول في محل نصب؛ جملة تعبدون صلة لا محل لها من الإعراب',
        source: '—',
      },
    },
    {
      id: 'F30',
      title: 'الجملة الحالية — في محل نصب حال',
      titleAr: 'الجملة الحالية',
      category: 'sentence',
      templateHtml:
        'والجملة الفعلية / الاسمية <span class="formulas-slot formulas-slot--sent">في محل نصب</span> <span class="formulas-slot formulas-slot--fn">حال</span> لـ«[صاحب الحال]»',
      slots: 'sentence type + في محل نصب حال + reference to صاحب الحال',
      whenToUse: 'يَدْخُلُونَ حال for الناس / «وَرَبُّكَ ٱلْأَكْرَمُ» حال for ٱقْرَأْ',
      example: {
        ar: 'يَدْخُلُونَ',
        analysis: 'الجملة الفعلية في محل نصب حال لـ«ٱلنَّاسَ»',
        source: '—',
      },
    },
  ];

  const FORMULA_BY_ID = {};
  for (let i = 0; i < FORMULAS.length; i++) {
    FORMULA_BY_ID[FORMULAS[i].id] = FORMULAS[i];
  }

  global.FORMULAS = FORMULAS;
  global.FORMULA_BY_ID = FORMULA_BY_ID;
})(typeof window !== 'undefined' ? window : globalThis);
