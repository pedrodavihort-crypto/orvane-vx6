import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Easing cinematográfico padrão — sem overshoot, sem "bounce". */
export const EASE = 'expo.out';
export const EASE_INOUT = 'power3.inOut';

gsap.defaults({ ease: EASE, duration: 1.2 });
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Por decisão do cliente, as animações rodam sempre — mesmo com "reduzir movimento" ligado no sistema.
 * Para voltar a respeitar a preferência do sistema, troque ALWAYS_ANIMATE para false.
 * `?motion=reduced` na URL força a versão sem animação (útil para testar acessibilidade).
 */
const ALWAYS_ANIMATE = true;
const motionParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('motion') : null;
export const forceMotion = motionParam === 'reduced' ? false : ALWAYS_ANIMATE || motionParam === 'full';
const forceReduced = motionParam === 'reduced';
if (forceMotion) document.documentElement.classList.add('force-motion');

export const prefersReducedMotion = () =>
  forceReduced || (!forceMotion && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Breakpoints usados em gsap.matchMedia */
const NO_PREF = forceMotion ? '' : ' and (prefers-reduced-motion: no-preference)';
export const MQ = {
  desktop: forceReduced ? 'not all' : `(min-width: 1024px)${NO_PREF}`,
  mobile: forceReduced ? 'not all' : `(max-width: 1023px)${NO_PREF}`,
  motion: forceReduced ? 'not all' : forceMotion ? 'all' : '(prefers-reduced-motion: no-preference)',
} as const;

export { gsap, ScrollTrigger };
