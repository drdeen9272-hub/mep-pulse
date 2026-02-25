

# Sproxil NMDR Interactive Demo Platform — Implementation Plan

## Phase 1: Foundation & Layout Shell
- Install Framer Motion dependency
- Set up the **branding system**: custom colors (#1B3A5C navy, #00A79D teal, #F7941D orange, #F4F7FA background), Inter + Poppins fonts, design tokens in Tailwind config
- Build the **persistent top navigation bar** with Sproxil logo text, dropdown menus (Dashboard, Surveillance, Applications, Reports, About), sticky positioning, mobile hamburger menu with full-screen overlay
- Create the **global footer** with Sproxil branding, links, demo data disclaimer, and copyright
- Set up **all route definitions** (20+ routes) with placeholder pages
- Build the **reusable PhoneMockup component** (dark bezel, camera notch, home indicator, status bar, scrollable content area, responsive scaling)
- Create a **reusable ExportButton component** (CSV/PDF/Excel dropdown)

## Phase 2: Homepage & Hero Section
- Build the **hero section** with split layout: headline, sub-headline, CTA buttons (left), animated solution walkthrough (right)
- Create the **5-frame animated walkthrough** using Framer Motion: SMS verification → OK ORIGINAL response → AI RDT reader → mini dashboard map → conditional transfer confirmation, looping with crossfade transitions
- Build **animated KPI counters** (4.5B+ products, 35M+ consumers, 134K+ surveys, 8,000+ pharmacies) that count up on scroll
- Build the **"See How It Works" tabbed section** with 4 phone mockups: Test (WhatsApp RDT flow), Treat (SMS drug verification), Track (health survey), Incentivize (mobile money transfer)
- Add the **partner logos scrolling bar** (NMEP, NAFDAC, Gates Foundation, Global Fund, WHO, etc.)
- Responsive layout: stacked on mobile, side-by-side on desktop

## Phase 3: Overview Dashboard
- Build the **/dashboard** overview command center page
- **Top KPI row**: 4 summary cards with trend indicators (cases, positivity rate, authentications, PPMV network)
- **Second row**: Monthly incidence line chart (Recharts, 24 months, multi-zone lines) + Nigeria SVG choropleth map colored by incidence with hover tooltips
- **Third row**: Age group donut chart, top 10 states bar chart, diagnostic method stacked bar chart
- **Fourth row**: Real-time activity feed with animated incoming events (authentication, RDT, survey, transfer) appearing every 8 seconds
- **Export button** in top-right corner with CSV/PDF/Excel options
- Create the **demo data generator utilities** for consistent, realistic Nigeria malaria data across all modules

## Phase 4: Epidemiology & Entomology Dashboards
- Build **/dashboard/epidemiology** with sticky filters bar (date range, state, LGA cascading dropdowns, age, sex, parasite species)
- Charts: incidence trend with YoY toggle, mortality bar chart by state, seasonality heatmap (12 months × 36 states), epidemic curve with threshold line
- Interactive Leaflet map with state→LGA drill-down zoom
- Sproxil vs National MIS comparison card
- Sortable/filterable LGA-level data table with CSV download
- Build **/dashboard/entomology** with ITN coverage choropleth, IRS coverage bars, insecticide resistance map, vector species pie chart, net distribution trend, larval source mapping

## Phase 5: Diagnostics, Commodities & Chemoprevention Dashboards
- Build **/dashboard/diagnostics**: KPI row, RDT vs microscopy trend, treatment cascade funnel chart, ACT brand bar chart, compliance gauge, AI performance confusion matrix, PPMV testing map
- Integration highlight callout card explaining Test-Treat-Track flow
- Build **/dashboard/commodities**: stock status grouped bars, authentication treemap, supply chain flow map, counterfeit detection timeline, expiry tracking table
- Build **/dashboard/chemoprevention**: IPTp coverage stacked bars, SMC coverage map for Sahel states, PMC coverage, MDA pre/post comparison — each with data table, chart, map, CSV export

## Phase 6: Financing & Data Quality Dashboards
- Build **/dashboard/financing**: funding sources donut, expenditure by intervention bars, funding gap waterfall chart, cost-per-intervention table, domestic funding trend line
- Build **/dashboard/data-quality**: completeness/timeliness/consistency KPIs, completeness by state bars, timeliness trend, outlier detection scatter plot, Sproxil vs HMIS concordance comparison

## Phase 7: Surveillance Section
- Build **/surveillance/case-based**: individual case records table (filterable, sortable), map view of case distribution, CSV export
- Build **/surveillance/aggregate**: monthly reporting dashboard by facility, completeness tracking, data quality checks, DHIS2 structure explanation
- Build **/surveillance/outbreak-detection**: time series with epidemic threshold (mean + 2SD), alert panel with active warnings, response tracking table
- Build **/surveillance/ppmv-network**: Leaflet map of 8,000+ PPMVs, performance metrics, leaderboard by state, enrollment trend

## Phase 8: Applications Section
- Build **/applications/authentication**: description, phone mockup with SMS verification flow, authentication metrics and charts, counterfeit flag counter
- Build **/applications/rdt-reader**: description, WhatsApp-style phone mockup with AI RDT flow, accuracy metrics, confusion matrix, AI vs expert comparison table
- Build **/applications/surveys**: description, survey flow phone mockup, response metrics, Digital MIS vs traditional MIS comparison
- Build **/applications/aisha-chat**: LLM health assistant phone mockup with English/Hausa conversation, language badges, query category metrics
- Build **/applications/whatsapp**: WhatsApp UI phone mockup with unified menu, reach metrics, integration diagram
- Build **/applications/transfers**: conditional transfer phone mockup, Test→Treat→Track flow diagram, disbursement metrics, cost-effectiveness comparison

## Phase 9: Reports & Data Export
- Build **/reports/export**: data export form (module, date range, geographic scope, indicator multi-select), 20-row preview, CSV download
- Build **/reports/automated**: gallery of 5 pre-built report templates with thumbnail previews and "Generate Report" buttons
- Build **/reports/custom-analysis**: simple query builder (X/Y axis, filters, chart type selector) generating on-the-fly visualizations with export

## Phase 10: About Page & Polish
- Build **/about** page: platform overview, Nigeria healthcare structure explanation (three tiers, PPMV role), team, partner information
- Add **contextual tooltips** (info icons) for Nigeria-specific terms throughout the app (LGA, PPMV, NMEP, NAFDAC) with explanations for international audiences
- Final **responsive polish**: test all breakpoints (mobile, tablet, desktop), ensure touch-friendly charts, horizontally scrollable tables with frozen first columns
- Add **page transitions** (fade-in) and **scroll-triggered chart animations** globally
- Performance optimization and final demo data consistency check

