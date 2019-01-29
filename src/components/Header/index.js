import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import RoundedButton from '../Buttons/RoundedButton'

const StyledHeader = styled.header`
  align-items: center;
  background: #262626;
  display: flex;
  flex-direction: row;
  height: 93px;
  justify-content: space-between;
  padding-left: 30px;

  .logo {
    background: #FFF;
    height: 34px;
    width: 85px;
  }

  .navbar-toggle {
    background-color: transparent;
    background-image: none;
    border-radius: 4px;
    border: 1px solid transparent;
    float: right;
    margin-bottom: 8px;
    margin-right: 15px;
    margin-top: 8px;
    padding: 9px 10px;
    position: relative;
    width: 26px;
  }
  
  .icon-bar-1,
  .icon-bar-2,
  .icon-bar-3 {
    background-color: #FFF;
    border-radius: 1px;
    height: 2px;
    margin-bottom: 5px;
    width: 26px;
    transition: .4s ease;
  }

  .toggle .icon-bar-1 {
    transform: rotate(-45deg) translate(-9px, 0);
  }

  .toggle .icon-bar-2 {
    opacity: 0;
  }

  .toggle .icon-bar-3 {
    transform: rotate(45deg) translate(-9px, -1px);
  }

  @media (max-width: 1199px) {
    justify-content: center;

    &.toggle {
      margin-left: 250px;

      .logo {
        display: none;
      }
    }

    .navbar-toggle {
      left: 10px;
      position: absolute;

      &.toggle {
        transform: translate(250px);
        transition: .4s ease;
      }
    }

    .menu-items {
      background: #262626;
      height: 100vh;
      left: -250px;
      position: absolute;
      top: 0;
      width: 250px;
      z-index: 1;
      transition: .4s ease;

      &.toggle {
        transform: translate(250px);

        li {
          border-bottom: 1px solid #E7774A;
          width: 250px;

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
    document.querySelector('.navbar-toggle').classList.toggle('toggle')

    document.querySelector('.menu-items').classList.toggle('toggle')
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    return (
      <StyledHeader className='container'>
        <Link
          className='logo'
          to={{ pathname: '/' }}
        />

        <div
          className='navbar-toggle'
          onClick={this.toggleMenu}
        >
          <div className='icon-bar-1'>&nbsp;</div>
          <div className='icon-bar-2'>&nbsp;</div>
          <div className='icon-bar-3'>&nbsp;</div>
        </div>

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
