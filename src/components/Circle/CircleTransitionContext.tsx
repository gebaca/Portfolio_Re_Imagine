// src/components/Circle/CircleTransitionContext.tsx
import { createContext, useContext, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { NavigateFunction } from 'react-router-dom';
import { tokens, routeCircleMap, motion } from '../../tokens/theme';

type TulletColor =
  | typeof tokens.colors.tulletYellow
  | typeof tokens.colors.tulletRed
  | typeof tokens.colors.tulletBlue;

type Phase = 'idle' | 'expanding' | 'expanded' | 'collapsing';

interface CircleTransitionContextType {
  activeColor: TulletColor | null;
  expandCircle: (
    route: keyof typeof routeCircleMap,
    color: TulletColor,
    originRect: DOMRect,
    navigate: NavigateFunction
  ) => void;
  phase: Phase;
  originRectRef: React.MutableRefObject<DOMRect | null>;
  targetRectRef: React.MutableRefObject<DOMRect | null>;
  isReversingRef: React.MutableRefObject<boolean>;
  pageContentRef: React.MutableRefObject<HTMLDivElement | null>;
  reverseTransition: (navigate: NavigateFunction) => void;
}

const CircleTransitionContext = createContext<CircleTransitionContextType>({
  activeColor: null,
  expandCircle: () => {},
  phase: 'idle',
  originRectRef: { current: null },
  targetRectRef: { current: null },
  isReversingRef: { current: false },
  pageContentRef: { current: null },
  reverseTransition: () => {},
});

export const CircleTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [activeColor, setActiveColor] = useState<TulletColor | null>(null);

  const isReversingRef = useRef(false);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const originRectRef = useRef<DOMRect | null>(null);
  const targetRectRef = useRef<DOMRect | null>(null);

  const expandTimerRef = useRef<gsap.core.Tween | null>(null);
  const reverseTimerRef = useRef<gsap.core.Tween | null>(null);

  const expandCircle = (
    route: keyof typeof routeCircleMap,
    color: TulletColor,
    originRect: DOMRect,
    navigate: NavigateFunction
  ) => {
    originRectRef.current = originRect;
    targetRectRef.current = originRect;

    expandTimerRef.current?.kill();

    setActiveColor(color);
    setPhase('expanding');

    expandTimerRef.current = gsap.delayedCall(motion.expandDuration, () => {
      setPhase('expanded');
      navigate(route);
      // NO limpiar originRectRef aquí
    });
  };

  const reverseTransition = (navigate: NavigateFunction) => {
    reverseTimerRef.current?.kill();

    if (pageContentRef.current) {
      gsap.to(pageContentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    // 1. Iniciar colapso
    setPhase('collapsing');

    // 2. Después de la animación de colapso, navegar y resetear
    reverseTimerRef.current = gsap.delayedCall(motion.collapseDuration, () => {
      navigate('/');
      gsap.delayedCall(0.05, () => {
        setPhase('idle');
        setActiveColor(null);
        if (pageContentRef.current) {
          gsap.set(pageContentRef.current, { opacity: 1 });
        }
        targetRectRef.current = null;
      });
    });
  };

  return (
    <CircleTransitionContext.Provider
      value={{
        activeColor,
        expandCircle,
        phase,
        originRectRef,
        targetRectRef,
        isReversingRef,
        pageContentRef,
        reverseTransition,
      }}
    >
      {children}
    </CircleTransitionContext.Provider>
  );
};

export const useCircleTransition = () => useContext(CircleTransitionContext);
