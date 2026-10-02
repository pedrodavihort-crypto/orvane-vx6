import { gsap, EASE } from '../lib/motion';

type Target = gsap.TweenTarget;

/** Palavras sobem de dentro de uma máscara (usado com <SplitWords />). */
export function revealWords(
  words: Target,
  opts: { trigger?: Element | null; start?: string; delay?: number; stagger?: number; duration?: number } = {},
) {
  return gsap.from(words, {
    yPercent: 115,
    duration: opts.duration ?? 1.4,
    stagger: opts.stagger ?? 0.08,
    ease: EASE,
    delay: opts.delay ?? 0,
    scrollTrigger: opts.trigger ? { trigger: opts.trigger, start: opts.start ?? 'top 82%', once: true } : undefined,
  });
}

/** Palavras acendem uma a uma conforme o scroll avança (scrub). */
export function scrubWords(words: Target, trigger: Element, opts: { start?: string; end?: string } = {}) {
  return gsap.fromTo(
    words,
    { opacity: 0.1 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.5,
      scrollTrigger: { trigger, start: opts.start ?? 'top 70%', end: opts.end ?? 'center 45%', scrub: 0.8 },
    },
  );
}

/** Fade + leve subida, disparado ao entrar na viewport. */
export function fadeUp(targets: Target, trigger: Element | null, opts: { stagger?: number; y?: number; start?: string } = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? 28,
    duration: 1.3,
    stagger: opts.stagger ?? 0.12,
    ease: EASE,
    scrollTrigger: { trigger: trigger ?? undefined, start: opts.start ?? 'top 80%', once: true },
  });
}

/** Contagem numérica (métricas de performance). */
export function countUp(el: HTMLElement, value: number, decimals: number, trigger: Element) {
  const state = { v: 0 };
  const fmt = (n: number) => n.toFixed(decimals);
  el.textContent = fmt(0);
  return gsap.to(state, {
    v: value,
    duration: 2.2,
    ease: 'power3.out',
    onUpdate: () => {
      el.textContent = fmt(state.v);
    },
    scrollTrigger: { trigger, start: 'top 78%', once: true },
  });
}
