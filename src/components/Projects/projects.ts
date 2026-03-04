export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  url?: string;
  stack?: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Proyecto A',
    description: 'Descripción del proyecto...',
    color: '#880808',
    stack: ['React', 'GSAP'],
  },
  {
    id: 2,
    title: 'Proyecto B',
    description: 'Descripción del proyecto...',
    color: '#AA4A44',
    stack: ['TypeScript', 'Node.js'],
  },
  {
    id: 3,
    title: 'Proyecto B',
    description: 'Descripción del proyecto...',
    color: '#EE4B2B',
    stack: ['TypeScript', 'Node.js'],
  },
  {
    id: 4,
    title: 'Proyecto B',
    description: 'Descripción del proyecto...',
    color: '#A52A2A',
    stack: ['TypeScript', 'Node.js'],
  },
  {
    id: 5,
    title: 'Proyecto B',
    description: 'Descripción del proyecto...',
    color: '#800020',
    stack: ['TypeScript', 'Node.js'],
  },
];
