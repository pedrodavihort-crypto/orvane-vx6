import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Easing cinematográfico padrão — sem overshoot, sem "bounce". */
export const EASE = 'expo.out';
export const EASE_INOUT = 'power3.inOut';

gsap.defaults({ ease: EASE, duration: 1.2 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Breakpoints usados em gsap.matchMedia */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
} as const;

export { gsap, ScrollTrigger };
