import React from 'react'

class ImageWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.focusedImage = React.createRef()
  }

  // TODO:
  // componentDidMount () {
  //   this.focusedImage.current.addEventListener('keydown', this.props.onKeyDown)
  //   this.focusedImage.current.focus()
  // }

  render () {
    const {
      children,
      className,
      style
    } = this.props

    return (
      <div
        className={className}
        ref={this.focusedImage}
        style={style}
        tabIndex='0'
      >
        {children}
      </div>
    )
  }
}

export default ImageWrapper
