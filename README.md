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

## Tech Stack
- **Frontend Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **State Management:** React Query for server state
- **Data Visualization:** Chart.js with react-chartjs-2
- **UI Components:** Headless UI and Heroicons
- **HTTP Client:** Axios
- **Date Handling:** date-fns

## Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jmpijll/FortiManager-Live-Monitor.git
   cd FortiManager-Live-Monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your FortiManager API credentials (see `.env.example`)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_FORTIMANAGER_HOST=https://your-fortimanager.example.com
VITE_FORTIMANAGER_USERNAME=your-username
VITE_FORTIMANAGER_PASSWORD=your-password
VITE_POLL_INTERVAL_SECONDS=30
```

## Contributing
Pull requests and suggestions welcome!
