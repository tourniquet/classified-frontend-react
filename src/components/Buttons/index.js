import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ className, onBlur, onClick, type, style, title, children }) =>
  <button
    className={className}
    onBlur={onBlur}
    onClick={onClick}
    type={type || 'button'}
    style={style}
  >
    {title}
    { children && children }
  </button>

Button.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string
}

export default Button
