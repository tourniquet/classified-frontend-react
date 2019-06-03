import styled from 'styled-components'

import Button from '..'

const SearchButton = styled(Button)`
  height: 76px;
  background: #FFF;
  border: 1px solid #F6F6F6;
  width: 100px;

  &.active {
    background: #E26433;
    border: none;
    color: #FFF;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export default SearchButton
