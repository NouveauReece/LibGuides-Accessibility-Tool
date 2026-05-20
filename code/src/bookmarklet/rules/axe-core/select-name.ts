import type { Rule, AutoFixFunction } from '../types';

export const selectName: Rule = {
  title: 'Select Elements Have Names',
  description: 'Ensure select element has an accessible name',
  friendlyDescription: 'Dropdown select elements need associated labels so users know what choices they\'re selecting from.',
  howToFix: 'Add a <label> element associated with <select> using for attribute.',
  impact: 'critical'
};
