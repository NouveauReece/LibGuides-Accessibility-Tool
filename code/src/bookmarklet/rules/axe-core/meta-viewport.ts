import type { Rule, AutoFixFunction } from '../types';

export const metaViewport: Rule = {
  title: 'Viewport Can Be Zoomed',
  description: 'Ensure <meta name="viewport"> does not disable text scaling and zooming',
  friendlyDescription: 'Users with low vision rely on zooming to read content. Don\'t disable zoom with user-scalable=no. Always allow users to zoom in or out.',
  howToFix: 'Remove user-scalable=no and maximum-scale restrictions from viewport meta tag.',
  impact: 'moderate'
};
