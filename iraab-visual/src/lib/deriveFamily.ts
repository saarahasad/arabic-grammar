import type { IraabWord, RuleFamily } from '../types';

/**
 * Heuristic when `ruleFamily` is omitted.
 * Prefer setting `ruleFamily` on each word for ambiguous cases (e.g. خبر).
 */
export function deriveRuleFamily(word: IraabWord): RuleFamily {
  if (word.ruleFamily) return word.ruleFamily;

  const { role, case: c, reason } = word;
  const r = reason + role + c;

  if (c === 'مجزوم' || r.includes('جزم') || r.includes('لم ') || r.includes('لمْ')) {
    return 'jazm';
  }
  if (role.includes('مفعول') || r.includes('خبر إن') || r.includes('إنّ') && role.includes('خبر')) {
    return 'nasb';
  }
  if (c === 'مجرور' || role.includes('مضاف إليه') || r.includes('جر') || reason.includes('حرف جر')) {
    return 'jarr';
  }
  if (
    role.includes('فاعل') ||
    role.includes('مبتدأ') ||
    (role.includes('خبر') && !r.includes('إن')) ||
    (c === 'مرفوع' && !role.includes('مفعول'))
  ) {
    return 'raf';
  }
  if (c === 'منصوب' && role.includes('مفعول')) return 'nasb';
  return 'other';
}
