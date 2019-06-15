import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../config'

// components
import CallToActionButton from '../components/Buttons/CallToActionButton/CallToActionButton'
import Category from '../components/Category/Category'
import Footer from '../components/Footer/Footer'
import ListItem from '../components/ListItem/ListItem'
import NavBar from '../components/NavBar/NavBar'
import Search from '../components/Search/Search'

// styles
import './index-page.scss'

class IndexPage extends Component {
  state = {
    categories: [],
    subcategories: [],
    items: []
  }

  fetchCategories () {
    window
      .fetch(`${apiHost}/categories.php`)
      .then(response => response.json())
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err))
  }

  fetchSubcategories () {
    window
      .fetch(`${apiHost}/subcategories.php`)
      .then(response => response.json())
      .then(subcategories => this.setState({ subcategories }))
      .catch(err => console.error(err))
  }

  fetchItems () {
    window
      .fetch(`${apiHost}`)
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchSubcategories()
    this.fetchItems()
  }

  render () {
    const { categories, subcategories, items } = this.state

    return (
      <Fragment>
        <NavBar />

        <Search />

        <div className='categories'>
          { categories && categories.map(el =>
            <Category
              key={el.id.toString()}
              id={el.id}
              subcategories={subcategories}
              title={el.title}
            />
          )}
        </div>

        <div className='items-list'>
          <ul className='latest-ads'>
            {items && items.map(item => <ListItem item={item} />)}
          </ul>
        </div>

        <Footer />

        <Link
          className='publish-item-button-link'
          to={{ pathname: '/item/add' }}
        >
          <CallToActionButton
            id='call-to-action'
            title='Post an ad'
          />
        </Link>
      </Fragment>
    )
  }
}

export default IndexPage
