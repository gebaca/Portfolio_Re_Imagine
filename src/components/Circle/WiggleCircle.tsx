import CircleSVG from './circleSVG';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useFrameLoop } from '../../hooks/useFrameLoop'; // 👈 Nuevo hook

interface WiggleCircleProps {
  color: string;
  label: string;
  route: string;
  size?: number;
  // Puedes personalizar el efecto por círculo si quieres variedad:
  fps?: number; // Velocidad de los fotogramas (default: 8)
  rotRange?: number; // Grados de rotación máximos (default: 12)
}

const WiggleCircle = ({
  color,
  label,
  route,
  size = 180,
  fps = 4,
  rotRange = 1,
}: WiggleCircleProps) => {
  const container = useRef<HTMLDivElement>(null);
  const circleWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { contextSafe } = useGSAP({ scope: container });

  const { startFrameLoop, stopFrameLoop } = useFrameLoop(circleWrapperRef, {
    fps,
    rotRange,
    driftRange: 1, // Drift mínimo — el efecto es principalmente rotación
  });

  useGSAP(
    () => {
      startFrameLoop();
    },
    { scope: container }
  );

  const handleClick = contextSafe(() => {
    // 1. Para la animación de fotogramas (incluye reset suave a rotation: 0)
    stopFrameLoop();

    // 2. Pequeña pausa para que el reset termine antes de expandirse
    gsap.delayedCall(0.15, () => {
      gsap.to(circleWrapperRef.current, {
        scale: 50,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          navigate(route);
        },
      });
    });

    // 3. Desvanece label
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
    >
      <div
        ref={circleWrapperRef}
        style={{
          width: size,
          height: size,
          transformOrigin: 'center center',
        }}
      >
        <CircleSVG color={color} style={{ width: '100%', height: '100%' }} />
      </div>

      <h2 className='wiggle-char text-black text-xl font-bold tracking-wide'>
        {label}
      </h2>
    </div>
  );
};

export default WiggleCircle;
