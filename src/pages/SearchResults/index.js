import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
import Search from '../../components/Search'

const mapStateToProps = state => ({
  items: state.searchResultsReducer.items
})

class SearchResult extends Component {
  fetchResults () {
    const url = `${apiHost}/search.php`

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.props.match.params.query)
    })
      .then(response => response.json(response))
      .then(result => {
        console.log(result)

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
    return (
      <div>
        <Search />
        <p>this.props.items</p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(SearchResult)
