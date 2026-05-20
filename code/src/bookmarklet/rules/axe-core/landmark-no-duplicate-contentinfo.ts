import type { Rule, AutoFixFunction } from '../types';

export const landmarkNoDuplicateContentinfo: Rule = {
  title: 'Only One Footer Landmark Per Page',
  description: 'Ensure the document has at most one contentinfo landmark',
  friendlyDescription: 'Pages should have only one footer/contentinfo landmark. Multiple footers confuse screen reader users about page structure.',
  impact: 'moderate'
};
