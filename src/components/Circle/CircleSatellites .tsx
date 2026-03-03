import { useMemo } from 'react';
import CircleSVG from './circleSVG';

interface CircleSatellitesProps {
  color: string;
  count: number;
  positionY: number;
  positionX: number;
}

/*
  FADE IN — parámetros
  ────────────────────
  FADE_DURATION  : duración del fade de cada satélite individual (ms)
  STAGGER_TOTAL  : tiempo total repartido entre todos los satélites (ms)
                   el delay de cada uno = (i / count) * STAGGER_TOTAL
                   → los últimos empiezan STAGGER_TOTAL ms después que el primero
*/
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
          <CircleSVG color={color} style={{ width: '100%', height: '100%' }} />
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
