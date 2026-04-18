import type { IraabAyahBlock } from './types';

/**
 * Demo āyah: layered cards + groups + arrows.
 * Production: one JSON object per āyah; same shape.
 */
export const sampleAyahBlock: IraabAyahBlock = {
  surah: 112,
  ayah: 1,
  referenceAr: 'نَمُوذَجٌ بَصْرِيٌّ — دُمِجَتْ أَنْمَاطٌ شَائِعَةٌ (جَارٌ وَمَجْرُورٌ، إِضَافَةٌ، فِعْلٌ وَفَاعِلٌ، صِلَةُ مَوْصُولٍ)',
  ayahText:
    'الْعَبَارَاتُ أَدْنَاهَا أَمْثِلَةٌ تَعْلِيمِيَّةٌ؛ فِي الْإِنْتَاجِ تَرْبِطُ كُلَّ كَلِمَةٍ بِآيَةٍ وَمَوْضِعٍ فِي الْمَلَفِّ.',
  groups: [
    {
      id: 'g-jarr',
      labelAr: 'جارٌ وَمجرور',
      groupType: 'جار ومجرور',
      ruleFamily: 'jarr',
      words: [
        {
          id: 'w-fi',
          word: 'فِي',
          type: 'حرف جر',
          role: 'حرف جر',
          case: 'مبني',
          reason: 'مبنيّ على الكسر؛ يجرّ ما بعده مجرّاً واحداً.',
          relatedWords: [
            { targetId: 'w-bayt', labelAr: 'يجرّ', kind: 'jarr_to_majrur' },
          ],
          groupType: 'جار ومجرور',
        },
        {
          id: 'w-bayt',
          word: 'الْبَيْتِ',
          type: 'اسم',
          role: 'اسم مجرور',
          case: 'مجرور',
          reason: 'بِحَرْفِ الْجَرِّ الْمَوْقُوفِ عَلَى فِي.',
          relatedWords: [],
          groupType: 'جار ومجرور',
          ruleFamily: 'jarr',
        },
      ],
    },
    {
      id: 'g-idafa',
      labelAr: 'إضافة',
      groupType: 'إضافة',
      ruleFamily: 'jarr',
      words: [
        {
          id: 'w-kitab',
          word: 'كِتَابُ',
          type: 'اسم',
          role: 'مضاف',
          case: 'مرفوع',
          reason: 'مرفوع بالضّمة الظّاهرة؛ الضّمة لأنّه مضاف.',
          relatedWords: [
            {
              targetId: 'w-ilah',
              labelAr: 'مضاف إليه',
              kind: 'mudaf_to_mudaf_ilayh',
            },
          ],
          groupType: 'إضافة',
        },
        {
          id: 'w-ilah',
          word: 'اللَّهِ',
          type: 'اسم',
          role: 'مضاف إليه',
          case: 'مجرور',
          reason: 'مجرور بالإضافة.',
          relatedWords: [],
          groupType: 'إضافة',
          ruleFamily: 'jarr',
        },
      ],
    },
    {
      id: 'g-verb',
      labelAr: 'فعلٌ وفاعل',
      groupType: 'فعل + فاعل',
      ruleFamily: 'raf',
      words: [
        {
          id: 'w-ja',
          word: 'جَاءَ',
          type: 'فعل ماضٍ',
          role: 'فعل',
          case: 'مرفوع',
          reason: 'فعل ماضٍ مرفوع بالضّمة المقدّرة.',
          relatedWords: [
            { targetId: 'w-zayd', labelAr: 'فاعل', kind: 'verb_to_fael' },
          ],
          groupType: 'فعل + فاعل',
        },
        {
          id: 'w-zayd',
          word: 'زَيْدٌ',
          type: 'اسم',
          role: 'فاعل',
          case: 'مرفوع',
          reason: 'فاعل مرفوع بالضّمة الظّاهرة.',
          relatedWords: [],
          groupType: 'فعل + فاعل',
          ruleFamily: 'raf',
        },
      ],
    },
    {
      id: 'g-jazm',
      labelAr: 'أداة جزم',
      groupType: 'لمْ + مضارع مجزوم',
      ruleFamily: 'jazm',
      words: [
        {
          id: 'w-lam',
          word: 'لَمْ',
          type: 'حرف',
          role: 'حرف جزم',
          case: 'مبني',
          reason: 'مبنيّ على السّكون؛ يجزم فعلاً واحداً مضارعاً.',
          relatedWords: [
            { targetId: 'w-yaf', labelAr: 'يجزم', kind: 'custom' },
          ],
          groupType: 'جزم',
          ruleFamily: 'jazm',
        },
        {
          id: 'w-yaf',
          word: 'يَفْعَلْ',
          type: 'فعل مضارع',
          role: 'فعل',
          case: 'مجزوم',
          reason: 'مجزوم بلمْ، وعلامة جزمه السّكون.',
          relatedWords: [],
          groupType: 'جزم',
          ruleFamily: 'jazm',
        },
      ],
    },
    {
      id: 'g-silah',
      labelAr: 'صلة موصول',
      groupType: 'صلة الموصول',
      ruleFamily: 'nasb',
      words: [
        {
          id: 'w-alladh',
          word: 'الَّذِينَ',
          type: 'اسم',
          role: 'اسم موصول',
          case: 'منصوب',
          reason: 'مبنيّ على الفتح في محلّ نصب مستثنى.',
          relatedWords: [
            { targetId: 'w-amnu', labelAr: 'صلة', kind: 'mawsul_to_silah' },
          ],
          groupType: 'صلة',
        },
        {
          id: 'w-amnu',
          word: 'آمَنُوا',
          type: 'فعل ماضٍ',
          role: 'فعل + ضمير',
          case: 'مرفوع',
          reason: 'الجملة الفعليّة صلة الموصول لا محلّ لها من الإعراب.',
          relatedWords: [],
          groupType: 'صلة',
          ruleFamily: 'nasb',
        },
      ],
    },
  ],
};
