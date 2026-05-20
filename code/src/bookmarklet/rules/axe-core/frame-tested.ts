import type { Rule, AutoFixFunction } from '../types';

export const frameTested: Rule = {
  title: 'Frames Contain Accessibility Testing',
  description: 'Ensure <iframe> and <frame> elements contain the axe-core script',
  friendlyDescription: 'For accessibility testing to work properly in embedded frames, the axe-core script must be loaded inside each frame.',
  impact: 'critical'
};
