import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// components
import Input from '../Input/Input'
import SearchButton from '../Buttons/SearchButton/SearchButton'

const StyledContainer = styled.div``

const StyledInput = styled(Input)`
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #F6F6F6;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  display: inline-block;
  height: 76px;
  margin-bottom: 40px;
  padding: 0 30px;
  width: calc(100% - 100px);

  @media (max-width: 480px) {
    width: 100%;
  }
`

const mapStateToProps = state => ({
  search: state.searchReducer.value
})

const Search = props => {
  const setSearchText = el => ({
    type: 'SET_SEARCH_TEXT',
    text: el.target.value
  })

  const redirectToResults = () => {
    const query = props.search.replace(/,/g, '').replace(/\s+/g, ',')
    const url = `/search/${query}`

    if (query.length) props.history.push(url)
  }

  return (
    <StyledContainer>
      <StyledInput
        className='search'
        placeholder='Im looking for...'
        value={props.search}
        type='search'
        aria-label='Search through site content'
        onChange={el => props.dispatch(setSearchText(el))}
        onKeyDown={el => {
          if (el.keyCode === 13 && el.target.value) redirectToResults()
        }}
      />

      <SearchButton
        className={
          props.search.length
            ? 'active'
            : 'inactive'
        }
        onClick={redirectToResults}
      >
        Search
      </SearchButton>
    </StyledContainer>
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
