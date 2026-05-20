import type { Rule, AutoFixFunction } from '../types';

export const videoCaption: Rule = {
  title: 'Videos Have Captions',
  description: 'Ensure <video> elements have captions',
  friendlyDescription: 'All videos must have captions so deaf and hard-of-hearing users can understand the audio content. This also helps viewers in noisy environments.',
  howToFix: 'Add <track kind="captions"> element to video or use video hosting with caption support.',
  impact: 'critical'
};
