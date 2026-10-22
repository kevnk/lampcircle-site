# Lamp Circle site: feature claims now match the app's main branch

The site copy now describes the app as it works on `main`. I took out the features that don't exist ("Lock to N BPM" and the Stop / Straight in / Pad path transition types), fixed the tap keys, and rebuilt the sample .djw from main's own writer. I also added Kevin's GitHub icon link to the nav and footer. `npm run build` and `npm run lint` pass. Nothing is committed, pushed or deployed. I only read the app repo (`git show`, `git grep`, `git ls-tree` on `main`).

## Check these before launch

- **"Download for Mac" currently 404s for the public.** The only GitHub release is a **Draft** (`Lampcircle 0.1.0`, v0.1.0). `releases/latest` only works once a release is published.
- **"Free" isn't stated anywhere on main.** There's no price, license, trial or paywall code, and releases are public GitHub Releases. I kept "Free" and the JSON-LD `price: 0` because nothing contradicts them. Please confirm.
- **The key in the .djw snippet (`key: E`) is mine.** The app's sample file has no keys. Everything else in the snippet is real writer output.
- **The second-opinion check couldn't run at the end.** Both reviewers failed (usage limit, connection error). The mid-task review did run, and I applied its points: Export now appears in a step chip, and I confirmed that Simple mode walks the route Sets suggests.

## Claims I changed

Evidence is `main:` paths in `~/Sites/_misc/lampcircle`.

| File | Before → After | Evidence on main |
|---|---|---|
| Hero.jsx body | "Tap the 1 while a song plays… Every part then lands… key pads carry you" → "Tap the beat while a song plays… Every section then lands on its bar's 1, and a live pad carries you from one song to the next." | README.md:23, :27; Sets.tsx:234 ("Live pad") |
| index.html meta description | "Tap the 1 to map a song, prep each part to land on its bar, and let key pads carry you…" → "Tap the beat to map a song, shape how each section loops and lands, and let a live pad carry you between songs." | README.md:3, :23 |
| index.html og:/twitter:description | same fix: "…shape how each section lands, and let a live pad carry the room between songs. Free for Mac." | README.md:3 |
| index.html JSON-LD operatingSystem | "macOS" → "macOS 12 or later" | src-tauri/tauri.conf.json:45 |
| Features subtitle | "Three screens, in the order…" → "Three steps, in the order…" | ui.tsx:216-219 and App.tsx:60-62 (the flow covers six screens) |
| Features step chips | "01 · Tap / 02 · Prep / 03 · Perform" → "01 · Map Song / 02 · Transitions + Export / 03 · Sets + Perform" | ui.tsx:216-219; App.tsx:61-62 |
| Card 1 title | "Tap the 1" → "Tap the beat" | SongTap.tsx:316 |
| Card 1 body | "press Space on the first beat of each bar… Mark Intro, Verse, Chorus, Bridge, Tag and Outro with a key… offers to lock the tempo" → "press Space on every beat, with Shift+Space on beat 1. After 8 taps, Lamp Circle can follow the recording for the rest. Then press 1 to 8 as each section starts. It snaps to the nearest bar, and the app finds its key." | SongTap.tsx:184-190, :324, :346; songMap.ts:5, :37-46, :410-418; README.md:23; `git grep -i "lock to"` finds nothing |
| Tap demo, card A | "Downbeat tapped · SPACE · 0:57.42" → "Beat 1 tapped · SHIFT+SPACE · 0:57 · beat 1" | SongTap.tsx:187, :226; songMap.ts:448-451 (clock shows m:ss) |
| Tap demo, card B chip | "Chorus" → "4" | songMap.ts:41 (Chorus is the 4th type); SongTap.tsx:188-190 |
| Tap demo, card C | "Your taps are steady · Offer · 72 BPM · your call" with "Lock to 72 BPM / Not now" → "After 8 taps · Tempo · 72.0 BPM · from your taps" with "Map the rest from the song" | SongTap.tsx:333 (toFixed(1)), :346, :349; songMap.ts:5 |
| Card 2 body | "Give each part a pickup… and a fade that finishes before it. Then every part lands…" → "Give each section a pickup for singers who come in early, fades at its loop point, a repeat count, and a rule for when a jump lands: next beat, next bar, end of phrase or end of section. Audition the loop, then save the map as a .djw." | Refine.tsx:11-16, :93-95, :166-195, :214-215; README.md:24-25 |
| Card 2 typed feed, lines 4, 6 and 8 | "pickup 1 beat · fade out 2 beats" (twice) and "no pickup · fade out 4 beats" → "repeats ×2 · jump at end of phrase", "fade out 2 beats · ends on the 1", "repeats ×3 · fade out 4 beats" | Refine.tsx:14, :94, :180 ("on the 1") |
| Card 3 body | "choose how each one hands off: Stop, Straight in, or Pad path. Pads in all 12 keys step around the circle of 4ths…" → "Put ready songs in order. Each gap gets a live pad and a suggested way into the next key, or pads you pick. In Perform, number keys queue sections and H holds one. When a song ends, the pad plays on until you start the next song on the bar." | Sets.tsx:31-36, :234-255; Perform.tsx:275-283; README.md:26-27; no "Straight in" or "Pad path" on main |
| Pad demo switch | "Stop / Straight in / Pad path" (Pad path lit) → "Simple / Guided / Advanced" (Advanced lit, the default) | Perform.tsx:826-828, :23 |
| Pad demo label | "Key pads · now → queued" → "Live pad · key left → next key" (E → A) | Sets.tsx:234-237; Perform.tsx:660 |
| Pad demo key names | "B♭ E♭ A♭ D♭ G♭" → "Bb Eb G# C# F#" (the app's spelling) | music.ts:1 |
| Pad demo button and motion | "Start on next bar", which also switched the pad → "Start Intro on next bar". The tapped pad now comes in on the next bar by itself, then Start brings in the song. | Perform.tsx:1002, :984 (the next song starts on its first section), :193 and :23 (pad taps land on the next bar) |
| Pad demo screen-reader text | "Press its pad, then Start on next bar." → "Tap the A pad and it comes in on the next bar, then start the next song on the next bar." | same as above |
| Protocol 01 title | "One mark per bar" → "A time for every beat" | SongTap.tsx:187; djw.ts:37-40 |
| Protocol 01 body | "You tap the 1 of every bar and the map stores exactly those times…" → "Each tap is a beat, and Shift marks beat 1. A tap snaps onto the drum hit or strum it was reaching for. Gaps are spaced evenly, and the app can follow the recording for the rest, so a live take that drifts still lines up." | SongTap.tsx:142-143; songMap.ts:77, :133-136; README.md:23 |
| Protocol 01 spec | "downbeats: [3.20, 6.74, 10.27, 13.79, …]" → "beats: [3.2, 4.085, 4.97, …] · downbeats: [3.2, 6.74, …]" | djw.ts:37-40 (values are main's writer output for the sample) |
| Protocol 02 body and section intro | "part" → "section" | djw.ts:41; README.md:23 |
| Protocol 03 body | "a pad in its key keeps sounding. It steps around the circle of 4ths to the next song's key" → "a pad in the key it ended in keeps sounding. Sets suggests a way into the next song's key, moving around the circle of 4ths when the keys are close, and Simple mode walks it one pad every 4 bars." | Perform.tsx:124-140, :240-253; music.ts:101-119 |
| Protocol 03 spec | "pad path: E → A · one step on the circle" → "live pad: E → A · way in: E, A" | Sets.tsx:234-238; music.ts:111 (E → A is one step) |
| GetStarted paragraph | "import a song… tapping the 1 of each bar and pressing a section key… When it ends, the song is mapped." → "add a song you lead often: paste a YouTube link or drop in an audio file. Tap 8 beats or more, let the app map the rest, and press 1 to 8 as each section starts. Shape the transitions, save the .djw, and the song is ready for a set." | README.md:22-25; Library.tsx:282-318 |
| GetStarted bullet 1 | "Free, for Mac" → "Free, for macOS 12 or later" | tauri.conf.json:45 |
| GetStarted bullet 3 | "Maps save as small .djw files, with no audio inside" → "…with no audio. A map of a YouTube song fetches the audio when you import it" | djw.ts:5; Library.tsx:66-72 |
| GetStarted bullet 4 | "Pads in all 12 keys for the space between songs" → "One button downloads pads in all 12 keys for the space between songs" | README.md:22; Library.tsx:464; library.ts:13-17 |
| GetStarted .djw snippet | v1 (`djw: 1`, `parts:`, downbeats only, flow arrays) → v2 exactly as main writes it: `djw: 2`, `song.audio.source`, `grid.beats` + `grid.downbeats` as block lists, then `sections:` with name/type/start_bar/end_bar/key/pickup_beats/fade_in/fade_out/repeats/jump_at, trimmed with `# …` | djw.ts:29-54. I ran main's own `serializeDjw` on way-maker.sample.djw in a scratch folder to get the exact output |
| Footer fine print | "Lamp Circle includes no songs. You import your own recordings." → "Lamp Circle comes with no songs or pads. You add your own audio files, or paste YouTube links." plus a new line: "YouTube downloads need yt-dlp and ffmpeg from Homebrew." | README.md:7, :22; docs/mac-app.md:42 |
| Footer fine print | "Maps hold timing and parts, never audio." → "…timing and sections, never audio." | djw.ts:5, :41 |

## Claims I checked and kept

- **Hero headline** "Living-room worship meets the downbeat." It's still accurate, so I kept it. Beat 1 is the tap you mark with Shift (SongTap.tsx:187).
- **"Live song maps"** (hero eyebrow, `<title>`, footer tagline, webmanifest, JSON-LD description, site README): README.md:1, :3.
- **"Free Mac app" / "Free for Mac" / "Free to download and use" / JSON-LD price 0:** the Mac app is real (docs/mac-app.md:3). Nothing on main states a price (`git grep` for free, price, licen, paid, purchase, trial finds nothing). Flagged above.
- **"for leading worship in a small room":** README.md:3.
- **Nav "Tap · Prep · Perform" and heading "Tap. Prep. Perform.":** PRODUCT.md:15 ("Flow: Library → Tap → Prep → Perform").
- **"Map a song once and it's ready for every set after":** Sets.tsx:50, :173 (ready songs stay listed for any set).
- **Manifesto "reads at a glance in a dim room":** PRODUCT.md:13, :29. **"a pad keeps sounding when the song ends":** README.md:27; Perform.tsx:130-140.
- **Card 2 title "Prep every landing", and typed-feed lines 1-3, 5 and 7** ("lands on bar N, beat 1", "pickup 1 beat · fade in 1 beat"): way-maker.sample.djw:21-27; performPlan.ts:5-11.
- **Protocol 02 "Fade, pickup, then the 1"**, with its body logic, art labels and spec `{ name: Chorus 1, start_bar: 21, pickup_beats: 1, fade_in: 1 }`: performPlan.ts:5-11 (the fade ends where the pickup starts); djw.ts:44-48 (field names); Refine.tsx:193-195.
- **Protocol 03 title "Pads move in 4ths"** and its art labels (song in E, pad E → A, song in A, on the 1): music.ts:101-111; README.md:27.
- **12 pads shown in the demo:** Library.tsx:464 ("Get all 12 keys").
- **"Your songs and maps stay on your Mac":** PRODUCT.md:32; docs/mac-app.md:31-32.
- **Snippet caption "way-maker.djw · YAML · no audio":** djw.ts:1, :5.
- **Download and release links** (releases/latest, releases, repo): docs/mac-app.md:68. The release is still a Draft, flagged above.
- **og.png** (eyebrow, headline, URL), **og:image:alt**, **`<title>`**, **site.webmanifest**, **site README.md**: all still accurate. I didn't re-render og.png because its text didn't change.
- **Photo alt text** (candles, lamplight, guitar): describes photos, makes no feature claims.

## Kevin's GitHub link

- lucide-react 1.61 has no `Github` export (brand icons were removed), so `GithubLink` in `src/components/ui.jsx` draws the GitHub mark as inline SVG.
- Each link has `aria-label="Lamp Circle on GitHub"`, `target="_blank"`, `rel="noopener"`, the `lift` hover (translateY(-1px)) and the site's `:focus-visible` ring. I checked the amber ring in the footer.
- **Nav:** the icon sits just left of Download. **Footer:** it sits next to "Made for small rooms."
- **Phone widths:** at 390px the nav overflowed by 13px. On mobile only, I tightened the spacing: nav gap 12→8px, icon 36px, Download padding 16→14px. It now fits at 390 with no page scroll. Under 390px, the "LAMP CIRCLE" wordmark becomes screen-reader-only (the lantern mark stays) so 375 and 360 fit too.

## Layout fixes the longer, accurate labels needed

- **Feature cards:** they now go three-across at `lg` (1024px) instead of `md`. At 768-1023px, three columns overflowed. That was already true before, but the real labels made it worse. Tablets now get the stacked phone layout.
- **Start pill:** it stays on one line ("Start Intro on next bar").
- **.djw snippet:** the figure got `min-w-0`, so the long `source:` URL scrolls inside the card instead of pushing it off the right edge on phones.

**Checked in Chrome at 390, 375, 800, 1024 and 1280px, plus reduced motion:** nothing sticks out of a card, there's no sideways page scroll, and the pad demo plays as described.

Files changed: index.html, README.md, and src/components/Features.jsx, Footer.jsx, GetStarted.jsx, Hero.jsx, Navbar.jsx, Protocol.jsx, ui.jsx.
