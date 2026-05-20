import type { Rule, AutoFixFunction } from '../types';

export const svgImgAlt: Rule = {
  title: 'SVG Images Have Alt Text',
  description: 'Ensure <svg> elements with an img, graphics-document or graphics-symbol role have accessible text',
  friendlyDescription: 'SVG images used as graphics need descriptive text or aria-label so screen readers can explain what the image shows.',
  howToFix: 'Add aria-label, aria-labelledby, or <title> element inside SVG.',
  impact: 'serious'
};
