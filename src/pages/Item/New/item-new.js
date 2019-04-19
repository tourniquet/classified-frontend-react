import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import DropDownButton from '../../../components/Buttons/DropDownButton'
import Footer from '../../../components/Footer'
import Image from '../../../components/Image'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import NavBar from '../../../components/NavBar/NavBar'
import RoundedButton from '../../../components/Buttons/RoundedButton'
import Search from '../../../components/Search'
import Textarea from '../../../components/Textarea'
import UnorderedList from '../../../components/UnorderedList'

// styles
import './item-new.scss'

const ImageBlock = styled.div`
  &:last-child {
    /* Render this element only if images array length <= 3 */
    display: ${props => props.images.length <= 3 ? 'block' : 'none'}
  }
`

const mapStateToProps = state => ({
  userId: state.userReducer.id,
  userEmail: state.userReducer.email,
  categories: state.newItemReducer.categories,
  category: state.newItemReducer.category,
  showCategories: state.newItemReducer.showCategories,
  subcategories: state.newItemReducer.subcategories,
  subcategory: state.newItemReducer.subcategory,
  subcategoryId: state.newItemReducer.subcategoryId,
  showSubcategories: state.newItemReducer.showSubcategories,
  regions: state.newItemReducer.regions,
  region: state.newItemReducer.region,
  showRegions: state.newItemReducer.showRegions,
  images: state.newItemReducer.images,
  currency: state.newItemReducer.currency,
  currencies: state.newItemReducer.currencies,
  showCurrencies: state.newItemReducer.showCurrencies
})

const InputStyled = styled.input`
  border: 1px solid #FFF1;
  height: 0;
  outline: 0;
  outline-offset: 0;
  width: 0;
`

// TODO: This must be a temporary solution! I'm serious!
const RequiredInput = props =>
  <InputStyled
    required
    type='text'
    value={`${props.value}`}
  />

class ItemNew extends Component {
  constructor (props) {
    super(props)

    this.state = { price: false }
  }

  fetchCategories () {
    window
      .fetch(`${apiHost}/categories.php`)
      .then(response => response.json())
      .then(categories => {
        this.props.dispatch({
          type: 'POPULATE_CATEGORIES_ARRAY',
          categories
        })
      })
      .catch(err => console.error(err))
  }

  fetchSubcategories (id) {
    window
      .fetch(`${apiHost}/subcategories.php?id=${id}`)
      .then(response => response.json())
      .then(subcategories => {
        this.props.dispatch({
          type: 'POPULATE_SUBCATEGORIES_ARRAY',
          subcategories
        })
      })
      .catch(err => console.error(err))
  }

  toggleCategoriesList () {
    return ({
      type: 'TOGGLE_CATEGORIES_LIST'
    })
  }

  setCategory (id, title) {
    this.fetchSubcategories(id)

    return ({
      type: 'SET_CATEGORY',
      title
    })
  }

  toggleSubcategoriesList () {
    return ({
      type: 'TOGGLE_SUBCATEGORIES_LIST'
    })
  }

  setSubcategory (id, title) {
    return ({
      type: 'SET_SUBCATEGORY',
      id,
      title
    })
  }

  fetchRegions () {
    window
      .fetch(`${apiHost}/regions.php`)
      .then(response => response.json())
      .then(regions => {
        this.props.dispatch({
          type: 'POPULATE_REGIONS_ARRAY',
          regions
        })
      })
      .then(err => console.error(err))
  }

  toggleRegionsList () {
    return ({
      type: 'TOGGLE_REGIONS_LIST'
    })
  }

  setRegion (city) {
    return ({
      type: 'SET_REGION',
      city
    })
  }

  handleImages (el) {
    const image = el.target.files[0]
    const blob = new window.Blob([image], { type: 'image/*' })
    const imageURL = window.URL.createObjectURL(blob)

    return {
      type: 'SET_IMAGE_THUMBNAIL',
      image: imageURL
    }
  }

  removeImage (id) {
    return ({
      type: 'REMOVE_IMAGE',
      id
    })
  }

  fetchCurrencies () {
    window
      .fetch(`${apiHost}/currencies.php`)
      .then(response => response.json())
      .then(currencies => {
        this.props.dispatch({
          type: 'POPULATE_CURRENCIES_ARRAY',
          currencies
        })
      })
      .catch(err => console.error(err))
  }

  toggleCurrencies () {
    return ({
      type: 'TOGGLE_CURRENCIES'
    })
  }

  setCurrency (id, title) {
    return ({
      type: 'SET_CURRENCY',
      id,
      title
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const date = new Date().getTime().toString().slice(5)
    formData.append('subcategoryId', this.props.subcategoryId)
    formData.append('url', date)
    formData.append('userId', this.props.userId)
    formData.append('userEmail', this.props.userEmail)
    formData.append('currencyId', (this.state.price ? this.props.currency.id : 1)) // TODO: here should be 0 when SQL query will be improved

    const url = `${apiHost}/item-posted.php`
    window
      .fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => this.props.history.push(`/item/${result.url}`))
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchCurrencies()
    this.fetchRegions()
  }

  render () {
    const { categories, currencies, dispatch, subcategories } = this.props
    const price = document.getElementById('item-price')

    return (
      <div className='page-body'>
        <NavBar />

        <Search />

        <form
          id='form'
          className='form'
          onSubmit={event => this.handleSubmit(event)}
        >
          <div className='left-side'>
            <Label
              className='mandatory'
              htmlFor='category'
              title='Category'
            />
            <DropDownButton
              className={
                this.props.showCategories
                  ? 'button desktop-button active-tab'
                  : 'button desktop-button inactive-tab'
              }
              title={this.props.category}
              onClick={() => dispatch(this.toggleCategoriesList())}
            >
              <i /> {/* arrow icon */}

              <RequiredInput value={`${this.props.category}`} />
            </DropDownButton>

            <UnorderedList
              className={this.props.showCategories ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {categories.map(el => (
                <li
                  key={el.id.toString()}
                  onClick={() => dispatch(this.setCategory(el.id, el.title))}
                >
                  {el.title}
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
                this.props.showSubcategories
                  ? 'button desktop-button active-tab'
                  : 'button desktop-button inactive-tab'
              }
              title={this.props.subcategory}
              onClick={() => dispatch(this.toggleSubcategoriesList())}
            >
              <i /> {/* arrow icon */}

              <RequiredInput value={`${this.props.subcategory}`} />
            </DropDownButton>
            <UnorderedList
              className={this.props.showSubcategories ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {subcategories.map((el, id) => (
                <li
                  key={id}
                  onClick={() => dispatch(this.setSubcategory(el.id, el.title))}
                >
                  {el.title}
                </li>
              ))}
            </UnorderedList>

            <Label
              htmlFor='region'
              title='Region'
            />
            <DropDownButton
              className={
                this.props.showRegions
                  ? 'button desktop-button active-tab'
                  : 'button desktop-button inactive-tab'
              }
              title={this.props.region}
              onClick={() => dispatch(this.toggleRegionsList())}
            >
              <i /> {/* arrow icon */}

              <RequiredInput value={`${this.props.region}`} />
            </DropDownButton>
            <UnorderedList
              className={this.props.showRegions ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {this.props.regions.map(el => (
                <li
                  key={el.id}
                  onClick={() => dispatch(this.setRegion(el.title))}
                >
                  {el.title}
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
              {this.props.images.map((el, id) => (
                <ImageBlock
                  key={id}
                  images={this.props.images}
                >
                  <Image
                    className='remove-image'
                    src='/img/remove.png'
                    style={{ display: el.length ? 'inline-block' : 'none' }}
                    onClick={() => dispatch(this.removeImage(id))}
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
                      onChange={el => dispatch(this.handleImages(el))}
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
                id='item-price'
                className='input price'
                name='price'
                inputmode='numeric'
                pattern='[0-9]*'
                placeholder='Price'
                onChange={() => this.setState({ price: !this.state.price })}
              />
              <div className='currency'>
                <DropDownButton
                  className={
                    this.props.showCurrencies
                      ? 'button desktop-button active-tab'
                      : 'button desktop-button inactive-tab'
                  }
                  title={this.props.currency.title}
                  onClick={() => dispatch(this.toggleCurrencies())}
                >
                  <i /> {/* arrow icon */}

                  { (price && price.value) &&
                    <RequiredInput value={`${this.props.currency.title}`} />
                  }
                </DropDownButton>
                <UnorderedList
                  className={this.props.showCurrencies ? 'show-ul-menu' : 'hide-ul-menu'}
                >
                  {currencies.map(currency => (
                    <li
                      key={currency.id.toString()}
                      onClick={() => dispatch(this.setCurrency(currency.id, currency.title))}
                    >
                      {currency.title}
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
}

export default connect(mapStateToProps)(ItemNew)
