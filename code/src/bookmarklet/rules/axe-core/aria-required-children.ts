import type { Rule, AutoFixFunction } from '../types';

export const ariaRequiredChildren: Rule = {
  title: 'ARIA Elements Contain Required Child Roles',
  description: 'Ensure elements with an ARIA role that require child roles contain them',
  friendlyDescription: 'Some ARIA roles must contain specific child roles to work correctly. Missing required children breaks the expected structure for assistive technology.',
  howToFix: 'Add required child elements with appropriate ARIA roles inside the parent element.',
  impact: 'critical'
};
