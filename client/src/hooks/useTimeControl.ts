import { useState, useEffect } from "react";

export function useTimeControl() {
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAutoTime, setIsAutoTime] = useState(true);

  // Independent time state for the Planetary Hours section (allows time-travel without affecting other sections)
  const [hoursTime, setHoursTime] = useState<Date>(new Date());
  const [hoursTimeAuto, setHoursTimeAuto] = useState(true);
  const [hoursSelectedDate, setHoursSelectedDate] = useState<Date | undefined>(new Date());

  // Main clock — advances every minute when in auto mode
  useEffect(() => {
    if (!isAutoTime) return;
    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);
      setSelectedDate(d);
    }, 60000);
    return () => clearInterval(timer);
  }, [isAutoTime]);

  // Hours section clock — independent auto-advance
  useEffect(() => {
    if (!hoursTimeAuto) return;
    const timer = setInterval(() => {
      const d = new Date();
      setHoursTime(d);
      setHoursSelectedDate(d);
    }, 60000);
    return () => clearInterval(timer);
  }, [hoursTimeAuto]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setIsAutoTime(false);
      setSelectedDate(date);
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

  const handleHoursDateSelect = (date: Date | undefined) => {
    if (date) {
      setHoursTimeAuto(false);
      setHoursSelectedDate(date);
      const newDate = new Date(date);
      newDate.setHours(hoursTime.getHours(), hoursTime.getMinutes());
      setHoursTime(newDate);
    }
  };

  const handleHoursTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      setHoursTimeAuto(false);
      const newDate = new Date(hoursTime);
      newDate.setHours(hours, minutes, 0, 0);
      setHoursTime(newDate);
    }
  };

  const resetHoursToNow = () => {
    const d = new Date();
    setHoursTimeAuto(true);
    setHoursSelectedDate(d);
    setHoursTime(d);
  };

  return {
    now,
    selectedDate,
    isAutoTime,
    hoursTime,
    hoursTimeAuto,
    hoursSelectedDate,
    handleDateSelect,
    resetToNow,
    handleHoursDateSelect,
    handleHoursTimeChange,
    resetHoursToNow,
  };
}
