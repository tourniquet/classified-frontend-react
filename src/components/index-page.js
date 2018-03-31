/* globals fetch */

import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        <ul>
          {items.map((el, i) => (
            <li key={i.toString()}>
              {el.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
