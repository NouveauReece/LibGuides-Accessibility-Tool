import type { Rule, AutoFixFunction } from '../types';

export const validLang: Rule = {
  title: 'Language Attributes Use Valid Codes',
  description: 'Ensure lang attributes have valid values',
  friendlyDescription: 'Language attributes (lang and xml:lang) must use valid language codes like "en", "es", or "fr-CA". Invalid codes won\'t be recognized.',
  howToFix: 'Use valid BCP 47 language code for lang attribute.',
  impact: 'serious'
};
