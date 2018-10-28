import styled from 'styled-components'

import Button from '../Button'

const DropDownButton = styled(Button)`
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
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    i {
      transform: rotate(-135deg);
    }
  }

  &.inactive-tab {
    i {
      transform: rotate(45deg);
    }
  }
`

export default DropDownButton
