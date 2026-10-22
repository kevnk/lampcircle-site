import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Play } from 'lucide-react';
import { useReducedMotion } from '../site';

const LOOM_ID = '9d9ed6224d9549be8fcb4d0cee6c2b87';
const SHARE_URL = `https://www.loom.com/share/${LOOM_ID}`;
// hideEmbedTopBar drops Loom's title, owner and share bar; the heading above already says what this is.
const EMBED_URL = `https://www.loom.com/embed/${LOOM_ID}?autoplay=1&hideEmbedTopBar=true`;
// Loom's still of the first frame. The video is about 16:10, so it sits uncropped in the 16:9 frame
// with thin dark bars at the sides, the same way Loom's player shows it.
const POSTER = `https://cdn.loom.com/sessions/thumbnails/${LOOM_ID}-5139b4f758a37163.jpg`;

// Keyboard users land in the player once it replaces the button. Defined once, so React calls it only on mount.
const focusOnMount = el => el?.focus();

export default function Walkthrough() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.walk-in', {
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

  // No top padding: it follows Features on the same paper, whose bottom padding is the gap.
  return (
    <section id="walkthrough" ref={root} className="scroll-mt-s9 bg-paper px-s6 pb-s9 sm:px-s7 md:pb-half-s11">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="walk-in caps text-amber-deep">Walkthrough</p>
          <h2 className="walk-in mt-s5 text-t2 font-extrabold leading-tight tracking-tight md:text-t3">
            See the whole app <span className="font-drama font-normal italic text-amber-deep">before you download.</span>
          </h2>
          <p className="walk-in mt-s6 text-smoke">
            Kevin, who made Lamp Circle, walks through every part of the app and shows how to use it. Watch it all, or
            skip to the part you need.
          </p>
        </div>

        <figure className="walk-in mt-s8">
          {/* The radius lives here and the button inherits it, so the button's focus ring isn't clipped. */}
          <div className="relative aspect-video rounded-[2rem] bg-midnight shadow-card md:rounded-[2.5rem]">
            {playing ? (
              <iframe
                ref={focusOnMount}
                src={EMBED_URL}
                title="Lamp Circle walkthrough video"
                allow="fullscreen; autoplay"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[inherit]"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the Lamp Circle walkthrough, 28 minutes"
                className="group absolute inset-0 overflow-hidden rounded-[inherit]"
              >
                <img
                  src={POSTER}
                  alt="Lamp Circle's Library screen, with Kevin on camera in the lower corner."
                  width="1148"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
                <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber text-navy shadow-glow transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110 md:h-20 md:w-20">
                  <Play size={28} strokeWidth={2.5} fill="currentColor" className="ml-s1" aria-hidden="true" />
                </span>
                <span className="absolute bottom-s5 right-s5 rounded-full bg-midnight/80 px-s4 py-s2 font-semibold leading-snug text-cream md:bottom-s6 md:right-s6">
                  28:34
                </span>
              </button>
            )}
          </div>

          <figcaption className="mt-s5 flex flex-wrap items-center justify-between gap-x-s6 gap-y-s4 leading-snug text-smoke">
            <span>28 minutes · recorded October 2026</span>
            <a
              href={SHARE_URL}
              target="_blank"
              rel="noopener"
              className="lift inline-flex items-center gap-s3 font-semibold text-navy underline-offset-4 hover:underline"
            >
              Watch on Loom
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
