# Orvane VX6 — site de lançamento

Experiência de lançamento para um grand coupé fictício (marca **Orvane**, modelo **VX6**), dirigida a partir da referência em vídeo: hero com título gigante sobre vídeo, abertura com emblema, frase revelada no scroll, métricas em layout editorial, imagem que abre até a tela cheia, seção Design com alternância Exterior/Interior, galeria assimétrica, trilho horizontal de tecnologia, configurador e CTA final.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de produção em dist/
npm run preview
```

Stack: React 19 · TypeScript · Vite · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis.

## Estrutura

```
src/
  components/      Header, Menu, Preloader, Hero, Intro, Performance, FullscreenImage,
                   Design, Gallery, Lightbox, Technology, Configurator, FinalCTA, Footer,
                   Cursor, Picture, LazyVideo, SplitWords, Logo, Icons
  animations/      textAnimations.ts · imageAnimations.ts · scrollAnimations.ts
  data/            car.ts (todo o conteúdo) · assets.ts (todos os caminhos de mídia)
  hooks/           useGsap (gsap.context + limpeza + reduced motion) · useInView
  lib/             motion.ts (registro GSAP, easings, media queries) · SmoothScroll.tsx (Lenis ↔ ScrollTrigger)
  assets/images    <nome>.avif/.webp (2400px) + <nome>-sm.avif/.webp (1200px)
  assets/videos    hero.mp4 · hero.webm · hero-mobile.mp4
```

## Trocar o carro

1. **Conteúdo** — edite `src/data/car.ts` (nome, specs, textos, recursos, opções do configurador, galeria, navegação).
2. **Mídia** — substitua os arquivos em `src/assets/` mantendo os nomes, ou aponte as chaves em `src/data/assets.ts`. Nenhum componente usa URL solta.
   - Cada imagem precisa das 4 variantes (`.avif`, `.webp`, `-sm.avif`, `-sm.webp`).
   - Configurador: `studio-{black|white|red|silver}-{20|21}` e `interior-{black|red|carbon}` — mesmo enquadramento em todas para o crossfade ficar perfeito.
   - Vídeo do hero: até ~6–10 s em loop, H.264 + VP9, sem áudio, com `hero-poster.webp` do primeiro frame.

> O vídeo do hero e as fotos de rua vêm de um vídeo do Pexels (licença de uso livre). As imagens de estúdio, interior e detalhes são **placeholders originais** renderizados a partir de ilustrações vetoriais — troque por fotografia real quando houver.

## Decisões de movimento

- Easing `expo.out` / `power3` em tudo — sem bounce nem overshoot.
- Lenis no desktop; no touch o momentum é nativo (mais fluido e leve).
- Pins e trilho horizontal só ≥1024px (`gsap.matchMedia`); no mobile as seções viram fluxo vertical com revelações simples.
- `prefers-reduced-motion: reduce` → sem Lenis, sem scroll-animations, sem preloader, vídeo parado no poster. O conteúdo é renderizado já no estado final (nada depende de JS para aparecer).
- Vídeos só tocam enquanto visíveis (IntersectionObserver); o hero tem botão de pausa.

## Acessibilidade

HTML semântico por seção (`aria-labelledby`), skip link, foco visível, menu e lightbox como `dialog` com ESC e foco gerenciado, configurador com radios nativos, alt text em todas as imagens de conteúdo, cursor customizado desativado em touch e reduced motion (o cursor nativo nunca é escondido fora das mídias).
