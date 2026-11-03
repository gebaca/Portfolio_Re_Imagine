import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

const ROUTE_COLORS: Record<string, string> = {
  '/about': '#FDDA0D',
  '/works': '#DE0A00',
  '/contacts': '#00C4FF',
};

export function usePageTransition() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    pageContentRef,
    bgCircleRef,
    isReversingRef,
    setCircleState,
    clearCircleState,
    getRect,
  } = useCircleTransition();

  // Guarda dónde está ahora el círculo para que la página nueva parta de ahí
  const handOverCircle = (path: string) => {
    if (pathname === '/') return;
    const bg = bgCircleRef.current;
    const b = bg?.getBoundingClientRect();
    if (!b || b.width === 0) {
      clearCircleState();
      return;
    }
    setCircleState({
      color: ROUTE_COLORS[path] ?? '#000',
      rect: getRect(path),
      scaledRect: {
        top: b.top + window.scrollY,
        left: b.left + window.scrollX,
        width: b.width,
        height: b.height,
      },
    });
  };

  const navigateTo = (path: string) => {
    if (isReversingRef.current) return;

    const content = pageContentRef.current;

    if (!content) {
      handOverCircle(path);
      navigate(path);
      return;
    }

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

    handOverCircle(path);
    navigate(path);

    gsap.to(clone, {
      opacity: 0,
      duration: 0.22,
      ease: 'power1.in',
      onComplete: () => clone.remove(),
    });
  };

  return { navigateTo };
}
