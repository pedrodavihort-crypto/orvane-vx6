import { brand } from '../data/car';

/** Emblema original: anel elíptico cortado por uma diagonal (O + movimento). */
export function Emblem({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <ellipse cx="32" cy="16" rx="29" ry="12.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M22 31 42 1" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Emblem className="h-[18px] w-auto" />
      <span className="text-[0.8125rem] font-semibold tracking-[0.42em] uppercase">{brand.name}</span>
    </span>
  );
}
