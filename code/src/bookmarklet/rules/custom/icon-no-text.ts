import type { Rule, AutoFixFunction } from '../types';

export const iconNoText: Rule = {
  title: 'Icon-Only Elements Without Labels',
  description: 'Icons used alone (without accompanying text) without accessible labels or text',
  friendlyDescription: 'Icon-only buttons or links leave screen reader users guessing what they do. Either add visible text next to the icon or provide an accessible label (aria-label or aria-labelledby).',
  howToFix: 'Add visible or ARIA labels to describe what each icon does.',
  impact: 'serious'
};
