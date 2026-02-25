# IP Mapper

A web application that maps IP addresses to their geographic location. Enter any IPv4 or IPv6 address and instantly see the associated country (with flag) and local time.

Built with [TanStack Start](https://tanstack.com/start), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com/). Uses the [IP2Location](https://www.ip2location.io/) API for geolocation lookups.

You can check out the app for yourselves at [guyhav-ip-mapper](https://guyhav-ip-mapper.netlify.app/)

## Prerequisites

- **Node.js** >= 22
- **pnpm/npm/yarn** (package manager)
- An **IP2Location API key** — get one for free at [ip2location.io](https://www.ip2location.io/)

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Copy the example env file and fill in your API key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set your key:

   ```
   IP2LOCATION_API_KEY=your_api_key_here
   ```

3. **Start the dev server**

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| -------------- | ----------------------------------------- |
| `pnpm dev` | Start the development server on port 3000 |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run tests with Vitest |
| `pnpm lint` | Lint with oxlint |

## Tech Stack

- **Framework** — TanStack Start / React 19
- **Routing** — TanStack Router (file-based)
- **Data fetching** — TanStack React Query
- **Validation** — Zod
- **Styling** — Tailwind CSS v4
- **Testing** — Vitest + Testing Library
- **Linting** — oxlint
