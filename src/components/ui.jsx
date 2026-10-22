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
