import React from 'react'
import { connect } from 'react-redux'

// components
import Input from '../Input/Input'

// styles
import './Search.scss'

const mapStateToProps = state => {
  return {
    search: state.search
  }
}

const Search = props => {
  const setSearchText = el => {
    return {
      type: 'SET_SEARCH_TEXT',
      text: el.target.value
    }
  }

  return (
    <Input
      className='search'
      placeholder='Im looking for...'
      value={props.search}
      onChange={el => props.dispatch(setSearchText(el))}
    />
  )
}

export default connect(mapStateToProps)(Search)
