# LogBook

**A notebook, task list, and decision journal in one page — where nothing is ever overwritten.**

[![Live demo](https://img.shields.io/badge/demo-logbook-2ea44f)](https://mdkalenderoglu.github.io/LogBook/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-installable-5a4fcf)](#install)
[![No build step](https://img.shields.io/badge/build-none-lightgrey)](#architecture)

Every edit keeps its predecessor. You can change your mind freely without losing the reasoning that got you there — which is the part most note apps throw away.

**[Open the app →](https://mdkalenderoglu.github.io/LogBook/)** No sign-up, no install, no tracking. Your data stays on your device.

🇹🇷 [Türkçe README](README.tr.md)

---

## Why

| The problem | What LogBook does |
|---|---|
| "Why did I change this decision last month?" | Every edit preserves the previous version, timestamped and one click away |
| "I want to annotate this PDF during the meeting" | Open PDFs and images *inside* the app and draw on them with Apple Pencil or a mouse |
| "My notes are split across phone and laptop" | One-click Google sign-in; all devices converge automatically |
| "I don't want to install anything or create an account" | Open the link and start typing. Add to home screen if you want it to feel native |
| "Typing is a chore" | Dictate in Turkish, or drop a voice memo into the note |
| "Points for the next supervision meeting end up scattered" | Queue any note into a dedicated mentor list that sits beside your notes |

## Features

- **Instant capture** — type, press Enter, it's saved with a timestamp
- **Mentor & learning column** — a side panel with two areas: items to raise with a supervisor or team, and a study notebook. Both support everything a note does — text, attachments, annotation, voice, history
- **Sectioned study notebook** — a reference notebook rather than a task list: entries carry no completion state and remain where they were written. Sections nest to any depth, each with its own capture box, and the notebook also opens full width in the main area
- **Triage marks** — classify a note as red, amber, or green; the card is colour-coded accordingly and the change is recorded in the log
- **Queue for review** — add a note to the mentor list without moving or duplicating it; a second click removes it from the queue
- **Pen annotation** — draw on PDFs and images with Apple Pencil or mouse; four colors, highlighter, eraser, undo. Finger scrolls, pen draws
- **Full edit history** — nothing is deleted or overwritten; every version persists with its date
- **Turkish dictation** — speech-to-text via the Web Speech API
- **Voice notes** — recorded inline with a waveform player
- **Attachments of any type** — drag, drop, or paste; images and PDFs open in-app; reorder or remove them (removals are logged too)
- **Nested categories** — arbitrarily deep; a parent category also surfaces its children's notes
- **Deadline countdown** — live "3 hours left" counter that turns amber, then red
- **Sub-tasks** — a checkable mini-list inside any note, with progress
- **Automatic date separators** — return to a note after a long gap and the continuation is stamped, so the chronology is visible in the text itself
- **Complete activity log** — every addition, edit, and completion recorded with its date
- **Light / dark theme**
- **Google Drive sync** — stored in your Drive's hidden app folder; the app cannot see any of your other files
- **Single-file backup** — everything including audio and attachments in one JSON
- **Installable (PWA)** — home-screen icon, full screen, works offline

## Install

**Start here:** <https://mdkalenderoglu.github.io/LogBook/>

| Device | Steps |
|---|---|
| **iPhone / iPad** (Safari) | Share (□↑) → **Add to Home Screen** |
| **Android** (Chrome) | Menu (⋮) → **Install app** |
| **Windows** (Chrome/Edge) | Install icon in the address bar → Install |
| **macOS** (Safari) | File → **Add to Dock** · (Chrome: install from address bar) |

It then launches full screen with its own icon, and opens even without a connection.

> **Fully offline (ZIP):** download via **Code → Download ZIP** and double-click `LogBook.html`. Notes, attachments, and backup all work. Only Google sync requires a web origin (a Google security rule). On macOS, drag `mac/LogBook.app` to your Dock — right-click → Open on first launch.

## Where your data lives

**By default, entirely on your device.** Notes live in browser local storage; audio and files in IndexedDB. Nothing is sent to any server.

For cross-device sync, use **Sync** in the sidebar and sign in with Google. Notes are written to the `appDataFolder` of your own Google Drive — a private area invisible in the normal Drive interface, accessible only to this app. The app requests no access to the rest of your Drive. Disconnecting leaves your data intact.

**Three layers of durability:**

1. **Local** — every keystroke is persisted to the device
2. **Cloud** — synced to Drive 4s after a change, every 90s, and on every launch. On conflict, no history is lost: logs and prior versions always merge
3. **Manual** — export a single JSON with audio and attachments included, move it however you like, and restore it elsewhere without breaking that device's sync link

> ⚠️ Clearing your browser's site data also clears local notes. Keep sync on, or export a backup periodically.

## Architecture

One HTML file. No framework, no build step, no server, no telemetry. `index.html` is the entire application; `LogBook.html` is a double-clickable copy of the same file. A service worker provides the offline shell, and the PDF engine (pdf.js) is fetched once on first use, then served from cache.

```
LogBook/
├── index.html            # the application (single file)
├── LogBook.html          # identical copy, for ZIP downloads
├── manifest.webmanifest  # PWA identity
├── sw.js                 # offline cache
├── assets/               # application icons
└── mac/LogBook.app       # one-click launcher for macOS
```

## License

[MIT](LICENSE) — use, share, and modify freely.
