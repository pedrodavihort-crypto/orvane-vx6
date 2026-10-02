import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { nav, socials, car } from '../data/car';
import { media } from '../data/assets';
import { Picture } from './Picture';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { scrollTo, stop, start } = useSmoothScroll();

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
        .set(el, { visibility: 'visible' })
        .fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 })
        .from('.menu-link', { yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out' }, 0.35)
        .from('.menu-aside', { opacity: 0, y: 20, duration: 1, ease: 'expo.out' }, 0.5);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      stop();
      if (prefersReducedMotion()) t.progress(1);
      else t.timeScale(1).play();
      requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>('a')?.focus());
    } else if (t.progress() > 0) {
      start();
      if (prefersReducedMotion()) t.progress(0);
      else t.timeScale(1.6).reverse();
    }
  }, [open, stop, start]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      className="invisible fixed inset-0 z-40 bg-ink"
    >
      <div className="shell grid h-full grid-rows-[1fr_auto] pt-28 pb-10 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-1 lg:gap-16">
        <nav aria-label="Site" className="self-center">
          <ol className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => scrollTo(item.href), 450);
                  }}
                  className="menu-link group flex items-baseline gap-5 text-[clamp(2.4rem,6.2vw,5.5rem)] leading-[1.02] tracking-[-0.04em] text-bone/45 transition-colors duration-500 hover:text-bone focus-visible:text-bone"
                >
                  <span className="label w-8 text-smoke">{String(i + 1).padStart(2, '0')}</span>
                  <span className="transition-transform duration-700 ease-[var(--ease-film)] group-hover:translate-x-3">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <aside className="menu-aside hidden self-end lg:block">
          <div className="media aspect-[16/10]">
            <Picture image={media.heroThumb} alt={`${car.fullName} in Glacier White`} sizes="35vw" />
          </div>
          <div className="mt-6 flex items-end justify-between">
            <p className="max-w-[18rem] text-sm leading-relaxed text-smoke">
              The new {car.name} {car.bodyStyle}. Deliveries from spring {car.year}.
            </p>
            <ul className="flex gap-5 text-[0.8125rem]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a className="link" href={s.href}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
