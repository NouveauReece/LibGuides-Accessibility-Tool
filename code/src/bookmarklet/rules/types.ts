import type { AxeResults, ElementContext } from 'axe-core'

export interface Rule {
  title: string;
  description: string;
  friendlyDescription: string;
  impact?: 'critical' | 'serious' | 'moderate' | 'minor';
  howToFix?: string;
  customCheck?: CustomCheckFunction;
  autoFixFunction?: AutoFixFunction;
}

export type CustomCheckFunction = (node: ElementContext) => Promise<AxeResults>;
export type AutoFixFunction = (root: HTMLElement) => void;
