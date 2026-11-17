export type Level = 'core' | 'basic';

export interface Skill {
  name: string;
  /** 'core' = círculo con logo. 'basic' = punto + nombre, dentro del desplegable */
  level: Level;
  /** Nombre del archivo sin extensión, solo si no sigue la regla automática */
  icon?: string;
}

export interface SkillGroup {
  title: string;
  /** Color del círculo de esta categoría */
  color: string;
  skills: Skill[];
}

/*
  Regla de nombres: /skills/<nombre en minúsculas, sin espacios ni puntos>.svg
  JavaScript   -> /skills/javascript.svg
  Tailwind CSS -> /skills/tailwindcss.svg
  Excepciones con "icon": C# (el # rompe la URL) y TanStack Query.
*/
export const skillIconSrc = (s: Skill) =>
  `/skills/${s.icon ?? s.name.toLowerCase().replace(/[\s.]+/g, '')}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    title: 'Design',
    color: '#00C4FF',
    skills: [
      { name: 'Figma', level: 'core' },
      { name: 'Photoshop', level: 'core' },
      { name: 'Illustrator', level: 'basic' },
      { name: 'Affinity', level: 'basic' },
    ],
  },
  {
    title: 'Programming Languages',
    color: '#FDDA0D',
    skills: [
      { name: 'JavaScript', level: 'core' },
      { name: 'TypeScript', level: 'core' },
      { name: 'HTML', level: 'core' },
      { name: 'CSS', level: 'core' },
      { name: 'Python', level: 'core' },
      { name: 'C#', level: 'core', icon: 'csharp' },
      { name: 'Sass', level: 'basic' },
      { name: 'C', level: 'basic' },
    ],
  },
  {
    title: 'Libraries & Frameworks',
    color: '#DE0A00',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'TanStack Query', level: 'core', icon: 'tanstack' },
      { name: 'GSAP', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'FastAPI', level: 'basic' },
      { name: 'Framer Motion', level: 'basic' },
      { name: 'Node.js', level: 'basic' },
      { name: 'Next.js', level: 'basic' },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#FFC000',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'GitHub', level: 'core' },
      { name: 'Bitbucket', level: 'core' },
      { name: 'Docker', level: 'basic' },
      { name: 'WordPress', level: 'basic' },
    ],
  },
];

export const coreCompetencies = [
  'Interactive Interface Development',
  'UI/UX Design and Usability',
  'Design Systems',
  'Motion & Interaction Design',
];
