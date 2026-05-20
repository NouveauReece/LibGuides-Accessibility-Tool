import type { Rule, AutoFixFunction } from '../types';

export const tableSemanticMarkup: Rule = {
  title: 'Table Lacks Proper Structure',
  description: 'Table is missing semantic elements like <thead> or <tbody>',
  friendlyDescription: 'Properly structured tables use <thead> for header rows and <tbody> for data rows. This helps screen readers understand table structure and makes tables easier for all users to understand.',
  howToFix: 'Add proper structural tags like <thead> and <tbody>.',
  impact: 'serious'
};
