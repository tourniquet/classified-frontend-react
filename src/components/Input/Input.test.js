import React from 'react'
import { shallow } from 'enzyme'

import Input from './Input'

const wrapper = shallow(
  <Input />
)

describe('Input', () => {
  test('Input should return an input element', () => {
    expect(wrapper.find('input').type()).toBe('input')
  })
})
