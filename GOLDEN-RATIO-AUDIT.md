# Golden Ratio audit

**Bottom line:** every font-size, margin, padding, gap, offset, and line-height in `src/` now comes from a φ token in `tailwind.config.js`. The exceptions are the SVG art and two gaps between drawn bars, listed under [Left alone](#left-alone-and-why). The build passes, and no page scrolls sideways at any width from 320px to 1920px, including 390px. Colors, copy, structure, animations, widths, radii, breakpoints, and letter-spacing are unchanged.

**One open item needs your call:** at desktop sizes the nav links now wrap to two lines. Labels at 16px need an 853px island, and the island is capped at 768px (`max-w-3xl`). Fixing that means changing a width, which was off limits. See [Open item](#open-item).

## Tokens (in `tailwind.config.js`)

The config computes the tokens from φ, so the formula is the single source of truth. `fontSize` and `lineHeight` replace Tailwind's defaults, so only φ sizes and line-heights exist (`text-sm`, `leading-relaxed` and the rest are gone). `spacing` extends the defaults, because `h-8`, `w-9` and the other box sizes still use Tailwind's scale.

| Kind | Classes | Values |
|---|---|---|
| Spacers, `s_n = 1.5 × φ^(n−6)` rem | `*-s1` … `*-s11` | s1 0.135255 · s2 0.218847 · s3 0.354102 · s4 0.572949 · s5 0.927051 · s6 1.5 · s7 2.427051 · s8 3.927051 · s9 6.354102 · s10 10.281153 · s11 16.635255 |
| Half and double spacers (top/bottom padding only) | `py-half-sN`, `pt-double-sN`, … | sN ÷ 2 and sN × 2. Used: half-s6, half-s7, half-s9, half-s10, half-s11, double-s8, double-s9 |
| Type, `16px × φ^n` | `text-t-1` … `text-t5` | t-1 0.618034rem (9.9px) · t0 1rem · t1 1.618034rem · t2 2.618034rem · t3 4.236068rem · t4 6.854102rem · t5 11.09017rem |
| Line-height | `leading-tight / snug / read / loose` | 1.145898 · 1.236064 · 1.381966 · 1.618034, plus `leading-none` (1) for glyphs in fixed boxes |

Approximate px at a 16px root: s1 2.2 · s2 3.5 · s3 5.7 · s4 9.2 · s5 14.8 · s6 24 · s7 38.8 · s8 62.8 · s9 101.7 · s10 164.5 · half-s7 19.4 · half-s9 50.8 · half-s10 82.3 · half-s11 133.1 · double-s8 125.7 · double-s9 203.3. Type: t1 25.9 · t2 41.9 · t3 67.8 · t4 109.7 · t5 177.4.

## How I snapped

- **Nearest token, always.** I snapped every value to its nearest token, including values already inside the 8% / 2px tolerance. The page now has no random px values in the roles this skill covers.
- **Half and double steps on vertical padding only.** I used the nearest whole step when it passed tolerance. When it didn't, I took the nearest half or double step. Margins, gaps, and horizontal padding use whole steps only. So uniform `p-5` (20px) became `px-s6` (24) with `py-half-s7` (19.4).
- **Floor rule.** Real page text under 16px snapped **up** to t0. The next step down, t-1, is 9.9px, below the 11–12px readable floor. This covers eyebrows, buttons, nav, captions, code, and the footer. The feature demos are the one exception (see [Exceptions](#exceptions)).
- **Responsive steps that land on the same token were deleted.** Examples: `mt-14 md:mt-20` both round to s8; `text-base md:text-lg` both round to t0.
- **Classes that only restated the body default were removed.** Body is t0 with `leading-loose`, so `text-base`, `leading-relaxed`, and the like disappeared wherever the token matched.
- **Line-heights:**
  - An authored `leading-*` snaps to the nearest family member by ratio. For example, `leading-5` on 12px is 1.67, which becomes loose.
  - An inherited or default line-height (Tailwind's 1.5 reset, or the line-heights `text-sm`/`text-xl` set) snaps by role: body → loose, lead and caption → read, titles and UI → snug, display → tight.
- **Ties.** 12px sits exactly halfway between s4 and s5. I broke each tie by function, and the table says which.
- **Wrapping.** Headings get `text-wrap: balance`; `p` and `li` get `text-wrap: pretty`.

## Exceptions

Two places don't take the plain nearest token. In both, one of your constraints outranked the skill's default.

**1. The hero's sans line stays at t2 on desktop (nearest is t3).** The brief asks for a 3–5× size gap between the sans line and the serif line. With t3 the gap at wide screens would drop to 2.6×. With t2 it is 4.24×, and it beats the old ratio at every width:

| Viewport | Before (sans / serif) | After (sans / serif) |
|---|---|---|
| 390 | 30.4 / 62.4 = 2.05× | 25.9 / 67.8 = 2.62× |
| 768 | 60 / 122.9 = 2.05× | 41.9 / 122.9 = 2.93× |
| 1024 | 60 / 163.8 = 2.73× | 41.9 / 163.8 = 3.91× |
| 1440+ | 60 / 192 = 3.20× | 41.9 / 177.4 = 4.24× |

**2. Small print inside the three feature demos uses t-1 (9.9px), not the 16px floor.** The demos are small pictures of the app's UI: the stacked tap cards, the live feed, and the pad grid. Their text snaps to the nearest token with no floor, so 10–12px becomes t-1 and the 13px key pads become t0.

I tried t0 first. At 1024px, where the cards are three across, the micro-UIs broke:
- the "Advanced" tab ran 10.6px past its track
- the "Start Intro on next bar" pill ran 14.7px past its panel
- the live feed ran 38px below its panel
- "Map the rest from the song" ran 5px past its card
- at 320px the cards forced a 360px-wide page

The only real fix is wider demos, and widths were off limits. You also asked to keep the guide's design system, which calls for "functional software micro-UIs". t-1 keeps them intact and within about 2px of their old sizes. A comment at the top of `Features.jsx` records this.

## Open item

**Desktop nav labels wrap to two lines.** On one line, the nav needs about 853px at t0. The island is `max-w-3xl` (768px), and the baseline needed 745px. No token choice closes an 85px gap. I let the labels wrap, with no overflow, rather than touch a width. Choose one:

- **Widen the island to `max-w-4xl`.** One class. Labels fit on one line from an 883px viewport up; between 768 and 882 they still wrap.
- **Hide the wordmark text at md and up**, keeping the lantern mark. The nav then needs about 703px and fits from 768 up. This drops "brand name as text" from the desktop nav.
- **Keep the wrapping.**

On phones the same squeeze pushed the Download button 32px off the island at 390px. There, I let the wordmark stack (LAMP over CIRCLE), which reads as a stacked lockup. The link lost `shrink-0` to allow it.

## Table

`a / b` means mobile / larger breakpoint. `a · b` means horizontal · vertical. "(inherited)" means the class went away because body already sets that token.

| Selector | Property | Before | After token | Note |
|---|---|---|---|---|
| `body` | font-size | 16px (browser default) | t0 | now explicit |
| `body` | line-height | 1.5 (Tailwind preflight) | loose | everything inherits it |
| `h1, h2, h3` | text-wrap | — | balance | added; e.g. "A time for / every beat" |
| `p, li` | text-wrap | — | pretty | added |
| `.caps` (eyebrows, labels) | font-size | 11px | t0 | floor rule |
| `.caps` | line-height | 1.5 (inherited) | snug | label |
| `.btn` | gap | 0.6rem (9.6px) | s4 | inside tolerance, snapped anyway |
| `.btn` | font-size | 13 / 14 / 16–18px by size | t0 | all three sizes land on t0, so the size moved into `.btn` |
| `.btn` | line-height | 1.5 (inherited) | snug | |
| Button `sm` | padding | px-4 py-2.5 (16 · 10) | s5 · s4 | |
| Button `md` | padding | px-6 py-3.5 (24 · 14) | s6 · s5 | |
| Button `lg` | padding-inline | px-8 / md:px-10 (32 / 40) | s7 | both round to s7; md step removed |
| Button `lg` | padding-block | py-5 / md:py-6 (20 / 24) | half-s7 / s6 | half step, vertical only |
| Skip link (focused) | left, top | 1rem | s5 | |
| Skip link | padding | px-5 py-2.5 (20 · 10) | s6 · s4 | |
| Skip link | line-height | 1.5 | snug | |
| Nav `header` | top | top-3 / md:top-5 (12 / 20) | s5 / s6 | tie at 12px; s5 matches the side gutter, so the island is evenly inset |
| Nav `header` | padding-inline | px-4 (16) | s5 | |
| Nav island | gap | gap-2 / sm:gap-3 (8 / 12) | s4 / s5 | tie at 12px; s5 so sm still steps up |
| Nav island | padding | py-2 pl-4 pr-2 (8, 16, 8) | s4, s5, s4 | |
| Nav island | line-height | 1.5 | snug | UI |
| Nav logo link | gap | gap-2 (8) | s4 | |
| Nav wordmark | font-size | 13px | t0 (inherited) | stacks to two lines on narrow phones (see Open item) |
| Nav links | gap | gap-7 (28) | s6 | |
| Nav links | font-size | 13px | t0 (inherited) | 13px is nearer t0 than t-1 even without the floor; labels wrap at md+ |
| Nav GitHub + Download | gap | sm:gap-1 (4) | s2 | |
| Nav Download (mobile) | padding-inline | max-sm:px-3.5 (14) | s5 | same token as the sm size's 16px, so the override went |
| Hero content | padding-inline | px-5 / sm:px-8 (20 / 32) | s6 / s7 | |
| Hero content | padding-bottom | pb-14 / md:pb-20 (56 / 80) | half-s9 / half-s10 | 56 misses every candidate; half-s9 (50.8) is nearest. 80 → 82.3 |
| Hero eyebrow | gap | gap-3 (12) | s4 | tie; keeps the bars close to their label |
| Hero `h1` | margin-top | mt-5 (20) | s6 | |
| Hero sans line | font-size | 1.9rem / 48 / 60px | t1 / t2 / t2 | see Exception 1 |
| Hero sans line | line-height | 1.1 (1 at sm+, from text-5xl/6xl) | tight | |
| Hero serif line | font-size | clamp(3.9rem, 16vw, 12rem) | clamp(t3, 16vw, t5) | 62.4 → 67.8 and 192 → 177.4; both ends within 8% |
| Hero serif line | line-height | 0.9 | tight | 0.9 is outside the family |
| Hero serif line | margin-left | -ml-1 / md:-ml-2 (−4 / −8) | −s2 / −s4 | optical overhang of the italic "t"; both within 2px |
| Hero lead | margin-top | mt-6 (24) | s6 | exact |
| Hero lead | font-size | 16 / md 18px | t0 (inherited) | |
| Hero lead | line-height | relaxed 1.625 (1.556 at md) | loose (inherited) | |
| Hero CTA row | margin-top | mt-8 (32) | s7 | |
| Hero CTA row | gap | gap-3 (12) | s5 | tie; s5 gives the buttons room |
| Features section | padding-inline | px-5 / sm:px-8 | s6 / s7 | |
| Features section | padding-block | py-24 / md:py-36 (96 / 144) | s9 / half-s11 | 144 misses s10 by 20px; half-s11 (133.1) is within 8% |
| Features `h2` | margin-top | mt-4 (16) | s5 | |
| Features `h2` | font-size | 36 / 60px | t2 / t3 | |
| Features `h2` | line-height | 1.11 / 1 (text-4xl/6xl defaults) | tight | display |
| Features intro | margin-top | mt-5 (20) | s6 | |
| Features intro | font-size, line-height | 18px, relaxed | t0, loose (inherited) | |
| Feature grid | margin-top | mt-14 / md:mt-20 (56 / 80) | s8 | both round to s8 |
| Feature grid | gap | gap-6 (24) | s6 | |
| Feature card | padding | p-5 / md:p-6 (20 / 24) | s6 · half-s7 / s6 | |
| Feature step label | margin-top | mt-7 (28) | s6 | |
| Feature step label | font-size | text-xs 12px | t0 | floor |
| Feature step label | line-height | 1.33 (text-xs default) | snug | |
| Feature `h3` | margin-top | mt-2 (8) | s4 | |
| Feature `h3` | font-size | text-2xl 24px | t1 | |
| Feature `h3` | line-height | 1.33 (text-2xl default) | snug | |
| Feature body | margin-top | mt-3 (12) | s4 | tie; keeps the copy close to its title |
| Feature body | font-size, line-height | 15px, relaxed | t0, loose (inherited) | |
| Tap demo card | padding | p-5 (20) | s6 · half-s7 | |
| Tap demo header | gap | gap-2 (8) | s4 | |
| Tap demo label (`.caps`) | font-size | 11px | t-1 | Exception 2 |
| Tap demo key chip | padding | px-2.5 py-0.5 (10 · 2) | s4 · s1 | |
| Tap demo key chip | font-size | 10px | t-1 | Exception 2 |
| Tap demo title row | gap | gap-3 (12) | s4 | tie; s4 for the tight card |
| Tap demo title row | line-height | 1.5 | snug | |
| Tap demo title | font-size | 1.7rem (27.2px) | t1 | within 2px |
| Tap demo meta | font-size | text-xs 12px | t-1 | Exception 2 |
| Tap demo section chips | gap | gap-1 (4) | s2 | |
| Tap demo section chips | font-size | 10px | t-1 | Exception 2 |
| Tap demo section chips | line-height | 1.5 | snug | |
| Tap demo "Map the rest" pill | padding | px-3.5 py-2 (14 · 8) | s5 · s4 | |
| Tap demo "Map the rest" pill | font-size | 12px | t-1 | Exception 2 |
| Prep demo panel | padding | p-5 (20) | s6 · half-s7 | |
| Prep demo header | line-height | 1.5 | snug | |
| Prep demo "Live feed" | gap | gap-2.5 (10) | s4 | |
| Prep demo "Live feed", filename | font-size | 11px | t-1 | Exception 2 |
| Prep demo feed | font-size | 12px | t-1 | Exception 2 |
| Prep demo feed | line-height | leading-5 (20px = 1.67) | loose (inherited) | |
| Prep demo feed | line spacing | space-y-1 (4) | s2 | |
| Prep demo cursor | margin-left | ml-px (1) | s1 | within 2px |
| Perform demo panel | padding | p-4 / sm:p-5 (16 / 20) | s5 / s6 · half-s7 | |
| Perform demo mode tabs | gap, padding | gap-1 p-1 (4) | s2 | |
| Perform demo mode tabs | font-size | 11px | t-1 | Exception 2 |
| Perform demo mode tabs | line-height | 1.5 | snug | |
| Perform demo tab | padding-block | py-1.5 (6) | s3 | |
| Perform demo "Live pad" row | margin-top | mt-3 (12) | s4 | tie; keeps the 240px demo compact |
| Perform demo "Live pad" row | line-height | 1.5 | snug | |
| Perform demo "Live pad", key readout | font-size | 11px | t-1 | Exception 2 |
| Perform demo pad grid | margin-top | mt-2 (8) | s4 | |
| Perform demo pad grid | gap | gap-1.5 (6) | s3 | |
| Perform demo key pads | font-size | 13px | t0 | nearest, even without the floor |
| Perform demo key pads | line-height | 1.5 | 1 | glyph in a fixed 40px box (optical rule) |
| Perform demo bottom row | gap | gap-2 (8) | s4 | |
| Perform demo Start pill | padding | px-3.5 py-2.5 (14 · 10) | s5 · s4 | |
| Perform demo Start pill | font-size | 12px | t-1 | Exception 2 |
| Perform demo Start pill | line-height | 1.5 | snug | |
| Manifesto section | padding-inline | px-5 / sm:px-8 | s6 / s7 | |
| Manifesto section | padding-block | py-32 / md:py-48 (128 / 192) | double-s8 / double-s9 | whole steps miss by 26–28px; the doubles land within 6% |
| Manifesto quiet line | margin-top | mt-8 (32) | s7 | |
| Manifesto quiet line | font-size | text-xl / md:text-3xl (20 / 30) | t0 / t1 | |
| Manifesto quiet line | line-height | snug 1.375 (1.2 at md) | read | |
| Manifesto loud line | margin-top | mt-8 / md:mt-12 (32 / 48) | s7 | both round to s7 |
| Manifesto loud line | font-size | clamp(3rem, 11vw, 9rem) | clamp(t2, 11vw, t4) | 144px max is a near tie (t4 34.3px off, t5 33.4px off). t5 split "living / room." onto separate lines from ~1570px; t4 keeps the hero one φ step bigger |
| Manifesto loud line | line-height | 0.95 | tight | |
| Manifesto loud line | text-wrap | — | balance | holds "We focus on the / living room." at every width |
| Manifesto note | margin-top | mt-10 / md:mt-14 (40 / 56) | s7 / s8 | |
| Manifesto note | font-size, line-height | 16 / 18px, relaxed | t0, loose (inherited) | |
| Protocol head | padding-inline | px-5 / sm:px-8 | s6 / s7 | |
| Protocol head | padding-top | pt-24 / md:pt-32 (96 / 128) | s9 / double-s8 | |
| Protocol head | padding-bottom | pb-10 / md:pb-16 (40 / 64) | s7 / s8 | |
| Protocol `h2` | margin-top, size, line-height | mt-4; 36 / 60px; 1.11 / 1 | s5; t2 / t3; tight | |
| Protocol intro | margin-top | mt-5 (20) | s6 | |
| Protocol intro | font-size, line-height | 18px, relaxed | t0, loose (inherited) | |
| Protocol card frame | padding | p-3 / md:p-5 (12 / 20) | s4 · half-s6 / s6 · half-s7 | 12px across is a tie; s4 leaves the phone card wider |
| Protocol card panel | padding | px-6 py-10 / md:px-16 (24 · 40 / 64) | s6 · s7 / s8 | |
| Protocol card content | gap | gap-8 / md:gap-16 (32 / 64) | s7 / s8 | |
| Protocol step number | font-size | text-sm 14px | t0 | |
| Protocol step number | line-height | 1.43 (text-sm default) | snug | |
| Protocol `h3` | margin-top | mt-3 (12) | s4 | tie; keeps the number close to its title |
| Protocol `h3` | font-size | 30 / 36 / 60px | t1 / t2 / t3 | |
| Protocol `h3` | line-height | 1.2 / 1.11 / 1 | tight | display |
| Protocol body | margin-top | mt-4 / md:mt-6 (16 / 24) | s5 / s6 | |
| Protocol body | font-size, line-height | 16 / 18px, relaxed | t0, loose (inherited) | |
| Protocol spec chip | margin-top | mt-5 / md:mt-8 (20 / 32) | s6 / s7 | |
| Protocol spec chip | padding | px-3 py-1.5 (12 · 6) | s5 · s3 | tie at 12px; s5 clears the chip's 16px corner |
| Protocol spec chip | font-size | 11 / md 12px | t0 | floor |
| Protocol spec chip | line-height | 1.5 / 1.33 | snug | |
| `Protocol.jsx` `FRAME` | room added to each card in the pin-fit check | 120 | 117 | now 2 × (half-s7 + s7) at md; cards pin at the same sizes as before |
| Get Started section | padding-inline | px-4 / sm:px-8 (16 / 32) | s5 / s7 | |
| Get Started section | padding-block | py-24 / md:py-36 (96 / 144) | s9 / half-s11 | |
| Get Started panel | gap | gap-12 (48) | s7 | |
| Get Started panel | padding-inline | px-6 / sm:px-10 / md:px-16 | s6 / s7 / s8 | |
| Get Started panel | padding-block | py-14 / md:py-20 (56 / 80) | half-s9 / half-s10 | |
| Get Started `h2` | margin-top, size, line-height | mt-4; 36 / 60px; 1.11 / 1 | s5; t2 / t3; tight | |
| Get Started intro | margin-top | mt-5 (20) | s6 | |
| Get Started intro | font-size, line-height | 18px, relaxed | t0, loose (inherited) | |
| Checklist | margin-top | mt-8 (32) | s7 | |
| Checklist | item spacing | space-y-3 (12) | s4 | tie; the items already breathe at loose line-height |
| Checklist item | gap | gap-3 (12) | s4 | tie; keeps the check next to its text |
| Checklist item | font-size | 15px | t0 (inherited) | |
| Check icon | margin-top | mt-0.5 (2) | s2 | re-centered on the first line: an 18px icon in a 25.9px line box needs about 4px |
| Get Started button row | margin-top, gap-x, gap-y | mt-10, gap-x-6, gap-y-4 | s7, s6, s5 | |
| "All releases" link | font-size | text-sm 14px | t0 | |
| "All releases" link | line-height | 1.43 | snug | |
| Code card | padding | p-5 / md:p-6 | s6 · half-s7 / s6 | |
| Code card caption | gap | gap-3 (12) | s5 | tie; keeps the two labels apart when the card is narrow |
| Code card caption | font-size | 11px | t0 | floor |
| Code card caption | line-height | 1.5 | snug | |
| Code block (`pre`) | margin-top | mt-4 (16) | s5 | |
| Code block (`pre`) | font-size | 12px | t0 | floor; the long `source:` URL now scrolls sideways on desktop too (the block was already `overflow-x-auto`) |
| Code block (`pre`) | line-height | leading-6 (24px = 2.0) | loose (inherited) | |
| `footer` | padding-inline | px-6 / sm:px-10 | s6 / s7 | |
| `footer` | padding-top | pt-16 / md:pt-20 (64 / 80) | s8 / half-s10 | |
| `footer` | padding-bottom | pb-10 (40) | s7 | |
| Footer grid | gap | gap-12 (48) | s7 | |
| Footer tagline | margin-top | mt-5 (20) | s6 | |
| Footer tagline | font-size, line-height | text-sm, relaxed | t0, loose (inherited) | |
| Footer status pill | margin-top | mt-6 (24) | s6 | |
| Footer status pill | gap | gap-2.5 (10) | s4 | |
| Footer status pill | padding | px-4 py-2 (16 · 8) | s5 · s4 | |
| Footer status pill | font-size | 11px | t0 | floor; wraps to two lines inside the pill at 390 |
| Footer status pill | line-height | 1.5 | snug | |
| Footer link lists | margin-top | mt-5 (20) | s6 | |
| Footer link lists | item spacing | space-y-3 (12) | s5 | tie; s5 spaces the tap targets |
| Footer link lists | font-size | text-sm 14px | t0 | |
| Footer link lists | line-height | 1.43 | snug | |
| Footer fine print | margin-top, item spacing | mt-5, space-y-3 | s6, s4 | tie at 12px; running text |
| Footer fine print | font-size, line-height | text-sm, relaxed | t0, loose (inherited) | |
| Footer bottom bar | margin-top | mt-14 (56) | s8 | |
| Footer bottom bar | gap | gap-2 (8) | s4 | |
| Footer bottom bar | padding-top | pt-6 (24) | s6 | |
| Footer bottom bar | font-size | text-xs 12px | t0 | floor |
| Footer bottom bar | line-height | 1.33 | snug | |
| Footer bottom bar, right group | gap | gap-3 (12) | s4 | tie |
| Footer GitHub link | margin-block | -my-2.5 (−10) | −s4 | cancels the 40px hit area's extra height |

## Left alone, and why

- **Widths, max-widths, and grid tracks:** `max-w-*`, `lg:grid-cols-3`, `md:grid-cols-[1.15fr_1fr]`, `lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]`. They're out of scope for this skill and belong to Golden Grid.
- **Box sizes:** `h-8`, `h-9`, `h-10`, `w-9`, `h-24`, `h-40`, `h-[11rem]`, `h-[15rem]`, `h-[100dvh]`, `min-h-[600px]`, `h-3.5`, `h-6`, icon sizes. These are boxes, not spacing.
- **Radii, borders, rings, outline-offset, underline-offset:** decoration, out of scope.
- **Breakpoints,** including `max-[389px]`.
- **Letter-spacing:** `tracking-tight`, `tracking-wider`, `tracking-[0.16em]`, `tracking-[0.2em]`.
- **Colors, copy, structure, animations:**
  - GSAP values, scroll triggers, and stagger timings
  - the stacked tap cards' inline `translateY(−depth × 20px)` and the cursor's offsets
  - animation delays, the parallax wrapper's `-top-[15%] h-[130%]`, and `SoundBars` bar heights
- **SVG art in Protocol** (the clock, the scan grid, the waveform): text and geometry are in viewBox units, so the rendered px size changes with the drawing's width and there is no fixed px to snap. Changing them would also push labels into the dots.
- **Gaps between drawn bars:**
  - `SoundBars` `gap-[3px]`: 0.5px off s2.
  - the tap demo's beat bars `gap-[5px]`: 0.7px off s3.

  Both pass tolerance, and each gap is part of a mark whose bar widths are out of scope.
- **The feed cursor's `translate-y-[3px]` and em-based size:** an optical nudge on the caret, not spacing.
- **Navbar `rootMargin: -88px`:** the line where the island frosts. The island's bottom edge is now at 84px on desktop, still above it.
- **Tailwind preflight defaults:**
  - `html { line-height: 1.5 }`, which body overrides with loose
  - `pre { font-size: 1em }`, which inherits t0
  - sub/sup, unused
- **The `-1px` margin of `sr-only`:** an accessibility utility.

## Verify

- `npm run build` passes, and `npm run lint` (oxlint) is clean.
- In the built CSS, every font-size, line-height, margin, padding, gap, and offset is a token. The only exceptions are the items listed under "Left alone": preflight defaults, `sr-only`, and the 3px and 5px bar gaps.
- I tested in headless Chrome at 320, 390, 640, 768, 1024, 1280, 1366, 1440, and 1920px, with motion on and with reduced motion:
  - No page scrolls sideways.
  - No text escapes its pill, chip, or card.
  - The Protocol cards pin at the same sizes as before (all but 320×700, same as the baseline).
- Hero contrast is higher at every width (table under Exception 1).
- The manifesto's serif line holds two lines at every width.
