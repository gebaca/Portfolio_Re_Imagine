// src/tokens/theme.ts
export const tokens = {
  colors: {
    tulletYellow: '#FDDA0D',
    tulletRed: '#E8432D',
    tulletBlue: '#00C4FF',
    canvas: '#FAF9F6',
    ink: '#1A1916',
  },
} as const;

export const routeCircleMap = {
  '/about': tokens.colors.tulletYellow,
  '/works': tokens.colors.tulletRed,
  '/contacts': tokens.colors.tulletBlue, // Asegúrate que sea 'contacts' con 's'
} satisfies Record<string, string>;

export const motion = {
  expandDuration: 0.7,
  collapseDuration: 0.5,
  fadeInDelay: 0.4,
} as const;
