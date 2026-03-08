import type { ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  size?: number;
  expandScale?: number;
  offsetX?: number;
  primaryContent?: ReactNode;
  summaryContent?: ReactNode;
  mediaContent?: ReactNode;
  extraCount?: number;
  url?: string;
  stack?: string[];
  image?: string;
}

const VideoCircle = ({
  src,
  link,
  linkColor = '#111',
}: {
  src: string;
  link: string;
  linkColor?: string;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '85%',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '8%',
      }}
    >
      <iframe
        src={src}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '177%',
          height: '100%',
          border: 'none',
        }}
        allow='autoplay; encrypted-media'
      />
    </div>
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      style={{
        fontSize: '0.6rem',
        fontWeight: 100,
        color: linkColor,
        marginTop: 8,
        fontFamily: 'Pencil-Regular',
      }}
    >
      Go To →
    </a>
  </div>
);

const ImageMedia = ({
  src,
  alt,
  link,
  linkColor = '#111',
}: {
  src: string;
  alt: string;
  link: string;
  linkColor?: string;
}) => (
  <div
    style={{
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      width: '100%',
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
    />
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      style={{
        fontSize: '0.55rem',
        fontWeight: 100,
        color: linkColor,
        fontFamily: 'Pencil-Regular',
      }}
    >
      Go To →
    </a>
  </div>
);

export const projects: Project[] = [
  {
    id: 1,
    title: 'NEVER LATE',
    description: 'Serious game desarrollado en equipo.',
    color: '#FAA0A0',
    size: 220,
    expandScale: 1.8,
    offsetX: 300,

    primaryContent: (
      <img
        src='/projects/neverLate.svg'
        alt='Never Late'
        style={{ width: '70%', objectFit: 'contain' }}
      />
    ),

    summaryContent: (
      <span
        style={{
          fontWeight: 300,
          fontSize: '0.6rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        A serious game built with a team of 10. I programmed the character
        controller, implemented visual effects, and designed several minigames.
      </span>
    ),

    mediaContent: (
      <VideoCircle
        src='https://www.youtube.com/embed/WEezmGnj32s?autoplay=1&mute=1&loop=1&controls=0&playlist=WEezmGnj32s'
        link='https://potasiogames.itch.io/never-late'
        linkColor='#111'
      />
    ),

    extraCount: 3,
    stack: ['Unity', 'C#'],
  },
  {
    id: 2,
    title: 'AVENTURA POR VALENCIA',
    description: 'Proyecto de desarrollo web.',
    color: '#FAA0A0',
    size: 180,
    expandScale: 1.5,
    offsetX: -500,

    primaryContent: (
      <img
        src='/projects/aventura.svg'
        alt='Aventura por Valencia'
        style={{ width: '40%', objectFit: 'contain' }}
      />
    ),

    summaryContent: (
      <span
        style={{
          fontWeight: 300,
          fontSize: '0.6rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        An educational game built with two teammates. I handled the minigame
        programming and took full ownership of the UX and UI design.
      </span>
    ),

    mediaContent: (
      <ImageMedia
        src='/projects/AventuraPorVLC.png'
        alt='Aventura por Valencia'
        link='https://ficiv.org/minijuego/'
      />
    ),

    extraCount: 4,
    stack: ['TypeScript', 'Next.js', 'Node.js'],
  },
  {
    id: 3,
    title: 'Portfolio Personal 1.0',
    description: 'Aplicación interactiva.',
    color: '#FAA0A0',
    size: 200,
    expandScale: 1.6,
    offsetX: 400,

    primaryContent: (
      <img
        src='/projects/portfolio.svg'
        alt='Portfolio Personal'
        style={{ width: '70%', objectFit: 'contain' }}
      />
    ),

    summaryContent: (
      <span
        style={{
          fontWeight: 300,
          fontSize: '0.6rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        My first web portfolio — built from scratch with React and TypeScript to
        showcase my early projects and establish my online presence.
      </span>
    ),

    mediaContent: (
      <ImageMedia
        src='/projects/portfolio.png'
        alt='Portfolio Personal'
        link='https://portfolioger-ab161.firebaseapp.com/'
      />
    ),

    extraCount: 3,
    stack: ['React', 'TypeScript', 'Firebase'],
  },
  {
    id: 4,
    title: 'Hyrulepedia',
    description: 'Aplicación interactiva.',
    color: '#FAA0A0',
    size: 200,
    expandScale: 1.6,
    offsetX: -400,

    primaryContent: (
      <img
        src='/projects/hyrulePedia.svg'
        alt='Hyrulepedia'
        style={{ width: '70%', objectFit: 'contain' }}
      />
    ),

    summaryContent: (
      <span
        style={{
          fontWeight: 300,
          fontSize: '0.6rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        An interactive digital card collector built by a team of four. I led the
        database integration, user profiles, visual effects, and contributed to
        the overall concept and design.
      </span>
    ),

    mediaContent: (
      <ImageMedia
        src='/projects/hyru.png'
        alt='Hyrulepedia'
        link='https://hyrulepedia.web.app/login'
      />
    ),

    extraCount: 3,
    stack: ['React', 'GSAP', 'TypeScript', 'Firebase'],
  },
];
