import React from 'react'

// styles
import './Label.scss'

const Label = props => {
  const { className, htmlFor, title, style, children } = props

  return (
    <label
      className={className || 'label'}
      htmlFor={htmlFor}
      style={style}
    >
      {title}
      {children}
    </label>
  )
}

export default Label
