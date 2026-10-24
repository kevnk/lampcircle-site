import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Download, CirclePlay } from 'lucide-react';
import { DOWNLOAD_URL, IMAGES, trackEvent, useReducedMotion } from '../site';
import { Button, SoundBars } from './ui';

export default function Hero() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-in', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.15 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="on-dark relative flex h-[100dvh] min-h-[600px] items-end overflow-hidden bg-midnight text-cream"
    >
      <img
        src={IMAGES.hero.src}
        srcSet={IMAGES.hero.srcSet}
        sizes="100vw"
        alt={IMAGES.hero.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[35%_50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-midnight/85 to-navy/30" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-s6 pb-half-s9 sm:px-s7 md:pb-half-s10">
        <p className="hero-in caps flex items-center gap-s4 text-amber-text">
          <SoundBars mode="breathe" className="h-3.5" />
          Live song maps · Free for Mac
        </p>

        {/* The sans line stops at t2 so the serif line, up to t5, stays about 4× larger. */}
        <h1 className="mt-s6">
          <span className="hero-in block text-t1 font-extrabold leading-tight tracking-tight sm:text-t2">
            Living-room worship meets
          </span>
          <span className="hero-in -ml-s2 block font-drama text-[clamp(theme(fontSize.t3),16vw,theme(fontSize.t5))] italic leading-tight text-cream md:-ml-s4">
            the downbeat.
          </span>
        </h1>

        <p className="hero-in mt-s6 max-w-xl text-cream/80">
          Lamp Circle is a free Mac app for leading worship in a small room. Tap the beat while a song plays and
          mark its sections. Every section then lands on its bar&rsquo;s 1, and a live pad carries you from one
          song to the next.
        </p>

        <div className="hero-in mt-s7 flex flex-wrap items-center gap-s5">
          <Button href={DOWNLOAD_URL} onClick={() => trackEvent('download_dmg_click')}>
            <Download size={18} strokeWidth={2.5} aria-hidden="true" />
            Download for Mac
          </Button>
          <Button href="#how" variant="ghost">
            See how it works
            <ArrowDown size={16} strokeWidth={2.5} aria-hidden="true" />
          </Button>
          {/* Shown only where it fits beside the buttons. Narrower, it wraps to its own line and pushes the headline up under the nav. */}
          <a
            href="#walkthrough"
            className="lift hidden items-center gap-s3 font-semibold leading-snug text-cream/80 underline-offset-4 hover:text-cream hover:underline lg:inline-flex"
          >
            <CirclePlay size={18} strokeWidth={2.5} aria-hidden="true" />
            Watch the walkthrough · 28 min
          </a>
        </div>
      </div>
    </section>
  );
}
