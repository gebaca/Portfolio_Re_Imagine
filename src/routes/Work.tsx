import { useEffect } from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import { FadeInParent } from '../components/Effects/FadeInParent';
import ProjectCard from '../components/Projects/ProjectCard';
import { projects } from '../components/Projects/projects';

function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  useEffect(() => {
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  return (
    <div ref={setContentRef} className='w-full flex flex-col items-center'>
      {/* FONDO */}
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

      <CircleSatellites
        color={circleState?.color || '#fff'}
        count={30}
        positionY={100}
        positionX={100}
      />

      {/* PROYECTOS */}
      <FadeInParent stagger={0.15} delay={0.3}>
        <div className='relative z-10 w-full'>
          {projects.map((project, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            return (
              <div
                key={project.id}
                className={`snap-center h-screen flex items-center px-6 w-full ${
                  side === 'left' ? 'justify-start' : 'justify-end'
                }`}
              >
                <ProjectCard
                  color={project.color}
                  side={side}
                  summary={project.summary}
                  extraCount={project.extraCount}
                />
              </div>
            );
          })}
        </div>
      </FadeInParent>
    </div>
  );
}

export default Work;
