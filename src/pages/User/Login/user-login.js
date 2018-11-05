import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import RoundedButton from '../../../components/Buttons/RoundedButton'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Input from '../../../components/Input'
import Label from '../../../components/Label'

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
  emailPasswordError: state.loginReducer.emailPasswordError,
  emailUndefined: state.loginReducer.emailUndefined
})

const UserLogin = props => {
  const setUserEmail = event => ({
    type: 'USER_EMAIL',
    email: event.target.value
  })

  const setUserPassword = event => ({
    type: 'USER_PASSWORD',
    password: event.target.value
  })

  const setInitialState = () => ({ type: 'SET_INITIAL_STATE' })

  const emailPasswordError = () => ({ type: 'EMAIL_PASSWORD_ERROR' })

  const emailUndefined = () => ({ type: 'EMAIL_UNDEFINED' })

  const handleSubmit = event => {
    event.preventDefault()

    // set initial state
    props.dispatch(setInitialState())

    const data = {
      email: props.email,
      password: props.password
    }

    const url = `${apiHost}/login.php`
    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        if (result === 'Success!') window.location = `/`
        else if (result === 'Unsuccess!') props.dispatch(emailPasswordError())
        else if (result === 'Undefined!') props.dispatch(emailUndefined())
      })
      .catch(error => console.error(error))
  }

  return (
    <UserLoginPage>
      <Header />

      <form onSubmit={handleSubmit}>
        <Label
          className='login-form-user-name'
          htmlFor='username-login-input'
          title='Email'
        />
        <Input
          id='username-login-input'
          className='username-login-input'
          placeholder='Email'
          value={props.username}
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
          required
          onChange={event => props.dispatch(setUserEmail(event))}
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
          value={props.password}
          type='password'
          required
          onChange={event => props.dispatch(setUserPassword(event))}
        />

        {
          props.emailPasswordError &&
          <ErrorMessage>
            Email or password did not match
          </ErrorMessage>
        }

        {
          props.emailUndefined &&
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

export default connect(mapStateToProps)(UserLogin)
