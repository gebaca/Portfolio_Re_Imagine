// src/components/Work/SketchRect.tsx
import { useEffect, useRef, useMemo } from 'react';

export const CIRCLE = 44;
export const GAP = 20;
const STROKE = 4;
const GAP_Y = 6; // px entre bottom del texto y la línea
const PAD_B = 20; // padding inferior del rect

// La línea (top edge) está justo debajo del texto
const SX = CIRCLE / 2; // 22 — centro X del círculo, punto de inicio
const LY = CIRCLE + GAP_Y; // 50 — Y de la línea

const OFF = [
  [0.8, -0.5, 1.1, 0.3, -0.7, 1.2, -0.4, 0.9],
  [-0.6, 1.0, 0.4, -1.1, 0.7, -0.3, 1.2, -0.8],
  [1.1, 0.3, -0.9, 0.6, 0.2, -1.3, 0.8, -0.5],
];

function buildPath(
  textWidth: number,
  seedIdx: number,
  projHeight: number,
  projWidth: number
): string {
  const o = OFF[seedIdx % 3];

  const x1 = CIRCLE + GAP + Math.max(textWidth, projWidth);
  const y1 = LY + projHeight; // bottom del rect

  return [
    `M ${SX + o[0]},${LY + o[1]}`,
    // TOP EDGE (se dibuja en hover)
    `C ${SX + (x1 - SX) * 0.35 + o[2]},${LY - 2 + o[3]}
       ${SX + (x1 - SX) * 0.7 + o[4]},${LY + 1.5 + o[5]}
       ${x1 + o[6]},${LY + o[7]}`,
    // RIGHT EDGE
    `C ${x1 + 2 + o[3]},${LY + (y1 - LY) * 0.4 + o[0]}
       ${x1 - 1 + o[5]},${LY + (y1 - LY) * 0.7 + o[2]}
       ${x1 + o[1]},${y1 + o[4]}`,
    // BOTTOM EDGE
    `C ${x1 - (x1 - SX) * 0.35 + o[6]},${y1 + 2 + o[7]}
       ${SX + (x1 - SX) * 0.3 + o[0]},${y1 - 1.5 + o[3]}
       ${SX + o[4]},${y1 + o[6]}`,
    // LEFT EDGE → cierra en el origen
    `C ${SX - 2 + o[7]},${y1 - (y1 - LY) * 0.35 + o[5]}
       ${SX + 1 + o[1]},${LY + (y1 - LY) * 0.4 + o[2]}
       ${SX + o[0]},${LY + o[1]}`,
  ].join('\n');
}

function measureTopEdge(fullD: string): number {
  const lines = fullD
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  tmp.style.cssText = 'position:absolute;visibility:hidden;width:0;height:0';
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', `${lines[0]} ${lines[1]}`);
  tmp.appendChild(p);
  document.body.appendChild(tmp);
  const len = p.getTotalLength();
  document.body.removeChild(tmp);
  return len;
}

interface Props {
  hovered: boolean;
  clicked: boolean;
  textWidth: number;
  projHeight: number; // ← nuevo, viene del padre
  projWidth: number;
  filterId: string;
  seed: number;
}

export function SketchRect({
  hovered,
  clicked,
  textWidth,
  projHeight,
  filterId,
  seed,
  projWidth,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const totalRef = useRef(0);
  const topEdgeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const pathD = useMemo(
    () => buildPath(textWidth, seed, projHeight, projWidth),
    [textWidth, seed, projHeight, projWidth]
  );

  // Calcular longitudes reales tras montar
  useEffect(() => {
    const path = pathRef.current;
    if (!path || textWidth <= 0) return;

    const total = path.getTotalLength();
    const topEdge = measureTopEdge(pathD);
    totalRef.current = total;
    topEdgeRef.current = topEdge;

    path.style.strokeDasharray = `${total}`;
    path.style.strokeDashoffset = `${total}`;
  }, [pathD, textWidth]);

  // Reaccionar a cambios de estado
  useEffect(() => {
    const path = pathRef.current;
    const total = totalRef.current;
    const top = topEdgeRef.current;
    if (!path || total === 0) return;

    clearTimeout(timerRef.current);

    if (clicked) {
      // Rect completo — sin delay, continúa desde donde está el top edge
      path.style.transition =
        'stroke-dashoffset 0.65s cubic-bezier(0.2,0.9,0.4,1.05)';
      path.style.strokeDashoffset = '0';
    } else if (hovered) {
      // Solo top edge, con 200ms de delay para que el texto aparezca primero
      timerRef.current = setTimeout(() => {
        path.style.transition =
          'stroke-dashoffset 0.42s cubic-bezier(0.2,0.9,0.4,1.05)';
        path.style.strokeDashoffset = `${total - top}`;
      }, 200);
    } else {
      // Oculto
      path.style.transition = 'stroke-dashoffset 0.22s ease-in';
      path.style.strokeDashoffset = `${total}`;
    }

    return () => clearTimeout(timerRef.current);
  }, [hovered, clicked]);

  if (textWidth <= 0) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CIRCLE + GAP + textWidth + 30,
        height: LY + projHeight + PAD_B + 20,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 1,
      }}
    >
      <defs>
        <filter id={filterId} x='-5%' y='-80%' width='115%' height='350%'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.055 0.09'
            numOctaves='3'
            seed={seed + 2}
            result='n'
          />
          <feDisplacementMap
            in='SourceGraphic'
            in2='n'
            scale='2.5'
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={pathD}
        fill='none'
        stroke='#111'
        strokeWidth={STROKE}
        strokeLinecap='round'
        strokeLinejoin='round'
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}
