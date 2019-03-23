import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import DropDownButton from '../../../components/Buttons/DropDownButton'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header/Header'
import Image from '../../../components/Image'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import RoundedButton from '../../../components/Buttons/RoundedButton'
import Search from '../../../components/Search'
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
  userId: state.userReducer.id,
  userEmail: state.userReducer.email,
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

class ItemNew extends Component {
  fetchCategories () {
    window
      .fetch(`${apiHost}/categories.php`)
      .then(response => response.json())
      .then(result => {
        this.props.dispatch({
          type: 'POPULATE_CATEGORIES_ARRAY',
          categories: result
        })
      })
      .catch(err => console.error(err))
  }

  fetchSubcategories () {
    window
      .fetch(`${apiHost}/subcategories.php`)
      .then(response => response.json())
      .then(result => {
        this.setState({ subcategories: result })
      })
      .then(() => console.log(this.state.subcategories))
      .catch(err => console.error(err))
  }

  toggleCategoriesList () {
    return ({
      type: 'TOGGLE_CATEGORIES_LIST'
    })
  }

  setCategory (id) {
    return ({
      type: 'SET_CATEGORY',
      id
    })
  }

  toggleSubcategoriesList () {
    return ({
      type: 'TOGGLE_SUBCATEGORIES_LIST'
    })
  }

  setSubcategory (id) {
    return ({
      type: 'SET_SUBCATEGORY',
      id
    })
  }

  toggleRegionsList () {
    return ({
      type: 'TOGGLE_REGIONS_LIST'
    })
  }

  setRegion (id) {
    return ({
      type: 'SET_REGION',
      id
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

  toggleCurrencies () {
    return ({
      type: 'TOGGLE_CURRENCIES'
    })
  }

  setCurrency (id) {
    return ({
      type: 'SET_CURRENCY',
      id
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const form = document.getElementById('form')
    const formData = new window.FormData(form)

    const date = new Date().getTime().toString().slice(5)
    formData.append('url', date)
    formData.append('userId', this.props.userId)
    formData.append('userEmail', this.props.userEmail)

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
  }

  render () {
    const { dispatch } = this.props

    return (
      <div className='page-body'>
        <Header />

        <Search />

        <form
          id='form'
          className='form'
          onSubmit={this.handleSubmit}
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
            </DropDownButton>

            <UnorderedList
              className={this.props.showCategories ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {this.props.categories.map((el, id) => (
                <li
                  key={id}
                  onClick={() => dispatch(this.setCategory(id))}
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
              onClick={() => this.props.dispatch(this.toggleSubcategoriesList())}
            >
              <i /> {/* arrow icon */}
            </DropDownButton>
            <UnorderedList
              className={this.props.showSubcategories ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {this.props.subcategories.map((el, id) => (
                <li
                  key={id}
                  onClick={() => dispatch(this.setSubcategory(id))}
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
                this.props.showRegions
                  ? 'button desktop-button active-tab'
                  : 'button desktop-button inactive-tab'
              }
              title={this.props.region}
              onClick={() => dispatch(this.toggleRegionsList())}
            >
              <i /> {/* arrow icon */}
            </DropDownButton>
            <UnorderedList
              className={this.props.showRegions ? 'show-ul-menu' : 'hide-ul-menu'}
            >
              {this.props.regions.map((el, id) => (
                <li
                  key={id}
                  onClick={() => dispatch(this.setRegion(id))}
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
                    htmlFor='some-text-here'
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
                className='input price'
                name='price'
                inputmode='numeric'
                pattern='[0-9]*'
                placeholder='Price'
              />
              <div className='currency'>
                <DropDownButton
                  className={
                    this.props.showCurrencies
                      ? 'button desktop-button active-tab'
                      : 'button desktop-button inactive-tab'
                  }
                  title={this.props.currency}
                  onClick={() => dispatch(this.toggleCurrencies())}
                >
                  <i /> {/* arrow icon */}
                </DropDownButton>
                <UnorderedList
                  className={
                    this.props.showCurrencies
                      ? 'currencies show-ul-menu'
                      : 'hide-ul-menu'
                  }
                >
                  {this.props.currencies.map((el, id) => (
                    <li
                      key={id}
                      onClick={() => dispatch(this.setCurrency(id))}
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
}

export default connect(mapStateToProps)(ItemNew)
