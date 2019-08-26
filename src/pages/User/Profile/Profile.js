import { Helmet } from 'react-helmet'
import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import ItemsList from '../../../components/ItemsList/ItemsList'
import Pagination from '../../../components/Pagination/Pagination'

class UserProfile extends Component {
  state = {
    items: [],
    page: null,
    totalItems: null
  }

  fetchItems = () => {
    const id = this.props.match.params.id
    const pageNumber = this.props.match.params.pageNumber || 1
    const url = `${apiHost}/profile.php?id=${id}&page=${pageNumber}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.items,
          page: data.page,
          totalItems: data.total
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    this.fetchItems()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchItems()
    }
  }

  render () {
    const { items, page, totalItems } = this.state

    return (
      <>
        <Helmet>
          {/* TODO: I think title should looks like user-name | site-name */}
          <title>title</title>
        </Helmet>

        <ItemsList items={items} />

        <Pagination
          pageNumber={page}
          totalItems={totalItems}
        />
      </>
    )
  }
}

export default UserProfile
