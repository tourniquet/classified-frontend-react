import { combineReducers, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import ReactGA from 'react-ga'

// import Google Analytics Tracking ID
import { trackingID } from './config'

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
import UserLogin from './pages/User/Login/UserLogin'
import UserRegistration from './pages/User/Registration/user-registration'
import Wrapper from './components/Wrapper/Wrapper'

// reducers
import sideMenuReducer from './reducers/sideMenuReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  sideMenuReducer,
  userReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// initialize Google Analytics
ReactGA.initialize(trackingID)

const history = createBrowserHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

class App extends Component {
  componentDidMount () {
    ReactGA.pageview(window.location.pathname)
  }

  render () {
    return (
      <Provider store={store}>
        <Wrapper>
          <Switch>
            <Redirect from='/' to='/home/page/1' exact />
            <Route path='/home/:page(page)?/:pageNumber(\d+)?' component={IndexPage} />
            <Route path='/category/:category/:pageNumber(\d+)?' component={Category} />
            <Route path='/item/:url(\d+)' component={Item} />
            <Route path='/item/add' component={ItemNew} />
            <Route path='/search/:query/:pageNumber(\d+)' component={SearchResults} />
            <Route path='/user/login' component={UserLogin} />
            <Route path='/user/registration' component={UserRegistration} />
            <Route path='/user/items/:pageNumber(\d+)' component={UserItems} />
            <Route path='/region/:region/:pageNumber(\d+)' component={Region} />
            <Route path='/:category/:subcategory/:pageNumber(\d+)?' component={Subcategory} />
          </Switch>
        </Wrapper>
      </Provider>
    )
  }
}

render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector('#container')
)
