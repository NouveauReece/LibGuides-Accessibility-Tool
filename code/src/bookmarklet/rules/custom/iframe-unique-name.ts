import type { Rule, AutoFixFunction } from '../types';

export const iframeUniqueName: Rule = {
  title: 'Multiple Embedded Videos/Iframes Share Same Name',
  description: 'Multiple iframes use the same name attribute value',
  friendlyDescription: 'Each embedded frame should have a unique name. Duplicate names can confuse screen readers and make it harder to identify which frame is which.',
  howToFix: 'Ensure each iframe has a unique name attribute or remove the attribute.',
  impact: 'moderate'
};
