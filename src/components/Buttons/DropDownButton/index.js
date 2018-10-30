import styled from 'styled-components'

import Button from '..'

const DropDownButton = styled(Button)`
  display: block;
  background: #FFF;
  border: 2px solid #F6F6F6;
  border-radius: 8px;
  height: 58px;
  width: 100%;
  padding-left: 15px;
  margin-bottom: 18px;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-align: left;
  position: relative;

  & i {
    border: solid black;
    border-width: 0 2px 2px 0;
    border-radius: 1px;
    padding: 3px;
    position: absolute;
    right: 20px;
    top: 24px;
  }

  &.active-tab {
    background: #F6F6F6;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    i {
      transform: rotate(-135deg);
    }
  }

  &.inactive-tab {
    i {
      transform: rotate(45deg);
    }
  }

  @media (max-width: 480px) {

  }

  @media (min-width: 1200px) {
    &.desktop-button {
      margin-bottom: 25px;
      width: 75%;
    }
  }
`

export default DropDownButton
