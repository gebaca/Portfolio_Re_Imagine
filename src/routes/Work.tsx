// src/routes/Work.tsx
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { SketchRect, CIRCLE, GAP } from '../components/SketchRect';
import { ProjectItem } from '../components/Projects/ProjectItem';
import { projects } from '../components/Projects/projects';
import { SketchDividers } from '../components/Projects/SketchDividers';
import { WorkConstellation } from '../components/Projects/WorkConstellation';
import { CONSTELLATIONS } from '../components/Projects/constellations';
import { useIsMobile } from '../hooks/useIsMobile';

const CIRCLE_OFFSETS = [
  { x: 0, y: 0 },
  { x: 9, y: 8 },
  { x: -3, y: 16 },
];

const SECTIONS = [
  {
    id: 'case-studies',
    title: 'Case Studies',
    circleColor: '#111111',
    accentColor: '#E8432D',
    projects: projects.filter((p) => p.section === 'feature'),
  },
  {
    id: 'projects',
    title: 'Projects',
    circleColor: '#111111',
    accentColor: '#E8432D',
    projects: projects.filter((p) => p.section === 'project'),
  },
  {
    id: 'experiments',
    title: 'Experiments',
    circleColor: '#111111',
    accentColor: '#E8432D',
    projects: projects.filter((p) => p.section === 'archive'),
  },
];

const PAD_B = 24;

function Work() {
  const isMobile = useIsMobile();
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();
  const bgCircleDivRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const [projHeights, setProjHeights] = useState<Record<string, number>>({});
  const [projWidths, setProjWidths] = useState<Record<string, number>>({});
  const [gridSizes, setGridSizes] = useState<
    Record<string, { w: number; h: number; rowH: number }>
  >({});
  const titleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const gridRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ── Refs del contexto ──────────────────────────────────────────────────────
  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (bgCircleDivRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  // ── Animación círculo de entrada ───────────────────────────────────────────
  useGSAP(
    () => {
      const el = bgCircleDivRef.current;
      if (!el || !circleState?.scaledRect) return;

      const finalSize = isMobile ? 200 : 320;
      const winW = window.innerWidth;
      const finalLeft = winW - finalSize * 0.65;
      const finalTop = -finalSize * 0.4;

      gsap.fromTo(
        el,
        {
          width: circleState.scaledRect.width,
          height: circleState.scaledRect.height,
          top: circleState.scaledRect.top,
          left: circleState.scaledRect.left,
          opacity: 1,
        },
        {
          width: finalSize,
          height: finalSize,
          top: finalTop,
          left: finalLeft,
          opacity: isMobile ? 0.08 : 0.12,
          duration: isMobile ? 0.8 : 1.1,
          ease: 'power3.inOut',
          delay: 0.1,
        }
      );
    },
    { dependencies: [circleState, isMobile], scope: bgCircleDivRef }
  );

  // ── Medición del grid ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!clickedId) return;
    const el = gridRefs.current[clickedId];
    if (!el) return;
    const timer = setTimeout(() => {
      const sec = SECTIONS.find((s) => s.id === clickedId);
      const rows = Math.ceil((sec?.projects.length ?? 0) / 2);
      const firstCell = el.querySelector('a') as HTMLElement;
      const rowHeight = firstCell?.offsetHeight ?? el.offsetHeight / rows;
      setGridSizes(
        (prev: Record<string, { w: number; h: number; rowH: number }>) => ({
          ...prev,
          [clickedId]: {
            w: el.offsetWidth,
            h: el.offsetHeight,
            rowH: rowHeight,
          },
        })
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [clickedId]);

  // ── Medición títulos ───────────────────────────────────────────────────────
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

  // ── Medición contenido ─────────────────────────────────────────────────────
  useEffect(() => {
    const h: Record<string, number> = {};
    const w: Record<string, number> = {};
    SECTIONS.forEach(({ id }) => {
      const el = contentRefs.current[id];
      if (!el) return;
      el.style.height = 'auto';
      el.style.width = 'max-content';
      el.style.overflow = 'visible';
      h[id] = el.scrollHeight;
      w[id] = el.scrollWidth;
      el.style.height = '0px';
      el.style.width = '';
      el.style.overflow = 'hidden';
    });
    setProjHeights(h);
    setProjWidths(w);
  }, []);

  const handleSectionClick = (id: string) => {
    setClickedId((prev) => (prev === id ? null : id));
    setHoveredId(null);
  };

  return (
    <div
      style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}
    >
      {/* ── Círculo de fondo ── */}
      {circleState?.rect && (
        <div
          ref={setBgRef}
          style={{
            position: 'fixed',
            top: circleState.scaledRect?.top,
            left: circleState.scaledRect?.left,
            width: circleState.scaledRect?.width,
            height: circleState.scaledRect?.height,
            transformOrigin: 'center center',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <CircleSVG
            color='#DE0A00'
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {/* ── Contenido ── */}
      <div ref={setContentRef} style={{ position: 'relative', zIndex: 1 }}>
        <div
          className={`w-full min-h-screen pt-20 ${isMobile ? 'px-6' : 'px-16'}`}
        >
          <div className='flex flex-col items-start gap-20 mx-auto mt-3'>
            {SECTIONS.map((sec, i) => {
              const isHovered = hoveredId === sec.id;
              const isClicked = clickedId === sec.id;
              const textW = widths[sec.id] ?? 0;
              const projH = projHeights[sec.id] ?? 0;
              const gridCols = isMobile ? 'grid-cols-1' : 'grid-cols-2';

              return (
                <div
                  key={sec.id}
                  className='relative w-full'
                  style={{
                    // Offsets Tullet solo en desktop
                    transform: isMobile
                      ? 'none'
                      : `translate(${CIRCLE_OFFSETS[i].x}px, ${CIRCLE_OFFSETS[i].y}px)`,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {/* ── Header — solo el área círculo+título es clicable ── */}
                  <div
                    className='relative flex items-center'
                    style={{
                      gap: GAP,
                      height: CIRCLE,
                      zIndex: 2,
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => {
                      if (!isMobile && !isClicked) setHoveredId(sec.id);
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveredId(null);
                    }}
                    onClick={() => handleSectionClick(sec.id)}
                  >
                    {/* Círculo — negro → rojo en hover/click */}
                    <div
                      style={{ width: CIRCLE, height: CIRCLE, flexShrink: 0 }}
                    >
                      <CircleSVG
                        color={isHovered || isClicked ? '#DE0A00' : '#111'}
                        style={{
                          width: '100%',
                          height: '100%',
                          transition: 'color 0.3s',
                        }}
                      />
                    </div>

                    {/* Título — siempre visible en móvil, animado en desktop */}
                    {isMobile ? (
                      <span
                        ref={(el) => {
                          titleRefs.current[sec.id] = el;
                        }}
                        className='text-2xl font-medium tracking-wide text-black whitespace-nowrap'
                      >
                        {sec.title}
                      </span>
                    ) : (
                      <div
                        className='overflow-hidden'
                        style={{
                          maxWidth:
                            isHovered || isClicked ? `${textW}px` : '0px',
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
                    )}

                    {/* Flecha indicadora — solo móvil */}
                    {isMobile && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: '14px',
                          transform: isClicked
                            ? 'rotate(90deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.3s ease, color 0.3s',
                          color: isClicked ? '#DE0A00' : '#bbb',
                        }}
                      >
                        →
                      </span>
                    )}
                  </div>

                  {/* Separador móvil */}
                  {isMobile && (
                    <div
                      style={{
                        height: 1,
                        background: isClicked ? '#111' : '#f0f0f0',
                        marginLeft: CIRCLE + GAP,
                        marginTop: 8,
                        transition: 'background 0.3s ease',
                      }}
                    />
                  )}

                  {/* SketchRect — solo desktop */}
                  {!isMobile && (
                    <SketchRect
                      hovered={isHovered}
                      clicked={isClicked}
                      textWidth={textW}
                      projHeight={projH + PAD_B}
                      filterId={`f-${sec.id}`}
                      seed={i}
                      projWidth={projWidths[sec.id] ?? 0}
                    />
                  )}

                  {/* ── Contenido desplegable ── */}
                  <div
                    ref={(el) => {
                      contentRefs.current[sec.id] = el;
                    }}
                    style={{
                      marginLeft: isMobile ? 0 : CIRCLE + GAP,
                      paddingLeft: isMobile ? CIRCLE + GAP : 0,
                      overflow: 'hidden',
                      height: isClicked ? `${projH}px` : '0px',
                      maxWidth: isMobile
                        ? '100%'
                        : Math.min(
                            Math.max(textW, projWidths[sec.id] ?? 0),
                            480
                          ),
                      width: '100%',
                      opacity: isClicked ? 1 : 0,
                      transition:
                        'height 0.45s cubic-bezier(0.2,0.9,0.4,1.05), opacity 0.3s ease-out 0.5s',
                    }}
                  >
                    <div
                      className={`grid ${gridCols} pt-4 pb-3`}
                      ref={(el) => {
                        gridRefs.current[sec.id] = el;
                      }}
                      style={{
                        paddingRight: 20,
                        columnGap: 0,
                        position: 'relative',
                        width: isMobile ? '100%' : 'max-content',
                        height: '100%',
                      }}
                    >
                      {/* SketchDividers solo desktop con 2 columnas */}
                      {!isMobile && isClicked && gridSizes[sec.id] && (
                        <SketchDividers
                          height={gridSizes[sec.id].h + 3}
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
                          dotColor={sec.accentColor}
                          isLeft={isMobile ? false : idx % 2 === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Constelación — solo desktop */}
      {!isMobile && (
        <WorkConstellation
          elements={CONSTELLATIONS[clickedId ?? ''] ?? []}
          visible={clickedId !== null}
          accentColor='#DE0A00'
        />
      )}
    </div>
  );
}

export default Work;
