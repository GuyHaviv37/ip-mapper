# IP Mapper — Kanban Board

> Track progress across all workstreams. Move items between columns as work progresses.

---

## 🔲 Backlog

### UI
- [ ] Header layout with input creator
- [ ] IP input component
  - [ ] Loading state
  - [ ] Error state
  - [ ] Disabled state
- [ ] Local validation before searching (IP format, empty string)
- [ ] `onBlur` → emit search
- [ ] (optional) delete IP address

### Async State
- [ ] React Query integration with query key: `[ip, <input-value>]` (shared cache)

### APIs
- [ ] `ip2location.io` — fetch `country_code` + `timezone`
- [ ] `Intl.DateTimeFormat` — format local time from timezone
- [ ] `flagpedia.net` — flag icon by ISO 3166 country code

### Styling
- [ ] Responsive layout
- [ ] Polish: transitions, hover states, focus rings
- [ ] HTML Metadata (favicon)

### Testing
- [ ] Unit tests — validation logic, formatting helpers
- [ ] Component tests — input states, query integration
- [ ] E2E smoke test (optional)

### CI/CD
- [ ] Lefthook — pre-commit hooks (lint, tsc, test)
- [ ] Linting setup (ESLint / Biome)
- [ ] `tsc --noEmit` in CI
- [ ] Test runner in CI

### Persistent State (optional)
- [ ] Cache previous results in `localStorage` (per-user)
- [ ] Evaluate: cache-age headers vs online DB for shared IPs

### Hosting (optional)
- [ ] Netlify deployment (config exists: `netlify.toml`)
- [ ] Preview deploys on PRs

---

## 🔨 In Progress

_Nothing yet — pick an item from Backlog and move it here._

---

## ✅ Done

- [x] Project scaffold (Vite + React + TanStack Router/Query + Tailwind)
- [x] Vitest configured
- [x] Netlify config (`netlify.toml`)

---

## 🗒️ Notes

**API response shape (ip2location.io):**
```json
{
  "country_code": "IL",
  "timezone": "Asia/Jerusalem"
}
```

**Time formatting (Intl API):**
```js
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jerusalem",
  timeStyle: "short",
  dateStyle: "medium",
});
formatter.format(new Date());
```

**Flag icons:**
`https://flagcdn.com/w80/{code}.png` (lowercase ISO 3166-1 alpha-2)
