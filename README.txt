KALADAN LMS — FIREBASE REALTIME DATABASE RECONNECTION

Replace index.html and service-worker.js in the root of https://github.com/natarthur/KaladanLMS. Edit each file, replace its full contents with the matching supplied file, and commit. Wait for GitHub Pages to publish. Close and reopen the PWA/browser on each device; if the old app remains, clear this site's cached data/service worker.

This version connects to Firebase project kaladan-lms, database URL https://kaladan-lms-default-rtdb.firebaseio.com, and existing node kaladan_jhs_lms/database. It reads/writes the existing payload JSON string and updatedAt field, with a local browser copy for offline fallback. It does not intentionally rename or recreate the database node.

Before testing, export/back up the existing node. Never clear it for troubleshooting. Your current rules allow public read/write; that is unsafe for student records. This code does not add Firebase Authentication. Add authentication and restrictive rules before real school use. Because the app stores all school data in one JSON payload, simultaneous saves from multiple users can overwrite recent changes; test carefully and keep backups.

Test with two devices: confirm the app's sync badge says Connected, make one harmless test change on one device, verify it appears on the other, then remove the test record.
