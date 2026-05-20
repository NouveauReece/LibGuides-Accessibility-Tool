import type { Rule, AutoFixFunction } from '../types';

const autoFixBlink: AutoFixFunction = (root) => {
  const blinkElements = root.querySelectorAll('blink');
  blinkElements.forEach((el) => el.remove());
};

export const blink: Rule = {
  title: 'No Blinking or Flashing Content',
  description: 'Ensure <blink> elements are not used',
  friendlyDescription: 'The <blink> HTML element (which makes content flash) is outdated and harmful to users with vestibular disorders or photosensitivity. Don\'t use it.',
  howToFix: 'Remove <blink> element and use CSS or other methods for styling.',
  autoFixFunction: autoFixBlink,
  impact: 'serious'
};



