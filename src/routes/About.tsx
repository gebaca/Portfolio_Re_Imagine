import React, { useId, useState } from 'react';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { useGiantCircle } from '../hooks/useGiantCircle';
import {
  skillGroups,
  coreCompetencies,
  skillIconSrc,
} from '../components/Icons/skills';
import type { Skill, SkillGroup } from '../components/Icons/skills';

const experiences = [
  {
    title: 'FICIV',
    subtitle: "International Festival of Children's Cinema of Valencia",
    description:
      'Technological and creative support within a dynamic cultural environment. A key experience for understanding the connection between visual art and technical execution.',
  },
  {
    title: 'Mutua Madrileña',
    subtitle: 'Programmer Junior',
    description:
      'First contact with high-level corporate development. Intensive learning about professional workflows, bug fixing, and deployments in real environments.',
  },
];

function About() {
  const { pageContentRef } = useCircleTransition();
  const { setBgRef, style: bgStyle } = useGiantCircle('/about', 'absolute');

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  return (
    <div>
      <div ref={setBgRef} style={bgStyle}>
        <CircleSVG
          color={'#FDDA0D'}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div ref={setContentRef} className='w-full flex flex-col items-center'>
        <CircleSatellites
          color={'#FDDA0D'}
          count={40}
          positionY={390}
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
                src='/ger.webp'
                alt='Profile'
                className='relative z-10 w-4/4 h-4/4 object-cover'
                style={{ borderRadius: '40%', objectPosition: 'center top' }}
              />
            </div>

            {/* BIO */}
            <div className='max-w-2xl flex flex-col items-center mb-40'>
              <h2 className="font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-normal text-zinc-900 text-3xl md:text-4xl tracking-tight text-center mb-8">
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

            {/* SKILLS */}
            <h2 className='text-zinc-900 text-4xl md:text-5xl tracking-wide text-center mb-12 mt-32'>
              SKILLS
            </h2>

            <div className='w-full flex flex-col gap-14'>
              {skillGroups.map((group) => (
                <SkillRow key={group.title} group={group} />
              ))}

              <BasicExperience groups={skillGroups} />

              <div>
                <p className='font-pencil text-2xl tracking-widest uppercase text-black mb-5'>
                  Core Competencies
                </p>
                <div className='flex flex-wrap gap-2'>
                  {coreCompetencies.map((c) => (
                    <span
                      key={c}
                      className='text-sm font-medium text-zinc-800 border border-zinc-300 rounded-full px-4 py-2'
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className='w-full flex flex-col items-center mt-24 md:mt-60 mb-40'>
              <h2 className='text-zinc-900 text-4xl md:text-5xl tracking-wide text-center mb-16 mt-32'>
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
                <h2 className='text-zinc-900 text-4xl md:text-5xl tracking-wide text-center mb-8 mt-32'>
                  EDUCATION
                </h2>
                <p className='text-zinc-950 text-base md:text-lg font-medium mt-2 text-center px-4'>
                  Polytechnic University of Valencia — Design and Development of
                  Interactive Experiences
                </p>
                <p className='text-zinc-950 text-base md:text-lg font-medium mt-2 text-center px-4'>
                  ESAT — UX/UI and Front-end Development
                </p>
              </div>
            </div>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

/* Categoría: título + logos de las skills core, sin círculos */
function SkillRow({ group }: { group: SkillGroup }) {
  const core = group.skills.filter((s) => s.level === 'core');
  if (core.length === 0) return null;

  return (
    <div>
      <p className='font-pencil text-2xl tracking-widest uppercase text-black mb-6'>
        {group.title}
      </p>
      <div className='flex flex-wrap gap-x-6 gap-y-8 md:gap-x-8'>
        {core.map((s) => (
          <SkillIcon key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

function SkillIcon({ skill }: { skill: Skill }) {
  return (
    <div className='group flex flex-col items-center gap-2 w-[72px] md:w-24'>
      <div className='w-14 h-14 md:w-20 md:h-20 flex items-center justify-center'>
        <img
          src={skillIconSrc(skill)}
          alt=''
          loading='lazy'
          className='max-w-full max-h-full object-contain grayscale opacity-80 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 motion-reduce:transition-none'
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
        />
      </div>
      <span className='text-[10px] md:text-xs font-bold text-zinc-700 text-center leading-tight'>
        {skill.name}
      </span>
    </div>
  );
}

/* Basic Experience: desplegable, solo texto, agrupado por categoría */
function BasicExperience({ groups }: { groups: SkillGroup[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const basicGroups = groups
    .map((g) => ({
      title: g.title,
      skills: g.skills.filter((s) => s.level === 'basic'),
    }))
    .filter((g) => g.skills.length > 0);

  const total = basicGroups.reduce((n, g) => n + g.skills.length, 0);
  if (total === 0) return null;

  return (
    <div>
      <p className='font-pencil text-2xl tracking-widest uppercase text-black mb-2'>
        Basic Experience
      </p>
      <p className='text-sm text-zinc-600 mb-4'>
        Tools I have used and can work with at a basic level.
      </p>

      <div
        id={panelId}
        className='grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none'
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
        }}
      >
        <div className='overflow-hidden'>
          <div className='flex flex-col gap-5 pb-4'>
            {basicGroups.map((g) => (
              <div key={g.title}>
                <p className='text-xs tracking-widest uppercase text-zinc-600 mb-2'>
                  {g.title}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {g.skills.map((s) => (
                    <span
                      key={s.name}
                      className='text-sm font-medium text-zinc-700 border border-zinc-300 rounded-full px-4 py-1.5'
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className='text-xs tracking-widest uppercase text-zinc-700 hover:text-zinc-900 transition-colors'
      >
        {open ? 'Hide' : `Show all (${total})`}
      </button>
    </div>
  );
}

export default About;
