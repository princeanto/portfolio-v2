# princeladislas.com — portfolio

Portfolio of Prince Ladislas, product designer working on enterprise platforms
and fintech infrastructure.

Live: https://princeladislas1.vercel.app

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- `motion` for animation

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Layout

```
app/
  page.tsx             the site
  v2.css               design system — monochrome tokens, scoped to .v2
  _components/         sections (hero, work, galleries, about, contact…)
  _lib/data.ts         all page content lives here, single source of truth
  platform-evolution/  the Connect case study, opened in a modal from /
public/assets/          images, résumé
```

Content is edited in `app/_lib/data.ts` rather than in the components.

## Notes

- Dark and light themes, remembered in `localStorage`.
- Respects `prefers-reduced-motion` throughout — animated layers don't mount.
