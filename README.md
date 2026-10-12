# Kaladan E.P Junior High School B — LMS (PWA)

A self-contained, installable Learning Management System. No server, no build step —
just static files.

## Deploy on GitHub Pages (free hosting)

1. Create a new GitHub repository (e.g. `kaladan-jhs-lms`). Public repos get free Pages
   hosting; private repos need GitHub Pro/Team/Enterprise for Pages.
2. Upload **all the files in this folder** to the repository root:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png`
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", pick the
   `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will give you a URL shortly after, typically:
   `https://<your-username>.github.io/<repo-name>/`
6. Open that link — the LMS loads, and on a phone you can "Add to Home Screen" /
   "Install app" to use it like a native app icon.

## How the offline/PWA part works

- `manifest.json` tells the browser the app's name, icons, and that it should open in
  its own standalone window (no browser address bar) when installed.
- `service-worker.js` caches the app and its libraries (React, Tailwind, fonts) the
  first time it's opened online. After that, it keeps working with no internet
  connection, and silently refreshes the cache whenever you're back online.
- All your data (students, scores, attendance, reports) is stored in the browser's
  local storage on each device — there's no shared backend. Two different
  devices/browsers will have separate data unless you manually keep them in sync
  (e.g. via the CSV import feature for students).

## Updating the app later

Service workers aggressively cache for offline use, which means after you push a
change to GitHub, visitors who already installed the app may keep seeing the old
version until the browser notices the update (usually within a day, or immediately
on a hard refresh). If you push a change and want it to show up immediately:
bump `CACHE_NAME` at the top of `service-worker.js` (e.g. `v1` → `v2`) before
pushing — that forces every visitor's browser to fetch the new version right away.

## Local testing before you push

Opening `index.html` directly by double-clicking it (a `file://` URL) will **not**
register the service worker — browsers block that for security. To test the full
offline/install behavior locally, serve the folder over HTTP first, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in your browser.
