
## 2025-05-18 - Missing Entry Script in Vite
**Learning:** The `index.html` file was missing the `<script type="module" src="/index.tsx"></script>` tag, preventing the React application from mounting and resulting in a blank page with only background styles.
**Action:** Always check `index.html` for the entry point script when diagnosing "blank screen" issues in Vite projects, even if the build process seems standard.
