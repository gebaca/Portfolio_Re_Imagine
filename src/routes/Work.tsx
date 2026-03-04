import { useEffect } from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import ProjectCard from '../components/Projects/ProjectCard';
import { projects } from '../components/Projects/projects';
import CircleSatellites from '../components/Circle/CircleSatellites ';

function Work() {
  const { circleState, bgCircleRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // Activa snap solo mientras Work está montado
  useEffect(() => {
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
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

          <CircleSatellites
            color={circleState?.color || '#fff'}
            count={10}
            positionY={400}
            positionX={50}
          />
        </div>
      )}

      {/* PROYECTOS */}
      <div className='relative z-10 w-full'>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`snap-center h-screen flex items-center px-6 w-full ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <ProjectCard color={project.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
