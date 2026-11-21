# 🏔️ Visit Nepal – Frontend Web Application

The interactive, high-performance web frontend for the **Visit Nepal** digital tourism and expedition ecosystem, built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
If running against the local backend server, create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore.

---

## 🧩 Key Architecture & Features

- **App Router (`app/`)**: Next.js 16 modular routing with dynamic routing (`/info/[slug]`, `/dashboard`, `/login`, etc.).
- **Interactive Expedition Dashboard (`components/features/dashboard/`)**:
  - `DashboardHome.tsx`: Upcoming journeys, customizer drafts, and recent booking ledger.
  - `ActivitiesSection.tsx`: Expedition modalities directory (trekking, mountaineering, safari, culture, action).
  - `DiscoverSection.tsx`: Exploration maps, attractions, and Top 5 destinations.
  - `StaysSection.tsx`: Boutique mountain lodges, hotels, and transport reservations.
  - `GuidesPermitsSection.tsx`: Verified guide rosters and official TIMS/conservation permits.
  - `LeftSidebar.tsx` & `RightSidebar.tsx`: Collapsible navigation and live Himalayan telemetry / dispatch drawer.
- **Expedition Telemetry**: Live weather, altitude warnings, and UV metrics for Khumbu, Pokhara, Kathmandu, and Chitwan.
- **Global State (`store/useTravelStore.ts`)**: Fast, unified client state management with Zustand.

---

## 🛠️ Scripts

- `npm run dev`: Runs development server with Turbopack on `http://localhost:3000`.
- `npm run build`: Compiles production build.
- `npm run start`: Starts the built production server.
- `npm run lint`: Runs ESLint checks.
- `npx tsc --noEmit`: Runs full TypeScript type check.

---

*For full repository details, backend documentation, and database schema, see the [Root README](../README.md).*
