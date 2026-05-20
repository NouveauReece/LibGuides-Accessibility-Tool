import type { Rule, AutoFixFunction } from '../types';

export const layoutTable: Rule = {
  title: 'Table Used for Page Layout',
  description: 'Table appears to be used for page layout rather than presenting structured data',
  friendlyDescription: 'Tables should only be used for tabular data (rows and columns of information). Using tables for page layout confuses screen readers. Use CSS layout tools instead.',
  howToFix: 'Replace layout tables with proper HTML layout techniques (CSS Grid, Flexbox, etc.).',
  impact: 'moderate'
};
