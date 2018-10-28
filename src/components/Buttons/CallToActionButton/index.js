import styled from 'styled-components'

import Button from '../Button'

const CallToActionButton = styled(Button)`
  @media (max-width: 480px) {
    background-color: #E7774A;
    border: 0;
    bottom: 0;
    color: white;
    font-size: 16px;
    height: 40px;
    left: 0;
    line-height: 40px;
    position: fixed;
    text-align: center;
    text-decoration: none;
    width: 100%;
    z-index: 1;
  }
`

export default CallToActionButton
