import React from 'react'

// styles
import './Button.scss'

const Button = props => {
  return (
    <button
      className={props.className}
      name={props.name}
      onBlur={props.onBlur}
      onClick={props.onClick}
      type='button'
    >
      {props.title}
    </button>
  )
}

export default Button