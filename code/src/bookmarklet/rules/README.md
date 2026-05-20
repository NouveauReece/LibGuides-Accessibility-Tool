# Accessibility Rules Documentation

This directory contains all accessibility rule definitions organized into modular files for maintainability and clarity.

## Directory Structure

```
rules/
├── types.ts                    # TypeScript interfaces shared across all rules
├── index.ts                    # Main export file with RULE_DEFINITIONS dictionary
├── ruleDescriptions.ts         # Backward compatibility wrapper (re-exports from index.ts)
├── axe-core/                   # axe-core standard rules (~60 rules)
│   ├── index.ts                # Exports all axe-core rules
│   ├── area-alt.ts
│   ├── aria-allowed-attr.ts
│   └── ... (all other axe-core rules)
└── custom/                     # Custom rules specific to LibGuides
    ├── index.ts                # Exports all custom rules
    ├── link-url-only-text.ts
    ├── image-no-alt.ts
    └── ... (all other custom rules)
```

## Rule Interface

Each rule file exports a single rule object conforming to the `Rule` interface:

```typescript
interface Rule {
  title: string;                    // Short accessible violation title
  description: string;              // Technical axe-core description
  friendlyDescription: string;      // Beginner-friendly explanation
  hasAutoFix: boolean;              // Whether auto-fixing is possible
  impact?: 'critical' | 'serious' | 'moderate' | 'minor';  // Severity level
  howToFix?: string;                // Steps to manually fix the violation
  autoFixFunction?: Function;       // Optional auto-fix implementation
}
```

## Importing Rules

### Single Rule Import
```typescript
import { imageNoAlt } from './custom/image-no-alt';
console.log(imageNoAlt.title);  // "Images Missing Alt Attribute"
```

### Batch Imports from Sub-directories
```typescript
import * as axeRules from './axe-core';
import * as customRules from './custom';

console.log(axeRules.buttonName.title);
console.log(customRules.imageAltQuality.title);
```

### Using the Complete Dictionary (Backward Compatible)
```typescript
import { RULE_DEFINITIONS } from './index';

const rule = RULE_DEFINITIONS['image-no-alt'];
console.log(rule.title);               // "Images Missing Alt Attribute"
console.log(rule.friendlyDescription); // User-friendly explanation
```

### Get All Rules as Type-Safe Object
```typescript
import { axeCore, custom } from './index';

// Access typed rules
const colorContrastRule = axeCore.colorContrast;
const customListRule = custom.customList;
```

## Rule Categories

### Axe-Core Rules (60+ rules)

**WCAG 2.0 Level A & AA:**
- Image alternatives (area-alt, input-image-alt, etc.)
- ARIA attributes (aria-*, 30+ rules)
- Form fields (label, input-button-name, etc.)
- Links (link-name, link-in-text-block, etc.)
- Headings and structure (heading-order, etc.)
- Tables (scope-attr-valid, td-headers-attr, etc.)
- Color and contrast (color-contrast)
- Languages (html-has-lang, html-lang-valid, etc.)

**Best Practice Rules:**
- Landmarks (landmark-*, 7 rules)
- Skip links and navigation (bypass, skip-link, etc.)
- Media and embeds (frame-title-unique, no-autoplay-audio, etc.)
- UI patterns (presentation-role-conflict, nested-interactive, etc.)

### Custom Rules (17 rules)

These are tailored to LibGuides WYSIWYG editor specifics:
- `link-url-only-text` - Links showing URLs as text
- `image-no-alt` / `image-alt-quality` - Image alt text issues
- `empty-heading-*` - Empty headings (image-only or completely empty)
- `duplicate-id` - Duplicate element IDs
- `scope-attr-valid` - Misused table scope attributes
- `frame-title` - Missing iframe titles
- `empty-container` - Empty sections
- `table-*` - Table structure issues
- `layout-table` - Tables used for layout
- `link-new-window` - Unannounced new window links
- `iframe-unique-name` - Duplicate iframe names
- `presentation-role-conflict` - Decorative elements with interactive attributes
- `icon-no-text` - Icon-only elements without labels

## Adding New Rules

1. **Create a new file** in `axe-core/` or `custom/` directory:
   ```typescript
   // custom/my-new-rule.ts
   import type { Rule, AutoFixFunction } from '../types';
   
   export const myNewRule: Rule = {
     title: 'Rule Title',
     description: 'Technical description from axe or your spec',
     friendlyDescription: 'Beginner-friendly explanation of why this matters',
     howToFix: 'Step-by-step instructions for users',
     hasAutoFix: false,
     impact: 'serious'
   };
   ```

2. **Export from the category index:**
   ```typescript
   // custom/index.ts - add this line
   export { myNewRule } from './my-new-rule';
   ```

3. **Add to main index.ts:**
   ```typescript
   // rules/index.ts - add to RULE_DEFINITIONS
   export const RULE_DEFINITIONS = {
     // ... existing rules
     'my-new-rule-id': cust.myNewRule,
   };
   ```

## Backward Compatibility

The old `ruleDescriptions.ts` file re-exports `RULE_DEFINITIONS` from `index.ts`, so existing code using:
```typescript
import { RULE_DEFINITIONS } from './ruleDescriptions';
```
will continue to work without changes.

## Rule Descriptions Philosophy

Each rule includes three levels of documentation:

1. **title** - Short, scannable title for the violation
2. **description** - Technical description (from axe-core specs or project needs)
3. **friendlyDescription** - Beginner-friendly explanation in plain language
   - Explains WHY the issue matters
   - Describes impact on different users
   - Written for those new to web accessibility
   - Avoids jargon or explains technical terms

## Impact Levels

- **critical** - Complete access barrier (e.g., images without alt text)
- **serious** - Major accessibility issue affecting many users (e.g., low contrast)
- **moderate** - Important but less severe issue (e.g., empty containers)
- **minor** - Best practice or rarely affects users (e.g., deprecated roles)

## Usage in Scan Results

When displaying violations to users:
```typescript
import { RULE_DEFINITIONS } from './rules';

function displayViolation(ruleId: string) {
  const rule = RULE_DEFINITIONS[ruleId];
  
  return {
    title: rule.title,
    userMessage: rule.friendlyDescription,
    fixSteps: rule.howToFix,
    canAutoFix: rule.hasAutoFix
  };
}
```

## Maintenance Notes

- Rule files are single-responsibility: one rule per file
- Names use kebab-case (matching axe-core rule IDs)
- Export variables use camelCase for consistency
- All rules include both technical and user-friendly descriptions
- When updating a rule, update the file directly—the index files will automatically include it
