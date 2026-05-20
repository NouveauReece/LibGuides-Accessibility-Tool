import type { Rule, AutoFixFunction } from '../types';

export const htmlXmlLangMismatch: Rule = {
  title: 'Language Attributes Agree',
  description: 'Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page',
  friendlyDescription: 'If you use both lang and xml:lang attributes, they must specify the same language. Conflicting language declarations confuse assistive technology.',
  howToFix: 'Make lang and xml:lang attributes use the same language code.',
  impact: 'moderate'
};
