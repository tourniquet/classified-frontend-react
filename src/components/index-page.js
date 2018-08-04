import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// API host config
import { apiHost } from '../config'

// components
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { Image } from './Image/Image'
import Search from './Search/Search'

const mapStateToProps = state => ({
  items: state.itemsReducer.items
})

class IndexPage extends Component {
  fetchData = () => {
    window
      .fetch(`${apiHost}`)
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

        <ul className='latest-ads'>
          {items.map((el, i) => (
            <li
              className='latest-ads-item'
              key={i.toString()}
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
                alt=''
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

        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
