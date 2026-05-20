import type { Rule, AutoFixFunction } from '../types';

export const frameTitleUnique: Rule = {
  title: 'Embedded Content Has Unique Labels',
  description: 'Ensure <iframe> and <frame> elements contain a unique title attribute',
  friendlyDescription: 'Each embedded frame (iframe) needs a unique, descriptive title attribute. Screen readers announce these titles so users understand what each frame contains.',
  howToFix: 'Add a unique title attribute to each frame describing its content.',
  impact: 'serious'
};
