import type { Rule, AutoFixFunction } from '../types';

export const accesskeys: Rule = {
  title: 'Access Keys Are Unique',
  description: 'Ensure every accesskey attribute value is unique',
  friendlyDescription: 'Access keys (keyboard shortcuts) must not duplicate each other. Duplicate access keys confuse keyboard users about which element will activate.',
  howToFix: 'Change duplicate accesskey values to unique characters.',
  impact: 'serious'
};
