import React from 'react'
import { shallow } from 'enzyme'
import { createStore } from 'redux'

import ConnectedApp from './Search'

import reducer from '../../config/reducer'
const store = createStore(reducer)

const wrapper = shallow(
  <ConnectedApp store={store} />
).dive()

describe('Search', () => {
  test('Search should return an input element', () => {
    expect(wrapper.find('input').type()).toBe('text')
  })
})
