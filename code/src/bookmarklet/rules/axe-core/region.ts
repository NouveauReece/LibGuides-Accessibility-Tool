import type { Rule, AutoFixFunction } from '../types';

export const region: Rule = {
  title: 'All Content Is in Landmarks',
  description: 'Ensure all page content is contained by landmarks',
  friendlyDescription: 'All content should be inside semantic landmarks (header, nav, main, footer) so users can navigate by landmark and find important content.',
  impact: 'moderate'
};
