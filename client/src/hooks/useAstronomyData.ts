import { useMemo } from "react";
import {
  getPlanetaryHours,
  getPlanetaryPositions,
  getLunarMansion,
  getHijriDate,
  getMoonPhase,
  getLunarMansionProgress,
  getWhiteDaysInfo,
  getPlanetIngresses,
  getMoonTimes,
  getNakshatraInfo,
  getAllPlanetNakshatras,
  type PlanetStatus,
  type MoonPhaseInfo,
  type MansionProgress,
  type WhiteDaysInfo,
  type PlanetIngress,
  type MoonTimes,
  type NakshatraInfo,
  type PlanetNakshatra,
} from "@/lib/astronomy";
import { getChineseTimeEnergy, type ChineseTimeEnergy } from "@/lib/chinese-astro";
import type { LocationData } from "@/hooks/useLocationSearch";
import type { Mansion } from "@/data/mansions";

// All astronomy calculations are synchronous, so useMemo is the right primitive —
// no intermediate state, no batched re-renders, no useEffect needed.

interface AstroSnapshot {
  hoursData: ReturnType<typeof getPlanetaryHours>;
  planets: PlanetStatus[];
  mansion: Mansion;
  hijriDate: string;
  moonPhase: MoonPhaseInfo;
  mansionProgress: MansionProgress;
  whiteDaysInfo: WhiteDaysInfo;
  ingresses: PlanetIngress[];
  moonTimes: MoonTimes;
  nakshatraInfo: NakshatraInfo;
  planetNakshatras: PlanetNakshatra[];
  chineseTimeEnergy: ChineseTimeEnergy;
}

export function useAstronomyData(
  now: Date,
  hoursTime: Date,
  location: LocationData | null,
  useSidereal: boolean
) {
  // Main snapshot — recomputes when date, location, or zodiac system changes
  const astroData = useMemo((): AstroSnapshot | null => {
    if (!location) return null;
    try {
      return {
        hoursData: getPlanetaryHours(now, location.lat, location.lng),
        planets: getPlanetaryPositions(now, useSidereal),
        mansion: getLunarMansion(now, useSidereal),
        hijriDate: getHijriDate(now),
        moonPhase: getMoonPhase(now, useSidereal),
        mansionProgress: getLunarMansionProgress(now, useSidereal),
        whiteDaysInfo: getWhiteDaysInfo(now),
        ingresses: getPlanetIngresses(now, useSidereal),
        moonTimes: getMoonTimes(now, location.lat, location.lng),
        nakshatraInfo: getNakshatraInfo(now),
        planetNakshatras: getAllPlanetNakshatras(now),
        chineseTimeEnergy: getChineseTimeEnergy(now),
      };
    } catch (e) {
      console.error("Calculation error:", e);
      return null;
    }
  }, [now, location, useSidereal]);

  // Independent snapshot for the Planetary Hours section time-travel picker
  const hoursSectionData = useMemo(() => {
    if (!location) return null;
    try {
      return getPlanetaryHours(hoursTime, location.lat, location.lng);
    } catch (e) {
      console.error("Hours calculation error:", e);
      return null;
    }
  }, [hoursTime, location]);

  const loading = !location || !astroData;

  return {
    hoursData: astroData?.hoursData ?? null,
    planets: astroData?.planets ?? [],
    mansion: astroData?.mansion ?? null,
    hijriDate: astroData?.hijriDate ?? "",
    moonPhase: astroData?.moonPhase ?? null,
    mansionProgress: astroData?.mansionProgress ?? null,
    whiteDaysInfo: astroData?.whiteDaysInfo ?? null,
    ingresses: astroData?.ingresses ?? [],
    moonTimes: astroData?.moonTimes ?? null,
    nakshatraInfo: astroData?.nakshatraInfo ?? null,
    planetNakshatras: astroData?.planetNakshatras ?? [],
    chineseTimeEnergy: astroData?.chineseTimeEnergy ?? null,
    hoursSectionData,
    loading,
  };
}
