import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import ItemsList from '../../../components/ItemsList/ItemsList'
import Pagination from '../../../components/Pagination/Pagination'
import Search from '../../../components/Search/Search'

class UserItems extends Component {
  state = {
    items: [],
    page: null,
    totalItems: null
  }

  fetchData () {
    const { params } = this.props.match

    const cookies = window.document.cookie.split('; ')
    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)

    const userEmail = getCookies('email').toString().replace('email=', '')
    const userId = getCookies('id').toString().replace('id=', '')

    const { pageNumber } = params || 1
    const url = `${apiHost}/user/items.php?page=${pageNumber}`

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userEmail, userId })
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result.items,
          page: result.page,
          totalItems: result.total
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchData()
    }
  }

  render () {
    const { items, page, totalItems } = this.state

    return (
      <>
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

export default UserItems
