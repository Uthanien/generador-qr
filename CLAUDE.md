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

This is a QR code generator web application built with Vue 3, Oruga UI (Bulma theme), and QRious library. The app allows users to create customizable QR codes with control over content, size, colors, quality, and transparency, then download them as PNG images.

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
- **Vue 3.5**: Component framework (migrated from Vue 2.6)
- **Vite 6.x**: Build tool and development server (replaces Vue CLI)
- **Oruga UI 0.12**: Successor to Buefy, compatible with Vue 3
- **@oruga-ui/theme-bulma 0.8**: Bulma theme for Oruga UI
- **Bulma 1.0**: CSS framework
- **QRious 4.0.2**: QR code generation library
- **@ckpack/vue-color 1.5**: Color picker component for Vue 3 (uses Sketch component)
- **@mdi/font 7.x**: Material Design Icons
- **Node.js 20+**: Required runtime version

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

**vite.config.js** - Vite configuration:
- Uses `@vitejs/plugin-vue` for Vue 3 SFC support
- Configures `@` alias for `src` directory
- Sets `base: './'` for production to ensure proper asset paths
- Build output to `dist` directory with assets in `assets` subdirectory

**index.html** (root directory):
- Located in project root (Vite requirement, not in `public/` like Vue CLI)
- Includes comprehensive meta tags for SEO, Open Graph, and Twitter Cards
- Contains `<script type="module" src="/src/main.js"></script>` for Vite entry point
- App mounts to `<div id="app" class="section"></div>`
- Static assets (favicon, images) remain in `public/` directory

### Migration Notes from Vue 2 to Vue 3

**Breaking Changes Addressed**:
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

- Compatible with Node.js 20 or superior
- ESLint configured with Vue 3 recommended rules
- No test suite is currently configured
- All functionality from Vue 2 version has been preserved
