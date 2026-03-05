import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface UseFadeInOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  animateChildren?: boolean;
  skipRef?: React.RefObject<boolean>;
}

export const useFadeIn = (
  targetRef: React.RefObject<HTMLElement | null>,
  {
    skipRef = { current: false },
    duration = 1,
    stagger = 0,
    delay = 0,
    animateChildren = false,
  }: UseFadeInOptions = {}
) => {
  useGSAP(
    () => {
      const el = targetRef.current;
      if (!el) return;
      if (skipRef?.current) return;

      const target = animateChildren ? el.children : el;

      gsap.from(target, {
        opacity: 0,
        duration,
        delay,
        stagger: animateChildren ? stagger : 0,
        immediateRender: true,
      });
    },
    {
      scope: targetRef,
      dependencies: [duration, stagger, delay, animateChildren],
    }
  );
};
