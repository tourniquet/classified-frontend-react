import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import CallToActionButton from '../../components/Buttons/CallToActionButton/CallToActionButton'
import CloseButton from '../../components/Buttons/CloseButton/CloseButton'
import Image from '../../components/Image/Image'
import ImageWrapper from '../../components/Image/imageWrapper'
import SlideButton from '../../components/Buttons/SlideButton/SlideButton'
// import Textarea from '../../components/Textarea'

// styles
import './item.scss'

class Item extends Component {
  state = {
    item: {
      images: []
    },
    currentImgOnMobile: 1,
    zoomedImage: null
  }

  fetchData () {
    const getUrl = this.props.match.params.url
    const url = `${apiHost}/item.php?url=${getUrl}`

    window
      .fetch(url)
      .then(response => response.json())
      .then(item => this.setState({ item }))
      .catch(err => console.error(err))
  }

  slideImagesOnMobile (direction) {
    const currentImgOnMobile = this.state.currentImgOnMobile
    const imgCount = this.state.item.images.length - 1

    if (direction === 'next') {
      if (currentImgOnMobile === imgCount) this.setState({ currentImgOnMobile: 0 })
      else this.setState({ currentImgOnMobile: currentImgOnMobile + 1 })
    } else if (direction === 'prev') {
      if (currentImgOnMobile === 0) this.setState({ currentImgOnMobile: imgCount })
      else this.setState({ currentImgOnMobile: currentImgOnMobile - 1 })
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
    const imgCount = images.length - 1
    const zoomedImage = this.state.zoomedImage
    const index = images.findIndex(img => img === zoomedImage)

    if (direction === 'next') {
      if (index < imgCount) this.setState({ zoomedImage: images[index + 1] })
      else if (index === imgCount) this.setState({ zoomedImage: images[0] })
    } else if (direction === 'prev') {
      if (index > 0) this.setState({ zoomedImage: images[index - 1] })
      else if (index === 0) this.setState({ zoomedImage: images[imgCount] })
    }
  }

  manageZoomedImage (e) {
    // ESC button
    if (e.keyCode === 27) this.setState({ zoomedImage: null })
    // right arrow button
    if (e.keyCode === 39) this.slideZoomedImages('next')
    // left arrow button
    if (e.keyCode === 37) this.slideZoomedImages('prev')
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const {
      category,
      subcategory,
      title,
      description,
      images,
      phone,
      visitor_name,
      user_id,
      price,
      currency,
      published,
      views,
      region
    } = this.state.item
    const currentImgOnMobile = this.state.currentImgOnMobile
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

        <div className='item'>
          { zoomedImage &&
            <Fragment>
              <div
                className='overlay-content'
                onClick={() => this.unzoomImage()}
              />

              <div
                className='zoomed-image-container'
                ref={this.activeImage}
              >
                {/* left arrow - previous image */}
                {/* <SlideButton
                  // TODO: Make div stay focuse even when mouse is used
                  // to slide images
                  className='arrow-left'
                  onClick={() => this.slideZoomedImages('prev')}
                /> */}

                {/* right arrow - next image */}
                {/* <SlideButton
                  // TODO: Make div stay focuse even when mouse is used
                  // to slide images
                  className='arrow-right'
                  onClick={() => this.slideZoomedImages('next')}
                /> */}

                <ImageWrapper
                  className='image-wrapper'
                  onKeyDown={e => this.manageZoomedImage(e)}
                >
                  <CloseButton
                    onClick={() => this.unzoomImage()}
                  />

                  <Image
                    className='zoomed-image'
                    src={`${imgUrl}${this.state.zoomedImage}`}
                  />
                </ImageWrapper>
              </div>

            </Fragment>
          }

          <Breadcrumbs
            category={category}
            subcategory={subcategory}
            title={title}
          />

          <div className='item-info'>
            <span>Posted by</span>
            <a className='posted-by' href={`/profile/${user_id}/1`}>
              &nbsp;{visitor_name}
            </a>
          </div>

          <hr className='under-item-info' />

          <div className='posting-date-and-views'>
            <span className='date'>
              {new Date(published).toLocaleDateString('en-GB', dateOptions)}
            </span>
            <span className='views'>Views: {views}</span>
          </div>

          <hr className='under-posting-date' />

          <div className='item-details'>
            <div className='item-title-description'>
              <h2 className='item-title'>{title}</h2>

              <div className='item-description'>
                <span>{description}</span>
                <br />
              </div>
            </div>

            { !!images.length &&
              <div className='mobile-image-viewer'>
                <SlideButton
                  className='mobile-arrow-left'
                  onClick={() => this.slideImagesOnMobile('prev')}
                />

                <Image
                  className='zoomed-image-mobile'
                  src={`${imgUrl}${images[currentImgOnMobile]}`}
                />

                <SlideButton
                  className='mobile-arrow-right'
                  onClick={() => this.slideImagesOnMobile('next')}
                />
              </div>
            }

            <div className='thumbnails'>
              {images.map(el => (
                <div
                  className='desktop-version thumbnail'
                >
                  <Image
                    key={el}
                    onClick={() => this.zoomImage(el)}
                    src={`${thumbUrl}${el}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className='under-item-hr' />

          <div className='contacts-container'>
            <div className='price'>
              <span className='label'>Price:&nbsp;</span>
              { price
                ? <span>{price} {currency}</span>
                : <span>Negotiable</span>
              }
            </div>
            <br />
            <div className='region'>
              <span className='label'>Region:&nbsp;</span>
              <span >
                <a className='region-link'
                  href={`/region/${region}/1`}
                >
                  {region}
                </a>
              </span>
            </div>
            <div className='contacts'>
              <span className='label'>Posted by:&nbsp;</span>
              <span>{phone}, {visitor_name}</span>
            </div>
          </div>

          {/* <Textarea
            // TODO: Hide comment text area until is done on backend
            className='send-a-message'
            placeholder='Ask question'
          /> */}
        </div>

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

export default Item
