/* globals fetch */

import React from 'react'

class Item extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {}
    }

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData () {
    const id = this.props.match.params.id
    const url = `/api/item.php?id=${id}`
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    const data = this.state.data

    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    )
  }
}

export default Item
