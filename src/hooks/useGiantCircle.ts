import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

export function useGiantCircle(route: string, position: 'absolute' | 'fixed') {
  const { circleState, bgCircleRef, getGiantRect } = useCircleTransition();

  // Punto de partida fijo: el círculo de la página anterior, o el destino si no hay
  const startRef = useRef(circleState?.scaledRect ?? getGiantRect(route));

  const setBgRef = useCallback(
    (el: HTMLDivElement | null) => {
      (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
    },
    [bgCircleRef]
  );

  useEffect(() => {
    const el = bgCircleRef.current;
    if (!el) return;
    const d = getGiantRect(route);
    const tween = gsap.to(el, {
      top: d.top,
      left: d.left,
      width: d.width,
      height: d.height,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.1,
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: React.CSSProperties = {
    position,
    ...startRef.current,
    pointerEvents: 'none',
    zIndex: 0,
  };

  return { setBgRef, style };
}
