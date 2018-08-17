import React from 'react'
import PropTypes from 'prop-types'

// styles
import './Label.scss'

export const Label = props => {
  const { className, htmlFor, title, style, children } = props

  return (
    <label
      className={`label ${className}`}
      htmlFor={htmlFor}
      style={style}
    >
      {title}
      {children}
    </label>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.element
}
