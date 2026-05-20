import type { Rule, AutoFixFunction } from '../types';

export const presentationRoleConflict: Rule = {
  title: 'Decorative Element Has Conflicting Accessibility Markup',
  description: 'Element is marked as decorative (role="presentation") but also has interactive attributes',
  friendlyDescription: 'Elements with role="presentation" are meant to be invisible to assistive technology. They shouldn\'t have tabindex, ARIA labels, or other accessibility features—that would create confusion.',
  howToFix: 'Remove conflicting attributes or remove role="presentation" if the element needs to be interactive.',
  impact: 'minor'
};
