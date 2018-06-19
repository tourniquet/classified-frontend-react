import React from 'react'
import { connect } from 'react-redux'

// components
import Button from '../Button/Button'

// styles
import './Header.scss'

const mapStateToProps = state => {
  return {}
}

const Header = props => {
  return (
    <header>
      {/* modal
      registration
      login */}

      <a
        className='logo'
        href='/'
      />

      <button
        className='navbar-toggle collapsed'
        type='button'
        // @click="openModal")
      >
        <span className='icon-bar'>&nbsp;</span>
        <span className='icon-bar'>&nbsp;</span>
        <span className='icon-bar'>&nbsp;</span>
      </button>

      <ul className='desktop-screen'>
        <li style={{ display: 'none' }}>
          Înregistrare
        </li>
        <li style={{ display: 'none' }}>
          Contul meu
        </li>
        <li>
          // TODO: Go to '/item/add' page on button click
          // input
          // onclick="location.href='/newad'"
          // />
          <Button
            className='post-ad-button'
            title='Postează anunț'
          />
        </li>
      </ul>
    </header>
  )
}

export default connect(mapStateToProps)(Header)
