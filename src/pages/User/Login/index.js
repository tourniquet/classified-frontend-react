import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Footer from '../../../components/Footer'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import RoundedButton from '../../../components/Buttons/RoundedButton'

const UserLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > form {
    flex: 1 0 auto;
    margin: 0 auto;
    margin-top: 40px;
    width: 20%;
  }

  @media (max-width: 480px) {
    > form {
      width: 80%;
    }
  }
`

const ErrorMessage = styled.p`
  color: red;
`

const mapStateToProps = state => ({
  email: state.loginReducer.email,
  password: state.loginReducer.password,
  wrongEmail: state.loginReducer.wrongEmail,
  wrongPassword: state.loginReducer.wrongPassword,
  emailUndefined: state.loginReducer.emailUndefined
})

class UserLogin extends Component {
  setUserEmail (event) {
    return ({
      type: 'LOGIN_USER_EMAIL',
      email: event.target.value
    })
  }

  setUserPassword (event) {
    return ({
      type: 'LOGIN_USER_PASSWORD',
      password: event.target.value
    })
  }

  setInitialState () {
    return ({
      type: 'SET_INITIAL_STATE'
    })
  }

  wrongPassword () {
    return ({
      type: 'LOGIN_WRONG_PASSWORD'
    })
  }

  wrongEmail () {
    return ({
      type: 'LOGIN_WRONG_EMAIL'
    })
  }

  checkIfUserIsLogged () {
    const cookies = window.document.cookie.split('; ')

    const getCookies = name => cookies.filter(el => el.split('=')[0] === name)
    const email = getCookies('email').toString().replace('email=', '')
    const id = getCookies('id').toString().replace('id=', '')

    if (email && id) this.props.history.push('/')
  }

  handleSubmit (event) {
    event.preventDefault()

    // set initial state
    this.props.dispatch(this.setInitialState())

    const data = {
      email: this.props.email,
      password: this.props.password
    }

    const url = `${apiHost}/login.php`
    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        if (result.email) {
          const month = new Date(new Date().setDate(new Date().getDate() + 30)).toGMTString()
          // save user email and user id in cookies
          window.document.cookie = `email=${result.email}; expires=${month}; path='/'`
          window.document.cookie = `id=${result.id}; expires=${month}; path='/'`
          // redirect user to index page
          this.props.history.push('/')
        } else if (result.message === 'Password!') {
          this.props.dispatch(this.wrongPassword())
        } else if (result.message === 'Unsuccess!') {
          this.props.dispatch(this.wrongEmail())
        }
      })
      .catch(error => console.error(error))
  }

  componentDidMount () {
    this.checkIfUserIsLogged()
  }

  render () {
    return (
      <UserLoginPage>
        <Header />

        <form onSubmit={event => this.handleSubmit(event)}>
          <Label
            className='login-form-user-name'
            htmlFor='username-login-input'
            title='Email'
          />
          <Input
            id='username-login-input'
            className='username-login-input'
            placeholder='Email'
            value={this.props.username}
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
            required
            onChange={event => this.props.dispatch(this.setUserEmail(event))}
          />

          <Label
            className='login-form-user-password'
            htmlFor='user-password-login-input'
            title='Password'
          />
          <Input
            id='user-password-login-input'
            className='user-password-login-input'
            placeholder='Password'
            value={this.props.password}
            type='password'
            required
            onChange={event => this.props.dispatch(this.setUserPassword(event))}
          />

          { this.props.wrongEmail &&
            <ErrorMessage>
              Email did not match
            </ErrorMessage>
          }

          { this.props.wrongPassword &&
            <ErrorMessage>
              Password did not match
            </ErrorMessage>
          }

          <RoundedButton
            className='login-button'
            title='Login'
            type='submit'
          />
        </form>

        <Footer />
      </UserLoginPage>
    )
  }
}

export default connect(mapStateToProps)(UserLogin)