import { useEffect, useState } from 'react';

export const DOWNLOAD_URL = 'https://github.com/kevnk/lampcircle/releases/latest';
export const RELEASES_URL = 'https://github.com/kevnk/lampcircle/releases';
export const REPO_URL = 'https://github.com/kevnk/lampcircle';

const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const srcSet = (id, widths) => widths.map(w => `${unsplash(id, w)} ${w}w`).join(', ');

export const IMAGES = {
  hero: {
    src: unsplash('1613458109477-50ae725cb8ef', 1600),
    srcSet: srcSet('1613458109477-50ae725cb8ef', [800, 1600, 2400]),
    alt: 'A row of lit candles in a dark room, the nearest flame sharp and the rest soft.',
  },
  floor: {
    src: unsplash('1674141052966-02ca8a4f0591', 1800),
    alt: 'Warm lamplight falling through a doorway onto a wooden floor.',
  },
  guitar: {
    src: unsplash('1773167307888-6f1512ca1971', 1400),
    alt: 'An acoustic guitar in low amber light, close on the sound hole and strings.',
  },
};

const QUERY = '(prefers-reduced-motion: reduce)';

/** True while the visitor asks for less motion. Follows the setting if it changes mid-visit. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const sync = () => setReduced(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}
