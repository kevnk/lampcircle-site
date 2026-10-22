import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../site';
import { SoundBars } from './ui';

/* ── Card 1: Tap the beat ── three stacked cards that shuffle every 3 seconds. */

const TAP_CARDS = [
  { id: 'tap', label: 'Beat 1 tapped', chip: 'Shift+Space', title: 'Bar 17', meta: '0:57 · beat 1' },
  { id: 'section', label: 'Section marked', chip: '4', title: 'Chorus 1', meta: 'from bar 21' },
  { id: 'map', label: 'After 8 taps', chip: 'Tempo', title: '72.0 BPM', meta: 'from your taps' },
];

function TapVisual({ id }) {
  if (id === 'tap') {
    return (
      <div className="flex h-9 items-end gap-[5px]" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            className={`w-1.5 rounded-full ${i % 4 ? 'h-[40%] bg-navy/20' : i === 12 ? 'h-full bg-amber shadow-glow' : 'h-full bg-amber/60'}`}
          />
        ))}
      </div>
    );
  }
  if (id === 'section') {
    return (
      <div className="flex h-8 gap-1 text-[10px] font-semibold" aria-hidden="true">
        <span className="flex flex-[5] items-center justify-center rounded-full bg-shade-light">Intro</span>
        <span className="flex flex-[12] items-center justify-center rounded-full bg-shade-mid">Verse 1</span>
        <span className="flex flex-[8] items-center justify-center rounded-full bg-navy text-cream ring-2 ring-amber">
          Chorus 1
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center text-[12px] font-bold">
      <span className="rounded-full px-3.5 py-2 ring-2 ring-amber">Map the rest from the song</span>
    </div>
  );
}

function TapShuffler() {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(TAP_CARDS.map(card => card.id));

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setOrder(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative h-full">
      {TAP_CARDS.map(card => {
        const depth = order.indexOf(card.id);
        return (
          <div
            key={card.id}
            className="absolute inset-x-0 bottom-0 flex h-[11rem] flex-col justify-between rounded-[2rem] border border-navy/10 bg-paper p-5 shadow-card"
            style={{
              zIndex: 3 - depth,
              transform: `translateY(${-depth * 20}px) scale(${1 - depth * 0.06})`,
              transformOrigin: '50% 0%',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="caps text-smoke">{card.label}</span>
              <span className="rounded-full border border-navy/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                {card.chip}
              </span>
            </div>
            <p className="flex items-baseline gap-3">
              <span className="whitespace-nowrap text-[1.7rem] font-extrabold tracking-tight">{card.title}</span>
              <span className="font-mono text-xs text-smoke">{card.meta}</span>
            </p>
            <TapVisual id={card.id} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Card 2: Prep every landing ── a live feed typed out a character at a time. */

const FEED = [
  'Verse 1 → lands on bar 5, beat 1',
  '  pickup 1 beat · fade in 1 beat',
  'Chorus 1 → lands on bar 21, beat 1',
  '  repeats ×2 · jump at end of phrase',
  'Bridge → lands on bar 53, beat 1',
  '  fade out 2 beats · ends on the 1',
  'Tag → lands on bar 77, beat 1',
  '  repeats ×3 · fade out 4 beats',
];

function PrepFeed() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState([]);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    if (reduced) return;
    let line = 0;
    let char = 0;
    let timer;
    const tick = () => {
      const text = FEED[line % FEED.length];
      if (char <= text.length) {
        setTyping(text.slice(0, char++));
        timer = setTimeout(tick, 26 + Math.random() * 38);
      } else {
        setDone(prev => [...prev, text].slice(-4));
        setTyping('');
        line++;
        char = 0;
        timer = setTimeout(tick, 650);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduced]);

  const lines = reduced ? FEED.slice(2, 6) : done;

  return (
    <div className="on-dark flex h-full flex-col rounded-[2rem] bg-midnight p-5 text-cream">
      <div className="flex items-center justify-between">
        <span className="caps flex items-center gap-2.5 text-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          Live feed
        </span>
        <span className="font-mono text-[11px] text-mist">way-maker.djw</span>
      </div>
      <p className="sr-only">Example prep notes: {FEED.join('. ')}.</p>
      <div className="mt-auto space-y-1 font-mono text-[12px] leading-5" aria-hidden="true">
        {lines.map((text, i) => (
          <p key={`${text}-${i}`} className="whitespace-pre-wrap text-mist" style={{ opacity: 0.75 + (i / lines.length) * 0.25 }}>
            {text}
          </p>
        ))}
        {!reduced && (
          <p className="whitespace-pre-wrap text-cream">
            {typing}
            <span className="blink ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[3px] bg-amber" />
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Card 3: Perform the set ── in the gap after a song, a cursor taps the next key's pad, it comes in on the
   next bar, then the cursor starts the next song. */

// Key names as the app spells them, in circle-of-4ths order.
const CIRCLE_OF_FOURTHS = ['C', 'F', 'Bb', 'Eb', 'G#', 'C#', 'F#', 'B', 'E', 'A', 'D', 'G'];
const PAD_MODES = ['Simple', 'Guided', 'Advanced'];

function PadScheduler() {
  const root = useRef(null);
  const cursor = useRef(null);
  const reduced = useReducedMotion();
  // The gap keeps the key the last song ended in; the pad sounding moves on within it.
  const [left, setLeft] = useState('E');
  const [playing, setPlaying] = useState('E');
  const [pressed, setPressed] = useState(null);
  // With less motion, hold one still frame: E sounding, A tapped.
  const from = reduced ? 'E' : left;
  const now = reduced ? 'E' : playing;
  const queued = reduced ? 'A' : pressed;
  const nextKey = CIRCLE_OF_FOURTHS[(CIRCLE_OF_FOURTHS.indexOf(from) + 1) % 12];

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      let at = CIRCLE_OF_FOURTHS.indexOf('E');
      const to = () => CIRCLE_OF_FOURTHS[(at + 1) % 12];
      const pad = () => root.current.querySelector(`[data-pad="${to()}"]`);
      const start = root.current.querySelector('[data-start]');
      const point = (el, axis) => {
        const box = root.current.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return axis === 'x' ? r.left - box.left + r.width * 0.55 : r.top - box.top + r.height * 0.55;
      };
      // One timeline replayed for each song; repeatRefresh re-reads the next pad's position every round.
      gsap
        .timeline({ repeat: -1, repeatRefresh: true, onRepeat: () => (at = (at + 1) % 12) })
        .call(() => {
          setLeft(CIRCLE_OF_FOURTHS[at]);
          setPlaying(CIRCLE_OF_FOURTHS[at]);
          setPressed(null);
        })
        .set(cursor.current, { x: () => root.current.offsetWidth + 12, y: () => root.current.offsetHeight * 0.45, opacity: 0, scale: 1 })
        .to(cursor.current, { opacity: 1, duration: 0.3 }, 0.5)
        .to(cursor.current, { x: () => point(pad(), 'x'), y: () => point(pad(), 'y'), duration: 1.1, ease: 'power2.inOut' }, '<')
        .to(cursor.current, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 })
        .call(() => setPressed(to()), null, '<')
        .to(cursor.current, { x: () => point(start, 'x'), y: () => point(start, 'y'), duration: 0.9, ease: 'power2.inOut' }, '+=0.45')
        // A tapped pad comes in on the next bar by itself, while the cursor heads for Start.
        .call(
          () => {
            setPlaying(to());
            setPressed(null);
          },
          null,
          '-=0.3',
        )
        .to(cursor.current, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 })
        .to(start, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }, '<')
        .to(cursor.current, { opacity: 0, duration: 0.4 }, '+=0.5')
        .to({}, { duration: 1.1 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className="relative flex h-full flex-col rounded-[2rem] border border-navy/10 bg-paper p-4 sm:p-5">
      <div className="flex gap-1 rounded-full bg-navy/[0.06] p-1 text-[11px] font-semibold" aria-hidden="true">
        {PAD_MODES.map(name => (
          <span
            key={name}
            className={`flex-1 rounded-full py-1.5 text-center ${name === 'Advanced' ? 'bg-amber/15 text-amber-deep ring-1 ring-amber' : 'text-smoke'}`}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="caps text-smoke">Live pad</span>
        <span className="font-mono text-[11px] text-navy">
          {from} → {nextKey}
        </span>
      </div>

      <p className="sr-only">
        Example: a song in E has ended and its pad is sounding. The next song is in A, one step around the circle of
        4ths. Tap the A pad and it comes in on the next bar, then start the next song on the next bar.
      </p>
      <div className="mt-2 grid grid-cols-6 gap-1.5" aria-hidden="true">
        {CIRCLE_OF_FOURTHS.map(key => (
          <span
            key={key}
            data-pad={key}
            className={`flex h-10 items-center justify-center rounded-full text-[13px] font-bold transition-[background-color,box-shadow,color] duration-300 ${
              key === now
                ? 'bg-amber text-navy shadow-glow'
                : key === queued
                  ? 'press bg-paper text-navy ring-2 ring-amber'
                  : 'bg-navy/[0.05] text-navy/70 ring-1 ring-navy/10'
            }`}
          >
            {key}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2" aria-hidden="true">
        <SoundBars mode={reduced ? 'still' : 'beat'} className="h-6" barClassName="w-[5px] bg-navy" />
        <span data-start className="whitespace-nowrap rounded-full bg-navy px-3.5 py-2.5 text-[12px] font-bold text-cream">
          Start Intro on next bar
        </span>
      </div>

      <svg
        ref={cursor}
        className="pointer-events-none absolute left-0 top-0 h-6 w-6 opacity-0 drop-shadow"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4 2l15 9.5-6.6 1.4 3.6 7.4-2.8 1.3-3.5-7.4L4 18.5z" fill="#10283A" stroke="#F6ECDD" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Section ── */

const CARDS = [
  {
    step: '01 · Map Song',
    title: 'Tap the beat',
    body: 'Play a song and press Space on every beat, with Shift+Space on beat 1. After 8 taps, Lamp Circle can follow the recording for the rest. Then press 1 to 8 as each section starts. It snaps to the nearest bar, and the app finds its key.',
    Demo: TapShuffler,
  },
  {
    step: '02 · Transitions + Export',
    title: 'Prep every landing',
    body: 'Give each section a pickup for singers who come in early, fades at its loop point, a repeat count, and a rule for when a jump lands: next beat, next bar, end of phrase or end of section. Audition the loop, then save the map as a .djw.',
    Demo: PrepFeed,
  },
  {
    step: '03 · Sets + Perform',
    title: 'Perform the set',
    body: 'Put ready songs in order. Each gap gets a live pad and a suggested way into the next key, or pads you pick. In Perform, number keys queue sections and H holds one. When a song ends, the pad plays on until you start the next song on the bar.',
    Demo: PadScheduler,
  },
];

export default function Features() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.features-head > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.features-head', start: 'top 80%' },
      });
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.feature-grid', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="features" ref={root} className="bg-paper px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="features-head max-w-2xl">
          <p className="caps text-amber-deep">What it does</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">Tap. Prep. Perform.</h2>
          <p className="mt-5 text-lg leading-relaxed text-smoke">
            Three steps, in the order you&rsquo;ll use them. Map a song once and it&rsquo;s ready for every set
            after.
          </p>
        </div>

        <div className="feature-grid mt-14 grid gap-6 md:mt-20 lg:grid-cols-3">
          {CARDS.map(({ step, title, body, Demo }) => (
            <article
              key={title}
              className="feature-card flex flex-col rounded-[2rem] border border-navy/10 bg-cream p-5 shadow-card md:p-6"
            >
              <div className="h-[15rem]">
                <Demo />
              </div>
              <p className="mt-7 font-mono text-xs text-amber-deep">{step}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-smoke">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
