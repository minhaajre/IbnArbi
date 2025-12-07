import * as Astronomy from "astronomy-engine";
import { IBN_ARABI_MANSIONS, PLANETARY_RULERS_ORDER, DAY_RULERS, PLANET_STATUS_RULES, SIGNS, AYANAMSHA_J2000, PRECESSION_RATE, ELEMENT_RULES, ELEMENT_ACTIVITIES } from "./constants";

export { ELEMENT_RULES, ELEMENT_ACTIVITIES, SIGNS };

export interface PlanetaryHour {
  hour: number;
  planet: string;
  type: 'day' | 'night';
  start: Date;
  end: Date;
  duration: number;
  isCurrent: boolean;
}

export interface PlanetStatus {
  name: string;
  sign: string;
  degree: number;
  status: 'Exalted' | 'Fall' | 'Rulership' | 'Detriment' | 'Neutral';
  exact: boolean;
  longitude: number;
  isRetrograde: boolean;
  speed: number;
}

export interface MoonPhaseInfo {
  phase: number; // 0-1
  isWaxing: boolean;
  label: string;
  illumination: number;
  isVoidOfCourse: boolean;
}

function getSiderealLongitude(tropicalLon: number, date: Date): number {
  // Calculate years since J2000
  const j2000 = new Date("2000-01-01T12:00:00Z");
  const daysSinceJ2000 = (date.getTime() - j2000.getTime()) / (1000 * 60 * 60 * 24);
  const yearsSinceJ2000 = daysSinceJ2000 / 365.25;
  
  // Calculate current Ayanamsha (Lahiri)
  // Ayanamsha = Initial (2000) + (Rate * Years)
  const currentAyanamsha = AYANAMSHA_J2000 + (PRECESSION_RATE * yearsSinceJ2000);
  
  let sidereal = tropicalLon - currentAyanamsha;
  
  // Normalize to 0-360
  if (sidereal < 0) sidereal += 360;
  if (sidereal >= 360) sidereal -= 360;
  
  return sidereal;
}

export function getPlanetaryHours(date: Date, lat: number, lng: number): {
  dayRuler: string;
  currentHour: PlanetaryHour | null;
  hours: PlanetaryHour[];
  sunrise: Date;
  sunset: Date;
} {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  
  let sunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, midnight, 1);
  if (!sunriseEvent) throw new Error("Could not calculate sunrise");
  let sunrise = sunriseEvent.date;
  
  let referenceDate = new Date(date);
  if (date < sunrise) {
    referenceDate.setDate(date.getDate() - 1);
    const prevMidnight = new Date(referenceDate);
    prevMidnight.setHours(0, 0, 0, 0);
    sunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, prevMidnight, 1);
    if (!sunriseEvent) throw new Error("Could not calculate sunrise");
    sunrise = sunriseEvent.date;
  }
  
  const sunsetEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunrise, 1);
  if (!sunsetEvent) throw new Error("Could not calculate sunset");
  const sunset = sunsetEvent.date;
  
  const nextSunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, sunset, 1);
  const nextSunrise = nextSunriseEvent ? nextSunriseEvent.date : new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
  
  const dayOfWeek = referenceDate.getDay();
  const dayRuler = DAY_RULERS[dayOfWeek as keyof typeof DAY_RULERS];
  
  const hours: PlanetaryHour[] = [];
  const startIdx = PLANETARY_RULERS_ORDER.indexOf(dayRuler);
  
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const dayHourLen = dayDuration / 12;
  const nightDuration = nextSunrise.getTime() - sunset.getTime();
  const nightHourLen = nightDuration / 12;
  
  for (let i = 0; i < 12; i++) {
    const pIdx = (startIdx + i) % 7;
    const start = new Date(sunrise.getTime() + i * dayHourLen);
    const end = new Date(sunrise.getTime() + (i + 1) * dayHourLen);
    
    hours.push({
      hour: i + 1,
      planet: PLANETARY_RULERS_ORDER[pIdx],
      type: 'day',
      start,
      end,
      duration: dayHourLen,
      isCurrent: date >= start && date < end
    });
  }
  
  for (let i = 0; i < 12; i++) {
    const pIdx = (startIdx + 12 + i) % 7;
    const start = new Date(sunset.getTime() + i * nightHourLen);
    const end = new Date(sunset.getTime() + (i + 1) * nightHourLen);
    
    hours.push({
      hour: i + 13,
      planet: PLANETARY_RULERS_ORDER[pIdx],
      type: 'night',
      start,
      end,
      duration: nightHourLen,
      isCurrent: date >= start && date < end
    });
  }
  
  const currentHour = hours.find(h => h.isCurrent) || null;
  
  return {
    dayRuler,
    currentHour,
    hours,
    sunrise,
    sunset
  };
}

export function getPlanetaryPositions(date: Date, useSidereal: boolean = true): PlanetStatus[] {
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  
  // Time delta for velocity/retrograde check (1 hour before)
  const prevDate = new Date(date.getTime() - 60 * 60 * 1000);

  return planets.map(name => {
    const body = Astronomy.Body[name as keyof typeof Astronomy.Body];
    
    // Current Position
    const coords = Astronomy.GeoVector(body, date, false);
    const ecliptic = Astronomy.Ecliptic(coords);
    const tropicalLon = ecliptic.elon;
    const lon = useSidereal ? getSiderealLongitude(tropicalLon, date) : tropicalLon;
    
    // Previous Position (for speed/retrograde)
    const prevCoords = Astronomy.GeoVector(body, prevDate, false);
    const prevEcliptic = Astronomy.Ecliptic(prevCoords);
    const prevTropicalLon = prevEcliptic.elon;
    const prevLon = useSidereal ? getSiderealLongitude(prevTropicalLon, prevDate) : prevTropicalLon;
    
    // Calculate Speed (degrees per hour)
    // Handle 360 wrap-around
    let diff = lon - prevLon;
    if (diff < -300) diff += 360;
    if (diff > 300) diff -= 360;
    
    const isRetrograde = diff < 0;

    const signIndex = Math.floor(lon / 30);
    const sign = SIGNS[signIndex];
    const degree = lon % 30;
    
    // Determine status using full dignity system
    let status: PlanetStatus['status'] = 'Neutral';
    let exact = false;
    
    const rules = PLANET_STATUS_RULES[name as keyof typeof PLANET_STATUS_RULES];
    if (rules) {
      if (sign === rules.exaltation) {
        status = 'Exalted';
        if (Math.abs(degree - rules.exaltationDegree) <= 3) exact = true;
      } else if (sign === rules.fall) {
        status = 'Fall';
        if (Math.abs(degree - rules.fallDegree) <= 3) exact = true;
      } else if (rules.rulership.includes(sign)) {
        status = 'Rulership';
      } else if (rules.detriment.includes(sign)) {
        status = 'Detriment';
      }
    }
    
    return {
      name,
      sign,
      degree,
      status,
      exact,
      longitude: lon,
      isRetrograde,
      speed: diff
    };
  });
}

export interface PlanetIngress {
  name: string;
  currentSign: string;
  nextSign: string;
  ingressDate: Date;
  daysUntil: number;
  isRetrograde: boolean;
  isApproximate: boolean;
}

export function getPlanetIngresses(date: Date, useSidereal: boolean = true): PlanetIngress[] {
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  
  // Get planetary positions to check retrograde status
  const positions = getPlanetaryPositions(date, useSidereal);
  
  return planets.map(name => {
    const planetData = positions.find(p => p.name === name);
    const lon = planetData?.longitude || 0;
    const isRetrograde = planetData?.isRetrograde || false;
    
    const currentSignIndex = Math.floor(lon / 30);
    const currentSign = SIGNS[currentSignIndex];
    const degreeInSign = lon % 30;
    
    // Average speeds (degrees per day) - use these for reliable estimates
    // Saturn ~12°/year, Jupiter ~30°/year, Mars ~0.5°/day, etc.
    const avgSpeeds: Record<string, number> = {
      Sun: 0.986,      // ~1° per day
      Moon: 13.2,      // ~13° per day  
      Mercury: 1.2,    // ~1.2° per day (varies a lot)
      Venus: 1.0,      // ~1° per day
      Mars: 0.52,      // ~0.5° per day
      Jupiter: 0.083,  // ~30° per year = 0.083°/day
      Saturn: 0.033    // ~12° per year = 0.033°/day
    };
    
    // Always use average speeds for consistent estimates
    const speed = avgSpeeds[name] || 1.0;
    
    let targetSign: string;
    let degreesToCross: number;
    
    if (isRetrograde) {
      // Retrograde: planet moves backward, will enter previous sign
      const prevSignIndex = (currentSignIndex - 1 + 12) % 12;
      targetSign = SIGNS[prevSignIndex];
      degreesToCross = degreeInSign; // Distance to 0° of current sign
    } else {
      // Direct motion: planet moves forward to next sign
      const nextSignIndex = (currentSignIndex + 1) % 12;
      targetSign = SIGNS[nextSignIndex];
      degreesToCross = 30 - degreeInSign; // Distance to 30° (0° of next sign)
    }
    
    const daysUntil = Math.max(1, Math.round(degreesToCross / speed));
    const ingressDate = new Date(date.getTime() + daysUntil * 24 * 60 * 60 * 1000);
    
    return {
      name,
      currentSign,
      nextSign: targetSign,
      ingressDate,
      daysUntil,
      isRetrograde,
      isApproximate: true
    };
  });
}

export function getLunarMansion(date: Date, useSidereal: boolean = true) {
  const body = Astronomy.Body.Moon;
  const coords = Astronomy.GeoVector(body, date, false);
  const ecliptic = Astronomy.Ecliptic(coords);
  const tropicalLon = ecliptic.elon;
  
  const lon = useSidereal ? getSiderealLongitude(tropicalLon, date) : tropicalLon;
  
  const mansionIndex = Math.floor((lon % 360) / (360 / 28));
  const safeIndex = Math.max(0, Math.min(27, mansionIndex));
  
  return IBN_ARABI_MANSIONS[safeIndex];
}

export function getMoonPhase(date: Date, useSidereal: boolean = true): MoonPhaseInfo {
  const sunCoords = Astronomy.GeoVector(Astronomy.Body.Sun, date, false);
  const moonCoords = Astronomy.GeoVector(Astronomy.Body.Moon, date, false);
  
  const sunEcl = Astronomy.Ecliptic(sunCoords);
  const moonEcl = Astronomy.Ecliptic(moonCoords);
  
  // Phase angle: Moon - Sun
  let diff = moonEcl.elon - sunEcl.elon;
  if (diff < 0) diff += 360;
  
  const isWaxing = diff < 180;
  const phase = Astronomy.MoonPhase(date); // 0-360
  
  let label = "";
  if (diff < 10 || diff > 350) label = "New Moon";
  else if (diff < 85) label = "Waxing Crescent";
  else if (diff < 95) label = "First Quarter";
  else if (diff < 175) label = "Waxing Gibbous";
  else if (diff < 185) label = "Full Moon";
  else if (diff < 265) label = "Waning Gibbous";
  else if (diff < 275) label = "Last Quarter";
  else label = "Waning Crescent";

  // Void of Course Calculation (Simplified check)
  // Moon is VOC when it makes no major aspect before changing signs.
  // This requires complex aspect calculation. 
  // For now, we can approximate "End of Sign" as a VOC warning zone (last 3 degrees)
  const tropicalLon = moonEcl.elon;
  const lon = useSidereal ? getSiderealLongitude(tropicalLon, date) : tropicalLon;
  const degree = lon % 30;
  const isVoidOfCourse = degree > 27; // Last 3 degrees of sign as a proxy for VOC period in simplified model
  
  return {
    phase: diff,
    isWaxing,
    label,
    illumination: Astronomy.Illumination(Astronomy.Body.Moon, date).phase_fraction * 100,
    isVoidOfCourse
  };
}

export function getHijriDate(date: Date) {
  return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(date);
}

export interface MansionProgress {
  currentMansionIndex: number;
  progressPercent: number;
  nextMansionDate: Date;
  timeUntilNext: string;
  nextMansion: typeof IBN_ARABI_MANSIONS[0];
}

export function getLunarMansionProgress(date: Date, useSidereal: boolean = true): MansionProgress {
  const body = Astronomy.Body.Moon;
  const coords = Astronomy.GeoVector(body, date, false);
  const ecliptic = Astronomy.Ecliptic(coords);
  const tropicalLon = ecliptic.elon;
  
  const lon = useSidereal ? getSiderealLongitude(tropicalLon, date) : tropicalLon;
  const mansionSize = 360 / 28; // 12.857° per mansion
  
  const currentMansionIndex = Math.floor((lon % 360) / mansionSize);
  const safeIndex = Math.max(0, Math.min(27, currentMansionIndex));
  
  // Progress within current mansion
  const positionInMansion = lon % mansionSize;
  const progressPercent = (positionInMansion / mansionSize) * 100;
  
  // Calculate next mansion boundary (in degrees)
  const nextMansionLon = ((safeIndex + 1) % 28) * mansionSize;
  
  // Calculate average moon speed (~13° per day) to estimate time
  const avgMoonSpeedPerHour = 13.0 / 24; // degrees per hour
  const degreesToNext = mansionSize - positionInMansion;
  const hoursUntilNext = degreesToNext / avgMoonSpeedPerHour;
  
  const nextMansionDate = new Date(date.getTime() + hoursUntilNext * 60 * 60 * 1000);
  
  // Format time until next
  const hours = Math.floor(hoursUntilNext);
  const minutes = Math.round((hoursUntilNext - hours) * 60);
  const timeUntilNext = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  
  const nextIndex = (safeIndex + 1) % 28;
  
  return {
    currentMansionIndex: safeIndex,
    progressPercent,
    nextMansionDate,
    timeUntilNext,
    nextMansion: IBN_ARABI_MANSIONS[nextIndex]
  };
}

export interface WhiteDaysInfo {
  isWhiteDay: boolean;
  currentLunarDay: number;
  whiteDays: { day: number; gregorianDate: Date }[];
  message: string;
  daysUntilNext: number;
}

export function getWhiteDaysInfo(date: Date): WhiteDaysInfo {
  // Parse Hijri date to get day of month
  const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
    day: 'numeric'
  });
  const dayStr = formatter.format(date);
  const currentLunarDay = parseInt(dayStr, 10);
  
  const isWhiteDay = currentLunarDay >= 13 && currentLunarDay <= 15;
  
  // Calculate approximate gregorian dates for white days this month
  const whiteDays: { day: number; gregorianDate: Date }[] = [];
  
  // Find day 13, 14, 15 of current lunar month
  for (let dayOffset = -15; dayOffset <= 15; dayOffset++) {
    const testDate = new Date(date.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    const testDayStr = formatter.format(testDate);
    const testDay = parseInt(testDayStr, 10);
    
    if (testDay >= 13 && testDay <= 15) {
      if (!whiteDays.find(w => w.day === testDay)) {
        whiteDays.push({ day: testDay, gregorianDate: testDate });
      }
    }
  }
  
  // Sort by day
  whiteDays.sort((a, b) => a.day - b.day);
  
  let message = "";
  let daysUntilNext = 0;
  
  if (isWhiteDay) {
    message = `Today is the ${currentLunarDay}th - a blessed White Day for fasting (Ayyam al-Bid)`;
    daysUntilNext = 0;
  } else if (currentLunarDay < 13) {
    daysUntilNext = 13 - currentLunarDay;
    message = daysUntilNext <= 3 
      ? `White Days begin in ${daysUntilNext} day${daysUntilNext > 1 ? 's' : ''}`
      : `White Days (13-15) coming this lunar month`;
  } else {
    // After day 15, calculate days until day 13 of next month
    // Lunar month is roughly 29.5 days
    daysUntilNext = (29 - currentLunarDay) + 13;
    message = `White Days completed for this lunar month`;
  }
  
  return {
    isWhiteDay,
    currentLunarDay,
    whiteDays,
    message,
    daysUntilNext
  };
}
