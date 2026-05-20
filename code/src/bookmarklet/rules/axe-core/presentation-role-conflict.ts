import type { Rule, AutoFixFunction } from '../types';

export const presentationRoleConflict: Rule = {
  title: 'Decorative Elements Aren\'t Conflicting',
  description: 'Ensure elements marked as presentational do not have global ARIA or tabindex so that all screen readers ignore them',
  friendlyDescription: 'Elements with role="presentation" should not have interactive attributes like tabindex or ARIA labels. If you need those, the element isn\'t purely decorative.',
  impact: 'minor'
};
