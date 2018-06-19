import React from 'react'

// styles
import './Image.scss'

const Image = props => {
  return (
    <img
      className={props.className}
      src={props.src}
      style={props.style}
    />
  )
}

export default Image
