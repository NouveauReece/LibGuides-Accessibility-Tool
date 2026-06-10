import type { Rule, AutoFixFunction } from '../types';

export const labelContentNameMismatch: Rule = {
  title: "Accessible Label, Visible Text Mismatch",
  description: 'Ensure the accessible name (e.g. aria-label) contains the text of the visible element text in the same order in which it appears.',
  friendlyDescription: 'Ensure the accessible name (e.g. aria-label) contains the text of the visible element text in the same order in which it appears.',
  howToFix: 'Change accessible labels (e.g. aria-label) to include the visible text or, for <a> or <button> elements, remove the aria and write more descriptive visible text',
  impact: 'serious'
};