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
  duration = 0.6,
  stagger = 0.15,
  delay = 0.2,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useFadeIn(ref, {
    duration,
    stagger,
    animateChildren: true,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
