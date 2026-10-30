# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## Project

eKazi frontend v2 is a Tanzanian jobs platform (https://www.ekazi.co.tz). It is a React 19 + TypeScript + Vite SPA with two halves:
- **Public website**: home, jobs, employers, articles, pricing, CV builder, salary calculator, and request-demo pages.
- **Authenticated job-seeker app** under `/app/*`: dashboard, profile, jobs, saved and matched jobs, applications, cover letter.

The backend is a separate REST API (`VITE_API_URL`).

## Commands

```bash
npm run dev       # Vite dev server on port 3000 (strictPort)
npm run build     # tsc -b && vite build  (type errors fail the build)
npm run lint      # eslint .  (note: no eslint config file is currently checked in)
npm run preview
```

There is no test runner installed. The `*.test.ts` files under `src/pages/shared/` are written for Vitest, but Vitest is not a dependency, so they don't run.

`tsconfig.app.json` sets `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` and `erasableSyntaxOnly`. Use `import type` for type-only imports, and don't use `enum` or parameter properties.

## Environment

`.env` is gitignored. It defines `VITE_FRONTEND_URL`, `VITE_BASE_URL`, `VITE_API_URL` and `VITE_CV_API_URL`, which are read in [src/config/index.ts](src/config/index.ts). That file also hardcodes `IMG_BASE` (`https://api.ekazi.co.tz/`) for uploaded images and `DEFAULT_IMG`.

## Architecture

Data flows through layers. When you add a feature, follow every layer:

1. **`src/lib/axios.ts`**: a shared axios instance (`api`). A request interceptor adds `Authorization: Bearer <localStorage.token>`.
2. **`src/services/*.service.ts`**: plain async functions, one file per domain (jobs, auth, profile, employers, articles, candidates, applications, dashboard, calculator, contact, statistics, universals). They call `api` and return `res.data`, or `res.data?.data` for single resources.
3. **`src/hooks/<domain>/use*.ts`**: TanStack Query wrappers, one hook per file, re-exported from the folder's `index.ts`. Import them as `@/hooks/jobs`, etc.
   - Queries use array keys such as `["jobs", page, limit, search, industry]`.
   - Mutations call `queryClient.invalidateQueries` on related keys in `onSuccess`. For example, every profile-section mutation invalidates `["applicant-profile"]`.
   - The QueryClient in [src/App.tsx](src/App.tsx) sets a default `staleTime` of 5 min.
4. **`src/@types/*.ts`**: payload and response types per domain. Many are loose or `any`.
5. **`src/pages/**`**: UI, which calls the hooks and handles toasts.

`src/hooks/universals/` holds lookup-data hooks (countries, regions, industries, positions, colleges, and so on) that feed form selects.

### Routing and auth

- All routes are declared in [src/App.tsx](src/App.tsx) using react-router-dom v7.
- `/app/*` routes are wrapped in `ProtectedRoutes` and then `AppLayout`, which contains the sidebar.
- [ProtectedRoutes](src/layouts/ProtectedRoutes.tsx) checks `localStorage.token` and `localStorage.verified === "true"`. If either check fails, it hard-redirects with `window.location.replace(FRONTEND_URL...)`.
- Login and verify forms write `token`, `verified` and `role_id` to localStorage. `useUser()` fetches `/auth/user` under the `["user"]` query key.
- Public pages wrap their content in `HomeLayout` (Navbar + Footer).
- When you add a public static route, also add it to `staticRoutes` in [vite.config.ts](vite.config.ts) so it appears in the sitemap.

### Pages layout

- `src/pages/website/`: public pages. Shared sections such as Navbar, Footer, Hero and modals live in `website/components/`.
- `src/pages/app/`: authenticated pages. Profile sections live in `app/profile/components/<section>/` and follow a consistent pattern: `<Section>.tsx` (display), `Add*/Create*`, `Edit*/Update*`, `Delete*` dialogs, and a shared `*Form.tsx`.
- `src/pages/auth/`: login, register, verify, forgot/reset password.
- `src/pages/shared/`: features used in more than one place.
  - `salary-calculator/` is the active salary calculator. It has pure logic in `lib/salary/` (Tanzanian PAYE/SSC/SDL/WCF) and its own README.
  - `candidates/` holds the candidate profile view.
  - `calculator/` (including a `.zip`) is an older copy that nothing imports.

## UI conventions

- **shadcn/ui on Base UI**, not Radix (`components.json` style `base-vega`). Components live in `src/components/ui/`. Compose triggers with the `render` prop (`<DialogTrigger render={<Button/>} />`), not `asChild`, which is never used here. Add new primitives with `npx shadcn@latest add <name>`.
- **Tailwind v4**: config lives in CSS in [src/index.css](src/index.css) via `@theme inline`, so there is no `tailwind.config`. Brand colors are `Blue` (#1756a5), `Orange` (#d36415), `Primary-500` and `Primary-600` (used as `bg-Blue`, `text-Orange`). The font is Sen Variable. Dark mode uses the `.dark` class through `next-themes`.
- `cn` comes from `@/lib/utils`, which re-exports the `cn` npm package.
- Icons come mostly from `lucide-react`, with some `@tabler/icons-react` and `react-icons`.
- Forms use `react-hook-form`.
- Use `toast.success` / `toast.error` from `sonner` for notifications. Wrap errors with `getErrorMessage(error)` from [src/utils/axios-helpers.ts](src/utils/axios-helpers.ts).
- Use `react-helmet-async` for page `<title>` and meta (SEO).
- Path alias: `@/` → `src/`.
- Style: double quotes, semicolons, arrow-function components with a default export.
