import React from 'react'
import styled from 'styled-components'

const StyledMessage = styled.p`
  margin-bottom: 18px;

  &.error-message {
    color: red;
  }

  &.success-message {
    color: green;
  }
`

const Message = props =>
  <StyledMessage
    className={`message ${props.className}`}
    message={props.message}
  >
    {props.message}
  </StyledMessage>

export default Message
