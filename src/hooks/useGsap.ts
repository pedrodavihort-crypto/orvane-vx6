import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/**
 * Executa animações GSAP com escopo e limpeza automática (gsap.context).
 * Com prefers-reduced-motion: reduce, a função não roda — o conteúdo já é renderizado no estado final.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (self: gsap.Context) => void | (() => void),
  deps: DependencyList = [],
  options: { respectReducedMotion?: boolean } = { respectReducedMotion: true },
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    if (options.respectReducedMotion !== false && prefersReducedMotion()) return;
    const ctx = gsap.context((self) => setup(self), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
