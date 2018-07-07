import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// components
import Header from './Header/Header'
import Footer from './Footer/Footer'

const mapStateToProps = state => ({
  items: state.items
})

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData () {
    window.fetch('/api/')
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'FETCH_DATA',
          data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const items = this.props.items

    return (
      <div>
        <Header />

        <ul className='latest-ads'>
          {items.map((el, i) => (
            <li
              className='latest-ads-item'
              key={i.toString()}
            >
              <span className='star'>S</span>
              <span className='image'>I</span>
              <span className='ad-title'>
                <Link
                  key={el.id}
                  to={{ pathname: `/item/${el.id}` }}
                >
                  {el.title}
                </Link>
              </span>
              <span className='ad-category'>ss</span>
              <span className='ad-date'>ad.date</span>
            </li>
          ))}
        </ul>

        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
