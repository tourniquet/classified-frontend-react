import { Helmet } from 'react-helmet'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Footer from '../../components/Footer/Footer'
import ListItem from '../../components/ListItem/ListItem'
import NavBar from '../../components/NavBar/NavBar'
import Search from '../../components/Search/'

class Subcategory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      subcategory: null
    }
  }

  fetchItems () {
    const subcategory = this.props.match.params.subcategory
    const url = `${apiHost}/subcategory.php?subcategory=${subcategory}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result,
          subcategory
        })
      })
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

export default Subcategory
