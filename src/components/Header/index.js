import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import RoundedButton from '../Buttons/RoundedButton'
import SidebarToggle from '../Buttons/SidebarToggle'

const StyledHeader = styled.header`
  align-items: center;
  background: #262626;
  display: flex;
  height: 93px;
  justify-content: center;
  line-height: 93px;
  position: relative;
  text-align: center;
  width: 100%;

  &.toggle-header {
    /* position: fixed; */
  }

  .logo {
    background: #FFF;
    display: inline-block;
    flex-grow: 0;
    height: 34px;
    width: 85px;
  }

  @media (max-width: 1199px) {
    justify-content: center;

    &.toggle {
      margin-left: 250px;

      .logo {
        display: none;
      }
    }

    .menu-items {
      background: #262626;
      height: 100vh;
      left: -200px;
      position: fixed;
      top: 0;
      transition: .35s ease;
      width: 200px;

      li {
          border-bottom: 1px solid #E7774A;
          width: 200px;

          &:last-child {
            border-bottom: none;
          }

        a {
          display: block;
          padding: 12.5px 15px 12.5px 20px;
          position: relative;
          text-decoration: none;
        }
      }

      &.toggle {
        left: 0;
        position: fixed;
      }

      .post-ad-button {
        display: none;
      }
    }
  }

  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .navbar-toggle {
      display: none;
    }

    .menu-items {
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

const mapStateToProps = state => ({
  email: state.userReducer.email,
  id: state.userReducer.id
})

class Header extends Component {
  checkIfUserIsLogged () {
    const cookies = window.document.cookie.split('; ')

    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)
    const email = getCookies('email').toString().replace('email=', '')
    const id = getCookies('id').toString().replace('id=', '')

    if (email) {
      this.props.dispatch({
        type: 'LOGIN_USER',
        email,
        id
      })
    }
  }

  logOutUser () {
    // remove email and id from cookies
    window.document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // redirect user to index page after logout
    // this.props.history.push('/')
    window.location = '/'
  }

  toggleMenu () {
    // document.querySelector('.container').classList.toggle('toggle')
    // add className toggle to .navbar-toggle div
    // document.querySelector('.navbar-toggle').classList.toggle('toggle')

    document.getElementById('header').classList.toggle('toggle-header')

    document.querySelector('.menu-items').classList.toggle('toggle')

    document.getElementById('wrapper').classList.toggle('toggle')

    document.getElementById('call-to-action').classList.toggle('toggle-side-menu')
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    return (
      <StyledHeader id='header'>
        <SidebarToggle
          className='navbar-toggle'
          onClick={this.toggleMenu}
        />
        <Link
          className='logo'
          to={{ pathname: '/' }}
        />

        <ul className='menu-items'>
          { !this.props.email &&
            <div style={{ display: 'inline-block' }}>
              <li>
                <Link
                  to={{ pathname: '/' }}
                  style={{ color: '#FFF' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: '/user/registration' }}
                  style={{ color: '#FFF' }}
                >
                  Registration
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: '/user/login' }}
                  style={{ color: '#FFF' }}
                >
                  Login
                </Link>
              </li>
            </div>
          }
          { this.props.email &&
            <div style={{ display: 'inline-block' }}>
              <li>
                <Link
                  to={{ pathname: '/user/profile' }}
                  style={{ color: '#FFF' }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <p
                  onClick={this.logOutUser}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </p>
              </li>
            </div>
          }
          <li>
            <Link to={{ pathname: '/item/add' }}>
              <RoundedButton
                className='post-ad-button' // do I need this class name?
                title='Post an ad'
                style={{ margin: '5px auto 0' }}
              />
            </Link>
          </li>
        </ul>
      </StyledHeader>
    )
  }
}

export default connect(mapStateToProps)(Header)
