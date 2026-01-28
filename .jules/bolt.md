## 2025-02-14 - Verify Code Splitting Assumptions
**Learning:** Memory indicated code splitting was implemented, but `App.tsx` used static imports. Always verify architectural claims against actual code.
**Action:** Check imports in `App.tsx` or router configuration before assuming code splitting is active.

## 2025-02-14 - Vite Entry Point Requirement
**Learning:** `index.html` was missing `<script type="module" src="/index.tsx"></script>`, preventing the app from mounting.
**Action:** When troubleshooting blank pages in Vite, check `index.html` for the entry point script tag.
