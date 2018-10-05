import React from 'react'
import PropTypes from 'prop-types'

const Image = props =>
  <img
    className={props.className}
    src={props.src}
    style={props.style}
    onClick={props.onClick}
  />

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.object
}

export default Image
