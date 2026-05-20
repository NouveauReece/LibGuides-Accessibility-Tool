import type { Rule, AutoFixFunction } from '../types';

export const formFieldMultipleLabels: Rule = {
  title: 'Form Fields Don\'t Have Multiple Labels',
  description: 'Ensure form field does not have multiple label elements',
  friendlyDescription: 'A form field should only have one label. Multiple labels confuse screen readers about what information the field needs.',
  howToFix: 'Keep only one label per form field and remove duplicates.',
  impact: 'moderate'
};
