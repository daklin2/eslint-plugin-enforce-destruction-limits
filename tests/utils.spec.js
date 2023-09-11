const { isPatternRestricted, getObjectPathFromAST } = require('../lib/utils/utils')

const identifierNode = name => ({
  type: 'Identifier',
  name,
})

const memberExpressionNode = (object, property, computed = false) => ({
  type: 'MemberExpression',
  object,
  property,
  computed,
})

describe('utils', () => {
  describe('isPatternRestricted', () => {
    it('should return true for exact pattern match', () => {
      const restrictedPatterns = ['theme.components.textButton.colors']
      const pattern = 'theme.components.textButton.colors'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(true)
    })

    it('should return false for exact pattern mismatch', () => {
      const restrictedPatterns = ['theme.components.textButton.colors']
      const pattern = 'theme.components.button'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(false)
    })

    it('should return true for regular expression pattern match', () => {
      const restrictedPatterns = ['/theme\\.components\\..+/']
      const pattern = 'theme.components.textButton.colors'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(true)
    })

    it('should return false for regular expression pattern mismatch', () => {
      const restrictedPatterns = ['/theme\\.components\\..+/']
      const pattern = 'product.info'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(false)
    })

    it('should return true for wildcard pattern match', () => {
      const restrictedPatterns = ['theme.*.colors']
      const pattern = 'theme.components.textButton.colors'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(true)
    })

    it('should return false for wildcard pattern mismatch', () => {
      const restrictedPatterns = ['theme.components.*.colors']
      const pattern = 'theme.components.button'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(false)
    })

    it('should handle empty restricted patterns array', () => {
      const restrictedPatterns = []
      const pattern = 'theme.components.textButton.colors'
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(false)
    })

    it('should handle empty pattern', () => {
      const restrictedPatterns = ['theme.components.textButton.colors']
      const pattern = ''
      expect(isPatternRestricted(pattern, restrictedPatterns)).toBe(false)
    })

    it('should handle undefined pattern', () => {
      const restrictedPatterns = ['theme.components.textButton.colors']
      expect(isPatternRestricted(undefined, restrictedPatterns)).toBe(false)
    })
  })

  describe('getObjectPathFromAST', () => {
    it('should extract object path from simple MemberExpression', () => {
      const ast = memberExpressionNode(identifierNode('theme'), identifierNode('components'))
      expect(getObjectPathFromAST(ast)).toBe('theme.components')
    })

    it('should extract object path from computed MemberExpression', () => {
      const ast = memberExpressionNode(identifierNode('theme'), identifierNode('colors'), true)
      expect(getObjectPathFromAST(ast)).toBe('theme[colors]')
    })

    it('should extract object path from nested MemberExpression', () => {
      const ast = memberExpressionNode(
        memberExpressionNode(identifierNode('theme'), identifierNode('components')),
        identifierNode('button'),
      )
      expect(getObjectPathFromAST(ast)).toBe('theme.components.button')
    })

    it('should handle Identifier node', () => {
      const ast = identifierNode('theme')
      expect(getObjectPathFromAST(ast)).toBe('theme')
    })

    it('should handle empty node', () => {
      const ast = {}
      expect(getObjectPathFromAST(ast)).toBe('')
    })

    it('should handle undefined node', () => {
      expect(getObjectPathFromAST(undefined)).toBe('')
    })
  })
})
