const { RuleTester } = require('eslint')
const rule = require('../../lib/rules/enforce-destruction-limits')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
  },
})

ruleTester.run('enforce-destruction-limits', rule, {
  valid: [
    // Valid patterns allowing access
    {
      code: 'const { modal } = theme.components;',
      options: [{ patterns: ['theme.components'] }],
    },
    {
      code: 'const { green } = theme.anything.color;',
      options: [{ patterns: ['theme.*.color'] }],
    },
    {
      code: 'const { red } = theme.anything2.color;',
      options: [{ patterns: ['theme.*.color'] }],
    },
  ],
  invalid: [
    // Invalid patterns disallowing access
    {
      code: 'const { color } = theme.components.modal;',
      options: [{ patterns: ['theme.components'] }],
      errors: [
        {
          message: "Nesting access to object is limited by 'theme.components' pattern.",
        },
      ],
    },
    {
      code: 'const { fonts } = theme.components.data;',
      options: [{ patterns: ['theme.components'] }],
      errors: [
        {
          message: "Nesting access to object is limited by 'theme.components' pattern.",
        },
      ],
    },
    {
      code: 'const { dark } = theme.anything.color.green;',
      options: [{ patterns: ['theme.*.color'] }],
      errors: [
        {
          message: "Nesting access to object is limited by 'theme.anything.color' pattern.",
        },
      ],
    },
  ],
})
