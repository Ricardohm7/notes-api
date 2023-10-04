const { palindrome } = require('../utils/for_testing')
const { test, expect } = require('@jest/globals')

test.skip('palindrome of ricardo', () => {
  const result = palindrome('ricardo')

  expect(result).toBe('odracir')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})