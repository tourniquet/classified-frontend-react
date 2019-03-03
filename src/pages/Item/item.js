import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// API host config
import { apiHost } from '../../config'

// components
import CallToActionButton from '../../components/Buttons/CallToActionButton'
import Header from '../../components/Header/Header'
import Image from '../../components/Image'
import Footer from '../../components/Footer'
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
      currentImage: 2,
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
    const zoomedImage = this.state.zoomedImage
    const imageExtension = zoomedImage.split('.')[1]
    const imageName = zoomedImage.split('.')[0].split('')
    const imageIndex = Number(imageName.pop())

    if (direction === 'next') {
      if (imageIndex < 2) {
        const newImageIndex = imageIndex + 1
        imageName.splice(imageName.length, 0, newImageIndex)
        console.log(imageName)
        const newImageName = imageName.join('')

        console.log(newImageName)
        console.log(`${newImageName}.${imageExtension}`)

        this.setState({ zoomedImage: `${newImageName}.${imageExtension}` })
      } else if (imageIndex === 2) {
        const newImageName = imageName.pop().push(0)
        this.setState({ zoomedImage: `${newImageName}.${imageExtension}` })
      }
    } else if (direction === 'prev') {}
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
                  className='image-block'
                  id='desktop-version'
                >
                  <Image
                    onClick={() => this.zoomImage(el)}
                    src={`${thumbUrl}${el}`}
                  />
                </div>
              ))}

              { zoomedImage &&
                <Fragment>
                  {/*  */}
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
                    <div
                      className='arrow-left'
                      onClick={() => this.slideZoomedImages('prev')}
                      style={{
                        background: 'red',
                        height: '50px',
                        marginTop: '-25px',
                        position: 'absolute',
                        top: '50%',
                        width: '50px'
                      }}
                    />

                    <div
                      className='arrow-right'
                      onClick={() => this.slideZoomedImages('next')}
                      style={{
                        background: 'red',
                        height: '50px',
                        marginTop: '-25px',
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        width: '50px'
                      }}
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
                className='image-block'
                id='mobile-version'
                style={{
                  alignItems: 'center',
                  minHeight: '280px'
                }}
              >
                <div
                  className='arrow-left'
                  onClick={() => this.slideImages('prev')}
                />

                <div
                  className='arrow-right'
                  onClick={() => this.slideImages('next')}
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
