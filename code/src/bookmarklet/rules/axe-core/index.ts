// Don't edit this file.
// Exports sibling files so the rules in them can be included in `RULE_DEFINITIONS`
const modules = import.meta.glob('./*.ts', { eager: true });
delete modules['./index.ts'];
export const rules = Object.assign({}, ...Object.values(modules));