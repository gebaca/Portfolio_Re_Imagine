import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCircleTransition } from '../Circle/CircleTransitionContext';

const FONT: React.CSSProperties = {
  fontFamily: 'Pencil-Regular',
  fontStyle: 'italic',
  fontSize: '40px',
  lineHeight: 1,
  color: '#111',
};

const EXPAND_MS = 1380;
const LEAVE_DELAY = 100;

export const Logo = () => {
  const [hovered, setHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { reverseTransition, phase } = useCircleTransition(); // ← solo reverseTransition y phase (opcional)
  const location = useLocation();

  const { contextSafe } = useGSAP({ scope: container });

  const startWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    if (!chars) return;
    gsap.killTweensOf(chars);
    chars.forEach((el, i) => {
      gsap.to(el, {
        x: 'random(-1.3, 1.3)',
        y: 'random(-1.3, 1.3)',
        rotation: 'random(-2.8, 2.8)',
        duration: 0.11,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: i * 0.018,
      });
    });
  });

  const stopWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    if (!chars) return;
    gsap.killTweensOf(chars);
    gsap.to(chars, {
      x: 0.1,
      y: 0.1,
      rotation: 0,
      duration: 0.45,
      ease: 'power3.out',
    });
  });

  useEffect(() => {
    if (hovered) startWiggle();
    else stopWiggle();
  }, [hovered]);

  const handlePointerEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setHovered(true);
  };

  const handlePointerLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHovered(false);
      leaveTimeout.current = null;
    }, LEAVE_DELAY);
  };

  const handleClick = () => {
    if (location.pathname === '/') return;
    // Llamamos a reverseTransition sin condiciones adicionales
    // El contexto internamente verificará si hay algo que revertir
    reverseTransition(navigate);
  };

  const letters = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className='gb-char'
        style={{ display: 'inline-block', willChange: 'transform' }}
      >
        {char}
      </span>
    ));

  return (
    <div
      ref={container}
      className='fixed top-7 left-7 z-50 cursor-pointer select-none flex items-baseline'
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      aria-label='Gerard Bataller — inicio'
    >
      {/* GERARD */}
      <div className='flex items-baseline overflow-hidden'>
        <span
          className='gb-char'
          style={{
            ...FONT,
            display: 'inline-block',
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          G
        </span>
        <span
          style={{
            ...FONT,
            display: 'flex',
            overflow: 'hidden',
            paddingLeft: '4px',
            paddingRight: '4px',
            maxWidth: hovered ? '160px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: `max-width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1), opacity ${hovered ? 300 : 200}ms ease ${hovered ? '80ms' : '0ms'}`,
          }}
        >
          {letters('erard')}
        </span>
      </div>

      <span
        style={{
          display: 'inline-block',
          width: hovered ? '15px' : '0px',
          transition: `width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1)`,
          flexShrink: 0,
        }}
      />

      {/* BATALLER */}
      <div className='flex items-baseline overflow-hidden'>
        <span
          className='gb-char'
          style={{
            ...FONT,
            display: 'inline-block',
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          B
        </span>
        <span
          style={{
            ...FONT,
            display: 'flex',
            overflow: 'hidden',
            paddingLeft: '4px',
            paddingRight: '4px',
            maxWidth: hovered ? '200px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: `max-width ${EXPAND_MS}ms cubic-bezier(0.22,1,0.36,1), opacity ${hovered ? 260 : 200}ms ease ${hovered ? '80ms' : '0ms'}`,
          }}
        >
          {letters('ataller')}
        </span>
      </div>
    </div>
  );
};
