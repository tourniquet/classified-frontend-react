import { Helmet } from 'react-helmet'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Footer from '../../components/Footer/Footer'
import ItemsList from '../../components/ItemsList/ItemsList'
import NavBar from '../../components/NavBar/NavBar'
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
      <Fragment>
        <Helmet>
          <title>{subcategory}</title>
        </Helmet>

        <NavBar />

        <Search />

        <ItemsList items={items} />

        <Footer />
      </Fragment>
    )
  }
}

export default Subcategory
