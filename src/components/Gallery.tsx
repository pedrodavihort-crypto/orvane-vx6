import { useRef, useState } from 'react';
import { gsap, MQ } from '../lib/motion';
import { useGsap } from '../hooks/useGsap';
import { gallery, type GalleryItem } from '../data/car';
import { Picture } from './Picture';
import { SplitWords } from './SplitWords';
import { Lightbox } from './Lightbox';
import { revealWords, fadeUp } from '../animations/textAnimations';
import { wipeIn } from '../animations/imageAnimations';

/** Composição editorial assimétrica — cada slot tem proporção, coluna e velocidade de parallax próprias. */
const SLOT: Record<GalleryItem['slot'], { frame: string; ratio: string; speed: number; sizes: string }> = {
  large: { frame: 'md:col-start-1 md:col-end-9', ratio: 'aspect-[16/10]', speed: 10, sizes: '(min-width:768px) 66vw, 100vw' },
  small: { frame: 'w-3/4 ml-auto md:w-auto md:ml-0 md:col-start-10 md:col-end-13 md:mt-[34vh]', ratio: 'aspect-[4/5]', speed: 18, sizes: '(min-width:768px) 25vw, 75vw' },
  wide: { frame: 'md:col-start-4 md:col-end-13 md:-mt-[6vh]', ratio: 'aspect-[16/9]', speed: 12, sizes: '(min-width:768px) 75vw, 100vw' },
  horizontal: { frame: 'md:col-start-1 md:col-end-8 md:mt-[10vh]', ratio: 'aspect-[21/9]', speed: 8, sizes: '(min-width:768px) 58vw, 100vw' },
  tall: { frame: 'w-2/3 md:w-auto md:col-start-9 md:col-end-12 md:mt-[22vh]', ratio: 'aspect-[4/5]', speed: 20, sizes: '(min-width:768px) 25vw, 66vw' },
  inset: { frame: 'w-4/5 md:w-auto md:col-start-2 md:col-end-6 md:mt-[8vh]', ratio: 'aspect-square', speed: 16, sizes: '(min-width:768px) 33vw, 80vw' },
  full: { frame: 'md:col-span-12 -mx-[clamp(1.25rem,3vw,3rem)] md:mt-[14vh]', ratio: 'aspect-[4/5] md:aspect-[21/9]', speed: 14, sizes: '100vw' },
};

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useGsap(root, () => {
    revealWords('.gallery-title .word-inner', { trigger: root.current, start: 'top 75%' });
    fadeUp('.gallery-intro', root.current, { start: 'top 70%' });
    const mm = gsap.matchMedia();
    root.current!.querySelectorAll<HTMLElement>('.g-item').forEach((item) => {
      const frame = item.querySelector('.g-frame')!;
      const mediaEl = item.querySelector('.g-media')!;
      wipeIn(frame, mediaEl, item);
      fadeUp(item.querySelector('figcaption'), item, { start: 'top 75%' });
      mm.add(MQ.motion, () => {
        const speed = Number(item.dataset.speed);
        gsap.fromTo(
          item.querySelector('.g-parallax'),
          { yPercent: -speed / 2 },
          { yPercent: speed / 2, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    });
  });

  return (
    <section id="gallery" ref={root} aria-labelledby="gallery-title" className="relative bg-ink pt-[18vh] pb-[10vh]">
      <div className="shell">
        <div className="mb-[10vh] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="gallery-title" className="gallery-title display text-[clamp(3.5rem,10.5vw,11rem)]">
            <SplitWords text="Gallery" />
          </h2>
          <p className="gallery-intro max-w-[22rem] text-[0.9375rem] leading-[1.7] text-smoke md:pb-4">
            Seven frames from the launch campaign — shot in studio, on the avenue and after dark.
          </p>
        </div>

        <ul className="grid gap-y-14 md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)] md:gap-y-0">
          {gallery.map((g, i) => {
            const s = SLOT[g.slot];
            return (
              <li key={g.id} className={`g-item ${s.frame}`} data-speed={s.speed}>
                <figure>
                  <button
                    type="button"
                    data-cursor="open"
                    onClick={() => setIndex(i)}
                    aria-label={`Open image: ${g.caption}`}
                    className={`g-frame media group block w-full ${s.ratio}`}
                  >
                    <span className="g-parallax absolute -inset-y-[12%] inset-x-0 block">
                      <span className="g-media block h-full w-full transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.04]">
                        <Picture image={g.image} alt={g.alt} sizes={s.sizes} className="h-full w-full object-cover" />
                      </span>
                    </span>
                  </button>
                  <figcaption className={`mt-4 flex items-baseline gap-4 text-[0.8125rem] text-smoke ${g.slot === 'full' ? 'shell' : ''}`}>
                    <span className="label tabular-nums text-bone/60">{String(i + 1).padStart(2, '0')}</span>
                    {g.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
