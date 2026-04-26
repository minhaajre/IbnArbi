# IbnArbi App — Codebase Guide & Data Quality SOPs

## Project overview

Full-stack Islamic astrology app (React 19 + Vite SPA + Express + Drizzle).
Live at **ibnarbi.minhaaj.com**. NOT Next.js — never add `"use client"`.

---

## Data Quality SOPs

### SOP-1 · Single authoritative source for every data field

Every field in `data/ibn-arabi-mansions.ts`, `data/buni.ts`, and related files
**must cite its primary source** in a comment at the top of the file or inline.

| Field group | Authoritative source |
|---|---|
| Divine names per mansion (`divineName`, `divineNameArabic`) | Ibn Arabi — *Futuhat al-Makkiyya*, Chapter 198. PDF on file: `Ibn Arabi Moon Mansion Contemplation 2026, Ibn Arabi Cosmology.pdf` |
| Mansion names, letters, spheres, attributes (`attribute`, `attributeArabic`) | Ibn Arabi — *Futuhat al-Makkiyya*, Chapter 198 (same PDF) |
| Abjad counts (`divineNameCount`) | Standard Abjad (حروف الأبجد) — verify with: ء=1 ب=2 ج=3 د=4 ه=5 و=6 ز=7 ح=8 ط=9 ي=10 ك=20 ل=30 م=40 ن=50 س=60 ع=70 ف=80 ص=90 ق=100 ر=200 ش=300 ت=400 ث=500 خ=600 ذ=700 ض=800 ظ=900 غ=1000 |

**Rule:** If no authoritative source can be cited, the field must not be added.

---

### SOP-2 · Never copy between systems

Ibn Arabi and Al-Buni are **different scholars with different systems**.

- Do NOT use an Ibn Arabi `attribute` as a Buni `divineName` — they overlap but
  are not the same. In Apr 2026, mansions 1, 7, 10, 13, 22, 23, 28 were found
  wrong because the Buni fields had been populated by copying from the Ibn Arabi
  attribute column.
- Do NOT add a new framework's data (e.g., Nakshatra, Chinese) into a field
  that belongs to a different framework.

---

### SOP-3 · Verification checklist before committing mansion data changes

Run through this before any PR that touches `data/`:

- [ ] Open the source PDF / book and locate the specific mansion entry
- [ ] Copy the exact Arabic text — do not transliterate then back-translate
- [ ] Verify the Abjad count by hand using the table in SOP-1
- [ ] Cross-check the divine name against the 99 Names of Allah — if it does not
      appear there, it is likely from the wrong system
- [ ] Run `npx tsc --noEmit` — must produce zero output
- [ ] Run `npm run build` — must succeed (chunk-size warning is pre-existing and acceptable)

---

### SOP-4 · Diff protocol for bulk data updates

When correcting multiple mansions at once:

1. Produce a **before/after table** (# | field | old value | new value) and share
   with the user for approval *before* writing files
2. Apply changes one mansion at a time so each `Edit` is auditable
3. After all edits, run `tsc --noEmit` once to confirm no type regressions

---

### SOP-5 · Data file ownership

| File | Owns | Do not put here |
|---|---|---|
| `data/ibn-arabi-mansions.ts` | 28 raw Ibn Arabi entries (name, arabic, sphere, attribute, letter, nature, activities, description) | Buni data, Nakshatra data |
| `data/mansions.ts` | Merged `Mansion` type — import-only, no raw data | Raw arrays |
| `data/buni.ts` | Buni per-mansion data (divineName from **Ibn Arabi PDF**, nature, guidelines, categories) + WORK_CATEGORIES + INK_RULES | Ibn Arabi cosmology fields |
| `data/mansions.akbarian.ts` | Akbarian movement framework | Other frameworks |
| `lib/spiritualGuidance.ts` | MANSION_GUIDANCE practical guidance | Other frameworks |
| `lib/constants.ts` | Runtime lookup tables (planetary rulers, sign data, planet colors, Arabic labels) | Large static datasets (those belong in `data/`) |

---

### SOP-6 · When the user reports a wrong value

1. **Do not assume you introduced the bug** — check git blame / file history first
2. Read the relevant data file and trace the field back to its source
3. Identify whether the error is in the data (wrong value) or the display (wrong field shown)
4. Present the old vs. new values to the user before writing
5. After the fix, add a comment in the file: `// corrected YYYY-MM-DD — source: <PDF/book name>`

---

## Architecture quick reference

```
client/src/
  data/
    ibn-arabi-mansions.ts   ← raw Ibn Arabi 28-entry array (P8 split from constants.ts)
    mansions.ts             ← merged Mansion type (single source of truth for components)
    mansions.akbarian.ts    ← Akbarian movement data
    buni.ts                 ← Buni + WORK_CATEGORIES + INK_RULES
  hooks/
    useLocationSearch.ts    ← IP geolocation (ipapi.co) → GPS → Mecca fallback
    useTimeControl.ts       ← main clock + planetary-hours time-travel
    useAstronomyData.ts     ← 2 useMemo for all astronomy (no useState/useEffect)
  lib/
    astronomy.ts            ← astronomy-engine wrappers
    constants.ts            ← runtime lookup tables (~530 lines after P8)
  components/
    SectionCard.tsx         ← glass-card chrome + SectionHeader (shared by all home sections)
    MansionCard.tsx         ← uses unified Mansion type
  pages/
    Home.tsx                ← ~460 lines; 3 useState only
```

## Restore point

`git tag restore/pre-refactor` → commit `9cfebae` (before all refactoring)
