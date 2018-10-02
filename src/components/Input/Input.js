import React from 'react'
import PropTypes from 'prop-types'

// styles
import './Input.scss'

const Input = props =>
  <input
    className={`input ${props.className}`}
    name={props.name}
    placeholder={props.placeholder}
    inputmode={props.inputmode}
    type={props.type || 'text'}
    multiple={props.multiple}
    accept={props.accept}
    value={props.value}
    aria-label={props['aria-label']}
    pattern={props.pattern}
    required={props.required}
    onChange={props.onChange}
  />

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  inputmode: PropTypes.string,
  type: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  'aria-label': PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Input
