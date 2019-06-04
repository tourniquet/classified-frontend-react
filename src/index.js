import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// reset standard browser styles
import './reset.scss'

// components
import Category from './pages/Category/Category'
import IndexPage from './pages/index-page'
import Item from './pages/Item/item'
import ItemNew from './pages/Item/New/item-new'
import Region from './pages/Region/Region'
import SearchResults from './pages/SearchResults/SearchResults'
import Subcategory from './pages/Subcategory/Subcategory'
import UserItems from './pages/User/Items/UserItems'
import UserLogin from './pages/User/Login'
import UserRegistration from './pages/User/Registration/user-registration'
import Wrapper from './components/Wrapper/Wrapper'

// reducers
import itemReducer from './reducers/itemReducer'
import itemsReducer from './reducers/itemsReducer'
import loginReducer from './reducers/loginReducer'
import newItemReducer from './reducers/newItemReducer'
import registrationReducer from './reducers/registrationReducer'
import searchReducer from './reducers/searchReducer'
import searchResultsReducer from './reducers/searchResultsReducer'
import sideMenuReducer from './reducers/sideMenuReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  itemReducer,
  itemsReducer,
  loginReducer,
  newItemReducer,
  registrationReducer,
  searchReducer,
  searchResultsReducer,
  sideMenuReducer,
  userReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <Wrapper>
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/item/:url(\d+)' component={Item} />
        <Route path='/item/add' component={ItemNew} />
        <Route path='/search/:query' component={SearchResults} />
        <Route path='/user/login' component={UserLogin} />
        <Route path='/user/registration' component={UserRegistration} />
        <Route path='/user/items' component={UserItems} />
        <Route path='/region/:region' component={Region} />
        <Route path='/:category/:subcategory' component={Subcategory} />
        <Route path='/:category' component={Category} />
      </Switch>
    </Wrapper>
  </Provider>
)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#container')
)
