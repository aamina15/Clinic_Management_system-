# ClinicFlow AI — Frontend

Premium healthcare SaaS UI built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Landing page |
| `/login` | Sign in (demo portal links) |
| `/register` | Create account |
| `/admin` | Admin dashboard |
| `/doctor` | Doctor dashboard |
| `/reception` | Reception dashboard |
| `/patient` | Patient portal |

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin portal routes
│   ├── doctor/             # Doctor portal routes
│   ├── reception/          # Reception portal routes
│   ├── patient/            # Patient portal routes
│   ├── login/
│   └── register/
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Sidebar, Navbar, Shell
│   ├── dashboard/          # Stats, overview widgets
│   ├── charts/             # Recharts visualizations
│   ├── modules/            # Feature module views
│   └── shared/             # Status badges, etc.
├── config/                 # Navigation per role
├── data/mock/              # Realistic mock data
└── types/                  # TypeScript definitions
```

## Modules

Each role has access to relevant modules:

- **Dashboard** — KPI cards, charts, activity feed
- **Appointments** — Schedule management with tabs & dialogs
- **Queue** — Kanban-style patient flow
- **Patients** — Searchable patient directory
- **EMR** — Electronic medical records with vitals
- **Billing** — Invoices and payment tracking
- **Reports** — Analytics (admin only)
- **Pharmacy** — Inventory management
- **Settings** — Profile, notifications, theme

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix primitives)
- Recharts
- Framer Motion
- next-themes (dark mode)

## Notes

This is a **frontend-only** implementation with mock data. No authentication or API integration.
