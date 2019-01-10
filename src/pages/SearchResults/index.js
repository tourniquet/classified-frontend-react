import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

// API host config
import { apiHost } from '../../config'

// components
// import Search from '../../components/Search'

const mapStateToProps = state => ({
  items: state.searchResultsReducer.items
})

class SearchResult extends Component {
  fetchData () {
    const url = `${apiHost}/search.php`

    window.fetch(url)
      .then(response => response.json(response))
      .then(result => {
        this.props.dispatch({
          type: 'FETCH_DATA',
          result
        })
      })
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    return (
      <div>
        <p>{this.props.items}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(SearchResult)
