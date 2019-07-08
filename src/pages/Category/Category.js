import { Helmet } from 'react-helmet'
import React, { Component } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import ItemsList from '../../components/ItemsList/ItemsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'

class Category extends Component {
  state = {
    category: null,
    items: [],
    page: null,
    totalItems: null
  }

  fetchItems () {
    const { params } = this.props.match
    const { category } = params
    const pageNumber = params.pageNumber || 1
    const url = `${apiHost}/category.php?category=${category}&page=${pageNumber}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          category,
          items: result.items,
          page: result.page,
          totalItems: result.total
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchItems()
    }
  }

  render () {
    const { category, items, page, totalItems } = this.state

    return (
      <>
        <Helmet>
          <title>{category}</title>
        </Helmet>

        <Search />

        <ItemsList items={items} />

        <Pagination
          pageNumber={page}
          totalItems={totalItems}
        />
      </>
    )
  }
}

export default Category
