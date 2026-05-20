import type { Rule, AutoFixFunction } from '../types';

export const scopeAttrValid: Rule = {
  title: 'Incorrect Use of Scope Attribute in Tables',
  description: 'The scope attribute is used on data cells (<td>) instead of header cells (<th>)',
  friendlyDescription: 'The scope attribute is only for table header cells (<th>) to describe whether they label columns or rows. Using it on data cells (<td>) confuses screen readers about table structure.',
  howToFix: 'Convert header cells to <th> and apply scope correctly.',
  impact: 'serious'
};
