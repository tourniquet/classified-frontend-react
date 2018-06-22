/* globals describe, expect, test */

import React from 'react'
import { shallow } from 'enzyme'

import Textarea from './Textarea'

const wrapper = shallow(
  <Textarea />
)

describe('Textarea', () => {
  test('Textarea should return a textarea element', () => {
    expect(wrapper.find('textarea').type()).toBe('textarea')
  })
})
