import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { car } from '../data/car';
import { Picture } from './Picture';
import { SplitWords } from './SplitWords';
import { Lightbox } from './Lightbox';
import { Expand } from './Icons';
import { revealWords, fadeUp } from '../animations/textAnimations';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function Design() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { scrollTo } = useSmoothScroll();
  const blocks = car.design;

  // Qual bloco está no centro da tela decide a imagem (funciona também com reduced motion)
  useEffect(() => {
    const els = root.current!.querySelectorAll<HTMLElement>('.design-block');
    const triggers = Array.from(els).map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useGsap(root, () => {
    revealWords('.design-title .word-inner', { trigger: root.current, start: 'top 70%' });
    root.current!.querySelectorAll('.design-block').forEach((b) => fadeUp(b.querySelectorAll('.design-fade'), b, { start: 'top 70%' }));
  });

  const items = blocks.map((b) => ({ id: b.id, image: b.image, alt: b.alt, caption: b.title }));

  return (
    <section id="design" ref={root} aria-labelledby="design-title" className="relative bg-ink">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        {/* painel de imagem — sticky no desktop */}
        <div className="lg:sticky lg:top-0 lg:h-[100svh]">
          <div className="group relative h-[78svh] overflow-hidden lg:h-full" data-cursor="view">
            {blocks.map((b, i) => (
              <div
                key={b.id}
                className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-film)] ${
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                }`}
                aria-hidden={i !== active}
              >
                <div className="h-full w-full transition-transform duration-[1600ms] ease-[var(--ease-film)] group-hover:scale-[1.035]">
                  <Picture image={b.image} alt={b.alt} sizes="(min-width:1024px) 62vw, 100vw" className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_9/0.35),transparent_30%,transparent_70%,rgb(10_10_9/0.55))]" />

            <h2 id="design-title" className="design-title display shell absolute top-[clamp(5.5rem,13vh,8rem)] left-0 text-[clamp(3.5rem,9vw,9.5rem)] text-bone/95">
              <SplitWords text="Design" />
            </h2>

            {/* controles inferiores (como na referência) */}
            <div className="shell absolute inset-x-0 bottom-6 flex items-center justify-between gap-4">
              <button type="button" className="btn-square" aria-label="View image fullscreen" onClick={() => setLightbox(active)}>
                <Expand />
              </button>
              <div role="tablist" aria-label="Design views" className="flex bg-ink p-1">
                {blocks.map((b, i) => (
                  <button
                    key={b.id}
                    role="tab"
                    type="button"
                    aria-selected={i === active}
                    onClick={() => {
                      setActive(i);
                      const target = root.current!.querySelectorAll<HTMLElement>('.design-block')[i];
                      if (window.matchMedia('(min-width:1024px)').matches) scrollTo(target, { offset: -window.innerHeight * 0.2 });
                    }}
                    className={`flex h-10 items-center gap-3 px-2 pr-5 text-[0.8125rem] transition-colors duration-500 ${
                      i === active ? 'bg-bone text-ink' : 'text-bone/70 hover:text-bone'
                    }`}
                  >
                    <span className="media h-7 w-10 shrink-0">
                      <Picture image={b.image} alt="" sizes="60px" />
                    </span>
                    {b.title}
                  </button>
                ))}
              </div>
              <span className="w-11" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* textos */}
        <div className="shell lg:pr-[clamp(1.25rem,3vw,3rem)] lg:pl-[clamp(2rem,5vw,6rem)]">
          {blocks.map((b, i) => (
            <article
              key={b.id}
              className={`design-block flex flex-col justify-center py-16 transition-opacity duration-700 lg:min-h-[100svh] lg:py-0 ${
                i === active ? 'lg:opacity-100' : 'lg:opacity-30'
              }`}
            >
              <p className="design-fade label mb-8 flex items-center gap-3 text-smoke">
                <span className="tabular-nums text-ember-bright">{b.index}</span>
                <span className="h-px w-10 bg-line" aria-hidden="true" />
              </p>
              <h3 className="design-fade display text-[clamp(2.5rem,4.5vw,4.75rem)]">{b.title}</h3>
              <p className="design-fade mt-8 max-w-[28rem] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.75] text-smoke">{b.body}</p>
              <div className="design-fade mt-10 rule max-w-[28rem]" aria-hidden="true">
                <span style={{ width: `${((i + 1) / blocks.length) * 100}%` }} />
              </div>
              {/* mobile: o primeiro bloco usa o painel acima; os demais trazem a própria imagem */}
              {i > 0 ? (
                <div className="media mt-10 aspect-[4/3] lg:hidden">
                  <Picture image={b.image} alt={b.alt} sizes="100vw" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </section>
  );
}
