import React from 'react'
import PropTypes from 'prop-types'

// styles
import './Button.scss'

export const Button = props =>
  <button
    className={props.className}
    name={props.name}
    onBlur={props.onBlur}
    onClick={props.onClick}
    type={props.type || 'button'}
  >
    {props.title}
  </button>

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string
}
