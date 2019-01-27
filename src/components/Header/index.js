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
  }
  
  .icon-bar {
    background-color: #FFF;
    border-radius: 1px;
    display: block;
    height: 2px;
    margin-bottom: 5px;
    width: 26px;
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

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    return (
      <StyledHeader>
        {/* modal
        registration
        login */}

        <Link
          className='logo'
          to={{ pathname: '/' }}
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
            { !this.props.email &&
              <Link
                to={{ pathname: '/user/registration' }}
                style={{ color: '#FFF' }}
              >
                Registration
              </Link>
            }
          </li>
          <li>
            { !this.props.email &&
              <Link
                to={{ pathname: '/user/login' }}
                style={{ color: '#FFF' }}
              >
                Login
              </Link>
            }
          </li>
          <li>
            {
              this.props.email &&
              <Link
                to={{ pathname: '/user/profile' }}
                style={{ color: '#FFF' }}
              >
               Profile
              </Link>
            }
          </li>
          <li>
            {
              this.props.email &&
              <p
                onClick={this.logOutUser}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </p>
            }
          </li>
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
