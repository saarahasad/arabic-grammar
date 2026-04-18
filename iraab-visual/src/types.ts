/**
 * Strict 4-layer model + grouping + relations.
 * Scale: add words per āyah; each word references others by `id`.
 */

export type GrammarCase = 'مرفوع' | 'منصوب' | 'مجرور' | 'مجزوم' | 'مبني' | string;

export type RuleFamily = 'jarr' | 'nasb' | 'raf' | 'jazm' | 'other';

export type RelationKind =
  | 'jarr_to_majrur'
  | 'verb_to_fael'
  | 'verb_to_mafool'
  | 'mudaf_to_mudaf_ilayh'
  | 'mawsul_to_silah'
  | 'custom';

export interface WordRelation {
  /** Target word `id` in the same āyah */
  targetId: string;
  /** Short Arabic label on the arrow */
  labelAr: string;
  kind: RelationKind;
}

export interface IraabWord {
  id: string;
  word: string;
  type: string;
  role: string;
  case: GrammarCase;
  reason: string;
  relatedWords: WordRelation[];
  groupType: string;
  /** Optional explicit family; otherwise derived in UI */
  ruleFamily?: RuleFamily;
}

export interface IraabPhraseGroup {
  id: string;
  /** Group label (e.g. جار ومجرور) */
  labelAr: string;
  groupType: string;
  words: IraabWord[];
  ruleFamily?: RuleFamily;
}

export interface IraabAyahBlock {
  surah?: number;
  ayah?: number;
  referenceAr?: string;
  ayahText?: string;
  groups: IraabPhraseGroup[];
}

export interface IraabViewState {
  /** Hide السبب / REASON (layer 4) */
  hideReasons: boolean;
  /** Color-first: minimal text on badges */
  colorsOnly: boolean;
  /** Emphasize group borders + rule families */
  highlightPatterns: boolean;
}
