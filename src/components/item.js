import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Header from './Header/Header'
import Footer from './Footer/Footer'

// styles
import './item.scss'

const mapStateToProps = state => ({
  title: state.item.title,
  description: state.item.description,
  price: state.item.price,
  pub_date: state.item.pub_date
})

class Item extends Component {
  constructor (props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData () {
    const getUrl = this.props.match.params.url
    const url = `/api/item.php?url=${getUrl}`

    window.fetch(url)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'FETCH_ITEM_DATA',
          data
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
      price,
      pub_date
    } = this.props
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    return (
      <div>
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
            <span>Anunţ postat de</span>
            <span className='posted-by'>&nbsp;OnlyAppleXXX</span>
          </div>

          <hr className='under-ad-info' />

          <div className='posting-date-and-views'>
            <span className='date'>
              {new Date(pub_date).toLocaleDateString('en-GB', dateOptions)}
            </span>
            <span className='views'>Vizualizări: views</span>
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
              {/* img(v-bind:src="firstImage.thumbnail")
              img(v-bind:src="secondImage.thumbnail")
              img(v-bind:src="thirdImage.thumbnail") */}
            </div>
          </div>

          <hr />

          <div className='container'>
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
              <span>079357745, Eugen</span>
            </div>
          </div>

          <textarea
            className='send-a-message'
            placeholder='Lăsaţi un mesaj'
          />
        </div>

        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Item)

// description: "Labour"
// enabled: "1"
// id: "4"
// image: "DSCF1004.JPG"
// name: "ionprodan"
// price: "25"
// pub_date: "2018-03-16 21:29:11"
// title: "Macasine de primavara"
