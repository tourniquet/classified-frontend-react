/* globals fetch */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData () {
    fetch('/api/')
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
        <ul className='list-group list-group-flash'>
          {items.map((el, i) => (
            <li
              className='list-group-item'
              key={i.toString()}
            >
              <Link
                key={el.id}
                to={{
                  pathname: `/item?id=${el.id}`
                }}
              >
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
