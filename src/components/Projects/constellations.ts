// src/components/Projects/constellations.ts
import type { ConstellationElement } from './WorkConstellation.tsx';
import { SKETCH_ICONS } from '../Icons/SketchIcons';

export const CONSTELLATIONS: Record<string, ConstellationElement[]> = {
  'case-studies': [
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 500,
      height: 520,
      node: SKETCH_ICONS.wealthSketch,
    },
    {
      type: 'sketch',
      x: 35,
      y: 30,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingArrows,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
  ],

  projects: [
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
  ],
  experiments: [
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
    {
      type: 'sketch',
      x: 58,
      y: 12,
      width: 160,
      height: 120,
      node: SKETCH_ICONS.ingGrid,
    },
  ],
};
