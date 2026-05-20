import type { Rule, AutoFixFunction } from '../types';

export const dlitem: Rule = {
  title: 'Definition Terms and Descriptions Are Nested Correctly',
  description: 'Ensure <dt> and <dd> elements are contained by a <dl>',
  friendlyDescription: 'Definition terms and descriptions must be properly nested inside definition lists. Orphaned terms or descriptions outside a <dl> break the document structure.',
  howToFix: 'Move <dt> and <dd> elements to be direct children of a <dl> element.',
  impact: 'serious'
};
