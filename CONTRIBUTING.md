# Contributing to COBOGÓ

Thank you for your interest in contributing to the COBOGÓ design system!

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```
The site will be available at `http://localhost:4321`.

## Tech Stack

This project uses:
- Astro 5
- `@astrojs/svelte` integration
- Svelte 5
- TypeScript

## Project Structure

- `src/components/`: Svelte 5 components.
- `src/layouts/`: Astro layouts.
- `src/pages/`: Astro pages.
- `src/styles/global.css`: Global CSS tokens.

## Pull Requests

Before submitting a PR, please make sure that:
- `npm run build` passes without errors.
- If you change any types, run `npx astro check` to verify TypeScript typings.

## Commit Convention

We use a conventional-like format. Please use short, imperative commit messages without emoji prefixes.

Branches should follow these prefixes:
- `feat/`: New features
- `fix/`: Bug fixes
- `chore/`: Maintenance, refactors, dependencies
- `docs/`: Documentation updates

## Reporting Issues

To report bugs or suggest new features, please open a GitHub Issue in the repository:
[franklinbaldo/cobogo](https://github.com/franklinbaldo/cobogo)
