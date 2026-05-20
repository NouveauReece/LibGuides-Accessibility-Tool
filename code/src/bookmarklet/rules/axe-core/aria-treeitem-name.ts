import type { Rule, AutoFixFunction } from '../types';

export const ariaTreeitemName: Rule = {
  title: 'ARIA Tree Items Have Names',
  description: 'Ensure every ARIA treeitem node has an accessible name',
  friendlyDescription: 'ARIA tree items (hierarchical list items) need accessible names so screen readers can announce what each tree item represents.',
  impact: 'serious'
};
