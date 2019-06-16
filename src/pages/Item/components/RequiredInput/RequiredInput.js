import React from 'react'
import styled from 'styled-components'

const InputStyled = styled.input`
  border: 1px solid #FFF1;
  height: 0;
  outline: 0;
  outline-offset: 0;
  width: 0;
`

// TODO: This must be a temporary solution! I'm serious!
const RequiredInput = props =>
  <InputStyled
    required
    type='text'
    value={`${props.value}`}
  />

export default RequiredInput
