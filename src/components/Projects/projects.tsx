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
  youtubeId?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'NEVER LATE',
    description:
      'A serious game built with a team of 10. I programmed the character controller, implemented visual effects, and designed several minigames.',
    color: '#ffffff',
    size: 220,
    expandScale: 1.8,
    offsetX: 300,
    image: '/projects/neverLate.png',
    youtubeId: 'WEezmGnj32s',
    url: 'https://potasiogames.itch.io/never-late',
    extraCount: 3,
    stack: ['Unity', 'C#', '3D MAX'],
  },
  {
    id: 2,
    title: 'AVENTURA POR VALENCIA',
    description:
      'An educational game built with two teammates. I handled the minigame programming and took full ownership of the UX and UI design.',
    color: '#ffffff',
    size: 180,
    expandScale: 1.5,
    offsetX: -500,
    image: '/projects/AventuraPorVLC.png',
    url: 'https://ficiv.org/minijuego/',
    extraCount: 4,
    stack: ['C#', 'Unity', 'JavaScript'],
  },
  {
    id: 3,
    title: 'Portfolio Personal 1.0',
    description:
      'My first web portfolio — built from scratch with React and TypeScript to showcase my early projects and establish my online presence.',
    color: '#ffffff',
    size: 200,
    expandScale: 1.6,
    offsetX: 400,
    image: '/projects/portfolio.png',
    url: 'https://portfolioger-ab161.firebaseapp.com/',
    extraCount: 3,
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
  },
  {
    id: 4,
    title: 'Hyrulepedia',
    description:
      'An interactive digital card collector built by a team of four. I led the database integration, user profiles, visual effects, and contributed to the overall concept and design.',
    color: '#ffffff',
    size: 200,
    expandScale: 1.6,
    offsetX: -400,
    image: '/projects/hyru.png',
    url: 'https://hyrulepedia.web.app/login',
    extraCount: 3,
    stack: ['React', 'GSAP', 'TypeScript', 'Firebase', 'Tailwind CSS'],
  },
  {
    id: 5,
    title: 'ING — Redesign',
    description:
      'An unsolicited redesign of ing.es — built to catch their attention. Scroll animations and a lion that draws itself as you scroll.',
    color: '#ff6200',
    size: 210,
    expandScale: 1.7,
    offsetX: 350,
    image: '/projects/ING.png',
    url: 'https://ing-landing-gerard.vercel.app/',
    extraCount: 0,
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  },
];
