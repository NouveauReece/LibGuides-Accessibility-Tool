import type { Rule, AutoFixFunction } from '../types';

export const scrollableRegionFocusable: Rule = {
  title: 'Scrollable Regions Are Keyboard Accessible',
  description: 'Ensure elements that have scrollable content are accessible by keyboard in Safari',
  friendlyDescription: 'If a region can be scrolled, keyboard users must be able to focus it and scroll using arrow keys. This is especially important in Safari.',
  howToFix: 'Add tabindex="0" to scrollable regions or use keyboard event handlers.',
  impact: 'serious'
};
