## 2025-05-23 - Critical Config & Code Splitting
**Learning:** The application `index.html` was missing the module entry point `<script type="module" src="/index.tsx"></script>`, causing a blank screen. This is a critical configuration often overlooked when migrating or setting up Vite projects manually.
**Action:** Always verify `index.html` entry point if the app renders blank in dev mode.

**Learning:** Large feature components (`SgcDinamico`, `Capacitaciones`) imported heavy services (`geminiService`) and were bundled in the main chunk, delaying the Login screen.
**Action:** Use `React.lazy` and `Suspense` to split these components. This automatically splits their dependencies (like the heavy service) into separate chunks, keeping the main bundle lightweight for the initial interaction (Login).
