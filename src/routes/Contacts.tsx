import CircleSatellites from '../components/Circle/CircleSatellites ';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

function Contacts() {
  const { circleState } = useCircleTransition();

  const contactLinks = [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario' },
    { label: 'GitHub', url: 'https://github.com/tu-usuario' },
    { label: 'Email', url: 'mailto:tu-correo@ejemplo.com' },
    { label: 'Instagram', url: 'https://instagram.com/tu-usuario' },
  ];

  return (
    <div className='flex flex-col items-center'>
      {/* 1. FONDO (MANTENIDO) */}
      {circleState?.rect && (
        <div
          style={{
            position: 'absolute',
            top: circleState.rect.top,
            left: circleState.rect.left,
            width: circleState.rect.width,
            height: circleState.rect.height,
            pointerEvents: 'none',
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
        count={50}
        positionY={100}
        positionX={10}
      />

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className='relative z-10 flex flex-col items-center w-full max-w-2xl px-6'>
        <header className='text-center mb-16'>
          <h2 className='text-zinc-500 uppercase tracking-[0.6em] text-[10px] font-black mb-4'>
            ¿Hablamos?
          </h2>
          <h1 className='text-5xl font-bold text-zinc-900 italic tracking-tighter'>
            Get in touch.
          </h1>
        </header>

        {/* LISTA DE ENLACES LIMPIA */}
        <div className='w-full flex flex-col items-center gap-6'>
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-2xl font-bold text-zinc-800'
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* PIE DE CONTACTO */}
        <footer className='mt-24 text-center'>
          <p className='text-zinc-400 text-sm font-medium'>Valencia, España.</p>
          <p className='text-zinc-300 text-[10px] uppercase tracking-widest mt-2'>
            Disponible para nuevos proyectos
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Contacts;
