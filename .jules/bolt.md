## 2025-10-26 - Vite Entry Point Requirement
**Learning:** `vite build` failed to generate assets because `index.html` lacked the `<script type="module" src="/index.tsx"></script>` tag. The dev server might handle this differently or it was simply broken.
**Action:** Always verify `index.html` contains the entry point script tag when working with Vite projects, especially if `vite build` produces an empty asset list.
