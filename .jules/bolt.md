## 2025-02-18 - No Lockfile Policy
**Learning:** The repository does not contain a lockfile (package-lock.json, pnpm-lock.yaml, etc.). Creating one during `npm install` and committing it causes unnecessary noise in PRs.
**Action:** When installing dependencies for verification, ensure generated lockfiles are not committed unless explicitly instructed.
