// src/components/Circle/SharedCircle.tsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import CircleSVG from './circleSVG';
import { useCircleTransition } from './CircleTransitionContext';
import { motion } from '../../tokens/theme';

export const SharedCircle = () => {
  const { phase, activeColor, originRectRef, targetRectRef } =
    useCircleTransition();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    gsap.killTweensOf(svg);

    switch (phase) {
      case 'expanding': {
        const origin = originRectRef.current;
        if (!origin) return;

        // Posicionar exactamente donde está el HomeCircle
        gsap.set(svg, {
          x: origin.left,
          y: origin.top,
          width: origin.width,
          height: origin.height,
          opacity: 1,
        });

        // Animar a pantalla completa (usando width/height, no scale)
        gsap.to(svg, {
          x: 0,
          y: 0,
          width: '100vw',
          height: '100vh',
          duration: motion.expandDuration,
          ease: 'power4.inOut',
        });
        break;
      }

      case 'collapsing': {
        const target = targetRectRef.current;
        if (!target) {
          gsap.to(svg, {
            opacity: 0,
            duration: motion.collapseDuration,
          });
          break;
        }
        gsap.to(svg, {
          x: target.left,
          y: target.top,
          width: target.width,
          height: target.height,
          opacity: 0,
          duration: motion.collapseDuration,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(svg, { clearProps: 'all' });
            if (targetRectRef.current) targetRectRef.current = null;
          },
        });
        break;
      }

      case 'idle':
        gsap.set(svg, { opacity: 0 });
        break;

      case 'expanded':
        gsap.set(svg, { opacity: 1 });
        break;
    }
  }, [phase, originRectRef, targetRectRef]);

  return createPortal(
    <CircleSVG
      ref={svgRef}
      color={activeColor ?? 'transparent'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0, // ← respetado
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />,
    document.body
  );
};
