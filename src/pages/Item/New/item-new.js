import React from 'react'
import { connect } from 'react-redux'

// API host config
import { apiHost } from '../../../config'

// components
import Button from '../../../components/Button/Button'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'
import Search from '../../../components/Search/Search'
import Textarea from '../../../components/Textarea/Textarea'

// styles
import './item-new.scss'

const mapStateToProps = state => ({
  categories: state.newItemReducer.categories,
  category: state.newItemReducer.category,
  showCategories: state.newItemReducer.showCategories,
  subcategories: state.newItemReducer.subcategories,
  subcategory: state.newItemReducer.subcategory,
  showSubcategories: state.newItemReducer.showSubcategories,
  regions: state.newItemReducer.regions,
  region: state.newItemReducer.region,
  showRegions: state.newItemReducer.showRegions,
  title: state.newItemReducer.title,
  description: state.newItemReducer.description,
  price: state.newItemReducer.price,
  currency: state.newItemReducer.currency,
  currencies: state.newItemReducer.currencies,
  showCurrencies: state.newItemReducer.showCurrencies,
  images: state.newItemReducer.images,
  phoneNumber: state.newItemReducer.phoneNumber,
  userName: state.newItemReducer.userName
})

const ItemNew = props => {
  const toggleCategoriesList = () => ({
    type: 'TOGGLE_CATEGORIES_LIST'
  })

  const setCategory = id => ({
    type: 'SET_CATEGORY',
    id
  })

  const toggleSubcategoriesList = () => ({
    type: 'TOGGLE_SUBCATEGORIES_LIST'
  })

  const setSubcategory = id => ({
    type: 'SET_SUBCATEGORY',
    id
  })

  const toggleRegionsList = () => ({
    type: 'TOGGLE_REGIONS_LIST'
  })

  const setRegion = id => ({
    type: 'SET_REGION',
    id
  })

  const setItemTitle = el => ({
    type: 'SET_ITEM_TITLE',
    title: el.target.value
  })

  const setItemDescription = el => ({
    type: 'SET_ITEM_DESCRIPTION',
    description: el.target.value
  })

  const setItemPrice = el => ({
    type: 'SET_ITEM_PRICE',
    price: el.target.value
  })

  const handleImages = el => {
    const image = el.target.files[0]
    const blob = new window.Blob([image], { type: 'image/*' })
    const imageURL = window.URL.createObjectURL(blob)

    return {
      type: 'UPLOAD_IMAGE',
      image: imageURL
    }
  }

  const removeImage = id => ({
    type: 'REMOVE_IMAGE',
    id
  })

  const setPhoneNumber = el => ({
    type: 'SET_PHONE_NUMBER',
    phoneNumber: el.target.value
  })

  const setUserName = el => ({
    type: 'SET_USER_NAME',
    userName: el.target.value
  })

  const toggleCurrencies = () => ({
    type: 'TOGGLE_CURRENCIES'
  })

  const setCurrency = id => ({
    type: 'SET_CURRENCY',
    id
  })

  const handleSubmit = event => {
    event.preventDefault()

    const data = {
      url: new Date().getTime().toString().slice(5),
      title: props.title,
      description: props.description,
      name: props.userName,
      price: props.price
    }

    const url = `${apiHost}/item-posted.php`
    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(() => { window.location = `/item/${data.url}` })
      .catch(err => console.error(err))
  }

  return (
    <div className='page-body'>
      <Header />

      <Search />

      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className='left-side'>
          <Label
            className='mandatory'
            htmlFor='category'
            title='Category'
          />
          <Button
            className={props.showCategories ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
            title={props.category}
            onClick={() => props.dispatch(toggleCategoriesList())}
          >
            <img
              className='arrow'
              src='/img/arrow.png'
            />
          </Button>
          <ul className={props.showCategories ? 'show-ul-menu' : 'hide-ul-menu'}>
            {props.categories.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setCategory(id))}
              >
                {el}
              </li>
            ))}
          </ul>

          <Label
            className='mandatory'
            htmlFor='subcategory'
            title='Subcategory'
          />
          <Button
            className={props.showSubcategories ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
            title={props.subcategory}
            onClick={() => props.dispatch(toggleSubcategoriesList())}
          >
            <img
              className='arrow'
              src='/img/arrow.png'
            />
          </Button>
          <ul className={props.showSubcategories ? 'show-ul-menu' : 'show-ul-menu hide-ul-menu'}>
            {props.subcategories.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setSubcategory(id))}
              >
                {el}
              </li>
            ))}
          </ul>

          <Label
            htmlFor='region'
            title='Region'
          />
          <Button
            className={props.showRegions ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
            title={props.region}
            onClick={() => props.dispatch(toggleRegionsList())}
          >
            <img
              className='arrow'
              src='/img/arrow.png'
            />
          </Button>
          <ul className={props.showRegions ? 'show-ul-menu' : 'show-ul-menu hide-ul-menu'}>
            {props.regions.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setRegion(id))}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>

        <div className='right-side'>
          <Label
            className='mandatory'
            htmlFor='title'
            title='Title'
          />
          <Input
            className='title input'
            placeholder='Title'
            value={props.title}
            required
            onChange={el => props.dispatch(setItemTitle(el))}
          />

          <Label
            className='mandatory'
            htmlFor='description'
            title='Description'
          />
          <Textarea
            className='description'
            name='description'
            placeholder='Description'
            value={props.description}
            required
            onChange={el => props.dispatch(setItemDescription(el))}
          />

          <Label
            htmlFor='title'
            title='Add images'
          />
          <div className='images'>
            {props.images.map((el, id) => (
              <div className='image-block'>
                <img
                  className='remove-image'
                  src='/img/remove.png'
                  style={{ display: el.length ? 'inline-block' : 'none' }}
                  onClick={() => props.dispatch(removeImage(id))}
                />
                {/* TODO: Render this element only if images array length === 0 && < 6 */}
                <Label
                  className='label-for-images'
                  style={{ backgroundImage: `url(${el})` }}
                >
                  <span src='/img/remove.png' style={{ display: !el.length ? 'inline-block' : 'none' }}>+</span>
                  <Input
                    className='input-file'
                    accept='image/jpeg,image/png,image/gif'
                    type='file'
                    onChange={el => props.dispatch(handleImages(el))}
                  />
                </Label>
              </div>
            ))}
          </div>

          <div className='contacts-block'>
            <Label
              className='mandatory display-block'
              htmlFor='phone'
              title='Phone'
            />
            <Input
              id='phone'
              className='input phone'
              inputmode='numeric'
              pattern='[0-9]*'
              placeholder='Phone number'
              value={props.phone}
              required
              onChange={el => props.dispatch(setPhoneNumber(el))}
            />

            <Label
              className='mandatory display-block'
              htmlFor='contact-name'
              title='Name'
            />
            <Input
              id='contact-name'
              className='input contact-name'
              placeholder='Contact name'
              required
              onChange={el => props.dispatch(setUserName(el))}
            />

            <Label
              className='display-block'
              htmlFor='contact-email'
              title='Email'
            />
            <Input
              id='contact-email'
              className='input contact-email'
              type='email'
              placeholder='Email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            />
          </div>

          <Label
            className='label-for-price'
            htmlFor='price'
            title='Price'
          />
          <div className='price-block'>
            <Input
              className='input price'
              inputmode='numeric'
              pattern='[0-9]*'
              placeholder='Price'
              onChange={el => props.dispatch(setItemPrice(el))}
            />
            <div className='currency'>
              <Button
                className={props.showCurrencies ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
                title={props.currency}
                onClick={() => props.dispatch(toggleCurrencies())}
              >
                <img
                  className='arrow'
                  src='/img/arrow.png'
                />
              </Button>
              <ul className={props.showCurrencies ? 'currencies show-ul-menu' : 'hide-ul-menu'}>
                {props.currencies.map((el, id) => (
                  <li
                    key={id}
                    onClick={() => props.dispatch(setCurrency(id))}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            className='post-button'
            title='Submit'
            type='submit'
          />
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default connect(mapStateToProps)(ItemNew)
