import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// API host config
import { apiHost } from '../../config'

// components
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import Image from '../../components/Image/Image'
import Footer from '../../components/Footer/Footer'
import Textarea from '../../components/Textarea/Textarea'

// styles
import './item.scss'

const mapStateToProps = state => ({
  title: state.itemReducer.title,
  description: state.itemReducer.description,
  image: state.itemReducer.image,
  phone: state.itemReducer.phone,
  name: state.itemReducer.name,
  price: state.itemReducer.price,
  published: state.itemReducer.published,
  views: state.itemReducer.views
})

class Item extends Component {
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

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const {
      title,
      description,
      image,
      phone,
      name,
      price,
      published,
      views
    } = this.props
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    const imageUrl = `${apiHost}uploads/${image}`

    return (
      <div className='item-page'>
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
            </div>

            <div className='images'>
              <Image
                src={imageUrl}
              />

              {/* img(v-bind:src="firstImage.thumbnail")
              img(v-bind:src="secondImage.thumbnail")
              img(v-bind:src="thirdImage.thumbnail") */}
            </div>
          </div>

          <hr />

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
            className='send-a-message'
            placeholder='Ask question'
          />
        </div>

        <Footer />

        <Link
          className='publish-item-button-link'
          to={{ pathname: '/item/add' }}
        >
          <Button
            className='publish-item-button'
            title='Post an ad'
          />
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Item)
