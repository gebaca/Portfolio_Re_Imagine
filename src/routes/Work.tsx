// ============================================================================
// WORK.tsx
// ============================================================================
// Secciones:
// 1. Imports y configuración de paleta (todos los textos en blanco)
// 2. Línea separadora simple (blanca)
// 3. Sistema de disciplina (tags siempre claros)
// 4. Separador de sección (con línea blanca)
// 5. Fila A: Case Study (texto blanco, tags claros)
// 6. Fila B: Project (texto blanco, tags claros)
// 7. Fila C: Archive (texto blanco, tags claros, enlace en toda la fila)
// 8. Work page (estructura principal)
// ============================================================================

import { useState } from 'react';
import React from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { projects } from '../components/Projects/projects';
import type { Project } from '../components/Projects/projects';

// ----------------------------------------------------------------------------
// 1. PALETA – todos los textos en blanco, fondo negro para contraste
// ----------------------------------------------------------------------------
const RED = '#DE0A00'; // solo para el círculo de transición
const BG_DARK = '#ffffff'; // fondo negro para que el texto blanco se vea
const TEXT_WHITE = '#ffffff'; // todos los textos serán blancos
const TAG_BG_LIGHT = '#f0f0f0'; // fondo claro para tags
const TAG_TEXT_DARK = '#111111'; // texto oscuro en tags

// ----------------------------------------------------------------------------
// 2. LÍNEA SEPARADORA SIMPLE (blanca, sin SVG)
// ----------------------------------------------------------------------------
function SimpleLine({ width = '80%', opacity = 1 }) {
  return (
    <div
      style={{
        width,
        height: 1,
        backgroundColor: TEXT_WHITE,
        opacity,
        margin: '0 auto',
      }}
    />
  );
}

// ----------------------------------------------------------------------------
// 3. SISTEMA DE DISCIPLINA (TAGS SIEMPRE CLAROS)
// ----------------------------------------------------------------------------
type Discipline = 'design' | 'engineering' | 'hybrid';

const DISCIPLINE_MAP: Record<string, Discipline> = {
  Figma: 'design',
  GSAP: 'design',
  '3D MAX': 'design',
  Motion: 'design',
  'After Effects': 'design',
  React: 'engineering',
  TypeScript: 'engineering',
  Firebase: 'engineering',
  Unity: 'engineering',
  'C#': 'engineering',
  Node: 'engineering',
  'Tailwind CSS': 'hybrid',
  JavaScript: 'hybrid',
};

// Estilo claro para los tags (siempre igual, sin importar el fondo)
const TAG_STYLES: Record<Discipline, React.CSSProperties> = {
  design: {
    background: TAG_BG_LIGHT,
    color: TAG_TEXT_DARK,
    border: '1px solid rgba(0,0,0,0.1)',
  },
  engineering: {
    background: TAG_BG_LIGHT,
    color: TAG_TEXT_DARK,
    border: '1px solid rgba(0,0,0,0.1)',
  },
  hybrid: {
    background: TAG_BG_LIGHT,
    color: TAG_TEXT_DARK,
    border: '1px dashed rgba(0,0,0,0.3)',
  },
};

function StackTag({ label }: { label: string }) {
  const discipline = DISCIPLINE_MAP[label] ?? 'engineering';
  return (
    <span
      style={{
        fontFamily: 'Pencil-Regular, sans-serif',
        fontSize: 8,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '3px 8px',
        borderRadius: 2,
        whiteSpace: 'nowrap',
        ...TAG_STYLES[discipline],
      }}
    >
      {label}
    </span>
  );
}

// ----------------------------------------------------------------------------
// 4. SEPARADOR DE SECCIÓN (con línea blanca)
// ----------------------------------------------------------------------------
type SectionWeight = 'primary' | 'secondary' | 'tertiary';

function SectionDivider({
  label,
  count,
  weight,
}: {
  label: string;
  count: string;
  weight: SectionWeight;
}) {
  // Todos los textos en blanco
  const textColor = TEXT_WHITE;
  const mutedColor = 'rgba(255,255,255,0.5)';
  const lineOpacity =
    weight === 'primary' ? 1 : weight === 'secondary' ? 0.35 : 0.15;

  return (
    <div style={{ margin: '2.5rem 0 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
        }}
      >
        {/* Círculo decorativo según peso */}
        <CircleSVG
          color={weight === 'primary' ? TEXT_WHITE : mutedColor}
          style={{
            width: weight === 'primary' ? 10 : weight === 'secondary' ? 7 : 5,
            height: weight === 'primary' ? 10 : weight === 'secondary' ? 7 : 5,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 9,
            letterSpacing: '0.18em',
            color: weight === 'primary' ? textColor : mutedColor,
            textTransform: 'uppercase',
            fontWeight: weight === 'primary' ? '700' : '400',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 9,
            letterSpacing: '0.1em',
            color: mutedColor,
            textTransform: 'uppercase',
          }}
        >
          {count}
        </span>
      </div>
      <SimpleLine width='80%' opacity={lineOpacity} />
    </div>
  );
}

// ----------------------------------------------------------------------------
// 5. FILA A: CASE STUDY (texto blanco, tags claros)
// ----------------------------------------------------------------------------
function ProjectRowFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const titleColor = hovered ? '#ffcccc' : TEXT_WHITE;
  const descColor = 'rgba(255,255,255,0.75)';
  const borderColor = hovered ? TEXT_WHITE : 'rgba(255,255,255,0.3)';
  const numColor = hovered ? '#ffcccc' : 'rgba(255,255,255,0.5)';
  const bulletColor = hovered ? '#ffcccc' : TEXT_WHITE;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr clamp(130px, 16vw, 220px)',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
        padding: 'clamp(1.5rem, 3vh, 2.5rem) 0.5rem',
        borderBottom: `2px solid ${borderColor}`,
        alignItems: 'start',
        cursor: 'default',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        transition: 'background 0.2s ease',
      }}
    >
      {/* Columna izquierda: círculo + número */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          paddingTop: '0.5rem',
        }}
      >
        <CircleSVG
          color={bulletColor}
          style={{
            width: hovered ? 20 : 14,
            height: hovered ? 20 : 14,
            transition: 'width 0.25s ease, height 0.25s ease',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 9,
            letterSpacing: '0.1em',
            color: numColor,
            transition: 'color 0.25s ease',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Columna central: contenido */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <CircleSVG
            color={hovered ? '#ffcccc' : TEXT_WHITE}
            style={{ width: 5, height: 5, flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'Pencil-Regular, sans-serif',
              fontSize: 8,
              letterSpacing: '0.16em',
              color: hovered ? '#ffcccc' : TEXT_WHITE,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Case study
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 900,
            margin: 0,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: titleColor,
            transition: 'color 0.25s ease',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)',
            lineHeight: 1.65,
            color: descColor,
            margin: 0,
            maxWidth: '44ch',
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
              fontFamily: 'Pencil-Regular, sans-serif',
              fontSize: 9,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderBottom: `1px solid rgba(255,255,255,0.2)`,
              width: 'fit-content',
              paddingBottom: 2,
              transition: 'color 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = TEXT_WHITE;
              e.currentTarget.style.borderBottomColor = TEXT_WHITE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)';
            }}
          >
            Ver proyecto
          </a>
        )}
      </div>

      {/* Columna derecha: media */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid rgba(255,255,255,0.2)`,
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          alignSelf: 'center',
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
        ) : null}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 6. FILA B: PROJECT (texto blanco, tags claros)
// ----------------------------------------------------------------------------
function ProjectRowCompact({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const titleColor = hovered ? '#ffcccc' : TEXT_WHITE;
  const bulletColor = hovered ? '#ffcccc' : TEXT_WHITE;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr auto',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
        padding: 'clamp(1rem, 2vh, 1.5rem) 0',
        borderBottom: `1px solid rgba(255,255,255,0.15)`,
        alignItems: 'center',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircleSVG
          color={bulletColor}
          style={{
            width: hovered ? 13 : 9,
            height: hovered ? 13 : 9,
            transition: 'width 0.2s ease, height 0.2s ease',
            flexShrink: 0,
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: titleColor,
            transition: 'color 0.2s ease',
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
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 9,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = TEXT_WHITE;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          Ver
        </a>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 7. FILA C: ARCHIVE (texto blanco, tags claros, enlace en toda la fila)
// ----------------------------------------------------------------------------
function ProjectRowArchive({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr auto',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
        padding: '0.75rem 0',
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        alignItems: 'center',
        cursor: project.url ? 'pointer' : 'default',
        opacity: hovered ? 0.55 : 0.3,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircleSVG
          color={TEXT_WHITE}
          style={{ width: 6, height: 6, opacity: 0.4, flexShrink: 0 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: TEXT_WHITE,
          }}
        >
          {project.title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.stack?.map((s) => (
            <StackTag key={s} label={s} />
          ))}
        </div>
      </div>

      <span
        style={{
          fontFamily: 'Pencil-Regular, sans-serif',
          fontSize: 8,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Archive
      </span>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8. WORK PAGE (estructura principal, fondo negro)
// ----------------------------------------------------------------------------
function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  const caseStudies = projects.filter((p) => p.section === 'feature');
  const projectList = projects.filter((p) => p.section === 'project');
  const archive = projects.filter((p) => p.section === 'archive');

  let globalIndex = 0;

  return (
    <div
      className='w-full flex flex-col items-center overflow-hidden'
      style={{ background: BG_DARK }} // fondo negro para texto blanco
    >
      {/* Círculo de transición (rojo) – no se modifica */}
      {circleState?.rect && (
        <div
          ref={setBgRef}
          style={{
            position: 'fixed',
            top: circleState.scaledRect?.top,
            left: circleState.scaledRect?.left,
            width: circleState.scaledRect?.width,
            height: circleState.scaledRect?.height,
            // Sin transform — el elemento ya tiene el tamaño final correcto
            transformOrigin: 'center center',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      <div ref={setContentRef} className='w-full'>
        <FadeInParent stagger={0.08} delay={0.3}>
          <div
            className='relative z-10'
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: 'clamp(8vh, 15vh, 20vh) clamp(1.5rem, 4vw, 3rem) 10vh',
            }}
          >
            {/* Hero – texto blanco sobre fondo negro (el círculo rojo puede estar detrás) */}
            <div style={{ marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <CircleSVG
                  color={TEXT_WHITE}
                  style={{ width: 22, height: 22 }}
                />
                <CircleSVG
                  color={TEXT_WHITE}
                  style={{ width: 14, height: 14, opacity: 0.6 }}
                />
                <CircleSVG
                  color={TEXT_WHITE}
                  style={{ width: 8, height: 8, opacity: 0.3 }}
                />
              </div>

              <h1
                style={{
                  fontFamily: 'Pencil-Regular, sans-serif',
                  fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                MY
                <br />
                WORKS
              </h1>

              <p
                style={{
                  fontFamily: 'Pencil-Regular, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  marginTop: 16,
                }}
              >
                Design · Engineering · 2022–2025
              </p>
            </div>

            {/* Sección Case Studies */}
            <SectionDivider
              label='Case studies'
              count={`0${caseStudies.length}`}
              weight='primary'
            />
            <div
              style={{
                borderTop: `2px solid rgba(255,255,255,0.4)`,
                marginTop: 16,
              }}
            >
              {caseStudies.map((project) => {
                const el = (
                  <ProjectRowFeature
                    key={project.id}
                    project={project}
                    index={globalIndex}
                  />
                );
                globalIndex++;
                return el;
              })}
            </div>

            {/* Sección Projects */}
            <SectionDivider
              label='Projects'
              count={`0${projectList.length}`}
              weight='secondary'
            />
            <div style={{ marginTop: 8 }}>
              {projectList.map((project) => {
                const el = (
                  <ProjectRowCompact
                    key={project.id}
                    project={project}
                    index={globalIndex}
                  />
                );
                globalIndex++;
                return el;
              })}
            </div>

            {/* Sección Archive */}
            <SectionDivider
              label='Archive'
              count={`0${archive.length}`}
              weight='tertiary'
            />
            <div style={{ marginTop: 8 }}>
              {archive.map((project) => {
                const el = (
                  <ProjectRowArchive key={project.id} project={project} />
                );
                globalIndex++;
                return el;
              })}
            </div>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

export default Work;
