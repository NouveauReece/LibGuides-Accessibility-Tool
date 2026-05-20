import type { Rule, AutoFixFunction } from '../types';

export const landmarkBannerIsTopLevel: Rule = {
  title: 'Banner Landmark Is Top Level',
  description: 'Ensure the banner landmark is at top level',
  friendlyDescription: 'The banner landmark (often header with site logo/name) should be at the top level of the page structure, not nested inside other landmarks.',
  impact: 'moderate'
};
