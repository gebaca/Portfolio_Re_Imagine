import CircleSVG from './circleSVG';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useFrameLoop } from '../../hooks/useFrameLoop'; // 👈 Nuevo hook
import { useCircleTransition } from './CircleTransitionContext';

interface WiggleCircleProps {
  color: string;
  label: string;
  route: string;
  size?: number;
  fps?: number;
  rotRange?: number;
  activeRoute: string | null;
  onActivate: (route: string) => void;
}

const WiggleCircle = ({
  color,
  label,
  route,
  size = 180,
  fps = 3.7,
  rotRange = 1,
  activeRoute,
  onActivate,
}: WiggleCircleProps) => {
  const container = useRef<HTMLDivElement>(null);
  const circleWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setCircleState } = useCircleTransition();

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

  // Reacciona cuando OTRO círculo es activado
  useEffect(() => {
    if (activeRoute === null) return;
    if (activeRoute !== route) {
      stopFrameLoop();
      gsap.to(container.current, {
        opacity: 0,
        duration: 0.15, // 👈 brusco
        ease: 'none',
      });
    }
  }, [activeRoute]);

  const handleClick = contextSafe(() => {
    onActivate(route); // Notifica a Home cuál fue clickeado
    stopFrameLoop();

    gsap.delayedCall(0.15, () => {
      gsap.to(circleWrapperRef.current, {
        scale: 10,
        duration: 2,
        ease: 'power4.inOut',
        onComplete: () => {
          const rect = circleWrapperRef.current?.getBoundingClientRect();
          if (rect) {
            setCircleState({ color, rect });
          }
          navigate(route);
        },
      });
    });

    const ctx = container.current;
    if (ctx) {
      gsap.to(ctx.querySelectorAll('.wiggle-char, h2'), {
        opacity: 0,
        duration: 0.2,
      });
    }
  });

  return (
    <div
      ref={container}
      onClick={handleClick}
      className='flex flex-col items-center gap-6 cursor-pointer select-none'
      style={{ transformOrigin: 'center center' }}
    >
      <div
        ref={circleWrapperRef}
        style={{
          width: size,
          height: size,
          transformOrigin: 'center center',
        }}
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

export default WiggleCircle;
