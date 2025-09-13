# Technology Stack & Dependencies

## Table of Contents
1. [Core Dependencies Overview](#core-dependencies-overview)
2. [Frontend Framework: React 19.1.1](#frontend-framework-react-1911)
3. [Build Tool: Vite 7.1.2](#build-tool-vite-712)
4. [Styling System: Tailwind CSS 4.13](#styling-system-tailwind-css-413)
5. [File Upload: react-dropzone 14.3.8](#file-upload-react-dropzone-1438)
6. [Icons: lucide-react 0.544.0](#icons-lucide-react-05440)
7. [Type Safety: TypeScript with Strict Configuration](#type-safety-typescript-with-strict-configuration)
8. [Styling Pipeline: PostCSS Integration](#styling-pipeline-postcss-integration)
9. [Code Quality: ESLint Configuration](#code-quality-eslint-configuration)
10. [Environment Variables in Vite](#environment-variables-in-vite)

## Core Dependencies Overview

The Background Remover application leverages a modern, optimized technology stack designed for developer productivity, performance, and maintainability. The architecture combines React for UI composition, Vite as a next-generation build tool, Tailwind CSS for utility-first styling, and several specialized libraries to handle specific functionality. All code is written in TypeScript with strict type checking enabled, ensuring code quality and reducing runtime errors.

**Section sources**
- [package.json](../../package.json#L1-L36)

## Frontend Framework: React 19.1.1

React 19.1.1 serves as the foundation for the application's user interface, providing a component-based architecture that enables reusable, composable UI elements. The version aligns with the latest React features and improvements, including enhanced server components support and improved performance optimizations. Components such as `ImageUploader`, `ImageProcessor`, and `AppContext` demonstrate the use of React hooks (`useState`, `useCallback`, `useEffect`) and context API for state management across the application.

React's declarative approach allows developers to describe what the UI should look like at any given point in time, with React efficiently updating and rendering components when state changes. The integration with Vite ensures fast refresh during development and optimal bundling for production.

**Section sources**
- [package.json](../../package.json#L14-L15)
- [src/components/ImageUploader.tsx](../../src/components/ImageUploader.tsx#L1-L203)
- [src/components/ImageProcessor.tsx](../../src/components/ImageProcessor.tsx#L1-L185)

## Build Tool: Vite 7.1.2

Vite 7.1.2 is the core build tool powering both development and production workflows. It provides an exceptionally fast development server with native ES modules support, enabling near-instant startup times and lightning-fast Hot Module Replacement (HMR). During development, Vite serves source files over native ESM, eliminating the need for bundling and significantly reducing initial load time.

In production, Vite leverages Rollup under the hood to generate highly optimized static assets with code splitting, tree-shaking, and minification. The build process is configured through `vite.config.ts`, which integrates the React plugin to support JSX and React-specific features. The `dev` and `build` scripts in `package.json` orchestrate the development server and TypeScript compilation workflow.

**Section sources**
- [package.json](../../package.json#L30-L33)
- [vite.config.ts](../../vite.config.ts#L1-L7)

## Styling System: Tailwind CSS 4.13

Tailwind CSS 4.13 implements a utility-first CSS methodology, allowing developers to style components directly within JSX using atomic classes. This approach eliminates context switching between HTML and CSS files and promotes consistency through a constrained design system. The application uses Tailwind's responsive prefixes, state variants (e.g., hover, focus), and custom color palette to create a polished, accessible UI.

Tailwind's JIT (Just-In-Time) engine generates styles on-demand, resulting in minimal CSS output. The configuration is managed through PostCSS, with plugins like `@tailwindcss/typography` enhancing content styling. Utility classes are extensively used throughout components for layout (`flex`, `grid`), spacing (`p-4`, `m-2`), colors (`text-primary-600`), and animations (`animate-spin`, `transition-all`).

**Section sources**
- [package.json](../../package.json#L10-L11)
- [postcss.config.js](../../postcss.config.js#L1-L5)
- [src/components/ImageUploader.tsx](../../src/components/ImageUploader.tsx#L150-L200)

## File Upload: react-dropzone 14.3.8

react-dropzone 14.3.8 provides robust drag-and-drop file upload functionality in the `ImageUploader` component. It abstracts browser inconsistencies in file handling APIs and offers a simple, declarative interface for managing file input. The library supports file type validation, size restrictions, and multiple file handling through configuration options.

In this application, react-dropzone is configured to accept only JPEG, PNG, and WEBP image formats with a maximum size of 12MB. It handles both drag-and-drop interactions and traditional file browsing, providing callbacks for successful drops and rejected files. The integration with React state allows for real-time preview generation and validation feedback to users.

**Section sources**
- [package.json](../../package.json#L13)
- [src/components/ImageUploader.tsx](../../src/components/ImageUploader.tsx#L1-L203)

## Icons: lucide-react 0.544.0

lucide-react 0.544.0 delivers a consistent, lightweight icon system across the application. As a React component library, it allows icons to be imported and rendered like any other component, enabling full TypeScript support and tree-shaking. The application uses icons such as `Upload`, `X`, `Image`, `FileCheck`, and `CloudUpload` to enhance usability and visual feedback.

Lucide's clean, minimalist design aligns with the application's aesthetic, and its modular structure ensures only used icons are included in the final bundle. Icons are styled using Tailwind CSS classes for size, color, and animation, maintaining consistency with the overall design language.

**Section sources**
- [package.json](../../package.json#L12)
- [src/components/ImageUploader.tsx](../../src/components/ImageUploader.tsx#L3-L4)

## Type Safety: TypeScript with Strict Configuration

TypeScript is configured with strict type checking enabled through `tsconfig.app.json`, ensuring high code quality and catching potential bugs at compile time. The configuration enforces strict null checks, prohibits implicit `any` types, and validates unused variables and parameters. This results in more predictable code and better developer experience through enhanced IDE support.

The application defines comprehensive types in `src/types/index.ts`, including interfaces for API errors, image data, processing state, and application context. These types are used throughout the codebase to ensure consistency between components and services. The `AppContextType` interface, for example, precisely defines the shape of the application state and available actions.

**Section sources**
- [tsconfig.app.json](../../tsconfig.app.json#L1-L27)
- [src/types/index.ts](../../src/types/index.ts#L1-L50)

## Styling Pipeline: PostCSS Integration

PostCSS is integrated as part of the build process to process CSS files and apply transformations. The configuration in `postcss.config.js` includes `@tailwindcss/postcss` and `autoprefixer`, enabling Tailwind's utility classes and automatic vendor prefixing for cross-browser compatibility. This pipeline ensures that modern CSS features work across different browsers while maintaining optimal performance.

The PostCSS setup works seamlessly with Vite's development server and production build, processing CSS on-the-fly during development and optimizing it for production. This integration allows developers to write future-proof CSS while maintaining broad browser support.

**Section sources**
- [postcss.config.js](../../postcss.config.js#L1-L5)
- [package.json](../../package.json#L9-L10)

## Code Quality: ESLint Configuration

ESLint is configured through `eslint.config.js` to enforce code quality standards and best practices. The configuration extends recommended rules from `@eslint/js`, `typescript-eslint`, and `eslint-plugin-react-hooks`, while also incorporating Vite-specific refresh rules. It targets TypeScript and React files with appropriate language options and global settings.

The linting setup includes rules for React hooks (ensuring proper usage of `useEffect`, `useState`, etc.), TypeScript type safety, and general JavaScript best practices. The `lint` script in `package.json` allows developers to run the linter across the codebase, catching potential issues before they reach production. This systematic approach to code quality helps maintain consistency across the team and reduces technical debt.

**Section sources**
- [eslint.config.js](../../eslint.config.js#L1-L23)
- [package.json](../../package.json#L32)

## Environment Variables in Vite

Environment variables are securely managed using Vite's built-in environment variable system. Sensitive credentials, such as the Remove.bg API key, are accessed through `import.meta.env.VITE_REMOVE_BG_API_KEY` in the `backgroundRemovalService.ts` file. Variables prefixed with `VITE_` are exposed to the client-side code during the build process, while other variables remain hidden for security.

This approach allows for different environment configurations (development, staging, production) without hardcoding sensitive information. The service layer uses the API key to authenticate requests to the background removal API, with proper error handling for invalid or missing credentials.

**Section sources**
- [src/services/backgroundRemovalService.ts](../../src/services/backgroundRemovalService.ts#L5-L135)
- [vite.config.ts](../../vite.config.ts#L1-L7)