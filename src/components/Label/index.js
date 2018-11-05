import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 18px;

  &.mandatory::after {
    content: "*";
    color: red;
  }

  &.display-block {
    display: block;
  }
`

const Label = props => {
  const { className, htmlFor, title, style, children } = props

  return (
    <StyledLabel
      className={`label ${className}`}
      htmlFor={htmlFor}
      style={style}
    >
      {title}
      {children}
    </StyledLabel>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.element
}

export default Label
