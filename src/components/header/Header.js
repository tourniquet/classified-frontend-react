import React from 'react'
import { connect } from 'react-redux'

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
        {/* @click="openModal") */}
      >
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
        <span className='icon-bar'></span>
      </button>

      <ul className='desktop-screen'>
        <li style={{ display: 'none'}}>
          Înregistrare
        </li>
        <li style={{ display: 'none'}}>
          Contul meu
        </li>
        <li>
          <input
            className='post-ad-button'
            type='button'
            {/* onclick="location.href='/newad'" */}
            value='Postează anunț'
          />
        </li>
      </ul>
    </header>
  )
}

export default connect(mapStateToProps)(Header)
