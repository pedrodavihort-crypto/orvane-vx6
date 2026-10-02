import { gsap } from '../lib/motion';

/** Parallax vertical da mídia dentro do seu frame (o frame precisa de overflow hidden). */
export function parallax(media: gsap.TweenTarget, trigger: Element, amount = 12) {
  gsap.set(media, { scale: 1 + amount / 50 });
  return gsap.fromTo(
    media,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}

/** Imagem começa ampliada e assenta lentamente durante o scroll. */
export function settleScale(media: gsap.TweenTarget, trigger: Element, from = 1.25, to = 1) {
  return gsap.fromTo(
    media,
    { scale: from },
    { scale: to, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}

/** Revelação por clip-path (frame cresce de um recorte até a tela cheia). */
export function clipExpand(frame: Element, trigger: Element, opts: { from?: string; to?: string; end?: string; pin?: boolean } = {}) {
  return gsap.fromTo(
    frame,
    { clipPath: opts.from ?? 'inset(14% 22% 14% 22%)' },
    {
      clipPath: opts.to ?? 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger, start: 'top top', end: opts.end ?? '+=120%', scrub: true, pin: opts.pin ?? true },
    },
  );
}

/** Entrada única de imagem: wipe vertical + assentamento de escala. */
export function wipeIn(frame: Element, media: Element, trigger: Element) {
  const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top 85%', once: true } });
  tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }).from(
    media,
    { scale: 1.3, duration: 2, ease: 'expo.out' },
    0.2,
  );
  return tl;
}
