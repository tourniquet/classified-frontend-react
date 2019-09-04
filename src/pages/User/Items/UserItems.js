import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import ItemsList from '../components/ItemsList/ItemsList'
import Pagination from '../../../components/Pagination/Pagination'
import Search from '../../../components/Search/Search'

// utils
import * as api from '../../../utils/cookieUtils'

class UserItems extends Component {
  state = {
    items: [],
    page: null,
    totalItems: null
  }

  fetchData () {
    const { params } = this.props.match

    const userEmail = api.getCookies('email').toString().replace('email=', '')
    const userId = api.getCookies('id').toString().replace('id=', '')

    const pageNumber = params.pageNumber || 1
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

  changeItemStatus = itemId => {
    const userEmail = api.getCookies('email').toString().replace('email=', '')
    const userId = api.getCookies('id').toString().replace('id=', '')

    const url = `${apiHost}/user/change-item-status.php`
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userEmail, userId, itemId })
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success!') {
          this.fetchData()
        }
      })
      .catch(err => console.error(err))
  }

  renewItem = itemId => {
    const userEmail = api.getCookies('email').toString().replace('email=', '')
    const userId = api.getCookies('id').toString().replace('id=', '')

    const url = `${apiHost}/user/renew-item.php`
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userEmail, userId, itemId })
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success!') {
          this.fetchData()
        }
      })
      .catch(err => console.error(err))
  }

  removeItem = itemId => {
    const userEmail = api.getCookies('email').toString().replace('email=', '')
    const userId = api.getCookies('id').toString().replace('id=', '')

    const url = `${apiHost}/user/remove-item.php`
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userEmail, userId, itemId })
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success!') {
          this.fetchData()
        }
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

        <ItemsList
          items={items}
          removeItem={this.removeItem}
          renewItem={this.renewItem}
          changeItemStatus={this.changeItemStatus}
        />

        <Pagination
          pageNumber={page}
          totalItems={totalItems}
        />
      </>
    )
  }
}

export default UserItems
