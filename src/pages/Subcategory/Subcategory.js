import React, { Component } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import BrowserMeta from '../../components/BrowserMeta/BrowserMeta'
import ItemsList from '../../components/ItemsList/ItemsList'
import Search from '../../components/Search/Search'

class Subcategory extends Component {
  state = {
    items: [],
    subcategory: null
  }

  fetchItems () {
    const subcategory = this.props.match.params.subcategory
    const url = `${apiHost}/subcategory.php?subcategory=${subcategory}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(items => this.setState({ items, subcategory }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  render () {
    const { items, subcategory } = this.state

    return (
      <>
        <BrowserMeta title={subcategory} />

        <Search />

        <ItemsList items={items} />
      </>
    )
  }
}

export default Subcategory
