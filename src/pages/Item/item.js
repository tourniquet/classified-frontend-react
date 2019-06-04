import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../../config'

// components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import CallToActionButton from '../../components/Buttons/CallToActionButton/CallToActionButton'
import CloseButton from '../../components/Buttons/CloseButton/CloseButton'
import Footer from '../../components/Footer/Footer'
import Image from '../../components/Image/Image'
import ImageWrapper from '../../components/Image/imageWrapper'
import NavBar from '../../components/NavBar/NavBar'
import SlideButton from '../../components/Buttons/SlideButton/SlideButton'
// import Textarea from '../../components/Textarea'

// styles
import './item.scss'

const mapStateToProps = state => ({
  category: state.itemReducer.category,
  subcategory: state.itemReducer.subcategory,
  title: state.itemReducer.title,
  description: state.itemReducer.description,
  images: state.itemReducer.images,
  phone: state.itemReducer.phone,
  name: state.itemReducer.name,
  price: state.itemReducer.price,
  currency: state.itemReducer.currency,
  published: state.itemReducer.published,
  views: state.itemReducer.views,
  region: state.itemReducer.region
})

class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImgOnMobile: 1,
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

  slideImagesOnMobile (direction) {
    const currentImgOnMobile = this.state.currentImgOnMobile
    const imgCount = this.props.images.length - 1

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
      name,
      price,
      currency,
      published,
      views,
      region
    } = this.props
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

        <NavBar />

        <div className='item'>
          <Breadcrumbs
            category={category}
            subcategory={subcategory}
            title={title}
          />

          <div className='item-info'>
            <span>Posted by</span>
            <span className='posted-by'>&nbsp;{name}</span>
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
            <div className='item-title'>
              <h2>{title}</h2>
            </div>

            <div className='item-description'>
              <span>{description}</span>
              <br />
            </div>

            <div className='images'>
              {images.map(el => (
                <div
                  className='desktop-version image-block'
                >
                  <Image
                    key={el}
                    onClick={() => this.zoomImage(el)}
                    src={`${thumbUrl}${el}`}
                  />
                </div>
              ))}

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
                    <SlideButton
                      // TODO: Make div stay focuse even when mouse is used
                      // to slide images
                      className='arrow-left'
                      onClick={() => this.slideZoomedImages('prev')}
                    />

                    {/* right arrow - next image */}
                    <SlideButton
                      // TODO: Make div stay focuse even when mouse is used
                      // to slide images
                      className='arrow-right'
                      onClick={() => this.slideZoomedImages('next')}
                    />

                    <CloseButton
                      onClick={() => this.unzoomImage()}
                    />

                    <ImageWrapper
                      className='image-wrapper'
                      onKeyDown={e => this.manageZoomedImage(e)}
                    >
                      <Image
                        className='zoomed-image'
                        src={`${imgUrl}${this.state.zoomedImage}`}
                      />
                    </ImageWrapper>
                  </div>

                </Fragment>
              }

              <div
                className='mobile-version image-block'
              >
                <SlideButton
                  className='mobile-arrow-left'
                  onClick={() => this.slideImagesOnMobile('prev')}
                />

                <SlideButton
                  className='mobile-arrow-right'
                  onClick={() => this.slideImagesOnMobile('next')}
                />

                <Image src={`${thumbUrl}${images[currentImgOnMobile]}`} />
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
                  href={`/region/${region}`}
                >
                  {region}
                </a>
              </span>
            </div>
            <div className='contacts'>
              <span className='label'>Posted by:&nbsp;</span>
              <span>{phone}, {name}</span>
            </div>
          </div>

          {/* <Textarea
            // TODO: Hide comment text area until is done on backend
            className='send-a-message'
            placeholder='Ask question'
          /> */}
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
