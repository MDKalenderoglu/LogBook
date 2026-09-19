# Changelog

All notable changes to LogBook are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] — 2026-09-20

### Added

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
