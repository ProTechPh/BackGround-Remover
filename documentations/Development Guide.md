# Development Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Instructions](#setup-instructions)
3. [NPM Scripts](#npm-scripts)
4. [Coding Standards and Linting](#coding-standards-and-linting)
5. [Directory Structure and Component Organization](#directory-structure-and-component-organization)
6. [Contribution Guidelines](#contribution-guidelines)
7. [Testing Strategy Recommendations](#testing-strategy-recommendations)
8. [Version Control Practices](#version-control-practices)
9. [Debugging Tips](#debugging-tips)
10. [Documentation Updates](#documentation-updates)

## Introduction
This guide provides comprehensive information for developers contributing to the Background Remover project. It covers setup, development workflows, coding standards, contribution processes, and debugging techniques to ensure consistent and efficient development.

## Setup Instructions

### Node.js Version Requirement
The project requires **Node.js 18 or higher** for proper functionality. This is specified in the README and aligns with the modern React and Vite tooling used in the project.

### Package Installation
Install all project dependencies using npm:
```bash
npm install
```

This command installs both production and development dependencies listed in `package.json`, including React 19.1.1, TypeScript 5.8.3, Vite 7.1.2, and associated tooling.

### Environment Configuration
The application uses the remove.bg API for background removal. While no traditional environment variables are used, API key configuration is handled as follows:

1. Obtain a free API key from [remove.bg API](https://www.remove.bg/api)
2. The API key is entered directly in the application UI
3. Once entered, the key is securely stored in the browser's `localStorage`
4. No server-side configuration or `.env` files are required

### Starting the Development Server
Launch the development server with:
```bash
npm run dev
```

This starts the Vite development server, which provides:
- Hot module replacement (HMR)
- Fast startup times
- Automatic browser reloading
- Local development at `http://localhost:5173`

**Section sources**
- [package.json](../../package.json#L6-L10)
- [README.md](../../README.md#L28-L38)

## NPM Scripts
The project defines several npm scripts in `package.json` to streamline development workflows:

| Script | Command | Purpose |
|--------|--------|---------|
| `dev` | `vite` | Starts development server with hot reloading |
| `build` | `tsc -b && vite build` | Compiles TypeScript and creates production build |
| `lint` | `eslint .` | Runs ESLint to check code quality and standards |
| `preview` | `vite preview` | Locally previews production build |

The `build` script first runs TypeScript compilation (`tsc -b`) using the project's tsconfig configuration, then executes `vite build` to create optimized production assets in the `dist` directory.

**Section sources**
- [package.json](../../package.json#L6-L10)

## Coding Standards and Linting

### ESLint Configuration
The project enforces coding standards through ESLint with the following configuration in `eslint.config.js`:

- Extends recommended rules from `@eslint/js`
- Uses `typescript-eslint` for TypeScript-specific linting
- Implements `eslint-plugin-react-hooks` for React hook rules
- Includes `reactRefresh` configuration for Vite integration
- Ignores the `dist` directory from linting

The configuration applies to all `.ts` and `.tsx` files and sets browser globals for proper type checking.

### Running Linting
Execute the linting process with:
```bash
npm run lint
```

This command runs ESLint across all project files, identifying potential issues, code style violations, and possible bugs. The linting rules are designed to:
- Enforce consistent code style
- Catch common JavaScript/TypeScript errors
- Ensure proper React hook usage
- Maintain code quality across the codebase

Developers should run linting before committing code to ensure compliance with project standards.

**Section sources**
- [eslint.config.js](../../eslint.config.js#L1-L24)
- [package.json](../../package.json#L9-L10)

## Directory Structure and Component Organization

### Project Structure Overview
The application follows a feature-based organization with clear separation of concerns:

```
src/
├── components/          # UI components
├── context/            # State management
├── services/           # API integrations
├── types/              # Type definitions
├── App.tsx             # Main component
└── main.tsx            # Entry point
```

### Component Organization Principles
Components are organized by responsibility and reusability:

- **Components Directory**: Contains reusable UI components like `Header.tsx`, `Footer.tsx`, and specialized components like `ImageUploader.tsx`
- **Context Directory**: Houses `AppContext.tsx` which manages global application state using React Context API and useReducer
- **Services Directory**: Contains business logic and API integrations like `backgroundRemovalService.ts`
- **Types Directory**: Centralizes TypeScript interfaces and types in `index.ts` for consistent type definitions

The architecture follows React best practices with:
- Single responsibility components
- Separation of UI and business logic
- Centralized state management
- Type safety throughout

**Section sources**
- [README.md](../../README.md#L108-L130)
- [project_structure](../../project_structure)

## Contribution Guidelines

### Reporting Bugs
When reporting bugs, include:
- Detailed description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information
- Screenshots or console errors when applicable

Common error types are categorized in the code:
- `INVALID_API_KEY`: Authentication issues
- `INSUFFICIENT_CREDITS`: API quota exceeded
- `UNSUPPORTED_FORMAT`: Invalid file type
- `FILE_TOO_LARGE`: Files over 12MB
- `NETWORK_ERROR`: Connectivity issues
- `PROCESSING_ERROR`: Server or processing failures

### Requesting Features
Feature requests should include:
- Clear description of the desired functionality
- Use cases and user benefits
- Mockups or examples when possible
- Consideration of existing architecture

### Submitting Pull Requests
Follow this process for pull requests:
1. Fork the repository
2. Create a feature branch (`feature/descriptive-name`)
3. Implement changes with proper testing
4. Ensure code passes linting
5. Update documentation if needed
6. Submit PR with detailed description

PRs should:
- Focus on a single change
- Include relevant tests
- Maintain coding standards
- Update documentation when appropriate

**Section sources**
- [README.md](../../README.md#L178-L188)
- [src/types/index.ts](../../src/types/index.ts#L1-L20)

## Testing Strategy Recommendations

### Current Testing Status
The project does not currently include formal automated tests. However, the architecture supports testing through:

- Modular component design
- Separated service layer
- Type-safe interfaces
- Predictable state management

### Recommended Testing Approach
Implement a comprehensive testing strategy with:

#### Unit Testing
- Test individual components in isolation
- Use Jest and React Testing Library
- Focus on `ImageUploader`, `ImageProcessor`, and utility functions
- Test edge cases and error handling

#### Integration Testing
- Test component interactions
- Verify context provider functionality
- Validate service integration with mock APIs
- Test user workflows (upload → process → download)

#### Service Layer Testing
- Mock the remove.bg API endpoint
- Test `BackgroundRemovalService` error handling
- Validate file validation logic
- Test different response scenarios (401, 402, 429, etc.)

#### End-to-End Testing
- Use Playwright or Cypress
- Automate complete user journeys
- Test cross-browser compatibility
- Validate production build behavior

**Section sources**
- [src/services/backgroundRemovalService.ts](../../src/services/backgroundRemovalService.ts#L1-L135)
- [src/context/AppContext.tsx](../../src/context/AppContext.tsx#L1-L235)

## Version Control Practices

### Branch Management
Recommended branching strategy:
- `main` branch: Production-ready code
- `develop` branch: Integration branch (if adopted)
- Feature branches: `feature/feature-name`
- Bugfix branches: `bugfix/issue-description`
- Release branches: `release/vX.X.X`

### Commit Guidelines
Follow conventional commit messages:
- `feat: add new feature`
- `fix: resolve issue`
- `docs: update documentation`
- `style: code formatting`
- `refactor: code restructuring`
- `test: add tests`
- `chore: maintenance tasks`

### Code Review Process
All changes should go through pull request review with:
- At least one reviewer
- CI/CD pipeline validation
- Linting verification
- Functional testing confirmation

**Section sources**
- [README.md](../../README.md#L178-L188)

## Debugging Tips

### Browser Developer Tools
Use browser dev tools effectively:

- **Console**: Monitor API errors and warnings
- **Network Tab**: Inspect API requests to remove.bg
  - Verify headers (especially `X-Api-Key`)
  - Check request payload and response
  - Monitor response times and status codes
- **Application/Storage Tab**: 
  - View localStorage contents
  - Check API key storage
  - Clear stored data when needed
- **Performance Tab**: Analyze rendering performance

### React Developer Tools
Leverage React DevTools for:
- Component hierarchy inspection
- State and props monitoring
- Performance profiling
- Context value inspection (AppContext)

### Common Issues and Solutions
#### API Key Issues
- Verify key is correctly entered
- Check localStorage for stored key
- Confirm account has sufficient credits

#### File Upload Problems
- Ensure file is under 12MB
- Verify format is JPEG, PNG, or WEBP
- Check file integrity

#### Processing Failures
- Check network connectivity
- Verify API endpoint accessibility
- Monitor progress state in React DevTools

#### Memory Leaks
- Ensure object URLs are properly revoked
- Check for event listener cleanup
- Monitor memory usage during prolonged use

**Section sources**
- [src/services/backgroundRemovalService.ts](../../src/services/backgroundRemovalService.ts#L1-L135)
- [src/context/AppContext.tsx](../../src/context/AppContext.tsx#L1-L235)
- [src/components/ErrorAlert.tsx](../../src/components/ErrorAlert.tsx#L1-L51)

## Documentation Updates
Maintain documentation parity with code changes:

- Update `README.md` when adding features
- Document new API endpoints or configuration
- Update type definitions in `src/types/index.ts`
- Add comments for complex logic
- Keep component props documented
- Update troubleshooting section for new error cases

When modifying the API service or context, ensure type definitions remain accurate and comprehensive. The TypeScript interfaces in `src/types/index.ts` serve as living documentation for the application's data structures and should be kept up-to-date.

**Section sources**
- [README.md](../../README.md#L1-L188)
- [src/types/index.ts](../../src/types/index.ts#L1-L50)