# CivicVoice

**See the problem. Track the response. Make it visible.**

CivicVoice is a public civic issue reporting and transparency platform.
Citizens report real public problems (damaged roads, overflowing drains, dead
streetlights), everyone can support and discuss them, and every official
response — or the lack of one — stays publicly visible.

This implementation ships on the standard web stack available in this
environment (**Next.js + PostgreSQL via Drizzle ORM**, server-rendered HTML
with minimal client JavaScript — the same philosophy as a classic
Django + HTML + CSS monolith). It mirrors the requested Django architecture:

| Django concept            | This project                                        |
| ------------------------- | --------------------------------------------------- |
| `django.contrib.auth`     | custom session auth (`src/lib/auth.ts`, httpOnly cookie + DB sessions, scrypt password hashing) |
| Django Admin              | staff site at **`/admin`** (users, problems, categories, locations, comments, verification requests) |
| Django templates          | server-rendered React pages (one file per page — true multi-page app) |
| SQLite demo database      | seeded relational demo database (`scripts/seed.ts`) |
| Models                    | `src/db/schema.ts` (Drizzle ORM tables)             |
| URLconf                   | App Router file structure under `src/app/`          |

---

## Pages

| URL                | Page                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `/`                | Home — hero, location search, trending problems, stats, how it works |
| `/problems/`       | Explore Problems — cards + filters (location, category, status, sort)|
| `/problems/<id>/`  | Problem Details — photos, timeline, official response, comments, support, share |
| `/report/`         | Report Problem — form with photo upload & anonymous option           |
| `/locations/`      | Location Search — big search box + full hierarchy browser            |
| `/map`             | Schematic map of the demo region with roll-up counts                 |
| `/login/`          | Login                                                                |
| `/signup/`         | Signup with roles (Citizen, Politician, Government Employee, Media, Public Figure) |
| `/dashboard/`      | Role-based dashboard (different sections per role)                   |
| `/admin/`          | Site admin (staff only) — overview + all entity managers             |
| `/about`           | About the platform                                                   |

Demo geography:

```
Karnataka
├── Tumakuru (District)
│   ├── Tumakuru City (City)
│   └── Tiptur (Taluk)
│       ├── Tiptur Town (Town)
│       └── Nonavinakere Hobli (Hobli)
│           ├── Kaidala Gram Panchayat (Gram Panchayat)
│           │   └── Kaidala (Village)
│           └── Nonavinakere (Village)
└── Bengaluru (City)
    └── Ward 18 (Ward)
```

Rural areas follow **State → District → Taluk → Hobli → Gram Panchayat →
Village**; Bengaluru keeps its own **State → City → Ward** urban chain.

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the database

Create a `.env` file with your database connection string:

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

Any PostgreSQL database works. (The codebase is engine-agnostic here — the
schema translates 1:1; only `DATABASE_URL` changes.)

### 3. Create the tables (the "migrations" step)

```bash
npx drizzle-kit push
```

### 4. Load realistic demo data

```bash
npx tsx scripts/seed.ts
```

This inserts the demo categories, the full Karnataka location tree, 9 demo
accounts, 6 seeded civic problems (including the four required ones with their
exact supporter counts), timelines, official responses, comments, supports and
notifications.

### 5. Start the server

```bash
npm run dev        # development
# or
npm run build && npm start   # production
```

Open http://localhost:3000

---

## Demo accounts

| Username | Password      | Role                | Notes                        |
| -------- | ------------- | ------------------- | ---------------------------- |
| `admin`  | `admin123`    | Staff (site admin)  | Access to `/admin`           |
| `ashok`  | `password123` | Citizen             | Reporter of #1, has notifications |
| `priya`  | `password123` | Citizen             |                              |
| `kiran`  | `password123` | Citizen             |                              |
| `divya`  | `password123` | Citizen             |                              |
| `suresh` | `password123` | Government Employee | Verified, work-queue dashboard |
| `meena`  | `password123` | Politician          | Verified, constituency: Tiptur |
| `ravi`   | `password123` | Media               | Verified                     |
| `lakshmi`| `password123` | Public Figure       | **Verification Pending**     |

New signups register instantly; non-citizen roles show **Verification Pending**
until approved by a staff member under `/admin/verifications`.

---

## Seeded problems

1. **Damaged road near Kaidala Bus Stop** — Roads · Kaidala, Tiptur, Tumakuru — **1,240 supporters** — *Awaiting Official Response*
2. **Drainage overflow near Tiptur Market** — Drainage · Tiptur — **863 supporters** — *Overdue*
3. **Streetlights not working in Ward 18** — Streetlights · Bengaluru — **542 supporters** — *Work Started*
4. **Garbage accumulation near public park** — Garbage · Tumakuru — **421 supporters** — *Reported*
5. **Broken water pipeline on Nonavinakere school road** — Water Supply — **356 supporters** — *Verified*
6. **Potholes on Kaidala–Nonavinakere road** — Roads — **289 supporters** — *Completed*

Problems progress through the public lifecycle:
**Reported → Verified → Awaiting Official Response → Work Started → Completed**
(*Overdue* is a red flag on a stalled problem, not a lifecycle stage).

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Home
│   ├── problems/page.tsx        # Explore Problems (+filters)
│   ├── problems/[id]/page.tsx   # Problem Details
│   ├── report/page.tsx          # Report Problem form
│   ├── locations/page.tsx       # Location search + hierarchy
│   ├── map/page.tsx             # Schematic map
│   ├── about/page.tsx           # About
│   ├── login/ · signup/         # Auth pages
│   ├── dashboard/page.tsx       # Role-based dashboard
│   ├── admin/page.tsx           # Admin overview
│   ├── admin/[section]/page.tsx # Admin: problems/users/categories/locations/comments/verifications
│   ├── api/photos/[id]/route.ts # Serves uploaded photos stored in the DB
│   └── actions/                 # Server-side form handlers (POST views)
├── components/                  # Header, footer, cards, badges, timeline…
├── db/
│   ├── index.ts                 # Database client
│   └── schema.ts                # Tables (models)
└── lib/
    ├── auth.ts                  # Session auth (Django-auth equivalent)
    ├── password.ts              # scrypt hashing (Django-hasher equivalent)
    ├── data.ts                  # All queries (ORM helper layer)
    └── constants.ts             # Statuses, roles, location types
scripts/seed.ts                  # Demo data
```

The code is deliberately simple and modular: every query lives in
`src/lib/data.ts`, every mutation in `src/app/actions/*`, so new features (more
roles, more statuses, map upgrades) can be added without touching unrelated
code.
