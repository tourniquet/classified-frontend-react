/* globals fetch */

import React from 'react'

class ItemNew extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      price: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (el) {
    this.setState({ [el.target.name]: el.target.value })
  }

  handleSubmit (event) {
    const url = '/api/item-posted.php'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
      .then(res => console.log('Hi there!'))
      .catch(err => console.error(err))

    event.preventDefault()
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={this.state.title}
            onChange={this.handleChange}
          />

          <textarea
            name='description'
            placeholder='Description'
          />

          <input
            type='number'
            name='price'
            placeholder='Price'
          />

          <input
            name='submit'
            type='submit'
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default ItemNew
