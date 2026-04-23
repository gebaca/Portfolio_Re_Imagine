// src/routes/Work.tsx
import { useState, useEffect, useRef } from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { SketchRect, CIRCLE, GAP } from '../components/SketchRect';
import { ProjectItem } from '../components/Projects/ProjectItem';
import { projects } from '../components/Projects/projects'; // tu array de proyectos
import { SketchDividers } from '../components/Projects/SketchDividers';

// Asignar proyectos a cada sección
const SECTIONS = [
  {
    id: 'case-studies',
    title: 'Case Studies',
    circleColor: '#FDDA0D',
    projects: projects.filter((p) => p.section === 'feature'),
  },
  {
    id: 'projects',
    title: 'Projects',
    circleColor: '#E8432D',
    projects: projects.filter((p) => p.section === 'project'),
  },
  {
    id: 'experiments',
    title: 'Experiments',
    circleColor: '#2B5CE6',
    projects: projects.filter((p) => p.section === 'archive'),
  },
];

const PAD_B = 24;

function Work() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const [projHeights, setProjHeights] = useState<Record<string, number>>({});
  const [projWidths, setProjWidths] = useState<Record<string, number>>({});

  const titleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const gridRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [gridSizes, setGridSizes] = useState<
    Record<string, { w: number; h: number; rowH: number }>
  >({});

  useEffect(() => {
    if (!clickedId) return;
    const el = gridRefs.current[clickedId];
    if (!el) return;

    // Pequeño delay para que la animación de apertura termine
    const timer = setTimeout(() => {
      const rows = Math.ceil(
        (SECTIONS.find((s) => s.id === clickedId)?.projects.length ?? 0) / 2
      );
      setGridSizes((prev) => ({
        ...prev,
        [clickedId]: {
          w: el.offsetWidth,
          h: el.offsetHeight,
          rowH: el.offsetHeight / rows,
        },
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [clickedId]);

  // Medir ancho del texto
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

  // Medir altura real del contenido de proyectos
  // Se hace con height:auto temporalmente para que el DOM calcule el scrollHeight
  useEffect(() => {
    const h: Record<string, number> = {};
    const w: Record<string, number> = {};

    SECTIONS.forEach(({ id }) => {
      const el = contentRefs.current[id];
      if (!el) return;

      // Liberar restricciones para medir el tamaño natural
      el.style.height = 'auto';
      el.style.width = 'max-content';
      el.style.overflow = 'visible';

      h[id] = el.scrollHeight;
      w[id] = el.scrollWidth;

      // Restaurar
      el.style.height = '0px';
      el.style.width = '';
      el.style.overflow = 'hidden';
    });

    setProjHeights(h);
    setProjWidths(w);
  }, []);

  return (
    <div className='w-full min-h-screen bg-white pt-20 px-8'>
      <div className='flex flex-col items-start gap-20 max-w-2xl'>
        {SECTIONS.map((sec, i) => {
          const isHovered = hoveredId === sec.id;
          const isClicked = clickedId === sec.id;
          const textW = widths[sec.id] ?? 0;
          const projH = projHeights[sec.id] ?? 0;

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
              {/* Header */}
              <div
                className='relative flex items-center'
                style={{ gap: GAP, height: CIRCLE, zIndex: 2 }}
              >
                <div style={{ width: CIRCLE, height: CIRCLE, flexShrink: 0 }}>
                  <CircleSVG
                    color={sec.circleColor}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                <div
                  className='overflow-hidden'
                  style={{
                    maxWidth: isHovered || isClicked ? `${textW}px` : '0px',
                    height: CIRCLE,
                    display: 'flex',
                    alignItems: 'center',
                    transition:
                      'max-width 0.38s cubic-bezier(0.2,0.9,0.4,1.05)',
                  }}
                >
                  <span
                    ref={(el) => {
                      titleRefs.current[sec.id] = el;
                    }}
                    className='text-3xl font-medium tracking-wide text-black whitespace-nowrap'
                    style={{
                      display: 'inline-block',
                      transform:
                        isHovered || isClicked
                          ? 'translateX(0)'
                          : 'translateX(-100%)',
                      opacity: isHovered || isClicked ? 1 : 0,
                      transition:
                        'transform 0.38s cubic-bezier(0.2,0.9,0.4,1.05), opacity 0.22s ease-out',
                    }}
                  >
                    {sec.title}
                  </span>
                </div>
              </div>

              {/* SketchRect recibe la altura real medida */}
              <SketchRect
                hovered={isHovered}
                clicked={isClicked}
                textWidth={textW}
                projHeight={projH + PAD_B}
                filterId={`f-${sec.id}`}
                seed={i}
                projWidth={projWidths[sec.id] ?? 0}
              />

              {/*
                El contenido se mide con contentRefs.
                height animado entre 0 y projH real.
              */}
              <div
                ref={(el) => {
                  contentRefs.current[sec.id] = el;
                }}
                style={{
                  marginLeft: CIRCLE + GAP,
                  overflow: 'hidden',
                  height: isClicked ? `${projH}px` : '0px',
                  // maxWidth en vez de width — el contenido fluye dentro sin salirse
                  maxWidth: Math.min(
                    Math.max(textW, projWidths[sec.id] ?? 0),
                    480
                  ),
                  width: '100%', // ← ocupa lo disponible hasta maxWidth
                  opacity: isClicked ? 1 : 0,
                  transition:
                    'height 0.45s cubic-bezier(0.2,0.9,0.4,1.05), opacity 0.3s ease-out 0.5s',
                }}
              >
                {/*
                  Grid 2 columnas Swiss.
                  Cada proyecto ocupa una celda.
                  Si hay número impar, la última celda queda vacía.
                */}
                <div
                  className='grid grid-cols-2 pt-4 pb-3'
                  ref={(el) => {
                    gridRefs.current[sec.id] = el;
                  }}
                  style={{
                    paddingRight: 20,
                    columnGap: 0,
                    position: 'relative',
                    width: 'max-content',
                    height: '100%',
                    minWidth: 0, // ← evita que el grid se expanda más allá
                  }}
                >
                  {/* Separadores sketch — solo visibles cuando está abierto */}
                  {isClicked && gridSizes[sec.id] && (
                    <SketchDividers
                      width={gridSizes[sec.id].w}
                      height={gridSizes[sec.id].h}
                      // rows y rowHeight ya no existen
                      seed={i}
                    />
                  )}

                  {sec.projects.map((project, idx) => (
                    <ProjectItem
                      key={project.id}
                      index={idx + 1}
                      title={project.title}
                      year='2024'
                      stack={project.stack ?? []}
                      url={project.url ?? '#'}
                      dotColor={sec.circleColor}
                      isLeft={idx % 2 === 0}
                    />
                  ))}
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
