# Changelog

All notable changes to LogBook are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.1] — 2026-10-23

### Security

- **HTML sanitiser rewritten.** Incoming HTML (pasted text, restored backups, synced data) was parsed inside the live page, so an `<img onerror>` payload ran *before* sanitising; and children of a removed tag were moved up without being checked again, so nested tags could smuggle `javascript:` links and `onclick` handlers past two passes. HTML is now parsed in an inert `<template>` (nothing loads or runs) and the clean result is rebuilt from scratch with a strict allow-list; SVG and MathML are dropped. Plain-text extraction uses the same inert parsing. Existing formatting is preserved exactly
- **PDF engine hardened against CVE-2024-4367.** pdf.js 3.11.174 could execute code embedded in a crafted PDF's font data. Every PDF is now opened with `isEvalSupported: false`, the mitigation recommended by the pdf.js project
- **Imported and synced data is validated.** IDs, deadlines, colours, triage marks and attachment types were written into HTML attributes unchecked, so a crafted backup file (or tampered sync data) could inject markup — or crash the app. Backups, Drive data and stored data now pass a validator before use; valid data is left byte-for-byte unchanged and nothing is ever dropped. Restoring a backup only accepts embedded `data:` attachments and no longer fetches arbitrary addresses listed in the file
- **Content Security Policy.** A policy delivered via `<meta>` (GitHub Pages cannot send headers) allows only the app's own code — pinned by its SHA-256 hash — plus Google sign-in and the pdf.js CDN; inline handlers, `javascript:` links, `eval`, plugins and connections to any other host are blocked. `tools/csp-hash.py` updates the hash whenever the code changes
- **Google Calendar sends only title and date by default.** Note content and open sub-tasks are added to events only when the new option in the sync window is ticked

### Added

- `tests/guvenlik.html` — an in-browser security regression suite (19 tests: sanitiser bypasses, parse-time execution, 21 known payloads, paste, malicious backups, Drive data, data integrity, PDF, CSP, Calendar). It opens the app in an isolated test mode (`?guvenlik-testi`: separate storage, no sync, no service worker), so real notes are never touched. Before the fixes 15 of the tests failed; all 19 pass now

## [1.6.0] — 2026-10-23

### Added

- **Folders, independent of categories.** Notes can be filed into folders that have nothing to do with the sidebar categories: a note in *Genel* can sit in any folder, or in none. Folders are created, renamed and deleted from the main area; deleting a folder never deletes notes — they simply become unfiled. Every note card carries a 📁 badge to choose or change its folder (or create a new one on the spot). All moves, renames and deletions are recorded in each note's history and the log, and folders travel with backups and Drive sync; a renamed or deleted folder propagates to other devices instead of being restored by an older copy
- **Column view (Finder-style).** A third layout next to list and grid — chosen from the view button in the top bar — shows folders on the left, the selected folder's notes in the middle and the opened note with its full editor on the right, so the whole structure stays in view while writing. Quick capture files the new note into the selected folder. In a category view, the columns group only that category's notes; *Completed* keeps the plain list. The columns fill the window and scroll on their own, like a Finder window
- **Drag and drop, multi-select.** Notes are dragged from the middle column onto a folder. ⌘/Ctrl-click adds a note to the selection and Shift-click selects a range; dragging any selected note moves the whole selection, or *Move to folder…* does it from a menu. On touch screens, pressing and holding a note (or the *Select* button) starts selection mode with checkboxes, and the move action appears above the list
- **On phones** the column view works like the Files app: folders → notes → note, with a back button at each level

## [1.5.2] — 2026-10-16

### Fixed

- **Text typed into the calendar no longer disappears.** Every sync redrew the note list, and the calendar's *add a note to this day* box lives inside it — so a half-typed entry was wiped each time a sync finished (every 90 seconds and a few seconds after any change), and again shortly after starting over. Sync now leaves the list alone while you are typing in it and redraws once you leave the field; any other redraw keeps the unfinished text, the cursor position and the focus. The same applied to the notebook's per-section capture boxes, which are fixed as well

## [1.5.1] — 2026-10-16

### Added

- **Mini calendar in the sidebar.** A compact month calendar under the main sections, with ◀ ● ▶ to move between months. A dot under a day marks notes due that day — blue for pending, red for overdue, grey when everything is done — and hovering shows the counts. Selecting a day opens it in the calendar view, ready to add a task or note for that day; on phones the drawer closes and the keyboard is not forced open

## [1.5.0] — 2026-10-16

### Added

- **Calendar.** A *Takvim* view shows every note with a deadline on its day — month or week, starting on Monday, with completed notes faded. Selecting a day lists its notes underneath, fully editable, together with a capture box that adds a new note due that day (all day). On the current day, overdue notes are listed as well. The sidebar shows how many notes are due today or overdue. On phones the month view collapses to coloured dots and the week view to a day-by-day list
- **Google Calendar export.** From the sync window, notes with a deadline can be sent to Google Calendar as all-day events in a dedicated “LogBook” calendar, coloured by triage. The permission requested covers only calendars the app creates — personal calendars are neither read nor modified. Changing a deadline, title or triage updates the event; completing a note or removing its deadline removes it. Event IDs are derived from note IDs, so several devices update the same event rather than creating copies. Export runs with every sync and does not depend on the Drive side succeeding. Turning it off can optionally delete the LogBook calendar
- **Drive usage beside sync.** Below the sync status, the sidebar shows how much space LogBook itself occupies in Drive and how full the Google account is overall (shared with Gmail and Photos), with details on hover; the sync window shows both figures too
- **Sub-tasks on collapsed cards.** In list view, a note's open sub-tasks (up to four, then “+N more”) are shown on the card without opening it, and can be ticked from there. Grid tiles and the side column keep the compact counter

### Changed

- **Sub-tasks can be edited and deleted.** Tap a sub-task's text in the editor to change it (Enter saves, Esc cancels); ✕ deletes it after confirmation. Both are recorded in the note's history and the log with the previous wording, so nothing changes without a trace

### Fixed

- **Grid tiles no longer cut off the title.** When a note had a title, an excerpt, an image and several badges, the tile squeezed the title and the badge row to make room, clipping the title in half and leaving the badges half-hidden behind the image. The title and badges now keep their full height, the excerpt gives way first, the image moves to a small thumbnail in the top-right corner, and a badge row that does not fit is dropped whole from the bottom (counters first) rather than shown in slivers. The empty triage badge shows only its icon in the grid, leaving room for the deadline

## [1.4.2] — 2026-09-22

### Added

- **Sync diagnostics.** A *Find the problem* button in the sync window checks the session, the permissions actually granted, the Drive account and its free space, reading the app folder, and writing both a small and a 5 MB file — each step reported with the exact reason it failed. The window also shows which version of the app is running

### Fixed

- **A missing Drive permission is now caught at sign-in.** Google grants permissions individually: if the Drive box is left unticked, a token is still issued but every Drive request is refused, and the app kept reusing that token indefinitely. The permission is now verified when signing in, a request refused for insufficient scope discards the token, and the next sign-in asks for consent again

## [1.4.1] — 2026-09-22

### Fixed

- **Sync no longer stops at a single attachment.** A failure while transferring one file used to abort the whole run *before* the notes themselves were written to Drive, so a rejected image could keep everything else from syncing. The notes are now uploaded first and each attachment is transferred on its own: one that fails is reported by name while the rest go through, and it is retried on the next run
- **Files larger than 5 MB are uploaded correctly.** Drive's single-request upload is limited to 5 MB, which quietly broke larger PDFs and images; anything above 4 MB now goes through a resumable upload session
- **Drive errors say what is actually wrong.** A refused request used to read only "Drive error (403)" — the same text for a full Drive, a rate limit and a permission problem. The reason is now translated and shown ("Your Google Drive is full", "Drive rate limit — it will be retried"), with the status code kept for reference
- **Rate limits and dropped connections resolve themselves.** Temporary failures (rate limits, server errors, a lost connection) are retried automatically with an increasing delay instead of surfacing as an error

### Added

- The sync window shows how much of your Drive is in use, and warns before it is full

## [1.4.0] — 2026-09-20

### Changed

- **Calmer panels.** Cards in the side column no longer repeat the section they are already filed under, and their badges shrink to icons; category rows in the sidebar carry a single ⋯ menu (which now also adds a sub-category) instead of two icons; empty-state texts are one line; *Clear everything* is a quiet link rather than a red block. Grid tiles are a uniform height with a two-line title, a faded three-line excerpt and at most two rows of badges, so the grid reads as a grid rather than a ragged stack

### Added

- **Sort and filter** — a slim bar above the list sorts by last edited, newest, deadline, triage priority or title, and filters by triage colour, mentor queue, attachments, deadline or sub-tasks. Active filters appear as removable chips next to a live count of matching notes; the sort choice is remembered per device
- **Grid view** — a control in the top bar switches the note list between the usual vertical list and a Drive-style grid of tiles, so far more notes fit on one screen (a phone shows 14 instead of 6; a desktop column shows 14 instead of 8). Columns fill the available width automatically, an opened note expands to the full width of the row, and on phones the badge labels collapse to their icons to keep tiles compact. The choice is remembered per device and the control hides itself in the log and notebook views, where a grid makes no sense

## [1.3.2] — 2026-09-19

### Fixed

- **Opening a note from the side column now takes you there.** On phones and tablets the column stayed open over the list, so tapping an entry looked like nothing happened; the note only appeared — half-scrolled — after the column was closed by hand. The column now closes itself, the note opens, and its card is brought to the top of the screen and briefly highlighted. On wide screens the column stays open, since the list is visible beside it
- **Pinch zoom no longer tears the layout apart.** A pinned app shell and browser zoom are fundamentally at odds on iOS: fixed layers stay anchored to the layout viewport while the visible area moves, which is what made panels and cards overlap. Browser zoom is therefore disabled in the installed app and replaced by a proper text-size control (A－ / A＋ in the sidebar, 85–175%), which scales note text, the editor and the notebook without disturbing the layout. The setting travels with your notes

### Changed

- **The note list is now updated incrementally.** Previously every interaction rebuilt the entire list — hundreds of nodes destroyed and re-created, with several hundred event handlers re-attached each time. Cards are now generated only when the note they show has actually changed (a 120-note list re-draws in ~1 ms instead of ~37 ms), only the changed card is replaced in the page, and all card actions run through a single delegated listener

## [1.3.1] — 2026-09-13

### Fixed

- **The view no longer jumps when you interact with a note.** Tapping triage, the mentor flag or the category used to bump the note's timestamp, which re-sorted the list under your finger; the order is now frozen while a view is open (new notes still enter at the top) and returns to natural sorting when you switch views. Re-draws keep their place by anchoring on the first visible card instead of a pixel offset, so attachments loading or an editor opening no longer shift what you are reading
- **Typing no longer nudges the page.** The caret is only brought back when it would actually leave the view, and by the smallest amount needed — it used to re-centre on every keystroke
- Adding or ticking a sub-task updates just that note's badge instead of redrawing the whole list, so focus and position are kept
- The side column no longer animates its width, which made the note column re-flow continuously while it opened
- **Pinch zoom no longer makes the page shake.** While zoomed, the visible viewport shrinks and pans continuously; the shell was re-measuring on every frame and fighting the gesture. Viewport tracking now steps aside above 1× zoom, updates are coalesced to one per frame, and identical measurements are ignored
- **The keyboard no longer pushes the app off the screen.** On iOS the visible viewport is scrolled up when the keyboard appears, which left the pinned shell above the screen — the app went black until it was scrolled back. The shell now follows both the height *and* the offset of the visible viewport, and the line being typed is kept in the upper third of its own scroll area as the text grows
- **The page no longer drifts on phones.** The app shell is now pinned to the viewport: the document itself never scrolls, so the browser bar stops collapsing and expanding, rubber-band overscroll and pull-to-refresh are gone, and the layout no longer re-measures while reading. Height follows the visual viewport instead of `dvh`, so the only time it changes is when the keyboard opens — and the field being typed into is scrolled into view
- Scrolling inside the note list, the sidebar and the side column no longer chains to the page behind them
- Pop-up menus (triage, category, notebook section) flip above the control when there is no room below and stay inside the screen; long lists scroll inside the menu

### Added

- **Edge swipes on touch devices** — swipe in from the left edge for the sidebar, from the right edge for the mentor & notebook column, and swipe back to close. The toolbar buttons still work, and are larger on phones. Swipes that start on a text field or a drawing surface are ignored

## [1.3.0] — 2026-08-15

### Added

- **Rich text editing** — the note body is now a formatted editor: bold, italic, underline, strikethrough, highlight, three heading sizes, bullet lists and quotes are applied directly to the text as you write, with ⌘/Ctrl+B, I, U and native undo. No markup is visible while typing
- **Safe HTML storage** — note bodies are stored as HTML that passes a strict whitelist on every read and write (scripts, styles, embedded media, event handlers and `javascript:` links are dropped, pasted content included). Search, revision history, diff summaries, backup and Drive sync operate on the text extracted from it, so they behave exactly as before
- **Existing notes keep working** — plain-text notes, including ones using `##`, `-` or `**` marks, are converted to formatted text the first time they are opened; the original text is preserved in the revision history, and a change that only alters formatting is logged as such
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
