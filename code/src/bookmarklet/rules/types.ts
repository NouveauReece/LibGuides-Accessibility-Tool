import type { AxeResults, ElementContext, Result } from 'axe-core'

export interface Rule {
  id: string;
  title: string;
  description: string;
  friendlyDescription: string;
  tags?: string[];
  impact?: 'critical' | 'serious' | 'moderate' | 'minor';
  howToFix?: string;
  customCheck?: CustomCheckFunction;
  autoFixFunction?: AutoFixFunction;
}

export type CustomCheckFunction = (root: Element | Document) => Promise<Result> | Result;
export type AutoFixFunction = (element: any) => void;
