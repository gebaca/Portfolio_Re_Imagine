import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import ProjectCard from '../components/Projects/ProjectCard';
import { projects } from '../components/Projects/projects';

function Work() {
  const { circleState } = useCircleTransition();

  return (
    <div className='w-full flex flex-col items-center'>
      {/* FONDO */}
      {circleState?.rect && (
        <div
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

      {/* PROYECTOS */}
      <div className='relative z-10 w-full max-w-4xl px-6 py-20 flex flex-col gap-60'>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <ProjectCard color={project.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
