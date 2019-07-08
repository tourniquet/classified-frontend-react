import React, { Component } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import BrowserMeta from '../../components/BrowserMeta/BrowserMeta'
import ItemsList from '../../components/ItemsList/ItemsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'

class Subcategory extends Component {
  state = {
    items: [],
    page: null,
    totalItems: null,
    subcategory: null
  }

  fetchItems () {
    const { params } = this.props.match
    const { subcategory } = params
    const pageNumber = params.pageNumber || 1
    const url = `${apiHost}/subcategory.php?subcategory=${subcategory}&page=${pageNumber}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result.items,
          page: result.page,
          totalItems: result.total,
          subcategory
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchItems()
    }
  }

  render () {
    const { items, page, totalItems, subcategory } = this.state

    return (
      <>
        <BrowserMeta title={subcategory} />

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

export default Subcategory
