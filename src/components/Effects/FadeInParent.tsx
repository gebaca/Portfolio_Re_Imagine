import { useRef } from 'react';
import { useFadeIn } from '../../hooks/useFadeIn';

interface FadeInParentProps {
  children: React.ReactNode;
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
}

export const FadeInParent: React.FC<FadeInParentProps> = ({
  children,
  duration = 1,
  stagger = 0,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useFadeIn(ref, {
    duration,
    stagger,
    delay,
    animateChildren: true,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
