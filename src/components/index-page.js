/* globals fetch */

import React, { Component } from 'react'

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetch('/api/index.php')
      .then(res => res.json())
      .then(data => this.setState({ data: [...this.state.data, data] }))
      .catch(err => console.log(err))
  }

  render () {
    const listItems = this.state.data.map((el, i) => {
      return (
        <li key={i.toString()}>
          {el.title}
        </li>
      )
    })

    return (
      <div>
        <h1>Hello, world!</h1>

        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}

export default IndexPage
