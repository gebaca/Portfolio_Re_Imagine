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
    // Sobrescribe el rect anterior con el nuevo (no hay limpieza previa)
    originRectRef.current = originRect;
    targetRectRef.current = originRect;

    expandTimerRef.current?.kill();

    setActiveColor(color);
    setPhase('expanding');

    expandTimerRef.current = gsap.delayedCall(motion.expandDuration, () => {
      setPhase('expanded');
      navigate(route);
      // ELIMINA CUALQUIER `originRectRef.current = null` DE AQUÍ
    });
  };

  const reverseTransition = (navigate: NavigateFunction) => {
    reverseTimerRef.current?.kill();

    // Desvanecer el contenido actual (opcional)
    if (pageContentRef.current) {
      gsap.to(pageContentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    // Navegar inmediatamente a Home
    navigate('/');

    // Esperar a que React monte Home y luego obtener la posición del círculo activo
    gsap.delayedCall(0.05, () => {
      // Buscar el HomeCircle que tiene el color activo
      const activeCircle = document.querySelector(
        `[data-circle-color="${activeColor}"]`
      );
      if (activeCircle) {
        const freshRect = activeCircle.getBoundingClientRect();
        targetRectRef.current = freshRect; // actualizar con la posición real
      } else {
        console.warn('No se encontró el HomeCircle activo');
      }

      // Iniciar la animación de colapso
      setPhase('collapsing');

      reverseTimerRef.current = gsap.delayedCall(
        motion.collapseDuration,
        () => {
          setPhase('idle');
          setActiveColor(null);
          if (pageContentRef.current) {
            gsap.set(pageContentRef.current, { opacity: 1 });
          }
          targetRectRef.current = null; // limpiar después de usar
        }
      );
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
