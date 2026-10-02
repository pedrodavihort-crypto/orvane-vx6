import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { Emblem } from './Logo';
import { brand } from '../data/car';

/** Abertura: o emblema é desenhado, acende e sai — o Hero assume com a revelação elíptica. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    if (prefersReducedMotion()) {
      el.style.display = 'none';
      onDone();
      return;
    }
    const paths = el.querySelectorAll<SVGGeometryElement>('ellipse, path');
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        .to(paths, { strokeDashoffset: 0, duration: 1.6, stagger: 0.15 })
        .from('.pl-emblem', { opacity: 0.25, duration: 1.6, ease: 'power2.out' }, 0)
        .from('.pl-caption', { opacity: 0, y: 8, duration: 1 }, 0.4)
        .to('.pl-emblem', { scale: 1.6, opacity: 0, filter: 'blur(12px)', duration: 1.1, ease: 'power3.in' }, '+=0.25')
        .to('.pl-caption', { opacity: 0, duration: 0.5 }, '<')
        .add(onDone, '-=0.35')
        .set(el, { display: 'none' });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[60] grid place-items-center bg-ink" aria-hidden="true">
      <Emblem className="pl-emblem w-[min(42vw,260px)] text-bone/85" />
      <p className="pl-caption label absolute bottom-10 text-smoke">{brand.tagline}</p>
    </div>
  );
}
