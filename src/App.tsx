import { useCallback, useEffect, useState } from 'react';
import { SmoothScroll, useSmoothScroll } from './lib/SmoothScroll';
import { ScrollTrigger } from './lib/motion';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Performance } from './components/Performance';
import { FullscreenImage } from './components/FullscreenImage';
import { Design } from './components/Design';
import { Gallery } from './components/Gallery';
import { Technology } from './components/Technology';
import { Configurator } from './components/Configurator';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';

function Experience() {
  const [ready, setReady] = useState(false);
  const { stop, start } = useSmoothScroll();

  // Scroll travado durante a abertura
  useEffect(() => {
    if (!ready) stop();
    else start();
  }, [ready, stop, start]);

  // Recalcula pins depois que fontes/imagens alteram o layout
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <Header visible={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Intro />
        <Performance />
        <FullscreenImage />
        <Design />
        <Gallery />
        <Technology />
        <Configurator />
        <FinalCTA />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Experience />
    </SmoothScroll>
  );
}
