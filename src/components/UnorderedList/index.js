import styled from 'styled-components'

const UnorderedList = styled.ul`
  &.hide-ul-menu {
    display: none;
  }
  
  &.show-ul-menu {
    background: #FFF;
    border: 2px solid #F6F6F6;
    border-radius: 8px;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    height: auto;
    letter-spacing: 0.08em;
    margin-bottom: 18px;
    padding-left: 15px;
    position: absolute;
    text-align: left;
    width: 100%;
    z-index: 1;
  
    & li {
      height: 58px;
      line-height: 58px;
    }
  }

  @media (max-width: 480px) {
    &.show-ul-menu {
      border-radius: 0;
      height: auto;
      margin-top: -18px;
      max-width: 100%;
      position: inherit;
      width: 100%;
    }
  }

  @media (min-width: 1200px) {
    &.show-ul-menu {
      border-radius: 0;
      height: auto;
      margin-top: -27px;
      max-width: 270px;
    }

    &.currencies {
      width: 107px;
    }
  }
`

export default UnorderedList
