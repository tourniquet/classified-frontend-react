import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import Footer from '../../../components/Footer/Footer'
import ItemsList from '../../../components/ItemsList/ItemsList'
import NavBar from '../../../components/NavBar/NavBar'
import Search from '../../../components/Search/Search'

class UserItems extends Component {
  state = {
    items: []
  }

  fetchData () {
    const cookies = window.document.cookie.split('; ')
    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)

    const userEmail = getCookies('email').toString().replace('email=', '')
    const userId = getCookies('id').toString().replace('id=', '')

    const url = `${apiHost}/user/items.php`
    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userEmail, userId })
    })
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const { items } = this.state

    return (
      <div>
        <NavBar />

        <Search />

        <ItemsList items={items} />

        <Footer />
      </div>
    )
  }
}

export default UserItems
