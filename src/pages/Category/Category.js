import { Helmet } from 'react-helmet'
import React, { Component } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import ItemsList from '../../components/ItemsList/ItemsList'
import Search from '../../components/Search/Search'

class Category extends Component {
  constructor (props) {
    super(props)

    this.state = {
      category: null,
      items: []
    }
  }

  fetchItems () {
    const category = this.props.match.params.category
    const url = `${apiHost}/category.php?category=${category}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          category,
          items: result
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  render () {
    const { category, items } = this.state

    return (
      <>
        <Helmet>
          <title>{category}</title>
        </Helmet>

        <Search />

        <ItemsList items={items} />
      </>
    )
  }
}

export default Category
