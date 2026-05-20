import type { Rule, AutoFixFunction } from '../types';

export const ariaConditionalAttr: Rule = {
  title: 'ARIA Attributes Are Used According to Specifications',
  description: 'Ensure ARIA attributes are used as described in the specification of the element\'s role',
  friendlyDescription: 'Different ARIA roles have specific rules for which attributes can be used. Using attributes incorrectly can break how assistive technology understands your content.',
  howToFix: 'Verify the ARIA attribute is valid for the element\'s role and remove or correct it if needed.',
  impact: 'serious'
};
