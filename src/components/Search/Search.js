import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Input from '../Input'

// styles
import './Search.scss'

const mapStateToProps = state => ({
  search: state.search
})

const Search = props => {
  const setSearchText = el => ({
    type: 'SET_SEARCH_TEXT',
    text: el.target.value
  })

  return (
    <Input
      className='search'
      placeholder='Im looking for...'
      value={props.search}
      type='search'
      aria-label='Search through site content'
      onChange={el => props.dispatch(setSearchText(el))}
    />
  )
}

Search.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  'aria-label': PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Search)
