import React from 'react'
import { shallow } from 'enzyme'

import Footer from './Footer'

const wrapper = shallow(
  <Footer />
)

describe('Footer', () => {
  test('Footer should return a Footer tag element', () => {
    expect(wrapper.find('footer').type()).toBe('footer')
  })
})
