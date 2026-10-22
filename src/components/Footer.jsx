import { DOWNLOAD_URL, RELEASES_URL, REPO_URL } from '../site';
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
      { href: DOWNLOAD_URL, label: 'Download for Mac' },
      { href: RELEASES_URL, label: 'All releases' },
      { href: REPO_URL, label: 'Source on GitHub' },
    ],
  },
];

const FINE_PRINT = [
  'Free to download and use.',
  'Lamp Circle comes with no songs or pads. You add your own audio files, or paste YouTube links.',
  'YouTube downloads need yt-dlp and ffmpeg from Homebrew.',
  'Maps hold timing and sections, never audio.',
];

export default function Footer() {
  return (
    <footer className="on-dark rounded-t-[4rem] bg-midnight px-6 pb-10 pt-16 text-cream sm:px-10 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <img src="/brand/logo-dark.webp" alt="Lamp Circle" width="600" height="376" loading="lazy" className="h-24 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Live song maps for home-church and living-room worship.
            </p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2 font-mono text-[11px] text-cream/90">
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
              <ul className="mt-5 space-y-3 text-sm font-medium">
                {column.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="lift inline-block text-cream/85 hover:text-amber-text">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="caps text-mist">Fine print</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cream/70">
              {FINE_PRINT.map(line => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mist sm:flex-row sm:justify-between">
          <p>© 2026 Lamp Circle</p>
          <div className="flex items-center gap-3">
            <p>Made for small rooms.</p>
            <GithubLink className="-my-2.5 h-10 w-10 text-cream/85 hover:text-amber-text" />
          </div>
        </div>
      </div>
    </footer>
  );
}
