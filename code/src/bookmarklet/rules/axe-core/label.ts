import type { Rule, AutoFixFunction } from '../types';

export const label: Rule = {
  title: 'Form Fields Have Labels',
  description: 'Ensure every form element has a label',
  friendlyDescription: 'Every form input needs a visible label so users know what information to enter. Labels also help screen readers announce form fields correctly.',
  howToFix: 'Add a <label> element associated with the form field using the for attribute.',
  impact: 'critical'
};
