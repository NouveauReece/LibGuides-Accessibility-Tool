import type { Rule, AutoFixFunction } from '../types';

export const landmarkMainIsTopLevel: Rule = {
  title: 'Main Content Landmark Is Top Level',
  description: 'Ensure the main landmark is at top level',
  friendlyDescription: 'The main content landmark should be at the top level of the page, not nested inside other landmarks. This helps users navigate to main content.',
  impact: 'moderate'
};
