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

const mapStateToProps = state => {
  return {
    categories: state.item.categories,
    subcategories: state.item.subcategories,
    regions: state.item.regions,
    title: state.item.title,
    description: state.item.description,
    price: state.item.price,
    images: state.item.images
  }
}

const ItemNew = props => {
  const toggleCategoriesList = () => {}

  const toggleSubcategoriesList = () => {}

  const toggleRegionsList = () => {}

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

  const toggleCurrencies = () => {}

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

      <Search />

      <div className='form'>
        <div className='left-side'>
          <Label
            className='label mandatory'
            htmlFor='category'
            title='Category'
          />
          <Button
            className='button desktop-button'
            title='Category name'
            onClick={toggleCategoriesList}
          />{/* :class="[hidden ? 'inactive-tab' : 'active-tab']") */}
          <div className='ul-width'>
            <ul className='show-ul-menu'>{/* (:class="{'hide-ul-menu': hidden}") */}
              {props.categories.map(el => (
                <li> {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
                  {el}
                </li>
              ))}
              {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
            </ul>
          </div>
          {/* drop-down-menu(:name="category.title", :elements="categories", @change="setCategory") */}

          <Label
            className='label mandatory'
            htmlFor='subcategory'
            title='Subcategory'
          />
          <Button
            className='button desktop-button'
            title='Subcategory name'
            onClick={toggleSubcategoriesList}
          />{/* :class="[hidden ? 'inactive-tab' : 'active-tab']") */}
          <div className='ul-width'>
            <ul className='show-ul-menu'>{/* (:class="{'hide-ul-menu': hidden}") */}
              {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
              {props.subcategories.map(el => (
                <li> {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
                  {el}
                </li>
              ))}
            </ul>
          </div>
          {/* input(type="hidden", name="subcategory", value="{{subcategory.id}}") */}

          <Label
            htmlFor='region'
            title='Region'
          />
          <Button
            className='button desktop-button'
            title='Region'
            onChange={toggleRegionsList}
          />{/* :class="[hidden ? 'inactive-tab' : 'active-tab']") */}
          <div className='ul-width'>
            <ul className='show-ul-menu'>{/* (:class="{'hide-ul-menu': hidden}") */}
              {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
              {props.regions.map(el => (
                <li> {/* li(v-for="item in elements", @click="select($index)") {{ item.title }} */}
                  {el}
                </li>
              ))}
            </ul>
          </div>
          {/* input(type="hidden", name="region", value="{{region.id}}") */}
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
                <img className='remove-image' src='/img/remove.png' style={{ display: el.length ? 'inline-block' : 'none' }} />
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
            />
            <Input
              className='input contact-name'
              type='text'
              name='contact-name'
              placeholder='Contact name'
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
            <div className='ul-width currency'>
              <Button
                className='button desktop-button'
                title='Currency'
                onClick={toggleCurrencies}
              />{/* :class="[hidden ? 'inactive-tab' : 'active-tab']" */}
              <div className='ul-width'>
                <ul className='show-ul-menu'> {/* (:class="{'hide-ul-menu': hidden}") */}
                </ul>
              </div>
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
