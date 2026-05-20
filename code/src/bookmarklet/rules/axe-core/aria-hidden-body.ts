import type { Rule, AutoFixFunction } from '../types';

export const ariaHiddenBody: Rule = {
  title: 'Body Not Hidden from Screen Readers',
  description: 'Ensure aria-hidden="true" is not present on the document body',
  friendlyDescription: 'The entire page should never be hidden from screen readers. If you accidentally apply aria-hidden to the body element, assistive technology users won\'t be able to access any content.',
  howToFix: 'Remove aria-hidden="true" from the body element immediately.',
  impact: 'critical'
};
