import { useRef } from 'react';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { Picture } from './Picture';
import { SplitWords } from './SplitWords';
import { ArrowRight } from './Icons';
import { settleScale } from '../animations/imageAnimations';
import { revealWords, fadeUp } from '../animations/textAnimations';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGsap(root, () => {
    settleScale('.cta-media', root.current!, 1.3, 1);
    revealWords('.cta-head .word-inner', { trigger: root.current, start: 'top 45%', stagger: 0.07 });
    fadeUp('.cta-btn', root.current, { start: 'top 30%' });
  });

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative flex h-[100svh] min-h-[640px] items-start justify-center overflow-hidden bg-ink pt-[clamp(6rem,17vh,11rem)]">
      <div className="cta-media absolute inset-0" data-cursor="view">
        <Picture image={media.ctaStreet} alt={`${car.fullName} on the coast road at sunset`} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgb(10_10_9/0.1),rgb(10_10_9/0.75))]" />
      <div className="shell relative z-10 flex flex-col items-center text-center">
        <h2 id="cta-title" className="cta-head display text-[clamp(3rem,8.4vw,9rem)]">
          <SplitWords text={car.finalCta.headline} />
        </h2>
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollTo('#design'); }}
          className="cta-btn btn btn--light group mt-12 h-14 px-8"
        >
          {car.finalCta.button}
          <span className="relative block size-4 overflow-hidden">
            <ArrowRight className="absolute inset-0 size-4 transition-transform duration-500 ease-[var(--ease-film)] group-hover:translate-x-full" />
            <ArrowRight className="absolute inset-0 size-4 -translate-x-full transition-transform duration-500 ease-[var(--ease-film)] group-hover:translate-x-0" />
          </span>
        </a>
      </div>
    </section>
  );
}
