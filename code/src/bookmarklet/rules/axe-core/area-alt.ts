import type { Rule, AutoFixFunction } from '../types';

export const areaAlt: Rule = {
  title: 'Image Map Areas Have Alt Text',
  description: 'Ensure <area> elements of image maps have alternative text',
  friendlyDescription: 'When you use image maps (clickable areas on an image), each clickable region must have descriptive text. This tells screen readers what each area does.',
  howToFix: 'Add alt or title attribute to each <area> element describing its purpose.',
  impact: 'critical'
};
