import React from 'react'

// styles
import './Textarea.scss'

const Textarea = props =>
  <textarea
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />

export default Textarea
