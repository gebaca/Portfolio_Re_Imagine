// src/components/Projects/SketchDividers.tsx
import { useEffect, useRef } from 'react';

interface Props {
  width: number; // ancho total del grid
  height: number; // alto total del grid
  rows: number; // número de filas
  rowHeight: number; // alto de cada fila (aproximado)
  seed?: number;
}

// Path horizontal irregular — mismo sistema que SketchRect
function hLine(w: number, seed: number): string {
  const offsets = [
    [0.8, -0.5, 1.1, 0.3],
    [-0.6, 1.0, 0.4, -1.1],
    [1.0, 0.2, -0.8, 0.5],
  ][seed % 3];
  const o = offsets;
  const y = 0;
  return [
    `M ${o[0]},${y + o[1]}`,
    `C ${w * 0.25 + o[2]},${y - 1.5}`,
    `  ${w * 0.6 + o[3]},${y + 1.2}`,
    `  ${w + o[0]},${y + o[1]}`,
  ].join(' ');
}

function vLine(h: number, seed: number): string {
  const offsets = [
    [0.7, -0.4, 1.0, 0.3],
    [-0.5, 0.9, 0.3, -1.0],
    [1.0, 0.2, -0.8, 0.5],
  ][seed % 3];
  const o = offsets;
  const x = 0;
  return [
    `M ${x + o[0]},${o[1]}`,
    `C ${x - 1.5},${h * 0.35 + o[2]}`,
    `  ${x + 1.2},${h * 0.7 + o[3]}`,
    `  ${x + o[0]},${h}`,
  ].join(' ');
}

export function SketchDividers({
  width,
  height,
  rows,
  rowHeight,
  seed = 0,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || width === 0 || height === 0) return;

    // Limpiar paths anteriores
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const NS = 'http://www.w3.org/2000/svg';

    // ── Filtro compartido ────────────────────────────────────────────────────
    const defs = document.createElementNS(NS, 'defs');
    const filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', `df-${seed}`);
    filter.setAttribute('x', '-10%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '120%');
    filter.setAttribute('height', '300%');

    const turb = document.createElementNS(NS, 'feTurbulence');
    turb.setAttribute('type', 'fractalNoise');
    turb.setAttribute('baseFrequency', '0.05 0.08');
    turb.setAttribute('numOctaves', '3');
    turb.setAttribute('seed', String(seed + 10));
    turb.setAttribute('result', 'n');

    const disp = document.createElementNS(NS, 'feDisplacementMap');
    disp.setAttribute('in', 'SourceGraphic');
    disp.setAttribute('in2', 'n');
    disp.setAttribute('scale', '2');
    disp.setAttribute('xChannelSelector', 'R');
    disp.setAttribute('yChannelSelector', 'G');

    filter.appendChild(turb);
    filter.appendChild(disp);
    defs.appendChild(filter);
    svg.appendChild(defs);

    const filterRef = `url(#df-${seed})`;

    // ── Línea vertical central ────────────────────────────────────────────────
    const vpath = document.createElementNS(NS, 'path');
    vpath.setAttribute('d', vLine(height, seed));
    vpath.setAttribute('fill', 'none');
    vpath.setAttribute('stroke', '#e0e0e0');
    vpath.setAttribute('stroke-width', '1');
    vpath.setAttribute('stroke-linecap', 'round');
    vpath.setAttribute('filter', filterRef);
    vpath.setAttribute('transform', `translate(${width / 2}, 0)`);
    svg.appendChild(vpath);

    // ── Líneas horizontales entre filas ──────────────────────────────────────
    for (let r = 1; r < rows; r++) {
      const y = r * rowHeight;
      const hpath = document.createElementNS(NS, 'path');
      hpath.setAttribute('d', hLine(width, seed + r));
      hpath.setAttribute('fill', 'none');
      hpath.setAttribute('stroke', '#e0e0e0');
      hpath.setAttribute('stroke-width', '1');
      hpath.setAttribute('stroke-linecap', 'round');
      hpath.setAttribute('filter', filterRef);
      hpath.setAttribute('transform', `translate(0, ${y})`);
      svg.appendChild(hpath);
    }
  }, [width, height, rows, rowHeight, seed]);

  if (width === 0 || height === 0) return null;

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    />
  );
}
