import type { Rule, AutoFixFunction } from '../types';

export const inputImageAlt: Rule = {
  title: 'Image Input Buttons Have Alt Text',
  description: 'Ensure <input type="image"> elements have alternative text',
  friendlyDescription: 'Image buttons (<input type="image">) must have alt text or a title attribute describing what they do, just like regular images.',
  howToFix: 'Add alt attribute or title attribute describing button action.',
  impact: 'critical'
};
