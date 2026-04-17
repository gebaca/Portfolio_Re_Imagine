// src/components/Circle/HomeCircle.tsx
import CircleSVG from './circleSVG';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useFrameLoop } from '../../hooks/useFrameLoop';
import { useCircleTransition } from './CircleTransitionContext';
import { tokens, routeCircleMap } from '../../tokens/theme';

type TulletColor =
  | typeof tokens.colors.tulletYellow
  | typeof tokens.colors.tulletRed
  | typeof tokens.colors.tulletBlue;

interface HomeCircleProps {
  color: TulletColor;
  label: string;
  route: keyof typeof routeCircleMap;
  size?: number;
  fps?: number;
  rotRange?: number;
  activeRoute: string | null;
  onActivate: (route: string) => void;
}

const HomeCircle = ({
  color,
  label,
  route,
  size = 180,
  fps = 3.7,
  rotRange = 1,
  activeRoute,
  onActivate,
}: HomeCircleProps) => {
  const container = useRef<HTMLDivElement>(null);
  const circleWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { expandCircle } = useCircleTransition();

  const { contextSafe } = useGSAP({ scope: container });
  const { startFrameLoop, stopFrameLoop } = useFrameLoop(circleWrapperRef, {
    fps,
    rotRange,
    driftRange: 1,
  });

  useGSAP(
    () => {
      startFrameLoop();
    },
    { scope: container }
  );

  useEffect(() => {
    if (activeRoute === null) return;
    if (activeRoute !== route) {
      stopFrameLoop();
      gsap.to(container.current, { opacity: 0, duration: 0.15, ease: 'none' });
    }
  }, [activeRoute, route, stopFrameLoop]);

  const handleClick = contextSafe(() => {
    onActivate(route);
    stopFrameLoop();

    const rect = circleWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Desvanecer solo el texto, no el círculo SVG
    if (container.current) {
      gsap.to(container.current.querySelectorAll('.wiggle-char, h2'), {
        opacity: 0,
        duration: 0.2,
      });
    }
    console.log('HomeCircle rect:', rect);
    expandCircle(route, color, rect, navigate);
  });

  return (
    <div
      ref={container}
      data-circle-color={color} // ← añade esto
      onClick={handleClick}
      className='flex flex-col items-center gap-6 cursor-pointer select-none'
      style={{ transformOrigin: 'center center' }}
    >
      <div
        ref={circleWrapperRef}
        style={{ width: size, height: size, transformOrigin: 'center center' }}
      >
        <CircleSVG
          color={color}
          style={{ width: '100%', height: '100%', opacity: 1 }}
        />
      </div>
      <h2 className='wiggle-char text-black text-xl font-bold tracking-wide'>
        {label}
      </h2>
    </div>
  );
};

export default HomeCircle;
