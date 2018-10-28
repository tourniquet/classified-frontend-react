import React from 'react'
import { Link } from 'react-router-dom'

// components
import RoundedButton from '../Buttons/RoundedButton'

// styles
import './Header.scss'

const Header = () =>
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
      <li>
        <Link
          to={{ pathname: '/user/registration' }}
          style={{ color: '#FFF' }}
        >
          Registration
        </Link>
      </li>
      <li style={{ display: 'none' }}>
        Contul meu
      </li>
      <li>
        <Link to={{ pathname: '/item/add' }}>
          <RoundedButton
            className='post-ad-button' // do I need this class name?
            title='Post an ad'
            style={{
              margin: '5px auto 0'
            }}
          />
        </Link>
      </li>
    </ul>
  </header>

export default Header
