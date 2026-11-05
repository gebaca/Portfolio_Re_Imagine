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
  url2?: string;
  stack?: string[];
  image?: string;
  youtubeId?: string;
  section?: 'feature' | 'project' | 'experiment';
}

export const projects: Project[] = [
  // ─── Case Studies ──────────────────────────────────────────────────────────
  {
    id: 1,
    section: 'feature',
    title: 'Animation as Functional Substitute for Text',
    description:
      'A study on change blindness: how animated transitions can replace written explanations in B2B dashboards.',
    color: '#5EACED',
    size: 210,
    expandScale: 1.7,
    offsetX: 350,
    image: '/projects/anim.png',
    url: 'https://animation-as-comunication.vercel.app/',
    url2: 'https://app.notion.com/p/component-animation-trilogy-3778d03cc89680dea806d56069e2376b?source=copy_link',
    extraCount: 0,
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Figma'],
  },
  {
    id: 2,
    section: 'feature',
    title: 'Wealth Watcher',
    description:
      'A B2B wealth management dashboard, from case study to working prototype.',
    color: '#06063F',
    size: 210,
    expandScale: 1.7,
    offsetX: 350,
    image: '/projects/WAVES.webp',
    url: 'https://horizon-wealth-dashboard.vercel.app/',
    url2: 'https://app.notion.com/p/Case-Study-B2B-Wealth-Management-Dashboard-b83dc31e4e2144bd9469a83947d1c2d9?source=copy_link',
    extraCount: 0,
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  },
  {
    id: 3,
    section: 'feature',
    title: 'Football B2B',
    description:
      'A case study on B2B software for football academies: research, product thinking and design.',
    color: '#ff6200',
    size: 210,
    expandScale: 1.7,
    offsetX: 350,
    image: '/projects/football.png',
    url2: 'https://app.notion.com/p/SaaS-Football-Academy-3608d03cc89680f3a004ebd86ba23143',
    extraCount: 0,
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Figma'],
  },

  // ─── Projects ──────────────────────────────────────────────────────────────
  {
    id: 4,
    section: 'project',
    title: 'ING Redesign',
    description:
      'An unsolicited redesign of ing.es, built to catch their attention. Scroll animations and a lion that draws itself as you scroll.',
    color: '#ff6200',
    size: 210,
    expandScale: 1.7,
    offsetX: 350,
    image: '/projects/ING.png',
    url: 'https://ing-landing-gerard.vercel.app/',
    extraCount: 0,
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  },
  {
    id: 5,
    section: 'project',
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
    id: 6,
    section: 'project',
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
    id: 7,
    section: 'project',
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

  // ─── Experiments ───────────────────────────────────────────────────────────
  {
    id: 8,
    section: 'experiment',
    title: 'Parallax Depth',
    description: 'Depth and color shifts driven by pointer movement.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/01-depth-color',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 9,
    section: 'experiment',
    title: 'Panel Selector',
    description: 'A selectable panel with animated state changes.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/02-panel-selector',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 10,
    section: 'experiment',
    title: 'SVG Draw',
    description: 'Paths that draw themselves.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/03-svg-draw',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 11,
    section: 'experiment',
    title: 'Brush Trail',
    description: 'A brush-like trail that follows the cursor.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/04-brush-trail',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 12,
    section: 'experiment',
    title: 'Player Badge',
    description: 'An animated player status badge.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/05-player-status',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 13,
    section: 'experiment',
    title: 'Timing Panel',
    description: 'Animation timing explored through a control panel.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/06-timing-panel',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 14,
    section: 'experiment',
    title: 'Double Stroke',
    description: 'A card with a double stroke effect.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/07-double-stroke',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 15,
    section: 'experiment',
    title: 'Scroll Parallax',
    description: 'Layers moving at different speeds on scroll.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/08-scroll-parallax',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 16,
    section: 'experiment',
    title: 'Expressive Table',
    description: 'A data table with expressive motion.',
    color: '#ff6200',
    url: 'https://experiments-tan.vercel.app/experiment/10-expressive-table',
    stack: ['React', 'GSAP', 'TypeScript'],
  },
  {
    id: 17,
    section: 'experiment',
    title: 'Ray Marching Videogame',
    description: 'An experimental voxel-based rendering project.',
    color: '#ff6200',
    url: 'https://gebaca.itch.io/ciclico',
    stack: ['Unity', 'C#'],
  },
];
