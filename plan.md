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

- [x] **Initialize project** (Vite/Next.js, TypeScript, Tailwind/Material UI)
- [x] **Set up folder structure**
- [x] **Create .env and .env.example**
- [x] **Implement API logic** for FortiManager endpoints
- [x] **Build UI components** (dashboard, device cards, charts, alerts)
- [x] **Add state management** (React Context/Zustand/Redux)
- [x] **Implement live polling and filtering**
- [x] **Add critical alert logic and visualizations**
- [x] **Testing and QA**
- [ ] **Polish UI/UX**
- [ ] **Documentation and deployment**

---

## Expanded Plan (Best Practices)

### Testing
- [x] Unit tests for API logic and utilities (Jest)
- [x] Component tests for React components (React Testing Library)
- [ ] Integration/E2E tests for user flows (Cypress)
- [x] CI: Run tests and linting on every PR

### Continuous Integration/Continuous Deployment (CI/CD)
- [x] Automated linting, testing, and deployment (GitHub Actions or similar)
- [ ] Branch protection and PR review requirements

### Accessibility (a11y)
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Color contrast checks

### Internationalization (i18n)
- [ ] Plan for multi-language support (if relevant)

### Error Handling & Logging
- [x] User-facing error messages for API and UI errors
- [ ] Logging for debugging and audit

### Security
- [x] Token storage review
- [ ] XSS/CSRF protection
- [x] Secure API usage

### Performance Optimization
- [ ] Bundle analysis
- [ ] Code splitting and lazy loading
- [ ] Lighthouse audits

### User Feedback & Analytics
- [ ] Collect user feedback (in-app or via external tools)
- [ ] Optionally add privacy-respecting analytics

### Feature Roadmap
- [ ] Role-based access
- [ ] Advanced reporting
- [ ] Mobile support

### Contribution Guidelines
- [ ] Add CONTRIBUTING.md
- [x] Use Conventional Commits
- [x] Code review checklist ([Swimm](https://swimm.io/learn/code-reviews/ultimate-10-step-code-review-checklist))

### API Mocking/Offline Development
- [x] Use MSW or similar for API mocking

### Monitoring & Maintenance
- [ ] Ongoing maintenance, dependency updates, and monitoring for issues
- [ ] Regular documentation review and update ([KnowledgeOwl](https://www.knowledgeowl.com/blog/posts/keeping-documentation-up-to-date/), [MadCap](https://www.madcapsoftware.com/blog/how-to-ensure-your-documentation-is-always-up-to-date/))
