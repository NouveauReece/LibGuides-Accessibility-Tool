import type { Rule, AutoFixFunction } from '../types';

export const noAutoplayAudio: Rule = {
  title: 'Audio/Video Doesn\'t Autoplay',
  description: 'Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio',
  friendlyDescription: 'Auto-playing audio startles users and interferes with screen readers. If you have audio or video, always let users control whether it plays.',
  howToFix: 'Remove autoplay attribute or add visible controls to allow users to mute/stop audio.',
  impact: 'moderate'
};
