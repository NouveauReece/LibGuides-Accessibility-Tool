import type { Rule, AutoFixFunction } from '../types';

export const frameFocusableContent: Rule = {
  title: 'Focusable Content in Frames Is Accessible',
  description: 'Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1',
  friendlyDescription: 'Frames containing focusable content shouldn\'t have tabindex=-1, which would prevent keyboard users from accessing that content.',
  howToFix: 'Remove tabindex="-1" from frame elements containing interactive content.',
  impact: 'serious'
};
