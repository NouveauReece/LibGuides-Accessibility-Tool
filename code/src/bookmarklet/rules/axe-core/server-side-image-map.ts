import type { Rule, AutoFixFunction } from '../types';

export const serverSideImageMap: Rule = {
  title: 'No Server-Side Image Maps',
  description: 'Ensure that server-side image maps are not used',
  friendlyDescription: 'Server-side image maps (usemap) are inaccessible. Use HTML-based client-side image maps (with <area> elements) instead.',
  howToFix: 'Replace server-side image maps with client-side <map> and <area> elements.',
  impact: 'minor'
};
