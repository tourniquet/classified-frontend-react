import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    title: state.item.title,
    description: state.item.description,
    price: state.item.price
  }
}

const ItemNew = props => {
  const setItemTitle = el => {
    return {
      type: 'SET_ITEM_TITLE',
      item: {
        title: el.target.value
      }
    }
  }

  const handleSubmit = event => {
    const url = '/api/item-posted.php'

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
      .then(res => console.log('Hi there!'))
      .catch(err => console.error(err))

    event.preventDefault()
  }

  return (
    <div>
      <form> {/* onSubmit={handleSubmit} */}
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            className='form-control'
            type='text'
            name='title'
            placeholder='Title'
            value={props.title}
            onChange={el => props.dispatch(setItemTitle(el))}
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
            // https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
            type='inputmode'
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
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps)(ItemNew)
