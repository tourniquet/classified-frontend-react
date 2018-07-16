import React from 'react'
import { connect } from 'react-redux'

// components
import Button from './Button/Button'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Input from './Input/Input'
import Label from './Label/Label'
import Search from './Search/Search'
import Textarea from './Textarea/Textarea'

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
    const url = '/api/item-posted.php'
    const item = {
      url: new Date().getTime().toString().slice(5),
      title: props.title,
      description: props.description,
      name: props.userName,
      price: props.price
    }

    window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(item)
    })
      // .then(res => console.log(res))
      .then(() => { window.location = `/item/${item.url}` })
      .catch(err => console.error(err))

    event.preventDefault()
  }

  return (
    <div>
      <Header />

      <Search />

      <div className='form'>
        <div className='left-side'>
          <Label
            className='label mandatory'
            htmlFor='category'
            title='Category'
          />
          <Button
            className={props.showCategories ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
            title={props.category}
            onClick={() => props.dispatch(toggleCategoriesList())}
          />
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
            className='label mandatory'
            htmlFor='subcategory'
            title='Subcategory'
          />
          <Button
            className={props.showSubcategories ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
            title={props.subcategory}
            onClick={() => props.dispatch(toggleSubcategoriesList())}
          />
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
          />
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
            className='description'
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
            {props.images.map((el, id) => (
              <div className='image-block'>
                <img
                  className='remove-image'
                  src='/img/remove.png'
                  style={{ display: el.length ? 'inline-block' : 'none' }}
                  onClick={() => props.dispatch(removeImage(id))}
                />
                {/* TODO: Render this element only if images array length === 0 && < 6 */}
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
              placeholder='Phone number'
              value={props.phone}
              onChange={el => props.dispatch(setPhoneNumber(el))}
            />
            <Input
              className='input contact-name'
              type='text'
              name='contact-name'
              placeholder='Contact name'
              onChange={el => props.dispatch(setUserName(el))}
            />
          </div>

          <Label
            className='label label-for-price'
            htmlFor='price'
            title='Price'
          />
          <div className='price-block'>
            <Input
              className='input price'
              // https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
              inputmode='numeric'
              type='text'
              name='price'
              placeholder='Price'
              onChange={el => props.dispatch(setItemPrice(el))}
            />
            <div className='currency'>
              <Button
                className={props.showCurrencies ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
                title={props.currency}
                onClick={() => props.dispatch(toggleCurrencies())}
              />
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
