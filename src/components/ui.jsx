import { REPO_URL } from '../site';

const VARIANTS = { amber: 'btn-amber', ghost: 'btn-ghost' };

const SIZES = {
  sm: 'px-4 py-2.5 text-[13px]',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-5 text-base md:px-10 md:py-6 md:text-lg',
};

/** A pill link with the magnetic hover: it swells a little and a fill slides up behind the label. */
export function Button({ href, variant = 'amber', size = 'md', className = '', children, ...rest }) {
  return (
    <a href={href} className={`btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      <span className="btn-slide" aria-hidden="true" />
      {children}
    </a>
  );
}

/** The app repo, as the GitHub mark. Inline, since lucide-react no longer ships brand icons. */
export function GithubLink({ className = '' }) {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener"
      aria-label="Lamp Circle on GitHub"
      className={`lift inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
    >
      <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </a>
  );
}

// Beat 1 tallest, like the bars around the lantern and Perform's beat counter.
const HEIGHTS = [1, 0.5, 0.72, 0.5];

/**
 * Rounded sound bars. `mode` is 'still', 'breathe' (the resting bars) or 'beat' (each lights on its beat).
 */
export function SoundBars({ count = 4, mode = 'still', className = '', barClassName = 'bg-current' }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${barClassName} ${mode === 'still' ? '' : mode}`}
          style={{
            height: `${HEIGHTS[i % 4] * 100}%`,
            animationDelay: mode === 'beat' ? `${(i % 4) * 0.833}s` : mode === 'breathe' ? `${i * 0.4}s` : undefined,
          }}
        />
      ))}
    </span>
  );
}
