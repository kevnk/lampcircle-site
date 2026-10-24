import { DOWNLOAD_URL, RELEASES_URL, REPO_URL, trackEvent } from '../site';
import { GithubLink } from './ui';

const COLUMNS = [
  {
    title: 'The app',
    links: [
      { href: '#features', label: 'What it does' },
      { href: '#why', label: 'Why Lamp Circle' },
      { href: '#how', label: 'How it works' },
      { href: '#download', label: 'Get started' },
    ],
  },
  {
    title: 'Get it',
    links: [
      { href: DOWNLOAD_URL, label: 'Download for Mac', event: 'download_dmg_click' },
      { href: RELEASES_URL, label: 'All releases' },
      { href: REPO_URL, label: 'Lamp Circle on GitHub' },
    ],
  },
];

const FINE_PRINT = [
  'Free to download and use.',
  'Lamp Circle comes with no songs or pads. You add your own audio files, or paste YouTube links.',
  'YouTube links need a one-time extra install on your Mac. If it’s missing, the app tells you how to add it.',
  'Maps hold timing and sections, never audio.',
];

export default function Footer() {
  return (
    <footer className="on-dark rounded-t-[4rem] bg-midnight px-s6 pb-s7 pt-s8 text-cream sm:px-s7 md:pt-half-s10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-s7 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <img src="/brand/logo-dark.webp" alt="Lamp Circle" width="600" height="376" loading="lazy" className="h-24 w-auto" />
            <p className="mt-s6 max-w-xs text-mist">
              Live song maps for home-church and living-room worship.
            </p>
            <p className="mt-s6 inline-flex items-center gap-s4 rounded-full border border-line bg-panel px-s5 py-s4 font-medium leading-snug text-cream/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Lamp lit · ready for the next set
            </p>
          </div>

          {COLUMNS.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <p className="caps text-mist">{column.title}</p>
              <ul className="mt-s6 space-y-s5 font-medium leading-snug">
                {column.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.event && (() => trackEvent(link.event))}
                      className="lift inline-block text-cream/85 hover:text-amber-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="caps text-mist">Fine print</p>
            <ul className="mt-s6 space-y-s4 text-cream/70">
              {FINE_PRINT.map(line => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-s8 flex flex-col gap-s4 border-t border-line pt-s6 leading-snug text-mist sm:flex-row sm:justify-between">
          <p>© 2026 Lamp Circle</p>
          <div className="flex items-center gap-s4">
            <p>Made for small rooms.</p>
            <GithubLink className="-my-s4 h-10 w-10 text-cream/85 hover:text-amber-text" />
          </div>
        </div>
      </div>
    </footer>
  );
}
