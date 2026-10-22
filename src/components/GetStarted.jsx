import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, Download } from 'lucide-react';
import { DOWNLOAD_URL, IMAGES, RELEASES_URL, useReducedMotion } from '../site';
import { Button } from './ui';

const POINTS = [
  'Free, for macOS 12 or later',
  'Your songs and maps stay on your Mac',
  'Maps save as small .djw files with no audio. A map of a YouTube song fetches the audio when you import it',
  'One button downloads pads in all 12 keys for the space between songs',
];

// A real map as the app writes it, cut short: a time for every beat and bar, and how each section lands.
const DJW = `djw: 2
song:
  title: Way Maker
  artist: Leeland
  meter: 4/4
  audio:
    source: https://www.youtube.com/watch?v=iJCV_2H9xD0
grid:
  beats:
    - 3.2
    - 4.085
    # … every beat
  downbeats:
    - 3.2
    - 6.74
    # … every bar
sections:
  # …
  - name: Chorus 1
    type: chorus
    start_bar: 21
    end_bar: 29
    key: E
    pickup_beats: 1
    fade_in: 1
    fade_out: 2
    repeats: 2
    jump_at: phrase`.split('\n');

/** One YAML line: keys in amber, values in cream, comments dimmed. */
function DjwLine({ line }) {
  const [, indent, dash, rest] = line.match(/^(\s*)(- )?(.*)$/);
  if (rest.startsWith('#')) return <span className="block text-mist">{line}</span>;
  const colon = rest.indexOf(':');
  return (
    <span className="block">
      {indent}
      {dash && <span className="text-mist">{dash}</span>}
      {colon < 0 ? (
        <span className="text-cream/90">{rest}</span>
      ) : (
        <>
          <span className="text-amber-text">{rest.slice(0, colon + 1)}</span>
          <span className="text-cream/90">{rest.slice(colon + 1)}</span>
        </>
      )}
    </span>
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
      <div className="on-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy text-cream shadow-card md:rounded-[3rem]">
        <img src={IMAGES.guitar.src} alt={IMAGES.guitar.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />

        <div className="relative grid gap-s7 px-s6 py-half-s9 sm:px-s7 md:grid-cols-[1.15fr_1fr] md:items-center md:px-s8 md:py-half-s10">
          <div>
            <p className="gs-in caps text-amber-text">Get started</p>
            <h2 className="gs-in mt-s5 text-t2 font-extrabold leading-tight tracking-tight md:text-t3">
              Map one song <span className="font-drama font-normal italic text-amber">tonight.</span>
            </h2>
            <p className="gs-in mt-s6 max-w-lg text-cream/80">
              Download Lamp Circle and add a song you lead often: paste a YouTube link or drop in an audio file. Tap 8
              beats or more, let the app map the rest, and press 1 to 8 as each section starts. Shape the transitions,
              save the .djw, and the song is ready for a set.
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
              <Button href={DOWNLOAD_URL} size="lg">
                <Download size={20} strokeWidth={2.5} aria-hidden="true" />
                Download for Mac
              </Button>
              <a href={RELEASES_URL} className="lift font-semibold leading-snug text-cream/80 underline-offset-4 hover:text-cream hover:underline">
                All releases on GitHub
              </a>
            </div>
          </div>

          <figure className="gs-in min-w-0 rounded-[2rem] bg-midnight/85 px-s6 py-half-s7 ring-1 ring-cream/10 backdrop-blur md:py-s6">
            <figcaption className="flex items-center justify-between gap-s5 font-mono leading-snug text-mist">
              <span>way-maker.djw</span>
              <span>YAML · no audio</span>
            </figcaption>
            <pre className="mt-s5 overflow-x-auto font-mono">
              <code>
                {DJW.map((line, i) => (
                  <DjwLine key={i} line={line} />
                ))}
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </section>
  );
}
