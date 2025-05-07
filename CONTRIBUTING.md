# Contributing to FortiManager Live Monitor

Thank you for your interest in contributing! Please follow these guidelines to help us maintain a high-quality project.

## Getting Started

1. **Fork the repository** and clone it locally.
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create a new branch** for your feature or bugfix:
   ```sh
   git checkout -b feat/your-feature-name
   ```

## Commit Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation only changes
  - `style`: Formatting, missing semi-colons, etc.
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `test`: Adding or correcting tests
  - `chore`: Maintenance
- Example:
  ```
  feat(dashboard): add device health trend modal
  ```

## Code Review Checklist
- Follow the [10-step code review checklist by Swimm](https://swimm.io/learn/code-reviews/ultimate-10-step-code-review-checklist)
- Ensure your code is readable, well-documented, and tested
- Write clear and descriptive PR titles and descriptions

## Testing
- Run all tests before submitting a PR:
  ```sh
  npm test
  ```
- Lint and format your code:
  ```sh
  npm run lint
  npm run format
  ```
- Add or update tests for new features and bug fixes

## Pull Requests
- Reference related issues in your PR description (e.g., `close #123`)
- Ensure your branch is up to date with `main`
- Address all review comments

## Code of Conduct
- Be respectful and inclusive
- See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) if present

---
Thank you for helping make this project better! 