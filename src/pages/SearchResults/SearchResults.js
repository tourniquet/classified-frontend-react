import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton/CallToActionButton'
import Footer from '../../components/Footer/Footer'
import ItemsList from '../../components/ItemsList/ItemsList'
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

    return (
      <StyledSearchPage>
        <NavBar />

        <Search />

        <ItemsList items={items} />

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
