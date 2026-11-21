# 🏔️ Visit Nepal – Official Tourism & Expedition Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, full-stack digital tourism and expedition ecosystem for Nepal. **Visit Nepal Web** brings together alpine trekking, mountaineering logistics, wildlife safaris, heritage exploration, certified guide dispatches, official permit verification, and live Himalayan telemetry into a unified web experience.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
  - [3. Database Setup](#3-database-setup)
- [Available Scripts](#-available-scripts)
- [API & Modules](#-api--modules)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Key Features

### 1. Interactive Landing & Exploration
- **Hero & Curated Showcase**: High-impact visual storytelling covering Nepal's top regions: Khumbu (Everest), Annapurna (Pokhara), Kathmandu Valley, Chitwan National Park, and Upper Mustang.
- **Interactive Region Map**: SVG-driven map experience (`nepal_zones_full.svg`) visualizing ecological belts (Terai, Hills, Himalayas) and provincial destinations.
- **Cultural & Heritage Insights**: Highlighting festivals, architecture, culinary traditions, and sacred pilgrimage circuits.

### 2. Expedition & Modalities Directory
- **Multi-Category Catalog**: Trekking, technical mountaineering, subtropical wildlife safaris, cultural journeys, and aerial sports (paragliding, bungee, white-water rafting).
- **Altitude & Logistics Specifications**: Explicit duration, difficulty grading, season window, guide requirements, and permit prerequisites.
- **Direct Modal Booking**: Interactive modal checkout generating invoice numbers synced directly to the traveler's ledger.

### 3. Traveler Expedition Dashboard
- **Trip Customizer**: Interactive itinerary planning tailored by budget, season, duration, and difficulty preference.
- **Upcoming Journeys & Drafts**: Status tracking for confirmed expeditions, payment status, and saved route drafts.
- **Booking Ledger**: Transparent receipt history for stays, permits, and activities.
- **Wishlist & Activity History**: Instant bookmarking and chronological expedition history.

### 4. Himalayan Weather & Telemetry Drawer
- **Real-Time Altitude & UV Readings**: Dynamic weather for Khumbu Peak Station (5,364m), Pokhara Lakeside (822m), Chitwan Jungles (150m), and Kathmandu Gateway (1,400m).
- **Advisory & Warning System**: Automatic altitude advisories and weather window notifications.
- **Fast Keyboard Shortcut**: Press `Ctrl + I` (or `Cmd + I`) to toggle the telemetry side drawer from anywhere in the dashboard.

### 5. Expedition Dispatches & Real-Time Messaging
- **Sherpa AI Assistant**: On-demand intelligence for mountain coordinates, trail safety, and gear recommendations.
- **Certified Provider Channels**: Direct messaging with lead guides (e.g., Nima Sherpa) and hotel concierges.
- **Voice Messages & Translations**: Built-in voice message playback, audio waveform indicators, and Nepali-to-English translation triggers.

### 6. Guides, Permits & Host Portal
- **Permit Authorities**: Online permit verification against Nepal Tourism Board (TIMS, Sagarmatha National Park, ACAP, Special Restricted Area Permits).
- **Host & List Modality**: Dedicated onboarding for local home stays, boutique mountain lodges, certified guides, and regional attractions.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client ["Client Layer (Next.js 16 + React 19)"]
        UI["Tailwind CSS v4 & Framer Motion"]
        Store["Zustand Travel Store (Auth, Trips, Chat)"]
        Dash["Traveler Dashboard & Expedition Hub"]
        Landing["Interactive Landing & Explore Canvas"]
    end

    subgraph Server ["Backend API (NestJS + TypeScript)"]
        Gateway["REST API & WebSockets (Port 8080 / 3001)"]
        AuthModule["JWT & Passport Authentication"]
        BookingModule["Trips, Stays & Permit Engine"]
        ChatModule["Expedition Dispatch & Real-Time Chat"]
        TelemetryModule["Weather & Region Telemetry"]
    end

    subgraph Data ["Persistence Layer"]
        Postgres[("PostgreSQL Database (schema.sql)")]
    end

    Client -->|REST / WebSocket| Server
    Server -->|pg pool / TypeORM| Postgres
```

---

## 📂 Project Structure

```text
visitnepal-web/
├── backend/                        # NestJS / TypeScript REST & WebSocket backend
│   ├── src/
│   │   ├── activities/             # Expedition modality services & controllers
│   │   ├── admin/                  # Administrative operations & controls
│   │   ├── auth/                   # JWT, Passport, login & registration DTOs
│   │   ├── bookings/               # Booking ledger & reservation management
│   │   ├── chat/                   # Real-time messages & provider dispatches
│   │   ├── destinations/           # Region & attraction endpoints
│   │   ├── hotels/                 # Accommodations & lodges
│   │   ├── permits/                # TIMS & conservation permit verification
│   │   ├── realtime/               # WebSocket dispatch gateways
│   │   ├── trips/                  # Itinerary and customizer handling
│   │   ├── app.module.ts           # Root NestJS module
│   │   └── main.ts                 # Backend server entrypoint
│   ├── schema.sql                  # PostgreSQL database relational schema
│   └── package.json
│
├── visitnepal-web/                 # Next.js 16 (Turbopack) frontend
│   ├── app/
│   │   ├── dashboard/              # Comprehensive expedition dashboard
│   │   ├── info/[slug]/            # Deep-dive regional guides (Everest, Pokhara, etc.)
│   │   ├── login/ & signup/        # Traveler authentication pages
│   │   ├── page.tsx                # Public homepage & interactive showcase
│   │   ├── layout.tsx              # Root HTML shell & font providers
│   │   └── globals.css             # Tailwind v4 theme definitions
│   ├── components/
│   │   ├── features/
│   │   │   ├── dashboard/          # DashboardHome, Activities, Stays, Sidebars
│   │   │   ├── info/               # Region panels & telemetry charts
│   │   │   └── chat/               # Expedition messenger dialogs & voice pills
│   │   ├── sections/               # HeroSection, CultureSection, etc.
│   │   └── ui/                     # Reusable design primitives
│   ├── store/
│   │   └── useTravelStore.ts       # Global Zustand state management
│   └── package.json
│
├── nepal_zones_full.svg            # Full geographic vector map asset
├── schema.sql                      # Root database schema copy
└── README.md                       # Main documentation
```

---

## 💻 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

### Backend
- **Framework**: [NestJS 11](https://nestjs.com/) / Express 4
- **Security**: Helmet, Throttler (Rate Limiting), CORS, Class Validator, Bcrypt
- **Authentication**: JWT (`@nestjs/jwt`, `passport-jwt`)
- **Real-Time**: WebSockets (`ws`)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (`pg`)
- **Documentation**: Swagger / OpenAPI (`@nestjs/swagger`)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher recommended
- **npm** or **pnpm**
- **PostgreSQL**: `v15+` running locally or accessible via URL

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file in `backend/`:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://postgres:password@localhost:5432/visitnepal
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRATION=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. Run the database migration/schema script:
   ```bash
   psql -U postgres -d visitnepal -f schema.sql
   ```

5. Start the backend in development mode:
   ```bash
   npm run dev
   ```
   *The API will be available at `http://localhost:3001` (Swagger docs at `http://localhost:3001/api/docs`).*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd visitnepal-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for local mock mode):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

### Frontend (`visitnepal-web/`)
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Builds the production application bundle |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint analysis |
| `npx tsc --noEmit` | Runs full TypeScript type verification |

### Backend (`backend/`)
| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the server in watch mode using `tsx` |
| `npm run build` | Compiles TypeScript source to `dist/` |
| `npm run start` | Launches compiled production server |

---

## 🔌 API & Modules

| Endpoint Group | Description |
| :--- | :--- |
| `/api/auth` | User registration, login, token refresh, and password management |
| `/api/destinations` | Region metadata, coordinates, seasons, and highlights |
| `/api/activities` | Expedition modalities, difficulty tiers, and permit criteria |
| `/api/bookings` | Create and retrieve reservation receipts for stays & expeditions |
| `/api/hotels` | Lodge listings, tea house inventories, and availability |
| `/api/permits` | TIMS and national park permits verification & issuance |
| `/api/chat` | Channel listings, message history, and expedition dispatches |
| `/api/realtime` | WebSocket connection point for live telemetry & incoming messages |

---

## 🤝 Contributing

Contributions are welcome! If you want to contribute:

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'feat: Add amazing new expedition modality'
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Namaste & Happy Travels in Nepal! 🇳🇵
