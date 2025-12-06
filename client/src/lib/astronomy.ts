import * as Astronomy from "astronomy-engine";
import { IBN_ARABI_MANSIONS, PLANETARY_RULERS_ORDER, DAY_RULERS, PLANET_STATUS_RULES, SIGNS, AYANAMSHA_J2000, PRECESSION_RATE } from "./constants";

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
  status: 'Exalted' | 'Debilitated' | 'Neutral' | 'Own Sign';
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

export function getPlanetaryPositions(date: Date): PlanetStatus[] {
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  
  // Time delta for velocity/retrograde check (1 hour before)
  const prevDate = new Date(date.getTime() - 60 * 60 * 1000);

  return planets.map(name => {
    const body = Astronomy.Body[name as keyof typeof Astronomy.Body];
    
    // Current Position
    const coords = Astronomy.GeoVector(body, date, false);
    const ecliptic = Astronomy.Ecliptic(coords);
    const tropicalLon = ecliptic.elon;
    const siderealLon = getSiderealLongitude(tropicalLon, date);
    
    // Previous Position (for speed/retrograde)
    const prevCoords = Astronomy.GeoVector(body, prevDate, false);
    const prevEcliptic = Astronomy.Ecliptic(prevCoords);
    const prevTropicalLon = prevEcliptic.elon;
    const prevSiderealLon = getSiderealLongitude(prevTropicalLon, prevDate);
    
    // Calculate Speed (degrees per hour)
    // Handle 360 wrap-around
    let diff = siderealLon - prevSiderealLon;
    if (diff < -300) diff += 360;
    if (diff > 300) diff -= 360;
    
    const isRetrograde = diff < 0;

    const signIndex = Math.floor(siderealLon / 30);
    const sign = SIGNS[signIndex];
    const degree = siderealLon % 30;
    
    // Determine status
    let status: PlanetStatus['status'] = 'Neutral';
    let exact = false;
    
    const rules = PLANET_STATUS_RULES[name as keyof typeof PLANET_STATUS_RULES];
    if (rules) {
      if (sign === rules.exaltation) {
        status = 'Exalted';
        if (Math.abs(degree - rules.exaltationDegree) <= 3) exact = true;
      } else if (sign === rules.debilitation) {
        status = 'Debilitated';
        if (Math.abs(degree - rules.debilitationDegree) <= 3) exact = true;
      } else {
        const ownSigns: Record<string, string[]> = {
          Sun: ["Leo"], Moon: ["Cancer"], Mars: ["Aries", "Scorpio"],
          Mercury: ["Gemini", "Virgo"], Jupiter: ["Sagittarius", "Pisces"],
          Venus: ["Taurus", "Libra"], Saturn: ["Capricorn", "Aquarius"]
        };
        if (ownSigns[name] && ownSigns[name].includes(sign)) {
          status = 'Own Sign';
        }
      }
    }
    
    return {
      name,
      sign,
      degree,
      status,
      exact,
      longitude: siderealLon,
      isRetrograde,
      speed: diff
    };
  });
}

export function getLunarMansion(date: Date) {
  const body = Astronomy.Body.Moon;
  const coords = Astronomy.GeoVector(body, date, false);
  const ecliptic = Astronomy.Ecliptic(coords);
  const tropicalLon = ecliptic.elon;
  
  // Ibn Arabi's mansions are typically mapped to the TROPICAL zodiac in western Sufi studies (starting 0 Aries).
  // However, if the user requested "Sidereal Placements" generally, they might expect mansions to shift too.
  // But traditionally, Manazil al-Qamar are fixed star based (Sidereal).
  // Let's use Sidereal for consistency with the request "use fixed star based sidereal placements".
  
  const siderealLon = getSiderealLongitude(tropicalLon, date);
  
  const mansionIndex = Math.floor((siderealLon % 360) / (360 / 28));
  const safeIndex = Math.max(0, Math.min(27, mansionIndex));
  
  return IBN_ARABI_MANSIONS[safeIndex];
}

export function getMoonPhase(date: Date): MoonPhaseInfo {
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
  
  return {
    phase: diff,
    isWaxing,
    label,
    illumination: Astronomy.Illumination(Astronomy.Body.Moon, date).phase_fraction * 100
  };
}

export function getHijriDate(date: Date) {
  return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(date);
}
