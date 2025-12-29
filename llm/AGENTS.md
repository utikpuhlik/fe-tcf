# Repository Guidelines

## General
- read https://ui.shadcn.com/llms.txt
- read https://www.better-auth.com/llms.txt
- instruction are stored in `llm/` folder
- documentation for external backend is placed here: https://api-dev.eucalytics.uk/tcf/docs/openapi.json
- always run `biome check --write` after making changes (permission don't needed)

## Project Structure & Module Organization
- Next.js App Router lives in `src/app` (routes, layouts, server actions).
- Reusable UI lives in `src/components` using the `@/*` alias.
- Shared helpers/config go in `src/lib`; proxy/instrumentation sit in `src/proxy.ts` and `src/instrumentation*.ts`.
- Data layer sits in `src/db` (Drizzle schemas/migrations; `drizzle.config.ts` drives the CLI).
- Email templates live in `src/emails` (React Email); static assets are in `public`.
- Environment typing is in `src/env.ts`; update `.env.local` when adding new integrations.

## Build, Test, and Development Commands
- `pnpm dev` — run the app locally with Turbopack.
- `pnpm build` — create a production build; catches server/client boundary issues.
- `pnpm start` — serve the built app.
- `pnpm lint` — Biome lint + auto-fix; run before committing.
- `pnpm format` — Biome formatter for TS/TSX and styles.
- `pnpm email` — start React Email preview for templates under `src/emails`.

## Coding Style & Naming Conventions
- TypeScript-first, ES modules; keep `strict` on.
- Filenames with `.ts` is using a camelCase (`getHeader.ts`), UI `.tsx` is using kebab-case
- Prefer feature folders under `src/app` with route-friendly kebab-case directories; colocate styles/assets where used.
- Use the `@/*` alias for imports within `src`.
- Tailwind CSS is available; keep class lists readable and use helpers (`clsx`, `tailwind-merge`) for variants.
- Let Biome handle spacing/quotes; avoid hand-formatting.
- Check `readme.md` for more info

## Testing Guidelines
- No automated suite yet; add targeted `*.test.ts`/`*.spec.tsx` alongside code when fixing bugs or adding features.
- Favor integration tests around server actions/routes and critical UI flows; include manual verification steps in PRs until coverage improves.

## Commit & Pull Request Guidelines
- Follow the conventional style seen in history (`feat(auth): ...`, `fix(header): ...`); scope to the touched area.
- Keep commits focused and runnable; include lint/format results.
- PRs should state intent, summarize changes, list verification steps (commands run, browsers checked), and attach screenshots for UI updates.
- Link related issues/epics and call out config/env changes or new migrations.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and keep `src/env.ts` in sync.
- Sentry is configured (`sentry.*.config.ts`); confirm DSN and environment names before enabling in new environments.
- For DB changes, update Drizzle schema/migrations together and document required ops in the PR.
