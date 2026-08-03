# 🏡 RentNest - Premium Housing & Rental Ecosystem

RentNest is a high-performance, responsive, and community-driven real-estate rental management ecosystem built using the latest industry-standard stacks. It delivers a seamless, premium user experience heavily inspired by the minimalist and aesthetic essence of Airbnb, localized with automated currency bindings and secure runtime authorization validation layers.

🌐 **Live Application URL:** [https://assignment-5-lovat.vercel.app](https://assignment-5-lovat.vercel.app)  
📡 **Production API Server:** `https://assignment-4-vnjw.onrender.com`

---

## ✨ Dynamic Core Features

### 🏙️ Premium Real-Estate Directory
*   **Reactive Filtering & Matrix Grid:** Search assets seamlessly by titles, geographical locations, or cities utilizing advanced database-driven regex mapping.
*   **Universal Smart Search:** Fully synchronized query parameters mapping (`?category=Studio&search=luxury`) keeping UI context locked intact even during high-frequency real-time lookups.
*   **Dynamic Client Pagination:** High-performance architectural pagination avoiding client-side slicing overheads by reading directly from backend metadata streams.

### 📊 Comprehensive User Dashboards & Lifecycles
*   **Role-Based Security Router Mapping:** Automated login checks securely forwarding accounts to protected `/dashboard/admin`, `/dashboard/landlord`, or `/dashboard/tenant` layouts based on encrypted internal JWT payloads.
*   **Interactive Booking Workflows:** Full contextual evaluation mapping framework for tenancy states:
    *   `PENDING`: Light Amber badge with safe action locks.
    *   `APPROVED`: Light Sky Blue badge exposing a signature **`[Pay Now]`** button linked directly to payment gateways.
    *   `ACTIVE`: Live Emerald Green identifier exposing an intelligent **`[Leave Review]`** button which dynamically transitions into a sealed **`[✓ Reviewed]`** tag once feedback is indexed.
    *   `REJECTED` & `COMPLETED`: Clean neutral gray archival metrics logging.

### 🛡️ Administrative & Landlord Controls
*   **On-Demand Listing Availability Switch:** Live cloud state synchronization using a secure `PATCH` framework to immediately toggle properties between `🟢 Available` or `🔴 Rented / Off` directly from the ledger grid.
*   **Interactive Category Management:** High-fidelity admin deletion portals fitted with protective two-step confirmation notifications instead of native blocking browser alerts.

### 🎨 Micro-Animations & Digital Billing
*   **Moving Rocket Tenancy Journey:** Smooth scroll-driven contextual milestone visualizers tracking timeline progression using `Framer Motion`.
*   **One-Tap High-Fidelity PDF Receipts:** Client-side static snapshot generators leveraging `html2pdf.js` to trigger instant automated `.pdf` digital invoice downloads with embedded system authorization stamps without messy printing dialog overlays.

---

## 💻 Tech Stack Specification Framework

| Tier Layer | Integrated Technologies / Tools | Operational Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router Framework) | Server Components (SSR), Dynamic Metadata Routing |
| **Compiler Engine** | Vercel Turbopack Architecture | Lightning-fast optimized hot-module reloads (HMR) |
| **State & Cache Manager** | TanStack Query v5 (`@tanstack/react-query`) | Global client cache caching, query invalidations |
| **Motion Engineering** | Framer Motion & Lucide Icons | Fluid layout keyframe morphing, spring elastic transitions |
| **UI Design System** | Tailwind CSS & Shadcn primitives | Glassmorphism grids, Airbnb signature system palette |
| **Form Engineering** | React Hook Form & Zod Validations | Client schema shielding, predictive validation states |
| **Backend Architecture** | Node.js with Express & Prisma ORM | Relational query lookups, JWT auth validation layers |

---

## 🛠️ Environmental Settings & Local Installation

Follow these quick commands to spin up the application on your local workstation environment:

### 1. Clone the Repository
```bash
git clone <your-repository-github-link>
cd RentNest
```

### 2. Configure Environment Variables (`.env.local`)
Create a secure configuration environment file inside your root folder:
```env
NEXT_PUBLIC_BACKEND_API_URL=https://assignment-4-vnjw.onrender.com
BACKEND_API_URL=https://assignment-4-vnjw.onrender.com
```

### 3. Install Module Repositories & Run Local Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your desktop browser to view the active dev workspace.

### 4. Build Production Environment Verification
Execute a tight compilation build worker verification process to test runtime validation integrity:
```bash
npm run build
```

---

## 🔮 Continuous Deployment (CI/CD) Blueprint
The frontend directory is fully wired into **Vercel Native Webhooks**. Every incremental patch or feature branch pushed to GitHub via:
```bash
git add .
git commit -m "feat: added premium modules"
git push origin main
```
Automatically triggers a clean Vercel isolated cloud runner, invalidates prior build caches, compiles optimized chunks, and seamlessly updates the live global internet destination inside 60 seconds without manual intervention or downtime.
