# Ankieta

This project contains the AI course personalization survey prepared for deployment on Vercel using Vite 5.4.19.

## Getting started

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Build for production

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Project structure

- `src/App.tsx` — the main survey experience.
- `src/components/ui` — small reusable UI primitives used throughout the survey.
- `src/lib/utils.ts` — helper utilities such as the `cn` class name combiner.

The project uses Tailwind CSS for styling utility classes and sets up the `@` alias to point to the `src` directory.
