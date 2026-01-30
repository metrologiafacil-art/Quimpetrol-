## 2025-05-18 - Lazy Loading & App Entry Point Fix
**Learning:**
1. The application `index.html` was missing the module script tag for `index.tsx`, preventing the app from loading entirely. This is a critical configuration issue for Vite apps.
2. `App.tsx` was eagerly importing large components (`Capacitaciones`, `SgcDinamico`) that depend on heavy services (`geminiService`), bloating the initial bundle.
**Action:**
1. Always verify the entry point configuration in `index.html` when an app fails to load.
2. Use `React.lazy` and `Suspense` for route-level components to split bundles and improve initial load time, especially when heavy dependencies are involved.
