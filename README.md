# FortiManager Live Monitor

A modern web application for live monitoring and visualization of FortiManager configurations and devices.

## Features

- Beautiful, responsive UI/UX for real-time monitoring
- Live updates at user-configurable intervals
- Secure credential management via `.env` file
- Filterable and customizable data views
- **CSV export for device table data**
- **Advanced filtering and column sorting**
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
   - **Export device table to CSV**
   - **Advanced filtering and sorting in device table**
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
- **CSV Export:** file-saver

## Code Quality & Contribution Workflow

- **Linting:** Run `npm run lint` to check for code issues using ESLint.
- **Formatting:** Run `npm run format` to auto-format code with Prettier.
- **Pre-commit Hooks:** Husky and lint-staged ensure code is linted and formatted before every commit.
- **How it works:**
  - On `git commit`, Husky triggers lint-staged, which runs Prettier and ESLint on staged files.
  - If any issues are found, the commit will be blocked until they are fixed.

## Accessibility & UX

- **Keyboard Navigation:** All main navigation and controls are accessible via keyboard (Tab, Arrow keys, Enter, Esc).
- **ARIA Roles & Labels:** Key UI elements use ARIA roles and labels for screen reader support.
- **Focus Indicators:** All interactive elements have visible focus indicators for accessibility.
- **Color Contrast:** Designed for high contrast in both dark and light modes.
- **Dark/Light Mode:**
  - Dark mode is enabled by default.
  - Toggle between dark and light mode using the button in the header. Preference is saved in your browser.

## End-to-End (E2E) Testing

- **Cypress** is set up for E2E tests.
- To open the Cypress test runner:
  ```sh
  npm run cypress:open
  ```
- To run Cypress tests headlessly:
  ```sh
  npm run cypress:run
  ```
- Example E2E test is in `cypress/e2e/first.cy.js`.

## Contribution & Code Quality

- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing, commit conventions, and code review.
- Pre-commit hooks (Husky, lint-staged) ensure code is linted and formatted before every commit.
- Accessibility, testing, and code quality are core project priorities.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Windows, macOS, Linux

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd fortimanager-live-monitor
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `example.env` to `.env` and fill in your FortiManager API details:
     ```sh
     cp example.env .env
     # Edit .env with your API URL and token
     ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Production Build & Deployment

1. **Build the app:**

   ```sh
   npm run build
   ```

   This creates a production-ready build in the `dist/` directory.

2. **Preview the production build locally:**

   ```sh
   npm run preview
   ```

3. **Deploy:**
   - Upload the contents of the `dist/` directory to your preferred static hosting provider (e.g., Vercel, Netlify, GitHub Pages, AWS S3, Nginx, Apache).
   - Ensure your `.env` is configured correctly before building for production.

## Environment Variables

- See `example.env` for required variables. Copy it to `.env` and fill in your values.
- **Never commit your `.env` file to version control.**

## Development Notes: TypeScript & Table Compatibility

- **react-table & React 19:**
  - As of May 2025, `react-table` v7 does not provide up-to-date TypeScript types compatible with React 19.
  - To enable advanced table features (filtering, search, sorting) with live updates, the following workarounds are used:
    - Explicit `any` types for table rows/cells in `DeviceTable.tsx`.
    - A local module declaration (`src/types/react-table.d.ts`) to suppress missing type errors.
    - The `@typescript-eslint/no-explicit-any` linter rule is disabled for this file only, as recommended by [ESLint documentation](https://eslint.org/docs/latest/use/configure/rules) and [community best practices](https://medium.com/@karimdhrif4444/mastering-eslint-how-to-disable-rules-for-specific-files-06b976af6ee1).
  - These workarounds are isolated and documented in the code. Remove them once official type support is available.

## Deployment

This app is a static site and can be deployed to any static hosting provider. Here are common options:

### Vercel

- Import your repo at https://vercel.com/new
- Set environment variables in the Vercel dashboard
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- Import your repo at https://app.netlify.com/start
- Set environment variables in the Netlify dashboard
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

- Build locally: `npm run build`
- Push the contents of the `dist/` folder to the `gh-pages` branch (or use the GitHub Actions workflow below)
- In your repo settings, set Pages source to `gh-pages` branch
- **Automatic deployment:** This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will build and deploy the site to GitHub Pages on every push to `main`.

### Environment Variables

- Set your API URL and token as described in the Installation section
- Never commit your `.env` file to version control

## Branch Protection & PR Review

- It is recommended to enable branch protection rules for `main`:
  - Require pull request reviews before merging
  - Require status checks to pass before merging (tests, lint, build)
  - Require branches to be up to date before merging
  - Optionally, enable code owners for critical files
- See `.github/CODEOWNERS` and `.github/PULL_REQUEST_TEMPLATE.md` for examples (add these files as needed)

## Security: XSS & CSRF Protection

- **XSS Protection:**
  - React escapes all values interpolated in JSX by default, protecting against XSS attacks.
  - Avoid using `dangerouslySetInnerHTML` unless absolutely necessary and always sanitize input if you do.
  - Never trust or render raw user-generated HTML.
- **CSRF Protection:**
  - This app does not use cookies for authentication, so CSRF risk is minimized.
  - If you add cookie-based auth or forms, use CSRF tokens and same-site cookie settings.
- **Deployment Security Tips:**
  - Always use HTTPS in production.
  - Set appropriate CORS headers on your API.
  - Store secrets and tokens securely (never commit them to version control).

## Performance Optimization

- **Bundle Analysis:**
  - After building (`npm run build`), open `stats.html` in your browser to analyze bundle size and composition.
- **Code Splitting & Lazy Loading:**
  - Main routes and heavy components should use React.lazy and Suspense for code splitting (see Vite and React docs).
- **Lighthouse Audits:**
  - Use Chrome DevTools Lighthouse to audit performance, accessibility, and best practices.
  - Checklist:
    - [ ] All images optimized
    - [ ] No large JavaScript bundles
    - [ ] Fast initial load (TTFB)
    - [ ] Good accessibility score
    - [ ] No blocking resources

## User Feedback & Analytics

- **Feedback:**
  - Use the 💬 Feedback button (bottom right) to send feedback or report issues via GitHub.
- **Analytics:**
  - For privacy-respecting analytics, consider [Plausible](https://plausible.io/) or [Fathom](https://usefathom.com/).
  - No analytics are enabled by default; add your preferred provider as needed.

---
