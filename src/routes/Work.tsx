import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';
import { projects } from '../components/Projects/projects';
import type { Project } from '../components/Projects/projects';

// ─── Paleta ──────────────────────────────────────────────────────────────────
const RED = '#DE0A00';
const WHITE = '#FAFAF8';

const STACK_COLORS: Record<string, { bg: string; text: string }> = {
  JavaScript: { bg: '#FEF08A', text: '#713F12' },
  TypeScript: { bg: '#DBEAFE', text: '#1E40AF' },
  React: { bg: '#BAE6FD', text: '#0C4A6E' },
  'Next.js': { bg: '#E4E4E7', text: '#18181B' },
  Node: { bg: '#BBF7D0', text: '#14532D' },
  'Tailwind CSS': { bg: '#CFFAFE', text: '#164E63' },
  GSAP: { bg: '#D1FAE5', text: '#064E3B' },
  Figma: { bg: '#FDE68A', text: '#92400E' },
  '3D MAX': { bg: '#E9D5FF', text: '#4C1D95' },
  'Blender 3D': { bg: '#FED7AA', text: '#7C2D12' },
  'After Effects': { bg: '#EDE9FE', text: '#4C1D95' },
  Motion: { bg: '#FCE7F3', text: '#831843' },
  Firebase: { bg: '#FEF3C7', text: '#78350F' },
  Unity: { bg: '#E4E4E7', text: '#18181B' },
  'C#': { bg: '#F3E8FF', text: '#581C87' },
  Python: { bg: '#DBEAFE', text: '#1E3A8A' },
  Git: { bg: '#FFE4E6', text: '#9F1239' },
  OnShape: { bg: '#E0F2FE', text: '#0C4A6E' },
  Sketchbook: { bg: '#FEE2E2', text: '#7F1D1D' },
  Affinity: { bg: '#EDE9FE', text: '#4C1D95' },
  Gres: { bg: '#FEF9C3', text: '#713F12' },
  Placa: { bg: '#F0FDF4', text: '#14532D' },
  Casting: { bg: '#F9FAFB', text: '#374151' },
  'Plata 925': { bg: '#F1F5F9', text: '#334155' },
  Aluminio: { bg: '#E2E8F0', text: '#1E293B' },
  Artesanal: { bg: '#FDF2F8', text: '#701A75' },
};

function getStackColor(label: string) {
  if (STACK_COLORS[label]) return STACK_COLORS[label];
  let h = 0;
  for (let i = 0; i < label.length; i++)
    h = (h * 31 + label.charCodeAt(i)) & 0xffff;
  const hue = h % 360;
  return { bg: `hsl(${hue},60%,90%)`, text: `hsl(${hue},60%,25%)` };
}

const CONTENT_START = 1.75;
const STEP = 0.1;
const EXP_PREVIEW = 5;

function StackTag({ label }: { label: string }) {
  const { bg, text } = getStackColor(label);
  return (
    <span
      style={{
        fontSize: 11,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '3px 8px',
        background: bg,
        color: text,
        borderRadius: 2,
        whiteSpace: 'nowrap',
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

function SectionDivider({
  label,
  bold = false,
  delay,
}: {
  label: string;
  bold?: boolean;
  delay: number;
}) {
  return (
    <div>
      <div
        style={{
          paddingTop: 54,
          paddingBottom: 13,
          opacity: 0,
          animation: `wkUp 0.40s ease forwards ${delay}s`,
        }}
      >
        <span
          className='text-zinc-700 tracking-widest uppercase'
          style={{ fontSize: 12, fontWeight: 500 }}
        >
          {label}
        </span>
      </div>
      <div
        className='wk-line'
        style={{
          height: 1,
          background: bold ? 'rgba(17,17,17,0.45)' : 'rgba(17,17,17,0.2)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          animation: `wkLine 0.9s cubic-bezier(0.65,0,0.35,1) forwards ${delay + 0.1}s`,
        }}
      />
    </div>
  );
}

function ProjectRowFeature({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <div
      className='wk-feature grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_clamp(160px,22vw,240px)] md:gap-[clamp(1.5rem,3vw,2.5rem)]'
      style={{
        padding: 'clamp(1.4rem,3vh,2.2rem) 0',
        borderBottom: '1px solid rgba(17,17,17,0.12)',
        cursor: 'default',
        opacity: 0,
        animation: `wkUp 0.40s ease forwards ${delay}s`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3
          className='text-zinc-900 tracking-tighter'
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(30px,6vw,60px)',
            fontWeight: 700,
            margin: 0,
            lineHeight: 0.93,
            textTransform: 'uppercase',
            overflowWrap: 'anywhere',
          }}
        >
          {project.title}
        </h3>
        <p
          className='text-zinc-700'
          style={{
            fontFamily: 'Pencil-Regular, sans-serif',
            fontSize: 'clamp(1rem,1.4vw,1.1rem)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: '40ch',
            fontWeight: 400,
          }}
        >
          {project.description}
        </p>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}
        >
          {project.stack?.map((s) => (
            <StackTag key={s} label={s} />
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target='_blank'
            rel='noreferrer'
            className='text-zinc-700 hover:text-zinc-900'
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 4,
              transition: 'color 0.2s',
              width: 'fit-content',
            }}
          >
            Go to project
          </a>
        )}
        {project.url2 && (
          <a
            href={project.url2}
            target='_blank'
            rel='noreferrer'
            className='text-zinc-700 hover:text-zinc-900'
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 1,
              transition: 'color 0.2s',
              width: 'fit-content',
            }}
          >
            Go to documentation
          </a>
        )}
      </div>

      <div
        className='wk-thumb w-full md:self-center'
        style={{
          aspectRatio: '4/3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: WHITE,
        }}
      >
        {project.youtubeId ? (
          <iframe
            title={project.title}
            loading='lazy'
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&playlist=${project.youtubeId}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow='autoplay; encrypted-media'
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading='lazy'
            decoding='async'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            className='wk-ph'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <CircleSVG color={RED} style={{ width: 50, height: 50 }} />
            <span
              style={{
                fontSize: 8,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111',
              }}
            >
              {project.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectRowCompact({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <div
      className='wk-compact grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:gap-6'
      style={{
        padding: '20px 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.14)',
        cursor: 'default',
        opacity: 0,
        animation: `wkUp 0.40s ease forwards ${delay}s`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <h3
          className='wk-ctitle tracking-tighter'
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(22px,2.8vw,30px)',
            fontWeight: 700,
            margin: 0,
            textTransform: 'uppercase',
            overflowWrap: 'anywhere',
          }}
        >
          {project.title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack?.map((s) => (
            <StackTag key={s} label={s} />
          ))}
        </div>
      </div>
      {project.url && (
        <a
          href={project.url}
          target='_blank'
          rel='noreferrer'
          className='text-zinc-700 hover:text-zinc-900'
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}
        >
          Explore
        </a>
      )}
    </div>
  );
}

function ProjectRowExperiment({ project }: { project: Project }) {
  return (
    <div
      className='wk-exp grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4'
      onClick={() => project.url && window.open(project.url, '_blank')}
      style={{
        padding: '12px 0',
        borderBottom: '0.5px solid rgba(17,17,17,0.12)',
        cursor: project.url ? 'pointer' : 'default',
      }}
    >
      <span
        className='text-zinc-900'
        style={{
          fontSize: 15,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          overflowWrap: 'anywhere',
        }}
      >
        {project.title}
      </span>
      <span
        className='text-zinc-600'
        style={{
          fontSize: 11,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
        }}
      >
        View
      </span>
    </div>
  );
}

function ProjectRowExperimentAnimated({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <div
      style={{ opacity: 0, animation: `wkFade 0.40s ease forwards ${delay}s` }}
    >
      <ProjectRowExperiment project={project} />
    </div>
  );
}

function Satellites() {
  const items = useMemo(() => {
    // Menos nodos en móvil: 70 SVG animados pesan en gamas medias
    const count = window.innerWidth < 768 ? 28 : 70;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 160 + 14,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.05 + 0.015,
      delay: (i / count) * 2500,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {items.map((sat) => (
        <div
          key={sat.id}
          style={{
            position: 'absolute',
            left: `${sat.x}vw`,
            top: `${sat.y}vh`,
            width: sat.size,
            height: sat.size,
            transform: 'translate(-50%,-50%)',
            opacity: 0,
            animation: `wkSat 700ms ease-out ${sat.delay}ms forwards`,
            ['--sat-op' as string]: sat.opacity,
          }}
        >
          <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  );
}

function getSlotBox(slot: HTMLElement, bg: HTMLElement) {
  const parent = (bg.offsetParent as HTMLElement) ?? document.body;
  const p = parent.getBoundingClientRect();
  const r = slot.getBoundingClientRect();
  return {
    top: r.top - p.top,
    left: r.left - p.left,
    width: r.width,
    height: r.height,
  };
}

function PositionDirectCircle({
  oSlotRef,
  bgCircleRef,
}: {
  oSlotRef: React.RefObject<HTMLSpanElement | null>;
  bgCircleRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    let cancelled = false;

    const place = () => {
      const slot = oSlotRef.current;
      const bg = bgCircleRef.current;
      if (!slot || !bg) return;
      const b = getSlotBox(slot, bg);
      bg.style.top = `${b.top}px`;
      bg.style.left = `${b.left}px`;
      bg.style.width = `${b.width}px`;
      bg.style.height = `${b.height}px`;
      bg.style.opacity = '1';
    };

    document.fonts.ready.then(() => {
      if (!cancelled) place();
    });
    window.addEventListener('resize', place);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', place);
    };
  }, [oSlotRef, bgCircleRef]);
  return null;
}

function Work() {
  const { circleState, bgCircleRef, pageContentRef } = useCircleTransition();
  const [titleReady, setTitleReady] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);
  const oSlotRef = useRef<HTMLSpanElement>(null);

  const setContentRef = (el: HTMLDivElement | null) => {
    (pageContentRef as React.MutableRefObject<HTMLDivElement | null>).current =
      el;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!titleReady) return;

    const place = () => {
      const slot = oSlotRef.current;
      const bg = bgCircleRef.current;
      if (!slot || !bg) return;
      const b = getSlotBox(slot, bg);
      bg.style.top = `${b.top}px`;
      bg.style.left = `${b.left}px`;
      bg.style.width = `${b.width}px`;
      bg.style.height = `${b.height}px`;
    };

    // Al soltar el overflow puede aparecer la scrollbar y mover el slot: recolocamos
    const t = setTimeout(() => {
      document.body.style.overflow = '';
      requestAnimationFrame(place);
    }, 600);

    window.addEventListener('resize', place);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', place);
    };
  }, [titleReady, bgCircleRef]);

  useEffect(() => {
    if (!circleState?.scaledRect) return;
    let cancelled = false;
    let tl: gsap.core.Timeline | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const slot = oSlotRef.current;
      const bg = bgCircleRef.current;
      if (!slot || !bg) return;

      const box = getSlotBox(slot, bg);

      tl = gsap.timeline({
        onComplete: () => {
          gsap.set(bg, { ...box, clearProps: 'transform' });
          setTitleReady(true);
        },
      });
      tl.to(bg, { ...box, duration: 0.9, ease: 'power4.inOut', delay: 0.2 });
    });

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [circleState, bgCircleRef]);

  useEffect(() => {
    if (circleState?.scaledRect) return;
    const t = setTimeout(() => setTitleReady(true), 300);
    return () => clearTimeout(t);
  }, [circleState]);

  const caseStudies = projects.filter((p) => p.section === 'feature');
  const projectList = projects.filter((p) => p.section === 'project');
  const experiments = projects.filter((p) => p.section === 'experiment');

  let d = CONTENT_START;
  const nd = () => {
    const v = d;
    d += STEP;
    return v;
  };

  return (
    <>
      <style>{`
        @keyframes wkUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes wkFade {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes wkSat {
          from { opacity:0; }
          to   { opacity:var(--sat-op); }
        }
        @keyframes wkSlideL {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes wkSlideR {
          from { opacity:0; transform:translateX(10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes wkLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Estado base de las filas */
        .wk-feature { transition: background 0.2s ease; }
        .wk-feature .wk-thumb { border: 0.5px solid rgba(17,17,17,0.18); transition: border-color 0.25s; }
        .wk-feature .wk-ph { opacity: 0.3; transition: opacity 0.25s; }

        .wk-compact { transition: background 0.15s; }
        .wk-compact .wk-ctitle { color: rgba(17,17,17,0.85); transition: color 0.2s; }

        .wk-exp { opacity: 0.85; transition: opacity 0.2s; }

        /* Hover solo en dispositivos con puntero real: en táctil no se queda pegado */
        @media (hover: hover) {
          .wk-feature:hover { background: rgba(222,10,0,0.025); }
          .wk-feature:hover .wk-thumb { border-color: rgba(222,10,0,0.45); }
          .wk-feature:hover .wk-ph { opacity: 0.6; }

          .wk-compact:hover { background: rgba(222,10,0,0.02); }
          .wk-compact:hover .wk-ctitle { color: #111; }

          .wk-exp:hover { opacity: 1; }
        }

        /* Quien tiene las animaciones desactivadas ve la línea ya dibujada */
        @media (prefers-reduced-motion: reduce) {
          .wk-line { animation: none !important; transform: scaleX(1) !important; }
        }
      `}</style>

      <div
        className='w-full flex flex-col items-center overflow-hidden'
        style={{
          background: WHITE,
          color: '#111',
          position: 'relative',
          minHeight: '100dvh',
        }}
      >
        <Satellites />

        {circleState?.scaledRect && (
          <div
            ref={(el) => {
              (
                bgCircleRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = el;
            }}
            style={{
              position: 'absolute',
              top: circleState.scaledRect.top,
              left: circleState.scaledRect.left,
              width: circleState.scaledRect.width,
              height: circleState.scaledRect.height,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        {!circleState?.scaledRect && (
          <div
            ref={(el) => {
              (
                bgCircleRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = el;
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0,
            }}
          >
            <CircleSVG color={RED} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        <div
          ref={setContentRef}
          className='w-full'
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: '0 auto',
              padding: 'clamp(3.5rem,7vh,5.5rem) clamp(1.5rem,4vw,3rem) 6rem',
            }}
          >
            {/* HERO */}
            <div
              style={{
                paddingBottom: 48,
                borderBottom: '1px solid rgba(17,17,17,0.15)',
              }}
            >
              <div
                className='tracking-tighter'
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: 'clamp(64px,14vw,140px)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  color: '#111',
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: titleReady
                      ? 'wkSlideL 0.42s ease forwards'
                      : 'none',
                  }}
                >
                  W
                </span>

                <span
                  ref={oSlotRef}
                  style={{
                    display: 'inline-block',
                    width: '0.78em',
                    height: '0.72em',
                    position: 'relative',
                    verticalAlign: 'baseline',
                  }}
                />

                <span
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: titleReady
                      ? 'wkSlideR 0.42s ease 0.13s forwards'
                      : 'none',
                  }}
                >
                  RKS
                </span>
              </div>

              <div
                className='flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between'
                style={{
                  opacity: 0,
                  animation: `wkUp 0.55s ease forwards ${CONTENT_START + 0.45}s`,
                }}
              >
                <p
                  className='text-zinc-600 tracking-widest uppercase'
                  style={{ fontSize: 12, margin: 0 }}
                >
                  Design · Engineering · Experiments
                </p>
                <div
                  className='text-zinc-600 text-left md:text-right'
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.10em',
                    lineHeight: 2.3,
                  }}
                >
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(caseStudies.length).padStart(2, '0')}
                  </strong>{' '}
                  Case Studies
                  <br />
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(projectList.length).padStart(2, '0')}
                  </strong>{' '}
                  Projects
                  <br />
                  <strong className='text-zinc-900' style={{ fontWeight: 600 }}>
                    {String(experiments.length).padStart(2, '0')}
                  </strong>{' '}
                  Experiments
                </div>
              </div>
            </div>

            {/* SECCIONES */}
            <SectionDivider label='Case Studies' bold delay={nd()} />
            {caseStudies.map((p) => (
              <ProjectRowFeature key={p.title} project={p} delay={nd()} />
            ))}

            <SectionDivider label='Projects' delay={nd()} />
            {projectList.map((p) => (
              <ProjectRowCompact key={p.title} project={p} delay={nd()} />
            ))}

            <SectionDivider label='Experiments' delay={nd()} />
            {experiments.length === 0 ? (
              <div
                className='text-zinc-600 text-center'
                style={{
                  padding: '2rem 0',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  opacity: 0,
                  animation: `wkFade 0.4s ease forwards ${nd()}s`,
                }}
              >
                coming soon
              </div>
            ) : (
              <>
                {experiments.map((p, i) => {
                  const extra = i >= EXP_PREVIEW;
                  if (extra && !showAllExp) return null;
                  return (
                    <ProjectRowExperimentAnimated
                      key={p.title}
                      project={p}
                      delay={extra ? (i - EXP_PREVIEW) * 0.05 : nd()}
                    />
                  );
                })}

                {experiments.length > EXP_PREVIEW && (
                  <button
                    onClick={() => setShowAllExp((v) => !v)}
                    className='text-zinc-700 hover:text-zinc-900'
                    style={{
                      marginTop: 20,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s',
                      opacity: 0,
                      animation: `wkFade 0.4s ease forwards ${nd()}s`,
                    }}
                  >
                    {showAllExp
                      ? 'Show less'
                      : `Show all (${experiments.length})`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!circleState?.scaledRect && (
        <PositionDirectCircle oSlotRef={oSlotRef} bgCircleRef={bgCircleRef} />
      )}
    </>
  );
}

export default Work;
