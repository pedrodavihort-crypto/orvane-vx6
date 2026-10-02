import { brand, car, nav, socials } from '../data/car';
import { Logo } from './Logo';
import { useSmoothScroll } from '../lib/SmoothScroll';

const links = nav.filter((n) => ['Model', 'Design', 'Performance', 'Technology', 'Gallery', 'Contact'].includes(n.label));

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer id="contact" className="bg-ink pt-[12vh] pb-8">
      <div className="shell">
        <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-[18rem] text-[0.8125rem] leading-relaxed text-smoke">
              {brand.tagline} The new {car.fullName} {car.bodyStyle}.
            </p>
            <a href="mailto:studio@orvane.example" className="link mt-6 inline-block text-[0.8125rem] text-bone">
              studio@orvane.example
            </a>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.8125rem]">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="link label text-bone/80 hover:text-bone"
                    onClick={(e) => {
                      if (l.href === '#contact') return;
                      e.preventDefault();
                      scrollTo(l.href);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-6 text-[0.8125rem] md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link text-bone/80 hover:text-bone">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="display mt-[10vh] text-[clamp(4rem,19vw,20rem)] leading-[0.75] tracking-[-0.06em] text-graphite select-none" aria-hidden="true">
          {brand.name}
        </p>

        <div className="mt-10 flex flex-col justify-between gap-3 text-[0.75rem] text-smoke md:flex-row">
          <p>© {car.year} {brand.name} Automobiles. All rights reserved.</p>
          <p>Figures are preliminary. Imagery is illustrative.</p>
        </div>
      </div>
    </footer>
  );
}
