import type { Rule, AutoFixFunction } from '../types';

export const htmlHasLang: Rule = {
  title: 'HTML Element Has Language Attribute',
  description: 'Ensure every HTML document has a lang attribute',
  friendlyDescription: 'The <html> tag needs a lang attribute (like lang="en" for English). This tells screen readers what language the page is in so they can pronounce words correctly.',
  howToFix: 'Add lang attribute to <html> element (e.g., lang="en").',
  impact: 'serious'
};
