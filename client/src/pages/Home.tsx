import { useEffect, useState } from "react";
import { 
  getPlanetaryHours, 
  getPlanetaryPositions, 
  getLunarMansion, 
  getHijriDate,
  getMoonPhase,
  PlanetaryHour,
  PlanetStatus,
  MoonPhaseInfo
} from "@/lib/astronomy";
import { AYANAMSHA_J2000 } from "@/lib/constants";
import { PlanetaryHoursDisplay } from "@/components/PlanetaryHoursDisplay";
import { PlanetaryTable } from "@/components/PlanetaryTable";
import { MansionCard } from "@/components/MansionCard";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  // State
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Astronomical Data
  const [hoursData, setHoursData] = useState<ReturnType<typeof getPlanetaryHours> | null>(null);
  const [planets, setPlanets] = useState<PlanetStatus[]>([]);
  const [mansion, setMansion] = useState<any>(null);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [moonPhase, setMoonPhase] = useState<MoonPhaseInfo | null>(null);

  // Timer
  useEffect(() => {
    if (!isAutoTime) return;
    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);
      setSelectedDate(d);
    }, 60000);
    return () => clearInterval(timer);
  }, [isAutoTime]);

  // Handle Date Selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setIsAutoTime(false);
      setSelectedDate(date);
      
      // Preserve current time but change date
      const newDate = new Date(date);
      const currentTime = new Date();
      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      setNow(newDate);
    }
  };

  const resetToNow = () => {
    const d = new Date();
    setIsAutoTime(true);
    setSelectedDate(d);
    setNow(d);
  };

  // Initialize Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Detected Location"
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
          setError("Location access denied. Using default.");
        }
      );
    } else {
      setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
    }
  }, []);

  // Calculations
  useEffect(() => {
    if (!location) return;

    try {
      // Use 'now' which is driven by auto-time OR manual selection
      const hours = getPlanetaryHours(now, location.lat, location.lng);
      const planetPos = getPlanetaryPositions(now);
      const moonMansion = getLunarMansion(now);
      const hijri = getHijriDate(now);
      const phase = getMoonPhase(now);

      setHoursData(hours);
      setPlanets(planetPos);
      setMansion(moonMansion);
      setHijriDate(hijri);
      setMoonPhase(phase);
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

  const nextHoursIndex = hoursData.hours.findIndex(h => h === hoursData.currentHour);
  const nextHours = hoursData.hours.slice(nextHoursIndex + 1).concat(hoursData.hours.slice(0, nextHoursIndex + 1));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold mb-2">Al-Falak</h1>
          <p className="text-muted-foreground font-light tracking-wide">Sidereal Planetary Calendar</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Date Controls */}
          <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-white/10">
             <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={`w-[240px] justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {!isAutoTime && (
              <Button size="icon" variant="ghost" onClick={resetToNow} title="Reset to Now">
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="text-right">
            <div className="text-2xl font-mono font-light mb-1">
              {format(now, "h:mm a")}
            </div>
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              {location?.name}
            </div>
            <div className="text-gold/80 font-arabic text-lg">
              {hijriDate}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Combined Status Card: Hour + Moon + Phase */}
          <section className="bg-card/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
             
             {/* Moon Phase Indicator */}
             {moonPhase && (
               <div className="absolute top-4 right-4 flex flex-col items-end">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                   <span>{moonPhase.label}</span>
                   <span className="text-xs px-1.5 py-0.5 rounded bg-white/10">
                     {Math.round(moonPhase.illumination)}%
                   </span>
                 </div>
                 <div className="text-xs uppercase tracking-widest opacity-50">
                   {moonPhase.isWaxing ? "Waxing" : "Waning"}
                 </div>
               </div>
             )}

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

          {/* Zodiac Wheel Visualization */}
          <section className="bg-card/20 border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-serif mb-6 text-center text-foreground/80">Sidereal Wheel</h2>
            <ZodiacWheel planets={planets} />
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <section>
            <h2 className="text-2xl font-serif mb-6 text-foreground/80">Celestial Dignities</h2>
            <PlanetaryTable planets={planets} />
          </section>

          <div className="bg-secondary/20 rounded-xl p-6 border border-white/5 text-sm text-muted-foreground">
            <h3 className="text-foreground font-medium mb-2">Sidereal Calculations</h3>
            <p className="mb-2 leading-relaxed">
              Planetary positions are calculated using the <strong>Sidereal Zodiac</strong> with Lahiri Ayanamsha ({AYANAMSHA_J2000.toFixed(2)}° + precession).
            </p>
            <p className="opacity-70">
              Retrograde motion (Rx) is detected by comparing longitudinal velocity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
