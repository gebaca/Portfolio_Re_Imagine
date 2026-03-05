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
  isReversingRef: React.RefObject<boolean>;

  pageContentRef: React.RefObject<HTMLDivElement | null>;
  // Llama esto desde el Logo (u otro trigger) para animar la vuelta a Home
  reverseTransition: (navigate: NavigateFunction) => void;
}

const CircleTransitionContext = createContext<CircleTransitionContextType>({
  circleState: null,
  isReversingRef: { current: false },
  pageContentRef: { current: null },
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
  const pageContentRef = useRef<HTMLDivElement | null>(null); // ← aquí
  const isReversingRef = useRef(false);

  const setCircleState = (s: CircleState) => {
    sessionStorage.setItem('circleState', JSON.stringify(s));
    setCircleStateRaw(s);
  };

  const clearCircleState = () => {
    sessionStorage.removeItem('circleState');
    setCircleStateRaw(null);
  };

  const reverseTransition = (navigate: NavigateFunction) => {
    isReversingRef.current = true;
    const el = bgCircleRef.current;

    if (!el) {
      clearCircleState();
      navigate('/');
      return;
    }

    const content = pageContentRef.current;
    if (content) {
      gsap.to(content, { opacity: 0, duration: 0.4, ease: 'power2.in' });
    }

    gsap.to(el, {
      scale: 0.1,
      duration: 1.6,
      ease: 'power4.inOut',
      onComplete: () => {
        navigate('/'); // ← navega primero
        // Limpia el estado en el siguiente tick, después de que React
        // haya montado Home — así el círculo no desaparece antes de tiempo
        setTimeout(() => {
          clearCircleState();
          isReversingRef.current = false;
        }, 50);
      },
    });
  };

  return (
    <CircleTransitionContext.Provider
      value={{
        isReversingRef,
        circleState,
        setCircleState,
        bgCircleRef,
        pageContentRef,
        reverseTransition,
      }}
    >
      {children}
    </CircleTransitionContext.Provider>
  );
};

export const useCircleTransition = () => useContext(CircleTransitionContext);
