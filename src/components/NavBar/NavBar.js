import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import Image from '../Image/Image'
import RoundedButton from '../Buttons/RoundedButton/RoundedButton'
import SidebarToggle from '../Buttons/SidebarToggle'

// utils
import * as api from '../../utils/cookieUtils'

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

  .logo {
    background: url('/img/logo.png');
    display: inline-block;
    flex-grow: 0;
    height: 30px;
    width: 105px;
  }

  .menu-items {
    li {
      a {
        color: #FFF;
      }
    }
  }

  @media (max-width: 1199px) {
    justify-content: center;

    &.toggle-header {
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

      .menu-links-block {
        display: inline-block;
        width: 100%;
      }

      li {
          border-bottom: 1px solid #E7774A;
          height: 44px;
          line-height: 44px;

          &.desktop {
            display: none;
          }

          &.avatar-li {
            height: 120px;
          }

          &:first-child {
            margin-top: 20px;
          }

          &:last-child {
            border-bottom: none;
          }

          .profile-avatar {
            border-radius: 50%;
            width: 50%;
          }

        a {
          display: block;
          color: #FFF;
          left: 0;
          padding-left: 20px;
          position: absolute;
          text-align: left;
          text-decoration: none;
          width: calc(100% - 20px);
        }
      }

      &.toggle-side-menu {
        left: 0;
        position: fixed;
      }

      ${RoundedButton} {
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

      .menu-links-block {
        display: inline-block;
      }

      li {
        display: inline-block;
        padding: 16px;

        &.mobile {
          display: none;
        }

        .profile-avatar {
          display: none;
        }

        a {
          text-decoration: none;
        }
      }
    }
  }
`

const mapStateToProps = state => ({
  email: state.userReducer.email,
  id: state.userReducer.id,
  toggleSideMenu: state.sideMenuReducer.toggleSideMenu
})

class Header extends Component {
  checkIfUserIsLogged () {
    const { email, id } = api.checkIfUserIsLogged()

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
    window.location = '/'
  }

  toggleSideMenu () {
    return ({ type: 'TOGGLE_SIDE_MENU' })
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.checkIfUserIsLogged()
    }
  }

  render () {
    const { dispatch } = this.props

    return (
      <StyledHeader
        className={this.props.toggleSideMenu ? 'toggle-header' : null}
      >
        <SidebarToggle
          className='navbar-toggle'
          onClick={() => dispatch(this.toggleSideMenu())}
        />
        <Link
          className='logo'
          to={{ pathname: '/home/page/1' }}
        />

        <ul className={`menu-items ${this.props.toggleSideMenu ? 'toggle-side-menu' : null}`}> {/* TODO: This one should be <aside> */}
          { !this.props.email &&
            <div className='menu-links-block'>
              <li className='mobile'> {/* TODO: li elements must be inisde ul */}
                <Link
                  onClick={() => dispatch(this.toggleSideMenu())}
                  to={{ pathname: '/home/page/1' }}
                >
                  Home
                </Link>
              </li>
              <li className='desktop'> {/* TODO: li elements must be inisde ul */}
                <Link to={{ pathname: '/home/page/1' }}>
                  Home
                </Link>
              </li>

              <li className='mobile'>
                <Link
                  onClick={() => dispatch(this.toggleSideMenu())}
                  to={{ pathname: '/user/registration' }}
                >
                  Registration
                </Link>
              </li>
              <li className='desktop'>
                <Link to={{ pathname: '/user/registration' }}>
                  Registration
                </Link>
              </li>

              <li className='mobile'>
                <Link
                  onClick={() => dispatch(this.toggleSideMenu())}
                  to={{ pathname: '/user/login' }}
                >
                  Login
                </Link>
              </li>
              <li className='desktop'>
                <Link to={{ pathname: '/user/login' }}>
                  Login
                </Link>
              </li>
            </div>
          }

          { this.props.email &&
            <div className='menu-links-block'>
              <li className='avatar-li'>
                <Image
                  className='profile-avatar'
                  src={'/img/avatar.jpg'}
                />
              </li>
              <li>
                <Link
                  to={{ pathname: '/user/items/1' }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  onClick={this.logOutUser}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </a>
              </li>
            </div>
          }
          <li>
            <Link to={{ pathname: '/item/add' }}>
              <RoundedButton
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

export default withRouter(connect(mapStateToProps)(Header))
