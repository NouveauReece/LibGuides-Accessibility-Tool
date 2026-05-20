import type { Rule, AutoFixFunction } from '../types';

export const listitem: Rule = {
  title: 'List Items Are Used Semantically',
  description: 'Ensure <li> elements are used semantically',
  friendlyDescription: 'List items (<li>) must only appear inside proper list elements (<ul> or <ol>). Using <li> outside lists breaks the expected structure.',
  howToFix: 'Move <li> elements inside a <ul> or <ol> element.',
  impact: 'serious'
};
