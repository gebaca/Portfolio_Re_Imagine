import CircleSVG from './circleSVG';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useFrameLoop } from '../../hooks/useFrameLoop';
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
  const [finished, setFinished] = useState<null | boolean>(true);
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

  useEffect(() => {
    if (activeRoute === null) return;
    if (activeRoute !== route) {
      stopFrameLoop();
      gsap.to(container.current, { opacity: 0, duration: 0.15, ease: 'none' });
    }
  }, [activeRoute]);

  const handleClick = contextSafe(() => {
    // Fix #1: captura ANTES de cualquier animación
    const r = circleWrapperRef.current?.getBoundingClientRect();
    if (!r) return;

    setFinished(false);
    onActivate(route);
    stopFrameLoop();

    gsap.delayedCall(0.15, () => {
      gsap.to(circleWrapperRef.current, {
        scale: 10,
        duration: 2,
        ease: 'power4.inOut',
        onComplete: () => {
          // Captura el rect del elemento YA escalado
          const scaledRect = circleWrapperRef.current?.getBoundingClientRect();
          if (!scaledRect) {
            navigate(route);
            return;
          }

          setCircleState({
            color,
            rect: {
              // Rect original (para el reverse)
              top: r.top + window.scrollY,
              left: r.left + window.scrollX,
              width: r.width,
              height: r.height,
              centerX: r.left + r.width / 2 + window.scrollX,
              centerY: r.top + r.height / 2 + window.scrollY,
            },
            // Rect escalado (para posicionar el bgCircle en Contacts)
            scaledRect: {
              top: scaledRect.top + window.scrollY,
              left: scaledRect.left + window.scrollX,
              width: scaledRect.width,
              height: scaledRect.height,
            },
          });
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
      onClick={finished ? handleClick : undefined}
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

export default WiggleCircle;
