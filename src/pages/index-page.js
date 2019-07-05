import { Link } from 'react-router-dom'
import React, { Component } from 'react'

// API host config
import { apiHost } from '../config'

// components
import CallToActionButton from '../components/Buttons/CallToActionButton/CallToActionButton'
import Category from '../components/Category/Category'
import ItemsList from '../components/ItemsList/ItemsList'
import Pagination from '../components/Pagination/Pagination'
import Search from '../components/Search/Search'

// styles
import './index-page.scss'

class IndexPage extends Component {
  state = {
    categories: [],
    subcategories: [],
    items: [],
    page: null,
    totalItems: null
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
    const pageNumber = this.props.match.params.page || 1

    window
      .fetch(`${apiHost}/index.php?page=${pageNumber}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.items,
          page: data.page,
          totalItems: data.total
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchSubcategories()
    this.fetchItems()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchItems()
    }
  }

  render () {
    const { categories, subcategories, items, page, totalItems } = this.state

    return (
      <>
        <Search />

        <div className='categories'>
          {categories && categories.map(category =>
            <Category
              key={category.id.toString()}
              id={category.id}
              subcategories={subcategories}
              title={category.title}
            />
          )}
        </div>

        <ItemsList items={items} />

        <Pagination
          pageNumber={page}
          totalItems={totalItems}
        />

        <Link
          className='publish-item-button-link'
          to={{ pathname: '/item/add' }}
        >
          <CallToActionButton
            id='call-to-action'
            title='Post an ad'
          />
        </Link>
      </>
    )
  }
}

export default IndexPage
