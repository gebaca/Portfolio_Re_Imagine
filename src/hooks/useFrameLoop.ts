// ============================================================
// useFrameLoop.ts — Animación de fotogramas (stop-motion)
// ============================================================
//
// RESPONSABILIDAD: Anima un elemento con saltos discretos de rotación,
// como si fuera una animación cuadro a cuadro dibujada a mano.
// No hay interpolación entre frames — cada cambio es instantáneo.
//
// DIFERENCIA CON useJitter:
//   Jitter   → tweens suaves entre posiciones aleatorias (orgánico, nervioso)
//   FrameLoop → saltos instantáneos en intervalos fijos (stop-motion, artesanal)
//
// PARÁMETROS:
//   targetRef  → ref al elemento DOM a animar
//   fps        → fotogramas por segundo (default: 8 — clásico stop-motion)
//   rotRange   → grados máximos de rotación por frame (default: 12)
//   driftRange → píxeles máximos de desplazamiento x/y por frame (default: 2)
//                Mantenlo bajo para que el efecto sea principalmente de rotación.
//
// RETORNA:
//   startFrameLoop() → inicia la animación
//   stopFrameLoop()  → detiene y resetea al estado original

import { useCallback, useRef } from 'react';
import { gsap } from 'gsap';

interface UseFrameLoopOptions {
  fps?: number;
  rotRange?: number;
  driftRange?: number;
}

export function useFrameLoop(
  targetRef: React.RefObject<Element | null>,
  { fps = 8, rotRange = 12, driftRange = 2 }: UseFrameLoopOptions = {}
) {
  // Guardamos el intervalId para poder cancelarlo después
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFrameLoop = useCallback(() => {
    const el = targetRef.current;
    if (!el || intervalRef.current) return; // Evita loops dobles

    const frameDuration = 1000 / fps; // Ej: 8fps → 125ms por frame

    intervalRef.current = setInterval(() => {
      // gsap.set es instantáneo — sin interpolación, sin ease.
      // Esto es lo que crea el efecto de fotograma dibujado a mano.
      gsap.set(el, {
        rotation: (Math.random() - 0.5) * rotRange * 2, // [-rotRange, +rotRange]°
        x: (Math.random() - 0.5) * driftRange * 2, // pequeño drift
        y: (Math.random() - 0.5) * driftRange * 2,
        transformOrigin: 'center center',
      });
    }, frameDuration);
  }, [targetRef, fps, rotRange, driftRange]);

  const stopFrameLoop = useCallback(() => {
    const el = targetRef.current;

    // Limpiamos el interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reseteamos con un tween suave para que la transición al click
    // no sea abrupta — el círculo vuelve al centro antes de expandirse
    if (el) {
      gsap.to(el, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.15,
        ease: 'power2.out',
      });
    }
  }, [targetRef]);

  return { startFrameLoop, stopFrameLoop };
}
