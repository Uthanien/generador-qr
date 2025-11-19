# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language

**IMPORTANT**: Always communicate in Chilean Spanish (español chileno) when working in this repository. All responses, explanations, comments, and interactions should be in Chilean Spanish.

## Working Profile

When working in this repository, assume the role of a **Software Architect expert in JavaScript and Vue.js**. Apply deep knowledge of:
- Modern JavaScript (ES6+) patterns and best practices
- Vue.js 2.x and 3.x architecture, lifecycle hooks, component design, and Composition API
- Frontend architecture and scalable application design
- Performance optimization and code quality standards

## Project Overview

**Version**: 2.0.0

This is a QR code generator web application built with Vue 3, Oruga UI (Bulma theme), and QRious library. The app allows users to create customizable QR codes with control over content, size, colors, quality, and transparency, then download them as PNG images.

### Version History
- **v2.0.0** - Full update to latest versions (Vite 7, ESLint 9, Vue 3.5.24)
- **v0.2.0** - Migration to Vue 3, Vite, and Oruga UI
- **v0.1.0** - Original version with Vue 2 and Buefy

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with hot-reload (Vite)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint and fix files
npm run lint
```

## Architecture

### Technology Stack
- **Vue 3.5.24**: Component framework (migrated from Vue 2.6)
- **Vite 7.2.2**: Build tool and development server (replaces Vue CLI)
- **@vitejs/plugin-vue 6.0.2**: Official Vite plugin for Vue 3
- **Oruga UI 0.12.1**: Successor to Buefy, compatible with Vue 3
- **@oruga-ui/theme-bulma 0.8.0**: Bulma theme for Oruga UI
- **Bulma 1.0.4**: CSS framework
- **QRious 4.0.2**: QR code generation library
- **@ckpack/vue-color 1.6.0**: Color picker component for Vue 3 (uses Sketch component)
- **@mdi/font 7.4.47**: Material Design Icons
- **ESLint 9.39.1**: Linter with flat config format
- **eslint-plugin-vue 10.5.1**: Vue-specific linting rules
- **Node.js 20+**: Required runtime version (tested on 24.5.0)

### Application Structure
The application is a single-page app (SPA) with a simple architecture:

**Main Entry Point** (`src/main.js`):
- Uses Vue 3's `createApp()` API instead of `new Vue()`
- Configures Oruga UI globally with Bulma theme configuration
- Imports Oruga theme CSS (`@oruga-ui/theme-bulma/style.css`)
- Imports Material Design Icons CSS
- Mounts the root App component to `#app`

**Root Component** (`src/App.vue`):
- **Single component application**: All functionality lives in App.vue, no routing
- Uses Oruga UI components (prefixed with `o-`) instead of Buefy components (prefixed with `b-`)
- Component events use Vue 3's `@update:modelValue` instead of `@input`
- Component props use `:modelValue` instead of `:value`
- Uses QRious library to generate QR codes on a canvas element (referenced as `#codigo`)
- QR instance is initialized in `mounted()` lifecycle hook and stored in `this.qr`
- Updates happen via `actualizarCodigoQr()` method which calls `this.qr.set()` with new parameters
- Color pickers use the `Sketch` component from @ckpack/vue-color library
- Download functionality uses programmatic `<a>` element with canvas data URL
- Accessing Oruga component refs requires `.$el` (e.g., `this.$refs.textareaContenido.$el.focus()`)

**State Management**:
- No Pinia or external state management
- Component-local state in `data()` includes:
  - `detallesQr`: QR configuration (value, foreground, background, size, level, backgroundAlpha)
  - `qr`: QRious instance reference
  - `colores` and `coloresFondo`: Color picker model objects with `hex` property

**Key Implementation Details**:
- QR code quality levels: "L" (Baja), "M" (Media), "Q" (Alta), "H" (Máxima)
- Color defaults: foreground `#000000`, background `#ffffff`
- Size range: 10px to 1000px
- Background opacity range: 0 to 1 (step 0.1)
- Download generates file named "Código QR.png"
- Oruga UI components use `variant` prop instead of `type` (e.g., `variant="success"` instead of `type="is-success"`)

### Build Configuration

**vite.config.js** - Vite 7 configuration:
- Uses `@vitejs/plugin-vue` for Vue 3 SFC support
- Configures `@` alias for `src` directory
- Sets `base: './'` for production to ensure proper asset paths
- Build output to `dist` directory with assets in `assets` subdirectory

**eslint.config.js** - ESLint 9 flat config:
- Uses new flat config format (ESLint 9+)
- Configured with `@eslint/js` recommended rules
- Includes `eslint-plugin-vue` flat/recommended configuration
- Supports both `.js` and `.vue` files
- Ignores `dist/`, `node_modules/`, and config files

**index.html** (root directory):
- Located in project root (Vite requirement, not in `public/` like Vue CLI)
- Includes comprehensive meta tags for SEO, Open Graph, and Twitter Cards
- Contains `<script type="module" src="/src/main.js"></script>` for Vite entry point
- App mounts to `<div id="app" class="section"></div>`
- Static assets (favicon, images) remain in `public/` directory

### Migration Notes

**v2.0.0 Updates (Latest)**:
- Updated Vite 6.x → 7.2.2 (major performance improvements)
- Updated @vitejs/plugin-vue 5.x → 6.0.2
- Migrated ESLint 8 → ESLint 9 with new flat config format
- Updated eslint-plugin-vue 9.x → 10.5.1
- Updated Vue 3.5.13 → 3.5.24
- Updated @ckpack/vue-color 1.5 → 1.6
- Updated Bulma 1.0.2 → 1.0.4
- Removed `@vue/eslint-config-prettier` (no longer needed)
- Created `eslint.config.js` with flat config format
- All dependencies updated to latest stable versions
- 0 security vulnerabilities

**v0.2.0 - Vue 2 to Vue 3 Migration**:
- Migrated from Vue CLI to Vite for faster builds and better DX
- Replaced Buefy with Oruga UI (maintains similar API but with `o-` prefix)
- Updated all component events from `@input` to `@update:modelValue`
- Updated all v-model bindings to use `:modelValue` syntax where needed
- Changed component refs access pattern to use `.$el` for Oruga components
- Updated color picker from vue-color to @ckpack/vue-color

**Files Removed**:
- `vue.config.js` (replaced by `vite.config.js`)
- `babel.config.js` (Vite uses esbuild)
- `public/index.html` (moved to root)
- `src/components/HelloWorld.vue` (unused boilerplate)

## Notes

- Compatible with Node.js 20 or superior (tested on Node.js 24.5.0)
- ESLint configured with flat config format (ESLint 9+)
- All dependencies are at their latest stable versions
- 0 security vulnerabilities
- No test suite is currently configured
- All functionality from Vue 2 version has been preserved
- Build time: ~2.7s for production
- Development server startup: ~300ms with Vite 7
