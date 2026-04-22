// src/routes/Work.tsx
import { useState, useEffect, useRef } from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import {
  SketchRect,
  CIRCLE_SIZE,
  GAP,
  PROJECTS_H,
} from '../components/SketchRect';

const SECTIONS = [
  { id: 'design', title: 'Design', circleColor: '#FDDA0D' },
  { id: 'engineering', title: 'Engineering', circleColor: '#E8432D' },
  { id: 'hybrid', title: 'Hybrid', circleColor: '#2B5CE6' },
];

function Work() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const titleRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Medir scrollWidth real de cada título.
  // scrollWidth funciona aunque el elemento tenga opacity:0 o transform,
  // siempre que NO tenga display:none ni width:0.
  // Por eso el clip está en el contenedor (overflow:hidden + maxWidth),
  // nunca en el span directamente.
  useEffect(() => {
    const measure = () => {
      const w: Record<string, number> = {};
      SECTIONS.forEach(({ id }) => {
        w[id] = titleRefs.current[id]?.scrollWidth ?? 0;
      });
      setWidths(w);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className='w-full min-h-screen bg-white pt-20 px-8'>
      <div className='flex flex-col items-start gap-20 max-w-2xl'>
        {SECTIONS.map((sec, i) => {
          const isHovered = hoveredId === sec.id;
          const isClicked = clickedId === sec.id;
          const textW = widths[sec.id] ?? 0;

          return (
            <div
              key={sec.id}
              className='relative w-full'
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => {
                if (!isClicked) setHoveredId(sec.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setClickedId((prev) => (prev === sec.id ? null : sec.id));
                setHoveredId(null);
              }}
            >
              {/*
                HEADER: círculo + texto
                height fija = CIRCLE_SIZE para que CY coincida con el centro
                z-index: 1 para que el texto quede ENCIMA del SVG
              */}
              <div
                className='relative flex items-center gap-5'
                style={{ height: CIRCLE_SIZE, zIndex: 1 }}
              >
                <div
                  style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    flexShrink: 0,
                  }}
                >
                  <CircleSVG
                    color={sec.circleColor}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/*
                  Clip del título:
                  - El SPAN siempre está en el DOM → scrollWidth siempre medible
                  - El CONTENEDOR hace el clip con overflow:hidden + maxWidth animado
                  - El SPAN desliza con translateX (texto y línea arrancan a la vez
                    porque comparten el mismo duration y easing)
                */}
                <div
                  className='overflow-hidden'
                  style={{
                    maxWidth: isHovered || isClicked ? `${textW}px` : '0px',
                    height: CIRCLE_SIZE,
                    display: 'flex',
                    alignItems: 'center',
                    transition:
                      'max-width 0.42s cubic-bezier(0.2, 0.9, 0.4, 1.05)',
                  }}
                >
                  <span
                    ref={(el) => {
                      titleRefs.current[sec.id] = el;
                    }}
                    className='text-2xl font-medium tracking-wide text-black whitespace-nowrap'
                    style={{
                      display: 'inline-block',
                      transform:
                        isHovered || isClicked
                          ? 'translateX(0)'
                          : 'translateX(-100%)',
                      opacity: isHovered || isClicked ? 1 : 0,
                      // Mismo duration que el SVG para que arranquen a la vez
                      transition:
                        'transform 0.42s cubic-bezier(0.2, 0.9, 0.4, 1.05), opacity 0.25s ease-out',
                    }}
                  >
                    {sec.title}
                  </span>
                </div>
              </div>

              {/*
                SVG: position absolute top:0 left:0
                → (CX, CY) del path = (22, 22) = centro exacto del círculo
                El SVG está detrás del header (zIndex por defecto = 0 < zIndex:1 del header)
              */}
              <SketchRect
                hovered={isHovered}
                clicked={isClicked}
                textWidth={textW}
                filterId={`f-${sec.id}`}
                seed={i}
              />

              {/*
                Contenido de proyectos:
                - margin-left = CIRCLE_SIZE + GAP → alineado con el texto
                - Aparece con delay 0.4s para que el rect ya esté dibujado
              */}
              <div
                style={{
                  marginLeft: CIRCLE_SIZE + GAP,
                  overflow: 'hidden',
                  height: isClicked ? `${PROJECTS_H}px` : '0px',
                  opacity: isClicked ? 1 : 0,
                  transition:
                    'height 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.05), opacity 0.3s ease-out 0.4s',
                }}
              >
                <div className='pt-4 pb-3 pr-3'>
                  {/* Aquí van tus ProjectCards */}
                  <p className='text-sm text-zinc-400'>
                    Proyectos de {sec.title}…
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Work;
