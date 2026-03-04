import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircleSVG from '../Circle/circleSVG';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  color: string;
  size?: number;
  expandScale?: number; // escala máxima al entrar en viewport
}

const ProjectCard = ({
  color,
  size = 200,
  expandScale = 1.6,
}: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: expandScale,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            // empieza a expandirse cuando el borde inferior del SVG entra en viewport
            start: 'top bottom',
            // termina de expandirse cuando llega al centro de la pantalla
            end: 'center center',
            scrub: 1, // sigue el scroll suavemente
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ width: size, height: size }}>
      <CircleSVG color={color} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ProjectCard;
