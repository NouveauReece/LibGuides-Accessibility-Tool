import type { Rule, AutoFixFunction } from '../types';

export const tableDuplicateName: Rule = {
  title: 'Table Caption Doesn\'t Duplicate Summary',
  description: 'Ensure the <caption> element does not contain the same text as the summary attribute',
  friendlyDescription: 'Table captions and summary attributes serve the same purpose. Don\'t repeat the same text in both—screen readers would announce it twice.',
  impact: 'minor'
};
