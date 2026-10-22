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
    <section id="why" ref={root} className="on-dark relative overflow-hidden bg-midnight px-s6 py-double-s8 text-cream sm:px-s7 md:py-double-s9">
      <div className="manifesto-bg absolute inset-x-0 -top-[15%] h-[130%]">
        <img src={IMAGES.floor.src} alt={IMAGES.floor.alt} loading="lazy" className="h-full w-full object-cover opacity-25" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/70 to-midnight" />

      <div className="manifesto-text relative mx-auto max-w-6xl">
        <p className="caps text-amber-text">Why Lamp Circle</p>
        <p className="line-quiet mt-s7 max-w-3xl font-medium leading-read text-mist md:text-t1">
          <Words text="Most worship tech focuses on the stage: click tracks, in-ear mixes, a band that rehearsed." />
        </p>
        <p className="line-loud mt-s7 text-balance font-drama text-[clamp(theme(fontSize.t2),11vw,theme(fontSize.t4))] italic leading-tight">
          <Words text="We focus on the" /> <Words text="living room." className="text-amber" />
        </p>
        <p className="line-note mt-s7 max-w-xl text-mist md:mt-s8">
          One guitar, a few friends, and a song somebody asks for. Lamp Circle reads at a glance in a dim room, so
          your eyes stay on the people, and a pad keeps sounding when the song ends.
        </p>
      </div>
    </section>
  );
}
