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

## Code Quality & Contribution Workflow

- **Linting:** Run `npm run lint` to check for code issues using ESLint.
- **Formatting:** Run `npm run format` to auto-format code with Prettier.
- **Pre-commit Hooks:** Husky and lint-staged ensure code is linted and formatted before every commit.
- **How it works:**
  - On `git commit`, Husky triggers lint-staged, which runs Prettier and ESLint on staged files.
  - If any issues are found, the commit will be blocked until they are fixed.

## Development Setup

1. Clone the repository:
   ```

   ```
