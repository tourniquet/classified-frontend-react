import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// API host config
import { apiHost } from '../config'

// components
import Header from './Header/Header'
import Footer from './Footer/Footer'

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

        <ul className='latest-ads'>
          {items.map((el, i) => (
            <li
              className='latest-ads-item'
              key={i.toString()}
            >
              <span className='star'>S</span>
              <span className='image'>I</span>
              <span className='ad-title'>
                <Link
                  key={el.id}
                  to={{ pathname: `/item/${el.url}` }}
                >
                  {el.title}
                </Link>
              </span>
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
