import React from 'react'

// styles
import './Input.scss'

const Input = props => {
  return (
    <input
      className={props.className || 'input'}
      name={props.name}
      placeholder={props.placeholder}
      inputmode={props.inputmode || ''}
      type={props.type || 'text'}
      accept={props.accept || ''}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Input
