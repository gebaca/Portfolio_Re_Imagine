//ENTERAMENTE HECHO CON IA
//TODO CAMBIARLO Y REDISEÑO

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Logo = () => {
  const [hovered, setHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Referencias para el control de tiempos original
  const animTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCollapse = useRef(false);

  const EXPAND_DURATION = 500;
  const LEAVE_DELAY = 200;

  // --- LÓGICA DE GSAP ---
  const { contextSafe } = useGSAP({ scope: container });

  // Función para iniciar el temblor letra por letra
  const startWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.wiggle-char');
    if (!chars) return;

    gsap.killTweensOf(chars); // Limpiar cualquier animación previa

    chars.forEach((char) => {
      gsap.to(char, {
        x: 'random(-1.5, 1.5)',
        y: 'random(-1.5, 1.5)',
        rotation: 'random(-3, 3)',
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: Math.random() * 0.1,
      });
    });
  });

  // Función para resetear las letras a su posición original
  const stopWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.wiggle-char');
    if (!chars) return;

    gsap.killTweensOf(chars);
    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  // Sincronización: Cuando cambia el estado 'hovered', disparamos GSAP
  useEffect(() => {
    if (hovered) {
      startWiggle();
    } else {
      stopWiggle();
    }
  }, [hovered, startWiggle, stopWiggle]);

  // --- TUS HANDLERS ORIGINALES ---
  const handlePointerEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    pendingCollapse.current = false;
    setHovered(true);

    if (animTimeout.current) clearTimeout(animTimeout.current);
    animTimeout.current = setTimeout(() => {
      animTimeout.current = null;
      if (pendingCollapse.current) {
        pendingCollapse.current = false;
        setHovered(false);
      }
    }, EXPAND_DURATION);
  };

  const handlePointerLeave = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    leaveTimeout.current = setTimeout(() => {
      leaveTimeout.current = null;
      if (animTimeout.current) {
        pendingCollapse.current = true;
      } else {
        setHovered(false);
      }
    }, LEAVE_DELAY);
  };

  // Función para envolver cada letra en un span animable
  const renderLetters = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className='wiggle-char inline-block'
        style={{ willChange: 'transform', display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div
      ref={container}
      className='fixed top-8 left-8 z-50 flex items-center gap-3 group cursor-pointer'
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <span
        style={{
          maxWidth: hovered ? '160px' : '24px',
          transition: `max-width ${EXPAND_DURATION}ms ease`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        className='text-white font-bold text-xl tracking-tighter inline-block'
      >
        {renderLetters('GERARD')}
      </span>

      <span
        className={
          'h-[2px] bg-white transition-all duration-500 ' +
          (hovered ? 'w-0' : 'w-8')
        }
      />

      <span
        style={{
          maxWidth: hovered ? '200px' : '24px',
          transition: `max-width ${EXPAND_DURATION}ms ease`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        className='text-white font-bold text-xl tracking-tighter inline-block'
      >
        {renderLetters('BATALLER')}
      </span>
    </div>
  );
};
