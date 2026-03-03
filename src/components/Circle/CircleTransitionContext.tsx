import { createContext, useContext, useState } from 'react';

interface CircleState {
  color: string;
  rect: DOMRect | null;
}

const CircleTransitionContext = createContext<{
  circleState: CircleState | null;
  setCircleState: (s: CircleState) => void;
}>({ circleState: null, setCircleState: () => {} });

export const CircleTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [circleState, setCircleStateRaw] = useState<CircleState | null>(() => {
    // Lee de sessionStorage al montar
    const saved = sessionStorage.getItem('circleState');
    return saved ? JSON.parse(saved) : null;
  });

  const setCircleState = (s: CircleState) => {
    sessionStorage.setItem('circleState', JSON.stringify(s));
    setCircleStateRaw(s);
  };

  return (
    <CircleTransitionContext.Provider value={{ circleState, setCircleState }}>
      {children}
    </CircleTransitionContext.Provider>
  );
};
export const useCircleTransition = () => useContext(CircleTransitionContext);
