import * as Astronomy from "astronomy-engine";
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  DAY_OFFICERS,
  LUNAR_MANSIONS_XIU,
  SOLAR_TERMS,
  FIVE_ELEMENTS,
  HeavenlyStem,
  EarthlyBranch,
  DayOfficer,
  LunarMansionXiu,
  SolarTerm,
} from "@/data/chinese-astro";

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  chinese: string;
  pinyin: string;
}

export interface ChineseTimeEnergy {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  lunarMansion: LunarMansionXiu;
  heavenlyStem: HeavenlyStem;
  earthlyBranch: EarthlyBranch;
  sexagenaryDay: string;
  sexagenaryChinese: string;
  dayOfficer: DayOfficer;
  solarTerm: SolarTerm;
  dayElement: string;
  dayPolarity: "Yin" | "Yang";
  recommended: string[];
  avoid: string[];
}

function getJulianDayNumber(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const a = Math.floor((14 - m) / 12);
  const yAdj = y + 4800 - a;
  const mAdj = m + 12 * a - 3;
  return d + Math.floor((153 * mAdj + 2) / 5) + 365 * yAdj + Math.floor(yAdj / 4) - Math.floor(yAdj / 100) + Math.floor(yAdj / 400) - 32045;
}

function getSexagenaryDayIndex(date: Date): number {
  const jdn = getJulianDayNumber(date);
  return ((jdn + 49) % 60 + 60) % 60;
}

function getXiuIndex(date: Date): number {
  const jdn = getJulianDayNumber(date);
  return ((jdn + 11) % 28 + 28) % 28;
}

function getDayOfficerIndex(date: Date): number {
  const jdn = getJulianDayNumber(date);
  return ((jdn + 2) % 12 + 12) % 12;
}

function getSunTropicalLongitude(date: Date): number {
  const coords = Astronomy.GeoVector(Astronomy.Body.Sun, date, false);
  const ecliptic = Astronomy.Ecliptic(coords);
  return ecliptic.elon;
}

function getCurrentSolarTerm(date: Date): SolarTerm {
  const sunLon = getSunTropicalLongitude(date);

  let closest = SOLAR_TERMS[0];
  let minDist = 360;

  for (const term of SOLAR_TERMS) {
    let dist = sunLon - term.sunLongitude;
    if (dist < 0) dist += 360;
    if (dist < minDist) {
      minDist = dist;
      closest = term;
    }
  }
  return closest;
}

function getYearPillar(date: Date): Pillar {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let chineseYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    chineseYear -= 1;
  }
  const stemIndex = ((chineseYear - 4) % 10 + 10) % 10;
  const branchIndex = ((chineseYear - 4) % 12 + 12) % 12;
  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];
  return {
    stem,
    branch,
    chinese: `${stem.chinese}${branch.chinese}`,
    pinyin: `${stem.name}-${branch.name}`,
  };
}

function getMonthPillar(date: Date, yearStemIndex: number): Pillar {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const solarMonthStarts = [
    { month: 2, day: 4 },
    { month: 3, day: 6 },
    { month: 4, day: 5 },
    { month: 5, day: 6 },
    { month: 6, day: 6 },
    { month: 7, day: 7 },
    { month: 8, day: 7 },
    { month: 9, day: 8 },
    { month: 10, day: 8 },
    { month: 11, day: 7 },
    { month: 12, day: 7 },
    { month: 1, day: 6 },
  ];

  let chineseMonthIndex = 0;
  for (let i = solarMonthStarts.length - 1; i >= 0; i--) {
    const start = solarMonthStarts[i];
    if (start.month === 1) {
      if (month === 1 && day >= start.day) {
        chineseMonthIndex = 11;
        break;
      }
      if (month === 12 && day >= 7) {
        chineseMonthIndex = 10;
        break;
      }
    } else if (month > start.month || (month === start.month && day >= start.day)) {
      chineseMonthIndex = i;
      break;
    }
  }

  const monthStemIndex = ((yearStemIndex % 5) * 2 + chineseMonthIndex) % 10;
  const monthBranchIndex = (chineseMonthIndex + 2) % 12;

  const stem = HEAVENLY_STEMS[monthStemIndex];
  const branch = EARTHLY_BRANCHES[monthBranchIndex];
  return {
    stem,
    branch,
    chinese: `${stem.chinese}${branch.chinese}`,
    pinyin: `${stem.name}-${branch.name}`,
  };
}

function classifyActivities(
  mansion: LunarMansionXiu,
  officer: DayOfficer,
  stem: HeavenlyStem,
  solarTerm: SolarTerm
): { recommended: string[]; avoid: string[] } {
  const recSet = new Set<string>();
  const avoidSet = new Set<string>();

  for (const r of mansion.recommended) recSet.add(r);
  for (const r of officer.recommended) recSet.add(r);
  for (const a of mansion.avoid) avoidSet.add(a);
  for (const a of officer.avoid) avoidSet.add(a);

  const elementData = FIVE_ELEMENTS[stem.element];
  if (elementData) {
    for (const kw of elementData.keywords) recSet.add(kw);
  }

  for (const theme of solarTerm.themes) recSet.add(theme);

  for (const a of avoidSet) recSet.delete(a);

  return {
    recommended: Array.from(recSet),
    avoid: Array.from(avoidSet),
  };
}

export interface XiuCountdown {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progressPercent: number; // 0–100, how much of the current day has elapsed
}

/** Returns time remaining until the next Xiu (which changes at midnight). */
export function getXiuCountdown(): XiuCountdown {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const totalSecondsInDay = 24 * 60 * 60;
  const elapsed = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  const remaining = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  return {
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    totalSeconds: remaining,
    progressPercent: Math.min(100, (elapsed / totalSecondsInDay) * 100),
  };
}

/**
 * Generates a one-line daily energy advisory synthesising the year pillar,
 * sexagenary day, Xiu, Day Officer, and Solar Term.
 */
export function generateDailyEnergySummary(energy: ChineseTimeEnergy): string {
  const { yearPillar, lunarMansion, dayOfficer, solarTerm, dayElement, dayPolarity } = energy;

  const yearEl = yearPillar.stem.element;
  const yearAnimal = yearPillar.branch.animal;
  const polarity = dayPolarity === "Yang" ? "yang" : "yin";

  // Officer phrasing
  const officerPhrase =
    dayOfficer.nature === "auspicious"
      ? `${dayOfficer.name} Officer favors ${dayOfficer.recommended[0]}`
      : dayOfficer.nature === "inauspicious"
      ? `${dayOfficer.name} Officer counsels restraint — avoid ${dayOfficer.avoid[0] ?? "hasty moves"}`
      : `${dayOfficer.name} Officer supports ${dayOfficer.recommended[0] ?? "steady effort"}`;

  const xiuTheme = lunarMansion.themes[0] ?? lunarMansion.name;
  const season = solarTerm.season;

  return (
    `The ${yearEl} ${yearAnimal} year channels its influence through today's ${polarity} ${dayElement} current — ` +
    `${lunarMansion.name} Mansion (${lunarMansion.chinese}) draws energy toward ${xiuTheme}; ` +
    `${officerPhrase} in this ${season} season.`
  );
}

export function getChineseTimeEnergy(date: Date): ChineseTimeEnergy {
  const sexIndex = getSexagenaryDayIndex(date);
  const stemIndex = sexIndex % 10;
  const branchIndex = sexIndex % 12;

  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];
  const sexagenaryDay = `${stem.name}-${branch.name}`;
  const sexagenaryChinese = `${stem.chinese}${branch.chinese}`;

  const xiuIndex = getXiuIndex(date);
  const mansion = LUNAR_MANSIONS_XIU[xiuIndex];

  const officerIndex = getDayOfficerIndex(date);
  const officer = DAY_OFFICERS[officerIndex];

  const solarTerm = getCurrentSolarTerm(date);

  const { recommended, avoid } = classifyActivities(mansion, officer, stem, solarTerm);

  const yearPillar = getYearPillar(date);
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem);
  const monthPillar = getMonthPillar(date, yearStemIndex);

  const dayPillar: Pillar = {
    stem,
    branch,
    chinese: sexagenaryChinese,
    pinyin: sexagenaryDay,
  };

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    lunarMansion: mansion,
    heavenlyStem: stem,
    earthlyBranch: branch,
    sexagenaryDay,
    sexagenaryChinese,
    dayOfficer: officer,
    solarTerm,
    dayElement: stem.element,
    dayPolarity: stem.polarity,
    recommended,
    avoid,
  };
}
