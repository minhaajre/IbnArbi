import { useEffect, useState, useCallback, useRef } from "react";
import { PlanetaryHour } from "@/lib/astronomy";

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄"
};

const PLANET_ARABIC: Record<string, string> = {
  Sun: "الشمس",
  Moon: "القمر",
  Mars: "المريخ",
  Mercury: "عطارد",
  Jupiter: "المشتري",
  Venus: "الزهرة",
  Saturn: "زحل"
};

export function usePlanetaryNotifications(currentHour: PlanetaryHour | null) {
  const [permissionState, setPermissionState] = useState<NotificationPermission>("default");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const lastNotifiedHour = useRef<string | null>(null);

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionState(Notification.permission);
      const saved = localStorage.getItem("planetaryNotificationsEnabled");
      if (saved === "true" && Notification.permission === "granted") {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return false;
    }

    const permission = await Notification.requestPermission();
    setPermissionState(permission);
    
    if (permission === "granted") {
      setNotificationsEnabled(true);
      localStorage.setItem("planetaryNotificationsEnabled", "true");
      return true;
    }
    return false;
  }, []);

  const toggleNotifications = useCallback(async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem("planetaryNotificationsEnabled", "false");
    } else {
      if (permissionState === "granted") {
        setNotificationsEnabled(true);
        localStorage.setItem("planetaryNotificationsEnabled", "true");
      } else {
        await requestPermission();
      }
    }
  }, [notificationsEnabled, permissionState, requestPermission]);

  useEffect(() => {
    if (!notificationsEnabled || !currentHour) return;

    const hourKey = `${currentHour.hour}-${currentHour.planet}-${currentHour.start.getTime()}`;
    
    if (lastNotifiedHour.current === hourKey) return;

    const now = new Date();
    const hourStart = currentHour.start;
    const timeSinceStart = now.getTime() - hourStart.getTime();
    
    if (timeSinceStart < 60000) {
      const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      };

      const notification = new Notification(`${PLANET_SYMBOLS[currentHour.planet]} Hour of ${currentHour.planet}`, {
        body: `${PLANET_ARABIC[currentHour.planet]} | ${formatTime(currentHour.start)} - ${formatTime(currentHour.end)}`,
        icon: "/favicon.ico",
        tag: "planetary-hour",
        requireInteraction: false,
        silent: false
      });

      lastNotifiedHour.current = hourKey;

      setTimeout(() => notification.close(), 8000);
    } else {
      lastNotifiedHour.current = hourKey;
    }
  }, [currentHour, notificationsEnabled]);

  useEffect(() => {
    if (!notificationsEnabled || !currentHour) return;

    const timeUntilEnd = currentHour.end.getTime() - Date.now();
    
    if (timeUntilEnd > 0 && timeUntilEnd < 3600000) {
      const timer = setTimeout(() => {
        lastNotifiedHour.current = null;
      }, timeUntilEnd);

      return () => clearTimeout(timer);
    }
  }, [currentHour, notificationsEnabled]);

  return {
    permissionState,
    notificationsEnabled,
    toggleNotifications,
    requestPermission
  };
}
