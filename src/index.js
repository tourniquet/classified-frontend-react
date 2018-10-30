import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// reset standard browser styles
import './reset.scss'
import './index.scss'

// components
import IndexPage from './pages/index-page'
import ItemNew from './pages/Item/New/item-new'
import Item from './pages/Item/item'
import UserLogin from './pages/User/Login/user-login'
import UserRegistration from './pages/User/Registration/user-registration'

// reducers
import itemReducer from './reducers/itemReducer'
import itemsReducer from './reducers/itemsReducer'
import newItemReducer from './reducers/newItemReducer'
import searchReducer from './reducers/searchReducer'
import registrationReducer from './reducers/registrationReducer'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
  itemReducer,
  itemsReducer,
  newItemReducer,
  searchReducer,
  registrationReducer,
  loginReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route path='/' exact component={IndexPage} />
      <Route path='/item/add' component={ItemNew} />
      <Route path='/item/:url(\d+)' component={Item} />
      <Route path='/user/login' component={UserLogin} />
      <Route path='/user/registration' component={UserRegistration} />
    </Switch>
  </Provider>
)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#container')
)
