import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton/CallToActionButton'
import Footer from '../../components/Footer/Footer'
import Image from '../../components/Image/Image'
import NavBar from '../../components/NavBar/NavBar'
import Search from '../../components/Search/Search'

const StyledSearchPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

class SearchResult extends Component {
  state = {
    items: []
  }

  fetchResults () {
    const url = `${apiHost}/search.php`

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.props.match.params.query)
    })
      .then(response => response.json(response))
      .then(items => this.setState({ items }))
  }

  componentDidMount () {
    this.fetchResults()
  }

  render () {
    const { items } = this.state
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    return (
      <StyledSearchPage>
        <NavBar />

        <Search />

        <div className='items-list'>
          <ul className='latest-ads'>
            {items.map(item => (
              <li
                className='latest-ads-item'
                key={item.id.toString()}
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
                  key={item.id}
                  to={{ pathname: `/item/${item.url}` }}
                  className='ad-title'
                >
                  {item.title}
                </Link>
                <span className='ad-category'>category</span>
                <span className='ad-date'>
                  {new Date(item.published).toLocaleDateString('en-GB', dateOptions)}
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
      </StyledSearchPage>
    )
  }
}

export default SearchResult
