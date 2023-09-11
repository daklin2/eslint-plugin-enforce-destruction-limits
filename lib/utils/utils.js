// Utility function to extract the full object path from a MemberExpression (tree)
function getObjectPathFromAST(node) {
  if (!node) return '';

  if (node.type === 'MemberExpression') {
    const object = getObjectPathFromAST(node.object);
    const property = node.computed ? `[${node.property.name}]` : `.${node.property.name}`;
    return object + property;
  } else if (node.type === 'Identifier') {
    return node.name;
  } else {
    return '';
  }
}

// Utility function to check if a pattern is restricted based on the provided restrictions array
function isPatternRestricted(pattern, restrictedPatterns) {
  return restrictedPatterns.some(restrictedPattern => {
    // Exact match
    if (restrictedPattern === pattern) {
      return true
    }

    // Check if pattern matches using regular expressions
    const isRegExpPattern = /^\/(.+)\/$/.exec(restrictedPattern);
    if (isRegExpPattern) {
      const regexPattern = new RegExp(isRegExpPattern[1]);
      return regexPattern.test(pattern);
    }

    // Check if pattern matches using wildcards
    const patternRegex = new RegExp(
      `^${restrictedPattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`,
    )
    return patternRegex.test(pattern);
  })
}

module.exports = {
  getObjectPathFromAST,
  isPatternRestricted,
}
