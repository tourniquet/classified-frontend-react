import React from 'react'
import { shallow } from 'enzyme'

import Label from './Label'

const wrapper = shallow(
  <Label />
)

describe('Label', () => {
  test('Label should return a label element', () => {
    expect(wrapper.find('label').type()).toBe('label')
  })
})
