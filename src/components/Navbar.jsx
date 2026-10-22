import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { DOWNLOAD_URL } from '../site';
import { Button, GithubLink } from './ui';

const LINKS = [
  { href: '#features', label: 'Tap · Map · Worship' },
  { href: '#why', label: 'Why' },
  { href: '#how', label: 'How it works' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Clear over the hero; once the hero is behind the bar, it frosts to cream with navy text.
  useEffect(() => {
    const hero = document.getElementById('top');
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: '-88px 0px 0px 0px',
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-s5 z-50 flex justify-center px-s5 md:top-s6">
      <nav
        aria-label="Main"
        className={`flex w-full max-w-4xl items-center justify-between gap-s4 rounded-full border py-s4 pl-s5 pr-s4 leading-snug sm:gap-s5 transition-[background-color,color,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-navy/10 bg-paper/60 text-navy shadow-card backdrop-blur-xl'
            : 'on-dark border-transparent bg-transparent text-cream'
        }`}
      >
        {/* On a narrow phone the wordmark stacks to two lines rather than push the button out. */}
        <a href="#top" className="lift flex items-center gap-s4" aria-label="Lamp Circle, back to top">
          <img src="/brand/mark.webp" alt="" width="480" height="380" className="h-8 w-auto" />
          <span className="tracking-[0.16em] max-[389px]:sr-only">
            <span className="font-extrabold">LAMP</span> <span className="font-light">CIRCLE</span>
          </span>
        </a>

        <ul className="hidden items-center gap-s6 font-semibold md:flex">
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="lift inline-block opacity-80 hover:opacity-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center sm:gap-s2">
          <GithubLink className="h-9 w-9 opacity-80 hover:opacity-100 sm:h-10 sm:w-10" />
          <Button href={DOWNLOAD_URL} size="sm">
            <Download size={15} strokeWidth={2.5} aria-hidden="true" />
            <span>
              Download<span className="sr-only sm:not-sr-only"> for Mac</span>
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
