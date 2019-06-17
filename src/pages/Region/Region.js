import { Helmet } from 'react-helmet'
import React, { Component, Fragment } from 'react'

/** API host config */
import { apiHost } from '../../config'

/** components */
import Footer from '../../components/Footer/Footer'
import ItemsList from '../../components/ItemsList/ItemsList'
import NavBar from '../../components/NavBar/NavBar'
import Search from '../../components/Search/Search'

class Region extends Component {
  constructor (props) {
    super(props)

    this.state = {
      region: null,
      items: []
    }
  }

  fetchItems () {
    const region = this.props.match.params.region
    const url = `${apiHost}/region.php?region=${region}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(items => {
        this.setState({
          region,
          items
        })
      })
  }

  componentDidMount () {
    this.fetchItems()
  }

  render () {
    const { items, region } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>{region}</title>
        </Helmet>

        <NavBar />

        <Search />

        <ItemsList items={items} />

        <Footer />
      </Fragment>
    )
  }
}

export default Region
