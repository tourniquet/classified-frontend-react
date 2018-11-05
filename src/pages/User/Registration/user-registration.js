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

const UserRegistrationPage = styled.div`
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
  margin-bottom: 18px;
`

const mapStateToProps = state => ({
  email: state.registrationReducer.email,
  password: state.registrationReducer.password,
  passwordConfirmation: state.registrationReducer.passwordConfirmation,
  emailIsTaken: state.registrationReducer.emailIsTaken,
  passwordNotMatch: state.registrationReducer.passwordNotMatch
})

const UserRegistration = props => {
  const setUserEmail = event => ({
    type: 'USER_EMAIL',
    email: event.target.value
  })

  const setUserPassword = event => ({
    type: 'USER_PASSWORD',
    password: event.target.value
  })

  const confirmUserPassword = event => ({
    type: 'USER_PASSWORD_CONFIRMATION',
    passwordConfirmation: event.target.value
  })

  const setInitialState = () => ({ type: 'SET_INITIAL_STATE' })

  const emailIsTaken = () => ({ type: 'EMAIL_IS_TAKEN' })

  const passwordUnmatch = () => ({ type: 'PASSWORD_NOT_MATCH' })

  const handleSubmit = event => {
    event.preventDefault()

    // set initial state after user set new email and change password
    props.dispatch(setInitialState())

    const url = `${apiHost}/registration.php`
    const data = {
      email: props.email,
      password: props.password,
      passwordConfirmation: props.passwordConfirmation
    }

    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        if (result === 'Success!') window.location = `/user/login`
        else if (result === 'Existing!') props.dispatch(emailIsTaken())
        else if (result === 'Unmatch!') props.dispatch(passwordUnmatch())
      })
      .catch(error => console.error(error))
  }

  return (
    <UserRegistrationPage>
      <Header />

      <form onSubmit={handleSubmit}>
        <Label
          className='registration-form-username'
          htmlFor='email-registration-input'
          title='Email'
        />
        <Input
          id='email-registration-input'
          className='email-registration-input'
          placeholder='Email'
          value={props.email}
          type='email'
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
          required
          onChange={event => props.dispatch(setUserEmail(event))}
        />
        { props.emailIsTaken &&
          <ErrorMessage>
            Email is already taken!
          </ErrorMessage>
        }

        <Label
          className='registration-form-password'
          htmlFor='password-registration-input'
          title='Password'
        />
        <Input
          id='password-registration-input'
          className='password-registration-input'
          placeholder='Password'
          value={props.password}
          type='password'
          required
          onChange={event => props.dispatch(setUserPassword(event))}
        />

        <Label
          className='registration-form-password'
          htmlFor='confirm-password-registration-input'
          title='Confirm password'
        />
        <Input
          id='confirm-password-registration-input'
          className='confirm-password-registration-input'
          placeholder='Confirm password'
          value={props.passwordConfirmation}
          type='password'
          required
          onChange={event => props.dispatch(confirmUserPassword(event))}
        />
        { props.passwordNotMatch &&
          <ErrorMessage>
            Passwords did not match!
          </ErrorMessage>
        }

        <RoundedButton
          className='user-registration-submit-button'
          title='Register'
          type='submit'
        />
      </form>

      <Footer />
    </UserRegistrationPage>
  )
}

export default connect(mapStateToProps)(UserRegistration)
