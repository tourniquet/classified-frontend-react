import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// API host config
import { apiHost } from '../../../config'

// components
import Button from '../../../components/Button/Button'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input/Input'
import Label from '../../../components/Label/Label'

// styles
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

const mapStateToProps = state => ({
  email: state.registrationReducer.email,
  password: state.registrationReducer.password,
  passwordConfirmation: state.registrationReducer.passwordConfirmation
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

  const handleSubmit = event => {
    event.preventDefault()

    const url = `${apiHost}/register.php`
    const data = {
      email: props.email,
      password: props.password,
      passwordConfirmation: props.passwordConfirmation // passwordConfirmation ?
    }

    window
      .fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(() => {}) //* { window.location = `` })*/)
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
          required
          onChange={event => props.dispatch(setUserEmail(event))}
        />

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

        <Button
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
