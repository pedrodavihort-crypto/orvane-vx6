import { useRef } from 'react';
import { gsap } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { SplitWords } from './SplitWords';
import { LazyVideo } from './LazyVideo';
import { scrubWords, fadeUp } from '../animations/textAnimations';

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGsap(root, () => {
    scrubWords('.intro-head .word-inner', stage.current!, { start: 'top top', end: 'bottom bottom' });
    gsap.fromTo(
      '.intro-emblem',
      { scale: 0.72, opacity: 0.2 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.intro-emblem', start: 'top bottom', end: 'center 55%', scrub: true },
      },
    );
    gsap.to('.intro-emblem video', {
      xPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: '.intro-emblem', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    fadeUp('.intro-copy > *', root.current!.querySelector('.intro-copy'));
  });

  return (
    <section id="intro" ref={root} aria-labelledby="intro-title" className="relative bg-ink">
      {/* frase pinada via sticky: o scroll acende palavra por palavra */}
      <div ref={stage} className="relative h-[175vh]">
        <div className="sticky top-0 grid h-[100svh] place-items-center">
          <h2 id="intro-title" className="intro-head display text-center text-[clamp(3.2rem,11vw,11.5rem)] leading-[0.95] tracking-[-0.05em]">
            <SplitWords text={car.intro.headline} />
          </h2>
        </div>
      </div>

      <div className="shell flex flex-col items-center pb-[22vh]">
        <div className="intro-emblem emblem-mask relative overflow-hidden aspect-[2/1] w-[min(86vw,1100px)] bg-graphite" aria-hidden="true">
          <LazyVideo className="absolute inset-0 h-full w-[112%] max-w-none object-cover" sources={media.hero.sources} poster={media.hero.poster} />
        </div>

        <div className="intro-copy mt-[14vh] grid w-full max-w-[38rem] gap-6 text-center">
          <p className="label text-ember-bright">Philosophy</p>
          <p className="text-[clamp(1rem,1.25vw,1.1875rem)] leading-[1.7] text-smoke">{car.intro.body}</p>
        </div>
      </div>
    </section>
  );
}
