import type { Rule, AutoFixFunction } from '../types';

export const landmarkNoDuplicateBanner: Rule = {
  title: 'Only One Banner Landmark Per Page',
  description: 'Ensure the document has at most one banner landmark',
  friendlyDescription: 'Pages should have only one banner landmark (header). Multiple banners confuse screen reader users about page structure.',
  impact: 'moderate'
};
