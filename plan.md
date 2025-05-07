# Project Plan: FortiManager Live Monitor

## Folder Structure

```
/fortimanager-live-monitor
├── public/                # Static assets
├── src/
│   ├── api/               # API logic for FortiManager
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature modules (ADOMs, Devices, Monitoring)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components (if using Next.js)
│   ├── styles/            # Global and component styles
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main app entry
├── .env                   # Environment variables (not committed)
├── .env.example           # Example env file
├── package.json           # Project metadata and scripts
├── README.md              # Project overview
└── plan.md                # This plan file
```

## Main Components
- **Login/Config Page:** For entering and saving FortiManager API credentials and polling interval
- **Dashboard:**
  - ADOM overview
  - Device lists (FortiGate, FortiSwitch, FortiAP)
  - Device detail panels (monitoring, info, visualizations)
  - Filters and search
  - Critical alerts and predictions
- **Settings:** User preferences, thresholds, visualization options

## Development Steps
1. **Initialize project** (Vite/Next.js, TypeScript, Tailwind/Material UI)
2. **Set up folder structure**
3. **Create .env and .env.example**
4. **Implement API logic** for FortiManager endpoints
5. **Build UI components** (dashboard, device cards, charts, alerts)
6. **Add state management** (React Context/Zustand/Redux)
7. **Implement live polling and filtering**
8. **Add critical alert logic and visualizations**
9. **Testing and QA**
10. **Polish UI/UX**
11. **Documentation and deployment** 