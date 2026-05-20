import type { Rule, AutoFixFunction } from '../types';

export const list: Rule = {
  title: 'Improperly Structured List',
  description: 'List structure is broken, often due to pasted formatting from word processors',
  friendlyDescription: 'Lists must use proper HTML list elements (<ul>, <ol>, <li>). Broken structure makes it hard for screen readers to announce lists correctly. If you\'re seeing this, delete and recreate the list using the editor toolbar.',
  howToFix: 'Delete and recreate the list using the editor toolbar.',
  impact: 'serious'
};
