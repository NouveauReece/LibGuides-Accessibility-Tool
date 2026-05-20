import type { Rule, AutoFixFunction } from '../types';

export const htmlLangValid: Rule = {
  title: 'Language Attribute Is Valid',
  description: 'Ensure the lang attribute of the <html> element has a valid value',
  friendlyDescription: 'The lang attribute must use proper language codes (like "en", "es", "fr"). Invalid codes won\'t be recognized by screen readers.',
  howToFix: 'Use a valid BCP 47 language code for the lang attribute.',
  impact: 'serious'
};
