import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircleSVG from '../Circle/circleSVG';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  color: string;
  size?: number;
  expandScale?: number;
  side?: 'left' | 'right';
  primaryContent?: ReactNode;
  summaryContent?: ReactNode;
  mediaContent?: ReactNode;
  extraCount?: number;
}

const SECONDARY_APPEAR_PROGRESS = 0.4;

const ProjectCard = ({
  color,
  size = 200,
  expandScale = 1.6,
  side = 'left',
  primaryContent,
  summaryContent,
  mediaContent,
}: ProjectCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [bottomVisible, setBottomVisible] = useState(false);

  const handleCircleClick = () => {
    if (!bottomVisible) {
      setBottomVisible(true);
      requestAnimationFrame(() => {
        const el = bottomRef.current;
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 3, duration: 0.6, ease: 'back.out(1.4)' }
        );
      });
    } else {
      const el = bottomRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        scale: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setBottomVisible(false),
      });
    }
  };

  const hideSecondaryAndBottom = (sec: HTMLDivElement) => {
    gsap.to(sec, {
      opacity: 0,
      scale: 0.85,
      duration: 0.3,
      ease: 'power2.in',
      overwrite: true,
    });
    const ter = bottomRef.current;
    if (ter) {
      gsap.to(ter, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: true,
        onComplete: () => setBottomVisible(false),
      });
    }
  };

  useGSAP(
    () => {
      const el = containerRef.current;
      const sec = secondaryRef.current;
      if (!el || !sec) return;

      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: expandScale,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top -20%',
            scrub: 1,
            onLeave: () => hideSecondaryAndBottom(sec),
            onEnterBack: () => {
              gsap.to(sec, {
                opacity: 1,
                scale: 2,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: true,
              });
            },
            onUpdate: (self) => {
              if (self.progress >= SECONDARY_APPEAR_PROGRESS) {
                gsap.to(sec, {
                  opacity: 1,
                  scale: 2,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: true,
                });
              } else {
                hideSecondaryAndBottom(sec);
              }
            },
          },
        }
      );
    },
    { scope: wrapperRef }
  );

  const secondarySize = size * expandScale;

  const secondary = (
    <div
      onClick={handleCircleClick}
      style={{
        position: 'relative',
        width: secondarySize,
        height: secondarySize,
        flexShrink: 0,
        marginLeft: side === 'left' ? 40 : 0,
        marginRight: side === 'right' ? 40 : 0,
        cursor: 'pointer',
      }}
    >
      <div
        ref={secondaryRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transformOrigin: 'center center',
        }}
      >
        <CircleSVG
          color={color}
          style={{ width: '100%', height: '100%', opacity: 0.6 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '25%',
            overflow: 'hidden',
            gap: 8,
          }}
        >
          {summaryContent}
          <span
            style={{
              fontFamily: 'Pencil-Regular',
              fontSize: '0.5rem',
              color: 'rgba(1,1,1,1)',
              marginTop: 4,
              flexShrink: 0,
            }}
          >
            Click Here
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {side === 'right' && secondary}

        {/* Círculo 1: principal */}
        <div
          ref={containerRef}
          style={{
            width: size,
            height: size,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <CircleSVG color={color} style={{ width: '100%', height: '100%' }} />
          {primaryContent && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15%',
                overflow: 'hidden',
              }}
            >
              {primaryContent}
            </div>
          )}
        </div>

        {side === 'left' && secondary}
      </div>

      {/* Círculo 3: toggle al clickar el círculo 2 */}
      {bottomVisible && (
        <div
          ref={bottomRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: secondarySize,
            height: secondarySize,
            opacity: 0,
            transformOrigin: 'center center',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <CircleSVG
              color={color}
              style={{ width: '100%', height: '100%', opacity: 0.6 }}
            />
          </div>
          {mediaContent && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20%',
                overflow: 'visible',
                pointerEvents: 'auto',
              }}
            >
              {mediaContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
