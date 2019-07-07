import { Helmet } from 'react-helmet'
import React, { Component } from 'react'

/** API host config */
import { apiHost } from '../../config'

/** components */
import ItemsList from '../../components/ItemsList/ItemsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'

class Region extends Component {
  state = {
    items: [],
    page: null,
    region: null,
    totalItems: null
  }

  fetchItems () {
    const { params } = this.props.match
    const { region } = params
    const pageNumber = params.pageNumber || 1
    const url = `${apiHost}/region.php?region=${region}&page=${pageNumber}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result.items,
          region,
          page: result.page,
          totalItems: result.total
        })
      })
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
    const { items, page, region, totalItems } = this.state

    return (
      <>
        <Helmet>
          <title>{region}</title>
        </Helmet>

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

export default Region
