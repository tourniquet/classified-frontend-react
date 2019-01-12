import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Image from '../../components/Image'
import Search from '../../components/Search'

const mapStateToProps = state => ({
  items: state.searchResultsReducer.items
})

const StyledSearchPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

class SearchResult extends Component {
  fetchResults () {
    const url = `${apiHost}/search.php`

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.props.match.params.query)
    })
      .then(response => response.json(response))
      .then(result => {
        this.props.dispatch({
          type: 'FETCH_RESULTS',
          result
        })
      })
  }

  componentDidMount () {
    this.fetchResults()
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
      <StyledSearchPage>
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

export default connect(mapStateToProps)(SearchResult)
