export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  summary?: string; // texto breve sobre el círculo secundario
  extraCount?: number; // SVGs extra en el grid de info
  url?: string;
  stack?: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Proyecto A',
    description: 'Descripción del proyecto...',
    color: '#FDDA0D',
    summary: 'App de gestión React + GSAP',
    extraCount: 3,
    stack: ['React', 'GSAP'],
  },
  {
    id: 2,
    title: 'Proyecto B',
    description: 'Descripción del proyecto...',
    color: '#DE0A00',
    summary: 'E-commerce con Next.js',
    extraCount: 4,
    stack: ['TypeScript', 'Node.js'],
  },
];
