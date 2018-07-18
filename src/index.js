import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// reset standard browser styles
import './components/index-page.scss'

// components
import IndexPage from './components/index-page'
import ItemNew from './components/item-new'
import Item from './components/item'

// reducer
import itemReducer from './store/itemReducer'
import itemsReducer from './store/itemsReducer'
import newItemReducer from './store/newItemReducer'

const rootReducer = combineReducers({
  itemReducer,
  itemsReducer,
  newItemReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <div className='container'>
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/item/add' component={ItemNew} />
        <Route path='/item/:url(\d+)' component={Item} />
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
