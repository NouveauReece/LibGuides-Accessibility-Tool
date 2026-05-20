import type { Rule, AutoFixFunction } from '../types';

export const ariaBrailleEquivalent: Rule = {
  title: 'Braille Labels Have Non-Braille Equivalents',
  description: 'Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent',
  friendlyDescription: 'When using Braille-specific ARIA labels, you must also provide regular text labels so all users can understand the content, not just Braille readers.',
  howToFix: 'Add aria-label or aria-describedby with non-braille text equivalent to match braille labels.',
  impact: 'serious'
};
