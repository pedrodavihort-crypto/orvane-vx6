import { gsap } from '../lib/motion';

/** Pina a seção e desliza o trilho horizontalmente pelo comprimento do conteúdo. */
export function horizontalTrack(section: HTMLElement, track: HTMLElement) {
  const distance = () => track.scrollWidth - window.innerWidth;
  return gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}

/** Barra fina de progresso (o segmento claro sobre a linha). */
export function progressRule(bar: Element, trigger: Element, opts: { start?: string; end?: string } = {}) {
  return gsap.fromTo(
    bar,
    { width: '11%' },
    {
      width: '100%',
      ease: 'none',
      scrollTrigger: { trigger, start: opts.start ?? 'top top', end: opts.end ?? 'bottom top', scrub: true },
    },
  );
}

/** Conteúdo de uma seção recua (escala/opacidade) enquanto a próxima a cobre. */
export function recede(content: Element, trigger: Element) {
  return gsap.to(content, {
    yPercent: 18,
    opacity: 0.25,
    scale: 0.96,
    ease: 'none',
    scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true },
  });
}
