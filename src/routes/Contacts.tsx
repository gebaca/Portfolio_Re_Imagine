import CircleSatellites from '../components/Circle/CircleSatellites ';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { Tooltip } from '../components/Tooltip/Tooltip';

const contactLinks = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario' },
  { label: 'GitHub', url: 'https://github.com/tu-usuario' },
  { label: 'Email', url: 'mailto:tu-correo@ejemplo.com' },
  { label: 'Instagram', url: 'https://instagram.com/tu-usuario' },
];

function Contacts() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();

  const setBgRef = (el: HTMLDivElement | null) => {
    (bgCircleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };
  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

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
        </div>
      )}

      <div ref={setContentRef}>
        <CircleSatellites
          color={circleState?.color || '#fff'}
          count={50}
          positionY={100}
          positionX={10}
        />

        <FadeInParent stagger={1} delay={2}>
          <div className='relative z-10 flex flex-col items-center w-full max-w-2xl px-6'>
            <header className='text-center mb-16'>
              <h2 className='text-zinc-500 uppercase tracking-[0.6em] text-[10px] font-black mb-4'>
                ¿Hablamos?
              </h2>
              <h1 className='text-5xl font-bold text-zinc-900 italic tracking-tighter'>
                Get in touch.
              </h1>
            </header>

            <div className='w-full flex flex-col gap-6'>
              {contactLinks.map((link, index) => (
                <Tooltip text={link.label}>
                  <div
                    key={link.label}
                    className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} px-6`}
                  >
                    <button
                      onClick={() => window.open(link.url, '_blank')}
                      className='relative cursor-pointer hover:opacity-80 transition-opacity'
                      title={link.label}
                    >
                      <CircleSVG
                        color='#000000'
                        style={{ width: '120px', height: '120px' }}
                      />
                      <span className='absolute inset-0 flex items-center justify-center text-2xl font-bold text-zinc-800'>
                        {link.label}
                      </span>
                    </button>
                  </div>
                </Tooltip>
              ))}
            </div>

            <footer className='mt-24 text-center'>
              <p className='text-zinc-400 text-sm font-medium'>
                Valencia, España.
              </p>
              <p className='text-zinc-300 text-[10px] uppercase tracking-widest mt-2'>
                Disponible para nuevos proyectos
              </p>
            </footer>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

export default Contacts;
