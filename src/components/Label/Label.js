import React from 'react'

// styles
import './Label.scss'

const Label = props => {
  return (
    <label
      className={props.className || 'label'}
      htmlFor={props.htmlFor}
    >
      {props.title}
    </label>
  )
}

export default Label
