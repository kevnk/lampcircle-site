import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IMAGES, useReducedMotion } from '../site';

function Words({ text, className = '' }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      <span className={`word inline-block ${className}`}>{word}</span>{' '}
    </Fragment>
  ));
}

export default function Manifesto() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-bg',
        { yPercent: -10 },
        { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
      gsap
        .timeline({ scrollTrigger: { trigger: '.manifesto-text', start: 'top 75%' } })
        .from('.line-quiet .word', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.04 })
        .from('.line-loud .word', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, '-=0.3')
        .from('.line-note', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4');
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="why" ref={root} className="on-dark relative overflow-hidden bg-midnight px-5 py-32 text-cream sm:px-8 md:py-48">
      <div className="manifesto-bg absolute inset-x-0 -top-[15%] h-[130%]">
        <img src={IMAGES.floor.src} alt={IMAGES.floor.alt} loading="lazy" className="h-full w-full object-cover opacity-25" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/70 to-midnight" />

      <div className="manifesto-text relative mx-auto max-w-6xl">
        <p className="caps text-amber-text">Why Lamp Circle</p>
        <p className="line-quiet mt-8 max-w-3xl text-xl font-medium leading-snug text-mist md:text-3xl">
          <Words text="Most worship tech focuses on the stage: click tracks, in-ear mixes, a band that rehearsed." />
        </p>
        <p className="line-loud mt-8 font-drama text-[clamp(3rem,11vw,9rem)] italic leading-[0.95] md:mt-12">
          <Words text="We focus on the" /> <Words text="living room." className="text-amber" />
        </p>
        <p className="line-note mt-10 max-w-xl text-base leading-relaxed text-mist md:mt-14 md:text-lg">
          One guitar, a few friends, and a song somebody asks for. Lamp Circle reads at a glance in a dim room, so
          your eyes stay on the people, and a pad keeps sounding when the song ends.
        </p>
      </div>
    </section>
  );
}
