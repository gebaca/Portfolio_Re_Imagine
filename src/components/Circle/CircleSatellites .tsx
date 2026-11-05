import { useMemo } from 'react';
import CircleSVGDeformed from './CircleSVGDeformed.tsx';

interface CircleSatellitesProps {
  color: string;
  count: number;
  positionY: number;
  positionX: number;
}

const FADE_DURATION = 700; // ms — cuánto tarda cada círculo en aparecer
const STAGGER_TOTAL = 2400; // ms — ventana total de escalonado

const CircleSatellites = ({
  color,
  count = 100,
  positionY = 100,
  positionX = 100,
}: CircleSatellitesProps) => {
  const satellites = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 200 + 20,
        x: Math.random() * positionX,
        y: Math.random() * positionY,
        opacity: Math.random() * 0.7 + 0.15,
      })),
    []
  );

  return (
    <>
      {satellites.map((sat, i) => (
        <div
          key={sat.id}
          style={{
            position: 'absolute',
            left: `${sat.x}vw`,
            top: `${sat.y}vh`,
            width: sat.size,
            height: sat.size,
            pointerEvents: 'none',
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
            // Parte invisible, anima hasta su opacidad final
            opacity: sat.opacity,
            animation: `satelliteFadeIn ${FADE_DURATION}ms ease-out both`,
            animationDelay: `${(i / count) * STAGGER_TOTAL}ms`,
          }}
        >
          <CircleSVGDeformed
            color={color}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ))}

      <style>{`
        @keyframes satelliteFadeIn {
          from { opacity: 0; }
          to   { opacity: inherit; }
        }
      `}</style>
    </>
  );
};

export default CircleSatellites;
