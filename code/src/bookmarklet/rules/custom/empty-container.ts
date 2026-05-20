import type { Rule, AutoFixFunction } from '../types';

export const emptyContainer: Rule = {
  title: 'Empty Section or Container',
  description: 'Empty sections, containers, or LibGuides boxes with no content',
  friendlyDescription: 'Empty containers with no text, images, or interactive elements serve no purpose and may confuse users. Delete the section or add content to it.',
  howToFix: 'Add content or remove the empty section.',
  impact: 'moderate'
};
