import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const useSquiggly = (intensity = 1.5) => {
  const containerRef = useRef<any>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const startWiggle = contextSafe(() => {
    // Buscamos cualquier hijo directo o elementos con clase específica
    const targets = containerRef.current.querySelectorAll('.animate-target');
    if (!targets.length) return;

    gsap.to(targets, {
      x: `random(${-intensity}, ${intensity})`,
      y: `random(${-intensity}, ${intensity})`,
      rotation: `random(${-intensity * 5}, ${intensity * 2})`,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      delay: (i) => i * 0.01,
    });
  });

  const stopWiggle = contextSafe(() => {
    const targets = containerRef.current.querySelectorAll('.animate-target');
    gsap.killTweensOf(targets);
    gsap.to(targets, { x: 0, y: 0, rotation: 0, duration: 0.3 });
  });

  return { containerRef, startWiggle, stopWiggle };
};
