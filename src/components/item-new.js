import React from 'react'
import { connect } from 'react-redux'

// components
import Button from './Button/Button'
import Footer from './Footer/Footer'
import Input from './Input/Input'
import Header from './Header/Header'
import Label from './Label/Label'
import Textarea from './Textarea/Textarea'

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
    <div>
      <Header />

      <div className='form'>
        <div className='left-side'>
          <Label
            className='label mandatory'
            htmlFor='category'
            title='Category'
          />
          {/* drop-down-menu(:name="category.title", :elements="categories", @change="setCategory") */}

          <Label
            className='label mandatory'
            htmlFor='subcategory'
            title='Subcategory'
          />
          {/* drop-down-menu(:name="subcategory.title", :elements="subcategories", @change="setSubcategory")
          input(type="hidden", name="subcategory", value="{{subcategory.id}}") */}

          <Label
            htmlFor='region'
            title='Region'
          />
          {/* drop-down-menu(:name="region.title", :elements="regions", @change="setRegion")
          input(type="hidden", name="region", value="{{region.id}}") */}
        </div>

        <div className='right-side'>
          <Label
            className='label mandatory'
            htmlFor='title'
            title='Title'
          />
          <Input
            name='title'
            placeholder='Title'
            type='text'
            value={props.title}
            onChange={el => props.dispatch(setItemTitle(el))}
          />

          <Label
            className='label mandatory'
            htmlFor='description'
            title='Description'
          />
          <Textarea
            name='description'
            placeholder='Description'
            value={props.description}
            onChange={el => props.dispatch(setItemDescription(el))}
          />

          <Label
            htmlFor='title'
            title='Price'
          />
          <Input
            // https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
            type='inputmode'
            name='price'
            placeholder='Price'
            value={props.price}
            onChange={el => props.dispatch(setItemPrice(el))}
          />

          {/* TODO: Change this label with Label component */}
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

          <Button
            className='btn btn-primary'
            name='submit'
            title='Submit'
            onClick={handleSubmit}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='upload-image'>Upload image</label>
          <input
            id='upload-image'
            className='form-control-file'
            type='file'
            accept='image/*'
            onChange={el => props.dispatch(handleImages(el))}
          />
        </div>

        <label>Choose file</label>
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
                src='/img/remove.png'
              />
              +
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default connect(mapStateToProps)(ItemNew)
