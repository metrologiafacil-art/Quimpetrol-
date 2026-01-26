## 2025-02-18 - Vite Entry Point Requirement
**Learning:** Vite builds will fail to bundle JS (outputting only HTML) if `index.html` is missing the `<script type="module" src="/index.tsx"></script>` tag.
**Action:** Always verify `index.html` contains the correct entry point script tag when working with Vite/React projects.

## 2025-02-18 - Heavy Service Code Splitting
**Learning:** Large service modules (like `geminiService` ~257kB) imported by multiple components can be effectively split from the main bundle using `React.lazy` on the consuming components.
**Action:** Identify heavy shared dependencies and lazy-load their consumers to improve initial load performance.
