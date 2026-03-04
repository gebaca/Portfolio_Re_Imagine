import { createContext, useContext, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { NavigateFunction } from 'react-router-dom';

interface CircleState {
  color: string;
  rect: DOMRect | null;
}

interface CircleTransitionContextType {
  circleState: CircleState | null;
  setCircleState: (s: CircleState) => void;
  // Ref al div del círculo de fondo en la página actual
  // Each page registers its background circle here
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
  // Llama esto desde el Logo (u otro trigger) para animar la vuelta a Home
  reverseTransition: (navigate: NavigateFunction) => void;
}

const CircleTransitionContext = createContext<CircleTransitionContextType>({
  circleState: null,
  setCircleState: () => {},
  bgCircleRef: { current: null },
  reverseTransition: () => {},
});

export const CircleTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [circleState, setCircleStateRaw] = useState<CircleState | null>(() => {
    const saved = sessionStorage.getItem('circleState');
    return saved ? JSON.parse(saved) : null;
  });

  // Ref compartido: la página activa lo asigna a su círculo de fondo
  const bgCircleRef = useRef<HTMLDivElement | null>(null);

  const setCircleState = (s: CircleState) => {
    sessionStorage.setItem('circleState', JSON.stringify(s));
    setCircleStateRaw(s);
  };

  const clearCircleState = () => {
    sessionStorage.removeItem('circleState');
    setCircleStateRaw(null);
  };

  const reverseTransition = (navigate: NavigateFunction) => {
    const el = bgCircleRef.current;

    if (!el) {
      // Sin círculo de fondo registrado — navega directamente
      clearCircleState();
      navigate('/');
      return;
    }

    // ── ANIMACIÓN INVERSA ──────────────────────────────────────────
    // El círculo de fondo se contrae de vuelta al centro,
    // espejando la expansión original (scale 10 → 0.1, power4.inOut)
    gsap.to(el, {
      scale: 0.1,
      duration: 1.6, // misma duración que la expansión (2s aprox)
      ease: 'power4.inOut',
      onComplete: () => {
        clearCircleState();
        navigate('/');
      },
    });
    // ──────────────────────────────────────────────────────────────
  };

  return (
    <CircleTransitionContext.Provider
      value={{ circleState, setCircleState, bgCircleRef, reverseTransition }}
    >
      {children}
    </CircleTransitionContext.Provider>
  );
};

export const useCircleTransition = () => useContext(CircleTransitionContext);
