# Make the Lamp Circle site's feature claims match the real app

You are in ~/Sites/kevnk/lampcircle-site (the Lamp Circle landing site, already built: src/components/*.jsx, src/site.js, index.html meta/OG, public/og.png via scripts/og.html + scripts/og.sh, README.md).

The site copy was written from older notes. It must describe the app as it actually works on the **`main` branch** of the app repo `~/Sites/kevnk/lampcircle/`.

**READ-ONLY on the app repo.** Another agent is editing its working tree right now. Do NOT edit, stage, commit, checkout, stash or run builds/dev servers there. Read the committed main-branch code only, e.g. `git -C ~/Sites/kevnk/lampcircle show main:README.md`, `git -C ~/Sites/kevnk/lampcircle grep -n <pattern> main -- src src-tauri`, `git -C ~/Sites/kevnk/lampcircle ls-tree -r --name-only main`. Uncommitted working-tree changes are not "main".

## Steps
1. Read the app's main-branch README, PRODUCT.md, and source: keyboard shortcuts (tap screen / sections), Refine/Prep (pickups, fades, loops, repeats, jumps), Export/.djw format (what's in a .djw, YAML?, audio?), Sets, Perform (pads, keys, how song-to-song transitions work, whether pads walk in 4ths, hold/queue keys), Library (YouTube download, audio files, .djw import, pads download), BPM/tempo features, the Mac app (Tauri), whether it's free.
2. List EVERY feature/factual claim on the site: hero, nav, feature cards (shuffler labels, typewriter feed lines, scheduler labels), manifesto, protocol cards (titles, descriptions, spec/data strings like `pad path: ...`, `downbeats: [...]`), Get Started (bullets, sample .djw snippet), footer, alt text, <title>/meta/OG/Twitter/JSON-LD, og.png text, site.webmanifest, README.md.
3. For each claim, check it against main. Known corrections to verify: Space taps every beat, Shift+Space marks beat 1, keys 1–8 mark sections at the nearest bar. Only mention "Lock to N BPM", transition types (Stop / Straight in / Pad path), pads in 4ths, .djw import with audio download, etc. IF they exist on main, using main's actual names and behavior. Make the sample .djw snippet match main's real .djw format (see way-maker.sample.djw and the .djw writer/parser on main).
4. Rewrite every claim that doesn't match. You write all the copy. Keep it plain and concrete, keep the design, structure, animations, section order, and the name "Lamp Circle" (two words; URLs/files stay lowercase lampcircle). Keep the hero headline unless it's now inaccurate. If og.png text changes, re-render it with scripts/og.sh.
5. `npm run build` must pass. Do not git commit or push (I will). Do not deploy.

## Output
Print a table of the claims you changed: file, before → after, and the main-branch evidence (file:line or README line) for each. Then list the claims you checked and kept, with their evidence.
