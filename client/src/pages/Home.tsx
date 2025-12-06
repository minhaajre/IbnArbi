import { useEffect, useState } from "react";
import { 
  getPlanetaryHours, 
  getPlanetaryPositions, 
  getLunarMansion, 
  getHijriDate,
  PlanetaryHour,
  PlanetStatus
} from "@/lib/astronomy";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { MapPin, RefreshCcw } from "lucide-react";

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Astronomical State
  const [hoursData, setHoursData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [planets, setPlanets] = useState<PlanetStatus[]>([]);
  const [mansion, setMansion] = useState<any>(null);
  const [hijriDate, setHijriDate] = useState<string>("");

  // Timer for minute updates
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Detected Location" // We could reverse geocode if needed
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback to Mecca or London if blocked
          setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
          setError("Location access denied. Using default.");
        }
      );
    } else {
      setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
    }
  }, []);

  // Update calculations when time or location changes
  useEffect(() => {
    if (!location) return;

    try {
      const hours = getPlanetaryHours(now, location.lat, location.lng);
      const planetPos = getPlanetaryPositions(now);
      const moonMansion = getLunarMansion(now);
      const hijri = getHijriDate(now);

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setLoading(false);
    } catch (e) {
      console.error("Calculation error:", e);
      setError("Failed to calculate astronomical data.");
    }
  }, [now, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse text-gold font-serif text-2xl">Calculating Spheres...</div>
      </div>
    );
  }

  if (!hoursData || !mansion) return null;

  // Find next hours for display
  const nextHoursIndex = hoursData.hours.findIndex(h => h === hoursData.currentHour);
  const nextHours = hoursData.hours.slice(nextHoursIndex + 1).concat(hoursData.hours.slice(0, nextHoursIndex + 1));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold mb-2">Al-Falak</h1>
          <p className="text-muted-foreground font-light tracking-wide">Lunar & Planetary Calendar</p>
        </div>

        <div className="text-right md:text-right flex flex-col items-start md:items-end">
          <div className="text-2xl font-mono font-light mb-1">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <MapPin className="w-3 h-3" />
            {location?.name} ({location?.lat.toFixed(2)}°, {location?.lng.toFixed(2)}°)
          </div>
          <div className="text-gold/80 font-arabic text-lg">
            {hijriDate}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column: Planetary Hours & Mansion */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Planetary Hour Display */}
          <section className="bg-card/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
             <PlanetaryHoursDisplay 
               currentHour={hoursData.currentHour}
               nextHours={nextHours}
               dayRuler={hoursData.dayRuler}
             />
          </section>

          {/* Lunar Mansion */}
          <section>
            <h2 className="text-2xl font-serif mb-6 text-foreground/80">Current Station</h2>
            <MansionCard mansion={mansion} />
          </section>

        </div>

        {/* Sidebar: Planetary Status Table */}
        <div className="lg:col-span-5 space-y-8">
          <section>
            <h2 className="text-2xl font-serif mb-6 text-foreground/80">Celestial State</h2>
            <PlanetaryTable planets={planets} />
          </section>

          {/* Info / Key */}
          <div className="bg-secondary/20 rounded-xl p-6 border border-white/5 text-sm text-muted-foreground">
            <h3 className="text-foreground font-medium mb-2">About this Calendar</h3>
            <p className="mb-2 leading-relaxed">
              Based on the classical Chaldean order of planetary hours and Ibn Arabi's mystical interpretation of the 28 Lunar Mansions.
            </p>
            <p className="opacity-70">
              Calculations are performed locally based on your coordinates.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
