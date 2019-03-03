import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// API host config
import { apiHost } from '../../config'

// components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
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
      currentImage: 2
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
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    const imageUrl = `${apiHost}uploads/thumb_`

    return (
      <div className='item-page'>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Header />

        <div className='ad'>
          <Breadcrumbs
            category='category'
            subcategory='subcategory'
            title={title}
          />

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
              {/* {images.map(el => (
                <div className='image-block'>
                  <Image
                    src={`${imageUrl}${el}`}
                  />
                </div>
              ))} */}

              <div
                className='image-block'
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
                  src={`${imageUrl}${images[currentImage]}`}
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
