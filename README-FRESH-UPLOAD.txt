# Kaladan LMS — Fresh Upload Edition

This package is deliberately a **fresh-data edition**. It does not import the previous LMS browser storage and writes to a new Firestore document:

- Collection: `kaladan_jhs_lms`
- Document: `database_fresh_v1`

## Upload

Upload/replace these files in the root of the `natarthur/KaladanLMS` repository:

1. `index.html`
2. `manifest.json`
3. `service-worker.js`
4. `icon-192.png`
5. `icon-512.png`

The two icon files can be copied from your existing repository if you already have them.

## First login

Email: `admin@kaladan.local`  
Password: `admin123`

Immediately change the starter password before using the system with real school data.

## Main functions

- Fresh student records
- Teacher records: Name, Class, Subject, Email, Phone Number
- Teacher email retained for login
- Classes
- Gradebook
- CA automatically scaled to 40
- Examination automatically scaled to 60
- Automatic total /100 and grade
- Attendance
- Ready-to-access Teacher Resource Centre (no teacher uploading)
- BECE preparation area covering 2020–2026
- Local backup and restore
- Firebase/Firestore synchronisation
- PWA/service-worker support

## Firebase

The app is configured for the existing Kaladan Firebase project and uses Firestore.

Make sure Firestore is enabled and the Firestore rules permit the app to read/write the database document. For a real school deployment, authenticated Firebase rules are strongly recommended rather than permanently public read/write rules.

## Important

This package intentionally starts with a new database document so you can make fresh entries. It does not delete the old `database` document.

## Default staff loaded

- Ali Amidu — Career Technology
- Adongo Robert — Science
- Issahaku Ayisha — Social Studies
- Abdul - Samed Hamdiya — Science
- Mohammed Abubakari — Computing
- Yussif Issahaku — Dagbani
- Baba Mohammed Sadat — Social Studies
- Wali Mohammed Hizibillai — Mathematics
- Abdul - Manan Mohammed — Science
- Seidu Huzeima — Career Technology
- Umar Zulfawu Gbambiegu — R.M.E.
- Alangea Claudette — English
- Azabugu Kate Anyanbilla — Social Studies
- Alidu Tahiru Rajab — Creative Arts
- Yakubu Ismail — Computing
- Umar Abdul Jalil — Career Technology
- Abukari Ayisha — Creative Arts and Design (CAD)
- Ibrahim Fantana Hilda — R.M.E.
- Janet Nsoh — English

**Removed:** Alhassan Abukari Karim.

**Administrator:** Sulemana Ziblim — Headteacher / Administrator.

Teacher login emails are generated from each teacher's name using `@kaladan.local`, with the starter password `teacher123`. Change these credentials before real deployment.
