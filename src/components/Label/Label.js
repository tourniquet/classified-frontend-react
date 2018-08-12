import React from 'react'

// styles
import './Label.scss'

export const Label = props => {
  const { className, htmlFor, title, style, children } = props

  return (
    <label
      className={`label ${className}`}
      htmlFor={htmlFor}
      style={style}
    >
      {title}
      {children}
    </label>
  )
}
