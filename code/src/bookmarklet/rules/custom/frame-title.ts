import type { Rule, AutoFixFunction } from '../types';

export const frameTitle: Rule = {
  title: 'Embedded Content Missing Labels',
  description: 'Embedded content (iframes) missing a descriptive title attribute',
  friendlyDescription: 'Every embedded frame (like a video player or map) needs a title describing what it contains. Screen readers announce these titles so users understand what the embedded content is.',
  howToFix: 'In LiGuides, double click the iframe and add a brief sentence describing the content in the "title" text field.',
  impact: 'serious'
};
