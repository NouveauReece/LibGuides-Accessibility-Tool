import type { Rule, AutoFixFunction } from '../types';

export const definitionList: Rule = {
  title: 'Definition Lists Are Properly Structured',
  description: 'Ensure <dl> elements are structured correctly',
  friendlyDescription: 'Definition lists (<dl>) must contain definition terms (<dt>) and definitions (<dd>) in the right order. Improper structure confuses assistive technology.',
  howToFix: 'Ensure <dt> and <dd> elements are properly nested inside <dl> elements.',
  impact: 'serious'
};
