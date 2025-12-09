import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function MosqueIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L12 4" />
      <path d="M12 4C8 4 5 7 5 10V20H19V10C19 7 16 4 12 4Z" />
      <path d="M5 20H19" />
      <path d="M9 20V16C9 14.9 9.9 14 11 14H13C14.1 14 15 14.9 15 16V20" />
      <path d="M2 20V14L4 12" />
      <path d="M22 20V14L20 12" />
      <path d="M2 12L2 20" />
      <path d="M22 12L22 20" />
    </svg>
  );
}

export function CrescentMoonIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function CrescentStarIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 12.79A7 7 0 1 1 10.21 5 5.5 5.5 0 0 0 18 12.79z" />
      <path d="M19 4L19.5 5.5L21 6L19.5 6.5L19 8L18.5 6.5L17 6L18.5 5.5L19 4Z" />
    </svg>
  );
}

export function LanternIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2V4" />
      <path d="M10 4H14" />
      <path d="M9 4C8 5 7 7 7 9V18C7 19.1 7.9 20 9 20H15C16.1 20 17 19.1 17 18V9C17 7 16 5 15 4" />
      <path d="M9 8H15" />
      <path d="M9 12H15" />
      <path d="M9 16H15" />
      <path d="M11 20V22" />
      <path d="M13 20V22" />
    </svg>
  );
}

export function PrayerBeadsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="3" r="1.5" />
      <circle cx="8" cy="5" r="1.5" />
      <circle cx="5" cy="9" r="1.5" />
      <circle cx="4" cy="14" r="1.5" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="10" cy="21" r="1.5" />
      <circle cx="14" cy="21" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <circle cx="20" cy="14" r="1.5" />
      <circle cx="19" cy="9" r="1.5" />
      <circle cx="16" cy="5" r="1.5" />
      <path d="M12 4.5V8" />
      <path d="M10 8H14" />
      <path d="M12 8V11" />
    </svg>
  );
}

export function QuranIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M12 6L12 7.5" />
      <path d="M10.5 8.5C10.5 8.5 11 9 12 9C13 9 13.5 8.5 13.5 8.5" />
      <path d="M9 11H15" />
      <path d="M9 14H15" />
    </svg>
  );
}

export function KaabaIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M4 12H20" />
      <path d="M8 6V4" />
      <path d="M16 6V4" />
      <path d="M7 15H17" />
      <circle cx="12" cy="9" r="1" />
    </svg>
  );
}

export function PrayerRugIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8H21" />
      <path d="M3 16H21" />
      <path d="M12 8V4" />
      <path d="M9 8C9 10 10.5 12 12 12C13.5 12 15 10 15 8" />
    </svg>
  );
}

export function EightPointedStarIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
    </svg>
  );
}

export function DuaHandsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M7 21V13C7 11.9 6.1 11 5 11V21H7Z" />
      <path d="M17 21V13C17 11.9 17.9 11 19 11V21H17Z" />
      <path d="M7 13C7 9 9 5 12 3C15 5 17 9 17 13" />
      <path d="M9 11C9 9 10.5 7 12 6C13.5 7 15 9 15 11" />
    </svg>
  );
}

export function SunriseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2V6" />
      <path d="M12 10C9.24 10 7 12.24 7 15H17C17 12.24 14.76 10 12 10Z" />
      <path d="M4.22 10.22L6.34 12.34" />
      <path d="M17.66 12.34L19.78 10.22" />
      <path d="M1 15H5" />
      <path d="M19 15H23" />
      <path d="M3 18H21" />
      <path d="M5 21H19" />
    </svg>
  );
}

export function MinharahIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L12 4" />
      <path d="M10 4H14" />
      <path d="M11 4V6H13V4" />
      <path d="M10 6L10 20" />
      <path d="M14 6L14 20" />
      <path d="M8 20H16" />
      <path d="M10 10H14" />
      <path d="M10 14H14" />
    </svg>
  );
}

export function IslamicPatternIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function DomeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2L12 5" />
      <path d="M4 14C4 9.58 7.58 6 12 6C16.42 6 20 9.58 20 14" />
      <path d="M4 14H20" />
      <path d="M6 14V20" />
      <path d="M18 14V20" />
      <path d="M4 20H20" />
    </svg>
  );
}

export function TasbihIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <ellipse cx="12" cy="12" rx="8" ry="9" />
      <circle cx="12" cy="3.5" r="1" />
      <circle cx="7" cy="5" r="1" />
      <circle cx="4.5" cy="9" r="1" />
      <circle cx="4" cy="14" r="1" />
      <circle cx="6" cy="18" r="1" />
      <circle cx="10" cy="20.5" r="1" />
      <circle cx="14" cy="20.5" r="1" />
      <circle cx="18" cy="18" r="1" />
      <circle cx="20" cy="14" r="1" />
      <circle cx="19.5" cy="9" r="1" />
      <circle cx="17" cy="5" r="1" />
      <path d="M12 3.5V1" />
      <circle cx="12" cy="0.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function MihrabIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 21V10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10V21" />
      <path d="M4 21H20" />
      <path d="M12 4V2" />
      <path d="M9 12H15" />
      <path d="M9 16H15" />
    </svg>
  );
}

export function CalligraphyIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 20C6 18 8 14 10 10C12 6 14 4 16 4C18 4 19 5 19 7C19 9 17 12 14 14" />
      <path d="M14 14C12 16 10 18 10 19C10 20 11 21 13 21C15 21 18 19 20 16" />
      <circle cx="18" cy="6" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function ZodiacWheelIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2V6" />
      <path d="M12 18V22" />
      <path d="M2 12H6" />
      <path d="M18 12H22" />
      <path d="M4.93 4.93L7.76 7.76" />
      <path d="M16.24 16.24L19.07 19.07" />
      <path d="M4.93 19.07L7.76 16.24" />
      <path d="M16.24 7.76L19.07 4.93" />
    </svg>
  );
}

export function ElementFireIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22C16.42 22 20 18.42 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.42 7.58 22 12 22Z" />
      <path d="M12 22C14.21 22 16 19.54 16 16.5C16 12 12 8 12 8C12 8 8 12 8 16.5C8 19.54 9.79 22 12 22Z" />
    </svg>
  );
}

export function ElementWaterIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2C12 2 4 10 4 15C4 19.42 7.58 22 12 22C16.42 22 20 19.42 20 15C20 10 12 2 12 2Z" />
      <path d="M8 16C8 16 9 18 12 18C15 18 16 16 16 16" />
    </svg>
  );
}

export function ElementAirIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
      <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

export function ElementEarthIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22C16.42 22 20 18.42 20 14V10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10V14C4 18.42 7.58 22 12 22Z" />
      <path d="M4 14H20" />
      <path d="M8 18V22" />
      <path d="M16 18V22" />
      <path d="M12 14V10" />
      <path d="M9 10H15" />
    </svg>
  );
}
