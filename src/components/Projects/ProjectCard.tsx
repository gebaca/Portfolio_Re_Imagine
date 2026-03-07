import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircleSVG from '../Circle/circleSVG';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  color: string;
  size?: number;
  expandScale?: number;
  side?: 'left' | 'right'; // Work.tsx lo pasa según el índice
  summary?: string; // texto breve sobre el círculo secundario
  extraCount?: number; // SVGs extra que aparecen en grid al click
}

// ── Parámetros ────────────────────────────────────────────────
const SECONDARY_APPEAR_PROGRESS = 0.85; // % del scroll que dispara el secundario
const GRID_COLS = 2; // columnas del grid
// ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  color,
  size = 200,
  expandScale = 1.6,
  side = 'left',
  summary = '',
}: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useGSAP(
    () => {
      const el = containerRef.current;
      const sec = secondaryRef.current;
      if (!el || !sec) return;

      // FASE 1 — expansión del círculo principal con scroll
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: expandScale,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
            onUpdate: (self) => {
              // FASE 2 — secundario aparece cuando el scroll llega al umbral
              if (self.progress >= SECONDARY_APPEAR_PROGRESS) {
                gsap.to(sec, {
                  opacity: 1,
                  scale: 2,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: true,
                });
              } else {
                gsap.to(sec, {
                  opacity: 0,
                  scale: 0.85,
                  duration: 0.3,
                  ease: 'power2.in',
                  overwrite: true,
                });
              }
            },
          },
        }
      );
    },
    { scope: containerRef }
  );

  const secondarySize = size * expandScale;

  const secondary = (
    <div
      ref={secondaryRef}
      style={{
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {/* Círculo secundario con texto */}
      <div
        onClick={() => setExpanded((p) => !p)}
        style={{
          position: 'relative',
          width: secondarySize,
          height: secondarySize,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <CircleSVG
          color={color}
          style={{ width: '100%', height: '100%', opacity: 0.6 }}
        />
        {summary && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20%',
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#111',
              lineHeight: 1.4,
            }}
          >
            {summary}
          </div>
        )}
      </div>

      {/* Grid de SVGs extra — aparecen al click */}
      {expanded && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_COLS}, ${secondarySize}px)`,
            flexShrink: 0,
          }}
        ></div>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Secundario a la izquierda cuando el principal está a la derecha */}
      {side === 'right' && secondary}

      {/* Círculo principal */}
      <div
        ref={containerRef}
        style={{ width: size, height: size, flexShrink: 0 }}
      >
        <CircleSVG color={color} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Secundario a la derecha cuando el principal está a la izquierda */}
      {side === 'left' && secondary}
    </div>
  );
};

export default ProjectCard;
