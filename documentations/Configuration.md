# Configuration

## Table of Contents
1. [Environment Variables](#environment-variables)
2. [Vite Configuration](#vite-configuration)
3. [TypeScript Configuration](#typescript-configuration)
4. [ESLint and Code Quality](#eslint-and-code-quality)
5. [PostCSS and Styling](#postcss-and-styling)
6. [Development Setup](#development-setup)
7. [Production Build and Deployment](#production-build-and-deployment)
8. [Common Configuration Pitfalls](#common-configuration-pitfalls)

## Environment Variables

The Background Remover application uses environment variables to securely manage API credentials. The primary environment variable is `VITE_REMOVE_BG_API_KEY`, which is used to authenticate requests to the remove.bg API. Vite automatically exposes variables prefixed with `VITE_` to the client-side code via `import.meta.env`. This variable is accessed in the application using `import.meta.env.VITE_REMOVE_BG_API_KEY` within the `backgroundRemovalService.ts` file, ensuring sensitive credentials are not hardcoded. During development, this value is loaded from a `.env` file, while in production, it must be defined in the deployment environment.

**Section sources**
- [src/services/backgroundRemovalService.ts](../../src/services/backgroundRemovalService.ts#L10)
- [.env.example](../../.env.example#L0)

## Vite Configuration

The Vite configuration is defined in `vite.config.ts` and sets up the development and build environment for the React application. It imports the `@vitejs/plugin-react` plugin to enable React support, including Fast Refresh for efficient development. The configuration is minimal, focusing on essential plugin integration without additional server or build overrides. Default Vite settings are used for development server behavior, asset handling, and optimization. The build process is triggered via the `npm run build` script, which first runs `tsc -b` for type checking across referenced TypeScript configurations before executing `vite build`.

**Section sources**
- [vite.config.ts](../../vite.config.ts#L1-L7)
- [package.json](../../package.json#L7-L10)

## TypeScript Configuration

The project uses a composite TypeScript configuration with three distinct files to separate concerns. The root `tsconfig.json` references two other configuration files: `tsconfig.app.json` and `tsconfig.node.json`. The `tsconfig.app.json` file configures settings for the application code, including target ECMAScript version (ES2022), module resolution for bundlers, JSX transformation for React, and strict type-checking rules. It includes all files under the `src` directory. The `tsconfig.node.json` file configures settings for Node.js scripts, such as `vite.config.ts`, targeting ES2023 and including only the Vite configuration file. This separation ensures appropriate type checking for both frontend and build-time code.

**Section sources**
- [tsconfig.json](../../tsconfig.json#L1-L7)
- [tsconfig.app.json](../../tsconfig.app.json#L1-L27)
- [tsconfig.node.json](../../tsconfig.node.json#L1-L25)

## ESLint and Code Quality

Code quality is enforced through ESLint configured via `eslint.config.js`. The configuration uses `typescript-eslint` to extend recommended rules for TypeScript, along with React-specific plugins for hooks (`eslint-plugin-react-hooks`) and React Refresh integration. It extends base recommendations from `@eslint/js` and sets browser globals for frontend context. The linting rules apply to all `.ts` and `.tsx` files and include strict checks for unused variables, fallthrough cases in switches, and side-effect imports. The `dist` directory is ignored during linting. The `npm run lint` script executes ESLint across the entire codebase, helping maintain consistent code quality and catching potential bugs early.

**Section sources**
- [eslint.config.js](../../eslint.config.js#L1-L23)
- [package.json](../../package.json#L9)

## PostCSS and Styling

Styling is managed through PostCSS with configuration in `postcss.config.js`. The configuration includes `@tailwindcss/postcss` and `autoprefixer` plugins, enabling Tailwind CSS utility classes and automatic vendor prefixing for cross-browser compatibility. Tailwind CSS is used throughout the application for responsive, utility-first styling, allowing rapid UI development without writing custom CSS. This setup integrates seamlessly with Vite and enables features like JIT mode and typography plugins as defined in the Tailwind configuration (not shown in provided files). The PostCSS pipeline processes all CSS files during development and build, ensuring consistent styling output.

**Section sources**
- [postcss.config.js](../../postcss.config.js#L1-L5)
- [package.json](../../package.json#L18-L26)

## Development Setup

To set up the development environment:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/background-remover.git
   cd background-remover
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   Copy the example file and add your API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace `your_api_key` with your actual remove.bg API key:
   ```
   VITE_REMOVE_BG_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open `http://localhost:5173` in your browser.

The development server automatically reloads on code changes, and Vite provides fast hot module replacement for React components.

**Section sources**
- [.env.example](../../.env.example#L0)
- [package.json](../../package.json#L7)
- [README.md](../../README.md#L20-L30)

## Production Build and Deployment

To build the application for production:

```bash
npm run build
```

This command runs `tsc -b` to type-check across all referenced TypeScript configurations, followed by `vite build` to create optimized static assets in the `dist` directory. The build includes minified JavaScript, CSS, and optimized assets with hashed filenames for cache busting.

To preview the production build locally:
```bash
npm run preview
```

The application can be deployed to any static hosting service (e.g., Netlify, Vercel, GitHub Pages) by uploading the contents of the `dist` directory. Ensure the production environment has the `VITE_REMOVE_BG_API_KEY` environment variable set if serving the index.html through a server that injects environment variables. For pure static hosting, the API key must be provided by the user through the application interface, as it cannot be embedded in the built files.

**Section sources**
- [package.json](../../package.json#L8-L9)
- [README.md](../../README.md#L155-L160)

## Common Configuration Pitfalls

1. **Missing API Key**: Forgetting to set `VITE_REMOVE_BG_API_KEY` results in authentication failures. Ensure the `.env` file is present in development and environment variables are set in production.

2. **Environment Variable Prefix**: Variables must be prefixed with `VITE_` to be exposed to client code. Using other prefixes (e.g., `REACT_APP_`) will not work with Vite.

3. **TypeScript Configuration Issues**: Modifying `tsconfig.json` references incorrectly can break type checking. Always ensure `tsconfig.app.json` and `tsconfig.node.json` paths are correct.

4. **ESLint Configuration Conflicts**: Adding conflicting ESLint plugins or rules can cause linting to fail. Stick to the configured setup unless extending with compatible rules.

5. **PostCSS Plugin Order**: While not currently an issue, changing the order of PostCSS plugins could affect CSS output. Tailwind should generally run before autoprefixer.

6. **Build Script Errors**: Running `vite build` without first type-checking may miss TypeScript errors. The `npm run build` script correctly runs `tsc -b` first.

7. **Caching Issues**: After configuration changes, clear Node.js cache or delete `node_modules/.tmp` if experiencing type checking issues.

Debugging configuration issues involves checking the terminal output during development and build processes, verifying environment variables with `console.log(import.meta.env)` (remove before commit), and reviewing browser developer tools for runtime errors.

**Section sources**
- [vite.config.ts](../../vite.config.ts#L1-L7)
- [tsconfig.json](../../tsconfig.json#L1-L7)
- [eslint.config.js](../../eslint.config.js#L1-L23)
- [postcss.config.js](../../postcss.config.js#L1-L5)
- [package.json](../../package.json#L7-L10)