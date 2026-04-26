import { useState, useEffect } from "react";
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

export function useAstronomyData(
  now: Date,
  hoursTime: Date,
  location: LocationData | null,
  useSidereal: boolean
) {
  const [hoursData, setHoursData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [planets, setPlanets] = useState<PlanetStatus[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mansion, setMansion] = useState<any>(null);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [moonPhase, setMoonPhase] = useState<MoonPhaseInfo | null>(null);
  const [mansionProgress, setMansionProgress] = useState<MansionProgress | null>(null);
  const [whiteDaysInfo, setWhiteDaysInfo] = useState<WhiteDaysInfo | null>(null);
  const [ingresses, setIngresses] = useState<PlanetIngress[]>([]);
  const [moonTimes, setMoonTimes] = useState<MoonTimes | null>(null);
  const [nakshatraInfo, setNakshatraInfo] = useState<NakshatraInfo | null>(null);
  const [planetNakshatras, setPlanetNakshatras] = useState<PlanetNakshatra[]>([]);
  const [chineseTimeEnergy, setChineseTimeEnergy] = useState<ChineseTimeEnergy | null>(null);
  const [hoursSectionData, setHoursSectionData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Main astronomical calculation — recomputes when date, location, or zodiac system changes
  useEffect(() => {
    if (!location) return;
    try {
      const hours = getPlanetaryHours(now, location.lat, location.lng);
      const planetPos = getPlanetaryPositions(now, useSidereal);
      const moonMansion = getLunarMansion(now, useSidereal);
      const hijri = getHijriDate(now);
      const phase = getMoonPhase(now, useSidereal);
      const progress = getLunarMansionProgress(now, useSidereal);
      const whiteInfo = getWhiteDaysInfo(now);
      const planetIngresses = getPlanetIngresses(now, useSidereal);
      const moonRiseSet = getMoonTimes(now, location.lat, location.lng);
      const nakshatraData = getNakshatraInfo(now);
      const allPlanetNakshatras = getAllPlanetNakshatras(now);
      const chineseData = getChineseTimeEnergy(now);

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setMoonPhase(phase);
      setMansionProgress(progress);
      setWhiteDaysInfo(whiteInfo);
      setIngresses(planetIngresses);
      setMoonTimes(moonRiseSet);
      setNakshatraInfo(nakshatraData);
      setPlanetNakshatras(allPlanetNakshatras);
      setChineseTimeEnergy(chineseData);
      setLoading(false);
    } catch (e) {
      console.error("Calculation error:", e);
      setError("Failed to calculate astronomical data.");
    }
  }, [now, location, useSidereal]);

  // Separate calculation for the Planetary Hours section (uses its own independent time)
  useEffect(() => {
    if (!location) return;
    try {
      const hours = getPlanetaryHours(hoursTime, location.lat, location.lng);
      setHoursSectionData(hours);
    } catch (e) {
      console.error("Hours calculation error:", e);
    }
  }, [hoursTime, location]);

  return {
    hoursData,
    planets,
    mansion,
    hijriDate,
    moonPhase,
    mansionProgress,
    whiteDaysInfo,
    ingresses,
    moonTimes,
    nakshatraInfo,
    planetNakshatras,
    chineseTimeEnergy,
    hoursSectionData,
    loading,
    error,
  };
}
