import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../config'

// components
import CallToActionButton from '../components/Buttons/CallToActionButton'
import Category from '../components/Category'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from '../components/Image'
import Search from '../components/Search'

// styles
import './index-page.scss'

const StyledIndexPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: .35s ease;

  &.toggle {
    left: 200px;
    position: fixed;
  }
`

const mapStateToProps = state => ({
  items: state.itemsReducer.items
})

class IndexPage extends Component {
  fetchData () {
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
      <StyledIndexPage
        id='wrapper'
      >
        <Header />

        <Search />

        <div className='categories'>
          <Category />
          <Category />
          <Category />
          <Category />
        </div>

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

        <Link
          className='publish-item-button-link'
          to={{ pathname: '/item/add' }}
        >
          <CallToActionButton
            title='Post an ad'
          />
        </Link>
      </StyledIndexPage>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
