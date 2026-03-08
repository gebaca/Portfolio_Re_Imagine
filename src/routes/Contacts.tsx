import React from 'react';
import CircleSatellites from '../components/Circle/CircleSatellites ';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { FadeInParent } from '../components/Effects/FadeInParent';
import { Tooltip } from '../components/Tooltip/Tooltip';

const contactLinks = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/gerard-bataller-canet-963394372',
    icon: (
      <img src='/socials/linkedin.svg' alt='LinkedIn' className='w-8 h-8' />
    ),
  },
  {
    label: 'GitHub',
    url: 'https://github.com/gebaca',
    icon: <img src='/socials/github.svg' alt='GitHub' className='w-8 h-8' />,
  },
  {
    label: 'Email',
    url: 'mailto:gerard.bataller.canet@gmail.com',
    icon: <img src='/socials/gmail.svg' alt='Email' className='w-8 h-8' />,
  },
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
    /* 1. h-screen: ocupa toda la pantalla. 2. overflow-hidden: elimina el scroll. 3. justify-center: centra el contenido verticalmente. */
    <div className='w-full h-screen flex flex-col items-center justify-center overflow-hidden relative'>
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

      {/* Contenedor del contenido con ref para las transiciones */}
      <div
        ref={setContentRef}
        className='w-full flex flex-col items-center z-10'
      >
        <CircleSatellites
          color={circleState?.color || '#fff'}
          count={10}
          positionY={100} // Ajustado a 50 para centrar satélites si el diseño es fijo
          positionX={100}
        />

        <FadeInParent stagger={1} delay={2}>
          <div className='relative flex flex-col items-center w-full max-w-2xl px-6'>
            <header className='text-center mb-56'>
              <h1 className='text-5xl text-zinc-900 italic tracking-tighter mb-20'>
                Get in touch.
              </h1>
            </header>

            <div className='grid grid-cols-3 gap-6 md:gap-12 mb-60'>
              {/* Cambiado a 3 columnas para que los 3 iconos queden en fila si prefieres */}
              {contactLinks.map((link) => (
                <Tooltip key={link.label} text={link.label}>
                  <button
                    onClick={() => window.open(link.url, '_blank')}
                    className='relative cursor-pointer hover:opacity-80 transition-opacity'
                    title={link.label}
                  >
                    <CircleSVG
                      color='#ffffff'
                      style={{ width: '100px', height: '100px' }}
                    />
                    <span className='absolute inset-0 flex items-center justify-center'>
                      {link.icon}
                    </span>
                  </button>
                </Tooltip>
              ))}
            </div>

            <footer className='text-center font-pencil'>
              <p className='text-black text-lg'>+34 615 180 314</p>
              <p className='text-black text-lg'>Valencia/Madrid, España.</p>
            </footer>
          </div>
        </FadeInParent>
      </div>
    </div>
  );
}

export default Contacts;
