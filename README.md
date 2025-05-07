# 🚀 FortiManager Live Monitor

Welcome to **FortiManager Live Monitor** – your modern, user-friendly dashboard for real-time monitoring and visualization of Fortinet FortiManager devices and configurations. Whether you're a Fortinet pro or just getting started, this app makes it easy to connect, explore, and stay on top of your network health!

---

## 🌟 Features at a Glance

- **No setup headaches:** Just enter your FortiManager URL, username, and password – you're in!
- **Live device monitoring:** See all your ADOMs, FortiGates, FortiSwitches, and FortiAPs in one place.
- **Beautiful, responsive UI:** Works great on desktop and mobile.
- **Critical alerts & trends:** Instantly spot issues with visual health indicators and charts.
- **Secure by design:** Credentials are never stored; sessions are managed safely.
- **Dark/light mode:** Your eyes, your choice.
- **Multi-language ready:** English and Dutch included – more coming soon!
- **Feedback built-in:** Found a bug or have an idea? Click the 💬 button!

---

## 🚦 Quick Start

1. **Clone & Install**
   ```sh
   git clone <repo-url>
   cd fortimanager-live-monitor
   npm install
   ```
2. **Run the App**
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.
3. **Login**
   - Enter your FortiManager **API URL** (e.g., `https://your-fmg.example.com`)
   - Enter your **username** and **password**
   - Click **Login** – that's it!

> **Note:** No need to edit `.env` files or restart the app for different FortiManager instances. Just log out and log in with new credentials anytime.

---

## 🔒 How Authentication Works

- **Session-based login:**
  - Your credentials are sent securely to FortiManager's `/sys/login/user` endpoint.
  - The app receives a session ID and uses it for all API requests.
  - **Your password is never stored** – not in localStorage, not in cookies, nowhere.
- **Session expiry:**
  - If your session expires, you'll be prompted to log in again.
- **Logout:**
  - Click the settings icon to log out and clear your session.

---

## 🖥️ What You'll See

- **Dashboard:**
  - Overview of all ADOMs and devices
  - Device health, firmware status, and trends
  - Critical alerts for CPU/memory issues
- **Device Details:**
  - Drill down into FortiGate, FortiSwitch, and FortiAP stats
  - Export device tables to CSV
- **Settings:**
  - Change thresholds, language, or theme (dark/light)
- **Feedback:**
  - Click the 💬 button (bottom right) to send feedback or report issues

---

## 🛡️ Security & Privacy

- **No credentials stored:** Only the session ID is kept (and cleared on logout).
- **HTTPS required:** Always use your FortiManager's HTTPS URL.
- **Open source:** Review or contribute to the code anytime!

---

## 🛠️ Tech Stack (Don't worry, it's friendly!)

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **State:** React Query, Context API
- **Testing:** Jest, Cypress (E2E)
- **i18n:** react-i18next
- **CI/CD:** GitHub Actions

> **New to these tools?** No problem! The codebase is clean, well-documented, and easy to extend.

---

## 📦 Deployment

- **Static hosting:** Deploy to Vercel, Netlify, or GitHub Pages in minutes.
- **No backend needed:** All API calls go directly from your browser to your FortiManager.
- **See the Deployment section below for details.**

---

## ❓ FAQ

**Q: What do I need to connect?**

- Your FortiManager's API URL, a valid username, and password.

**Q: Is my password safe?**

- Yes! It's only used for the login request and never stored.

**Q: Can I use this on mobile?**

- Absolutely! The UI is fully responsive.

**Q: What if my session expires?**

- You'll be prompted to log in again. No need to refresh or restart.

**Q: How do I change language or theme?**

- Use the dropdowns in the header.

**Q: How do I give feedback?**

- Click the 💬 button in the bottom right corner!

---

## 🧑‍💻 For Developers

- **Code quality:** ESLint, Prettier, Husky, lint-staged
- **Testing:**
  - `npm test` for unit tests
  - `npm run cypress:open` for E2E
- **Bundle analysis:** After `npm run build`, open `stats.html`
- **Contribution:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🚀 Deployment

- **Vercel:** Import your repo, set build command to `npm run build`, output to `dist`
- **Netlify:** Same as above
- **GitHub Pages:** Use the included GitHub Actions workflow for auto-deploy
- **Environment:** No secrets or tokens needed in `.env` – all handled at runtime

---

## 🛠️ Troubleshooting

- **Login fails?**
  - Double-check your API URL, username, and password
  - Make sure your FortiManager allows API access from your IP
  - Check browser console for error details
- **Dashboard not loading?**
  - Ensure you're logged in and session is valid
  - Try logging out and back in
- **Tailwind build error (e.g. unknown utility class):**
  - The app uses only standard Tailwind CSS classes. If you see errors like `Cannot apply unknown utility class: border-border`, make sure you are not using custom utility classes that are not defined in your Tailwind config. This has been fixed in the latest version.
- **Still stuck?**
  - Click the 💬 button or open a GitHub issue

---

## 🌍 About Fortinet & FortiManager

**Fortinet** is a global leader in cybersecurity solutions. **FortiManager** is their centralized management platform for FortiGate, FortiSwitch, and FortiAP devices. This app is an open-source, community-driven tool to make FortiManager monitoring easier and more accessible for everyone.

---

## ❤️ Contributing

We welcome all feedback, bug reports, and pull requests! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

Ready to get started? **Clone, run, and enjoy a better FortiManager experience!**

---

## FortiManager API Proxy (CORS/SSL Solution)

### Why?

Browsers enforce strict CORS and SSL rules, which can block direct API calls to FortiManager. To solve this, use the provided backend proxy server.

### How to Use

1. **Install dependencies:**
   ```bash
   npm install express node-fetch cors
   ```
2. **Run the proxy server:**

   ```bash
   node src/api/proxy-server.js
   ```

   The proxy will run on `http://localhost:4000` by default.

3. **Configure the frontend:**
   - Update your API calls to POST to `http://localhost:4000/api/fortimanager` with a JSON body:
     ```json
     {
       "apiUrl": "https://manager.flowerbed.nl",
       "apiToken": "<your-api-token>",
       "body": { ...jsonrpc request... }
     }
     ```
   - The proxy will forward the request to FortiManager and return the response.

### Security Note

- This proxy disables SSL verification for development. For production, use a valid certificate and remove the `NODE_TLS_REJECT_UNAUTHORIZED` line.

### Why is this needed?

- FortiManager does not send CORS headers, so browsers block direct requests.
- This proxy allows your app to communicate securely and reliably with FortiManager.

---
