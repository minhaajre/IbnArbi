/**
 * Unified Mansion data — single source of truth.
 *
 * Merges four previously parallel structures:
 *   IBN_ARABI_MANSIONS  (constants.ts)   — core identity, cosmological attributes
 *   MANSIONS_AKBARIAN   (mansions.akbarian.ts) — Akbarian movement framework
 *   MANSION_GUIDANCE    (spiritualGuidance.ts) — practical spiritual guidance
 *   MANSION_BUNI_DATA   (buni.ts)         — Buni divine-name / practical framework
 *
 * All four arrays are 28 entries indexed 0-27, so the merge is a straight .map().
 * The original files are kept as data sources; this file is the canonical export.
 */

import { IBN_ARABI_MANSIONS } from "./ibn-arabi-mansions";
import { MANSIONS_AKBARIAN } from "./mansions.akbarian";
import { MANSION_GUIDANCE } from "@/lib/spiritualGuidance";
import { MANSION_BUNI_DATA } from "./buni";

export interface Mansion {
  // ── Core identity (Ibn Arabi tradition) ─────────────────────────────────
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  sphere: string;
  sphereArabic: string;
  attribute: string;
  attributeArabic: string;
  letter: string;
  letterArabic: string;
  degrees: string;
  /** Spiritual quality of the mansion: "blessed" or "challenging" */
  nature: "blessed" | "challenging";
  activities: string;
  description: string;

  // ── Akbarian movement framework ──────────────────────────────────────────
  /** Cycle phase: Gathering (1-11), Differentiating (12-16), Separating (17-28) */
  movement: "Gathering" | "Differentiating" | "Separating";
  akbarian_theme_en: string;
  inner_adab_en: string[];
  cautions_en: string[];
  suggested_practice_en: string[];
  source_status: string;

  // ── Practical spiritual guidance ─────────────────────────────────────────
  theme: string;
  themeArabic: string;
  energy: "beginning" | "stabilizing" | "ending";
  /** Lowercase cycle role used for CYCLE_ROLE_COLORS lookup */
  cycleRole: "gathering" | "differentiating" | "separating";
  cycleRoleArabic: string;
  goodFor: string[];
  notIdealFor: string[];
  dhikr: { name: string; nameArabic: string; meaning: string };
  practice: string;
  practiceArabic: string;

  // ── Buni framework ───────────────────────────────────────────────────────
  /** Sa'd (benefic) / Naḥs (malefic) per Al-Buni — distinct from spiritual `nature` above */
  buniNature: "sad" | "nahs";
  divineName: string;
  divineNameArabic: string;
  divineNameCount: number;
  categories: string[];
  guidelines: {
    health: string;
    career: string;
    love: string;
    spirit: string;
  };
}

export const MANSIONS: Mansion[] = IBN_ARABI_MANSIONS.map((base, i) => {
  const akbarian = MANSIONS_AKBARIAN[i];
  const guidance = MANSION_GUIDANCE[base.number];
  const buni = MANSION_BUNI_DATA[i];

  return {
    // Core identity
    number: base.number,
    name: base.name,
    arabic: base.arabic,
    meaning: base.meaning,
    sphere: base.sphere,
    sphereArabic: base.sphereArabic,
    attribute: base.attribute,
    attributeArabic: base.attributeArabic,
    letter: base.letter,
    letterArabic: base.letterArabic,
    degrees: base.degrees,
    nature: base.nature as "blessed" | "challenging",
    activities: base.activities,
    description: base.description,
    // Akbarian
    movement: akbarian.movement,
    akbarian_theme_en: akbarian.akbarian_theme_en,
    inner_adab_en: akbarian.inner_adab_en,
    cautions_en: akbarian.cautions_en,
    suggested_practice_en: akbarian.suggested_practice_en,
    source_status: akbarian.source_status,
    // Guidance
    theme: guidance.theme,
    themeArabic: guidance.themeArabic,
    energy: guidance.energy,
    cycleRole: guidance.cycleRole,
    cycleRoleArabic: guidance.cycleRoleArabic,
    goodFor: guidance.goodFor,
    notIdealFor: guidance.notIdealFor,
    dhikr: guidance.dhikr,
    practice: guidance.practice,
    practiceArabic: guidance.practiceArabic,
    // Buni
    buniNature: buni.nature,
    divineName: buni.divineName,
    divineNameArabic: buni.divineNameArabic,
    divineNameCount: buni.divineNameCount,
    categories: buni.categories,
    guidelines: buni.guidelines,
  };
});
