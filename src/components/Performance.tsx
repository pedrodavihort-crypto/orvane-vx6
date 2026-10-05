import { useRef } from 'react';
import { gsap } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { SplitWords } from './SplitWords';
import { revealWords, countUp, fadeUp } from '../animations/textAnimations';

export function Performance() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const r = root.current!;
    revealWords('.perf-title .word-inner', { trigger: r, start: 'top 75%', stagger: 0.04 });
    fadeUp('.perf-intro', r, { start: 'top 65%' });
    const grid = r.querySelector('.perf-grid')!;
    gsap.from('.perf-hline', { scaleX: 0, transformOrigin: 'left', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    gsap.from('.perf-vline', { scaleY: 0, transformOrigin: 'top', duration: 1.6, ease: 'expo.inOut', stagger: 0.15, scrollTrigger: { trigger: grid, start: 'top 80%', once: true } });
    gsap.from('.perf-cell dt, .perf-unit', { opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: grid, start: 'top 80%', once: true } });
    gsap.from('.perf-num', { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: grid, start: 'top 78%', once: true } });
    r.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      countUp(el, Number(el.dataset.count), Number(el.dataset.decimals), grid);
    });
  });

  return (
    <section id="performance" ref={root} aria-labelledby="perf-title" className="relative bg-ink py-[16vh]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="perf-intro label mb-6 flex items-center gap-3 text-smoke">
              <span className="h-px w-6 bg-ember-bright" aria-hidden="true" /> {car.performance.subtitle}
            </p>
            <h2 id="perf-title" className="perf-title display text-[clamp(3.5rem,10.5vw,11rem)]">
              <SplitWords text={car.performance.title} />
            </h2>
          </div>
          <p className="perf-intro max-w-[30rem] text-[clamp(1rem,1.25vw,1.1875rem)] leading-[1.7] text-smoke lg:justify-self-end lg:pb-4">
            {car.performance.body}
          </p>
        </div>

        <dl className="perf-grid relative mt-[12vh] grid md:grid-cols-3">
          <span className="perf-hline absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
          {car.metrics.map((m, i) => (
            <div key={m.label} className={`perf-cell relative flex min-h-[15rem] flex-col justify-between gap-12 border-b border-line py-8 md:min-h-[26rem] md:border-b-0 md:px-8 lg:px-12 lg:py-10 ${i === 0 ? 'md:!pl-0' : ''}`}>
              {i > 0 ? <span className="perf-vline absolute inset-y-0 left-0 hidden w-px bg-line md:block" aria-hidden="true" /> : null}
              <dt className="label text-smoke">{m.label}</dt>
              <dd className="flex items-baseline gap-3">
                <span className="word">
                  <span
                    className="perf-num word-inner display tabular-nums text-[clamp(5rem,9.5vw,10.5rem)] leading-[0.85]"
                    data-count={m.value}
                    data-decimals={m.decimals}
                  >
                    {m.value.toFixed(m.decimals)}
                  </span>
                </span>
                <span className="perf-unit text-[clamp(1rem,1.4vw,1.375rem)] text-bone/70">{m.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
