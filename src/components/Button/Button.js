import React from 'react'

// styles
import './Button.scss'

export const Button = props =>
  <button
    className={props.className}
    name={props.name}
    onBlur={props.onBlur}
    onClick={props.onClick}
    type='button'
  >
    {props.title}
  </button>
