## 2025-05-21 - Manual Script Injection in Vite
**Learning:** The `index.html` file was missing the `<script type="module" src="/index.tsx"></script>` entry point, preventing the app from loading in a standard Vite environment. It seems this project relies on manual injection or a specific environment that was not present.
**Action:** Always verify `index.html` entry points when the app fails to render anything (blank screen) despite successful builds.

## 2025-05-21 - Code Splitting Opportunity
**Learning:** The application imported all heavy components (`Dashboard`, `SgcDescargable`, etc.) directly in `App.tsx`, causing a large initial bundle. Implementing `React.lazy` was straightforward but required creating a `Loading` component which was missing despite documentation suggesting otherwise.
**Action:** Don't trust documentation/memory about existing utility components; verify their existence before planning.
