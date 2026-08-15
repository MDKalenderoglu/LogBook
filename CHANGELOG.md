# Changelog

All notable changes to LogBook are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] — 2026-08-15

### Added

- **Text formatting in notes** — bold, italic, underline, strikethrough, and highlight from a toolbar above the editor, with ⌘/Ctrl+B, I, U shortcuts. A＋ / A－ step the current line through three heading sizes, and two more controls turn the selected lines into bullets or a quote (numbered lines typed as `1.` are rendered as a list too). Formatting is stored as plain-text marks (`**bold**`, `*italic*`, `__underline__`, `~~strike~~`, `==highlight==`), so search, revision history, backup, and sync keep working unchanged and no HTML is ever stored
- **Formatted preview** — an eye control renders the note as it will look, live under the editor. The setting is remembered per device
- **Note font** — system, serif, or monospace for note text, applied everywhere the note body is shown
- **Urgent triage feeds the Acil list** — a note marked red now also appears under the *Acil* category regardless of its own category, with the count updated to match. The note is not moved: its category is untouched, and clearing the mark removes it from the list again

### Fixed

- Sub-task activity was missing from the global log. Adding, completing, and reopening a sub-task are now recorded there as well as in the note's own history
- Removing a deadline was recorded only in the note's history, and attachment reordering was not recorded anywhere. Both now appear in the global log, and deadline entries state whether the date was added, changed (with the previous value), or removed
- Repeated actions of the same kind within twenty seconds — nudging an attachment up or down several times — are collapsed into a single log entry instead of accumulating

## [1.2.0] — 2026-07-25

### Added

- **Mentor & learning column** — a third column beside the notes, holding two areas: items to raise with a supervisor or team, and a study notebook. Entries there are ordinary notes, so writing, attachments, pen annotation, voice recording, revision history, and the activity log behave exactly as in the main list
- **Triage marks** — every note can be classified red, amber, or green (or left unmarked), shown as a chip and a coloured edge on the card. Changes are recorded in the log, and the side column orders entries by urgency
- **Queue for review** — a single control adds a note to the mentor list as a reference. The note itself remains in place and is never copied or moved; selecting the control again removes it from the queue
- **Sectioned study notebook** — the learning area is a reference notebook rather than a task list: entries carry no completion state and remain where they were written. Sections nest to any depth, each with its own capture box, and entries can be reassigned between them. Deleting a section moves its entries to the parent rather than removing them
- **Per-device panel state** — the column can be hidden on desktop and opens as an overlay on phones and tablets, with a pending-item count on the toolbar control
- **Full-width notebook view** — the study notebook also opens in the main area from the sidebar (or the ⤢ control in the panel), giving long entries the full column width. On phones this replaces the narrow overlay entirely. While it is open, the side column defers to it so no entry is rendered twice

### Changed

- Interface wording in the side column moved to a more formal register: *Mentöre Söyleyeceklerim* → *Danışmana İletilecekler*, *Öğrendiklerim* → *Çalışma Defteri*, with matching log entries and empty states

### Fixed

- On tablet widths (761–1100px) the sliding panel had no dimmed backdrop and could not be dismissed by tapping outside it
- Hover-only controls — section ＋/⋯ and category ＋/⋯ — were unreachable on touch devices, where no hover exists. They are now shown persistently there, with larger tap targets
- The top bar could overflow in narrow windows; the view title now truncates and the search field shrinks instead

## [1.1.0] — 2026-07-20

### Added

- **Category management** — rename a category, change its color from an eight-swatch palette, or delete it. Deleting a category never deletes notes: they move to another category and the move is logged, while sub-categories are promoted one level up
- **Subheading button** in the editor, replacing the undiscoverable `##` shortcut. It marks or unmarks the line at the cursor
- **Clear everything** — a two-step reset for wiping test data, guarded by a detailed confirmation and a typed keyword. When sync is on, it asks separately whether to wipe the Drive copy; declining leaves Drive untouched so the data can be recovered by reconnecting

- **Collapsible sidebar** — collapse it to a 64px icon rail and back; categories keep their identity as colored initial badges. The preference is stored per device and the rail is disabled on mobile, where the sidebar already slides away

### Changed

- Quick-add now fills the note **title** instead of the body, so the first thing typed becomes the heading and details can be added underneath
- Editor hint text moved to the bottom of the editor and no longer mentions `##`
- Subheadings now render without a space after `##`
- Sidebar footer laid out as a grid so the buttons no longer overflow; **Clear everything** spans the full width in red

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
