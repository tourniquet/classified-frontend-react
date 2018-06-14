import React from 'react'

const Button = props => {
  return (
    <button
      className={props.className}
      name={props.name}
      onClick={props.onClick}
      type='button'
    >
      {props.title}
    </button>
  )
}

export default Button
