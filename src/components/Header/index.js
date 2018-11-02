import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// components
import RoundedButton from '../Buttons/RoundedButton'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #262626;
  height: 93px;
  padding-left: 30px;

  .logo {
    background: #FFF;
    height: 34px;
    width: 85px;
  }

  .navbar-toggle {
    position: relative;
    float: right;
    padding: 9px 10px;
    margin-top: 8px;
    margin-right: 15px;
    margin-bottom: 8px;
    background-color: transparent;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  
  .icon-bar {
    background-color: #FFF;
    display: block;
    width: 26px;
    height: 2px;
    border-radius: 1px;
    margin-bottom: 5px;
  }

  @media (max-width: 1199px) {
    .desktop-screen {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .navbar-toggle {
      display: none;
    }

    .desktop-screen {
      color: #FFF;
      font-size: smaller;
      
      li {
        display: inline-block;
        padding: 16px;

        a {
          text-decoration: none;
        }
      }
    }
  }
`

const Header = () =>
  <StyledHeader>
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
  </StyledHeader>

export default Header
