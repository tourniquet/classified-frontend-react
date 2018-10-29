import React from 'react'
import { shallow } from 'enzyme'

import Image from './Image'

const wrapper = shallow(
  <Image />
)

describe('Image', () => {
  test('Image should return an img element', () => {
    expect(wrapper.find('img').type()).toBe('img')
  })
})
