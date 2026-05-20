export interface Rule {
  title: string;
  description: string;
  friendlyDescription: string;
  impact?: 'critical' | 'serious' | 'moderate' | 'minor';
  howToFix?: string;
  autoFixFunction?: AutoFixFunction;
}

export type AutoFixFunction = (root: HTMLElement) => void;