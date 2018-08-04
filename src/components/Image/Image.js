import React from 'react'

// styles
import './Image.scss'

export const Image = props =>
  <img
    className={props.className}
    src={props.src}
    style={props.style}
  />
