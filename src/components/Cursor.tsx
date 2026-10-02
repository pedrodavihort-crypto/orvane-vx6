import { useEffect, useRef, useState } from 'react';
import { gsap, isTouch, prefersReducedMotion } from '../lib/motion';

/**
 * Cursor discreto (desktop). O cursor nativo continua ativo em toda a página —
 * apenas sobre mídias marcadas com data-cursor="view|open" ele é substituído pelo rótulo.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => typeof window !== 'undefined' && !isTouch() && !prefersReducedMotion());

  useEffect(() => {
    if (!enabled || !root.current) return;
    const el = root.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as Element | null;
      const media = t?.closest?.('[data-cursor]') as HTMLElement | null;
      if (media) {
        el.dataset.state = 'label';
        setLabel(media.dataset.cursor === 'open' ? 'OPEN' : media.dataset.cursor === 'drag' ? 'DRAG' : 'VIEW');
      } else if (t?.closest?.('a, button, [role="button"], input, label')) {
        el.dataset.state = 'button';
      } else {
        el.dataset.state = 'idle';
      }
    };
    const leave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      shown = false;
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={root} className="cursor invisible opacity-0" data-state="idle" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  );
}
