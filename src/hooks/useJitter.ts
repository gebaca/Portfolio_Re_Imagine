// ============================================================
// useJitter.ts — Hook personalizado para la animación jitter
// ============================================================
//
// RESPONSABILIDAD: Solo gestiona la animación de "wiggle/jitter"
// continua del círculo. El componente lo usa, pero no sabe CÓMO
// funciona la animación por dentro.
//
// PARÁMETROS:
//   targetRef  → ref al elemento SVG (o cualquier elemento DOM)
//   intensity  → cuánto se mueve (default: 3px)
//   speed      → duración de cada "sacudida" (default: 0.08s)
//
// RETORNA:
//   startJitter() → inicia el loop de animación
//   stopJitter()  → detiene la animación y resetea posición

import { useCallback } from 'react';
import { gsap } from 'gsap';

interface UseJitterOptions {
  intensity?: number;
  speed?: number;
}

export function useJitter(
  targetRef: React.RefObject<Element | null>,
  { intensity = 3, speed = 0.08 }: UseJitterOptions = {}
) {
  // Función recursiva que crea el efecto de vibración aleatoria
  const jitterLoop = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    gsap.to(el, {
      x: (Math.random() - 0.5) * intensity * 2, // valor entre -intensity y +intensity
      y: (Math.random() - 0.5) * intensity * 2,
      duration: speed,
      ease: 'none',
      rotate: (Math.random() - 0.5) * intensity * 4, // opcional: también rota un poco
      onComplete: jitterLoop, // 👈 Se llama a sí mismo → loop infinito
    });
  }, [targetRef, intensity, speed]);

  const startJitter = useCallback(() => {
    jitterLoop();
  }, [jitterLoop]);

  const stopJitter = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    gsap.killTweensOf(el); // Detiene todas las animaciones del elemento
    gsap.set(el, { x: 0, y: 0 }); // Regresa al centro exacto
  }, [targetRef]);

  return { startJitter, stopJitter };
}
