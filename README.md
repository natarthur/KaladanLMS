# Kaladan E.P Junior High School B — LMS (PWA)

A self-contained, installable Learning Management System. No server, no build step —
just static files, deployable for free on GitHub Pages.

## ⚠️ Important: enable cloud sync to fix "data doesn't show on another device"

By default this app stores everything in the browser's **local storage** — which is
tied to one device/browser only. That's why names you type and save on your phone
don't show up when you open the same link on a laptop: they were never shared
anywhere, just saved locally on the phone.

**The fix: connect a free Firebase project (10 minutes, no coding).** Once connected,
every device sharing this app talks to the same cloud database in real time — enter a
student on one device, it appears on every other device within a second or two, no
refresh needed.

### Setup steps

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)** and
   sign in with any Google account.
2. Click **Add project**, give it any name (e.g. "Kaladan LMS"), and finish creation
   (you can skip Google Analytics — not needed).
3. In your new project, click **Build → Firestore Database** in the left sidebar,
   then **Create database**. Choose a location close to you, and start in
   **test mode** (you can tighten security later — see the note below).
4. Click the **gear icon → Project settings**, scroll to "Your apps", and click the
   **</> (web)** icon to register a new web app. Give it any nickname and click
   **Register app** — you don't need Firebase Hosting, just the config.
5. Firebase will show you a code block that looks like this:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "kaladan-lms.firebaseapp.com",
     projectId: "kaladan-lms",
     storageBucket: "kaladan-lms.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   Copy those six values.
6. Open `index.html` in a text editor, find `FIREBASE_CONFIG` near the top of the
   `<script type="text/babel">` block, and paste your values in:
   ```js
   const FIREBASE_CONFIG = {
     apiKey: "AIza...",
     authDomain: "kaladan-lms.firebaseapp.com",
     projectId: "kaladan-lms",
     storageBucket: "kaladan-lms.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123",
   };
   ```
7. Push the updated `index.html` to your GitHub repo. Open the app — a small dot
   next to the school name on the login screen (and in the top bar once logged in)
   now shows **"Cloud sync on — shared across devices"**. You're done.

If you skip this setup, the app still works perfectly fine — it just stays
device-local, exactly as before.

### A note on security

Firestore's "test mode" (step 3) allows anyone who has your config values to read
and write your data — the config itself isn't secret (it's visible in your page's
source code, same as any client-side Firebase app), but test mode's *open rules* mean
no login is required at the database level. For a small school running this
day-to-day, that's a reasonable tradeoff given there's no built-in server to lock it
down further, but if you want to restrict it, go to **Firestore Database → Rules**
and set:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /kaladan_jhs_lms/database {
      allow read, write: if true; // anyone with the config can access
    }
  }
}
```
This confines access to exactly the one document this app uses, rather than leaving
your whole Firestore project open. Tighter protection (requiring a login) would need
Firebase Authentication wired in, which isn't currently part of this app.

### Firebase's free tier

Firestore's free "Spark" plan includes 50,000 reads and 20,000 writes per day — far
more than a single school needs for day-to-day use. No credit card is required to
stay on it.

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

## What's new in this update

- **Cross-device sync via Firebase** (see above) — the real fix for data not
  appearing on other devices.
- **Student photo is now uploadable directly from the report card view**
  (Admin → Report Cards → select a student → click the photo box), not just from
  the enrollment form.
- **Removed the email field from the student enrollment form** — students still get
  a login email behind the scenes automatically, but admins no longer need to see
  or fill it in.
- **Report cards clearly show "Not yet graded"** for any subject with no marks
  entered yet, instead of defaulting to a misleading 0 / Fail. Class Mark and Exam
  Mark are summed into a Total the moment both are entered in the Gradebook or
  Results Entry page — position, grade, and class average are all calculated from
  real entries only, never from ungraded zeros.
- School logo re-centered (was off-center within its image canvas); sidebar now
  shows your actual uploaded logo instead of a placeholder icon.

## How the offline/PWA part works

- `manifest.json` tells the browser the app's name, icons, and that it should open in
  its own standalone window (no browser address bar) when installed.
- `service-worker.js` caches the app and its libraries (React, Tailwind, Firebase,
  fonts) the first time it's opened online. After that, the app shell keeps working
  with no internet connection. Live data sync naturally still needs a connection —
  offline, you'll see the last data that synced before you lost signal, and any
  changes you make offline are saved locally and sync up automatically once you're
  back online.

## Updating the app later

Service workers aggressively cache for offline use, which means after you push a
change to GitHub, visitors who already installed the app may keep seeing the old
version until the browser notices the update. This update already bumped
`CACHE_NAME` in `service-worker.js` to `v3`, so everyone gets it immediately. Next
time you make a change yourself, bump that version string again (e.g. `v3` → `v4`)
before pushing, or visitors may not see your change for a while.

## Local testing before you push

Opening `index.html` directly by double-clicking it (a `file://` URL) will **not**
register the service worker, and Firestore sync may also be blocked by the browser.
To test locally, serve the folder over HTTP first:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in your browser.
