# Repository guide

## Stack

React + Vite, Tailwind CSS, TypeScript, Shadcn UI Components.

## UI components, styling, and themes

- Use shadcn/ui for all UI controls and patterns. Reuse installed components
  from `src/components/ui/`. If one is missing, use the official shadcn/ui
  implementation that matches the project's `base-vega` configuration.
- Use built-in props such as `variant` and `size`. Do not pass `className`
  or `style` to shadcn/ui components or their parts, including `CardContent`
  and `DialogContent`. Do not use CSS selectors, wrapper selectors, or edits
  to component source, theme tokens, or global CSS to override their styling.
- Use semantic HTML for page structure. Tailwind utilities on plain HTML
  may handle layout and spacing. Let colors inherit by default. When an
  explicit color is needed, use existing semantic theme utilities such as
  `bg-background`, `text-foreground`, `text-muted-foreground`, and
  `border-border`.
- Avoid fixed colors for theme-dependent backgrounds, text, and borders.
  Use the existing theme tokens wherever they already cover both modes.
- Check changed UI in light and dark mode, including any affected dialogs,
  menus, and form states. Report which checks you ran.

## Project and structure

eKazi is a Tanzanian jobs platform built as a React 19, TypeScript, Vite 8 SPA. The backend is a separate REST API. The README is largely Vite template documentation; use the current source and configuration for project details.

- `src/main.tsx`: React entry point, theme and Helmet providers. `src/App.tsx`: routes, TanStack Query client (five-minute default stale time), tooltips and toasts.
- `src/pages/website/`: public jobs, employers, articles, pricing, CV builder and salary calculator. `src/pages/auth/`: authentication screens. `src/pages/app/`: authenticated job-seeker features. `src/pages/shared/candidates/`: reusable candidate profile views.
- `src/layouts/`: public `HomeLayout`, authenticated `AppLayout` and `ProtectedRoutes`.
- `src/services/*.service.ts`: API calls by domain. `src/hooks/<domain>/`: query/mutation hooks and barrel exports. `src/@types/`: shared payload and response types.
- `src/components/ui/`: reusable shadcn/Base UI primitives; other shared components live in `src/components/`. `src/context/`: CV template state.
- `src/lib/`: Axios clients and shared utilities; `src/utils/`: error, file, image and other helpers. `src/config/index.ts`: environment-backed URLs.
- `src/index.css`: Tailwind v4 theme and global styles. `public/assets/`: static assets. `postman/` and `.postman/`: API workspace files. `dist/` is ignored build output.

## Coding conventions

- Match nearby files: two-space indentation, double quotes and semicolons predominate. Pages generally use PascalCase filenames and default-exported arrow components; hooks use `useX` names and named exports.
- Use `@/` for imports from `src/`; the alias is configured in Vite and TypeScript. Use `import type` for types under `verbatimModuleSyntax`.
- TypeScript enables unused-local/parameter and switch-fallthrough checks. `erasableSyntaxOnly` excludes enums and constructor parameter properties.
- Reuse `src/components/ui/` and its variants. `components.json` uses shadcn `base-vega`; follow existing Base UI `render` trigger composition, as in `CreateTraining.tsx`.
- Use Tailwind utilities and existing theme tokens (`bg-Blue`, `text-Orange`, semantic colors). Theme configuration is in CSS, with Sen Variable and class-based dark mode.
- Use `bg-Blue` and `text-Orange` on plain HTML where the existing design calls for eKazi branding. Use semantic theme utilities for general backgrounds, text, and borders. Check the contrast of branded elements in both light and dark mode.

## Patterns to reuse

- Follow service → domain hook → page/component. See `jobs.service.ts`, `hooks/jobs/useJobs.ts` and `pages/website/jobs/JobsPage.tsx`. Include query parameters in array query keys and export hooks through the domain's `index.ts`.
- Invalidate affected queries after mutations; profile-section mutations invalidate `["applicant-profile"]`. Reuse lookup hooks from `hooks/universals/` for form selects.
- Use the appropriate existing Axios client: `lib/axios.ts` for the main API, `axios-old.ts` for the old API and `axios-cv.ts` for CV requests. The main client adds the bearer token from localStorage.
- Profile sections separate display, create/update/delete dialogs and shared forms. Follow `profile/components/trainings/`: React Hook Form, `FormData` for attachments, Sonner toasts and `getErrorMessage` from `utils/axios-helpers.ts`.
- Add routes in `App.tsx`. Authenticated routes nest beneath `ProtectedRoutes` and `AppLayout`; the guard checks localStorage `token` and `verified` and fetches the user. Public pages use `HomeLayout`. Review `vite.config.ts`'s `staticRoutes` when changing public routes.
- Reuse `pages/website/salary_calculator/components/SalaryCalculator` for both public and authenticated calculators. CV templates and preview/download helpers live under `pages/app/cv_builder/`.
- URL configuration reads `VITE_FRONTEND_URL`, `VITE_BASE_URL`, `VITE_API_URL`, `VITE_OLD_API_URL` and `VITE_CV_API_URL`. Keep local values in the ignored `.env`.

## Commands and validation

Run from the project root; npm scripts below are verified against `package.json` and `npm run`. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

| Command           | Purpose / current status                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`     | Runs `vite`; configured for port **3000**, with `strictPort: true`.                           |
| `npm run build`   | Runs `tsc -b && vite build`; TypeScript must pass before bundling to `dist/`.                 |
| `npm run preview` | Runs `vite preview` to serve an existing production build.                                    |
| `npm run lint`    | Runs `eslint .`; verified to fail because no `eslint.config.js`, `.mjs` or `.cjs` is present. |

There is no test script, test runner dependency or test suite in the current repository. Do not assume `npm test` works. For code changes, use the build for type/bundle validation and manually exercise affected routes, loading/error states and authenticated flows. Build and servers were not run while preparing this guide.

## Git

- Commit only when the user asks.
- Never force-push.
- Do not add AI co-author or attribution lines to commits or pull requests.
