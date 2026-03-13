import { useState } from 'react';
import React from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { projects } from '../components/Projects/projects';
import type { Project } from '../components/Projects/projects';

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '3rem 1fr auto',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        padding: 'clamp(1.5rem, 3vh, 3rem) 0',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        alignItems: 'start',
        cursor: 'default',
      }}
    >
      {/* Index + dot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          paddingTop: '0.4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: hovered ? '#fff' : 'rgba(255,255,255,0.35)',
            transition: 'background 0.3s ease, transform 0.3s ease',
            transform: hovered ? 'scale(1.5)' : 'scale(1)',
          }}
        />
      </div>

      {/* Title + description + stack + link */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.5rem, 1.2vh, 0.9rem)',
        }}
      >
        <h3
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.05,
            color: '#ffffff',
            transition: 'opacity 0.3s ease',
            opacity: hovered ? 1 : 0.85,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            lineHeight: 1.75,
            color: '#ffffff',
            margin: 0,
            fontWeight: 300,
            maxWidth: '55ch',
          }}
        >
          {project.description}
        </p>

        {/* Stack — revealed on hover */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            maxHeight: hovered ? '5rem' : 0,
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.35s ease, opacity 0.3s ease',
          }}
        >
          {project.stack?.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: 'Pencil-Regular, sans-serif',
                fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '3px 10px',
                borderRadius: 2,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target='_blank'
            rel='noreferrer'
            style={{
              fontFamily: 'Pencil-Regular, sans-serif',
              fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              width: 'fit-content',
              paddingBottom: 2,
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#fff';
              (e.target as HTMLAnchorElement).style.borderBottomColor = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color =
                'rgba(255,255,255,0.6)';
              (e.target as HTMLAnchorElement).style.borderBottomColor =
                'rgba(255,255,255,0.3)';
            }}
          >
            Ver proyecto →
          </a>
        )}
      </div>

      {/* Media: YouTube or image */}
      <div
        style={{
          width: 'clamp(140px, 18vw, 260px)',
          aspectRatio: '16/10',
          borderRadius: 8,
          overflow: 'hidden',
          flexShrink: 0,
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
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

function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  return (
    <div className='w-full flex flex-col items-center overflow-hidden'>
      {circleState?.rect && (
        <div
          ref={setBgRef}
          style={{
            position: 'absolute',
            top: circleState.rect.top,
            left: circleState.rect.left,
            width: circleState.rect.width,
            height: circleState.rect.height,
            pointerEvents: 'none',
            transformOrigin: 'center center',
            zIndex: 0,
          }}
        >
          <CircleSVG
            color={circleState.color}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      <div ref={setContentRef} className='w-full'>
        <CircleSatellites
          color={circleState?.color || '#fff'}
          count={30}
          positionY={500}
          positionX={100}
        />

        <FadeInParent stagger={0.08} delay={0.3}>
          <div
            className='relative z-10'
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: 'clamp(8vh, 15vh, 20vh) clamp(1.5rem, 4vw, 3rem) 10vh',
            }}
          >
            <p
              style={{
                fontFamily: 'Pencil-Regular, sans-serif',
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 'clamp(2rem, 4vh, 4rem)',
              }}
            >
              Selected Work
            </p>

            <div>
              {projects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

export default Work;
