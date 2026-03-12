import { useState, useRef } from 'react';
import WiggleCircle from '../components/Circle/WiggleCircle';
import { useFadeIn } from '../hooks/useFadeIn';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

function Home() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReversingRef } = useCircleTransition();

  useFadeIn(containerRef, {
    duration: 0.8,
    delay: 0,
    skipRef: isReversingRef,
  });

  return (
    <div
      ref={containerRef}
      className='flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center p-10 md:p-32 min-h-screen'
    >
      <WiggleCircle
        route='/about'
        color='#FDDA0D'
        label='ABOUT'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <WiggleCircle
        route='/works'
        color='#DE0A00'
        label='WORKS'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <WiggleCircle
        route='/contacts'
        color='#00C4FF'
        label='CONTACTS'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
    </div>
  );
}

export default Home;
