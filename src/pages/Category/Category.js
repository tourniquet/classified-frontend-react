import React, { Component } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import BrowserMeta from '../../components/BrowserMeta/BrowserMeta'
import ItemsList from '../../components/ItemsList/ItemsList'
import Search from '../../components/Search/Search'

class Category extends Component {
  state = {
    category: null,
    items: []
  }

  fetchItems () {
    const category = this.props.match.params.category
    const url = `${apiHost}/category.php?category=${category}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(items => this.setState({ category, items }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  render () {
    const { category, items } = this.state

    return (
      <>
        <BrowserMeta title={category} />

        <Search />

        <ItemsList items={items} />
      </>
    )
  }
}

export default Category
