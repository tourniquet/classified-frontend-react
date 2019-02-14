import styled from 'styled-components'

import Button from '..'

const CallToActionButton = styled(Button)`
  background-color: #E7774A;
  border: 0;
  bottom: 0;
  color: white;
  display: block;
  font-size: 16px;
  height: 40px;
  left: 0;
  line-height: 40px;
  position: fixed;
  text-align: center;
  text-decoration: none;
  width: 100%;
  z-index: 1;

  @media (min-width: 481px) {
    display: none;
  }
`

export default CallToActionButton
