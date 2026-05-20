import type { Rule, AutoFixFunction } from '../types';

export const ariaHiddenFocus: Rule = {
  title: 'Hidden Elements Aren\'t Focusable',
  description: 'Ensure aria-hidden elements are not focusable nor contain focusable elements',
  friendlyDescription: 'When you hide an element from screen readers with aria-hidden, it shouldn\'t be keyboard-focusable. Users would get confused if they reach an element they can\'t hear described.',
  howToFix: 'Remove aria-hidden or remove tabindex and focusable content from the element.',
  impact: 'serious'
};
