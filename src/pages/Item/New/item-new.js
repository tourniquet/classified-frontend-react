import React from 'react'
import { connect } from 'react-redux'

// API host config
import { apiHost } from '../../../config'

// components
import Button from '../../../components/Button/Button'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Image from '../../../components/Image/Image'
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
  images: state.newItemReducer.images,
  currency: state.newItemReducer.currency,
  currencies: state.newItemReducer.currencies,
  showCurrencies: state.newItemReducer.showCurrencies
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

  const handleImages = el => {
    const image = el.target.files[0]
    const blob = new window.Blob([image], { type: 'image/*' })
    const imageURL = window.URL.createObjectURL(blob)

    return {
      type: 'SET_IMAGE_THUMBNAIL',
      image: imageURL
    }
  }

  const removeImage = id => ({
    type: 'REMOVE_IMAGE',
    id
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

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const date = new Date().getTime().toString().slice(5)
    formData.append('url', date)

    const url = `${apiHost}/item-posted.php`
    window
      .fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(res => console.log('some'))
      // .then(() => { window.location = `/item/${data.url}` })
      .catch(err => console.error(err))

    // const url = `${apiHost}/item-posted.php`
    // window
    //   .fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    //   })
    //   .then(() => { window.location = `/item/${data.url}` })
    //   .catch(err => console.error(err))
  }

  return (
    <div className='page-body'>
      <Header />

      <Search />

      <form
        id='form'
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
            <Image
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
            <Image
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
            <Image
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
            name='title'
            required
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
            required
          />

          <Label
            htmlFor='title'
            title='Add images'
          />
          <div className='images'>
            {props.images.map((el, id) => (
              <div className='image-block'>
                <Image
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
                    name='images[]'
                    accept='image/jpeg,image/png,image/gif'
                    type='file'
                    multiple='multiple'
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
              name='phone'
              inputmode='numeric'
              pattern='[0-9]*'
              placeholder='Phone number'
              required
            />

            <Label
              className='mandatory display-block'
              htmlFor='contact-name'
              title='Name'
            />
            <Input
              id='contact-name'
              className='input contact-name'
              name='name'
              placeholder='Contact name'
              required
            />

            <Label
              className='display-block'
              htmlFor='contact-email'
              title='Email'
            />
            <Input
              id='contact-email'
              className='input contact-email'
              name='email'
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
              name='price'
              inputmode='numeric'
              pattern='[0-9]*'
              placeholder='Price'
            />
            <div className='currency'>
              <Button
                className={props.showCurrencies ? 'button desktop-button active-tab' : 'button desktop-button inactive-tab'}
                title={props.currency}
                onClick={() => props.dispatch(toggleCurrencies())}
              >
                <Image
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
