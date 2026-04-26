// src/components/Projects/constellations.ts
import { SKETCH_ICONS } from '../Icons/SketchIcons';

export const CONSTELLATIONS = {
  'case-studies': [
    { type: 'sketch', x: 58, y: 12, width: 160, node: SKETCH_ICONS.ingGrid },
    { type: 'sketch', x: 72, y: 55, width: 120, node: SKETCH_ICONS.ingArrows },
    {
      type: 'sketch',
      x: 45,
      y: 68,
      width: 140,
      node: SKETCH_ICONS.wealthSketch,
    },
    {
      type: 'sketch',
      x: 80,
      y: 25,
      width: 100,
      node: SKETCH_ICONS.wealthChart,
    },
  ],

  projects: [
    { type: 'blob', x: 58, y: 12, size: 100, color: '#111', opacity: 0.07 },
    { type: 'logo', x: 78, y: 60, size: 54, label: 'React' },
    { type: 'scribble', x: 68, y: 30, variant: 1, color: '#E8432D' },
  ],
  experiments: [
    { type: 'blob', x: 60, y: 18, size: 90, color: '#E8432D', opacity: 0.09 },
    { type: 'blob', x: 85, y: 10, size: 44, color: '#111', opacity: 0.06 },
    { type: 'logo', x: 76, y: 58, size: 52, label: 'Unity' },
    { type: 'scribble', x: 50, y: 72, variant: 2, color: '#111' },
  ],
};
