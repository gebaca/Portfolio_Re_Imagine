import React from 'react';

type IconMap = Record<string, React.ReactNode>;

export const ICONS: IconMap = {
  // --- ARTE  ---
  ART: <img src='/skills/art/ArtCircle.svg' alt='art' />,

  autodesk: <img src='/skills/art/autodesk.svg' alt='art' />,
  creative_cloud: <img src='/skills/art/creative_cloud.svg' alt='art' />,
  figma: <img src='/skills/art/figma.svg' alt='art' />,
  unity: <img src='/skills/art/unity.svg' alt='art' />,

  // --- CODE  ---
  ProgrammingCircle: <img src='/skills/code/ProgrammingCircle.svg' alt='art' />,

  csharp: <img src='/skills/code/Csharp.svg' alt='art' />,
  gsap: <img src='/skills/code/gsap.svg' alt='art' />,
  js: <img src='/skills/code/js.svg' alt='art' />,
  py: <img src='/skills/code/py.svg' alt='art' />,
  react: <img src='/skills/code/REACT.svg' alt='art' />,
  ts: <img src='/skills/code/ts.svg' alt='art' />,

  // --- WORK  ---
  workCircle: <img src='/skills/work/workCircle.svg' alt='art' />,

  bitbucket: <img src='/skills/work/bitbucket.svg' alt='art' />,
  git: <img src='/skills/work/git.svg' alt='art' />,
  jira: <img src='/skills/work/jira.svg' alt='art' />,
  trello: <img src='/skills/work/trello.svg' alt='art' />,
};
