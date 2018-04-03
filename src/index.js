import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// temporary styles from Bootstrap
import './styles/bootstrap.css'

// components
import IndexPage from './components/index-page'
import ItemNew from './components/item-new'
import Item from './components/item'

// reducer
import reducer from './reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <div className='container'>
      <Switch>
        <Route exact path='/' component={IndexPage} />
        <Route path='/item-new' component={ItemNew} />
        <Route path='/:id' component={Item} />
      </Switch>
    </div>
  </Provider>
)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#container')
)
