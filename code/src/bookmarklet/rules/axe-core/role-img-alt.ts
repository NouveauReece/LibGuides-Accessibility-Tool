import type { Rule, AutoFixFunction } from '../types';

export const roleImgAlt: Rule = {
  title: 'role="img" Elements Have Alt Text',
  description: 'Ensure [role="img"] elements have alternative text',
  friendlyDescription: 'When you use role="img" to make an element act like an image, provide alt text using aria-label or aria-labelledby.',
  howToFix: 'Add aria-label or aria-labelledby to describe the image content.',
  impact: 'serious'
};
