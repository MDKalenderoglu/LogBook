# Changelog

All notable changes to LogBook are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] — 2026-07-20

### Added

- **Category management** — rename a category, change its color from an eight-swatch palette, or delete it. Deleting a category never deletes notes: they move to another category and the move is logged, while sub-categories are promoted one level up
- **Subheading button** in the editor, replacing the undiscoverable `##` shortcut. It marks or unmarks the line at the cursor
- **Clear everything** — a two-step reset for wiping test data, guarded by a detailed confirmation and a typed keyword. When sync is on, it asks separately whether to wipe the Drive copy; declining leaves Drive untouched so the data can be recovered by reconnecting

### Changed

- Quick-add now fills the note **title** instead of the body, so the first thing typed becomes the heading and details can be added underneath
- Editor hint text moved to the bottom of the editor and no longer mentions `##`
- Subheadings now render without a space after `##`

## [1.0.0] — 2026-07-20

First public release.

### Added

- **Notes and tasks** — instant capture with timestamps, deadline countdowns, nested sub-tasks with progress
- **Full edit history** — every version of a note is preserved rather than overwritten
- **Automatic date separators** — continuations after a long gap are stamped inline
- **Pen annotation** — draw on PDFs and images with Apple Pencil or mouse: four colors, highlighter, eraser, undo; finger scrolls while pen draws
- **PDF rendering** via pdf.js, with a persistent close bar for long documents
- **Turkish dictation** — speech-to-text through the Web Speech API
- **Voice notes** — inline recording with a waveform player
- **Attachments** — drag, drop, or paste any file type; reorder and remove, with removals recorded in the log
- **Nested categories** — arbitrary depth, with parent categories surfacing child notes
- **Google Drive sync** — stored in the private `appDataFolder`; conflict resolution merges logs and prior versions so no history is lost
- **Single-file backup** — export and restore everything, audio and attachments included, without breaking the device's sync link
- **PWA support** — installable on iOS, Android, Windows, and macOS; works offline
- **Light and dark themes**
- **macOS launcher** — `mac/LogBook.app` for one-click local use

### Changed

- Sync moved from a Supabase key-based model to Google Drive OAuth
- PDF preview switched from `<iframe>` to pdf.js for consistent cross-browser rendering

[1.0.0]: https://github.com/MDKalenderoglu/LogBook/releases/tag/v1.0.0
