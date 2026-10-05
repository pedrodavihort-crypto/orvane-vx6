import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { car } from '../data/car';
import { Logo } from './Logo';
import { Menu } from './Menu';
import { useSmoothScroll } from '../lib/SmoothScroll';

export function Header({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (hash: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollTo(hash);
  };

  return (
    <>
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[70] -translate-y-20 bg-bone px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,height,backdrop-filter,opacity,transform] duration-700 ease-[var(--ease-film)]',
          scrolled ? 'h-16 bg-ink/80 backdrop-blur-sm' : 'h-[5.5rem] bg-transparent',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
        ].join(' ')}
      >
        <div className="shell grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" onClick={go('#top')} aria-label={`${car.fullName} — back to top`} className="justify-self-start">
            <Logo />
          </a>

          <p className="hidden text-[0.8125rem] text-bone/90 lg:block">
            The New <span className="font-semibold">{car.name}</span> {car.bodyStyle}
          </p>

          <nav aria-label="Primary" className="flex items-center justify-self-end gap-2">
            <a href="#design" onClick={go('#design')} className="link mr-6 hidden text-[0.8125rem] text-bone/90 lg:inline-block">
              Explore
            </a>
            <a href="#configure" onClick={go('#configure')} className="btn hidden lg:inline-flex">
              Configure
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="btn-square group"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-[9px] w-[18px]">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? 'top-1 w-full -rotate-45' : 'top-2 w-full group-hover:w-2/3'}`} />
              </span>
              <span className="sr-only">Menu</span>
            </button>
          </nav>
        </div>
      </header>
      <Menu open={open} onClose={() => { setOpen(false); menuBtn.current?.focus(); }} />
    </>
  );
}
