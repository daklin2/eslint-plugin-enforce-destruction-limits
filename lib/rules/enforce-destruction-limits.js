const { isPatternRestricted, getObjectPathFromAST } = require('../utils/utils');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce not accessing properties deeper than you want.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        // additionalProperties: false, // To disallow extra properties
      },
    ],
  },
  create(context) {
    const { patterns: restrictedPatterns = [] } = context.options[0] || {};

    return {
      MemberExpression(node) {
        const objectPath = getObjectPathFromAST(node.object);

        if (objectPath) {
          if (isPatternRestricted(objectPath, restrictedPatterns)) {
            context.report({
              node,
              message: `Nesting access to object is limited by '${objectPath}' pattern.`,
            })
          }
        }
      },
    }
  },
}
