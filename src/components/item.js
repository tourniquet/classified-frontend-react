/* globals fetch */

import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    item: state.item
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
        console.log(data)

        this.props.dispatch({
          type: 'SET_ITEM',
          data
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const item = this.props.item

    return (
      <div>
        <h1>{item.title}</h1>
        <p><b>Posted:</b> {item.pub_date}</p>
        <p>{item.description}</p>
        <p><b>Price:</b> {item.price}, {item.name}</p>
        <image src={item.image} />
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
