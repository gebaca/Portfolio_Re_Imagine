// src/components/Work/SketchRect.tsx
import { useEffect, useRef, useMemo } from 'react';

// ─── Constantes de layout ────────────────────────────────────────────────────
// Estas constantes tienen que coincidir con las del componente padre (Work.tsx)
export const CIRCLE_SIZE = 44; // diámetro del círculo en px
export const GAP = 20; // gap entre círculo y texto
export const PROJECTS_H = 130; // alto del área de proyectos
const LINE_Y_BELOW = 8; // cuántos px baja la línea bajo el baseline del texto
const PAD_RIGHT = 16; // padding dentro del rect a la derecha del texto
const PAD_BOTTOM = 14; // padding inferior del rect
const STROKE_W = 4; // grosor del trazo

// Centro del círculo: el path SIEMPRE arranca aquí
const CX = CIRCLE_SIZE / 2; // 22
const CY = CIRCLE_SIZE / 2; // 22

// Offsets fijos por sección (no Math.random) para irregularidad consistente entre renders
const OFFSETS = [
  [0.8, -0.5, 1.1, 0.3, -0.7, 1.2, -0.4, 0.9],
  [-0.6, 1.0, 0.4, -1.1, 0.7, -0.3, 1.2, -0.8],
  [1.1, 0.3, -0.9, 0.6, 0.2, -1.3, 0.8, -0.5],
];

// ─── Construcción del path ───────────────────────────────────────────────────
//
//  El path recorre el rectángulo en sentido horario:
//
//  (CX, CY) ────────────────────────────── (x1, CY)
//  origen = centro círculo                  top-right
//                                               │
//                                           (x1, y1)
//                                          bottom-right
//       │                                      │
//  (CX, y1) ──────────────────────────────────┘
//  bottom-left
//
//  Importante: TOP EDGE es el primer segmento → es lo que se dibuja en hover.
//  Los otros 3 segmentos se añaden al hacer click.

function buildRectPath(textWidth: number, seedIdx: number): string {
  const o = OFFSETS[seedIdx % 3];
  const x1 = CIRCLE_SIZE + GAP + textWidth + PAD_RIGHT;
  const y1 = CY + LINE_Y_BELOW + PROJECTS_H + PAD_BOTTOM;

  return [
    // Inicio: centro del círculo
    `M ${CX + o[0]},${CY + o[1]}`,

    // TOP EDGE → (x1, CY)
    // Los control points se desvían ligeramente en Y para la ondulación
    `C ${CX + (x1 - CX) * 0.4 + o[2]},${CY - 1.5 + o[3]}
       ${CX + (x1 - CX) * 0.7 + o[4]},${CY + 1.2 + o[5]}
       ${x1 + o[6]},${CY + o[7]}`,

    // RIGHT EDGE → (x1, y1)
    `C ${x1 + 1.8 + o[3]},${CY + (y1 - CY) * 0.4 + o[0]}
       ${x1 - 1.2 + o[5]},${CY + (y1 - CY) * 0.7 + o[2]}
       ${x1 + o[1]},${y1 + o[4]}`,

    // BOTTOM EDGE → (CX, y1)
    `C ${x1 - (x1 - CX) * 0.35 + o[6]},${y1 + 1.5 + o[7]}
       ${CX + (x1 - CX) * 0.3 + o[0]},${y1 - 1.2 + o[3]}
       ${CX + o[4]},${y1 + o[6]}`,

    // LEFT EDGE → cierra en el origen
    `C ${CX - 1.8 + o[7]},${y1 - (y1 - CY) * 0.35 + o[5]}
       ${CX + 1.2 + o[1]},${CY + (y1 - CY) * 0.4 + o[2]}
       ${CX + o[0]},${CY + o[1]}`,
  ].join('\n');
}

// ─── Medir longitud del top edge ─────────────────────────────────────────────
//
// Técnica: path temporal con solo [M + primer C], añadido al DOM invisible,
// getTotalLength(), y eliminado. Es la única forma fiable de medir un segmento.

function measureTopEdge(fullPathD: string): number {
  const lines = fullPathD
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  // lines[0] = "M ...", lines[1] = "C top edge ..."
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

// ─── Componente ──────────────────────────────────────────────────────────────

interface Props {
  hovered: boolean;
  clicked: boolean;
  textWidth: number; // scrollWidth del título, medido en el padre
  filterId: string; // único por instancia: 'f-design', 'f-engineering', etc.
  seed: number; // 0, 1, 2 — índice de OFFSETS
}

export function SketchRect({
  hovered,
  clicked,
  textWidth,
  filterId,
  seed,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const totalLenRef = useRef(0);
  const topEdgeLenRef = useRef(0);

  // El path solo se recalcula si cambia textWidth o seed
  const pathD = useMemo(
    () => buildRectPath(textWidth, seed),
    [textWidth, seed]
  );

  // Setup: calcular longitudes reales tras el primer render con el path nuevo
  useEffect(() => {
    const path = pathRef.current;
    if (!path || textWidth <= 0) return;

    const total = path.getTotalLength();
    const topEdge = measureTopEdge(pathD);

    totalLenRef.current = total;
    topEdgeLenRef.current = topEdge;

    // Estado inicial: invisible (dashoffset = longitud total = trazo fuera de vista)
    path.style.strokeDasharray = `${total}`;
    path.style.strokeDashoffset = `${total}`;
  }, [pathD, textWidth]);

  // Reaccionar a cambios de estado: hover → top edge, click → completo, ninguno → oculto
  useEffect(() => {
    const path = pathRef.current;
    const total = totalLenRef.current;
    const top = topEdgeLenRef.current;
    if (!path || total === 0) return;

    if (clicked) {
      // Completa el rect (continúa desde donde paró el top edge)
      path.style.transition =
        'stroke-dashoffset 0.65s cubic-bezier(0.2, 0.9, 0.4, 1.05)';
      path.style.strokeDashoffset = '0';
    } else if (hovered) {
      // Solo el top edge: el trazo visible = topEdgeLen
      // dashoffset = total - topEdge → "el trazo empieza en 0 y llega hasta topEdge"
      path.style.transition =
        'stroke-dashoffset 0.42s cubic-bezier(0.2, 0.9, 0.4, 1.05)';
      path.style.strokeDashoffset = `${total - top}`;
    } else {
      // Oculto
      path.style.transition = 'stroke-dashoffset 0.28s ease-in';
      path.style.strokeDashoffset = `${total}`;
    }
  }, [hovered, clicked]);

  if (textWidth <= 0) return null;

  const svgW = CIRCLE_SIZE + GAP + textWidth + PAD_RIGHT + 20;
  const svgH = CY + LINE_Y_BELOW + PROJECTS_H + PAD_BOTTOM + 20;

  return (
    // El SVG cubre desde (0,0) del section-row,
    // así (CX, CY) coincide exactamente con el centro del círculo
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: svgW,
        height: svgH,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id={filterId} x='-5%' y='-30%' width='115%' height='200%'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.05 0.08'
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
        strokeWidth={STROKE_W}
        strokeLinecap='round'
        strokeLinejoin='round'
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}
