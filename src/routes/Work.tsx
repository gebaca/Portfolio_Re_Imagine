// ============================================================================
// WORK.tsx — Tullet × Swiss · consistente con About.tsx
// ============================================================================

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { projects } from '../components/Projects/projects';
import type { Project } from '../components/Projects/projects';

// ─── Paleta ──────────────────────────────────────────────────────────────────
const RED = '#DE0A00';
const WHITE = '#FAFAF8';

// ─── Stack colors — mismo sistema que badges de tecnología ───────────────────
const STACK_COLORS: Record<string, { bg: string; text: string }> = {
  // JS ecosystem
  JavaScript: { bg: '#FEF08A', text: '#713F12' },
  TypeScript: { bg: '#DBEAFE', text: '#1E40AF' },
  React: { bg: '#BAE6FD', text: '#0C4A6E' },
  'Next.js': { bg: '#E4E4E7', text: '#18181B' },
  Node: { bg: '#BBF7D0', text: '#14532D' },
  'Tailwind CSS': { bg: '#CFFAFE', text: '#164E63' },
  GSAP: { bg: '#D1FAE5', text: '#064E3B' },
  // Design
  Figma: { bg: '#FDE68A', text: '#92400E' },
  '3D MAX': { bg: '#E9D5FF', text: '#4C1D95' },
  'Blender 3D': { bg: '#FED7AA', text: '#7C2D12' },
  'After Effects': { bg: '#EDE9FE', text: '#4C1D95' },
  Motion: { bg: '#FCE7F3', text: '#831843' },
  // Tools
  Firebase: { bg: '#FEF3C7', text: '#78350F' },
  Unity: { bg: '#E4E4E7', text: '#18181B' },
  'C#': { bg: '#F3E8FF', text: '#581C87' },
  Python: { bg: '#DBEAFE', text: '#1E3A8A' },
  Git: { bg: '#FFE4E6', text: '#9F1239' },
  // CAD / Industrial
  OnShape: { bg: '#E0F2FE', text: '#0C4A6E' },
  Sketchbook: { bg: '#FEE2E2', text: '#7F1D1D' },
  Affinity: { bg: '#EDE9FE', text: '#4C1D95' },
  Gres: { bg: '#FEF9C3', text: '#713F12' },
  Placa: { bg: '#F0FDF4', text: '#14532D' },
  Casting: { bg: '#F9FAFB', text: '#374151' },
  'Plata 925': { bg: '#F1F5F9', text: '#334155' },
  Aluminio: { bg: '#E2E8F0', text: '#1E293B' },
  Artesanal: { bg: '#FDF2F8', text: '#701A75' },
  // Fallback generado por hash si no está en la lista
};

function getStackColor(label: string) {
  if (STACK_COLORS[label]) return STACK_COLORS[label];
  // Hash simple para generar un color consistente para tags desconocidos
  let h = 0;
  for (let i = 0; i < label.length; i++)
    h = (h * 31 + label.charCodeAt(i)) & 0xffff;
  const hue = h % 360;
  return { bg: `hsl(${hue},60%,90%)`, text: `hsl(${hue},60%,25%)` };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CONTENT_START = 1.75; // segundos — la cascada empieza aquí
const STEP = 0.1;

// ============================================================================
// StackTag — con color por tecnología
// ============================================================================
function StackTag({ label }: { label: string }) {
  const { bg, text } = getStackColor(label);
  return (
    <span
      style={{
        fontSize: 11,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '3px 8px',
        background: bg,
        color: text,
        borderRadius: 2,
        whiteSpace: 'nowrap',
        fontWeight: 500,
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
            fontSize: 13,
            color: RED,
            letterSpacing: '0.16em',
            fontWeight: 500,
          }}
        >
          {letter}
        </span>
        <span
          className='text-zinc-400 tracking-widest uppercase'
          style={{ fontSize: 12 }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 12,
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
// ProjectRowFeature — Case Study
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
      {/* Número + badge */}
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

      {/* Contenido — tipografía consistente con About */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3
          className='text-zinc-900 tracking-tighter'
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(38px,6vw,60px)',
            fontWeight: 700,
            margin: 0,
            lineHeight: 0.93,
            textTransform: 'uppercase',
          }}
        >
          {project.title}
        </h3>
        <p
          className='text-zinc-600'
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(1rem,1.4vw,1.1rem)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: '40ch',
            fontWeight: 400,
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
            className='text-zinc-400 hover:text-zinc-900'
            style={{
              fontSize: 11,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 2,
              transition: 'color 0.2s',
              width: 'fit-content',
            }}
          >
            Ver proyecto
          </a>
        )}
      </div>

      {/* Thumbnail */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          border: `0.5px solid ${hovered ? 'rgba(222,10,0,0.40)' : 'rgba(17,17,17,0.10)'}`,
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
                fontSize: 8,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111',
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
// ProjectRowCompact — Project
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
        padding: '20px 0',
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
          fontSize: 22,
          color: hovered ? RED : 'rgba(17,17,17,0.15)',
          letterSpacing: '-0.02em',
          transition: 'color 0.2s',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <h3
          className='tracking-tighter'
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(22px,2.8vw,30px)',
            fontWeight: 700,
            margin: 0,
            textTransform: 'uppercase',
            color: hovered ? '#111' : 'rgba(17,17,17,0.70)',
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
          className='text-zinc-400 hover:text-zinc-900'
          style={{
            fontSize: 11,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}
        >
          Ver
        </a>
      )}
    </div>
  );
}

// ============================================================================
// ProjectRowExperiment — Experiments
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
        padding: '10px 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.05)',
        alignItems: 'center',
        cursor: project.url ? 'pointer' : 'default',
        opacity: hovered ? 0.7 : 0.4,
        transition: 'opacity 0.2s',
      }}
    >
      <span className='text-zinc-400' style={{ fontSize: 14 }}>
        —
      </span>
      <span
        className='text-zinc-800'
        style={{
          fontSize: 15,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {project.title}
      </span>
      <span
        className='text-zinc-400'
        style={{
          fontSize: 11,
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
// Satellites — CircleSVG a baja opacidad, textura Tullet
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
// PositionDirectCircle — en entrada directa coloca el bgCircle en la O
// ============================================================================
function PositionDirectCircle({
  oSlotRef,
  bgCircleRef,
}: {
  oSlotRef: React.RefObject<HTMLSpanElement | null>;
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const slot = oSlotRef.current;
    const bg = bgCircleRef.current;
    if (!slot || !bg) return;
    const r = slot.getBoundingClientRect();
    bg.style.top = `${r.top + window.scrollY}px`;
    bg.style.left = `${r.left + window.scrollX}px`;
    bg.style.width = `${r.width}px`;
    bg.style.height = `${r.height}px`;
    bg.style.opacity = '1';
  }, [oSlotRef, bgCircleRef]);
  return null;
}

// ============================================================================
// Work — componente principal
// ============================================================================
function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();
  const [titleReady, setTitleReady] = useState(false);
  const oSlotRef = useRef<HTMLSpanElement>(null);

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  // ── Bloquear scroll durante la animación de entrada ──────────────────────
  useEffect(() => {
    // Bloqueamos scroll hasta que el título esté listo (círculo contraído)
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (titleReady) {
      // Pequeño delay para que W y RKS terminen de entrar antes de liberar
      const t = setTimeout(() => {
        document.body.style.overflow = '';
      }, 600);
      return () => clearTimeout(t);
    }
  }, [titleReady]);

  // ── Animación de entrada: círculo grande → O ─────────────────────────────
  useEffect(() => {
    if (!circleState?.scaledRect) return;
    const slot = oSlotRef.current;
    const bg = bgCircleRef.current;
    if (!slot || !bg) return;

    const slotRect = slot.getBoundingClientRect();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bg, {
          top: slotRect.top + window.scrollY,
          left: slotRect.left + window.scrollX,
          width: slotRect.width,
          height: slotRect.height,
          clearProps: 'transform',
        });
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

    return () => {
      tl.kill();
    };
  }, [circleState, bgCircleRef]);

  // ── Entrada directa sin circleState ──────────────────────────────────────
  useEffect(() => {
    if (circleState?.scaledRect) return;
    const t = setTimeout(() => setTitleReady(true), 300);
    return () => clearTimeout(t);
  }, [circleState]);

  const caseStudies = projects.filter((p) => p.section === 'feature');
  const projectList = projects.filter((p) => p.section === 'project');
  const experiments = projects.filter((p) => p.section === 'experiment');

  let d = CONTENT_START;
  const nd = () => {
    const v = d;
    d += STEP;
    return v;
  };

  return (
    <>
      <style>{`
        @keyframes wkUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
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
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes wkSlideR {
          from { opacity:0; transform:translateX(10px); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>

      <div
        className='w-full flex flex-col items-center overflow-hidden'
        style={{
          background: WHITE,
          color: '#111',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Satellites />

        {/* Círculo de transición desde Home */}
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

        {/* Círculo en la O para entrada directa (sin circleState) */}
        {!circleState?.scaledRect && (
          <div
            ref={(el) => {
              (
                bgCircleRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = el;
            }}
            style={{
              position: 'fixed',
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
            {/* ── HERO ── */}
            <div
              style={{
                paddingBottom: 48,
                borderBottom: '1px solid rgba(17,17,17,0.09)',
              }}
            >
              {/* Título: W + O(slot) + RKS */}
              <div
                className='tracking-tighter'
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: 'clamp(85px,14vw,140px)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  color: '#111',
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

                {/* Slot de la O — el círculo de transición aterriza aquí */}
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

              {/* Tagline + contadores */}
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
                  className='text-zinc-400 tracking-widest uppercase'
                  style={{ fontSize: 12, margin: 0 }}
                >
                  Design · Engineering · Experiments
                </p>
                <div
                  className='text-zinc-400'
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.10em',
                    lineHeight: 2.3,
                    textAlign: 'right',
                  }}
                >
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(caseStudies.length).padStart(2, '0')}
                  </strong>{' '}
                  Case Studies
                  <br />
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(projectList.length).padStart(2, '0')}
                  </strong>{' '}
                  Projects
                  <br />
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(experiments.length).padStart(2, '0')}
                  </strong>{' '}
                  Experiments
                </div>
              </div>
            </div>

            {/* ── A: CASE STUDIES ── */}
            <SectionDivider
              letter='A.'
              label='Case Studies'
              count={caseStudies.length}
              bold
              delay={nd()}
            />
            {caseStudies.map((p, i) => (
              <ProjectRowFeature
                key={p.id}
                project={p}
                index={i}
                delay={nd()}
              />
            ))}

            {/* ── B: PROJECTS ── */}
            <SectionDivider
              letter='B.'
              label='Projects'
              count={projectList.length}
              delay={nd()}
            />
            {projectList.map((p, i) => (
              <ProjectRowCompact
                key={p.id}
                project={p}
                index={caseStudies.length + i}
                delay={nd()}
              />
            ))}

            {/* ── C: EXPERIMENTS ── */}
            <SectionDivider
              letter='C.'
              label='Experiments'
              count={experiments.length}
              delay={nd()}
            />
            {experiments.length === 0 ? (
              <div
                className='text-zinc-400 text-center'
                style={{
                  padding: '2rem 0',

                  fontSize: 13,
                  letterSpacing: '0.1em',
                  opacity: 0,
                  animation: `wkFade 0.4s ease forwards ${nd()}s`,
                }}
              >
                coming soon
              </div>
            ) : (
              experiments.map((p) => (
                <ProjectRowExperimentAnimated
                  key={p.id}
                  project={p}
                  delay={nd()}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Posiciona el círculo en la O para entrada directa */}
      {!circleState?.scaledRect && (
        <PositionDirectCircle oSlotRef={oSlotRef} bgCircleRef={bgCircleRef} />
      )}
    </>
  );
}

export default Work;
