import React from 'react'

// styles
import './Input.scss'

export const Input = props =>
  <input
    className={props.className || 'input'}
    name={props.name}
    placeholder={props.placeholder}
    inputmode={props.inputmode}
    type={props.type || 'text'}
    accept={props.accept}
    value={props.value}
    aria-label={props['aria-label']}
    pattern={props.pattern}
    required={props.required}
    onChange={props.onChange}
  />
