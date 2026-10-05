import { useRef } from 'react';
import { gsap, MQ } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { media } from '../data/assets';
import { LazyVideo } from './LazyVideo';
import { SplitWords } from './SplitWords';
import { revealWords, fadeUp } from '../animations/textAnimations';
import { parallax } from '../animations/imageAnimations';
import { horizontalTrack } from '../animations/scrollAnimations';

export function Technology() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { technology } = car;

  useGsap(root, () => {
    const cover = root.current!.querySelector('.tech-cover')!;
    parallax(cover.querySelector('.tech-media')!, cover, 14);
    revealWords('.tech-head .word-inner', { trigger: cover, start: 'top 45%', stagger: 0.1 });
    fadeUp('.tech-label', cover, { start: 'top 45%' });

    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const tween = horizontalTrack(rail.current!, track.current!);
      gsap.utils.toArray<HTMLElement>('.tech-panel').forEach((panel) => {
        gsap.from(panel.querySelectorAll('.tp-fade'), {
          opacity: 0,
          x: 80,
          stagger: 0.08,
          duration: 1.2,
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 85%', toggleActions: 'play none none reverse' },
        });
        gsap.from(panel.querySelector('.tp-line'), {
          scaleX: 0,
          transformOrigin: 'left',
          ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 90%', end: 'left 40%', scrub: true },
        });
      });
      gsap.fromTo('.tech-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: rail.current, start: 'top top', end: () => `+=${track.current!.scrollWidth - window.innerWidth}`, scrub: true } });
    });
    mm.add(MQ.mobile, () => {
      gsap.utils.toArray<HTMLElement>('.tech-panel').forEach((p) => fadeUp(p.querySelectorAll('.tp-fade'), p));
    });
  });

  return (
    <section id="technology" ref={root} aria-labelledby="tech-title" className="relative bg-ink">
      {/* capa */}
      <div className="tech-cover relative h-[100svh] min-h-[600px] overflow-hidden" >
        <div className="tech-media absolute inset-0">
          <LazyVideo className="h-full w-full object-cover" sources={media.hero.sources} poster={media.hero.poster} aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_9/0.85),rgb(10_10_9/0.35)_65%),linear-gradient(0deg,rgb(10_10_9/0.9),transparent_45%)]" />
        <div className="shell absolute inset-x-0 bottom-[clamp(2.5rem,9vh,6rem)]">
          <p className="tech-label label mb-6 flex items-center gap-3 text-bone/70">
            <span className="h-px w-6 bg-ember-bright" aria-hidden="true" /> Technology
          </p>
          <h2 id="tech-title" className="tech-head display text-[clamp(3rem,8.5vw,9rem)]">
            <SplitWords text={technology.headline} />
          </h2>
        </div>
      </div>

      {/* recursos — trilho horizontal pinado no desktop */}
      <div ref={rail} className="relative overflow-hidden lg:h-[100svh]">
        <div className="shell pointer-events-none absolute inset-x-0 top-[clamp(5.5rem,12vh,7rem)] hidden items-center gap-6 lg:flex" aria-hidden="true">
          <span className="label text-smoke">Features</span>
          <span className="relative h-px flex-1 bg-line">
            <span className="tech-progress absolute inset-0 origin-left bg-bone" />
          </span>
          <span className="label tabular-nums text-smoke">0{technology.features.length}</span>
        </div>
        <div ref={track} className="flex flex-col gap-0 py-[10vh] lg:h-full lg:w-max lg:flex-row lg:items-center lg:py-0">
          <div className="tech-panel shell shrink-0 lg:w-[38vw] lg:pr-0">
            <p className="tp-fade max-w-[26rem] text-[clamp(1.25rem,2vw,2rem)] leading-[1.25] tracking-[-0.02em] text-bone">
              Four systems, one intention: to make the car disappear and leave only the drive.
            </p>
          </div>
          {technology.features.map((f, i) => (
            <article key={f.title} className="tech-panel shell shrink-0 py-10 lg:w-[34vw] lg:min-w-[26rem] lg:px-[2.5vw] lg:py-0">
              <div className="tp-line h-px w-full bg-line" aria-hidden="true" />
              <p className="tp-fade label mt-8 tabular-nums text-ember-bright">0{i + 1}</p>
              <h3 className="tp-fade display mt-8 text-[clamp(2.25rem,3.6vw,3.75rem)] leading-[0.98]">{f.title}</h3>
              <p className="tp-fade mt-8 max-w-[24rem] text-[0.9375rem] leading-[1.75] text-smoke">{f.body}</p>
            </article>
          ))}
          <div className="hidden w-[10vw] shrink-0 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
