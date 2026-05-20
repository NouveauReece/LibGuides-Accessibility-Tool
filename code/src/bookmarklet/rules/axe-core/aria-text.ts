import type { Rule, AutoFixFunction } from '../types';

export const ariaText: Rule = {
  title: 'role="text" Only on Non-Interactive Elements',
  description: 'Ensure role="text" is used on elements with no focusable descendants',
  friendlyDescription: 'The role="text" should only be used on elements that don\'t contain interactive controls. It can\'t be used with buttons, links, or form fields.',
  impact: 'serious'
};
