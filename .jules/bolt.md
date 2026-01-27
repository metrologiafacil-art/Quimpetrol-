## 2025-01-27 - Performance Optimization: Lazy Loading
**Learning:** Initial build produced an empty HTML because `index.html` was missing the entry script tag. Always check `index.html` for `src="/index.tsx"`.
**Action:** Verify `index.html` structure early in the process.

**Learning:** `geminiService` via `@google/genai` is a large dependency (~257kB gzipped). Lazy loading components that use it (like `SgcDinamico`) significantly reduces the initial bundle size.
**Action:** Isolate heavy AI libraries in separate chunks using `React.lazy`.
