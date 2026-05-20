import type { Rule, AutoFixFunction } from '../types';

export const ariaDialogName: Rule = {
  title: 'ARIA Dialogs Have Names',
  description: 'Ensure every ARIA dialog and alertdialog node has an accessible name',
  friendlyDescription: 'ARIA dialogs (modal pop-ups) need accessible names describing their purpose, so screen readers announce them clearly when they appear.',
  impact: 'serious'
};
