import type { Rule, AutoFixFunction } from '../types';

export const duplicateId: Rule = {
  title: 'Duplicate ID Attributes',
  description: 'Multiple elements share the same ID attribute, often from copy-pasted content',
  friendlyDescription: 'Each element\'s ID should be unique. Duplicate IDs break how labels connect to form fields and how ARIA labels connect to elements. This usually happens when copying and pasting content.',
  howToFix: 'Paste into a plain text editor first, then reapply formatting. Or manually change duplicate IDs to unique values.',
  impact: 'critical'
};
