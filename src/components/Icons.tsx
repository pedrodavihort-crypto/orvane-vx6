const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, 'aria-hidden': true } as const;

export const ArrowDown = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} {...base}>
    <path d="M8 2v12M3 9l5 5 5-5" />
  </svg>
);
export const ArrowRight = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} {...base}>
    <path d="M2 8h12M9 3l5 5-5 5" />
  </svg>
);
export const ArrowLeft = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} {...base}>
    <path d="M14 8H2M7 3 2 8l5 5" />
  </svg>
);
export const Close = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} {...base}>
    <path d="M3 3l10 10M13 3 3 13" />
  </svg>
);
export const Expand = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} {...base}>
    <path d="M9.5 2H14v4.5M14 2 9 7M6.5 14H2V9.5M2 14l5-5" />
  </svg>
);
export const Pause = ({ className = 'size-3' }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
    <rect x="2" y="1.5" width="2.4" height="9" fill="currentColor" />
    <rect x="7.6" y="1.5" width="2.4" height="9" fill="currentColor" />
  </svg>
);
export const Play = ({ className = 'size-3' }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
    <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
  </svg>
);
