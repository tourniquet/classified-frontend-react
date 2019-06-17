import { Helmet } from 'react-helmet'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Footer from '../../components/Footer/Footer'
import ItemsList from '../../components/ItemsList/ItemsList'
import NavBar from '../../components/NavBar/NavBar'
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
      <Fragment>
        <Helmet>
          <title>{category}</title>
        </Helmet>

        <NavBar />

        <Search />

        <ItemsList items={items} />

        <Footer />
      </Fragment>
    )
  }
}

export default Category
