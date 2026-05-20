import type { Rule, AutoFixFunction } from '../types';

export const tabindex: Rule = {
  title: 'Tabindex Values Are Valid',
  description: 'Ensure tabindex attribute values are not greater than 0',
  friendlyDescription: 'Avoid using tabindex > 0 (like tabindex="1", "2"). These break keyboard navigation order. Use tabindex="-1" for focusable-by-script only, or omit it entirely.',
  impact: 'serious'
};
