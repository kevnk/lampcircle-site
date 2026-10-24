import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, Download, Repeat } from 'lucide-react';
import { DOWNLOAD_URL, RELEASES_URL, trackEvent, useReducedMotion } from '../site';
import { Button, SoundBars } from './ui';

const POINTS = [
  'Free, for macOS 12 or later',
  'Your songs and maps stay on your Mac',
  'Hold, repeat or jump to any section while you lead',
  'One button downloads pads in all 12 keys for the space between songs',
];

// Way Maker's sections, as the sample map marks them. Number keys 1 to 8 pick them in Worship.
const SECTIONS = ['Intro', 'Verse 1', 'Chorus 1', 'Verse 2', 'Chorus 2', 'Bridge', 'Chorus 3', 'Tag'];

// Four moments in Worship: the chorus plays its 2 passes, you hold it, you pick the bridge, the bridge comes in.
const MOMENTS = [
  { playing: 2, badge: '1 of 2', note: 'Next: Chorus 1 again, then Verse 2' },
  { playing: 2, badge: 'Holding', hold: true, note: 'Chorus 1 loops until you pick a section or let go' },
  { playing: 2, next: 5, note: 'Next: Bridge, at the end of the phrase' },
  { playing: 5, note: 'Next: Chorus 3' },
];

/** A song map in Worship, stepping through the moments above. With less motion it holds on the hold. */
function SongMap() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setStep(prev => (prev + 1) % MOMENTS.length), 2800);
    return () => clearInterval(timer);
  }, [reduced]);

  const { playing, next, badge, hold, note } = MOMENTS[reduced ? 1 : step];

  return (
    <figure className="gs-in min-w-0 rounded-[2rem] bg-midnight/85 px-s6 py-half-s7 ring-1 ring-cream/10 backdrop-blur md:py-s6">
      <figcaption className="sr-only">
        Way Maker in Worship, with its eight sections from Intro to Tag. Chorus 1 plays twice. Hold it and it keeps
        looping. Pick the bridge and it comes in at the end of the phrase.
      </figcaption>
      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-s4 leading-snug">
          <span className="caps text-mist">Way Maker</span>
          <SoundBars mode={reduced ? 'still' : 'beat'} className="h-4" barClassName="bg-amber" />
        </div>
        <div className="mt-s4 flex flex-wrap items-center justify-between gap-x-s4 gap-y-s2 leading-snug">
          <p>
            Now: <b>{SECTIONS[playing]}</b>
          </p>
          {badge && (
            <span className="flex items-center gap-s3 rounded-full bg-amber/15 px-s4 py-s2 font-semibold text-amber-text">
              <Repeat size={14} strokeWidth={2.5} />
              {badge}
            </span>
          )}
        </div>

        <div className="mt-s5 grid grid-cols-2 gap-s3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
          {SECTIONS.map((name, i) => (
            <span
              key={name}
              className={`rounded-2xl px-s4 py-s3 font-semibold leading-snug transition-[background-color,box-shadow,color] duration-300 ${
                i === playing
                  ? 'bg-amber text-navy shadow-glow'
                  : i === next
                    ? 'bg-panel text-cream ring-2 ring-amber'
                    : 'bg-panel text-cream/80 ring-1 ring-line'
              }`}
            >
              <span className={`block ${i === playing ? 'text-navy/70' : 'text-mist'}`}>{i + 1}</span>
              {name}
            </span>
          ))}
        </div>

        <p key={note} className="rise mt-s5 min-h-[2.5em] leading-snug text-mist">
          {note}
        </p>
        <span
          className={`mt-s4 inline-block rounded-full border px-s5 py-s4 font-semibold leading-snug transition-colors duration-300 ${
            hold ? 'border-amber bg-amber/15 text-amber-text' : 'border-line text-cream/80'
          }`}
        >
          {hold ? 'Holding · let go' : 'Hold here'}
        </span>
      </div>
    </figure>
  );
}

export default function GetStarted() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.gs-in', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="download" ref={root} className="bg-paper px-s5 py-s9 sm:px-s7 md:py-half-s11">
      <div className="on-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy bg-[radial-gradient(60%_60%_at_80%_45%,rgb(240_166_75/0.14),transparent)] text-cream shadow-card md:rounded-[3rem]">
        <div className="relative grid gap-s7 px-s6 py-half-s9 sm:px-s7 md:grid-cols-[1.15fr_1fr] md:items-center md:px-s8 md:py-half-s10">
          <div>
            <p className="gs-in caps text-amber-text">Get started</p>
            <h2 className="gs-in mt-s5 text-t2 font-extrabold leading-tight tracking-tight md:text-t3">
              Map one song <span className="font-drama font-normal italic text-amber">tonight.</span>
            </h2>
            <p className="gs-in mt-s6 max-w-lg text-cream/80">
              Download Lamp Circle and add a song you lead often: paste a YouTube link or drop in an audio file. Tap 8
              beats or more, let the app map the rest, and press 1 to 8 as each section starts. Shape the transitions,
              save it, and the song is ready for a set.
            </p>
            <ul className="mt-s7 space-y-s4">
              {POINTS.map(point => (
                <li key={point} className="gs-in flex items-start gap-s4">
                  <Check size={18} strokeWidth={2.5} className="mt-s2 shrink-0 text-amber" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="gs-in mt-s7 flex flex-wrap items-center gap-x-s6 gap-y-s5">
              <Button href={DOWNLOAD_URL} size="lg" onClick={() => trackEvent('download_dmg_click')}>
                <Download size={20} strokeWidth={2.5} aria-hidden="true" />
                Download for Mac
              </Button>
              <a href={RELEASES_URL} className="lift font-semibold leading-snug text-cream/80 underline-offset-4 hover:text-cream hover:underline">
                All releases on GitHub
              </a>
            </div>
          </div>

          <SongMap />
        </div>
      </div>
    </section>
  );
}
