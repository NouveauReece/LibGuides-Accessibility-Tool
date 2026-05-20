import { rules as axeRules } from './axe-core';
import { rules as customRules } from './custom';

// Gets all the `Rule` information from files in the `axe-core` and `custom` folders
export const RULE_DEFINITIONS = {
  ...buildRuleMap(axeRules),
  ...buildRuleMap(customRules),
} as const;


// Helper function for building the export map
function buildRuleMap<T extends Record<string, any>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toKebabCase(key), value])
  );
}

// Helper function to convert hyphenated strings to kebab case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
