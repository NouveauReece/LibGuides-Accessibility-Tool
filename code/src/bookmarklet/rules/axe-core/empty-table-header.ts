import type { Rule, AutoFixFunction } from '../types';

export const emptyTableHeader: Rule = {
  title: 'Table Headers Have Text',
  description: 'Ensure table headers have discernible text',
  friendlyDescription: 'Table header cells (<th>) must contain visible text. Empty headers provide no context about what each column or row represents.',
  impact: 'minor'
};
