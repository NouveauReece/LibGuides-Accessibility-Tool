import type { Rule, AutoFixFunction } from '../types';

export const landmarkNoDuplicateMain: Rule = {
  title: 'Only One Main Content Landmark Per Page',
  description: 'Ensure the document has at most one main landmark',
  friendlyDescription: 'Pages should have only one main content landmark. Multiple main sections confuse screen reader users about where the primary content is.',
  impact: 'moderate'
};
