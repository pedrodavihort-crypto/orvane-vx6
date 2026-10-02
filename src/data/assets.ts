/**
 * Todos os caminhos de mídia do site vivem aqui.
 *
 * Os arquivos ficam em src/assets/ neste repositório e são servidos pelo jsDelivr
 * (CDN gratuito para repositórios públicos do GitHub), fixados num commit para cache permanente.
 *
 * Para trocar um asset:
 *   1. substitua o arquivo em src/assets/ mantendo o nome e faça commit/push;
 *   2. atualize ASSET_COMMIT abaixo com o SHA desse commit.
 * Nenhum componente referencia URLs diretamente.
 *
 * Cada imagem existe em 4 variantes: <nome>.avif, <nome>.webp (2400px) e <nome>-sm.avif/.webp (1200px).
 */
const REPO = 'pedrodavihort-crypto/orvane-vx6';
const ASSET_COMMIT = '2a598231e5c9c88b2350ec0a015aa9b2aba735e0';
const ASSET_BASE = `https://cdn.jsdelivr.net/gh/${REPO}@${ASSET_COMMIT}/src/assets`;

const img = (file: string) => `${ASSET_BASE}/images/${file}`;
const vid = (file: string) => `${ASSET_BASE}/videos/${file}`;

export interface ImageAsset {
  avif: string;
  webp: string;
  avifSm: string;
  webpSm: string;
}

export const image = (name: string): ImageAsset => ({
  avif: img(`${name}.avif`),
  webp: img(`${name}.webp`),
  avifSm: img(`${name}-sm.avif`),
  webpSm: img(`${name}-sm.webp`),
});

export const media = {
  hero: {
    poster: img('hero-poster.webp'),
    sources: [
      { src: vid('hero-mobile.mp4'), type: 'video/mp4', media: '(max-width: 767px)' },
      { src: vid('hero.webm'), type: 'video/webm' },
      { src: vid('hero.mp4'), type: 'video/mp4' },
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
