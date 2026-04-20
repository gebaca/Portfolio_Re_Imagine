import { createContext, useContext, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { NavigateFunction } from 'react-router-dom';

// ─── Tipos ────────────────────────────────────────────────────────────────────
// Fix #2: objeto plano en lugar de DOMRect — JSON.stringify/parse lo maneja bien
export interface CircleRect {
  top: number;
  left: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface ScaledRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface CircleState {
  color: string;
  rect: CircleRect | null;
  scaledRect: ScaledRect | null; // ← añade esto
}

interface CircleTransitionContextType {
  circleState: CircleState | null;
  setCircleState: (s: CircleState) => void;
  clearCircleState: () => void;
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
  pageContentRef: React.RefObject<HTMLDivElement | null>;
  isReversingRef: React.RefObject<boolean>;
  reverseTransition: (navigate: NavigateFunction) => void;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────
const CircleTransitionContext = createContext<CircleTransitionContextType>({
  circleState: null,
  setCircleState: () => {},
  clearCircleState: () => {},
  bgCircleRef: { current: null },
  pageContentRef: { current: null },
  isReversingRef: { current: false },
  reverseTransition: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export const CircleTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [circleState, setCircleStateRaw] = useState<CircleState | null>(() => {
    try {
      const saved = sessionStorage.getItem('circleState');
      // Fix #2: el objeto guardado ya es plano, parse funciona correctamente
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const bgCircleRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const isReversingRef = useRef(false);

  const setCircleState = (s: CircleState) => {
    try {
      // Fix #2: guardamos CircleRect (objeto plano), no DOMRect
      sessionStorage.setItem('circleState', JSON.stringify(s));
    } catch {
      // sessionStorage puede fallar en modo privado — continuamos sin persistencia
    }
    setCircleStateRaw(s);
  };

  const clearCircleState = () => {
    try {
      sessionStorage.removeItem('circleState');
    } catch {}
    setCircleStateRaw(null);
  };

  const reverseTransition = (navigate: NavigateFunction) => {
    isReversingRef.current = true;
    const el = bgCircleRef.current;

    if (!el || !circleState?.rect) {
      clearCircleState();
      isReversingRef.current = false;
      navigate('/');
      return;
    }

    // Fade out del contenido de la página
    const content = pageContentRef.current;
    if (content) {
      gsap.to(content, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    }

    // Fix #4: calculamos el scale exacto para que el círculo
    // vuelva al tamaño visual del círculo original en Home,
    // en lugar de usar un scale(0.1) arbitrario.
    const currentRect = el.getBoundingClientRect();
    const targetScale = circleState.rect.width / currentRect.width;

    // Fix #4: también reposicionamos hacia el centro original
    // usando x/y en lugar de top/left para que GSAP lo interpole bien
    const targetX =
      circleState.rect.centerX - (currentRect.left + currentRect.width / 2);
    const targetY =
      circleState.rect.centerY - (currentRect.top + currentRect.height / 2);

    gsap.to(el, {
      scale: targetScale,
      x: targetX,
      y: targetY,
      duration: 1.6,
      ease: 'power4.inOut',
      onComplete: () => {
        navigate('/');
        // Limpiamos en el siguiente tick, después de que Home monte
        // Usamos requestAnimationFrame en lugar de setTimeout para
        // que ocurra justo después del primer paint de Home
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            clearCircleState();
            isReversingRef.current = false;
          });
        });
      },
    });
  };

  return (
    <CircleTransitionContext.Provider
      value={{
        circleState,
        setCircleState,
        clearCircleState,
        bgCircleRef,
        pageContentRef,
        isReversingRef,
        reverseTransition,
      }}
    >
      {children}
    </CircleTransitionContext.Provider>
  );
};

export const useCircleTransition = () => useContext(CircleTransitionContext);
