import React from 'react'
import { Link } from 'react-router-dom'

// components
import Button from '../Button/Button'

// styles
import './Header.scss'

const Header = () => {
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
          <Link to={{ pathname: '/item/add' }}>
            <Button
              className='post-ad-button'
              title='Post an ad'
            />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
