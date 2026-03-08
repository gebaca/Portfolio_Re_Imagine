import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
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

        <FadeInParent stagger={0.15} delay={0.3}>
          <div className='relative z-10 w-full'>
            <div style={{ height: '20vh' }} />
            {projects.map((project, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <div key={project.id} style={{ height: '140vh' }}>
                  <div
                    className={`sticky top-0 h-screen flex items-center px-6 w-full ${
                      side === 'left' ? 'justify-start' : 'justify-end'
                    }`}
                    style={{
                      transform: project.offsetX
                        ? `translateX(${project.offsetX}px)`
                        : undefined,
                    }}
                  >
                    <ProjectCard
                      color={project.color}
                      side={side}
                      size={project.size}
                      expandScale={project.expandScale}
                      extraCount={project.extraCount}
                      primaryContent={project.primaryContent}
                      summaryContent={project.summaryContent}
                      mediaContent={project.mediaContent}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

export default Work;
