/* globals fetch */

import React, { Component } from 'react'
import { connect } from 'react-redux'

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

    fetch(url)
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
        <h1>{this.props.title}</h1>
        {/* <p><b>Posted:</b> {item.pub_date}</p> */}
        <p>{this.props.description}</p>
        <p><b>Price:</b> {this.props.price}, {this.props.name}</p>
        <img src={this.props.image} />
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
