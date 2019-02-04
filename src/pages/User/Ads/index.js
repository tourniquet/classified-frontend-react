import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Search from '../../../components/Search'

const mapStateToProps = state => ({
  email: state.userReducer.email,
  id: state.userReducer.id
})

class UserAds extends Component {
  fetchData () {
    // const data = {
    //   email: this.props.email,
    //   password: this.props.password
    // }

    const url = `${apiHost}/`
    // method: 'POST',
    // body: JSON.stringify(data)
    window.fetch(url)
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
        <Header />

        <Search />

        <div className='items-list'>
          <ul className='latest-ads'>
            {items.map(el => (
              <li
                className='latest-ads-item'
                key={el.id.toString()}
              >
                <Image
                  className='favourite-ad'
                  src='/img/star.png'
                  title=''
                  alt=''
                />
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

export default connect(mapStateToProps)(UserAds)
