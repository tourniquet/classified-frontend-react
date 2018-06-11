import React from 'react'
import { connect } from 'react-redux'

// styles
import './item-new.scss'

const mapStateToProps = state => {
  return {
    title: state.item.title,
    description: state.item.description,
    price: state.item.price,
    images: state.item.images
  }
}

const ItemNew = props => {
  const setItemTitle = el => {
    return {
      type: 'SET_ITEM_TITLE',
      title: el.target.value
    }
  }

  const setItemDescription = el => {
    return {
      type: 'SET_ITEM_DESCRIPTION',
      description: el.target.value
    }
  }

  const setItemPrice = el => {
    return {
      type: 'SET_ITEM_PRICE',
      price: el.target.value
    }
  }

  const handleImages = el => {
    const image = el.target.files[0]
    const blob = new window.Blob([image], { type: 'image/*' })
    const imageURL = window.URL.createObjectURL(blob)

    return {
      type: 'UPLOAD_IMAGE',
      image: imageURL
    }
  }

  const handleSubmit = event => {
    const url = '/api/item-posted.php'
    const item = {
      title: props.title,
      description: props.description,
      price: props.price
    }

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(item)
    })
      .then(res => console.log('Hi there!'))
      .catch(err => console.error(err))

    event.preventDefault()
  }

  return (
    <div className='ad-form'>
      <div className='left-side'>
        <p>Temprary paragraph</p>
      </div>

      <div className='right-side'>
        <label htmlFor='title'>Title</label>
        <input
          className='form-control'
          type='text'
          name='title'
          placeholder='Title'
          value={props.title}
          onChange={el => props.dispatch(setItemTitle(el))}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          className='form-control'
          name='description'
          placeholder='Description'
          value={props.description}
          onChange={el => props.dispatch(setItemDescription(el))}
        />

        <label htmlFor='price'>Price</label>
        <input
          className='form-control'
          // https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
          type='inputmode'
          name='price'
          placeholder='Price'
          value={props.price}
          onChange={el => props.dispatch(setItemPrice(el))}
        />

        <label
          className='label-for-images'
          style={{
            backgroundSize: 'cover',
            display: 'inline-block',
            height: 94,
            width: 94,
            border: '2px solid #f6f6f6',
            borderRadius: 6,
            textAlign: 'center',
            lineHeight: '96px',
            color: '#e26636',
            fontSize: 32
          }}
        >
          <span
            style={{
              lineHeight: 0
            }}
          >
            +
          </span>
          <input
            className='input-file'
            type='file'
            accept='image/jpeg, image/png, image/gif'
            style={{
              display: 'none'
            }}
          />
        </label>

        <button
          className='btn btn-primary'
          type='button'
          name='submit'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <form>
        {/*<div className='form-group'>
          <label htmlFor='upload-image'>Upload image</label>
          <input
            id='upload-image'
            className='form-control-file'
            type='file'
            onChange={el => props.dispatch(handleImages(el))}
          />
        </div>*/}
      </form>

      {/*<label>Choose file</label>
      <div className='images'>
        {props.images.map((el, i) => (
          <div
            className='images-block'
            key={i}
            style={{
              background: `url(${el}) center center / contain`,
              height: 200,
              width: 200
            }}
          >
            <img
              className='remove-image'
              src='img/remove.png'
            />
            +
          </div>
        ))}
      </div>*/}
    </div>
  )
}

export default connect(mapStateToProps)(ItemNew)
