# FortiManager Live Monitor

A modern web application for live monitoring and visualization of FortiManager configurations and devices.

## Features
- Beautiful, responsive UI/UX for real-time monitoring
- Live updates at user-configurable intervals
- Secure credential management via `.env` file
- Filterable and customizable data views
- Visualizations with critical alerts and predictions
- Device and ADOM information, including firmware, HA status, and more
- Extensible for additional FortiManager monitoring needs

## Data Provided
1. **All ADOMs**
2. **Per ADOM:**
   - FortiGates
   - FortiSwitches
   - FortiAPs
3. **Per Device:**
   - Infrastructure monitoring (CPU, memory, updates, etc.)
   - User-selectable visualizations and predictions
   - Critical alerts for abnormal values (user-defined thresholds)
   - Device info: firmware version, serial number, HA status, etc.
4. **FortiManager Monitoring:**
   - Useful system and health metrics

## Setup
1. Clone the repository
2. Create a `.env` file with your FortiManager API credentials (see `.env.example`)
3. Install dependencies: `npm install`
4. Start the app: `npm run dev`

## Tech Stack
- React (with Vite or Next.js)
- TypeScript
- Tailwind CSS or Material UI
- Chart.js or similar for visualizations
- Axios for API calls

## Contributing
Pull requests and suggestions welcome! 