import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCircleTransition } from '../Circle/CircleTransitionContext';

gsap.registerPlugin(useGSAP);

// Cambia aquí la fuente. Ejemplo con Google Fonts: 'Reenie Beanie'
const FONT: React.CSSProperties = {
  fontFamily: 'var(--font-hand)',
  fontSize: 'clamp(30px, 8vw, 44px)',
  lineHeight: 1,
  color: '#111',
};

const LEAVE_DELAY = 100;

const canHover = () => window.matchMedia('(hover: hover)').matches;

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

export const Logo = () => {
  const container = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const wiggles = useRef<gsap.core.Tween[]>([]);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { circleState, reverseTransition } = useCircleTransition();

  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          '.gb-ext',
          { width: 0 },
          { width: 'auto', duration: 1.1, ease: 'power4.out' },
          0
        )
        .fromTo(
          '.gb-gap',
          { width: 0 },
          { width: '0.4em', duration: 1.1, ease: 'power4.out' },
          0
        )
        .fromTo(
          '.gb-ext .gb-char',
          { opacity: 0 },
          { opacity: 1, duration: 0.25, stagger: 0.03, ease: 'none' },
          0.08
        );
    },
    { scope: container }
  );

  const startWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    if (!chars) return;
    wiggles.current.forEach((t) => t.kill());
    wiggles.current = [];
    chars.forEach((el, i) => {
      wiggles.current.push(
        gsap.to(el, {
          x: 'random(-1.3, 1.3)',
          y: 'random(-1.3, 1.3)',
          rotation: 'random(-2.8, 2.8)',
          duration: 0.11,
          repeat: -1,
          yoyo: true,
          ease: 'none',
          delay: i * 0.018,
        })
      );
    });
  });

  const stopWiggle = contextSafe(() => {
    const chars = container.current?.querySelectorAll('.gb-char');
    wiggles.current.forEach((t) => t.kill());
    wiggles.current = [];
    if (chars) {
      gsap.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.45,
        ease: 'power3.out',
      });
    }
  });

  const open = contextSafe(() => {
    if (!canHover()) return;
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    tl.current?.play();
    startWiggle();
  });

  const close = contextSafe(() => {
    leaveTimeout.current = setTimeout(() => {
      tl.current?.reverse();
      stopWiggle();
      leaveTimeout.current = null;
    }, LEAVE_DELAY);
  });

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, []);

  const handleClick = () => {
    if (location.pathname === '/') return;
    if (circleState) {
      reverseTransition(navigate);
    } else {
      navigate('/');
    }
  };

  const extStyle: React.CSSProperties = {
    ...FONT,
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 0,
    paddingBottom: '0.2em',
    marginBottom: '-0.2em',
  };

  return (
    <button
      ref={container}
      type='button'
      aria-label='Gerard Bataller, inicio'
      onPointerEnter={open}
      onPointerLeave={close}
      onFocus={open}
      onBlur={close}
      onClick={handleClick}
      className='fixed top-4 left-4 md:top-7 md:left-7 z-50 cursor-pointer select-none flex items-baseline bg-transparent border-0 p-0'
    >
      <span aria-hidden='true' className='flex items-baseline'>
        <span className='gb-char' style={{ ...FONT, display: 'inline-block' }}>
          G
        </span>
        <span className='gb-ext' style={extStyle}>
          {letters('erard')}
        </span>

        <span
          className='gb-gap'
          style={{ display: 'inline-block', width: 0, flexShrink: 0 }}
        />

        <span className='gb-char' style={{ ...FONT, display: 'inline-block' }}>
          B
        </span>
        <span className='gb-ext' style={extStyle}>
          {letters('ataller')}
        </span>
      </span>
    </button>
  );
};
