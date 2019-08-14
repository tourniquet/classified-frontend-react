import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Dropdown from '../components/Dropdown/Dropdown'
import Image from '../../../components/Image/Image'
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'
import RoundedButton from '../../../components/Buttons/RoundedButton/RoundedButton'
import Search from '../../../components/Search/Search'
import Textarea from '../../../components/Textarea/Textarea'

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
  userEmail: state.userReducer.email
})

class ItemNew extends Component {
  state = {
    categories: [],
    showCategories: false,
    category: '',
    subcategories: [],
    showSubcategories: false,
    subcategory: {
      id: '',
      name: ''
    },
    images: [''],
    regions: [],
    showRegions: false,
    region: {
      id: '',
      name: ''
    },
    currencies: [],
    showCurrencies: false,
    currency: {
      id: '',
      name: ''
    },
    price: false
  }

  fetchCategories () {
    window
      .fetch(`${apiHost}/categories.php`)
      .then(response => response.json())
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err))
  }

  fetchSubcategories = id => {
    window
      .fetch(`${apiHost}/subcategories.php?parent_id=${id}`)
      .then(response => response.json())
      .then(subcategories => this.setState({ subcategories }))
      .catch(err => console.error(err))
  }

  toggleCategoriesList = () => {
    this.setState(state => ({ showCategories: !state.showCategories }))
  }

  setCategory = (id, category) => {
    // fetch subcategories of current category
    this.fetchSubcategories(id)
    // display or hide categories list
    this.toggleCategoriesList()
    // set category name
    this.setState({
      category,
      subcategory: { id: '', name: '' }
    })
  }

  toggleSubcategoriesList = () => {
    this.setState(state => ({ showSubcategories: !state.showSubcategories }))
  }

  setSubcategory = (id, name) => {
    // display or hide subcategories list
    this.toggleSubcategoriesList()
    // set subcategory id & name
    this.setState({ subcategory: { id, name } })
  }

  fetchRegions () {
    window
      .fetch(`${apiHost}/regions.php`)
      .then(response => response.json())
      .then(regions => this.setState({ regions }))
      .catch(err => console.error(err))
  }

  toggleRegionsList = () => {
    this.setState(state => ({ showRegions: !state.showRegions }))
  }

  setRegion = (id, name) => {
    // display or hide regions list
    this.toggleRegionsList()
    // set region id & name
    this.setState({ region: { id, name } })
  }

  handleImages = el => {
    const image = el.target.files[0]
    const blob = new window.Blob([image], { type: 'image/*' })
    const imageURL = window.URL.createObjectURL(blob)

    this.setState(state => ({ images: [...state.images.splice(state.images.length - 1, 0, imageURL), ...state.images] }))
  }

  removeImage = id => {
    this.setState(state => ({ images: state.images.filter(el => el !== state.images[id]) }))
  }

  fetchCurrencies () {
    window
      .fetch(`${apiHost}/currencies.php`)
      .then(response => response.json())
      .then(currencies => this.setState({ currencies }))
      .catch(err => console.error(err))
  }

  toggleCurrencies = () => {
    this.setState(state => ({ showCurrencies: !state.showCurrencies }))
  }

  checkPriceInput = el => {
    const price = el.target.value
    price.length
      ? this.setState({ price: true })
      : this.setState({ price: false })
  }

  setCurrency = (id, title) => {
    // display or hide currencies list
    this.toggleCurrencies()
    // set currency id & title
    this.setState({ currency: { id, title } })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { subcategory, region, currency, price } = this.state

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const date = new Date().getTime().toString().slice(5)
    formData.append('subcategoryId', subcategory.id)
    formData.append('regionId', region.id)
    formData.append('url', date)
    formData.append('userId', this.props.userId)
    formData.append('userEmail', this.props.userEmail)
    formData.append('currencyId', price ? currency.id : 1) // TODO: here should be 0 when SQL query will be improved

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
    const {
      categories,
      showCategories,
      category,
      subcategories,
      showSubcategories,
      subcategory,
      images,
      regions,
      showRegions,
      region,
      currencies,
      showCurrencies,
      currency
    } = this.state
    const price = document.getElementById('item-price')

    return (
      <div className='page-body'>
        <Search />

        <form
          id='form'
          className='form'
          onSubmit={this.handleSubmit}
        >
          <div className='left-side'>
            <Dropdown
              labelFor='category'
              labelTitle='Category'
              dropDownButtonActive={showCategories}
              dropDownButtonTitle={category}
              dropDownButtonClickHandler={this.toggleCategoriesList}
              required
              requiredInputValue={category}
              unorderedListActive={showCategories}
              itemsArray={categories}
              unorderedListClickHandler={this.setCategory}
            />

            <Dropdown
              labelFor='subcategory'
              labelTitle='Subcategory'
              dropDownButtonActive={showSubcategories}
              dropDownButtonTitle={subcategory.name}
              dropDownButtonClickHandler={this.toggleSubcategoriesList}
              required
              requiredInputValue={subcategory.name}
              unorderedListActive={showSubcategories}
              itemsArray={subcategories}
              unorderedListClickHandler={this.setSubcategory}
            />

            <Dropdown
              labelFor='region'
              labelTitle='Region'
              dropDownButtonActive={showRegions}
              dropDownButtonTitle={region.name}
              dropDownButtonClickHandler={this.toggleRegionsList}
              required
              requiredInputValue={region.name}
              unorderedListActive={showRegions}
              itemsArray={regions}
              unorderedListClickHandler={this.setRegion}
            />
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
              {images.map((el, id) => (
                <ImageBlock
                  key={id}
                  images={images}
                >
                  <Image
                    className='remove-image'
                    src='/img/remove.png'
                    style={{ display: el.length ? 'inline-block' : 'none' }}
                    onClick={() => this.removeImage(id)}
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
                      onChange={this.handleImages}
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
                name='visitor-name'
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
                onChange={this.checkPriceInput}
              />
              <div className='currency'>
                <Dropdown
                  dropDownButtonActive={showCurrencies}
                  dropDownButtonTitle={currency.title}
                  dropDownButtonClickHandler={this.toggleCurrencies}
                  required={price && price.value}
                  requiredInputValue={currency.title}
                  unorderedListActive={showCurrencies}
                  itemsArray={currencies}
                  unorderedListClickHandler={this.setCurrency}
                />
              </div>
            </div>

            <RoundedButton
              className='post-button'
              title='Submit'
              type='submit'
            />
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemNew)
