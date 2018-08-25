import React from 'react'
import PropTypes from 'prop-types'
// styles
import './Textarea.scss'

const Textarea = props =>
  <textarea
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    required={props.required}
    onChange={props.onChange}
  />

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Textarea
