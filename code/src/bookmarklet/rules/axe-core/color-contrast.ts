import type { Rule, AutoFixFunction } from '../types';

export const colorContrast: Rule = {
  title: 'Text Has Sufficient Color Contrast',
  description: 'Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds',
  friendlyDescription: 'Text that doesn\'t contrast enough with its background is hard to read for everyone, especially people with low vision. Use dark text on light backgrounds (or vice versa).',
  howToFix: 'Change text or background color to meet minimum 4.5:1 contrast ratio for body text.',
  impact: 'serious'
};
