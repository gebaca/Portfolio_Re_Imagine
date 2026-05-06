// src/components/Projects/WorkConstellation.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface SketchElement {
  type: 'sketch';
  x: number; // % de la pantalla (vw)
  y: number; // % de la pantalla (vh)
  width: number; // px — ancho del SVG
  height: number;
  node: React.ReactNode; // el SVG importado desde SketchIcons
}

export type ConstellationElement = SketchElement;

interface Props {
  elements: ConstellationElement[];
  visible: boolean;
  accentColor: string;
}

export function WorkConstellation({ elements, visible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const prevVisibleRef = useRef(false);

  // ── Construir elementos ───────────────────────────────────────────────────
  // Como los nodes son ReactNode no podemos usar innerHTML.
  // Usamos un portal o simplemente renderizamos en JSX directamente.
  // Por eso cambiamos el enfoque: en vez de DOM imperativo, JSX puro.
  // El useEffect solo gestiona las animaciones GSAP sobre los divs ya montados.

  // ── Animar entrada / salida ───────────────────────────────────────────────
  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (visible) {
      gsap.set(items, { opacity: 0, scale: 0 });
      animationRef.current = gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: 0.08,
        onComplete: () => {
          animationRef.current = null;
        },
      });
      prevVisibleRef.current = true;
    } else if (prevVisibleRef.current) {
      animationRef.current = gsap.to([...items].reverse(), {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05,
        onComplete: () => {
          animationRef.current = null;
        },
      });
      prevVisibleRef.current = false;
    } else {
      gsap.set(items, { opacity: 0, scale: 0 });
      prevVisibleRef.current = false;
    }
  }, [visible, elements]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {elements.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) itemRefs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            left: `${cfg.x}vw`,
            top: `${cfg.y}vh`,
            width: cfg.width,
            height: cfg.height,
            opacity: 0,
            transform: 'scale(0)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            overflow: 'visible', // ← que no recorte
          }}
        >
          {/* Forzar que el SVG hijo ocupe todo el div */}
          <div
            style={{ width: '100%', height: '100%' }}
            // Inyecta estilos en el SVG hijo via CSS
            className='sketch-node-wrapper'
          >
            {cfg.node}
          </div>
        </div>
      ))}
    </div>
  );
}
