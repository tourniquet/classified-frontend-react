import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import DropDownButton from '../../../components/Buttons/DropDownButton'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Image from '../../../components/Image/Image'
import Input from '../../../components/Input'
import Label from '../../../components/Label/Label'
import RoundedButton from '../../../components/Buttons/RoundedButton'
import Search from '../../../components/Search/Search'
import UnorderedList from '../../../components/UnorderedList'
import Textarea from '../../../components/Textarea'

// styles
import './item-new.scss'

const ImageBlock = styled.div`
  &:last-child {
    /* Render this element only if images array length <= 3 */
    display: ${props => props.images.length <= 3 ? 'block' : 'none'}
  }
`

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
      .then(response => response.json())
      .then(result => { window.location = `/item/${result}` })
      .catch(err => console.error(err))
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
          <DropDownButton
            className={
              props.showCategories
                ? 'button desktop-button active-tab'
                : 'button desktop-button inactive-tab'
            }
            title={props.category}
            onClick={() => props.dispatch(toggleCategoriesList())}
          >
            <i /> {/* arrow icon */}
          </DropDownButton>

          <UnorderedList
            className={props.showCategories ? 'show-ul-menu' : 'hide-ul-menu'}
          >
            {props.categories.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setCategory(id))}
              >
                {el}
              </li>
            ))}
          </UnorderedList>

          <Label
            className='mandatory'
            htmlFor='subcategory'
            title='Subcategory'
          />
          <DropDownButton
            className={
              props.showSubcategories
                ? 'button desktop-button active-tab'
                : 'button desktop-button inactive-tab'
            }
            title={props.subcategory}
            onClick={() => props.dispatch(toggleSubcategoriesList())}
          >
            <i /> {/* arrow icon */}
          </DropDownButton>
          <UnorderedList
            className={props.showSubcategories ? 'show-ul-menu' : 'hide-ul-menu'}
          >
            {props.subcategories.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setSubcategory(id))}
              >
                {el}
              </li>
            ))}
          </UnorderedList>

          <Label
            htmlFor='region'
            title='Region'
          />
          <DropDownButton
            className={
              props.showRegions
                ? 'button desktop-button active-tab'
                : 'button desktop-button inactive-tab'
            }
            title={props.region}
            onClick={() => props.dispatch(toggleRegionsList())}
          >
            <i /> {/* arrow icon */}
          </DropDownButton>
          <UnorderedList
            className={props.showRegions ? 'show-ul-menu' : 'hide-ul-menu'}
          >
            {props.regions.map((el, id) => (
              <li
                key={id}
                onClick={() => props.dispatch(setRegion(id))}
              >
                {el}
              </li>
            ))}
          </UnorderedList>
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
            htmlFor='images'
            title='Add images'
          />
          <div className='images'>
            {props.images.map((el, id) => (
              <ImageBlock images={props.images}>
                <Image
                  className='remove-image'
                  src='/img/remove.png'
                  style={{ display: el.length ? 'inline-block' : 'none' }}
                  onClick={() => props.dispatch(removeImage(id))}
                />
                <Label
                  className='label-for-images'
                  style={{ backgroundImage: `url(${el})` }}
                >
                  <span
                    src='/img/remove.png'
                    style={{ display: !el.length ? 'inline-block' : 'none' }}>
                      +
                  </span>
                  <Input
                    className='input-file'
                    name='images[]'
                    accept='image/jpeg,image/png,image/gif'
                    type='file'
                    multiple='multiple'
                    onChange={el => props.dispatch(handleImages(el))}
                  />
                </Label>
              </ImageBlock>
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
              <DropDownButton
                className={
                  props.showCurrencies
                    ? 'button desktop-button active-tab'
                    : 'button desktop-button inactive-tab'
                }
                title={props.currency}
                onClick={() => props.dispatch(toggleCurrencies())}
              >
                <i /> {/* arrow icon */}
              </DropDownButton>
              <UnorderedList
                className={
                  props.showCurrencies
                    ? 'currencies show-ul-menu'
                    : 'hide-ul-menu'
                }
              >
                {props.currencies.map((el, id) => (
                  <li
                    key={id}
                    onClick={() => props.dispatch(setCurrency(id))}
                  >
                    {el}
                  </li>
                ))}
              </UnorderedList>
            </div>
          </div>

          <RoundedButton
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
