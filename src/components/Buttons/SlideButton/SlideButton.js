import React from 'react'
import styled from 'styled-components'

const StyledSlideButton = styled.div`
  background: transparent;
  border-color: white;
  border-image: initial;
  border-style: solid;
  border-width: 4px 0 0 4px;
  height: 25px;
  left: -40px;
  padding: 3px;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  width: 25px;

  &.arrow-right {
    border-width: 0 4px 4px 0;
    left: unset;
    right: -40px;
  }

  @media (max-width: 480px) {
    &.mobile-arrow-left {
      left: 15px;
    }

    &.mobile-arrow-right {
      left: unset;
      right: 15px;
      transform: rotate(135deg);
    }
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
