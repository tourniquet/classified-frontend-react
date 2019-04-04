import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import ListItem from '../../components/ListItem/ListItem'
import Search from '../../components/Search'

class Category extends Component {
  constructor (props) {
    super(props)

    this.state = { items: [] }
  }

  fetchItems () {
    const getUrl = this.props.match.params.category
    const url = `${apiHost}/category.php?url=${getUrl}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => this.setState({ items: result }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchItems()
  }

  render () {
    const items = this.state.items

    return (
      <Fragment>
        <Header />

        <Search />

        <div className='items-list'>
          <ul className='latest-ads'>
            {items && items.map(item => <ListItem item={item} />)}
          </ul>
        </div>

        <Footer />
      </Fragment>
    )
  }
}

export default Category
