import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

const wrapper = shallow(
  <Header />
)

describe('Header', () => {
  test('Header should return a Header tag element', () => {
    expect(wrapper.find('header').type()).toBe('header')
  })
})
