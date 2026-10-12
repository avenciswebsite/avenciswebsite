# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

---

## 🐳 Docker Deployment & Network Exposure

The application is fully containerized and configured for both production serving and local containerized development.

### 1. Production Mode (Optimized Nginx SPA)
Builds the static production bundle and serves it via Alpine Nginx with Gzip compression and client-side routing fallbacks:

```bash
# Build and start via Docker Compose:
docker compose up -d --build web

# Or with npm shortcut:
npm run docker:up

# Available at:
# http://localhost (port 80)
# http://localhost:3000 (port 3000)
```

### 2. Development Mode (Live Hot Reload in Docker)
Runs Vite bound to `0.0.0.0` with polling file watchers enabled for cross-platform volume hot-reloading:

```bash
# Start development container:
docker compose up dev --build

# Or with npm shortcut:
npm run docker:dev

# Available at:
# http://localhost:5173
```

### 3. Stop Containers
```bash
docker compose down
# Or:
npm run docker:down
```
