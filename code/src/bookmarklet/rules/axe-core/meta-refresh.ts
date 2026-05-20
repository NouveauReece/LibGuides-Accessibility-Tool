import type { Rule, AutoFixFunction } from '../types';

export const metaRefresh: Rule = {
  title: 'No Automatic Page Refresh',
  description: 'Ensure <meta http-equiv="refresh"> is not used for delayed refresh',
  friendlyDescription: 'Automatic page refreshes are disorienting for all users and especially confusing for screen reader users. Don\'t use meta refresh to reload pages.',
  howToFix: 'Remove <meta http-equiv="refresh"> element or use JavaScript alternatives with user control.',
  impact: 'critical'
};
