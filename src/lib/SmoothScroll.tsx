import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

interface ScrollApi {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const Ctx = createContext<ScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const stopped = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      // lerp curto: resposta imediata ao scroll, sem sensação de "arrastado"
      lerp: 0.11,
      wheelMultiplier: 1.05,
      smoothWheel: true,
      // Touch mantém o momentum nativo (mais fluido e econômico no mobile)
      syncTouch: false,
    });

    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (stopped.current) instance.stop();
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const api = useMemo<ScrollApi>(() => ({
    lenis,
    scrollTo: (target, opts = {}) => {
      if (lenis) {
        lenis.scrollTo(target as never, { offset: opts.offset ?? 0, immediate: opts.immediate, duration: 1.2 });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (typeof el === 'number') window.scrollTo({ top: el });
      else el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    stop: () => {
      stopped.current = true;
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    },
    start: () => {
      stopped.current = false;
      lenis?.start();
      document.documentElement.style.overflow = '';
    },
  }), [lenis]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useSmoothScroll = () => useContext(Ctx);
