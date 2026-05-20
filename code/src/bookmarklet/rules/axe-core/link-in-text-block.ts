import type { Rule, AutoFixFunction } from '../types';

export const linkInTextBlock: Rule = {
  title: 'Links Distinguishable in Text Blocks',
  description: 'Ensure links are distinguished from surrounding text in a way that does not rely on color',
  friendlyDescription: 'Links should stand out from regular text using more than just color—add underlining or different styling. Color-blind users need another visual clue.',
  howToFix: 'Add underline or other visual styling to links in addition to color.',
  impact: 'serious'
};
