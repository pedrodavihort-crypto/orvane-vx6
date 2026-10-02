import { forwardRef, useEffect, useImperativeHandle, useRef, type VideoHTMLAttributes } from 'react';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../lib/motion';

interface Source {
  src: string;
  type: string;
  media?: string;
}
interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  sources: readonly Source[];
  poster: string;
  /** força pausa (ex.: botão de pausa do usuário) */
  paused?: boolean;
}

/** Vídeo mudo em loop que só toca enquanto visível. Reduced motion → fica no poster. */
export const LazyVideo = forwardRef<HTMLVideoElement, Props>(function LazyVideo({ sources, poster, paused, ...rest }, ref) {
  const el = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => el.current as HTMLVideoElement);
  const inView = useInView(el, '200px');

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    if (inView && !paused && !prefersReducedMotion()) v.play().catch(() => {});
    else v.pause();
  }, [inView, paused]);

  return (
    <video ref={el} muted loop playsInline preload="metadata" poster={poster} {...rest}>
      {sources.map((s) => (
        <source key={s.src + (s.media ?? '')} src={s.src} type={s.type} media={s.media} />
      ))}
    </video>
  );
});
