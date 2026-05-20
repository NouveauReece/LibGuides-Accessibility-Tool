/**
 * Rule descriptions and explanations
 * 
 * This file re-exports rule definitions from individual rule files organized in:
 * - axe-core/: Standard axe-core accessibility rules
 * - custom/: Custom rules specific to LibGuides
 * 
 * For new rules or updates, modify the rule files in those directories.
 */

export type { Rule } from './types';
export { RULE_DEFINITIONS } from './index';