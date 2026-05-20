import type { Rule, AutoFixFunction } from '../types';

export const ariaDeprecatedRole: Rule = {
  title: 'Elements Don\'t Use Deprecated ARIA Roles',
  description: 'Ensure elements do not use deprecated roles',
  friendlyDescription: 'Some ARIA roles are outdated and no longer supported. Using deprecated roles can cause compatibility problems with assistive technology.',
  howToFix: 'Replace deprecated role with current ARIA role or use appropriate HTML semantic element.',
  impact: 'minor'
};
