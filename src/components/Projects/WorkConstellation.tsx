// src/components/Projects/WorkConstellation.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ── Tipos ────────────────────────────────────────────────────────────────────

interface BlobElement {
  type: 'blob';
  x: number; // % de la pantalla
  y: number; // % de la pantalla
  size: number; // px
  color: string;
  opacity?: number;
}

interface LogoElement {
  type: 'logo';
  x: number;
  y: number;
  size: number;
  label: string;
}

interface ScribbleElement {
  type: 'scribble';
  x: number;
  y: number;
  variant: 0 | 1 | 2;
  color?: string;
}

export type ConstellationElement = BlobElement | LogoElement | ScribbleElement;

interface Props {
  elements: ConstellationElement[];
  visible: boolean;
  accentColor: string;
}

const SCRIBBLE_PATHS: Record<number, string> = {
  0: `<svg width="80" height="50" viewBox="0 0 80 50" overflow="visible" fill="none">
        <path class="sd" d="M 2,28 C 15,10 35,8 55,18 C 65,23 72,28 76,30"
          stroke="COLOR" stroke-width="1.8" stroke-linecap="round"/>
        <path class="sd" d="M 68,22 L 76,30 L 66,34"
          stroke="COLOR" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  1: `<svg width="64" height="64" viewBox="0 0 64 64" overflow="visible" fill="none">
        <path class="sd" d="M 32,8 C 52,7 58,22 56,36 C 54,50 40,58 26,53
          C 12,48 6,34 10,22 C 14,10 28,6 38,11 C 48,16 50,30 45,40"
          stroke="COLOR" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`,
  2: `<svg width="40" height="40" viewBox="0 0 40 40" overflow="visible" fill="none">
        <path class="sd" d="M 6,6 C 12,14 24,24 34,34"
          stroke="COLOR" stroke-width="1.8" stroke-linecap="round"/>
        <path class="sd" d="M 34,6 C 26,14 18,22 6,34"
          stroke="COLOR" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`,
};

export function WorkConstellation({ elements, visible, accentColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const previousVisibleRef = useRef(false);

  // ── Construir elementos en el DOM ─────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar todo (tanto elementos como animaciones pendientes)
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    container.innerHTML = '';
    itemRefs.current = [];

    // Solo construir si visible o si vamos a hacer la transición
    // (pero siempre construimos para que los elementos estén listos)
    elements.forEach((cfg) => {
      const wrap = document.createElement('div');
      wrap.style.cssText = `
        position: fixed;
        left: ${cfg.x}vw;
        top:  ${cfg.y}vh;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transform: scale(0);
        transform-origin: center center;
      `;

      if (cfg.type === 'blob') {
        const el = document.createElement('div');
        el.style.cssText = `
          width:  ${cfg.size}px;
          height: ${cfg.size}px;
          background: ${cfg.color};
          border-radius: 48% 52% 55% 45% / 45% 48% 52% 55%;
          opacity: ${cfg.opacity ?? 0.1};
        `;
        wrap.appendChild(el);
      } else if (cfg.type === 'logo') {
        const el = document.createElement('div');
        el.style.cssText = `
          width:  ${cfg.size}px;
          height: ${cfg.size}px;
          border-radius: 50%;
          border: 1.5px solid #111;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${Math.max(8, cfg.size * 0.17)}px;
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #111;
          text-transform: uppercase;
        `;
        el.textContent = cfg.label;
        wrap.appendChild(el);
      } else if (cfg.type === 'scribble') {
        const color = cfg.color ?? accentColor;
        const svg = SCRIBBLE_PATHS[cfg.variant].replace(/COLOR/g, color);
        wrap.innerHTML = svg;

        // Preparar paths para animación posterior
        requestAnimationFrame(() => {
          wrap.querySelectorAll<SVGPathElement>('.sd').forEach((path) => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = `${len}`;
            path.style.strokeDashoffset = `${len}`;
          });
        });
      }

      container.appendChild(wrap);
      itemRefs.current.push(wrap);
    });
  }, [elements, accentColor]);

  // ── Animar entrada / salida con transición suave entre constelaciones ───
  useEffect(() => {
    const items = itemRefs.current;
    if (items.length === 0) return;

    // Cancelar animación anterior
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (visible) {
      // Resetear estado visual antes de animar entrada
      gsap.set(items, { opacity: 0, scale: 0 });

      // Entrada: pop con stagger
      animationRef.current = gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: 0.08,
        onComplete: () => {
          // Animar garabatos tras aparecer
          items.forEach((wrap) => {
            wrap.querySelectorAll<SVGPathElement>('.sd').forEach((path) => {
              gsap.to(path, {
                strokeDashoffset: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.1,
              });
            });
          });
          animationRef.current = null;
        },
      });
      previousVisibleRef.current = true;
    } else if (previousVisibleRef.current) {
      // Solo animar salida si antes estábamos visibles
      animationRef.current = gsap.to([...items].reverse(), {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05,
        onComplete: () => {
          animationRef.current = null;
          // Opcional: limpiar el contenido después de la animación
          // No limpiamos para evitar parpadeos al abrir otra sección
        },
      });
      previousVisibleRef.current = false;
    } else {
      // Si no hay transición visible, simplemente aseguramos que estén ocultos
      gsap.set(items, { opacity: 0, scale: 0 });
      previousVisibleRef.current = false;
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
    />
  );
}
