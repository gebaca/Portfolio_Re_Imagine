// ============================================================================
// WORK.tsx — Animación de entrada y salida simétricas
// ============================================================================

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { projects } from '../components/Projects/projects';
import type { Project } from '../components/Projects/projects';

// Paleta
const RED = '#DE0A00';
const BLACK = '#111111';
const WHITE = '#FAFAF8';
const GRAY = '#6B6B6B';

const SWISS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "'IBM Plex Mono', 'Courier New', monospace";
const PENCIL = 'Pencil-Regular, sans-serif';

const CONTENT_START = 1.75;
const STEP = 0.1;

// ============================================================================
// StackTag
// ============================================================================
function StackTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '3px 8px',
        background: 'rgba(17,17,17,0.05)',
        color: GRAY,
        border: '0.5px solid rgba(17,17,17,0.12)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ============================================================================
// SectionDivider
// ============================================================================
function SectionDivider({
  letter,
  label,
  count,
  bold = false,
  delay,
}: {
  letter: string;
  label: string;
  count: number;
  bold?: boolean;
  delay: number;
}) {
  return (
    <div
      style={{ opacity: 0, animation: `wkUp 0.40s ease forwards ${delay}s` }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '52px 1fr auto',
          alignItems: 'center',
          gap: 20,
          paddingTop: 54,
          paddingBottom: 13,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: RED,
            letterSpacing: '0.16em',
            fontWeight: 500,
          }}
        >
          {letter}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: GRAY,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: 'rgba(17,17,17,0.30)',
          }}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>
      <div
        style={{
          height: 1,
          background: bold ? 'rgba(17,17,17,0.28)' : 'rgba(17,17,17,0.11)',
        }}
      />
    </div>
  );
}

// ============================================================================
// ProjectRowFeature
// ============================================================================
function ProjectRowFeature({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr clamp(140px,18vw,200px)',
        gap: 'clamp(1rem,2.5vw,1.5rem)',
        padding: 'clamp(1.4rem,3vh,2.2rem) 0',
        borderBottom: '1px solid rgba(17,17,17,0.07)',
        alignItems: 'start',
        cursor: 'default',
        background: hovered ? 'rgba(222,10,0,0.025)' : 'transparent',
        transition: 'background 0.2s ease',
        opacity: 0,
        animation: `wkUp 0.40s ease forwards ${delay}s`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 11,
          paddingTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 42,
            fontWeight: 400,
            color: hovered ? RED : 'rgba(17,17,17,0.12)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            transition: 'color 0.25s ease',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: RED,
            border: `0.5px solid ${RED}`,
            padding: '2px 5px',
            display: 'inline-block',
          }}
        >
          Case Study
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <h3
          style={{
            fontFamily: SWISS,
            fontSize: 'clamp(38px,6vw,60px)',
            fontWeight: 700,
            margin: 0,
            lineHeight: 0.93,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: BLACK,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: PENCIL,
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            lineHeight: 1.75,
            color: GRAY,
            margin: 0,
            maxWidth: '40ch',
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}
        >
          {project.stack?.map((s) => (
            <StackTag key={s} label={s} />
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target='_blank'
            rel='noreferrer'
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(17,17,17,0.40)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 2,
              transition: 'color 0.2s',
              width: 'fit-content',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(17,17,17,0.40)')
            }
          >
            Ver proyecto →
          </a>
        )}
      </div>

      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          border: `0.5px solid ${
            hovered ? 'rgba(222,10,0,0.40)' : 'rgba(17,17,17,0.10)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          alignSelf: 'center',
          background: WHITE,
          transition: 'border-color 0.25s',
        }}
      >
        {project.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${project.youtubeId}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow='autoplay; encrypted-media'
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              opacity: hovered ? 0.55 : 0.18,
              transition: 'opacity 0.25s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <CircleSVG color={RED} style={{ width: 50, height: 50 }} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 8,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: BLACK,
              }}
            >
              {project.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ProjectRowCompact
// ============================================================================
function ProjectRowCompact({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr auto',
        gap: 24,
        padding: '17px 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.06)',
        alignItems: 'center',
        cursor: 'default',
        background: hovered ? 'rgba(222,10,0,0.02)' : 'transparent',
        transition: 'background 0.15s',
        opacity: 0,
        animation: `wkUp 0.40s ease forwards ${delay}s`,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 22,
          color: hovered ? RED : 'rgba(17,17,17,0.15)',
          letterSpacing: '-0.02em',
          transition: 'color 0.2s',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3
          style={{
            fontFamily: SWISS,
            fontSize: 'clamp(22px,2.8vw,30px)',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: hovered ? BLACK : 'rgba(17,17,17,0.70)',
            transition: 'color 0.2s',
          }}
        >
          {project.title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack?.map((s) => (
            <StackTag key={s} label={s} />
          ))}
        </div>
      </div>
      {project.url && (
        <a
          href={project.url}
          target='_blank'
          rel='noreferrer'
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(17,17,17,0.35)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'rgba(17,17,17,0.35)')
          }
        >
          Ver →
        </a>
      )}
    </div>
  );
}

// ============================================================================
// ProjectRowExperiment
// ============================================================================
function ProjectRowExperiment({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => project.url && window.open(project.url, '_blank')}
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr auto',
        gap: 24,
        padding: '9px 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.05)',
        alignItems: 'center',
        cursor: project.url ? 'pointer' : 'default',
        opacity: hovered ? 0.7 : 0.4,
        transition: 'opacity 0.2s',
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 14, color: GRAY }}>—</span>
      <span
        style={{
          fontSize: 15,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: BLACK,
        }}
      >
        {project.title}
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: GRAY,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
        }}
      >
        Exp
      </span>
    </div>
  );
}

function ProjectRowExperimentAnimated({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <div
      style={{ opacity: 0, animation: `wkFade 0.40s ease forwards ${delay}s` }}
    >
      <ProjectRowExperiment project={project} />
    </div>
  );
}

// ============================================================================
// Satellites
// ============================================================================
function Satellites() {
  const items = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        size: Math.random() * 160 + 14,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.05 + 0.015,
        delay: (i / 70) * 2500,
      })),
    []
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {items.map((sat) => (
        <div
          key={sat.id}
          style={{
            position: 'absolute',
            left: `${sat.x}vw`,
            top: `${sat.y}vh`,
            width: sat.size,
            height: sat.size,
            transform: 'translate(-50%,-50%)',
            opacity: 0,
            animation: `wkSat 700ms ease-out ${sat.delay}ms forwards`,
            ['--sat-op' as string]: sat.opacity,
          }}
        >
          <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Work – componente principal
// ============================================================================
function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();
  const [titleReady, setTitleReady] = useState(false);
  const oSlotRef = useRef<HTMLSpanElement>(null);

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  // Animación de entrada: mover el círculo grande (si existe) hacia la O
  useEffect(() => {
    // Si no hay circleState, no hacemos nada (el círculo no existe)
    if (!circleState?.scaledRect) return;

    const slot = oSlotRef.current;
    if (!slot) return;

    const bg = bgCircleRef.current;
    if (!bg) return;

    const slotRect = slot.getBoundingClientRect();

    const tl = gsap.timeline({
      onComplete: () => {
        // Una vez terminada, actualizamos las propiedades del círculo
        // para que coincida exactamente con la O y sea el que se animará después.
        gsap.set(bg, {
          top: slotRect.top + window.scrollY,
          left: slotRect.left + window.scrollX,
          width: slotRect.width,
          height: slotRect.height,
          clearProps: 'transform', // elimina cualquier scale/translate residual
        });
        // Marcamos que la animación de título puede comenzar
        setTitleReady(true);
      },
    });

    tl.to(bg, {
      top: slotRect.top + window.scrollY,
      left: slotRect.left + window.scrollX,
      width: slotRect.width,
      height: slotRect.height,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.2,
    });
  }, [circleState, bgCircleRef]);

  // Para entrada directa (sin circleState), no hay círculo que animar,
  // pero igualmente mostramos el título.
  useEffect(() => {
    if (!circleState?.scaledRect) {
      // No hay círculo, simplemente mostramos el título
      const timer = setTimeout(() => setTitleReady(true), 300);
      return () => clearTimeout(timer);
    }
  }, [circleState]);

  const caseStudies = projects.filter((p) => p.section === 'feature');
  const projectList = projects.filter((p) => p.section === 'project');
  const experiments = projects.filter((p) => p.section === 'experiment');

  let d = CONTENT_START;
  const nextDelay = () => {
    const v = d;
    d += STEP;
    return v;
  };

  return (
    <>
      <style>{`
        @keyframes wkUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes wkFade {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes wkSat {
          from { opacity:0; }
          to   { opacity:var(--sat-op); }
        }
        @keyframes wkSlideL {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0);      }
        }
        @keyframes wkSlideR {
          from { opacity:0; transform:translateX(10px); }
          to   { opacity:1; transform:translateX(0);     }
        }
      `}</style>

      <div
        className='w-full flex flex-col items-center overflow-hidden'
        style={{
          background: WHITE,
          color: BLACK,
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Satellites />

        {/* Círculo de fondo (viene de Home). Este elemento se animará y quedará en la O */}
        {circleState?.scaledRect && (
          <div
            ref={(el) => {
              (
                bgCircleRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = el;
            }}
            style={{
              position: 'absolute',
              top: circleState.scaledRect.top,
              left: circleState.scaledRect.left,
              width: circleState.scaledRect.width,
              height: circleState.scaledRect.height,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        {/* En caso de entrada directa (sin circleState), creamos un círculo directamente en la O.
            Debe estar en fixed para que reverseTransition pueda animarlo después. */}
        {!circleState?.scaledRect && (
          <div
            ref={(el) => {
              (
                bgCircleRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = el;
            }}
            style={{
              position: 'fixed',
              // Inicialmente lo ponemos donde estará la O, pero aún no la conocemos.
              // Lo actualizaremos en un efecto después de que el DOM esté listo.
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0,
            }}
          >
            <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        {/* Contenido principal */}
        <div
          ref={setContentRef}
          className='w-full'
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: '0 auto',
              padding: 'clamp(3.5rem,7vh,5.5rem) clamp(1.5rem,4vw,3rem) 6rem',
            }}
          >
            <div
              style={{
                paddingBottom: 48,
                borderBottom: '1px solid rgba(17,17,17,0.09)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontFamily: SWISS,
                  fontSize: 'clamp(85px,14vw,140px)',
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  color: BLACK,
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: titleReady
                      ? 'wkSlideL 0.42s ease forwards'
                      : 'none',
                  }}
                >
                  W
                </span>

                {/* Este span es la posición de destino de la O */}
                <span
                  ref={oSlotRef}
                  style={{
                    display: 'inline-block',
                    width: '0.72em',
                    height: '1em',
                    position: 'relative',
                    verticalAlign: 'baseline',
                  }}
                />

                <span
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: titleReady
                      ? 'wkSlideR 0.42s ease 0.13s forwards'
                      : 'none',
                  }}
                >
                  RKS
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  opacity: 0,
                  animation: `wkUp 0.55s ease forwards ${CONTENT_START + 0.45}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: GRAY,
                    margin: 0,
                  }}
                >
                  Design · Engineering · Experiments
                </p>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    color: GRAY,
                    letterSpacing: '0.10em',
                    lineHeight: 2.3,
                    textAlign: 'right',
                  }}
                >
                  <strong style={{ color: BLACK, fontWeight: 500 }}>
                    {String(caseStudies.length).padStart(2, '0')}
                  </strong>{' '}
                  Case Studies
                  <br />
                  <strong style={{ color: BLACK, fontWeight: 500 }}>
                    {String(projectList.length).padStart(2, '0')}
                  </strong>{' '}
                  Projects
                  <br />
                  <strong style={{ color: BLACK, fontWeight: 500 }}>
                    {String(experiments.length).padStart(2, '0')}
                  </strong>{' '}
                  Experiments
                </div>
              </div>
            </div>

            <SectionDivider
              letter='A.'
              label='Case Studies'
              count={caseStudies.length}
              bold
              delay={nextDelay()}
            />
            {caseStudies.map((p, i) => (
              <ProjectRowFeature
                key={p.id}
                project={p}
                index={i}
                delay={nextDelay()}
              />
            ))}

            <SectionDivider
              letter='B.'
              label='Projects'
              count={projectList.length}
              delay={nextDelay()}
            />
            {projectList.map((p, i) => (
              <ProjectRowCompact
                key={p.id}
                project={p}
                index={caseStudies.length + i}
                delay={nextDelay()}
              />
            ))}

            <SectionDivider
              letter='C.'
              label='Experiments'
              count={experiments.length}
              delay={nextDelay()}
            />
            {experiments.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 0',
                  fontFamily: MONO,
                  fontSize: 13,
                  color: GRAY,
                  letterSpacing: '0.1em',
                  opacity: 0,
                  animation: `wkFade 0.4s ease forwards ${nextDelay()}s`,
                }}
              >
                ✦ Próximamente: experiments diarios ✦
              </div>
            ) : (
              experiments.map((p) => (
                <ProjectRowExperimentAnimated
                  key={p.id}
                  project={p}
                  delay={nextDelay()}
                />
              ))
            )}

            <div style={{ marginTop: 60, textAlign: 'center' }}>
              <Link
                to='/'
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: GRAY,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(17,17,17,0.2)',
                  paddingBottom: 4,
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = RED;
                  e.currentTarget.style.borderBottomColor = RED;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = GRAY;
                  e.currentTarget.style.borderBottomColor =
                    'rgba(17,17,17,0.2)';
                }}
              >
                ← Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto para posicionar el círculo en entrada directa */}
      {!circleState?.scaledRect && (
        <PositionDirectCircle oSlotRef={oSlotRef} bgCircleRef={bgCircleRef} />
      )}
    </>
  );
}

// Componente auxiliar para posicionar el círculo en caso de entrada directa
function PositionDirectCircle({
  oSlotRef,
  bgCircleRef,
}: {
  oSlotRef: React.RefObject<HTMLSpanElement>;
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const slot = oSlotRef.current;
    const bg = bgCircleRef.current;
    if (!slot || !bg) return;

    const slotRect = slot.getBoundingClientRect();
    // Posicionamos el círculo exactamente donde está la O
    bg.style.top = `${slotRect.top + window.scrollY}px`;
    bg.style.left = `${slotRect.left + window.scrollX}px`;
    bg.style.width = `${slotRect.width}px`;
    bg.style.height = `${slotRect.height}px`;
    bg.style.opacity = '1';
  }, [oSlotRef, bgCircleRef]);

  return null;
}

export default Work;
