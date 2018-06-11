import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Header from './header/Header'
import Footer from './footer/Footer'

// styles
import './item.scss'

const mapStateToProps = state => {
  return {
    title: state.item.title,
    description: state.item.description,
    price: state.item.price
  }
}

class Item extends Component {
  constructor (props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData () {
    const id = this.props.match.params.id
    const url = `/api/item.php?id=${id}`

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
    return (
      <div>
        <Header />

        <div className='ad'>
          <div className='ad-breadcrumb'>
            <span><a href='/'>Acasă</a></span>
            <span className='slash'>/</span>
            <span><a href='/category/{{category}}/'>category</a></span>
            <span className='slash'>/</span>
            <span><a href='/{{category}}/{{subcategory}}'>subcategory</a></span>
            <span className='slash'>/</span>
            <span className='breadcrumb-ad-title'>&nbsp;title</span>
          </div>

          <div className='ad-info'>
            <span>Anunţ postat de</span>
            <span className='posted-by'>&nbsp;OnlyAppleXXX</span>
          </div>

          <hr className='under-ad-info' />

          <div className='posting-date-and-views'>
            <span className='date'>12 iulie 2016</span>
            <span className='views'>Vizualizări: views</span>
          </div>

          <hr className='under-posting-date' />

          <div className='ad-details'>
            <div className='ad-title'>
              <h2>title</h2>
            </div>

            <div className='ad-description'>
              <span>description</span>
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
              <span className='label'>Preţ:&nbsp;</span>
              <span>18800 lei / 950 usd / 860 eur</span>
            </div>
            <br />
            <div className='region'>
              <span className='label'>Regiune:&nbsp;</span>
              <span>Orhei</span>
            </div>
            <div className='contacts'>
              <span className='label'>Contacte:&nbsp;</span>
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
