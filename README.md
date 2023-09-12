
# Custom ESLint Rule: enforce-destruction-limits

[![npm version](https://badge.fury.io/js/eslint-plugin-enforce-destruction-limits.svg)](https://www.npmjs.com/package/eslint-plugin-enforce-destruction-limits)

## Overview

Rule is allowing to enforce best-practices, by providing opportunity to **limit access via nesting (aka dot) to the objects**.<br>
Might be pretty useful to restrict some project-related structure untouched for either better readability or for allowing easy-to-go "replace" functionality (ex: replace all ... where "contacts.persons")

#### Options
You can provide "patterns" which will work as a limit for nesting.
Patterns might be provided as simple string, wildcards or RegExp

ex:
```js
// string: "contacts.person"

/* Allow: */ const { siblings } = contacts.persons
/* Forbid: */ const { Jimmy } = contacts.persons.siblings
```
```js
// wildcards: "contacts.*.Jimmy"

/* Allow: */ const { info } = contacts.persons.siblings.Jimmy
/* Forbid: */ const { phone } = contacts.persons.siblings.Jimmy.info
```
And same with any RegExp you want to use.


## Installation

You can install this custom ESLint rule via npm:

```bash
npm install eslint-plugin-enforce-destruction-limits --save-dev
```
```bash
yarn add -D eslint-plugin-enforce-destruction-limits
```

**Configuration**
To use this rule in your ESLint configuration, add it to your `.eslintrc.js` or `.eslintrc.json` file:

```json
{
  "plugins": ["enforce-destruction-limits"],
  "rules": {
    "enforce-destruction-limits/enforce-destruction-limits": [
        "error",
        { "patterns": ["contacts.persons", "contacts.*.Jimmy"] }
    ]
  }
}
```



### Contributing
If you'd like to contribute to this custom ESLint rule, please follow the guidelines in CONTRIBUTING.md.

### License
This custom ESLint rule is licensed under the MIT License. See the LICENSE file for details.

### Author
daklin2

### Changelog
Document changes, updates, and version history in this section.

### Feedback
If you have feedback, questions, or encounter issues with this custom ESLint rule, please open an issue on the GitHub repository.
