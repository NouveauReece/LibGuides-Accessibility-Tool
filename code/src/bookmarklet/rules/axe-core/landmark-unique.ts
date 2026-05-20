import type { Rule, AutoFixFunction } from '../types';

export const landmarkUnique: Rule = {
  title: 'Landmarks Have Unique Names',
  description: 'Ensure landmarks are unique',
  friendlyDescription: 'If you have multiple landmarks of the same type, give each one a unique accessible name. This helps screen reader users distinguish between them.',
  impact: 'moderate'
};
