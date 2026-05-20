import type { Rule, AutoFixFunction } from '../types';

export const labelTitleOnly: Rule = {
  title: 'Form Fields Have Visible Labels',
  description: 'Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
  friendlyDescription: 'Form fields need visible labels, not hidden ones or just title attributes. Visible labels help all users understand what to enter and improve usability.',
  impact: 'serious'
};
