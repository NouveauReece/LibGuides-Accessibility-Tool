import { rules as axeRules } from './axe-core';
import { rules as customRules } from './custom';
import type { Rule } from "./types";
import type { Result, CheckResult, NodeResult } from 'axe-core';

// Gets all the `Rule` information from files in the `axe-core` and `custom` folders
export const RULE_DEFINITIONS = {
  ...buildRuleMap(axeRules),
  ...buildRuleMap(customRules),
} as const;

// Helper function for building the export map
function buildRuleMap<T extends Record<string, any>>(obj: T) {
  const map = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toKebabCase(key), value])
  );
  return map;
}

// Helper function to convert hyphenated strings to kebab case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function getSelectorPath(el: Element): string {
  if (el.id) return `#${CSS.escape(el.id)}`;
  const parts: string[] = [];
  let current: Element | null = el;
  while (current && current.nodeType === 1 && current !== document.body) {
    let part = current.tagName.toLowerCase();
    const parent: HTMLElement | null = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.tagName === current!.tagName);
      if (siblings.length > 1) {
        part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
      }
    }
    parts.unshift(part);
    current = parent;
  }
  return parts.join(' > ');
}

export async function runCustomRules(root) {
    const rules = Object.values(buildRuleMap(customRules));
    const results = await Promise.all(
      rules.filter(rule => rule.customCheck).map(rule => rule.customCheck!(root))
    );
    return { violations: results };
}

/** Build a single NodeResult for one failing element. */
export function buildNodeResult(rule: Rule, el: Element, message: string, data?: unknown): NodeResult {
  const checkResult: CheckResult = {
    id: rule.id,
    impact: rule.impact,
    message,
    data
  };  

  return {
    html: el.outerHTML,
    impact: rule.impact,
    target: [getSelectorPath(el)],
    failureSummary: message,
    any: [checkResult],
    all: [],
    none: []
  };
}

/** Build the full Result object from a rule + the elements that failed. */
export function buildAxeResult(
  rule: Rule,
  failingNodes: NodeResult[],
  helpUrl = ''
): Result {
  return {
    id: rule.id,
    description: rule.description,
    help: rule.friendlyDescription || rule.description,
    helpUrl,
    impact: "quality",
    tags: rule.tags ?? [],
    nodes: failingNodes
  };
}