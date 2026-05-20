import type { Rule, AutoFixFunction } from '../types';

export const imageAltQuality: Rule = {
  title: 'Alt Text Quality Issues',
  description: 'Alt text with problematic patterns: starts with "image of", is a filename, too long, or all caps',
  friendlyDescription: 'Alt text quality matters. Avoid saying "image of" at the start, don\'t use filenames, keep it under 250 characters, and use normal capitalization. Write alt text as if describing the image to someone over the phone.',
  howToFix: 'Revise alt text. Keep under 250 characters. You can use the Wolverine Describer or W3C Images Tutorial for guidance.',
  impact: 'serious'
};
