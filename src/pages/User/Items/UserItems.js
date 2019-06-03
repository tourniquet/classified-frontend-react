import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

// API host config
import { apiHost } from '../../../config'

// components
import Footer from '../../../components/Footer/Footer'
import Image from '../../../components/Image/Image'
import NavBar from '../../../components/NavBar/NavBar'
import Search from '../../../components/Search'

const mapStateToProps = state => ({
  items: state.itemsReducer.items
})

class UserItems extends Component {
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
      .then(result => {
        this.props.dispatch({
          type: 'FETCH_DATA',
          result
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const items = this.props.items
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    return (
      <div>
        <NavBar />

        <Search />

        <div className='items-list'>
          <ul className='latest-ads'>
            {items.map(el => (
              <li
                className='latest-ads-item'
                key={el.id.toString()}
              >
                <Image
                  className='thumbnail'
                  src='/img/camera.png'
                  title=''
                  alt='Particular lists thumbnail'
                />
                <Link
                  key={el.id}
                  to={{ pathname: `/item/${el.url}` }}
                  className='ad-title'
                >
                  {el.title}
                </Link>
                <span className='ad-category'>category</span>
                <span className='ad-date'>
                  {new Date(el.published).toLocaleDateString('en-GB', dateOptions)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserItems)
