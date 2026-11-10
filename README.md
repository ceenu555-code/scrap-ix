# SCRAPIX - Doorstep Scrap Collection & Recycling Platform

> **"Your Scrap. Our Responsibility."**

**Scrapix** is a modern, production-ready web application built for an Indian doorstep scrap collection and circular economy recycling startup. It enables residential and commercial users to sell recyclable materials at transparent, benchmarked rates with certified digital weighing at their doorstep and immediate UPI payments.

---

## 1. Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS, Autoprefixer, PostCSS
- **Component Architecture**: Reusable React 18 client & server components
- **Icons**: Lucide React
- **Animations & Effects**: Tailwind transitions, Canvas Confetti
- **State & Storage**: Centralized TypeScript storage adapter syncing with `localStorage` (PostgreSQL / Supabase ready)

---

## 2. Key Pages & Routes

| Route | Description |
|---|---|
| `/` | **Home Page**: Hero section, trust indicators, Quick Booking card, price preview, How It Works, categories, environmental impact, B2B teaser, testimonials, FAQs, and final CTA. |
| `/scrap-prices` | **Scrap Prices Catalog**: Full searchable price list with category tabs (Paper, Plastic, Metal, E-Waste, Appliances) and indicative inspection notes. |
| `/sell-scrap` | **Multi-Step Booking Wizard**: 6-step interactive booking (Select items → Quantities & live payout calculator → Address → Date & slot → Review → Confirmation with Booking ID). |
| `/track-pickup` | **Pickup Tracking Engine**: Real-time 6-state vertical timeline with assigned collector details, call shortcut, and live simulation controls. |
| `/business` | **B2B Bulk Scrap Collection**: Commercial quote request form for offices, factories, schools, apartments, and hotels with GST billing. |
| `/about` | **About Us**: Mission, vision, circular economy explanation, environmental rationale, and customer commitment. |
| `/contact` | **Contact & Support**: Multi-department support channels (Customer, Enterprise, Fleet partnerships) and message form. |
| `/login` & `/signup` | **Authentication**: Mobile OTP verification with 1-click Demo Role Switcher (Customer, Collector, Admin). |
| `/dashboard` | **Customer Portal**: Pickup history, total scrap sold, lifetime earnings, eco score, saved addresses manager, and profile settings. |
| `/admin` | **Admin Command Center**: Executive KPI analytics, bookings management, scrap rates editor, customer records, fleet management, and B2B leads. |
| `/collector` | **Collector Portal**: Mobile-optimized field terminal for collectors to view assigned runs, call customers, open Google Maps directions, digitally weigh scrap, and record instant payouts. |

---

## 3. Getting Started

### Prerequisites
- Node.js 18+ or 20+ installed
- npm or yarn

### Installation
```bash
# Navigate to the project directory
cd c:\Users\MOLAKA\Downloads\scrapix

# Install dependencies (already installed)
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Compile and build production bundle
npm run build

# Start production server
npm run start
```

---

## 4. Project Structure

```
scrapix/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Header, Footer, WhatsApp widget
│   │   ├── page.tsx            # Home page
│   │   ├── scrap-prices/       # Scrap pricing catalog
│   │   ├── sell-scrap/         # Multi-step booking wizard
│   │   ├── track-pickup/       # Tracking engine
│   │   ├── business/           # B2B quotation page
│   │   ├── about/              # Company mission & vision
│   │   ├── contact/            # Support & contact forms
│   │   ├── login/              # Mobile OTP authentication & demo switcher
│   │   ├── signup/             # Customer registration
│   │   ├── dashboard/          # Customer dashboard & address book
│   │   ├── admin/              # Admin management console
│   │   ├── collector/          # Mobile-friendly collector weighing terminal
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Tailwind directives & design tokens
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, WhatsAppButton
│   │   ├── home/               # HeroSection, QuickBookingCard, PricePreview, etc.
│   │   ├── booking/            # Modular 6-step booking components
│   │   ├── admin/              # CollectorAssignModal, PriceEditModal, Admin tabs
│   │   └── ui/                 # Toast, Badge, FAQAccordion
│   ├── data/
│   │   └── mockData.ts         # Centralized seed data for rates, categories, fleet
│   ├── lib/
│   │   ├── storage.ts          # Storage service syncing state with localStorage
│   │   └── utils.ts            # Currency formatters, Indian phone validators, ID generators
│   └── types/
│       └── index.ts            # TypeScript interfaces (Database ready)
├── .env.example                # Integration templates for SMS, Razorpay, WhatsApp, Maps
├── package.json
└── tailwind.config.ts
```

---

## 5. Connecting Real Production Services

The application has been engineered with clean abstractions so mock services can be replaced with real backend APIs by configuring `.env.local`:

### 1. Real Database (PostgreSQL / Supabase / Prisma)
- Replace functions in `src/lib/storage.ts` (`getBookings()`, `saveBooking()`, etc.) with Prisma ORM client calls or Supabase REST queries.
- Set `DATABASE_URL` in `.env.local`.

### 2. SMS OTP Provider (MSG91 / Fast2SMS / Twilio)
- In `src/app/login/page.tsx`, swap the mock `generateOTP()` call with an API route (`/api/auth/send-otp`) calling your SMS gateway.
- Configure `SMS_PROVIDER_API_KEY` in `.env.local`.

### 3. WhatsApp Business API
- Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your verified business phone number. The floating WhatsApp widget automatically triggers pre-filled messages.

### 4. Google Maps Platform
- Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. The collector address links in `/collector` automatically format query strings for navigation.

### 5. Payment Gateway (Razorpay / Cashfree)
- Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. Use Razorpay Payouts (X) API to automate UPI transfers directly to customer VPA upon collector weight submission.

---

## 6. Testing & Verification Guide

1. **Test Booking Flow**:
   - Go to `/sell-scrap` or use the Home Quick Booking card.
   - Select items, enter quantities, fill address, pick slot, and confirm.
   - Receive unique Booking ID (e.g. `SM-2026-XXXX`).
2. **Test Tracking**:
   - Go to `/track-pickup` and view the live timeline.
   - Use the "Advance Status" simulator button to progress from Requested to Completed.
3. **Test Admin Console**:
   - Go to `/admin`. Check live KPIs, edit scrap prices, and assign collectors.
4. **Test Collector Terminal**:
   - Go to `/collector` to see assigned runs, dial the customer, open Google Maps directions, and submit certified digital scale weights with instant payout logging.
