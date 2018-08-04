import React from 'react'

// styles
import './Textarea.scss'

export const Textarea = props =>
  <textarea
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
