# Thao Nguyen Creative Marketer Portfolio Frontend Architecture Document

## 1. Template and Framework Selection

For a project of this nature—a visually rich, single-page application with a focus on performance and a premium feel—selecting the right foundational framework is paramount.

The selected framework is **Next.js**.

No pre-existing starter template has been specified, so we will proceed with a standard Next.js installation. This choice provides the strongest foundation for achieving the project's goals of performance, quality, and future scalability.

---

## 2. Frontend Tech Stack

This table outlines the complete technology stack for the frontend. Each choice is aligned with the Next.js framework and the goals defined in the UI/UX Specification.

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| Framework | **Next.js** | `^14.0` | Core application framework | Provides Static Site Generation (SSG) for performance, a robust component model, and an excellent developer experience. |
| UI Library | **React** | `^18.0` | Declarative UI development | The foundation of Next.js. Its component-based architecture is ideal for building a modular and maintainable UI. |
| State Management | **React Hooks** | `^18.0` | Local & shared component state | For a single-page portfolio, a dedicated state management library is overkill. `useState` and `useContext` are sufficient. |
| Routing | **Next.js App Router** | `^14.0` | File-based routing | Built into Next.js. We will use anchor links and smooth-scrolling for this single-page layout. |
| Build Tool | **SWC (via Next.js)** | `^14.0` | Compiling and bundling | The default Rust-based compiler in Next.js. It is extremely fast and requires no manual configuration. |
| Styling | **Tailwind CSS** | `^3.0` | Utility-first CSS framework | Allows for rapid development and ensures styling consistency. |
| Animation | **Framer Motion** | `^10.0` | Declarative animations | A powerful and easy-to-use animation library for React that simplifies the creation of sophisticated animations. |
| Dev Tools | **ESLint & Prettier** | Latest | Code linting & formatting | Enforces a consistent code style and helps prevent common errors. |

---

## 3. Project Structure

This structure is based on Next.js 14 `app` router conventions and best practices for a modern React project.

```plaintext
/
├── .vscode/
├── .eslintrc.json
├── .prettierrc
├── components/
│   ├── ui/
│   │   └── button.tsx
│   └── sections/
│       ├── 01-hero-section.tsx
│       ├── 02-journey-section.tsx
│       ├── 03-client-projects-section.tsx
│       ├── 04-agency-projects-section.tsx
│       ├── 05-skills-section.tsx
│       └── 06-connect-section.tsx
├── public/
│   ├── images/
│   └── fonts/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── styles/
│   └── globals.css
├── lib/
│   └── data.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
└── package.json
```

---

## 4. Component Standards

All components created for this project must adhere to the following standards.

### 4.1 Component Template

```typescript
// components/ui/button.tsx

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const baseStyle = 'px-6 py-3 font-bold rounded-md transition-colors duration-300';
  const variantStyles = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600',
    secondary: 'bg-transparent border border-gray-400 text-gray-200 hover:bg-gray-700',
  };
  const combinedClasses = `${baseStyle} ${variantStyles[variant]} ${className}`;

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
```

### 4.2 Naming Conventions

*   **Component Files:** `PascalCase.tsx`
*   **Component Variables:** `PascalCase`
*   **Props Interfaces:** `[ComponentName]Props`
*   **Non-Component Files:** `camelCase.ts`

---

## 5. State Management

We will exclusively use standard React Hooks (`useState`, `useEffect`, `useContext`) for all state management needs. A global state management library is not required for the current scope of this project.

---

## 6. API Integration

There is no requirement for runtime API integration. All content will be managed directly in the codebase within a structured TypeScript file at `lib/data.ts`.

---

## 7. Routing

As a single-page application, all routing will be handled via anchor links on the single homepage. Each `<section>` element will be given a unique `id` attribute, and the navigation links will point to these IDs (e.g., `<a href="#journey">`).

---

## 8. Styling Guidelines

We will use **Tailwind CSS** as the primary and exclusive styling methodology. All brand-specific values (colors, fonts, spacing) will be configured in the `tailwind.config.ts` file.

### 8.1 Global Theme & Variables (`tailwind.config.ts`)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A202C',
        secondary: '#FFFFFF',
        accent: '#38B2AC',
        neutral: '#A0AEC0',
      },
      # Thao Nguyen Creative Marketer Portfolio Frontend Architecture Document

## 1. Template and Framework Selection

For a project of this nature—a visually rich, single-page application with a focus on performance and a premium feel—selecting the right foundational framework is paramount.

The selected framework is **Astro**.

This choice provides the strongest foundation for achieving the project's goals of performance, quality, and future scalability by leveraging Astro's zero-JavaScript-by-default architecture.

---

## 2. Frontend Tech Stack

This table outlines the complete technology stack for the frontend. Each choice is aligned with the Astro framework and the goals defined in the UI/UX Specification.

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| Framework | **Astro** | `^4.0` | Core application framework | Provides an islands architecture for optimal performance, serving only HTML and CSS by default. |
| UI Library | **Astro Components** | `^4.0` | Declarative UI development | Astro's `.astro` files provide a familiar, component-based authoring experience with a syntax similar to HTML. |
| State Management | **N/A** | N/A | Local & shared component state | For a single-page portfolio, a dedicated state management library is not required. |
| Routing | **Astro File-Based Routing** | `^4.0` | File-based routing | Built into Astro. We will use anchor links and smooth-scrolling for this single-page layout. |
| Build Tool | **Vite (via Astro)** | `^5.0` | Compiling and bundling | The default bundler in Astro. It is extremely fast and requires no manual configuration. |
| Styling | **Tailwind CSS** | `^3.0` | Utility-first CSS framework | Allows for rapid development and ensures styling consistency. |
| Animation | **CSS Animations** | N/A | Declarative animations | We will use standard CSS animations and transitions to create a premium feel without the need for a JavaScript library. |
| Dev Tools | **ESLint & Prettier** | Latest | Code linting & formatting | Enforces a consistent code style and helps prevent common errors. |

---

## 3. Project Structure

This structure is based on Astro conventions and best practices for a modern web project.

```plaintext
/
├── .vscode/
├── .eslintrc.json
├── .prettierrc
├── src/
│   ├── components/
│   │   └── sections/
│   │       ├── 01-hero-section.astro
│   │       ├── 02-journey-section.astro
│   │       ├── 03-client-projects-section.astro
│   │       ├── 04-agency-projects-section.astro
│   │       ├── 05-skills-section.astro
│   │       └── 06-connect-section.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── fonts/
├── astro.config.mjs
├── tsconfig.json
├── tailwind.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## 4. Component Standards

All components created for this project must adhere to the following standards.

### 4.1 Component Template

```astro
---
// src/components/sections/01-hero-section.astro

// Component logic and props can be defined here.
---
<section class="hero-section">
  <div class="hero-content">
    <h1>Hero Title</h1>
    <p>Hero subtitle</p>
  </div>
</section>

<style>
  .hero-section {
    /* Component-specific styles go here */
  }
</style>
```

### 4.2 Naming Conventions

*   **Component Files:** `PascalCase.astro`
*   **Component Variables:** `PascalCase`
*   **Non-Component Files:** `camelCase.ts`

---

## 5. State Management

A global state management library is not required for the current scope of this project.

---

## 6. API Integration

There is no requirement for runtime API integration. All content will be managed directly in the codebase.

---

## 7. Routing

As a single-page application, all routing will be handled via anchor links on the single homepage. Each `<section>` element will be given a unique `id` attribute, and the navigation links will point to these IDs (e.g., `<a href="#journey">`).

---

## 8. Styling Guidelines

We will use **Tailwind CSS** as the primary and exclusive styling methodology. All brand-specific values (colors, fonts, spacing) will be configured in the `tailwind.config.mjs` file.

### 8.1 Global Theme & Variables (`tailwind.config.mjs`)

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A202C',
        secondary: '#FFFFFF',
        accent: '#38B2AC',
        neutral: '#A0AEC0',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
```

---

## 9. Environment Configuration

We will use the standard `.env` file for local development, as recommended by Astro.

```
# .env
PUBLIC_BASE_URL="http://localhost:4321"
```

---

## 10. Frontend Developer Standards

### 10.1 Critical Coding Rules
1.  **No `any` Type:** All types must be explicitly defined.
2.  **Component Responsibility:** Keep data and business logic separate from presentation.
3.  **Accessibility is Mandatory:** Use semantic HTML and ensure keyboard navigability.
4.  **Environment Variables:** Do not commit secrets to the repository.
5.  **Follow All Linting Rules:** Code must pass ESLint and Prettier checks.

### 10.2 Quick Reference
*   **Common Commands:** `npm run dev`, `npm run build`, `npm run preview`.
*   **Key Import Patterns:** Use relative paths for imports.
*   **File Naming:** Components: `PascalCase.astro`, Other: `camelCase.ts`.
*   **Project-Specific Patterns:** Styling is with Tailwind CSS, animations are with CSS.

export default config;
```

---

## 9. Environment Configuration

We will use the standard `.env.local` file for local development, as recommended by Next.js.

```
# .env.local
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 10. Frontend Developer Standards

### 10.1 Critical Coding Rules
1.  **No `any` Type:** All types must be explicitly defined.
2.  **Component Responsibility:** Keep data and business logic separate from presentation.
3.  **Accessibility is Mandatory:** Use semantic HTML and ensure keyboard navigability.
4.  **Environment Variables:** Do not commit secrets to the repository.
5.  **Direct DOM Manipulation is Forbidden:** Always use React's state and props model.
6.  **Follow All Linting Rules:** Code must pass ESLint and Prettier checks.

### 10.2 Quick Reference
*   **Common Commands:** `npm run dev`, `npm run build`, `npm run lint`.
*   **Key Import Patterns:** Use the `@/` alias for absolute imports.
*   **File Naming:** Components: `PascalCase.tsx`, Other: `camelCase.ts`.
*   **Project-Specific Patterns:** Content is in `lib/data.ts`, styling is with Tailwind CSS, animations are with `framer-motion`.
