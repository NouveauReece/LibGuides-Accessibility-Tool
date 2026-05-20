import type { Rule, AutoFixFunction } from '../types';

export const imageRedundantAlt: Rule = {
  title: 'Image Alt Text Isn\'t Redundant',
  description: 'Ensure image alternative is not repeated as text',
  friendlyDescription: 'Don\'t repeat alt text as visible text next to the image. Screen reader users would hear the same text twice, which is redundant.',
  impact: 'minor'
};
