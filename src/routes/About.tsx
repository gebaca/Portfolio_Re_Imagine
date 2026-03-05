import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import { FadeInParent } from '../components/Effects/FadeInParent';

const artTools = ['Photoshop', 'Illustrator', 'Blender', 'Procreate'];
const codeTools = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'];
const officeTools = ['Git', 'Jira', 'Confluence', 'Trello', 'Slack'];

function About() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // Apunta al div raíz — cubre todo: satélites, contenido, hero
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
            color={circleState.color}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      <div ref={setContentRef} className='w-full flex flex-col items-center'>
        {/* FONDO */}

        <CircleSatellites
          color={circleState?.color || '#fff'}
          count={40}
          positionY={100}
          positionX={100}
        />

        <FadeInParent stagger={1}>
          <div className='relative z-10 w-full max-w-4xl px-6 flex flex-col items-center py-20'>
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

            <p className='max-w-2xl text-center text-[1.125rem] leading-[1.8] text-zinc-800 font-medium mb-40'>
              I'm a passionate web developer with a love for creating dynamic
              and engaging user experiences. With a background in design and a
              knack for animation, I specialize in crafting visually stunning
              websites...
            </p>

            <div className='w-full flex flex-col gap-32'>
              <div className='flex w-full justify-start'>
                <div className='flex items-center gap-6 max-w-xl'>
                  <div className='w-32 h-32 rounded-3xl bg-yellow-100 border-2 border-yellow-200 flex items-center justify-center text-sm font-black text-yellow-700 uppercase tracking-tighter shadow-inner flex-shrink-0'>
                    Arte
                  </div>
                  <div className='flex gap-3 flex-wrap'>
                    {artTools.map((name) => (
                      <SkillBox key={name} name={name} />
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex w-full justify-end'>
                <div className='flex items-center gap-6 max-w-xl flex-row-reverse'>
                  <div className='w-32 h-32 rounded-3xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-sm font-black text-blue-700 uppercase tracking-tighter shadow-inner flex-shrink-0'>
                    Code
                  </div>
                  <div className='flex gap-3 flex-wrap justify-end text-right'>
                    {codeTools.map((name) => (
                      <SkillBox key={name} name={name} />
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex w-full justify-start'>
                <div className='flex items-center gap-6 max-w-xl'>
                  <div className='w-32 h-32 rounded-3xl bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center text-sm font-black text-zinc-600 uppercase tracking-tighter shadow-inner flex-shrink-0'>
                    Gestión
                  </div>
                  <div className='flex gap-3 flex-wrap'>
                    {officeTools.map((name) => (
                      <SkillBox key={name} name={name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-col items-center mt-60 mb-40'>
              <h3 className='text-zinc-400 uppercase tracking-[0.5em] text-[10px] font-black mb-20'>
                Experiencia
              </h3>
              <div className='relative w-full max-w-2xl border-l border-zinc-200 ml-6 pl-10 flex flex-col gap-24'>
                <div className='relative'>
                  <div className='absolute -left-[45px] top-1 w-4 h-4 rounded-full border-2 border-zinc-950 bg-zinc-200' />
                  <div>
                    <h4 className='text-xl font-bold text-zinc-800'>FICIV</h4>
                    <p className='text-zinc-500 text-sm font-medium'>
                      Festival Internacional de Cine Infantil de Valencia
                    </p>
                    <p className='mt-4 text-zinc-600 leading-relaxed text-[15px]'>
                      Apoyo tecnológico y creativo en un entorno cultural
                      dinámico. Una experiencia clave para entender la unión
                      entre el arte visual y la ejecución técnica.
                    </p>
                  </div>
                </div>
                <div className='relative'>
                  <div className='absolute -left-[45px] top-1 w-4 h-4 rounded-full border-2 border-zinc-950 bg-zinc-200' />
                  <div>
                    <h4 className='text-xl font-bold text-zinc-800'>
                      Mutua Madrileña
                    </h4>
                    <p className='text-zinc-500 text-sm font-medium'>
                      Programador Junior
                    </p>
                    <p className='mt-4 text-zinc-600 leading-relaxed text-[15px]'>
                      Primer contacto con desarrollo corporativo de alto nivel.
                      Aprendizaje intensivo sobre flujos de trabajo
                      profesionales, resolución de bugs y despliegues en
                      entornos reales.
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-col items-center mt-60 mb-40'>
                <h2 className='text-black uppercase tracking-[0.5em] text-[10px] font-black'>
                  Estudios
                </h2>
                <h3 className='text-zinc-950 text-m font-medium mt-2'>
                  Universidad Politécnica de Valencia — Grado en Ingeniería
                  Informática
                </h3>
                <h3 className='text-zinc-950 text-m font-medium mt-2'>
                  ESAT — Diseño y Desarrollo Web
                </h3>
              </div>
            </div>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

function SkillBox({ name }: { name: string }) {
  return (
    <div className='px-4 py-2 h-12 min-w-[3rem] rounded-xl bg-white/50 backdrop-blur-sm border border-zinc-200 flex items-center justify-center text-[11px] font-bold text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 transition-all duration-300 shadow-sm'>
      {name}
    </div>
  );
}

export default About;
