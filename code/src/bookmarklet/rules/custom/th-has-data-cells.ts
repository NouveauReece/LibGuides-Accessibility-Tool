import type { Rule, AutoFixFunction } from '../types';

export const thHasDataCells: Rule = {
  title: 'Table Headers Not Marked as Headers',
  description: 'Table headers are incorrectly marked as data cells (<td>) instead of header cells (<th>)',
  friendlyDescription: 'Screen readers need to know which cells are table headers. Using <td> for headers breaks how screen readers announce table data. Convert header cells to <th> elements.',
  howToFix: 'Convert header cells to proper <th> elements with appropriate scope attributes.',
  impact: 'serious'
};
