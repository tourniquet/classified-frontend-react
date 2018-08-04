import React from 'react'

// styles
import './Input.scss'

export const Input = props =>
  <input
    className={props.className || 'input'}
    name={props.name}
    placeholder={props.placeholder}
    inputmode={props.inputmode || ''}
    type={props.type || 'text'}
    accept={props.accept || ''}
    value={props.value}
    aria-label={props['aria-label'] || ''}
    onChange={props.onChange}
  />
