import React from 'react'
import styled from 'styled-components'

const StyledSlideButton = styled.div`
  background: green;
  height: 50px;
  margin-top: -25px;
  position: absolute;
  top: 50%;
  width: 50px;

  &.arrow-left,
  &.arrow-right {
    margin-top: unset;
    top: unset;
  }
`

const SlideButton = ({ className, onClick, style }) => (
  <StyledSlideButton
    className={className}
    onClick={onClick}
    style={style}
  />
)

export default SlideButton
