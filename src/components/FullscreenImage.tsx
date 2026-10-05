import { useRef } from 'react';
import { gsap, MQ } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { Picture } from './Picture';
import { SplitWords } from './SplitWords';
import { settleScale } from '../animations/imageAnimations';
import { revealWords } from '../animations/textAnimations';

/** Fotografia dominante: começa recortada e ampliada, abre até a tela cheia enquanto assenta. */
export function FullscreenImage() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=90%', scrub: true, pin: true, anticipatePin: 1 },
        })
        .fromTo('.form-frame', { clipPath: 'inset(16% 24% 16% 24%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
        .fromTo('.form-media', { scale: 1.35, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none' }, 0)
        .from('.form-text .word-inner', { yPercent: 110, stagger: 0.08, ease: 'power2.out', duration: 0.35 }, 0.55);
    });
    mm.add(MQ.mobile, () => {
      settleScale('.form-media', root.current!, 1.3, 1);
      revealWords('.form-text .word-inner', { trigger: root.current, start: 'top 40%' });
    });
  });

  return (
    <section ref={root} aria-label="Form meets function" className="relative h-[100svh] overflow-hidden bg-ink">
      <div className="form-frame media grain absolute inset-0" data-cursor="view">
        <div className="form-media absolute inset-0">
          <Picture image={media.form} alt={`${car.fullName} cornering on a coast road`} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(10_10_9/0.6),transparent_45%)]" />
      </div>
      <p className="form-text shell display pointer-events-none absolute bottom-[clamp(2rem,6vh,4.5rem)] left-0 text-[clamp(2.75rem,6.5vw,7rem)] leading-[0.95]">
        <SplitWords text={car.form} />
      </p>
    </section>
  );
}
