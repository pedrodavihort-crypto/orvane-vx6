import { useId, useRef, useState, type ReactNode } from 'react';
import { useGsap } from '../hooks/useGsap';
import { car, configurator, type Paint, type Trim, type Wheels } from '../data/car';
import { media } from '../data/assets';
import { Picture } from './Picture';
import { SplitWords } from './SplitWords';
import { revealWords, fadeUp } from '../animations/textAnimations';
import { ArrowRight } from './Icons';

type View = 'vehicle' | 'paint' | 'interior';

const VIEW_LABEL: Record<View, string> = { vehicle: 'Vehicle', paint: 'Paint', interior: 'Interior' };

interface Option {
  id: string;
  name: string;
  swatch?: string;
}

function OptionGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  kind,
}: {
  legend: string;
  options: readonly Option[];
  value: T;
  onChange: (v: T) => void;
  kind: 'swatch' | 'text';
}) {
  const name = useId();
  const current = options.find((o) => o.id === value)!;
  return (
    <fieldset className="cfg-fade border-t border-line pt-6">
      <legend className="sr-only">{legend}</legend>
      <div className="mb-5 flex items-baseline justify-between gap-4" aria-hidden="true">
        <span className="label text-smoke">{legend}</span>
        <span className="text-[0.8125rem] text-bone/90">{current.name}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const checked = o.id === value;
          return (
            <label key={o.id} className="group relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id as T)}
                className="peer sr-only"
              />
              {kind === 'swatch' ? (
                <span
                  className={`block size-11 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] outline-1 outline-offset-4 transition-[outline-color,transform] duration-500 ease-[var(--ease-film)] peer-focus-visible:outline-bone ${
                    checked ? 'outline-bone' : 'outline-transparent group-hover:outline-bone/30'
                  }`}
                  style={{ background: o.swatch }}
                >
                  <span className="sr-only">{o.name}</span>
                </span>
              ) : (
                <span
                  className={`block border px-5 py-3 text-[0.8125rem] transition-colors duration-500 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 ${
                    checked ? 'border-bone bg-bone text-ink' : 'border-line text-bone/75 group-hover:border-bone/50 group-hover:text-bone'
                  }`}
                >
                  {o.name.split(' ')[0]}
                  <span className="sr-only"> — {o.name}</span>
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Layer({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-film)] ${on ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0'}`}
      aria-hidden={!on}
    >
      {children}
    </div>
  );
}

export function Configurator() {
  const root = useRef<HTMLElement>(null);
  const [paint, setPaint] = useState<Paint>('black');
  const [wheels, setWheels] = useState<Wheels>('21');
  const [trim, setTrim] = useState<Trim>('black');
  const [view, setView] = useState<View>('vehicle');

  useGsap(root, () => {
    revealWords('.cfg-title .word-inner', { trigger: root.current, start: 'top 70%' });
    fadeUp('.cfg-fade', root.current!.querySelector('.cfg-panel'), { start: 'top 80%', stagger: 0.08 });
    fadeUp('.cfg-stage', root.current, { start: 'top 60%', y: 50 });
  });

  const paintName = configurator.exterior.find((p) => p.id === paint)!.name;
  const wheelName = configurator.wheels.find((w) => w.id === wheels)!.name;
  const trimName = configurator.interior.find((t) => t.id === trim)!.name;


  return (
    <section id="configure" ref={root} aria-labelledby="cfg-title" className="relative bg-coal py-[16vh]">
      <div className="shell">
        <div className="mb-[8vh] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-6 flex items-center gap-3 text-smoke">
              <span className="h-px w-6 bg-ember-bright" aria-hidden="true" /> Configurator
            </p>
            <h2 id="cfg-title" className="cfg-title display text-[clamp(3rem,8vw,8.5rem)]">
              <SplitWords text="Make it yours." />
            </h2>
          </div>
          <div role="tablist" aria-label="Stage view" className="flex gap-6 self-start md:self-end md:pb-3">
            {(['vehicle', 'paint', 'interior'] as View[]).map((v) => (
              <button
                key={v}
                role="tab"
                type="button"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`link label transition-colors ${view === v ? 'text-bone' : 'text-smoke hover:text-bone'}`}
                aria-current={view === v}
              >
                {VIEW_LABEL[v]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,2.2fr)_minmax(19rem,1fr)] lg:gap-[clamp(2rem,4vw,5rem)]">
          {/* palco */}
          <div className="cfg-stage">
            <div className="media relative aspect-[12/7] bg-graphite" data-cursor="view" aria-live="polite">
              <Layer on={view === 'vehicle'}>
                <Picture
                  image={media.car}
                  alt={view === 'vehicle' ? `${car.fullName} on a coast road` : ''}
                  sizes="(min-width:1024px) 66vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </Layer>
              {configurator.exterior.map((p) => (
                <Layer key={p.id} on={view === 'paint' && p.id === paint}>
                  <Picture
                    image={media.paint(p.id)}
                    alt={view === 'paint' && p.id === paint ? `${p.name} paint sample` : ''}
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </Layer>
              ))}
              {configurator.interior.map((t) => (
                <Layer key={t.id} on={view === 'interior' && t.id === trim}>
                  <Picture
                    image={media.trim(t.id)}
                    alt={view === 'interior' && t.id === trim ? `${t.name} sample` : ''}
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </Layer>
              ))}
              <p className="label pointer-events-none absolute bottom-5 left-5 text-bone/80" aria-hidden="true">
                {view === 'vehicle' ? 'Shown in Obsidian Black' : view === 'paint' ? `Paint sample · ${paintName}` : `Trim sample · ${trimName}`}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 text-[0.8125rem]">
              <p className="text-bone/90">
                {car.fullName} <span className="text-smoke">— {paintName} · {wheelName} · {trimName}</span>
              </p>
              <p className="label text-smoke">{VIEW_LABEL[view]} view</p>
            </div>
          </div>

          {/* painel */}
          <div className="cfg-panel flex flex-col gap-8">
            <OptionGroup<Paint> legend="Exterior" kind="swatch" options={configurator.exterior} value={paint} onChange={(v) => { setPaint(v); setView('paint'); }} />
            <OptionGroup<Wheels> legend="Wheels" kind="text" options={configurator.wheels} value={wheels} onChange={(v) => { setWheels(v); setView('vehicle'); }} />
            <OptionGroup<Trim> legend="Interior" kind="swatch" options={configurator.interior} value={trim} onChange={(v) => { setTrim(v); setView('interior'); }} />
            <div className="cfg-fade mt-auto flex flex-col gap-3 border-t border-line pt-8">
              <a href="#contact" className="btn btn--light justify-between">
                Request a private viewing <ArrowRight />
              </a>
              <p className="text-[0.75rem] leading-relaxed text-smoke">Your configuration is shared with your nearest Orvane studio.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
