import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

// API host config
import { apiHost } from '../config'

// components
import CallToActionButton from '../components/Buttons/CallToActionButton'
import Category from '../components/Category/Category'
import Footer from '../components/Footer'
import ListItem from '../components/ListItem/ListItem'
import NavBar from '../components/NavBar/NavBar'
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

    return (
      <Fragment>
        <NavBar />

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
            {items && items.map(item => <ListItem item={item} />)}
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
    )
  }
}

export default connect(mapStateToProps)(IndexPage)
