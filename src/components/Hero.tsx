import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { LazyVideo } from './LazyVideo';
import { Picture } from './Picture';
import { ArrowDown, Pause, Play } from './Icons';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const [paused, setPaused] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Estado inicial + timeline de entrada (pausada até o preloader terminar)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      intro.current = gsap
        .timeline({ paused: true })
        .fromTo(
          '.hero-frame',
          { clipPath: 'ellipse(9% 34% at 50% 52%)' },
          { clipPath: 'ellipse(110% 140% at 50% 52%)', duration: 2.2, ease: 'expo.inOut' },
        )
        .from('.hero-kenburns', { scale: 1.35, duration: 3.2, ease: 'expo.out' }, 0)
        .from(
          '.hero-letter',
          { yPercent: 105, opacity: 0, filter: 'blur(18px)', duration: 1.8, stagger: 0.09, ease: 'expo.out' },
          1.05,
        )
        .from('.hero-sub .word-inner, .hero-sub', { opacity: 0, y: 14, duration: 1.2, ease: 'expo.out' }, 1.5)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'expo.inOut' }, 1.3)
        .from('.hero-fade', { opacity: 0, y: 24, duration: 1.4, stagger: 0.1, ease: 'expo.out' }, 1.7)
        // movimento lento contínuo — câmera "respirando"
        .to('.hero-kenburns', { scale: 1.06, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true }, 3.2);
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  // Scroll: a mídia desce mais devagar que o conteúdo, o título se afasta e escurece
  useGsap(root, () => {
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-parallax', { yPercent: 22, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-shade', { opacity: 0.85, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-title', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '70% top' } });
    gsap.to('.hero-bottom', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '55% top' } });
    gsap.fromTo('.hero-progress', { width: '11%' }, { width: '100%', ease: 'none', scrollTrigger: st });
  });

  return (
    <section id="top" ref={root} aria-label={`${car.fullName} — introduction`} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      <div className="hero-frame absolute inset-0">
        <div className="hero-parallax absolute inset-0">
          <div className="hero-kenburns absolute inset-0">
            <LazyVideo
              className="h-full w-full object-cover"
              sources={media.hero.sources}
              poster={media.hero.poster}
              paused={paused}
              preload="auto"
              autoPlay
              aria-hidden="true"
            />
          </div>
        </div>
        {/* overlay extremamente sutil + legibilidade do header e do rodapé */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_9/0.55)_0%,rgb(10_10_9/0)_22%,rgb(10_10_9/0)_55%,rgb(10_10_9/0.7)_100%)]" />
        <div className="hero-shade absolute inset-0 bg-ink opacity-0" />
      </div>

      <div className="shell relative z-10 flex h-full flex-col justify-end pb-6 md:pb-10">
        <div className="hero-title">
          <h1 className="display title-steel -ml-[0.04em] flex text-[clamp(8rem,33vw,27rem)] md:text-[clamp(8rem,23vw,23rem)] leading-[0.8] select-none" aria-label={car.fullName}>
            {car.name.split('').map((l, i) => (
              <span key={i} className="word" aria-hidden="true">
                <span className="hero-letter word-inner title-steel">{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub label mt-5 text-bone/80 md:mt-6">{car.heroSubtitle}</p>
        </div>

        <div className="hero-rule rule mt-8 md:mt-10" aria-hidden="true">
          <span className="hero-progress" />
        </div>

        <div className="hero-bottom mt-6 grid gap-8 md:mt-8 md:grid-cols-2 md:items-end lg:grid-cols-[1fr_auto_1fr]">
          <div className="hero-fade flex items-stretch gap-5">
            <div className="media hidden aspect-[4/5] w-[6.5rem] shrink-0 sm:block lg:w-[8.5rem]">
              <Picture image={media.heroThumb} alt="" sizes="140px" priority />
            </div>
            <div className="flex flex-col justify-between gap-6">
              <p className="text-[0.9375rem] leading-snug text-bone/90">
                Welcome to the new
                <br />
                {car.fullName} — {car.year}.
              </p>
              <div className="flex gap-1">
                <a href="#intro" className="btn" onClick={(e) => { e.preventDefault(); scrollTo('#intro'); }}>
                  Explore
                </a>
                <a href="#intro" className="btn-square" aria-label="Scroll to next section" onClick={(e) => { e.preventDefault(); scrollTo('#intro'); }}>
                  <ArrowDown />
                </a>
              </div>
            </div>
          </div>

          <p className="hero-fade label order-last hidden items-center gap-3 self-end text-bone/70 lg:order-none lg:flex">
            Scroll to explore <ArrowDown className="nudge size-3" />
          </p>

          <div className="hero-fade flex items-end justify-between gap-6 md:justify-end">
            <p className="max-w-[31rem] text-[clamp(1.15rem,1.85vw,2rem)] leading-[1.12] tracking-[-0.02em] text-bone md:text-right">
              {car.heroStatement}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="label absolute top-1/2 right-[clamp(1.25rem,3vw,3rem)] z-10 hidden -translate-y-1/2 items-center gap-2 text-bone/60 transition-colors hover:text-bone lg:flex"
        aria-label={paused ? 'Play background video' : 'Pause background video'}
      >
        {paused ? <Play /> : <Pause />}
      </button>
    </section>
  );
}
