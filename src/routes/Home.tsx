// src/routes/Home.tsx
import { useState, useRef } from 'react';
import HomeCircle from '../components/Circle/HomeCircle';
import { useFadeIn } from '../hooks/useFadeIn';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { tokens } from '../tokens/theme';

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
      className='flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center p-10 md:p-32'
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <HomeCircle
        route='/about'
        color={tokens.colors.tulletYellow}
        label='ABOUT'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <HomeCircle
        route='/works'
        color={tokens.colors.tulletRed}
        label='WORKS'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
      <HomeCircle
        route='/contacts'
        color={tokens.colors.tulletBlue}
        label='CONTACTS'
        activeRoute={activeRoute}
        onActivate={setActiveRoute}
      />
    </div>
  );
}

export default Home;
