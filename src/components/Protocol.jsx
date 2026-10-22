import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../site';

const BAR = 60 / 72 * 4; // one bar of 4/4 at 72 BPM, in seconds

/* ── 01: a bar as a clock. The hand sweeps once per bar; beat 1 sits at the top, tallest. ── */

function BarClock() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to('.clock-ticks', { rotation: 360, svgOrigin: '200 200', duration: 90, ease: 'none', repeat: -1 });
      gsap.to('.clock-hand', { rotation: 360, svgOrigin: '200 200', duration: BAR, ease: 'none', repeat: -1 });
      const tl = gsap.timeline({ repeat: -1 });
      gsap.utils.toArray('.clock-beat').forEach((beat, i) => {
        tl.fromTo(beat, { opacity: 1 }, { opacity: 0.45, duration: 0.7, ease: 'power2.out' }, (i * BAR) / 4);
      });
      tl.fromTo('.clock-tap', { scale: 0.6, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.out', transformOrigin: '50% 50%' }, 0);
      tl.set({}, {}, BAR);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const ticks = Array.from({ length: 48 }, (_, i) => i);
  const beats = [0, 90, 180, 270];

  return (
    <svg ref={root} viewBox="0 0 400 400" className="h-auto w-full" aria-hidden="true">
      <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      <g className="clock-ticks">
        {ticks.map(i => (
          <line
            key={i}
            x1="200"
            x2="200"
            y1="22"
            y2={i % 12 === 0 ? 40 : 30}
            stroke="currentColor"
            strokeOpacity={i % 12 === 0 ? 0.7 : 0.32}
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${i * 7.5} 200 200)`}
          />
        ))}
      </g>
      <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="200" cy="200" r="96" fill="none" stroke="currentColor" strokeOpacity="0.22" />
      <circle className="clock-tap" cx="200" cy="74" r="26" fill="none" stroke="#F0A64B" strokeWidth="2" opacity="0" />
      {beats.map((angle, i) => {
        const h = i === 0 ? 46 : 24;
        return (
          <rect
            key={angle}
            className="clock-beat"
            x="194"
            y={74 - h / 2}
            width="12"
            height={h}
            rx="6"
            fill={i === 0 ? '#F0A64B' : 'currentColor'}
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
      <g className="clock-hand">
        <line x1="200" y1="200" x2="200" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="200" cy="58" r="5" fill="currentColor" />
      </g>
      <circle cx="200" cy="200" r="16" fill="#F0A64B" />
      <circle cx="200" cy="200" r="28" fill="none" stroke="#F0A64B" strokeOpacity="0.4" />
    </svg>
  );
}

/* ── 02: a playhead sweeping four bars. Bar 21 is where Chorus 1 lands; its pickup and fade sit just before. ── */

const COLS = 16;
const ROWS = 5;
const colX = c => 34 + c * 27.5;
const FADE = 10;
const PICKUP = 11;
const LAND = 12;

function ScanGrid() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const sweep = 4.8;
      const from = 14;
      const to = 466;
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo('.scan-laser', { x: from }, { x: to, duration: sweep, ease: 'none' }, 0);
      gsap.utils.toArray('.scan-col').forEach((col, c) => {
        const at = ((colX(c) - from) / (to - from)) * sweep;
        tl.fromTo(col, { opacity: 1 }, { opacity: 0.35, duration: 0.9, ease: 'power2.out', immediateRender: false }, at);
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg ref={root} viewBox="0 0 480 290" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fade-ramp" x1="0" x2="1">
          <stop offset="0" stopColor="#F0A64B" stopOpacity="0" />
          <stop offset="1" stopColor="#F0A64B" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="laser-trail" x1="0" x2="1">
          <stop offset="0" stopColor="#F0A64B" stopOpacity="0" />
          <stop offset="1" stopColor="#F0A64B" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect x={colX(FADE) - 12} y="62" width="24" height="150" rx="12" fill="url(#fade-ramp)" />
      <rect x={colX(PICKUP) - 12} y="62" width="24" height="150" rx="12" fill="#F0A64B" fillOpacity="0.18" stroke="#F0A64B" strokeWidth="1.5" />
      <rect x={colX(LAND) - 4} y="52" width="8" height="170" rx="4" fill="#F0A64B" />

      <g fontFamily="JetBrains Mono, monospace" fontSize="13" fill="currentColor">
        <text x={colX(FADE)} y="44" textAnchor="middle" fillOpacity="0.7">fade</text>
        <text x={colX(PICKUP) + 2} y="30" textAnchor="middle" fillOpacity="0.7">pickup</text>
        <text x={colX(LAND)} y="44" textAnchor="middle" fill="#F5B35E" fontSize="17" fontWeight="500">1</text>
        {[0, 4, 8, 12].map((c, i) => (
          <text key={c} x={colX(c)} y="250" fillOpacity={c === LAND ? 1 : 0.55}>
            bar {18 + i}
          </text>
        ))}
        <text x={colX(LAND)} y="272" fill="#F5B35E">Chorus 1</text>
      </g>

      {Array.from({ length: COLS }, (_, c) => (
        <g key={c} className="scan-col" opacity={reduced ? 1 : 0.35}>
          {Array.from({ length: ROWS }, (_, r) => (
            <circle
              key={r}
              cx={colX(c)}
              cy={80 + r * 28.5}
              r={c % 4 === 0 ? 5 : 3.5}
              fill={c >= FADE && c <= LAND ? '#F0A64B' : 'currentColor'}
            />
          ))}
        </g>
      ))}

      {/* React places the still laser; GSAP moves only the inner group, so the two never fight over one transform. */}
      <g transform={reduced ? `translate(${colX(LAND)} 0)` : undefined}>
        <g className="scan-laser">
          <rect x="-44" y="56" width="44" height="162" fill="url(#laser-trail)" />
          <line x1="0" x2="0" y1="52" y2="222" stroke="#F0A64B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/* ── 03: a waveform. A song's downbeats, then a pad holding the key and moving E → A, then the next song on its 1. ── */

function beatSpike(x, base, height) {
  return [
    [x - 9, base],
    [x - 5, base + 7],
    [x, base - height],
    [x + 5, base + height * 0.35],
    [x + 10, base],
  ];
}

function buildWave() {
  const base = 130;
  const points = [[0, base]];
  for (const x of [24, 74, 124, 174]) points.push(...beatSpike(x, base, 62));
  for (let x = 200; x <= 412; x += 4) points.push([x, base + Math.sin(((x - 200) / 106) * Math.PI * 2) * 14]);
  points.push(...beatSpike(426, base, 96));
  for (const x of [476, 526, 576]) points.push(...beatSpike(x, base, 62));
  points.push([600, base]);
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y.toFixed(1)}`).join(' ');
}

const WAVE = buildWave();

function PadWave() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const path = root.current.querySelector('.wave-live');
      const length = path.getTotalLength();
      const dash = length * 0.22;
      gsap.set(path, { strokeDasharray: `${dash} ${length}` });
      gsap.fromTo(path, { strokeDashoffset: dash }, { strokeDashoffset: -length, duration: 3.6, ease: 'none', repeat: -1 });
      gsap.to('.wave-pulse', { opacity: 0.25, duration: 0.6, ease: 'power2.inOut', yoyo: true, repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg ref={root} viewBox="0 0 600 270" className="h-auto w-full" aria-hidden="true">
      <line x1="310" x2="310" y1="40" y2="210" stroke="#F0A64B" strokeOpacity="0.5" strokeDasharray="3 6" />
      <path d={WAVE} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" strokeLinejoin="round" />
      <path className="wave-live" d={WAVE} fill="none" stroke="#F0A64B" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle className="wave-pulse" cx="426" cy="34" r="6" fill="#F0A64B" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="17" fill="currentColor">
        <text x="14" y="244" fillOpacity="0.7">song in E</text>
        <text x="310" y="244" textAnchor="middle" fill="#F5B35E">pad E → A</text>
        <text x="586" y="244" textAnchor="end" fillOpacity="0.7">song in A</text>
        <text x="310" y="26" textAnchor="middle" fillOpacity="0.7">key change</text>
        <text x="440" y="40" fill="#F5B35E">on the 1</text>
      </g>
    </svg>
  );
}

/* ── Section ── */

const STEPS = [
  {
    n: '01',
    title: 'A time for every beat',
    body: 'Each tap is a beat, and Shift marks beat 1. A tap snaps onto the drum hit or strum it was reaching for. Gaps are spaced evenly, and the app can follow the recording for the rest, so a live take that drifts still lines up.',
    spec: 'beats: [3.2, 4.085, 4.97, …] · downbeats: [3.2, 6.74, …]',
    Art: BarClock,
    artWidth: 'max-w-[min(100%,46vh)]',
    surface: 'bg-cream text-navy',
    muted: 'text-smoke',
    accent: 'text-amber-deep',
    chip: 'border-navy/15',
  },
  {
    n: '02',
    title: 'Fade, pickup, then the 1',
    body: 'Each section’s fade-in finishes before its pickup, so the singers’ early notes play at full volume. Then the section lands on its bar’s 1.',
    spec: '{ name: Chorus 1, start_bar: 21, pickup_beats: 1, fade_in: 1 }',
    Art: ScanGrid,
    artWidth: 'max-w-[min(100%,62vh)]',
    surface: 'on-dark bg-navy text-cream',
    muted: 'text-mist',
    accent: 'text-amber-text',
    chip: 'border-cream/20',
  },
  {
    n: '03',
    title: 'Pads move in 4ths',
    body: 'When a song ends, a pad in the key it ended in keeps sounding. Sets suggests a way into the next song’s key, moving around the circle of 4ths when the keys are close, and Simple mode walks it one pad every 4 bars. Then the next song comes in on the bar.',
    spec: 'live pad: E → A · way in: E, A',
    Art: PadWave,
    artWidth: 'max-w-[min(100%,70vh)]',
    surface: 'on-dark bg-panel text-cream bg-[radial-gradient(60%_50%_at_70%_45%,rgb(240_166_75/0.12),transparent)]',
    muted: 'text-mist',
    accent: 'text-amber-text',
    chip: 'border-cream/20',
  },
];

// Room the card frame takes around its content: the article's padding plus the panel's.
const FRAME = 120;

export default function Protocol() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [fits, setFits] = useState(true);
  const stack = fits && !reduced;

  // Pinned cards are one screen tall. If any card's content is taller (a short screen, or zoomed text),
  // skip the stacking and let the cards scroll, so nothing is cut off. Only width changes re-check,
  // so a phone's address bar sliding in and out never rebuilds the pins mid-scroll.
  useEffect(() => {
    const check = () =>
      setFits([...root.current.querySelectorAll('.card-content')].every(el => el.offsetHeight + FRAME <= window.innerHeight));
    const frame = requestAnimationFrame(check);
    document.fonts?.ready.then(check);
    let width = window.innerWidth;
    let timer;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(check, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Each card pins as it reaches the top; the next slides over it while it sinks back, blurs and dims.
  useEffect(() => {
    if (!stack) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      const last = cards[cards.length - 1];
      cards.forEach((card, i) => {
        if (card === last) return;
        ScrollTrigger.create({ trigger: card, start: 'top top', endTrigger: last, end: 'top top', pin: true, pinSpacing: false });
        gsap.to(card.querySelector('.card-inner'), {
          scale: 0.9,
          filter: 'blur(20px)',
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [stack]);

  return (
    <section id="how" ref={root} className="on-dark relative bg-midnight text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8 md:pb-16 md:pt-32">
        <p className="caps text-amber-text">How it works</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">Three rules it plays by.</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
          Under every screen sit three small rules about time and key. They&rsquo;re why a section lands where you
          expect it to.
        </p>
      </div>

      {STEPS.map(({ n, title, body, spec, Art, artWidth, surface, muted, accent, chip }, i) => (
        <article
          key={n}
          className={`protocol-card relative flex p-3 md:p-5 ${stack ? 'h-screen' : 'min-h-screen'}`}
          style={{ zIndex: i + 1 }}
        >
          <div
            className={`card-inner flex flex-1 flex-col justify-center overflow-hidden rounded-[2.5rem] px-6 py-10 will-change-transform md:rounded-[3rem] md:px-16 ${surface}`}
          >
            <div className="card-content mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="order-2 md:order-1">
                <p className={`font-mono text-sm ${accent}`}>
                  {n} <span className="opacity-60">/ 03</span>
                </p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">{title}</h3>
                <p className={`mt-4 max-w-md text-base leading-relaxed md:mt-6 md:text-lg ${muted}`}>{body}</p>
                <p className={`mt-5 inline-block max-w-full break-words rounded-2xl border ${chip} px-3 py-1.5 font-mono text-[11px] md:mt-8 md:text-xs ${muted}`}>
                  {spec}
                </p>
              </div>
              <div className={`order-1 mx-auto w-full md:order-2 ${artWidth}`}>
                <Art />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
