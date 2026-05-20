import type { Rule, AutoFixFunction } from '../types';

export const metaViewportLarge: Rule = {
  title: 'Viewport Allows Significant Zoom',
  description: 'Ensure <meta name="viewport"> can scale a significant amount',
  friendlyDescription: 'Users should be able to zoom in significantly on your page. Don\'t use maximum-scale that prevents zooming beyond a small level.',
  impact: 'minor'
};
