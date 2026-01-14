# Al-Falak - Lunar & Planetary Calendar

## Overview

Al-Falak is a specialized astronomical and spiritual calendar application that combines Islamic traditions with modern astronomical calculations. The application displays planetary hours, Ibn Arabi's Lunar Mansions (28 stations), Hijri calendar dates, moon phases, and detailed planetary positions using both tropical and sidereal (Lahiri Ayanamsha) zodiac systems. It provides users with real-time celestial data for spiritual and astrological purposes, featuring an elegant, mystical interface with Arabic typography and astronomical visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2026)

- **Al-Buni Framework Integration**: Comprehensive Imam Al-Buni framework from Shams al-Ma'arif al-Kubra implemented:
  - 7 work categories: Love, Wealth, Authority, Protection, Health, Knowledge, Conflict
  - Each category includes Divine Names (primary & secondary) with Abjad values
  - Arabic letters with numerical values
  - Recommended planetary hours for each category
  - Al-Buni guidelines for optimal timing
- **Optimal Dates Finder**: New collapsible section displaying:
  - Correct optimal and avoid mansions per Al-Buni framework
  - Scorpio Block warning (Mansions 16-21 block Love & Health)
  - Waning Moon warning (weakens Love & Wealth activities)
  - Divine Names, Abjad values, governing letters, planetary hours
- **Planetary Hours Buni Info**: Current hour displays ruling angel, recommended incense, and jinn king
- **Auth-Gated Premium Content**: Akbarian guidance and Optimal Dates require Google sign-in
- **Mansion Sa'd/Nahs Tags**: Benefic (green) and Malefic (red) nature indicators

## Previous Changes (December 2025)

- **Mansion Theme Section**: Now starts collapsed by default on app load (was expanded)
- **Hourly Protocol**: Removed "Wear" section that displayed planet colors
- **Advanced Tips Page**: New page (`/advanced-tips`) added with 7 comprehensive sections on psychological and somatic alignment
- **NS Modulation Button**: Added to PlanetaryProtocol component linking to Advanced Tips page

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite as the build tool and development server.

**Routing**: Uses Wouter for lightweight client-side routing. Single-page application with minimal route structure (Home page and 404 handler).

**UI Components**: Radix UI primitives wrapped with custom styling via shadcn/ui component library. Implements the "new-york" style variant with Tailwind CSS for styling. Component architecture follows atomic design with reusable UI primitives in `/client/src/components/ui/`.

**State Management**: 
- React Query (@tanstack/react-query) for server state and data fetching
- Local React state (useState) for UI interactions and component-level state
- Context API for theme management (next-themes) and shared UI state (TooltipProvider)

**Styling System**:
- Tailwind CSS v4 with custom CSS variables for theming
- Dark/light mode support with system preference detection
- Custom fonts: Satoshi, Inter (sans-serif), Clash Display, Cormorant Garamond (serif), Amiri (Arabic)
- Color system based on HSL values with semantic naming (primary, secondary, accent, etc.)

**Animation**: Framer Motion for smooth transitions and interactive visualizations (zodiac wheel, elemental balance displays).

**Key Custom Components**:
- **ZodiacWheel**: SVG-based interactive zodiac visualization showing planetary positions
- **PlanetaryTable**: Displays planetary dignities with tropical/sidereal toggle
- **MansionCard**: Shows Ibn Arabi's Lunar Mansion information
- **PlanetaryHoursDisplay**: Real-time planetary hour tracking with progress indicators
- **ElementalBalance**: Calculates and displays elemental distribution of planets

### Backend Architecture

**Runtime**: Node.js with Express framework, written in TypeScript.

**Server Configuration**:
- Development mode uses Vite middleware for HMR (Hot Module Replacement)
- Production mode serves pre-built static assets from `/dist/public`
- Custom logging middleware tracks request duration and response status
- Raw body capture for webhook integrations (configured but not currently used)

**Storage Layer**: Currently uses in-memory storage (`MemStorage` class) implementing the `IStorage` interface. Designed to be replaceable with database-backed storage (PostgreSQL via Drizzle ORM is configured but not actively used).

**Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling. Server dependencies are selectively bundled (allowlist approach) to optimize cold start times.

### Astronomical Calculations

**Core Library**: astronomy-engine (v2.1.19) for precise planetary ephemeris calculations.

**Key Calculations**:
- Planetary positions (longitude, latitude, distance) for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn
- Sidereal longitude conversion using Lahiri Ayanamsha (23.85° at J2000, 0.01397°/year precession rate)
- Planetary hours based on sunrise/sunset times (day/night division into 12 equal hours)
- Lunar mansion determination (28 stations of 12.857° each)
- Moon phase calculation (illumination percentage, waxing/waning status)
- Hijri calendar conversion
- Planetary dignity assessment (Exaltation, Fall, Rulership, Detriment, Neutral)
- Elemental distribution (Fire, Earth, Air, Water based on zodiac signs)

**Coordinate Systems**: Supports both tropical and sidereal zodiac calculations with user toggle. All calculations performed client-side in `/client/src/lib/astronomy.ts`.

### Data Models

**Database Schema** (Drizzle ORM with PostgreSQL dialect):
- Users table with UUID primary keys, username, and password fields
- Schema defined in `/shared/schema.ts` with Zod validation schemas
- Currently not actively used; app operates with in-memory storage

**Type Definitions**:
- PlanetaryHour: hour number, ruling planet, type (day/night), time range, current status
- PlanetStatus: planet name, zodiac sign, degree, dignity status, retrograde status, speed
- MoonPhaseInfo: phase value, waxing status, illumination, void of course status

### External Dependencies

**Astronomical Data**:
- astronomy-engine: Client-side astronomical calculations (no external API calls)
- All ephemeris data computed locally using the library

**Fonts & Typography**:
- Google Fonts API: Inter font family
- Fontshare API: Clash Display, Satoshi font families
- Amiri font for Arabic typography

**Development Tools**:
- Replit-specific plugins for development environment (@replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner, @replit/vite-plugin-runtime-error-modal)
- Custom meta-images plugin for OpenGraph image URL generation based on Replit deployment domain

**UI Framework Dependencies**:
- Radix UI primitives for accessible components (27+ component primitives)
- Lucide React for iconography
- cmdk for command palette functionality
- embla-carousel-react for carousel components
- date-fns for date formatting and manipulation
- next-themes for theme management (despite not being a Next.js app)

**Database & Sessions** (configured but not actively used):
- PostgreSQL (DATABASE_URL environment variable expected)
- Drizzle ORM for type-safe database operations
- connect-pg-simple for PostgreSQL session storage (imported but not used)

**Notable Absence**: No authentication system currently implemented despite user schema being defined. No external APIs for astronomical data; all calculations are local.