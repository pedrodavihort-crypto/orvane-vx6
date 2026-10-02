import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Easing cinematográfico padrão — sem overshoot, sem "bounce". */
export const EASE = 'expo.out';
export const EASE_INOUT = 'power3.inOut';

gsap.defaults({ ease: EASE, duration: 1.2 });
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * `?motion=full` na URL ignora o prefers-reduced-motion do sistema — útil para revisar
 * as animações num computador com "reduzir movimento" ligado. Sem o parâmetro, a preferência é respeitada.
 */
export const forceMotion =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('motion') === 'full';
if (forceMotion) document.documentElement.classList.add('force-motion');

export const prefersReducedMotion = () =>
  !forceMotion && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Breakpoints usados em gsap.matchMedia */
const NO_PREF = forceMotion ? '' : ' and (prefers-reduced-motion: no-preference)';
export const MQ = {
  desktop: `(min-width: 1024px)${NO_PREF}`,
  mobile: `(max-width: 1023px)${NO_PREF}`,
  motion: forceMotion ? 'all' : '(prefers-reduced-motion: no-preference)',
} as const;

export { gsap, ScrollTrigger };
