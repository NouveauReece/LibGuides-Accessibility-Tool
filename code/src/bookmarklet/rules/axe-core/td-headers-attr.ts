import type { Rule, AutoFixFunction } from '../types';

export const tdHeadersAttr: Rule = {
  title: 'Table Cells Link to Valid Headers',
  description: 'Ensure that each cell in a table that uses the headers attribute refers only to other <th> elements in that table',
  friendlyDescription: 'When table cells use the headers attribute, it must reference only valid header cells (<th>). Invalid references break how screen readers announce table data.',
  howToFix: 'Update headers attribute to reference only valid <th> element IDs in the same table.',
  impact: 'serious'
};
