# Dashboard Sync Documentation

## Overview
This document outlines the synchronization between:
- **raw-stitch-export/main-dashboard/** - Static unified HTML dashboard
- **react-main-dashboard/** - React + Vite application with all pages

## What Was Synchronized

### ✅ HTML Dashboard (raw-stitch-export/main-dashboard)
- **index.html** - Complete unified dashboard with all 6 sections
  - Command Center
  - Menu Management  
  - Customer Insights
  - Food Insights
  - Financials
  - Outlet Settings
- **dashboard-unified.html** - Backup copy

Features:
- Single HTML file (no fragmentation)
- Unified Tailwind CSS config
- JavaScript-based tab navigation
- All styling consolidated
- 886 lines of clean, modular code

### ✅ React Dashboard (react-main-dashboard)
- **src/App.jsx** - Main app with page routing
- **src/pages/** - All 6 page components
  - CommandCenter.jsx
  - MenuManagement.jsx
  - CustomerInsights.jsx
  - FoodInsights.jsx
  - Financials.jsx
  - OutletSettings.jsx
  - LogisticInsights.jsx
- **src/components/** - Reusable UI components
  - Layout: Sidebar, Topbar, PageLayout
  - UI: Button, Card, Tabs, Pagination, etc.
  - Charts: RevenueChart, GrowthChart
  - Tables: DataTable

### ✅ Shared Configuration
Both projects use:
- **Tailwind CSS** with matching color theme
- **Primary Color**: #FE3C06 (Ordr.AI orange)
- **Font**: Plus Jakarta Sans (headline, body, label)
- **Material Symbols** for icons
- **Google Fonts** for typography

### Color Scheme (Unified)
```
Primary: #FE3C06
On-Primary: #ffffff
Surface: #FFF8F6
Background: #FFF8F6
On-Surface: #231A17
On-Surface-Variant: #53433F
Error: #BA1A1A
Outline: #85736E
Outline-Variant: #D8C2BC
```

## File Structure

```
UI-ORDR.AI/frontend/
├── raw-stitch-export/main-dashboard/
│   ├── index.html                    (Unified HTML - PRIMARY)
│   ├── dashboard-unified.html        (Unified HTML - Backup)
│   ├── Command Center/               (Original exports)
│   ├── Menu Management/
│   ├── Customer Insights/
│   ├── Food Insights/
│   ├── Financials/
│   └── Outlet Setting/
├── react-main-dashboard/
│   ├── src/
│   │   ├── App.jsx                   (Main routing)
│   │   ├── pages/                    (All dashboard pages)
│   │   ├── components/               (Reusable components)
│   │   ├── data/                     (Mock data)
│   │   └── main.jsx                  (React entry)
│   ├── index.html                    (Vite entry)
│   ├── index.unified.html            (Reference copy)
│   ├── package.json
│   ├── vite.config.js
│   └── README-IMPLEMENTATION.md
└── shared-styles/                    (Optional: shared assets)
```

## How to Use

### Using Static HTML (Fastest)
```bash
# Open the unified dashboard directly
open frontend/raw-stitch-export/main-dashboard/index.html

# Or serve with local server
cd frontend/raw-stitch-export/main-dashboard
python3 -m http.server 8000
# Visit: http://localhost:8000/index.html
```

### Using React App (Development)
```bash
# Install dependencies
cd frontend/react-main-dashboard
npm install

# Start dev server
npm run dev
# Visit: http://localhost:5173

# Build for production
npm run build
```

## Sections Included

### 1. Command Center ✅
- Real-time operations metrics
- Active orders overview
- Revenue trends
- System health status
- Order flow management with exception handling

### 2. Menu Management ✅
- Menu item management
- Upload/import menu from PDF/CSV
- Item search and filtering
- Price and availability management
- Seasonal items configuration

### 3. Customer Insights ✅
- Customer KPIs (total unique, net new, retention %)
- Customer list with spending breakdown
- AI-powered insights
- Customer segmentation
- Trend analysis

### 4. Food Insights ✅
- Top-performing menu items
- Item order growth trends
- Menu performance breakdown
- Revenue metrics per item
- Avg. prep time tracking

### 5. Financials ✅
- Current earnings and revenue
- Transaction overview
- Settlement tracking
- Financial trends and insights
- Download reports

### 6. Outlet Settings ✅
- Restaurant profile management
- WhatsApp API integration status
- System health monitoring
- Business compliance (FSSAI, GSTIN)
- Operating hours and delivery setup

## Navigation

### Static HTML Version
- Sidebar with 7 navigation buttons
- Click to switch between sections
- Keyboard shortcuts: Ctrl+1 through Ctrl+7
- Smooth fade-in transitions

### React Version
- Button-click navigation
- Automatic route management
- Search functionality across pages
- Live state management

## Synchronized Features

✅ **Styling**
- Unified Tailwind color palette
- Consistent component styling
- Responsive breakpoints
- Shadow and spacing systems

✅ **Layout**
- Fixed left sidebar (256px)
- Sticky top header
- Main content area with scrolling
- Consistent padding and margins

✅ **Components**
- Navigation buttons
- KPI cards
- Data tables
- Charts and graphs
- Status badges
- Toggle switches

✅ **Data**
- Mock data in React version
- Sample KPIs and metrics
- Customer data
- Order information
- Financial metrics

## Deployment

### Static Version
```bash
# Copy to web server
cp -r frontend/raw-stitch-export/main-dashboard/index.html /path/to/webroot/
```

### React Version
```bash
# Build and deploy
cd frontend/react-main-dashboard
npm run build
# Upload 'dist' folder to web server
```

## Git Commits

Both versions have been committed:

**raw-stitch-export:**
- Commit: `feat: Consolidate RawStitch export into unified dashboard HTML`
- Contains: Full unified HTML with all sections

**react-main-dashboard:**
- Contains: React components matching unified layout
- Includes: index.unified.html reference copy

## Development Notes

### For the React App
- Uses Vite for fast dev server and building
- React 18.2.0 with hooks
- Recharts for chart visualization
- Tailwind CSS for styling
- Component-based architecture

### For the HTML Dashboard
- Zero dependencies (except CDN Tailwind)
- Pure JavaScript for navigation
- Fast loading - single HTTP request
- Perfect for static hosting

## Next Steps

1. ✅ Unified HTML created and tested
2. ✅ React components aligned with HTML layout
3. ✅ Configuration synchronized
4. 🔄 Optional: Move to GitHub Scattered-Dots repo when ready
5. 🔄 Optional: Set up auto-sync pipeline

## Support

For issues or questions:
- Check README-IMPLEMENTATION.md in react-main-dashboard
- Review DEPLOYMENT_GUIDE.md in react-main-dashboard
- Verify Tailwind config matches in both projects
- Test both versions locally before deploying

---

**Last Updated:** May 16, 2026
**Status:** ✅ Complete and Synced
