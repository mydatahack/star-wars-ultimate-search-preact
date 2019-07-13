import { expect } from 'chai'
import { tbHeaderFormatter } from '../helper'

describe('helper.js', () => {
  describe('tbHeaderFormatter()', () => {
    it('should format string correctly with underscores in string', () => {
      const string = 'cost_in_credits'
      expect(tbHeaderFormatter(string)).equal('Cost In Credits')
    })
    it('should capitalise first letter with a single word', () => {
      const string = 'star'
      expect(tbHeaderFormatter(string)).equal('Star')
    })

  })
})
