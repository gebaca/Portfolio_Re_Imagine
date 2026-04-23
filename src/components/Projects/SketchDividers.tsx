// SketchDividers.tsx — versión limpia, solo línea vertical
import { useEffect, useRef } from 'react';

interface Props {
  height: number;
  seed?: number;
}

function vLine(h: number, seed: number): string {
  const offsets = [
    [0.7, -0.4, 1.0, 0.3, -0.6, 1.1],
    [-0.5, 0.9, 0.3, -1.0, 0.6, -0.2],
    [1.0, 0.2, -0.8, 0.5, 0.3, -1.2],
  ][seed % 3];
  const o = offsets;

  // Misma estructura que SketchRect: curvas cúbicas con
  // control points desviados, igual que los edges del rect
  return [
    `M ${o[0]},${o[1]}`,
    `C ${o[2]},${h * 0.35 + o[3]}`,
    `  ${o[4]},${h * 0.7 + o[5]}`,
    `  ${o[0]},${h + o[1]}`,
  ].join(' ');
}

export function SketchDividers({ height, seed = 0 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || height === 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const NS = 'http://www.w3.org/2000/svg';

    const defs = document.createElementNS(NS, 'defs');
    const filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', `df-${seed}`);
    filter.setAttribute('x', '-200%');
    filter.setAttribute('y', '-5%');
    filter.setAttribute('width', '500%');
    filter.setAttribute('height', '110%');

    const turb = document.createElementNS(NS, 'feTurbulence');
    turb.setAttribute('type', 'fractalNoise');
    turb.setAttribute('baseFrequency', '0.055 0.09'); // ← igual que SketchRect
    turb.setAttribute('numOctaves', '3');
    turb.setAttribute('seed', String(seed + 10));
    turb.setAttribute('result', 'n');

    const disp = document.createElementNS(NS, 'feDisplacementMap');
    disp.setAttribute('in', 'SourceGraphic');
    disp.setAttribute('in2', 'n');
    disp.setAttribute('scale', '2.5');
    disp.setAttribute('xChannelSelector', 'R');
    disp.setAttribute('yChannelSelector', 'G');

    filter.appendChild(turb);
    filter.appendChild(disp);
    defs.appendChild(filter);
    svg.appendChild(defs);

    const vpath = document.createElementNS(NS, 'path');
    vpath.setAttribute('d', vLine(height, seed));
    vpath.setAttribute('fill', 'none');
    vpath.setAttribute('stroke', '#111'); // mismo color
    vpath.setAttribute('stroke-width', '3.5'); // mismo grosor
    vpath.setAttribute('stroke-linecap', 'round');
    vpath.setAttribute('filter', `url(#df-${seed})`);
    svg.appendChild(vpath);
  }, [height, seed]);

  if (height === 0) return null;

  return (
    <svg
      ref={svgRef}
      style={{
        marginTop: 15,
        position: 'absolute',
        top: 0,
        // Se posiciona en el 50% del grid, igual que borderRight en la celda izquierda
        left: '50%',
        width: 4,
        height,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    />
  );
}
