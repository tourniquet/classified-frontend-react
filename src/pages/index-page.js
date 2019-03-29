import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../config'

// components
import CallToActionButton from '../components/Buttons/CallToActionButton'
import Category from '../components/Category/Category'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import Image from '../components/Image'
import Search from '../components/Search'

// styles
import './index-page.scss'

const mapStateToProps = state => ({
  items: state.itemsReducer.items
})

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categories: [],
      subcategories: []
    }
  }

  fetchCategories () {
    window
      .fetch(`${apiHost}/categories.php`)
      .then(response => response.json())
      .then(result => {
        this.setState({categories: result})
      })
      .catch(err => console.error(err))
  }

  fetchSubcategories () {
    window
      .fetch(`${apiHost}/subcategories.php`)
      .then(response => response.json())
      .then(result => {
        this.setState({subcategories: result})
      })
      .catch(err => console.error(err))
  }

  fetchItems () {
    window
      .fetch(`${apiHost}`)
      .then(response => response.json())
      .then(result => {
        this.props.dispatch({
          type: 'FETCH_DATA',
          result
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchSubcategories()
    this.fetchItems()
  }

  render () {
    const {
      categories,
      subcategories
    } = this.state
    const items = this.props.items
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    return (
      // <StyledIndexPage
      //   // id='wrapper'
      // >
      <Fragment>
        <Header />

        <Search />

        <div className='categories'>
          { categories && categories.map(el =>
            <Category
              key={el.id.toString()}
              id={el.id}
              subcategories={subcategories}
              title={el.title}
            />
            )
          }
        </div>

        <div className='items-list'>
          <ul className='latest-ads'>
            { items && items.map(el => (
              <li
                className='latest-ads-item'
                key={el.id.toString()}
              >
                <Image
                  className='favourite-ad'
                  src='/img/star.png'
                  title=''
                  alt=''
                />
                <Image
                  className='thumbnail'
                  src='/img/camera.png'
                  title=''
                  alt='Particular lists thumbnail'
                />
                <Link
                  key={el.id}
                  to={{pathname: `/item/${el.url}`}}
                  className='ad-title'
                >
                  {el.title}
                </Link>
                <span className='ad-category'>
                  <a href={`/${el.category}/${el.subcategory}`}>
                    {el.subcategory}
                  </a>
                </span>
                <span className='ad-date'>
                  {
                    new Date(el.published)
                      .toLocaleDateString('en-GB', dateOptions)
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Footer />

        <Link
          className='publish-item-button-link'
          to={{pathname: '/item/add'}}
        >
          <CallToActionButton
            id='call-to-action'
            title='Post an ad'
          />
        </Link>
      </Fragment>
      // </StyledIndexPage>
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
