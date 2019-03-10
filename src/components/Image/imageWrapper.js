import React from 'react'

class ImageWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.focusedImage = React.createRef()
  }

  componentDidMount () {
    this.focusedImage.current.addEventListener('keydown', this.props.onKeyDown)
    this.focusedImage.current.focus()
  }

  render () {
    return (
      <div
        ref={this.focusedImage}
        tabIndex='0'
      >
        {this.props.children}
      </div>
    )
  }
}

export default ImageWrapper
