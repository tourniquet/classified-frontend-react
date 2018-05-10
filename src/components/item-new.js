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
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              className='form-control'
              type='text'
              name='title'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              name='description'
              placeholder='Description'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input
              className='form-control'
              type='number'
              name='price'
              placeholder='Price'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='upload-image'>Upload image</label>
            <input
              id='upload-image'
              className='form-control-file'
              type='file'
            />
          </div>

          <button
            className='btn btn-primary'
            type='submit'
            name='submit'
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default ItemNew

// read about FormData https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
