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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_FMG_API_URL=https://your-fortimanager.example.com
VITE_FMG_API_TOKEN=your-api-token
VITE_POLL_INTERVAL_SECONDS=30
```

## Security Notice: API Token Storage

- The API token you provide is stored in your browser's localStorage for convenience and persistence between sessions.
- **Do not use personal or highly privileged tokens in shared or untrusted environments.**
- To clear your API token and config, open the API Config modal in the app and use the Reset button, or clear your browser's localStorage for this site.

## Development Notes: TypeScript & Table Compatibility

- **react-table & React 19:**
  - As of May 2025, `react-table` v7 does not provide up-to-date TypeScript types compatible with React 19.
  - To enable advanced table features (filtering, search) with live updates, the following workarounds are used:
    - Explicit `any` types for table rows/cells in `DeviceTable.tsx`.
    - A local module declaration (`src/types/react-table.d.ts`) to suppress missing type errors.
    - The `@typescript-eslint/no-explicit-any` linter rule is disabled for this file only, as recommended by [ESLint documentation](https://eslint.org/docs/latest/use/configure/rules) and [community best practices](https://medium.com/@karimdhrif4444/mastering-eslint-how-to-disable-rules-for-specific-files-06b976af6ee1).
  - These workarounds are isolated and documented in the code. Remove them once official type support is available.
