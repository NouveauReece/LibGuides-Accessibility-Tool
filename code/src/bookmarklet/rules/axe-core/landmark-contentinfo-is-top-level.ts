import type { Rule, AutoFixFunction } from '../types';

export const landmarkContentinfoIsTopLevel: Rule = {
  title: 'Footer Landmark Is Top Level',
  description: 'Ensure the contentinfo landmark is at top level',
  friendlyDescription: 'The contentinfo landmark (footer with copyright, site links) should be at the top level of the page, not nested inside other landmarks.',
  impact: 'moderate'
};
