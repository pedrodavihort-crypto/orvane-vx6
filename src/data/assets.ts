/**
 * Todos os caminhos de mídia do site vivem aqui.
 * Para trocar um asset: substitua o arquivo em src/assets/ mantendo o nome,
 * ou aponte a chave abaixo para um novo arquivo. Nenhum componente referencia URLs diretamente.
 *
 * Cada imagem existe em 4 variantes: <nome>.avif, <nome>.webp (2400px) e <nome>-sm.avif/.webp (1200px).
 */
import heroMp4 from '../assets/videos/hero.mp4';
import heroWebm from '../assets/videos/hero.webm';
import heroMobileMp4 from '../assets/videos/hero-mobile.mp4';
import heroPoster from '../assets/images/hero-poster.webp';

const files = import.meta.glob('../assets/images/*.{webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export interface ImageAsset {
  avif: string;
  webp: string;
  avifSm: string;
  webpSm: string;
}

const file = (name: string) => {
  const url = files[`../assets/images/${name}`];
  if (!url) throw new Error(`[assets] missing image: ${name}`);
  return url;
};

export const image = (name: string): ImageAsset => ({
  avif: file(`${name}.avif`),
  webp: file(`${name}.webp`),
  avifSm: file(`${name}-sm.avif`),
  webpSm: file(`${name}-sm.webp`),
});

export const media = {
  hero: {
    poster: heroPoster,
    sources: [
      { src: heroMobileMp4, type: 'video/mp4', media: '(max-width: 767px)' },
      { src: heroWebm, type: 'video/webm' },
      { src: heroMp4, type: 'video/mp4' },
    ],
  },
  heroThumb: image('street-tall'),
  form: image('form'),
  street: image('street'),
  streetTall: image('street-tall'),
  ctaStreet: image('cta-street'),
  nightHero: image('night-hero'),
  design: {
    exterior: image('design-exterior'),
    interior: image('interior-red'),
  },
  technology: image('interior-black'),
  detail: {
    wheel: image('detail-wheel'),
    headlight: image('detail-headlight'),
    profile: image('detail-profile'),
  },
  studio: (paint: string, wheels: string) => image(`studio-${paint}-${wheels}`),
  interior: (trim: string) => image(`interior-${trim}`),
} as const;
