import { Helmet } from 'react-helmet'
import React, { Component } from 'react'

/** API host config */
import { apiHost } from '../../config'

/** components */
import ItemsList from '../../components/ItemsList/ItemsList'
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
      <>
        <Helmet>
          <title>{region}</title>
        </Helmet>

        <Search />

        <ItemsList items={items} />
      </>
    )
  }
}

export default Region
