# Serena AI

> Your 24/7 mental health companion — talk freely, feel better.

## What is Serena?

Serena is an AI companion specialized for mental wellness. Unlike generic chatbots, Serena is built to listen without judgment — whether you're dealing with anxiety, relationship struggles, or just need someone to talk to at 2am. No appointments. No stigma. Just a safe space.

## Features

- **Talk freely** — no filters, no fear of judgment
- **Always private** — your conversations stay yours, always
- **Available 24/7** — anxiety doesn't wait for office hours
- **Purpose-built** — specialized for mental health, not a generic AI

## Tech Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS v4 · shadcn/ui

## Getting Started

```bash
git clone <repo-url>
cd serena-ai
npm install
npm run dev        # → http://localhost:5173
```

## Project Structure

```
src/
  components/
    landing/       # Landing page sections (Hero, Features, CTA, etc.)
    ui/            # shadcn/ui primitives (Button)
  hooks/           # Shared React hooks (useScrollReveal)
  lib/             # Utilities (cn)
  pages/           # Route pages (Landing, Login, Register, Chat)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |
