// ============================================================================
// usePageTransition.ts — FIXED
// ============================================================================
// Por qué el fade no funcionaba antes:
//   gsap.to(content, { opacity:0, onComplete: () => navigate() })
//   React desmonta el nodo casi inmediatamente al llamar navigate(),
//   cancelando la animación GSAP antes de que termine.
//
// Solución — técnica cloneNode:
//   1. Clonar el nodo del contenido actual
//   2. Añadir el clon al body como overlay fijo (nadie lo desmonta)
//   3. Navegar inmediatamente → React monta la nueva página debajo
//   4. Fade-out del clon (que sigue vivo en el body)
//   5. Al terminar, eliminar el clon
//
// Resultado: el usuario ve la página actual desvaneciéndose mientras
// la nueva ya está montada debajo.
// ============================================================================

import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

export function usePageTransition() {
  const navigate = useNavigate();
  const { pageContentRef, isReversingRef } = useCircleTransition();

  const navigateTo = (path: string) => {
    if (isReversingRef.current) return;

    const content = pageContentRef.current;

    if (!content) {
      navigate(path);
      return;
    }

    // Clonar el contenido actual y fijarlo como overlay
    const rect = content.getBoundingClientRect();
    const clone = content.cloneNode(true) as HTMLElement;

    clone.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      overflow: hidden;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
    `;

    document.body.appendChild(clone);

    // Navegar inmediatamente — la nueva página monta debajo del clon
    navigate(path);

    // Fade-out del clon sobre la nueva página ya montada
    gsap.to(clone, {
      opacity: 0,
      duration: 0.22,
      ease: 'power1.in',
      onComplete: () => clone.remove(),
    });
  };

  return { navigateTo };
}
