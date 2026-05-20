import type { Rule, AutoFixFunction } from '../types';

export const emptyHeadingImageOnly: Rule = {
  title: 'Heading Contains Only an Image',
  description: 'Heading elements that contain only an image, icon, or media without any text',
  friendlyDescription: 'Headings should have text describing the section. If a heading contains only an image, screen readers won\'t know what the section is about. Add text or move the image outside the heading.',
  howToFix: 'Add text inside the heading or move the image outside the heading tag.',
  impact: 'serious'
};
