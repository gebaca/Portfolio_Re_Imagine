import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import type { NavigateFunction } from 'react-router-dom';

// ─── Tipos ────────────────────────────────────────────────────────────────────
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
  scaledRect: ScaledRect | null;
}

interface CircleTransitionContextType {
  circleState: CircleState | null;
  setCircleState: (s: CircleState) => void;
  clearCircleState: () => void;
  registerRect: (route: string, rect: CircleRect) => void;
  getRect: (route: string) => CircleRect | null;
  getGiantRect: (route: string) => ScaledRect;
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
  pageContentRef: React.RefObject<HTMLDivElement | null>;
  isReversingRef: React.RefObject<boolean>;
  reverseTransition: (navigate: NavigateFunction, pathname: string) => void;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────
const CircleTransitionContext = createContext<CircleTransitionContextType>({
  circleState: null,
  setCircleState: () => {},
  clearCircleState: () => {},
  registerRect: () => {},
  getRect: () => null,
  getGiantRect: () => ({ top: 0, left: 0, width: 0, height: 0 }),
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
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const bgCircleRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const isReversingRef = useRef(false);

  // Rect original de cada círculo de Home, indexado por ruta ('/about', '/works'...)
  const rectsRef = useRef<Record<string, CircleRect>>({});

  const registerRect = useCallback((route: string, rect: CircleRect) => {
    rectsRef.current[route] = rect;
  }, []);

  const getRect = useCallback(
    (route: string) => rectsRef.current[route] ?? null,
    []
  );

  // Círculo "grande" de cada ruta: mismo centro que en Home, escala x10
  const getGiantRect = useCallback((route: string): ScaledRect => {
    const r = rectsRef.current[route];
    const size = r ? r.width * 10 : 1800;
    const cx = r ? r.centerX : window.innerWidth / 2;
    const cy = r ? r.centerY : window.innerHeight / 2;
    return {
      top: cy - size / 2,
      left: cx - size / 2,
      width: size,
      height: size,
    };
  }, []);

  const setCircleState = (s: CircleState) => {
    try {
      sessionStorage.setItem('circleState', JSON.stringify(s));
    } catch {
      // sessionStorage puede fallar en modo privado: seguimos sin persistencia
    }
    setCircleStateRaw(s);
  };

  const clearCircleState = () => {
    try {
      sessionStorage.removeItem('circleState');
    } catch {}
    setCircleStateRaw(null);
  };

  const reverseTransition = (navigate: NavigateFunction, pathname: string) => {
    isReversingRef.current = true;
    const el = bgCircleRef.current;
    const target = rectsRef.current[pathname];

    // Sin rect para esta ruta (p. ej. recarga directa): volvemos sin animar
    if (!el || !target) {
      clearCircleState();
      isReversingRef.current = false;
      navigate('/');
      return;
    }

    const content = pageContentRef.current;
    if (content) {
      gsap.to(content, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    }

    const currentRect = el.getBoundingClientRect();
    const targetScale = target.width / currentRect.width;

    // target está en coordenadas de documento, currentRect en viewport:
    // restamos el scroll para comparar en el mismo sistema
    const targetX =
      target.centerX -
      window.scrollX -
      (currentRect.left + currentRect.width / 2);
    const targetY =
      target.centerY -
      window.scrollY -
      (currentRect.top + currentRect.height / 2);

    gsap.to(el, {
      scale: targetScale,
      x: targetX,
      y: targetY,
      duration: 1.6,
      ease: 'power4.inOut',
      onComplete: () => {
        navigate('/');
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
        registerRect,
        getRect,
        getGiantRect,
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
