import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { LazyVideo } from './LazyVideo';
import { ArrowDown, Pause, Play } from './Icons';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const [paused, setPaused] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Entrada: uma fenda de cinema se abre na vertical, a câmera assenta e o título sobe.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      intro.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .fromTo(
          '.hero-frame',
          { clipPath: 'inset(47% 0% 47% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
        )
        .fromTo('.hero-media', { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0)
        .from('.hero-letter', { yPercent: 100, duration: 1.2, stagger: 0.07 }, 0.75)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.inOut' }, 0.9)
        .from('.hero-fade', { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, 1.05);
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  // Saída: a câmera avança (push-in) e escurece enquanto o título se afasta.
  useGsap(root, () => {
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-push', { scale: 1.18, yPercent: 8, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-shade', { opacity: 0.9, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-title', { yPercent: -35, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-side', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '45% top' } });
    gsap.fromTo('.hero-progress', { width: '11%' }, { width: '100%', ease: 'none', scrollTrigger: st });
  });

  const toIntro = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    scrollTo('#intro');
  };

  return (
    <section id="top" ref={root} aria-label={`${car.fullName} — introduction`} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      <div className="hero-frame absolute inset-0">
        <div className="hero-push absolute inset-0">
          <div className="hero-media absolute inset-0">
            <LazyVideo
              className="h-full w-full object-cover object-[42%_50%] md:object-center"
              sources={media.hero.sources}
              poster={media.hero.poster}
              paused={paused}
              preload="auto"
              autoPlay
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_9/0.5)_0%,rgb(10_10_9/0)_20%,rgb(10_10_9/0)_50%,rgb(10_10_9/0.75)_100%)]" />
        <div className="hero-shade absolute inset-0 bg-ink opacity-0" />
      </div>

      <div className="shell relative z-10 flex h-full flex-col justify-end pb-6 md:pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1
            className="hero-title display -mb-[0.06em] -ml-[0.05em] flex text-[clamp(7rem,34vw,26rem)] leading-[0.8] select-none lg:text-[clamp(8rem,22vw,24rem)]"
            aria-label={car.fullName}
          >
            {car.name.split('').map((l, i) => (
              <span key={i} className="word" aria-hidden="true">
                <span className="hero-letter word-inner title-steel">{l}</span>
              </span>
            ))}
          </h1>

          <div className="hero-side flex max-w-[27rem] flex-col gap-6 lg:items-end lg:pb-[1.2vw] lg:text-right">
            <p className="hero-fade label text-bone/75">{car.heroSubtitle}</p>
            <p className="hero-fade text-[clamp(1.1rem,1.5vw,1.6rem)] leading-[1.2] tracking-[-0.015em] text-bone">{car.heroStatement}</p>
            <div className="hero-fade flex gap-1">
              <a href="#intro" className="btn" onClick={toIntro}>
                Explore
              </a>
              <a href="#intro" className="btn-square" aria-label="Scroll to next section" onClick={toIntro}>
                <ArrowDown />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 md:mt-8">
          <div className="hero-rule rule flex-1" aria-hidden="true">
            <span className="hero-progress" />
          </div>
          <p className="hero-fade label hidden items-center gap-3 text-bone/65 md:flex">
            Scroll to explore <ArrowDown className="nudge size-3" />
          </p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="hero-fade grid size-8 place-items-center text-bone/60 transition-colors hover:text-bone"
            aria-label={paused ? 'Play background video' : 'Pause background video'}
          >
            {paused ? <Play /> : <Pause />}
          </button>
        </div>
      </div>
    </section>
  );
}
