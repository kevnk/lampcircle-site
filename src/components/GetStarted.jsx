import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, Download } from 'lucide-react';
import { DOWNLOAD_URL, IMAGES, RELEASES_URL, useReducedMotion } from '../site';
import { Button } from './ui';

const POINTS = [
  'Free, for Mac',
  'Your songs and maps stay on your Mac',
  'Maps save as small .djw files, with no audio inside',
  'Pads in all 12 keys for the space between songs',
];

// The shape of a real map: one time per bar, and each part's landing.
const DJW = [
  ['djw', '1'],
  ['song', ''],
  ['  title', 'Way Maker'],
  ['  meter', '4/4'],
  ['grid', ''],
  ['  downbeats', '[3.20, 6.74, …]'],
  ['parts', ''],
  ['  - name', 'Chorus 1'],
  ['    start_bar', '21'],
  ['    pickup_beats', '1'],
  ['    fade_in', '1'],
  ['    fade_out', '2'],
];

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
    <section id="download" ref={root} className="bg-paper px-4 py-24 sm:px-8 md:py-36">
      <div className="on-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy text-cream shadow-card md:rounded-[3rem]">
        <img src={IMAGES.guitar.src} alt={IMAGES.guitar.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />

        <div className="relative grid gap-12 px-6 py-14 sm:px-10 md:grid-cols-[1.15fr_1fr] md:items-center md:px-16 md:py-20">
          <div>
            <p className="gs-in caps text-amber-text">Get started</p>
            <h2 className="gs-in mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Map one song <span className="font-drama font-normal italic text-amber">tonight.</span>
            </h2>
            <p className="gs-in mt-5 max-w-lg text-lg leading-relaxed text-cream/80">
              Download Lamp Circle and import a song you lead often. Play it through once, tapping the 1 of each bar and
              pressing a section key as each part starts. When it ends, the song is mapped.
            </p>
            <ul className="mt-8 space-y-3">
              {POINTS.map(point => (
                <li key={point} className="gs-in flex items-start gap-3 text-[15px]">
                  <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="gs-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={DOWNLOAD_URL} size="lg">
                <Download size={20} strokeWidth={2.5} aria-hidden="true" />
                Download for Mac
              </Button>
              <a href={RELEASES_URL} className="lift text-sm font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline">
                All releases on GitHub
              </a>
            </div>
          </div>

          <figure className="gs-in rounded-[2rem] bg-midnight/85 p-5 ring-1 ring-cream/10 backdrop-blur md:p-6">
            <figcaption className="flex items-center justify-between gap-3 font-mono text-[11px] text-mist">
              <span>way-maker.djw</span>
              <span>YAML · no audio</span>
            </figcaption>
            <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-6">
              <code>
                {DJW.map(([key, value]) => (
                  <span key={key} className="block">
                    <span className="text-amber-text">{key}:</span>
                    {value && <span className="text-cream/90"> {value}</span>}
                  </span>
                ))}
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </section>
  );
}
