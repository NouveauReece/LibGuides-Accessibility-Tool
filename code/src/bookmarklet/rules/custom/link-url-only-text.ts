import type { Rule, AutoFixFunction } from '../types';

export const linkUrlOnlyText: Rule = {
  title: 'Links Use URLs as Text',
  description: 'Links whose visible text is a raw URL instead of descriptive text',
  friendlyDescription: 'When a link displays a raw URL (like "https://example.com") as its text, screen reader users hear the entire URL read aloud, which is confusing. Use descriptive text instead, like "Learn more about our services".',
  howToFix: 'Change the visible link text to something descriptive while keeping the same URL target.',
  impact: 'serious'
};
