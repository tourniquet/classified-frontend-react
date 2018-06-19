import React from 'react'
import { connect } from 'react-redux'

// components
import Button from './Button/Button'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Input from './Input/Input'
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
            title='Adaugă fotografii'
          />
          <div className='images'>
            {props.images.map(el => (
              <div className='image-block'>
                {/* TODO: Render this div only if images array length === && === 7 */}
                <img className='remove-image' src='/img/remove.png' style={{ display: el.length ? 'inline-block' : 'none' }} />
                {/* TODO: Change this label with Label component */}
                <label className='label-for-images' style={{ backgroundImage: `url(${el})` }}>
                  <span src='/img/remove.png' style={{ display: !el.length ? 'inline-block' : 'none' }}>+</span>
                  <Input
                    className='input-file'
                    accept='image/jpeg,image/png,image/gif'
                    type='file'
                    onChange={el => props.dispatch(handleImages(el))}
                  />
                </label>
              </div>
            ))}
          </div>

          <Label
            className='label contacts'
            title='Contacte'
          />
          <div className='contacts-block'>
            <Input
              className='input phone'
              name='phone'
              type='text'
              placeholder='telefon'
            />
            <Input
              className='input contact-name'
              type='text'
              name='contact-name'
              placeholder='nume de contact'
            />
          </div>

          <Label
            htmlFor='price'
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

          <Label
            className='label label-for-price'
            htmlFor='price'
            title='Price'
          />
          <div className='price-block'>
            <Input
              className='input price'
              type='text'
              name='price'
            />
            <div className='ul-width currency'>
              {/*
                drop-down-menu(:name="currency", :elements="currencies", @change="setCurrency")
              */}
            </div>
          </div>

          <Button
            className='post-button'
            name='submit'
            title='Submit'
            onClick={handleSubmit}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default connect(mapStateToProps)(ItemNew)
