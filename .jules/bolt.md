## 2025-05-24 - Missing Entry Point & Code Splitting
**Learning:** The `index.html` file was missing the `<script type="module" src="/index.tsx"></script>` tag, which prevented Vite from building the application correctly. This likely meant the application was not buildable in a standard environment.
**Action:** Always check `index.html` for the correct entry point reference when working with Vite projects, especially if build artifacts are missing or empty.
