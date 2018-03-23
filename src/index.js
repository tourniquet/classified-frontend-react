import React from 'react'
import { render } from 'react-dom'

// components
import IndexPage from './components/index-page'

const App = () => (
  <div>
    <IndexPage />
  </div>
)

render(
  <App />,
  document.querySelector('#container')
)
