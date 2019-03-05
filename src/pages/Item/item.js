import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton'
import Footer from '../../components/Footer'
import Header from '../../components/Header/Header'
import Image from '../../components/Image'
import SlideButton from '../../components/Buttons/SlideButton/SlideButton'
import Textarea from '../../components/Textarea'

// styles
import './item.scss'

const mapStateToProps = state => ({
  title: state.itemReducer.title,
  description: state.itemReducer.description,
  images: state.itemReducer.images,
  phone: state.itemReducer.phone,
  name: state.itemReducer.name,
  price: state.itemReducer.price,
  published: state.itemReducer.published,
  views: state.itemReducer.views
})

class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImage: 1,
      zoomedImage: null
    }
  }

  fetchData () {
    const getUrl = this.props.match.params.url
    const url = `${apiHost}/item.php?url=${getUrl}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(result => {
        this.props.dispatch({
          type: 'FETCH_ITEM_DATA',
          result
        })
      })
      .catch(err => console.error(err))
  }

  slideImages (direction) {
    const currentImage = this.state.currentImage
    const imagesCount = this.props.images.length - 1

    if (direction === 'next') {
      if (currentImage === imagesCount) this.setState({ currentImage: 0 })
      else this.setState({ currentImage: currentImage + 1 })
    } else if (direction === 'prev') {
      if (currentImage === 0) this.setState({ currentImage: 2 })
      else this.setState({ currentImage: currentImage - 1 })
    }
  }

  zoomImage (img) {
    this.setState({ zoomedImage: img })
  }

  unzoomImage () {
    this.setState({ zoomedImage: null })
  }

  slideZoomedImages (direction) {
    const images = this.props.images
    const imagesCount = images.length - 1
    const zoomedImage = this.state.zoomedImage
    const imageIndex = images.findIndex(img => img === zoomedImage)

    if (direction === 'next') {
      if (imageIndex < imagesCount) {
        const newImageIndex = imageIndex + 1
        this.setState({ zoomedImage: images[newImageIndex] })
      } else if (imageIndex === imagesCount) {
        this.setState({ zoomedImage: images[0] })
      }
    } else if (direction === 'prev') {
      if (imageIndex > 0) {
        const newImageIndex = imageIndex - 1
        this.setState({ zoomedImage: images[newImageIndex] })
      } else if (imageIndex === 0) {
        this.setState({ zoomedImage: images[imagesCount] })
      }
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const {
      title,
      description,
      images,
      phone,
      name,
      price,
      published,
      views
    } = this.props
    const currentImage = this.state.currentImage
    const imgUrl = `${apiHost}uploads/`
    const thumbUrl = `${apiHost}uploads/thumb_`
    const zoomedImage = this.state.zoomedImage
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    return (
      <div className='item-page'>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Header />

        <div className='ad'>
          <div className='ad-breadcrumb'>
            <span><a href='/'>Home </a></span>
            <span className='slash'>/ </span>
            <span><a href='/category/{{category}}/'>Category </a></span>
            <span className='slash'>/ </span>
            <span><a href='/{{category}}/{{subcategory}}'>Subcategory </a></span>
            <span className='slash'>/ </span>
            <span className='breadcrumb-ad-title'>{title}</span>
          </div>

          <div className='ad-info'>
            <span>Posted by</span>
            <span className='posted-by'>&nbsp;{name}</span>
          </div>

          <hr className='under-ad-info' />

          <div className='posting-date-and-views'>
            <span className='date'>
              {new Date(published).toLocaleDateString('en-GB', dateOptions)}
            </span>
            <span className='views'>Views: {views}</span>
          </div>

          <hr className='under-posting-date' />

          <div className='ad-details'>
            <div className='ad-title'>
              <h2>{title}</h2>
            </div>

            <div className='ad-description'>
              <span>{description}</span>
              <br />
              <span>Current image: {currentImage}</span>
            </div>

            <div className='images'>
              {images.map(el => (
                <div
                  className='desktop-version image-block'
                >
                  <Image
                    onClick={() => this.zoomImage(el)}
                    src={`${thumbUrl}${el}`}
                  />
                </div>
              ))}

              { zoomedImage &&
                <Fragment>
                  <div
                    onClick={() => this.unzoomImage()}
                    style={{
                      position: 'fixed',
                      width: '100vw',
                      height: '100vh',
                      background: '#000000b8',
                      left: 0,
                      top: 0
                    }}
                  />

                  <div
                    style={{
                      position: 'fixed',
                      margin: 'auto',
                      top: '50%',
                      left: '50%',
                      marginTop: '-300px',
                      marginLeft: '-400px'
                    }}
                  >
                    <SlideButton
                      className='arrow-left'
                      onClick={() => this.slideZoomedImages('prev')}
                    />

                    <SlideButton
                      className='arrow-right'
                      onClick={() => this.slideZoomedImages('next')}
                      style={{ right: 0 }}
                    />

                    <Image
                      onClick={() => this.unzoomImage()}
                      src='/img/remove.png'
                      style={{
                        position: 'absolute',
                        right: '-10px',
                        top: '-10px'
                      }}
                    />

                    <Image
                      className='zoomed-image'
                      src={`${imgUrl}${this.state.zoomedImage}`}
                      style={{
                        borderRadius: '10px'
                      }}
                    />
                  </div>

                </Fragment>
              }

              <div
                className='mobile-version image-block'
                style={{
                  alignItems: 'center',
                  minHeight: '280px'
                }}
              >
                <SlideButton
                  className='arrow-left'
                  onClick={() => this.slideImages('prev')}
                  style={{
                    marginTop: 'unset',
                    top: 'unset'
                  }}
                />

                <SlideButton
                  className='arrow-right'
                  onClick={() => this.slideImages('next')}
                  style={{
                    marginTop: 'unset',
                    top: 'unset'
                  }}
                />

                <Image
                  src={`${thumbUrl}${images[currentImage]}`}
                  style={{
                    height: '100%'
                  }}
                />
              </div>
            </div>
          </div>

          <hr
            style={{
              marginTop: '35px'
            }}
          />

          <div className='contacts-container'>
            <div className='price'>
              <span className='label'>Price:&nbsp;</span>
              <span>{price}</span>
            </div>
            <br />
            <div className='region'>
              <span className='label'>Region:&nbsp;</span>
              <span>Orhei</span>
            </div>
            <div className='contacts'>
              <span className='label'>Posted by:&nbsp;</span>
              <span>{phone}, {name}</span>
            </div>
          </div>

          <Textarea
            // TODO: Hide comment text area until is done on backend
            style={{ display: 'none' }}
            className='send-a-message'
            placeholder='Ask question'
          />
        </div>

        <Footer />

        <Link
          className='publish-item-button-link'
          to={{ pathname: '/item/add' }}
        >
          <CallToActionButton
            title='Post an ad'
          />
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Item)
