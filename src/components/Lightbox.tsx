import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import type { ImageAsset } from '../data/assets';
import { Picture } from './Picture';
import { ArrowLeft, ArrowRight, Close } from './Icons';
import { useSmoothScroll } from '../lib/SmoothScroll';

export interface LightboxItem {
  id: string;
  image: ImageAsset;
  alt: string;
  caption: string;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/** Visualizador fullscreen: ← → navegam, ESC fecha, foco preso no diálogo. */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const { stop, start } = useSmoothScroll();
  const open = index !== null;
  const reduced = prefersReducedMotion();

  const next = useCallback(() => index !== null && onIndex((index + 1) % items.length), [index, items.length, onIndex]);
  const prev = useCallback(() => index !== null && onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    stop();
    const el = root.current!;
    if (!reduced) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    el.querySelector<HTMLButtonElement>('[data-close]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Tab') {
        const f = el.querySelectorAll<HTMLElement>('button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      start();
      lastFocus.current?.focus();
    };
  }, [open, onClose, next, prev, stop, start, reduced]);

  // crossfade entre imagens
  useLayoutEffect(() => {
    if (!open || reduced) return;
    gsap.fromTo(
      root.current!.querySelector('.lb-media'),
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' },
    );
  }, [index, open, reduced]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}: ${item.caption}`}
      className="fixed inset-0 z-[80] grid grid-rows-[auto_1fr_auto] bg-ink/97 backdrop-blur-sm"
      data-lenis-prevent
    >
      <div className="shell flex h-20 items-center justify-between">
        <p className="label text-smoke tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button type="button" data-close onClick={onClose} className="btn-square border-line" aria-label="Close (Esc)">
          <Close />
        </button>
      </div>

      <div className="relative min-h-0 px-[clamp(0rem,6vw,7rem)]" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="lb-media h-full">
          <Picture key={item.id} image={item.image} alt={item.alt} className="h-full w-full object-contain" priority />
        </div>
      </div>

      <div className="shell flex h-24 items-center justify-between gap-6">
        <p className="text-sm text-bone/80">{item.caption}</p>
        <div className="flex gap-1">
          <button type="button" onClick={prev} className="btn-square border-line" aria-label="Previous image (←)">
            <ArrowLeft />
          </button>
          <button type="button" onClick={next} className="btn-square border-line" aria-label="Next image (→)">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
