import { useState, useCallback, useEffect } from "react";

export interface LocationData {
  lat: number;
  lng: number;
  name: string;
}

export interface LocationSuggestion {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export function useLocationSearch() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [manualCity, setManualCity] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Silent IP-based geolocation — no browser permission required.
  // Fires automatically on mount; GPS stays as an explicit opt-in.
  const detectFromIP = useCallback(async () => {
    setIsLocating(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      if (data.latitude && data.longitude) {
        const cityName = [data.city, data.country_name].filter(Boolean).join(", ");
        setLocation({
          lat: data.latitude,
          lng: data.longitude,
          name: cityName || "Detected Location",
        });
        setIsLocating(false);
        return; // success — skip GPS fallback
      }
    } catch (e) {
      console.warn("IP geolocation failed, falling back to GPS", e);
    }
    // IP lookup failed — try GPS silently
    detectLocationInternal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Internal GPS path (shared by detectFromIP fallback and the explicit GPS button).
  const detectLocationInternal = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setLocation((current) => {
        if (current === null) {
          console.warn("Geolocation timeout - using default location");
          setIsLocating(false);
          return { lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" };
        }
        return current;
      });
    }, 5000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timeoutId);
          let cityName = "Detected Location";
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await res.json();
            if (data.city || data.locality) {
              cityName = `${data.city || data.locality}, ${data.countryName}`;
            }
          } catch (e) {
            console.warn("Reverse geocoding failed", e);
          }
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: cityName,
          });
          setIsLocating(false);
        },
        (err) => {
          clearTimeout(timeoutId);
          console.error("Geolocation error:", err);
          setLocation((current) => {
            if (current === null) {
              setLocationError("Location access denied. Using default.");
              return { lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" };
            }
            return current;
          });
          setIsLocating(false);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      clearTimeout(timeoutId);
      setLocation({ lat: 21.3891, lng: 39.8579, name: "Mecca (Default)" });
      setIsLocating(false);
    }
  }, []);

  // Auto-detect on mount via IP (silent, no permission prompt).
  useEffect(() => {
    detectFromIP();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Public GPS detect — called by the "Auto-Detect Location" button.
  const detectLocation = useCallback(() => {
    setIsLocating(true);
    detectLocationInternal();
  }, [detectLocationInternal]);

  const handleCityInput = useCallback(async (value: string) => {
    setManualCity(value);
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=10&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        interface GeoResult { name: string; country?: string; latitude: number; longitude: number; }
        setSuggestions(
          data.results.map((r: GeoResult) => ({
            name: r.name,
            country: r.country || "",
            latitude: r.latitude,
            longitude: r.longitude,
          }))
        );
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (e) {
      console.error("Geocoding error", e);
      setSuggestions([]);
    }
  }, []);

  const selectLocation = useCallback((place: LocationSuggestion) => {
    setLocation({
      lat: place.latitude,
      lng: place.longitude,
      name: `${place.name}, ${place.country}`,
    });
    setManualCity("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  return {
    location,
    manualCity,
    isLocating,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    locationError,
    detectLocation,
    handleCityInput,
    selectLocation,
  };
}
