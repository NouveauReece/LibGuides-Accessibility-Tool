import type { Rule, AutoFixFunction } from '../types';

export const list: Rule = {
  title: 'Lists Are Properly Structured',
  description: 'Ensure that lists are structured correctly',
  friendlyDescription: 'Lists must use proper HTML list elements (<ul>, <ol>, <li>). Broken list structure confuses screen readers about how content is organized.',
  howToFix: 'Use proper <ul>, <ol>, and <li> elements to structure lists correctly.',
  impact: 'serious'
};
