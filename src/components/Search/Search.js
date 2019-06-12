import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
  width: 100%;

  @media (min-width: 480px) {
    width: calc(100% - 100px);
  }
`

class Search extends Component {
  state = {
    inputValue: ''
  }

  handleInputValue = el => {
    this.setState({ inputValue: el.target.value })
  }

  redirectToResults = () => {
    const query = this.state.inputValue.replace(/,/g, '').replace(/\s+/g, ',')
    const url = `/search/${query}`

    if (query.length) this.props.history.push(url)
  }

  render () {
    const { inputValue } = this.state

    return (
      <StyledContainer>
        <StyledInput
          className='search'
          id='search'
          placeholder='Im looking for...'
          value={inputValue}
          type='search'
          aria-label='Search through site content'
          onChange={this.handleInputValue}
          onKeyDown={el => {
            if (el.keyCode === 13 && el.target.value) this.redirectToResults()
          }}
        />

        <SearchButton
          className={
            inputValue.length
              ? 'active'
              : 'inactive'
          }
          onClick={this.redirectToResults}
        >
          Search
        </SearchButton>
      </StyledContainer>
    )
  }
}

Search.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  'aria-label': PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default withRouter(Search)
