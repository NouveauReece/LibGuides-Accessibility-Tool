import type { Rule, AutoFixFunction } from '../types';

export const ariaValidAttrValue: Rule = {
  title: 'ARIA Attributes Have Valid Values',
  description: 'Ensure all ARIA attributes have valid values',
  friendlyDescription: 'ARIA attributes must use correct values according to the ARIA specification. Invalid values can be misinterpreted by screen readers.',
  howToFix: 'Replace ARIA attribute values with valid options per ARIA specification.',
  impact: 'critical'
};
