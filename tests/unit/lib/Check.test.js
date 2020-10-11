/* eslint-disable no-undef */
import { isDefined, checkIsDefined, isNullOrWhitespace } from '../../../src/lib/Check'

describe('isNullOrWhitespace', () => {
  describe('should be throw', () => {
    test('when passed a object', () => {
      const value = {}

      expect(() => isNullOrWhitespace(value)).toThrow(`value is not a type of string ${value}`)
    })

    test('when passed a array', () => {
      const value = []

      expect(() => isNullOrWhitespace(value)).toThrow(`value is not a type of string ${value}`)
    })

    test('when passed a function', () => {
      const value = console.log

      expect(() => isNullOrWhitespace(value)).toThrow(`value is not a type of string ${value}`)
    })

    test('when passed a number', () => {
      const value = 1

      expect(() => isNullOrWhitespace(value)).toThrow(`value is not a type of string ${value}`)
    })
  })

  describe('should be true', () => {
    test('when null', () => {
      const value = null

      expect(isNullOrWhitespace(value)).toBe(true)
    })

    test('when undefined', () => {
      const value = undefined

      expect(isNullOrWhitespace(value)).toBe(true)
    })

    test('when whitespace', () => {
      const value = ' '

      expect(isNullOrWhitespace(value)).toBe(true)
    })

    test('when empty string', () => {
      const value = ''

      expect(isNullOrWhitespace(value)).toBe(true)
    })
  })

  describe('should be false', () => {
    test('when string value', () => {
      const value = 'string'

      expect(isNullOrWhitespace(value)).toBe(false)
    })
  })
})

describe('isDefined', () => {
  describe('should be false', () => {
    test('when null', () => {
      const value = null

      expect(isDefined(value)).toBe(false)
    })

    test('when undefined', () => {
      const value = undefined

      expect(isDefined(value)).toBe(false)
    })
  })

  describe('should be true', () => {
    test('when string', () => {
      const value = 'string'

      expect(isDefined(value)).toBe(true)
    })

    test('when function', () => {
      const value = console.log

      expect(isDefined(value)).toBe(true)
    })

    test('when object', () => {
      const value = {}

      expect(isDefined(value)).toBe(true)
    })

    test('when array', () => {
      const value = []

      expect(isDefined(value)).toBe(true)
    })

    test('when number', () => {
      const value = 1

      expect(isDefined(value)).toBe(true)
    })
  })
})

describe('checkIsDefined', () => {
  describe('when thrown', () => {
    test('should have default message', () => {
      const value = null

      expect(() => checkIsDefined(value)).toThrow('value is not defined')
    })

    test('should have custom message', () => {
      const value = null
      const message = 'custom message'
      expect(() => checkIsDefined(value, message)).toThrow(message)
    })
  })

  describe('should be false', () => {
    test('when null', () => {
      const value = null

      expect(() => checkIsDefined(value)).toThrow('value is not defined')
    })

    test('when undefined', () => {
      const value = undefined

      expect(() => checkIsDefined(value)).toThrow('value is not defined')
    })
  })

  describe('should be true', () => {
    test('when string', () => {
      const value = 'string'

      expect(() => checkIsDefined(value)).not.toThrow()
    })

    test('when function', () => {
      const value = console.log

      expect(() => checkIsDefined(value)).not.toThrow()
    })

    test('when object', () => {
      const value = {}

      expect(() => checkIsDefined(value)).not.toThrow()
    })

    test('when array', () => {
      const value = []

      expect(() => checkIsDefined(value)).not.toThrow()
    })

    test('when number', () => {
      const value = 1

      expect(() => checkIsDefined(value)).not.toThrow()
    })
  })
})
