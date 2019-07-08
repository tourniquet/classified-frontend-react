import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton/CallToActionButton'
import ItemsList from '../../components/ItemsList/ItemsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'

const StyledSearchPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

class SearchResult extends Component {
  state = {
    items: [],
    page: null,
    totalItems: null
  }

  fetchResults () {
    const { params } = this.props.match

    const pageNumber = params.pageNumber || 1
    const url = `${apiHost}/search.php?page=${pageNumber}`

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params.query)
    })
      .then(response => response.json(response))
      .then(result => {
        this.setState({
          items: result.items,
          page: result.page,
          totalItems: result.total
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchResults()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchResults()
    }
  }

  render () {
    const { items, page, totalItems } = this.state

    return (
      <StyledSearchPage>
        <Search />

        <ItemsList items={items} />

        <Pagination
          pageNumber={page}
          totalItems={totalItems}
        />

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
