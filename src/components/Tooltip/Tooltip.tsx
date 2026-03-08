import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

// ── Parámetros ────────────────────────────────────────────────
const LETTER_STAGGER = 0.04; // s — delay entre cada letra
const LETTER_DURATION = 0.25; // s — fade+slide de cada letra
const WIGGLE_RANGE = 0.8; // px — amplitud del temblor
const WIGGLE_ROTATION = 1.5; // deg — rotación máxima del wiggle
const WIGGLE_SPEED = 0.12; // s — velocidad de cada oscilación
const FOLLOW_OFFSET = { x: 14, y: -28 }; // px — offset respecto al cursor
// ──────────────────────────────────────────────────────────────

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Sigue el cursor con requestAnimationFrame para suavidad
  const handleMouseMove = (e: React.MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate(${posRef.current.x + FOLLOW_OFFSET.x}px, ${posRef.current.y + FOLLOW_OFFSET.y}px)`;
      }
      rafRef.current = null;
    });
  };

  // ── Animación de entrada ──────────────────────────────────────
  const { contextSafe } = useGSAP({ scope: tooltipRef });

  const animateIn = contextSafe(() => {
    const chars = charsRef.current;
    if (!chars.length) return;

    gsap.killTweensOf(chars);

    // 1. Aparición letra a letra
    gsap.fromTo(
      chars,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: LETTER_DURATION,
        stagger: LETTER_STAGGER,
        ease: 'power2.out',
        onComplete: () => {
          // 2. Wiggle continuo una vez todas las letras están visibles
          chars.forEach((char, i) => {
            gsap.to(char, {
              x: `random(-${WIGGLE_RANGE}, ${WIGGLE_RANGE})`,
              y: `random(-${WIGGLE_RANGE}, ${WIGGLE_RANGE})`,
              rotation: `random(-${WIGGLE_ROTATION}, ${WIGGLE_ROTATION})`,
              duration: WIGGLE_SPEED,
              repeat: -1,
              yoyo: true,
              ease: 'none',
              delay: i * 0.015,
            });
          });
        },
      }
    );
  });

  const animateOut = contextSafe(() => {
    const chars = charsRef.current;
    if (!chars.length) return;

    gsap.killTweensOf(chars);
    gsap.to(chars, {
      opacity: 0,
      y: 4,
      duration: 0.15,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        // Resetea posición para la próxima entrada
        gsap.set(chars, { x: 0, y: 0, rotation: 0 });
      },
    });
  });

  useEffect(() => {
    if (visible) animateIn();
    else animateOut();
  }, [visible]);

  // Limpia el RAF al desmontar
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Tooltip — fixed para seguir el cursor sin verse afectado por el layout */}
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            fontFamily: 'Pencil-Regular',
            fontStyle: 'normal',
            fontSize: '30px',
            color: '#111',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '0.5px',
          }}
        >
          {text.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) charsRef.current[i] = el;
              }}
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
