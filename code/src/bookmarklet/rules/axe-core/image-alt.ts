import type { Rule, AutoFixFunction } from '../types';

export const imageAlt: Rule = {
  title: 'Images Missing Alt Text',
  description: 'Images that have no alt attribute',
  friendlyDescription: 'Every image must have an alt attribute describing what it shows. If the image is purely decorative, use alt="" (empty alt text). This helps screen reader users understand all visual content.',
  howToFix: 'In LibGuides rich text editor: Double click image → Add alt text describing the image, or use alt="" if purely decorative.',
  impact: 'critical'
};
