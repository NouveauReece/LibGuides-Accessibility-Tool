import type { Rule, AutoFixFunction } from '../types';

export const duplicateIdAria: Rule = {
  title: 'Unique IDs Used in ARIA and Labels',
  description: 'Ensure every id attribute value used in ARIA and in labels is unique',
  friendlyDescription: 'IDs are used to connect labels to form fields and ARIA labels to elements. If two elements share the same ID, these connections break and assistive technology gets confused.',
  howToFix: 'Change duplicate IDs to unique values, especially for elements referenced by labels or ARIA.',
  impact: 'critical'
};
