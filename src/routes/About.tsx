import React from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { ICONS } from '../components/Icons/Icons';

const artTools = [
  { name: 'Autodesk', icon: ICONS.autodesk },
  { name: 'Creative Cloud', icon: ICONS.creative_cloud },
  { name: 'Figma', icon: ICONS.figma },
  { name: 'Unity', icon: ICONS.unity },
];

const codeTools = [
  { name: 'React', icon: ICONS.react },
  { name: 'TypeScript', icon: ICONS.ts },
  { name: 'JavaScript', icon: ICONS.js },
  { name: 'Python', icon: ICONS.py },
  { name: 'C#', icon: ICONS.csharp },
  { name: 'GSAP', icon: ICONS.gsap },
];

const officeTools = [
  { name: 'Git', icon: ICONS.git },
  { name: 'Jira', icon: ICONS.jira },
  { name: 'Trello', icon: ICONS.trello },
  { name: 'Bitbucket', icon: ICONS.bitbucket },
];

const toolSections = [
  { label: 'Art', icon: ICONS.ART, tools: artTools },
  { label: 'Code', icon: ICONS.ProgrammingCircle, tools: codeTools },
  { label: 'Work', icon: ICONS.workCircle, tools: officeTools },
];

const experiences = [
  {
    title: 'FICIV',
    subtitle: 'Festival Internacional de Cine Infantil de Valencia',
    description:
      'Apoyo tecnológico y creativo en un entorno cultural dinámico. Una experiencia clave para entender la unión entre el arte visual y la ejecución técnica.',
  },
  {
    title: 'Mutua Madrileña',
    subtitle: 'Programador Junior',
    description:
      'Primer contacto con desarrollo corporativo de alto nivel. Aprendizaje intensivo sobre flujos de trabajo profesionales, resolución de bugs y despliegues en entornos reales.',
  },
];

function About() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  return (
    <div>
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
            color={'#FDDA0D'}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      <div ref={setContentRef} className='w-full flex flex-col items-center'>
        <CircleSatellites
          color={'#FDDA0D'}
          count={40}
          positionY={400}
          positionX={100}
        />

        <FadeInParent stagger={1}>
          <div className='relative z-10 w-full max-w-4xl px-6 flex flex-col items-center py-20'>
            {/* PHOTO */}
            <div className='relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12'>
              <div className='absolute inset-0 scale-125'>
                <CircleSVG
                  color={'#FFFAA0'}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <img
                src='/Foto.png'
                alt='Profile'
                className='relative z-10 w-3/4 h-3/4 object-contain drop-shadow-2xl'
              />
            </div>

            {/* BIO */}
            <div className='max-w-2xl flex flex-col items-center mb-40'>
              <h2 className='text-zinc-900 text-3xl md:text-4xl tracking-tighter text-center mb-8'>
                Frontend Developer bridging the gap between
                <span className='text-zinc-500'> interactive design</span> and
                clean code.
              </h2>
              <p className='text-center text-[1.125rem] leading-[1.8] text-zinc-700 font-medium'>
                With a strong foundation in{' '}
                <span className='text-zinc-900 font-bold'>
                  Game Design and Development
                </span>
                , I learned early on that an interface is more than just
                buttons—it's an experience. Today, I channel that interactive
                mindset and my specialization in{' '}
                <span className='text-zinc-900 font-bold'>UX/UI</span> to build
                digital products where technical precision meets visual harmony.
              </p>
            </div>

            {/* TOOLS */}
            <h2 className='text-zinc-900 text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12 mt-32'>
              TOOLS
            </h2>

            <div className='w-full flex flex-col gap-16'>
              {toolSections.map(({ label, icon, tools }) => (
                <div key={label}>
                  {/* Desktop: circle + icons in a row */}
                  {/* Mobile: label + icons in grid */}
                  <div className='flex flex-col md:flex-row md:items-center gap-6 md:gap-8'>
                    {/* Circle — desktop only */}
                    <div className='hidden md:block flex-shrink-0 w-60 h-60'>
                      {icon}
                    </div>

                    {/* Mobile label */}
                    <p
                      className='md:hidden text-l font-bold tracking-widest uppercase text-black'
                      style={{ fontFamily: 'Pencil-Regular' }}
                    >
                      {label}
                    </p>

                    {/* Icons grid */}
                    <div className='grid grid-cols-4 md:flex md:flex-wrap gap-4 md:gap-5'>
                      {tools.map(({ name, icon: toolIcon }) => (
                        <IconItem key={name} name={name} icon={toolIcon} />
                      ))}
                    </div>
                  </div>

                  {/* Divider on mobile — wavy SVG horizontal */}
                  <div
                    className='md:hidden mt-8 w-full overflow-hidden'
                    style={{ height: 14, position: 'relative' }}
                  >
                    <img
                      src='/Vector_17.svg'
                      alt=''
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 14,
                        height: '100vw',
                        objectFit: 'fill',
                        transform: 'translate(-50%, -50%) rotate(-90deg)',
                        transformOrigin: 'center center',
                        opacity: 0.3,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* EXPERIENCE */}
            <div className='w-full flex flex-col items-center mt-24 md:mt-60 mb-40'>
              <h2 className='text-zinc-900 text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16 mt-32'>
                EXPERIENCE
              </h2>

              <div className='relative w-full max-w-2xl ml-0 md:ml-6 pl-10 md:pl-12 flex flex-col gap-16 md:gap-24'>
                <div
                  className='absolute left-0 top-0 h-full'
                  style={{ width: '14px' }}
                >
                  <img
                    src='/Vector_17.svg'
                    alt=''
                    className='w-full h-full'
                    style={{ objectFit: 'fill' }}
                  />
                </div>

                {experiences.map((exp) => (
                  <div key={exp.title} className='relative'>
                    <div
                      className='absolute w-8 h-8 md:w-10 md:h-10'
                      style={{ left: '-48px', top: '0px' }}
                    >
                      <CircleSVG
                        color='#FFC000'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <h4 className='text-lg md:text-xl font-bold text-zinc-800'>
                      {exp.title}
                    </h4>
                    <p className='text-zinc-500 text-sm font-medium'>
                      {exp.subtitle}
                    </p>
                    <p className='mt-4 text-zinc-600 leading-relaxed text-[15px]'>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* EDUCATION */}
              <div className='w-full flex flex-col items-center mt-24 md:mt-60 mb-20 md:mb-40'>
                <h2 className='text-zinc-900 text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 mt-32'>
                  EDUCATION
                </h2>
                <p className='text-zinc-950 text-base md:text-lg font-medium mt-2 text-center px-4'>
                  Universidad Politécnica de Valencia — Diseño y Desarrollo de
                  Experiencias interactivas
                </p>
                <p className='text-zinc-950 text-base md:text-lg font-medium mt-2 text-center px-4'>
                  ESAT — Diseño y Desarrollo Web
                </p>
              </div>
            </div>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

function IconItem({ name, icon }: { name: string; icon?: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='w-14 h-14 md:w-20 md:h-20'>{icon}</div>
      <span className='text-[9px] md:text-[10px] font-bold text-zinc-500 text-center'>
        {name}
      </span>
    </div>
  );
}

export default About;
