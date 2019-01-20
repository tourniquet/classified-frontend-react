import { connect } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
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
  emailPasswordError: state.loginReducer.emailPasswordError,
  emailUndefined: state.loginReducer.emailUndefined,
  password: state.loginReducer.password
})

class UserLogin extends Component {
  setUserEmail (event) {
    return ({
      type: 'USER_EMAIL',
      email: event.target.value
    })
  }

  setUserPassword (event) {
    return ({
      type: 'USER_PASSWORD',
      password: event.target.value
    })
  }

  setInitialState () {
    return ({
      type: 'SET_INITIAL_STATE'
    })
  }

  emailPasswordError () {
    return ({
      type: 'EMAIL_PASSWORD_ERROR'
    })
  }

  emailUndefined () {
    return ({
      type: 'EMAIL_UNDEFINED'
    })
  }

  checkIfUserIsLogged () {
    const cookies = window.document.cookie

    if (cookies.startsWith('email')) {
      window.location = '/'
    }
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
        if (result === 'Success!') {
          const month = new Date(new Date().setDate(new Date().getDate() + 30)).toGMTString()
          // save user email in cookies
          window.document.cookie = `email=${data.email}; expires=${month}; path='/'`
          // redirect user to index page
          window.location = '/'
        } else if (result === 'Unsuccess!') {
          this.props.dispatch(this.emailPasswordError())
        } else if (result === 'Undefined!') {
          this.props.dispatch(this.emailUndefined())
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

          {
            this.props.emailPasswordError &&
            <ErrorMessage>
              Email or password did not match
            </ErrorMessage>
          }

          {
            this.props.emailUndefined &&
            <ErrorMessage>
              Use valid email and password
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
