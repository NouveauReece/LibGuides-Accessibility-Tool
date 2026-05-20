import type { Rule, AutoFixFunction } from '../types';

export const landmarkOneMain: Rule = {
  title: 'Page Has a Main Content Landmark',
  description: 'Ensure the document has a main landmark',
  friendlyDescription: 'Every page should have one main landmark (role="main" or <main> tag) so users can quickly jump to the primary content.',
  impact: 'moderate'
};
