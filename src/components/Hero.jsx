import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Download } from 'lucide-react';
import { DOWNLOAD_URL, IMAGES, useReducedMotion } from '../site';
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

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 md:pb-20">
        <p className="hero-in caps flex items-center gap-3 text-amber-text">
          <SoundBars mode="breathe" className="h-3.5" />
          Live song maps · Free for Mac
        </p>

        <h1 className="mt-5">
          <span className="hero-in block text-[1.9rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Living-room worship meets
          </span>
          <span className="hero-in -ml-1 block font-drama text-[clamp(3.9rem,16vw,12rem)] italic leading-[0.9] text-cream md:-ml-2">
            the downbeat.
          </span>
        </h1>

        <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
          Lamp Circle is a free Mac app for leading worship in a small room. Tap the 1 while a song plays and
          mark its sections. Every part then lands on its bar&rsquo;s 1, and key pads carry you from one song to
          the next.
        </p>

        <div className="hero-in mt-8 flex flex-wrap items-center gap-3">
          <Button href={DOWNLOAD_URL}>
            <Download size={18} strokeWidth={2.5} aria-hidden="true" />
            Download for Mac
          </Button>
          <Button href="#how" variant="ghost">
            See how it works
            <ArrowDown size={16} strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
