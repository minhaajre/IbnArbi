import * as Astronomy from "astronomy-engine";
import { IBN_ARABI_MANSIONS, PLANETARY_RULERS_ORDER, DAY_RULERS, PLANET_STATUS_RULES, SIGNS } from "./constants";

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
  exact: boolean; // If within 1 degree of exaltation/debilitation peak
  longitude: number;
}

export function getPlanetaryHours(date: Date, lat: number, lng: number): {
  dayRuler: string;
  currentHour: PlanetaryHour | null;
  hours: PlanetaryHour[];
  sunrise: Date;
  sunset: Date;
} {
  // Astronomy Engine uses observer with lat, lng, elevation (0)
  const observer = new Astronomy.Observer(lat, lng, 0);
  
  // 1. Determine the "Planetary Day"
  // A planetary day starts at sunrise. If the current time is before sunrise,
  // it belongs to the previous calendar day's cycle.
  
  // First, get sunrise for the literal calendar date
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  
  let sunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, midnight, 1);
  
  if (!sunriseEvent) throw new Error("Could not calculate sunrise");
  
  let sunrise = sunriseEvent.date;
  
  // If current time is before sunrise, use previous day as the base
  let referenceDate = new Date(date);
  if (date < sunrise) {
    referenceDate.setDate(date.getDate() - 1);
    
    // Recalculate sunrise for the previous day
    const prevMidnight = new Date(referenceDate);
    prevMidnight.setHours(0, 0, 0, 0);
    sunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, prevMidnight, 1);
    if (!sunriseEvent) throw new Error("Could not calculate sunrise");
    sunrise = sunriseEvent.date;
  }
  
  // Now get sunset for this planetary day
  // Search for sunset AFTER this sunrise
  const sunsetEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunrise, 1);
  if (!sunsetEvent) throw new Error("Could not calculate sunset");
  const sunset = sunsetEvent.date;
  
  // Get NEXT sunrise (start of next planetary day)
  const nextSunriseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, sunset, 1);
  // Fallback if calculation fails (e.g., high latitudes), add 24h approx
  const nextSunrise = nextSunriseEvent ? nextSunriseEvent.date : new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
  
  // Determine Day Ruler based on the REFERENCE date (week day)
  const dayOfWeek = referenceDate.getDay(); // 0 = Sunday, etc.
  const dayRuler = DAY_RULERS[dayOfWeek as keyof typeof DAY_RULERS];
  
  // Generate Hours
  const hours: PlanetaryHour[] = [];
  const startIdx = PLANETARY_RULERS_ORDER.indexOf(dayRuler);
  
  // Day Duration
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const dayHourLen = dayDuration / 12;
  
  // Night Duration
  const nightDuration = nextSunrise.getTime() - sunset.getTime();
  const nightHourLen = nightDuration / 12;
  
  // Day Hours
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
  
  // Night Hours
  for (let i = 0; i < 12; i++) {
    const pIdx = (startIdx + 12 + i) % 7; // Continue sequence
    const start = new Date(sunset.getTime() + i * nightHourLen);
    const end = new Date(sunset.getTime() + (i + 1) * nightHourLen);
    
    hours.push({
      hour: i + 13, // 13-24
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
  
  return planets.map(name => {
    const body = Astronomy.Body[name as keyof typeof Astronomy.Body];
    // Geocentric coordinates
    const coords = Astronomy.GeoVector(body, date, false);
    const ecliptic = Astronomy.Ecliptic(coords);
    
    const longitude = ecliptic.elon; // 0-360
    const signIndex = Math.floor(longitude / 30);
    const sign = SIGNS[signIndex];
    const degree = longitude % 30;
    
    // Determine status
    let status: PlanetStatus['status'] = 'Neutral';
    let exact = false;
    
    const rules = PLANET_STATUS_RULES[name as keyof typeof PLANET_STATUS_RULES];
    if (rules) {
      // Check Exaltation
      if (sign === rules.exaltation) {
        status = 'Exalted';
        // Exact exaltation check (within 3 degrees)
        if (Math.abs(degree - rules.exaltationDegree) <= 3) exact = true;
      } 
      // Check Debilitation
      else if (sign === rules.debilitation) {
        status = 'Debilitated';
        // Exact debilitation check (within 3 degrees)
        if (Math.abs(degree - rules.debilitationDegree) <= 3) exact = true;
      }
      // Check Own Sign
      else {
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
      longitude
    };
  });
}

export function getLunarMansion(date: Date) {
  const body = Astronomy.Body.Moon;
  const coords = Astronomy.GeoVector(body, date, false);
  const ecliptic = Astronomy.Ecliptic(coords);
  
  const longitude = ecliptic.elon;
  // 360 degrees / 28 mansions = 12.857... degrees per mansion
  // Mansion 1 starts at 0 Aries (0 degrees)
  const mansionIndex = Math.floor((longitude % 360) / (360 / 28));
  
  // Ensure index is within 0-27 bounds
  const safeIndex = Math.max(0, Math.min(27, mansionIndex));
  
  return IBN_ARABI_MANSIONS[safeIndex];
}

export function getHijriDate(date: Date) {
  return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(date);
}
