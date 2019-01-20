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
  email: state.userReducer.email
})

class Header extends Component {
  checkIfUserIsLogged () {
    const cookies = window.document.cookie

    if (cookies.startsWith('email')) {
      this.props.dispatch({
        type: 'LOGIN_USER',
        email: cookies.split('=')[1]
      })
    }
  }

  logOutUser () {
    // remove email from cookies
    window.document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // redirect user to index page after logout
    window.location = '/'
  }

  componentDidMount () {
    this.checkIfUserIsLogged()

    const email = this.props.email
    console.log(email)
  }

  render () {
    return (
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
